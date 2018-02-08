<template>
  <div class="infolist_container">
    <scroller :on-refresh="refresh" ref="myscroller" :onInfinite="loaderMore" refreshLayerColor="#666">
      <ul v-load-more="loaderMore" v-if="infoListArray.length" type="1">
        <div v-for="(item,key) in infoListArray" tag='li' :key="key" style="height:4rem;" :style="key%2 === 0 ? 'background-color:#ccc':'background-color:#fff'">
          {{item}}
        </div>
      </ul>
      <ul v-else class="animation_opactiy">
        <li class="list_back_li" v-for="item in 10" :key="item">
          <img src="../../img/info/shopback.svg" class="list_back_svg">
        </li>
      </ul>
      <p v-if="touchend" class="empty_data">没有更多了</p>
      <div ref="abc" style="background-color: red;"></div>
      </scroller>
    </div>
</template>

<script>
import {loadMore} from '@/components/mixin'
export default {
  data () {
    return {
      offset: 0,
      infoListArray: [],
      preventRepeatReuqest: false, // 到达底部加载数据，防止重复加载
      showBackStatus: false, // 显示返回顶部按钮
      showLoading: true, // 显示加载动画
      touchend: false // 没有更多数据
    }
  },
  mounted () {
    this.refresh()
  },
  components: {
  },
  mixins: [loadMore],
  props: ['channel'],
  computed: {
  },
  methods: {
    refresh (done) {
      // let items = ['1', '2', '3', '4', '5']
      // this.infoListArray = [...items]
      // console.log(JSON.stringify(this.infoListArray))
      var data = new Promise((resolve, reject) => {
        var array = []
        for (var i = 0; i < 10; i++) {
          array.push(i + '')
        }
        resolve(array)
      }).then(response => {
        this.infoListArray = [...response]
        console.log(JSON.stringify(this.infoListArray))
        done()
        if (this.infoListArray.length > 50) {
          this.touchend = true
        } else {
          this.touchend = false
        }
      })
      return data
    },
    // 到达底部加载更多数据
    loaderMore (done) {
      if (this.touchend) {
        this.$refs.myscroller.finishInfinite(1)
        return
      }
      // 防止重复请求
      if (this.preventRepeatReuqest) {
        return
      }
      this.showLoading = true
      this.preventRepeatReuqest = true

      var data = new Promise((resolve, reject) => {
        var array = []
        for (var i = 0; i < 10; i++) {
          array.push(i + this.infoListArray.length + '')
        }
        resolve(array)
      }).then(response => {
        this.infoListArray = [...this.infoListArray, ...response]
        this.preventRepeatReuqest = false
        if (this.infoListArray.length > 50) {
          this.touchend = true
        }
        console.log(JSON.stringify(this.infoListArray))
        done()
      })
      return data
    },
    // 返回顶部
    backTop () {
    },
    hideLoading () {
      this.showLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .infolist_container{
    background-color: #fff;
		margin-bottom: 2rem;
    width: 100%;
	}
  .cell-main {
    padding: .28rem .2rem;
    display: block;
    color: inherit;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    margin: -.08rem 0;
    border-bottom: .025rem solid #eee;
    .cell-img {
      display: block;
      position: absolute;
      width: 4.8rem;
      height: 2.7rem;
      text-align: center;
      overflow: hidden;
    }
    .cell-right {
        margin-left: 5.1rem;
        position: relative;
        height: 2.7rem;
        .cell-right-title {
            padding-top: .1rem;
            margin-bottom: .12rem;
            font-size: .6rem;//.3rem;
            font-weight: 400;
            color: #333;
        }
        .cell-right-desc {
            font-size: 0.5rem;//.24rem;
            height: .68rem;
            margin-bottom: .16rem;
            color: #666;
            // text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }
  }
  .text-block {
      line-height: 1.41;
      text-align: justify;
  }
  .single-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list_back_li{
		height: 4.85rem;
		.list_back_svg{
			@include wh(100%, 100%)
		}
	}
  .loader_more{
		@include font(0.6rem, 3);
		text-align: center;
    color: #999;
	}
	.empty_data{
		@include sc(0.5rem, #666);
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 3rem;
		right: 1rem;
		.back_top_svg{
			@include wh(2rem, 2rem);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}
</style>
