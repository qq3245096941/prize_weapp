"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var cache = null;
function getSafeArea() {
    return new Promise(function (resolve, reject) {
        if (cache != null) {
            resolve(cache);
        } else {
            wx.getSystemInfo({
                success: function success(_ref) {
                    var model = _ref.model,
                        screenHeight = _ref.screenHeight,
                        statusBarHeight = _ref.statusBarHeight;

                    var iphoneX = /iphone x/i.test(model);
                    var iphoneNew = /iPhone11/i.test(model) && screenHeight === 812;
                    cache = {
                        isIPhoneX: iphoneX || iphoneNew,
                        statusBarHeight: statusBarHeight
                    };
                    resolve(cache);
                },
                fail: reject
            });
        }
    });
}
var safeArea = exports.safeArea = function safeArea() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$safeAreaInsetBo = _ref2.safeAreaInsetBottom,
        safeAreaInsetBottom = _ref2$safeAreaInsetBo === undefined ? true : _ref2$safeAreaInsetBo,
        _ref2$safeAreaInsetTo = _ref2.safeAreaInsetTop,
        safeAreaInsetTop = _ref2$safeAreaInsetTo === undefined ? false : _ref2$safeAreaInsetTo;

    return Behavior({
        properties: {
            safeAreaInsetTop: {
                type: Boolean,
                value: safeAreaInsetTop
            },
            safeAreaInsetBottom: {
                type: Boolean,
                value: safeAreaInsetBottom
            }
        },
        created: function created() {
            var _this = this;

            getSafeArea().then(function (_ref3) {
                var isIPhoneX = _ref3.isIPhoneX,
                    statusBarHeight = _ref3.statusBarHeight;

                _this.set({ isIPhoneX: isIPhoneX, statusBarHeight: statusBarHeight });
            });
        }
    });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhZmUtYXJlYS5qcyJdLCJuYW1lcyI6WyJjYWNoZSIsImdldFNhZmVBcmVhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3eCIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwibW9kZWwiLCJzY3JlZW5IZWlnaHQiLCJzdGF0dXNCYXJIZWlnaHQiLCJpcGhvbmVYIiwidGVzdCIsImlwaG9uZU5ldyIsImlzSVBob25lWCIsImZhaWwiLCJzYWZlQXJlYSIsInNhZmVBcmVhSW5zZXRCb3R0b20iLCJzYWZlQXJlYUluc2V0VG9wIiwiQmVoYXZpb3IiLCJwcm9wZXJ0aWVzIiwidHlwZSIsIkJvb2xlYW4iLCJ2YWx1ZSIsImNyZWF0ZWQiLCJ0aGVuIiwic2V0Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUlBLFFBQVEsSUFBWjtBQUNBLFNBQVNDLFdBQVQsR0FBdUI7QUFDbkIsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLFlBQUlKLFNBQVMsSUFBYixFQUFtQjtBQUNmRyxvQkFBUUgsS0FBUjtBQUNILFNBRkQsTUFHSztBQUNESyxlQUFHQyxhQUFILENBQWlCO0FBQ2JDLHlCQUFTLHVCQUE4QztBQUFBLHdCQUEzQ0MsS0FBMkMsUUFBM0NBLEtBQTJDO0FBQUEsd0JBQXBDQyxZQUFvQyxRQUFwQ0EsWUFBb0M7QUFBQSx3QkFBdEJDLGVBQXNCLFFBQXRCQSxlQUFzQjs7QUFDbkQsd0JBQU1DLFVBQVUsWUFBWUMsSUFBWixDQUFpQkosS0FBakIsQ0FBaEI7QUFDQSx3QkFBTUssWUFBWSxZQUFZRCxJQUFaLENBQWlCSixLQUFqQixLQUEyQkMsaUJBQWlCLEdBQTlEO0FBQ0FULDRCQUFRO0FBQ0pjLG1DQUFXSCxXQUFXRSxTQURsQjtBQUVKSDtBQUZJLHFCQUFSO0FBSUFQLDRCQUFRSCxLQUFSO0FBQ0gsaUJBVFk7QUFVYmUsc0JBQU1YO0FBVk8sYUFBakI7QUFZSDtBQUNKLEtBbEJNLENBQVA7QUFtQkg7QUFDTSxJQUFNWSw4QkFBVyxTQUFYQSxRQUFXO0FBQUEsb0ZBQTRELEVBQTVEO0FBQUEsc0NBQUdDLG1CQUFIO0FBQUEsUUFBR0EsbUJBQUgseUNBQXlCLElBQXpCO0FBQUEsc0NBQStCQyxnQkFBL0I7QUFBQSxRQUErQkEsZ0JBQS9CLHlDQUFrRCxLQUFsRDs7QUFBQSxXQUFtRUMsU0FBUztBQUNoR0Msb0JBQVk7QUFDUkYsOEJBQWtCO0FBQ2RHLHNCQUFNQyxPQURRO0FBRWRDLHVCQUFPTDtBQUZPLGFBRFY7QUFLUkQsaUNBQXFCO0FBQ2pCSSxzQkFBTUMsT0FEVztBQUVqQkMsdUJBQU9OO0FBRlU7QUFMYixTQURvRjtBQVdoR08sZUFYZ0cscUJBV3RGO0FBQUE7O0FBQ052QiwwQkFBY3dCLElBQWQsQ0FBbUIsaUJBQW9DO0FBQUEsb0JBQWpDWCxTQUFpQyxTQUFqQ0EsU0FBaUM7QUFBQSxvQkFBdEJKLGVBQXNCLFNBQXRCQSxlQUFzQjs7QUFDbkQsc0JBQUtnQixHQUFMLENBQVMsRUFBRVosb0JBQUYsRUFBYUosZ0NBQWIsRUFBVDtBQUNILGFBRkQ7QUFHSDtBQWYrRixLQUFULENBQW5FO0FBQUEsQ0FBakIiLCJmaWxlIjoic2FmZS1hcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGNhY2hlID0gbnVsbDtcclxuZnVuY3Rpb24gZ2V0U2FmZUFyZWEoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGlmIChjYWNoZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoY2FjaGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd3guZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBtb2RlbCwgc2NyZWVuSGVpZ2h0LCBzdGF0dXNCYXJIZWlnaHQgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlwaG9uZVggPSAvaXBob25lIHgvaS50ZXN0KG1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpcGhvbmVOZXcgPSAvaVBob25lMTEvaS50ZXN0KG1vZGVsKSAmJiBzY3JlZW5IZWlnaHQgPT09IDgxMjtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNJUGhvbmVYOiBpcGhvbmVYIHx8IGlwaG9uZU5ldyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzQmFySGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNhY2hlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGNvbnN0IHNhZmVBcmVhID0gKHsgc2FmZUFyZWFJbnNldEJvdHRvbSA9IHRydWUsIHNhZmVBcmVhSW5zZXRUb3AgPSBmYWxzZSB9ID0ge30pID0+IEJlaGF2aW9yKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzYWZlQXJlYUluc2V0VG9wOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIHZhbHVlOiBzYWZlQXJlYUluc2V0VG9wXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzYWZlQXJlYUluc2V0Qm90dG9tOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIHZhbHVlOiBzYWZlQXJlYUluc2V0Qm90dG9tXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZWQoKSB7XHJcbiAgICAgICAgZ2V0U2FmZUFyZWEoKS50aGVuKCh7IGlzSVBob25lWCwgc3RhdHVzQmFySGVpZ2h0IH0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoeyBpc0lQaG9uZVgsIHN0YXR1c0JhckhlaWdodCB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==