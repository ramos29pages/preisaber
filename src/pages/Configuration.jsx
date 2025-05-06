import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ADMINISTRADORES } from "../constants/configuration";

export default function Configuration() {

  return (
    <>
      <div>
        <div className="bg-gra1-100 flex items-center gap-2 mb-8 border-b-2 border-b-gray-300 py-4">
          <FontAwesomeIcon
            icon={faGears}
            size="xl"
            className="text-orange-400"
          />
          <h1 className="text-xl md:text-2xl text-orange-400 font-bold">
            Predisaber
          </h1>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-600">
            Dominios Autorizados
          </h1>
          <p className="p-2 mb-2 bg-white rounded-xl text-gray-500">
            curnvirtual.edu.co
          </p>
          <p className="p-2 mb-2 bg-white rounded-xl text-gray-500">
            uninunez.edu.co
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-600">Roles</h1>
          <p className="p-2 mb-2 bg-white rounded-xl text-gray-500">
            Estudiante
          </p>
          <p className="p-2 mb-2 bg-white rounded-xl text-gray-500">Docente</p>
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-600">Administradores</h1>
          {ADMINISTRADORES.map((admin) => (
            <p className="p-2 mb-2 bg-white rounded-xl text-gray-500">
              {admin}
            </p>
          ))}
        </div>
        <div className="flex justify-center w-full items-center">
            <div className="bg-white h-25 p-4 rounded-xl text-center">
                
                <p className="text-xs text-gray-400"><FontAwesomeIcon className="text-gray-400" icon={faInfoCircle}/> Predisaber es una aplicacion diseñada para optar por el titulo de Ingenieria de Sistemas en la Corporacion Universitaria Rafael Nuñez. Permite registrar usuarios, formularios y modelos de extencion .pickle para clasificacion.</p>
                <p className="text-xs text-gray-400 mt-2">Daniel Ramos - Juan Salinas</p>
                <p className="text-xs text-gray-400">2025</p>
            </div>
        </div>
      </div>
    </>
  );
}
