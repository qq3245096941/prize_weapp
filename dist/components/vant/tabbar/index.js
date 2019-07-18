'use strict';

var _component = require('./../common/component.js');

var _safeArea = require('./../mixins/safe-area.js');

(0, _component.VantComponent)({
    mixins: [(0, _safeArea.safeArea)()],
    relation: {
        name: 'tabbar-item',
        type: 'descendant',
        linked: function linked(target) {
            this.children = this.children || [];
            this.children.push(target);
            this.setActiveItem();
        },
        unlinked: function unlinked(target) {
            this.children = this.children || [];
            this.children = this.children.filter(function (item) {
                return item !== target;
            });
            this.setActiveItem();
        }
    },
    props: {
        active: Number,
        activeColor: String,
        fixed: {
            type: Boolean,
            value: true
        },
        border: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 1
        }
    },
    watch: {
        active: function active(_active) {
            this.currentActive = _active;
            this.setActiveItem();
        }
    },
    created: function created() {
        this.currentActive = this.data.active;
    },

    methods: {
        setActiveItem: function setActiveItem() {
            var _this = this;

            if (!Array.isArray(this.children) || !this.children.length) {
                return Promise.resolve();
            }
            return Promise.all(this.children.map(function (item, index) {
                return item.setActive({
                    active: index === _this.currentActive,
                    color: _this.data.activeColor
                });
            }));
        },
        onChange: function onChange(child) {
            var _this2 = this;

            var active = (this.children || []).indexOf(child);
            if (active !== this.currentActive && active !== -1) {
                this.currentActive = active;
                this.setActiveItem().then(function () {
                    _this2.$emit('change', active);
                });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1peGlucyIsInJlbGF0aW9uIiwibmFtZSIsInR5cGUiLCJsaW5rZWQiLCJ0YXJnZXQiLCJjaGlsZHJlbiIsInB1c2giLCJzZXRBY3RpdmVJdGVtIiwidW5saW5rZWQiLCJmaWx0ZXIiLCJpdGVtIiwicHJvcHMiLCJhY3RpdmUiLCJOdW1iZXIiLCJhY3RpdmVDb2xvciIsIlN0cmluZyIsImZpeGVkIiwiQm9vbGVhbiIsInZhbHVlIiwiYm9yZGVyIiwiekluZGV4Iiwid2F0Y2giLCJjdXJyZW50QWN0aXZlIiwiY3JlYXRlZCIsImRhdGEiLCJtZXRob2RzIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJhbGwiLCJtYXAiLCJpbmRleCIsInNldEFjdGl2ZSIsImNvbG9yIiwib25DaGFuZ2UiLCJjaGlsZCIsImluZGV4T2YiLCJ0aGVuIiwiJGVtaXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0EsOEJBQWM7QUFDVkEsWUFBUSxDQUFDLHlCQUFELENBREU7QUFFVkMsY0FBVTtBQUNOQyxjQUFNLGFBREE7QUFFTkMsY0FBTSxZQUZBO0FBR05DLGNBSE0sa0JBR0NDLE1BSEQsRUFHUztBQUNYLGlCQUFLQyxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsSUFBaUIsRUFBakM7QUFDQSxpQkFBS0EsUUFBTCxDQUFjQyxJQUFkLENBQW1CRixNQUFuQjtBQUNBLGlCQUFLRyxhQUFMO0FBQ0gsU0FQSztBQVFOQyxnQkFSTSxvQkFRR0osTUFSSCxFQVFXO0FBQ2IsaUJBQUtDLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxJQUFpQixFQUFqQztBQUNBLGlCQUFLQSxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY0ksTUFBZCxDQUFxQjtBQUFBLHVCQUFRQyxTQUFTTixNQUFqQjtBQUFBLGFBQXJCLENBQWhCO0FBQ0EsaUJBQUtHLGFBQUw7QUFDSDtBQVpLLEtBRkE7QUFnQlZJLFdBQU87QUFDSEMsZ0JBQVFDLE1BREw7QUFFSEMscUJBQWFDLE1BRlY7QUFHSEMsZUFBTztBQUNIZCxrQkFBTWUsT0FESDtBQUVIQyxtQkFBTztBQUZKLFNBSEo7QUFPSEMsZ0JBQVE7QUFDSmpCLGtCQUFNZSxPQURGO0FBRUpDLG1CQUFPO0FBRkgsU0FQTDtBQVdIRSxnQkFBUTtBQUNKbEIsa0JBQU1XLE1BREY7QUFFSkssbUJBQU87QUFGSDtBQVhMLEtBaEJHO0FBZ0NWRyxXQUFPO0FBQ0hULGNBREcsa0JBQ0lBLE9BREosRUFDWTtBQUNYLGlCQUFLVSxhQUFMLEdBQXFCVixPQUFyQjtBQUNBLGlCQUFLTCxhQUFMO0FBQ0g7QUFKRSxLQWhDRztBQXNDVmdCLFdBdENVLHFCQXNDQTtBQUNOLGFBQUtELGFBQUwsR0FBcUIsS0FBS0UsSUFBTCxDQUFVWixNQUEvQjtBQUNILEtBeENTOztBQXlDVmEsYUFBUztBQUNMbEIscUJBREssMkJBQ1c7QUFBQTs7QUFDWixnQkFBSSxDQUFDbUIsTUFBTUMsT0FBTixDQUFjLEtBQUt0QixRQUFuQixDQUFELElBQWlDLENBQUMsS0FBS0EsUUFBTCxDQUFjdUIsTUFBcEQsRUFBNEQ7QUFDeEQsdUJBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNIO0FBQ0QsbUJBQU9ELFFBQVFFLEdBQVIsQ0FBWSxLQUFLMUIsUUFBTCxDQUFjMkIsR0FBZCxDQUFrQixVQUFDdEIsSUFBRCxFQUFPdUIsS0FBUDtBQUFBLHVCQUFpQnZCLEtBQUt3QixTQUFMLENBQWU7QUFDakV0Qiw0QkFBUXFCLFVBQVUsTUFBS1gsYUFEMEM7QUFFakVhLDJCQUFPLE1BQUtYLElBQUwsQ0FBVVY7QUFGZ0QsaUJBQWYsQ0FBakI7QUFBQSxhQUFsQixDQUFaLENBQVA7QUFJSCxTQVRJO0FBVUxzQixnQkFWSyxvQkFVSUMsS0FWSixFQVVXO0FBQUE7O0FBQ1osZ0JBQU16QixTQUFTLENBQUMsS0FBS1AsUUFBTCxJQUFpQixFQUFsQixFQUFzQmlDLE9BQXRCLENBQThCRCxLQUE5QixDQUFmO0FBQ0EsZ0JBQUl6QixXQUFXLEtBQUtVLGFBQWhCLElBQWlDVixXQUFXLENBQUMsQ0FBakQsRUFBb0Q7QUFDaEQscUJBQUtVLGFBQUwsR0FBcUJWLE1BQXJCO0FBQ0EscUJBQUtMLGFBQUwsR0FBcUJnQyxJQUFyQixDQUEwQixZQUFNO0FBQzVCLDJCQUFLQyxLQUFMLENBQVcsUUFBWCxFQUFxQjVCLE1BQXJCO0FBQ0gsaUJBRkQ7QUFHSDtBQUNKO0FBbEJJO0FBekNDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IHNhZmVBcmVhIH0gZnJvbSAnLi4vbWl4aW5zL3NhZmUtYXJlYSc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgbWl4aW5zOiBbc2FmZUFyZWEoKV0sXHJcbiAgICByZWxhdGlvbjoge1xyXG4gICAgICAgIG5hbWU6ICd0YWJiYXItaXRlbScsXHJcbiAgICAgICAgdHlwZTogJ2Rlc2NlbmRhbnQnLFxyXG4gICAgICAgIGxpbmtlZCh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4gfHwgW107XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW0oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVubGlua2VkKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbiB8fCBbXTtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4uZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdGFyZ2V0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgYWN0aXZlOiBOdW1iZXIsXHJcbiAgICAgICAgYWN0aXZlQ29sb3I6IFN0cmluZyxcclxuICAgICAgICBmaXhlZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9yZGVyOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB6SW5kZXg6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIGFjdGl2ZShhY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QWN0aXZlID0gYWN0aXZlO1xyXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRBY3RpdmUgPSB0aGlzLmRhdGEuYWN0aXZlO1xyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBzZXRBY3RpdmVJdGVtKCkge1xyXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5jaGlsZHJlbikgfHwgIXRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuY2hpbGRyZW4ubWFwKChpdGVtLCBpbmRleCkgPT4gaXRlbS5zZXRBY3RpdmUoe1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBpbmRleCA9PT0gdGhpcy5jdXJyZW50QWN0aXZlLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuZGF0YS5hY3RpdmVDb2xvclxyXG4gICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DaGFuZ2UoY2hpbGQpIHtcclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gKHRoaXMuY2hpbGRyZW4gfHwgW10pLmluZGV4T2YoY2hpbGQpO1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlICE9PSB0aGlzLmN1cnJlbnRBY3RpdmUgJiYgYWN0aXZlICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QWN0aXZlID0gYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgYWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19