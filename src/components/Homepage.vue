<template>
  <div class="container_child">
    <div class="banner_external">
      <div class="banner_below" :style="{backgroundImage: `url(${bannerBgc})`}">
      </div>
      <div class="banner_box w">
        <div class="block">
          <el-carousel height="400px" trigger="click" @change="getItemNow()" :interval="5000">
            <el-carousel-item v-for="(item,index) in banners" :key="item.targetId" :data-index="index">
              <img :src="item.imageUrl" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banners: [],
      bannerBgc: null
    }
  },
  methods: {
    getItemNow () {
      this.$nextTick(() => {
        this.bannerBgc = this.banners[document.querySelector('.is-active').getAttribute('data-index')].imageUrl
      })
    }
  },
  async created () {
    const { data: res } = await this.$http('/banner')
    this.banners = res.banners
    this.bannerBgc = res.banners[0].imageUrl
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
.container_child {
  position: absolute;
  left: 50%;
  width: 75%;
  height: 400px;
  transform: translateX(-50%);
  overflow: hidden;
  z-index: -1;
  .banner_below {
    position:absolute;
    width: 100%;
    height: 400px;
    background: no-repeat 50%;
    background-size: cover;
    filter: blur(25px);
    overflow: hidden;
  }
}
.banner_box {
  .block {
    width: 1080px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.test {
  height: 500px;
  background-color: black;
}
</style>
