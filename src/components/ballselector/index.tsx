import { useBall } from '../../contexts/ball'

export default function BallSelector() {
  const { key, setKey, list } = useBall()
  
  return (
    <select value={key} onChange={(e)=>setKey(e.target.value)} className="border rounded-xl px-2 py-1.5 bg-white text-gray-900 border-gray-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 text-sm" title="Select Poké Ball">
      {list.map(b => (<option key={b.key} value={b.key}>{b.emoji} {b.label}</option>))}
    </select>
  )
}
