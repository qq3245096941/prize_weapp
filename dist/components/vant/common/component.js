'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VantComponent = undefined;

var _basic = require('./../mixins/basic.js');

var _index = require('./../mixins/observer/index.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mapKeys(source, target, map) {
    Object.keys(map).forEach(function (key) {
        if (source[key]) {
            target[map[key]] = source[key];
        }
    });
}
function VantComponent() {
    var vantOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var options = {};
    mapKeys(vantOptions, options, {
        data: 'data',
        props: 'properties',
        mixins: 'behaviors',
        methods: 'methods',
        beforeCreate: 'created',
        created: 'attached',
        mounted: 'ready',
        relations: 'relations',
        destroyed: 'detached',
        classes: 'externalClasses'
    });
    var relation = vantOptions.relation;

    if (relation) {
        options.relations = Object.assign(options.relations || {}, _defineProperty({}, '../' + relation.name + '/index', relation));
    }
    // add default externalClasses
    options.externalClasses = options.externalClasses || [];
    options.externalClasses.push('custom-class');
    // add default behaviors
    options.behaviors = options.behaviors || [];
    options.behaviors.push(_basic.basic);
    // map field to form-field behavior
    if (vantOptions.field) {
        options.behaviors.push('wx://form-field');
    }
    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true
    };
    (0, _index.observe)(vantOptions, options);
    Component(options);
}
exports.VantComponent = VantComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJtYXBLZXlzIiwic291cmNlIiwidGFyZ2V0IiwibWFwIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJWYW50Q29tcG9uZW50IiwidmFudE9wdGlvbnMiLCJvcHRpb25zIiwiZGF0YSIsInByb3BzIiwibWl4aW5zIiwibWV0aG9kcyIsImJlZm9yZUNyZWF0ZSIsImNyZWF0ZWQiLCJtb3VudGVkIiwicmVsYXRpb25zIiwiZGVzdHJveWVkIiwiY2xhc3NlcyIsInJlbGF0aW9uIiwiYXNzaWduIiwibmFtZSIsImV4dGVybmFsQ2xhc3NlcyIsInB1c2giLCJiZWhhdmlvcnMiLCJiYXNpYyIsImZpZWxkIiwibXVsdGlwbGVTbG90cyIsImFkZEdsb2JhbENsYXNzIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQSxTQUFTQSxPQUFULENBQWlCQyxNQUFqQixFQUF5QkMsTUFBekIsRUFBaUNDLEdBQWpDLEVBQXNDO0FBQ2xDQyxXQUFPQyxJQUFQLENBQVlGLEdBQVosRUFBaUJHLE9BQWpCLENBQXlCLGVBQU87QUFDNUIsWUFBSUwsT0FBT00sR0FBUCxDQUFKLEVBQWlCO0FBQ2JMLG1CQUFPQyxJQUFJSSxHQUFKLENBQVAsSUFBbUJOLE9BQU9NLEdBQVAsQ0FBbkI7QUFDSDtBQUNKLEtBSkQ7QUFLSDtBQUNELFNBQVNDLGFBQVQsR0FBeUM7QUFBQSxRQUFsQkMsV0FBa0IsdUVBQUosRUFBSTs7QUFDckMsUUFBTUMsVUFBVSxFQUFoQjtBQUNBVixZQUFRUyxXQUFSLEVBQXFCQyxPQUFyQixFQUE4QjtBQUMxQkMsY0FBTSxNQURvQjtBQUUxQkMsZUFBTyxZQUZtQjtBQUcxQkMsZ0JBQVEsV0FIa0I7QUFJMUJDLGlCQUFTLFNBSmlCO0FBSzFCQyxzQkFBYyxTQUxZO0FBTTFCQyxpQkFBUyxVQU5pQjtBQU8xQkMsaUJBQVMsT0FQaUI7QUFRMUJDLG1CQUFXLFdBUmU7QUFTMUJDLG1CQUFXLFVBVGU7QUFVMUJDLGlCQUFTO0FBVmlCLEtBQTlCO0FBRnFDLFFBYzdCQyxRQWQ2QixHQWNoQlosV0FkZ0IsQ0FjN0JZLFFBZDZCOztBQWVyQyxRQUFJQSxRQUFKLEVBQWM7QUFDVlgsZ0JBQVFRLFNBQVIsR0FBb0JkLE9BQU9rQixNQUFQLENBQWNaLFFBQVFRLFNBQVIsSUFBcUIsRUFBbkMsOEJBQ1RHLFNBQVNFLElBREEsYUFDZUYsUUFEZixFQUFwQjtBQUdIO0FBQ0Q7QUFDQVgsWUFBUWMsZUFBUixHQUEwQmQsUUFBUWMsZUFBUixJQUEyQixFQUFyRDtBQUNBZCxZQUFRYyxlQUFSLENBQXdCQyxJQUF4QixDQUE2QixjQUE3QjtBQUNBO0FBQ0FmLFlBQVFnQixTQUFSLEdBQW9CaEIsUUFBUWdCLFNBQVIsSUFBcUIsRUFBekM7QUFDQWhCLFlBQVFnQixTQUFSLENBQWtCRCxJQUFsQixDQUF1QkUsWUFBdkI7QUFDQTtBQUNBLFFBQUlsQixZQUFZbUIsS0FBaEIsRUFBdUI7QUFDbkJsQixnQkFBUWdCLFNBQVIsQ0FBa0JELElBQWxCLENBQXVCLGlCQUF2QjtBQUNIO0FBQ0Q7QUFDQWYsWUFBUUEsT0FBUixHQUFrQjtBQUNkbUIsdUJBQWUsSUFERDtBQUVkQyx3QkFBZ0I7QUFGRixLQUFsQjtBQUlBLHdCQUFRckIsV0FBUixFQUFxQkMsT0FBckI7QUFDQXFCLGNBQVVyQixPQUFWO0FBQ0g7UUFDUUYsYSxHQUFBQSxhIiwiZmlsZSI6ImNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJhc2ljIH0gZnJvbSAnLi4vbWl4aW5zL2Jhc2ljJztcclxuaW1wb3J0IHsgb2JzZXJ2ZSB9IGZyb20gJy4uL21peGlucy9vYnNlcnZlci9pbmRleCc7XHJcbmZ1bmN0aW9uIG1hcEtleXMoc291cmNlLCB0YXJnZXQsIG1hcCkge1xyXG4gICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgaWYgKHNvdXJjZVtrZXldKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFttYXBba2V5XV0gPSBzb3VyY2Vba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBWYW50Q29tcG9uZW50KHZhbnRPcHRpb25zID0ge30pIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcclxuICAgIG1hcEtleXModmFudE9wdGlvbnMsIG9wdGlvbnMsIHtcclxuICAgICAgICBkYXRhOiAnZGF0YScsXHJcbiAgICAgICAgcHJvcHM6ICdwcm9wZXJ0aWVzJyxcclxuICAgICAgICBtaXhpbnM6ICdiZWhhdmlvcnMnLFxyXG4gICAgICAgIG1ldGhvZHM6ICdtZXRob2RzJyxcclxuICAgICAgICBiZWZvcmVDcmVhdGU6ICdjcmVhdGVkJyxcclxuICAgICAgICBjcmVhdGVkOiAnYXR0YWNoZWQnLFxyXG4gICAgICAgIG1vdW50ZWQ6ICdyZWFkeScsXHJcbiAgICAgICAgcmVsYXRpb25zOiAncmVsYXRpb25zJyxcclxuICAgICAgICBkZXN0cm95ZWQ6ICdkZXRhY2hlZCcsXHJcbiAgICAgICAgY2xhc3NlczogJ2V4dGVybmFsQ2xhc3NlcydcclxuICAgIH0pO1xyXG4gICAgY29uc3QgeyByZWxhdGlvbiB9ID0gdmFudE9wdGlvbnM7XHJcbiAgICBpZiAocmVsYXRpb24pIHtcclxuICAgICAgICBvcHRpb25zLnJlbGF0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucy5yZWxhdGlvbnMgfHwge30sIHtcclxuICAgICAgICAgICAgW2AuLi8ke3JlbGF0aW9uLm5hbWV9L2luZGV4YF06IHJlbGF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBhZGQgZGVmYXVsdCBleHRlcm5hbENsYXNzZXNcclxuICAgIG9wdGlvbnMuZXh0ZXJuYWxDbGFzc2VzID0gb3B0aW9ucy5leHRlcm5hbENsYXNzZXMgfHwgW107XHJcbiAgICBvcHRpb25zLmV4dGVybmFsQ2xhc3Nlcy5wdXNoKCdjdXN0b20tY2xhc3MnKTtcclxuICAgIC8vIGFkZCBkZWZhdWx0IGJlaGF2aW9yc1xyXG4gICAgb3B0aW9ucy5iZWhhdmlvcnMgPSBvcHRpb25zLmJlaGF2aW9ycyB8fCBbXTtcclxuICAgIG9wdGlvbnMuYmVoYXZpb3JzLnB1c2goYmFzaWMpO1xyXG4gICAgLy8gbWFwIGZpZWxkIHRvIGZvcm0tZmllbGQgYmVoYXZpb3JcclxuICAgIGlmICh2YW50T3B0aW9ucy5maWVsZCkge1xyXG4gICAgICAgIG9wdGlvbnMuYmVoYXZpb3JzLnB1c2goJ3d4Oi8vZm9ybS1maWVsZCcpO1xyXG4gICAgfVxyXG4gICAgLy8gYWRkIGRlZmF1bHQgb3B0aW9uc1xyXG4gICAgb3B0aW9ucy5vcHRpb25zID0ge1xyXG4gICAgICAgIG11bHRpcGxlU2xvdHM6IHRydWUsXHJcbiAgICAgICAgYWRkR2xvYmFsQ2xhc3M6IHRydWVcclxuICAgIH07XHJcbiAgICBvYnNlcnZlKHZhbnRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgIENvbXBvbmVudChvcHRpb25zKTtcclxufVxyXG5leHBvcnQgeyBWYW50Q29tcG9uZW50IH07XHJcbiJdfQ==