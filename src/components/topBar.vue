<template>
  <div class="topBar">
    <div class="searchBar">
      <input v-model="val" :value="val" :placeholder="input" type="text">
      <span class="search" @click="_go">搜索</span>
    </div>
    <p v-if="total" class="total clearfix">找到关于
      <span class="ellipsis">
        "{{input}}"
      </span>
      <strong>
        {{total}}
      </strong>条数据
    </p>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'topBar',
  props: {
    total: {
      type: Number
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
      'setInput',
    ]),
    _go() {
      if (this.val !== '' && this.val.trim() !== '') {
        console.log("go", this.val)
        this.$router.push('/search')
        this.setInput(this.val)
        this.$emit('search', this.val)
      }
    },
  },
  created() {
    this.val = this.input
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

.search:hover {
  color: #FF920B;
}

.total {
  position: absolute;
  left: 710px;
  top: 18px;
  font-size: 14px;
  color: #e4e4e4;
}

.total>span {
  display: inline-block;
  vertical-align: top;
  max-width: 50px;
}

.total>strong {
  display: inline-block;
  color: #FF920B;
}
</style>
