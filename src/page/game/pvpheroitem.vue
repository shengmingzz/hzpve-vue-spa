<template>
  <div id="app">
    <div class="head" v-if="hero != null">
      <img class="icon" :src="hero.icon" :onerror="logo">
      <div class="info">
        <div class="star">
          <div style="margin-right:.4rem;">{{hero.name}}</div>
          <img v-for="(ind) in hero.star_num" :key="ind" src="../../img/hero_star@2x.png" style="width:0.8rem;height:0.8rem;margin-right:0.2rem;">
        </div>
        <div class="data">
          <div class="item">
            <div class="top">{{hero.attack}}</div>
            <div class="bot">攻击</div>
          </div>
          <div class="item">
            <div class="top">{{hero.spll_power}}</div>
            <div class="bot">法强</div>
          </div>
          <div class="item">
            <div class="top">{{hero.life}}</div>
            <div class="bot">生命</div>
          </div>
        </div>
        <div class="data">
          <div class="item">
            <div class="top">{{hero.mana}}</div>
            <div class="bot">法力</div>
          </div>
          <div class="item">
            <div class="top">{{hero.defense}}</div>
            <div class="bot">护甲</div>
          </div>
          <div class="item">
            <div class="top">{{hero.spellresist}}</div>
            <div class="bot">魔抗</div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div>
       <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper vux-center">{{item}} Container</div>
        </swiper-item>
      </swiper>
    </div> -->

    <div>
       <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="index === 0" @click="index = 0" >英雄技能</tab-item>
        <tab-item class="vux-center" :selected="index === 1" @click="index = 1" >背景故事</tab-item>
      </tab>
      <swiper v-model="index" :show-dots="false">
        <swiper-item>
          <div>
            <div class="skill" v-for="(item,key) in skills" :key="key">
              <img :src="item.icon" class="skillicon" :onerror="logo">
              <div class="skillinfo">
                <div class="skilltitle">{{item.name}}</div>
                <div class="skilldesc"><span v-if="item.skill_CD">冷却: {{item.skill_CD}}秒</span><span v-if="item.expend_MP">  耗蓝: {{item.expend_MP}}</span><span v-if="item.distance">  射程: {{item.distance}}</span></div>
                <div class="skilldesc">{{item.description}}</div>
                <pre class="skillother">{{item.tip}}</pre>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item>
          <pre class="story">
            {{hero.name}}
          </pre>
        </swiper-item>
      </swiper>
    </div>

  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import {getPvpHero} from '../data/pvphero'
import {getHeroSkill} from '../data/pvpskill'

export default {
  data () {
    return {
      logo: 'this.src="' + require('../../img/default.png') + '"',
      hero: {},
      skills: [],
      index: 0
    }
  },
  components: {Tab, TabItem, Swiper, SwiperItem},
  computed: {},
  created () {
    this.code = this.$route.params.id
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.hero = getPvpHero(this.code)
      if (this.hero !== null) {
        this.skills = getHeroSkill(this.hero)
      }
    }
  }
}
</script>

<style scoped>
.head {
  display: flex;
  flex-direction: row;
  margin: 1rem .6rem;
}
.icon {
  border-radius: .1rem;
  width: 6rem;
  height: 6rem;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: .6rem;
}
.star {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0rem;
  /*margin-bottom: .6rem;*/
  /*margin-left: .6rem;*/
  /*margin-right: .6rem;*/
  font-size: .7rem;
  color: #333;
}
.data {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.item {
  display: flex;
  font-size: .7rem;
  margin-right: 2rem;
  flex-flow: column wrap;
}
.top {
  font-size: .7rem;
  color: #c88c46;
}
.bot {
  font-size: .6rem;
  color: #666;
}
.menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom:  .6rem;
  /*margin-bottom: .6rem;*/
  border-bottom: .025rem solid #eee;
}
.menuitem {
  flex: 1;
  text-align: center;
  font-size: 0.7rem;
  color: #999;
}

.skill {
  display: flex;
  flex-direction: row;
  /*align-items: center;*/
  justify-content: flex-start;
  margin-left: .6rem;
  /*margin-top: .8rem;*/
  margin-right: .6rem;
}
.skillicon {
  margin-top: 0.8rem;
  width: 3.3rem;
  height: 3.3rem;
}
.skillinfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0.4rem;
}
.skilltitle {
  margin-top: 1rem;
  font-size: .7rem;
  color: #333;
}
.skilldesc {
  font-size: .6rem;
  color: #666;
  margin-top: .6rem;
}
.skillother {
  font-size: .6rem;
  color: #c88c46;
  margin-top: .6rem;
}
.story {
  margin-left: .6rem;
  margin-top: .8rem;
  margin-right: .6rem;
  font-size: 0.7rem;
  color: #333;
  line-height: 1.4rem;
}
.app {
  display: flex;
  flex-direction: column;
}
</style>
