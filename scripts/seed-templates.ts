require('dotenv').config()
const { supabaseAdmin } = require('../lib/supabase.cjs')
const { constraintTemplates } = require('../lib/templates.cjs')
const OpenAI = require('openai')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function getEmbedding(text: string) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: text,
  })
  return res.data[0].embedding
}

async function seed() {
  for (const t of constraintTemplates) {
    const text = [...t.examples, t.name].join(' | ')
    const embedding = await getEmbedding(text)

    const { data, error } = await supabaseAdmin.from('constraint_templates').upsert([{
      id: t.id,
      name: t.name,
      template: t.template,
      examples: t.examples,
      embedding,
    }], { onConflict: 'id' })

    if (error) console.error('Supabase upsert error:', error)
    else console.log('Inserted:', t.id)
  }
  console.log('Seeded!')
}

seed().catch(console.error)
