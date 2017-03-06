Page({
    buyClick: function () {
        wx.requestPayment({
          timeStamp: '',
          nonceStr: '',
          package: 'prepay_id=356810',
          signType: 'MD5',
          paySign: '',
          success: function(res){
            // success
            console.log('ok');
            console.log(res);
          },
          fail: function(res) {
            // fail
            console.log('fail');
            console.log(res);
          },
          complete: function() {
            // complete
          }
        })
    }
})