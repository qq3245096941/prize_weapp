'use strict';

var _component = require('./../common/component.js');

function emit(target, value) {
    target.$emit('input', value);
    target.$emit('change', value);
}
(0, _component.VantComponent)({
    field: true,
    relation: {
        name: 'checkbox-group',
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
        value: Boolean,
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
            if (this.parent) {
                this.setParentValue(this.parent, value);
            } else {
                emit(this, value);
            }
        },
        toggle: function toggle() {
            var _data = this.data,
                disabled = _data.disabled,
                value = _data.value;

            if (!disabled) {
                this.emitChange(!value);
            }
        },
        onClickLabel: function onClickLabel() {
            var _data2 = this.data,
                labelDisabled = _data2.labelDisabled,
                disabled = _data2.disabled,
                value = _data2.value;

            if (!disabled && !labelDisabled) {
                this.emitChange(!value);
            }
        },
        setParentValue: function setParentValue(parent, value) {
            var parentValue = parent.data.value.slice();
            var name = this.data.name;
            var max = parent.data.max;

            if (value) {
                if (max && parentValue.length >= max) {
                    return;
                }
                if (parentValue.indexOf(name) === -1) {
                    parentValue.push(name);
                    emit(parent, parentValue);
                }
            } else {
                var index = parentValue.indexOf(name);
                if (index !== -1) {
                    parentValue.splice(index, 1);
                    emit(parent, parentValue);
                }
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImVtaXQiLCJ0YXJnZXQiLCJ2YWx1ZSIsIiRlbWl0IiwiZmllbGQiLCJyZWxhdGlvbiIsIm5hbWUiLCJ0eXBlIiwibGlua2VkIiwicGFyZW50IiwidW5saW5rZWQiLCJjbGFzc2VzIiwicHJvcHMiLCJCb29sZWFuIiwiZGlzYWJsZWQiLCJ1c2VJY29uU2xvdCIsImNoZWNrZWRDb2xvciIsIlN0cmluZyIsImxhYmVsUG9zaXRpb24iLCJsYWJlbERpc2FibGVkIiwic2hhcGUiLCJtZXRob2RzIiwiZW1pdENoYW5nZSIsInNldFBhcmVudFZhbHVlIiwidG9nZ2xlIiwiZGF0YSIsIm9uQ2xpY2tMYWJlbCIsInBhcmVudFZhbHVlIiwic2xpY2UiLCJtYXgiLCJsZW5ndGgiLCJpbmRleE9mIiwicHVzaCIsImluZGV4Iiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLFNBQVNBLElBQVQsQ0FBY0MsTUFBZCxFQUFzQkMsS0FBdEIsRUFBNkI7QUFDekJELFdBQU9FLEtBQVAsQ0FBYSxPQUFiLEVBQXNCRCxLQUF0QjtBQUNBRCxXQUFPRSxLQUFQLENBQWEsUUFBYixFQUF1QkQsS0FBdkI7QUFDSDtBQUNELDhCQUFjO0FBQ1ZFLFdBQU8sSUFERztBQUVWQyxjQUFVO0FBQ05DLGNBQU0sZ0JBREE7QUFFTkMsY0FBTSxVQUZBO0FBR05DLGNBSE0sa0JBR0NQLE1BSEQsRUFHUztBQUNYLGlCQUFLUSxNQUFMLEdBQWNSLE1BQWQ7QUFDSCxTQUxLO0FBTU5TLGdCQU5NLHNCQU1LO0FBQ1AsaUJBQUtELE1BQUwsR0FBYyxJQUFkO0FBQ0g7QUFSSyxLQUZBO0FBWVZFLGFBQVMsQ0FBQyxZQUFELEVBQWUsYUFBZixDQVpDO0FBYVZDLFdBQU87QUFDSFYsZUFBT1csT0FESjtBQUVIQyxrQkFBVUQsT0FGUDtBQUdIRSxxQkFBYUYsT0FIVjtBQUlIRyxzQkFBY0MsTUFKWDtBQUtIQyx1QkFBZUQsTUFMWjtBQU1IRSx1QkFBZU4sT0FOWjtBQU9ITyxlQUFPO0FBQ0hiLGtCQUFNVSxNQURIO0FBRUhmLG1CQUFPO0FBRko7QUFQSixLQWJHO0FBeUJWbUIsYUFBUztBQUNMQyxrQkFESyxzQkFDTXBCLEtBRE4sRUFDYTtBQUNkLGdCQUFJLEtBQUtPLE1BQVQsRUFBaUI7QUFDYixxQkFBS2MsY0FBTCxDQUFvQixLQUFLZCxNQUF6QixFQUFpQ1AsS0FBakM7QUFDSCxhQUZELE1BR0s7QUFDREYscUJBQUssSUFBTCxFQUFXRSxLQUFYO0FBQ0g7QUFDSixTQVJJO0FBU0xzQixjQVRLLG9CQVNJO0FBQUEsd0JBQ3VCLEtBQUtDLElBRDVCO0FBQUEsZ0JBQ0dYLFFBREgsU0FDR0EsUUFESDtBQUFBLGdCQUNhWixLQURiLFNBQ2FBLEtBRGI7O0FBRUwsZ0JBQUksQ0FBQ1ksUUFBTCxFQUFlO0FBQ1gscUJBQUtRLFVBQUwsQ0FBZ0IsQ0FBQ3BCLEtBQWpCO0FBQ0g7QUFDSixTQWRJO0FBZUx3QixvQkFmSywwQkFlVTtBQUFBLHlCQUNnQyxLQUFLRCxJQURyQztBQUFBLGdCQUNITixhQURHLFVBQ0hBLGFBREc7QUFBQSxnQkFDWUwsUUFEWixVQUNZQSxRQURaO0FBQUEsZ0JBQ3NCWixLQUR0QixVQUNzQkEsS0FEdEI7O0FBRVgsZ0JBQUksQ0FBQ1ksUUFBRCxJQUFhLENBQUNLLGFBQWxCLEVBQWlDO0FBQzdCLHFCQUFLRyxVQUFMLENBQWdCLENBQUNwQixLQUFqQjtBQUNIO0FBQ0osU0FwQkk7QUFxQkxxQixzQkFyQkssMEJBcUJVZCxNQXJCVixFQXFCa0JQLEtBckJsQixFQXFCeUI7QUFDMUIsZ0JBQU15QixjQUFjbEIsT0FBT2dCLElBQVAsQ0FBWXZCLEtBQVosQ0FBa0IwQixLQUFsQixFQUFwQjtBQUQwQixnQkFFbEJ0QixJQUZrQixHQUVULEtBQUttQixJQUZJLENBRWxCbkIsSUFGa0I7QUFBQSxnQkFHbEJ1QixHQUhrQixHQUdWcEIsT0FBT2dCLElBSEcsQ0FHbEJJLEdBSGtCOztBQUkxQixnQkFBSTNCLEtBQUosRUFBVztBQUNQLG9CQUFJMkIsT0FBT0YsWUFBWUcsTUFBWixJQUFzQkQsR0FBakMsRUFBc0M7QUFDbEM7QUFDSDtBQUNELG9CQUFJRixZQUFZSSxPQUFaLENBQW9CekIsSUFBcEIsTUFBOEIsQ0FBQyxDQUFuQyxFQUFzQztBQUNsQ3FCLGdDQUFZSyxJQUFaLENBQWlCMUIsSUFBakI7QUFDQU4seUJBQUtTLE1BQUwsRUFBYWtCLFdBQWI7QUFDSDtBQUNKLGFBUkQsTUFTSztBQUNELG9CQUFNTSxRQUFRTixZQUFZSSxPQUFaLENBQW9CekIsSUFBcEIsQ0FBZDtBQUNBLG9CQUFJMkIsVUFBVSxDQUFDLENBQWYsRUFBa0I7QUFDZE4sZ0NBQVlPLE1BQVosQ0FBbUJELEtBQW5CLEVBQTBCLENBQTFCO0FBQ0FqQyx5QkFBS1MsTUFBTCxFQUFha0IsV0FBYjtBQUNIO0FBQ0o7QUFDSjtBQXpDSTtBQXpCQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5mdW5jdGlvbiBlbWl0KHRhcmdldCwgdmFsdWUpIHtcclxuICAgIHRhcmdldC4kZW1pdCgnaW5wdXQnLCB2YWx1ZSk7XHJcbiAgICB0YXJnZXQuJGVtaXQoJ2NoYW5nZScsIHZhbHVlKTtcclxufVxyXG5WYW50Q29tcG9uZW50KHtcclxuICAgIGZpZWxkOiB0cnVlLFxyXG4gICAgcmVsYXRpb246IHtcclxuICAgICAgICBuYW1lOiAnY2hlY2tib3gtZ3JvdXAnLFxyXG4gICAgICAgIHR5cGU6ICdhbmNlc3RvcicsXHJcbiAgICAgICAgbGlua2VkKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IHRhcmdldDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVubGlua2VkKCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsYXNzZXM6IFsnaWNvbi1jbGFzcycsICdsYWJlbC1jbGFzcyddLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICB2YWx1ZTogQm9vbGVhbixcclxuICAgICAgICBkaXNhYmxlZDogQm9vbGVhbixcclxuICAgICAgICB1c2VJY29uU2xvdDogQm9vbGVhbixcclxuICAgICAgICBjaGVja2VkQ29sb3I6IFN0cmluZyxcclxuICAgICAgICBsYWJlbFBvc2l0aW9uOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWxEaXNhYmxlZDogQm9vbGVhbixcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiAncm91bmQnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBlbWl0Q2hhbmdlKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYXJlbnRWYWx1ZSh0aGlzLnBhcmVudCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZW1pdCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvZ2dsZSgpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBkaXNhYmxlZCwgdmFsdWUgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlKCF2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xpY2tMYWJlbCgpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBsYWJlbERpc2FibGVkLCBkaXNhYmxlZCwgdmFsdWUgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCAmJiAhbGFiZWxEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0Q2hhbmdlKCF2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFBhcmVudFZhbHVlKHBhcmVudCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50VmFsdWUgPSBwYXJlbnQuZGF0YS52YWx1ZS5zbGljZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgeyBtYXggfSA9IHBhcmVudC5kYXRhO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtYXggJiYgcGFyZW50VmFsdWUubGVuZ3RoID49IG1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRWYWx1ZS5pbmRleE9mKG5hbWUpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudFZhbHVlLnB1c2gobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdChwYXJlbnQsIHBhcmVudFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50VmFsdWUuaW5kZXhPZihuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRWYWx1ZS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXQocGFyZW50LCBwYXJlbnRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=