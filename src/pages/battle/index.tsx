import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../service/axios'
import type { PokemonDetail } from '../../types/pokemon'
import { useInventory } from '../../contexts/inventory' 
import { useAuth } from '../../contexts/auth' 

export default function BattlePage() {
  const { name = '' } = useParams()
  const nav = useNavigate()
  const { user } = useAuth()
  const { catchOne } = useInventory()

  const [detail, setDetail] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [mode, setMode] = useState<'choose'|'naming'>('choose')
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    if (!user) {
      nav('/login', { replace: true, state: { redirect: `/battle/${name}` } })
      return
    }
  }, [user, name, nav])

  useEffect(() => {
    let ignore = false
    setLoading(true); setError(null)
    api.get<PokemonDetail>(`/pokemon/${name}`)
      .then(({ data }) => { if (!ignore) setDetail(data) })
      .catch((e) => { if (!ignore) setError(e?.message ?? 'Failed to fetch Pokémon') })
      .finally(() => { if (!ignore) setLoading(false) })
    return () => { ignore = true }
  }, [name])

  const battleBg = new URL('../../assets/battleground.jpeg', import.meta.url).href

  const gif = (detail as any)?.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default as string | undefined
  const still =
    detail?.sprites.other?.['official-artwork']?.front_default ||
    detail?.sprites.front_default ||
    ''
  const sprite = gif || still

  function onRun() {
    nav('/', { replace: true })
  }

  function onFight() {
    setMode('naming')
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!detail) return
    catchOne({
      id: detail.id,
      name: detail.name,
      image: sprite || null,
      types: detail.types.map(t => t.type.name),
      caughtAt: Date.now(),
      nickname: nickname.trim() || undefined,
    })
    nav('/inventory', { replace: true })
  }

  return (
    <div
      className="min-h-dvh bg-fixed bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${battleBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
      
      {/* Main content area - grows to push bottom section down */}
      <main className="relative flex-1 flex flex-col justify-center px-4 py-6 sm:py-8">
        {/* Pokemon Display - centered vertically and horizontally */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center w-full max-w-md">
            {loading ? (
              <div className="skeleton h-8 w-48 mx-auto" />
            ) : error ? (
              <p className="text-red-600 font-semibold">{error}</p>
            ) : (
              <div>
                {sprite && (
                  <div className="mb-4 sm:mb-6 flex justify-center">
                    <img
                      src={sprite}
                      alt={detail!.name}
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                    />
                  </div>
                )}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold capitalize text-black drop-shadow-lg dark:text-zinc-100 px-4">
                  {name} appeared!
                </h1>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Section - fixed at bottom on mobile, more space on desktop */}
        <div className="w-full max-w-6xl mx-auto mt-auto">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 md:items-end">
            {/* Left Box - "What will you do?" */}
            <div className="w-full rounded-2xl border-4 border-gray-800 dark:border-zinc-700 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-zinc-800 dark:to-zinc-900 shadow-2xl p-4 sm:p-6 md:justify-self-start md:max-w-xl relative overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-yellow-400 rounded-tl-xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-yellow-400 rounded-br-xl"></div>
              
              <p className="text-base sm:text-lg text-gray-900 dark:text-zinc-100 font-bold tracking-wide relative z-10">
                What will you do?
              </p>
            </div>

            {/* Right Box - Actions/Form */}
            <div className="w-full rounded-2xl border-4 border-gray-800 dark:border-zinc-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-900 shadow-2xl p-4 sm:p-5 md:justify-self-end md:max-w-md">
              {mode === 'choose' ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    onClick={onFight}
                    className="group relative px-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl font-bold uppercase tracking-wider
                    bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                    text-white shadow-lg hover:shadow-xl
                    border-b-4 border-red-800 hover:border-red-900
                    active:border-b-2 active:translate-y-0.5
                    transition-all duration-150 transform hover:scale-105"
                  >
                    <span className="relative z-10">Fight</span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  </button>
                  <button
                    onClick={onRun}
                    className="group relative px-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl font-bold uppercase tracking-wider
                    bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                    text-white shadow-lg hover:shadow-xl
                    border-b-4 border-blue-800 hover:border-blue-900
                    active:border-b-2 active:translate-y-0.5
                    transition-all duration-150 transform hover:scale-105"
                  >
                    <span className="relative z-10">Run</span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-2.5 sm:space-y-3">
                  <p className="text-sm sm:text-base text-gray-900 dark:text-zinc-100 font-semibold">
                    Gotcha! <span className="capitalize">{name}</span> was caught!
                  </p>
                  <label className="block text-xs sm:text-sm text-gray-700 dark:text-zinc-200 font-medium">
                    Give it a name:
                  </label>
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="(optional) nickname"
                    className="w-full border rounded-lg sm:rounded-xl px-3 py-2 text-sm sm:text-base bg-white text-gray-900 border-gray-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
                  />
                  <button 
                    type="submit" 
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg sm:rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}