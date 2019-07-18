'use strict';

var _component = require('./../common/component.js');

var _safeArea = require('./../mixins/safe-area.js');

(0, _component.VantComponent)({
    mixins: [(0, _safeArea.safeArea)()],
    classes: ['bar-class', 'price-class', 'button-class'],
    props: {
        tip: null,
        tipIcon: String,
        type: Number,
        price: null,
        label: String,
        loading: Boolean,
        disabled: Boolean,
        buttonText: String,
        currency: {
            type: String,
            value: '¥'
        },
        buttonType: {
            type: String,
            value: 'danger'
        },
        decimalLength: {
            type: Number,
            value: 2
        }
    },
    computed: {
        hasPrice: function hasPrice() {
            return typeof this.data.price === 'number';
        },
        priceStr: function priceStr() {
            return (this.data.price / 100).toFixed(this.data.decimalLength);
        },
        tipStr: function tipStr() {
            var tip = this.data.tip;

            return typeof tip === 'string' ? tip : '';
        }
    },
    methods: {
        onSubmit: function onSubmit(event) {
            this.$emit('submit', event.detail);
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1peGlucyIsImNsYXNzZXMiLCJwcm9wcyIsInRpcCIsInRpcEljb24iLCJTdHJpbmciLCJ0eXBlIiwiTnVtYmVyIiwicHJpY2UiLCJsYWJlbCIsImxvYWRpbmciLCJCb29sZWFuIiwiZGlzYWJsZWQiLCJidXR0b25UZXh0IiwiY3VycmVuY3kiLCJ2YWx1ZSIsImJ1dHRvblR5cGUiLCJkZWNpbWFsTGVuZ3RoIiwiY29tcHV0ZWQiLCJoYXNQcmljZSIsImRhdGEiLCJwcmljZVN0ciIsInRvRml4ZWQiLCJ0aXBTdHIiLCJtZXRob2RzIiwib25TdWJtaXQiLCJldmVudCIsIiRlbWl0IiwiZGV0YWlsIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBLDhCQUFjO0FBQ1ZBLFlBQVEsQ0FBQyx5QkFBRCxDQURFO0FBRVZDLGFBQVMsQ0FDTCxXQURLLEVBRUwsYUFGSyxFQUdMLGNBSEssQ0FGQztBQU9WQyxXQUFPO0FBQ0hDLGFBQUssSUFERjtBQUVIQyxpQkFBU0MsTUFGTjtBQUdIQyxjQUFNQyxNQUhIO0FBSUhDLGVBQU8sSUFKSjtBQUtIQyxlQUFPSixNQUxKO0FBTUhLLGlCQUFTQyxPQU5OO0FBT0hDLGtCQUFVRCxPQVBQO0FBUUhFLG9CQUFZUixNQVJUO0FBU0hTLGtCQUFVO0FBQ05SLGtCQUFNRCxNQURBO0FBRU5VLG1CQUFPO0FBRkQsU0FUUDtBQWFIQyxvQkFBWTtBQUNSVixrQkFBTUQsTUFERTtBQUVSVSxtQkFBTztBQUZDLFNBYlQ7QUFpQkhFLHVCQUFlO0FBQ1hYLGtCQUFNQyxNQURLO0FBRVhRLG1CQUFPO0FBRkk7QUFqQlosS0FQRztBQTZCVkcsY0FBVTtBQUNOQyxnQkFETSxzQkFDSztBQUNQLG1CQUFPLE9BQU8sS0FBS0MsSUFBTCxDQUFVWixLQUFqQixLQUEyQixRQUFsQztBQUNILFNBSEs7QUFJTmEsZ0JBSk0sc0JBSUs7QUFDUCxtQkFBTyxDQUFDLEtBQUtELElBQUwsQ0FBVVosS0FBVixHQUFrQixHQUFuQixFQUF3QmMsT0FBeEIsQ0FBZ0MsS0FBS0YsSUFBTCxDQUFVSCxhQUExQyxDQUFQO0FBQ0gsU0FOSztBQU9OTSxjQVBNLG9CQU9HO0FBQUEsZ0JBQ0dwQixHQURILEdBQ1csS0FBS2lCLElBRGhCLENBQ0dqQixHQURIOztBQUVMLG1CQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUFmLEdBQTBCQSxHQUExQixHQUFnQyxFQUF2QztBQUNIO0FBVkssS0E3QkE7QUF5Q1ZxQixhQUFTO0FBQ0xDLGdCQURLLG9CQUNJQyxLQURKLEVBQ1c7QUFDWixpQkFBS0MsS0FBTCxDQUFXLFFBQVgsRUFBcUJELE1BQU1FLE1BQTNCO0FBQ0g7QUFISTtBQXpDQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBzYWZlQXJlYSB9IGZyb20gJy4uL21peGlucy9zYWZlLWFyZWEnO1xyXG5WYW50Q29tcG9uZW50KHtcclxuICAgIG1peGluczogW3NhZmVBcmVhKCldLFxyXG4gICAgY2xhc3NlczogW1xyXG4gICAgICAgICdiYXItY2xhc3MnLFxyXG4gICAgICAgICdwcmljZS1jbGFzcycsXHJcbiAgICAgICAgJ2J1dHRvbi1jbGFzcydcclxuICAgIF0sXHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHRpcDogbnVsbCxcclxuICAgICAgICB0aXBJY29uOiBTdHJpbmcsXHJcbiAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgIHByaWNlOiBudWxsLFxyXG4gICAgICAgIGxhYmVsOiBTdHJpbmcsXHJcbiAgICAgICAgbG9hZGluZzogQm9vbGVhbixcclxuICAgICAgICBkaXNhYmxlZDogQm9vbGVhbixcclxuICAgICAgICBidXR0b25UZXh0OiBTdHJpbmcsXHJcbiAgICAgICAgY3VycmVuY3k6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ8KlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnV0dG9uVHlwZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiAnZGFuZ2VyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVjaW1hbExlbmd0aDoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgaGFzUHJpY2UoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5kYXRhLnByaWNlID09PSAnbnVtYmVyJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByaWNlU3RyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZGF0YS5wcmljZSAvIDEwMCkudG9GaXhlZCh0aGlzLmRhdGEuZGVjaW1hbExlbmd0aCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aXBTdHIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgdGlwIH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGlwID09PSAnc3RyaW5nJyA/IHRpcCA6ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25TdWJtaXQoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnc3VibWl0JywgZXZlbnQuZGV0YWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=