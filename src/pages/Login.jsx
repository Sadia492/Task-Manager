import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { authContext } from "../AuthProvider/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import loginImg from "../assets/Mobile login-cuate.png";
import googleLogo from "../assets/icons8-google-48.png";

export default function Login() {
  const { signInWithGoogle, user, setUser, setLoading } =
    useContext(authContext);

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(async (result) => {
        navigate("/dashboard");
        const userData = {
          UserId: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
        };
        const { data } = await axiosPublic.post("/users", userData);

        if (data.insertedId) {
          toast.success("Registration successful");
        } else {
          toast.success("Login successful");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="min-h-screen w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-8">
      <div className="h-full flex justify-center items-center">
        <img className="h-screen" src={loginImg} alt="" />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-center">Sign In Now</h2>
        <button
          onClick={handleSignInWithGoogle}
          className="flex items-center justify-center gap-3 w-full max-w-xs px-4 py-2 border border-gray-300 bg-white shadow-xl rounded-lg transition-all hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-300"
        >
          <img src={googleLogo} alt="" />
          <span className="font-bold text-xl text-black">
            Sign In with Google
          </span>
        </button>
      </div>
    </div>
  );
}
