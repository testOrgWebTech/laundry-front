<template>
  <div class="bar">
    <div class="header_top">
      <h1 class="title">Laundry</h1>
    </div>

    <el-menu class="el-menu-vertical-demo" :popper-append-to-body="false">
      <el-menu-item
        index="1"
        @click="changeRounter('admin-order-list')"
        v-if="user.role == 'owner'"
      >
        <i class="el-icon-document" style="color: black"></i>
        <span slot="title">รายการซักผ้าที่กำลังดำเนินการ</span>
      </el-menu-item>

      <el-menu-item
        index="2"
        @click="changeRounter('order-history')"
        v-if="user.role == 'owner'"
      >
        <i class="el-icon-document" style="color: black"></i>
        <span slot="title">ประวัติรายการซักผ้า</span>
      </el-menu-item>

      <el-menu-item
        index="3"
        @click="changeRounter('customer-list')"
        v-if="user.role == 'owner'"
      >
        <i class="el-icon-document" style="color: black"></i>
        <span slot="title">รายชื่อลูกค้า</span>
      </el-menu-item>

      <el-menu-item
        index="4"
        @click="changeRounter('create-order')"
        v-if="user.role == 'customer'"
      >
        <i class="el-icon-document" style="color: black"></i>
        <span slot="title">สร้างรายการซักผ้า</span>
      </el-menu-item>

      <el-menu-item
        index="5"
        @click="changeRounter('customer-order-list')"
        v-if="user.role == 'customer'"
      >
        <i class="el-icon-document" style="color: black"></i>
        <span slot="title">ดูรายการซักผ้าทั้งหมด</span>
      </el-menu-item>

      <el-menu-item index="6" @click="logout">
        <i class="el-icon-switch-button" style="color: black"></i>
        <span slot="title">ออกจากระบบ</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import authStore from "@/store/auth.store";

export default {
  data() {
    return {
      user: JSON.parse(window.localStorage.getItem("authUser")),
    };
  },
  methods: {
    async logout() {
      await authStore.dispatch("logout");
      this.$confirm("ออกจากระบบ", "", {
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "ออกจากระบบสำเร็จ",
          });
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "ยกเลิกการออกจากระบบ",
          });
        });
    },
    changeRounter(route) {
      this.$router.push(`/${route}`);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  margin-top: 0px;
  background-color: #ffffff;
}

.icon {
  margin-left: 25px;
  margin-top: 30px;
  width: 50px;
}
.el-menu-item {
  display: block;
}
.bar {
  display: inline-block;
  z-index: 1;
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  background: #ffffff;
  width: 20%;
  height: 100%;
}
.title {
  top: 15px;
  left: 30px;
  font-size: 30px;
  border-color: 1px 1px black;
}
.header_top {
  margin-top: 10%;
  margin-left: 10%;
  margin-bottom: 10%;
}
.account_drop {
  background-color: rgb(183, 218, 218);
}
</style>