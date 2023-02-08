<script setup>
import Navbar from './components/Navbar.vue'
import Feed from "./components/Feed.vue"
import Sidebar from "./components/Sidebar.vue"
import { ref } from "vue"
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth"
import { doc, getFirestore, setDoc } from '@firebase/firestore'

const user = ref(null)

let login = async e => {
  const cred = await signInWithPopup(getAuth(), new GoogleAuthProvider)

  if(getAdditionalUserInfo(cred).isNewUser) {
    const { uid, displayName, photoURL } = cred.user

    setDoc(doc(getFirestore(), `users/${uid}`), { uid, displayName, photoURL })
  }
}

onAuthStateChanged(getAuth(), u => user.value = u)
</script>

<template>
  <template v-if="user">
    <navbar></navbar>
    <main class="max-w-4xl mx-auto p-4 grid grid-cols-[3fr_2fr] gap-8 items-start">
      <feed></feed>
      <sidebar></sidebar>
    </main>
  </template>
  <div v-else class="h-screen grid place-items-center">
    <div class="bg-white w-96 p-8 border border-gray-300 rounded-lg grid gap-4">
      <img src="/images/logo.png" class="place-self-center">
      <button @click="login" class="bg-blue-400 text-white py-2 rounded-lg font-semibold text-sm">Login</button>
    </div>
  </div>
</template>