'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    field: true,
    classes: ['input-class', 'plus-class', 'minus-class'],
    props: {
        value: null,
        integer: Boolean,
        disabled: Boolean,
        inputWidth: String,
        asyncChange: Boolean,
        disableInput: Boolean,
        min: {
            type: null,
            value: 1
        },
        max: {
            type: null,
            value: Number.MAX_SAFE_INTEGER
        },
        step: {
            type: null,
            value: 1
        }
    },
    computed: {
        minusDisabled: function minusDisabled() {
            return this.data.disabled || this.data.value <= this.data.min;
        },
        plusDisabled: function plusDisabled() {
            return this.data.disabled || this.data.value >= this.data.max;
        }
    },
    watch: {
        value: function value(_value) {
            if (_value === '') {
                return;
            }
            var newValue = this.range(_value);
            if (typeof newValue === 'number' && +this.data.value !== newValue) {
                this.set({ value: newValue });
            }
        }
    },
    data: {
        focus: false
    },
    created: function created() {
        this.set({
            value: this.range(this.data.value)
        });
    },

    methods: {
        onFocus: function onFocus(event) {
            this.$emit('focus', event.detail);
        },
        onBlur: function onBlur(event) {
            var value = this.range(this.data.value);
            this.triggerInput(value);
            this.$emit('blur', event.detail);
        },

        // limit value range
        range: function range(value) {
            value = String(value).replace(/[^0-9.-]/g, '');
            return Math.max(Math.min(this.data.max, value), this.data.min);
        },
        onInput: function onInput(event) {
            var _ref = event.detail || {},
                _ref$value = _ref.value,
                value = _ref$value === undefined ? '' : _ref$value;

            this.triggerInput(value);
        },
        onChange: function onChange(type) {
            if (this.data[type + 'Disabled']) {
                this.$emit('overlimit', type);
                return;
            }
            var diff = type === 'minus' ? -this.data.step : +this.data.step;
            var value = Math.round((this.data.value + diff) * 100) / 100;
            this.triggerInput(this.range(value));
            this.$emit(type);
        },
        onMinus: function onMinus() {
            this.onChange('minus');
        },
        onPlus: function onPlus() {
            this.onChange('plus');
        },
        triggerInput: function triggerInput(value) {
            this.set({
                value: this.data.asyncChange ? this.data.value : value
            });
            this.$emit('change', value);
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpZWxkIiwiY2xhc3NlcyIsInByb3BzIiwidmFsdWUiLCJpbnRlZ2VyIiwiQm9vbGVhbiIsImRpc2FibGVkIiwiaW5wdXRXaWR0aCIsIlN0cmluZyIsImFzeW5jQ2hhbmdlIiwiZGlzYWJsZUlucHV0IiwibWluIiwidHlwZSIsIm1heCIsIk51bWJlciIsIk1BWF9TQUZFX0lOVEVHRVIiLCJzdGVwIiwiY29tcHV0ZWQiLCJtaW51c0Rpc2FibGVkIiwiZGF0YSIsInBsdXNEaXNhYmxlZCIsIndhdGNoIiwibmV3VmFsdWUiLCJyYW5nZSIsInNldCIsImZvY3VzIiwiY3JlYXRlZCIsIm1ldGhvZHMiLCJvbkZvY3VzIiwiZXZlbnQiLCIkZW1pdCIsImRldGFpbCIsIm9uQmx1ciIsInRyaWdnZXJJbnB1dCIsInJlcGxhY2UiLCJNYXRoIiwib25JbnB1dCIsIm9uQ2hhbmdlIiwiZGlmZiIsInJvdW5kIiwib25NaW51cyIsIm9uUGx1cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQSw4QkFBYztBQUNWQSxXQUFPLElBREc7QUFFVkMsYUFBUyxDQUNMLGFBREssRUFFTCxZQUZLLEVBR0wsYUFISyxDQUZDO0FBT1ZDLFdBQU87QUFDSEMsZUFBTyxJQURKO0FBRUhDLGlCQUFTQyxPQUZOO0FBR0hDLGtCQUFVRCxPQUhQO0FBSUhFLG9CQUFZQyxNQUpUO0FBS0hDLHFCQUFhSixPQUxWO0FBTUhLLHNCQUFjTCxPQU5YO0FBT0hNLGFBQUs7QUFDREMsa0JBQU0sSUFETDtBQUVEVCxtQkFBTztBQUZOLFNBUEY7QUFXSFUsYUFBSztBQUNERCxrQkFBTSxJQURMO0FBRURULG1CQUFPVyxPQUFPQztBQUZiLFNBWEY7QUFlSEMsY0FBTTtBQUNGSixrQkFBTSxJQURKO0FBRUZULG1CQUFPO0FBRkw7QUFmSCxLQVBHO0FBMkJWYyxjQUFVO0FBQ05DLHFCQURNLDJCQUNVO0FBQ1osbUJBQU8sS0FBS0MsSUFBTCxDQUFVYixRQUFWLElBQXNCLEtB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QUtKLFFBQUwsQ0FBYyxNQUFkO0FBQ0gsU0FqQ0k7QUFrQ0xKLG9CQWxDSyx3QkFrQ1E5QixLQWxDUixFQWtDZTtBQUNoQixpQkFBS3FCLEdBQUwsQ0FBUztBQUNMckIsdUJBQU8sS0FBS2dCLElBQUwsQ0FBVVYsV0FBVixHQUF3QixLQUFLVSxJQUFMLENBQVVoQixLQUFsQyxHQUEwQ0E7QUFENUMsYUFBVDtBQUdBLGlCQUFLMkIsS0FBTCxDQUFXLFFBQVgsRUFBcUIzQixLQUFyQjtBQUNIO0FBdkNJO0FBdERDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgZmllbGQ6IHRydWUsXHJcbiAgICBjbGFzc2VzOiBbXHJcbiAgICAgICAgJ2lucHV0LWNsYXNzJyxcclxuICAgICAgICAncGx1cy1jbGFzcycsXHJcbiAgICAgICAgJ21pbnVzLWNsYXNzJ1xyXG4gICAgXSxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgdmFsdWU6IG51bGwsXHJcbiAgICAgICAgaW50ZWdlcjogQm9vbGVhbixcclxuICAgICAgICBkaXNhYmxlZDogQm9vbGVhbixcclxuICAgICAgICBpbnB1dFdpZHRoOiBTdHJpbmcsXHJcbiAgICAgICAgYXN5bmNDaGFuZ2U6IEJvb2xlYW4sXHJcbiAgICAgICAgZGlzYWJsZUlucHV0OiBCb29sZWFuLFxyXG4gICAgICAgIG1pbjoge1xyXG4gICAgICAgICAgICB0eXBlOiBudWxsLFxyXG4gICAgICAgICAgICB2YWx1ZTogMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWF4OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IG51bGwsXHJcbiAgICAgICAgICAgIHZhbHVlOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RlcDoge1xyXG4gICAgICAgICAgICB0eXBlOiBudWxsLFxyXG4gICAgICAgICAgICB2YWx1ZTogMVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICAgIG1pbnVzRGlzYWJsZWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuZGlzYWJsZWQgfHwgdGhpcy5kYXRhLnZhbHVlIDw9IHRoaXMuZGF0YS5taW47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbHVzRGlzYWJsZWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuZGlzYWJsZWQgfHwgdGhpcy5kYXRhLnZhbHVlID49IHRoaXMuZGF0YS5tYXg7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgICAgdmFsdWUodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5yYW5nZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09ICdudW1iZXInICYmICt0aGlzLmRhdGEudmFsdWUgIT09IG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCh7IHZhbHVlOiBuZXdWYWx1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgZm9jdXM6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZCgpIHtcclxuICAgICAgICB0aGlzLnNldCh7XHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnJhbmdlKHRoaXMuZGF0YS52YWx1ZSlcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25Gb2N1cyhldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdmb2N1cycsIGV2ZW50LmRldGFpbCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkJsdXIoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnJhbmdlKHRoaXMuZGF0YS52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcklucHV0KHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnYmx1cicsIGV2ZW50LmRldGFpbCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBsaW1pdCB2YWx1ZSByYW5nZVxyXG4gICAgICAgIHJhbmdlKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKS5yZXBsYWNlKC9bXjAtOS4tXS9nLCAnJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih0aGlzLmRhdGEubWF4LCB2YWx1ZSksIHRoaXMuZGF0YS5taW4pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25JbnB1dChldmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IHZhbHVlID0gJycgfSA9IGV2ZW50LmRldGFpbCB8fCB7fTtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VySW5wdXQodmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DaGFuZ2UodHlwZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhW2Ake3R5cGV9RGlzYWJsZWRgXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnb3ZlcmxpbWl0JywgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZGlmZiA9IHR5cGUgPT09ICdtaW51cycgPyAtdGhpcy5kYXRhLnN0ZXAgOiArdGhpcy5kYXRhLnN0ZXA7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gTWF0aC5yb3VuZCgodGhpcy5kYXRhLnZhbHVlICsgZGlmZikgKiAxMDApIC8gMTAwO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJJbnB1dCh0aGlzLnJhbmdlKHZhbHVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQodHlwZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbk1pbnVzKCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKCdtaW51cycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25QbHVzKCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKCdwbHVzJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmlnZ2VySW5wdXQodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoe1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuZGF0YS5hc3luY0NoYW5nZSA/IHRoaXMuZGF0YS52YWx1ZSA6IHZhbHVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19