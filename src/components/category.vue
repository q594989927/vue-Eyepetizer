<template>
  <div class="category" v-loading="!lastList.length">
    <div class="list">
      <el-tabs type="card" @tab-click="_changeId">
        <el-tab-pane v-for="(item,index) in categoryNav" :key="index" :name="ids[index]" :label="item.title">
          <card :datas="detailCategory"></card>
          <div v-show="id==0" class="classify" v-for="(item,index) in lastList" :key="index">
            <card :datas="item.data.itemList" :titles="item.data.header.title" :subTitle="item.data.header.subTitle"></card>
          </div>
          <load-more v-show="newList.length" @currentChange="_currentChange"></load-more>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { add2Zero } from '@/assets/js/add2Zero'
import { getCategory, getDetailCategory } from '@/assets/api/getDatas'
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
      categoryNav: [{ title: "热门" }],  //热门分类
      ids: ['0'],
      lastList: [],
      newList: [],
      detailCategory: [],
      start: 0,
      count: 21,
      id: 0,
      n: 0,
    }
  },
  methods: {
    _getList(start, count) {
      getCategory(start, count).then(res => {
        this.lastList = res.itemList
        res.itemList.forEach(obj => {
          this.categoryNav.push(obj.data.header)
          this.ids.push((obj.data.header.id).toString())
        })
      })
    },
    _into(start, count, id) {
      id = parseInt(id)
      getDetailCategory(start, count, id).then(res => {
        this.newList = res.itemList
        this.detailCategory = this.detailCategory.concat(this.newList)
      })
    },
    _changeId(tab, even) {
      this.detailCategory = []
      this.newList = []
      this.start = 0
      this.id = tab.name
      if (this.id != 0) {
        this._into(this.start, this.count, this.id)
      }
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
    },
    _duration(v) {
      return add2Zero(v)
    },
  },
  watch: {
    start: function() {
      if (this.id != 0) {
        this._into(this.start, this.count, this.id)
      }
    },
  },
  created() {
    this._getList(this.start, this.count)
  }

}
</script>

<style scoped>
.list {
  margin: 10px 0;
  overflow: hidden;
}

.list>h4 {
  margin: 10px 0;
}

.classify {
  overflow: hidden;
}

.content img {
  width: 100%;
  height: 145px;
}
</style>
