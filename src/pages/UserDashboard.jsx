import { useState } from 'react';
import UserProfile from '../components/dashboard/user/UserProfile';
import UserOrders from '../components/dashboard/user/UserOrders';
import UserWishlist from '../components/dashboard/user/UserWishlist';
import UserReviews from '../components/dashboard/user/UserReviews';
import BecomePublisherCard from '../components/dashboard/user/BecomePublisherCard';
import useAuth from '../hooks/useAuth';
import ThemeToggle from '../components/ThemeToggle';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = {
    Profile: <UserProfile />,
    Orders: <UserOrders />,
    Wishlist: <UserWishlist />,
    Reviews: <UserReviews />,
  };

  // Conditionally add the 'Become Publisher' tab
  if (user && user.role !== 'publisher' && user.role !== 'admin') {
    tabs['Become Publisher'] = <BecomePublisherCard />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Account</h1>
        </div>
        <nav className="mt-4">
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left py-2.5 px-4 text-sm font-medium transition-colors duration-200 ${ 
                activeTab === tab 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>
              {tab}
            </button>
          ))}
          <Link
            to="/products"
            className={`w-full block text-left py-2.5 px-4 text-sm font-medium transition-colors duration-200 mt-2 
              text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className={`w-full block text-left py-2.5 px-4 text-sm font-medium transition-colors duration-200 mt-2 
              text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700`}
          >
            Cart
          </Link>
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
        {tabs[activeTab]}
      </main>
    </div>
  );
};

export default UserDashboard;
