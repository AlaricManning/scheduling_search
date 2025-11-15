import OpenAI from 'openai'
import { supabaseAdmin } from './supabase.cjs'
import type { Template } from './types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function getEmbedding(text: string) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: text,
  })
  return res.data[0].embedding
}

export async function searchTemplates(query: string): Promise<Template[]>  {
  // console.log('Searching templates for query:', query)
  const embedding = await getEmbedding(query)
  // console.log('Query embedding obtained')
  // console.log('Calling match_templates RPC with embedding:', embedding)
  const { data, error } = await supabaseAdmin.rpc('match_templates', {
    query_embedding: embedding,
    match_threshold: 0.75,
    match_count: 3,
  })
  if (error) throw error
  return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      template: row.template,
      similarity: row.similarity
    }))
  // return data
}