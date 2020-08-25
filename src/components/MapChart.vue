<template>
  <div class="body">
    <!-- <div class="title">2020年 杭州市 辖区 健康企业管理</div> -->
    <el-button type="text" class="backBtn" size="mini" @click="goBack">返回上一级</el-button>
    <div id="main" ref="mapChart"></div>
    <div class="data-panel">
      <div class="data-panel-item">
        <div class="explain">已完成注册企业</div>
        <div class="datanum3">1234</div>
      </div>

      <div class="data-panel-item">
        <div class="explain">完成情况</div>
        <div class="datanum2">90%</div>
      </div>

      <div class="data-panel-item">
        <div class="explain">警告</div>
        <div class="datanum">99</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { AMapManager } from "vue-amap";
const echarts = require("echarts");
// import echarts from 'echarts';
export default {
  data() {
    return {
      parentJson: null,
      parentCode: [],
      adcodes: [],
      cityCode: 100000,
    };
  },
  async mounted() {
    this.parentCode.push(this.cityCode);
    this.$nextTick(async () => {
      if (typeof AMapUI !== "undefined") {
        await this.getGeoJson(this.cityCode);
      }
    });
  },
  methods: {
    getGeoJson(adcode) {
      const _this = this;
      var map = new AMap.Map("map", {
        resizeEnable: false,
        center: [116.30946, 39.937629],
        zoom: 12,
      });
      AMapUI.loadUI(["geo/DistrictExplorer"], (DistrictExplorer) => {
        var districtExplorer = (window.districtExplorer = new DistrictExplorer({
          eventSupport: false, //打开事件支持
          map: map,
        }));
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
          if (error) {
            console.error(error);
            return;
          }
          let Json = areaNode.getSubFeatures();
          if (Json.length > 0) {
            _this.parentJson = Json;
          } else if (Json.length === 0) {
            Json = _this.parentJson.filter((item) => {
              if (item.properties.adcode == adcode) {
                return item;
              }
            });
            if (Json.length === 0) return;
          }

          _this.adcodes = Json.map((item) => {
            return {
              name: item.properties.name,
              adcode: item.properties.adcode,
              level: item.properties.level,
            };
          });
          //去获取数据
          // console.log(Json)
          _this.getMapData(Json);
        });
      });
    },
    getMapData(Json) {
      let mapData = Json.map((item) => {
        return {
          name: item.properties.name,
          value: Math.random() * 1000,
          level: item.properties.level,
          cityCode: item.properties.adcode,
        };
      });
      let mapJson = {};
      //geoJson必须这种格式
      mapJson.features = Json;
      //去渲染echarts
      this.initEcharts(mapData, mapJson);
    },
    async initEcharts(mapData, mapJson) {
      const myChart = echarts.init(document.getElementById("main"));
      echarts.registerMap("Map", mapJson);
      myChart.setOption(
        {
          geo: {
            map: "Map",
            aspectScale: 0.75,
            layoutCenter: ["49%", "51%"], //地图位置
            layoutSize: "90%",
            roam: true,

            itemStyle: {
              normal: {
                borderColor: "rgba(147, 235, 248, 1)",
                // borderWidth: 0.5,

                borderWidth: 1,
                shadowColor: "rgba(56,164,255,.26)",
                opacity: 0.5,
                shadowOffsetX: 1,
                shadowOffsetY: 1,
                shadowBlur: 1,

                color: {
                  type: "linear-gradient",
                  x: 0,
                  y: 1500,
                  x2: 2500,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#09132c", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#121f4b", // 50% 处的颜色
                    },
                  ],
                  global: true, // 缺省为 false
                },
                opacity: 0.5,
              },
              emphasis: {
                areaColor: "#2a333d",
              },
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
              emphasis: {
                textStyle: {
                  color: "#fff",
                },
              },
            },
            z: 2,
          },
          series: [
            {
              type: "map",
              map: "Map",
              roam: true,
              zoom: 1.1, //缩放比例

              aspectScale: 0.75,
              layoutCenter: ["50%", "50%"], //地图位置
              layoutSize: "90%",
              // roam: true,
              itemStyle: {
                normal: {
                  // borderColor: "rgba(147, 235, 248, 0.6)",
                  // borderColor: "#4b70ff",
                  // borderWidth: 0.8,

                  areaColor: "rgba(0,255,255,.02)",
                  borderColor: "#00ffff",
                  borderWidth: 0.5,
                  shadowColor: "#00ffff",
                  shadowOffsetX: 0,
                  shadowOffsetY: 1,
                  shadowBlur: 1,

                  areaColor: {
                    type: "linear-gradient",
                    x: 0,
                    y: 1200,
                    x2: 1000,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#09132c", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#121f4b", // 50% 处的颜色 #121f4b
                      },
                    ],
                    global: true, // 缺省为 false
                  },
                },
                emphasis: {
                  // areaColor: "rgba(147, 235, 248, 0)",
                  areaColor: "rgba(0,255,255,.1)",
     
                },
              },
              label: {
                normal: {
                  show: false,
                  textStyle: {
                    color: "#fff",
                  },
                },
                emphasis: {
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
            },
          ],
        },
        true
      );
      myChart.off("click");
      myChart.on("click", this.echartsMapClick);
      myChart.on("georoam", function (params) {
        var option = myChart.getOption(); //获得option对象
        if (params.zoom != null && params.zoom != undefined) {
          //捕捉到缩放时
          option.geo[0].zoom = option.series[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        } else {
          //捕捉到拖曳时
          option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
        }
        myChart.setOption(option); //设置option
      });
      // window.onresize = myChart.resize;
    },
    echartsMapClick(params) {
      const city = this.adcodes[params.dataIndex];
      if (this.parentCode[this.parentCode.length - 1] == city.adcode) {
        return;
      }
      this.parentCode.push(city.adcode);
      this.getGeoJson(city.adcode);
    },
    goBack() {
      if (this.parentCode.length > 1) {
        this.parentCode.pop();
        this.getGeoJson(this.parentCode[this.parentCode.length - 1]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.body {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
}
#main {
  width: 100%;
  height: 90%;
}
.backBtn {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 3;
}
.data-panel {
  width: 70%;
  position: absolute;
  display: flex;
  justify-content: space-around;
  left: 50%;
  transform: translate(-50%, -50%);

  .data-panel-item {
    
  }
  .explain {
    font-size: 14px;
    color: #C0C4CC;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }
  .datanum {
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 2px;
    color: #ff1774;
  }
  .datanum2 {
    color: #00fbe6;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .datanum3 {
    color: #4669fb;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>