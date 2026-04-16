'use client'

import React, { useState, useEffect } from 'react'
import { useModal } from '@/providers/ModalProvider'

const skills = [
  "Web Development", "App Development", "Software Development",
  "3D Animation", "3D Modelling", "Game Development", "Others"
]

export function ContactModal() {
  const { closeModal } = useModal()
  
  const [formState, setFormState] = useState(0)
  const [showBtn, setShowBtn] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [selections, setSelections] = useState({
    skill: "", email: "", messageSubject: "", messageBody: "",
  })

  function handleSubmit(state: number) {
    setErrorMsg('')
    if (state === 0 && !selections.skill) return setErrorMsg("Please select a category.")
    if (state === 1 && !showBtn) return setErrorMsg("Please enter a valid email.")

    if (state < 2) {
      setFormState(prev => prev + 1)
      setShowBtn(false)
    } else if (state === 2) {
      submitForm()
    }
  }

  async function submitForm() {
    if (selections.messageBody.length < 10) return setErrorMsg("Message must be at least 10 characters.")
    
    try {
      setSubmitting(true)
      setErrorMsg('')

      // Payload automatically created this API route for us in Step 1!
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestCategory: selections.skill,
          clientEmail: selections.email,
          messageSubject: selections.messageSubject,
          messageBody: selections.messageBody
        })
      })

      if (!res.ok) throw new Error('Failed to submit')

      setFormState(3) // Success step
    } catch (e) {
      setErrorMsg('Something went wrong. Please try again.')
      setShowBtn(true)
    } finally {
      setSubmitting(false)
    }
  }

  // Validation effects
  useEffect(() => {
    if (formState === 1) {
      const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(selections.email)
      setShowBtn(valid)
    }
    if (formState === 2) setShowBtn(true)
  }, [selections, formState])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl flex flex-col items-center">
        
        {/* Close Button */}
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold">&times;</button>

        {/* Dynamic Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {formState === 0 && "Select Category"}
          {formState === 1 && "Email Address"}
          {formState === 2 && "Message Details"}
          {formState === 3 && "Success!"}
        </h2>

        {/* Step 0: Category */}
        {formState === 0 && (
          <div className="w-full flex flex-col gap-3">
            {skills.map((s) => (
              <button
                key={s}
                onClick={() => { setSelections({ ...selections, skill: s }); setShowBtn(true) }}
                className={`p-3 rounded-lg border-2 font-medium transition ${
                  selections.skill === s ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-blue-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Step 1: Email */}
        {formState === 1 && (
          <input
            type="email"
            value={selections.email}
            onChange={(e) => setSelections({ ...selections, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />
        )}

        {/* Step 2: Message */}
        {formState === 2 && (
          <div className="w-full flex flex-col gap-4">
            <input
              type="text"
              value={selections.messageSubject}
              onChange={(e) => setSelections({ ...selections, messageSubject: e.target.value })}
              placeholder="Subject"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <textarea
              rows={5}
              value={selections.messageBody}
              onChange={(e) => setSelections({ ...selections, messageBody: e.target.value })}
              placeholder="Your message here..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none resize-none"
            />
          </div>
        )}

        {/* Step 3: Success */}
        {formState === 3 && (
          <div className="text-center text-green-600">
            <p className="text-lg font-medium mb-6">Your message has been sent. I'll get back to you shortly!</p>
            <button onClick={closeModal} className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold">Close</button>
          </div>
        )}

        {/* Errors & Buttons */}
        {errorMsg && <p className="text-red-500 mt-4 font-medium text-sm text-center">{errorMsg}</p>}

        {showBtn && formState < 3 && (
          <button
            disabled={submitting}
            onClick={() => handleSubmit(formState)}
            className="mt-8 w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {formState === 2 && submitting ? "SUBMITTING..." : formState === 2 ? "SUBMIT" : "NEXT"}
          </button>
        )}

      </div>
    </div>
  )
}