<script setup>
	import { ref } from "vue"
	import { useStore } from "vuex"

	let store = useStore()

	let suggestions = ref([
		{ id: 1, name: "Lulle", avatar: "/images/avatar1.jpg" },
		{ id: 2, name: "Putte", avatar: "/images/avatar2.jpg" },
		{ id: 3, name: "Nisse", avatar: "/images/avatar3.jpg" },
	])
</script>

<template>
	<div class="p-4 md:p-0">
		<div class="flex items-center mb-4" v-if="store.state.user">
			<img :src="store.state.user.photoURL" alt="Avatar" class="w-16 rounded-full border border-gray-300 p-0.5 mr-4">
			<div>
				<h3 class="font-semibold">{{ store.state.user.email }}</h3>
				<p class="text-sm text-gray-400">{{ store.state.user.displayName }}</p>
			</div>
			<button class="text-sm text-blue-400 font-semibold ml-auto">Change</button>
		</div>
		<div class="flex justify-between text-sm">
			<h3 class="font-semibold text-gray-400">Suggestions for you</h3>
			<button>Show all</button>
		</div>
		<div v-for="suggestion in suggestions" :key="suggestion.id" class="flex items-center mt-2">
			<img :src="suggestion.avatar" alt="Avatar" class="w-12 rounded-full border border-gray-300 p-0.5 mr-2">
			<div>
				<h3 class="text-sm font-semibold">{{ suggestion.name }}</h3>
				<p class="text-sm text-gray-400">Follows you</p>
			</div>
			<button class="text-sm text-blue-400 font-semibold ml-auto">Follow</button>
		</div>
	</div>
</template>