import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import ThemeToggle from '../components/ThemeToggle'

// Tab Components
import UserOrders from '../components/dashboard/user/UserOrders'
import UserReviews from '../components/dashboard/user/UserReviews'
import UserWishlist from '../components/dashboard/user/UserWishlist'
import UserProfile from '../components/dashboard/user/UserProfile'
import BecomePublisherCard from '../components/dashboard/user/BecomePublisherCard'

const tabs = ['My Orders', 'My Reviews', 'My Wishlist', 'Profile']

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('My Orders')

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'My Orders':
        return <UserOrders />
      case 'My Reviews':
        return <UserReviews />
      case 'My Wishlist':
        return <UserWishlist />
      case 'Profile':
        return <UserProfile />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold">🧍 User Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Welcome, {user?.name || 'User'}!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-medium transition-colors duration-150 ${
              activeTab === tab
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mx-4 mb-8 space-y-6">
        {user?.role === 'user' && <BecomePublisherCard />}
        {renderTab()}
      </div>
    </div>
  )
}
