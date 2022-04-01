<script setup>
	import Navbar from "./components/Navbar.vue"
	import Feed from "./components/Feed.vue"
	import Sidebar from "./components/Sidebar.vue"
</script>

<template>
	<navbar></navbar>
	<main class="max-w-screen-lg mx-auto p-4 grid grid-cols-[2fr_1fr] gap-4">
		<feed></feed>
		<sidebar></sidebar>
	</main>
</template>