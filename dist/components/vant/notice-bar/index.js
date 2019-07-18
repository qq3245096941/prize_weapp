'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _component = require('./../common/component.js');

var FONT_COLOR = '#ed6a0c';
var BG_COLOR = '#fffbe8';
(0, _component.VantComponent)({
    props: {
        text: {
            type: String,
            value: ''
        },
        mode: {
            type: String,
            value: ''
        },
        url: {
            type: String,
            value: ''
        },
        openType: {
            type: String,
            value: 'navigate'
        },
        delay: {
            type: Number,
            value: 1
        },
        speed: {
            type: Number,
            value: 50
        },
        scrollable: {
            type: Boolean,
            value: true
        },
        leftIcon: {
            type: String,
            value: ''
        },
        color: {
            type: String,
            value: FONT_COLOR
        },
        backgroundColor: {
            type: String,
            value: BG_COLOR
        },
        wrapable: Boolean
    },
    data: {
        show: true
    },
    watch: {
        text: function text() {
            this.set({}, this.init);
        }
    },
    created: function created() {
        this.resetAnimation = wx.createAnimation({
            duration: 0,
            timingFunction: 'linear'
        });
    },
    destroyed: function destroyed() {
        this.timer && clearTimeout(this.timer);
    },

    methods: {
        init: function init() {
            var _this = this;

            Promise.all([this.getRect('.van-notice-bar__content'), this.getRect('.van-notice-bar__wrap')]).then(function (rects) {
                var _rects = _slicedToArray(rects, 2),
                    contentRect = _rects[0],
                    wrapRect = _rects[1];

                if (contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width) {
                    return;
                }
                var _data = _this.data,
                    speed = _data.speed,
                    scrollable = _data.scrollable,
                    delay = _data.delay;

                if (scrollable && wrapRect.width < contentRect.width) {
                    var duration = contentRect.width / speed * 1000;
                    _this.wrapWidth = wrapRect.width;
                    _this.contentWidth = contentRect.width;
                    _this.duration = duration;
                    _this.animation = wx.createAnimation({
                        duration: duration,
                        timingFunction: 'linear',
                        delay: delay
                    });
                    _this.scroll();
                }
            });
        },
        scroll: function scroll() {
            var _this2 = this;

            this.timer && clearTimeout(this.timer);
            this.timer = null;
            this.set({
                animationData: this.resetAnimation.translateX(this.wrapWidth).step().export()
            });
            setTimeout(function () {
                _this2.set({
                    animationData: _this2.animation.translateX(-_this2.contentWidth).step().export()
                });
            }, 20);
            this.timer = setTimeout(function () {
                _this2.scroll();
            }, this.duration);
        },
        onClickIcon: function onClickIcon() {
            this.timer && clearTimeout(this.timer);
            this.timer = null;
            this.set({ show: false });
        },
        onClick: function onClick(event) {
            this.$emit('click', event);
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkZPTlRfQ09MT1IiLCJCR19DT0xPUiIsInByb3BzIiwidGV4dCIsInR5cGUiLCJTdHJpbmciLCJ2YWx1ZSIsIm1vZGUiLCJ1cmwiLCJvcGVuVHlwZSIsImRlbGF5IiwiTnVtYmVyIiwic3BlZWQiLCJzY3JvbGxhYmxlIiwiQm9vbGVhbiIsImxlZnRJY29uIiwiY29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ3cmFwYWJsZSIsImRhdGEiLCJzaG93Iiwid2F0Y2giLCJzZXQiLCJpbml0IiwiY3JlYXRlZCIsInJlc2V0QW5pbWF0aW9uIiwid3giLCJjcmVhdGVBbmltYXRpb24iLCJkdXJhdGlvbiIsInRpbWluZ0Z1bmN0aW9uIiwiZGVzdHJveWVkIiwidGltZXIiLCJjbGVhclRpbWVvdXQiLCJtZXRob2RzIiwiUHJvbWlzZSIsImFsbCIsImdldFJlY3QiLCJ0aGVuIiwicmVjdHMiLCJjb250ZW50UmVjdCIsIndyYXBSZWN0Iiwid2lkdGgiLCJ3cmFwV2lkdGgiLCJjb250ZW50V2lkdGgiLCJhbmltYXRpb24iLCJzY3JvbGwiLCJhbmltYXRpb25EYXRhIiwidHJhbnNsYXRlWCIsInN0ZXAiLCJleHBvcnQiLCJzZXRUaW1lb3V0Iiwib25DbGlja0ljb24iLCJvbkNsaWNrIiwiZXZlbnQiLCIkZW1pdCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUNBLElBQU1BLGFBQWEsU0FBbkI7QUFDQSxJQUFNQyxXQUFXLFNBQWpCO0FBQ0EsOEJBQWM7QUFDVkMsV0FBTztBQUNIQyxjQUFNO0FBQ0ZDLGtCQUFNQyxNQURKO0FBRUZDLG1CQUFPO0FBRkwsU0FESDtBQUtIQyxjQUFNO0FBQ0ZILGtCQUFNQyxNQURKO0FBRUZDLG1CQUFPO0FBRkwsU0FMSDtBQVNIRSxhQUFLO0FBQ0RKLGtCQUFNQyxNQURMO0FBRURDLG1CQUFPO0FBRk4sU0FURjtBQWFIRyxrQkFBVTtBQUNOTCxrQkFBTUMsTUFEQTtBQUVOQyxtQkFBTztBQUZELFNBYlA7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QVBELEVBT0csRUFQSDtBQVFBLGlCQUFLbEIsS0FBTCxHQUFhbUIsV0FBVyxZQUFNO0FBQzFCLHVCQUFLTCxNQUFMO0FBQ0gsYUFGWSxFQUVWLEtBQUtqQixRQUZLLENBQWI7QUFHSCxTQWhESTtBQWlETHVCLG1CQWpESyx5QkFpRFM7QUFDVixpQkFBS3BCLEtBQUwsSUFBY0MsYUFBYSxLQUFLRCxLQUFsQixDQUFkO0FBQ0EsaUJBQUtBLEtBQUwsR0FBYSxJQUFiO0FBQ0EsaUJBQUtULEdBQUwsQ0FBUyxFQUFFRixNQUFNLEtBQVIsRUFBVDtBQUNILFNBckRJO0FBc0RMZ0MsZUF0REssbUJBc0RHQyxLQXRESCxFQXNEVTtBQUNYLGlCQUFLQyxLQUFMLENBQVcsT0FBWCxFQUFvQkQsS0FBcEI7QUFDSDtBQXhESTtBQTdEQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5jb25zdCBGT05UX0NPTE9SID0gJyNlZDZhMGMnO1xyXG5jb25zdCBCR19DT0xPUiA9ICcjZmZmYmU4JztcclxuVmFudENvbXBvbmVudCh7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vZGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVybDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3BlblR5cGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ25hdmlnYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsYXk6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BlZWQ6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogNTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbGFibGU6IHtcclxuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgdmFsdWU6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxlZnRJY29uOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdmFsdWU6ICcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2xvcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiBGT05UX0NPTE9SXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogQkdfQ09MT1JcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdyYXBhYmxlOiBCb29sZWFuXHJcbiAgICB9LFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIHNob3c6IHRydWVcclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIHRleHQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KHt9LCB0aGlzLmluaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjcmVhdGVkKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXRBbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMCxcclxuICAgICAgICAgICAgdGltaW5nRnVuY3Rpb246ICdsaW5lYXInXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgZGVzdHJveWVkKCkge1xyXG4gICAgICAgIHRoaXMudGltZXIgJiYgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBpbml0KCkge1xyXG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY3QoJy52YW4tbm90aWNlLWJhcl9fY29udGVudCcpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWN0KCcudmFuLW5vdGljZS1iYXJfX3dyYXAnKVxyXG4gICAgICAgICAgICBdKS50aGVuKChyZWN0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW2NvbnRlbnRSZWN0LCB3cmFwUmVjdF0gPSByZWN0cztcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50UmVjdCA9PSBudWxsIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcFJlY3QgPT0gbnVsbCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICFjb250ZW50UmVjdC53aWR0aCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICF3cmFwUmVjdC53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgc3BlZWQsIHNjcm9sbGFibGUsIGRlbGF5IH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsYWJsZSAmJiB3cmFwUmVjdC53aWR0aCA8IGNvbnRlbnRSZWN0LndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSAoY29udGVudFJlY3Qud2lkdGggLyBzcGVlZCkgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JhcFdpZHRoID0gd3JhcFJlY3Qud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50V2lkdGggPSBjb250ZW50UmVjdC53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltaW5nRnVuY3Rpb246ICdsaW5lYXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2Nyb2xsKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyICYmIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkRhdGE6IHRoaXMucmVzZXRBbmltYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAudHJhbnNsYXRlWCh0aGlzLndyYXBXaWR0aClcclxuICAgICAgICAgICAgICAgICAgICAuc3RlcCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmV4cG9ydCgpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25EYXRhOiB0aGlzLmFuaW1hdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJhbnNsYXRlWCgtdGhpcy5jb250ZW50V2lkdGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdGVwKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmV4cG9ydCgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMjApO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbCgpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLmR1cmF0aW9uKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xpY2tJY29uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyICYmIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KHsgc2hvdzogZmFsc2UgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrJywgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==