<template>
  <div class="container_child">
    <div class="logo">
        <img src="../assets/logo.png" alt="">
        <div>VueMUCIS</div>
    </div>
    <div class="user_number_box">
      <el-input v-model="email" placeholder="输入163网易邮箱" prefix-icon="el-icon-message" @focus="focusBorderColor($event)"></el-input>
    </div>
    <div class="login_test_box">
      <el-input v-model="password" type="password" placeholder="密码" prefix-icon="el-icon-lock" @focus="focusBorderColor($event)"></el-input>
    </div>
    <el-button>登录</el-button>
    <div class="other">
      <router-link to="mode1">手机号登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    focusBorderColor (e) {
      e.target.style.borderColor = 'rgb(207, 210, 216)'
    }
  }
}
</script>

<style lang="less" scoped>
.container_child {
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    height: 50px;
    margin: 50px 0;
    font-size: 10px;
    text-align: right;
    img {
      width: 100%;
    }
  }
  .el-button {
    width: 80%;
    background-color:rgb(65, 184, 131);
    color: white
  }
  .user_number_box,.login_test_box {
    display: flex;
    width: 80%;
    margin-bottom: 20px;
  }
  .login_test_box {
    width: 80%;
    justify-content: space-between;
    >div {
      width: 500px;
    }
    button {
      flex: 1;
      background-color: rgb(65, 184, 131);
    }
  }
  .other {
    width: 80%;
    text-align: right;
    a {
      font-size: 12px;
      color: rgb(53, 73, 94);
      text-decoration: none;
    }
  }
}
</style>
