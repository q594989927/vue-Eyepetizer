<template>
  <div class="replies clearfix">
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
  name: 'replies',
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
.replies {
  text-align: center;
}

.detail {
  width: 200px;
  height: 170px;
  margin: 10px 10px 20px;
  display: inline-block;
  vertical-align: top;
  text-align: left;
}

.cover {
  display: block;
  width: 200px;
  height: 100px;
  overflow: hidden;
}

.cover>img {
  display: block;
  width: 100%;
}

.intro {
  width: 180px;
  height: 55px;
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
