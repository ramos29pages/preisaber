import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function AddRegisterModal({ setShowAddButtons }) {
  const navigate = useNavigate();
  return (
    <div className="flex absolute justify-center z-10 top-0 left-0 h-full flex-col items-center p-10 w-full bg-black/50 ">
      <div className="flex  flex-col p-12 rounded relative items-center justify-between max-w-2xl bg-white mb-4 animate__animated animate__bounceIn">
        <div className="flex items-center justify-between w-full mb-4">
          <button
            onClick={() => setShowAddButtons(false)}
            title="Cerrar"
            className="bg-orange-500 text-white rounded-full p-2 px-4 hover:bg-red-600 transition-all cursor-pointer absolute -top-2 -right-2"
          >
            <FontAwesomeIcon icon={faClose} size="sm" />
          </button>
        </div>

        <h1 className="text-xl text-center text-gray-600 font-semibold mb-8">
          ¿ Como deseas continuar?{" "}
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all cursor-pointer hover:scale-105"
            onClick={() => navigate("/add-user")}
          >
            <FontAwesomeIcon className="mr-2" icon={faUserPlus} size="sm" />
            Agregar usuario Individual
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all cursor-pointer hover:scale-105"
            onClick={() => navigate("/add-registers")}
          >
            <FontAwesomeIcon className="mr-2" icon={faUserPlus} size="sm" />
            Agregar desde csv o excel
          </button>
        </div>
      </div>
    </div>
  );
}
