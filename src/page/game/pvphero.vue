<template>
  <div id="app">
    <div style="margin-top:1rem;"></div>
    <div>
      <sec-header tip="力量型"></sec-header>
      <div class="container">
        <a v-for="(item,key) in phyHero" :key="key" class="cell-main" @click="clickHeroItem(item)">
          <img :src="item.icon" class="cell-img">
          <div class="cell-text">{{item.name}}</div>
        </a>
      </div>
    </div>

    <div>
      <sec-header tip="敏捷型"></sec-header>
      <div class="container">
        <a v-for="(item,key) in dexHero" :key="key" class="cell-main" @click="clickHeroItem(item)">
          <img :src="item.icon" class="cell-img">
          <div class="cell-text">{{item.name}}</div>
        </a>
      </div>
    </div>

    <div>
      <sec-header tip="智力型"></sec-header>
      <div class="container">
        <a v-for="(item,key) in intHero" :key="key" class="cell-main" @click="clickHeroItem(item)">
          <img :src="item.icon" class="cell-img">
          <div class="cell-text">{{item.name}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {getPhyiscal, getDexterity, getIntelligence} from '../data/pvphero'
import secHeader from '@/components/secHeader'
export default {
  data () {
    return {
      phyHero: [],
      dexHero: [],
      intHero: []
    }
  },
  components: {secHeader},
  computed: {},
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.phyHero = getPhyiscal()
      this.dexHero = getDexterity()
      this.intHero = getIntelligence()
    },
    clickHeroItem (item) {
      var agent = navigator.userAgent
      if (agent.indexOf('hehbox') >= 0) {
        window.location.href = 'hzbox://com.nd.he.box/pvehero?code=' + item.code
      } else {
        this.$router.push({path: '/herolocal', query: {'code': item.code}})
      }
    }
  }
}
</script>

<style scoped>
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
  height: 3.25rem;
  width: 3.25rem;
  border-radius: .3rem;
}
.cell-text {
  font-size: 0.5rem;
  margin-top: 0.2rem;
  margin-bottom: 0.8rem;
  text-align: center;
  color: #666;
}
.star {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0rem;
  margin-bottom: .6rem;
  margin-left: .6rem;
  margin-right: .6rem;
}
.starimg {

}
</style>
