<template>
  <div v-loading="!newList.length">
    <card :datas="lastList"></card>
    <div v-show="lastList.length" class="loadMore" @click="_currentChange">加载更多</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getHot, getCategory, getAuthor } from '@/assets/api/getDatas'
import { add2Zero } from '@/assets/js/add2Zero'
import card from './card'
export default {
  props: {
    // start: {
    //   type: Number,
    //   default: 1
    // },
    // count: {
    //   type: Number,
    //   default: 15
    // }
  },
  name: 'hot',
  components: {
    card
  },
  data() {
    return {
      lastList: [],
      newList: [],
      num: -1,
      src: '',
      timer: null,
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
      getHot(start, count).then(res => {
        this.newList = res.itemList
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
      this._getList(this.start, this.count);
    },
  },
  created() {
    this._getList(this.start, this.count);
  }

}
</script>

<style scoped>
.list {
  width: 100%;
  overflow: hidden;
}

.title {
  text-align: center;
}

.loadMore {
  margin: 0 auto;
  width: 400px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  color: #b7b7b7;
  background: #f3f3f3;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>
