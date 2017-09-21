import Vue from 'vue'
import Vuex from 'vuex'
import { getSelected } from '@/assets/api/getDatas'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  state: {
    videoSrc: '',
    videoId: null,
    closed: true,
    loading: true,
    feedfollow: [],
    follow: [],
  },
  mutations: {
    setVideoId(state, res) {
      state.videoId = res
    },
    setTap(state, res) {
      state.closed = res
    },
    setVideoSrc(state, res) {
      state.videoSrc = res
    },
    setLoading(state, res) {
      state.loading = res
    },
    getFeedFollowed(state, res) {
      state.feedfollow.push(res)
    },
    setFeedFollowed(state, res) {
      state.feedfollow.forEach(item => {
        if (item.itemId == res.itemId) {
          item.followed = !res.followed
        }
      })
    },
    setFollowed(state, res) {
      state.follow.push(res)
    },
    removeFollowed(state, id) {
      state.follow = state.follow.filter(item => {
        return item.itemId != id
      })
    },
  },
  getters: {
    badge: state => {
      return state.follow.filter(item => item.followed).length
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
export default store