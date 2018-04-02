<template>
  <div class="page">

    <section class="change_show_type" ref="chooseType">
        <div>
            <span :class='{activity_show: changeShowType =="1"}' @click="changeShowType='1'">英雄图鉴</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="2"}' @click="changeShowType='2'">星座试炼</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="3"}' @click="changeShowType='3'">混沌遗迹</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="4"}' @click="changeShowType='4'">英魂祭坛</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="5"}' @click="changeShowType='5'">冒险之旅</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="6"}' @click="changeShowType='6'">竞技场</span>
        </div>
    </section>
    <section class="container">
      <transition name="fade-choose">
        <section v-show="changeShowType ==='1'" v-if="changeShowType === '1'" class="item_container">
          <yxtj-local class="item" type="0" refstr='infozero'></yxtj-local>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='2'" v-if="changeShowType === '2'" class="item_container">
          <xzsl-local class="item" type="1" refstr='infosec'></xzsl-local>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='3'" v-if="changeShowType === '3'" class="item_container">
          <hdyj-local class="item" type="1" refstr='infosec'></hdyj-local>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='4'" v-if="changeShowType === '4'" class="item_container">
          <yhjt-local class="item" type="1" refstr='infosec'></yhjt-local>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='5'" v-if="changeShowType === '5'" class="item_container">
          <mxzl-local class="item" type="1" refstr='infosec'></mxzl-local>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='6'" v-if="changeShowType === '6'" class="item_container">
          <jjc-local class="item" type="1" refstr='infosec'></jjc-local>
        </section>
      </transition>
    </section>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
import jjcLocal from '../jjc/jjclocal'
import mxzlLocal from '../mxzl/mxzllocal'
import xzslLocal from '../xzsl/xzsllocal'
import yhjtLocal from '../yhjt/yhjt'
import yxtjLocal from '../yxtj/yxtjlocal'
import hdyjLocal from '../hdyj/hdyjlocal'
// import infoList from './infoData'
import footGuide from '../home/foot'
export default {
  data () {
    return {
      changeShowType: '1'
    }
  },
  components: {jjcLocal, mxzlLocal, xzslLocal, yhjtLocal, yxtjLocal, hdyjLocal, footGuide},
  computed: {},
  created () {
    this.code = this.$route.params.id
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
