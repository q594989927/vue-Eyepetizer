<template>
  <div class="list" v-loading="!lastList.length">
    <div>
      <div :class="{'author':!item.data.text}" v-for="(item,index)  in lastList" :key="index">
        <h3 class="title" v-if="item.data.text" v-html="item.data.text"></h3>
        <div v-if="item.data.title">
          <img class="icon" v-lazy="item.data.icon" alt="">
          <div class="text clearfix">
            <p class="name" v-html="item.data.title"></p>
            <p class="txt" v-html="item.data.description"></p>
            <span class="follow">
              <span class="add">+</span>关注
            </span>
          </div>
        </div>
        <div v-if="item.data.header">
          <img class="icon" v-lazy="item.data.header.icon" alt="">
          <div class="text clearfix">
            <p class="name" v-html="item.data.header.title"></p>
            <p class="txt" v-html="item.data.header.description"></p>
            <span class="follow">
              <span class="add">+</span>关注
            </span>
          </div>
        </div>
      </div>
    </div>
    <load-more v-show="newList.length" @currentChange="_currentChange"></load-more>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getDefaultAuthor, getAuthor } from '@/assets/api/getDatas'
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

.follow {
  display: block;
  width: 50px;
  height: 24px;
  padding: 0 5px;
  line-height: 24px;
  border: 1px solid #000;
  border-radius: 5px;
}

.add {
  font-size: 16px;
  line-height: 22px;
  vertical-align: top;
}
</style>
