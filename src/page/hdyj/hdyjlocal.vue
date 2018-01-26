<template>
  <div id="app">
    <img src="../../img/thumb_hdyj@2x.png" style="width:100%">
    <div class="section">
        <div class="line"></div>
        <div class="tip">玩法说明</div>
    </div>
    <div class="desc">远古战场的祭坛依然散发着混沌能量,率先获得2000混沌资源的一方获得胜利,胜利的关键就是占领祭坛!</div>
    <div class="section">
        <div class="line"></div>
        <div class="tip">开放时间</div>
    </div>
    <div class="desc">12:00 - 14:30    17:30 - 24:00</div>
    <div class="section">
        <div class="line"></div>
        <div class="tip">混沌奖励</div>
    </div>
    <div >
      <div class="reward" v-for="(item,key) in items" :key="key">
        <img class="rewardimg" :src="item.icon" :onerror="logo">
        <div class="item">
          <div class="itemtitle">{{item.name}}</div>
          <div class="itemdesc">{{item.description}}</div>
        </div>
      </div>
      <!-- <div @click="clickmore()" class="bossname" style="font-size:0.75rem;color:#333">{{showmore?'收起更多':'显示更多'}}</div> -->
    </div>

    <div class="section">
        <div class="line"></div>
        <div class="tip">军衔奖励</div>
    </div>
    <div class="ranklist" style="margin-top:1.5rem;margin-bottom:0.45rem;">
      <div class="rankright" style="color:#999;font-size:0.6rem">军衔</div>
      <div class="rankleft" style="color:#999;font-size:0.6rem">达成条件</div>
      <div class="rankleft" style="color:#999;font-size:0.6rem">奖励</div>
      <div class="rankright" style="color:#999;font-size:0.6rem">每周俸禄</div>
    </div>
    <div class="ranklist" style="height:2.8rem;" v-for="(item,key) in datas" :key="key">
      <div class="rankfirst" style="color:#333;font-size:0.5rem">
        <img :src="iconsrc(item)" style="width:1.6rem;height:1.6rem;overflow: hidden;margin-left:0.6rem;margin-right:0.4rem;">
        {{item.name}}</div>
      <div class="rankleft" style="color:#333;font-size:0.5rem">{{descRank(item)}}</div>
      <div class="rankleft">
        <img :src="knifesrc(item)" style="width:2.2rem;height:0.75rem;overflow: hidden;">
      </div>
      <div class="rankright">
        <div style="position:relative;width:1.6rem; height:1.6rem; border:0.02rem; solid #ccc; text-align:center;margin-right:.1rem;">
          <img src="../../img/weekly_salary_dimensity@2x.png" width="100%" height="100%">
          <span style="width:100%; height:0.6rem; line-height:0.6rem; position:absolute; bottom:0rem; left:0rem; right:0rem; color:#fff;font-size:0.5rem;text-align:center;">
            {{item.reward_num1}}
          </span>
        </div>
        <div style="position:relative;width:1.6rem; height:1.6rem; border:0.02rem; solid #ccc; text-align:center;">
          <img src="../../img/weekly_salary_crystal@2x.png" width="100%" height="100%">
          <span style="width:100%; height:0.6rem; line-height:0.6rem; position:absolute; bottom:0rem; left:0rem; right:0rem; color:#fff;font-size:0.5rem;text-align:center;">
            {{item.reward_num2}}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {hdyjData} from '../data/hdyj'
import {getMapDrop} from '../data/drop'
export default {
  data () {
    return {
      datas: [
      ],
      militarys: [],
      // logo: 'this.src="' + require('../../img/info_ads_default@2x.png') + '"'
      bloods: [],
      items: [],
      logo: 'this.src="' + require('../../img/default.png') + '"'
    }
  },
  components: {},
  computed: {},
  created () {
    this.initData()
  },
  mounted () {
    this.loadData()
  },
  methods: {
    initData () {
      this.items = getMapDrop('50003,50001,50004')
      this.militarys.push(require('../../img/military_rank_15@2x.png'))
      this.militarys.push(require('../../img/military_rank_14@2x.png'))
      this.militarys.push(require('../../img/military_rank_13@2x.png'))
      this.militarys.push(require('../../img/military_rank_12@2x.png'))
      this.militarys.push(require('../../img/military_rank_11@2x.png'))
      this.militarys.push(require('../../img/military_rank_10@2x.png'))
      this.militarys.push(require('../../img/military_rank_9@2x.png'))
      this.militarys.push(require('../../img/military_rank_8@2x.png'))
      this.militarys.push(require('../../img/military_rank_7@2x.png'))
      this.militarys.push(require('../../img/military_rank_6@2x.png'))
      this.militarys.push(require('../../img/military_rank_5@2x.png'))
      this.militarys.push(require('../../img/military_rank_4@2x.png'))
      this.militarys.push(require('../../img/military_rank_3@2x.png'))
      this.militarys.push(require('../../img/military_rank_2@2x.png'))
      this.militarys.push(require('../../img/military_rank_1@2x.png'))
      this.bloods.push(require('../../img/blood_15@2x.png'))
      this.bloods.push(require('../../img/blood_14@2x.png'))
      this.bloods.push(require('../../img/blood_13@2x.png'))
      this.bloods.push(require('../../img/blood_12@2x.png'))
      this.bloods.push(require('../../img/blood_11@2x.png'))
      this.bloods.push(require('../../img/blood_10@2x.png'))
      this.bloods.push(require('../../img/blood_9@2x.png'))
      this.bloods.push(require('../../img/blood_8@2x.png'))
      this.bloods.push(require('../../img/blood_7@2x.png'))
      this.bloods.push(require('../../img/blood_6@2x.png'))
      this.bloods.push(require('../../img/blood_5@2x.png'))
      this.bloods.push(require('../../img/blood_4@2x.png'))
      this.bloods.push(require('../../img/blood_3@2x.png'))
      this.bloods.push(require('../../img/blood_2@2x.png'))
      this.bloods.push(require('../../img/blood_1@2x.png'))
    },
    loadData () {
      this.datas = hdyjData
    },
    descRank (item) {
      var str = ''
      if (item.feat_value !== '0') {
        str += item.feat_value + '军衔经验'
      }
      if (item.rank_value > 0) {
        str += '\n军衔帮前' + item.rank_value
      }
      return str
    },
    iconsrc (item) {
      var code = parseInt(item.code) % 100 - 1
      return this.militarys[code]
    },
    knifesrc (item) {
      var code = parseInt(item.code) % 100 - 1
      return this.bloods[code]
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
.rankfirst {
  flex:1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.rankright {
  flex:1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.rankicon {
  /*display: flex;
  flex-direction: column;*/
  position: relative;
}

</style>
