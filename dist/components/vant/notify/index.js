'use strict';

var _component = require('./../common/component.js');

var _color = require('./../common/color.js');

var _safeArea = require('./../mixins/safe-area.js');

(0, _component.VantComponent)({
    mixins: [(0, _safeArea.safeArea)()],
    props: {
        text: String,
        color: {
            type: String,
            value: '#fff'
        },
        backgroundColor: {
            type: String,
            value: _color.RED
        },
        duration: {
            type: Number,
            value: 3000
        },
        zIndex: {
            type: Number,
            value: 110
        }
    },
    methods: {
        show: function show() {
            var _this = this;

            var duration = this.data.duration;

            clearTimeout(this.timer);
            this.set({
                show: true
            });
            if (duration > 0 && duration !== Infinity) {
                this.timer = setTimeout(function () {
                    _this.hide();
                }, duration);
            }
        },
        hide: function hide() {
            clearTimeout(this.timer);
            this.set({
                show: false
            });
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1peGlucyIsInByb3BzIiwidGV4dCIsIlN0cmluZyIsImNvbG9yIiwidHlwZSIsInZhbHVlIiwiYmFja2dyb3VuZENvbG9yIiwiUkVEIiwiZHVyYXRpb24iLCJOdW1iZXIiLCJ6SW5kZXgiLCJtZXRob2RzIiwic2hvdyIsImRhdGEiLCJjbGVhclRpbWVvdXQiLCJ0aW1lciIsInNldCIsIkluZmluaXR5Iiwic2V0VGltZW91dCIsImhpZGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0EsOEJBQWM7QUFDVkEsWUFBUSxDQUFDLHlCQUFELENBREU7QUFFVkMsV0FBTztBQUNIQyxjQUFNQyxNQURIO0FBRUhDLGVBQU87QUFDSEMsa0JBQU1GLE1BREg7QUFFSEcsbUJBQU87QUFGSixTQUZKO0FBTUhDLHlCQUFpQjtBQUNiRixrQkFBTUYsTUFETztBQUViRyxtQkFBT0U7QUFGTSxTQU5kO0FBVUhDLGtCQUFVO0FBQ05KLGtCQUFNSyxNQURBO0FBRU5KLG1CQUFPO0FBRkQsU0FWUDtBQWNISyxnQkFBUTtBQUNKTixrQkFBTUssTUFERjtBQUVKSixtQkFBTztBQUZIO0FBZEwsS0FGRztBQXFCVk0sYUFBUztBQUNMQyxZQURLLGtCQUNFO0FBQUE7O0FBQUEsZ0JBQ0tKLFFBREwsR0FDa0IsS0FBS0ssSUFEdkIsQ0FDS0wsUUFETDs7QUFFSE0seUJBQWEsS0FBS0MsS0FBbEI7QUFDQSxpQkFBS0MsR0FBTCxDQUFTO0FBQ0xKLHNCQUFNO0FBREQsYUFBVDtBQUdBLGdCQUFJSixXQUFXLENBQVgsSUFBZ0JBLGFBQWFTLFFBQWpDLEVBQTJDO0FBQ3ZDLHFCQUFLRixLQUFMLEdBQWFHLFdBQVcsWUFBTTtBQUMxQiwwQkFBS0MsSUFBTDtBQUNILGlCQUZZLEVBRVZYLFFBRlUsQ0FBYjtBQUdIO0FBQ0osU0FaSTtBQWFMVyxZQWJLLGtCQWFFO0FBQ0hMLHlCQUFhLEtBQUtDLEtBQWxCO0FBQ0EsaUJBQUtDLEdBQUwsQ0FBUztBQUNMSixzQkFBTTtBQURELGFBQVQ7QUFHSDtBQWxCSTtBQXJCQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSRUQgfSBmcm9tICcuLi9jb21tb24vY29sb3InO1xyXG5pbXBvcnQgeyBzYWZlQXJlYSB9IGZyb20gJy4uL21peGlucy9zYWZlLWFyZWEnO1xyXG5WYW50Q29tcG9uZW50KHtcclxuICAgIG1peGluczogW3NhZmVBcmVhKCldLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICB0ZXh0OiBTdHJpbmcsXHJcbiAgICAgICAgY29sb3I6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJyNmZmYnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogUkVEXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkdXJhdGlvbjoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiAzMDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB6SW5kZXg6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMTEwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBzaG93KCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGR1cmF0aW9uIH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy5zZXQoe1xyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGR1cmF0aW9uID4gMCAmJiBkdXJhdGlvbiAhPT0gSW5maW5pdHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH0sIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlkZSgpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldCh7XHJcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=