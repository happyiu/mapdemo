<template>
  <div class="home">
    <div class="panel-top">
      <el-row :gutter="30" type="flex">
        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
          <div class="panel-item">
            <MapChart />
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="7" :lg="7" :xl="7">
          <div class="panel-item">
            <CompanyList />
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="7" :lg="7" :xl="7">
          <div class="panel-item"></div>
        </el-col>
      </el-row>
    </div>
    <div class="panel-ecahrts" type="flex">
      <el-row :gutter="30">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="panel-item"></div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="panel-item"></div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="panel-item"></div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <div class="panel-item"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MapChart from "@/components/MapChart.vue";
import CompanyList from "@/components/CompanyList.vue"

export default {
  name: "Home",
  components: {
    MapChart,
    CompanyList,
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 960px;
  background: #090918;
  box-sizing: border-box;
}

.panel-top {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;

  .panel-item {
    width: 100%;
    height: 500px;
    background: #060e21;
  }
}

.panel-ecahrts {
  background: #060e21;
  margin-top: 20px;
  box-sizing: border-box;
  padding: 20px;

  .panel-item {
    width: 100%;
    height: 300px;
    background: #060e21;
  }
}
</style>
