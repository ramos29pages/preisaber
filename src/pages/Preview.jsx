// src/pages/VistaPrevia.jsx
import { useLocation } from 'react-router-dom';
import TablePreview from '../components/TablePreview';

const VALID_HEADERS = ['identificacion', 'nombre', 'correo', 'tipo_prueba'];


// Función para transformar cada objeto al formato correcto para la "BD"
// Formato esperado:
// {
//    id: <number>,
//    name: <string>,
//    email: <string>,
//    role: <string> (por defecto "estudiante" si no se especifica),
//    identificacion: <string o number>,
//    tipo_prueba: <string>,
//    picture: <string> (generado con Dicebear a partir del nombre)
// }


const Preview = () => {
  const { state } = useLocation();

  const data = state?.data || [];

  // Puedes desactivar la validación de cabeceras si ya tienes control sobre el CSV;
  // de lo contrario, verifica que el primer registro contenga las claves esperadas.
  const valid_headers = data.length > 0
    ? Object.keys(data[0]).every((header) => VALID_HEADERS.includes(header))
    : false;



  if (data.length > 0 && valid_headers) {
    return (
        <TablePreview data={data}></TablePreview>
    );
  } else {
    return (
      <h1 className="text-center text-red-500 text-xl">
        Formato de datos no válido
      </h1>
    );
  }
};

export default Preview;
