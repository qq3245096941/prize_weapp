"use strict";

function base64_encode(str) {
	var c1, c2, c3;
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var i = 0,
	    len = str.length,
	    string = '';

	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			string += base64EncodeChars.charAt(c1 >> 2);
			string += base64EncodeChars.charAt((c1 & 0x3) << 4);
			string += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			string += base64EncodeChars.charAt(c1 >> 2);
			string += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
			string += base64EncodeChars.charAt((c2 & 0xF) << 2);
			string += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		string += base64EncodeChars.charAt(c1 >> 2);
		string += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
		string += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
		string += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return string;
}

function base64_decode(str) {
	var c1, c2, c3, c4;
	var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
	var i = 0,
	    len = str.length,
	    string = '';

	while (i < len) {
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);

		if (c1 == -1) break;

		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);

		if (c2 == -1) break;

		string += String.fromCharCode(c1 << 2 | (c2 & 0x30) >> 4);

		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61) return string;

			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);

		if (c3 == -1) break;

		string += String.fromCharCode((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);

		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61) return string;
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);

		if (c4 == -1) break;

		string += String.fromCharCode((c3 & 0x03) << 6 | c4);
	}
	return string;
}
module.exports = {
	'base64_encode': base64_encode,
	'base64_decode': base64_decode
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2U2NC5qcyJdLCJuYW1lcyI6WyJiYXNlNjRfZW5jb2RlIiwic3RyIiwiYzEiLCJjMiIsImMzIiwiYmFzZTY0RW5jb2RlQ2hhcnMiLCJpIiwibGVuIiwibGVuZ3RoIiwic3RyaW5nIiwiY2hhckNvZGVBdCIsImNoYXJBdCIsImJhc2U2NF9kZWNvZGUiLCJjNCIsImJhc2U2NERlY29kZUNoYXJzIiwiQXJyYXkiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLFNBQVNBLGFBQVQsQ0FBdUJDLEdBQXZCLEVBQTRCO0FBQzNCLEtBQUlDLEVBQUosRUFBUUMsRUFBUixFQUFZQyxFQUFaO0FBQ0EsS0FBSUMsb0JBQW9CLGtFQUF4QjtBQUNBLEtBQUlDLElBQUksQ0FBUjtBQUFBLEtBQVdDLE1BQU1OLElBQUlPLE1BQXJCO0FBQUEsS0FBNkJDLFNBQVMsRUFBdEM7O0FBRUEsUUFBT0gsSUFBSUMsR0FBWCxFQUFnQjtBQUNmTCxPQUFLRCxJQUFJUyxVQUFKLENBQWVKLEdBQWYsSUFBc0IsSUFBM0I7QUFDQSxNQUFJQSxLQUFLQyxHQUFULEVBQWM7QUFDYkUsYUFBVUosa0JBQWtCTSxNQUFsQixDQUF5QlQsTUFBTSxDQUEvQixDQUFWO0FBQ0FPLGFBQVVKLGtCQUFrQk0sTUFBbEIsQ0FBeUIsQ0FBQ1QsS0FBSyxHQUFOLEtBQWMsQ0FBdkMsQ0FBVjtBQUNBTyxhQUFVLElBQVY7QUFDQTtBQUNBO0FBQ0ROLE9BQUtGLElBQUlTLFVBQUosQ0FBZUosR0FBZixDQUFMO0FBQ0EsTUFBSUEsS0FBS0MsR0FBVCxFQUFjO0FBQ2JFLGFBQVVKLGtCQUFrQk0sTUFBbEIsQ0FBeUJULE1BQU0sQ0FBL0IsQ0FBVjtBQUNBTyxhQUFVSixrQkFBa0JNLE1BQWxCLENBQTBCLENBQUNULEtBQUssR0FBTixLQUFjLENBQWYsR0FDL0IsQ0FBQ0MsS0FBSyxJQUFOLEtBQWUsQ0FEVCxDQUFWO0FBRUFNLGFBQVVKLGtCQUFr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LE9BQU9DLFlBQVAsQ0FBcUJmLE1BQU0sQ0FBUCxHQUFhLENBQUNDLEtBQUssSUFBTixLQUFlLENBQWhELENBQVY7O0FBRUEsS0FBRztBQUNGQyxRQUFLSCxJQUFJUyxVQUFKLENBQWVKLEdBQWYsSUFBc0IsSUFBM0I7QUFDQSxPQUFJRixNQUFNLEVBQVYsRUFDQyxPQUFPSyxNQUFQOztBQUVETCxRQUFLVSxrQkFBa0JWLEVBQWxCLENBQUw7QUFDQSxHQU5ELFFBTVNFLElBQUlDLEdBQUosSUFBV0gsTUFBTSxDQUFDLENBTjNCOztBQVFBLE1BQUlBLE1BQU0sQ0FBQyxDQUFYLEVBQ0M7O0FBRURLLFlBQVVPLE9BQU9DLFlBQVAsQ0FBcUIsQ0FBQ2QsS0FBSyxHQUFOLEtBQWMsQ0FBZixHQUFxQixDQUFDQyxLQUFLLElBQU4sS0FBZSxDQUF4RCxDQUFWOztBQUVBLEtBQUc7QUFDRlMsUUFBS1osSUFBSVMsVUFBSixDQUFlSixHQUFmLElBQXNCLElBQTNCO0FBQ0EsT0FBSU8sTUFBTSxFQUFWLEVBQ0MsT0FBT0osTUFBUDtBQUNESSxRQUFLQyxrQkFBa0JELEVBQWxCLENBQUw7QUFDQSxHQUxELFFBS1NQLElBQUlDLEdBQUosSUFBV00sTUFBTSxDQUFDLENBTDNCOztBQU9BLE1BQUlBLE1BQU0sQ0FBQyxDQUFYLEVBQ0M7O0FBRURKLFlBQVVPLE9BQU9DLFlBQVAsQ0FBcUIsQ0FBQ2IsS0FBSyxJQUFOLEtBQWUsQ0FBaEIsR0FBcUJTLEVBQXpDLENBQVY7QUFDQTtBQUNELFFBQU9KLE1BQVA7QUFDQTtBQUNEUyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2hCLGtCQUFpQm5CLGFBREQ7QUFFaEIsa0JBQWlCWTtBQUZELENBQWpCIiwiZmlsZSI6ImJhc2U2NC5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGJhc2U2NF9lbmNvZGUoc3RyKSB7XHJcblx0dmFyIGMxLCBjMiwgYzM7XHJcblx0dmFyIGJhc2U2NEVuY29kZUNoYXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XHJcblx0dmFyIGkgPSAwLCBsZW4gPSBzdHIubGVuZ3RoLCBzdHJpbmcgPSAnJztcclxuXHJcblx0d2hpbGUgKGkgPCBsZW4pIHtcclxuXHRcdGMxID0gc3RyLmNoYXJDb2RlQXQoaSsrKSAmIDB4ZmY7XHJcblx0XHRpZiAoaSA9PSBsZW4pIHtcclxuXHRcdFx0c3RyaW5nICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdChjMSA+PiAyKTtcclxuXHRcdFx0c3RyaW5nICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoYzEgJiAweDMpIDw8IDQpO1xyXG5cdFx0XHRzdHJpbmcgKz0gXCI9PVwiO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdGMyID0gc3RyLmNoYXJDb2RlQXQoaSsrKTtcclxuXHRcdGlmIChpID09IGxlbikge1xyXG5cdFx0XHRzdHJpbmcgKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KGMxID4+IDIpO1xyXG5cdFx0XHRzdHJpbmcgKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KCgoYzEgJiAweDMpIDw8IDQpXHJcblx0XHRcdFx0fCAoKGMyICYgMHhGMCkgPj4gNCkpO1xyXG5cdFx0XHRzdHJpbmcgKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KChjMiAmIDB4RikgPDwgMik7XHJcblx0XHRcdHN0cmluZyArPSBcIj1cIjtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHRjMyA9IHN0ci5jaGFyQ29kZUF0KGkrKyk7XHJcblx0XHRzdHJpbmcgKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KGMxID4+IDIpO1xyXG5cdFx0c3RyaW5nICs9IGJhc2U2NEVuY29kZUNoYXJzLmNoYXJBdCgoKGMxICYgMHgzKSA8PCA0KVxyXG5cdFx0XHR8ICgoYzIgJiAweEYwKSA+PiA0KSk7XHJcblx0XHRzdHJpbmcgKz0gYmFzZTY0RW5jb2RlQ2hhcnMuY2hhckF0KCgoYzIgJiAweEYpIDw8IDIpXHJcblx0XHRcdHwgKChjMyAmIDB4QzApID4+IDYpKTtcclxuXHRcdHN0cmluZyArPSBiYXNlNjRFbmNvZGVDaGFycy5jaGFyQXQoYzMgJiAweDNGKVxyXG5cdH1cclxuXHRyZXR1cm4gc3RyaW5nXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJhc2U2NF9kZWNvZGUoc3RyKSB7XHJcblx0dmFyIGMxLCBjMiwgYzMsIGM0O1xyXG5cdHZhciBiYXNlNjREZWNvZGVDaGFycyA9IG5ldyBBcnJheSgtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSxcclxuXHRcdC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSxcclxuXHRcdC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCA2MixcclxuXHRcdC0xLCAtMSwgLTEsIDYzLCA1MiwgNTMsIDU0LCA1NSwgNTYsIDU3LCA1OCwgNTksIDYwLCA2MSwgLTEsIC0xLCAtMSxcclxuXHRcdC0xLCAtMSwgLTEsIC0xLCAwLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsXHJcblx0XHQxNSwgMTYsIDE3LCAxOCwgMTksIDIwLCAyMSwgMjIsIDIzLCAyNCwgMjUsIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsXHJcblx0XHQyNiwgMjcsIDI4LCAyOSwgMzAsIDMxLCAzMiwgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLCA0MSwgNDIsXHJcblx0XHQ0MywgNDQsIDQ1LCA0NiwgNDcsIDQ4LCA0OSwgNTAsIDUxLCAtMSwgLTEsIC0xLCAtMSwgLTEpO1xyXG5cdHZhciBpID0gMCwgbGVuID0gc3RyLmxlbmd0aCwgc3RyaW5nID0gJyc7XHJcblxyXG5cdHdoaWxlIChpIDwgbGVuKSB7XHJcblx0XHRkbyB7XHJcblx0XHRcdGMxID0gYmFzZTY0RGVjb2RlQ2hhcnNbc3RyLmNoYXJDb2RlQXQoaSsrKSAmIDB4ZmZdXHJcblx0XHR9IHdoaWxlIChpIDwgbGVuICYmIGMxID09IC0xKTtcclxuXHJcblx0XHRpZiAoYzEgPT0gLTEpXHJcblx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdGRvIHtcclxuXHRcdFx0YzIgPSBiYXNlNjREZWNvZGVDaGFyc1tzdHIuY2hhckNvZGVBdChpKyspICYgMHhmZl1cclxuXHRcdH0gd2hpbGUgKGkgPCBsZW4gJiYgYzIgPT0gLTEpO1xyXG5cclxuXHRcdGlmIChjMiA9PSAtMSlcclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0c3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMxIDw8IDIpIHwgKChjMiAmIDB4MzApID4+IDQpKTtcclxuXHJcblx0XHRkbyB7XHJcblx0XHRcdGMzID0gc3RyLmNoYXJDb2RlQXQoaSsrKSAmIDB4ZmY7XHJcblx0XHRcdGlmIChjMyA9PSA2MSlcclxuXHRcdFx0XHRyZXR1cm4gc3RyaW5nO1xyXG5cclxuXHRcdFx0YzMgPSBiYXNlNjREZWNvZGVDaGFyc1tjM11cclxuXHRcdH0gd2hpbGUgKGkgPCBsZW4gJiYgYzMgPT0gLTEpO1xyXG5cclxuXHRcdGlmIChjMyA9PSAtMSlcclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0c3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKChjMiAmIDBYRikgPDwgNCkgfCAoKGMzICYgMHgzQykgPj4gMikpO1xyXG5cclxuXHRcdGRvIHtcclxuXHRcdFx0YzQgPSBzdHIuY2hhckNvZGVBdChpKyspICYgMHhmZjtcclxuXHRcdFx0aWYgKGM0ID09IDYxKVxyXG5cdFx0XHRcdHJldHVybiBzdHJpbmc7XHJcblx0XHRcdGM0ID0gYmFzZTY0RGVjb2RlQ2hhcnNbYzRdXHJcblx0XHR9IHdoaWxlIChpIDwgbGVuICYmIGM0ID09IC0xKTtcclxuXHJcblx0XHRpZiAoYzQgPT0gLTEpXHJcblx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYzMgJiAweDAzKSA8PCA2KSB8IGM0KVxyXG5cdH1cclxuXHRyZXR1cm4gc3RyaW5nO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdCdiYXNlNjRfZW5jb2RlJzogYmFzZTY0X2VuY29kZSxcclxuXHQnYmFzZTY0X2RlY29kZSc6IGJhc2U2NF9kZWNvZGVcclxufTsiXX0=