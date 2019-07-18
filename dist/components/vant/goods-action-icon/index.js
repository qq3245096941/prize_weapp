'use strict';

var _component = require('./../common/component.js');

var _link = require('./../mixins/link.js');

var _button = require('./../mixins/button.js');

var _openType = require('./../mixins/open-type.js');

(0, _component.VantComponent)({
    classes: ['icon-class', 'text-class'],
    mixins: [_link.link, _button.button, _openType.openType],
    props: {
        text: String,
        info: String,
        icon: String,
        disabled: Boolean,
        loading: Boolean
    },
    methods: {
        onClick: function onClick(event) {
            this.$emit('click', event.detail);
            this.jumpLink();
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNsYXNzZXMiLCJtaXhpbnMiLCJsaW5rIiwiYnV0dG9uIiwib3BlblR5cGUiLCJwcm9wcyIsInRleHQiLCJTdHJpbmciLCJpbmZvIiwiaWNvbiIsImRpc2FibGVkIiwiQm9vbGVhbiIsImxvYWRpbmciLCJtZXRob2RzIiwib25DbGljayIsImV2ZW50IiwiJGVtaXQiLCJkZXRhaWwiLCJqdW1wTGluayJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQSw4QkFBYztBQUNWQSxhQUFTLENBQUMsWUFBRCxFQUFlLFlBQWYsQ0FEQztBQUVWQyxZQUFRLENBQUNDLFVBQUQsRUFBT0MsY0FBUCxFQUFlQyxrQkFBZixDQUZFO0FBR1ZDLFdBQU87QUFDSEMsY0FBTUMsTUFESDtBQUVIQyxjQUFNRCxNQUZIO0FBR0hFLGNBQU1GLE1BSEg7QUFJSEcsa0JBQVVDLE9BSlA7QUFLSEMsaUJBQVNEO0FBTE4sS0FIRztBQVVWRSxhQUFTO0FBQ0xDLGVBREssbUJBQ0dDLEtBREgsRUFDVTtBQUNYLGlCQUFLQyxLQUFMLENBQVcsT0FBWCxFQUFvQkQsTUFBTUUsTUFBMUI7QUFDQSxpQkFBS0MsUUFBTDtBQUNIO0FBSkk7QUFWQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBsaW5rIH0gZnJvbSAnLi4vbWl4aW5zL2xpbmsnO1xyXG5pbXBvcnQgeyBidXR0b24gfSBmcm9tICcuLi9taXhpbnMvYnV0dG9uJztcclxuaW1wb3J0IHsgb3BlblR5cGUgfSBmcm9tICcuLi9taXhpbnMvb3Blbi10eXBlJztcclxuVmFudENvbXBvbmVudCh7XHJcbiAgICBjbGFzc2VzOiBbJ2ljb24tY2xhc3MnLCAndGV4dC1jbGFzcyddLFxyXG4gICAgbWl4aW5zOiBbbGluaywgYnV0dG9uLCBvcGVuVHlwZV0sXHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHRleHQ6IFN0cmluZyxcclxuICAgICAgICBpbmZvOiBTdHJpbmcsXHJcbiAgICAgICAgaWNvbjogU3RyaW5nLFxyXG4gICAgICAgIGRpc2FibGVkOiBCb29sZWFuLFxyXG4gICAgICAgIGxvYWRpbmc6IEJvb2xlYW5cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25DbGljayhldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycsIGV2ZW50LmRldGFpbCk7XHJcbiAgICAgICAgICAgIHRoaXMuanVtcExpbmsoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=