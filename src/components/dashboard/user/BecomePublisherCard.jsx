import { useState } from 'react';
import { becomePublisher } from '../../../services/userAPI';
import toast from 'react-hot-toast';

export default function BecomePublisherCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (window.confirm('Are you sure you want to apply to become a publisher?')) {
      setIsSubmitting(true);
      try {
        // You might need to pass some data here depending on your backend requirements
        await becomePublisher({}); 
        toast.success('Your application has been submitted!');
        // Optionally, you can update the UI to reflect the application status
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to submit application.');
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Become a Publisher</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto text-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Sell Your Books on Our Platform</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">
          Join our community of publishers and reach a wider audience. Click the button below to start the application process.
        </p>
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting Application...' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}