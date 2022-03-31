<script setup>
	import Story from "./Story.vue"
	import Post from "./Post.vue"
	import { ref } from "vue"

	let stories = ref([
		{ id: 1, name: "Lulle", photo: "/images/avatar1.jpg" },
		{ id: 2, name: "Putte", photo: "/images/avatar2.jpg" },
		{ id: 3, name: "Nisse", photo: "/images/avatar3.jpg" },
	])

	let posts = ref([
		{
			id: 1, 
			name: "Lulle", 
			avatar: "/images/avatar1.jpg",
			photo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			caption: "This is my cool photo"
		},
		{
			id: 2,
			name: "Putte",
			avatar: "/images/avatar2.jpg",
			photo: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
			caption: "Cute photo right?"
		}
	])
</script>

<template>
	<div class="grid gap-4">
		<div class="bg-white p-4 border border-gray-300 rounded-md flex gap-4">
			<story v-for="story in stories" :key="story.id" :story="story"></story>
		</div>
		<post v-for="post in posts" :key="post.id" :post="post"></post>
	</div>
</template>