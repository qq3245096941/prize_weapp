'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//倒计时
function clock(endTime) {

  endTime = Number(endTime);
  var nowTime = new Date().getTime() / 1000;

  if (endTime < nowTime) {
    return {
      title: "开奖时间已到",
      bol: false
    };
  }

  var second = parseInt(endTime - nowTime);
  // 输出03:05:59  时分秒
  var h = Math.floor(second / 3600) < 10 ? '0' + Math.floor(second / 3600) : Math.floor(second / 3600);
  var m = Math.floor(second / 60 % 60) < 10 ? '0' + Math.floor(second / 60 % 60) : Math.floor(second / 60 % 60);
  var s = Math.floor(second % 60) < 10 ? '0' + Math.floor(second % 60) : Math.floor(second % 60);

  return {
    title: h + '\u65F6' + m + '\u5206' + s + '\u79D2',
    bol: true
  };
}

exports.default = {
  clock: clock
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiY2xvY2siLCJlbmRUaW1lIiwiTnVtYmVyIiwibm93VGltZSIsIkRhdGUiLCJnZXRUaW1lIiwidGl0bGUiLCJib2wiLCJzZWNvbmQiLCJwYXJzZUludCIsImgiLCJNYXRoIiwiZmxvb3IiLCJtIiwicyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLFNBQVNBLEtBQVQsQ0FBZUMsT0FBZixFQUF3Qjs7QUFFdEJBLFlBQVVDLE9BQU9ELE9BQVAsQ0FBVjtBQUNBLE1BQUlFLFVBQVUsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEtBQXVCLElBQXJDOztBQUVBLE1BQUlKLFVBQVVFLE9BQWQsRUFBdUI7QUFDckIsV0FBTztBQUNMRyxhQUFNLFFBREQ7QUFFTEMsV0FBSTtBQUZDLEtBQVA7QUFJRDs7QUFFRCxNQUFJQyxTQUFTQyxTQUFTUixVQUFVRSxPQUFuQixDQUFiO0FBQ0E7QUFDQSxNQUFJTyxJQUFJQyxLQUFLQyxLQUFMLENBQVdKLFNBQVMsSUFBcEIsSUFBNEIsRUFBNUIsR0FBaUMsTUFBTUcsS0FBS0MsS0FBTCxDQUFXSixTQUFTLElBQXBCLENBQXZDLEdBQW1FRyxLQUFLQyxLQUFMLENBQVdKLFNBQVMsSUFBcEIsQ0FBM0U7QUFDQSxNQUFJSyxJQUFJRixLQUFLQyxLQUFMLENBQVlKLFNBQVMsRUFBVCxHQUFjLEVBQTFCLElBQWlDLEVBQWpDLEdBQXNDLE1BQU1HLEtBQUtDLEtBQUwsQ0FBWUosU0FBUyxFQUFULEdBQWMsRUFBMUIsQ0FBNUMsR0FBNkVHLEtBQUtDLEtBQUwsQ0FBWUosU0FBUyxFQUFULEdBQWMsRUFBMUIsQ0FBckY7QUFDQSxNQUFJTSxJQUFJSCxLQUFLQyxLQUFMLENBQVlKLFNBQVMsRUFBckIsSUFBNEIsRUFBNUIsR0FBaUMsTUFBTUcsS0FBS0MsS0FBTCxDQUFZSixTQUFTLEVBQXJCLENBQXZDLEdBQW1FRyxLQUFLQyxLQUFMLENBQVlKLFNBQVMsRUFBckIsQ0FBM0U7O0FBRUEsU0FBTztBQUNMRixXQUFTSSxDQUFULGNBQWNHLENBQWQsY0FBbUJDLENBQW5CLFdBREs7QUFFTFAsU0FBSTtBQUZDLEdBQVA7QUFJRDs7a0JBRWM7QUFDYlA7QUFEYSxDIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL+WAkuiuoeaXtlxyXG5mdW5jdGlvbiBjbG9jayhlbmRUaW1lKSB7XHJcblxyXG4gIGVuZFRpbWUgPSBOdW1iZXIoZW5kVGltZSk7XHJcbiAgdmFyIG5vd1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XHJcblxyXG4gIGlmIChlbmRUaW1lIDwgbm93VGltZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6XCLlvIDlpZbml7bpl7Tlt7LliLBcIixcclxuICAgICAgYm9sOmZhbHNlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgc2Vjb25kID0gcGFyc2VJbnQoZW5kVGltZSAtIG5vd1RpbWUpO1xyXG4gIC8vIOi+k+WHujAzOjA1OjU5ICDml7bliIbnp5JcclxuICB2YXIgaCA9IE1hdGguZmxvb3Ioc2Vjb25kIC8gMzYwMCkgPCAxMCA/ICcwJyArIE1hdGguZmxvb3Ioc2Vjb25kIC8gMzYwMCkgOiBNYXRoLmZsb29yKHNlY29uZCAvIDM2MDApO1xyXG4gIHZhciBtID0gTWF0aC5mbG9vcigoc2Vjb25kIC8gNjAgJSA2MCkpIDwgMTAgPyAnMCcgKyBNYXRoLmZsb29yKChzZWNvbmQgLyA2MCAlIDYwKSkgOiBNYXRoLmZsb29yKChzZWNvbmQgLyA2MCAlIDYwKSk7XHJcbiAgdmFyIHMgPSBNYXRoLmZsb29yKChzZWNvbmQgJSA2MCkpIDwgMTAgPyAnMCcgKyBNYXRoLmZsb29yKChzZWNvbmQgJSA2MCkpIDogTWF0aC5mbG9vcigoc2Vjb25kICUgNjApKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRpdGxlOmAke2h95pe2JHttfeWIhiR7c33np5JgLFxyXG4gICAgYm9sOnRydWVcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY2xvY2tcclxufVxyXG4iXX0=