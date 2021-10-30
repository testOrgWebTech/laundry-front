<template>
  <div id="login">
    <el-card class="box-card2">
      <div class="right-form">
        <div id="login-form">
          <h2 class="text-1">เข้าสู่ระบบ</h2>
          <div style="margin-top: 15px">
            <span class="username">Username or Email</span>
            <el-input
              placeholder="Username"
              v-model="form.username"
              style="margin-top: 10px"
            />
          </div>
          <div style="margin-top: 20px">
            <span class="password">Password</span>
            <el-input
              placeholder="Password"
              type="password"
              v-model="form.password"
              style="margin-top: 10px"
            />
          </div>
        </div>
        <div class="loginBtn">
          <el-button type="primary" :plain="true"
            >Login</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
//import AuthUser from "@/store/AuthUser";
import address from '../store/v1/address.store'

export default {
  data() {
    return {
      users: [],
      form: {
        username: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    /*async fetchAccount() {
      //await AccountStore.dispatch("fetch");
     // this.users = Auth.getters.account;
    },
    async login() {
      let payload = {
        identifier: this.form.username,
        password: this.form.password,
      };
      let res = await AuthUser.dispatch("login", payload)
      if (res.success) {
          await this.$message({
            message: 'เข้าสู่ระบบสำเร็จ',
            type: 'success'
          });
          this.$router.push("/home")
      } else {
          this.$message.error('ชื่อผู้เข้าใช้หรือรหัสผ่านไม่ถูกต้อง');
          
          
      }
    },*/
  },
  async created() {
    await address.dispatch('get');
    const res = await address.getters.list;
    console.log(res)
  }
};
</script>

<style>
.text {
  font-size: 14px;
}
.box-card2 {
  width: 800px;
  height: 500px;
  display: inline-block;
  margin: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(../assets/stationary.jpg);
  background-size: 55% 100%;
  background-repeat: no-repeat;
  background-position-x: -20%;
}
.loginBtn {
  position: fixed;
  margin-top: 350px;
  margin-left: 485px;
  z-index: 1;
}
#login {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
#login-form {
  width: 300px;
  height: 300px;
  position: absolute;
  margin-left: 370px;
  margin-top: 140px;
}
.logo {
  position: fixed;
  width: 100px;
  height: 100px;
  margin-left: 70px;
  margin-top: 100px;
}
#welcome {
  position: fixed;
  margin-top: 300px;
}
.text-1 {
  position: fixed;
  top: 80px;
  right: 130px;
  font-size: 40px;
}
.right-form {
  margin-left: 30px;
}
/*@keyframes shake {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(3em);
  }
  40% {
    transform: translate(-3em);
  }
  60% {
    transform: translate(3em);
  }
  80% {
    transform: translate(-3em);
  }
  100% {
    transform: translate(0);
  }
}*/
</style>