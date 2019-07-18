'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _base = require('./base64.js');

var _md = require('./md5.js');

var _md2 = _interopRequireDefault(_md);

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var util = {};

util.base64_encode = function (str) {
	return (0, _base.base64_encode)(str);
};

util.base64_decode = function (str) {
	return (0, _base.base64_decode)(str);
};

util.md5 = function (str) {
	return (0, _md2.default)(str);
};

/**
	构造微擎地址, 
	@params action 微擎系统中的controller, action, do，格式为 'wxapp/home/navs'
	@params querystring 格式为 {参数名1 : 值1, 参数名2 : 值2}
*/
util.url = function (action, querystring) {
	var app = _wepy2.default.$instance;
	var url = app.siteInfo.siteroot + '?i=' + app.siteInfo.uniacid + '&t=' + app.siteInfo.multiid + '&v=' + app.siteInfo.version + '&from=wxapp&';

	if (action) {
		action = action.split('/');
		if (action[0]) {
			url += 'c=' + action[0] + '&';
		}
		if (action[1]) {
			url += 'a=' + action[1] + '&';
		}
		if (action[2]) {
			url += 'do=' + action[2] + '&';
		}
	}
	if (querystring && (typeof querystring === 'undefined' ? 'undefined' : _typeof(querystring)) === 'object') {
		for (var param in querystring) {
			if (param && querystring.hasOwnProperty(params) && querystring[param]) {
				url += param + '=' + querystring[param] + '&';
			}
		}
	}
	return url;
};

function getQuery(url) {
	var theRequest = [];
	if (url.indexOf("?") != -1) {
		var str = url.split('?')[1];
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			if (strs[i].split("=")[0] && unescape(strs[i].split("=")[1])) {
				theRequest[i] = {
					'name': strs[i].split("=")[0],
					'value': unescape(strs[i].split("=")[1])
				};
			}
		}
	}
	return theRequest;
}
/*
* 获取链接某个参数
* url 链接地址
* name 参数名称
*/
function getUrlParam(url, name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
	var r = url.split('?')[1].match(reg); //匹配目标参数  
	if (r != null) return unescape(r[2]);return null; //返回参数值  
}
/**
 * 获取签名 将链接地址的所有参数按字母排序后拼接加上token进行md5
 * url 链接地址
 * date 参数{参数名1 : 值1, 参数名2 : 值2} *
 * token 签名token 非必须
 */
function getSign(url, data, token) {
	var _ = require('./underscore.js');
	var md5 = require('./md5.js');
	var querystring = '';
	var sign = getUrlParam(url, 'sign');
	if (sign || data && data.sign) {
		return false;
	} else {
		if (url) {
			querystring = getQuery(url);
		}
		if (data) {
			var theRequest = [];
			for (var param in data) {
				if (param && data[param]) {
					theRequest = theRequest.concat({
						'name': param,
						'value': data[param]
					});
				}
			}
			querystring = querystring.concat(theRequest);
		}
		//排序
		querystring = _.sortBy(querystring, 'name');
		//去重
		querystring = _.uniq(querystring, true, 'name');
		var urlData = '';
		for (var i = 0; i < querystring.length; i++) {
			if (querystring[i] && querystring[i].name && querystring[i].value) {
				urlData += querystring[i].name + '=' + querystring[i].value;
				if (i < querystring.length - 1) {
					urlData += '&';
				}
			}
		}
		token = token ? token : _wepy2.default.$instance.siteInfo.token;
		sign = md5(urlData + token);
		return sign;
	}
}
util.getSign = function (url, data, token) {
	return getSign(url, data, token);
};
/**
	二次封装微信wx.request函数、增加交互体全、配置缓存、以及配合微擎格式化返回数据

	@params option 弹出参数表，
	{
		url : 同微信,
		data : 同微信,
		header : 同微信,
		method : 同微信,
		success : 同微信,
		fail : 同微信,
		complete : 同微信,

		cachetime : 缓存周期，在此周期内不重复请求http，默认不缓存
	}
*/
util.request = function (option) {
	var _wx$request;

	var _ = require('./underscore.js');
	var md5 = require('./md5.js');
	var app = _wepy2.default.$instance;
	var option = option ? option : {};
	option.cachetime = option.cachetime ? option.cachetime : 0;
	option.showLoading = typeof option.showLoading != 'undefined' ? option.showLoading : true;

	var sessionid = wx.getStorageSync('userInfo').sessionid;
	var url = option.url;
	if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
		url = util.url(url);
	}
	var state = getUrlParam(url, 'state');
	if (!state && !(option.data && option.data.state) && sessionid) {
		url = url + '&state=we7sid-' + sessionid;
	}

	url = url + "&m=" + require('./../siteinfo.js').m;

	var sign = getSign(url, option.data);
	if (sign) {
		url = url + "&sign=" + sign;
	}
	if (!url) {
		return false;
	}
	wx.showNavigationBarLoading();
	if (option.showLoading) {
		util.showLoading();
	}
	if (option.cachetime) {
		var cachekey = md5(url);
		var cachedata = wx.getStorageSync(cachekey);
		var timestamp = Date.parse(new Date());

		if (cachedata && cachedata.data) {
			if (cachedata.expire > timestamp) {
				if (option.complete && typeof option.complete == 'function') {
					option.complete(cachedata);
				}
				if (option.success && typeof option.success == 'function') {
					option.success(cachedata);
				}
				console.log('cache:' + url);
				wx.hideLoading();
				wx.hideNavigationBarLoading();
				return true;
			} else {
				wx.removeStorageSync(cachekey);
			}
		}
	}
	wx.request((_wx$request = {
		'url': url,
		'data': option.data ? option.data : {},
		'header': option.header ? option.header : {},
		'method': option.method ? option.method : 'GET'
	}, _defineProperty(_wx$request, 'header', {
		'content-type': 'application/x-www-form-urlencoded'
	}), _defineProperty(_wx$request, 'success', function success(response) {
		wx.hideNavigationBarLoading();
		wx.hideLoading();
		if (response.data.errno) {
			if (response.data.errno == '41009') {
				wx.setStorageSync('userInfo', '');
				util.getUserInfo(function () {
					util.request(option);
				});
				return;
			} else {
				if (option.fail && typeof option.fail == 'function') {
					option.fail(response);
				} else {
					if (response.data.message) {
						if (response.data.data != null && response.data.data.redirect) {
							var redirect = response.data.data.redirect;
						} else {
							var redirect = '';
						}
						app.util.message(response.data.message, redirect, 'error');
					}
				}
				return;
			}
		} else {
			if (option.success && typeof option.success == 'function') {
				option.success(response);
			}
			//写入缓存，减少HTTP请求，并且如果网络异常可以读取缓存数据
			if (option.cachetime) {
				var cachedata = { 'data': response.data, 'expire': timestamp + option.cachetime * 1000 };
				wx.setStorageSync(cachekey, cachedata);
			}
		}
	}), _defineProperty(_wx$request, 'fail', function fail(response) {
		wx.hideNavigationBarLoading();
		wx.hideLoading();

		//如果请求失败，尝试从缓存中读取数据
		var md5 = require('./md5.js');
		var cachekey = md5(url);
		var cachedata = wx.getStorageSync(cachekey);
		if (cachedata && cachedata.data) {
			if (option.success && typeof option.success == 'function') {
				option.success(cachedata);
			}
			console.log('failreadcache:' + url);
			return true;
		} else {
			if (option.fail && typeof option.fail == 'function') {
				option.fail(response);
			}
		}
	}), _defineProperty(_wx$request, 'complete', function complete(response) {
		// wx.hideNavigationBarLoading();
		// wx.hideLoading();
		if (option.complete && typeof option.complete == 'function') {
			option.complete(response);
		}
	}), _wx$request));
};
/*
* 获取用户信息
*/
util.getUserInfo = function (cb) {
	var login = function login() {
		console.log('start login');
		var userInfo = {
			'sessionid': '',
			'wxInfo': '',
			'memberInfo': ''
		};
		wx.login({
			success: function success(res) {
				util.request({
					url: 'auth/session/openid',
					data: { code: res.code },
					cachetime: 0,
					success: function success(session) {
						if (!session.data.errno) {
							userInfo.sessionid = session.data.data.sessionid;
							wx.setStorageSync('userInfo', userInfo);
							wx.getUserInfo({
								success: function success(wxInfo) {
									userInfo.wxInfo = wxInfo.userInfo;
									wx.setStorageSync('userInfo', userInfo);
									util.request({
										url: 'auth/session/userinfo',
										data: {
											signature: wxInfo.signature,
											rawData: wxInfo.rawData,
											iv: wxInfo.iv,
											encryptedData: wxInfo.encryptedData
										},
										method: 'POST',
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										cachetime: 0,
										success: function success(res) {
											if (!res.data.errno) {
												userInfo.memberInfo = res.data.data;
												wx.setStorageSync('userInfo', userInfo);
											}
											typeof cb == "function" && cb(userInfo);
										}
									});
								},
								fail: function fail() {
									typeof cb == "function" && cb(userInfo);
								},
								complete: function complete() {}
							});
						}
					}
				});
			},
			fail: function fail() {
				wx.showModal({
					title: '获取信息失败',
					content: '请允许授权以便为您提供给服务',
					success: function success(res) {
						if (res.confirm) {
							util.getUserInfo();
						}
					}
				});
			}
		});
	};

	var app = wx.getStorageSync('userInfo');
	if (app.sessionid) {
		wx.checkSession({
			success: function success() {
				typeof cb == "function" && cb(app);
			},
			fail: function fail() {
				app.sessionid = '';
				console.log('relogin');
				wx.removeStorageSync('userInfo');
				login();
			}
		});
	} else {
		//调用登录接口
		login();
	}
};

util.navigateBack = function (obj) {
	var delta = obj.delta ? obj.delta : 1;
	if (obj.data) {
		var pages = getCurrentPages();
		var curPage = pages[pages.length - (delta + 1)];
		if (curPage.pageForResult) {
			curPage.pageForResult(obj.data);
		} else {
			curPage.setData(obj.data);
		}
	}
	wx.navigateBack({
		delta: delta, // 回退前 delta(默认为1) 页面
		success: function success(res) {
			// success
			typeof obj.success == "function" && obj.success(res);
		},
		fail: function fail(err) {
			// fail
			typeof obj.fail == "function" && obj.fail(err);
		},
		complete: function complete() {
			// complete
			typeof obj.complete == "function" && obj.complete();
		}
	});
};

util.footer = function ($this) {
	var app = _wepy2.default.$instance;
	var that = $this;
	var tabBar = app.tabBar;
	for (var i in tabBar['list']) {
		tabBar['list'][i]['pageUrl'] = tabBar['list'][i]['pagePath'].replace(/(\?|#)[^"]*/g, '');
	}
	that.setData({
		tabBar: tabBar,
		'tabBar.thisurl': that.__route__
	});
};
/*
 * 提示信息
 * type 为 success, error 当为 success,  时，为toast方式，否则为模态框的方式
 * redirect 为提示后的跳转地址, 跳转的时候可以加上 协议名称  
 * navigate:/we7/pages/detail/detail 以 navigateTo 的方法跳转，
 * redirect:/we7/pages/detail/detail 以 redirectTo 的方式跳转，默认为 redirect
*/
util.message = function (title, redirect, type) {
	if (!title) {
		return true;
	}
	if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) == 'object') {
		redirect = title.redirect;
		type = title.type;
		title = title.title;
	}
	if (redirect) {
		var redirectType = redirect.substring(0, 9),
		    url = '',
		    redirectFunction = '';
		if (redirectType == 'navigate:') {
			redirectFunction = 'navigateTo';
			url = redirect.substring(9);
		} else if (redirectType == 'redirect:') {
			redirectFunction = 'redirectTo';
			url = redirect.substring(9);
		} else {
			url = redirect;
			redirectFunction = 'redirectTo';
		}
	}
	console.log(url);
	if (!type) {
		type = 'success';
	}

	if (type == 'success') {
		wx.showToast({
			title: title,
			icon: 'success',
			duration: 2000,
			mask: url ? true : false,
			complete: function complete() {
				if (url) {
					setTimeout(function () {
						wx[redirectFunction]({
							url: url
						});
					}, 1800);
				}
			}
		});
	} else if (type == 'error') {
		wx.showModal({
			title: '系统信息',
			content: title,
			showCancel: false,
			complete: function complete() {
				if (url) {
					wx[redirectFunction]({
						url: url
					});
				}
			}
		});
	}
};

util.user = util.getUserInfo;

//封装微信等待提示，防止ajax过多时，show多次
util.showLoading = function () {
	var isShowLoading = wx.getStorageSync('isShowLoading');
	if (isShowLoading) {
		wx.hideLoading();
		wx.setStorageSync('isShowLoading', false);
	}

	wx.showLoading({
		title: '加载中',
		complete: function complete() {
			wx.setStorageSync('isShowLoading', true);
		},
		fail: function fail() {
			wx.setStorageSync('isShowLoading', false);
		}
	});
};

util.showImage = function (event) {
	var url = event ? event.currentTarget.dataset.preview : '';
	if (!url) {
		return false;
	}
	wx.previewImage({
		urls: [url]
	});
};

/**
 * 转换内容中的emoji表情为 unicode 码点，在Php中使用utf8_bytes来转换输出
*/
util.parseContent = function (string) {
	if (!string) {
		return string;
	}

	var ranges = ['\uD83C[\uDF00-\uDFFF]', // U+1F300 to U+1F3FF
	'\uD83D[\uDC00-\uDE4F]', // U+1F400 to U+1F64F
	'\uD83D[\uDE80-\uDEFF]' // U+1F680 to U+1F6FF
	];
	var emoji = string.match(new RegExp(ranges.join('|'), 'g'));

	if (emoji) {
		for (var i in emoji) {
			string = string.replace(emoji[i], '[U+' + emoji[i].codePointAt(0).toString(16).toUpperCase() + ']');
		}
	}
	return string;
};

util.date = function () {
	/**
  * 判断闰年
  * @param date Date日期对象
  * @return boolean true 或false
  */
	this.isLeapYear = function (date) {
		return 0 == date.getYear() % 4 && (date.getYear() % 100 != 0 || date.getYear() % 400 == 0);
	};

	/**
  * 日期对象转换为指定格式的字符串
  * @param f 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
  * @param date Date日期对象, 如果缺省，则为当前时间
  *
  * YYYY/yyyy/YY/yy 表示年份  
  * MM/M 月份  
  * W/w 星期  
  * dd/DD/d/D 日期  
  * hh/HH/h/H 时间  
  * mm/m 分钟  
  * ss/SS/s/S 秒  
  * @return string 指定格式的时间字符串
  */
	this.dateToStr = function (formatStr, date) {
		formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
		date = arguments[1] || new Date();
		var str = formatStr;
		var Week = ['日', '一', '二', '三', '四', '五', '六'];
		str = str.replace(/yyyy|YYYY/, date.getFullYear());
		str = str.replace(/yy|YY/, date.getYear() % 100 > 9 ? (date.getYear() % 100).toString() : '0' + date.getYear() % 100);
		str = str.replace(/MM/, date.getMonth() > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1));
		str = str.replace(/M/g, date.getMonth());
		str = str.replace(/w|W/g, Week[date.getDay()]);

		str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
		str = str.replace(/d|D/g, date.getDate());

		str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
		str = str.replace(/h|H/g, date.getHours());
		str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
		str = str.replace(/m/g, date.getMinutes());

		str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
		str = str.replace(/s|S/g, date.getSeconds());

		return str;
	};

	/**
 * 日期计算  
 * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒  
 * @param num int
 * @param date Date 日期对象
 * @return Date 返回日期对象
 */
	this.dateAdd = function (strInterval, num, date) {
		date = arguments[2] || new Date();
		switch (strInterval) {
			case 's':
				return new Date(date.getTime() + 1000 * num);
			case 'n':
				return new Date(date.getTime() + 60000 * num);
			case 'h':
				return new Date(date.getTime() + 3600000 * num);
			case 'd':
				return new Date(date.getTime() + 86400000 * num);
			case 'w':
				return new Date(date.getTime() + 86400000 * 7 * num);
			case 'm':
				return new Date(date.getFullYear(), date.getMonth() + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
			case 'y':
				return new Date(date.getFullYear() + num, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
		}
	};

	/**
 * 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
 * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒  
 * @param dtStart Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param dtEnd Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒 
 */
	this.dateDiff = function (strInterval, dtStart, dtEnd) {
		switch (strInterval) {
			case 's':
				return parseInt((dtEnd - dtStart) / 1000);
			case 'n':
				return parseInt((dtEnd - dtStart) / 60000);
			case 'h':
				return parseInt((dtEnd - dtStart) / 3600000);
			case 'd':
				return parseInt((dtEnd - dtStart) / 86400000);
			case 'w':
				return parseInt((dtEnd - dtStart) / (86400000 * 7));
			case 'm':
				return dtEnd.getMonth() + 1 + (dtEnd.getFullYear() - dtStart.getFullYear()) * 12 - (dtStart.getMonth() + 1);
			case 'y':
				return dtEnd.getFullYear() - dtStart.getFullYear();
		}
	};

	/**
 * 字符串转换为日期对象 // eval 不可用
 * @param date Date 格式为yyyy-MM-dd HH:mm:ss，必须按年月日时分秒的顺序，中间分隔符不限制
 */
	this.strToDate = function (dateStr) {
		var data = dateStr;
		var reCat = /(\d{1,4})/gm;
		var t = data.match(reCat);
		t[1] = t[1] - 1;
		eval('var d = new Date(' + t.join(',') + ');');
		return d;
	};

	/**
 * 把指定格式的字符串转换为日期对象yyyy-MM-dd HH:mm:ss
 * 
 */
	this.strFormatToDate = function (formatStr, dateStr) {
		var year = 0;
		var start = -1;
		var len = dateStr.length;
		if ((start = formatStr.indexOf('yyyy')) > -1 && start < len) {
			year = dateStr.substr(start, 4);
		}
		var month = 0;
		if ((start = formatStr.indexOf('MM')) > -1 && start < len) {
			month = parseInt(dateStr.substr(start, 2)) - 1;
		}
		var day = 0;
		if ((start = formatStr.indexOf('dd')) > -1 && start < len) {
			day = parseInt(dateStr.substr(start, 2));
		}
		var hour = 0;
		if (((start = formatStr.indexOf('HH')) > -1 || (start = formatStr.indexOf('hh')) > 1) && start < len) {
			hour = parseInt(dateStr.substr(start, 2));
		}
		var minute = 0;
		if ((start = formatStr.indexOf('mm')) > -1 && start < len) {
			minute = dateStr.substr(start, 2);
		}
		var second = 0;
		if ((start = formatStr.indexOf('ss')) > -1 && start < len) {
			second = dateStr.substr(start, 2);
		}
		return new Date(year, month, day, hour, minute, second);
	};

	/**
 * 日期对象转换为毫秒数
 */
	this.dateToLong = function (date) {
		return date.getTime();
	};

	/**
 * 毫秒转换为日期对象
 * @param dateVal number 日期的毫秒数 
 */
	this.longToDate = function (dateVal) {
		return new Date(dateVal);
	};

	/**
 * 判断字符串是否为日期格式
 * @param str string 字符串
 * @param formatStr string 日期格式， 如下 yyyy-MM-dd
 */
	this.isDate = function (str, formatStr) {
		if (formatStr == null) {
			formatStr = "yyyyMMdd";
		}
		var yIndex = formatStr.indexOf("yyyy");
		if (yIndex == -1) {
			return false;
		}
		var year = str.substring(yIndex, yIndex + 4);
		var mIndex = formatStr.indexOf("MM");
		if (mIndex == -1) {
			return false;
		}
		var month = str.substring(mIndex, mIndex + 2);
		var dIndex = formatStr.indexOf("dd");
		if (dIndex == -1) {
			return false;
		}
		var day = str.substring(dIndex, dIndex + 2);
		if (!isNumber(year) || year > "2100" || year < "1900") {
			return false;
		}
		if (!isNumber(month) || month > "12" || month < "01") {
			return false;
		}
		if (day > getMaxDay(year, month) || day < "01") {
			return false;
		}
		return true;
	};

	this.getMaxDay = function (year, month) {
		if (month == 4 || month == 6 || month == 9 || month == 11) return "30";
		if (month == 2) if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) return "29";else return "28";
		return "31";
	};
	/**
 *	变量是否为数字
 */
	this.isNumber = function (str) {
		var regExp = /^\d+$/g;
		return regExp.test(str);
	};

	/**
 * 把日期分割成数组 [年、月、日、时、分、秒]
 */
	this.toArray = function (myDate) {
		myDate = arguments[0] || new Date();
		var myArray = Array();
		myArray[0] = myDate.getFullYear();
		myArray[1] = myDate.getMonth();
		myArray[2] = myDate.getDate();
		myArray[3] = myDate.getHours();
		myArray[4] = myDate.getMinutes();
		myArray[5] = myDate.getSeconds();
		return myArray;
	};

	/**
 * 取得日期数据信息  
 * 参数 interval 表示数据类型  
 * y 年 M月 d日 w星期 ww周 h时 n分 s秒  
 */
	this.datePart = function (interval, myDate) {
		myDate = arguments[1] || new Date();
		var partStr = '';
		var Week = ['日', '一', '二', '三', '四', '五', '六'];
		switch (interval) {
			case 'y':
				partStr = myDate.getFullYear();break;
			case 'M':
				partStr = myDate.getMonth() + 1;break;
			case 'd':
				partStr = myDate.getDate();break;
			case 'w':
				partStr = Week[myDate.getDay()];break;
			case 'ww':
				partStr = myDate.WeekNumOfYear();break;
			case 'h':
				partStr = myDate.getHours();break;
			case 'm':
				partStr = myDate.getMinutes();break;
			case 's':
				partStr = myDate.getSeconds();break;
		}
		return partStr;
	};

	/**
 * 取得当前日期所在月的最大天数  
 */
	this.maxDayOfDate = function (date) {
		date = arguments[0] || new Date();
		date.setDate(1);
		date.setMonth(date.getMonth() + 1);
		var time = date.getTime() - 24 * 60 * 60 * 1000;
		var newDate = new Date(time);
		return newDate.getDate();
	};
};

