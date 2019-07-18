'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//     Underscore.js 1.8.2
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function () {

	// Baseline setup
	// --------------

	// Establish the root object, `window` in the browser, or `exports` on the server.
	//   var root = this;

	//   // Save the previous value of the `_` variable.
	//   var previousUnderscore = root._;

	// Save bytes in the minified (but not gzipped) version:
	var ArrayProto = Array.prototype,
	    ObjProto = Object.prototype,
	    FuncProto = Function.prototype;

	// Create quick reference variables for speed access to core prototypes.
	var push = ArrayProto.push,
	    slice = ArrayProto.slice,
	    toString = ObjProto.toString,
	    hasOwnProperty = ObjProto.hasOwnProperty;

	// All **ECMAScript 5** native function implementations that we hope to use
	// are declared here.
	var nativeIsArray = Array.isArray,
	    nativeKeys = Object.keys,
	    nativeBind = FuncProto.bind,
	    nativeCreate = Object.create;

	// Naked function reference for surrogate-prototype-swapping.
	var Ctor = function Ctor() {};

	// Create a safe reference to the Underscore object for use below.
	var _ = function _(obj) {
		if (obj instanceof _) return obj;
		if (!(this instanceof _)) return new _(obj);
		this._wrapped = obj;
	};

	// Export the Underscore object for **Node.js**, with
	// backwards-compatibility for the old `require()` API. If we're in
	// the browser, add `_` as a global object.
	//   if (typeof exports !== 'undefined') {
	//     if (typeof module !== 'undefined' && module.exports) {
	//       exports = module.exports = _;
	//     }
	//     exports._ = _;
	//   } else {
	//     root._ = _;
	//   }
	module.exports = _;
	// Current version.
	_.VERSION = '1.8.2';

	// Internal function that returns an efficient (for current engines) version
	// of the passed-in callback, to be repeatedly applied in other Underscore
	// functions.
	var optimizeCb = function optimizeCb(func, context, argCount) {
		if (context === void 0) return func;
		switch (argCount == null ? 3 : argCount) {
			case 1:
				return function (value) {
					return func.call(context, value);
				};
			case 2:
				return function (value, other) {
					return func.call(context, value, other);
				};
			case 3:
				return function (value, index, collection) {
					return func.call(context, value, index, collection);
				};
			case 4:
				return function (accumulator, value, index, collection) {
					return func.call(context, accumulator, value, index, collection);
				};
		}
		return function () {
			return func.apply(context, arguments);
		};
	};

	// A mostly-internal function to generate callbacks that can be applied
	// to each element in a collection, returning the desired result 鈥� either
	// identity, an arbitrary callback, a property matcher, or a property accessor.
	var cb = function cb(value, context, argCount) {
		if (value == null) return _.identity;
		if (_.isFunction(value)) return optimizeCb(value, context, argCount);
		if (_.isObject(value)) return _.matcher(value);
		return _.property(value);
	};
	_.iteratee = function (value, context) {
		return cb(value, context, Infinity);
	};

	// An internal function for creating assigner functions.
	var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
		return function (obj) {
			var length = arguments.length;
			if (length < 2 || obj == null) return obj;
			for (var index = 1; index < length; index++) {
				var source = arguments[index],
				    keys = keysFunc(source),
				    l = keys.length;
				for (var i = 0; i < l; i++) {
					var key = keys[i];
					if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
				}
			}
			return obj;
		};
	};

	// An internal function for creating a new object that inherits from another.
	var baseCreate = function baseCreate(prototype) {
		if (!_.isObject(prototype)) return {};
		if (nativeCreate) return nativeCreate(prototype);
		Ctor.prototype = prototype;
		var result = new Ctor();
		Ctor.prototype = null;
		return result;
	};

	// Helper for collection methods to determine whether a collection
	// should be iterated as an array or as an object
	// Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	var isArrayLike = function isArrayLike(collection) {
		var length = collection != null && collection.length;
		return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	};

	// Collection Functions
	// --------------------

	// The cornerstone, an `each` implementation, aka `forEach`.
	// Handles raw objects in addition to array-likes. Treats all
	// sparse array-likes as if they were dense.
	_.each = _.forEach = function (obj, iteratee, context) {
		iteratee = optimizeCb(iteratee, context);
		var i, length;
		if (isArrayLike(obj)) {
			for (i = 0, length = obj.length; i < length; i++) {
				iteratee(obj[i], i, obj);
			}
		} else {
			var keys = _.keys(obj);
			for (i = 0, length = keys.length; i < length; i++) {
				iteratee(obj[keys[i]], keys[i], obj);
			}
		}
		return obj;
	};

	// Return the results of applying the iteratee to each element.
	_.map = _.collect = function (obj, iteratee, context) {
		iteratee = cb(iteratee, context);
		var keys = !isArrayLike(obj) && _.keys(obj),
		    length = (keys || obj).length,
		    results = Array(length);
		for (var index = 0; index < length; index++) {
			var currentKey = keys ? keys[index] : index;
			results[index] = iteratee(obj[currentKey], currentKey, obj);
		}
		return results;
	};

	// Create a reducing function iterating left or right.
	function createReduce(dir) {
		// Optimized iterator function as using arguments.length
		// in the main function will deoptimize the, see #1991.
		function iterator(obj, iteratee, memo, keys, index, length) {
			for (; index >= 0 && index < length; index += dir) {
				var currentKey = keys ? keys[index] : index;
				memo = iteratee(memo, obj[currentKey], currentKey, obj);
			}
			return memo;
		}

		return function (obj, iteratee, memo, context) {
			iteratee = optimizeCb(iteratee, context, 4);
			var keys = !isArrayLike(obj) && _.keys(obj),
			    length = (keys || obj).length,
			    index = dir > 0 ? 0 : length - 1;
			// Determine the initial value if none is provided.
			if (arguments.length < 3) {
				memo = obj[keys ? keys[index] : index];
				index += dir;
			}
			return iterator(obj, iteratee, memo, keys, index, length);
		};
	}

	// **Reduce** builds up a single result from a list of values, aka `inject`,
	// or `foldl`.
	_.reduce = _.foldl = _.inject = createReduce(1);

	// The right-associative version of reduce, also known as `foldr`.
	_.reduceRight = _.foldr = createReduce(-1);

	// Return the first value which passes a truth test. Aliased as `detect`.
	_.find = _.detect = function (obj, predicate, context) {
		var key;
		if (isArrayLike(obj)) {
			key = _.findIndex(obj, predicate, context);
		} else {
			key = _.findKey(obj, predicate, context);
		}
		if (key !== void 0 && key !== -1) return obj[key];
	};

	// Return all the elements that pass a truth test.
	// Aliased as `select`.
	_.filter = _.select = function (obj, predicate, context) {
		var results = [];
		predicate = cb(predicate, context);
		_.each(obj, function (value, index, list) {
			if (predicate(value, index, list)) results.push(value);
		});
		return results;
	};

	// Return all the elements for which a truth test fails.
	_.reject = function (obj, predicate, context) {
		return _.filter(obj, _.negate(cb(predicate)), context);
	};

	// Determine whether all of the elements match a truth test.
	// Aliased as `all`.
	_.every = _.all = function (obj, predicate, context) {
		predicate = cb(predicate, context);
		var keys = !isArrayLike(obj) && _.keys(obj),
		    length = (keys || obj).length;
		for (var index = 0; index < length; index++) {
			var currentKey = keys ? keys[index] : index;
			if (!predicate(obj[currentKey], currentKey, obj)) return false;
		}
		return true;
	};

	// Determine if at least one element in the object matches a truth test.
	// Aliased as `any`.
	_.some = _.any = function (obj, predicate, context) {
		predicate = cb(predicate, context);
		var keys = !isArrayLike(obj) && _.keys(obj),
		    length = (keys || obj).length;
		for (var index = 0; index < length; index++) {
			var currentKey = keys ? keys[index] : index;
			if (predicate(obj[currentKey], currentKey, obj)) return true;
		}
		return false;
	};

	// Determine if the array or object contains a given value (using `===`).
	// Aliased as `includes` and `include`.
	_.contains = _.includes = _.include = function (obj, target, fromIndex) {
		if (!isArrayLike(obj)) obj = _.values(obj);
		return _.indexOf(obj, target, typeof fromIndex == 'number' && fromIndex) >= 0;
	};

	// Invoke a method (with arguments) on every item in a collection.
	_.invoke = function (obj, method) {
		var args = slice.call(arguments, 2);
		var isFunc = _.isFunction(method);
		return _.map(obj, function (value) {
			var func = isFunc ? method : value[method];
			return func == null ? func : func.apply(value, args);
		});
	};

	// Convenience version of a common use case of `map`: fetching a property.
	_.pluck = function (obj, key) {
		return _.map(obj, _.property(key));
	};

	// Convenience version of a common use case of `filter`: selecting only objects
	// containing specific `key:value` pairs.
	_.where = function (obj, attrs) {
		return _.filter(obj, _.matcher(attrs));
	};

	// Convenience version of a common use case of `find`: getting the first object
	// containing specific `key:value` pairs.
	_.findWhere = function (obj, attrs) {
		return _.find(obj, _.matcher(attrs));
	};

	// Return the maximum element (or element-based computation).
	_.max = function (obj, iteratee, context) {
		var result = -Infinity,
		    lastComputed = -Infinity,
		    value,
		    computed;
		if (iteratee == null && obj != null) {
			obj = isArrayLike(obj) ? obj : _.values(obj);
			for (var i = 0, length = obj.length; i < length; i++) {
				value = obj[i];
				if (value > result) {
					result = value;
				}
			}
		} else {
			iteratee = cb(iteratee, context);
			_.each(obj, function (value, index, list) {
				computed = iteratee(value, index, list);
				if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
					result = value;
					lastComputed = computed;
				}
			});
		}
		return result;
	};

	// Return the minimum element (or element-based computation).
	_.min = function (obj, iteratee, context) {
		var result = Infinity,
		    lastComputed = Infinity,
		    value,
		    computed;
		if (iteratee == null && obj != null) {
			obj = isArrayLike(obj) ? obj : _.values(obj);
			for (var i = 0, length = obj.length; i < length; i++) {
				value = obj[i];
				if (value < result) {
					result = value;
				}
			}
		} else {
			iteratee = cb(iteratee, context);
			_.each(obj, function (value, index, list) {
				computed = iteratee(value, index, list);
				if (computed < lastComputed || computed === Infinity && result === Infinity) {
					result = value;
					lastComputed = computed;
				}
			});
		}
		return result;
	};

	// Shuffle a collection, using the modern version of the
	// [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher鈥揧ates_shuffle).
	_.shuffle = function (obj) {
		var set = isArrayLike(obj) ? obj : _.values(obj);
		var length = set.length;
		var shuffled = Array(length);
		for (var index = 0, rand; index < length; index++) {
			rand = _.random(0, index);
			if (rand !== index) shuffled[index] = shuffled[rand];
			shuffled[rand] = set[index];
		}
		return shuffled;
	};

	// Sample **n** random values from a collection.
	// If **n** is not specified, returns a single random element.
	// The internal `guard` argument allows it to work with `map`.
	_.sample = function (obj, n, guard) {
		if (n == null || guard) {
			if (!isArrayLike(obj)) obj = _.values(obj);
			return obj[_.random(obj.length - 1)];
		}
		return _.shuffle(obj).slice(0, Math.max(0, n));
	};

	// Sort the object's values by a criterion produced by an iteratee.
	_.sortBy = function (obj, iteratee, context) {
		iteratee = cb(iteratee, context);
		return _.pluck(_.map(obj, function (value, index, list) {
			return {
				value: value,
				index: index,
				criteria: iteratee(value, index, list)
			};
		}).sort(function (left, right) {
			var a = left.criteria;
			var b = right.criteria;
			if (a !== b) {
				if (a > b || a === void 0) return 1;
				if (a < b || b === void 0) return -1;
			}
			return left.index - right.index;
		}), 'value');
	};

	// An internal function used for aggregate "group by" operations.
	var group = function group(behavior) {
		return function (obj, iteratee, context) {
			var result = {};
			iteratee = cb(iteratee, context);
			_.each(obj, function (value, index) {
				var key = iteratee(value, index, obj);
				behavior(result, value, key);
			});
			return result;
		};
	};

	// Groups the object's values by a criterion. Pass either a string attribute
	// to group by, or a function that returns the criterion.
	_.groupBy = group(function (result, value, key) {
		if (_.has(result, key)) result[key].push(value);else result[key] = [value];
	});

	// Indexes the object's values by a criterion, similar to `groupBy`, but for
	// when you know that your index values will be unique.
	_.indexBy = group(function (result, value, key) {
		result[key] = value;
	});

	// Counts instances of an object that group by a certain criterion. Pass
	// either a string attribute to count by, or a function that returns the
	// criterion.
	_.countBy = group(function (result, value, key) {
		if (_.has(result, key)) result[key]++;else result[key] = 1;
	});

	// Safely create a real, live array from anything iterable.
	_.toArray = function (obj) {
		if (!obj) return [];
		if (_.isArray(obj)) return slice.call(obj);
		if (isArrayLike(obj)) return _.map(obj, _.identity);
		return _.values(obj);
	};

	// Return the number of elements in an object.
	_.size = function (obj) {
		if (obj == null) return 0;
		return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	};

	// Split a collection into two arrays: one whose elements all satisfy the given
	// predicate, and one whose elements all do not satisfy the predicate.
	_.partition = function (obj, predicate, context) {
		predicate = cb(predicate, context);
		var pass = [],
		    fail = [];
		_.each(obj, function (value, key, obj) {
			(predicate(value, key, obj) ? pass : fail).push(value);
		});
		return [pass, fail];
	};

	// Array Functions
	// ---------------

	// Get the first element of an array. Passing **n** will return the first N
	// values in the array. Aliased as `head` and `take`. The **guard** check
	// allows it to work with `_.map`.
	_.first = _.head = _.take = function (array, n, guard) {
		if (array == null) return void 0;
		if (n == null || guard) return array[0];
		return _.initial(array, array.length - n);
	};

	// Returns everything but the last entry of the array. Especially useful on
	// the arguments object. Passing **n** will return all the values in
	// the array, excluding the last N.
	_.initial = function (array, n, guard) {
		return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	};

	// Get the last element of an array. Passing **n** will return the last N
	// values in the array.
	_.last = function (array, n, guard) {
		if (array == null) return void 0;
		if (n == null || guard) return array[array.length - 1];
		return _.rest(array, Math.max(0, array.length - n));
	};

	// Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	// Especially useful on the arguments object. Passing an **n** will return
	// the rest N values in the array.
	_.rest = _.tail = _.drop = function (array, n, guard) {
		return slice.call(array, n == null || guard ? 1 : n);
	};

	// Trim out all falsy values from an array.
	_.compact = function (array) {
		return _.filter(array, _.identity);
	};

	// Internal implementation of a recursive `flatten` function.
	var flatten = function flatten(input, shallow, strict, startIndex) {
		var output = [],
		    idx = 0;
		for (var i = startIndex || 0, length = input && input.length; i < length; i++) {
			var value = input[i];
			if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
				//flatten current level of array or arguments object
				if (!shallow) value = flatten(value, shallow, strict);
				var j = 0,
				    len = value.length;
				output.length += len;
				while (j < len) {
					output[idx++] = value[j++];
				}
			} else if (!strict) {
				output[idx++] = value;
			}
		}
		return output;
	};

	// Flatten out an array, either recursively (by default), or just one level.
	_.flatten = function (array, shallow) {
		return flatten(array, shallow, false);
	};

	// Return a version of the array that does not contain the specified value(s).
	_.without = function (array) {
		return _.difference(array, slice.call(arguments, 1));
	};

	// Produce a duplicate-free version of the array. If the array has already
	// been sorted, you have the option of using a faster algorithm.
	// Aliased as `unique`.
	_.uniq = _.unique = function (array, isSorted, iteratee, context) {
		if (array == null) return [];
		if (!_.isBoolean(isSorted)) {
			context = iteratee;
			iteratee = isSorted;
			isSorted = false;
		}
		if (iteratee != null) iteratee = cb(iteratee, context);
		var result = [];
		var seen = [];
		for (var i = 0, length = array.length; i < length; i++) {
			var value = array[i],
			    computed = iteratee ? iteratee(value, i, array) : value;
			if (isSorted) {
				if (!i || seen !== computed) result.push(value);
				seen = computed;
			} else if (iteratee) {
				if (!_.contains(seen, computed)) {
					seen.push(computed);
					result.push(value);
				}
			} else if (!_.contains(result, value)) {
				result.push(value);
			}
		}
		return result;
	};

	// Produce an array that contains the union: each distinct element from all of
	// the passed-in arrays.
	_.union = function () {
		return _.uniq(flatten(arguments, true, true));
	};

	// Produce an array that contains every item shared between all the
	// passed-in arrays.
	_.intersection = function (array) {
		if (array == null) return [];
		var result = [];
		var argsLength = arguments.length;
		for (var i = 0, length = array.length; i < length; i++) {
			var item = array[i];
			if (_.contains(result, item)) continue;
			for (var j = 1; j < argsLength; j++) {
				if (!_.contains(arguments[j], item)) break;
			}
			if (j === argsLength) result.push(item);
		}
		return result;
	};

	// Take the difference between one array and a number of other arrays.
	// Only the elements present in just the first array will remain.
	_.difference = function (array) {
		var rest = flatten(arguments, true, true, 1);
		return _.filter(array, function (value) {
			return !_.contains(rest, value);
		});
	};

	// Zip together multiple lists into a single array -- elements that share
	// an index go together.
	_.zip = function () {
		return _.unzip(arguments);
	};

	// Complement of _.zip. Unzip accepts an array of arrays and groups
	// each array's elements on shared indices
	_.unzip = function (array) {
		var length = array && _.max(array, 'length').length || 0;
		var result = Array(length);

		for (var index = 0; index < length; index++) {
			result[index] = _.pluck(array, index);
		}
		return result;
	};

	// Converts lists into objects. Pass either a single array of `[key, value]`
	// pairs, or two parallel arrays of the same length -- one of keys, and one of
	// the corresponding values.
	_.object = function (list, values) {
		var result = {};
		for (var i = 0, length = list && list.length; i < length; i++) {
			if (values) {
				result[list[i]] = values[i];
			} else {
				result[list[i][0]] = list[i][1];
			}
		}
		return result;
	};

	// Return the position of the first occurrence of an item in an array,
	// or -1 if the item is not included in the array.
	// If the array is large and already in sort order, pass `true`
	// for **isSorted** to use binary search.
	_.indexOf = function (array, item, isSorted) {
		var i = 0,
		    length = array && array.length;
		if (typeof isSorted == 'number') {
			i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
		} else if (isSorted && length) {
			i = _.sortedIndex(array, item);
			return array[i] === item ? i : -1;
		}
		if (item !== item) {
			return _.findIndex(slice.call(array, i), _.isNaN);
		}
		for (; i < length; i++) {
			if (array[i] === item) return i;
		}return -1;
	};

	_.lastIndexOf = function (array, item, from) {
		var idx = array ? array.length : 0;
		if (typeof from == 'number') {
			idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
		}
		if (item !== item) {
			return _.findLastIndex(slice.call(array, 0, idx), _.isNaN);
		}
		while (--idx >= 0) {
			if (array[idx] === item) return idx;
		}return -1;
	};

	// Generator function to create the findIndex and findLastIndex functions
	function createIndexFinder(dir) {
		return function (array, predicate, context) {
			predicate = cb(predicate, context);
			var length = array != null && array.length;
			var index = dir > 0 ? 0 : length - 1;
			for (; index >= 0 && index < length; index += dir) {
				if (predicate(array[index], index, array)) return index;
			}
			return -1;
		};
	}

	// Returns the first index on an array-like that passes a predicate test
	_.findIndex = createIndexFinder(1);

	_.findLastIndex = createIndexFinder(-1);

	// Use a comparator function to figure out the smallest index at which
	// an object should be inserted so as to maintain order. Uses binary search.
	_.sortedIndex = function (array, obj, iteratee, context) {
		iteratee = cb(iteratee, context, 1);
		var value = iteratee(obj);
		var low = 0,
		    high = array.length;
		while (low < high) {
			var mid = Math.floor((low + high) / 2);
			if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
		}
		return low;
	};

	// Generate an integer Array containing an arithmetic progression. A port of
	// the native Python `range()` function. See
	// [the Python documentation](http://docs.python.org/library/functions.html#range).
	_.range = function (start, stop, step) {
		if (arguments.length <= 1) {
			stop = start || 0;
			start = 0;
		}
		step = step || 1;

		var length = Math.max(Math.ceil((stop - start) / step), 0);
		var range = Array(length);

		for (var idx = 0; idx < length; idx++, start += step) {
			range[idx] = start;
		}

		return range;
	};

	// Function (ahem) Functions
	// ------------------

	// Determines whether to execute a function as a constructor
	// or a normal function with the provided arguments
	var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
		if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
		var self = baseCreate(sourceFunc.prototype);
		var result = sourceFunc.apply(self, args);
		if (_.isObject(result)) return result;
		return self;
	};

	// Create a function bound to a given object (assigning `this`, and arguments,
	// optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	// available.
	_.bind = function (func, context) {
		if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
		if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
		var args = slice.call(arguments, 2);
		var bound = function bound() {
			return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
		};
		return bound;
	};

	// Partially apply a function by creating a version that has had some of its
	// arguments pre-filled, without changing its dynamic `this` context. _ acts
	// as a placeholder, allowing any combination of arguments to be pre-filled.
	_.partial = function (func) {
		var boundArgs = slice.call(arguments, 1);
		var bound = function bound() {
			var position = 0,
			    length = boundArgs.length;
			var args = Array(length);
			for (var i = 0; i < length; i++) {
				args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
			}
			while (position < arguments.length) {
				args.push(arguments[position++]);
			}return executeBound(func, bound, this, this, args);
		};
		return bound;
	};

	// Bind a number of an object's methods to that object. Remaining arguments
	// are the method names to be bound. Useful for ensuring that all callbacks
	// defined on an object belong to it.
	_.bindAll = function (obj) {
		var i,
		    length = arguments.length,
		    key;
		if (length <= 1) throw new Error('bindAll must be passed function names');
		for (i = 1; i < length; i++) {
			key = arguments[i];
			obj[key] = _.bind(obj[key], obj);
		}
		return obj;
	};

	// Memoize an expensive function by storing its results.
	_.memoize = function (func, hasher) {
		var memoize = function memoize(key) {
			var cache = memoize.cache;
			var address = '' + (hasher ? hasher.apply(this, arguments) : key);
			if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
			return cache[address];
		};
		memoize.cache = {};
		return memoize;
	};

	// Delays a function for the given number of milliseconds, and then calls
	// it with the arguments supplied.
	_.delay = function (func, wait) {
		var args = slice.call(arguments, 2);
		return setTimeout(function () {
			return func.apply(null, args);
		}, wait);
	};

	// Defers a function, scheduling it to run after the current call stack has
	// cleared.
	_.defer = _.partial(_.delay, _, 1);

	// Returns a function, that, when invoked, will only be triggered at most once
	// during a given window of time. Normally, the throttled function will run
	// as much as it can, without ever going more than once per `wait` duration;
	// but if you'd like to disable the execution on the leading edge, pass
	// `{leading: false}`. To disable execution on the trailing edge, ditto.
	_.throttle = function (func, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function later() {
			previous = options.leading === false ? 0 : _.now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function () {
			var now = _.now();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	};

	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	_.debounce = function (func, wait, immediate) {
		var timeout, args, context, timestamp, result;

		var later = function later() {
			var last = _.now() - timestamp;

			if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
			} else {
				timeout = null;
				if (!immediate) {
					result = func.apply(context, args);
					if (!timeout) context = args = null;
				}
			}
		};

		return function () {
			context = this;
			args = arguments;
			timestamp = _.now();
			var callNow = immediate && !timeout;
			if (!timeout) timeout = setTimeout(later, wait);
			if (callNow) {
				result = func.apply(context, args);
				context = args = null;
			}

			return result;
		};
	};

	// Returns the first function passed as an argument to the second,
	// allowing you to adjust arguments, run code before and after, and
	// conditionally execute the original function.
	_.wrap = function (func, wrapper) {
		return _.partial(wrapper, func);
	};

	// Returns a negated version of the passed-in predicate.
	_.negate = function (predicate) {
		return function () {
			return !predicate.apply(this, arguments);
		};
	};

	// Returns a function that is the composition of a list of functions, each
	// consuming the return value of the function that follows.
	_.compose = function () {
		var args = arguments;
		var start = args.length - 1;
		return function () {
			var i = start;
			var result = args[start].apply(this, arguments);
			while (i--) {
				result = args[i].call(this, result);
			}return result;
		};
	};

	// Returns a function that will only be executed on and after the Nth call.
	_.after = function (times, func) {
		return function () {
			if (--times < 1) {
				return func.apply(this, arguments);
			}
		};
	};

	// Returns a function that will only be executed up to (but not including) the Nth call.
	_.before = function (times, func) {
		var memo;
		return function () {
			if (--times > 0) {
				memo = func.apply(this, arguments);
			}
			if (times <= 1) func = null;
			return memo;
		};
	};

	// Returns a function that will be executed at most one time, no matter how
	// often you call it. Useful for lazy initialization.
	_.once = _.partial(_.before, 2);

	// Object Functions
	// ----------------

	// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
	var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	function collectNonEnumProps(obj, keys) {
		var nonEnumIdx = nonEnumerableProps.length;
		var constructor = obj.constructor;
		var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

		// Constructor is a special case.
		var prop = 'constructor';
		if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

		while (nonEnumIdx--) {
			prop = nonEnumerableProps[nonEnumIdx];
			if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
				keys.push(prop);
			}
		}
	}

	// Retrieve the names of an object's own properties.
	// Delegates to **ECMAScript 5**'s native `Object.keys`
	_.keys = function (obj) {
		if (!_.isObject(obj)) return [];
		if (nativeKeys) return nativeKeys(obj);
		var keys = [];
		for (var key in obj) {
			if (_.has(obj, key)) keys.push(key);
		} // Ahem, IE < 9.
		if (hasEnumBug) collectNonEnumProps(obj, keys);
		return keys;
	};

	// Retrieve all the property names of an object.
	_.allKeys = function (obj) {
		if (!_.isObject(obj)) return [];
		var keys = [];
		for (var key in obj) {
			keys.push(key);
		} // Ahem, IE < 9.
		if (hasEnumBug) collectNonEnumProps(obj, keys);
		return keys;
	};

	// Retrieve the values of an object's properties.
	_.values = function (obj) {
		var keys = _.keys(obj);
		var length = keys.length;
		var values = Array(length);
		for (var i = 0; i < length; i++) {
			values[i] = obj[keys[i]];
		}
		return values;
	};

	// Returns the results of applying the iteratee to each element of the object
	// In contrast to _.map it returns an object
	_.mapObject = function (obj, iteratee, context) {
		iteratee = cb(iteratee, context);
		var keys = _.keys(obj),
		    length = keys.length,
		    results = {},
		    currentKey;
		for (var index = 0; index < length; index++) {
			currentKey = keys[index];
			results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
		}
		return results;
	};

	// Convert an object into a list of `[key, value]` pairs.
	_.pairs = function (obj) {
		var keys = _.keys(obj);
		var length = keys.length;
		var pairs = Array(length);
		for (var i = 0; i < length; i++) {
			pairs[i] = [keys[i], obj[keys[i]]];
		}
		return pairs;
	};

	// Invert the keys and values of an object. The values must be serializable.
	_.invert = function (obj) {
		var result = {};
		var keys = _.keys(obj);
		for (var i = 0, length = keys.length; i < length; i++) {
			result[obj[keys[i]]] = keys[i];
		}
		return result;
	};

	// Return a sorted list of the function names available on the object.
	// Aliased as `methods`
	_.functions = _.methods = function (obj) {
		var names = [];
		for (var key in obj) {
			if (_.isFunction(obj[key])) names.push(key);
		}
		return names.sort();
	};

	// Extend a given object with all the properties in passed-in object(s).
	_.extend = createAssigner(_.allKeys);

	// Assigns a given object with all the own properties in the passed-in object(s)
	// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	_.extendOwn = _.assign = createAssigner(_.keys);

	// Returns the first key on an object that passes a predicate test
	_.findKey = function (obj, predicate, context) {
		predicate = cb(predicate, context);
		var keys = _.keys(obj),
		    key;
		for (var i = 0, length = keys.length; i < length; i++) {
			key = keys[i];
			if (predicate(obj[key], key, obj)) return key;
		}
	};

	// Return a copy of the object only containing the whitelisted properties.
	_.pick = function (object, oiteratee, context) {
		var result = {},
		    obj = object,
		    iteratee,
		    keys;
		if (obj == null) return result;
		if (_.isFunction(oiteratee)) {
			keys = _.allKeys(obj);
			iteratee = optimizeCb(oiteratee, context);
		} else {
			keys = flatten(arguments, false, false, 1);
			iteratee = function iteratee(value, key, obj) {
				return key in obj;
			};
			obj = Object(obj);
		}
		for (var i = 0, length = keys.length; i < length; i++) {
			var key = keys[i];
			var value = obj[key];
			if (iteratee(value, key, obj)) result[key] = value;
		}
		return result;
	};

	// Return a copy of the object without the blacklisted properties.
	_.omit = function (obj, iteratee, context) {
		if (_.isFunction(iteratee)) {
			iteratee = _.negate(iteratee);
		} else {
			var keys = _.map(flatten(arguments, false, false, 1), String);
			iteratee = function iteratee(value, key) {
				return !_.contains(keys, key);
			};
		}
		return _.pick(obj, iteratee, context);
	};

	// Fill in a given object with default properties.
	_.defaults = createAssigner(_.allKeys, true);

	// Creates an object that inherits from the given prototype object.
	// If additional properties are provided then they will be added to the
	// created object.
	_.create = function (prototype, props) {
		var result = baseCreate(prototype);
		if (props) _.extendOwn(result, props);
		return result;
	};

	// Create a (shallow-cloned) duplicate of an object.
	_.clone = function (obj) {
		if (!_.isObject(obj)) return obj;
		return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	};

	// Invokes interceptor with the obj, and then returns obj.
	// The primary purpose of this method is to "tap into" a method chain, in
	// order to perform operations on intermediate results within the chain.
	_.tap = function (obj, interceptor) {
		interceptor(obj);
		return obj;
	};

	// Returns whether an object has a given set of `key:value` pairs.
	_.isMatch = function (object, attrs) {
		var keys = _.keys(attrs),
		    length = keys.length;
		if (object == null) return !length;
		var obj = Object(object);
		for (var i = 0; i < length; i++) {
			var key = keys[i];
			if (attrs[key] !== obj[key] || !(key in obj)) return false;
		}
		return true;
	};

	// Internal recursive comparison function for `isEqual`.
	var eq = function eq(a, b, aStack, bStack) {
		// Identical objects are equal. `0 === -0`, but they aren't identical.
		// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
		if (a === b) return a !== 0 || 1 / a === 1 / b;
		// A strict comparison is necessary because `null == undefined`.
		if (a == null || b == null) return a === b;
		// Unwrap any wrapped objects.
		if (a instanceof _) a = a._wrapped;
		if (b instanceof _) b = b._wrapped;
		// Compare `[[Class]]` names.
		var className = toString.call(a);
		if (className !== toString.call(b)) return false;
		switch (className) {
			// Strings, numbers, regular expressions, dates, and booleans are compared by value.
			case '[object RegExp]':
			// RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
			case '[object String]':
				// Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
				// equivalent to `new String("5")`.
				return '' + a === '' + b;
			case '[object Number]':
				// `NaN`s are equivalent, but non-reflexive.
				// Object(NaN) is equivalent to NaN
				if (+a !== +a) return +b !== +b;
				// An `egal` comparison is performed for other numeric values.
				return +a === 0 ? 1 / +a === 1 / b : +a === +b;
			case '[object Date]':
			case '[object Boolean]':
				// Coerce dates and booleans to numeric primitive values. Dates are compared by their
				// millisecond representations. Note that invalid dates with millisecond representations
				// of `NaN` are not equivalent.
				return +a === +b;
		}

		var areArrays = className === '[object Array]';
		if (!areArrays) {
			if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;

			// Objects with different constructors are not equivalent, but `Object`s or `Array`s
			// from different frames are.
			var aCtor = a.constructor,
			    bCtor = b.constructor;
			if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
				return false;
			}
		}
		// Assume equality for cyclic structures. The algorithm for detecting cyclic
		// structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

		// Initializing stack of traversed objects.
		// It's done here since we only need them for objects and arrays comparison.
		aStack = aStack || [];
		bStack = bStack || [];
		var length = aStack.length;
		while (length--) {
			// Linear search. Performance is inversely proportional to the number of
			// unique nested structures.
			if (aStack[length] === a) return bStack[length] === b;
		}

		// Add the first object to the stack of traversed objects.
		aStack.push(a);
		bStack.push(b);

		// Recursively compare objects and arrays.
		if (areArrays) {
			// Compare array lengths to determine if a deep comparison is necessary.
			length = a.length;
			if (length !== b.length) return false;
			// Deep compare the contents, ignoring non-numeric properties.
			while (length--) {
				if (!eq(a[length], b[length], aStack, bStack)) return false;
			}
		} else {
			// Deep compare objects.
			var keys = _.keys(a),
			    key;
			length = keys.length;
			// Ensure that both objects contain the same number of properties before comparing deep equality.
			if (_.keys(b).length !== length) return false;
			while (length--) {
				// Deep compare each member
				key = keys[length];
				if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
			}
		}
		// Remove the first object from the stack of traversed objects.
		aStack.pop();
		bStack.pop();
		return true;
	};

	// Perform a deep comparison to check if two objects are equal.
	_.isEqual = function (a, b) {
		return eq(a, b);
	};

	// Is a given array, string, or object empty?
	// An "empty" object has no enumerable own-properties.
	_.isEmpty = function (obj) {
		if (obj == null) return true;
		if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
		return _.keys(obj).length === 0;
	};

	// Is a given value a DOM element?
	_.isElement = function (obj) {
		return !!(obj && obj.nodeType === 1);
	};

	// Is a given value an array?
	// Delegates to ECMA5's native Array.isArray
	_.isArray = nativeIsArray || function (obj) {
		return toString.call(obj) === '[object Array]';
	};

	// Is a given variable an object?
	_.isObject = function (obj) {
		var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
		return type === 'function' || type === 'object' && !!obj;
	};

	// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
		_['is' + name] = function (obj) {
			return toString.call(obj) === '[object ' + name + ']';
		};
	});

	// Define a fallback version of the method in browsers (ahem, IE < 9), where
	// there isn't any inspectable "Arguments" type.
	if (!_.isArguments(arguments)) {
		_.isArguments = function (obj) {
			return _.has(obj, 'callee');
		};
	}

	// Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	// IE 11 (#1621), and in Safari 8 (#1929).
	if (typeof /./ != 'function' && (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) != 'object') {
		_.isFunction = function (obj) {
			return typeof obj == 'function' || false;
		};
	}

	// Is a given object a finite number?
	_.isFinite = function (obj) {
		return isFinite(obj) && !isNaN(parseFloat(obj));
	};

	// Is the given value `NaN`? (NaN is the only number which does not equal itself).
	_.isNaN = function (obj) {
		return _.isNumber(obj) && obj !== +obj;
	};

	// Is a given value a boolean?
	_.isBoolean = function (obj) {
		return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	};

	// Is a given value equal to null?
	_.isNull = function (obj) {
		return obj === null;
	};

	// Is a given variable undefined?
	_.isUndefined = function (obj) {
		return obj === void 0;
	};

	// Shortcut function for checking if an object has a given property directly
	// on itself (in other words, not on a prototype).
	_.has = function (obj, key) {
		return obj != null && hasOwnProperty.call(obj, key);
	};

	// Utility Functions
	// -----------------

	// Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	// previous owner. Returns a reference to the Underscore object.
	_.noConflict = function () {
		root._ = previousUnderscore;
		return this;
	};

	// Keep the identity function around for default iteratees.
	_.identity = function (value) {
		return value;
	};

	// Predicate-generating functions. Often useful outside of Underscore.
	_.constant = function (value) {
		return function () {
			return value;
		};
	};

	_.noop = function () {};

	_.property = function (key) {
		return function (obj) {
			return obj == null ? void 0 : obj[key];
		};
	};

	// Generates a function for a given object that returns a given property.
	_.propertyOf = function (obj) {
		return obj == null ? function () {} : function (key) {
			return obj[key];
		};
	};

	// Returns a predicate for checking whether an object has a given set of 
	// `key:value` pairs.
	_.matcher = _.matches = function (attrs) {
		attrs = _.extendOwn({}, attrs);
		return function (obj) {
			return _.isMatch(obj, attrs);
		};
	};

	// Run a function **n** times.
	_.times = function (n, iteratee, context) {
		var accum = Array(Math.max(0, n));
		iteratee = optimizeCb(iteratee, context, 1);
		for (var i = 0; i < n; i++) {
			accum[i] = iteratee(i);
		}return accum;
	};

	// Return a random integer between min and max (inclusive).
	_.random = function (min, max) {
		if (max == null) {
			max = min;
			min = 0;
		}
		return min + Math.floor(Math.random() * (max - min + 1));
	};

	// A (possibly faster) way to get the current timestamp as an integer.
	_.now = Date.now || function () {
		return new Date().getTime();
	};

	// List of HTML entities for escaping.
	var escapeMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		'`': '&#x60;'
	};
	var unescapeMap = _.invert(escapeMap);

	// Functions for escaping and unescaping strings to/from HTML interpolation.
	var createEscaper = function createEscaper(map) {
		var escaper = function escaper(match) {
			return map[match];
		};
		// Regexes for identifying a key that needs to be escaped
		var source = '(?:' + _.keys(map).join('|') + ')';
		var testRegexp = RegExp(source);
		var replaceRegexp = RegExp(source, 'g');
		return function (string) {
			string = string == null ? '' : '' + string;
			return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
		};
	};
	_.escape = createEscaper(escapeMap);
	_.unescape = createEscaper(unescapeMap);

	// If the value of the named `property` is a function then invoke it with the
	// `object` as context; otherwise, return it.
	_.result = function (object, property, fallback) {
		var value = object == null ? void 0 : object[property];
		if (value === void 0) {
			value = fallback;
		}
		return _.isFunction(value) ? value.call(object) : value;
	};

	// Generate a unique integer id (unique within the entire client session).
	// Useful for temporary DOM ids.
	var idCounter = 0;
	_.uniqueId = function (prefix) {
		var id = ++idCounter + '';
		return prefix ? prefix + id : id;
	};

	// By default, Underscore uses ERB-style template delimiters, change the
	// following template settings to use alternative delimiters.
	_.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};

	// When customizing `templateSettings`, if you don't want to define an
	// interpolation, evaluation or escaping regex, we need one that is
	// guaranteed not to match.
	var noMatch = /(.)^/;

	// Certain characters need to be escaped so that they can be put into a
	// string literal.
	var escapes = {
		"'": "'",
		'\\': '\\',
		'\r': 'r',
		'\n': 'n',
		'\u2028': 'u2028',
		'\u2029': 'u2029'
	};

	var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	var escapeChar = function escapeChar(match) {
		return '\\' + escapes[match];
	};

	// JavaScript micro-templating, similar to John Resig's implementation.
	// Underscore templating handles arbitrary delimiters, preserves whitespace,
	// and correctly escapes quotes within interpolated code.
	// NB: `oldSettings` only exists for backwards compatibility.
	_.template = function (text, settings, oldSettings) {
		if (!settings && oldSettings) settings = oldSettings;
		settings = _.defaults({}, settings, _.templateSettings);

		// Combine delimiters into one regular expression via alternation.
		var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

		// Compile the template source, escaping string literals appropriately.
		var index = 0;
		var source = "__p+='";
		text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
			source += text.slice(index, offset).replace(escaper, escapeChar);
			index = offset + match.length;

			if (escape) {
				source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
			} else if (interpolate) {
				source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
			} else if (evaluate) {
				source += "';\n" + evaluate + "\n__p+='";
			}

			// Adobe VMs need the match returned to produce the correct offest.
			return match;
		});
		source += "';\n";

		// If a variable is not specified, place data values in local scope.
		if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

		source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';

		try {
			var render = new Function(settings.variable || 'obj', '_', source);
		} catch (e) {
			e.source = source;
			throw e;
		}

		var template = function template(data) {
			return render.call(this, data, _);
		};

		// Provide the compiled source as a convenience for precompilation.
		var argument = settings.variable || 'obj';
		template.source = 'function(' + argument + '){\n' + source + '}';

		return template;
	};

	// Add a "chain" function. Start chaining a wrapped Underscore object.
	_.chain = function (obj) {
		var instance = _(obj);
		instance._chain = true;
		return instance;
	};

	// OOP
	// ---------------
	// If Underscore is called as a function, it returns a wrapped object that
	// can be used OO-style. This wrapper holds altered versions of all the
	// underscore functions. Wrapped objects may be chained.

	// Helper function to continue chaining intermediate results.
	var result = function result(instance, obj) {
		return instance._chain ? _(obj).chain() : obj;
	};

	// Add your own custom functions to the Underscore object.
	_.mixin = function (obj) {
		_.each(_.functions(obj), function (name) {
			var func = _[name] = obj[name];
			_.prototype[name] = function () {
				var args = [this._wrapped];
				push.apply(args, arguments);
				return result(this, func.apply(_, args));
			};
		});
	};

	// Add all of the Underscore functions to the wrapper object.
	_.mixin(_);

	// Add all mutator Array functions to the wrapper.
	_.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
		var method = ArrayProto[name];
		_.prototype[name] = function () {
			var obj = this._wrapped;
			method.apply(obj, arguments);
			if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
			return result(this, obj);
		};
	});

	// Add all accessor Array functions to the wrapper.
	_.each(['concat', 'join', 'slice'], function (name) {
		var method = ArrayProto[name];
		_.prototype[name] = function () {
			return result(this, method.apply(this._wrapped, arguments));
		};
	});

	// Extracts the result from a wrapped and chained object.
	_.prototype.value = function () {
		return this._wrapped;
	};

	// Provide unwrapping proxy for some methods used in engine operations
	// such as arithmetic and JSON stringification.
	_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	_.prototype.toString = function () {
		return '' + this._wrapped;
	};

	// AMD registration happens at the end for compatibility with AMD loaders
	// that may not enforce next-turn semantics on modules. Even though general
	// practice for AMD registration is to be anonymous, underscore registers
	// as a named module because, like jQuery, it is a base library that is
	// popular enough to be bundled in a third party lib, but not be part of
	// an AMD load request. Those cases could generate an error when an
	// anonymous define() is called outside of a loader request.
	//   if (typeof define === 'function' && define.amd) {
	//     define('underscore', [], function() {
	//       return _;
	//     });
	//   }
}).call(undefined);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuZGVyc2NvcmUuanMiXSwibmFtZXMiOlsiQXJyYXlQcm90byIsIkFycmF5IiwicHJvdG90eXBlIiwiT2JqUHJvdG8iLCJPYmplY3QiLCJGdW5jUHJvdG8iLCJGdW5jdGlvbiIsInB1c2giLCJzbGljZSIsInRvU3RyaW5nIiwiaGFzT3duUHJvcGVydHkiLCJuYXRpdmVJc0FycmF5IiwiaXNBcnJheSIsIm5hdGl2ZUtleXMiLCJrZXlzIiwibmF0aXZlQmluZCIsImJpbmQiLCJuYXRpdmVDcmVhdGUiLCJjcmVhdGUiLCJDdG9yIiwiXyIsIm9iaiIsIl93cmFwcGVkIiwibW9kdWxlIiwiZXhwb3J0cyIsIlZFUlNJT04iLCJvcHRpbWl6ZUNiIiwiZnVuYyIsImNvbnRleHQiLCJhcmdDb3VudCIsInZhbHVlIiwiY2FsbCIsIm90aGVyIiwiaW5kZXgiLCJjb2xsZWN0aW9uIiwiYWNjdW11bGF0b3IiLCJhcHBseSIsImFyZ3VtZW50cyIsImNiIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJpdGVyYXRlZSIsIkluZmluaXR5IiwiY3JlYXRlQXNzaWduZXIiLCJrZXlzRnVuYyIsInVuZGVmaW5lZE9ubHkiLCJsZW5ndGgiLCJzb3VyY2UiLCJsIiwiaSIsImtleSIsImJhc2VDcmVhdGUiLCJyZXN1bHQiLCJNQVhfQVJSQVlfSU5ERVgiLCJNYXRoIiwicG93IiwiaXNBcnJheUxpa2UiLCJlYWNoIiwiZm9yRWFjaCIsIm1hcCIsImNvbGxlY3QiLCJyZXN1bHRzIiwiY3VycmVudEtleSIsImNyZWF0ZVJlZHVjZSIsImRpciIsIml0ZXJhdG9yIiwibWVtbyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImZpbmQiLCJkZXRlY3QiLCJwcmVkaWNhdGUiLCJmaW5kSW5kZXgiLCJmaW5kS2V5IiwiZmlsdGVyIiwic2VsZWN0IiwibGlzdCIsInJlamVjdCIsIm5lZ2F0ZSIsImV2ZXJ5IiwiYWxsIiwic29tZSIsImFueSIsImNvbnRhaW5zIiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwidGFyZ2V0IiwiZnJvbUluZGV4IiwidmFsdWVzIiwiaW5kZXhPZiIsImludm9rZSIsIm1ldGhvZCIsImFyZ3MiLCJpc0Z1bmMiLCJwbHVjayIsIndoZXJlIiwiYXR0cnMiLCJmaW5kV2hlcmUiLCJtYXgiLCJsYXN0Q29tcHV0ZWQiLCJjb21wdXRlZCIsIm1pbiIsInNodWZmbGUiLCJzZXQiLCJzaHVmZmxlZCIsInJhbmQiLCJyYW5kb20iLCJzYW1wbGUiLCJuIiwiZ3VhcmQiLCJzb3J0QnkiLCJjcml0ZXJpYSIsInNvcnQiLCJsZWZ0IiwicmlnaHQiLCJhIiwiYiIsImdyb3VwIiwiYmVoYXZpb3IiLCJncm91cEJ5IiwiaGFzIiwiaW5kZXhCeSIsImNvdW50QnkiLCJ0b0FycmF5Iiwic2l6ZSIsInBhcnRpdGlvbiIsInBhc3MiLCJmYWlsIiwiZmlyc3QiLCJoZWFkIiwidGFrZSIsImFycmF5IiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiZmxhdHRlbiIsImlucHV0Iiwic2hhbGxvdyIsInN0cmljdCIsInN0YXJ0SW5kZXgiLCJvdXRwdXQiLCJpZHgiLCJpc0FyZ3VtZW50cyIsImoiLCJsZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc1NvcnRlZCIsImlzQm9vbGVhbiIsInNlZW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsImFyZ3NMZW5ndGgiLCJpdGVtIiwiemlwIiwidW56aXAiLCJvYmplY3QiLCJzb3J0ZWRJbmRleCIsImlzTmFOIiwibGFzdEluZGV4T2YiLCJmcm9tIiwiZmluZExhc3RJbmRleCIsImNyZWF0ZUluZGV4RmluZGVyIiwibG93IiwiaGlnaCIsIm1pZCIsImZsb29yIiwicmFuZ2UiLCJzdGFydCIsInN0b3AiLCJzdGVwIiwiY2VpbCIsImV4ZWN1dGVCb3VuZCIsInNvdXJjZUZ1bmMiLCJib3VuZEZ1bmMiLCJjYWxsaW5nQ29udGV4dCIsInNlbGYiLCJUeXBlRXJyb3IiLCJib3VuZCIsImNvbmNhdCIsInBhcnRpYWwiLCJib3VuZEFyZ3MiLCJwb3NpdGlvbiIsImJpbmRBbGwiLCJFcnJvciIsIm1lbW9pemUiLCJoYXNoZXIiLCJjYWNoZSIsImFkZHJlc3MiLCJkZWxheSIsIndhaXQiLCJzZXRUaW1lb3V0IiwiZGVmZXIiLCJ0aHJvdHRsZSIsIm9wdGlvbnMiLCJ0aW1lb3V0IiwicHJldmlvdXMiLCJsYXRlciIsImxlYWRpbmciLCJub3ciLCJyZW1haW5pbmciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImRlYm91bmNlIiwiaW1tZWRpYXRlIiwidGltZXN0YW1wIiwiY2FsbE5vdyIsIndyYXAiLCJ3cmFwcGVyIiwiY29tcG9zZSIsImFmdGVyIiwidGltZXMiLCJiZWZvcmUiLCJvbmNlIiwiaGFzRW51bUJ1ZyIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwibm9uRW51bWVyYWJsZVByb3BzIiwiY29sbGVjdE5vbkVudW1Qcm9wcyIsIm5vbkVudW1JZHgiLCJjb25zdHJ1Y3RvciIsInByb3RvIiwicHJvcCIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJuYW1lcyIsImV4dGVuZCIsImV4dGVuZE93biIsImFzc2lnbiIsInBpY2siLCJvaXRlcmF0ZWUiLCJvbWl0IiwiU3RyaW5nIiwiZGVmYXVsdHMiLCJwcm9wcyIsImNsb25lIiwidGFwIiwiaW50ZXJjZXB0b3IiLCJpc01hdGNoIiwiZXEiLCJhU3RhY2siLCJiU3RhY2siLCJjbGFzc05hbWUiLCJhcmVBcnJheXMiLCJhQ3RvciIsImJDdG9yIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJpc1N0cmluZyIsImlzRWxlbWVudCIsIm5vZGVUeXBlIiwidHlwZSIsIm5hbWUiLCJJbnQ4QXJyYXkiLCJpc0Zpbml0ZSIsInBhcnNlRmxvYXQiLCJpc051bWJlciIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwibm9Db25mbGljdCIsInJvb3QiLCJwcmV2aW91c1VuZGVyc2NvcmUiLCJjb25zdGFudCIsIm5vb3AiLCJwcm9wZXJ0eU9mIiwibWF0Y2hlcyIsImFjY3VtIiwiRGF0ZSIsImdldFRpbWUiLCJlc2NhcGVNYXAiLCJ1bmVzY2FwZU1hcCIsImNyZWF0ZUVzY2FwZXIiLCJlc2NhcGVyIiwibWF0Y2giLCJqb2luIiwidGVzdFJlZ2V4cCIsIlJlZ0V4cCIsInJlcGxhY2VSZWdleHAiLCJzdHJpbmciLCJ0ZXN0IiwicmVwbGFjZSIsImVzY2FwZSIsInVuZXNjYXBlIiwiZmFsbGJhY2siLCJpZENvdW50ZXIiLCJ1bmlxdWVJZCIsInByZWZpeCIsImlkIiwidGVtcGxhdGVTZXR0aW5ncyIsImV2YWx1YXRlIiwiaW50ZXJwb2xhdGUiLCJub01hdGNoIiwiZXNjYXBlcyIsImVzY2FwZUNoYXIiLCJ0ZW1wbGF0ZSIsInRleHQiLCJzZXR0aW5ncyIsIm9sZFNldHRpbmdzIiwib2Zmc2V0IiwidmFyaWFibGUiLCJyZW5kZXIiLCJlIiwiZGF0YSIsImFyZ3VtZW50IiwiY2hhaW4iLCJpbnN0YW5jZSIsIl9jaGFpbiIsIm1peGluIiwidmFsdWVPZiIsInRvSlNPTiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVDLGFBQVk7O0FBRVo7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJQSxhQUFhQyxNQUFNQyxTQUF2QjtBQUFBLEtBQWtDQyxXQUFXQyxPQUFPRixTQUFwRDtBQUFBLEtBQStERyxZQUFZQyxTQUFTSixTQUFwRjs7QUFFQTtBQUNBLEtBQ0NLLE9BQU9QLFdBQVdPLElBRG5CO0FBQUEsS0FFQ0MsUUFBUVIsV0FBV1EsS0FGcEI7QUFBQSxLQUdDQyxXQUFXTixTQUFTTSxRQUhyQjtBQUFBLEtBSUNDLGlCQUFpQlAsU0FBU08sY0FKM0I7O0FBTUE7QUFDQTtBQUNBLEtBQ0NDLGdCQUFnQlYsTUFBTVcsT0FEdkI7QUFBQSxLQUVDQyxhQUFhVCxPQUFPVSxJQUZyQjtBQUFBLEtBR0NDLGFBQWFWLFVBQVVXLElBSHhCO0FBQUEsS0FJQ0MsZUFBZWIsT0FBT2MsTUFKdkI7O0FBTUE7QUFDQSxLQUFJQyxPQUFPLFNBQVBBLElBQU8sR0FBWSxDQUFHLENBQTFCOztBQUVBO0FBQ0EsS0FBSUMsSUFBSSxTQUFKQSxDQUFJLENBQVVDLEdBQVYsRUFBZTtBQUN0QixNQUFJQSxlQUFlRCxDQUFuQixFQUFzQixPQUFPQyxHQUFQO0FBQ3RCLE1BQUksRUFBRSxnQkFBZ0JELENBQWxCLENBQUosRUFBMEIsT0FBTyxJQUFJQSxDQUFKLENBQU1DLEdBQU4sQ0FBUDtBQUMxQixPQUFLQyxRQUFMLEdBQWdCRCxHQUFoQjtBQUNBLEVBSkQ7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBRSxRQUFPQyxPQUFQLEdBQWlCSixDQUFqQjtBQUNBO0FBQ0FBLEdBQUVLLE9BQUYsR0FBWSxPQUFaOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUlDLGFBQWEsU0FBYkEsVUFBYSxDQUFVQyxJQUFWLEVBQWdCQyxPQUFoQixFQUF5QkMsUUFBekIsRUFBbUM7QUFDbkQsTUFBSUQsWUFBWSxLQUFLLENBQXJCLEVBQXdCLE9BQU9ELElBQVA7QUFDeEIsVUFBUUUsWUFBWSxJQUFaLEdBQW1CLENBQW5CLEdBQXVCQSxRQUEvQjtBQUNDLFFBQUssQ0FBTDtBQUFRLFdBQU8sVUFBVUMsS0FBVixFQUFpQjtBQUMvQixZQUFPSCxLQUFLSSxJQUFMLENBQVVILE9BQVYsRUFBbUJFLEtBQW5CLENBQVA7QUFDQSxLQUZPO0FBR1IsUUFBSyxDQUFMO0FBQVEsV0FBTyxVQUFVQSxLQUFWLEVBQWlCRSxLQUFqQixFQUF3QjtBQUN0QyxZQUFPTCxLQUFLSSxJQUFMLENBQVVILE9BQVYsRUFBbUJFLEtBQW5CLEVBQTBCRSxLQUExQixDQUFQO0FBQ0EsS0FGTztBQUdSLFFBQUssQ0FBTDtBQUFRLFdBQU8sVUFBVUYsS0FBVixFQUFpQkcsS0FBakIsRUFBd0JDLFVBQXhCLEVBQW9DO0FBQ2xELFlBQU9QLEtBQUtJLElBQUwsQ0FBVUgsT0FBVixFQUFtQkUsS0FBbkIsRUFBMEJHLEtBQTFCLEVBQWlDQyxVQUFqQyxDQUFQO0FBQ0EsS0FGTztBQUdSLFFBQUssQ0FBTDtBQUFRLFdBQU8sVUFBVUMsV0FBVixFQUF1QkwsS0FBdkIsRUFBOEJHLEtBQTlCLEVBQXFDQyxVQUFyQyxFQUFpRDtBQUMvRCxZQUFPUCxLQUFLSSxJQUFMLENBQVVILE9BQVYsRUFBbUJPLFdBQW5CLEVBQWdDTCxLQUFoQyxFQUF1Q0csS0FBdkMsRUFBOENDLFVBQTlDLENBQVA7QUFDQSxLQUZPO0FBVlQ7QUFjQSxTQUFPLFlBQVk7QUFDbEIsVUFBT1AsS0FBS1MsS0FBTCxDQUFXUixPQUFYLEVBQW9CUyxTQUFwQixDQUFQO0FBQ0EsR0FGRDtBQUdBLEVBbkJEOztBQXFCQTtBQUNBO0FBQ0E7QUFDQSxLQUFJQyxLQUFLLFNBQUxBLEVBQUssQ0FBVVIsS0FBVixFQUFpQkYsT0FBakIsRUFBMEJDLFFBQTFCLEVBQW9DO0FBQzVDLE1BQUlDLFNBQVMsSUFBYixFQUFtQixPQUFPVixFQUFFbUIsUUFBVDtBQUNuQixNQUFJbkIsRUFBRW9CLFVBQUYsQ0FBYVYsS0FBYixDQUFKLEVBQXlCLE9BQU9KLFdBQVdJLEtBQVgsRUFBa0JGLE9BQWxCLEVBQTJCQyxRQUEzQixDQUFQO0FBQ3pCLE1BQUlULEVBQUVxQixRQUFGLENBQVdYLEtBQVgsQ0FBSixFQUF1QixPQUFPVixFQUFFc0IsT0FBRixDQUFVWixLQUFWLENBQVA7QUFDdkIsU0FBT1YsRUFBRXVCLFFBQUYsQ0FBV2IsS0FBWCxDQUFQO0FBQ0EsRUFMRDtBQU1BVixHQUFFd0IsUUFBRixHQUFhLFVBQVVkLEtBQVYsRUFBaUJGLE9BQWpCLEVBQTBCO0FBQ3RDLFNBQU9VLEdBQUdSLEtBQUgsRUFBVUYsT0FBVixFQUFtQmlCLFFBQW5CLENBQVA7QUFDQSxFQUZEOztBQUlBO0FBQ0EsS0FBSUMsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFVQyxRQUFWLEVBQW9CQyxhQUFwQixFQUFtQztBQUN2RCxTQUFPLFVBQVUzQixHQUFWLEVBQWU7QUFDckIsT0FBSTRCLFNBQVNaLFVBQVVZLE1BQXZCO0FBQ0EsT0FBSUEsU0FBUyxDQUFULElBQWM1QixPQUFPLElBQXpCLEVBQStCLE9BQU9BLEdBQVA7QUFDL0IsUUFBSyxJQUFJWSxRQUFRLENBQWpCLEVBQW9CQSxRQUFRZ0IsTUFBNUIsRUFBb0NoQixPQUFwQyxFQUE2QztBQUM1QyxRQUFJaUIsU0FBU2IsVUFBVUosS0FBVixDQUFiO0FBQUEsUUFDQ25CLE9BQU9pQyxTQUFTRyxNQUFULENBRFI7QUFBQSxRQUVDQyxJQUFJckMsS0FBS21DLE1BRlY7QUFHQSxTQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSUQsQ0FBcEIsRUFBdUJDLEdBQXZCLEVBQTRCO0FBQzNCLFNBQUlDLE1BQU12QyxLQUFLc0MsQ0FBTCxDQUFWO0FBQ0EsU0FBSSxDQUFDSixhQUFELElBQWtCM0IsSUFBSWdDLEdBQUosTUFBYSxLQUFLLENBQXhDLEVBQTJDaEMsSUFBSWdDLEdBQUosSUFBV0gsT0FBT0csR0FBUCxDQUFYO0FBQzNDO0FBQ0Q7QUFDRCxVQUFPaEMsR0FBUDtBQUNBLEdBYkQ7QUFjQSxFQWZEOztBQWlCQTtBQUNBLEtBQUlpQyxhQUFhLFNBQWJBLFVBQWEsQ0FBVXBELFNBQVYsRUFBcUI7QUFDckMsTUFBSSxDQUFDa0IsRUFBRXFCLFFBQUYsQ0FBV3ZDLFNBQVgsQ0FBTCxFQUE0QixPQUFPLEVBQVA7QUFDNUIsTUFBSWUsWUFBSixFQUFrQixPQUFPQSxhQUFhZixTQUFiLENBQVA7QUFDbEJpQixPQUFLakIsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxNQUFJcUQsU0FBUyxJQUFJcEMsSUFBSixFQUFiO0FBQ0FBLE9BQUtqQixTQUFMLEdBQWlCLElBQWpCO0FBQ0EsU0FBT3FELE1BQVA7QUFDQSxFQVBEOztBQVNBO0FBQ0E7QUFDQTtBQUNBLEtBQUlDLGtCQUFrQkMsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBWSxFQUFaLElBQWtCLENBQXhDO0FBQ0EsS0FBSUMsY0FBYyxTQUFkQSxXQUFjLENBQVV6QixVQUFWLEVBQXNCO0FBQ3ZDLE1BQUllLFNBQVNmLGNBQWMsSUFBZCxJQUFzQkEsV0FBV2UsTUFBOUM7QUFDQSxTQUFPLE9BQU9BLE1BQVAsSUFBaUIsUUFBakIsSUFBNkJBLFVBQVUsQ0FBdkMsSUFBNENBLFVBQVVPLGVBQTdEO0FBQ0EsRUFIRDs7QUFLQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBcEMsR0FBRXdDLElBQUYsR0FBU3hDLEVBQUV5QyxPQUFGLEdBQVksVUFBVXhDLEdBQVYsRUFBZXVCLFFBQWYsRUFBeUJoQixPQUF6QixFQUFrQztBQUN0RGdCLGFBQVdsQixXQUFXa0IsUUFBWCxFQUFxQmhCLE9BQXJCLENBQVg7QUFDQSxNQUFJd0IsQ0FBSixFQUFPSCxNQUFQO0FBQ0EsTUFBSVUsWUFBWXRDLEdBQVosQ0FBSixFQUFzQjtBQUNyQixRQUFLK0IsSUFBSSxDQUFKLEVBQU9ILFNBQVM1QixJQUFJNEIsTUFBekIsRUFBaUNHLElBQUlILE1BQXJDLEVBQTZDRyxHQUE3QyxFQUFrRDtBQUNqRFIsYUFBU3ZCLElBQUkrQixDQUFKLENBQVQsRUFBaUJBLENBQWpCLEVBQW9CL0IsR0FBcEI7QUFDQTtBQUNELEdBSkQsTUFJTztBQUNOLE9BQUlQLE9BQU9NLEVBQUVOLElBQUYsQ0FBT08sR0FBUCxDQUFYO0FBQ0EsUUFBSytCLElBQUksQ0FBSixFQUFPSCxTQUFTbkMsS0FBS21DLE1BQTFCLEVBQWtDRyxJQUFJSCxNQUF0QyxFQUE4Q0csR0FBOUMsRUFBbUQ7QUFDbERSLGFBQVN2QixJQUFJUCxLQUFLc0MsQ0FBTCxDQUFKLENBQVQsRUFBdUJ0QyxLQUFLc0MsQ0FBTCxDQUF2QixFQUFnQy9CLEdBQWhDO0FBQ0E7QUFDRDtBQUNELFNBQU9BLEdBQVA7QUFDQSxFQWREOztBQWdCQTtBQUNBRCxHQUFFMEMsR0FBRixHQUFRMUMsRUFBRTJDLE9BQUYsR0FBWSxVQUFVMUMsR0FBVixFQUFldUIsUUFBZixFQUF5QmhCLE9BQXpCLEVBQWtDO0FBQ3JEZ0IsYUFBV04sR0FBR00sUUFBSCxFQUFhaEIsT0FBYixDQUFYO0FBQ0EsTUFBSWQsT0FBTyxDQUFDNkMsWUFBWXRDLEdBQVosQ0FBRCxJQUFxQkQsRUFBRU4sSUFBRixDQUFPTyxHQUFQLENBQWhDO0FBQUEsTUFDQzRCLFNBQVMsQ0FBQ25DLFFBQVFPLEdBQVQsRUFBYzRCLE1BRHhCO0FBQUEsTUFFQ2UsVUFBVS9ELE1BQU1nRCxNQUFOLENBRlg7QUFHQSxPQUFLLElBQUloQixRQUFRLENBQWpCLEVBQW9CQSxRQUFRZ0IsTUFBNUIsRUFBb0NoQixPQUFwQyxFQUE2QztBQUM1QyxPQUFJZ0MsYUFBYW5ELE9BQU9BLEtBQUttQixLQUFMLENBQVAsR0FBcUJBLEtBQXRDO0FBQ0ErQixXQUFRL0IsS0FBUixJQUFpQlcsU0FBU3ZCLElBQUk0QyxVQUFKLENBQVQsRUFBMEJBLFVBQTFCLEVBQXNDNUMsR0FBdEMsQ0FBakI7QUFDQTtBQUNELFNBQU8yQyxPQUFQO0FBQ0EsRUFWRDs7QUFZQTtBQUNBLFVBQVNFLFlBQVQsQ0FBc0JDLEdBQXRCLEVBQTJCO0FBQzFCO0FBQ0E7QUFDQSxXQUFTQyxRQUFULENBQWtCL0MsR0FBbEIsRUFBdUJ1QixRQUF2QixFQUFpQ3lCLElBQWpDLEVBQXVDdkQsSUFBdkMsRUFBNkNtQixLQUE3QyxFQUFvRGdCLE1BQXBELEVBQTREO0FBQzNELFVBQU9oQixTQUFTLENBQVQsSUFBY0EsUUFBUWdCLE1BQTdCLEVBQXFDaEIsU0FBU2tDLEdBQTlDLEVBQW1EO0FBQ2xELFFBQUlGLGFBQWFuRCxPQUFPQSxLQUFLbUIsS0FBTCxDQUFQLEdBQXFCQSxLQUF0QztBQUNBb0MsV0FBT3pCLFNBQVN5QixJQUFULEVBQWVoRCxJQUFJNEMsVUFBSixDQUFmLEVBQWdDQSxVQUFoQyxFQUE0QzVDLEdBQTVDLENBQVA7QUFDQTtBQUNELFVBQU9nRCxJQUFQO0FBQ0E7O0FBRUQsU0FBTyxVQUFVaEQsR0FBVixFQUFldUIsUUFBZixFQUF5QnlCLElBQXpCLEVBQStCekMsT0FBL0IsRUFBd0M7QUFDOUNnQixjQUFXbEIsV0FBV2tCLFFBQVgsRUFBcUJoQixPQUFyQixFQUE4QixDQUE5QixDQUFYO0FBQ0EsT0FBSWQsT0FBTyxDQUFDNkMsWUFBWXRDLEdBQVosQ0FBRCxJQUFxQkQsRUFBRU4sSUFBRixDQUFPTyxHQUFQLENBQWhDO0FBQUEsT0FDQzRCLFNBQVMsQ0FBQ25DLFFBQVFPLEdBQVQsRUFBYzRCLE1BRHhCO0FBQUEsT0FFQ2hCLFFBQVFrQyxNQUFNLENBQU4sR0FBVSxDQUFWLEdBQWNsQixTQUFTLENBRmhDO0FBR0E7QUFDQSxPQUFJWixVQUFVWSxNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3pCb0IsV0FBT2hELElBQUlQLE9BQU9BLEtBQUttQixLQUFMLENBQVAsR0FBcUJBLEtBQXpCLENBQVA7QUFDQUEsYUFBU2tDLEdBQVQ7QUFDQTtBQUNELFVBQU9DLFNBQVMvQyxHQUFULEVBQWN1QixRQUFkLEVBQXdCeUIsSUFBeEIsRUFBOEJ2RCxJQUE5QixFQUFvQ21CLEtBQXBDLEVBQTJDZ0IsTUFBM0MsQ0FBUDtBQUNBLEdBWEQ7QUFZQTs7QUFFRDtBQUNBO0FBQ0E3QixHQUFFa0QsTUFBRixHQUFXbEQsRUFBRW1ELEtBQUYsR0FBVW5ELEVBQUVvRCxNQUFGLEdBQVdOLGFBQWEsQ0FBYixDQUFoQzs7QUFFQTtBQUNBOUMsR0FBRXFELFdBQUYsR0FBZ0JyRCxFQUFFc0QsS0FBRixHQUFVUixhQUFhLENBQUMsQ0FBZCxDQUExQjs7QUFFQTtBQUNBOUMsR0FBRXVELElBQUYsR0FBU3ZELEVBQUV3RCxNQUFGLEdBQVcsVUFBVXZELEdBQVYsRUFBZXdELFNBQWYsRUFBMEJqRCxPQUExQixFQUFtQztBQUN0RCxNQUFJeUIsR0FBSjtBQUNBLE1BQUlNLFlBQVl0QyxHQUFaLENBQUosRUFBc0I7QUFDckJnQyxTQUFNakMsRUFBRTBELFNBQUYsQ0FBWXpELEdBQVosRUFBaUJ3RCxTQUFqQixFQUE0QmpELE9BQTVCLENBQU47QUFDQSxHQUZELE1BRU87QUFDTnlCLFNBQU1qQyxFQUFFMkQsT0FBRixDQUFVMUQsR0FBVixFQUFld0QsU0FBZixFQUEwQmpELE9BQTFCLENBQU47QUFDQTtBQUNELE1BQUl5QixRQUFRLEtBQUssQ0FBYixJQUFrQkEsUUFBUSxDQUFDLENBQS9CLEVBQWtDLE9BQU9oQyxJQUFJZ0MsR0FBSixDQUFQO0FBQ2xDLEVBUkQ7O0FBVUE7QUFDQTtBQUNBakMsR0FBRTRELE1BQUYsR0FBVzVELEVBQUU2RCxNQUFGLEdBQVcsVUFBVTVELEdBQVYsRUFBZXdELFNBQWYsRUFBMEJqRCxPQUExQixFQUFtQztBQUN4RCxNQUFJb0MsVUFBVSxFQUFkO0FBQ0FhLGNBQVl2QyxHQUFHdUMsU0FBSCxFQUFjakQsT0FBZCxDQUFaO0FBQ0FSLElBQUV3QyxJQUFGLENBQU92QyxHQUFQLEVBQVksVUFBVVMsS0FBVixFQUFpQkcsS0FBakIsRUFBd0JpRCxJQUF4QixFQUE4QjtBQUN6QyxPQUFJTCxVQUFVL0MsS0FBVixFQUFpQkcsS0FBakIsRUFBd0JpRCxJQUF4QixDQUFKLEVBQW1DbEIsUUFBUXpELElBQVIsQ0FBYXVCLEtBQWI7QUFDbkMsR0FGRDtBQUdBLFNBQU9rQyxPQUFQO0FBQ0EsRUFQRDs7QUFTQTtBQUNBNUMsR0FBRStELE1BQUYsR0FBVyxVQUFVOUQsR0FBVixFQUFld0QsU0FBZixFQUEwQmpELE9BQTFCLEVBQW1DO0FBQzdDLFNBQU9SLEVBQUU0RCxNQUFGLENBQVMzRCxHQUFULEVBQWNELEVBQUVnRSxNQUFGLENBQVM5QyxHQUFHdUMsU0FBSCxDQUFULENBQWQsRUFBdUNqRCxPQUF2QyxDQUFQO0FBQ0EsRUFGRDs7QUFJQTtBQUNBO0FBQ0FSLEdBQUVpRSxLQUFGLEdBQVVqRSxFQUFFa0UsR0FBRixHQUFRLFVBQVVqRSxHQUFWLEVBQWV3RCxTQUFmLEVBQTBCakQsT0FBMUIsRUFBbUM7QUFDcERpRCxjQUFZdkMsR0FBR3VDLFNBQUgsRUFBY2pELE9BQWQsQ0FBWjtBQUNBLE1BQUlkLE9BQU8sQ0FBQzZDLFlBQVl0QyxHQUFaLENBQUQsSUFBcUJELEVBQUVOLElBQUYsQ0FBT08sR0FBUCxDQUFoQztBQUFBLE1BQ0M0QixTQUFTLENBQUNuQyxRQUFRTyxHQUFULEVBQWM0QixNQUR4QjtBQUVBLE9BQUssSUFBSWhCLFFBQVEsQ0FBakIsRUFBb0JBLFFBQVFnQixNQUE1QixFQUFvQ2hCLE9BQXBDLEVBQTZDO0FBQzVDLE9BQUlnQyxhQUFhbkQsT0FBT0EsS0FBS21CLEtBQUwsQ0FBUCxHQUFxQkEsS0FBdEM7QUFDQSxPQUFJLENBQUM0QyxVQUFVeEQsSUFBSTRDLFVBQUosQ0FBVixFQUEyQkEsVUFBM0IsRUFBdUM1QyxHQUF2QyxDQUFMLEVBQWtELE9BQU8sS0FBUDtBQUNsRDtBQUNELFNBQU8sSUFBUDtBQUNBLEVBVEQ7O0FBV0E7QUFDQTtBQUNBRCxHQUFFbUUsSUFBRixHQUFTbkUsRUFBRW9FLEdBQUYsR0FBUSxVQUFVbkUsR0FBVixFQUFld0QsU0FBZixFQUEwQmpELE9BQTFCLEVBQW1DO0FBQ25EaUQsY0FBWXZDLEdBQUd1QyxTQUFILEVBQWNqRCxPQUFkLENBQVo7QUFDQSxNQUFJZCxPQUFPLENBQUM2QyxZQUFZdEMsR0FBWixDQUFELElBQXFCRCxFQUFFTixJQUFGLENBQU9PLEdBQVAsQ0FBaEM7QUFBQSxNQUNDNEIsU0FBUyxDQUFDbkMsUUFBUU8sR0FBVCxFQUFjNEIsTUFEeEI7QUFFQSxPQUFLLElBQUloQixRQUFRLENBQWpCLEVBQW9CQSxRQUFRZ0IsTUFBNUIsRUFBb0NoQixPQUFwQyxFQUE2QztBQUM1QyxPQUFJZ0MsYUFBYW5ELE9BQU9BLEtBQUttQixLQUFMLENBQVAsR0FBcUJBLEtBQXRDO0FBQ0EsT0FBSTRDLFVBQVV4RCxJQUFJNEMsVUFBSixDQUFWLEVBQTJCQSxVQUEzQixFQUF1QzVDLEdBQXZDLENBQUosRUFBaUQsT0FBTyxJQUFQO0FBQ2pEO0FBQ0QsU0FBTyxLQUFQO0FBQ0EsRUFURDs7QUFXQTtBQUNBO0FBQ0FELEdBQUVxRSxRQUFGLEdBQWFyRSxFQUFFc0UsUUFBRixHQUFhdEUsRUFBRXVFLE9BQUYsR0FBWSxVQUFVdEUsR0FBVixFQUFldUUsTUFBZixFQUF1QkMsU0FBdkIsRUFBa0M7QUFDdkUsTUFBSSxDQUFDbEMsWUFBWXRDLEdBQVosQ0FBTCxFQUF1QkEsTUFBTUQsRUFBRTBFLE1BQUYsQ0FBU3pFLEdBQVQsQ0FBTjtBQUN2QixTQUFPRCxFQUFFMkUsT0FBRixDQUFVMUUsR0FBVixFQUFldUUsTUFBZixFQUF1QixPQUFPQyxTQUFQLElBQW9CLFFBQXBCLElBQWdDQSxTQUF2RCxLQUFxRSxDQUE1RTtBQUNBLEVBSEQ7O0FBS0E7QUFDQXpFLEdBQUU0RSxNQUFGLEdBQVcsVUFBVTNFLEdBQVYsRUFBZTRFLE1BQWYsRUFBdUI7QUFDakMsTUFBSUMsT0FBTzFGLE1BQU11QixJQUFOLENBQVdNLFNBQVgsRUFBc0IsQ0FBdEIsQ0FBWDtBQUNBLE1BQUk4RCxTQUFTL0UsRUFBRW9CLFVBQUYsQ0FBYXlELE1BQWIsQ0FBYjtBQUNBLFNBQU83RSxFQUFFMEMsR0FBRixDQUFNekMsR0FBTixFQUFXLFVBQVVTLEtBQVYsRUFBaUI7QUFDbEMsT0FBSUgsT0FBT3dFLFNBQVNGLE1BQVQsR0FBa0JuRSxNQUFNbUUsTUFBTixDQUE3QjtBQUNBLFVBQU90RSxRQUFRLElBQVIsR0FBZUEsSUFBZixHQUFzQkEsS0FBS1MsS0FBTCxDQUFXTixLQUFYLEVBQWtCb0UsSUFBbEIsQ0FBN0I7QUFDQSxHQUhNLENBQVA7QUFJQSxFQVBEOztBQVNBO0FBQ0E5RSxHQUFFZ0YsS0FBRixHQUFVLFVBQVUvRSxHQUFWLEVBQWVnQyxHQUFmLEVBQW9CO0FBQzdCLFNBQU9qQyxFQUFFMEMsR0FBRixDQUFNekMsR0FBTixFQUFXRCxFQUFFdUIsUUFBRixDQUFXVSxHQUFYLENBQVgsQ0FBUDtBQUNBLEVBRkQ7O0FBSUE7QUFDQTtBQUNBakMsR0FBRWlGLEtBQUYsR0FBVSxVQUFVaEYsR0FBVixFQUFlaUYsS0FBZixFQUFzQjtBQUMvQixTQUFPbEYsRUFBRTRELE1BQUYsQ0FBUzNELEdBQVQsRUFBY0QsRUFBRXNCLE9BQUYsQ0FBVTRELEtBQVYsQ0FBZCxDQUFQO0FBQ0EsRUFGRDs7QUFJQTtBQUNBO0FBQ0FsRixHQUFFbUYsU0FBRixHQUFjLFVBQVVsRixHQUFWLEVBQWVpRixLQUFmLEVBQXNCO0FBQ25DLFNBQU9sRixFQUFFdUQsSUFBRixDQUFPdEQsR0FBUCxFQUFZRCxFQUFFc0IsT0FBRixDQUFVNEQsS0FBVixDQUFaLENBQVA7QUFDQSxFQUZEOztBQUlBO0FBQ0FsRixHQUFFb0YsR0FBRixHQUFRLFVBQVVuRixHQUFWLEVBQWV1QixRQUFmLEVBQXlCaEIsT0FBekIsRUFBa0M7QUFDekMsTUFBSTJCLFNBQVMsQ0FBQ1YsUUFBZDtBQUFBLE1BQXdCNEQsZUFBZSxDQUFDNUQsUUFBeEM7QUFBQSxNQUNDZixLQUREO0FBQUEsTUFDUTRFLFFBRFI7QUFFQSxNQUFJOUQsWUFBWSxJQUFaLElBQW9CdkIsT0FBTyxJQUEvQixFQUFxQztBQUNwQ0EsU0FBTXNDLFlBQVl0QyxHQUFaLElBQW1CQSxHQUFuQixHQUF5QkQsRUFBRTBFLE1BQUYsQ0FBU3pFLEdBQVQsQ0FBL0I7QUFDQSxRQUFLLElBQUkrQixJQUFJLENBQVIsRUFBV0gsU0FBUzVCLElBQUk0QixNQUE3QixFQUFxQ0csSUFBSUgsTUFBekMsRUFBaURHLEdBQWpELEVBQXNEO0FBQ3JEdEIsWUFBUVQsSUFBSStCLENBQUosQ0FBUjtBQUNBLFFBQUl0QixRQUFReUIsTUFBWixFQUFvQjtBQUNuQkEsY0FBU3pCLEtBQVQ7QUFDQTtBQUNEO0FBQ0QsR0FSRCxNQVFPO0FBQ05jLGNBQVdOLEdBQUdNLFFBQUgsRUFBYWhCLE9BQWIsQ0FBWDtBQUNBUixLQUFFd0MsSUFBRixDQUFPdkMsR0FBUCxFQUFZLFVBQVVTLEtBQVYsRUFBaUJHLEtBQWpCLEVBQXdCaUQsSUFBeEIsRUFBOEI7QUFDekN3QixlQUFXOUQsU0FBU2QsS0FBVCxFQUFnQkcsS0FBaEIsRUFBdUJpRCxJQUF2QixDQUFYO0FBQ0EsUUFBSXdCLFdBQVdELFlBQVgsSUFBMkJDLGFBQWEsQ0FBQzdELFFBQWQsSUFBMEJVLFdBQVcsQ0FBQ1YsUUFBckUsRUFBK0U7QUFDOUVVLGNBQVN6QixLQUFUO0FBQ0EyRSxvQkFBZUMsUUFBZjtBQUNBO0FBQ0QsSUFORDtBQU9BO0FBQ0QsU0FBT25ELE1BQVA7QUFDQSxFQXRCRDs7QUF3QkE7QUFDQW5DLEdBQUV1RixHQUFGLEdBQVEsVUFBVXRGLEdBQVYsRUFBZXVCLFFBQWYsRUFBeUJoQixPQUF6QixFQUFrQztBQUN6QyxNQUFJMkIsU0FBU1YsUUFBYjtBQUFBLE1BQXVCNEQsZUFBZTVELFFBQXRDO0FBQUEsTUFDQ2YsS0FERDtBQUFBLE1BQ1E0RSxRQURSO0FBRUEsTUFBSTlELFlBQVksSUFBWixJQUFvQnZCLE9BQU8sSUFBL0IsRUFBcUM7QUFDcENBLFNBQU1zQyxZQUFZdEMsR0FBWixJQUFtQkEsR0FBbkIsR0FBeUJELEVBQUUwRSxNQUFGLENBQVN6RSxHQUFULENBQS9CO0FBQ0EsUUFBSyxJQUFJK0IsSUFBSSxDQUFSLEVBQVdILFNBQVM1QixJQUFJNEIsTUFBN0IsRUFBcUNHLElBQUlILE1BQXpDLEVBQWlERyxHQUFqRCxFQUFzRDtBQUNyRHRCLFlBQVFULElBQUkrQixDQUFKLENBQVI7QUFDQSxRQUFJdEIsUUFBUXlCLE1BQVosRUFBb0I7QUFDbkJBLGNBQVN6QixLQUFUO0FBQ0E7QUFDRDtBQUNELEdBUkQsTUFRTztBQUNOYyxjQUFXTixHQUFHTSxRQUFILEVBQWFoQixPQUFiLENBQVg7QUFDQVIsS0FBRXdDLElBQUYsQ0FBT3ZDLEdBQVAsRUFBWSxVQUFVUyxLQUFWLEVBQWlCRyxLQUFqQixFQUF3QmlELElBQXhCLEVBQThCO0FBQ3pDd0IsZUFBVzlELFNBQVNkLEtBQVQsRUFBZ0JHLEtBQWhCLEVBQXVCaUQsSUFBdkIsQ0FBWDtBQUNBLFFBQUl3QixXQUFXRCxZQUFYLElBQTJCQyxhQUFhN0QsUUFBYixJQUF5QlUsV0FBV1YsUUFBbkUsRUFBNkU7QUFDNUVVLGNBQVN6QixLQUFUO0FBQ0EyRSxvQkFBZUMsUUFBZjtBQUNBO0FBQ0QsSUFORDtBQU9BO0FBQ0QsU0FBT25ELE1BQVA7QUFDQSxFQXRCRDs7QUF3QkE7QUFDQTtBQUNBbkMsR0FBRXdGLE9BQUYsR0FBWSxVQUFVdkYsR0FBVixFQUFlO0FBQzFCLE1BQUl3RixNQUFNbEQsWUFBWXRDLEdBQVosSUFBbUJBLEdBQW5CLEdBQXlCRCxFQUFFMEUsTUFBRixDQUFTekUsR0FBVCxDQUFuQztBQUNBLE1BQUk0QixTQUFTNEQsSUFBSTVELE1BQWpCO0FBQ0EsTUFBSTZELFdBQVc3RyxNQUFNZ0QsTUFBTixDQUFmO0FBQ0EsT0FBSyxJQUFJaEIsUUFBUSxDQUFaLEVBQWU4RSxJQUFwQixFQUEwQjlFLFFBQVFnQixNQUFsQyxFQUEwQ2hCLE9BQTFDLEVBQW1EO0FBQ2xEOEUsVUFBTzNGLEVBQUU0RixNQUFGLENBQVMsQ0FBVCxFQUFZL0UsS0FBWixDQUFQO0FBQ0EsT0FBSThFLFNBQVM5RSxLQUFiLEVBQW9CNkUsU0FBUzdFLEtBQVQsSUFBa0I2RSxTQUFTQyxJQUFULENBQWxCO0FBQ3BCRCxZQUFTQyxJQUFULElBQWlCRixJQUFJNUUsS0FBSixDQUFqQjtBQUNBO0FBQ0QsU0FBTzZFLFFBQVA7QUFDQSxFQVZEOztBQVlBO0FBQ0E7QUFDQTtBQUNBMUYsR0FBRTZGLE1BQUYsR0FBVyxVQUFVNUYsR0FBVixFQUFlNkYsQ0FBZixFQUFrQkMsS0FBbEIsRUFBeUI7QUFDbkMsTUFBSUQsS0FBSyxJQUFMLElBQWFDLEtBQWpCLEVBQXdCO0FBQ3ZCLE9BQUksQ0FBQ3hELFlBQVl0QyxHQUFaLENBQUwsRUFBdUJBLE1BQU1ELEVBQUUwRSxNQUFGLENBQVN6RSxHQUFULENBQU47QUFDdkIsVUFBT0EsSUFBSUQsRUFBRTRGLE1BQUYsQ0FBUzNGLElBQUk0QixNQUFKLEdBQWEsQ0FBdEIsQ0FBSixDQUFQO0FBQ0E7QUFDRCxTQUFPN0IsRUFBRXdGLE9BQUYsQ0FBVXZGLEdBQVYsRUFBZWIsS0FBZixDQUFxQixDQUFyQixFQUF3QmlELEtBQUsrQyxHQUFMLENBQVMsQ0FBVCxFQUFZVSxDQUFaLENBQXhCLENBQVA7QUFDQSxFQU5EOztBQVFBO0FBQ0E5RixHQUFFZ0csTUFBRixHQUFXLFVBQVUvRixHQUFWLEVBQWV1QixRQUFmLEVBQXlCaEIsT0FBekIsRUFBa0M7QUFDNUNnQixhQUFXTixHQUFHTSxRQUFILEVBQWFoQixPQUFiLENBQVg7QUFDQSxTQUFPUixFQUFFZ0YsS0FBRixDQUFRaEYsRUFBRTBDLEdBQUYsQ0FBTXpDLEdBQU4sRUFBVyxVQUFVUyxLQUFWLEVBQWlCRyxLQUFqQixFQUF3QmlELElBQXhCLEVBQThCO0FBQ3ZELFVBQU87QUFDTnBELFdBQU9BLEtBREQ7QUFFTkcsV0FBT0EsS0FGRDtBQUdOb0YsY0FBVXpFLFNBQVNkLEtBQVQsRUFBZ0JHLEtBQWhCLEVBQXVCaUQsSUFBdkI7QUFISixJQUFQO0FBS0EsR0FOYyxFQU1ab0MsSUFOWSxDQU1QLFVBQVVDLElBQVYsRUFBZ0JDLEtBQWhCLEVBQXVCO0FBQzlCLE9BQUlDLElBQUlGLEtBQUtGLFFBQWI7QUFDQSxPQUFJSyxJQUFJRixNQUFNSCxRQUFkO0FBQ0EsT0FBSUksTUFBTUMsQ0FBVixFQUFhO0FBQ1osUUFBSUQsSUFBSUMsQ0FBSixJQUFTRCxNQUFNLEtBQUssQ0FBeEIsRUFBMkIsT0FBTyxDQUFQO0FBQzNCLFFBQUlBLElBQUlDLENBQUosSUFBU0EsTUFBTSxLQUFLLENBQXhCLEVBQTJCLE9BQU8sQ0FBQyxDQUFSO0FBQzNCO0FBQ0QsVUFBT0gsS0FBS3RGLEtBQUwsR0FBYXVGLE1BQU12RixLQUExQjtBQUNBLEdBZGMsQ0FBUixFQWNILE9BZEcsQ0FBUDtBQWVBLEVBakJEOztBQW1CQTtBQUNBLEtBQUkwRixRQUFRLFNBQVJBLEtBQVEsQ0FBVUMsUUFBVixFQUFvQjtBQUMvQixTQUFPLFVBQVV2RyxHQUFWLEVBQWV1QixRQUFmLEVBQXlCaEIsT0FBekIsRUFBa0M7QUFDeEMsT0FBSTJCLFNBQVMsRUFBYjtBQUNBWCxjQUFXTixHQUFHTSxRQUFILEVBQWFoQixPQUFiLENBQVg7QUFDQVIsS0FBRXdDLElBQUYsQ0FBT3ZDLEdBQVAsRUFBWSxVQUFVUyxLQUFWLEVBQWlCRyxLQUFqQixFQUF3QjtBQUNuQyxRQUFJb0IsTUFBTVQsU0FBU2QsS0FBVCxFQUFnQkcsS0FBaEIsRUFBdUJaLEdBQXZCLENBQVY7QUFDQXVHLGFBQVNyRSxNQUFULEVBQWlCekIsS0FBakIsRUFBd0J1QixHQUF4QjtBQUNBLElBSEQ7QUFJQSxVQUFPRSxNQUFQO0FBQ0EsR0FSRDtBQVNBLEVBVkQ7O0FBWUE7QUFDQTtBQUNBbkMsR0FBRXlHLE9BQUYsR0FBWUYsTUFBTSxVQUFVcEUsTUFBVixFQUFrQnpCLEtBQWxCLEVBQXlCdUIsR0FBekIsRUFBOEI7QUFDL0MsTUFBSWpDLEVBQUUwRyxHQUFGLENBQU12RSxNQUFOLEVBQWNGLEdBQWQsQ0FBSixFQUF3QkUsT0FBT0YsR0FBUCxFQUFZOUMsSUFBWixDQUFpQnVCLEtBQWpCLEVBQXhCLEtBQXNEeUIsT0FBT0YsR0FBUCxJQUFjLENBQUN2QixLQUFELENBQWQ7QUFDdEQsRUFGVyxDQUFaOztBQUlBO0FBQ0E7QUFDQVYsR0FBRTJHLE9BQUYsR0FBWUosTUFBTSxVQUFVcEUsTUFBVixFQUFrQnpCLEtBQWxCLEVBQXlCdUIsR0FBekIsRUFBOEI7QUFDL0NFLFNBQU9GLEdBQVAsSUFBY3ZCLEtBQWQ7QUFDQSxFQUZXLENBQVo7O0FBSUE7QUFDQTtBQUNBO0FBQ0FWLEdBQUU0RyxPQUFGLEdBQVlMLE1BQU0sVUFBVXBFLE1BQVYsRUFBa0J6QixLQUFsQixFQUF5QnVCLEdBQXpCLEVBQThCO0FBQy9DLE1BQUlqQyxFQUFFMEcsR0FBRixDQUFNdkUsTUFBTixFQUFjRixHQUFkLENBQUosRUFBd0JFLE9BQU9GLEdBQVAsSUFBeEIsS0FBNENFLE9BQU9GLEdBQVAsSUFBYyxDQUFkO0FBQzVDLEVBRlcsQ0FBWjs7QUFJQTtBQUNBakMsR0FBRTZHLE9BQUYsR0FBWSxVQUFVNUcsR0FBVixFQUFlO0FBQzFCLE1BQUksQ0FBQ0EsR0FBTCxFQUFVLE9BQU8sRUFBUDtBQUNWLE1BQUlELEVBQUVSLE9BQUYsQ0FBVVMsR0FBVixDQUFKLEVBQW9CLE9BQU9iLE1BQU11QixJQUFOLENBQVdWLEdBQVgsQ0FBUDtBQUNwQixNQUFJc0MsWUFBWXRDLEdBQVosQ0FBSixFQUFzQixPQUFPRCxFQUFFMEMsR0FBRixDQUFNekMsR0FBTixFQUFXRCxFQUFFbUIsUUFBYixDQUFQO0FBQ3RCLFNBQU9uQixFQUFFMEUsTUFBRixDQUFTekUsR0FBVCxDQUFQO0FBQ0EsRUFMRDs7QUFPQTtBQUNBRCxHQUFFOEcsSUFBRixHQUFTLFVBQVU3RyxHQUFWLEVBQWU7QUFDdkIsTUFBSUEsT0FBTyxJQUFYLEVBQWlCLE9BQU8sQ0FBUDtBQUNqQixTQUFPc0MsWUFBWXRDLEdBQVosSUFBbUJBLElBQUk0QixNQUF2QixHQUFnQzdCLEVBQUVOLElBQUYsQ0FBT08sR0FBUCxFQUFZNEIsTUFBbkQ7QUFDQSxFQUhEOztBQUtBO0FBQ0E7QUFDQTdCLEdBQUUrRyxTQUFGLEdBQWMsVUFBVTlHLEdBQVYsRUFBZXdELFNBQWYsRUFBMEJqRCxPQUExQixFQUFtQztBQUNoRGlELGNBQVl2QyxHQUFHdUMsU0FBSCxFQUFjakQsT0FBZCxDQUFaO0FBQ0EsTUFBSXdHLE9BQU8sRUFBWDtBQUFBLE1BQWVDLE9BQU8sRUFBdEI7QUFDQWpILElBQUV3QyxJQUFGLENBQU92QyxHQUFQLEVBQVksVUFBVVMsS0FBVixFQUFpQnVCLEdBQWpCLEVBQXNCaEMsR0FBdEIsRUFBMkI7QUFDdEMsSUFBQ3dELFVBQVUvQyxLQUFWLEVBQWlCdUIsR0FBakIsRUFBc0JoQyxHQUF0QixJQUE2QitHLElBQTdCLEdBQW9DQyxJQUFyQyxFQUEyQzlILElBQTNDLENBQWdEdUIsS0FBaEQ7QUFDQSxHQUZEO0FBR0EsU0FBTyxDQUFDc0csSUFBRCxFQUFPQyxJQUFQLENBQVA7QUFDQSxFQVBEOztBQVNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0FqSCxHQUFFa0gsS0FBRixHQUFVbEgsRUFBRW1ILElBQUYsR0FBU25ILEVBQUVvSCxJQUFGLEdBQVMsVUFBVUMsS0FBVixFQUFpQnZCLENBQWpCLEVBQW9CQyxLQUFwQixFQUEyQjtBQUN0RCxNQUFJc0IsU0FBUyxJQUFiLEVBQW1CLE9BQU8sS0FBSyxDQUFaO0FBQ25CLE1BQUl2QixLQUFLLElBQUwsSUFBYUMsS0FBakIsRUFBd0IsT0FBT3NCLE1BQU0sQ0FBTixDQUFQO0FBQ3hCLFNBQU9ySCxFQUFFc0gsT0FBRixDQUFVRCxLQUFWLEVBQWlCQSxNQUFNeEYsTUFBTixHQUFlaUUsQ0FBaEMsQ0FBUDtBQUNBLEVBSkQ7O0FBTUE7QUFDQTtBQUNBO0FBQ0E5RixHQUFFc0gsT0FBRixHQUFZLFVBQVVELEtBQVYsRUFBaUJ2QixDQUFqQixFQUFvQkMsS0FBcEIsRUFBMkI7QUFDdEMsU0FBTzNHLE1BQU11QixJQUFOLENBQVcwRyxLQUFYLEVBQWtCLENBQWxCLEVBQXFCaEYsS0FBSytDLEdBQUwsQ0FBUyxDQUFULEVBQVlpQyxNQUFNeEYsTUFBTixJQUFnQmlFLEtBQUssSUFBTCxJQUFhQyxLQUFiLEdBQXFCLENBQXJCLEdBQXlCRCxDQUF6QyxDQUFaLENBQXJCLENBQVA7QUFDQSxFQUZEOztBQUlBO0FBQ0E7QUFDQTlGLEdBQUV1SCxJQUFGLEdBQVMsVUFBVUYsS0FBVixFQUFpQnZCLENBQWpCLEVBQW9CQyxLQUFwQixFQUEyQjtBQUNuQyxNQUFJc0IsU0FBUyxJQUFiLEVBQW1CLE9BQU8sS0FBSyxDQUFaO0FBQ25CLE1BQUl2QixLQUFLLElBQUwsSUFBYUMsS0FBakIsRUFBd0IsT0FBT3NCLE1BQU1BLE1BQU14RixNQUFOLEdBQWUsQ0FBckIsQ0FBUDtBQUN4QixTQUFPN0IsRUFBRXdILElBQUYsQ0FBT0gsS0FBUCxFQUFjaEYsS0FBSytDLEdBQUwsQ0FBUyxDQUFULEVBQVlpQyxNQUFNeEYsTUFBTixHQUFlaUUsQ0FBM0IsQ0FBZCxDQUFQO0FBQ0EsRUFKRDs7QUFNQTtBQUNBO0FBQ0E7QUFDQTlGLEdBQUV3SCxJQUFGLEdBQVN4SCxFQUFFeUgsSUFBRixHQUFTekgsRUFBRTBILElBQUYsR0FBUyxVQUFVTCxLQUFWLEVBQWlCdkIsQ0FBakIsRUFBb0JDLEtBQXBCLEVBQTJCO0FBQ3JELFNBQU8zRyxNQUFNdUIsSUFBTixDQUFXMEcsS0FBWCxFQUFrQnZCLEtBQUssSUFBTCxJQUFhQyxLQUFiLEdBQXFCLENBQXJCLEdBQXlCRCxDQUEzQyxDQUFQO0FBQ0EsRUFGRDs7QUFJQTtBQUNBOUYsR0FBRTJILE9BQUYsR0FBWSxVQUFVTixLQUFWLEVBQWlCO0FBQzVCLFNBQU9ySCxFQUFFNEQsTUFBRixDQUFTeUQsS0FBVCxFQUFnQnJILEVBQUVtQixRQUFsQixDQUFQO0FBQ0EsRUFGRDs7QUFJQTtBQUNBLEtBQUl5RyxVQUFVLFNBQVZBLE9BQVUsQ0FBVUMsS0FBVixFQUFpQkMsT0FBakIsRUFBMEJDLE1BQTFCLEVBQWtDQyxVQUFsQyxFQUE4QztBQUMzRCxNQUFJQyxTQUFTLEVBQWI7QUFBQSxNQUFpQkMsTUFBTSxDQUF2QjtBQUNBLE9BQUssSUFBSWxHLElBQUlnRyxjQUFjLENBQXRCLEVBQXlCbkcsU0FBU2dHLFNBQVNBLE1BQU1oRyxNQUF0RCxFQUE4REcsSUFBSUgsTUFBbEUsRUFBMEVHLEdBQTFFLEVBQStFO0FBQzlFLE9BQUl0QixRQUFRbUgsTUFBTTdGLENBQU4sQ0FBWjtBQUNBLE9BQUlPLFlBQVk3QixLQUFaLE1BQXVCVixFQUFFUixPQUFGLENBQVVrQixLQUFWLEtBQW9CVixFQUFFbUksV0FBRixDQUFjekgsS0FBZCxDQUEzQyxDQUFKLEVBQXNFO0FBQ3JFO0FBQ0EsUUFBSSxDQUFDb0gsT0FBTCxFQUFjcEgsUUFBUWtILFFBQVFsSCxLQUFSLEVBQWVvSCxPQUFmLEVBQXdCQyxNQUF4QixDQUFSO0FBQ2QsUUFBSUssSUFBSSxDQUFSO0FBQUEsUUFBV0MsTUFBTTNILE1BQU1tQixNQUF2QjtBQUNBb0csV0FBT3BHLE1BQVAsSUFBaUJ3RyxHQUFqQjtBQUNBLFdBQU9ELElBQUlDLEdBQVgsRUFBZ0I7QUFDZkosWUFBT0MsS0FBUCxJQUFnQnhILE1BQU0wSCxHQUFOLENBQWhCO0FBQ0E7QUFDRCxJQVJELE1BUU8sSUFBSSxDQUFDTCxNQUFMLEVBQWE7QUFDbkJFLFdBQU9DLEtBQVAsSUFBZ0J4SCxLQUFoQjtBQUNBO0FBQ0Q7QUFDRCxTQUFPdUgsTUFBUDtBQUNBLEVBakJEOztBQW1CQTtBQUNBakksR0FBRTRILE9BQUYsR0FBWSxVQUFVUCxLQUFWLEVBQWlCUyxPQUFqQixFQUEwQjtBQUNyQyxTQUFPRixRQUFRUCxLQUFSLEVBQWVTLE9BQWYsRUFBd0IsS0FBeEIsQ0FBUDtBQUNBLEVBRkQ7O0FBSUE7QUFDQTlILEdBQUVzSSxPQUFGLEdBQVksVUFBVWpCLEtBQVYsRUFBaUI7QUFDNUIsU0FBT3JILEVBQUV1SSxVQUFGLENBQWFsQixLQUFiLEVBQW9CakksTUFBTXVCLElBQU4sQ0FBV00sU0FBWCxFQUFzQixDQUF0QixDQUFwQixDQUFQO0FBQ0EsRUFGRDs7QUFJQTtBQUNBO0FBQ0E7QUFDQWpCLEdBQUV3SSxJQUFGLEdBQVN4SSxFQUFFeUksTUFBRixHQUFXLFVBQVVwQixLQUFWLEVBQWlCcUIsUUFBakIsRUFBMkJsSCxRQUEzQixFQUFxQ2hCLE9BQXJDLEVBQThDO0FBQ2pFLE1BQUk2RyxTQUFTLElBQWIsRUFBbUIsT0FBTyxFQUFQO0FBQ25CLE1BQUksQ0FBQ3JILEVBQUUySSxTQUFGLENBQVlELFFBQVosQ0FBTCxFQUE0QjtBQUMzQmxJLGFBQVVnQixRQUFWO0FBQ0FBLGNBQVdrSCxRQUFYO0FBQ0FBLGNBQVcsS0FBWDtBQUNBO0FBQ0QsTUFBSWxILFlBQVksSUFBaEIsRUFBc0JBLFdBQVdOLEdBQUdNLFFBQUgsRUFBYWhCLE9BQWIsQ0FBWDtBQUN0QixNQUFJMkIsU0FBUyxFQUFiO0FBQ0EsTUFBSXlHLE9BQU8sRUFBWDtBQUNBLE9BQUssSUFBSTVHLElBQUksQ0FBUixFQUFXSCxTQUFTd0YsTUFBTXhGLE1BQS9CLEVBQXVDRyxJQUFJSCxNQUEzQyxFQUFtREcsR0FBbkQsRUFBd0Q7QUFDdkQsT0FBSXRCLFFBQVEyRyxNQUFNckYsQ0FBTixDQUFaO0FBQUEsT0FDQ3NELFdBQVc5RCxXQUFXQSxTQUFTZCxLQUFULEVBQWdCc0IsQ0FBaEIsRUFBbUJxRixLQUFuQixDQUFYLEdBQXVDM0csS0FEbkQ7QUFFQSxPQUFJZ0ksUUFBSixFQUFjO0FBQ2IsUUFBSSxDQUFDMUcsQ0FBRCxJQUFNNEcsU0FBU3RELFFBQW5CLEVBQTZCbkQsT0FBT2hELElBQVAsQ0FBWXVCLEtBQVo7QUFDN0JrSSxXQUFPdEQsUUFBUDtBQUNBLElBSEQsTUFHTyxJQUFJOUQsUUFBSixFQUFjO0FBQ3BCLFFBQUksQ0FBQ3hCLEVBQUVxRSxRQUFGLENBQVd1RSxJQUFYLEVBQWlCdEQsUUFBakIsQ0FBTCxFQUFpQztBQUNoQ3NELFVBQUt6SixJQUFMLENBQVVtRyxRQUFWO0FBQ0FuRCxZQUFPaEQsSUFBUCxDQUFZdUIsS0FBWjtBQUNBO0FBQ0QsSUFMTSxNQUtBLElBQUksQ0FBQ1YsRUFBRXFFLFFBQUYsQ0FBV2xDLE1BQVgsRUFBbUJ6QixLQUFuQixDQUFMLEVBQWdDO0FBQ3RDeUIsV0FBT2hELElBQVAsQ0FBWXVCLEtBQVo7QUFDQTtBQUNEO0FBQ0QsU0FBT3lCLE1BQVA7QUFDQSxFQTFCRDs7QUE0QkE7QUFDQTtBQUNBbkMsR0FBRTZJLEtBQUYsR0FBVSxZQUFZO0FBQ3JCLFNBQU83SSxFQUFFd0ksSUFBRixDQUFPWixRQUFRM0csU0FBUixFQUFtQixJQUFuQixFQUF5QixJQUF6QixDQUFQLENBQVA7QUFDQSxFQUZEOztBQUlBO0FBQ0E7QUFDQWpCLEdBQUU4SSxZQUFGLEdBQWlCLFVBQVV6QixLQUFWLEVBQWlCO0FBQ2pDLE1BQUlBLFNBQVMsSUFBYixFQUFtQixPQUFPLEVBQVA7QUFDbkIsTUFBSWxGLFNBQVMsRUFBYjtBQUNBLE1BQUk0RyxhQUFhOUgsVUFBVVksTUFBM0I7QUFDQSxPQUFLLElBQUlHLElBQUksQ0FBUixFQUFXSCxTQUFTd0YsTUFBTXhGLE1BQS9CLEVBQXVDRyxJQUFJSCxNQUEzQyxFQUFtREcsR0FBbkQsRUFBd0Q7QUFDdkQsT0FBSWdILE9BQU8zQixNQUFNckYsQ0FBTixDQUFYO0FBQ0EsT0FBSWhDLEVBQUVxRSxRQUFGLENBQVdsQyxNQUFYLEVBQW1CNkcsSUFBbkIsQ0FBSixFQUE4QjtBQUM5QixRQUFLLElBQUlaLElBQUksQ0FBYixFQUFnQkEsSUFBSVcsVUFBcEIsRUFBZ0NYLEdBQWhDLEVBQXFDO0FBQ3BDLFFBQUksQ0FBQ3BJLEVBQUVxRSxRQUFGLENBQVdwRCxVQUFVbUgsQ0FBVixDQUFYLEVBQXlCWSxJQUF6QixDQUFMLEVBQXFDO0FBQ3JDO0FBQ0QsT0FBSVosTUFBTVcsVUFBVixFQUFzQjVHLE9BQU9oRCxJQUFQLENBQVk2SixJQUFaO0FBQ3RCO0FBQ0QsU0FBTzdHLE1BQVA7QUFDQSxFQWJEOztBQWVBO0FBQ0E7QUFDQW5DLEdBQUV1SSxVQUFGLEdBQWUsVUFBVWxCLEtBQVYsRUFBaUI7QUFDL0IsTUFBSUcsT0FBT0ksUUFBUTNHLFNBQVIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsQ0FBL0IsQ0FBWDtBQUNBLFNBQU9qQixFQUFFNEQsTUFBRixDQUFTeUQsS0FBVCxFQUFnQixVQUFVM0csS0FBVixFQUFpQjtBQUN2QyxVQUFPLENBQUNWLEVBQUVxRSxRQUFGLENBQVdtRCxJQUFYLEVBQWlCOUcsS0FBakIsQ0FBUjtBQUNBLEdBRk0sQ0FBUDtBQUdBLEVBTEQ7O0FBT0E7QUFDQTtBQUNBVixHQUFFaUosR0FBRixHQUFRLFlBQVk7QUFDbkIsU0FBT2pKLEVBQUVrSixLQUFGLENBQVFqSSxTQUFSLENBQVA7QUFDQSxFQUZEOztBQUlBO0FBQ0E7QUFDQWpCLEdBQUVrSixLQUFGLEdBQVUsVUFBVTdCLEtBQVYsRUFBaUI7QUFDMUIsTUFBSXhGLFNBQVN3RixTQUFTckgsRUFBRW9GLEdBQUYsQ0FBTWlDLEtBQU4sRUFBYSxRQUFiLEVBQXVCeEYsTUFBaEMsSUFBMEMsQ0FBdkQ7QUFDQSxNQUFJTSxTQUFTdEQsTUFBTWdELE1BQU4sQ0FBYjs7QUFFQSxPQUFLLElBQUloQixRQUFRLENBQWpCLEVBQW9CQSxRQUFRZ0IsTUFBNUIsRUFBb0NoQixPQUFwQyxFQUE2QztBQUM1Q3NCLFVBQU90QixLQUFQLElBQWdCYixFQUFFZ0YsS0FBRixDQUFRcUMsS0FBUixFQUFleEcsS0FBZixDQUFoQjtBQUNBO0FBQ0QsU0FBT3NCLE1BQVA7QUFDQSxFQVJEOztBQVVBO0FBQ0E7QUFDQTtBQUNBbkMsR0FBRW1KLE1BQUYsR0FBVyxVQUFVckYsSUFBVixFQUFnQlksTUFBaEIsRUFBd0I7QUFDbEMsTUFBSXZDLFNBQVMsRUFBYjtBQUNBLE9BQUssSUFBSUgsSUFBSSxDQUFSLEVBQVdILFNBQVNpQyxRQUFRQSxLQUFLakMsTUFBdEMsRUFBOENHLElBQUlILE1BQWxELEVBQTBERyxHQUExRCxFQUErRDtBQUM5RCxPQUFJMEMsTUFBSixFQUFZO0FBQ1h2QyxXQUFPMkIsS0FBSzlCLENBQUwsQ0FBUCxJQUFrQjBDLE9BQU8xQyxDQUFQLENBQWxCO0FBQ0EsSUFGRCxNQUVPO0FBQ05HLFdBQU8yQixLQUFLOUIsQ0FBTCxFQUFRLENBQVIsQ0FBUCxJQUFxQjhCLEtBQUs5QixDQUFMLEVBQVEsQ0FBUixDQUFyQjtBQUNBO0FBQ0Q7QUFDRCxTQUFPRyxNQUFQO0FBQ0EsRUFWRDs7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBbkMsR0FBRTJFLE9BQUYsR0FBWSxVQUFVMEMsS0FBVixFQUFpQjJCLElBQWpCLEVBQXVCTixRQUF2QixFQUFpQztBQUM1QyxNQUFJMUcsSUFBSSxDQUFSO0FBQUEsTUFBV0gsU0FBU3dGLFNBQVNBLE1BQU14RixNQUFuQztBQUNBLE1BQUksT0FBTzZHLFFBQVAsSUFBbUIsUUFBdkIsRUFBaUM7QUFDaEMxRyxPQUFJMEcsV0FBVyxDQUFYLEdBQWVyRyxLQUFLK0MsR0FBTCxDQUFTLENBQVQsRUFBWXZELFNBQVM2RyxRQUFyQixDQUFmLEdBQWdEQSxRQUFwRDtBQUNBLEdBRkQsTUFFTyxJQUFJQSxZQUFZN0csTUFBaEIsRUFBd0I7QUFDOUJHLE9BQUloQyxFQUFFb0osV0FBRixDQUFjL0IsS0FBZCxFQUFxQjJCLElBQXJCLENBQUo7QUFDQSxVQUFPM0IsTUFBTXJGLENBQU4sTUFBYWdILElBQWIsR0FBb0JoSCxDQUFwQixHQUF3QixDQUFDLENBQWhDO0FBQ0E7QUFDRCxNQUFJZ0gsU0FBU0EsSUFBYixFQUFtQjtBQUNsQixVQUFPaEosRUFBRTBELFNBQUYsQ0FBWXRFLE1BQU11QixJQUFOLENBQVcwRyxLQUFYLEVBQWtCckYsQ0FBbEIsQ0FBWixFQUFrQ2hDLEVBQUVxSixLQUFwQyxDQUFQO0FBQ0E7QUFDRCxTQUFPckgsSUFBSUgsTUFBWCxFQUFtQkcsR0FBbkI7QUFBd0IsT0FBSXFGLE1BQU1yRixDQUFOLE1BQWFnSCxJQUFqQixFQUF1QixPQUFPaEgsQ0FBUDtBQUEvQyxHQUNBLE9BQU8sQ0FBQyxDQUFSO0FBQ0EsRUFiRDs7QUFlQWhDLEdBQUVzSixXQUFGLEdBQWdCLFVBQVVqQyxLQUFWLEVBQWlCMkIsSUFBakIsRUFBdUJPLElBQXZCLEVBQTZCO0FBQzVDLE1BQUlyQixNQUFNYixRQUFRQSxNQUFNeEYsTUFBZCxHQUF1QixDQUFqQztBQUNBLE1BQUksT0FBTzBILElBQVAsSUFBZSxRQUFuQixFQUE2QjtBQUM1QnJCLFNBQU1xQixPQUFPLENBQVAsR0FBV3JCLE1BQU1xQixJQUFOLEdBQWEsQ0FBeEIsR0FBNEJsSCxLQUFLa0QsR0FBTCxDQUFTMkMsR0FBVCxFQUFjcUIsT0FBTyxDQUFyQixDQUFsQztBQUNBO0FBQ0QsTUFBSVAsU0FBU0EsSUFBYixFQUFtQjtBQUNsQixVQUFPaEosRUFBRXdKLGFBQUYsQ0FBZ0JwSyxNQUFNdUIsSUFBTixDQUFXMEcsS0FBWCxFQUFrQixDQUFsQixFQUFxQmEsR0FBckIsQ0FBaEIsRUFBMkNsSSxFQUFFcUosS0FBN0MsQ0FBUDtBQUNBO0FBQ0QsU0FBTyxFQUFFbkIsR0FBRixJQUFTLENBQWhCO0FBQW1CLE9BQUliLE1BQU1hLEdBQU4sTUFBZWMsSUFBbkIsRUFBeUIsT0FBT2QsR0FBUDtBQUE1QyxHQUNBLE9BQU8sQ0FBQyxDQUFSO0FBQ0EsRUFWRDs7QUFZQTtBQUNBLFVBQVN1QixpQkFBVCxDQUEyQjFHLEdBQTNCLEVBQWdDO0FBQy9CLFNBQU8sVUFBVXNFLEtBQVYsRUFBaUI1RCxTQUFqQixFQUE0QmpELE9BQTVCLEVBQXFDO0FBQzNDaUQsZUFBWXZDLEdBQUd1QyxTQUFILEVBQWNqRCxPQUFkLENBQVo7QUFDQSxPQUFJcUIsU0FBU3dGLFNBQVMsSUFBVCxJQUFpQkEsTUFBTXhGLE1BQXBDO0FBQ0EsT0FBSWhCLFFBQVFrQyxNQUFNLENBQU4sR0FBVSxDQUFWLEdBQWNsQixTQUFTLENBQW5DO0FBQ0EsVUFBT2hCLFNBQVMsQ0FBVCxJQUFjQSxRQUFRZ0IsTUFBN0IsRUFBcUNoQixTQUFTa0MsR0FBOUMsRUFBbUQ7QUFDbEQsUUFBSVUsVUFBVTRELE1BQU14RyxLQUFOLENBQVYsRUFBd0JBLEtBQXhCLEVBQStCd0csS0FBL0IsQ0FBSixFQUEyQyxPQUFPeEcsS0FBUDtBQUMzQztBQUNELFVBQU8sQ0FBQyxDQUFSO0FBQ0EsR0FSRDtBQVNBOztBQUVEO0FBQ0FiLEdBQUUwRCxTQUFGLEdBQWMrRixrQkFBa0IsQ0FBbEIsQ0FBZDs7QUFFQXpKLEdBQUV3SixhQUFGLEdBQWtCQyxrQkFBa0IsQ0FBQyxDQUFuQixDQUFsQjs7QUFFQTtBQUNBO0FBQ0F6SixHQUFFb0osV0FBRixHQUFnQixVQUFVL0IsS0FBVixFQUFpQnBILEdBQWpCLEVBQXNCdUIsUUFBdEIsRUFBZ0NoQixPQUFoQyxFQUF5QztBQUN4RGdCLGFBQVdOLEdBQUdNLFFBQUgsRUFBYWhCLE9BQWIsRUFBc0IsQ0FBdEIsQ0FBWDtBQUNBLE1BQUlFLFFBQVFjLFNBQVN2QixHQUFULENBQVo7QUFDQSxNQUFJeUosTUFBTSxDQUFWO0FBQUEsTUFBYUMsT0FBT3RDLE1BQU14RixNQUExQjtBQUNBLFNBQU82SCxNQUFNQyxJQUFiLEVBQW1CO0FBQ2xCLE9BQUlDLE1BQU12SCxLQUFLd0gsS0FBTCxDQUFXLENBQUNILE1BQU1DLElBQVAsSUFBZSxDQUExQixDQUFWO0FBQ0EsT0FBSW5JLFNBQVM2RixNQUFNdUMsR0FBTixDQUFULElBQXVCbEosS0FBM0IsRUFBa0NnSixNQUFNRSxNQUFNLENBQVosQ0FBbEMsS0FBc0RELE9BQU9DLEdBQVA7QUFDdEQ7QUFDRCxTQUFPRixHQUFQO0FBQ0EsRUFURDs7QUFXQTtBQUNBO0FBQ0E7QUFDQTFKLEdBQUU4SixLQUFGLEdBQVUsVUFBVUMsS0FBVixFQUFpQkMsSUFBakIsRUFBdUJDLElBQXZCLEVBQTZCO0FBQ3RDLE1BQUloSixVQUFVWSxNQUFWLElBQW9CLENBQXhCLEVBQTJCO0FBQzFCbUksVUFBT0QsU0FBUyxDQUFoQjtBQUNBQSxXQUFRLENBQVI7QUFDQTtBQUNERSxTQUFPQSxRQUFRLENBQWY7O0FBRUEsTUFBSXBJLFNBQVNRLEtBQUsrQyxHQUFMLENBQVMvQyxLQUFLNkgsSUFBTCxDQUFVLENBQUNGLE9BQU9ELEtBQVIsSUFBaUJFLElBQTNCLENBQVQsRUFBMkMsQ0FBM0MsQ0FBYjtBQUNBLE1BQUlILFFBQVFqTCxNQUFNZ0QsTUFBTixDQUFaOztBQUVBLE9BQUssSUFBSXFHLE1BQU0sQ0FBZixFQUFrQkEsTUFBTXJHLE1BQXhCLEVBQWdDcUcsT0FBUTZCLFNBQVNFLElBQWpELEVBQXVEO0FBQ3RESCxTQUFNNUIsR0FBTixJQUFhNkIsS0FBYjtBQUNBOztBQUVELFNBQU9ELEtBQVA7QUFDQSxFQWZEOztBQWlCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJSyxlQUFlLFNBQWZBLFlBQWUsQ0FBVUMsVUFBVixFQUFzQkMsU0FBdEIsRUFBaUM3SixPQUFqQyxFQUEwQzhKLGNBQTFDLEVBQTBEeEYsSUFBMUQsRUFBZ0U7QUFDbEYsTUFBSSxFQUFFd0YsMEJBQTBCRCxTQUE1QixDQUFKLEVBQTRDLE9BQU9ELFdBQVdwSixLQUFYLENBQWlCUixPQUFqQixFQUEwQnNFLElBQTFCLENBQVA7QUFDNUMsTUFBSXlGLE9BQU9ySSxXQUFXa0ksV0FBV3RMLFNBQXRCLENBQVg7QUFDQSxNQUFJcUQsU0FBU2lJLFdBQVdwSixLQUFYLENBQWlCdUosSUFBakIsRUFBdUJ6RixJQUF2QixDQUFiO0FBQ0EsTUFBSTlFLEVBQUVxQixRQUFGLENBQVdjLE1BQVgsQ0FBSixFQUF3QixPQUFPQSxNQUFQO0FBQ3hCLFNBQU9vSSxJQUFQO0FBQ0EsRUFORDs7QUFRQTtBQUNBO0FBQ0E7QUFDQXZLLEdBQUVKLElBQUYsR0FBUyxVQUFVVyxJQUFWLEVBQWdCQyxPQUFoQixFQUF5QjtBQUNqQyxNQUFJYixjQUFjWSxLQUFLWCxJQUFMLEtBQWNELFVBQWhDLEVBQTRDLE9BQU9BLFdBQVdxQixLQUFYLENBQWlCVCxJQUFqQixFQUF1Qm5CLE1BQU11QixJQUFOLENBQVdNLFNBQVgsRUFBc0IsQ0FBdEIsQ0FBdkIsQ0FBUDtBQUM1QyxNQUFJLENBQUNqQixFQUFFb0IsVUFBRixDQUFhYixJQUFiLENBQUwsRUFBeUIsTUFBTSxJQUFJaUssU0FBSixDQUFjLG1DQUFkLENBQU47QUFDekIsTUFBSTFGLE9BQU8xRixNQUFNdUIsSUFBTixDQUFXTSxTQUFYLEVBQXNCLENBQXRCLENBQVg7QUFDQSxNQUFJd0osUUFBUSxTQUFSQSxLQUFRLEdBQVk7QUFDdkIsVUFBT04sYUFBYTVKLElBQWIsRUFBbUJrSyxLQUFuQixFQUEwQmpLLE9BQTFCLEVBQW1DLElBQW5DLEVBQXlDc0UsS0FBSzRGLE1BQUwsQ0FBWXRMLE1BQU11QixJQUFOLENBQVdNLFNBQVgsQ0FBWixDQUF6QyxDQUFQO0FBQ0EsR0FGRDtBQUdBLFNBQU93SixLQUFQO0FBQ0EsRUFSRDs7QUFVQTtBQUNBO0FBQ0E7QUFDQXpLLEdBQUUySyxPQUFGLEdBQVksVUFBVXBLLElBQVYsRUFBZ0I7QUFDM0IsTUFBSXFLLFlBQVl4TCxNQUFNdUIsSUFBTixDQUFXTSxTQUFYLEVBQXNCLENBQXRCLENBQWhCO0FBQ0EsTUFBSXdKLFFBQVEsU0FBUkEsS0FBUSxHQUFZO0FBQ3ZCLE9BQUlJLFdBQVcsQ0FBZjtBQUFBLE9BQWtCaEosU0FBUytJLFVBQVUvSSxNQUFyQztBQUNBLE9BQUlpRCxPQUFPakcsTUFBTWdELE1BQU4sQ0FBWDtBQUNBLFFBQUssSUFBSUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxNQUFwQixFQUE0QkcsR0FBNUIsRUFBaUM7QUFDaEM4QyxTQUFLOUMsQ0FBTCxJQUFVNEksVUFBVTVJLENBQVYsTUFBaUJoQyxDQUFqQixHQUFxQmlCLFVBQVU0SixVQUFWLENBQXJCLEdBQTZDRCxVQUFVNUksQ0FBVixDQUF2RDtBQUNBO0FBQ0QsVUFBTzZJLFdBQVc1SixVQUFVWSxNQUE1QjtBQUFvQ2lELFNBQUszRixJQUFMLENBQVU4QixVQUFVNEosVUFBVixDQUFWO0FBQXBDLElBQ0EsT0FBT1YsYUFBYTVKLElBQWIsRUFBbUJrSyxLQUFuQixFQUEwQixJQUExQixFQUFnQyxJQUFoQyxFQUFzQzNGLElBQXRDLENBQVA7QUFDQSxHQVJEO0FBU0EsU0FBTzJGLEtBQVA7QUFDQSxFQVpEOztBQWNBO0FBQ0E7QUFDQTtBQUNBekssR0FBRThLLE9BQUYsR0FBWSxVQUFVN0ssR0FBVixFQUFlO0FBQzFCLE1BQUkrQixDQUFKO0FBQUEsTUFBT0gsU0FBU1osVUFBVVksTUFBMUI7QUFBQSxNQUFrQ0ksR0FBbEM7QUFDQSxNQUFJSixVQUFVLENBQWQsRUFBaUIsTUFBTSxJQUFJa0osS0FBSixDQUFVLHVDQUFWLENBQU47QUFDakIsT0FBSy9JLElBQUksQ0FBVCxFQUFZQSxJQUFJSCxNQUFoQixFQUF3QkcsR0FBeEIsRUFBNkI7QUFDNUJDLFNBQU1oQixVQUFVZSxDQUFWLENBQU47QUFDQS9CLE9BQUlnQyxHQUFKLElBQVdqQyxFQUFFSixJQUFGLENBQU9LLElBQUlnQyxHQUFKLENBQVAsRUFBaUJoQyxHQUFqQixDQUFYO0FBQ0E7QUFDRCxTQUFPQSxHQUFQO0FBQ0EsRUFSRDs7QUFVQTtBQUNBRCxHQUFFZ0wsT0FBRixHQUFZLFVBQVV6SyxJQUFWLEVBQWdCMEssTUFBaEIsRUFBd0I7QUFDbkMsTUFBSUQsVUFBVSxTQUFWQSxPQUFVLENBQVUvSSxHQUFWLEVBQWU7QUFDNUIsT0FBSWlKLFFBQVFGLFFBQVFFLEtBQXBCO0FBQ0EsT0FBSUMsVUFBVSxNQUFNRixTQUFTQSxPQUFPakssS0FBUCxDQUFhLElBQWIsRUFBbUJDLFNBQW5CLENBQVQsR0FBeUNnQixHQUEvQyxDQUFkO0FBQ0EsT0FBSSxDQUFDakMsRUFBRTBHLEdBQUYsQ0FBTXdFLEtBQU4sRUFBYUMsT0FBYixDQUFMLEVBQTRCRCxNQUFNQyxPQUFOLElBQWlCNUssS0FBS1MsS0FBTCxDQUFXLElBQVgsRUFBaUJDLFNBQWpCLENBQWpCO0FBQzVCLFVBQU9pSyxNQUFNQyxPQUFOLENBQVA7QUFDQSxHQUxEO0FBTUFILFVBQVFFLEtBQVIsR0FBZ0IsRUFBaEI7QUFDQSxTQUFPRixPQUFQO0FBQ0EsRUFURDs7QUFXQTtBQUNBO0FBQ0FoTCxHQUFFb0wsS0FBRixHQUFVLFVBQVU3SyxJQUFWLEVBQWdCOEssSUFBaEIsRUFBc0I7QUFDL0IsTUFBSXZHLE9BQU8xRixNQUFNdUIsSUFBTixDQUFXTSxTQUFYLEVBQXNCLENBQXRCLENBQVg7QUFDQSxTQUFPcUssV0FBVyxZQUFZO0FBQzdCLFVBQU8vSyxLQUFLUyxLQUFMLENBQVcsSUFBWCxFQUFpQjhELElBQWpCLENBQVA7QUFDQSxHQUZNLEVBRUp1RyxJQUZJLENBQVA7QUFHQSxFQUxEOztBQU9BO0FBQ0E7QUFDQXJMLEdBQUV1TCxLQUFGLEdBQVV2TCxFQUFFMkssT0FBRixDQUFVM0ssRUFBRW9MLEtBQVosRUFBbUJwTCxDQUFuQixFQUFzQixDQUF0QixDQUFWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsR0FBRXdMLFFBQUYsR0FBYSxVQUFVakwsSUFBVixFQUFnQjhLLElBQWhCLEVBQXNCSSxPQUF0QixFQUErQjtBQUMzQyxNQUFJakwsT0FBSixFQUFhc0UsSUFBYixFQUFtQjNDLE1BQW5CO0FBQ0EsTUFBSXVKLFVBQVUsSUFBZDtBQUNBLE1BQUlDLFdBQVcsQ0FBZjtBQUNBLE1BQUksQ0FBQ0YsT0FBTCxFQUFjQSxVQUFVLEVBQVY7QUFDZCxNQUFJRyxRQUFRLFNBQVJBLEtBQVEsR0FBWTtBQUN2QkQsY0FBV0YsUUFBUUksT0FBUixLQUFvQixLQUFwQixHQUE0QixDQUE1QixHQUFnQzdMLEVBQUU4TCxHQUFGLEVBQTNDO0FBQ0FKLGFBQVUsSUFBVjtBQUNBdkosWUFBUzVCLEtBQUtTLEtBQUwsQ0FBV1IsT0FBWCxFQUFvQnNFLElBQXBCLENBQVQ7QUFDQSxPQUFJLENBQUM0RyxPQUFMLEVBQWNsTCxVQUFVc0UsT0FBTyxJQUFqQjtBQUNkLEdBTEQ7QUFNQSxTQUFPLFlBQVk7QUFDbEIsT0FBSWdILE1BQU05TCxFQUFFOEwsR0FBRixFQUFWO0FBQ0EsT0FBSSxDQUFDSCxRQUFELElBQWFGLFFBQVFJLE9BQVIsS0FBb0IsS0FBckMsRUFBNENGLFdBQVdHLEdBQVg7QUFDNUMsT0FBSUMsWUFBWVYsUUFBUVMsTUFBTUgsUUFBZCxDQUFoQjtBQUNBbkwsYUFBVSxJQUFWO0FBQ0FzRSxVQUFPN0QsU0FBUDtBQUNBLE9BQUk4SyxhQUFhLENBQWIsSUFBa0JBLFlBQVlWLElBQWxDLEVBQXdDO0FBQ3ZDLFFBQUlLLE9BQUosRUFBYTtBQUNaTSxrQkFBYU4sT0FBYjtBQUNBQSxlQUFVLElBQVY7QUFDQTtBQUNEQyxlQUFXRyxHQUFYO0FBQ0EzSixhQUFTNUIsS0FBS1MsS0FBTCxDQUFXUixPQUFYLEVBQW9Cc0UsSUFBcEIsQ0FBVDtBQUNBLFFBQUksQ0FBQzRHLE9BQUwsRUFBY2xMLFVBQVVzRSxPQUFPLElBQWpCO0FBQ2QsSUFSRCxNQVFPLElBQUksQ0FBQzRHLE9BQUQsSUFBWUQsUUFBUVEsUUFBUixLQUFxQixLQUFyQyxFQUE0QztBQUNsRFAsY0FBVUosV0FBV00sS0FBWCxFQUFrQkcsU0FBbEIsQ0FBVjtBQUNBO0FBQ0QsVUFBTzVKLE1BQVA7QUFDQSxHQWxCRDtBQW1CQSxFQTlCRDs7QUFnQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQW5DLEdBQUVrTSxRQUFGLEdBQWEsVUFBVTNMLElBQVYsRUFBZ0I4SyxJQUFoQixFQUFzQmMsU0FBdEIsRUFBaUM7QUFDN0MsTUFBSVQsT0FBSixFQUFhNUcsSUFBYixFQUFtQnRFLE9BQW5CLEVBQTRCNEwsU0FBNUIsRUFBdUNqSyxNQUF2Qzs7QUFFQSxNQUFJeUosUUFBUSxTQUFSQSxLQUFRLEdBQVk7QUFDdkIsT0FBSXJFLE9BQU92SCxFQUFFOEwsR0FBRixLQUFVTSxTQUFyQjs7QUFFQSxPQUFJN0UsT0FBTzhELElBQVAsSUFBZTlELFFBQVEsQ0FBM0IsRUFBOEI7QUFDN0JtRSxjQUFVSixXQUFXTSxLQUFYLEVBQWtCUCxPQUFPOUQsSUFBekIsQ0FBVjtBQUNBLElBRkQsTUFFTztBQUNObUUsY0FBVSxJQUFWO0FBQ0EsUUFBSSxDQUFDUyxTQUFMLEVBQWdCO0FBQ2ZoSyxjQUFTNUIsS0FBS1MsS0FBTCxDQUFXUixPQUFYLEVBQW9Cc0UsSUFBcEIsQ0FBVDtBQUNBLFNBQUksQ0FBQzRHLE9BQUwsRUFBY2xMLFVBQVVzRSxPQUFPLElBQWpCO0FBQ2Q7QUFDRDtBQUNELEdBWkQ7O0FBY0EsU0FBTyxZQUFZO0FBQ2xCdEUsYUFBVSxJQUFWO0FBQ0FzRSxVQUFPN0QsU0FBUDtBQUNBbUwsZUFBWXBNLEVBQUU4TCxHQUFGLEVBQVo7QUFDQSxPQUFJTyxVQUFVRixhQUFhLENBQUNULE9BQTVCO0FBQ0EsT0FBSSxDQUFDQSxPQUFMLEVBQWNBLFVBQVVKLFdBQVdNLEtBQVgsRUFBa0JQLElBQWxCLENBQVY7QUFDZCxPQUFJZ0IsT0FBSixFQUFhO0FBQ1psSyxhQUFTNUIsS0FBS1MsS0FBTCxDQUFXUixPQUFYLEVBQW9Cc0UsSUFBcEIsQ0FBVDtBQUNBdEUsY0FBVXNFLE9BQU8sSUFBakI7QUFDQTs7QUFFRCxVQUFPM0MsTUFBUDtBQUNBLEdBWkQ7QUFhQSxFQTlCRDs7QUFnQ0E7QUFDQTtBQUNBO0FBQ0FuQyxHQUFFc00sSUFBRixHQUFTLFVBQVUvTCxJQUFWLEVBQWdCZ00sT0FBaEIsRUFBeUI7QUFDakMsU0FBT3ZNLEVBQUUySyxPQUFGLENBQVU0QixPQUFWLEVBQW1CaE0sSUFBbkIsQ0FBUDtBQUNBLEVBRkQ7O0FBSUE7QUFDQVAsR0FBRWdFLE1BQUYsR0FBVyxVQUFVUCxTQUFWLEVBQXFCO0FBQy9CLFNBQU8sWUFBWTtBQUNsQixVQUFPLENBQUNBLFVBQVV6QyxLQUFWLENBQWdCLElBQWhCLEVBQXNCQyxTQUF0QixDQUFSO0FBQ0EsR0FGRDtBQUdBLEVBSkQ7O0FBTUE7QUFDQTtBQUNBakIsR0FBRXdNLE9BQUYsR0FBWSxZQUFZO0FBQ3ZCLE1BQUkxSCxPQUFPN0QsU0FBWDtBQUNBLE1BQUk4SSxRQUFRakYsS0FBS2pELE1BQUwsR0FBYyxDQUExQjtBQUNBLFNBQU8sWUFBWTtBQUNsQixPQUFJRyxJQUFJK0gsS0FBUjtBQUNBLE9BQUk1SCxTQUFTMkMsS0FBS2lGLEtBQUwsRUFBWS9JLEtBQVosQ0FBa0IsSUFBbEIsRUFBd0JDLFNBQXhCLENBQWI7QUFDQSxVQUFPZSxHQUFQO0FBQVlHLGFBQVMyQyxLQUFLOUMsQ0FBTCxFQUFRckIsSUFBUixDQUFhLElBQWIsRUFBbUJ3QixNQUFuQixDQUFUO0FBQVosSUFDQSxPQUFPQSxNQUFQO0FBQ0EsR0FMRDtBQU1BLEVBVEQ7O0FBV0E7QUFDQW5DLEdBQUV5TSxLQUFGLEdBQVUsVUFBVUMsS0FBVixFQUFpQm5NLElBQWpCLEVBQXVCO0FBQ2hDLFNBQU8sWUFBWTtBQUNsQixPQUFJLEVBQUVtTSxLQUFGLEdBQVUsQ0FBZCxFQUFpQjtBQUNoQixXQUFPbk0sS0FBS1MsS0FBTCxDQUFXLElBQVgsRUFBaUJDLFNBQWpCLENBQVA7QUFDQTtBQUNELEdBSkQ7QUFLQSxFQU5EOztBQVFBO0FBQ0FqQixHQUFFMk0sTUFBRixHQUFXLFVBQVVELEtBQVYsRUFBaUJuTSxJQUFqQixFQUF1QjtBQUNqQyxNQUFJMEMsSUFBSjtBQUNBLFNBQU8sWUFBWTtBQUNsQixPQUFJLEVBQUV5SixLQUFGLEdBQVUsQ0FBZCxFQUFpQjtBQUNoQnpKLFdBQU8xQyxLQUFLUyxLQUFMLENBQVcsSUFBWCxFQUFpQkMsU0FBakIsQ0FBUDtBQUNBO0FBQ0QsT0FBSXlMLFNBQVMsQ0FBYixFQUFnQm5NLE9BQU8sSUFBUDtBQUNoQixVQUFPMEMsSUFBUDtBQUNBLEdBTkQ7QUFPQSxFQVREOztBQVdBO0FBQ0E7QUFDQWpELEdBQUU0TSxJQUFGLEdBQVM1TSxFQUFFMkssT0FBRixDQUFVM0ssRUFBRTJNLE1BQVosRUFBb0IsQ0FBcEIsQ0FBVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSUUsYUFBYSxDQUFDLEVBQUV4TixVQUFVLElBQVosR0FBbUJ5TixvQkFBbkIsQ0FBd0MsVUFBeEMsQ0FBbEI7QUFDQSxLQUFJQyxxQkFBcUIsQ0FBQyxTQUFELEVBQVksZUFBWixFQUE2QixVQUE3QixFQUN4QixzQkFEd0IsRUFDQSxnQkFEQSxFQUNrQixnQkFEbEIsQ0FBekI7O0FBR0EsVUFBU0MsbUJBQVQsQ0FBNkIvTSxHQUE3QixFQUFrQ1AsSUFBbEMsRUFBd0M7QUFDdkMsTUFBSXVOLGFBQWFGLG1CQUFtQmxMLE1BQXBDO0FBQ0EsTUFBSXFMLGNBQWNqTixJQUFJaU4sV0FBdEI7QUFDQSxNQUFJQyxRQUFTbk4sRUFBRW9CLFVBQUYsQ0FBYThMLFdBQWIsS0FBNkJBLFlBQVlwTyxTQUExQyxJQUF3REMsUUFBcEU7O0FBRUE7QUFDQSxNQUFJcU8sT0FBTyxhQUFYO0FBQ0EsTUFBSXBOLEVBQUUwRyxHQUFGLENBQU16RyxHQUFOLEVBQVdtTixJQUFYLEtBQW9CLENBQUNwTixFQUFFcUUsUUFBRixDQUFXM0UsSUFBWCxFQUFpQjBOLElBQWpCLENBQXpCLEVBQWlEMU4sS0FBS1AsSUFBTCxDQUFVaU8sSUFBVjs7QUFFakQsU0FBT0gsWUFBUCxFQUFxQjtBQUNwQkcsVUFBT0wsbUJBQW1CRSxVQUFuQixDQUFQO0FBQ0EsT0FBSUcsUUFBUW5OLEdBQVIsSUFBZUEsSUFBSW1OLElBQUosTUFBY0QsTUFBTUMsSUFBTixDQUE3QixJQUE0QyxDQUFDcE4sRUFBRXFFLFFBQUYsQ0FBVzNFLElBQVgsRUFBaUIwTixJQUFqQixDQUFqRCxFQUF5RTtBQUN4RTFOLFNBQUtQLElBQUwsQ0FBVWlPLElBQVY7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBcE4sR0FBRU4sSUFBRixHQUFTLFVBQVVPLEdBQVYsRUFBZTtBQUN2QixNQUFJLENBQUNELEVBQUVxQixRQUFGLENBQVdwQixHQUFYLENBQUwsRUFBc0IsT0FBTyxFQUFQO0FBQ3RCLE1BQUlSLFVBQUosRUFBZ0IsT0FBT0EsV0FBV1EsR0FBWCxDQUFQO0FBQ2hCLE1BQUlQLE9BQU8sRUFBWDtBQUNBLE9BQUssSUFBSXVDLEdBQVQsSUFBZ0JoQyxHQUFoQjtBQUFxQixPQUFJRCxFQUFFMEcsR0FBRixDQUFNekcsR0FBTixFQUFXZ0MsR0FBWCxDQUFKLEVBQXFCdkMsS0FBS1AsSUFBTCxDQUFVOEMsR0FBVjtBQUExQyxHQUp1QixDQUt2QjtBQUNBLE1BQUk0SyxVQUFKLEVBQWdCRyxvQkFBb0IvTSxHQUFwQixFQUF5QlAsSUFBekI7QUFDaEIsU0FBT0EsSUFBUDtBQUNBLEVBUkQ7O0FBVUE7QUFDQU0sR0FBRXFOLE9BQUYsR0FBWSxVQUFVcE4sR0FBVixFQUFlO0FBQzFCLE1BQUksQ0FBQ0QsRUFBRXFCLFFBQUYsQ0FBV3BCLEdBQVgsQ0FBTCxFQUFzQixPQUFPLEVBQVA7QUFDdEIsTUFBSVAsT0FBTyxFQUFYO0FBQ0EsT0FBSyxJQUFJdUMsR0FBVCxJQUFnQmhDLEdBQWhCO0FBQXFCUCxRQUFLUCxJQUFMLENBQVU4QyxHQUFWO0FBQXJCLEdBSDBCLENBSTFCO0FBQ0EsTUFBSTRLLFVBQUosRUFBZ0JHLG9CQUFvQi9NLEdBQXBCLEVBQXlCUCxJQUF6QjtBQUNoQixTQUFPQSxJQUFQO0FBQ0EsRUFQRDs7QUFTQTtBQUNBTSxHQUFFMEUsTUFBRixHQUFXLFVBQVV6RSxHQUFWLEVBQWU7QUFDekIsTUFBSVAsT0FBT00sRUFBRU4sSUFBRixDQUFPTyxHQUFQLENBQVg7QUFDQSxNQUFJNEIsU0FBU25DLEtBQUttQyxNQUFsQjtBQUNBLE1BQUk2QyxTQUFTN0YsTUFBTWdELE1BQU4sQ0FBYjtBQUNBLE9BQUssSUFBSUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxNQUFwQixFQUE0QkcsR0FBNUIsRUFBaUM7QUFDaEMwQyxVQUFPMUMsQ0FBUCxJQUFZL0IsSUFBSVAsS0FBS3NDLENBQUwsQ0FBSixDQUFaO0FBQ0E7QUFDRCxTQUFPMEMsTUFBUDtBQUNBLEVBUkQ7O0FBVUE7QUFDQTtBQUNBMUUsR0FBRXNOLFNBQUYsR0FBYyxVQUFVck4sR0FBVixFQUFldUIsUUFBZixFQUF5QmhCLE9BQXpCLEVBQWtDO0FBQy9DZ0IsYUFBV04sR0FBR00sUUFBSCxFQUFhaEIsT0FBYixDQUFYO0FBQ0EsTUFBSWQsT0FBT00sRUFBRU4sSUFBRixDQUFPTyxHQUFQLENBQVg7QUFBQSxNQUNDNEIsU0FBU25DLEtBQUttQyxNQURmO0FBQUEsTUFFQ2UsVUFBVSxFQUZYO0FBQUEsTUFHQ0MsVUFIRDtBQUlBLE9BQUssSUFBSWhDLFFBQVEsQ0FBakIsRUFBb0JBLFFBQVFnQixNQUE1QixFQUFvQ2hCLE9BQXBDLEVBQTZDO0FBQzVDZ0MsZ0JBQWFuRCxLQUFLbUIsS0FBTCxDQUFiO0FBQ0ErQixXQUFRQyxVQUFSLElBQXNCckIsU0FBU3ZCLElBQUk0QyxVQUFKLENBQVQsRUFBMEJBLFVBQTFCLEVBQXNDNUMsR0FBdEMsQ0FBdEI7QUFDQTtBQUNELFNBQU8yQyxPQUFQO0FBQ0EsRUFYRDs7QUFhQTtBQUNBNUMsR0FBRXVOLEtBQUYsR0FBVSxVQUFVdE4sR0FBVixFQUFlO0FBQ3hCLE1BQUlQLE9BQU9NLEVBQUVOLElBQUYsQ0FBT08sR0FBUCxDQUFYO0FBQ0EsTUFBSTRCLFNBQVNuQyxLQUFLbUMsTUFBbEI7QUFDQSxNQUFJMEwsUUFBUTFPLE1BQU1nRCxNQUFOLENBQVo7QUFDQSxPQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsTUFBcEIsRUFBNEJHLEdBQTVCLEVBQWlDO0FBQ2hDdUwsU0FBTXZMLENBQU4sSUFBVyxDQUFDdEMsS0FBS3NDLENBQUwsQ0FBRCxFQUFVL0IsSUFBSVAsS0FBS3NDLENBQUwsQ0FBSixDQUFWLENBQVg7QUFDQTtBQUNELFNBQU91TCxLQUFQO0FBQ0EsRUFSRDs7QUFVQTtBQUNBdk4sR0FBRXdOLE1BQUYsR0FBVyxVQUFVdk4sR0FBVixFQUFlO0FBQ3pCLE1BQUlrQyxTQUFTLEVBQWI7QUFDQSxNQUFJekMsT0FBT00sRUFBRU4sSUFBRixDQUFPTyxHQUFQLENBQVg7QUFDQSxPQUFLLElBQUkrQixJQUFJLENBQVIsRUFBV0gsU0FBU25DLEtBQUttQyxNQUE5QixFQUFzQ0csSUFBSUgsTUFBMUMsRUFBa0RHLEdBQWxELEVBQXVEO0FBQ3RERyxVQUFPbEMsSUFBSVAsS0FBS3NDLENBQUwsQ0FBSixDQUFQLElBQXVCdEMsS0FBS3NDLENBQUwsQ0FBdkI7QUFDQTtBQUNELFNBQU9HLE1BQVA7QUFDQSxFQVBEOztBQVNBO0FBQ0E7QUFDQW5DLEdBQUV5TixTQUFGLEdBQWN6TixFQUFFME4sT0FBRixHQUFZLFVBQVV6TixHQUFWLEVBQWU7QUFDeEMsTUFBSTBOLFFBQVEsRUFBWjtBQUNBLE9BQUssSUFBSTFMLEdBQVQsSUFBZ0JoQyxHQUFoQixFQUFxQjtBQUNwQixPQUFJRCxFQUFFb0IsVUFBRixDQUFhbkIsSUFBSWdDLEdBQUosQ0FBYixDQUFKLEVBQTRCMEwsTUFBTXhPLElBQU4sQ0FBVzhDLEdBQVg7QUFDNUI7QUFDRCxTQUFPMEwsTUFBTXpILElBQU4sRUFBUDtBQUNBLEVBTkQ7O0FBUUE7QUFDQWxHLEdBQUU0TixNQUFGLEdBQVdsTSxlQUFlMUIsRUFBRXFOLE9BQWpCLENBQVg7O0FBRUE7QUFDQTtBQUNBck4sR0FBRTZOLFNBQUYsR0FBYzdOLEVBQUU4TixNQUFGLEdBQVdwTSxlQUFlMUIsRUFBRU4sSUFBakIsQ0FBekI7O0FBRUE7QUFDQU0sR0FBRTJELE9BQUYsR0FBWSxVQUFVMUQsR0FBVixFQUFld0QsU0FBZixFQUEwQmpELE9BQTFCLEVBQW1DO0FBQzlDaUQsY0FBWXZDLEdBQUd1QyxTQUFILEVBQWNqRCxPQUFkLENBQVo7QUFDQSxNQUFJZCxPQUFPTSxFQUFFTixJQUFGLENBQU9PLEdBQVAsQ0FBWDtBQUFBLE1BQXdCZ0MsR0FBeEI7QUFDQSxPQUFLLElBQUlELElBQUksQ0FBUixFQUFXSCxTQUFTbkMsS0FBS21DLE1BQTlCLEVBQXNDRyxJQUFJSCxNQUExQyxFQUFrREcsR0FBbEQsRUFBdUQ7QUFDdERDLFNBQU12QyxLQUFLc0MsQ0FBTCxDQUFOO0FBQ0EsT0FBSXlCLFVBQVV4RCxJQUFJZ0MsR0FBSixDQUFWLEVBQW9CQSxHQUFwQixFQUF5QmhDLEdBQXpCLENBQUosRUFBbUMsT0FBT2dDLEdBQVA7QUFDbkM7QUFDRCxFQVBEOztBQVNBO0FBQ0FqQyxHQUFFK04sSUFBRixHQUFTLFVBQVU1RSxNQUFWLEVBQWtCNkUsU0FBbEIsRUFBNkJ4TixPQUE3QixFQUFzQztBQUM5QyxNQUFJMkIsU0FBUyxFQUFiO0FBQUEsTUFBaUJsQyxNQUFNa0osTUFBdkI7QUFBQSxNQUErQjNILFFBQS9CO0FBQUEsTUFBeUM5QixJQUF6QztBQUNBLE1BQUlPLE9BQU8sSUFBWCxFQUFpQixPQUFPa0MsTUFBUDtBQUNqQixNQUFJbkMsRUFBRW9CLFVBQUYsQ0FBYTRNLFNBQWIsQ0FBSixFQUE2QjtBQUM1QnRPLFVBQU9NLEVBQUVxTixPQUFGLENBQVVwTixHQUFWLENBQVA7QUFDQXVCLGNBQVdsQixXQUFXME4sU0FBWCxFQUFzQnhOLE9BQXRCLENBQVg7QUFDQSxHQUhELE1BR087QUFDTmQsVUFBT2tJLFFBQVEzRyxTQUFSLEVBQW1CLEtBQW5CLEVBQTBCLEtBQTFCLEVBQWlDLENBQWpDLENBQVA7QUFDQU8sY0FBVyxrQkFBVWQsS0FBVixFQUFpQnVCLEdBQWpCLEVBQXNCaEMsR0FBdEIsRUFBMkI7QUFBRSxXQUFPZ0MsT0FBT2hDLEdBQWQ7QUFBb0IsSUFBNUQ7QUFDQUEsU0FBTWpCLE9BQU9pQixHQUFQLENBQU47QUFDQTtBQUNELE9BQUssSUFBSStCLElBQUksQ0FBUixFQUFXSCxTQUFTbkMsS0FBS21DLE1BQTlCLEVBQXNDRyxJQUFJSCxNQUExQyxFQUFrREcsR0FBbEQsRUFBdUQ7QUFDdEQsT0FBSUMsTUFBTXZDLEtBQUtzQyxDQUFMLENBQVY7QUFDQSxPQUFJdEIsUUFBUVQsSUFBSWdDLEdBQUosQ0FBWjtBQUNBLE9BQUlULFNBQVNkLEtBQVQsRUFBZ0J1QixHQUFoQixFQUFxQmhDLEdBQXJCLENBQUosRUFBK0JrQyxPQUFPRixHQUFQLElBQWN2QixLQUFkO0FBQy9CO0FBQ0QsU0FBT3lCLE1BQVA7QUFDQSxFQWpCRDs7QUFtQkE7QUFDQW5DLEdBQUVpTyxJQUFGLEdBQVMsVUFBVWhPLEdBQVYsRUFBZXVCLFFBQWYsRUFBeUJoQixPQUF6QixFQUFrQztBQUMxQyxNQUFJUixFQUFFb0IsVUFBRixDQUFhSSxRQUFiLENBQUosRUFBNEI7QUFDM0JBLGNBQVd4QixFQUFFZ0UsTUFBRixDQUFTeEMsUUFBVCxDQUFYO0FBQ0EsR0FGRCxNQUVPO0FBQ04sT0FBSTlCLE9BQU9NLEVBQUUwQyxHQUFGLENBQU1rRixRQUFRM0csU0FBUixFQUFtQixLQUFuQixFQUEwQixLQUExQixFQUFpQyxDQUFqQyxDQUFOLEVBQTJDaU4sTUFBM0MsQ0FBWDtBQUNBMU0sY0FBVyxrQkFBVWQsS0FBVixFQUFpQnVCLEdBQWpCLEVBQXNCO0FBQ2hDLFdBQU8sQ0FBQ2pDLEVBQUVxRSxRQUFGLENBQVczRSxJQUFYLEVBQWlCdUMsR0FBakIsQ0FBUjtBQUNBLElBRkQ7QUFHQTtBQUNELFNBQU9qQyxFQUFFK04sSUFBRixDQUFPOU4sR0FBUCxFQUFZdUIsUUFBWixFQUFzQmhCLE9BQXRCLENBQVA7QUFDQSxFQVZEOztBQVlBO0FBQ0FSLEdBQUVtTyxRQUFGLEdBQWF6TSxlQUFlMUIsRUFBRXFOLE9BQWpCLEVBQTBCLElBQTFCLENBQWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0FyTixHQUFFRixNQUFGLEdBQVcsVUFBVWhCLFNBQVYsRUFBcUJzUCxLQUFyQixFQUE0QjtBQUN0QyxNQUFJak0sU0FBU0QsV0FBV3BELFNBQVgsQ0FBYjtBQUNBLE1BQUlzUCxLQUFKLEVBQVdwTyxFQUFFNk4sU0FBRixDQUFZMUwsTUFBWixFQUFvQmlNLEtBQXBCO0FBQ1gsU0FBT2pNLE1BQVA7QUFDQSxFQUpEOztBQU1BO0FBQ0FuQyxHQUFFcU8sS0FBRixHQUFVLFVBQVVwTyxHQUFWLEVBQWU7QUFDeEIsTUFBSSxDQUFDRCxFQUFFcUIsUUFBRixDQUFXcEIsR0FBWCxDQUFMLEVBQXNCLE9BQU9BLEdBQVA7QUFDdEIsU0FBT0QsRUFBRVIsT0FBRixDQUFVUyxHQUFWLElBQWlCQSxJQUFJYixLQUFKLEVBQWpCLEdBQStCWSxFQUFFNE4sTUFBRixDQUFTLEVBQVQsRUFBYTNOLEdBQWIsQ0FBdEM7QUFDQSxFQUhEOztBQUtBO0FBQ0E7QUFDQTtBQUNBRCxHQUFFc08sR0FBRixHQUFRLFVBQVVyTyxHQUFWLEVBQWVzTyxXQUFmLEVBQTRCO0FBQ25DQSxjQUFZdE8sR0FBWjtBQUNBLFNBQU9BLEdBQVA7QUFDQSxFQUhEOztBQUtBO0FBQ0FELEdBQUV3TyxPQUFGLEdBQVksVUFBVXJGLE1BQVYsRUFBa0JqRSxLQUFsQixFQUF5QjtBQUNwQyxNQUFJeEYsT0FBT00sRUFBRU4sSUFBRixDQUFPd0YsS0FBUCxDQUFYO0FBQUEsTUFBMEJyRCxTQUFTbkMsS0FBS21DLE1BQXhDO0FBQ0EsTUFBSXNILFVBQVUsSUFBZCxFQUFvQixPQUFPLENBQUN0SCxNQUFSO0FBQ3BCLE1BQUk1QixNQUFNakIsT0FBT21LLE1BQVAsQ0FBVjtBQUNBLE9BQUssSUFBSW5ILElBQUksQ0FBYixFQUFnQkEsSUFBSUgsTUFBcEIsRUFBNEJHLEdBQTVCLEVBQWlDO0FBQ2hDLE9BQUlDLE1BQU12QyxLQUFLc0MsQ0FBTCxDQUFWO0FBQ0EsT0FBSWtELE1BQU1qRCxHQUFOLE1BQWVoQyxJQUFJZ0MsR0FBSixDQUFmLElBQTJCLEVBQUVBLE9BQU9oQyxHQUFULENBQS9CLEVBQThDLE9BQU8sS0FBUDtBQUM5QztBQUNELFNBQU8sSUFBUDtBQUNBLEVBVEQ7O0FBWUE7QUFDQSxLQUFJd08sS0FBSyxTQUFMQSxFQUFLLENBQVVwSSxDQUFWLEVBQWFDLENBQWIsRUFBZ0JvSSxNQUFoQixFQUF3QkMsTUFBeEIsRUFBZ0M7QUFDeEM7QUFDQTtBQUNBLE1BQUl0SSxNQUFNQyxDQUFWLEVBQWEsT0FBT0QsTUFBTSxDQUFOLElBQVcsSUFBSUEsQ0FBSixLQUFVLElBQUlDLENBQWhDO0FBQ2I7QUFDQSxNQUFJRCxLQUFLLElBQUwsSUFBYUMsS0FBSyxJQUF0QixFQUE0QixPQUFPRCxNQUFNQyxDQUFiO0FBQzVCO0FBQ0EsTUFBSUQsYUFBYXJHLENBQWpCLEVBQW9CcUcsSUFBSUEsRUFBRW5HLFFBQU47QUFDcEIsTUFBSW9HLGFBQWF0RyxDQUFqQixFQUFvQnNHLElBQUlBLEVBQUVwRyxRQUFOO0FBQ3BCO0FBQ0EsTUFBSTBPLFlBQVl2UCxTQUFTc0IsSUFBVCxDQUFjMEYsQ0FBZCxDQUFoQjtBQUNBLE1BQUl1SSxjQUFjdlAsU0FBU3NCLElBQVQsQ0FBYzJGLENBQWQsQ0FBbEIsRUFBb0MsT0FBTyxLQUFQO0FBQ3BDLFVBQVFzSSxTQUFSO0FBQ0M7QUFDQSxRQUFLLGlCQUFMO0FBQ0E7QUFDQSxRQUFLLGlCQUFMO0FBQ0M7QUFDQTtBQUNBLFdBQU8sS0FBS3ZJLENBQUwsS0FBVyxLQUFLQyxDQUF2QjtBQUNELFFBQUssaUJBQUw7QUFDQztBQUNBO0FBQ0EsUUFBSSxDQUFDRCxDQUFELEtBQU8sQ0FBQ0EsQ0FBWixFQUFlLE9BQU8sQ0FBQ0MsQ0FBRCxLQUFPLENBQUNBLENBQWY7QUFDZjtBQUNBLFdBQU8sQ0FBQ0QsQ0FBRCxLQUFPLENBQVAsR0FBVyxJQUFJLENBQUNBLENBQUwsS0FBVyxJQUFJQyxDQUExQixHQUE4QixDQUFDRCxDQUFELEtBQU8sQ0FBQ0MsQ0FBN0M7QUFDRCxRQUFLLGVBQUw7QUFDQSxRQUFLLGtCQUFMO0FBQ0M7QUFDQTtBQUNBO0FBQ0EsV0FBTyxDQUFDRCxDQUFELEtBQU8sQ0FBQ0MsQ0FBZjtBQW5CRjs7QUFzQkEsTUFBSXVJLFlBQVlELGNBQWMsZ0JBQTlCO0FBQ0EsTUFBSSxDQUFDQyxTQUFMLEVBQWdCO0FBQ2YsT0FBSSxRQUFPeEksQ0FBUCx5Q0FBT0EsQ0FBUCxNQUFZLFFBQVosSUFBd0IsUUFBT0MsQ0FBUCx5Q0FBT0EsQ0FBUCxNQUFZLFFBQXhDLEVBQWtELE9BQU8sS0FBUDs7QUFFbEQ7QUFDQTtBQUNBLE9BQUl3SSxRQUFRekksRUFBRTZHLFdBQWQ7QUFBQSxPQUEyQjZCLFFBQVF6SSxFQUFFNEcsV0FBckM7QUFDQSxPQUFJNEIsVUFBVUMsS0FBVixJQUFtQixFQUFFL08sRUFBRW9CLFVBQUYsQ0FBYTBOLEtBQWIsS0FBdUJBLGlCQUFpQkEsS0FBeEMsSUFDeEI5TyxFQUFFb0IsVUFBRixDQUFhMk4sS0FBYixDQUR3QixJQUNEQSxpQkFBaUJBLEtBRGxCLENBQW5CLElBRUMsaUJBQWlCMUksQ0FBakIsSUFBc0IsaUJBQWlCQyxDQUY1QyxFQUVnRDtBQUMvQyxXQUFPLEtBQVA7QUFDQTtBQUNEO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0FvSSxXQUFTQSxVQUFVLEVBQW5CO0FBQ0FDLFdBQVNBLFVBQVUsRUFBbkI7QUFDQSxNQUFJOU0sU0FBUzZNLE9BQU83TSxNQUFwQjtBQUNBLFNBQU9BLFFBQVAsRUFBaUI7QUFDaEI7QUFDQTtBQUNBLE9BQUk2TSxPQUFPN00sTUFBUCxNQUFtQndFLENBQXZCLEVBQTBCLE9BQU9zSSxPQUFPOU0sTUFBUCxNQUFtQnlFLENBQTFCO0FBQzFCOztBQUVEO0FBQ0FvSSxTQUFPdlAsSUFBUCxDQUFZa0gsQ0FBWjtBQUNBc0ksU0FBT3hQLElBQVAsQ0FBWW1ILENBQVo7O0FBRUE7QUFDQSxNQUFJdUksU0FBSixFQUFlO0FBQ2Q7QUFDQWhOLFlBQVN3RSxFQUFFeEUsTUFBWDtBQUNBLE9BQUlBLFdBQVd5RSxFQUFFekUsTUFBakIsRUFBeUIsT0FBTyxLQUFQO0FBQ3pCO0FBQ0EsVUFBT0EsUUFBUCxFQUFpQjtBQUNoQixRQUFJLENBQUM0TSxHQUFHcEksRUFBRXhFLE1BQUYsQ0FBSCxFQUFjeUUsRUFBRXpFLE1BQUYsQ0FBZCxFQUF5QjZNLE1BQXpCLEVBQWlDQyxNQUFqQyxDQUFMLEVBQStDLE9BQU8sS0FBUDtBQUMvQztBQUNELEdBUkQsTUFRTztBQUNOO0FBQ0EsT0FBSWpQLE9BQU9NLEVBQUVOLElBQUYsQ0FBTzJHLENBQVAsQ0FBWDtBQUFBLE9BQXNCcEUsR0FBdEI7QUFDQUosWUFBU25DLEtBQUttQyxNQUFkO0FBQ0E7QUFDQSxPQUFJN0IsRUFBRU4sSUFBRixDQUFPNEcsQ0FBUCxFQUFVekUsTUFBVixLQUFxQkEsTUFBekIsRUFBaUMsT0FBTyxLQUFQO0FBQ2pDLFVBQU9BLFFBQVAsRUFBaUI7QUFDaEI7QUFDQUksVUFBTXZDLEtBQUttQyxNQUFMLENBQU47QUFDQSxRQUFJLEVBQUU3QixFQUFFMEcsR0FBRixDQUFNSixDQUFOLEVBQVNyRSxHQUFULEtBQWlCd00sR0FBR3BJLEVBQUVwRSxHQUFGLENBQUgsRUFBV3FFLEVBQUVyRSxHQUFGLENBQVgsRUFBbUJ5TSxNQUFuQixFQUEyQkMsTUFBM0IsQ0FBbkIsQ0FBSixFQUE0RCxPQUFPLEtBQVA7QUFDNUQ7QUFDRDtBQUNEO0FBQ0FELFNBQU9NLEdBQVA7QUFDQUwsU0FBT0ssR0FBUDtBQUNBLFNBQU8sSUFBUDtBQUNBLEVBMUZEOztBQTRGQTtBQUNBaFAsR0FBRWlQLE9BQUYsR0FBWSxVQUFVNUksQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQzNCLFNBQU9tSSxHQUFHcEksQ0FBSCxFQUFNQyxDQUFOLENBQVA7QUFDQSxFQUZEOztBQUlBO0FBQ0E7QUFDQXRHLEdBQUVrUCxPQUFGLEdBQVksVUFBVWpQLEdBQVYsRUFBZTtBQUMxQixNQUFJQSxPQUFPLElBQVgsRUFBaUIsT0FBTyxJQUFQO0FBQ2pCLE1BQUlzQyxZQUFZdEMsR0FBWixNQUFxQkQsRUFBRVIsT0FBRixDQUFVUyxHQUFWLEtBQWtCRCxFQUFFbVAsUUFBRixDQUFXbFAsR0FBWCxDQUFsQixJQUFxQ0QsRUFBRW1JLFdBQUYsQ0FBY2xJLEdBQWQsQ0FBMUQsQ0FBSixFQUFtRixPQUFPQSxJQUFJNEIsTUFBSixLQUFlLENBQXRCO0FBQ25GLFNBQU83QixFQUFFTixJQUFGLENBQU9PLEdBQVAsRUFBWTRCLE1BQVosS0FBdUIsQ0FBOUI7QUFDQSxFQUpEOztBQU1BO0FBQ0E3QixHQUFFb1AsU0FBRixHQUFjLFVBQVVuUCxHQUFWLEVBQWU7QUFDNUIsU0FBTyxDQUFDLEVBQUVBLE9BQU9BLElBQUlvUCxRQUFKLEtBQWlCLENBQTFCLENBQVI7QUFDQSxFQUZEOztBQUlBO0FBQ0E7QUFDQXJQLEdBQUVSLE9BQUYsR0FBWUQsaUJBQWlCLFVBQVVVLEdBQVYsRUFBZTtBQUMzQyxTQUFPWixTQUFTc0IsSUFBVCxDQUFjVixHQUFkLE1BQXVCLGdCQUE5QjtBQUNBLEVBRkQ7O0FBSUE7QUFDQUQsR0FBRXFCLFFBQUYsR0FBYSxVQUFVcEIsR0FBVixFQUFlO0FBQzNCLE1BQUlxUCxjQUFjclAsR0FBZCx5Q0FBY0EsR0FBZCxDQUFKO0FBQ0EsU0FBT3FQLFNBQVMsVUFBVCxJQUF1QkEsU0FBUyxRQUFULElBQXFCLENBQUMsQ0FBQ3JQLEdBQXJEO0FBQ0EsRUFIRDs7QUFLQTtBQUNBRCxHQUFFd0MsSUFBRixDQUFPLENBQUMsV0FBRCxFQUFjLFVBQWQsRUFBMEIsUUFBMUIsRUFBb0MsUUFBcEMsRUFBOEMsTUFBOUMsRUFBc0QsUUFBdEQsRUFBZ0UsT0FBaEUsQ0FBUCxFQUFpRixVQUFVK00sSUFBVixFQUFnQjtBQUNoR3ZQLElBQUUsT0FBT3VQLElBQVQsSUFBaUIsVUFBVXRQLEdBQVYsRUFBZTtBQUMvQixVQUFPWixTQUFTc0IsSUFBVCxDQUFjVixHQUFkLE1BQXVCLGFBQWFzUCxJQUFiLEdBQW9CLEdBQWxEO0FBQ0EsR0FGRDtBQUdBLEVBSkQ7O0FBTUE7QUFDQTtBQUNBLEtBQUksQ0FBQ3ZQLEVBQUVtSSxXQUFGLENBQWNsSCxTQUFkLENBQUwsRUFBK0I7QUFDOUJqQixJQUFFbUksV0FBRixHQUFnQixVQUFVbEksR0FBVixFQUFlO0FBQzlCLFVBQU9ELEVBQUUwRyxHQUFGLENBQU16RyxHQUFOLEVBQVcsUUFBWCxDQUFQO0FBQ0EsR0FGRDtBQUdBOztBQUVEO0FBQ0E7QUFDQSxLQUFJLE9BQU8sR0FBUCxJQUFjLFVBQWQsSUFBNEIsUUFBT3VQLFNBQVAseUNBQU9BLFNBQVAsTUFBb0IsUUFBcEQsRUFBOEQ7QUFDN0R4UCxJQUFFb0IsVUFBRixHQUFlLFVBQVVuQixHQUFWLEVBQWU7QUFDN0IsVUFBTyxPQUFPQSxHQUFQLElBQWMsVUFBZCxJQUE0QixLQUFuQztBQUNBLEdBRkQ7QUFHQTs7QUFFRDtBQUNBRCxHQUFFeVAsUUFBRixHQUFhLFVBQVV4UCxHQUFWLEVBQWU7QUFDM0IsU0FBT3dQLFNBQVN4UCxHQUFULEtBQWlCLENBQUNvSixNQUFNcUcsV0FBV3pQLEdBQVgsQ0FBTixDQUF6QjtBQUNBLEVBRkQ7O0FBSUE7QUFDQUQsR0FBRXFKLEtBQUYsR0FBVSxVQUFVcEosR0FBVixFQUFlO0FBQ3hCLFNBQU9ELEVBQUUyUCxRQUFGLENBQVcxUCxHQUFYLEtBQW1CQSxRQUFRLENBQUNBLEdBQW5DO0FBQ0EsRUFGRDs7QUFJQTtBQUNBRCxHQUFFMkksU0FBRixHQUFjLFVBQVUxSSxHQUFWLEVBQWU7QUFDNUIsU0FBT0EsUUFBUSxJQUFSLElBQWdCQSxRQUFRLEtBQXhCLElBQWlDWixTQUFTc0IsSUFBVCxDQUFjVixHQUFkLE1BQXVCLGtCQUEvRDtBQUNBLEVBRkQ7O0FBSUE7QUFDQUQsR0FBRTRQLE1BQUYsR0FBVyxVQUFVM1AsR0FBVixFQUFlO0FBQ3pCLFNBQU9BLFFBQVEsSUFBZjtBQUNBLEVBRkQ7O0FBSUE7QUFDQUQsR0FBRTZQLFdBQUYsR0FBZ0IsVUFBVTVQLEdBQVYsRUFBZTtBQUM5QixTQUFPQSxRQUFRLEtBQUssQ0FBcEI7QUFDQSxFQUZEOztBQUlBO0FBQ0E7QUFDQUQsR0FBRTBHLEdBQUYsR0FBUSxVQUFVekcsR0FBVixFQUFlZ0MsR0FBZixFQUFvQjtBQUMzQixTQUFPaEMsT0FBTyxJQUFQLElBQWVYLGVBQWVxQixJQUFmLENBQW9CVixHQUFwQixFQUF5QmdDLEdBQXpCLENBQXRCO0FBQ0EsRUFGRDs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7QUFDQWpDLEdBQUU4UCxVQUFGLEdBQWUsWUFBWTtBQUMxQkMsT0FBSy9QLENBQUwsR0FBU2dRLGtCQUFUO0FBQ0EsU0FBTyxJQUFQO0FBQ0EsRUFIRDs7QUFLQTtBQUNBaFEsR0FBRW1CLFFBQUYsR0FBYSxVQUFVVCxLQUFWLEVBQWlCO0FBQzdCLFNBQU9BLEtBQVA7QUFDQSxFQUZEOztBQUlBO0FBQ0FWLEdBQUVpUSxRQUFGLEdBQWEsVUFBVXZQLEtBQVYsRUFBaUI7QUFDN0IsU0FBTyxZQUFZO0FBQ2xCLFVBQU9BLEtBQVA7QUFDQSxHQUZEO0FBR0EsRUFKRDs7QUFNQVYsR0FBRWtRLElBQUYsR0FBUyxZQUFZLENBQUcsQ0FBeEI7O0FBRUFsUSxHQUFFdUIsUUFBRixHQUFhLFVBQVVVLEdBQVYsRUFBZTtBQUMzQixTQUFPLFVBQVVoQyxHQUFWLEVBQWU7QUFDckIsVUFBT0EsT0FBTyxJQUFQLEdBQWMsS0FBSyxDQUFuQixHQUF1QkEsSUFBSWdDLEdBQUosQ0FBOUI7QUFDQSxHQUZEO0FBR0EsRUFKRDs7QUFNQTtBQUNBakMsR0FBRW1RLFVBQUYsR0FBZSxVQUFVbFEsR0FBVixFQUFlO0FBQzdCLFNBQU9BLE9BQU8sSUFBUCxHQUFjLFlBQVksQ0FBRyxDQUE3QixHQUFnQyxVQUFVZ0MsR0FBVixFQUFlO0FBQ3JELFVBQU9oQyxJQUFJZ0MsR0FBSixDQUFQO0FBQ0EsR0FGRDtBQUdBLEVBSkQ7O0FBTUE7QUFDQTtBQUNBakMsR0FBRXNCLE9BQUYsR0FBWXRCLEVBQUVvUSxPQUFGLEdBQVksVUFBVWxMLEtBQVYsRUFBaUI7QUFDeENBLFVBQVFsRixFQUFFNk4sU0FBRixDQUFZLEVBQVosRUFBZ0IzSSxLQUFoQixDQUFSO0FBQ0EsU0FBTyxVQUFVakYsR0FBVixFQUFlO0FBQ3JCLFVBQU9ELEVBQUV3TyxPQUFGLENBQVV2TyxHQUFWLEVBQWVpRixLQUFmLENBQVA7QUFDQSxHQUZEO0FBR0EsRUFMRDs7QUFPQTtBQUNBbEYsR0FBRTBNLEtBQUYsR0FBVSxVQUFVNUcsQ0FBVixFQUFhdEUsUUFBYixFQUF1QmhCLE9BQXZCLEVBQWdDO0FBQ3pDLE1BQUk2UCxRQUFReFIsTUFBTXdELEtBQUsrQyxHQUFMLENBQVMsQ0FBVCxFQUFZVSxDQUFaLENBQU4sQ0FBWjtBQUNBdEUsYUFBV2xCLFdBQVdrQixRQUFYLEVBQXFCaEIsT0FBckIsRUFBOEIsQ0FBOUIsQ0FBWDtBQUNBLE9BQUssSUFBSXdCLElBQUksQ0FBYixFQUFnQkEsSUFBSThELENBQXBCLEVBQXVCOUQsR0FBdkI7QUFBNEJxTyxTQUFNck8sQ0FBTixJQUFXUixTQUFTUSxDQUFULENBQVg7QUFBNUIsR0FDQSxPQUFPcU8sS0FBUDtBQUNBLEVBTEQ7O0FBT0E7QUFDQXJRLEdBQUU0RixNQUFGLEdBQVcsVUFBVUwsR0FBVixFQUFlSCxHQUFmLEVBQW9CO0FBQzlCLE1BQUlBLE9BQU8sSUFBWCxFQUFpQjtBQUNoQkEsU0FBTUcsR0FBTjtBQUNBQSxTQUFNLENBQU47QUFDQTtBQUNELFNBQU9BLE1BQU1sRCxLQUFLd0gsS0FBTCxDQUFXeEgsS0FBS3VELE1BQUwsTUFBaUJSLE1BQU1HLEdBQU4sR0FBWSxDQUE3QixDQUFYLENBQWI7QUFDQSxFQU5EOztBQVFBO0FBQ0F2RixHQUFFOEwsR0FBRixHQUFRd0UsS0FBS3hFLEdBQUwsSUFBWSxZQUFZO0FBQy9CLFNBQU8sSUFBSXdFLElBQUosR0FBV0MsT0FBWCxFQUFQO0FBQ0EsRUFGRDs7QUFJQTtBQUNBLEtBQUlDLFlBQVk7QUFDZixPQUFLLE9BRFU7QUFFZixPQUFLLE1BRlU7QUFHZixPQUFLLE1BSFU7QUFJZixPQUFLLFFBSlU7QUFLZixPQUFLLFFBTFU7QUFNZixPQUFLO0FBTlUsRUFBaEI7QUFRQSxLQUFJQyxjQUFjelEsRUFBRXdOLE1BQUYsQ0FBU2dELFNBQVQsQ0FBbEI7O0FBRUE7QUFDQSxLQUFJRSxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVVoTyxHQUFWLEVBQWU7QUFDbEMsTUFBSWlPLFVBQVUsU0FBVkEsT0FBVSxDQUFVQyxLQUFWLEVBQWlCO0FBQzlCLFVBQU9sTyxJQUFJa08sS0FBSixDQUFQO0FBQ0EsR0FGRDtBQUdBO0FBQ0EsTUFBSTlPLFNBQVMsUUFBUTlCLEVBQUVOLElBQUYsQ0FBT2dELEdBQVAsRUFBWW1PLElBQVosQ0FBaUIsR0FBakIsQ0FBUixHQUFnQyxHQUE3QztBQUNBLE1BQUlDLGFBQWFDLE9BQU9qUCxNQUFQLENBQWpCO0FBQ0EsTUFBSWtQLGdCQUFnQkQsT0FBT2pQLE1BQVAsRUFBZSxHQUFmLENBQXBCO0FBQ0EsU0FBTyxVQUFVbVAsTUFBVixFQUFrQjtBQUN4QkEsWUFBU0EsVUFBVSxJQUFWLEdBQWlCLEVBQWpCLEdBQXNCLEtBQUtBLE1BQXBDO0FBQ0EsVUFBT0gsV0FBV0ksSUFBWCxDQUFnQkQsTUFBaEIsSUFBMEJBLE9BQU9FLE9BQVAsQ0FBZUgsYUFBZixFQUE4QkwsT0FBOUIsQ0FBMUIsR0FBbUVNLE1BQTFFO0FBQ0EsR0FIRDtBQUlBLEVBWkQ7QUFhQWpSLEdBQUVvUixNQUFGLEdBQVdWLGNBQWNGLFNBQWQsQ0FBWDtBQUNBeFEsR0FBRXFSLFFBQUYsR0FBYVgsY0FBY0QsV0FBZCxDQUFiOztBQUVBO0FBQ0E7QUFDQXpRLEdBQUVtQyxNQUFGLEdBQVcsVUFBVWdILE1BQVYsRUFBa0I1SCxRQUFsQixFQUE0QitQLFFBQTVCLEVBQXNDO0FBQ2hELE1BQUk1USxRQUFReUksVUFBVSxJQUFWLEdBQWlCLEtBQUssQ0FBdEIsR0FBMEJBLE9BQU81SCxRQUFQLENBQXRDO0FBQ0EsTUFBSWIsVUFBVSxLQUFLLENBQW5CLEVBQXNCO0FBQ3JCQSxXQUFRNFEsUUFBUjtBQUNBO0FBQ0QsU0FBT3RSLEVBQUVvQixVQUFGLENBQWFWLEtBQWIsSUFBc0JBLE1BQU1DLElBQU4sQ0FBV3dJLE1BQVgsQ0FBdEIsR0FBMkN6SSxLQUFsRDtBQUNBLEVBTkQ7O0FBUUE7QUFDQTtBQUNBLEtBQUk2USxZQUFZLENBQWhCO0FBQ0F2UixHQUFFd1IsUUFBRixHQUFhLFVBQVVDLE1BQVYsRUFBa0I7QUFDOUIsTUFBSUMsS0FBSyxFQUFFSCxTQUFGLEdBQWMsRUFBdkI7QUFDQSxTQUFPRSxTQUFTQSxTQUFTQyxFQUFsQixHQUF1QkEsRUFBOUI7QUFDQSxFQUhEOztBQUtBO0FBQ0E7QUFDQTFSLEdBQUUyUixnQkFBRixHQUFxQjtBQUNwQkMsWUFBVSxpQkFEVTtBQUVwQkMsZUFBYSxrQkFGTztBQUdwQlQsVUFBUTtBQUhZLEVBQXJCOztBQU1BO0FBQ0E7QUFDQTtBQUNBLEtBQUlVLFVBQVUsTUFBZDs7QUFFQTtBQUNBO0FBQ0EsS0FBSUMsVUFBVTtBQUNiLE9BQUssR0FEUTtBQUViLFFBQU0sSUFGTztBQUdiLFFBQU0sR0FITztBQUliLFFBQU0sR0FKTztBQUtiLFlBQVUsT0FMRztBQU1iLFlBQVU7QUFORyxFQUFkOztBQVNBLEtBQUlwQixVQUFVLDJCQUFkOztBQUVBLEtBQUlxQixhQUFhLFNBQWJBLFVBQWEsQ0FBVXBCLEtBQVYsRUFBaUI7QUFDakMsU0FBTyxPQUFPbUIsUUFBUW5CLEtBQVIsQ0FBZDtBQUNBLEVBRkQ7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTVRLEdBQUVpUyxRQUFGLEdBQWEsVUFBVUMsSUFBVixFQUFnQkMsUUFBaEIsRUFBMEJDLFdBQTFCLEVBQXVDO0FBQ25ELE1BQUksQ0FBQ0QsUUFBRCxJQUFhQyxXQUFqQixFQUE4QkQsV0FBV0MsV0FBWDtBQUM5QkQsYUFBV25TLEVBQUVtTyxRQUFGLENBQVcsRUFBWCxFQUFlZ0UsUUFBZixFQUF5Qm5TLEVBQUUyUixnQkFBM0IsQ0FBWDs7QUFFQTtBQUNBLE1BQUlyUSxVQUFVeVAsT0FBTyxDQUNwQixDQUFDb0IsU0FBU2YsTUFBVCxJQUFtQlUsT0FBcEIsRUFBNkJoUSxNQURULEVBRXBCLENBQUNxUSxTQUFTTixXQUFULElBQXdCQyxPQUF6QixFQUFrQ2hRLE1BRmQsRUFHcEIsQ0FBQ3FRLFNBQVNQLFFBQVQsSUFBcUJFLE9BQXRCLEVBQStCaFEsTUFIWCxFQUluQitPLElBSm1CLENBSWQsR0FKYyxJQUlQLElBSkEsRUFJTSxHQUpOLENBQWQ7O0FBTUE7QUFDQSxNQUFJaFEsUUFBUSxDQUFaO0FBQ0EsTUFBSWlCLFNBQVMsUUFBYjtBQUNBb1EsT0FBS2YsT0FBTCxDQUFhN1AsT0FBYixFQUFzQixVQUFVc1AsS0FBVixFQUFpQlEsTUFBakIsRUFBeUJTLFdBQXpCLEVBQXNDRCxRQUF0QyxFQUFnRFMsTUFBaEQsRUFBd0Q7QUFDN0V2USxhQUFVb1EsS0FBSzlTLEtBQUwsQ0FBV3lCLEtBQVgsRUFBa0J3UixNQUFsQixFQUEwQmxCLE9BQTFCLENBQWtDUixPQUFsQyxFQUEyQ3FCLFVBQTNDLENBQVY7QUFDQW5SLFdBQVF3UixTQUFTekIsTUFBTS9PLE1BQXZCOztBQUVBLE9BQUl1UCxNQUFKLEVBQVk7QUFDWHRQLGNBQVUsZ0JBQWdCc1AsTUFBaEIsR0FBeUIsZ0NBQW5DO0FBQ0EsSUFGRCxNQUVPLElBQUlTLFdBQUosRUFBaUI7QUFDdkIvUCxjQUFVLGdCQUFnQitQLFdBQWhCLEdBQThCLHNCQUF4QztBQUNBLElBRk0sTUFFQSxJQUFJRCxRQUFKLEVBQWM7QUFDcEI5UCxjQUFVLFNBQVM4UCxRQUFULEdBQW9CLFVBQTlCO0FBQ0E7O0FBRUQ7QUFDQSxVQUFPaEIsS0FBUDtBQUNBLEdBZEQ7QUFlQTlPLFlBQVUsTUFBVjs7QUFFQTtBQUNBLE1BQUksQ0FBQ3FRLFNBQVNHLFFBQWQsRUFBd0J4USxTQUFTLHFCQUFxQkEsTUFBckIsR0FBOEIsS0FBdkM7O0FBRXhCQSxXQUFTLDZDQUNSLG1EQURRLEdBRVJBLE1BRlEsR0FFQyxlQUZWOztBQUlBLE1BQUk7QUFDSCxPQUFJeVEsU0FBUyxJQUFJclQsUUFBSixDQUFhaVQsU0FBU0csUUFBVCxJQUFxQixLQUFsQyxFQUF5QyxHQUF6QyxFQUE4Q3hRLE1BQTlDLENBQWI7QUFDQSxHQUZELENBRUUsT0FBTzBRLENBQVAsRUFBVTtBQUNYQSxLQUFFMVEsTUFBRixHQUFXQSxNQUFYO0FBQ0EsU0FBTTBRLENBQU47QUFDQTs7QUFFRCxNQUFJUCxXQUFXLFNBQVhBLFFBQVcsQ0FBVVEsSUFBVixFQUFnQjtBQUM5QixVQUFPRixPQUFPNVIsSUFBUCxDQUFZLElBQVosRUFBa0I4UixJQUFsQixFQUF3QnpTLENBQXhCLENBQVA7QUFDQSxHQUZEOztBQUlBO0FBQ0EsTUFBSTBTLFdBQVdQLFNBQVNHLFFBQVQsSUFBcUIsS0FBcEM7QUFDQUwsV0FBU25RLE1BQVQsR0FBa0IsY0FBYzRRLFFBQWQsR0FBeUIsTUFBekIsR0FBa0M1USxNQUFsQyxHQUEyQyxHQUE3RDs7QUFFQSxTQUFPbVEsUUFBUDtBQUNBLEVBdEREOztBQXdEQTtBQUNBalMsR0FBRTJTLEtBQUYsR0FBVSxVQUFVMVMsR0FBVixFQUFlO0FBQ3hCLE1BQUkyUyxXQUFXNVMsRUFBRUMsR0FBRixDQUFmO0FBQ0EyUyxXQUFTQyxNQUFULEdBQWtCLElBQWxCO0FBQ0EsU0FBT0QsUUFBUDtBQUNBLEVBSkQ7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUl6USxTQUFTLFNBQVRBLE1BQVMsQ0FBVXlRLFFBQVYsRUFBb0IzUyxHQUFwQixFQUF5QjtBQUNyQyxTQUFPMlMsU0FBU0MsTUFBVCxHQUFrQjdTLEVBQUVDLEdBQUYsRUFBTzBTLEtBQVAsRUFBbEIsR0FBbUMxUyxHQUExQztBQUNBLEVBRkQ7O0FBSUE7QUFDQUQsR0FBRThTLEtBQUYsR0FBVSxVQUFVN1MsR0FBVixFQUFlO0FBQ3hCRCxJQUFFd0MsSUFBRixDQUFPeEMsRUFBRXlOLFNBQUYsQ0FBWXhOLEdBQVosQ0FBUCxFQUF5QixVQUFVc1AsSUFBVixFQUFnQjtBQUN4QyxPQUFJaFAsT0FBT1AsRUFBRXVQLElBQUYsSUFBVXRQLElBQUlzUCxJQUFKLENBQXJCO0FBQ0F2UCxLQUFFbEIsU0FBRixDQUFZeVEsSUFBWixJQUFvQixZQUFZO0FBQy9CLFFBQUl6SyxPQUFPLENBQUMsS0FBSzVFLFFBQU4sQ0FBWDtBQUNBZixTQUFLNkIsS0FBTCxDQUFXOEQsSUFBWCxFQUFpQjdELFNBQWpCO0FBQ0EsV0FBT2tCLE9BQU8sSUFBUCxFQUFhNUIsS0FBS1MsS0FBTCxDQUFXaEIsQ0FBWCxFQUFjOEUsSUFBZCxDQUFiLENBQVA7QUFDQSxJQUpEO0FBS0EsR0FQRDtBQVFBLEVBVEQ7O0FBV0E7QUFDQTlFLEdBQUU4UyxLQUFGLENBQVE5UyxDQUFSOztBQUVBO0FBQ0FBLEdBQUV3QyxJQUFGLENBQU8sQ0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixTQUFoQixFQUEyQixPQUEzQixFQUFvQyxNQUFwQyxFQUE0QyxRQUE1QyxFQUFzRCxTQUF0RCxDQUFQLEVBQXlFLFVBQVUrTSxJQUFWLEVBQWdCO0FBQ3hGLE1BQUkxSyxTQUFTakcsV0FBVzJRLElBQVgsQ0FBYjtBQUNBdlAsSUFBRWxCLFNBQUYsQ0FBWXlRLElBQVosSUFBb0IsWUFBWTtBQUMvQixPQUFJdFAsTUFBTSxLQUFLQyxRQUFmO0FBQ0EyRSxVQUFPN0QsS0FBUCxDQUFhZixHQUFiLEVBQWtCZ0IsU0FBbEI7QUFDQSxPQUFJLENBQUNzTyxTQUFTLE9BQVQsSUFBb0JBLFNBQVMsUUFBOUIsS0FBMkN0UCxJQUFJNEIsTUFBSixLQUFlLENBQTlELEVBQWlFLE9BQU81QixJQUFJLENBQUosQ0FBUDtBQUNqRSxVQUFPa0MsT0FBTyxJQUFQLEVBQWFsQyxHQUFiLENBQVA7QUFDQSxHQUxEO0FBTUEsRUFSRDs7QUFVQTtBQUNBRCxHQUFFd0MsSUFBRixDQUFPLENBQUMsUUFBRCxFQUFXLE1BQVgsRUFBbUIsT0FBbkIsQ0FBUCxFQUFvQyxVQUFVK00sSUFBVixFQUFnQjtBQUNuRCxNQUFJMUssU0FBU2pHLFdBQVcyUSxJQUFYLENBQWI7QUFDQXZQLElBQUVsQixTQUFGLENBQVl5USxJQUFaLElBQW9CLFlBQVk7QUFDL0IsVUFBT3BOLE9BQU8sSUFBUCxFQUFhMEMsT0FBTzdELEtBQVAsQ0FBYSxLQUFLZCxRQUFsQixFQUE0QmUsU0FBNUIsQ0FBYixDQUFQO0FBQ0EsR0FGRDtBQUdBLEVBTEQ7O0FBT0E7QUFDQWpCLEdBQUVsQixTQUFGLENBQVk0QixLQUFaLEdBQW9CLFlBQVk7QUFDL0IsU0FBTyxLQUFLUixRQUFaO0FBQ0EsRUFGRDs7QUFJQTtBQUNBO0FBQ0FGLEdBQUVsQixTQUFGLENBQVlpVSxPQUFaLEdBQXNCL1MsRUFBRWxCLFNBQUYsQ0FBWWtVLE1BQVosR0FBcUJoVCxFQUFFbEIsU0FBRixDQUFZNEIsS0FBdkQ7O0FBRUFWLEdBQUVsQixTQUFGLENBQVlPLFFBQVosR0FBdUIsWUFBWTtBQUNsQyxTQUFPLEtBQUssS0FBS2EsUUFBakI7QUFDQSxFQUZEOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBbmdEQSxFQW1nRENTLElBbmdERCxXQUFEIiwiZmlsZSI6InVuZGVyc2NvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjguMlxyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cclxuXHQvLyBCYXNlbGluZSBzZXR1cFxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdC8vIEVzdGFibGlzaCB0aGUgcm9vdCBvYmplY3QsIGB3aW5kb3dgIGluIHRoZSBicm93c2VyLCBvciBgZXhwb3J0c2Agb24gdGhlIHNlcnZlci5cclxuXHQvLyAgIHZhciByb290ID0gdGhpcztcclxuXHJcblx0Ly8gICAvLyBTYXZlIHRoZSBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgYF9gIHZhcmlhYmxlLlxyXG5cdC8vICAgdmFyIHByZXZpb3VzVW5kZXJzY29yZSA9IHJvb3QuXztcclxuXHJcblx0Ly8gU2F2ZSBieXRlcyBpbiB0aGUgbWluaWZpZWQgKGJ1dCBub3QgZ3ppcHBlZCkgdmVyc2lvbjpcclxuXHR2YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSwgT2JqUHJvdG8gPSBPYmplY3QucHJvdG90eXBlLCBGdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XHJcblxyXG5cdC8vIENyZWF0ZSBxdWljayByZWZlcmVuY2UgdmFyaWFibGVzIGZvciBzcGVlZCBhY2Nlc3MgdG8gY29yZSBwcm90b3R5cGVzLlxyXG5cdHZhclxyXG5cdFx0cHVzaCA9IEFycmF5UHJvdG8ucHVzaCxcclxuXHRcdHNsaWNlID0gQXJyYXlQcm90by5zbGljZSxcclxuXHRcdHRvU3RyaW5nID0gT2JqUHJvdG8udG9TdHJpbmcsXHJcblx0XHRoYXNPd25Qcm9wZXJ0eSA9IE9ialByb3RvLmhhc093blByb3BlcnR5O1xyXG5cclxuXHQvLyBBbGwgKipFQ01BU2NyaXB0IDUqKiBuYXRpdmUgZnVuY3Rpb24gaW1wbGVtZW50YXRpb25zIHRoYXQgd2UgaG9wZSB0byB1c2VcclxuXHQvLyBhcmUgZGVjbGFyZWQgaGVyZS5cclxuXHR2YXJcclxuXHRcdG5hdGl2ZUlzQXJyYXkgPSBBcnJheS5pc0FycmF5LFxyXG5cdFx0bmF0aXZlS2V5cyA9IE9iamVjdC5rZXlzLFxyXG5cdFx0bmF0aXZlQmluZCA9IEZ1bmNQcm90by5iaW5kLFxyXG5cdFx0bmF0aXZlQ3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcclxuXHJcblx0Ly8gTmFrZWQgZnVuY3Rpb24gcmVmZXJlbmNlIGZvciBzdXJyb2dhdGUtcHJvdG90eXBlLXN3YXBwaW5nLlxyXG5cdHZhciBDdG9yID0gZnVuY3Rpb24gKCkgeyB9O1xyXG5cclxuXHQvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cclxuXHR2YXIgXyA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdGlmIChvYmogaW5zdGFuY2VvZiBfKSByZXR1cm4gb2JqO1xyXG5cdFx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIF8pKSByZXR1cm4gbmV3IF8ob2JqKTtcclxuXHRcdHRoaXMuX3dyYXBwZWQgPSBvYmo7XHJcblx0fTtcclxuXHJcblx0Ly8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcclxuXHQvLyBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSBmb3IgdGhlIG9sZCBgcmVxdWlyZSgpYCBBUEkuIElmIHdlJ3JlIGluXHJcblx0Ly8gdGhlIGJyb3dzZXIsIGFkZCBgX2AgYXMgYSBnbG9iYWwgb2JqZWN0LlxyXG5cdC8vICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xyXG5cdC8vICAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuXHQvLyAgICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfO1xyXG5cdC8vICAgICB9XHJcblx0Ly8gICAgIGV4cG9ydHMuXyA9IF87XHJcblx0Ly8gICB9IGVsc2Uge1xyXG5cdC8vICAgICByb290Ll8gPSBfO1xyXG5cdC8vICAgfVxyXG5cdG1vZHVsZS5leHBvcnRzID0gXztcclxuXHQvLyBDdXJyZW50IHZlcnNpb24uXHJcblx0Xy5WRVJTSU9OID0gJzEuOC4yJztcclxuXHJcblx0Ly8gSW50ZXJuYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGVmZmljaWVudCAoZm9yIGN1cnJlbnQgZW5naW5lcykgdmVyc2lvblxyXG5cdC8vIG9mIHRoZSBwYXNzZWQtaW4gY2FsbGJhY2ssIHRvIGJlIHJlcGVhdGVkbHkgYXBwbGllZCBpbiBvdGhlciBVbmRlcnNjb3JlXHJcblx0Ly8gZnVuY3Rpb25zLlxyXG5cdHZhciBvcHRpbWl6ZUNiID0gZnVuY3Rpb24gKGZ1bmMsIGNvbnRleHQsIGFyZ0NvdW50KSB7XHJcblx0XHRpZiAoY29udGV4dCA9PT0gdm9pZCAwKSByZXR1cm4gZnVuYztcclxuXHRcdHN3aXRjaCAoYXJnQ291bnQgPT0gbnVsbCA/IDMgOiBhcmdDb3VudCkge1xyXG5cdFx0XHRjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0XHRyZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIHZhbHVlKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Y2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBvdGhlcikge1xyXG5cdFx0XHRcdHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIG90aGVyKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Y2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xyXG5cdFx0XHRcdHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Y2FzZSA0OiByZXR1cm4gZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcclxuXHRcdFx0XHRyZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0Ly8gQSBtb3N0bHktaW50ZXJuYWwgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgY2FsbGJhY2tzIHRoYXQgY2FuIGJlIGFwcGxpZWRcclxuXHQvLyB0byBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLCByZXR1cm5pbmcgdGhlIGRlc2lyZWQgcmVzdWx0IOmIpe+/vSBlaXRoZXJcclxuXHQvLyBpZGVudGl0eSwgYW4gYXJiaXRyYXJ5IGNhbGxiYWNrLCBhIHByb3BlcnR5IG1hdGNoZXIsIG9yIGEgcHJvcGVydHkgYWNjZXNzb3IuXHJcblx0dmFyIGNiID0gZnVuY3Rpb24gKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCkge1xyXG5cdFx0aWYgKHZhbHVlID09IG51bGwpIHJldHVybiBfLmlkZW50aXR5O1xyXG5cdFx0aWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybiBvcHRpbWl6ZUNiKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCk7XHJcblx0XHRpZiAoXy5pc09iamVjdCh2YWx1ZSkpIHJldHVybiBfLm1hdGNoZXIodmFsdWUpO1xyXG5cdFx0cmV0dXJuIF8ucHJvcGVydHkodmFsdWUpO1xyXG5cdH07XHJcblx0Xy5pdGVyYXRlZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29udGV4dCkge1xyXG5cdFx0cmV0dXJuIGNiKHZhbHVlLCBjb250ZXh0LCBJbmZpbml0eSk7XHJcblx0fTtcclxuXHJcblx0Ly8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGFzc2lnbmVyIGZ1bmN0aW9ucy5cclxuXHR2YXIgY3JlYXRlQXNzaWduZXIgPSBmdW5jdGlvbiAoa2V5c0Z1bmMsIHVuZGVmaW5lZE9ubHkpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRcdHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xyXG5cdFx0XHRpZiAobGVuZ3RoIDwgMiB8fCBvYmogPT0gbnVsbCkgcmV0dXJuIG9iajtcclxuXHRcdFx0Zm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG5cdFx0XHRcdHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdLFxyXG5cdFx0XHRcdFx0a2V5cyA9IGtleXNGdW5jKHNvdXJjZSksXHJcblx0XHRcdFx0XHRsID0ga2V5cy5sZW5ndGg7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuXHRcdFx0XHRcdHZhciBrZXkgPSBrZXlzW2ldO1xyXG5cdFx0XHRcdFx0aWYgKCF1bmRlZmluZWRPbmx5IHx8IG9ialtrZXldID09PSB2b2lkIDApIG9ialtrZXldID0gc291cmNlW2tleV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBvYmo7XHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIGFub3RoZXIuXHJcblx0dmFyIGJhc2VDcmVhdGUgPSBmdW5jdGlvbiAocHJvdG90eXBlKSB7XHJcblx0XHRpZiAoIV8uaXNPYmplY3QocHJvdG90eXBlKSkgcmV0dXJuIHt9O1xyXG5cdFx0aWYgKG5hdGl2ZUNyZWF0ZSkgcmV0dXJuIG5hdGl2ZUNyZWF0ZShwcm90b3R5cGUpO1xyXG5cdFx0Q3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XHJcblx0XHR2YXIgcmVzdWx0ID0gbmV3IEN0b3I7XHJcblx0XHRDdG9yLnByb3RvdHlwZSA9IG51bGw7XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH07XHJcblxyXG5cdC8vIEhlbHBlciBmb3IgY29sbGVjdGlvbiBtZXRob2RzIHRvIGRldGVybWluZSB3aGV0aGVyIGEgY29sbGVjdGlvblxyXG5cdC8vIHNob3VsZCBiZSBpdGVyYXRlZCBhcyBhbiBhcnJheSBvciBhcyBhbiBvYmplY3RcclxuXHQvLyBSZWxhdGVkOiBodHRwOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aFxyXG5cdHZhciBNQVhfQVJSQVlfSU5ERVggPSBNYXRoLnBvdygyLCA1MykgLSAxO1xyXG5cdHZhciBpc0FycmF5TGlrZSA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uKSB7XHJcblx0XHR2YXIgbGVuZ3RoID0gY29sbGVjdGlvbiAhPSBudWxsICYmIGNvbGxlY3Rpb24ubGVuZ3RoO1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicgJiYgbGVuZ3RoID49IDAgJiYgbGVuZ3RoIDw9IE1BWF9BUlJBWV9JTkRFWDtcclxuXHR9O1xyXG5cclxuXHQvLyBDb2xsZWN0aW9uIEZ1bmN0aW9uc1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdC8vIFRoZSBjb3JuZXJzdG9uZSwgYW4gYGVhY2hgIGltcGxlbWVudGF0aW9uLCBha2EgYGZvckVhY2hgLlxyXG5cdC8vIEhhbmRsZXMgcmF3IG9iamVjdHMgaW4gYWRkaXRpb24gdG8gYXJyYXktbGlrZXMuIFRyZWF0cyBhbGxcclxuXHQvLyBzcGFyc2UgYXJyYXktbGlrZXMgYXMgaWYgdGhleSB3ZXJlIGRlbnNlLlxyXG5cdF8uZWFjaCA9IF8uZm9yRWFjaCA9IGZ1bmN0aW9uIChvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcblx0XHRpdGVyYXRlZSA9IG9wdGltaXplQ2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xyXG5cdFx0dmFyIGksIGxlbmd0aDtcclxuXHRcdGlmIChpc0FycmF5TGlrZShvYmopKSB7XHJcblx0XHRcdGZvciAoaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGl0ZXJhdGVlKG9ialtpXSwgaSwgb2JqKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGtleXMgPSBfLmtleXMob2JqKTtcclxuXHRcdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGl0ZXJhdGVlKG9ialtrZXlzW2ldXSwga2V5c1tpXSwgb2JqKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG9iajtcclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm4gdGhlIHJlc3VsdHMgb2YgYXBwbHlpbmcgdGhlIGl0ZXJhdGVlIHRvIGVhY2ggZWxlbWVudC5cclxuXHRfLm1hcCA9IF8uY29sbGVjdCA9IGZ1bmN0aW9uIChvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcblx0XHRpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcclxuXHRcdHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXHJcblx0XHRcdGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxyXG5cdFx0XHRyZXN1bHRzID0gQXJyYXkobGVuZ3RoKTtcclxuXHRcdGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcclxuXHRcdFx0cmVzdWx0c1tpbmRleF0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0cztcclxuXHR9O1xyXG5cclxuXHQvLyBDcmVhdGUgYSByZWR1Y2luZyBmdW5jdGlvbiBpdGVyYXRpbmcgbGVmdCBvciByaWdodC5cclxuXHRmdW5jdGlvbiBjcmVhdGVSZWR1Y2UoZGlyKSB7XHJcblx0XHQvLyBPcHRpbWl6ZWQgaXRlcmF0b3IgZnVuY3Rpb24gYXMgdXNpbmcgYXJndW1lbnRzLmxlbmd0aFxyXG5cdFx0Ly8gaW4gdGhlIG1haW4gZnVuY3Rpb24gd2lsbCBkZW9wdGltaXplIHRoZSwgc2VlICMxOTkxLlxyXG5cdFx0ZnVuY3Rpb24gaXRlcmF0b3Iob2JqLCBpdGVyYXRlZSwgbWVtbywga2V5cywgaW5kZXgsIGxlbmd0aCkge1xyXG5cdFx0XHRmb3IgKDsgaW5kZXggPj0gMCAmJiBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gZGlyKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcclxuXHRcdFx0XHRtZW1vID0gaXRlcmF0ZWUobWVtbywgb2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmdW5jdGlvbiAob2JqLCBpdGVyYXRlZSwgbWVtbywgY29udGV4dCkge1xyXG5cdFx0XHRpdGVyYXRlZSA9IG9wdGltaXplQ2IoaXRlcmF0ZWUsIGNvbnRleHQsIDQpO1xyXG5cdFx0XHR2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxyXG5cdFx0XHRcdGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxyXG5cdFx0XHRcdGluZGV4ID0gZGlyID4gMCA/IDAgOiBsZW5ndGggLSAxO1xyXG5cdFx0XHQvLyBEZXRlcm1pbmUgdGhlIGluaXRpYWwgdmFsdWUgaWYgbm9uZSBpcyBwcm92aWRlZC5cclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XHJcblx0XHRcdFx0bWVtbyA9IG9ialtrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleF07XHJcblx0XHRcdFx0aW5kZXggKz0gZGlyO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBpdGVyYXRvcihvYmosIGl0ZXJhdGVlLCBtZW1vLCBrZXlzLCBpbmRleCwgbGVuZ3RoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvLyAqKlJlZHVjZSoqIGJ1aWxkcyB1cCBhIHNpbmdsZSByZXN1bHQgZnJvbSBhIGxpc3Qgb2YgdmFsdWVzLCBha2EgYGluamVjdGAsXHJcblx0Ly8gb3IgYGZvbGRsYC5cclxuXHRfLnJlZHVjZSA9IF8uZm9sZGwgPSBfLmluamVjdCA9IGNyZWF0ZVJlZHVjZSgxKTtcclxuXHJcblx0Ly8gVGhlIHJpZ2h0LWFzc29jaWF0aXZlIHZlcnNpb24gb2YgcmVkdWNlLCBhbHNvIGtub3duIGFzIGBmb2xkcmAuXHJcblx0Xy5yZWR1Y2VSaWdodCA9IF8uZm9sZHIgPSBjcmVhdGVSZWR1Y2UoLTEpO1xyXG5cclxuXHQvLyBSZXR1cm4gdGhlIGZpcnN0IHZhbHVlIHdoaWNoIHBhc3NlcyBhIHRydXRoIHRlc3QuIEFsaWFzZWQgYXMgYGRldGVjdGAuXHJcblx0Xy5maW5kID0gXy5kZXRlY3QgPSBmdW5jdGlvbiAob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcclxuXHRcdHZhciBrZXk7XHJcblx0XHRpZiAoaXNBcnJheUxpa2Uob2JqKSkge1xyXG5cdFx0XHRrZXkgPSBfLmZpbmRJbmRleChvYmosIHByZWRpY2F0ZSwgY29udGV4dCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRrZXkgPSBfLmZpbmRLZXkob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGtleSAhPT0gdm9pZCAwICYmIGtleSAhPT0gLTEpIHJldHVybiBvYmpba2V5XTtcclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyB0aGF0IHBhc3MgYSB0cnV0aCB0ZXN0LlxyXG5cdC8vIEFsaWFzZWQgYXMgYHNlbGVjdGAuXHJcblx0Xy5maWx0ZXIgPSBfLnNlbGVjdCA9IGZ1bmN0aW9uIChvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xyXG5cdFx0dmFyIHJlc3VsdHMgPSBbXTtcclxuXHRcdHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XHJcblx0XHRfLmVhY2gob2JqLCBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBsaXN0KSB7XHJcblx0XHRcdGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBsaXN0KSkgcmVzdWx0cy5wdXNoKHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHJlc3VsdHM7XHJcblx0fTtcclxuXHJcblx0Ly8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgZm9yIHdoaWNoIGEgdHJ1dGggdGVzdCBmYWlscy5cclxuXHRfLnJlamVjdCA9IGZ1bmN0aW9uIChvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xyXG5cdFx0cmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5uZWdhdGUoY2IocHJlZGljYXRlKSksIGNvbnRleHQpO1xyXG5cdH07XHJcblxyXG5cdC8vIERldGVybWluZSB3aGV0aGVyIGFsbCBvZiB0aGUgZWxlbWVudHMgbWF0Y2ggYSB0cnV0aCB0ZXN0LlxyXG5cdC8vIEFsaWFzZWQgYXMgYGFsbGAuXHJcblx0Xy5ldmVyeSA9IF8uYWxsID0gZnVuY3Rpb24gKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XHJcblx0XHRwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xyXG5cdFx0dmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcclxuXHRcdFx0bGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGg7XHJcblx0XHRmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcblx0XHRcdHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XHJcblx0XHRcdGlmICghcHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fTtcclxuXHJcblx0Ly8gRGV0ZXJtaW5lIGlmIGF0IGxlYXN0IG9uZSBlbGVtZW50IGluIHRoZSBvYmplY3QgbWF0Y2hlcyBhIHRydXRoIHRlc3QuXHJcblx0Ly8gQWxpYXNlZCBhcyBgYW55YC5cclxuXHRfLnNvbWUgPSBfLmFueSA9IGZ1bmN0aW9uIChvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xyXG5cdFx0cHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcclxuXHRcdHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXHJcblx0XHRcdGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xyXG5cdFx0XHR2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xyXG5cdFx0XHRpZiAocHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fTtcclxuXHJcblx0Ly8gRGV0ZXJtaW5lIGlmIHRoZSBhcnJheSBvciBvYmplY3QgY29udGFpbnMgYSBnaXZlbiB2YWx1ZSAodXNpbmcgYD09PWApLlxyXG5cdC8vIEFsaWFzZWQgYXMgYGluY2x1ZGVzYCBhbmQgYGluY2x1ZGVgLlxyXG5cdF8uY29udGFpbnMgPSBfLmluY2x1ZGVzID0gXy5pbmNsdWRlID0gZnVuY3Rpb24gKG9iaiwgdGFyZ2V0LCBmcm9tSW5kZXgpIHtcclxuXHRcdGlmICghaXNBcnJheUxpa2Uob2JqKSkgb2JqID0gXy52YWx1ZXMob2JqKTtcclxuXHRcdHJldHVybiBfLmluZGV4T2Yob2JqLCB0YXJnZXQsIHR5cGVvZiBmcm9tSW5kZXggPT0gJ251bWJlcicgJiYgZnJvbUluZGV4KSA+PSAwO1xyXG5cdH07XHJcblxyXG5cdC8vIEludm9rZSBhIG1ldGhvZCAod2l0aCBhcmd1bWVudHMpIG9uIGV2ZXJ5IGl0ZW0gaW4gYSBjb2xsZWN0aW9uLlxyXG5cdF8uaW52b2tlID0gZnVuY3Rpb24gKG9iaiwgbWV0aG9kKSB7XHJcblx0XHR2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcclxuXHRcdHZhciBpc0Z1bmMgPSBfLmlzRnVuY3Rpb24obWV0aG9kKTtcclxuXHRcdHJldHVybiBfLm1hcChvYmosIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHR2YXIgZnVuYyA9IGlzRnVuYyA/IG1ldGhvZCA6IHZhbHVlW21ldGhvZF07XHJcblx0XHRcdHJldHVybiBmdW5jID09IG51bGwgPyBmdW5jIDogZnVuYy5hcHBseSh2YWx1ZSwgYXJncyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBtYXBgOiBmZXRjaGluZyBhIHByb3BlcnR5LlxyXG5cdF8ucGx1Y2sgPSBmdW5jdGlvbiAob2JqLCBrZXkpIHtcclxuXHRcdHJldHVybiBfLm1hcChvYmosIF8ucHJvcGVydHkoa2V5KSk7XHJcblx0fTtcclxuXHJcblx0Ly8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmlsdGVyYDogc2VsZWN0aW5nIG9ubHkgb2JqZWN0c1xyXG5cdC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXHJcblx0Xy53aGVyZSA9IGZ1bmN0aW9uIChvYmosIGF0dHJzKSB7XHJcblx0XHRyZXR1cm4gXy5maWx0ZXIob2JqLCBfLm1hdGNoZXIoYXR0cnMpKTtcclxuXHR9O1xyXG5cclxuXHQvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaW5kYDogZ2V0dGluZyB0aGUgZmlyc3Qgb2JqZWN0XHJcblx0Ly8gY29udGFpbmluZyBzcGVjaWZpYyBga2V5OnZhbHVlYCBwYWlycy5cclxuXHRfLmZpbmRXaGVyZSA9IGZ1bmN0aW9uIChvYmosIGF0dHJzKSB7XHJcblx0XHRyZXR1cm4gXy5maW5kKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XHJcblx0fTtcclxuXHJcblx0Ly8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxyXG5cdF8ubWF4ID0gZnVuY3Rpb24gKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcclxuXHRcdHZhciByZXN1bHQgPSAtSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IC1JbmZpbml0eSxcclxuXHRcdFx0dmFsdWUsIGNvbXB1dGVkO1xyXG5cdFx0aWYgKGl0ZXJhdGVlID09IG51bGwgJiYgb2JqICE9IG51bGwpIHtcclxuXHRcdFx0b2JqID0gaXNBcnJheUxpa2Uob2JqKSA/IG9iaiA6IF8udmFsdWVzKG9iaik7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YWx1ZSA9IG9ialtpXTtcclxuXHRcdFx0XHRpZiAodmFsdWUgPiByZXN1bHQpIHtcclxuXHRcdFx0XHRcdHJlc3VsdCA9IHZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XHJcblx0XHRcdF8uZWFjaChvYmosIGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcclxuXHRcdFx0XHRjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdCk7XHJcblx0XHRcdFx0aWYgKGNvbXB1dGVkID4gbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSAtSW5maW5pdHkgJiYgcmVzdWx0ID09PSAtSW5maW5pdHkpIHtcclxuXHRcdFx0XHRcdHJlc3VsdCA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0bGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fTtcclxuXHJcblx0Ly8gUmV0dXJuIHRoZSBtaW5pbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxyXG5cdF8ubWluID0gZnVuY3Rpb24gKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcclxuXHRcdHZhciByZXN1bHQgPSBJbmZpbml0eSwgbGFzdENvbXB1dGVkID0gSW5maW5pdHksXHJcblx0XHRcdHZhbHVlLCBjb21wdXRlZDtcclxuXHRcdGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XHJcblx0XHRcdG9iaiA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFsdWUgPSBvYmpbaV07XHJcblx0XHRcdFx0aWYgKHZhbHVlIDwgcmVzdWx0KSB7XHJcblx0XHRcdFx0XHRyZXN1bHQgPSB2YWx1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xyXG5cdFx0XHRfLmVhY2gob2JqLCBmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBsaXN0KSB7XHJcblx0XHRcdFx0Y29tcHV0ZWQgPSBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGxpc3QpO1xyXG5cdFx0XHRcdGlmIChjb21wdXRlZCA8IGxhc3RDb21wdXRlZCB8fCBjb21wdXRlZCA9PT0gSW5maW5pdHkgJiYgcmVzdWx0ID09PSBJbmZpbml0eSkge1xyXG5cdFx0XHRcdFx0cmVzdWx0ID0gdmFsdWU7XHJcblx0XHRcdFx0XHRsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9O1xyXG5cclxuXHQvLyBTaHVmZmxlIGEgY29sbGVjdGlvbiwgdXNpbmcgdGhlIG1vZGVybiB2ZXJzaW9uIG9mIHRoZVxyXG5cdC8vIFtGaXNoZXItWWF0ZXMgc2h1ZmZsZV0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXLpiKXmj6dhdGVzX3NodWZmbGUpLlxyXG5cdF8uc2h1ZmZsZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdHZhciBzZXQgPSBpc0FycmF5TGlrZShvYmopID8gb2JqIDogXy52YWx1ZXMob2JqKTtcclxuXHRcdHZhciBsZW5ndGggPSBzZXQubGVuZ3RoO1xyXG5cdFx0dmFyIHNodWZmbGVkID0gQXJyYXkobGVuZ3RoKTtcclxuXHRcdGZvciAodmFyIGluZGV4ID0gMCwgcmFuZDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuXHRcdFx0cmFuZCA9IF8ucmFuZG9tKDAsIGluZGV4KTtcclxuXHRcdFx0aWYgKHJhbmQgIT09IGluZGV4KSBzaHVmZmxlZFtpbmRleF0gPSBzaHVmZmxlZFtyYW5kXTtcclxuXHRcdFx0c2h1ZmZsZWRbcmFuZF0gPSBzZXRbaW5kZXhdO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHNodWZmbGVkO1xyXG5cdH07XHJcblxyXG5cdC8vIFNhbXBsZSAqKm4qKiByYW5kb20gdmFsdWVzIGZyb20gYSBjb2xsZWN0aW9uLlxyXG5cdC8vIElmICoqbioqIGlzIG5vdCBzcGVjaWZpZWQsIHJldHVybnMgYSBzaW5nbGUgcmFuZG9tIGVsZW1lbnQuXHJcblx0Ly8gVGhlIGludGVybmFsIGBndWFyZGAgYXJndW1lbnQgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgbWFwYC5cclxuXHRfLnNhbXBsZSA9IGZ1bmN0aW9uIChvYmosIG4sIGd1YXJkKSB7XHJcblx0XHRpZiAobiA9PSBudWxsIHx8IGd1YXJkKSB7XHJcblx0XHRcdGlmICghaXNBcnJheUxpa2Uob2JqKSkgb2JqID0gXy52YWx1ZXMob2JqKTtcclxuXHRcdFx0cmV0dXJuIG9ialtfLnJhbmRvbShvYmoubGVuZ3RoIC0gMSldO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIF8uc2h1ZmZsZShvYmopLnNsaWNlKDAsIE1hdGgubWF4KDAsIG4pKTtcclxuXHR9O1xyXG5cclxuXHQvLyBTb3J0IHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24gcHJvZHVjZWQgYnkgYW4gaXRlcmF0ZWUuXHJcblx0Xy5zb3J0QnkgPSBmdW5jdGlvbiAob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG5cdFx0aXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XHJcblx0XHRyZXR1cm4gXy5wbHVjayhfLm1hcChvYmosIGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR2YWx1ZTogdmFsdWUsXHJcblx0XHRcdFx0aW5kZXg6IGluZGV4LFxyXG5cdFx0XHRcdGNyaXRlcmlhOiBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGxpc3QpXHJcblx0XHRcdH07XHJcblx0XHR9KS5zb3J0KGZ1bmN0aW9uIChsZWZ0LCByaWdodCkge1xyXG5cdFx0XHR2YXIgYSA9IGxlZnQuY3JpdGVyaWE7XHJcblx0XHRcdHZhciBiID0gcmlnaHQuY3JpdGVyaWE7XHJcblx0XHRcdGlmIChhICE9PSBiKSB7XHJcblx0XHRcdFx0aWYgKGEgPiBiIHx8IGEgPT09IHZvaWQgMCkgcmV0dXJuIDE7XHJcblx0XHRcdFx0aWYgKGEgPCBiIHx8IGIgPT09IHZvaWQgMCkgcmV0dXJuIC0xO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XHJcblx0XHR9KSwgJ3ZhbHVlJyk7XHJcblx0fTtcclxuXHJcblx0Ly8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gdXNlZCBmb3IgYWdncmVnYXRlIFwiZ3JvdXAgYnlcIiBvcGVyYXRpb25zLlxyXG5cdHZhciBncm91cCA9IGZ1bmN0aW9uIChiZWhhdmlvcikge1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcblx0XHRcdHZhciByZXN1bHQgPSB7fTtcclxuXHRcdFx0aXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XHJcblx0XHRcdF8uZWFjaChvYmosIGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcclxuXHRcdFx0XHR2YXIga2V5ID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBvYmopO1xyXG5cdFx0XHRcdGJlaGF2aW9yKHJlc3VsdCwgdmFsdWUsIGtleSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQvLyBHcm91cHMgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbi4gUGFzcyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlXHJcblx0Ly8gdG8gZ3JvdXAgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjcml0ZXJpb24uXHJcblx0Xy5ncm91cEJ5ID0gZ3JvdXAoZnVuY3Rpb24gKHJlc3VsdCwgdmFsdWUsIGtleSkge1xyXG5cdFx0aWYgKF8uaGFzKHJlc3VsdCwga2V5KSkgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSk7IGVsc2UgcmVzdWx0W2tleV0gPSBbdmFsdWVdO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBJbmRleGVzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24sIHNpbWlsYXIgdG8gYGdyb3VwQnlgLCBidXQgZm9yXHJcblx0Ly8gd2hlbiB5b3Uga25vdyB0aGF0IHlvdXIgaW5kZXggdmFsdWVzIHdpbGwgYmUgdW5pcXVlLlxyXG5cdF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uIChyZXN1bHQsIHZhbHVlLCBrZXkpIHtcclxuXHRcdHJlc3VsdFtrZXldID0gdmFsdWU7XHJcblx0fSk7XHJcblxyXG5cdC8vIENvdW50cyBpbnN0YW5jZXMgb2YgYW4gb2JqZWN0IHRoYXQgZ3JvdXAgYnkgYSBjZXJ0YWluIGNyaXRlcmlvbi4gUGFzc1xyXG5cdC8vIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGUgdG8gY291bnQgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxyXG5cdC8vIGNyaXRlcmlvbi5cclxuXHRfLmNvdW50QnkgPSBncm91cChmdW5jdGlvbiAocmVzdWx0LCB2YWx1ZSwga2V5KSB7XHJcblx0XHRpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XSsrOyBlbHNlIHJlc3VsdFtrZXldID0gMTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU2FmZWx5IGNyZWF0ZSBhIHJlYWwsIGxpdmUgYXJyYXkgZnJvbSBhbnl0aGluZyBpdGVyYWJsZS5cclxuXHRfLnRvQXJyYXkgPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRpZiAoIW9iaikgcmV0dXJuIFtdO1xyXG5cdFx0aWYgKF8uaXNBcnJheShvYmopKSByZXR1cm4gc2xpY2UuY2FsbChvYmopO1xyXG5cdFx0aWYgKGlzQXJyYXlMaWtlKG9iaikpIHJldHVybiBfLm1hcChvYmosIF8uaWRlbnRpdHkpO1xyXG5cdFx0cmV0dXJuIF8udmFsdWVzKG9iaik7XHJcblx0fTtcclxuXHJcblx0Ly8gUmV0dXJuIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gYW4gb2JqZWN0LlxyXG5cdF8uc2l6ZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIDA7XHJcblx0XHRyZXR1cm4gaXNBcnJheUxpa2Uob2JqKSA/IG9iai5sZW5ndGggOiBfLmtleXMob2JqKS5sZW5ndGg7XHJcblx0fTtcclxuXHJcblx0Ly8gU3BsaXQgYSBjb2xsZWN0aW9uIGludG8gdHdvIGFycmF5czogb25lIHdob3NlIGVsZW1lbnRzIGFsbCBzYXRpc2Z5IHRoZSBnaXZlblxyXG5cdC8vIHByZWRpY2F0ZSwgYW5kIG9uZSB3aG9zZSBlbGVtZW50cyBhbGwgZG8gbm90IHNhdGlzZnkgdGhlIHByZWRpY2F0ZS5cclxuXHRfLnBhcnRpdGlvbiA9IGZ1bmN0aW9uIChvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xyXG5cdFx0cHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcclxuXHRcdHZhciBwYXNzID0gW10sIGZhaWwgPSBbXTtcclxuXHRcdF8uZWFjaChvYmosIGZ1bmN0aW9uICh2YWx1ZSwga2V5LCBvYmopIHtcclxuXHRcdFx0KHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBvYmopID8gcGFzcyA6IGZhaWwpLnB1c2godmFsdWUpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gW3Bhc3MsIGZhaWxdO1xyXG5cdH07XHJcblxyXG5cdC8vIEFycmF5IEZ1bmN0aW9uc1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHQvLyBHZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGZpcnN0IE5cclxuXHQvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LiBBbGlhc2VkIGFzIGBoZWFkYCBhbmQgYHRha2VgLiBUaGUgKipndWFyZCoqIGNoZWNrXHJcblx0Ly8gYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxyXG5cdF8uZmlyc3QgPSBfLmhlYWQgPSBfLnRha2UgPSBmdW5jdGlvbiAoYXJyYXksIG4sIGd1YXJkKSB7XHJcblx0XHRpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcclxuXHRcdGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHJldHVybiBhcnJheVswXTtcclxuXHRcdHJldHVybiBfLmluaXRpYWwoYXJyYXksIGFycmF5Lmxlbmd0aCAtIG4pO1xyXG5cdH07XHJcblxyXG5cdC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGxhc3QgZW50cnkgb2YgdGhlIGFycmF5LiBFc3BlY2lhbGx5IHVzZWZ1bCBvblxyXG5cdC8vIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIGFsbCB0aGUgdmFsdWVzIGluXHJcblx0Ly8gdGhlIGFycmF5LCBleGNsdWRpbmcgdGhlIGxhc3QgTi5cclxuXHRfLmluaXRpYWwgPSBmdW5jdGlvbiAoYXJyYXksIG4sIGd1YXJkKSB7XHJcblx0XHRyZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgMCwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gKG4gPT0gbnVsbCB8fCBndWFyZCA/IDEgOiBuKSkpO1xyXG5cdH07XHJcblxyXG5cdC8vIEdldCB0aGUgbGFzdCBlbGVtZW50IG9mIGFuIGFycmF5LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIHRoZSBsYXN0IE5cclxuXHQvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LlxyXG5cdF8ubGFzdCA9IGZ1bmN0aW9uIChhcnJheSwgbiwgZ3VhcmQpIHtcclxuXHRcdGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xyXG5cdFx0aWYgKG4gPT0gbnVsbCB8fCBndWFyZCkgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xyXG5cdFx0cmV0dXJuIF8ucmVzdChhcnJheSwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gbikpO1xyXG5cdH07XHJcblxyXG5cdC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgdGFpbGAgYW5kIGBkcm9wYC5cclxuXHQvLyBFc3BlY2lhbGx5IHVzZWZ1bCBvbiB0aGUgYXJndW1lbnRzIG9iamVjdC4gUGFzc2luZyBhbiAqKm4qKiB3aWxsIHJldHVyblxyXG5cdC8vIHRoZSByZXN0IE4gdmFsdWVzIGluIHRoZSBhcnJheS5cclxuXHRfLnJlc3QgPSBfLnRhaWwgPSBfLmRyb3AgPSBmdW5jdGlvbiAoYXJyYXksIG4sIGd1YXJkKSB7XHJcblx0XHRyZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgbiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pO1xyXG5cdH07XHJcblxyXG5cdC8vIFRyaW0gb3V0IGFsbCBmYWxzeSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cclxuXHRfLmNvbXBhY3QgPSBmdW5jdGlvbiAoYXJyYXkpIHtcclxuXHRcdHJldHVybiBfLmZpbHRlcihhcnJheSwgXy5pZGVudGl0eSk7XHJcblx0fTtcclxuXHJcblx0Ly8gSW50ZXJuYWwgaW1wbGVtZW50YXRpb24gb2YgYSByZWN1cnNpdmUgYGZsYXR0ZW5gIGZ1bmN0aW9uLlxyXG5cdHZhciBmbGF0dGVuID0gZnVuY3Rpb24gKGlucHV0LCBzaGFsbG93LCBzdHJpY3QsIHN0YXJ0SW5kZXgpIHtcclxuXHRcdHZhciBvdXRwdXQgPSBbXSwgaWR4ID0gMDtcclxuXHRcdGZvciAodmFyIGkgPSBzdGFydEluZGV4IHx8IDAsIGxlbmd0aCA9IGlucHV0ICYmIGlucHV0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciB2YWx1ZSA9IGlucHV0W2ldO1xyXG5cdFx0XHRpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmIChfLmlzQXJyYXkodmFsdWUpIHx8IF8uaXNBcmd1bWVudHModmFsdWUpKSkge1xyXG5cdFx0XHRcdC8vZmxhdHRlbiBjdXJyZW50IGxldmVsIG9mIGFycmF5IG9yIGFyZ3VtZW50cyBvYmplY3RcclxuXHRcdFx0XHRpZiAoIXNoYWxsb3cpIHZhbHVlID0gZmxhdHRlbih2YWx1ZSwgc2hhbGxvdywgc3RyaWN0KTtcclxuXHRcdFx0XHR2YXIgaiA9IDAsIGxlbiA9IHZhbHVlLmxlbmd0aDtcclxuXHRcdFx0XHRvdXRwdXQubGVuZ3RoICs9IGxlbjtcclxuXHRcdFx0XHR3aGlsZSAoaiA8IGxlbikge1xyXG5cdFx0XHRcdFx0b3V0cHV0W2lkeCsrXSA9IHZhbHVlW2orK107XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKCFzdHJpY3QpIHtcclxuXHRcdFx0XHRvdXRwdXRbaWR4KytdID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBvdXRwdXQ7XHJcblx0fTtcclxuXHJcblx0Ly8gRmxhdHRlbiBvdXQgYW4gYXJyYXksIGVpdGhlciByZWN1cnNpdmVseSAoYnkgZGVmYXVsdCksIG9yIGp1c3Qgb25lIGxldmVsLlxyXG5cdF8uZmxhdHRlbiA9IGZ1bmN0aW9uIChhcnJheSwgc2hhbGxvdykge1xyXG5cdFx0cmV0dXJuIGZsYXR0ZW4oYXJyYXksIHNoYWxsb3csIGZhbHNlKTtcclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm4gYSB2ZXJzaW9uIG9mIHRoZSBhcnJheSB0aGF0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNwZWNpZmllZCB2YWx1ZShzKS5cclxuXHRfLndpdGhvdXQgPSBmdW5jdGlvbiAoYXJyYXkpIHtcclxuXHRcdHJldHVybiBfLmRpZmZlcmVuY2UoYXJyYXksIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcblx0fTtcclxuXHJcblx0Ly8gUHJvZHVjZSBhIGR1cGxpY2F0ZS1mcmVlIHZlcnNpb24gb2YgdGhlIGFycmF5LiBJZiB0aGUgYXJyYXkgaGFzIGFscmVhZHlcclxuXHQvLyBiZWVuIHNvcnRlZCwgeW91IGhhdmUgdGhlIG9wdGlvbiBvZiB1c2luZyBhIGZhc3RlciBhbGdvcml0aG0uXHJcblx0Ly8gQWxpYXNlZCBhcyBgdW5pcXVlYC5cclxuXHRfLnVuaXEgPSBfLnVuaXF1ZSA9IGZ1bmN0aW9uIChhcnJheSwgaXNTb3J0ZWQsIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcblx0XHRpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIFtdO1xyXG5cdFx0aWYgKCFfLmlzQm9vbGVhbihpc1NvcnRlZCkpIHtcclxuXHRcdFx0Y29udGV4dCA9IGl0ZXJhdGVlO1xyXG5cdFx0XHRpdGVyYXRlZSA9IGlzU29ydGVkO1xyXG5cdFx0XHRpc1NvcnRlZCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0dmFyIHNlZW4gPSBbXTtcclxuXHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBhcnJheVtpXSxcclxuXHRcdFx0XHRjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUsIGksIGFycmF5KSA6IHZhbHVlO1xyXG5cdFx0XHRpZiAoaXNTb3J0ZWQpIHtcclxuXHRcdFx0XHRpZiAoIWkgfHwgc2VlbiAhPT0gY29tcHV0ZWQpIHJlc3VsdC5wdXNoKHZhbHVlKTtcclxuXHRcdFx0XHRzZWVuID0gY29tcHV0ZWQ7XHJcblx0XHRcdH0gZWxzZSBpZiAoaXRlcmF0ZWUpIHtcclxuXHRcdFx0XHRpZiAoIV8uY29udGFpbnMoc2VlbiwgY29tcHV0ZWQpKSB7XHJcblx0XHRcdFx0XHRzZWVuLnB1c2goY29tcHV0ZWQpO1xyXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2godmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICghXy5jb250YWlucyhyZXN1bHQsIHZhbHVlKSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9O1xyXG5cclxuXHQvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcclxuXHQvLyB0aGUgcGFzc2VkLWluIGFycmF5cy5cclxuXHRfLnVuaW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIF8udW5pcShmbGF0dGVuKGFyZ3VtZW50cywgdHJ1ZSwgdHJ1ZSkpO1xyXG5cdH07XHJcblxyXG5cdC8vIFByb2R1Y2UgYW4gYXJyYXkgdGhhdCBjb250YWlucyBldmVyeSBpdGVtIHNoYXJlZCBiZXR3ZWVuIGFsbCB0aGVcclxuXHQvLyBwYXNzZWQtaW4gYXJyYXlzLlxyXG5cdF8uaW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gKGFycmF5KSB7XHJcblx0XHRpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIFtdO1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0dmFyIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gYXJyYXlbaV07XHJcblx0XHRcdGlmIChfLmNvbnRhaW5zKHJlc3VsdCwgaXRlbSkpIGNvbnRpbnVlO1xyXG5cdFx0XHRmb3IgKHZhciBqID0gMTsgaiA8IGFyZ3NMZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGlmICghXy5jb250YWlucyhhcmd1bWVudHNbal0sIGl0ZW0pKSBicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaiA9PT0gYXJnc0xlbmd0aCkgcmVzdWx0LnB1c2goaXRlbSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH07XHJcblxyXG5cdC8vIFRha2UgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBvbmUgYXJyYXkgYW5kIGEgbnVtYmVyIG9mIG90aGVyIGFycmF5cy5cclxuXHQvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxyXG5cdF8uZGlmZmVyZW5jZSA9IGZ1bmN0aW9uIChhcnJheSkge1xyXG5cdFx0dmFyIHJlc3QgPSBmbGF0dGVuKGFyZ3VtZW50cywgdHJ1ZSwgdHJ1ZSwgMSk7XHJcblx0XHRyZXR1cm4gXy5maWx0ZXIoYXJyYXksIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRyZXR1cm4gIV8uY29udGFpbnMocmVzdCwgdmFsdWUpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Ly8gWmlwIHRvZ2V0aGVyIG11bHRpcGxlIGxpc3RzIGludG8gYSBzaW5nbGUgYXJyYXkgLS0gZWxlbWVudHMgdGhhdCBzaGFyZVxyXG5cdC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxyXG5cdF8uemlwID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIF8udW56aXAoYXJndW1lbnRzKTtcclxuXHR9O1xyXG5cclxuXHQvLyBDb21wbGVtZW50IG9mIF8uemlwLiBVbnppcCBhY2NlcHRzIGFuIGFycmF5IG9mIGFycmF5cyBhbmQgZ3JvdXBzXHJcblx0Ly8gZWFjaCBhcnJheSdzIGVsZW1lbnRzIG9uIHNoYXJlZCBpbmRpY2VzXHJcblx0Xy51bnppcCA9IGZ1bmN0aW9uIChhcnJheSkge1xyXG5cdFx0dmFyIGxlbmd0aCA9IGFycmF5ICYmIF8ubWF4KGFycmF5LCAnbGVuZ3RoJykubGVuZ3RoIHx8IDA7XHJcblx0XHR2YXIgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcclxuXHJcblx0XHRmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcblx0XHRcdHJlc3VsdFtpbmRleF0gPSBfLnBsdWNrKGFycmF5LCBpbmRleCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH07XHJcblxyXG5cdC8vIENvbnZlcnRzIGxpc3RzIGludG8gb2JqZWN0cy4gUGFzcyBlaXRoZXIgYSBzaW5nbGUgYXJyYXkgb2YgYFtrZXksIHZhbHVlXWBcclxuXHQvLyBwYWlycywgb3IgdHdvIHBhcmFsbGVsIGFycmF5cyBvZiB0aGUgc2FtZSBsZW5ndGggLS0gb25lIG9mIGtleXMsIGFuZCBvbmUgb2ZcclxuXHQvLyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMuXHJcblx0Xy5vYmplY3QgPSBmdW5jdGlvbiAobGlzdCwgdmFsdWVzKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0ge307XHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gbGlzdCAmJiBsaXN0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh2YWx1ZXMpIHtcclxuXHRcdFx0XHRyZXN1bHRbbGlzdFtpXV0gPSB2YWx1ZXNbaV07XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0W2xpc3RbaV1bMF1dID0gbGlzdFtpXVsxXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksXHJcblx0Ly8gb3IgLTEgaWYgdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS5cclxuXHQvLyBJZiB0aGUgYXJyYXkgaXMgbGFyZ2UgYW5kIGFscmVhZHkgaW4gc29ydCBvcmRlciwgcGFzcyBgdHJ1ZWBcclxuXHQvLyBmb3IgKippc1NvcnRlZCoqIHRvIHVzZSBiaW5hcnkgc2VhcmNoLlxyXG5cdF8uaW5kZXhPZiA9IGZ1bmN0aW9uIChhcnJheSwgaXRlbSwgaXNTb3J0ZWQpIHtcclxuXHRcdHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkgJiYgYXJyYXkubGVuZ3RoO1xyXG5cdFx0aWYgKHR5cGVvZiBpc1NvcnRlZCA9PSAnbnVtYmVyJykge1xyXG5cdFx0XHRpID0gaXNTb3J0ZWQgPCAwID8gTWF0aC5tYXgoMCwgbGVuZ3RoICsgaXNTb3J0ZWQpIDogaXNTb3J0ZWQ7XHJcblx0XHR9IGVsc2UgaWYgKGlzU29ydGVkICYmIGxlbmd0aCkge1xyXG5cdFx0XHRpID0gXy5zb3J0ZWRJbmRleChhcnJheSwgaXRlbSk7XHJcblx0XHRcdHJldHVybiBhcnJheVtpXSA9PT0gaXRlbSA/IGkgOiAtMTtcclxuXHRcdH1cclxuXHRcdGlmIChpdGVtICE9PSBpdGVtKSB7XHJcblx0XHRcdHJldHVybiBfLmZpbmRJbmRleChzbGljZS5jYWxsKGFycmF5LCBpKSwgXy5pc05hTik7XHJcblx0XHR9XHJcblx0XHRmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSBpZiAoYXJyYXlbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH07XHJcblxyXG5cdF8ubGFzdEluZGV4T2YgPSBmdW5jdGlvbiAoYXJyYXksIGl0ZW0sIGZyb20pIHtcclxuXHRcdHZhciBpZHggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XHJcblx0XHRpZiAodHlwZW9mIGZyb20gPT0gJ251bWJlcicpIHtcclxuXHRcdFx0aWR4ID0gZnJvbSA8IDAgPyBpZHggKyBmcm9tICsgMSA6IE1hdGgubWluKGlkeCwgZnJvbSArIDEpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGl0ZW0gIT09IGl0ZW0pIHtcclxuXHRcdFx0cmV0dXJuIF8uZmluZExhc3RJbmRleChzbGljZS5jYWxsKGFycmF5LCAwLCBpZHgpLCBfLmlzTmFOKTtcclxuXHRcdH1cclxuXHRcdHdoaWxlICgtLWlkeCA+PSAwKSBpZiAoYXJyYXlbaWR4XSA9PT0gaXRlbSkgcmV0dXJuIGlkeDtcclxuXHRcdHJldHVybiAtMTtcclxuXHR9O1xyXG5cclxuXHQvLyBHZW5lcmF0b3IgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBmaW5kSW5kZXggYW5kIGZpbmRMYXN0SW5kZXggZnVuY3Rpb25zXHJcblx0ZnVuY3Rpb24gY3JlYXRlSW5kZXhGaW5kZXIoZGlyKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGFycmF5LCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcclxuXHRcdFx0cHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcclxuXHRcdFx0dmFyIGxlbmd0aCA9IGFycmF5ICE9IG51bGwgJiYgYXJyYXkubGVuZ3RoO1xyXG5cdFx0XHR2YXIgaW5kZXggPSBkaXIgPiAwID8gMCA6IGxlbmd0aCAtIDE7XHJcblx0XHRcdGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcclxuXHRcdFx0XHRpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkgcmV0dXJuIGluZGV4O1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiAtMTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvLyBSZXR1cm5zIHRoZSBmaXJzdCBpbmRleCBvbiBhbiBhcnJheS1saWtlIHRoYXQgcGFzc2VzIGEgcHJlZGljYXRlIHRlc3RcclxuXHRfLmZpbmRJbmRleCA9IGNyZWF0ZUluZGV4RmluZGVyKDEpO1xyXG5cclxuXHRfLmZpbmRMYXN0SW5kZXggPSBjcmVhdGVJbmRleEZpbmRlcigtMSk7XHJcblxyXG5cdC8vIFVzZSBhIGNvbXBhcmF0b3IgZnVuY3Rpb24gdG8gZmlndXJlIG91dCB0aGUgc21hbGxlc3QgaW5kZXggYXQgd2hpY2hcclxuXHQvLyBhbiBvYmplY3Qgc2hvdWxkIGJlIGluc2VydGVkIHNvIGFzIHRvIG1haW50YWluIG9yZGVyLiBVc2VzIGJpbmFyeSBzZWFyY2guXHJcblx0Xy5zb3J0ZWRJbmRleCA9IGZ1bmN0aW9uIChhcnJheSwgb2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG5cdFx0aXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCwgMSk7XHJcblx0XHR2YXIgdmFsdWUgPSBpdGVyYXRlZShvYmopO1xyXG5cdFx0dmFyIGxvdyA9IDAsIGhpZ2ggPSBhcnJheS5sZW5ndGg7XHJcblx0XHR3aGlsZSAobG93IDwgaGlnaCkge1xyXG5cdFx0XHR2YXIgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyKTtcclxuXHRcdFx0aWYgKGl0ZXJhdGVlKGFycmF5W21pZF0pIDwgdmFsdWUpIGxvdyA9IG1pZCArIDE7IGVsc2UgaGlnaCA9IG1pZDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBsb3c7XHJcblx0fTtcclxuXHJcblx0Ly8gR2VuZXJhdGUgYW4gaW50ZWdlciBBcnJheSBjb250YWluaW5nIGFuIGFyaXRobWV0aWMgcHJvZ3Jlc3Npb24uIEEgcG9ydCBvZlxyXG5cdC8vIHRoZSBuYXRpdmUgUHl0aG9uIGByYW5nZSgpYCBmdW5jdGlvbi4gU2VlXHJcblx0Ly8gW3RoZSBQeXRob24gZG9jdW1lbnRhdGlvbl0oaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L2Z1bmN0aW9ucy5odG1sI3JhbmdlKS5cclxuXHRfLnJhbmdlID0gZnVuY3Rpb24gKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XHJcblx0XHRcdHN0b3AgPSBzdGFydCB8fCAwO1xyXG5cdFx0XHRzdGFydCA9IDA7XHJcblx0XHR9XHJcblx0XHRzdGVwID0gc3RlcCB8fCAxO1xyXG5cclxuXHRcdHZhciBsZW5ndGggPSBNYXRoLm1heChNYXRoLmNlaWwoKHN0b3AgLSBzdGFydCkgLyBzdGVwKSwgMCk7XHJcblx0XHR2YXIgcmFuZ2UgPSBBcnJheShsZW5ndGgpO1xyXG5cclxuXHRcdGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGxlbmd0aDsgaWR4KysgLCBzdGFydCArPSBzdGVwKSB7XHJcblx0XHRcdHJhbmdlW2lkeF0gPSBzdGFydDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmFuZ2U7XHJcblx0fTtcclxuXHJcblx0Ly8gRnVuY3Rpb24gKGFoZW0pIEZ1bmN0aW9uc1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHQvLyBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gZXhlY3V0ZSBhIGZ1bmN0aW9uIGFzIGEgY29uc3RydWN0b3JcclxuXHQvLyBvciBhIG5vcm1hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHNcclxuXHR2YXIgZXhlY3V0ZUJvdW5kID0gZnVuY3Rpb24gKHNvdXJjZUZ1bmMsIGJvdW5kRnVuYywgY29udGV4dCwgY2FsbGluZ0NvbnRleHQsIGFyZ3MpIHtcclxuXHRcdGlmICghKGNhbGxpbmdDb250ZXh0IGluc3RhbmNlb2YgYm91bmRGdW5jKSkgcmV0dXJuIHNvdXJjZUZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcblx0XHR2YXIgc2VsZiA9IGJhc2VDcmVhdGUoc291cmNlRnVuYy5wcm90b3R5cGUpO1xyXG5cdFx0dmFyIHJlc3VsdCA9IHNvdXJjZUZ1bmMuYXBwbHkoc2VsZiwgYXJncyk7XHJcblx0XHRpZiAoXy5pc09iamVjdChyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xyXG5cdFx0cmV0dXJuIHNlbGY7XHJcblx0fTtcclxuXHJcblx0Ly8gQ3JlYXRlIGEgZnVuY3Rpb24gYm91bmQgdG8gYSBnaXZlbiBvYmplY3QgKGFzc2lnbmluZyBgdGhpc2AsIGFuZCBhcmd1bWVudHMsXHJcblx0Ly8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxyXG5cdC8vIGF2YWlsYWJsZS5cclxuXHRfLmJpbmQgPSBmdW5jdGlvbiAoZnVuYywgY29udGV4dCkge1xyXG5cdFx0aWYgKG5hdGl2ZUJpbmQgJiYgZnVuYy5iaW5kID09PSBuYXRpdmVCaW5kKSByZXR1cm4gbmF0aXZlQmluZC5hcHBseShmdW5jLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xyXG5cdFx0aWYgKCFfLmlzRnVuY3Rpb24oZnVuYykpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvbicpO1xyXG5cdFx0dmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XHJcblx0XHR2YXIgYm91bmQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBleGVjdXRlQm91bmQoZnVuYywgYm91bmQsIGNvbnRleHQsIHRoaXMsIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xyXG5cdFx0fTtcclxuXHRcdHJldHVybiBib3VuZDtcclxuXHR9O1xyXG5cclxuXHQvLyBQYXJ0aWFsbHkgYXBwbHkgYSBmdW5jdGlvbiBieSBjcmVhdGluZyBhIHZlcnNpb24gdGhhdCBoYXMgaGFkIHNvbWUgb2YgaXRzXHJcblx0Ly8gYXJndW1lbnRzIHByZS1maWxsZWQsIHdpdGhvdXQgY2hhbmdpbmcgaXRzIGR5bmFtaWMgYHRoaXNgIGNvbnRleHQuIF8gYWN0c1xyXG5cdC8vIGFzIGEgcGxhY2Vob2xkZXIsIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcHJlLWZpbGxlZC5cclxuXHRfLnBhcnRpYWwgPSBmdW5jdGlvbiAoZnVuYykge1xyXG5cdFx0dmFyIGJvdW5kQXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuXHRcdHZhciBib3VuZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIHBvc2l0aW9uID0gMCwgbGVuZ3RoID0gYm91bmRBcmdzLmxlbmd0aDtcclxuXHRcdFx0dmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0YXJnc1tpXSA9IGJvdW5kQXJnc1tpXSA9PT0gXyA/IGFyZ3VtZW50c1twb3NpdGlvbisrXSA6IGJvdW5kQXJnc1tpXTtcclxuXHRcdFx0fVxyXG5cdFx0XHR3aGlsZSAocG9zaXRpb24gPCBhcmd1bWVudHMubGVuZ3RoKSBhcmdzLnB1c2goYXJndW1lbnRzW3Bvc2l0aW9uKytdKTtcclxuXHRcdFx0cmV0dXJuIGV4ZWN1dGVCb3VuZChmdW5jLCBib3VuZCwgdGhpcywgdGhpcywgYXJncyk7XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGJvdW5kO1xyXG5cdH07XHJcblxyXG5cdC8vIEJpbmQgYSBudW1iZXIgb2YgYW4gb2JqZWN0J3MgbWV0aG9kcyB0byB0aGF0IG9iamVjdC4gUmVtYWluaW5nIGFyZ3VtZW50c1xyXG5cdC8vIGFyZSB0aGUgbWV0aG9kIG5hbWVzIHRvIGJlIGJvdW5kLiBVc2VmdWwgZm9yIGVuc3VyaW5nIHRoYXQgYWxsIGNhbGxiYWNrc1xyXG5cdC8vIGRlZmluZWQgb24gYW4gb2JqZWN0IGJlbG9uZyB0byBpdC5cclxuXHRfLmJpbmRBbGwgPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHR2YXIgaSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCwga2V5O1xyXG5cdFx0aWYgKGxlbmd0aCA8PSAxKSB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXMnKTtcclxuXHRcdGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHRrZXkgPSBhcmd1bWVudHNbaV07XHJcblx0XHRcdG9ialtrZXldID0gXy5iaW5kKG9ialtrZXldLCBvYmopO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG9iajtcclxuXHR9O1xyXG5cclxuXHQvLyBNZW1vaXplIGFuIGV4cGVuc2l2ZSBmdW5jdGlvbiBieSBzdG9yaW5nIGl0cyByZXN1bHRzLlxyXG5cdF8ubWVtb2l6ZSA9IGZ1bmN0aW9uIChmdW5jLCBoYXNoZXIpIHtcclxuXHRcdHZhciBtZW1vaXplID0gZnVuY3Rpb24gKGtleSkge1xyXG5cdFx0XHR2YXIgY2FjaGUgPSBtZW1vaXplLmNhY2hlO1xyXG5cdFx0XHR2YXIgYWRkcmVzcyA9ICcnICsgKGhhc2hlciA/IGhhc2hlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDoga2V5KTtcclxuXHRcdFx0aWYgKCFfLmhhcyhjYWNoZSwgYWRkcmVzcykpIGNhY2hlW2FkZHJlc3NdID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gY2FjaGVbYWRkcmVzc107XHJcblx0XHR9O1xyXG5cdFx0bWVtb2l6ZS5jYWNoZSA9IHt9O1xyXG5cdFx0cmV0dXJuIG1lbW9pemU7XHJcblx0fTtcclxuXHJcblx0Ly8gRGVsYXlzIGEgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzLCBhbmQgdGhlbiBjYWxsc1xyXG5cdC8vIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cclxuXHRfLmRlbGF5ID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQpIHtcclxuXHRcdHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xyXG5cdFx0cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gZnVuYy5hcHBseShudWxsLCBhcmdzKTtcclxuXHRcdH0sIHdhaXQpO1xyXG5cdH07XHJcblxyXG5cdC8vIERlZmVycyBhIGZ1bmN0aW9uLCBzY2hlZHVsaW5nIGl0IHRvIHJ1biBhZnRlciB0aGUgY3VycmVudCBjYWxsIHN0YWNrIGhhc1xyXG5cdC8vIGNsZWFyZWQuXHJcblx0Xy5kZWZlciA9IF8ucGFydGlhbChfLmRlbGF5LCBfLCAxKTtcclxuXHJcblx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgYXQgbW9zdCBvbmNlXHJcblx0Ly8gZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuIE5vcm1hbGx5LCB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHdpbGwgcnVuXHJcblx0Ly8gYXMgbXVjaCBhcyBpdCBjYW4sIHdpdGhvdXQgZXZlciBnb2luZyBtb3JlIHRoYW4gb25jZSBwZXIgYHdhaXRgIGR1cmF0aW9uO1xyXG5cdC8vIGJ1dCBpZiB5b3UnZCBsaWtlIHRvIGRpc2FibGUgdGhlIGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlLCBwYXNzXHJcblx0Ly8gYHtsZWFkaW5nOiBmYWxzZX1gLiBUbyBkaXNhYmxlIGV4ZWN1dGlvbiBvbiB0aGUgdHJhaWxpbmcgZWRnZSwgZGl0dG8uXHJcblx0Xy50aHJvdHRsZSA9IGZ1bmN0aW9uIChmdW5jLCB3YWl0LCBvcHRpb25zKSB7XHJcblx0XHR2YXIgY29udGV4dCwgYXJncywgcmVzdWx0O1xyXG5cdFx0dmFyIHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0dmFyIHByZXZpb3VzID0gMDtcclxuXHRcdGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xyXG5cdFx0dmFyIGxhdGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogXy5ub3coKTtcclxuXHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcblx0XHRcdGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xyXG5cdFx0fTtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBub3cgPSBfLm5vdygpO1xyXG5cdFx0XHRpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93O1xyXG5cdFx0XHR2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XHJcblx0XHRcdGNvbnRleHQgPSB0aGlzO1xyXG5cdFx0XHRhcmdzID0gYXJndW1lbnRzO1xyXG5cdFx0XHRpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xyXG5cdFx0XHRcdGlmICh0aW1lb3V0KSB7XHJcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cHJldmlvdXMgPSBub3c7XHJcblx0XHRcdFx0cmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuXHRcdFx0XHRpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcclxuXHRcdFx0fSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3RcclxuXHQvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXHJcblx0Ly8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXHJcblx0Ly8gbGVhZGluZyBlZGdlLCBpbnN0ZWFkIG9mIHRoZSB0cmFpbGluZy5cclxuXHRfLmRlYm91bmNlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xyXG5cdFx0dmFyIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xyXG5cclxuXHRcdHZhciBsYXRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGxhc3QgPSBfLm5vdygpIC0gdGltZXN0YW1wO1xyXG5cclxuXHRcdFx0aWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPj0gMCkge1xyXG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdFx0aWYgKCFpbW1lZGlhdGUpIHtcclxuXHRcdFx0XHRcdHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XHJcblx0XHRcdFx0XHRpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Y29udGV4dCA9IHRoaXM7XHJcblx0XHRcdGFyZ3MgPSBhcmd1bWVudHM7XHJcblx0XHRcdHRpbWVzdGFtcCA9IF8ubm93KCk7XHJcblx0XHRcdHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xyXG5cdFx0XHRpZiAoIXRpbWVvdXQpIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcclxuXHRcdFx0aWYgKGNhbGxOb3cpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHRcdGNvbnRleHQgPSBhcmdzID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0Ly8gUmV0dXJucyB0aGUgZmlyc3QgZnVuY3Rpb24gcGFzc2VkIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSBzZWNvbmQsXHJcblx0Ly8gYWxsb3dpbmcgeW91IHRvIGFkanVzdCBhcmd1bWVudHMsIHJ1biBjb2RlIGJlZm9yZSBhbmQgYWZ0ZXIsIGFuZFxyXG5cdC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXHJcblx0Xy53cmFwID0gZnVuY3Rpb24gKGZ1bmMsIHdyYXBwZXIpIHtcclxuXHRcdHJldHVybiBfLnBhcnRpYWwod3JhcHBlciwgZnVuYyk7XHJcblx0fTtcclxuXHJcblx0Ly8gUmV0dXJucyBhIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgcGFzc2VkLWluIHByZWRpY2F0ZS5cclxuXHRfLm5lZ2F0ZSA9IGZ1bmN0aW9uIChwcmVkaWNhdGUpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiAhcHJlZGljYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBlYWNoXHJcblx0Ly8gY29uc3VtaW5nIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZ1bmN0aW9uIHRoYXQgZm9sbG93cy5cclxuXHRfLmNvbXBvc2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuXHRcdHZhciBzdGFydCA9IGFyZ3MubGVuZ3RoIC0gMTtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBpID0gc3RhcnQ7XHJcblx0XHRcdHZhciByZXN1bHQgPSBhcmdzW3N0YXJ0XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHR3aGlsZSAoaS0tKSByZXN1bHQgPSBhcmdzW2ldLmNhbGwodGhpcywgcmVzdWx0KTtcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIG9uIGFuZCBhZnRlciB0aGUgTnRoIGNhbGwuXHJcblx0Xy5hZnRlciA9IGZ1bmN0aW9uICh0aW1lcywgZnVuYykge1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKC0tdGltZXMgPCAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgdXAgdG8gKGJ1dCBub3QgaW5jbHVkaW5nKSB0aGUgTnRoIGNhbGwuXHJcblx0Xy5iZWZvcmUgPSBmdW5jdGlvbiAodGltZXMsIGZ1bmMpIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKC0tdGltZXMgPiAwKSB7XHJcblx0XHRcdFx0bWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGltZXMgPD0gMSkgZnVuYyA9IG51bGw7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGF0IG1vc3Qgb25lIHRpbWUsIG5vIG1hdHRlciBob3dcclxuXHQvLyBvZnRlbiB5b3UgY2FsbCBpdC4gVXNlZnVsIGZvciBsYXp5IGluaXRpYWxpemF0aW9uLlxyXG5cdF8ub25jZSA9IF8ucGFydGlhbChfLmJlZm9yZSwgMik7XHJcblxyXG5cdC8vIE9iamVjdCBGdW5jdGlvbnNcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdC8vIEtleXMgaW4gSUUgPCA5IHRoYXQgd29uJ3QgYmUgaXRlcmF0ZWQgYnkgYGZvciBrZXkgaW4gLi4uYCBhbmQgdGh1cyBtaXNzZWQuXHJcblx0dmFyIGhhc0VudW1CdWcgPSAheyB0b1N0cmluZzogbnVsbCB9LnByb3BlcnR5SXNFbnVtZXJhYmxlKCd0b1N0cmluZycpO1xyXG5cdHZhciBub25FbnVtZXJhYmxlUHJvcHMgPSBbJ3ZhbHVlT2YnLCAnaXNQcm90b3R5cGVPZicsICd0b1N0cmluZycsXHJcblx0XHQncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXTtcclxuXHJcblx0ZnVuY3Rpb24gY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpIHtcclxuXHRcdHZhciBub25FbnVtSWR4ID0gbm9uRW51bWVyYWJsZVByb3BzLmxlbmd0aDtcclxuXHRcdHZhciBjb25zdHJ1Y3RvciA9IG9iai5jb25zdHJ1Y3RvcjtcclxuXHRcdHZhciBwcm90byA9IChfLmlzRnVuY3Rpb24oY29uc3RydWN0b3IpICYmIGNvbnN0cnVjdG9yLnByb3RvdHlwZSkgfHwgT2JqUHJvdG87XHJcblxyXG5cdFx0Ly8gQ29uc3RydWN0b3IgaXMgYSBzcGVjaWFsIGNhc2UuXHJcblx0XHR2YXIgcHJvcCA9ICdjb25zdHJ1Y3Rvcic7XHJcblx0XHRpZiAoXy5oYXMob2JqLCBwcm9wKSAmJiAhXy5jb250YWlucyhrZXlzLCBwcm9wKSkga2V5cy5wdXNoKHByb3ApO1xyXG5cclxuXHRcdHdoaWxlIChub25FbnVtSWR4LS0pIHtcclxuXHRcdFx0cHJvcCA9IG5vbkVudW1lcmFibGVQcm9wc1tub25FbnVtSWR4XTtcclxuXHRcdFx0aWYgKHByb3AgaW4gb2JqICYmIG9ialtwcm9wXSAhPT0gcHJvdG9bcHJvcF0gJiYgIV8uY29udGFpbnMoa2V5cywgcHJvcCkpIHtcclxuXHRcdFx0XHRrZXlzLnB1c2gocHJvcCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIFJldHJpZXZlIHRoZSBuYW1lcyBvZiBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcy5cclxuXHQvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgT2JqZWN0LmtleXNgXHJcblx0Xy5rZXlzID0gZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0aWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcclxuXHRcdGlmIChuYXRpdmVLZXlzKSByZXR1cm4gbmF0aXZlS2V5cyhvYmopO1xyXG5cdFx0dmFyIGtleXMgPSBbXTtcclxuXHRcdGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xyXG5cdFx0Ly8gQWhlbSwgSUUgPCA5LlxyXG5cdFx0aWYgKGhhc0VudW1CdWcpIGNvbGxlY3ROb25FbnVtUHJvcHMob2JqLCBrZXlzKTtcclxuXHRcdHJldHVybiBrZXlzO1xyXG5cdH07XHJcblxyXG5cdC8vIFJldHJpZXZlIGFsbCB0aGUgcHJvcGVydHkgbmFtZXMgb2YgYW4gb2JqZWN0LlxyXG5cdF8uYWxsS2V5cyA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gW107XHJcblx0XHR2YXIga2V5cyA9IFtdO1xyXG5cdFx0Zm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XHJcblx0XHQvLyBBaGVtLCBJRSA8IDkuXHJcblx0XHRpZiAoaGFzRW51bUJ1ZykgY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpO1xyXG5cdFx0cmV0dXJuIGtleXM7XHJcblx0fTtcclxuXHJcblx0Ly8gUmV0cmlldmUgdGhlIHZhbHVlcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxyXG5cdF8udmFsdWVzID0gZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0dmFyIGtleXMgPSBfLmtleXMob2JqKTtcclxuXHRcdHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcclxuXHRcdHZhciB2YWx1ZXMgPSBBcnJheShsZW5ndGgpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YWx1ZXNbaV0gPSBvYmpba2V5c1tpXV07XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdmFsdWVzO1xyXG5cdH07XHJcblxyXG5cdC8vIFJldHVybnMgdGhlIHJlc3VsdHMgb2YgYXBwbHlpbmcgdGhlIGl0ZXJhdGVlIHRvIGVhY2ggZWxlbWVudCBvZiB0aGUgb2JqZWN0XHJcblx0Ly8gSW4gY29udHJhc3QgdG8gXy5tYXAgaXQgcmV0dXJucyBhbiBvYmplY3RcclxuXHRfLm1hcE9iamVjdCA9IGZ1bmN0aW9uIChvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcblx0XHRpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcclxuXHRcdHZhciBrZXlzID0gXy5rZXlzKG9iaiksXHJcblx0XHRcdGxlbmd0aCA9IGtleXMubGVuZ3RoLFxyXG5cdFx0XHRyZXN1bHRzID0ge30sXHJcblx0XHRcdGN1cnJlbnRLZXk7XHJcblx0XHRmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcblx0XHRcdGN1cnJlbnRLZXkgPSBrZXlzW2luZGV4XTtcclxuXHRcdFx0cmVzdWx0c1tjdXJyZW50S2V5XSA9IGl0ZXJhdGVlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHRzO1xyXG5cdH07XHJcblxyXG5cdC8vIENvbnZlcnQgYW4gb2JqZWN0IGludG8gYSBsaXN0IG9mIGBba2V5LCB2YWx1ZV1gIHBhaXJzLlxyXG5cdF8ucGFpcnMgPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHR2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xyXG5cdFx0dmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xyXG5cdFx0dmFyIHBhaXJzID0gQXJyYXkobGVuZ3RoKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0cGFpcnNbaV0gPSBba2V5c1tpXSwgb2JqW2tleXNbaV1dXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYWlycztcclxuXHR9O1xyXG5cclxuXHQvLyBJbnZlcnQgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiBhbiBvYmplY3QuIFRoZSB2YWx1ZXMgbXVzdCBiZSBzZXJpYWxpemFibGUuXHJcblx0Xy5pbnZlcnQgPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0ge307XHJcblx0XHR2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0cmVzdWx0W29ialtrZXlzW2ldXV0gPSBrZXlzW2ldO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm4gYSBzb3J0ZWQgbGlzdCBvZiB0aGUgZnVuY3Rpb24gbmFtZXMgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QuXHJcblx0Ly8gQWxpYXNlZCBhcyBgbWV0aG9kc2BcclxuXHRfLmZ1bmN0aW9ucyA9IF8ubWV0aG9kcyA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdHZhciBuYW1lcyA9IFtdO1xyXG5cdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xyXG5cdFx0XHRpZiAoXy5pc0Z1bmN0aW9uKG9ialtrZXldKSkgbmFtZXMucHVzaChrZXkpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5hbWVzLnNvcnQoKTtcclxuXHR9O1xyXG5cclxuXHQvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cclxuXHRfLmV4dGVuZCA9IGNyZWF0ZUFzc2lnbmVyKF8uYWxsS2V5cyk7XHJcblxyXG5cdC8vIEFzc2lnbnMgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIG93biBwcm9wZXJ0aWVzIGluIHRoZSBwYXNzZWQtaW4gb2JqZWN0KHMpXHJcblx0Ly8gKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ24pXHJcblx0Xy5leHRlbmRPd24gPSBfLmFzc2lnbiA9IGNyZWF0ZUFzc2lnbmVyKF8ua2V5cyk7XHJcblxyXG5cdC8vIFJldHVybnMgdGhlIGZpcnN0IGtleSBvbiBhbiBvYmplY3QgdGhhdCBwYXNzZXMgYSBwcmVkaWNhdGUgdGVzdFxyXG5cdF8uZmluZEtleSA9IGZ1bmN0aW9uIChvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xyXG5cdFx0cHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcclxuXHRcdHZhciBrZXlzID0gXy5rZXlzKG9iaiksIGtleTtcclxuXHRcdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGtleSA9IGtleXNbaV07XHJcblx0XHRcdGlmIChwcmVkaWNhdGUob2JqW2tleV0sIGtleSwgb2JqKSkgcmV0dXJuIGtleTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBvYmplY3Qgb25seSBjb250YWluaW5nIHRoZSB3aGl0ZWxpc3RlZCBwcm9wZXJ0aWVzLlxyXG5cdF8ucGljayA9IGZ1bmN0aW9uIChvYmplY3QsIG9pdGVyYXRlZSwgY29udGV4dCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IHt9LCBvYmogPSBvYmplY3QsIGl0ZXJhdGVlLCBrZXlzO1xyXG5cdFx0aWYgKG9iaiA9PSBudWxsKSByZXR1cm4gcmVzdWx0O1xyXG5cdFx0aWYgKF8uaXNGdW5jdGlvbihvaXRlcmF0ZWUpKSB7XHJcblx0XHRcdGtleXMgPSBfLmFsbEtleXMob2JqKTtcclxuXHRcdFx0aXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKG9pdGVyYXRlZSwgY29udGV4dCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRrZXlzID0gZmxhdHRlbihhcmd1bWVudHMsIGZhbHNlLCBmYWxzZSwgMSk7XHJcblx0XHRcdGl0ZXJhdGVlID0gZnVuY3Rpb24gKHZhbHVlLCBrZXksIG9iaikgeyByZXR1cm4ga2V5IGluIG9iajsgfTtcclxuXHRcdFx0b2JqID0gT2JqZWN0KG9iaik7XHJcblx0XHR9XHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIga2V5ID0ga2V5c1tpXTtcclxuXHRcdFx0dmFyIHZhbHVlID0gb2JqW2tleV07XHJcblx0XHRcdGlmIChpdGVyYXRlZSh2YWx1ZSwga2V5LCBvYmopKSByZXN1bHRba2V5XSA9IHZhbHVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBvYmplY3Qgd2l0aG91dCB0aGUgYmxhY2tsaXN0ZWQgcHJvcGVydGllcy5cclxuXHRfLm9taXQgPSBmdW5jdGlvbiAob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xyXG5cdFx0aWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcclxuXHRcdFx0aXRlcmF0ZWUgPSBfLm5lZ2F0ZShpdGVyYXRlZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIga2V5cyA9IF8ubWFwKGZsYXR0ZW4oYXJndW1lbnRzLCBmYWxzZSwgZmFsc2UsIDEpLCBTdHJpbmcpO1xyXG5cdFx0XHRpdGVyYXRlZSA9IGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcblx0XHRcdFx0cmV0dXJuICFfLmNvbnRhaW5zKGtleXMsIGtleSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gXy5waWNrKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpO1xyXG5cdH07XHJcblxyXG5cdC8vIEZpbGwgaW4gYSBnaXZlbiBvYmplY3Qgd2l0aCBkZWZhdWx0IHByb3BlcnRpZXMuXHJcblx0Xy5kZWZhdWx0cyA9IGNyZWF0ZUFzc2lnbmVyKF8uYWxsS2V5cywgdHJ1ZSk7XHJcblxyXG5cdC8vIENyZWF0ZXMgYW4gb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGUgZ2l2ZW4gcHJvdG90eXBlIG9iamVjdC5cclxuXHQvLyBJZiBhZGRpdGlvbmFsIHByb3BlcnRpZXMgYXJlIHByb3ZpZGVkIHRoZW4gdGhleSB3aWxsIGJlIGFkZGVkIHRvIHRoZVxyXG5cdC8vIGNyZWF0ZWQgb2JqZWN0LlxyXG5cdF8uY3JlYXRlID0gZnVuY3Rpb24gKHByb3RvdHlwZSwgcHJvcHMpIHtcclxuXHRcdHZhciByZXN1bHQgPSBiYXNlQ3JlYXRlKHByb3RvdHlwZSk7XHJcblx0XHRpZiAocHJvcHMpIF8uZXh0ZW5kT3duKHJlc3VsdCwgcHJvcHMpO1xyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9O1xyXG5cclxuXHQvLyBDcmVhdGUgYSAoc2hhbGxvdy1jbG9uZWQpIGR1cGxpY2F0ZSBvZiBhbiBvYmplY3QuXHJcblx0Xy5jbG9uZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xyXG5cdFx0cmV0dXJuIF8uaXNBcnJheShvYmopID8gb2JqLnNsaWNlKCkgOiBfLmV4dGVuZCh7fSwgb2JqKTtcclxuXHR9O1xyXG5cclxuXHQvLyBJbnZva2VzIGludGVyY2VwdG9yIHdpdGggdGhlIG9iaiwgYW5kIHRoZW4gcmV0dXJucyBvYmouXHJcblx0Ly8gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0byBcInRhcCBpbnRvXCIgYSBtZXRob2QgY2hhaW4sIGluXHJcblx0Ly8gb3JkZXIgdG8gcGVyZm9ybSBvcGVyYXRpb25zIG9uIGludGVybWVkaWF0ZSByZXN1bHRzIHdpdGhpbiB0aGUgY2hhaW4uXHJcblx0Xy50YXAgPSBmdW5jdGlvbiAob2JqLCBpbnRlcmNlcHRvcikge1xyXG5cdFx0aW50ZXJjZXB0b3Iob2JqKTtcclxuXHRcdHJldHVybiBvYmo7XHJcblx0fTtcclxuXHJcblx0Ly8gUmV0dXJucyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2YgYGtleTp2YWx1ZWAgcGFpcnMuXHJcblx0Xy5pc01hdGNoID0gZnVuY3Rpb24gKG9iamVjdCwgYXR0cnMpIHtcclxuXHRcdHZhciBrZXlzID0gXy5rZXlzKGF0dHJzKSwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XHJcblx0XHRpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiAhbGVuZ3RoO1xyXG5cdFx0dmFyIG9iaiA9IE9iamVjdChvYmplY3QpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIga2V5ID0ga2V5c1tpXTtcclxuXHRcdFx0aWYgKGF0dHJzW2tleV0gIT09IG9ialtrZXldIHx8ICEoa2V5IGluIG9iaikpIHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH07XHJcblxyXG5cclxuXHQvLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxyXG5cdHZhciBlcSA9IGZ1bmN0aW9uIChhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xyXG5cdFx0Ly8gSWRlbnRpY2FsIG9iamVjdHMgYXJlIGVxdWFsLiBgMCA9PT0gLTBgLCBidXQgdGhleSBhcmVuJ3QgaWRlbnRpY2FsLlxyXG5cdFx0Ly8gU2VlIHRoZSBbSGFybW9ueSBgZWdhbGAgcHJvcG9zYWxdKGh0dHA6Ly93aWtpLmVjbWFzY3JpcHQub3JnL2Rva3UucGhwP2lkPWhhcm1vbnk6ZWdhbCkuXHJcblx0XHRpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xyXG5cdFx0Ly8gQSBzdHJpY3QgY29tcGFyaXNvbiBpcyBuZWNlc3NhcnkgYmVjYXVzZSBgbnVsbCA9PSB1bmRlZmluZWRgLlxyXG5cdFx0aWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBhID09PSBiO1xyXG5cdFx0Ly8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXHJcblx0XHRpZiAoYSBpbnN0YW5jZW9mIF8pIGEgPSBhLl93cmFwcGVkO1xyXG5cdFx0aWYgKGIgaW5zdGFuY2VvZiBfKSBiID0gYi5fd3JhcHBlZDtcclxuXHRcdC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXHJcblx0XHR2YXIgY2xhc3NOYW1lID0gdG9TdHJpbmcuY2FsbChhKTtcclxuXHRcdGlmIChjbGFzc05hbWUgIT09IHRvU3RyaW5nLmNhbGwoYikpIHJldHVybiBmYWxzZTtcclxuXHRcdHN3aXRjaCAoY2xhc3NOYW1lKSB7XHJcblx0XHRcdC8vIFN0cmluZ3MsIG51bWJlcnMsIHJlZ3VsYXIgZXhwcmVzc2lvbnMsIGRhdGVzLCBhbmQgYm9vbGVhbnMgYXJlIGNvbXBhcmVkIGJ5IHZhbHVlLlxyXG5cdFx0XHRjYXNlICdbb2JqZWN0IFJlZ0V4cF0nOlxyXG5cdFx0XHQvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxyXG5cdFx0XHRjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxyXG5cdFx0XHRcdC8vIFByaW1pdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgb2JqZWN0IHdyYXBwZXJzIGFyZSBlcXVpdmFsZW50OyB0aHVzLCBgXCI1XCJgIGlzXHJcblx0XHRcdFx0Ly8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxyXG5cdFx0XHRcdHJldHVybiAnJyArIGEgPT09ICcnICsgYjtcclxuXHRcdFx0Y2FzZSAnW29iamVjdCBOdW1iZXJdJzpcclxuXHRcdFx0XHQvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxyXG5cdFx0XHRcdC8vIE9iamVjdChOYU4pIGlzIGVxdWl2YWxlbnQgdG8gTmFOXHJcblx0XHRcdFx0aWYgKCthICE9PSArYSkgcmV0dXJuICtiICE9PSArYjtcclxuXHRcdFx0XHQvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxyXG5cdFx0XHRcdHJldHVybiArYSA9PT0gMCA/IDEgLyArYSA9PT0gMSAvIGIgOiArYSA9PT0gK2I7XHJcblx0XHRcdGNhc2UgJ1tvYmplY3QgRGF0ZV0nOlxyXG5cdFx0XHRjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcclxuXHRcdFx0XHQvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWVyaWMgcHJpbWl0aXZlIHZhbHVlcy4gRGF0ZXMgYXJlIGNvbXBhcmVkIGJ5IHRoZWlyXHJcblx0XHRcdFx0Ly8gbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zLiBOb3RlIHRoYXQgaW52YWxpZCBkYXRlcyB3aXRoIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9uc1xyXG5cdFx0XHRcdC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cclxuXHRcdFx0XHRyZXR1cm4gK2EgPT09ICtiO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBhcmVBcnJheXMgPSBjbGFzc05hbWUgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcblx0XHRpZiAoIWFyZUFycmF5cykge1xyXG5cdFx0XHRpZiAodHlwZW9mIGEgIT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdC8vIE9iamVjdHMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1aXZhbGVudCwgYnV0IGBPYmplY3RgcyBvciBgQXJyYXlgc1xyXG5cdFx0XHQvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxyXG5cdFx0XHR2YXIgYUN0b3IgPSBhLmNvbnN0cnVjdG9yLCBiQ3RvciA9IGIuY29uc3RydWN0b3I7XHJcblx0XHRcdGlmIChhQ3RvciAhPT0gYkN0b3IgJiYgIShfLmlzRnVuY3Rpb24oYUN0b3IpICYmIGFDdG9yIGluc3RhbmNlb2YgYUN0b3IgJiZcclxuXHRcdFx0XHRfLmlzRnVuY3Rpb24oYkN0b3IpICYmIGJDdG9yIGluc3RhbmNlb2YgYkN0b3IpXHJcblx0XHRcdFx0JiYgKCdjb25zdHJ1Y3RvcicgaW4gYSAmJiAnY29uc3RydWN0b3InIGluIGIpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHQvLyBBc3N1bWUgZXF1YWxpdHkgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGUgYWxnb3JpdGhtIGZvciBkZXRlY3RpbmcgY3ljbGljXHJcblx0XHQvLyBzdHJ1Y3R1cmVzIGlzIGFkYXB0ZWQgZnJvbSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLCBhYnN0cmFjdCBvcGVyYXRpb24gYEpPYC5cclxuXHJcblx0XHQvLyBJbml0aWFsaXppbmcgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXHJcblx0XHQvLyBJdCdzIGRvbmUgaGVyZSBzaW5jZSB3ZSBvbmx5IG5lZWQgdGhlbSBmb3Igb2JqZWN0cyBhbmQgYXJyYXlzIGNvbXBhcmlzb24uXHJcblx0XHRhU3RhY2sgPSBhU3RhY2sgfHwgW107XHJcblx0XHRiU3RhY2sgPSBiU3RhY2sgfHwgW107XHJcblx0XHR2YXIgbGVuZ3RoID0gYVN0YWNrLmxlbmd0aDtcclxuXHRcdHdoaWxlIChsZW5ndGgtLSkge1xyXG5cdFx0XHQvLyBMaW5lYXIgc2VhcmNoLiBQZXJmb3JtYW5jZSBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2ZcclxuXHRcdFx0Ly8gdW5pcXVlIG5lc3RlZCBzdHJ1Y3R1cmVzLlxyXG5cdFx0XHRpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXHJcblx0XHRhU3RhY2sucHVzaChhKTtcclxuXHRcdGJTdGFjay5wdXNoKGIpO1xyXG5cclxuXHRcdC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyBhbmQgYXJyYXlzLlxyXG5cdFx0aWYgKGFyZUFycmF5cykge1xyXG5cdFx0XHQvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cclxuXHRcdFx0bGVuZ3RoID0gYS5sZW5ndGg7XHJcblx0XHRcdGlmIChsZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXHJcblx0XHRcdHdoaWxlIChsZW5ndGgtLSkge1xyXG5cdFx0XHRcdGlmICghZXEoYVtsZW5ndGhdLCBiW2xlbmd0aF0sIGFTdGFjaywgYlN0YWNrKSkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBEZWVwIGNvbXBhcmUgb2JqZWN0cy5cclxuXHRcdFx0dmFyIGtleXMgPSBfLmtleXMoYSksIGtleTtcclxuXHRcdFx0bGVuZ3RoID0ga2V5cy5sZW5ndGg7XHJcblx0XHRcdC8vIEVuc3VyZSB0aGF0IGJvdGggb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIG51bWJlciBvZiBwcm9wZXJ0aWVzIGJlZm9yZSBjb21wYXJpbmcgZGVlcCBlcXVhbGl0eS5cclxuXHRcdFx0aWYgKF8ua2V5cyhiKS5sZW5ndGggIT09IGxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR3aGlsZSAobGVuZ3RoLS0pIHtcclxuXHRcdFx0XHQvLyBEZWVwIGNvbXBhcmUgZWFjaCBtZW1iZXJcclxuXHRcdFx0XHRrZXkgPSBrZXlzW2xlbmd0aF07XHJcblx0XHRcdFx0aWYgKCEoXy5oYXMoYiwga2V5KSAmJiBlcShhW2tleV0sIGJba2V5XSwgYVN0YWNrLCBiU3RhY2spKSkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHQvLyBSZW1vdmUgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cclxuXHRcdGFTdGFjay5wb3AoKTtcclxuXHRcdGJTdGFjay5wb3AoKTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH07XHJcblxyXG5cdC8vIFBlcmZvcm0gYSBkZWVwIGNvbXBhcmlzb24gdG8gY2hlY2sgaWYgdHdvIG9iamVjdHMgYXJlIGVxdWFsLlxyXG5cdF8uaXNFcXVhbCA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRyZXR1cm4gZXEoYSwgYik7XHJcblx0fTtcclxuXHJcblx0Ly8gSXMgYSBnaXZlbiBhcnJheSwgc3RyaW5nLCBvciBvYmplY3QgZW1wdHk/XHJcblx0Ly8gQW4gXCJlbXB0eVwiIG9iamVjdCBoYXMgbm8gZW51bWVyYWJsZSBvd24tcHJvcGVydGllcy5cclxuXHRfLmlzRW1wdHkgPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRpZiAob2JqID09IG51bGwpIHJldHVybiB0cnVlO1xyXG5cdFx0aWYgKGlzQXJyYXlMaWtlKG9iaikgJiYgKF8uaXNBcnJheShvYmopIHx8IF8uaXNTdHJpbmcob2JqKSB8fCBfLmlzQXJndW1lbnRzKG9iaikpKSByZXR1cm4gb2JqLmxlbmd0aCA9PT0gMDtcclxuXHRcdHJldHVybiBfLmtleXMob2JqKS5sZW5ndGggPT09IDA7XHJcblx0fTtcclxuXHJcblx0Ly8gSXMgYSBnaXZlbiB2YWx1ZSBhIERPTSBlbGVtZW50P1xyXG5cdF8uaXNFbGVtZW50ID0gZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0cmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xyXG5cdH07XHJcblxyXG5cdC8vIElzIGEgZ2l2ZW4gdmFsdWUgYW4gYXJyYXk/XHJcblx0Ly8gRGVsZWdhdGVzIHRvIEVDTUE1J3MgbmF0aXZlIEFycmF5LmlzQXJyYXlcclxuXHRfLmlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcblx0fTtcclxuXHJcblx0Ly8gSXMgYSBnaXZlbiB2YXJpYWJsZSBhbiBvYmplY3Q/XHJcblx0Xy5pc09iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdHZhciB0eXBlID0gdHlwZW9mIG9iajtcclxuXHRcdHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xyXG5cdH07XHJcblxyXG5cdC8vIEFkZCBzb21lIGlzVHlwZSBtZXRob2RzOiBpc0FyZ3VtZW50cywgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0RhdGUsIGlzUmVnRXhwLCBpc0Vycm9yLlxyXG5cdF8uZWFjaChbJ0FyZ3VtZW50cycsICdGdW5jdGlvbicsICdTdHJpbmcnLCAnTnVtYmVyJywgJ0RhdGUnLCAnUmVnRXhwJywgJ0Vycm9yJ10sIGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRfWydpcycgKyBuYW1lXSA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdFx0cmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIG5hbWUgKyAnXSc7XHJcblx0XHR9O1xyXG5cdH0pO1xyXG5cclxuXHQvLyBEZWZpbmUgYSBmYWxsYmFjayB2ZXJzaW9uIG9mIHRoZSBtZXRob2QgaW4gYnJvd3NlcnMgKGFoZW0sIElFIDwgOSksIHdoZXJlXHJcblx0Ly8gdGhlcmUgaXNuJ3QgYW55IGluc3BlY3RhYmxlIFwiQXJndW1lbnRzXCIgdHlwZS5cclxuXHRpZiAoIV8uaXNBcmd1bWVudHMoYXJndW1lbnRzKSkge1xyXG5cdFx0Xy5pc0FyZ3VtZW50cyA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdFx0cmV0dXJuIF8uaGFzKG9iaiwgJ2NhbGxlZScpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8vIE9wdGltaXplIGBpc0Z1bmN0aW9uYCBpZiBhcHByb3ByaWF0ZS4gV29yayBhcm91bmQgc29tZSB0eXBlb2YgYnVncyBpbiBvbGQgdjgsXHJcblx0Ly8gSUUgMTEgKCMxNjIxKSwgYW5kIGluIFNhZmFyaSA4ICgjMTkyOSkuXHJcblx0aWYgKHR5cGVvZiAvLi8gIT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgSW50OEFycmF5ICE9ICdvYmplY3QnKSB7XHJcblx0XHRfLmlzRnVuY3Rpb24gPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRcdHJldHVybiB0eXBlb2Ygb2JqID09ICdmdW5jdGlvbicgfHwgZmFsc2U7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Ly8gSXMgYSBnaXZlbiBvYmplY3QgYSBmaW5pdGUgbnVtYmVyP1xyXG5cdF8uaXNGaW5pdGUgPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRyZXR1cm4gaXNGaW5pdGUob2JqKSAmJiAhaXNOYU4ocGFyc2VGbG9hdChvYmopKTtcclxuXHR9O1xyXG5cclxuXHQvLyBJcyB0aGUgZ2l2ZW4gdmFsdWUgYE5hTmA/IChOYU4gaXMgdGhlIG9ubHkgbnVtYmVyIHdoaWNoIGRvZXMgbm90IGVxdWFsIGl0c2VsZikuXHJcblx0Xy5pc05hTiA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdHJldHVybiBfLmlzTnVtYmVyKG9iaikgJiYgb2JqICE9PSArb2JqO1xyXG5cdH07XHJcblxyXG5cdC8vIElzIGEgZ2l2ZW4gdmFsdWUgYSBib29sZWFuP1xyXG5cdF8uaXNCb29sZWFuID0gZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0cmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xyXG5cdH07XHJcblxyXG5cdC8vIElzIGEgZ2l2ZW4gdmFsdWUgZXF1YWwgdG8gbnVsbD9cclxuXHRfLmlzTnVsbCA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdHJldHVybiBvYmogPT09IG51bGw7XHJcblx0fTtcclxuXHJcblx0Ly8gSXMgYSBnaXZlbiB2YXJpYWJsZSB1bmRlZmluZWQ/XHJcblx0Xy5pc1VuZGVmaW5lZCA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdHJldHVybiBvYmogPT09IHZvaWQgMDtcclxuXHR9O1xyXG5cclxuXHQvLyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgY2hlY2tpbmcgaWYgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHByb3BlcnR5IGRpcmVjdGx5XHJcblx0Ly8gb24gaXRzZWxmIChpbiBvdGhlciB3b3Jkcywgbm90IG9uIGEgcHJvdG90eXBlKS5cclxuXHRfLmhhcyA9IGZ1bmN0aW9uIChvYmosIGtleSkge1xyXG5cdFx0cmV0dXJuIG9iaiAhPSBudWxsICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xyXG5cdH07XHJcblxyXG5cdC8vIFV0aWxpdHkgRnVuY3Rpb25zXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0Ly8gUnVuIFVuZGVyc2NvcmUuanMgaW4gKm5vQ29uZmxpY3QqIG1vZGUsIHJldHVybmluZyB0aGUgYF9gIHZhcmlhYmxlIHRvIGl0c1xyXG5cdC8vIHByZXZpb3VzIG93bmVyLiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdC5cclxuXHRfLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyb290Ll8gPSBwcmV2aW91c1VuZGVyc2NvcmU7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvLyBLZWVwIHRoZSBpZGVudGl0eSBmdW5jdGlvbiBhcm91bmQgZm9yIGRlZmF1bHQgaXRlcmF0ZWVzLlxyXG5cdF8uaWRlbnRpdHkgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9O1xyXG5cclxuXHQvLyBQcmVkaWNhdGUtZ2VuZXJhdGluZyBmdW5jdGlvbnMuIE9mdGVuIHVzZWZ1bCBvdXRzaWRlIG9mIFVuZGVyc2NvcmUuXHJcblx0Xy5jb25zdGFudCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRfLm5vb3AgPSBmdW5jdGlvbiAoKSB7IH07XHJcblxyXG5cdF8ucHJvcGVydHkgPSBmdW5jdGlvbiAoa2V5KSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0XHRyZXR1cm4gb2JqID09IG51bGwgPyB2b2lkIDAgOiBvYmpba2V5XTtcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0Ly8gR2VuZXJhdGVzIGEgZnVuY3Rpb24gZm9yIGEgZ2l2ZW4gb2JqZWN0IHRoYXQgcmV0dXJucyBhIGdpdmVuIHByb3BlcnR5LlxyXG5cdF8ucHJvcGVydHlPZiA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdHJldHVybiBvYmogPT0gbnVsbCA/IGZ1bmN0aW9uICgpIHsgfSA6IGZ1bmN0aW9uIChrZXkpIHtcclxuXHRcdFx0cmV0dXJuIG9ialtrZXldO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm5zIGEgcHJlZGljYXRlIGZvciBjaGVja2luZyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2YgXHJcblx0Ly8gYGtleTp2YWx1ZWAgcGFpcnMuXHJcblx0Xy5tYXRjaGVyID0gXy5tYXRjaGVzID0gZnVuY3Rpb24gKGF0dHJzKSB7XHJcblx0XHRhdHRycyA9IF8uZXh0ZW5kT3duKHt9LCBhdHRycyk7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0XHRyZXR1cm4gXy5pc01hdGNoKG9iaiwgYXR0cnMpO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQvLyBSdW4gYSBmdW5jdGlvbiAqKm4qKiB0aW1lcy5cclxuXHRfLnRpbWVzID0gZnVuY3Rpb24gKG4sIGl0ZXJhdGVlLCBjb250ZXh0KSB7XHJcblx0XHR2YXIgYWNjdW0gPSBBcnJheShNYXRoLm1heCgwLCBuKSk7XHJcblx0XHRpdGVyYXRlZSA9IG9wdGltaXplQ2IoaXRlcmF0ZWUsIGNvbnRleHQsIDEpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIGFjY3VtW2ldID0gaXRlcmF0ZWUoaSk7XHJcblx0XHRyZXR1cm4gYWNjdW07XHJcblx0fTtcclxuXHJcblx0Ly8gUmV0dXJuIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gYW5kIG1heCAoaW5jbHVzaXZlKS5cclxuXHRfLnJhbmRvbSA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xyXG5cdFx0aWYgKG1heCA9PSBudWxsKSB7XHJcblx0XHRcdG1heCA9IG1pbjtcclxuXHRcdFx0bWluID0gMDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xyXG5cdH07XHJcblxyXG5cdC8vIEEgKHBvc3NpYmx5IGZhc3Rlcikgd2F5IHRvIGdldCB0aGUgY3VycmVudCB0aW1lc3RhbXAgYXMgYW4gaW50ZWdlci5cclxuXHRfLm5vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHR9O1xyXG5cclxuXHQvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxyXG5cdHZhciBlc2NhcGVNYXAgPSB7XHJcblx0XHQnJic6ICcmYW1wOycsXHJcblx0XHQnPCc6ICcmbHQ7JyxcclxuXHRcdCc+JzogJyZndDsnLFxyXG5cdFx0J1wiJzogJyZxdW90OycsXHJcblx0XHRcIidcIjogJyYjeDI3OycsXHJcblx0XHQnYCc6ICcmI3g2MDsnXHJcblx0fTtcclxuXHR2YXIgdW5lc2NhcGVNYXAgPSBfLmludmVydChlc2NhcGVNYXApO1xyXG5cclxuXHQvLyBGdW5jdGlvbnMgZm9yIGVzY2FwaW5nIGFuZCB1bmVzY2FwaW5nIHN0cmluZ3MgdG8vZnJvbSBIVE1MIGludGVycG9sYXRpb24uXHJcblx0dmFyIGNyZWF0ZUVzY2FwZXIgPSBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHR2YXIgZXNjYXBlciA9IGZ1bmN0aW9uIChtYXRjaCkge1xyXG5cdFx0XHRyZXR1cm4gbWFwW21hdGNoXTtcclxuXHRcdH07XHJcblx0XHQvLyBSZWdleGVzIGZvciBpZGVudGlmeWluZyBhIGtleSB0aGF0IG5lZWRzIHRvIGJlIGVzY2FwZWRcclxuXHRcdHZhciBzb3VyY2UgPSAnKD86JyArIF8ua2V5cyhtYXApLmpvaW4oJ3wnKSArICcpJztcclxuXHRcdHZhciB0ZXN0UmVnZXhwID0gUmVnRXhwKHNvdXJjZSk7XHJcblx0XHR2YXIgcmVwbGFjZVJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UsICdnJyk7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xyXG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcgPT0gbnVsbCA/ICcnIDogJycgKyBzdHJpbmc7XHJcblx0XHRcdHJldHVybiB0ZXN0UmVnZXhwLnRlc3Qoc3RyaW5nKSA/IHN0cmluZy5yZXBsYWNlKHJlcGxhY2VSZWdleHAsIGVzY2FwZXIpIDogc3RyaW5nO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cdF8uZXNjYXBlID0gY3JlYXRlRXNjYXBlcihlc2NhcGVNYXApO1xyXG5cdF8udW5lc2NhcGUgPSBjcmVhdGVFc2NhcGVyKHVuZXNjYXBlTWFwKTtcclxuXHJcblx0Ly8gSWYgdGhlIHZhbHVlIG9mIHRoZSBuYW1lZCBgcHJvcGVydHlgIGlzIGEgZnVuY3Rpb24gdGhlbiBpbnZva2UgaXQgd2l0aCB0aGVcclxuXHQvLyBgb2JqZWN0YCBhcyBjb250ZXh0OyBvdGhlcndpc2UsIHJldHVybiBpdC5cclxuXHRfLnJlc3VsdCA9IGZ1bmN0aW9uIChvYmplY3QsIHByb3BlcnR5LCBmYWxsYmFjaykge1xyXG5cdFx0dmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB2b2lkIDAgOiBvYmplY3RbcHJvcGVydHldO1xyXG5cdFx0aWYgKHZhbHVlID09PSB2b2lkIDApIHtcclxuXHRcdFx0dmFsdWUgPSBmYWxsYmFjaztcclxuXHRcdH1cclxuXHRcdHJldHVybiBfLmlzRnVuY3Rpb24odmFsdWUpID8gdmFsdWUuY2FsbChvYmplY3QpIDogdmFsdWU7XHJcblx0fTtcclxuXHJcblx0Ly8gR2VuZXJhdGUgYSB1bmlxdWUgaW50ZWdlciBpZCAodW5pcXVlIHdpdGhpbiB0aGUgZW50aXJlIGNsaWVudCBzZXNzaW9uKS5cclxuXHQvLyBVc2VmdWwgZm9yIHRlbXBvcmFyeSBET00gaWRzLlxyXG5cdHZhciBpZENvdW50ZXIgPSAwO1xyXG5cdF8udW5pcXVlSWQgPSBmdW5jdGlvbiAocHJlZml4KSB7XHJcblx0XHR2YXIgaWQgPSArK2lkQ291bnRlciArICcnO1xyXG5cdFx0cmV0dXJuIHByZWZpeCA/IHByZWZpeCArIGlkIDogaWQ7XHJcblx0fTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXHJcblx0Ly8gZm9sbG93aW5nIHRlbXBsYXRlIHNldHRpbmdzIHRvIHVzZSBhbHRlcm5hdGl2ZSBkZWxpbWl0ZXJzLlxyXG5cdF8udGVtcGxhdGVTZXR0aW5ncyA9IHtcclxuXHRcdGV2YWx1YXRlOiAvPCUoW1xcc1xcU10rPyklPi9nLFxyXG5cdFx0aW50ZXJwb2xhdGU6IC88JT0oW1xcc1xcU10rPyklPi9nLFxyXG5cdFx0ZXNjYXBlOiAvPCUtKFtcXHNcXFNdKz8pJT4vZ1xyXG5cdH07XHJcblxyXG5cdC8vIFdoZW4gY3VzdG9taXppbmcgYHRlbXBsYXRlU2V0dGluZ3NgLCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBkZWZpbmUgYW5cclxuXHQvLyBpbnRlcnBvbGF0aW9uLCBldmFsdWF0aW9uIG9yIGVzY2FwaW5nIHJlZ2V4LCB3ZSBuZWVkIG9uZSB0aGF0IGlzXHJcblx0Ly8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXHJcblx0dmFyIG5vTWF0Y2ggPSAvKC4pXi87XHJcblxyXG5cdC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXHJcblx0Ly8gc3RyaW5nIGxpdGVyYWwuXHJcblx0dmFyIGVzY2FwZXMgPSB7XHJcblx0XHRcIidcIjogXCInXCIsXHJcblx0XHQnXFxcXCc6ICdcXFxcJyxcclxuXHRcdCdcXHInOiAncicsXHJcblx0XHQnXFxuJzogJ24nLFxyXG5cdFx0J1xcdTIwMjgnOiAndTIwMjgnLFxyXG5cdFx0J1xcdTIwMjknOiAndTIwMjknXHJcblx0fTtcclxuXHJcblx0dmFyIGVzY2FwZXIgPSAvXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2c7XHJcblxyXG5cdHZhciBlc2NhcGVDaGFyID0gZnVuY3Rpb24gKG1hdGNoKSB7XHJcblx0XHRyZXR1cm4gJ1xcXFwnICsgZXNjYXBlc1ttYXRjaF07XHJcblx0fTtcclxuXHJcblx0Ly8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cclxuXHQvLyBVbmRlcnNjb3JlIHRlbXBsYXRpbmcgaGFuZGxlcyBhcmJpdHJhcnkgZGVsaW1pdGVycywgcHJlc2VydmVzIHdoaXRlc3BhY2UsXHJcblx0Ly8gYW5kIGNvcnJlY3RseSBlc2NhcGVzIHF1b3RlcyB3aXRoaW4gaW50ZXJwb2xhdGVkIGNvZGUuXHJcblx0Ly8gTkI6IGBvbGRTZXR0aW5nc2Agb25seSBleGlzdHMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxyXG5cdF8udGVtcGxhdGUgPSBmdW5jdGlvbiAodGV4dCwgc2V0dGluZ3MsIG9sZFNldHRpbmdzKSB7XHJcblx0XHRpZiAoIXNldHRpbmdzICYmIG9sZFNldHRpbmdzKSBzZXR0aW5ncyA9IG9sZFNldHRpbmdzO1xyXG5cdFx0c2V0dGluZ3MgPSBfLmRlZmF1bHRzKHt9LCBzZXR0aW5ncywgXy50ZW1wbGF0ZVNldHRpbmdzKTtcclxuXHJcblx0XHQvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cclxuXHRcdHZhciBtYXRjaGVyID0gUmVnRXhwKFtcclxuXHRcdFx0KHNldHRpbmdzLmVzY2FwZSB8fCBub01hdGNoKS5zb3VyY2UsXHJcblx0XHRcdChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXHJcblx0XHRcdChzZXR0aW5ncy5ldmFsdWF0ZSB8fCBub01hdGNoKS5zb3VyY2VcclxuXHRcdF0uam9pbignfCcpICsgJ3wkJywgJ2cnKTtcclxuXHJcblx0XHQvLyBDb21waWxlIHRoZSB0ZW1wbGF0ZSBzb3VyY2UsIGVzY2FwaW5nIHN0cmluZyBsaXRlcmFscyBhcHByb3ByaWF0ZWx5LlxyXG5cdFx0dmFyIGluZGV4ID0gMDtcclxuXHRcdHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xyXG5cdFx0dGV4dC5yZXBsYWNlKG1hdGNoZXIsIGZ1bmN0aW9uIChtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xyXG5cdFx0XHRzb3VyY2UgKz0gdGV4dC5zbGljZShpbmRleCwgb2Zmc2V0KS5yZXBsYWNlKGVzY2FwZXIsIGVzY2FwZUNoYXIpO1xyXG5cdFx0XHRpbmRleCA9IG9mZnNldCArIG1hdGNoLmxlbmd0aDtcclxuXHJcblx0XHRcdGlmIChlc2NhcGUpIHtcclxuXHRcdFx0XHRzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6Xy5lc2NhcGUoX190KSkrXFxuJ1wiO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGludGVycG9sYXRlKSB7XHJcblx0XHRcdFx0c291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBpbnRlcnBvbGF0ZSArIFwiKSk9PW51bGw/Jyc6X190KStcXG4nXCI7XHJcblx0XHRcdH0gZWxzZSBpZiAoZXZhbHVhdGUpIHtcclxuXHRcdFx0XHRzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGUgKyBcIlxcbl9fcCs9J1wiO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXHJcblx0XHRcdHJldHVybiBtYXRjaDtcclxuXHRcdH0pO1xyXG5cdFx0c291cmNlICs9IFwiJztcXG5cIjtcclxuXHJcblx0XHQvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxyXG5cdFx0aWYgKCFzZXR0aW5ncy52YXJpYWJsZSkgc291cmNlID0gJ3dpdGgob2JqfHx7fSl7XFxuJyArIHNvdXJjZSArICd9XFxuJztcclxuXHJcblx0XHRzb3VyY2UgPSBcInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIiArXHJcblx0XHRcdFwicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIiArXHJcblx0XHRcdHNvdXJjZSArICdyZXR1cm4gX19wO1xcbic7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIHJlbmRlciA9IG5ldyBGdW5jdGlvbihzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJywgJ18nLCBzb3VyY2UpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRlLnNvdXJjZSA9IHNvdXJjZTtcclxuXHRcdFx0dGhyb3cgZTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdGVtcGxhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0XHRyZXR1cm4gcmVuZGVyLmNhbGwodGhpcywgZGF0YSwgXyk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIHNvdXJjZSBhcyBhIGNvbnZlbmllbmNlIGZvciBwcmVjb21waWxhdGlvbi5cclxuXHRcdHZhciBhcmd1bWVudCA9IHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonO1xyXG5cdFx0dGVtcGxhdGUuc291cmNlID0gJ2Z1bmN0aW9uKCcgKyBhcmd1bWVudCArICcpe1xcbicgKyBzb3VyY2UgKyAnfSc7XHJcblxyXG5cdFx0cmV0dXJuIHRlbXBsYXRlO1xyXG5cdH07XHJcblxyXG5cdC8vIEFkZCBhIFwiY2hhaW5cIiBmdW5jdGlvbi4gU3RhcnQgY2hhaW5pbmcgYSB3cmFwcGVkIFVuZGVyc2NvcmUgb2JqZWN0LlxyXG5cdF8uY2hhaW4gPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHR2YXIgaW5zdGFuY2UgPSBfKG9iaik7XHJcblx0XHRpbnN0YW5jZS5fY2hhaW4gPSB0cnVlO1xyXG5cdFx0cmV0dXJuIGluc3RhbmNlO1xyXG5cdH07XHJcblxyXG5cdC8vIE9PUFxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIElmIFVuZGVyc2NvcmUgaXMgY2FsbGVkIGFzIGEgZnVuY3Rpb24sIGl0IHJldHVybnMgYSB3cmFwcGVkIG9iamVjdCB0aGF0XHJcblx0Ly8gY2FuIGJlIHVzZWQgT08tc3R5bGUuIFRoaXMgd3JhcHBlciBob2xkcyBhbHRlcmVkIHZlcnNpb25zIG9mIGFsbCB0aGVcclxuXHQvLyB1bmRlcnNjb3JlIGZ1bmN0aW9ucy4gV3JhcHBlZCBvYmplY3RzIG1heSBiZSBjaGFpbmVkLlxyXG5cclxuXHQvLyBIZWxwZXIgZnVuY3Rpb24gdG8gY29udGludWUgY2hhaW5pbmcgaW50ZXJtZWRpYXRlIHJlc3VsdHMuXHJcblx0dmFyIHJlc3VsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgb2JqKSB7XHJcblx0XHRyZXR1cm4gaW5zdGFuY2UuX2NoYWluID8gXyhvYmopLmNoYWluKCkgOiBvYmo7XHJcblx0fTtcclxuXHJcblx0Ly8gQWRkIHlvdXIgb3duIGN1c3RvbSBmdW5jdGlvbnMgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxyXG5cdF8ubWl4aW4gPSBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHRfLmVhY2goXy5mdW5jdGlvbnMob2JqKSwgZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdFx0dmFyIGZ1bmMgPSBfW25hbWVdID0gb2JqW25hbWVdO1xyXG5cdFx0XHRfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR2YXIgYXJncyA9IFt0aGlzLl93cmFwcGVkXTtcclxuXHRcdFx0XHRwdXNoLmFwcGx5KGFyZ3MsIGFyZ3VtZW50cyk7XHJcblx0XHRcdFx0cmV0dXJuIHJlc3VsdCh0aGlzLCBmdW5jLmFwcGx5KF8sIGFyZ3MpKTtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8vIEFkZCBhbGwgb2YgdGhlIFVuZGVyc2NvcmUgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyIG9iamVjdC5cclxuXHRfLm1peGluKF8pO1xyXG5cclxuXHQvLyBBZGQgYWxsIG11dGF0b3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxyXG5cdF8uZWFjaChbJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddLCBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0dmFyIG1ldGhvZCA9IEFycmF5UHJvdG9bbmFtZV07XHJcblx0XHRfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIG9iaiA9IHRoaXMuX3dyYXBwZWQ7XHJcblx0XHRcdG1ldGhvZC5hcHBseShvYmosIGFyZ3VtZW50cyk7XHJcblx0XHRcdGlmICgobmFtZSA9PT0gJ3NoaWZ0JyB8fCBuYW1lID09PSAnc3BsaWNlJykgJiYgb2JqLmxlbmd0aCA9PT0gMCkgZGVsZXRlIG9ialswXTtcclxuXHRcdFx0cmV0dXJuIHJlc3VsdCh0aGlzLCBvYmopO1xyXG5cdFx0fTtcclxuXHR9KTtcclxuXHJcblx0Ly8gQWRkIGFsbCBhY2Nlc3NvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXHJcblx0Xy5lYWNoKFsnY29uY2F0JywgJ2pvaW4nLCAnc2xpY2UnXSwgZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xyXG5cdFx0Xy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiByZXN1bHQodGhpcywgbWV0aG9kLmFwcGx5KHRoaXMuX3dyYXBwZWQsIGFyZ3VtZW50cykpO1xyXG5cdFx0fTtcclxuXHR9KTtcclxuXHJcblx0Ly8gRXh0cmFjdHMgdGhlIHJlc3VsdCBmcm9tIGEgd3JhcHBlZCBhbmQgY2hhaW5lZCBvYmplY3QuXHJcblx0Xy5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fd3JhcHBlZDtcclxuXHR9O1xyXG5cclxuXHQvLyBQcm92aWRlIHVud3JhcHBpbmcgcHJveHkgZm9yIHNvbWUgbWV0aG9kcyB1c2VkIGluIGVuZ2luZSBvcGVyYXRpb25zXHJcblx0Ly8gc3VjaCBhcyBhcml0aG1ldGljIGFuZCBKU09OIHN0cmluZ2lmaWNhdGlvbi5cclxuXHRfLnByb3RvdHlwZS52YWx1ZU9mID0gXy5wcm90b3R5cGUudG9KU09OID0gXy5wcm90b3R5cGUudmFsdWU7XHJcblxyXG5cdF8ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuICcnICsgdGhpcy5fd3JhcHBlZDtcclxuXHR9O1xyXG5cclxuXHQvLyBBTUQgcmVnaXN0cmF0aW9uIGhhcHBlbnMgYXQgdGhlIGVuZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFNRCBsb2FkZXJzXHJcblx0Ly8gdGhhdCBtYXkgbm90IGVuZm9yY2UgbmV4dC10dXJuIHNlbWFudGljcyBvbiBtb2R1bGVzLiBFdmVuIHRob3VnaCBnZW5lcmFsXHJcblx0Ly8gcHJhY3RpY2UgZm9yIEFNRCByZWdpc3RyYXRpb24gaXMgdG8gYmUgYW5vbnltb3VzLCB1bmRlcnNjb3JlIHJlZ2lzdGVyc1xyXG5cdC8vIGFzIGEgbmFtZWQgbW9kdWxlIGJlY2F1c2UsIGxpa2UgalF1ZXJ5LCBpdCBpcyBhIGJhc2UgbGlicmFyeSB0aGF0IGlzXHJcblx0Ly8gcG9wdWxhciBlbm91Z2ggdG8gYmUgYnVuZGxlZCBpbiBhIHRoaXJkIHBhcnR5IGxpYiwgYnV0IG5vdCBiZSBwYXJ0IG9mXHJcblx0Ly8gYW4gQU1EIGxvYWQgcmVxdWVzdC4gVGhvc2UgY2FzZXMgY291bGQgZ2VuZXJhdGUgYW4gZXJyb3Igd2hlbiBhblxyXG5cdC8vIGFub255bW91cyBkZWZpbmUoKSBpcyBjYWxsZWQgb3V0c2lkZSBvZiBhIGxvYWRlciByZXF1ZXN0LlxyXG5cdC8vICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG5cdC8vICAgICBkZWZpbmUoJ3VuZGVyc2NvcmUnLCBbXSwgZnVuY3Rpb24oKSB7XHJcblx0Ly8gICAgICAgcmV0dXJuIF87XHJcblx0Ly8gICAgIH0pO1xyXG5cdC8vICAgfVxyXG59LmNhbGwodGhpcykpO1xyXG4iXX0=