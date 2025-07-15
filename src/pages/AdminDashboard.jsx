import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import ThemeToggle from '../components/ThemeToggle'

// === Admin Components (placeholder, build them next) ===
import AdminOverview from '../components/dashboard/admin/AdminOverview'
import ManageUsers from '../components/dashboard/admin/ManageUsers'
import ManageOrders from '../components/dashboard/admin/ManageOrders'
import ManageProducts from '../components/dashboard/admin/ManageProducts'
import ManageCategories from '../components/dashboard/admin/ManageCategories'
import SystemLogs from '../components/dashboard/admin/SystemLogs'
import AdminSettings from '../components/dashboard/admin/AdminSettings'

const tabs = [
  'Overview',
  'Users',
  'Orders',
  'Products',
  'Categories',
  'Logs',
  'Settings',
]

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Overview')

  const renderTab = () => {
    switch (activeTab) {
      case 'Overview':
        return <AdminOverview />
      case 'Users':
        return <ManageUsers />
      case 'Orders':
        return <ManageOrders />
      case 'Products':
        return <ManageProducts />
      case 'Categories':
        return <ManageCategories />
      case 'Logs':
        return <SystemLogs />
      case 'Settings':
        return <AdminSettings />
      default:
        return null
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold">🛠️ Admin Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Welcome, {user?.name || 'Admin'}!
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

      {/* Tab Navigation */}
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

      {/* Active Tab Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mx-4 mb-8">
        {renderTab()}
      </div>
    </div>
  )
}
