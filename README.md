# Predisaber: App de Predicción para Pruebas Saber

![Logo de la Aplicación](./src//assets/logo.svg)

## Descripción General

Predisaber es una aplicación web desarrollada con React para ayudar a los estudiantes a prepararse para las pruebas Saber (u otras pruebas estandarizadas similares). Utiliza modelos de predicción basados en datos históricos y el rendimiento del usuario para estimar sus posibles resultados y ofrecer una guía de estudio personalizada.

La aplicación ofrece las siguientes funcionalidades principales:

* **Simulación de Pruebas:** Permite a los usuarios realizar simulaciones de las pruebas Saber en diferentes áreas.
* **Análisis de Rendimiento:** Proporciona un análisis detallado del rendimiento del usuario en las simulaciones, identificando fortalezas y debilidades.
* **Predicción de Resultados:** Estima los posibles resultados del usuario en la prueba real basándose en su desempeño.
* **Guía de Estudio Personalizada:** Ofrece recomendaciones de estudio, recursos y áreas de enfoque basadas en la predicción y el análisis de rendimiento.
* **Autenticación con Google:** Permite a los usuarios iniciar sesión de forma segura utilizando sus cuentas de Google.
* **Rutas Protegidas:** Asegura que ciertas secciones de la aplicación solo sean accesibles para usuarios autenticados y con roles específicos (administrador, estudiante, docente).

## Guía de Instalación

Sigue estos pasos para instalar y configurar la aplicación en tu entorno local.

### Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

* **Node.js** (versión recomendada: >=18.0.0) - Necesario para ejecutar el entorno de desarrollo de React (Vite) y gestionar dependencias. Puedes descargarlo desde [https://nodejs.org/](https://nodejs.org/).
* **npm** (versión recomendada: >=8.0.0) - Gestor de paquetes para Node.js, que viene instalado con Node.js.

### Pasos de Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/sindresorhus/del](https://github.com/sindresorhus/del)
    cd predisaber
    ```

2.  **Instala las dependencias del frontend:**
    ```bash
    npm install
    # o si usas yarn:
    # yarn install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env.local` en la raíz de tu proyecto y define las variables de entorno necesarias. Por ejemplo:

    ```
    VITE_BACKEND_URL=http://localhost:5000  
    VITE_GOOGLE_CLIENT_ID=TU_CLIENT_ID_GOOGLE 
    ```

    **Importante:** Las variables de entorno para React con Vite deben comenzar con `VITE_`.

    **[Añade cualquier otra variable de entorno específica que tu aplicación necesite]**

## Guía de Uso y Ejecución

Sigue estos pasos para ejecutar y utilizar la aplicación.

### Ejecución del Frontend

```bash
npm run dev

```

Este comando iniciará el servidor de desarrollo de Vite. Por defecto, la aplicación se abrirá en tu navegador en http://localhost:5173 (este puerto puede variar).

## Uso de la Aplicación

Abre tu navegador web y ve a la dirección proporcionada por Vite (normalmente http://localhost:5173).

### Registro e Inicio de Sesión: 
Utiliza el botón de "Iniciar sesión con Google" para autenticarte.
### Navegación: 
Explora las diferentes secciones de la aplicación utilizando la barra de navegación.
### Simulaciones: 
Ve a la sección de simulaciones y selecciona el área de la prueba que deseas practicar. Responde las preguntas.
### Análisis de Rendimiento: 
Revisa los resultados y el análisis de tu desempeño después de cada simulación.
## Predicción de Resultados: 
Consulta la sección de predicción para ver una estimación de tus posibles resultados.
### Guía de Estudio: 
Explora las recomendaciones de estudio personalizadas.

> Si deseas contribuir a este proyecto, por favor sigue las pautas mencionadas anteriormente en la sección de Contribución del README.md original.

# Licencia
MIT License, Apache License 2.0