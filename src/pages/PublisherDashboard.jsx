import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import AddProductForm from '../components/dashboard/publisher/AddProductForm'
import ProductTable from '../components/dashboard/publisher/ProductTable'
import ProductReviews from '../components/dashboard/publisher/ProductReviews'
import EarningsReport from '../components/dashboard/publisher/EarningsReport'
import SalesAnalytics from '../components/dashboard/publisher/SalesAnalytics'
import PublisherProfile from '../components/dashboard/publisher/PublisherProfile'
import PublisherOrders from '../components/dashboard/publisher/PublisherOrders'
import ThemeToggle from '../components/ThemeToggle'

const tabs = [
  'Add Product',
  'My Products',
  'Reviews',
  'Earnings',
  'Analytics',
  'Orders',
  'Profile',
]

export default function PublisherDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Add Product')

  const renderTab = () => {
    switch (activeTab) {
      case 'Add Product':
        return <AddProductForm />
      case 'My Products':
        return <ProductTable />
      case 'Reviews':
        return <ProductReviews />
      case 'Earnings':
        return <EarningsReport />
      case 'Analytics':
        return <SalesAnalytics />
      case 'Orders':
        return <PublisherOrders />
      case 'Profile':
        return <PublisherProfile />
      default:
        return null
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white relative">
      {/* Header section with logout and theme toggle */}
      <div className="p-6 rounded mt-4 bg-white dark:bg-black text-black dark:text-white">
  🌗 This box should flip between white/black when toggling the theme.
</div>

      <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold">📋 Publisher Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Welcome, {user?.name || 'Publisher'}!
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
            className={`px-4 py-2 rounded font-medium transition-colors duration-150 ${activeTab === tab
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
