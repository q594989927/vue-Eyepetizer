<template>
  <div v-loading="!lastList.length">
    <div class="list">
      <el-card class="card" :body-style="{ padding: '0px'}" v-for="(item,index) in lastList" :key="index">
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
    <div v-show="lastList.length" class="loadMore" @click="_currentChange">加载更多</div>
  </div>
</template>

<script>
import { getHot, getCategory, getAuthor } from '@/assets/api/getDatas'
import { add2Zero } from '@/assets/js/add2Zero'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'hot',
  data() {
    return {
      lastList: [],
      num: -1,
      src: '',
      timer: null,
      start: 1,
      count: 15,
      n: 0
    }
  },
  methods: {
    ...mapMutations([
      'setVideoSrc',
      'setTap'
    ]),
    _getList(start, count) {
      getHot(start, count).then(res => {
        let newList = res.itemList
        this.lastList = this.lastList.concat(newList)
      })
    },
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
    _currentChange() {
      this.n++
      this.start = this.n * this.count
    },
  },
  computed: {

  },
  watch: {
    start: function() {
      this._getList(this.start, this.count);
    },
  },
  created() {
    this._getList(this.start, this.count);
  }

}
</script>

<style scoped>
.list {
  width: 100%;
  overflow: hidden;
}

.title {
  text-align: center;
}

.loadMore {
  margin: 0 auto;
  width: 400px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  color: #b7b7b7;
  background: #f3f3f3;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>
