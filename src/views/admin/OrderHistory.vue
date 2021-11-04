<template>
  <el-card class="box-content">
    <el-form ref="option">
      <el-date-picker
        v-model="range"
        type="daterange"
        range-separator="ถึง"
        start-placeholder="ตั้งแต่วันที่"
        end-placeholder="วันที่"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </el-form>
    <el-table
      :data="
        orders.filter(
          (data) =>
            (!search || data.id.toString().includes(search)) &&
            data.status == 'finish' &&
            dateFilter(data.updated_at, data)
        )
      "
      style="width: 100%"
      v-if="orders"
      ref="filterTable"
      @change="calOverall"
    >
      <el-table-column label="รหัสรายการ" prop="id" width="120">
      </el-table-column>
      <el-table-column label="รหัสลูกค้า" prop="user_id" width="120">
      </el-table-column>
      <el-table-column label="ชื่อลูกค้า" prop="user.first_name" width="150">
      </el-table-column>
      <el-table-column
        label="เวลาที่เสร็จสิ้น"
        prop="updated_time"
        :formatter="dateFormatter"
      >
      </el-table-column>
      <el-table-column label="ราคา" prop="price" width="80"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope" slot="header">
          <el-input v-model="search" placeholder="ค้นหาด้วยรหัสรายการ" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleInfo(scope.row)"
            >ดูข้อมูล</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="ข้อมูลรายการ"
      :visible.sync="infoDialog"
      :modal-append-to-body="false"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        style="margin: 2%"
        v-if="selectedRow"
      >
        <el-form-item label="รหัสรายการ">
          <el-input disabled :value="selectedRow.id"></el-input>
        </el-form-item>
        <el-form-item label="รหัสลูกค้า">
          <el-input disabled :value="selectedRow.user_id"></el-input>
        </el-form-item>
        <el-form-item label="ชื่อลูกค้า">
          <el-input disabled :value="selectedRow.user.first_name"></el-input>
        </el-form-item>
        <el-form-item label="นามสกุลลูกค้า">
          <el-input disabled :value="selectedRow.user.last_name"></el-input>
        </el-form-item>
        <el-form-item label="ใช้บริการส่งผ้า">
          <el-switch :value="selectedRow.shipment ? true : false"></el-switch>
        </el-form-item>
        <el-form-item label="ราคาทั้งหมด">
          <el-input disabled :value="selectedRow.price"></el-input>
        </el-form-item>
        <el-form-item label="สถานะ">
          <el-input
            :value="status.find((x) => x.value == selectedRow.status).text"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        { text: "การซักผ้าเสร็จสิ้น", value: "washFinish" },
        { text: "อยู่ระหว่างการจัดส่ง", value: "inShipmentProcess" },
        { text: "สำเร็จ", value: "finish" },
      ],
      selectedRow: null,
      infoDialog: null,
      form: {},
      range: null,
      pickerOptions: {
        shortcuts: [
          {
            text: "Last week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last 3 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      totalPrice: null,
      totalOrder: null,
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
    dateFormatter(row) {
      return new Date(row.updated_at).toLocaleString("th-TH");
    },
    handleInfo(row) {
      this.selectedRow = row;
      this.infoDialog = true;
    },
    dateFilter(datetime) {
      if (this.range) {
        const start = new Date(this.range[0]);
        const end = new Date(this.range[1]);
        const time = new Date(datetime);
        return time >= start && time <= end;
      }
      return true;
    },
    calOverall(order) {
      //
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
.box {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  bottom: 0;
  top: 0;
}
.box-option {
  width: 80%;
  margin: auto;
  margin-top: 5%;
  min-height: 20%;
}
</style>