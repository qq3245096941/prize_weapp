"use strict";

Page({
    data: {
        inputShowed: false,
        inputVal: ""
    },
    showInput: function showInput() {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function hideInput() {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function clearInput() {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function inputTyping(e) {
        this.setData({
            inputVal: e.detail.value
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaGJhci5qcyJdLCJuYW1lcyI6WyJQYWdlIiwiZGF0YSIsImlucHV0U2hvd2VkIiwiaW5wdXRWYWwiLCJzaG93SW5wdXQiLCJzZXREYXRhIiwiaGlkZUlucHV0IiwiY2xlYXJJbnB1dCIsImlucHV0VHlwaW5nIiwiZSIsImRldGFpbCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxLQUFLO0FBQ0RDLFVBQU07QUFDRkMscUJBQWEsS0FEWDtBQUVGQyxrQkFBVTtBQUZSLEtBREw7QUFLREMsZUFBVyxxQkFBWTtBQUNuQixhQUFLQyxPQUFMLENBQWE7QUFDVEgseUJBQWE7QUFESixTQUFiO0FBR0gsS0FUQTtBQVVESSxlQUFXLHFCQUFZO0FBQ25CLGFBQUtELE9BQUwsQ0FBYTtBQUNURixzQkFBVSxFQUREO0FBRVRELHlCQUFhO0FBRkosU0FBYjtBQUlILEtBZkE7QUFnQkRLLGdCQUFZLHNCQUFZO0FBQ3BCLGFBQUtGLE9BQUwsQ0FBYTtBQUNURixzQkFBVTtBQURELFNBQWI7QUFHSCxLQXBCQTtBQXFCREssaUJBQWEscUJBQVVDLENBQVYsRUFBYTtBQUN0QixhQUFLSixPQUFMLENBQWE7QUFDVEYsc0JBQVVNLEVBQUVDLE1BQUYsQ0FBU0M7QUFEVixTQUFiO0FBR0g7QUF6QkEsQ0FBTCIsImZpbGUiOiJzZWFyY2hiYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJQYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBpbnB1dFNob3dlZDogZmFsc2UsXHJcbiAgICAgICAgaW5wdXRWYWw6IFwiXCJcclxuICAgIH0sXHJcbiAgICBzaG93SW5wdXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBpbnB1dFNob3dlZDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGhpZGVJbnB1dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGlucHV0VmFsOiBcIlwiLFxyXG4gICAgICAgICAgICBpbnB1dFNob3dlZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjbGVhcklucHV0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaW5wdXRWYWw6IFwiXCJcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBpbnB1dFR5cGluZzogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBpbnB1dFZhbDogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7Il19