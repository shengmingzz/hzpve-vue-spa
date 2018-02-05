<template>
  <div class="page">
    <head-top head-title="资讯" :goBack="true"></head-top>
    <div class="infohtml" v-html="html">
      <!-- <div id="infohtml" ></div> -->
    </div>
    <div class="keyword">
    </div>
    <div class="suggest">
    </div>
    <div class="comm">
    </div>
  </div>
</template>

<script>
  import {loadMore} from '@/components/mixin'
  import loading from '@/components/loading'
  import {loadHtml, getNewsDetail} from '@/api/info'
  import headTop from '@/components/head'
  // import Vue from 'vue'
  // var _ = require('lodash-node')
  import * as parse5 from 'parse5'

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
      loading,
      headTop
    },
    mixins: [loadMore],
    props: [],
    computed: {
    },
    created () {
      this.newsId = this.$route.query.id
    },
    watch: {
    },
    methods: {
      getData () {
        getNewsDetail(this.newsId).then((response) => {
          let res = response.data
          console.log(res)
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
        // loadHtml('http://192.168.244.65:5000/news/5a1e6c69770125d01b8dd368.html').then(response => {
        loadHtml(this.item.pageUrl).then(response => {
          this.hideLoading()
          console.log(response)
          this.html = response.data

          const document = parse5.parse(this.html)
          const str = parse5.serialize(document.childNodes[0].childNodes[2])
          this.html = str
          // var MyAppendTo = Vue.extend({
          //   template: str
          // })
          // new MyAppendTo().$mount('#infohtml')
        }).catch(error => {
          this.hideLoading()
          console.log(error)
          this.html = '加载失败'
        })
      },
      hideLoading () {
        this.showLoading = false
      },
      loaded () {
        var iframe = document.getElementById('iframe')
        var iwindow = iframe.contentWindow
        var idoc = iwindow.document
        iframe.height = idoc.body.offsetHeight
        // const vm = this.$refs.iframe.contentWindow.vm
        // console.log(vm)
      }
    }
  }
</script>

<style>
  @import './info.css';
  .page {
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        display: flex;
    }
  .iframeinfo {
    width: 100%;
    flex: 1;
    height: 100rem;
  }
  .infohtml {
    margin-top: 0.4rem;
    width: 100%;
    flex: 1;
  }
</style>
