import React, { useContext } from "react";
import bannerImg from "../assets/time-management-marketers-teamwork-media-planning-media-representation-control-reach-your-client-best-media-plan.png";
import { Link } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";

export default function Home() {
  const { user } = useContext(authContext);
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen justify-center items-center ">
      <div className="lg:ml-20 ml-10 space-y-6">
        <h2 className="font-bold text-5xl">
          Streamline Your Tasks,
          <br /> Elevate Your Productivity!
        </h2>
        <p className="text-gray-500">
          Our task management app empowers you to organize, prioritize, and
          complete your tasks with ease. With intuitive drag-and-drop
          functionality, real-time updates, and seamless collaboration, staying
          on top of your workflow has never been easier. Whether you're managing
          personal projects or team tasks, our app keeps you focused and
          efficient—every step of the way!
        </p>
        <Link
          to={user ? "/dashboard" : "/login"}
          className="btn bg-gradient-to-r from-primary to-secondary text-white"
        >
          Get Started Now
        </Link>
      </div>
      <div>
        <img src={bannerImg} alt="" />
      </div>
    </div>
  );
}
