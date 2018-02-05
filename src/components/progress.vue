<template>
  <div class="progress">
      <div class="back" :style="'background-color:' + backColor + ';'"></div>
      <div class="top" :style="'background-color:' + topColor + ';' + 'width:' + percent + ';'"></div>
  </div>
</template>

<script>
export default {
  props: ['percent', 'topColor', 'backColor'],
  methods: {
  }
}
</script>
<style scoped>
.progress {
  position: relative;
}
.back {
  position:absolute;
  border-radius: .4rem;
  background-color: #fff;
  left: 0rem;
  bottom: 0rem;
  top:0rem;
  width: 100%;
}
.top {
  position:absolute;
  /*heigth:100%;*/
  border-radius: .4rem;
  background-color: #fff;
  left: 0rem;
  bottom: 0rem;
  top:0rem;
}
</style>
