'use strict';

var _component = require('./../common/component.js');

var _button = require('./../mixins/button.js');

var _openType = require('./../mixins/open-type.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _component.VantComponent)({
    mixins: [_button.button, _openType.openType],
    props: {
        show: Boolean,
        title: String,
        message: String,
        useSlot: Boolean,
        className: String,
        asyncClose: Boolean,
        messageAlign: String,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        zIndex: {
            type: Number,
            value: 2000
        },
        confirmButtonText: {
            type: String,
            value: '确认'
        },
        cancelButtonText: {
            type: String,
            value: '取消'
        },
        showConfirmButton: {
            type: Boolean,
            value: true
        },
        overlay: {
            type: Boolean,
            value: true
        },
        transition: {
            type: String,
            value: 'scale'
        }
    },
    data: {
        loading: {
            confirm: false,
            cancel: false
        }
    },
    watch: {
        show: function show(_show) {
            !_show && this.stopLoading();
        }
    },
    methods: {
        onConfirm: function onConfirm() {
            this.handleAction('confirm');
        },
        onCancel: function onCancel() {
            this.handleAction('cancel');
        },
        onClickOverlay: function onClickOverlay() {
            this.onClose('overlay');
        },
        handleAction: function handleAction(action) {
            if (this.data.asyncClose) {
                this.set(_defineProperty({}, 'loading.' + action, true));
            }
            this.onClose(action);
        },
        close: function close() {
            this.set({
                show: false
            });
        },
        stopLoading: function stopLoading() {
            this.set({
                loading: {
                    confirm: false,
                    cancel: false
                }
            });
        },
        onClose: function onClose(action) {
            if (!this.data.asyncClose) {
                this.close();
            }
            this.$emit('close', action);
            // 把 dialog 实例传递出去，可以通过 stopLoading() 在外部关闭按钮的 loading
            this.$emit(action, { dialog: this });
            var callback = this.data[action === 'confirm' ? 'onConfirm' : 'onCancel'];
            if (callback) {
                callback(this);
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1peGlucyIsImJ1dHRvbiIsIm9wZW5UeXBlIiwicHJvcHMiLCJzaG93IiwiQm9vbGVhbiIsInRpdGxlIiwiU3RyaW5nIiwibWVzc2FnZSIsInVzZVNsb3QiLCJjbGFzc05hbWUiLCJhc3luY0Nsb3NlIiwibWVzc2FnZUFsaWduIiwic2hvd0NhbmNlbEJ1dHRvbiIsImNsb3NlT25DbGlja092ZXJsYXkiLCJjb25maXJtQnV0dG9uT3BlblR5cGUiLCJ6SW5kZXgiLCJ0eXBlIiwiTnVtYmVyIiwidmFsdWUiLCJjb25maXJtQnV0dG9uVGV4dCIsImNhbmNlbEJ1dHRvblRleHQiLCJzaG93Q29uZmlybUJ1dHRvbiIsIm92ZXJsYXkiLCJ0cmFuc2l0aW9uIiwiZGF0YSIsImxvYWRpbmciLCJjb25maXJtIiwiY2FuY2VsIiwid2F0Y2giLCJzdG9wTG9hZGluZyIsIm1ldGhvZHMiLCJvbkNvbmZpcm0iLCJoYW5kbGVBY3Rpb24iLCJvbkNhbmNlbCIsIm9uQ2xpY2tPdmVybGF5Iiwib25DbG9zZSIsImFjdGlvbiIsInNldCIsImNsb3NlIiwiJGVtaXQiLCJkaWFsb2ciLCJjYWxsYmFjayJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBLDhCQUFjO0FBQ1ZBLFlBQVEsQ0FBQ0MsY0FBRCxFQUFTQyxrQkFBVCxDQURFO0FBRVZDLFdBQU87QUFDSEMsY0FBTUMsT0FESDtBQUVIQyxlQUFPQyxNQUZKO0FBR0hDLGlCQUFTRCxNQUhOO0FBSUhFLGlCQUFTSixPQUpOO0FBS0hLLG1CQUFXSCxNQUxSO0FBTUhJLG9CQUFZTixPQU5UO0FBT0hPLHNCQUFjTCxNQVBYO0FBUUhNLDBCQUFrQlIsT0FSZjtBQVNIUyw2QkFBcUJULE9BVGxCO0FBVUhVLCtCQUF1QlIsTUFWcEI7QUFXSFMsZ0JBQVE7QUFDSkMsa0JBQU1DLE1BREY7QUFFSkMsbUJBQU87QUFGSCxTQVhMO0FBZUhDLDJCQUFtQjtBQUNmSCxrQkFBTVYsTUFEUztBQUVmWSxtQkFBTztBQUZRLFNBZmhCO0FBbUJIRSwwQkFBa0I7QUFDZEosa0JBQU1WLE1BRFE7QUFFZFksbUJBQU87QUFGTyxTQW5CZjtBQXVCSEcsMkJBQW1CO0FBQ2ZMLGtCQUFNWixPQURTO0FBRWZjLG1CQUFPO0FBRlEsU0F2QmhCO0FBMkJISSxpQkFBUztBQUNMTixrQkFBTVosT0FERDtBQUVMYyxtQkFBTztBQUZGLFNBM0JOO0FBK0JISyxvQkFBWTtBQUNSUCxrQkFBTVYsTUFERTtBQUVSWSxtQkFBTztBQUZDO0FBL0JULEtBRkc7QUFzQ1ZNLFVBQU07QUFDRkMsaUJBQVM7QUFDTEMscUJBQVMsS0FESjtBQUVMQyxvQkFBUTtBQUZIO0FBRFAsS0F0Q0k7QUE0Q1ZDLFdBQU87QUFDSHpCLFlBREcsZ0JBQ0VBLEtBREYsRUFDUTtBQUNQLGFBQUNBLEtBQUQsSUFBUyxLQUFLMEIsV0FBTCxFQUFUO0FBQ0g7QUFIRSxLQTVDRztBQWlEVkMsYUFBUztBQUNMQyxpQkFESyx1QkFDTztBQUNSLGlCQUFLQyxZQUFMLENBQWtCLFNBQWxCO0FBQ0gsU0FISTtBQUlMQyxnQkFKSyxzQkFJTTtBQUNQLGlCQUFLRCxZQUFMLENBQWtCLFFBQWxCO0FBQ0gsU0FOSTtBQU9MRSxzQkFQSyw0QkFPWTtBQUNiLGlCQUFLQyxPQUFMLENBQWEsU0FBYjtBQUNILFNBVEk7QUFVTEgsb0JBVkssd0JBVVFJLE1BVlIsRUFVZ0I7QUFDakIsZ0JBQUksS0FBS1osSUFBTCxDQUFVZCxVQUFkLEVBQTBCO0FBQ3RCLHFCQUFLMkIsR0FBTCxrQ0FDZ0JELE1BRGhCLEVBQzJCLElBRDNCO0FBR0g7QUFDRCxpQkFBS0QsT0FBTCxDQUFhQyxNQUFiO0FBQ0gsU0FqQkk7QUFrQkxFLGFBbEJLLG1CQWtCRztBQUNKLGlCQUFLRCxHQUFMLENBQVM7QUFDTGxDLHNCQUFNO0FBREQsYUFBVDtBQUdILFNBdEJJO0FBdUJMMEIsbUJBdkJLLHlCQXVCUztBQUNWLGlCQUFLUSxHQUFMLENBQVM7QUFDTFoseUJBQVM7QUFDTEMsNkJBQVMsS0FESjtBQUVMQyw0QkFBUTtBQUZIO0FBREosYUFBVDtBQU1ILFNBOUJJO0FBK0JMUSxlQS9CSyxtQkErQkdDLE1BL0JILEVBK0JXO0FBQ1osZ0JBQUksQ0FBQyxLQUFLWixJQUFMLENBQVVkLFVBQWYsRUFBMkI7QUFDdkIscUJBQUs0QixLQUFMO0FBQ0g7QUFDRCxpQkFBS0MsS0FBTCxDQUFXLE9BQVgsRUFBb0JILE1BQXBCO0FBQ0E7QUFDQSxpQkFBS0csS0FBTCxDQUFXSCxNQUFYLEVBQW1CLEVBQUVJLFFBQVEsSUFBVixFQUFuQjtBQUNBLGdCQUFNQyxXQUFXLEtBQUtqQixJQUFMLENBQVVZLFdBQVcsU0FBWCxHQUF1QixXQUF2QixHQUFxQyxVQUEvQyxDQUFqQjtBQUNBLGdCQUFJSyxRQUFKLEVBQWM7QUFDVkEseUJBQVMsSUFBVDtBQUNIO0FBQ0o7QUExQ0k7QUFqREMsQ0FBZCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vY29tcG9uZW50JztcclxuaW1wb3J0IHsgYnV0dG9uIH0gZnJvbSAnLi4vbWl4aW5zL2J1dHRvbic7XHJcbmltcG9ydCB7IG9wZW5UeXBlIH0gZnJvbSAnLi4vbWl4aW5zL29wZW4tdHlwZSc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgbWl4aW5zOiBbYnV0dG9uLCBvcGVuVHlwZV0sXHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHNob3c6IEJvb2xlYW4sXHJcbiAgICAgICAgdGl0bGU6IFN0cmluZyxcclxuICAgICAgICBtZXNzYWdlOiBTdHJpbmcsXHJcbiAgICAgICAgdXNlU2xvdDogQm9vbGVhbixcclxuICAgICAgICBjbGFzc05hbWU6IFN0cmluZyxcclxuICAgICAgICBhc3luY0Nsb3NlOiBCb29sZWFuLFxyXG4gICAgICAgIG1lc3NhZ2VBbGlnbjogU3RyaW5nLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IEJvb2xlYW4sXHJcbiAgICAgICAgY2xvc2VPbkNsaWNrT3ZlcmxheTogQm9vbGVhbixcclxuICAgICAgICBjb25maXJtQnV0dG9uT3BlblR5cGU6IFN0cmluZyxcclxuICAgICAgICB6SW5kZXg6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMjAwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ+ehruiupCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ+WPlua2iCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3dDb25maXJtQnV0dG9uOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvdmVybGF5OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdmFsdWU6ICdzY2FsZSdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGxvYWRpbmc6IHtcclxuICAgICAgICAgICAgY29uZmlybTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhbmNlbDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHtcclxuICAgICAgICBzaG93KHNob3cpIHtcclxuICAgICAgICAgICAgIXNob3cgJiYgdGhpcy5zdG9wTG9hZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25Db25maXJtKCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUFjdGlvbignY29uZmlybScpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DYW5jZWwoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQWN0aW9uKCdjYW5jZWwnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xpY2tPdmVybGF5KCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoJ292ZXJsYXknKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhbmRsZUFjdGlvbihhY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5hc3luY0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgW2Bsb2FkaW5nLiR7YWN0aW9ufWBdOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoYWN0aW9uKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsb3NlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldCh7XHJcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0b3BMb2FkaW5nKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldCh7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xvc2UoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kYXRhLmFzeW5jQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScsIGFjdGlvbik7XHJcbiAgICAgICAgICAgIC8vIOaKiiBkaWFsb2cg5a6e5L6L5Lyg6YCS5Ye65Y6777yM5Y+v5Lul6YCa6L+HIHN0b3BMb2FkaW5nKCkg5Zyo5aSW6YOo5YWz6Zet5oyJ6ZKu55qEIGxvYWRpbmdcclxuICAgICAgICAgICAgdGhpcy4kZW1pdChhY3Rpb24sIHsgZGlhbG9nOiB0aGlzIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMuZGF0YVthY3Rpb24gPT09ICdjb25maXJtJyA/ICdvbkNvbmZpcm0nIDogJ29uQ2FuY2VsJ107XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=