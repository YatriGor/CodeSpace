import { getFirestore, collection, getDocs, getDoc,addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth } from "./firebase";  // Ensure this path is correct

const db = getFirestore();
const projectsRef = collection(db, "projects");

// Fetch all projects for the logged-in user
export const getUserProjects = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const snapshot = await getDocs(projectsRef);
  return snapshot.docs
    .filter(doc => doc.data().userId === user.uid)
    .map(doc => ({ id: doc.id, ...doc.data() }));
};

// Create a new project
export const saveProjectData = async (name, html, css, js) => {
  const user = auth.currentUser;
  if (!user) return null;

  console.log("Saving project with data:", { name, html, css, js });

  const newProject = {
    name,
    html: html || "",
    css: css || "",
    js: js || "",
    userId: user.uid,
    createdAt: new Date(),
  };

  try {
    const docRef = await addDoc(projectsRef, newProject);
    console.log("Project saved with ID:", docRef.id);
    return { id: docRef.id, ...newProject };
  } catch (error) {
    console.error("Error saving project:", error);
    return null;
  }
};

export const getProjectById = async (id) => {
  const projectRef = doc(db, "projects", id);
  const projectSnap = await getDoc(projectRef);
  return projectSnap.exists() ? projectSnap.data() : null;
};

// Update an existing project
export const updateProject = async (projectId, updatedData) => {
  const projectRef = doc(db, "projects", projectId);
  await updateDoc(projectRef, updatedData);
};

// Delete a project
export const deleteProject = async (projectId) => {
  const projectRef = doc(db, "projects", projectId);
  await deleteDoc(projectRef);
};
