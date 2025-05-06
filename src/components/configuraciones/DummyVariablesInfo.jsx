import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faListUl, faChartBar } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';

const DummyVariablesInfo = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 animate__animated animate__fadeIn">
        <div className="flex items-center gap-3 mb-6 border-b-2 border-b-gray-300 pb-4">
          <FontAwesomeIcon
            icon={faQuestionCircle}
            size="xl"
            className="text-orange-500 animate__animated animate__pulse"
          />
          <h1 className="text-2xl text-orange-500 font-bold animate__animated animate__slideInLeft">
            ¿Cuándo poner 0 o 1 en las Variables Dummy?
          </h1>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">
            Entendiendo las Variables Dummy
          </h2>
          <p className="text-gray-600 mb-2">
            Las variables dummy son cruciales para representar información categórica en un formato numérico que los algoritmos de Machine Learning puedan procesar. Asignamos valores binarios para indicar la presencia o ausencia de una característica.
          </p>
          <div className="bg-gray-50 rounded-md p-4">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faListUl} className="text-gray-500 mr-2" />
              <span className="font-medium text-gray-800">Valor 1:</span>
              <span className="ml-1 text-gray-600">La característica está presente o es verdadera para el estudiante.</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faListUl} className="text-gray-500 mr-2" />
              <span className="font-medium text-gray-800">Valor 0:</span>
              <span className="ml-1 text-gray-600">La característica está ausente o es falsa para el estudiante.</span>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">
            Ejemplos de Variables Dummy
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-orange-500">INST_CARACTER_ACADEMICO_UNIVERSIDAD:</span>
              <span className="ml-1">
                <span className="font-medium text-gray-800">1</span> si el estudiante asiste a una universidad.<br />
                <span className="font-medium text-gray-800">0</span> si el estudiante asiste a otro tipo de institución.
              </span>
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-orange-500">ESTU_GENERO_M:</span>
              <span className="ml-1">
                <span className="font-medium text-gray-800">1</span> si el estudiante es hombre.<br />
                <span className="font-medium text-gray-800">0</span> si el estudiante es mujer.
              </span>
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">
            Predicción con 0 o 1 y la Mediana
          </h2>
          <p className="text-gray-600 mb-2">
            En este contexto, la variable objetivo es <span className="font-semibold text-orange-500">PERCENTIL_GLOBAL</span>, que representa el percentil global del estudiante en la prueba Saber Pro. Se ha binarizado esta variable utilizando la mediana como punto de corte:
          </p>
          <div className="bg-gray-50 rounded-md p-4">
            {/* <p className="text-gray-600 mb-2">
              <span className="font-medium text-gray-800">Mediana:</span> El punto de referencia es un percentil global de <span className="font-semibold">50</span>.
            </p> */}
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faChartBar} className="text-gray-500 mr-2" />
              <span className="font-medium text-gray-800">Valor 1:</span>
              <span className="ml-1 text-gray-600">Estudiantes con un percentil global <span className="font-semibold">igual o superior a 50</span> (por encima o en la mediana).</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faChartBar} className="text-gray-500 mr-2" />
              <span className="font-medium text-gray-800">Valor 0:</span>
              <span className="ml-1 text-gray-600">Estudiantes con un percentil global <span className="font-semibold">inferior a 50</span> (por debajo de la mediana).</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 italic">
            --
          </p>
        </section>
      </div>
    </div>
  );
};

export default DummyVariablesInfo;