import fetch from './fetch'
// import Md5 from '../config/Md5'
import {devserverurl, htmlserverurl} from './env'

let serverUrl = 'http://192.168.244.65:5000/api/graphql'

export function getNews (offset, limit, type) {
  let query = 'normalNewsList(offset:' + offset + ',limit:' + limit + ',type:' + type + ')'
  query += '{id,title, pageUrl, writer{id, name}, thumbnail4Rec, keyWords, newsType, imageInContent, commentCount,likes}'
  query = 'query{' + query + '}'
  // console.log(query)
  let params = {
    query: query
  }
  return devbaseReq(params)
}
export function getNewsDetail (newsId) {
  let query = 'normalNewsDetail(newsId:' + '"' + newsId + '")'
  query += '{id,title, pageUrl, writer{id, name}, thumbnail4Rec, keyWords, newsType, imageInContent, commentCount,likes}'
  query = 'query{' + query + '}'
  // console.log(query)
  let params = {
    query: query
  }
  return fetch({
    url: serverUrl,
    method: 'post',
    params
  })
}
export function loadHtml (url) {
  const data = {
    url: url,
    method: 'get'
  }
  return fetch({
    url: htmlserverurl,
    method: 'post',
    data
  })
}
export function baseReq (params) {
  return fetch({
    url: serverUrl,
    method: 'post',
    params
  })
}
// 通过中间服务器进行请求api，跨域问题
export function devbaseReq (params) {
  const data = {
    url: serverUrl,
    method: 'post',
    params: params
  }
  return fetch({
    url: devserverurl,
    method: 'post',
    data
  })
}
