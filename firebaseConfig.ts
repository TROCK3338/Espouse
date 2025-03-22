import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { getAuth } from 'firebase/auth';

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC37bVaqVzMKPq9Y2lhgxKdQ_qcT3yZh0k",
  authDomain: "espouse-b7ef8.firebaseapp.com",
  projectId: "espouse-b7ef8",
  storageBucket: "espouse-b7ef8.appspot.com",
  messagingSenderId: "1002497853400",
  appId: "1:1002497853400:web:98bd13211b9d782fe5d4ad",
  databaseURL: "https://espouse-b7ef8.firebaseio.com" // ✅ Keep this

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Add App Check with reCAPTCHA Enterprise
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider('6Lc5AuMqAAAAAHCZPJnfgCWkgWZAlXdUF7HC05yZ'),
  isTokenAutoRefreshEnabled: true, // Ensures token refresh
});