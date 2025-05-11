export const DEFINITIONS = [
    { variable: 'EDAD', question: '¿Cuál es la edad del estudiante?', type: 'number' },

    { variable: 'ESTU_GENERO_M', question: '¿El estudiante es de género masculino?', type: 'binary', positive: 'Masculino' },
    { variable: 'INST_CARACTER_ACADEMICO_UNIVERSIDAD', question: '¿La institución es una universidad?', type: 'binary', positive: 'Universidad' },
    { variable: 'ESTU_METODO_PRGM_PRESENCIAL', question: '¿El programa académico es presencial?', type: 'binary', positive: 'Presencial' },

    { variable: 'ESTU_SEMESTRECURSA_8', question: '¿El estudiante está cursando el octavo semestre?', type: 'binary', positive: 'Sí' },
    { variable: 'ESTU_SEMESTRECURSA_9', question: '¿El estudiante está cursando el noveno semestre?', type: 'binary', positive: 'Sí' },

    { variable: 'ESTU_NSE_IES_4', question: '¿El nivel socioeconómico de la institución es 4?', type: 'binary', positive: '4' },
    { variable: 'ESTU_NSE_INDIVIDUAL_2', question: '¿El nivel socioeconómico individual del estudiante es 2?', type: 'binary', positive: '2' },

    { variable: 'ESTU_COMOCAPACITOEXAMENSB11_Repasó por cuenta propia', question: '¿El estudiante repasó por cuenta propia para el examen?', type: 'binary', positive: 'Repasó por cuenta propia' },

    { variable: 'ESTU_PAGOMATRICULAPROPIO_Si', question: '¿El estudiante pagó la matrícula con recursos propios?', type: 'binary', positive: 'Sí' },
    { variable: 'ESTU_PAGOMATRICULAPADRES_Si', question: '¿Los padres del estudiante pagaron la matrícula?', type: 'binary', positive: 'Sí' },
    { variable: 'ESTU_PAGOMATRICULACREDITO_Si', question: '¿La matrícula se financió con crédito?', type: 'binary', positive: 'Sí' },
    { variable: 'ESTU_PAGOMATRICULABECA_Si', question: '¿El estudiante obtuvo una beca para la matrícula?', type: 'binary', positive: 'Sí' },

    { variable: 'ESTU_VALORMATRICULAUNIVERSIDAD_Más de 7 millones', question: '¿El valor de la matrícula es más de 7 millones?', type: 'binary', positive: 'Más de 7 millones' },

    { variable: 'FAMI_EDUCACIONMADRE_Secundaria (Bachillerato) completa', question: '¿La madre del estudiante completó la secundaria (bachillerato)?', type: 'binary', positive: 'Secundaria (Bachillerato) completa' },

    { variable: 'FAMI_ESTRATOVIVIENDA_Estrato 2', question: '¿La vivienda del estudiante es de estrato 2?', type: 'binary', positive: 'Estrato 2' },
    { variable: 'FAMI_ESTRATOVIVIENDA_Estrato 3', question: '¿La vivienda del estudiante es de estrato 3?', type: 'binary', positive: 'Estrato 3' },

    { variable: 'FAMI_CUANTOSCOMPARTEBAÑO_2', question: '¿El estudiante comparte el baño con 2 personas?', type: 'binary', positive: '2' },
    { variable: 'FAMI_CUANTOSCOMPARTEBAÑO_3 o 4', question: '¿El estudiante comparte el baño con 3 o 4 personas?', type: 'binary', positive: '3 o 4' },

    { variable: 'FAMI_TIENEMOTOCICLETA_Si', question: '¿La familia del estudiante tiene motocicleta?', type: 'binary', positive: 'Sí' },
    { variable: 'FAMI_TIENEAUTOMOVIL_Si', question: '¿La familia del estudiante tiene automóvil?', type: 'binary', positive: 'Sí' },
    { variable: 'FAMI_TIENEHORNOMICROOGAS_Si', question: '¿La familia del estudiante tiene horno microondas u horno a gas?', type: 'binary', positive: 'Sí' },
    { variable: 'FAMI_TIENESERVICIOTV_Si', question: '¿La familia del estudiante tiene servicio de televisión?', type: 'binary', positive: 'Sí' },

    { variable: 'FAMI_TRABAJOLABORMADRE_Trabaja en el hogar, no trabaja o estudia', question: '¿La madre del estudiante trabaja en el hogar, no trabaja o estudia?', type: 'binary', positive: 'Trabaja en el hogar, no trabaja o estudia' },

    { variable: 'ESTU_HORASSEMANATRABAJA_Más de 30 horas', question: '¿El estudiante trabaja más de 30 horas a la semana?', type: 'binary', positive: 'Más de 30 horas' },

    { variable: 'ESTU_DEPTO_PRESENTACION_BOGOTÁ', question: '¿El estudiante presentó el examen en Bogotá?', type: 'binary', positive: 'BOGOTÁ' },
];