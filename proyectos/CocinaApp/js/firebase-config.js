//FUNCIONES IMPORTADAS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
import { getDatabase, ref, get, set, child, update, remove, onValue,} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// CONFIGURACION DE LA BASE DE DATOS DE FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCwuITwMHmT7vULjcScSoWDvh4KOJOlGVE",
  authDomain: "pruebamigracion-fc41e.firebaseapp.com",
  databaseURL: "https://pruebamigracion-fc41e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pruebamigracion-fc41e",
  storageBucket: "pruebamigracion-fc41e.appspot.com",
  messagingSenderId: "670309312267",
  appId: "1:670309312267:web:705a9a51d21783361e640e",
  //measurementId: "G-X7BYVJJH1E"
};

//INICIARNDO FIREBASE
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
//OBTENER REFERENCIA AL ALMACENAMIENTO DE FIREBASE
const storage = getStorage(app);//esto es lo nuevo

// EXPORTAMOS LOS OBJETOS DE FIREBASE PARA USARLOS EN OTROS FICHEROS
export { app, analytics, storage, db, ref, get, set, child, update, remove, onValue };