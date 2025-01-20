import { auth, database } from './firebase-config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get, child } from "firebase/database";

function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Recupera los datos del usuario desde la base de datos
      const dbRef = ref(database);
      get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("Usuario verificado:", snapshot.val());
          } else {
            console.log("No se encontraron datos del usuario.");
          }
        })
        .catch((error) => {
          console.error("Error al verificar el usuario:", error);
        });
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error);
    });
}

// Exporta la función para usarla en otros módulos
export { loginUser };
