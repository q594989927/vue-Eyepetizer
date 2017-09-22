<template>
  <div class="overFlowAuto" v-loading="!lastList.length">
    <div>
      <div :class="{'author':!item.text}" v-for="(item,index)  in lastList" :key="index">
        <h3 class="title" v-if="item.text" v-html="item.text"></h3>
        <div class="clearfix" @mouseenter="_info(item.id,index)" v-if="item.title">
          <i v-if="item.follow.followed" class="el-icon-my-followed"></i>
          <img class="icon" v-lazy="item.icon">
          <div class="text">
            <p class="name ellipsis" v-html="item.title"></p>
            <p class="txt ellipsis" v-html="item.description"></p>
          </div>
        </div>
        <transition v-if="!item.text" name="el-fade-in">
          <div v-loading="loading" v-if="index==show" @mouseenter="_stay(index)" @mouseleave="_out()" class="introWrap" ref="Intro">
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
    <!-- <div class="detail"><div class="coverPhoto"></div></div> -->
    <load-more v-show="newList.length" @currentChange="_currentChange"></load-more>
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
      follow: state => state.follow,
    }),
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
      })
    },
    _getAuthor(start, count) {
      apiAuthor(start, count).then(res => {
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
      arr.forEach(el => {
        if (el.follow) {
          this.getFeedFollowed(el.follow)
        } else {
          this.getFeedFollowed({})
        }
      })
    },
    _info(v, index) {
      this.setLoading(true)
      this.show = index
      this.timer = setTimeout(() => {
        this.id = v
        this._getAuthorDetail(this.id)
      }, 100)
    },
    _out() {
      this.show = null
      this.intro = []
      clearTimeout(this.timer)
    },
    _stay(index) {
      this.show = index
    },
    _getAuthorDetail(id) {
      apiAuthorDetail(id).then(res => {
        this.intro = res
        this.setLoading(false)
      })
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
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
  }
}
</script>

<style scoped>
.author:hover {
  transition: ease-out .2s;
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

.el-icon-my-followed {
  position: absolute;
  top: 5px;
  right: 5px;
  color: #f40;
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
  width: 250px;
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
  width: 250px;
}

.focusOn {
  font-size: 14px;
  color: #F40;
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