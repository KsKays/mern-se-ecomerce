import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, updateProfile } from "firebase/auth";

const UpdateProfile = () => {
  const auth = getAuth(); // Get Firebase Auth instance
  const user = auth.currentUser; // Get the currently signed-in user
  const [initialData, setInitialData] = useState({ name: "", imageURL: "" });

  // Load user's current profile data
  useEffect(() => {
    if (user) {
      setInitialData({
        name: user.displayName || "",
        imageURL: user.photoURL || "",
      });
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Pre-fill form fields with current user data
  useEffect(() => {
    setValue("name", initialData.name);
    setValue("imageURL", initialData.imageURL);
  }, [initialData, setValue]);

  const onSubmit = async (data) => {
    if (user) {
      try {
        // ตรวจสอบว่าไม่มีการเปลี่ยนแปลงข้อมูล
        if (
          data.name === initialData.name &&
          data.imageURL === initialData.imageURL
        ) {
          alert("No changes detected. Profile not updated.");
          return; // ไม่ทำการอัปเดต
        }

        // อัปเดตข้อมูลเฉพาะชื่อถ้าชื่อมีการเปลี่ยนแปลง
        if (data.name !== initialData.name) {
          await updateProfile(user, {
            displayName: data.name,
          });
        }

        // อัปเดตภาพโปรไฟล์หาก URL มีการเปลี่ยนแปลง
        if (data.imageURL !== initialData.imageURL) {
          await updateProfile(user, {
            photoURL: data.imageURL,
          });
        }

        alert("Profile updated successfully!");

        // อัปเดตค่าที่ใช้แสดงใน UI
        setInitialData({
          name: data.name,
          imageURL: data.imageURL,
        });
        window.location.reload();
      } catch (error) {
        console.error("Error updating profile:", error.message);
        alert("Failed to update profile: " + error.message);
      }
    } else {
      alert("No user is currently signed in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="url"
              placeholder="Enter the URL of your image"
              className="input input-bordered w-full"
              {...register("imageURL")}
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="btn bg-red w-full text-white">
              Update Profile
            </button>
          </div>
        </form>

        {/* Display current profile */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold">Current Profile</h3>
          {initialData.imageURL && (
            <img
              src={initialData.imageURL}
              alt="User Avatar"
              className="w-24 h-24 mx-auto rounded-full mt-4 object-cover"
            />
          )}
          <p className="mt-2 font-medium">{initialData.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
