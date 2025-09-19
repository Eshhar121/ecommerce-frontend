import { useState } from 'react';
import AdminOverview from '../components/dashboard/admin/AdminOverview';
import ManageUsers from '../components/dashboard/admin/ManageUsers';
import ManageOrders from '../components/dashboard/admin/ManageOrders';
import ManageProducts from '../components/dashboard/admin/ManageProducts';
import ManageCategories from '../components/dashboard/admin/ManageCategories';
import SystemLogs from '../components/dashboard/admin/SystemLogs';
import AdminSettings from '../components/dashboard/admin/AdminSettings';
import useAuth from '../hooks/useAuth';
import ThemeToggle from '../components/ThemeToggle';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const { logout } = useAuth();

  const tabs = {
    Overview: <AdminOverview />,
    Users: <ManageUsers />,
    Orders: <ManageOrders />,
    Products: <ManageProducts />,
    Categories: <ManageCategories />,
    Logs: <SystemLogs />,
    Settings: <AdminSettings />,
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
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

export default AdminDashboard;
