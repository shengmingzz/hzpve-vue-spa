<template>
  <div class="section">
      <div class="line"></div>
      <div class="tip">{{tip}}</div>
  </div>
</template>

<script>
export default {
  props: ['tip'],
  methods: {
  }
}
</script>
<style scoped>
.section {
  margin-top: 1rem;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  display: flex;
  flex-direction: row;
}
.line {
  background-color: #e77e11;
  width: 0.2rem;
  height: 1rem;
}
.tip {
  font-size: 0.7rem;
  margin-left:0.4rem;
  color: #e77e11;
}
</style>
