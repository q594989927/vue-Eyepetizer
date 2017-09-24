<template>
  <transition-group name="el-zoom-in-bottom">
    <div key="b" v-if="IS" @click="_currentChange" class="loadMore">加载更多</div>
    <div key="b" v-else @click="_currentChange" class="loadMore hidden">
      <i class=" el-icon-loading"></i>正在加载
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'loadMore',
  props: {
    IS: {
      type: Boolean,
      default: true
    }
  },
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
  background: #252525;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.hidden {
  background: transparent;
  box-shadow: none;
  color: #FF920B;
  font-size: 16px;
}
</style>
