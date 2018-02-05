
let env = 'pro'
let useLocalMiddleserver = true

let devserverurl = 'http://192.168.244.71:1324/api/thrid/post'
let htmlserverurl = 'http://192.168.244.71:1324/api/thrid/getHtml'

function getServerUrl () {
  if (env === 'pro') {
    return 'https://tbcos.99.com/discuz.php/api'
  } else if (env === 'qa') {
    return 'http://coswx.99.com/api/webroot/discuz.php/api'
  } else {
    return 'http://127.0.0.1/discuz.php/api'
  }
}

// post req sign key
function getSignKey () {
  if (env === 'pro') {
    return 'ZRpyN4zTxb9ualwA!mvj2fP$&@BoWGEF'
  } else if (env === 'qa') {
    return '490ae564xbex1a3c510aefc19e476exdeb'
  } else {
    return '490ae564xbex1a3c510aefc19e476exdeb'
  }
}

function isUseThirdServer () {
  return useLocalMiddleserver
}

function getRouteBase () {
  if (env === 'pro') {
    return '/yhzr/'
  } else if (env === 'qa') {
    return '/yhzr/'
  } else {
    return '/yhzr/'
  }
}

export {
  getServerUrl,
  getSignKey,
  devserverurl,
  isUseThirdServer,
  getRouteBase,
  htmlserverurl
}
