<template>
  <div id="app">
    <img src="../../img/thumb_mxzl@2x.png" style="width:100%" @click="tapArticle(1,2)">
    <div class="chapter" v-for="(item, key) in datas" :key="key">
      <div class="charptertitle">{{item.name}}</div>
      <img class="charpterline" src="../../img/break_line@2x.png">

      <div class="mission"  v-for="(mission, subkey) in item.mission" :key="subkey" >
        <div @click="tapArticle(key,subkey)" class="missiontitle">{{mission.name}}</div>
        <div class="missiondetail" v-if="artickkey == key + '-' + subkey + '-' + difficult" :data="artickkey">
          <!-- 中间展开隐藏一块 -->
          <div class="missionsitution">
            <div class="missioncondition">
              <div class="section" style="margin-top:0rem;margin-left:0rem;">
                  <div class="line"></div>
                  <div class="tip">通关条件</div>
              </div>
              <div class="star" style="margin-top:0.6rem;">
                <img src="../../img/hero_star@2x.png" style="width:0.8rem;height:0.8rem;margin-right:0.4rem;">
                {{conditionOneDesc(mission)}}
              </div>
              <div class="star" style="margin-top:0.6rem;">
                <img src="../../img/hero_star@2x.png" style="width:0.8rem;height:0.8rem;margin-right:0.4rem;">
                {{conditionTwoDesc(mission)}}
              </div>
              <div class="star" style="margin-top:0.6rem;">
                <img src="../../img/hero_star@2x.png" style="width:0.8rem;height:0.8rem;margin-right:0.4rem;">
                {{conditionThrDesc(mission)}}
              </div>
            </div>
            <div class="missondiff">
              <div class="section" style="margin-top:0rem;margin-left:0rem;">
                  <div class="line"></div>
                  <div class="tip">关卡难度</div>
              </div>
              <div class="diff">
                <div class="diffdiv">
                  <img class="difficon" @click="clickDifficultNormal()" :src="difficult==1?normallight:normalgray">
                  <div class="difftext">普通</div>
                </div>
                <div class="diffdiv">
                  <img class="difficon" @click="clickDifficultHard()" :src="difficult==2?hardlight:hardgray">
                  <div class="difftext">精英</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 战斗力 -->
          <div class="section">
              <div class="line"></div>
              <div class="tip">推荐战斗力</div>
          </div>
          <div class="desc">{{conditionPowerDesc(mission)}}</div>
          <!-- 奖励 -->
          <div class="section">
              <div class="line"></div>
              <div class="tip">通关奖励</div>
          </div>
        </div>
        <div class="reward" v-for="(drop,ind) in showdrops(key, subkey)" :key="ind">
          <img class="rewardimg" :src="drop.icon" :onerror="logo" >
          <div class="item">
            <div class="itemtitle">{{drop.name}}</div>
            <div class="itemdesc">{{drop.description}}</div>
          </div>
        </div>
        <!-- 底线 -->
        <img class="charpterline" src="../../img/break_line@2x.png">
      </div>
    </div>
  </div>
</template>

