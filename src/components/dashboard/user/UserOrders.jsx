import { useState, useEffect } from 'react';
import { getMyOrders } from '../../../services/orderAPI';
import toast from 'react-hot-toast';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getMyOrders();
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
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">My Orders</h2>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Order #{order._id}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-800 dark:text-white">${order.totalPrice?.toFixed(2)}</p>
                  <span className={`mt-1 py-1 px-3 rounded-full text-xs ${order.isDelivered ? 'bg-green-200 text-green-600' : 'bg-yellow-200 text-yellow-600'}`}>
                    {order.isDelivered ? 'Delivered' : 'Processing'}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Items:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400">
                  {order.orderItems?.map(item => (
                    <li key={item._id}>{item.title} (x{item.quantity})</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
