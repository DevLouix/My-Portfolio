import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import { Pagination } from '@/components/Pagination'
import { Footer } from '@/components/globals/Footer'
import { Header } from '@/components/globals/Header/Index'

export default async function BlogArchivePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // 1. Await search params and get current page (default to 1)
  const awaitedParams = await searchParams
  const page = typeof awaitedParams.page === 'string' ? parseInt(awaitedParams.page) : 1

  // 2. Fetch paginated posts from Payload
  const config = await configPromise
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    depth: 1, // Ensures relations like heroImage and author are populated
    limit: 6, // Show 6 posts per page
    page: page,
    where: {
      _status: { equals: 'published' }, // Only show published posts!
    },
    sort: '-publishedDate', // Newest first
  })

  const { docs: posts, totalPages, page: currentPage } = result

  return (
    <>
      <Header />
      <main className="min-h-screen py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Devlouix Blog</h1>

          {/* CSS Grid for Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              // TypeScript safe check: Payload returns relations as either string ID or populated object
              const heroImage = typeof post.heroImage === 'object' ? post.heroImage : null

              return (
                <Link key={post.id} href={`/posts/${post.slug}`} className="group block">
                  <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full border border-gray-100">
                    {/* Hero Image */}
                    <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden">
                      {heroImage?.url && (
                        <Image
                          src={heroImage.url}
                          alt={heroImage.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
                        {post.excerpt || 'Read the full article...'}
                      </p>

                      {/* Read More */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <span className="text-blue-600 font-semibold text-sm">
                          Read article &rarr;
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>

          {/* If no posts exist yet */}
          {posts.length === 0 && (
            <p className="text-center text-gray-500 text-lg">No posts found.</p>
          )}

          {/* 3. Render Pagination Component */}
          <Pagination totalPages={totalPages} currentPage={currentPage || 1} basePath="/posts" />
        </div>
      </main>
      <Footer />
    </>
  )
}
