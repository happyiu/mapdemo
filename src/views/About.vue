<template>
  <div class="body">
    <div id="main" ref="mapChart"></div>
    <button class="backBtn" @click="goBack">返回</button>
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
            layoutSize: "80%",
            roam: true,
            itemStyle: {
              normal: {
                borderColor: "rgba(147, 235, 248, 1)",
                borderWidth: 0.5,
                color: {
                  type: "linear-gradient",
                  x: 0,
                  y: 1500,
                  x2: 2500,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#009DA1", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#005B9E", // 50% 处的颜色
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
              layoutSize: "80%",
              // roam: true,
              itemStyle: {
                normal: {
                  borderColor: "rgba(147, 235, 248, 0.6)",
                  borderWidth: 0.8,
                  areaColor: {
                    type: "linear-gradient",
                    x: 0,
                    y: 1200,
                    x2: 1000,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#009DA1", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#005B9E", // 50% 处的颜色
                      },
                    ],
                    global: true, // 缺省为 false
                  },
                },
                emphasis: {
                  areaColor: "rgba(147, 235, 248, 0)",
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
.body {
  width: 100%;
  height: 100%;
  position: relative;
}
#main {
  width: 100%;
  height: 100%;
}
.backBtn {
  position: absolute;
  bottom: 20px;
}
</style>