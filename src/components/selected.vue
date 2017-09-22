<template>
  <div class="container">
    <topBar :isRouter="isRouter" @search='_search'></topBar>
    <div class="slide clearfix">
      <transition-group tag="div" class="carouselWrap" ref="carouselWrap" name='image' @click="_change">
        <div class="carousel" :class="{active:index==active}" v-show='index==active' v-for="(item,index) in newList" :key="index">
          <div class="cover" @click='_play(item.data.playUrl)'>
            <img :src='item.data.cover.feed'>
            <h3>{{item.data.title}}</h3>
            <p>{{item.data.slogan}}</p>
          </div>
        </div>
      </transition-group>
      <div class="indicator">
        <div class="mask" v-for="(item,index) in newList" :key="index">
          <img class="blur" v-show="index == active" :src="item.data.cover.blurred">
          <div v-if="index == active" class="upside"></div>
        </div>
        <div class="txtList" :class="{five:newList.length==5}">
          <div v-for="(item,index) in newList" @click="_change(index)" :key="index">
            <p :class="{active:index == active}" class="text ellipsis">{{item.data.title}} </p>
            <span class="ellipsis">{{item.data.slogan}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <h3 class="title" v-html="date"></h3>
      <el-card class="card" :class="{six:lastList.length==6}" :body-style="{ padding: '0px'}" v-for="(item,index) in lastList" :key="index">
        <div @click='_play(item)' @mouseenter="_mouseEnter(item,index)" @mouseleave="_mouseOut">
          <div :class="{six:lastList.length==6}" class="image">
            <video v-if="index===num" :class="{six:lastList.length==6}" class="video" autoplay muted="muted" :src="src"></video>
            <img v-else :src="item.data.cover.detail">
          </div>
        </div>
        <div style="padding: 8px;">
          <p :class="{six:lastList.length==6}" class="txt ellipsis">{{item.data.title}}</p>
          <div class="bottom clearfix">
            <span class="time">{{_duration(item.data.duration)}}</span>
            <el-button type="text" class="button">{{item.data.category}}</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div class="btn">
      <el-button :plain="true">
        <</el-button>
          <el-button :plain="true">></el-button>
    </div>
  </div>
</template>

<script>
import { apiSelected } from '@/assets/api/getDatas'
import { add2Zero, getDate } from '@/assets/js/calc'
import { mapGetters, mapState, mapMutations } from 'vuex'
import topBar from './topBar'
export default {
  name: 'selected',
  components: {
    topBar
  },
  data() {
    return {
      isRouter: true,
      newList: [],
      lastList: [],
      date: '',
      prevPageUrl: null,
      nextPageUrl: null,
      num: -1,
      src: '',
      timer: null,
      active: 0,
      autoTimer: null,
      interval: 4000,
      newListLength: null,
    }
  },
  computed: {
    ...mapGetters([
      'badge'
    ]),
  },
  methods: {
    ...mapMutations([
      'setVideoSrc',
      'setTap',
      'setVideoId'
    ]),
    _getList() {
      apiSelected().then(res => {
        this.nextPageUrl = res.nextPageUrl
        this.newList = res.itemList.filter(obj => {
          return obj.type == 'video' && obj.tag == '0'
        })
        this.newListLength = this.newList.length

        this.lastList = res.itemList.filter(obj => {
          return obj.type == 'video' && obj.tag == '1'
        })
        res.itemList.forEach(el => {
          if (el.type == "textHeader") {
            this.date = el.data.text.split('-').join('').split(',')[0]
          }
        })
      })
    },
    _search() {

      console.log()
    },
    _change(n) {
      this.active = n
      clearTimeout(this.autoTimer)
    },
    _autoPlay() {
      this.autoTimer = setTimeout(() => {
        this.active++
        this.active = this.active % this.newListLength
      }, this.interval)
    },
    _play(url) {
      this.setVideoSrc(url)
      //this.setVideoId(id)
      this.setTap(false)
      clearTimeout(this.timer)
    },
    _mouseEnter(item, index) {
      clearTimeout(this.timer)
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
  },
  watch: {
    active() {
      this._autoPlay()
    }
  },
  mounted() {
    this._autoPlay()
  },

  created() {
    this._getList();
  }
}
</script>

<style scoped>
.image-enter-active,
.image-leave-active {
  transition: opacity .5s
}

.image-enter,
.image-leave-to {
  opacity: 0
}

.container {
  padding: 0;
}

.slide {
  height: 370px;
  overflow: hidden;
}


.carouselWrap {
  position: relative;
  float: left;
  width: 780px;
  height: 370px;
  z-index: 0;
}

.carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  z-index: 0;
}

.active {
  z-index: 1;
}

.carousel .cover {
  position: relative;
  color: #fff;
  text-align: center;
  width: 780px;
  height: 370px;
  overflow: hidden;
}

.carousel .cover img {
  width: 100%;
}

.carousel .cover h3,
.carousel .cover p {
  position: absolute;
  bottom: 18%;
  left: calc( 50% - 200px);
  width: 400px;
  font-size: 16px;
}

.carousel .cover p {
  bottom: 10%;
  font-size: 12px;
}

.indicator {
  position: relative;
  float: right;
  width: 215px;
  height: 370px;
  overflow: hidden;
  z-index: 2;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 185px;
  height: 60px;
}

.mask .upside {
  position: absolute;
  top: 0;
  left: 0;
  width: 215px;
  height: 370px;
  background: rgba(255, 255, 255, 0.1);
}

.mask .blur {
  position: absolute;
  left: -50px;
  top: -50px;
  height: 500px;
}

.five {
  margin-top: 29px;
}

.txtList {
  position: absolute;
  top: 0;
  left: 0;
  width: 180px;
  height: auto;
  padding: 20px 0 20px 20px;
  cursor: pointer;
  text-shadow: 1px 1px rgba(0, 0, 0, .2)
}

.txtList>div:nth-child(1)>p:nth-child(1) {
  margin-top: 1px;
}

.txtList .text {
  margin-top: 15px;
  font-size: 14px;
  color: #f1f1f1;
}

.txtList span {
  padding-top: 1px;
  font-size: 12px;
  line-height: 20px;
  display: block;
  color: #eeeeee;
}

.txtList .active {
  color: #FF920B;
  font-size: 20px;
}

.list {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.title {
  padding-left: 20px;
  line-height: 50px;
  height: 50px;
  color: #fff;
  font-style: italic;
}

.card:hover {
  transition: ease-out .2s;
  transform: scale3d(1.05, 1.05, 1.05) translateY(-10px)
}

.card {
  position: relative;
  width: 172px;
  margin-left: 20px;
  overflow: hidden;
  float: left;
}

.card.six {
  width: 150px;
  margin-left: 12px;
}

.image {
  height: 100px;
  overflow: hidden;
}

.image.six {
  height: 87px;
}

.image img {
  width: 100%;
  display: block;
}

.icon {
  width: 30px;
  border-radius: 50%;
  vertical-align: top;
}

.txt {
  font-size: 14px;
  height: 30px;
  width: 160px;
}

.txt.six {
  width: 130px;
}

.time {
  line-height: 34px;
  font-size: 13px;
  color: #999;
}

.button {
  float: right;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 172px;
}

.video.six {
  width: 150px;
}

.desc {
  line-height: 16px;
  padding-left: 10px;
  display: inline-block;
}

.desc .author {
  font-size: 14px
}

.btn {
  margin-left: 20px;
}

.el-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
