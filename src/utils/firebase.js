// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signOut,
  signInWithEmailAndPassword} from "firebase/auth"
import {getFirestore, collection, addDoc, initializeFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq5zvtJRCCzMXu1O393RCtw5nDdK6oGcE",
  authDomain: "birthday-react-native-cc27d.firebaseapp.com",
  projectId: "birthday-react-native-cc27d",
  storageBucket: "birthday-react-native-cc27d.appspot.com",
  messagingSenderId: "967676210419",
  appId: "1:967676210419:web:7ae58822bfcfa01bb39b86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
  })
export const auth = getAuth(app);
export default app
//create user
export async function createUserWithEmailAndPasswordF(email, password){
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in  
    return userCredential.user;
    // ...
  })
};

//Add data to firebase (firestore)
export const saveData = (coleccion, data) =>{
  addDoc(collection(db, coleccion), data);
}

export function salir(){
  signOut(auth);
};
