// src/pages/AdminForms.jsx
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormCard from "../components/FormCard";
import FormEditor from "../components/FormEditor";
// import { FormCreator } from "../components/FormCreator";
import { fetchForms as getForms } from "../services/formService"; // Import the service functions
import AddForm from "./AddForm";
import Loader from "./Loader";
import LoaderSquare from "./LoaderSquare";
import SkeletonFormCard from './SkeletonFormCard';

const dummyForms = [
  {
    id: "dummy-1",
    name: "Dummy Form 1",
    description: "This is a dummy form for testing.",
    logo: "https://via.placeholder.com/150",
    questionCount: 10,
    effectiveness: "50%",
  },
  {
    id: "dummy-2",
    name: "Dummy Form 2",
    description: "Another dummy form example.",
    logo: "https://via.placeholder.com/150",
    questionCount: 5,
    effectiveness: "75%",
  },
];

const AdminForms = () => {
  const { isAuthenticated, user } = useAuth();
  const [forms, setForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [isCreatingForm, setIsCreatingForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadForms(); // Use a more descriptive name
    }
  }, [isAuthenticated]);

  const loadForms = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedForms = await getForms(); // Call the service function
      setForms(fetchedForms);
      console.log("Fetched Forms from try:", fetchedForms); // Debugging line
    } catch (err) {
      console.error("Error fetching forms frm catch:", err);
      setError("Failed to load forms. Please try again later.");
      setForms(dummyForms);
    } finally {
      setLoading(false);
    }
  };

  const handleEditForm = (formId) => {
    setSelectedFormId(formId);
  };

  const handleCloseEditor = () => {
    setSelectedFormId(null);
  };

  const handleUpdateFormSuccess = () => {
    handleCloseEditor();
    loadForms(); // Reload forms after a successful update
  };

  const handleCreateForm = () => {
    setIsCreatingForm(true);
  };

  const handleCloseCreator = () => {
    setIsCreatingForm(false);
  };

  const handleCreateFormSuccess = () => {
    handleCloseCreator();
    loadForms(); // Reload forms after successful creation
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // if (loading) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       <LoaderSquare />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="container mx-auto mt-4 h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4 h-screen overflow-y-scroll">
      <div className="flex justify-between items-center mb-4 px-2">
        <h1 className="text-2xl text-orange-500 font-bold">Gestion de formularios</h1>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCreateForm}
        >
          Crear Formulario
        </button>
      </div>
      <p className="mb-8 px-2 text-slate-500">
        Hola {user.given_name}, aquí puedes gestionar y crear nuevos
        formularios.
      </p>

      {loading ? (
        <div className="px-2 grid grid-cols-1 items-center md:grid-cols-2 gap-2">
          <SkeletonFormCard/>
          <SkeletonFormCard/>
        </div>
      ) : (
        <div className="px-2 grid grid-cols-1 items-center md:grid-cols-2 gap-2">
          {forms.map((form) => (
            <FormCard key={form.id} form={form} onEdit={handleEditForm} />
          ))}
        </div>
      )}

      {selectedFormId && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <FormEditor
            formId={selectedFormId}
            onClose={handleCloseEditor}
            onFormUpdated={handleUpdateFormSuccess} // Use the new success handler
          />
        </div>
      )}

      {isCreatingForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* <FormCreator onClose={handleCloseCreator} onFormCreated={handleCreateFormSuccess} */}
          <AddForm
            onClose={handleCloseCreator}
            onFormCreated={handleCreateFormSuccess}
          />
        </div>
      )}
    </div>
  );
};

export default AdminForms;
