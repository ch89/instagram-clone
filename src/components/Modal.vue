<script setup>
	import { ref } from "vue"
	import { useStore } from "vuex"
	import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"

	let emit = defineEmits(["close"]),
		store = useStore(),
		form = ref({})

	let add = async e => {
		await addDoc(collection(getFirestore(), "posts"), {
			name: store.state.user.displayName,
			avatar: store.state.user.photoURL,
			...form.value,
			timestamp: serverTimestamp()
		})

		close()
	}

	let close = () => {
		form.value = {}
		emit("close")
	}
</script>

<template>
	<div class="absolute inset-0 z-20 bg-black/30 backdrop-blur-sm grid place-items-center" @click.self="emit('close')">
		<div class="bg-white p-4 rounded-xl w-96">
			<form class="flex flex-col gap-4" @submit.prevent="add">
				<label for="photo" class="bg-red-100 w-12 h-12 grid place-items-center rounded-full text-red-500 text-xl cursor-pointer self-center">
					<i class="fas fa-camera"></i>
				</label>
				<input type="file" id="photo" hidden>
				<p class="text-center">Upload a photo</p>
				<input placeholder="Please enter a caption..." class="text-center focus:outline-none" v-model="form.caption">
				<!-- Temp -->
				<input placeholder="Photo URL" class="text-center focus:outline-none" v-model="form.photo">
				<div class="flex gap-4 text-white text-sm">
					<button class="bg-red-400 flex-1 py-2 rounded-md font-semibold">Upload Post</button>
					<button class="bg-gray-400 flex-1 py-2 rounded-md font-semibold" type="button" @click="close">Close</button>
				</div>
			</form>
		</div>
	</div>
</template>