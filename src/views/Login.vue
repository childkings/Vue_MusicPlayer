<template>
  <div class="container">
    <div class="ball1"></div>
    <div class="ball2"></div>
    <div class="ball3"></div>
    <div class="ball4"></div>
    <div class="login" ref="loginBox">
      <router-view ref="login"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    move (e) {
      e.stopPropagation()
      this.$refs.loginBox.style.transform = 'translate(-50%,-50%) translateZ(20px) rotateX(' + -(e.pageY - this.$refs.loginBox.offsetTop) / 350 + 'deg) rotateY(' + (e.pageX - this.$refs.loginBox.offsetLeft) / 400 + 'deg)'
    },
    enter (e) {
      if (e.keyCode === 13) {
        this.$refs.login.login()
      }
    }
  },
  mounted () {
    window.addEventListener('mousemove', this.move)
    window.addEventListener('keydown', this.enter)
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.move)
    window.removeEventListener('keydown', this.enter)
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
  background: rgb(53, 73, 94);
  background-image: linear-gradient(to top, rgb(93, 213, 200 ) , rgb(65, 184, 131));
  perspective: 400px;
  transform-style: preserve-3d;
  div[class^="ball"] {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: rgb(93, 213, 200);
    border-radius: 50%;
    opacity: .2;
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
    background-image: linear-gradient(to right, rgb(93, 213, 200) , white);
  }
  div[class^="ball"]:nth-child(3) {
    width: 150px;
    height: 150px;
    top: 200px;
    right: 40px;
    animation: ball_top 2s linear infinite alternate;
    background-image: linear-gradient(to right, rgb(93, 213, 200) , white);
  }
  div[class^="ball"]:nth-child(4) {
    width: 150px;
    height: 150px;
    bottom: 200px;
    right: 80px;
    animation: ball_bottom 2s linear infinite alternate alternate;
    background-image: linear-gradient(to left, rgb(93, 213, 200) , white);
  }
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 350px;
    height: 450px;
    border-radius: 8px;
    background: white url(../assets/newbg1.589fd28d.png) no-repeat bottom;
    background-size: 100% 100px;
    box-shadow: 2px 2px 8px 1px rgb(179, 179, 179);
    transform: translate(-50%,-50%) translateZ(20px) rotateX(0deg);
  }
}
</style>
