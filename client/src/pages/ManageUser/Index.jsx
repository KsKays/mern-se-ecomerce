import React, { useEffect, useState } from "react";
import UserServices from "../../services/user.service";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await UserServices.getUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
    setLoading(false);
  };

  const handleToggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      await user.role === 'admin' ? UserServices.makeUser(user.email) : UserServices.makeAdmin(user.email);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await UserServices.deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border">
                <td className="border p-2">{user.email}</td>
                <td className="border p-2 text-center">
                  <label className="flex items-center justify-center">
                    <span className="mr-2">User</span>
                    <input
                      type="checkbox"
                      className="toggle"
                      checked={user.role === "admin"}
                      onChange={() => handleToggleRole(user)}
                    />
                    <span className="ml-2">Admin</span>
                  </label>
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-black px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Index;
