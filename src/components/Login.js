import React, { useState } from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "./firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
import GoogleIcon from "../assets/google.svg";
import logo from "../assets/Logo.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/editor");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/editor");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-900 gradient-border">
      
      <div className="flex items-center justify-center gap-1.5 mb-2">
        <img src={logo} alt="Codespace Logo" className="w-4 h-4" />
        <h2 className="text-lg font-semibold text-white">CODESPACE</h2>
      </div>

      <h2 className="text-3xl font-semibold text-center text-white mb-6"> 
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h2>

        <form onSubmit={handleEmailAuth} className="flex flex-col space-y-4 mb-8">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 bg-gray-800 text-white placeholder-gray-500 border border-purple-600 focus:ring-2 focus:ring-pink-600 outline-none transition duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 bg-gray-800 text-white placeholder-gray-500 border border-purple-600 focus:ring-2 focus:ring-pink-600 outline-none transition duration-300"
          />
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold text-lg transition-all duration-300 
            bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 
            hover:shadow-[0_0_15px_rgba(255,105,180,0.4)] border border-pink-600"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <Divider className="!text-sm !font-light !border-slate-400 !text-slate-400">
          OR
        </Divider>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 py-3 rounded-lg text-white font-md text-lg transition-all duration-300 
          gradient-border bg-transparent hover:bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center space-x-2"
        >
          <img src={GoogleIcon} alt="Google" className="w-6 h-6" />
          <span>Sign in with Google</span>
        </button>


        {/* Switch Login/SignUp */}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-6 text-sm text-pink-400 hover:text-purple-400 transition duration-300 text-center w-full"
        >
          {isSignUp ? "Already have an account? Login" : "New user? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default Login;
