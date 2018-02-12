<template>
  <div class="page">
    <scroller :on-refresh="refresh" :onInfinite="loaderMore" :ref="refstr" refreshLayerColor="#333" loadingLayerColor="#333">
      <ul v-if="dataArray.length" class="container">
        <section v-for="(item,key) in dataArray" tag='li' :key="key" @click="tvClick(item)" class="tvitem">
          <img :src="item.thumbnail4Rec" class="img">
          <div class="text">{{item.title}}</div>
        </section>
      </ul>
      <ul v-else class="animation_opactiy">
        <li class="list_back_li" v-for="item in 10" :key="item">
          <img src="../../img/info/shopback.svg" class="list_back_svg">
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
import {getTv} from '../../api/info'

export default {
  data () {
    return {
      offset: 0,
      dataArray: [],
      preventRepeatReuqest: false, // 到达底部加载数据，防止重复加载
      showBackStatus: false, // 显示返回顶部按钮
      showLoading: true, // 显示加载动画
      touchend: false, // 没有更多数据
      limit: 10,
      code: 0,
      page: 1
    }
  },
  mounted () {
    this.$refs[this.refstr].triggerPullToRefresh()
  },
  components: {
  },
  props: ['type', 'refstr'],
  computed: {
  },
  created () {
    this.code = this.type
  },
  watch: {
    '$route' (to, from) {
    }
  },
  methods: {
    // 下拉刷新
    refresh (done) {
      var typestr = this.type === 0 ? 'recommend' : (this.type === 1 ? 'huya' : (this.type === 2 ? 'chushou' : (this.type === 3 ? 'longzhu' : 'douyu')))
      getTv(1, typestr).then((response) => {
        console.log(JSON.stringify(response.data))
        done()
        this.preventRepeatReuqest = false
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          this.dataArray = [...data.normalNewsList]
          this.isTouchend(data.normalNewsList.length < this.limit)
          this.showLoadMore()
        }
        this.page++
      }).catch(error => {
        this.preventRepeatReuqest = false
        done()
        console.log(error)
      })
    },
    // 到达底部加载更多数据
    loaderMore (done) {
      if (this.touchend) {
        this.$refs[this.refstr].finishInfinite(2)
        return
      }
      // 防止重复请求
      if (this.preventRepeatReuqest) {
        return
      }
      this.preventRepeatReuqest = true
      var typestr = this.type === 0 ? 'recommend' : (this.type === 1 ? 'huya' : (this.type === 2 ? 'chushou' : (this.type === 3 ? 'longzhu' : 'douyu')))
      getTv(this.page, typestr).then((response) => {
        done()
        this.preventRepeatReuqest = false
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          this.dataArray = [...this.dataArray, ...data.normalNewsList]
          this.isTouchend(data.normalNewsList.length < this.limit)
          this.showLoadMore()
        }
        this.page++
      }).catch(error => {
        this.preventRepeatReuqest = false
        done()
        console.log(error)
      })
    },
    showLoadMore () {
      if (this.touchend) {
        this.$refs[this.refstr].finishInfinite(2)
      } else {
        this.$refs[this.refstr].finishInfinite(0)
      }
    },
    isTouchend (end) {
      this.touchend = end
    },
    // 点击事件
    infoClick (item) {
      console.log(item.id)
      // this.$router.push({path: '/infodetail', query: {'id': item.id}})
      this.$router.push({path: '/infodetail/' + item.id})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.page{
    background-color: #fff;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    left: 0;
    height: 100%;
  }
  .list_back_li{
		height: 4.85rem;
		.list_back_svg{
      width: 100%;
      height: 100%;
		}
	}
	.empty_data{
    font-size: .5rem;
    color: #666;
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 3rem;
		right: 1rem;
		.back_top_svg{
      width: 2rem;
      height: 2rem;
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
  .tip {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    margin-top: 3rem;
    .tip-icon {
      width: 5rem;
      height: 5rem;
      fill: currentColor;
      overflow: hidden;
      color: #aaa;
    }
    .tip-h5 {
      color: #999;
      font-size: .7rem;
      text-align: center;
      margin-top: .5rem;
    }
  }
  .container {
      justify-content: 'space-around';
      align-items: 'flex-start';
      background-color: #eee;
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      margin: .2rem .3rem;
    }
  .tvitem {
    width: 50%;
    height: 6.5rem;
    display: flex;
    flex-direction: column;
    .img {
      margin-left: .2rem;
      margin-right: .2rem;
      height: 5rem;
    }
    .text {
      font-size: .5rem;
      color: #333;
      height: 1rem;
      white-space: nowrap;
      overflow: hidden;
      margin-left: .3rem;
      margin-right: .3rem;
    }
  }
</style>
