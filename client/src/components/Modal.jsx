import React, { useContext } from "react";
//import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/Authcontext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";
import SocialLogin from "./SocialLogin";
// import UserServices from "../services/user.service";

const Modal = ({ name }) => {
  const { login, signUpWithGoogle, signUpWithGithub, signUpWithFacebook } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // รับข้อมูล location
  const from = location?.state?.from?.pathname || "/"; // ใช้งาน location เพื่อระบุเส้นทางกลับ

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        //TODO

        console.log("User logged in:", user);
        Swal.fire({
          icon: "success",
          title: "Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("signin").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  };

  // const GithubSignUp = () => {
  //   signUpWithGithub()
  //     .then(async (result) => {
  //       const user = result.user;
  //       console.log("User logged in:", user);
  //       await UserServices.addUser(user.email);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Github Singup Successfully",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       document.getElementById("login").close();
  //       navigate(from, { replace: true });
  //     })
  //     .catch((error) => {
  //       console.error("Login failed:", error.message);
  //     });
  // };

  // const googleSignUp = () => {
  //   signUpWithGoogle()
  //     .then(async (result) => {
  //       const user = result.user;
  //       console.log("User logged in:", user);
  //       await UserServices.addUser(user.email);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Google Singup Successfully",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       document.getElementById("login").close();
  //       navigate(from, { replace: true });
  //     })
  //     .catch((error) => {
  //       console.error("Login failed:", error.message);
  //     });
  // };

  // const FaceBookSignUp = () => {
  //   signUpWithFacebook()
  //     .then(async (result) => {
  //       const user = result.user;
  //       console.log("User logged in:", user);
  //       await UserServices.addUser(user.email);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Google Singup Successfully",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       document.getElementById("login").close();
  //       navigate(from, { replace: true });
  //     })
  //     .catch((error) => {
  //       console.error("Login failed:", error.message);
  //     });
  // };

  return (
    <div>
      <dialog id={name} className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById(name).close()}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Please Login</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: "Password is required" })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-red text-white">Login</button>
            </div>
          </form>

          <p className="text-center mt-6">
            Don&apos;t have an account?
            <a href="/signup" className="text-blue-500 hover:underline">
              {" "}
              Sign Up Now!
            </a>
          </p>

          {/* <div className="text-center space-x-3 mt-6">
            <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
              <FaGoogle onClick={googleSignUp} />
            </button>
            <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
              <FaGithub onClick={GithubSignUp} />
            </button>
            <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
              <FaFacebook onClick={FaceBookSignUp} />
            </button>
          </div> */}
          <SocialLogin />
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
