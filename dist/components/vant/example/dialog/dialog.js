'use strict';

Page({
    openConfirm: function openConfirm() {
        wx.showModal({
            title: '弹窗标题',
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            confirmText: "主操作",
            cancelText: "辅助操作",
            success: function success(res) {
                console.log(res);
                if (res.confirm) {
                    console.log('用户点击主操作');
                } else {
                    console.log('用户点击辅助操作');
                }
            }
        });
    },
    openAlert: function openAlert() {
        wx.showModal({
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            showCancel: false,
            success: function success(res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYWxvZy5qcyJdLCJuYW1lcyI6WyJQYWdlIiwib3BlbkNvbmZpcm0iLCJ3eCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNvbmZpcm1UZXh0IiwiY2FuY2VsVGV4dCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiY29uZmlybSIsIm9wZW5BbGVydCIsInNob3dDYW5jZWwiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEtBQUs7QUFDREMsaUJBQWEsdUJBQVk7QUFDckJDLFdBQUdDLFNBQUgsQ0FBYTtBQUNUQyxtQkFBTyxNQURFO0FBRVRDLHFCQUFTLGtDQUZBO0FBR1RDLHlCQUFhLEtBSEo7QUFJVEMsd0JBQVksTUFKSDtBQUtUQyxxQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3BCQyx3QkFBUUMsR0FBUixDQUFZRixHQUFaO0FBQ0Esb0JBQUlBLElBQUlHLE9BQVIsRUFBaUI7QUFDYkYsNEJBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0gsaUJBRkQsTUFFSztBQUNERCw0QkFBUUMsR0FBUixDQUFZLFVBQVo7QUFDSDtBQUNKO0FBWlEsU0FBYjtBQWNILEtBaEJBO0FBaUJERSxlQUFXLHFCQUFZO0FBQ25CWCxXQUFHQyxTQUFILENBQWE7QUFDVEUscUJBQVMsa0NBREE7QUFFVFMsd0JBQVksS0FGSDtBQUdUTixxQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3BCLG9CQUFJQSxJQUFJRyxPQUFSLEVBQWlCO0FBQ2JGLDRCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNIO0FBQ0o7QUFQUSxTQUFiO0FBU0g7QUEzQkEsQ0FBTCIsImZpbGUiOiJkaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJQYWdlKHtcclxuICAgIG9wZW5Db25maXJtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgdGl0bGU6ICflvLnnqpfmoIfpopgnLFxyXG4gICAgICAgICAgICBjb250ZW50OiAn5by556qX5YaF5a6577yM5ZGK55+l5b2T5YmN54q25oCB44CB5L+h5oGv5ZKM6Kej5Yaz5pa55rOV77yM5o+P6L+w5paH5a2X5bC96YeP5o6n5Yi25Zyo5LiJ6KGM5YaFJyxcclxuICAgICAgICAgICAgY29uZmlybVRleHQ6IFwi5Li75pON5L2cXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbFRleHQ6IFwi6L6F5Yqp5pON5L2cXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Li75pON5L2cJylcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vovoXliqnmk43kvZwnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgb3BlbkFsZXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgY29udGVudDogJ+W8ueeql+WGheWuue+8jOWRiuefpeW9k+WJjeeKtuaAgeOAgeS/oeaBr+WSjOino+WGs+aWueazle+8jOaPj+i/sOaWh+Wtl+WwvemHj+aOp+WItuWcqOS4ieihjOWGhScsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTsiXX0=