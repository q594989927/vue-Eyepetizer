<template>
  <div class="clearfix">
    <div class="el-card card titles" @click="_go(id)" v-if="titles">
      <h3 v-html="titles"></h3>
      <p v-html="subTitle"></p>
      <p>查看更多</p>
    </div>
    <el-card class="card" :body-style="{ padding: '0px'}" v-for="(item,index) in datas" :key="index">
      <div class="video" @click='_play(item.data.playUrl,item.data.id)' @mouseenter="_mouseEnter(item,index)" @mouseleave="_mouseOut">
        <video v-if="index===num" width="260" class="mouseShow" autoplay muted="muted" :src="src"></video>
        <img v-else class="image" v-lazy='item.data.cover.detail'>
      </div>
      <div class="text">
        <div @mouseenter="_enter(index)">
          <p class="txt">{{item.data.title}}</p>
          <div class="clearfix">
            <img v-if="item.data.author" class="icon" v-lazy="item.data.author.icon">
            <div class="desc">
              <p v-if="item.data.author" class="author">{{item.data.author.name}}</p>
              <span class="time">
                {{_duration(item.data.duration)}} / {{item.data.category}}
              </span>
            </div>
          </div>
        </div>
        <transition name="el-fade-in">
          <div class="under" v-if="index==v" @mouseleave="_out">
            <p>
              {{item.data.description}}
            </p>
          </div>
        </transition>
      </div>
    </el-card>
  </div>
</template>

<script>
import { add2Zero } from '@/assets/js/calc'
import { mapMutations } from 'vuex'
export default {
  name: 'card',
  props: {
    id: {
      type: Number,
    },
    titles: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    datas: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      v: null,
      num: -1,
      src: '',
      timer: null,
    }
  },
  methods: {
    ...mapMutations([
      'setVideoSrc',
      'setTap',
      'setVideoId'
    ]),
    _play(url, id) {
      this.setVideoSrc(url)
      this.setVideoId(id)
      this.setTap(false)
      clearTimeout(this.timer)
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
    _enter(index) {
      this.v = index
    },
    _out() {
      this.v = null
    },
    _go(id) {
      this.$emit('go', id)
    },
    _duration(v) {
      return add2Zero(v)
    },
  }
}
</script>

<style scoped>
.card:hover {
  transition: ease-out .2s;
  transform: scale3d(1.05, 1.05, 1.05)
}

.card {
  position: relative;
  width: 260px;
  height: 240px;
  margin: 9px;
  float: left;
}

.video {
  width: 260px;
  height: 145px;
}

.titles {
  color: #fff;
  background: rgba(0, 0, 0, .3);
  text-align: center;
}

.titles>h3 {
  font-size: 18px;
  width: 260px;
  height: 40px;
  line-height: 40px;
  margin-top: 65px;
}

.titles>p {
  font-size: 13px;
  width: 260px;
  height: 40px;
  line-height: 40px;
}

.text {
  box-sizing: border-box;
  position: relative;
  width: 260px;
  height: 100px;
  padding: 5px;
}

.under {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding: 8px;
  background: #fff;
}

.under>p {
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.txt {
  height: 50px;
}

.time {
  font-size: 13px;
  color: #999;
}

.mouseShow {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.image {
  width: 100%;
  height: 145px;
  display: block;
}

.icon {
  width: 30px;
  border-radius: 50%;
  vertical-align: top;
}

.desc {
  line-height: 16px;
  padding-left: 10px;
  display: inline-block;
}

.desc .author {
  font-size: 14px
}
</style>
