<template>
  <div class="page">

    <section class="change_show_type" ref="chooseType">
        <div>
            <span :class='{activity_show: changeShowType =="1"}' @click="changeShowType='1'">最新</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="2"}' @click="changeShowType='2'">视频</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="3"}' @click="changeShowType='3'">公告</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="4"}' @click="changeShowType='4'">新闻</span>
        </div>
    </section>
    <section class="container">
      <transition name="fade-choose">
        <section v-show="changeShowType ==='1'" v-if="changeShowType === '1'" class="item_container">
          <info-list class="item" type="0" refstr='infozero'></info-list>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='2'" v-if="changeShowType === '2'" class="item_container">
          <info-list class="item" type="2" refstr='infosec'></info-list>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='3'" v-if="changeShowType === '3'" class="item_container">
          <info-list class="item" type="3" refstr='infothr'></info-list>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='4'" v-if="changeShowType === '4'" class="item_container">
          <info-list class="item" type="1" refstr='infofir'></info-list>
        </section>
      </transition>
    </section>
  </div>
</template>
<script>
import infoList from './infolist'
// import infoList from './infoData'
export default {
  data () {
    return {
      changeShowType: '1'
    }
  },
  components: {infoList},
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
