<template>
  <div class="page">

    <section class="change_show_type" ref="chooseType">
        <div>
            <span :class='{activity_show: changeShowType =="1"}' @click="changeShowType='1'">pvp英雄</span>
        </div>
        <div>
            <span :class='{activity_show: changeShowType =="2"}' @click="changeShowType='2'">pvp物品</span>
        </div>
    </section>
    <section class="container">
      <transition name="fade-choose">
        <section v-show="changeShowType ==='1'" v-if="changeShowType === '1'" class="item_container">
          <pvp-hero class="item" type="0" refstr='infozero'></pvp-hero>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType ==='2'" v-if="changeShowType === '2'" class="item_container">
          <pvp-item class="item" type="1" refstr='infosec'></pvp-item>
        </section>
      </transition>
    </section>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
import pvpItem from './pvpitem'
import pvpHero from './pvphero'
// import infoList from './infoData'
import footGuide from '../home/foot'
export default {
  data () {
    return {
      changeShowType: '1'
    }
  },
  components: {pvpItem, pvpHero, footGuide},
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
