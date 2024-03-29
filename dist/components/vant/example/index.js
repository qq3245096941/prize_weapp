'use strict';

Page({
    data: {
        list: [{
            id: 'form',
            name: '表单',
            open: false,
            pages: ['button', 'list', 'input', 'slider', 'uploader']
        }, {
            id: 'widget',
            name: '基础组件',
            open: false,
            pages: ['article', 'badge', 'flex', 'footer', 'gallery', 'grid', 'icons', 'loadmore', 'panel', 'preview', 'progress']
        }, {
            id: 'feedback',
            name: '操作反馈',
            open: false,
            pages: ['actionsheet', 'dialog', 'msg', 'picker', 'toast']
        }, {
            id: 'nav',
            name: '导航相关',
            open: false,
            pages: ['navbar', 'tabbar']
        }, {
            id: 'search',
            name: '搜索相关',
            open: false,
            pages: ['searchbar']
        }]
    },
    kindToggle: function kindToggle(e) {
        var id = e.currentTarget.id,
            list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open;
            } else {
                list[i].open = false;
            }
        }
        this.setData({
            list: list
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlBhZ2UiLCJkYXRhIiwibGlzdCIsImlkIiwibmFtZSIsIm9wZW4iLCJwYWdlcyIsImtpbmRUb2dnbGUiLCJlIiwiY3VycmVudFRhcmdldCIsImkiLCJsZW4iLCJsZW5ndGgiLCJzZXREYXRhIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxLQUFLO0FBQ0RDLFVBQU07QUFDRkMsY0FBTSxDQUNGO0FBQ0lDLGdCQUFJLE1BRFI7QUFFSUMsa0JBQU0sSUFGVjtBQUdJQyxrQkFBTSxLQUhWO0FBSUlDLG1CQUFPLENBQUMsUUFBRCxFQUFXLE1BQVgsRUFBbUIsT0FBbkIsRUFBNEIsUUFBNUIsRUFBc0MsVUFBdEM7QUFKWCxTQURFLEVBT0Y7QUFDSUgsZ0JBQUksUUFEUjtBQUVJQyxrQkFBTSxNQUZWO0FBR0lDLGtCQUFNLEtBSFY7QUFJSUMsbUJBQU8sQ0FBQyxTQUFELEVBQVksT0FBWixFQUFxQixNQUFyQixFQUE2QixRQUE3QixFQUF1QyxTQUF2QyxFQUFrRCxNQUFsRCxFQUEwRCxPQUExRCxFQUFtRSxVQUFuRSxFQUErRSxPQUEvRSxFQUF3RixTQUF4RixFQUFtRyxVQUFuRztBQUpYLFNBUEUsRUFhRjtBQUNJSCxnQkFBSSxVQURSO0FBRUlDLGtCQUFNLE1BRlY7QUFHSUMsa0JBQU0sS0FIVjtBQUlJQyxtQkFBTyxDQUFDLGFBQUQsRUFBZ0IsUUFBaEIsRUFBMEIsS0FBMUIsRUFBaUMsUUFBakMsRUFBMkMsT0FBM0M7QUFKWCxTQWJFLEVBbUJGO0FBQ0lILGdCQUFJLEtBRFI7QUFFSUMsa0JBQU0sTUFGVjtBQUdJQyxrQkFBTSxLQUhWO0FBSUlDLG1CQUFPLENBQUMsUUFBRCxFQUFXLFFBQVg7QUFKWCxTQW5CRSxFQXlCRjtBQUNJSCxnQkFBSSxRQURSO0FBRUlDLGtCQUFNLE1BRlY7QUFHSUMsa0JBQU0sS0FIVjtBQUlJQyxtQkFBTyxDQUFDLFdBQUQ7QUFKWCxTQXpCRTtBQURKLEtBREw7QUFtQ0RDLGdCQUFZLG9CQUFVQyxDQUFWLEVBQWE7QUFDckIsWUFBSUwsS0FBS0ssRUFBRUMsYUFBRixDQUFnQk4sRUFBekI7QUFBQSxZQUE2QkQsT0FBTyxLQUFLRCxJQUFMLENBQVVDLElBQTlDO0FBQ0EsYUFBSyxJQUFJUSxJQUFJLENBQVIsRUFBV0MsTUFBTVQsS0FBS1UsTUFBM0IsRUFBbUNGLElBQUlDLEdBQXZDLEVBQTRDLEVBQUVELENBQTlDLEVBQWlEO0FBQzdDLGdCQUFJUixLQUFLUSxDQUFMLEVBQVFQLEVBQVIsSUFBY0EsRUFBbEIsRUFBc0I7QUFDbEJELHFCQUFLUSxDQUFMLEVBQVFMLElBQVIsR0FBZSxDQUFDSCxLQUFLUSxDQUFMLEVBQVFMLElBQXhCO0FBQ0gsYUFGRCxNQUVPO0FBQ0hILHFCQUFLUSxDQUFMLEVBQVFMLElBQVIsR0FBZSxLQUFmO0FBQ0g7QUFDSjtBQUNELGFBQUtRLE9BQUwsQ0FBYTtBQUNUWCxrQkFBTUE7QUFERyxTQUFiO0FBR0g7QUEvQ0EsQ0FBTCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGxpc3Q6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdmb3JtJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfooajljZUnLFxyXG4gICAgICAgICAgICAgICAgb3BlbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBwYWdlczogWydidXR0b24nLCAnbGlzdCcsICdpbnB1dCcsICdzbGlkZXInLCAndXBsb2FkZXInXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ3dpZGdldCcsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn5Z+656GA57uE5Lu2JyxcclxuICAgICAgICAgICAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcGFnZXM6IFsnYXJ0aWNsZScsICdiYWRnZScsICdmbGV4JywgJ2Zvb3RlcicsICdnYWxsZXJ5JywgJ2dyaWQnLCAnaWNvbnMnLCAnbG9hZG1vcmUnLCAncGFuZWwnLCAncHJldmlldycsICdwcm9ncmVzcyddXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiAnZmVlZGJhY2snLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+aTjeS9nOWPjemmiCcsXHJcbiAgICAgICAgICAgICAgICBvcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHBhZ2VzOiBbJ2FjdGlvbnNoZWV0JywgJ2RpYWxvZycsICdtc2cnLCAncGlja2VyJywgJ3RvYXN0J11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICduYXYnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+WvvOiIquebuOWFsycsXHJcbiAgICAgICAgICAgICAgICBvcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHBhZ2VzOiBbJ25hdmJhcicsICd0YWJiYXInXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ3NlYXJjaCcsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn5pCc57Si55u45YWzJyxcclxuICAgICAgICAgICAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcGFnZXM6IFsnc2VhcmNoYmFyJ11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBraW5kVG9nZ2xlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBpZCA9IGUuY3VycmVudFRhcmdldC5pZCwgbGlzdCA9IHRoaXMuZGF0YS5saXN0O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0W2ldLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0W2ldLm9wZW4gPSAhbGlzdFtpXS5vcGVuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0W2ldLm9wZW4gPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGxpc3Q6IGxpc3RcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcbiJdfQ==