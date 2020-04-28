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
    </el-form>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="danger" icon="el-icon-delete" @click="onDelete">批量删除</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="isAddRoad = true">新增</el-button>
      </el-form-item>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="120"></el-table-column>
        <el-table-column prop="roadingName" label="道路名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="eleboxNumber" label="控制柜数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="lampControllerNumber" label="灯具数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="longitude" label="经度" show-overflow-tooltip></el-table-column>
        <el-table-column prop="latitude" label="纬度" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mem" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑道路</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      ></el-pagination>
    </el-form>

    <el-dialog title="新增道路" :visible.sync="isAddRoad">
      <el-form :model="form">
        <el-form-item label="道路名称" :label-width="formLabelWidth">
          <el-input v-model="roadingName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所含控制柜" :label-width="formLabelWidth">
          <el-select v-model="EleboxIds" multiple placeholder="请选择控制柜">
            <el-option
              v-for="(item,index) in allEleboxId"
              :key="index"
              :label="item.eleboxName"
              :value="item.codeNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="mem" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddRoad = false">取消</el-button>
        <el-button type="primary" @click="addRoadingId">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑道路" :visible.sync="isEditRoad">
      <el-form :model="form">
        <el-form-item label="道路名称" :label-width="formLabelWidth">
          <el-input v-model="roadingName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所含控制柜" :label-width="formLabelWidth">
          <el-select v-model="EleboxIds" multiple placeholder="请选择控制柜">
            <el-option
              v-for="(item,index) in allEleboxId"
              :key="index"
              :label="item.eleboxName"
              :value="item.codeNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="mem" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEditRoad = false">取 消</el-button>
        <el-button type="primary" @click="editRoadingId">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  listroading,
  getProject,
  addRoading,
  selectElebox,
  deleteRoad
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
      multipleSelection: [],
      pageNumber: 1,
      pageSize: 10,
      nnlightctlProjectId: 480,
      allProject: [],
      roadingIds: [],
      eleboxId: 0,
      isAddRoad: false,
      isEditRoad:false,
      roadingName: "",
      EleboxIds: [],
      allEleboxId: [],
      mem: "",
      id:'',
    };
  },
  created() {
    this.listroadingId();
    this.getProjectId();
    this.selectEleboxId();
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
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.listroadingId();
    },
    getProjectId() {
      getProject().then(data => {
        this.allProject = data.data.body.data;
      });
    },
    selectEleboxId() {
      selectElebox().then(data => {
        this.allEleboxId = data.data.body.data;
      });
    },
    listroadingId() {
      let param = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        nnlightctlProjectId: this.nnlightctlProjectId
      };
      listroading(param).then(data => {
        this.tableData = data.data.body.data;
      });
    },
    addRoadingId() {
      let param = {
        nnlightctlProjectId: this.nnlightctlProjectId,
        roadingName: this.roadingName,
        eleboxIds: this.EleboxIds,
        mem: this.mem,
        longitude: 122,
        latitude: 122
      };
      addRoading(param).then(data => {
        if (data.data.header.code === "1000") {
          this.isAddRoad = false;
          this.$message({
            message: "添加成功",
            type: "success"
          });
        }
      });
      this.listroadingId();
    },
    handleEdit(index, row) {
      this.isEditRoad = true;
      this.id = row.id;
      this.roadingName = row.roadingName
      this.mem = row.mem
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = new FormData();
          param.append("roadingIds", [row.id]);
          deleteRoad(param).then(data => {
            if (data.data.header.code === "1000") {
              this.isAddRoad = false;
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.listroadingId();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editRoadingId(){
      let param = {
        id:this.id,
        nnlightctlProjectId: this.nnlightctlProjectId,
        roadingName: this.roadingName,
        eleboxIds: this.EleboxIds,
        mem: this.mem,
        longitude: 122,
        latitude: 122
      };
      addRoading(param).then(data => {
        if (data.data.header.code === "1000") {
          this.isEditRoad = false;
          this.$message({
            message: "编辑成功",
            type: "success"
          });
        }
      });
      this.listroadingId();
    }
  }
};
</script>