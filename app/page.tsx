// app/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ClientSearch from '@/components/ClientSearch'
import LogoutButton from '../components/LogoutButton'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-900">
              Scheduling Constraint Translator
            </h1>
            <p className="text-gray-600 mt-1">
              Type natural language to get structured constraints
            </p>
          </div>
          <LogoutButton />
        </div>

        <ClientSearch />
      </div>
    </main>
  )
}