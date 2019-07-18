'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    props: {
        info: null,
        name: String,
        size: String,
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: 'van-icon'
        }
    },
    methods: {
        onClick: function onClick() {
            this.$emit('click');
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwiaW5mbyIsIm5hbWUiLCJTdHJpbmciLCJzaXplIiwiY29sb3IiLCJjdXN0b21TdHlsZSIsImNsYXNzUHJlZml4IiwidHlwZSIsInZhbHVlIiwibWV0aG9kcyIsIm9uQ2xpY2siLCIkZW1pdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQSw4QkFBYztBQUNWQSxXQUFPO0FBQ0hDLGNBQU0sSUFESDtBQUVIQyxjQUFNQyxNQUZIO0FBR0hDLGNBQU1ELE1BSEg7QUFJSEUsZUFBT0YsTUFKSjtBQUtIRyxxQkFBYUgsTUFMVjtBQU1ISSxxQkFBYTtBQUNUQyxrQkFBTUwsTUFERztBQUVUTSxtQkFBTztBQUZFO0FBTlYsS0FERztBQVlWQyxhQUFTO0FBQ0xDLGVBREsscUJBQ0s7QUFDTixpQkFBS0MsS0FBTCxDQUFXLE9BQVg7QUFDSDtBQUhJO0FBWkMsQ0FBZCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vY29tcG9uZW50JztcclxuVmFudENvbXBvbmVudCh7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIGluZm86IG51bGwsXHJcbiAgICAgICAgbmFtZTogU3RyaW5nLFxyXG4gICAgICAgIHNpemU6IFN0cmluZyxcclxuICAgICAgICBjb2xvcjogU3RyaW5nLFxyXG4gICAgICAgIGN1c3RvbVN0eWxlOiBTdHJpbmcsXHJcbiAgICAgICAgY2xhc3NQcmVmaXg6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ3Zhbi1pY29uJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DbGljaygpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=