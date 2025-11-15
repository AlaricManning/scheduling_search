'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Login() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true) // for initial redirect check

  // Redirect if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.replace('/') // redirect away if logged in
      } else {
        setCheckingSession(false) // show login form
      }
    }
    checkSession()
  }, [router, supabase])

  const login = async () => {
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else if (data?.session) {
        router.push('/') // smooth client-side navigation after login
      } else {
        setError('Login failed: No session returned')
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('Unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // While checking session, don’t show form
  if (checkingSession) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">{error}</p>
        )}

        <input
          className="w-full p-3 border rounded mb-4"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 border rounded mb-6"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          className={`w-full p-3 rounded mb-4 text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-sm">
          No account?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}
