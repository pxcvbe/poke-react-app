import { Link } from 'react-router-dom'
import ThemeToggle from '../themetoggle'
import BallSelector from '../ballselector'
import { useAuth } from '../../contexts/auth'
import { useInventory } from '../../contexts/inventory'

export default function Header() {

  const { user, logout } = useAuth()
  const { items } = useInventory()

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/70 backdrop-blur border-b border-gray-200 dark:border-zinc-800">
      <div className="container flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-100">Poke<span className="text-red-600">. CA♱𝕮H</span></Link>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <Link to="/" className="hover:underline text-gray-700 dark:text-zinc-200">Home</Link>
            <Link to="/inventory" className="hover:underline text-gray-700 dark:text-zinc-200">Inventory {user && items.length>0 && (<span className="ml-1 px-1.5 py-0.5 rounded bg-red-600 text-white text-[11px]">{items.length}</span>)}</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://pokeapi.co/" target="_blank" className="hidden sm:inline text-sm text-blue-600 dark:text-blue-400 hover:underline">PokeAPI v2</a>
          <BallSelector />
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 dark:text-zinc-300">{user.email}</span>
              <button onClick={logout} className="px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-100">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-100">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
