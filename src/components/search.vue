<template>
  <div>
    <topBar @search='_search' :total="total"></topBar>
    <div v-loading='loading' class="loading">
      <div class="clearfix" v-for="(item,index) in collection" :key="index">
        <card @go='_go' :datas="item.itemList" :id="item.header.id" :titles="item.header.title"></card>
      </div>
      <card :datas='lastList'></card>
      <div class="hint" v-if="hint">
        没有找到任何相关
        <strong>{{input}}</strong>
        的内容,试试别的关键词吧
      </div>
      <load-more v-show="nextPageUrl" @currentChange="_currentChange"></load-more>
    </div>
  </div>
</template>

<script>
import { apiSearch } from '@/assets/api/getDatas'
import { mapState, mapGetters, mapMutations } from 'vuex'
import card from './card'
import loadMore from './loadMore'
import topBar from './topBar'
export default {
  name: 'search',
  components: {
    topBar,
    card,
    loadMore
  },
  data() {
    return {
      newList: [],
      lastList: [],
      start: 0,
      count: 20,
      n: 0,
      id: null,
      collection: [],
      nextPageUrl: null,
      hint: false,
      total: 0,
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      input: state => state.input
    })
  },
  methods: {
    ...mapMutations([
      'setLoading'
    ]),
    _getList(start, count, q) {
      apiSearch(start, count, q).then(res => {
        console.log(res)
        this.newList = res.itemList.filter(el => {
          return el.type == 'video'
        })
        res.itemList.filter(el => {
          if (el.type == "videoCollectionWithBrief") {
            this.collection.push(el.data)
          }
        })
        this.lastList = this.lastList.concat(this.newList)
        this.nextPageUrl = res.nextPageUrl
        this.setLoading(false)
        this.total = res.total
        setTimeout(() => {
          if (this.nextPageUrl == null) {
            this.hint = true
          }
        }, 500)
      })

    },
    _search(val) {
      this.lastList = []
      this.setLoading(true)
      console.log("_search", val)
      this._getList(this.start, this.count, val)
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
    },
    _go(id) {
      console.log(id)
      // this.id = id
      // this._into(this.start, this.count, this.id)
    }
  },

  watch: {
    start() {
      this._getList(this.start, this.count, this.input)
    },
  },
}
</script>

<style scoped>
.loading {
  height: 666px;
  padding: 0;
  overflow: auto;
}
</style>
