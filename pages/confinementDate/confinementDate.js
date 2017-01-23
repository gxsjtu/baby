const ConfinementDateSvc = require('../../services/confinementDateSvc.js')

Page({
    data:{
        showResult:false,
        average:28,
        year:'2016',
        month:'10',
        date:'01',
        preBorn:'',
        week:'',
        fromNow:''
    },
    check:function(e){
        wx.showToast({ title: '计算中', icon: 'loading', duration: 10000, mask: true });
        let last = this.data.year+'-'+this.data.month+'-'+this.data.date;
        var confinementDateSvc = new ConfinementDateSvc();
        confinementDateSvc.getBorn(last,this.data.average).then(data=>{
            if(data.data.message=='OK')
            {
                let preBorn = data.data.data.preBorn;
                let fromNow = data.data.data.fromNow;
                let week = data.data.data.week;
                this.setData({
                    preBorn:preBorn,
                    fromNow:fromNow,
                    week:week
                });
            }
            wx.hideToast();
        }).catch((err) => {
            wx.hideToast();
        });

        this.setData({
            showResult:true
        });
    },
    hiddenMask:function(e){
        this.setData({
            showResult:false
        });
    }
})