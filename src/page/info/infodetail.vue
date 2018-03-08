<template>
  <div class="page">
    <scroller style="background-color:#fff;" :on-refresh="refresh" :onInfinite="loaderMore" :ref="refstr" refreshLayerColor="#333" loadingLayerColor="#333">
      <div class="infohtml" v-html="html">
      </div>

      <div v-if="item && item.keyWords">
        <sec-header tip="关键字"></sec-header>
        <div class="container">
          <a v-for="(word,key) in item.keyWords" :key="key" class="keywords" @click="clickKeyword(word)">
            <div >{{word}}</div>
          </a>
        </div>
      </div>

      <div v-if="item && item.recommendNews">
        <sec-header tip="推荐"></sec-header>
        <div class="containerrec">
          <a v-for="(recommend,key) in item.recommendNews" :key="key" class="recommend" @click="clickSuggest(recommend)">
            <div >{{recommend.title}}</div>
          </a>
        </div>
      </div>

      <div v-if="item && dataArray">
        <sec-header tip="评论"></sec-header>
        <div class="containerrec">
          <section v-for="(comm,key) in dataArray" tag='li' :key="key" @click="clickComm(comm)">
            <comm-cell :item="comm"></comm-cell>
          </section>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import {loadMore} from '@/components/mixin'
import loading from '@/components/loading'
import {loadHtml, getNewsDetail, getInfoComment} from '@/api/info'
import * as parse5 from 'parse5'
import secHeader from '@/components/secHeader'
import commCell from './infocommcell'

export default {
  data () {
    return {
      html: '',
      newsId: '',
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
    loading, secHeader, commCell
  },
  mixins: [loadMore],
  props: [],
  computed: {
  },
  created () {
    this.newsId = this.$route.params.id
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.newsId = this.$route.params.id
      this.getData()
    }
  },
  methods: {
    getData () {
      getNewsDetail(this.newsId).then((response) => {
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          if (data.hasOwnProperty('normalNewsDetail')) {
            let normalNewsDetail = data.normalNewsDetail
            this.item = normalNewsDetail
            this.loadUrl()
          }
        }
      }).catch(error => {
        this.hideLoading()
        this.preventRepeatReuqest = false
        console.log(error)
      })
    },
    loadUrl () {
      this.showLoading = true
      loadHtml(this.item.pageUrl).then(response => {
        this.hideLoading()
        let html = response.data
        const document = parse5.parse(html)
        var str = parse5.serialize(document.childNodes[0].childNodes[2])
        if (str.indexOf('width:600px;')) { // 视频服务端设置了一个600的宽度
          str = str.replace('width:600px;', '')
        }
        this.html = str
      }).catch(error => {
        this.hideLoading()
        console.log(error)
        this.html = '加载失败'
      })
    },
    hideLoading () {
      this.showLoading = false
    },
    // 下拉刷新
    refresh (done) {
      getInfoComment(this.newsId, 0, this.limit, 0).then((response) => {
        console.log(response.data)
        done()
        this.preventRepeatReuqest = false
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          this.dataArray = [...data.comment]
          this.isTouchend(data.comment.length < this.limit)
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
      if (offset < this.limit) {
        this.$refs[this.refstr].finishInfinite(1)
        return
      }
      if (this.touchend) {
        this.$refs[this.refstr].finishInfinite(2)
        return
      }
      // 防止重复请求
      if (this.preventRepeatReuqest) {
        return
      }
      this.preventRepeatReuqest = true
      getInfoComment(this.newsId, offset, this.limit, 0).then((response) => {
        done()
        this.preventRepeatReuqest = false
        let res = response.data
        if (res.hasOwnProperty('data')) {
          let data = res.data
          this.dataArray = [...this.dataArray, ...data.comment]
          this.isTouchend(data.comment.length < this.limit)
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

<style >
  @import './info.scss';
  .page {
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        display: flex;
        flex-direction: column;
    }
  .container {
      justify-content: space-around;
      align-items: flex-start;
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
    background-color: #fff;
    margin: .5rem .5rem .1rem .5rem;
  }
  .recommend {
    padding: .1rem .3rem;
    font-size: 0.7rem;
    color: #666;
    margin: .3rem .1rem .1rem .1rem;
  }
</style>
