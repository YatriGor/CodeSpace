import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';
import Navbar from './Navbar';
import { saveProjectData, getProjectById, updateProject } from './firebase/projectService';
import { FaCheck } from 'react-icons/fa';
import { FaExpand, FaCompress } from 'react-icons/fa';


function App() {
  const { projectId } = useParams();
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');
  const [projectName, setProjectName] = useState('Untitled Project');
  const [isSaving, setIsSaving] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullScreen(prev => !prev);
  };

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId).then((project) => {
        if (project) {
          setHtml(project.html || '');
          setCss(project.css || '');
          setJs(project.js || '');
          setProjectName(project.name || 'Untitled Project');
        }
      });
    }
  }, [projectId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  useEffect(() => {
    if (!projectId) return;
  
    const timeout = setTimeout(() => {
      setIsSaving(true);
  
      updateProject(projectId, {
        html,
        css,
        js,
        updatedAt: new Date(),
      })
        .then(() => {
          setIsSaving(false);
          console.log('Auto-saved changes to Firebase');
        })
        .catch(err => {
          console.error("Auto-save error:", err);
          setIsSaving(false);
        });
    }, 3000);
  
    return () => clearTimeout(timeout);
  }, [html, css, js, projectId]);
  

  const handleProjectNameChange = (newName, shouldSave = false) => {
    setProjectName(newName);
  
    if (shouldSave && projectId) {
      updateProject(projectId, { name: newName })
        .then(() => {
          console.log("Project name updated successfully!");
        })
        .catch((err) => {
          console.error("Failed to update project name:", err);
        });
    }
  };
  
  useEffect(() => {
    if (isFullScreen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isFullScreen]);
  

  return (
    <>
      <Navbar projectName={projectName} onProjectNameChange={handleProjectNameChange} />
      
      <div className="fixed bottom-4 right-4 z-50">
        {isSaving ? (
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm shadow-md rounded-full px-4 py-1 text-sm text-gray-700 border border-gray-300">
            <span className="animate-spin w-3 h-3 border-[2px] border-t-gray-700 border-r-transparent border-b-transparent border-l-transparent rounded-full" />
            Saving...
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm shadow-md rounded-full px-4 py-1 text-sm text-green-700 border border-green-300">
            <FaCheck/>
            All changes saved
          </div>
        )}
      </div>


      <div className="pane top-pane">
        <Editor language="xml" displayName="HTML" value={html} onChange={setHtml} />
        <Editor language="css" displayName="CSS" value={css} onChange={setCss} />
        <Editor language="javascript" displayName="JS" value={js} onChange={setJs} />
      </div>
      {/* <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          className={isFullScreen ? "fixed inset-0 z-40 bg-white" : "w-full h-full"}
        />
      </div> */}
      <div className="relative w-full h-fit">
        {!isFullScreen && (
          <>
            <button
              onClick={toggleFullscreen}
              className="absolute top-2 right-4 z-20 text-gray-700 hover:text-black"
              title="Expand"
            >
              <FaExpand size={20} />
            </button>

            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              className="w-full h-full"
            />
          </>
        )}
      </div>

      {isFullScreen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="relative w-full h-full">
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-50 text-gray-700 hover:text-black bg-white/80 rounded-full p-2 shadow-md"
              title="Exit Fullscreen"
            >
              <FaCompress size={20} />
            </button>

            <iframe
              srcDoc={srcDoc}
              title="fullscreen-output"
              sandbox="allow-scripts"
              frameBorder="0"
              className="w-full h-full"
            />
          </div>
        </div>
      )}

    </>
  );
}

export default App;