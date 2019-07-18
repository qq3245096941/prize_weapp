'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    field: true,
    relation: {
        name: 'radio-group',
        type: 'ancestor',
        linked: function linked(target) {
            this.parent = target;
        },
        unlinked: function unlinked() {
            this.parent = null;
        }
    },
    classes: ['icon-class', 'label-class'],
    props: {
        value: null,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: String,
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: 'round'
        }
    },
    methods: {
        emitChange: function emitChange(value) {
            var instance = this.parent || this;
            instance.$emit('input', value);
            instance.$emit('change', value);
        },
        onChange: function onChange(event) {
            console.log(event);
            this.emitChange(this.data.name);
        },
        onClickLabel: function onClickLabel() {
            var _data = this.data,
                disabled = _data.disabled,
                labelDisabled = _data.labelDisabled,
                name = _data.name;

            if (!disabled && !labelDisabled) {
                this.emitChange(name);
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpZWxkIiwicmVsYXRpb24iLCJuYW1lIiwidHlwZSIsImxpbmtlZCIsInRhcmdldCIsInBhcmVudCIsInVubGlua2VkIiwiY2xhc3NlcyIsInByb3BzIiwidmFsdWUiLCJkaXNhYmxlZCIsIkJvb2xlYW4iLCJ1c2VJY29uU2xvdCIsImNoZWNrZWRDb2xvciIsIlN0cmluZyIsImxhYmVsUG9zaXRpb24iLCJsYWJlbERpc2FibGVkIiwic2hhcGUiLCJtZXRob2RzIiwiZW1pdENoYW5nZSIsImluc3RhbmNlIiwiJGVtaXQiLCJvbkNoYW5nZSIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJvbkNsaWNrTGFiZWwiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0EsOEJBQWM7QUFDVkEsV0FBTyxJQURHO0FBRVZDLGNBQVU7QUFDTkMsY0FBTSxhQURBO0FBRU5DLGNBQU0sVUFGQTtBQUdOQyxjQUhNLGtCQUdDQyxNQUhELEVBR1M7QUFDWCxpQkFBS0MsTUFBTCxHQUFjRCxNQUFkO0FBQ0gsU0FMSztBQU1ORSxnQkFOTSxzQkFNSztBQUNQLGlCQUFLRCxNQUFMLEdBQWMsSUFBZDtBQUNIO0FBUkssS0FGQTtBQVlWRSxhQUFTLENBQUMsWUFBRCxFQUFlLGFBQWYsQ0FaQztBQWFWQyxXQUFPO0FBQ0hDLGVBQU8sSUFESjtBQUVIQyxrQkFBVUMsT0FGUDtBQUdIQyxxQkFBYUQsT0FIVjtBQUlIRSxzQkFBY0MsTUFKWDtBQUtIQyx1QkFBZUQsTUFMWjtBQU1IRSx1QkFBZUwsT0FOWjtBQU9ITSxlQUFPO0FBQ0hmLGtCQUFNWSxNQURIO0FBRUhMLG1CQUFPO0FBRko7QUFQSixLQWJHO0FBeUJWUyxhQUFTO0FBQ0xDLGtCQURLLHNCQUNNVixLQUROLEVBQ2E7QUFDZCxnQkFBTVcsV0FBVyxLQUFLZixNQUFMLElBQWUsSUFBaEM7QUFDQWUscUJBQVNDLEtBQVQsQ0FBZSxPQUFmLEVBQXdCWixLQUF4QjtBQUNBVyxxQkFBU0MsS0FBVCxDQUFlLFFBQWYsRUFBeUJaLEtBQXpCO0FBQ0gsU0FMSTtBQU1MYSxnQkFOSyxvQkFNSUMsS0FOSixFQU1XO0FBQ1pDLG9CQUFRQyxHQUFSLENBQVlGLEtBQVo7QUFDQSxpQkFBS0osVUFBTCxDQUFnQixLQUFLTyxJQUFMLENBQVV6QixJQUExQjtBQUNILFNBVEk7QUFVTDBCLG9CQVZLLDBCQVVVO0FBQUEsd0JBQytCLEtBQUtELElBRHBDO0FBQUEsZ0JBQ0hoQixRQURHLFNBQ0hBLFFBREc7QUFBQSxnQkFDT00sYUFEUCxTQUNPQSxhQURQO0FBQUEsZ0JBQ3NCZixJQUR0QixTQUNzQkEsSUFEdEI7O0FBRVgsZ0JBQUksQ0FBQ1MsUUFBRCxJQUFhLENBQUNNLGFBQWxCLEVBQWlDO0FBQzdCLHFCQUFLRyxVQUFMLENBQWdCbEIsSUFBaEI7QUFDSDtBQUNKO0FBZkk7QUF6QkMsQ0FBZCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vY29tcG9uZW50JztcclxuVmFudENvbXBvbmVudCh7XHJcbiAgICBmaWVsZDogdHJ1ZSxcclxuICAgIHJlbGF0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogJ3JhZGlvLWdyb3VwJyxcclxuICAgICAgICB0eXBlOiAnYW5jZXN0b3InLFxyXG4gICAgICAgIGxpbmtlZCh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSB0YXJnZXQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bmxpbmtlZCgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjbGFzc2VzOiBbJ2ljb24tY2xhc3MnLCAnbGFiZWwtY2xhc3MnXSxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgdmFsdWU6IG51bGwsXHJcbiAgICAgICAgZGlzYWJsZWQ6IEJvb2xlYW4sXHJcbiAgICAgICAgdXNlSWNvblNsb3Q6IEJvb2xlYW4sXHJcbiAgICAgICAgY2hlY2tlZENvbG9yOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWxQb3NpdGlvbjogU3RyaW5nLFxyXG4gICAgICAgIGxhYmVsRGlzYWJsZWQ6IEJvb2xlYW4sXHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ3JvdW5kJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgZW1pdENoYW5nZSh2YWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMucGFyZW50IHx8IHRoaXM7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLiRlbWl0KCdpbnB1dCcsIHZhbHVlKTtcclxuICAgICAgICAgICAgaW5zdGFuY2UuJGVtaXQoJ2NoYW5nZScsIHZhbHVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlKHRoaXMuZGF0YS5uYW1lKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xpY2tMYWJlbCgpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBkaXNhYmxlZCwgbGFiZWxEaXNhYmxlZCwgbmFtZSB9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICBpZiAoIWRpc2FibGVkICYmICFsYWJlbERpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRDaGFuZ2UobmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=