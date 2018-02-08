<template>
  <div class="page">
    <wj-tabbar class="bar" :titles="['最新', '视频', '公告', '新闻']" :ids="['1', '2', '3', '4']" v-model="selected">
    </wj-tabbar>
    <div class="container">
      <info-list class="item" type="0" v-show="selected === '1'"></info-list>
      <info-list class="item" type="2" v-show="selected === '2'"></info-list>
      <info-list class="item" type="3" v-show="selected === '3'"></info-list>
      <info-list class="item" type="1" v-show="selected === '4'"></info-list>
    </div>
    <!-- tab-container -->
    <!-- <wj-tab-container v-model="selected">
      <wj-tab-container-item id="1">
        <info-list type="0"></info-list>
      </wj-tab-container-item>
      <wj-tab-container-item id="2">
        <info-list type="2"></info-list>
      </wj-tab-container-item>
      <wj-tab-container-item id="3">
        <info-list type="3"></info-list>
      </wj-tab-container-item>
      <wj-tab-container-item id="4">
        <info-list type="1"></info-list>
      </wj-tab-container-item>
    </wj-tab-container> -->
  </div>
</template>
<script>
import wjTabContainer from '../../components/tab-container/tab-container'
import wjTabContainerItem from '../../components/tab-container/tab-container-item'
import wjTabbar from '../../components/tab-bar/tab-bar'
import infoList from './infolist'
import infoData from './infoData'
export default {
  data () {
    return {
      selected: '1',
      tabIndex: 0
    }
  },
  components: {wjTabContainer, wjTabContainerItem, infoList, wjTabbar, infoData},
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
.page {
  display: flex;
  flex-direction: column;
}
.bar {
  background-color: #fff;
  height: 2.2rem;
}
.container {
  flex: 1;
  /*display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;*/
  /*height: 100%;*/
}
.item {
  flex: 1;
}
</style>
