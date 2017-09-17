<template>
  <div class="category">
    <div class="list">
      <h4 v-if="squareCardCollection.header" v-html="squareCardCollection.header.title"></h4>
      <div class="submenu" v-for="(item,index) in squareCardCollection.itemList" :key="index">
        <img :src="item.data.image">
        <p v-if="item.data.title" v-html="item.data.title"></p>
        <p v-if="item.data.text" v-html="item.data.text"></p>
      </div>
    </div>
    <div class="classify" v-for="(item,index) in videoCollection" :key="index">
      <h4 class="card" v-html="item.data.header.title"></h4>
      <el-card class="card" :body-style="{ padding: '0px'}" v-for="(el,i) in item.data.itemList" :key="i">
        <div>
          <img class="image" v-lazy='el.data.cover.detail' src="">
        </div>
        <div style="padding: 8px;">
          <p class="txt">{{el.data.title}}</p>
          <div class="bottom clearfix">
            <img v-if="el.data.author" class="icon" v-lazy='el.data.author.icon'>
            <div class="desc">
              <p v-if="el.data.author" class="author">{{el.data.author.name}}</p>
              <span class="time">
                {{_duration(el.data.duration)}}
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { add2Zero } from '@/assets/js/add2Zero'
import { getCategory } from '@/assets/api/getDatas'
export default {
  name: 'selected',
  data() {
    return {
      itemList: [],
      squareCardCollection: [],  //热门分类
      videoCollection: []
    }
  },
  methods: {
    _getList() {
      this.squareCardCollection = this.itemList[0].data
      this.videoCollection = this.itemList.filter(obj => {
        return obj.type == 'videoCollectionOfHorizontalScrollCard'
      })
    },
    _into() {

    },
    _duration(v) {
      return add2Zero(v)
    },
  },
  computed: {

  },
  created() {
    getCategory().then(res => {
      this.itemList = res.itemList
      this._getList();
    })
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

.classify>h4 {
  color: #fff;
  background: rgba(0, 0, 0, .3);
  text-align: center;
  line-height: 240px
}

.classify>h4,
.content {
  border-radius: 10px;
  overflow: hidden;
}

.content img {
  width: 100%;
  height: 145px;
}
</style>
