<template>
    <div>
        <el-dialog :title="title" :visible.sync="isAddRoad">
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
        <el-button @click="isAddRoad = false">取 消</el-button>
        <el-button type="primary" @click="addRoadingId">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>