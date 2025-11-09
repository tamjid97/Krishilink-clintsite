import React from "react";
import { Link } from "react-router-dom"; // Link import করা হলো
import google from "../../assets/icons8-google-48.png";

const Login = () => {
  return (
    <div className="hero  min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="card rounded-2xl bg-gradient-to-r from-[#2ee3aa] to-[#73f262] w-full max-w-sm shadow-2xl">
          <div className="flex justify-center p-5 text-3xl font-semibold text-white -mb-10">
            <p>Sign In</p>
          </div>
          <div className="card-body">
            <form className="space-y-4">
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="relative">
                <label className="label">Password</label>
                <input
                  type="password" 
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />
              </div>

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="btn border-none bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:scale-105 hover:shadow-lg text-white font-semibold px-5 py-2 rounded-xl transition-all duration-300 w-full"
              >
                Login
              </button>

              <div className="flex items-center justify-center gap-2 my-2">
                <div className="h-px w-16 bg-black"></div>
                <span>or</span>
                <div className="h-px w-16 bg-black"></div>
              </div>

              <button type="button" className="w-full">
                <div className="flex justify-center p-2 rounded-xl bg-white cursor-pointer">
                  <img
                    src={google}
                    alt="Google"
                    className="w-5 h-5 mr-2 mt-0.5"
                  />
                  <span className="text-[15px]">Continue With Google</span>
                </div>
              </button>

              <div className="flex justify-center items-center mt-3">
                <p className="text-[15px]">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-500 underline">
                    Register Now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
