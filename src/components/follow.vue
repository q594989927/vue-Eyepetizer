<template>
  <div v-loading='loading' class="">
    <div v-if="!badge">-_-你没有关注任何内容,快去关注喜欢的作者吧~</div>
    <el-tabs v-model="name" v-if="follow[0]" type="card" closable @tab-remove="_remove">
      <el-tab-pane :key="item.name" v-for="(item, index) in follow" :label="item.name" :name="item.itemId.toString()">
      </el-tab-pane>
    </el-tabs>
    <card :datas="lastList"></card>
    <load-more v-show="newList.length" @currentChange="_currentChange"></load-more>
  </div>
</template>

<script>
import { apiFollow, apiAuthorVideoList } from '@/assets/api/getDatas'
import { mapState, mapGetters, mapMutations } from 'vuex'
import card from './card'
import loadMore from './loadMore'
export default {
  name: 'selected',
  components: {
    card,
    loadMore
  },
  data() {
    return {
      newList: [],
      lastList: [],
      followed: {},
      start: 0,
      count: 9,
      n: 0,
      nextPageUrl: null,
      name: null
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      follow: state => state.follow,
    }),
    ...mapGetters([
      'badge'
    ])
  },
  methods: {
    ...mapMutations([
      'setFeedFollowed',
      'removeFollowed',
      'setLoading'
    ]),
    _getList(start, count, id) {
      this.setLoading(true)
      apiAuthorVideoList(start, count, id).then(res => {
        this.lastList = res.itemList
        this.setLoading(false)
      })
    },
    _into(start, count, id) {
      apiAuthorVideoList(start, count, id).then(res => {
        this.newList = res.itemList
        this.lastList = this.lastList.concat(this.newList)
        this.nextPageUrl = res.nextPageUrl
        if (!this.nextPageUrl) {
          this.newList = []
        }
      })
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
    },
    _remove(targetName) {
      this.setFeedFollowed({ 'itemId': targetName, "followed": !false })
      this.removeFollowed(targetName)
    },
  },

  watch: {
    start() {
      this._into(this.start, this.count, this.follow[0].itemId)
    },
    badge() {
      if (!this.newList.length && this.badge) {
        this._getList(this.start, this.count, this.follow[0].itemId)
      }

    },
    follow() {
      if (this.badge) {
        this.name = this.follow[0].itemId.toString()
        this._getList(this.start, this.count, this.follow[0].itemId)
      } else {
        this.lastList = []
      }
    },
  },
  created() {
    if (this.follow[0]) {
      this._getList(this.start, this.count, this.follow[0].itemId)
    }
  }

}
</script>

<style scoped>

</style>
