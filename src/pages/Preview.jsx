// src/pages/VistaPrevia.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";               // useNavigate :contentReference[oaicite:6]{index=6}
import Swal from "sweetalert2";                                            // SweetAlert2 :contentReference[oaicite:7]{index=7}
import TablePreview from "../components/TablePreview";
import { getUserByEmail } from "../services/userService";

const VALID_HEADERS = ["identificacion", "nombre", "correo", "semestre", "tipo_prueba"];

const Preview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const rawData = state?.data || [];

  const [validData, setValidData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1) Comprobar que todos los headers requeridos estén presentes
  const headers = rawData.length > 0 ? Object.keys(rawData[0]) : [];
  const validHeaders = VALID_HEADERS.every(h => headers.includes(h));     // Array.includes + Array.every :contentReference[oaicite:8]{index=8}

  useEffect(() => {
    // Si faltan headers, avisar y redirigir
    if (!validHeaders) {
      setLoading(false);
      Swal.fire({
        title: "Formato incorrecto",
        text: "Faltan columnas obligatorias en el CSV.",
        icon: "error",
        confirmButtonText: "Volver a registros"
      }).then(() => navigate("/registros"));                              // redirección imperativa :contentReference[oaicite:9]{index=9}
      return;
    }

    (async () => {
      // 2) Filtrar filas con algún campo vacío
      const nonEmpty = rawData.filter(item =>
        VALID_HEADERS.every(key =>
          item[key] !== undefined &&
          item[key] !== null &&
          String(item[key]).trim() !== ""
        )
      );                                                                  // Array.filter :contentReference[oaicite:10]{index=10}

      // 3) Comprobar en paralelo duplicados por correo
      const checks = await Promise.all(
        nonEmpty.map(item =>
          getUserByEmail(item.correo)
            .then(exist => ({ item, exist }))
            .catch(() => ({ item, exist: false }))
        )
      );                                                                  // Promise.all :contentReference[oaicite:11]{index=11}

      const duplicates = checks.filter(c => c.exist).map(c => c.item.correo);
      const news = checks.filter(c => !c.exist).map(c => c.item);

      // 4) Si no quedan usuarios nuevos, aviso y redirigir
      if (news.length === 0) {
        await Swal.fire({
          title: "No hay usuarios válidos para guardar",
          icon: "info",
          timer: 1500,
          showConfirmButton: false
        });
        navigate("/registros");                                          // redirige cuando no hay datos :contentReference[oaicite:12]{index=12}
        return;
      }

      // 5) Si hay duplicados, mostrar lista
      if (duplicates.length > 0) {
        await Swal.fire({
          title: "Correos ya existentes",
          icon: "warning",
          html:
            `<p>No se guardarán estos correos:</p>` +
            `<ul style="text-align:left">${duplicates.map(e => `<li>${e}</li>`).join("")}</ul>`,
          confirmButtonText: "Entendido"
        });
      }

      setValidData(news);
      setLoading(false);
    })();
  }, [rawData, validHeaders, navigate]);

  if (loading) {
    return <p className="text-center">Validando datos…</p>;
  }

  // Ya no es necesario este return, pues lo manejamos vía SweetAlert y navigate
  return <TablePreview data={validData} />;
};

export default Preview;
