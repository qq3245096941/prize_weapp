"use strict";

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: ["选项一", "选项二", "选项三"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0
    },
    onLoad: function onLoad() {
        var that = this;
        wx.getSystemInfo({
            success: function success(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function tabClick(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmJhci5qcyJdLCJuYW1lcyI6WyJzbGlkZXJXaWR0aCIsIlBhZ2UiLCJkYXRhIiwidGFicyIsImFjdGl2ZUluZGV4Iiwic2xpZGVyT2Zmc2V0Iiwic2xpZGVyTGVmdCIsIm9uTG9hZCIsInRoYXQiLCJ3eCIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzIiwic2V0RGF0YSIsIndpbmRvd1dpZHRoIiwibGVuZ3RoIiwidGFiQ2xpY2siLCJlIiwiY3VycmVudFRhcmdldCIsIm9mZnNldExlZnQiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjLEVBQWxCLEMsQ0FBc0I7O0FBRXRCQyxLQUFLO0FBQ0RDLFVBQU07QUFDRkMsY0FBTSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixDQURKO0FBRUZDLHFCQUFhLENBRlg7QUFHRkMsc0JBQWMsQ0FIWjtBQUlGQyxvQkFBWTtBQUpWLEtBREw7QUFPREMsWUFBUSxrQkFBWTtBQUNoQixZQUFJQyxPQUFPLElBQVg7QUFDQUMsV0FBR0MsYUFBSCxDQUFpQjtBQUNiQyxxQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CSixxQkFBS0ssT0FBTCxDQUFhO0FBQ1RQLGdDQUFZLENBQUNNLElBQUlFLFdBQUosR0FBa0JOLEtBQUtOLElBQUwsQ0FBVUMsSUFBVixDQUFlWSxNQUFqQyxHQUEwQ2YsV0FBM0MsSUFBMEQsQ0FEN0Q7QUFFVEssa0NBQWNPLElBQUlFLFdBQUosR0FBa0JOLEtBQUtOLElBQUwsQ0FBVUMsSUFBVixDQUFlWSxNQUFqQyxHQUEwQ1AsS0FBS04sSUFBTCxDQUFVRTtBQUZ6RCxpQkFBYjtBQUlIO0FBTlksU0FBakI7QUFRSCxLQWpCQTtBQWtCRFksY0FBVSxrQkFBVUMsQ0FBVixFQUFhO0FBQ25CLGFBQUtKLE9BQUwsQ0FBYTtBQUNUUiwwQkFBY1ksRUFBRUMsYUFBRixDQUFnQkMsVUFEckI7QUFFVGYseUJBQWFhLEVBQUVDLGFBQUYsQ0FBZ0JFO0FBRnBCLFNBQWI7QUFJSDtBQXZCQSxDQUFMIiwiZmlsZSI6Im5hdmJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBzbGlkZXJXaWR0aCA9IDk2OyAvLyDpnIDopoHorr7nva5zbGlkZXLnmoTlrr3luqbvvIznlKjkuo7orqHnrpfkuK3pl7TkvY3nva5cclxuXHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIHRhYnM6IFtcIumAiemhueS4gFwiLCBcIumAiemhueS6jFwiLCBcIumAiemhueS4iVwiXSxcclxuICAgICAgICBhY3RpdmVJbmRleDogMSxcclxuICAgICAgICBzbGlkZXJPZmZzZXQ6IDAsXHJcbiAgICAgICAgc2xpZGVyTGVmdDogMFxyXG4gICAgfSxcclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlckxlZnQ6IChyZXMud2luZG93V2lkdGggLyB0aGF0LmRhdGEudGFicy5sZW5ndGggLSBzbGlkZXJXaWR0aCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlck9mZnNldDogcmVzLndpbmRvd1dpZHRoIC8gdGhhdC5kYXRhLnRhYnMubGVuZ3RoICogdGhhdC5kYXRhLmFjdGl2ZUluZGV4XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHRhYkNsaWNrOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHNsaWRlck9mZnNldDogZS5jdXJyZW50VGFyZ2V0Lm9mZnNldExlZnQsXHJcbiAgICAgICAgICAgIGFjdGl2ZUluZGV4OiBlLmN1cnJlbnRUYXJnZXQuaWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7Il19