import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Header } from '@/components/globals/Header/Header'
import { Footer } from '@/components/globals/Footer'

export default async function SearchPage({ searchParams }: any) {
  const { q } = await searchParams
  
  if (!q) return notFound()

   const config = await configPromise 
   const payload = await getPayload({ config })

  // Enterprise Search: Query multiple fields (Title, Excerpt, Content)
  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { _status: { equals: 'published' } },
        {
          or: [
            { title: { contains: q } },
            { excerpt: { contains: q } },
            // You can even search within blocks if needed, 
            // but searching Title/Excerpt is standard for performance.
          ],
        },
      ],
    },
    limit: 12,
  })

  return (
    <>
      <Header />
      <main className="min-h-screen py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900">
              Search results for <span className="text-blue-600">"{q}"</span>
            </h1>
            <p className="text-gray-500 mt-2">Found {result.docs.length} articles</p>
          </div>

          {result.docs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {result.docs.map((post: any) => (
                <Link key={post.id} href={`/posts/${post.slug}`} className="group">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full flex flex-col">
                    <div className="relative aspect-video bg-gray-100">
                      {post.heroImage?.url && (
                        <Image src={post.heroImage.url} alt={post.title} fill className="object-cover" />
                      )}
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Read More →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 text-lg">No articles matched your search.</p>
              <Link href="/posts" className="text-blue-600 font-bold mt-4 inline-block hover:underline">
                Browse all articles
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}