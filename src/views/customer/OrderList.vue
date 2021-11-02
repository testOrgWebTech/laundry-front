<template>
  <el-card class="box-content">
    <el-table
      :data="
        orders.filter(
          (data) =>
            (!search || data.id.toString().includes(search)) &&
            data.user_id == user.id
        )
      "
      style="width: 100%"
      v-if="orders"
      ref="filterTable"
    >
      <el-table-column label="รหัสรายการ" prop="id" width="120">
      </el-table-column>
      <el-table-column label="รหัสลูกค้า" prop="user_id" width="120">
      </el-table-column>
      <el-table-column label="ราคา" prop="price" width="80"> </el-table-column>
      <el-table-column
        label="เวลาที่อัพเดท"
        prop="updated_at"
        :formatter="dateFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="สถานะ"
        :filters="status"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 'finish' ? 'success' : 'primary'"
            disable-transitions
            >{{ status.find((x) => x.value == scope.row.status).text }}</el-tag
          >
        </template></el-table-column
      >
      <el-table-column align="right">
        <template slot-scope="scope" slot="header">
          <el-input v-model="search" placeholder="ค้นหาด้วยรหัสรายการ" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.status == 'waitPayment'"
            @click="updatePayment(scope.row)"
            >ยืนยันการชำระเงิน</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="ส่งหลักฐาน"
      :visible.sync="confirmPaymentDialog"
      :modal-append-to-body="false"
    >
      <!--<el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="onFileSelected"
        :limit="1"
        multiple
      >
        <i slot="default" class="el-icon-plus"></i>
      </el-upload>-->

      <el-form ref="form" :model="form" label-width="120px" style="margin: 2%">
        <el-form-item label="อัพโหลดสลิป">
          <el-upload
            ref="upload"
            :action="'#'"
            :auto-upload="false"
            :on-change="onFileSelected"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <el-button slot="trigger" size="small" type="primary"
              >อัพโหลดสลิป</el-button
            >
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-left: 70%; margin-top: 3%">
          <el-button type="primary" @click="onSubmit">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import orderStore from "@/store/v1/order.store";
import paymentStore from "@/store/v1/payment.store";
import axios from "axios";

export default {
  data() {
    return {
      orders: null,
      search: null,
      status: [
        { text: "รอชำระเงิน", value: "waitPayment" },
        { text: "ชำระเงินเสร็จสิ้น รอการยืนยัน", value: "paid" },
        { text: "ยืนยันรายการ รอผ้ามาส่ง", value: "waitClothes" },
        { text: "รอดำเนินการ", value: "waitQuene" },
        { text: "ดำเนินการ", value: "inProcess" },
        { text: "การซักผ้าเสร็จสิ้น", value: "washFinish" },
        { text: "อยู่ระหว่างการจัดส่ง", value: "inShipmentProcess" },
        { text: "สำเร็จ", value: "finish" },
      ],
      user: JSON.parse(window.localStorage.getItem("authUser")),
      confirmPaymentDialog: false,
      form: {},
      e_slip: null,
      selectedRow: null,
    };
  },
  methods: {
    async onSubmit() {
      const fd = new FormData();
      fd.append("image", this.e_slip, this.e_slip.name);
      const img = await axios.post(
        "http://127.0.0.1:8000/api/upload-image",
        fd
      );
      const payment = await paymentStore.dispatch("save", {
        image_id: img.data.id,
        order_id: this.selectedRow.id,
      });
      this.selectedRow.status = "paid";
      this.selectedRow.payment_id = payment.id;
      const order = await orderStore.dispatch("update", this.selectedRow);
      if (order) {
        await this.$message({
          type: "success",
          message: "สำเร็จ",
        });
        this.clearForm();
      } else {
        await this.$message({
          type: "info",
          message: "ไม่สำเร็จ กรุณาตรวจสอบหลักฐานอีกครั้ง",
        });
      }
      this.confirmPaymentDialog = false;
    },
    async loadOrderData() {
      await orderStore.dispatch("get");
      this.orders = await orderStore.getters.list;
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    updatePayment(row) {
      this.confirmPaymentDialog = true;
      this.selectedRow = row;
    },
    onFileSelected(file, fileList) {
      this.e_slip = file.raw;
      this.url = URL.createObjectURL(file.raw);
    },
    dateFormatter(row) {
      return new Date(row.updated_at).toLocaleString("th-TH");
    },
    clearForm() {
      this.$refs.upload.clearFiles();
    },
    handleExceed(files, fileList) {
      this.$message.warning("อัพโหลดได้เพียง 1 ไฟล์เท่านั้น");
    },
  },
  created() {
    this.loadOrderData();
  },
};
</script>

<style>
.table {
  position: relative;
  margin-top: 10%;
  left: 40%;
  width: 70%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>