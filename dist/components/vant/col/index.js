'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    relation: {
        name: 'row',
        type: 'ancestor'
    },
    props: {
        span: Number,
        offset: Number
    },
    data: {
        style: ''
    },
    methods: {
        setGutter: function setGutter(gutter) {
            var padding = gutter / 2 + 'px';
            var style = gutter ? 'padding-left: ' + padding + '; padding-right: ' + padding + ';' : '';
            if (style !== this.data.style) {
                this.set({ style: style });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlbGF0aW9uIiwibmFtZSIsInR5cGUiLCJwcm9wcyIsInNwYW4iLCJOdW1iZXIiLCJvZmZzZXQiLCJkYXRhIiwic3R5bGUiLCJtZXRob2RzIiwic2V0R3V0dGVyIiwiZ3V0dGVyIiwicGFkZGluZyIsInNldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQSw4QkFBYztBQUNWQSxjQUFVO0FBQ05DLGNBQU0sS0FEQTtBQUVOQyxjQUFNO0FBRkEsS0FEQTtBQUtWQyxXQUFPO0FBQ0hDLGNBQU1DLE1BREg7QUFFSEMsZ0JBQVFEO0FBRkwsS0FMRztBQVNWRSxVQUFNO0FBQ0ZDLGVBQU87QUFETCxLQVRJO0FBWVZDLGFBQVM7QUFDTEMsaUJBREsscUJBQ0tDLE1BREwsRUFDYTtBQUNkLGdCQUFNQyxVQUFhRCxTQUFTLENBQXRCLE9BQU47QUFDQSxnQkFBTUgsUUFBUUcsNEJBQTBCQyxPQUExQix5QkFBcURBLE9BQXJELFNBQWtFLEVBQWhGO0FBQ0EsZ0JBQUlKLFVBQVUsS0FBS0QsSUFBTCxDQUFVQyxLQUF4QixFQUErQjtBQUMzQixxQkFBS0ssR0FBTCxDQUFTLEVBQUVMLFlBQUYsRUFBVDtBQUNIO0FBQ0o7QUFQSTtBQVpDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgcmVsYXRpb246IHtcclxuICAgICAgICBuYW1lOiAncm93JyxcclxuICAgICAgICB0eXBlOiAnYW5jZXN0b3InXHJcbiAgICB9LFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICBzcGFuOiBOdW1iZXIsXHJcbiAgICAgICAgb2Zmc2V0OiBOdW1iZXJcclxuICAgIH0sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgc3R5bGU6ICcnXHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIHNldEd1dHRlcihndXR0ZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFkZGluZyA9IGAke2d1dHRlciAvIDJ9cHhgO1xyXG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGd1dHRlciA/IGBwYWRkaW5nLWxlZnQ6ICR7cGFkZGluZ307IHBhZGRpbmctcmlnaHQ6ICR7cGFkZGluZ307YCA6ICcnO1xyXG4gICAgICAgICAgICBpZiAoc3R5bGUgIT09IHRoaXMuZGF0YS5zdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoeyBzdHlsZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==