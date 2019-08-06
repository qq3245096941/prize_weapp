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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsInNpdGVJbmZvIiwicmVxdWlyZSIsInV0aWwiLCJ1c2UiLCJ3ZXB5IiwiZ2V0U3RvcmFnZVN5bmMiLCJsZW5ndGgiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBR0Usc0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxVQUlkQSxNQUpjLEdBSUw7QUFDUEMsYUFBTyxDQUNMLGFBREssRUFDVSxhQURWLEVBQ3dCLFlBRHhCLEVBQ3FDLGVBRHJDLEVBQ3FELGVBRHJELENBREE7QUFJUEMsY0FBUSxFQUpEO0FBT1AsZ0JBQVU7QUFDUixnQkFBUSxDQUNOO0FBQ0UsOEJBQW9CLHNCQUR0QjtBQUVFLHNCQUFZLGdCQUZkO0FBR0Usc0JBQVksYUFIZDtBQUlFLGtCQUFRO0FBSlYsU0FETSxFQU9OO0FBQ0UsOEJBQW9CLHdCQUR0QjtBQUVFLHNCQUFZLGtCQUZkO0FBR0Usc0JBQVksYUFIZDtBQUlFLGtCQUFRO0FBSlYsU0FQTSxFQWFOO0FBQ0UsOEJBQW9CLHNCQUR0QjtBQUVFLHNCQUFZLGdCQUZkO0FBR0Usc0JBQVksWUFIZDtBQUlFLGtCQUFRO0FBSlYsU0FiTTtBQURBLE9BUEg7QUE2QlAsb0JBQWM7QUFDWiw4QkFBc0I7QUFDcEIsa0JBQVE7QUFEWTtBQURWO0FBN0JQLEtBSks7QUFBQSxVQXVDZEMsUUF2Q2MsR0F1Q0hDLFFBQVEsWUFBUixDQXZDRztBQUFBLFVBd0NkQyxJQXhDYyxHQXdDUEQsUUFBUSxXQUFSLENBeENPOztBQUVaLFVBQUtFLEdBQUwsQ0FBUyxXQUFUO0FBRlk7QUFHYjs7OzsrQkF1Q1UsQ0FFVjs7OzZCQUVPO0FBQ04sVUFBR0MsZUFBS0MsY0FBTCxDQUFvQixNQUFwQixFQUE0QkMsTUFBNUIsS0FBcUMsQ0FBeEMsRUFBMEM7QUFDeENGLHVCQUFLRyxVQUFMLENBQWdCO0FBQ2RDLGVBQUk7QUFEVSxTQUFoQjtBQUdEO0FBQ0Y7Ozs7RUFyRDBCSixlQUFLSyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gXCJ3ZXB5XCJcclxuICBpbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLnVzZSgncHJvbWlzaWZ5Jyk7XHJcbiAgICB9XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIHBhZ2VzOiBbXHJcbiAgICAgICAgJ3BhZ2VzL2luZGV4JywgJ3BhZ2VzL3ByaXplJywncGFnZXMvdXNlcicsXCJwYWdlcy9nZXR1c2VyXCIsXCJwYWdlcy9jb21wYW55XCJcclxuICAgICAgXSxcclxuICAgICAgd2luZG93OiB7XHJcblxyXG4gICAgICB9LFxyXG4gICAgICBcInRhYkJhclwiOiB7XHJcbiAgICAgICAgXCJsaXN0XCI6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiLi9saWIvaG9tZV9jbGljay5wbmdcIixcclxuICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcIi4vbGliL2hvbWUucG5nXCIsXHJcbiAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9pbmRleFwiLFxyXG4gICAgICAgICAgICBcInRleHRcIjogXCLpppbpobVcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiLi9saWIvdHJvcGh5X2NsaWNrLnBuZ1wiLFxyXG4gICAgICAgICAgICBcImljb25QYXRoXCI6IFwiLi9saWIvdHJvcGh5LnBuZ1wiLFxyXG4gICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvcHJpemVcIixcclxuICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5oq95aWWXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcIi4vbGliL3VzZXJfY2xpY2sucG5nXCIsXHJcbiAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCIuL2xpYi91c2VyLnBuZ1wiLFxyXG4gICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvdXNlclwiLFxyXG4gICAgICAgICAgICBcInRleHRcIjogXCLkuKrkurrkuK3lv4NcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwZXJtaXNzaW9uXCI6IHtcclxuICAgICAgICBcInNjb3BlLnVzZXJMb2NhdGlvblwiOiB7XHJcbiAgICAgICAgICBcImRlc2NcIjogXCLor7fmsYLojrflj5bmgqjnmoTkv6Hmga9cIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHNpdGVJbmZvID0gcmVxdWlyZShcIi4vc2l0ZWluZm9cIik7XHJcbiAgICB1dGlsID0gcmVxdWlyZShcIi4vanMvdXRpbFwiKTtcclxuXHJcbiAgICBvbkxhdW5jaCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCl7XHJcbiAgICAgIGlmKHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1c2VyXCIpLmxlbmd0aD09PTApe1xyXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICB1cmw6XCIuL3BhZ2VzL2dldHVzZXJcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==