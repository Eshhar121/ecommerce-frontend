import { useState } from 'react'
import { sendResetEmail } from '../services/authAPI'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await sendResetEmail(email)
            toast.success(res?.data?.message || 'Reset link sent successfully! Please check the mail')
        } catch (err) {
            toast.error(err?.response?.statusText || 'Failed to send reset link 2')
            
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-red-200">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reset Your Password 🔒</h2>
                <p className="mb-6 text-gray-600 text-sm">Enter your email and we'll send you a reset link.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded transition-colors duration-200"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    )
}
