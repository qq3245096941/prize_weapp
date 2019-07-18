'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.observeProps = observeProps;
function observeProps(props) {
    if (!props) {
        return;
    }
    Object.keys(props).forEach(function (key) {
        var prop = props[key];
        if (prop === null || !('type' in prop)) {
            prop = { type: prop };
        }
        var _prop = prop,
            observer = _prop.observer;

        prop.observer = function () {
            if (observer) {
                if (typeof observer === 'string') {
                    observer = this[observer];
                }
                observer.apply(this, arguments);
            }
            this.set();
        };
        props[key] = prop;
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb3BzLmpzIl0sIm5hbWVzIjpbIm9ic2VydmVQcm9wcyIsInByb3BzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJwcm9wIiwia2V5IiwidHlwZSIsIm9ic2VydmVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBQWdCQSxZLEdBQUFBLFk7QUFBVCxTQUFTQSxZQUFULENBQXNCQyxLQUF0QixFQUE2QjtBQUNoQyxRQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNSO0FBQ0g7QUFDREMsV0FBT0MsSUFBUCxDQUFZRixLQUFaLEVBQW1CRyxPQUFuQixDQUEyQixlQUFPO0FBQzlCLFlBQUlDLE9BQU9KLE1BQU1LLEdBQU4sQ0FBWDtBQUNBLFlBQUlELFNBQVMsSUFBVCxJQUFpQixFQUFFLFVBQVVBLElBQVosQ0FBckIsRUFBd0M7QUFDcENBLG1CQUFPLEVBQUVFLE1BQU1GLElBQVIsRUFBUDtBQUNIO0FBSjZCLG9CQUtYQSxJQUxXO0FBQUEsWUFLeEJHLFFBTHdCLFNBS3hCQSxRQUx3Qjs7QUFNOUJILGFBQUtHLFFBQUwsR0FBZ0IsWUFBWTtBQUN4QixnQkFBSUEsUUFBSixFQUFjO0FBQ1Ysb0JBQUksT0FBT0EsUUFBUCxLQUFvQixRQUF4QixFQUFrQztBQUM5QkEsK0JBQVcsS0FBS0EsUUFBTCxDQUFYO0FBQ0g7QUFDREEseUJBQVNDLEtBQVQsQ0FBZSxJQUFmLEVBQXFCQyxTQUFyQjtBQUNIO0FBQ0QsaUJBQUtDLEdBQUw7QUFDSCxTQVJEO0FBU0FWLGNBQU1LLEdBQU4sSUFBYUQsSUFBYjtBQUNILEtBaEJEO0FBaUJIIiwiZmlsZSI6InByb3BzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVQcm9wcyhwcm9wcykge1xyXG4gICAgaWYgKCFwcm9wcykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgbGV0IHByb3AgPSBwcm9wc1trZXldO1xyXG4gICAgICAgIGlmIChwcm9wID09PSBudWxsIHx8ICEoJ3R5cGUnIGluIHByb3ApKSB7XHJcbiAgICAgICAgICAgIHByb3AgPSB7IHR5cGU6IHByb3AgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHsgb2JzZXJ2ZXIgfSA9IHByb3A7XHJcbiAgICAgICAgcHJvcC5vYnNlcnZlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyID0gdGhpc1tvYnNlcnZlcl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwcm9wc1trZXldID0gcHJvcDtcclxuICAgIH0pO1xyXG59XHJcbiJdfQ==