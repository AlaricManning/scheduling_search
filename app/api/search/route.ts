// app/api/search/route.ts
import { searchTemplates } from '@/lib/openai'
import OpenAI from 'openai'
import type { Template } from '@/lib/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return Response.json({ error: "Text is required" }, { status: 400 })
    }
    if (text.length > 400) {
      return Response.json({ error: "Text too long (max 400 chars)" }, { status: 400 })
    }

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
      messages: [
        {
          role: 'system',
          content: `You are a scheduling constraint parser. Extract parameters EXACTLY matching the template structure.
  Always return ALL parameters: min, max, games, rounds, venues, networks, teams (use empty arrays for unspecified).
  Use placeholder values when the user doesn't specify exact values:
  - For "all rivalry games" → games: ["rivalry_games"]
  - For "on a weekend" → rounds: ["weekend_rounds"]
  - For "on ESPN" → networks: ["ESPN"]
  - For venues not specified → venues: ["all_venues"]
  - min defaults to 1, max defaults to 999 unless specified.
  - teams defaults to empty array unless specified.`
        },
        { role: 'user', content: text }
      ],
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
      tool_choice: { type: 'function', function: { name: 'extract_params' } }
    })
    // console.log('Parameter extraction response:', response)
    

    const args = response.choices[0].message.tool_calls?.[0]?.function.arguments
    console.log('Extracted arguments:', args)

    const extracted = args ? JSON.parse(args) : {}
    // Ensure all fields exist with defaults
    const params = {
      min: extracted.min ?? 1,
      max: extracted.max ?? 999,
      games: extracted.games ?? ['rivalry_games'],
      rounds: extracted.rounds ?? ['weekend_rounds'],
      venues: extracted.venues ?? ['all_venues'],
      networks: extracted.networks ?? ['ESPN'],
      teams: extracted.teams ?? []
    }
    console.log('Parsed parameters:', params)

    let filled = best.template
    console.log('Filling template:', filled)
    const paramMap: Record<string, string> = {
      min: String(params.min),
      max: String(params.max),
      games: params.games.join(', '),
      rounds: params.rounds.join(', '),
      venues: params.venues.join(', '),
      networks: params.networks.join(', '),
      teams: params.teams.join(', ')
    }

    for (const [k, v] of Object.entries(paramMap)) {
      filled = filled.replace(new RegExp(`\\{${k}\\}`, 'g'), v)
    }
    console.log('post Filling template:', filled)

    return Response.json({
      template: `Template ${best.id}: ${best.name}`,
      confidence: Number(best.similarity.toFixed(2)),
      parsedConstraint: filled,
      parameters: params,
      alternatives: results.slice(1).map((r: Template) => ({
        template: `Template ${r.id}: ${r.name}`,
        confidence: Number(r.similarity.toFixed(2))
      }))
    })
  } catch (err: any) {
    console.error('Search failed:', err)
    return Response.json(
      { error: err.message || 'Search failed. Try again.' },
      { status: 500 }
    )
  }
}