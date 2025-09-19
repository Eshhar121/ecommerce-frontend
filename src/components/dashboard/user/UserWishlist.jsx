import { useState, useEffect } from 'react';
import { getWishlist, removeFromWishlist } from '../../../services/wishlistAPI';
import toast from 'react-hot-toast';
import Modal from '../../shared/Modal';

export default function UserWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modals
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedProductToRemove, setSelectedProductToRemove] = useState(null);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await getWishlist();
      setWishlist(response.data?.items || []);
    } catch (err) {
      setError('Failed to fetch your wishlist.');
      toast.error('Failed to fetch your wishlist.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async () => {
    if (!selectedProductToRemove) return;

    const toastId = toast.loading('Removing item...');
    try {
      await removeFromWishlist(selectedProductToRemove._id);
      toast.success('Item removed from wishlist.', { id: toastId });
      setIsRemoveModalOpen(false);
      fetchWishlist(); // Refetch wishlist to update the UI
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove item.', { id: toastId });
    }
  };

  // Modal handlers
  const openRemoveModal = (product) => {
    setSelectedProductToRemove(product);
    setIsRemoveModalOpen(true);
  };

  if (loading) return <div className="text-center p-4">Loading your wishlist...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div key={item._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">by {item.author}</p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-2">${item.price?.toFixed(2)}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  onClick={() => openRemoveModal(item)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Remove
                </button>
                {/* Placeholder for Add to Cart button */}
                <button className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">Your wishlist is empty.</p>
          </div>
        )}
      </div>

      {/* Remove from Wishlist Confirmation Modal */}
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)} title="Confirm Removal">
        <p className="dark:text-gray-300">Are you sure you want to remove "{selectedProductToRemove?.title}" from your wishlist?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={() => setIsRemoveModalOpen(false)} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          <button type="button" onClick={handleRemove} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
        </div>
      </Modal>
    </div>
  );
}
