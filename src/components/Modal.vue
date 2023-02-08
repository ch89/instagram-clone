<script setup>
import { getAuth } from "firebase/auth";
import { getFirestore, collection, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { ref as storageRef, getStorage, uploadString, getDownloadURL } from "firebase/storage";
import { ref } from "vue"

const emit = defineEmits(["close"])

const form = ref({})
const loading = ref(false)
const photo = ref(null)
const { displayName, photoURL, uid } = getAuth().currentUser

let add = async e => {
    loading.value = true

    let docRef = doc(collection(getFirestore(), "posts")),
        photoRef = storageRef(getStorage(), docRef.id)

    await uploadString(photoRef, photo.value, "data_url")

    await setDoc(docRef, {
        displayName,
        photoURL,
        uid,
        ...form.value,
        photo: await getDownloadURL(photoRef),
        likes: [],
        timestamp: serverTimestamp()
    })

    close()
}

let close = e => {
    form.value = {}
    photo.value = null
    loading.value = false
    emit("close")
}

let reader = new FileReader
reader.addEventListener("load", e => photo.value = reader.result)

let preview = e => reader.readAsDataURL(e.target.files[0])
</script>

<template>
    <div class="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm grid place-items-center">
        <form @submit.prevent="add" class="bg-white p-4 w-96 rounded-lg grid grid-cols-2 gap-4">
            <label for="photo" class="col-span-2 bg-red-100 w-12 h-12 rounded-full grid place-items-center text-red-400 text-xl place-self-center cursor-pointer">
                <i class="fa-solid fa-camera"></i>
            </label>
            <input type="file" id="photo" hidden @change="preview">
            <img :src="photo" v-if="photo" @click="photo = null" class="col-span-2 w-full rounded-xl cursor-pointer">
            <input required v-model.trim="form.caption" placeholder="Enter a caption" class="col-span-2 bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none">
            <button type="submit" class="bg-blue-400 text-white py-2 font-semibold text-sm rounded-lg" :class="{ loading }" :disabled="loading">Post</button>
            <button type="button" class="bg-gray-400 text-white py-2 font-semibold text-sm rounded-lg" @click="close">Close</button>
        </form>
    </div>
</template>

<style scoped>
    form:has(input:invalid) button[type="submit"] {
        @apply opacity-50 cursor-not-allowed;
    }

    .loading {
        @apply text-transparent cursor-not-allowed grid place-items-center after:absolute after:w-4 after:h-4 after:border-2 after:border-white after:rounded-full after:border-r-transparent after:border-t-transparent after:animate-spin;
    }
</style>