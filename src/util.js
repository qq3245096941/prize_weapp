//倒计时
function clock(endTime) {

  endTime = Number(endTime);
  var nowTime = new Date().getTime() / 1000;

  if (endTime < nowTime) {
    return {
      title:"开奖时间已到",
      bol:false
    }
  }

  var second = parseInt(endTime - nowTime);
  // 输出03:05:59  时分秒
  var h = Math.floor(second / 3600) < 10 ? '0' + Math.floor(second / 3600) : Math.floor(second / 3600);
  var m = Math.floor((second / 60 % 60)) < 10 ? '0' + Math.floor((second / 60 % 60)) : Math.floor((second / 60 % 60));
  var s = Math.floor((second % 60)) < 10 ? '0' + Math.floor((second % 60)) : Math.floor((second % 60));

  return {
    title:`${h}时${m}分${s}秒`,
    bol:true
  };
}

export default {
  clock
}
