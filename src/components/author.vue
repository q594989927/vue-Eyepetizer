<template>
  <div class="list" v-loading="!lastList.length">
    <div>
      <div :class="{'author':!item.data.text}" v-for="(item,index)  in lastList" :key="index">
        <h3 class="title" v-if="item.data.text" v-html="item.data.text"></h3>
        <div v-if="item.data.title">
          <img @click="_info(item.data.id)" class="icon" v-lazy="item.data.icon" alt="">
          <div class="text clearfix">
            <p class="name" v-html="item.data.title"></p>
            <p class="txt" v-html="item.data.description"></p>
            <el-button>
              <span class="add">+</span>关注
            </el-button>
          </div>
        </div>
        <div v-if="item.data.header">
          <img @click="_info(item.data.header.id)" class="icon" v-lazy="item.data.header.icon" alt="">
          <div class="text clearfix">
            <p class="name" v-html="item.data.header.title"></p>
            <p class="txt" v-html="item.data.header.description"></p>
            <el-button>
              <span class="add">+</span>关注
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="intro.tabInfo" class="intro">
      <p v-html="intro.pgcInfo.name"></p>
      <p v-html="intro.pgcInfo.brief"></p>
      <p v-html="intro.pgcInfo.description"></p>
      <el-button :plain="true" type="info" v-for="(el,index) in  intro.tabInfo.tabList" :key="index" v-html="el.name"></el-button>
    </div>
    <!-- <div class="detail">
      <div class="coverPhoto"></div>
    </div> -->
    <load-more v-show="newList.length" @currentChange="_currentChange"></load-more>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getDefaultAuthor, getAuthor, getAuthorDetail } from '@/assets/api/getDatas'
import { add2Zero } from '@/assets/js/add2Zero'

import loadMore from './loadMore'
export default {
  name: 'hot',
  components: {
    loadMore
  },
  data() {
    return {
      lastList: [],
      newList: [],
      textHeader: [],
      detail: {},
      intro: {},
      id: null,
      start: 0,
      count: 9,
      n: 0
    }
  },
  methods: {
    ...mapMutations([
      'setVideoSrc',
      'setTap'
    ]),
    _getList() {
      getDefaultAuthor().then(res => {
        this.newList = res.itemList.filter(item => {
          return item.type != "blankCard"
        })
        this.newList.pop()
        this.lastList = this.lastList.concat(this.newList)
      })
    },
    _getAuthor(start, count) {
      getAuthor(start, count).then(res => {
        this.newList = res.itemList.filter(item => {
          return item.type != "blankCard"
        })
        this.lastList = this.lastList.concat(this.newList)
      })
    },
    _info(v) {
      this.id = v
    },
    _getAuthorDetail(id) {
      getAuthorDetail(id).then(res => {
        console.log(res)
        this.intro = res
      })
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
    },
  },
  computed: {
  },
  watch: {
    start: function() {
      this._getAuthor(this.start, this.count)
    },
    id: function() {
      this._getAuthorDetail(this.id)
    },
  },
  created() {
    this._getList()
  }

}
</script>

<style scoped>
.list {
  width: 100%;
  overflow: hidden;
}

.author:hover {
  transition: .2s;
  transform: scale3d(1.02, 1.02, 1.05)
}

.author {
  display: inline-block;
  margin: 9px;
  width: 260px;
  height: 120px;
  border: 1px solid #d1dbe5;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.title {
  height: 30px;
  margin: 20px 10px;
  border-bottom: 1px dashed #000;
}

.icon {
  float: left;
  width: 80px;
  height: 80px;
  padding: 20px 10px;
  border-radius: 50%;
}

.text {
  float: left;
  width: 160px;
}

.name,
.txt {
  font-size: 14px;
  line-height: 30px;
  width: 140px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.name {
  font-size: 18px;
  line-height: 50px;
}

.add {
  position: relative;
  top: -1px;
  font-size: 16px;
}

.intro {
  position: fixed;
  top: 200px;
  background: #fff;
  width: 240px;
  padding: 10px;
  text-align: center;
  border: 1px solid #d1dbe5;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.intro>p {
  font-size: 12px;
  line-height: 20px;
}

.intro>p:nth-child(1) {
  font-size: 16px;
}

.intro>p:nth-child(3) {
  margin-bottom: 5px;
}

.el-button {
  font-size: 14px;
  line-height: 10px;
  height: 30px;
}

.detail {
  position: fixed;
  top: 200px;
  width: 860px;
  height: 810px;
  background: #fff;
}

.coverPhoto {
  width: 472px;
  height: 241px;
  background-image: linear-gradient(90deg)
}
</style>
