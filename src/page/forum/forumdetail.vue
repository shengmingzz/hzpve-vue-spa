<template>
  <div class="page">
    <scroller style="background-color:#fff;" :on-refresh="refresh" :onInfinite="loaderMore" :ref="refstr" refreshLayerColor="#333" loadingLayerColor="#333">
      <forum-top :item="item" v-if="item"></forum-top>
      <sec-header tip="评论"></sec-header>
      <ul v-if="dataArray.length">
        <section v-for="(comm,key) in dataArray" tag='li' :key="key" @click="forumClick(item)">
          <comm-cell :item="comm"></comm-cell>
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
import {loadMore} from '@/components/mixin'
import loading from '@/components/loading'
import {getForumDetail, getFloorList} from '@/api/forum'
import secHeader from '@/components/secHeader'
import forumTop from './forumtop'
import commCell from './forumcommcell'

export default {
  data () {
    return {
      html: '',
      forumId: '',
      item: null,
      dataArray: [],
      preventRepeatReuqest: false, // 到达底部加载数据，防止重复加载
      showBackStatus: false, // 显示返回顶部按钮
      showLoading: false, // 显示加载动画
      touchend: false, // 没有更多数据
      limit: 10,
      refstr: 'refstr'
    }
  },
  mounted () {
    this.getData()
    this.$refs[this.refstr].triggerPullToRefresh()
  },
  components: {
    loading, secHeader, forumTop, commCell
  },
  mixins: [loadMore],
  props: [],
  computed: {
  },
  created () {
    this.forumId = this.$route.params.id
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.forumId = this.$route.params.id
      this.getData()
    }
  },
  methods: {
    getData () {
      getForumDetail(this.forumId).then((response) => {
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          if (data.hasOwnProperty('forumPostDetail')) {
            let forumPostDetail = data.forumPostDetail.PostDetail
            this.item = forumPostDetail
          }
        }
      }).catch(error => {
        this.hideLoading()
        this.preventRepeatReuqest = false
        console.log(error)
      })
    },
    getComm () {
      //
    },
    hideLoading () {
      this.showLoading = false
    },
    // 下拉刷新
    refresh (done) {
      getFloorList(this.forumId, '-createTime', 0, this.limit).then((response) => {
        done()
        this.preventRepeatReuqest = false
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          this.dataArray = [...data.forumReplyAsFloorList]
          this.isTouchend(data.forumReplyAsFloorList.length < this.limit)
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
      getFloorList(this.forumId, '-createTime', offset, this.limit).then((response) => {
        done()
        this.preventRepeatReuqest = false
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          this.dataArray = [...this.dataArray, ...data.forumReplyAsFloorList]
          this.isTouchend(data.forumReplyAsFloorList.length < this.limit)
          this.showLoadMore()
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
    }
  }
}
</script>

<style>
  .page {
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        display: flex;
        flex-direction: column;
    }
  .container {
      justify-content: 'space-around';
      align-items: 'flex-start';
      background-color: #fff;
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      margin: .5rem .5rem .1rem .5rem;
    }
  .keywords {
    background-color: #eee;
    padding: .3rem 1rem;
    font-size: 0.7rem;
    text-align: center;
    color: #666;
    margin-right: .7rem;
    margin-top: .3rem;
    margin-bottom: .3rem;
    border-radius: .3rem;
  }
  .containerrec {
    display: flex;
    flex-flow: column wrap;
    background-color: #eee;
    margin: .5rem .5rem .1rem .5rem;
  }
  .recommend {
    padding: .1rem .3rem;
    font-size: 0.7rem;
    color: #666;
    margin: .3rem .1rem .1rem .1rem;
  }
</style>
