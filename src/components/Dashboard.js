import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProjects, saveProjectData, deleteProject } from "./firebase/projectService";
import Navbar from "./Navbar";
import { FaFolder, FaEdit, FaTrash, FaPlus, FaFileCode } from "react-icons/fa";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
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

    const newProject = await saveProjectData(
      newProjectName, 
      "<h1>Code</h1>", 
      "h1 { color: red; }", 
      "console.log('Hello');"
    );
    
    if (newProject) {
      setProjects([newProject, ...projects]);
      setNewProjectName("");
      setIsCreating(false);
    }
  };

  const handleOpen = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[hsl(225,6%,13%)] text-white flex flex-col">
      <Navbar 
        showProjectName={false}
        showNewProjectButton={false}
      />
  
      <div className="container mx-auto px-4 py-8 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">My Projects</h1>

          <button  onClick={() => setIsCreating(!isCreating)} className="px-4 py-2 gradient-border hover:from-pink-600 hover:to-purple-500 hover:shadow-[0_0_15px_rgba(255,105,180,0.3)] border border-pink-600">
            + New Project
          </button>
        </div>

        {isCreating && (
          <div className="bg-[hsl(249,11%,13%)] p-6 rounded-lg mb-8 shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Project Name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="p-3 bg-[hsl(225,6%,20%)] text-white placeholder-gray-500 border border-gray-600 rounded focus:ring-1 focus:ring-pink-600 outline-none transition duration-300"
                autoFocus
                required
              />
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded hover:shadow-lg transition-all"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-[hsl(249,11%,13%)] p-5 rounded-sm shadow-lg border border-gray-700 hover:border-pink-600 transition-all hover:shadow-[0_0_15px_rgba(255,105,180,0.2)] group"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-4">
                    <FaFolder className="text-3xl text-yellow-400 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-semibold line-clamp-1">{project.name}</h2>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-700">
                    <button 
                      onClick={() => handleOpen(project.id)}
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-blue-500 transition"
                    >
                      <FaFileCode /> Open Editor
                    </button>
                    
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this project?")) {
                            handleDelete(project.id);
                          }
                        }}
                        className="text-gray-400 hover:text-red-500 transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FaFolder className="text-5xl text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-6">Create your first project to get started</p>
          </div>
        )}
      </div>
    </div>
  );  
};

export default Dashboard;