<script setup>
	defineProps(["story"])
</script>

<template>
	<div class="w-16">
		<div class="bg-gradient-to-tr from-yellow-400 to-fuchsia-600 rounded-full p-0.5 mb-1">
			<img :src="story.photo" alt="Avatar" class="rounded-full p-0.5 bg-white">
		</div>
		<p class="text-center text-sm truncate">{{ story.name }}</p>
	</div>
</template>