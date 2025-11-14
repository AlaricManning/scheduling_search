'use client'

import { useState } from 'react'
import SearchBox from './SearchBox'
import ResultCard from './ResultCard'

export default function ClientSearch() {
  const [result, setResult] = useState<any>(null)

  return (
    <>
      <SearchBox onResult={setResult} />
      {result && <ResultCard result={result} />}
    </>
  )
}