<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="所属项目">
        <el-select
          v-model="nnlightctlProjectId"
          placeholder="全部"
        >
          <el-option
            v-for="(item,index) in allProject"
            :key="index"
            :label="item.projectName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="灯杆">
        <el-input
          v-model="lamppostModel"
          placeholder="灯杆"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="onSubmit"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="codeNumber"
        label="序号"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="equipmentNumber"
        label="编码"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="lamppostModel"
        label="型号"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="lampostName"
        label="名称"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="所属项目"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="maintenanceTimes"
        label="使用年限"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="high"
        label="高度"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="lampheadNumber"
        label="灯头数量"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="mem"
        label="备注"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNumber"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getProject, listlamppost } from '../api'

export default {
  data () {
    return {
      formInline: {
        user: "",
        region: ""
      },
      nnlightctlProjectId: 480,
      allProject: [],
      pageNumber: 1,
      pageSize: 10,
      equipmentNumber: '',
      lampostName: '',
      lamppostModel: '',
      tableData: [], 
      isAddRoad: false,
      isEditRoad: false,
    }
  },
  created () {
    this.getProjectId();
    this.listlamppostId()
  },
  methods: {
    handleCurrentChange (val) {
      this.pageNumber = val;
      this.listlamppostId();
    },
    onSubmit () {
      this.listlamppostId()
    },
    getProjectId () {
      getProject().then(data => {
        this.allProject = data.data.body.data
      })
    },
    listlamppostId () {
      let param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        equipmentNumber: this.equipmentNumber,
        lampostName: this.lampostName,
        lamppostModel: this.lamppostModel
      }
      listlamppost(param).then(data => {
        this.tableData = data.data.body.data
      })
    }
  }

}
</script>