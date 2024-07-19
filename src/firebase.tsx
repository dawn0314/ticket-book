import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAA5tf8i_nHdNkJBz9PlBrYCWM4QFgVn0c",
  authDomain: "ticket-book-5e5fd.firebaseapp.com",
  projectId: "ticket-book-5e5fd",
  storageBucket: "ticket-book-5e5fd.appspot.com",
  messagingSenderId: "785080125273",
  appId: "1:785080125273:web:3b4d549f3d8c4440cf2e48",
  measurementId: "G-9TVW0DD1RM",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
