<template>
  <div class="page">

    <section class="change_show_type" ref="chooseType">
        <div>
            <span :class='{activity_show: changeShowType =="1"}' @click="changeShowType='1'">全部</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="2"}' @click="changeShowType='2'">虎牙</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="3"}' @click="changeShowType='3'">触手</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="4"}' @click="changeShowType='4'">龙珠</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="5"}' @click="changeShowType='5'">斗鱼</span>
        </div>
    </section>
    <section class="container">
      <transition name="fade-choose">
        <section v-show="changeShowType ==='1'" v-if="changeShowType === '1'" class="item_container">
          <tv-list class="item" type="0" refstr='tvzero'></tv-list>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='2'" v-if="changeShowType === '2'" class="item_container">
          <tv-list class="item" type="1" refstr='tvsec'></tv-list>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='3'" v-if="changeShowType === '3'" class="item_container">
          <tv-list class="item" type="2" refstr='tvthr'></tv-list>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='4'" v-if="changeShowType === '4'" class="item_container">
          <tv-list class="item" type="3" refstr='tvfour'></tv-list>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='5'" v-if="changeShowType === '5'" class="item_container">
          <tv-list class="item" type="4" refstr='tvfir'></tv-list>
        </section>
      </transition>
    </section>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
import tvList from './tvlist'
// import infoList from './infoData'
import footGuide from '../home/foot'
export default {
  data () {
    return {
      changeShowType: '1'
    }
  },
  components: {tvList, footGuide},
  computed: {},
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.change_show_type {
    display: flex;
    background-color: #fff;
    padding: .3rem 0 .6rem;
    border-bottom: 1px solid #ebebeb;
    position: fixed;
    top: 0rem;right:0rem;left:0rem;
    height: 2.2rem;
    div{
        flex: 1;
        text-align: center;
        span{
            @include sc(.65rem, #666);
            padding: .2rem .1rem;
            border-bottom: 0.12rem solid #fff;
        }
        .activity_show{
            color: $orange;
            border-color: $orange;
        }
    }
}
.item_container {
    display: flex;
    flex: 1;
    padding-bottom: 2rem;
    height: 100%;
}
.page {

}
.container {
  margin-top: 2.25rem;
}
</style>
