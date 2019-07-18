'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _component = require('./../common/component.js');

var _shared = require('./../picker/shared.js');

(0, _component.VantComponent)({
    classes: ['active-class', 'toolbar-class', 'column-class'],
    props: Object.assign({}, _shared.pickerProps, { value: String, areaList: {
            type: Object,
            value: {}
        }, columnsNum: {
            type: [String, Number],
            value: 3
        } }),
    data: {
        columns: [{ values: [] }, { values: [] }, { values: [] }],
        displayColumns: [{ values: [] }, { values: [] }, { values: [] }]
    },
    watch: {
        value: function value(_value) {
            this.code = _value;
            this.setValues();
        },

        areaList: 'setValues',
        columnsNum: function columnsNum(value) {
            this.set({
                displayColumns: this.data.columns.slice(0, +value)
            });
        }
    },
    mounted: function mounted() {
        this.setValues();
    },

    methods: {
        getPicker: function getPicker() {
            if (this.picker == null) {
                this.picker = this.selectComponent('.van-area__picker');
            }
            return this.picker;
        },
        onCancel: function onCancel(event) {
            this.emit('cancel', event.detail);
        },
        onConfirm: function onConfirm(event) {
            this.emit('confirm', event.detail);
        },
        emit: function emit(type, detail) {
            detail.values = detail.value;
            delete detail.value;
            this.$emit(type, detail);
        },
        onChange: function onChange(event) {
            var _this = this;

            var _event$detail = event.detail,
                index = _event$detail.index,
                picker = _event$detail.picker,
                value = _event$detail.value;

            this.code = value[index].code;
            this.setValues().then(function () {
                _this.$emit('change', {
                    picker: picker,
                    values: picker.getValues(),
                    index: index
                });
            });
        },
        getConfig: function getConfig(type) {
            var areaList = this.data.areaList;

            return areaList && areaList[type + '_list'] || {};
        },
        getList: function getList(type, code) {
            var result = [];
            if (type !== 'province' && !code) {
                return result;
            }
            var list = this.getConfig(type);
            result = Object.keys(list).map(function (code) {
                return {
                    code: code,
                    name: list[code]
                };
            });
            if (code) {
                // oversea code
                if (code[0] === '9' && type === 'city') {
                    code = '9';
                }
                result = result.filter(function (item) {
                    return item.code.indexOf(code) === 0;
                });
            }
            return result;
        },
        getIndex: function getIndex(type, code) {
            var compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
            var list = this.getList(type, code.slice(0, compareNum - 2));
            // oversea code
            if (code[0] === '9' && type === 'province') {
                compareNum = 1;
            }
            code = code.slice(0, compareNum);
            for (var i = 0; i < list.length; i++) {
                if (list[i].code.slice(0, compareNum) === code) {
                    return i;
                }
            }
            return 0;
        },
        setValues: function setValues() {
            var _this2 = this;

            var county = this.getConfig('county');
            var code = this.code || Object.keys(county)[0] || '';
            var province = this.getList('province');
            var city = this.getList('city', code.slice(0, 2));
            var picker = this.getPicker();
            if (!picker) {
                return;
            }
            var stack = [];
            stack.push(picker.setColumnValues(0, province, false));
            stack.push(picker.setColumnValues(1, city, false));
            if (city.length && code.slice(2, 4) === '00') {
                var _city = _slicedToArray(city, 1);

                code = _city[0].code;
            }
            stack.push(picker.setColumnValues(2, this.getList('county', code.slice(0, 4)), false));
            return Promise.all(stack).catch(function () {}).then(function () {
                return picker.setIndexes([_this2.getIndex('province', code), _this2.getIndex('city', code), _this2.getIndex('county', code)]);
            }).catch(function () {});
        },
        getValues: function getValues() {
            var picker = this.getPicker();
            return picker ? picker.getValues().filter(function (value) {
                return !!value;
            }) : [];
        },
        getDetail: function getDetail() {
            var values = this.getValues();
            var area = {
                code: '',
                country: '',
                province: '',
                city: '',
                county: ''
            };
            if (!values.length) {
                return area;
            }
            var names = values.map(function (item) {
                return item.name;
            });
            area.code = values[values.length - 1].code;
            if (area.code[0] === '9') {
                area.country = names[1] || '';
                area.province = names[2] || '';
            } else {
                area.province = names[0] || '';
                area.city = names[1] || '';
                area.county = names[2] || '';
            }
            return area;
        },
        reset: function reset() {
            this.code = '';
            return this.setValues();
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNsYXNzZXMiLCJwcm9wcyIsIk9iamVjdCIsImFzc2lnbiIsInBpY2tlclByb3BzIiwidmFsdWUiLCJTdHJpbmciLCJhcmVhTGlzdCIsInR5cGUiLCJjb2x1bW5zTnVtIiwiTnVtYmVyIiwiZGF0YSIsImNvbHVtbnMiLCJ2YWx1ZXMiLCJkaXNwbGF5Q29sdW1ucyIsIndhdGNoIiwiY29kZSIsInNldFZhbHVlcyIsInNldCIsInNsaWNlIiwibW91bnRlZCIsIm1ldGhvZHMiLCJnZXRQaWNrZXIiLCJwaWNrZXIiLCJzZWxlY3RDb21wb25lbnQiLCJvbkNhbmNlbCIsImV2ZW50IiwiZW1pdCIsImRldGFpbCIsIm9uQ29uZmlybSIsIiRlbWl0Iiwib25DaGFuZ2UiLCJpbmRleCIsInRoZW4iLCJnZXRWYWx1ZXMiLCJnZXRDb25maWciLCJnZXRMaXN0IiwicmVzdWx0IiwibGlzdCIsImtleXMiLCJtYXAiLCJuYW1lIiwiZmlsdGVyIiwiaXRlbSIsImluZGV4T2YiLCJnZXRJbmRleCIsImNvbXBhcmVOdW0iLCJpIiwibGVuZ3RoIiwiY291bnR5IiwicHJvdmluY2UiLCJjaXR5Iiwic3RhY2siLCJwdXNoIiwic2V0Q29sdW1uVmFsdWVzIiwiUHJvbWlzZSIsImFsbCIsImNhdGNoIiwic2V0SW5kZXhlcyIsImdldERldGFpbCIsImFyZWEiLCJjb3VudHJ5IiwibmFtZXMiLCJyZXNldCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUNBOztBQUNBLDhCQUFjO0FBQ1ZBLGFBQVMsQ0FBQyxjQUFELEVBQWlCLGVBQWpCLEVBQWtDLGNBQWxDLENBREM7QUFFVkMsV0FBT0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JDLG1CQUFsQixFQUErQixFQUFFQyxPQUFPQyxNQUFULEVBQWlCQyxVQUFVO0FBQ3pEQyxrQkFBTU4sTUFEbUQ7QUFFekRHLG1CQUFPO0FBRmtELFNBQTNCLEVBRy9CSSxZQUFZO0FBQ1hELGtCQUFNLENBQUNGLE1B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QUwsR0FBZUMsTUFBTSxDQUFOLEtBQVksRUFBM0I7QUFDQUYscUJBQUtWLFFBQUwsR0FBZ0JZLE1BQU0sQ0FBTixLQUFZLEVBQTVCO0FBQ0gsYUFIRCxNQUlLO0FBQ0RGLHFCQUFLVixRQUFMLEdBQWdCWSxNQUFNLENBQU4sS0FBWSxFQUE1QjtBQUNBRixxQkFBS1QsSUFBTCxHQUFZVyxNQUFNLENBQU4sS0FBWSxFQUF4QjtBQUNBRixxQkFBS1gsTUFBTCxHQUFjYSxNQUFNLENBQU4sS0FBWSxFQUExQjtBQUNIO0FBQ0QsbUJBQU9GLElBQVA7QUFDSCxTQXhISTtBQXlITEcsYUF6SEssbUJBeUhHO0FBQ0osaUJBQUsvQyxJQUFMLEdBQVksRUFBWjtBQUNBLG1CQUFPLEtBQUtDLFNBQUwsRUFBUDtBQUNIO0FBNUhJO0FBNUJDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IHBpY2tlclByb3BzIH0gZnJvbSAnLi4vcGlja2VyL3NoYXJlZCc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgY2xhc3NlczogWydhY3RpdmUtY2xhc3MnLCAndG9vbGJhci1jbGFzcycsICdjb2x1bW4tY2xhc3MnXSxcclxuICAgIHByb3BzOiBPYmplY3QuYXNzaWduKHt9LCBwaWNrZXJQcm9wcywgeyB2YWx1ZTogU3RyaW5nLCBhcmVhTGlzdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIHZhbHVlOiB7fVxyXG4gICAgICAgIH0sIGNvbHVtbnNOdW06IHtcclxuICAgICAgICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcclxuICAgICAgICAgICAgdmFsdWU6IDNcclxuICAgICAgICB9IH0pLFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGNvbHVtbnM6IFt7IHZhbHVlczogW10gfSwgeyB2YWx1ZXM6IFtdIH0sIHsgdmFsdWVzOiBbXSB9XSxcclxuICAgICAgICBkaXNwbGF5Q29sdW1uczogW3sgdmFsdWVzOiBbXSB9LCB7IHZhbHVlczogW10gfSwgeyB2YWx1ZXM6IFtdIH1dXHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHtcclxuICAgICAgICB2YWx1ZSh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvZGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZXMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFyZWFMaXN0OiAnc2V0VmFsdWVzJyxcclxuICAgICAgICBjb2x1bW5zTnVtKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlDb2x1bW5zOiB0aGlzLmRhdGEuY29sdW1ucy5zbGljZSgwLCArdmFsdWUpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3VudGVkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0VmFsdWVzKCk7XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGdldFBpY2tlcigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGlja2VyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyID0gdGhpcy5zZWxlY3RDb21wb25lbnQoJy52YW4tYXJlYV9fcGlja2VyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DYW5jZWwoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdjYW5jZWwnLCBldmVudC5kZXRhaWwpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Db25maXJtKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY29uZmlybScsIGV2ZW50LmRldGFpbCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbWl0KHR5cGUsIGRldGFpbCkge1xyXG4gICAgICAgICAgICBkZXRhaWwudmFsdWVzID0gZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICBkZWxldGUgZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KHR5cGUsIGRldGFpbCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGluZGV4LCBwaWNrZXIsIHZhbHVlIH0gPSBldmVudC5kZXRhaWw7XHJcbiAgICAgICAgICAgIHRoaXMuY29kZSA9IHZhbHVlW2luZGV4XS5jb2RlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlcygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpY2tlcixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHBpY2tlci5nZXRWYWx1ZXMoKSxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Q29uZmlnKHR5cGUpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBhcmVhTGlzdCB9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICByZXR1cm4gKGFyZWFMaXN0ICYmIGFyZWFMaXN0W2Ake3R5cGV9X2xpc3RgXSkgfHwge307XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRMaXN0KHR5cGUsIGNvZGUpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICBpZiAodHlwZSAhPT0gJ3Byb3ZpbmNlJyAmJiAhY29kZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5nZXRDb25maWcodHlwZSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IE9iamVjdC5rZXlzKGxpc3QpLm1hcChjb2RlID0+ICh7XHJcbiAgICAgICAgICAgICAgICBjb2RlLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogbGlzdFtjb2RlXVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGlmIChjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvdmVyc2VhIGNvZGVcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlWzBdID09PSAnOScgJiYgdHlwZSA9PT0gJ2NpdHknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29kZSA9ICc5JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoaXRlbSA9PiBpdGVtLmNvZGUuaW5kZXhPZihjb2RlKSA9PT0gMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEluZGV4KHR5cGUsIGNvZGUpIHtcclxuICAgICAgICAgICAgbGV0IGNvbXBhcmVOdW0gPSB0eXBlID09PSAncHJvdmluY2UnID8gMiA6IHR5cGUgPT09ICdjaXR5JyA/IDQgOiA2O1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5nZXRMaXN0KHR5cGUsIGNvZGUuc2xpY2UoMCwgY29tcGFyZU51bSAtIDIpKTtcclxuICAgICAgICAgICAgLy8gb3ZlcnNlYSBjb2RlXHJcbiAgICAgICAgICAgIGlmIChjb2RlWzBdID09PSAnOScgJiYgdHlwZSA9PT0gJ3Byb3ZpbmNlJykge1xyXG4gICAgICAgICAgICAgICAgY29tcGFyZU51bSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29kZSA9IGNvZGUuc2xpY2UoMCwgY29tcGFyZU51bSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0uY29kZS5zbGljZSgwLCBjb21wYXJlTnVtKSA9PT0gY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0VmFsdWVzKCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb3VudHkgPSB0aGlzLmdldENvbmZpZygnY291bnR5Jyk7XHJcbiAgICAgICAgICAgIGxldCBjb2RlID0gdGhpcy5jb2RlIHx8IE9iamVjdC5rZXlzKGNvdW50eSlbMF0gfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpbmNlID0gdGhpcy5nZXRMaXN0KCdwcm92aW5jZScpO1xyXG4gICAgICAgICAgICBjb25zdCBjaXR5ID0gdGhpcy5nZXRMaXN0KCdjaXR5JywgY29kZS5zbGljZSgwLCAyKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XHJcbiAgICAgICAgICAgIGlmICghcGlja2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc3RhY2sgPSBbXTtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChwaWNrZXIuc2V0Q29sdW1uVmFsdWVzKDAsIHByb3ZpbmNlLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICBzdGFjay5wdXNoKHBpY2tlci5zZXRDb2x1bW5WYWx1ZXMoMSwgY2l0eSwgZmFsc2UpKTtcclxuICAgICAgICAgICAgaWYgKGNpdHkubGVuZ3RoICYmIGNvZGUuc2xpY2UoMiwgNCkgPT09ICcwMCcpIHtcclxuICAgICAgICAgICAgICAgIFt7IGNvZGUgfV0gPSBjaXR5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0YWNrLnB1c2gocGlja2VyLnNldENvbHVtblZhbHVlcygyLCB0aGlzLmdldExpc3QoJ2NvdW50eScsIGNvZGUuc2xpY2UoMCwgNCkpLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoc3RhY2spXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4geyB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gcGlja2VyLnNldEluZGV4ZXMoW1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJbmRleCgncHJvdmluY2UnLCBjb2RlKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SW5kZXgoJ2NpdHknLCBjb2RlKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SW5kZXgoJ2NvdW50eScsIGNvZGUpXHJcbiAgICAgICAgICAgIF0pKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRWYWx1ZXMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBpY2tlciA9IHRoaXMuZ2V0UGlja2VyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwaWNrZXIgPyBwaWNrZXIuZ2V0VmFsdWVzKCkuZmlsdGVyKHZhbHVlID0+ICEhdmFsdWUpIDogW107XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXREZXRhaWwoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuZ2V0VmFsdWVzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFyZWEgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiAnJyxcclxuICAgICAgICAgICAgICAgIGNvdW50cnk6ICcnLFxyXG4gICAgICAgICAgICAgICAgcHJvdmluY2U6ICcnLFxyXG4gICAgICAgICAgICAgICAgY2l0eTogJycsXHJcbiAgICAgICAgICAgICAgICBjb3VudHk6ICcnXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICghdmFsdWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZWE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbmFtZXMgPSB2YWx1ZXMubWFwKChpdGVtKSA9PiBpdGVtLm5hbWUpO1xyXG4gICAgICAgICAgICBhcmVhLmNvZGUgPSB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdLmNvZGU7XHJcbiAgICAgICAgICAgIGlmIChhcmVhLmNvZGVbMF0gPT09ICc5Jykge1xyXG4gICAgICAgICAgICAgICAgYXJlYS5jb3VudHJ5ID0gbmFtZXNbMV0gfHwgJyc7XHJcbiAgICAgICAgICAgICAgICBhcmVhLnByb3ZpbmNlID0gbmFtZXNbMl0gfHwgJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcmVhLnByb3ZpbmNlID0gbmFtZXNbMF0gfHwgJyc7XHJcbiAgICAgICAgICAgICAgICBhcmVhLmNpdHkgPSBuYW1lc1sxXSB8fCAnJztcclxuICAgICAgICAgICAgICAgIGFyZWEuY291bnR5ID0gbmFtZXNbMl0gfHwgJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFyZWE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNldCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2RlID0gJyc7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFZhbHVlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==