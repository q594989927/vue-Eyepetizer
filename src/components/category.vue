<template>
  <div class="category" v-loading="!newList.length">
    <!-- <div class="list">
                    <h4 v-if="squareCardCollection.header" v-html="squareCardCollection.header.title"></h4>
                    <div class="submenu" v-for="(item,index) in squareCardCollection.itemList" :key="index">
                      <img :src="item.data.image">
                      <p v-if="item.data.title" v-html="item.data.title"></p>
                      <p v-if="item.data.text" v-html="item.data.text"></p>
                    </div>
                  </div> -->
    <div class="classify" v-for="(item,index) in lastList" :key="index">
      <card :datas="item.data.itemList" :titles="item.data.header.title" :subTitle="item.data.header.subTitle"></card>
    </div>
    <load-more v-show="newList.length" @currentChange="_currentChange"></load-more>
  </div>
</template>

<script>
import { add2Zero } from '@/assets/js/add2Zero'
import { getCategory } from '@/assets/api/getDatas'
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
      squareCardCollection: [],  //热门分类
      lastList: [],
      newList: [],
      start: 1,
      count: 15,
      n: 0
    }
  },
  methods: {
    _getList(start, count) {
      // this.squareCardCollection = this.itemList.filter(obj => {
      //   return obj.type == 'squareCardCollection'
      // })
      // this.videoCollection = this.itemList.filter(obj => {
      //   return obj.type == 'videoCollectionOfHorizontalScrollCard'
      // })
      getCategory(start, count).then(res => {
        this.newList = res.itemList
        console.log(this.newList)
        this.lastList = this.lastList.concat(this.newList)
      })
    },
    _currentChange() {
      this.newList = []
      this.n++
      this.start = this.n * this.count
    },
    _into() {

    },
    _duration(v) {
      return add2Zero(v)
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
.list {
  text-align: center;
  margin: 10px 0;
}

.list>h4 {
  margin: 10px 0;
}

.submenu {
  position: relative;
  display: inline-block;
  width: 128px;
  margin: 5px;
}

.submenu img {
  width: 100%;
  vertical-align: top;
}

.submenu p {
  width: 125px;
  height: 125px;
  line-height: 125px;
  position: absolute;
  top: 0;
  left: calc( 50% - 62.5px);
  color: #fff;
  background: rgba(0, 0, 0, .3);
}

.classify {
  overflow: hidden;
}

.content img {
  width: 100%;
  height: 145px;
}
</style>
