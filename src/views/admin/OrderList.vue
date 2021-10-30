<template>
  <el-card class="box-content">
    <el-table
      :data="orders.filter((data) => !search || data.id.includes(search))"
      style="width: 100%"
      v-if="orders"
      ref="filterTable"
    >
      <el-table-column label="รหัสคำสั่งซักผ้า" prop="id"> </el-table-column>
      <el-table-column label="ชื่อ" prop="first_name"> </el-table-column>
      <el-table-column label="นามสกุล" prop="last_name"> </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="ค้นหาด้วย ID" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleView(scope.$index, scope.row)"
            >ดูข้อมูล</el-button
          >
          <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)"
            >อัพเดทสถานะ</el-button
          >
        </template>
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
            :type="scope.row.status === 'Home' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.status }}</el-tag
          >
        </template></el-table-column
      >
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
    handleView(index, row) {
      console.log(this.search);
    },
    handleUpdate(index, row) {
      console.log(index, row);
    },
    async loadOrderData() {
      await orderStore.dispatch("get");
      this.orders = await orderStore.getters.list;
      console.log(this.orders);
    },
    filterStatus(value, row) {
      return row.status === value;
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