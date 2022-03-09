<template>
  <div class="container_child w">
    <div class="block">
      <div v-for="item in $store.getters.showNowSongs" :key="item.id" class="song">
          <a href="javascript:;" @click="getAudioMessage(item)">{{item.name}}<span></span></a><span><span>by.</span>{{item.artists[0].name}}</span>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="$store.getters.showSongs.length"
        :page-size="10"
        @current-change="computedSongs"
      >
      </el-pagination>
    </div>
    <div class="bg_box"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songs: []
    }
  },
  methods: {
    computedSongs (val) {
      this.$store.commit('computedNowSongs', val)
    },
    getAudioMessage (item) {
      this.$store.commit('audioMessageUpdate', item)
    }
  },
  mounted () {
    document.querySelector('.btn-prev').style.background = 'transparent'
    document.querySelector('.btn-next').style.background = 'transparent'
    document.querySelector('li').style.color = 'rgb(65, 184, 131)'
    document.querySelectorAll('li').forEach(val => {
      val.style.backgroundColor = 'transparent'
    })
  },
  updated () {
    document.querySelectorAll('li').forEach(val => {
      if (val.classList[1]) {
        val.style.color = 'rgb(65, 184, 131)'
      } else {
        val.style.color = 'rgb(53, 73, 94 )'
      }
    })
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
.container_child {
  margin-top: 100px;
  .bg_box {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    width: 100%;
    height: 100vh;
    background: url('../assets/rock-pool-background-1.jpg') no-repeat;
    background-size: 100%;
    opacity: .1;
  }
}
.song {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding: 10px;
  color: rgb(53, 73, 94);
  font-weight: 700;
  a {
    flex:1;
    display: inline-block;
    text-shadow: 4px 4px 4px rgb(158, 158, 158);
    color: rgb(53, 73, 94);
    font-size: 18px;
    font-weight: 700;
    text-decoration: none;
    span {
      display: inline-block;
      width: 200px;
    }
  }
  a:hover {
    text-decoration: underline;
  }
  span {
    font-size: 15px;
  }
}
.active {
  color: rgb(65, 184, 131)
}
</style>
