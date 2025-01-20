import { initializeApp } from "./firebase-app.js"; // asegúrate de que este archivo está en el mismo directorio o ajusta el camino relativo
import { getAuth } from "./firebase-auth.js";
import { getDatabase } from "./firebase-database.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  databaseURL: "https://base-de-datos-web-ffd19-default-rtdb.firebaseio.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
