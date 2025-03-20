import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';
import Navbar from './Navbar';
import { saveProjectData, getProjectById } from './firebase/projectService'; // Fetch project data

function App() {
  const { projectId } = useParams(); // Get project ID from URL
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');
  const [projectName, setProjectName] = useState('Untitled Project');

  useEffect(() => {
    if (projectId) {
      // Fetch project data only if a projectId exists in the URL
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

  const handleProjectNameChange = (newName, shouldSave = false) => {
    setProjectName(newName);
    if (shouldSave) {
      saveProjectData(newName, html, css, js);
    }
  };

  return (
    <>
      <Navbar projectName={projectName} onProjectNameChange={handleProjectNameChange} />
      <div className="pane top-pane">
        <Editor language="xml" displayName="HTML" value={html} onChange={setHtml} />
        <Editor language="css" displayName="CSS" value={css} onChange={setCss} />
        <Editor language="javascript" displayName="JS" value={js} onChange={setJs} />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
