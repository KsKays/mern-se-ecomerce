import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router"; // Assuming you are using react-router

const Index = () => {
  const auth = getAuth(); // Get Firebase Auth instance
  const user = auth.currentUser; // Get the currently signed-in user
  const [userInfo, setUserInfo] = useState({
    name: "",
    userId: "",
    imageURL: ""
  });

  const navigate = useNavigate(); // Hook for navigation

  // Load user's current profile data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.displayName || "No name provided",
        userId: user.uid,
        imageURL: user.photoURL || "https://via.placeholder.com/150"
      });
    }
  }, [user]);

  // Function to navigate to the UpdateProfile page
  const handleEditClick = () => {
    navigate('/update-profile'); // Path to your UpdateProfile component
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
        <div className="text-center">
          {userInfo.imageURL && (
            <img
              src={userInfo.imageURL}
              alt="Profile Avatar"
              className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-gray-300"
            />
          )}
          <h2 className="text-3xl font-bold mt-4">{userInfo.name}</h2>
          <p className="text-gray-500">User ID: {userInfo.userId}</p>
          <p className="mt-4 text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum mi ut ultricies. Nulla facilisi. Nullam scelerisque, quam nec iaculis vulputate, arcu lectus consequat nisi, at aliquet ligula dolor vel magna.
          </p>
          <button
            onClick={handleEditClick}
            className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
