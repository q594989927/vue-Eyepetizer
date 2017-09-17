<template>
  <div class="list">
    <el-card class="card" :body-style="{ padding: '0px'}" v-for="(item,index) in datas" :key="index">
      <div @click='_play(item)' @mouseenter="_mouseEnter(item,index)" @mouseleave="_mouseOut">
        <video v-if="index===num" width="260" class="mouseShow" autoplay muted="muted" :src="src"></video>
        <img class="image" v-lazy='item.data.cover.detail' src="">
      </div>
      <div style="padding: 8px;">
        <p class="txt">{{item.data.title}}</p>
        <div class="bottom clearfix">
          <img class="icon" :src="item.data.author.icon" alt="">
          <div class="desc">
            <p class="author">{{item.data.author.name}}</p>
            <span class="time">
              {{_duration(item.data.duration)}} / {{item.data.category}}
            </span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { add2Zero } from '@/assets/js/add2Zero'
import { mapMutations } from 'vuex'
export default {
  name: 'card',
  props: {
    datas: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      num: -1,
      src: '',
      timer: null,
      n: 0
    }
  },
  methods: {
    ...mapMutations([
      'setVideoSrc',
      'setTap'
    ]),
    _play(i) {
      let url = i.data.playUrl
      this.setVideoSrc(url)
      this.setTap(false)
    },
    _mouseEnter(item, index) {
      this.timer = setTimeout(() => {
        this.num = index
        this.src = item.data.playUrl
      }, 1000)
    },
    _mouseOut() {
      clearTimeout(this.timer)
      this.num = -1
    },
    _duration(v) {
      return add2Zero(v)
    },
  }
}
</script>

<style scoped>
.list {
  width: 100%;
  overflow: hidden;
}
</style>
