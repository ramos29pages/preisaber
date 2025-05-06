import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ADMINISTRADORES } from "../constants/configuration";
import VariablesInfo from "../components/configuraciones/VariablesInfo";
import DummyVariablesInfo from "../components/configuraciones/DummyVariablesInfo";

const InfoSection = ({ title, children }) => (
  <div className="mb-6 animate__animated animate__fadeIn">
    <h2 className="text-xl font-semibold text-slate-700 mb-3">{title}</h2>
    <div>{children}</div>
  </div>
);

const ListItem = ({ children }) => (
  <p className="p-3 mb-2 bg-white rounded-lg shadow-sm text-gray-600">
    {children}
  </p>
);

export default function Configuration() {
  return (
    <>
      <div className="h-dic overflow-y-auto">
        <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-b-gray-300 pb-4">
              <FontAwesomeIcon
                icon={faGears}
                size="xl"
                className="text-orange-500 animate__animated animate__pulse"
              />
              <h1 className="text-2xl text-orange-500 font-bold animate__animated animate__slideInLeft">
                Predisaber
              </h1>
            </div>

            <InfoSection title="Dominios Autorizados">
              <ListItem>curnvirtual.edu.co</ListItem>
              <ListItem>uninunez.edu.co</ListItem>
            </InfoSection>

            <InfoSection title="Roles">
              <ListItem>Estudiante</ListItem>
              <ListItem>Docente</ListItem>
            </InfoSection>

            <InfoSection title="Administradores">
              {ADMINISTRADORES.map((admin, index) => (
                <ListItem key={index}>{admin}</ListItem>
              ))}
            </InfoSection>
          </div>
        </div>
        <VariablesInfo />
        <DummyVariablesInfo/>
        <div className="flex justify-center w-full items-center">
          <div className="bg-white h-25 p-4 rounded-xl text-center">
            <p className="text-xs text-gray-400">
              <FontAwesomeIcon className="text-gray-400" icon={faInfoCircle} />{" "}
              Predisaber es una aplicacion diseñada para optar por el titulo de
              Ingenieria de Sistemas en la Corporacion Universitaria Rafael
              Nuñez. Permite registrar usuarios, formularios y modelos de
              extencion .pickle para clasificacion.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Daniel Ramos - Juan Salinas
            </p>
            <p className="text-xs text-gray-400">2025</p>
          </div>
        </div>
      </div>
    </>
  );
}