<script>
import {chaterData} from '../data/chater'
import {dropData} from '../data/drop'
var _ = require('lodash-node')
export default {
  data () {
    return {
      logo: 'this.src="' + require('../../img/default.png') + '"',
      datas: [],
      drops: [],
      missionDrops: [],
      index: -1,
      subindex: -1,
      difficult: 1,
      artickkey: '',
      hardgray: require('../../img/level_difficulty_off@2x.png'),
      hardlight: require('../../img/level_difficulty_on@2x.png'),
      normalgray: require('../../img/level_normal_off@2x.png'),
      normallight: require('../../img/level_normal_on@2x.png')
    }
  },
  components: {},
  computed: {},
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.datas = chaterData
      this.drops = dropData
    },
    tapArticle (key, subkey) {
      if (this.index === key && this.subindex === subkey) {
        this.index = -1
        this.subindex = -1
      } else {
        this.index = key
        this.subindex = subkey
      }
      this.artickkey = this.index + '-' + this.subindex + '-' + this.difficult
      this.missionDrops = [...this.getdrops(this.datas[this.index].mission[this.subindex])]
    },
    isShowDetail (key, subkey) {
      if (this.index === key && this.subindex === subkey) {
        return true
      }
      return false
    },
    clickDifficultNormal () {
      if (this.difficult === 1) {
        return
      }
      this.difficult = 1
      this.artickkey = this.index + '-' + this.subindex + '-' + this.difficult
      this.missionDrops = [...this.getdrops(this.datas[this.index].mission[this.subindex])]
    },
    clickDifficultHard () {
      if (this.difficult === 21) {
        return
      }
      this.difficult = 2
      this.artickkey = this.index + '-' + this.subindex + '-' + this.difficult
      this.missionDrops = [...this.getdrops(this.datas[this.index].mission[this.subindex])]
    },
    conditionOneDesc (item) {
      var desc = ''
      var details = item.details
      if (Array.isArray(details)) {
        for (var i = 0; i < details.length; i++) {
          desc = details[i].condition1
          if (details[i].difficult === this.difficult) {
            return desc
          }
        }
      }
      return desc
    },
    conditionTwoDesc (item) {
      var desc = ''
      var details = item.details
      if (Array.isArray(details)) {
        for (var i = 0; i < details.length; i++) {
          desc = details[i].condition2
          if (details[i].difficult === this.difficult) {
            return desc
          }
        }
      }
      return desc
    },
    conditionThrDesc (item) {
      var desc = ''
      var details = item.details
      if (Array.isArray(details)) {
        for (var i = 0; i < details.length; i++) {
          desc = details[i].condition3
          if (details[i].difficult === this.difficult) {
            return desc
          }
        }
      }
      return desc
    },
    conditionPowerDesc (item) {
      var desc = ''
      var details = item.details
      if (Array.isArray(details)) {
        for (var i = 0; i < details.length; i++) {
          desc = details[i].power
          if (details[i].difficult === this.difficult) {
            return desc
          }
        }
      }
      return desc
    },
    showdrops (index, subindex) {
      if (this.index === index && this.subindex === subindex) {
        return this.missionDrops
      }
      return []
    },
    getdrops (mission) {
      var item = {}
      var find = false
      var details = mission.details
      if (Array.isArray(details)) {
        for (var i = 0; i < details.length; i++) {
          if (details[i].difficult === this.difficult) {
            find = true
            item = details[i]
          }
        }
      }
      if (find) {
        var dropcodes = []
        if (parseInt(item.drop_item_1) > 0) {
          dropcodes.push(parseInt(item.drop_item_1))
        }
        if (parseInt(item.drop_item_2) > 0) {
          dropcodes.push(parseInt(item.drop_item_2))
        }
        if (parseInt(item.drop_item_3) > 0) {
          dropcodes.push(parseInt(item.drop_item_3))
        }
        if (parseInt(item.drop_item_4) > 0) {
          dropcodes.push(parseInt(item.drop_item_4))
        }
        if (parseInt(item.drop_item_5) > 0) {
          dropcodes.push(parseInt(item.drop_item_5))
        }
        var dropitems = []
        // dropitems = window.CosBox.queryBossDrops(dropcodes.join(','))
        // dropitems = this.getItem(dropcodes.join(','))
        for (var j = 0; j < this.drops.length; j++) {
          var exist = _.indexOf(dropcodes, parseInt(this.drops[j].code))
          if (exist >= 0) {
            dropitems.push(this.drops[j])
          }
        }
        return dropitems
      } else {
        return []
      }
    },
    getItem (data) {
    }
  }
}
</script>

<style scoped>
div {
  word-wrap: break-word;
  word-break: break-all;
  word-spacing: normal;
}
.section {
  margin-top: 1rem;
  margin-left: 1.2rem;
  margin-right: 0rem;
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
  margin-left: 1.2rem;
  margin-right: 0.6rem;
}

.reward {
  margin-top: 0.8rem;
  margin-right: 0.6rem;
  margin-bottom: 0.03rem;
  display: flex;
  flex-direction: row;
  margin-left: 1.2rem;
}
.rewardimg {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: .2rem;
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

.chapter {
  width: 100%;
}
.charptertitle {
  font-size: 0.7rem;
  color: #e77e11;
  text-align: center;
  margin-top: 1.5rem;
}
.charpterline {
  margin-top: 0.8rem;
  margin-bottom: 0.6rem;
  height: 0.4rem;
  align-self: center;
}
.mission {
  width: 100%;
}
.missiontitle {
  font-size: 0.7rem;
  color: #333;
  text-align: center;
}
.missiondetail {
  width: 100%;
  margin-top: 1.25rem;
  margin-bottom: 1.2rem;
}
.missionsitution {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.missioncondition {
  margin-left: 1.2rem;
  flex: 1;
}
.missondiff {
  margin-left: 1.2rem;
  flex: 1;
}
.star {
  display: flex;
  flex-direction: row;
  font-size: 0.7rem;
  color: #333;
  line-height: 1rem;
}
.diff {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.diffdiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.difficon {
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.6rem 0.6rem 0rem 0.6rem;;
}
.difftext {
  margin-top: 0.2rem;
  font-size: 0.6rem;
  color: #333;
  text-align: center;
}
</style>
