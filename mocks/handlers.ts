// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // ---- Supabase RPC (match_templates) ----
  http.post('*/rpc/match_templates', async ({ request }) => {
    const body = await request.json();
    const embedding = (body as any).query_embedding;

    // Simple mock – return Template 1 with high similarity
    return HttpResponse.json([
      {
        id: 1,
        name: 'Game Scheduling Constraints',
        template:
          'Ensure that at least {min} and at most {max} games from {games} are scheduled across {rounds} and played in any venue from {venues} and assigned to any of {networks}.',
        similarity: 0.92,
      },
    ]);
  }),

  // ---- OpenAI embeddings (used in seed) ----
  http.post('https://api.openai.com/v1/embeddings', () => {
    return HttpResponse.json({
      data: [{ embedding: Array(3072).fill(0.01) }],
    });
  }),

  // ---- OpenAI chat (parameter extraction) ----
  http.post('https://api.openai.com/v1/chat/completions', () => {
    return HttpResponse.json({
      choices: [
        {
          message: {
            tool_calls: [
              {
                function: {
                  arguments: JSON.stringify({
                    min: 1,
                    max: 999,
                    games: ['rivalry_games'],
                    rounds: ['weekend_rounds'],
                    venues: ['all_venues'],
                    networks: ['ESPN'],
                  }),
                },
              },
            ],
          },
        },
      ],
    });
  }),
];