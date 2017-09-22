<template>
  <div class="overFlowAuto" v-loading="!lastList.length">
    <card :datas="lastList"></card>
    <load-more v-show="newList.length" @currentChange="_currentChange"></load-more>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { apiHot, apiCategory, apiAuthor } from '@/assets/api/getDatas'
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
      lastList: [],
      newList: [],
      start: 1,
      count: 15,
      n: 0
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
        this.newList = !res.nextPageUrl ? [] : " "
      })
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
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
.title {
  text-align: center;
}
</style>
