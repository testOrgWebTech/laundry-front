<template>
  <el-card class="box-register">
    <el-form ref="form" :model="form" label-width="120px" style="margin: 2%">
      <!--user info-->
      <el-form-item label="Username">
        <el-input v-model="form.username" placeholder="username"></el-input>
      </el-form-item>
      <el-form-item> </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" placeholder="password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm">
        <el-input
          v-model="form.password"
          placeholder="confirm password"
        ></el-input>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>

      <!--user address-->
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor"></el-radio>
          <el-radio label="Venue"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

      <!--button-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$confirm("ยืนยัน", {
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "สำเร็จ",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "ยกเลิก",
          });
        });
    },
    onCancel() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style>
.box-register {
  width: 70%;
  height: 80%;
  position: fixed;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-form-item {
  width: 50%;
  display: inline-block;
}
</style>