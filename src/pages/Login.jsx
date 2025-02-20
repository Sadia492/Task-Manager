import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { authContext } from "../AuthProvider/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

export default function Login() {
  const { signInWithGoogle, user, setUser, setLoading } =
    useContext(authContext);
  console.log(user);
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
        console.log(data);
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
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center btn bg-gradient-to-r from-primary to-secondary text-white">
        <button onClick={handleSignInWithGoogle} className="flex gap-3">
          <FaGoogle></FaGoogle> Sign In With Google
        </button>
      </div>
    </div>
  );
}
