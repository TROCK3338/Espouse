import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC37bVaqVzMKPq9Y2lhgxKdQ_qcT3yZh0k",
  authDomain: "espouse-b7ef8.firebaseapp.com",
  projectId: "espouse-b7ef8",
  storageBucket: "espouse-b7ef8.appspot.com",
  messagingSenderId: "1002497853400",
  appId: "1:1002497853400:web:98bd13211b9d782fe5d4ad",
  databaseURL: "https://espouse-b7ef8.firebaseio.com" 
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable persistent login
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Auth persistence enabled');
  })
  .catch((error) => {
    console.error('Error enabling auth persistence:', error);
  });

export { auth };