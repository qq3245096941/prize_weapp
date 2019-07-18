'use strict';

var _component = require('./../common/component.js');

var _color = require('./../common/color.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_COLOR = '#999';
var COLOR_MAP = {
    danger: _color.RED,
    primary: _color.BLUE,
    success: _color.GREEN
};
(0, _component.VantComponent)({
    props: {
        size: String,
        type: String,
        mark: Boolean,
        color: String,
        plain: Boolean,
        round: Boolean,
        textColor: String
    },
    computed: {
        style: function style() {
            var color = this.data.color || COLOR_MAP[this.data.type] || DEFAULT_COLOR;
            var key = this.data.plain ? 'color' : 'background-color';
            var style = _defineProperty({}, key, color);
            if (this.data.textColor) {
                style.color = this.data.textColor;
            }
            return Object.keys(style).map(function (key) {
                return key + ': ' + style[key];
            }).join(';');
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfQ09MT1IiLCJDT0xPUl9NQVAiLCJkYW5nZXIiLCJSRUQiLCJwcmltYXJ5IiwiQkxVRSIsInN1Y2Nlc3MiLCJHUkVFTiIsInByb3BzIiwic2l6ZSIsIlN0cmluZyIsInR5cGUiLCJtYXJrIiwiQm9vbGVhbiIsImNvbG9yIiwicGxhaW4iLCJyb3VuZCIsInRleHRDb2xvciIsImNvbXB1dGVkIiwic3R5bGUiLCJkYXRhIiwia2V5IiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImpvaW4iXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7Ozs7QUFDQSxJQUFNQSxnQkFBZ0IsTUFBdEI7QUFDQSxJQUFNQyxZQUFZO0FBQ2RDLFlBQVFDLFVBRE07QUFFZEMsYUFBU0MsV0FGSztBQUdkQyxhQUFTQztBQUhLLENBQWxCO0FBS0EsOEJBQWM7QUFDVkMsV0FBTztBQUNIQyxjQUFNQyxNQURIO0FBRUhDLGNBQU1ELE1BRkg7QUFHSEUsY0FBTUMsT0FISDtBQUlIQyxlQUFPSixNQUpKO0FBS0hLLGVBQU9GLE9BTEo7QUFNSEcsZUFBT0gsT0FOSjtBQU9ISSxtQkFBV1A7QUFQUixLQURHO0FBVVZRLGNBQVU7QUFDTkMsYUFETSxtQkFDRTtBQUNKLGdCQUFNTCxRQUFRLEtBQUtNLElBQUwsQ0FBVU4sS0FBVixJQUFtQmIsVUFBVSxLQUFLbUIsSUFBTCxDQUFVVCxJQUFwQixDQUFuQixJQUFnRFgsYUFBOUQ7QUFDQSxnQkFBTXFCLE1BQU0sS0FBS0QsSUFBTCxDQUFVTCxLQUFWLEdBQWtCLE9BQWxCLEdBQTRCLGtCQUF4QztBQUNBLGdCQUFNSSw0QkFBV0UsR0FBWCxFQUFpQlAsS0FBakIsQ0FBTjtBQUNBLGdCQUFJLEtBQUtNLElBQUwsQ0FBVUgsU0FBZCxFQUF5QjtBQUNyQkUsc0JBQU1MLEtBQU4sR0FBYyxLQUFLTSxJQUFMLENBQVVILFNBQXhCO0FBQ0g7QUFDRCxtQkFBT0ssT0FBT0MsSUFBUCxDQUFZSixLQUFaLEVBQW1CSyxHQUFuQixDQUF1QjtBQUFBLHVCQUFVSCxHQUFWLFVBQWtCRixNQUFNRSxHQUFOLENBQWxCO0FBQUEsYUFBdkIsRUFBdURJLElBQXZELENBQTRELEdBQTVELENBQVA7QUFDSDtBQVRLO0FBVkEsQ0FBZCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhbnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21tb24vY29tcG9uZW50JztcclxuaW1wb3J0IHsgUkVELCBCTFVFLCBHUkVFTiB9IGZyb20gJy4uL2NvbW1vbi9jb2xvcic7XHJcbmNvbnN0IERFRkFVTFRfQ09MT1IgPSAnIzk5OSc7XHJcbmNvbnN0IENPTE9SX01BUCA9IHtcclxuICAgIGRhbmdlcjogUkVELFxyXG4gICAgcHJpbWFyeTogQkxVRSxcclxuICAgIHN1Y2Nlc3M6IEdSRUVOXHJcbn07XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICBzaXplOiBTdHJpbmcsXHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIG1hcms6IEJvb2xlYW4sXHJcbiAgICAgICAgY29sb3I6IFN0cmluZyxcclxuICAgICAgICBwbGFpbjogQm9vbGVhbixcclxuICAgICAgICByb3VuZDogQm9vbGVhbixcclxuICAgICAgICB0ZXh0Q29sb3I6IFN0cmluZ1xyXG4gICAgfSxcclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgc3R5bGUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5kYXRhLmNvbG9yIHx8IENPTE9SX01BUFt0aGlzLmRhdGEudHlwZV0gfHwgREVGQVVMVF9DT0xPUjtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5kYXRhLnBsYWluID8gJ2NvbG9yJyA6ICdiYWNrZ3JvdW5kLWNvbG9yJztcclxuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB7IFtrZXldOiBjb2xvciB9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnRleHRDb2xvcikge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUuY29sb3IgPSB0aGlzLmRhdGEudGV4dENvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZSkubWFwKGtleSA9PiBgJHtrZXl9OiAke3N0eWxlW2tleV19YCkuam9pbignOycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==