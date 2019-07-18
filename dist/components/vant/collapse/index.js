'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    relation: {
        name: 'collapse-item',
        type: 'descendant',
        linked: function linked(child) {
            this.children.push(child);
        },
        unlinked: function unlinked(child) {
            this.children = this.children.filter(function (item) {
                return item !== child;
            });
        }
    },
    props: {
        value: {
            type: null,
            observer: 'updateExpanded'
        },
        accordion: {
            type: Boolean,
            observer: 'updateExpanded'
        },
        border: {
            type: Boolean,
            value: true
        }
    },
    beforeCreate: function beforeCreate() {
        this.children = [];
    },

    methods: {
        updateExpanded: function updateExpanded() {
            this.children.forEach(function (child) {
                child.updateExpanded();
            });
        },
        switch: function _switch(name, expanded) {
            var _data = this.data,
                accordion = _data.accordion,
                value = _data.value;

            if (!accordion) {
                name = expanded ? (value || []).concat(name) : (value || []).filter(function (activeName) {
                    return activeName !== name;
                });
            } else {
                name = expanded ? name : '';
            }
            this.$emit('change', name);
            this.$emit('input', name);
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlbGF0aW9uIiwibmFtZSIsInR5cGUiLCJsaW5rZWQiLCJjaGlsZCIsImNoaWxkcmVuIiwicHVzaCIsInVubGlua2VkIiwiZmlsdGVyIiwiaXRlbSIsInByb3BzIiwidmFsdWUiLCJvYnNlcnZlciIsImFjY29yZGlvbiIsIkJvb2xlYW4iLCJib3JkZXIiLCJiZWZvcmVDcmVhdGUiLCJtZXRob2RzIiwidXBkYXRlRXhwYW5kZWQiLCJmb3JFYWNoIiwic3dpdGNoIiwiZXhwYW5kZWQiLCJkYXRhIiwiY29uY2F0IiwiYWN0aXZlTmFtZSIsIiRlbWl0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLDhCQUFjO0FBQ1ZBLGNBQVU7QUFDTkMsY0FBTSxlQURBO0FBRU5DLGNBQU0sWUFGQTtBQUdOQyxjQUhNLGtCQUdDQyxLQUhELEVBR1E7QUFDVixpQkFBS0MsUUFBTCxDQUFjQyxJQUFkLENBQW1CRixLQUFuQjtBQUNILFNBTEs7QUFNTkcsZ0JBTk0sb0JBTUdILEtBTkgsRUFNVTtBQUNaLGlCQUFLQyxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY0csTUFBZCxDQUFxQixVQUFDQyxJQUFEO0FBQUEsdUJBQVVBLFNBQVNMLEtBQW5CO0FBQUEsYUFBckIsQ0FBaEI7QUFDSDtBQVJLLEtBREE7QUFXVk0sV0FBTztBQUNIQyxlQUFPO0FBQ0hULGtCQUFNLElBREg7QUFFSFUsc0JBQVU7QUFGUCxTQURKO0FBS0hDLG1CQUFXO0FBQ1BYLGtCQUFNWSxPQURDO0FBRVBGLHNCQUFVO0FBRkgsU0FMUjtBQVNIRyxnQkFBUTtBQUNKYixrQkFBTVksT0FERjtBQUVKSCxtQkFBTztBQUZIO0FBVEwsS0FYRztBQXlCVkssZ0JBekJVLDBCQXlCSztBQUNYLGFBQUtYLFFBQUwsR0FBZ0IsRUFBaEI7QUFDSCxLQTNCUzs7QUE0QlZZLGFBQVM7QUFDTEMsc0JBREssNEJBQ1k7QUFDYixpQkFBS2IsUUFBTCxDQUFjYyxPQUFkLENBQXNCLFVBQUNmLEtBQUQsRUFBVztBQUM3QkEsc0JBQU1jLGNBQU47QUFDSCxhQUZEO0FBR0gsU0FMSTtBQU1MRSxjQU5LLG1CQU1FbkIsSUFORixFQU1Rb0IsUUFOUixFQU1rQjtBQUFBLHdCQUNVLEtBQUtDLElBRGY7QUFBQSxnQkFDWFQsU0FEVyxTQUNYQSxTQURXO0FBQUEsZ0JBQ0FGLEtBREEsU0FDQUEsS0FEQTs7QUFFbkIsZ0JBQUksQ0FBQ0UsU0FBTCxFQUFnQjtBQUNaWix1QkFBT29CLFdBQ0QsQ0FBQ1YsU0FBUyxFQUFWLEVBQWNZLE1BQWQsQ0FBcUJ0QixJQUFyQixDQURDLEdBRUQsQ0FBQ1UsU0FBUyxFQUFWLEVBQWNILE1BQWQsQ0FBcUIsVUFBQ2dCLFVBQUQ7QUFBQSwyQkFBZ0JBLGVBQWV2QixJQUEvQjtBQUFBLGlCQUFyQixDQUZOO0FBR0gsYUFKRCxNQUtLO0FBQ0RBLHVCQUFPb0IsV0FBV3BCLElBQVgsR0FBa0IsRUFBekI7QUFDSDtBQUNELGlCQUFLd0IsS0FBTCxDQUFXLFFBQVgsRUFBcUJ4QixJQUFyQjtBQUNBLGlCQUFLd0IsS0FBTCxDQUFXLE9BQVgsRUFBb0J4QixJQUFwQjtBQUNIO0FBbEJJO0FBNUJDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgcmVsYXRpb246IHtcclxuICAgICAgICBuYW1lOiAnY29sbGFwc2UtaXRlbScsXHJcbiAgICAgICAgdHlwZTogJ2Rlc2NlbmRhbnQnLFxyXG4gICAgICAgIGxpbmtlZChjaGlsZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdW5saW5rZWQoY2hpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4uZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBjaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgdHlwZTogbnVsbCxcclxuICAgICAgICAgICAgb2JzZXJ2ZXI6ICd1cGRhdGVFeHBhbmRlZCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjY29yZGlvbjoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBvYnNlcnZlcjogJ3VwZGF0ZUV4cGFuZGVkJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9yZGVyOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJlZm9yZUNyZWF0ZSgpIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIHVwZGF0ZUV4cGFuZGVkKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC51cGRhdGVFeHBhbmRlZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN3aXRjaChuYW1lLCBleHBhbmRlZCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGFjY29yZGlvbiwgdmFsdWUgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgaWYgKCFhY2NvcmRpb24pIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBleHBhbmRlZFxyXG4gICAgICAgICAgICAgICAgICAgID8gKHZhbHVlIHx8IFtdKS5jb25jYXQobmFtZSlcclxuICAgICAgICAgICAgICAgICAgICA6ICh2YWx1ZSB8fCBbXSkuZmlsdGVyKChhY3RpdmVOYW1lKSA9PiBhY3RpdmVOYW1lICE9PSBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBleHBhbmRlZCA/IG5hbWUgOiAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBuYW1lKTtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=