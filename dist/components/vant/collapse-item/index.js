'use strict';

var _component = require('./../common/component.js');

var nextTick = function nextTick() {
    return new Promise(function (resolve) {
        return setTimeout(resolve, 20);
    });
};
(0, _component.VantComponent)({
    classes: ['title-class', 'content-class'],
    relation: {
        name: 'collapse',
        type: 'ancestor',
        linked: function linked(parent) {
            this.parent = parent;
        }
    },
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        clickable: Boolean,
        border: {
            type: Boolean,
            value: true
        },
        isLink: {
            type: Boolean,
            value: true
        }
    },
    data: {
        contentHeight: 0,
        expanded: false,
        transition: false
    },
    mounted: function mounted() {
        var _this = this;

        this.updateExpanded().then(nextTick).then(function () {
            _this.set({ transition: true });
        });
    },

    methods: {
        updateExpanded: function updateExpanded() {
            if (!this.parent) {
                return Promise.resolve();
            }
            var _parent$data = this.parent.data,
                value = _parent$data.value,
                accordion = _parent$data.accordion;
            var _parent$children = this.parent.children,
                children = _parent$children === undefined ? [] : _parent$children;
            var name = this.data.name;

            var index = children.indexOf(this);
            var currentName = name == null ? index : name;
            var expanded = accordion ? value === currentName : (value || []).some(function (name) {
                return name === currentName;
            });
            var stack = [];
            if (expanded !== this.data.expanded) {
                stack.push(this.updateStyle(expanded));
            }
            stack.push(this.set({ index: index, expanded: expanded }));
            return Promise.all(stack);
        },
        updateStyle: function updateStyle(expanded) {
            var _this2 = this;

            return this.getRect('.van-collapse-item__content').then(function (rect) {
                return rect.height;
            }).then(function (height) {
                if (expanded) {
                    return _this2.set({
                        contentHeight: height ? height + 'px' : 'auto'
                    });
                } else {
                    return _this2.set({ contentHeight: height + 'px' }).then(nextTick).then(function () {
                        return _this2.set({ contentHeight: 0 });
                    });
                }
            });
        },
        onClick: function onClick() {
            if (this.data.disabled) {
                return;
            }
            var _data = this.data,
                name = _data.name,
                expanded = _data.expanded;

            var index = this.parent.children.indexOf(this);
            var currentName = name == null ? index : name;
            this.parent.switch(currentName, !expanded);
        },
        onTransitionEnd: function onTransitionEnd() {
            if (this.data.expanded) {
                this.set({
                    contentHeight: 'auto'
                });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm5leHRUaWNrIiwiUHJvbWlzZSIsInNldFRpbWVvdXQiLCJyZXNvbHZlIiwiY2xhc3NlcyIsInJlbGF0aW9uIiwibmFtZSIsInR5cGUiLCJsaW5rZWQiLCJwYXJlbnQiLCJwcm9wcyIsInRpdGxlIiwidmFsdWUiLCJpY29uIiwiU3RyaW5nIiwibGFiZWwiLCJkaXNhYmxlZCIsIkJvb2xlYW4iLCJjbGlja2FibGUiLCJib3JkZXIiLCJpc0xpbmsiLCJkYXRhIiwiY29udGVudEhlaWdodCIsImV4cGFuZGVkIiwidHJhbnNpdGlvbiIsIm1vdW50ZWQiLCJ1cGRhdGVFeHBhbmRlZCIsInRoZW4iLCJzZXQiLCJtZXRob2RzIiwiYWNjb3JkaW9uIiwiY2hpbGRyZW4iLCJpbmRleCIsImluZGV4T2YiLCJjdXJyZW50TmFtZSIsInNvbWUiLCJzdGFjayIsInB1c2giLCJ1cGRhdGVTdHlsZSIsImFsbCIsImdldFJlY3QiLCJyZWN0IiwiaGVpZ2h0Iiwib25DbGljayIsInN3aXRjaCIsIm9uVHJhbnNpdGlvbkVuZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVc7QUFBQSxXQUFNLElBQUlDLE9BQUosQ0FBWTtBQUFBLGVBQVdDLFdBQVdDLE9BQVgsRUFBb0IsRUFBcEIsQ0FBWDtBQUFBLEtBQVosQ0FBTjtBQUFBLENBQWpCO0FBQ0EsOEJBQWM7QUFDVkMsYUFBUyxDQUFDLGFBQUQsRUFBZ0IsZUFBaEIsQ0FEQztBQUVWQyxjQUFVO0FBQ05DLGNBQU0sVUFEQTtBQUVOQyxjQUFNLFVBRkE7QUFHTkMsY0FITSxrQkFHQ0MsTUFIRCxFQUdTO0FBQ1gsaUJBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNIO0FBTEssS0FGQTtBQVNWQyxXQUFPO0FBQ0hKLGNBQU0sSUFESDtBQUVISyxlQUFPLElBRko7QUFHSEMsZUFBTyxJQUhKO0FBSUhDLGNBQU1DLE1BSkg7QUFLSEMsZUFBT0QsTUFMSjtBQU1IRSxr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QixNQUFMLENBQVlzQixRQUFaLENBQXFCRSxPQUFyQixDQUE2QixJQUE3QixDQUFkO0FBQ0EsZ0JBQU1DLGNBQWM1QixRQUFRLElBQVIsR0FBZTBCLEtBQWYsR0FBdUIxQixJQUEzQztBQUNBLGlCQUFLRyxNQUFMLENBQVltQyxNQUFaLENBQW1CVixXQUFuQixFQUFnQyxDQUFDWCxRQUFqQztBQUNILFNBNUNJO0FBNkNMc0IsdUJBN0NLLDZCQTZDYTtBQUNkLGdCQUFJLEtBQUt4QixJQUFMLENBQVVFLFFBQWQsRUFBd0I7QUFDcEIscUJBQUtLLEdBQUwsQ0FBUztBQUNMTixtQ0FBZTtBQURWLGlCQUFUO0FBR0g7QUFDSjtBQW5ESTtBQXRDQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5jb25zdCBuZXh0VGljayA9ICgpID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMCkpO1xyXG5WYW50Q29tcG9uZW50KHtcclxuICAgIGNsYXNzZXM6IFsndGl0bGUtY2xhc3MnLCAnY29udGVudC1jbGFzcyddLFxyXG4gICAgcmVsYXRpb246IHtcclxuICAgICAgICBuYW1lOiAnY29sbGFwc2UnLFxyXG4gICAgICAgIHR5cGU6ICdhbmNlc3RvcicsXHJcbiAgICAgICAgbGlua2VkKHBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICBuYW1lOiBudWxsLFxyXG4gICAgICAgIHRpdGxlOiBudWxsLFxyXG4gICAgICAgIHZhbHVlOiBudWxsLFxyXG4gICAgICAgIGljb246IFN0cmluZyxcclxuICAgICAgICBsYWJlbDogU3RyaW5nLFxyXG4gICAgICAgIGRpc2FibGVkOiBCb29sZWFuLFxyXG4gICAgICAgIGNsaWNrYWJsZTogQm9vbGVhbixcclxuICAgICAgICBib3JkZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgdmFsdWU6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzTGluazoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgY29udGVudEhlaWdodDogMCxcclxuICAgICAgICBleHBhbmRlZDogZmFsc2UsXHJcbiAgICAgICAgdHJhbnNpdGlvbjogZmFsc2VcclxuICAgIH0sXHJcbiAgICBtb3VudGVkKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRXhwYW5kZWQoKVxyXG4gICAgICAgICAgICAudGhlbihuZXh0VGljaylcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldCh7IHRyYW5zaXRpb246IHRydWUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIHVwZGF0ZUV4cGFuZGVkKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgeyB2YWx1ZSwgYWNjb3JkaW9uIH0gPSB0aGlzLnBhcmVudC5kYXRhO1xyXG4gICAgICAgICAgICBjb25zdCB7IGNoaWxkcmVuID0gW10gfSA9IHRoaXMucGFyZW50O1xyXG4gICAgICAgICAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKHRoaXMpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TmFtZSA9IG5hbWUgPT0gbnVsbCA/IGluZGV4IDogbmFtZTtcclxuICAgICAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBhY2NvcmRpb25cclxuICAgICAgICAgICAgICAgID8gdmFsdWUgPT09IGN1cnJlbnROYW1lXHJcbiAgICAgICAgICAgICAgICA6ICh2YWx1ZSB8fCBbXSkuc29tZSgobmFtZSkgPT4gbmFtZSA9PT0gY3VycmVudE5hbWUpO1xyXG4gICAgICAgICAgICBjb25zdCBzdGFjayA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoZXhwYW5kZWQgIT09IHRoaXMuZGF0YS5leHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0aGlzLnVwZGF0ZVN0eWxlKGV4cGFuZGVkKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhY2sucHVzaCh0aGlzLnNldCh7IGluZGV4LCBleHBhbmRlZCB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChzdGFjayk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGVTdHlsZShleHBhbmRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZWN0KCcudmFuLWNvbGxhcHNlLWl0ZW1fX2NvbnRlbnQnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlY3QpID0+IHJlY3QuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGhlaWdodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEhlaWdodDogaGVpZ2h0ID8gYCR7aGVpZ2h0fXB4YCA6ICdhdXRvJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0KHsgY29udGVudEhlaWdodDogYCR7aGVpZ2h0fXB4YCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihuZXh0VGljaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5zZXQoeyBjb250ZW50SGVpZ2h0OiAwIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNsaWNrKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgeyBuYW1lLCBleHBhbmRlZCB9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnROYW1lID0gbmFtZSA9PSBudWxsID8gaW5kZXggOiBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5zd2l0Y2goY3VycmVudE5hbWUsICFleHBhbmRlZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50SGVpZ2h0OiAnYXV0bydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19