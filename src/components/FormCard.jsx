// src/components/FormCard.jsx
import React from "react";

const FormCard = ({ form, onEdit }) => {
  return (
    <div
      className="bg-white rounded-md mb-4 p-4 cursor-pointer hover:scale-102 transition-all shadow-md self-center"
      onClick={() => onEdit(form.id)}
    >
      <div className="flex items-center justify-evenly">
        {form.logo && (
          <img
            className="h-12 md:h-20"
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
          {form.description && <p className="text-gray-500">{form.description}</p>}
          {form.questionCount !== undefined && <p>{form.questionCount} Preguntas</p>}
          {form.effectiveness && <p>Efectividad <span className="text-slate-950 font-bold">{form.effectiveness}</span></p>}
        </div>
      </div>
    </div>
  );
};

export default FormCard;