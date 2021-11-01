<template>
  <el-card class="box-content">
    <el-table
      :data="
        orders.filter(
          (data) =>
            (!search || data.id.includes(search)) && data.status == 'finish'
        )
      "
      style="width: 100%"
      v-if="orders"
      ref="filterTable"
    >
      <el-table-column label="รหัสรายการ" prop="id"> </el-table-column>
      <el-table-column label="รหัสลูกค้า" prop="user_id"> </el-table-column>
      <el-table-column label="ชื่อลูกค้า" prop="user.first_name">
      </el-table-column>
      <el-table-column label="เวลาที่เสร็จสิ้น" prop="finish_time">
      </el-table-column>
      <el-table-column label="ราคา" prop="price"> </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="ค้นหาด้วย ID" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import orderStore from "@/store/v1/order.store";

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
    };
  },
  methods: {
    async loadOrderData() {
      await orderStore.dispatch("get");
      this.orders = await orderStore.getters.list;
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    async updateStatus(value, row) {
      if (row.status == "waitPayment") {
        row.status = "paid";
      } else if (row.status == "paid") {
        row.status = "waitClothes";
      } else if (row.status == "waitClothes") {
        row.status = "waitQuene";
      } else if (row.status == "waitQuene") {
        row.status = "inProcess";
      } else if (row.status == "inProcess") {
        row.status = "finish";
      }
      await orderStore.dispatch("update", row);
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