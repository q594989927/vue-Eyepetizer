<template>
  <div id="app">
    <el-menu :default-active="activeIndex" :router="true" class="menu" mode="vertical">
      <el-menu-item index="/selected">
        首页
      </el-menu-item>
      <el-menu-item index="/discovery">
        发现
      </el-menu-item>
      <el-menu-item index="/follow">
        关注
      </el-menu-item>
    </el-menu>
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
  float: left;
  width: 100px;
  height: 800px;
}

#app .container {
  height: 800px;
  width: 860px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12);
  float: left;
}
</style>
