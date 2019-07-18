'use strict';

Page({
    openToast: function openToast() {
        wx.showToast({
            title: '已完成',
            icon: 'success',
            duration: 3000
        });
    },
    openLoading: function openLoading() {
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 3000
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvYXN0LmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJvcGVuVG9hc3QiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwib3BlbkxvYWRpbmciXSwibWFwcGluZ3MiOiI7O0FBQUFBLEtBQUs7QUFDREMsZUFBVyxxQkFBWTtBQUNuQkMsV0FBR0MsU0FBSCxDQUFhO0FBQ1RDLG1CQUFPLEtBREU7QUFFVEMsa0JBQU0sU0FGRztBQUdUQyxzQkFBVTtBQUhELFNBQWI7QUFLSCxLQVBBO0FBUURDLGlCQUFhLHVCQUFZO0FBQ3JCTCxXQUFHQyxTQUFILENBQWE7QUFDVEMsbUJBQU8sT0FERTtBQUVUQyxrQkFBTSxTQUZHO0FBR1RDLHNCQUFVO0FBSEQsU0FBYjtBQUtIO0FBZEEsQ0FBTCIsImZpbGUiOiJ0b2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlBhZ2Uoe1xyXG4gICAgb3BlblRvYXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICflt7LlrozmiJAnLFxyXG4gICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgb3BlbkxvYWRpbmc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+aVsOaNruWKoOi9veS4rScsXHJcbiAgICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7Il19