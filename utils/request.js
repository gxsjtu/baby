// const merge = require('lodash.merge');
var _ = require('lodash.min.js');
const Promise = require('./promise.min.js');
module.exports.request = function(url, data, method) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: _.merge(data, {}) ,
            header: {
                Authorization: "Bearer " + getApp().globalData.token,
                // 'content-type': 'application/form-url'
            },
            method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
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
