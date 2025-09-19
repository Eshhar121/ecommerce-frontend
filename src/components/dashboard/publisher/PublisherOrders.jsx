import { useState, useEffect } from 'react';
import { getPublisherOrders } from '../../../services/publisherAPI';
import toast from 'react-hot-toast';

export default function PublisherOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getPublisherOrders();
        setOrders(response.data || []);
      } catch (err) {
        setError('Failed to fetch your orders.');
        toast.error('Failed to fetch your orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center p-4">Loading your orders...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Your Product Orders</h2>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-300">Order ID</th>
              <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-300">Product</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Date</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Quantity</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Total Price</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-200">
            {orders.length > 0 ? (
              orders.map((orderItem) => (
                <tr key={orderItem._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{orderItem.orderId || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orderItem.product?.title || 'N/A'}</td>
                  <td className="py-3 px-6 text-center">{new Date(orderItem.date).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-center">{orderItem.quantity || 1}</td>
                  <td className="py-3 px-6 text-center">${orderItem.price?.toFixed(2) || '0.00'}</td>
                  <td className="py-3 px-6 text-center">
                    <span className={`py-1 px-3 rounded-full text-xs ${orderItem.isDelivered ? 'bg-green-200 text-green-600' : 'bg-yellow-200 text-yellow-600'}`}>
                      {orderItem.isDelivered ? 'Delivered' : 'Processing'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">No orders found for your products.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
