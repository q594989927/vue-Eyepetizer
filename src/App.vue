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
h4,
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
  margin: 0 auto;
}

#app .menu {
  float: left;
  width: 125px;
  height: 720px;
}

.container {
  float: left;
  height: 720px;
  width: 995px;
  box-sizing: border-box;
  padding: 10px;
  overflow: auto;
  background-color: rgba(255, 255, 255, 1);
}

.fixedTop {
  position: fixed;
  top: 0;
  width: 840px;
  height: 50px;
  background: #fff;
  z-index: 99;
}

.el-badge__content.is-fixed {
  top: 18px;
  right: 5px;
}

.el-submenu .el-menu-item,
.el-submenu__title {
  padding: 0;
  min-width: 0;
}
</style>
