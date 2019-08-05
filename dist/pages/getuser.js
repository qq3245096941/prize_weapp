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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdldHVzZXIuanMiXSwibmFtZXMiOlsiR2V0dXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ1c2luZ0NvbXBvbmVudHMiLCJjb21wb25lbnRzIiwiZGF0YSIsImNvbXB1dGVkIiwibWV0aG9kcyIsInJlc3VsdCIsImRldGFpbCIsInVzZXJJbmZvIiwidW5kZWZpbmVkIiwiUHJvbWlzZSIsIiRwYXJlbnQiLCJ1dGlsIiwiZ2V0VXNlckluZm8iLCJyZXNvbHZlIiwid3hJbmZvIiwidGhlbiIsInJlcXVlc3QiLCJ1cmwiLCJuaWNrbmFtZSIsIm5pY2tOYW1lIiwiYXZhdGFyIiwiYXZhdGFyVXJsIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJ3ZXB5Iiwic2V0U3RvcmFnZVN5bmMiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLFVBRGpCO0FBRVBDLHVCQUFpQjtBQUNmLHNCQUFjLGlDQURDO0FBRWYscUJBQWE7QUFGRTtBQUZWLEssUUFPVEMsVSxHQUFhLEUsUUFDYkMsSSxHQUFPLEUsUUFDUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVLEU7Ozs7O21DQUdLQyxNLEVBQVE7QUFBQTs7QUFDckI7QUFDQSxVQUFHQSxPQUFPQyxNQUFQLENBQWNDLFFBQWQsS0FBeUJDLFNBQTVCLEVBQXNDO0FBQ3BDLDZCQUFNLGNBQU47QUFDQTtBQUNEO0FBQ0QsVUFBSUMsT0FBSixDQUFZLG1CQUFXO0FBQ3JCLGVBQUtDLE9BQUwsQ0FBYUMsSUFBYixDQUFrQkMsV0FBbEIsQ0FBOEIsVUFBU0wsUUFBVCxFQUFtQjtBQUMvQ00sa0JBQVFOLFNBQVNPLE1BQWpCO0FBQ0QsU0FGRCxFQUVHVCxPQUFPQyxNQUZWO0FBR0QsT0FKRCxFQUlHUyxJQUpILENBSVEsZ0JBQU07QUFDWjtBQUNBLGVBQUtMLE9BQUwsQ0FBYUMsSUFBYixDQUFrQkssT0FBbEIsQ0FBMEI7QUFDeEJDLGVBQUksMEJBRG9CO0FBRXhCZixnQkFBSztBQUNIZ0Isc0JBQVNoQixLQUFLaUIsUUFEWDtBQUVIQyxvQkFBT2xCLEtBQUttQjtBQUZULFdBRm1CO0FBTXhCQyxtQkFBUSxpQkFBQ0MsR0FBRCxFQUFPO0FBQ2JDLG9CQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQTtBQUNBRywyQkFBS0MsY0FBTCxDQUFvQixNQUFwQixFQUEyQkosSUFBSXJCLElBQUosQ0FBU0EsSUFBcEM7QUFDQXdCLDJCQUFLRSxZQUFMLENBQWtCO0FBQ2hCQyxxQkFBTTtBQURVLGFBQWxCO0FBR0Q7QUFidUIsU0FBMUI7QUFlRCxPQXJCRDtBQXVCRDs7OztFQTdDa0NILGVBQUtJLEk7O2tCQUFyQmpDLE8iLCJmaWxlIjoiZ2V0dXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdmFudC90b2FzdC90b2FzdCc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2V0dXNlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivt+axguiOt+WPluaCqOeahOS/oeaBrycsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ3Zhbi1idXR0b24nOiAnLi4vY29tcG9uZW50cy92YW50L2J1dHRvbi9pbmRleCcsXG4gICAgICAgIFwidmFuLXRvYXN0XCI6IFwiLi4vY29tcG9uZW50cy92YW50L3RvYXN0L2luZGV4XCJcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7fTtcbiAgICBkYXRhID0ge307XG4gICAgY29tcHV0ZWQgPSB7XG5cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG5cbiAgICB9O1xuICAgIHVwZGF0ZVVzZXJJbmZvKHJlc3VsdCkge1xuICAgICAgLyrooajnpLrlvZPliY3nlKjmiLfngrnlh7vkuoblj5bmtojmjojmnYMqL1xuICAgICAgaWYocmVzdWx0LmRldGFpbC51c2VySW5mbz09PXVuZGVmaW5lZCl7XG4gICAgICAgIFRvYXN0KFwi5oKo5Y+W5raI5LqG5o6I5p2D77yM6K+36YeN5paw5o6I5p2DXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdGhpcy4kcGFyZW50LnV0aWwuZ2V0VXNlckluZm8oZnVuY3Rpb24odXNlckluZm8pIHtcbiAgICAgICAgICByZXNvbHZlKHVzZXJJbmZvLnd4SW5mbyk7XG4gICAgICAgIH0sIHJlc3VsdC5kZXRhaWwpXG4gICAgICB9KS50aGVuKGRhdGE9PntcbiAgICAgICAgLyrkuIrkvKDmnI3liqHlmagqL1xuICAgICAgICB0aGlzLiRwYXJlbnQudXRpbC5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6XCJlbnRyeS93eGFwcC9zZXRfdXNlcmluZm9cIixcbiAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgIG5pY2tuYW1lOmRhdGEubmlja05hbWUsXG4gICAgICAgICAgICBhdmF0YXI6ZGF0YS5hdmF0YXJVcmxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6KHJlcyk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAvL+WwhueUqOaIt+S/neWtmOWcqOacrOWcsFxuICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcInVzZXJcIixyZXMuZGF0YS5kYXRhKTtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgZGVsdGE6MVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgfVxuICB9XG4iXX0=