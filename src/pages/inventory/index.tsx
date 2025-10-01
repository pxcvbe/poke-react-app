import { Link } from 'react-router-dom'
import { useInventory } from '../../contexts/inventory'

export default function InventoryPage() {

  const { items, releaseOne, clearAll } = useInventory()
  
  return (
    <main className="container py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">My Inventory</h2>
        <div className="flex items-center gap-2">
          {
          items.length > 0 && 
          (
            <button onClick={clearAll} className="px-3 py-2 rounded-xl border text-gray-700 dark:text-zinc-100 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800">
              Clear All
            </button>
            )}
          <Link to="/" className="px-3 py-2 rounded-xl border text-gray-700 dark:text-zinc-100 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800">Back</Link>
        </div>
      </div>
      {items.length === 0 ? (
        <p className="text-gray-600 dark:text-zinc-400">Belum ada Pokémon. Tangkap dari halaman utama.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {items.map(p => (
            <div key={p.id} className="group text-left border rounded-2xl p-3 hover:shadow-md transition w-full bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
              <div className="aspect-square w-full grid place-items-center mb-3 bg-gray-50 dark:bg-zinc-700/50 rounded-xl overflow-hidden">
                {p.image ? <img src={p.image} alt={p.name} className="w-9/12" /> : <div className="skeleton w-1/2 h-1/2" />}
              </div>
              <h3 className="font-semibold capitalize text-gray-900 dark:text-zinc-100">
                {p.nickname || p.name}
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">#{String(p.id).padStart(3,'0')}</p>
                  <h3 className="font-semibold capitalize text-gray-900 dark:text-zinc-100">{p.name}</h3>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex gap-1 flex-wrap">
                  {p.types.map(t => (<span key={t} className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-zinc-100">{t}</span>))}
                </div>
                <button onClick={()=>releaseOne(p.id)} className="px-3 py-1.5 rounded-xl border text-sm text-gray-700 dark:text-zinc-100 hover:bg-gray-50 dark:hover:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
