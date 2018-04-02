<template>
  <div class="cell">
    <forum-header :item="item.author"></forum-header>
    <div  class="cellnone">
      <div class="title">{{item.content}}
      </div>
      <div class="time">2018-03-07</div>
    </div>
    <div class="replycontainer" v-if="item.subReply.length">
      <section v-for="(subitem, key) in item.subReply" :key="key">
        <section class="subname">{{subitem.author.name}}:<span class="subcontent">{{subitem.content}}</span></section>
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
  img {
    @include wh(5.55rem, 4.15rem)
    border-radius:.3rem;
    overflow: hidden;
    align-self: center;
  }
}
.cellnone {
  @include fdja(column, flex-start)
  margin-left: 1.8rem;
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
.replycontainer {
  background-color: #eee;
  margin-top: .2rem;
  padding-top: .2rem;
  padding-bottom: .2rem;
  @include fdja(column, flex-start)
  margin-left: 1.8rem;
  .subname {
    margin-left: .2rem;
    text-align: left;
    @include sc(0.6rem, $blue);
    margin-top: .2rem;
  }
  .subcontent {
    margin-left: .2rem;
    text-align: left;
    @include sc(0.6, #666);
    margin-top: .2rem;
  }
}
</style>
