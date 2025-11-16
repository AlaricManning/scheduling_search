// app/api/suggest/route.ts
import { NextResponse } from 'next/server'
import { constraintTemplates } from '@/lib/templates'

export async function POST(req: Request) {
  const { text } = await req.json()
  if (!text?.trim()) return NextResponse.json([])

  const lower = text.toLowerCase()

  const matches = constraintTemplates
    .flatMap(t => t.examples ?? [])  // ← SAFE: default to []
    .filter(ex => ex.toLowerCase().includes(lower))
    .slice(0, 5)

  return NextResponse.json(matches)
}