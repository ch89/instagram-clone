<script setup>
defineProps(["story"])
</script>

<template>
    <div class="w-14 h-14 bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-0.5 rounded-full">
        <img :src="story.photo" class="rounded-full object-cover p-0.5 bg-white">
    </div>
</template>