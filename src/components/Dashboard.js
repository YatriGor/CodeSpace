import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProjects, saveProjectData, deleteProject } from "./firebase/projectService";
import Navbar from "./Navbar";
import { FaFolder, FaEdit, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getUserProjects();
    setProjects(data || []);
  };

  const handleCreate = async () => {
    if (!newProjectName) return;

    const newProject = await saveProjectData(newProjectName, "<h1>Code</h1>", "body { color: red; }", "console.log('Hello');");
    if (newProject) {
      setProjects([...projects, newProject]);
      setNewProjectName("");
    }
  };

  const handleOpen = (id) => {
    navigate(`/project/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[hsl(225,6%,13%)] text-white flex flex-col items-center">
      <Navbar />
  
      <div className="container mx-auto mt-20 px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-8">DASHBOARD</h1>
  
        {/* Create Project Section - Flex Column */}
        <div className="flex items-center gap-3 mb-6 w-1/2 ">
          <input
            type="text"
            placeholder="Enter Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="w-3/4 p-3 bg-transparent text-white placeholder-gray-500 border border-purple-600 focus:ring-2 focus:ring-pink-600 outline-none transition duration-300"
            required
          />
          <button
            onClick={handleCreate}
            className="w-1/4 px-3 py-3 text-white font-semibold text-md transition-all duration-300 gradient-border hover:from-pink-600 hover:to-purple-500 hover:shadow-[0_0_15px_rgba(255,105,180,0.3)] border border-pink-600"
          >
            Create Project
          </button>
        </div>
  
        {/* Project Cards - Centered & Takes 50% Width */}
        <div className="w-1/2 flex flex-col gap-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-[hsl(249,11%,13%)] p-4 shadow-lg border border-gray-500 flex justify-between items-center"
              >
                {/* Folder Icon & Project Name */}
                <div className="flex items-center gap-2">
                  <FaFolder className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-lg font-regular">{project.name}</h2>
                </div>
  
                {/* Edit & Delete Icons */}
                <div className="flex gap-4">
                  <button onClick={() => handleOpen(project.id)}>
                    <FaEdit className="w-5 h-5 text-green-500 hover:text-green-600 transition duration-200" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this project?")) {
                        handleDelete(project.id);
                      }
                    }}
                  >
                    <FaTrash className="w-5 h-5 text-red-500 hover:text-red-600 transition duration-200" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-md text-gray-400">No projects found. Create a new one!</p>
          )}
        </div>
      </div>
    </div>
  );  
};

export default Dashboard;
