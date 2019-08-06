'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/vant/toast/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _util = require('./../util.js');

var _util2 = _interopRequireDefault(_util);

var _dialog = require('./../components/vant/dialog/dialog.js');

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Prize = function (_wepy$page) {
  _inherits(Prize, _wepy$page);

  function Prize() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Prize);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Prize.__proto__ || Object.getPrototypeOf(Prize)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '抽奖',
      usingComponents: {
        'van-button': '../components/vant/button/index',
        'van-toast': '../components/vant/toast/index',
        'van-dialog': '../components/vant/dialog/index',
        'van-cell': '../components/vant/cell/index',
        'van-cell-group': '../components/vant/cell-group/index',
        'van-tag': '../components/vant/tag/index'
      }
    }, _this.components = {}, _this.data = {
      current_prize: [0, 0, 0, 0, 0, 0, 0],
      //抽奖时间
      lottery_time: '0时0分0秒',
      //抽奖时间搓
      lottery_time_to_rub: '',
      /*抽奖设置*/
      prize_setting: [],
      /*是否显示中奖人*/
      show_the_winners: false,
      /*用户数据*/
      user: null,
      /*二维码随机数*/
      scene: 0,
      /*false表示不运行扫码那个环节*/
      is_scene: false
    }, _this.computed = {}, _this.methods = {
      //开始抽奖
      start_prize: function start_prize() {
        /*判断用户是否填写过手机号，地址，姓名*/
        var user = _wepy2.default.getStorageSync('user');
        if (user.name === '' || user.phone === '') {
          _dialog2.default.alert({
            message: '请完善您的个人信息'
          }).then(function () {
            _wepy2.default.switchTab({
              url: '/pages/user'
            });
          });
          return;
        }

        /*判断抽奖次数*/
        new Promise(function (resolve, reject) {
          if (_this.user.lottery_number > 0) {
            _this.$parent.util.request({
              url: 'entry/wxapp/start_prize',
              data: {
                nickname: _wepy2.default.getStorageSync('user').nickname
              },
              success: function success(res) {
                _this.current_prize = res.data.data.split("");
                (0, _toast2.default)('\u6210\u529F\u83B7\u5F97\u62BD\u5956\u7801\uFF1A' + res.data.data);
                //抽奖次数
                _this.user.lottery_number = _this.user.lottery_number - 1;
                _this.$apply();
                resolve(_this.user.lottery_number);
              }
            });
          } else {
            (0, _toast2.default)('您抽奖次数已用完');
          }
        }).then(function (data) {
          /*将抽奖次数上传*/
          _this.$parent.util.request({
            url: 'entry/wxapp/set_user_lottery_number',
            data: {
              nickname: _wepy2.default.getStorageSync('user').nickname,
              lottery_number: data
            },
            success: function success(res) {
              _wepy2.default.setStorageSync('user', res.data.data);
            }
          });
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Prize, [{
    key: 'onLoad',
    value: function onLoad(option) {
      var _this2 = this;

      if (option.scene) {
        this.is_scene = true;
        this.scene = decodeURIComponent(option.scene);
        this.$apply();
      }

      /*获取抽奖设置*/
      this.$parent.util.request({
        url: 'entry/wxapp/get_prize_setting',
        success: function success(res) {
          _this2.lottery_time_to_rub = res.data.data.lottery_time;
          //规则说明
          _this2.prize_setting = res.data.data;
          _this2.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this3 = this;

      /*判断本地是否有用户数据，并且当前验证二维码参数是否打开*/
      if (_wepy2.default.getStorageSync('user').length !== 0 && this.is_scene) {
        //增加抽奖次数
        new Promise(function (resolve) {
          /*获取后台存储在缓存中的随机数*/
          _this3.$parent.util.request({
            url: 'entry/wxapp/get_ran',
            success: function success(res) {
              resolve(res.data.data);
            }
          });
        }).then(function (data) {
          console.log(data);
          /*将后端随机数与前端随机数进行比对*/
          if (data !== _this3.scene) {
            _this3.is_scene = false;
            (0, _toast2.default)("扫描的二维码以过期");
            throw "强行中断";
          }
          _this3.$parent.util.request({
            url: 'entry/wxapp/add_Lottery_number',
            data: {
              nickname: _wepy2.default.getStorageSync('user').nickname
            },
            success: function success(res) {
              /*将获取到的新用户数据保存在本地*/
              _wepy2.default.setStorageSync('user', res.data.data);
              _this3.user.lottery_number = _wepy2.default.getStorageSync('user').lottery_number;
              _this3.$apply();
              (0, _toast2.default)("您成功增加了一次抽奖机会");
            }
          });
        }).then(function () {
          /*将后端随机数标记为空*/
          _this3.$parent.util.request({
            url: 'entry/wxapp/set_ran',
            success: function success(res) {
              _this3.is_scene = false;
            }
          });
        });
      }

      /*抽奖时间格式化*/
      setInterval(function () {
        _this3.lottery_time = _util2.default.clock(_this3.lottery_time_to_rub);
        _this3.show_the_winners = !_this3.lottery_time.bol;
        _this3.$apply();
      }, 1000);

      this.user = _wepy2.default.getStorageSync('user');
    }
  }]);

  return Prize;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Prize , 'pages/prize'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaXplLmpzIl0sIm5hbWVzIjpbIlByaXplIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInVzaW5nQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJkYXRhIiwiY3VycmVudF9wcml6ZSIsImxvdHRlcnlfdGltZSIsImxvdHRlcnlfdGltZV90b19ydWIiLCJwcml6ZV9zZXR0aW5nIiwic2hvd190aGVfd2lubmVycyIsInVzZXIiLCJzY2VuZSIsImlzX3NjZW5lIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwic3RhcnRfcHJpemUiLCJ3ZXB5IiwiZ2V0U3RvcmFnZVN5bmMiLCJuYW1lIiwicGhvbmUiLCJEaWFsb2ciLCJhbGVydCIsIm1lc3NhZ2UiLCJ0aGVuIiwic3dpdGNoVGFiIiwidXJsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJsb3R0ZXJ5X251bWJlciIsIiRwYXJlbnQiLCJ1dGlsIiwicmVxdWVzdCIsIm5pY2tuYW1lIiwic3VjY2VzcyIsInJlcyIsInNwbGl0IiwiJGFwcGx5Iiwic2V0U3RvcmFnZVN5bmMiLCJvcHRpb24iLCJkZWNvZGVVUklDb21wb25lbnQiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwic2V0SW50ZXJ2YWwiLCJjbG9jayIsImJvbCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyx1QkFBaUI7QUFDZixzQkFBYyxpQ0FEQztBQUVmLHFCQUFhLGdDQUZFO0FBR2Ysc0JBQWMsaUNBSEM7QUFJZixvQkFBWSwrQkFKRztBQUtmLDBCQUFrQixxQ0FMSDtBQU1mLG1CQUFXO0FBTkk7QUFGVixLLFFBV1RDLFUsR0FBYSxFLFFBR2JDLEksR0FBTztBQUNMQyxxQkFBYyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxF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ZCxJQTdCSCxDQTZCUSxZQUFNO0FBQ1o7QUFDQSxpQkFBS08sT0FBTCxDQUFhQyxJQUFiLENBQWtCQyxPQUFsQixDQUEwQjtBQUN4QlAsaUJBQUsscUJBRG1CO0FBRXhCUyxxQkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLHFCQUFLdkIsUUFBTCxHQUFnQixLQUFoQjtBQUNEO0FBSnVCLFdBQTFCO0FBTUQsU0FyQ0Q7QUFzQ0Q7O0FBRUQ7QUFDQWdDLGtCQUFZLFlBQU07QUFDaEIsZUFBS3RDLFlBQUwsR0FBb0J5QixlQUFLYyxLQUFMLENBQVcsT0FBS3RDLG1CQUFoQixDQUFwQjtBQUNBLGVBQUtFLGdCQUFMLEdBQXdCLENBQUMsT0FBS0gsWUFBTCxDQUFrQndDLEdBQTNDO0FBQ0EsZUFBS1QsTUFBTDtBQUNELE9BSkQsRUFJRyxJQUpIOztBQU1BLFdBQUszQixJQUFMLEdBQVlNLGVBQUtDLGNBQUwsQ0FBb0IsTUFBcEIsQ0FBWjtBQUNEOzs7O0VBNUpnQ0QsZUFBSytCLEk7O2tCQUFuQmhELEsiLCJmaWxlIjoicHJpemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3ZhbnQvdG9hc3QvdG9hc3QnO1xuICBpbXBvcnQgdXRpbCBmcm9tICcuLi91dGlsJztcbiAgaW1wb3J0IERpYWxvZyBmcm9tICcuLi9jb21wb25lbnRzL3ZhbnQvZGlhbG9nL2RpYWxvZyc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJpemUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmir3lpZYnLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd2YW4tYnV0dG9uJzogJy4uL2NvbXBvbmVudHMvdmFudC9idXR0b24vaW5kZXgnLFxuICAgICAgICAndmFuLXRvYXN0JzogJy4uL2NvbXBvbmVudHMvdmFudC90b2FzdC9pbmRleCcsXG4gICAgICAgICd2YW4tZGlhbG9nJzogJy4uL2NvbXBvbmVudHMvdmFudC9kaWFsb2cvaW5kZXgnLFxuICAgICAgICAndmFuLWNlbGwnOiAnLi4vY29tcG9uZW50cy92YW50L2NlbGwvaW5kZXgnLFxuICAgICAgICAndmFuLWNlbGwtZ3JvdXAnOiAnLi4vY29tcG9uZW50cy92YW50L2NlbGwtZ3JvdXAvaW5kZXgnLFxuICAgICAgICAndmFuLXRhZyc6ICcuLi9jb21wb25lbnRzL3ZhbnQvdGFnL2luZGV4J1xuICAgICAgfVxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHtcblxuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgIGN1cnJlbnRfcHJpemU6WzAsMCwwLDAsMCwwLDBdLFxuICAgICAgLy/mir3lpZbml7bpl7RcbiAgICAgIGxvdHRlcnlfdGltZTogJzDml7Yw5YiGMOenkicsXG4gICAgICAvL+aKveWlluaXtumXtOaQk1xuICAgICAgbG90dGVyeV90aW1lX3RvX3J1YjogJycsXG4gICAgICAvKuaKveWlluiuvue9riovXG4gICAgICBwcml6ZV9zZXR0aW5nOiBbXSxcbiAgICAgIC8q5piv5ZCm5pi+56S65Lit5aWW5Lq6Ki9cbiAgICAgIHNob3dfdGhlX3dpbm5lcnM6IGZhbHNlLFxuICAgICAgLyrnlKjmiLfmlbDmja4qL1xuICAgICAgdXNlcjpudWxsLFxuICAgICAgLyrkuoznu7TnoIHpmo/mnLrmlbAqL1xuICAgICAgc2NlbmU6MCxcbiAgICAgIC8qZmFsc2XooajnpLrkuI3ov5DooYzmiavnoIHpgqPkuKrnjq/oioIqL1xuICAgICAgaXNfc2NlbmU6ZmFsc2VcbiAgICB9O1xuICAgIGNvbXB1dGVkID0ge307XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8v5byA5aeL5oq95aWWXG4gICAgICBzdGFydF9wcml6ZTogKCkgPT4ge1xuICAgICAgICAvKuWIpOaWreeUqOaIt+aYr+WQpuWhq+WGmei/h+aJi+acuuWPt++8jOWcsOWdgO+8jOWnk+WQjSovXG4gICAgICAgIGxldCB1c2VyID0gd2VweS5nZXRTdG9yYWdlU3luYygndXNlcicpO1xuICAgICAgICBpZiAodXNlci5uYW1lID09PSAnJyB8fCB1c2VyLnBob25lID09PSAnJykge1xuICAgICAgICAgIERpYWxvZy5hbGVydCh7XG4gICAgICAgICAgICBtZXNzYWdlOiAn6K+35a6M5ZaE5oKo55qE5Liq5Lq65L+h5oGvJ1xuICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvdXNlcidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8q5Yik5pat5oq95aWW5qyh5pWwKi9cbiAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnVzZXIubG90dGVyeV9udW1iZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQudXRpbC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiAnZW50cnkvd3hhcHAvc3RhcnRfcHJpemUnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbmlja25hbWU6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXInKS5uaWNrbmFtZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50X3ByaXplID0gcmVzLmRhdGEuZGF0YS5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICBUb2FzdChg5oiQ5Yqf6I635b6X5oq95aWW56CB77yaJHtyZXMuZGF0YS5kYXRhfWApO1xuICAgICAgICAgICAgICAgIC8v5oq95aWW5qyh5pWwXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyLmxvdHRlcnlfbnVtYmVyID0gdGhpcy51c2VyLmxvdHRlcnlfbnVtYmVyIC0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy51c2VyLmxvdHRlcnlfbnVtYmVyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFRvYXN0KCfmgqjmir3lpZbmrKHmlbDlt7LnlKjlrownKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAvKuWwhuaKveWlluasoeaVsOS4iuS8oCovXG4gICAgICAgICAgdGhpcy4kcGFyZW50LnV0aWwucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdlbnRyeS93eGFwcC9zZXRfdXNlcl9sb3R0ZXJ5X251bWJlcicsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIG5pY2tuYW1lOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VyJykubmlja25hbWUsXG4gICAgICAgICAgICAgIGxvdHRlcnlfbnVtYmVyOiBkYXRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygndXNlcicsIHJlcy5kYXRhLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgaWYob3B0aW9uLnNjZW5lKSB7XG4gICAgICAgIHRoaXMuaXNfc2NlbmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjZW5lID0gZGVjb2RlVVJJQ29tcG9uZW50KG9wdGlvbi5zY2VuZSk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9XG5cbiAgICAgIC8q6I635Y+W5oq95aWW6K6+572uKi9cbiAgICAgIHRoaXMuJHBhcmVudC51dGlsLnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdlbnRyeS93eGFwcC9nZXRfcHJpemVfc2V0dGluZycsXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLmxvdHRlcnlfdGltZV90b19ydWIgPSByZXMuZGF0YS5kYXRhLmxvdHRlcnlfdGltZTtcbiAgICAgICAgICAvL+inhOWImeivtOaYjlxuICAgICAgICAgIHRoaXMucHJpemVfc2V0dGluZyA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgLyrliKTmlq3mnKzlnLDmmK/lkKbmnInnlKjmiLfmlbDmja7vvIzlubbkuJTlvZPliY3pqozor4Hkuoznu7TnoIHlj4LmlbDmmK/lkKbmiZPlvIAqL1xuICAgICAgaWYod2VweS5nZXRTdG9yYWdlU3luYygndXNlcicpLmxlbmd0aCE9PTAmJnRoaXMuaXNfc2NlbmUpIHtcbiAgICAgICAgLy/lop7liqDmir3lpZbmrKHmlbBcbiAgICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgLyrojrflj5blkI7lj7DlrZjlgqjlnKjnvJPlrZjkuK3nmoTpmo/mnLrmlbAqL1xuICAgICAgICAgIHRoaXMuJHBhcmVudC51dGlsLnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnZW50cnkvd3hhcHAvZ2V0X3JhbicsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAvKuWwhuWQjuerr+maj+acuuaVsOS4juWJjeerr+maj+acuuaVsOi/m+ihjOavlOWvuSovXG4gICAgICAgICAgaWYgKGRhdGEgIT09IHRoaXMuc2NlbmUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNfc2NlbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIFRvYXN0KFwi5omr5o+P55qE5LqM57u056CB5Lul6L+H5pyfXCIpO1xuICAgICAgICAgICAgdGhyb3cgXCLlvLrooYzkuK3mlq1cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kcGFyZW50LnV0aWwucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdlbnRyeS93eGFwcC9hZGRfTG90dGVyeV9udW1iZXInLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBuaWNrbmFtZTogd2VweS5nZXRTdG9yYWdlU3luYygndXNlcicpLm5pY2tuYW1lXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAvKuWwhuiOt+WPluWIsOeahOaWsOeUqOaIt+aVsOaNruS/neWtmOWcqOacrOWcsCovXG4gICAgICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3VzZXInLCByZXMuZGF0YS5kYXRhKTtcbiAgICAgICAgICAgICAgdGhpcy51c2VyLmxvdHRlcnlfbnVtYmVyID0gd2VweS5nZXRTdG9yYWdlU3luYygndXNlcicpLmxvdHRlcnlfbnVtYmVyO1xuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgICBUb2FzdChcIuaCqOaIkOWKn+WinuWKoOS6huS4gOasoeaKveWlluacuuS8mlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgLyrlsIblkI7nq6/pmo/mnLrmlbDmoIforrDkuLrnqboqL1xuICAgICAgICAgIHRoaXMuJHBhcmVudC51dGlsLnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnZW50cnkvd3hhcHAvc2V0X3JhbicsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaXNfc2NlbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICAvKuaKveWlluaXtumXtOagvOW8j+WMliovXG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHRoaXMubG90dGVyeV90aW1lID0gdXRpbC5jbG9jayh0aGlzLmxvdHRlcnlfdGltZV90b19ydWIpO1xuICAgICAgICB0aGlzLnNob3dfdGhlX3dpbm5lcnMgPSAhdGhpcy5sb3R0ZXJ5X3RpbWUuYm9sO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSwgMTAwMCk7XG5cbiAgICAgIHRoaXMudXNlciA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXInKTtcbiAgICB9XG4gIH1cbiJdfQ==