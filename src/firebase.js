// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYis36TTyQbJOzN274h27lt_slIleDRoc",
  authDomain: "easenovate-25a4c.firebaseapp.com",
  projectId: "easenovate-25a4c",
  storageBucket: "easenovate-25a4c.appspot.com",
  messagingSenderId: "532566551614",
  appId: "1:532566551614:web:2085500428aafff729f56f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default firebaseApp;
export { storage };
