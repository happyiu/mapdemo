<template>
  <div class="page">
    <div class="header">区域可视化</div>
    <div class="main">
      <div class="mapChart">
        <map-chart />
      </div>
      <div></div>
      <div></div>
    </div>
    <div class="minor"></div>
  </div>
</template>

<script>
import mapChart from '../views/About'
export default {
  name: 'HelloWorld',
  components: {
    mapChart
  }
}
</script>

<style scoped lang="scss">
.page {
  background: url('../assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
  min-width: 960px;
  width: 100%;
  margin: 0px;
  padding: 0px;
}
.header {
}
.main {
  display: flex;
  width: 100%;
  height: 500px;

  div {
    flex: 1;
  }
  div:first-child {
    flex: 2;
  }
  .mapChart {
    width: 100%;
    height: 500px;
    position: relative;
  }
  .mapChart::before {
    content: '';
    background: url('../assets/map.png') no-repeat;
    background-size: 80% 80%;
    background-position: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 500px;
    height: 500px;
    opacity: 0.3;
  }
}

.minor {
  height: 300px;
  border: 1px solid burlywood;
}

</style>
