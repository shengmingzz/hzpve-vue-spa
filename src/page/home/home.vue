<template>
  <div id="app">
    <div style="margin-top:1rem;"></div>
    <div class="container">
      <a v-for="(item,key) in modules" :key="key" class="cell-main" @click="clickModule(key)">
        <img :src="item.icon" class="cell-img">
        <div class="cell-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modules: [
        {'title': '英雄图鉴', 'icon': require('../../img/raid_zzsl.jpg')},
        {'title': '星座试炼', 'icon': require('../../img/thumb_xzsl@2x.png')},
        {'title': '混沌遗迹', 'icon': require('../../img/thumb_hdyj@2x.png')},
        {'title': '英魂祭坛', 'icon': require('../../img/thumb_yhjt@2x.png')},
        {'title': '冒险之旅', 'icon': require('../../img/thumb_mxzl@2x.png')},
        {'title': '竞技场', 'icon': require('../../img/thumb_jjc@2x.png')},

        {'title': 'pvp-英雄', 'icon': require('../../img/raid_zzsl.jpg')},
        {'title': 'pvp-物品', 'icon': require('../../img/thumb_yhjt@2x.png')}
      ]
    }
  },
  components: {},
  computed: {},
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
    },
    clickModule (index) {
      if (index === 0) { // pve
        this.$router.push({path: '/yxtjlocal'})
      } else if (index === 1) {
        this.$router.push({path: '/xzsllocal'})
      } else if (index === 2) {
        this.$router.push({path: '/hdyjlocal'})
      } else if (index === 3) {
        this.$router.push({path: '/yhjtlocal'})
      } else if (index === 4) {
        this.$router.push({path: '/mxzllocal'})
      } else if (index === 5) {
        this.$router.push({path: '/jjclocal'})
      } else if (index === 6) { // pvp
        this.$router.push({path: '/pvphero'})
      } else if (index === 7) {
        this.$router.push({path: '/pvpitem'})
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
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: .2rem;
  overflow: hidden;
}
.cell-img {
  display: block;
  height: 5rem;
  width: 8rem;
  overflow: hidden;
  margin-left: .1rem;
  margin-right: .1rem;
}
.cell-text {
  font-size: 1rem;
  margin-top: 0.2rem;
  margin-bottom: 0.8rem;
  text-align: center;
  color: #333;
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
