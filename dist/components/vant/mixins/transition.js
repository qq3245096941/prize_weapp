'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transition = undefined;

var _utils = require('./../common/utils.js');

var getClassNames = function getClassNames(name) {
    return {
        enter: 'van-' + name + '-enter van-' + name + '-enter-active enter-class enter-active-class',
        'enter-to': 'van-' + name + '-enter-to van-' + name + '-enter-active enter-to-class enter-active-class',
        leave: 'van-' + name + '-leave van-' + name + '-leave-active leave-class leave-active-class',
        'leave-to': 'van-' + name + '-leave-to van-' + name + '-leave-active leave-to-class leave-active-class'
    };
};
var nextTick = function nextTick() {
    return new Promise(function (resolve) {
        return setTimeout(resolve, 1000 / 20);
    });
};
var transition = exports.transition = function transition(showDefaultValue) {
    return Behavior({
        properties: {
            customStyle: String,
            show: {
                type: Boolean,
                value: showDefaultValue,
                observer: 'observeShow'
            },
            duration: {
                type: [Number, Object],
                value: 300,
                observer: 'observeDuration'
            },
            name: {
                type: String,
                value: 'fade',
                observer: 'updateClasses'
            }
        },
        data: {
            type: '',
            inited: false,
            display: false,
            classNames: getClassNames('fade')
        },
        attached: function attached() {
            if (this.data.show) {
                this.show();
            }
        },

        methods: {
            observeShow: function observeShow(value) {
                if (value) {
                    this.show();
                } else {
                    this.leave();
                }
            },
            updateClasses: function updateClasses(name) {
                this.set({
                    classNames: getClassNames(name)
                });
            },
            show: function show() {
                var _this = this;

                var _data = this.data,
                    classNames = _data.classNames,
                    duration = _data.duration;

                var currentDuration = (0, _utils.isObj)(duration) ? duration.leave : duration;
                Promise.resolve().then(nextTick).then(function () {
                    return _this.set({
                        inited: true,
                        display: true,
                        classes: classNames.enter,
                        currentDuration: currentDuration
                    });
                }).then(nextTick).then(function () {
                    return _this.set({
                        classes: classNames['enter-to']
                    });
                });
            },
            leave: function leave() {
                var _this2 = this;

                var _data2 = this.data,
                    classNames = _data2.classNames,
                    duration = _data2.duration;

                var currentDuration = (0, _utils.isObj)(duration) ? duration.leave : duration;
                Promise.resolve().then(nextTick).then(function () {
                    return _this2.set({
                        classes: classNames.leave,
                        currentDuration: currentDuration
                    });
                }).then(function () {
                    return setTimeout(function () {
                        return _this2.onTransitionEnd();
                    }, currentDuration);
                }).then(nextTick).then(function () {
                    return _this2.set({
                        classes: classNames['leave-to']
                    });
                });
            },
            onTransitionEnd: function onTransitionEnd() {
                if (!this.data.show) {
                    this.set({ display: false });
                    this.$emit('transitionEnd');
                }
            }
        }
    });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYW5zaXRpb24uanMiXSwibmFtZXMiOlsiZ2V0Q2xhc3NOYW1lcyIsIm5hbWUiLCJlbnRlciIsImxlYXZlIiwibmV4dFRpY2siLCJQcm9taXNlIiwic2V0VGltZW91dCIsInJlc29sdmUiLCJ0cmFuc2l0aW9uIiwic2hvd0RlZmF1bHRWYWx1ZSIsIkJlaGF2aW9yIiwicHJvcGVydGllcyIsImN1c3RvbVN0eWxlIiwiU3RyaW5nIiwic2hvdyIsInR5cGUiLCJCb29sZWFuIiwidmFsdWUiLCJvYnNlcnZlciIsImR1cmF0aW9uIiwiTnVtYmVyIiwiT2JqZWN0IiwiZGF0YSIsImluaXRlZCIsImRpc3BsYXkiLCJjbGFzc05hbWVzIiwiYXR0YWNoZWQiLCJtZXRob2RzIiwib2JzZXJ2ZVNob3ciLCJ1cGRhdGVDbGFzc2VzIiwic2V0IiwiY3VycmVudER1cmF0aW9uIiwidGhlbiIsImNsYXNzZXMiLCJvblRyYW5zaXRpb25FbmQiLCIkZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBLElBQU1BLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ0MsSUFBRDtBQUFBLFdBQVc7QUFDN0JDLHdCQUFjRCxJQUFkLG1CQUFnQ0EsSUFBaEMsaURBRDZCO0FBRTdCLDZCQUFtQkEsSUFBbkIsc0JBQXdDQSxJQUF4QyxvREFGNkI7QUFHN0JFLHdCQUFjRixJQUFkLG1CQUFnQ0EsSUFBaEMsaURBSDZCO0FBSTdCLDZCQUFtQkEsSUFBbkIsc0JBQXdDQSxJQUF4QztBQUo2QixLQUFYO0FBQUEsQ0FBdEI7QUFNQSxJQUFNRyxXQUFXLFNBQVhBLFFBQVc7QUFBQSxXQUFNLElBQUlDLE9BQUosQ0FBWTtBQUFBLGVBQVdDLFdBQVdDLE9BQVgsRUFBb0IsT0FBTyxFQUEzQixDQUFYO0FBQUEsS0FBWixDQUFOO0FBQUEsQ0FBakI7QUFDTyxJQUFNQyxrQ0FBYSxTQUFiQSxVQUFhLENBQVVDLGdCQUFWLEVBQTRCO0FBQ2xELFdBQU9DLFNBQVM7QUFDWkMsb0JBQVk7QUFDUkMs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LENBQVMsRUFBRU4sU0FBUyxLQUFYLEVBQVQ7QUFDQSx5QkFBS1csS0FBTCxDQUFXLGVBQVg7QUFDSDtBQUNKO0FBbERJO0FBOUJHLEtBQVQsQ0FBUDtBQW1GSCxDQXBGTSIsImZpbGUiOiJ0cmFuc2l0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNPYmogfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xyXG5jb25zdCBnZXRDbGFzc05hbWVzID0gKG5hbWUpID0+ICh7XHJcbiAgICBlbnRlcjogYHZhbi0ke25hbWV9LWVudGVyIHZhbi0ke25hbWV9LWVudGVyLWFjdGl2ZSBlbnRlci1jbGFzcyBlbnRlci1hY3RpdmUtY2xhc3NgLFxyXG4gICAgJ2VudGVyLXRvJzogYHZhbi0ke25hbWV9LWVudGVyLXRvIHZhbi0ke25hbWV9LWVudGVyLWFjdGl2ZSBlbnRlci10by1jbGFzcyBlbnRlci1hY3RpdmUtY2xhc3NgLFxyXG4gICAgbGVhdmU6IGB2YW4tJHtuYW1lfS1sZWF2ZSB2YW4tJHtuYW1lfS1sZWF2ZS1hY3RpdmUgbGVhdmUtY2xhc3MgbGVhdmUtYWN0aXZlLWNsYXNzYCxcclxuICAgICdsZWF2ZS10byc6IGB2YW4tJHtuYW1lfS1sZWF2ZS10byB2YW4tJHtuYW1lfS1sZWF2ZS1hY3RpdmUgbGVhdmUtdG8tY2xhc3MgbGVhdmUtYWN0aXZlLWNsYXNzYFxyXG59KTtcclxuY29uc3QgbmV4dFRpY2sgPSAoKSA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCAvIDIwKSk7XHJcbmV4cG9ydCBjb25zdCB0cmFuc2l0aW9uID0gZnVuY3Rpb24gKHNob3dEZWZhdWx0VmFsdWUpIHtcclxuICAgIHJldHVybiBCZWhhdmlvcih7XHJcbiAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICBjdXN0b21TdHlsZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBzaG93OiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHNob3dEZWZhdWx0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlcjogJ29ic2VydmVTaG93J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkdXJhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogW051bWJlciwgT2JqZWN0XSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAzMDAsXHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlcjogJ29ic2VydmVEdXJhdGlvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdmYWRlJyxcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyOiAndXBkYXRlQ2xhc3NlcydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB0eXBlOiAnJyxcclxuICAgICAgICAgICAgaW5pdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgZGlzcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZXM6IGdldENsYXNzTmFtZXMoJ2ZhZGUnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXR0YWNoZWQoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuc2hvdykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgICAgb2JzZXJ2ZVNob3codmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWF2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cGRhdGVDbGFzc2VzKG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWVzOiBnZXRDbGFzc05hbWVzKG5hbWUpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2hvdygpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgY2xhc3NOYW1lcywgZHVyYXRpb24gfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREdXJhdGlvbiA9IGlzT2JqKGR1cmF0aW9uKSA/IGR1cmF0aW9uLmxlYXZlIDogZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKG5leHRUaWNrKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBjbGFzc05hbWVzLmVudGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnREdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4obmV4dFRpY2spXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IGNsYXNzTmFtZXNbJ2VudGVyLXRvJ11cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGVhdmUoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGNsYXNzTmFtZXMsIGR1cmF0aW9uIH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50RHVyYXRpb24gPSBpc09iaihkdXJhdGlvbikgPyBkdXJhdGlvbi5sZWF2ZSA6IGR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihuZXh0VGljaylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogY2xhc3NOYW1lcy5sZWF2ZSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RHVyYXRpb25cclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vblRyYW5zaXRpb25FbmQoKSwgY3VycmVudER1cmF0aW9uKSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihuZXh0VGljaylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogY2xhc3NOYW1lc1snbGVhdmUtdG8nXVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGF0YS5zaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoeyBkaXNwbGF5OiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCd0cmFuc2l0aW9uRW5kJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuIl19