'use client'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

export default function SearchBox({ onResult }: { onResult: (r: any) => void }) {
  const [query, setQuery] = useState('')
  const [debounced] = useDebounce(query, 600)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (debounced.trim()) {
      setLoading(true)
      fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: debounced })
      })
        .then(r => r.json())
        .then(data => { onResult(data); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [debounced])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <textarea
        className="w-full p-5 text-lg border-2 border-gray-300 rounded-xl resize-none focus:border-blue-500 focus:outline-none"
        rows={4}
        placeholder="e.g., Ensure all rivalry games on a weekend on ESPN"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {loading && <p className="mt-3 text-sm text-gray-500 animate-pulse">Translating...</p>}
    </div>
  )
}