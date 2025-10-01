import { useState } from 'react'
import SearchBar from '../../components/searchbar'
import TypeFilter from '../../components/typefilter'
import Pagination from '../../components/pagination'
import PokemonCard from '../../components/pokemoncard'
import PokemonDetailModal from '../../components/pokemondetailmodal'
import EmptyState from '../../components/emptystate'
import { usePokemon } from '../../hooks/usePokemon'
import type { PokemonDetail } from '../../types/pokemon'

export default function PokedexPage() {

  const { state, actions } = usePokemon()
  const { list, loading, error, page, totalPages, query, type } = state
  const { setPage, setQuery, setType } = actions
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<PokemonDetail | null>(null)

  function openDetail(p: PokemonDetail) { 
    setSelected(p); setOpen(true) 
  }
  
  return (
    <main className="container py-4 md:py-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 mb-4">
        <SearchBar onSearch={setQuery} defaultValue={query} />
        <TypeFilter value={type} onChange={setType} />
      </div>
      {error && (<div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">{error}</div>)}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {loading && Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border rounded-2xl p-3">
            <div className="skeleton aspect-square rounded-xl mb-3" />
            <div className="skeleton h-4 w-1/3 mb-2" />
            <div className="skeleton h-5 w-2/3" />
          </div>
        ))}
        {!loading && list.length === 0 && <EmptyState text="No Pokémon found" />}
        {!loading && list.map((p) => (<PokemonCard key={p.id} data={p} onClick={() => openDetail(p)} />))}
      </div>
      {!loading && list.length > 0 && (<div className="mt-6"><Pagination page={page} totalPages={totalPages} onChange={setPage} /></div>)}
      <PokemonDetailModal open={open} onClose={() => setOpen(false)} data={selected} />
    </main>
  )
}
