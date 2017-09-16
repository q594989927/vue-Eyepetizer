<template>
  <div class="selected">
    <el-carousel :interval="4000" type="card" trigger="click" height="240px">
      <el-carousel-item v-for="(item,index) in newList" :key="index">
        <div class="cover" @click='_play(item)'>
          <img :src="item.data.cover.feed" alt="">
          <h3>{{item.data.title}}</h3>
          <p>{{item.data.slogan}}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="list">
      <el-card class="card" :body-style="{ padding: '0px'}" v-for="(item,index) in lastList" :key="index">
        <div @click='_play(item)' @mouseenter="_mouseEnter(item,index)" @mouseleave="_mouseOut">
          <video v-if="index===num" width="260" class="mouseShow" autoplay muted="muted" :src="src"></video>
          <img class="image" :src="item.data.cover.feed">
        </div>
        <div style="padding: 8px;">
          <p class="txt">{{item.data.title}}</p>
          <div class="bottom clearfix">
            <span class="time">{{_duration(index)}}</span>
            <el-button type="text" class="button">{{item.data.category}}</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getSelected } from '@/assets/api/getDatas'
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'selected',
  data() {
    return {
      itemList: [],
      newList: [],
      lastList: [],
      duration: [],
      num: -1,
      src: ''
    }
  },
  methods: {
    ...mapMutations([
      'setVideoSrc',
      'setIsTap'
    ]),
    _getList() {
      this.newList = this.itemList.filter(obj => {
        return obj.type == 'video' && obj.tag == '0'
      })
      this.lastList = this.itemList.filter(obj => {
        return obj.type == 'video' && obj.tag == '1'
      })
      this.lastList.forEach(ele => {
        this.duration.push(ele.data.duration)
      });
      console.log(this.duration)
    },
    _play(i) {
      this.setVideoSrc(i.data.playInfo[1].url)
      this.setIsTap(false)
    },
    _mouseEnter(item, index) {
      this.num = index
      this.src = item.data.playInfo[1].url
    },
    _mouseOut() {
      this.num = -1
      this.src = ''
    },
    _duration(index) {
      let m = (this.duration[index] / 60 | 0)
      m = m < 10 ? '0' + m : '' + m
      let s = this.duration[index] % 60
      s = s < 10 ? '0' + s : '' + s
      return m + "'" + s + "''"
    },
  },
  computed: {

  },
  created() {
    getSelected().then(res => {
      this.itemList = res.itemList
      this._getList();
    })
  }

}
</script>

<style scoped>
.selected {
  box-sizing: border-box;
  padding: 10px;
}

.playVideo {
  position: fixed;
  z-index: 999;
  top: 10px;
  left: 110px;
  width: 860px;
  height: 800px;
  background: #fff;
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

.el-carousel__item .cover {
  position: relative;
  color: #fff;
  text-align: center
}

.el-carousel__item .cover img {
  width: 100%;
}

.el-carousel__item .cover h3 {
  position: absolute;
  bottom: 20%;
  left: calc( 50% - 170px);
  width: 340px;
}

.el-carousel__item .cover p {
  position: absolute;
  bottom: 10%;
  left: calc( 50% - 170px);
  font-size: 14px;
  width: 340px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.list {
  width: 100%;
  height: 520px;
  overflow: auto;
}

.card {
  position: relative;
  width: 260px;
  height: 240px;
  margin: 9px;
  float: left;
}

.txt {
  height: 50px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 5px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
