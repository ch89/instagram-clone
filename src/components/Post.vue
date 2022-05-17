<script setup>
	import { ref, reactive, onBeforeUnmount } from "vue"
	import { useStore } from "vuex"
	import moment from "moment"
	import { getAuth } from "firebase/auth"
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
		likes = ref([]),
		db = getFirestore(),
		user = getAuth().currentUser

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

	const docRef = doc(db, `posts/${post.id}/likes/${user.uid}`)

	// Version 1
	// onSnapshot(docRef, snapshot => liked.value = snapshot.exists())
	// let like = e => liked.value ? deleteDoc(docRef) : setDoc(docRef, { uid: user.uid })

	// Version 2
	onSnapshot(
		collection(db, `posts/${post.id}/likes`),
		snapshot => likes.value = snapshot.docs.map(doc => doc.id)
	)

	let like = e => {
		if(likes.value.includes(user.uid)) {
			deleteDoc(docRef)
		}
		else {
			setDoc(docRef, {
				name: user.displayName,
				avatar: user.photoURL
			})
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
		<img :src="post.photo" alt="Photo" class="w-full">
		<div class="p-4 grid gap-2">
			<div class="flex gap-4 text-xl">
				<button @click="like">
					<!-- Version 1 -->
					<!-- <i class="fa-heart" :class="liked ? 'fas text-red-400' : 'far'"></i> -->

					<!-- Version 2 -->
					<i class="fa-heart" :class="likes.includes(user.uid) ? 'fas text-red-400' : 'far'"></i>
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
			<!-- Version 2 -->
			<p v-if="likes.length" class="font-semibold">{{ likes.length }} likes</p>
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