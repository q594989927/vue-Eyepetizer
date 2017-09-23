<template>
  <div class="play" v-if="!closed">
    <div class="playVideo">
      <video controls="controls" :src="videoSrc" @mouseover="_show" @mouseout="_hidden"></video>
      <div @mouseover="_show" @mouseout="_hidden" class="playerMenu">
        <p v-if="tap" @click='_closed'>关闭</p>
        <p v-if="tap" @click='_closed'>收藏</p>
      </div>
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
  background: rgb(0, 0, 0);
  /* background: #252525; */
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

.playVideo .playerMenu {
  text-align: center;
  position: absolute;
  bottom: 40px;
  right: -2px;
  font-size: 14px;
  line-height: 30px;
  color: #FF920B;
  cursor: pointer;
}

.playerMenu>p {
  height: 30px;
  width: 45px;
  border-radius: 0 5px 5px 0;
  background: #fff;
  margin-bottom: 5px;
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
