import { createApp } from 'vue'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import './assets/main.css'

initializeApp({
    apiKey: "AIzaSyCkY5Rff5gyU4OlqARUCsNa_5trzgqA1HQ",
    authDomain: "instagram-clone-1fba2.firebaseapp.com",
    projectId: "instagram-clone-1fba2",
    storageBucket: "instagram-clone-1fba2.appspot.com",
    messagingSenderId: "750959519007",
    appId: "1:750959519007:web:b7f57e044ed9ba08fabc2a"
})

createApp(App).mount('#app')
