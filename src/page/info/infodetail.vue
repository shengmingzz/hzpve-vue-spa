<template>
  <div class="page">
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
    <div class="comm">
    </div>
  </div>
</template>

<script>
import {loadMore} from '@/components/mixin'
import loading from '@/components/loading'
import {loadHtml, getNewsDetail} from '@/api/info'
import * as parse5 from 'parse5'
import secHeader from '@/components/secHeader'

export default {
  data () {
    return {
      html: '',
      showLoading: false,
      newsId: '',
      item: null
    }
  },
  mounted () {
    this.getData()
  },
  components: {
    loading, secHeader
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
    }
  }
}
</script>

<style>
  @import './info.scss';
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
      background-color: #eee;
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      margin: .5rem .5rem .1rem .5rem;
    }
  .keywords {
    background-color: #ccc;
    padding: .3rem 1rem;
    font-size: 0.7rem;
    text-align: center;
    color: #666;
    margin-right: .7rem;
    margin-top: .3rem;
    margin-bottom: .3rem;
  }
  .containerrec {
    display: flex;
    flex-flow: column wrap;
    background-color: #ccc;
    margin: .5rem .5rem .1rem .5rem;
  }
  .recommend {
    padding: .3rem 1rem;
    font-size: 0.7rem;
    color: #666;
    margin: .5rem .5rem .1rem .5rem;
  }
</style>
