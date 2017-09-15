<template>
  <div id="app">
    <el-menu :default-active="activeIndex" :router="true" class="menu" mode="vertical" @select="handleSelect">
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
    <router-view class="container"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      activeIndex: '/selected'

    }
  },
  methods: {
    handleSelect(tab, event) {
    }
  }
}
</script>

<style>
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
