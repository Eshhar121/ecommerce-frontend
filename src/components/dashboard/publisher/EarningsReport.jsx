import { useState, useEffect } from 'react';
import { getEarnings } from '../../../services/publisherAPI';
import toast from 'react-hot-toast';

const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
  </div>
);

export default function EarningsReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        setLoading(true);
        const response = await getEarnings();
        console.log(response);
        
        setReport(response.data);
      } catch (err) {
        setError('Failed to fetch earnings report.');
        toast.error('Failed to fetch earnings report.');
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  if (loading) return <div className="text-center p-4">Loading earnings report...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Earnings Report</h2>
      {report ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Revenue" value={`$${report.totalRevenue?.toFixed(2) || '0.00'}`} />
            <StatCard title="Total Orders" value={report.totalOrders || 0} />
            <StatCard title="Best Seller Revenue" value={`$${report.bestSeller?.revenue?.toFixed(2) || '0.00'}`} />
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-800 dark:text-white">Best Seller: {report.bestSeller?.title || 'N/A'}</h3>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Recent Transactions</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {report.recentTransactions && report.recentTransactions.length > 0 ? (
                    report.recentTransactions.map(transaction => (
                        <li key={transaction._id} className="py-2 flex justify-between">
                            <span>Order #{transaction.orderId}</span> 
                            <span>${transaction.amount?.toFixed(2)}</span>
                        </li>
                    ))
                ) : (
                    <li className="py-2 text-gray-500 dark:text-gray-400">No recent transactions.</li>
                )}
            </ul>
          </div>

        </div>
      ) : (
        <div className="text-center p-4">No earnings data available.</div>
      )}
    </div>
  );
}
