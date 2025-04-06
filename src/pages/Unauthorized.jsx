import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Unauthorized() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 max-w-xl flex flex-col justify-center rounded shadow-md">
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://www.uninunez.edu.co/images/logotxttealw.svg"
            alt="INUÑEZ Logo"
            className="h-12"
          />
        </div>
        <FontAwesomeIcon icon={faWarning} className='text-orange-500 text-7xl mb-4' />
        <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">
          Acceso no autorizado
        </h2>
        <p className="text-center text-orange-600 ">
          Esta aplicacion esta restringida solo al personal miembro de la CURN.
          Si no eres parte de la comunidad, por favor no intentes acceder a
          ella.
        </p>
      </div>
    </div>
  );
}
