<template>
  <div v-if="!closed" class="playVideo">
    <video controls="controls" width="800" :src="videoSrc">
    </video>
    <span @click='_closed'>关闭</span>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'selected',
  data() {
    return {
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
      'setVideoSrc',
      'setTap'
    ]),
    _closed() {
      this.setTap(true)
    }
  },
}
</script>

<style scoped>
.playVideo {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 120px;
  width: 860px;
  height: 810px;
  background: rgba(0, 0, 0, .6)
}

.playVideo video {
  position: absolute;
  top: 175px;
  left: 30px;
  right: 0;
  bottom: 0;
}

.playVideo span {
  color: red;
  position: absolute;
  right: 0;
}
</style>
