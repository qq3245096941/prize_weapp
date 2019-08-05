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
    }, _this.computed = {}, _this.methods = {
      /*跳转至公司简介*/
      navt_company: function navt_company() {
        wx.navigateTo({
          url: "/pages/company"
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInVzaW5nQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJkYXRhIiwic3lzdGVtX3NldHRpbmciLCJzaG9wcyIsImNvbXB1dGVkIiwibWV0aG9kcyIsIm5hdnRfY29tcGFueSIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIiRwYXJlbnQiLCJ1dGlsIiwicmVxdWVzdCIsInN1Y2Nlc3MiLCJyZXMiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLElBRGpCO0FBRVBDLHVCQUFpQjtBQUNmLHNCQUFjLGlDQURDO0FBRWYscUJBQWEsZ0NBRkU7QUFHZixzQkFBYztBQUhDO0FBRlYsSyxRQVNUQyxVLEdBQWEsRSxRQUliQyxJLEdBQU87QUFDTEMsc0JBQWUsRUFEVjtBQUVMQyxhQUFNO0FBRkQsSyxRQUlQQyxRLEdBQVcsRSxRQUNYQyxPLEdBQVU7QUFDUjtBQUNBQyxrQkFGUSwwQkFFTTtBQUNaQyxXQUFHQyxVQUFILENBQWM7QUFDWkMsZUFBSTtBQURRLFNBQWQ7QUFHRDtBQU5PLEs7Ozs7OzZCQVFELENBRVI7Ozs2QkFFUTtBQUFBOztBQUNQO0FBQ0EsV0FBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCQyxPQUFsQixDQUEwQjtBQUN4QkgsYUFBSSw0QkFEb0I7QUFFeEJJLGlCQUFRLGlCQUFDQyxHQUFELEVBQU87QUFDYixpQkFBS1osY0FBTCxHQUFzQlksSUFBSWIsSUFBSixDQUFTQSxJQUEvQjtBQUNBLGlCQUFLYyxNQUFMO0FBQ0Q7QUFMdUIsT0FBMUI7O0FBUUE7QUFDQSxXQUFLTCxPQUFMLENBQWFDLElBQWIsQ0FBa0JDLE9BQWxCLENBQTBCO0FBQ3hCSCxhQUFJLDJCQURvQjtBQUV4QkksaUJBQVEsaUJBQUNDLEdBQUQsRUFBTztBQUNiLGlCQUFLWCxLQUFMLEdBQWFXLElBQUliLElBQUosQ0FBU0EsSUFBdEI7QUFDQSxpQkFBS2MsTUFBTDtBQUNEO0FBTHVCLE9BQTFCO0FBT0Q7Ozs7RUFqRGdDQyxlQUFLQyxJOztrQkFBbkJyQixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCI7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpppbpobUnLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgIFwidmFuLWJ1dHRvblwiOiBcIi4uL2NvbXBvbmVudHMvdmFudC9idXR0b24vaW5kZXhcIixcbiAgICAgICAgXCJ2YW4tdG9hc3RcIjogXCIuLi9jb21wb25lbnRzL3ZhbnQvdG9hc3QvaW5kZXhcIixcbiAgICAgICAgXCJ2YW4tZGlhbG9nXCI6IFwiLi4vY29tcG9uZW50cy92YW50L2RpYWxvZy9pbmRleFwiXG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbXBvbmVudHMgPSB7XG5cbiAgICB9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgIHN5c3RlbV9zZXR0aW5nOltdLFxuICAgICAgc2hvcHM6W11cbiAgICB9O1xuICAgIGNvbXB1dGVkID0ge307XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8q6Lez6L2s6Iez5YWs5Y+4566A5LuLKi9cbiAgICAgIG5hdnRfY29tcGFueSgpe1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6XCIvcGFnZXMvY29tcGFueVwiXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICAvKuiOt+WPluezu+e7n+iuvue9riovXG4gICAgICB0aGlzLiRwYXJlbnQudXRpbC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOlwiZW50cnkvd3hhcHAvc3lzdGVtX3NldHRpbmdcIixcbiAgICAgICAgc3VjY2VzczoocmVzKT0+e1xuICAgICAgICAgIHRoaXMuc3lzdGVtX3NldHRpbmcgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvKuiOt+WPluaJgOacieWVhuWTgSovXG4gICAgICB0aGlzLiRwYXJlbnQudXRpbC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOlwiZW50cnkvd3hhcHAvZ2V0X3Nob3BzX2FsbFwiLFxuICAgICAgICBzdWNjZXNzOihyZXMpPT57XG4gICAgICAgICAgdGhpcy5zaG9wcyA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==