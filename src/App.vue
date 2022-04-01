<script setup>
	import Navbar from "./components/Navbar.vue"
	import Feed from "./components/Feed.vue"
	import Sidebar from "./components/Sidebar.vue"
	import Login from "./components/Login.vue"
	import { useStore } from "vuex"

	const store = useStore()
</script>

<template>
	<template v-if="store.state.user">
		<navbar></navbar>
		<main class="max-w-screen-lg mx-auto md:p-4 grid md:grid-cols-[2fr_1fr] gap-4">
			<feed></feed>
			<sidebar></sidebar>
		</main>
	</template>
	<login v-else></login>
</template>