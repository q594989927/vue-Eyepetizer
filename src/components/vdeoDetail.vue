<template>
  <div class="vdeoDetail clearfix">
    <div class="title clearfix">
      <h3 class="text" v-if="headerText" v-html="headerText"></h3>
      <span v-if="videoId" class="random" @click="_random">
        瞎看看
        <i class="el-icon-more"></i>
      </span>
    </div>
    <transition-group tag="div" name="list" mode="out-in">
      <div @click="_play(item)" class="detail" v-if='tempId.length' v-for="(item,index) in list" :key="index">
        <div class="cover">
          <img v-lazy='item.data.cover.detail'>
        </div>
        <div class="intro">
          <img v-if="item.data.author" class="icon" v-lazy="item.data.author.icon">
          <p v-if="item.data.author" class="author ellipsis">{{item.data.author.name}}</p>
          <p class="title ellipsis" v-html="item.data.title"></p>
        </div>
      </div>
    </transition-group>

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
      this.tempId = []
      apiVdeoDetail(id).then(res => {
        res.itemList = res.itemList.splice(0, 6)
        res.itemList.forEach(el => {
          if (el.type == "textCard") {
            this.headerText = el.data.text
          } else {
            this.tempId.push(el.data.id)
          }
        })
        this.list = res.itemList.filter(el => {
          return el.type == "videoSmallCard"
        })
      })
    },
    _play(i) {
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
.list-enter-active,
.list-leave-active {
  transition: all .5s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.vdeoDetail {
  text-align: center;
}

.vdeoDetail>.title {
  overflow: hidden;
  width: 1080px;
  height: 30px;
  margin-left: 20px;
  color: #f1f1f1
}

.text {
  float: left;
  font-size: 18px;
  line-height: 30px;
}

.random {
  float: right;
  width: 88px;
  padding: 0 2px;
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;
  border-radius: 4px;
  background: #7F7F7F;
}

.random:hover {
  color: #FF920B;
}

.detail:hover {
  transition: ease-out .2s;
  transform: scale3d(1.05, 1.05, 1.05) translateY(-10px)
}

.detail {
  position: relative;
  width: 200px;
  height: 100px;
  margin: 5px 10px 20px;
  display: inline-block;
  vertical-align: top;
  text-align: left;
}

.cover {
  display: block;
  width: 200px;
  height: 100px;
  overflow: hidden;
  border-radius: 4px;
}

.cover>img {
  display: block;
  width: 100%;
}

.intro {
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  height: 100px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.4);
  padding: 20px 10px;
  box-sizing: border-box;
  border-radius: 4px;
}

.icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: top;
}

.author {
  width: 100px;
  line-height: 30px;
  padding-left: 5px;
  display: inline-block;
  color: #f1f1f1;
}

.intro>.title {
  font-size: 16px;
  width: 100%;
  height: 20px;
  color: #fff;
}
</style>
