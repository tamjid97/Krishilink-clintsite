import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import google from "../../assets/icons8-google-48.png";
import opemeye from "../../assets/icons8-eye-24 (1).png";
import closeeye from "../../assets/icons8-eye-24 (2).png";
import { auth } from "../../firebase/firebase.int";
import { toast } from "react-toastify";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  sendPasswordResetEmail 
} from "firebase/auth";

const Login = () => {
  const navigate = useNavigate(); // ✅ navigation hook
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email/Password login
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter your email");
    if (!password) return toast.error("Please enter your password");

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!");
      console.log(res.user);
      navigate("/"); // ✅ redirect to home
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Welcome ${result.user.displayName || result.user.email}`);
      navigate("/"); // ✅ redirect to home
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first!");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="card rounded-2xl bg-gradient-to-r from-[#2ee3aa] to-[#73f262] w-full max-w-sm shadow-2xl">
          <div className="flex justify-center p-5 text-3xl font-semibold text-white -mb-10">
            <p>Login</p>
          </div>
          <div className="card-body">
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <label className="label">Password</label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-7 top-8 cursor-pointer z-40"
                >
                  {show ? (
                    <img src={closeeye} alt="Hide" className="w-5 h-5" />
                  ) : (
                    <img src={opemeye} alt="Show" className="w-5 h-5" />
                  )}
                </span>
              </div>

              <div>
                <a 
                  className="link link-hover cursor-pointer" 
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </a>
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

              <button type="button" onClick={handleGoogleSignIn} className="w-full">
                <div className="flex justify-center p-2 rounded-xl bg-white cursor-pointer">
                  <img src={google} alt="Google" className="w-5 h-5 mr-2 mt-0.5" />
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
