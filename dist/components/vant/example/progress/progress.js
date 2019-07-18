"use strict";

function _next() {
    var that = this;
    if (this.data.progress >= 100) {
        this.setData({
            disabled: false
        });
        return true;
    }
    this.setData({
        progress: ++this.data.progress
    });
    setTimeout(function () {
        _next.call(that);
    }, 20);
}

Page({
    data: {
        progress: 0,
        disabled: false
    },
    upload: function upload() {
        if (this.data.disabled) return;

        this.setData({
            progress: 0,
            disabled: true
        });
        _next.call(this);
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLmpzIl0sIm5hbWVzIjpbIl9uZXh0IiwidGhhdCIsImRhdGEiLCJwcm9ncmVzcyIsInNldERhdGEiLCJkaXNhYmxlZCIsInNldFRpbWVvdXQiLCJjYWxsIiwiUGFnZSIsInVwbG9hZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFTQSxLQUFULEdBQWdCO0FBQ1osUUFBSUMsT0FBTyxJQUFYO0FBQ0EsUUFBRyxLQUFLQyxJQUFMLENBQVVDLFFBQVYsSUFBc0IsR0FBekIsRUFBNkI7QUFDekIsYUFBS0MsT0FBTCxDQUFhO0FBQ1RDLHNCQUFVO0FBREQsU0FBYjtBQUdBLGVBQU8sSUFBUDtBQUNIO0FBQ0QsU0FBS0QsT0FBTCxDQUFhO0FBQ1RELGtCQUFVLEVBQUUsS0FBS0QsSUFBTCxDQUFVQztBQURiLEtBQWI7QUFHQUcsZUFBVyxZQUFVO0FBQ2pCTixjQUFNTyxJQUFOLENBQVdOLElBQVg7QUFDSCxLQUZELEVBRUcsRUFGSDtBQUdIOztBQUVETyxLQUFLO0FBQ0ROLFVBQU07QUFDRkMsa0JBQVUsQ0FEUjtBQUVGRSxrQkFBVTtBQUZSLEtBREw7QUFLREksWUFBUSxrQkFBVTtBQUNkLFlBQUcsS0FBS1AsSUFBTCxDQUFVRyxRQUFiLEVBQXVCOztBQUV2QixhQUFLRCxPQUFMLENBQWE7QUFDVEQsc0JBQVUsQ0FERDtBQUVURSxzQkFBVTtBQUZELFNBQWI7QUFJQUwsY0FBTU8sSUFBTixDQUFXLElBQVg7QUFDSDtBQWJBLENBQUwiLCJmaWxlIjoicHJvZ3Jlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBfbmV4dCgpe1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgaWYodGhpcy5kYXRhLnByb2dyZXNzID49IDEwMCl7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIHByb2dyZXNzOiArK3RoaXMuZGF0YS5wcm9ncmVzc1xyXG4gICAgfSk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgX25leHQuY2FsbCh0aGF0KTtcclxuICAgIH0sIDIwKTtcclxufVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgcHJvZ3Jlc3M6IDAsXHJcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgdXBsb2FkOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YS5kaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBwcm9ncmVzczogMCxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBfbmV4dC5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG59KTsiXX0=