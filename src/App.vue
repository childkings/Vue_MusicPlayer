<template>
  <div></div>
</template>

<script>
export default {
  created () {
    this.$http.get('/search?keywords=海阔天空', {
      withCredentials: true
    }).then(val => {
      console.log(val)
    })
  }
}
</script>

<style>

</style>
