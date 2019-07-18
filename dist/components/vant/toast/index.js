'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    props: {
        show: Boolean,
        mask: Boolean,
        message: String,
        forbidClick: Boolean,
        zIndex: {
            type: Number,
            value: 1000
        },
        type: {
            type: String,
            value: 'text'
        },
        loadingType: {
            type: String,
            value: 'circular'
        },
        position: {
            type: String,
            value: 'middle'
        }
    },
    methods: {
        // for prevent touchmove
        noop: function noop() {}
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInByb3BzIiwic2hvdyIsIkJvb2xlYW4iLCJtYXNrIiwibWVzc2FnZSIsIlN0cmluZyIsImZvcmJpZENsaWNrIiwiekluZGV4IiwidHlwZSIsIk51bWJlciIsInZhbHVlIiwibG9hZGluZ1R5cGUiLCJwb3NpdGlvbiIsIm1ldGhvZHMiLCJub29wIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLDhCQUFjO0FBQ1ZBLFdBQU87QUFDSEMsY0FBTUMsT0FESDtBQUVIQyxjQUFNRCxPQUZIO0FBR0hFLGlCQUFTQyxNQUhOO0FBSUhDLHFCQUFhSixPQUpWO0FBS0hLLGdCQUFRO0FBQ0pDLGtCQUFNQyxNQURGO0FBRUpDLG1CQUFPO0FBRkgsU0FMTDtBQVNIRixjQUFNO0FBQ0ZBLGtCQUFNSCxNQURKO0FBRUZLLG1CQUFPO0FBRkwsU0FUSDtBQWFIQyxxQkFBYTtBQUNUSCxrQkFBTUgsTUFERztBQUVUSyxtQkFBTztBQUZFLFNBYlY7QUFpQkhFLGtCQUFVO0FBQ05KLGtCQUFNSCxNQURBO0FBRU5LLG1CQUFPO0FBRkQ7QUFqQlAsS0FERztBQXVCVkcsYUFBUztBQUNMO0FBQ0FDLFlBRkssa0JBRUUsQ0FBRztBQUZMO0FBdkJDLENBQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYW50Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2NvbXBvbmVudCc7XHJcblZhbnRDb21wb25lbnQoe1xyXG4gICAgcHJvcHM6IHtcclxuICAgICAgICBzaG93OiBCb29sZWFuLFxyXG4gICAgICAgIG1hc2s6IEJvb2xlYW4sXHJcbiAgICAgICAgbWVzc2FnZTogU3RyaW5nLFxyXG4gICAgICAgIGZvcmJpZENsaWNrOiBCb29sZWFuLFxyXG4gICAgICAgIHpJbmRleDoge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHZhbHVlOiAxMDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgdmFsdWU6ICd0ZXh0J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9hZGluZ1R5cGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ2NpcmN1bGFyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICB2YWx1ZTogJ21pZGRsZSdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIC8vIGZvciBwcmV2ZW50IHRvdWNobW92ZVxyXG4gICAgICAgIG5vb3AoKSB7IH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==