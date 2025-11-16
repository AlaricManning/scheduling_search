// __tests__/api/search.test.ts

jest.mock('@/lib/openai', () => ({
  searchTemplates: jest.fn().mockResolvedValue([
    {
      id: 1,
      name: 'Game Scheduling Constraints',
      template:
        'Ensure that at least {min} and at most {max} games from {games} are scheduled across {rounds} and played in any venue from {venues} and assigned to any of {networks}.',
      similarity: 0.92,
    },
  ]),
}))

import { searchTemplates } from '@/lib/openai'

describe('searchTemplates', () => {
  it('returns templates with similarity scores', async () => {
    const templates = await searchTemplates('rivalry ESPN weekend')
    expect(templates).toHaveLength(1)
    expect(templates[0].name).toBe('Game Scheduling Constraints')
    expect(templates[0].similarity).toBe(0.92)
  })

  it('maps response to Template type', async () => {
    const templates = await searchTemplates('test query')
    expect(templates[0]).toHaveProperty('id')
    expect(templates[0]).toHaveProperty('name')
    expect(templates[0]).toHaveProperty('template')
    expect(templates[0]).toHaveProperty('similarity')
  })
})