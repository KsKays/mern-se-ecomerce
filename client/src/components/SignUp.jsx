import React, { useContext } from "react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import UserService from "../services/user.service";

const SignUp = ({ isLogin }) => {
  const { login, createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (isLogin) {
      // Login logic
      login(data.email, data.password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          Swal.fire({
            title: "Login Successful",
            text: "You have logged in successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            navigate(from); // Navigate to the original page or home
          });
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: "Login Failed",
            text: "Invalid email or password",
            icon: "error",
          });
        });
    } else {
      // Register login
      createUser(data.email, data.password)
        .then(async (result) => {
          const user = result.user;
          console.log(user);
          await UserService.addUser(user.email);
          Swal.fire({
            title: "Registration Successful",
            text: "You have registered successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            navigate(from); // Navigate to the original page or home
          });
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: "Registration Failed",
            text: "An error occurred during registration.",
            icon: "error",
          });
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-red w-full text-white">Sign Up</button>
          </div>
        </form>

        <div className="text-center space-x-3 mt-6">
          <p className="mb-4 text-gray-600">Or sign up with</p>
          <button className="btn btn-ghost btn-circle hover:bg-red-500 hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-red-500 hover:text-white">
            <FaGithub />
          </button>
          <button className="btn btn-ghost btn-circle hover:bg-red-500 hover:text-white">
            <FaFacebook />
          </button>
        </div>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In Now!
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
