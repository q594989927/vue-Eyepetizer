<template>
  <div>
    <topBar :placeholder="input" @search='_search'></topBar>
    <div v-loading='loading' class="loading">
      <div class="clearfix" v-for="(item,index) in collection" :key="index">
        <card :datas="item.itemList" :id="item.header.id" :titles="item.header.title"></card>
      </div>
      <card :datas='lastList'></card>
      <load-more v-show="newList.length" @currentChange="_currentChange"></load-more>
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
      count: 9,
      n: 0,
      id: null,
      collection: [],
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
        this.setLoading(true)
        this.newList = res.itemList.filter(el => {
          return el.type == 'video'
        })
        res.itemList.filter(el => {
          if (el.type == "videoCollectionWithBrief") {
            this.collection.push(el.data)
          }
        })
        console.log(this.collection)
        this.lastList = this.lastList.concat(this.newList)
        this.newList = !res.nextPageUrl ? [] : " "
        this.setLoading(false)
      })

    },
    _search(val) {
      this.lastList = []
      console.log(this.input)
      this._getList(this.start, this.count, this.input)
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
    },
  },

  watch: {
    // start() {
    //   this._getList(this.start, this.count, this.input)
    // },
  },
}
</script>

<style scoped>
.loading {
  height: 666px;
  padding: 0;
  overflow: auto;
}

.hint {
  text-align: center;
  padding-top: 50px;
  font-size: 30px;
}
</style>
