'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/vant/toast/toast.js');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Getuser = function (_wepy$page) {
  _inherits(Getuser, _wepy$page);

  function Getuser() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Getuser);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Getuser.__proto__ || Object.getPrototypeOf(Getuser)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '请求获取您的信息',
      usingComponents: {
        'van-button': '../components/vant/button/index',
        "van-toast": "../components/vant/toast/index"
      }
    }, _this.components = {}, _this.data = {}, _this.computed = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Getuser, [{
    key: 'updateUserInfo',
    value: function updateUserInfo(result) {
      var _this2 = this;

      /*表示当前用户点击了取消授权*/
      if (result.detail.userInfo === undefined) {
        (0, _toast2.default)("您取消了授权，请重新授权");
        return;
      }
      new Promise(function (resolve) {
        _this2.$parent.util.getUserInfo(function (userInfo) {
          resolve(userInfo.wxInfo);
        }, result.detail);
      }).then(function (data) {
        /*上传服务器*/
        _this2.$parent.util.request({
          url: "entry/wxapp/set_userinfo",
          data: {
            nickname: data.nickName,
            avatar: data.avatarUrl
          },
          success: function success(res) {
            console.log(res);
            //将用户保存在本地
            _wepy2.default.setStorageSync("user", res.data.data);
            _wepy2.default.navigateBack({
              delta: 1
            });
          }
        });
      });
    }
  }]);

  return Getuser;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Getuser , 'pages/getuser'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdldHVzZXIuanMiXSwibmFtZXMiOlsiR2V0dXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ1c2luZ0NvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInJlc3VsdCIsImRldGFpbCIsInVzZXJJbmZvIiwidW5kZWZpbmVkIiwiUHJvbWlzZSIsIiRwYXJlbnQiLCJ1dGlsIiwiZ2V0VXNlckluZm8iLCJyZXNvbHZlIiwid3hJbmZvIiwidGhlbiIsInJlcXVlc3QiLCJ1cmwiLCJuaWNrbmFtZSIsIm5pY2tOYW1lIiwiYXZhdGFyIiwiYXZhdGFyVXJsIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5Iiwic2V0U3RvcmFnZVN5bmMiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLFVBRGpCO0FBRVBDLHVCQUFpQjtBQUNmLHNCQUFjLGlDQURDO0FBRWYscUJBQWE7QUFGRTtBQUZWLEssUUFPVEMsVSxHQUFhLEUsUUFDYkMsSSxHQUFPLEUsUUFDUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVLEU7Ozs7O21DQUdLQyxNLEVBQVE7QUFBQTs7QUFDckI7QUFDQSxVQUFHQSxPQUFPQyxNQUFQLENBQWNDLFFBQWQsS0FBeUJDLFNBQTVCLEVBQXNDO0FBQ3BDLDZCQUFNLGNBQU47QUFDQTtBQUNEO0FBQ0QsVUFBSUMsT0FBSixDQUFZLG1CQUFXO0FBQ3JCLGVBQUtDLE9BQUwsQ0FBYUMsSUFBYixDQUFrQkMsV0FBbEIsQ0FBOEIsVUFBU0wsUUFBVCxFQUFtQjtBQUMvQ00sa0JBQVFOLFNBQVNPLE1BQWpCO0FBQ0QsU0FGRCxFQUVHVCxPQUFPQyxNQUZWO0FBR0QsT0FKRCxFQUlHUyxJQUpILENBSVEsZ0JBQU07QUFDWjtBQUNBLGVBQUtMLE9BQUwsQ0FBYUMsSUFBYixDQUFrQkssT0FBbEIsQ0FBMEI7QUFDeEJDLGVBQUksMEJBRG9CO0FBRXhCZixnQkFBSztBQUNIZ0Isc0JBQVNoQixLQUFLaUIsUUFEWDtBQUVIQyxvQkFBT2xCLEtBQUttQjtBQUZULFdBRm1CO0FBTXhCQyxtQkFBUSxpQkFBQ0MsR0FBRCxFQUFPO0FBQ2JDLG9CQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQTtBQUNBRywyQkFBS0MsY0FBTCxDQUFvQixNQUFwQixFQUEyQkosSUFBSXJCLElBQUosQ0FBU0EsSUFBcEM7QUFDQXdCLDJCQUFLRSxZQUFMLENBQWtCO0FBQ2hCQyxxQkFBTTtBQURVLGFBQWxCO0FBR0Q7QUFidUIsU0FBMUI7QUFlRCxPQXJCRDtBQXVCRDs7OztFQTdDa0NILGVBQUtJLEk7O2tCQUFyQmpDLE8iLCJmaWxlIjoiZ2V0dXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG4gIGltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3ZhbnQvdG9hc3QvdG9hc3QnO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBHZXR1c2VyIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivt+axguiOt+WPluaCqOeahOS/oeaBrycsXHJcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgICd2YW4tYnV0dG9uJzogJy4uL2NvbXBvbmVudHMvdmFudC9idXR0b24vaW5kZXgnLFxyXG4gICAgICAgIFwidmFuLXRvYXN0XCI6IFwiLi4vY29tcG9uZW50cy92YW50L3RvYXN0L2luZGV4XCJcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbXBvbmVudHMgPSB7fTtcclxuICAgIGRhdGEgPSB7fTtcclxuICAgIGNvbXB1dGVkID0ge1xyXG5cclxuICAgIH07XHJcbiAgICBtZXRob2RzID0ge1xyXG5cclxuICAgIH07XHJcbiAgICB1cGRhdGVVc2VySW5mbyhyZXN1bHQpIHtcclxuICAgICAgLyrooajnpLrlvZPliY3nlKjmiLfngrnlh7vkuoblj5bmtojmjojmnYMqL1xyXG4gICAgICBpZihyZXN1bHQuZGV0YWlsLnVzZXJJbmZvPT09dW5kZWZpbmVkKXtcclxuICAgICAgICBUb2FzdChcIuaCqOWPlua2iOS6huaOiOadg++8jOivt+mHjeaWsOaOiOadg1wiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgdGhpcy4kcGFyZW50LnV0aWwuZ2V0VXNlckluZm8oZnVuY3Rpb24odXNlckluZm8pIHtcclxuICAgICAgICAgIHJlc29sdmUodXNlckluZm8ud3hJbmZvKTtcclxuICAgICAgICB9LCByZXN1bHQuZGV0YWlsKVxyXG4gICAgICB9KS50aGVuKGRhdGE9PntcclxuICAgICAgICAvKuS4iuS8oOacjeWKoeWZqCovXHJcbiAgICAgICAgdGhpcy4kcGFyZW50LnV0aWwucmVxdWVzdCh7XHJcbiAgICAgICAgICB1cmw6XCJlbnRyeS93eGFwcC9zZXRfdXNlcmluZm9cIixcclxuICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICBuaWNrbmFtZTpkYXRhLm5pY2tOYW1lLFxyXG4gICAgICAgICAgICBhdmF0YXI6ZGF0YS5hdmF0YXJVcmxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzdWNjZXNzOihyZXMpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIC8v5bCG55So5oi35L+d5a2Y5Zyo5pys5ZywXHJcbiAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoXCJ1c2VyXCIscmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICBkZWx0YToxXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=