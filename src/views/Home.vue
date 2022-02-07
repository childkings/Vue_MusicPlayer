<template>
  <div>
    <component :is="header"></component>
    <router-view></router-view>
    <MusicPlayer></MusicPlayer>
  </div>
</template>

<script>
import MusicPlayer from '@/components/MusicPlayer.vue'
export default {
  data () {
    return {
      header: 'my-header'
    }
  },
  components: {
    MusicPlayer
  },
  async created () {
  }
}
</script>

<style lang="less" scoped>
body{
  background-color: rgb(245, 245, 245);
}
</style>
