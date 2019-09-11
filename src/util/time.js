import i18n from '../i18n/i18n'
export function timeSelect(callback,fallback){
    // 初始化时间
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    const nowDate = now.getDate();
    // 数据初始化
    function formatYear (nowYear) {
        let arr = [];
        for (let i = nowYear - 1; i <= nowYear + 1; i++) {
            arr.push({
                id: i + '',
                value: i + '年'
            });
        }
        return arr;
    }
    function formatMonth () {
        let arr = [];
        for (let i = 1; i <= 12; i++) {
            arr.push({
                id: i.length < 2 ? i + '' : i,
                value: i + '月'
            });
        }
        return arr;
    }
    function formatDate (count) {
        let arr = [];
        for (let i = 1; i <= count; i++) {
            arr.push({
                id: i + '',
                value: i + '日'
            });
        }
        return arr;
    }
    let yearData = function(callback) {
        callback(formatYear(nowYear))
    }
    let monthData = function (year, callback) {
        callback(formatMonth());
    };
    let dateData = function (year, month, callback) {
        if (/^(1|3|5|7|8|10|12)$/.test(month)) {
            callback(formatDate(31));
        }
        else if (/^(4|6|9|11)$/.test(month)) {
            callback(formatDate(30));
        }
        else if (/^2$/.test(month)) {
            if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
                callback(formatDate(29));
            }
            else {
                callback(formatDate(28));
            }
        }
        else {
            throw new Error('month is illegal');
        }
    };
    let hourData = function(one, two, three, callback) {
        let hours = [];
        for (let i = 0,len = 24; i < len; i++) {
            hours.push({
                id: i,
                value: i + '时'
            });
        }
        callback(hours);
    };
    let minuteData = function(one, two, three, four, callback) {
        var minutes = [];
        for (let i = 0, len = 60; i < len; i++) {
            minutes.push({
                id: i,
                value: i + '分'
            });
        }
        callback(minutes);
    };
    let secondsData = function(one, two, three, four, five, callback) {
        let seconds = [];
        for (let i = 0, len = 60; i < len; i++) {
            seconds.push({
                id: i,
                value: i + '秒'
            });
        }
        callback(seconds);
    };
    let iosSelect = new IosSelect(6, 
        [yearData, monthData, dateData, hourData, minuteData, secondsData],
        {
            title: 'Date selection',
            itemHeight: 35,
            itemShowCount: 6,
            oneLevelId: nowYear,
            twoLevelId: nowMonth,
            threeLevelId: nowDate,
            // fourLevelId: fourLevelId,
            // fiveLevelId: fiveLevelId,
            // sixLevelId: sixLevelId,
            callback: function (selectOneObj, selectTwoObj, selectThreeObj, selectFourObj, selectFiveObj, selectSixObj) {
                console.log(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value + ' ' + selectFourObj.value + ' ' + selectFiveObj.value + ' ' + selectSixObj.value);
                callback(selectOneObj.id + '/' + selectTwoObj.id + '/' + selectThreeObj.id + ' ' + selectFourObj.id + ':' + selectFiveObj.id + ':' + selectSixObj.id);
               
            },
            fallback:function(){
                fallback()
            }
    });
    
        
}