'use strict';

Page({
    open: function open() {
        wx.showActionSheet({
            itemList: ['A', 'B', 'C'],
            success: function success(res) {
                if (!res.cancel) {
                    console.log(res.tapIndex);
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnNoZWV0LmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJvcGVuIiwid3giLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsInN1Y2Nlc3MiLCJyZXMiLCJjYW5jZWwiLCJjb25zb2xlIiwibG9nIiwidGFwSW5kZXgiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEtBQUs7QUFDREMsVUFBTSxnQkFBVTtBQUNaQyxXQUFHQyxlQUFILENBQW1CO0FBQ2ZDLHNCQUFVLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBREs7QUFFZkMscUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQixvQkFBSSxDQUFDQSxJQUFJQyxNQUFULEVBQWlCO0FBQ2JDLDRCQUFRQyxHQUFSLENBQVlILElBQUlJLFFBQWhCO0FBQ0g7QUFDSjtBQU5jLFNBQW5CO0FBUUg7QUFWQSxDQUFMIiwiZmlsZSI6ImFjdGlvbnNoZWV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiUGFnZSh7XHJcbiAgICBvcGVuOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XHJcbiAgICAgICAgICAgIGl0ZW1MaXN0OiBbJ0EnLCAnQicsICdDJ10sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXMuY2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcEluZGV4KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pOyJdfQ==