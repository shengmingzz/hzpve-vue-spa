import fetch from './fetch'
// import Md5 from '../config/Md5'
import {devserverurl, htmlserverurl} from './env'

// let serverUrl = 'http://192.168.244.65:5000/api/graphql'
let serverUrl = 'https://yhzs.99.com/api/graphql'
/*
 * info--------------------------------------------------------------------------------------------------------------
 */
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
  query += '{id,title, pageUrl, writer{id, name}, thumbnail4Rec, keyWords, newsType, imageInContent, commentCount,likes,recommendNews{id,title,pageUrl,newsType}}'
  query = 'query{' + query + '}'
  let params = {
    query: query
  }
  return devbaseReq(params)
}
export function loadHtml (url) {
  console.log(url)
  // 开发模式下使用代理跨域
  var useProxy = true
  if (useProxy) {
    var array = url.split('/')
    console.log('/news' + '/' + array[array.length - 1])
    return fetch({
      url: '/news' + '/' + array[array.length - 1],
      method: 'get',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  }
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
// 获取资讯评论
export function getInfoComment (newsId, offset, limit, sortType) {
  var sortstr = 'createTime'
  if (sortType === 1) {
    sortstr = '-likes'
  }
  let query = '{comment(offset:' + offset + ',limit:' + limit + ',newsReplied:' + '"' + newsId + '"' + ',sortBy:' + '"' + sortstr + '"' + ',type:1){id,content,authorName,replyToComment{id,content,authorName},author{id,avatar,name,token,gameRole{roleId}}authorHeadPic,replyToUserName,belongToComment,createTime,likes,commentCount,subReply{id,content,authorName,replyToComment{id,content,authorName},author{id,avatar,name,token,gameRole{roleId}}authorHeadPic,replyToUserName,createTime,likes,commentCount}}}'
  return devStrBaseReq(query)
}
// 资讯点赞
export function favorNews (newsId, uid) {
  let query = 'mutation{likeNews(uid:' + '"' + uid + '"' + ', newsId:' + '"' + newsId + '"' + '){status, msg}}'
  return devStrBaseReq(query)
}
// 资讯评论点赞
export function favorComment (commentId, uid) {
  let query = 'mutation{likeComment(uid:' + '"' + uid + '"' + ', commentId:' + '"' + commentId + '"' + '){status, msg}}'
  return devStrBaseReq(query)
}

// 举报评论 垃圾广告', value: 1, 违规内容', value: 2, 恶意灌水', value: 3, 重复发帖', value: 4
export function reportComment (uid, reason, commentId) {
  let query = 'mutation{complainComment(uid:' + '"' + uid + '"' + ',complainReason:' + reason + ',complainToComment:' + '"' + commentId + '"' + '){status, msg}}'
  return devStrBaseReq(query)
}
// 收藏新闻
export function collectNews (newsId, uid) {
  let query = 'mutation{favouriteNews(uid:' + '"' + uid + '"' + ', newsId:' + '"' + newsId + '"' + '){status, msg}}'
  return devStrBaseReq(query)
}
// 取消收藏
export function uncollectNews (newsId, uid) {
  let query = 'mutation{removeFavourite(uid:' + '"' + uid + '"' + ', newsId:' + '"' + newsId + '"' + '){status, msg}}'
  return devStrBaseReq(query)
}
// 回复新闻
export function commentNews (uid, content, type, newsId) {
  let query = 'mutation{writeComment(uid:' + '"' + uid + '"' + ', content:' + '"' + content + '"' + ',type:1,replyToNews:' + '"' + newsId + '"' + '){status, msg}}'
  return devStrBaseReq(query)
}
// 回复评论
export function commentNewsReply (uid, content, type, newsId, replyToUserName, replyToComment, replyToUser, belongToComment) {
  let query = 'mutation{writeComment(uid:' + '"' + uid + '"' + ', content:' + '"' + content + '"' + ',type:2,replyToNews:' + '"' + newsId + '"' + ',replyToUserName:' + '"' + replyToUserName + '"' + ',replyToComment:' + '"' + replyToComment + '"' + ',replyToUser:' + '"' + replyToUser + '"' + ',belongToComment:' + '"' + belongToComment + '"' + '){status, msg}}'
  return devStrBaseReq(query)
}
// 获取我的新闻收藏
export function getCollect (uid, offset, limit) {
  let query = '{favouriteList(uid:' + '"' + uid + '"' + ',offset:' + offset + ',limit:' + limit + '){id,favouriteNews{id,title,pageUrl,writer{id,name},thumbnail4Rec,keyWords,newsType,imageInContent,commentCount,likes,createTime},type,createTime}}'
  return devStrBaseReq(query)
}
// 删除评论
export function delComment (uid, commentId) {
  let query = 'mutation{deleteComment(uid:' + '"' + uid + '"' + ', deleteComment:' + '"' + commentId + '"' + '){status, msg}}'
  return devStrBaseReq(query)
}
// 获取评论楼层
export function getInfoCommentFloor (commentId, offset, limit, sortType) {
  var sortstr = 'createTime'
  if (sortType === 1) {
    sortstr = '-likes'
  }
  let query = '{commentFloor(offset:' + offset + ',limit:' + limit + ',commentReplied:' + '"' + commentId + '"' + ',sortBy:' + '"' + sortstr + '"' + '){id,content,authorName,replyToComment{id,content,authorName},author{avatar,id,name,token,gameRole{roleId}}authorHeadPic,replyToUserName,belongToComment,createTime,likes,commentCount,subReply{id,content,authorName,replyToComment{id,content,authorName},author{avatar,id,name,token,gameRole{roleId}}authorHeadPic,replyToUserName,createTime,likes,commentCount}}}'
  return devStrBaseReq(query)
}
// 获取新闻资讯tag
export function getNewsTag (keyWords, limit, offset) {
  let query = '{queryNormalNews(offset:' + offset + ',limit:' + limit + ',keyWords:' + '"' + keyWords + '"' + '){id,title,pageUrl,writer{id,name},thumbnail4Rec,keyWords,newsType,imageInContent,commentCount,likes,createTime ,isAwesome,isFixedAtTop}}'
  return devStrBaseReq(query)
}
// 获取轮播图
export function getSwipNews () {
  let query = '{slideShow(offset:0,limit:10){id,imageUrl,jumpUrl,title,type,news{id,title,newsType,pageUrl}}}'
  return devStrBaseReq(query)
}
/*
 * post--------------------------------------------------------------------------------------------------------------
 */

/*
 * --------------------------------------------------------------------------------------------------------------
 */
export function baseReq (params) {
  return fetch({
    url: serverUrl,
    method: 'post',
    params
  })
}
// 通过中间服务器进行请求api，跨域问题
export function devStrBaseReq (query) {
  var str = 'query{' + query + '}'
  let params = {
    query: str
  }
  return devbaseReq(params)
}
export function devbaseReq (params) {
  // 开发模式下使用代理跨域
  var useProxy = true
  if (useProxy) {
    return fetch({
      url: '/graphqlapi',
      method: 'post',
      params
    })
  }
  // 开发模式下使用中间服务器转发请求
  var useThrServer = true
  if (useThrServer) {
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
  // 直接发送请求
  return fetch({
    url: serverUrl,
    method: 'post',
    params
  })
}
