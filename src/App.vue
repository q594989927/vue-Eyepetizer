<template>
  <div id="app">
    <el-menu :router="true" :default-active="activeIndex" class="menu">
      <el-menu-item index="/selected">
        <i class="el-icon-my-index"></i>首页</el-menu-item>
      <el-menu-item index="/hot">
        <i class="el-icon-my-hot"></i>热门</el-menu-item>
      <el-menu-item index="/category">
        <i class="el-icon-my-category"></i>分类</el-menu-item>
      <el-menu-item index="/author">
        <i class="el-icon-my-author"></i>作者</el-menu-item>
      <el-menu-item index="/follow">
        <el-badge :value="badge" :max="99" class="item">
          <i class="el-icon-my-follow"></i>关注</el-badge>
      </el-menu-item>
      <el-menu-item index="/search">
        <i class="el-icon-my-search"></i>搜索</el-menu-item>
    </el-menu>
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
      activeIndex: '/selected'
    }
  },
  computed: {
    ...mapGetters([
      'badge'
    ]),
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

#app {
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
}

.container {
  position: relative;
  float: left;
  height: 720px;
  width: 995px;
  overflow: hidden;
  background-color: #3a3c40;
}

.fixedTop {
  position: absolute;
  top: 0;
  width: 955px;
  padding: 0 20px;
  height: 45px;
  background: #fff;
  z-index: 99;
}

.overFlowAuto {
  overflow: auto;
}

.conWrapper {
  width: 100%;
  height: 675px;
  position: absolute;
  top: 45px;
  overflow: auto;
}

.el-loading-mask {
  background: rgba(0, 0, 0, 0.9);
}

.el-loading-spinner .path {
  stroke: #FF920B;
}

.el-menu {
  background: #252525;
  border-radius: 0;
}

.el-menu-item {
  color: #ccc;
}

.el-menu-item:hover {
  background: #252525;
  color: #FF920B;
}

.el-menu-item.is-active {
  color: #FF920B;
}

.el-badge__content {
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
}
</style>
