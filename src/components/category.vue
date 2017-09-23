<template>
  <div v-loading="!lastList.length">
    <el-tabs class="fixedTop" type="card" v-model="idstr" @tab-click="_changeId">
      <el-tab-pane v-for="(item,index) in categoryNav" :key="index" :name="categoryNav[index].id.toString()" :label="item.name">
      </el-tab-pane>
    </el-tabs>
    <div class="conWrapper clearfix">
      <card :datas="detailCategory"></card>
      <div v-show="id==0" class="clearfix" v-for="(item,index) in lastList" :key="index">
        <card @go='_go' :datas="item.data.itemList" :id="item.data.header.id" :titles="item.data.header.title"></card>
      </div>
      <load-more v-show="nextPageUrl" @currentChange="_currentChange"></load-more>
    </div>
  </div>
</template>

<script>
import { add2Zero } from '@/assets/js/calc'
import { apiCategories, apiCategory, apiDetailCategory } from '@/assets/api/getDatas'
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
      categoryNav: [{ id: 0, name: "最新" }],  //分类
      lastList: [],
      newList: [],
      detailCategory: [],
      start: 0,
      count: 20,
      id: 0,
      n: 0,
      idstr: '',
      nextPageUrl: null
    }
  },
  methods: {
    _getList(start, count) {
      apiCategory(start, count).then(res => {
        this.nextPageUrl = res.nextPageUrl
        this.newList = []
        this.newList = res.itemList
        this.lastList = this.lastList.concat(this.newList)
      })
    },
    _getNavsId() {
      apiCategories().then(res => {
        res.forEach(el => {
          this.categoryNav.push(el)
        })
      })
    },
    _into(start, count, id) {
      apiDetailCategory(start, count, id).then(res => {
        this.nextPageUrl = res.nextPageUrl
        this.newList = res.itemList.filter(el => {
          return el.type == "video"
        })
        this.detailCategory = this.detailCategory.concat(this.newList)
      })
    },
    _changeId(tab) {
      this.start = 0
      this.id = tab.name
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
      if (this.id != 0) {
        this._into(this.start, this.count, this.id)
      } else {
        this._getList(this.start, this.count)
      }
    },
    _duration(v) {
      return add2Zero(v)
    },
    _go(id) {
      this.idstr = id.toString()
      this.id = id
    }
  },
  watch: {
    id: function() {
      if (this.id != 0) {
        this._into(this.start, this.count, this.id)
      } else {
        this._getList(this.start, this.count)
      }
      this.detailCategory = []
    },
  },
  created() {
    this._getList(this.start, this.count)
    this._getNavsId()
  }

}
</script>

<style scoped>

</style>
