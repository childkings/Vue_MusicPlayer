<template>
  <div class="container_child">
    <div class="child_one">
      <div class="banner_external">
        <div class="banner_below" :style="{backgroundImage: `url(${bannerBgc})`}"></div>
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
    <div class="child_two">
      <div class="hot">
        <h4>热门榜单</h4>
        <h5>HOT</h5>
        <div v-for="(item,index) in rankListHot" :key="item.id" @click="rankListAudio(item.searchWord)">
          <a href="javascript:;"><span>{{index+1+'、'}}</span>{{item.searchWord}}</a>
        </div>
      </div>
      <div class="singer">
        <h4>歌手榜单</h4>
        <div v-for="(item,index) in rankListSinger" :key="item.id" @click="singerSearch(item.name)">
          <a href="javascript:;"><span>{{index+1+'、'}}</span>{{item.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from './eventBus.js'
export default {
  data () {
    return {
      banners: [],
      bannerBgc: null,
      rankListHot: [],
      rankListSinger: []
    }
  },
  methods: {
    getItemNow () {
      this.$nextTick(() => {
        this.bannerBgc = this.banners[document.querySelector('.is-active').getAttribute('data-index')].imageUrl
      })
    },
    async rankListAudio (item) {
      const { data: res } = await this.$http(`/search?keywords= ${item}`)
      this.$store.commit('audioMessageUpdate', res.result.songs[0])
    },
    singerSearch (item) {
      Bus.$emit('getSingerList', item)
    }
  },
  async created () {
    const { data: res } = await this.$http('/banner')
    this.banners = res.banners
    this.bannerBgc = res.banners[0].imageUrl
    const { data: rel } = await this.$http('/search/hot/detail')
    for (let i = 0; i < 10; i++) {
      this.rankListHot.push(rel.data[i])
    }
    const { data: rem } = await this.$http('/toplist/artist')
    console.log(rem)
    for (let i = 0; i < 10; i++) {
      this.rankListSinger.push(rem.list.artists[i])
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
.container_child::before,.container_child::after {
  contain: "";
  display: table;
}
.container_child::after {
  clear: both;
}
.child_one {
  position: absolute;
  left: 50%;
  width: 75%;
  height: 400px;
  transform: translateX(-50%);
  overflow: hidden;
  z-index: -1;
  border-color: rgb(65, 184, 131);
  border-style: solid;
  border-width: 0 0px 4px 0px;
  .banner_below {
    position:absolute;
    width: 100%;
    height: 400px;
    background: no-repeat 50%;
    background-size: cover;
    overflow: hidden;
    filter: blur(25px);
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
.child_two {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1080px;
  height: 470px;
  position: absolute;
  top: 460px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 20px 20px;
  border-style: solid;
  border-color: rgb(211, 211, 211);
  border-width: 0 1px 1px;
  .hot,.singer {
    position: relative;
    width: 1080px;
    h4 {
      margin-bottom: 10px;
    }
    h5 {
      position:absolute;
      top: 0;
      left: 70px;
      color: rgb(209, 41, 84);
      font-style:italic;
    }
    >div {
      margin: 10px 0;
      a {
        color: rgb(53, 73, 94);
        text-decoration: none;
      }
    }
    >div:hover {
      a {
        text-decoration: underline;
      }
    }
  }
}
</style>
