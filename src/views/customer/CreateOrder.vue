<template>
  <el-card class="box-content">
    <el-form ref="form" :model="form" label-width="120px" style="margin: 2%">
      <!--order info-->
      <el-form-item label="น้ำหนักผ้า">
        <el-input v-model="form.weight" placeholder="น้ำหนักผ้า"></el-input>
      </el-form-item>
      <el-form-item label="วันเวลามาส่งผ้า">
        <el-input
          v-model="form.expected_send_time"
          placeholder="วันเวลาที่คาดว่าจะมาส่งผ้า"
        ></el-input>
      </el-form-item>
      <el-form-item label="ใช้บริการส่งผ้า">
        <el-switch v-model="form.shipment"></el-switch>
      </el-form-item>

      <!--button-->
      <el-form-item style="margin-left: 30%; margin-top: 3%">
        <el-button type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import orderStore from '@/store/v1/order.store'

export default {
  data() {
    return {
      form: {
        weight: null,
        expected_send_time: null,
        shipment: null,
        user_id: JSON.parse(window.localStorage.getItem("authUser")).id,
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
            await orderStore.dispatch("save", this.form);
            await this.$message({
              type: "success",
              message: "สำเร็จ",
            });
            this.clearForm();
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

    },
    clearForm() {
      this.form = {
        weight: null,
        expected_send_time: null,
        shipment: null,
        user_id: JSON.parse(window.localStorage.getItem("authUser")).id,
      }
    }
  },
   
};
</script>

<style>
</style>