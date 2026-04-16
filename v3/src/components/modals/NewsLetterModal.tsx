'use client'

import React, { useState } from 'react'
import { useModal } from '@/providers/ModalProvider'

export function NewsletterModal() {
  const { closeModal } = useModal()
  
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      // Handle the "Unique" error if they are already subscribed
      if (!res.ok) {
        if (data?.errors?.[0]?.message?.includes('unique')) {
          throw new Error('You are already subscribed!')
        }
        throw new Error('Failed to subscribe. Please try again.')
      }

      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl flex flex-col items-center text-center">
        
        {/* Close Button */}
        <button 
          onClick={closeModal} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        {status === 'success' ? (
          <div className="py-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You're in!</h2>
            <p className="text-gray-600 mb-8">Thanks for subscribing. Keep an eye on your inbox.</p>
            <button onClick={closeModal} className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ✉️
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join the Newsletter</h2>
            <p className="text-gray-600 mb-6">Get the latest updates, tips, and news directly in your inbox.</p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
              
              {errorMsg && <p className="text-red-500 text-sm font-medium">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}