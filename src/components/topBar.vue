<template>
  <div class="topBar">
    <div class="searchBar">
      <input v-model="input" type="text">
      <span @click="_search(input)" class="search">搜索</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topBar',
  data() {
    return {
      input: null,
    }
  },
  methods: {
    _search(val) {
      this.$emit('search', val)
    },

  }
}
</script>

<style scoped>
.topBar {
  position: relative;
  height: 54px;
  background: #3a3c40;
  overflow: hidden;
}

.searchBar {
  position: relative;
  width: 400px;
  height: 34px;
  margin: 10px auto;
  overflow: hidden;
  line-height: 34px;
}

.searchBar>input {
  vertical-align: top;
  width: 300px;
  height: 34px;
  padding: 0 30px 0 20px;
  border: none;
  background: #212224;
  border-radius: 50px;
  color: #fff;
}

.search {
  position: absolute;
  right: 0;
  top: 0;
  width: 78px;
  height: 32px;
  border-radius: 50px;
  background: #494b4f;
  color: #e4e4e4;
  text-align: center;
  border: 1px solid #424242;
  cursor: pointer;
}
</style>
