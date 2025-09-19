import { useState, useEffect } from 'react';
import { getAllOrders, markOrderAsDelivered } from '../../../services/orderAPI';
import toast from 'react-hot-toast';
import Modal from '../../shared/Modal';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modals
  const [isDeliverModalOpen, setIsDeliverModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getAllOrders();
      setOrders(response.data || []);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      toast.error('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleMarkAsDelivered = async () => {
    if (!selectedOrder) return;

    const toastId = toast.loading('Marking order as delivered...');
    try {
      await markOrderAsDelivered(selectedOrder._id);
      toast.success('Order marked as delivered.', { id: toastId });
      setIsDeliverModalOpen(false);
      fetchOrders(); // Refresh the orders list
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update order status.', { id: toastId });
    }
  };

  // Modal handlers
  const openDeliverModal = (order) => {
    setSelectedOrder(order);
    setIsDeliverModalOpen(true);
  };

  if (loading) return <div className="text-center p-4">Loading orders...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Manage Orders</h2>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-300">Order ID</th>
              <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-300">User</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Date</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Total</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Paid</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Delivered</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-200">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{order._id}</td>
                  <td className="py-3 px-6 text-left">{order.user?.name || 'N/A'}</td>
                  <td className="py-3 px-6 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-center">${order.totalPrice?.toFixed(2) || '0.00'}</td>
                  <td className="py-3 px-6 text-center">{order.isPaid ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-6 text-center">{order.isDelivered ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-6 text-center">
                    {!order.isDelivered && (
                      <button 
                        onClick={() => openDeliverModal(order)}
                        className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-3 px-6 text-center">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Deliver Confirmation Modal */}
      <Modal isOpen={isDeliverModalOpen} onClose={() => setIsDeliverModalOpen(false)} title="Confirm Delivery">
        <p className="dark:text-gray-300">Are you sure you want to mark order "{selectedOrder?._id}" as delivered?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={() => setIsDeliverModalOpen(false)} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          <button type="button" onClick={handleMarkAsDelivered} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">Confirm</button>
        </div>
      </Modal>
    </div>
  );
}
