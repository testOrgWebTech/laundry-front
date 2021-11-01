<template>
  <el-card class="box-content">
    <el-table
      :data="
        orders.filter(
          (data) =>
            (!search || data.id.includes(search)) && data.user_id == user.id
        )
      "
      style="width: 100%"
      v-if="orders"
      ref="filterTable"
    >
      <el-table-column label="รหัสรายการ" prop="id"> </el-table-column>
      <el-table-column label="รหัสลูกค้า" prop="user_id"> </el-table-column>
      <el-table-column label="ราคา" prop="price"> </el-table-column>
      <el-table-column label="เวลาที่อัพเดท" prop="updated_at">
      </el-table-column>
      <el-table-column
        prop="status"
        label="สถานะ"
        width="100"
        :filters="status"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 'finish' ? 'success' : 'primary'"
            disable-transitions
            >{{ scope.row.status }}</el-tag
          >
        </template></el-table-column
      >
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="ค้นหาด้วย ID" />
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
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="onFileSelected"
        :limit="1"
        multiple
      >
        <i slot="default" class="el-icon-plus"></i>
      </el-upload>
      <el-button type="primary" @click="onSubmit">Create</el-button>
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
        { text: "เสร็จสิ้น", value: "finish" },
      ],
      user: JSON.parse(window.localStorage.getItem("authUser")),
      confirmPaymentDialog: false,
      form: {},
      e_slip: null,
      url: null,
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