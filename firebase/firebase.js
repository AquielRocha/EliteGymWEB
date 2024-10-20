// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCsJYUFrNkJL0kXtFOO7BoMdaw2JtaC3e4",
    authDomain: "elitegin.firebaseapp.com",
    projectId: "elitegin",
    storageBucket: "elitegin.appspot.com",
    messagingSenderId: "276414285199",
    appId: "1:276414285199:web:f35ea0d6709a758c6ff7fa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
