'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    relation: {
        name: 'badge',
        type: 'descendant',
        linked: function linked(target) {
            this.badges.push(target);
            this.setActive(this.data.active);
        },
        unlinked: function unlinked(target) {
            this.badges = this.badges.filter(function (item) {
                return item !== target;
            });
            this.setActive(this.data.active);
        }
    },
    props: {
        active: {
            type: Number,
            value: 0,
            observer: 'setActive'
        }
    },
    beforeCreate: function beforeCreate() {
        this.badges = [];
        this.currentActive = -1;
    },

    methods: {
        setActive: function setActive(active) {
            var badges = this.badges,
                currentActive = this.currentActive;

            if (!badges.length) {
                return Promise.resolve();
            }
            this.currentActive = active;
            var stack = [];
            if (currentActive !== active && badges[currentActive]) {
                stack.push(badges[currentActive].setActive(false));
            }
            if (badges[active]) {
                stack.push(badges[active].setActive(true));
            }
            return Promise.all(stack);
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlbGF0aW9uIiwibmFtZSIsInR5cGUiLCJsaW5rZWQiLCJ0YXJnZXQiLCJiYWRnZXMiLCJwdXNoIiwic2V0QWN0aXZlIiwiZGF0YSIsImFjdGl2ZSIsInVubGlua2VkIiwiZmlsdGVyIiwiaXRlbSIsInByb3BzIiwiTnVtYmVyIiwidmFsdWUiLCJvYnNlcnZlciIsImJlZm9yZUNyZWF0ZSIsImN1cnJlbnRBY3RpdmUiLCJtZXRob2RzIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzdGFjayIsImFsbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQSw4QkFBYztBQUNWQSxjQUFVO0FBQ05DLGNBQU0sT0FEQTtBQUVOQyxjQUFNLFlBRkE7QUFHTkMsY0FITSxrQkFHQ0MsTUFIRCxFQUdTO0FBQ1gsaUJBQUtDLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkYsTUFBakI7QUFDQSxpQkFBS0csU0FBTCxDQUFlLEtBQUtDLElBQUwsQ0FBVUMsTUFBekI7QUFDSCxTQU5LO0FBT05DLGdCQVBNLG9CQU9HTixNQVBILEVBT1c7QUFDYixpQkFBS0MsTUFBTCxHQUFjLEtBQUtBLE1BQUwsQ0FBWU0sTUFBWixDQUFtQjtBQUFBLHVCQUFRQyxTQUFTUixNQUFqQjtBQUFBLGFBQW5CLENBQWQ7QUFDQSxpQkFBS0csU0FBTCxDQUFlLEtBQUtDLElBQUwsQ0FBVUMsTUFBekI7QUFDSDtBQVZLLEtBREE7QUFhVkksV0FBTztBQUNISixnQkFBUTtBQUNKUCxrQkFBTVksTUFERjtBQUVKQyxtQkFBTyxDQUZIO0FBR0pDLHNCQUFVO0FBSE47QUFETCxLQWJHO0FBb0JWQyxnQkFwQlUsMEJBb0JLO0FBQ1gsYUFBS1osTUFBTCxHQUFjLEVBQWQ7QUFDQSxhQUFLYSxhQUFMLEdBQXFCLENBQUMsQ0FBdEI7QUFDSCxLQXZCUzs7QUF3QlZDLGFBQVM7QUFDTFosaUJBREsscUJBQ0tFLE1BREwsRUFDYTtBQUFBLGdCQUNOSixNQURNLEdBQ29CLElBRHBCLENBQ05BLE1BRE07QUFBQSxnQkFDRWEsYUFERixHQUNvQixJQURwQixDQUNFQSxhQURGOztBQUVkLGdCQUFJLENBQUNiLE9BQU9lLE1BQVosRUFBb0I7QUFDaEIsdUJBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNIO0FBQ0QsaUJBQUtKLGFBQUwsR0FBcUJULE1BQXJCO0FBQ0EsZ0JBQU1jLFFBQVEsRUFBZDtBQUNBLGdCQUFJTCxrQkFBa0JULE1BQWxCLElBQTRCSixPQUFPYSxhQUFQLENBQWhDLEVBQXVEO0FBQ25ESyxzQkFBTWpCLElBQU4sQ0FBV0QsT0FBT2EsYUFBUCxFQUFzQlgsU0FBdEIsQ0FBZ0MsS0FBaEMsQ0FBWDtBQUNIO0FBQ0QsZ0JBQUlGLE9BQU9JLE1BQVAsQ0FBSixFQUFvQjtBQUNoQmMsc0JBQU1qQixJQUFOLENBQVdELE9BQU9JLE1BQVAsRUFBZUYsU0FBZixDQUF5QixJQUF6QixDQUFYO0FBQ0g7QUFDRCxtQkFBT2MsUUFBUUcsR0FBUixDQUFZRCxLQUFaLENBQVA7QUFDSDtBQWZJO0FBeEJDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgcmVsYXRpb246IHtcclxuICAgICAgICBuYW1lOiAnYmFkZ2UnLFxyXG4gICAgICAgIHR5cGU6ICdkZXNjZW5kYW50JyxcclxuICAgICAgICBsaW5rZWQodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFkZ2VzLnB1c2godGFyZ2V0KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmUodGhpcy5kYXRhLmFjdGl2ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bmxpbmtlZCh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5iYWRnZXMgPSB0aGlzLmJhZGdlcy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSB0YXJnZXQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZSh0aGlzLmRhdGEuYWN0aXZlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICBhY3RpdmU6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgb2JzZXJ2ZXI6ICdzZXRBY3RpdmUnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJlZm9yZUNyZWF0ZSgpIHtcclxuICAgICAgICB0aGlzLmJhZGdlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEFjdGl2ZSA9IC0xO1xyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBzZXRBY3RpdmUoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgYmFkZ2VzLCBjdXJyZW50QWN0aXZlIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIWJhZGdlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBY3RpdmUgPSBhY3RpdmU7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YWNrID0gW107XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50QWN0aXZlICE9PSBhY3RpdmUgJiYgYmFkZ2VzW2N1cnJlbnRBY3RpdmVdKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKGJhZGdlc1tjdXJyZW50QWN0aXZlXS5zZXRBY3RpdmUoZmFsc2UpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYmFkZ2VzW2FjdGl2ZV0pIHtcclxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goYmFkZ2VzW2FjdGl2ZV0uc2V0QWN0aXZlKHRydWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoc3RhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==