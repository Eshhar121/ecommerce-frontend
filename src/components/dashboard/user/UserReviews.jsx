import { useState, useEffect } from 'react';
import { getMyReviews } from '../../../services/userAPI';
import { updateReview, deleteReview } from '../../../services/productAPI'; // Assuming review updates/deletes are in productAPI
import toast from 'react-hot-toast';
import Modal from '../../shared/Modal';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`text-yellow-400 ${i <= rating ? '' : 'opacity-30'}`}>
        &#9733;
      </span>
    );
  }
  return <div>{stars}</div>;
};

export default function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getMyReviews();
      setReviews(response.data || []);
    } catch (err) {
      setError('Failed to fetch your reviews.');
      toast.error('Failed to fetch your reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedReview || !selectedReview.comment.trim()) return toast.error('Review cannot be empty.');

    const toastId = toast.loading('Updating review...');
    try {
      await updateReview(selectedReview._id, { 
        rating: selectedReview.rating,
        comment: selectedReview.comment
      });
      toast.success('Review updated successfully!', { id: toastId });
      setIsEditModalOpen(false);
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update review.', { id: toastId });
    }
  };

  const handleDelete = async () => {
    if (!selectedReview) return;

    const toastId = toast.loading('Deleting review...');
    try {
      await deleteReview(selectedReview._id);
      toast.success('Review deleted successfully!', { id: toastId });
      setIsDeleteModalOpen(false);
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete review.', { id: toastId });
    }
  };

  // Modal handlers
  const openEditModal = (review) => {
    setSelectedReview({ ...review });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (review) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  if (loading) return <div className="text-center p-4">Loading your reviews...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">My Reviews</h2>
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{review.product?.title || 'Product Title'}</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
               <div className="mt-4 flex justify-end space-x-2">
                  <button onClick={() => openEditModal(review)} className="text-sm text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => openDeleteModal(review)} className="text-sm text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">You haven't written any reviews yet.</p>
          </div>
        )}
      </div>

      {/* Edit Review Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Review">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
            <input 
              type="number" 
              min="1" 
              max="5" 
              value={selectedReview?.rating || ''}
              onChange={(e) => setSelectedReview({ ...selectedReview, rating: parseInt(e.target.value) })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Comment</label>
            <textarea 
              value={selectedReview?.comment || ''}
              onChange={(e) => setSelectedReview({ ...selectedReview, comment: e.target.value })}
              rows="4"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <p className="dark:text-gray-300">Are you sure you want to delete this review?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          <button type="button" onClick={handleDelete} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
