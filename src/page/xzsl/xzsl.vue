<template>
  <div id="app">
    <img src="../../img/thumb_xzsl@2x.png" style="width:100%">
    <div class="section">
        <div class="line"></div>
        <div class="tip">试炼说明说明</div>
    </div>
    <div class="desc">需要多人协作才能挑战星座的守护者;每日凌晨2点可以重新获得2次挑战机会;挑战时,所有英雄属性修正战斗力相同!</div>
    <div class="section">
        <div class="line"></div>
        <div class="tip">开放时间</div>
    </div>
    <div class="desc">17:30 - 24:00</div>
    <div class="section">
        <div class="line"></div>
        <div class="tip">混沌奖励</div>
    </div>
    <div >
      <div class="reward" v-for="(item,key) in items" :key="key" v-show="showmore?true:(key<4)">
        <img class="rewardimg" :src="item.icon" :onerror="logo">
        <div class="item">
          <div class="itemtitle">{{item.name}}</div>
          <div class="itemdesc">{{item.description}}</div>
        </div>
      </div>
      <div @click="clickmore()" class="bossname" style="font-size:0.75rem;color:#333">{{showmore?'收起更多':'显示更多'}}</div>
    </div>

    <div class="section">
        <div class="line"></div>
        <div class="tip">BOSS技能</div>
    </div>
    <div v-for="(item,key) in boss" :key="key" class="boss">
      <div class="bossname">{{item.name}}</div>
      <div v-for="(sub,subkey) in item.skill" :key="subkey" class="bossskill">
        <div class="skillname">{{sub.name}}</div>
        <div class="skilldesc">{{sub.description}}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      boss: [],
      items: [],
      showmore: false,
      logo: 'this.src="' + require('../../img/default.png') + '"'
    }
  },
  components: {},
  computed: {},
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.boss = window.CosBox.getBossInfo()
      this.items = window.CosBox.getBossDrops()
    },
    clickmore () {
      this.showmore = !this.showmore
    }
  }
}
</script>

<style scoped>
.section {
  margin-top: 1rem;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  display: flex;
  flex-direction: row;
}
.line {
  background-color: #e77e11;
  width: 0.2rem;
  height: 1rem;
}
.tip {
  font-size: 0.7rem;
  margin-left:0.4rem;
  color: #e77e11;
}
.desc {
  font-size: 0.7rem;
  color: #333;
  margin-top: 0.6rem;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
}
.reward {
  margin-left: 0.6rem;
  margin-top: 0.8rem;
  margin-right: 0.6rem;
  margin-bottom: 0.03rem;
  display: flex;
  flex-direction: row;
}
.rewardimg {
  width: 2.5rem;
  height: 2.5rem;
}
.item {
  margin-left: 0.4rem;
  display: flex;
  flex-direction: column;
}
.itemtitle {
  font-size: 0.7rem;
  color: #333;
  margin-top: 0.25rem;
}
.itemdesc {
  font-size: 0.6rem;
  color: #999;
  margin-top: 0.4rem;
}
.ranklist {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.rankleft {
  flex:1;
  text-align: center;
  font-size: 0.7rem;
  color: #333;
}
.rankright {
  flex:1;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.rankicon {
  /*display: flex;
  flex-direction: column;*/
  position: relative;
}

.boss {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bossname {
  font-size: 0.8rem;
  color: #e77e11;
  text-align: center;
  margin-top: 0.6rem;
}
.bossskill {
  display: flex;
  flex-direction: row;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  margin-top: 1.3rem;
}
.skillname {
  font-size: 0.7rem;
  color: #e88c46;
}
.skilldesc {
  flex: 1;
  font-size: 0.7rem;
  color: #333;
  margin-left: .4rem;
}

</style>
