'use strict';

var _component = require('./../common/component.js');

var _touch = require('./../mixins/touch.js');

(0, _component.VantComponent)({
    mixins: [_touch.touch],
    props: {
        disabled: Boolean,
        useButtonSlot: Boolean,
        activeColor: String,
        inactiveColor: String,
        max: {
            type: Number,
            value: 100
        },
        min: {
            type: Number,
            value: 0
        },
        step: {
            type: Number,
            value: 1
        },
        value: {
            type: Number,
            value: 0
        },
        barHeight: {
            type: String,
            value: '2px'
        }
    },
    watch: {
        value: function value(_value) {
            this.updateValue(_value, false);
        }
    },
    created: function created() {
        this.updateValue(this.data.value);
    },

    methods: {
        onTouchStart: function onTouchStart(event) {
            if (this.data.disabled) return;
            this.touchStart(event);
            this.startValue = this.format(this.data.value);
        },
        onTouchMove: function onTouchMove(event) {
            var _this = this;

            if (this.data.disabled) return;
            this.touchMove(event);
            this.getRect('.van-slider').then(function (rect) {
                var diff = _this.deltaX / rect.width * 100;
                _this.newValue = _this.startValue + diff;
                _this.updateValue(_this.newValue, false, true);
            });
        },
        onTouchEnd: function onTouchEnd() {
            if (this.data.disabled) return;
            this.updateValue(this.newValue, true);
        },
        onClick: function onClick(event) {
            var _this2 = this;

            if (this.data.disabled) return;
            this.getRect('.van-slider').then(function (rect) {
                var value = (event.detail.x - rect.left) / rect.width * 100;
                _this2.updateValue(value, true);
            });
        },
        updateValue: function updateValue(value, end, drag) {
            value = this.format(value);
            this.set({
                value: value,
                barStyle: 'width: ' + value + '%; height: ' + this.data.barHeight + ';'
            });
            if (drag) {
                this.$emit('drag', { value: value });
            }
            if (end) {
                this.$emit('change', value);
            }
        },
        format: function format(value) {
            var _data = this.data,
                max = _data.max,
                min = _data.min,
                step = _data.step;

            return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1peGlucyIsInRvdWNoIiwicHJvcHMiLCJkaXNhYmxlZCIsIkJvb2xlYW4iLCJ1c2VCdXR0b25TbG90IiwiYWN0aXZlQ29sb3IiLCJTdHJpbmciLCJpbmFjdGl2ZUNvbG9yIiwibWF4IiwidHlwZSIsIk51bWJlciIsInZhbHVlIiwibWluIiwic3RlcCIsImJhckhlaWdodCIsIndhdGNoIiwidXBkYXRlVmFsdWUiLCJjcmVhdGVkIiwiZGF0YSIsIm1ldGhvZHMiLCJvblRvdWNoU3RhcnQiLCJldmVudCIsInRvdWNoU3RhcnQiLCJzdGFydFZhbHVlIiwiZm9ybWF0Iiwib25Ub3VjaE1vdmUiLCJ0b3VjaE1vdmUiLCJnZXRSZWN0IiwidGhlbiIsInJlY3QiLCJkaWZmIiwiZGVsdGFYIiwid2lkdGgiLCJuZXdWYWx1ZSIsIm9uVG91Y2hFbmQiLCJvbkNsaWNrIiwiZGV0YWlsIiwieCIsImxlZnQiLCJlbmQiLCJkcmFnIiwic2V0IiwiYmFyU3R5bGUiLCIkZW1pdCIsIk1hdGgiLCJyb3VuZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQSw4QkFBYztBQUNWQSxZQUFRLENBQUNDLFlBQUQsQ0FERTtBQUVWQyxXQUFPO0FBQ0hDLGtCQUFVQyxPQURQO0FBRUhDLHVCQUFlRCxPQUZaO0FBR0hFLHFCQUFhQyxNQUhWO0FBSUhDLHVCQUFlRCxNQUpaO0FBS0hFLGFBQUs7QUFDREMsa0JBQU1DLE1BREw7QUFFREMsbUJBQU87QUFGTixTQUxGO0FBU0hDLGFBQUs7QUFDREgsa0JBQU1DLE1BREw7QUFFREMsbUJBQU87QUFGTixTQVRGO0FBYUhFLGNBQU07QUFDRkosa0JBQU1DLE1BREo7QUFFRkMsbUJBQU87QUFGTCxTQWJIO0FBaUJIQSxlQUFPO0FBQ0hGLGtCQUFNQyxNQURIO0FBRUhDLG1CQUFPO0FBRkosU0FqQko7QUFxQkhHLG1CQUFXO0FBQ1BMLGtCQUFNSCxNQURDO0FBRVBLLG1CQUFPO0FBRkE7QUFyQlIsS0FG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IjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IHRvdWNoIH0gZnJvbSAnLi4vbWl4aW5zL3RvdWNoJztcclxuVmFudENvbXBvbmVudCh7XHJcbiAgICBtaXhpbnM6IFt0b3VjaF0sXHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIGRpc2FibGVkOiBCb29sZWFuLFxyXG4gICAgICAgIHVzZUJ1dHRvblNsb3Q6IEJvb2xlYW4sXHJcbiAgICAgICAgYWN0aXZlQ29sb3I6IFN0cmluZyxcclxuICAgICAgICBpbmFjdGl2ZUNvbG9yOiBTdHJpbmcsXHJcbiAgICAgICAgbWF4OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgdmFsdWU6IDEwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWluOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgdmFsdWU6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0ZXA6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmFySGVpZ2h0OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdmFsdWU6ICcycHgnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgICAgdmFsdWUodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh2YWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjcmVhdGVkKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy5kYXRhLnZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuZGlzYWJsZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hTdGFydChldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRWYWx1ZSA9IHRoaXMuZm9ybWF0KHRoaXMuZGF0YS52YWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRvdWNoTW92ZShldmVudCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmRpc2FibGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoTW92ZShldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjdCgnLnZhbi1zbGlkZXInKS50aGVuKChyZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWZmID0gdGhpcy5kZWx0YVggLyByZWN0LndpZHRoICogMTAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXdWYWx1ZSA9IHRoaXMuc3RhcnRWYWx1ZSArIGRpZmY7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMubmV3VmFsdWUsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRvdWNoRW5kKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmRpc2FibGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMubmV3VmFsdWUsIHRydWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DbGljayhldmVudCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmRpc2FibGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmdldFJlY3QoJy52YW4tc2xpZGVyJykudGhlbigocmVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAoZXZlbnQuZGV0YWlsLnggLSByZWN0LmxlZnQpIC8gcmVjdC53aWR0aCAqIDEwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUodmFsdWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZVZhbHVlKHZhbHVlLCBlbmQsIGRyYWcpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmZvcm1hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgYmFyU3R5bGU6IGB3aWR0aDogJHt2YWx1ZX0lOyBoZWlnaHQ6ICR7dGhpcy5kYXRhLmJhckhlaWdodH07YFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGRyYWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2RyYWcnLCB7IHZhbHVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbmQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybWF0KHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbWF4LCBtaW4sIHN0ZXAgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5tYXgobWluLCBNYXRoLm1pbih2YWx1ZSwgbWF4KSkgLyBzdGVwKSAqIHN0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19