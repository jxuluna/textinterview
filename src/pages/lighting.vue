<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="所属项目">
        <el-select v-model="nnlightctlProjectId" placeholder="全部">
          <el-option
            v-for="(item,index) in allProject"
            :key="index"
            :label="item.projectName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="灯具编码">
        <el-input v-model="codeNumber" placeholder="灯具编码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="danger" icon="el-icon-delete" @click="onDelete">批量删除</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="openDialog">灯具部署</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="codeNumber" label="序号" width="120"></el-table-column>
      <el-table-column prop="equipmentNumber" label="单灯控制器编码" show-overflow-tooltip></el-table-column>
      <el-table-column prop="lamppostName" label="单灯控制器名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="codeNumber" label="控制柜编码" show-overflow-tooltip></el-table-column>
      <el-table-column prop="modelName" label="灯具名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="lamppostName" label="灯杆名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="lampHolder" label="灯头号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="projectName" label="所属项目" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mem" label="备注" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNumber"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="tableData.length"
    ></el-pagination>
    <el-dialog title="新增灯具部署" :visible.sync="isAddRoad">
      <el-form :model="form">
        <el-form-item
          label="控制柜"
          :label-width="formLabelWidth"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-select v-model="EleboxIds" placeholder="请选择控制柜" @change="changeElebox">
            <!--v-model取value的值，@change在选择之后把值给value -->
            <el-option
              v-for="(item,index) in allEleboxId"
              :key="index"
              :label="`${item.eleboxName}-${item.codeNumber}`"
              :value="item.codeNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属项目" :label-width="formLabelWidth">
          <el-input v-model="achieveProject" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单灯控制器" :label-width="formLabelWidth">
          <el-select
            v-model="lampModelSelect"
            filterable
            remote
            reserve-keyword
            placeholder="请选择"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="(item,index) in allLampModel"
              :key="index"
              :label="`${item.lampName}-${item.equipmentNumber}`"
              :value="item.equipmentNumber"
            ></el-option>
            <!--这里的lampostName不在queryControllerList这个接口里，而在selectdeploylighting这个接口里-->
          </el-select>
        </el-form-item>
        <el-form-item label="   ">
          <el-radio-group v-model="lampListManage">
            <el-radio :label="1">灯具管理</el-radio>
            <el-radio :label="2">灯具</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="lampListManage == 1 ? '灯具管理' : '灯具' " :label-width="formLabelWidth">
          <el-select v-model="cdddManage" v-if="lampListManage == 1" placeholder="请选择">
            <el-option
              v-for="(item,index) in allLampListManage"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select v-model="cddd" v-else placeholder="请选择">
            <el-option
              v-for="(item,index) in allLampList"
              :key="index"
              :label="item.lampostName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="   ">
          <el-radio-group v-model="lampHolderManage">
            <el-radio :label="1">灯杆管理</el-radio>
            <el-radio :label="2">灯杆</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="lampHolderManage == 1? '灯杆管理': '灯杆'" :label-width="formLabelWidth">
          <el-select v-model="lampHolderIdsManage" v-if="lampHolderManage == 1" placeholder="请选择">
            <el-option
              v-for="(item,index) in allLampModelManage"
              :key="index"
              :label="item.lightName"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select v-model="lampHolderIds" v-else placeholder="请选择">
            <el-option
              v-for="(item,index) in allLampListModel"
              :key="index"
              :label="item.modelType"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="灯杆号" :label-width="formLabelWidth">
          <el-input v-model="lampHead" autocomplete="off" placeholder="请输入灯头号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddRoad = false">取消</el-button>
        <el-button type="primary" @click="addRoadingId">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getProject,
  showLighting,
  selectdeploylight,
  selectByLighting,
  UpDateDeployLight
} from "../api";
export default {
  name: "app",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      allProject: [],
      allEleboxId: [],
      nnlightctlProjectId: 127,
      pageNumber: 1,
      pageSize: 10,
      isAddRoad: false,
      projectId: "",
      EleboxIds: "",
      achieveProject: "",
      lampModelSelect: "",
      allLampModel: [],
      loading: false,
      lampListManage: 1,
      lampHolderManage: 1,
      allLampListManage: [],
      allLampList: [],
      allLampModelManage: [],
      allLampListModel: [],
      cddd: "",
      lampHolderIds: "",
      lampHead: "",
      cdddManage: "",
      lampHolderIdsManage: ""
    };
  },
  created() {
    this.getProjectId();
    this.showLightingId();
    console.log(123);
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.showLightingId();
    },
    onSubmit() {
      this.showLightingId();
    },
    getProjectId() {
      getProject().then(data => {
        this.allProject = data.data.body.data;
      });
    },
    showLightingId() {
      let param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
      showLighting(param).then(data => {
        this.tableData = data.data.body.data;
      });
    },
    selectdeployEle() {
      let param = new FormData();
      param.append("projectId", this.projectId);

      selectdeploylight(param).then(data => {
        this.allEleboxId = data.data.body.data[0].eleboxList;
        this.allLampListManage = data.data.body.data[0].lampPostTypeViews;
        this.allLampList = data.data.body.data[0].lamppostViews;
        this.allLampModelManage = data.data.body.data[0].lightingModelTypeView;
        this.allLampListModel = data.data.body.data[0].lightingViews;
      });
    },
    openDialog() {
      this.isAddRoad = true;
      this.selectdeployEle();
    },

    changeElebox() {
      let elem = this.allEleboxId.find(item => {
        return item.codeNumber == this.EleboxIds; //item遍历数组的每一项，找到某一项的codeNumber=已经选择的codeNumber
      });

      this.projectId = elem.project.id; //下次掉接口时传的参数
      this.achieveProject = elem.project.projectName; //反显
      this.selectdeployEle();
    },
    selectByLightingId(query) {
      let param = new FormData();
      param.append("nnlightctlProjectId", this.projectId);
      param.append("equipmentNumber", query);
      selectByLighting(param).then(data => {
        console.log(data);
        this.allLampModel = data.data.body.data;
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.selectByLightingId(query);
        }, 2000);
      } else {
        this.allLampModel = [];
      }
    },
    addRoadingId() {
      let param = {
        nnlightctlProjectId: this.projectId,
        nnlightctlEleboxId: this.EleboxIds,
        id: this.lampModelSelect,
        lightingModelTypeId: this.cdddManage,
        nnlightctlLampModelId: this.cddd,
        lamptype: this.lampHolderIdsManage,
        nnlightctlLamppostId: this.lampHolderIds,
        lampHolder: this.lampHead
      }; //v-model里的值传给后端
      UpDateDeployLight(param).then(data => {
        if (data.data.header.code === "1000") {
          this.isAddRoad = false;
          this.$message({
            message: "添加成功",
            type: "success"
          });
        }
      });
      this.showLightingId;
    }
  }
};
</script>