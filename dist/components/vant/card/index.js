'use strict';

var _link = require('./../mixins/link.js');

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    classes: ['num-class', 'desc-class', 'thumb-class', 'title-class', 'price-class', 'origin-price-class'],
    mixins: [_link.link],
    props: {
        tag: String,
        num: String,
        desc: String,
        thumb: String,
        title: String,
        price: String,
        centered: Boolean,
        lazyLoad: Boolean,
        thumbLink: String,
        originPrice: String,
        thumbMode: {
            type: String,
            value: 'aspectFit'
        },
        currency: {
            type: String,
            value: '¥'
        }
    },
    methods: {
        onClickThumb: function onClickThumb() {
            this.jumpLink('thumbLink');
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNsYXNzZXMiLCJtaXhpbnMiLCJsaW5rIiwicHJvcHMiLCJ0YWciLCJTdHJpbmciLCJudW0iLCJkZXNjIiwidGh1bWIiLCJ0aXRsZSIsInByaWNlIiwiY2VudGVyZWQiLCJCb29sZWFuIiwibGF6eUxvYWQiLCJ0aHVtYkxpbmsiLCJvcmlnaW5QcmljZSIsInRodW1iTW9kZSIsInR5cGUiLCJ2YWx1ZSIsImN1cnJlbmN5IiwibWV0aG9kcyIsIm9uQ2xpY2tUaHVtYiIsImp1bXBMaW5rIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBLDhCQUFjO0FBQ1ZBLGFBQVMsQ0FDTCxXQURLLEVBRUwsWUFGSyxFQUdMLGFBSEssRUFJTCxhQUpLLEVBS0wsYUFMSyxFQU1MLG9CQU5LLENBREM7QUFTVkMsWUFBUSxDQUFDQyxVQUFELENBVEU7QUFVVkMsV0FBTztBQUNIQyxhQUFLQyxNQURGO0FBRUhDLGFBQUtELE1BRkY7QUFHSEUsY0FBTUYsTUFISDtBQUlIRyxlQUFPSCxNQUpKO0FBS0hJLGVBQU9KLE1BTEo7QUFNSEssZUFBT0wsTUFOSjtBQU9ITSxrQkFBVUMsT0FQUDtBQVFIQyxrQkFBVUQsT0FSUDtBQVNIRSxtQkFBV1QsTUFUUjtBQVVIVSxxQkFBYVYsTUFWVjtBQVdIVyxtQkFBVztBQUNQQyxrQkFBTVosTUFEQztBQUVQYSxtQkFBTztBQUZBLFNBWFI7QUFlSEMsa0JBQVU7QUFDTkYsa0JBQU1aLE1BREE7QUFFTmEsbUJBQU87QUFGRDtBQWZQLEtBVkc7QUE4QlZFLGFBQVM7QUFDTEMsb0JBREssMEJBQ1U7QUFDWCxpQkFBS0MsUUFBTCxDQUFjLFdBQWQ7QUFDSDtBQUhJO0FBOUJDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsaW5rIH0gZnJvbSAnLi4vbWl4aW5zL2xpbmsnO1xyXG5pbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgY2xhc3NlczogW1xyXG4gICAgICAgICdudW0tY2xhc3MnLFxyXG4gICAgICAgICdkZXNjLWNsYXNzJyxcclxuICAgICAgICAndGh1bWItY2xhc3MnLFxyXG4gICAgICAgICd0aXRsZS1jbGFzcycsXHJcbiAgICAgICAgJ3ByaWNlLWNsYXNzJyxcclxuICAgICAgICAnb3JpZ2luLXByaWNlLWNsYXNzJyxcclxuICAgIF0sXHJcbiAgICBtaXhpbnM6IFtsaW5rXSxcclxuICAgIHByb3BzOiB7XHJcbiAgICAgICAgdGFnOiBTdHJpbmcsXHJcbiAgICAgICAgbnVtOiBTdHJpbmcsXHJcbiAgICAgICAgZGVzYzogU3RyaW5nLFxyXG4gICAgICAgIHRodW1iOiBTdHJpbmcsXHJcbiAgICAgICAgdGl0bGU6IFN0cmluZyxcclxuICAgICAgICBwcmljZTogU3RyaW5nLFxyXG4gICAgICAgIGNlbnRlcmVkOiBCb29sZWFuLFxyXG4gICAgICAgIGxhenlMb2FkOiBCb29sZWFuLFxyXG4gICAgICAgIHRodW1iTGluazogU3RyaW5nLFxyXG4gICAgICAgIG9yaWdpblByaWNlOiBTdHJpbmcsXHJcbiAgICAgICAgdGh1bWJNb2RlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdmFsdWU6ICdhc3BlY3RGaXQnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjdXJyZW5jeToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIHZhbHVlOiAnwqUnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvbkNsaWNrVGh1bWIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuanVtcExpbmsoJ3RodW1iTGluaycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==