<template>
  <div id="app">
    <el-col :span="3">
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
          <i class="el-icon-more"></i>关注</el-menu-item>
      </el-menu>
    </el-col>
    <player></player>
    <keep-alive>
      <router-view class="container"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import player from './components/player'
export default {
  name: 'app',
  data() {
    return {
      activeIndex: '/selected'
    }
  },
  components: {
    player
  }
}
</script>

<style>
h1,
h2,
h3,
h4,
p {
  margin: 0
}

a {
  text-decoration: none;
}

#app .menu {
  height: 800px;
}

.el-submenu .el-menu-item {
  min-width: 0;
}

#app .container {
  height: 800px;
  width: 860px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
  float: left;
}
</style>
