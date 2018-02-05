<template>
  <div class="down">
    <div class="left">
      <img :src="hotIcon" class="hot" v-show="!item.ishot" :style="hotStyle()"></img>
      <img :src="topIcon" class="top" v-show="item.istop" :style="topStyle()"></img>
      <h5 :style="authorStyle()">{{item.writer ? item.writer.name : ""}}</h5>
      <h5 style="margin-left:.6rem;">{{item.commentCount}}评论</h5>
    </div>
    <div class="right">
      <h5>4小时前</h5>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        topIcon: require('../../img/news_top@2x.png'),
        hotIcon: require('../../img/news_hot@2x.png')
      }
    },
    props: ['item'],
    methods: {
      hotStyle () {
        return this.item.ishot ? 'margin-left:0rem;width:.7rem;height:.7rem;' : 'width:0rem;height:0rem;'
      },
      topStyle () {
        return this.item.istop ? (this.item.ishot ? 'margin-let:0.4rem;width:1.4rem;height:0.7rem;' : 'margin-let:0rem;width:0rem;height:0rem;') : 'margin-let:0rem;width:0rem;height:0rem;'
      },
      authorStyle () {
        return (!this.item.istop && !this.item.ishot) ? 'margin-left:0rem;' : 'margin-left:0.6rem;'
      }
    }
  }
</script>

<style lang="scss" scoped>
.down {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .left {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    h5{font-size: .5rem;color: #999999;}
  }
  .right {
    h5{font-size: .5rem;color: #999999;}
  }
}
</style>
