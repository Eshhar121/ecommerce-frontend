import { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../../services/categoryAPI';
import toast from 'react-hot-toast';
import Modal from '../../shared/Modal';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // State for modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response.data || []);
    } catch (err) {
      setError('Failed to fetch categories.');
      toast.error('Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return toast.error('Category name is required.');
    
    const toastId = toast.loading('Creating category...');
    try {
      await createCategory({ name: newCategoryName });
      toast.success('Category created successfully!', { id: toastId });
      setNewCategoryName('');
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create category.', { id: toastId });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !selectedCategory.name.trim()) return;

    const toastId = toast.loading('Updating category...');
    try {
      await updateCategory(selectedCategory._id, { name: selectedCategory.name });
      toast.success('Category updated successfully!', { id: toastId });
      setIsEditModalOpen(false);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update category.', { id: toastId });
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    const toastId = toast.loading('Deleting category...');
    try {
      await deleteCategory(selectedCategory._id);
      toast.success('Category deleted successfully!', { id: toastId });
      setIsDeleteModalOpen(false);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete category.', { id: toastId });
    }
  };

  // Modal handlers
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Manage Categories</h2>
      
      <form onSubmit={handleCreate} className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Add New Category</h3>
        <div className="flex items-center">
          <input 
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter new category name"
            className="flex-grow p-2 border rounded-l-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">Add</button>
        </div>
      </form>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-300">Name</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-200">
            {categories.map((cat) => (
              <tr key={cat._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                <td className="py-3 px-6 text-left">{cat.name}</td>
                <td className="py-3 px-6 text-center">
                  <button onClick={() => openEditModal(cat)} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2">Edit</button>
                  <button onClick={() => openDeleteModal(cat)} className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Category">
        <form onSubmit={handleUpdate}>
          <input 
            type="text"
            value={selectedCategory?.name || ''}
            onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <p className="dark:text-gray-300">Are you sure you want to delete the category "{selectedCategory?.name}"?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          <button type="button" onClick={handleDelete} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
