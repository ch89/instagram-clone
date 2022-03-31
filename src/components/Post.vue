<script setup>
	import { ref, reactive } from "vue"

	defineProps(["post"])

	let comments = reactive([
		{ id: 1, name: "Gabi", content: "I love this photo!" },
		{ id: 2, name: "Essim", content: "This is so awesome" },
	])

	let content = ref("")

	let add = e => {
		comments.push({
			id: comments.length + 1,
			name: "Kalle Anka",
			content: content.value
		})

		content.value = ""
	}
</script>

<template>
	<div class="bg-white border border-gray-300 rounded-md">
		<div class="p-4 flex items-center">
			<img :src="post.avatar" alt="Avatar" class="w-12 rounded-full mr-4">
			<div>
				<h3 class="font-bold">{{ post.name }}</h3>
				<p class="text-sm text-gray-400">2 hours ago</p>
			</div>
			<button class="ml-auto text-xl">
				<i class="fas fa-ellipsis-h"></i>
			</button>
		</div>
		<img :src="post.photo" alt="Photo">
		<div class="p-4">
			<div class="flex gap-4 text-xl mb-2">
				<button @click="post.liked = ! post.liked">
					<i class="fa-heart" :class="post.liked ? 'fas text-red-400' : 'far'"></i>
				</button>
				<button>
					<i class="far fa-comment"></i>
				</button>
				<button>
					<i class="far fa-paper-plane"></i>
				</button>
				<button class="ml-auto">
					<i class="far fa-bookmark"></i>
				</button>
			</div>
			<div class="flex gap-2 mb-2">
				<h3 class="font-bold">{{ post.name }}</h3>
				<p>{{ post.caption }}</p>
			</div>
			<div class="flex gap-2" v-for="comment in comments" :key="comment.id">
				<h3 class="font-bold">{{ comment.name }}</h3>
				<p>{{ comment.content }}</p>
				<button class="text-sm ml-auto" @click="comment.liked = ! comment.liked">
					<i class="fa-heart" :class="comment.liked ? 'fas text-red-400' : 'far'"></i>
				</button>
			</div>
		</div>
		<form class="p-4 border-t flex gap-4" @submit.prevent="add">
			<button class="text-xl" type="button">
				<i class="far fa-smile"></i>
			</button>
			<input placeholder="Add a comment..." class="flex-1 focus:outline-none" v-model="content">
			<button class="text-blue-400">Post</button>
		</form>
	</div>
</template>