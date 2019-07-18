'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var touch = exports.touch = Behavior({
    methods: {
        touchStart: function touchStart(event) {
            var touch = event.touches[0];
            this.direction = '';
            this.deltaX = 0;
            this.deltaY = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.startX = touch.clientX;
            this.startY = touch.clientY;
        },
        touchMove: function touchMove(event) {
            var touch = event.touches[0];
            this.deltaX = touch.clientX - this.startX;
            this.deltaY = touch.clientY - this.startY;
            this.offsetX = Math.abs(this.deltaX);
            this.offsetY = Math.abs(this.deltaY);
            this.direction = this.offsetX > this.offsetY ? 'horizontal' : this.offsetX < this.offsetY ? 'vertical' : '';
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvdWNoLmpzIl0sIm5hbWVzIjpbInRvdWNoIiwiQmVoYXZpb3IiLCJtZXRob2RzIiwidG91Y2hTdGFydCIsImV2ZW50IiwidG91Y2hlcyIsImRpcmVjdGlvbiIsImRlbHRhWCIsImRlbHRhWSIsIm9mZnNldFgiLCJvZmZzZXRZIiwic3RhcnRYIiwiY2xpZW50WCIsInN0YXJ0WSIsImNsaWVudFkiLCJ0b3VjaE1vdmUiLCJNYXRoIiwiYWJzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFPLElBQU1BLHdCQUFRQyxTQUFTO0FBQzFCQyxhQUFTO0FBQ0xDLGtCQURLLHNCQUNNQyxLQUROLEVBQ2E7QUFDZCxnQkFBTUosUUFBUUksTUFBTUMsT0FBTixDQUFjLENBQWQsQ0FBZDtBQUNBLGlCQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsaUJBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsaUJBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsaUJBQUtDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsaUJBQUtDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsaUJBQUtDLE1BQUwsR0FBY1gsTUFBTVksT0FBcEI7QUFDQSxpQkFBS0MsTUFBTCxHQUFjYixNQUFNYyxPQUFwQjtBQUNILFNBVkk7QUFXTEMsaUJBWEsscUJBV0tYLEtBWEwsRUFXWTtBQUNiLGdCQUFNSixRQUFRSSxNQUFNQyxPQUFOLENBQWMsQ0FBZCxDQUFkO0FBQ0EsaUJBQUtFLE1BQUwsR0FBY1AsTUFBTVksT0FBTixHQUFnQixLQUFLRCxNQUFuQztBQUNBLGlCQUFLSCxNQUFMLEdBQWNSLE1BQU1jLE9BQU4sR0FBZ0IsS0FBS0QsTUFBbkM7QUFDQSxpQkFBS0osT0FBTCxHQUFlTyxLQUFLQyxHQUFMLENBQVMsS0FBS1YsTUFBZCxDQUFmO0FBQ0EsaUJBQUtHLE9BQUwsR0FBZU0sS0FBS0MsR0FBTCxDQUFTLEtBQUtULE1BQWQsQ0FBZjtBQUNBLGlCQUFLRixTQUFMLEdBQ0ksS0FBS0csT0FBTCxHQUFlLEtBQUtDLE9BQXBCLEdBQ00sWUFETixHQUVNLEtBQUtELE9BQUwsR0FBZSxLQUFLQyxPQUFwQixHQUNJLFVBREosR0FFSSxFQUxkO0FBTUg7QUF2Qkk7QUFEaUIsQ0FBVCxDQUFkIiwiZmlsZSI6InRvdWNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHRvdWNoID0gQmVoYXZpb3Ioe1xyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIHRvdWNoU3RhcnQoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmRlbHRhWCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsdGFZID0gMDtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXRYID0gMDtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXRZID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFggPSB0b3VjaC5jbGllbnRYO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0WSA9IHRvdWNoLmNsaWVudFk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b3VjaE1vdmUoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLmRlbHRhWCA9IHRvdWNoLmNsaWVudFggLSB0aGlzLnN0YXJ0WDtcclxuICAgICAgICAgICAgdGhpcy5kZWx0YVkgPSB0b3VjaC5jbGllbnRZIC0gdGhpcy5zdGFydFk7XHJcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0WCA9IE1hdGguYWJzKHRoaXMuZGVsdGFYKTtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXRZID0gTWF0aC5hYnModGhpcy5kZWx0YVkpO1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldFggPiB0aGlzLm9mZnNldFlcclxuICAgICAgICAgICAgICAgICAgICA/ICdob3Jpem9udGFsJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5vZmZzZXRYIDwgdGhpcy5vZmZzZXRZXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ3ZlcnRpY2FsJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==