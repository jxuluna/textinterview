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
          @click="onDelete"
        >批量删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="isAddRoad"
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
    <el-dialog
      title="新增灯具部署"
      :visible.sync="isAddRoad"
    >
      <el-form :model="form">
        <el-form-item
          label="控制柜" :label-width="formLabelWidth"  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-select v-model="EleboxIds" placeholder="请选择控制柜">
            <el-option v-for="(item,index) in allEleboxId"
              :key="index"
              :label="item.eleboxName"
              :value="item.codeNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属项目"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="mem"
            autocomplete="off"
          ></el-input> 
        </el-form-item>
        <el-form-item
          label="单灯控制器"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="EleboxIds"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in allEleboxId"
              :key="index"
              :label="item.eleboxName"
              :value="item.codeNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="灯具管理"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="EleboxIds"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in allEleboxId"
              :key="index"
              :label="item.eleboxName"
              :value="item.codeNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="灯杆管理"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="EleboxIds"
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in allEleboxId"
              :key="index"
              :label="item.eleboxName"
              :value="item.codeNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="灯杆号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="mem"
            autocomplete="off"
            placeholder="请输入灯头号"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="isAddRoad = false">取消</el-button>
        <el-button
          type="primary"
          @click="addRoadingId"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getProject, showLighting,ShowUpdateLighting } from '../api'//selectdeploylight,selectByLighting,UpDateDeployLight,

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
      pageSize: 10,
      isAddRoad:false,
      deployState:0,
      nnlightctlLampModelId:'',
      nnlightctlLamppostId:'',
      id:'',
      nnlightctlEleboxId:'',
      lampHolder:'',
      lampControllerId:'',
      fromerEleboxId:'',
      changeEleboxId:'',
      fromerLamppostId:'',
      changeLamppostId:'',

    }
  },
  created () {
    this.getProjectId();
    this.showLightingId()
  },
  methods: {
    handleCurrentChange (val) {
      this.pageNumber = val;
      this.showLightingId();
    },
    onSubmit () {
      this.showLightingId()
    },
    getProjectId () {
      getProject().then(data => {
        this.allProject = data.data.body.data
      })
    },
    showLightingId () {
      let param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      showLighting(param).then(data => {
        this.tableData = data.data.body.data
      })
    },
    ShowUpdateLightingId(){
      let param= {
        nnlightctlLampModelId:this.nnlightctlLampModelId,
        nnlightctlLamppostId:this.nnlightctlLamppostId,
        id:this.id,
        nnlightctlEleboxId:this.nnlightctlEleboxId,
        lampHolder:this.lampHolder
      }
      ShowUpdateLighting(param).then(data=>{
       if (data.data.header.code === "1000") {
          this.isAddRoad = false;
          this.$message({
            message: "添加成功",
            type: "success"
          });
        }
      })
    },
    // selectdeploylightId(){
    //   let param = {
    //     projectId:this.nnlightctlProjectId,
    //   }
    //   selectdeploylight(param).then(data =>{
    //     if(data.data.header.code === "1000") {
    //     }
    //   })
    // }
  }
}
</script>