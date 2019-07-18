'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _component = require('./../common/component.js');

var _utils = require('./../common/utils.js');

var _shared = require('./../picker/shared.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var currentYear = new Date().getFullYear();
function isValidDate(date) {
    return (0, _utils.isDef)(date) && !isNaN(new Date(date).getTime());
}
function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
function padZero(val) {
    return ('00' + val).slice(-2);
}
function times(n, iteratee) {
    var index = -1;
    var result = Array(n < 0 ? 0 : n);
    while (++index < n) {
        result[index] = iteratee(index);
    }
    return result;
}
function getTrueValue(formattedValue) {
    if (!formattedValue) return;
    while (isNaN(parseInt(formattedValue, 10))) {
        formattedValue = formattedValue.slice(1);
    }
    return parseInt(formattedValue, 10);
}
function getMonthEndDay(year, month) {
    return 32 - new Date(year, month - 1, 32).getDate();
}
var defaultFormatter = function defaultFormatter(_, value) {
    return value;
};
(0, _component.VantComponent)({
    classes: ['active-class', 'toolbar-class', 'column-class'],
    props: Object.assign({}, _shared.pickerProps, { formatter: {
            type: Function,
            value: defaultFormatter
        }, value: null, type: {
            type: String,
            value: 'datetime'
        }, showToolbar: {
            type: Boolean,
            value: true
        }, minDate: {
            type: Number,
            value: new Date(currentYear - 10, 0, 1).getTime()
        }, maxDate: {
            type: Number,
            value: new Date(currentYear + 10, 11, 31).getTime()
        }, minHour: {
            type: Number,
            value: 0
        }, maxHour: {
            type: Number,
            value: 23
        }, minMinute: {
            type: Number,
            value: 0
        }, maxMinute: {
            type: Number,
            value: 59
        } }),
    data: {
        innerValue: Date.now(),
        columns: []
    },
    watch: {
        value: function value(val) {
            var _this = this;

            var data = this.data;

            val = this.correctValue(val);
            var isEqual = val === data.innerValue;
            if (!isEqual) {
                this.updateColumnValue(val).then(function () {
                    _this.$emit('input', val);
                });
            }
        },

        type: 'updateColumns',
        minHour: 'updateColumns',
        maxHour: 'updateColumns',
        minMinute: 'updateColumns',
        maxMinute: 'updateColumns'
    },
    methods: {
        getPicker: function getPicker() {
            if (this.picker == null) {
                var picker = this.picker = this.selectComponent('.van-datetime-picker');
                var setColumnValues = picker.setColumnValues;

                picker.setColumnValues = function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    return setColumnValues.apply(picker, [].concat(args, [false]));
                };
            }
            return this.picker;
        },
        updateColumns: function updateColumns() {
            var _data$formatter = this.data.formatter,
                formatter = _data$formatter === undefined ? defaultFormatter : _data$formatter;

            var results = this.getRanges().map(function (_ref, index) {
                var type = _ref.type,
                    range = _ref.range;

                var values = times(range[1] - range[0] + 1, function (index) {
                    var value = range[0] + index;
                    value = type === 'year' ? '' + value : padZero(value);
                    return formatter(type, value);
                });
                return { values: values };
            });
            return this.set({ columns: results });
        },
        getRanges: function getRanges() {
            var data = this.data;

            if (data.type === 'time') {
                return [{
                    type: 'hour',
                    range: [data.minHour, data.maxHour]
                }, {
                    type: 'minute',
                    range: [data.minMinute, data.maxMinute]
                }];
            }

            var _getBoundary = this.getBoundary('max', data.innerValue),
                maxYear = _getBoundary.maxYear,
                maxDate = _getBoundary.maxDate,
                maxMonth = _getBoundary.maxMonth,
                maxHour = _getBoundary.maxHour,
                maxMinute = _getBoundary.maxMinute;

            var _getBoundary2 = this.getBoundary('min', data.innerValue),
                minYear = _getBoundary2.minYear,
                minDate = _getBoundary2.minDate,
                minMonth = _getBoundary2.minMonth,
                minHour = _getBoundary2.minHour,
                minMinute = _getBoundary2.minMinute;

            var result = [{
                type: 'year',
                range: [minYear, maxYear]
            }, {
                type: 'month',
                range: [minMonth, maxMonth]
            }, {
                type: 'day',
                range: [minDate, maxDate]
            }, {
                type: 'hour',
                range: [minHour, maxHour]
            }, {
                type: 'minute',
                range: [minMinute, maxMinute]
            }];
            if (data.type === 'date') result.splice(3, 2);
            if (data.type === 'year-month') result.splice(2, 3);
            return result;
        },
        correctValue: function correctValue(value) {
            var data = this.data;
            // validate value

            var isDateType = data.type !== 'time';
            if (isDateType && !isValidDate(value)) {
                value = data.minDate;
            } else if (!isDateType && !value) {
                var minHour = data.minHour;

                value = padZero(minHour) + ':00';
            }
            // time type
            if (!isDateType) {
                var _value$split = value.split(':'),
                    _value$split2 = _slicedToArray(_value$split, 2),
                    hour = _value$split2[0],
                    minute = _value$split2[1];

                hour = padZero(range(hour, data.minHour, data.maxHour));
                minute = padZero(range(minute, data.minMinute, data.maxMinute));
                return hour + ':' + minute;
            }
            // date type
            value = Math.max(value, data.minDate);
            value = Math.min(value, data.maxDate);
            return value;
        },
        getBoundary: function getBoundary(type, innerValue) {
            var _ref2;

            var value = new Date(innerValue);
            var boundary = new Date(this.data[type + 'Date']);
            var year = boundary.getFullYear();
            var month = 1;
            var date = 1;
            var hour = 0;
            var minute = 0;
            if (type === 'max') {
                month = 12;
                date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
                hour = 23;
                minute = 59;
            }
            if (value.getFullYear() === year) {
                month = boundary.getMonth() + 1;
                if (value.getMonth() + 1 === month) {
                    date = boundary.getDate();
                    if (value.getDate() === date) {
                        hour = boundary.getHours();
                        if (value.getHours() === hour) {
                            minute = boundary.getMinutes();
                        }
                    }
                }
            }
            return _ref2 = {}, _defineProperty(_ref2, type + 'Year', year), _defineProperty(_ref2, type + 'Month', month), _defineProperty(_ref2, type + 'Date', date), _defineProperty(_ref2, type + 'Hour', hour), _defineProperty(_ref2, type + 'Minute', minute), _ref2;
        },
        onCancel: function onCancel() {
            this.$emit('cancel');
        },
        onConfirm: function onConfirm() {
            this.$emit('confirm', this.data.innerValue);
        },
        onChange: function onChange() {
            var _this2 = this;

            var data = this.data;

            var value = void 0;
            var picker = this.getPicker();
            if (data.type === 'time') {
                var indexes = picker.getIndexes();
                value = indexes[0] + data.minHour + ':' + (indexes[1] + data.minMinute);
            } else {
                var values = picker.getValues();
                var year = getTrueValue(values[0]);
                var month = getTrueValue(values[1]);
                var maxDate = getMonthEndDay(year, month);
                var date = getTrueValue(values[2]);
                if (data.type === 'year-month') {
                    date = 1;
                }
                date = date > maxDate ? maxDate : date;
                var hour = 0;
                var minute = 0;
                if (data.type === 'datetime') {
                    hour = getTrueValue(values[3]);
                    minute = getTrueValue(values[4]);
                }
                value = new Date(year, month - 1, date, hour, minute);
            }
            value = this.correctValue(value);
            this.updateColumnValue(value).then(function () {
                _this2.$emit('input', value);
                _this2.$emit('change', picker);
            });
        },
        updateColumnValue: function updateColumnValue(value) {
            var _this3 = this;

            var values = [];
            var _data = this.data,
                type = _data.type,
                _data$formatter2 = _data.formatter,
                formatter = _data$formatter2 === undefined ? defaultFormatter : _data$formatter2;

            var picker = this.getPicker();
            if (type === 'time') {
                var pair = value.split(':');
                values = [formatter('hour', pair[0]), formatter('minute', pair[1])];
            } else {
                var date = new Date(value);
                values = [formatter('year', '' + date.getFullYear()), formatter('month', padZero(date.getMonth() + 1))];
                if (type === 'date') {
                    values.push(formatter('day', padZero(date.getDate())));
                }
                if (type === 'datetime') {
                    values.push(formatter('day', padZero(date.getDate())), formatter('hour', padZero(date.getHours())), formatter('minute', padZero(date.getMinutes())));
                }
            }
            return this.set({ innerValue: value }).then(function () {
                return _this3.updateColumns();
            }).then(function () {
                return picker.setValues(values);
            });
        }
    },
    created: function created() {
        var _this4 = this;

        var innerValue = this.correctValue(this.data.value);
        this.updateColumnValue(innerValue).then(function () {
            _this4.$emit('input', innerValue);
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImN1cnJlbnRZZWFyIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwiaXNWYWxpZERhdGUiLCJkYXRlIiwiaXNOYU4iLCJnZXRUaW1lIiwicmFuZ2UiLCJudW0iLCJtaW4iLCJtYXgiLCJNYXRoIiwicGFkWmVybyIsInZhbCIsInNsaWNlIiwidGltZXMiLCJuIiwiaXRlcmF0ZWUiLCJpbmRleCIsInJlc3VsdCIsIkFycmF5IiwiZ2V0VHJ1ZVZhbHVlIiwiZm9ybWF0dGVkVmFsdWUiLCJwYXJzZUludCIsImdldE1vbnRoRW5kRGF5IiwieWVhciIsIm1vbnRoIiwiZ2V0RGF0ZSIsImRlZmF1bHRGb3JtYXR0ZXIiLCJfIiwidmFsdWUiLCJjbGFzc2VzIiwicHJvcHMiLCJPYmplY3QiLCJhc3NpZ24iLCJwaWNrZXJQcm9wcyIsImZvcm1hdHRlciIsInR5cGUiLCJGdW5jdGlvbiIsIlN0cmluZyIsInNob3dUb29sYmFyIiwiQm9vbGVhbiIsIm1pbkRhdGUiLCJOdW1iZXIiLCJtYXhEYXRlIiwibWluSG91ciIsIm1heEhvdXIiLCJtaW5NaW51dGUiLCJtYXhNaW51dGUiLCJkYXRhIiwiaW5uZXJWYWx1ZSIsIm5vdyIsImNvbHVtbnMiLCJ3YXRjaCIsImNvcnJlY3RWYWx1ZSIsImlzRXF1YWwiLCJ1cGRhdGVDb2x1bW5WYWx1ZSIsInRoZW4iLCIkZW1pdCIsIm1ldGhvZHMiLCJnZXRQaWNrZXIiLCJwaWNrZXIiLCJzZWxlY3RDb21wb25lbnQiLCJzZXRDb2x1bW5WYWx1ZXMiLCJhcmdzIiwiYXBwbHkiLCJ1cGRhdGVDb2x1bW5zIiwicmVzdWx0cyIsImdldFJhbmdlcyIsIm1hcCIsInZhbHVlcyIsInNldCIsImdldEJvdW5kYXJ5IiwibWF4WWVhciIsIm1heE1vbnRoIiwibWluWWVhciIsIm1pbk1vbnRoIiwic3BsaWNlIiwiaXNEYXRlVHlwZSIsInNwbGl0IiwiaG91ciIsIm1pbnV0ZSIsImJvdW5kYXJ5IiwiZ2V0TW9udGgiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJvbkNhbmNlbCIsIm9uQ29uZmlybSIsIm9uQ2hhbmdlIiwiaW5kZXhlcyIsImdldEluZGV4ZXMiLCJnZXRWYWx1ZXMiLCJwYWlyIiwicHVzaCIsInNldFZhbHVlcyIsImNyZWF0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBLElBQU1BLGNBQWMsSUFBSUMsSUFBSixHQUFXQyxXQUFYLEVBQXBCO0FBQ0EsU0FBU0MsV0FBVCxDQUFxQkMsSUFBckIsRUFBMkI7QUFDdkIsV0FBTyxrQkFBTUEsSUFBTixLQUFlLENBQUNDLE1BQU0sSUFBSUosSUFBSixDQUFTRyxJQUFULEVBQWVFLE9BQWYsRUFBTixDQUF2QjtBQUNIO0FBQ0QsU0FBU0MsS0FBVCxDQUFlQyxHQUFmLEVBQW9CQyxHQUFwQixFQUF5QkMsR0FBekIsRUFBOEI7QUFDMUIsV0FBT0MsS0FBS0YsR0FBTCxDQUFTRSxLQUFLRCxHQUFMLENBQVNGLEdBQVQsRUFBY0MsR0FBZCxDQUFULEVBQTZCQyxHQUE3QixDQUFQO0FBQ0g7QUFDRCxTQUFTRSxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUNsQixXQUFPLFFBQUtBLEdBQUwsRUFBV0MsS0FBWCxDQUFpQixDQUFDLENBQWxCLENBQVA7QUFDSDtBQUNELFNBQVNDLEtBQVQsQ0FBZUMsQ0FBZixFQUFrQkMsUUFBbEIsRUFBNEI7QUFDeEIsUUFBSUMsUUFBUSxDQUFDLENBQWI7QUFDQSxRQUFNQyxTQUFTQyxNQUFNSixJQUFJLENBQUosR0FBUSxDQUFSLEdBQVlBLENBQWxCLENBQWY7QUFDQSxXQUFPLEVBQUVFLEtBQUYsR0FBVUYsQ0FBakIsRUFBb0I7QUFDaEJHLGVBQU9ELEtBQVAsSUFBZ0JELFNBQVNDLEtBQVQsQ0FBaEI7QUFDSDtBQUNELFdBQU9DLE1BQVA7QUFDSDtBQUNELFNBQVNFLFlBQVQsQ0FBc0JDLGNBQXRCLEVBQXNDO0FBQ2xDLFFBQUksQ0FBQ0EsY0FBTCxFQUNJO0FBQ0osV0FBT2pCLE1BQU1rQixTQUFTRCxj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LENBQXdDLFlBQU07QUFDMUMsbUJBQUtDLEtBQUwsQ0FBVyxPQUFYLEVBQW9CUixVQUFwQjtBQUNILFNBRkQ7QUFHSDtBQXJQUyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBpc0RlZiB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XHJcbmltcG9ydCB7IHBpY2tlclByb3BzIH0gZnJvbSAnLi4vcGlja2VyL3NoYXJlZCc7XHJcbmNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG5mdW5jdGlvbiBpc1ZhbGlkRGF0ZShkYXRlKSB7XHJcbiAgICByZXR1cm4gaXNEZWYoZGF0ZSkgJiYgIWlzTmFOKG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKSk7XHJcbn1cclxuZnVuY3Rpb24gcmFuZ2UobnVtLCBtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG51bSwgbWluKSwgbWF4KTtcclxufVxyXG5mdW5jdGlvbiBwYWRaZXJvKHZhbCkge1xyXG4gICAgcmV0dXJuIGAwMCR7dmFsfWAuc2xpY2UoLTIpO1xyXG59XHJcbmZ1bmN0aW9uIHRpbWVzKG4sIGl0ZXJhdGVlKSB7XHJcbiAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IEFycmF5KG4gPCAwID8gMCA6IG4pO1xyXG4gICAgd2hpbGUgKCsraW5kZXggPCBuKSB7XHJcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0VHJ1ZVZhbHVlKGZvcm1hdHRlZFZhbHVlKSB7XHJcbiAgICBpZiAoIWZvcm1hdHRlZFZhbHVlKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHdoaWxlIChpc05hTihwYXJzZUludChmb3JtYXR0ZWRWYWx1ZSwgMTApKSkge1xyXG4gICAgICAgIGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0dGVkVmFsdWUuc2xpY2UoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyc2VJbnQoZm9ybWF0dGVkVmFsdWUsIDEwKTtcclxufVxyXG5mdW5jdGlvbiBnZXRNb250aEVuZERheSh5ZWFyLCBtb250aCkge1xyXG4gICAgcmV0dXJuIDMyIC0gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCAzMikuZ2V0RGF0ZSgpO1xyXG59XHJcbmNvbnN0IGRlZmF1bHRGb3JtYXR0ZXIgPSAoXywgdmFsdWUpID0+IHZhbHVlO1xyXG5WYW50Q29tcG9uZW50KHtcclxuICAgIGNsYXNzZXM6IFsnYWN0aXZlLWNsYXNzJywgJ3Rvb2xiYXItY2xhc3MnLCAnY29sdW1uLWNsYXNzJ10sXHJcbiAgICBwcm9wczogT2JqZWN0LmFzc2lnbih7fSwgcGlja2VyUHJvcHMsIHsgZm9ybWF0dGVyOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICB2YWx1ZTogZGVmYXVsdEZvcm1hdHRlclxyXG4gICAgICAgIH0sIHZhbHVlOiBudWxsLCB0eXBlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdmFsdWU6ICdkYXRldGltZSdcclxuICAgICAgICB9LCBzaG93VG9vbGJhcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgICAgIH0sIG1pbkRhdGU6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogbmV3IERhdGUoY3VycmVudFllYXIgLSAxMCwgMCwgMSkuZ2V0VGltZSgpXHJcbiAgICAgICAgfSwgbWF4RGF0ZToge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiBuZXcgRGF0ZShjdXJyZW50WWVhciArIDEwLCAxMSwgMzEpLmdldFRpbWUoKVxyXG4gICAgICAgIH0sIG1pbkhvdXI6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMFxyXG4gICAgICAgIH0sIG1heEhvdXI6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMjNcclxuICAgICAgICB9LCBtaW5NaW51dGU6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMFxyXG4gICAgICAgIH0sIG1heE1pbnV0ZToge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiA1OVxyXG4gICAgICAgIH0gfSksXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgaW5uZXJWYWx1ZTogRGF0ZS5ub3coKSxcclxuICAgICAgICBjb2x1bW5zOiBbXVxyXG4gICAgfSxcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgICAgdmFsdWUodmFsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gdGhpcztcclxuICAgICAgICAgICAgdmFsID0gdGhpcy5jb3JyZWN0VmFsdWUodmFsKTtcclxuICAgICAgICAgICAgY29uc3QgaXNFcXVhbCA9IHZhbCA9PT0gZGF0YS5pbm5lclZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoIWlzRXF1YWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29sdW1uVmFsdWUodmFsKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZTogJ3VwZGF0ZUNvbHVtbnMnLFxyXG4gICAgICAgIG1pbkhvdXI6ICd1cGRhdGVDb2x1bW5zJyxcclxuICAgICAgICBtYXhIb3VyOiAndXBkYXRlQ29sdW1ucycsXHJcbiAgICAgICAgbWluTWludXRlOiAndXBkYXRlQ29sdW1ucycsXHJcbiAgICAgICAgbWF4TWludXRlOiAndXBkYXRlQ29sdW1ucydcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgZ2V0UGlja2VyKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5waWNrZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGlja2VyID0gKHRoaXMucGlja2VyID0gdGhpcy5zZWxlY3RDb21wb25lbnQoJy52YW4tZGF0ZXRpbWUtcGlja2VyJykpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBzZXRDb2x1bW5WYWx1ZXMgfSA9IHBpY2tlcjtcclxuICAgICAgICAgICAgICAgIHBpY2tlci5zZXRDb2x1bW5WYWx1ZXMgPSAoLi4uYXJncykgPT4gc2V0Q29sdW1uVmFsdWVzLmFwcGx5KHBpY2tlciwgWy4uLmFyZ3MsIGZhbHNlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXBkYXRlQ29sdW1ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBmb3JtYXR0ZXIgPSBkZWZhdWx0Rm9ybWF0dGVyIH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSB0aGlzLmdldFJhbmdlcygpLm1hcCgoeyB0eXBlLCByYW5nZSB9LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gdGltZXMocmFuZ2VbMV0gLSByYW5nZVswXSArIDEsIGluZGV4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSByYW5nZVswXSArIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHlwZSA9PT0gJ3llYXInID8gYCR7dmFsdWV9YCA6IHBhZFplcm8odmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZXIodHlwZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZXMgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldCh7IGNvbHVtbnM6IHJlc3VsdHMgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRSYW5nZXMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gJ3RpbWUnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hvdXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogW2RhdGEubWluSG91ciwgZGF0YS5tYXhIb3VyXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbWludXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IFtkYXRhLm1pbk1pbnV0ZSwgZGF0YS5tYXhNaW51dGVdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB7IG1heFllYXIsIG1heERhdGUsIG1heE1vbnRoLCBtYXhIb3VyLCBtYXhNaW51dGUgfSA9IHRoaXMuZ2V0Qm91bmRhcnkoJ21heCcsIGRhdGEuaW5uZXJWYWx1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbWluWWVhciwgbWluRGF0ZSwgbWluTW9udGgsIG1pbkhvdXIsIG1pbk1pbnV0ZSB9ID0gdGhpcy5nZXRCb3VuZGFyeSgnbWluJywgZGF0YS5pbm5lclZhbHVlKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd5ZWFyJyxcclxuICAgICAgICAgICAgICAgICAgICByYW5nZTogW21pblllYXIsIG1heFllYXJdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdtb250aCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IFttaW5Nb250aCwgbWF4TW9udGhdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkYXknLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiBbbWluRGF0ZSwgbWF4RGF0ZV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hvdXInLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiBbbWluSG91ciwgbWF4SG91cl1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ21pbnV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IFttaW5NaW51dGUsIG1heE1pbnV0ZV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gJ2RhdGUnKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNwbGljZSgzLCAyKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gJ3llYXItbW9udGgnKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNwbGljZSgyLCAzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvcnJlY3RWYWx1ZSh2YWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIHZhbGlkYXRlIHZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IGlzRGF0ZVR5cGUgPSBkYXRhLnR5cGUgIT09ICd0aW1lJztcclxuICAgICAgICAgICAgaWYgKGlzRGF0ZVR5cGUgJiYgIWlzVmFsaWREYXRlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhLm1pbkRhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoIWlzRGF0ZVR5cGUgJiYgIXZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IG1pbkhvdXIgfSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGAke3BhZFplcm8obWluSG91cil9OjAwYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0aW1lIHR5cGVcclxuICAgICAgICAgICAgaWYgKCFpc0RhdGVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgW2hvdXIsIG1pbnV0ZV0gPSB2YWx1ZS5zcGxpdCgnOicpO1xyXG4gICAgICAgICAgICAgICAgaG91ciA9IHBhZFplcm8ocmFuZ2UoaG91ciwgZGF0YS5taW5Ib3VyLCBkYXRhLm1heEhvdXIpKTtcclxuICAgICAgICAgICAgICAgIG1pbnV0ZSA9IHBhZFplcm8ocmFuZ2UobWludXRlLCBkYXRhLm1pbk1pbnV0ZSwgZGF0YS5tYXhNaW51dGUpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtob3VyfToke21pbnV0ZX1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGRhdGUgdHlwZVxyXG4gICAgICAgICAgICB2YWx1ZSA9IE1hdGgubWF4KHZhbHVlLCBkYXRhLm1pbkRhdGUpO1xyXG4gICAgICAgICAgICB2YWx1ZSA9IE1hdGgubWluKHZhbHVlLCBkYXRhLm1heERhdGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRCb3VuZGFyeSh0eXBlLCBpbm5lclZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbmV3IERhdGUoaW5uZXJWYWx1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kYXJ5ID0gbmV3IERhdGUodGhpcy5kYXRhW2Ake3R5cGV9RGF0ZWBdKTtcclxuICAgICAgICAgICAgY29uc3QgeWVhciA9IGJvdW5kYXJ5LmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIGxldCBtb250aCA9IDE7XHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gMTtcclxuICAgICAgICAgICAgbGV0IGhvdXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgbWludXRlID0gMDtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdtYXgnKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aCA9IDEyO1xyXG4gICAgICAgICAgICAgICAgZGF0ZSA9IGdldE1vbnRoRW5kRGF5KHZhbHVlLmdldEZ1bGxZZWFyKCksIHZhbHVlLmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICAgICAgICAgIGhvdXIgPSAyMztcclxuICAgICAgICAgICAgICAgIG1pbnV0ZSA9IDU5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5nZXRGdWxsWWVhcigpID09PSB5ZWFyKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aCA9IGJvdW5kYXJ5LmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmdldE1vbnRoKCkgKyAxID09PSBtb250aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBib3VuZGFyeS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmdldERhdGUoKSA9PT0gZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob3VyID0gYm91bmRhcnkuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmdldEhvdXJzKCkgPT09IGhvdXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IGJvdW5kYXJ5LmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgW2Ake3R5cGV9WWVhcmBdOiB5ZWFyLFxyXG4gICAgICAgICAgICAgICAgW2Ake3R5cGV9TW9udGhgXTogbW9udGgsXHJcbiAgICAgICAgICAgICAgICBbYCR7dHlwZX1EYXRlYF06IGRhdGUsXHJcbiAgICAgICAgICAgICAgICBbYCR7dHlwZX1Ib3VyYF06IGhvdXIsXHJcbiAgICAgICAgICAgICAgICBbYCR7dHlwZX1NaW51dGVgXTogbWludXRlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNhbmNlbCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNvbmZpcm0oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NvbmZpcm0nLCB0aGlzLmRhdGEuaW5uZXJWYWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNoYW5nZSgpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT09ICd0aW1lJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXhlcyA9IHBpY2tlci5nZXRJbmRleGVzKCk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGAke2luZGV4ZXNbMF0gKyBkYXRhLm1pbkhvdXJ9OiR7aW5kZXhlc1sxXSArIGRhdGEubWluTWludXRlfWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBwaWNrZXIuZ2V0VmFsdWVzKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5ZWFyID0gZ2V0VHJ1ZVZhbHVlKHZhbHVlc1swXSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb250aCA9IGdldFRydWVWYWx1ZSh2YWx1ZXNbMV0pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF4RGF0ZSA9IGdldE1vbnRoRW5kRGF5KHllYXIsIG1vbnRoKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlID0gZ2V0VHJ1ZVZhbHVlKHZhbHVlc1syXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSAneWVhci1tb250aCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRlID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRhdGUgPSBkYXRlID4gbWF4RGF0ZSA/IG1heERhdGUgOiBkYXRlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhvdXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pbnV0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlID09PSAnZGF0ZXRpbWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG91ciA9IGdldFRydWVWYWx1ZSh2YWx1ZXNbM10pO1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZSA9IGdldFRydWVWYWx1ZSh2YWx1ZXNbNF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRhdGUsIGhvdXIsIG1pbnV0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmNvcnJlY3RWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29sdW1uVmFsdWUodmFsdWUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBwaWNrZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZUNvbHVtblZhbHVlKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgY29uc3QgeyB0eXBlLCBmb3JtYXR0ZXIgPSBkZWZhdWx0Rm9ybWF0dGVyIH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAndGltZScpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhaXIgPSB2YWx1ZS5zcGxpdCgnOicpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcignaG91cicsIHBhaXJbMF0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcignbWludXRlJywgcGFpclsxXSlcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcigneWVhcicsIGAke2RhdGUuZ2V0RnVsbFllYXIoKX1gKSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXIoJ21vbnRoJywgcGFkWmVybyhkYXRlLmdldE1vbnRoKCkgKyAxKSlcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goZm9ybWF0dGVyKCdkYXknLCBwYWRaZXJvKGRhdGUuZ2V0RGF0ZSgpKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdkYXRldGltZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChmb3JtYXR0ZXIoJ2RheScsIHBhZFplcm8oZGF0ZS5nZXREYXRlKCkpKSwgZm9ybWF0dGVyKCdob3VyJywgcGFkWmVybyhkYXRlLmdldEhvdXJzKCkpKSwgZm9ybWF0dGVyKCdtaW51dGUnLCBwYWRaZXJvKGRhdGUuZ2V0TWludXRlcygpKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldCh7IGlubmVyVmFsdWU6IHZhbHVlIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnVwZGF0ZUNvbHVtbnMoKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHBpY2tlci5zZXRWYWx1ZXModmFsdWVzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZWQoKSB7XHJcbiAgICAgICAgY29uc3QgaW5uZXJWYWx1ZSA9IHRoaXMuY29ycmVjdFZhbHVlKHRoaXMuZGF0YS52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb2x1bW5WYWx1ZShpbm5lclZhbHVlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCBpbm5lclZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==