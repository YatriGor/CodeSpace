import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "./context/Auth";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import logo from "../assets/Logo.svg";

function Navbar({ projectName, onProjectNameChange }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRename = (e)   => {
    onProjectNameChange(e.target.value); // Update UI only
  };
  
  const saveProjectName = () => {
    setIsEditing(false);
    if (projectName.trim()) {
      onProjectNameChange(projectName.trim(), true); // Pass true to indicate saving
    }
  };

  return (
    <nav className="bg-[hsl(225,6%,13%)] text-white py-3 px-4 flex justify-between items-center w-full z-50 shadow-md">
      <div className="flex items-center gap-4">
        <Link to="/">
          <div className="flex items-center justify-center gap-1.5">
            <img src={logo} alt="Codespace Logo" className="w-5 h-5" />
            <h2 className="text-xl font-semibold text-white">CODESPACE</h2>
          </div>
        </Link>

        {/* Editable Project Name */}
        <div className="flex items-center gap-2 py-2 bg-gray-800 px-3 ml-2 rounded border-gray-500 border">
          {isEditing ? (
            <input
              type="text"
              value={projectName}
              onChange={handleRename}
              onBlur={saveProjectName}
              onKeyDown={(e) => e.key === "Enter" && saveProjectName()}
              autoFocus
              className="bg-transparent border-none outline-none text-white w-40"
            />
          ) : (
            <span>{projectName}</span>
          )}
          <FiEdit2
            className="cursor-pointer text-gray-400 hover:text-white"
            onClick={() => setIsEditing(true)}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* New Project Button */}
        <button className="px-4 py-2 gradient-border hover:from-pink-600 hover:to-purple-500 hover:shadow-[0_0_15px_rgba(255,105,180,0.3)] border border-pink-600">+ New Project</button>

        {/* Profile Icon & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
            <div className="flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 pt-1">
              <FaUserCircle className="text-4xl text-white" />
            </div>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
              {user ? (
                <>
                  <p className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">{user.email}</p>
                  <Link to="/Dashboard" className="block px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/20">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/20"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
