'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase-client'  // ← CLIENT ONLY
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input className="w-full p-3 border rounded mb-4" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-3 border rounded mb-6" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={login} className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">Login</button>
        <p className="mt-4 text-center text-sm">No account? <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
      </div>
    </div>
  )
}