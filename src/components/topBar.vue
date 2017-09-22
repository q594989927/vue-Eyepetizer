<template>
  <div class="topBar">
    <div class="searchBar">
      <input v-model="val" :placeholder="val" type="text" @change="_search">
      <router-link v-if="isRouter" class="search" to="/search">搜索</router-link>
      <span v-else @click="_search()" class="search">搜索</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'topBar',
  props: {
    isRouter: {
      type: Boolean
    }
  },
  data() {
    return {
      val: '',
    }
  },
  computed: {
    ...mapState({
      input: state => state.input
    })
  },
  methods: {
    ...mapMutations([
      'setInput'
    ]),
    _search() {
      if (this.val !== '' && this.val.trim() !== '') {
        this.setInput(this.val)
        this.$emit('search')
      }
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
