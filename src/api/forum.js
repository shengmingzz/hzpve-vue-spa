import fetch from './fetch'

var postfullparamstr = '{postCategoryEnum,id,author{name,id,avatar,signature},createTime,lastTouchTime,likes,isAwesome,' +
    'voiceWith,isFixedAtTop,title,content,contentType,imagesWith,videoWith,replyCount,' +
    'replyToPost{id,content,author{name,id}},subReply{content,voiceWith,author{id,name,' +
    'avatar},replyToPost{id,content,author{name,id}},postCategoryEnum,postType},shareUrl}'

export function getForums (contentType, onlyAwesome, offset, limit, orderBy) {
  var stick = false
  if (parseInt(onlyAwesome) === 1) {
    stick = true
  }
  let query = 'forumPostList(orderBy:' + '"' + orderBy + '"' + ',offset:' + offset + ',limit:' + limit + ',contentType:' + contentType + ',onlyAwesome:' + stick + ')'
  query += postfullparamstr
  query = 'query{' + query + '}'
  let params = {
    query: query
  }
  return devbaseReq(params)
}
// 帖子详情
export function getForumDetail (forumId) {
  // query{forumPostDetail(ForumPostId:\"%@\"){PostDetail{%@}}}
  let query = 'forumPostDetail(ForumPostId:' + '"' + forumId + '"' + ')'
  query += '{PostDetail' + postfullparamstr + '}'
  return devStrBaseReq(query)
}
// 帖子回复列表
export function getFloorList (postId, orderBy, offset, limit) {
  let query = 'forumReplyAsFloorList(orderBy:' + '"' + orderBy + '"' + ',belongToOriPost:' + '"' + postId + '"' + ',offset:' + offset + ',limit:' + limit + ')'
  query += postfullparamstr
  console.log(query)
  return devStrBaseReq(query)
}
// ---------------------------------------------------------------------------
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
  return fetch({
    url: '/graphqlapi',
    method: 'post',
    params
  })
}
