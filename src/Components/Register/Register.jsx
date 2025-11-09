import React, { use } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import google from "../../assets/icons8-google-48.png";

const Register = () => {
  const { singInWithGoogle } = use(AuthContext);

  const handleGoogleSignIn = (e) => {
  e.preventDefault();
    singInWithGoogle()
    .then(result =>{
      console.log(result.user);
    })
    .catch(error =>{
      console.log(error);
    })
  };

  return (
    <div className="hero  scale-110 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="text-center lg:text-left"></div>
        <div className="card rounded-2xl bg-gradient-to-r from-[#58e32e] to-[#62c0f2] w-full max-w-sm shrink-0 shadow-2xl">
          <div className="flex justify-center p-5 text-3xl font-semibold text-white -mb-10">
            <p>Register now</p>
          </div>
          <div className="card-body">
            <form>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="text"
                  className="input"
                  placeholder="name"
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
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
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Password"
                  />
                </div>

                <button className="btn mt-5 w-80 border-none bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:scale-105 hover:shadow-lg text-white font-semibold px-5 py-2 rounded-xl transition-all duration-300">
                  Register now !
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
                  <div className="mt-2">
                    <p className="text-[15px]">
                      Already have an account?{" "}
                      <Link to="/login" className="text-blue-500 underline">
                        Login Now
                      </Link>
                    </p>
                  </div>
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
