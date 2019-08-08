export function timestampToTime(timestamp) {
    let date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + "-";
    let M =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1) + "-"
            : date.getMonth() + 1 + "-";
    let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
    let h =
        date.getHours() < 10
            ? "0" + date.getHours() + ":"
            : date.getHours() + ":";
    let m =
        date.getMinutes() < 10
            ? "0" + date.getMinutes() + ":"
            : date.getMinutes() + ":";
    let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}
export function timeToTimestamp() {
    let date = new Date();
    let timeNew = date.getTime() / 1000;
    return timeNew.toFixed(0);
}
export function time(timestamp) {
    let day = Math.floor(timestamp / 86400);
    let hour = Math.floor(timestamp % 86400 / 3600);
    let minute = Math.floor(timestamp % 86400 % 3600 / 60);
    let second = Math.floor(timestamp % 86400 % 3600 % 60);
    return [day, hour, minute, second]
}
export function timestampToTimeUtc(timestamp) {
    return new Date(timestamp*1000).toUTCString().replace(/GMT/,'UTC');
}

export function listenOline(success){
    console.log(success)
    let _success = success
    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        }
    };
    EventUtil.addHandler(window, "online",  () =>{
         console.log("连上网了！");
         _success()
    });
    EventUtil.addHandler(window, "offline", () =>{ 
         console.log("网络不给力，请检查网络设置!");
    });
}
