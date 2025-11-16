# scheduling_search
semantic search interface that translates natural language scheduling objectives into structured constraint templates for sports league scheduling optimization.

## WorkFlow
**User Input**
↓
**[OpenAI]** → Embedding (3072-dim vector)
↓
**[pgvector]** → Vector similarity search (cosine)
↓
**Best Template Match**
↓
**[gpt-4o]** → Extract parameters (min, max, games, etc.)
↓
**UI** → **Template** + **Confidence** + **Alternatives**


## Features / Approach

- **Login + Logout** via Supabase Auth
- **Real-time natural language search** with debounced input
- **Semantic matching** using `pgvector` + OpenAI embeddings
- **Parameter extraction** via `gpt-4o` function calling
- **Confidence scoring** + **alternative interpretations**
- **Input validation** (400 char limit, required text)
- **Responsive UI** with Tailwind CSS
- **Secure env vars** (no secrets exposed)
- **Deployed on Vercel** in <60 seconds

## Reason for Approach
 - Main concern was speed to delivery with required functionality
 - Using Supabase for Auth and already had OpenAI account so could quickly make OpenAI embeddings + `pgvector` work with a Supabase DB
 - Next.js: Required
 - Jest: Comfortability
 - Vercel: Ease of Use and familiarity

## Trade Offs
| Option | Easy to Use? | Cost | Best For |
|--------|--------------|------|----------|
| **OpenAI + Supabase pgvector** | Easy (Already Using Supabase) | Very cheap | Small apps, quick test |
| **Algolia AI Search** | Very easy (no code) | Free → $1/month | Fancy search UI |
| **Pinecone** | Easy (SDK) | Free → $10+/month | Big apps |
| **Qdrant** | Medium (need server) | Free (self-host) | Saving money later |

---

## Challenges
- Rusty Javascript
- Param Extraction: Could do a better job with a dedicated Named Entity Recognition (NER) model

---

## Live Demo

[https://schedulingsearchvercel-3g40mqzd3-alaricmannings-projects.vercel.app/](https://schedulingsearchvercel-3g40mqzd3-alaricmannings-projects.vercel.app/)

- **Test Email**: alaric.manning.career@gmail.com
- **Test Pass**: test0000

---

## How It Works

1. **Type a scheduling goal**  
   → e.g., `Ensure all rivalry games on a weekend on ESPN`

2. **OpenAI generates embedding**  
   → `text-embedding-3-large`

3. **Supabase `pgvector` finds closest template**  
   → `match_templates` function

4. **GPT-4o extracts parameters**  
   → `min`, `max`, `games`, `rounds`, etc.

5. **Result displayed** with:
   - Matched template
   - Parsed constraint
   - Extracted parameters
   - Confidence score
   - Alternatives

---

## Example Output
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

```json
{
  "template": "Template 1: Game Scheduling Constraints",
  "confidence": 0.92,
  "parsedConstraint": "Ensure that at least 1 and at most 999 games from rivalry_games are scheduled across weekend_rounds and played in any venue from all_venues and assigned to any of ESPN.",
  "parameters": {
    "min": 1,
    "max": 999,
    "games": ["rivalry_games"],
    "rounds": ["weekend_rounds"],
    "venues": ["all_venues"],
    "networks": ["ESPN"]
  },
  "alternatives": []
}