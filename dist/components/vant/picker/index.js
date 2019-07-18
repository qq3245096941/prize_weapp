'use strict';

var _component = require('./../common/component.js');

var _shared = require('./shared.js');

(0, _component.VantComponent)({
    classes: ['active-class', 'toolbar-class', 'column-class'],
    props: Object.assign({}, _shared.pickerProps, { valueKey: {
            type: String,
            value: 'text'
        }, defaultIndex: {
            type: Number,
            value: 0
        }, columns: {
            type: Array,
            value: [],
            observer: function observer() {
                var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                this.simple = columns.length && !columns[0].values;
                this.children = this.selectAllComponents('.van-picker__column');
                if (Array.isArray(this.children) && this.children.length) {
                    this.setColumns().catch(function () {});
                }
            }
        } }),
    beforeCreate: function beforeCreate() {
        this.children = [];
    },

    methods: {
        noop: function noop() {},
        setColumns: function setColumns() {
            var _this = this;

            var data = this.data;

            var columns = this.simple ? [{ values: data.columns }] : data.columns;
            var stack = columns.map(function (column, index) {
                return _this.setColumnValues(index, column.values);
            });
            return Promise.all(stack);
        },
        emit: function emit(event) {
            var type = event.currentTarget.dataset.type;

            if (this.simple) {
                this.$emit(type, {
                    value: this.getColumnValue(0),
                    index: this.getColumnIndex(0)
                });
            } else {
                this.$emit(type, {
                    value: this.getValues(),
                    index: this.getIndexes()
                });
            }
        },
        onChange: function onChange(event) {
            if (this.simple) {
                this.$emit('change', {
                    picker: this,
                    value: this.getColumnValue(0),
                    index: this.getColumnIndex(0)
                });
            } else {
                this.$emit('change', {
                    picker: this,
                    value: this.getValues(),
                    index: event.currentTarget.dataset.index
                });
            }
        },

        // get column instance by index
        getColumn: function getColumn(index) {
            return this.children[index];
        },

        // get column value by index
        getColumnValue: function getColumnValue(index) {
            var column = this.getColumn(index);
            return column && column.getValue();
        },

        // set column value by index
        setColumnValue: function setColumnValue(index, value) {
            var column = this.getColumn(index);
            if (column == null) {
                return Promise.reject('setColumnValue: 对应列不存在');
            }
            return column.setValue(value);
        },

        // get column option index by column index
        getColumnIndex: function getColumnIndex(columnIndex) {
            return (this.getColumn(columnIndex) || {}).data.currentIndex;
        },

        // set column option index by column index
        setColumnIndex: function setColumnIndex(columnIndex, optionIndex) {
            var column = this.getColumn(columnIndex);
            if (column == null) {
                return Promise.reject('setColumnIndex: 对应列不存在');
            }
            return column.setIndex(optionIndex);
        },

        // get options of column by index
        getColumnValues: function getColumnValues(index) {
            return (this.children[index] || {}).data.options;
        },

        // set options of column by index
        setColumnValues: function setColumnValues(index, options) {
            var needReset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var column = this.children[index];
            if (column == null) {
                return Promise.reject('setColumnValues: 对应列不存在');
            }
            var isSame = JSON.stringify(column.data.options) === JSON.stringify(options);
            if (isSame) {
                return Promise.resolve();
            }
            return column.set({ options: options }).then(function () {
                if (needReset) {
                    column.setIndex(0);
                }
            });
        },

        // get values of all columns
        getValues: function getValues() {
            return this.children.map(function (child) {
                return child.getValue();
            });
        },

        // set values of all columns
        setValues: function setValues(values) {
            var _this2 = this;

            var stack = values.map(function (value, index) {
                return _this2.setColumnValue(index, value);
            });
            return Promise.all(stack);
        },

        // get indexes of all columns
        getIndexes: function getIndexes() {
            return this.children.map(function (child) {
                return child.data.currentIndex;
            });
        },

        // set indexes of all columns
        setIndexes: function setIndexes(indexes) {
            var _this3 = this;

            var stack = indexes.map(function (optionIndex, columnIndex) {
                return _this3.setColumnIndex(columnIndex, optionIndex);
            });
            return Promise.all(stack);
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNsYXNzZXMiLCJwcm9wcyIsIk9iamVjdCIsImFzc2lnbiIsInBpY2tlclByb3BzIiwidmFsdWVLZXkiLCJ0eXBlIiwiU3RyaW5nIiwidmFsdWUiLCJkZWZhdWx0SW5kZXgiLCJOdW1iZXIiLCJjb2x1bW5zIiwiQXJyYXkiLCJvYnNlcnZlciIsInNpbXBsZSIsImxlbmd0aCIsInZhbHVlcyIsImNoaWxkcmVuIiwic2VsZWN0QWxsQ29tcG9uZW50cyIsImlzQXJyYXkiLCJzZXRDb2x1bW5zIiwiY2F0Y2giLCJiZWZvcmVDcmVhdGUiLCJtZXRob2RzIiwibm9vcCIsImRhdGEiLCJzdGFjayIsIm1hcCIsImNvbHVtbiIsImluZGV4Iiwic2V0Q29sdW1uVmFsdWVzIiwiUHJvbWlzZSIsImFsbCIsImVtaXQiLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiJGVtaXQiLCJnZXRDb2x1bW5WYWx1ZSIsImdldENvbHVtbkluZGV4IiwiZ2V0VmFsdWVzIiwiZ2V0SW5kZXhlcyIsIm9uQ2hhbmdlIiwicGlja2VyIiwiZ2V0Q29sdW1uIiwiZ2V0VmFsdWUiLCJzZXRDb2x1bW5WYWx1ZSIsInJlamVjdCIsInNldFZhbHVlIiwiY29sdW1uSW5kZXgiLCJjdXJyZW50SW5kZXgiLCJzZXRDb2x1bW5JbmRleCIsIm9wdGlvbkluZGV4Iiwic2V0SW5kZXgiLCJnZXRDb2x1bW5WYWx1ZXMiLCJvcHRpb25zIiwibmVlZFJlc2V0IiwiaXNTYW1lIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc29sdmUiLCJzZXQiLCJ0aGVuIiwiY2hpbGQiLCJzZXRWYWx1ZXMiLCJzZXRJbmRleGVzIiwiaW5kZXhlcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQSw4QkFBYztBQUNWQSxhQUFTLENBQUMsY0FBRCxFQUFpQixlQUFqQixFQUFrQyxjQUFsQyxDQURDO0FBRVZDLFdBQU9DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCQyxt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dUJBQVdBLE1BQU10QyxJQUFOLENBQVd5QixZQUF0QjtBQUFBLGFBQWxCLENBQVA7QUFDSCxTQXBHSTs7QUFxR0w7QUFDQWUsa0JBdEdLLHNCQXNHTUMsT0F0R04sRUFzR2U7QUFBQTs7QUFDaEIsZ0JBQU14QyxRQUFRd0MsUUFBUXZDLEdBQVIsQ0FBWSxVQUFDeUIsV0FBRCxFQUFjSCxXQUFkO0FBQUEsdUJBQThCLE9BQUtFLGNBQUwsQ0FBb0JGLFdBQXBCLEVBQWlDRyxXQUFqQyxDQUE5QjtBQUFBLGFBQVosQ0FBZDtBQUNBLG1CQUFPckIsUUFBUUMsR0FBUixDQUFZTixLQUFaLENBQVA7QUFDSDtBQXpHSTtBQXRCQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBwaWNrZXJQcm9wcyB9IGZyb20gJy4vc2hhcmVkJztcclxuVmFudENvbXBvbmVudCh7XHJcbiAgICBjbGFzc2VzOiBbJ2FjdGl2ZS1jbGFzcycsICd0b29sYmFyLWNsYXNzJywgJ2NvbHVtbi1jbGFzcyddLFxyXG4gICAgcHJvcHM6IE9iamVjdC5hc3NpZ24oe30sIHBpY2tlclByb3BzLCB7IHZhbHVlS2V5OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdmFsdWU6ICd0ZXh0J1xyXG4gICAgICAgIH0sIGRlZmF1bHRJbmRleDoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwXHJcbiAgICAgICAgfSwgY29sdW1uczoge1xyXG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcclxuICAgICAgICAgICAgdmFsdWU6IFtdLFxyXG4gICAgICAgICAgICBvYnNlcnZlcihjb2x1bW5zID0gW10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2ltcGxlID0gY29sdW1ucy5sZW5ndGggJiYgIWNvbHVtbnNbMF0udmFsdWVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuc2VsZWN0QWxsQ29tcG9uZW50cygnLnZhbi1waWNrZXJfX2NvbHVtbicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jaGlsZHJlbikgJiYgdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbHVtbnMoKS5jYXRjaCgoKSA9PiB7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSB9KSxcclxuICAgIGJlZm9yZUNyZWF0ZSgpIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIG5vb3AoKSB7IH0sXHJcbiAgICAgICAgc2V0Q29sdW1ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5zaW1wbGUgPyBbeyB2YWx1ZXM6IGRhdGEuY29sdW1ucyB9XSA6IGRhdGEuY29sdW1ucztcclxuICAgICAgICAgICAgY29uc3Qgc3RhY2sgPSBjb2x1bW5zLm1hcCgoY29sdW1uLCBpbmRleCkgPT4gdGhpcy5zZXRDb2x1bW5WYWx1ZXMoaW5kZXgsIGNvbHVtbi52YWx1ZXMpKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHN0YWNrKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVtaXQoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgeyB0eXBlIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNpbXBsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCh0eXBlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZ2V0Q29sdW1uVmFsdWUoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuZ2V0Q29sdW1uSW5kZXgoMClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCh0eXBlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZ2V0VmFsdWVzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuZ2V0SW5kZXhlcygpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2ltcGxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGlja2VyOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdldENvbHVtblZhbHVlKDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmdldENvbHVtbkluZGV4KDApXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHtcclxuICAgICAgICAgICAgICAgICAgICBwaWNrZXI6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZ2V0VmFsdWVzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGdldCBjb2x1bW4gaW5zdGFuY2UgYnkgaW5kZXhcclxuICAgICAgICBnZXRDb2x1bW4oaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5baW5kZXhdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gZ2V0IGNvbHVtbiB2YWx1ZSBieSBpbmRleFxyXG4gICAgICAgIGdldENvbHVtblZhbHVlKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKGluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbiAmJiBjb2x1bW4uZ2V0VmFsdWUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIHNldCBjb2x1bW4gdmFsdWUgYnkgaW5kZXhcclxuICAgICAgICBzZXRDb2x1bW5WYWx1ZShpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5nZXRDb2x1bW4oaW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoY29sdW1uID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnc2V0Q29sdW1uVmFsdWU6IOWvueW6lOWIl+S4jeWtmOWcqCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW4uc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gZ2V0IGNvbHVtbiBvcHRpb24gaW5kZXggYnkgY29sdW1uIGluZGV4XHJcbiAgICAgICAgZ2V0Q29sdW1uSW5kZXgoY29sdW1uSW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmdldENvbHVtbihjb2x1bW5JbmRleCkgfHwge30pLmRhdGEuY3VycmVudEluZGV4O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gc2V0IGNvbHVtbiBvcHRpb24gaW5kZXggYnkgY29sdW1uIGluZGV4XHJcbiAgICAgICAgc2V0Q29sdW1uSW5kZXgoY29sdW1uSW5kZXgsIG9wdGlvbkluZGV4KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ2V0Q29sdW1uKGNvbHVtbkluZGV4KTtcclxuICAgICAgICAgICAgaWYgKGNvbHVtbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ3NldENvbHVtbkluZGV4OiDlr7nlupTliJfkuI3lrZjlnKgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1uLnNldEluZGV4KG9wdGlvbkluZGV4KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGdldCBvcHRpb25zIG9mIGNvbHVtbiBieSBpbmRleFxyXG4gICAgICAgIGdldENvbHVtblZhbHVlcyhpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuY2hpbGRyZW5baW5kZXhdIHx8IHt9KS5kYXRhLm9wdGlvbnM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBzZXQgb3B0aW9ucyBvZiBjb2x1bW4gYnkgaW5kZXhcclxuICAgICAgICBzZXRDb2x1bW5WYWx1ZXMoaW5kZXgsIG9wdGlvbnMsIG5lZWRSZXNldCA9IHRydWUpIHtcclxuICAgICAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5jaGlsZHJlbltpbmRleF07XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW4gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdzZXRDb2x1bW5WYWx1ZXM6IOWvueW6lOWIl+S4jeWtmOWcqCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGlzU2FtZSA9IEpTT04uc3RyaW5naWZ5KGNvbHVtbi5kYXRhLm9wdGlvbnMpID09PSBKU09OLnN0cmluZ2lmeShvcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKGlzU2FtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW4uc2V0KHsgb3B0aW9ucyB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChuZWVkUmVzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW4uc2V0SW5kZXgoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gZ2V0IHZhbHVlcyBvZiBhbGwgY29sdW1uc1xyXG4gICAgICAgIGdldFZhbHVlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQuZ2V0VmFsdWUoKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBzZXQgdmFsdWVzIG9mIGFsbCBjb2x1bW5zXHJcbiAgICAgICAgc2V0VmFsdWVzKHZhbHVlcykge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFjayA9IHZhbHVlcy5tYXAoKHZhbHVlLCBpbmRleCkgPT4gdGhpcy5zZXRDb2x1bW5WYWx1ZShpbmRleCwgdmFsdWUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHN0YWNrKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGdldCBpbmRleGVzIG9mIGFsbCBjb2x1bW5zXHJcbiAgICAgICAgZ2V0SW5kZXhlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQuZGF0YS5jdXJyZW50SW5kZXgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gc2V0IGluZGV4ZXMgb2YgYWxsIGNvbHVtbnNcclxuICAgICAgICBzZXRJbmRleGVzKGluZGV4ZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhY2sgPSBpbmRleGVzLm1hcCgob3B0aW9uSW5kZXgsIGNvbHVtbkluZGV4KSA9PiB0aGlzLnNldENvbHVtbkluZGV4KGNvbHVtbkluZGV4LCBvcHRpb25JbmRleCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoc3RhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==