<template>
  <div class="infolist_container" >
    <section id="scroll_section" class="scroll_container">
      <ul  v-if="dataArray.length" type="1">
        <section v-for="(item,key) in dataArray" tag='li' :key="key" @click="infoClick(item)">
          <info-cell :item="item"></info-cell>
        </section>
      </ul>
      <ul v-else class="animation_opactiy">
        <li class="list_back_li" v-for="item in 10" :key="item">
          <img src="../../image/shopback.svg" class="list_back_svg">
        </li>
      </ul>
      <p v-if="touchend" class="empty_data">没有更多了</p>
    </section>

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
import {loadMore} from '../../components/mixin'
import loading from '../../components/loading'
import {showBack, animate} from '../../config/mUtils'
import {getNews} from '@/api/info'
import infoCell from './infocell'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      offset: 0,
      limit: 20,
      dataArray: [],
      preventRepeatReuqest: false, // 到达底部加载数据，防止重复加载
      showBackStatus: false, // 显示返回顶部按钮
      showLoading: true, // 显示加载动画
      touchend: false, // 没有更多数据
      infoScroll: null
    }
  },
  mounted () {
    this.refresh()
  },
  components: {
    loading, infoCell
  },
  mixins: [loadMore],
  props: ['type'],
  computed: {
  },
  methods: {
    hideLoading () {
      this.showLoading = false
    },
    refresh () {
      getNews(0, this.limit, this.type).then((response) => {
        // console.log(JSON.stringify(response.data))
        this.hideLoading()
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          this.dataArray = [...data.normalNewsList]
          if (data.normalNewsList.length < this.limit) {
            this.touchend = true
          }
        }
        showBack(status => {
          this.showBackStatus = status
        })
        this.$nextTick(() => {
          // this.infoScroll = new BScroll('#scroll_section', {
          //   deceleration: 0.001,
          //   bounce: true,
          //   click: true,
          //   swipeTime: 1800
          // })
          if (!this.scroll) {
            this.infoScroll = new BScroll('#scroll_section', {})
            this.infoScroll.on('touchend', (pos) => {
              // 下拉动作
              if (pos.y > 50) {
                this.refresh()
              }
            })
          } else {
            this.infoScroll.refresh()
          }
        })
      }).catch(error => {
        this.hideLoading()
        console.log(error)
      })
    },
    // 到达底部加载更多数据
    loaderMoreData () {
      if (this.touchend) {
        return
      }
      // 防止重复请求
      if (this.preventRepeatReuqest) {
        return
      }
      this.showLoading = true
      this.preventRepeatReuqest = true
      getNews(this.dataArray.length, this.limit, this.type).then((response) => {
        this.hideLoading()
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          this.dataArray = [...this.dataArray, ...data.normalNewsList]
          if (data.normalNewsList.length < this.limit) {
            this.touchend = true
          }
          this.preventRepeatReuqest = false
        }
      }).catch(error => {
        this.hideLoading()
        console.log(error)
      })
    },
    // 点击事件
    infoClick (item) {
      console.log(item.id)
      this.$router.push({path: '/infodetail', query: {'id': item.id}})
    },
    // 返回顶部
    backTop () {
      animate(document.body, {scrollTop: '0'}, 400, 'ease-out')
    }
  }
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.infolist_container{
		// background-color: #fff;
		// margin-bottom: 2rem;
    // width: 100%;
    position: fixed;
		top: 0;
		left: 0;
    right: 0;
    bottom: 0;
		background-color: #fff;
		z-index: 102;
	}
  .scroll_container{
      @include wh(100%, 100%);
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
    background-color: #f00;
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
