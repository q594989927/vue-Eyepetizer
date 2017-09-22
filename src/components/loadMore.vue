<template>
  <transition name="el-zoom-in-bottom">
    <div @click="_currentChange" class="loadMore transition-box">加载更多</div>
  </transition>
</template>

<script>
export default {
  name: 'loadMore',
  methods: {
    _currentChange() {
      this.$emit('currentChange')
    }
  }
}
</script>

<style scoped>
.loadMore {
  margin: 20px auto;
  width: 400px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  color: #b7b7b7;
  background: #f3f3f3;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>
