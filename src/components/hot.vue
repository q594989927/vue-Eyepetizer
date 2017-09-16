<template>
  <div class="hot">
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
import { getHot, getCategory, getAuthor } from '@/assets/api/getDatas'
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'hot',
  data() {
    return {
      title: ['热门', '分类', '作者'],
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
      this.lastList = this.itemList.filter(obj => {
        return obj.type == 'video'
      })
      this.lastList.forEach(ele => {
        this.duration.push(ele.data.duration)
      });
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
    getHot().then(res => {
      console.log(res)
      this.itemList = res.itemList
      this._getList();
    })
  }

}
</script>

<style scoped>
.hot {
  box-sizing: border-box;
  padding: 10px;
  overflow: auto;
}

.list {
  width: 100%;
}

.title {
  text-align: center;
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
