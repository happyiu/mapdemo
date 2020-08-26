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
    <el-table
      class="table"
      :data="tableData"
      max-height="400"
      style="width: 100%"
      size="mini"
    >
      <el-table-column prop="date" label="日期" min-width="40"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      radio4: "全部",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎王小虎王小虎王小虎",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
        },
      ],
    };
  },
  methods: {},
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

::v-deep .el-table,
.el-table__expanded-cell {
  background: transparent;
}
::v-deep .el-table tr {
  background-color: transparent !important;
  
}
::v-deep .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
  font-size: 10px;
}
::v-deep .el-table th,
.el-table tr {
  background: #39486e;
}

::v-deep .el-table td {
  padding: 4px;
  border: 0px;
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

.table {
  margin-top: 20px;
}
</style>