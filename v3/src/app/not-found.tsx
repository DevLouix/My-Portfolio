import Link from 'next/link'
import { Header } from '@/components/globals/Header/Index'
import { Footer } from '@/components/globals/Footer'
import { ModalProvider } from '@/providers/ModalProvider' // 1. Import Provider

export default function NotFound() {
  return (
    // 2. Wrap everything in the Provider to satisfy the build process
    <ModalProvider>
      <Header />
      <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="relative">
          <h1 className="text-[12rem] md:text-[20rem] font-black text-gray-100 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Lost in the static?
            </h2>
            <p className="text-gray-500 max-w-md mb-8 px-6">
              The page you are looking for doesn't exist or has been moved to a new secret location.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link 
                href="/" 
                className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
              >
                Return Home
              </Link>
              <Link 
                href="/posts" 
                className="bg-white text-gray-900 border border-gray-200 px-10 py-4 rounded-full font-bold hover:bg-gray-50 transition"
              >
                Browse Blog
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ModalProvider>
  )
}