import { auth, database } from './firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Guarda los datos del usuario bajo su UID
      set(ref(database, `users/${user.uid}/data`), {
        email: user.email,
        uid: user.uid,
        otherData: "datos adicionales del usuario"
      }).then(() => {
        console.log("Usuario registrado y guardado en la base de datos.");
      }).catch((error) => {
        console.error("Error al guardar los datos del usuario:", error);
      });
    })
    .catch((error) => {
      console.error("Error al registrar el usuario:", error);
      // Manejo de error si el correo ya está en uso
      if (error.code === 'auth/email-already-in-use') {
        console.error("El correo electrónico ya está en uso.");
      }
    });
}

// Exporta la función para usarla en otros módulos
export { registerUser };
