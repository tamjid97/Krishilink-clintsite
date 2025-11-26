import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import google from "../../assets/icons8-google-48.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.int";
import { toast } from "react-toastify";
import opemeye from "../../assets/icons8-eye-24 (1).png";
import closeeye from "../../assets/icons8-eye-24 (2).png";

const Register = () => {
  const [show, setShow] = useState(false);
  const { singInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  // Google Login
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await singInWithGoogle();
      toast.success(`Welcome ${result.user.displayName || result.user.email}`);
      navigate("/"); // ✅ Google signup সফল হলে home page এ navigate
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Email + Password Signup
  const handleEmailPasswordSignup = async (e) => {
    e.preventDefault();

    const name = e.target.name?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    const photoURL = e.target.photoURL?.value;

    const regexp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexp.test(password)) {
      toast.error(
        "Password must be at least 8 characters, with uppercase, lowercase, number & special char."
      );
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name, photoURL: photoURL });
      toast.success("Registration Successful!");
      navigate("/"); // ✅ Email signup সফল হলে home page এ navigate
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="hero scale-110 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="card rounded-2xl bg-gradient-to-r from-[#58e32e] to-[#62c0f2] w-full max-w-sm shrink-0 shadow-2xl">
          <div className="flex justify-center p-5 text-3xl font-semibold text-white -mb-10">
            <p>Register now</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleEmailPasswordSignup}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input type="text" name="name" className="input" placeholder="Name" />

                <label className="label">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" />

                <label className="label">Image-URL</label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="https://example.com/photo.jpg"
                  className="input"
                />

                <div className="relative">
                  <label className="label">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    className="input"
                    placeholder="Password"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-7 top-7 cursor-pointer z-40"
                  >
                    {show ? (
                      <img src={closeeye} alt="" className="w-5 h-5" />
                    ) : (
                      <img src={opemeye} alt="" className="w-5 h-5" />
                    )}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn mt-5 w-80 border-none bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold rounded-xl"
                >
                  Register now!
                </button>

                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px w-16 bg-black"></div>
                  <span>or</span>
                  <div className="h-px w-16 bg-black"></div>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="w-[325px]"
                >
                  <div className="flex justify-center p-2 rounded-xl bg-white cursor-pointer">
                    <img
                      src={google}
                      alt="Google"
                      className="w-5 h-5 mr-2 mt-0.5"
                    />
                    <span className="text-[15px]">Continue With Google</span>
                  </div>
                </button>

                <div className="flex justify-center items-center">
                  <p className="text-[15px] mt-2">
                    Already have an account?
                    <Link to="/login" className="text-blue-500 underline">
                      {" "}
                      Login Now{" "}
                    </Link>
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
