import { useState, useEffect } from 'react';
import { getUsers, updateUserRole, deleteUser } from '../../../services/userAPI';
import toast from 'react-hot-toast';
import Modal from '../../shared/Modal';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data || []);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
      toast.error('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const toastId = toast.loading('Updating user role...');
    try {
      await updateUserRole(userId, newRole);
      toast.success('User role updated successfully!', { id: toastId });
      fetchUsers(); // Refetch users to update UI
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update user role.', { id: toastId });
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    const toastId = toast.loading('Deleting user...');
    try {
      await deleteUser(selectedUser._id);
      toast.success('User deleted successfully!', { id: toastId });
      setIsDeleteModalOpen(false);
      fetchUsers(); // Refetch users to update UI
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete user.', { id: toastId });
    }
  };

  // Modal handlers
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  if (loading) return <div className="text-center p-4">Loading users...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Manage Users</h2>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-300">Name</th>
              <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-300">Email</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Role</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Verified</th>
              <th className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{user.name || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{user.email || 'N/A'}</td>
                  <td className="py-3 px-6 text-center">
                    <select 
                      defaultValue={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-2 rounded"
                    >
                      <option value="user">User</option>
                      <option value="publisher">Publisher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-3 px-6 text-center">{user.isVerified ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => openDeleteModal(user)} className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion">
        <p className="dark:text-gray-300">Are you sure you want to delete user "{selectedUser?.name}"?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          <button type="button" onClick={handleDelete} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
