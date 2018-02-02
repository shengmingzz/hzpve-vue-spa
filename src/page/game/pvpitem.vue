<template>
  <div id="app">
    <div style="margin-top:1rem;"></div>
    <div>
      <sec-header tip="物理"></sec-header>
      <div class="container">
        <a v-for="(item,key) in wuliItems" :key="key" class="cell-main" @click="clickItem(item)">
          <img :src="item.icon" class="cell-img">
          <div class="cell-text">{{item.name}}</div>
        </a>
      </div>
    </div>

    <div>
      <sec-header tip="法术"></sec-header>
      <div class="container">
        <a v-for="(item,key) in fashuItems" :key="key" class="cell-main" @click="clickItem(item)">
          <img :src="item.icon" class="cell-img">
          <div class="cell-text">{{item.name}}</div>
        </a>
      </div>
    </div>

    <div>
      <sec-header tip="生存"></sec-header>
      <div class="container">
        <a v-for="(item,key) in liveItems" :key="key" class="cell-main" @click="clickItem(item)">
          <img :src="item.icon" class="cell-img">
          <div class="cell-text">{{item.name}}</div>
        </a>
      </div>
    </div>

    <div>
      <sec-header tip="鞋子"></sec-header>
      <div class="container">
        <a v-for="(item,key) in speedItems" :key="key" class="cell-main" @click="clickItem(item)">
          <img :src="item.icon" class="cell-img">
          <div class="cell-text">{{item.name}}</div>
        </a>
      </div>
    </div>

    <div>
      <sec-header tip="侦查"></sec-header>
      <div class="container">
        <a v-for="(item,key) in detectItems" :key="key" class="cell-main" @click="clickItem(item)">
          <img :src="item.icon" class="cell-img">
          <div class="cell-text">{{item.name}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {getItemWuli, getItemFashu, getItemLive, getItemSpeed, getItemDetect} from '../data/pvpitem'
import secHeader from '@/components/secHeader'
export default {
  data () {
    return {
      wuliItems: [],
      fashuItems: [],
      liveItems: [],
      speedItems: [],
      detectItems: []
    }
  },
  components: {secHeader},
  computed: {},
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.wuliItems = getItemWuli()
      this.fashuItems = getItemFashu()
      this.liveItems = getItemLive()
      this.speedItems = getItemSpeed()
      this.detectItems = getItemDetect()
    },
    clickItem (item) {
      this.$router.push({path: '/pvpitem/' + item.code})
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
