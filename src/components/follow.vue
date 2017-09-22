<template>
  <div>
    <div class="hint" v-if="!badge">-_-你没有关注任何内容,快去关注喜欢的作者吧~</div>
    <div v-loading='loading&&newList.length'>
      <el-tabs class="fixedTop" v-model="name" v-if="follow[0]" type="card" closable @tab-remove="_remove" @tab-click="_tabClick">
        <el-tab-pane :key="item.name" v-for="(item, index) in follow" :label="item.name" :name="item.itemId.toString()">
        </el-tab-pane>
      </el-tabs>
      <div class="overFlowAuto conWrapper">
        <card :datas="lastList"></card>
        <load-more v-show="newList.length" @currentChange="_currentChange"></load-more>
      </div>
    </div>
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
      start: 0,
      count: 9,
      n: 0,
      id: null,
      name: '',
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
      apiAuthorVideoList(start, count, id).then(res => {
        this.lastList = res.itemList
        this.newList = !res.nextPageUrl ? [] : " "
      })
    },
    _into(start, count, id) {
      apiAuthorVideoList(start, count, id).then(res => {
        this.newList = res.itemList
        this.lastList = this.lastList.concat(this.newList)
        this.newList = !res.nextPageUrl ? [] : " "
      })
    },
    _tabClick(tab) {
      this.lastList = []
      this.start = 0
      this.id = parseInt(tab.name)
      this._into(this.start, this.count, this.id)
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
      this._into(this.start, this.count, this.id)
    },
    badge() {
      if (!this.newList.length && this.badge) {
        this.name = this.follow[0].itemId.toString()
        this._getList(this.start, this.count, this.follow[0].itemId)
      }
    },
    follow() {
      if (this.newList.length && this.badge) {
        this._into(this.start, this.count, this.follow[0].itemId)
      } else {
        this.lastList = this.newList = []
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
.hint {
  text-align: center;
  padding-top: 50px;
  font-size: 30px;
}
</style>
