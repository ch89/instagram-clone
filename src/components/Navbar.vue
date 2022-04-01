<script setup>
	import Modal from "./Modal.vue"
	import { ref } from "vue"
	import { useStore } from "vuex"
	import { getAuth, signOut } from "firebase/auth"

	let store = useStore(),
		show = ref(false)
</script>

<template>
	<nav class="border-b border-gray-300 bg-white sticky top-0 z-10">
		<div class="max-w-screen-lg mx-auto p-4 grid grid-cols-3">
			<img src="/images/logo.png" alt="Logo" class="self-center">
			<div class="bg-gray-50 border border-gray-300 rounded-md flex items-center gap-4 px-4 text-gray-400">
				<i class="fas fa-search"></i>
				<input placeholder="Search" class="bg-transparent flex-1 focus:outline-none">
			</div>
			<div class="flex items-center justify-end gap-4">
				<a href="#" class="text-2xl hover:scale-125 transition" @click="show = true">
					<i class="fas fa-home"></i>
				</a>
				<a href="#" class="text-2xl hover:scale-125 transition">
					<i class="far fa-paper-plane"></i>
				</a>
				<a href="#" class="text-2xl hover:scale-125 transition">
					<i class="far fa-compass"></i>
				</a>
				<a href="#" class="text-2xl hover:scale-125 transition">
					<i class="far fa-heart"></i>
				</a>
				<img :src="store.state.user.photoURL" alt="Avatar" class="w-8 rounded-full cursor-pointer" @click="signOut(getAuth())">
			</div>
		</div>
	</nav>
	<modal v-show="show" @close="show = false"></modal>
</template>