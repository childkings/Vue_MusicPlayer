<template>
  <div class="container">
    <div class="ball1"></div>
    <div class="ball2"></div>
    <div class="ball3"></div>
    <div class="ball4"></div>
    <div class="login" ref="loginBox">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  mounted () {
    window.addEventListener('mousemove', (e) => {
      console.log(window)
      this.$refs.loginBox.style.transform = 'translate(-50%,-50%) translateZ(20px) rotateX(' + e.layerY / 400 + 'deg) rotateY(' + e.layerX / 400 + 'deg)'
    })
  }
}
</script>

<style lang="less" scoped>
@keyframes ball_top {
  to {
    top: 150px
  }
}
@keyframes ball_bottom {
  to {
    bottom: 150px
  }
}
.container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: rgb(246, 246, 246);
  perspective: 400px;
  transform-style: preserve-3d;
  div[class^="ball"] {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: rgb(92, 204, 201);
    border-radius: 50%;
    opacity: 20%;
  }
  div[class^="ball"]:nth-child(1) {
    top: 200px;
    left: 40px;
    animation: ball_top 2s linear infinite alternate;
  }
  div[class^="ball"]:nth-child(2) {
    width: 150px;
    height: 150px;
    bottom: 200px;
    left: 300px;
    animation: ball_bottom 2s linear infinite alternate;
  }
  div[class^="ball"]:nth-child(3) {
    width: 150px;
    height: 150px;
    top: 200px;
    right: 40px;
    animation: ball_top 2s linear infinite alternate;
  }
  div[class^="ball"]:nth-child(4) {
    width: 150px;
    height: 150px;
    bottom: 200px;
    right: 80px;
    animation: ball_bottom 2s linear infinite alternate alternate;
  }
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 350px;
    height: 450px;
    border-radius: 8px;
    background: white url(../assets/newbg1.589fd28d.png) no-repeat bottom;
    background-size: contain;
    box-shadow: 2px 2px 8px 1px rgb(179, 179, 179);
    transform: translate(-50%,-50%) translateZ(20px) rotateX(0deg);
  }
}
</style>
