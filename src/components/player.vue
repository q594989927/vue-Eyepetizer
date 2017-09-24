<template>
  <div class="play" v-if="!closed">
    <div class="playVideo">
      <video controls="controls" :src="videoSrc" @mouseenter="_show" @mouseleave="_hidden"></video>
      <transition-group tag="div" name="slide" class="playerMenu clearfix">
        <p v-if="tap" key="a" @click='_closed' @mouseenter="_show" @mouseleave="_hidden">关闭</p>
      </transition-group>
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
    vdeoDetail,
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
      }, 2000)

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
  background: rgb(0, 0, 0);
  background: #252525;
  overflow: hidden;
}

.playVideo {
  position: absolute;
  left: 20px;
  top: 0px;
}

.playVideo>video {
  width: 1080px;
  height: 560px;
}

.slide-enter-active {
  transition: all .3s ease;
}

.slide-leave-active {
  transition: all .8s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(200px);
  opacity: 0;
}

.playVideo .playerMenu {
  text-align: center;
  position: absolute;
  top: 10px;
  right: -2px;
  font-size: 14px;
  line-height: 30px;
  color: #fff;
  cursor: pointer;
}

.playerMenu>p:hover {
  color: #FF920B;
}

.playerMenu>p {
  height: 30px;
  width: 44px;
  border-radius: 5px 0 5px 0;
  margin: 0 0 10px 0;
  background: #3a3c40;
}

.vdeoDetail {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 155px;
  overflow: hidden;
}
</style>
