import Link from 'next/link'
import { Header } from '@/components/globals/Header'
import { Footer } from '@/components/globals/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-black text-gray-100 absolute -z-10">404</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Oops! Page not found.</h2>
        <p className="text-gray-500 max-w-md mb-8">
          The link might be broken or the page has moved. Try searching for what you need above or browse our latest posts.
        </p>
        <div className="flex gap-4">
          <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
            Go Home
          </Link>
          <Link href="/posts" className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">
            Browse Blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}