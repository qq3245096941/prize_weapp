'use strict';

var _component = require('./../common/component.js');

var _utils = require('./../common/utils.js');

var DEFAULT_DURATION = 200;
(0, _component.VantComponent)({
    classes: ['active-class'],
    props: {
        valueKey: String,
        className: String,
        itemHeight: Number,
        visibleItemCount: Number,
        initialOptions: {
            type: Array,
            value: []
        },
        defaultIndex: {
            type: Number,
            value: 0
        }
    },
    data: {
        startY: 0,
        offset: 0,
        duration: 0,
        startOffset: 0,
        options: [],
        currentIndex: 0
    },
    created: function created() {
        var _this = this;

        var _data = this.data,
            defaultIndex = _data.defaultIndex,
            initialOptions = _data.initialOptions;

        this.set({
            currentIndex: defaultIndex,
            options: initialOptions
        }).then(function () {
            _this.setIndex(defaultIndex);
        });
    },

    computed: {
        count: function count() {
            return this.data.options.length;
        },
        baseOffset: function baseOffset() {
            var data = this.data;

            return data.itemHeight * (data.visibleItemCount - 1) / 2;
        },
        wrapperStyle: function wrapperStyle() {
            var data = this.data;

            return ['transition: ' + data.duration + 'ms', 'transform: translate3d(0, ' + (data.offset + data.baseOffset) + 'px, 0)', 'line-height: ' + data.itemHeight + 'px'].join('; ');
        }
    },
    watch: {
        defaultIndex: function defaultIndex(value) {
            this.setIndex(value);
        }
    },
    methods: {
        onTouchStart: function onTouchStart(event) {
            this.set({
                startY: event.touches[0].clientY,
                startOffset: this.data.offset,
                duration: 0
            });
        },
        onTouchMove: function onTouchMove(event) {
            var data = this.data;

            var deltaY = event.touches[0].clientY - data.startY;
            this.set({
                offset: (0, _utils.range)(data.startOffset + deltaY, -(data.count * data.itemHeight), data.itemHeight)
            });
        },
        onTouchEnd: function onTouchEnd() {
            var data = this.data;

            if (data.offset !== data.startOffset) {
                this.set({
                    duration: DEFAULT_DURATION
                });
                var index = (0, _utils.range)(Math.round(-data.offset / data.itemHeight), 0, data.count - 1);
                this.setIndex(index, true);
            }
        },
        onClickItem: function onClickItem(event) {
            var index = event.currentTarget.dataset.index;

            this.setIndex(index, true);
        },
        adjustIndex: function adjustIndex(index) {
            var data = this.data;

            index = (0, _utils.range)(index, 0, data.count);
            for (var i = index; i < data.count; i++) {
                if (!this.isDisabled(data.options[i])) return i;
            }
            for (var _i = index - 1; _i >= 0; _i--) {
                if (!this.isDisabled(data.options[_i])) return _i;
            }
        },
        isDisabled: function isDisabled(option) {
            return (0, _utils.isObj)(option) && option.disabled;
        },
        getOptionText: function getOptionText(option) {
            var data = this.data;

            return (0, _utils.isObj)(option) && data.valueKey in option ? option[data.valueKey] : option;
        },
        setIndex: function setIndex(index, userAction) {
            var _this2 = this;

            var data = this.data;

            index = this.adjustIndex(index) || 0;
            var offset = -index * data.itemHeight;
            if (index !== data.currentIndex) {
                return this.set({ offset: offset, currentIndex: index }).then(function () {
                    userAction && _this2.$emit('change', index);
                });
            } else {
                return this.set({ offset: offset });
            }
        },
        setValue: function setValue(value) {
            var options = this.data.options;

            for (var i = 0; i < options.length; i++) {
                if (this.getOptionText(options[i]) === value) {
                    return this.setIndex(i);
                }
            }
            return Promise.resolve();
        },
        getValue: function getValue() {
            var data = this.data;

            return data.options[data.currentIndex];
        }
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfRFVSQVRJT04iLCJjbGFzc2VzIiwicHJvcHMiLCJ2YWx1ZUtleSIsIlN0cmluZyIsImNsYXNzTmFtZSIsIml0ZW1IZWlnaHQiLCJOdW1iZXIiLCJ2aXNpYmxlSXRlbUNvdW50IiwiaW5pdGlhbE9wdGlvbnMiLCJ0eXBlIiwiQXJyYXkiLCJ2YWx1ZSIsImRlZmF1bHRJbmRleCIsImRhdGEiLCJzdGFydFkiLCJvZmZzZXQiLCJkdXJhdGlvbiIsInN0YXJ0T2Zmc2V0Iiwib3B0aW9ucyIsImN1cnJlbnRJbmRleCIsImNyZWF0ZWQiLCJzZXQiLCJ0aGVuIiwic2V0SW5kZXgiLCJjb21wdXRlZCIsImNvdW50IiwibGVuZ3RoIiwiYmFzZU9mZnNldCIsIndyYXBwZXJTdHlsZSIsImpvaW4iLCJ3YXRjaCIsIm1ldGhvZHMiLCJvblRvdWNoU3RhcnQiLCJldmVudCIsInRvdWNoZXMiLCJjbGllbnRZIiwib25Ub3VjaE1vdmUiLCJkZWx0YVkiLCJvblRvdWNoRW5kIiwiaW5kZXgiLCJNYXRoIiwicm91bmQiLCJvbkNsaWNrSXRlbSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiYWRqdXN0SW5kZXgiLCJpIiwiaXNEaXNhYmxlZCIsIm9wdGlvbiIsImRpc2FibGVkIiwiZ2V0T3B0aW9uVGV4dCIsInVzZXJBY3Rpb24iLCIkZW1pdCIsInNldFZhbHVlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJnZXRWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQSxJQUFNQSxtQkFBbUIsR0FBekI7QUFDQSw4QkFBYztBQUNWQyxhQUFTLENBQUMsY0FBRCxDQURDO0FBRVZDLFdBQU87QUFDSEMsa0JBQVVDLE1BRFA7QUFFSEMsbUJBQVdELE1BRlI7QUFHSEUsb0JBQVlDLE1BSFQ7QUFJSEMsMEJBQWtCRCxNQUpmO0FBS0hFLHdCQUFnQjtBQUNaQyxrQkFBTUMsS0FETTtBQUVaQyxtQkFBTztBQUZLLFNBTGI7QUFT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IGZyb20gJy4uL2NvbW1vbi9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBpc09iaiwgcmFuZ2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xyXG5jb25zdCBERUZBVUxUX0RVUkFUSU9OID0gMjAwO1xyXG5WYW50Q29tcG9uZW50KHtcclxuICAgIGNsYXNzZXM6IFsnYWN0aXZlLWNsYXNzJ10sXHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIHZhbHVlS2V5OiBTdHJpbmcsXHJcbiAgICAgICAgY2xhc3NOYW1lOiBTdHJpbmcsXHJcbiAgICAgICAgaXRlbUhlaWdodDogTnVtYmVyLFxyXG4gICAgICAgIHZpc2libGVJdGVtQ291bnQ6IE51bWJlcixcclxuICAgICAgICBpbml0aWFsT3B0aW9uczoge1xyXG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcclxuICAgICAgICAgICAgdmFsdWU6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWZhdWx0SW5kZXg6IHtcclxuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogMFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgc3RhcnRZOiAwLFxyXG4gICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICBkdXJhdGlvbjogMCxcclxuICAgICAgICBzdGFydE9mZnNldDogMCxcclxuICAgICAgICBvcHRpb25zOiBbXSxcclxuICAgICAgICBjdXJyZW50SW5kZXg6IDBcclxuICAgIH0sXHJcbiAgICBjcmVhdGVkKCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGVmYXVsdEluZGV4LCBpbml0aWFsT3B0aW9ucyB9ID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgY3VycmVudEluZGV4OiBkZWZhdWx0SW5kZXgsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IGluaXRpYWxPcHRpb25zXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXgoZGVmYXVsdEluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICAgIGNvdW50KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLm9wdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmFzZU9mZnNldCgpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEuaXRlbUhlaWdodCAqIChkYXRhLnZpc2libGVJdGVtQ291bnQgLSAxKSkgLyAyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd3JhcHBlclN0eWxlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBgdHJhbnNpdGlvbjogJHtkYXRhLmR1cmF0aW9ufW1zYCxcclxuICAgICAgICAgICAgICAgIGB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsICR7ZGF0YS5vZmZzZXQgKyBkYXRhLmJhc2VPZmZzZXR9cHgsIDApYCxcclxuICAgICAgICAgICAgICAgIGBsaW5lLWhlaWdodDogJHtkYXRhLml0ZW1IZWlnaHR9cHhgXHJcbiAgICAgICAgICAgIF0uam9pbignOyAnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgd2F0Y2g6IHtcclxuICAgICAgICBkZWZhdWx0SW5kZXgodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRJbmRleCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBvblRvdWNoU3RhcnQoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXQoe1xyXG4gICAgICAgICAgICAgICAgc3RhcnRZOiBldmVudC50b3VjaGVzWzBdLmNsaWVudFksXHJcbiAgICAgICAgICAgICAgICBzdGFydE9mZnNldDogdGhpcy5kYXRhLm9mZnNldCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Ub3VjaE1vdmUoZXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBkZWx0YVkgPSBldmVudC50b3VjaGVzWzBdLmNsaWVudFkgLSBkYXRhLnN0YXJ0WTtcclxuICAgICAgICAgICAgdGhpcy5zZXQoe1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiByYW5nZShkYXRhLnN0YXJ0T2Zmc2V0ICsgZGVsdGFZLCAtKGRhdGEuY291bnQgKiBkYXRhLml0ZW1IZWlnaHQpLCBkYXRhLml0ZW1IZWlnaHQpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Ub3VjaEVuZCgpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5vZmZzZXQgIT09IGRhdGEuc3RhcnRPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KHtcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogREVGQVVMVF9EVVJBVElPTlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHJhbmdlKE1hdGgucm91bmQoLWRhdGEub2Zmc2V0IC8gZGF0YS5pdGVtSGVpZ2h0KSwgMCwgZGF0YS5jb3VudCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbmRleChpbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xpY2tJdGVtKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgaW5kZXggfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgICAgICAgdGhpcy5zZXRJbmRleChpbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGp1c3RJbmRleChpbmRleCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgIGluZGV4ID0gcmFuZ2UoaW5kZXgsIDAsIGRhdGEuY291bnQpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPCBkYXRhLmNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKGRhdGEub3B0aW9uc1tpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4IC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKGRhdGEub3B0aW9uc1tpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzRGlzYWJsZWQob3B0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc09iaihvcHRpb24pICYmIG9wdGlvbi5kaXNhYmxlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldE9wdGlvblRleHQob3B0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIGlzT2JqKG9wdGlvbikgJiYgZGF0YS52YWx1ZUtleSBpbiBvcHRpb25cclxuICAgICAgICAgICAgICAgID8gb3B0aW9uW2RhdGEudmFsdWVLZXldXHJcbiAgICAgICAgICAgICAgICA6IG9wdGlvbjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldEluZGV4KGluZGV4LCB1c2VyQWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gdGhpcztcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLmFkanVzdEluZGV4KGluZGV4KSB8fCAwO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAtaW5kZXggKiBkYXRhLml0ZW1IZWlnaHQ7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gZGF0YS5jdXJyZW50SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldCh7IG9mZnNldCwgY3VycmVudEluZGV4OiBpbmRleCB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQWN0aW9uICYmIHRoaXMuJGVtaXQoJ2NoYW5nZScsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0KHsgb2Zmc2V0IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRPcHRpb25UZXh0KG9wdGlvbnNbaV0pID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldEluZGV4KGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLm9wdGlvbnNbZGF0YS5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdfQ==