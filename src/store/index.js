import Vue from 'vue'
import Vuex from 'vuex'
import * as func from './function'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    videoSrc: '',
    videoId: null,
    closed: false,
    loading: false,
    feedfollow: [],
    follow: [], //本地关注
    input: '', //搜索栏
    num: 0,  //用于whatch搜索
    bgSrc: ''
  },
  mutations: {
    getLocalStorage(state) {
      state.follow = func.localFollow.get() || []
      state.bgSrc = func.localBgSrc.get() || ''
    },
    setNum(state) {
      state.num++
    },
    setBgSrc(state, res) {
      state.bgSrc = res
      func.localBgSrc.set(state.bgSrc)
    },
    setInput(state, res) {
      state.input = res
    },
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
      func.localFollow.set(state.follow)
    },
    removeFollowed(state, id) {
      state.follow = state.follow.filter(item => {
        return item.itemId != id
      })
      func.localFollow.set(state.follow)
    },
  },
  getters: {
    badge: state => {
      return state.follow.filter(item => item.followed).length
    }
  },
})
export default store