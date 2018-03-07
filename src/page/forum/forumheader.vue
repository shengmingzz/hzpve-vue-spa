<template>
  <section class="header">
    <img class="avatar" :src="item.author.avatar">
    <section class="name">{{item.author.name}}</section>
    <section class="sign">{{item.author.signature}}</section>
  </section>
</template>

<script>
export default {
  data () {
    return {
      topIcon: require('../../img/info/news_top@2x.png'),
      hotIcon: require('../../img/info/news_hot@2x.png')
    }
  },
  props: ['item'],
  methods: {
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
    left: .2rem;
    width: 1.6rem;
    height: 1.6rem;
    top: .3rem;
  }
  .name {
    position: absolute;
    left: 2rem;
    top: .3rem;
    font-size: .7rem;
    color: $orange;
  }
  .sign {
    position: absolute;
    left: 2rem;
    top: 1.3rem;
    font-size: .5rem;
    color: #999;
  }
}
</style>
