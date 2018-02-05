<template>
  <div class="page-tab-container">
    <tab :line-width=2 active-color='#e77e11' v-model="currentIndex" >
      <tab-item class="vux-center" :selected="containerId === '1'" @on-item-click="clickTab('1')" >最新</tab-item>
      <tab-item class="vux-center" :selected="containerId === '2'" @on-item-click="clickTab('2')" >视频</tab-item>
      <tab-item class="vux-center" :selected="containerId === '3'" @on-item-click="clickTab('3')" >公告</tab-item>
      <tab-item class="vux-center" :selected="containerId === '4'" @on-item-click="clickTab('4')" >新闻</tab-item>
    </tab>
    <wj-tab-container class="page-tabbar-tab-container" v-model="containerId" swipeable>
      <wj-tab-container-item id="1">
        <div>1</div>
        <infoList type="0"></infoList>
      </wj-tab-container-item>
      <wj-tab-container-item id="2">
        <div>2</div>
        <infoList type="2"></infoList>
      </wj-tab-container-item>
      <wj-tab-container-item id="3">
        <div>3</div>
        <infoList type="3"></infoList>
      </wj-tab-container-item>
      <wj-tab-container-item id="4">
        <div>4</div>
        <infoList type="1"></infoList>
      </wj-tab-container-item>
    </wj-tab-container>
  </div>
</template>
<script>
import wjTabContainer from '../../components/tab-container/tab-container'
import wjTabContainerItem from '../../components/tab-container/tab-container-item'
import { Tab, TabItem } from 'vux'
import infoList from './infolist'
export default {
  data () {
    return {
      currentIndex: 0,
      containerId: '1'
    }
  },
  components: {Tab, TabItem, wjTabContainer, wjTabContainerItem, infoList},
  computed: {},
  created () {
    this.code = this.$route.params.id
  },
  mounted () {
  },
  methods: {
    clickTab (data) {
      this.containerId = data
      this.currentIndex = parseInt(data) - 1
    }
  }
}
</script>
<style scoped>
</style>
