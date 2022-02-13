<template>
  <div class="container_child">
    <div class="logo">
        <img src="../assets/logo.png" alt="">
        <div>VUEMUCIS</div>
    </div>
    <div class="user_number_box">
      <el-input v-model.number="phone" placeholder="输入网易云音乐手机号" prefix-icon="el-icon-mobile-phone" @focus="focusUserNumberBox($event)" @blur="blurTips"></el-input>
    </div>
    <div class="user_number_err">
      <span v-if="testPhone">手机号码不符合规范</span>
      <span v-if="!phone && phoneNew">手机号码不能为空</span>
    </div>
    <div class="login_test_box">
      <el-input v-model.number="verification" type="text" placeholder="验证码" prefix-icon="el-icon-s-order" maxlength="4" @focus="focusBorderColor($event)" @blur="blurTipsTwo"></el-input>
      <el-button size="mini" @click="getTest" v-if="verificationTrigger">获取验证码</el-button>
      <el-button size="mini" :disabled="true" v-else class="disabled_button">{{'倒计时'+countDown}}</el-button>
    </div>
    <div class="login_test_err">
      <span v-if="testVrification">验证码错误</span>
      <span v-if="!verification && verificationNew">验证码不能为空</span>
    </div>
    <el-button @click="login">登录</el-button>
    <div class="other">
      <router-link to="mode2">邮箱登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone: 'test',
      phoneNew: false,
      verification: 'test',
      verificationNew: false,
      verificationTrigger: true,
      testPhone: false,
      testVrification: false,
      countDown: 60
    }
  },
  methods: {
    focusBorderColor (e) {
      e.target.style.borderColor = 'rgb(207, 210, 216)'
      this.testVrification = false
    },
    focusUserNumberBox (e) {
      e.target.style.borderColor = 'rgb(207, 210, 216)'
      this.phoneNew = false
      this.testPhone = false
    },
    token () {
      window.localStorage.setItem('token', true)
    },
    async getTest () {
      this.testPhone = false
      this.phoneNew = true
      if (this.phone) {
        const { data: res } = await this.$http.get('/captcha/sent?phone=' + this.phone)
        console.log(res)
        if (res.code === 400) {
          this.testPhone = true
        } else if (res.code === 200) {
          this.verificationTrigger = false
          const tempInterval = window.setInterval(() => {
            this.countDown--
            if (this.countDown === 0) {
              this.verificationTrigger = true
              this.countDown = 60
              clearInterval(tempInterval)
            }
          }, 1000)
        } else {
          this.testPhone = false
        }
      }
    },
    blurTips () {
      this.phoneNew = true
    },
    blurTipsTwo () {
      this.verificationNew = false
    },
    async login () {
      this.vertficationNew = false
      if (!this.phone) {
        this.phoneNew = true
        return
      }
      if (!this.verification) {
        this.verificationNew = true
        return
      }
      if (this.phone === 'test' && this.verification === 'test') {
        this.token()
        this.$router.push('/home')
        return
      }
      const { data: res } = await this.$http.get('/captcha/verify?phone=' + this.phone + '&captcha=' + this.verification).then(val => val).catch(err => {
        return err.response
      })
      if (res.message === '验证码错误') {
        this.testVrification = true
      }
      if (res.data) {
        this.token()
        this.$router.push('/home')
      }
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
    margin-left: 5px;
    background-color:rgb(65, 184, 131);
    color: white;
  }
  .disabled_button {
    background-color: rgb(192, 192, 192)!important;
  }
  .disabled_button:hover {
    color: white!important;
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
  .login_test_err,.user_number_err {
    width: 80%;
    height: 16px;
    color: rgb(245, 108, 108);
    font-size: 10px;
    font-weight: 300;
    font-family: "PingFang SC,Arial,Microsoft YaHei,sans-serifbod";
    font-feature-settings: "trum";
    text-align: left;
  }
  .login_test_err {
    margin: -17px 0 10px 0;
  }
  .user_number_err {
    margin: -17px 0 5px 0;
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
