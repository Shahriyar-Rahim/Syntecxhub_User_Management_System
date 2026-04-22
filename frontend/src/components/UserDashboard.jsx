import React, { useState } from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../features/auth/authApiSlice';
import EditUserModal from '../features/users/EditUserModal';

const UserDashboard = () => {
  const { data: response, isLoading, isError, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  
  // State for Modals
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
      } catch (err) {
        alert("Failed to delete user");
      }
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading users...</div>;
  if (isError) return <div className="p-10 text-red-500 text-center">Error: {error?.data?.message}</div>;

  const users = response?.data || [];

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            Total Users: {users.length}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Role</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id || user._id} className="hover:bg-blue-50/30 transition">
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button 
                      onClick={() => { setSelectedUser(user); setIsEditOpen(true); }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id || user._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal Component */}
      {isEditOpen && (
        <EditUserModal 
          user={selectedUser} 
          onClose={() => setIsEditOpen(false)} 
        />
      )}
    </div>
  );
};

export default UserDashboard;