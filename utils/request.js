module.exports.request = function(url, data, method){
    console.log('token')
    console.log(getApp().globalData.token)
  return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: data,
            header: {
                Authorization: "Bearer " + getApp().globalData.token,
                // 'content-type': 'application/form-url'
            },
            method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                // success
                resolve(res)
            },
            fail: function(err) {
                // fail
                reject(err)
            },
            complete: function() {
                // complete
            }
    })
  })
}