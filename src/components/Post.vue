<script setup>
	import { ref, reactive, onBeforeUnmount } from "vue"
	import { useStore } from "vuex"
	import moment from "moment"
	import {
		getFirestore, 
		doc, 
		deleteDoc, 
		collection, 
		addDoc,
		serverTimestamp,
		query,
		orderBy,
		onSnapshot,
		setDoc,
		getDocs,
		getDoc
	} from "firebase/firestore"

	let { post } = defineProps(["post"])

	let store = useStore(),
		comments = ref([]),
		content = ref(""),
		loading = ref(false),
		liked = ref(false),
		db = getFirestore()

	let unsubscribe = onSnapshot(
		query(
			collection(getFirestore(), `posts/${post.id}/comments`),
			orderBy("timestamp")
		),
		snapshot => {
			comments.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
		}
	)

	let add = e => {
		loading.value = true

		addDoc(collection(getFirestore(), `posts/${post.id}/comments`), {
			user: {
				name: store.state.user.displayName,
				avatar: store.state.user.photoURL
			},
			content: content.value,
			timestamp: serverTimestamp()
		})
		.then(doc => content.value = "")
		.catch(error => console.log(error.message))
		.finally(() => loading.value = false)
	}

	let remove = e => deleteDoc(doc(getFirestore(), "posts", post.id))

	getDoc(doc(db, `posts/${post.id}/likes/${store.state.user.uid}`))
		.then(doc => liked.value = doc.exists())

	const docRef = doc(getFirestore(), `posts/${post.id}/likes/${store.state.user.uid}`)

	let like = e => {
		if(liked.value) {
			deleteDoc(docRef).then(() => liked.value = false)
		}
		else {
			setDoc(docRef, {
				name: store.state.user.displayName,
				avatar: store.state.user.photoURL
			}).then(() => liked.value = true)
		}
	}

	let timestamp = ref(moment(post.timestamp?.toDate()).fromNow())

	let timer = setInterval(() => timestamp.value = moment(post.timestamp.toDate()).fromNow(), 1000 * 60)

	onBeforeUnmount(() => {
		clearInterval(timer)
		unsubscribe()
	})
</script>

<template>
	<div class="bg-white border-y md:border-x border-gray-300 md:rounded-md">
		<div class="p-4 flex items-center">
			<img :src="post.avatar" alt="Avatar" class="w-12 rounded-full mr-4">
			<div>
				<h3 class="font-semibold">{{ post.name }}</h3>
				<p class="text-sm text-gray-400">{{ timestamp }}</p>
			</div>
			<button class="ml-auto text-xl" @click="remove">
				<i class="fas fa-ellipsis-h"></i>
			</button>
		</div>
		<img :src="post.photo" alt="Photo">
		<div class="p-4 grid gap-2">
			<div class="flex gap-4 text-xl">
				<button @click="like">
					<i class="fa-heart" :class="liked ? 'fas text-red-400' : 'far'"></i>
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
			<div class="flex gap-2">
				<h3 class="font-semibold">{{ post.name }}</h3>
				<p>{{ post.caption }}</p>
			</div>
			<div class="flex items-center gap-2" v-for="comment in comments" :key="comment.id">
				<img :src="comment.user.avatar" alt="Avatar" class="w-8 rounded-full">
				<h3 class="font-semibold">{{ comment.user.name }}</h3>
				<p>{{ comment.content }}</p>
				<button class="text-sm ml-auto" @click="comment.liked = ! comment.liked">
					<i class="fa-heart" :class="comment.liked ? 'fas text-red-400' : 'far'"></i>
				</button>
			</div>
		</div>
		<form class="p-4 border-t flex gap-4" @submit.prevent="add" v-if="store.state.user">
			<button class="text-xl" type="button">
				<i class="far fa-smile"></i>
			</button>
			<input placeholder="Add a comment..." class="flex-1 focus:outline-none" v-model.trim="content">
			<button class="text-blue-400" :disabled="loading">Post</button>
		</form>
	</div>
</template>