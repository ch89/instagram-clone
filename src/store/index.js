import { createStore } from "vuex"

export default createStore({
	state() {
		return {
			user: null
		}
	},
	mutations: {
		auth(state, user) {
			state.user = user
		}
	}
})