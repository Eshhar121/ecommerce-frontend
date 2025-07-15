import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from '../services/axios'

export default function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({ password: '', confirm: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (form.password !== form.confirm) return setError('Passwords do not match');

        setLoading(true)
        setError('')
        
        try {
            const res = await axios.post(`/auth/reset-password/${token}`, {
                password: form.password,
            })

            if (res?.status === 200) {
                toast.success(res.data.message || 'Password reset successful!')
                setTimeout(() => navigate('/login'), 2000)
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-200">
            <div className="bg-white shadow-md p-8 rounded-xl max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                    Reset Your Password 🔐
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                        type="password"
                        name="confirm"
                        placeholder="Confirm New Password"
                        value={form.confirm}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded transition duration-200"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}
