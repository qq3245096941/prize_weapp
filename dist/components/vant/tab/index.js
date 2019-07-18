'use strict';

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
    relation: {
        name: 'tabs',
        type: 'ancestor'
    },
    props: {
        dot: Boolean,
        info: null,
        title: String,
        disabled: Boolean,
        titleStyle: String
    },
    data: {
        width: null,
        inited: false,
        active: false,
        animated: false
    },
    watch: {
        title: 'update',
        disabled: 'update',
        dot: 'update',
        info: 'update',
        titleStyle: 'update'
    },
    methods: {
        update: function update() {
            var parent = this.getRelationNodes('../tabs/index')[0];
            if (parent) {
                parent.updateTabs();
            }
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJlbGF0aW9uIiwibmFtZSIsInR5cGUiLCJwcm9wcyIsImRvdCIsIkJvb2xlYW4iLCJpbmZvIiwidGl0bGUiLCJTdHJpbmciLCJkaXNhYmxlZCIsInRpdGxlU3R5bGUiLCJkYXRhIiwid2lkdGgiLCJpbml0ZWQiLCJhY3RpdmUiLCJhbmltYXRlZCIsIndhdGNoIiwibWV0aG9kcyIsInVwZGF0ZSIsInBhcmVudCIsImdldFJlbGF0aW9uTm9kZXMiLCJ1cGRhdGVUYWJzIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBLDhCQUFjO0FBQ1ZBLGNBQVU7QUFDTkMsY0FBTSxNQURBO0FBRU5DLGNBQU07QUFGQSxLQURBO0FBS1ZDLFdBQU87QUFDSEMsYUFBS0MsT0FERjtBQUVIQyxjQUFNLElBRkg7QUFHSEMsZUFBT0MsTUFISjtBQUlIQyxrQkFBVUosT0FKUDtBQUtISyxvQkFBWUY7QUFMVCxLQUxHO0FBWVZHLFVBQU07QUFDRkMsZUFBTyxJQURMO0FBRUZDLGdCQUFRLEtBRk47QUFHRkMsZ0JBQVEsS0FITjtBQUlGQyxrQkFBVTtBQUpSLEtBWkk7QUFrQlZDLFdBQU87QUFDSFQsZUFBTyxRQURKO0FBRUhFLGtCQUFVLFFBRlA7QUFHSEwsYUFBSyxRQUhGO0FBSUhFLGNBQU0sUUFKSDtBQUtISSxvQkFBWTtBQUxULEtBbEJHO0FBeUJWTyxhQUFTO0FBQ0xDLGNBREssb0JBQ0k7QUFDTCxnQkFBTUMsU0FBUyxLQUFLQyxnQkFBTCxDQUFzQixlQUF0QixFQUF1QyxDQUF2QyxDQUFmO0FBQ0EsZ0JBQUlELE1BQUosRUFBWTtBQUNSQSx1QkFBT0UsVUFBUDtBQUNIO0FBQ0o7QUFOSTtBQXpCQyxDQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5WYW50Q29tcG9uZW50KHtcclxuICAgIHJlbGF0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogJ3RhYnMnLFxyXG4gICAgICAgIHR5cGU6ICdhbmNlc3RvcidcclxuICAgIH0sXHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIGRvdDogQm9vbGVhbixcclxuICAgICAgICBpbmZvOiBudWxsLFxyXG4gICAgICAgIHRpdGxlOiBTdHJpbmcsXHJcbiAgICAgICAgZGlzYWJsZWQ6IEJvb2xlYW4sXHJcbiAgICAgICAgdGl0bGVTdHlsZTogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICAgIGluaXRlZDogZmFsc2UsXHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBhbmltYXRlZDogZmFsc2VcclxuICAgIH0sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICAgIHRpdGxlOiAndXBkYXRlJyxcclxuICAgICAgICBkaXNhYmxlZDogJ3VwZGF0ZScsXHJcbiAgICAgICAgZG90OiAndXBkYXRlJyxcclxuICAgICAgICBpbmZvOiAndXBkYXRlJyxcclxuICAgICAgICB0aXRsZVN0eWxlOiAndXBkYXRlJ1xyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UmVsYXRpb25Ob2RlcygnLi4vdGFicy9pbmRleCcpWzBdO1xyXG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQudXBkYXRlVGFicygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl19