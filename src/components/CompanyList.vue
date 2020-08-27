<template>
  <div class="page">
    <div class="top">
      <el-input
        class="sInput"
        placeholder
        v-model="searchText"
        size="mini"
        prefix-icon="el-icon-search"
      />

      <el-radio-group class="radio-group" v-model="radio4" size="mini">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="已完成"></el-radio-button>
        <el-radio-button label="未完成"></el-radio-button>
      </el-radio-group>
    </div>
    <pl-table
      class="table"
      :data="tableData"
      height="420"
      style="width: 100%"
      size="mini"
      use-virtual
      :resizable="false"
    >
      <el-table-column :index="indexMethod" type="index" align="center" label="序号" min-width="20"></el-table-column>
      <el-table-column prop="name" label="公司名称"></el-table-column>
      <el-table-column prop="local" label="所在辖区"></el-table-column>
      <el-table-column prop="prod" label="完成度" min-width="40"></el-table-column>
    </pl-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      radio4: "全部",
      tableData: [
        
      ],
    };
  },
  mounted() {

    const arr = new Array(2001).fill({
      name: '浙江多谱检测科技有限公司',
      local: '浙江省杭州市西湖区',
      prod: '80%'
    })
    this.tableData = arr
  },
  methods: {
    indexMethod(index) {
      return index + 1
    }
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 10px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sInput {
}
::v-deep .el-input--mini {
  width: 30%;
}
.sInput ::v-deep .el-input__inner {
  background: transparent;
  border: 1px solid #39486e;
  border-radius: 20px;
  color: #c0c4cc;
  transition: 0.5s all;
}
.sInput ::v-deep .el-input__inner:focus {
  border: 1px solid #3163e0;
  width: 150%;
}
.sInput ::v-deep .el-input__inner:hover {
  border: 1px solid #3163e0;
}
.radio-group {
  float: right;
}
::v-deep .el-radio-group .el-radio-button__inner {
  background: transparent;
  padding: 6px 10px;
  font-size: 10px;
}

// 淦 为了自定义elementui table 的样式，我真的要吐了
::v-deep .el-table,
.el-table__expanded-cell {
  background: transparent;
  color: #ddd;
}
::v-deep .el-table tr {
  background-color: transparent !important;
}
::v-deep .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
  font-size: 12px;
  // padding: 8px;
}
::v-deep .el-table th,
.el-table tr {
  background: #39486e;
  // border: 0px;
  color: #ddd;
  font-size: 14px;
}


::v-deep .el-table .is-leaf {
  border: 0px;
}

::v-deep .el-table td {
  padding: 5px 0;
  border: 0px;
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td {
  background: #39486e;
  color: #ddd;
}

::v-deep .el-table__body {
  width: 100% !important;
}

::v-deep .el-table__virtual-wrapper {
  width: 100% !important;

}

::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 5px; // 横向滚动条
  // height: 6px; // 纵向滚动条 必写
}
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

::v-deep .el-table::before {
  // left: 0;
  // bottom: 0;
  // width: 100%;
  height: 0px;
}

// ::v-deep .current-row > td {
//   background: rgba(0, 158, 250, 0.219) !important;
// }

::v-deep .el-table--border {
  border: 0px;
}

::v-deep .el-table--border::after, .el-table--group::after, .el-table::before {
  width: 0;;
}

// 滚动条上面的小横线
::v-deep .gutter {
  border-bottom: 0px !important;
}

::v-deep .el-table__body tr.current-row>td {
  background: transparent;
}

.table {
  margin-top: 30px;
}
</style>