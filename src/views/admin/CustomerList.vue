<template>
  <el-card class="box-content">
    <el-table
      :data="
        customers.filter(
          (data) =>
            (!search || data.id.toString().includes(search)) && data.role == 'customer'
        )
      "
      style="width: 100%"
      v-if="customers"
    >
      <template>
        <el-table-column label="ID" prop="id"> </el-table-column>
        <el-table-column label="ชื่อ" prop="first_name"> </el-table-column>
        <el-table-column label="นามสกุล" prop="last_name"> </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope" slot="header">
            <el-input v-model="search" placeholder="ค้นหาด้วย ID" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleView(scope.$index, scope.row)"
              >ข้อมูล</el-button
            >
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-card>
</template>

<script>
import userStore from "@/store/v1/user.store";

export default {
  data() {
    return {
      customers: null,
      search: null,
    };
  },
  methods: {
    handleView(index, row) {
      console.log(this.search);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    async loadCustomerData() {
      await userStore.dispatch("get");
      this.customers = await userStore.getters.list;
      console.log(this.customers);
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