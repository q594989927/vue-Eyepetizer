import Vue from 'vue'
import Vuex from 'vuex'
import { getSelected } from '@/assets/api/getDatas'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  state: {
    videoSrc: '',
    closed: true,
  },
  mutations: {
    setTap(state, res) {
      state.closed = res
    },
    setVideoSrc(state, res) {
      state.videoSrc = res
    },
  },
  getters: {

  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
export default store