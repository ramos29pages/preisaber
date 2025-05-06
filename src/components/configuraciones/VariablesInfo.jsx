import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faGraduationCap,
  faMoneyBillWave,
  faHome,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import 'animate.css';

const InfoCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4 animate__animated animate__fadeIn">
    <h3 className="text-xl font-semibold text-orange-600 mb-2">
      {title}
    </h3>
    <div className="text-gray-700">
      {children}
    </div>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center mb-2">
    <FontAwesomeIcon icon={icon} className="text-gray-500 mr-3" />
    <span className="font-medium text-gray-800">{label}:</span>
    <span className="ml-1 text-gray-600">{value}</span>
  </div>
);

const VariablesInfo = () => {
  const demographicas = {
    'Edad': 'EDAD',
    'Género (Masculino)': 'ESTU_GENERO_M',
    'Presentación en Bogotá': 'ESTU_DEPTO_PRESENTACION_BOGOTÁ',
  };

  const academicas = {
    'Carácter Académico (Universidad)': 'INST_CARACTER_ACADEMICO_UNIVERSIDAD',
    'Método del Programa (Presencial)': 'ESTU_METODO_PRGM_PRESENCIAL',
    'Semestre Cursado (8)': 'ESTU_SEMESTRECURSA_8',
    'Semestre Cursado (9)': 'ESTU_SEMESTRECURSA_9',
    'Nivel Socioeconómico IES (4)': 'ESTU_NSE_IES_4',
    'Nivel Socioeconómico Individual (2)': 'ESTU_NSE_INDIVIDUAL_2',
    'Cómo se Capacitó (Repasó por cuenta propia)': 'ESTU_COMOCAPACITOEXAMENSB11_Repasó por cuenta propia',
  };

  const financieras = {
    'Pago Matrícula (Propio)': 'ESTU_PAGOMATRICULAPROPIO_Si',
    'Pago Matrícula (Padres)': 'ESTU_PAGOMATRICULAPADRES_Si',
    'Pago Matrícula (Crédito)': 'ESTU_PAGOMATRICULACREDITO_Si',
    'Pago Matrícula (Beca)': 'ESTU_PAGOMATRICULABECA_Si',
    'Valor Matrícula (> 7 millones)': 'ESTU_VALORMATRICULAUNIVERSIDAD_Más de 7 millones',
  };

  const familiares = {
    'Educación Madre (Bachillerato completo)': 'FAMI_EDUCACIONMADRE_Secundaria (Bachillerato) completa',
    'Estrato Vivienda (2)': 'FAMI_ESTRATOVIVIENDA_Estrato 2',
    'Estrato Vivienda (3)': 'FAMI_ESTRATOVIVIENDA_Estrato 3',
    'Cuántos comparten baño (2)': 'FAMI_CUANTOSCOMPARTEBAÑO_2',
    'Cuántos comparten baño (3 o 4)': 'FAMI_CUANTOSCOMPARTEBAÑO_3 o 4',
    'Tiene Motocicleta': 'FAMI_TIENEMOTOCICLETA_Si',
    'Tiene Automóvil': 'FAMI_TIENEAUTOMOVIL_Si',
    'Tiene Horno Microondas/Gas': 'FAMI_TIENEHORNOMICROOGAS_Si',
    'Tiene Servicio de TV': 'FAMI_TIENESERVICIOTV_Si',
    'Trabajo/Labor Madre (Hogar/No trabaja/Estudia)': 'FAMI_TRABAJOLABORMADRE_Trabaja en el hogar, no trabaja o estudia',
  };

  const laborales = {
    'Horas Semana Trabaja (> 30 horas)': 'ESTU_HORASSEMANATRABAJA_Más de 30 horas',
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-orange-400 mb-6 animate__animated animate__slideInDown">
          Información de Variables
        </h2>

        <InfoCard title="Demográficas">
          {Object.entries(demographicas).map(([label, value]) => (
            <InfoItem key={label} icon={faUser} label={label} value={value} />
          ))}
        </InfoCard>

        <InfoCard title="Académicas">
          {Object.entries(academicas).map(([label, value]) => (
            <InfoItem key={label} icon={faGraduationCap} label={label} value={value} />
          ))}
        </InfoCard>

        <InfoCard title="Financieras">
          {Object.entries(financieras).map(([label, value]) => (
            <InfoItem key={label} icon={faMoneyBillWave} label={label} value={value} />
          ))}
        </InfoCard>

        <InfoCard title="Familiares">
          {Object.entries(familiares).map(([label, value]) => (
            <InfoItem key={label} icon={faHome} label={label} value={value} />
          ))}
        </InfoCard>

        <InfoCard title="Laborales">
          {Object.entries(laborales).map(([label, value]) => (
            <InfoItem key={label} icon={faBriefcase} label={label} value={value} />
          ))}
        </InfoCard>
      </div>
    </div>
  );
};

export default VariablesInfo;