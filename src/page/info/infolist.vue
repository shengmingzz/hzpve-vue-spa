<template>
  <div class="postlist_container">
    <mt-loadmore :top-method="loadTop" ref="loadmore" style="font-size:12px;">
      <ul v-load-more="loaderMore" v-if="dataArray.length" type="1">
        <section v-for="(item,key) in dataArray" tag='li' :key="key" @click="infoClick(item)">
          <info-cell :item="item"></info-cell>
        </section>
      </ul>
      <ul v-else class="animation_opactiy">
        <li class="list_back_li" v-for="item in 10" :key="item">
          <img src="../../img/shopback.svg" class="list_back_svg">
        </li>
      </ul>
      <p v-if="touchend" class="empty_data">没有更多了</p>
    </mt-loadmore>

    <aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>
    <div ref="abc" style="background-color: red;"></div>
		<transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
  </div>
</template>

<script>
  import {getNews} from '../../api/info'
  import {showBack, animate} from '../../config/mUtils'
  import {loadMore} from '@/components/mixin'
  import loading from '@/components/loading'
  import infoCell from './infocell'
  // var _ = require('lodash-node')

  export default {
    data () {
      return {
        offset: 0,
        dataArray: [],
        preventRepeatReuqest: false, // 到达底部加载数据，防止重复加载
        showBackStatus: false, // 显示返回顶部按钮
        showLoading: true, // 显示加载动画
        touchend: false, // 没有更多数据
        limit: 10
      }
    },
    mounted () {
      this.refresh()
    },
    components: {
      loading,
      infoCell
    },
    mixins: [loadMore],
    props: ['type'],
    computed: {
    },
    created () {
    },
    watch: {
    },
    methods: {
      refresh () {
        this.loadData(true)
      },
      // 到达底部加载更多数据
      loaderMore () {
        this.loadData(false)
      },
      loadData (refresh) {
        let offset = refresh ? 0 : this.dataArray.length
        if (this.touchend && !refresh) {
          return
        }
        // 防止重复请求
        if (this.preventRepeatReuqest) {
          return
        }
        this.showLoading = true
        this.preventRepeatReuqest = true
        getNews(offset, this.limit, this.type).then((response) => {
          this.hideLoading()
          this.preventRepeatReuqest = false
          let res = response.data
          // console.log(res)
          if (res.hasOwnProperty('data')) {
            let data = res.data
            if (refresh) {
              this.dataArray = [...data.normalNewsList]
            } else {
              this.dataArray = [...this.dataArray, ...res.data]
            }
            if (data.normalNewsList.length < this.limit) {
              this.touchend = true
            } else {
              this.touchend = false
            }
          }
          showBack(status => {
            this.showBackStatus = status
          })
        }).catch(error => {
          this.hideLoading()
          this.preventRepeatReuqest = false
          console.log(error)
        })
      },
      // 返回顶部
      backTop () {
        animate(document.body, {scrollTop: '0'}, 400, 'ease-out')
      },
      hideLoading () {
        this.showLoading = false
      },
      infoClick (item) {
        console.log(item.id)
        this.$router.push({path: '/infodetail', query: {'id': item.id}})
      },
      loadTop () {
        this.$refs.loadmore.onTopLoaded()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .postlist_container{
		background-color: #fff;
		margin-bottom: 2rem;
    width: 100%;
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
