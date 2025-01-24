import { auth, database } from './firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, `users/${user.uid}/data`), {
        email: user.email,
        uid: user.uid,
        otherData: "datos adicionales del usuario"
      });
      console.log("Usuario registrado y guardado en la base de datos.");
    })
    .catch((error) => {
      console.error("Error al registrar el usuario:", error);
    });
}
