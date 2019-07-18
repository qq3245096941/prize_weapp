'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./../common/utils.js');

var defaultOptions = {
    type: 'text',
    mask: false,
    message: '',
    show: true,
    zIndex: 1000,
    duration: 3000,
    position: 'middle',
    forbidClick: false,
    loadingType: 'circular',
    selector: '#van-toast'
};
var queue = [];
var currentOptions = Object.assign({}, defaultOptions);
function parseOptions(message) {
    return (0, _utils.isObj)(message) ? message : { message: message };
}
function getContext() {
    var pages = getCurrentPages();
    return pages[pages.length - 1];
}
function Toast(toastOptions) {
    var options = Object.assign({}, currentOptions, parseOptions(toastOptions));
    var context = options.context || getContext();
    var toast = context.selectComponent(options.selector);
    if (!toast) {
        console.warn('未找到 van-toast 节点，请确认 selector 及 context 是否正确');
        return;
    }
    delete options.context;
    delete options.selector;
    toast.clear = function () {
        toast.set({ show: false });
        if (options.onClose) {
            options.onClose();
        }
    };
    queue.push(toast);
    toast.set(options);
    clearTimeout(toast.timer);
    if (options.duration > 0) {
        toast.timer = setTimeout(function () {
            toast.clear();
            queue = queue.filter(function (item) {
                return item !== toast;
            });
        }, options.duration);
    }
    return toast;
}
var createMethod = function createMethod(type) {
    return function (options) {
        return Toast(Object.assign({ type: type }, parseOptions(options)));
    };
};
Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');
Toast.clear = function () {
    queue.forEach(function (toast) {
        toast.clear();
    });
    queue = [];
};
Toast.setDefaultOptions = function (options) {
    Object.assign(currentOptions, options);
};
Toast.resetDefaultOptions = function () {
    currentOptions = Object.assign({}, defaultOptions);
};
exports.default = Toast;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvYXN0LmpzIl0sIm5hbWVzIjpbImRlZmF1bHRPcHRpb25zIiwidHlwZSIsIm1hc2siLCJtZXNzYWdlIiwic2hvdyIsInpJbmRleCIsImR1cmF0aW9uIiwicG9zaXRpb24iLCJmb3JiaWRDbGljayIsImxvYWRpbmdUeXBlIiwic2VsZWN0b3IiLCJxdWV1ZSIsImN1cnJlbnRPcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwicGFyc2VPcHRpb25zIiwiZ2V0Q29udGV4dCIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwibGVuZ3RoIiwiVG9hc3QiLCJ0b2FzdE9wdGlvbnMiLCJvcHRpb25zIiwiY29udGV4dCIsInRvYXN0Iiwic2VsZWN0Q29tcG9uZW50IiwiY29uc29sZSIsIndhcm4iLCJjbGVhciIsInNldCIsIm9uQ2xvc2UiLCJwdXNoIiwiY2xlYXJUaW1lb3V0IiwidGltZXIiLCJzZXRUaW1lb3V0IiwiZmlsdGVyIiwiaXRlbSIsImNyZWF0ZU1ldGhvZCIsImxvYWRpbmciLCJzdWNjZXNzIiwiZmFpbCIsImZvckVhY2giLCJzZXREZWZhdWx0T3B0aW9ucyIsInJlc2V0RGVmYXVsdE9wdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBLElBQU1BLGlCQUFpQjtBQUNuQkMsVUFBTSxNQURhO0FBRW5CQyxVQUFNLEtBRmE7QUFHbkJDLGFBQVMsRUFIVTtBQUluQkMsVUFBTSxJQUphO0FBS25CQyxZQUFRLElBTFc7QUFNbkJDLGNBQVUsSUFOUztBQU9uQkMsY0FBVSxRQVBTO0FBUW5CQyxpQkFBYSxLQVJNO0FBU25CQyxpQkFBYSxVQVRNO0FBVW5CQyxjQUFVO0FBVlMsQ0FBdkI7QUFZQSxJQUFJQyxRQUFRLEVBQVo7QUFDQSxJQUFJQyxpQkFBaUJDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCZCxjQUFsQixDQUFyQjtBQUNBLFNBQVNlLFlBQVQsQ0FBc0JaLE9BQXRCLEVBQStCO0FBQzNCLFdBQU8sa0JBQU1BLE9BQU4sSUFBaUJBLE9BQWpCLEdBQTJCLEVBQUVBLGdCQUFGLEVBQWxDO0FBQ0g7QUFDRCxTQUFTYSxVQUFULEdBQXNCO0FBQ2xCLFFBQU1DLFFBQVFDLGlCQUFkO0FBQ0EsV0FBT0QsTUFBTUEsTUFBTUUsTUFBTixHQUFlLENBQXJCLENBQVA7QUFDSDtBQUNELFNBQVNDLEtBQVQsQ0FBZUMsWUFBZixFQUE2QjtBQUN6QixRQUFNQyxVQUFVVCxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkYsY0FBbEIsRUFBa0NHLGFBQWFNLFlBQWIsQ0FBbEMsQ0FBaEI7QUFDQSxRQUFNRSxVQUFVRCxRQUFRQyxPQUFSLElBQW1CUCxZQUFuQztBQUNBLFFBQU1RLFFBQVFELFFBQVFFLGVBQVIsQ0FBd0JILFFBQVFaLFFBQWhDLENBQWQ7QUFDQSxRQUFJLENBQUNjLEtBQUwsRUFBWTtBQUNSRSxnQkFBUUMsSUFBUixDQUFhLDhDQUFiO0FBQ0E7QUFDSDtBQUNELFdBQU9MLFFBQVFDLE9BQWY7QUFDQSxXQUFPRCxRQUFRWixRQUFmO0FBQ0FjLFVBQU1JLEtBQU4sR0FBYyxZQUFNO0FBQ2hCSixjQUFNSyxHQUFOLENBQVUsRUFBRXpCLE1BQU0sS0FBUixFQUFWO0FBQ0EsWUFBSWtCLFFBQVFRLE9BQVosRUFBcUI7QUFDakJSLG9CQUFRUSxPQUFSO0FBQ0g7QUFDSixLQUxEO0FBTUFuQixVQUFNb0IsSUFBTixDQUFXUCxLQUFYO0FBQ0FBLFVBQU1LLEdBQU4sQ0FBVVAsT0FBVjtBQUNBVSxpQkFBYVIsTUFBTVMsS0FBbkI7QUFDQSxRQUFJWCxRQUFRaEIsUUFBUixHQUFtQixDQUF2QixFQUEwQjtBQUN0QmtCLGNBQU1TLEtBQU4sR0FBY0MsV0FBVyxZQUFNO0FBQzNCVixrQkFBTUksS0FBTjtBQUNBakIsb0JBQVFBLE1BQU13QixNQUFOLENBQWE7QUFBQSx1QkFBUUMsU0FBU1osS0FBakI7QUFBQSxhQUFiLENBQVI7QUFDSCxTQUhhLEVBR1hGLFFBQVFoQixRQUhHLENBQWQ7QUFJSDtBQUNELFdBQU9rQixLQUFQO0FBQ0g7QUFDRCxJQUFNYSxlQUFlLFNBQWZBLFlBQWU7QUFBQSxXQUFRLFVBQUNmLE9BQUQ7QUFBQSxlQUFhRixNQUFNUCxPQUFPQyxNQUFQLENBQWMsRUFBRWIsVUFBRixFQUFkLEVBQXdCYyxhQUFhTyxPQUFiLENBQXhCLENBQU4sQ0FBYjtBQUFBLEtBQVI7QUFBQSxDQUFyQjtBQUNBRixNQUFNa0IsT0FBTixHQUFnQkQsYUFBYSxTQUFiLENBQWhCO0FBQ0FqQixNQUFNbUIsT0FBTixHQUFnQkYsYUFBYSxTQUFiLENBQWhCO0FBQ0FqQixNQUFNb0IsSUFBTixHQUFhSCxhQUFhLE1BQWIsQ0FBYjtBQUNBakIsTUFBTVEsS0FBTixHQUFjLFlBQU07QUFDaEJqQixVQUFNOEIsT0FBTixDQUFjLGlCQUFTO0FBQ25CakIsY0FBTUksS0FBTjtBQUNILEtBRkQ7QUFHQWpCLFlBQVEsRUFBUjtBQUNILENBTEQ7QUFNQVMsTUFBTXNCLGlCQUFOLEdBQTBCLFVBQUNwQixPQUFELEVBQWE7QUFDbkNULFdBQU9DLE1BQVAsQ0FBY0YsY0FBZCxFQUE4QlUsT0FBOUI7QUFDSCxDQUZEO0FBR0FGLE1BQU11QixtQkFBTixHQUE0QixZQUFNO0FBQzlCL0IscUJBQWlCQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQmQsY0FBbEIsQ0FBakI7QUFDSCxDQUZEO2tCQUdlb0IsSyIsImZpbGUiOiJ0b2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzT2JqIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICB0eXBlOiAndGV4dCcsXHJcbiAgICBtYXNrOiBmYWxzZSxcclxuICAgIG1lc3NhZ2U6ICcnLFxyXG4gICAgc2hvdzogdHJ1ZSxcclxuICAgIHpJbmRleDogMTAwMCxcclxuICAgIGR1cmF0aW9uOiAzMDAwLFxyXG4gICAgcG9zaXRpb246ICdtaWRkbGUnLFxyXG4gICAgZm9yYmlkQ2xpY2s6IGZhbHNlLFxyXG4gICAgbG9hZGluZ1R5cGU6ICdjaXJjdWxhcicsXHJcbiAgICBzZWxlY3RvcjogJyN2YW4tdG9hc3QnXHJcbn07XHJcbmxldCBxdWV1ZSA9IFtdO1xyXG5sZXQgY3VycmVudE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucyk7XHJcbmZ1bmN0aW9uIHBhcnNlT3B0aW9ucyhtZXNzYWdlKSB7XHJcbiAgICByZXR1cm4gaXNPYmoobWVzc2FnZSkgPyBtZXNzYWdlIDogeyBtZXNzYWdlIH07XHJcbn1cclxuZnVuY3Rpb24gZ2V0Q29udGV4dCgpIHtcclxuICAgIGNvbnN0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICByZXR1cm4gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV07XHJcbn1cclxuZnVuY3Rpb24gVG9hc3QodG9hc3RPcHRpb25zKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgY3VycmVudE9wdGlvbnMsIHBhcnNlT3B0aW9ucyh0b2FzdE9wdGlvbnMpKTtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQgfHwgZ2V0Q29udGV4dCgpO1xyXG4gICAgY29uc3QgdG9hc3QgPSBjb250ZXh0LnNlbGVjdENvbXBvbmVudChvcHRpb25zLnNlbGVjdG9yKTtcclxuICAgIGlmICghdG9hc3QpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ+acquaJvuWIsCB2YW4tdG9hc3Qg6IqC54K577yM6K+356Gu6K6kIHNlbGVjdG9yIOWPiiBjb250ZXh0IOaYr+WQpuato+ehricpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGRlbGV0ZSBvcHRpb25zLmNvbnRleHQ7XHJcbiAgICBkZWxldGUgb3B0aW9ucy5zZWxlY3RvcjtcclxuICAgIHRvYXN0LmNsZWFyID0gKCkgPT4ge1xyXG4gICAgICAgIHRvYXN0LnNldCh7IHNob3c6IGZhbHNlIH0pO1xyXG4gICAgICAgIGlmIChvcHRpb25zLm9uQ2xvc2UpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5vbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHF1ZXVlLnB1c2godG9hc3QpO1xyXG4gICAgdG9hc3Quc2V0KG9wdGlvbnMpO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRvYXN0LnRpbWVyKTtcclxuICAgIGlmIChvcHRpb25zLmR1cmF0aW9uID4gMCkge1xyXG4gICAgICAgIHRvYXN0LnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRvYXN0LmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHF1ZXVlID0gcXVldWUuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdG9hc3QpO1xyXG4gICAgICAgIH0sIG9wdGlvbnMuZHVyYXRpb24pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvYXN0O1xyXG59XHJcbmNvbnN0IGNyZWF0ZU1ldGhvZCA9IHR5cGUgPT4gKG9wdGlvbnMpID0+IFRvYXN0KE9iamVjdC5hc3NpZ24oeyB0eXBlIH0sIHBhcnNlT3B0aW9ucyhvcHRpb25zKSkpO1xyXG5Ub2FzdC5sb2FkaW5nID0gY3JlYXRlTWV0aG9kKCdsb2FkaW5nJyk7XHJcblRvYXN0LnN1Y2Nlc3MgPSBjcmVhdGVNZXRob2QoJ3N1Y2Nlc3MnKTtcclxuVG9hc3QuZmFpbCA9IGNyZWF0ZU1ldGhvZCgnZmFpbCcpO1xyXG5Ub2FzdC5jbGVhciA9ICgpID0+IHtcclxuICAgIHF1ZXVlLmZvckVhY2godG9hc3QgPT4ge1xyXG4gICAgICAgIHRvYXN0LmNsZWFyKCk7XHJcbiAgICB9KTtcclxuICAgIHF1ZXVlID0gW107XHJcbn07XHJcblRvYXN0LnNldERlZmF1bHRPcHRpb25zID0gKG9wdGlvbnMpID0+IHtcclxuICAgIE9iamVjdC5hc3NpZ24oY3VycmVudE9wdGlvbnMsIG9wdGlvbnMpO1xyXG59O1xyXG5Ub2FzdC5yZXNldERlZmF1bHRPcHRpb25zID0gKCkgPT4ge1xyXG4gICAgY3VycmVudE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucyk7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFRvYXN0O1xyXG4iXX0=