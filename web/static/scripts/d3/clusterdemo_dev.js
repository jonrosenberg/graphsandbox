(function () {
    if (!("trim" in String.prototype)) String.prototype.trim = function () {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    };
    if (!("forEach" in Array.prototype)) Array.prototype.forEach = function (c, d) {
        for (var a = 0, b = this.length; a < b; a++) a in this && c.call(d, this[a], a, this)
    };
    if (!("map" in Array.prototype)) Array.prototype.map = function (c, d) {
        for (var a = Array(this.length), b = 0, e = this.length; b < e; b++) b in this && (a[b] = c.call(d, this[b], b, this));
        return a
    }
})();

// ------------------------------------------------------------------------------------------------
// Underscore
// ------------------------------------------------------------------------------------------------
(function () {
    function q(a, c, d) {
        if (a === c) return a !== 0 || 1 / a == 1 / c;
        if (a == null || c == null) return a === c;
        if (a._chain) a = a._wrapped;
        if (c._chain) c = c._wrapped;
        if (a.isEqual && b.isFunction(a.isEqual)) return a.isEqual(c);
        if (c.isEqual && b.isFunction(c.isEqual)) return c.isEqual(a);
        var e = l.call(a);
        if (e != l.call(c)) return !1;
        switch (e) {
            case "[object String]":
                return a == String(c);
            case "[object Number]":
                return a != +a ? c != +c : a == 0 ? 1 / a == 1 / c : a == +c;
            case "[object Date]":
            case "[object Boolean]":
                return +a == +c;
            case "[object RegExp]":
                return a.source == c.source && a.global == c.global && a.multiline == c.multiline && a.ignoreCase == c.ignoreCase
        }
        if (typeof a != "object" || typeof c != "object") return !1;
        for (var f = d.length; f--; ) if (d[f] == a) return !0;
        d.push(a);
        var f = 0,
            g = !0;
        if (e == "[object Array]") {
            if (f = a.length, g = f == c.length) for (; f--; ) if (!(g = f in a == f in c && q(a[f], c[f], d))) break
        } else {
            if ("constructor" in a != "constructor" in c || a.constructor != c.constructor) return !1;
            for (var h in a) if (b.has(a, h) && (f++, !(g = b.has(c, h) && q(a[h], c[h], d)))) break;
            if (g) {
                for (h in c) if (b.has(c, h) && !f--) break;
                g = !f
            }
        }
        d.pop();
        return g
    }
    var r = this,
        G = r._,
        n = {}, k = Array.prototype,
        o = Object.prototype,
        i = k.slice,
        H = k.unshift,
        l = o.toString,
        I = o.hasOwnProperty,
        w = k.forEach,
        x = k.map,
        y = k.reduce,
        z = k.reduceRight,
        A = k.filter,
        B = k.every,
        C = k.some,
        p = k.indexOf,
        D = k.lastIndexOf,
        o = Array.isArray,
        J = Object.keys,
        s = Function.prototype.bind,
        b = function (a) {
            return new m(a)
        };
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) exports = module.exports = b;
        exports._ = b
    } else r._ = b;
    b.VERSION = "1.3.1";
    var j = b.each = b.forEach = function (a,
    c, d) {
        if (a != null) if (w && a.forEach === w) a.forEach(c, d);
        else if (a.length === +a.length) for (var e = 0, f = a.length; e < f; e++) {
            if (e in a && c.call(d, a[e], e, a) === n) break
        } else for (e in a) if (b.has(a, e) && c.call(d, a[e], e, a) === n) break
    };
    b.map = b.collect = function (a, c, b) {
        var e = [];
        if (a == null) return e;
        if (x && a.map === x) return a.map(c, b);
        j(a, function (a, g, h) {
            e[e.length] = c.call(b, a, g, h)
        });
        if (a.length === +a.length) e.length = a.length;
        return e
    };
    b.reduce = b.foldl = b.inject = function (a, c, d, e) {
        var f = arguments.length > 2;
        a == null && (a = []);
        if (y && a.reduce === y) return e && (c = b.bind(c, e)), f ? a.reduce(c, d) : a.reduce(c);
        j(a, function (a, b, i) {
            f ? d = c.call(e, d, a, b, i) : (d = a, f = !0)
        });
        if (!f) throw new TypeError("Reduce of empty array with no initial value");
        return d
    };
    b.reduceRight = b.foldr = function (a, c, d, e) {
        var f = arguments.length > 2;
        a == null && (a = []);
        if (z && a.reduceRight === z) return e && (c = b.bind(c, e)), f ? a.reduceRight(c, d) : a.reduceRight(c);
        var g = b.toArray(a).reverse();
        e && !f && (c = b.bind(c, e));
        return f ? b.reduce(g, c, d, e) : b.reduce(g, c)
    };
    b.find = b.detect = function (a, c, b) {
        var e;
        E(a, function (a, g, h) {
            if (c.call(b, a, g, h)) return e = a, !0
        });
        return e
    };
    b.filter = b.select = function (a, c, b) {
        var e = [];
        if (a == null) return e;
        if (A && a.filter === A) return a.filter(c, b);
        j(a, function (a, g, h) {
            c.call(b, a, g, h) && (e[e.length] = a)
        });
        return e
    };
    b.reject = function (a, c, b) {
        var e = [];
        if (a == null) return e;
        j(a, function (a, g, h) {
            c.call(b, a, g, h) || (e[e.length] = a)
        });
        return e
    };
    b.every = b.all = function (a, c, b) {
        var e = !0;
        if (a == null) return e;
        if (B && a.every === B) return a.every(c, b);
        j(a, function (a, g, h) {
            if (!(e = e && c.call(b, a, g, h))) return n
        });
        return e
    };
    var E = b.some = b.any = function (a, c, d) {
        c || (c = b.identity);
        var e = !1;
        if (a == null) return e;
        if (C && a.some === C) return a.some(c, d);
        j(a, function (a, b, h) {
            if (e || (e = c.call(d, a, b, h))) return n
        });
        return !!e
    };
    b.include = b.contains = function (a, c) {
        var b = !1;
        if (a == null) return b;
        return p && a.indexOf === p ? a.indexOf(c) != -1 : b = E(a, function (a) {
            return a === c
        })
    };
    b.invoke = function (a, c) {
        var d = i.call(arguments, 2);
        return b.map(a, function (a) {
            return (b.isFunction(c) ? c || a : a[c]).apply(a, d)
        })
    };
    b.pluck = function (a, c) {
        return b.map(a, function (a) {
            return a[c]
        })
    };
    b.max = function (a, c, d) {
        if (!c && b.isArray(a)) return Math.max.apply(Math, a);
        if (!c && b.isEmpty(a)) return -Infinity;
        var e = {
            computed: -Infinity
        };
        j(a, function (a, b, h) {
            b = c ? c.call(d, a, b, h) : a;
            b >= e.computed && (e = {
                value: a,
                computed: b
            })
        });
        return e.value
    };
    b.min = function (a, c, d) {
        if (!c && b.isArray(a)) return Math.min.apply(Math, a);
        if (!c && b.isEmpty(a)) return Infinity;
        var e = {
            computed: Infinity
        };
        j(a, function (a, b, h) {
            b = c ? c.call(d, a, b, h) : a;
            b < e.computed && (e = {
                value: a,
                computed: b
            })
        });
        return e.value
    };
    b.shuffle = function (a) {
        var b = [],
            d;
        j(a, function (a, f) {
            f == 0 ? b[0] = a : (d = Math.floor(Math.random() * (f + 1)), b[f] = b[d], b[d] = a)
        });
        return b
    };
    b.sortBy = function (a, c, d) {
        return b.pluck(b.map(a, function (a, b, g) {
            return {
                value: a,
                criteria: c.call(d, a, b, g)
            }
        }).sort(function (a, b) {
            var c = a.criteria,
                d = b.criteria;
            return c < d ? -1 : c > d ? 1 : 0
        }), "value")
    };
    b.groupBy = function (a, c) {
        var d = {}, e = b.isFunction(c) ? c : function (a) {
            return a[c]
        };
        j(a, function (a, b) {
            var c = e(a, b);
            (d[c] || (d[c] = [])).push(a)
        });
        return d
    };
    b.sortedIndex = function (a, c, d) {
        d || (d = b.identity);
        for (var e = 0, f = a.length; e < f; ) {
            var g = e + f >> 1;
            d(a[g]) < d(c) ? e = g + 1 : f = g
        }
        return e
    };
    b.toArray = function (a) {
        return !a ? [] : a.toArray ? a.toArray() : b.isArray(a) ? i.call(a) : b.isArguments(a) ? i.call(a) : b.values(a)
    };
    b.size = function (a) {
        return b.toArray(a).length
    };
    b.first = b.head = function (a, b, d) {
        return b != null && !d ? i.call(a, 0, b) : a[0]
    };
    b.initial = function (a, b, d) {
        return i.call(a, 0, a.length - (b == null || d ? 1 : b))
    };
    b.last = function (a, b, d) {
        return b != null && !d ? i.call(a, Math.max(a.length - b, 0)) : a[a.length - 1]
    };
    b.rest = b.tail = function (a, b, d) {
        return i.call(a, b == null || d ? 1 : b)
    };
    b.compact = function (a) {
        return b.filter(a, function (a) {
            return !!a
        })
    };
    b.flatten = function (a, c) {
        return b.reduce(a, function (a, e) {
            if (b.isArray(e)) return a.concat(c ? e : b.flatten(e));
            a[a.length] = e;
            return a
        }, [])
    };
    b.without = function (a) {
        return b.difference(a, i.call(arguments, 1))
    };
    b.uniq = b.unique = function (a, c, d) {
        var d = d ? b.map(a, d) : a,
            e = [];
        b.reduce(d, function (d, g, h) {
            if (0 == h || (c === !0 ? b.last(d) != g : !b.include(d, g))) d[d.length] = g, e[e.length] = a[h];
            return d
        }, []);
        return e
    };
    b.union = function () {
        return b.uniq(b.flatten(arguments, !0))
    };
    b.intersection = b.intersect = function (a) {
        var c = i.call(arguments, 1);
        return b.filter(b.uniq(a), function (a) {
            return b.every(c, function (c) {
                return b.indexOf(c, a) >= 0
            })
        })
    };
    b.difference = function (a) {
        var c = b.flatten(i.call(arguments, 1));
        return b.filter(a, function (a) {
            return !b.include(c, a)
        })
    };
    b.zip = function () {
        for (var a = i.call(arguments), c = b.max(b.pluck(a, "length")), d = Array(c), e = 0; e < c; e++) d[e] = b.pluck(a, "" + e);
        return d
    };
    b.indexOf = function (a, c, d) {
        if (a == null) return -1;
        var e;
        if (d) return d = b.sortedIndex(a, c), a[d] === c ? d : -1;
        if (p && a.indexOf === p) return a.indexOf(c);
        for (d = 0, e = a.length; d < e; d++) if (d in a && a[d] === c) return d;
        return -1
    };
    b.lastIndexOf = function (a, b) {
        if (a == null) return -1;
        if (D && a.lastIndexOf === D) return a.lastIndexOf(b);
        for (var d = a.length; d--; ) if (d in a && a[d] === b) return d;
        return -1
    };
    b.range = function (a, b, d) {
        arguments.length <= 1 && (b = a || 0, a = 0);
        for (var d = arguments[2] || 1, e = Math.max(Math.ceil((b - a) / d), 0), f = 0, g = Array(e); f < e; ) g[f++] = a, a += d;
        return g
    };
    var F = function () { };
    b.bind = function (a, c) {
        var d, e;
        if (a.bind === s && s) return s.apply(a,
        i.call(arguments, 1));
        if (!b.isFunction(a)) throw new TypeError;
        e = i.call(arguments, 2);
        return d = function () {
            if (!(this instanceof d)) return a.apply(c, e.concat(i.call(arguments)));
            F.prototype = a.prototype;
            var b = new F,
                g = a.apply(b, e.concat(i.call(arguments)));
            return Object(g) === g ? g : b
        }
    };
    b.bindAll = function (a) {
        var c = i.call(arguments, 1);
        c.length == 0 && (c = b.functions(a));
        j(c, function (c) {
            a[c] = b.bind(a[c], a)
        });
        return a
    };
    b.memoize = function (a, c) {
        var d = {};
        c || (c = b.identity);
        return function () {
            var e = c.apply(this, arguments);
            return b.has(d, e) ? d[e] : d[e] = a.apply(this, arguments)
        }
    };
    b.delay = function (a, b) {
        var d = i.call(arguments, 2);
        return setTimeout(function () {
            return a.apply(a, d)
        }, b)
    };
    b.defer = function (a) {
        return b.delay.apply(b, [a, 1].concat(i.call(arguments, 1)))
    };
    b.throttle = function (a, c) {
        var d, e, f, g, h, i = b.debounce(function () {
            h = g = !1
        }, c);
        return function () {
            d = this;
            e = arguments;
            var b;
            f || (f = setTimeout(function () {
                f = null;
                h && a.apply(d, e);
                i()
            }, c));
            g ? h = !0 : a.apply(d, e);
            i();
            g = !0
        }
    };
    b.debounce = function (a, b) {
        var d;
        return function () {
            var e = this,
                f = arguments;
            clearTimeout(d);
            d = setTimeout(function () {
                d = null;
                a.apply(e, f)
            }, b)
        }
    };
    b.once = function (a) {
        var b = !1,
            d;
        return function () {
            if (b) return d;
            b = !0;
            return d = a.apply(this, arguments)
        }
    };
    b.wrap = function (a, b) {
        return function () {
            var d = [a].concat(i.call(arguments, 0));
            return b.apply(this, d)
        }
    };
    b.compose = function () {
        var a = arguments;
        return function () {
            for (var b = arguments, d = a.length - 1; d >= 0; d--) b = [a[d].apply(this, b)];
            return b[0]
        }
    };
    b.after = function (a, b) {
        return a <= 0 ? b() : function () {
            if (--a < 1) return b.apply(this, arguments)
        }
    };
    b.keys = J || function (a) {
        if (a !== Object(a)) throw new TypeError("Invalid object");
        var c = [],
            d;
        for (d in a) b.has(a, d) && (c[c.length] = d);
        return c
    };
    b.values = function (a) {
        return b.map(a, b.identity)
    };
    b.functions = b.methods = function (a) {
        var c = [],
            d;
        for (d in a) b.isFunction(a[d]) && c.push(d);
        return c.sort()
    };
    b.extend = function (a) {
        j(i.call(arguments, 1), function (b) {
            for (var d in b) a[d] = b[d]
        });
        return a
    };
    b.defaults = function (a) {
        j(i.call(arguments, 1), function (b) {
            for (var d in b) a[d] == null && (a[d] = b[d])
        });
        return a
    };
    b.clone = function (a) {
        return !b.isObject(a) ? a : b.isArray(a) ? a.slice() : b.extend({}, a)
    };
    b.tap = function (a, b) {
        b(a);
        return a
    };
    b.isEqual = function (a, b) {
        return q(a, b, [])
    };
    b.isEmpty = function (a) {
        if (b.isArray(a) || b.isString(a)) return a.length === 0;
        for (var c in a) if (b.has(a, c)) return !1;
        return !0
    };
    b.isElement = function (a) {
        return !!(a && a.nodeType == 1)
    };
    b.isArray = o || function (a) {
        return l.call(a) == "[object Array]"
    };
    b.isObject = function (a) {
        return a === Object(a)
    };
    b.isArguments = function (a) {
        return l.call(a) == "[object Arguments]"
    };
    if (!b.isArguments(arguments)) b.isArguments = function (a) {
        return !(!a || !b.has(a, "callee"))
    };
    b.isFunction = function (a) {
        return l.call(a) == "[object Function]"
    };
    b.isString = function (a) {
        return l.call(a) == "[object String]"
    };
    b.isNumber = function (a) {
        return l.call(a) == "[object Number]"
    };
    b.isNaN = function (a) {
        return a !== a
    };
    b.isBoolean = function (a) {
        return a === !0 || a === !1 || l.call(a) == "[object Boolean]"
    };
    b.isDate = function (a) {
        return l.call(a) == "[object Date]"
    };
    b.isRegExp = function (a) {
        return l.call(a) == "[object RegExp]"
    };
    b.isNull = function (a) {
        return a === null
    };
    b.isUndefined = function (a) {
        return a === void 0
    };
    b.has = function (a, b) {
        return I.call(a, b)
    };
    b.noConflict = function () {
        r._ = G;
        return this
    };
    b.identity = function (a) {
        return a
    };
    b.times = function (a, b, d) {
        for (var e = 0; e < a; e++) b.call(d, e)
    };
    b.escape = function (a) {
        return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    };
    b.mixin = function (a) {
        j(b.functions(a), function (c) {
            K(c, b[c] = a[c])
        })
    };
    var L = 0;
    b.uniqueId = function (a) {
        var b = L++;
        return a ? a + b : b
    };
    b.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var t = /.^/,
        u = function (a) {
            return a.replace(/\\\\/g, "\\").replace(/\\'/g, "'")
        };
    b.template = function (a, c) {
        var d = b.templateSettings,
            d = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(d.escape || t, function (a, b) {
                return "',_.escape(" + u(b) + "),'"
            }).replace(d.interpolate || t, function (a, b) {
                return "'," + u(b) + ",'"
            }).replace(d.evaluate || t, function (a,
            b) {
                return "');" + u(b).replace(/[\r\n\t]/g, " ") + ";__p.push('"
            }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
            e = new Function("obj", "_", d);
        return c ? e(c, b) : function (a) {
            return e.call(this, a, b)
        }
    };
    b.chain = function (a) {
        return b(a).chain()
    };
    var m = function (a) {
        this._wrapped = a
    };
    b.prototype = m.prototype;
    var v = function (a, c) {
        return c ? b(a).chain() : a
    }, K = function (a, c) {
        m.prototype[a] = function () {
            var a = i.call(arguments);
            H.call(a, this._wrapped);
            return v(c.apply(b, a), this._chain)
        }
    };
    b.mixin(b);
    j("pop,push,reverse,shift,sort,splice,unshift".split(","), function (a) {
        var b = k[a];
        m.prototype[a] = function () {
            var d = this._wrapped;
            b.apply(d, arguments);
            var e = d.length;
            (a == "shift" || a == "splice") && e === 0 && delete d[0];
            return v(d, this._chain)
        }
    });
    j(["concat", "join", "slice"], function (a) {
        var b = k[a];
        m.prototype[a] = function () {
            return v(b.apply(this._wrapped, arguments), this._chain)
        }
    });
    m.prototype.chain = function () {
        this._chain = !0;
        return this
    };
    m.prototype.value = function () {
        return this._wrapped
    }
}).call(this);




// ------------------------------------------------------------------------------------------------
// Backbone.js
// ------------------------------------------------------------------------------------------------
(function () {
    var l = this,
        y = l.Backbone,
        z = Array.prototype.slice,
        A = Array.prototype.splice,
        g;
    g = typeof exports !== "undefined" ? exports : l.Backbone = {};
    g.VERSION = "0.9.2";
    var f = l._;
    !f && typeof require !== "undefined" && (f = require("underscore"));
    var i = l.jQuery || l.Zepto || l.ender;
    g.setDomLibrary = function (a) {
        i = a
    };
    g.noConflict = function () {
        l.Backbone = y;
        return this
    };
    g.emulateHTTP = !1;
    g.emulateJSON = !1;
    var p = /\s+/,
        k = g.Events = {
            on: function (a, b, c) {
                var d, e, f, g, j;
                if (!b) return this;
                a = a.split(p);
                for (d = this._callbacks || (this._callbacks = {}); e = a.shift(); ) f = (j = d[e]) ? j.tail : {}, f.next = g = {}, f.context = c, f.callback = b, d[e] = {
                    tail: g,
                    next: j ? j.next : f
                };
                return this
            },
            off: function (a, b, c) {
                var d, e, h, g, j, q;
                if (e = this._callbacks) {
                    if (!a && !b && !c) return delete this._callbacks, this;
                    for (a = a ? a.split(p) : f.keys(e); d = a.shift(); ) if (h = e[d], delete e[d], h && (b || c)) for (g = h.tail;
                    (h = h.next) !== g; ) if (j = h.callback, q = h.context, b && j !== b || c && q !== c) this.on(d, j, q);
                    return this
                }
            },
            trigger: function (a) {
                var b, c, d, e, f, g;
                if (!(d = this._callbacks)) return this;
                f = d.all;
                a = a.split(p);
                for (g = z.call(arguments, 1); b = a.shift(); ) {
                    if (c = d[b]) for (e = c.tail;
                    (c = c.next) !== e; ) c.callback.apply(c.context || this, g);
                    if (c = f) {
                        e = c.tail;
                        for (b = [b].concat(g);
                        (c = c.next) !== e; ) c.callback.apply(c.context || this, b)
                    }
                }
                return this
            }
        };
    k.bind = k.on;
    k.unbind = k.off;
    var o = g.Model = function (a, b) {
        var c;
        a || (a = {});
        b && b.parse && (a = this.parse(a));
        if (c = n(this, "defaults")) a = f.extend({}, c, a);
        if (b && b.collection) this.collection = b.collection;
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = f.uniqueId("c");
        this.changed = {};
        this._silent = {};
        this._pending = {};
        this.set(a, {
            silent: !0
        });
        this.changed = {};
        this._silent = {};
        this._pending = {};
        this._previousAttributes = f.clone(this.attributes);
        this.initialize.apply(this, arguments)
    };
    f.extend(o.prototype, k, {
        changed: null,
        _silent: null,
        _pending: null,
        idAttribute: "id",
        initialize: function () { },
        toJSON: function () {
            return f.clone(this.attributes)
        },
        get: function (a) {
            return this.attributes[a]
        },
        escape: function (a) {
            var b;
            if (b = this._escapedAttributes[a]) return b;
            b = this.get(a);
            return this._escapedAttributes[a] = f.escape(b == null ? "" : "" + b)
        },
        has: function (a) {
            return this.get(a) != null
        },
        set: function (a, b, c) {
            var d, e;
            f.isObject(a) || a == null ? (d = a, c = b) : (d = {}, d[a] = b);
            c || (c = {});
            if (!d) return this;
            if (d instanceof o) d = d.attributes;
            if (c.unset) for (e in d) d[e] = void 0;
            if (!this._validate(d, c)) return !1;
            if (this.idAttribute in d) this.id = d[this.idAttribute];
            var b = c.changes = {}, h = this.attributes,
                g = this._escapedAttributes,
                j = this._previousAttributes || {};
            for (e in d) {
                a = d[e];
                if (!f.isEqual(h[e], a) || c.unset && f.has(h, e)) delete g[e], (c.silent ? this._silent : b)[e] = !0;
                c.unset ? delete h[e] : h[e] = a;
                !f.isEqual(j[e], a) || f.has(h, e) != f.has(j, e) ? (this.changed[e] = a, c.silent || (this._pending[e] = !0)) : (delete this.changed[e], delete this._pending[e])
            }
            c.silent || this.change(c);
            return this
        },
        unset: function (a, b) {
            (b || (b = {})).unset = !0;
            return this.set(a, null, b)
        },
        clear: function (a) {
            (a || (a = {})).unset = !0;
            return this.set(f.clone(this.attributes), a)
        },
        fetch: function (a) {
            var a = a ? f.clone(a) : {}, b = this,
                c = a.success;
            a.success = function (d, e, f) {
                if (!b.set(b.parse(d, f), a)) return !1;
                c && c(b, d)
            };
            a.error = g.wrapError(a.error, b, a);
            return (this.sync || g.sync).call(this, "read", this, a)
        },
        save: function (a, b, c) {
            var d, e;
            f.isObject(a) || a == null ? (d = a, c = b) : (d = {}, d[a] = b);
            c = c ? f.clone(c) : {};
            if (c.wait) {
                if (!this._validate(d, c)) return !1;
                e = f.clone(this.attributes)
            }
            a = f.extend({}, c, {
                silent: !0
            });
            if (d && !this.set(d, c.wait ? a : c)) return !1;
            var h = this,
                i = c.success;
            c.success = function (a, b, e) {
                b = h.parse(a, e);
                c.wait && (delete c.wait, b = f.extend(d || {}, b));
                if (!h.set(b, c)) return !1;
                i ? i(h, a) : h.trigger("sync", h, a, c)
            };
            c.error = g.wrapError(c.error,
            h, c);
            b = this.isNew() ? "create" : "update";
            b = (this.sync || g.sync).call(this, b, this, c);
            c.wait && this.set(e, a);
            return b
        },
        destroy: function (a) {
            var a = a ? f.clone(a) : {}, b = this,
                c = a.success,
                d = function () {
                    b.trigger("destroy", b, b.collection, a)
                };
            if (this.isNew()) return d(), !1;
            a.success = function (e) {
                a.wait && d();
                c ? c(b, e) : b.trigger("sync", b, e, a)
            };
            a.error = g.wrapError(a.error, b, a);
            var e = (this.sync || g.sync).call(this, "delete", this, a);
            a.wait || d();
            return e
        },
        url: function () {
            var a = n(this, "urlRoot") || n(this.collection, "url") || t();
            return this.isNew() ? a : a + (a.charAt(a.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function (a) {
            return a
        },
        clone: function () {
            return new this.constructor(this.attributes)
        },
        isNew: function () {
            return this.id == null
        },
        change: function (a) {
            a || (a = {});
            var b = this._changing;
            this._changing = !0;
            for (var c in this._silent) this._pending[c] = !0;
            var d = f.extend({}, a.changes, this._silent);
            this._silent = {};
            for (c in d) this.trigger("change:" + c, this, this.get(c), a);
            if (b) return this;
            for (; !f.isEmpty(this._pending); ) {
                this._pending = {};
                this.trigger("change", this, a);
                for (c in this.changed) !this._pending[c] && !this._silent[c] && delete this.changed[c];
                this._previousAttributes = f.clone(this.attributes)
            }
            this._changing = !1;
            return this
        },
        hasChanged: function (a) {
            return !arguments.length ? !f.isEmpty(this.changed) : f.has(this.changed, a)
        },
        changedAttributes: function (a) {
            if (!a) return this.hasChanged() ? f.clone(this.changed) : !1;
            var b, c = !1,
                d = this._previousAttributes,
                e;
            for (e in a) if (!f.isEqual(d[e], b = a[e])) (c || (c = {}))[e] = b;
            return c
        },
        previous: function (a) {
            return !arguments.length || !this._previousAttributes ? null : this._previousAttributes[a]
        },
        previousAttributes: function () {
            return f.clone(this._previousAttributes)
        },
        isValid: function () {
            return !this.validate(this.attributes)
        },
        _validate: function (a, b) {
            if (b.silent || !this.validate) return !0;
            var a = f.extend({}, this.attributes, a),
                c = this.validate(a, b);
            if (!c) return !0;
            b && b.error ? b.error(this, c, b) : this.trigger("error", this, c, b);
            return !1
        }
    });
    var r = g.Collection = function (a, b) {
        b || (b = {});
        if (b.model) this.model = b.model;
        if (b.comparator) this.comparator = b.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        a && this.reset(a, {
            silent: !0,
            parse: b.parse
        })
    };
    f.extend(r.prototype, k, {
        model: o,
        initialize: function () { },
        toJSON: function (a) {
            return this.map(function (b) {
                return b.toJSON(a)
            })
        },
        add: function (a, b) {
            var c, d, e, g, i, j = {}, k = {}, l = [];
            b || (b = {});
            a = f.isArray(a) ? a.slice() : [a];
            for (c = 0, d = a.length; c < d; c++) {
                if (!(e = a[c] = this._prepareModel(a[c], b))) throw Error("Can't add an invalid model to a collection");
                g = e.cid;
                i = e.id;
                j[g] || this._byCid[g] || i != null && (k[i] || this._byId[i]) ? l.push(c) : j[g] = k[i] = e
            }
            for (c = l.length; c--; ) a.splice(l[c], 1);
            for (c = 0, d = a.length; c < d; c++) (e = a[c]).on("all", this._onModelEvent, this), this._byCid[e.cid] = e, e.id != null && (this._byId[e.id] = e);
            this.length += d;
            A.apply(this.models, [b.at != null ? b.at : this.models.length, 0].concat(a));
            this.comparator && this.sort({
                silent: !0
            });
            if (b.silent) return this;
            for (c = 0, d = this.models.length; c < d; c++) if (j[(e = this.models[c]).cid]) b.index = c, e.trigger("add", e, this, b);
            return this
        },
        remove: function (a, b) {
            var c, d, e, g;
            b || (b = {});
            a = f.isArray(a) ? a.slice() : [a];
            for (c = 0, d = a.length; c < d; c++) if (g = this.getByCid(a[c]) || this.get(a[c])) {
                delete this._byId[g.id];
                delete this._byCid[g.cid];
                e = this.indexOf(g);
                this.models.splice(e, 1);
                this.length--;
                if (!b.silent) b.index = e, g.trigger("remove", g, this, b);
                this._removeReference(g)
            }
            return this
        },
        push: function (a, b) {
            a = this._prepareModel(a, b);
            this.add(a, b);
            return a
        },
        pop: function (a) {
            var b = this.at(this.length - 1);
            this.remove(b, a);
            return b
        },
        unshift: function (a, b) {
            a = this._prepareModel(a, b);
            this.add(a, f.extend({
                at: 0
            }, b));
            return a
        },
        shift: function (a) {
            var b = this.at(0);
            this.remove(b, a);
            return b
        },
        get: function (a) {
            return a == null ? void 0 : this._byId[a.id != null ? a.id : a]
        },
        getByCid: function (a) {
            return a && this._byCid[a.cid || a]
        },
        at: function (a) {
            return this.models[a]
        },
        where: function (a) {
            return f.isEmpty(a) ? [] : this.filter(function (b) {
                for (var c in a) if (a[c] !== b.get(c)) return !1;
                return !0
            })
        },
        sort: function (a) {
            a || (a = {});
            if (!this.comparator) throw Error("Cannot sort a set without a comparator");
            var b = f.bind(this.comparator, this);
            this.comparator.length == 1 ? this.models = this.sortBy(b) : this.models.sort(b);
            a.silent || this.trigger("reset", this, a);
            return this
        },
        pluck: function (a) {
            return f.map(this.models, function (b) {
                return b.get(a)
            })
        },
        reset: function (a, b) {
            a || (a = []);
            b || (b = {});
            for (var c = 0, d = this.models.length; c < d; c++) this._removeReference(this.models[c]);
            this._reset();
            this.add(a, f.extend({
                silent: !0
            }, b));
            b.silent || this.trigger("reset", this, b);
            return this
        },
        fetch: function (a) {
            a = a ? f.clone(a) : {};
            if (a.parse === void 0) a.parse = !0;
            var b = this,
                c = a.success;
            a.success = function (d,
            e, f) {
                b[a.add ? "add" : "reset"](b.parse(d, f), a);
                c && c(b, d)
            };
            a.error = g.wrapError(a.error, b, a);
            return (this.sync || g.sync).call(this, "read", this, a)
        },
        create: function (a, b) {
            var c = this,
                b = b ? f.clone(b) : {}, a = this._prepareModel(a, b);
            if (!a) return !1;
            b.wait || c.add(a, b);
            var d = b.success;
            b.success = function (e, f) {
                b.wait && c.add(e, b);
                d ? d(e, f) : e.trigger("sync", a, f, b)
            };
            a.save(null, b);
            return a
        },
        parse: function (a) {
            return a
        },
        chain: function () {
            return f(this.models).chain()
        },
        _reset: function () {
            this.length = 0;
            this.models = [];
            this._byId = {};
            this._byCid = {}
        },
        _prepareModel: function (a, b) {
            b || (b = {});
            if (a instanceof o) {
                if (!a.collection) a.collection = this
            } else {
                var c;
                b.collection = this;
                a = new this.model(a, b);
                a._validate(a.attributes, b) || (a = !1)
            }
            return a
        },
        _removeReference: function (a) {
            this == a.collection && delete a.collection;
            a.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function (a, b, c, d) {
            (a == "add" || a == "remove") && c != this || (a == "destroy" && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], this._byId[b.id] = b), this.trigger.apply(this, arguments))
        }
    });
    f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","), function (a) {
        r.prototype[a] = function () {
            return f[a].apply(f, [this.models].concat(f.toArray(arguments)))
        }
    });
    var u = g.Router = function (a) {
        a || (a = {});
        if (a.routes) this.routes = a.routes;
        this._bindRoutes();
        this.initialize.apply(this,
        arguments)
    }, B = /:\w+/g,
        C = /\*\w+/g,
        D = /[-[\]{}()+?.,\\^$|#\s]/g;
    f.extend(u.prototype, k, {
        initialize: function () { },
        route: function (a, b, c) {
            g.history || (g.history = new m);
            f.isRegExp(a) || (a = this._routeToRegExp(a));
            c || (c = this[b]);
            g.history.route(a, f.bind(function (d) {
                d = this._extractParameters(a, d);
                c && c.apply(this, d);
                this.trigger.apply(this, ["route:" + b].concat(d));
                g.history.trigger("route", this, b, d)
            }, this));
            return this
        },
        navigate: function (a, b) {
            g.history.navigate(a, b)
        },
        _bindRoutes: function () {
            if (this.routes) {
                var a = [],
                    b;
                for (b in this.routes) a.unshift([b, this.routes[b]]);
                b = 0;
                for (var c = a.length; b < c; b++) this.route(a[b][0], a[b][1], this[a[b][1]])
            }
        },
        _routeToRegExp: function (a) {
            a = a.replace(D, "\\$&").replace(B, "([^/]+)").replace(C, "(.*?)");
            return RegExp("^" + a + "$")
        },
        _extractParameters: function (a, b) {
            return a.exec(b).slice(1)
        }
    });
    var m = g.History = function () {
        this.handlers = [];
        f.bindAll(this, "checkUrl")
    }, s = /^[#\/]/,
        E = /msie [\w.]+/;
    m.started = !1;
    f.extend(m.prototype, k, {
        interval: 50,
        getHash: function (a) {
            return (a = (a ? a.location : window.location).href.match(/#(.*)$/)) ? a[1] : ""
        },
        getFragment: function (a, b) {
            if (a == null) if (this._hasPushState || b) {
                var a = window.location.pathname,
                    c = window.location.search;
                c && (a += c)
            } else a = this.getHash();
            a.indexOf(this.options.root) || (a = a.substr(this.options.root.length));
            return a.replace(s, "")
        },
        start: function (a) {
            if (m.started) throw Error("Backbone.history has already been started");
            m.started = !0;
            this.options = f.extend({}, {
                root: "/"
            }, this.options, a);
            this._wantsHashChange = this.options.hashChange !== !1;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !(!this.options.pushState || !window.history || !window.history.pushState);
            var a = this.getFragment(),
                b = document.documentMode;
            if (b = E.exec(navigator.userAgent.toLowerCase()) && (!b || b <= 7)) this.iframe = i('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(a);
            if (this._hasPushState) i(window).bind("popstate", this.checkUrl);
            else if (this._wantsHashChange && "onhashchange" in window && !b) i(window).bind("hashchange", this.checkUrl);
            else if (this._wantsHashChange) this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            this.fragment = a;
            a = window.location;
            b = a.pathname == this.options.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !b) return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
            else if (this._wantsPushState && this._hasPushState && b && a.hash) this.fragment = this.getHash().replace(s, ""), window.history.replaceState({}, document.title, a.protocol + "//" + a.host + this.options.root + this.fragment);
            if (!this.options.silent) return this.loadUrl()
        },
        stop: function () {
            i(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            m.started = !1
        },
        route: function (a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            })
        },
        checkUrl: function () {
            var a = this.getFragment();
            a == this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe)));
            if (a == this.fragment) return !1;
            this.iframe && this.navigate(a);
            this.loadUrl() || this.loadUrl(this.getHash())
        },
        loadUrl: function (a) {
            var b = this.fragment = this.getFragment(a);
            return f.any(this.handlers,

            function (a) {
                if (a.route.test(b)) return a.callback(b), !0
            })
        },
        navigate: function (a, b) {
            if (!m.started) return !1;
            if (!b || b === !0) b = {
                trigger: b
            };
            var c = (a || "").replace(s, "");
            if (this.fragment != c) this._hasPushState ? (c.indexOf(this.options.root) != 0 && (c = this.options.root + c), this.fragment = c, window.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c)) : this._wantsHashChange ? (this.fragment = c, this._updateHash(window.location, c, b.replace), this.iframe && c != this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, c, b.replace))) : window.location.assign(this.options.root + a), b.trigger && this.loadUrl(a)
        },
        _updateHash: function (a, b, c) {
            c ? a.replace(a.toString().replace(/(javascript:|#).*$/, "") + "#" + b) : a.hash = b
        }
    });
    var v = g.View = function (a) {
        this.cid = f.uniqueId("view");
        this._configure(a || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    }, F = /^(\S+)\s*(.*)$/,
        w = "model,collection,el,id,attributes,className,tagName".split(",");
    f.extend(v.prototype, k, {
        tagName: "div",
        $: function (a) {
            return this.$el.find(a)
        },
        initialize: function () { },
        render: function () {
            return this
        },
        remove: function () {
            this.$el.remove();
            return this
        },
        make: function (a, b, c) {
            a = document.createElement(a);
            b && i(a).attr(b);
            c && i(a).html(c);
            return a
        },
        setElement: function (a, b) {
            this.$el && this.undelegateEvents();
            this.$el = a instanceof i ? a : i(a);
            this.el = this.$el[0];
            b !== !1 && this.delegateEvents();
            return this
        },
        delegateEvents: function (a) {
            if (a || (a = n(this, "events"))) {
                this.undelegateEvents();
                for (var b in a) {
                    var c = a[b];
                    f.isFunction(c) || (c = this[a[b]]);
                    if (!c) throw Error('Method "' + a[b] + '" does not exist');
                    var d = b.match(F),
                        e = d[1],
                        d = d[2],
                        c = f.bind(c, this);
                    e += ".delegateEvents" + this.cid;
                    d === "" ? this.$el.bind(e, c) : this.$el.delegate(d, e, c)
                }
            }
        },
        undelegateEvents: function () {
            this.$el.unbind(".delegateEvents" + this.cid)
        },
        _configure: function (a) {
            this.options && (a = f.extend({}, this.options, a));
            for (var b = 0, c = w.length; b < c; b++) {
                var d = w[b];
                a[d] && (this[d] = a[d])
            }
            this.options = a
        },
        _ensureElement: function () {
            if (this.el) this.setElement(this.el, !1);
            else {
                var a = n(this, "attributes") || {};
                if (this.id) a.id = this.id;
                if (this.className) a["class"] = this.className;
                this.setElement(this.make(this.tagName, a), !1)
            }
        }
    });
    o.extend = r.extend = u.extend = v.extend = function (a, b) {
        var c = G(this, a, b);
        c.extend = this.extend;
        return c
    };
    var H = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    g.sync = function (a, b, c) {
        var d = H[a];
        c || (c = {});
        var e = {
            type: d,
            dataType: "json"
        };
        if (!c.url) e.url = n(b, "url") || t();
        if (!c.data && b && (a == "create" || a == "update")) e.contentType = "application/json",
        e.data = JSON.stringify(b.toJSON());
        if (g.emulateJSON) e.contentType = "application/x-www-form-urlencoded", e.data = e.data ? {
            model: e.data
        } : {};
        if (g.emulateHTTP && (d === "PUT" || d === "DELETE")) {
            if (g.emulateJSON) e.data._method = d;
            e.type = "POST";
            e.beforeSend = function (a) {
                a.setRequestHeader("X-HTTP-Method-Override", d)
            }
        }
        if (e.type !== "GET" && !g.emulateJSON) e.processData = !1;
        return i.ajax(f.extend(e, c))
    };
    g.wrapError = function (a, b, c) {
        return function (d, e) {
            e = d === b ? e : d;
            a ? a(b, e, c) : b.trigger("error", b, e, c)
        }
    };
    var x = function () { }, G = function (a,
    b, c) {
        var d;
        d = b && b.hasOwnProperty("constructor") ? b.constructor : function () {
            a.apply(this, arguments)
        };
        f.extend(d, a);
        x.prototype = a.prototype;
        d.prototype = new x;
        b && f.extend(d.prototype, b);
        c && f.extend(d, c);
        d.prototype.constructor = d;
        d.__super__ = a.prototype;
        return d
    }, n = function (a, b) {
        return !a || !a[b] ? null : f.isFunction(a[b]) ? a[b]() : a[b]
    }, t = function () {
        throw Error('A "url" property or function must be specified');
    }
}).call(this);




// ------------------------------------------------------------------------------------------------
// Backbone.js Paginator
// ------------------------------------------------------------------------------------------------
Backbone.Paginator = function (j, k, h) {
    var i = {
        version: "0.15"
    };
    i.clientPager = j.Collection.extend({
        sync: function (a, c, b) {
            a = {};
            a[this.perPageAttribute] = this.perPage;
            a[this.skipAttribute] = this.page * this.perPage;
            a[this.orderAttribute] = this.sortField;
            a[this.customAttribute1] = this.customParam1;
            a[this.formatAttribute] = this.format;
            a[this.customAttribute2] = this.customParam2;
            a[this.queryAttribute] = this.query;
            b = k.extend({
                type: "GET",
                dataType: "jsonp",
                jsonpCallback: "callback",
                data: decodeURIComponent(h.param(a)),
                url: this.url,
                processData: !1
            }, b);
            return h.ajax(b)
        },
        nextPage: function () {
            this.page = ++this.page;
            this.pager()
        },
        previousPage: function () {
            this.page = --this.page || 1;
            this.pager()
        },
        goTo: function (a) {
            if (a !== void 0) this.page = parseInt(a, 10), this.pager()
        },
        howManyPer: function (a) {
            if (a !== void 0) this.displayPerPage = parseInt(a, 10), this.pager()
        },
        setSort: function (a, c) {
            a !== void 0 && c !== void 0 && this.pager(a, c)
        },
        pager: function (a, c) {
            var b = this.displayPerPage,
                d = (this.page - 1) * b,
                e = d + b;
            if (this.origModels === void 0) this.origModels = this.models;
            this.models = this.origModels;
            if (d > e || d >= this.models.length) this.page = 1, d = (this.page - 1) * b, e = d + b;
            if (a) this.models = this._sort(this.models, a, c);
            this.reset(this.models.slice(d, e))
        },
        _sort: function (a, c, b) {
            return a = a.sort(function (a, e) {
                var f = a.get(c),
                    g = e.get(c);
                if (b === "desc") {
                    if (f > g) return -1;
                    if (f < g) return 1
                } else {
                    if (f < g) return -1;
                    if (f > g) return 1
                }
                return 0
            })
        },
        info: function () {
            var a = {}, a = this.origModels ? this.origModels.length : this.length,
                c = Math.ceil(a / this.displayPerPage),
                a = {
                    totalRecords: a,
                    page: this.page,
                    perPage: this.displayPerPage,
                    totalPages: c,
                    lastPage: c,
                    lastPagem1: c - 1,
                    previous: !1,
                    next: !1,
                    page_set: [],
                    startRecord: (this.page - 1) * this.displayPerPage + 1,
                    endRecord: Math.min(a, this.page * this.displayPerPage)
                };
            if (this.page > 1) a.prev = this.page - 1;
            if (this.page < a.totalPages) a.next = this.page + 1;
            a.pageSet = this.setPagination(a);
            return this.information = a
        },
        setPagination: function (a) {
            var c = [],
                b = 0,
                d = 0,
                d = Math.ceil(a.totalRecords / a.perPage);
            if (d > 1) if (d < 13) for (b = 1; b <= d; b++) c.push(b);
            else if (d > 11) if (a.page < 7) for (b = 1, d = 10; b < d; b++) c.push(b);
            else if (d - 6 > a.page && a.page > 6) for (b = a.page - 3; b <= a.page + 3; b++) c.push(b);
            else for (b = d - 8; b <= d; b++) c.push(b);
            return c
        }
    });
    return i
} (Backbone, _, $);






// ------------------------------------------------------------------------------------------------
// http://detectmobilebrowsers.com/
// ------------------------------------------------------------------------------------------------
(function (a) {
    jQuery.browser.mobile = /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,
    4))
})(navigator.userAgent || navigator.vendor || window.opera);



// ------------------------------------------------------------------------------------------------
// JSON
// ------------------------------------------------------------------------------------------------
var JSON;
JSON || (JSON = {});
(function () {
    function k(a) {
        return a < 10 ? "0" + a : a
    }
    function o(a) {
        p.lastIndex = 0;
        return p.test(a) ? '"' + a.replace(p, function (a) {
            var c = r[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function l(a, j) {
        var c, d, h, m, g = e,
            f, b = j[a];
        b && typeof b === "object" && typeof b.toJSON === "function" && (b = b.toJSON(a));
        typeof i === "function" && (b = i.call(j, a, b));
        switch (typeof b) {
            case "string":
                return o(b);
            case "number":
                return isFinite(b) ? String(b) : "null";
            case "boolean":
            case "null":
                return String(b);
            case "object":
                if (!b) return "null";
                e += n;
                f = [];
                if (Object.prototype.toString.apply(b) === "[object Array]") {
                    m = b.length;
                    for (c = 0; c < m; c += 1) f[c] = l(c, b) || "null";
                    h = f.length === 0 ? "[]" : e ? "[\n" + e + f.join(",\n" + e) + "\n" + g + "]" : "[" + f.join(",") + "]";
                    e = g;
                    return h
                }
                if (i && typeof i === "object") {
                    m = i.length;
                    for (c = 0; c < m; c += 1) typeof i[c] === "string" && (d = i[c], (h = l(d, b)) && f.push(o(d) + (e ? ": " : ":") + h))
                } else for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (h = l(d, b)) && f.push(o(d) + (e ? ": " : ":") + h);
                h = f.length === 0 ? "{}" : e ? "{\n" + e + f.join(",\n" + e) + "\n" + g + "}" : "{" + f.join(",") +
                    "}";
                e = g;
                return h
        }
    }
    if (typeof Date.prototype.toJSON !== "function") Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + k(this.getUTCMonth() + 1) + "-" + k(this.getUTCDate()) + "T" + k(this.getUTCHours()) + ":" + k(this.getUTCMinutes()) + ":" + k(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
    };
    var q = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        p = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        e, n, r = {
            "\u0008": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\u000c": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, i;
    if (typeof JSON.stringify !== "function") JSON.stringify = function (a, j, c) {
        var d;
        n = e = "";
        if (typeof c === "number") for (d = 0; d < c; d += 1) n += " ";
        else typeof c === "string" && (n = c);
        if ((i = j) && typeof j !== "function" && (typeof j !== "object" || typeof j.length !== "number")) throw Error("JSON.stringify");
        return l("", {
            "": a
        })
    };
    if (typeof JSON.parse !== "function") JSON.parse = function (a, e) {
        function c(a, d) {
            var g, f, b = a[d];
            if (b && typeof b === "object") for (g in b) Object.prototype.hasOwnProperty.call(b, g) && (f = c(b, g), f !== void 0 ? b[g] = f : delete b[g]);
            return e.call(a, d, b)
        }
        var d, a = String(a);
        q.lastIndex = 0;
        q.test(a) && (a = a.replace(q, function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return d = eval("(" + a + ")"), typeof e === "function" ? c({
                "": d
            }, "") : d;
        throw new SyntaxError("JSON.parse");
    }
})();


// ------------------------------------------------------------------------------------------------
// Last FM API
// ------------------------------------------------------------------------------------------------
function LastFM(k) {
    var l = k.apiKey || "",
        n = k.apiSecret || "",
        f = k.apiUrl || "http://ws.audioscrobbler.com/2.0/",
        h = k.cache || void 0;
    this.setApiKey = function (a) {
        l = a
    };
    this.setApiSecret = function (a) {
        n = a
    };
    this.setApiUrl = function (a) {
        f = a
    };
    this.setCache = function (a) {
        h = a
    };
    var m = function (a, b, e) {
        if (e == "POST") {
            var c = document.getElementsByTagName("html")[0],
                d = document.createElement("iframe");
            d.width = 1;
            d.height = 1;
            d.style.border = "none";
            d.onload = function () {
                typeof b.success != "undefined" && b.success()
            };
            c.appendChild(d);
            c = typeof d.contentWindow !=
                "undefined" ? d.contentWindow.document : typeof d.contentDocument.document != "undefined" ? d.contentDocument.document.document : d.contentDocument.document;
            c.open();
            c.clear();
            c.write('<form method="post" action="' + f + '" id="form">');
            for (var g in a) c.write('<input type="text" name="' + g + '" value="' + a[g] + '">');
            c.write("</form>");
            c.write('<script type="application/x-javascript">');
            c.write('document.getElementById("form").submit();');
            c.write("<\/script>");
            c.close()
        } else if ((new Date).getTime(), c = o.getApiSignature(a),
        typeof h != "undefined" && h.contains(c) && !h.isExpired(c)) typeof b.success != "undefined" && b.success(h.load(c));
        else {
            a.format = "json";
            c = [];
            for (g in a) c.push(encodeURIComponent(g) + "=" + encodeURIComponent(a[g]));
            g = f + "?" + c.join("&").replace(/%20/g, "+");
            g = $.ajax({
                url: g,
                dataType: "jsonp",
                timeout: 2E4
            });
            g.success(function (a) {
                typeof a.error != "undefined" ? typeof b.error != "undefined" && b.error(a.error, a.message) : typeof b.success != "undefined" && b.success(a)
            });
            g.error(function () {
                m(a, b, e)
            })
        }
    }, c = function (a, b, c, d) {
        b = b || {};
        c = c || {};
        b.method = a;
        b.api_key = l;
        m(b, c, d || "GET")
    }, d = function (a, b, c, d, f) {
        b = b || {};
        d = d || {};
        f = f || "GET";
        b.method = a;
        b.api_key = l;
        if (c && typeof c.key != "undefined") b.sk = c.key;
        b.api_sig = o.getApiSignature(b);
        m(b, d, f)
    };
    this.album = {
        addTags: function (a, b, c) {
            if (typeof a.tags == "object") a.tags = a.tags.join(",");
            d("album.addTags", a, b, c, "POST")
        },
        getBuylinks: function (a, b) {
            c("album.getBuylinks", a, b)
        },
        getInfo: function (a, b) {
            c("album.getInfo", a, b)
        },
        getTags: function (a, b, c) {
            d("album.getTags", a, b, c)
        },
        removeTag: function (a, b, c) {
            d("album.removeTag",
            a, b, c, "POST")
        },
        search: function (a, b) {
            c("album.search", a, b)
        },
        share: function (a, b, c) {
            if (typeof a.recipient == "object") a.recipient = a.recipient.join(",");
            d("album.share", a, c)
        }
    };
    this.artist = {
        addTags: function (a, b, c) {
            if (typeof a.tags == "object") a.tags = a.tags.join(",");
            d("artist.addTags", a, b, c, "POST")
        },
        getCorrection: function (a, b) {
            c("artist.getCorrection", a, b)
        },
        getEvents: function (a, b) {
            c("artist.getEvents", a, b)
        },
        getImages: function (a, b) {
            c("artist.getImages", a, b)
        },
        getInfo: function (a, b) {
            c("artist.getInfo", a, b)
        },
        getPastEvents: function (a,
        b) {
            c("artist.getPastEvents", a, b)
        },
        getPodcast: function (a, b) {
            c("artist.getPodcast", a, b)
        },
        getShouts: function (a, b) {
            c("artist.getShouts", a, b)
        },
        getSimilar: function (a, b) {
            c("artist.getSimilar", a, b)
        },
        getTags: function (a, b, c) {
            d("artist.getTags", a, b, c)
        },
        getTopAlbums: function (a, b) {
            c("artist.getTopAlbums", a, b)
        },
        getTopFans: function (a, b) {
            c("artist.getTopFans", a, b)
        },
        getTopTags: function (a, b) {
            c("artist.getTopTags", a, b)
        },
        getTopTracks: function (a, b) {
            c("artist.getTopTracks", a, b)
        },
        removeTag: function (a, b, c) {
            d("artist.removeTag",
            a, b, c, "POST")
        },
        search: function (a, b) {
            c("artist.search", a, b)
        },
        share: function (a, b, c) {
            if (typeof a.recipient == "object") a.recipient = a.recipient.join(",");
            d("artist.share", a, b, c, "POST")
        },
        shout: function (a, b, c) {
            d("artist.shout", a, b, c, "POST")
        }
    };
    this.auth = {
        getMobileSession: function (a, b) {
            a = {
                username: a.username,
                authToken: md5(a.username + md5(a.password))
            };
            d("auth.getMobileSession", a, null, b)
        },
        getSession: function (a, b) {
            d("auth.getSession", a, null, b)
        },
        getToken: function (a) {
            d("auth.getToken", null, null, a)
        },
        getWebSession: function (a) {
            var b = f;
            f = "http://ext.last.fm/2.0/";
            d("auth.getWebSession", null, null, a);
            f = b
        }
    };
    this.chart = {
        getHypedArtists: function (a, b, e) {
            c("chart.getHypedArtists", a, e)
        },
        getHypedTracks: function (a, b, e) {
            c("chart.getHypedTracks", a, e)
        },
        getLovedTracks: function (a, b, e) {
            c("chart.getLovedTracks", a, e)
        },
        getTopArtists: function (a, b, e) {
            c("chart.getTopArtists", a, e)
        },
        getTopTags: function (a, b, e) {
            c("chart.getTopTags", a, e)
        },
        getTopTracks: function (a, b, e) {
            c("chart.getTopTracks", a, e)
        }
    };
    this.event = {
        attend: function (a, b, c) {
            d("event.attend", a, b,
            c, "POST")
        },
        getAttendees: function (a, b, e) {
            c("event.getAttendees", a, e)
        },
        getInfo: function (a, b) {
            c("event.getInfo", a, b)
        },
        getShouts: function (a, b) {
            c("event.getShouts", a, b)
        },
        share: function (a, b, c) {
            if (typeof a.recipient == "object") a.recipient = a.recipient.join(",");
            d("event.share", a, b, c, "POST")
        },
        shout: function (a, b, c) {
            d("event.shout", a, b, c, "POST")
        }
    };
    this.geo = {
        getEvents: function (a, b) {
            c("geo.getEvents", a, b)
        },
        getMetroArtistChart: function (a, b) {
            c("geo.getMetroArtistChart", a, b)
        },
        getMetroHypeArtistChart: function (a, b) {
            c("geo.getMetroHypeArtistChart",
            a, b)
        },
        getMetroHypeTrackChart: function (a, b) {
            c("geo.getMetroHypeTrackChart", a, b)
        },
        getMetroTrackChart: function (a, b) {
            c("geo.getMetroTrackChart", a, b)
        },
        getMetroUniqueArtistChart: function (a, b) {
            c("geo.getMetroUniqueArtistChart", a, b)
        },
        getMetroUniqueTrackChart: function (a, b) {
            c("geo.getMetroUniqueTrackChart", a, b)
        },
        getMetroWeeklyChartlist: function (a, b) {
            c("geo.getMetroWeeklyChartlist", a, b)
        },
        getMetros: function (a, b) {
            c("geo.getMetros", a, b)
        },
        getTopArtists: function (a, b) {
            c("geo.getTopArtists", a, b)
        },
        getTopTracks: function (a,
        b) {
            c("geo.getTopTracks", a, b)
        }
    };
    this.group = {
        getHype: function (a, b) {
            c("group.getHype", a, b)
        },
        getMembers: function (a, b) {
            c("group.getMembers", a, b)
        },
        getWeeklyAlbumChart: function (a, b) {
            c("group.getWeeklyAlbumChart", a, b)
        },
        getWeeklyArtistChart: function (a, b) {
            c("group.getWeeklyArtistChart", a, b)
        },
        getWeeklyChartList: function (a, b) {
            c("group.getWeeklyChartList", a, b)
        },
        getWeeklyTrackChart: function (a, b) {
            c("group.getWeeklyTrackChart", a, b)
        }
    };
    this.library = {
        addAlbum: function (a, b, c) {
            d("library.addAlbum", a, b, c, "POST")
        },
        addArtist: function (a,
        b, c) {
            d("library.addArtist", a, b, c, "POST")
        },
        addTrack: function (a, b, c) {
            d("library.addTrack", a, b, c, "POST")
        },
        getAlbums: function (a, b) {
            c("library.getAlbums", a, b)
        },
        getArtists: function (a, b) {
            c("library.getArtists", a, b)
        },
        getTracks: function (a, b) {
            c("library.getTracks", a, b)
        }
    };
    this.playlist = {
        addTrack: function (a, b, c) {
            d("playlist.addTrack", a, b, c, "POST")
        },
        create: function (a, b, c) {
            d("playlist.create", a, b, c, "POST")
        },
        fetch: function (a, b) {
            c("playlist.fetch", a, b)
        }
    };
    this.radio = {
        getPlaylist: function (a, b, c) {
            d("radio.getPlaylist",
            a, b, c)
        },
        search: function (a, b, c) {
            d("radio.search", a, b, c)
        },
        tune: function (a, b, c) {
            d("radio.tune", a, b, c)
        }
    };
    this.tag = {
        getInfo: function (a, b) {
            c("tag.getInfo", a, b)
        },
        getSimilar: function (a, b) {
            c("tag.getSimilar", a, b)
        },
        getTopAlbums: function (a, b) {
            c("tag.getTopAlbums", a, b)
        },
        getTopArtists: function (a, b) {
            c("tag.getTopArtists", a, b)
        },
        getTopTags: function (a) {
            c("tag.getTopTags", null, a)
        },
        getTopTracks: function (a, b) {
            c("tag.getTopTracks", a, b)
        },
        getWeeklyArtistChart: function (a, b) {
            c("tag.getWeeklyArtistChart", a, b)
        },
        getWeeklyChartList: function (a,
        b) {
            c("tag.getWeeklyChartList", a, b)
        },
        search: function (a, b) {
            c("tag.search", a, b)
        }
    };
    this.tasteometer = {
        compare: function (a, b) {
            c("tasteometer.compare", a, b)
        },
        compareGroup: function (a, b) {
            c("tasteometer.compareGroup", a, b)
        }
    };
    this.track = {
        addTags: function (a, b, c) {
            d("track.addTags", a, b, c, "POST")
        },
        ban: function (a, b, c) {
            d("track.ban", a, b, c, "POST")
        },
        getBuylinks: function (a, b) {
            c("track.getBuylinks", a, b)
        },
        getCorrection: function (a, b) {
            c("track.getCorrection", a, b)
        },
        getFingerprintMetadata: function (a, b) {
            c("track.getFingerprintMetadata",
            a, b)
        },
        getInfo: function (a, b) {
            c("track.getInfo", a, b)
        },
        getShouts: function (a, b) {
            c("track.getShouts", a, b)
        },
        getSimilar: function (a, b) {
            c("track.getSimilar", a, b)
        },
        getTags: function (a, b, c) {
            d("track.getTags", a, b, c)
        },
        getTopFans: function (a, b) {
            c("track.getTopFans", a, b)
        },
        getTopTags: function (a, b) {
            c("track.getTopTags", a, b)
        },
        love: function (a, b, c) {
            d("track.love", a, b, c, "POST")
        },
        removeTag: function (a, b, c) {
            d("track.removeTag", a, b, c, "POST")
        },
        scrobble: function (a, b) {
            if (a.constructor.toString().indexOf("Array") != -1) {
                var c = {};
                for (i in a) for (j in a[i]) c[j + "[" + i + "]"] = a[i][j];
                a = c
            }
            d("track.scrobble", a, session, b, "POST")
        },
        search: function (a, b) {
            c("track.search", a, b)
        },
        share: function (a, b, c) {
            if (typeof a.recipient == "object") a.recipient = a.recipient.join(",");
            d("track.share", a, b, c, "POST")
        },
        unban: function (a, b, c) {
            d("track.unban", a, b, c, "POST")
        },
        unlove: function (a, b, c) {
            d("track.unlove", a, b, c, "POST")
        },
        updateNowPlaying: function (a, b, c) {
            d("track.updateNowPlaying", a, b, c, "POST")
        }
    };
    this.user = {
        getArtistTracks: function (a, b) {
            c("user.getArtistTracks",
            a, b)
        },
        getBannedTracks: function (a, b) {
            c("user.getBannedTracks", a, b)
        },
        getEvents: function (a, b) {
            c("user.getEvents", a, b)
        },
        getFriends: function (a, b) {
            c("user.getFriends", a, b)
        },
        getInfo: function (a, b) {
            c("user.getInfo", a, b)
        },
        getLovedTracks: function (a, b) {
            c("user.getLovedTracks", a, b)
        },
        getNeighbours: function (a, b) {
            c("user.getNeighbours", a, b)
        },
        getNewReleases: function (a, b) {
            c("user.getNewReleases", a, b)
        },
        getPastEvents: function (a, b) {
            c("user.getPastEvents", a, b)
        },
        getPersonalTracks: function (a, b) {
            c("user.getPersonalTracks",
            a, b)
        },
        getPlaylists: function (a, b) {
            c("user.getPlaylists", a, b)
        },
        getRecentStations: function (a, b, c) {
            d("user.getRecentStations", a, b, c)
        },
        getRecentTracks: function (a, b) {
            c("user.getRecentTracks", a, b)
        },
        getRecommendedArtists: function (a, b, c) {
            d("user.getRecommendedArtists", a, b, c)
        },
        getRecommendedEvents: function (a, b, c) {
            d("user.getRecommendedEvents", a, b, c)
        },
        getShouts: function (a, b) {
            c("user.getShouts", a, b)
        },
        getTopAlbums: function (a, b) {
            c("user.getTopAlbums", a, b)
        },
        getTopArtists: function (a, b) {
            c("user.getTopArtists", a, b)
        },
        getTopTags: function (a, b) {
            c("user.getTopTags", a, b)
        },
        getTopTracks: function (a, b) {
            c("user.getTopTracks", a, b)
        },
        getWeeklyAlbumChart: function (a, b) {
            c("user.getWeeklyAlbumChart", a, b)
        },
        getWeeklyArtistChart: function (a, b) {
            c("user.getWeeklyArtistChart", a, b)
        },
        getWeeklyChartList: function (a, b) {
            c("user.getWeeklyChartList", a, b)
        },
        getWeeklyTrackChart: function (a, b) {
            c("user.getWeeklyTrackChart", a, b)
        },
        shout: function (a, b, c) {
            d("user.shout", a, b, c, "POST")
        }
    };
    this.venue = {
        getEvents: function (a, b) {
            c("venue.getEvents", a, b)
        },
        getPastEvents: function (a,
        b) {
            c("venue.getPastEvents", a, b)
        },
        search: function (a, b) {
            c("venue.search", a, b)
        }
    };
    var o = {
        getApiSignature: function (a) {
            var b = [],
                c = "",
                d;
            for (d in a) b.push(d);
            b.sort();
            for (var f in b) d = b[f], c += d + a[d];
            c += n;
            return md5(c)
        }
    }
};
var hexcase = 0,
    b64pad = "",
    chrsz = 8;

function md5(b) {
    return hex_md5(b)
}
function hex_md5(b) {
    return binl2hex(core_md5(str2binl(b), b.length * chrsz))
}
function b64_md5(b) {
    return binl2b64(core_md5(str2binl(b), b.length * chrsz))
}
function str_md5(b) {
    return binl2str(core_md5(str2binl(b), b.length * chrsz))
}
function hex_hmac_md5(b, g) {
    return binl2hex(core_hmac_md5(b, g))
}
function b64_hmac_md5(b, g) {
    return binl2b64(core_hmac_md5(b, g))
}
function str_hmac_md5(b, g) {
    return binl2str(core_hmac_md5(b, g))
}

function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72"
}

function core_md5(b, g) {
    b[g >> 5] |= 128 << g % 32;
    b[(g + 64 >>> 9 << 4) + 14] = g;
    for (var a = 1732584193, c = -271733879, d = -1732584194, e = 271733878, f = 0; f < b.length; f += 16) var h = a,
        i = c,
        j = d,
        k = e,
        a = md5_ff(a, c, d, e, b[f + 0], 7, -680876936),
        e = md5_ff(e, a, c, d, b[f + 1], 12, -389564586),
        d = md5_ff(d, e, a, c, b[f + 2], 17, 606105819),
        c = md5_ff(c, d, e, a, b[f + 3], 22, -1044525330),
        a = md5_ff(a, c, d, e, b[f + 4], 7, -176418897),
        e = md5_ff(e, a, c, d, b[f + 5], 12, 1200080426),
        d = md5_ff(d, e, a, c, b[f + 6], 17, -1473231341),
        c = md5_ff(c, d, e, a, b[f + 7], 22, -45705983),
        a = md5_ff(a, c, d, e, b[f + 8], 7,
        1770035416),
        e = md5_ff(e, a, c, d, b[f + 9], 12, -1958414417),
        d = md5_ff(d, e, a, c, b[f + 10], 17, -42063),
        c = md5_ff(c, d, e, a, b[f + 11], 22, -1990404162),
        a = md5_ff(a, c, d, e, b[f + 12], 7, 1804603682),
        e = md5_ff(e, a, c, d, b[f + 13], 12, -40341101),
        d = md5_ff(d, e, a, c, b[f + 14], 17, -1502002290),
        c = md5_ff(c, d, e, a, b[f + 15], 22, 1236535329),
        a = md5_gg(a, c, d, e, b[f + 1], 5, -165796510),
        e = md5_gg(e, a, c, d, b[f + 6], 9, -1069501632),
        d = md5_gg(d, e, a, c, b[f + 11], 14, 643717713),
        c = md5_gg(c, d, e, a, b[f + 0], 20, -373897302),
        a = md5_gg(a, c, d, e, b[f + 5], 5, -701558691),
        e = md5_gg(e, a, c, d, b[f + 10], 9, 38016083),
        d = md5_gg(d, e, a, c, b[f + 15], 14, -660478335),
        c = md5_gg(c, d, e, a, b[f + 4], 20, -405537848),
        a = md5_gg(a, c, d, e, b[f + 9], 5, 568446438),
        e = md5_gg(e, a, c, d, b[f + 14], 9, -1019803690),
        d = md5_gg(d, e, a, c, b[f + 3], 14, -187363961),
        c = md5_gg(c, d, e, a, b[f + 8], 20, 1163531501),
        a = md5_gg(a, c, d, e, b[f + 13], 5, -1444681467),
        e = md5_gg(e, a, c, d, b[f + 2], 9, -51403784),
        d = md5_gg(d, e, a, c, b[f + 7], 14, 1735328473),
        c = md5_gg(c, d, e, a, b[f + 12], 20, -1926607734),
        a = md5_hh(a, c, d, e, b[f + 5], 4, -378558),
        e = md5_hh(e, a, c, d, b[f + 8], 11, -2022574463),
        d = md5_hh(d, e, a, c, b[f + 11], 16, 1839030562),
        c = md5_hh(c, d, e, a, b[f + 14], 23, -35309556),
        a = md5_hh(a, c, d, e, b[f + 1], 4, -1530992060),
        e = md5_hh(e, a, c, d, b[f + 4], 11, 1272893353),
        d = md5_hh(d, e, a, c, b[f + 7], 16, -155497632),
        c = md5_hh(c, d, e, a, b[f + 10], 23, -1094730640),
        a = md5_hh(a, c, d, e, b[f + 13], 4, 681279174),
        e = md5_hh(e, a, c, d, b[f + 0], 11, -358537222),
        d = md5_hh(d, e, a, c, b[f + 3], 16, -722521979),
        c = md5_hh(c, d, e, a, b[f + 6], 23, 76029189),
        a = md5_hh(a, c, d, e, b[f + 9], 4, -640364487),
        e = md5_hh(e, a, c, d, b[f + 12], 11, -421815835),
        d = md5_hh(d, e, a, c, b[f + 15], 16, 530742520),
        c = md5_hh(c, d, e,
        a, b[f + 2], 23, -995338651),
        a = md5_ii(a, c, d, e, b[f + 0], 6, -198630844),
        e = md5_ii(e, a, c, d, b[f + 7], 10, 1126891415),
        d = md5_ii(d, e, a, c, b[f + 14], 15, -1416354905),
        c = md5_ii(c, d, e, a, b[f + 5], 21, -57434055),
        a = md5_ii(a, c, d, e, b[f + 12], 6, 1700485571),
        e = md5_ii(e, a, c, d, b[f + 3], 10, -1894986606),
        d = md5_ii(d, e, a, c, b[f + 10], 15, -1051523),
        c = md5_ii(c, d, e, a, b[f + 1], 21, -2054922799),
        a = md5_ii(a, c, d, e, b[f + 8], 6, 1873313359),
        e = md5_ii(e, a, c, d, b[f + 15], 10, -30611744),
        d = md5_ii(d, e, a, c, b[f + 6], 15, -1560198380),
        c = md5_ii(c, d, e, a, b[f + 13], 21, 1309151649),
        a = md5_ii(a,
        c, d, e, b[f + 4], 6, -145523070),
        e = md5_ii(e, a, c, d, b[f + 11], 10, -1120210379),
        d = md5_ii(d, e, a, c, b[f + 2], 15, 718787259),
        c = md5_ii(c, d, e, a, b[f + 9], 21, -343485551),
        a = safe_add(a, h),
        c = safe_add(c, i),
        d = safe_add(d, j),
        e = safe_add(e, k);
    return [a, c, d, e]
}
function md5_cmn(b, g, a, c, d, e) {
    return safe_add(bit_rol(safe_add(safe_add(g, b), safe_add(c, e)), d), a)
}
function md5_ff(b, g, a, c, d, e, f) {
    return md5_cmn(g & a | ~g & c, b, g, d, e, f)
}
function md5_gg(b, g, a, c, d, e, f) {
    return md5_cmn(g & c | a & ~c, b, g, d, e, f)
}

function md5_hh(b, g, a, c, d, e, f) {
    return md5_cmn(g ^ a ^ c, b, g, d, e, f)
}
function md5_ii(b, g, a, c, d, e, f) {
    return md5_cmn(a ^ (g | ~c), b, g, d, e, f)
}
function core_hmac_md5(b, g) {
    var a = str2binl(b);
    a.length > 16 && (a = core_md5(a, b.length * chrsz));
    for (var c = Array(16), d = Array(16), e = 0; e < 16; e++) c[e] = a[e] ^ 909522486, d[e] = a[e] ^ 1549556828;
    a = core_md5(c.concat(str2binl(g)), 512 + g.length * chrsz);
    return core_md5(d.concat(a), 640)
}
function safe_add(b, g) {
    var a = (b & 65535) + (g & 65535);
    return (b >> 16) + (g >> 16) + (a >> 16) << 16 | a & 65535
}

function bit_rol(b, g) {
    return b << g | b >>> 32 - g
}
function str2binl(b) {
    for (var g = [], a = (1 << chrsz) - 1, c = 0; c < b.length * chrsz; c += chrsz) g[c >> 5] |= (b.charCodeAt(c / chrsz) & a) << c % 32;
    return g
}
function binl2str(b) {
    for (var g = "", a = (1 << chrsz) - 1, c = 0; c < b.length * 32; c += chrsz) g += String.fromCharCode(b[c >> 5] >>> c % 32 & a);
    return g
}
function binl2hex(b) {
    for (var g = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", a = "", c = 0; c < b.length * 4; c++) a += g.charAt(b[c >> 2] >> c % 4 * 8 + 4 & 15) + g.charAt(b[c >> 2] >> c % 4 * 8 & 15);
    return a
}

function binl2b64(b) {
    for (var g = "", a = 0; a < b.length * 4; a += 3) for (var c = (b[a >> 2] >> 8 * (a % 4) & 255) << 16 | (b[a + 1 >> 2] >> 8 * ((a + 1) % 4) & 255) << 8 | b[a + 2 >> 2] >> 8 * ((a + 2) % 4) & 255, d = 0; d < 4; d++) g += a * 8 + d * 6 > b.length * 32 ? b64pad : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c >> 6 * (3 - d) & 63);
    return g
};



// ------------------------------------------------------------------------------------------------
// LastChart Tools
// ------------------------------------------------------------------------------------------------

(function () {
    window.LC = {};
    LC.collections = {};
    LC.models = {};
    LC.views = {};
    LC.mixins = {};
    LC.global = {};
    LC.text = {};
    LC.config = {};
    LC.tools = {};
    LC.template = {}
})();
(function (j) {
    function k(a, b, d) {
        for (var e = [], f = 0; f < d; f++) {
            var g = a[f].n,
                c = b[g];
            c.n = g;
            e.push({
                value: a[f].p,
                index: f,
                $: c,
                node: !0
            })
        }
        return e
    }
    function l(a) {
        _.each(a, function (a) {
            a.$.tag = a.$.t && a.$.t.length && a.$.t[0] ? a.$.t[0] : ""
        })
    }
    function m(a, b) {
        _.each(b, function (d) {
            d.source = a[d.source];
            d.target = a[d.target]
        })
    }
    function n(a) {
        var b = [];
        _.each(a, function (a) {
            _.each(a.children, function (a) {
                a.group = b.length
            });
            a.group = b.length;
            b.push(a)
        });
        return b
    }
    function o(a, b) {
        _.each(a, function (a) {
            a.group !== void 0 && (b[a.group] = b[a.group] || {
                similar: !0,
                tag: a.$.tag,
                first: a
            })
        })
    }
    function p(a, b) {
        _.each(a, function (a) {
            b[a.group] = b[a.group] || {
                tag: a.$.tag
            };
            b[a.group].children = b[a.group].children || [];
            b[a.group].children.push(a);
            b[a.group].value = (b[a.group].value || 0) + a.value
        })
    }
    function q(a, b, d) {
        var e = d;
        _.each(a, function (d, g) {
            if (d.group === void 0) {
                d.group = e;
                for (var c = g + 1; c < a.length; c++) if (a[c].group === void 0 && a[g].$.tag === a[c].$.tag) b.push({
                    source: g,
                    target: c,
                    value: 0
                }), a[c].group = e;
                e++
            }
        })
    }
    function r(a) {
        var b = [],
            d = 0;
        _.each(a, function (e,
        f) {
            _.each(e.$.m || [], function (g) {
                var c = _.find(a, function (a) {
                    return g == a.$.n
                });
                if (c) {
                    var h = _.find(b, function (a) {
                        return a.source == f && a.target == c.index || a.source == c.index && a.target == f
                    });
                    h ? h.value++ : b.push({
                        source: f,
                        target: c.index,
                        value: 1,
                        similar: !0
                    });
                    var i = e.group !== void 0 ? e.group : c.group !== void 0 ? c.group : d++;
                    _.each(a, function (a) {
                        if (!(a == e || a == c)) if (a.group !== void 0 && (a.group === e.group || a.group === c.group)) a.group = i
                    });
                    e.group = c.group = i
                }
            })
        });
        return {
            links: b,
            lastgroup: d
        }
    }
    j.Analyse = function (a) {
        if (!a.data || !a.data.user || !a.data.user.a || !a.data.user.a.length) a.problem = "No data available.", a.finish(a);
        else if (a.data && a.data.user && a.data.user.a && a.data.user.a && 0 === _.reduce(a.data.user.a, function (a, b) {
            return b.p ? a + b.p : a
        }, 0)) a.problem = "No played artists avaliable.", a.finish(a);
        else {
            var b = a.data.user.a || [];
            a.data.max = b.length < a.top ? b.length : a.top;
            a.nodes = [];
            a.links = [];
            a.clusters = [];
            a.nodes = k(a.data.user.a, a.data.info, a.data.max);
            a.sum = _.reduce(a.nodes, function (a, b) {
                return a + b.value
            }, 0);
            b = 0;
            if (a.groupby == 0) b = r(a.nodes), a.links = b.links, b = b.lastgroup;
            l(a.nodes);
            o(a.nodes, a.clusters);
            q(a.nodes, a.links, b);
            p(a.nodes, a.clusters);
            a.clusters = n(a.clusters);
            a.groups = a.clusters.length;
            m(a.nodes, a.links);
            a.callback(a)
        }
    }
})(LC.tools);


// ------------------------------------------------------------------------------------------------
// LastChart
// ------------------------------------------------------------------------------------------------
(function (d, q, f, j) {
    d.RefreshApp = function () {
        function a() {
            !d && window.applicationCache && window.applicationCache.status == window.applicationCache.UPDATEREADY && (d = !0, confirm("New version available. Reload now?") && ($("body").html('<div style="margin: 20px 60px;"><div id="lc-progress" class="progress progress-striped active" style="margin-bottom: 0px; display: block; "><div class="bar" style="font-size: 13px; font-weight: bold; padding-top: 1px; width: 50%; "></div></div><div id="lc-status" style="margin-bottom: 18px; display: block; ">Reloading application\u2026 </div></div>'),
            window.applicationCache.swapCache(), window.location.reload()))
        }
        var d = !1;
        a();
        window.applicationCache && window.applicationCache.addEventListener("updateready", function () {
            a()
        }, !1)
    };
    d.App = function (a) {
        function l(b) {
            var c;
            for (c = 0; c < f.Charts.length; c++) {
                var d = "lc-type-" + f.Charts[c][0];
                if (!b && $("#" + d).hasClass("active")) break;
                else if (b && (b.target.id == d || b.target.parentElement.id == d)) break
            }
            a.chartname = f.Charts[c][0];
            return f.Charts[c][1]
        }
        function m(b) {
            var c = $(a.where).width();
            $(a.where).height(c);
            $("#lc-mainchart .lc-resize").height(c);
            $(a.where + " svg").width(c);
            $(a.where + " svg").height(c);
            if (!b && (a.chartname == "map" || a.chartname == "cloud") && a.chart) {
                if (a.chartname == "cloud") a.chart.update = !0;
                e()
            }
        }
        function k(a, c) {
            $("#lc-alert").append(Mustache.render(j.Warning, {
                message: a,
                type: c
            }));
            $(".alert").show("fast")
        }
        function h(b) {
            if (b) {
                if (a.chart = a.chart || {}, a.chart.update = !0, a.chart.status == "collapsed") a.chart = null
            } else a.chart = null
        }
        function n(a) {
            var c = {
                none: {
                    s: 0,
                    e: 0
                },
                artists: {
                    s: 0,
                    e: 0.1
                },
                info: {
                    s: 0.1,
                    e: 1
                },
                similars: {
                    s: 0.1,
                    e: 0.65
                },
                tags: {
                    s: 0.65,
                    e: 1
                },
                weekly: {
                    s: 0.1,
                    e: 0.65
                },
                weeklydetail: {
                    s: 0.65,
                    e: 1
                }
            }, c = Math.round(((c[a.type].e - c[a.type].s) * a.status + c[a.type].s) * 100);
            $("#lc-progress .bar").width(c + "%");
            $("#lc-progress .bar").text(c > 0 ? c + "%" : "");
            $("#lc-status").text(a.message)
        }
        function e() {
            function b() {
                a.chartname == "stream" ? d.DataWeekly(a) : d.Data(a)
            }
            $("#lc-sample a").removeClass("active");
            a.sample && (a.user == "avonek" ? $("#lc-sample a").eq(0).addClass("active") : $("#lc-sample a").eq(1).addClass("active"));
            $("#lc-alert").html("");
            n({
                type: "none",
                status: 0,
                message: "Loading\u2026"
            });
            $("#lc-progress .bar").width("0%");
            $("#lc-progress .bar").text("");
            $("#lc-progress").show();
            $("#lc-status").show();
            !a.chart && !a.test && ($(a.where).html(""), $(a.where).hide(), $("#lc-user-info").hide());
            $("#lc-user-info").hide();
            var c = d.GetGradient(a.scheme, a.top / 2),
                c = d3.scale.ordinal().range(c);
            a.main = "lc-chart-" + a.chartname;
            a.color = c;
            a.callback = a.charttype;
            a.sample ? d.SetMemory(f.Samples) : d.SetMemory(null);
            a.sample ? ($("#lastchart-user").val(""), window.location.hash = "") : ($("#lastchart-user").val(a.user),
            window.location.hash = "lfm=" + a.user);
            a.chartname == "stream" ? ($("#lc-cn-top, #lc-cn-group, #lc-cn-groupby, #lc-cn-range").css("display", "none"), $("#lc-cn-weeks").css("display", "")) : ($("#lc-cn-top, #lc-cn-group, #lc-cn-groupby, #lc-cn-range").css("display", ""), $("#lc-cn-weeks").css("display", "none"));
            a.callback = d.test;
            if (true || window.location.host == "localhost") try {
                b()
            } catch (e) {
                k(e.message, "Exception!")
            } else b();
            a.expanded = !0
        }
        var i = {
            user: f.DefaultUser,
            top: f.DefaultTop,
            chart: null,
            sample: !0,
            expanded: !0,
            chartname: null,
            weekly: !1,
            scheme: f["Scheme 1"],
            where: "#lc-mainchart",
            initchart: function () {
                $(a.where).show();
                m(!0)
            },
            finish: function (b) {
                a = b;
                a.problem ? (a.alert(a.problem), $(a.where).html(""), $(a.where).hide(), $("#lc-info-alert").hide(), a.problem = null) : ($("#lc-info-alert").show("fast"), a.usrinf = {
                    chart: a.chartname,
                    user: a.user
                }, a.usrinf.sample = a.sample, a.usrinf.last = a.weekly, a.sample && _.each(f.SampleName, function (b, d) {
                    if (b == a.user) a.usrinf.samplename = d
                }), a.chartname == "stream" ? (a.usrinf.weeksartists = a.data.series.length,
                a.usrinf.weeks = a.data.series[0].s.length) : a.usrinf.artists = a.nodes.length, $("#lc-user-info").html(Mustache.render($("#template-user").html(), a.usrinf)), $("#lc-user-info").show(), _gaq && !a.sample && _gaq.push(["_trackEvent", "Last.fm", a.user, a.chartname]));
                !a.sample && -1 == _.indexOf(a.usernames, a.user) && (a.usernames.push(a.user), $("#lastchart-user").typeahead({
                    source: a.usernames
                }));
                $("#lc-progress").hide();
                $("#lc-status").hide();
                $(a.where + " [title]").tooltip({
                    placement: "top"
                })
            },
            progress: n,
            alert: k,
            info: function (a,
            c) {
                if (a) {
                    $("#lc-info-alert").hide("slow", function () {
                        $("#lc-info-alert").remove()
                    });
                    $("#lc-info-toolbar").show("slow");
                    var e = a.b,
                        f = $(document.createElement("div"));
                    f.html(e);
                    f.find("a").each(function () {
                        $(this).attr("target", "_blank")
                    });
                    var e = md5(c),
                        g = a,
                        g = {
                            n: c,
                            i: g.i,
                            p: d.AddCommas(g.p),
                            l: d.AddCommas(g.l),
                            b: f.html(),
                            m: g.m,
                            t: g.t,
                            a: e
                        };
                    g.hasm = g.m && g.m.length;
                    g.hast = g.t && g.t.length;
                    g.m = _.map(g.m, function (a) {
                        return {
                            n: a.length > 48 ? a.substring(0, 48) + "\u2026" : a,
                            v: a
                        }
                    });
                    $("#lc-info .info[data-art=" + e + "]").remove();
                    $("#lc-info").prepend(Mustache.render(j.Artist, g));
                    $(".info").show("fast");
                    $("#lc-info .info").first().offset() && $(window).height() < $("#lc-info .info").first().offset().top && $("html,body").animate({
                        scrollTop: $("#lc-info .info").first().offset().top - 19 - ($(".navbar-fixed-top").first().css("position") == "fixed" ? 40 : 0)
                    }, "slow")
                }
            },
            weeks: 26,
            groupby: 0,
            animate: 2
        }, o = d.GetHashParameterByName("lfm");
        if (o) i.sample = !1, i.user = o;
        a = $.extend(i, a);
        a.charttype = l();
        j.Artist = $("#template-artist").html();
        if ($.browser.msie || $.browser.mozilla) $("#lc-animate-2").removeClass("active"), $("#lc-animate-1").addClass("active"), a.animate = 1;
        if ($.browser.mobile) $("#lc-animate-2").removeClass("active"), $("#lc-animate-0").addClass("active"), a.animate = 0;
        i = d.GetStoredData();
        a.usernames = _.map(i.users, function (a) {
            return a.u
        });
        $("#lastchart-user").typeahead({
            source: a.usernames
        });
        $("#lastchart-user").focus();
        $("#lc-top").button();
        $(".dropdown-toggle").dropdown();
        $(".lc-hint").tooltip({
            placement: "bottom"
        });
        a.url = window.location.protocol +
            "//" + window.location.host + window.location.pathname;
        window.gapi && gapi.plusone.render("gplus-site", {
            annotation: "none",
            size: "standard",
            href: a.url
        });
        var p;
        $(window).resize(function () {
            clearTimeout(p);
            p = setTimeout(m, 200)
        });
        $(".lc-share-btn").click(function (b) {
            b.preventDefault();
            $("body").addClass("lc-cover-body");
            $(".lc-cover").show();
            $("#lc-share-site input").val(a.url);
            $(".modal").removeClass("hide");
            (b = $("#lastchart-user").val().trim()) ? ($("#lc-share-user h4").text(b + "'s chart"), $("#lc-share-user").show(),
            b = a.url + "#lfm=" + b, $("#lc-share-user input").val(b), $("#lc-share-user input").focus().select()) : ($("#lc-share-user").hide(), $("#lc-share-site input").focus().select())
        });
        $("#lc-btn-save").click(function (b) {
            b.preventDefault();
            b = $("#lc-mainchart").html();
            b = "data:application/octet-stream," + encodeURIComponent(b);
            window.open(b, "chart-" + a.chartname + ".svg")
        });
        $(".lc-close, .close, .lc-cover").click(function (a) {
            a.preventDefault();
            $("body").removeClass("lc-cover-body");
            $(".lc-cover").hide();
            $(".modal").addClass("hide")
        });
        $(".modal input[type=text]").click(function (a) {
            a.preventDefault();
            this.select();
            return !0
        });


        $("#lc-type button").click(function (b) {
            b.preventDefault();
            a.charttype = l(b);
            h();
            e()
        });


        $("#lc-type a").click(function (b) {
            window.alert('hi');
            b.preventDefault();
            a.charttype = l(b);
            h();
            e()
        });
        
        
        $("#lc-range button").click(function (b) {
            b.preventDefault();
            a.weekly = b.target.id == "lc-range-week";
            h(!0);
            e()
        });
        $(".lc-scheme").click(function (b) {
            b.preventDefault();
            a.scheme = f[$(this).text()];
            h();
            e()
        });
        $("#lc-export").click(function () {
            $("#lastchart-modal").html(Mustache.render(j.Modal, {
                title: "Export"
            }));
            $("#lastchart-modal textarea").text(JSON.stringify(d.GetMemory()));
            $("#lastchart-modal .modal").modal("show");
            $("#lastchart-modal textarea").focus();
            $(".lastchart-close-modal").click(function () {
                $("#lastchart-modal .modal").modal("hide");
                return !1
            });
            return !1
        });
        $("#lc-cache-clear").click(function () {
            localStorage.clear()
        });
        $("#lc-expand").click(function (b) {
            b.preventDefault();
            a.expanded = !0;
            e()
        });
        $("#lc-collapse").click(function (b) {
            b.preventDefault();
            a.expanded = !1;
            e()
        });
        $("#lc-groupby-similar").click(function (b) {
            b.preventDefault();
            a.groupby = 0;
            e()
        });
        $("#lc-groupby-tag").click(function (b) {
            b.preventDefault();
            a.groupby = 1;
            e()
        });
        $("#lc-animate button").click(function (b) {
            b.preventDefault();
            a.animate = $(this).data("value");
            e()
        });
        $("#lc-top .btn").click(function (b) {
            b.preventDefault();
            a.top = $.trim($(this).text());
            h(!0);
            e()
        });
        $("#lc-weeks .btn").click(function (b) {
            b.preventDefault();
            a.weeks = b.target.id == "lc-weeks-26" ? 26 : 52;
            e()
        });
        $(".lc-more").click(function (b) {
            b.preventDefault();
            a.user = $.trim($(this).text());
            a.sample = !1;
            h();
            e()
        });
        $("#lc-sample a").click(function (b) {
            b.preventDefault();
            a.user = f.SampleName[$.trim($(this).text())];
            a.sample = !0;
            h();
            e()
        });
        $("#lc-userform").submit(function (b) {
            b.preventDefault();
            $("#lc-alert").html("");
            a.user = $.trim($("#lastchart-user").val());
            if (a.user == "") return k('You need to enter <a href="http://www.last.fm" target="_blank">Last.fm</a> user name.'), $("#lastchart-user").focus(), !1;
            a.sample = !1;
            h();
            e();
            return !1
        });
        $(".lc-btn-info").click(function (a) {
            a.preventDefault();
            a = "no-" + $(this).text().toLowerCase();
            $(this).hasClass("active") ? $("#lc-info").addClass(a) : $("#lc-info").removeClass(a)
        });
        $(".lc-btn-toggle").click(function (a) {
            a.preventDefault();
            var c, a = "summary,photo,tags,similar,stats,links".split(",");
            if ($(".lc-btn-info.active").length > 0) for (c in $(".lc-btn-info.active").removeClass("active"), a) $("#lc-info").addClass("no-" + a[c]);
            else for (c in $(".lc-btn-info").addClass("active"), a) $("#lc-info").removeClass("no-" + a[c])
        });
        e()
    }
})(LC.tools, LC.text, LC.config, LC.template);


// ------------------------------------------------------------------------------------------------
// LastChart App
// ------------------------------------------------------------------------------------------------
(function (a) {
    function j(b) {
        if (e) try {
            var a = window.localStorage.getItem(b);
            if (a) return JSON.parse(a)
        } catch (c) { }
    }
    function l(b, a) {
        if (e) {
            var c;
            try {
                c = JSON.stringify(a)
            } catch (d) { }
            try {
                window.localStorage.setItem(b, c)
            } catch (g) {
                if (e) try {
                    for (var h = 0; h < localStorage.length; h += 2) localStorage.key(h) != KEY && localStorage.removeItem(localStorage.key(h))
                } catch (i) { }
                try {
                    window.localStorage.setItem(b, c)
                } catch (j) { }
            }
        }
    }
    a.CacheVersion = 9;
    a.CacheKey = "LC!";
    a.CacheRefresh = !0;
    a.CacheExpire = 604800;
    var d = {}, i = null,
        e;
    if ((e = window.localStorage ? !0 : !1) && j(a.CacheKey) !== a.CacheVersion) {
        if (e) try {
            window.localStorage.clear()
        } catch (m) { }
        l(a.CacheKey, a.CacheVersion)
    }
    a.GetMemory = function () {
        return d
    };
    a.SetMemory = function (b) {
        i = b
    };
    a.CacheGet = function (b, k) {
        var c = null,
            f = i || d;
        if (f[b]) c = f[b].v;
        else if (e) {
            var g = j(b);
            if (g) f[b] = g, c = g.v
        } !k && c && !i && f[b].t + a.CacheExpire < Math.round((new Date).getTime() / 1E3) && (c = null);
        return c
    };
    a.CacheSet = function (b, a) {
        d[b] = {
            t: Math.round((new Date).getTime() / 1E3),
            v: a
        };
        l(b, d[b])
    };
    a.CacheRemove = function (a) {
        delete d[a];
        if (e) try {
            window.localStorage.removeItem(a)
        } catch (k) { }
    };
    a.CacheKeys = function () {
        if (e) {
            for (var a = [], d = 0; d < localStorage.length; d++) a.push(localStorage.key(d));
            return a
        }
    }
})(LC.tools);
(function (u) {
    function v(a, j, d, f, p, q) {
        f.font = j;
        return {
            width: f.measureText(a).width + 2 * p,
            height: Math.round(d * q)
        }
    }
    function r(a, j) {
        var d = document.createElement("canvas");
        d.width = a;
        d.height = j;
        return d.getContext("2d")
    }
    u.GetCloud = function (a, j, d, f, p, q, g, u) {
        var h = r(f, p),
            w = r(f, p);
        _.each(a, function (a) {
            var s = a.$.n,
                b = a.norm,
                e = !0,
                r = 10,
                n = j + " " + b + "px " + d,
                i = v(s, n, b, h, g, q);
            i.width + 2 * g > f && (b *= (f - 2 * g) / i.width, n = j + " " + b + "px " + d, i = v(s, n, b, h, g, q));
            for (; e && r-- > 0; ) {
                var x = Math.round(Math.random() * (f - i.width - g)) + g,
                    y = Math.round(Math.random() * (p - i.height)),
                    c = x - g,
                    c = c < 0 ? 0 : c,
                    k = y,
                    l = i.width,
                    m = i.height;
                w.drawImage(h.canvas, c, k, l, m, c, k, l, m);
                var e = s,
                    o = x,
                    z = y,
                    t = h;
                t.font = n;
                t.textBaseline = "top";
                t.fillStyle = "rgba(255, 0, 0, 0.5)";
                t.fillText(e, o, z);
                a: 
                {
                    e = h.getImageData(c, k, l, m).data;
                    o = void 0;
                    for (o = 0; o < e.length; o += 4) if (e[o + 3] > 128) {
                        e = !0;
                        break a
                    }
                    e = !1
                }
                e ? (h.clearRect(c, k, l, m), h.drawImage(w.canvas, c, k, l, m, c, k, l, m), b = Math.max(Math.round(b * 0.85), u), n = j + " " + b + "px " + d, i = v(s, n, b, h, g, q)) : (a.x = x, a.y = y, a.fs = b);
                w.clearRect(c, k, l, m)
            }
        })
    }
})(LC.tools);
(function (l) {
    function f(b) {
        return b.charAt(0) == "#" ? b.substring(1, 7) : b
    }
    l.GetGradient = function (b, i) {
        i *= 10;
        sideSize = 1;
        orientation = 0;
        var m = sideSize;
        if (orientation == 1 || orientation == 3) m = i;
        for (var p = 1 / i, n = [], a = 0; a < m; a++) n[a] = [];
        for (var c = 0, d, a = 0; a < b.length - 2; a += 2) {
            var o = b[a + 1],
                q = b[a + 3],
                g = b[a + 0],
                h = b[a + 2],
                g = [parseInt(f(g).substring(0, 2), 16), parseInt(f(g).substring(2, 4), 16), parseInt(f(g).substring(4, 6), 16)],
                h = [parseInt(f(h).substring(0, 2), 16), parseInt(f(h).substring(2, 4), 16), parseInt(f(h).substring(4, 6), 16)];
            for (k = o; k < q + p; k += p) {
                var e, c = g;
                d = h;
                e = (k - o) / (q - o);
                e = [Math.round(c[0] + (d[0] - c[0]) * e), Math.round(c[1] + (d[1] - c[1]) * e), Math.round(c[2] + (d[2] - c[2]) * e)];
                c = Math.floor(k * i / 10);
                for (d = 0; d < m; d++) {
                    for (var l = n[d], r = c, j = (e[2] | e[1] << 8 | e[0] << 16).toString(16); j.length < 6; ) j = "0" + j;
                    l[r] = "#" + j
                }
            }
        }
        return n[0]
    }
})(LC.tools);
(function (a, b) {
    a.LastFmApiKey = "6ae987073ffe7ed86f6addbd07094838";
    a.LastFmApiSecret = "085ffce3f79d72ff601db25bf7333641";
    a.MaxArtists = 100;
    a.Charts = [
        ["cloud", b.ChartCL],
        ["sun", null],
        ["list", null],
        ["map", b.ChartTM],
        ["pack", b.ChartPK],
        ["bubble", b.ChartBB],
        ["force", b.Chart],
        ["stream", b.ChartWave]
    ];
    a.DefaultTop = 50;
    a["Scheme 1"] = ["FD5E58", 0, "FD8752", 0.062222227454185486, "FDAF4C", 0.12444445490837097, "F8C64A", 0.18666668236255646, "DACC4E", 0.24888890981674194, "B2CA58", 0.31111112236976624, "7AC769", 0.3733333349227905,
        "42C276", 0.4355555474758148, "37B377", 0.4977778196334839, "28A07A", 0.5600000023841858, "1F957D", 0.6222222447395325, "1B907D", 0.6844444870948792, "178A7D", 0.746666669845581, "9B4557", 0.8088889122009277, "CE495B", 0.8711110949516296, "F34D5B", 0.9333333373069763, "FD5E58", 1];
    a["Scheme 2"] = ["198ACF", 0, "4FD7E9", 0.11, "51ABD1", 0.2, "137DC9", 0.33, "80C2D9", 0.48, "3975BC", 0.56, "3AA7D8", 0.63, "0C71C0", 0.71, "8CABDA", 0.79, "A0D2E5", 0.85, "A4D0E0", 0.91, "5CBBE0", 0.94, "6FA7BF", 0.97, "BAC9D8", 1];
    a["Scheme 3"] = ["FBAB06", 0, "FAB718",
    0.06666667014360428, "FBCF39", 0.13333334028720856, "E9E25C", 0.20000001788139343, "C4D55B", 0.2666666805744171, "A3C858", 0.3333333432674408, "6AAF63", 0.4000000059604645, "4BA170", 0.46666666865348816, "419C78", 0.5333333611488342, "2C9580", 0.6000000238418579, "13878B", 0.6666666865348816, "137C8B", 0.7333333492279053, "226A7F", 0.800000011920929, "305976", 0.8666666746139526, "3A4F6E", 0.9333333373069763, "424569", 1];
    a["Scheme 4"] = ["8E8787", 0, "ABA4A1", 0.17, "C7C3C2", 0.32, "DFDFDF", 0.45, "CDC7C3", 0.57, "887E7E", 0.64, "E5E1DD",
    0.71, "A6A1B2", 0.78, "C2C1C6", 0.83, "887E7E", 0.87, "A6A1B2", 0.91, "B5A89F", 0.94, "E7E4E2", 0.97, "AAA197", 0.99, "98979D", 1];
    a.SampleName = {
        "Sample A": "avonek",
        "Sample B": "ens0nad0r"
    };
    a.DefaultUser = a.SampleName["Sample A"]
})(LC.config, LC.tools);
(function (g) {
    function i(a) {
        return a.name[a.name.length - 1] == "\u2026" ? a.url ? decodeURI(a.url.substring(a.url.lastIndexOf("/") + 1).replace(/\+/g, " ")) : a.name : a.name
    }
    g.ConvertUser = function (a) {
        var c;
        if (a.artists && a.artists.artist) {
            if (c = {
                u: a.artists["@attr"].user,
                t: parseInt(a.artists["@attr"].total)
            }, a.artists.artist && a.artists.artist[0]) {
                c.a = [];
                for (var b = 0; b < a.artists.artist.length; b++) c.a[b] = {
                    n: i(a.artists.artist[b]),
                    p: parseInt(a.artists.artist[b].playcount),
                    d: a.artists.artist[b].mbid
                }
            }
        } else if (a.weeklyartistchart && (c = {
            u: a.weeklyartistchart.user ? a.weeklyartistchart : a.weeklyartistchart["@attr"].user,
            t: 1
        }, a.weeklyartistchart.artist && a.weeklyartistchart.artist[0])) {
            c.a = [];
            for (b = 0; b < a.weeklyartistchart.artist.length; b++) c.a[b] = {
                n: i(a.weeklyartistchart.artist[b]),
                p: parseInt(a.weeklyartistchart.artist[b].playcount)
            }
        }
        return c
    };
    g.ConvertArtist = function (a) {
        var c;
        if (a && a.artist) {
            c = {};
            if (a.artist.bio && a.artist.bio.summary) c.b = a.artist.bio.summary;
            if (a.artist.image && a.artist.image[2] && a.artist.image[2]["#text"]) c.i = a.artist.image[2]["#text"];
            if (a.artist.stats) c.l = parseInt(a.artist.stats.listeners), c.p = parseInt(a.artist.stats.playcount);
            if (a.artist.similar && a.artist.similar.artist) {
                c.m = [];
                for (var b = 0; b < a.artist.similar.artist.length; b++) c.m[b] = a.artist.similar.artist[b].name
            }
            if (a.artist.tags && a.artist.tags.tag) {
                c.t = [];
                for (b = 0; b < a.artist.tags.tag.length; b++) c.t[b] = a.artist.tags.tag[b].name
            }
        }
        return c
    };
    g.ConvertArtistsMinMax = function (a, c, b) {
        var e = _.min(b, function (a) {
            return a.value
        }).value,
            d = _.max(b, function (a) {
                return a.value
            }).value;
        return _.each(b,

        function (b) {
            b.norm = Math.round((b.value - e) / d * (c - a) + a)
        })
    };
    g.GetGroupNodes = function (a, c) {
        var b, e = [];
        for (b = 0; b < a.length; b++) {
            var d = a[b];
            e[d.group] = e[d.group] || {
                playcount: 0,
                nodes: [],
                name: d.tag.toUpperCase() + (c[d.group].similar ? "\u2026" : ""),
                group: d.group
            };
            e[d.group].nodes.push(d);
            e[d.group].playcount += d.playcount;
            e[d.group].similar = c[d.group].similar
        }
        return e
    };
    g.TreeMap = function (a, c) {
        for (var b = {
            name: " ",
            children: []
        }, e = {}, d = 0; d < a.length; d++) {
            var f = a[d];
            e[f.tag] = e[f.tag] || {
                name: f.tag.toUpperCase(),
                children: []
            };
            e[f.tag].name = f.tag.toUpperCase();
            e[f.tag].children.push({
                name: f.name,
                size: f.playcount,
                $: f
            });
            e[f.tag].size = e[f.tag].size ? e[f.tag].size + f.playcount : f.playcount
        }
        for (var h in e) c || delete e[h].children, b.children.push(e[h]);
        return b
    };
    g.GetClasses = function (a) {
        function c(a, d) {
            d.children ? d.children.forEach(function (a) {
                c(d.name, a)
            }) : b.push({
                packageName: a,
                className: d.name,
                value: d.size,
                $: d
            })
        }
        var b = [];
        c(null, a);
        return {
            children: b
        }
    };
    g.NormalizeCircles = function (a, c, b) {
        c -= b * 2;
        var e = _.min(a, function (a) {
            return a.x - a.r
        }),
            e = e.x - e.r,
            d = _.max(a, function (a) {
                return a.x + a.r
            }),
            d = d.x + d.r,
            f = _.min(a, function (a) {
                return a.y - a.r
            }),
            f = f.y - f.r,
            h = _.max(a, function (a) {
                return a.y + a.r
            }),
            h = h.y + h.r;
        d -= e;
        h -= f;
        var g, i = 0,
            j = 0;
        d > h ? (g = c / d, j = (c - h * g) / 2) : (g = c / h, i = (c - d * g) / 2);
        _.each(a, function (a) {
            a.x = (a.x - e) * g + b + i;
            a.y = (a.y - f) * g + b + j;
            a.r *= g
        })
    }
})(LC.tools);
(function (c, g) {
    c.LastRequest = 0;
    c.DataWeekly = function (a) {
        function h(k, i, e) {
            var b = k.length - e - 1;
            if (e >= i || b < 0) a.progress({
                type: "weekly",
                status: 1,
                message: "Weeks loaded"
            }), m();
            else {
                a.progress({
                    type: "weekly",
                    status: e / i,
                    message: "Loading weeks\u2026 " + (e + 1) + "/" + i
                });
                var j = c.CacheKey + "z " + a.user.toLowerCase() + " " + k[b].t,
                    g = c.CacheGet(j);
                g ? (a.data.weekly.push(g), h(k, i, ++e)) : d.user.getWeeklyArtistChart({
                    user: a.user,
                    from: k[b].f,
                    to: k[b].t,
                    limit: p
                }, {
                    success: function (b) {
                        f == c.LastRequest && (b = _.map(b.weeklyartistchart.artist,

                        function (a) {
                            if (parseInt(a.playcount) > 0) return {
                                n: a.name,
                                p: parseInt(a.playcount)
                            }
                        }).filter(function (a) {
                            return a !== void 0
                        }), a.data.weekly.push(b), c.CacheSet(j, b), h(k, i, ++e))
                    },
                    error: function (c, b) {
                        a.problem = b;
                        a.finish(a)
                    }
                })
            }
        }
        function m() {
            var c = 0;
            _.each(a.data.weekly, function (b) {
                _.each(b, function (b) {
                    b && a.data.uni[b.n] === void 0 && (a.data.uni[b.n] = c++)
                })
            });
            _.each(a.data.uni, function (c, b) {
                a.data.map[c] = b
            });
            j(0)
        }
        function j(b) {
            var i = a.data.map;
            if (b >= i.length) a.progress({
                type: "weeklydetail",
                status: 1,
                message: "Artists loaded"
            }),
            l();
            else {
                var e = i[b];
                a.progress({
                    type: "weeklydetail",
                    status: (b + 1) / i.length,
                    message: "Loading artists\u2026 " + (b + 1) + "/" + i.length + " \u201c" + e + "\u201d"
                });
                a.data.info = a.data.info || {};
                var h = c.CacheKey + "i " + e;
                a.data.info[e] = c.CacheGet(h);
                a.data.info[e] ? (c.PreloadImage(a.data.info[e].i), j(b + 1)) : d.artist.getInfo({
                    artist: e,
                    user: a.user
                }, {
                    success: function (i) {
                        f == c.LastRequest && (a.data.info[e] = c.ConvertArtist(i), c.PreloadImage(a.data.info[e].i), c.CacheSet(h, a.data.info[e]), j(b + 1))
                    },
                    error: function (b, c) {
                        a.problem = c;
                        a.finish(a)
                    }
                })
            }
        }
        function l() {
            for (; a.data.weekly.length > 0 && a.data.weekly[a.data.weekly.length - 1].length == 0; ) a.data.weekly.pop();
            if (a.data.weekly.length == 0) a.problem = "No data available.", a.finish(a);
            else {
                for (var b = 0; b < a.data.map.length; b++) {
                    var c = [];
                    for (x = 0; x < a.data.weekly.length; x++) c.push({
                        x: x,
                        y: 0
                    });
                    a.data.series.push({
                        $: a.data.info[a.data.map[b]],
                        s: c,
                        n: a.data.map[b]
                    })
                }
                _.each(a.data.weekly, function (b, c) {
                    _.each(b, function (b) {
                        a.data.series[a.data.uni[b.n]].s[a.data.weekly.length - c - 1].y = b.p
                    })
                });
                a.callback(a)
            }
        }
        a.data = a.data || {};
        var f = ++c.LastRequest,
            d = new LastFM({
                apiKey: g.LastFmApiKey,
                apiSecret: g.LastFmApiSecret,
                cache: null
            }),
            b = a.weeks,
            p = 5;
        a.data = {
            weekly: [],
            series: [],
            info: {},
            map: [],
            uni: {}
        };
        a.progress({
            type: "artists",
            status: 0,
            message: "Loading weekly list\u2026"
        });
        var n = c.CacheKey + "y " + a.user.toLowerCase(),
            o = c.CacheGet(n);
        o ? h(o, b, 0) : d.user.getWeeklyChartList({
            user: a.user,
            limit: 52
        }, {
            success: function (d) {
                f == c.LastRequest && (a.progress({
                    type: "artists",
                    status: 1,
                    message: "Weekly list loaded"
                }), d = _.map(d.weeklychartlist.chart,

                function (a) {
                    return {
                        f: a.from,
                        t: a.to
                    }
                }), c.CacheSet(n, d), h(d, b, 0))
            },
            error: function (b, c) {
                a.problem = c;
                a.finish(a)
            }
        })
    };
    c.Data = function (a) {
        function h(f) {
            var d = a.data.user.a || [];
            if (f >= a.top || f >= d.length) a.progress({
                type: "info",
                status: 1,
                message: "Artists loaded"
            }), c.Analyse(a);
            else {
                var b = d[f];
                a.progress({
                    type: "info",
                    status: (f + 1) / a.top,
                    message: "Loading artists\u2026 " + (f + 1) + "/" + a.top + " \u201c" + b.n + "\u201d"
                });
                a.data.info = a.data.info || {};
                var g = c.CacheKey + "i " + b.n;
                a.data.info[b.n] = c.CacheGet(g);
                a.data.info[b.n] ? (c.PreloadImage(a.data.info[b.n].i), h(f + 1)) : (d = {
                    user: a.user
                }, b.d ? d.mbid = b.d : d.artist = b.n, l.artist.getInfo(d, {
                    success: function (d) {
                        j == c.LastRequest && (a.data.info[b.n] = c.ConvertArtist(d), c.PreloadImage(a.data.info[b.n].i), c.CacheSet(g, a.data.info[b.n]), h(f + 1))
                    },
                    error: function (d, g) {
                        d == 6 ? j == c.LastRequest && (a.data.info[b.n] = {}, h(f + 1)) : (a.problem = g, a.finish(a))
                    }
                }))
            }
        }
        function m() {
            function f() {
                a.progress({
                    type: "artists",
                    status: 1,
                    message: "User artists loaded\u2026"
                })
            }
            a.progress({
                type: "artists",
                status: 0,
                message: "Loading user artists\u2026"
            });
            var d;
            d = a.weekly ? c.CacheKey + "w " + a.user.toLowerCase() : c.CacheKey + "u " + a.user.toLowerCase();
            a.data.user = c.CacheGet(d);
            a.data.user ? (f(), h(0)) : a.weekly ? l.user.getWeeklyArtistChart({
                user: a.user,
                limit: g.MaxArtists
            }, {
                success: function (b) {
                    if (j == c.LastRequest) a.data.user = c.ConvertUser(b), a.data.user ? (c.CacheSet(d, a.data.user), f(), h(0)) : (a.problem = "No data available.", a.finish(a))
                },
                error: function (b, c) {
                    a.problem = c;
                    a.finish(a)
                }
            }) : l.library.getArtists({
                user: a.user,
                limit: g.MaxArtists
            }, {
                success: function (b) {
                    if (j == c.LastRequest) a.data.user = c.ConvertUser(b), a.data.user ? (c.CacheSet(d, a.data.user), f(), h(0)) : (a.problem = "No data available.", a.finish(a))
                },
                error: function (b, c) {
                    a.problem = c;
                    a.finish(a)
                }
            })
        }
        a.data = a.data || {};
        var j = ++c.LastRequest,
            l = new LastFM({
                apiKey: g.LastFmApiKey,
                apiSecret: g.LastFmApiSecret,
                cache: null
            });
        a.sampledata ? (a.data.user = a.sampledata.u, a.data.info = a.sampledata.i, a.progress({
            type: "info",
            status: 1,
            message: "Artists loaded"
        }), c.Analyse(a)) : m()
    }
})(LC.tools, LC.config);
(function (a) {
    a.Item = Backbone.Model.extend({
        destroy: function () {
            this.trigger("destroy")
        }
    })
})(LC.models);
(function (g, h, i, j) {
    g.PaginatedCollection = i.clientPager.extend({
        sync: function (b, a, c) {
            this.origModels = void 0;
            c.success(this.search(this.searchquery))
        },
        initialize: function (b, a) {
            this.datasource = a.datasource;
            this.whereto = a.whereto;
            this.whatkeys = a.whatkeys
        },
        model: h,
        datasource: null,
        whereto: null,
        whatkeys: null,
        search: function (b) {
            var a, c = [];
            if (!b || b == "") return this.datasource;
            else for (a = 0; a < this.datasource.length; a++) this.datasource[a].n && this.datasource[a].n.startsWithInvariant(b) ? c.push(this.datasource[a]) : this.datasource[a].u && this.datasource[a].u.startsWithInvariant(b) && c.push(this.datasource[a]);
            return c
        },
        remove: function (b, a) {
            var c, f, e, d;
            a || (a = {});
            b = _.isArray(b) ? b.slice() : [b];
            for (c = 0, f = b.length; c < f; c++) if (d = this.getByCid(b[c]) || this.get(b[c])) {
                delete this._byId[d.id];
                delete this._byCid[d.cid];
                e = this.indexOf(d);
                this.models.splice(e, 1);
                this.origModels && (e = _.indexOf(this.origModels, d), this.origModels.splice(e, 1));
                this.length--;
                if (!a.silent) a.index = e, d.trigger("remove", d, this, a);
                this._removeReference(d)
            }
            this.trigger("change");
            this.pager();
            return this
        },
        deleteAll: function () {
            _.each(this.whatkeys, function (b) {
                j.DeleteAllKeys(b)
            });
            this.origModels = [];
            this.datasource = [];
            this.reset();
            this.fetch({
                silent: !0
            });
            this.trigger("change");
            this.pager()
        },
        queryAttribute: "$filter",
        perPageAttribute: "$top",
        skipAttribute: "$skip",
        orderAttribute: "a",
        formatAttribute: "$format",
        customAttribute1: "$inlinecount",
        customAttribute2: "$callback",
        page: 1,
        perPage: 1E6,
        displayPerPage: 3,
        sortDirection: "asc",
        sortField: "a",
        query: "substringof('" + escape("america") + "',Name)",
        format: "json",
        customParam1: "allpages",
        customParam2: "callback"
    })
})(LC.collections, LC.models.Item, Backbone.Paginator, LC.tools, LC.global);


// D3
(function () {
    function Oc(a) {
        for (var b = -1, c = a.length, e = []; ++b < c; ) e.push(a[b]);
        return e
    }
    function N() { }
    function Pc() {
        return this
    }
    function Qc(a, b, c) {
        return function () {
            var e = c.apply(b, arguments);
            return arguments.length ? a : e
        }
    }
    function Ea(a) {
        return a != null && !isNaN(a)
    }
    function Rc(a) {
        return a.length
    }
    function Sc(a) {
        return a == null
    }
    function rb(a) {
        return a.replace(/(^\s+)|(\s+$)/g, "").replace(/\s+/g, " ")
    }
    function Fa() { }
    function sb(a) {
        function b() {
            for (var b = c, e = -1, h = b.length, i; ++e < h; ) (i = b[e].on) && i.apply(this, arguments);
            return a
        }
        var c = [],
            e = new N;
        b.on = function (b, g) {
            var f;
            var h = e.get(b),
                i;
            if (arguments.length < 2) return h && h.on;
            if (h) h.on = null, f = c.slice(0, i = c.indexOf(h)).concat(c.slice(i + 1)), c = f, e.remove(b);
            g && c.push(e.set(b, {
                on: g
            }));
            return a
        };
        return b
    }
    function tb(a, b) {
        return b - (a ? 1 + Math.floor(Math.log(a + Math.pow(10, 1 + Math.floor(Math.log(a) / Math.LN10) - b)) / Math.LN10) : 1)
    }
    function Tc(a) {
        return a + ""
    }
    function ub(a) {
        for (var b = a.lastIndexOf("."), c = b >= 0 ? a.substring(b) : (b = a.length, ""), e = []; b > 0; ) e.push(a.substring(b -= 3, b + 3));
        return e.reverse().join(",") + c
    }
    function Uc(a) {
        return function (b) {
            return b <= 0 ? 0 : b >= 1 ? 1 : a(b)
        }
    }
    function vb(a) {
        return function (b) {
            return 1 - a(1 - b)
        }
    }
    function wb(a) {
        return function (b) {
            return 0.5 * (b < 0.5 ? a(2 * b) : 2 - a(2 - 2 * b))
        }
    }
    function Ga(a) {
        return a
    }
    function Ha(a) {
        return function (b) {
            return Math.pow(b, a)
        }
    }
    function Vc(a) {
        return 1 - Math.cos(a * Math.PI / 2)
    }
    function Wc(a) {
        return Math.pow(2, 10 * (a - 1))
    }
    function Xc(a) {
        return 1 - Math.sqrt(1 - a * a)
    }
    function Yc(a) {
        return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
    }
    function G() {
        d3.event.stopPropagation();
        d3.event.preventDefault()
    }
    function xb() {
        for (var a = d3.event, b; b = a.sourceEvent; ) a = b;
        return a
    }
    function Ia(a) {
        for (var b = new Fa, c = 0, e = arguments.length; ++c < e; ) b[arguments[c]] = sb(b);
        b.of = function (c, e) {
            return function (h) {
                try {
                    var i = h.sourceEvent = d3.event;
                    h.target = a;
                    d3.event = h;
                    b[h.type].apply(c, e)
                } finally {
                    d3.event = i
                }
            }
        };
        return b
    }
    function Zc(a, b) {
        b = b - (a = +a) ? 1 / (b - a) : 0;
        return function (c) {
            return (c - a) * b
        }
    }
    function $c(a, b) {
        b = b - (a = +a) ? 1 / (b - a) : 0;
        return function (c) {
            return Math.max(0, Math.min(1, (c - a) * b))
        }
    }
    function L(a, b, c) {
        return new O(a, b, c)
    }
    function O(a, b, c) {
        this.r = a;
        this.g = b;
        this.b = c
    }
    function W(a) {
        return a < 16 ? "0" + Math.max(0, a).toString(16) : Math.min(255, a).toString(16)
    }
    function Ja(a, b, c) {
        var e = 0,
            f = 0,
            g = 0,
            h, i;
        if (h = /([a-z]+)\((.*)\)/i.exec(a)) switch (i = h[2].split(","), h[1]) {
            case "hsl":
                return c(parseFloat(i[0]), parseFloat(i[1]) / 100, parseFloat(i[2]) / 100);
            case "rgb":
                return b(Ka(i[0]), Ka(i[1]), Ka(i[2]))
        }
        if (c = ja.get(a)) return b(c.r,
        c.g, c.b);
        a != null && a.charAt(0) === "#" && (a.length === 4 ? (e = a.charAt(1), e += e, f = a.charAt(2), f += f, g = a.charAt(3), g += g) : a.length === 7 && (e = a.substring(1, 3), f = a.substring(3, 5), g = a.substring(5, 7)), e = parseInt(e, 16), f = parseInt(f, 16), g = parseInt(g, 16));
        return b(e, f, g)
    }
    function yb(a, b, c) {
        var e = Math.min(a /= 255, b /= 255, c /= 255),
            f = Math.max(a, b, c),
            g = f - e,
            h = (f + e) / 2;
        g ? (e = h < 0.5 ? g / (f + e) : g / (2 - f - e), a = a == f ? (b - c) / g + (b < c ? 6 : 0) : b == f ? (c - a) / g + 2 : (a - b) / g + 4, a *= 60) : e = a = 0;
        return X(a, e, h)
    }
    function Ka(a) {
        var b = parseFloat(a);
        return a.charAt(a.length - 1) === "%" ? Math.round(b * 2.55) : b
    }
    function X(a, b, c) {
        return new P(a, b, c)
    }
    function P(a, b, c) {
        this.h = a;
        this.s = b;
        this.l = c
    }
    function ka(a, b, c) {
        function e(a) {
            a > 360 ? a -= 360 : a < 0 && (a += 360);
            return a < 60 ? f + (g - f) * a / 60 : a < 180 ? g : a < 240 ? f + (g - f) * (240 - a) / 60 : f
        }
        var f, g;
        a %= 360;
        a < 0 && (a += 360);
        b = b < 0 ? 0 : b > 1 ? 1 : b;
        c = c < 0 ? 0 : c > 1 ? 1 : c;
        g = c <= 0.5 ? c * (1 + b) : c + b - c * b;
        f = 2 * c - g;
        return L(Math.round(e(a + 120) * 255), Math.round(e(a) * 255), Math.round(e(a - 120) * 255))
    }
    function J(a) {
        La(a, s);
        return a
    }
    function zb(a) {
        return function () {
            return la(a, this)
        }
    }
    function Ab(a) {
        return function () {
            return Bb(a,
            this)
        }
    }
    function Cb(a, b) {
        function c() {
            if (b = this.classList) return b.add(a);
            var b = this.className,
                c = b.baseVal != null,
                e = c ? b.baseVal : b;
            g.lastIndex = 0;
            if (!g.test(e)) e = rb(e + " " + a), c ? b.baseVal = e : this.className = e
        }
        function e() {
            if (b = this.classList) return b.remove(a);
            var b = this.className,
                c = b.baseVal != null,
                e = c ? b.baseVal : b,
                e = rb(e.replace(g, " "));
            c ? b.baseVal = e : this.className = e
        }
        function f() {
            (b.apply(this, arguments) ? c : e).call(this)
        }
        var g = RegExp("(^|\\s+)" + d3.requote(a) + "(\\s+|$)", "g");
        if (arguments.length < 2) {
            var h = this.node();
            if (i = h.classList) return i.contains(a);
            var i = h.className;
            g.lastIndex = 0;
            return g.test(i.baseVal != null ? i.baseVal : i)
        }
        return this.each(typeof b === "function" ? f : b ? c : e)
    }
    function ad(a) {
        return function () {
            return Db(this, a)
        }
    }
    function bd(a) {
        if (!arguments.length) a = d3.ascending;
        return function (b, c) {
            return a(b && b.__data__, c && c.__data__)
        }
    }
    function Eb(a) {
        La(a, Q);
        return a
    }
    function Ma(a, b, c) {
        La(a, D);
        var e = new N,
            f = d3.dispatch("start", "end"),
            g = ma;
        a.id = b;
        a.time = c;
        a.tween = function (b, c) {
            if (arguments.length < 2) return e.get(b);
            c == null ? e.remove(b) : e.set(b, c);
            return a
        };
        a.ease = function (b) {
            if (!arguments.length) return g;
            g = typeof b === "function" ? b : d3.ease.apply(d3, arguments);
            return a
        };
        a.each = function (b, c) {
            if (arguments.length < 2) return cd.call(a, b);
            f.on(b, c);
            return a
        };
        d3.timer(function (h) {
            a.each(function (i, j, k) {
                function l(a) {
                    if (y.active > b) return o();
                    y.active = b;
                    e.forEach(function (a, b) {
                        (tween = b.call(q, i, j)) && n.push(tween)
                    });
                    f.start.call(q, i, j);
                    m(a) || d3.timer(m, 0, c);
                    return 1
                }
                function m(a) {
                    if (y.active !== b) return o();
                    for (var a = (a - p) / r, c = g(a), e = n.length; e > 0; ) n[--e].call(q, c);
                    if (a >= 1) return o(), R = b, f.end.call(q, i, j), R = 0, 1
                }
                function o() {
                    --y.count || delete q.__transition__;
                    return 1
                }
                var n = [],
                    q = this,
                    p = a[k][j].delay,
                    r = a[k][j].duration,
                    y = q.__transition__ || (q.__transition__ = {
                        active: 0,
                        count: 0
                    });
                ++y.count;
                p <= h ? l(h) : d3.timer(l, p, c)
            });
            return 1
        }, 0, c);
        return a
    }
    function dd(a, b, c) {
        return c != "" && $
    }
    function Fb(a, b) {
        function c(a, c, e) {
            a = b.call(this, a, c);
            return a == null ? e != "" && $ : e != a && f(e, a)
        }
        function e(a, c, e) {
            return e != b && f(e, b)
        }
        var f = a == "transform" ? d3.interpolateTransform : d3.interpolate;
        return typeof b === "function" ? c : b == null ? dd : (b += "", e)
    }
    function cd(a) {
        var b = R,
            c = ma,
            e = na,
            f = oa;
        R = this.id;
        ma = this.ease();
        for (var g = 0, h = this.length; g < h; g++) for (var i = this[g], j = 0, k = i.length; j < k; j++) {
            var l = i[j];
            if (l) na = this[g][j].delay, oa = this[g][j].duration, a.call(l = l.node, l.__data__, j, g)
        }
        R = b;
        ma = c;
        na = e;
        oa = f;
        return this
    }
    function Na() {
        for (var a, b = Date.now(), c = S; c; ) {
            a = b - c.then;
            if (a >= c.delay) c.flush = c.callback(a);
            c = c.next
        }
        a = Gb() - b;
        a > 24 ? (isFinite(a) && (clearTimeout(pa), pa = setTimeout(Na, a)), qa = 0) : (qa = 1, Hb(Na))
    }
    function Gb() {
        var e;
        for (var a = null, b = S, c = Infinity; b; ) b.flush ? (e = a ? a.next = b.next : S = b.next, b = e) : (c = Math.min(c, b.then + b.delay), b = (a = b).next);
        return c
    }
    function Ib(a) {
        var b = [a.a, a.b],
            c = [a.c, a.d],
            e = Jb(b),
            f = b[0] * c[0] + b[1] * c[1],
            g = -f;
        c[0] += g * b[0];
        c[1] += g * b[1];
        g = Jb(c) || 0;
        b[0] * c[1] < c[0] * b[1] && (b[0] *= -1, b[1] *= -1, e *= -1, f *= -1);
        this.rotate = (e ? Math.atan2(b[1], b[0]) : Math.atan2(-c[0], c[1])) * Kb;
        this.translate = [a.e, a.f];
        this.scale = [e, g];
        this.skew = g ? Math.atan2(f, g) * Kb : 0
    }
    function Jb(a) {
        var b = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
        b && (a[0] /= b, a[1] /= b);
        return b
    }
    function Lb(a, b) {
        var c = a.ownerSVGElement || a;
        if (c.createSVGPoint) {
            var e = c.createSVGPoint();
            if (Oa < 0 && (window.scrollX || window.scrollY)) {
                var c = d3.select(document.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0),
                    f = c[0][0].getScreenCTM();
                Oa = !(f.f || f.e);
                c.remove()
            }
            Oa ? (e.x = b.pageX, e.y = b.pageY) : (e.x = b.clientX, e.y = b.clientY);
            e = e.matrixTransform(a.getScreenCTM().inverse());
            return [e.x, e.y]
        }
        c = a.getBoundingClientRect();
        return [b.clientX - c.left - a.clientLeft, b.clientY - c.top - a.clientTop]
    }
    function aa(a) {
        var b = a[0],
            a = a[a.length - 1];
        return b < a ? [b, a] : [a, b]
    }
    function ra(a) {
        return a.rangeExtent ? a.rangeExtent() : aa(a.range())
    }
    function Pa(a, b) {
        var c = 0,
            e = a.length - 1,
            f = a[c],
            g = a[e],
            h;
        g < f && (h = c, c = e, e = h, h = f, f = g, g = h);
        if (h = g - f) b = b(h), a[c] = b.floor(f), a[e] = b.ceil(g);
        return a
    }
    function ed() {
        return Math
    }
    function Mb(a, b, c, e) {
        function f() {
            var f = Math.min(a.length, b.length) > 2 ? fd : gd,
                k = e ? $c : Zc;
            h = f(a, b, k, c);
            i = f(b, a, k, d3.interpolate);
            return g
        }
        function g(a) {
            return h(a)
        }
        var h, i;
        g.invert = function (a) {
            return i(a)
        };
        g.domain = function (b) {
            if (!arguments.length) return a;
            a = b.map(Number);
            return f()
        };
        g.range = function (a) {
            if (!arguments.length) return b;
            b = a;
            return f()
        };
        g.rangeRound = function (a) {
            return g.range(a).interpolate(d3.interpolateRound)
        };
        g.clamp = function (a) {
            if (!arguments.length) return e;
            e = a;
            return f()
        };
        g.interpolate = function (a) {
            if (!arguments.length) return c;
            c = a;
            return f()
        };
        g.ticks = function (b) {
            return Qa(a, b)
        };
        g.tickFormat = function (b) {
            return Ra(a, b)
        };
        g.nice = function () {
            Pa(a,
            Nb);
            return f()
        };
        g.copy = function () {
            return Mb(a, b, c, e)
        };
        return f()
    }
    function Ob(a, b) {
        return d3.rebind(a, b, "range", "rangeRound", "interpolate", "clamp")
    }
    function Nb(a) {
        a = Math.pow(10, Math.round(Math.log(a) / Math.LN10) - 1);
        return {
            floor: function (b) {
                return Math.floor(b / a) * a
            },
            ceil: function (b) {
                return Math.ceil(b / a) * a
            }
        }
    }
    function Pb(a, b) {
        var c = aa(a),
            e = c[1] - c[0],
            f = Math.pow(10, Math.floor(Math.log(e / b) / Math.LN10)),
            e = b / e * f;
        e <= 0.15 ? f *= 10 : e <= 0.35 ? f *= 5 : e <= 0.75 && (f *= 2);
        c[0] = Math.ceil(c[0] / f) * f;
        c[1] = Math.floor(c[1] / f) * f + f * 0.5;
        c[2] = f;
        return c
    }
    function Qa(a, b) {
        return d3.range.apply(d3, Pb(a, b))
    }
    function Ra(a, b) {
        return d3.format(",." + Math.max(0, -Math.floor(Math.log(Pb(a, b)[2]) / Math.LN10 + 0.01)) + "f")
    }
    function gd(a, b, c, e) {
        var f = c(a[0], a[1]),
            g = e(b[0], b[1]);
        return function (a) {
            return g(f(a))
        }
    }
    function fd(a, b, c, e) {
        var f = [],
            g = [],
            h = 0,
            i = Math.min(a.length, b.length) - 1;
        a[i] < a[0] && (a = a.slice().reverse(), b = b.slice().reverse());
        for (; ++h <= i; ) f.push(c(a[h - 1], a[h])), g.push(e(b[h - 1], b[h]));
        return function (b) {
            var c = d3.bisect(a, b, 1, i) - 1;
            return g[c](f[c](b))
        }
    }
    function Qb(a, b) {
        function c(c) {
            return a(b(c))
        }
        var e = b.pow;
        c.invert = function (b) {
            return e(a.invert(b))
        };
        c.domain = function (f) {
            if (!arguments.length) return a.domain().map(e);
            b = f[0] < 0 ? sa : Sa;
            e = b.pow;
            a.domain(f.map(b));
            return c
        };
        c.nice = function () {
            a.domain(Pa(a.domain(), ed));
            return c
        };
        c.ticks = function () {
            var c = aa(a.domain()),
                g = [];
            if (c.every(isFinite)) {
                var h = Math.floor(c[0]),
                    i = Math.ceil(c[1]),
                    j = e(c[0]),
                    c = e(c[1]);
                if (b === sa) for (g.push(e(h)); h++ < i; ) for (var k = 9; k > 0; k--) g.push(e(h) * k);
                else {
                    for (; h < i; h++) for (k = 1; k < 10; k++) g.push(e(h) * k);
                    g.push(e(h))
                }
                for (h = 0; g[h] < j; h++);
                for (i = g.length; g[i - 1] > c; i--);
                g = g.slice(h, i)
            }
            return g
        };
        c.tickFormat = function (a, g) {
            arguments.length < 2 && (g = hd);
            if (arguments.length < 1) return g;
            var h = a / c.ticks().length,
                i = b === sa ? (j = -1.0E-12, Math.floor) : (j = 1.0E-12, Math.ceil),
                j;
            return function (a) {
                return a / e(i(b(a) + j)) < h ? g(a) : ""
            }
        };
        c.copy = function () {
            return Qb(a.copy(), b)
        };
        return Ob(c, a)
    }
    function Sa(a) {
        return Math.log(a < 0 ? 0 : a) / Math.LN10
    }
    function sa(a) {
        return -Math.log(a > 0 ? 0 : -a) / Math.LN10
    }

    function Rb(a, b) {
        function c(b) {
            return a(e(b))
        }
        var e = ta(b),
            f = ta(1 / b);
        c.invert = function (b) {
            return f(a.invert(b))
        };
        c.domain = function (b) {
            if (!arguments.length) return a.domain().map(f);
            a.domain(b.map(e));
            return c
        };
        c.ticks = function (a) {
            return Qa(c.domain(), a)
        };
        c.tickFormat = function (a) {
            return Ra(c.domain(), a)
        };
        c.nice = function () {
            return c.domain(Pa(c.domain(), Nb))
        };
        c.exponent = function (a) {
            if (!arguments.length) return b;
            var h = c.domain();
            e = ta(b = a);
            f = ta(1 / b);
            return c.domain(h)
        };
        c.copy = function () {
            return Rb(a.copy(),
            b)
        };
        return Ob(c, a)
    }
    function ta(a) {
        return function (b) {
            return b < 0 ? -Math.pow(-b, a) : Math.pow(b, a)
        }
    }
    function Sb(a, b) {
        function c(b) {
            return g[((f.get(b) || f.set(b, a.push(b))) - 1) % g.length]
        }
        function e(b, c) {
            return d3.range(a.length).map(function (a) {
                return b + c * a
            })
        }
        var f, g, h;
        c.domain = function (e) {
            if (!arguments.length) return a;
            a = [];
            f = new N;
            for (var g = -1, h = e.length, l; ++g < h; ) f.has(l = e[g]) || f.set(l, a.push(l));
            return c[b.t](b.x, b.p)
        };
        c.range = function (a) {
            if (!arguments.length) return g;
            g = a;
            h = 0;
            b = {
                t: "range",
                x: a
            };
            return c
        };
        c.rangePoints = function (f, j) {
            arguments.length < 2 && (j = 0);
            var k = f[0],
                l = f[1],
                m = (l - k) / (a.length - 1 + j);
            g = e(a.length < 2 ? (k + l) / 2 : k + m * j / 2, m);
            h = 0;
            b = {
                t: "rangePoints",
                x: f,
                p: j
            };
            return c
        };
        c.rangeBands = function (f, j) {
            arguments.length < 2 && (j = 0);
            var k = f[1] < f[0],
                l = f[k - 0],
                m = (f[1 - k] - l) / (a.length + j);
            g = e(l + m * j, m);
            k && g.reverse();
            h = m * (1 - j);
            b = {
                t: "rangeBands",
                x: f,
                p: j
            };
            return c
        };
        c.rangeRoundBands = function (f, j) {
            arguments.length < 2 && (j = 0);
            var k = f[1] < f[0],
                l = f[k - 0],
                m = f[1 - k],
                o = Math.floor((m - l) / (a.length + j));
            g = e(l + Math.round((m - l - (a.length - j) * o) / 2), o);
            k && g.reverse();
            h = Math.round(o * (1 - j));
            b = {
                t: "rangeRoundBands",
                x: f,
                p: j
            };
            return c
        };
        c.rangeBand = function () {
            return h
        };
        c.rangeExtent = function () {
            return aa(b.x)
        };
        c.copy = function () {
            return Sb(a, b)
        };
        return c.domain(a)
    }
    function Tb(a, b) {
        function c() {
            var c = 0,
                h = b.length;
            for (f = []; ++c < h; ) f[c - 1] = d3.quantile(a, c / h);
            return e
        }
        function e(a) {
            return isNaN(a = +a) ? NaN : b[d3.bisect(f, a)]
        }
        var f;
        e.domain = function (b) {
            if (!arguments.length) return a;
            a = b.filter(function (a) {
                return !isNaN(a)
            }).sort(d3.ascending);
            return c()
        };
        e.range = function (a) {
            if (!arguments.length) return b;
            b = a;
            return c()
        };
        e.quantiles = function () {
            return f
        };
        e.copy = function () {
            return Tb(a, b)
        };
        return c()
    }
    function Ub(a, b, c) {
        function e(b) {
            return c[Math.max(0, Math.min(h, Math.floor(g * (b - a))))]
        }
        function f() {
            g = c.length / (b - a);
            h = c.length - 1;
            return e
        }
        var g, h;
        e.domain = function (c) {
            if (!arguments.length) return [a, b];
            a = +c[0];
            b = +c[c.length - 1];
            return f()
        };
        e.range = function (a) {
            if (!arguments.length) return c;
            c = a;
            return f()
        };
        e.copy = function () {
            return Ub(a, b, c)
        };
        return f()
    }
    function Vb(a) {
        function b(a) {
            return +a
        }
        b.invert = b;
        b.domain = b.range = function (c) {
            if (!arguments.length) return a;
            a = c.map(b);
            return b
        };
        b.ticks = function (b) {
            return Qa(a, b)
        };
        b.tickFormat = function (b) {
            return Ra(a, b)
        };
        b.copy = function () {
            return Vb(a)
        };
        return b
    }
    function id(a) {
        return a.innerRadius
    }
    function jd(a) {
        return a.outerRadius
    }
    function Wb(a) {
        return a.startAngle
    }
    function Xb(a) {
        return a.endAngle
    }
    function Yb(a) {
        function b(b) {
            return b.length < 1 ? null : "M" + g(a(Ta(this, b, c, e)), h)
        }
        var c = Ua,
            e = Zb,
            f = Va,
            g = ba.get(f),
            h = 0.7;
        b.x = function (a) {
            if (!arguments.length) return c;
            c = a;
            return b
        };
        b.y = function (a) {
            if (!arguments.length) return e;
            e = a;
            return b
        };
        b.interpolate = function (a) {
            if (!arguments.length) return f;
            if (!ba.has(a += "")) a = Va;
            g = ba.get(f = a);
            return b
        };
        b.tension = function (a) {
            if (!arguments.length) return h;
            h = a;
            return b
        };
        return b
    }
    function Ta(a, b, c, e) {
        var f = [],
            g = -1,
            h = b.length,
            i = typeof c === "function",
            j = typeof e === "function",
            k;
        if (i && j) for (; ++g < h; ) f.push([c.call(a, k = b[g], g), e.call(a, k, g)]);
        else if (i) for (; ++g < h; ) f.push([c.call(a, b[g], g), e]);
        else if (j) for (; ++g < h; ) f.push([c, e.call(a,
        b[g], g)]);
        else for (; ++g < h; ) f.push([c, e]);
        return f
    }
    function Ua(a) {
        return a[0]
    }
    function Zb(a) {
        return a[1]
    }
    function M(a) {
        for (var b = 0, c = a.length, e = a[0], f = [e[0], ",", e[1]]; ++b < c; ) f.push("L", (e = a[b])[0], ",", e[1]);
        return f.join("")
    }
    function Wa(a) {
        for (var b = 0, c = a.length, e = a[0], f = [e[0], ",", e[1]]; ++b < c; ) f.push("V", (e = a[b])[1], "H", e[0]);
        return f.join("")
    }
    function Xa(a) {
        for (var b = 0, c = a.length, e = a[0], f = [e[0], ",", e[1]]; ++b < c; ) f.push("H", (e = a[b])[0], "V", e[1]);
        return f.join("")
    }
    function ua(a, b) {
        if (b.length < 1 || a.length != b.length && a.length != b.length + 2) return M(a);
        var c = a.length != b.length,
            e = "",
            f = a[0],
            g = a[1],
            h = b[0],
            i = h,
            j = 1;
        c && (e += "Q" + (g[0] - h[0] * 2 / 3) + "," + (g[1] - h[1] * 2 / 3) + "," + g[0] + "," + g[1], f = a[1], j = 2);
        if (b.length > 1) {
            i = b[1];
            g = a[j];
            j++;
            e += "C" + (f[0] + h[0]) + "," + (f[1] + h[1]) + "," + (g[0] - i[0]) + "," + (g[1] - i[1]) + "," + g[0] + "," + g[1];
            for (f = 2; f < b.length; f++, j++) g = a[j], i = b[f], e += "S" + (g[0] - i[0]) + "," + (g[1] - i[1]) + "," + g[0] + "," + g[1]
        }
        c && (c = a[j], e += "Q" + (g[0] + i[0] * 2 / 3) + "," + (g[1] + i[1] * 2 / 3) + "," + c[0] + "," + c[1]);
        return e
    }
    function Ya(a, b) {
        for (var c = [],
        e = (1 - b) / 2, f, g = a[0], h = a[1], i = 1, j = a.length; ++i < j; ) f = g, g = h, h = a[i], c.push([e * (h[0] - f[0]), e * (h[1] - f[1])]);
        return c
    }
    function $b(a) {
        if (a.length < 3) return M(a);
        var b = 1,
            c = a.length,
            e = a[0],
            f = e[0],
            g = e[1],
            h = [f, f, f, (e = a[1])[0]],
            i = [g, g, g, e[1]],
            f = [f, ",", g];
        for (ca(f, h, i); ++b < c; ) e = a[b], h.shift(), h.push(e[0]), i.shift(), i.push(e[1]), ca(f, h, i);
        for (b = -1; ++b < 2; ) h.shift(), h.push(e[0]), i.shift(), i.push(e[1]), ca(f, h, i);
        return f.join("")
    }
    function H(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
    }
    function ca(a, b, c) {
        a.push("C",
        H(ac, b), ",", H(ac, c), ",", H(bc, b), ",", H(bc, c), ",", H(Y, b), ",", H(Y, c))
    }
    function Za(a, b) {
        return (b[1] - a[1]) / (b[0] - a[0])
    }
    function cc(a) {
        for (var b, c = -1, e = a.length, f, g; ++c < e; ) b = a[c], f = b[0], g = b[1] + T, b[0] = f * Math.cos(g), b[1] = f * Math.sin(g);
        return a
    }
    function dc(a) {
        function b(b) {
            if (b.length < 1) return null;
            var h = Ta(this, b, c, f),
                b = Ta(this, b, c === e ? kd(h) : e, f === g ? ld(h) : g);
            return "M" + i(a(b), k) + "L" + j(a(h.reverse()), k) + "Z"
        }
        var c = Ua,
            e = Ua,
            f = 0,
            g = Zb,
            h, i, j, k = 0.7;
        b.x = function (a) {
            if (!arguments.length) return e;
            c = e = a;
            return b
        };
        b.x0 = function (a) {
            if (!arguments.length) return c;
            c = a;
            return b
        };
        b.x1 = function (a) {
            if (!arguments.length) return e;
            e = a;
            return b
        };
        b.y = function (a) {
            if (!arguments.length) return g;
            f = g = a;
            return b
        };
        b.y0 = function (a) {
            if (!arguments.length) return f;
            f = a;
            return b
        };
        b.y1 = function (a) {
            if (!arguments.length) return g;
            g = a;
            return b
        };
        b.interpolate = function (a) {
            if (!arguments.length) return h;
            if (!ba.has(a += "")) a = Va;
            i = ba.get(h = a);
            j = i.reverse || i;
            return b
        };
        b.tension = function (a) {
            if (!arguments.length) return k;
            k = a;
            return b
        };
        return b.interpolate("linear")
    }

    function kd(a) {
        return function (b, c) {
            return a[c][0]
        }
    }
    function ld(a) {
        return function (b, c) {
            return a[c][1]
        }
    }
    function ec(a) {
        return a.source
    }
    function fc(a) {
        return a.target
    }
    function md(a) {
        return a.radius
    }
    function gc(a) {
        return [a.x, a.y]
    }
    function nd(a) {
        return function () {
            var b = a.apply(this, arguments),
                c = b[0],
                b = b[1] + T;
            return [c * Math.cos(b), c * Math.sin(b)]
        }
    }
    function od() {
        return 64
    }
    function pd() {
        return "circle"
    }
    function hc(a) {
        a = Math.sqrt(a / Math.PI);
        return "M0," + a + "A" + a + "," + a + " 0 1,1 0," + -a + "A" + a + "," + a + " 0 1,1 0," + a +
            "Z"
    }
    function ic(a, b) {
        a.attr("transform", function (a) {
            return "translate(" + b(a) + ",0)"
        })
    }
    function jc(a, b) {
        a.attr("transform", function (a) {
            return "translate(0," + b(a) + ")"
        })
    }
    function qd(a, b, c) {
        e = [];
        if (c && b.length > 1) {
            for (var a = aa(a.domain()), e, f = -1, g = b.length, h = (b[1] - b[0]) / ++c, i, j; ++f < g; ) for (i = c; --i > 0; ) (j = +b[f] - i * h) >= a[0] && e.push(j);
            for (--f, i = 0; ++i < c && (j = +b[f] + i * h) < a[1]; ) e.push(j)
        }
        return e
    }
    function rd() {
        if (!da) da = d3.select("body").append("div").style("visibility", "hidden").style("top", 0).style("height", 0).style("width",
        0).style("overflow-y", "scroll").append("div").style("height", "2000px").node().parentNode;
        var a = d3.event,
            b;
        try {
            da.scrollTop = 1E3, da.dispatchEvent(a), b = 1E3 - da.scrollTop
        } catch (c) {
            b = a.wheelDelta || -a.detail * 5
        }
        return b
    }
    function sd(a) {
        var b = a.source,
            a = a.target,
            c;
        var e = a;
        if (b === e) c = b;
        else {
            c = kc(b);
            for (var e = kc(e), f = c.pop(), g = e.pop(), h = null; f === g; ) h = f, f = c.pop(), g = e.pop();
            c = h
        }
        for (e = [b]; b !== c; ) b = b.parent, e.push(b);
        for (b = e.length; a !== c; ) e.splice(b, 0, a), a = a.parent;
        return e
    }
    function kc(a) {
        for (var b = [], c = a.parent; c != null; ) b.push(a), a = c, c = c.parent;
        b.push(a);
        return b
    }
    function lc(a) {
        a.fixed |= 2
    }
    function td(a) {
        a !== Z && (a.fixed &= 1)
    }
    function ud() {
        Z.fixed &= 1;
        $a = Z = null
    }
    function vd() {
        Z.px = d3.event.x;
        Z.py = d3.event.y;
        $a.resume()
    }
    function mc(a, b, c) {
        var e = 0,
            f = 0;
        a.charge = 0;
        if (!a.leaf) for (var g = a.nodes, h = g.length, i = -1, j; ++i < h; ) j = g[i], j != null && (mc(j, b, c), a.charge += j.charge, e += j.charge * j.cx, f += j.charge * j.cy);
        if (a.point) a.leaf || (a.point.x += Math.random() - 0.5, a.point.y += Math.random() - 0.5), b *= c[a.point.index], a.charge += a.pointCharge = b, e += b * a.point.x, f += b * a.point.y;
        a.cx = e / a.charge;
        a.cy = f / a.charge
    }
    function wd() {
        return 20
    }
    function xd() {
        return 1
    }
    function yd(a) {
        return a.x
    }
    function zd(a) {
        return a.y
    }
    function Ad(a, b, c) {
        a.y0 = b;
        a.y = c
    }
    function ab(a) {
        return d3.range(a.length)
    }
    function bb(a) {
        for (var b = -1, a = a[0].length, c = []; ++b < a; ) c[b] = 0;
        return c
    }
    function Bd(a) {
        for (var b = 1, c = 0, e = a[0][1], f, g = a.length; b < g; ++b) if ((f = a[b][1]) > e) c = b, e = f;
        return c
    }
    function Cd(a) {
        return a.reduce(Dd, 0)
    }
    function Dd(a, b) {
        return a + b[1]
    }
    function Ed(a, b) {
        return nc(a, Math.ceil(Math.log(b.length) / Math.LN2 + 1))
    }
    function nc(a, b) {
        for (var c = -1, e = +a[0], f = (a[1] - e) / b, g = []; ++c <= b; ) g[c] = f * c + e;
        return g
    }
    function Fd(a) {
        return [d3.min(a), d3.max(a)]
    }
    function ea(a, b) {
        d3.rebind(a, b, "sort", "children", "value");
        a.links = Gd;
        a.nodes = function (b) {
            cb = !0;
            return (a.nodes = a)(b)
        };
        return a
    }
    function Hd(a) {
        return a.children
    }
    function Id(a) {
        return a.value
    }
    function Jd(a, b) {
        return b.value - a.value
    }
    function Gd(a) {
        return d3.merge(a.map(function (a) {
            return (a.children || []).map(function (c) {
                return {
                    source: a,
                    target: c
                }
            })
        }))
    }
    function Kd(a,
    b) {
        return a.value - b.value
    }
    function db(a, b) {
        var c = a._pack_next;
        a._pack_next = b;
        b._pack_prev = a;
        b._pack_next = c;
        c._pack_prev = b
    }
    function oc(a, b) {
        a._pack_next = b;
        b._pack_prev = a
    }
    function pc(a, b) {
        var c = b.x - a.x,
            e = b.y - a.y,
            f = a.r + b.r;
        return f * f - c * c - e * e > 0.001
    }
    function Ld(a) {
        function b(a) {
            c = Math.min(a.x - a.r, c);
            e = Math.max(a.x + a.r, e);
            f = Math.min(a.y - a.r, f);
            g = Math.max(a.y + a.r, g)
        }
        var c = Infinity,
            e = -Infinity,
            f = Infinity,
            g = -Infinity,
            h = a.length,
            i, j, k, l, m;
        a.forEach(Md);
        i = a[0];
        i.x = -i.r;
        i.y = 0;
        b(i);
        if (h > 1 && (j = a[1], j.x = j.r, j.y = 0, b(j), h > 2)) {
            k = a[2];
            qc(i, j, k);
            b(k);
            db(i, k);
            i._pack_prev = k;
            db(k, j);
            j = i._pack_next;
            for (var o = 3; o < h; o++) {
                qc(i, j, k = a[o]);
                var n = 0,
                    q = 1,
                    p = 1;
                for (l = j._pack_next; l !== j; l = l._pack_next, q++) if (pc(l, k)) {
                    n = 1;
                    break
                }
                if (n == 1) for (m = i._pack_prev; m !== l._pack_prev; m = m._pack_prev, p++) if (pc(m, k)) break;
                n ? (q < p || q == p && j.r < i.r ? oc(i, j = l) : oc(i = m, j), o--) : (db(i, k), j = k, b(k))
            }
        }
        i = (c + e) / 2;
        j = (f + g) / 2;
        for (o = k = 0; o < h; o++) l = a[o], l.x -= i, l.y -= j, k = Math.max(k, l.r + Math.sqrt(l.x * l.x + l.y * l.y));
        a.forEach(Nd);
        return k
    }
    function Md(a) {
        a._pack_next = a._pack_prev = a
    }
    function Nd(a) {
        delete a._pack_next;
        delete a._pack_prev
    }
    function rc(a) {
        var b = a.children;
        b && b.length ? (b.forEach(rc), a.r = Ld(b)) : a.r = Math.sqrt(a.value)
    }
    function sc(a, b, c, e) {
        var f = a.children;
        a.x = b += e * a.x;
        a.y = c += e * a.y;
        a.r *= e;
        if (f) for (var a = -1, g = f.length; ++a < g; ) sc(f[a], b, c, e)
    }
    function qc(a, b, c) {
        var e = a.r + c.r,
            f = b.x - a.x,
            g = b.y - a.y;
        if (e && (f || g)) {
            var h = b.r + c.r,
                b = Math.sqrt(f * f + g * g),
                i = Math.max(-1, Math.min(1, (e * e + b * b - h * h) / (2 * e * b))),
                h = Math.acos(i),
                b = i * (e /= b);
            e *= Math.sin(h);
            c.x = a.x + b * f + e * g;
            c.y = a.y + b * g - e * f
        } else c.x = a.x + e, c.y = a.y
    }
    function Od(a) {
        return 1 + d3.max(a, function (a) {
            return a.y
        })
    }
    function Pd(a) {
        return a.reduce(function (a, c) {
            return a + c.x
        }, 0) / a.length
    }
    function tc(a) {
        var b = a.children;
        return b && b.length ? tc(b[0]) : a
    }
    function uc(a) {
        var b = a.children,
            c;
        return b && (c = b.length) ? uc(b[c - 1]) : a
    }
    function vc(a, b) {
        return a.parent == b.parent ? 1 : 2
    }
    function eb(a) {
        var b = a.children;
        return b && b.length ? b[0] : a._tree.thread
    }
    function fb(a) {
        var b = a.children,
            c;
        return b && (c = b.length) ? b[c - 1] : a._tree.thread
    }
    function va(a,
    b) {
        var c = a.children;
        if (c && (f = c.length)) for (var e, f, g = -1; ++g < f; ) if (b(e = va(c[g], b), a) > 0) a = e;
        return a
    }
    function Qd(a, b) {
        return a.x - b.x
    }
    function Rd(a, b) {
        return b.x - a.x
    }
    function Sd(a, b) {
        return a.depth - b.depth
    }
    function wa(a, b) {
        function c(a, f) {
            var g = a.children;
            if (g && (k = g.length)) for (var h, i = null, j = -1, k; ++j < k; ) h = g[j], c(h, i), i = h;
            b(a, f)
        }
        c(a, null)
    }
    function gb(a) {
        return {
            x: a.x,
            y: a.y,
            dx: a.dx,
            dy: a.dy
        }
    }
    function wc(a, b) {
        var c = a.x + b[3],
            e = a.y + b[0],
            f = a.dx - b[1] - b[3],
            g = a.dy - b[0] - b[2];
        f < 0 && (c += f / 2, f = 0);
        g < 0 && (e += g / 2, g = 0);
        return {
            x: c,
            y: e,
            dx: f,
            dy: g
        }
    }
    function Td(a, b, c, e) {
        var f, g, h, a = e[a];
        f = a[0];
        g = a[1];
        a = e[b];
        b = a[0];
        h = a[1];
        a = e[c];
        return (a[1] - g) * (b - f) - (h - g) * (a[0] - f) > 0
    }
    function hb(a, b, c) {
        return (c[0] - b[0]) * (a[1] - b[1]) < (c[1] - b[1]) * (a[0] - b[0])
    }
    function xc(a, b, c, e) {
        var f = a[0],
            g = c[0],
            a = a[1],
            h = c[1],
            c = b[0] - f,
            i = e[0] - g,
            b = b[1] - a,
            e = e[1] - h,
            g = (i * (a - h) - e * (f - g)) / (e * c - i * b);
        return [f + g * c, a + g * b]
    }
    function yc(a, b) {
        var c = a.map(function (a, b) {
            return {
                index: b,
                x: a[0],
                y: a[1]
            }
        }).sort(function (a, b) {
            return a.y < b.y ? -1 : a.y > b.y ? 1 : a.x < b.x ? -1 : a.x > b.x ? 1 : 0
        }),
            e = null,
            f = {
                list: [],
                leftEnd: null,
                rightEnd: null,
                init: function () {
                    f.leftEnd = f.createHalfEdge(null, "l");
                    f.rightEnd = f.createHalfEdge(null, "l");
                    f.leftEnd.r = f.rightEnd;
                    f.rightEnd.l = f.leftEnd;
                    f.list.unshift(f.leftEnd, f.rightEnd)
                },
                createHalfEdge: function (a, b) {
                    return {
                        edge: a,
                        side: b,
                        vertex: null,
                        l: null,
                        r: null
                    }
                },
                insert: function (a, b) {
                    b.l = a;
                    b.r = a.r;
                    a.r.l = b;
                    a.r = b
                },
                leftBound: function (a) {
                    var b = f.leftEnd;
                    do b = b.r;
                    while (b != f.rightEnd && g.rightOf(b, a));
                    return b = b.l
                },
                del: function (a) {
                    a.l.r = a.r;
                    a.r.l = a.l;
                    a.edge = null
                },
                right: function (a) {
                    return a.r
                },
                left: function (a) {
                    return a.l
                },
                leftRegion: function (a) {
                    return a.edge == null ? e : a.edge.region[a.side]
                },
                rightRegion: function (a) {
                    return a.edge == null ? e : a.edge.region[ib[a.side]]
                }
            }, g = {
                bisect: function (a, b) {
                    var c = {
                        region: {
                            l: a,
                            r: b
                        },
                        ep: {
                            l: null,
                            r: null
                        }
                    }, e = b.x - a.x,
                        f = b.y - a.y;
                    c.c = a.x * e + a.y * f + (e * e + f * f) * 0.5;
                    (e > 0 ? e : -e) > (f > 0 ? f : -f) ? (c.a = 1, c.b = f / e, c.c /= e) : (c.b = 1, c.a = e / f, c.c /= f);
                    return c
                },
                intersect: function (a, b) {
                    var c = a.edge,
                        e = b.edge;
                    if (!c || !e || c.region.r == e.region.r) return null;
                    var f = c.a * e.b - c.b * e.a;
                    if (Math.abs(f) < 1.0E-10) return null;
                    var g = (c.c * e.b - e.c * c.b) / f,
                        f = (e.c * c.a - c.c * e.a) / f,
                        h = c.region.r,
                        i = e.region.r;
                    h.y < i.y || h.y == i.y && h.x < i.x ? h = a : (h = b, c = e);
                    return (c = g >= c.region.r.x) && h.side === "l" || !c && h.side === "r" ? null : {
                        x: g,
                        y: f
                    }
                },
                rightOf: function (a, b) {
                    var c = a.edge,
                        e = c.region.r,
                        f = b.x > e.x;
                    if (f && a.side === "l") return 1;
                    if (!f && a.side === "r") return 0;
                    if (c.a === 1) {
                        var g = b.y - e.y,
                            h = b.x - e.x,
                            i = 0,
                            j = 0;
                        !f && c.b < 0 || f && c.b >= 0 ? j = i = g >= c.b * h : (j = b.x + b.y * c.b > c.c, c.b < 0 && (j = !j), j || (i = 1));
                        i || (e = e.x - c.region.l.x, j = c.b * (h * h - g * g) < e * g * (1 + 2 * h / e + c.b * c.b), c.b < 0 && (j = !j))
                    } else h = c.c - c.a * b.x, c = b.y - h, g = b.x - e.x, e = h - e.y, j = c * c > g * g + e * e;
                    return a.side === "l" ? j : !j
                },
                endPoint: function (a, c, e) {
                    a.ep[c] = e;
                    a.ep[ib[c]] && b(a)
                },
                distance: function (a, b) {
                    var c = a.x - b.x,
                        e = a.y - b.y;
                    return Math.sqrt(c * c + e * e)
                }
            }, h = {
                list: [],
                insert: function (a, b, c) {
                    a.vertex = b;
                    a.ystar = b.y + c;
                    for (var c = 0, e = h.list, f = e.length; c < f; c++) {
                        var g = e[c];
                        if (!(a.ystar > g.ystar || a.ystar == g.ystar && b.x > g.vertex.x)) break
                    }
                    e.splice(c, 0, a)
                },
                del: function (a) {
                    for (var b = 0, c = h.list, e = c.length; b < e && c[b] != a; ++b);
                    c.splice(b, 1)
                },
                empty: function () {
                    return h.list.length === 0
                },
                nextEvent: function (a) {
                    for (var b = 0, c = h.list, e = c.length; b < e; ++b) if (c[b] == a) return c[b + 1];
                    return null
                },
                min: function () {
                    var a = h.list[0];
                    return {
                        x: a.vertex.x,
                        y: a.ystar
                    }
                },
                extractMin: function () {
                    return h.list.shift()
                }
            };
        f.init();
        for (var e = c.shift(), i = c.shift(), j, k, l, m, o, n, q, p, r; ; ) if (h.empty() || (j = h.min()), i && (h.empty() || i.y < j.y || i.y == j.y && i.x < j.x)) {
            k = f.leftBound(i);
            l = f.right(k);
            q = f.rightRegion(k);
            r = g.bisect(q, i);
            n = f.createHalfEdge(r, "l");
            f.insert(k, n);
            if (p = g.intersect(k, n)) h.del(k), h.insert(k, p, g.distance(p,
            i));
            k = n;
            n = f.createHalfEdge(r, "r");
            f.insert(k, n);
            (p = g.intersect(n, l)) && h.insert(n, p, g.distance(p, i));
            i = c.shift()
        } else if (h.empty()) break;
        else {
            k = h.extractMin();
            m = f.left(k);
            l = f.right(k);
            o = f.right(l);
            q = f.leftRegion(k);
            n = f.rightRegion(l);
            p = k.vertex;
            g.endPoint(k.edge, k.side, p);
            g.endPoint(l.edge, l.side, p);
            f.del(k);
            h.del(l);
            f.del(l);
            k = "l";
            q.y > n.y && (k = q, q = n, n = k, k = "r");
            r = g.bisect(q, n);
            n = f.createHalfEdge(r, k);
            f.insert(m, n);
            g.endPoint(r, ib[k], p);
            if (p = g.intersect(m, n)) h.del(m), h.insert(m, p, g.distance(p, q));
            (p = g.intersect(n, o)) && h.insert(n, p, g.distance(p, q))
        }
        for (k = f.right(f.leftEnd); k != f.rightEnd; k = f.right(k)) b(k.edge)
    }
    function fa(a, b, c, e, f, g) {
        if (!a(b, c, e, f, g)) {
            var h = (c + f) * 0.5,
                i = (e + g) * 0.5,
                b = b.nodes;
            b[0] && fa(a, b[0], c, e, h, i);
            b[1] && fa(a, b[1], h, e, f, i);
            b[2] && fa(a, b[2], c, i, h, g);
            b[3] && fa(a, b[3], h, i, f, g)
        }
    }
    function Ud(a) {
        return {
            x: a[0],
            y: a[1]
        }
    }
    function U() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }
    function ya(a, b, c, e) {
        for (var f, g = 0, h = b.length, i = c.length; g < h; ) {
            if (e >= i) return -1;
            f = b.charCodeAt(g++);
            if (f == 37) {
                if (f = Vd[b.charAt(g++)], !f || (e = f(a, c, e)) < 0) return -1
            } else if (f != c.charCodeAt(e++)) return -1
        }
        return e
    }
    function zc(a, b, c) {
        E.lastIndex = 0;
        return (b = E.exec(b.substring(c, c + 2))) ? (a.d = +b[0], c + b[0].length) : -1
    }
    function Ac(a, b, c) {
        E.lastIndex = 0;
        return (b = E.exec(b.substring(c, c + 2))) ? (a.H = +b[0], c + b[0].length) : -1
    }
    function jb(a) {
        return a.toISOString()
    }
    function V(a, b, c) {
        function e(b) {
            var c = a(b),
                e = g(c, 1);
            return b - c < e - b ? c : e
        }
        function f(c) {
            b(c = a(new C(c - 1)), 1);
            return c
        }
        function g(a, c) {
            b(a = new C(+a),
            c);
            return a
        }
        function h(a, e, g) {
            var a = f(a),
                h = [];
            if (g > 1) for (; a < e; ) c(a) % g || h.push(new Date(+a)), b(a, 1);
            else for (; a < e; ) h.push(new Date(+a)), b(a, 1);
            return h
        }
        a.floor = a;
        a.round = e;
        a.ceil = f;
        a.offset = g;
        a.range = h;
        var i = a.utc = za(a);
        i.floor = i;
        i.round = za(e);
        i.ceil = za(f);
        i.offset = za(g);
        i.range = function (a, b, c) {
            try {
                C = U;
                var e = new U;
                e._ = a;
                return h(e, b, c)
            } finally {
                C = Date
            }
        };
        return a
    }
    function za(a) {
        return function (b, c) {
            try {
                C = U;
                var e = new U;
                e._ = b;
                return a(e, c)._
            } finally {
                C = Date
            }
        }
    }
    function kb(a, b, c) {
        function e(b) {
            return a(b)
        }
        e.invert = function (b) {
            return lb(a.invert(b))
        };
        e.domain = function (b) {
            if (!arguments.length) return a.domain().map(lb);
            a.domain(b);
            return e
        };
        e.nice = function (a) {
            var b = Bc(e.domain());
            return e.domain([a.floor(b[0]), a.ceil(b[1])])
        };
        e.ticks = function (c, g) {
            var h = Bc(e.domain());
            if (typeof c !== "function") {
                var i = (h[1] - h[0]) / c,
                    j = d3.bisect(Aa, i);
                if (j == Aa.length) return b.year(h, c);
                if (!j) return a.ticks(c).map(lb);
                Math.log(i / Aa[j - 1]) < Math.log(Aa[j] / i) && --j;
                c = b[j];
                g = c[1];
                c = c[0].range
            }
            return c(h[0], new Date(+h[1] + 1), g)
        };
        e.tickFormat = function () {
            return c
        };
        e.copy = function () {
            return kb(a.copy(), b, c)
        };
        return d3.rebind(e, a, "range", "rangeRound", "interpolate", "clamp")
    }
    function Bc(a) {
        var b = a[0],
            a = a[a.length - 1];
        return b < a ? [b, a] : [a, b]
    }
    function lb(a) {
        return new Date(a)
    }
    function Cc(a) {
        return function (b) {
            for (var c = a.length - 1, e = a[c]; !e[1](b); ) e = a[--c];
            return e[0](b)
        }
    }
    function mb(a) {
        var b = new Date(a, 0, 1);
        b.setFullYear(a);
        return b
    }
    function Wd(a) {
        var b = a.getFullYear(),
            c = mb(b),
            e = mb(b + 1);
        return b + (a - c) / (e - c)
    }
    function nb(a) {
        var b = new Date(Date.UTC(a,
        0, 1));
        b.setUTCFullYear(a);
        return b
    }
    function Xd(a) {
        var b = a.getUTCFullYear(),
            c = nb(b),
            e = nb(b + 1);
        return b + (a - c) / (e - c)
    }








    if (!Date.now) Date.now = function () {
        return +new Date
    };
    try {
        document.createElement("div").style.setProperty("opacity", 0, "")
    } catch (Ce) {
        try {
            var B = CSSStyleDeclaration.prototype,
                Yd = B.setProperty;
            B.setProperty = function (a, b, c) {
                Yd.call(this, a, b + "", c)
            }
        } catch (De) { }
    }
    d3 = {
        version: "2.8.1"
    };
    var ga = function (a) {
        return Array.prototype.slice.call(a)
    };
    try {
        ga(document.documentElement.childNodes)
    } catch (Ee) {
        ga = Oc
    }
    var La = [].__proto__ ? function (a, b) {
        a.__proto__ = b
    } : function (a, b) {
        for (var c in b) a[c] = b[c]
    };
    d3.map = function (a) {
        var b = new N,
            c;
        for (c in a) b.set(c, a[c]);
        return b
    };
    (function (a, b) {
        try {
            for (var c in b) Object.defineProperty(a.prototype, c, {
                value: b[c],
                enumerable: !1
            })
        } catch (e) {
            a.prototype = b
        }
    })(N, {
        has: function (a) {
            return ha + a in this
        },
        get: function (a) {
            return this[ha + a]
        },
        set: function (a, b) {
            return this[ha + a] = b
        },
        remove: function (a) {
            a = ha + a;
            return a in this && delete this[a]
        },
        keys: function () {
            var a = [];
            this.forEach(function (b) {
                a.push(b)
            });
            return a
        },
        values: function () {
            var a = [];
            this.forEach(function (b, c) {
                a.push(c)
            });
            return a
        },
        entries: function () {
            var a = [];
            this.forEach(function (b, c) {
                a.push({
                    key: b,
                    value: c
                })
            });
            return a
        },
        forEach: function (a) {
            for (var b in this) b.charCodeAt(0) === Zd && a.call(this, b.substring(1), this[b])
        }
    });
    var ha = "\x00",
        Zd = ha.charCodeAt(0);
    d3.functor = function (a) {
        return typeof a === "function" ? a : function () {
            return a
        }
    };
    d3.rebind = function (a, b) {
        for (var c = 1, e = arguments.length, f; ++c < e; ) a[f = arguments[c]] = Qc(a, b, b[f]);
        return a
    };
    d3.ascending = function (a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN
    };
    d3.descending = function (a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
    };
    d3.mean = function (a, b) {
        var c = a.length,
            e, f = 0,
            g = -1,
            h = 0;
        if (arguments.length === 1) for (; ++g < c; ) {
            if (Ea(e = a[g])) f += (e - f) / ++h
        } else for (; ++g < c; ) if (Ea(e = b.call(a, a[g], g))) f += (e - f) / ++h;
        return h ? f : void 0
    };
    d3.median = function (a, b) {
        arguments.length > 1 && (a = a.map(b));
        a = a.filter(Ea);
        return a.length ? d3.quantile(a.sort(d3.ascending), 0.5) : void 0
    };
    d3.min = function (a, b) {
        var c = -1,
            e = a.length,
            f, g;
        if (arguments.length === 1) {
            for (; ++c < e && ((f = a[c]) == null || f != f); ) f = void 0;
            for (; ++c < e; ) if ((g = a[c]) != null && f > g) f = g
        } else {
            for (; ++c < e && ((f = b.call(a, a[c], c)) == null || f != f); ) f = void 0;
            for (; ++c < e; ) if ((g = b.call(a, a[c], c)) != null && f > g) f = g
        }
        return f
    };
    d3.max = function (a, b) {
        var c = -1,
            e = a.length,
            f, g;
        if (arguments.length === 1) {
            for (; ++c < e && ((f = a[c]) == null || f != f); ) f = void 0;
            for (; ++c < e; ) if ((g = a[c]) != null && g > f) f = g
        } else {
            for (; ++c < e && ((f = b.call(a, a[c], c)) == null || f != f); ) f = void 0;
            for (; ++c < e; ) if ((g = b.call(a, a[c], c)) != null && g > f) f = g
        }
        return f
    };
    d3.extent = function (a, b) {
        var c = -1,
            e = a.length,
            f, g, h;
        if (arguments.length === 1) {
            for (; ++c < e && ((f = h = a[c]) == null || f != f); ) f = h = void 0;
            for (; ++c < e; ) if ((g = a[c]) != null) f > g && (f = g), h < g && (h = g)
        } else {
            for (; ++c < e && ((f = h = b.call(a, a[c], c)) == null || f != f); ) f = void 0;
            for (; ++c < e; ) if ((g = b.call(a, a[c], c)) != null) f > g && (f = g), h < g && (h = g)
        }
        return [f, h]
    };
    d3.random = {
        normal: function (a, b) {
            arguments.length < 2 && (b = 1);
            arguments.length < 1 && (a = 0);
            return function () {
                var c, e;
                do c = Math.random() * 2 - 1, e = Math.random() * 2 - 1, e = c * c + e * e;
                while (!e || e > 1);
                return a + b * c * Math.sqrt(-2 * Math.log(e) / e)
            }
        }
    };
    d3.sum = function (a, b) {
        var c = 0,
            e = a.length,
            f, g = -1;
        if (arguments.length === 1) for (; ++g < e; ) {
            if (!isNaN(f = +a[g])) c += f
        } else for (; ++g < e; ) if (!isNaN(f = +b.call(a, a[g], g))) c += f;
        return c
    };
    d3.quantile = function (a, b) {
        var c = (a.length - 1) * b + 1,
            e = Math.floor(c),
            f = a[e - 1];
        c -= e;
        return c ? f + c * (a[e] - f) : f
    };
    d3.transpose = function (a) {
        return d3.zip.apply(d3, a)
    };
    d3.zip = function () {
        if (!(f = arguments.length)) return [];
        for (var a = -1, b = d3.min(arguments, Rc), c = Array(b); ++a < b; ) for (var e = -1, f, g = c[a] = Array(f); ++e < f; ) g[e] = arguments[e][a];
        return c
    };
    d3.bisector = function (a) {
        return {
            left: function (b, c, e, f) {
                arguments.length < 3 && (e = 0);
                if (arguments.length < 4) f = b.length;
                for (; e < f; ) {
                    var g = e + f >> 1;
                    a.call(b, b[g], g) < c ? e = g + 1 : f = g
                }
                return e
            },
            right: function (b, c, e, f) {
                arguments.length < 3 && (e = 0);
                if (arguments.length < 4) f = b.length;
                for (; e < f; ) {
                    var g = e + f >> 1;
                    c < a.call(b, b[g], g) ? f = g : e = g + 1
                }
                return e
            }
        }
    };
    B = d3.bisector(function (a) {
        return a
    });
    d3.bisectLeft = B.left;
    d3.bisect = d3.bisectRight = B.right;
    d3.first = function (a, b) {
        var c = 0,
            e = a.length,
            f = a[0],
            g;
        if (arguments.length === 1) b = d3.ascending;
        for (; ++c < e; ) if (b.call(a, f, g = a[c]) > 0) f = g;
        return f
    };
    d3.last = function (a, b) {
        var c = 0,
            e = a.length,
            f = a[0],
            g;
        if (arguments.length === 1) b = d3.ascending;
        for (; ++c < e; ) if (b.call(a, f, g = a[c]) <= 0) f = g;
        return f
    };
    d3.nest = function () {
        function a(b, f) {
            if (f >= e.length) return h ? h.call(c, b) : g ? b.sort(g) : b;
            for (var k = -1, l = b.length, m = e[f++], o, n, q = new N, p, r = {}; ++k < l; ) (p = q.get(o = m(n = b[k]))) ? p.push(n) : q.set(o, [n]);
            q.forEach(function (b) {
                r[b] = a(q.get(b), f)
            });
            return r
        }
        function b(a, c) {
            if (c >= e.length) return a;
            var g = [],
                h = f[c++],
                m;
            for (m in a) g.push({
                key: m,
                values: b(a[m], c)
            });
            h && g.sort(function (a, b) {
                return h(a.key, b.key)
            });
            return g
        }
        var c = {}, e = [],
            f = [],
            g, h;
        c.map = function (b) {
            return a(b, 0)
        };
        c.entries = function (c) {
            return b(a(c, 0), 0)
        };
        c.key = function (a) {
            e.push(a);
            return c
        };
        c.sortKeys = function (a) {
            f[e.length - 1] = a;
            return c
        };
        c.sortValues = function (a) {
            g = a;
            return c
        };
        c.rollup = function (a) {
            h = a;
            return c
        };
        return c
    };
    d3.keys = function (a) {
        var b = [],
            c;
        for (c in a) b.push(c);
        return b
    };
    d3.values = function (a) {
        var b = [],
            c;
        for (c in a) b.push(a[c]);
        return b
    };
    d3.entries = function (a) {
        var b = [],
            c;
        for (c in a) b.push({
            key: c,
            value: a[c]
        });
        return b
    };
    d3.permute = function (a, b) {
        for (var c = [], e = -1, f = b.length; ++e < f; ) c[e] = a[b[e]];
        return c
    };
    d3.merge = function (a) {
        return Array.prototype.concat.apply([], a)
    };
    d3.split = function (a, b) {
        var c = [],
            e = [],
            f, g = -1,
            h = a.length;
        for (arguments.length < 2 && (b = Sc); ++g < h; ) b.call(e, f = a[g], g) ? e = [] : (e.length || c.push(e), e.push(f));
        return c
    };
    d3.range = function (a, b, c) {
        arguments.length < 3 && (c = 1, arguments.length < 2 && (b = a, a = 0));
        if ((b - a) / c === Infinity) throw Error("infinite range"); var e = [],
f; f = Math.abs(c); for (var g = 1; f * g % 1; ) g *= 10; f = g; var g = -1, h; a *= f; b *= f; c *= f; if (c < 0) for (; (h = a + c * ++g) > b; ) e.push(h / f);
        else for (;
        (h = a + c * ++g) < b; ) e.push(h / f);
        return e
    };
    d3.requote = function (a) {
        return a.replace($d, "\\$&")
    };
    var $d = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
    d3.round = function (a, b) {
        return b ? Math.round(a * (b = Math.pow(10, b))) / b : Math.round(a)
    };
    d3.xhr = function (a, b, c) {
        var e = new XMLHttpRequest;
        arguments.length < 3 ? (c = b, b = null) : b && e.overrideMimeType && e.overrideMimeType(b);
        e.open("GET", a, !0);
        b && e.setRequestHeader("Accept",
        b);
        e.onreadystatechange = function () {
            e.readyState === 4 && c(e.status < 300 ? e : null)
        };
        e.send(null)
    };
    d3.text = function (a, b, c) {
        arguments.length < 3 && (c = b, b = null);
        d3.xhr(a, b, function (a) {
            c(a && a.responseText)
        })
    };
    d3.json = function (a, b) {
        d3.text(a, "application/json", function (a) {
            b(a ? JSON.parse(a) : null)
        })
    };
    d3.html = function (a, b) {
        d3.text(a, "text/html", function (a) {
            if (a != null) {
                var e = document.createRange();
                e.selectNode(document.body);
                a = e.createContextualFragment(a)
            }
            b(a)
        })
    };
    d3.xml = function (a, b, c) {
        arguments.length < 3 && (c = b, b = null);
        d3.xhr(a, b, function (a) {
            c(a && a.responseXML)
        })
    };
    var ob = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    d3.ns = {
        prefix: ob,
        qualify: function (a) {
            var b = a.indexOf(":"),
                c = a;
            b >= 0 && (c = a.substring(0, b), a = a.substring(b + 1));
            return ob.hasOwnProperty(c) ? {
                space: ob[c],
                local: a
            } : a
        }
    };
    d3.dispatch = function () {
        for (var a = new Fa, b = -1, c = arguments.length; ++b < c; ) a[arguments[b]] = sb(a);
        return a
    };
    Fa.prototype.on = function (a, b) {
        var c = a.indexOf("."),
            e = "";
        c > 0 && (e = a.substring(c + 1), a = a.substring(0, c));
        return arguments.length < 2 ? this[a].on(e) : this[a].on(e, b)
    };
    d3.format = function (a) {
        var a = ae.exec(a),
            b = a[1] || " ",
            c = a[3] || "",
            e = a[5],
            f = +a[6],
            g = a[7],
            h = a[8],
            i = a[9],
            j = 1,
            k = "",
            l = !1;
        h && (h = +h.substring(1));
        e && (b = "0", g && (f -= Math.floor((f - 1) / 4)));
        switch (i) {
            case "n":
                g = !0;
                i = "g";
                break;
            case "%":
                j = 100;
                k = "%";
                i = "f";
                break;
            case "p":
                j = 100;
                k = "%";
                i = "r";
                break;
            case "d":
                l = !0;
                h = 0;
                break;
            case "s":
                j = -1, i = "r"
        }
        i == "r" && !h && (i = "g");
        i = be.get(i) || Tc;
        return function (a) {
            if (l && a % 1) return "";
            var o = a < 0 && (a = -a) ? "\u2212" : c;
            if (j < 0) {
                var n = d3.formatPrefix(a, h);
                a *= n.scale;
                k = n.symbol
            } else a *= j;
            a = i(a, h);
            e ? (n = a.length + o.length, n < f && (a = Array(f - n + 1).join(b) + a), g && (a = ub(a)), a = o + a) : (g && (a = ub(a)), a = o + a, n = a.length, n < f && (a = Array(f - n + 1).join(b) + a));
            return a + k
        }
    };
    var ae = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/,
        be = d3.map({
            g: function (a, b) {
                return a.toPrecision(b)
            },
            e: function (a, b) {
                return a.toExponential(b)
            },
            f: function (a, b) {
                return a.toFixed(b)
            },
            r: function (a, b) {
                return d3.round(a, b = tb(a, b)).toFixed(Math.max(0, Math.min(20, b)))
            }
        }),
        ce = "y,z,a,f,p,n,\u03bc,m,,k,M,G,T,P,E,Z,Y".split(",").map(function (a, b) {
            return {
                scale: Math.pow(10, (8 - b) * 3),
                symbol: a
            }
        });
    d3.formatPrefix = function (a, b) {
        var c = 0;
        a && (a < 0 && (a *= -1), b && (a = d3.round(a, tb(a, b))), c = 1 + Math.floor(1.0E-12 + Math.log(a) / Math.LN10), c = Math.max(-24, Math.min(24, Math.floor((c <= 0 ? c + 1 : c - 1) / 3) * 3)));
        return ce[8 + c / 3]
    };
    var de = Ha(2),
        ee = Ha(3),
        Dc = function () {
            return Ga
        }, fe = d3.map({
            linear: Dc,
            poly: Ha,
            quad: function () {
                return de
            },
            cubic: function () {
                return ee
            },
            sin: function () {
                return Vc
            },
            exp: function () {
                return Wc
            },
            circle: function () {
                return Xc
            },
            elastic: function (a, b) {
                var c;
                arguments.length < 2 && (b = 0.45);
                arguments.length < 1 ? (a = 1, c = b / 4) : c = b / (2 * Math.PI) * Math.asin(1 / a);
                return function (e) {
                    return 1 + a * Math.pow(2, 10 * -e) * Math.sin((e - c) * 2 * Math.PI / b)
                }
            },
            back: function (a) {
                a || (a = 1.70158);
                return function (b) {
                    return b * b * ((a + 1) * b - a)
                }
            },
            bounce: function () {
                return Yc
            }
        }),
        ge = d3.map({
            "in": Ga,
            out: vb,
            "in-out": wb,
            "out-in": function (a) {
                return wb(vb(a))
            }
        });
    d3.ease = function (a) {
        var b = a.indexOf("-"),
            c = b >= 0 ? a.substring(0, b) : a,
            b = b >= 0 ? a.substring(b + 1) : "in",
            c = fe.get(c) || Dc,
            b = ge.get(b) || Ga;
        return Uc(b(c.apply(null, Array.prototype.slice.call(arguments, 1))))
    };
    d3.event = null;
    d3.interpolate = function (a, b) {
        for (var c = d3.interpolators.length, e; --c >= 0 && !(e = d3.interpolators[c](a, b)); );
        return e
    };
    d3.interpolateNumber = function (a, b) {
        b -= a;
        return function (c) {
            return a + b * c
        }
    };
    d3.interpolateRound = function (a, b) {
        b -= a;
        return function (c) {
            return Math.round(a + b * c)
        }
    };
    d3.interpolateString = function (a, b) {
        var c, e,
        f = 0,
            g = [],
            h = [],
            i, j;
        for (e = Ba.lastIndex = 0; c = Ba.exec(b); ++e) c.index && g.push(b.substring(f, c.index)), h.push({
            i: g.length,
            x: c[0]
        }), g.push(null), f = Ba.lastIndex;
        f < b.length && g.push(b.substring(f));
        for (e = 0, i = h.length;
        (c = Ba.exec(a)) && e < i; ++e) if (j = h[e], j.x == c[0]) {
            if (j.i) if (g[j.i + 1] == null) {
                g[j.i - 1] += j.x;
                g.splice(j.i, 1);
                for (c = e + 1; c < i; ++c) h[c].i--
            } else {
                g[j.i - 1] += j.x + g[j.i + 1];
                g.splice(j.i, 2);
                for (c = e + 1; c < i; ++c) h[c].i -= 2
            } else if (g[j.i + 1] == null) g[j.i] = j.x;
            else {
                g[j.i] = j.x + g[j.i + 1];
                g.splice(j.i + 1, 1);
                for (c = e + 1; c < i; ++c) h[c].i--
            }
            h.splice(e,
            1);
            i--;
            e--
        } else j.x = d3.interpolateNumber(parseFloat(c[0]), parseFloat(j.x));
        for (; e < i; ) j = h.pop(), g[j.i + 1] == null ? g[j.i] = j.x : (g[j.i] = j.x + g[j.i + 1], g.splice(j.i + 1, 1)), i--;
        return g.length === 1 ? g[0] == null ? h[0].x : function () {
            return b
        } : function (a) {
            for (e = 0; e < i; ++e) g[(j = h[e]).i] = j.x(a);
            return g.join("")
        }
    };
    d3.interpolateTransform = function (a, b) {
        var c = [],
            e = [],
            f, g = d3.transform(a),
            h = d3.transform(b),
            i = g.translate,
            j = h.translate,
            k = g.rotate,
            l = h.rotate,
            m = g.skew,
            o = h.skew,
            g = g.scale,
            h = h.scale;
        i[0] != j[0] || i[1] != j[1] ? (c.push("translate(",
        null, ",", null, ")"), e.push({
            i: 1,
            x: d3.interpolateNumber(i[0], j[0])
        }, {
            i: 3,
            x: d3.interpolateNumber(i[1], j[1])
        })) : j[0] || j[1] ? c.push("translate(" + j + ")") : c.push("");
        k != l ? e.push({
            i: c.push(c.pop() + "rotate(", null, ")") - 2,
            x: d3.interpolateNumber(k, l)
        }) : l && c.push(c.pop() + "rotate(" + l + ")");
        m != o ? e.push({
            i: c.push(c.pop() + "skewX(", null, ")") - 2,
            x: d3.interpolateNumber(m, o)
        }) : o && c.push(c.pop() + "skewX(" + o + ")");
        g[0] != h[0] || g[1] != h[1] ? (f = c.push(c.pop() + "scale(", null, ",", null, ")"), e.push({
            i: f - 4,
            x: d3.interpolateNumber(g[0], h[0])
        }, {
            i: f - 2,
            x: d3.interpolateNumber(g[1], h[1])
        })) : (h[0] != 1 || h[1] != 1) && c.push(c.pop() + "scale(" + h + ")");
        f = e.length;
        return function (a) {
            for (var b = -1, g; ++b < f; ) c[(g = e[b]).i] = g.x(a);
            return c.join("")
        }
    };
    d3.interpolateRgb = function (a, b) {
        var a = d3.rgb(a),
            b = d3.rgb(b),
            c = a.r,
            e = a.g,
            f = a.b,
            g = b.r - c,
            h = b.g - e,
            i = b.b - f;
        return function (a) {
            return "#" + W(Math.round(c + g * a)) + W(Math.round(e + h * a)) + W(Math.round(f + i * a))
        }
    };
    d3.interpolateHsl = function (a, b) {
        var a = d3.hsl(a),
            b = d3.hsl(b),
            c = a.h,
            e = a.s,
            f = a.l,
            g = b.h - c,
            h = b.s - e,
            i = b.l - f;
        return function (a) {
            return ka(c + g * a, e + h * a, f + i * a).toString()
        }
    };
    d3.interpolateArray = function (a, b) {
        var c = [],
            e = [],
            f = a.length,
            g = b.length,
            h = Math.min(a.length, b.length),
            i;
        for (i = 0; i < h; ++i) c.push(d3.interpolate(a[i], b[i]));
        for (; i < f; ++i) e[i] = a[i];
        for (; i < g; ++i) e[i] = b[i];
        return function (a) {
            for (i = 0; i < h; ++i) e[i] = c[i](a);
            return e
        }
    };
    d3.interpolateObject = function (a, b) {
        var c = {}, e = {}, f;
        for (f in a) f in b ? c[f] = (f == "transform" ? d3.interpolateTransform : d3.interpolate)(a[f], b[f]) : e[f] = a[f];
        for (f in b) f in a || (e[f] = b[f]);
        return function (a) {
            for (f in c) e[f] = c[f](a);
            return e
        }
    };
    var Ba = /[-+]?(?:\d*\.?\d+)(?:[eE][-+]?\d+)?/g;
    d3.interpolators = [d3.interpolateObject, function (a, b) {
        return b instanceof Array && d3.interpolateArray(a, b)
    }, function (a, b) {
        return (typeof a === "string" || typeof b === "string") && d3.interpolateString(a + "", b + "")
    }, function (a, b) {
        return (typeof b === "string" ? ja.has(b) || /^(#|rgb\(|hsl\()/.test(b) : b instanceof O || b instanceof P) && d3.interpolateRgb(a, b)
    }, function (a, b) {
        return !isNaN(a = +a) && !isNaN(b = +b) && d3.interpolateNumber(a, b)
    } ];
    d3.rgb = function (a, b, c) {
        return arguments.length === 1 ? a instanceof O ? L(a.r, a.g, a.b) : Ja("" + a, L, ka) : L(~ ~a, ~ ~b, ~ ~c)
    };
    O.prototype.brighter = function (a) {
        var a = Math.pow(0.7, arguments.length ? a : 1),
            b = this.r,
            c = this.g,
            e = this.b;
        if (!b && !c && !e) return L(30, 30, 30);
        b && b < 30 && (b = 30);
        c && c < 30 && (c = 30);
        e && e < 30 && (e = 30);
        return L(Math.min(255, Math.floor(b / a)), Math.min(255, Math.floor(c / a)), Math.min(255, Math.floor(e / a)))
    };
    O.prototype.darker = function (a) {
        a = Math.pow(0.7, arguments.length ? a : 1);
        return L(Math.floor(a * this.r), Math.floor(a * this.g), Math.floor(a * this.b))
    };
    O.prototype.hsl = function () {
        return yb(this.r, this.g, this.b)
    };
    O.prototype.toString = function () {
        return "#" + W(this.r) + W(this.g) + W(this.b)
    };
    var ja = d3.map({
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    });
    ja.forEach(function (a, b) {
        ja.set(a, Ja(b, L, ka))
    });
    d3.hsl = function (a, b, c) {
        return arguments.length === 1 ? a instanceof P ? X(a.h, a.s, a.l) : Ja("" + a, yb, X) : X(+a, +b, +c)
    };
    P.prototype.brighter = function (a) {
        a = Math.pow(0.7, arguments.length ? a : 1);
        return X(this.h, this.s, this.l / a)
    };
    P.prototype.darker = function (a) {
        a = Math.pow(0.7, arguments.length ? a : 1);
        return X(this.h, this.s, a * this.l)
    };
    P.prototype.rgb = function () {
        return ka(this.h, this.s, this.l)
    };
    P.prototype.toString = function () {
        return this.rgb().toString()
    };
    var la = function (a,
    b) {
        return b.querySelector(a)
    }, Bb = function (a, b) {
        return b.querySelectorAll(a)
    }, B = document.documentElement,
        he = B.matchesSelector || B.webkitMatchesSelector || B.mozMatchesSelector || B.msMatchesSelector || B.oMatchesSelector,
        Db = function (a, b) {
            return he.call(a, b)
        };
    if (typeof Sizzle === "function") la = function (a, b) {
        return Sizzle(a, b)[0]
    }, Bb = function (a, b) {
        return Sizzle.uniqueSort(Sizzle(a, b))
    }, Db = Sizzle.matchesSelector;
    var s = [];
    d3.selection = function () {
        return ia
    };
    d3.selection.prototype = s;
    s.select = function (a) {
        var b = [],
            c, e, f, g;
        typeof a !== "function" && (a = zb(a));
        for (var h = -1, i = this.length; ++h < i; ) {
            b.push(c = []);
            c.parentNode = (f = this[h]).parentNode;
            for (var j = -1, k = f.length; ++j < k; ) if (g = f[j]) {
                if (c.push(e = a.call(g, g.__data__, j)), e && "__data__" in g) e.__data__ = g.__data__
            } else c.push(null)
        }
        return J(b)
    };
    s.selectAll = function (a) {
        var b = [],
            c, e;
        typeof a !== "function" && (a = Ab(a));
        for (var f = -1, g = this.length; ++f < g; ) for (var h = this[f], i = -1, j = h.length; ++i < j; ) if (e = h[i]) b.push(c = ga(a.call(e, e.__data__, i))), c.parentNode = e;
        return J(b)
    };
    s.attr = function (a, b) {
        function c() {
            this.removeAttribute(a)
        }
        function e() {
            this.removeAttributeNS(a.space, a.local)
        }
        function f() {
            this.setAttribute(a, b)
        }
        function g() {
            this.setAttributeNS(a.space, a.local, b)
        }
        function h() {
            var c = b.apply(this, arguments);
            c == null ? this.removeAttribute(a) : this.setAttribute(a, c)
        }
        function i() {
            var c = b.apply(this, arguments);
            c == null ? this.removeAttributeNS(a.space, a.local) : this.setAttributeNS(a.space, a.local, c)
        }
        a = d3.ns.qualify(a);
        if (arguments.length < 2) {
            var j = this.node();
            return a.local ? j.getAttributeNS(a.space,
            a.local) : j.getAttribute(a)
        }
        return this.each(b == null ? a.local ? e : c : typeof b === "function" ? a.local ? i : h : a.local ? g : f)
    };
    s.classed = function (a, b) {
        var c = a.split(ie),
            e = c.length,
            f = -1;
        if (arguments.length > 1) {
            for (; ++f < e; ) Cb.call(this, c[f], b);
            return this
        } else {
            for (; ++f < e; ) if (!Cb.call(this, c[f])) return !1;
            return !0
        }
    };
    var ie = /\s+/g;
    s.style = function (a, b, c) {
        function e() {
            this.style.removeProperty(a)
        }
        function f() {
            this.style.setProperty(a, b, c)
        }
        function g() {
            var e = b.apply(this, arguments);
            e == null ? this.style.removeProperty(a) : this.style.setProperty(a, e, c)
        }
        arguments.length < 3 && (c = "");
        return arguments.length < 2 ? window.getComputedStyle(this.node(), null).getPropertyValue(a) : this.each(b == null ? e : typeof b === "function" ? g : f)
    };
    s.property = function (a, b) {
        function c() {
            delete this[a]
        }
        function e() {
            this[a] = b
        }
        function f() {
            var c = b.apply(this, arguments);
            c == null ? delete this[a] : this[a] = c
        }
        return arguments.length < 2 ? this.node()[a] : this.each(b == null ? c : typeof b === "function" ? f : e)
    };
    s.text = function (a) {
        return arguments.length < 1 ? this.node().textContent : this.each(typeof a === "function" ? function () {
            var b = a.apply(this, arguments);
            this.textContent = b == null ? "" : b
        } : a == null ? function () {
            this.textContent = ""
        } : function () {
            this.textContent = a
        })
    };
    s.html = function (a) {
        return arguments.length < 1 ? this.node().innerHTML : this.each(typeof a === "function" ? function () {
            var b = a.apply(this, arguments);
            this.innerHTML = b == null ? "" : b
        } : a == null ? function () {
            this.innerHTML = ""
        } : function () {
            this.innerHTML = a
        })
    };
    s.append = function (a) {
        function b() {
            return this.appendChild(document.createElementNS(this.namespaceURI,
            a))
        }
        function c() {
            return this.appendChild(document.createElementNS(a.space, a.local))
        }
        a = d3.ns.qualify(a);
        return this.select(a.local ? c : b)
    };
    s.insert = function (a, b) {
        function c() {
            return this.insertBefore(document.createElementNS(this.namespaceURI, a), la(b, this))
        }
        function e() {
            return this.insertBefore(document.createElementNS(a.space, a.local), la(b, this))
        }
        a = d3.ns.qualify(a);
        return this.select(a.local ? e : c)
    };
    s.remove = function () {
        return this.each(function () {
            var a = this.parentNode;
            a && a.removeChild(this)
        })
    };
    s.data = function (a, b) {
        function c(a, c) {
            var e, f = a.length,
                g = c.length,
                h = Math.min(f, g),
                r = Math.max(f, g),
                y = [],
                t = [],
                v = [],
                w, A;
            if (b) {
                var h = new N,
                    r = [],
                    z;
                A = c.length;
                for (e = -1; ++e < f; ) z = b.call(w = a[e], w.__data__, e), h.has(z) ? v[A++] = w : h.set(z, w), r.push(z);
                for (e = -1; ++e < g; ) z = b.call(c, A = c[e], e), h.has(z) ? (y[e] = w = h.get(z), w.__data__ = A, t[e] = v[e] = null) : (t[e] = {
                    __data__: A
                }, y[e] = v[e] = null), h.remove(z);
                for (e = -1; ++e < f; ) h.has(r[e]) && (v[e] = a[e])
            } else {
                for (e = -1; ++e < h; ) w = a[e], A = c[e], w ? (w.__data__ = A, y[e] = w, t[e] = v[e] = null) : (t[e] = {
                    __data__: A
                },
                y[e] = v[e] = null);
                for (; e < g; ++e) t[e] = {
                    __data__: c[e]
                }, y[e] = v[e] = null;
                for (; e < r; ++e) v[e] = a[e], t[e] = y[e] = null
            }
            t.update = y;
            t.parentNode = y.parentNode = v.parentNode = a.parentNode;
            i.push(t);
            j.push(y);
            k.push(v)
        }
        var e = -1,
            f = this.length,
            g, h;
        if (!arguments.length) {
            for (a = Array(f = (g = this[0]).length); ++e < f; ) if (h = g[e]) a[e] = h.__data__;
            return a
        }
        var i = Eb([]),
            j = J([]),
            k = J([]);
        if (typeof a === "function") for (; ++e < f; ) c(g = this[e], a.call(g, g.parentNode.__data__, e));
        else for (; ++e < f; ) c(g = this[e], a);
        j.enter = function () {
            return i
        };
        j.exit = function () {
            return k
        };
        return j
    };
    s.datum = s.map = function (a) {
        return arguments.length < 1 ? this.property("__data__") : this.property("__data__", a)
    };
    s.filter = function (a) {
        var b = [],
            c, e, f;
        typeof a !== "function" && (a = ad(a));
        for (var g = 0, h = this.length; g < h; g++) {
            b.push(c = []);
            c.parentNode = (e = this[g]).parentNode;
            for (var i = 0, j = e.length; i < j; i++) (f = e[i]) && a.call(f, f.__data__, i) && c.push(f)
        }
        return J(b)
    };
    s.order = function () {
        for (var a = -1, b = this.length; ++a < b; ) for (var c = this[a], e = c.length - 1, f = c[e], g; --e >= 0; ) if (g = c[e]) f && f !== g.nextSibling && f.parentNode.insertBefore(g, f), f = g;
        return this
    };
    s.sort = function (a) {
        for (var a = bd.apply(this, arguments), b = -1, c = this.length; ++b < c; ) this[b].sort(a);
        return this.order()
    };
    s.on = function (a, b, c) {
        arguments.length < 3 && (c = !1);
        var e = "__on" + a,
            f = a.indexOf(".");
        f > 0 && (a = a.substring(0, f));
        return arguments.length < 2 ? (f = this.node()[e]) && f._ : this.each(function (f, h) {
            function i(a) {
                var c = d3.event;
                d3.event = a;
                try {
                    b.call(j, j.__data__, h)
                } finally {
                    d3.event = c
                }
            }
            var j = this,
                k = j[e];
            k && (j.removeEventListener(a, k, k.$), delete j[e]);
            if (b) j.addEventListener(a,
            j[e] = i, i.$ = c), i._ = b
        })
    };
    s.each = function (a) {
        for (var b = -1, c = this.length; ++b < c; ) for (var e = this[b], f = -1, g = e.length; ++f < g; ) {
            var h = e[f];
            h && a.call(h, h.__data__, f, b)
        }
        return this
    };
    s.call = function (a) {
        a.apply(this, (arguments[0] = this, arguments));
        return this
    };
    s.empty = function () {
        return !this.node()
    };
    s.node = function () {
        for (var a = 0, b = this.length; a < b; a++) for (var c = this[a], e = 0, f = c.length; e < f; e++) {
            var g = c[e];
            if (g) return g
        }
        return null
    };
    s.transition = function () {
        for (var a = [], b, c, e = -1, f = this.length; ++e < f; ) {
            a.push(b = []);
            for (var g = this[e], h = -1, i = g.length; ++h < i; ) b.push((c = g[h]) ? {
                node: c,
                delay: na,
                duration: oa
            } : null)
        }
        return Ma(a, R || ++je, Date.now())
    };
    var ia = J([
        [document]
    ]);
    ia[0].parentNode = B;
    d3.select = function (a) {
        return typeof a === "string" ? ia.select(a) : J([
            [a]
        ])
    };
    d3.selectAll = function (a) {
        return typeof a === "string" ? ia.selectAll(a) : J([ga(a)])
    };
    var Q = [];
    d3.selection.enter = Eb;
    d3.selection.enter.prototype = Q;
    Q.append = s.append;
    Q.insert = s.insert;
    Q.empty = s.empty;
    Q.node = s.node;
    Q.select = function (a) {
        for (var b = [], c, e, f, g, h, i = -1, j = this.length; ++i < j; ) {
            f = (g = this[i]).update;
            b.push(c = []);
            c.parentNode = g.parentNode;
            for (var k = -1, l = g.length; ++k < l; ) (h = g[k]) ? (c.push(f[k] = e = a.call(g.parentNode, h.__data__, k)), e.__data__ = h.__data__) : c.push(null)
        }
        return J(b)
    };
    var $ = {}, D = [],
        je = 0,
        R = 0,
        na = 0,
        oa = 250,
        ma = d3.ease("cubic-in-out");
    D.call = s.call;
    d3.transition = function (a) {
        return arguments.length ? R ? a.transition() : a : ia.transition()
    };
    d3.transition.prototype = D;
    D.select = function (a) {
        var b = [],
            c, e, f;
        typeof a !== "function" && (a = zb(a));
        for (var g = -1, h = this.length; ++g < h; ) {
            b.push(c = []);
            for (var i = this[g], j = -1, k = i.length; ++j < k; ) if ((f = i[j]) && (e = a.call(f.node, f.node.__data__, j))) {
                if ("__data__" in f.node) e.__data__ = f.node.__data__;
                c.push({
                    node: e,
                    delay: f.delay,
                    duration: f.duration
                })
            } else c.push(null)
        }
        return Ma(b, this.id, this.time).ease(this.ease())
    };
    D.selectAll = function (a) {
        var b = [],
            c, e, f;
        typeof a !== "function" && (a = Ab(a));
        for (var g = -1, h = this.length; ++g < h; ) for (var i = this[g], j = -1, k = i.length; ++j < k; ) if (f = i[j]) {
            e = a.call(f.node, f.node.__data__, j);
            b.push(c = []);
            for (var l = -1, m = e.length; ++l < m; ) c.push({
                node: e[l],
                delay: f.delay,
                duration: f.duration
            })
        }
        return Ma(b, this.id, this.time).ease(this.ease())
    };
    D.attr = function (a, b) {
        return this.attrTween(a, Fb(a, b))
    };
    D.attrTween = function (a, b) {
        function c(a, c) {
            var e = b.call(this, a, c, this.getAttribute(f));
            return e === $ ? (this.removeAttribute(f), null) : e && function (a) {
                this.setAttribute(f, e(a))
            }
        }
        function e(a, c) {
            var e = b.call(this, a, c, this.getAttributeNS(f.space, f.local));
            return e === $ ? (this.removeAttributeNS(f.space, f.local), null) : e && function (a) {
                this.setAttributeNS(f.space, f.local, e(a))
            }
        }
        var f = d3.ns.qualify(a);
        return this.tween("attr." + a, f.local ? e : c)
    };
    D.style = function (a, b, c) {
        arguments.length < 3 && (c = "");
        return this.styleTween(a, Fb(a, b), c)
    };
    D.styleTween = function (a, b, c) {
        arguments.length < 3 && (c = "");
        return this.tween("style." + a, function (e, f) {
            var g = b.call(this, e, f, window.getComputedStyle(this, null).getPropertyValue(a));
            return g === $ ? (this.style.removeProperty(a), null) : g && function (b) {
                this.style.setProperty(a, g(b), c)
            }
        })
    };
    D.text = function (a) {
        return this.tween("text", function (b, c) {
            this.textContent = typeof a === "function" ? a.call(this, b, c) : a
        })
    };
    D.remove = function () {
        return this.each("end.transition", function () {
            var a;
            !this.__transition__ && (a = this.parentNode) && a.removeChild(this)
        })
    };
    D.delay = function (a) {
        var b = this;
        return b.each(typeof a === "function" ? function (c, e, f) {
            b[f][e].delay = a.apply(this, arguments) | 0
        } : (a |= 0, function (c, e, f) {
            b[f][e].delay = a
        }))
    };
    D.duration = function (a) {
        var b = this;
        return b.each(typeof a === "function" ? function (c, e, f) {
            b[f][e].duration = Math.max(1, a.apply(this, arguments) | 0)
        } : (a = Math.max(1,
        a | 0), function (c, e, f) {
            b[f][e].duration = a
        }))
    };
    D.transition = function () {
        return this.select(Pc)
    };
    var S = null,
        qa, pa;
    d3.timer = function (a, b, c) {
        var e = !1,
            f = S;
        if (arguments.length < 3) {
            if (arguments.length < 2) b = 0;
            else if (!isFinite(b)) return;
            c = Date.now()
        }
        for (; f; ) {
            if (f.callback === a) {
                f.then = c;
                f.delay = b;
                e = !0;
                break
            }
            f = f.next
        }
        e || (S = {
            callback: a,
            then: c,
            delay: b,
            next: S
        });
        qa || (pa = clearTimeout(pa), qa = 1, Hb(Na))
    };
    d3.timer.flush = function () {
        for (var a, b = Date.now(), c = S; c; ) {
            a = b - c.then;
            if (!c.delay) c.flush = c.callback(a);
            c = c.next
        }
        Gb()
    };
    var Hb = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
        setTimeout(a, 17)
    };
    d3.transform = function (a) {
        var b = document.createElementNS(d3.ns.prefix.svg, "g"),
            c = {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                e: 0,
                f: 0
            };
        return (d3.transform = function (a) {
            b.setAttribute("transform", a);
            a = b.transform.baseVal.consolidate();
            return new Ib(a ? a.matrix : c)
        })(a)
    };
    Ib.prototype.toString = function () {
        return "translate(" + this.translate +
            ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var Kb = 180 / Math.PI;
    d3.mouse = function (a) {
        return Lb(a, xb())
    };
    var Oa = /WebKit/.test(navigator.userAgent) ? -1 : 0;
    d3.touches = function (a, b) {
        if (arguments.length < 2) b = xb().touches;
        return b ? ga(b).map(function (b) {
            var e = Lb(a, b);
            e.identifier = b.identifier;
            return e
        }) : []
    };
    d3.scale = {};
    d3.scale.linear = function () {
        return Mb([0, 1], [0, 1], d3.interpolate, !1)
    };
    d3.scale.log = function () {
        return Qb(d3.scale.linear(), Sa)
    };
    var hd = d3.format(".0e");
    Sa.pow = function (a) {
        return Math.pow(10,
        a)
    };
    sa.pow = function (a) {
        return -Math.pow(10, -a)
    };
    d3.scale.pow = function () {
        return Rb(d3.scale.linear(), 1)
    };
    d3.scale.sqrt = function () {
        return d3.scale.pow().exponent(0.5)
    };
    d3.scale.ordinal = function () {
        return Sb([], {
            t: "range",
            x: []
        })
    };
    d3.scale.category10 = function () {
        return d3.scale.ordinal().range(ke)
    };
    d3.scale.category20 = function () {
        return d3.scale.ordinal().range(le)
    };
    d3.scale.category20b = function () {
        return d3.scale.ordinal().range(me)
    };
    d3.scale.category20c = function () {
        return d3.scale.ordinal().range(ne)
    };
    var ke =
        "#1f77b4,#ff7f0e,#2ca02c,#d62728,#9467bd,#8c564b,#e377c2,#7f7f7f,#bcbd22,#17becf".split(","),
        le = "#1f77b4,#aec7e8,#ff7f0e,#ffbb78,#2ca02c,#98df8a,#d62728,#ff9896,#9467bd,#c5b0d5,#8c564b,#c49c94,#e377c2,#f7b6d2,#7f7f7f,#c7c7c7,#bcbd22,#dbdb8d,#17becf,#9edae5".split(","),
        me = "#393b79,#5254a3,#6b6ecf,#9c9ede,#637939,#8ca252,#b5cf6b,#cedb9c,#8c6d31,#bd9e39,#e7ba52,#e7cb94,#843c39,#ad494a,#d6616b,#e7969c,#7b4173,#a55194,#ce6dbd,#de9ed6".split(","),
        ne = "#3182bd,#6baed6,#9ecae1,#c6dbef,#e6550d,#fd8d3c,#fdae6b,#fdd0a2,#31a354,#74c476,#a1d99b,#c7e9c0,#756bb1,#9e9ac8,#bcbddc,#dadaeb,#636363,#969696,#bdbdbd,#d9d9d9".split(",");
    d3.scale.quantile = function () {
        return Tb([], [])
    };
    d3.scale.quantize = function () {
        return Ub(0, 1, [0, 1])
    };
    d3.scale.identity = function () {
        return Vb([0, 1])
    };
    d3.svg = {};
    d3.svg.arc = function () {
        function a() {
            var a = b.apply(this, arguments),
                h = c.apply(this, arguments),
                i = e.apply(this, arguments) + T,
                j = f.apply(this, arguments) + T,
                k = (j < i && (k = i, i = j, j = k), j - i),
                l = k < Math.PI ? "0" : "1",
                m = Math.cos(i),
                i = Math.sin(i),
                o = Math.cos(j),
                j = Math.sin(j);
            return k >= oe ? a ? "M0," + h + "A" + h + "," + h + " 0 1,1 0," + -h + "A" + h + "," + h + " 0 1,1 0," + h + "M0," + a + "A" + a + "," + a +
                " 0 1,0 0," + -a + "A" + a + "," + a + " 0 1,0 0," + a + "Z" : "M0," + h + "A" + h + "," + h + " 0 1,1 0," + -h + "A" + h + "," + h + " 0 1,1 0," + h + "Z" : a ? "M" + h * m + "," + h * i + "A" + h + "," + h + " 0 " + l + ",1 " + h * o + "," + h * j + "L" + a * o + "," + a * j + "A" + a + "," + a + " 0 " + l + ",0 " + a * m + "," + a * i + "Z" : "M" + h * m + "," + h * i + "A" + h + "," + h + " 0 " + l + ",1 " + h * o + "," + h * j + "L0,0Z"
        }
        var b = id,
            c = jd,
            e = Wb,
            f = Xb;
        a.innerRadius = function (c) {
            if (!arguments.length) return b;
            b = d3.functor(c);
            return a
        };
        a.outerRadius = function (b) {
            if (!arguments.length) return c;
            c = d3.functor(b);
            return a
        };
        a.startAngle = function (b) {
            if (!arguments.length) return e;
            e = d3.functor(b);
            return a
        };
        a.endAngle = function (b) {
            if (!arguments.length) return f;
            f = d3.functor(b);
            return a
        };
        a.centroid = function () {
            var a = (b.apply(this, arguments) + c.apply(this, arguments)) / 2,
                h = (e.apply(this, arguments) + f.apply(this, arguments)) / 2 + T;
            return [Math.cos(h) * a, Math.sin(h) * a]
        };
        return a
    };
    var T = -Math.PI / 2,
        oe = 2 * Math.PI - 1.0E-6;
    d3.svg.line = function () {
        return Yb(Object)
    };
    var Va = "linear",
        ba = d3.map({
            linear: M,
            "step-before": Wa,
            "step-after": Xa,
            basis: $b,
            "basis-open": function (a) {
                if (a.length < 4) return M(a);
                for (var b = [], c = -1, e = a.length, f, g = [0], h = [0]; ++c < 3; ) f = a[c], g.push(f[0]), h.push(f[1]);
                b.push(H(Y, g) + "," + H(Y, h));
                for (--c; ++c < e; ) f = a[c], g.shift(), g.push(f[0]), h.shift(), h.push(f[1]), ca(b, g, h);
                return b.join("")
            },
            "basis-closed": function (a) {
                for (var b, c = -1, e = a.length, f = e + 4, g, h = [], i = []; ++c < 4; ) g = a[c % e], h.push(g[0]), i.push(g[1]);
                b = [H(Y, h), ",", H(Y, i)];
                for (--c; ++c < f; ) g = a[c % e], h.shift(), h.push(g[0]), i.shift(), i.push(g[1]), ca(b, h, i);
                return b.join("")
            },
            bundle: function (a, b) {
                for (var c = a.length - 1, e = a[0][0], f = a[0][1], g = a[c][0] - e, h = a[c][1] - f, i = -1, j, k; ++i <= c; ) j = a[i], k = i / c, j[0] = b * j[0] + (1 - b) * (e + k * g), j[1] = b * j[1] + (1 - b) * (f + k * h);
                return $b(a)
            },
            cardinal: function (a, b) {
                return a.length < 3 ? M(a) : a[0] + ua(a, Ya(a, b))
            },
            "cardinal-open": function (a, b) {
                return a.length < 4 ? M(a) : a[1] + ua(a.slice(1, a.length - 1), Ya(a, b))
            },
            "cardinal-closed": function (a, b) {
                return a.length < 3 ? M(a) : a[0] + ua((a.push(a[0]), a), Ya([a[a.length - 2]].concat(a, [a[1]]), b))
            },
            monotone: function (a) {
                if (a.length < 3) a = M(a);
                else {
                    var b = a[0],
                        c = [],
                        e, f, g, h;
                    e = 0;
                    f = a.length - 1;
                    var i = [];
                    g = a[1];
                    for (h = i[0] = Za(a[0], g); ++e < f; ) i[e] = h + (h = Za(g, g = a[e + 1]));
                    i[e] = h;
                    for (var j = -1, k = a.length - 1; ++j < k; ) e = Za(a[j], a[j + 1]), Math.abs(e) < 1.0E-6 ? i[j] = i[j + 1] = 0 : (f = i[j] / e, g = i[j + 1] / e, h = f * f + g * g, h > 9 && (h = e * 3 / Math.sqrt(h), i[j] = h * f, i[j + 1] = h * g));
                    for (j = -1; ++j <= k; ) h = (a[Math.min(k, j + 1)][0] - a[Math.max(0, j - 1)][0]) / (6 * (1 + i[j] * i[j])), c.push([h || 0, i[j] * h || 0]);
                    a = b + ua(a, c)
                }
                return a
            }
        }),
        ac = [0, 2 / 3, 1 / 3, 0],
        bc = [0, 1 / 3, 2 / 3, 0],
        Y = [0, 1 / 6, 2 / 3, 1 / 6];
    d3.svg.line.radial = function () {
        var a = Yb(cc);
        a.radius = a.x;
        delete a.x;
        a.angle = a.y;
        delete a.y;
        return a
    };
    Wa.reverse = Xa;
    Xa.reverse = Wa;
    d3.svg.area = function () {
        return dc(Object)
    };
    d3.svg.area.radial = function () {
        var a = dc(cc);
        a.radius = a.x;
        delete a.x;
        a.innerRadius = a.x0;
        delete a.x0;
        a.outerRadius = a.x1;
        delete a.x1;
        a.angle = a.y;
        delete a.y;
        a.startAngle = a.y0;
        delete a.y0;
        a.endAngle = a.y1;
        delete a.y1;
        return a
    };
    d3.svg.chord = function () {
        function a(a, f) {
            var g = b(this, c, a, f),
                h = b(this, e, a, f);
            return "M" + g.p0 + ("A" + g.r + "," + g.r + " 0 " + +(g.a1 - g.a0 > Math.PI) + ",1 " + g.p1) + (g.a0 == h.a0 && g.a1 == h.a1 ? "Q 0,0 " + g.p0 : "Q 0,0 " + h.p0 + ("A" + h.r + "," + h.r + " 0 " + +(h.a1 - h.a0 > Math.PI) + ",1 " + h.p1) + ("Q 0,0 " + g.p0)) + "Z"
        }
        function b(a, b, c, e) {
            var m = b.call(a, c, e),
                b = f.call(a, m, e),
                c = g.call(a, m, e) + T,
                a = h.call(a, m, e) + T;
            return {
                r: b,
                a0: c,
                a1: a,
                p0: [b * Math.cos(c), b * Math.sin(c)],
                p1: [b * Math.cos(a), b * Math.sin(a)]
            }
        }
        var c = ec,
            e = fc,
            f = md,
            g = Wb,
            h = Xb;
        a.radius = function (b) {
            if (!arguments.length) return f;
            f = d3.functor(b);
            return a
        };
        a.source = function (b) {
            if (!arguments.length) return c;
            c = d3.functor(b);
            return a
        };
        a.target = function (b) {
            if (!arguments.length) return e;
            e = d3.functor(b);
            return a
        };
        a.startAngle = function (b) {
            if (!arguments.length) return g;
            g = d3.functor(b);
            return a
        };
        a.endAngle = function (b) {
            if (!arguments.length) return h;
            h = d3.functor(b);
            return a
        };
        return a
    };
    d3.svg.diagonal = function () {
        function a(a, g) {
            var h = b.call(this, a, g),
                i = c.call(this, a, g),
                j = (h.y + i.y) / 2,
                h = [h, {
                    x: h.x,
                    y: j
                }, {
                    x: i.x,
                    y: j
                },
                i],
                h = h.map(e);
            return "M" + h[0] + "C" + h[1] + " " + h[2] + " " + h[3]
        }
        var b = ec,
            c = fc,
            e = gc;
        a.source = function (c) {
            if (!arguments.length) return b;
            b = d3.functor(c);
            return a
        };
        a.target = function (b) {
            if (!arguments.length) return c;
            c = d3.functor(b);
            return a
        };
        a.projection = function (b) {
            if (!arguments.length) return e;
            e = b;
            return a
        };
        return a
    };
    d3.svg.diagonal.radial = function () {
        var a = d3.svg.diagonal(),
            b = gc,
            c = a.projection;
        a.projection = function (a) {
            return arguments.length ? c(nd(b = a)) : b
        };
        return a
    };
    d3.svg.mouse = d3.mouse;
    d3.svg.touches = d3.touches;
    d3.svg.symbol = function () {
        function a(a, f) {
            return (Ec.get(b.call(this, a, f)) || hc)(c.call(this, a, f))
        }
        var b = pd,
            c = od;
        a.type = function (c) {
            if (!arguments.length) return b;
            b = d3.functor(c);
            return a
        };
        a.size = function (b) {
            if (!arguments.length) return c;
            c = d3.functor(b);
            return a
        };
        return a
    };
    var Ec = d3.map({
        circle: hc,
        cross: function (a) {
            a = Math.sqrt(a / 5) / 2;
            return "M" + -3 * a + "," + -a + "H" + -a + "V" + -3 * a + "H" + a + "V" + -a + "H" + 3 * a + "V" + a + "H" + a + "V" + 3 * a + "H" + -a + "V" + a + "H" + -3 * a + "Z"
        },
        diamond: function (a) {
            var a = Math.sqrt(a / (2 * Fc)),
                b = a * Fc;
            return "M0," + -a + "L" + b + ",0 0," + a + " " + -b + ",0Z"
        },
        square: function (a) {
            a = Math.sqrt(a) / 2;
            return "M" + -a + "," + -a + "L" + a + "," + -a + " " + a + "," + a + " " + -a + "," + a + "Z"
        },
        "triangle-down": function (a) {
            var a = Math.sqrt(a / Ca),
                b = a * Ca / 2;
            return "M0," + b + "L" + a + "," + -b + " " + -a + "," + -b +
                "Z"
        },
        "triangle-up": function (a) {
            var a = Math.sqrt(a / Ca),
                b = a * Ca / 2;
            return "M0," + -b + "L" + a + "," + b + " " + -a + "," + b + "Z"
        }
    });
    d3.svg.symbolTypes = Ec.keys();
    var Ca = Math.sqrt(3),
        Fc = Math.tan(30 * Math.PI / 180);
    d3.svg.axis = function () {
        function a(a) {
            a.each(function () {
                var a = d3.select(this),
                    n = j == null ? b.ticks ? b.ticks.apply(b, i) : b.domain() : j,
                    m = k == null ? b.tickFormat ? b.tickFormat.apply(b, i) : String : k,
                    p = qd(b, n, l),
                    r = a.selectAll(".minor").data(p, String),
                    p = r.enter().insert("line", "g").attr("class", "tick minor").style("opacity", 1.0E-6),
                    y = d3.transition(r.exit()).style("opacity", 1.0E-6).remove(),
                    r = d3.transition(r).style("opacity", 1),
                    t = a.selectAll("g").data(n, String),
                    n = t.enter().insert("g", "path").style("opacity", 1.0E-6),
                    v = d3.transition(t.exit()).style("opacity", 1.0E-6).remove(),
                    t = d3.transition(t).style("opacity", 1),
                    w, A = ra(b),
                    a = a.selectAll(".domain").data([0]);
                a.enter().append("path").attr("class", "domain");
                var a = d3.transition(a),
                    z = b.copy(),
                    I = this.__chart__ || z;
                this.__chart__ = z;
                n.append("line").attr("class", "tick");
                n.append("text");
                t.select("text").text(m);
                switch (c) {
                    case "bottom":
                        w = ic;
                        p.attr("y2", f);
                        r.attr("x2", 0).attr("y2", f);
                        n.select("line").attr("y2", e);
                        n.select("text").attr("y", Math.max(e, 0) + h);
                        t.select("line").attr("x2", 0).attr("y2", e);
                        t.select("text").attr("x", 0).attr("y", Math.max(e, 0) + h).attr("dy", ".71em").attr("text-anchor", "middle");
                        a.attr("d", "M" + A[0] + "," + g + "V0H" + A[1] + "V" + g);
                        break;
                    case "top":
                        w = ic;
                        p.attr("y2", -f);
                        r.attr("x2", 0).attr("y2", -f);
                        n.select("line").attr("y2", -e);
                        n.select("text").attr("y", -(Math.max(e, 0) + h));
                        t.select("line").attr("x2", 0).attr("y2", -e);
                        t.select("text").attr("x", 0).attr("y", -(Math.max(e, 0) + h)).attr("dy", "0em").attr("text-anchor", "middle");
                        a.attr("d", "M" + A[0] + "," + -g + "V0H" + A[1] + "V" + -g);
                        break;
                    case "left":
                        w = jc;
                        p.attr("x2", -f);
                        r.attr("x2", -f).attr("y2", 0);
                        n.select("line").attr("x2", -e);
                        n.select("text").attr("x", -(Math.max(e, 0) + h));
                        t.select("line").attr("x2", -e).attr("y2", 0);
                        t.select("text").attr("x", -(Math.max(e, 0) + h)).attr("y", 0).attr("dy", ".32em").attr("text-anchor", "end");
                        a.attr("d", "M" + -g + "," + A[0] + "H0V" + A[1] + "H" + -g);
                        break;
                    case "right":
                        w = jc, p.attr("x2", f), r.attr("x2", f).attr("y2", 0), n.select("line").attr("x2", e), n.select("text").attr("x", Math.max(e, 0) + h), t.select("line").attr("x2", e).attr("y2", 0), t.select("text").attr("x", Math.max(e, 0) + h).attr("y", 0).attr("dy", ".32em").attr("text-anchor", "start"), a.attr("d", "M" + g + "," + A[0] + "H0V" + A[1] + "H" + g)
                }
                if (b.ticks) n.call(w, I), t.call(w, z), v.call(w, z), p.call(w, I), r.call(w, z), y.call(w, z);
                else {
                    var u = z.rangeBand() / 2,
                        m = function (a) {
                            return z(a) + u
                        };
                    n.call(w,
                    m);
                    t.call(w, m)
                }
            })
        }
        var b = d3.scale.linear(),
            c = "bottom",
            e = 6,
            f = 6,
            g = 6,
            h = 3,
            i = [10],
            j = null,
            k, l = 0;
        a.scale = function (c) {
            if (!arguments.length) return b;
            b = c;
            return a
        };
        a.orient = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        a.ticks = function () {
            if (!arguments.length) return i;
            i = arguments;
            return a
        };
        a.tickValues = function (b) {
            if (!arguments.length) return j;
            j = b;
            return a
        };
        a.tickFormat = function (b) {
            if (!arguments.length) return k;
            k = b;
            return a
        };
        a.tickSize = function (b, c, h) {
            if (!arguments.length) return e;
            var i = arguments.length - 1;
            e = +b;
            f = i > 1 ? +c : e;
            g = i > 0 ? +arguments[i] : e;
            return a
        };
        a.tickPadding = function (b) {
            if (!arguments.length) return h;
            h = +b;
            return a
        };
        a.tickSubdivide = function (b) {
            if (!arguments.length) return l;
            l = +b;
            return a
        };
        return a
    };
    d3.svg.brush = function () {
        function a(g) {
            g.each(function () {
                var g = d3.select(this),
                    k = g.selectAll(".background").data([0]),
                    m = g.selectAll(".extent").data([0]),
                    l = g.selectAll(".resize").data(j, String);
                g.style("pointer-events", "all").on("mousedown.brush", f).on("touchstart.brush", f);
                k.enter().append("rect").attr("class",
                    "background").style("visibility", "hidden").style("cursor", "crosshair");
                m.enter().append("rect").attr("class", "extent").style("cursor", "move");
                l.enter().append("g").attr("class", function (a) {
                    return "resize " + a
                }).style("cursor", function (a) {
                    return pe[a]
                }).append("rect").attr("x", function (a) {
                    return /[ew]$/.test(a) ? -3 : null
                }).attr("y", function (a) {
                    return /^[ns]/.test(a) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
                l.style("display", a.empty() ? "none" : null);
                l.exit().remove();
                h && (m = ra(h),
                k.attr("x", m[0]).attr("width", m[1] - m[0]), c(g));
                i && (m = ra(i), k.attr("y", m[0]).attr("height", m[1] - m[0]), e(g));
                b(g)
            })
        }
        function b(a) {
            a.selectAll(".resize").attr("transform", function (a) {
                return "translate(" + k[+/e$/.test(a)][0] + "," + k[+/^s/.test(a)][1] + ")"
            })
        }
        function c(a) {
            a.select(".extent").attr("x", k[0][0]);
            a.selectAll(".extent,.n>rect,.s>rect").attr("width", k[1][0] - k[0][0])
        }
        function e(a) {
            a.select(".extent").attr("y", k[0][1]);
            a.selectAll(".extent,.e>rect,.w>rect").attr("height", k[1][1] - k[0][1])
        }
        function f() {
            function f() {
                var a = d3.event.changedTouches;
                return a ? d3.touches(p, a)[0] : d3.mouse(p)
            }
            function j() {
                var a = f(),
                    g = !1;
                xa && (a[0] += xa[0], a[1] += xa[1]);
                z || (d3.event.altKey ? (I || (I = [(k[0][0] + k[1][0]) / 2, (k[0][1] + k[1][1]) / 2]), u[0] = k[+(a[0] < I[0])][0], u[1] = k[+(a[1] < I[1])][1]) : I = null);
                w && n(a, h, 0) && (c(t), g = !0);
                A && n(a, i, 1) && (e(t), g = !0);
                g && (b(t), y({
                    type: "brush",
                    mode: z ? "move" : "resize"
                }))
            }
            function n(a, b, c) {
                var e = ra(b),
                    b = e[0],
                    f = e[1],
                    e = u[c],
                    g = k[1][c] - k[0][c];
                z && (b -= e, f -= g + e);
                a = Math.max(b, Math.min(f, a[c]));
                z ? b = (a += e) + g : (I && (e = Math.max(b, Math.min(f,
                2 * I[c] - a))), e < a ? (b = a, a = e) : b = e);
                if (k[0][c] !== a || k[1][c] !== b) return l = null, k[0][c] = a, k[1][c] = b, !0
            }
            function q() {
                j();
                t.style("pointer-events", "all").selectAll(".resize").style("display", a.empty() ? "none" : null);
                d3.select("body").style("cursor", null);
                x.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
                y({
                    type: "brushend"
                });
                G()
            }
            var p = this,
                r = d3.select(d3.event.target),
                y = g.of(p, arguments),
                t = d3.select(p),
                v = r.datum(),
                w = !/^(n|s)$/.test(v) && h,
                A = !/^(e|w)$/.test(v) && i,
                z = r.classed("extent"),
                I, u = f(),
                xa, x = d3.select(window).on("mousemove.brush", j).on("mouseup.brush", q).on("touchmove.brush", j).on("touchend.brush", q).on("keydown.brush", function () {
                    d3.event.keyCode == 32 && (z || (I = null, u[0] -= k[1][0], u[1] -= k[1][1], z = 2), G())
                }).on("keyup.brush", function () {
                    d3.event.keyCode == 32 && z == 2 && (u[0] += k[1][0], u[1] += k[1][1], z = 0, G())
                });
            if (z) u[0] = k[0][0] - u[0], u[1] = k[0][1] - u[1];
            else if (v) {
                var s = +/w$/.test(v),
                    v = +/^n/.test(v);
                xa = [k[1 - s][0] - u[0], k[1 - v][1] - u[1]];
                u[0] = k[s][0];
                u[1] = k[v][1]
            } else d3.event.altKey && (I = u.slice());
            t.style("pointer-events", "none").selectAll(".resize").style("display", null);
            d3.select("body").style("cursor", r.style("cursor"));
            y({
                type: "brushstart"
            });
            j();
            G()
        }
        var g = Ia(a, "brushstart", "brush", "brushend"),
            h = null,
            i = null,
            j = pb[0],
            k = [
                [0, 0],
                [0, 0]
            ],
            l;
        a.x = function (b) {
            if (!arguments.length) return h;
            h = b;
            j = pb[!h << 1 | !i];
            return a
        };
        a.y = function (b) {
            if (!arguments.length) return i;
            i = b;
            j = pb[!h << 1 | !i];
            return a
        };
        a.extent = function (b) {
            var c,
            e, f, g, j;
            if (!arguments.length) return b = l || k, h && (c = b[0][0], e = b[1][0], l || (c = k[0][0], e = k[1][0], h.invert && (c = h.invert(c), e = h.invert(e)), e < c && (j = c, c = e, e = j))), i && (f = b[0][1], g = b[1][1], l || (f = k[0][1], g = k[1][1], i.invert && (f = i.invert(f), g = i.invert(g)), g < f && (j = f, f = g, g = j))), h && i ? [
                [c, f],
                [e, g]
            ] : h ? [c, e] : i && [f, g];
            l = [
                [0, 0],
                [0, 0]
            ];
            h && (c = b[0], e = b[1], i && (c = c[0], e = e[0]), l[0][0] = c, l[1][0] = e, h.invert && (c = h(c), e = h(e)), e < c && (j = c, c = e, e = j), k[0][0] = c | 0, k[1][0] = e | 0);
            i && (f = b[0], g = b[1], h && (f = f[1], g = g[1]), l[0][1] = f, l[1][1] = g, i.invert && (f = i(f), g = i(g)), g < f && (j = f, f = g, g = j), k[0][1] = f | 0, k[1][1] = g | 0);
            return a
        };
        a.clear = function () {
            l = null;
            k[0][0] = k[0][1] = k[1][0] = k[1][1] = 0;
            return a
        };
        a.empty = function () {
            return h && k[0][0] === k[1][0] || i && k[0][1] === k[1][1]
        };
        return d3.rebind(a, g, "on")
    };
    var pe = {
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
    }, pb = ["n,e,s,w,nw,ne,se,sw".split(","), ["e", "w"],
        ["n", "s"],
        []
    ];
    d3.behavior = {};
    d3.behavior.drag = function () {
        function a() {
            this.on("mousedown.drag",
            b).on("touchstart.drag", b)
        }
        function b() {
            function a() {
                var b = j.parentNode,
                    c = d3.event.changedTouches;
                return c ? d3.touches(b, c)[0] : d3.mouse(b)
            }
            function b() {
                if (!j.parentNode) return h();
                var c = a(),
                    e = c[0] - o[0],
                    g = c[1] - o[1];
                n |= e | g;
                o = c;
                G();
                k({
                    type: "drag",
                    x: c[0] + m[0],
                    y: c[1] + m[1],
                    dx: e,
                    dy: g
                })
            }
            function h() {
                k({
                    type: "dragend"
                });
                if (n && (G(), d3.event.target === l)) q.on("click.drag", i, !0);
                q.on("mousemove.drag", null).on("touchmove.drag", null).on("mouseup.drag", null).on("touchend.drag", null)
            }
            function i() {
                G();
                q.on("click.drag",
                null)
            }
            var j = this,
                k = c.of(j, arguments),
                l = d3.event.target,
                m, o = a(),
                n = 0,
                q = d3.select(window).on("mousemove.drag", b).on("touchmove.drag", b).on("mouseup.drag", h, !0).on("touchend.drag", h, !0);
            e ? (m = e.apply(j, arguments), m = [m.x - o[0], m.y - o[1]]) : m = [0, 0];
            k({
                type: "dragstart"
            })
        }
        var c = Ia(a, "drag", "dragstart", "dragend"),
            e = null;
        a.origin = function (b) {
            if (!arguments.length) return e;
            e = b;
            return a
        };
        return d3.rebind(a, c, "on")
    };
    d3.behavior.zoom = function () {
        function a() {
            this.on("mousedown.zoom", g).on("mousewheel.zoom", h).on("mousemove.zoom",
            i).on("DOMMouseScroll.zoom", h).on("dblclick.zoom", j).on("touchstart.zoom", k).on("touchmove.zoom", l).on("touchend.zoom", k)
        }
        function b(a) {
            return [(a[0] - m[0]) / n, (a[1] - m[1]) / n]
        }
        function c(a) {
            n = Math.max(p[0], Math.min(p[1], a))
        }
        function e(a, b) {
            b = [b[0] * n + m[0], b[1] * n + m[1]];
            m[0] += a[0] - b[0];
            m[1] += a[1] - b[1]
        }
        function f(a) {
            t && t.domain(y.range().map(function (a) {
                return (a - m[0]) / n
            }).map(y.invert));
            w && w.domain(v.range().map(function (a) {
                return (a - m[1]) / n
            }).map(v.invert));
            d3.event.preventDefault();
            a({
                type: "zoom",
                scale: n,
                translate: m
            })
        }
        function g() {
            function a() {
                G();
                j.on("click.zoom", null)
            }
            var c = this,
                g = r.of(c, arguments),
                h = d3.event.target,
                i = 0,
                j = d3.select(window).on("mousemove.zoom", function () {
                    i = 1;
                    e(d3.mouse(c), k);
                    f(g)
                }).on("mouseup.zoom", function () {
                    i && G();
                    j.on("mousemove.zoom", null).on("mouseup.zoom", null);
                    if (i && d3.event.target === h) j.on("click.zoom", a)
                }),
                k = b(d3.mouse(c));
            window.focus();
            G()
        }
        function h() {
            o || (o = b(d3.mouse(this)));
            c(Math.pow(2, rd() * 0.002) * n);
            e(d3.mouse(this), o);
            f(r.of(this, arguments))
        }
        function i() {
            o = null
        }

        function j() {
            var a = d3.mouse(this),
                g = b(a);
            c(d3.event.shiftKey ? n / 2 : n * 2);
            e(a, g);
            f(r.of(this, arguments))
        }
        function k() {
            var a = d3.touches(this),
                g = Date.now();
            q = n;
            o = {};
            a.forEach(function (a) {
                o[a.identifier] = b(a)
            });
            G();
            if (a.length === 1 && g - A < 500) {
                var h = a[0],
                    a = b(a[0]);
                c(n * 2);
                e(h, a);
                f(r.of(this, arguments))
            }
            A = g
        }
        function l() {
            var a = d3.touches(this),
                b = a[0],
                g = o[b.identifier];
            if (a = a[1]) {
                var h = o[a.identifier],
                    b = [(b[0] + a[0]) / 2, (b[1] + a[1]) / 2],
                    g = [(g[0] + h[0]) / 2, (g[1] + h[1]) / 2];
                c(d3.event.scale * q)
            }
            e(b, g);
            f(r.of(this, arguments))
        }
        var m = [0, 0],
            o, n = 1,
            q, p = Gc,
            r = Ia(a, "zoom"),
            y, t, v, w, A;
        a.translate = function (b) {
            if (!arguments.length) return m;
            m = b.map(Number);
            return a
        };
        a.scale = function (b) {
            if (!arguments.length) return n;
            n = +b;
            return a
        };
        a.scaleExtent = function (b) {
            if (!arguments.length) return p;
            p = b == null ? Gc : b.map(Number);
            return a
        };
        a.x = function (b) {
            if (!arguments.length) return t;
            t = b;
            y = b.copy();
            return a
        };
        a.y = function (b) {
            if (!arguments.length) return w;
            w = b;
            v = b.copy();
            return a
        };
        return d3.rebind(a, r, "on")
    };
    var da, Gc = [0, Infinity];



    // D3 Layout
    d3.layout = {};
    d3.layout.bundle = function () {
        return function (a) {
            for (var b = [], c = -1, e = a.length; ++c < e; ) b.push(sd(a[c]));
            return b
        }
    };
    d3.layout.chord = function () {
        function a() {
            var a = {}, c = [],
                n = d3.range(h),
                q = [],
                p, r, y, t, v;
            e = [];
            f = [];
            for (p = 0, t = -1; ++t < h; ) {
                for (r = 0, v = -1; ++v < h; ) r += g[t][v];
                c.push(r);
                q.push(d3.range(h));
                p += r
            }
            j && n.sort(function (a, b) {
                return j(c[a], c[b])
            });
            k && q.forEach(function (a, b) {
                a.sort(function (a, c) {
                    return k(g[b][a], g[b][c])
                })
            });
            p = (2 * Math.PI - i * h) / p;
            for (r = 0, t = -1; ++t < h; ) {
                for (y = r, v = -1; ++v < h; ) {
                    var w = n[t],
                        A = q[w][v],
                        z = g[w][A],
                        I = r,
                        u = r += z * p;
                    a[w + "-" + A] = {
                        index: w,
                        subindex: A,
                        startAngle: I,
                        endAngle: u,
                        value: z
                    }
                }
                f.push({
                    index: w,
                    startAngle: y,
                    endAngle: r,
                    value: (r - y) / p
                });
                r += i
            }
            for (t = -1; ++t < h; ) for (v = t - 1; ++v < h; ) if (n = a[t + "-" + v], q = a[v + "-" + t], n.value || q.value) e.push(n.value < q.value ? {
                source: q,
                target: n
            } : {
                source: n,
                target: q
            });
            l && b()
        }
        function b() {
            e.sort(function (a, b) {
                return l((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2)
            })
        }
        var c = {}, e, f, g, h, i = 0,
            j, k, l;
        c.matrix = function (a) {
            if (!arguments.length) return g;
            h = (g = a) && g.length;
            e = f = null;
            return c
        };
        c.padding = function (a) {
            if (!arguments.length) return i;
            i = a;
            e = f = null;
            return c
        };
        c.sortGroups = function (a) {
            if (!arguments.length) return j;
            j = a;
            e = f = null;
            return c
        };
        c.sortSubgroups = function (a) {
            if (!arguments.length) return k;
            k = a;
            e = null;
            return c
        };
        c.sortChords = function (a) {
            if (!arguments.length) return l;
            l = a;
            e && b();
            return c
        };
        c.chords = function () {
            e || a();
            return e
        };
        c.groups = function () {
            f || a();
            return f
        };
        return c
    };
    d3.layout.force = function () {
        function a(a) {
            return function (b, c, e, f) {
                if (b.point !== a) {
                    var e = b.cx - a.x,
                        g = b.cy - a.y,
                        h = 1 / Math.sqrt(e * e + g * g);
                    if ((f - c) * h < o) return c = b.charge * h * h, a.px -= e * c, a.py -= g * c, !0;
                    b.point && isFinite(h) && (c = b.pointCharge * h * h, a.px -= e * c, a.py -= g * c)
                }
                return !b.charge
            }
        }
        function b(a) {
            lc(Z = a);
            $a = c
        }
        var c = {}, e = d3.dispatch("start", "tick", "end"),
            f = [1, 1],
            g, h, i = 0.9,
            j = wd,
            k = xd,
            l = -30,
            m = 0.1,
            o = 0.8,
            n = [],
            q = [],
            p, r, y;
        c.tick = function () {
            if ((h *= 0.99) < 0.005) return e.end({
                type: "end",
                alpha: h = 0
            }), !0;
            var b = n.length,
                c = q.length,
                g, j, k, o, u, s, x;
            for (g = 0; g < c; ++g) if (j = q[g], k = j.source, o = j.target, s = o.x - k.x, x = o.y - k.y, u = s * s + x * x) u = h * r[g] * ((u = Math.sqrt(u)) - p[g]) / u, s *= u, x *= u, o.x -= s * (u = k.weight / (o.weight + k.weight)), o.y -= x * u, k.x += s * (u = 1 - u), k.y += x * u;
            if (u = h * m) if (s = f[0] / 2, x = f[1] / 2, g = -1, u) for (; ++g < b; ) j = n[g], j.x += (s - j.x) * u, j.y += (x - j.y) * u;
            if (l) {
                mc(c = d3.geom.quadtree(n), h, y);
                for (g = -1; ++g < b; ) (j = n[g]).fixed || c.visit(a(j))
            }
            for (g = -1; ++g < b; ) j = n[g], j.fixed ? (j.x = j.px, j.y = j.py) : (j.x -= (j.px - (j.px = j.x)) * i, j.y -= (j.py - (j.py = j.y)) * i);
            e.tick({
                type: "tick",
                alpha: h
            })
        };
        c.nodes = function (a) {
            if (!arguments.length) return n;
            n = a;
            return c
        };
        c.links = function (a) {
            if (!arguments.length) return q;
            q = a;
            return c
        };
        c.size = function (a) {
            if (!arguments.length) return f;
            f = a;
            return c
        };
        c.linkDistance = function (a) {
            if (!arguments.length) return j;
            j = d3.functor(a);
            return c
        };
        c.distance = c.linkDistance;
        c.linkStrength = function (a) {
            if (!arguments.length) return k;
            k = d3.functor(a);
            return c
        };
        c.friction = function (a) {
            if (!arguments.length) return i;
            i = a;
            return c
        };
        c.charge = function (a) {
            if (!arguments.length) return l;
            l = typeof a === "function" ? a : +a;
            return c
        };
        c.gravity = function (a) {
            if (!arguments.length) return m;
            m = a;
            return c
        };
        c.theta = function (a) {
            if (!arguments.length) return o;
            o = a;
            return c
        };
        c.alpha = function (a) {
            if (!arguments.length) return h;
            h ? h = a > 0 ? a : 0 : a > 0 && (e.start({
                type: "start",
                alpha: h = a
            }), d3.timer(c.tick));
            return c
        };
        c.start = function () {
            function a(c, f) {
                var i;
                if (!o) {
                    o = [];
                    for (e = 0; e < g; ++e) o[e] = [];
                    for (e = 0; e < h; ++e) i = q[e], o[i.source.index].push(i.target), o[i.target.index].push(i.source)
                }
                i = o[b];
                for (var j = -1, k = i.length, n; ++j < k; ) if (!isNaN(n = i[j][c])) return n;
                return Math.random() * f
            }
            var b, e, g = n.length,
                h = q.length,
                i = f[0],
                m = f[1],
                o, x;
            for (b = 0; b < g; ++b) (x = n[b]).index = b, x.weight = 0;
            p = [];
            r = [];
            for (b = 0; b < h; ++b) {
                x = q[b];
                if (typeof x.source == "number") x.source = n[x.source];
                if (typeof x.target == "number") x.target = n[x.target];
                p[b] = j.call(this, x, b);
                r[b] = k.call(this, x, b);
                ++x.source.weight;
                ++x.target.weight
            }
            for (b = 0; b < g; ++b) {
                x = n[b];
                if (isNaN(x.x)) x.x = a("x", i);
                if (isNaN(x.y)) x.y = a("y", m);
                if (isNaN(x.px)) x.px = x.x;
                if (isNaN(x.py)) x.py = x.y
            }
            y = [];
            if (typeof l === "function") for (b = 0; b < g; ++b) y[b] = +l.call(this, n[b], b);
            else for (b = 0; b < g; ++b) y[b] = l;
            return c.resume()
        };
        c.resume = function () {
            return c.alpha(0.1)
        };
        c.stop = function () {
            return c.alpha(0)
        };
        c.drag = function () {
            g || (g = d3.behavior.drag().origin(Object).on("dragstart", b).on("drag", vd).on("dragend", ud));
            this.on("mouseover.force", lc).on("mouseout.force", td).call(g)
        };
        return d3.rebind(c, e, "on")
    };
    var $a, Z;
    d3.layout.partition = function () {
        function a(b, c, e, f) {
            var k = b.children;
            b.x = c;
            b.y = b.depth * f;
            b.dx = e;
            b.dy = f;
            if (k && (m = k.length)) for (var l = -1, m, o, e = b.value ? e / b.value : 0; ++l < m; ) a(o = k[l], c, b = o.value * e, f), c += b
        }
        function b(a) {
            var a = a.children,
                c = 0;
            if (a && (f = a.length)) for (var e = -1, f; ++e < f; ) c = Math.max(c, b(a[e]));
            return 1 + c
        }
        function c(c, h) {
            var i = e.call(this, c, h);
            a(i[0], 0, f[0], f[1] / b(i[0]));
            return i
        }
        var e = d3.layout.hierarchy(),
            f = [1, 1];
        c.size = function (a) {
            if (!arguments.length) return f;
            f = a;
            return c
        };
        return ea(c, e)
    };
    d3.layout.pie = function () {
        function a(g, h) {
            var i = g.map(function (c, e) {
                return +b.call(a, c, e)
            }),
                j = +(typeof e === "function" ? e.apply(this, arguments) : e),
                k = ((typeof f === "function" ? f.apply(this, arguments) : f) - e) / d3.sum(i),
                l = d3.range(g.length);
            c != null && l.sort(c === Hc ? function (a, b) {
                return i[b] - i[a]
            } : function (a, b) {
                return c(g[a],
                g[b])
            });
            var m = [];
            l.forEach(function (a) {
                m[a] = {
                    data: g[a],
                    value: d = i[a],
                    startAngle: j,
                    endAngle: j += d * k
                }
            });
            return m
        }
        var b = Number,
            c = Hc,
            e = 0,
            f = 2 * Math.PI;
        a.value = function (c) {
            if (!arguments.length) return b;
            b = c;
            return a
        };
        a.sort = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        a.startAngle = function (b) {
            if (!arguments.length) return e;
            e = b;
            return a
        };
        a.endAngle = function (b) {
            if (!arguments.length) return f;
            f = b;
            return a
        };
        return a
    };
    var Hc = {};
    d3.layout.stack = function () {
        function a(i, j) {
            var k = i.map(function (c, e) {
                return b.call(a,
                c, e)
            }),
                l = k.map(function (b) {
                    return b.map(function (b, c) {
                        return [g.call(a, b, c), h.call(a, b, c)]
                    })
                }),
                m = c.call(a, l, j),
                k = d3.permute(k, m),
                l = d3.permute(l, m),
                m = e.call(a, l, j),
                o = k.length,
                n = k[0].length,
                q, p, r;
            for (p = 0; p < n; ++p) {
                f.call(a, k[0][p], r = m[p], l[0][p][1]);
                for (q = 1; q < o; ++q) f.call(a, k[q][p], r += l[q - 1][p][1], l[q][p][1])
            }
            return i
        }
        var b = Object,
            c = ab,
            e = bb,
            f = Ad,
            g = yd,
            h = zd;
        a.values = function (c) {
            if (!arguments.length) return b;
            b = c;
            return a
        };
        a.order = function (b) {
            if (!arguments.length) return c;
            c = typeof b === "function" ? b : qe.get(b) || ab;
            return a
        };
        a.offset = function (b) {
            if (!arguments.length) return e;
            e = typeof b === "function" ? b : re.get(b) || bb;
            return a
        };
        a.x = function (b) {
            if (!arguments.length) return g;
            g = b;
            return a
        };
        a.y = function (b) {
            if (!arguments.length) return h;
            h = b;
            return a
        };
        a.out = function (b) {
            if (!arguments.length) return f;
            f = b;
            return a
        };
        return a
    };
    var qe = d3.map({
        "inside-out": function (a) {
            for (var b = a.length, c, e = a.map(Bd), f = a.map(Cd), g = d3.range(b).sort(function (a, b) {
                return e[a] - e[b]
            }), h = 0, i = 0, j = [], k = [], a = 0; a < b; ++a) c = g[a], h < i ? (h += f[c], j.push(c)) : (i += f[c], k.push(c));
            return k.reverse().concat(j)
        },
        reverse: function (a) {
            return d3.range(a.length).reverse()
        },
        "default": ab
    }),
        re = d3.map({
            silhouette: function (a) {
                var b = a.length,
                    c = a[0].length,
                    e = [],
                    f = 0,
                    g, h, i, j = [];
                for (h = 0; h < c; ++h) {
                    for (g = 0, i = 0; g < b; g++) i += a[g][h][1];
                    i > f && (f = i);
                    e.push(i)
                }
                for (h = 0; h < c; ++h) j[h] = (f - e[h]) / 2;
                return j
            },
            wiggle: function (a) {
                var b = a.length,
                    c = a[0],
                    e = c.length,
                    f, g, h, i, j, k, l, m, o, n = [];
                n[0] = m = o = 0;
                for (g = 1; g < e; ++g) {
                    for (f = 0, i = 0; f < b; ++f) i += a[f][g][1];
                    for (f = 0, j = 0, l = c[g][0] - c[g - 1][0]; f < b; ++f) {
                        for (h = 0, k = (a[f][g][1] - a[f][g - 1][1]) / (2 * l); h < f; ++h) k += (a[h][g][1] - a[h][g - 1][1]) / l;
                        j += k * a[f][g][1]
                    }
                    n[g] = m -= i ? j / i * l : 0;
                    m < o && (o = m)
                }
                for (g = 0; g < e; ++g) n[g] -= o;
                return n
            },
            expand: function (a) {
                var b = a.length,
                    c = a[0].length,
                    e = 1 / b,
                    f, g, h, i = [];
                for (g = 0; g < c; ++g) {
                    for (f = 0, h = 0; f < b; f++) h += a[f][g][1];
                    if (h) for (f = 0; f < b; f++) a[f][g][1] /= h;
                    else for (f = 0; f < b; f++) a[f][g][1] = e
                }
                for (g = 0; g < c; ++g) i[g] = 0;
                return i
            },
            zero: bb
        });
    d3.layout.histogram = function () {
        function a(a, h) {
            for (var i = [], j = a.map(c, this), k = e.call(this, j, h), l = f.call(this, k, j, h), m, h = -1, o = j.length, n = l.length - 1, q = b ? 1 : 1 / o; ++h < n; ) m = i[h] = [], m.dx = l[h + 1] - (m.x = l[h]), m.y = 0;
            for (h = -1; ++h < o; ) m = j[h], m >= k[0] && m <= k[1] && (m = i[d3.bisect(l, m, 1, n) - 1], m.y += q, m.push(a[h]));
            return i
        }
        var b = !0,
            c = Number,
            e = Fd,
            f = Ed;
        a.value = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        a.range = function (b) {
            if (!arguments.length) return e;
            e = d3.functor(b);
            return a
        };
        a.bins = function (b) {
            if (!arguments.length) return f;
            f = typeof b === "number" ? function (a) {
                return nc(a, b)
            } : d3.functor(b);
            return a
        };
        a.frequency = function (c) {
            if (!arguments.length) return b;
            b = !!c;
            return a
        };
        return a
    };
    d3.layout.hierarchy = function () {
        function a(b, i, j) {
            var k = f.call(c, b, i),
                l = cb ? b : {
                    data: b
                };
            l.depth = i;
            j.push(l);
            if (k && (m = k.length)) {
                var b = -1,
                    m, o = l.children = [],
                    n = 0;
                for (i += 1; ++b < m; ) d = a(k[b], i, j), d.parent = l, o.push(d), n += d.value;
                e && o.sort(e);
                if (g) l.value = n
            } else if (g) l.value = +g.call(c, b, i) || 0;
            return l
        }
        function b(a, e) {
            var f = a.children,
                k = 0;
            if (f && (m = f.length)) for (var l = -1, m, o = e + 1; ++l < m; ) k += b(f[l], o);
            else g && (k = +g.call(c, cb ? a : a.data, e) || 0);
            if (g) a.value = k;
            return k
        }
        function c(b) {
            var c = [];
            a(b, 0, c);
            return c
        }
        var e = Jd,
            f = Hd,
            g = Id;
        c.sort = function (a) {
            if (!arguments.length) return e;
            e = a;
            return c
        };
        c.children = function (a) {
            if (!arguments.length) return f;
            f = a;
            return c
        };
        c.value = function (a) {
            if (!arguments.length) return g;
            g = a;
            return c
        };
        c.revalue = function (a) {
            b(a, 0);
            return a
        };
        return c
    };
    var cb = !1;
    d3.layout.pack = function () {
        function a(a, f) {
            var g = b.call(this, a, f),
                h = g[0];
            h.x = 0;
            h.y = 0;
            rc(h);
            var i = c[0],
                j = c[1],
                k = 1 / Math.max(2 * h.r / i, 2 * h.r / j);
            sc(h, i / 2, j / 2, k);
            return g
        }
        var b = d3.layout.hierarchy().sort(Kd),
            c = [1, 1];
        a.size = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        return ea(a, b)
    };
    d3.layout.cluster = function () {
        function a(a, g) {
            var h = b.call(this, a, g),
                i = h[0],
                j, k = 0;
            wa(i, function (a) {
                var b = a.children;
                b && b.length ? (a.x = Pd(b), a.y = Od(b)) : (a.x = j ? k += c(a, j) : 0, a.y = 0, j = a)
            });
            var l = tc(i),
                m = uc(i),
                o = l.x - c(l, m) / 2,
                n = m.x + c(m, l) / 2;
            wa(i, function (a) {
                a.x = (a.x - o) / (n - o) * e[0];
                a.y = (1 - (i.y ? a.y / i.y : 1)) * e[1]
            });
            return h
        }
        var b = d3.layout.hierarchy().sort(null).value(null),
            c = vc,
            e = [1, 1];
        a.separation = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        a.size = function (b) {
            if (!arguments.length) return e;
            e = b;
            return a
        };
        return ea(a, b)
    };
    d3.layout.tree = function () {
        function a(a, g) {
            function h(a, b) {
                var e = a.children,
                    f = a._tree;
                if (e && (g = e.length)) {
                    for (var g, i = e[0], j, k = i, n, l = -1; ++l < g; ) {
                        n = e[l];
                        h(n, j);
                        var m = n;
                        if (j) {
                            for (var p = m, o = m, q = m.parent.children[0], s = p._tree.mod, B = o._tree.mod, C = j._tree.mod, E = q._tree.mod, D = void 0; j = fb(j), p = eb(p), j && p; ) {
                                q = eb(q);
                                o = fb(o);
                                o._tree.ancestor = m;
                                D = j._tree.prelim + C - p._tree.prelim - s + c(j, p);
                                if (D > 0) {
                                    var G = j._tree.ancestor.parent == m.parent ? j._tree.ancestor : k,
                                        F = m,
                                        H = D,
                                        G = G._tree,
                                        F = F._tree,
                                        J = H / (F.number - G.number);
                                    G.change += J;
                                    F.change -= J;
                                    F.shift += H;
                                    F.prelim += H;
                                    F.mod += H;
                                    s += D;
                                    B += D
                                }
                                C += j._tree.mod;
                                s += p._tree.mod;
                                E += q._tree.mod;
                                B += o._tree.mod
                            }
                            if (j && !fb(o)) o._tree.thread = j, o._tree.mod += C - B;
                            if (p && !eb(q)) q._tree.thread = p, q._tree.mod += s - E, k = m
                        }
                        j = n
                    }
                    g = e = 0;
                    l = a.children;
                    for (m = l.length; --m >= 0; ) k = l[m]._tree, k.prelim += e, k.mod += e, e += k.shift + (g += k.change);
                    i = 0.5 * (i._tree.prelim + n._tree.prelim);
                    b ? (f.prelim = b._tree.prelim + c(a, b), f.mod = f.prelim - i) : f.prelim = i
                } else if (b) f.prelim = b._tree.prelim + c(a, b)
            }
            function i(a, b) {
                a.x = a._tree.prelim + b;
                var c = a.children;
                if (c && (f = c.length)) {
                    var e = -1,
                        f;
                    for (b += a._tree.mod; ++e < f; ) i(c[e], b)
                }
            }
            var j = b.call(this, a, g),
                k = j[0];
            wa(k, function (a, b) {
                a._tree = {
                    ancestor: a,
                    prelim: 0,
                    mod: 0,
                    change: 0,
                    shift: 0,
                    number: b ? b._tree.number + 1 : 0
                }
            });
            h(k);
            i(k, -k._tree.prelim);
            var l = va(k, Rd),
                m = va(k, Qd),
                o = va(k, Sd),
                n = l.x - c(l, m) / 2,
                q = m.x + c(m, l) / 2,
                p = o.depth || 1;
            wa(k, function (a) {
                a.x = (a.x - n) / (q - n) * e[0];
                a.y = a.depth / p * e[1];
                delete a._tree
            });
            return j
        }
        var b = d3.layout.hierarchy().sort(null).value(null),
            c = vc,
            e = [1, 1];
        a.separation = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        a.size = function (b) {
            if (!arguments.length) return e;
            e = b;
            return a
        };
        return ea(a, b)
    };
    d3.layout.treemap = function () {
        function a(a, b) {
            for (var c = -1, e = a.length, f, g; ++c < e; ) g = (f = a[c]).value * (b < 0 ? 0 : b), f.area = isNaN(g) || g <= 0 ? 0 : g
        }
        function b(c) {
            var f = c.children;
            if (f && f.length) {
                var g = k(c),
                    h = [],
                    i = f.slice(),
                    j = Infinity,
                    l = Math.min(g.dx, g.dy);
                a(i, g.dx * g.dy / c.value);
                for (h.area = 0;
                (c = i.length) > 0; ) {
                    h.push(c = i[c - 1]);
                    h.area += c.area;
                    for (var c = l, m = h.area, A = void 0, z = 0, s = Infinity, u = -1, B = h.length; ++u < B; ) if (A = h[u].area) A < s && (s = A), A > z && (z = A);
                    m *= m;
                    c *= c;
                    (c = m ? Math.max(c * z * o / m, m / (c * s * o)) : Infinity) <= j ? (i.pop(), j = c) : (h.area -= h.pop().area, e(h, l, g, !1), l = Math.min(g.dx, g.dy), h.length = h.area = 0, j = Infinity)
                }
                if (h.length) e(h, l, g, !0), h.length = h.area = 0;
                f.forEach(b)
            }
        }
        function c(b) {
            var f = b.children;
            if (f && f.length) {
                var g = k(b),
                    h = f.slice(),
                    i = [];
                a(h, g.dx * g.dy / b.value);
                for (i.area = 0; b = h.pop(); ) if (i.push(b), i.area += b.area, b.z != null) e(i, b.z ? g.dx : g.dy, g, !h.length), i.length = i.area = 0;
                f.forEach(c)
            }
        }
        function e(a, b, c, e) {
            var f = -1,
                g = a.length,
                i = c.x,
                j = c.y,
                k = b ? h(a.area / b) : 0,
                l;
            if (b == c.dx) {
                if (e || k > c.dy) k = c.dy;
                for (; ++f < g; ) l = a[f], l.x = i, l.y = j, l.dy = k, i += l.dx = Math.min(c.x + c.dx - i, k ? h(l.area / k) : 0);
                l.z = !0;
                l.dx += c.x + c.dx - i;
                c.y += k;
                c.dy -= k
            } else {
                if (e || k > c.dx) k = c.dx;
                for (; ++f < g; ) l = a[f], l.x = i, l.y = j, l.dx = k, j += l.dy = Math.min(c.y + c.dy - j, k ? h(l.area / k) : 0);
                l.z = !1;
                l.dy += c.y + c.dy - j;
                c.x += k;
                c.dx -= k
            }
        }
        function f(e) {
            var e = m || g(e),
                f = e[0];
            f.x = 0;
            f.y = 0;
            f.dx = i[0];
            f.dy = i[1];
            m && g.revalue(f);
            a([f], f.dx * f.dy / f.value);
            (m ? c : b)(f);
            l && (m = e);
            return e
        }
        var g = d3.layout.hierarchy(),
            h = Math.round,
            i = [1, 1],
            j = null,
            k = gb,
            l = !1,
            m, o = 0.5 * (1 + Math.sqrt(5));
        f.size = function (a) {
            if (!arguments.length) return i;
            i = a;
            return f
        };
        f.padding = function (a) {
            function b(c) {
                var e = a.call(f, c, c.depth);
                return e == null ? gb(c) : wc(c, typeof e === "number" ? [e, e, e, e] : e)
            }
            function c(b) {
                return wc(b, a)
            }
            if (!arguments.length) return j;
            var e;
            k = (j = a) == null ? gb : (e = typeof a) === "function" ? b : e === "number" ? (a = [a, a, a, a], c) : c;
            return f
        };
        f.round = function (a) {
            if (!arguments.length) return h != Number;
            h = a ? Math.round : Number;
            return f
        };
        f.sticky = function (a) {
            if (!arguments.length) return l;
            l = a;
            m = null;
            return f
        };
        f.ratio = function (a) {
            if (!arguments.length) return o;
            o = a;
            return f
        };
        return ea(f, g)
    };



// D3 Geometry
    d3.geom = {};
    d3.geom.contour = function (a, b) {
        var c;
        if (!(c = b))a: 
        {
            for (var e = c = 0; ; ) {
                if (a(c, e)) {
                    c = [c, e];
                    break a
                }
                c === 0 ? (c = e + 1, e = 0) : (c -= 1, e += 1)
            }
            c = void 0
        }
        var e = [],
            f = c[0],
            g = c[1],
            h = 0,
            i = 0,
            j = NaN,
            k = NaN,
            i = 0;
        do i = 0, a(f - 1, g - 1) && (i += 1), a(f, g - 1) && (i += 2), a(f - 1, g) && (i += 4), a(f, g) && (i += 8), i === 6 ? (h = k === -1 ? -1 : 1, i = 0) : i === 9 ? (h = 0, i = j === 1 ? -1 : 1) : (h = se[i], i = te[i]), h != j && i != k && (e.push([f, g]), j = h, k = i), f += h, g += i;
        while (c[0] != f || c[1] != g);
        return e
    };
    var se = [1, 0, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, -1, 0, -1, NaN],
        te = [0, -1, 0, 0, 0, -1, 0, 0, 1, -1, 1, 1, 0, -1, 0, NaN];
    d3.geom.hull = function (a) {
        if (a.length < 3) return [];
        var b = a.length,
            c = b - 1,
            e = [],
            f = [],
            g, h = 0,
            i, j, k, l, m, o, n;
        for (g = 1; g < b; ++g) a[g][1] < a[h][1] ? h = g : a[g][1] == a[h][1] && (h = a[g][0] < a[h][0] ? g : h);
        for (g = 0; g < b; ++g) g !== h && (j = a[g][1] - a[h][1], i = a[g][0] - a[h][0], e.push({
            angle: Math.atan2(j, i),
            index: g
        }));
        e.sort(function (a, b) {
            return a.angle - b.angle
        });
        n = e[0].angle;
        o = e[0].index;
        m = 0;
        for (g = 1; g < c; ++g) b = e[g].index, n == e[g].angle ? (i = a[o][0] - a[h][0], j = a[o][1] - a[h][1], k = a[b][0] - a[h][0], l = a[b][1] - a[h][1], i * i + j * j >= k * k + l * l ? e[g].index = -1 : (e[m].index = -1, n = e[g].angle, m = g, o = b)) : (n = e[g].angle, m = g, o = b);
        f.push(h);
        for (g = 0, b = 0; g < 2; ++b) e[b].index !== -1 && (f.push(e[b].index), g++);
        for (h = f.length; b < c; ++b) if (e[b].index !== -1) {
            for (; !Td(f[h - 2], f[h - 1], e[b].index, a); ) --h;
            f[h++] = e[b].index
        }
        c = [];
        for (g = 0; g < h; ++g) c.push(a[f[g]]);
        return c
    };
    d3.geom.polygon = function (a) {
        a.area = function () {
            for (var b = 0, c = a.length, e = a[c - 1][0] * a[0][1], f = a[c - 1][1] * a[0][0]; ++b < c; ) e += a[b - 1][0] * a[b][1], f += a[b - 1][1] * a[b][0];
            return (f - e) * 0.5
        };
        a.centroid = function (b) {
            var c = -1,
                e = a.length,
                f = 0,
                g = 0,
                h, i = a[e - 1],
                j;
            for (arguments.length || (b = -1 / (6 * a.area())); ++c < e; ) h = i, i = a[c], j = h[0] * i[1] - i[0] * h[1], f += (h[0] + i[0]) * j, g += (h[1] + i[1]) * j;
            return [f * b, g * b]
        };
        a.clip = function (b) {
            for (var c, e = -1, f = a.length, g, h, i = a[f - 1], j, k, l; ++e < f; ) {
                c = b.slice();
                b.length = 0;
                j = a[e];
                k = c[(h = c.length) - 1];
                for (g = -1; ++g < h; ) l = c[g], hb(l, i, j) ? (hb(k, i, j) || b.push(xc(k, l, i, j)), b.push(l)) : hb(k, i, j) && b.push(xc(k, l, i, j)), k = l;
                i = j
            }
            return b
        };
        return a
    };
    d3.geom.voronoi = function (a) {
        var b = a.map(function () {
            return []
        });
        yc(a, function (a) {
            var e, f, g, h;
            a.a === 1 && a.b >= 0 ? (e = a.ep.r, f = a.ep.l) : (e = a.ep.l, f = a.ep.r);
            a.a === 1 ? (g = e ? e.y : -1E6, e = a.c - a.b * g, h = f ? f.y : 1E6, f = a.c - a.b * h) : (e = e ? e.x : -1E6, g = a.c - a.a * e, f = f ? f.x : 1E6, h = a.c - a.a * f);
            e = [e, g];
            f = [f, h];
            b[a.region.l.index].push(e, f);
            b[a.region.r.index].push(e, f)
        });
        return b.map(function (b, e) {
            var f = a[e][0],
                g = a[e][1];
            b.forEach(function (a) {
                a.angle = Math.atan2(a[0] - f, a[1] - g)
            });
            return b.sort(function (a, b) {
                return a.angle - b.angle
            }).filter(function (a, e) {
                return !e || a.angle - b[e - 1].angle > 1.0E-10
            })
        })
    };
    var ib = {
        l: "r",
        r: "l"
    };
    d3.geom.delaunay = function (a) {
        var b = a.map(function () {
            return []
        }),
            c = [];
        yc(a, function (c) {
            b[c.region.l.index].push(a[c.region.r.index])
        });
        b.forEach(function (b, f) {
            var g = a[f],
                h = g[0],
                i = g[1];
            b.forEach(function (a) {
                a.angle = Math.atan2(a[0] - h, a[1] - i)
            });
            b.sort(function (a, b) {
                return a.angle - b.angle
            });
            for (var j = 0, k = b.length - 1; j < k; j++) c.push([g, b[j],
            b[j + 1]])
        });
        return c
    };
    d3.geom.quadtree = function (a, b, c, e, f) {
        function g(a, b, c, e, f, g) {
            if (!isNaN(b.x) && !isNaN(b.y)) if (a.leaf) {
                var i = a.point;
                if (i) {
                    if (!(Math.abs(i.x - b.x) + Math.abs(i.y - b.y) < 0.01)) a.point = null, h(a, i, c, e, f, g);
                    h(a, b, c, e, f, g)
                } else a.point = b
            } else h(a, b, c, e, f, g)
        }
        function h(a, b, c, e, f, h) {
            var i = (c + f) * 0.5,
                j = (e + h) * 0.5,
                k = b.x >= i,
                l = b.y >= j,
                s = (l << 1) + k;
            a.leaf = !1;
            a = a.nodes[s] || (a.nodes[s] = {
                leaf: !0,
                nodes: [],
                point: null
            });
            k ? c = i : f = i;
            l ? e = j : h = j;
            g(a, b, c, e, f, h)
        }
        var i, j = -1,
            k = a.length;
        k && isNaN(a[0].x) && (a = a.map(Ud));
        if (arguments.length < 5) if (arguments.length === 3) f = e = c, c = b;
        else {
            b = c = Infinity;
            for (e = f = -Infinity; ++j < k; ) {
                i = a[j];
                if (i.x < b) b = i.x;
                if (i.y < c) c = i.y;
                if (i.x > e) e = i.x;
                if (i.y > f) f = i.y
            }
            i = e - b;
            j = f - c;
            i > j ? f = c + i : e = b + j
        }
        var l = {
            leaf: !0,
            nodes: [],
            point: null
        };
        l.add = function (a) {
            g(l, a, b, c, e, f)
        };
        l.visit = function (a) {
            fa(a, l, b, c, e, f)
        };
        a.forEach(l.add);
        return l
    };



    // D3 Time
    d3.time = {};
    var C = Date;
    U.prototype = {
        getDate: function () {
            return this._.getUTCDate()
        },
        getDay: function () {
            return this._.getUTCDay()
        },
        getFullYear: function () {
            return this._.getUTCFullYear()
        },
        getHours: function () {
            return this._.getUTCHours()
        },
        getMilliseconds: function () {
            return this._.getUTCMilliseconds()
        },
        getMinutes: function () {
            return this._.getUTCMinutes()
        },
        getMonth: function () {
            return this._.getUTCMonth()
        },
        getSeconds: function () {
            return this._.getUTCSeconds()
        },
        getTime: function () {
            return this._.getTime()
        },
        getTimezoneOffset: function () {
            return 0
        },
        valueOf: function () {
            return this._.valueOf()
        },
        setDate: function () {
            K.setUTCDate.apply(this._, arguments)
        },
        setDay: function () {
            K.setUTCDay.apply(this._, arguments)
        },
        setFullYear: function () {
            K.setUTCFullYear.apply(this._, arguments)
        },
        setHours: function () {
            K.setUTCHours.apply(this._, arguments)
        },
        setMilliseconds: function () {
            K.setUTCMilliseconds.apply(this._, arguments)
        },
        setMinutes: function () {
            K.setUTCMinutes.apply(this._, arguments)
        },
        setMonth: function () {
            K.setUTCMonth.apply(this._, arguments)
        },
        setSeconds: function () {
            K.setUTCSeconds.apply(this._, arguments)
        },
        setTime: function () {
            K.setTime.apply(this._, arguments)
        }
    };
    var K = Date.prototype;
    d3.time.format = function (a) {
        function b(b) {
            for (var f = [], g = -1, h = 0, i, j; ++g < c; ) a.charCodeAt(g) == 37 && (f.push(a.substring(h, g), (j = Da[i = a.charAt(++g)]) ? j(b) : i), h = g + 1);
            f.push(a.substring(h, g));
            return f.join("")
        }
        var c = a.length;
        b.parse = function (b) {
            var c = {
                y: 1900,
                m: 0,
                d: 1,
                H: 0,
                M: 0,
                S: 0,
                L: 0
            };
            if (ya(c, a, b, 0) != b.length) return null;
            if ("p" in c) c.H = c.H % 12 + c.p * 12;
            b = new C;
            b.setFullYear(c.y, c.m, c.d);
            b.setHours(c.H, c.M, c.S, c.L);
            return b
        };
        b.toString = function () {
            return a
        };
        return b
    };
    var F = d3.format("02d"),
        Ic = d3.format("03d"),
        ue = d3.format("04d"),
        ve = d3.format("2d"),
        Da = {
            a: function (a) {
                return d3_time_weekdays[a.getDay()].substring(0,
                3)
            },
            A: function (a) {
                return d3_time_weekdays[a.getDay()]
            },
            b: function (a) {
                return Jc[a.getMonth()].substring(0, 3)
            },
            B: function (a) {
                return Jc[a.getMonth()]
            },
            c: d3.time.format("%a %b %e %H:%M:%S %Y"),
            d: function (a) {
                return F(a.getDate())
            },
            e: function (a) {
                return ve(a.getDate())
            },
            H: function (a) {
                return F(a.getHours())
            },
            I: function (a) {
                return F(a.getHours() % 12 || 12)
            },
            j: function (a) {
                return Ic(1 + d3.time.dayOfYear(a))
            },
            L: function (a) {
                return Ic(a.getMilliseconds())
            },
            m: function (a) {
                return F(a.getMonth() + 1)
            },
            M: function (a) {
                return F(a.getMinutes())
            },
            p: function (a) {
                return a.getHours() >= 12 ? "PM" : "AM"
            },
            S: function (a) {
                return F(a.getSeconds())
            },
            U: function (a) {
                return F(d3.time.sundayOfYear(a))
            },
            w: function (a) {
                return a.getDay()
            },
            W: function (a) {
                return F(d3.time.mondayOfYear(a))
            },
            x: d3.time.format("%m/%d/%y"),
            X: d3.time.format("%H:%M:%S"),
            y: function (a) {
                return F(a.getFullYear() % 100)
            },
            Y: function (a) {
                return ue(a.getFullYear() % 1E4)
            },
            Z: function (a) {
                var b = a.getTimezoneOffset(),
                    a = b > 0 ? "-" : "+",
                    c = ~ ~(Math.abs(b) / 60),
                    b = Math.abs(b) % 60;
                return a + F(c) + F(b)
            },
            "%": function () {
                return "%"
            }
        },
        Vd = {
            a: function (a, b, c) {
                return we.test(b.substring(c, c += 3)) ? c : -1
            },
            A: function (a, b, c) {
                Kc.lastIndex = 0;
                return (a = Kc.exec(b.substring(c, c + 10))) ? c + a[0].length : -1
            },
            b: function (a, b, c) {
                b = xe.get(b.substring(c, c += 3).toLowerCase());
                return b == null ? -1 : (a.m = b, c)
            },
            B: function (a, b, c) {
                Lc.lastIndex = 0;
                return (b = Lc.exec(b.substring(c, c + 12))) ? (a.m = ye.get(b[0].toLowerCase()), c + b[0].length) : -1
            },
            c: function (a, b, c) {
                return ya(a, Da.c.toString(), b, c)
            },
            d: zc,
            e: zc,
            H: Ac,
            I: Ac,
            L: function (a, b, c) {
                E.lastIndex = 0;
                return (b = E.exec(b.substring(c,
                c + 3))) ? (a.L = +b[0], c + b[0].length) : -1
            },
            m: function (a, b, c) {
                E.lastIndex = 0;
                return (b = E.exec(b.substring(c, c + 2))) ? (a.m = b[0] - 1, c + b[0].length) : -1
            },
            M: function (a, b, c) {
                E.lastIndex = 0;
                return (b = E.exec(b.substring(c, c + 2))) ? (a.M = +b[0], c + b[0].length) : -1
            },
            p: function (a, b, c) {
                b = ze.get(b.substring(c, c += 2).toLowerCase());
                return b == null ? -1 : (a.p = b, c)
            },
            S: function (a, b, c) {
                E.lastIndex = 0;
                return (b = E.exec(b.substring(c, c + 2))) ? (a.S = +b[0], c + b[0].length) : -1
            },
            x: function (a, b, c) {
                return ya(a, Da.x.toString(), b, c)
            },
            X: function (a, b, c) {
                return ya(a,
                Da.X.toString(), b, c)
            },
            y: function (a, b, c) {
                E.lastIndex = 0;
                return (b = E.exec(b.substring(c, c + 2))) ? (a.y = ~ ~((new Date).getFullYear() / 1E3) * 1E3 + +b[0], c + b[0].length) : -1
            },
            Y: function (a, b, c) {
                E.lastIndex = 0;
                return (b = E.exec(b.substring(c, c + 4))) ? (a.y = +b[0], c + b[0].length) : -1
            }
        }, we = /^(?:sun|mon|tue|wed|thu|fri|sat)/i,
        Kc = /^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/i;
    d3_time_weekdays = "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",");
    var xe = d3.map({
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11
    }),
        Lc = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig,
        ye = d3.map({
            january: 0,
            february: 1,
            march: 2,
            april: 3,
            may: 4,
            june: 5,
            july: 6,
            august: 7,
            september: 8,
            october: 9,
            november: 10,
            december: 11
        }),
        Jc = "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
        E = /\s*\d+/,
        ze = d3.map({
            am: 0,
            pm: 1
        });
    d3.time.format.utc = function (a) {
        function b(a) {
            try {
                C = U;
                var b = new C;
                b._ = a;
                return c(b)
            } finally {
                C = Date
            }
        }
        var c = d3.time.format(a);
        b.parse = function (a) {
            try {
                C = U;
                var b = c.parse(a);
                return b && b._
            } finally {
                C = Date
            }
        };
        b.toString = c.toString;
        return b
    };
    B = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
    d3.time.format.iso = Date.prototype.toISOString ? jb : B;
    jb.parse = function (a) {
        return new Date(a)
    };
    jb.toString = B.toString;
    d3.time.second = V(function (a) {
        return new C(Math.floor(a / 1E3) * 1E3)
    }, function (a, b) {
        a.setTime(a.getTime() + Math.floor(b) * 1E3)
    }, function (a) {
        return a.getSeconds()
    });
    d3.time.seconds = d3.time.second.range;
    d3.time.seconds.utc = d3.time.second.utc.range;
    d3.time.minute = V(function (a) {
        return new C(Math.floor(a / 6E4) * 6E4)
    }, function (a, b) {
        a.setTime(a.getTime() + Math.floor(b) * 6E4)
    }, function (a) {
        return a.getMinutes()
    });
    d3.time.minutes = d3.time.minute.range;
    d3.time.minutes.utc = d3.time.minute.utc.range;
    d3.time.hour = V(function (a) {
        var b = a.getTimezoneOffset() / 60;
        return new C((Math.floor(a / 36E5 - b) + b) * 36E5)
    }, function (a, b) {
        a.setTime(a.getTime() + Math.floor(b) * 36E5)
    }, function (a) {
        return a.getHours()
    });
    d3.time.hours = d3.time.hour.range;
    d3.time.hours.utc = d3.time.hour.utc.range;
    d3.time.day = V(function (a) {
        return new C(a.getFullYear(), a.getMonth(), a.getDate())
    }, function (a, b) {
        a.setDate(a.getDate() + b)
    }, function (a) {
        return a.getDate() - 1
    });
    d3.time.days = d3.time.day.range;
    d3.time.days.utc = d3.time.day.utc.range;
    d3.time.dayOfYear = function (a) {
        var b = d3.time.year(a);
        return Math.floor((a - b) / 864E5 - (a.getTimezoneOffset() - b.getTimezoneOffset()) / 1440)
    };
    d3_time_weekdays.forEach(function (a, b) {
        var a = a.toLowerCase(),
            b = 7 - b,
            c = d3.time[a] = V(function (a) {
                (a = d3.time.day(a)).setDate(a.getDate() - (a.getDay() + b) % 7);
                return a
            }, function (a, b) {
                a.setDate(a.getDate() + Math.floor(b) * 7)
            }, function (a) {
                var c = d3.time.year(a).getDay();
                return Math.floor((d3.time.dayOfYear(a) + (c + b) % 7) / 7) - (c !== b)
            });
        d3.time[a + "s"] = c.range;
        d3.time[a + "s"].utc = c.utc.range;
        d3.time[a + "OfYear"] = function (a) {
            var c = d3.time.year(a).getDay();
            return Math.floor((d3.time.dayOfYear(a) + (c + b) % 7) / 7)
        }
    });
    d3.time.week = d3.time.sunday;
    d3.time.weeks = d3.time.sunday.range;
    d3.time.weeks.utc = d3.time.sunday.utc.range;
    d3.time.weekOfYear = d3.time.sundayOfYear;
    d3.time.month = V(function (a) {
        return new C(a.getFullYear(), a.getMonth(), 1)
    }, function (a, b) {
        a.setMonth(a.getMonth() + b)
    }, function (a) {
        return a.getMonth()
    });
    d3.time.months = d3.time.month.range;
    d3.time.months.utc = d3.time.month.utc.range;
    d3.time.year = V(function (a) {
        return new C(a.getFullYear(), 0, 1)
    }, function (a, b) {
        a.setFullYear(a.getFullYear() + b)
    }, function (a) {
        return a.getFullYear()
    });
    d3.time.years = d3.time.year.range;
    d3.time.years.utc = d3.time.year.utc.range;
    var Aa = [1E3, 5E3, 15E3, 3E4, 6E4, 3E5, 9E5, 18E5, 36E5, 108E5,
    216E5, 432E5, 864E5, 1728E5, 6048E5, 2592E6, 7776E6, 31536E6],
        qb = [
            [d3.time.second, 1],
            [d3.time.second, 5],
            [d3.time.second, 15],
            [d3.time.second, 30],
            [d3.time.minute, 1],
            [d3.time.minute, 5],
            [d3.time.minute, 15],
            [d3.time.minute, 30],
            [d3.time.hour, 1],
            [d3.time.hour, 3],
            [d3.time.hour, 6],
            [d3.time.hour, 12],
            [d3.time.day, 1],
            [d3.time.day, 2],
            [d3.time.week, 1],
            [d3.time.month, 1],
            [d3.time.month, 3],
            [d3.time.year, 1]
        ],
        B = [
            [d3.time.format("%Y"), function () {
                return !0
            } ],
            [d3.time.format("%B"), function (a) {
                return a.getMonth()
            } ],
            [d3.time.format("%b %d"),

            function (a) {
                return a.getDate() != 1
            } ],
            [d3.time.format("%a %d"), function (a) {
                return a.getDay() && a.getDate() != 1
            } ],
            [d3.time.format("%I %p"), function (a) {
                return a.getHours()
            } ],
            [d3.time.format("%I:%M"), function (a) {
                return a.getMinutes()
            } ],
            [d3.time.format(":%S"), function (a) {
                return a.getSeconds()
            } ],
            [d3.time.format(".%L"), function (a) {
                return a.getMilliseconds()
            } ]
        ],
        Mc = d3.scale.linear(),
        Ae = Cc(B);
    qb.year = function (a, b) {
        return Mc.domain(a.map(Wd)).ticks(b).map(mb)
    };
    d3.time.scale = function () {
        return kb(d3.scale.linear(),
        qb, Ae)
    };
    var Nc = qb.map(function (a) {
        return [a[0].utc, a[1]]
    }),
        B = [
            [d3.time.format.utc("%Y"), function () {
                return !0
            } ],
            [d3.time.format.utc("%B"), function (a) {
                return a.getUTCMonth()
            } ],
            [d3.time.format.utc("%b %d"), function (a) {
                return a.getUTCDate() != 1
            } ],
            [d3.time.format.utc("%a %d"), function (a) {
                return a.getUTCDay() && a.getUTCDate() != 1
            } ],
            [d3.time.format.utc("%I %p"), function (a) {
                return a.getUTCHours()
            } ],
            [d3.time.format.utc("%I:%M"), function (a) {
                return a.getUTCMinutes()
            } ],
            [d3.time.format.utc(":%S"), function (a) {
                return a.getUTCSeconds()
            } ],
            [d3.time.format.utc(".%L"), function (a) {
                return a.getUTCMilliseconds()
            } ]
        ],
        Be = Cc(B);
    Nc.year = function (a, b) {
        return Mc.domain(a.map(Xd)).ticks(b).map(nb)
    };
    d3.time.scale.utc = function () {
        return kb(d3.scale.linear(), Nc, Be)
    }
})();


(function (a) {
    a.GetStoredData = function () {
        var b = a.CacheKeys(),
            f = [],
            e = [];
        if (b) {
            for (var g = a.CacheKey + "u ", i = a.CacheKey + "i ", h = 0; h < b.length; h++) {
                var c = b[h],
                    d = c.substr(g.length);
                if (c.startsWith(i)) c = a.CacheGet(c, !0), c.id = md5(d), c.n = d, c.p = a.AddCommas(c.p), c.l = a.AddCommas(c.l), e.push(c);
                else if (c.startsWith(g)) d = a.CacheGet(c, !0), d.t = a.AddCommas(d.t), d.id = md5(d.u), f.push(d)
            }
            f.sort(function (a, b) {
                var c = a.u.toLowerCase(),
                    d = b.u.toLowerCase();
                return c < d ? -1 : c > d ? 1 : 0
            });
            e.sort(function (a, b) {
                var c = a.n.toLowerCase(),
                    d = b.n.toLowerCase();
                return c < d ? -1 : c > d ? 1 : 0
            });
            for (d = 0; d < e.length; d++) e[d].x = d;
            return {
                artists: e,
                users: f
            }
        }
    };
    a.DeleteUser = function (b) {
        a.CacheRemove(a.CacheKey + "u " + b.toLowerCase());
        a.CacheRemove(a.CacheKey + "w " + b.toLowerCase());
        var f = a.CacheKeys(),
            e = a.CacheKey + "z " + b.toLowerCase(),
            g = a.CacheKey + "y " + b.toLowerCase();
        _.each(f, function (b) {
            (b.startsWith(e) || b.startsWith(g)) && a.CacheRemove(b)
        })
    };
    a.DeleteArtist = function (b) {
        a.CacheRemove(a.CacheKey + "i " + b.toLowerCase())
    };
    a.DeleteAllKeys = function (b) {
        var f = a.CacheKeys(),
            b = a.CacheKey + b + " ";
        _.each(f, function (e) {
            e.startsWith(b) && a.CacheRemove(e)
        })
    }
})(LC.tools);
(function (c, f) {
    c.AllView = Backbone.View.extend({
        events: {
            "click .howmany button": "changeCount",
            "change input": "search",
            "keyup input": "search",
            "click .info-btns button": "info",
            "click .btn-toggle-info": "toggle"
        },
        initialize: function () {
            this.render();
            var a = this.options.el + " .accordion";
            this.items = new f.PaginatedCollection(null, {
                datasource: this.options.datasource,
                what: this.options.what,
                whatkeys: this.options.whatkeys,
                whereto: a
            });
            new c.AppView({
                el: a,
                collection: this.items
            });
            this.viewpagetop = new c.PaginationView({
                collection: this.items,
                whereto: this.options.el + " .pagination-top"
            });
            new c.PaginationView({
                collection: this.items,
                whereto: this.options.el + " .pagination-bottom",
                isbottom: !0
            })
        },
        render: function () {
            this.$el.html(Mustache.render($("#template-offline").html(), {
                isartists: this.options.what == "artists"
            }));
            var a;
            a = this.options.what == "users" ? _.map(this.options.datasource, function (a) {
                return a.u
            }) : _.map(this.options.datasource, function (a) {
                return a.n
            });
            this.$el.find("input").typeahead({
                source: a
            })
        },
        changeCount: function (a) {
            this.viewpagetop.changeCount(a)
        },
        search: function (a) {
            a.preventDefault();
            this.items.searchquery = $(a.target).val();
            this.items.searchquery ? this.items.fetch() : (this.items.fetch({
                silent: !0
            }), this.items.pager())
        },
        info: function (a) {
            a.preventDefault();
            var b = $(a.target),
                a = "no-" + b.text().toLowerCase(),
                c = b.hasClass("active"),
                b = b.parent().parent().parent().parent().parent();
            c ? b.addClass(a) : b.removeClass(a)
        },
        toggle: function () {
            var a, b = "links,summary,photo,tags,similar,stats".split(","),
                c = $(this.options.el + " .info-btns button.active"),
                d = $(this.options.el +
                    " .info-btns button"),
                e = d.parent().parent().parent().parent().parent();
            if (c.length > 0) for (a in c.removeClass("active"), b) e.addClass("no-" + b[a]);
            else for (a in d.addClass("active"), b) e.removeClass("no-" + b[a])
        }
    })
})(LC.views, LC.collections);
(function (b) {
    b.AppView = Backbone.View.extend({
        initialize: function () {
            var a = this.collection;
            a.on("add", this.addOne, this);
            a.on("reset", this.addAll, this);
            a.on("all", this.render, this);
            a.fetch({
                silent: !0
            });
            a.pager();
            $(this.collection.whereto).on("shown", function (a) {
                var b = $("a[href=#" + a.target.id + "]");
                b.parent().parent().parent().parent().find(".lc-highlight").removeClass("lc-highlight");
                b.addClass("lc-highlight");
                $("a[href=#" + a.target.id + "]").offset() && $("html,body").animate({
                    scrollTop: $("a[href=#" + a.target.id +
                        "]").offset().top - ($(".navbar-fixed-top").first().css("position") == "fixed" ? 40 : 0)
                }, "slow")
            })
        },
        render: function () { },
        addAll: function () {
            this.$el.empty();
            this.collection.each(this.addOne, this.$el.selector)
        },
        addOne: function (a) {
            var c = a.collection.whereto,
                a = new b.ResultView({
                    model: a,
                    whereto: c
                });
            $(c).append(a.render().el)
        }
    })
})(LC.views);
(function (c) {
    c.PaginationView = Backbone.View.extend({
        events: {
            "click a.first": "gotoFirst",
            "click a.prev": "gotoPrev",
            "click a.next": "gotoNext",
            "click a.last": "gotoLast",
            "click a.page": "gotoPage",
            "click a.lc-delete-all": "deleteAll"
        },
        tagName: "div",
        initialize: function () {
            this.collection.howManyPer(10);
            this.collection.on("reset", this.render, this);
            this.collection.on("change", this.render, this);
            this.$el.appendTo(this.options.whereto);
            this.render()
        },
        render: function () {
            var a = this.collection.info();
            a.startRecord = a.totalRecords == 0 ? 0 : a.startRecord;
            a.isFirstPage = a.page == 1;
            a.isLastPage = a.page == a.lastPage || a.lastPage == 0;
            a.pageSetObj = [];
            a.hasRecords = a.totalRecords > 0;
            for (var b = 0; b < a.pageSet.length; b++) a.pageSetObj.push({
                i: a.pageSet[b],
                s: a.pageSet[b] == a.page
            });
            a.isbottom = this.options.isbottom;
            a.search = this.collection.searchquery;
            this.$el.html(Mustache.render($("#template-pagination").html(), a))
        },
        deleteAll: function (a) {
            a.preventDefault();
            this.collection.deleteAll()
        },
        gotoFirst: function (a) {
            a.preventDefault();
            this.collection.goTo(1)
        },
        gotoPrev: function (a) {
            a.preventDefault();
            this.collection.previousPage()
        },
        gotoNext: function (a) {
            a.preventDefault();
            this.collection.nextPage()
        },
        gotoLast: function (a) {
            a.preventDefault();
            this.collection.goTo(this.collection.information.lastPage)
        },
        gotoPage: function (a) {
            a.preventDefault();
            this.collection.goTo($(a.target).text())
        },
        changeCount: function (a) {
            a.preventDefault();
            this.collection.howManyPer($(a.target).text())
        },
        sortByAscending: function (a) {
            a.preventDefault();
            a = this.getSortOption();
            this.collection.pager(a,
                "asc");
            this.preserveSortOption(a)
        },
        getSortOption: function () {
            return $("#sortByOption").val()
        },
        preserveSortOption: function (a) {
            $("#sortByOption").val(a)
        },
        sortByDescending: function (a) {
            a.preventDefault();
            a = this.getSortOption();
            this.collection.pager(a, "desc");
            this.preserveSortOption(a)
        }
    })
})(LC.views);
(function (b) {
    b.ResultView = Backbone.View.extend({
        tagName: "div",
        className: "accordion-group",
        initialize: function () {
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.remove, this)
        },
        render: function () {
            if (this.model.attributes.u) this.$el.html(Mustache.render($("#template-user").html(), this.model.toJSON()));
            else {
                var a = this.model.toJSON();
                a.hasm = a.m && a.m.length;
                a.hast = a.t && a.t.length;
                a.m = _.map(a.m, function (a) {
                    return {
                        n: a.length > 48 ? a.substring(0, 48) + "\u2026" : a,
                        v: a
                    }
                });
                this.$el.html(Mustache.render($("#template-artist").html(),
                a))
            }
            return this
        },
        events: {
            "click .delete-user": "deleteUser",
            "click .delete-artist": "deleteArtist"
        },
        deleteUser: function (a) {
            a.preventDefault();
            this.model.collection.remove(this.model);
            this.model.destroy();
            LC.tools.DeleteUser(this.model.attributes.u)
        },
        deleteArtist: function (a) {
            a.preventDefault();
            this.model.collection.remove(this.model);
            this.model.destroy();
            LC.tools.DeleteArtist(this.model.attributes.n)
        }
    })
})(LC.views);




(function (a) {
    a.Warning = '<div class="alert alert-block alert-error fade in hide"><a class="close" data-dismiss="alert" href="#">\u00d7</a><h4 class="alert-heading">{{^type}}Warning!{{/type}}{{#type}}{{type}}{{/type}}</h4><p>{{{message}}}</p></div>';
    a.Modal = '<div class="modal hide"><div class="modal-header"><a class="close" data-dismiss="modal">\u00d7</a><h3>{{title}}</h3></div><div class="modal-body"><div style="margin-right: 10px;"><textarea style="width: 100%; height: 240px;">{{{text}}}</textarea></div></div><div class="modal-footer"><a href="#" class="btn lastchart-close-modal">Close</a></div></div>'
})(LC.template);
(function (l) {
    var k, m, q, v, w, r, s, t, z, o, A, p, u, B, f, g, n;
    l.test = function (b) {
        function c(a) {
            return d3.svg.line().interpolate("basis-closed")(a.path)
        }
        function e(a) {
            return b.color(a.group)
        }
        function d() {
            var a = h,
                x = h,
                j = b.data.weekly.length - 1,
                d = d3.max(C, function (a) {
                    return d3.max(a.s, function (a) {
                        return a.y0 + a.y
                    })
                }),
                c = d3.svg.area().interpolate("basis").x(function (b) {
                    return b.x * a / j
                }).y0(function (a) {
                    return x - a.y0 * x / d
                }).y1(function (a) {
                    return x - (a.y + a.y0) * x / d
                }),
                e = d3.svg.area().interpolate("basis").x(function (b) {
                    return b.x * a / j * 2 - a / 2
                }).y0(function () {
                    return h / 2
                }).y1(function () {
                    return h / 2
                }),
                i = 0;
            z.exit().remove();
            z.enter().append("path").attr("title", function (a) {
                return a.$.n
            }).attr("d", function (a) {
                return e(a.s)
            }).style("fill", "#ddd").on("click", function (a) {
                b.info(a.$, a.n)
            }).transition().duration(800 * g).ease("exp-in-out").attr("d", function (a) {
                return c(a.s)
            }).style("fill", function () {
                return b.color(i++)
            })
        }
        function D(a) {
            _.each(a, function (a) {
                a.minx = 1E6;
                a.maxx = -1E6;
                a.miny = 1E6;
                a.maxy = -1E6;
                _.each(a.children, function (b) {
                    var d = b.x - b.dx / 2,
                        c = b.y - b.dy / 2,
                        e = b.dx,
                        b = b.dy;
                    a.minx = Math.min(d - 1, a.minx || 1E6);
                    a.maxx = Math.max(d + e + 1, a.maxx || -1E6);
                    a.miny = Math.min(c - 1, a.miny || 1E6);
                    a.maxy = Math.max(c + b + 1, a.maxy || -1E6)
                })
            });
            return a
        }
        function E(a, b) {
            _.each(a, function (a) {
                var d = a.points = [];
                _.each(a.children, function (a) {
                    var j = a.r + b + a.r * 0.1,
                        c = Math.sqrt(j * j / 2);
                    d.push([a.x, a.y - j]);
                    d.push([a.x + c, a.y - c]);
                    d.push([a.x + j, a.y]);
                    d.push([a.x + c, a.y + c]);
                    d.push([a.x, a.y + j]);
                    d.push([a.x - c, a.y + c]);
                    d.push([a.x - j, a.y]);
                    d.push([a.x - c, a.y - c])
                });
                var c = _.reduce(a.children,

                function (a, b) {
                    return [b[0] + a[0], b[1] + a[1]]
                }, [0, 0]);
                a.center = [c[0] / a.children.length, c[1] / a.children.length];
                a.path = d3.geom.hull(d)
            });
            return a
        }
        if (Modernizr.svg) {
            b.initchart();
            g = b.animate > 0 ? 1 : 0;
            n = b.animate < 2;
            var i = l.GetGradient(b.scheme, b.clusters.length);
            b.color = d3.scale.ordinal().range(i);
            var h = $(b.where).width(),
                y = i = h;
            b.w = y;
            b.r = h;
            $(b.where + " svg").length === 0 && (m = q = s = r = t = v = w = null);
            m = m || d3.select(b.where).append("svg").attr("width", h).attr("height", h).attr("class", b.main);
            m.attr("viewBox", "0 0 " + i +
                " " + i);
            q = q || m.append("g").attr("class", "lc-layer-stream");
            s = s || m.append("g").attr("class", "lc-layer-bounds");
            r = r || m.append("g").attr("class", "lc-layer-hulls");
            t = t || m.append("g").attr("class", "lc-layer-links");
            v = v || m.append("g").attr("class", "lc-layer-artists");
            w = w || m.append("g").attr("class", "lc-layer-artist-names");
            n ? ($(".lc-layer-artist-names").hide(), $(".lc-layer-hulls").hide(), $(".lc-layer-bounds").hide()) : ($(".lc-layer-artist-names").show(), $(".lc-layer-hulls").show(), $(".lc-layer-bounds").show());
            f = l.charts[b.chartname];
            if (i = f.layout && f.layout(b)) {
                var F = b.nodes.sort(function (a, c) {
                    return b.clusters[c.group].value - b.clusters[a.group].value
                });
                _.each(F, function (a) {
                    b.color(a.group)
                });
                _.each(i, function (a) {
                    a.x += a.dx ? a.dx / 2 : 0;
                    a.y += a.dy ? a.dy / 2 : 0
                });
                _.each(b.clusters, function (a, c) {
                    b.color(c)
                });
                k && k.stop();
                _.each(i, function (a, b, j) {
                    j[b].tx = a.x;
                    j[b].ty = a.y
                });
                _.each(i, function (a, b, j) {
                    j[b].x = h * Math.random();
                    j[b].y = -h * Math.random() / 2
                });
                !f.force && g == 0 && _.each(i, function (a) {
                    a.y = a.ty;
                    a.x = a.tx
                });
                k = d3.layout.force().nodes(i).size([h,
                h]).gravity(-0.02).charge(function (a) {
                    return f.useangle ? 0 : a.r ? a.r : Math.min(a.dx, a.dy) / 2
                }).friction(0.885);
                f.force && k.links(b.links).linkDistance(function (a) {
                    return a.source.r + a.target.r + y / 100 + y / {
                        10: 50,
                        25: 25,
                        50: 40,
                        100: 25
                    }[b.top]
                }).gravity(0.025).friction(0.95).charge(function (a) {
                    return -a.r * 1.25 - y / {
                        10: 5,
                        25: 10,
                        50: 25,
                        100: 50
                    }[b.top]
                }).theta(0.5);
                o = v.selectAll("rect").data(i, function (a) {
                    return a.$.n
                });
                nodesArtistNames = w.selectAll("text").data(i, function (a) {
                    return a.$.n
                });
                u = t.selectAll("line");
                u.remove();
                f.links && (u = t.selectAll("line").data(b.links, function (a) {
                    return a.source.index + "_" + a.target.index
                }), u.enter().append("line").style("display", function (a) {
                    return !b.clusters[a.source.group].similar ? "none" : "block"
                }).attr("x1", function (a) {
                    return a.source.x
                }).attr("y1", function (a) {
                    return a.source.y
                }).attr("x2", function (a) {
                    return a.target.x
                }).attr("y2", function (a) {
                    return a.target.y
                }).style("stroke-width", function (a) {
                    return a.value * 3
                }));
                f.usehull ? (p = r.selectAll("path").data(E(b.clusters, 8), function (a) {
                    return a.group + Math.random()
                }), p.exit().remove(), p.enter().append("path").style("fill-opacity", 0).style("stroke-opacity", 0).transition().delay(200 * g).style("fill", function (a) {
                    return b.color(a.group)
                }).attr("d", c).transition().delay(250 * g).duration(400 * g).ease("quad").style("fill-opacity", 0.3).style("stroke-opacity", 0.4)) : p = r.selectAll("path").remove();
                f.usebound ? (nodesBounds = s.selectAll("rect").data(D(b.clusters), function (a) {
                    return a.group + Math.random()
                }), nodesBounds.exit().remove(), g == 0 ? nodesBounds.enter().append("rect").style("fill",

                function (a) {
                    return b.color(a.group)
                }).attr("x", function (a) {
                    return a.minx
                }).attr("y", function (a) {
                    return a.miny
                }).attr("rx", 7).attr("ry", 7).attr("width", function (a) {
                    return a.maxx - a.minx
                }).attr("height", function (a) {
                    return a.maxy - a.miny
                }).style("fill-opacity", 0.45).style("stroke-opacity", 0.4) : nodesBounds.enter().append("rect").style("fill", function (a) {
                    return b.color(a.group)
                }).style("fill-opacity", 0).style("stroke-opacity", 0).transition().delay(200 * g).attr("x", function (a) {
                    return a.minx
                }).attr("y", function (a) {
                    return a.miny
                }).attr("rx",
                7).attr("ry", 7).attr("width", function (a) {
                    return a.maxx - a.minx
                }).attr("height", function (a) {
                    return a.maxy - a.miny
                }).transition().delay(250 * g).duration(400 * g).ease("quad").style("fill-opacity", 0.45).style("stroke-opacity", 0.4)) : s.selectAll("rect").remove();
                _.each(i, function (a) {
                    var b = _.find(B, function (b) {
                        return a.$.n == b.$.n
                    });
                    if (b) a.x = b.x, a.y = b.y
                });
                B = i;
                o.enter().append("rect").style("fill-opacity", 0.2).attr("title", function (a) {
                    return l.GetTitle(a)
                }).style("fill", e).on("click", function (a) {
                    b.info(b.data.info[a.$.n],
                    a.$.n)
                });
                o.transition().delay(function () {
                    return Math.random() * 10 * g
                }).duration(600 * g).ease("quad").style("fill", e).style("fill-opacity", 0.7).attr("width", function (a) {
                    return a.r ? a.r * 2 : a.dx ? a.dx : 0
                }).attr("height", function (a) {
                    return a.r ? a.r * 2 : a.dy ? a.dy : 0
                }).attr("rx", function (a) {
                    return a.r ? a.r : 5
                }).attr("ry", function (a) {
                    return a.r ? a.r : 5
                }).attr("transform", function (a) {
                    return "translate(-" + (a.r ? a.r : a.dx / 2) + ",-" + (a.r || a.dy / 2) + ")" + (a.rotate ? "rotate(" + a.rotate + " " + (a.cx + a.dx / 2) + "," + (a.cy + a.dy / 2) + ")" : "rotate(0 " + h / 2 + "," + h / 2 + ")")
                });
                o.exit().transition().delay(function () {
                    return Math.random() * 400 * g
                }).duration(800 * g).ease("exp-in-out").attr("y", 2 * h).transition().delay(1200 * g).remove();
                n || o.call(k.drag);
                A && A.remove();
                nodesArtistNames.enter().append("text").attr("title", function (a) {
                    return l.GetTitle(a)
                }).on("click", function (a) {
                    b.info(b.data.info[a.$.n], a.$.n)
                });
                nodesArtistNames.attr("dy", f.novalign ? "1em" : ".3em").attr("text-anchor", f.anchor || "middle").text(function (a) {
                    return f.fulltext ? a.$.n : a.$.n.substring(0, (a.r || a.tdx / 2 || a.dx / 2) / 3.25)
                }).attr("transform", function (a) {
                    return a.rotate ? "rotate(" + a.rotate + " " + a.cx + "," + a.cy + ")" : "rotate(0 " + h / 2 + "," + h / 2 + ")"
                }).style("opacity", 0).transition().duration(f.novalign ? 400 * g : 1600 * g).ease("circle").style("opacity", 0.95).style("font-size", function (a) {
                    return a.fs ? a.fs + "px" : null
                }).style("text-shadow", function (a) {
                    return !f.novalign ? null : "3px 3px 6px rgba(0,0,0, 0.2), 0.025em 0.025em 0.8em " + b.color(a.group)
                }).style("fill", function (a) {
                    return f.novalign && !Modernizr.textshadow ? b.color(a.group) : null
                });
                f.useangle ? nodesArtistNames.style("display", "none").transition().delay(function (a) {
                    return (2E3 + a.index * 15) * g
                }).style("display", function (a) {
                    return a.dy > 18 ? "block" : "none"
                }) : nodesArtistNames.style("display", "block");
                A = nodesArtistNames.exit().transition().duration(200 * g).ease("exp-in-out").style("opacity", 0).transition().delay(function () {
                    return Math.random() * 400 * g
                }).duration(800 * g).ease("exp-in-out").attr("y", 2 * h);
                n || nodesArtistNames.call(k.drag);
                q.selectAll("path").remove();
                if (f.replace) {
                    var C = f.replace(b);
                    z = q.selectAll("path").data(C, function (a) {
                        return a.$.n
                    });
                    d()
                }
                k.on("tick", function () {
                    function a(a) {
                        return a < 0.035 ? 1.5 : a < 0.045 ? 6 : a < 0.09 ? 100 : 200
                    } (new Date).getTime();
                    var d = k.alpha() || 0;
                    if (f.force && n && g == 0 && d > 0.07) $("svg").hide();
                    else {
                        $("svg").show();
                        if (n && d < 0.035 || g == 0 && !f.force) $(".lc-layer-artist-names").show(), $(".lc-layer-hulls").show(), $(".lc-layer-bounds").show();
                        f.force || o.each(function (b) {
                            g == 0 ? (b.y = b.ty, b.x = b.tx, k.alpha(0)) : (b.y += (b.ty - b.y) * (1 - d) / a(d), b.x += (b.tx - b.x) * (1 - d) / a(d))
                        });
                        o.attr("x", function (a) {
                            return Math.round(a.x)
                        }).attr("y", function (a) {
                            return Math.round(a.y)
                        });
                        f.novalign ? nodesArtistNames.attr("x", function (a) {
                            return a.x
                        }).attr("y", function (a) {
                            return a.y
                        }) : nodesArtistNames.attr("x", function (a) {
                            return Math.round(a.x + (a.tdx ? h * 0.003 - (a.dx ? a.dx / 2 : 0) : 0))
                        }).attr("y", function (a) {
                            return Math.round(a.y)
                        });
                        if (!n || n && d < 0.035) f.usehull && p.empty && !p.empty() && p.data(E(b.clusters, 8)).attr("d", c), f.usebound && nodesBounds.data(D(b.clusters)).attr("x", function (a) {
                            return a.minx
                        }).attr("y",

                        function (a) {
                            return a.miny
                        }).attr("width", function (a) {
                            return a.maxx - a.minx
                        }).attr("height", function (a) {
                            return a.maxy - a.miny
                        });
                        u.attr("x1", function (a) {
                            return a.source.x
                        }).attr("y1", function (a) {
                            return a.source.y
                        }).attr("x2", function (a) {
                            return a.target.x
                        }).attr("y2", function (a) {
                            return a.target.y
                        })
                    }
                });
                d3.timer.flush();
                k.start();
                f.force || k.alpha(0.085);
                b.finish(b)
            }
        } else b.problem = 'Missing <em>SVG</em> support! Learn more in the <a href="./about.html#requirements">Requirements</a> section.', b.finish(b)
    };
    l.charts = {
        force: {
            fulltext: !0,
            links: !0,
            force: !0,
            usehull: !0,
            ids: ["name", "group"],
            layout: function (b) {
                var c = b.nodes;
                _.each(c, function (c, d, f) {
                    d = f[d];
                    c = c.value;
                    c = Math.sqrt((c > 0 ? c / b.sum : 0) / Math.PI) * (b.w / Math.E);
                    d.r = c
                });
                return c
            }
        },
        map: {
            usebound: !0,
            layout: function (b) {
                b = d3.layout.treemap().size([b.r - 0, b.r - 0]).sticky(!0).sort(function (b, e) {
                    return b.value - e.value
                }).nodes({
                    children: b.clusters
                }).filter(function (b) {
                    return b.depth == 2
                });
                _.each(b, function (b, e, d) {
                    d[e].x += 0;
                    d[e].y += 0;
                    d[e].x += 3;
                    d[e].y += 3;
                    d[e].dx -= 6;
                    d[e].dy -= 6
                });
                return b
            }
        },
        sun: {
            useangle: !0,
            layout: function (b) {
                var c = b.nodes,
                    e = b.r / 2,
                    d = b.r / 2 * 0.4944,
                    f = _.reduce(c, function (b, d) {
                        return b + d.value
                    }, 0),
                    g = 0;
                _.each(c, function (c) {
                    c.anglepos = g;
                    c.angleval = c.value / f;
                    c.dy = c.angleval * Math.PI * 2 * d;
                    c.dx = e - d;
                    c.rotate = (c.anglepos + (g == 0 ? 0 : c.angleval / 2)) * 360;
                    c.x = 0;
                    c.y = b.r / 2 - c.dy / 2;
                    delete c.r;
                    c.cx = b.r / 2;
                    c.cy = b.r / 2;
                    g += g == 0 ? c.angleval / 2 : c.angleval
                });
                return c
            }
        },
        pack: {
            links: !0,
            usehull: !0,
            ids: ["name", "group"],
            layout: function (b) {
                var c = d3.layout.pack().sort(function () { }).size([b.r, b.r]).nodes({
                    children: b.clusters
                }).filter(function (b) {
                    return b.depth == 2
                });
                l.NormalizeCircles(c, b.r, 16);
                return c
            }
        },
        bubble: {
            usehull: !0,
            ids: [null, null],
            layout: function (b) {
                var c = d3.layout.pack().sort(null).size([b.r, b.r]),
                    e = {
                        children: b.nodes.sort(function (c, e) {
                            return b.clusters[e.group].value - b.clusters[c.group].value
                        })
                    }, c = c.nodes(e).filter(function (b) {
                        return b.depth == 1
                    });
                l.NormalizeCircles(c, b.r, 16);
                _.each(c, function (b) {
                    b.cid = b.parent.name
                });
                return c
            }
        },
        stream: {
            layout: function (b) {
                var c = b.nodes.filter(function (b) {
                    return b.name
                }),
                    e = [];
                _.each(c, function (b) {
                    e.push({
                        $: b
                    })
                });
                _.each(e, function (c) {
                    c.x = 0;
                    c.y = b.r / 2;
                    c.dx = b.r;
                    c.dy = 0
                });
                return e
            },
            replace: function (b) {
                return d3.layout.stack().order("inside-out").offset("silhouette").values(function (b) {
                    return b.s
                })(b.data.series)
            }
        },
        cloud: {
            fulltext: !0,
            anchor: "start",
            novalign: !0,
            layout: function (b) {
                var c = b.r,
                    e = c / 36;
                l.ConvertArtistsMinMax(e, c / 8, b.nodes, b.data.max);
                l.GetCloud(b.nodes, "bold", "Open Sans Condensed", c, c, 1.5, 8, e);
                b.nodes = _.filter(b.nodes, function (b) {
                    return b.fs
                });
                return b.nodes
            }
        },
        list: {
            anchor: "left",
            layout: function (b) {
                var c = [];
                _.each(b.nodes, function (b) {
                    c.push(b)
                });
                var e = b.r * 0.005,
                    d = Math.ceil(c.length / 5),
                    f = (b.r - e * 4) / 5,
                    g = (b.r + e) / 5,
                    i = (b.r - e * (d - 1)) / d,
                    h = (b.r + e) / d,
                    k = _.max(c, function (b) {
                        return b.value
                    }).value;
                _.each(c, function (b, c) {
                    var a = c % d;
                    b.x = (c - a) / d * g;
                    b.y = a * h;
                    b.dx = f * (b.value / k);
                    b.dy = i;
                    b.tdx = f;
                    b.tx = b.x + e
                });
                return c
            }
        }
    }
})(LC.tools);
(function () { })(LC.text);
(function (b) {
    if (typeof String.prototype.startsWith != "function") String.prototype.startsWith = function (a) {
        return this.indexOf(a) == 0
    };
    if (typeof String.prototype.startsWithInvariant != "function") String.prototype.startsWithInvariant = function (a) {
        return this.toLowerCase().indexOf(a.toLowerCase()) == 0
    };
    b.AddCommas = function (a) {
        a += "";
        x = a.split(".");
        x1 = x[0];
        x2 = x.length > 1 ? "." + x[1] : "";
        for (a = /(\d+)(\d{3})/; a.test(x1); ) x1 = x1.replace(a, "$1,$2");
        return x1 + x2
    };
    b.GetTitlePart = function (a, b, c) {
        return a + " (" + b + "\u00d7" + (c ?
            " / " + c.toUpperCase() : "") + ")"
    };
    b.GetTitle = function (a) {
        return !a ? "" : b.GetTitlePart(a.$.n, a.value, a.$.tag)
    };
    b.GetHashParameterByName = function (a) {
        a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        a = RegExp("[\\#&]" + a + "=([^&]*)").exec(window.location.hash);
        return a == null ? "" : decodeURIComponent(a[1].replace(/\+/g, " "))
    };
    b.PreloadImage = function (a) {
        if (a) (new Image).src = a
    }
})(LC.tools);
var Mustache = typeof module !== "undefined" && module.exports || {};
(function (j) {
    function G(a) {
        return String(a).replace(/&(?!\w+;)|[<>"']/g, function (a) {
            return H[a] || a
        })
    }
    function t(a, c, d, e) {
        for (var e = e || "<template>", b = c.split("\n"), f = Math.max(d - 3, 0), g = Math.min(b.length, d + 3), b = b.slice(f, g), i = 0, l = b.length; i < l; ++i) g = i + f + 1, b[i] = (g === d ? " >> " : "    ") + b[i];
        a.template = c;
        a.line = d;
        a.file = e;
        a.message = [e + ":" + d, b.join("\n"), "", a.message].join("\n");
        return a
    }
    function u(a, c, d) {
        if (a === ".") return c[c.length - 1];
        for (var a = a.split("."), e = a.length - 1, b = a[e], f, g, i = c.length, l, j; i; ) {
            j = c.slice(0);
            g = c[--i];
            for (l = 0; l < e; ) {
                g = g[a[l++]];
                if (g == null) break;
                j.push(g)
            }
            if (g && typeof g === "object" && b in g) {
                f = g[b];
                break
            }
        }
        typeof f === "function" && (f = f.call(j[j.length - 1]));
        return f == null ? d : f
    }
    function I(a, c, d, e) {
        var b = "",
            a = u(a, c);
        if (e) {
            if (a == null || a === !1 || q(a) && a.length === 0) b += d()
        } else if (q(a)) y(a, function (a) {
            c.push(a);
            b += d();
            c.pop()
        });
        else if (typeof a === "object") c.push(a), b += d(), c.pop();
        else if (typeof a === "function") {
            var f = c[c.length - 1];
            b += a.call(f, d(), function (a) {
                return r(a, f)
            }) || ""
        } else a && (b += d());
        return b
    }

    function z(a, c) {
        for (var c = c || {}, d = c.tags || j.tags, e = d[0], b = d[d.length - 1], f = ['var buffer = "";', "\nvar line = 1;", "\ntry {", '\nbuffer += "'], g = [], i = !1, l = !1, r = function () {
            if (i && !l && !c.space) for (; g.length; ) f.splice(g.pop(), 1);
            else g = [];
            l = i = !1
        }, n = [], v, p, q, w = function (a) {
            d = o(a).split(/\s+/);
            p = d[0];
            q = d[d.length - 1]
        }, x = function (a) {
            f.push('";', v, '\nvar partial = partials["' + o(a) + '"];', "\nif (partial) {", "\n  buffer += render(partial,stack[stack.length - 1],partials);", "\n}", '\nbuffer += "')
        }, u = function (b, d) {
            var e = o(b);
            if (e === "") throw t(Error("Section name may not be empty"), a, s, c.file);
            n.push({
                name: e,
                inverted: d
            });
            f.push('";', v, '\nvar name = "' + e + '";', "\nvar callback = (function () {", "\n  return function () {", '\n    var buffer = "";', '\nbuffer += "')
        }, y = function (a) {
            u(a, !0)
        }, z = function (b) {
            var b = o(b),
                d = n.length != 0 && n[n.length - 1].name;
            if (!d || b != d) throw t(Error('Section named "' + b + '" was never opened'), a, s, c.file);
            b = n.pop();
            f.push('";', "\n    return buffer;", "\n  };", "\n})();");
            b.inverted ? f.push("\nbuffer += renderSection(name,stack,callback,true);") : f.push("\nbuffer += renderSection(name,stack,callback);");
            f.push('\nbuffer += "')
        }, A = function (a) {
            f.push('";', v, '\nbuffer += lookup("' + o(a) + '",stack,"");', '\nbuffer += "')
        }, B = function (a) {
            f.push('";', v, '\nbuffer += escapeHTML(lookup("' + o(a) + '",stack,""));', '\nbuffer += "')
        }, s = 1, m, k, h = 0, C = a.length; h < C; ++h) if (a.slice(h, h + e.length) === e) {
            h += e.length;
            m = a.substr(h, 1);
            v = "\nline = " + s + ";";
            p = e;
            q = b;
            i = !0;
            switch (m) {
                case "!":
                    h++;
                    k = null;
                    break;
                case "=":
                    h++;
                    b = "=" + b;
                    k = w;
                    break;
                case ">":
                    h++;
                    k = x;
                    break;
                case "#":
                    h++;
                    k = u;
                    break;
                case "^":
                    h++;
                    k = y;
                    break;
                case "/":
                    h++;
                    k = z;
                    break;
                case "{":
                    b = "}" + b;
                case "&":
                    h++;
                    l = !0;
                    k = A;
                    break;
                default:
                    l = !0, k = B
            }
            m = a.indexOf(b, h);
            if (m === -1) throw t(Error('Tag "' + e + '" was not closed properly'), a, s, c.file);
            e = a.substring(h, m);
            k && k(e);
            for (k = 0; ~(k = e.indexOf("\n", k)); ) s++, k++;
            h = m + b.length - 1;
            e = p;
            b = q
        } else switch (m = a.substr(h, 1), m) {
            case '"':
            case "\\":
                l = !0;
                f.push("\\" + m);
                break;
            case "\r":
                break;
            case "\n":
                g.push(f.length);
                f.push("\\n");
                r();
                s++;
                break;
            default:
                D.test(m) ? g.push(f.length) : l = !0, f.push(m)
        }
        if (n.length != 0) throw t(Error('Section "' + n[n.length - 1].name + '" was not closed properly'), a, s, c.file);
        r();
        f.push('";', "\nreturn buffer;", "\n} catch (e) { throw {error: e, line: line}; }");
        b = f.join("").replace(/buffer \+= "";\n/g, "");
        c.debug && (typeof console != "undefined" && console.log ? console.log(b) : typeof print === "function" && print(b));
        return b
    }
    function A(a, c) {
        var d = z(a, c),
            e = new Function("view,partials,stack,lookup,escapeHTML,renderSection,render", d);
        return function (b, d) {
            var d = d || {}, g = [b];
            try {
                return e(b, d, g, u, G,
                I, r)
            } catch (i) {
                throw t(i.error, a, i.line, c.file);
            }
        }
    }
    function B(a, c) {
        c = c || {};
        return c.cache !== !1 ? (p[a] || (p[a] = A(a, c)), p[a]) : A(a, c)
    }
    function r(a, c, d) {
        return B(a)(c, d)
    }
    j.name = "mustache.js";
    j.version = "0.5.0-dev";
    j.tags = ["{{", "}}"];
    j.parse = z;
    j.compile = B;
    j.render = r;
    j.clearCache = function () {
        p = {}
    };
    j.to_html = function (a, c, d, e) {
        a = r(a, c, d);
        if (typeof e === "function") e(a);
        else return a
    };
    var J = Object.prototype.toString,
        C = Array.isArray,
        E = Array.prototype.forEach,
        F = String.prototype.trim,
        q;
    q = C ? C : function (a) {
        return J.call(a) ===
            "[object Array]"
    };
    var y;
    y = E ? function (a, c, d) {
        return E.call(a, c, d)
    } : function (a, c, d) {
        for (var e = 0, b = a.length; e < b; ++e) c.call(d, a[e], e, a)
    };
    var D = /^\s*$/,
        o;
    if (F) o = function (a) {
        return a == null ? "" : F.call(a)
    };
    else {
        var w, x;
        D.test("\u00a0") ? (w = /^\s+/, x = /\s+$/) : (w = /^[\s\xA0]+/, x = /[\s\xA0]+$/);
        o = function (a) {
            return a == null ? "" : String(a).replace(w, "").replace(x, "")
        }
    }
    var H = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }, p = {}
})(Mustache);

(function () {
    $(document).ready(function () {
        //if ($("body").hasClass("app-home")) LC.tools.RefreshApp(), LC.tools.App({
        if ($("body")) LC.tools.RefreshApp(), LC.tools.App({
            test: !0
        });
        else if ($("body").hasClass("app-about")) {
            LC.tools.RefreshApp();
            $(".lc-hint").tooltip();
            $(".well-small a, p a").click(function (a) {
                $(this).attr("href")[0] == "#" && (a.preventDefault(), $("html,body").animate({
                    scrollTop: $($(this).attr("href")).offset().top
                }))
            });
            $(".thumbnails img").click(function () {
                $(".carousel").carousel($(this).data("thumb"));
                $("html,body").animate({
                    scrollTop: $(".carousel").offset().top - ($(".navbar-fixed-top").first().css("position") == "fixed" ? 59 : 0)
                })
            });
            var b = {
                checks: [{
                    name: "SVG",
                    id: "svg",
                    ciu: "svg",
                    cat: "required",
                    why: "for charting"
                }, {
                    name: "Canvas",
                    id: "canvas",
                    ciu: "canvas",
                    cat: "required",
                    why: "for cloud chart"
                }, {
                    name: "Canvas Text",
                    id: "canvastext",
                    ciu: "canvas-text",
                    cat: "required",
                    why: "for cloud chart"
                }, {
                    name: "Web Storage",
                    id: "localstorage",
                    ciu: "namevalue-storage",
                    cat: "recommended",
                    why: "for data loading performance and offline browsing"
                }, {
                    name: "Offline web applications",
                    id: "applicationcache",
                    ciu: "offline-apps",
                    cat: "very nice to have",
                    why: "for offline browsing and pages loading performance"
                }, {
                    name: "JSON Parsing ",
                    id: "json",
                    ciu: "json",
                    cat: "nice to have",
                    why: "for performance"
                }, {
                    name: "RGBA",
                    id: "rgba",
                    ciu: "css3-colors"
                }, {
                    name: "Text Shadow",
                    id: "textshadow",
                    ciu: "css-textshadow",
                    cat: "nice to have",
                    why: "for style and cloud chart"
                }, {
                    name: "CSS3 Animations",
                    id: "cssanimations",
                    ciu: "css-animation",
                    cat: "nice to have",
                    why: "for style"
                }, {
                    name: "Opacity",
                    id: "opacity",
                    ciu: "css-opacity"
                }, {
                    name: "Border Radius",
                    id: "borderradius",
                    ciu: "border-radius",
                    cat: "nice to have",
                    why: "for style"
                }, {
                    name: "Gradients",
                    id: "cssgradients",
                    ciu: "css-gradients",
                    cat: "nice to have",
                    why: "for style"
                }, {
                    name: "Web Fonts",
                    id: "fontface",
                    ciu: "fontface",
                    cat: "nice to have",
                    why: "for style"
                }]
            };
            Modernizr.addTest("json", !!window.JSON && !!JSON.parse);
            _.each(b.checks, function (a) {
                a.pass = Modernizr[a.id]
            });
            $("#requirements .checks").html(Mustache.render($("#template-checks").html(), b))
        } else $("body").hasClass("app-cache") ? (LC.tools.RefreshApp(), LC.tools.CacheRefresh = !1, LC.global.stored = LC.tools.GetStoredData(), new LC.views.AllView({
            el: "#lc-offline-users",
            datasource: LC.global.stored.users,
            what: "users",
            whatkeys: ["u", "w", "y", "z"]
        }), new LC.views.AllView({
            el: "#lc-offline-artists",
            datasource: LC.global.stored.artists,
            what: "artists",
            whatkeys: ["i"]
        })) : $("body").hasClass("app-contact") && LC.tools.RefreshApp()
    })
})();
