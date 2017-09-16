<template>
  <div class="selected">

  </div>
</template>

<script>
import { getSelected } from '@/assets/api/getDatas'
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'selected',
  data() {
    return {
      itemList: [],
      newList: [],
      lastList: [],
      duration: [],
      num: -1,
      src: ''
    }
  },
  methods: {
    ...mapMutations([
      'setVideoSrc',
      'setIsTap'
    ]),
    _getList() {
      this.lastList = this.itemList.filter(obj => {
        return obj.type == 'video' && obj.tag == '1'
      })
      this.lastList.forEach(ele => {
        this.duration.push(ele.data.duration)
      });
    },
    _play(i) {
      this.setVideoSrc(i.data.playInfo[1].url)
      this.setIsTap(false)
    },
    _mouseEnter(item, index) {
      this.num = index
      this.src = item.data.playInfo[1].url
    },
    _mouseOut() {
      this.num = -1
      this.src = ''
    },
    _duration(index) {
      let m = (this.duration[index] / 60 | 0)
      m = m < 10 ? '0' + m : '' + m
      let s = this.duration[index] % 60
      s = s < 10 ? '0' + s : '' + s
      return m + "'" + s + "''"
    },
  },
  computed: {

  },
  created() {
    getSelected().then(res => {
      this.itemList = res.itemList
      this._getList();
    })
  }

}
</script>

<style scoped>

</style>
