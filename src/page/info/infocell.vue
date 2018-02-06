<template>
  <div class="cell">
    <div v-if="cellType()==0" class="cellnone">
      <h4>{{item.title}}
      </h4>
      <info-item :item="item" class="item0"></info-item>
    </div>

    <div v-if="cellType()==1" class="cellone">
      <div class="left">
        <div class="up">
          <h4>{{item.title}}
          </h4>
        </div>
        <info-item :item="item" class="item"></info-item>
      </div>
      <img :src="item.thumbnail4Rec" :onerror="logo">
    </div>

    <div v-if="cellType()==3" class="cellthrid">
      <h4>{{item.title}}
      </h4>
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
.cell {
  padding: .6rem .6rem .6rem .6rem;
  border-bottom: .03rem solid #dddddd;
  width: 100%;
  h4{font-size: .7rem;color: #333;}
  img {
    width: 5.55rem;
    height: 4.15rem;
    border-radius:.3rem;
    overflow: hidden;
    align-self: center;
  }
}
.cellnone {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  .item0 {
    margin-top: .6rem;
    width: 100%;
  }
}
.cellone {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 4.15rem;
  .left {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0rem 0.6rem 0rem 0rem;
    .up {
      flex: 1;
      width: 100%;

      margin-top: 0.45rem;
    }
    .item {
      width: 100%;
      margin-bottom: .3rem
    }
  }
}
.cellthrid {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  .imgs {
    margin-top: .6rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .item3 {
    margin-top: .6rem;
    width: 100%;
  }
}
</style>
