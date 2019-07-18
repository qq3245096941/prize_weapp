'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isDef(value) {
    return value !== undefined && value !== null;
}
function isObj(x) {
    var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);
    return x !== null && (type === 'object' || type === 'function');
}
function isNumber(value) {
    return (/^\d+$/.test(value)
    );
}
function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
exports.isObj = isObj;
exports.isDef = isDef;
exports.isNumber = isNumber;
exports.range = range;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbImlzRGVmIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJpc09iaiIsIngiLCJ0eXBlIiwiaXNOdW1iZXIiLCJ0ZXN0IiwicmFuZ2UiLCJudW0iLCJtaW4iLCJtYXgiLCJNYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLFNBQVNBLEtBQVQsQ0FBZUMsS0FBZixFQUFzQjtBQUNsQixXQUFPQSxVQUFVQyxTQUFWLElBQXVCRCxVQUFVLElBQXhDO0FBQ0g7QUFDRCxTQUFTRSxLQUFULENBQWVDLENBQWYsRUFBa0I7QUFDZCxRQUFNQyxjQUFjRCxDQUFkLHlDQUFjQSxDQUFkLENBQU47QUFDQSxXQUFPQSxNQUFNLElBQU4sS0FBZUMsU0FBUyxRQUFULElBQXFCQSxTQUFTLFVBQTdDLENBQVA7QUFDSDtBQUNELFNBQVNDLFFBQVQsQ0FBa0JMLEtBQWxCLEVBQXlCO0FBQ3JCLFdBQU8sU0FBUU0sSUFBUixDQUFhTixLQUFiO0FBQVA7QUFDSDtBQUNELFNBQVNPLEtBQVQsQ0FBZUMsR0FBZixFQUFvQkMsR0FBcEIsRUFBeUJDLEdBQXpCLEVBQThCO0FBQzFCLFdBQU9DLEtBQUtGLEdBQUwsQ0FBU0UsS0FBS0QsR0FBTCxDQUFTRixHQUFULEVBQWNDLEdBQWQsQ0FBVCxFQUE2QkMsR0FBN0IsQ0FBUDtBQUNIO1FBQ1FSLEssR0FBQUEsSztRQUFPSCxLLEdBQUFBLEs7UUFBT00sUSxHQUFBQSxRO1FBQVVFLEssR0FBQUEsSyIsImZpbGUiOiJ1dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGlzRGVmKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbDtcclxufVxyXG5mdW5jdGlvbiBpc09iaih4KSB7XHJcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIHg7XHJcbiAgICByZXR1cm4geCAhPT0gbnVsbCAmJiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XHJcbn1cclxuZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcclxuICAgIHJldHVybiAvXlxcZCskLy50ZXN0KHZhbHVlKTtcclxufVxyXG5mdW5jdGlvbiByYW5nZShudW0sIG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobnVtLCBtaW4pLCBtYXgpO1xyXG59XHJcbmV4cG9ydCB7IGlzT2JqLCBpc0RlZiwgaXNOdW1iZXIsIHJhbmdlIH07XHJcbiJdfQ==