import { useState, useEffect } from 'react';
import { getPublisherProducts, updateProduct, deleteProduct } from '../../../services/productAPI';
import toast from 'react-hot-toast';
import Modal from '../../shared/Modal';

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getPublisherProducts();
      setProducts(response.data.products || []);
    } catch (err) {
      setError('Failed to fetch your products.');
      toast.error('Failed to fetch your products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const toastId = toast.loading('Updating product...');
    try {
      await updateProduct(selectedProduct._id, selectedProduct);
      toast.success('Product updated successfully!', { id: toastId });
      setIsEditModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product.', { id: toastId });
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    const toastId = toast.loading('Deleting product...');
    try {
      await deleteProduct(selectedProduct._id);
      toast.success('Product deleted successfully!', { id: toastId });
      setIsDeleteModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete product.', { id: toastId });
    }
  };

  // Modal handlers
  const openEditModal = (product) => {
    setSelectedProduct({ ...product }); // Create a copy to edit
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  if (loading) return <div className="text-center p-4">Loading your products...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Your Products</h2>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-300">Title</th>
              <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-300">category</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Price</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Stock</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-200">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{product.name || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{product.category || 'N/A'}</td>
                  <td className="py-3 px-6 text-center">${product.price?.toFixed(2) || '0.00'}</td>
                  <td className="py-3 px-6 text-center">{product.stock || 0}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => openEditModal(product)} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2">Edit</button>
                    <button onClick={() => openDeleteModal(product)} className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center">You have not added any products yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Product Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Product">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input type="text" name="title" value={selectedProduct?.title || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
            <input type="text" name="author" value={selectedProduct?.author || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, author: e.target.value })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
            <input type="number" name="price" value={selectedProduct?.price || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
            <input type="number" name="stock" value={selectedProduct?.stock || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <p className="dark:text-gray-300">Are you sure you want to delete "{selectedProduct?.title}"?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          <button type="button" onClick={handleDelete} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
