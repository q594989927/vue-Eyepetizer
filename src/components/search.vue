<template>
  <div>
    <el-input placeholder="请输入" icon="search" v-model="input" :on-icon-click="handleIconClick">
    </el-input>
    <card :datas='lastList'></card>
    <load-more v-show="newList.length" @currentChange="_currentChange"></load-more>
  </div>
</template>

<script>
import { apiSearch } from '@/assets/api/getDatas'
import { mapState, mapGetters, mapMutations } from 'vuex'
import card from './card'
import loadMore from './loadMore'
export default {
  name: 'search',
  components: {
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
      input: null,
      name: '',
    }
  },
  computed: {
  },
  methods: {
    _getList(start, count, q) {
      apiSearch(start, count, q).then(res => {
        this.newList = res.itemList
        this.lastList = this.lastList.concat(this.newList)
        this.newList = !res.nextPageUrl ? [] : " "
      })
    },
    handleIconClick() {
      this._getList(this.start, this.count, this.input)
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
    },
  },

  watch: {
    start() {
      this._getList(this.start, this.count, this.input)
    },
    input() {
      this.lastList = []
    }
  },
}
</script>

<style scoped>
.hint {
  text-align: center;
  padding-top: 50px;
  font-size: 30px;
}
</style>
