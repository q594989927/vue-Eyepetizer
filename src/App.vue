<template>
  <div id="app">
    <ul class="menu">
      <router-link tag="li" to="/index">
        <i class="el-icon-my-index"></i>首页
      </router-link>
      <router-link tag="li" to="/hot">
        <i class="el-icon-my-hot"></i>热门
      </router-link>
      <router-link tag="li" to="/category">
        <i class="el-icon-my-category"></i>分类
      </router-link>
      <router-link tag="li" to="/author">
        <i class="el-icon-my-author"></i>作者
      </router-link>
      <router-link tag="li" to="/follow">
        <el-badge :value="badge" :max="99" class="item">
          <i class="el-icon-my-follow"></i>关注</el-badge>
      </router-link>
      <router-link tag="li" to="/search">
        <i class="el-icon-my-search"></i>搜索
      </router-link>
    </ul>
    <player></player>
    <keep-alive>
      <router-view class="container"></router-view>
    </keep-alive>
  </div>
</template>


<script>
import player from './components/player'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'app',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'badge'
    ]),
    ...mapState({
      activeIndex: state => state.activeIndex
    })
  },
  components: {
    player
  }
}
</script>

<style>
[class^="el-icon-my"],
[class*=" el-icon-my"] {
  font-family: "iconfont" !important;
  font-weight: bold;
  font-size: 18px;
}

body {
  user-select: none;
  margin: 0;
}

h1,
h2,
h3,
h4 {
  font-weight: normal;
  margin: 0
}

p {
  margin: 0
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: #000;
}

input {
  padding: 0;
  margin: 0;
  outline: none;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.fixedTop {
  position: absolute;
  top: 0;
  width: 955px;
  padding: 0 20px;
  height: 45px;
  z-index: 99;
}

.hint {
  position: absolute;
  left: calc( 50% - 200px);
  top: calc( 50% - 100px);
  height: 200px;
  width: 400px;
  font-size: 16px;
  line-height: 30px;
  word-break: break-all;
  color: #fff;
}

#app {
  position: relative;
  width: 1120px;
  height: 720px;
  overflow: hidden;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 80px auto;
}

#app .menu {
  float: left;
  width: 125px;
  height: 720px;
  background: #252525;
  text-align: center;
}

.menu>li {
  padding: 20px 30px;
  color: #ccc;
  font-size: 14px;
}

.menu>li>i {
  margin-right: 5px;
  font-size: 16px;
}

.menu>li:hover {
  background: #252525;
  color: #FF920B;
}

.menu>li.router-link-active {
  color: #FF920B;
}

.container {
  position: relative;
  float: left;
  height: 720px;
  width: 995px;
  overflow: hidden;
  background-color: #3a3c40;
}


.conWrapper {
  width: 100%;
  height: 655px;
  position: absolute;
  top: 65px;
  overflow: auto;
}

.el-loading-mask {
  background: rgba(0, 0, 0, 0.9);
}

.el-loading-spinner .path {
  stroke: #FF920B;
}



.el-badge__content {
  background: #FF920B;
  border: none;
}

.el-badge__content.is-fixed {
  top: 18px;
  right: 5px;
}

.el-tabs {
  background: #3a3c40;
}

.el-tabs__header {
  border: none;
  margin: 0;
}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  border: 1px solid transparent;
  border-bottom: 1px solid #FF920B;
}

.el-tabs__item:hover,
.el-tabs__item.is-active {
  color: #FF920B;
}

.el-tabs__item,
.el-tabs__nav-next,
.el-tabs__nav-prev {
  color: #ccc;
}

.el-card {
  border: none;
  box-shadow: none;
}
</style>
