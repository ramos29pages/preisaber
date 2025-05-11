// responseService.js
import axios from 'axios';
import asignacionesService from './asignService';
import { fetchFormDetails } from './formService';
import { listModels } from './modelService';
import { DEFINITIONS } from '../constants/definitions';

// Definiciones de las variables (idénticas a antes)
// 1) Definición de cada variable según tu tabla
const definitions = [...DEFINITIONS];


const API_BASE_URL = 'https://predisaber-backend.onrender.com/resultados/predecir/68202aae3ddd4d2123e46a78'; // Reemplaza con la URL de tu API

// Función de transformación
export function transformarRespuestas(answers) {
    const resultado = {};
    definitions.forEach(def => { resultado[def.variable] = 0; });
    answers.forEach(({ question, response }) => {
        const def = definitions.find(d => d.question === question);
        if (!def) return;
        if (def.type === 'number') {
            const n = parseInt(response, 10);
            resultado[def.variable] = isNaN(n) ? 0 : n;
        } else {
            resultado[def.variable] = response.trim() === def.positive ? 1 : 0;
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
        const res = await axios.post(API_BASE_URL, {
            ...transformarRespuestas(answers),
        });

        const prediction = res.data;
        console.log('RSESULT PREDICION => ', prediction);
        prediction_value = prediction.prediccion
        console.log('PREDICTION VALUE => ', prediction_value);
    } catch (error) {
        console.error('Error al obtener la asignación o el formulario:', error);
    }

    console.log('ASIGNMENT ==> ',asignment);
    console.log('FORMULARIO ==> ',form);
    console.log('MODEL NAME SELECTED :=> ', modelSelected);
    console.log('MODEL :=> ', modelSelected);
    console.log('MODEL file :=> ', modelSelected.file);
    console.log('PAYLOAD PREDECIR::=> ', transformarRespuestas(answers));
    console.log('PAYLOAD PREDECIR::=> ', answers);
    console.log('prediction_value::=> ', prediction_value);
    return {
        user_id: asignment.user_id,
        form_id: asignment.form_id,
        asigned_id: asigmentId,
        asigned_by: asignment.asigned_by,
        completed_at: new Date().toISOString(),
        prediction: prediction_value,
        responses: answers,
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
