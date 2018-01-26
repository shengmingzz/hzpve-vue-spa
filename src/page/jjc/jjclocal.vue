<template>
  <div id="app">
    <img src="../../img/thumb_jjc@2x.png" style="width:100%">
    <div class="section">
        <div class="line"></div>
        <div class="tip">奖励说明</div>
    </div>
    <div class="desc">1、提高竞技场历史最高排名可获得大量奖励！</div>
    <div class="desc">2、每日晚上21:00，根据您的竞技场排行，系统将会通过邮件发放每日排名奖励！</div>

    <div class="ranklist" style="margin-top:1.5rem;margin-bottom:0.45rem;">
      <div class="rankleft" style="color:#999;font-size:0.6rem">排名</div>
      <div class="rankright" style="color:#999;font-size:0.6rem">奖励</div>
    </div>
    <div class="ranklist" style="height:2.8rem;" v-for="(item,key) in rewards" :key="key">
      <div class="rankleft">{{item.rank}}</div>
      <div class="rankright">
        <div style="position:relative;width:1.6rem; height:1.6rem; border:0.02rem solid #ccc; text-align:center;">
          <img src="../../img/weekly_salary_crystal@2x.png" width="100%" height="100%">
          <span style="width:100%; height:0.6rem; line-height:0.6rem; position:absolute; bottom:0rem; left:0rem; right:0rem; color:#fff;font-size:0.5rem;text-align:center;">
            {{item.reward_num1}}
          </span>
        </div>
        <div style="position:relative;width:1.6rem; height:1.6rem; border:0.02rem solid #ccc; text-align:center;">
          <img src="../../img/weekly_salary_jjc@2x.png" width="100%" height="100%">
          <span style="width:100%; height:0.6rem; line-height:0.6rem; position:absolute; bottom:0rem; left:0rem; right:0rem; color:#fff;font-size:0.5rem;text-align:center;">
            {{item.reward_num2}}
          </span>
        </div>
        <div style="position:relative;width:1.6rem; height:1.6rem; border:0.02rem solid #ccc; text-align:center;">
          <img src="../../img/weekly_salary_dimensity@2x.png" width="100%" height="100%">
          <span style="width:100%; height:0.6rem; line-height:0.6rem; position:absolute; bottom:0rem; left:0rem; right:0rem; color:#fff;font-size:0.5rem;text-align:center;">
            {{item.reward_num3}}
          </span>
        </div>
      </div>
    </div>

    <div class="section">
        <div class="line"></div>
        <div class="tip">战斗规则</div>
    </div>
    <div class="desc">1、需要分别设置进攻队伍和防守队伍，2个队伍相互独立！</div>
    <div class="desc">2、在竞技场中无法进行操作，只能自动战斗！</div>
    <div class="desc">3、只有进攻方玩家获胜并且进攻方的当前排名低于防守方玩家，双方排名才会互换。</div>
    <div class="desc">4、五分钟内战斗结束,按进攻失败处理!</div>
    <div class="desc">5、每日凌晨2点,刷新五次免费的进攻机会,每次战斗结算都需要等待CD后,才能继续挑战。</div>
  </div>
</template>

<script>
import {jjcData} from '../data/jjc'
export default {
  data () {
    return {
      rewards: [
        {'rank': '第1名', 'reward_num1': '50k', 'reward_num2': '3000', 'reward_num3': '200'},
        {'rank': '第2、3名', 'reward_num1': '40k', 'reward_num2': '2500', 'reward_num3': '150'},
        {'rank': '第4~10名', 'reward_num1': '30k', 'reward_num2': '2000', 'reward_num3': '50'},
        {'rank': '第11~100名', 'reward_num1': '28k', 'reward_num2': '1500', 'reward_num3': '30'}
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
      this.rewards = jjcData
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

</style>
