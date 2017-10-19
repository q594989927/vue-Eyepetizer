<template>
<div class="wrap">
  <div class="clearfix">
    <el-card class="card" :body-style="{ padding: '0px'}" v-for="(item,index) in collect" :key="index">
      <div class="video" @click='_play(item.src)'
         @mouseenter="_mouseEnter(item,index)" 
         @mouseleave="_mouseOut">
        <video v-if="index===num" class="video" autoplay muted="muted" :src="src"></video>
        <img v-else-if="item" class="image" v-lazy='item.cover'>
        <div class="desc">
           	<p> 收藏于：</p><span>{{item.time}}</span>
        </div>
      </div>
    </el-card>
  </div>
</div>
</template>

<script>
import { add2Zero, timeDiff } from "@/assets/js/calc";
import { mapState, mapMutations } from "vuex";
export default {
  name: "collect",
  data() {
    return {
      show: null,
      num: null,
      src: "",
      timer: null
    };
  },
  computed: {
    ...mapState(["closed", "collect"])
  },
  methods: {
    ...mapMutations(["setVideoInfo", "setTap", "setVideoSrc"]),
    _play(src) {
      this.setVideoSrc(src);
      this.setTap(true);
      clearTimeout(this.timer);
    },
    _mouseEnter(item, index) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.num = index;
        this.src = item.src;
      }, 1000);
    },
    _mouseOut() {
      clearTimeout(this.timer);
      this.num = null;
    },
    _enter(index) {
      this.show = index;
    },
    _out() {
      this.show = null;
    }
  }
};
</script>

<style scoped>
.card:hover {
  transition: ease-out 0.2s;
  transform: scale3d(1.05, 1.05, 1.05)translateY(-5px);
}

.card {
  position: relative;
  width: 175px;
  height: 155px;
  margin: 20px 0 20px 20px;
  float: left;
}

.video {
  width: 175px;
  height: 100px;
}

.image {
  width: 100%;
  height: 100px;
}

.icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: top;
}

.desc {
  overflow: hidden;
  line-height: 16px;
  font-size: 12px;
  padding-left: 5px;
}
.desc > p {
  margin: 5px 0;
}
</style>
