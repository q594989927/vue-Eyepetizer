<template>
  <div class="container">
    <topBar></topBar>
    <selected key="indexlist" :newList="newList" :lastList="lastList" :titleDate1="titleDate1" :titleDate2="titleDate2"></selected>
    <div class="btn">
      <el-button v-show="!pagesCount.length" @click="_getNextList" :plain="true">
        <</el-button>
          <el-button @click="_getPrevList" :plain="true">></el-button>
    </div>
  </div>
</template>

<script>
import { apiSelected, apiPrevPage } from '@/assets/api/getDatas'
import { add2Zero, getDate } from '@/assets/js/calc'
import { mapGetters, mapState, mapMutations } from 'vuex'
import topBar from './topBar'
import selected from './selected'
export default {
  name: 'index',
  components: {
    topBar,
    selected
  },
  data() {
    return {
      newList: [],
      lastList: [],
      titleDate1: "",
      titleDate2: '',
      toDate: null,
      oneDay: 172800000,
      nextPageUrlID: null,
      pages: [],
      pagesCount: 0,
    }
  },
  computed: {
    ...mapGetters([
      'badge'
    ]),
  },
  methods: {
    ...mapMutations([
      'setVideoSrc',
      'setTap',
      'setVideoId'
    ]),
    getdatelist(res) {
      this.toDate = res.date
      this.nextPageUrlID = this.toDate - this.oneDay
      this.titleDate1 = getDate(this.toDate)
      this.newList = res.itemList.filter(obj => {
        return obj.type == 'video' && obj.tag == '0'
      })
      this.lastList = res.itemList.filter(obj => {
        return obj.type == 'video' && obj.tag == '1'
      })
      if (this.newList.length > 6 || this.lastList.length > 6) {
        this.newList = this.newList.splice(0, 6)
        this.lastList = this.lastList.splice(0, 6)
      }
      res.itemList.forEach(el => {
        if (el.type == "textHeader") {
          this.titleDate2 = el.data.text.split('-').join('').split(',')[0]
        }
      })
    },
    _getList() {
      apiSelected().then(res => {
        this.getdatelist(res)
        this.pages.push(this.toDate)
      })
    },
    _getPrevList() {
      this.active = 0
      this.lastList = []
      apiPrevPage(this.nextPageUrlID).then(res => {
        this.getdatelist(res)
        this.pages.push(this.toDate)
        this.pagesCount++
      })
    },
    _getNextList() {
      if (this.pagesCount > 0) {
        this.active = 0
        this.lastList = []
        this.pagesCount--
        apiPrevPage(this.pages[this.pagesCount]).then(res => {
          this.getdatelist(res)
        })
      } else {
        console.log("none")
      }
    },
  },
  created() {
    this._getList();
  }
}
</script>

<style scoped>
.btn {
  position: absolute;
  bottom: 0px;
  left: 10px;
  width: 995px;
  height: 50px;
  background: #3a3c40;
}

.el-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
