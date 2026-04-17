'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useModal } from '@/providers/ModalProvider'
import { IconX, IconChevronRight, IconCheck, IconAlertCircle, IconSend } from '@tabler/icons-react'

const skills = [
  "Web Development", "App Development", "Software Development",
  "3D Animation", "3D Modelling", "Game Development", "Others"
]

export function ContactModal() {
  const { closeModal } = useModal()
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const [formState, setFormState] = useState(0) // 0: Skill, 1: Email, 2: Message, 3: Success
  const [showBtn, setShowBtn] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [selections, setSelections] = useState({
    skill: "",
    email: "",
    messageSubject: "",
    messageBody: "",
  })

  // Scroll to top of modal content whenever step changes
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [formState])

  // Validation Logic
  useEffect(() => {
    if (formState === 0) setShowBtn(!!selections.skill)
    if (formState === 1) {
      const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(selections.email)
      setShowBtn(valid)
    }
    if (formState === 2) setShowBtn(selections.messageSubject.length > 2 && selections.messageBody.length > 5)
  }, [selections, formState])

  const handleNext = () => {
    if (formState < 2) {
      setFormState(prev => prev + 1)
      setShowBtn(false)
    } else {
      submitToPayload()
    }
  }

  async function submitToPayload() {
    try {
      setSubmitting(true)
      setErrorMsg('')

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

      if (!res.ok) throw new Error('Submission failed')

      setFormState(3)
    } catch (e) {
      setErrorMsg('Could not send message. Please check your connection.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={closeModal} 
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-100">
        
        {/* --- HEADER --- */}
        <div className="flex-shrink-0 px-8 pt-8 pb-4 flex justify-between items-center bg-white z-10">
          <div>
            <h2 className="text-2xl font-black text-gray-900 leading-tight">
              {formState === 0 && "What do you need?"}
              {formState === 1 && "Your contact info"}
              {formState === 2 && "Tell me more"}
              {formState === 3 && "Message Sent!"}
            </h2>
            <p className="text-gray-400 text-sm font-medium mt-1">
              {formState < 3 ? `Step ${formState + 1} of 3` : "I'll be in touch soon"}
            </p>
          </div>
          <button 
            onClick={closeModal} 
            className="p-2 bg-gray-50 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
          >
            <IconX size={24} />
          </button>
        </div>

        {/* --- SCROLLABLE BODY --- */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto px-8 py-4 custom-scrollbar"
        >
          {/* Step 0: Skills */}
          {formState === 0 && (
            <div className="grid grid-cols-1 gap-3 pb-4">
              {skills.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelections({ ...selections, skill: s })}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 font-bold transition-all text-left ${
                    selections.skill === s 
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-4 ring-blue-50' 
                    : 'border-gray-50 bg-gray-50 text-gray-600 hover:border-gray-200'
                  }`}
                >
                  {s}
                  {selections.skill === s && <IconCheck size={20} />}
                </button>
              ))}
            </div>
          )}

          {/* Step 1: Email */}
          {formState === 1 && (
            <div className="py-4">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
              <input
                autoFocus
                type="email"
                value={selections.email}
                onChange={(e) => setSelections({ ...selections, email: e.target.value })}
                placeholder="hello@company.com"
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all text-lg font-medium"
              />
              <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                I only use your email to respond to this specific inquiry. No spam, ever.
              </p>
            </div>
          )}

          {/* Step 2: Message */}
          {formState === 2 && (
            <div className="flex flex-col gap-4 py-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Subject</label>
                <input
                  type="text"
                  value={selections.messageSubject}
                  onChange={(e) => setSelections({ ...selections, messageSubject: e.target.value })}
                  placeholder="Project Inquiry"
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Your Message</label>
                <textarea
                  rows={4}
                  value={selections.messageBody}
                  onChange={(e) => setSelections({ ...selections, messageBody: e.target.value })}
                  placeholder="Describe your project or goals..."
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl outline-none transition-all font-medium resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {formState === 3 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <IconCheck size={40} stroke={3} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-500 max-w-[240px]">
                Your request has been logged in my system. Talk soon!
              </p>
            </div>
          )}
        </div>

        {/* --- FOOTER --- */}
        <div className="flex-shrink-0 p-8 bg-gray-50/50 border-t border-gray-100">
          {errorMsg && (
            <div className="flex items-center gap-2 text-red-500 mb-4 font-bold text-sm bg-red-50 p-3 rounded-lg">
              <IconAlertCircle size={18} />
              {errorMsg}
            </div>
          )}

          {formState < 3 ? (
            <button
              disabled={!showBtn || submitting}
              onClick={handleNext}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg ${
                !showBtn || submitting 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
              }`}
            >
              {submitting ? (
                "SENDING..."
              ) : (
                <>
                  {formState === 2 ? "SEND MESSAGE" : "CONTINUE"}
                  {formState === 2 ? <IconSend size={20} /> : <IconChevronRight size={20} />}
                </>
              )}
            </button>
          ) : (
            <button
              onClick={closeModal}
              className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-gray-800 transition-all"
            >
              CLOSE
            </button>
          )}
        </div>
      </div>
    </div>
  )
}