<template>
  <div class="list" v-loading="!lastList.length">
    <div>
      <div :class="{'author':!item.text}" v-for="(item,index)  in lastList" :key="index">
        <h3 class="title" v-if="item.text" v-html="item.text"></h3>
        <div class="clearfix" @mouseenter="_info(item.id,index)" v-if="item.title">
          <img class="icon" v-lazy="item.icon">
          <div class="text">
            <p class="name" v-html="item.title"></p>
            <p class="txt" v-html="item.description"></p>
          </div>
        </div>
        <transition v-if="!item.text" name="el-zoom-in-top">
          <div v-loading="loading" v-if="item.title&&index==show" @mouseenter="_stay(index)" @mouseleave="_out()" class="introWrap" ref="Intro">
            <div v-if="intro.tabInfo" class="intro">
              <p v-html="intro.pgcInfo.name"></p>
              <p v-html="intro.pgcInfo.brief"></p>
              <a class="tabList" href="javasript:;" v-for="(el,index) in  intro.tabInfo.tabList" :key="index" v-html="el.name"></a>
              <el-button type="text" size="small" class="focusOn" v-if="item.follow.followed" @click="_setFollows(item.id,item.follow.followed)">已关注</el-button>
              <el-button type="text" size="small" class="focusOn" v-else @click="_setFollows(item.id,item.follow.followed)">关注</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- <div class="detail"><div class="coverPhoto"></div></div> -->
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
      lastList: [],    //总数据
      newList: [],     //每次获取新数据
      intro: {},       //作者简介
      id: null,        //作者id
      start: 0,
      count: 9,
      n: 0,            //加载更多计数
      timer: null,
      show: null
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
    })
  },
  methods: {
    ...mapMutations([
      'setBadge',
      'setLoading'
    ]),
    _getList() {
      getDefaultAuthor().then(res => {
        this.newList = res.itemList.filter(item => {
          return item.type != "blankCard"
        })
        this.newList.pop()
        this._getNewList()
        this.lastList = this.lastList.concat(this.newList)
      })
    },
    _getAuthor(start, count) {
      getAuthor(start, count).then(res => {
        this.newList = res.itemList.filter(item => {
          return item.type != "blankCard"
        })
        this._getNewList()
        this.lastList = this.lastList.concat(this.newList)
      })
    },
    _getNewList() {
      let arr = []
      this.newList.forEach(el => {
        if (el.data && !el.data.header) {
          arr.push(el.data)
        } else if (el.data.header) {
          arr.push(el.data.header)
        }
      })
      this.newList = arr
    },
    _info(v, index) {
      this.id = v
      this._getAuthorDetail(this.id)
      this.timer = setTimeout(() => {
        this.show = index
        this.setLoading(false)
      }, 500);
    },
    _out() {
      this.show = null
      this.id = null
      this.setLoading(true)
      clearTimeout(this.timer)
    },
    _stay(index) {
      this.setLoading(false)
      this.show = index
    },
    _getAuthorDetail(id) {
      getAuthorDetail(id).then(res => {
        this.intro = res
      })
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
    },
    _setFollows(id, boo) {
      this.lastList.forEach(item => {
        if (item.follow && item.follow.itemId == id) {
          item.follow.followed = !boo
        }
      })
      if (!boo) {
        this.setBadge(1)
      } else {
        this.setBadge(-1)
      }
    },
  },
  watch: {
    start: function() {
      this._getAuthor(this.start, this.count)
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
  position: relative;
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
  margin-top: 15px;
  line-height: 50px;
}

.introWrap {
  position: absolute;
  left: -5px;
  top: -5px;
  height: auto;
  width: 270px;
  height: 130px;
  background: #fff;
  border: 1px solid #d1dbe5;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.intro {
  width: 240px;
  padding: 10px;
  text-align: center;
}

.intro>p {
  font-size: 12px;
  line-height: 30px;
  margin-bottom: 5px;
}

.intro>p:nth-child(1) {
  font-size: 16px;
}

.intro>p:nth-child(2) {
  margin-bottom: 15px;
}

.focusOn {
  color: #FFB8FA;
}

.tabList {
  font-size: 14px;
  line-height: 20px;
  margin: 0 15px;
}

.tabList {
  display: inline-block;
  border-bottom: 1px solid #0E1142;
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