<script setup>
import Story from "./Story.vue"
import Post from "./Post.vue"
import { onBeforeUnmount, ref } from "vue"
import { collection, getFirestore, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import store from '../store';

const stories = ref([
    { id: 1, photo: "/images/avatar1.jpg" },
    { id: 1, photo: "/images/avatar2.jpg" },
    { id: 1, photo: "/images/avatar3.jpg" },
])
const posts = ref([])
const { uid } = getAuth().currentUser
let unsubscribe

onSnapshot(
    collection(getFirestore(), `users/${uid}/follows`),
    snapshot => {
        const uids = snapshot.docs.map(doc => doc.id)

        store.commit("follows", uids)
        
        if(unsubscribe) unsubscribe()
        
        unsubscribe = onSnapshot(
            query(
                collection(getFirestore(), "posts"),
                where("uid", "in", [uid, ...uids]),
                orderBy("timestamp", "desc")
            ),
            snapshot => posts.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        )
    }
)
</script>

<template>
    <div class="grid gap-4">
        <div class="bg-white border border-gray-300 p-4 rounded-lg flex gap-4">
            <story v-for="story in stories" :key="story.id" :story="story"></story>
        </div>
        <post v-for="post in posts" :key="post.id" :post="post"></post>
    </div>
</template>