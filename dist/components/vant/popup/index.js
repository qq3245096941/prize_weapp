'use strict';

var _component = require('./../common/component.js');

var _transition = require('./../mixins/transition.js');

var _safeArea = require('./../mixins/safe-area.js');

(0, _component.VantComponent)({
    classes: ['enter-class', 'enter-active-class', 'enter-to-class', 'leave-class', 'leave-active-class', 'leave-to-class'],
    mixins: [(0, _transition.transition)(false), (0, _safeArea.safeArea)()],
    props: {
        transition: {
            type: String,
            observer: 'observeClass'
        },
        customStyle: String,
        overlayStyle: String,
        zIndex: {
            type: Number,
            value: 100
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        position: {
            type: String,
            value: 'center',
            observer: 'observeClass'
        }
    },
    created: function created() {
        this.observeClass();
    },

    methods: {
        onClickOverlay: function onClickOverlay() {
            this.$emit('click-overlay');
            if (this.data.closeOnClickOverlay) {
                this.$emit('close');
            }
        },
        observeClass: function observeClass() {
            var _data = this.data,
                transition = _data.transition,
                position = _data.position;

            this.updateClasses(transition || position);
            if (transition === 'none') {
                this.set({ duration: 0 });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNsYXNzZXMiLCJtaXhpbnMiLCJwcm9wcyIsInRyYW5zaXRpb24iLCJ0eXBlIiwiU3RyaW5nIiwib2JzZXJ2ZXIiLCJjdXN0b21TdHlsZSIsIm92ZXJsYXlTdHlsZSIsInpJbmRleCIsIk51bWJlciIsInZhbHVlIiwib3ZlcmxheSIsIkJvb2xlYW4iLCJjbG9zZU9uQ2xpY2tPdmVybGF5IiwicG9zaXRpb24iLCJjcmVhdGVkIiwib2JzZXJ2ZUNsYXNzIiwibWV0aG9kcyIsIm9uQ2xpY2tPdmVybGF5IiwiJGVtaXQiLCJkYXRhIiwidXBkYXRlQ2xhc3NlcyIsInNldCIsImR1cmF0aW9uIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBLDhCQUFjO0FBQ1ZBLGFBQVMsQ0FDTCxhQURLLEVBRUwsb0JBRkssRUFHTCxnQkFISyxFQUlMLGFBSkssRUFLTCxvQkFMSyxFQU1MLGdCQU5LLENBREM7QUFTVkMsWUFBUSxDQUFDLDRCQUFXLEtBQVgsQ0FBRCxFQUFvQix5QkFBcEIsQ0FURTtBQVVWQyxXQUFPO0FBQ0hDLG9CQUFZO0FBQ1JDLGtCQUFNQyxNQURFO0FBRVJDLHNCQUFVO0FBRkYsU0FEVDtBQUtIQyxxQkFBYUYsTUFMVjtBQU1IRyxzQkFBY0gsTUFOWDtBQU9ISSxnQkFBUTtBQUNKTCxrQkFBTU0sTUFERjtBQUVKQyxtQkFBTztBQUZILFNBUEw7QUFXSEMsaUJBQVM7QUFDTFIsa0JBQU1TLE9BREQ7QUFFTEYsbUJBQU87QUFGRixTQVhOO0FBZUhHLDZCQUFxQjtBQUNqQlYsa0JBQU1TLE9BRFc7QUFFakJGLG1CQUFPO0FBRlUsU0FmbEI7QUFtQkhJLGtCQUFVO0FBQ05YLGtCQUFNQyxNQURBO0FBRU5NLG1CQUFPLFFBRkQ7QUFHTkwsc0JBQVU7QUFISjtBQW5CUCxLQVZHO0FBbUNWVSxXQW5DVSxxQkFtQ0E7QUFDTixhQUFLQyxZQUFMO0FBQ0gsS0FyQ1M7O0FBc0NWQyxhQUFTO0FBQ0xDLHNCQURLLDRCQUNZO0FBQ2IsaUJBQUtDLEtBQUwsQ0FBVyxlQUFYO0FBQ0EsZ0JBQUksS0FBS0MsSUFBTCxDQUFVUCxtQkFBZCxFQUFtQztBQUMvQixxQkFBS00sS0FBTCxDQUFXLE9BQVg7QUFDSDtBQUNKLFNBTkk7QUFPTEgsb0JBUEssMEJBT1U7QUFBQSx3QkFDc0IsS0FBS0ksSUFEM0I7QUFBQSxnQkFDSGxCLFVBREcsU0FDSEEsVUFERztBQUFBLGdCQUNTWSxRQURULFNBQ1NBLFFBRFQ7O0FBRVgsaUJBQUtPLGFBQUwsQ0FBbUJuQixjQUFjWSxRQUFqQztBQUNBLGdCQUFJWixlQUFlLE1BQW5CLEVBQTJCO0FBQ3ZCLHFCQUFLb0IsR0FBTCxDQUFTLEVBQUVDLFVBQVUsQ0FBWixFQUFUO0FBQ0g7QUFDSjtBQWJJO0FBdENDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IHRyYW5zaXRpb24gfSBmcm9tICcuLi9taXhpbnMvdHJhbnNpdGlvbic7XHJcbmltcG9ydCB7IHNhZmVBcmVhIH0gZnJvbSAnLi4vbWl4aW5zL3NhZmUtYXJlYSc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgY2xhc3NlczogW1xyXG4gICAgICAgICdlbnRlci1jbGFzcycsXHJcbiAgICAgICAgJ2VudGVyLWFjdGl2ZS1jbGFzcycsXHJcbiAgICAgICAgJ2VudGVyLXRvLWNsYXNzJyxcclxuICAgICAgICAnbGVhdmUtY2xhc3MnLFxyXG4gICAgICAgICdsZWF2ZS1hY3RpdmUtY2xhc3MnLFxyXG4gICAgICAgICdsZWF2ZS10by1jbGFzcydcclxuICAgIF0sXHJcbiAgICBtaXhpbnM6IFt0cmFuc2l0aW9uKGZhbHNlKSwgc2FmZUFyZWEoKV0sXHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBvYnNlcnZlcjogJ29ic2VydmVDbGFzcydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGN1c3RvbVN0eWxlOiBTdHJpbmcsXHJcbiAgICAgICAgb3ZlcmxheVN0eWxlOiBTdHJpbmcsXHJcbiAgICAgICAgekluZGV4OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgdmFsdWU6IDEwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3ZlcmxheToge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xvc2VPbkNsaWNrT3ZlcmxheToge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG9ic2VydmVyOiAnb2JzZXJ2ZUNsYXNzJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjcmVhdGVkKCkge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZUNsYXNzKCk7XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2xpY2tPdmVybGF5KCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljay1vdmVybGF5Jyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuY2xvc2VPbkNsaWNrT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2UnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb2JzZXJ2ZUNsYXNzKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IHRyYW5zaXRpb24sIHBvc2l0aW9uIH0gPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2xhc3Nlcyh0cmFuc2l0aW9uIHx8IHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24gPT09ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoeyBkdXJhdGlvbjogMCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==