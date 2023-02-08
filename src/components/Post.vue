<script setup>
import { getAuth } from "@firebase/auth";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "@firebase/firestore";
import { deleteObject, getStorage, ref as storageRef } from "@firebase/storage";
import moment from "moment"
import { onBeforeUnmount, ref } from "vue";

const props = defineProps(["post"])
const { uid, displayName, photoURL } = getAuth().currentUser
const loading = ref(false)
const comments = ref([])
const text = ref("")

let add = async e => {
    loading.value = true

    await addDoc(collection(getFirestore(), `posts/${props.post.id}/comments`), {
        displayName,
        photoURL,
        text: text.value,
        timestamp: serverTimestamp()
    })

    text.value = ""
    loading.value = false
}

let like = e => {
    updateDoc(doc(getFirestore(), `posts/${props.post.id}`), {
        likes: props.post.likes.includes(uid) ? arrayRemove(uid) : arrayUnion(uid)
    })
}

let remove = e => {
    deleteObject(storageRef(getStorage(), props.post.id))
    deleteDoc(doc(getFirestore(), `posts/${props.post.id}`))
}

const unsubscribe = onSnapshot(
    query(
        collection(getFirestore(), `posts/${props.post.id}/comments`),
        orderBy("timestamp")
    ),
    snapshot => comments.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
)

onBeforeUnmount(unsubscribe)
</script>

<template>
    <div class="bg-white border border-gray-300 rounded-lg">
        <div class="p-4 flex items-center gap-4">
            <img :src="post.photoURL" class="w-12 h-12 rounded-full object-cover">
            <div>
                <h3 class="font-semibold">{{ post.displayName }}</h3>
                <p class="text-sm text-gray-400">{{ moment(post.timestamp?.toDate()).fromNow() }}</p>
            </div>
            <button @click="remove" class="text-xl ml-auto">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
        </div>
        <img :src="post.photo" class="w-full">
        <div class="p-4 grid gap-2">
            <div class="flex gap-4 text-xl">
                <button @click="like">
                    <i class="fa-heart" :class="post.likes.includes(uid) ? 'fa-solid text-red-400' : 'fa-regular'"></i>
                </button>
                <button>
                    <i class="fa-regular fa-comment"></i>
                </button>
                <button>
                    <i class="fa-regular fa-paper-plane"></i>
                </button>
                <button class="ml-auto">
                    <i class="fa-regular fa-bookmark"></i>
                </button>
            </div>
            <p v-if="post.likes.length" class="font-semibold">{{ post.likes.length }} likes</p>
            <div class="flex gap-2">
                <h3 class="font-semibold">{{ post.displayName }}</h3>
                <p>{{ post.caption }}</p>
            </div>
            <div v-for="comment in comments" :key="comment.id" class="flex items-center gap-2">
                <img :src="comment.photoURL" class="w-8 h-8 rounded-full object-cover">
                <h3 class="font-semibold">{{ comment.displayName }}</h3>
                <p>{{ comment.text }}</p>
            </div>
        </div>
        <form @submit.prevent="add" class="border-t border-gray-300 p-4 flex gap-4">
            <button class="text-xl">
                <i class="fa-regular fa-smile"></i>
            </button>
            <input required v-model.trim="text" placeholder="Add a comment..." class="flex-1 outline-none">
            <button class="font-semibold text-blue-400" :disabled="loading">Post</button>
        </form>
    </div>
</template>

<style scoped>
    input:invalid + button {
        @apply opacity-50 cursor-not-allowed;
    }
</style>