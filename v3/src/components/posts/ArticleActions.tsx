'use client'
import React, { useState, useEffect } from 'react'
import { IconHeart, IconHeartFilled, IconShare, IconCopy, IconCheck } from '@tabler/icons-react'

export function ArticleActions({ postId, initialLikes, title }: any) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  // Check localStorage on mount to see if user already liked this
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]')
    setIsLiked(likedPosts.includes(postId))
  }, [postId])

  const handleLike = async () => {
    const action = isLiked ? 'unlike' : 'like'
    const res = await fetch('/api/posts/like', {
      method: 'POST',
      body: JSON.stringify({ id: postId, action }),
    })

    if (res.ok) {
      const data = await res.json()
      setLikes(data.likes)
      const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]')
      
      if (isLiked) {
        const index = likedPosts.indexOf(postId)
        likedPosts.splice(index, 1)
      } else {
        likedPosts.push(postId)
      }
      
      localStorage.setItem('liked_posts', JSON.stringify(likedPosts))
      setIsLiked(!isLiked)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-6 py-8 border-y border-gray-100 my-10">
      <button 
        onClick={handleLike}
        className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
      >
        {isLiked ? <IconHeartFilled size={24} /> : <IconHeart size={24} />}
        <span className="font-bold">{likes}</span>
      </button>

      <div className="h-4 w-px bg-gray-200" />

      <button onClick={copyLink} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
        {copied ? <IconCheck size={20} className="text-green-500" /> : <IconCopy size={20} />}
        <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  )
}