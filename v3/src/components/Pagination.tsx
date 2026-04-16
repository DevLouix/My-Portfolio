import Link from 'next/link'

interface PaginationProps {
  totalPages: number
  currentPage: number
  basePath: string // e.g., '/posts'
}

export function Pagination({ totalPages, currentPage, basePath }: PaginationProps) {
  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  if (totalPages <= 1) return null // Hide if only 1 page exists

  return (
    <div className="flex items-center justify-center space-x-4 mt-12">
      {hasPrevPage ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          &larr; Previous
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed">
          &larr; Previous
        </span>
      )}

      <span className="text-gray-600 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {hasNextPage ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Next &rarr;
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed">
          Next &rarr;
        </span>
      )}
    </div>
  )
}