module.exports = util;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsidXRpbCIsImJhc2U2NF9lbmNvZGUiLCJzdHIiLCJiYXNlNjRfZGVjb2RlIiwibWQ1IiwidXJsIiwiYWN0aW9uIiwicXVlcnlzdHJpbmciLCJhcHAiLCJ3ZXB5IiwiJGluc3RhbmNlIiwic2l0ZUluZm8iLCJzaXRlcm9vdCIsInVuaWFjaWQiLCJtdWx0aWlkIiwidmVyc2lvbiIsInNwbGl0IiwicGFyYW0iLCJoYXNPd25Qcm9wZXJ0eSIsInBhcmFtcyIsImdldFF1ZXJ5IiwidGhlUmVxdWVzdCIsImluZGV4T2YiLCJzdHJzIiwiaSIsImxlbmd0aCIsInVuZXNjYXBlIiwiZ2V0VXJsUGFyYW0iLCJuYW1lIiwicmVnIiwiUmVnRXhwIiwiciIsIm1hdGNoIiwiZ2V0U2lnbiIsImRhdGEiLCJ0b2tlbiIsIl8iLCJyZXF1aXJlIiwic2lnbiIsImNvbmNhdCIsInNvcnRCeSIsInVuaXEiLCJ1cmxEYXRhIiwidmFsdWUiLCJyZXF1ZXN0Iiwib3B0aW9uIiwiY2FjaGV0aW1lIiwic2hvd0xvYWRpbmciLCJzZXNzaW9uaWQiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic3RhdGUiLCJtIiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwiY2FjaGVrZXkiLCJjYWNoZWRhdGEiLCJ0aW1lc3RhbXAiLCJEYXRlIiwicGFyc2UiLCJleHBpcmUiLCJjb21wbGV0ZSIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwiaGlkZUxvYWRpbmciLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJyZW1vdmVTdG9yYWdlU3luYyIsImhlYWRlciIsIm1ldGhvZCIsInJlc3BvbnNlIiwiZXJybm8iLCJzZXRTdG9yYWdlU3luYyIsImdldFVzZXJJbmZvIiwiZmFpbCIsIm1lc3NhZ2UiLCJyZWRpcmVjdCIsImNiIiwibG9naW4iLCJ1c2VySW5mbyIsInJlcyIsImNvZGUiLCJzZXNzaW9uIiwid3hJbmZvIiwic2lnbmF0dXJlIiwicmF3RGF0YSIsIml2IiwiZW5jcnlwdGVkRGF0YSIsIm1lbWJlckluZm8iLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjb25maXJtIiwiY2hlY2tTZXNzaW9uIiwibmF2aWdhdGVCYWNrIiwib2JqIiwiZGVsdGEiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImN1clBhZ2UiLCJwYWdlRm9yUmVzdWx0Iiwic2V0RGF0YSIsImVyciIsImZvb3RlciIsIiR0aGlzIiwidGhhdCIsInRhYkJhciIsInJlcGxhY2UiLCJfX3JvdXRlX18iLCJ0eXBlIiwicmVkaXJlY3RUeXBlIiwic3Vic3RyaW5nIiwicmVkaXJlY3RGdW5jdGlvbiIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsIm1hc2siLCJzZXRUaW1lb3V0Iiwic2hvd0NhbmNlbCIsInVzZXIiLCJpc1Nob3dMb2FkaW5nIiwic2hvd0ltYWdlIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInByZXZpZXciLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwicGFyc2VDb250ZW50Iiwic3RyaW5nIiwicmFuZ2VzIiwiZW1vamkiLCJqb2luIiwiY29kZVBvaW50QXQiLCJ0b1N0cmluZyIsInRvVXBwZXJDYXNlIiwiZGF0ZSIsImlzTGVhcFllYXIiLCJnZXRZZWFyIiwiZGF0ZVRvU3RyIiwiZm9ybWF0U3RyIiwiYXJndW1lbnRzIiwiV2VlayIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXkiLCJnZXREYXRlIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsImRhdGVBZGQiLCJzdHJJbnRlcnZhbCIsIm51bSIsImdldFRpbWUiLCJkYXRlRGlmZiIsImR0U3RhcnQiLCJkdEVuZCIsInBhcnNlSW50Iiwic3RyVG9EYXRlIiwiZGF0ZVN0ciIsInJlQ2F0IiwidCIsImV2YWwiLCJkIiwic3RyRm9ybWF0VG9EYXRlIiwieWVhciIsInN0YXJ0IiwibGVuIiwic3Vic3RyIiwibW9udGgiLCJkYXkiLCJob3VyIiwibWludXRlIiwic2Vjb25kIiwiZGF0ZVRvTG9uZyIsImxvbmdUb0RhdGUiLCJkYXRlVmFsIiwiaXNEYXRlIiwieUluZGV4IiwibUluZGV4IiwiZEluZGV4IiwiaXNOdW1iZXIiLCJnZXRNYXhEYXkiLCJyZWdFeHAiLCJ0ZXN0IiwidG9BcnJheSIsIm15RGF0ZSIsIm15QXJyYXkiLCJBcnJheSIsImRhdGVQYXJ0IiwiaW50ZXJ2YWwiLCJwYXJ0U3RyIiwiV2Vla051bU9mWWVhciIsIm1heERheU9mRGF0ZSIsInNldERhdGUiLCJzZXRNb250aCIsInRpbWUiLCJuZXdEYXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBSUEsT0FBTyxFQUFYOztBQUVBQSxLQUFLQyxhQUFMLEdBQXFCLFVBQVVDLEdBQVYsRUFBZTtBQUNuQyxRQUFPLHlCQUFjQSxHQUFkLENBQVA7QUFDQSxDQUZEOztBQUlBRixLQUFLRyxhQUFMLEdBQXFCLFVBQVVELEdBQVYsRUFBZTtBQUNuQyxRQUFPLHlCQUFjQSxHQUFkLENBQVA7QUFDQSxDQUZEOztBQUlBRixLQUFLSSxHQUFMLEdBQVcsVUFBVUYsR0FBVixFQUFlO0FBQ3pCLFFBQU8sa0JBQUlBLEdBQUosQ0FBUDtBQUNBLENBRkQ7O0FBSUE7Ozs7O0FBS0FGLEtBQUtLLEdBQUwsR0FBVyxVQUFVQyxNQUFWLEVBQWtCQyxXQUFsQixFQUErQjtBQUN6QyxLQUFJQyxNQUFNQyxlQUFLQyxTQUFmO0FBQ0EsS0FBSUwsTUFBTUcsSUFBSUcsUUFBSixDQUFhQyxRQUFiLEdBQXdCLEtBQXhCLEdBQWdDSixJQUFJRyxRQUFKLENBQWFFLE9BQTdDLEdBQXVELEtBQXZELEdBQStETCxJQUFJRyxRQUFKLENBQWFHLE9BQTVFLEdBQXNGLEtBQXRGLEdBQThGTixJQUFJRyxRQUFKLENBQWFJLE9BQTNHLEdBQXFILGNBQS9IOztBQUVBLEtBQUlULE1BQUosRUFBWTtBQUNYQSxXQUFTQSxPQUFPVSxLQUFQLENBQWEsR0FBYixDQUFUO0FBQ0EsTUFBSVYsT0FBTyxDQUFQLENBQUosRUFBZTtBQUNkRCxVQUFPLE9BQU9DLE9BQU8sQ0FBUCxDQUFQLEdBQW1CLEdBQTFCO0FBQ0E7QUFDRCxNQUFJQSxPQUFPLENBQVAsQ0FBSixFQUFlO0FBQ2RELFVBQU8sT0FBT0MsT0FBTyxDQUFQLENBQVAsR0FBbUIsR0FBMUI7QUFDQTtBQUNELE1BQUlBLE9BQU8sQ0FBUCxDQUFKLEVBQWU7QUFDZEQsVUFBTyxRQUFRQyxPQUFPLENBQVAsQ0FBUixHQUFvQixHQUEzQjtBQUNBO0FBQ0Q7QUFDRCxLQUFJQyxlQUFlLFFBQU9BLFdBQVAseUNBQU9BLFdBQVAsT0FBdUIsUUFBMUMsRUFBb0Q7QUFDbkQsT0FBSyxJQUFJVSxLQUFULElBQWtCVixXQUFsQixFQUErQjtBQUNyQixPQUFJVSxTQUFTVixZQUFZVyxjQUFaLENBQTJCQyxNQUEzQixDQUFULElBQStDWixZQUFZVSxLQUFaLENBQW5ELEVBQXVFO0FBQy9FWixXQUFPWSxRQUFRLEdBQVIsR0FBY1YsWUFBWVUsS0FBWixDQUFkLEdBQW1DLEdBQTFDO0FBQ0E7QUFDRDtBQUNEO0FBQ0QsUUFBT1osR0FBUDtBQUNBLENBeEJEOztBQTBCQSxTQUFTZSxRQUFULENBQWtCZixHQUFsQixFQUF1QjtBQUN0QixLQUFJZ0IsYUFBYSxFQUFqQjtBQUNBLEtBQUloQixJQUFJaUIsT0FBSixDQUFZLEdBQVosS0FBb0IsQ0FBQyxDQUF6QixFQUE0QjtBQUMzQixNQUFJcEIsTUFBTUcsSUFBSVcsS0FBSixDQUFVLEdBQVYsRUFBZSxDQUFmLENBQVY7QUFDQSxNQUFJTyxPQUFPckIsSUFBSWMsS0FBSixDQUFVLEdBQVYsQ0FBWDtBQUNBLE9BQUssSUFBSVEsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRCxLQUFLRSxNQUF6QixFQUFpQ0QsR0FBakMsRUFBc0M7QUFDckMsT0FBSUQsS0FBS0MsQ0FBTCxFQUFRUixLQUFSLENBQWMsR0FBZCxFQUFtQixDQUFuQixLQUF5QlUsU0FBU0gsS0FBS0MsQ0FBTCxFQUFRUixLQUFSLENBQWMsR0FBZCxFQUFtQixDQUFuQixDQUFULENBQTdCLEVBQThEO0FBQzdESyxlQUFXRyxDQUFYLElBQWdCO0FBQ2YsYUFBUUQsS0FBS0MsQ0FBTCxFQUFRUixLQUFSLENBQWMsR0FBZCxFQUFtQixDQUFuQixDQURPO0FBRWYsY0FBU1UsU0FBU0gsS0FBS0MsQ0FBTCxFQUFRUixLQUFSLENBQWMsR0FBZCxFQUFtQixDQUFuQixDQUFUO0FBRk0sS0FBaEI7QUFJQTtBQUNEO0FBQ0Q7QUFDRCxRQUFPSyxVQUFQO0FBQ0E7QUFDRDs7Ozs7QUFLQSxTQUFTTSxXQUFULENBQXFCdEIsR0FBckIsRUFBMEJ1QixJQUExQixFQUFnQztBQUMvQixLQUFJQyxNQUFNLElBQUlDLE1BQUosQ0FBVyxVQUFVRixJQUFWLEdBQWlCLGVBQTVCLENBQVYsQ0FEK0IsQ0FDeUI7QUFDeEQsS0FBSUcsSUFBSTFCLElBQUlXLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixFQUFrQmdCLEtBQWxCLENBQXdCSCxHQUF4QixDQUFSLENBRitCLENBRVE7QUFDdkMsS0FBSUUsS0FBSyxJQUFULEVBQWUsT0FBT0wsU0FBU0ssRUFBRSxDQUFGLENBQVQsQ0FBUCxDQUF1QixPQUFPLElBQVAsQ0FIUCxDQUdvQjtBQUNuRDtBQUNEOzs7Ozs7QUFNQSxTQUFTRSxPQUFULENBQWlCNUIsR0FBakIsRUFBc0I2QixJQUF0QixFQUE0QkMsS0FBNUIsRUFBbUM7QUFDbEMsS0FBSUMsSUFBSUMsUUFBUSxpQkFBUixDQUFSO0FBQ0EsS0FBSWpDLE1BQU1pQyxRQUFRLFVBQVIsQ0FBVjtBQUNBLEtBQUk5QixjQUFjLEVBQWxCO0FBQ0EsS0FBSStCLE9BQU9YLFlBQVl0QixHQUFaLEVBQWlCLE1BQWpCLENBQVg7QUFDQSxLQUFJaUMsUUFBU0osUUFBUUEsS0FBS0ksSUFBMUIsRUFBaUM7QUFDaEMsU0FBTyxLQUFQO0FBQ0EsRUFGRCxNQUVPO0FBQ04sTUFBSWpDLEdBQUosRUFBUztBQUNSRSxpQkFBY2EsU0FBU2YsR0FBVCxDQUFkO0FBQ0E7QUFDRCxNQUFJNkIsSUFBSixFQUFVO0FBQ1QsT0FBSWIsYUFBYSxFQUFqQjtBQUNBLFFBQUssSUFBSUosS0FBVCxJQUFrQmlCLElBQWxCLEVBQXdCO0FBQ3ZCLFFBQUlqQixTQUFTaUIsS0FBS2pCLEtBQUwsQ0FBYixFQUEwQjtBQUN6Qkksa0JBQWFBLFdBQVdrQixNQUFYLENBQWtCO0FBQzlCLGNBQVF0QixLQURzQjtBQUU5QixlQUFTaUIsS0FBS2pCLEtBQUw7QUFGcUIsTUFBbEIsQ0FBYjtBQUlBO0FBQ0Q7QUFDRFYsaUJBQWNBLFlBQVlnQyxNQUFaLENBQW1CbEIsVUFBbkIsQ0FBZDtBQUNBO0FBQ0Q7QUFDQWQsZ0JBQWM2QixFQUFFSSxNQUFGLENBQVNqQyxXQUFULEVBQXNCLE1BQXRCLENBQWQ7QUFDQTtBQUNBQSxnQkFBYzZCLEVBQUVLLElBQUYsQ0FBT2xDLFdBQVAsRUFBb0IsSUFBcEIsRUFBMEIsTUFBMUIsQ0FBZDtBQUNBLE1BQUltQyxVQUFVLEVBQWQ7QUFDQSxPQUFLLElBQUlsQixJQUFJLENBQWIsRUFBZ0JBLElBQUlqQixZQUFZa0IsTUFBaEMsRUFBd0NELEdBQXhDLEVBQTZDO0FBQzVDLE9BQUlqQixZQUFZaUIsQ0FBWixLQUFrQmpCLFlBQVlpQixDQUFaLEVBQWVJLElBQWpDLElBQXlDckIsWUFBWWlCLENBQVosRUFBZW1CLEtBQTVELEVBQW1FO0FBQ2xFRCxlQUFXbkMsWUFBWWlCLENBQVosRUFBZUksSUFBZixHQUFzQixHQUF0QixHQUE0QnJCLFlBQVlpQixDQUFaLEVBQWVtQixLQUF0RDtBQUNBLFFBQUluQixJQUFLakIsWUFBWWtCLE1BQVosR0FBcUIsQ0FBOUIsRUFBa0M7QUFDakNpQixnQkFBVyxHQUFYO0FBQ0E7QUFDRDtBQUNEO0FBQ0RQLFVBQVFBLFFBQVFBLEtBQVIsR0FBZ0IxQixlQUFLQyxTQUFMLENBQWVDLFFBQWYsQ0FBd0J3QixLQUFoRDtBQUNBRyxTQUFPbEMsSUFBSXNDLFVBQVVQLEtBQWQsQ0FBUDtBQUNBLFNBQU9HLElBQVA7QUFDQTtBQUNEO0FBQ0R0QyxLQUFLaUMsT0FBTCxHQUFlLFVBQVU1QixHQUFWLEVBQWU2QixJQUFmLEVBQXFCQyxLQUFyQixFQUE0QjtBQUMxQyxRQUFPRixRQUFRNUIsR0FBUixFQUFhNkIsSUFBYixFQUFtQkMsS0FBbkIsQ0FBUDtBQUNBLENBRkQ7QUFHQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQW5DLEtBQUs0QyxPQUFMLEdBQWUsVUFBVUMsTUFBVixFQUFrQjtBQUFBOztBQUNoQyxLQUFJVCxJQUFJQyxRQUFRLGlCQUFSLENBQVI7QUFDQSxLQUFJakMsTUFBTWlDLFFBQVEsVUFBUixDQUFWO0FBQ0EsS0FBSTdCLE1BQU1DLGVBQUtDLFNBQWY7QUFDQSxLQUFJbUMsU0FBU0EsU0FBU0EsTUFBVCxHQUFrQixFQUEvQjtBQUNBQSxRQUFPQyxTQUFQLEdBQW1CRCxPQUFPQyxTQUFQLEdBQW1CRCxPQUFPQyxTQUExQixHQUFzQyxDQUF6RDtBQUNBRCxRQUFPRSxXQUFQLEdBQXFCLE9BQU9GLE9BQU9FLFdBQWQsSUFBNkIsV0FBN0IsR0FBMkNGLE9BQU9FLFdBQWxELEdBQWdFLElBQXJGOztBQUVBLEtBQUlDLFlBQVlDLEdBQUdDLGNBQUgsQ0FBa0IsVUFBbEIsRUFBOEJGLFNBQTlDO0FBQ0EsS0FBSTNDLE1BQU13QyxPQUFPeEMsR0FBakI7QUFDQSxLQUFJQSxJQUFJaUIsT0FBSixDQUFZLFNBQVosS0FBMEIsQ0FBQyxDQUEzQixJQUFnQ2pCLElBQUlpQixPQUFKLENBQVksVUFBWixLQUEyQixDQUFDLENBQWhFLEVBQW1FO0FBQ2xFakIsUUFBTUwsS0FBS0ssR0FBTCxDQUFTQSxHQUFULENBQU47QUFDQTtBQUNELEtBQUk4QyxRQUFReEIsWUFBWXRCLEdBQVosRUFBaUIsT0FBakIsQ0FBWjtBQUNBLEtBQUksQ0FBQzhDLEtBQUQsSUFBVSxFQUFFTixPQUFPWCxJQUFQLElBQWVXLE9BQU9YLElBQVAsQ0FBWWlCLEtBQTdCLENBQVYsSUFBaURILFNBQXJELEVBQWdFO0FBQy9EM0MsUUFBTUEsTUFBTSxnQkFBTixHQUF5QjJDLFNBQS9CO0FBQ0E7O0FBRUQzQyxPQUFNQSxNQUFJLEtBQUosR0FBVWdDLFFBQVEsYUFBUixFQUF1QmUsQ0FBdkM7O0FBRUEsS0FBSWQsT0FBT0wsUUFBUTVCLEdBQVIsRUFBYXdDLE9BQU9YLElBQXBCLENBQVg7QUFDQSxLQUFJSSxJQUFKLEVBQVU7QUFDVGpDLFFBQU1BLE1BQU0sUUFBTixHQUFpQmlDLElBQXZCO0FBQ0E7QUFDRCxLQUFJLENBQUNqQyxHQUFMLEVBQVU7QUFDVCxTQUFPLEtBQVA7QUFDQTtBQUNENEMsSUFBR0ksd0JBQUg7QUFDQSxLQUFJUixPQUFPRSxXQUFYLEVBQXdCO0FBQ3ZCL0MsT0FBSytDLFdBQUw7QUFDQTtBQUNELEtBQUlGLE9BQU9DLFNBQVgsRUFBc0I7QUFDckIsTUFBSVEsV0FBV2xELElBQUlDLEdBQUosQ0FBZjtBQUNBLE1BQUlrRCxZQUFZTixHQUFHQyxjQUFILENBQWtCSSxRQUFsQixDQUFoQjtBQUNBLE1BQUlFLFlBQVlDLEtBQUtDLEtBQUwsQ0FBVyxJQUFJRCxJQUFKLEVBQVgsQ0FBaEI7O0FBRUEsTUFBSUYsYUFBYUEsVUFBVXJCLElBQTNCLEVBQWlDO0FBQ2hDLE9BQUlxQixVQUFVSSxNQUFWLEdBQW1CSCxTQUF2QixFQUFrQztBQUNqQyxRQUFJWCxPQUFPZSxRQUFQLElBQW1CLE9BQU9mLE9BQU9lLFFBQWQsSUFBMEIsVUFBakQsRUFBNkQ7QUFDNURmLFlBQU9lLFFBQVAsQ0FBZ0JMLFNBQWhCO0FBQ0E7QUFDRCxRQUFJVixPQUFPZ0IsT0FBUCxJQUFrQixPQUFPaEIsT0FBT2dCLE9BQWQsSUFBeUIsVUFBL0MsRUFBMkQ7QUFDMURoQixZQUFPZ0IsT0FBUCxDQUFlTixTQUFmO0FBQ0E7QUFDRE8sWUFBUUMsR0FBUixDQUFZLFdBQVcxRCxHQUF2QjtBQUNBNEMsT0FBR2UsV0FBSDtBQUNBZixPQUFHZ0Isd0JBQUg7QUFDQSxXQUFPLElBQVA7QUFDQSxJQVhELE1BV087QUFDTmhCLE9BQUdpQixpQkFBSCxDQUFxQlosUUFBckI7QUFDQTtBQUNEO0FBQ0Q7QUFDREwsSUFBR0wsT0FBSDtBQUNDLFNBQU92QyxHQURSO0FBRUMsVUFBUXdDLE9BQU9YLElBQVAsR0FBY1csT0FBT1gsSUFBckIsR0FBNEIsRUFGckM7QUFHQyxZQUFVVyxPQUFPc0IsTUFBUCxHQUFnQnRCLE9BQU9zQixNQUF2QixHQUFnQyxFQUgzQztBQUlDLFlBQVV0QixPQUFPdUIsTUFBUCxHQUFnQnZCLE9BQU91QixNQUF2QixHQUFnQztBQUozQywyQ0FLVztBQUNULGtCQUFnQjtBQURQLEVBTFgsZ0NBUUMsU0FSRCxFQVFZLGlCQUFVQyxRQUFWLEVBQW9CO0FBQzlCcEIsS0FBR2dCLHdCQUFIO0FBQ0FoQixLQUFHZSxXQUFIO0FBQ0EsTUFBSUssU0FBU25DLElBQVQsQ0FBY29DLEtBQWxCLEVBQXlCO0FBQ3hCLE9BQUlELFNBQVNuQyxJQUFULENBQWNvQyxLQUFkLElBQXVCLE9BQTNCLEVBQW9DO0FBQ25DckIsT0FBR3NCLGNBQUgsQ0FBa0IsVUFBbEIsRUFBOEIsRUFBOUI7QUFDQXZFLFNBQUt3RSxXQUFMLENBQWlCLFlBQVk7QUFDNUJ4RSxVQUFLNEMsT0FBTCxDQUFhQyxNQUFiO0FBQ0EsS0FGRDtBQUdBO0FBQ0EsSUFORCxNQU1PO0FBQ04sUUFBSUEsT0FBTzRCLElBQVAsSUFBZSxPQUFPNUIsT0FBTzRCLElBQWQsSUFBc0IsVUFBekMsRUFBcUQ7QUFDcEQ1QixZQUFPNEIsSUFBUCxDQUFZSixRQUFaO0FBQ0EsS0FGRCxNQUVPO0FBQ04sU0FBSUEsU0FBU25DLElBQVQsQ0FBY3dDLE9BQWxCLEVBQTJCO0FBQzFCLFVBQUlMLFNBQVNuQyxJQUFULENBQWNBLElBQWQsSUFBc0IsSUFBdEIsSUFBOEJtQyxTQUFTbkMsSUFBVCxDQUFjQSxJQUFkLENBQW1CeUMsUUFBckQsRUFBK0Q7QUFDOUQsV0FBSUEsV0FBV04sU0FBU25DLElBQVQsQ0FBY0EsSUFBZCxDQUFtQnlDLFFBQWxDO0FBQ0EsT0FGRCxNQUVPO0FBQ04sV0FBSUEsV0FBVyxFQUFmO0FBQ0E7QUFDRG5FLFVBQUlSLElBQUosQ0FBUzBFLE9BQVQsQ0FBaUJMLFNBQVNuQyxJQUFULENBQWN3QyxPQUEvQixFQUF3Q0MsUUFBeEMsRUFBa0QsT0FBbEQ7QUFDQTtBQUNEO0FBQ0Q7QUFDQTtBQUNRLEdBdEJWLE1Bc0JnQjtBQUNmLE9BQUk5QixPQUFPZ0IsT0FBUCxJQUFrQixPQUFPaEIsT0FBT2dCLE9BQWQsSUFBeUIsVUFBL0MsRUFBMkQ7QUFDMURoQixXQUFPZ0IsT0FBUCxDQUFlUSxRQUFmO0FBQ0E7QUFDRDtBQUNBLE9BQUl4QixPQUFPQyxTQUFYLEVBQXNCO0FBQ3JCLFFBQUlTLFlBQVksRUFBRSxRQUFRYyxTQUFTbkMsSUFBbkIsRUFBeUIsVUFBVXNCLFlBQVlYLE9BQU9DLFNBQVAsR0FBbUIsSUFBbEUsRUFBaEI7QUFDQUcsT0FBR3NCLGNBQUgsQ0FBa0JqQixRQUFsQixFQUE0QkMsU0FBNUI7QUFDQTtBQUNEO0FBQ0QsRUEzQ0YsZ0NBNENDLE1BNUNELEVBNENTLGNBQVVjLFFBQVYsRUFBb0I7QUFDM0JwQixLQUFHZ0Isd0JBQUg7QUFDQWhCLEtBQUdlLFdBQUg7O0FBRUE7QUFDQSxNQUFJNUQsTUFBTWlDLFFBQVEsVUFBUixDQUFWO0FBQ0EsTUFBSWlCLFdBQVdsRCxJQUFJQyxHQUFKLENBQWY7QUFDQSxNQUFJa0QsWUFBWU4sR0FBR0MsY0FBSCxDQUFrQkksUUFBbEIsQ0FBaEI7QUFDQSxNQUFJQyxhQUFhQSxVQUFVckIsSUFBM0IsRUFBaUM7QUFDaEMsT0FBSVcsT0FBT2dCLE9BQVAsSUFBa0IsT0FBT2hCLE9BQU9nQixPQUFkLElBQXlCLFVBQS9DLEVBQTJEO0FBQzFEaEIsV0FBT2dCLE9BQVAsQ0FBZU4sU0FBZjtBQUNBO0FBQ0RPLFdBQVFDLEdBQVIsQ0FBWSxtQkFBbUIxRCxHQUEvQjtBQUNBLFVBQU8sSUFBUDtBQUNBLEdBTkQsTUFNTztBQUNOLE9BQUl3QyxPQUFPNEIsSUFBUCxJQUFlLE9BQU81QixPQUFPNEIsSUFBZCxJQUFzQixVQUF6QyxFQUFxRDtBQUNwRDVCLFdBQU80QixJQUFQLENBQVlKLFFBQVo7QUFDQTtBQUNEO0FBQ0QsRUEvREYsZ0NBZ0VDLFVBaEVELEVBZ0VhLGtCQUFVQSxRQUFWLEVBQW9CO0FBQy9CO0FBQ0E7QUFDQSxNQUFJeEIsT0FBT2UsUUFBUCxJQUFtQixPQUFPZixPQUFPZSxRQUFkLElBQTBCLFVBQWpELEVBQTZEO0FBQzVEZixVQUFPZSxRQUFQLENBQWdCUyxRQUFoQjtBQUNBO0FBQ0QsRUF0RUY7QUF3RUEsQ0E3SEQ7QUE4SEE7OztBQUdBckUsS0FBS3dFLFdBQUwsR0FBbUIsVUFBVUksRUFBVixFQUFjO0FBQ2hDLEtBQUlDLFFBQVEsU0FBUkEsS0FBUSxHQUFXO0FBQ3RCZixVQUFRQyxHQUFSLENBQVksYUFBWjtBQUNBLE1BQUllLFdBQVc7QUFDZCxnQkFBYSxFQURDO0FBRWQsYUFBVSxFQUZJO0FBR2QsaUJBQWM7QUFIQSxHQUFmO0FBS0E3QixLQUFHNEIsS0FBSCxDQUFTO0FBQ1JoQixZQUFTLGlCQUFVa0IsR0FBVixFQUFlO0FBQ3ZCL0UsU0FBSzRDLE9BQUwsQ0FBYTtBQUNadkMsVUFBSyxxQkFETztBQUVaNkIsV0FBTSxFQUFFOEMsTUFBTUQsSUFBSUMsSUFBWixFQUZNO0FBR1psQyxnQkFBVyxDQUhDO0FBSVplLGNBQVMsaUJBQVVvQixPQUFWLEVBQW1CO0FBQzNCLFVBQUksQ0FBQ0EsUUFBUS9DLElBQVIsQ0FBYW9DLEtBQWxCLEVBQXlCO0FBQ3hCUSxnQkFBUzlCLFNBQVQsR0FBcUJpQyxRQUFRL0MsSUFBUixDQUFhQSxJQUFiLENBQWtCYyxTQUF2QztBQUNBQyxVQUFHc0IsY0FBSCxDQUFrQixVQUFsQixFQUE4Qk8sUUFBOUI7QUFDQTdCLFVBQUd1QixXQUFILENBQWU7QUFDZFgsaUJBQVMsaUJBQVVxQixNQUFWLEVBQWtCO0FBQzFCSixrQkFBU0ksTUFBVCxHQUFrQkEsT0FBT0osUUFBekI7QUFDQTdCLFlBQUdzQixjQUFILENBQWtCLFVBQWxCLEVBQThCTyxRQUE5QjtBQUNBOUUsY0FBSzRDLE9BQUwsQ0FBYTtBQUNadkMsZUFBSyx1QkFETztBQUVaNkIsZ0JBQU07QUFDTGlELHNCQUFXRCxPQUFPQyxTQURiO0FBRUxDLG9CQUFTRixPQUFPRSxPQUZYO0FBR0xDLGVBQUlILE9BQU9HLEVBSE47QUFJTEMsMEJBQWVKLE9BQU9JO0FBSmpCLFdBRk07QUFRWmxCLGtCQUFRLE1BUkk7QUFTWkQsa0JBQVE7QUFDUCwyQkFBZ0I7QUFEVCxXQVRJO0FBWVpyQixxQkFBVyxDQVpDO0FBYVplLG1CQUFTLGlCQUFVa0IsR0FBVixFQUFlO0FBQ3ZCLGVBQUksQ0FBQ0EsSUFBSTdDLElBQUosQ0FBU29DLEtBQWQsRUFBcUI7QUFDcEJRLHFCQUFTUyxVQUFULEdBQXNCUixJQUFJN0MsSUFBSixDQUFTQSxJQUEvQjtBQUNBZSxlQUFHc0IsY0FBSCxDQUFrQixVQUFsQixFQUE4Qk8sUUFBOUI7QUFDQTtBQUNELGtCQUFPRixFQUFQLElBQWEsVUFBYixJQUEyQkEsR0FBR0UsUUFBSCxDQUEzQjtBQUNBO0FBbkJXLFVBQWI7QUFxQkEsU0F6QmE7QUEwQmRMLGNBQU0sZ0JBQVk7QUFDakIsZ0JBQU9HLEVBQVAsSUFBYSxVQUFiLElBQTJCQSxHQUFHRSxRQUFILENBQTNCO0FBQ0EsU0E1QmE7QUE2QmRsQixrQkFBVSxvQkFBWSxDQUNyQjtBQTlCYSxRQUFmO0FBZ0NBO0FBQ0Q7QUF6Q1csS0FBYjtBQTJDQSxJQTdDTztBQThDUmEsU0FBTSxnQkFBWTtBQUNqQnhCLE9BQUd1QyxTQUFILENBQWE7QUFDWkMsWUFBTyxRQURLO0FBRVpDLGNBQVMsZ0JBRkc7QUFHWjdCLGNBQVMsaUJBQVVrQixHQUFWLEVBQWU7QUFDdkIsVUFBSUEsSUFBSVksT0FBUixFQUFpQjtBQUNoQjNGLFlBQUt3RSxXQUFMO0FBQ0E7QUFDRDtBQVBXLEtBQWI7QUFTQTtBQXhETyxHQUFUO0FBMERBLEVBakVEOztBQW1FQSxLQUFJaEUsTUFBTXlDLEdBQUdDLGNBQUgsQ0FBa0IsVUFBbEIsQ0FBVjtBQUNBLEtBQUkxQyxJQUFJd0MsU0FBUixFQUFtQjtBQUNsQkMsS0FBRzJDLFlBQUgsQ0FBZ0I7QUFDZi9CLFlBQVMsbUJBQVU7QUFDbEIsV0FBT2UsRUFBUCxJQUFhLFVBQWIsSUFBMkJBLEdBQUdwRSxHQUFILENBQTNCO0FBQ0EsSUFIYztBQUlmaUUsU0FBTSxnQkFBVTtBQUNmakUsUUFBSXdDLFNBQUosR0FBZ0IsRUFBaEI7QUFDQWMsWUFBUUMsR0FBUixDQUFZLFNBQVo7QUFDQWQsT0FBR2lCLGlCQUFILENBQXFCLFVBQXJCO0FBQ0FXO0FBQ0E7QUFUYyxHQUFoQjtBQVdBLEVBWkQsTUFZTztBQUNOO0FBQ0FBO0FBQ0E7QUFDRCxDQXJGRDs7QUF1RkE3RSxLQUFLNkYsWUFBTCxHQUFvQixVQUFVQyxHQUFWLEVBQWU7QUFDbEMsS0FBSUMsUUFBUUQsSUFBSUMsS0FBSixHQUFZRCxJQUFJQyxLQUFoQixHQUF3QixDQUFwQztBQUNBLEtBQUlELElBQUk1RCxJQUFSLEVBQWM7QUFDYixNQUFJOEQsUUFBUUMsaUJBQVo7QUFDQSxNQUFJQyxVQUFVRixNQUFNQSxNQUFNdkUsTUFBTixJQUFnQnNFLFFBQVEsQ0FBeEIsQ0FBTixDQUFkO0FBQ0EsTUFBSUcsUUFBUUMsYUFBWixFQUEyQjtBQUMxQkQsV0FBUUMsYUFBUixDQUFzQkwsSUFBSTVELElBQTFCO0FBQ0EsR0FGRCxNQUVPO0FBQ05nRSxXQUFRRSxPQUFSLENBQWdCTixJQUFJNUQsSUFBcEI7QUFDQTtBQUNEO0FBQ0RlLElBQUc0QyxZQUFILENBQWdCO0FBQ2ZFLFNBQU9BLEtBRFEsRUFDRDtBQUNkbEMsV0FBUyxpQkFBVWtCLEdBQVYsRUFBZTtBQUN2QjtBQUNBLFVBQU9lLElBQUlqQyxPQUFYLElBQXNCLFVBQXRCLElBQW9DaUMsSUFBSWpDLE9BQUosQ0FBWWtCLEdBQVosQ0FBcEM7QUFDQSxHQUxjO0FBTWZOLFFBQU0sY0FBVTRCLEdBQVYsRUFBZTtBQUNwQjtBQUNBLFVBQU9QLElBQUlyQixJQUFYLElBQW1CLFVBQW5CLElBQWlDcUIsSUFBSXJCLElBQUosQ0FBUzRCLEdBQVQsQ0FBakM7QUFDQSxHQVRjO0FBVWZ6QyxZQUFVLG9CQUFZO0FBQ3JCO0FBQ0EsVUFBT2tDLElBQUlsQyxRQUFYLElBQXVCLFVBQXZCLElBQXFDa0MsSUFBSWxDLFFBQUosRUFBckM7QUFDQTtBQWJjLEVBQWhCO0FBZUEsQ0ExQkQ7O0FBNEJBNUQsS0FBS3NHLE1BQUwsR0FBYyxVQUFVQyxLQUFWLEVBQWlCO0FBQzlCLEtBQUkvRixNQUFNQyxlQUFLQyxTQUFmO0FBQ0EsS0FBSThGLE9BQU9ELEtBQVg7QUFDQSxLQUFJRSxTQUFTakcsSUFBSWlHLE1BQWpCO0FBQ0EsTUFBSyxJQUFJakYsQ0FBVCxJQUFjaUYsT0FBTyxNQUFQLENBQWQsRUFBOEI7QUFDN0JBLFNBQU8sTUFBUCxFQUFlakYsQ0FBZixFQUFrQixTQUFsQixJQUErQmlGLE9BQU8sTUFBUCxFQUFlakYsQ0FBZixFQUFrQixVQUFsQixFQUE4QmtGLE9BQTlCLENBQXNDLGNBQXRDLEVBQXNELEVBQXRELENBQS9CO0FBQ0E7QUFDREYsTUFBS0osT0FBTCxDQUFhO0FBQ1pLLFVBQVFBLE1BREk7QUFFWixvQkFBa0JELEtBQUtHO0FBRlgsRUFBYjtBQUlBLENBWEQ7QUFZQTs7Ozs7OztBQU9BM0csS0FBSzBFLE9BQUwsR0FBZSxVQUFTZSxLQUFULEVBQWdCZCxRQUFoQixFQUEwQmlDLElBQTFCLEVBQWdDO0FBQzlDLEtBQUksQ0FBQ25CLEtBQUwsRUFBWTtBQUNYLFNBQU8sSUFBUDtBQUNBO0FBQ0QsS0FBSSxRQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE1BQWdCLFFBQXBCLEVBQThCO0FBQzdCZCxhQUFXYyxNQUFNZCxRQUFqQjtBQUNBaUMsU0FBT25CLE1BQU1tQixJQUFiO0FBQ0FuQixVQUFRQSxNQUFNQSxLQUFkO0FBQ0E7QUFDRCxLQUFJZCxRQUFKLEVBQWM7QUFDYixNQUFJa0MsZUFBZWxDLFNBQVNtQyxTQUFULENBQW1CLENBQW5CLEVBQXNCLENBQXRCLENBQW5CO0FBQUEsTUFBNkN6RyxNQUFNLEVBQW5EO0FBQUEsTUFBdUQwRyxtQkFBbUIsRUFBMUU7QUFDQSxNQUFJRixnQkFBZ0IsV0FBcEIsRUFBaUM7QUFDaENFLHNCQUFtQixZQUFuQjtBQUNBMUcsU0FBTXNFLFNBQVNtQyxTQUFULENBQW1CLENBQW5CLENBQU47QUFDQSxHQUhELE1BR08sSUFBSUQsZ0JBQWdCLFdBQXBCLEVBQWlDO0FBQ3ZDRSxzQkFBbUIsWUFBbkI7QUFDQTFHLFNBQU1zRSxTQUFTbUMsU0FBVCxDQUFtQixDQUFuQixDQUFOO0FBQ0EsR0FITSxNQUdBO0FBQ056RyxTQUFNc0UsUUFBTjtBQUNBb0Msc0JBQW1CLFlBQW5CO0FBQ0E7QUFDRDtBQUNEakQsU0FBUUMsR0FBUixDQUFZMUQsR0FBWjtBQUNBLEtBQUksQ0FBQ3VHLElBQUwsRUFBVztBQUNWQSxTQUFPLFNBQVA7QUFDQTs7QUFFRCxLQUFJQSxRQUFRLFNBQVosRUFBdUI7QUFDdEIzRCxLQUFHK0QsU0FBSCxDQUFhO0FBQ1p2QixVQUFPQSxLQURLO0FBRVp3QixTQUFNLFNBRk07QUFHWkMsYUFBVSxJQUhFO0FBSVpDLFNBQU85RyxNQUFNLElBQU4sR0FBYSxLQUpSO0FBS1p1RCxhQUFXLG9CQUFXO0FBQ3JCLFFBQUl2RCxHQUFKLEVBQVM7QUFDUitHLGdCQUFXLFlBQVU7QUFDcEJuRSxTQUFHOEQsZ0JBQUgsRUFBcUI7QUFDcEIxRyxZQUFLQTtBQURlLE9BQXJCO0FBR0EsTUFKRCxFQUlHLElBSkg7QUFLQTtBQUVEO0FBZFcsR0FBYjtBQWdCQSxFQWpCRCxNQWlCTyxJQUFJdUcsUUFBUSxPQUFaLEVBQXFCO0FBQzNCM0QsS0FBR3VDLFNBQUgsQ0FBYTtBQUNaQyxVQUFPLE1BREs7QUFFWkMsWUFBVUQsS0FGRTtBQUdaNEIsZUFBYSxLQUhEO0FBSVp6RCxhQUFXLG9CQUFXO0FBQ3JCLFFBQUl2RCxHQUFKLEVBQVM7QUFDUjRDLFFBQUc4RCxnQkFBSCxFQUFxQjtBQUNwQjFHLFdBQUtBO0FBRGUsTUFBckI7QUFHQTtBQUNEO0FBVlcsR0FBYjtBQVlBO0FBQ0QsQ0ExREQ7O0FBNERBTCxLQUFLc0gsSUFBTCxHQUFZdEgsS0FBS3dFLFdBQWpCOztBQUVBO0FBQ0F4RSxLQUFLK0MsV0FBTCxHQUFtQixZQUFXO0FBQzdCLEtBQUl3RSxnQkFBZ0J0RSxHQUFHQyxjQUFILENBQWtCLGVBQWxCLENBQXBCO0FBQ0EsS0FBSXFFLGFBQUosRUFBbUI7QUFDbEJ0RSxLQUFHZSxXQUFIO0FBQ0FmLEtBQUdzQixjQUFILENBQWtCLGVBQWxCLEVBQW1DLEtBQW5DO0FBQ0E7O0FBRUR0QixJQUFHRixXQUFILENBQWU7QUFDZDBDLFNBQVEsS0FETTtBQUVkN0IsWUFBVyxvQkFBVztBQUNyQlgsTUFBR3NCLGNBQUgsQ0FBa0IsZUFBbEIsRUFBbUMsSUFBbkM7QUFDQSxHQUphO0FBS2RFLFFBQU8sZ0JBQVc7QUFDakJ4QixNQUFHc0IsY0FBSCxDQUFrQixlQUFsQixFQUFtQyxLQUFuQztBQUNBO0FBUGEsRUFBZjtBQVNBLENBaEJEOztBQWtCQXZFLEtBQUt3SCxTQUFMLEdBQWlCLFVBQVNDLEtBQVQsRUFBZ0I7QUFDaEMsS0FBSXBILE1BQU1vSCxRQUFRQSxNQUFNQyxhQUFOLENBQW9CQyxPQUFwQixDQUE0QkMsT0FBcEMsR0FBOEMsRUFBeEQ7QUFDQSxLQUFJLENBQUN2SCxHQUFMLEVBQVU7QUFDVCxTQUFPLEtBQVA7QUFDQTtBQUNENEMsSUFBRzRFLFlBQUgsQ0FBZ0I7QUFDZkMsUUFBTSxDQUFDekgsR0FBRDtBQURTLEVBQWhCO0FBR0EsQ0FSRDs7QUFVQTs7O0FBR0FMLEtBQUsrSCxZQUFMLEdBQW9CLFVBQVNDLE1BQVQsRUFBaUI7QUFDcEMsS0FBSSxDQUFDQSxNQUFMLEVBQWE7QUFDWixTQUFPQSxNQUFQO0FBQ0E7O0FBRUQsS0FBSUMsU0FBUyxDQUNYLHVCQURXLEVBQ2M7QUFDekIsd0JBRlcsRUFFYztBQUN6Qix3QkFIVyxDQUdjO0FBSGQsRUFBYjtBQUtBLEtBQUlDLFFBQVFGLE9BQU9oRyxLQUFQLENBQ1gsSUFBSUYsTUFBSixDQUFXbUcsT0FBT0UsSUFBUCxDQUFZLEdBQVosQ0FBWCxFQUE2QixHQUE3QixDQURXLENBQVo7O0FBR0EsS0FBSUQsS0FBSixFQUFXO0FBQ1YsT0FBSyxJQUFJMUcsQ0FBVCxJQUFjMEcsS0FBZCxFQUFxQjtBQUNwQkYsWUFBU0EsT0FBT3RCLE9BQVAsQ0FBZXdCLE1BQU0xRyxDQUFOLENBQWYsRUFBeUIsUUFBUTBHLE1BQU0xRyxDQUFOLEVBQVM0RyxXQUFULENBQXFCLENBQXJCLEVBQXdCQyxRQUF4QixDQUFpQyxFQUFqQyxFQUFxQ0MsV0FBckMsRUFBUixHQUE2RCxHQUF0RixDQUFUO0FBQ0E7QUFDRDtBQUNELFFBQU9OLE1BQVA7QUFDQSxDQW5CRDs7QUFxQkFoSSxLQUFLdUksSUFBTCxHQUFZLFlBQVU7QUFDckI7Ozs7O0FBS0EsTUFBS0MsVUFBTCxHQUFrQixVQUFTRCxJQUFULEVBQWM7QUFDL0IsU0FBUSxLQUFHQSxLQUFLRSxPQUFMLEtBQWUsQ0FBbEIsS0FBdUJGLEtBQUtFLE9BQUwsS0FBZSxHQUFmLElBQW9CLENBQXJCLElBQTBCRixLQUFLRSxPQUFMLEtBQWUsR0FBZixJQUFvQixDQUFwRSxDQUFSO0FBQ0EsRUFGRDs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxNQUFLQyxTQUFMLEdBQWlCLFVBQVNDLFNBQVQsRUFBb0JKLElBQXBCLEVBQXlCO0FBQ3pDSSxjQUFZQyxVQUFVLENBQVYsS0FBZ0IscUJBQTVCO0FBQ0FMLFNBQU9LLFVBQVUsQ0FBVixLQUFnQixJQUFJbkYsSUFBSixFQUF2QjtBQUNBLE1BQUl2RCxNQUFNeUksU0FBVjtBQUNBLE1BQUlFLE9BQU8sQ0FBQyxHQUFELEVBQUssR0FBTCxFQUFTLEdBQVQsRUFBYSxHQUFiLEVBQWlCLEdBQWpCLEVBQXFCLEdBQXJCLEVBQXlCLEdBQXpCLENBQVg7QUFDQTNJLFFBQUlBLElBQUl3RyxPQUFKLENBQVksV0FBWixFQUF3QjZCLEtBQUtPLFdBQUwsRUFBeEIsQ0FBSjtBQUNBNUksUUFBSUEsSUFBSXdHLE9BQUosQ0FBWSxPQUFaLEVBQXFCNkIsS0FBS0UsT0FBTCxLQUFpQixHQUFsQixHQUF1QixDQUF2QixHQUF5QixDQUFDRixLQUFLRSxPQUFMLEtBQWlCLEdBQWxCLEVBQXVCSixRQUF2QixFQUF6QixHQUEyRCxNQUFPRSxLQUFLRSxPQUFMLEtBQWlCLEdBQXZHLENBQUo7QUFDQXZJLFFBQUlBLElBQUl3RyxPQUFKLENBQVksSUFBWixFQUFpQjZCLEtBQUtRLFFBQUwsS0FBZ0IsQ0FBaEIsR0FBbUJSLEtBQUtRLFFBQUwsS0FBa0IsQ0FBckMsR0FBd0MsT0FBT1IsS0FBS1EsUUFBTCxLQUFrQixDQUF6QixDQUF6RCxDQUFKO0FBQ0E3SSxRQUFJQSxJQUFJd0csT0FBSixDQUFZLElBQVosRUFBaUI2QixLQUFLUSxRQUFMLEVBQWpCLENBQUo7QUFDQTdJLFFBQUlBLElBQUl3RyxPQUFKLENBQVksTUFBWixFQUFtQm1DLEtBQUtOLEtBQUtTLE1BQUwsRUFBTCxDQUFuQixDQUFKOztBQUVBOUksUUFBSUEsSUFBSXdHLE9BQUosQ0FBWSxPQUFaLEVBQW9CNkIsS0FBS1UsT0FBTCxLQUFlLENBQWYsR0FBaUJWLEtBQUtVLE9BQUwsR0FBZVosUUFBZixFQUFqQixHQUEyQyxNQUFNRSxLQUFLVSxPQUFMLEVBQXJFLENBQUo7QUFDQS9JLFFBQUlBLElBQUl3RyxPQUFKLENBQVksTUFBWixFQUFtQjZCLEtBQUtVLE9BQUwsRUFBbkIsQ0FBSjs7QUFFQS9JLFFBQUlBLElBQUl3RyxPQUFKLENBQVksT0FBWixFQUFvQjZCLEtBQUtXLFFBQUwsS0FBZ0IsQ0FBaEIsR0FBa0JYLEtBQUtXLFFBQUwsR0FBZ0JiLFFBQWhCLEVBQWxCLEdBQTZDLE1BQU1FLEtBQUtXLFFBQUwsRUFBdkUsQ0FBSjtBQUNBaEosUUFBSUEsSUFBSXdHLE9BQUosQ0FBWSxNQUFaLEVBQW1CNkIsS0FBS1csUUFBTCxFQUFuQixDQUFKO0FBQ0FoSixRQUFJQSxJQUFJd0csT0FBSixDQUFZLElBQVosRUFBaUI2QixLQUFLWSxVQUFMLEtBQWtCLENBQWxCLEdBQW9CWixLQUFLWSxVQUFMLEdBQWtCZCxRQUFsQixFQUFwQixHQUFpRCxNQUFNRSxLQUFLWSxVQUFMLEVBQXhFLENBQUo7QUFDQWpKLFFBQUlBLElBQUl3RyxPQUFKLENBQVksSUFBWixFQUFpQjZCLEtBQUtZLFVBQUwsRUFBakIsQ0FBSjs7QUFFQWpKLFFBQUlBLElBQUl3RyxPQUFKLENBQVksT0FBWixFQUFvQjZCLEtBQUthLFVBQUwsS0FBa0IsQ0FBbEIsR0FBb0JiLEtBQUthLFVBQUwsR0FBa0JmLFFBQWxCLEVBQXBCLEdBQWlELE1BQU1FLEtBQUthLFVBQUwsRUFBM0UsQ0FBSjtBQUNBbEosUUFBSUEsSUFBSXdHLE9BQUosQ0FBWSxNQUFaLEVBQW1CNkIsS0FBS2EsVUFBTCxFQUFuQixDQUFKOztBQUVBLFNBQU9sSixHQUFQO0FBQ0EsRUF2QkQ7O0FBMEJBOzs7Ozs7O0FBT0EsTUFBS21KLE9BQUwsR0FBZSxVQUFTQyxXQUFULEVBQXNCQyxHQUF0QixFQUEyQmhCLElBQTNCLEVBQWdDO0FBQzlDQSxTQUFRSyxVQUFVLENBQVYsS0FBZ0IsSUFBSW5GLElBQUosRUFBeEI7QUFDQSxVQUFRNkYsV0FBUjtBQUNDLFFBQUssR0FBTDtBQUFVLFdBQU8sSUFBSTdGLElBQUosQ0FBUzhFLEtBQUtpQixPQUFMLEtBQWtCLE9BQU9ELEdBQWxDLENBQVA7QUFDVixRQUFLLEdBQUw7QUFBVSxXQUFPLElBQUk5RixJQUFKLENBQVM4RSxLQUFLaUIsT0FBTCxLQUFrQixRQUFRRCxHQUFuQyxDQUFQO0FBQ1YsUUFBSyxHQUFMO0FBQVUsV0FBTyxJQUFJOUYsSUFBSixDQUFTOEUsS0FBS2lCLE9BQUwsS0FBa0IsVUFBVUQsR0FBckMsQ0FBUDtBQUNWLFFBQUssR0FBTDtBQUFVLFdBQU8sSUFBSTlGLElBQUosQ0FBUzhFLEtBQUtpQixPQUFMLEtBQWtCLFdBQVdELEdBQXRDLENBQVA7QUFDVixRQUFLLEdBQUw7QUFBVSxXQUFPLElBQUk5RixJQUFKLENBQVM4RSxLQUFLaUIsT0FBTCxLQUFtQixXQUFXLENBQVosR0FBaUJELEdBQTVDLENBQVA7QUFDVixRQUFLLEdBQUw7QUFBVSxXQUFPLElBQUk5RixJQUFKLENBQVM4RSxLQUFLTyxXQUFMLEVBQVQsRUFBOEJQLEtBQUtRLFFBQUwsRUFBRCxHQUFvQlEsR0FBakQsRUFBc0RoQixLQUFLVSxPQUFMLEVBQXRELEVBQXNFVixLQUFLVyxRQUFMLEVBQXRFLEVBQXVGWCxLQUFLWSxVQUFMLEVBQXZGLEVBQTBHWixLQUFLYSxVQUFMLEVBQTFHLENBQVA7QUFDVixRQUFLLEdBQUw7QUFBVSxXQUFPLElBQUkzRixJQUFKLENBQVU4RSxLQUFLTyxXQUFMLEtBQXFCUyxHQUEvQixFQUFxQ2hCLEtBQUtRLFFBQUwsRUFBckMsRUFBc0RSLEtBQUtVLE9BQUwsRUFBdEQsRUFBc0VWLEtBQUtXLFFBQUwsRUFBdEUsRUFBdUZYLEtBQUtZLFVBQUwsRUFBdkYsRUFBMEdaLEtBQUthLFVBQUwsRUFBMUcsQ0FBUDtBQVBYO0FBU0EsRUFYRDs7QUFhQTs7Ozs7O0FBTUEsTUFBS0ssUUFBTCxHQUFnQixVQUFTSCxXQUFULEVBQXNCSSxPQUF0QixFQUErQkMsS0FBL0IsRUFBc0M7QUFDckQsVUFBUUwsV0FBUjtBQUNDLFFBQUssR0FBTDtBQUFVLFdBQU9NLFNBQVMsQ0FBQ0QsUUFBUUQsT0FBVCxJQUFvQixJQUE3QixDQUFQO0FBQ1YsUUFBSyxHQUFMO0FBQVUsV0FBT0UsU0FBUyxDQUFDRCxRQUFRRCxPQUFULElBQW9CLEtBQTdCLENBQVA7QUFDVixRQUFLLEdBQUw7QUFBVSxXQUFPRSxTQUFTLENBQUNELFFBQVFELE9BQVQsSUFBb0IsT0FBN0IsQ0FBUDtBQUNWLFFBQUssR0FBTDtBQUFVLFdBQU9FLFNBQVMsQ0FBQ0QsUUFBUUQsT0FBVCxJQUFvQixRQUE3QixDQUFQO0FBQ1YsUUFBSyxHQUFMO0FBQVUsV0FBT0UsU0FBUyxDQUFDRCxRQUFRRCxPQUFULEtBQXFCLFdBQVcsQ0FBaEMsQ0FBVCxDQUFQO0FBQ1YsUUFBSyxHQUFMO0FBQVUsV0FBUUMsTUFBTVosUUFBTixLQUFpQixDQUFsQixHQUFzQixDQUFDWSxNQUFNYixXQUFOLEtBQW9CWSxRQUFRWixXQUFSLEVBQXJCLElBQTRDLEVBQWxFLElBQXlFWSxRQUFRWCxRQUFSLEtBQW1CLENBQTVGLENBQVA7QUFDVixRQUFLLEdBQUw7QUFBVSxXQUFPWSxNQUFNYixXQUFOLEtBQXNCWSxRQUFRWixXQUFSLEVBQTdCO0FBUFg7QUFTQSxFQVZEOztBQVlBOzs7O0FBSUEsTUFBS2UsU0FBTCxHQUFpQixVQUFTQyxPQUFULEVBQWlCO0FBQ2pDLE1BQUk1SCxPQUFPNEgsT0FBWDtBQUNBLE1BQUlDLFFBQVEsYUFBWjtBQUNBLE1BQUlDLElBQUk5SCxLQUFLRixLQUFMLENBQVcrSCxLQUFYLENBQVI7QUFDQUMsSUFBRSxDQUFGLElBQU9BLEVBQUUsQ0FBRixJQUFPLENBQWQ7QUFDQUMsT0FBSyxzQkFBb0JELEVBQUU3QixJQUFGLENBQU8sR0FBUCxDQUFwQixHQUFnQyxJQUFyQztBQUNBLFNBQU8rQixDQUFQO0FBQ0EsRUFQRDs7QUFTQTs7OztBQUlBLE1BQUtDLGVBQUwsR0FBdUIsVUFBU3hCLFNBQVQsRUFBb0JtQixPQUFwQixFQUE0QjtBQUNsRCxNQUFJTSxPQUFPLENBQVg7QUFDQSxNQUFJQyxRQUFRLENBQUMsQ0FBYjtBQUNBLE1BQUlDLE1BQU1SLFFBQVFySSxNQUFsQjtBQUNBLE1BQUcsQ0FBQzRJLFFBQVExQixVQUFVckgsT0FBVixDQUFrQixNQUFsQixDQUFULElBQXNDLENBQUMsQ0FBdkMsSUFBNEMrSSxRQUFRQyxHQUF2RCxFQUEyRDtBQUMxREYsVUFBT04sUUFBUVMsTUFBUixDQUFlRixLQUFmLEVBQXNCLENBQXRCLENBQVA7QUFDQTtBQUNELE1BQUlHLFFBQVEsQ0FBWjtBQUNBLE1BQUcsQ0FBQ0gsUUFBUTFCLFVBQVVySCxPQUFWLENBQWtCLElBQWxCLENBQVQsSUFBb0MsQ0FBQyxDQUFyQyxJQUEyQytJLFFBQVFDLEdBQXRELEVBQTBEO0FBQ3pERSxXQUFRWixTQUFTRSxRQUFRUyxNQUFSLENBQWVGLEtBQWYsRUFBc0IsQ0FBdEIsQ0FBVCxJQUFxQyxDQUE3QztBQUNBO0FBQ0QsTUFBSUksTUFBTSxDQUFWO0FBQ0EsTUFBRyxDQUFDSixRQUFRMUIsVUFBVXJILE9BQVYsQ0FBa0IsSUFBbEIsQ0FBVCxJQUFvQyxDQUFDLENBQXJDLElBQTBDK0ksUUFBUUMsR0FBckQsRUFBeUQ7QUFDeERHLFNBQU1iLFNBQVNFLFFBQVFTLE1BQVIsQ0FBZUYsS0FBZixFQUFzQixDQUF0QixDQUFULENBQU47QUFDQTtBQUNELE1BQUlLLE9BQU8sQ0FBWDtBQUNBLE1BQUksQ0FBQyxDQUFDTCxRQUFRMUIsVUFBVXJILE9BQVYsQ0FBa0IsSUFBbEIsQ0FBVCxJQUFvQyxDQUFDLENBQXJDLElBQTBDLENBQUMrSSxRQUFRMUIsVUFBVXJILE9BQVYsQ0FBa0IsSUFBbEIsQ0FBVCxJQUFvQyxDQUEvRSxLQUFxRitJLFFBQVFDLEdBQWpHLEVBQXFHO0FBQ3BHSSxVQUFPZCxTQUFTRSxRQUFRUyxNQUFSLENBQWVGLEtBQWYsRUFBc0IsQ0FBdEIsQ0FBVCxDQUFQO0FBQ0E7QUFDRCxNQUFJTSxTQUFTLENBQWI7QUFDQSxNQUFHLENBQUNOLFFBQVExQixVQUFVckgsT0FBVixDQUFrQixJQUFsQixDQUFULElBQW9DLENBQUMsQ0FBckMsSUFBMkMrSSxRQUFRQyxHQUF0RCxFQUEwRDtBQUN6REssWUFBU2IsUUFBUVMsTUFBUixDQUFlRixLQUFmLEVBQXNCLENBQXRCLENBQVQ7QUFDQTtBQUNELE1BQUlPLFNBQVMsQ0FBYjtBQUNBLE1BQUcsQ0FBQ1AsUUFBUTFCLFVBQVVySCxPQUFWLENBQWtCLElBQWxCLENBQVQsSUFBb0MsQ0FBQyxDQUFyQyxJQUEyQytJLFFBQVFDLEdBQXRELEVBQTBEO0FBQ3pETSxZQUFTZCxRQUFRUyxNQUFSLENBQWVGLEtBQWYsRUFBc0IsQ0FBdEIsQ0FBVDtBQUNBO0FBQ0QsU0FBTyxJQUFJNUcsSUFBSixDQUFTMkcsSUFBVCxFQUFlSSxLQUFmLEVBQXNCQyxHQUF0QixFQUEyQkMsSUFBM0IsRUFBaUNDLE1BQWpDLEVBQXlDQyxNQUF6QyxDQUFQO0FBQ0EsRUE1QkQ7O0FBK0JBOzs7QUFHQSxNQUFLQyxVQUFMLEdBQWtCLFVBQVN0QyxJQUFULEVBQWM7QUFDL0IsU0FBT0EsS0FBS2lCLE9BQUwsRUFBUDtBQUNBLEVBRkQ7O0FBSUE7Ozs7QUFJQSxNQUFLc0IsVUFBTCxHQUFrQixVQUFTQyxPQUFULEVBQWlCO0FBQ2xDLFNBQU8sSUFBSXRILElBQUosQ0FBU3NILE9BQVQsQ0FBUDtBQUNBLEVBRkQ7O0FBSUE7Ozs7O0FBS0EsTUFBS0MsTUFBTCxHQUFjLFVBQVM5SyxHQUFULEVBQWN5SSxTQUFkLEVBQXdCO0FBQ3JDLE1BQUlBLGFBQWEsSUFBakIsRUFBc0I7QUFDckJBLGVBQVksVUFBWjtBQUNBO0FBQ0QsTUFBSXNDLFNBQVN0QyxVQUFVckgsT0FBVixDQUFrQixNQUFsQixDQUFiO0FBQ0EsTUFBRzJKLFVBQVEsQ0FBQyxDQUFaLEVBQWM7QUFDYixVQUFPLEtBQVA7QUFDQTtBQUNELE1BQUliLE9BQU9sSyxJQUFJNEcsU0FBSixDQUFjbUUsTUFBZCxFQUFxQkEsU0FBTyxDQUE1QixDQUFYO0FBQ0EsTUFBSUMsU0FBU3ZDLFVBQVVySCxPQUFWLENBQWtCLElBQWxCLENBQWI7QUFDQSxNQUFHNEosVUFBUSxDQUFDLENBQVosRUFBYztBQUNiLFVBQU8sS0FBUDtBQUNBO0FBQ0QsTUFBSVYsUUFBUXRLLElBQUk0RyxTQUFKLENBQWNvRSxNQUFkLEVBQXFCQSxTQUFPLENBQTVCLENBQVo7QUFDQSxNQUFJQyxTQUFTeEMsVUFBVXJILE9BQVYsQ0FBa0IsSUFBbEIsQ0FBYjtBQUNBLE1BQUc2SixVQUFRLENBQUMsQ0FBWixFQUFjO0FBQ2IsVUFBTyxLQUFQO0FBQ0E7QUFDRCxNQUFJVixNQUFNdkssSUFBSTRHLFNBQUosQ0FBY3FFLE1BQWQsRUFBcUJBLFNBQU8sQ0FBNUIsQ0FBVjtBQUNBLE1BQUcsQ0FBQ0MsU0FBU2hCLElBQVQsQ0FBRCxJQUFpQkEsT0FBSyxNQUF0QixJQUFnQ0EsT0FBTSxNQUF6QyxFQUFnRDtBQUMvQyxVQUFPLEtBQVA7QUFDQTtBQUNELE1BQUcsQ0FBQ2dCLFNBQVNaLEtBQVQsQ0FBRCxJQUFrQkEsUUFBTSxJQUF4QixJQUFnQ0EsUUFBTyxJQUExQyxFQUErQztBQUM5QyxVQUFPLEtBQVA7QUFDQTtBQUNELE1BQUdDLE1BQUlZLFVBQVVqQixJQUFWLEVBQWVJLEtBQWYsQ0FBSixJQUE2QkMsTUFBSyxJQUFyQyxFQUEwQztBQUN6QyxVQUFPLEtBQVA7QUFDQTtBQUNELFNBQU8sSUFBUDtBQUNBLEVBN0JEOztBQStCQSxNQUFLWSxTQUFMLEdBQWlCLFVBQVNqQixJQUFULEVBQWNJLEtBQWQsRUFBcUI7QUFDckMsTUFBR0EsU0FBTyxDQUFQLElBQVVBLFNBQU8sQ0FBakIsSUFBb0JBLFNBQU8sQ0FBM0IsSUFBOEJBLFNBQU8sRUFBeEMsRUFDQyxPQUFPLElBQVA7QUFDRCxNQUFHQSxTQUFPLENBQVYsRUFDQyxJQUFHSixPQUFLLENBQUwsSUFBUSxDQUFSLElBQVdBLE9BQUssR0FBTCxJQUFVLENBQXJCLElBQTBCQSxPQUFLLEdBQUwsSUFBVSxDQUF2QyxFQUNDLE9BQU8sSUFBUCxDQURELEtBR0MsT0FBTyxJQUFQO0FBQ0YsU0FBTyxJQUFQO0FBQ0EsRUFURDtBQVVBOzs7QUFHQSxNQUFLZ0IsUUFBTCxHQUFnQixVQUFTbEwsR0FBVCxFQUNoQjtBQUNDLE1BQUlvTCxTQUFTLFFBQWI7QUFDQSxTQUFPQSxPQUFPQyxJQUFQLENBQVlyTCxHQUFaLENBQVA7QUFDQSxFQUpEOztBQU1BOzs7QUFHQSxNQUFLc0wsT0FBTCxHQUFlLFVBQVNDLE1BQVQsRUFDZjtBQUNDQSxXQUFTN0MsVUFBVSxDQUFWLEtBQWdCLElBQUluRixJQUFKLEVBQXpCO0FBQ0EsTUFBSWlJLFVBQVVDLE9BQWQ7QUFDQUQsVUFBUSxDQUFSLElBQWFELE9BQU8zQyxXQUFQLEVBQWI7QUFDQTRDLFVBQVEsQ0FBUixJQUFhRCxPQUFPMUMsUUFBUCxFQUFiO0FBQ0EyQyxVQUFRLENBQVIsSUFBYUQsT0FBT3hDLE9BQVAsRUFBYjtBQUNBeUMsVUFBUSxDQUFSLElBQWFELE9BQU92QyxRQUFQLEVBQWI7QUFDQXdDLFVBQVEsQ0FBUixJQUFhRCxPQUFPdEMsVUFBUCxFQUFiO0FBQ0F1QyxVQUFRLENBQVIsSUFBYUQsT0FBT3JDLFVBQVAsRUFBYjtBQUNBLFNBQU9zQyxPQUFQO0FBQ0EsRUFYRDs7QUFhQTs7Ozs7QUFLQSxNQUFLRSxRQUFMLEdBQWdCLFVBQVNDLFFBQVQsRUFBbUJKLE1BQW5CLEVBQ2hCO0FBQ0NBLFdBQVM3QyxVQUFVLENBQVYsS0FBZ0IsSUFBSW5GLElBQUosRUFBekI7QUFDQSxNQUFJcUksVUFBUSxFQUFaO0FBQ0EsTUFBSWpELE9BQU8sQ0FBQyxHQUFELEVBQUssR0FBTCxFQUFTLEdBQVQsRUFBYSxHQUFiLEVBQWlCLEdBQWpCLEVBQXFCLEdBQXJCLEVBQXlCLEdBQXpCLENBQVg7QUFDQSxVQUFRZ0QsUUFBUjtBQUVDLFFBQUssR0FBTDtBQUFVQyxjQUFVTCxPQUFPM0MsV0FBUCxFQUFWLENBQStCO0FBQ3pDLFFBQUssR0FBTDtBQUFVZ0QsY0FBVUwsT0FBTzFDLFFBQVAsS0FBa0IsQ0FBNUIsQ0FBOEI7QUFDeEMsUUFBSyxHQUFMO0FBQVUrQyxjQUFVTCxPQUFPeEMsT0FBUCxFQUFWLENBQTJCO0FBQ3JDLFFBQUssR0FBTDtBQUFVNkMsY0FBVWpELEtBQUs0QyxPQUFPekMsTUFBUCxFQUFMLENBQVYsQ0FBZ0M7QUFDMUMsUUFBSyxJQUFMO0FBQVc4QyxjQUFVTCxPQUFPTSxhQUFQLEVBQVYsQ0FBaUM7QUFDNUMsUUFBSyxHQUFMO0FBQVVELGNBQVVMLE9BQU92QyxRQUFQLEVBQVYsQ0FBNEI7QUFDdEMsUUFBSyxHQUFMO0FBQVU0QyxjQUFVTCxPQUFPdEMsVUFBUCxFQUFWLENBQThCO0FBQ3hDLFFBQUssR0FBTDtBQUFVMkMsY0FBVUwsT0FBT3JDLFVBQVAsRUFBVixDQUE4QjtBQVR6QztBQVdBLFNBQU8wQyxPQUFQO0FBQ0EsRUFqQkQ7O0FBbUJBOzs7QUFHQSxNQUFLRSxZQUFMLEdBQW9CLFVBQVN6RCxJQUFULEVBQ3BCO0FBQ0NBLFNBQU9LLFVBQVUsQ0FBVixLQUFnQixJQUFJbkYsSUFBSixFQUF2QjtBQUNBOEUsT0FBSzBELE9BQUwsQ0FBYSxDQUFiO0FBQ0ExRCxPQUFLMkQsUUFBTCxDQUFjM0QsS0FBS1EsUUFBTCxLQUFrQixDQUFoQztBQUNBLE1BQUlvRCxPQUFPNUQsS0FBS2lCLE9BQUwsS0FBaUIsS0FBSyxFQUFMLEdBQVUsRUFBVixHQUFlLElBQTNDO0FBQ0EsTUFBSTRDLFVBQVUsSUFBSTNJLElBQUosQ0FBUzBJLElBQVQsQ0FBZDtBQUNBLFNBQU9DLFFBQVFuRCxPQUFSLEVBQVA7QUFDQSxFQVJEO0FBU0EsQ0FsUUQ7O0FBb1FBb0QsT0FBT0MsT0FBUCxHQUFpQnRNLElBQWpCIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBiYXNlNjRfZW5jb2RlLCBiYXNlNjRfZGVjb2RlIH0gZnJvbSAnLi9iYXNlNjQnO1xyXG5pbXBvcnQgbWQ1IGZyb20gJy4vbWQ1JztcclxuaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIlxyXG5cclxudmFyIHV0aWwgPSB7fTtcclxuXHJcbnV0aWwuYmFzZTY0X2VuY29kZSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRyZXR1cm4gYmFzZTY0X2VuY29kZShzdHIpXHJcbn07XHJcblxyXG51dGlsLmJhc2U2NF9kZWNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0cmV0dXJuIGJhc2U2NF9kZWNvZGUoc3RyKVxyXG59O1xyXG5cclxudXRpbC5tZDUgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0cmV0dXJuIG1kNShzdHIpXHJcbn07XHJcblxyXG4vKipcclxuXHTmnoTpgKDlvq7mk47lnLDlnYAsIFxyXG5cdEBwYXJhbXMgYWN0aW9uIOW+ruaTjuezu+e7n+S4reeahGNvbnRyb2xsZXIsIGFjdGlvbiwgZG/vvIzmoLzlvI/kuLogJ3d4YXBwL2hvbWUvbmF2cydcclxuXHRAcGFyYW1zIHF1ZXJ5c3RyaW5nIOagvOW8j+S4uiB75Y+C5pWw5ZCNMSA6IOWAvDEsIOWPguaVsOWQjTIgOiDlgLwyfVxyXG4qL1xyXG51dGlsLnVybCA9IGZ1bmN0aW9uIChhY3Rpb24sIHF1ZXJ5c3RyaW5nKSB7XHJcblx0dmFyIGFwcCA9IHdlcHkuJGluc3RhbmNlO1xyXG5cdHZhciB1cmwgPSBhcHAuc2l0ZUluZm8uc2l0ZXJvb3QgKyAnP2k9JyArIGFwcC5zaXRlSW5mby51bmlhY2lkICsgJyZ0PScgKyBhcHAuc2l0ZUluZm8ubXVsdGlpZCArICcmdj0nICsgYXBwLnNpdGVJbmZvLnZlcnNpb24gKyAnJmZyb209d3hhcHAmJztcclxuXHJcblx0aWYgKGFjdGlvbikge1xyXG5cdFx0YWN0aW9uID0gYWN0aW9uLnNwbGl0KCcvJyk7XHJcblx0XHRpZiAoYWN0aW9uWzBdKSB7XHJcblx0XHRcdHVybCArPSAnYz0nICsgYWN0aW9uWzBdICsgJyYnO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGFjdGlvblsxXSkge1xyXG5cdFx0XHR1cmwgKz0gJ2E9JyArIGFjdGlvblsxXSArICcmJztcclxuXHRcdH1cclxuXHRcdGlmIChhY3Rpb25bMl0pIHtcclxuXHRcdFx0dXJsICs9ICdkbz0nICsgYWN0aW9uWzJdICsgJyYnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRpZiAocXVlcnlzdHJpbmcgJiYgdHlwZW9mIHF1ZXJ5c3RyaW5nID09PSAnb2JqZWN0Jykge1xyXG5cdFx0Zm9yIChsZXQgcGFyYW0gaW4gcXVlcnlzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtICYmIHF1ZXJ5c3RyaW5nLmhhc093blByb3BlcnR5KHBhcmFtcykgJiYgcXVlcnlzdHJpbmdbcGFyYW1dKSB7XHJcblx0XHRcdFx0dXJsICs9IHBhcmFtICsgJz0nICsgcXVlcnlzdHJpbmdbcGFyYW1dICsgJyYnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiB1cmw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFF1ZXJ5KHVybCkge1xyXG5cdHZhciB0aGVSZXF1ZXN0ID0gW107XHJcblx0aWYgKHVybC5pbmRleE9mKFwiP1wiKSAhPSAtMSkge1xyXG5cdFx0dmFyIHN0ciA9IHVybC5zcGxpdCgnPycpWzFdO1xyXG5cdFx0dmFyIHN0cnMgPSBzdHIuc3BsaXQoXCImXCIpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChzdHJzW2ldLnNwbGl0KFwiPVwiKVswXSAmJiB1bmVzY2FwZShzdHJzW2ldLnNwbGl0KFwiPVwiKVsxXSkpIHtcclxuXHRcdFx0XHR0aGVSZXF1ZXN0W2ldID0ge1xyXG5cdFx0XHRcdFx0J25hbWUnOiBzdHJzW2ldLnNwbGl0KFwiPVwiKVswXSxcclxuXHRcdFx0XHRcdCd2YWx1ZSc6IHVuZXNjYXBlKHN0cnNbaV0uc3BsaXQoXCI9XCIpWzFdKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gdGhlUmVxdWVzdDtcclxufVxyXG4vKlxyXG4qIOiOt+WPlumTvuaOpeafkOS4quWPguaVsFxyXG4qIHVybCDpk77mjqXlnLDlnYBcclxuKiBuYW1lIOWPguaVsOWQjeensFxyXG4qL1xyXG5mdW5jdGlvbiBnZXRVcmxQYXJhbSh1cmwsIG5hbWUpIHtcclxuXHR2YXIgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIgKyBuYW1lICsgXCI9KFteJl0qKSgmfCQpXCIpOyAvL+aehOmAoOS4gOS4quWQq+acieebruagh+WPguaVsOeahOato+WImeihqOi+vuW8j+WvueixoSAgXHJcblx0dmFyIHIgPSB1cmwuc3BsaXQoJz8nKVsxXS5tYXRjaChyZWcpOyAgLy/ljLnphY3nm67moIflj4LmlbAgIFxyXG5cdGlmIChyICE9IG51bGwpIHJldHVybiB1bmVzY2FwZShyWzJdKTsgcmV0dXJuIG51bGw7IC8v6L+U5Zue5Y+C5pWw5YC8ICBcclxufVxyXG4vKipcclxuICog6I635Y+W562+5ZCNIOWwhumTvuaOpeWcsOWdgOeahOaJgOacieWPguaVsOaMieWtl+avjeaOkuW6j+WQjuaLvOaOpeWKoOS4inRva2Vu6L+b6KGMbWQ1XHJcbiAqIHVybCDpk77mjqXlnLDlnYBcclxuICogZGF0ZSDlj4LmlbB75Y+C5pWw5ZCNMSA6IOWAvDEsIOWPguaVsOWQjTIgOiDlgLwyfSAqXHJcbiAqIHRva2VuIOetvuWQjXRva2VuIOmdnuW/hemhu1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U2lnbih1cmwsIGRhdGEsIHRva2VuKSB7XHJcblx0dmFyIF8gPSByZXF1aXJlKCcuL3VuZGVyc2NvcmUuanMnKTtcclxuXHR2YXIgbWQ1ID0gcmVxdWlyZSgnLi9tZDUuanMnKTtcclxuXHR2YXIgcXVlcnlzdHJpbmcgPSAnJztcclxuXHR2YXIgc2lnbiA9IGdldFVybFBhcmFtKHVybCwgJ3NpZ24nKTtcclxuXHRpZiAoc2lnbiB8fCAoZGF0YSAmJiBkYXRhLnNpZ24pKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmICh1cmwpIHtcclxuXHRcdFx0cXVlcnlzdHJpbmcgPSBnZXRRdWVyeSh1cmwpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0dmFyIHRoZVJlcXVlc3QgPSBbXTtcclxuXHRcdFx0Zm9yIChsZXQgcGFyYW0gaW4gZGF0YSkge1xyXG5cdFx0XHRcdGlmIChwYXJhbSAmJiBkYXRhW3BhcmFtXSkge1xyXG5cdFx0XHRcdFx0dGhlUmVxdWVzdCA9IHRoZVJlcXVlc3QuY29uY2F0KHtcclxuXHRcdFx0XHRcdFx0J25hbWUnOiBwYXJhbSxcclxuXHRcdFx0XHRcdFx0J3ZhbHVlJzogZGF0YVtwYXJhbV1cclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHF1ZXJ5c3RyaW5nID0gcXVlcnlzdHJpbmcuY29uY2F0KHRoZVJlcXVlc3QpO1xyXG5cdFx0fVxyXG5cdFx0Ly/mjpLluo9cclxuXHRcdHF1ZXJ5c3RyaW5nID0gXy5zb3J0QnkocXVlcnlzdHJpbmcsICduYW1lJyk7XHJcblx0XHQvL+WOu+mHjVxyXG5cdFx0cXVlcnlzdHJpbmcgPSBfLnVuaXEocXVlcnlzdHJpbmcsIHRydWUsICduYW1lJyk7XHJcblx0XHR2YXIgdXJsRGF0YSA9ICcnO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBxdWVyeXN0cmluZy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAocXVlcnlzdHJpbmdbaV0gJiYgcXVlcnlzdHJpbmdbaV0ubmFtZSAmJiBxdWVyeXN0cmluZ1tpXS52YWx1ZSkge1xyXG5cdFx0XHRcdHVybERhdGEgKz0gcXVlcnlzdHJpbmdbaV0ubmFtZSArICc9JyArIHF1ZXJ5c3RyaW5nW2ldLnZhbHVlO1xyXG5cdFx0XHRcdGlmIChpIDwgKHF1ZXJ5c3RyaW5nLmxlbmd0aCAtIDEpKSB7XHJcblx0XHRcdFx0XHR1cmxEYXRhICs9ICcmJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRva2VuID0gdG9rZW4gPyB0b2tlbiA6IHdlcHkuJGluc3RhbmNlLnNpdGVJbmZvLnRva2VuO1xyXG5cdFx0c2lnbiA9IG1kNSh1cmxEYXRhICsgdG9rZW4pO1xyXG5cdFx0cmV0dXJuIHNpZ247XHJcblx0fVxyXG59XHJcbnV0aWwuZ2V0U2lnbiA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIHRva2VuKSB7XHJcblx0cmV0dXJuIGdldFNpZ24odXJsLCBkYXRhLCB0b2tlbik7XHJcbn07XHJcbi8qKlxyXG5cdOS6jOasoeWwgeijheW+ruS/oXd4LnJlcXVlc3Tlh73mlbDjgIHlop7liqDkuqTkupLkvZPlhajjgIHphY3nva7nvJPlrZjjgIHku6Xlj4rphY3lkIjlvq7mk47moLzlvI/ljJbov5Tlm57mlbDmja5cclxuXHJcblx0QHBhcmFtcyBvcHRpb24g5by55Ye65Y+C5pWw6KGo77yMXHJcblx0e1xyXG5cdFx0dXJsIDog5ZCM5b6u5L+hLFxyXG5cdFx0ZGF0YSA6IOWQjOW+ruS/oSxcclxuXHRcdGhlYWRlciA6IOWQjOW+ruS/oSxcclxuXHRcdG1ldGhvZCA6IOWQjOW+ruS/oSxcclxuXHRcdHN1Y2Nlc3MgOiDlkIzlvq7kv6EsXHJcblx0XHRmYWlsIDog5ZCM5b6u5L+hLFxyXG5cdFx0Y29tcGxldGUgOiDlkIzlvq7kv6EsXHJcblxyXG5cdFx0Y2FjaGV0aW1lIDog57yT5a2Y5ZGo5pyf77yM5Zyo5q2k5ZGo5pyf5YaF5LiN6YeN5aSN6K+35rGCaHR0cO+8jOm7mOiupOS4jee8k+WtmFxyXG5cdH1cclxuKi9cclxudXRpbC5yZXF1ZXN0ID0gZnVuY3Rpb24gKG9wdGlvbikge1xyXG5cdHZhciBfID0gcmVxdWlyZSgnLi91bmRlcnNjb3JlLmpzJyk7XHJcblx0dmFyIG1kNSA9IHJlcXVpcmUoJy4vbWQ1LmpzJyk7XHJcblx0dmFyIGFwcCA9IHdlcHkuJGluc3RhbmNlO1xyXG5cdHZhciBvcHRpb24gPSBvcHRpb24gPyBvcHRpb24gOiB7fTtcclxuXHRvcHRpb24uY2FjaGV0aW1lID0gb3B0aW9uLmNhY2hldGltZSA/IG9wdGlvbi5jYWNoZXRpbWUgOiAwO1xyXG5cdG9wdGlvbi5zaG93TG9hZGluZyA9IHR5cGVvZiBvcHRpb24uc2hvd0xvYWRpbmcgIT0gJ3VuZGVmaW5lZCcgPyBvcHRpb24uc2hvd0xvYWRpbmcgOiB0cnVlO1xyXG5cclxuXHR2YXIgc2Vzc2lvbmlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJykuc2Vzc2lvbmlkO1xyXG5cdHZhciB1cmwgPSBvcHRpb24udXJsO1xyXG5cdGlmICh1cmwuaW5kZXhPZignaHR0cDovLycpID09IC0xICYmIHVybC5pbmRleE9mKCdodHRwczovLycpID09IC0xKSB7XHJcblx0XHR1cmwgPSB1dGlsLnVybCh1cmwpO1xyXG5cdH1cclxuXHR2YXIgc3RhdGUgPSBnZXRVcmxQYXJhbSh1cmwsICdzdGF0ZScpO1xyXG5cdGlmICghc3RhdGUgJiYgIShvcHRpb24uZGF0YSAmJiBvcHRpb24uZGF0YS5zdGF0ZSkgJiYgc2Vzc2lvbmlkKSB7XHJcblx0XHR1cmwgPSB1cmwgKyAnJnN0YXRlPXdlN3NpZC0nICsgc2Vzc2lvbmlkXHJcblx0fVxyXG5cclxuXHR1cmwgPSB1cmwrXCImbT1cIityZXF1aXJlKFwiLi4vc2l0ZWluZm9cIikubTtcclxuXHJcblx0dmFyIHNpZ24gPSBnZXRTaWduKHVybCwgb3B0aW9uLmRhdGEpO1xyXG5cdGlmIChzaWduKSB7XHJcblx0XHR1cmwgPSB1cmwgKyBcIiZzaWduPVwiICsgc2lnbjtcclxuXHR9XHJcblx0aWYgKCF1cmwpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0d3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKCk7XHJcblx0aWYgKG9wdGlvbi5zaG93TG9hZGluZykge1xyXG5cdFx0dXRpbC5zaG93TG9hZGluZygpO1xyXG5cdH1cclxuXHRpZiAob3B0aW9uLmNhY2hldGltZSkge1xyXG5cdFx0dmFyIGNhY2hla2V5ID0gbWQ1KHVybCk7XHJcblx0XHR2YXIgY2FjaGVkYXRhID0gd3guZ2V0U3RvcmFnZVN5bmMoY2FjaGVrZXkpO1xyXG5cdFx0dmFyIHRpbWVzdGFtcCA9IERhdGUucGFyc2UobmV3IERhdGUoKSk7XHJcblxyXG5cdFx0aWYgKGNhY2hlZGF0YSAmJiBjYWNoZWRhdGEuZGF0YSkge1xyXG5cdFx0XHRpZiAoY2FjaGVkYXRhLmV4cGlyZSA+IHRpbWVzdGFtcCkge1xyXG5cdFx0XHRcdGlmIChvcHRpb24uY29tcGxldGUgJiYgdHlwZW9mIG9wdGlvbi5jb21wbGV0ZSA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb24uY29tcGxldGUoY2FjaGVkYXRhKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG9wdGlvbi5zdWNjZXNzICYmIHR5cGVvZiBvcHRpb24uc3VjY2VzcyA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb24uc3VjY2VzcyhjYWNoZWRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zb2xlLmxvZygnY2FjaGU6JyArIHVybCk7XHJcblx0XHRcdFx0d3guaGlkZUxvYWRpbmcoKTtcclxuXHRcdFx0XHR3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR3eC5yZW1vdmVTdG9yYWdlU3luYyhjYWNoZWtleSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHR3eC5yZXF1ZXN0KHtcclxuXHRcdCd1cmwnOiB1cmwsXHJcblx0XHQnZGF0YSc6IG9wdGlvbi5kYXRhID8gb3B0aW9uLmRhdGEgOiB7fSxcclxuXHRcdCdoZWFkZXInOiBvcHRpb24uaGVhZGVyID8gb3B0aW9uLmhlYWRlciA6IHt9LFxyXG5cdFx0J21ldGhvZCc6IG9wdGlvbi5tZXRob2QgPyBvcHRpb24ubWV0aG9kIDogJ0dFVCcsXHJcblx0XHQnaGVhZGVyJzoge1xyXG5cdFx0XHQnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuXHRcdH0sXHJcblx0XHQnc3VjY2Vzcyc6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cdFx0XHR3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcclxuXHRcdFx0d3guaGlkZUxvYWRpbmcoKTtcclxuXHRcdFx0aWYgKHJlc3BvbnNlLmRhdGEuZXJybm8pIHtcclxuXHRcdFx0XHRpZiAocmVzcG9uc2UuZGF0YS5lcnJubyA9PSAnNDEwMDknKSB7XHJcblx0XHRcdFx0XHR3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCAnJyk7XHJcblx0XHRcdFx0XHR1dGlsLmdldFVzZXJJbmZvKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0dXRpbC5yZXF1ZXN0KG9wdGlvbilcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9uLmZhaWwgJiYgdHlwZW9mIG9wdGlvbi5mYWlsID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdFx0b3B0aW9uLmZhaWwocmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLmRhdGEubWVzc2FnZSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNwb25zZS5kYXRhLmRhdGEgIT0gbnVsbCAmJiByZXNwb25zZS5kYXRhLmRhdGEucmVkaXJlY3QpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciByZWRpcmVjdCA9IHJlc3BvbnNlLmRhdGEuZGF0YS5yZWRpcmVjdDtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlZGlyZWN0ID0gJyc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGFwcC51dGlsLm1lc3NhZ2UocmVzcG9uc2UuZGF0YS5tZXNzYWdlLCByZWRpcmVjdCwgJ2Vycm9yJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbi5zdWNjZXNzICYmIHR5cGVvZiBvcHRpb24uc3VjY2VzcyA9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb24uc3VjY2VzcyhyZXNwb25zZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8v5YaZ5YWl57yT5a2Y77yM5YeP5bCRSFRUUOivt+axgu+8jOW5tuS4lOWmguaenOe9kee7nOW8guW4uOWPr+S7peivu+WPlue8k+WtmOaVsOaNrlxyXG5cdFx0XHRcdGlmIChvcHRpb24uY2FjaGV0aW1lKSB7XHJcblx0XHRcdFx0XHR2YXIgY2FjaGVkYXRhID0geyAnZGF0YSc6IHJlc3BvbnNlLmRhdGEsICdleHBpcmUnOiB0aW1lc3RhbXAgKyBvcHRpb24uY2FjaGV0aW1lICogMTAwMCB9O1xyXG5cdFx0XHRcdFx0d3guc2V0U3RvcmFnZVN5bmMoY2FjaGVrZXksIGNhY2hlZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0J2ZhaWwnOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHRcdFx0d3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKCk7XHJcblx0XHRcdHd4LmhpZGVMb2FkaW5nKCk7XHJcblx0XHRcdFxyXG5cdFx0XHQvL+WmguaenOivt+axguWksei0pe+8jOWwneivleS7jue8k+WtmOS4reivu+WPluaVsOaNrlxyXG5cdFx0XHR2YXIgbWQ1ID0gcmVxdWlyZSgnLi9tZDUuanMnKTtcclxuXHRcdFx0dmFyIGNhY2hla2V5ID0gbWQ1KHVybCk7XHJcblx0XHRcdHZhciBjYWNoZWRhdGEgPSB3eC5nZXRTdG9yYWdlU3luYyhjYWNoZWtleSk7XHJcblx0XHRcdGlmIChjYWNoZWRhdGEgJiYgY2FjaGVkYXRhLmRhdGEpIHtcclxuXHRcdFx0XHRpZiAob3B0aW9uLnN1Y2Nlc3MgJiYgdHlwZW9mIG9wdGlvbi5zdWNjZXNzID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdG9wdGlvbi5zdWNjZXNzKGNhY2hlZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmYWlscmVhZGNhY2hlOicgKyB1cmwpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmIChvcHRpb24uZmFpbCAmJiB0eXBlb2Ygb3B0aW9uLmZhaWwgPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0b3B0aW9uLmZhaWwocmVzcG9uc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdCdjb21wbGV0ZSc6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cdFx0XHQvLyB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcclxuXHRcdFx0Ly8gd3guaGlkZUxvYWRpbmcoKTtcclxuXHRcdFx0aWYgKG9wdGlvbi5jb21wbGV0ZSAmJiB0eXBlb2Ygb3B0aW9uLmNvbXBsZXRlID09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRvcHRpb24uY29tcGxldGUocmVzcG9uc2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuLypcclxuKiDojrflj5bnlKjmiLfkv6Hmga9cclxuKi9cclxudXRpbC5nZXRVc2VySW5mbyA9IGZ1bmN0aW9uIChjYikge1xyXG5cdHZhciBsb2dpbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ3N0YXJ0IGxvZ2luJyk7XHJcblx0XHR2YXIgdXNlckluZm8gPSB7XHJcblx0XHRcdCdzZXNzaW9uaWQnOiAnJyxcclxuXHRcdFx0J3d4SW5mbyc6ICcnLFxyXG5cdFx0XHQnbWVtYmVySW5mbyc6ICcnLFxyXG5cdFx0fTtcclxuXHRcdHd4LmxvZ2luKHtcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG5cdFx0XHRcdHV0aWwucmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6ICdhdXRoL3Nlc3Npb24vb3BlbmlkJyxcclxuXHRcdFx0XHRcdGRhdGE6IHsgY29kZTogcmVzLmNvZGUgfSxcclxuXHRcdFx0XHRcdGNhY2hldGltZTogMCxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChzZXNzaW9uKSB7XHJcblx0XHRcdFx0XHRcdGlmICghc2Vzc2lvbi5kYXRhLmVycm5vKSB7XHJcblx0XHRcdFx0XHRcdFx0dXNlckluZm8uc2Vzc2lvbmlkID0gc2Vzc2lvbi5kYXRhLmRhdGEuc2Vzc2lvbmlkXHJcblx0XHRcdFx0XHRcdFx0d3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgdXNlckluZm8pO1xyXG5cdFx0XHRcdFx0XHRcdHd4LmdldFVzZXJJbmZvKHtcclxuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uICh3eEluZm8pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dXNlckluZm8ud3hJbmZvID0gd3hJbmZvLnVzZXJJbmZvXHJcblx0XHRcdFx0XHRcdFx0XHRcdHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycsIHVzZXJJbmZvKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dXRpbC5yZXF1ZXN0KHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR1cmw6ICdhdXRoL3Nlc3Npb24vdXNlcmluZm8nLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNpZ25hdHVyZTogd3hJbmZvLnNpZ25hdHVyZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJhd0RhdGE6IHd4SW5mby5yYXdEYXRhLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aXY6IHd4SW5mby5pdixcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVuY3J5cHRlZERhdGE6IHd4SW5mby5lbmNyeXB0ZWREYXRhXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRoZWFkZXI6IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2FjaGV0aW1lOiAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghcmVzLmRhdGEuZXJybm8pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dXNlckluZm8ubWVtYmVySW5mbyA9IHJlcy5kYXRhLmRhdGE7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycsIHVzZXJJbmZvKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiBjYiA9PSBcImZ1bmN0aW9uXCIgJiYgY2IodXNlckluZm8pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0ZmFpbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlb2YgY2IgPT0gXCJmdW5jdGlvblwiICYmIGNiKHVzZXJJbmZvKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmFpbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHd4LnNob3dNb2RhbCh7XHJcblx0XHRcdFx0XHR0aXRsZTogJ+iOt+WPluS/oeaBr+Wksei0pScsXHJcblx0XHRcdFx0XHRjb250ZW50OiAn6K+35YWB6K645o6I5p2D5Lul5L6/5Li65oKo5o+Q5L6b57uZ5pyN5YqhJyxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHJlcy5jb25maXJtKSB7XHJcblx0XHRcdFx0XHRcdFx0dXRpbC5nZXRVc2VySW5mbygpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0dmFyIGFwcCA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycpO1xyXG5cdGlmIChhcHAuc2Vzc2lvbmlkKSB7XHJcblx0XHR3eC5jaGVja1Nlc3Npb24oe1xyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdHR5cGVvZiBjYiA9PSBcImZ1bmN0aW9uXCIgJiYgY2IoYXBwKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmFpbDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRhcHAuc2Vzc2lvbmlkID0gJyc7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ3JlbG9naW4nKTtcclxuXHRcdFx0XHR3eC5yZW1vdmVTdG9yYWdlU3luYygndXNlckluZm8nKTtcclxuXHRcdFx0XHRsb2dpbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH0gZWxzZSB7XHJcblx0XHQvL+iwg+eUqOeZu+W9leaOpeWPo1xyXG5cdFx0bG9naW4oKTtcclxuXHR9XHJcbn1cclxuXHJcbnV0aWwubmF2aWdhdGVCYWNrID0gZnVuY3Rpb24gKG9iaikge1xyXG5cdGxldCBkZWx0YSA9IG9iai5kZWx0YSA/IG9iai5kZWx0YSA6IDE7XHJcblx0aWYgKG9iai5kYXRhKSB7XHJcblx0XHRsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKVxyXG5cdFx0bGV0IGN1clBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAoZGVsdGEgKyAxKV07XHJcblx0XHRpZiAoY3VyUGFnZS5wYWdlRm9yUmVzdWx0KSB7XHJcblx0XHRcdGN1clBhZ2UucGFnZUZvclJlc3VsdChvYmouZGF0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjdXJQYWdlLnNldERhdGEob2JqLmRhdGEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHR3eC5uYXZpZ2F0ZUJhY2soe1xyXG5cdFx0ZGVsdGE6IGRlbHRhLCAvLyDlm57pgIDliY0gZGVsdGEo6buY6K6k5Li6MSkg6aG16Z2iXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcblx0XHRcdC8vIHN1Y2Nlc3NcclxuXHRcdFx0dHlwZW9mIG9iai5zdWNjZXNzID09IFwiZnVuY3Rpb25cIiAmJiBvYmouc3VjY2VzcyhyZXMpO1xyXG5cdFx0fSxcclxuXHRcdGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuXHRcdFx0Ly8gZmFpbFxyXG5cdFx0XHR0eXBlb2Ygb2JqLmZhaWwgPT0gXCJmdW5jdGlvblwiICYmIG9iai5mYWlsKGVycik7XHJcblx0XHR9LFxyXG5cdFx0Y29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gY29tcGxldGVcclxuXHRcdFx0dHlwZW9mIG9iai5jb21wbGV0ZSA9PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbXBsZXRlKCk7XHJcblx0XHR9XHJcblx0fSlcclxufTtcclxuXHJcbnV0aWwuZm9vdGVyID0gZnVuY3Rpb24gKCR0aGlzKSB7XHJcblx0bGV0IGFwcCA9IHdlcHkuJGluc3RhbmNlO1xyXG5cdGxldCB0aGF0ID0gJHRoaXM7XHJcblx0bGV0IHRhYkJhciA9IGFwcC50YWJCYXI7XHJcblx0Zm9yIChsZXQgaSBpbiB0YWJCYXJbJ2xpc3QnXSkge1xyXG5cdFx0dGFiQmFyWydsaXN0J11baV1bJ3BhZ2VVcmwnXSA9IHRhYkJhclsnbGlzdCddW2ldWydwYWdlUGF0aCddLnJlcGxhY2UoLyhcXD98IylbXlwiXSovZywgJycpXHJcblx0fVxyXG5cdHRoYXQuc2V0RGF0YSh7XHJcblx0XHR0YWJCYXI6IHRhYkJhcixcclxuXHRcdCd0YWJCYXIudGhpc3VybCc6IHRoYXQuX19yb3V0ZV9fXHJcblx0fSlcclxufTtcclxuLypcclxuICog5o+Q56S65L+h5oGvXHJcbiAqIHR5cGUg5Li6IHN1Y2Nlc3MsIGVycm9yIOW9k+S4uiBzdWNjZXNzLCAg5pe277yM5Li6dG9hc3TmlrnlvI/vvIzlkKbliJnkuLrmqKHmgIHmoYbnmoTmlrnlvI9cclxuICogcmVkaXJlY3Qg5Li65o+Q56S65ZCO55qE6Lez6L2s5Zyw5Z2ALCDot7PovaznmoTml7blgJnlj6/ku6XliqDkuIog5Y2P6K6u5ZCN56ewICBcclxuICogbmF2aWdhdGU6L3dlNy9wYWdlcy9kZXRhaWwvZGV0YWlsIOS7pSBuYXZpZ2F0ZVRvIOeahOaWueazlei3s+i9rO+8jFxyXG4gKiByZWRpcmVjdDovd2U3L3BhZ2VzL2RldGFpbC9kZXRhaWwg5LulIHJlZGlyZWN0VG8g55qE5pa55byP6Lez6L2s77yM6buY6K6k5Li6IHJlZGlyZWN0XHJcbiovXHJcbnV0aWwubWVzc2FnZSA9IGZ1bmN0aW9uKHRpdGxlLCByZWRpcmVjdCwgdHlwZSkge1xyXG5cdGlmICghdGl0bGUpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRpZiAodHlwZW9mIHRpdGxlID09ICdvYmplY3QnKSB7XHJcblx0XHRyZWRpcmVjdCA9IHRpdGxlLnJlZGlyZWN0O1xyXG5cdFx0dHlwZSA9IHRpdGxlLnR5cGU7XHJcblx0XHR0aXRsZSA9IHRpdGxlLnRpdGxlO1xyXG5cdH1cclxuXHRpZiAocmVkaXJlY3QpIHtcclxuXHRcdHZhciByZWRpcmVjdFR5cGUgPSByZWRpcmVjdC5zdWJzdHJpbmcoMCwgOSksIHVybCA9ICcnLCByZWRpcmVjdEZ1bmN0aW9uID0gJyc7XHJcblx0XHRpZiAocmVkaXJlY3RUeXBlID09ICduYXZpZ2F0ZTonKSB7XHJcblx0XHRcdHJlZGlyZWN0RnVuY3Rpb24gPSAnbmF2aWdhdGVUbyc7XHJcblx0XHRcdHVybCA9IHJlZGlyZWN0LnN1YnN0cmluZyg5KTtcclxuXHRcdH0gZWxzZSBpZiAocmVkaXJlY3RUeXBlID09ICdyZWRpcmVjdDonKSB7XHJcblx0XHRcdHJlZGlyZWN0RnVuY3Rpb24gPSAncmVkaXJlY3RUbyc7XHJcblx0XHRcdHVybCA9IHJlZGlyZWN0LnN1YnN0cmluZyg5KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHVybCA9IHJlZGlyZWN0O1xyXG5cdFx0XHRyZWRpcmVjdEZ1bmN0aW9uID0gJ3JlZGlyZWN0VG8nO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjb25zb2xlLmxvZyh1cmwpXHJcblx0aWYgKCF0eXBlKSB7XHJcblx0XHR0eXBlID0gJ3N1Y2Nlc3MnO1xyXG5cdH1cclxuXHJcblx0aWYgKHR5cGUgPT0gJ3N1Y2Nlc3MnKSB7XHJcblx0XHR3eC5zaG93VG9hc3Qoe1xyXG5cdFx0XHR0aXRsZTogdGl0bGUsXHJcblx0XHRcdGljb246ICdzdWNjZXNzJyxcclxuXHRcdFx0ZHVyYXRpb246IDIwMDAsXHJcblx0XHRcdG1hc2sgOiB1cmwgPyB0cnVlIDogZmFsc2UsXHJcblx0XHRcdGNvbXBsZXRlIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKHVybCkge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0XHR3eFtyZWRpcmVjdEZ1bmN0aW9uXSh7XHJcblx0XHRcdFx0XHRcdFx0dXJsOiB1cmwsXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSwgMTgwMCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9IGVsc2UgaWYgKHR5cGUgPT0gJ2Vycm9yJykge1xyXG5cdFx0d3guc2hvd01vZGFsKHtcclxuXHRcdFx0dGl0bGU6ICfns7vnu5/kv6Hmga8nLFxyXG5cdFx0XHRjb250ZW50IDogdGl0bGUsXHJcblx0XHRcdHNob3dDYW5jZWwgOiBmYWxzZSxcclxuXHRcdFx0Y29tcGxldGUgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAodXJsKSB7XHJcblx0XHRcdFx0XHR3eFtyZWRpcmVjdEZ1bmN0aW9uXSh7XHJcblx0XHRcdFx0XHRcdHVybDogdXJsLFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbnV0aWwudXNlciA9IHV0aWwuZ2V0VXNlckluZm87XHJcblxyXG4vL+WwgeijheW+ruS/oeetieW+heaPkOekuu+8jOmYsuatomFqYXjov4flpJrml7bvvIxzaG935aSa5qyhXHJcbnV0aWwuc2hvd0xvYWRpbmcgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgaXNTaG93TG9hZGluZyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpc1Nob3dMb2FkaW5nJyk7XHJcblx0aWYgKGlzU2hvd0xvYWRpbmcpIHtcclxuXHRcdHd4LmhpZGVMb2FkaW5nKCk7XHJcblx0XHR3eC5zZXRTdG9yYWdlU3luYygnaXNTaG93TG9hZGluZycsIGZhbHNlKTtcclxuXHR9XHJcblxyXG5cdHd4LnNob3dMb2FkaW5nKHtcclxuXHRcdHRpdGxlIDogJ+WKoOi9veS4rScsXHJcblx0XHRjb21wbGV0ZSA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR3eC5zZXRTdG9yYWdlU3luYygnaXNTaG93TG9hZGluZycsIHRydWUpO1xyXG5cdFx0fSxcclxuXHRcdGZhaWwgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0d3guc2V0U3RvcmFnZVN5bmMoJ2lzU2hvd0xvYWRpbmcnLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnV0aWwuc2hvd0ltYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHR2YXIgdXJsID0gZXZlbnQgPyBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucHJldmlldyA6ICcnO1xyXG5cdGlmICghdXJsKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHd4LnByZXZpZXdJbWFnZSh7XHJcblx0XHR1cmxzOiBbdXJsXVxyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6L2s5o2i5YaF5a655Lit55qEZW1vamnooajmg4XkuLogdW5pY29kZSDnoIHngrnvvIzlnKhQaHDkuK3kvb/nlKh1dGY4X2J5dGVz5p2l6L2s5o2i6L6T5Ye6XHJcbiovXHJcbnV0aWwucGFyc2VDb250ZW50ID0gZnVuY3Rpb24oc3RyaW5nKSB7XHJcblx0aWYgKCFzdHJpbmcpIHtcclxuXHRcdHJldHVybiBzdHJpbmc7XHJcblx0fVxyXG5cclxuXHR2YXIgcmFuZ2VzID0gW1xyXG5cdFx0XHQnXFx1ZDgzY1tcXHVkZjAwLVxcdWRmZmZdJywgLy8gVSsxRjMwMCB0byBVKzFGM0ZGXHJcblx0XHRcdCdcXHVkODNkW1xcdWRjMDAtXFx1ZGU0Zl0nLCAvLyBVKzFGNDAwIHRvIFUrMUY2NEZcclxuXHRcdFx0J1xcdWQ4M2RbXFx1ZGU4MC1cXHVkZWZmXScgIC8vIFUrMUY2ODAgdG8gVSsxRjZGRlxyXG5cdFx0XTtcclxuXHR2YXIgZW1vamkgPSBzdHJpbmcubWF0Y2goXHJcblx0XHRuZXcgUmVnRXhwKHJhbmdlcy5qb2luKCd8JyksICdnJykpO1xyXG5cclxuXHRpZiAoZW1vamkpIHtcclxuXHRcdGZvciAodmFyIGkgaW4gZW1vamkpIHtcclxuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoZW1vamlbaV0sICdbVSsnICsgZW1vamlbaV0uY29kZVBvaW50QXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyAnXScpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gc3RyaW5nO1xyXG59XHJcblxyXG51dGlsLmRhdGUgPSBmdW5jdGlvbigpe1xyXG5cdC8qKlxyXG5cdCAqIOWIpOaWremXsOW5tFxyXG5cdCAqIEBwYXJhbSBkYXRlIERhdGXml6XmnJ/lr7nosaFcclxuXHQgKiBAcmV0dXJuIGJvb2xlYW4gdHJ1ZSDmiJZmYWxzZVxyXG5cdCAqL1xyXG5cdHRoaXMuaXNMZWFwWWVhciA9IGZ1bmN0aW9uKGRhdGUpe1xyXG5cdFx0cmV0dXJuICgwPT1kYXRlLmdldFllYXIoKSU0JiYoKGRhdGUuZ2V0WWVhcigpJTEwMCE9MCl8fChkYXRlLmdldFllYXIoKSU0MDA9PTApKSk7IFxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiDml6XmnJ/lr7nosaHovazmjaLkuLrmjIflrprmoLzlvI/nmoTlrZfnrKbkuLJcclxuXHQgKiBAcGFyYW0gZiDml6XmnJ/moLzlvI8s5qC85byP5a6a5LmJ5aaC5LiLIHl5eXktTU0tZGQgSEg6bW06c3NcclxuXHQgKiBAcGFyYW0gZGF0ZSBEYXRl5pel5pyf5a+56LGhLCDlpoLmnpznvLrnnIHvvIzliJnkuLrlvZPliY3ml7bpl7RcclxuXHQgKlxyXG5cdCAqIFlZWVkveXl5eS9ZWS95eSDooajnpLrlubTku70gIFxyXG5cdCAqIE1NL00g5pyI5Lu9ICBcclxuXHQgKiBXL3cg5pif5pyfICBcclxuXHQgKiBkZC9ERC9kL0Qg5pel5pyfICBcclxuXHQgKiBoaC9ISC9oL0gg5pe26Ze0ICBcclxuXHQgKiBtbS9tIOWIhumSnyAgXHJcblx0ICogc3MvU1Mvcy9TIOenkiAgXHJcblx0ICogQHJldHVybiBzdHJpbmcg5oyH5a6a5qC85byP55qE5pe26Ze05a2X56ym5LiyXHJcblx0ICovXHJcblx0dGhpcy5kYXRlVG9TdHIgPSBmdW5jdGlvbihmb3JtYXRTdHIsIGRhdGUpe1xyXG5cdFx0Zm9ybWF0U3RyID0gYXJndW1lbnRzWzBdIHx8IFwieXl5eS1NTS1kZCBISDptbTpzc1wiO1xyXG5cdFx0ZGF0ZSA9IGFyZ3VtZW50c1sxXSB8fCBuZXcgRGF0ZSgpO1xyXG5cdFx0dmFyIHN0ciA9IGZvcm1hdFN0cjsgICBcclxuXHRcdHZhciBXZWVrID0gWyfml6UnLCfkuIAnLCfkuownLCfkuIknLCflm5snLCfkupQnLCflha0nXTsgIFxyXG5cdFx0c3RyPXN0ci5yZXBsYWNlKC95eXl5fFlZWVkvLGRhdGUuZ2V0RnVsbFllYXIoKSk7ICAgXHJcblx0XHRzdHI9c3RyLnJlcGxhY2UoL3l5fFlZLywoZGF0ZS5nZXRZZWFyKCkgJSAxMDApPjk/KGRhdGUuZ2V0WWVhcigpICUgMTAwKS50b1N0cmluZygpOicwJyArIChkYXRlLmdldFllYXIoKSAlIDEwMCkpOyAgIFxyXG5cdFx0c3RyPXN0ci5yZXBsYWNlKC9NTS8sZGF0ZS5nZXRNb250aCgpPjk/KGRhdGUuZ2V0TW9udGgoKSArIDEpOicwJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSk7ICAgXHJcblx0XHRzdHI9c3RyLnJlcGxhY2UoL00vZyxkYXRlLmdldE1vbnRoKCkpOyAgIFxyXG5cdFx0c3RyPXN0ci5yZXBsYWNlKC93fFcvZyxXZWVrW2RhdGUuZ2V0RGF5KCldKTsgICBcclxuXHQgIFxyXG5cdFx0c3RyPXN0ci5yZXBsYWNlKC9kZHxERC8sZGF0ZS5nZXREYXRlKCk+OT9kYXRlLmdldERhdGUoKS50b1N0cmluZygpOicwJyArIGRhdGUuZ2V0RGF0ZSgpKTsgICBcclxuXHRcdHN0cj1zdHIucmVwbGFjZSgvZHxEL2csZGF0ZS5nZXREYXRlKCkpOyAgIFxyXG5cdCAgXHJcblx0XHRzdHI9c3RyLnJlcGxhY2UoL2hofEhILyxkYXRlLmdldEhvdXJzKCk+OT9kYXRlLmdldEhvdXJzKCkudG9TdHJpbmcoKTonMCcgKyBkYXRlLmdldEhvdXJzKCkpOyAgIFxyXG5cdFx0c3RyPXN0ci5yZXBsYWNlKC9ofEgvZyxkYXRlLmdldEhvdXJzKCkpOyAgIFxyXG5cdFx0c3RyPXN0ci5yZXBsYWNlKC9tbS8sZGF0ZS5nZXRNaW51dGVzKCk+OT9kYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpOicwJyArIGRhdGUuZ2V0TWludXRlcygpKTsgICBcclxuXHRcdHN0cj1zdHIucmVwbGFjZSgvbS9nLGRhdGUuZ2V0TWludXRlcygpKTsgICBcclxuXHQgIFxyXG5cdFx0c3RyPXN0ci5yZXBsYWNlKC9zc3xTUy8sZGF0ZS5nZXRTZWNvbmRzKCk+OT9kYXRlLmdldFNlY29uZHMoKS50b1N0cmluZygpOicwJyArIGRhdGUuZ2V0U2Vjb25kcygpKTsgICBcclxuXHRcdHN0cj1zdHIucmVwbGFjZSgvc3xTL2csZGF0ZS5nZXRTZWNvbmRzKCkpOyAgIFxyXG5cdCAgXHJcblx0XHRyZXR1cm4gc3RyOyAgIFxyXG5cdH1cclxuIFxyXG5cdFxyXG5cdC8qKlxyXG5cdCog5pel5pyf6K6h566XICBcclxuXHQqIEBwYXJhbSBzdHJJbnRlcnZhbCBzdHJpbmcgIOWPr+mAieWAvCB5IOW5tCBt5pyIIGTml6Ugd+aYn+acnyB3d+WRqCBo5pe2IG7liIYgc+enkiAgXHJcblx0KiBAcGFyYW0gbnVtIGludFxyXG5cdCogQHBhcmFtIGRhdGUgRGF0ZSDml6XmnJ/lr7nosaFcclxuXHQqIEByZXR1cm4gRGF0ZSDov5Tlm57ml6XmnJ/lr7nosaFcclxuXHQqL1xyXG5cdHRoaXMuZGF0ZUFkZCA9IGZ1bmN0aW9uKHN0ckludGVydmFsLCBudW0sIGRhdGUpe1xyXG5cdFx0ZGF0ZSA9ICBhcmd1bWVudHNbMl0gfHwgbmV3IERhdGUoKTtcclxuXHRcdHN3aXRjaCAoc3RySW50ZXJ2YWwpIHsgXHJcblx0XHRcdGNhc2UgJ3MnIDpyZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyAoMTAwMCAqIG51bSkpOyAgXHJcblx0XHRcdGNhc2UgJ24nIDpyZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyAoNjAwMDAgKiBudW0pKTsgIFxyXG5cdFx0XHRjYXNlICdoJyA6cmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpICsgKDM2MDAwMDAgKiBudW0pKTsgIFxyXG5cdFx0XHRjYXNlICdkJyA6cmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpICsgKDg2NDAwMDAwICogbnVtKSk7ICBcclxuXHRcdFx0Y2FzZSAndycgOnJldHVybiBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSArICgoODY0MDAwMDAgKiA3KSAqIG51bSkpOyAgXHJcblx0XHRcdGNhc2UgJ20nIDpyZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAoZGF0ZS5nZXRNb250aCgpKSArIG51bSwgZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCksIGRhdGUuZ2V0U2Vjb25kcygpKTsgIFxyXG5cdFx0XHRjYXNlICd5JyA6cmV0dXJuIG5ldyBEYXRlKChkYXRlLmdldEZ1bGxZZWFyKCkgKyBudW0pLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpLCBkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpLCBkYXRlLmdldFNlY29uZHMoKSk7ICBcclxuXHRcdH0gIFxyXG5cdH0gIFxyXG5cdFxyXG5cdC8qKlxyXG5cdCog5q+U6L6D5pel5pyf5beuIGR0RW5kIOagvOW8j+S4uuaXpeacn+Wei+aIluiAheacieaViOaXpeacn+agvOW8j+Wtl+espuS4slxyXG5cdCogQHBhcmFtIHN0ckludGVydmFsIHN0cmluZyAg5Y+v6YCJ5YC8IHkg5bm0IG3mnIggZOaXpSB35pif5pyfIHd35ZGoIGjml7YgbuWIhiBz56eSICBcclxuXHQqIEBwYXJhbSBkdFN0YXJ0IERhdGUgIOWPr+mAieWAvCB5IOW5tCBt5pyIIGTml6Ugd+aYn+acnyB3d+WRqCBo5pe2IG7liIYgc+enklxyXG5cdCogQHBhcmFtIGR0RW5kIERhdGUgIOWPr+mAieWAvCB5IOW5tCBt5pyIIGTml6Ugd+aYn+acnyB3d+WRqCBo5pe2IG7liIYgc+enkiBcclxuXHQqL1xyXG5cdHRoaXMuZGF0ZURpZmYgPSBmdW5jdGlvbihzdHJJbnRlcnZhbCwgZHRTdGFydCwgZHRFbmQpIHsgICBcclxuXHRcdHN3aXRjaCAoc3RySW50ZXJ2YWwpIHsgICBcclxuXHRcdFx0Y2FzZSAncycgOnJldHVybiBwYXJzZUludCgoZHRFbmQgLSBkdFN0YXJ0KSAvIDEwMDApOyAgXHJcblx0XHRcdGNhc2UgJ24nIDpyZXR1cm4gcGFyc2VJbnQoKGR0RW5kIC0gZHRTdGFydCkgLyA2MDAwMCk7ICBcclxuXHRcdFx0Y2FzZSAnaCcgOnJldHVybiBwYXJzZUludCgoZHRFbmQgLSBkdFN0YXJ0KSAvIDM2MDAwMDApOyAgXHJcblx0XHRcdGNhc2UgJ2QnIDpyZXR1cm4gcGFyc2VJbnQoKGR0RW5kIC0gZHRTdGFydCkgLyA4NjQwMDAwMCk7ICBcclxuXHRcdFx0Y2FzZSAndycgOnJldHVybiBwYXJzZUludCgoZHRFbmQgLSBkdFN0YXJ0KSAvICg4NjQwMDAwMCAqIDcpKTsgIFxyXG5cdFx0XHRjYXNlICdtJyA6cmV0dXJuIChkdEVuZC5nZXRNb250aCgpKzEpKygoZHRFbmQuZ2V0RnVsbFllYXIoKS1kdFN0YXJ0LmdldEZ1bGxZZWFyKCkpKjEyKSAtIChkdFN0YXJ0LmdldE1vbnRoKCkrMSk7ICBcclxuXHRcdFx0Y2FzZSAneScgOnJldHVybiBkdEVuZC5nZXRGdWxsWWVhcigpIC0gZHRTdGFydC5nZXRGdWxsWWVhcigpOyAgXHJcblx0XHR9ICBcclxuXHR9XHJcbiBcclxuXHQvKipcclxuXHQqIOWtl+espuS4sui9rOaNouS4uuaXpeacn+WvueixoSAvLyBldmFsIOS4jeWPr+eUqFxyXG5cdCogQHBhcmFtIGRhdGUgRGF0ZSDmoLzlvI/kuLp5eXl5LU1NLWRkIEhIOm1tOnNz77yM5b+F6aG75oyJ5bm05pyI5pel5pe25YiG56eS55qE6aG65bqP77yM5Lit6Ze05YiG6ZqU56ym5LiN6ZmQ5Yi2XHJcblx0Ki9cclxuXHR0aGlzLnN0clRvRGF0ZSA9IGZ1bmN0aW9uKGRhdGVTdHIpe1xyXG5cdFx0dmFyIGRhdGEgPSBkYXRlU3RyOyAgXHJcblx0XHR2YXIgcmVDYXQgPSAvKFxcZHsxLDR9KS9nbTsgICBcclxuXHRcdHZhciB0ID0gZGF0YS5tYXRjaChyZUNhdCk7XHJcblx0XHR0WzFdID0gdFsxXSAtIDE7XHJcblx0XHRldmFsKCd2YXIgZCA9IG5ldyBEYXRlKCcrdC5qb2luKCcsJykrJyk7Jyk7XHJcblx0XHRyZXR1cm4gZDtcclxuXHR9XHJcbiBcclxuXHQvKipcclxuXHQqIOaKiuaMh+WumuagvOW8j+eahOWtl+espuS4sui9rOaNouS4uuaXpeacn+WvueixoXl5eXktTU0tZGQgSEg6bW06c3NcclxuXHQqIFxyXG5cdCovXHJcblx0dGhpcy5zdHJGb3JtYXRUb0RhdGUgPSBmdW5jdGlvbihmb3JtYXRTdHIsIGRhdGVTdHIpe1xyXG5cdFx0dmFyIHllYXIgPSAwO1xyXG5cdFx0dmFyIHN0YXJ0ID0gLTE7XHJcblx0XHR2YXIgbGVuID0gZGF0ZVN0ci5sZW5ndGg7XHJcblx0XHRpZigoc3RhcnQgPSBmb3JtYXRTdHIuaW5kZXhPZigneXl5eScpKSA+IC0xICYmIHN0YXJ0IDwgbGVuKXtcclxuXHRcdFx0eWVhciA9IGRhdGVTdHIuc3Vic3RyKHN0YXJ0LCA0KTtcclxuXHRcdH1cclxuXHRcdHZhciBtb250aCA9IDA7XHJcblx0XHRpZigoc3RhcnQgPSBmb3JtYXRTdHIuaW5kZXhPZignTU0nKSkgPiAtMSAgJiYgc3RhcnQgPCBsZW4pe1xyXG5cdFx0XHRtb250aCA9IHBhcnNlSW50KGRhdGVTdHIuc3Vic3RyKHN0YXJ0LCAyKSkgLSAxO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGRheSA9IDA7XHJcblx0XHRpZigoc3RhcnQgPSBmb3JtYXRTdHIuaW5kZXhPZignZGQnKSkgPiAtMSAmJiBzdGFydCA8IGxlbil7XHJcblx0XHRcdGRheSA9IHBhcnNlSW50KGRhdGVTdHIuc3Vic3RyKHN0YXJ0LCAyKSk7XHJcblx0XHR9XHJcblx0XHR2YXIgaG91ciA9IDA7XHJcblx0XHRpZiggKChzdGFydCA9IGZvcm1hdFN0ci5pbmRleE9mKCdISCcpKSA+IC0xIHx8IChzdGFydCA9IGZvcm1hdFN0ci5pbmRleE9mKCdoaCcpKSA+IDEpICYmIHN0YXJ0IDwgbGVuKXtcclxuXHRcdFx0aG91ciA9IHBhcnNlSW50KGRhdGVTdHIuc3Vic3RyKHN0YXJ0LCAyKSk7XHJcblx0XHR9XHJcblx0XHR2YXIgbWludXRlID0gMDtcclxuXHRcdGlmKChzdGFydCA9IGZvcm1hdFN0ci5pbmRleE9mKCdtbScpKSA+IC0xICAmJiBzdGFydCA8IGxlbil7XHJcblx0XHRcdG1pbnV0ZSA9IGRhdGVTdHIuc3Vic3RyKHN0YXJ0LCAyKTtcclxuXHRcdH1cclxuXHRcdHZhciBzZWNvbmQgPSAwO1xyXG5cdFx0aWYoKHN0YXJ0ID0gZm9ybWF0U3RyLmluZGV4T2YoJ3NzJykpID4gLTEgICYmIHN0YXJ0IDwgbGVuKXtcclxuXHRcdFx0c2Vjb25kID0gZGF0ZVN0ci5zdWJzdHIoc3RhcnQsIDIpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kKTtcclxuXHR9XHJcbiBcclxuIFxyXG5cdC8qKlxyXG5cdCog5pel5pyf5a+56LGh6L2s5o2i5Li65q+r56eS5pWwXHJcblx0Ki9cclxuXHR0aGlzLmRhdGVUb0xvbmcgPSBmdW5jdGlvbihkYXRlKXtcclxuXHRcdHJldHVybiBkYXRlLmdldFRpbWUoKTtcclxuXHR9XHJcbiBcclxuXHQvKipcclxuXHQqIOavq+enkui9rOaNouS4uuaXpeacn+WvueixoVxyXG5cdCogQHBhcmFtIGRhdGVWYWwgbnVtYmVyIOaXpeacn+eahOavq+enkuaVsCBcclxuXHQqL1xyXG5cdHRoaXMubG9uZ1RvRGF0ZSA9IGZ1bmN0aW9uKGRhdGVWYWwpe1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKGRhdGVWYWwpO1xyXG5cdH1cclxuIFxyXG5cdC8qKlxyXG5cdCog5Yik5pat5a2X56ym5Liy5piv5ZCm5Li65pel5pyf5qC85byPXHJcblx0KiBAcGFyYW0gc3RyIHN0cmluZyDlrZfnrKbkuLJcclxuXHQqIEBwYXJhbSBmb3JtYXRTdHIgc3RyaW5nIOaXpeacn+agvOW8j++8jCDlpoLkuIsgeXl5eS1NTS1kZFxyXG5cdCovXHJcblx0dGhpcy5pc0RhdGUgPSBmdW5jdGlvbihzdHIsIGZvcm1hdFN0cil7XHJcblx0XHRpZiAoZm9ybWF0U3RyID09IG51bGwpe1xyXG5cdFx0XHRmb3JtYXRTdHIgPSBcInl5eXlNTWRkXCI7XHRcclxuXHRcdH1cclxuXHRcdHZhciB5SW5kZXggPSBmb3JtYXRTdHIuaW5kZXhPZihcInl5eXlcIik7XHQgXHJcblx0XHRpZih5SW5kZXg9PS0xKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0dmFyIHllYXIgPSBzdHIuc3Vic3RyaW5nKHlJbmRleCx5SW5kZXgrNCk7XHQgXHJcblx0XHR2YXIgbUluZGV4ID0gZm9ybWF0U3RyLmluZGV4T2YoXCJNTVwiKTtcdCBcclxuXHRcdGlmKG1JbmRleD09LTEpe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHR2YXIgbW9udGggPSBzdHIuc3Vic3RyaW5nKG1JbmRleCxtSW5kZXgrMik7XHQgXHJcblx0XHR2YXIgZEluZGV4ID0gZm9ybWF0U3RyLmluZGV4T2YoXCJkZFwiKTtcdCBcclxuXHRcdGlmKGRJbmRleD09LTEpe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHR2YXIgZGF5ID0gc3RyLnN1YnN0cmluZyhkSW5kZXgsZEluZGV4KzIpO1x0IFxyXG5cdFx0aWYoIWlzTnVtYmVyKHllYXIpfHx5ZWFyPlwiMjEwMFwiIHx8IHllYXI8IFwiMTkwMFwiKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYoIWlzTnVtYmVyKG1vbnRoKXx8bW9udGg+XCIxMlwiIHx8IG1vbnRoPCBcIjAxXCIpe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZihkYXk+Z2V0TWF4RGF5KHllYXIsbW9udGgpIHx8IGRheTwgXCIwMVwiKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7ICAgXHJcblx0fVxyXG5cdFxyXG5cdHRoaXMuZ2V0TWF4RGF5ID0gZnVuY3Rpb24oeWVhcixtb250aCkge1x0IFxyXG5cdFx0aWYobW9udGg9PTR8fG1vbnRoPT02fHxtb250aD09OXx8bW9udGg9PTExKVx0IFxyXG5cdFx0XHRyZXR1cm4gXCIzMFwiO1x0IFxyXG5cdFx0aWYobW9udGg9PTIpXHQgXHJcblx0XHRcdGlmKHllYXIlND09MCYmeWVhciUxMDAhPTAgfHwgeWVhciU0MDA9PTApXHQgXHJcblx0XHRcdFx0cmV0dXJuIFwiMjlcIjtcdCBcclxuXHRcdFx0ZWxzZVx0IFxyXG5cdFx0XHRcdHJldHVybiBcIjI4XCI7XHQgXHJcblx0XHRyZXR1cm4gXCIzMVwiO1x0IFxyXG5cdH1cdCBcclxuXHQvKipcclxuXHQqXHTlj5jph4/mmK/lkKbkuLrmlbDlrZdcclxuXHQqL1xyXG5cdHRoaXMuaXNOdW1iZXIgPSBmdW5jdGlvbihzdHIpXHJcblx0e1xyXG5cdFx0dmFyIHJlZ0V4cCA9IC9eXFxkKyQvZztcclxuXHRcdHJldHVybiByZWdFeHAudGVzdChzdHIpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIOaKiuaXpeacn+WIhuWJsuaIkOaVsOe7hCBb5bm044CB5pyI44CB5pel44CB5pe244CB5YiG44CB56eSXVxyXG5cdCovXHJcblx0dGhpcy50b0FycmF5ID0gZnVuY3Rpb24obXlEYXRlKSAgXHJcblx0eyAgIFxyXG5cdFx0bXlEYXRlID0gYXJndW1lbnRzWzBdIHx8IG5ldyBEYXRlKCk7XHJcblx0XHR2YXIgbXlBcnJheSA9IEFycmF5KCk7ICBcclxuXHRcdG15QXJyYXlbMF0gPSBteURhdGUuZ2V0RnVsbFllYXIoKTsgIFxyXG5cdFx0bXlBcnJheVsxXSA9IG15RGF0ZS5nZXRNb250aCgpOyAgXHJcblx0XHRteUFycmF5WzJdID0gbXlEYXRlLmdldERhdGUoKTsgIFxyXG5cdFx0bXlBcnJheVszXSA9IG15RGF0ZS5nZXRIb3VycygpOyAgXHJcblx0XHRteUFycmF5WzRdID0gbXlEYXRlLmdldE1pbnV0ZXMoKTsgIFxyXG5cdFx0bXlBcnJheVs1XSA9IG15RGF0ZS5nZXRTZWNvbmRzKCk7ICBcclxuXHRcdHJldHVybiBteUFycmF5OyAgXHJcblx0fSAgXHJcblx0XHJcblx0LyoqXHJcblx0KiDlj5blvpfml6XmnJ/mlbDmja7kv6Hmga8gIFxyXG5cdCog5Y+C5pWwIGludGVydmFsIOihqOekuuaVsOaNruexu+WeiyAgXHJcblx0KiB5IOW5tCBN5pyIIGTml6Ugd+aYn+acnyB3d+WRqCBo5pe2IG7liIYgc+enkiAgXHJcblx0Ki9cclxuXHR0aGlzLmRhdGVQYXJ0ID0gZnVuY3Rpb24oaW50ZXJ2YWwsIG15RGF0ZSkgIFxyXG5cdHsgICBcclxuXHRcdG15RGF0ZSA9IGFyZ3VtZW50c1sxXSB8fCBuZXcgRGF0ZSgpO1xyXG5cdFx0dmFyIHBhcnRTdHI9Jyc7ICBcclxuXHRcdHZhciBXZWVrID0gWyfml6UnLCfkuIAnLCfkuownLCfkuIknLCflm5snLCfkupQnLCflha0nXTsgIFxyXG5cdFx0c3dpdGNoIChpbnRlcnZhbCkgIFxyXG5cdFx0eyAgIFxyXG5cdFx0XHRjYXNlICd5JyA6cGFydFN0ciA9IG15RGF0ZS5nZXRGdWxsWWVhcigpO2JyZWFrOyAgXHJcblx0XHRcdGNhc2UgJ00nIDpwYXJ0U3RyID0gbXlEYXRlLmdldE1vbnRoKCkrMTticmVhazsgIFxyXG5cdFx0XHRjYXNlICdkJyA6cGFydFN0ciA9IG15RGF0ZS5nZXREYXRlKCk7YnJlYWs7ICBcclxuXHRcdFx0Y2FzZSAndycgOnBhcnRTdHIgPSBXZWVrW215RGF0ZS5nZXREYXkoKV07YnJlYWs7ICBcclxuXHRcdFx0Y2FzZSAnd3cnIDpwYXJ0U3RyID0gbXlEYXRlLldlZWtOdW1PZlllYXIoKTticmVhazsgIFxyXG5cdFx0XHRjYXNlICdoJyA6cGFydFN0ciA9IG15RGF0ZS5nZXRIb3VycygpO2JyZWFrOyAgXHJcblx0XHRcdGNhc2UgJ20nIDpwYXJ0U3RyID0gbXlEYXRlLmdldE1pbnV0ZXMoKTticmVhazsgIFxyXG5cdFx0XHRjYXNlICdzJyA6cGFydFN0ciA9IG15RGF0ZS5nZXRTZWNvbmRzKCk7YnJlYWs7ICBcclxuXHRcdH0gIFxyXG5cdFx0cmV0dXJuIHBhcnRTdHI7ICBcclxuXHR9ICBcclxuXHRcclxuXHQvKipcclxuXHQqIOWPluW+l+W9k+WJjeaXpeacn+aJgOWcqOaciOeahOacgOWkp+WkqeaVsCAgXHJcblx0Ki9cclxuXHR0aGlzLm1heERheU9mRGF0ZSA9IGZ1bmN0aW9uKGRhdGUpICBcclxuXHR7ICAgXHJcblx0XHRkYXRlID0gYXJndW1lbnRzWzBdIHx8IG5ldyBEYXRlKCk7XHJcblx0XHRkYXRlLnNldERhdGUoMSk7XHJcblx0XHRkYXRlLnNldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSArIDEpO1xyXG5cdFx0dmFyIHRpbWUgPSBkYXRlLmdldFRpbWUoKSAtIDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcblx0XHR2YXIgbmV3RGF0ZSA9IG5ldyBEYXRlKHRpbWUpO1xyXG5cdFx0cmV0dXJuIG5ld0RhdGUuZ2V0RGF0ZSgpO1xyXG5cdH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdXRpbDtcclxuIl19