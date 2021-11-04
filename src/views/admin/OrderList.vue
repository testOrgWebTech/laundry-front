<template>
  <el-card class="box-content">
    <el-table
      :data="
        orders.filter(
          (data) =>
            (!search || data.id.toString().includes(search)) &&
            data.status != 'finish'
        )
      "
      style="width: 100%"
      v-if="orders"
      ref="filterTable"
    >
      <el-table-column label="รหัสรายการ" prop="id" width="110">
      </el-table-column>
      <el-table-column label="รหัสลูกค้า" prop="user_id" width="110">
      </el-table-column>
      <el-table-column label="ชื่อลูกค้า" prop="user.first_name" width="120">
      </el-table-column>
      <el-table-column label="ราคา" prop="price" width="80"> </el-table-column>
      <el-table-column
        label="เวลาที่อัพเดท"
        prop="updated_at"
        :formatter="dateFormatter"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="สถานะ"
        width="200"
        :filters="status"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 'finish' ? 'success' : 'primary'"
            disable-transitions
            v-if="status.find((x) => x.value == scope.row.status)"
            >{{ status.find((x) => x.value == scope.row.status).text }}</el-tag
          >
        </template></el-table-column
      >
      <el-table-column align="right">
        <template slot-scope="scope" slot="header">
          <el-input v-model="search" placeholder="ค้นหาด้วยรหัสรายการ" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleInfo(scope.row)"
            >ดูข้อมูล</el-button
          >
          <el-button
            size="mini"
            v-if="!['waitPayment', 'inShipmentProcess','finish'].includes(scope.row.status)"
            @click="onClickUpdate(scope.row)"
            >อัพเดทสถานะ</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="ตรวจสอบการอัพเดทสถานะ"
      :visible.sync="updateStatusDialog"
      :modal-append-to-body="false"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        style="margin: 2%"
        v-if="selectedRow && selectedRow.payment"
      >
        <el-form-item label="ค่าบริการทั้งหมด">
          <el-input disabled :value="selectedRow.price"></el-input>
        </el-form-item>
        <el-form-item label="วันเวลาที่ได้รับผ้า">
          <el-input
            disabled
            :value="dateFormatter2(selectedRow.expected_finish_time)"
          ></el-input>
        </el-form-item>
        <el-form-item label="สลิปการจ่ายเงิน">
          <img
            :src="`http://localhost:8000${selectedRow.payment.image.path}`"
            id="slip"
            class="slip_image"
            style="width: 100%"
          />
        </el-form-item>

        <!--button-->
        <el-form-item style="margin-left: 70%; margin-top: 3%">
          <el-button type="primary" @click="onSubmitCheckPayment"
            >ยอมรับ</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
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
        <el-form-item label="เวลาส่งผ้า" v-if="selectedRow.shipment && selectedRow.status == 'inShipmentProcess'">
          <el-input :value="selectedRow.updated_at" disabled></el-input>
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
      ],
      updateStatusDialog: false,
      infoDialog: false,
      selectedRow: null,
      form: {},
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
    async updateStatus(row) {
      if (row.status == "waitPayment") {
        row.status = "paid";
      } else if (row.status == "paid") {
        row.status = "waitClothes";
      } else if (row.status == "waitClothes") {
        row.status = "waitQuene";
      } else if (row.status == "waitQuene") {
        row.status = "inProcess";
      } else if (row.status == "inProcess" && !row.shipment) {
        row.status = "finish";
      } else if (row.status == "inProcess" && row.shipment) {
        row.status = "washFinish";
      } else if (row.status == "washFinish") {
        row.status = "inShipmentProcess";
      }
      await orderStore.dispatch("update", row);
    },
    async onClickUpdate(row) {
      this.selectedRow = row;
      if (row.status == "paid") {
        this.updateStatusDialog = true;
      } else {
        this.$confirm("ยืนยัน", {
          confirmButtonText: "ตกลง",
          cancelButtonText: "ยกเลิก",
          type: "warning",
        })
          .then(async () => {
            this.updateStatus(this.selectedRow);
            await this.$message({
              type: "success",
              message: "สำเร็จ",
            });
            this.clearForm();
          })
          .catch((e) => {
            console.log(e);
            this.$message({
              type: "info",
              message: "ยกเลิก",
            });
            this.clearForm();
          });
      }
    },
    onSubmitCheckPayment() {
      this.$confirm("ยืนยัน", {
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
        type: "warning",
      })
        .then(async () => {
          this.updateStatus(this.selectedRow);
          await this.$message({
            type: "success",
            message: "สำเร็จ",
          });
          this.clearForm();
        })
        .catch(async (e) => {
          console.log(e);
          await this.$message({
            type: "info",
            message: "ยกเลิก",
          });
          this.clearForm();
        });
    },
    clearForm() {
      this.updateStatusDialog = false;
      this.infoDialog = false;
      this.selectedRow = null;
    },
    dateFormatter(row) {
      return new Date(row.updated_at).toLocaleString("th-TH");
    },
    dateFormatter2(value) {
      return new Date(value).toLocaleString("th-TH");
    },
    handleInfo(row) {
      this.selectedRow = row;
      this.infoDialog = true;
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