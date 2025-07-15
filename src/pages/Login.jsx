import { useState } from 'react'
import useAuth from './../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast';

export default function Login() {
  const { login, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({email, password})
      
      if (res?.status === 200) {
        toast.success('Login successful! 🚀');
        const role = user?.role || 'user'
        const path = `/dashboard/${role}`
        navigate(path);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back 👋</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition-colors duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          <Link to="/forgot-password" className="text-blue-500 hover:underline font-medium">
            Forgot your password?
          </Link>
        </div>

        <div className="mt-6 text-center text-gray-600">
          <p>
            New to E-Commerce?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
