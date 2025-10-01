import { FormEvent, useState } from 'react'

export default function SearchBar({ onSearch, defaultValue = '' }: { onSearch: (q: string) => void; defaultValue?: string }) {

  const [value, setValue] = useState(defaultValue)
  
  function submit(e: FormEvent) { 
    e.preventDefault(); onSearch(value) 
  }

  return (
    <form onSubmit={submit} className="flex gap-2 w-full md:w-auto">
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search name (pikachu)" className="w-full md:w-72 border rounded-xl px-3 py-2 outline-none focus:ring focus:ring-red-200 border-gray-200 bg-white text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />
      <button className="px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 active:scale-[.98]">Search</button>
    </form>
  )
}
