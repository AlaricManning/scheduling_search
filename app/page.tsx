// app/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ClientSearch from '@/components/ClientSearch'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-blue-900">
          Scheduling Constraint Translator
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Type natural language to get structured constraints
        </p>
        <ClientSearch />
      </div>
    </main>
  )
}