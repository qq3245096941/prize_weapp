'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    field: true,
    classes: ['icon-class'],
    props: {
        value: Number,
        readonly: Boolean,
        disabled: Boolean,
        allowHalf: Boolean,
        size: {
            type: Number,
            value: 20
        },
        icon: {
            type: String,
            value: 'star'
        },
        voidIcon: {
            type: String,
            value: 'star-o'
        },
        color: {
            type: String,
            value: '#ffd21e'
        },
        voidColor: {
            type: String,
            value: '#c7c7c7'
        },
        disabledColor: {
            type: String,
            value: '#bdbdbd'
        },
        count: {
            type: Number,
            value: 5
        }
    },
    data: {
        innerValue: 0
    },
    watch: {
        value: function value(_value) {
            if (_value !== this.data.innerValue) {
                this.set({ innerValue: _value });
            }
        }
    },
    methods: {
        onSelect: function onSelect(event) {
            var data = this.data;
            var score = event.currentTarget.dataset.score;

            if (!data.disabled && !data.readonly) {
                this.set({ innerValue: score + 1 });
                this.$emit('input', score + 1);
                this.$emit('change', score + 1);
            }
        },
        onTouchMove: function onTouchMove(event) {
            var _this = this;

            var _event$touches$ = event.touches[0],
                clientX = _event$touches$.clientX,
                clientY = _event$touches$.clientY;

            this.getRect('.van-rate__icon', true).then(function (list) {
                var target = list.sort(function (item) {
                    return item.right - item.left;
                }).find(function (item) {
                    return clientX >= item.left && clientX <= item.right && clientY >= item.top && clientY <= item.bottom;
                });
                if (target != null) {
                    _this.onSelect(Object.assign({}, event, { currentTarget: target }));
                }
            });
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpZWxkIiwiY2xhc3NlcyIsInByb3BzIiwidmFsdWUiLCJOdW1iZXIiLCJyZWFkb25seSIsIkJvb2xlYW4iLCJkaXNhYmxlZCIsImFsbG93SGFsZiIsInNpemUiLCJ0eXBlIiwiaWNvbiIsIlN0cmluZyIsInZvaWRJY29uIiwiY29sb3IiLCJ2b2lkQ29sb3IiLCJkaXNhYmxlZENvbG9yIiwiY291bnQiLCJkYXRhIiwiaW5uZXJWYWx1ZSIsIndhdGNoIiwic2V0IiwibWV0aG9kcyIsIm9uU2VsZWN0IiwiZXZlbnQiLCJzY29yZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiJGVtaXQiLCJvblRvdWNoTW92ZSIsInRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsImdldFJlY3QiLCJ0aGVuIiwibGlzdCIsInRhcmdldCIsInNvcnQiLCJpdGVtIiwicmlnaHQiLCJsZWZ0IiwiZmluZCIsInRvcCIsImJvdHRvbSIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQSw4QkFBYztBQUNWQSxXQUFPLElBREc7QUFFVkMsYUFBUyxDQUFDLFlBQUQsQ0FGQztBQUdWQyxXQUFPO0FBQ0hDLGVBQU9DLE1BREo7QUFFSEMsa0JBQVVDLE9BRlA7QUFHSEMsa0JBQVVELE9BSFA7QUFJSEUsbUJBQVdGLE9BSlI7QUFLSEcsY0FBTTtBQUNGQyxrQkFBTU4sTUFESjtBQUVGRCxtQkFBTztBQUZMLFNBTEg7QUFTSFEsY0FBTTtBQUNGRCxrQkFBTUUsTUFESjtBQUVGVCxtQkFBTztBQUZMLFNBVEg7QUFhSFUsa0JBQVU7QUFDTkgsa0JBQU1FLE1BREE7QUFFTlQsbUJBQU87QUFGRCxTQWJQO0FBaUJIVyxlQUFPO0FBQ0hKLGtCQUFNRSxNQURIO0FBRUhULG1CQUFPO0FBRkosU0FqQko7QUFxQkhZLG1CQUFXO0FBQ1BMLGtCQUFNRSxNQURDO0FBRVBULG1CQUFPO0FBRkEsU0FyQlI7QUF5QkhhLHVCQUFlO0FBQ1hOLGtCQUFNRSxNQURLO0FBRVhULG1CQUFPO0FBRkksU0F6Qlo7QUE2QkhjLGVBQU87QUFDSFAsa0JBQU1OLE1BREg7QUFFSEQsbUJBQU87QUFGSjtBQTdCSixLQUhHO0FBcUNWZSxVQUFNO0FBQ0ZDLG9CQUFZO0FBRFYsS0FyQ0k7QUF3Q1ZDLFdBQU87QUFDSGpCLGFBREcsaUJBQ0dBLE1BREgsRUFDVTtBQUNULGdCQUFJQSxXQUFVLEtBQUtlLElBQUwsQ0FBVUMsVUFBeEIsRUFBb0M7QUFDaEMscUJBQUtFLEdBQUwsQ0FBUyxFQUFFRixZQUFZaEIsTUFBZCxFQUFUO0FBQ0g7QUFDSjtBQUxFLEtBeENHO0FBK0NWbUIsYUFBUztBQUNMQyxnQkFESyxvQkFDSUMsS0FESixFQUNXO0FBQUEsZ0JBQ0pOLElBREksR0FDSyxJQURMLENBQ0pBLElBREk7QUFBQSxnQkFFSk8sS0FGSSxHQUVNRCxNQUFNRSxhQUFOLENBQW9CQyxPQUYxQixDQUVKRixLQUZJOztBQUdaLGdCQUFJLENBQUNQLEtBQUtYLFFBQU4sSUFBa0IsQ0FBQ1csS0FBS2IsUUFBNUIsRUFBc0M7QUFDbEMscUJBQUtnQixHQUFMLENBQVMsRUFBRUYsWUFBWU0sUUFBUSxDQUF0QixFQUFUO0FBQ0EscUJBQUtHLEtBQUwsQ0FBVyxPQUFYLEVBQW9CSCxRQUFRLENBQTVCO0FBQ0EscUJBQUtHLEtBQUwsQ0FBVyxRQUFYLEVBQXFCSCxRQUFRLENBQTdCO0FBQ0g7QUFDSixTQVRJO0FBVUxJLG1CQVZLLHVCQVVPTCxLQVZQLEVBVWM7QUFBQTs7QUFBQSxrQ0FDY0EsTUFBTU0sT0FBTixDQUFjLENBQWQsQ0FEZDtBQUFBLGdCQUNQQyxPQURPLG1CQUNQQSxPQURPO0FBQUEsZ0JBQ0VDLE9BREYsbUJBQ0VBLE9BREY7O0FBRWYsaUJBQUtDLE9BQUwsQ0FBYSxpQkFBYixFQUFnQyxJQUFoQyxFQUFzQ0MsSUFBdEMsQ0FBMkMsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pELG9CQUFNQyxTQUFTRCxLQUNWRSxJQURVLENBQ0w7QUFBQSwyQkFBUUMsS0FBS0MsS0FBTCxHQUFhRCxLQUFLRSxJQUExQjtBQUFBLGlCQURLLEVBRVZDLElBRlUsQ0FFTDtBQUFBLDJCQUFRVixXQUFXTyxLQUFLRSxJQUFoQixJQUNkVCxXQUFXTyxLQUFLQyxLQURGLElBRWRQLFdBQVdNLEtBQUtJLEdBRkYsSUFHZFYsV0FBV00sS0FBS0ssTUFIVjtBQUFBLGlCQUZLLENBQWY7QUFNQSxvQkFBSVAsVUFBVSxJQUFkLEVBQW9CO0FBQ2hCLDBCQUFLYixRQUFMLENBQWNxQixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQnJCLEtBQWxCLEVBQXlCLEVBQUVFLGVBQWVVLE1BQWpCLEVBQXpCLENBQWQ7QUFDSDtBQUNKLGFBVkQ7QUFXSDtBQXZCSTtBQS9DQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5WYW50Q29tcG9uZW50KHtcclxuICAgIGZpZWxkOiB0cnVlLFxyXG4gICAgY2xhc3NlczogWydpY29uLWNsYXNzJ10sXHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHZhbHVlOiBOdW1iZXIsXHJcbiAgICAgICAgcmVhZG9ubHk6IEJvb2xlYW4sXHJcbiAgICAgICAgZGlzYWJsZWQ6IEJvb2xlYW4sXHJcbiAgICAgICAgYWxsb3dIYWxmOiBCb29sZWFuLFxyXG4gICAgICAgIHNpemU6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMjBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGljb246IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ3N0YXInXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2b2lkSWNvbjoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiAnc3Rhci1vJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29sb3I6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJyNmZmQyMWUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB2b2lkQ29sb3I6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJyNjN2M3YzcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaXNhYmxlZENvbG9yOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdmFsdWU6ICcjYmRiZGJkJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY291bnQ6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogNVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgaW5uZXJWYWx1ZTogMFxyXG4gICAgfSxcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgICAgdmFsdWUodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmRhdGEuaW5uZXJWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoeyBpbm5lclZhbHVlOiB2YWx1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgb25TZWxlY3QoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCB7IHNjb3JlIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgICAgIGlmICghZGF0YS5kaXNhYmxlZCAmJiAhZGF0YS5yZWFkb25seSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoeyBpbm5lclZhbHVlOiBzY29yZSArIDEgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHNjb3JlICsgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBzY29yZSArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRvdWNoTW92ZShldmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGNsaWVudFgsIGNsaWVudFkgfSA9IGV2ZW50LnRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjdCgnLnZhbi1yYXRlX19pY29uJywgdHJ1ZSkudGhlbigobGlzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIC5zb3J0KGl0ZW0gPT4gaXRlbS5yaWdodCAtIGl0ZW0ubGVmdClcclxuICAgICAgICAgICAgICAgICAgICAuZmluZChpdGVtID0+IGNsaWVudFggPj0gaXRlbS5sZWZ0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50WCA8PSBpdGVtLnJpZ2h0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50WSA+PSBpdGVtLnRvcCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFkgPD0gaXRlbS5ib3R0b20pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdChPYmplY3QuYXNzaWduKHt9LCBldmVudCwgeyBjdXJyZW50VGFyZ2V0OiB0YXJnZXQgfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=