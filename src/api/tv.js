import axios from 'axios'
/*
* tv--------------------------------------------------------------------------------------------------------------
*/

// type huya chushou longzhu douyu recommend
export function getTv (page, type) {
  var useProxy = true
  if (useProxy) {
    var querystring = require('querystring')
    return axios.post('/tvapi', querystring.stringify({ page: page, platform: type }))
    // return axios.post('/tvapi', "page=1&platform='chushou'")
  }
}
