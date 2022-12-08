<script setup>
import Story from "./Story.vue"
import Post from "./Post.vue"
import { ref } from "vue"
import { collection, getFirestore, onSnapshot, orderBy, query } from "@firebase/firestore";

const stories = ref([
    { id: 1, photo: "/images/avatar1.jpg" },
    { id: 1, photo: "/images/avatar2.jpg" },
    { id: 1, photo: "/images/avatar3.jpg" },
])
const posts = ref([])

onSnapshot(
    query(
        collection(getFirestore(), "posts"),
        orderBy("timestamp", "desc")
    ),
    snapshot => posts.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
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