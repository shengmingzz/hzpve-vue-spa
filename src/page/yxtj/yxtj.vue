<template>
  <div id="app">
    <div style="margin-top:1rem;"></div>
    <div v-for="(subitems,index) in starheros" :key="index">
      <div class="star">
        <img v-for="(ind) in subitems[0].star_num" :key="ind" src="../../img/hero_star@2x.png" style="width:0.8rem;height:0.8rem;margin-right:0.2rem;">
      </div>
      <div class="container">
        <section v-for="(item,key) in subitems" :key="key" class="cell-main" @click="clickHeroItem(item)">
          <img :src="item.icon" class="cell-img">
          <div class="cell-text">{{item.name}}</div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      heros: [],
      starheros: []
    }
  },
  components: {},
  computed: {},
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.heros = window.CosBox.getHerosBook()
      var array = []
      if (Array.isArray(this.heros)) {
        var star = -1
        var subarray = []
        for (var i = 0; i < this.heros.length; i++) {
          var item = this.heros[i]
          if (i === 0) {
            star = parseInt(item.star_num)
          }
          if (star !== parseInt(item.star_num)) {
            array.push(subarray)
            subarray = []
            subarray.push(item)
            star = parseInt(item.star_num)
          } else {
            subarray.push(item)
          }
        }
      }
      array.push(subarray)
      this.starheros = [...array]
    },
    clickHeroItem (item) {
      this.$router.push({path: '/hero', query: {'code': item.code}})
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
