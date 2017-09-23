<template>
  <div class="vdeoDetail clearfix">
    <div class="title clearfix">
      <h3 class="text" v-if="headerText" v-html="headerText"></h3>
      <el-button v-if="videoId" class="random" @click="_random">
        查看更多
        <i class="el-icon-more"></i>
      </el-button>
    </div>
    <div @click="_play(item)" class="detail" v-for="(item,index) in list" :key="index">
      <div class="cover">
        <img v-lazy='item.data.cover.detail'>
      </div>
      <div class="intro">
        <img v-if="item.data.author" class="icon" v-lazy="item.data.author.icon">
        <p v-if="item.data.author" class="author ellipsis">{{item.data.author.name}}</p>
        <p class="title ellipsis" v-html="item.data.title"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiVdeoDetail } from '@/assets/api/getDatas'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'vdeoDetail',
  data() {
    return {
      tap: false,
      timer: null,
      list: [],
      headerText: null,
      tempId: [],
    }
  },
  computed: {
    ...mapState({
      videoId: state => state.videoId,
    })
  },
  methods: {
    ...mapMutations([
      'setVideoId',
      'setVideoSrc',
    ]),
    _show(id) {
      apiVdeoDetail(id).then(res => {
        res.itemList.forEach(el => {
          if (el.type == "textCard") {
            this.headerText = el.data.text
          } else {
            this.tempId.push(el.data.id)
          }
        })
        this.list = res.itemList.splice(1)
      })
    },
    _play(i) {
      console.log(i)
      this.setVideoSrc(i.data.playUrl)
    },
    _random() {
      let n = this.tempId[parseInt(Math.random() * 5)]
      this._show(n)
    }
  },
  whatch: {
  },
  created() {
    if (this.videoId) {
      this._show(this.videoId)
    }
  }
}
</script>

<style scoped>
.vdeoDetail {
  text-align: center;
}

.vdeoDetail>.title {
  overflow: hidden;
  width: 1080px;
  margin: 10px 20px;
}

.text {
  float: left;
  font-size: 18px;
  line-height: 30px;
  color: #ccc
}

.random {
  float: right;
  width: 88px;
  padding: 0 2px;
  font-size: 14px;
  line-height: 26px;
}

.detail:hover {
  transition: ease-out .2s;
  transform: scale3d(1.05, 1.05, 1.05) translateY(-10px)
}

.detail {
  width: 200px;
  height: 90px;
  margin: 10px 10px 20px;
  display: inline-block;
  vertical-align: top;
  text-align: left;
}

.cover {
  display: block;
  width: 200px;
  height: 60px;
  overflow: hidden;
}

.cover>img {
  display: block;
  width: 100%;
}

.intro {
  width: 180px;
  height: 30px;
  margin: 5px;
  font-size: 14px;
}

.icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: top;
}

.author {
  width: 140px;
  line-height: 30px;
  padding-left: 5px;
  display: inline-block;
  color: #999;
}

.intro>.title {
  font-size: 14px;
  width: 190px;
  height: 20px;
  color: #ccc;
}
</style>
