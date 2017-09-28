<template>
  <div v-loading="!lastList.length">
    <nav class="nav fixedTop">
      <a :class="{active: index == active}" @click="_click(index,item.tag)" href="javascript:;" v-for="(item,index) in menu" :key="index" v-html="item.name"></a>
    </nav>
    <div class="conWrapper" v-scroll="_currentChange" ref="conWrapper">
      <card :datas="lastList" :rankListNum="true"></card>
      <load-more v-show="nextPageUrl" :IS="isLoadMore" @currentChange="_currentChange"></load-more>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { apiHot, apiRanklist } from '@/assets/api/getDatas'
import card from './card'
import loadMore from './loadMore'
export default {
  name: 'hot',
  components: {
    card,
    loadMore
  },
  data() {
    return {
      menu: [
        { name: '最新发布', tag: 'new' },
        { name: '周排行', tag: 'weekly' },
        { name: '月排行', tag: 'monthly' },
        { name: '总排行', tag: 'historical' }],
      lastList: [],
      newList: [],
      start: 1,
      count: 20,
      n: 0,
      active: 0,
      nextPageUrl: null,
      isLoadMore: true,
    }
  },
  methods: {
    ...mapMutations([
      'setVideoSrc',
      'setTap'
    ]),
    _getList(start, count) {
      apiHot(start, count).then(res => {
        this.newList = res.itemList
        this.lastList = this.lastList.concat(this.newList)
        this.nextPageUrl = res.nextPageUrl
        this.isLoadMore = this.nextPageUrl ? true : false
      })
    },
    _getRanklist(v) {
      apiRanklist(v).then(res => {
        this.lastList = res.itemList
        this.nextPageUrl = res.nextPageUrl
        this.isLoadMore = this.nextPageUrl ? true : false
      })
    },
    _click(i, v) {
      this.active = i
      if (this.active == 0) {
        this.lastList = []
        this._getList(this.start, this.count);
      } else {
        this._getRanklist(v)
      }
      this.$refs.conWrapper.scrollTop = 0
    },
    _currentChange() {
      if (this.isLoadMore) {
        this.newList = []
        this.n++
        this.start = this.n * this.count
        this.isLoadMore = false
      }

    },
  },
  watch: {
    start: function() {
      this._getList(this.start, this.count);
    },
  },
  created() {
    this._getList(this.start, this.count);
  }

}
</script>

<style scoped>
.nav {
  padding-top: 10px;

  background: #3a3c40;
}

.nav>a {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  color: #fff;
  padding-right: 20px;
}

.nav>a:hover,
.nav>a.active {
  color: #FF920B;
}
</style>
