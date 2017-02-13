const Promise = require('../utils/promise.min.js');
const lodash = require('../utils/lodash.min.js');
const GLOBAL = require('../global.js');
const request = require('../utils/request.js').request;

var LocationSvc = function () {

    this.locations = [
        {
            district: '黄浦区',
            streets: [
                {
                    name: '南京东路街道',
                    service: {
                        name: '南京东路街道社区事务受理中心',
                        tel: '021-63271866',
                        address: '江阴路101号',
                        time: '周一至周日 8:30-16:30'
                    }
                }, {
                    name: '外滩街道',
                    service: {
                        name: '外滩街道社区事务受理中心',
                        tel: '021-63295277',
                        address: '河南中路568号',
                        time: '周一至周日 8:30-16:30 '
                    }
                }, {
                    name: '淮海中路街道',
                    service: {
                        name: '淮海中路街道社区事务受理中心',
                        tel: '021-53832593',
                        address: '马当路349号',
                        time: '周一至周日 上午8：30--11:30 下午13:00-16:30(法定假日除外) '
                    }
                }, {
                    name: '老西门街道',
                    service: {
                        name: '老西门街道社区事务受理中心',
                        tel: '021-63769098',
                        address: '大吉路71号',
                        time: '周一至周日：8：30—16：30（国定假日除外）'
                    }
                }, {
                    name: '五里桥街道',
                    service: {
                        name: '五里桥街道社区事务受理中心',
                        tel: '021-53013030',
                        address: '黄浦区瞿溪路768号',
                        time: '周一至周日：8：30—16：30（国定假日除外）'
                    }
                }, {
                    name: '半淞园路街道',
                    service: {
                        name: '半淞园路街道社区事务受理中心',
                        tel: '021-63122105',
                        address: '黄浦区西藏南路1360号',
                        time: '周一至周日：8：30—16：30（国定假日除外）'
                    }
                }, {
                    name: '豫园街道',
                    service: {
                        name: '豫园街道社区事务受理中心',
                        tel: '021-63365917',
                        address: '梧桐路50号',
                        time: '周一至周日：8：30—16：30（国定假日除外）'
                    }
                }, {
                    name: '小东门街道',
                    service: {
                        name: '小东门街道社区事务受理中心',
                        tel: '021-63325801',
                        address: '黄浦区白渡路252号',
                        time: '周一至周日：8：30—16：30（国定假日除外）'
                    }
                }, {
                    name: '瑞金二路街道',
                    service: {
                        name: '瑞金二路街道社区事务受理中心',
                        tel: '021-53829022',
                        address: '皋兰路6号',
                        time: '周一至周日：8：30—16：30（国定假日除外）'
                    }
                }, {
                    name: '打浦桥街道',
                    service: {
                        name: '打浦桥街道社区事务受理中心',
                        tel: '021-63041102',
                        address: '南塘浜路103号',
                        time: '周一至周日：8：30—16：30（国定假日除外）'
                    }
                }
            ]
        }, {
            district: '徐汇区',
            streets: [
                {
                    name: '湖南路街道 ',
                    service: {
                        name: '湖南路街道社区事务受理中心',
                        tel: '021-64377524',
                        address: '淮海中路1788号',
                        time: '周一至周日8：30——17：00（法定节假日除外）'
                    }
                }, {
                    name: '天平路街道',
                    service: {
                        name: '天平路街道社区事务受理中心',
                        tel: '021-64673312',
                        address: '衡山路17弄1号',
                        time: '周一至周日8：30——17：01（法定节假日除外）'
                    }
                }, {
                    name: '枫林路街道',
                    service: {
                        name: '枫林路街道街道社区事务受理中心',
                        tel: '021-64382999',
                        address: '中山南二路857号',
                        time: '周一至周日8：30——17：02（法定节假日除外）'
                    }
                }, {
                    name: '徐家汇街道',
                    service: {
                        name: '徐家汇街道社区事务受理中心',
                        tel: '021-64417390',
                        address: '斜土路2431号',
                        time: '周一至周日 上午8：30—11:30；下午1:30—5:00'
                    }
                }, {
                    name: '斜土路街道',
                    service: {
                        name: '斜土路街道社区事务受理中心',
                        tel: '021-64045999',
                        address: '茶陵路38号',
                        time: '周一至周日8:30-17:00'
                    }
                }, {
                    name: '长桥路街道',
                    service: {
                        name: '长桥路街道社区事务受理中心',
                        tel: '021-64771771',
                        address: '罗秀路616号',
                        time: '周一至周日8：30——17：00（法定节假日除外）'
                    }
                }, {
                    name: '漕河泾街道',
                    service: {
                        name: '漕河泾街道社区事务受理中心',
                        tel: '021-54480560',
                        address: '冠生园路211号',
                        time: '周一至周五8:30-17:00；11:30-1:30值班（办理部分业务）；周六、周日8:30-17:00（办理部分业务），11:30-1:30休息（以上受理时间法定节假日除外）'
                    }
                }, {
                    name: '虹梅路街道',
                    service: {
                        name: '虹梅路街道社区事务受理中心',
                        tel: '021-34207920',
                        address: '虹梅路2019号',
                        time: '周一至周日8：30——17：00（法定节假日除外）'
                    }
                }, {
                    name: '康健新村街道',
                    service: {
                        name: '康健新村街道社区事务受理中心',
                        tel: '021-54210576',
                        address: '浦北路268号',
                        time: '周一至周日 上午8:30-11:30；下午13:30-17:00'
                    }
                }, {
                    name: '田林路街道',
                    service: {
                        name: '田林路街道社区事务受理中心',
                        tel: '021-64825656',
                        address: '宜山路655弄3号',
                        time: '周一至周日8:30-17:00（周六、周日及法定节假日11:30-13:30不办理业务）'
                    }
                }, {
                    name: '凌云路街道',
                    service: {
                        name: '凌云路街道社区事务受理中心',
                        tel: '021-64552736',
                        address: '老沪闵路1039弄48号',
                        time: '周一至周日8：30——17：00（法定节假日除外）'
                    }
                }, {
                    name: '龙华街道',
                    service: {
                        name: '龙华街道社区事务受理中心',
                        tel: '021-54121059',
                        address: '天钥桥南路399号',
                        time: '周一至周日8：30——17：00（法定节假日除外）'
                    }
                }, {
                    name: '华泾镇',
                    service: {
                        name: '华泾镇社区事务受理中心',
                        tel: '021-54821212',
                        address: '华泾路505号',
                        time: '周一至周日8:30-17:00（法定节假日除外)'
                    }
                }
            ]
        }, {
            district: '长宁区',
            streets: [
                {
                    name: '华阳路街道',
                    service: {
                        name: '华阳路街道社区事务受理中心',
                        tel: '021-62266220',
                        address: '长宁路396弄79号',
                        time: '周一至周日8：30-16：30（法定节假日除外）'
                    }
                }, {
                    name: '新华路街道',
                    service: {
                        name: '新华路街道社区事务受理中心',
                        tel: '021-62941011',
                        address: '法华镇路521号',
                        time: '周一至周日8：30-16：30（法定节假日除外）'
                    }
                }, {
                    name: '江苏路街道',
                    service: {
                        name: '江苏路街道社区事务受理中心',
                        tel: '021-62256600',
                        address: '江苏路563弄8号',
                        time: '周一至周五 8:30－16:30 ；周六至周日 上午8:30－11:30，下午13:30－16:30（法定节假日除外）'
                    }
                }, {
                    name: '天山路街道',
                    service: {
                        name: '天山路街道社区事务受理中心',
                        tel: '021-62281033',
                        address: '娄山关路天山二村64号乙',
                        time: '周一至周日8：30-16：30（法定节假日除外）'
                    }
                }, {
                    name: '周家桥街道',
                    service: {
                        name: '周家桥街道社区事务受理中心虹桥街道社区事务受理中心',
                        tel: '021-52061155',
                        address: '云雾山路551弄48号',
                        time: '周一至周日8：30-16：30（法定节假日除外）'
                    }
                }, {
                    name: '虹桥街道',
                    service: {
                        name: '虹桥街道社区事务受理中心',
                        tel: '021-22850900',
                        address: '中山西路1030弄51号',
                        time: '周一至周五8:30-16:30 双休日8:30-11:30 13:30-16:30（法定节假日除外）'
                    }
                }, {
                    name: '仙霞新村街道',
                    service: {
                        name: '仙霞新村街道社区事务受理中心',
                        tel: '021-62959244',
                        address: '虹古路206号',
                        time: '周一至周日8：30-16：30（法定节假日除外）'
                    }
                }, {
                    name: '程家桥街道',
                    service: {
                        name: '程家桥街道社区事务受理中心',
                        tel: '021-22300100',
                        address: '虹桥路2282号',
                        time: '周一至周日8：30-16：30（法定节假日除外）'
                    }
                }, {
                    name: '北新泾街道',
                    service: {
                        name: '北新泾街道社区事务受理中心',
                        tel: '021-52188321',
                        address: '新泾一村144号',
                        time: '周一至周日8：30-16：30（法定节假日除外）'
                    }
                }, {
                    name: '新泾镇',
                    service: {
                        name: '新泾镇社区事务受理中心',
                        tel: '021-52160606',
                        address: '新泾镇泉口路66号',
                        time: '周一至周日8：30-16：31（法定节假日除外）'
                    }
                }
            ]
        }, {
            district: '静安区',
            streets: [
                {
                    name: '江宁路街道',
                    service: {
                        name: '江宁路街道社区事务受理中心',
                        tel: '021-62668866',
                        address: '常德路818号',
                        time: '周一至周五8：30—17：00 周六、周日9：30—15:30（全年无休）'
                    }
                }, {
                    name: '静安寺街道',
                    service: {
                        name: '静安寺街道社区事务受理中心',
                        tel: '021-54036120',
                        address: '常熟路115号',
                        time: '周一至周五8：30—17：00 周六、周日9：30—15:30（法定节假日除外）'
                    }
                }, {
                    name: '南京西路街道',
                    service: {
                        name: '南京西路街道社区事务受理中心',
                        tel: '021-62897060',
                        address: '延安中路955弄67号',
                        time: '周一至周五:上午8:30—11:30；下午：14：00--17：00周六、周日：9:30—15:30（法定节假日除外）'
                    }
                }, {
                    name: '曹家渡街道',
                    service: {
                        name: '曹家渡街道社区事务受理中心',
                        tel: '021-62112892',
                        address: '万航渡路676弄46号',
                        time: '周一至周五8：30—17：00 周六、周日9：30—15:30（法定节假日除外）'
                    }
                }, {
                    name: '石门二路街道',
                    service: {
                        name: '石门二路街道社区事务受理中心',
                        tel: '021-62675858',
                        address: '静安区武定路139号',
                        time: '周一至周五上午8：30-11：30，下午13：30—17：00；周六、周日9：30-15：30（法定节假日除外）'
                    }
                }
            ]
        }, {
            district: '宝山区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: ''
                    }
                }
            ]
        }, {
            district: '浦东新区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: '',
                        time: ''
                    }
                }
            ]
        }, {
            district: '虹口区',
            streets: [
                {
                    name: '四川北路街道',
                    service: {
                        name: '四川北路街道社区事务受理服务中心',
                        tel: '021-56661380',
                        address: '新广路296号一楼',
                        time: '周一至周五8:30-16:30 周六至周日9:00-16:00（法定节假日除外）'
                    }
                }, {
                    name: '提篮桥街道',
                    service: {
                        name: '提篮桥街道社区事务受理服务中心',
                        tel: '021-65853300',
                        address: '新建路195号',
                        time: '周一至周四8:30-16:30 周五8:30-15:00 周六至周日9:00-16:00（法定节假日除外）'
                    }
                }, {
                    name: '欧阳路街道',
                    service: {
                        name: '欧阳路街道社区事务受理服务中心',
                        tel: '021-65222978',
                        address: '曲阳路483弄1—3号',
                        time: '周一至周五 8:30-16:30 周六、周日 9:00-16:00（法定节假日除外）'
                    }
                }, {
                    name: '广中路街道',
                    service: {
                        name: '广中路街道社区事务受理服务中心',
                        tel: '021-51812222',
                        address: '水电路120号',
                        time: '周一至周五 8:30-16:30 周六、周日 9:00-16:00（法定节假日除外）'
                    }
                }, {
                    name: '凉城新村街道',
                    service: {
                        name: '凉城新村街道社区事务受理服务中心',
                        tel: '021-65290666',
                        address: '凉城路465弄41号甲',
                        time: '周一至周五8:30—11:30；13:30—16:30；双休日：9:00—11:30；13:30—16:00（法定节假日除外）'
                    }
                }, {
                    name: '嘉兴路街道',
                    service: {
                        name: '嘉兴路街道社区事务受理服务中心',
                        tel: '021-65158800',
                        address: '三河路388号',
                        time: '周一至周五 8:30—16:30周六、周日9:00-16:00（国定节假日除外）'
                    }
                }, {
                    name: '曲阳路街道',
                    service: {
                        name: '曲阳路街道社区事务受理服务中心',
                        tel: '021-35391600',
                        address: '伊敏河路88号',
                        time: '周一至周五 8:30-16:30 周六、周日 9:00-16:00（法定节假日除外）'
                    }
                }, {
                    name: '江湾镇街道',
                    service: {
                        name: '江湾镇街道社区事务受理服务中心',
                        tel: '021-65167111',
                        address: '奎照路280号',
                        time: '周一至周四上午8:30-11:30；下午1:00-:4:30（夏令时2：00-4:30）；周五上午8:30-11:30；下午1:00-3:30 双休日上午9:00-11:00；下午1:00-4:00'
                    }
                }
            ]
        }, {
            district: '闸北区',
            streets: [
                {
                    name: '天目西路街道',
                    service: {
                        name: '天目西路街道社区事务受理中心',
                        tel: '021-36392197',
                        address: '沪太路150号',
                        time: '周一至周五7：45-18：00 双休日9：00-16：30全年无休（国定节假日除外）'
                    }
                }, {
                    name: '北站街道',
                    service: {
                        name: '北站街道社区事务受理中心',
                        tel: '021-63809258',
                        address: '南星路40号',
                        time: '周一至周五8:30-11:30，13:30-16:30/夏令时8:30-11:30，14:00-16:30 ； 周六、周日9:00-11:30，13:30-16:00/夏令时9：00-11:30，14:00-16:00'
                    }
                }, {
                    name: '宝山路街道',
                    service: {
                        name: '宝山路街道社区事务受理中心',
                        tel: '021-56301203',
                        address: '宝昌路519号',
                        time: '周一至周五8:30-16:30;周六、周日上午9:00-11:00,下午14:00-16:00'
                    }
                }, {
                    name: '芷江西路街道',
                    service: {
                        name: '芷江西路街道社区事务受理中心',
                        tel: '021-66583382',
                        address: '芷江西路151号',
                        time: '周一至周日8：30——11:30，13：30——16:30 (夏令时14:00-16:30)'
                    }
                }, {
                    name: '共和新路街道',
                    service: {
                        name: '共和新路街道事务受理中心',
                        tel: '021-56039488',
                        address: '平型关路487号',
                        time: '周一至周日上午 8：30—11：30 下午 13：30—16：30'
                    }
                }, {
                    name: '大宁路街道',
                    service: {
                        name: '大宁路街道社区事务受理中心',
                        tel: '021-56658320',
                        address: '彭江路188号',
                        time: '周一至周五9:00-16：30 周六、周日上午9：00-11：30 下午13：30-16：30（国家法定节假日除外）'
                    }
                }, {
                    name: '彭浦新村街道',
                    service: {
                        name: '彭浦新村街道社区事务受理中心',
                        tel: '021-56478800',
                        address: '安泽路78号',
                        time: '周一至周日上午8:30—11:30 下午13:30—16:30 (国家法定节假日除外)'
                    }
                }, {
                    name: '临汾路街道',
                    service: {
                        name: '临汾路街道社区事务受理中心',
                        tel: '021-66987770',
                        address: '临汾路335号',
                        time: '周一至周五8:00-18:00  双休日上午9:00-11:30  下午1:30-4:30'
                    }
                }, {
                    name: '彭浦镇',
                    service: {
                        name: '彭浦镇社区事务受理中心',
                        tel: '021-56772537',
                        address: '灵石路725号丙',
                        time: '周一至周日上午8:30-11:30,下午13:30-16:30（国家法定节假日除外）'
                    }
                }
            ]
        }, {
            district: '松江区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: '',
                        time: ''
                    }
                }
            ]
        }, {
            district: '金山区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: '',
                        time: ''
                    }
                }
            ]
        }, {
            district: '奉贤区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: '',
                        time: ''
                    }
                }
            ]
        }, {
            district: '青浦区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: '',
                        time: ''
                    }
                }
            ]
        }, {
            district: '崇明县',
            streets: [
                {
                    name: '城桥镇',
                    service: {
                        name: '城桥镇社区事务受理中心',
                        tel: '021-69617130',
                        address: '城桥镇寒山寺路164号',
                        time: '周一至周五 8:30-17:00（国定假除外）周六、周日8:30-11:15 13:30-17:00（国定假除外）'
                    }
                }, {
                    name: '堡镇镇',
                    service: {
                        name: '堡镇镇新河镇社区事务受理中心社区事务受理中心',
                        tel: '021-59410413',
                        address: '堡镇化工路17号',
                        time: '周一至周日上午8:00-11:15 下午13:00-16:00（国定假除外）'
                    }
                }, {
                    name: '新河镇',
                    service: {
                        name: '新河镇社区事务受理中心',
                        tel: '021-59687397',
                        address: '新河镇新申路801号',
                        time: '周一至周日 上午8:30~11:30 下午13:30~16:30（国定假除外）'
                    }
                }, {
                    name: '庙镇镇',
                    service: {
                        name: '庙镇镇社区事务受理中心',
                        tel: '021-59365379',
                        address: '剧场路6号',
                        time: '周一至周日8:30-16:00（国定假除外）'
                    }
                }, {
                    name: '竖新镇',
                    service: {
                        name: '竖新镇社区事务受理中心',
                        tel: '021-59495305',
                        address: '竖新镇响椿路60号',
                        time: '周一至周日8:30-16:00（国定假除外）'
                    }
                }, {
                    name: '向化镇',
                    service: {
                        name: '向化镇社区事务受理中心',
                        tel: '021-59441064',
                        address: '向化大街149号',
                        time: '周一至周五8:00-11:00 13:30-16:30 周六、周日上午8:30-11:00 下午13:30-15:30 (国定节假日除外）'
                    }
                }, {
                    name: '三星镇',
                    service: {
                        name: '三星镇社区事务受理中心',
                        tel: '021-39600024',
                        address: '三星镇宏海路4291号',
                        time: '周一至周日 8:00-16:00 (国定节假日除外）'
                    }
                }, {
                    name: '港沿镇',
                    service: {
                        name: '港沿镇社区事务受理中心',
                        tel: '021-59462567',
                        address: '港沿镇建联路1138号 ',
                        time: '周一至周日8:30-16:30(国定节假日除外）'
                    }
                }, {
                    name: '中兴镇',
                    service: {
                        name: '中兴镇社区事务受理中心',
                        tel: '021-39440027',
                        address: '中兴镇广福路37号',
                        time: '周一至周日上午8:00-11:00 13:30-16:30(国定节假日除外）'
                    }
                }, {
                    name: '陈家镇',
                    service: {
                        name: '陈家镇社区事务受理中心',
                        tel: '021-59403665',
                        address: '陈家镇北城公路1454号',
                        time: '周一至周日 8:00-11:00 13:00-16:00(国定节假日除外）'
                    }
                }, {
                    name: '绿华镇',
                    service: {
                        name: '绿华镇社区事务受理中心',
                        tel: '021-59351568',
                        address: '绿华镇嘉华路8号',
                        time: '周一至周日上午8:30-11:30 下午13:30-16:30(国定节假日除外）'
                    }
                }, {
                    name: '港西镇',
                    service: {
                        name: '港西镇社区事务受理中心',
                        tel: '021-59671520',
                        address: '港西镇三双公路1573号 ',
                        time: '周一至周日8:30-16:30 (国定节假日除外 ）'
                    }
                }, {
                    name: '建设镇',
                    service: {
                        name: '建设镇社区事务受理中心',
                        tel: '021-39628027',
                        address: '建设镇建星路108号 ',
                        time: '周一至周日8:30-16:30 (国定节假日除外 ）'
                    }
                }, {
                    name: '新村乡',
                    service: {
                        name: '新村乡社区事务受理中心',
                        tel: '021-59650090',
                        address: '新村乡星村公路2107号',
                        time: '周一至周日8:30-16:30 (国定节假日除外 ）'
                    }
                }, {
                    name: '长兴乡',
                    service: {
                        name: '长兴镇社区事务受理中心',
                        tel: '021-56854939',
                        address: '长兴镇凤凰街5号',
                        time: '周一至周五8:00--16:00周六周日8:00--11:00 13:00--16:00 (国定节假日除外 ）'
                    }
                }, {
                    name: '横沙乡',
                    service: {
                        name: '横沙乡社区事务受理中心',
                        tel: '021-56899074',
                        address: '横沙乡新环路57号',
                        time: '周一至周五8:30-16:30 周六、周日上午8:30-11:30 下午13:00-16:30(国定节假日除外 ）'
                    }
                }, {
                    name: '东平镇',
                    service: {
                        name: '东平镇社区事务受理服务中心',
                        tel: '021—59666777',
                        address: '东平镇长江农场长江大街黄河路口',
                        time: '周一至周日 上午8:30—11:30 下午13:30—16:30(国定节假日除外 ）'
                    }
                }, {
                    name: '新海镇',
                    service: {
                        name: '新海镇社区事务受理服务中心',
                        tel: '021-59655101',
                        address: '新海镇海展路80号',
                        time: '周一至周日上午8:30-下午16:00(国定节假日除外 ）'
                    }
                }
            ]
        }, {
            district: '嘉定区',
            streets: [
                {
                    name: '',
                    service: {
                        name: '',
                        tel: '',
                        address: '',
                        time: ''
                    }
                }
            ]
        }
    ];
};

LocationSvc.prototype.getDistricts = function () {
    return new Promise((resolve, reject) => {
        var d = [];
        lodash.forEach(this.locations, x => {
            d.push(x.district);
        });
        resolve(d);
    });
};

LocationSvc.prototype.getStreetsByDistrict = function (district) {
    return new Promise((resolve, reject) => {
        var target = _.find(this.locations, x => {
            return x.district === district;
        });
        resolve(target);
    });
};

LocationSvc.prototype.getCurrentLocation = function () {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude //纬度
                var longitude = res.longitude //经度
                  request(GLOBAL.SERVER + "/user/getLocation/" + longitude + "/" + latitude, null, "GET").then(data => {
                    resolve(data);
                })
            },
            fail: function(err) {
                // reject(err)
                // request(GLOBAL.SERVER + "/hospital/getAll/-1/-1", null, "GET").then(data => {
                //     resolve(data);
                // });
                console.log("拒绝")
            }
        })
    })
}

module.exports = LocationSvc;
