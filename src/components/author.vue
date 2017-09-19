<template>
  <div class="list" v-loading="!lastList.length">
    <div>
      <div :class="{'author':!item.data.text}" v-for="(item,index)  in lastList" :key="index">
        <h3 class="title" v-if="item.data.text" v-html="item.data.text"></h3>
        <div class="clearfix" v-if="item.data.title">
          <img class="icon" v-lazy="item.data.icon">
          <div class="text">
            <p class="name" 
              @mouseenter="_info(item.data.id)" 
              @mouseleave="_out()" 
              v-html="item.data.title"
            ></p>
            <p class="txt" v-html="item.data.description"></p>
            <el-button v-if="arr.is" 
              :data-is="false" 
              :data-id="item.data.id" 
              @click="_add(data-id,data-is)"
               >已关注
            </el-button>
            <el-button 
              v-else :data-is="false" 
              :data-id="item.data.id" 
              @click="_add(data-id,data-is)">关注
            </el-button>
          </div>
          <transition v-if="!item.data.text"  name="el-zoom-in-top">
            <div v-loading=loading  v-if="item.data.id==id"  @mouseleave="_out()" class="introWrap" ref="Intro">
              <div v-if="intro.tabInfo" class="intro">
                <p v-html="intro.pgcInfo.name"></p>
                <p v-html="intro.pgcInfo.brief"></p>
                <el-button :plain="true" type="info" v-for="(el,index) in  intro.tabInfo.tabList" :key="index" v-html="el.name"></el-button>
              </div>
            </div>
          </transition>
        </div>
      </div>
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
      arr: {},
      lastList: [],
      newList: [],
      textHeader: [],
      intro: {}, //作者简介
      id: null,
      start: 0,
      count: 9,
      n: 0,
      timer: null,
      focusOn: 0,
    }
  },
  computed:{
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
        console.log(this.loading)
      this.timer = setTimeout(() => {
        this.id = v
       this._getAuthorDetail(this.id)
      }, 1000);
    },
    _out() {
      clearTimeout(this.timer)
      this.id = null
    },
    _getAuthorDetail(id) {
      getAuthorDetail(id).then(res => {
        this.intro = res
        this.setLoading(false)
      })
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
    },
    _add(v, b) {
      //this.focusOn = v
      console.log(v, b)
      this.setBadge(1)
    },
  },
  watch: {
    start: function() {
      this._getAuthor(this.start, this.count)
    },
  },
  created() {
    console.log(this.loading)
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
