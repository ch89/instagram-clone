<script setup>
	import { useStore } from "vuex"
	import {
		getAuth, 
		signInWithPopup, 
		GoogleAuthProvider
	} from "firebase/auth"

	let store = useStore(),
		provider = new GoogleAuthProvider()
</script>

<template>
	<div class="h-screen grid place-items-center">
		<div class="bg-white p-8 border border-gray-300 rounded-md flex flex-col gap-4 w-96">
			<img src="/images/logo.png" alt="Logo" class="self-center">
			<form class="grid gap-4 text-sm" @submit.prevent="signInWithPopup(getAuth(), provider)">
				<input class="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md focus:outline-none" placeholder="Username or e-mail">
				<input class="bg-gray-100 border border-gray-300 px-4 py-2 rounded-md focus:outline-none" placeholder="Password">
				<button class="bg-blue-400 text-white py-2 rounded-md font-semibold">Login</button>
			</form>
		</div>
	</div>
</template>