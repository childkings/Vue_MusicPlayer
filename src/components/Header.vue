<template>
  <div class="header">
    <div class="nav_menu w">
      <div class="logo">
        <router-link to="/home"><img src="../assets/logo.png" alt=""></router-link><router-link to="/home"><span>VUEMUCIS</span></router-link>
      </div>
      <div class="action">
        <div class="search">
        <label for="search">
          <span class="el-icon-search"></span>
        </label>
        <input type="text" id="search">
      </div>
      <div class="user">
        <div><img :src="portrait" alt=""><span>{{userName}}</span></div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: null,
      portrait: null,
      userName: null
    }
  },
  async created () {
    const { data: res } = await this.$http('/user/detail?uid=32953014')
    this.portrait = res.profile.avatarUrl
    this.userName = res.profile.nickname
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
.header {
  height: 60px;
  background-color: rgb(65, 184, 131);
}
.nav_menu {
  height: 100%;
  display: flex;
  justify-content: space-between;
  .logo {
    display: flex;
    img {
      height: 120px;
      vertical-align: top;
    }
    span {
      display: inline-block;
      height: 60px;
      font-size: 30px;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      color: rgb(53, 73, 94);
      font-weight: 700;
      line-height: 60px;
    }
  }
  .action {
    display: flex;
    align-items: center;
    .search {
      display: flex;
      justify-content: space-between;
      width: 200px;
      height: 30px;
      margin-right: 40px;
      border-radius: 15px;
      background-color: rgb(245, 245, 245);
      label {
        flex: 1;
        text-align: center;
        line-height: 30px;
      }
      input {
        height: 100%;
        border: none;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        background-color: rgb(245, 245, 245);
      }
      input:focus {
        outline: none;
      }
    }
    .user {
      width: 200px;
      height: 40px;
      div {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 100%;
          margin-right: 5px;
          border-radius: 50%;
          vertical-align: bottom;
        }
        span {
          font-size: 15px;
          color: rgb(53, 73, 94);
          font-weight: 700;
        }
      }
    }
  }
}
</style>
