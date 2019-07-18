'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var openType = exports.openType = Behavior({
    properties: {
        openType: String
    },
    methods: {
        bindGetUserInfo: function bindGetUserInfo(event) {
            this.$emit('getuserinfo', event.detail);
        },
        bindContact: function bindContact(event) {
            this.$emit('contact', event.detail);
        },
        bindGetPhoneNumber: function bindGetPhoneNumber(event) {
            this.$emit('getphonenumber', event.detail);
        },
        bindError: function bindError(event) {
            this.$emit('error', event.detail);
        },
        bindLaunchApp: function bindLaunchApp(event) {
            this.$emit('launchapp', event.detail);
        },
        bindOpenSetting: function bindOpenSetting(event) {
            this.$emit('opensetting', event.detail);
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9wZW4tdHlwZS5qcyJdLCJuYW1lcyI6WyJvcGVuVHlwZSIsIkJlaGF2aW9yIiwicHJvcGVydGllcyIsIlN0cmluZyIsIm1ldGhvZHMiLCJiaW5kR2V0VXNlckluZm8iLCJldmVudCIsIiRlbWl0IiwiZGV0YWlsIiwiYmluZENvbnRhY3QiLCJiaW5kR2V0UGhvbmVOdW1iZXIiLCJiaW5kRXJyb3IiLCJiaW5kTGF1bmNoQXBwIiwiYmluZE9wZW5TZXR0aW5nIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFPLElBQU1BLDhCQUFXQyxTQUFTO0FBQzdCQyxnQkFBWTtBQUNSRixrQkFBVUc7QUFERixLQURpQjtBQUk3QkMsYUFBUztBQUNMQyx1QkFESywyQkFDV0MsS0FEWCxFQUNrQjtBQUNuQixpQkFBS0MsS0FBTCxDQUFXLGFBQVgsRUFBMEJELE1BQU1FLE1BQWhDO0FBQ0gsU0FISTtBQUlMQyxtQkFKSyx1QkFJT0gsS0FKUCxFQUljO0FBQ2YsaUJBQUtDLEtBQUwsQ0FBVyxTQUFYLEVBQXNCRCxNQUFNRSxNQUE1QjtBQUNILFNBTkk7QUFPTEUsMEJBUEssOEJBT2NKLEtBUGQsRUFPcUI7QUFDdEIsaUJBQUtDLEtBQUwsQ0FBVyxnQkFBWCxFQUE2QkQsTUFBTUUsTUFBbkM7QUFDSCxTQVRJO0FBVUxHLGlCQVZLLHFCQVVLTCxLQVZMLEVBVVk7QUFDYixpQkFBS0MsS0FBTCxDQUFXLE9BQVgsRUFBb0JELE1BQU1FLE1BQTFCO0FBQ0gsU0FaSTtBQWFMSSxxQkFiSyx5QkFhU04sS0FiVCxFQWFnQjtBQUNqQixpQkFBS0MsS0FBTCxDQUFXLFdBQVgsRUFBd0JELE1BQU1FLE1BQTlCO0FBQ0gsU0FmSTtBQWdCTEssdUJBaEJLLDJCQWdCV1AsS0FoQlgsRUFnQmtCO0FBQ25CLGlCQUFLQyxLQUFMLENBQVcsYUFBWCxFQUEwQkQsTUFBTUUsTUFBaEM7QUFDSDtBQWxCSTtBQUpvQixDQUFULENBQWpCIiwiZmlsZSI6Im9wZW4tdHlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBvcGVuVHlwZSA9IEJlaGF2aW9yKHtcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBvcGVuVHlwZTogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGJpbmRHZXRVc2VySW5mbyhldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdnZXR1c2VyaW5mbycsIGV2ZW50LmRldGFpbCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQ29udGFjdChldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjb250YWN0JywgZXZlbnQuZGV0YWlsKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRHZXRQaG9uZU51bWJlcihldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdnZXRwaG9uZW51bWJlcicsIGV2ZW50LmRldGFpbCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRXJyb3IoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZXJyb3InLCBldmVudC5kZXRhaWwpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZExhdW5jaEFwcChldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdsYXVuY2hhcHAnLCBldmVudC5kZXRhaWwpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZE9wZW5TZXR0aW5nKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ29wZW5zZXR0aW5nJywgZXZlbnQuZGV0YWlsKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59KTtcclxuIl19