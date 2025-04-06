import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Reemplaza "TU_CLIENT_ID_GOOGLE" con tu Client ID obtenido de Google Cloud Console.
const clientId =
  "988747005153-e6nd2nkepj6nmf233589l6s9gdhm7g0n.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
