<template>
  <div id="app">
    <el-menu :router="true" :default-active="activeIndex" class="menu el-menu-vertical-demo">
      <el-menu-item index="/selected">
        <i class="el-icon-star-off"></i>首页</el-menu-item>
      <el-submenu index="/discovery">
        <template slot="title">
          <i class="el-icon-menu"></i>发现</template>
        <el-menu-item-group>
          <el-menu-item index="/hot">热门</el-menu-item>
          <el-menu-item index="/category">分类</el-menu-item>
          <el-menu-item index="/author">作者</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/follow">
        <el-badge :value="badge" :max="99" class="item">
          <i class="el-icon-more"></i>
          关注
        </el-badge>
      </el-menu-item>
      <el-menu-item index="/search">
        <i class="el-icon-search"></i>搜索</el-menu-item>
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
body {
  user-select: none;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

h1,
h2,
h3,
h4,
p {
  margin: 0
}

a {
  text-decoration: none;
  color: #000;
}

#app {
  width: 980px;
  height: 810px;
  overflow: hidden;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

#app .menu {
  float: left;
  width: 120px;
  height: 810px;
}

#app .container {
  float: left;
  height: 810px;
  width: 860px;
  box-sizing: border-box;
  padding: 10px;
  overflow: auto;
  background-color: rgba(255, 255, 255, 1);
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.el-badge__content.is-fixed {
  top: 18px;
  right: 5px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.el-submenu .el-menu-item,
.el-submenu__title {
  padding: 0;
  min-width: 0;
}
</style>
