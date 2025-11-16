# scheduling_search
semantic search interface that translates natural language scheduling objectives into structured constraint templates for sports league scheduling optimization.


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
| **OpenAI + Supabase pgvector** | Easy (Already Using Supabase) | Very cheap | Small apps, quick test **THIS APP** |
| **Algolia AI Search** | Very easy (no code) | Free → $1/month | Fancy search UI |
| **Pinecone** | Easy (SDK) | Free → $10+/month | Big apps |
| **Qdrant** | Medium (need server) | Free (self-host) | Saving money later |

---

## Challenges
- Rusty Javascript
- Param Extraction: Could do a better job with a more dedicated model to the task (NER / SVM / NN / BERT)
- Autocomplete search bar (messed around with getting it to work in a branch but ran out of time)

---

## Live Demo

[https://schedulingsearchvercel.vercel.app/login](https://schedulingsearchvercel.vercel.app/login)

- **Test Email**: alaric.manning.career@gmail.com
- **Test Pass**: test0000
- **Examples**
1. Schedule at least 3 of the big rivalries in the last two weeks on CBS or ESPN
2. Ensure all rivalry games on a weekend on ESPN
3. Prevent any team from playing three road games in a row after Week 6

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

## Steps
1. **Prerequisites**
- Node.js (LTS recommended, Node 18+)
2. **Clone and Install**
- git clone <https://github.com/AlaricManning/scheduling_search.git>
- cd scheduling_search
- npm install
3. **Set Env Keys**
- See .env.example
4. **DB Setup**
- Create templates table in Supabase using the queries in supabase/
5. **Seed DB**
- npm run seed
- populates the DB with template data from lib/templates.cjs
6. **Run the App**
- npm run dev
7. **Run Tests**
- npm run test

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