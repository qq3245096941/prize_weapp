'use strict';

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*global unescape, define, module */

;(function ($) {
	'use strict';

	/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */

	function safe_add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 0xFFFF;
	}

	/*
 * Bitwise rotate a 32-bit number to the left.
 */
	function bit_rol(num, cnt) {
		return num << cnt | num >>> 32 - cnt;
	}

	/*
 * These functions implement the four basic operations the algorithm uses.
 */
	function md5_cmn(q, a, b, x, s, t) {
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}
	function md5_ff(a, b, c, d, x, s, t) {
		return md5_cmn(b & c | ~b & d, a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t) {
		return md5_cmn(b & d | c & ~d, a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t) {
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t) {
		return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
	}

	/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
	function binl_md5(x, len) {
		/* append padding */
		x[len >> 5] |= 0x80 << len % 32;
		x[(len + 64 >>> 9 << 4) + 14] = len;

		var i;
		var olda;
		var oldb;
		var oldc;
		var oldd;
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;

		for (i = 0; i < x.length; i += 16) {
			olda = a;
			oldb = b;
			oldc = c;
			oldd = d;

			a = md5_ff(a, b, c, d, x[i], 7, -680876936);
			d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
			b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
			d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
			c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
			d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
			d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

			a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
			d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
			c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
			b = md5_gg(b, c, d, a, x[i], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
			d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
			c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
			d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
			c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
			a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
			d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
			c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
			b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

			a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
			d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
			b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
			d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
			c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
			d = md5_hh(d, a, b, c, x[i], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
			a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
			d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
			b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

			a = md5_ii(a, b, c, d, x[i], 6, -198630844);
			d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
			c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
			d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
			d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
			a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
			d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
			b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return [a, b, c, d];
	}

	/*
 * Convert an array of little-endian words to a string
 */
	function binl2rstr(input) {
		var i;
		var output = '';
		var length32 = input.length * 32;
		for (i = 0; i < length32; i += 8) {
			output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);
		}
		return output;
	}

	/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
	function rstr2binl(input) {
		var i;
		var output = [];
		output[(input.length >> 2) - 1] = undefined;
		for (i = 0; i < output.length; i += 1) {
			output[i] = 0;
		}
		var length8 = input.length * 8;
		for (i = 0; i < length8; i += 8) {
			output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;
		}
		return output;
	}

	/*
 * Calculate the MD5 of a raw string
 */
	function rstr_md5(s) {
		return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
	}

	/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
	function rstr_hmac_md5(key, data) {
		var i;
		var bkey = rstr2binl(key);
		var ipad = [];
		var opad = [];
		var hash;
		ipad[15] = opad[15] = undefined;
		if (bkey.length > 16) {
			bkey = binl_md5(bkey, key.length * 8);
		}
		for (i = 0; i < 16; i += 1) {
			ipad[i] = bkey[i] ^ 0x36363636;
			opad[i] = bkey[i] ^ 0x5C5C5C5C;
		}
		hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
		return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
	}

	/*
 * Convert a raw string to a hex string
 */
	function rstr2hex(input) {
		var hex_tab = '0123456789abcdef';
		var output = '';
		var x;
		var i;
		for (i = 0; i < input.length; i += 1) {
			x = input.charCodeAt(i);
			output += hex_tab.charAt(x >>> 4 & 0x0F) + hex_tab.charAt(x & 0x0F);
		}
		return output;
	}

	/*
 * Encode a string as utf-8
 */
	function str2rstr_utf8(input) {
		return unescape(encodeURIComponent(input));
	}

	/*
 * Take string arguments and return either raw or hex encoded strings
 */
	function raw_md5(s) {
		return rstr_md5(str2rstr_utf8(s));
	}
	function hex_md5(s) {
		return rstr2hex(raw_md5(s));
	}
	function raw_hmac_md5(k, d) {
		return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
	}
	function hex_hmac_md5(k, d) {
		return rstr2hex(raw_hmac_md5(k, d));
	}

	function md5(string, key, raw) {
		if (!key) {
			if (!raw) {
				return hex_md5(string);
			}
			return raw_md5(string);
		}
		if (!raw) {
			return hex_hmac_md5(key, string);
		}
		return raw_hmac_md5(key, string);
	}

	module.exports = md5;
})(undefined);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1kNS5qcyJdLCJuYW1lcyI6WyIkIiwic2FmZV9hZGQiLCJ4IiwieSIsImxzdyIsIm1zdyIsImJpdF9yb2wiLCJudW0iLCJjbnQiLCJtZDVfY21uIiwicSIsImEiLCJiIiwicyIsInQiLCJtZDVfZmYiLCJjIiwiZCIsIm1kNV9nZyIsIm1kNV9oaCIsIm1kNV9paSIsImJpbmxfbWQ1IiwibGVuIiwiaSIsIm9sZGEiLCJvbGRiIiwib2xkYyIsIm9sZGQiLCJsZW5ndGgiLCJiaW5sMnJzdHIiLCJpbnB1dCIsIm91dHB1dCIsImxlbmd0aDMyIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwicnN0cjJiaW5sIiwidW5kZWZpbmVkIiwibGVuZ3RoOCIsImNoYXJDb2RlQXQiLCJyc3RyX21kNSIsInJzdHJfaG1hY19tZDUiLCJrZXkiLCJkYXRhIiwiYmtleSIsImlwYWQiLCJvcGFkIiwiaGFzaCIsImNvbmNhdCIsInJzdHIyaGV4IiwiaGV4X3RhYiIsImNoYXJBdCIsInN0cjJyc3RyX3V0ZjgiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsInJhd19tZDUiLCJoZXhfbWQ1IiwicmF3X2htYWNfbWQ1IiwiayIsImhleF9obWFjX21kNSIsIm1kNSIsInN0cmluZyIsInJhdyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkE7O0FBRUEsQ0FBRyxXQUFVQSxDQUFWLEVBQWE7QUFDZjs7QUFFQTs7Ozs7QUFJQSxVQUFTQyxRQUFULENBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0I7QUFDdkIsTUFBSUMsTUFBTSxDQUFDRixJQUFJLE1BQUwsS0FBZ0JDLElBQUksTUFBcEIsQ0FBVjtBQUNBLE1BQUlFLE1BQU0sQ0FBQ0gsS0FBSyxFQUFOLEtBQWFDLEtBQUssRUFBbEIsS0FBeUJDLE9BQU8sRUFBaEMsQ0FBVjtBQUNBLFNBQVFDLE9BQU8sRUFBUixHQUFlRCxNQUFNLE1BQTVCO0FBQ0E7O0FB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QW1CdkIsS0FBbkIsQ0FBVCxDQUFQO0FBQ0E7O0FBRUQ7OztBQUdBLFVBQVN3QixPQUFULENBQWlCekMsQ0FBakIsRUFBb0I7QUFDbkIsU0FBTzBCLFNBQVNZLGNBQWN0QyxDQUFkLENBQVQsQ0FBUDtBQUNBO0FBQ0QsVUFBUzBDLE9BQVQsQ0FBaUIxQyxDQUFqQixFQUFvQjtBQUNuQixTQUFPbUMsU0FBU00sUUFBUXpDLENBQVIsQ0FBVCxDQUFQO0FBQ0E7QUFDRCxVQUFTMkMsWUFBVCxDQUFzQkMsQ0FBdEIsRUFBeUJ4QyxDQUF6QixFQUE0QjtBQUMzQixTQUFPdUIsY0FBY1csY0FBY00sQ0FBZCxDQUFkLEVBQWdDTixjQUFjbEMsQ0FBZCxDQUFoQyxDQUFQO0FBQ0E7QUFDRCxVQUFTeUMsWUFBVCxDQUFzQkQsQ0FBdEIsRUFBeUJ4QyxDQUF6QixFQUE0QjtBQUMzQixTQUFPK0IsU0FBU1EsYUFBYUMsQ0FBYixFQUFnQnhDLENBQWhCLENBQVQsQ0FBUDtBQUNBOztBQUVELFVBQVMwQyxHQUFULENBQWFDLE1BQWIsRUFBcUJuQixHQUFyQixFQUEwQm9CLEdBQTFCLEVBQStCO0FBQzlCLE1BQUksQ0FBQ3BCLEdBQUwsRUFBVTtBQUNULE9BQUksQ0FBQ29CLEdBQUwsRUFBVTtBQUNULFdBQU9OLFFBQVFLLE1BQVIsQ0FBUDtBQUNBO0FBQ0QsVUFBT04sUUFBUU0sTUFBUixDQUFQO0FBQ0E7QUFDRCxNQUFJLENBQUNDLEdBQUwsRUFBVTtBQUNULFVBQU9ILGFBQWFqQixHQUFiLEVBQWtCbUIsTUFBbEIsQ0FBUDtBQUNBO0FBQ0QsU0FBT0osYUFBYWYsR0FBYixFQUFrQm1CLE1BQWxCLENBQVA7QUFDQTs7QUFFREUsUUFBT0MsT0FBUCxHQUFpQkosR0FBakI7QUFDQSxDQTNQRSxZQUFEIiwiZmlsZSI6Im1kNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIEphdmFTY3JpcHQgTUQ1XHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ibHVlaW1wL0phdmFTY3JpcHQtTUQ1XHJcbiAqXHJcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXHJcbiAqIGh0dHBzOi8vYmx1ZWltcC5uZXRcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxyXG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4gKlxyXG4gKiBCYXNlZCBvblxyXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFJTQSBEYXRhIFNlY3VyaXR5LCBJbmMuIE1ENSBNZXNzYWdlXHJcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXHJcbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxyXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XHJcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxyXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxyXG4gKi9cclxuXHJcbi8qZ2xvYmFsIHVuZXNjYXBlLCBkZWZpbmUsIG1vZHVsZSAqL1xyXG5cclxuOyAoZnVuY3Rpb24gKCQpIHtcclxuXHQndXNlIHN0cmljdCdcclxuXHJcblx0LypcclxuXHQqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcclxuXHQqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXHJcblx0Ki9cclxuXHRmdW5jdGlvbiBzYWZlX2FkZCh4LCB5KSB7XHJcblx0XHR2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpXHJcblx0XHR2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNilcclxuXHRcdHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpXHJcblx0fVxyXG5cclxuXHQvKlxyXG5cdCogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxyXG5cdCovXHJcblx0ZnVuY3Rpb24gYml0X3JvbChudW0sIGNudCkge1xyXG5cdFx0cmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpXHJcblx0fVxyXG5cclxuXHQvKlxyXG5cdCogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cclxuXHQqL1xyXG5cdGZ1bmN0aW9uIG1kNV9jbW4ocSwgYSwgYiwgeCwgcywgdCkge1xyXG5cdFx0cmV0dXJuIHNhZmVfYWRkKGJpdF9yb2woc2FmZV9hZGQoc2FmZV9hZGQoYSwgcSksIHNhZmVfYWRkKHgsIHQpKSwgcyksIGIpXHJcblx0fVxyXG5cdGZ1bmN0aW9uIG1kNV9mZihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcblx0XHRyZXR1cm4gbWQ1X2NtbigoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdClcclxuXHR9XHJcblx0ZnVuY3Rpb24gbWQ1X2dnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuXHRcdHJldHVybiBtZDVfY21uKChiICYgZCkgfCAoYyAmICh+ZCkpLCBhLCBiLCB4LCBzLCB0KVxyXG5cdH1cclxuXHRmdW5jdGlvbiBtZDVfaGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG5cdFx0cmV0dXJuIG1kNV9jbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KVxyXG5cdH1cclxuXHRmdW5jdGlvbiBtZDVfaWkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG5cdFx0cmV0dXJuIG1kNV9jbW4oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpXHJcblx0fVxyXG5cclxuXHQvKlxyXG5cdCogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cclxuXHQqL1xyXG5cdGZ1bmN0aW9uIGJpbmxfbWQ1KHgsIGxlbikge1xyXG5cdFx0LyogYXBwZW5kIHBhZGRpbmcgKi9cclxuXHRcdHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKGxlbiAlIDMyKVxyXG5cdFx0eFsoKChsZW4gKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gbGVuXHJcblxyXG5cdFx0dmFyIGlcclxuXHRcdHZhciBvbGRhXHJcblx0XHR2YXIgb2xkYlxyXG5cdFx0dmFyIG9sZGNcclxuXHRcdHZhciBvbGRkXHJcblx0XHR2YXIgYSA9IDE3MzI1ODQxOTNcclxuXHRcdHZhciBiID0gLTI3MTczMzg3OVxyXG5cdFx0dmFyIGMgPSAtMTczMjU4NDE5NFxyXG5cdFx0dmFyIGQgPSAyNzE3MzM4NzhcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcclxuXHRcdFx0b2xkYSA9IGFcclxuXHRcdFx0b2xkYiA9IGJcclxuXHRcdFx0b2xkYyA9IGNcclxuXHRcdFx0b2xkZCA9IGRcclxuXHJcblx0XHRcdGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpXSwgNywgLTY4MDg3NjkzNilcclxuXHRcdFx0ZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyAxXSwgMTIsIC0zODk1NjQ1ODYpXHJcblx0XHRcdGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE3LCA2MDYxMDU4MTkpXHJcblx0XHRcdGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpICsgM10sIDIyLCAtMTA0NDUyNTMzMClcclxuXHRcdFx0YSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNywgLTE3NjQxODg5NylcclxuXHRcdFx0ZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyA1XSwgMTIsIDEyMDAwODA0MjYpXHJcblx0XHRcdGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE3LCAtMTQ3MzIzMTM0MSlcclxuXHRcdFx0YiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyA3XSwgMjIsIC00NTcwNTk4MylcclxuXHRcdFx0YSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNywgMTc3MDAzNTQxNilcclxuXHRcdFx0ZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2kgKyA5XSwgMTIsIC0xOTU4NDE0NDE3KVxyXG5cdFx0XHRjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTcsIC00MjA2MylcclxuXHRcdFx0YiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2MilcclxuXHRcdFx0YSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDcsIDE4MDQ2MDM2ODIpXHJcblx0XHRcdGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpICsgMTNdLCAxMiwgLTQwMzQxMTAxKVxyXG5cdFx0XHRjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKVxyXG5cdFx0XHRiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsIDEyMzY1MzUzMjkpXHJcblxyXG5cdFx0XHRhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA1LCAtMTY1Nzk2NTEwKVxyXG5cdFx0XHRkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArIDZdLCA5LCAtMTA2OTUwMTYzMilcclxuXHRcdFx0YyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCA2NDM3MTc3MTMpXHJcblx0XHRcdGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpXSwgMjAsIC0zNzM4OTczMDIpXHJcblx0XHRcdGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpICsgNV0sIDUsIC03MDE1NTg2OTEpXHJcblx0XHRcdGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCA5LCAzODAxNjA4MylcclxuXHRcdFx0YyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KVxyXG5cdFx0XHRiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArIDRdLCAyMCwgLTQwNTUzNzg0OClcclxuXHRcdFx0YSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNSwgNTY4NDQ2NDM4KVxyXG5cdFx0XHRkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArIDE0XSwgOSwgLTEwMTk4MDM2OTApXHJcblx0XHRcdGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgM10sIDE0LCAtMTg3MzYzOTYxKVxyXG5cdFx0XHRiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArIDhdLCAyMCwgMTE2MzUzMTUwMSlcclxuXHRcdFx0YSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDUsIC0xNDQ0NjgxNDY3KVxyXG5cdFx0XHRkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSArIDJdLCA5LCAtNTE0MDM3ODQpXHJcblx0XHRcdGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpICsgN10sIDE0LCAxNzM1MzI4NDczKVxyXG5cdFx0XHRiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KVxyXG5cclxuXHRcdFx0YSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNCwgLTM3ODU1OClcclxuXHRcdFx0ZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyA4XSwgMTEsIC0yMDIyNTc0NDYzKVxyXG5cdFx0XHRjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsIDE4MzkwMzA1NjIpXHJcblx0XHRcdGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KVxyXG5cdFx0XHRhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA0LCAtMTUzMDk5MjA2MClcclxuXHRcdFx0ZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2kgKyA0XSwgMTEsIDEyNzI4OTMzNTMpXHJcblx0XHRcdGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgN10sIDE2LCAtMTU1NDk3NjMyKVxyXG5cdFx0XHRiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKVxyXG5cdFx0XHRhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNCwgNjgxMjc5MTc0KVxyXG5cdFx0XHRkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaV0sIDExLCAtMzU4NTM3MjIyKVxyXG5cdFx0XHRjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNiwgLTcyMjUyMTk3OSlcclxuXHRcdFx0YiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2kgKyA2XSwgMjMsIDc2MDI5MTg5KVxyXG5cdFx0XHRhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSArIDldLCA0LCAtNjQwMzY0NDg3KVxyXG5cdFx0XHRkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpXHJcblx0XHRcdGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgNTMwNzQyNTIwKVxyXG5cdFx0XHRiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSArIDJdLCAyMywgLTk5NTMzODY1MSlcclxuXHJcblx0XHRcdGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpXSwgNiwgLTE5ODYzMDg0NClcclxuXHRcdFx0ZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyA3XSwgMTAsIDExMjY4OTE0MTUpXHJcblx0XHRcdGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpXHJcblx0XHRcdGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgNV0sIDIxLCAtNTc0MzQwNTUpXHJcblx0XHRcdGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA2LCAxNzAwNDg1NTcxKVxyXG5cdFx0XHRkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArIDNdLCAxMCwgLTE4OTQ5ODY2MDYpXHJcblx0XHRcdGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpXHJcblx0XHRcdGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpICsgMV0sIDIxLCAtMjA1NDkyMjc5OSlcclxuXHRcdFx0YSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNiwgMTg3MzMxMzM1OSlcclxuXHRcdFx0ZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpXHJcblx0XHRcdGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE1LCAtMTU2MDE5ODM4MClcclxuXHRcdFx0YiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAxMzA5MTUxNjQ5KVxyXG5cdFx0XHRhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA2LCAtMTQ1NTIzMDcwKVxyXG5cdFx0XHRkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSArIDExXSwgMTAsIC0xMTIwMjEwMzc5KVxyXG5cdFx0XHRjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNSwgNzE4Nzg3MjU5KVxyXG5cdFx0XHRiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSArIDldLCAyMSwgLTM0MzQ4NTU1MSlcclxuXHJcblx0XHRcdGEgPSBzYWZlX2FkZChhLCBvbGRhKVxyXG5cdFx0XHRiID0gc2FmZV9hZGQoYiwgb2xkYilcclxuXHRcdFx0YyA9IHNhZmVfYWRkKGMsIG9sZGMpXHJcblx0XHRcdGQgPSBzYWZlX2FkZChkLCBvbGRkKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFthLCBiLCBjLCBkXVxyXG5cdH1cclxuXHJcblx0LypcclxuXHQqIENvbnZlcnQgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcyB0byBhIHN0cmluZ1xyXG5cdCovXHJcblx0ZnVuY3Rpb24gYmlubDJyc3RyKGlucHV0KSB7XHJcblx0XHR2YXIgaVxyXG5cdFx0dmFyIG91dHB1dCA9ICcnXHJcblx0XHR2YXIgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMlxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbmd0aDMyOyBpICs9IDgpIHtcclxuXHRcdFx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGlucHV0W2kgPj4gNV0gPj4+IChpICUgMzIpKSAmIDB4RkYpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gb3V0cHV0XHJcblx0fVxyXG5cclxuXHQvKlxyXG5cdCogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xyXG5cdCogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXHJcblx0Ki9cclxuXHRmdW5jdGlvbiByc3RyMmJpbmwoaW5wdXQpIHtcclxuXHRcdHZhciBpXHJcblx0XHR2YXIgb3V0cHV0ID0gW11cclxuXHRcdG91dHB1dFsoaW5wdXQubGVuZ3RoID4+IDIpIC0gMV0gPSB1bmRlZmluZWRcclxuXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRwdXQubGVuZ3RoOyBpICs9IDEpIHtcclxuXHRcdFx0b3V0cHV0W2ldID0gMFxyXG5cdFx0fVxyXG5cdFx0dmFyIGxlbmd0aDggPSBpbnB1dC5sZW5ndGggKiA4XHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoODsgaSArPSA4KSB7XHJcblx0XHRcdG91dHB1dFtpID4+IDVdIHw9IChpbnB1dC5jaGFyQ29kZUF0KGkgLyA4KSAmIDB4RkYpIDw8IChpICUgMzIpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gb3V0cHV0XHJcblx0fVxyXG5cclxuXHQvKlxyXG5cdCogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYSByYXcgc3RyaW5nXHJcblx0Ki9cclxuXHRmdW5jdGlvbiByc3RyX21kNShzKSB7XHJcblx0XHRyZXR1cm4gYmlubDJyc3RyKGJpbmxfbWQ1KHJzdHIyYmlubChzKSwgcy5sZW5ndGggKiA4KSlcclxuXHR9XHJcblxyXG5cdC8qXHJcblx0KiBDYWxjdWxhdGUgdGhlIEhNQUMtTUQ1LCBvZiBhIGtleSBhbmQgc29tZSBkYXRhIChyYXcgc3RyaW5ncylcclxuXHQqL1xyXG5cdGZ1bmN0aW9uIHJzdHJfaG1hY19tZDUoa2V5LCBkYXRhKSB7XHJcblx0XHR2YXIgaVxyXG5cdFx0dmFyIGJrZXkgPSByc3RyMmJpbmwoa2V5KVxyXG5cdFx0dmFyIGlwYWQgPSBbXVxyXG5cdFx0dmFyIG9wYWQgPSBbXVxyXG5cdFx0dmFyIGhhc2hcclxuXHRcdGlwYWRbMTVdID0gb3BhZFsxNV0gPSB1bmRlZmluZWRcclxuXHRcdGlmIChia2V5Lmxlbmd0aCA+IDE2KSB7XHJcblx0XHRcdGJrZXkgPSBiaW5sX21kNShia2V5LCBrZXkubGVuZ3RoICogOClcclxuXHRcdH1cclxuXHRcdGZvciAoaSA9IDA7IGkgPCAxNjsgaSArPSAxKSB7XHJcblx0XHRcdGlwYWRbaV0gPSBia2V5W2ldIF4gMHgzNjM2MzYzNlxyXG5cdFx0XHRvcGFkW2ldID0gYmtleVtpXSBeIDB4NUM1QzVDNUNcclxuXHRcdH1cclxuXHRcdGhhc2ggPSBiaW5sX21kNShpcGFkLmNvbmNhdChyc3RyMmJpbmwoZGF0YSkpLCA1MTIgKyBkYXRhLmxlbmd0aCAqIDgpXHJcblx0XHRyZXR1cm4gYmlubDJyc3RyKGJpbmxfbWQ1KG9wYWQuY29uY2F0KGhhc2gpLCA1MTIgKyAxMjgpKVxyXG5cdH1cclxuXHJcblx0LypcclxuXHQqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGEgaGV4IHN0cmluZ1xyXG5cdCovXHJcblx0ZnVuY3Rpb24gcnN0cjJoZXgoaW5wdXQpIHtcclxuXHRcdHZhciBoZXhfdGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnXHJcblx0XHR2YXIgb3V0cHV0ID0gJydcclxuXHRcdHZhciB4XHJcblx0XHR2YXIgaVxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdHggPSBpbnB1dC5jaGFyQ29kZUF0KGkpXHJcblx0XHRcdG91dHB1dCArPSBoZXhfdGFiLmNoYXJBdCgoeCA+Pj4gNCkgJiAweDBGKSArXHJcblx0XHRcdFx0aGV4X3RhYi5jaGFyQXQoeCAmIDB4MEYpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gb3V0cHV0XHJcblx0fVxyXG5cclxuXHQvKlxyXG5cdCogRW5jb2RlIGEgc3RyaW5nIGFzIHV0Zi04XHJcblx0Ki9cclxuXHRmdW5jdGlvbiBzdHIycnN0cl91dGY4KGlucHV0KSB7XHJcblx0XHRyZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KSlcclxuXHR9XHJcblxyXG5cdC8qXHJcblx0KiBUYWtlIHN0cmluZyBhcmd1bWVudHMgYW5kIHJldHVybiBlaXRoZXIgcmF3IG9yIGhleCBlbmNvZGVkIHN0cmluZ3NcclxuXHQqL1xyXG5cdGZ1bmN0aW9uIHJhd19tZDUocykge1xyXG5cdFx0cmV0dXJuIHJzdHJfbWQ1KHN0cjJyc3RyX3V0ZjgocykpXHJcblx0fVxyXG5cdGZ1bmN0aW9uIGhleF9tZDUocykge1xyXG5cdFx0cmV0dXJuIHJzdHIyaGV4KHJhd19tZDUocykpXHJcblx0fVxyXG5cdGZ1bmN0aW9uIHJhd19obWFjX21kNShrLCBkKSB7XHJcblx0XHRyZXR1cm4gcnN0cl9obWFjX21kNShzdHIycnN0cl91dGY4KGspLCBzdHIycnN0cl91dGY4KGQpKVxyXG5cdH1cclxuXHRmdW5jdGlvbiBoZXhfaG1hY19tZDUoaywgZCkge1xyXG5cdFx0cmV0dXJuIHJzdHIyaGV4KHJhd19obWFjX21kNShrLCBkKSlcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIG1kNShzdHJpbmcsIGtleSwgcmF3KSB7XHJcblx0XHRpZiAoIWtleSkge1xyXG5cdFx0XHRpZiAoIXJhdykge1xyXG5cdFx0XHRcdHJldHVybiBoZXhfbWQ1KHN0cmluZylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcmF3X21kNShzdHJpbmcpXHJcblx0XHR9XHJcblx0XHRpZiAoIXJhdykge1xyXG5cdFx0XHRyZXR1cm4gaGV4X2htYWNfbWQ1KGtleSwgc3RyaW5nKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJhd19obWFjX21kNShrZXksIHN0cmluZylcclxuXHR9XHJcblxyXG5cdG1vZHVsZS5leHBvcnRzID0gbWQ1O1xyXG59KHRoaXMpKVxyXG4iXX0=