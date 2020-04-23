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
          @click="onDelete"
        >批量删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="onSubmit"
        >新增</el-button>
      </el-form-item>

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
          prop="modleCount"
          label="序号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="roadingName"
          label="道路名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="eleboxNumber"
          label="控制柜数量"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="lampControllerNumber"
          label="灯具数量"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="longitude"
          label="经度"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="latitude"
          label="纬度"
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
    </el-form>

  </div>

</template>
<script>
import { listroading,getProject } from '../api'

export default {
  name: 'app',
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      multipleSelection: [],
      pageNumber: 1,
      pageSize: 10,
      nnlightctlProjectId: 480,
      allProject: [],
      roadingIds: [],
      eleboxId: 0
    }
  },
  created () {
    this.listroadingId();
    this.getProjectId()
    // this.deleteRoad()
  },
  methods: {
    // onDelete (){
    //   let param = {
    //     roadingIds:this.roadingIds,
    //     eleboxId:this.eleboxId
    //   }
    //   this.deleteRoad(param)
    // },
    handleCurrentChange (val) {
      this.pageNumber = val;
      this.listroadingId();
    },
      getProjectId(){
    getProject().then(data =>{
      this.allProject = data.data.body.data
    })
  },
    listroadingId () {
      let param = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        nnlightctlProjectId: this.nnlightctlProjectId
      }
      listroading(param).then(data => {
        this.tableData = data.data.body.data
      }
      )
    },
  }
}
</script>