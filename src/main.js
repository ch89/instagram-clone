import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/app.css'
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"

initializeApp({
	apiKey: "AIzaSyCa3yoCOm8qvcn7ZxGUdaxnGuWq8mp3pKw",
	authDomain: "instagram-clone-79f8d.firebaseapp.com",
	databaseURL: "https://instagram-clone-79f8d.firebaseio.com",
	projectId: "instagram-clone-79f8d",
	storageBucket: "instagram-clone-79f8d.appspot.com",
	messagingSenderId: "845003360358",
	appId: "1:845003360358:web:feb5f7db75b52af126c5a7",
	measurementId: "G-8S7QPXGV7X"
})

onAuthStateChanged(getAuth(), user => store.commit("auth", user))

const app = createApp(App)

app.use(router).use(store)

app.mount('#app')
