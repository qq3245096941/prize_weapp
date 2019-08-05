'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/prize', 'pages/user', "pages/getuser", "pages/company"],
      window: {},
      "tabBar": {
        "list": [{
          "selectedIconPath": "./lib/home_click.png",
          "iconPath": "./lib/home.png",
          "pagePath": "pages/index",
          "text": "首页"
        }, {
          "selectedIconPath": "./lib/trophy_click.png",
          "iconPath": "./lib/trophy.png",
          "pagePath": "pages/prize",
          "text": "抽奖"
        }, {
          "selectedIconPath": "./lib/user_click.png",
          "iconPath": "./lib/user.png",
          "pagePath": "pages/user",
          "text": "个人中心"
        }]
      },
      "permission": {
        "scope.userLocation": {
          "desc": "请求获取您的信息"
        }
      }
    };
    _this.siteInfo = require('./siteinfo.js');
    _this.util = require('./js/util.js');

    _this.use('promisify');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {}
  }, {
    key: 'onShow',
    value: function onShow() {
      if (_wepy2.default.getStorageSync("user").length === 0) {
        _wepy2.default.navigateTo({
          url: "./pages/getuser"
        });
      }
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsInNpdGVJbmZvIiwicmVxdWlyZSIsInV0aWwiLCJ1c2UiLCJ3ZXB5IiwiZ2V0U3RvcmFnZVN5bmMiLCJsZW5ndGgiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBR0Usc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxVQUlkQSxNQUpjLEdBSUw7QUFDUEMsYUFBTyxDQUNMLGFBREssRUFDVSxhQURWLEVBQ3dCLFlBRHhCLEVBQ3FDLGVBRHJDLEVBQ3FELGVBRHJELENBREE7QUFJUEMsY0FBUSxFQUpEO0FBT1AsZ0JBQVU7QUFDUixnQkFBUSxDQUNOO0FBQ0UsOEJBQW9CLHNCQUR0QjtBQUVFLHNCQUFZLGdCQUZkO0FBR0Usc0JBQVksYUFIZDtBQUlFLGtCQUFRO0FBSlYsU0FETSxFQU9OO0FBQ0UsOEJBQW9CLHdCQUR0QjtBQUVFLHNCQUFZLGtCQUZkO0FBR0Usc0JBQVksYUFIZDtBQUlFLGtCQUFRO0FBSlYsU0FQTSxFQWFOO0FBQ0UsOEJBQW9CLHNCQUR0QjtBQUVFLHNCQUFZLGdCQUZkO0FBR0Usc0JBQVksWUFIZDtBQUlFLGtCQUFRO0FBSlYsU0FiTTtBQURBLE9BUEg7QUE2QlAsb0JBQWM7QUFDWiw4QkFBc0I7QUFDcEIsa0JBQVE7QUFEWTtBQURWO0FBN0JQLEtBSks7QUFBQSxVQXVDZEMsUUF2Q2MsR0F1Q0hDLFFBQVEsWUFBUixDQXZDRztBQUFBLFVBd0NkQyxJQXhDYyxHQXdDUEQsUUFBUSxXQUFSLENBeENPOztBQUVaLFVBQUtFLEdBQUwsQ0FBUyxXQUFUO0FBRlk7QUFHYjs7OzsrQkF1Q1UsQ0FFVjs7OzZCQUVPO0FBQ04sVUFBR0MsZUFBS0MsY0FBTCxDQUFvQixNQUFwQixFQUE0QkMsTUFBNUIsS0FBcUMsQ0FBeEMsRUFBMEM7QUFDeENGLHVCQUFLRyxVQUFMLENBQWdCO0FBQ2RDLGVBQUk7QUFEVSxTQUFoQjtBQUdEO0FBQ0Y7Ozs7RUFyRDBCSixlQUFLSyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tIFwid2VweVwiXG4gIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy51c2UoJ3Byb21pc2lmeScpO1xuICAgIH1cbiAgICBjb25maWcgPSB7XG4gICAgICBwYWdlczogW1xuICAgICAgICAncGFnZXMvaW5kZXgnLCAncGFnZXMvcHJpemUnLCdwYWdlcy91c2VyJyxcInBhZ2VzL2dldHVzZXJcIixcInBhZ2VzL2NvbXBhbnlcIlxuICAgICAgXSxcbiAgICAgIHdpbmRvdzoge1xuXG4gICAgICB9LFxuICAgICAgXCJ0YWJCYXJcIjoge1xuICAgICAgICBcImxpc3RcIjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcIi4vbGliL2hvbWVfY2xpY2sucG5nXCIsXG4gICAgICAgICAgICBcImljb25QYXRoXCI6IFwiLi9saWIvaG9tZS5wbmdcIixcbiAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9pbmRleFwiLFxuICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi6aaW6aG1XCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcIi4vbGliL3Ryb3BoeV9jbGljay5wbmdcIixcbiAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCIuL2xpYi90cm9waHkucG5nXCIsXG4gICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvcHJpemVcIixcbiAgICAgICAgICAgIFwidGV4dFwiOiBcIuaKveWlllwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCIuL2xpYi91c2VyX2NsaWNrLnBuZ1wiLFxuICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcIi4vbGliL3VzZXIucG5nXCIsXG4gICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvdXNlclwiLFxuICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5Liq5Lq65Lit5b+DXCJcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBcInBlcm1pc3Npb25cIjoge1xuICAgICAgICBcInNjb3BlLnVzZXJMb2NhdGlvblwiOiB7XG4gICAgICAgICAgXCJkZXNjXCI6IFwi6K+35rGC6I635Y+W5oKo55qE5L+h5oGvXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgc2l0ZUluZm8gPSByZXF1aXJlKFwiLi9zaXRlaW5mb1wiKTtcbiAgICB1dGlsID0gcmVxdWlyZShcIi4vanMvdXRpbFwiKTtcblxuICAgIG9uTGF1bmNoKCkge1xuXG4gICAgfVxuXG4gICAgb25TaG93KCl7XG4gICAgICBpZih3ZXB5LmdldFN0b3JhZ2VTeW5jKFwidXNlclwiKS5sZW5ndGg9PT0wKXtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6XCIuL3BhZ2VzL2dldHVzZXJcIlxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19