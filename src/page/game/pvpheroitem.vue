<template>
  <div id="app">
    <div class="head" v-if="hero != null">
      <img class="icon" :src="hero.icon" :onerror="logo">
      <div class="info">
        <div class="name">{{hero.name}}</div>
        <div class="name" style="font-size:.6rem;">{{hero.position}}</div>

        <div class="progress">
          <div class="bot">物理:</div>
          <progress-bar class="progressbar" topColor="#ff5b62" backColor="#d0d0d0" :percent="hero.physical*10 + '%'"></progress-bar>
        </div>
        <div class="progress">
          <span class="bot">法术:</span>
          <progress-bar class="progressbar" topColor="#7397fd" backColor="#d0d0d0" :percent="hero.magic*10 + '%'"></progress-bar>
        </div>
        <div class="progress">
          <span class="bot">生存:</span>
          <progress-bar class="progressbar" topColor="#5ad473" backColor="#d0d0d0" :percent="hero.existence*10 + '%'"></progress-bar>
        </div>
        <div class="progress">
          <span class="bot">难度:</span>
          <progress-bar class="progressbar" topColor="#ffbb5b" backColor="#d0d0d0" :percent="hero.difficult*10 + '%'"></progress-bar>
        </div>
      </div>
    </div>

    <div class="page-tab-container">
      <!-- <tab :line-width=2 active-color='#e77e11' v-model="currentIndex" >
        <tab-item class="vux-center" :selected="containerId === 'a'" @on-item-click="clickTab('a')" >英雄技能</tab-item>
        <tab-item class="vux-center" :selected="containerId === 'b'" @on-item-click="clickTab('b')" >推荐出装</tab-item>
      </tab> -->
      <wj-tabbar :titles="titles" :ids="ids" v-model="containerId">
      </wj-tabbar>
      <wj-tab-container class="page-tabbar-tab-container" v-model="containerId" swipeable>
        <wj-tab-container-item id="a">
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
        </wj-tab-container-item>
        <wj-tab-container-item id="b">
          <div v-if="equipt1.length">
            <sec-header v-if="equipt1.length" :tip="'推荐出装: ' + hero.equip_tip1"></sec-header>
            <div class="container">
              <a v-for="(item,key) in equipt1" :key="key" class="cell-main" @click="clickItem(item.code)">
                <img :src="item.icon" class="cell-img">
                <div class="cell-text">{{item.name}}</div>
              </a>
            </div>
          </div>

          <div v-if="equipt2.length">
            <sec-header v-if="equipt2.length" :tip="'推荐出装: ' + hero.equip_tip2"></sec-header>
            <div class="container">
              <a v-for="(item,key) in equipt2" :key="key" class="cell-main" @click="clickItem(item.code)">
                <img :src="item.icon" class="cell-img">
                <div class="cell-text">{{item.name}}</div>
              </a>
            </div>
          </div>

          <div v-if="equipt3.length">
            <sec-header v-if="equipt3.length" :tip="'推荐出装: ' + hero.equip_tip3"></sec-header>
            <div class="container">
              <a v-for="(item,key) in equipt3" :key="key" class="cell-main" @click="clickItem(item.code)">
                <img :src="item.icon" class="cell-img">
                <div class="cell-text">{{item.name}}</div>
              </a>
            </div>
          </div>
        </wj-tab-container-item>

      </wj-tab-container>
    </div>
  </div>
</template>

<script>
import wjTabContainer from '../../components/tab-container/tab-container'
import wjTabContainerItem from '../../components/tab-container/tab-container-item'
// import { Tab, TabItem } from 'vux'
import secHeader from '@/components/secHeader'
import progressBar from '@/components/progress'
import {getPvpHero} from '../data/pvphero'
import {getHeroSkill} from '../data/pvpskill'
import {getHeroEquip} from '../data/pvpitem'
import wjTabbar from '../../components/tab-bar/tab-bar'

export default {
  data () {
    return {
      logo: 'this.src="' + require('../../img/default.png') + '"',
      hero: {},
      skills: [],
      index: 0,
      active: 0,
      currentIndex: 0,
      containerId: 'a',
      equipt1: [],
      equipt2: [],
      equipt3: [],
      titles: ['英雄技能', '推荐出装'],
      ids: ['a', 'b']
    }
  },
  components: {wjTabContainer, wjTabContainerItem, secHeader, progressBar, wjTabbar},
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
        this.equipt1 = getHeroEquip(this.hero.equip1)
        this.equipt2 = getHeroEquip(this.hero.equip2)
        this.equipt3 = getHeroEquip(this.hero.equip3)
      }
    },
    clickTab (data) {
      this.containerId = data
      if (data === 'a') {
        this.currentIndex = 0
      } else {
        this.currentIndex = 1
      }
    },
    clickItem (code) {
      this.$router.push({path: '/pvpitem/' + code})
    }
  },
  watch: {
    // containerId: function setCurrent (value) {
    //   if (value === 'a') {
    //     this.currentIndex = 0
    //   } else if (value === 'b') {
    //     this.currentIndex = 1
    //   }
    // }
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
  /*justify-content: space-around;*/
  margin-left: .6rem;
}
.name {
  margin-top: 0rem;
  font-size: .7rem;
  color: #333;
}
.progress {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: .15rem;
}
.progressbar {
  height:.6rem;width:8rem;
  align-items: center;
  display: flex;
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
  margin-right: .3rem;
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
.container {
    justify-content: 'space-around';
    align-items: 'flex-start';
    background-color: #eee;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    margin: .5rem .5rem .1rem .5rem;
  }
.cell-main {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.cell-img {
  display: block;
  height: 2.8rem;
  width: 2.8rem;
  border-radius: .3rem;
}
.cell-text {
  font-size: 0.5rem;
  margin-top: 0.2rem;
  margin-bottom: 0.8rem;
  text-align: center;
  color: #666;
}
</style>
