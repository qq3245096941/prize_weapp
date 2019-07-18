'use strict';

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

var User = function (_wepy$page) {
  _inherits(User, _wepy$page);

  function User() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, User);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = User.__proto__ || Object.getPrototypeOf(User)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '个人中心',
      'usingComponents': {
        'van-button': '../components/vant/button/index',
        'van-toast': '../components/vant/toast/index',
        'van-dialog': '../components/vant/dialog/index',
        'van-cell': '../components/vant/cell/index',
        'van-cell-group': '../components/vant/cell-group/index',
        'van-field': '../components/vant/field/index',
        'van-icon': '../components/vant/icon/index',
        'van-collapse': '../components/vant/collapse/index',
        'van-collapse-item': '../components/vant/collapse-item/index'
      }
    }, _this.components = {}, _this.data = {
      /*是否开启授权弹框*/
      is_show_accredit: false,
      service_phone: null,
      user: null,
      prize_list: [],
      //是否禁用编辑名称框
      is_edit_name: true,
      is_edit_phone: true
    }, _this.computed = {}, _this.methods = {
      /*拨打电话*/
      call_service_phone: function call_service_phone() {
        wx.makePhoneCall({
          phoneNumber: _this.service_phone
        });
      },
      /*取消弹框*/
      is_alert_close: function is_alert_close() {
        _this.is_show_accredit = false;
      },

      change_name: function change_name(e) {
        _this.user.name = e.detail;
      },
      change_phone: function change_phone(e) {
        _this.user.phone = e.detail;
      },
      /*修改名称*/
      edit_name: function edit_name() {
        if (!_this.is_edit_name) {
          _this.$parent.util.request({
            url: 'entry/wxapp/set_user_name',
            data: {
              nickname: _this.user.nickname,
              name: _this.user.name
            },
            success: function success(res) {
              _wepy2.default.setStorageSync('user', res.data.data);
            }
          });
        }
        _this.is_edit_name = !_this.is_edit_name;
      },

      /*修改电话*/
      edit_phone: function edit_phone() {
        if (!_this.is_edit_phone) {
          _this.$parent.util.request({
            url: 'entry/wxapp/set_user_phone',
            data: {
              nickname: _this.user.nickname,
              phone: _this.user.phone
            },
            success: function success(res) {
              _wepy2.default.setStorageSync('user', res.data.data);
            }
          });
        }
        _this.is_edit_phone = !_this.is_edit_phone;
      },
      /*编辑地址*/
      edit_address: function edit_address() {
        new Promise(function (resolve, reject) {
          wx.chooseLocation({
            success: function success(res) {
              resolve(res.address);
            },
            fail: function fail() {
              reject();
            }
          });
          /*已经获取权限*/
        }).then(function (data) {
          _this.$parent.util.request({
            url: "entry/wxapp/set_user_address",
            data: {
              nickname: _this.user.nickname,
              address: data
            },
            success: function success(res) {
              _wepy2.default.setStorageSync('user', res.data.data);
              _this.user.address = data;
              _this.$apply();
            }
          });
        }).catch(function () {
          /*点击取消按钮后*/
          wx.getSetting({
            success: function success(res) {
              console.log(res);
              if (!res.authSetting['scope.userLocation']) {
                _this.is_show_accredit = true;
                _this.$apply();
              }
            }
          });
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(User, [{
    key: 'onLoad',
    value: function onLoad() {
      var _this2 = this;

      this.$parent.util.request({
        url: 'entry/wxapp/system_setting',
        success: function success(res) {
          _this2.service_phone = res.data.data.phone;
          _this2.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this3 = this;

      /*每次先将这设置为空*/
      this.prize_list = [];
      this.user = _wepy2.default.getStorageSync('user');
      this.$parent.util.request({
        url: 'entry/wxapp/user_prize_code',
        data: {
          nickname: this.user.nickname
        },
        success: function success(res) {
          var list = res.data.data;
          list.forEach(function (item) {
            _this3.prize_list.push(item.prize_code);
          });
          _this3.$apply();
        }
      });
    }
  }]);

  return User;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(User , 'pages/user'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiVXNlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiZGF0YSIsImlzX3Nob3dfYWNjcmVkaXQiLCJzZXJ2aWNlX3Bob25lIiwidXNlciIsInByaXplX2xpc3QiLCJpc19lZGl0X25hbWUiLCJpc19lZGl0X3Bob25lIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiY2FsbF9zZXJ2aWNlX3Bob25lIiwid3giLCJtYWtlUGhvbmVDYWxsIiwicGhvbmVOdW1iZXIiLCJpc19hbGVydF9jbG9zZSIsImNoYW5nZV9uYW1lIiwiZSIsIm5hbWUiLCJkZXRhaWwiLCJjaGFuZ2VfcGhvbmUiLCJwaG9uZSIsImVkaXRfbmFtZSIsIiRwYXJlbnQiLCJ1dGlsIiwicmVxdWVzdCIsInVybCIsIm5pY2tuYW1lIiwic3VjY2VzcyIsInJlcyIsIndlcHkiLCJzZXRTdG9yYWdlU3luYyIsImVkaXRfcGhvbmUiLCJlZGl0X2FkZHJlc3MiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNob29zZUxvY2F0aW9uIiwiYWRkcmVzcyIsImZhaWwiLCJ0aGVuIiwiJGFwcGx5IiwiY2F0Y2giLCJnZXRTZXR0aW5nIiwiY29uc29sZSIsImxvZyIsImF1dGhTZXR0aW5nIiwiZ2V0U3RvcmFnZVN5bmMiLCJsaXN0IiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwicHJpemVfY29kZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQLHlCQUFtQjtBQUNqQixzQkFBYyxpQ0FERztBQUVqQixxQkFBYSxnQ0FGSTtBQUdqQixzQkFBYyxpQ0FIRztBQUlqQixvQkFBWSwrQkFKSztBQUtqQiwwQkFBa0IscUNBTEQ7QUFNakIscUJBQWEsZ0NBTkk7QUFPakIsb0JBQVksK0JBUEs7QUFR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bUJBQUs1QyxVQUFMLENBQWdCNkMsSUFBaEIsQ0FBcUJELEtBQUtFLFVBQTFCO0FBQ0QsV0FGRDtBQUdBLGlCQUFLWCxNQUFMO0FBQ0Q7QUFYdUIsT0FBMUI7QUFhRDs7OztFQXBKK0JYLGVBQUt1QixJOztrQkFBbEJ2RCxJIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnLFxyXG4gICAgICAndXNpbmdDb21wb25lbnRzJzoge1xyXG4gICAgICAgICd2YW4tYnV0dG9uJzogJy4uL2NvbXBvbmVudHMvdmFudC9idXR0b24vaW5kZXgnLFxyXG4gICAgICAgICd2YW4tdG9hc3QnOiAnLi4vY29tcG9uZW50cy92YW50L3RvYXN0L2luZGV4JyxcclxuICAgICAgICAndmFuLWRpYWxvZyc6ICcuLi9jb21wb25lbnRzL3ZhbnQvZGlhbG9nL2luZGV4JyxcclxuICAgICAgICAndmFuLWNlbGwnOiAnLi4vY29tcG9uZW50cy92YW50L2NlbGwvaW5kZXgnLFxyXG4gICAgICAgICd2YW4tY2VsbC1ncm91cCc6ICcuLi9jb21wb25lbnRzL3ZhbnQvY2VsbC1ncm91cC9pbmRleCcsXHJcbiAgICAgICAgJ3Zhbi1maWVsZCc6ICcuLi9jb21wb25lbnRzL3ZhbnQvZmllbGQvaW5kZXgnLFxyXG4gICAgICAgICd2YW4taWNvbic6ICcuLi9jb21wb25lbnRzL3ZhbnQvaWNvbi9pbmRleCcsXHJcbiAgICAgICAgJ3Zhbi1jb2xsYXBzZSc6ICcuLi9jb21wb25lbnRzL3ZhbnQvY29sbGFwc2UvaW5kZXgnLFxyXG4gICAgICAgICd2YW4tY29sbGFwc2UtaXRlbSc6ICcuLi9jb21wb25lbnRzL3ZhbnQvY29sbGFwc2UtaXRlbS9pbmRleCdcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRzID0ge307XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAvKuaYr+WQpuW8gOWQr+aOiOadg+W8ueahhiovXHJcbiAgICAgIGlzX3Nob3dfYWNjcmVkaXQ6ZmFsc2UsXHJcbiAgICAgIHNlcnZpY2VfcGhvbmU6IG51bGwsXHJcbiAgICAgIHVzZXI6IG51bGwsXHJcbiAgICAgIHByaXplX2xpc3Q6IFtdLFxyXG4gICAgICAvL+aYr+WQpuemgeeUqOe8lui+keWQjeensOahhlxyXG4gICAgICBpc19lZGl0X25hbWU6IHRydWUsXHJcbiAgICAgIGlzX2VkaXRfcGhvbmU6IHRydWVcclxuICAgIH07XHJcbiAgICBjb21wdXRlZCA9IHt9O1xyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIC8q5ouo5omT55S16K+dKi9cclxuICAgICAgY2FsbF9zZXJ2aWNlX3Bob25lOigpPT57XHJcbiAgICAgICAgd3gubWFrZVBob25lQ2FsbCh7XHJcbiAgICAgICAgICBwaG9uZU51bWJlcjogdGhpcy5zZXJ2aWNlX3Bob25lXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgLyrlj5bmtojlvLnmoYYqL1xyXG4gICAgICBpc19hbGVydF9jbG9zZTooKT0+e1xyXG4gICAgICAgIHRoaXMuaXNfc2hvd19hY2NyZWRpdCA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgY2hhbmdlX25hbWU6IChlKSA9PiB7XHJcbiAgICAgICAgdGhpcy51c2VyLm5hbWUgPSBlLmRldGFpbDtcclxuICAgICAgfSxcclxuICAgICAgY2hhbmdlX3Bob25lOiAoZSkgPT4ge1xyXG4gICAgICAgIHRoaXMudXNlci5waG9uZSA9IGUuZGV0YWlsO1xyXG4gICAgICB9LFxyXG4gICAgICAvKuS/ruaUueWQjeensCovXHJcbiAgICAgIGVkaXRfbmFtZTogKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5pc19lZGl0X25hbWUpIHtcclxuICAgICAgICAgIHRoaXMuJHBhcmVudC51dGlsLnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICdlbnRyeS93eGFwcC9zZXRfdXNlcl9uYW1lJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIG5pY2tuYW1lOiB0aGlzLnVzZXIubmlja25hbWUsXHJcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy51c2VyLm5hbWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3VzZXInLCByZXMuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNfZWRpdF9uYW1lID0gIXRoaXMuaXNfZWRpdF9uYW1lO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgLyrkv67mlLnnlLXor50qL1xyXG4gICAgICBlZGl0X3Bob25lOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzX2VkaXRfcGhvbmUpIHtcclxuICAgICAgICAgIHRoaXMuJHBhcmVudC51dGlsLnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICdlbnRyeS93eGFwcC9zZXRfdXNlcl9waG9uZScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBuaWNrbmFtZTogdGhpcy51c2VyLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICAgIHBob25lOiB0aGlzLnVzZXIucGhvbmVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3VzZXInLCByZXMuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNfZWRpdF9waG9uZSA9ICF0aGlzLmlzX2VkaXRfcGhvbmU7XHJcbiAgICAgIH0sXHJcbiAgICAgIC8q57yW6L6R5Zyw5Z2AKi9cclxuICAgICAgZWRpdF9hZGRyZXNzOigpPT57XHJcbiAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgd3guY2hvb3NlTG9jYXRpb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOihyZXMpPT57XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXMuYWRkcmVzcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6KCk9PntcclxuICAgICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC8q5bey57uP6I635Y+W5p2D6ZmQKi9cclxuICAgICAgICB9KS50aGVuKChkYXRhKT0+e1xyXG4gICAgICAgICAgdGhpcy4kcGFyZW50LnV0aWwucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDpcImVudHJ5L3d4YXBwL3NldF91c2VyX2FkZHJlc3NcIixcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgbmlja25hbWU6dGhpcy51c2VyLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICAgIGFkZHJlc3M6ZGF0YVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOihyZXMpPT57XHJcbiAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndXNlcicscmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgdGhpcy51c2VyLmFkZHJlc3MgPSBkYXRhO1xyXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKCgpPT57XHJcbiAgICAgICAgICAvKueCueWHu+WPlua2iOaMiemSruWQjiovXHJcbiAgICAgICAgICB3eC5nZXRTZXR0aW5nKHtcclxuICAgICAgICAgICAgc3VjY2VzczoocmVzKT0+e1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgaWYoIXJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckxvY2F0aW9uJ10pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19zaG93X2FjY3JlZGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIHRoaXMuJHBhcmVudC51dGlsLnJlcXVlc3Qoe1xyXG4gICAgICAgIHVybDogJ2VudHJ5L3d4YXBwL3N5c3RlbV9zZXR0aW5nJyxcclxuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNlcnZpY2VfcGhvbmUgPSByZXMuZGF0YS5kYXRhLnBob25lO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgLyrmr4/mrKHlhYjlsIbov5norr7nva7kuLrnqboqL1xyXG4gICAgICB0aGlzLnByaXplX2xpc3QgPSBbXTtcclxuICAgICAgdGhpcy51c2VyID0gd2VweS5nZXRTdG9yYWdlU3luYygndXNlcicpO1xyXG4gICAgICB0aGlzLiRwYXJlbnQudXRpbC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6ICdlbnRyeS93eGFwcC91c2VyX3ByaXplX2NvZGUnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIG5pY2tuYW1lOiB0aGlzLnVzZXIubmlja25hbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmRhdGEuZGF0YTtcclxuICAgICAgICAgIGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByaXplX2xpc3QucHVzaChpdGVtLnByaXplX2NvZGUpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=