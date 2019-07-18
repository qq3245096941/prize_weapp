'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    field: true,
    classes: ['input-class', 'right-icon-class'],
    props: {
        size: String,
        icon: String,
        label: String,
        error: Boolean,
        fixed: Boolean,
        focus: Boolean,
        center: Boolean,
        isLink: Boolean,
        leftIcon: String,
        rightIcon: String,
        disabled: Boolean,
        autosize: Boolean,
        readonly: Boolean,
        required: Boolean,
        password: Boolean,
        iconClass: String,
        clearable: Boolean,
        inputAlign: String,
        customClass: String,
        customStyle: String,
        confirmType: String,
        confirmHold: Boolean,
        errorMessage: String,
        placeholder: String,
        placeholderStyle: String,
        errorMessageAlign: String,
        showConfirmBar: {
            type: Boolean,
            value: true
        },
        adjustPosition: {
            type: Boolean,
            value: true
        },
        cursorSpacing: {
            type: Number,
            value: 50
        },
        maxlength: {
            type: Number,
            value: -1
        },
        type: {
            type: String,
            value: 'text'
        },
        border: {
            type: Boolean,
            value: true
        },
        titleWidth: {
            type: String,
            value: '90px'
        }
    },
    data: {
        showClear: false
    },
    beforeCreate: function beforeCreate() {
        this.focused = false;
    },

    methods: {
        onInput: function onInput(event) {
            var _this = this;

            var _ref = event.detail || {},
                _ref$value = _ref.value,
                value = _ref$value === undefined ? '' : _ref$value;

            this.set({
                value: value,
                showClear: this.getShowClear(value)
            }, function () {
                _this.emitChange(value);
            });
        },
        onFocus: function onFocus(event) {
            var _ref2 = event.detail || {},
                _ref2$value = _ref2.value,
                value = _ref2$value === undefined ? '' : _ref2$value,
                _ref2$height = _ref2.height,
                height = _ref2$height === undefined ? 0 : _ref2$height;

            this.$emit('focus', { value: value, height: height });
            this.focused = true;
            this.blurFromClear = false;
            this.set({
                showClear: this.getShowClear()
            });
        },
        onBlur: function onBlur(event) {
            var _this2 = this;

            var _ref3 = event.detail || {},
                _ref3$value = _ref3.value,
                value = _ref3$value === undefined ? '' : _ref3$value,
                _ref3$cursor = _ref3.cursor,
                cursor = _ref3$cursor === undefined ? 0 : _ref3$cursor;

            this.$emit('blur', { value: value, cursor: cursor });
            this.focused = false;
            var showClear = this.getShowClear();
            if (this.data.value === value) {
                this.set({
                    showClear: showClear
                });
            } else if (!this.blurFromClear) {
                // fix: the handwritten keyboard does not trigger input change
                this.set({
                    value: value,
                    showClear: showClear
                }, function () {
                    _this2.emitChange(value);
                });
            }
        },
        onClickIcon: function onClickIcon() {
            this.$emit('click-icon');
        },
        getShowClear: function getShowClear(value) {
            value = value === undefined ? this.data.value : value;
            return this.data.clearable && this.focused && value && !this.data.readonly;
        },
        onClear: function onClear() {
            var _this3 = this;

            this.blurFromClear = true;
            this.set({
                value: '',
                showClear: this.getShowClear('')
            }, function () {
                _this3.emitChange('');
                _this3.$emit('clear', '');
            });
        },
        onConfirm: function onConfirm() {
            this.$emit('confirm', this.data.value);
        },
        emitChange: function emitChange(value) {
            this.$emit('input', value);
            this.$emit('change', value);
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpZWxkIiwiY2xhc3NlcyIsInByb3BzIiwic2l6ZSIsIlN0cmluZyIsImljb24iLCJsYWJlbCIsImVycm9yIiwiQm9vbGVhbiIsImZpeGVkIiwiZm9jdXMiLCJjZW50ZXIiLCJpc0xpbmsiLCJsZWZ0SWNvbiIsInJpZ2h0SWNvbiIsImRpc2FibGVkIiwiYXV0b3NpemUiLCJyZWFkb25seSIsInJlcXVpcmVkIiwicGFzc3dvcmQiLCJpY29uQ2xhc3MiLCJjbGVhcmFibGUiLCJpbnB1dEFsaWduIiwiY3VzdG9tQ2xhc3MiLCJjdXN0b21TdHlsZSIsImNvbmZpcm1UeXBlIiwiY29uZmlybUhvbGQiLCJlcnJvck1lc3NhZ2UiLCJwbGFjZWhvbGRlciIsInBsYWNlaG9sZGVyU3R5bGUiLCJlcnJvck1lc3NhZ2VBbGlnbiIsInNob3dDb25maXJtQmFyIiwidHlwZSIsInZhbHVlIiwiYWRqdXN0UG9zaXRpb24iLCJjdXJzb3JTcGFjaW5nIiwiTnVtYmVyIiwibWF4bGVuZ3RoIiwiYm9yZGVyIiwidGl0bGVXaWR0aCIsImRhdGEiLCJzaG93Q2xlYXIiLCJiZWZvcmVDcmVhdGUiLCJmb2N1c2VkIiwibWV0aG9kcyIsIm9uSW5wdXQiLCJldmVudCIsImRldGFpbCIsInNldCIsImdldFNob3dDbGVhciIsImVtaXRDaGFuZ2UiLCJvbkZvY3VzIiwiaGVpZ2h0IiwiJGVtaXQiLCJibHVyRnJvbUNsZWFyIiwib25CbHVyIiwiY3Vyc29yIiwib25DbGlja0ljb24iLCJ1bmRlZmluZWQiLCJvbkNsZWFyIiwib25Db25maXJtIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLDhCQUFjO0FBQ1ZBLFdBQU8sSUFERztBQUVWQyxhQUFTLENBQUMsYUFBRCxFQUFnQixrQkFBaEIsQ0FGQztBQUdWQyxXQUFPO0FBQ0hDLGNBQU1DLE1BREg7QUFFSEMsY0FBTUQsTUFGSDtBQUdIRSxlQUFPRixNQUhKO0FBSUhHLGVBQU9DLE9BSko7QUFLSEMsZUFB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a0JBM0RLLHNCQTJETWpCLEtBM0ROLEVBMkRhO0FBQ2QsaUJBQUtvQixLQUFMLENBQVcsT0FBWCxFQUFvQnBCLEtBQXBCO0FBQ0EsaUJBQUtvQixLQUFMLENBQVcsUUFBWCxFQUFxQnBCLEtBQXJCO0FBQ0g7QUE5REk7QUFqRUMsQ0FBZCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vY29tcG9uZW50JztcclxuVmFudENvbXBvbmVudCh7XHJcbiAgICBmaWVsZDogdHJ1ZSxcclxuICAgIGNsYXNzZXM6IFsnaW5wdXQtY2xhc3MnLCAncmlnaHQtaWNvbi1jbGFzcyddLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICBzaXplOiBTdHJpbmcsXHJcbiAgICAgICAgaWNvbjogU3RyaW5nLFxyXG4gICAgICAgIGxhYmVsOiBTdHJpbmcsXHJcbiAgICAgICAgZXJyb3I6IEJvb2xlYW4sXHJcbiAgICAgICAgZml4ZWQ6IEJvb2xlYW4sXHJcbiAgICAgICAgZm9jdXM6IEJvb2xlYW4sXHJcbiAgICAgICAgY2VudGVyOiBCb29sZWFuLFxyXG4gICAgICAgIGlzTGluazogQm9vbGVhbixcclxuICAgICAgICBsZWZ0SWNvbjogU3RyaW5nLFxyXG4gICAgICAgIHJpZ2h0SWNvbjogU3RyaW5nLFxyXG4gICAgICAgIGRpc2FibGVkOiBCb29sZWFuLFxyXG4gICAgICAgIGF1dG9zaXplOiBCb29sZWFuLFxyXG4gICAgICAgIHJlYWRvbmx5OiBCb29sZWFuLFxyXG4gICAgICAgIHJlcXVpcmVkOiBCb29sZWFuLFxyXG4gICAgICAgIHBhc3N3b3JkOiBCb29sZWFuLFxyXG4gICAgICAgIGljb25DbGFzczogU3RyaW5nLFxyXG4gICAgICAgIGNsZWFyYWJsZTogQm9vbGVhbixcclxuICAgICAgICBpbnB1dEFsaWduOiBTdHJpbmcsXHJcbiAgICAgICAgY3VzdG9tQ2xhc3M6IFN0cmluZyxcclxuICAgICAgICBjdXN0b21TdHlsZTogU3RyaW5nLFxyXG4gICAgICAgIGNvbmZpcm1UeXBlOiBTdHJpbmcsXHJcbiAgICAgICAgY29uZmlybUhvbGQ6IEJvb2xlYW4sXHJcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBTdHJpbmcsXHJcbiAgICAgICAgcGxhY2Vob2xkZXI6IFN0cmluZyxcclxuICAgICAgICBwbGFjZWhvbGRlclN0eWxlOiBTdHJpbmcsXHJcbiAgICAgICAgZXJyb3JNZXNzYWdlQWxpZ246IFN0cmluZyxcclxuICAgICAgICBzaG93Q29uZmlybUJhcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRqdXN0UG9zaXRpb246IHtcclxuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgdmFsdWU6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGN1cnNvclNwYWNpbmc6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogNTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1heGxlbmd0aDoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiAtMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiAndGV4dCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvcmRlcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGl0bGVXaWR0aDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiAnOTBweCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIHNob3dDbGVhcjogZmFsc2VcclxuICAgIH0sXHJcbiAgICBiZWZvcmVDcmVhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uSW5wdXQoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgeyB2YWx1ZSA9ICcnIH0gPSBldmVudC5kZXRhaWwgfHwge307XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NsZWFyOiB0aGlzLmdldFNob3dDbGVhcih2YWx1ZSlcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlKHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkZvY3VzKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgdmFsdWUgPSAnJywgaGVpZ2h0ID0gMCB9ID0gZXZlbnQuZGV0YWlsIHx8IHt9O1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdmb2N1cycsIHsgdmFsdWUsIGhlaWdodCB9KTtcclxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ibHVyRnJvbUNsZWFyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgIHNob3dDbGVhcjogdGhpcy5nZXRTaG93Q2xlYXIoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQmx1cihldmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IHZhbHVlID0gJycsIGN1cnNvciA9IDAgfSA9IGV2ZW50LmRldGFpbCB8fCB7fTtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnYmx1cicsIHsgdmFsdWUsIGN1cnNvciB9KTtcclxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHNob3dDbGVhciA9IHRoaXMuZ2V0U2hvd0NsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEudmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NsZWFyXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5ibHVyRnJvbUNsZWFyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBmaXg6IHRoZSBoYW5kd3JpdHRlbiBrZXlib2FyZCBkb2VzIG5vdCB0cmlnZ2VyIGlucHV0IGNoYW5nZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dDbGVhclxyXG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DbGlja0ljb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrLWljb24nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFNob3dDbGVhcih2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSB1bmRlZmluZWQgPyB0aGlzLmRhdGEudmFsdWUgOiB2YWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmRhdGEuY2xlYXJhYmxlICYmIHRoaXMuZm9jdXNlZCAmJiB2YWx1ZSAmJiAhdGhpcy5kYXRhLnJlYWRvbmx5KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xlYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmx1ckZyb21DbGVhciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcclxuICAgICAgICAgICAgICAgIHNob3dDbGVhcjogdGhpcy5nZXRTaG93Q2xlYXIoJycpXHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdENoYW5nZSgnJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGVhcicsICcnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNvbmZpcm0oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NvbmZpcm0nLCB0aGlzLmRhdGEudmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW1pdENoYW5nZSh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==