import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { CommentItem } from './CommentItem'

export async function CommentsSection({ postId }: { postId: string }) {
   const config = await configPromise 
   const payload = await getPayload({ config })
  
  const result = await payload.find({
    collection: 'comments',
    where: {
      post: { equals: postId },
      isApproved: { equals: true },
    },
    sort: '-createdAt',
    limit: 100,
  })

  // Only top-level comments (those without a parent) start the tree
  const rootComments = result.docs.filter(c => !c.parent)

  return (
    <section className="mt-16 pt-12 border-t border-gray-100">
      <h3 className="text-2xl font-bold mb-8">Discussion ({result.docs.length})</h3>
      
      {rootComments.length === 0 && <p className="text-gray-500">No comments yet. Be the first!</p>}

      <div className="max-w-3xl">
        {rootComments.map((comment: any) => (
          <CommentItem 
            key={comment.id} 
            comment={comment} 
            allComments={result.docs} 
            postId={postId} 
          />
        ))}
      </div>
    </section>
  )
}