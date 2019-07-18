'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var basic = exports.basic = Behavior({
    methods: {
        $emit: function $emit() {
            this.triggerEvent.apply(this, arguments);
        },
        getRect: function getRect(selector, all) {
            var _this = this;

            return new Promise(function (resolve) {
                wx.createSelectorQuery().in(_this)[all ? 'selectAll' : 'select'](selector).boundingClientRect(function (rect) {
                    if (all && Array.isArray(rect) && rect.length) {
                        resolve(rect);
                    }
                    if (!all && rect) {
                        resolve(rect);
                    }
                }).exec();
            });
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2ljLmpzIl0sIm5hbWVzIjpbImJhc2ljIiwiQmVoYXZpb3IiLCJtZXRob2RzIiwiJGVtaXQiLCJ0cmlnZ2VyRXZlbnQiLCJhcHBseSIsImFyZ3VtZW50cyIsImdldFJlY3QiLCJzZWxlY3RvciIsImFsbCIsIlByb21pc2UiLCJ3eCIsImNyZWF0ZVNlbGVjdG9yUXVlcnkiLCJpbiIsImJvdW5kaW5nQ2xpZW50UmVjdCIsIkFycmF5IiwiaXNBcnJheSIsInJlY3QiLCJsZW5ndGgiLCJyZXNvbHZlIiwiZXhlYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxJQUFNQSx3QkFBUUMsU0FBUztBQUMxQkMsYUFBUztBQUNMQyxhQURLLG1CQUNHO0FBQ0osaUJBQUtDLFlBQUwsQ0FBa0JDLEtBQWxCLENBQXdCLElBQXhCLEVBQThCQyxTQUE5QjtBQUNILFNBSEk7QUFJTEMsZUFKSyxtQkFJR0MsUUFKSCxFQUlhQyxHQUpiLEVBSWtCO0FBQUE7O0FBQ25CLG1CQUFPLElBQUlDLE9BQUosQ0FBWSxtQkFBVztBQUMxQkMsbUJBQUdDLG1CQUFILEdBQ0tDLEVBREwsQ0FDUSxLQURSLEVBQ2NKLE1BQU0sV0FBTixHQUFvQixRQURsQyxFQUM0Q0QsUUFENUMsRUFFS00sa0JBRkwsQ0FFd0IsZ0JBQVE7QUFDNUIsd0JBQUlMLE9BQU9NLE1BQU1DLE9BQU4sQ0FBY0MsSUFBZCxDQUFQLElBQThCQSxLQUFLQyxNQUF2QyxFQUErQztBQUMzQ0MsZ0NBQVFGLElBQVI7QUFDSDtBQUNELHdCQUFJLENBQUNSLEdBQUQsSUFBUVEsSUFBWixFQUFrQjtBQUNkRSxnQ0FBUUYsSUFBUjtBQUNIO0FBQ0osaUJBVEQsRUFVS0csSUFWTDtBQVdILGFBWk0sQ0FBUDtBQWFIO0FBbEJJO0FBRGlCLENBQVQsQ0FBZCIsImZpbGUiOiJiYXNpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBiYXNpYyA9IEJlaGF2aW9yKHtcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAkZW1pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFJlY3Qoc2VsZWN0b3IsIGFsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KClcclxuICAgICAgICAgICAgICAgICAgICAuaW4odGhpcylbYWxsID8gJ3NlbGVjdEFsbCcgOiAnc2VsZWN0J10oc2VsZWN0b3IpXHJcbiAgICAgICAgICAgICAgICAgICAgLmJvdW5kaW5nQ2xpZW50UmVjdChyZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsICYmIEFycmF5LmlzQXJyYXkocmVjdCkgJiYgcmVjdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbGwgJiYgcmVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmV4ZWMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19