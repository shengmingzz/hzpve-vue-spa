<template>
  <div id="app">
    <div class="head" v-if="item != null">
      <img class="icon" :src="item.icon" :onerror="logo">
      <div class="info">
        <div class="star">
          <div style="margin-right:.4rem;">{{item.name}}</div>
        </div>
        <pre class="infodesc">{{item.attributes}}</pre>
      </div>
    </div>
    <sec-header tip="附带技能"></sec-header>
    <pve class="desc">{{item.addition_skill_desc}}</pve>
    <sec-header tip="合成公式"></sec-header>
  </div>
</template>

<script>
import {getPvpItem} from '../data/pvpitem'
import secHeader from '@/components/secHeader'
export default {
  data () {
    return {
      logo: 'this.src="' + require('../../img/default.png') + '"',
      item: {}
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
</style>
