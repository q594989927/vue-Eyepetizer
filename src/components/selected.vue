<template>
  <div class="selected">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-card class="card" :body-style="{ padding: '0px' }">
      <img src="http://img.kaiyanapp.com/e3130deb762fced25d6be8807ae8c33c.jpeg?imageMogr2/quality/60/format/jpg" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time"></time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
import { getSelected } from '@/assets/api/getDatas'
export default {
  name: 'selected',
  data() {
    return {

    }
  },

  methods: {
    _getSelected() {

    },
  },
  created() {
    getSelected().then(res => {
      console.log(res)
    })
  }

}
</script>

<style scoped>
.selected {
  box-sizing: border-box;
  padding: 10px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.card {
  width: 200px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
