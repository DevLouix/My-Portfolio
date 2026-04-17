'use client'

import React, { useState } from 'react'
import { IconSend, IconCheck } from '@tabler/icons-react'

export function CommentForm({ postId, parentId }: { postId: string, parentId?: string }) {
  const [data, setData] = useState({ name: '', email: '', comment: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ ...data, post: postId, parentId }),
    })

    if (res.ok) {
      setStatus('success')
      setData({ name: '', email: '', comment: '' })
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 flex items-center gap-3 font-bold text-sm">
        <IconCheck size={20} />
        Thank you! Your comment is awaiting moderation.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
      <h4 className="font-black text-gray-900 uppercase tracking-widest text-xs">
        {parentId ? 'Post a Reply' : 'Join the Discussion'}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" placeholder="Name" required 
          className="p-3 rounded-lg border border-gray-200 outline-none focus:border-blue-600 transition"
          value={data.name} onChange={e => setData({...data, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Email" required 
          className="p-3 rounded-lg border border-gray-200 outline-none focus:border-blue-600 transition"
          value={data.email} onChange={e => setData({...data, email: e.target.value})}
        />
      </div>
      <textarea 
        placeholder="Write your thoughts..." required rows={3}
        className="p-3 rounded-lg border border-gray-200 outline-none focus:border-blue-600 transition resize-none"
        value={data.comment} onChange={e => setData({...data, comment: e.target.value})}
      />
      <button 
        disabled={status === 'loading'}
        className="bg-gray-900 text-white font-black py-3 px-6 rounded-full self-start hover:bg-blue-600 transition-all flex items-center gap-2 text-sm disabled:bg-gray-400"
      >
        {status === 'loading' ? 'Posting...' : 'Post Comment'}
        <IconSend size={16} />
      </button>
    </form>
  )
}