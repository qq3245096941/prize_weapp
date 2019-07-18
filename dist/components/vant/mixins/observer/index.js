'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.observe = observe;

var _behavior = require('./behavior.js');

var _props = require('./props.js');

function observe(vantOptions, options) {
    var watch = vantOptions.watch,
        computed = vantOptions.computed;

    options.behaviors.push(_behavior.behavior);
    if (watch) {
        var props = options.properties || {};
        Object.keys(watch).forEach(function (key) {
            if (key in props) {
                var prop = props[key];
                if (prop === null || !('type' in prop)) {
                    prop = { type: prop };
                }
                prop.observer = watch[key];
                props[key] = prop;
            }
        });
        options.properties = props;
    }
    if (computed) {
        options.methods = options.methods || {};
        options.methods.$options = function () {
            return vantOptions;
        };
        if (options.properties) {
            (0, _props.observeProps)(options.properties);
        }
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm9ic2VydmUiLCJ2YW50T3B0aW9ucyIsIm9wdGlvbnMiLCJ3YXRjaCIsImNvbXB1dGVkIiwiYmVoYXZpb3JzIiwicHVzaCIsImJlaGF2aW9yIiwicHJvcHMiLCJwcm9wZXJ0aWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJwcm9wIiwidHlwZSIsIm9ic2VydmVyIiwibWV0aG9kcyIsIiRvcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7OztRQUVnQkEsTyxHQUFBQSxPOztBQUZoQjs7QUFDQTs7QUFDTyxTQUFTQSxPQUFULENBQWlCQyxXQUFqQixFQUE4QkMsT0FBOUIsRUFBdUM7QUFBQSxRQUNsQ0MsS0FEa0MsR0FDZEYsV0FEYyxDQUNsQ0UsS0FEa0M7QUFBQSxRQUMzQkMsUUFEMkIsR0FDZEgsV0FEYyxDQUMzQkcsUUFEMkI7O0FBRTFDRixZQUFRRyxTQUFSLENBQWtCQyxJQUFsQixDQUF1QkMsa0JBQXZCO0FBQ0EsUUFBSUosS0FBSixFQUFXO0FBQ1AsWUFBTUssUUFBUU4sUUFBUU8sVUFBUixJQUFzQixFQUFwQztBQUNBQyxlQUFPQyxJQUFQLENBQVlSLEtBQVosRUFBbUJTLE9BQW5CLENBQTJCLGVBQU87QUFDOUIsZ0JBQUlDLE9BQU9MLEtBQVgsRUFBa0I7QUFDZCxvQkFBSU0sT0FBT04sTUFBTUssR0FBTixDQUFYO0FBQ0Esb0JBQUlDLFNBQVMsSUFBVCxJQUFpQixFQUFFLFVBQVVBLElBQVosQ0FBckIsRUFBd0M7QUFDcENBLDJCQUFPLEVBQUVDLE1BQU1ELElBQVIsRUFBUDtBQUNIO0FBQ0RBLHFCQUFLRSxRQUFMLEdBQWdCYixNQUFNVSxHQUFOLENBQWhCO0FBQ0FMLHNCQUFNSyxHQUFOLElBQWFDLElBQWI7QUFDSDtBQUNKLFNBVEQ7QUFVQVosZ0JBQVFPLFVBQVIsR0FBcUJELEtBQXJCO0FBQ0g7QUFDRCxRQUFJSixRQUFKLEVBQWM7QUFDVkYsZ0JBQVFlLE9BQVIsR0FBa0JmLFFBQVFlLE9BQVIsSUFBbUIsRUFBckM7QUFDQWYsZ0JBQVFlLE9BQVIsQ0FBZ0JDLFFBQWhCLEdBQTJCO0FBQUEsbUJBQU1qQixXQUFOO0FBQUEsU0FBM0I7QUFDQSxZQUFJQyxRQUFRTyxVQUFaLEVBQXdCO0FBQ3BCLHFDQUFhUCxRQUFRTyxVQUFyQjtBQUNIO0FBQ0o7QUFDSiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJlaGF2aW9yIH0gZnJvbSAnLi9iZWhhdmlvcic7XHJcbmltcG9ydCB7IG9ic2VydmVQcm9wcyB9IGZyb20gJy4vcHJvcHMnO1xyXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZSh2YW50T3B0aW9ucywgb3B0aW9ucykge1xyXG4gICAgY29uc3QgeyB3YXRjaCwgY29tcHV0ZWQgfSA9IHZhbnRPcHRpb25zO1xyXG4gICAgb3B0aW9ucy5iZWhhdmlvcnMucHVzaChiZWhhdmlvcik7XHJcbiAgICBpZiAod2F0Y2gpIHtcclxuICAgICAgICBjb25zdCBwcm9wcyA9IG9wdGlvbnMucHJvcGVydGllcyB8fCB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyh3YXRjaCkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5IGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvcCA9IHByb3BzW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcCA9PT0gbnVsbCB8fCAhKCd0eXBlJyBpbiBwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3AgPSB7IHR5cGU6IHByb3AgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByb3Aub2JzZXJ2ZXIgPSB3YXRjaFtrZXldO1xyXG4gICAgICAgICAgICAgICAgcHJvcHNba2V5XSA9IHByb3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBvcHRpb25zLnByb3BlcnRpZXMgPSBwcm9wcztcclxuICAgIH1cclxuICAgIGlmIChjb21wdXRlZCkge1xyXG4gICAgICAgIG9wdGlvbnMubWV0aG9kcyA9IG9wdGlvbnMubWV0aG9kcyB8fCB7fTtcclxuICAgICAgICBvcHRpb25zLm1ldGhvZHMuJG9wdGlvbnMgPSAoKSA9PiB2YW50T3B0aW9ucztcclxuICAgICAgICBpZiAob3B0aW9ucy5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVQcm9wcyhvcHRpb25zLnByb3BlcnRpZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=