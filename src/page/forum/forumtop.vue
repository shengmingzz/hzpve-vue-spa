<template>
  <div style="width:100%;">
    <div class="cell">
      <forum-header :item="item.author"></forum-header>
      <div  class="cellnone">
        <div class="title">{{item.title}}
        </div>
        <div class="time">2018-03-07</div>
        <div class="detail">{{item.content}}</div>
      </div>
    </div>

    <div class="imgcontainer"  v-if="item.imagesWith">
      <section v-for="(imgsrc,key) in item.imagesWith" :key="key" class="imgsection" :style="imgsectionstyle(item, key)">
        <img :src="getImg(imgsrc, item.imagesWith.length, key)" :onerror="logo" class="forumimg" :style="imgstyle(item)">
      </section>
    </div>
  </div>

</template>

<script>
import forumItem from './forumitem'
import forumHeader from './forumheader'
var _ = require('lodash-node')
export default {
  data () {
    return {
      logo: 'this.src="' + require('../../img/default.png') + '"'
    }
  },
  props: ['item'],
  components: {
    forumItem,
    forumHeader
  },
  methods: {
    cellType () {
      var data = this.item.imagesWith
      if (_.isArray(data) && data.length > 0) {
        if (data.length >= 3) {
          return 3
        }
        return 1
      }
      return 0
    },
    containerStyle (item) {
      var count = item.imagesWith.length
      if (count === 0) {
        return 'width:0rem;height:0rem;'
      } else if (count === 1) {
        return 'width:18.75rem;height:18.75rem;'
      } else if (count === 2) {
        return 'width:18.75rem;height:9.375rem;'
      } else if (count === 3 || count === 4) {
        return 'width:18.75rem;height:18.75rem;'
      } else if (count === 5 || count === 6) {
        return 'width:18.75rem;height:12.5rem;'
      } else { // 7 8 9
        return 'width:18.75rem;height:18.75rem;'
      }
    },
    imgsectionstyle (item, index) {
      var count = item.imagesWith.length
      if (count === 0) {
        return 'width:0rem;height:0rem;'
      } else if (count === 1) {
        return 'width:100%;height:18rem;'
      } else if (count === 2) {
        return 'width:50%;height:9rem;'
      } else if (count === 3 || count === 4) {
        return 'width:50%;height:9rem;'
      } else if (count === 5 || count === 6) {
        return 'width:33%;height:6rem;'
      } else { // 7 8 9
        return 'width:33%;height:6rem;'
      }
    },
    imgstyle (item) {
      // return 'max-width:100%;max-height:100%;'
    },
    getImg (src, total, index) {
      if (total === 1) {
        return src + '?imageView2/1/w/400/h/400/interlace/1'
      } else if (total < 4) {
        return src + '?imageView2/1/w/200/h/200/interlace/1'
      } else {
        return src + '?imageView2/1/w/140/h/140/interlace/1'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.cell {
  padding: .2rem .6rem .6rem .6rem;
  @include bottomline;
  width: 100%;
  h4 {
    @include sc($firFontSize, $firFontColor)
  }
}
.cellnone {
  @include fdja(column, flex-start)
  width: 100%;
  .title{
    text-align: left;
    @include sc($firFontSize, $firFontColor);
  }
  .time {
    text-align: left;
    @include sc($secFontSize, $secFontColor);
    margin-top: .2rem;
  }
  .detail {
    text-align: left;
    @include sc(0.6rem, $secFontColor);
    margin-top: .2rem;
  }
}
.imgcontainer {
    justify-content: 'space-around';
    align-items: 'flex-start';
    // background-color: #fefefe;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    margin: .5rem .5rem .1rem .5rem;
  }
  .imgsection {
    // background-color: #fefefe;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .1rem .1rem;
  }
  .forumimg {
    overflow: hidden;
    border-radius: .3rem;
  }

</style>
