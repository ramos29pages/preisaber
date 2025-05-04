import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import ResultsDesktop from "../components/Resultados/ResultsDesktop";
import ResultsMobile from "../components/Resultados/ResultsMobile";

// Datos mock proporcionados
const resultados = [
  {
    id: "fr14f1rf1rf",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.5,
    responses: [
      { question: "¿Qué es?", response: "Porque sí" },
      { question: "¿Cómo funciona?", response: "Así funciona" },
      { question: "¿Por qué?", response: "Porque quiero" },
    ],
  },
  {
    id: "fr14f1rf1rg",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.2,
    responses: [
      { question: "¿Qué es?", response: "Mock respuesta 1" },
      { question: "¿Cómo funciona?", response: "Mock respuesta 2" },
      { question: "¿Por qué?", response: "Mock respuesta 3" },
    ],
  },
  {
    id: "fr14f1rf1rf",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.5,
    responses: [
      { question: "¿Qué es?", response: "Porque sí" },
      { question: "¿Cómo funciona?", response: "Así funciona" },
      { question: "¿Por qué?", response: "Porque quiero" },
    ],
  },
  {
    id: "fr14f1rf1rg",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.2,
    responses: [
      { question: "¿Qué es?", response: "Mock respuesta 1" },
      { question: "¿Cómo funciona?", response: "Mock respuesta 2" },
      { question: "¿Por qué?", response: "Mock respuesta 3" },
    ],
  },
  {
    id: "fr14f1rf1rf",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.5,
    responses: [
      { question: "¿Qué es?", response: "Porque sí" },
      { question: "¿Cómo funciona?", response: "Así funciona" },
      { question: "¿Por qué?", response: "Porque quiero" },
    ],
  },
  {
    id: "fr14f1rf1rg",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.2,
    responses: [
      { question: "¿Qué es?", response: "Mock respuesta 1" },
      { question: "¿Cómo funciona?", response: "Mock respuesta 2" },
      { question: "¿Por qué?", response: "Mock respuesta 3" },
    ],
  },
  {
    id: "fr14f1rf1rf",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.5,
    responses: [
      { question: "¿Qué es?", response: "Porque sí" },
      { question: "¿Cómo funciona?", response: "Así funciona" },
      { question: "¿Por qué?", response: "Porque quiero" },
    ],
  },
  {
    id: "fr14f1rf1rg",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.2,
    responses: [
      { question: "¿Qué es?", response: "Mock respuesta 1" },
      { question: "¿Cómo funciona?", response: "Mock respuesta 2" },
      { question: "¿Por qué?", response: "Mock respuesta 3" },
    ],
  },
  {
    id: "fr14f1rf1rf",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.5,
    responses: [
      { question: "¿Qué es?", response: "Porque sí" },
      { question: "¿Cómo funciona?", response: "Así funciona" },
      { question: "¿Por qué?", response: "Porque quiero" },
    ],
  },
  {
    id: "fr14f1rf1rg",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.2,
    responses: [
      { question: "¿Qué es?", response: "Mock respuesta 1" },
      { question: "¿Cómo funciona?", response: "Mock respuesta 2" },
      { question: "¿Por qué?", response: "Mock respuesta 3" },
    ],
  },
  {
    id: "fr14f1rf1rf",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.5,
    responses: [
      { question: "¿Qué es?", response: "Porque sí" },
      { question: "¿Cómo funciona?", response: "Así funciona" },
      { question: "¿Por qué?", response: "Porque quiero" },
    ],
  },
  {
    id: "fr14f1rf1rg",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.2,
    responses: [
      { question: "¿Qué es?", response: "Mock respuesta 1" },
      { question: "¿Cómo funciona?", response: "Mock respuesta 2" },
      { question: "¿Por qué?", response: "Mock respuesta 3" },
    ],
  },
  {
    id: "fr14f1rf1rf",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.5,
    responses: [
      { question: "¿Qué es?", response: "Porque sí" },
      { question: "¿Cómo funciona?", response: "Así funciona" },
      { question: "¿Por qué?", response: "Porque quiero" },
    ],
  },
  {
    id: "fr14f1rf1rg",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.2,
    responses: [
      { question: "¿Qué es?", response: "Mock respuesta 1" },
      { question: "¿Cómo funciona?", response: "Mock respuesta 2" },
      { question: "¿Por qué?", response: "Mock respuesta 3" },
    ],
  },
  {
    id: "fr14f1rf1rf",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.5,
    responses: [
      { question: "¿Qué es?", response: "Porque sí" },
      { question: "¿Cómo funciona?", response: "Así funciona" },
      { question: "¿Por qué?", response: "Porque quiero" },
    ],
  },
  {
    id: "fr14f1rf1rg",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.2,
    responses: [
      { question: "¿Qué es?", response: "Mock respuesta 1" },
      { question: "¿Cómo funciona?", response: "Mock respuesta 2" },
      { question: "¿Por qué?", response: "Mock respuesta 3" },
    ],
  },
  {
    id: "fr14f1rf1rf",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.5,
    responses: [
      { question: "¿Qué es?", response: "Porque sí" },
      { question: "¿Cómo funciona?", response: "Así funciona" },
      { question: "¿Por qué?", response: "Porque quiero" },
    ],
  },
  {
    id: "fr14f1rf1rg",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.2,
    responses: [
      { question: "¿Qué es?", response: "Mock respuesta 1" },
      { question: "¿Cómo funciona?", response: "Mock respuesta 2" },
      { question: "¿Por qué?", response: "Mock respuesta 3" },
    ],
  },
  {
    id: "fr14f1rf1rf",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.5,
    responses: [
      { question: "¿Qué es?", response: "Porque sí" },
      { question: "¿Cómo funciona?", response: "Así funciona" },
      { question: "¿Por qué?", response: "Porque quiero" },
    ],
  },
  {
    id: "fr14f1rf1rg",
    user_id: "rfrfr82f822",
    form_id: "dedeffrr",
    asigned_by: "daniel",
    completed_at: "2024-05-10",
    prediction: 0.2,
    responses: [
      { question: "¿Qué es?", response: "Mock respuesta 1" },
      { question: "¿Cómo funciona?", response: "Mock respuesta 2" },
      { question: "¿Por qué?", response: "Mock respuesta 3" },
    ],
  },
];

export default function Resultados() {
  const [selectedResult, setSelectedResult] = useState(null);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <>
    { isDesktopOrLaptop &&  <ResultsDesktop resultados={resultados} selectedResult={selectedResult} setSelectedResult={setSelectedResult}/>}
    {isMobile && <ResultsMobile resultados={resultados} selectedResult={selectedResult} setSelectedResult={setSelectedResult}/>}
    </>
  );
}
