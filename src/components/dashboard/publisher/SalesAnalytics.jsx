import { useState, useEffect } from 'react';
import { getSalesAnalytics } from '../../../services/publisherAPI';
import toast from 'react-hot-toast';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await getSalesAnalytics();
        setAnalytics(response.data);
      } catch (err) {
        setError('Failed to fetch sales analytics.');
        toast.error('Failed to fetch sales analytics.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const lineChartData = {
    labels: analytics?.salesOverTime?.labels || [],
    datasets: [
      {
        label: 'Sales Over Time',
        data: analytics?.salesOverTime?.data || [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const barChartData = {
    labels: analytics?.topSellingBooks?.labels || [],
    datasets: [
      {
        label: 'Top Selling Books',
        data: analytics?.topSellingBooks?.data || [],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  if (loading) return <div className="text-center p-4">Loading analytics...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Sales Analytics</h2>
      {analytics ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Sales Trend</h3>
            <Line data={lineChartData} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Top Performers</h3>
            <Bar data={barChartData} />
          </div>
        </div>
      ) : (
        <div className="text-center p-4">No analytics data available.</div>
      )}
    </div>
  );
}
