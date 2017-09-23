<template>
  <div v-loading="!lastList.length">
    <el-tabs class="fixedTop" type="card" v-model="idstr" @tab-click="_changeId">
      <el-tab-pane v-for="(item,index) in categoryNav" :key="index" :name="ids[index].toString()" :label="item.title">
      </el-tab-pane>
    </el-tabs>
    <div class="conWrapper clearfix">
      <card :datas="detailCategory"></card>
      <div v-show="id==0" class="clearfix" v-for="(item,index) in lastList" :key="index">
        <card @go='_go' :datas="item.data.itemList" :id="item.data.header.id" :titles="item.data.header.title"></card>
      </div>
      <load-more v-show="newList.length" @currentChange="_currentChange"></load-more>
    </div>
  </div>
</template>

<script>
import { add2Zero } from '@/assets/js/calc'
import { apiCategory, apiDetailCategory } from '@/assets/api/getDatas'
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
      categoryNav: [{ title: "最新" }],  //分类
      ids: ['0'],
      lastList: [],
      newList: [],
      detailCategory: [],
      start: 0,
      count: 10,
      id: 0,
      n: 0,
      idstr: ''
    }
  },
  methods: {
    _getList(start, count) {
      apiCategory(start, count).then(res => {
        this.newList = []
        this.newList = res.itemList
        this.lastList = this.lastList.concat(this.newList)
      })
    },
    _getNavsId() {
      apiCategory(this.start, 21).then(res => {
        res.itemList.forEach(obj => {
          this.categoryNav.push(obj.data.header)
          this.ids.push((obj.data.header.id))
        })
      })
    },
    _into(start, count, id) {
      apiDetailCategory(start, count, id).then(res => {
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
      this._into(this.start, this.count, this.id)
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
