<template>
  <div class="page">
    <scroller :on-refresh="refresh" :onInfinite="loaderMore" :ref="refstr" refreshLayerColor="#333" loadingLayerColor="#333">
      <ul v-if="dataArray.length">
        <section v-for="(item,key) in dataArray" tag='li' :key="key" @click="infoClick(item)">
          <info-cell :item="item"></info-cell>
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
import {getNews} from '../../api/info'
import infoCell from './infocell'
// import Md5 from '../../config/Md5'

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
      code: 0
    }
  },
  mounted () {
    this.$refs[this.refstr].triggerPullToRefresh()
  },
  components: {
    infoCell
  },
  props: ['type', 'refstr'],
  computed: {
  },
  created () {
    this.code = this.type
    // var date = Date.parse(new Date())
    // var md5 = Md5.hex_md5('ZRpyN4zTxb9ualwA!mvj2fP$&@BoWGEF' + parseInt(date / 1000))
    // console.log(date)
    // console.log(md5)
  },
  watch: {
    '$route' (to, from) {
    }
  },
  methods: {
    // 下拉刷新
    refresh (done) {
      getNews(0, this.limit, this.type).then((response) => {
        done()
        this.preventRepeatReuqest = false
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          this.dataArray = [...data.normalNewsList]
          this.isTouchend(data.normalNewsList.length < this.limit)
          this.showLoadMore()
        }
      }).catch(error => {
        this.preventRepeatReuqest = false
        done()
        console.log(error)
      })
    },
    // 到达底部加载更多数据
    loaderMore (done) {
      let offset = this.dataArray.length
      if (this.touchend) {
        this.$refs[this.refstr].finishInfinite(2)
        return
      }
      // 防止重复请求
      if (this.preventRepeatReuqest) {
        return
      }
      this.preventRepeatReuqest = true
      getNews(offset, this.limit, this.type).then((response) => {
        done()
        this.preventRepeatReuqest = false
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          this.dataArray = [...this.dataArray, ...data.normalNewsList]
          this.isTouchend(data.normalNewsList.length < this.limit)
          this.showLoadMore()
          // console.log(JSON.stringify(data.normalNewsList))
        }
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
</style>
