import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { CommentsSection } from '@/components/comments/CommentsSection'
import { ArticleActions } from '@/components/posts/ArticleActions'
import { Header } from '@/components/globals/Header/Header'
import { Footer } from '@/components/globals/Footer'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getInitials } from '@/app/utils/main'
import notFound from '@/app/not-found'
import { DynamicStructuredData } from '@/components/seo/StructuredData'
import { RelatedPosts } from '@/components/posts/RelatedPosts'

// --- 1. DYNAMIC SEO ---
export async function generateMetadata({ params, searchParams }: any) {
  const { slug } = await params
  const { preview } = await searchParams
   const config = await configPromise 
   const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    draft: preview === 'true',
    where: { slug: { equals: slug } },
  })

  const post = result.docs[0]
  if (!post) return {}

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  }
}

// --- 2. ARTICLE PAGE ---
export default async function SinglePostPage({ params, searchParams }: any) {
  const { slug } = await params
  const { preview } = await searchParams
   const config = await configPromise 
   const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    draft: preview === 'true',
    where: { slug: { equals: slug } },
  })

  const post = result.docs[0]
  if (!post) return notFound()

  // Get Category IDs for the Related Posts component
  const categoryIds = post.categories?.map((cat: any) => typeof cat === 'object' ? cat.id : cat) || []

  // Helpers
  const author = typeof post.author === 'object' ? post.author : null
  const heroImage = typeof post.heroImage === 'object' ? post.heroImage : null
  const date = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Draft'

  // Calculate Reading Time (Roughly 200 words per minute)
  const wordCount = JSON.stringify(post.layout).split(' ').length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <>
      <DynamicStructuredData pageData={post}/>
      <Header />
      <article className="min-h-screen pt-12 pb-24 bg-white">
        {/* --- HEADER SECTION --- */}
        <header className="container mx-auto px-4 max-w-4xl text-center mb-12">
          {/* Categories */}
          <div className="flex justify-center gap-2 mb-6">
            {post.categories?.map((cat: any) => (
              <span
                key={cat.id}
                className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider"
              >
                {cat.title}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-gray-500 font-medium">
            {author?.photo && typeof author.photo === 'object' && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 bg-gray-100 flex items-center justify-center">
                {author.photo?.url ? (
                  <Image src={author.photo.url} alt={author.name} fill className="object-cover" />
                ) : (
                  <span className="text-xs font-medium text-gray-600">
                    {getInitials(author.name || 'Anonymous')}
                  </span>
                )}
              </div>
            )}
            <span>
              By <span className="text-gray-900">{author?.name}</span>
            </span>
            <span className="text-gray-200">|</span>
            <span>{date}</span>
            <span className="text-gray-200">|</span>
            <span>{readingTime} min read</span>
          </div>
        </header>

        {/* --- MAIN HERO IMAGE --- */}
        <div className="container mx-auto px-4 max-w-6xl mb-16">
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
            {heroImage?.url && (
              <Image
                src={heroImage.url}
                alt={heroImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>

        {/* --- CONTENT LAYOUT --- */}
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Like & Share Sidebar (or top on mobile) */}
          <ArticleActions postId={post.id} initialLikes={post.likes} title={post.title} />

          {/* DYNAMIC BLOCKS */}
          <RenderBlocks layout={post.layout} />

          {/* LIKE AGAIN AT BOTTOM */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col items-center">
            <p className="text-gray-500 mb-4 font-medium">Enjoyed this article?</p>
            <ArticleActions postId={post.id} initialLikes={post.likes} title={post.title} />
          </div>

          <RelatedPosts currentPostId={post.id} categoryIds={categoryIds} />

          {/* COMMENTS SYSTEM */}
          <CommentsSection postId={post.id} />
        </div>
      </article>
      <Footer />
    </>
  )
}
