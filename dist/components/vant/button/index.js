'use strict';

var _component = require('./../common/component.js');

var _button = require('./../mixins/button.js');

var _openType = require('./../mixins/open-type.js');

(0, _component.VantComponent)({
    mixins: [_button.button, _openType.openType],
    classes: ['hover-class', 'loading-class'],
    props: {
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        type: {
            type: String,
            value: 'default'
        },
        size: {
            type: String,
            value: 'normal'
        },
        loadingSize: {
            type: String,
            value: '20px'
        }
    },
    methods: {
        onClick: function onClick() {
            if (!this.data.disabled && !this.data.loading) {
                this.$emit('click');
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1peGlucyIsImJ1dHRvbiIsIm9wZW5UeXBlIiwiY2xhc3NlcyIsInByb3BzIiwicGxhaW4iLCJCb29sZWFuIiwiYmxvY2siLCJyb3VuZCIsInNxdWFyZSIsImxvYWRpbmciLCJoYWlybGluZSIsImRpc2FibGVkIiwibG9hZGluZ1RleHQiLCJTdHJpbmciLCJ0eXBlIiwidmFsdWUiLCJzaXplIiwibG9hZGluZ1NpemUiLCJtZXRob2RzIiwib25DbGljayIsImRhdGEiLCIkZW1pdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQSw4QkFBYztBQUNWQSxZQUFRLENBQUNDLGNBQUQsRUFBU0Msa0JBQVQsQ0FERTtBQUVWQyxhQUFTLENBQUMsYUFBRCxFQUFnQixlQUFoQixDQUZDO0FBR1ZDLFdBQU87QUFDSEMsZUFBT0MsT0FESjtBQUVIQyxlQUFPRCxPQUZKO0FBR0hFLGVBQU9GLE9BSEo7QUFJSEcsZ0JBQVFILE9BSkw7QUFLSEksaUJBQVNKLE9BTE47QUFNSEssa0JBQVVMLE9BTlA7QUFPSE0sa0JBQVVOLE9BUFA7QUFRSE8scUJBQWFDLE1BUlY7QUFTSEMsY0FBTTtBQUNGQSxrQkFBTUQsTUFESjtBQUVGRSxtQkFBTztBQUZMLFNBVEg7QUFhSEMsY0FBTTtBQUNGRixrQkFBTUQsTUFESjtBQUVGRSxtQkFBTztBQUZMLFNBYkg7QUFpQkhFLHFCQUFhO0FBQ1RILGtCQUFNRCxNQURHO0FBRVRFLG1CQUFPO0FBRkU7QUFqQlYsS0FIRztBQXlCVkcsYUFBUztBQUNMQyxlQURLLHFCQUNLO0FBQ04sZ0JBQUksQ0FBQyxLQUFLQyxJQUFMLENBQVVULFFBQVgsSUFBdUIsQ0FBQyxLQUFLUyxJQUFMLENBQVVYLE9BQXRDLEVBQStDO0FBQzNDLHFCQUFLWSxLQUFMLENBQVcsT0FBWDtBQUNIO0FBQ0o7QUFMSTtBQXpCQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBidXR0b24gfSBmcm9tICcuLi9taXhpbnMvYnV0dG9uJztcclxuaW1wb3J0IHsgb3BlblR5cGUgfSBmcm9tICcuLi9taXhpbnMvb3Blbi10eXBlJztcclxuVmFudENvbXBvbmVudCh7XHJcbiAgICBtaXhpbnM6IFtidXR0b24sIG9wZW5UeXBlXSxcclxuICAgIGNsYXNzZXM6IFsnaG92ZXItY2xhc3MnLCAnbG9hZGluZy1jbGFzcyddLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICBwbGFpbjogQm9vbGVhbixcclxuICAgICAgICBibG9jazogQm9vbGVhbixcclxuICAgICAgICByb3VuZDogQm9vbGVhbixcclxuICAgICAgICBzcXVhcmU6IEJvb2xlYW4sXHJcbiAgICAgICAgbG9hZGluZzogQm9vbGVhbixcclxuICAgICAgICBoYWlybGluZTogQm9vbGVhbixcclxuICAgICAgICBkaXNhYmxlZDogQm9vbGVhbixcclxuICAgICAgICBsb2FkaW5nVGV4dDogU3RyaW5nLFxyXG4gICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ2RlZmF1bHQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaXplOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdmFsdWU6ICdub3JtYWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2FkaW5nU2l6ZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiAnMjBweCdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2xpY2soKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kYXRhLmRpc2FibGVkICYmICF0aGlzLmRhdGEubG9hZGluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==