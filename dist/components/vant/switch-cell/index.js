'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    field: true,
    props: {
        value: null,
        title: String,
        border: Boolean,
        checked: Boolean,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        size: {
            type: String,
            value: '24px'
        },
        activeValue: {
            type: null,
            value: true
        },
        inactiveValue: {
            type: null,
            value: false
        }
    },
    watch: {
        checked: function checked(value) {
            this.set({ value: value });
        }
    },
    created: function created() {
        this.set({ value: this.data.checked });
    },

    methods: {
        onChange: function onChange(event) {
            this.$emit('change', event.detail);
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpZWxkIiwicHJvcHMiLCJ2YWx1ZSIsInRpdGxlIiwiU3RyaW5nIiwiYm9yZGVyIiwiQm9vbGVhbiIsImNoZWNrZWQiLCJsb2FkaW5nIiwiZGlzYWJsZWQiLCJhY3RpdmVDb2xvciIsImluYWN0aXZlQ29sb3IiLCJzaXplIiwidHlwZSIsImFjdGl2ZVZhbHVlIiwiaW5hY3RpdmVWYWx1ZSIsIndhdGNoIiwic2V0IiwiY3JlYXRlZCIsImRhdGEiLCJtZXRob2RzIiwib25DaGFuZ2UiLCJldmVudCIsIiRlbWl0IiwiZGV0YWlsIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLDhCQUFjO0FBQ1ZBLFdBQU8sSUFERztBQUVWQyxXQUFPO0FBQ0hDLGVBQU8sSUFESjtBQUVIQyxlQUFPQyxNQUZKO0FBR0hDLGdCQUFRQyxPQUhMO0FBSUhDLGlCQUFTRCxPQUpOO0FBS0hFLGlCQUFTRixPQUxOO0FBTUhHLGtCQUFVSCxPQU5QO0FBT0hJLHFCQUFhTixNQVBWO0FBUUhPLHVCQUFlUCxNQVJaO0FBU0hRLGNBQU07QUFDRkMsa0JBQU1ULE1BREo7QUFFRkYsbUJBQU87QUFGTCxTQVRIO0FBYUhZLHFCQUFhO0FBQ1RELGtCQUFNLElBREc7QUFFVFgsbUJBQU87QUFGRSxTQWJWO0FBaUJIYSx1QkFBZTtBQUNYRixrQkFBTSxJQURLO0FBRVhYLG1CQUFPO0FBRkk7QUFqQlosS0FGRztBQXdCVmMsV0FBTztBQUNIVCxlQURHLG1CQUNLTCxLQURMLEVBQ1k7QUFDWCxpQkFBS2UsR0FBTCxDQUFTLEVBQUVmLFlBQUYsRUFBVDtBQUNIO0FBSEUsS0F4Qkc7QUE2QlZnQixXQTdCVSxxQkE2QkE7QUFDTixhQUFLRCxHQUFMLENBQVMsRUFBRWYsT0FBTyxLQUFLaUIsSUFBTCxDQUFVWixPQUFuQixFQUFUO0FBQ0gsS0EvQlM7O0FBZ0NWYSxhQUFTO0FBQ0xDLGdCQURLLG9CQUNJQyxLQURKLEVBQ1c7QUFDWixpQkFBS0MsS0FBTCxDQUFXLFFBQVgsRUFBcUJELE1BQU1FLE1BQTNCO0FBQ0g7QUFISTtBQWhDQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5WYW50Q29tcG9uZW50KHtcclxuICAgIGZpZWxkOiB0cnVlLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICB2YWx1ZTogbnVsbCxcclxuICAgICAgICB0aXRsZTogU3RyaW5nLFxyXG4gICAgICAgIGJvcmRlcjogQm9vbGVhbixcclxuICAgICAgICBjaGVja2VkOiBCb29sZWFuLFxyXG4gICAgICAgIGxvYWRpbmc6IEJvb2xlYW4sXHJcbiAgICAgICAgZGlzYWJsZWQ6IEJvb2xlYW4sXHJcbiAgICAgICAgYWN0aXZlQ29sb3I6IFN0cmluZyxcclxuICAgICAgICBpbmFjdGl2ZUNvbG9yOiBTdHJpbmcsXHJcbiAgICAgICAgc2l6ZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiAnMjRweCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGl2ZVZhbHVlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IG51bGwsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbmFjdGl2ZVZhbHVlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IG51bGwsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIGNoZWNrZWQodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoeyB2YWx1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZCgpIHtcclxuICAgICAgICB0aGlzLnNldCh7IHZhbHVlOiB0aGlzLmRhdGEuY2hlY2tlZCB9KTtcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgZXZlbnQuZGV0YWlsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=