<template>
  <div class="vdeoDetail">
    <div class="title">
      <h3 class="text" v-if="headerText" v-html="headerText"></h3>
      <el-button class="random" @click="_random">随便看看=</el-button>
    </div>
    <div class="detail" v-for="(item,index) in list" :key="index">
      <div class="cover">
        <img v-lazy='item.data.cover.detail'>
      </div>
      <div class="intro">
        <img v-if="item.data.author" class="icon" v-lazy="item.data.author.icon">
        <p v-if="item.data.author" class="author">{{item.data.author.name}}</p>
        <p class="desc" v-html="item.data.description"></p>
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
      'setVideoId'
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
    _random() {
      let n = this.tempId[parseInt(Math.random() * 5)]
      this._show(n)
    }
  },
  whatch: {
  },
  created() {
    this._show(this.videoId)
  }
}
</script>

<style scoped>
.vdeoDetail {
  text-align: center;
  background: #fff;
}

.title {
  text-align: left;
  overflow: hidden;
  margin-bottom: 10px;
}

.text {
  float: left;
  padding-left: 20px;
  font-size: 18px;
  line-height: 30px;
}

.random {
  float: right;
  width: 80px;
  padding: 0 5px;
  font-size: 14px;
  line-height: 26px;
  margin-right: 20px;
  /* cursor: pointer; */
}

.detail:hover {
  transition: .5s;
  transform: scale3d(1.05, 1.05, 1.05)
}

.detail {
  width: 180px;
  height: 220px;
  margin: 5px;
  display: inline-block;
  vertical-align: top;
  text-align: left;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.cover {
  display: inline-block;
  width: 180px;
  height: 100px;
  overflow: hidden;
}

.cover>img {
  display: block;
  width: 100%;
}

.intro {
  width: 160px;
  margin: 10px 10px 0 10px;
  font-size: 14px;
  line-height: 20px;
}

.desc {
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: top;
}

.author {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 120px;
  line-height: 30px;
  padding-left: 5px;
  display: inline-block;
}
</style>
