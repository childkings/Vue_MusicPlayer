<template>
  <div>
    <component :is="header"></component>
  </div>
</template>

<script>
export default {
  data () {
    return {
      header: 'my-header'
    }
  }
}
</script>

<style lang="less" scoped>
body{
  background-color: rgb(245, 245, 245);
}
</style>
