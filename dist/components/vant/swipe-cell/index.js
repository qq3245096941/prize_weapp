'use strict';

var _component = require('./../common/component.js');

var _touch = require('./../mixins/touch.js');

var THRESHOLD = 0.3;
(0, _component.VantComponent)({
    props: {
        disabled: Boolean,
        leftWidth: {
            type: Number,
            value: 0
        },
        rightWidth: {
            type: Number,
            value: 0
        },
        asyncClose: Boolean
    },
    mixins: [_touch.touch],
    data: {
        catchMove: true
    },
    created: function created() {
        this.offset = 0;
    },

    methods: {
        open: function open(position) {
            var _data = this.data,
                leftWidth = _data.leftWidth,
                rightWidth = _data.rightWidth;

            var offset = position === 'left' ? leftWidth : -rightWidth;
            this.swipeMove(offset);
        },
        close: function close() {
            this.swipeMove(0);
        },
        swipeMove: function swipeMove() {
            var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            this.offset = offset;
            var transform = 'translate3d(' + offset + 'px, 0, 0)';
            var transition = this.draging ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)';
            this.set({
                wrapperStyle: '\n        -webkit-transform: ' + transform + ';\n        -webkit-transition: ' + transition + ';\n        transform: ' + transform + ';\n        transition: ' + transition + ';\n      '
            });
        },
        swipeLeaveTransition: function swipeLeaveTransition() {
            var _data2 = this.data,
                leftWidth = _data2.leftWidth,
                rightWidth = _data2.rightWidth;
            var offset = this.offset;

            if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
                this.open('right');
            } else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
                this.open('left');
            } else {
                this.swipeMove(0);
            }
        },
        startDrag: function startDrag(event) {
            if (this.data.disabled) {
                return;
            }
            this.draging = true;
            this.startOffset = this.offset;
            this.firstDirection = '';
            this.touchStart(event);
        },
        noop: function noop() {},
        onDrag: function onDrag(event) {
            if (this.data.disabled) {
                return;
            }
            this.touchMove(event);
            if (!this.firstDirection) {
                this.firstDirection = this.direction;
                this.set({ catchMove: this.firstDirection === 'horizontal' });
            }
            if (this.firstDirection === 'vertical') {
                return;
            }
            var _data3 = this.data,
                leftWidth = _data3.leftWidth,
                rightWidth = _data3.rightWidth;

            var offset = this.startOffset + this.deltaX;
            if (rightWidth > 0 && -offset > rightWidth || leftWidth > 0 && offset > leftWidth) {
                return;
            }
            this.swipeMove(offset);
        },
        endDrag: function endDrag() {
            if (this.data.disabled) {
                return;
            }
            this.draging = false;
            this.swipeLeaveTransition();
        },
        onClick: function onClick(event) {
            var _event$currentTarget$ = event.currentTarget.dataset.key,
                position = _event$currentTarget$ === undefined ? 'outside' : _event$currentTarget$;

            this.$emit('click', position);
            if (!this.offset) {
                return;
            }
            if (this.data.asyncClose) {
                this.$emit('close', { position: position, instance: this });
            } else {
                this.swipeMove(0);
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlRIUkVTSE9MRCIsInByb3BzIiwiZGlzYWJsZWQiLCJCb29sZWFuIiwibGVmdFdpZHRoIiwidHlwZSIsIk51bWJlciIsInZhbHVlIiwicmlnaHRXaWR0aCIsImFzeW5jQ2xvc2UiLCJtaXhpbnMiLCJ0b3VjaCIsImRhdGEiLCJjYXRjaE1vdmUiLCJjcmVhdGVkIiwib2Zmc2V0IiwibWV0aG9kcyIsIm9wZW4iLCJwb3NpdGlvbiIsInN3aXBlTW92ZSIsImNsb3NlIiwidHJhbnNmb3JtIiwidHJhbnNpdGlvbiIsImRyYWdpbmciLCJzZXQiLCJ3cmFwcGVyU3R5bGUiLCJzd2lwZUxlYXZlVHJhbnNpdGlvbiIsInN0YXJ0RHJhZyIsImV2ZW50Iiwic3RhcnRPZmZzZXQiLCJmaXJzdERpcmVjdGlvbiIsInRvdWNoU3RhcnQiLCJub29wIiwib25EcmFnIiwidG91Y2hNb3ZlIiwiZGlyZWN0aW9uIiwiZGVsdGFYIiwiZW5kRHJhZyIsIm9uQ2xpY2siLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImtleSIsIiRlbWl0IiwiaW5zdGFuY2UiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0EsSUFBTUEsWUFBWSxHQUFsQjtBQUNBLDhCQUFjO0FBQ1ZDLFdBQU87QUFDSEMsa0JBQVVDLE9BRFA7QUFFSEMsbUJBQVc7QUFDUEMsa0JBQU1DLE1BREM7QUFFUEMsbUJBQU87QUFGQSxTQUZSO0FBTUhDLG9CQUFZO0FBQ1JILGtCQUFNQyxNQURFO0FBRVJDLG1CQUFPO0FBRkMsU0FOVDtBQVVIRSxvQkFBWU47QUFWVCxLQURHO0FBYVZPLFlBQVEsQ0FBQ0MsWUFBRCxDQWJFO0FBY1ZDLFVBQU07QUFDRkMsbUJBQVc7QUFEVCxLQWRJO0FBaUJWQyxXQWpCVSxxQkFpQkE7QUFDTixhQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNILEtBbkJTOztBQW9CVkMsYUFBUztBQUNMQyxZQURLLGdCQUNBQyxRQURBLEVBQ1U7QUFBQSx3QkFDdUIs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QXpFSTtBQTBFTFksZUExRUssbUJBMEVHVixLQTFFSCxFQTBFVTtBQUFBLHdDQUMyQkEsTUFBTVcsYUFBTixDQUFvQkMsT0FEL0MsQ0FDSEMsR0FERztBQUFBLGdCQUNFdkIsUUFERix5Q0FDYSxTQURiOztBQUVYLGlCQUFLd0IsS0FBTCxDQUFXLE9BQVgsRUFBb0J4QixRQUFwQjtBQUNBLGdCQUFJLENBQUMsS0FBS0gsTUFBVixFQUFrQjtBQUNkO0FBQ0g7QUFDRCxnQkFBSSxLQUFLSCxJQUFMLENBQVVILFVBQWQsRUFBMEI7QUFDdEIscUJBQUtpQyxLQUFMLENBQVcsT0FBWCxFQUFvQixFQUFFeEIsa0JBQUYsRUFBWXlCLFVBQVUsSUFBdEIsRUFBcEI7QUFDSCxhQUZELE1BR0s7QUFDRCxxQkFBS3hCLFNBQUwsQ0FBZSxDQUFmO0FBQ0g7QUFDSjtBQXRGSTtBQXBCQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyB0b3VjaCB9IGZyb20gJy4uL21peGlucy90b3VjaCc7XHJcbmNvbnN0IFRIUkVTSE9MRCA9IDAuMztcclxuVmFudENvbXBvbmVudCh7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIGRpc2FibGVkOiBCb29sZWFuLFxyXG4gICAgICAgIGxlZnRXaWR0aDoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICByaWdodFdpZHRoOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgdmFsdWU6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jQ2xvc2U6IEJvb2xlYW5cclxuICAgIH0sXHJcbiAgICBtaXhpbnM6IFt0b3VjaF0sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgY2F0Y2hNb3ZlOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlZCgpIHtcclxuICAgICAgICB0aGlzLm9mZnNldCA9IDA7XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9wZW4ocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgeyBsZWZ0V2lkdGgsIHJpZ2h0V2lkdGggfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gcG9zaXRpb24gPT09ICdsZWZ0JyA/IGxlZnRXaWR0aCA6IC1yaWdodFdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLnN3aXBlTW92ZShvZmZzZXQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGVNb3ZlKDApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3dpcGVNb3ZlKG9mZnNldCA9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke29mZnNldH1weCwgMCwgMClgO1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2l0aW9uID0gdGhpcy5kcmFnaW5nXHJcbiAgICAgICAgICAgICAgICA/ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgOiAnLjZzIGN1YmljLWJlemllcigwLjE4LCAwLjg5LCAwLjMyLCAxKSc7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgIHdyYXBwZXJTdHlsZTogYFxyXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiAke3RyYW5zZm9ybX07XHJcbiAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiAke3RyYW5zaXRpb259O1xyXG4gICAgICAgIHRyYW5zZm9ybTogJHt0cmFuc2Zvcm19O1xyXG4gICAgICAgIHRyYW5zaXRpb246ICR7dHJhbnNpdGlvbn07XHJcbiAgICAgIGBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzd2lwZUxlYXZlVHJhbnNpdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBsZWZ0V2lkdGgsIHJpZ2h0V2lkdGggfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgeyBvZmZzZXQgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChyaWdodFdpZHRoID4gMCAmJiAtb2Zmc2V0ID4gcmlnaHRXaWR0aCAqIFRIUkVTSE9MRCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuKCdyaWdodCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxlZnRXaWR0aCA+IDAgJiYgb2Zmc2V0ID4gbGVmdFdpZHRoICogVEhSRVNIT0xEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW4oJ2xlZnQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dpcGVNb3ZlKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydERyYWcoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRPZmZzZXQgPSB0aGlzLm9mZnNldDtcclxuICAgICAgICAgICAgdGhpcy5maXJzdERpcmVjdGlvbiA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoU3RhcnQoZXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm9vcCgpIHsgfSxcclxuICAgICAgICBvbkRyYWcoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hNb3ZlKGV2ZW50KTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpcnN0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0RGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCh7IGNhdGNoTW92ZTogdGhpcy5maXJzdERpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0RGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgeyBsZWZ0V2lkdGgsIHJpZ2h0V2lkdGggfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5zdGFydE9mZnNldCArIHRoaXMuZGVsdGFYO1xyXG4gICAgICAgICAgICBpZiAoKHJpZ2h0V2lkdGggPiAwICYmIC1vZmZzZXQgPiByaWdodFdpZHRoKSB8fFxyXG4gICAgICAgICAgICAgICAgKGxlZnRXaWR0aCA+IDAgJiYgb2Zmc2V0ID4gbGVmdFdpZHRoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGVNb3ZlKG9mZnNldCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmREcmFnKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kcmFnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGVMZWF2ZVRyYW5zaXRpb24oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBrZXk6IHBvc2l0aW9uID0gJ291dHNpZGUnIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrJywgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMub2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5hc3luY0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjbG9zZScsIHsgcG9zaXRpb24sIGluc3RhbmNlOiB0aGlzIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2lwZU1vdmUoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=