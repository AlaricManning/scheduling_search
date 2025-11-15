# scheduling_search
semantic search interface that translates natural language scheduling objectives into structured constraint templates for sports league scheduling optimization.


## Features

- **Login + Logout** via Supabase Auth
- **Real-time natural language search** with debounced input
- **Semantic matching** using `pgvector` + OpenAI embeddings
- **Parameter extraction** via `gpt-4o` function calling
- **Confidence scoring** + **alternative interpretations**
- **Input validation** (400 char limit, required text)
- **Responsive UI** with Tailwind CSS
- **Secure env vars** (no secrets exposed)
- **Deployed on Vercel** in <60 seconds

---

## Live Demo

[https://scheduling-search.vercel.app](https://scheduling-search.vercel.app)

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