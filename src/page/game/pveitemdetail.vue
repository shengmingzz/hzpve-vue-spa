<template>
  <div id="app">
    <div class="head" v-if="item != null">
      <img class="icon" :src="item.icon" :onerror="logo">
      <div class="info">
        <div style="margin-right:.4rem;">{{item.name}}</div>
        <pre class="infodesc">{{item.attributes}}</pre>
      </div>
    </div>
    <sec-header tip="附带技能"></sec-header>
    <pre class="desc">{{item.addition_skill_desc}}</pre>
    <sec-header tip="合成公式"></sec-header>
    <!-- equip 最多显示4层合成 -->
    <!-- first -->
    <div v-if="subItem.subs" class="first" style="margin-top:1.5rem;width:100%;">
      <img :src="subItem.icon" class="itemicon">
      <div class="itemdesc">{{subItem.name}}</div>
      <div class="itemprice">{{subItem.price}}</div>
      <div v-if="subItem.subs" style="width:.05rem;height:.6rem;background-color:#666;align-self:center;"></div>
      <div style="height:.05rem;background-color:#666;" :style="subItem.subs.length > 1 ? 'width:' + 100.0*(subItem.subs.length-1)/(subItem.subs.length) + '%;': 'width:0rem;'"></div>
      <!-- second -->
      <div v-if="subItem.subs" style="display:flex;flex-direction:row;margin-left:0.2rem;margin-right:0.2rem;width:100%">
        <div v-for="(sec,key1) in subItem.subs" :key="key1" style="flex:1;">
          <div style="display:flex;flex-direction:column;">
            <div style="width:.05rem;height:.6rem;background-color:#666;align-self:center;margin-bottom:.2rem;"></div>
            <img :src="sec.icon" class="itemicon">
            <div class="itemdesc">{{sec.name}}</div>
            <div class="itemprice">{{subItem.price}}</div>
            <div v-if="sec.subs" style="width:.05rem;height:.6rem;background-color:#666;align-self:center;"></div>
            <div v-if="sec.subs" style="height:.05rem;background-color:#666;align-self:center;" :style="sec.subs.length > 1 ? 'width:' + 100.0*(sec.subs.length-1)/(sec.subs.length) + '%;': 'width:0rem;'"></div>
            <!-- thrid -->
            <div v-if="sec.subs" style="display:flex;flex-direction:row;margin-left:0.2rem;margin-right:0.2rem;">
              <div v-for="(thr,key2) in sec.subs" :key="key2" style="flex:1;">
                <div style="display:flex;flex-direction:column;">
                  <div style="width:.05rem;height:.6rem;background-color:#666;align-self:center;margin-bottom:.2rem;"></div>
                  <img :src="thr.icon" class="itemicon" style="width:2.5rem;height:2.5rem;">
                  <div class="itemdesc" style="font-size:.5rem;">{{thr.name}}</div>
                  <div class="itemprice" style="font-size:.5rem;">{{thr.price}}</div>
                  <div v-if="thr.subs" style="width:.05rem;height:.6rem;background-color:#666;align-self:center;"></div>
                  <!-- <div style="height:.05rem;background-color:#666;" :style="thr.subs.length > 1 ? 'width:' + 100.0*(thr.subs.length-1)/(thr.subs.length) + '%;': 'width:0rem;'"></div> -->
                  <!-- four -->
                  <div v-if="thr.subs" style="display:flex;flex-direction:row;margin-left:0.2rem;margin-right:0.2rem;">
                    <div v-for="(four,key2) in thr.subs" :key="key2" style="flex:1;">
                      <div style="display:flex;flex-direction:column;">
                        <div style="width:.05rem;height:.6rem;background-color:#666;align-self:center;margin-bottom:.2rem;"></div>
                        <img :src="four.icon" class="itemicon" style="width:2.3rem;height:2.3rem;">
                        <div class="itemdesc" style="font-size:.45rem;">{{four.name}}</div>
                        <div class="itemprice" style="font-size:.45rem;">{{four.price}}</div>
                        <div v-if="four.subs" style="width:.05rem;height:.6rem;background-color:#666;align-self:center;"></div>
                        <!-- <div style="height:.05rem;background-color:#666;" :style="four.subs.length > 1 ? 'width:' + 100.0*(four.subs.length-1)/(four.subs.length) + '%;': 'width:0rem;'"></div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- end equip -->
  </div>
</template>

<script>
import {getPvpItem, getItemSubEquip} from '../data/pvpitem'
import secHeader from '@/components/secHeader'
export default {
  data () {
    return {
      logo: 'this.src="' + require('../../img/default.png') + '"',
      item: {},
      subItem: {},
      parentsItem: []
    }
  },
  components: {secHeader},
  computed: {},
  created () {
    this.code = this.$route.query.code
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.item = getPvpItem(this.code)
      this.subItem = getItemSubEquip(this.item)
    },
    widthPer (subnum) {
      if (subnum <= 1) {
        let data = { width: '0rem;' }
        console.log(JSON.stringify(data))
        return data
      }
      let data = {width: 100 * (subnum - 1) / subnum + '%;'}
      console.log(JSON.stringify(data))
      return data
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
  width: 4.5rem;
  height: 4.5rem;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: .6rem;
}
.infodesc {
  font-size: .6rem;
  color: #666;
}
.desc {
  margin-left: 1.2rem;
  margin-top: .1rem;
  margin-right: .6rem;
  font-size: 0.7rem;
  color: #333;
  line-height: 1.4rem;
}
.first {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  width: 100%;
}
.second {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex: 1
}
.thrid {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex: 1
}
.fouth {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex: 1
}
.itemicon {
  width: 2.8rem;
  height: 2.8rem;
  align-self: center;
  border-radius: .3rem;
}
.itemdesc {
  font-size: .6rem;
  color: #666;
  text-align: center;
}
.itemprice {
  font-size: .6rem;
  color: #c88c46;
  text-align: center;
}
</style>
