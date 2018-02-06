<template>
  <div class="page-tab-container">
    <wj-tabbar :titles="['最新', '视频', '公告', '新闻']" :ids="['1', '2', '3', '4']" v-model="selected">
    </wj-tabbar>

    <!-- tab-container -->
    <wj-tab-container v-model="selected">
      <wj-tab-container-item id="1">
        <infoList type="0"></infoList>
      </wj-tab-container-item>
      <wj-tab-container-item id="2">
        <infoList type="2"></infoList>
      </wj-tab-container-item>
      <wj-tab-container-item id="3">
        <infoList type="3"></infoList>
      </wj-tab-container-item>
      <wj-tab-container-item id="4">
        <infoList type="1"></infoList>
      </wj-tab-container-item>
    </wj-tab-container>
  </div>
</template>
<script>
import wjTabContainer from '../../components/tab-container/tab-container'
import wjTabContainerItem from '../../components/tab-container/tab-container-item'
import wjTabbar from '../../components/tab-bar/tab-bar'
import infoList from './infolist'
export default {
  data () {
    return {
      selected: '1'
    }
  },
  components: {wjTabContainer, wjTabContainerItem, infoList, wjTabbar},
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
