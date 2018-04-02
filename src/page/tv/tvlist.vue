<template>
  <div class="page">
    <scroller :on-refresh="refresh" :onInfinite="loaderMore" :ref="refstr" refreshLayerColor="#333" loadingLayerColor="#333">
      <ul v-if="dataArray.length" class="container">
        <section v-for="(item,key) in dataArray" tag='li' :key="key" @click="tvClick(item)" class="tvitem">
          <img :src="item.cover" class="img">
          <div class="info">
            <div class="name">{{item.anchor}}</div>
            <div class="online">{{item.online}}</div>
          </div>
          <img :src="item.avatar" class="avatar">
          <div class="text">{{item.roomname}}</div>
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
import {getTv} from '../../api/tv'

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
      var typestr = parseInt(this.type) === 0 ? 'recommend' : (parseInt(this.type) === 1 ? 'huya' : (parseInt(this.type) === 2 ? 'chushou' : (parseInt(this.type) === 3 ? 'longzhu' : 'douyu')))
      getTv(1, typestr).then((response) => {
        done()
        this.preventRepeatReuqest = false
        let res = response.data
        if (res.hasOwnProperty('dataset')) {
          let data = res.dataset
          this.dataArray = [...data.videolist]
          this.isTouchend(data.videolist.length < this.limit)
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
      var typestr = parseInt(this.type) === 0 ? 'recommend' : (parseInt(this.type) === 1 ? 'huya' : (parseInt(this.type) === 2 ? 'chushou' : (parseInt(this.type) === 3 ? 'longzhu' : 'douyu')))
      getTv(this.page, typestr).then((response) => {
        done()
        this.preventRepeatReuqest = false
        let res = response.data
        if (res.hasOwnProperty('dataset')) {
          let data = res.dataset
          this.dataArray = [...this.dataArray, ...data.videolist]
          this.isTouchend(data.videolist.length < this.limit)
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
    tvClick (item) {
      window.location.href = item.url
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
    position: relative;
    .img {
      margin-left: .2rem;
      margin-right: .2rem;
      height: 5rem;
    }
    .avatar {
      position: absolute;
      left:.2rem;
      top: 4.3rem;
      width: 1.4rem;
      height: 1.4rem;
      border-radius: .6rem;
      overflow: hidden;
    }
    .text {
      font-size: .5rem;
      color: #333;
      height: 1rem;
      white-space: nowrap;
      overflow: hidden;
      margin-left: 1.8rem;
      margin-right: .3rem;
    }
    .info {
      position: absolute;
      height: .8rem;
      left:0.2rem;
      top: 4.2rem;
      right: 0.2rem;
      background-color: rgba(0,0,0,.3);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .name {
        margin-left: 1.6rem;
        vertical-align: middle;
        font-size: .5rem;
        color: #fff;
      }
      .online {
        margin-right: .5rem;
        vertical-align: middle;
        font-size: .5rem;
        color: #fff;
      }
    }
  }
</style>
