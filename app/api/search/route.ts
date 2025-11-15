// app/api/search/route.ts
import { searchTemplates } from '@/lib/openai'
import OpenAI from 'openai'
import type { Template } from '@/lib/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { text } = await req.json()
  console.log('Received text:', text)

  const results = await searchTemplates(text)
  console.log('Search results:', results)

  if (!results || results.length === 0) {
    return Response.json({ error: "No match" }, { status: 404 })
  }

  const best = results[0]

  // Parse parameters
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: text }],
    tools: [{
      type: 'function',
      function: {
        name: 'extract_params',
        parameters: {
          type: 'object',
          properties: {
            min: { type: 'integer', default: 1 },
            max: { type: 'integer', default: 999 },
            games: { type: 'array', items: { type: 'string' } },
            rounds: { type: 'array', items: { type: 'string' } },
            venues: { type: 'array', items: { type: 'string' } },
            networks: { type: 'array', items: { type: 'string' } },
            teams: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    }],
    tool_choice: 'auto'
  })
  console.log('Parameter extraction response:', response)
  

  const args = response.choices[0].message.tool_calls?.[0]?.function.arguments
  console.log('Extracted arguments:', args)
  const params = args ? JSON.parse(args) : {}
  console.log('Parsed parameters:', params)

  let filled = best.template
  for (const [k, v] of Object.entries(params)) {
    filled = filled.replace(new RegExp(`\\{${k}\\}`, 'g'), Array.isArray(v) ? v.join(', ') : String(v))
  }
  return Response.json({
    template: `Template ${best.id}: ${best.name}`,
    confidence: Number(best.similarity.toFixed(2)),
    parsedConstraint: filled,
    parameters: params,
    alternatives: results.slice(1).map(r => ({
      template: `Template ${r.id}: ${r.name}`,
      confidence: Number(r.similarity.toFixed(2))
    }))
  })
}