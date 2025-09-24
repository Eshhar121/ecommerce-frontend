import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { verifyEmail } from '../services/authAPI'

export default function VerifyEmail() {
    const { token } = useParams()
    const [status, setStatus] = useState('loading')
    const navigate = useNavigate()
    const didRun = useRef(false)

    useEffect(() => {
        if (didRun.current) return
        didRun.current = true

        const verify = async () => {
            try {
                const res = await verifyEmail(token)
                toast.success(res.data.message || 'Email verified!')
                setStatus('success')
                setTimeout(() => navigate('/login'), 2500)
            } catch (err) {
                const status = err.response?.status
                const msg = err.response?.data?.message || 'Something went wrong'

                if (status === 400 || status === 404) {
                    toast.error(msg)
                } else {
                    toast.error('Server error. Try again later.')
                }
                setStatus('error')
            }
        }

        verify()
    }, [token, navigate])


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
            <div className="bg-white shadow-md p-8 rounded-xl text-center max-w-md">
                {status === 'loading' && (
                    <div>
                        <p className="text-lg font-semibold text-gray-800">Verifying your email...</p>
                        <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                )}
                {status === 'success' && (
                    <p className="text-green-600 font-bold text-xl">✅ Email verified! Redirecting...</p>
                )}
                {status === 'error' && (
                    <p className="text-red-600 font-semibold text-lg">❌ Verification failed. Try again later.</p>
                )}
            </div>
        </div>
    )
}
