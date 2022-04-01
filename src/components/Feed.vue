<script setup>
	import Story from "./Story.vue"
	import Post from "./Post.vue"
	import { ref, onBeforeUnmount } from "vue"
	import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore"

	let stories = ref([
		{ id: 1, name: "Lulle", photo: "/images/avatar1.jpg" },
		{ id: 2, name: "Putte", photo: "/images/avatar2.jpg" },
		{ id: 3, name: "Nisse", photo: "/images/avatar3.jpg" },
	])

	let posts = ref([])

	const q = query(collection(getFirestore(), "posts"), orderBy("timestamp", "desc"))

	let unsubscribe = onSnapshot(q, snapshot => {
		posts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	})

	onBeforeUnmount(() => unsubscribe())
</script>

<template>
	<div class="grid gap-4">
		<div class="bg-white p-4 border border-gray-300 rounded-md flex gap-4">
			<story v-for="story in stories" :key="story.id" :story="story"></story>
		</div>
		<post v-for="post in posts" :key="post.id" :post="post"></post>
	</div>
</template>