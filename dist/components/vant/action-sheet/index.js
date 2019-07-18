'use strict';

var _component = require('./../common/component.js');

var _safeArea = require('./../mixins/safe-area.js');

(0, _component.VantComponent)({
    mixins: [(0, _safeArea.safeArea)()],
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        zIndex: {
            type: Number,
            value: 100
        },
        actions: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        onSelect: function onSelect(event) {
            var index = event.currentTarget.dataset.index;

            var item = this.data.actions[index];
            if (item && !item.disabled && !item.loading) {
                this.$emit('select', item);
            }
        },
        onCancel: function onCancel() {
            this.$emit('cancel');
        },
        onClose: function onClose() {
            this.$emit('close');
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm1peGlucyIsInByb3BzIiwic2hvdyIsIkJvb2xlYW4iLCJ0aXRsZSIsIlN0cmluZyIsImNhbmNlbFRleHQiLCJ6SW5kZXgiLCJ0eXBlIiwiTnVtYmVyIiwidmFsdWUiLCJhY3Rpb25zIiwiQXJyYXkiLCJvdmVybGF5IiwiY2xvc2VPbkNsaWNrT3ZlcmxheSIsIm1ldGhvZHMiLCJvblNlbGVjdCIsImV2ZW50IiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIml0ZW0iLCJkYXRhIiwiZGlzYWJsZWQiLCJsb2FkaW5nIiwiJGVtaXQiLCJvbkNhbmNlbCIsIm9uQ2xvc2UiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0EsOEJBQWM7QUFDVkEsWUFBUSxDQUFDLHlCQUFELENBREU7QUFFVkMsV0FBTztBQUNIQyxjQUFNQyxPQURIO0FBRUhDLGVBQU9DLE1BRko7QUFHSEMsb0JBQVlELE1BSFQ7QUFJSEUsZ0JBQVE7QUFDSkMsa0JBQU1DLE1BREY7QUFFSkMsbUJBQU87QUFGSCxTQUpMO0FBUUhDLGlCQUFTO0FBQ0xILGtCQUFNSSxLQUREO0FBRUxGLG1CQUFPO0FBRkYsU0FSTjtBQVlIRyxpQkFBUztBQUNMTCxrQkFBTUwsT0FERDtBQUVMTyxtQkFBTztBQUZGLFNBWk47QUFnQkhJLDZCQUFxQjtBQUNqQk4sa0JBQU1MLE9BRFc7QUFFakJPLG1CQUFPO0FBRlU7QUFoQmxCLEtBRkc7QUF1QlZLLGFBQVM7QUFDTEMsZ0JBREssb0JBQ0lDLEtBREosRUFDVztBQUFBLGdCQUNKQyxLQURJLEdBQ01ELE1BQU1FLGFBQU4sQ0FBb0JDLE9BRDFCLENBQ0pGLEtBREk7O0FBRVosZ0JBQU1HLE9BQU8sS0FBS0MsSUFBTCxDQUFVWCxPQUFWLENBQWtCTyxLQUFsQixDQUFiO0FBQ0EsZ0JBQUlHLFFBQVEsQ0FBQ0EsS0FBS0UsUUFBZCxJQUEwQixDQUFDRixLQUFLRyxPQUFwQyxFQUE2QztBQUN6QyxxQkFBS0MsS0FBTCxDQUFXLFFBQVgsRUFBcUJKLElBQXJCO0FBQ0g7QUFDSixTQVBJO0FBUUxLLGdCQVJLLHNCQVFNO0FBQ1AsaUJBQUtELEtBQUwsQ0FBVyxRQUFYO0FBQ0gsU0FWSTtBQVdMRSxlQVhLLHFCQVdLO0FBQ04saUJBQUtGLEtBQUwsQ0FBVyxPQUFYO0FBQ0g7QUFiSTtBQXZCQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBzYWZlQXJlYSB9IGZyb20gJy4uL21peGlucy9zYWZlLWFyZWEnO1xyXG5WYW50Q29tcG9uZW50KHtcclxuICAgIG1peGluczogW3NhZmVBcmVhKCldLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICBzaG93OiBCb29sZWFuLFxyXG4gICAgICAgIHRpdGxlOiBTdHJpbmcsXHJcbiAgICAgICAgY2FuY2VsVGV4dDogU3RyaW5nLFxyXG4gICAgICAgIHpJbmRleDoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiAxMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgdHlwZTogQXJyYXksXHJcbiAgICAgICAgICAgIHZhbHVlOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3ZlcmxheToge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xvc2VPbkNsaWNrT3ZlcmxheToge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25TZWxlY3QoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBpbmRleCB9ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0O1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5kYXRhLmFjdGlvbnNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAmJiAhaXRlbS5kaXNhYmxlZCAmJiAhaXRlbS5sb2FkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnLCBpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DYW5jZWwoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DbG9zZSgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=