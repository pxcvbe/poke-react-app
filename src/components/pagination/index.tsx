export default function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  
  const prev = () => onChange(Math.max(1, page - 1))
  const next = () => onChange(Math.min(totalPages, page + 1))

  return (
    <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-zinc-200">
      <button 
        onClick={prev} 
        disabled={page === 1} 
        className="px-3 py-2 border rounded-xl text-gray-700 dark:text-zinc-100 disabled:opacity-50 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800">
          Prev
        </button>
      <span className="text-sm">Page <b>{page}</b> / {totalPages}</span>
      <button 
        onClick={next} 
        disabled={page === totalPages} 
        className="px-3 py-2 border rounded-xl text-gray-700 dark:text-zinc-100 disabled:opacity-50 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800">
          Next
      </button>
    </div>
  )
}
