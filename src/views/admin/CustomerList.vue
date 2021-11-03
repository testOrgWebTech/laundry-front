<template>
  <el-card class="box-content">
    <el-table
      :data="
        customers.filter(
          (data) =>
            (!search || data.id.toString().includes(search)) &&
            data.role == 'customer'
        )
      "
      style="width: 100%"
      v-if="customers"
    >
      <template>
        <el-table-column label="รหัสลูกค้า" prop="id" width="120">
        </el-table-column>
        <el-table-column label="อีเมล" prop="email"> </el-table-column>
        <el-table-column label="ชื่อ" prop="first_name" width="150">
        </el-table-column>
        <el-table-column label="นามสกุล" prop="last_name" width="150">
        </el-table-column>
        <el-table-column label="เบอร์โทรศัพท์" prop="tel" width="120">
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope" slot="header">
            <el-input v-model="search" placeholder="ค้นหาด้วย ID" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleInfo(scope.row)"
              >ดูข้อมูล</el-button
            >
          </template>
        </el-table-column>
      </template>
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
        <el-form-item label="อีเมล">
          <el-input disabled :value="selectedRow.email"></el-input>
        </el-form-item>
        <el-form-item label="ชื่อผู้ใช้">
          <el-input disabled :value="selectedRow.username"></el-input>
        </el-form-item>
        <el-form-item label="เบอร์โทร">
          <el-input disabled :value="selectedRow.username"></el-input>
        </el-form-item>
        <el-form-item label="ชื่อลูกค้า">
          <el-input disabled :value="selectedRow.first_name"></el-input>
        </el-form-item>
        <el-form-item label="นามสกุลลูกค้า">
          <el-input disabled :value="selectedRow.last_name"></el-input>
        </el-form-item>
        <el-form-item label="จังหวัดที่อยู่">
          <el-input disabled :value="selectedRow.address? selectedRow.address.province: '-'"></el-input>
        </el-form-item>
        <el-form-item label="อำเภอที่อยู่">
          <el-input disabled :value="selectedRow.address? selectedRow.address.district: '-'"></el-input>
        </el-form-item>
        <el-form-item label="รหัสไปรษณีย์">
          <el-input disabled :value="selectedRow.address? selectedRow.address.postal: '-'"></el-input>
        </el-form-item>
        <el-form-item label="บ้านเลขที่">
          <el-input disabled :value="selectedRow.address? selectedRow.address.house_no: '-'"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import userStore from "@/store/v1/user.store";

export default {
  data() {
    return {
      customers: null,
      search: null,
      infoDialog: false,
      selectedRow: null,
      form: {},
    };
  },
  methods: {
    async loadCustomerData() {
      await userStore.dispatch("get");
      this.customers = await userStore.getters.list;
    },
    handleInfo(row) {
      this.selectedRow = row;
      this.infoDialog = true;
    },
  },
  created() {
    this.loadCustomerData();
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