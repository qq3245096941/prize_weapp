'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    props: {
        show: Boolean,
        mask: Boolean,
        customStyle: String,
        duration: {
            type: [Number, Object],
            value: 300
        },
        zIndex: {
            type: Number,
            value: 1
        }
    },
    methods: {
        onClick: function onClick() {
            this.$emit('click');
        },

        // for prevent touchmove
        noop: function noop() {}
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwic2hvdyIsIkJvb2xlYW4iLCJtYXNrIiwiY3VzdG9tU3R5bGUiLCJTdHJpbmciLCJkdXJhdGlvbiIsInR5cGUiLCJOdW1iZXIiLCJPYmplY3QiLCJ2YWx1ZSIsInpJbmRleCIsIm1ldGhvZHMiLCJvbkNsaWNrIiwiJGVtaXQiLCJub29wIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLDhCQUFjO0FBQ1ZBLFdBQU87QUFDSEMsY0FBTUMsT0FESDtBQUVIQyxjQUFNRCxPQUZIO0FBR0hFLHFCQUFhQyxNQUhWO0FBSUhDLGtCQUFVO0FBQ05DLGtCQUFNLENBQUNDLE1BQUQsRUFBU0MsTUFBVCxDQURBO0FBRU5DLG1CQUFPO0FBRkQsU0FKUDtBQVFIQyxnQkFBUTtBQUNKSixrQkFBTUMsTUFERjtBQUVKRSxtQkFBTztBQUZIO0FBUkwsS0FERztBQWNWRSxhQUFTO0FBQ0xDLGVBREsscUJBQ0s7QUFDTixpQkFBS0MsS0FBTCxDQUFXLE9BQVg7QUFDSCxTQUhJOztBQUlMO0FBQ0FDLFlBTEssa0JBS0UsQ0FBRztBQUxMO0FBZEMsQ0FBZCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vY29tcG9uZW50JztcclxuVmFudENvbXBvbmVudCh7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHNob3c6IEJvb2xlYW4sXHJcbiAgICAgICAgbWFzazogQm9vbGVhbixcclxuICAgICAgICBjdXN0b21TdHlsZTogU3RyaW5nLFxyXG4gICAgICAgIGR1cmF0aW9uOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFtOdW1iZXIsIE9iamVjdF0sXHJcbiAgICAgICAgICAgIHZhbHVlOiAzMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHpJbmRleDoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiAxXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNsaWNrKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gZm9yIHByZXZlbnQgdG91Y2htb3ZlXHJcbiAgICAgICAgbm9vcCgpIHsgfVxyXG4gICAgfVxyXG59KTtcclxuIl19