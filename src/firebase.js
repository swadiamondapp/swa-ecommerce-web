import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  FacebookAuthProvider,
} from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyBlxRn1JjiWsYgvjWrNSXrNc4DSvOqV6n4",
//   authDomain: "swa-ecommerce-e8528.firebaseapp.com",
//   projectId: "swa-ecommerce-e8528",
//   storageBucket: "swa-ecommerce-e8528.appspot.com",
//   messagingSenderId: "116088069748",
//   appId: "1:116088069748:web:c774e63bf9f62bf66bfb21",
//   measurementId: "G-1X78H8TXS5",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCbIuhieaDOC09TahW_8MaAF3yj4H7JJvs",
  authDomain: "swa-ecom-d5707.firebaseapp.com",
  projectId: "swa-ecom-d5707",
  storageBucket: "swa-ecom-d5707.appspot.com",
  messagingSenderId: "431605900917",
  appId: "1:431605900917:web:3fd4b04080fbaa2f5d7a3c",
  measurementId: "G-PTW00JV5J8",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
export default app;
