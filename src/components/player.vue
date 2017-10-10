<template>
  <div class="play" v-if="!closed">
    <div class="playVideo" @mousemove="_show" @mouseleave="_hidden">
      <video controls="controls" :src="videoSrc" ref="video" @click="_play"></video>
      <transition tag="div" name="slide" class="clearfix">
        <div v-if="tap" class="playerMenu" key="a">
          <span @click='_closed'>
            <i class="el-icon-my-sand"></i>
            收藏</span>
          <span @click='_closed'>
            <i class="el-icon-my-leave"></i>
            关闭</span>
        </div>
      </transition>
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
    ...mapState(['closed', 'videoSrc'])
  },
  methods: {
    ...mapMutations([
      'setTap'
    ]),
    _show() {
      clearTimeout(this.timer)
      this.tap = true
      this.timer = setTimeout(() => {
        this.tap = false
      }, 5000)
    },
    _hidden() {
      this.tap = false
    },
    _closed() {
      this.setTap(true)
    },
    _play() {
      if (this.$refs.video.paused) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }

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
  background: #252525;
  overflow: hidden;
}

.playVideo {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 630px;
  overflow: hidden;
}

.playVideo>video {
  width: 1120px;
  height: 630px;
}

.slide-enter-active {
  transform: translateY(0);
  transition: all .4s linear;
}

.slide-enter {
  transition: .1s;
  transform: translateY(-100%);
}

.slide-leave {
  transform: translateY(0);
}

.playVideo .playerMenu {
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 14px;
  line-height: 30px;
  color: #fff;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background: rgba(0, 0, 0, .4);
}

.playerMenu>span:hover {
  color: #FF920B;
}

.playerMenu>span {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 30px;
  width: 60px;
}

.playerMenu>span:nth-of-type(1) {
  right: 80px;
}

.el-icon-my-leave {
  vertical-align: text-top
}

.vdeoDetail {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding-top: 10px;
  background-color: #3a3c40;
}
</style>
