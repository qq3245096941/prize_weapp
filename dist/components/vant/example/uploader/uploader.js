'use strict';

Page({
    data: {
        files: []
    },
    chooseImage: function chooseImage(e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function success(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        });
    },
    previewImage: function previewImage(e) {
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZGVyLmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJkYXRhIiwiZmlsZXMiLCJjaG9vc2VJbWFnZSIsImUiLCJ0aGF0Iiwid3giLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwic2V0RGF0YSIsImNvbmNhdCIsInRlbXBGaWxlUGF0aHMiLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwiY3VycmVudFRhcmdldCIsImlkIiwidXJscyJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsS0FBSztBQUNEQyxVQUFNO0FBQ0ZDLGVBQU87QUFETCxLQURMO0FBSURDLGlCQUFhLHFCQUFVQyxDQUFWLEVBQWE7QUFDdEIsWUFBSUMsT0FBTyxJQUFYO0FBQ0FDLFdBQUdILFdBQUgsQ0FBZTtBQUNYSSxzQkFBVSxDQUFDLFVBQUQsRUFBYSxZQUFiLENBREMsRUFDMkI7QUFDdENDLHdCQUFZLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FGRCxFQUVzQjtBQUNqQ0MscUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQjtBQUNBTCxxQkFBS00sT0FBTCxDQUFhO0FBQ1RULDJCQUFPRyxLQUFLSixJQUFMLENBQVVDLEtBQVYsQ0FBZ0JVLE1BQWhCLENBQXVCRixJQUFJRyxhQUEzQjtBQURFLGlCQUFiO0FBR0g7QUFSVSxTQUFmO0FBVUgsS0FoQkE7QUFpQkRDLGtCQUFjLHNCQUFTVixDQUFULEVBQVc7QUFDckJFLFdBQUdRLFlBQUgsQ0FBZ0I7QUFDWkMscUJBQVNYLEVBQUVZLGFBQUYsQ0FBZ0JDLEVBRGIsRUFDaUI7QUFDN0JDLGtCQUFNLEtBQUtqQixJQUFMLENBQVVDLEtBRkosQ0FFVTtBQUZWLFNBQWhCO0FBSUg7QUF0QkEsQ0FBTCIsImZpbGUiOiJ1cGxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGZpbGVzOiBbXVxyXG4gICAgfSxcclxuICAgIGNob29zZUltYWdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSwgLy8g5Y+v5Lul5oyH5a6a5piv5Y6f5Zu+6L+Y5piv5Y6L57yp5Zu+77yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sIC8vIOWPr+S7peaMh+Wumuadpea6kOaYr+ebuOWGjOi/mOaYr+ebuOacuu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDov5Tlm57pgInlrprnhafniYfnmoTmnKzlnLDmlofku7bot6/lvoTliJfooajvvIx0ZW1wRmlsZVBhdGjlj6/ku6XkvZzkuLppbWfmoIfnrb7nmoRzcmPlsZ7mgKfmmL7npLrlm77niYdcclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZXM6IHRoYXQuZGF0YS5maWxlcy5jb25jYXQocmVzLnRlbXBGaWxlUGF0aHMpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcHJldmlld0ltYWdlOiBmdW5jdGlvbihlKXtcclxuICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICBjdXJyZW50OiBlLmN1cnJlbnRUYXJnZXQuaWQsIC8vIOW9k+WJjeaYvuekuuWbvueJh+eahGh0dHDpk77mjqVcclxuICAgICAgICAgICAgdXJsczogdGhpcy5kYXRhLmZpbGVzIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KTsiXX0=