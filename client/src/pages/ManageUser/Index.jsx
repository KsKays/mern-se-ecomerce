import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import Swal from "sweetalert2"; // Import SweetAlert2

const Index = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await UserService.getUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
    setLoading(false);
  };

  const handleToggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    // SweetAlert Confirmation before switching role
    const result = await Swal.fire({
      title: `Are you sure you want to make this user ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        // Update role immediately in the UI before API call to improve user experience
        const updatedUser = { ...user, role: newRole };
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === user.id ? updatedUser : u))
        );

        // Call the API to update the role on the server
        if (newRole === "admin") {
          await UserService.makeAdmin(user.email);
        } else {
          await UserService.makeUser(user.email);
        }

        Swal.fire({
          title: "Role Updated!",
          icon: "success",
        });
      } catch (error) {
        console.error("Error updating user role", error);
        // Revert the role change if the API call fails
        const revertedUser = { ...user, role: user.role };
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === user.id ? revertedUser : u))
        );
      }
    }
  };

  const handleDeleteUser = async (id) => {
    // SweetAlert Confirmation before deletion
    const result = await Swal.fire({
      title: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await UserService.deleteUser(id);
        fetchUsers(); // Re-fetch users after deletion
        Swal.fire({
          title: "User Deleted!",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting user", error);
      }
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
