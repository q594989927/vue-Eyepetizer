<template>
  <div v-loading="!lastList.length">
    <div class="conWrapper clearfix" v-scroll="_currentChange">
      <div class="clearfix">
        <div :class="{'author':!item.text}" class="clearfix" v-for="(item,index)  in lastList" :key="index">
          <h3 class="title" v-if="item.text" v-html="item.text"></h3>
          <div class="clearfix" @mouseenter="_info(index)" v-if="item.title">
            <i v-if="item.follow.followed" class="el-icon-my-like"></i>
            <img class="icon" v-lazy="item.icon">
            <div class="text">
              <p class="name ellipsis" v-html="item.title"></p>
              <p class="txt ellipsis" v-html="item.description"></p>
            </div>
          </div>
          <transition name="el-fade-in" v-if="!item.text">
            <div v-show="index==show" @mouseenter="_stay(item.id,index)" @mouseleave="_out()" class="introWrap">
              <div v-if="intro.tabInfo" class="intro">
                <p v-html="intro.pgcInfo.name"></p>
                <p class="ellipsis" v-html="intro.pgcInfo.brief"></p>
                <a class="tabList" href="javasript:;" v-for="(el,index) in  intro.tabInfo.tabList" :key="index" v-html="el.name"></a>
                <el-button type="text" size="small" class="focusOn" v-if="item.follow.followed" @click="_setFollows(item.id,item.follow.followed,item.title)">已关注</el-button>
                <el-button type="text" size="small" class="focusOn" v-else @click="_setFollows(item.id,item.follow.followed,item.title)">关注</el-button>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <load-more v-show="nextPageUrl" :IS='isLoadMore' @currentChange="_currentChange"></load-more>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetter, mapMutations } from 'vuex'
import { apiDefaultAuthor, apiAuthor, apiAuthorDetail } from '@/assets/api/getDatas'
import { add2Zero } from '@/assets/js/calc'

import loadMore from './loadMore'
export default {
  name: 'hot',
  components: {
    loadMore
  },
  data() {
    return {
      isLoadMore: true,
      lastList: [],    //总数据
      newList: [],     //每次获取新数据
      intro: {},       //作者简介
      start: 0,
      count: 15,
      n: 0,            //加载更多计数
      timer: null,
      show: null,
      nextPageUrl: null
    }
  },
  computed: {
    ...mapState([
      'loading',
      'follow'
    ]),
  },
  methods: {
    ...mapMutations([
      'setFollowed',
      'removeFollowed',
      'getFeedFollowed',
      'setFeedFollowed',
      'setLoading',
    ]),
    _getList() {
      apiDefaultAuthor().then(res => {
        this.newList = res.itemList.filter(item => {
          return item.type != "blankCard"
        })
        this.newList.pop()
        this._getNewList()
        this.lastList = this.lastList.concat(this.newList)
        this.nextPageUrl = res.nextPageUrl
      })
    },
    _getAuthor(start, count) {
      apiAuthor(start, count).then(res => {
        this.newList = res.itemList.filter(item => {
          return item.type != "blankCard"
        })
        this._getNewList()
        this.lastList = this.lastList.concat(this.newList)
        this.nextPageUrl = res.nextPageUrl
        if (this.nextPageUrl) {
          this.isLoadMore = true
        }
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
      arr.forEach(el => {
        if (el.follow) {
          this.getFeedFollowed(el.follow)
        } else {
          this.getFeedFollowed({})
        }
      })
    },
    _info(index) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.show = index
      }, 20)
    },
    _out() {
      this.show = null
      this.intro = []
      clearTimeout(this.timer)
    },
    _stay(id, index) {
      apiAuthorDetail(id).then(res => {
        this.intro = res
      })
    },
    _currentChange() {
      if (this.isLoadMore) {
        this.newList = []
        this.n++
        this.start = this.n * this.count
        this.isLoadMore = false
      }
    },
    _inntFollow() {
      setTimeout(() => {
        if (this.follow.length) {
          this.follow.forEach(el => {
            this.setFeedFollowed({ 'itemId': el.itemId, 'followed': !el.followed })
          })
        }
      }, 200)
    },
    _setFollows(id, boo, name) {
      this.setFeedFollowed({ 'itemId': id, 'followed': boo })
      if (!boo) {
        this.setFollowed({ 'itemId': id, 'followed': !boo, 'name': name })
      } else {
        this.removeFollowed(id)
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
    this._inntFollow()
  },
}
</script>

<style scoped>
.conWrapper {
  top: 0;
  height: 720px;
}

.conWrapper>div {
  width: 990px;
  overflow-x: auto;
}

.conWrapper>div::-webkit-scrollbar {
  background-color: #3a3c40;
}

.author:hover {
  transition: ease-out .2s;
  transform: scale3d(1.02, 1.02, 1.05)
}

.author {
  position: relative;
  float: left;
  margin: 20px 0 0 20px;
  width: 305px;
  height: 120px;
  background: #fff;
  border-radius: 4px;
}

.title {
  float: left;
  height: 30px;
  width: 955px;
  padding: 20px;
  color: #fff;
}

.el-icon-my-like {
  position: absolute;
  top: 5px;
  right: 5px;
  color: #FF920B;
}

.icon {
  float: left;
  width: 80px;
  height: 80px;
  margin: 20px 10px 20px 20px;
  border-radius: 50%;
}

.text {
  float: left;
  width: 180px;
}

.name,
.txt {
  font-size: 14px;
  line-height: 30px;
  width: 100%;
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
  width: 315px;
  height: 130px;
  background: #fff;
  border-radius: 5px;
}

.el-fade-in-leave-active,
.el-fade-in-enter-active {
  transition: .2s;
}

.intro {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 5px;
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
  width: 305px;
}

.focusOn {
  font-size: 14px;
  color: #FF920B;
  ;
}

.tabList {
  font-size: 14px;
  line-height: 20px;
  margin: 0 15px;
}

.tabList {
  display: inline-block;
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