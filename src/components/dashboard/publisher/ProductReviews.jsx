import { useState, useEffect } from 'react';
import { getPublisherReviews } from '../../../services/productAPI';
import toast from 'react-hot-toast';

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

export default function ProductReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await getPublisherReviews();
        setReviews(response.reviews || []);
      } catch (err) {
        setError('Failed to fetch product reviews.');
        toast.error('Failed to fetch product reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleModerateReview = (reviewId, action) => {
    // Placeholder for review moderation logic (e.g., approve, reject, hide)
    toast.info(`Review ${reviewId} - Action: ${action} (Not implemented yet)`);
    // You would typically call an API here to update the review status
    // e.g., await moderateReview(reviewId, action);
  };

  if (loading) return <div className="text-center p-4">Loading reviews...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Product Reviews</h2>
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{review.product?.title || 'Product Title'}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reviewed by: {review.user?.name || 'Anonymous'}</p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-right">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  onClick={() => handleModerateReview(review._id, 'approve')}
                  className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                >
                  Approve
                </button>
                <button 
                  onClick={() => handleModerateReview(review._id, 'reject')}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">No reviews found for your products.</p>
          </div>
        )}
      </div>
    </div>
  );
}
