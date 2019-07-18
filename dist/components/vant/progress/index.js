'use strict';

var _component = require('./../common/component.js');

var _color = require('./../common/color.js');

(0, _component.VantComponent)({
    props: {
        inactive: Boolean,
        percentage: Number,
        pivotText: String,
        pivotColor: String,
        showPivot: {
            type: Boolean,
            value: true
        },
        color: {
            type: String,
            value: _color.BLUE
        },
        textColor: {
            type: String,
            value: '#fff'
        }
    },
    data: {
        pivotWidth: 0,
        progressWidth: 0
    },
    watch: {
        pivotText: 'getWidth',
        showPivot: 'getWidth'
    },
    computed: {
        portionStyle: function portionStyle() {
            var width = (this.data.progressWidth - this.data.pivotWidth) * this.data.percentage / 100 + 'px';
            var background = this.getCurrentColor();
            return 'width: ' + width + '; background: ' + background + '; ';
        },
        pivotStyle: function pivotStyle() {
            var color = this.data.textColor;
            var background = this.data.pivotColor || this.getCurrentColor();
            return 'color: ' + color + '; background: ' + background;
        },
        text: function text() {
            return this.data.pivotText || this.data.percentage + '%';
        }
    },
    mounted: function mounted() {
        this.getWidth();
    },

    methods: {
        getCurrentColor: function getCurrentColor() {
            return this.data.inactive ? '#cacaca' : this.data.color;
        },
        getWidth: function getWidth() {
            var _this = this;

            this.getRect('.van-progress').then(function (rect) {
                _this.set({
                    progressWidth: rect.width
                });
            });
            this.getRect('.van-progress__pivot').then(function (rect) {
                _this.set({
                    pivotWidth: rect.width || 0
                });
            });
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwiaW5hY3RpdmUiLCJCb29sZWFuIiwicGVyY2VudGFnZSIsIk51bWJlciIsInBpdm90VGV4dCIsIlN0cmluZyIsInBpdm90Q29sb3IiLCJzaG93UGl2b3QiLCJ0eXBlIiwidmFsdWUiLCJjb2xvciIsIkJMVUUiLCJ0ZXh0Q29sb3IiLCJkYXRhIiwicGl2b3RXaWR0aCIsInByb2dyZXNzV2lkdGgiLCJ3YXRjaCIsImNvbXB1dGVkIiwicG9ydGlvblN0eWxlIiwid2lkdGgiLCJiYWNrZ3JvdW5kIiwiZ2V0Q3VycmVudENvbG9yIiwicGl2b3RTdHlsZSIsInRleHQiLCJtb3VudGVkIiwiZ2V0V2lkdGgiLCJtZXRob2RzIiwiZ2V0UmVjdCIsInRoZW4iLCJzZXQiLCJyZWN0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBLDhCQUFjO0FBQ1ZBLFdBQU87QUFDSEMsa0JBQVVDLE9BRFA7QUFFSEMsb0JBQVlDLE1BRlQ7QUFHSEMsbUJBQVdDLE1BSFI7QUFJSEMsb0JBQVlELE1BSlQ7QUFLSEUsbUJBQVc7QUFDUEMsa0JBQU1QLE9BREM7QUFFUFEsbUJBQU87QUFGQSxTQUxSO0FBU0hDLGVBQU87QUFDSEYsa0JBQU1ILE1BREg7QUFFSEksbUJBQU9FO0FBRkosU0FUSjtBQWFIQyxtQkFBVztBQUNQSixrQkFBTUgsTUFEQztBQUVQSSxtQkFBTztBQUZBO0FBYlIsS0FERztBQW1CVkksVUFBTTtBQUNGQyxvQkFBWSxDQURWO0FBRUZDLHVCQUFlO0FBRmIsS0FuQkk7QUF1QlZDLFdBQU87QUFDSFosbUJBQVcsVUFEUjtBQUVIRyxtQkFBVztBQUZSLEtBdkJHO0FBMkJWVSxjQUFVO0FBQ05DLG9CQURNLDBCQUNTO0FBQ1gsZ0JBQU1DLFFBQVEsQ0FBQyxLQUFLTixJQUFMLENBQVVFLGFBQVYsR0FBMEIsS0FBS0YsSUFBTCxDQUFVQyxVQUFyQyxJQUFtRCxLQUFLRCxJQUFMLENBQVVYLFVBQTdELEdBQTBFLEdBQTFFLEdBQWdGLElBQTlGO0FBQ0EsZ0JBQU1rQixhQUFhLEtBQUtDLGVBQUwsRUFBbkI7QUFDQSwrQkFBaUJGLEtBQWpCLHNCQUF1Q0MsVUFBdkM7QUFDSCxTQUxLO0FBTU5FLGtCQU5NLHdCQU1PO0FBQ1QsZ0JBQU1aLFFBQVEsS0FBS0csSUFBTCxDQUFVRCxTQUF4QjtBQUNBLGdCQUFNUSxhQUFhLEtBQUtQLElBQUwsQ0FBVVAsVUFBVixJQUF3QixLQUFLZSxlQUFMLEVBQTNDO0FBQ0EsK0JBQWlCWCxLQUFqQixzQkFBdUNVLFVBQXZDO0FBQ0gsU0FWSztBQVdORyxZQVhNLGtCQVdDO0FBQ0gsbUJBQU8sS0FBS1YsSUFBTCxDQUFVVCxTQUFWLElBQXVCLEtBQUtTLElBQUwsQ0FBVVgsVUFBVixHQUF1QixHQUFyRDtBQUNIO0FBYkssS0EzQkE7QUEwQ1ZzQixXQTFDVSxxQkEwQ0E7QUFDTixhQUFLQyxRQUFMO0FBQ0gsS0E1Q1M7O0FBNkNWQyxhQUFTO0FBQ0xMLHVCQURLLDZCQUNhO0FBQ2QsbUJBQU8sS0FBS1IsSUFBTCxDQUFVYixRQUFWLEdBQXFCLFNBQXJCLEdBQWlDLEtBQUthLElBQUwsQ0FBVUgsS0FBbEQ7QUFDSCxTQUhJO0FBSUxlLGdCQUpLLHNCQUlNO0FBQUE7O0FBQ1AsaUJBQUtFLE9BQUwsQ0FBYSxlQUFiLEVBQThCQyxJQUE5QixDQUFtQyxnQkFBUTtBQUN2QyxzQkFBS0MsR0FBTCxDQUFTO0FBQ0xkLG1DQUFlZSxLQUFLWDtBQURmLGlCQUFUO0FBR0gsYUFKRDtBQUtBLGlCQUFLUSxPQUFMLENBQWEsc0JBQWIsRUFBcUNDLElBQXJDLENBQTBDLGdCQUFRO0FBQzlDLHNCQUFLQyxHQUFMLENBQVM7QUFDTGYsZ0NBQVlnQixLQUFLWCxLQUFMLElBQWM7QUFEckIsaUJBQVQ7QUFHSCxhQUpEO0FBS0g7QUFmSTtBQTdDQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCTFVFIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yJztcclxuVmFudENvbXBvbmVudCh7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIGluYWN0aXZlOiBCb29sZWFuLFxyXG4gICAgICAgIHBlcmNlbnRhZ2U6IE51bWJlcixcclxuICAgICAgICBwaXZvdFRleHQ6IFN0cmluZyxcclxuICAgICAgICBwaXZvdENvbG9yOiBTdHJpbmcsXHJcbiAgICAgICAgc2hvd1Bpdm90OiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2xvcjoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiBCTFVFXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXh0Q29sb3I6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJyNmZmYnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBwaXZvdFdpZHRoOiAwLFxyXG4gICAgICAgIHByb2dyZXNzV2lkdGg6IDBcclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIHBpdm90VGV4dDogJ2dldFdpZHRoJyxcclxuICAgICAgICBzaG93UGl2b3Q6ICdnZXRXaWR0aCdcclxuICAgIH0sXHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICAgIHBvcnRpb25TdHlsZSgpIHtcclxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSAodGhpcy5kYXRhLnByb2dyZXNzV2lkdGggLSB0aGlzLmRhdGEucGl2b3RXaWR0aCkgKiB0aGlzLmRhdGEucGVyY2VudGFnZSAvIDEwMCArICdweCc7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhY2tncm91bmQgPSB0aGlzLmdldEN1cnJlbnRDb2xvcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gYHdpZHRoOiAke3dpZHRofTsgYmFja2dyb3VuZDogJHtiYWNrZ3JvdW5kfTsgYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBpdm90U3R5bGUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5kYXRhLnRleHRDb2xvcjtcclxuICAgICAgICAgICAgY29uc3QgYmFja2dyb3VuZCA9IHRoaXMuZGF0YS5waXZvdENvbG9yIHx8IHRoaXMuZ2V0Q3VycmVudENvbG9yKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBgY29sb3I6ICR7Y29sb3J9OyBiYWNrZ3JvdW5kOiAke2JhY2tncm91bmR9YDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRleHQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEucGl2b3RUZXh0IHx8IHRoaXMuZGF0YS5wZXJjZW50YWdlICsgJyUnO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtb3VudGVkKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0V2lkdGgoKTtcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgZ2V0Q3VycmVudENvbG9yKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmluYWN0aXZlID8gJyNjYWNhY2EnIDogdGhpcy5kYXRhLmNvbG9yO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0V2lkdGgoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjdCgnLnZhbi1wcm9ncmVzcycpLnRoZW4ocmVjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NXaWR0aDogcmVjdC53aWR0aFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmdldFJlY3QoJy52YW4tcHJvZ3Jlc3NfX3Bpdm90JykudGhlbihyZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBwaXZvdFdpZHRoOiByZWN0LndpZHRoIHx8IDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=