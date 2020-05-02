<template>
  <el-dialog
    :title="title"
    :visible.sync="isAddRoad"
    :show="show"
    @close="$emit('update:show',false)"
  >
    <!--$emit子向父传值 -->
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
</template>
 

<script>
import { getProject, addRoading, selectElebox } from "../api";

export default {
  data() {
    return {
      isAddRoad: this.show,
      nnlightctlProjectId: 480,
      allProject: [],
      roadingIds: [],
      eleboxId: 0,

      roadingName: "",
      EleboxIds: [],
      allEleboxId: [],
      mem: "",
      id: ""
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    row: {
      type: Object,
      
    }
  },
  watch: {
    show() {
      this.isAddRoad = this.show;
      if (this.row.id) {
      this.id = this.row.id;
      this.EleboxIds = this.row.EleboxIds;
      this.roadingName = this.row.roadingName;
      this.mem = this.row.mem; 
console.log(this.row)
    }//编辑回显，判断row是否被传值里有id
    
    }
  },
  created() {
    this.getProjectId();
    this.selectEleboxId();
    
  },
  methods: {
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
      this.$emit("listroadingId");
    }, //子组件调用父组件
    getProjectId() {
      getProject().then(data => {
        this.allProject = data.data.body.data;
      });
    },
    selectEleboxId() {
      selectElebox().then(data => {
        this.allEleboxId = data.data.body.data;
      });
    }
  }
};
</script>