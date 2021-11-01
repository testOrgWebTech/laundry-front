<template>
  <el-card class="box-register">
    <el-form ref="form" :model="form" label-width="120px" style="margin: 2%">
      <!--user info-->
      <el-card>
        <el-form-item label="ชื่อผู้ใช้">
          <el-input v-model="form.username" placeholder="ชื่อผู้ใช้"></el-input>
        </el-form-item>
        <el-form-item label="อีเมล">
          <el-input v-model="form.email" placeholder="อีเมล"></el-input>
        </el-form-item>
        <el-form-item label="รหัสผ่าน">
          <el-input
            v-model="form.password"
            placeholder="รหัสผ่าน"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="ยืนยัน">
          <el-input
            v-model="form.confirm_password"
            placeholder="ยืนยันรหัสผ่าน"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="ชื่อ">
          <el-input v-model="form.first_name" placeholder="ชื่อ"></el-input>
        </el-form-item>
        <el-form-item label="นามสกุล">
          <el-input v-model="form.last_name" placeholder="นามสกุล"></el-input>
        </el-form-item>
        <el-form-item label="เบอร์โทร">
          <el-input v-model="form.tel" placeholder="เบอร์โทร"></el-input>
        </el-form-item>
      </el-card>

      <!--user address-->
      <el-card>
        <el-form-item label="จังหวัด">
          <el-input v-model="form.province" placeholder="จังหวัด"></el-input>
        </el-form-item>
        <el-form-item label="อำเภอ">
          <el-input v-model="form.district" placeholder="อำเภอ"></el-input>
        </el-form-item>
        <el-form-item label="รหัสไปรษณีย์">
          <el-input v-model="form.postal" placeholder="รหัสไปรษณีย์"></el-input>
        </el-form-item>
        <el-form-item label="บ้านเลขที่">
          <el-input v-model="form.house_no" placeholder="บ้านเลขที่"></el-input>
        </el-form-item>
        <el-form-item label="เบอร์โทรศัพท์บ้าน">
          <el-input
            v-model="form.house_tel"
            placeholder="เบอร์โทรศัพท์บ้าน"
          ></el-input>
        </el-form-item>
      </el-card>

      <!--button-->
      <el-form-item style="margin-left: 30%; margin-top: 3%">
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import userStore from "@/store/v1/user.store";

export default {
  data() {
    return {
      form: {
        role: 'customer',
        username: null,
        password: null,
        confirm_password: null,
        email: null,
        first_name: null,
        last_name: null,
        province: null,
        district: null,
        postal: null,
        house_no: null,
        house_tel: null,
      },
    };
  },
  methods: {
    async onSubmit() {
      if (Object.values(this.form).every((x) => x !== null)) {
        this.$confirm("ยืนยัน", {
          confirmButtonText: "ตกลง",
          cancelButtonText: "ยกเลิก",
          type: "warning",
        })
          .then(async () => {
            const res = await userStore.dispatch("save", this.form);
            if (res.data == "usernameExist") {
              this.$alert("ชื่อผู้ใช้ซ้ำ", {
                confirmButtonText: "OK",
              });
            } else if (res.data == "emailExist") {
              this.$alert("อีเมลซ้ำ", {
                confirmButtonText: "OK",
              });
            } else if (this.form.password != this.form.confirm_password) {
              this.$alert("รหัสผ่านไม่ตรงกัน", {
                confirmButtonText: "OK",
              });
            } else {
              this.$message({
                type: "success",
                message: "สำเร็จ",
              });
              this.$router.push(`/`);
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "ยกเลิก",
            });
          });
      } else {
        this.$alert("กรุณากรอกข้อมูลให้ครบถ้วน", {
          confirmButtonText: "OK",
        });
      }
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
  height: 95%;
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