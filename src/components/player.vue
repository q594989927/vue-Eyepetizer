<template>
  <div class="play" v-if="!closed">
    <div class="playVideo">
      <video controls="controls" :src="videoSrc" @mouseover="_show" @mouseout="_hidden"></video>
      <span v-if="tap" @click='_closed'>关闭</span>
    </div>
    <vdeoDetail></vdeoDetail>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import vdeoDetail from './vdeoDetail'
export default {
  name: 'play',
  components: {
    vdeoDetail
  },
  data() {
    return {
      tap: false,
      timer: null
    }
  },
  computed: {
    ...mapState({
      closed: state => state.closed,
      videoSrc: state => state.videoSrc,
    })
  },
  methods: {
    ...mapMutations([
      'setTap'
    ]),
    _show() {
      clearTimeout(this.timer)
      this.tap = true
    },
    _hidden() {
      this.timer = setTimeout(() => {
        this.tap = false
      }, 3000)

    },
    _closed() {
      this.setTap(true)
    }
  },
  watch: {

  }
}
</script>

<style scoped>
.play {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 1120px;
  height: 720px;
  margin: 80 auto;
  background: #fff;
  overflow: hidden;
}

.playVideo>video {
  width: 835px;
}

.playVideo span {
  text-align: center;
  position: absolute;
  top: 20px;
  right: 10px;
  height: 30px;
  width: 40px;
  font-size: 14px;
  line-height: 30px;
  color: #fff;
  background: #1F0716;
  border-radius: 5px 5px 5px 0;
  cursor: pointer;
}

.vdeoDetail {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
