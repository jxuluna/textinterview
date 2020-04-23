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
      <el-form-item label="灯具编码">
        <el-input
          v-model="codeNumber"
          placeholder="灯具编码"
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
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="onSubmit"
        >批量删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="onSubmit"
        >灯具部署</el-button>
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
        label="单灯控制器编码"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="lamppostName"
        label="单灯控制器名称"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="codeNumber"
        label="控制柜编码"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="modelName"
        label="灯具名称"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="lamppostName"
        label="灯杆名称"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="lampHolder"
        label="灯头号"
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
        prop="mem"
        label="备注"
        show-overflow-tooltip
      >
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
import { getProject, showLighting } from '../api'

export default {
  name: 'app',
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      allProject: [],
      nnlightctlProjectId: 324,
      pageNumber: 1,
      pageSize: 10
    }
  },
  created () {
    this.getProjectId();
    this.showLightingId()
  },
  methods: {
        handleCurrentChange(val) {
        this.pageNumber = val;
        this.showLightingId();
      },
      onSubmit(){
          this.showLightingId()
      },
    getProjectId() {
      getProject().then(data => {
        this.allProject = data.data.body.data
      })
    },
    showLightingId() {
      let param = {
        pageNumber : this.pageNumber,
        pageSize : this.pageSize
      }
      showLighting(param).then(data => {
        this.tableData = data.data.body.data
      })
    }
  }
}
</script>