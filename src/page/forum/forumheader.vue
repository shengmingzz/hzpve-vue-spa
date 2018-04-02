<template>
  <section class="header">
    <img class="avatar" :src="item.avatar" :onerror="logo">
    <section class="name">{{item.name}}</section>
    <section class="sign">{{item.signature}}</section>
  </section>
</template>

<script>
export default {
  data () {
    return {
      logo: 'this.src="' + require('../../img/default.png') + '"'
    }
  },
  props: ['item'],
  methods: {
  },
  mounted () {
    console.log(this.item.avatar)
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.header {
  position: relative;
  height: 2.5rem;
  width: 100%;
  .avatar {
    position: absolute;
    left: 0rem;
    width: 1.6rem;
    height: 1.6rem;
    top: .3rem;
    border-radius: .2rem;
    overflow: hidden;
  }
  .name {
    position: absolute;
    left: 1.8rem;
    top: .3rem;
    font-size: .7rem;
    color: $orange;
  }
  .sign {
    position: absolute;
    left: 1.8rem;
    top: 1.3rem;
    font-size: .5rem;
    color: #999;
  }
}
</style>
