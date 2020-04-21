<template>
<div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="审批人">
    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="formInline.region" placeholder="活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item>
    <el-button type="danger" icon="el-icon-delete" @click="onSubmit">批量删除</el-button>
    <el-button type="primary" icon="el-icon-plus" @click="onSubmit">控制柜部署</el-button>
    <el-button type="primary" icon="el-icon-plus" @click="onSubmit">导入文件</el-button>
    <el-button type="primary" icon="el-icon-upload" @click="onSubmit">下载模版</el-button>

  </el-form-item>
</el-form>

<el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="modleCount"
      label="序号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="eleboxName"
      label="控制柜名称"
      show-overflow-tooltip>
    </el-table-column>
        <el-table-column
      prop="projectName"
      label="项目名称"
      show-overflow-tooltip>
    </el-table-column>
        <el-table-column
      prop="mem"
      label="备注"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>

</div>
</template>

<script>
import {deployEleboxList} from '../api'


export default {
  name: 'App',
data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData: [

        ],
        multipleSelection: [],
        pageNumber:1,
        pageSize:10,
        nnlightctlProjectId:324,
        codeNumber:''
      }
    },
    created(){
      this.deployElebox();
    },
    methods:{
      onSubmit() {
        console.log(123)
      },
      deployElebox(){
        let param = {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          nnlightctlProjectId: this.nnlightctlProjectId,
          codeNumber: this.codeNumber
        }
          deployEleboxList(param).then(data =>{
            console.log(data)
          })
      }
    }

}
</script>

<style>

</style>
