import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/Auth";
import backgroundImage from '../assets/bg2.jpg';

function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-white font-sans bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay to ensure text and buttons are readable */}
      <div className="absolute inset-0 heropattern-jigsaw-white opacity-20"></div>
      <div className="absolute inset-0 bg-slate-950/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-6xl font-bold mb-8 animate-fade-in bg-clip-text text-white">
          CODESPACE
        </h1>
        <h2 className="text-xl text-slate-200 mb-4 animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-white pr-2">
          Build, Style, and Script— Web Playground to Create, Experiment, and Innovate.
        </h2>
        <p className="text-lg text-slate-400 max-w-4xl text-center mb-8">
          Welcome to your all-in-one web development playground! With separate editors for HTML, CSS, and JavaScript, you can write, style, script and watch your code come to life in real-time with the integrated live preview. Whether you're building a simple webpage or experimenting with dynamic designs, this is the perfect space to create, innovate, and bring your ideas to life.
        </p>
        <div className="space-x-4 animate-fade-in-up">
          <button
            className="px-8 py-3 text-white font-semibold text-lg rounded-lg border-2 gradient-border bg-transparent hover:bg-gradient-to-r from-purple-600/20 to-pink-600/20 transition-all duration-300"
            onClick={() => navigate("/editor")}
          >
            Start Coding
          </button>
          {!user && (
            <button
              className="px-8 py-3 text-white font-semibold text-lg bg-gradient-to-r from-purple-500 to-pink-600  hover:shadow-[0px_0px_15px_rgba(219,39,119,0.8)] transition-all duration-300" onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
