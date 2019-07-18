'use strict';

var _link = require('./../mixins/link.js');

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    classes: ['title-class', 'label-class', 'value-class', 'right-icon-class', 'hover-class'],
    mixins: [_link.link],
    props: {
        title: null,
        value: null,
        icon: String,
        size: String,
        label: String,
        center: Boolean,
        isLink: Boolean,
        required: Boolean,
        clickable: Boolean,
        titleWidth: String,
        customStyle: String,
        arrowDirection: String,
        useLabelSlot: Boolean,
        border: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        onClick: function onClick(event) {
            this.$emit('click', event.detail);
            this.jumpLink();
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNsYXNzZXMiLCJtaXhpbnMiLCJsaW5rIiwicHJvcHMiLCJ0aXRsZSIsInZhbHVlIiwiaWNvbiIsIlN0cmluZyIsInNpemUiLCJsYWJlbCIsImNlbnRlciIsIkJvb2xlYW4iLCJpc0xpbmsiLCJyZXF1aXJlZCIsImNsaWNrYWJsZSIsInRpdGxlV2lkdGgiLCJjdXN0b21TdHlsZSIsImFycm93RGlyZWN0aW9uIiwidXNlTGFiZWxTbG90IiwiYm9yZGVyIiwidHlwZSIsIm1ldGhvZHMiLCJvbkNsaWNrIiwiZXZlbnQiLCIkZW1pdCIsImRldGFpbCIsImp1bXBMaW5rIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBLDhCQUFjO0FBQ1ZBLGFBQVMsQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLGFBSEssRUFJTCxrQkFKSyxFQUtMLGFBTEssQ0FEQztBQVFWQyxZQUFRLENBQUNDLFVBQUQsQ0FSRTtBQVNWQyxXQUFPO0FBQ0hDLGVBQU8sSUFESjtBQUVIQyxlQUFPLElBRko7QUFHSEMsY0FBTUMsTUFISDtBQUlIQyxjQUFNRCxNQUpIO0FBS0hFLGVBQU9GLE1BTEo7QUFNSEcsZ0JBQVFDLE9BTkw7QUFPSEMsZ0JBQVFELE9BUEw7QUFRSEUsa0JBQVVGLE9BUlA7QUFTSEcsbUJBQVdILE9BVFI7QUFVSEksb0JBQVlSLE1BVlQ7QUFXSFMscUJBQWFULE1BWFY7QUFZSFUsd0JBQWdCVixNQVpiO0FBYUhXLHNCQUFjUCxPQWJYO0FBY0hRLGdCQUFRO0FBQ0pDLGtCQUFNVCxPQURGO0FBRUpOLG1CQUFPO0FBRkg7QUFkTCxLQVRHO0FBNEJWZ0IsYUFBUztBQUNMQyxlQURLLG1CQUNHQyxLQURILEVBQ1U7QUFDWCxpQkFBS0MsS0FBTCxDQUFXLE9BQVgsRUFBb0JELE1BQU1FLE1BQTFCO0FBQ0EsaUJBQUtDLFFBQUw7QUFDSDtBQUpJO0FBNUJDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsaW5rIH0gZnJvbSAnLi4vbWl4aW5zL2xpbmsnO1xyXG5pbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgY2xhc3NlczogW1xyXG4gICAgICAgICd0aXRsZS1jbGFzcycsXHJcbiAgICAgICAgJ2xhYmVsLWNsYXNzJyxcclxuICAgICAgICAndmFsdWUtY2xhc3MnLFxyXG4gICAgICAgICdyaWdodC1pY29uLWNsYXNzJyxcclxuICAgICAgICAnaG92ZXItY2xhc3MnXHJcbiAgICBdLFxyXG4gICAgbWl4aW5zOiBbbGlua10sXHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHRpdGxlOiBudWxsLFxyXG4gICAgICAgIHZhbHVlOiBudWxsLFxyXG4gICAgICAgIGljb246IFN0cmluZyxcclxuICAgICAgICBzaXplOiBTdHJpbmcsXHJcbiAgICAgICAgbGFiZWw6IFN0cmluZyxcclxuICAgICAgICBjZW50ZXI6IEJvb2xlYW4sXHJcbiAgICAgICAgaXNMaW5rOiBCb29sZWFuLFxyXG4gICAgICAgIHJlcXVpcmVkOiBCb29sZWFuLFxyXG4gICAgICAgIGNsaWNrYWJsZTogQm9vbGVhbixcclxuICAgICAgICB0aXRsZVdpZHRoOiBTdHJpbmcsXHJcbiAgICAgICAgY3VzdG9tU3R5bGU6IFN0cmluZyxcclxuICAgICAgICBhcnJvd0RpcmVjdGlvbjogU3RyaW5nLFxyXG4gICAgICAgIHVzZUxhYmVsU2xvdDogQm9vbGVhbixcclxuICAgICAgICBib3JkZXI6IHtcclxuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgdmFsdWU6IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCBldmVudC5kZXRhaWwpO1xyXG4gICAgICAgICAgICB0aGlzLmp1bXBMaW5rKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19