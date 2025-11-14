import { constraintTemplates } from '../lib/templates'
import { getEmbedding } from '../lib/openai'
import { supabaseAdmin } from '../lib/supabase'  // ← Server-only

async function seed() {
  for (const t of constraintTemplates) {
    const text = [...t.examples, t.name].join(' | ')
    const embedding = await getEmbedding(text)
    await supabaseAdmin.from('constraint_templates').upsert({
      id: t.id,
      name: t.name,
      template: t.template,
      examples: t.examples,
      embedding,
    }, { onConflict: 'id' })
  }
  console.log('Seeded!')
}

seed().catch(console.error)