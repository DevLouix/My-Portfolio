import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { CommentItem } from './CommentItem'
import { CommentForm } from './CommentForm' // 1. Import the form

export async function CommentsSection({ postId }: { postId: string }) {
  const payload = await getPayload({ config: configPromise })
  
  const result = await payload.find({
    collection: 'comments',
    where: {
      post: { equals: postId },
      isApproved: { equals: true },
    },
    sort: '-createdAt',
  })

  const rootComments = result.docs.filter(c => !c.parent)

  return (
    <section className="mt-20 pt-16 border-t border-gray-100">
      <h3 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter">
        Discussion
      </h3>

      {/* 2. ADD THE FORM AT THE TOP */}
      <div className="mb-12">
        <CommentForm postId={postId} />
      </div>
      
      {rootComments.length === 0 ? (
        <div className="py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-bold">No comments yet. Start the conversation!</p>
        </div>
      ) : (
        <div className="max-w-3xl space-y-8">
          {rootComments.map((comment: any) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              allComments={result.docs} 
              postId={postId} 
            />
          ))}
        </div>
      )}
    </section>
  )
}