"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '首页',
      usingComponents: {
        "van-button": "../components/vant/button/index",
        "van-toast": "../components/vant/toast/index",
        "van-dialog": "../components/vant/dialog/index"
      }
    }, _this.components = {}, _this.data = {
      system_setting: [],
      shops: []
    }, _this.computed = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onLoad",
    value: function onLoad() {}
  }, {
    key: "onShow",
    value: function onShow() {
      var _this2 = this;

      /*获取系统设置*/
      this.$parent.util.request({
        url: "entry/wxapp/system_setting",
        success: function success(res) {
          _this2.system_setting = res.data.data;
          _this2.$apply();
        }
      });

      /*获取所有商品*/
      this.$parent.util.request({
        url: "entry/wxapp/get_shops_all",
        success: function success(res) {
          _this2.shops = res.data.data;
          _this2.$apply();
        }
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInVzaW5nQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJkYXRhIiwic3lzdGVtX3NldHRpbmciLCJzaG9wcyIsImNvbXB1dGVkIiwibWV0aG9kcyIsIiRwYXJlbnQiLCJ1dGlsIiwicmVxdWVzdCIsInVybCIsInN1Y2Nlc3MiLCJyZXMiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLElBRGpCO0FBRVBDLHVCQUFpQjtBQUNmLHNCQUFjLGlDQURDO0FBRWYscUJBQWEsZ0NBRkU7QUFHZixzQkFBYztBQUhDO0FBRlYsSyxRQVNUQyxVLEdBQWEsRSxRQUliQyxJLEdBQU87QUFDTEMsc0JBQWUsRUFEVjtBQUVMQyxhQUFNO0FBRkQsSyxRQUlQQyxRLEdBQVcsRSxRQUNYQyxPLEdBQVUsRTs7Ozs7NkJBQ0QsQ0FFUjs7OzZCQUVRO0FBQUE7O0FBQ1A7QUFDQSxXQUFLQyxPQUFMLENBQWFDLElBQWIsQ0FBa0JDLE9BQWxCLENBQTBCO0FBQ3hCQyxhQUFJLDRCQURvQjtBQUV4QkMsaUJBQVEsaUJBQUNDLEdBQUQsRUFBTztBQUNiLGlCQUFLVCxjQUFMLEdBQXNCUyxJQUFJVixJQUFKLENBQVNBLElBQS9CO0FBQ0EsaUJBQUtXLE1BQUw7QUFDRDtBQUx1QixPQUExQjs7QUFRQTtBQUNBLFdBQUtOLE9BQUwsQ0FBYUMsSUFBYixDQUFrQkMsT0FBbEIsQ0FBMEI7QUFDeEJDLGFBQUksMkJBRG9CO0FBRXhCQyxpQkFBUSxpQkFBQ0MsR0FBRCxFQUFPO0FBQ2IsaUJBQUtSLEtBQUwsR0FBYVEsSUFBSVYsSUFBSixDQUFTQSxJQUF0QjtBQUNBLGlCQUFLVyxNQUFMO0FBQ0Q7QUFMdUIsT0FBMUI7QUFPRDs7OztFQTFDZ0NDLGVBQUtDLEk7O2tCQUFuQmxCLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpppbpobUnLFxyXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcclxuICAgICAgICBcInZhbi1idXR0b25cIjogXCIuLi9jb21wb25lbnRzL3ZhbnQvYnV0dG9uL2luZGV4XCIsXHJcbiAgICAgICAgXCJ2YW4tdG9hc3RcIjogXCIuLi9jb21wb25lbnRzL3ZhbnQvdG9hc3QvaW5kZXhcIixcclxuICAgICAgICBcInZhbi1kaWFsb2dcIjogXCIuLi9jb21wb25lbnRzL3ZhbnQvZGlhbG9nL2luZGV4XCJcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgc3lzdGVtX3NldHRpbmc6W10sXHJcbiAgICAgIHNob3BzOltdXHJcbiAgICB9O1xyXG4gICAgY29tcHV0ZWQgPSB7fTtcclxuICAgIG1ldGhvZHMgPSB7fTtcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAvKuiOt+WPluezu+e7n+iuvue9riovXHJcbiAgICAgIHRoaXMuJHBhcmVudC51dGlsLnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDpcImVudHJ5L3d4YXBwL3N5c3RlbV9zZXR0aW5nXCIsXHJcbiAgICAgICAgc3VjY2VzczoocmVzKT0+e1xyXG4gICAgICAgICAgdGhpcy5zeXN0ZW1fc2V0dGluZyA9IHJlcy5kYXRhLmRhdGE7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvKuiOt+WPluaJgOacieWVhuWTgSovXHJcbiAgICAgIHRoaXMuJHBhcmVudC51dGlsLnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDpcImVudHJ5L3d4YXBwL2dldF9zaG9wc19hbGxcIixcclxuICAgICAgICBzdWNjZXNzOihyZXMpPT57XHJcbiAgICAgICAgICB0aGlzLnNob3BzID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuIl19