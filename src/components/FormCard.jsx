// src/components/FormCard.jsx
import React from "react";
import { useEffect } from "react";

const FormCard = ({ form, onEdit }) => {

  useEffect(() => {
    console.log("FormCard mounted", form);
    return () => {
      console.log("FormCard unmounted", form);
    };
  }, []);

  return (
    <div
      className="bg-white rounded-md mb-4 p-4 cursor-pointer hover:scale-102 transition-all shadow-md self-center"
      onClick={() => onEdit(form.id)}
    >
      <div className="grid grid-cols-2 items-center justify-evenly">
        {form.logo && (
          <img
            className="h-18 md:h-18 min-h-12"
            src={form.logo}
            alt={form.name}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "https://www.svgrepo.com/show/9838/test.svg"; // Fallback image
            }}
          />
        )}
        <div className="text-sm md:text-md text-slate-500 text-center">
          <h2 className="text-orange-500 text-xl font-semibold">{form.name}</h2>
          {form.description && <p className="text-gray-500 text-center">{form.description}</p>}
          {form.questions !== undefined && <p className="text-slate-900 font-bold text-md md:text-xl">{form.questions.length} Preguntas</p>}
        </div>
      </div>
    </div>
  );
};

export default FormCard;