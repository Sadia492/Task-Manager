import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { authContext } from "../AuthProvider/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const { signInWithGoogle } = useContext(authContext);
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    signInWithGoogle().then(() => {
      navigate("/");
      toast.success("Login successful");
    });
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center btn bg-gradient-to-r from-primary to-secondary text-white">
        <button onClick={handleSignInWithGoogle} className="flex gap-3">
          <FaGoogle></FaGoogle> Sign In With Google
        </button>
      </div>
    </div>
  );
}
