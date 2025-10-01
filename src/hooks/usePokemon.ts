import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../service/axios'
import type { PokemonDetail, PokemonListResponse, NamedAPIResource } from '../types/pokemon'

const PAGE_SIZE = 24

export function usePokemon() {

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<PokemonDetail[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [type, setType] = useState<string>('')
  const offset = useMemo(() => (page - 1) * PAGE_SIZE, [page])
  const fetchDetail = useCallback(async (nameOrUrl: string) => {
    const url = nameOrUrl.startsWith('http') ? nameOrUrl : `/pokemon/${nameOrUrl}`
    const { data } = await api.get<PokemonDetail>(url)
    return data
  }, [])

  const fetchListPage = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      if (query.trim()) {
        const data = await fetchDetail(query.trim().toLowerCase()); setList([data]); setTotal(1); setPage(1); return
      }
      if (type) {
        const { data } = await api.get<{ pokemon: { pokemon: NamedAPIResource }[] }>(`/type/${type}`)
        const names = data.pokemon.map((p) => p.pokemon.name)
        setTotal(names.length)
        const slice = names.slice(offset, offset + PAGE_SIZE)
        const details = await Promise.all(slice.map(fetchDetail))
        setList(details); return
      }
      const { data } = await api.get<PokemonListResponse>('/pokemon', { params: { limit: PAGE_SIZE, offset } })
      setTotal(data.count)
      const details = await Promise.all(data.results.map((p) => fetchDetail(p.name)))
      setList(details)
    } catch (e: any) {
      setError(e?.message ?? 'Failed to fetch Pokémon'); setList([]); setTotal(0)
    } finally { setLoading(false) }
  }, [offset, query, type, fetchDetail])

  useEffect(() => { fetchListPage() }, [fetchListPage])

  useEffect(() => { setPage(1) }, [query, type])

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total])

  return { 
    state: { 
      list, loading, error, page, totalPages, query, type 
    }, actions: { 
      setPage, setQuery, setType, refetch: fetchListPage 
    } 
  }
}
