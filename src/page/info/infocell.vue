<template>
  <div class="cell">
    <div v-if="cellType()==0" class="cellnone">
      <div>{{item.title}}
      </div>
      <info-item :item="item" class="item0"></info-item>
    </div>

    <div v-if="cellType()==1" class="cellone">
      <div class="left">
        <div class="up">
          <div>{{item.title}}
          </div>
        </div>
        <info-item :item="item" class="item"></info-item>
      </div>
      <img :src="item.thumbnail4Rec" :onerror="logo">
    </div>

    <div v-if="cellType()==3" class="cellthrid">
      <div>{{item.title}}
      </div>
      <div class="imgs">
        <img :src="item.thumbnail4Rec" :onerror="logo">
        <img :src="item.thumbnail4Rec" :onerror="logo">
        <img :src="item.thumbnail4Rec" :onerror="logo">
      </div>
      <info-item :item="item" class="item3"></info-item>
    </div>
  </div>
</template>

<script>
import infoItem from './infoItem'
var _ = require('lodash-node')
export default {
  data () {
    return {
      logo: 'this.src="' + require('../../img/default.png') + '"'
    }
  },
  props: ['item'],
  components: {
    infoItem
  },
  methods: {
    cellType () {
      var data = this.item.imageInContent
      if (_.isArray(data) && data.length > 0) {
        if (data.length >= 3) {
          return 3
        }
        return 1
      }
      if (this.item.thumbnail4Rec) {
        return 1
      }
      return 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.cell {
  padding: .6rem .6rem .6rem .6rem;
  @include bottomline;
  width: 100%;
  h4 {
    @include sc($firFontSize, $firFontColor)
  }
  img {
    width: 5.55rem;
    height: 4.15rem;
    border-radius:.3rem;
    overflow: hidden;
    align-self: center;
  }
}
.cellnone {
  @include fdja(column, flex-start)
  width: 100%;
  div {
    text-align: left;
  }
  .item0 {
    margin-top: .6rem;
    width: 100%;
  }
}
.cellone {
  @include fdja(row, flex-start);
  width: 100%;
  height: 4.15rem;
  .left {
    flex: 1;
    height: 4.15rem;
    @include fdja(column, space-between, flex-start)
    padding: 0rem 0.6rem 0rem 0rem;
    .up {
      align-self: flex-start;
      flex: 3;
      width: 100%;
      text-align: left;
      @include sc($firFontSize, $firFontColor);
    }
    .item {
      width: 100%;
      flex: 1;
    }
  }
}
.cellthrid {
  @include fdja(column, flex-start);
  width: 100%;
  .imgs {
    margin-top: .6rem;
    @include fdja(row, space-between)
  }
  .item3 {
    text-align: left;
    margin-top: .6rem;
    width: 100%;
  }
}
</style>
