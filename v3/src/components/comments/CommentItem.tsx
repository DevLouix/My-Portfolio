'use client'
import React, { useState } from 'react'

export function CommentItem({ comment, allComments, postId }: any) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyData, setReplyData] = useState({ name: '', email: '', comment: '' })
  const [status, setStatus] = useState('')

  // Find replies to THIS specific comment
  const replies = allComments.filter((c: any) => 
    typeof c.parent === 'object' ? c.parent?.id === comment.id : c.parent === comment.id
  )

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ ...replyData, post: postId, parentId: comment.id }),
    })
    if (res.ok) {
      setStatus('Sent for moderation!')
      setReplyData({ name: '', email: '', comment: '' })
      setTimeout(() => setShowReplyForm(false), 2000)
    }
  }

  return (
    <div className="border-l-2 border-gray-100 pl-4 mb-6 mt-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-50">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-gray-900">{comment.name}</span>
          <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
        
        <button 
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-blue-600 text-sm mt-3 font-medium hover:underline"
        >
          Reply
        </button>

        {showReplyForm && (
          <form onSubmit={handleReply} className="mt-4 bg-gray-50 p-4 rounded-lg flex flex-col gap-3">
            <input 
               type="text" placeholder="Your Name" required
               value={replyData.name} onChange={e => setReplyData({...replyData, name: e.target.value})}
               className="p-2 text-sm border rounded"
            />
            <textarea 
               placeholder="Your reply..." required
               value={replyData.comment} onChange={e => setReplyData({...replyData, comment: e.target.value})}
               className="p-2 text-sm border rounded"
            />
            <button type="submit" className="bg-blue-600 text-white text-xs py-2 px-4 rounded self-start">Submit Reply</button>
            {status && <p className="text-green-600 text-xs">{status}</p>}
          </form>
        )}
      </div>

      {/* RECURSION: Render children replies */}
      {replies.length > 0 && (
        <div className="ml-4 md:ml-8">
          {replies.map((reply: any) => (
            <CommentItem key={reply.id} comment={reply} allComments={allComments} postId={postId} />
          ))}
        </div>
      )}
    </div>
  )
}