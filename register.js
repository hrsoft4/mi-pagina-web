import { auth, database } from './firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Guarda el usuario en la base de datos
      set(ref(database, 'users/' + user.uid), {
        email: user.email,
        uid: user.uid
      });
      console.log("Usuario registrado y guardado en la base de datos.");
    })
    .catch((error) => {
      console.error("Error al registrar el usuario:", error);
    });
}

// Exporta la función para usarla en otros módulos
export { registerUser };
