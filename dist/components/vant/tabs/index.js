'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _component = require('./../common/component.js');

var _touch = require('./../mixins/touch.js');

(0, _component.VantComponent)({
    mixins: [_touch.touch],
    classes: ['nav-class', 'tab-class', 'tab-active-class', 'line-class'],
    relation: {
        name: 'tab',
        type: 'descendant',
        linked: function linked(child) {
            this.child.push(child);
            this.updateTabs(this.data.tabs.concat(child.data));
        },
        unlinked: function unlinked(child) {
            var index = this.child.indexOf(child);
            var tabs = this.data.tabs;

            tabs.splice(index, 1);
            this.child.splice(index, 1);
            this.updateTabs(tabs);
        }
    },
    props: {
        color: String,
        sticky: Boolean,
        animated: Boolean,
        swipeable: Boolean,
        lineWidth: {
            type: Number,
            value: -1
        },
        lineHeight: {
            type: Number,
            value: -1
        },
        active: {
            type: Number,
            value: 0
        },
        type: {
            type: String,
            value: 'line'
        },
        border: {
            type: Boolean,
            value: true
        },
        duration: {
            type: Number,
            value: 0.3
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 4
        },
        offsetTop: {
            type: Number,
            value: 0
        }
    },
    data: {
        tabs: [],
        lineStyle: '',
        scrollLeft: 0,
        scrollable: false,
        trackStyle: '',
        wrapStyle: '',
        position: ''
    },
    watch: {
        swipeThreshold: function swipeThreshold() {
            this.set({
                scrollable: this.child.length > this.data.swipeThreshold
            });
        },

        color: 'setLine',
        lineWidth: 'setLine',
        lineHeight: 'setLine',
        active: 'setActiveTab',
        animated: 'setTrack',
        offsetTop: 'setWrapStyle'
    },
    beforeCreate: function beforeCreate() {
        this.child = [];
    },
    mounted: function mounted() {
        var _this = this;

        this.setLine(true);
        this.setTrack();
        this.scrollIntoView();
        this.getRect('.van-tabs__wrap').then(function (rect) {
            _this.navHeight = rect.height;
            _this.observerContentScroll();
        });
    },
    destroyed: function destroyed() {
        this.createIntersectionObserver().disconnect();
    },

    methods: {
        updateTabs: function updateTabs(tabs) {
            tabs = tabs || this.data.tabs;
            this.set({
                tabs: tabs,
                scrollable: tabs.length > this.data.swipeThreshold
            });
            this.setActiveTab();
        },
        trigger: function trigger(eventName, index) {
            this.$emit(eventName, {
                index: index,
                title: this.data.tabs[index].title
            });
        },
        onTap: function onTap(event) {
            var index = event.currentTarget.dataset.index;

            if (this.data.tabs[index].disabled) {
                this.trigger('disabled', index);
            } else {
                this.trigger('click', index);
                this.setActive(index);
            }
        },
        setActive: function setActive(active) {
            if (active !== this.data.active) {
                this.trigger('change', active);
                this.set({ active: active });
                this.setActiveTab();
            }
        },
        setLine: function setLine(skipTransition) {
            var _this2 = this;

            if (this.data.type !== 'line') {
                return;
            }
            var _data = this.data,
                color = _data.color,
                active = _data.active,
                duration = _data.duration,
                lineWidth = _data.lineWidth,
                lineHeight = _data.lineHeight;

            this.getRect('.van-tab', true).then(function (rects) {
                var rect = rects[active];
                var width = lineWidth !== -1 ? lineWidth : rect.width / 2;
                var height = lineHeight !== -1 ? 'height: ' + lineHeight + 'px;' : '';
                var left = rects.slice(0, active).reduce(function (prev, curr) {
                    return prev + curr.width;
                }, 0);
                left += (rect.width - width) / 2;
                var transition = skipTransition ? '' : 'transition-duration: ' + duration + 's; -webkit-transition-duration: ' + duration + 's;';
                _this2.set({
                    lineStyle: '\n            ' + height + '\n            width: ' + width + 'px;\n            background-color: ' + color + ';\n            -webkit-transform: translateX(' + left + 'px);\n            transform: translateX(' + left + 'px);\n            ' + transition + '\n          '
                });
            });
        },
        setTrack: function setTrack() {
            var _this3 = this;

            var _data2 = this.data,
                animated = _data2.animated,
                active = _data2.active,
                duration = _data2.duration;

            if (!animated) return '';
            this.getRect('.van-tabs__content').then(function (rect) {
                var width = rect.width;

                _this3.set({
                    trackStyle: '\n            width: ' + width * _this3.child.length + 'px;\n            left: ' + -1 * active * width + 'px;\n            transition: left ' + duration + 's;\n            display: -webkit-box;\n            display: flex;\n          '
                });
                var props = { width: width, animated: animated };
                _this3.child.forEach(function (item) {
                    item.set(props);
                });
            });
        },
        setActiveTab: function setActiveTab() {
            var _this4 = this;

            this.child.forEach(function (item, index) {
                var data = {
                    active: index === _this4.data.active
                };
                if (data.active) {
                    data.inited = true;
                }
                if (data.active !== item.data.active) {
                    item.set(data);
                }
            });
            this.set({}, function () {
                _this4.setLine();
                _this4.setTrack();
                _this4.scrollIntoView();
            });
        },

        // scroll active tab into view
        scrollIntoView: function scrollIntoView() {
            var _this5 = this;

            var _data3 = this.data,
                active = _data3.active,
                scrollable = _data3.scrollable;

            if (!scrollable) {
                return;
            }
            Promise.all([this.getRect('.van-tab', true), this.getRect('.van-tabs__nav')]).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    tabRects = _ref2[0],
                    navRect = _ref2[1];

                var tabRect = tabRects[active];
                var offsetLeft = tabRects.slice(0, active).reduce(function (prev, curr) {
                    return prev + curr.width;
                }, 0);
                _this5.set({
                    scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2
                });
            });
        },
        onTouchStart: function onTouchStart(event) {
            if (!this.data.swipeable) return;
            this.touchStart(event);
        },
        onTouchMove: function onTouchMove(event) {
            if (!this.data.swipeable) return;
            this.touchMove(event);
        },

        // watch swipe touch end
        onTouchEnd: function onTouchEnd() {
            if (!this.data.swipeable) return;
            var _data4 = this.data,
                active = _data4.active,
                tabs = _data4.tabs;
            var direction = this.direction,
                deltaX = this.deltaX,
                offsetX = this.offsetX;

            var minSwipeDistance = 50;
            if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
                if (deltaX > 0 && active !== 0) {
                    this.setActive(active - 1);
                } else if (deltaX < 0 && active !== tabs.length - 1) {
                    this.setActive(active + 1);
                }
            }
        },
        setWrapStyle: function setWrapStyle() {
            var _data5 = this.data,
                offsetTop = _data5.offsetTop,
                position = _data5.position;

            var wrapStyle = void 0;
            switch (position) {
                case 'top':
                    wrapStyle = '\n            top: ' + offsetTop + 'px;\n            position: fixed;\n          ';
                    break;
                case 'bottom':
                    wrapStyle = '\n            top: auto;\n            bottom: 0;\n          ';
                    break;
                default:
                    wrapStyle = '';
            }
            // cut down `set`
            if (wrapStyle === this.data.wrapStyle) return;
            this.set({ wrapStyle: wrapStyle });
        },
        observerContentScroll: function observerContentScroll() {
            var _this6 = this;

            if (!this.data.sticky) {
                return;
            }
            var offsetTop = this.data.offsetTop;

            var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
                windowHeight = _wx$getSystemInfoSync.windowHeight;

            this.createIntersectionObserver().disconnect();
            this.createIntersectionObserver().relativeToViewport({ top: -(this.navHeight + offsetTop) }).observe('.van-tabs', function (res) {
                var top = res.boundingClientRect.top;

                if (top > offsetTop) {
                    return;
                }
                var position = res.intersectionRatio > 0 ? 'top' : 'bottom';
                _this6.$emit('scroll', {
                    scrollTop: top + offsetTop,
                    isFixed: position === 'top'
                });
                _this6.setPosition(position);
            });
            this.createIntersectionObserver().relativeToViewport({ bottom: -(windowHeight - 1 - offsetTop) }).observe('.van-tabs', function (res) {
                var _res$boundingClientRe = res.boundingClientRect,
                    top = _res$boundingClientRe.top,
                    bottom = _res$boundingClientRe.bottom;

                if (bottom < _this6.navHeight) {
                    return;
                }
                var position = res.intersectionRatio > 0 ? 'top' : '';
                _this6.$emit('scroll', {
                    scrollTop: top + offsetTop,
                    isFixed: position === 'top'
                });
                _this6.setPosition(position);
            });
        },
        setPosition: function setPosition(position) {
            var _this7 = this;

            if (position !== this.data.position) {
                this.set({ position: position }).then(function () {
                    _this7.setWrapStyle();
                });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1peGlucyIsInRvdWNoIiwiY2xhc3NlcyIsInJlbGF0aW9uIiwibmFtZSIsInR5cGUiLCJsaW5rZWQiLCJjaGlsZCIsInB1c2giLCJ1cGRhdGVUYWJzIiwiZGF0YSIsInRhYnMiLCJjb25jYXQiLCJ1bmxpbmtlZCIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInByb3BzIiwiY29sb3IiLCJTdHJpbmciLCJzdGlja3kiLCJCb29sZWFuIiwiYW5pbWF0ZWQiLCJzd2lwZWFibGUiLCJsaW5lV2lkdGgiLCJOdW1iZXIiLCJ2YWx1ZSIsImxpbmVIZWlnaHQiLCJhY3RpdmUiLCJib3JkZXIiLCJkdXJhdGlvbiIsInpJbmRleCIsInN3aXBlVGhyZXNob2xkIiwib2Zmc2V0VG9wIiwibGluZVN0eWxlIiwic2Nyb2xsTGVmdCIsInNjcm9sbGFibGUiLCJ0cmFja1N0eWxlIiwid3JhcFN0eWxlIiwicG9zaXRpb24iLCJ3YXRjaCIsInNldCIsImxlbmd0aCIsImJlZm9yZUNyZWF0ZSIsIm1vdW50ZWQiLCJzZXRMaW5lIiwic2V0VHJhY2siLCJzY3JvbGxJbnRvVmlldyIsImdldFJlY3QiLCJ0aGVuIiwicmVjdCIsIm5hdkhlaWdodCIsImhlaWdodCIsIm9ic2VydmVyQ29udGVudFNjcm9sbCIsImRlc3Ryb3llZCIsImNyZWF0ZUludGVyc2VjdGlvbk9ic2VydmVyIiwiZGlzY29ubmVjdCIsIm1ldGhvZHMiLCJzZXRBY3RpdmVUYWIiLCJ0cmlnZ2VyIiwiZXZlbnROYW1lIiwiJGVtaXQiLCJ0aXRsZSIsIm9uVGFwIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImRpc2FibGVkIiwic2V0QWN0aXZlIiwic2tpcFRyYW5zaXRpb24iLCJyZWN0cyIsIndpZHRoIiwibGVmdCIsInNsaWNlIiwicmVkdWNlIiwicHJldiIsImN1cnIiLCJ0cmFuc2l0aW9uIiwiZm9yRWFjaCIsIml0ZW0iLCJpbml0ZWQiLCJQcm9taXNlIiwiYWxsIiwidGFiUmVjdHMiLCJuYXZSZWN0IiwidGFiUmVjdCIsIm9mZnNldExlZnQiLCJvblRvdWNoU3RhcnQiLCJ0b3VjaFN0YXJ0Iiwib25Ub3VjaE1vdmUiLCJ0b3VjaE1vdmUiLCJvblRvdWNoRW5kIiwiZGlyZWN0aW9uIiwiZGVsdGFYIiwib2Zmc2V0WCIsIm1pblN3aXBlRGlzdGFuY2UiLCJzZXRXcmFwU3R5bGUiLCJ3eCIsImdldFN5c3RlbUluZm9TeW5jIiwid2luZG93SGVpZ2h0IiwicmVsYXRpdmVUb1ZpZXdwb3J0IiwidG9wIiwib2JzZXJ2ZSIsInJlcyIsImJvdW5kaW5nQ2xpZW50UmVjdCIsImludGVyc2VjdGlvblJhdGlvIiwic2Nyb2xsVG9wIiwiaXNGaXhlZCIsInNldFBvc2l0aW9uIiwiYm90dG9tIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0E7O0FBQ0EsOEJBQWM7QUFDVkEsWUFBUSxDQUFDQyxZQUFELENBREU7QUFFVkMsYUFBUyxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLGtCQUEzQixFQUErQyxZQUEvQyxDQUZDO0FBR1ZDLGNBQVU7QUFDTkMsY0FBTSxLQURBO0FBRU5DLGNBQU0sWUFGQTtBQUdOQyxjQUhNLGtCQUdDQyxLQUhELEVBR1E7QUFDVixpQkFBS0EsS0FBTCxDQUFXQyxJQUFYLENBQWdCRCxLQUFoQjtBQUNBLGlCQUFLRSxVQUFMLENBQWdCLEtBQUtDLElBQUwsQ0FBVUMsSUFBVixDQUFlQyxNQUFmLENBQXNCTCxNQUFNRyxJQUE1QixDQUFoQjtBQUNILFNBTks7QUFPTkcsZ0JBUE0sb0JBT0dOLEtBUEgsRUFPVTtBQUNaLGdCQUFNTyxRQUFRLEtBQUtQLEtBQUwsQ0FBV1EsT0FBWCxDQUFtQlIsS0FBbkIsQ0FBZDtBQURZLGdCQUVKSSxJQUZJLEdBRUssS0FBS0QsSUFGVixDQUVKQyxJQUZJOztBQUdaQSxpQkFBS0ssTUFBTCxDQUFZRixLQUFaLEVBQW1CLENBQW5CO0FBQ0EsaUJBQUtQLEtBQUwsQ0FBV1MsTUFBWCxDQUFrQkYsS0FBbEIsRUFB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QUlBLGFBQWEsS0FBSzdCLElBQUwsQ0FBVTZCLFFBQTNCLEVBQXFDO0FBQ2pDLHFCQUFLRSxHQUFMLENBQVMsRUFBRUYsa0JBQUYsRUFBVCxFQUF1QlUsSUFBdkIsQ0FBNEIsWUFBTTtBQUM5QiwyQkFBSytDLFlBQUw7QUFDSCxpQkFGRDtBQUdIO0FBQ0o7QUFsTkk7QUFqR0MsQ0FBZCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vY29tcG9uZW50JztcclxuaW1wb3J0IHsgdG91Y2ggfSBmcm9tICcuLi9taXhpbnMvdG91Y2gnO1xyXG5WYW50Q29tcG9uZW50KHtcclxuICAgIG1peGluczogW3RvdWNoXSxcclxuICAgIGNsYXNzZXM6IFsnbmF2LWNsYXNzJywgJ3RhYi1jbGFzcycsICd0YWItYWN0aXZlLWNsYXNzJywgJ2xpbmUtY2xhc3MnXSxcclxuICAgIHJlbGF0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogJ3RhYicsXHJcbiAgICAgICAgdHlwZTogJ2Rlc2NlbmRhbnQnLFxyXG4gICAgICAgIGxpbmtlZChjaGlsZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkLnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRhYnModGhpcy5kYXRhLnRhYnMuY29uY2F0KGNoaWxkLmRhdGEpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVubGlua2VkKGNoaWxkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGlsZC5pbmRleE9mKGNoaWxkKTtcclxuICAgICAgICAgICAgY29uc3QgeyB0YWJzIH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIHRhYnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRhYnModGFicyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgY29sb3I6IFN0cmluZyxcclxuICAgICAgICBzdGlja3k6IEJvb2xlYW4sXHJcbiAgICAgICAgYW5pbWF0ZWQ6IEJvb2xlYW4sXHJcbiAgICAgICAgc3dpcGVhYmxlOiBCb29sZWFuLFxyXG4gICAgICAgIGxpbmVXaWR0aDoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiAtMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluZUhlaWdodDoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiAtMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWN0aXZlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgdmFsdWU6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ2xpbmUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib3JkZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgdmFsdWU6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGR1cmF0aW9uOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgdmFsdWU6IDAuM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgekluZGV4OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgdmFsdWU6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN3aXBlVGhyZXNob2xkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgdmFsdWU6IDRcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9mZnNldFRvcDoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhdGE6IHtcclxuICAgICAgICB0YWJzOiBbXSxcclxuICAgICAgICBsaW5lU3R5bGU6ICcnLFxyXG4gICAgICAgIHNjcm9sbExlZnQ6IDAsXHJcbiAgICAgICAgc2Nyb2xsYWJsZTogZmFsc2UsXHJcbiAgICAgICAgdHJhY2tTdHlsZTogJycsXHJcbiAgICAgICAgd3JhcFN0eWxlOiAnJyxcclxuICAgICAgICBwb3NpdGlvbjogJydcclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIHN3aXBlVGhyZXNob2xkKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldCh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxhYmxlOiB0aGlzLmNoaWxkLmxlbmd0aCA+IHRoaXMuZGF0YS5zd2lwZVRocmVzaG9sZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbG9yOiAnc2V0TGluZScsXHJcbiAgICAgICAgbGluZVdpZHRoOiAnc2V0TGluZScsXHJcbiAgICAgICAgbGluZUhlaWdodDogJ3NldExpbmUnLFxyXG4gICAgICAgIGFjdGl2ZTogJ3NldEFjdGl2ZVRhYicsXHJcbiAgICAgICAgYW5pbWF0ZWQ6ICdzZXRUcmFjaycsXHJcbiAgICAgICAgb2Zmc2V0VG9wOiAnc2V0V3JhcFN0eWxlJ1xyXG4gICAgfSxcclxuICAgIGJlZm9yZUNyZWF0ZSgpIHtcclxuICAgICAgICB0aGlzLmNoaWxkID0gW107XHJcbiAgICB9LFxyXG4gICAgbW91bnRlZCgpIHtcclxuICAgICAgICB0aGlzLnNldExpbmUodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRUcmFjaygpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcclxuICAgICAgICB0aGlzLmdldFJlY3QoJy52YW4tdGFic19fd3JhcCcpLnRoZW4oKHJlY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5uYXZIZWlnaHQgPSByZWN0LmhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlckNvbnRlbnRTY3JvbGwoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBkZXN0cm95ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVJbnRlcnNlY3Rpb25PYnNlcnZlcigpLmRpc2Nvbm5lY3QoKTtcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgdXBkYXRlVGFicyh0YWJzKSB7XHJcbiAgICAgICAgICAgIHRhYnMgPSB0YWJzIHx8IHRoaXMuZGF0YS50YWJzO1xyXG4gICAgICAgICAgICB0aGlzLnNldCh7XHJcbiAgICAgICAgICAgICAgICB0YWJzLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsYWJsZTogdGFicy5sZW5ndGggPiB0aGlzLmRhdGEuc3dpcGVUaHJlc2hvbGRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlVGFiKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmlnZ2VyKGV2ZW50TmFtZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdChldmVudE5hbWUsIHtcclxuICAgICAgICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuZGF0YS50YWJzW2luZGV4XS50aXRsZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uVGFwKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgaW5kZXggfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS50YWJzW2luZGV4XS5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdkaXNhYmxlZCcsIGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignY2xpY2snLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZShpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldEFjdGl2ZShhY3RpdmUpIHtcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZSAhPT0gdGhpcy5kYXRhLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCBhY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoeyBhY3RpdmUgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVRhYigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRMaW5lKHNraXBUcmFuc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEudHlwZSAhPT0gJ2xpbmUnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgeyBjb2xvciwgYWN0aXZlLCBkdXJhdGlvbiwgbGluZVdpZHRoLCBsaW5lSGVpZ2h0IH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjdCgnLnZhbi10YWInLCB0cnVlKS50aGVuKChyZWN0cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IHJlY3RzW2FjdGl2ZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IGxpbmVXaWR0aCAhPT0gLTEgPyBsaW5lV2lkdGggOiByZWN0LndpZHRoIC8gMjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGxpbmVIZWlnaHQgIT09IC0xID8gYGhlaWdodDogJHtsaW5lSGVpZ2h0fXB4O2AgOiAnJztcclxuICAgICAgICAgICAgICAgIGxldCBsZWZ0ID0gcmVjdHNcclxuICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgYWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHByZXYgKyBjdXJyLndpZHRoLCAwKTtcclxuICAgICAgICAgICAgICAgIGxlZnQgKz0gKHJlY3Qud2lkdGggLSB3aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IHNraXBUcmFuc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgPyAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogYHRyYW5zaXRpb24tZHVyYXRpb246ICR7ZHVyYXRpb259czsgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiAke2R1cmF0aW9ufXM7YDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IGBcclxuICAgICAgICAgICAgJHtoZWlnaHR9XHJcbiAgICAgICAgICAgIHdpZHRoOiAke3dpZHRofXB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9yfTtcclxuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtsZWZ0fXB4KTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7bGVmdH1weCk7XHJcbiAgICAgICAgICAgICR7dHJhbnNpdGlvbn1cclxuICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFRyYWNrKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGFuaW1hdGVkLCBhY3RpdmUsIGR1cmF0aW9uIH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIGlmICghYW5pbWF0ZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjdCgnLnZhbi10YWJzX19jb250ZW50JykudGhlbigocmVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyB3aWR0aCB9ID0gcmVjdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFja1N0eWxlOiBgXHJcbiAgICAgICAgICAgIHdpZHRoOiAke3dpZHRoICogdGhpcy5jaGlsZC5sZW5ndGh9cHg7XHJcbiAgICAgICAgICAgIGxlZnQ6ICR7LTEgKiBhY3RpdmUgKiB3aWR0aH1weDtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogbGVmdCAke2R1cmF0aW9ufXM7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wcyA9IHsgd2lkdGgsIGFuaW1hdGVkIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNldChwcm9wcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRBY3RpdmVUYWIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGQuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBpbmRleCA9PT0gdGhpcy5kYXRhLmFjdGl2ZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaW5pdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmFjdGl2ZSAhPT0gaXRlbS5kYXRhLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXQoe30sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFjaygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxJbnRvVmlldygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIHNjcm9sbCBhY3RpdmUgdGFiIGludG8gdmlld1xyXG4gICAgICAgIHNjcm9sbEludG9WaWV3KCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGFjdGl2ZSwgc2Nyb2xsYWJsZSB9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICBpZiAoIXNjcm9sbGFibGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY3QoJy52YW4tdGFiJywgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY3QoJy52YW4tdGFic19fbmF2JylcclxuICAgICAgICAgICAgXSkudGhlbigoW3RhYlJlY3RzLCBuYXZSZWN0XSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFiUmVjdCA9IHRhYlJlY3RzW2FjdGl2ZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXRMZWZ0ID0gdGFiUmVjdHNcclxuICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgYWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHByZXYgKyBjdXJyLndpZHRoLCAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiBvZmZzZXRMZWZ0IC0gKG5hdlJlY3Qud2lkdGggLSB0YWJSZWN0LndpZHRoKSAvIDJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZGF0YS5zd2lwZWFibGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hTdGFydChldmVudCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRvdWNoTW92ZShldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZGF0YS5zd2lwZWFibGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hNb3ZlKGV2ZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIHdhdGNoIHN3aXBlIHRvdWNoIGVuZFxyXG4gICAgICAgIG9uVG91Y2hFbmQoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kYXRhLnN3aXBlYWJsZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgeyBhY3RpdmUsIHRhYnMgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgeyBkaXJlY3Rpb24sIGRlbHRhWCwgb2Zmc2V0WCB9ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgbWluU3dpcGVEaXN0YW5jZSA9IDUwO1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgb2Zmc2V0WCA+PSBtaW5Td2lwZURpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFYID4gMCAmJiBhY3RpdmUgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZShhY3RpdmUgLSAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRlbHRhWCA8IDAgJiYgYWN0aXZlICE9PSB0YWJzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZShhY3RpdmUgKyAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0V3JhcFN0eWxlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IG9mZnNldFRvcCwgcG9zaXRpb24gfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgbGV0IHdyYXBTdHlsZTtcclxuICAgICAgICAgICAgc3dpdGNoIChwb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndG9wJzpcclxuICAgICAgICAgICAgICAgICAgICB3cmFwU3R5bGUgPSBgXHJcbiAgICAgICAgICAgIHRvcDogJHtvZmZzZXRUb3B9cHg7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdib3R0b20nOlxyXG4gICAgICAgICAgICAgICAgICAgIHdyYXBTdHlsZSA9IGBcclxuICAgICAgICAgICAgdG9wOiBhdXRvO1xyXG4gICAgICAgICAgICBib3R0b206IDA7XHJcbiAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB3cmFwU3R5bGUgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjdXQgZG93biBgc2V0YFxyXG4gICAgICAgICAgICBpZiAod3JhcFN0eWxlID09PSB0aGlzLmRhdGEud3JhcFN0eWxlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnNldCh7IHdyYXBTdHlsZSB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9ic2VydmVyQ29udGVudFNjcm9sbCgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGEuc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgeyBvZmZzZXRUb3AgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgeyB3aW5kb3dIZWlnaHQgfSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKS5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKVxyXG4gICAgICAgICAgICAgICAgLnJlbGF0aXZlVG9WaWV3cG9ydCh7IHRvcDogLSh0aGlzLm5hdkhlaWdodCArIG9mZnNldFRvcCkgfSlcclxuICAgICAgICAgICAgICAgIC5vYnNlcnZlKCcudmFuLXRhYnMnLCAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHRvcCB9ID0gcmVzLmJvdW5kaW5nQ2xpZW50UmVjdDtcclxuICAgICAgICAgICAgICAgIGlmICh0b3AgPiBvZmZzZXRUb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHJlcy5pbnRlcnNlY3Rpb25SYXRpbyA+IDAgPyAndG9wJyA6ICdib3R0b20nO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnc2Nyb2xsJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdG9wICsgb2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRml4ZWQ6IHBvc2l0aW9uID09PSAndG9wJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKVxyXG4gICAgICAgICAgICAgICAgLnJlbGF0aXZlVG9WaWV3cG9ydCh7IGJvdHRvbTogLSh3aW5kb3dIZWlnaHQgLSAxIC0gb2Zmc2V0VG9wKSB9KVxyXG4gICAgICAgICAgICAgICAgLm9ic2VydmUoJy52YW4tdGFicycsIChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgdG9wLCBib3R0b20gfSA9IHJlcy5ib3VuZGluZ0NsaWVudFJlY3Q7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm90dG9tIDwgdGhpcy5uYXZIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHJlcy5pbnRlcnNlY3Rpb25SYXRpbyA+IDAgPyAndG9wJyA6ICcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnc2Nyb2xsJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogdG9wICsgb2Zmc2V0VG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRml4ZWQ6IHBvc2l0aW9uID09PSAndG9wJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRQb3NpdGlvbihwb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gIT09IHRoaXMuZGF0YS5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoeyBwb3NpdGlvbiB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFdyYXBTdHlsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=