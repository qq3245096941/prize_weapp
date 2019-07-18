'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var link = exports.link = Behavior({
    properties: {
        url: String,
        linkType: {
            type: String,
            value: 'navigateTo'
        }
    },
    methods: {
        jumpLink: function jumpLink() {
            var urlKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'url';

            var url = this.data[urlKey];
            if (url) {
                wx[this.data.linkType]({ url: url });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbmsuanMiXSwibmFtZXMiOlsibGluayIsIkJlaGF2aW9yIiwicHJvcGVydGllcyIsInVybCIsIlN0cmluZyIsImxpbmtUeXBlIiwidHlwZSIsInZhbHVlIiwibWV0aG9kcyIsImp1bXBMaW5rIiwidXJsS2V5IiwiZGF0YSIsInd4Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFPLElBQU1BLHNCQUFPQyxTQUFTO0FBQ3pCQyxnQkFBWTtBQUNSQyxhQUFLQyxNQURHO0FBRVJDLGtCQUFVO0FBQ05DLGtCQUFNRixNQURBO0FBRU5HLG1CQUFPO0FBRkQ7QUFGRixLQURhO0FBUXpCQyxhQUFTO0FBQ0xDLGdCQURLLHNCQUNvQjtBQUFBLGdCQUFoQkMsTUFBZ0IsdUVBQVAsS0FBTzs7QUFDckIsZ0JBQU1QLE1BQU0sS0FBS1EsSUFBTCxDQUFVRCxNQUFWLENBQVo7QUFDQSxnQkFBSVAsR0FBSixFQUFTO0FBQ0xTLG1CQUFHLEtBQUtELElBQUwsQ0FBVU4sUUFBYixFQUF1QixFQUFFRixRQUFGLEVBQXZCO0FBQ0g7QUFDSjtBQU5JO0FBUmdCLENBQVQsQ0FBYiIsImZpbGUiOiJsaW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGxpbmsgPSBCZWhhdmlvcih7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgdXJsOiBTdHJpbmcsXHJcbiAgICAgICAgbGlua1R5cGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ25hdmlnYXRlVG8nXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBqdW1wTGluayh1cmxLZXkgPSAndXJsJykge1xyXG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmRhdGFbdXJsS2V5XTtcclxuICAgICAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICAgICAgd3hbdGhpcy5kYXRhLmxpbmtUeXBlXSh7IHVybCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==