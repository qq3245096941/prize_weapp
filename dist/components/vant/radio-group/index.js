'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    field: true,
    relation: {
        name: 'radio',
        type: 'descendant',
        linked: function linked(target) {
            this.children = this.children || [];
            this.children.push(target);
            this.updateChild(target);
        },
        unlinked: function unlinked(target) {
            this.children = this.children.filter(function (child) {
                return child !== target;
            });
        }
    },
    props: {
        value: {
            type: null,
            observer: 'updateChildren'
        },
        disabled: {
            type: Boolean,
            observer: 'updateChildren'
        }
    },
    methods: {
        updateChildren: function updateChildren() {
            var _this = this;

            (this.children || []).forEach(function (child) {
                return _this.updateChild(child);
            });
        },
        updateChild: function updateChild(child) {
            var _data = this.data,
                value = _data.value,
                disabled = _data.disabled;

            child.set({
                value: value,
                disabled: disabled || child.data.disabled
            });
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpZWxkIiwicmVsYXRpb24iLCJuYW1lIiwidHlwZSIsImxpbmtlZCIsInRhcmdldCIsImNoaWxkcmVuIiwicHVzaCIsInVwZGF0ZUNoaWxkIiwidW5saW5rZWQiLCJmaWx0ZXIiLCJjaGlsZCIsInByb3BzIiwidmFsdWUiLCJvYnNlcnZlciIsImRpc2FibGVkIiwiQm9vbGVhbiIsIm1ldGhvZHMiLCJ1cGRhdGVDaGlsZHJlbiIsImZvckVhY2giLCJkYXRhIiwic2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLDhCQUFjO0FBQ1ZBLFdBQU8sSUFERztBQUVWQyxjQUFVO0FBQ05DLGNBQU0sT0FEQTtBQUVOQyxjQUFNLFlBRkE7QUFHTkMsY0FITSxrQkFHQ0MsTUFIRCxFQUdTO0FBQ1gsaUJBQUtDLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxJQUFpQixFQUFqQztBQUNBLGlCQUFLQSxRQUFMLENBQWNDLElBQWQsQ0FBbUJGLE1BQW5CO0FBQ0EsaUJBQUtHLFdBQUwsQ0FBaUJILE1BQWpCO0FBQ0gsU0FQSztBQVFOSSxnQkFSTSxvQkFRR0osTUFSSCxFQVFXO0FBQ2IsaUJBQUtDLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxDQUFjSSxNQUFkLENBQXFCLFVBQUNDLEtBQUQ7QUFBQSx1QkFBV0EsVUFBVU4sTUFBckI7QUFBQSxhQUFyQixDQUFoQjtBQUNIO0FBVkssS0FGQTtBQWNWTyxXQUFPO0FBQ0hDLGVBQU87QUFDSFYsa0JBQU0sSUFESDtBQUVIVyxzQkFBVTtBQUZQLFNBREo7QUFLSEMsa0JBQVU7QUFDTlosa0JBQU1hLE9BREE7QUFFTkYsc0JBQVU7QUFGSjtBQUxQLEtBZEc7QUF3QlZHLGFBQVM7QUFDTEMsc0JBREssNEJBQ1k7QUFBQTs7QUFDYixhQUFDLEtBQUtaLFFBQUwsSUFBaUIsRUFBbEIsRUFBc0JhLE9BQXRCLENBQThCLFVBQUNSLEtBQUQ7QUFBQSx1QkFBVyxNQUFLSCxXQUFMLENBQWlCRyxLQUFqQixDQUFYO0FBQUEsYUFBOUI7QUFDSCxTQUhJO0FBSUxILG1CQUpLLHVCQUlPRyxLQUpQLEVBSWM7QUFBQSx3QkFDYSxLQUFLUyxJQURsQjtBQUFBLGdCQUNQUCxLQURPLFNBQ1BBLEtBRE87QUFBQSxnQkFDQUUsUUFEQSxTQUNBQSxRQURBOztBQUVmSixrQkFBTVUsR0FBTixDQUFVO0FBQ05SLDRCQURNO0FBRU5FLDBCQUFVQSxZQUFZSixNQUFNUyxJQUFOLENBQVdMO0FBRjNCLGFBQVY7QUFJSDtBQVZJO0FBeEJDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgZmllbGQ6IHRydWUsXHJcbiAgICByZWxhdGlvbjoge1xyXG4gICAgICAgIG5hbWU6ICdyYWRpbycsXHJcbiAgICAgICAgdHlwZTogJ2Rlc2NlbmRhbnQnLFxyXG4gICAgICAgIGxpbmtlZCh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4gfHwgW107XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoaWxkKHRhcmdldCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bmxpbmtlZCh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4uZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQgIT09IHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgdHlwZTogbnVsbCxcclxuICAgICAgICAgICAgb2JzZXJ2ZXI6ICd1cGRhdGVDaGlsZHJlbidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpc2FibGVkOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIG9ic2VydmVyOiAndXBkYXRlQ2hpbGRyZW4nXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICB1cGRhdGVDaGlsZHJlbigpIHtcclxuICAgICAgICAgICAgKHRoaXMuY2hpbGRyZW4gfHwgW10pLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLnVwZGF0ZUNoaWxkKGNoaWxkKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGVDaGlsZChjaGlsZCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IHZhbHVlLCBkaXNhYmxlZCB9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICBjaGlsZC5zZXQoe1xyXG4gICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQgfHwgY2hpbGQuZGF0YS5kaXNhYmxlZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=