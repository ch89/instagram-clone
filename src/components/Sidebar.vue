<script setup>
import { getAuth } from '@firebase/auth';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, query, setDoc, where } from '@firebase/firestore';
import { onBeforeUnmount, ref } from "vue";
import store from '../store';

const { photoURL, displayName, uid } = getAuth().currentUser
const users = ref([])

let follow = user => {
    if(store.state.follows.includes(user.uid)) {
        deleteDoc(doc(getFirestore(), `users/${uid}/follows/${user.uid}`))
    }
    else {
        setDoc(doc(getFirestore(), `users/${uid}/follows/${user.uid}`), {})
    }
}

const unsubscribe = onSnapshot(
    query(
        collection(getFirestore(), "users"),
        where("uid", "!=", uid)
    ),
    snapshot => users.value = snapshot.docs.map(doc => doc.data())
)

onBeforeUnmount(unsubscribe)
</script>

<template>
    <div class="grid gap-4 py-4">
        <div class="flex items-center gap-4 font-semibold">
            <img :src="photoURL" class="w-12 h-12 rounded-full object-cover">
            <h3>{{ displayName }}</h3>
            <button class="ml-auto text-blue-400">Change</button>
        </div>
        <div class="flex justify-between">
            <h3 class="font-semibold text-gray-400">Suggestions for you</h3>
            <button>Show all</button>
        </div>
        <div v-for="user in users" :key="user.uid" class="flex items-center gap-4">
            <img :src="user.photoURL" class="w-10 h-10 rounded-full object-cover">
            <div>
                <h3 class="font-semibold">{{ user.displayName }}</h3>
                <p class="text-sm text-gray-400">Follows you</p>
            </div>
            <button @click="follow(user)" class="ml-auto border text-sm px-2 py-1 rounded" :class="store.state.follows.includes(user.uid) ? 'bg-white border-gray-300' : 'bg-blue-400 text-white border-blue-400'">
                {{ store.state.follows.includes(user.uid) ? "Following" : "Follow" }}
            </button>
        </div>
    </div>
</template>