import { useState, useEffect } from 'react';
import { getOverviewStats } from '../../../services/adminAPI';
// import { getUserStats } from '../../../services/userAPI'; // Example
// import { getOrderStats } from '../../../services/orderAPI'; // Example
import toast from 'react-hot-toast';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <div className="flex items-center">
      <div className="p-3 bg-indigo-500 text-white rounded-full mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">{title}</p>
        <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  </div>
);

export default function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch all stats in parallel
        const [overviewStatsRes] = await Promise.all([
          getOverviewStats(),
        ]);

        setStats({
          users: overviewStatsRes.data.users,
          products: overviewStatsRes.data.products,
          orders: overviewStatsRes.data.orders,
          revenue: overviewStatsRes.data.revenue,
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch statistics.');
        toast.error('Failed to fetch statistics.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading statistics...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Admin Statistics</h2>
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard 
            title="Total Products" 
            value={stats.products || 0} 
            icon={<span>📊</span>}
          />
          <StatCard 
            title="Total Users" 
            value={stats.users || 0} 
            icon={<span>📈</span>} 
          />
          <StatCard 
            title="Total Orders" 
            value={stats.orders || 0} 
            icon={<span>📈</span>} 
          />
          <StatCard 
            title="Total Revenue" 
            value={`$${stats.revenue || 0}`} 
            icon={<span>📈</span>} 
          />
        </div>
      ) : (
        <div className="text-center p-4">No statistics available.</div>
      )}
    </div>
  );
}
