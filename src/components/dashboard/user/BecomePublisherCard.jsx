import { useNavigate } from 'react-router-dom'
import { becomePublisher } from '../../../services/userAPI'
import useAuth from '../../../hooks/useAuth'
import toast from 'react-hot-toast'

export default function BecomePublisherCard() {
    const { user, fetchUser } = useAuth()
    const navigate = useNavigate()

    const handleBecomePublisher = async () => {
        try {
            const res = await becomePublisher()
            toast.success(res.data.message)
            await fetchUser()
            redirectByRole(user?.role)
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error updating role')
        }
    }

    const redirectByRole = (role) => {
        if (role === 'admin') navigate('/dashboard/admin')
        else if (role === 'publisher') navigate('/dashboard/publisher')
        else navigate('/dashboard/user')
    }

    return (
        <div className="p-4 border rounded bg-yellow-50 dark:bg-yellow-900 dark:text-white shadow">
            <h3 className="text-lg font-semibold mb-2">🎉 Want to publish your own products?</h3>
            <p className="mb-3">Become a publisher and start listing your products for sale.</p>
            <button
                onClick={handleBecomePublisher}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
                Become a Publisher
            </button>
        </div>
    )
}
