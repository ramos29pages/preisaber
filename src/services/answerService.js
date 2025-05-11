// responseService.js
import axios from 'axios';
import asignacionesService from './asignService';
import { fetchFormDetails } from './formService';
import { listModels } from './modelService';
import { DEFINITIONS } from '../constants/definitions';

// Definiciones de las variables (idénticas a antes)
// 1) Definición de cada variable según tu tabla
const definitions = [...DEFINITIONS];

// Función de transformación
export function transformarRespuestas(answers) {
    const resultado = {};
    definitions.forEach(def => { resultado[def.variable] = 0; });
    answers.forEach(({ question, answer }) => {
        const def = definitions.find(d => d.question === question);
        if (!def) return;
        if (def.type === 'number') {
            const n = parseInt(answer, 10);
            resultado[def.variable] = isNaN(n) ? 0 : n;
        } else {
            resultado[def.variable] = answer.trim() === def.positive ? 1 : 0;
        }
    });
    return resultado;
}


export async function createPayload(asigmentId, answers) {

    const asignment = await asignacionesService.obtenerAsignacionPorId(asigmentId);
    const form = await fetchFormDetails(asignment.form_id);
    const model = await listModels();
    let prediction_value = 0;

    let modelSelected = model.find((model) => model.nombre.includes(form.model_name));

    try {
        const prediction = await axios.post(`https://predisaber-backend.onrender.com/resultados/predecir?path=${modelSelected.archivo}`, {
            ...transformarRespuestas(answers),
        });

        console.log('RSESULT PREDICION => ', prediction);
        prediction_value = prediction.prediction
        console.log('PREDICTION VALUE => ', prediction_value);
    } catch (error) {
        console.error('Error al obtener la asignación o el formulario:', error);
    }

    console.log(asignment);
    console.log(form);
    console.log('MODEL NAME SELECTED :=> ', modelSelected.nombre);
    console.log('MODEL :=> ', modelSelected);
    console.log('MODEL PATH :=> ', modelSelected.archivo);
    console.log('PAYLOAD PREDECIR::=> ', transformarRespuestas(answers));
    console.log('prediction_value::=> ', prediction_value);
    return {
        id_asignacion: asigmentId,
        id_modelo: modelSelected.id,
        id_formulario: form.id,
        fecha: new Date().toISOString(),
        prediccion: prediction_value,
        respuestas: transformarRespuestas(answers),
    };

}

// Servicio público: recibe el array answers y hace el POST
// async function submitResponses(answers) {
//     const payload = transformarRespuestas(answers);
//     const res = await fetch('/api/analizar', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error(`Error ${res.status}`);
//     return await res.json();
// }
