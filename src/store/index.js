import { createStore } from "vuex";

export default createStore({
    state() {
        return {
            follows: []
        }
    },
    mutations: {
        follows(state, follows) {
            state.follows = follows
        }
    }
})