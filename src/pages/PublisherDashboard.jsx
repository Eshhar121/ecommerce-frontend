import { useState } from 'react';
import AddProductForm from '../components/dashboard/publisher/AddProductForm';
import ProductTable from '../components/dashboard/publisher/ProductTable';
import ProductReviews from '../components/dashboard/publisher/ProductReviews';
import EarningsReport from '../components/dashboard/publisher/EarningsReport';
import SalesAnalytics from '../components/dashboard/publisher/SalesAnalytics';
import PublisherOrders from '../components/dashboard/publisher/PublisherOrders';
import PublisherProfile from '../components/dashboard/publisher/PublisherProfile';
import useAuth from '../hooks/useAuth';
import ThemeToggle from '../components/ThemeToggle';

const PublisherDashboard = () => {
  const [activeTab, setActiveTab] = useState('My Products');
  const { logout } = useAuth();

  const tabComponents = {
    'My Products': <ProductTable />,
    'Add Product': <AddProductForm />,
    'Product Reviews': <ProductReviews />,
    'Earnings': <EarningsReport />,
    'Analytics': <SalesAnalytics />,
    'Orders': <PublisherOrders />,
    'Profile': <PublisherProfile />,
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Publisher Panel</h1>
        </div>
        <nav className="mt-4">
          {Object.keys(tabComponents).map((tabName) => (
            <button
              key={tabName}
              onClick={() => setActiveTab(tabName)}
              className={`w-full text-left py-2.5 px-4 text-sm font-medium transition-colors duration-200 ${ 
                activeTab === tabName 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>
              {tabName}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <ThemeToggle />
          <button
            onClick={logout}
            className="w-full text-left py-2.5 px-4 text-sm font-medium text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900 transition-colors duration-200 mt-4"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        {tabComponents[activeTab]}
      </main>
    </div>
  );
};

export default PublisherDashboard;
