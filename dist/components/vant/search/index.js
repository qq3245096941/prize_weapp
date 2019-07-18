'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    field: true,
    classes: ['field-class', 'input-class', 'cancel-class'],
    props: {
        focus: Boolean,
        error: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        inputAlign: String,
        showAction: Boolean,
        useActionSlot: Boolean,
        placeholder: String,
        placeholderStyle: String,
        background: {
            type: String,
            value: '#ffffff'
        },
        maxlength: {
            type: Number,
            value: -1
        },
        shape: {
            type: String,
            value: 'square'
        },
        label: String
    },
    methods: {
        onChange: function onChange(event) {
            this.set({ value: event.detail });
            this.$emit('change', event.detail);
        },
        onCancel: function onCancel() {
            this.set({ value: '' });
            this.$emit('cancel');
            this.$emit('change', '');
        },
        onSearch: function onSearch() {
            this.$emit('search', this.data.value);
        },
        onFocus: function onFocus() {
            this.$emit('focus');
        },
        onBlur: function onBlur() {
            this.$emit('blur');
        },
        onClear: function onClear() {
            this.$emit('clear');
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpZWxkIiwiY2xhc3NlcyIsInByb3BzIiwiZm9jdXMiLCJCb29sZWFuIiwiZXJyb3IiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiaW5wdXRBbGlnbiIsIlN0cmluZyIsInNob3dBY3Rpb24iLCJ1c2VBY3Rpb25TbG90IiwicGxhY2Vob2xkZXIiLCJwbGFjZWhvbGRlclN0eWxlIiwiYmFja2dyb3VuZCIsInR5cGUiLCJ2YWx1ZSIsIm1heGxlbmd0aCIsIk51bWJlciIsInNoYXBlIiwibGFiZWwiLCJtZXRob2RzIiwib25DaGFuZ2UiLCJldmVudCIsInNldCIsImRldGFpbCIsIiRlbWl0Iiwib25DYW5jZWwiLCJvblNlYXJjaCIsImRhdGEiLCJvbkZvY3VzIiwib25CbHVyIiwib25DbGVhciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQSw4QkFBYztBQUNWQSxXQUFPLElBREc7QUFFVkMsYUFBUyxDQUFDLGFBQUQsRUFBZ0IsYUFBaEIsRUFBK0IsY0FBL0IsQ0FGQztBQUdWQyxXQUFPO0FBQ0hDLGVBQU9DLE9BREo7QUFFSEMsZUFBT0QsT0FGSjtBQUdIRSxrQkFBVUYsT0FIUDtBQUlIRyxrQkFBVUgsT0FKUDtBQUtISSxvQkFBWUMsTUFMVDtBQU1IQyxvQkFBWU4sT0FOVDtBQU9ITyx1QkFBZVAsT0FQWjtBQVFIUSxxQkFBYUgsTUFSVjtBQVNISSwwQkFBa0JKLE1BVGY7QUFVSEssb0JBQVk7QUFDUkMsa0JBQU1OLE1BREU7QUFFUk8sbUJBQU87QUFGQyxTQVZUO0FBY0hDLG1CQUFXO0FBQ1BGLGtCQUFNRyxNQURDO0FBRVBGLG1CQUFPLENBQUM7QUFGRCxTQWRSO0FBa0JIRyxlQUFPO0FBQ0hKLGtCQUFNTixNQURIO0FBRUhPLG1CQUFPO0FBRkosU0FsQko7QUFzQkhJLGVBQU9YO0FBdEJKLEtBSEc7QUEyQlZZLGFBQVM7QUFDTEMsZ0JBREssb0JBQ0lDLEtBREosRUFDVztBQUNaLGlCQUFLQyxHQUFMLENBQVMsRUFBRVIsT0FBT08sTUFBTUUsTUFBZixFQUFUO0FBQ0EsaUJBQUtDLEtBQUwsQ0FBVyxRQUFYLEVBQXFCSCxNQUFNRSxNQUEzQjtBQUNILFNBSkk7QUFLTEUsZ0JBTEssc0JBS007QUFDUCxpQkFBS0gsR0FBTCxDQUFTLEVBQUVSLE9BQU8sRUFBVCxFQUFUO0FBQ0EsaUJBQUtVLEtBQUwsQ0FBVyxRQUFYO0FBQ0EsaUJBQUtBLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLEVBQXJCO0FBQ0gsU0FUSTtBQVVMRSxnQkFWSyxzQkFVTTtBQUNQLGlCQUFLRixLQUFMLENBQVcsUUFBWCxFQUFxQixLQUFLRyxJQUFMLENBQVViLEtBQS9CO0FBQ0gsU0FaSTtBQWFMYyxlQWJLLHFCQWFLO0FBQ04saUJBQUtKLEtBQUwsQ0FBVyxPQUFYO0FBQ0gsU0FmSTtBQWdCTEssY0FoQkssb0JBZ0JJO0FBQ0wsaUJBQUtMLEtBQUwsQ0FBVyxNQUFYO0FBQ0gsU0FsQkk7QUFtQkxNLGVBbkJLLHFCQW1CSztBQUNOLGlCQUFLTixLQUFMLENBQVcsT0FBWDtBQUNIO0FBckJJO0FBM0JDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgZmllbGQ6IHRydWUsXHJcbiAgICBjbGFzc2VzOiBbJ2ZpZWxkLWNsYXNzJywgJ2lucHV0LWNsYXNzJywgJ2NhbmNlbC1jbGFzcyddLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICBmb2N1czogQm9vbGVhbixcclxuICAgICAgICBlcnJvcjogQm9vbGVhbixcclxuICAgICAgICBkaXNhYmxlZDogQm9vbGVhbixcclxuICAgICAgICByZWFkb25seTogQm9vbGVhbixcclxuICAgICAgICBpbnB1dEFsaWduOiBTdHJpbmcsXHJcbiAgICAgICAgc2hvd0FjdGlvbjogQm9vbGVhbixcclxuICAgICAgICB1c2VBY3Rpb25TbG90OiBCb29sZWFuLFxyXG4gICAgICAgIHBsYWNlaG9sZGVyOiBTdHJpbmcsXHJcbiAgICAgICAgcGxhY2Vob2xkZXJTdHlsZTogU3RyaW5nLFxyXG4gICAgICAgIGJhY2tncm91bmQ6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJyNmZmZmZmYnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXhsZW5ndGg6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogLTFcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdmFsdWU6ICdzcXVhcmUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYWJlbDogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KHsgdmFsdWU6IGV2ZW50LmRldGFpbCB9KTtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZXZlbnQuZGV0YWlsKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2FuY2VsKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldCh7IHZhbHVlOiAnJyB9KTtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsICcnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uU2VhcmNoKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdzZWFyY2gnLCB0aGlzLmRhdGEudmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Gb2N1cygpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZm9jdXMnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQmx1cigpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnYmx1cicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DbGVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xlYXInKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59KTtcclxuIl19