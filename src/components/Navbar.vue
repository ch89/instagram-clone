<script setup>
import { getAuth, signOut } from '@firebase/auth'
import Modal from "./Modal.vue"
import { ref } from "vue";

const user = getAuth().currentUser
const show = ref(false)
</script>

<template>
    <nav class="bg-white border border-gray-300 sticky top-0 z-10">
        <div class="max-w-4xl mx-auto p-4 grid grid-flow-col auto-cols-fr items-center">
            <img src="/images/logo.png">
            <div class="bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-4 text-gray-400">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input placeholder="Search" class="bg-transparent flex-1 outline-none">
            </div>
            <div class="flex items-center justify-end gap-4 text-2xl">
                <button>
                    <i class="fa-solid fa-home"></i>
                </button>
                <button @click="show = true">
                    <i class="fa-regular fa-paper-plane"></i>
                </button>
                <button>
                    <i class="fa-regular fa-compass"></i>
                </button>
                <button>
                    <i class="fa-regular fa-heart"></i>
                </button>
                <button @click="signOut(getAuth())">
                    <img :src="user.photoURL" class="w-8 h-8 rounded-full object-cover">
                </button>
            </div>
        </div>
    </nav>
    <modal v-show="show" @close="show = false"></modal>
</template>