import { useState, useEffect } from 'react';
import { getPublisherProfile, updatePublisherProfile } from '../../../services/publisherAPI';
import toast from 'react-hot-toast';

export default function PublisherProfile() {
  const [profile, setProfile] = useState({ brandName: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getPublisherProfile();
        setProfile(response.data || { brandName: '', bio: '' });
      } catch (err) {
        setError('Failed to fetch profile.');
        toast.error('Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Saving profile...');
    try {
      await updatePublisherProfile(profile);
      toast.success('Profile updated successfully!', { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading profile...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Publisher Profile</h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <label htmlFor="brandName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand Name</label>
            <input 
              type="text" 
              name="brandName" 
              id="brandName" 
              value={profile.brandName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="e.g., Awesome Books Inc."
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Biography / About Us</label>
            <textarea 
              name="bio" 
              id="bio" 
              rows="6"
              value={profile.bio}
              onChange={handleChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Tell us about your publishing house..."
            ></textarea>
          </div>
        </div>
        <div className="mt-6">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
