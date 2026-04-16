import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'

export async function RelatedPosts({ currentPostId, categoryIds }: { currentPostId: string, categoryIds: string[] }) {
  const payload = await getPayload({ config: configPromise })

  // Query posts with at least one matching category
  const result = await payload.find({
    collection: 'posts',
    limit: 3,
    where: {
      and: [
        { id: { not_equals: currentPostId } },
        { _status: { equals: 'published' } },
        { categories: { in: categoryIds } },
      ],
    },
  })

  if (result.docs.length === 0) return null

  return (
    <section className="mt-20 pt-16 border-t border-gray-100">
      <h3 className="text-2xl font-black text-gray-900 mb-10">Recommended Reading</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {result.docs.map((post: any) => (
          <Link key={post.id} href={`/posts/${post.slug}`} className="group">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 shadow-sm">
              {post.heroImage?.url && (
                <Image 
                  src={post.heroImage.url} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              )}
            </div>
            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h4>
          </Link>
        ))}
      </div>
    </section>
  )
}