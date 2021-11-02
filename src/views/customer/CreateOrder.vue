<template>
  <el-card class="box-create-order">
    <el-form ref="form" :model="form" label-width="120px" style="margin: 2%">
      <!--order info-->
      <el-form-item label="น้ำหนักผ้า(ไม่เกิน)">
        <el-select v-model="form.weight" placeholder="เลือกน้ำหนักผ้า">
          <el-option label="13 กิโลกรัม" value="13kg"></el-option>
          <el-option label="15 กิโลกรัม" value="15kg"></el-option>
          <el-option label="17 กิโลกรัม" value="17kg"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="วันเวลามาส่งผ้า">
        <!--<el-input
          v-model="form.expected_send_time"
          placeholder="วันเวลาที่คาดว่าจะมาส่งผ้า"
        ></el-input>-->
        <el-date-picker
          v-model="form.expected_send_time"
          type="datetime"
          placeholder="วันเวลาที่คาดว่าจะมาส่งผ้า"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="ใช้บริการส่งผ้า">
        <el-switch v-model="form.shipment"></el-switch>
      </el-form-item>

      <!--button-->
      <el-form-item style="margin-left: 70%; margin-top: 3%">
        <el-button type="primary" @click="openConfirmDialog">Create</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="ข้อมูลรายการซักผ้า"
      :visible.sync="confirmDialog"
      :modal-append-to-body="false"
    >
      <el-form ref="form" :model="form" label-width="120px" style="margin: 2%">
        <el-form-item label="ค่าบริการซัก">
          <el-input :value="form.shipment? form.price - 20: form.price" disabled></el-input>
        </el-form-item>
        <el-form-item label="ค่าบริการส่งผ้า">
          <el-input :value="form.shipment? 20: '-'" disabled></el-input>
        </el-form-item>
        <el-form-item label="ค่าบริการทั้งหมด">
          <el-input :value="form.price" disabled></el-input>
        </el-form-item>
        <el-form-item label="วันเวลาที่ได้รับผ้า">
          <el-date-picker
            v-model="form.expected_finish_time"
            type="datetime"
            placeholder="วันเวลาที่คาดว่าจะมาส่งผ้า"
            disabled
          ></el-date-picker>
        </el-form-item>

        <!--button-->
        <el-form-item style="margin-left: 70%; margin-top: 3%">
          <el-button type="primary" @click="onSubmit">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import orderStore from "@/store/v1/order.store";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        weight: null,
        expected_send_time: null,
        shipment: false,
        user_id: JSON.parse(window.localStorage.getItem("authUser")).id,
      },
      confirmDialog: false,
    };
  },
  methods: {
    async onSubmit() {
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
          this.confirmDialog = false;
          this.clearForm();
        })
        .catch(async (e) => {
          console.log(e);
          await this.$message({
            type: "info",
            message: "ยกเลิก",
          });
          this.confirmDialog = false;
        });
    },
    async openConfirmDialog() {
      if (Object.values(this.form).every((x) => x !== null)) {
        const res = await axios.post(
          "http://localhost:8000/api/cal-overall",
          this.form
        );
        console.log(res.data)
        this.form = res.data;
        this.confirmDialog = true;
      } else {
        this.$alert("กรุณากรอกข้อมูลให้ครบถ้วน", {
          confirmButtonText: "OK",
        });
      }
    },
    onCancel() {},
    clearForm() {
      this.form = {
        weight: null,
        expected_send_time: null,
        shipment: false,
        user_id: JSON.parse(window.localStorage.getItem("authUser")).id,
      };
    },
  },
};
</script>

<style>
.box-create-order {
  position: relative;
  width: 80%;
  margin: auto;
  margin-top: 5%;
  min-height: 40%;
}
</style>