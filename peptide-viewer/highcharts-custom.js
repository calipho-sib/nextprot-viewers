/*
 Highcharts 4.0.4 JS v/Highstock 2.0.4 (2014-09-02)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
 Highcharts 4.1.3 JS v/Highstock 2.1.2 (2015-02-27)
 Exporting module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
 Highcharts 4.1.3 JS v/Highstock 2.1.2 (2015-02-27)
 Data module

 (c) 2012-2014 Torstein Honsi

 License: www.highcharts.com/license
 Highcharts 4.1.3 JS v/Highstock 2.1.2 (2015-02-27)
 Plugin for displaying a message when there is no data visible in chart.

 (c) 2010-2014 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
 */
(function () {
    function q(a, b) {
        var c;
        a || (a = {});
        for (c in b)a[c] = b[c];
        return a
    }

    function L() {
        var a, b = arguments, c, d = {}, e = function (a, b) {
            var c, d;
            "object" !== typeof a && (a = {});
            for (d in b)b.hasOwnProperty(d) && ((c = b[d]) && "object" === typeof c && "[object Array]" !== Object.prototype.toString.call(c) && "renderTo" !== d && "number" !== typeof c.nodeType ? a[d] = e(a[d] || {}, c) : a[d] = b[d]);
            return a
        };
        !0 === b[0] && (d = b[1], b = Array.prototype.slice.call(b, 2));
        c = b.length;
        for (a = 0; a < c; a++)d = e(d, b[a]);
        return d
    }

    function I(a, b) {
        return parseInt(a
            b || 10)
    }

    function aa(a) {
        return "string" === typeof a
    }

    function N(a) {
        return a && "object" === typeof a
    }

    function R(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }

    function T(a) {
        return "number" === typeof a
    }

    function l(a) {
        return ea.log(a) / ea.LN10
    }

    function p(a) {
        return ea.pow(10, a)
    }

    function D(a, b) {
        for (var c = a.length; c--;)if (a[c] === b) {
            a.splice(c, 1);
            break
        }
    }

    function r(a) {
        return a !== F && null !== a
    }

    function y(a, b, c) {
        var d, e;
        if (aa(b))r(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b)); else if (r(b) &&
            N(b))for (d in b)a.setAttribute(d, b[d]);
        return e
    }

    function t(a) {
        return R(a) ? a : [a]
    }

    function h() {
        var a = arguments, b, c, d = a.length;
        for (b = 0; b < d; b++)if (c = a[b], c !== F && null !== c)return c
    }

    function E(a, b) {
        sa && !ia && b && b.opacity !== F && (b.filter = "alpha(opacity=" + 100 * b.opacity + ")");
        q(a.style, b)
    }

    function C(a, b, c, d, e) {
        a = O.createElement(a);
        b && q(a, b);
        e && E(a, {padding: 0, border: "none", margin: 0});
        c && E(a, c);
        d && d.appendChild(a);
        return a
    }

    function ba(a, b) {
        var c = function () {
            return F
        };
        c.prototype = new a;
        q(c.prototype, b);
        return c
    }

    function P(a,
               b, c, d) {
        var e = ja.numberFormat, f = da.lang, g = +a || 0, k = -1 === b ? (g.toString().split(".")[1] || "").length : isNaN(b = X(b)) ? 2 : b, n = void 0 === c ? f.decimalPoint : c, f = void 0 === d ? f.thousandsSep : d, u = 0 > g ? "-" : "", B = String(I(g = X(g).toFixed(k))), G = 3 < B.length ? B.length % 3 : 0;
        return e !== P ? e(a, b, c, d) : u + (G ? B.substr(0, G) + f : "") + B.substr(G).replace(/(\d{3})(?=\d)/g, "$1" + f) + (k ? n + X(g - B).toFixed(k).slice(2) : "")
    }

    function J(a, b) {
        return Array((b || 2) + 1 - String(a).length).join(0) + a
    }

    function v(a, b, c) {
        var d = a[b];
        a[b] = function () {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(d);
            return c.apply(this, a)
        }
    }

    function m(a, b) {
        for (var c = "{", d = !1, e, f, g, k, n, u = []; -1 !== (c = a.indexOf(c));) {
            e = a.slice(0, c);
            if (d) {
                f = e.split(":");
                g = f.shift().split(".");
                n = g.length;
                e = b;
                for (k = 0; k < n; k++)e = e[g[k]];
                f.length && (f = f.join(":"), g = /\.([0-9])/, k = da.lang, n = void 0, /f$/.test(f) ? (n = (n = f.match(g)) ? n[1] : -1, null !== e && (e = P(e, n, k.decimalPoint, -1 < f.indexOf(",") ? k.thousandsSep : ""))) : e = Ka(f, e))
            }
            u.push(e);
            a = a.slice(c + 1);
            c = (d = !d) ? "}" : "{"
        }
        u.push(a);
        return u.join("")
    }

    function H(a, b, c, d) {
        var e;
        c = h(c, 1);
        e = a /
        c;
        b || (b = [1, 2, 2.5, 5, 10], !1 === d && (1 === c ? b = [1, 2, 5, 10] : .1 >= c && (b = [1 / c])));
        for (d = 0; d < b.length && !(a = b[d], e <= (b[d] + (b[d + 1] || b[d])) / 2); d++);
        return a * c
    }

    function z(a, b) {
        var c = a.length, d, e;
        for (e = 0; e < c; e++)a[e].ss_i = e;
        a.sort(function (a, c) {
            d = b(a, c);
            return 0 === d ? a.ss_i - c.ss_i : d
        });
        for (e = 0; e < c; e++)delete a[e].ss_i
    }

    function Q(a) {
        for (var b = a.length, c = a[0]; b--;)a[b] < c && (c = a[b]);
        return c
    }

    function va(a) {
        for (var b = a.length, c = a[0]; b--;)a[b] > c && (c = a[b]);
        return c
    }

    function ra(a, b) {
        for (var c in a)a[c] && a[c] !== b && a[c].destroy &&
        a[c].destroy(), delete a[c]
    }

    function U(a) {
        La || (La = C("div"));
        a && La.appendChild(a);
        La.innerHTML = ""
    }

    function V(a) {
        return parseFloat(a.toPrecision(14))
    }

    function $a() {
        var a = da.global.useUTC, b = a ? "getUTC" : "get";
        Ma = da.global.Date || window.Date;
        ab = 6E4 * (a && da.global.timezoneOffset || 0);
        bb = b + "Minutes";
        cb = b + "Hours";
        db = b + "Day";
        eb = b + "Date";
        fb = b + "Month";
        gb = b + "FullYear"
    }

    function S() {
    }

    function wa(a, b, c, d) {
        this.axis = a;
        this.pos = b;
        this.type = c || "";
        this.isNew = !0;
        c || d || this.addLabel()
    }

    function xa() {
        this.init.apply(this, arguments)
    }

    function Na() {
        this.init.apply(this, arguments)
    }

    function hb(a, b, c, d, e) {
        var f = a.chart.inverted;
        this.axis = a;
        this.isNegative = c;
        this.options = b;
        this.x = d;
        this.total = null;
        this.points = {};
        this.stack = e;
        this.alignOptions = {
            align: b.align || (f ? c ? "left" : "right" : "center"),
            verticalAlign: b.verticalAlign || (f ? "middle" : c ? "bottom" : "top"),
            y: h(b.y, f ? 4 : c ? 14 : -6),
            x: h(b.x, f ? c ? -6 : 6 : 0)
        };
        this.textAlign = b.textAlign || (f ? c ? "right" : "left" : "center")
    }

    var F, O = document, Y = window, ea = Math, M = ea.round, la = ea.floor, ua = ea.ceil, K = ea.max, Z = ea.min,
        X = ea.abs, Ea = ea.cos, Oa = ea.sin, ib = ea.PI, jb = 2 * ib / 360, ta = navigator.userAgent, kb = Y.opera, sa = /msie/i.test(ta) && !kb, Ua = /AppleWebKit/.test(ta), ya = /Firefox/.test(ta), lb = /(Mobile|Android|Windows Phone)/.test(ta), ia = !!O.createElementNS && !!O.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, tb = ya && 4 > parseInt(ta.split("Firefox/")[1], 10), oa = !ia && !sa && !!O.createElement("canvas").getContext, Fa, mb = {}, Va = 0, La, da, Ka, pa, Wa, za, ma, Xa = function () {
            return F
        }, ka = [], Ga = 0, ub = /^[0-9]+$/, Ma, ab, bb, cb, db, eb, fb, gb,
        fa = {}, ja;
    Y.Highcharts ? ma(16, !0) : ja = Y.Highcharts = {};
    Ka = function (a, b, c) {
        if (!r(b) || isNaN(b))return "Invalid date";
        a = h(a, "%Y-%m-%d %H:%M:%S");
        var d = new Ma(b - ab), e, f = d[cb](), g = d[db](), k = d[eb](), n = d[fb](), u = d[gb](), B = da.lang, G = B.weekdays, d = q({
            a: G[g].substr(0, 3),
            A: G[g],
            d: J(k),
            e: k,
            b: B.shortMonths[n],
            B: B.months[n],
            m: J(n + 1),
            y: u.toString().substr(2, 2),
            Y: u,
            H: J(f),
            I: J(f % 12 || 12),
            l: f % 12 || 12,
            M: J(d[bb]()),
            p: 12 > f ? "AM" : "PM",
            P: 12 > f ? "am" : "pm",
            S: J(d.getSeconds()),
            L: J(M(b % 1E3), 3)
        }, ja.dateFormats);
        for (e in d)for (; -1 !== a.indexOf("%" +
        e);)a = a.replace("%" + e, "function" === typeof d[e] ? d[e](b) : d[e]);
        return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
    };
    ma = function (a, b) {
        var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
        if (b)throw c;
        Y.console && console.log(c)
    };
    za = {
        millisecond: 1,
        second: 1E3,
        minute: 6E4,
        hour: 36E5,
        day: 864E5,
        week: 6048E5,
        month: 26784E5,
        year: 31556952E3
    };
    Wa = {
        init: function (a, b, c) {
            b = b || "";
            var d = a.shift, e = -1 < b.indexOf("C"), f = e ? 7 : 3, g;
            b = b.split(" ");
            c = [].concat(c);
            var k, n, u = function (a) {
                for (g = a.length; g--;)"M" === a[g] && a.splice(g +
                1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2])
            };
            e && (u(b), u(c));
            a.isArea && (k = b.splice(b.length - 6, 6), n = c.splice(c.length - 6, 6));
            if (d <= c.length / f && b.length === c.length)for (; d--;)c = [].concat(c).splice(0, f).concat(c);
            a.shift = 0;
            if (b.length)for (a = c.length; b.length < a;)d = [].concat(b).splice(b.length - f, f), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d);
            k && (b = b.concat(k), c = c.concat(n));
            return [b, c]
        }, step: function (a, b, c, d) {
            var e = [], f = a.length;
            if (1 === c)e = d; else if (f === b.length && 1 > c)for (; f--;)d = parseFloat(a[f]), e[f] = isNaN(d) ? a[f] :
            c * parseFloat(b[f] - d) + d; else e = b;
            return e
        }
    };
    (function (a) {
        Y.HighchartsAdapter = Y.HighchartsAdapter || a && {
            init: function (b) {
                var c = a.fx;
                a.extend(a.easing, {
                    easeOutQuad: function (a, b, c, g, k) {
                        return -g * (b /= k) * (b - 2) + c
                    }
                });
                a.each(["cur", "_default", "width", "height", "opacity"], function (b, e) {
                    var f = c.step, g;
                    "cur" === e ? f = c.prototype : "_default" === e && a.Tween && (f = a.Tween.propHooks[e], e = "set");
                    (g = f[e]) && (f[e] = function (a) {
                        var c;
                        a = b ? a : this;
                        if ("align" !== a.prop)return c = a.elem, c.attr ? c.attr(a.prop, "cur" === e ? F : a.now) : g.apply(this,
                            arguments)
                    })
                });
                v(a.cssHooks.opacity, "get", function (a, b, c) {
                    return b.attr ? b.opacity || 0 : a.call(this, b, c)
                });
                this.addAnimSetter("d", function (a) {
                    var c = a.elem, f;
                    a.started || (f = b.init(c, c.d, c.toD), a.start = f[0], a.end = f[1], a.started = !0);
                    c.attr("d", b.step(a.start, a.end, a.pos, c.toD))
                });
                this.each = Array.prototype.forEach ? function (a, b) {
                    return Array.prototype.forEach.call(a, b)
                } : function (a, b) {
                    var c, g = a.length;
                    for (c = 0; c < g; c++)if (!1 === b.call(a[c], a[c], c, a))return c
                };
                a.fn.highcharts = function () {
                    var a = "Chart", b = arguments,
                        c, g;
                    this[0] && (aa(b[0]) && (a = b[0], b = Array.prototype.slice.call(b, 1)), c = b[0], c !== F && (c.chart = c.chart || {}, c.chart.renderTo = this[0], new ja[a](c, b[1]), g = this), c === F && (g = ka[y(this[0], "data-highcharts-chart")]));
                    return g
                }
            }, addAnimSetter: function (b, c) {
                a.Tween ? a.Tween.propHooks[b] = {set: c} : a.fx.step[b] = c
            }, getScript: a.getScript, inArray: a.inArray, adapterRun: function (b, c) {
                return a(b)[c]()
            }, grep: a.grep, map: function (a, c) {
                for (var d = [], e = 0, f = a.length; e < f; e++)d[e] = c.call(a[e], a[e], e, a);
                return d
            }, offset: function (b) {
                return a(b).offset()
            },
            addEvent: function (b, c, d) {
                a(b).bind(c, d)
            }, removeEvent: function (b, c, d) {
                var e = O.removeEventListener ? "removeEventListener" : "detachEvent";
                O[e] && b && !b[e] && (b[e] = function () {
                });
                a(b).unbind(c, d)
            }, fireEvent: function (b, c, d, e) {
                var f = a.Event(c), g = "detached" + c, k;
                !sa && d && (delete d.layerX, delete d.layerY, delete d.returnValue);
                q(f, d);
                b[c] && (b[g] = b[c], b[c] = null);
                a.each(["preventDefault", "stopPropagation"], function (a, b) {
                    var c = f[b];
                    f[b] = function () {
                        try {
                            c.call(f)
                        } catch (a) {
                            "preventDefault" === b && (k = !0)
                        }
                    }
                });
                a(b).trigger(f);
                b[g] && (b[c] = b[g], b[g] = null);
                !e || f.isDefaultPrevented() || k || e(f)
            }, washMouseEvent: function (a) {
                var c = a.originalEvent || a;
                c.pageX === F && (c.pageX = a.pageX, c.pageY = a.pageY);
                return c
            }, animate: function (b, c, d) {
                var e = a(b);
                b.style || (b.style = {});
                c.d && (b.toD = c.d, c.d = 1);
                e.stop();
                c.opacity !== F && b.attr && (c.opacity += "px");
                b.hasAnim = 1;
                e.animate(c, d)
            }, stop: function (b) {
                b.hasAnim && a(b).stop()
            }
        }
    })(Y.jQuery);
    var Pa = Y.HighchartsAdapter, na = Pa || {};
    Pa && Pa.init.call(Pa, Wa);
    var Qa = na.adapterRun, Ra = na.inArray, A = na.each, nb = na.grep,
        vb = na.offset, Ya = na.map, ca = na.addEvent, ga = na.removeEvent, W = na.fireEvent, wb = na.washMouseEvent, ob = na.animate, Ha = na.stop, Za = {
            enabled: !0,
            x: 0,
            y: 15,
            style: {color: "#606060", cursor: "default", fontSize: "11px"}
        };
    da = {
        colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #8085e8 #8d4653 #91e8e1".split(" "),
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: "January February March April May June July August September October November December".split(" "),
            shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            decimalPoint: ".",
            numericSymbols: "kMGTPE".split(""),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: ","
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com@product.cdnpath@//Highstock 2.0.4/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com@product.cdnpath@//Highstock 2.0.4/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            backgroundColor: "#FFFFFF",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {theme: {zIndex: 20}, position: {align: "right", x: -10, y: 10}}
        },
        title: {text: "Chart title", align: "center", margin: 15, style: {color: "#333333", fontSize: "18px"}},
        subtitle: {text: "", align: "center", style: {color: "#555555"}},
        plotOptions: {
            line: {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {duration: 1E3},
                events: {},
                lineWidth: 2,
                marker: {
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    states: {
                        hover: {enabled: !0, lineWidthPlus: 1, radiusPlus: 2},
                        select: {fillColor: "#FFFFFF", lineColor: "#000000", lineWidth: 2}
                    }
                },
                point: {events: {}},
                dataLabels: L(Za, {
                    align: "center", enabled: !1, formatter: function () {
                        return null === this.y ? "" : P(this.y, -1)
                    }, verticalAlign: "bottom", y: 0
                }),
                cropThreshold: 300,
                pointRange: 0,
                states: {hover: {lineWidthPlus: 1, marker: {}, halo: {size: 10, opacity: .25}}, select: {marker: {}}},
                stickyTracking: !0,
                turboThreshold: 1E3
            }
        },
        labels: {style: {position: "absolute", color: "#3E576F"}},
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function () {
                return this.name
            },
            borderColor: "#909090",
            borderRadius: 0,
            navigation: {activeColor: "#274b6d", inactiveColor: "#CCC"},
            shadow: !1,
            itemStyle: {color: "#333333", fontSize: "12px", fontWeight: "bold"},
            itemHoverStyle: {color: "#000"},
            itemHiddenStyle: {color: "#CCC"},
            itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {style: {fontWeight: "bold"}}
        },
        loading: {
            labelStyle: {
                fontWeight: "bold",
                position: "relative", top: "45%"
            }, style: {position: "absolute", backgroundColor: "white", opacity: .5, textAlign: "center"}
        },
        tooltip: {
            enabled: !0,
            animation: ia,
            backgroundColor: "rgba(249, 249, 249, .85)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
            shadow: !0,
            snap: lb ? 25 : 10,
            style: {color: "#333333", cursor: "default", fontSize: "12px", padding: "8px", whiteSpace: "nowrap"}
        },
        credits: {
            enabled: !0,
            text: "Highcharts.com",
            href: "http://www.highcharts.com",
            position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
            style: {cursor: "pointer", color: "#909090", fontSize: "9px"}
        }
    };
    var Aa = da.plotOptions, xb = Aa.line;
    $a();
    var yb = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        zb = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, Ab = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, Ba = function (a) {
            var b = [], c, d;
            (function (a) {
                a && a.stops ? d = Ya(a.stops, function (a) {
                    return Ba(a[1])
                }) : (c = yb.exec(a)) ? b = [I(c[1]), I(c[2]), I(c[3]), parseFloat(c[4], 10)] : (c = zb.exec(a)) ? b = [I(c[1], 16), I(c[2], 16), I(c[3], 16), 1] : (c = Ab.exec(a)) && (b = [I(c[1]), I(c[2]), I(c[3]), 1])
            })(a);
            return {
                get: function (c) {
                    var f;
                    d ? (f = L(a), f.stops = [].concat(f.stops), A(d, function (a, b) {
                        f.stops[b] = [f.stops[b][0], a.get(c)]
                    })) :
                        f = b && !isNaN(b[0]) ? "rgb" === c ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" : "a" === c ? b[3] : "rgba(" + b.join(",") + ")" : a;
                    return f
                }, brighten: function (a) {
                    if (d)A(d, function (b) {
                        b.brighten(a)
                    }); else if (T(a) && 0 !== a) {
                        var c;
                        for (c = 0; 3 > c; c++)b[c] += I(255 * a), 0 > b[c] && (b[c] = 0), 255 < b[c] && (b[c] = 255)
                    }
                    return this
                }, rgba: b, setOpacity: function (a) {
                    b[3] = a;
                    return this
                }
            }
        };
    S.prototype = {
        opacity: 1,
        textProps: "fontSize fontWeight fontFamily color lineHeight width textDecoration textShadow HcTextStroke".split(" "),
        init: function (a, b) {
            this.element =
                "span" === b ? C(b) : O.createElementNS("http://www.w3.org/2000/svg", b);
            this.renderer = a
        },
        animate: function (a, b, c) {
            b = h(b, pa, !0);
            Ha(this);
            b ? (b = L(b, {}), c && (b.complete = c), ob(this, a, b)) : (this.attr(a), c && c());
            return this
        },
        colorGradient: function (a, b, c) {
            var d = this.renderer, e, f, g, k, n, u, B, G, x, w, h = [];
            a.linearGradient ? f = "linearGradient" : a.radialGradient && (f = "radialGradient");
            if (f) {
                g = a[f];
                k = d.gradients;
                u = a.stops;
                x = c.radialReference;
                R(g) && (a[f] = g = {x1: g[0], y1: g[1], x2: g[2], y2: g[3], gradientUnits: "userSpaceOnUse"});
                "radialGradient" ===
                f && x && !r(g.gradientUnits) && (g = L(g, {
                    cx: x[0] - x[2] / 2 + g.cx * x[2],
                    cy: x[1] - x[2] / 2 + g.cy * x[2],
                    r: g.r * x[2],
                    gradientUnits: "userSpaceOnUse"
                }));
                for (w in g)"id" !== w && h.push(w, g[w]);
                for (w in u)h.push(u[w]);
                h = h.join(",");
                k[h] ? a = k[h].attr("id") : (g.id = a = "highcharts-" + Va++, k[h] = n = d.createElement(f).attr(g).add(d.defs), n.stops = [], A(u, function (a) {
                    0 === a[1].indexOf("rgba") ? (e = Ba(a[1]), B = e.get("rgb"), G = e.get("a")) : (B = a[1], G = 1);
                    a = d.createElement("stop").attr({offset: a[0], "stop-color": B, "stop-opacity": G}).add(n);
                    n.stops.push(a)
                }));
                c.setAttribute(b, "url(" + d.url + "#" + a + ")")
            }
        },
        attr: function (a, b) {
            var c, d, e = this.element, f, g = this, k;
            "string" === typeof a && b !== F && (c = a, a = {}, a[c] = b);
            if ("string" === typeof a)g = (this[a + "Getter"] || this._defaultGetter).call(this, a, e); else {
                for (c in a)d = a[c], k = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) && (f || (this.symbolAttr(a), f = !0), k = !0), !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0), k || (this[c + "Setter"] || this._defaultSetter).call(this, d, c, e), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) &&
                this.updateShadows(c, d);
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            }
            return g
        },
        updateShadows: function (a, b) {
            for (var c = this.shadows, d = c.length; d--;)c[d].setAttribute(a, "height" === a ? K(b - (c[d].cutHeight || 0), 0) : "d" === a ? this.d : b)
        },
        addClass: function (a) {
            var b = this.element, c = y(b, "class") || "";
            -1 === c.indexOf(a) && y(b, "class", c + " " + a);
            return this
        },
        symbolAttr: function (a) {
            var b = this;
            A("x y r start end width height innerR anchorX anchorY".split(" "), function (c) {
                b[c] = h(a[c], b[c])
            });
            b.attr({
                d: b.renderer.symbols[b.symbolName](b.x,
                    b.y, b.width, b.height, b)
            })
        },
        clip: function (a) {
            return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
        },
        crisp: function (a) {
            var b, c = {}, d, e = a.strokeWidth || this.strokeWidth || 0;
            d = M(e) % 2 / 2;
            a.x = la(a.x || this.x || 0) + d;
            a.y = la(a.y || this.y || 0) + d;
            a.width = la((a.width || this.width || 0) - 2 * d);
            a.height = la((a.height || this.height || 0) - 2 * d);
            a.strokeWidth = e;
            for (b in a)this[b] !== a[b] && (this[b] = c[b] = a[b]);
            return c
        },
        css: function (a) {
            var b = this.styles, c = {}, d = this.element, e, f, g = "";
            e = !b;
            a && a.color && (a.fill = a.color);
            if (b)for (f in a)a[f] !== b[f] && (c[f] = a[f], e = !0);
            if (e) {
                e = this.textWidth = a && a.width && "text" === d.nodeName.toLowerCase() && I(a.width);
                b && (a = q(b, c));
                this.styles = a;
                e && (oa || !ia && this.renderer.forExport) && delete a.width;
                if (sa && !ia)E(this.element, a); else {
                    b = function (a, b) {
                        return "-" + b.toLowerCase()
                    };
                    for (f in a)g += f.replace(/([A-Z])/g, b) + ":" + a[f] + ";";
                    y(d, "style", g)
                }
                e && this.added && this.renderer.buildText(this)
            }
            return this
        },
        on: function (a, b) {
            var c = this, d = c.element;
            Fa && "click" === a ? (d.ontouchstart = function (a) {
                c.touchEventFired =
                    Ma.now();
                a.preventDefault();
                b.call(d, a)
            }, d.onclick = function (a) {
                (-1 === ta.indexOf("Android") || 1100 < Ma.now() - (c.touchEventFired || 0)) && b.call(d, a)
            }) : d["on" + a] = b;
            return this
        },
        setRadialReference: function (a) {
            this.element.radialReference = a;
            return this
        },
        translate: function (a, b) {
            return this.attr({translateX: a, translateY: b})
        },
        invert: function () {
            this.inverted = !0;
            this.updateTransform();
            return this
        },
        updateTransform: function () {
            var a = this.translateX || 0, b = this.translateY || 0, c = this.scaleX, d = this.scaleY, e = this.inverted,
                f = this.rotation, g = this.element;
            e && (a += this.attr("width"), b += this.attr("height"));
            a = ["translate(" + a + "," + b + ")"];
            e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")");
            (r(c) || r(d)) && a.push("scale(" + h(c, 1) + " " + h(d, 1) + ")");
            a.length && g.setAttribute("transform", a.join(" "))
        },
        toFront: function () {
            var a = this.element;
            a.parentNode.appendChild(a);
            return this
        },
        align: function (a, b, c) {
            var d, e, f, g, k = {};
            e = this.renderer;
            f = e.alignedObjects;
            if (a) {
                if (this.alignOptions =
                        a, this.alignByTranslate = b, !c || aa(c))this.alignTo = d = c || "renderer", D(f, this), f.push(this), c = null
            } else a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo;
            c = h(c, e[d], e);
            d = a.align;
            e = a.verticalAlign;
            f = (c.x || 0) + (a.x || 0);
            g = (c.y || 0) + (a.y || 0);
            if ("right" === d || "center" === d)f += (c.width - (a.width || 0)) / {right: 1, center: 2}[d];
            k[b ? "translateX" : "x"] = M(f);
            if ("bottom" === e || "middle" === e)g += (c.height - (a.height || 0)) / ({bottom: 1, middle: 2}[e] || 1);
            k[b ? "translateY" : "y"] = M(g);
            this[this.placed ? "animate" : "attr"](k);
            this.placed = !0;
            this.alignAttr = k;
            return this
        },
        getBBox: function () {
            var a = this.bBox, b = this.renderer, c, d, e = this.rotation;
            c = this.element;
            var f = this.styles, g = e * jb;
            d = this.textStr;
            var k;
            if ("" === d || ub.test(d))k = "num." + d.toString().length + (f ? "|" + f.fontSize + "|" + f.fontFamily : "");
            k && (a = b.cache[k]);
            if (!a) {
                if ("http://www.w3.org/2000/svg" === c.namespaceURI || b.forExport) {
                    try {
                        a = c.getBBox ? q({}, c.getBBox()) : {width: c.offsetWidth, height: c.offsetHeight}
                    } catch (n) {
                    }
                    if (!a || 0 > a.width)a = {width: 0, height: 0}
                } else a = this.htmlGetBBox();
                b.isSVG &&
                (c = a.width, d = a.height, sa && f && "11px" === f.fontSize && "16.9" === d.toPrecision(3) && (a.height = d = 14), e && (a.width = X(d * Oa(g)) + X(c * Ea(g)), a.height = X(d * Ea(g)) + X(c * Oa(g))));
                this.bBox = a;
                k && (b.cache[k] = a)
            }
            return a
        },
        show: function (a) {
            a && "http://www.w3.org/2000/svg" === this.element.namespaceURI ? this.element.removeAttribute("visibility") : this.attr({visibility: a ? "inherit" : "visible"});
            return this
        },
        hide: function () {
            return this.attr({visibility: "hidden"})
        },
        fadeOut: function (a) {
            var b = this;
            b.animate({opacity: 0}, {
                duration: a ||
                150, complete: function () {
                    b.attr({y: -9999})
                }
            })
        },
        add: function (a) {
            var b = this.renderer, c = a || b, d = c.element || b.box, e = this.element, f = this.zIndex, g, k;
            a && (this.parentGroup = a);
            this.parentInverted = a && a.inverted;
            void 0 !== this.textStr && b.buildText(this);
            f && (c.handleZ = !0, f = I(f));
            if (c.handleZ)for (a = d.childNodes, g = 0; g < a.length; g++)if (b = a[g], c = y(b, "zIndex"), b !== e && (I(c) > f || !r(f) && r(c))) {
                d.insertBefore(e, b);
                k = !0;
                break
            }
            k || d.appendChild(e);
            this.added = !0;
            if (this.onAdd)this.onAdd();
            return this
        },
        safeRemoveChild: function (a) {
            var b =
                a.parentNode;
            b && b.removeChild(a)
        },
        destroy: function () {
            var a = this, b = a.element || {}, c = a.shadows, d = a.renderer.isSVG && "SPAN" === b.nodeName && a.parentGroup, e, f;
            b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
            Ha(a);
            a.clipPath && (a.clipPath = a.clipPath.destroy());
            if (a.stops) {
                for (f = 0; f < a.stops.length; f++)a.stops[f] = a.stops[f].destroy();
                a.stops = null
            }
            a.safeRemoveChild(b);
            for (c && A(c, function (b) {
                a.safeRemoveChild(b)
            }); d && d.div && 0 === d.div.childNodes.length;)b = d.parentGroup, a.safeRemoveChild(d.div), delete d.div,
                d = b;
            a.alignTo && D(a.renderer.alignedObjects, a);
            for (e in a)delete a[e];
            return null
        },
        shadow: function (a, b, c) {
            var d = [], e, f, g = this.element, k, n, u, B;
            if (a) {
                n = h(a.width, 3);
                u = (a.opacity || .15) / n;
                B = this.parentInverted ? "(-1,-1)" : "(" + h(a.offsetX, 1) + ", " + h(a.offsetY, 1) + ")";
                for (e = 1; e <= n; e++)f = g.cloneNode(0), k = 2 * n + 1 - 2 * e, y(f, {
                    isShadow: "true",
                    stroke: a.color || "black",
                    "stroke-opacity": u * e,
                    "stroke-width": k,
                    transform: "translate" + B,
                    fill: "none"
                }), c && (y(f, "height", K(y(f, "height") - k, 0)), f.cutHeight = k), b ? b.element.appendChild(f) :
                    g.parentNode.insertBefore(f, g), d.push(f);
                this.shadows = d
            }
            return this
        },
        xGetter: function (a) {
            "circle" === this.element.nodeName && (a = {x: "cx", y: "cy"}[a] || a);
            return this._defaultGetter(a)
        },
        _defaultGetter: function (a) {
            a = h(this[a], this.element ? this.element.getAttribute(a) : null, 0);
            /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
            return a
        },
        dSetter: function (a, b, c) {
            a && a.join && (a = a.join(" "));
            /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
            c.setAttribute(b, a);
            this[b] = a
        },
        dashstyleSetter: function (a) {
            var b;
            if (a = a && a.toLowerCase()) {
                a =
                    a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                for (b = a.length; b--;)a[b] = I(a[b]) * this["stroke-width"];
                a = a.join(",").replace("NaN", "none");
                this.element.setAttribute("stroke-dasharray", a)
            }
        },
        alignSetter: function (a) {
            this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
        },
        opacitySetter: function (a,
                                 b, c) {
            this[b] = a;
            c.setAttribute(b, a)
        },
        titleSetter: function (a) {
            var b = this.element.getElementsByTagName("title")[0];
            b || (b = O.createElementNS("http://www.w3.org/2000/svg", "title"), this.element.appendChild(b));
            b.textContent = h(a, "").replace(/<[^>]*>/g, "")
        },
        textSetter: function (a) {
            a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
        },
        fillSetter: function (a, b, c) {
            "string" === typeof a ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c)
        },
        zIndexSetter: function (a, b, c) {
            c.setAttribute(b,
                a);
            this[b] = a
        },
        _defaultSetter: function (a, b, c) {
            c.setAttribute(b, a)
        }
    };
    S.prototype.yGetter = S.prototype.xGetter;
    S.prototype.translateXSetter = S.prototype.translateYSetter = S.prototype.rotationSetter = S.prototype.verticalAlignSetter = S.prototype.scaleXSetter = S.prototype.scaleYSetter = function (a, b) {
        this[b] = a;
        this.doTransform = !0
    };
    S.prototype["stroke-widthSetter"] = S.prototype.strokeSetter = function (a, b, c) {
        this[b] = a;
        this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], S.prototype.fillSetter.call(this,
            this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1)
    };
    var Ca = function () {
        this.init.apply(this, arguments)
    };
    Ca.prototype = {
        Element: S, init: function (a, b, c, d, e) {
            var f = location, g;
            d = this.createElement("svg").attr({version: "1.1"}).css(this.getStyle(d));
            g = d.element;
            a.appendChild(g);
            -1 === a.innerHTML.indexOf("xmlns") && y(g, "xmlns", "http://www.w3.org/2000/svg");
            this.isSVG = !0;
            this.box =
                g;
            this.boxWrapper = d;
            this.alignedObjects = [];
            this.url = (ya || Ua) && O.getElementsByTagName("base").length ? f.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
            this.createElement("desc").add().element.appendChild(O.createTextNode("Created with Highcharts 4.0.4 /Highstock 2.0.4"));
            this.defs = this.createElement("defs").add();
            this.forExport = e;
            this.gradients = {};
            this.cache = {};
            this.setSize(b, c, !1);
            var k;
            ya && a.getBoundingClientRect && (this.subPixelFix = b = function () {
                E(a, {left: 0, top: 0});
                k =
                    a.getBoundingClientRect();
                E(a, {left: ua(k.left) - k.left + "px", top: ua(k.top) - k.top + "px"})
            }, b(), ca(Y, "resize", b))
        }, getStyle: function (a) {
            return this.style = q({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, a)
        }, isHidden: function () {
            return !this.boxWrapper.getBBox().width
        }, destroy: function () {
            var a = this.defs;
            this.box = null;
            this.boxWrapper = this.boxWrapper.destroy();
            ra(this.gradients || {});
            this.gradients = null;
            a && (this.defs = a.destroy());
            this.subPixelFix && ga(Y, "resize",
                this.subPixelFix);
            return this.alignedObjects = null
        }, createElement: function (a) {
            var b = new this.Element;
            b.init(this, a);
            return b
        }, draw: function () {
        }, buildText: function (a) {
            for (var b = a.element, c = this, d = c.forExport, e = h(a.textStr, "").toString(), f = -1 !== e.indexOf("<"), g = b.childNodes, k, n, u = y(b, "x"), B = a.styles, G = a.textWidth, x = B && B.lineHeight, w = B && B.HcTextStroke, m = g.length, p = function (a) {
                return x ? I(x) : c.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : B && B.fontSize || c.style.fontSize || 12, a).h
            }; m--;)b.removeChild(g[m]);
            f || w || -1 !== e.indexOf(" ") ? (k = /<.*style="([^"]+)".*>/, n = /<.*href="(http[^"]+)".*>/, G && !a.added && this.box.appendChild(b), e = f ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [e], "" === e[e.length - 1] && e.pop(), A(e, function (e, f) {
                var g, x = 0;
                e = e.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                g = e.split("|||");
                A(g, function (e) {
                    if ("" !== e || 1 === g.length) {
                        var w =
                        {}, h = O.createElementNS("http://www.w3.org/2000/svg", "tspan"), m;
                        k.test(e) && (m = e.match(k)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), y(h, "style", m));
                        n.test(e) && !d && (y(h, "onclick", 'location.href="' + e.match(n)[1] + '"'), E(h, {cursor: "pointer"}));
                        e = (e.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                        if (" " !== e) {
                            h.appendChild(O.createTextNode(e));
                            x ? w.dx = 0 : f && null !== u && (w.x = u);
                            y(h, w);
                            b.appendChild(h);
                            !x && f && (!ia && d && E(h, {display: "block"}), y(h, "dy", p(h)));
                            if (G) {
                                e = e.replace(/([^\^])-/g,
                                    "$1- ").split(" ");
                                for (var w = 1 < g.length || 1 < e.length && "nowrap" !== B.whiteSpace, v, Ia, r = B.HcHeight, l = [], z = p(h), H = 1; w && (e.length || l.length);)delete a.bBox, v = a.getBBox(), Ia = v.width, !ia && c.forExport && (Ia = c.measureSpanWidth(h.firstChild.data, a.styles)), (v = Ia > G) && 1 !== e.length ? (h.removeChild(h.firstChild), l.unshift(e.pop())) : (e = l, l = [], e.length && (H++, r && H * z > r ? (e = ["..."], a.attr("title", a.textStr)) : (h = O.createElementNS("http://www.w3.org/2000/svg", "tspan"), y(h, {
                                    dy: z,
                                    x: u
                                }), m && y(h, "style", m), b.appendChild(h))),
                                Ia > G && (G = Ia)), e.length && h.appendChild(O.createTextNode(e.join(" ").replace(/- /g, "-")))
                            }
                            x++
                        }
                    }
                })
            })) : b.appendChild(O.createTextNode(e))
        }, button: function (a, b, c, d, e, f, g, k, n) {
            var u = this.label(a, b, c, n, null, null, null, null, "button"), B = 0, G, x, w, h, m, v;
            a = {x1: 0, y1: 0, x2: 0, y2: 1};
            e = L({
                "stroke-width": 1,
                stroke: "#CCCCCC",
                fill: {linearGradient: a, stops: [[0, "#FEFEFE"], [1, "#F6F6F6"]]},
                r: 2,
                padding: 5,
                style: {color: "black"}
            }, e);
            w = e.style;
            delete e.style;
            f = L(e, {stroke: "#68A", fill: {linearGradient: a, stops: [[0, "#FFF"], [1, "#ACF"]]}},
                f);
            h = f.style;
            delete f.style;
            g = L(e, {stroke: "#68A", fill: {linearGradient: a, stops: [[0, "#9BD"], [1, "#CDF"]]}}, g);
            m = g.style;
            delete g.style;
            k = L(e, {style: {color: "#CCC"}}, k);
            v = k.style;
            delete k.style;
            ca(u.element, sa ? "mouseover" : "mouseenter", function () {
                3 !== B && u.attr(f).css(h)
            });
            ca(u.element, sa ? "mouseout" : "mouseleave", function () {
                3 !== B && (G = [e, f, g][B], x = [w, h, m][B], u.attr(G).css(x))
            });
            u.setState = function (a) {
                (u.state = B = a) ? 2 === a ? u.attr(g).css(m) : 3 === a && u.attr(k).css(v) : u.attr(e).css(w)
            };
            return u.on("click", function () {
                3 !==
                B && d.call(u)
            }).attr(e).css(q({cursor: "default"}, w))
        }, crispLine: function (a, b) {
            a[1] === a[4] && (a[1] = a[4] = M(a[1]) - b % 2 / 2);
            a[2] === a[5] && (a[2] = a[5] = M(a[2]) + b % 2 / 2);
            return a
        }, path: function (a) {
            var b = {fill: "none"};
            R(a) ? b.d = a : N(a) && q(b, a);
            return this.createElement("path").attr(b)
        }, circle: function (a, b, c) {
            a = N(a) ? a : {x: a, y: b, r: c};
            b = this.createElement("circle");
            b.xSetter = function (a) {
                this.element.setAttribute("cx", a)
            };
            b.ySetter = function (a) {
                this.element.setAttribute("cy", a)
            };
            return b.attr(a)
        }, arc: function (a, b, c, d, e,
                          f) {
            N(a) && (b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x);
            a = this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {innerR: d || 0, start: e || 0, end: f || 0});
            a.r = c;
            return a
        }, rect: function (a, b, c, d, e, f) {
            e = N(a) ? a.r : e;
            var g = this.createElement("rect");
            a = N(a) ? a : a === F ? {} : {x: a, y: b, width: K(c, 0), height: K(d, 0)};
            f !== F && (a.strokeWidth = f, a = g.crisp(a));
            e && (a.r = e);
            g.rSetter = function (a) {
                y(this.element, {rx: a, ry: a})
            };
            return g.attr(a)
        }, setSize: function (a, b, c) {
            var d = this.alignedObjects, e = d.length;
            this.width = a;
            this.height = b;
            for (this.boxWrapper[h(c,
                !0) ? "animate" : "attr"]({width: a, height: b}); e--;)d[e].align()
        }, g: function (a) {
            var b = this.createElement("g");
            return r(a) ? b.attr({"class": "highcharts-" + a}) : b
        }, image: function (a, b, c, d, e) {
            var f = {preserveAspectRatio: "none"};
            1 < arguments.length && q(f, {x: b, y: c, width: d, height: e});
            f = this.createElement("image").attr(f);
            f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a);
            return f
        }, symbol: function (a, b, c, d, e, f) {
            var g, k = this.symbols[a], k =
                k && k(M(b), M(c), d, e, f), n = /^url\((.*?)\)$/, u, B;
            k ? (g = this.path(k), q(g, {
                symbolName: a,
                x: b,
                y: c,
                width: d,
                height: e
            }), f && q(g, f)) : n.test(a) && (B = function (a, b) {
                a.element && (a.attr({
                    width: b[0],
                    height: b[1]
                }), a.alignByTranslate || a.translate(M((d - b[0]) / 2), M((e - b[1]) / 2)))
            }, u = a.match(n)[1], a = mb[u] || f && f.width && f.height && [f.width, f.height], g = this.image(u).attr({
                x: b,
                y: c
            }), g.isImg = !0, a ? B(g, a) : (g.attr({width: 0, height: 0}), C("img", {
                onload: function () {
                    B(g, mb[u] = [this.width, this.height])
                }, src: u
            })));
            return g
        }, symbols: {
            circle: function (a,
                              b, c, d) {
                var e = .166 * c;
                return ["M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z"]
            }, square: function (a, b, c, d) {
                return ["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]
            }, triangle: function (a, b, c, d) {
                return ["M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"]
            }, "triangle-down": function (a, b, c, d) {
                return ["M", a, b, "L", a + c, b, a + c / 2, b + d, "Z"]
            }, diamond: function (a, b, c, d) {
                return ["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"]
            }, arc: function (a, b, c, d, e) {
                var f = e.start;
                c = e.r || c || d;
                var g = e.end - .001;
                d = e.innerR;
                var k = e.open, n = Ea(f), u =
                    Oa(f), B = Ea(g), g = Oa(g);
                e = e.end - f < ib ? 0 : 1;
                return ["M", a + c * n, b + c * u, "A", c, c, 0, e, 1, a + c * B, b + c * g, k ? "M" : "L", a + d * B, b + d * g, "A", d, d, 0, e, 0, a + d * n, b + d * u, k ? "" : "Z"]
            }, callout: function (a, b, c, d, e) {
                var f = Z(e && e.r || 0, c, d), g = f + 6, k = e && e.anchorX, n = e && e.anchorY;
                e = M(e.strokeWidth || 0) % 2 / 2;
                a += e;
                b += e;
                e = ["M", a + f, b, "L", a + c - f, b, "C", a + c, b, a + c, b, a + c, b + f, "L", a + c, b + d - f, "C", a + c, b + d, a + c, b + d, a + c - f, b + d, "L", a + f, b + d, "C", a, b + d, a, b + d, a, b + d - f, "L", a, b + f, "C", a, b, a, b, a + f, b];
                k && k > c && n > b + g && n < b + d - g ? e.splice(13, 3, "L", a + c, n - 6, a + c + 6, n, a + c, n + 6, a + c, b + d -
                f) : k && 0 > k && n > b + g && n < b + d - g ? e.splice(33, 3, "L", a, n + 6, a - 6, n, a, n - 6, a, b + f) : n && n > d && k > a + g && k < a + c - g ? e.splice(23, 3, "L", k + 6, b + d, k, b + d + 6, k - 6, b + d, a + f, b + d) : n && 0 > n && k > a + g && k < a + c - g && e.splice(3, 3, "L", k - 6, b, k, b - 6, k + 6, b, c - f, b);
                return e
            }
        }, clipRect: function (a, b, c, d) {
            var e = "highcharts-" + Va++, f = this.createElement("clipPath").attr({id: e}).add(this.defs);
            a = this.rect(a, b, c, d, 0).add(f);
            a.id = e;
            a.clipPath = f;
            return a
        }, text: function (a, b, c, d) {
            var e = oa || !ia && this.forExport, f = {};
            if (d && !this.forExport)return this.html(a, b, c);
            f.x =
                Math.round(b || 0);
            c && (f.y = Math.round(c));
            if (a || 0 === a)f.text = a;
            a = this.createElement("text").attr(f);
            e && a.css({position: "absolute"});
            d || (a.xSetter = function (a, b, c) {
                var d = c.getElementsByTagName("tspan"), e, f = c.getAttribute(b), x;
                for (x = 0; x < d.length; x++)e = d[x], e.getAttribute(b) === f && e.setAttribute(b, a);
                c.setAttribute(b, a)
            });
            return a
        }, fontMetrics: function (a, b) {
            a = a || this.style.fontSize;
            b && Y.getComputedStyle && (b = b.element || b, a = Y.getComputedStyle(b, "").fontSize);
            a = /px/.test(a) ? I(a) : /em/.test(a) ? 12 * parseFloat(a) :
                12;
            var c = 24 > a ? a + 4 : M(1.2 * a), d = M(.8 * c);
            return {h: c, b: d, f: a}
        }, label: function (a, b, c, d, e, f, g, k, n) {
            function u() {
                var a, b;
                a = h.element.style;
                v = (void 0 === H || void 0 === t || w.styles.textAlign) && h.textStr && h.getBBox();
                w.width = (H || v.width || 0) + 2 * l + z;
                w.height = (t || v.height || 0) + 2 * l;
                Q = l + x.fontMetrics(a && a.fontSize, h).b;
                U && (m || (a = M(-p * l), b = k ? -Q : 0, w.box = m = d ? x.symbol(d, a, b, w.width, w.height, qa) : x.rect(a, b, w.width, w.height, 0, qa["stroke-width"]), m.attr("fill", "none").add(w)), m.isImg || m.attr(q({
                        width: M(w.width),
                        height: M(w.height)
                    },
                    qa)), qa = null)
            }

            function B() {
                var a = w.styles, a = a && a.textAlign, b = z + l * (1 - p), c;
                c = k ? 0 : Q;
                r(H) && v && ("center" === a || "right" === a) && (b += {center: .5, right: 1}[a] * (H - v.width));
                if (b !== h.x || c !== h.y)h.attr("x", b), c !== F && h.attr("y", c);
                h.x = b;
                h.y = c
            }

            function G(a, b) {
                m ? m.attr(a, b) : qa[a] = b
            }

            var x = this, w = x.g(n), h = x.text("", 0, 0, g).attr({zIndex: 1}), m, v, p = 0, l = 3, z = 0, H, t, J, D, y = 0, qa = {}, Q, U;
            w.onAdd = function () {
                h.add(w);
                w.attr({text: a || 0 === a ? a : "", x: b, y: c});
                m && r(e) && w.attr({anchorX: e, anchorY: f})
            };
            w.widthSetter = function (a) {
                H = a
            };
            w.heightSetter =
                function (a) {
                    t = a
                };
            w.paddingSetter = function (a) {
                r(a) && a !== l && (l = a, B())
            };
            w.paddingLeftSetter = function (a) {
                r(a) && a !== z && (z = a, B())
            };
            w.alignSetter = function (a) {
                p = {left: 0, center: .5, right: 1}[a]
            };
            w.textSetter = function (a) {
                a !== F && h.textSetter(a);
                u();
                B()
            };
            w["stroke-widthSetter"] = function (a, b) {
                a && (U = !0);
                y = a % 2 / 2;
                G(b, a)
            };
            w.strokeSetter = w.fillSetter = w.rSetter = function (a, b) {
                "fill" === b && a && (U = !0);
                G(b, a)
            };
            w.anchorXSetter = function (a, b) {
                e = a;
                G(b, a + y - J)
            };
            w.anchorYSetter = function (a, b) {
                f = a;
                G(b, a - D)
            };
            w.xSetter = function (a) {
                w.x =
                    a;
                p && (a -= p * ((H || v.width) + l));
                J = M(a);
                w.attr("translateX", J)
            };
            w.ySetter = function (a) {
                D = w.y = M(a);
                w.attr("translateY", D)
            };
            var K = w.css;
            return q(w, {
                css: function (a) {
                    if (a) {
                        var b = {};
                        a = L(a);
                        A(w.textProps, function (c) {
                            a[c] !== F && (b[c] = a[c], delete a[c])
                        });
                        h.css(b)
                    }
                    return K.call(w, a)
                }, getBBox: function () {
                    return {width: v.width + 2 * l, height: v.height + 2 * l, x: v.x - l, y: v.y - l}
                }, shadow: function (a) {
                    m && m.shadow(a);
                    return w
                }, destroy: function () {
                    ga(w.element, "mouseenter");
                    ga(w.element, "mouseleave");
                    h && (h = h.destroy());
                    m && (m = m.destroy());
                    S.prototype.destroy.call(w);
                    w = x = u = B = G = null
                }
            })
        }
    };
    q(S.prototype, {
        htmlCss: function (a) {
            var b = this.element;
            if (b = a && "SPAN" === b.tagName && a.width)delete a.width, this.textWidth = b, this.updateTransform();
            this.styles = q(this.styles, a);
            E(this.element, a);
            return this
        }, htmlGetBBox: function () {
            var a = this.element, b = this.bBox;
            b || ("text" === a.nodeName && (a.style.position = "absolute"), b = this.bBox = {
                x: a.offsetLeft,
                y: a.offsetTop,
                width: a.offsetWidth,
                height: a.offsetHeight
            });
            return b
        }, htmlUpdateTransform: function () {
            if (this.added) {
                var a =
                    this.renderer, b = this.element, c = this.translateX || 0, d = this.translateY || 0, e = this.x || 0, f = this.y || 0, g = this.textAlign || "left", k = {
                    left: 0,
                    center: .5,
                    right: 1
                }[g], n = this.shadows;
                E(b, {marginLeft: c, marginTop: d});
                n && A(n, function (a) {
                    E(a, {marginLeft: c + 1, marginTop: d + 1})
                });
                this.inverted && A(b.childNodes, function (c) {
                    a.invertChild(c, b)
                });
                if ("SPAN" === b.tagName) {
                    var u = this.rotation, B, G = I(this.textWidth), x = [u, g, b.innerHTML, this.textWidth].join();
                    x !== this.cTT && (B = a.fontMetrics(b.style.fontSize).b, r(u) && this.setSpanRotation(u,
                        k, B), n = h(this.elemWidth, b.offsetWidth), n > G && /[ \-]/.test(b.textContent || b.innerText) && (E(b, {
                        width: G + "px",
                        display: "block",
                        whiteSpace: "normal"
                    }), n = G), this.getSpanCorrection(n, B, k, u, g));
                    E(b, {left: e + (this.xCorr || 0) + "px", top: f + (this.yCorr || 0) + "px"});
                    Ua && (B = b.offsetHeight);
                    this.cTT = x
                }
            } else this.alignOnAdd = !0
        }, setSpanRotation: function (a, b, c) {
            var d = {}, e = sa ? "-ms-transform" : Ua ? "-webkit-transform" : ya ? "MozTransform" : kb ? "-o-transform" : "";
            d[e] = d.transform = "rotate(" + a + "deg)";
            d[e + (ya ? "Origin" : "-origin")] = d.transformOrigin =
                100 * b + "% " + c + "px";
            E(this.element, d)
        }, getSpanCorrection: function (a, b, c) {
            this.xCorr = -a * c;
            this.yCorr = -b
        }
    });
    q(Ca.prototype, {
        html: function (a, b, c) {
            var d = this.createElement("span"), e = d.element, f = d.renderer;
            d.textSetter = function (a) {
                a !== e.innerHTML && delete this.bBox;
                e.innerHTML = this.textStr = a
            };
            d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function (a, b) {
                "align" === b && (b = "textAlign");
                d[b] = a;
                d.htmlUpdateTransform()
            };
            d.attr({text: a, x: M(b), y: M(c)}).css({
                position: "absolute", whiteSpace: "nowrap", fontFamily: this.style.fontFamily,
                fontSize: this.style.fontSize
            });
            d.css = d.htmlCss;
            f.isSVG && (d.add = function (a) {
                var b, c = f.box.parentNode, u = [];
                if (this.parentGroup = a) {
                    if (b = a.div, !b) {
                        for (; a;)u.push(a), a = a.parentGroup;
                        A(u.reverse(), function (a) {
                            var d;
                            b = a.div = a.div || C("div", {className: y(a.element, "class")}, {
                                position: "absolute",
                                left: (a.translateX || 0) + "px",
                                top: (a.translateY || 0) + "px"
                            }, b || c);
                            d = b.style;
                            q(a, {
                                translateXSetter: function (b, c) {
                                    d.left = b + "px";
                                    a[c] = b;
                                    a.doTransform = !0
                                }, translateYSetter: function (b, c) {
                                    d.top = b + "px";
                                    a[c] = b;
                                    a.doTransform = !0
                                },
                                visibilitySetter: function (a, b) {
                                    d[b] = a
                                }
                            })
                        })
                    }
                } else b = c;
                b.appendChild(e);
                d.added = !0;
                d.alignOnAdd && d.htmlUpdateTransform();
                return d
            });
            return d
        }
    });
    wa.prototype = {
        addLabel: function () {
            var a = this.axis, b = a.options, c = a.chart, d = a.horiz, e = a.categories, f = a.names, g = this.pos, k = b.labels, n = k.rotation, u = a.tickPositions, d = d && e && !k.step && !k.staggerLines && !k.rotation && c.plotWidth / u.length || !d && (c.margin[3] || .33 * c.chartWidth), B = g === u[0], G = g === u[u.length - 1], x, f = e ? h(e[g], f[g], g) : g, e = this.label, w = u.info;
            a.isDatetimeAxis &&
            w && (x = b.dateTimeLabelFormats[w.higherRanks[g] || w.unitName]);
            this.isFirst = B;
            this.isLast = G;
            b = a.labelFormatter.call({
                axis: a,
                chart: c,
                isFirst: B,
                isLast: G,
                dateTimeLabelFormat: x,
                value: a.isLog ? V(p(f)) : f
            });
            g = d && {width: K(1, M(d - 2 * (k.padding || 10))) + "px"};
            r(e) ? e && e.attr({text: b}).css(g) : (x = {align: a.labelAlign}, T(n) && (x.rotation = n), d && k.ellipsis && (g.HcHeight = a.len / u.length), this.label = e = r(b) && k.enabled ? c.renderer.text(b, 0, 0, k.useHTML).attr(x).css(q(g, k.style)).add(a.labelGroup) : null, a.tickBaseline = c.renderer.fontMetrics(k.style.fontSize,
                e).b, n && 2 === a.side && (a.tickBaseline *= Ea(n * jb)));
            this.yOffset = e ? h(k.y, a.tickBaseline + (2 === a.side ? 8 : -(e.getBBox().height / 2))) : 0
        }, getLabelSize: function () {
            var a = this.label, b = this.axis;
            return a ? a.getBBox()[b.horiz ? "height" : "width"] : 0
        }, getLabelSides: function () {
            var a = this.label.getBBox(), b = this.axis, c = b.horiz, d = b.options.labels, a = c ? a.width : a.height, b = c ? d.x - a * {
                left: 0,
                center: .5,
                right: 1
            }[b.labelAlign] : 0;
            return [b, c ? a + b : a]
        }, handleOverflow: function (a, b) {
            var c = !0, d = this.axis, e = this.isFirst, f = this.isLast, g = d.horiz ?
                b.x : b.y, k = d.reversed, n = d.tickPositions, u = this.getLabelSides(), B = u[0], u = u[1], G, x, w, h = this.label.line;
            G = h || 0;
            x = d.labelEdge;
            w = d.justifyLabels && (e || f);
            x[G] === F || g + B > x[G] ? x[G] = g + u : w || (c = !1);
            if (w) {
                G = (x = d.justifyToPlot) ? d.pos : 0;
                x = x ? G + d.len : d.chart.chartWidth;
                do a += e ? 1 : -1, w = d.ticks[n[a]]; while (n[a] && (!w || !w.label || w.label.line !== h));
                d = w && w.label.xy && w.label.xy.x + w.getLabelSides()[e ? 0 : 1];
                e && !k || f && k ? g + B < G && (g = G - B, w && g + u > d && (c = !1)) : g + u > x && (g = x - u, w && g + B < d && (c = !1));
                b.x = g
            }
            return c
        }, getPosition: function (a, b, c,
                                  d) {
            var e = this.axis, f = e.chart, g = d && f.oldChartHeight || f.chartHeight;
            return {
                x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
                y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
            }
        }, getLabelPosition: function (a, b, c, d, e, f, g, k) {
            var n = this.axis, u = n.transA, B = n.reversed, G = n.staggerLines;
            a = a + e.x - (f && d ? f * u * (B ? -1 : 1) : 0);
            b = b + this.yOffset - (f && !d ? f * u * (B ? 1 : -1) : 0);
            G && (c.line = g / (k || 1) % G, b += n.labelOffset / G * c.line);
            return {x: a, y: b}
        }, getMarkPath: function (a, b, c, d, e, f) {
            return f.crispLine(["M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d)
        }, render: function (a, b, c) {
            var d = this.axis, e = d.options, f = d.chart.renderer, g = d.horiz, k = this.type, n = this.label, u = this.pos, B = e.labels, G = this.gridLine, x = k ? k + "Grid" : "grid", w = k ? k + "Tick" : "tick", m = e[x + "LineWidth"], v = e[x + "LineColor"], p = e[x + "LineDashStyle"], l = e[w + "Length"], x = e[w + "Width"] || 0, r = e[w + "Color"], H = e[w + "Position"], w = this.mark, z = B.step, A = !0, q = d.tickmarkOffset, t = this.getPosition(g, u, q, b), J = t.x, t =
                t.y, D = g && J === d.pos + d.len || !g && t === d.pos ? -1 : 1;
            c = h(c, 1);
            this.isActive = !0;
            if (m && (u = d.getPlotLinePath(u + q, m * D, b, !0), G === F && (G = {
                    stroke: v,
                    "stroke-width": m
                }, p && (G.dashstyle = p), k || (G.zIndex = 1), b && (G.opacity = 0), this.gridLine = G = m ? f.path(u).attr(G).add(d.gridGroup) : null), !b && G && u))G[this.isNew ? "attr" : "animate"]({
                d: u,
                opacity: c
            });
            x && l && ("inside" === H && (l = -l), d.opposite && (l = -l), k = this.getMarkPath(J, t, l, x * D, g, f), w ? w.animate({
                d: k,
                opacity: c
            }) : this.mark = f.path(k).attr({stroke: r, "stroke-width": x, opacity: c}).add(d.axisGroup));
            n && !isNaN(J) && (n.xy = t = this.getLabelPosition(J, t, n, g, B, q, a, z), this.isFirst && !this.isLast && !h(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !h(e.showLastLabel, 1) ? A = !1 : d.isRadial || B.step || B.rotation || b || 0 === c || (A = this.handleOverflow(a, t)), z && a % z && (A = !1), A && !isNaN(t.y) ? (t.opacity = c, n[this.isNew ? "attr" : "animate"](t), this.isNew = !1) : n.attr("y", -9999))
        }, destroy: function () {
            ra(this, this.axis)
        }
    };
    xa.prototype = {
        defaultOptions: {
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L", second: "%H:%M:%S", minute: "%H:%M",
                hour: "%H:%M", day: "%e. %b", week: "%e. %b", month: "%b '%y", year: "%Y"
            },
            endOnTick: !1,
            gridLineColor: "#C0C0C0",
            labels: Za,
            lineColor: "#C0D0E0",
            lineWidth: 1,
            minPadding: .01,
            maxPadding: .01,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            startOfWeek: 1,
            startOnTick: !1,
            tickColor: "#C0D0E0",
            tickLength: 10,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            tickWidth: 1,
            title: {align: "middle", style: {color: "#707070"}},
            type: "linear"
        },
        defaultYAxisOptions: {
            endOnTick: !0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {x: -8, y: 3},
            lineWidth: 0,
            maxPadding: .05,
            minPadding: .05,
            startOnTick: !0,
            tickWidth: 0,
            title: {rotation: 270, text: "Values"},
            stackLabels: {
                enabled: !1, formatter: function () {
                    return P(this.total, -1)
                }, style: Za.style
            }
        },
        defaultLeftAxisOptions: {labels: {x: -15, y: null}, title: {rotation: 270}},
        defaultRightAxisOptions: {labels: {x: 15, y: null}, title: {rotation: 90}},
        defaultBottomAxisOptions: {labels: {x: 0, y: null}, title: {rotation: 0}},
        defaultTopAxisOptions: {
            labels: {
                x: 0,
                y: -15
            }, title: {rotation: 0}
        },
        init: function (a, b) {
            var c = b.isX;
            this.horiz = a.inverted ? !c : c;
            this.coll = (this.isXAxis = c) ? "xAxis" : "yAxis";
            this.opposite = b.opposite;
            this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
            this.setOptions(b);
            var d = this.options, e = d.type;
            this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter;
            this.userOptions = b;
            this.minPixelPadding = 0;
            this.chart = a;
            this.reversed = d.reversed;
            this.zoomEnabled = !1 !== d.zoomEnabled;
            this.categories = d.categories || "category" === e;
            this.names =
                [];
            this.isLog = "logarithmic" === e;
            this.isDatetimeAxis = "datetime" === e;
            this.isLinked = r(d.linkedTo);
            this.tickmarkOffset = this.categories && "between" === d.tickmarkPlacement && 1 === h(d.tickInterval, 1) ? .5 : 0;
            this.ticks = {};
            this.labelEdge = [];
            this.minorTicks = {};
            this.plotLinesAndBands = [];
            this.alternateBands = {};
            this.len = 0;
            this.minRange = this.userMinRange = d.minRange || d.maxZoom;
            this.range = d.range;
            this.offset = d.offset || 0;
            this.stacks = {};
            this.oldStacks = {};
            this.min = this.max = null;
            this.crosshair = h(d.crosshair, t(a.options.tooltip.crosshairs)[c ?
                0 : 1], !1);
            var f, d = this.options.events;
            -1 === Ra(this, a.axes) && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
            this.series = this.series || [];
            a.inverted && c && this.reversed === F && (this.reversed = !0);
            this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
            for (f in d)ca(this, f, d[f]);
            this.isLog && (this.val2lin = l, this.lin2val = p)
        },
        setOptions: function (a) {
            this.options = L(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions,
                this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], L(da[this.coll], a))
        },
        defaultLabelFormatter: function () {
            var a = this.axis, b = this.value, c = a.categories, d = this.dateTimeLabelFormat, e = da.lang.numericSymbols, f = e && e.length, g, k = a.options.labels.format, a = a.isLog ? b : a.tickInterval;
            if (k)g = m(k, this); else if (c)g = b; else if (d)g = Ka(d, b); else if (f && 1E3 <= a)for (; f-- && g === F;)c = Math.pow(1E3, f + 1), a >= c && null !== e[f] && (g = P(b / c, -1) + e[f]);
            g === F && (g = 1E4 <= X(b) ? P(b, 0) : P(b, -1, F, ""));
            return g
        },
        getSeriesExtremes: function () {
            var a = this, b = a.chart;
            a.hasVisibleSeries = !1;
            a.dataMin = a.dataMax = a.ignoreMinPadding = a.ignoreMaxPadding = null;
            a.buildStacks && a.buildStacks();
            A(a.series, function (c) {
                if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                    var d;
                    d = c.options.threshold;
                    var e;
                    a.hasVisibleSeries = !0;
                    a.isLog && 0 >= d && (d = null);
                    a.isXAxis ? (d = c.xData, d.length && (a.dataMin = Z(h(a.dataMin, d[0]), Q(d)), a.dataMax = K(h(a.dataMax, d[0]), va(d)))) : (c.getExtremes(), e = c.dataMax, c = c.dataMin, r(c) && r(e) && (a.dataMin =
                        Z(h(a.dataMin, c), c), a.dataMax = K(h(a.dataMax, e), e)), r(d) && (a.dataMin >= d ? (a.dataMin = d, a.ignoreMinPadding = !0) : a.dataMax < d && (a.dataMax = d, a.ignoreMaxPadding = !0)))
                }
            })
        },
        translate: function (a, b, c, d, e, f) {
            var g = 1, k = 0, n = d ? this.oldTransA : this.transA;
            d = d ? this.oldMin : this.min;
            var u = this.minPixelPadding;
            e = (this.options.ordinal || this.isLog && e) && this.lin2val;
            n || (n = this.transA);
            c && (g *= -1, k = this.len);
            this.reversed && (g *= -1, k -= g * (this.sector || this.len));
            b ? (a = a * g + k - u, a = a / n + d, e && (a = this.lin2val(a))) : (e && (a = this.val2lin(a)),
            "between" === f && (f = .5), a = g * (a - d) * n + k + g * u + (T(f) ? n * f * this.pointRange : 0));
            return a
        },
        toPixels: function (a, b) {
            return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
        },
        toValue: function (a, b) {
            return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
        },
        getPlotLinePath: function (a, b, c, d, e) {
            var f = this.chart, g = this.left, k = this.top, n, u, B = c && f.oldChartHeight || f.chartHeight, G = c && f.oldChartWidth || f.chartWidth, x;
            n = this.transB;
            e = h(e, this.translate(a, null, null, c));
            a = c = M(e + n);
            n = u = M(B - e - n);
            if (isNaN(e))x = !0; else if (this.horiz) {
                if (n =
                        k, u = B - this.bottom, a < g || a > g + this.width)x = !0
            } else if (a = g, c = G - this.right, n < k || n > k + this.height)x = !0;
            return x && !d ? null : f.renderer.crispLine(["M", a, n, "L", c, u], b || 1)
        },
        getLinearTickPositions: function (a, b, c) {
            var d, e = V(la(b / a) * a), f = V(ua(c / a) * a), g = [];
            if (b === c && T(b))return [b];
            for (b = e; b <= f;) {
                g.push(b);
                b = V(b + a);
                if (b === d)break;
                d = b
            }
            return g
        },
        getMinorTickPositions: function () {
            var a = this.options, b = this.tickPositions, c = this.minorTickInterval, d = [], e;
            if (this.isLog)for (e = b.length, a = 1; a < e; a++)d = d.concat(this.getLogTickPositions(c,
                b[a - 1], b[a], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval)d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), this.min, this.max, a.startOfWeek)), d[0] < this.min && d.shift(); else for (b = this.min + (b[0] - this.min) % c; b <= this.max; b += c)d.push(b);
            return d
        },
        adjustForMinRange: function () {
            var a = this.options, b = this.min, c = this.max, d, e = this.dataMax - this.dataMin >= this.minRange, f, g, k, n, u;
            this.isXAxis && this.minRange === F && !this.isLog && (r(a.min) || r(a.max) ? this.minRange = null : (A(this.series, function (a) {
                n =
                    a.xData;
                for (g = u = a.xIncrement ? 1 : n.length - 1; 0 < g; g--)if (k = n[g] - n[g - 1], f === F || k < f)f = k
            }), this.minRange = Z(5 * f, this.dataMax - this.dataMin)));
            if (c - b < this.minRange) {
                var B = this.minRange;
                d = (B - c + b) / 2;
                d = [b - d, h(a.min, b - d)];
                e && (d[2] = this.dataMin);
                b = va(d);
                c = [b + B, h(a.max, b + B)];
                e && (c[2] = this.dataMax);
                c = Q(c);
                c - b < B && (d[0] = c - B, d[1] = h(a.min, c - B), b = va(d))
            }
            this.min = b;
            this.max = c
        },
        setAxisTranslation: function (a) {
            var b = this, c = b.max - b.min, d = b.axisPointRange || 0, e, f = 0, g = 0, k = b.linkedParent, n = !!b.categories, u = b.transA;
            if (b.isXAxis ||
                n || d)k ? (f = k.minPointOffset, g = k.pointRangePadding) : A(b.series, function (a) {
                var k = n ? 1 : b.isXAxis ? a.pointRange : b.axisPointRange || 0, u = a.options.pointPlacement, h = a.closestPointRange;
                k > c && (k = 0);
                d = K(d, k);
                f = K(f, aa(u) ? 0 : k / 2);
                g = K(g, "on" === u ? 0 : k);
                !a.noSharedTooltip && r(h) && (e = r(e) ? Z(e, h) : h)
            }), k = b.ordinalSlope && e ? b.ordinalSlope / e : 1, b.minPointOffset = f *= k, b.pointRangePadding = g *= k, b.pointRange = Z(d, c), b.closestPointRange = e;
            a && (b.oldTransA = u);
            b.translationSlope = b.transA = u = b.len / (c + g || 1);
            b.transB = b.horiz ? b.left : b.bottom;
            b.minPixelPadding = u * f
        },
        setTickPositions: function (a) {
            var b = this, c = b.chart, d = b.options, e = d.startOnTick, f = d.endOnTick, g = b.isLog, k = b.isDatetimeAxis, n = b.isXAxis, u = b.isLinked, B = b.options.tickPositioner, G = d.maxPadding, x = d.minPadding, w = d.tickInterval, m = d.minTickInterval, v = d.tickPixelInterval, p, z = b.categories;
            u ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = h(c.min, c.dataMin), b.max = h(c.max, c.dataMax), d.type !== b.linkedParent.options.type && ma(11, 1)) : (b.min = h(b.userMin, d.min, b.dataMin),
                b.max = h(b.userMax, d.max, b.dataMax));
            g && (!a && 0 >= Z(b.min, h(b.dataMin, b.min)) && ma(10, 1), b.min = V(l(b.min)), b.max = V(l(b.max)));
            b.range && r(b.max) && (b.userMin = b.min = K(b.min, b.max - b.range), b.userMax = b.max, b.range = null);
            b.beforePadding && b.beforePadding();
            b.adjustForMinRange();
            !(z || b.axisPointRange || b.usePercentage || u) && r(b.min) && r(b.max) && (c = b.max - b.min) && (r(d.min) || r(b.userMin) || !x || !(0 > b.dataMin) && b.ignoreMinPadding || (b.min -= c * x), r(d.max) || r(b.userMax) || !G || !(0 < b.dataMax) && b.ignoreMaxPadding || (b.max += c *
            G));
            T(d.floor) && (b.min = K(b.min, d.floor));
            T(d.ceiling) && (b.max = Z(b.max, d.ceiling));
            b.min === b.max || void 0 === b.min || void 0 === b.max ? b.tickInterval = 1 : u && !w && v === b.linkedParent.options.tickPixelInterval ? b.tickInterval = b.linkedParent.tickInterval : (b.tickInterval = h(w, z ? 1 : (b.max - b.min) * v / K(b.len, v)), !r(w) && b.len < v && !this.isRadial && !this.isLog && !z && e && f && (p = !0, b.tickInterval /= 4));
            n && !a && A(b.series, function (a) {
                a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
            });
            b.setAxisTranslation(!0);
            b.beforeSetTickPositions &&
            b.beforeSetTickPositions();
            b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
            b.pointRange && (b.tickInterval = K(b.pointRange, b.tickInterval));
            !w && b.tickInterval < m && (b.tickInterval = m);
            k || g || w || (b.tickInterval = H(b.tickInterval, null, ea.pow(10, la(ea.log(b.tickInterval) / ea.LN10)), h(d.allowDecimals, !(1 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max))));
            b.minorTickInterval = "auto" === d.minorTickInterval && b.tickInterval ? b.tickInterval / 5 : d.minorTickInterval;
            b.tickPositions =
                a = d.tickPositions ? [].concat(d.tickPositions) : B && B.apply(b, [b.min, b.max]);
            a || (!b.ordinalPositions && (b.max - b.min) / b.tickInterval > K(2 * b.len, 200) && ma(19, !0), a = k ? b.getTimeTicks(b.normalizeTimeTickInterval(b.tickInterval, d.units), b.min, b.max, d.startOfWeek, b.ordinalPositions, b.closestPointRange, !0) : g ? b.getLogTickPositions(b.tickInterval, b.min, b.max) : b.getLinearTickPositions(b.tickInterval, b.min, b.max), p && a.splice(1, a.length - 2), b.tickPositions = a);
            u || (d = a[0], g = a[a.length - 1], k = b.minPointOffset || 0, e ? b.min = d :
            b.min - k > d && a.shift(), f ? b.max = g : b.max + k < g && a.pop(), 0 === a.length && r(d) && a.push((g + d) / 2), 1 === a.length && (e = 1E13 < X(b.max) ? 1 : .001, b.min -= e, b.max += e))
        },
        setMaxTicks: function () {
            var a = this.chart, b = a.maxTicks || {}, c = this.tickPositions, d = this._maxTicksKey = [this.coll, this.pos, this.len].join("-");
            !this.isLinked && !this.isDatetimeAxis && c && c.length > (b[d] || 0) && !1 !== this.options.alignTicks && (b[d] = c.length);
            a.maxTicks = b
        },
        adjustTickAmount: function () {
            var a = this._maxTicksKey, b = this.tickPositions, c = this.chart.maxTicks;
            if (c &&
                c[a] && !this.isDatetimeAxis && !this.categories && !this.isLinked && !1 !== this.options.alignTicks && this.min !== F) {
                var d = this.tickAmount, e = b.length;
                this.tickAmount = a = c[a];
                if (e < a) {
                    for (; b.length < a;)b.push(V(b[b.length - 1] + this.tickInterval));
                    this.transA *= (e - 1) / (a - 1);
                    this.max = b[b.length - 1]
                }
                r(d) && a !== d && (this.isDirty = !0)
            }
        },
        setScale: function () {
            var a = this.stacks, b, c, d, e;
            this.oldMin = this.min;
            this.oldMax = this.max;
            this.oldAxisLength = this.len;
            this.setAxisSize();
            e = this.len !== this.oldAxisLength;
            A(this.series, function (a) {
                if (a.isDirtyData ||
                    a.isDirty || a.xAxis.isDirty)d = !0
            });
            if (e || d || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
                if (!this.isXAxis)for (b in a)for (c in a[b])a[b][c].total = null, a[b][c].cum = 0;
                this.forceRedraw = !1;
                this.getSeriesExtremes();
                this.setTickPositions();
                this.oldUserMin = this.userMin;
                this.oldUserMax = this.userMax;
                this.isDirty || (this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax)
            } else if (!this.isXAxis)for (b in this.oldStacks && (a = this.stacks = this.oldStacks), a)for (c in a[b])a[b][c].cum =
                a[b][c].total;
            this.setMaxTicks()
        },
        setExtremes: function (a, b, c, d, e) {
            var f = this, g = f.chart;
            c = h(c, !0);
            e = q(e, {min: a, max: b});
            W(f, "setExtremes", e, function () {
                f.userMin = a;
                f.userMax = b;
                f.eventArgs = e;
                f.isDirtyExtremes = !0;
                c && g.redraw(d)
            })
        },
        zoom: function (a, b) {
            var c = this.dataMin, d = this.dataMax, e = this.options;
            this.allowZoomOutside || (r(c) && a <= Z(c, h(e.min, c)) && (a = F), r(d) && b >= K(d, h(e.max, d)) && (b = F));
            this.displayBtn = a !== F || b !== F;
            this.setExtremes(a, b, !1, F, {trigger: "zoom"});
            return !0
        },
        setAxisSize: function () {
            var a = this.chart,
                b = this.options, c = b.offsetLeft || 0, d = this.horiz, e = h(b.width, a.plotWidth - c + (b.offsetRight || 0)), f = h(b.height, a.plotHeight), g = h(b.top, a.plotTop), b = h(b.left, a.plotLeft + c), c = /%$/;
            c.test(f) && (f = parseInt(f, 10) / 100 * a.plotHeight);
            c.test(g) && (g = parseInt(g, 10) / 100 * a.plotHeight + a.plotTop);
            this.left = b;
            this.top = g;
            this.width = e;
            this.height = f;
            this.bottom = a.chartHeight - f - g;
            this.right = a.chartWidth - e - b;
            this.len = K(d ? e : f, 0);
            this.pos = d ? b : g
        },
        getExtremes: function () {
            var a = this.isLog;
            return {
                min: a ? V(p(this.min)) : this.min,
                max: a ?
                    V(p(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax
            }
        },
        getThreshold: function (a) {
            var b = this.isLog, c = b ? p(this.min) : this.min, b = b ? p(this.max) : this.max;
            c > a || null === a ? a = c : b < a && (a = b);
            return this.translate(a, 0, 1, 0, 1)
        },
        autoLabelAlign: function (a) {
            a = (h(a, 0) - 90 * this.side + 720) % 360;
            return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
        },
        getOffset: function () {
            var a = this, b = a.chart, c = b.renderer, d = a.options, e = a.tickPositions, f = a.ticks, g = a.horiz, k = a.side, n = b.inverted ?
                [1, 0, 3, 2][k] : k, u, B, G = 0, x, w = 0, m = d.title, v = d.labels, p = 0, l = b.axisOffset, b = b.clipOffset, z = [-1, 1, 1, -1][k], H, t = 1, q = h(v.maxStaggerLines, 5), J, D, y, qa, Q;
            a.hasData = u = a.hasVisibleSeries || r(a.min) && r(a.max) && !!e;
            a.showAxis = B = u || h(d.showEmpty, !0);
            a.staggerLines = a.horiz && v.staggerLines;
            a.axisGroup || (a.gridGroup = c.g("grid").attr({zIndex: d.gridZIndex || 1}).add(), a.axisGroup = c.g("axis").attr({zIndex: d.zIndex || 2}).add(), a.labelGroup = c.g("axis-labels").attr({zIndex: v.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() +
            "-labels").add());
            if (u || a.isLinked) {
                a.labelAlign = h(v.align || a.autoLabelAlign(v.rotation));
                A(e, function (b) {
                    f[b] ? f[b].addLabel() : f[b] = new wa(a, b)
                });
                if (a.horiz && !a.staggerLines && q && !v.rotation) {
                    for (u = a.reversed ? [].concat(e).reverse() : e; t < q;) {
                        J = [];
                        D = !1;
                        for (H = 0; H < u.length; H++)y = u[H], qa = (qa = f[y].label && f[y].label.getBBox()) ? qa.width : 0, Q = H % t, qa && (y = a.translate(y), J[Q] !== F && y < J[Q] && (D = !0), J[Q] = y + qa);
                        if (D)t++; else break
                    }
                    1 < t && (a.staggerLines = t)
                }
                A(e, function (b) {
                    if (0 === k || 2 === k || {1: "left", 3: "right"}[k] === a.labelAlign)p =
                        K(f[b].getLabelSize(), p)
                });
                a.staggerLines && (p *= a.staggerLines, a.labelOffset = p)
            } else for (H in f)f[H].destroy(), delete f[H];
            m && m.text && !1 !== m.enabled && (a.axisTitle || (a.axisTitle = c.text(m.text, 0, 0, m.useHTML).attr({
                zIndex: 7,
                rotation: m.rotation || 0,
                align: m.textAlign || {low: "left", middle: "center", high: "right"}[m.align]
            }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(m.style).add(a.axisGroup), a.axisTitle.isNew = !0), B && (G = a.axisTitle.getBBox()[g ? "height" : "width"], x = m.offset, w = r(x) ? 0 : h(m.margin,
                g ? 5 : 10)), a.axisTitle[B ? "show" : "hide"]());
            a.offset = z * h(d.offset, l[k]);
            c = 2 === k ? a.tickBaseline : 0;
            g = p + w + (p && z * (g ? h(v.y, a.tickBaseline + 8) : v.x) - c);
            a.axisTitleMargin = h(x, g);
            l[k] = K(l[k], a.axisTitleMargin + G + z * a.offset, g);
            b[n] = K(b[n], 2 * la(d.lineWidth / 2))
        },
        getLinePath: function (a) {
            var b = this.chart, c = this.opposite, d = this.offset, e = this.horiz, f = this.left + (c ? this.width : 0) + d, d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
            c && (a *= -1);
            return b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right :
                f, e ? d : b.chartHeight - this.bottom], a)
        },
        getTitlePosition: function () {
            var a = this.horiz, b = this.left, c = this.top, d = this.len, e = this.options.title, f = a ? b : c, g = this.opposite, k = this.offset, n = I(e.style.fontSize || 12), d = {
                low: f + (a ? 0 : d),
                middle: f + d / 2,
                high: f + (a ? d : 0)
            }[e.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? n : 0);
            return {
                x: a ? d : b + (g ? this.width : 0) + k + (e.x || 0),
                y: a ? b - (g ? this.height : 0) + k : d + (e.y || 0)
            }
        },
        render: function () {
            var a = this, b = a.horiz, c = a.reversed, d = a.chart, e = d.renderer, f = a.options,
                g = a.isLog, k = a.isLinked, n = a.tickPositions, u, B = a.axisTitle, h = a.ticks, x = a.minorTicks, w = a.alternateBands, m = f.stackLabels, v = f.alternateGridColor, l = a.tickmarkOffset, H = f.lineWidth, z = d.hasRendered && r(a.oldMin) && !isNaN(a.oldMin), t = a.hasData, q = a.showAxis, J, D = f.labels.overflow, y = a.justifyLabels = b && !1 !== D, Q;
            a.labelEdge.length = 0;
            a.justifyToPlot = "justify" === D;
            A([h, x, w], function (a) {
                for (var b in a)a[b].isActive = !1
            });
            if (t || k)a.minorTickInterval && !a.categories && A(a.getMinorTickPositions(), function (b) {
                x[b] || (x[b] = new wa(a,
                    b, "minor"));
                z && x[b].isNew && x[b].render(null, !0);
                x[b].render(null, !1, 1)
            }), n.length && (u = n.slice(), (b && c || !b && !c) && u.reverse(), y && (u = u.slice(1).concat([u[0]])), A(u, function (b, c) {
                y && (c = c === u.length - 1 ? 0 : c + 1);
                if (!k || b >= a.min && b <= a.max)h[b] || (h[b] = new wa(a, b)), z && h[b].isNew && h[b].render(c, !0, .1), h[b].render(c)
            }), l && 0 === a.min && (h[-1] || (h[-1] = new wa(a, -1, null, !0)), h[-1].render(-1))), v && A(n, function (b, c) {
                0 === c % 2 && b < a.max && (w[b] || (w[b] = new ja.PlotLineOrBand(a)), J = b + l, Q = n[c + 1] !== F ? n[c + 1] + l : a.max, w[b].options =
                {from: g ? p(J) : J, to: g ? p(Q) : Q, color: v}, w[b].render(), w[b].isActive = !0)
            }), a._addedPlotLB || (A((f.plotLines || []).concat(f.plotBands || []), function (b) {
                a.addPlotBandOrLine(b)
            }), a._addedPlotLB = !0);
            A([h, x, w], function (a) {
                var b, c, e = [], f = pa ? pa.duration || 500 : 0, g = function () {
                    for (c = e.length; c--;)a[e[c]] && !a[e[c]].isActive && (a[e[c]].destroy(), delete a[e[c]])
                };
                for (b in a)a[b].isActive || (a[b].render(b, !1, 0), a[b].isActive = !1, e.push(b));
                a !== w && d.hasRendered && f ? f && setTimeout(g, f) : g()
            });
            H && (b = a.getLinePath(H), a.axisLine ?
                a.axisLine.animate({d: b}) : a.axisLine = e.path(b).attr({
                stroke: f.lineColor,
                "stroke-width": H,
                zIndex: 7
            }).add(a.axisGroup), a.axisLine[q ? "show" : "hide"]());
            B && q && (B[B.isNew ? "attr" : "animate"](a.getTitlePosition()), B.isNew = !1);
            m && m.enabled && a.renderStackTotals();
            a.isDirty = !1
        },
        redraw: function () {
            this.render();
            A(this.plotLinesAndBands, function (a) {
                a.render()
            });
            A(this.series, function (a) {
                a.isDirty = !0
            })
        },
        destroy: function (a) {
            var b = this, c = b.stacks, d, e = b.plotLinesAndBands;
            a || ga(b);
            for (d in c)ra(c[d]), c[d] = null;
            A([b.ticks,
                b.minorTicks, b.alternateBands], function (a) {
                ra(a)
            });
            for (a = e.length; a--;)e[a].destroy();
            A("stackTotalGroup axisLine axisTitle axisGroup cross gridGroup labelGroup".split(" "), function (a) {
                b[a] && (b[a] = b[a].destroy())
            });
            this.cross && this.cross.destroy()
        },
        drawCrosshair: function (a, b) {
            if (this.crosshair)if (!1 === (r(b) || !h(this.crosshair.snap, !0)))this.hideCrosshair(); else {
                var c, d = this.crosshair, e = d.animation;
                h(d.snap, !0) ? r(b) && (c = this.chart.inverted != this.horiz ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX -
                this.pos : this.len - a.chartY + this.pos;
                c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : h(b.stackY, b.y)) : this.getPlotLinePath(null, null, null, null, c);
                if (null === c)this.hideCrosshair(); else if (this.cross)this.cross.attr({visibility: "visible"})[e ? "animate" : "attr"]({d: c}, e); else e = {
                    "stroke-width": d.width || 1,
                    stroke: d.color || "#C0C0C0",
                    zIndex: d.zIndex || 2
                }, d.dashStyle && (e.dashstyle = d.dashStyle), this.cross = this.chart.renderer.path(c).attr(e).add()
            }
        },
        hideCrosshair: function () {
            this.cross && this.cross.hide()
        }
    };
    q(xa.prototype, void 0);
    var pb = ja.Tooltip = function () {
        this.init.apply(this, arguments)
    };
    pb.prototype = {
        init: function (a, b) {
            var c = b.borderWidth, d = b.style, e = I(d.padding);
            this.chart = a;
            this.options = b;
            this.crosshairs = [];
            this.now = {x: 0, y: 0};
            this.isHidden = !0;
            this.label = a.renderer.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, "tooltip").attr({
                padding: e,
                fill: b.backgroundColor,
                "stroke-width": c,
                r: b.borderRadius,
                zIndex: 8
            }).css(d).css({padding: 0}).add().attr({y: -9999});
            oa || this.label.shadow(b.shadow);
            this.shared =
                b.shared
        }, destroy: function () {
            this.label && (this.label = this.label.destroy());
            clearTimeout(this.hideTimer);
            clearTimeout(this.tooltipTimeout)
        }, move: function (a, b, c, d) {
            var e = this, f = e.now, g = !1 !== e.options.animation && !e.isHidden && (1 < X(a - f.x) || 1 < X(b - f.y)), k = e.followPointer || 1 < e.len;
            q(f, {
                x: g ? (2 * f.x + a) / 3 : a,
                y: g ? (f.y + b) / 2 : b,
                anchorX: k ? F : g ? (2 * f.anchorX + c) / 3 : c,
                anchorY: k ? F : g ? (f.anchorY + d) / 2 : d
            });
            e.label.attr(f);
            g && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                e && e.move(a, b, c, d)
            }, 32))
        },
        hide: function (a) {
            var b = this, c;
            clearTimeout(this.hideTimer);
            this.isHidden || (c = this.chart.hoverPoints, this.hideTimer = setTimeout(function () {
                b.label.fadeOut();
                b.isHidden = !0
            }, h(a, this.options.hideDelay, 500)), c && A(c, function (a) {
                a.setState()
            }), this.chart.hoverPoints = null)
        }, getAnchor: function (a, b) {
            var c, d = this.chart, e = d.inverted, f = d.plotTop, g = 0, k = 0, n;
            a = t(a);
            c = a[0].tooltipPos;
            this.followPointer && b && (b.chartX === F && (b = d.pointer.normalize(b)), c = [b.chartX - d.plotLeft, b.chartY - f]);
            c || (A(a, function (a) {
                n = a.series.yAxis;
                g += a.plotX;
                k += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && n ? n.top - f : 0)
            }), g /= a.length, k /= a.length, c = [e ? d.plotWidth - k : g, this.shared && !e && 1 < a.length && b ? b.chartY - f : e ? d.plotHeight - g : k]);
            return Ya(c, M)
        }, getPosition: function (a, b, c) {
            var d = this.chart, e = this.distance, f = {}, g, k = ["y", d.chartHeight, b, c.plotY + d.plotTop], n = ["x", d.chartWidth, a, c.plotX + d.plotLeft], u = c.ttBelow || d.inverted && !c.negative || !d.inverted && c.negative, B = function (a, b, c, d) {
                var g = c < d - e;
                b = d + e + c < b;
                c = d - e - c;
                d += e;
                if (u && b)f[a] = d; else if (!u && g)f[a] =
                    c; else if (g)f[a] = c; else if (b)f[a] = d; else return !1
            }, h = function (a, b, c, d) {
                if (d < e || d > b - e)return !1;
                f[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2
            }, x = function (a) {
                var b = k;
                k = n;
                n = b;
                g = a
            }, w = function () {
                !1 !== B.apply(0, k) ? !1 !== h.apply(0, n) || g || (x(!0), w()) : g ? f.x = f.y = 0 : (x(!0), w())
            };
            (d.inverted || 1 < this.len) && x();
            w();
            return f
        }, defaultFormatter: function (a) {
            var b = this.points || t(this), c = b[0].series, d;
            d = [a.tooltipHeaderFormatter(b[0])];
            A(b, function (a) {
                c = a.series;
                d.push(c.tooltipFormatter && c.tooltipFormatter(a) || a.point.tooltipFormatter(c.tooltipOptions.pointFormat))
            });
            d.push(a.options.footerFormat || "");
            return d.join("")
        }, refresh: function (a, b) {
            var c = this.chart, d = this.label, e = this.options, f, g, k = {}, n, u = [];
            n = e.formatter || this.defaultFormatter;
            var k = c.hoverPoints, B, G = this.shared;
            clearTimeout(this.hideTimer);
            this.followPointer = t(a)[0].series.tooltipOptions.followPointer;
            g = this.getAnchor(a, b);
            f = g[0];
            g = g[1];
            !G || a.series && a.series.noSharedTooltip ? k = a.getLabelConfig() : (c.hoverPoints = a, k && A(k, function (a) {
                a.setState()
            }), A(a, function (a) {
                a.setState("hover");
                u.push(a.getLabelConfig())
            }),
                k = {x: a[0].category, y: a[0].y}, k.points = u, this.len = u.length, a = a[0]);
            n = n.call(k, this);
            k = a.series;
            this.distance = h(k.tooltipOptions.distance, 16);
            !1 === n ? this.hide() : (this.isHidden && (Ha(d), d.attr("opacity", 1).show()), d.attr({text: n}), B = e.borderColor || a.color || k.color || "#606060", d.attr({stroke: B}), this.updatePosition({
                plotX: f,
                plotY: g,
                negative: a.negative,
                ttBelow: a.ttBelow
            }), this.isHidden = !1);
            W(c, "tooltipRefresh", {text: n, x: f + c.plotLeft, y: g + c.plotTop, borderColor: B})
        }, updatePosition: function (a) {
            var b = this.chart,
                c = this.label, c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
            this.move(M(c.x), M(c.y), a.plotX + b.plotLeft, a.plotY + b.plotTop)
        }, tooltipHeaderFormatter: function (a) {
            var b = a.series, c = b.tooltipOptions, d = c.dateTimeLabelFormats, e = c.xDateFormat, f = b.xAxis, g = f && "datetime" === f.options.type && T(a.key), c = c.headerFormat, f = f && f.closestPointRange, k;
            if (g && !e) {
                if (f)for (k in za) {
                    if (za[k] >= f || za[k] <= za.day && 0 < a.key % za[k]) {
                        e = d[k];
                        break
                    }
                } else e = d.day;
                e = e || d.year
            }
            g && e && (c = c.replace("{point.key}",
                "{point.key:" + e + "}"));
            return m(c, {point: a, series: b})
        }
    };
    var Da;
    Fa = O.documentElement.ontouchstart !== F;
    var qb = ja.Pointer = function (a, b) {
        this.init(a, b)
    };
    qb.prototype = {
        init: function (a, b) {
            var c = b.chart, d = c.events, e = oa ? "" : c.zoomType, c = a.inverted, f;
            this.options = b;
            this.chart = a;
            this.zoomX = f = /x/.test(e);
            this.zoomY = e = /y/.test(e);
            this.zoomHor = f && !c || e && c;
            this.zoomVert = e && !c || f && c;
            this.hasZoom = f || e;
            this.runChartClick = d && !!d.click;
            this.pinchDown = [];
            this.lastValidTouch = {};
            ja.Tooltip && b.tooltip.enabled && (a.tooltip =
                new pb(a, b.tooltip), this.followTouchMove = b.tooltip.followTouchMove);
            this.setDOMEvents()
        }, normalize: function (a, b) {
            var c, d;
            a = a || window.event;
            a = wb(a);
            a.target || (a.target = a.srcElement);
            d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
            b || (this.chartPosition = b = vb(this.chart.container));
            d.pageX === F ? (c = K(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top);
            return q(a, {chartX: M(c), chartY: M(d)})
        }, getCoordinates: function (a) {
            var b = {xAxis: [], yAxis: []};
            A(this.chart.axes, function (c) {
                b[c.isXAxis ?
                    "xAxis" : "yAxis"].push({axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"])})
            });
            return b
        }, getIndex: function (a) {
            var b = this.chart;
            return b.inverted ? b.plotHeight + b.plotTop - a.chartY : a.chartX - b.plotLeft
        }, runPointActions: function (a) {
            var b = this.chart, c = b.series, d = b.tooltip, e, f, g = b.hoverPoint, k = b.hoverSeries, n, u, B = b.chartWidth, G = this.getIndex(a);
            if (d && this.options.tooltip.shared && (!k || !k.noSharedTooltip)) {
                f = [];
                n = c.length;
                for (u = 0; u < n; u++)c[u].visible && !1 !== c[u].options.enableMouseTracking && !c[u].noSharedTooltip &&
                !0 !== c[u].singularTooltips && c[u].tooltipPoints.length && (e = c[u].tooltipPoints[G]) && e.series && (e._dist = X(G - e.clientX), B = Z(B, e._dist), f.push(e));
                for (n = f.length; n--;)f[n]._dist > B && f.splice(n, 1);
                f.length && f[0].clientX !== this.hoverX && (d.refresh(f, a), this.hoverX = f[0].clientX)
            }
            c = k && k.tooltipOptions.followPointer;
            if (k && k.tracker && !c) {
                if ((e = k.tooltipPoints[G]) && e !== g)e.onMouseOver(a)
            } else d && c && !d.isHidden && (k = d.getAnchor([{}], a), d.updatePosition({plotX: k[0], plotY: k[1]}));
            d && !this._onDocumentMouseMove && (this._onDocumentMouseMove =
                function (a) {
                    if (ka[Da])ka[Da].pointer.onDocumentMouseMove(a)
                }, ca(O, "mousemove", this._onDocumentMouseMove));
            A(b.axes, function (b) {
                b.drawCrosshair(a, h(e, g))
            })
        }, reset: function (a, b) {
            var c = this.chart, d = c.hoverSeries, e = c.hoverPoint, f = c.tooltip, g = f && f.shared ? c.hoverPoints : e;
            (a = a && f && g) && t(g)[0].plotX === F && (a = !1);
            if (a)f.refresh(g), e && e.setState(e.state, !0); else {
                if (e)e.onMouseOut();
                if (d)d.onMouseOut();
                f && f.hide(b);
                this._onDocumentMouseMove && (ga(O, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove =
                    null);
                A(c.axes, function (a) {
                    a.hideCrosshair()
                });
                this.hoverX = null
            }
        }, scaleGroups: function (a, b) {
            var c = this.chart, d;
            A(c.series, function (e) {
                d = a || e.getPlotBox();
                e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d))
            });
            c.clipRect.attr(b || c.clipBox)
        }, dragStart: function (a) {
            var b = this.chart;
            b.mouseIsDown = a.type;
            b.cancelClick = !1;
            b.mouseDownX = this.mouseDownX = a.chartX;
            b.mouseDownY = this.mouseDownY =
                a.chartY
        }, drag: function (a) {
            var b = this.chart, c = b.options.chart, d = a.chartX, e = a.chartY, f = this.zoomHor, g = this.zoomVert, k = b.plotLeft, n = b.plotTop, u = b.plotWidth, B = b.plotHeight, h, x = this.mouseDownX, w = this.mouseDownY, m = c.panKey && a[c.panKey + "Key"];
            d < k ? d = k : d > k + u && (d = k + u);
            e < n ? e = n : e > n + B && (e = n + B);
            this.hasDragged = Math.sqrt(Math.pow(x - d, 2) + Math.pow(w - e, 2));
            10 < this.hasDragged && (h = b.isInsidePlot(x - k, w - n), b.hasCartesianSeries && (this.zoomX || this.zoomY) && h && !m && !this.selectionMarker && (this.selectionMarker = b.renderer.rect(k,
                n, f ? 1 : u, g ? 1 : B, 0).attr({
                    fill: c.selectionMarkerFill || "rgba(69,114,167,0.25)",
                    zIndex: 7
                }).add()), this.selectionMarker && f && (d -= x, this.selectionMarker.attr({
                width: X(d),
                x: (0 < d ? 0 : d) + x
            })), this.selectionMarker && g && (d = e - w, this.selectionMarker.attr({
                height: X(d),
                y: (0 < d ? 0 : d) + w
            })), h && !this.selectionMarker && c.panning && b.pan(a, c.panning))
        }, drop: function (a) {
            var b = this.chart, c = this.hasPinched;
            if (this.selectionMarker) {
                var d = {
                    xAxis: [],
                    yAxis: [],
                    originalEvent: a.originalEvent || a
                }, e = this.selectionMarker, f = e.attr ? e.attr("x") :
                    e.x, g = e.attr ? e.attr("y") : e.y, k = e.attr ? e.attr("width") : e.width, n = e.attr ? e.attr("height") : e.height, u;
                if (this.hasDragged || c)A(b.axes, function (b) {
                    if (b.zoomEnabled) {
                        var c = b.horiz, e = "touchend" === a.type ? b.minPixelPadding : 0, h = b.toValue((c ? f : g) + e), c = b.toValue((c ? f + k : g + n) - e);
                        isNaN(h) || isNaN(c) || (d[b.coll].push({axis: b, min: Z(h, c), max: K(h, c)}), u = !0)
                    }
                }), u && W(b, "selection", d, function (a) {
                    b.zoom(q(a, c ? {animation: !1} : null))
                });
                this.selectionMarker = this.selectionMarker.destroy();
                c && this.scaleGroups()
            }
            b && (E(b.container,
                {cursor: b._cursor}), b.cancelClick = 10 < this.hasDragged, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
        }, onContainerMouseDown: function (a) {
            a = this.normalize(a);
            a.preventDefault && a.preventDefault();
            this.dragStart(a)
        }, onDocumentMouseUp: function (a) {
            ka[Da] && ka[Da].pointer.drop(a)
        }, onDocumentMouseMove: function (a) {
            var b = this.chart, c = this.chartPosition, d = b.hoverSeries;
            a = this.normalize(a, c);
            c && d && !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) &&
            this.reset()
        }, onContainerMouseLeave: function () {
            var a = ka[Da];
            a && (a.pointer.reset(), a.pointer.chartPosition = null)
        }, onContainerMouseMove: function (a) {
            var b = this.chart;
            Da = b.index;
            a = this.normalize(a);
            a.returnValue = !1;
            "mousedown" === b.mouseIsDown && this.drag(a);
            !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || b.openMenu || this.runPointActions(a)
        }, inClass: function (a, b) {
            for (var c; a;) {
                if (c = y(a, "class")) {
                    if (-1 !== c.indexOf(b))return !0;
                    if (-1 !== c.indexOf("highcharts-container"))return !1
                }
                a =
                    a.parentNode
            }
        }, onTrackerMouseOut: function (a) {
            var b = this.chart.hoverSeries, c = (a = a.relatedTarget || a.toElement) && a.point && a.point.series;
            if (b && !b.options.stickyTracking && !this.inClass(a, "highcharts-tooltip") && c !== b)b.onMouseOut()
        }, onContainerClick: function (a) {
            var b = this.chart, c = b.hoverPoint, d = b.plotLeft, e = b.plotTop;
            a = this.normalize(a);
            a.cancelBubble = !0;
            b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (W(c.series, "click", q(a, {point: c})), b.hoverPoint && c.firePointEvent("click", a)) : (q(a, this.getCoordinates(a)),
            b.isInsidePlot(a.chartX - d, a.chartY - e) && W(b, "click", a)))
        }, setDOMEvents: function () {
            var a = this, b = a.chart.container;
            b.onmousedown = function (b) {
                a.onContainerMouseDown(b)
            };
            b.onmousemove = function (b) {
                a.onContainerMouseMove(b)
            };
            b.onclick = function (b) {
                a.onContainerClick(b)
            };
            ca(b, "mouseleave", a.onContainerMouseLeave);
            1 === Ga && ca(O, "mouseup", a.onDocumentMouseUp);
            Fa && (b.ontouchstart = function (b) {
                a.onContainerTouchStart(b)
            }, b.ontouchmove = function (b) {
                a.onContainerTouchMove(b)
            }, 1 === Ga && ca(O, "touchend", a.onDocumentTouchEnd))
        },
        destroy: function () {
            var a;
            ga(this.chart.container, "mouseleave", this.onContainerMouseLeave);
            Ga || (ga(O, "mouseup", this.onDocumentMouseUp), ga(O, "touchend", this.onDocumentTouchEnd));
            clearInterval(this.tooltipTimeout);
            for (a in this)this[a] = null
        }
    };
    var Sa = ja.Legend = function (a, b) {
        this.init(a, b)
    };
    Sa.prototype = {
        init: function (a, b) {
            var c = this, d = b.itemStyle, e = h(b.padding, 8), f = b.itemMarginTop || 0;
            this.options = b;
            b.enabled && (c.itemStyle = d, c.itemHiddenStyle = L(d, b.itemHiddenStyle), c.itemMarginTop = f, c.padding = e, c.initialItemX =
                e, c.initialItemY = e - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.lastLineHeight = 0, c.symbolWidth = h(b.symbolWidth, 16), c.pages = [], c.render(), ca(c.chart, "endResize", function () {
                c.positionCheckboxes()
            }))
        }, colorizeItem: function (a, b) {
            var c = this.options, d = a.legendItem, e = a.legendLine, f = a.legendSymbol, g = this.itemHiddenStyle.color, c = b ? c.itemStyle.color : g, k = b ? a.legendColor || a.color || "#CCC" : g, g = a.options && a.options.marker, n = {fill: k}, u;
            d && d.css({fill: c, color: c});
            e && e.attr({stroke: k});
            if (f) {
                if (g && f.isMarker)for (u in n.stroke =
                    k, g = a.convertAttribs(g), g)d = g[u], d !== F && (n[u] = d);
                f.attr(n)
            }
        }, positionItem: function (a) {
            var b = this.options, c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, e = d[0], d = d[1], f = a.checkbox;
            a.legendGroup && a.legendGroup.translate(b ? e : this.legendWidth - e - 2 * c - 4, d);
            f && (f.x = e, f.y = d)
        }, destroyItem: function (a) {
            var b = a.checkbox;
            A(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                a[b] && (a[b] = a[b].destroy())
            });
            b && U(a.checkbox)
        }, destroy: function () {
            var a = this.group, b = this.box;
            b && (this.box = b.destroy());
            a &&
            (this.group = a.destroy())
        }, positionCheckboxes: function (a) {
            var b = this.group.alignAttr, c, d = this.clipHeight || this.legendHeight;
            b && (c = b.translateY, A(this.allItems, function (e) {
                var f = e.checkbox, g;
                f && (g = c + f.y + (a || 0) + 3, E(f, {
                    left: b.translateX + e.checkboxOffset + f.x - 20 + "px",
                    top: g + "px",
                    display: g > c - 6 && g < c + d - 6 ? "" : "none"
                }))
            }))
        }, renderTitle: function () {
            var a = this.padding, b = this.options.title, c = 0;
            b.text && (this.title || (this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({zIndex: 1}).css(b.style).add(this.group)),
                a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: c}));
            this.titleHeight = c
        }, renderItem: function (a) {
            var b = this.chart, c = b.renderer, d = this.options, e = "horizontal" === d.layout, f = this.symbolWidth, g = d.symbolPadding, k = this.itemStyle, n = this.itemHiddenStyle, u = this.padding, B = e ? h(d.itemDistance, 20) : 0, G = !d.rtl, x = d.width, w = d.itemMarginBottom || 0, v = this.itemMarginTop, p = this.initialItemX, l = a.legendItem, r = a.series && a.series.drawLegendSymbol ? a.series : a, H = r.options, H = this.createCheckboxForItem &&
                H && H.showCheckbox, z = d.useHTML;
            l || (a.legendGroup = c.g("legend-item").attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = l = c.text(d.labelFormat ? m(d.labelFormat, a) : d.labelFormatter.call(a), G ? f + g : -g, this.baseline || 0, z).css(L(a.visible ? k : n)).attr({
                align: G ? "left" : "right",
                zIndex: 2
            }).add(a.legendGroup), this.baseline || (this.baseline = c.fontMetrics(k.fontSize, l).f + 3 + v, l.attr("y", this.baseline)), r.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, l, z, k, n), this.colorizeItem(a, a.visible), H && this.createCheckboxForItem(a));
            c = l.getBBox();
            f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + g + c.width + B + (H ? 20 : 0);
            this.itemHeight = g = M(a.legendItemHeight || c.height);
            e && this.itemX - p + f > (x || b.chartWidth - 2 * u - p - d.x) && (this.itemX = p, this.itemY += v + this.lastLineHeight + w, this.lastLineHeight = 0);
            this.maxItemWidth = K(this.maxItemWidth, f);
            this.lastItemY = v + this.itemY + w;
            this.lastLineHeight = K(g, this.lastLineHeight);
            a._legendItemPos = [this.itemX, this.itemY];
            e ? this.itemX += f : (this.itemY += v + g + w, this.lastLineHeight = g);
            this.offsetWidth = x || K((e ? this.itemX -
            p - B : f) + u, this.offsetWidth)
        }, getAllItems: function () {
            var a = [];
            A(this.chart.series, function (b) {
                var c = b.options;
                h(c.showInLegend, r(c.linkedTo) ? !1 : F, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
            });
            return a
        }, render: function () {
            var a = this, b = a.chart, c = b.renderer, d = a.group, e, f, g, k, n = a.box, u = a.options, h = a.padding, m = u.borderWidth, x = u.backgroundColor;
            a.itemX = a.initialItemX;
            a.itemY = a.initialItemY;
            a.offsetWidth = 0;
            a.lastItemY = 0;
            d || (a.group = d = c.g("legend").attr({zIndex: 7}).add(), a.contentGroup =
                c.g().attr({zIndex: 1}).add(d), a.scrollGroup = c.g().add(a.contentGroup));
            a.renderTitle();
            e = a.getAllItems();
            z(e, function (a, b) {
                return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
            });
            u.reversed && e.reverse();
            a.allItems = e;
            a.display = f = !!e.length;
            A(e, function (b) {
                a.renderItem(b)
            });
            g = u.width || a.offsetWidth;
            k = a.lastItemY + a.lastLineHeight + a.titleHeight;
            k = a.handleOverflow(k);
            if (m || x)g += h, k += h, n ? 0 < g && 0 < k && (n[n.isNew ? "attr" : "animate"](n.crisp({
                width: g,
                height: k
            })), n.isNew = !1) : (a.box = n =
                c.rect(0, 0, g, k, u.borderRadius, m || 0).attr({
                    stroke: u.borderColor,
                    "stroke-width": m || 0,
                    fill: x || "none"
                }).add(d).shadow(u.shadow), n.isNew = !0), n[f ? "show" : "hide"]();
            a.legendWidth = g;
            a.legendHeight = k;
            A(e, function (b) {
                a.positionItem(b)
            });
            f && d.align(q({width: g, height: k}, u), !0, "spacingBox");
            b.isResizing || this.positionCheckboxes()
        }, handleOverflow: function (a) {
            var b = this, c = this.chart, d = c.renderer, e = this.options, f = e.y, f = c.spacingBox.height + ("top" === e.verticalAlign ? -f : f) - this.padding, g = e.maxHeight, k, n = this.clipRect,
                u = e.navigation, B = h(u.animation, !0), m = u.arrowSize || 12, x = this.nav, w = this.pages, v, p = this.allItems;
            "horizontal" === e.layout && (f /= 2);
            g && (f = Z(f, g));
            w.length = 0;
            a > f && !e.useHTML ? (this.clipHeight = k = K(f - 20 - this.titleHeight - this.padding, 0), this.currentPage = h(this.currentPage, 1), this.fullHeight = a, A(p, function (a, b) {
                var c = a._legendItemPos[1], d = M(a.legendItem.getBBox().height), e = w.length;
                if (!e || c - w[e - 1] > k && (v || c) !== w[e - 1])w.push(v || c), e++;
                b === p.length - 1 && c + d - w[e - 1] > k && w.push(c);
                c !== v && (v = c)
            }), n || (n = b.clipRect = d.clipRect(0,
                this.padding, 9999, 0), b.contentGroup.clip(n)), n.attr({height: k}), x || (this.nav = x = d.g().attr({zIndex: 1}).add(this.group), this.up = d.symbol("triangle", 0, 0, m, m).on("click", function () {
                b.scroll(-1, B)
            }).add(x), this.pager = d.text("", 15, 10).css(u.style).add(x), this.down = d.symbol("triangle-down", 0, 0, m, m).on("click", function () {
                b.scroll(1, B)
            }).add(x)), b.scroll(0), a = f) : x && (n.attr({height: c.chartHeight}), x.hide(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
            return a
        }, scroll: function (a, b) {
            var c = this.pages,
                d = c.length, e = this.currentPage + a, f = this.clipHeight, g = this.options.navigation, k = g.activeColor, g = g.inactiveColor, n = this.pager, u = this.padding;
            e > d && (e = d);
            0 < e && (b !== F && (pa = h(b, this.chart.animation)), this.nav.attr({
                translateX: u,
                translateY: f + this.padding + 7 + this.titleHeight,
                visibility: "visible"
            }), this.up.attr({fill: 1 === e ? g : k}).css({cursor: 1 === e ? "default" : "pointer"}), n.attr({text: e + "/" + d}), this.down.attr({
                x: 18 + this.pager.getBBox().width,
                fill: e === d ? g : k
            }).css({cursor: e === d ? "default" : "pointer"}), c = -c[e - 1] + this.initialItemY,
                this.scrollGroup.animate({translateY: c}), this.currentPage = e, this.positionCheckboxes(c))
        }
    };
    var rb = ja.LegendSymbolMixin = {
        drawRectangle: function (a, b) {
            var c = a.options.symbolHeight || 12;
            b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 5 - c / 2, a.symbolWidth, c, a.options.symbolRadius || 0).attr({zIndex: 3}).add(b.legendGroup)
        }, drawLineMarker: function (a) {
            var b = this.options, c = b.marker, d;
            d = a.symbolWidth;
            var e = this.chart.renderer, f = this.legendGroup;
            a = a.baseline - M(.3 * e.fontMetrics(a.options.itemStyle.fontSize, this.legendItem).b);
            var g;
            b.lineWidth && (g = {"stroke-width": b.lineWidth}, b.dashStyle && (g.dashstyle = b.dashStyle), this.legendLine = e.path(["M", 0, a, "L", d, a]).attr(g).add(f));
            c && !1 !== c.enabled && (b = c.radius, this.legendSymbol = d = e.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b).add(f), d.isMarker = !0)
        }
    };
    (/Trident\/7\.0/.test(ta) || ya) && v(Sa.prototype, "positionItem", function (a, b) {
        var c = this, d = function () {
            b._legendItemPos && a.call(c, b)
        };
        d();
        setTimeout(d)
    });
    Na.prototype = {
        init: function (a, b) {
            var c, d = a.series;
            a.series = null;
            c = L(da, a);
            c.series = a.series =
                d;
            this.userOptions = a;
            d = c.chart;
            this.margin = this.splashArray("margin", d);
            this.spacing = this.splashArray("spacing", d);
            var e = d.events;
            this.bounds = {h: {}, v: {}};
            this.callback = b;
            this.isResizing = 0;
            this.options = c;
            this.axes = [];
            this.series = [];
            this.hasCartesianSeries = d.showAxes;
            var f = this, g;
            f.index = ka.length;
            ka.push(f);
            Ga++;
            !1 !== d.reflow && ca(f, "load", function () {
                f.initReflow()
            });
            if (e)for (g in e)ca(f, g, e[g]);
            f.xAxis = [];
            f.yAxis = [];
            f.animation = oa ? !1 : h(d.animation, !0);
            f.pointCount = f.colorCounter = f.symbolCounter = 0;
            f.firstRender()
        }, initSeries: function (a) {
            var b = this.options.chart;
            (b = fa[a.type || b.type || b.defaultSeriesType]) || ma(17, !0);
            b = new b;
            b.init(this, a);
            return b
        }, isInsidePlot: function (a, b, c) {
            var d = c ? b : a;
            a = c ? a : b;
            return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
        }, adjustTickAmounts: function () {
            !1 !== this.options.chart.alignTicks && A(this.axes, function (a) {
                a.adjustTickAmount()
            });
            this.maxTicks = null
        }, redraw: function (a) {
            var b = this.axes, c = this.series, d = this.pointer, e = this.legend, f = this.isDirtyLegend, g, k, n = this.hasCartesianSeries,
                u = this.isDirtyBox, B = c.length, m = B, x = this.renderer, w = x.isHidden(), v = [];
            pa = h(a, this.animation);
            w && this.cloneRenderTo();
            for (this.layOutTitles(); m--;)if (a = c[m], a.options.stacking && (g = !0, a.isDirty)) {
                k = !0;
                break
            }
            if (k)for (m = B; m--;)a = c[m], a.options.stacking && (a.isDirty = !0);
            A(c, function (a) {
                a.isDirty && "point" === a.options.legendType && (f = !0)
            });
            f && e.options.enabled && (e.render(), this.isDirtyLegend = !1);
            g && this.getStacks();
            n && (this.isResizing || (this.maxTicks = null, A(b, function (a) {
                a.setScale()
            })), this.adjustTickAmounts());
            this.getMargins();
            n && (A(b, function (a) {
                a.isDirty && (u = !0)
            }), A(b, function (a) {
                a.isDirtyExtremes && (a.isDirtyExtremes = !1, v.push(function () {
                    W(a, "afterSetExtremes", q(a.eventArgs, a.getExtremes()));
                    delete a.eventArgs
                }));
                (u || g) && a.redraw()
            }));
            u && this.drawChartBox();
            A(c, function (a) {
                a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw()
            });
            d && d.reset(!0);
            x.draw();
            W(this, "redraw");
            w && this.cloneRenderTo(!0);
            A(v, function (a) {
                a.call()
            })
        }, get: function (a) {
            var b = this.axes, c = this.series, d, e;
            for (d = 0; d < b.length; d++)if (b[d].options.id ===
                a)return b[d];
            for (d = 0; d < c.length; d++)if (c[d].options.id === a)return c[d];
            for (d = 0; d < c.length; d++)for (e = c[d].points || [], b = 0; b < e.length; b++)if (e[b].id === a)return e[b];
            return null
        }, getAxes: function () {
            var a = this, b = this.options, c = b.xAxis = t(b.xAxis || {}), b = b.yAxis = t(b.yAxis || {});
            A(c, function (a, b) {
                a.index = b;
                a.isX = !0
            });
            A(b, function (a, b) {
                a.index = b
            });
            c = c.concat(b);
            A(c, function (b) {
                new xa(a, b)
            });
            a.adjustTickAmounts()
        }, getSelectedPoints: function () {
            var a = [];
            A(this.series, function (b) {
                a = a.concat(nb(b.points || [], function (a) {
                    return a.selected
                }))
            });
            return a
        }, getSelectedSeries: function () {
            return nb(this.series, function (a) {
                return a.selected
            })
        }, getStacks: function () {
            var a = this;
            A(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            A(a.series, function (b) {
                !b.options.stacking || !0 !== b.visible && !1 !== a.options.chart.ignoreHiddenSeries || (b.stackKey = b.type + h(b.options.stack, ""))
            })
        }, setTitle: function (a, b, c) {
            var d = this, e = d.options, f;
            f = e.title = L(e.title, a);
            e = e.subtitle = L(e.subtitle, b);
            A([["title", a, f], ["subtitle", b, e]], function (a) {
                var b =
                    a[0], c = d[b], e = a[1];
                a = a[2];
                c && e && (d[b] = c = c.destroy());
                a && a.text && !c && (d[b] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                    align: a.align,
                    "class": "highcharts-" + b,
                    zIndex: a.zIndex || 4
                }).css(a.style).add())
            });
            d.layOutTitles(c)
        }, layOutTitles: function (a) {
            var b = 0, c = this.title, d = this.subtitle, e = this.options, f = e.title, e = e.subtitle, g = this.renderer, k = this.spacingBox.width - 44;
            c && (c.css({width: (f.width || k) + "px"}).align(q({y: g.fontMetrics(f.style.fontSize, c).b - 3}, f), !1, "spacingBox"), f.floating || f.verticalAlign || (b = c.getBBox().height));
            d && (d.css({width: (e.width || k) + "px"}).align(q({y: b + (f.margin - 13) + g.fontMetrics(f.style.fontSize, d).b}, e), !1, "spacingBox"), e.floating || e.verticalAlign || (b = ua(b + d.getBBox().height)));
            c = this.titleOffset !== b;
            this.titleOffset = b;
            !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && h(a, !0) && this.isDirtyBox && this.redraw())
        }, getChartSize: function () {
            var a = this.options.chart, b = a.width, a = a.height, c = this.renderToClone || this.renderTo;
            r(b) || (this.containerWidth = Qa(c, "width"));
            r(a) || (this.containerHeight = Qa(c,
                "height"));
            this.chartWidth = K(0, b || this.containerWidth || 600);
            this.chartHeight = K(0, h(a, 19 < this.containerHeight ? this.containerHeight : 400))
        }, cloneRenderTo: function (a) {
            var b = this.renderToClone, c = this.container;
            a ? b && (this.renderTo.appendChild(c), U(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), E(b, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }), b.style.setProperty && b.style.setProperty("display", "block", "important"),
                O.body.appendChild(b), c && b.appendChild(c))
        }, getContainer: function () {
            var a, b = this.options.chart, c, d, e;
            this.renderTo = a = b.renderTo;
            e = "highcharts-" + Va++;
            aa(a) && (this.renderTo = a = O.getElementById(a));
            a || ma(13, !0);
            c = I(y(a, "data-highcharts-chart"));
            !isNaN(c) && ka[c] && ka[c].hasRendered && ka[c].destroy();
            y(a, "data-highcharts-chart", this.index);
            a.innerHTML = "";
            b.skipClone || a.offsetWidth || this.cloneRenderTo();
            this.getChartSize();
            c = this.chartWidth;
            d = this.chartHeight;
            this.container = a = C("div", {
                className: "highcharts-container" +
                (b.className ? " " + b.className : ""), id: e
            }, q({
                position: "relative",
                overflow: "hidden",
                width: c + "px",
                height: d + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
            }, b.style), this.renderToClone || a);
            this._cursor = a.style.cursor;
            this.renderer = b.forExport ? new Ca(a, c, d, b.style, !0) : new Ca(a, c, d, b.style);
            oa && this.renderer.create(this, a, c, d)
        }, getMargins: function () {
            var a = this.spacing, b, c = this.legend, d = this.margin, e = this.options.legend, f = h(e.margin, 20), g = e.x, k = e.y, n = e.align,
                u = e.verticalAlign, B = this.titleOffset;
            this.resetMargins();
            b = this.axisOffset;
            B && !r(d[0]) && (this.plotTop = K(this.plotTop, B + this.options.title.margin + a[0]));
            c.display && !e.floating && ("right" === n ? r(d[1]) || (this.marginRight = K(this.marginRight, c.legendWidth - g + f + a[1])) : "left" === n ? r(d[3]) || (this.plotLeft = K(this.plotLeft, c.legendWidth + g + f + a[3])) : "top" === u ? r(d[0]) || (this.plotTop = K(this.plotTop, c.legendHeight + k + f + a[0])) : "bottom" !== u || r(d[2]) || (this.marginBottom = K(this.marginBottom, c.legendHeight - k + f + a[2])));
            this.extraBottomMargin &&
            (this.marginBottom += this.extraBottomMargin);
            this.extraTopMargin && (this.plotTop += this.extraTopMargin);
            this.hasCartesianSeries && A(this.axes, function (a) {
                a.getOffset()
            });
            r(d[3]) || (this.plotLeft += b[3]);
            r(d[0]) || (this.plotTop += b[0]);
            r(d[2]) || (this.marginBottom += b[2]);
            r(d[1]) || (this.marginRight += b[1]);
            this.setChartSize()
        }, reflow: function (a) {
            var b = this, c = b.options.chart, d = b.renderTo, e = c.width || Qa(d, "width"), f = c.height || Qa(d, "height"), c = a ? a.target : Y, d = function () {
                b.container && (b.setSize(e, f, !1), b.hasUserSize =
                    null)
            };
            if (!b.hasUserSize && e && f && (c === Y || c === O)) {
                if (e !== b.containerWidth || f !== b.containerHeight)clearTimeout(b.reflowTimeout), a ? b.reflowTimeout = setTimeout(d, 100) : d();
                b.containerWidth = e;
                b.containerHeight = f
            }
        }, initReflow: function () {
            var a = this, b = function (b) {
                a.reflow(b)
            };
            ca(Y, "resize", b);
            ca(a, "destroy", function () {
                ga(Y, "resize", b)
            })
        }, setSize: function (a, b, c) {
            var d = this, e, f, g;
            d.isResizing += 1;
            g = function () {
                d && W(d, "endResize", null, function () {
                    --d.isResizing
                })
            };
            pa = h(c, d.animation);
            d.oldChartHeight = d.chartHeight;
            d.oldChartWidth = d.chartWidth;
            r(a) && (d.chartWidth = e = K(0, M(a)), d.hasUserSize = !!e);
            r(b) && (d.chartHeight = f = K(0, M(b)));
            (pa ? ob : E)(d.container, {width: e + "px", height: f + "px"}, pa);
            d.setChartSize(!0);
            d.renderer.setSize(e, f, c);
            d.maxTicks = null;
            A(d.axes, function (a) {
                a.isDirty = !0;
                a.setScale()
            });
            A(d.series, function (a) {
                a.isDirty = !0
            });
            d.isDirtyLegend = !0;
            d.isDirtyBox = !0;
            d.layOutTitles();
            d.getMargins();
            d.redraw(c);
            d.oldChartHeight = null;
            W(d, "resize");
            !1 === pa ? g() : setTimeout(g, pa && pa.duration || 500)
        }, setChartSize: function (a) {
            var b =
                this.inverted, c = this.renderer, d = this.chartWidth, e = this.chartHeight, f = this.options.chart, g = this.spacing, k = this.clipOffset, n, u, h, m;
            this.plotLeft = n = M(this.plotLeft);
            this.plotTop = u = M(this.plotTop);
            this.plotWidth = h = K(0, M(d - n - this.marginRight));
            this.plotHeight = m = K(0, M(e - u - this.marginBottom));
            this.plotSizeX = b ? m : h;
            this.plotSizeY = b ? h : m;
            this.plotBorderWidth = f.plotBorderWidth || 0;
            this.spacingBox = c.spacingBox = {x: g[3], y: g[0], width: d - g[3] - g[1], height: e - g[0] - g[2]};
            this.plotBox = c.plotBox = {x: n, y: u, width: h, height: m};
            d = 2 * la(this.plotBorderWidth / 2);
            b = ua(K(d, k[3]) / 2);
            c = ua(K(d, k[0]) / 2);
            this.clipBox = {
                x: b,
                y: c,
                width: la(this.plotSizeX - K(d, k[1]) / 2 - b),
                height: K(0, la(this.plotSizeY - K(d, k[2]) / 2 - c))
            };
            a || A(this.axes, function (a) {
                a.setAxisSize();
                a.setAxisTranslation()
            })
        }, resetMargins: function () {
            var a = this.spacing, b = this.margin;
            this.plotTop = h(b[0], a[0]);
            this.marginRight = h(b[1], a[1]);
            this.marginBottom = h(b[2], a[2]);
            this.plotLeft = h(b[3], a[3]);
            this.axisOffset = [0, 0, 0, 0];
            this.clipOffset = [0, 0, 0, 0]
        }, drawChartBox: function () {
            var a = this.options.chart,
                b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, g = this.plotBorder, k = this.plotBGImage, n = a.borderWidth || 0, u = a.backgroundColor, h = a.plotBackgroundColor, m = a.plotBackgroundImage, x = a.plotBorderWidth || 0, w, v = this.plotLeft, p = this.plotTop, l = this.plotWidth, r = this.plotHeight, H = this.plotBox, z = this.clipRect, t = this.clipBox;
            w = n + (a.shadow ? 8 : 0);
            if (n || u)e ? e.animate(e.crisp({
                width: c - w,
                height: d - w
            })) : (e = {fill: u || "none"}, n && (e.stroke = a.borderColor, e["stroke-width"] = n), this.chartBackground =
                b.rect(w / 2, w / 2, c - w, d - w, a.borderRadius, n).attr(e).addClass("highcharts-background").add().shadow(a.shadow));
            h && (f ? f.animate(H) : this.plotBackground = b.rect(v, p, l, r, 0).attr({fill: h}).add().shadow(a.plotShadow));
            m && (k ? k.animate(H) : this.plotBGImage = b.image(m, v, p, l, r).add());
            z ? z.animate({width: t.width, height: t.height}) : this.clipRect = b.clipRect(t);
            x && (g ? g.animate(g.crisp({
                x: v,
                y: p,
                width: l,
                height: r,
                strokeWidth: -x
            })) : this.plotBorder = b.rect(v, p, l, r, 0, -x).attr({
                stroke: a.plotBorderColor, "stroke-width": x, fill: "none",
                zIndex: 1
            }).add());
            this.isDirtyBox = !1
        }, propFromSeries: function () {
            var a = this, b = a.options.chart, c, d = a.options.series, e, f;
            A(["inverted", "angular", "polar"], function (g) {
                c = fa[b.type || b.defaultSeriesType];
                f = a[g] || b[g] || c && c.prototype[g];
                for (e = d && d.length; !f && e--;)(c = fa[d[e].type]) && c.prototype[g] && (f = !0);
                a[g] = f
            })
        }, linkSeries: function () {
            var a = this, b = a.series;
            A(b, function (a) {
                a.linkedSeries.length = 0
            });
            A(b, function (b) {
                var d = b.options.linkedTo;
                aa(d) && (d = ":previous" === d ? a.series[b.index - 1] : a.get(d)) && (d.linkedSeries.push(b),
                    b.linkedParent = d)
            })
        }, renderSeries: function () {
            A(this.series, function (a) {
                a.translate();
                a.setTooltipPoints && a.setTooltipPoints();
                a.render()
            })
        }, renderLabels: function () {
            var a = this, b = a.options.labels;
            b.items && A(b.items, function (c) {
                var d = q(b.style, c.style), e = I(d.left) + a.plotLeft, f = I(d.top) + a.plotTop + 12;
                delete d.left;
                delete d.top;
                a.renderer.text(c.html, e, f).attr({zIndex: 2}).css(d).add()
            })
        }, render: function () {
            var a = this.axes, b = this.renderer, c = this.options;
            this.setTitle();
            this.legend = new Sa(this, c.legend);
            this.getStacks();
            A(a, function (a) {
                a.setScale()
            });
            this.getMargins();
            this.maxTicks = null;
            A(a, function (a) {
                a.setTickPositions(!0);
                a.setMaxTicks()
            });
            this.adjustTickAmounts();
            this.getMargins();
            this.drawChartBox();
            this.hasCartesianSeries && A(a, function (a) {
                a.render()
            });
            this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
            this.renderSeries();
            this.renderLabels();
            this.showCredits(c.credits);
            this.hasRendered = !0
        }, showCredits: function (a) {
            a.enabled && !this.credits && (this.credits = this.renderer.text(a.text,
                0, 0).on("click", function () {
                    a.href && (location.href = a.href)
                }).attr({align: a.position.align, zIndex: 8}).css(a.style).add().align(a.position))
        }, destroy: function () {
            var a = this, b = a.axes, c = a.series, d = a.container, e, f = d && d.parentNode;
            W(a, "destroy");
            ka[a.index] = F;
            Ga--;
            a.renderTo.removeAttribute("data-highcharts-chart");
            ga(a);
            for (e = b.length; e--;)b[e] = b[e].destroy();
            for (e = c.length; e--;)c[e] = c[e].destroy();
            A("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer scroller rangeSelector legend resetZoomButton tooltip renderer".split(" "),
                function (b) {
                    var c = a[b];
                    c && c.destroy && (a[b] = c.destroy())
                });
            d && (d.innerHTML = "", ga(d), f && U(d));
            for (e in a)delete a[e]
        }, isReadyToRender: function () {
            var a = this;
            return !ia && Y == Y.top && "complete" !== O.readyState || oa && !Y.canvg ? (oa ? CanVGController.push(function () {
                a.firstRender()
            }, a.options.global.canvasToolsURL) : O.attachEvent("onreadystatechange", function () {
                O.detachEvent("onreadystatechange", a.firstRender);
                "complete" === O.readyState && a.firstRender()
            }), !1) : !0
        }, firstRender: function () {
            var a = this, b = a.options, c = a.callback;
            a.isReadyToRender() && (a.getContainer(), W(a, "init"), a.resetMargins(), a.setChartSize(), a.propFromSeries(), a.getAxes(), A(b.series || [], function (b) {
                a.initSeries(b)
            }), a.linkSeries(), W(a, "beforeRender"), ja.Pointer && (a.pointer = new qb(a, b)), a.render(), a.renderer.draw(), c && c.apply(a, [a]), A(a.callbacks, function (b) {
                b.apply(a, [a])
            }), a.cloneRenderTo(!0), W(a, "load"))
        }, splashArray: function (a, b) {
            var c = b[a], c = N(c) ? c : [c, c, c, c];
            return [h(b[a + "Top"], c[0]), h(b[a + "Right"], c[1]), h(b[a + "Bottom"], c[2]), h(b[a + "Left"], c[3])]
        }
    };
    Na.prototype.callbacks = [];
    var Ja = function () {
    };
    Ja.prototype = {
        init: function (a, b, c) {
            this.series = a;
            this.applyOptions(b, c);
            this.pointAttr = {};
            a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length && (a.colorCounter = 0));
            a.chart.pointCount++;
            return this
        }, applyOptions: function (a, b) {
            var c = this.series, d = c.options.pointValKey || c.pointValKey;
            a = Ja.prototype.optionsToObject.call(this, a);
            q(this, a);
            this.options = this.options ? q(this.options,
                a) : a;
            d && (this.y = this[d]);
            this.x === F && c && (this.x = b === F ? c.autoIncrement() : b);
            return this
        }, optionsToObject: function (a) {
            var b = {}, c = this.series, d = c.pointArrayMap || ["y"], e = d.length, f = 0, g = 0;
            if ("number" === typeof a || null === a)b[d[0]] = a; else if (R(a))for (a.length > e && (c = typeof a[0], "string" === c ? b.name = a[0] : "number" === c && (b.x = a[0]), f++); g < e;)b[d[g++]] = a[f++]; else"object" === typeof a && (b = a, a.dataLabels && (c._hasPointLabels = !0), a.marker && (c._hasPointMarkers = !0));
            return b
        }, destroy: function () {
            var a = this.series.chart,
                b = a.hoverPoints, c;
            a.pointCount--;
            b && (this.setState(), D(b, this), b.length || (a.hoverPoints = null));
            if (this === a.hoverPoint)this.onMouseOut();
            if (this.graphic || this.dataLabel)ga(this), this.destroyElements();
            this.legendItem && a.legend.destroyItem(this);
            for (c in this)this[c] = null
        }, destroyElements: function () {
            for (var a = "graphic dataLabel dataLabelUpper group connector shadowGroup".split(" "), b, c = 6; c--;)b = a[c], this[b] && (this[b] = this[b].destroy())
        }, getLabelConfig: function () {
            return {
                x: this.category,
                y: this.y,
                key: this.name ||
                this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal
            }
        }, tooltipFormatter: function (a) {
            var b = this.series, c = b.tooltipOptions, d = h(c.valueDecimals, ""), e = c.valuePrefix || "", f = c.valueSuffix || "";
            A(b.pointArrayMap || ["y"], function (b) {
                b = "{point." + b;
                if (e || f)a = a.replace(b + "}", e + b + "}" + f);
                a = a.replace(b + "}", b + ":,." + d + "f}")
            });
            return m(a, {point: this, series: this.series})
        }, firePointEvent: function (a, b, c) {
            var d = this, e = this.series.options;
            (e.point.events[a] || d.options &&
            d.options.events && d.options.events[a]) && this.importEvents();
            "click" === a && e.allowPointSelect && (c = function (a) {
                d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
            });
            W(this, a, b, c)
        }
    };
    var ha = function () {
    };
    ha.prototype = {
        isCartesian: !0,
        type: "line",
        pointClass: Ja,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor", r: "radius"},
        axisTypes: ["xAxis", "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        init: function (a, b) {
            var c = this, d, e, f = a.series, g = function (a, b) {
                return h(a.options.index,
                        a._i) - h(b.options.index, b._i)
            };
            c.chart = a;
            c.options = b = c.setOptions(b);
            c.linkedSeries = [];
            c.bindAxes();
            q(c, {name: b.name, state: "", pointAttr: {}, visible: !1 !== b.visible, selected: !0 === b.selected});
            oa && (b.animation = !1);
            e = b.events;
            for (d in e)ca(c, d, e[d]);
            if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect)a.runTrackerClick = !0;
            c.getColor();
            c.getSymbol();
            A(c.parallelArrays, function (a) {
                c[a + "Data"] = []
            });
            c.setData(b.data, !1);
            c.isCartesian && (a.hasCartesianSeries = !0);
            f.push(c);
            c._i = f.length -
            1;
            z(f, g);
            this.yAxis && z(this.yAxis.series, g);
            A(f, function (a, b) {
                a.index = b;
                a.name = a.name || "Series " + (b + 1)
            })
        },
        bindAxes: function () {
            var a = this, b = a.options, c = a.chart, d;
            A(a.axisTypes || [], function (e) {
                A(c[e], function (c) {
                    d = c.options;
                    if (b[e] === d.index || b[e] !== F && b[e] === d.id || b[e] === F && 0 === d.index)c.series.push(a), a[e] = c, c.isDirty = !0
                });
                a[e] || a.optionalAxis === e || ma(18, !0)
            })
        },
        updateParallelArrays: function (a, b) {
            var c = a.series, d = arguments;
            A(c.parallelArrays, "number" === typeof b ? function (d) {
                var f = "y" === d && c.toYData ?
                    c.toYData(a) : a[d];
                c[d + "Data"][b] = f
            } : function (a) {
                Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
            })
        },
        autoIncrement: function () {
            var a = this.options, b = this.xIncrement, b = h(b, a.pointStart, 0);
            this.pointInterval = h(this.pointInterval, a.pointInterval, 1);
            this.xIncrement = b + this.pointInterval;
            return b
        },
        getSegments: function () {
            var a = -1, b = [], c, d = this.points, e = d.length;
            if (e)if (this.options.connectNulls) {
                for (c = e; c--;)null === d[c].y && d.splice(c, 1);
                d.length && (b = [d])
            } else A(d, function (c, g) {
                null === c.y ?
                    (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) : g === e - 1 && b.push(d.slice(a + 1, g + 1))
            });
            this.segments = b
        },
        setOptions: function (a) {
            var b = this.chart, c = b.options.plotOptions, b = b.userOptions || {}, d = b.plotOptions || {}, e = c[this.type];
            this.userOptions = a;
            c = L(e, c.series, a);
            this.tooltipOptions = L(da.tooltip, da.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip);
            null === e.marker && delete c.marker;
            return c
        },
        getCyclic: function (a, b, c) {
            var d = this.userOptions, e = "_" + a + "Index",
                f = a + "Counter";
            b || (r(d[e]) ? b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), b = c[b]);
            this[a] = b
        },
        getColor: function () {
            this.options.colorByPoint || this.getCyclic("color", this.options.color || Aa[this.type].color, this.chart.options.colors)
        },
        getSymbol: function () {
            var a = this.options.marker;
            this.getCyclic("symbol", a.symbol, this.chart.options.symbols);
            /^url/.test(this.symbol) && (a.radius = 0)
        },
        drawLegendSymbol: rb.drawLineMarker,
        setData: function (a, b, c, d) {
            var e = this, f = e.points, g = f && f.length || 0, k, n = e.options,
                u = e.chart, B = null, m = e.xAxis, x = m && !!m.categories, w = e.tooltipPoints, v = n.turboThreshold, p = this.xData, l = this.yData, r = (k = e.pointArrayMap) && k.length;
            a = a || [];
            k = a.length;
            b = h(b, !0);
            if (!1 === d || !k || g !== k || e.cropped || e.hasGroupedData) {
                e.xIncrement = null;
                e.pointRange = x ? 1 : n.pointRange;
                e.colorCounter = 0;
                A(this.parallelArrays, function (a) {
                    e[a + "Data"].length = 0
                });
                if (v && k > v) {
                    for (c = 0; null === B && c < k;)B = a[c], c++;
                    if (T(B)) {
                        x = h(n.pointStart, 0);
                        n = h(n.pointInterval, 1);
                        for (c = 0; c < k; c++)p[c] = x, l[c] = a[c], x += n;
                        e.xIncrement = x
                    } else if (R(B))if (r)for (c =
                                                   0; c < k; c++)n = a[c], p[c] = n[0], l[c] = n.slice(1, r + 1); else for (c = 0; c < k; c++)n = a[c], p[c] = n[0], l[c] = n[1]; else ma(12)
                } else for (c = 0; c < k; c++)a[c] !== F && (n = {series: e}, e.pointClass.prototype.applyOptions.apply(n, [a[c]]), e.updateParallelArrays(n, c), x && n.name && (m.names[n.x] = n.name));
                aa(l[0]) && ma(14, !0);
                e.data = [];
                e.options.data = a;
                for (c = g; c--;)f[c] && f[c].destroy && f[c].destroy();
                w && (w.length = 0);
                m && (m.minRange = m.userMinRange);
                e.isDirty = e.isDirtyData = u.isDirtyBox = !0;
                c = !1
            } else A(a, function (a, b) {
                f[b].update(a, !1, null, !1)
            });
            b && u.redraw(c)
        },
        processData: function (a) {
            var b = this.xData, c = this.yData, d = b.length, e;
            e = 0;
            var f, g, k = this.xAxis, n, u = this.options;
            n = u.cropThreshold;
            var h = 0, m = this.isCartesian, x, v;
            if (m && !this.isDirty && !k.isDirty && !this.yAxis.isDirty && !a)return !1;
            k && (x = k.getExtremes(), v = x.min, x = x.max);
            if (m && this.sorted && (!n || d > n || this.forceCrop))if (b[d - 1] < v || b[0] > x)b = [], c = []; else if (b[0] < v || b[d - 1] > x)e = this.cropData(this.xData, this.yData, v, x), b = e.xData, c = e.yData, e = e.start, f = !0, h = b.length;
            for (n = b.length - 1; 0 <= n; n--)d = b[n] -
            b[n - 1], !f && b[n] > v && b[n] < x && h++, 0 < d && (g === F || d < g) ? g = d : 0 > d && this.requireSorting && ma(15);
            this.cropped = f;
            this.cropStart = e;
            this.processedXData = b;
            this.processedYData = c;
            this.activePointCount = h;
            null === u.pointRange && (this.pointRange = g || 1);
            this.closestPointRange = g
        },
        cropData: function (a, b, c, d) {
            var e = a.length, f = 0, g = e, k = h(this.cropShoulder, 1), n;
            for (n = 0; n < e; n++)if (a[n] >= c) {
                f = K(0, n - k);
                break
            }
            for (; n < e; n++)if (a[n] > d) {
                g = n + k;
                break
            }
            return {xData: a.slice(f, g), yData: b.slice(f, g), start: f, end: g}
        },
        generatePoints: function () {
            var a =
                this.options.data, b = this.data, c, d = this.processedXData, e = this.processedYData, f = this.pointClass, g = d.length, k = this.cropStart || 0, n, u = this.hasGroupedData, h, m = [], x;
            b || u || (b = [], b.length = a.length, b = this.data = b);
            for (x = 0; x < g; x++)n = k + x, u ? m[x] = (new f).init(this, [d[x]].concat(t(e[x]))) : (b[n] ? h = b[n] : a[n] !== F && (b[n] = h = (new f).init(this, a[n], d[x])), m[x] = h), m[x].index = n;
            if (b && (g !== (c = b.length) || u))for (x = 0; x < c; x++)x !== k || u || (x += g), b[x] && (b[x].destroyElements(), b[x].plotX = F);
            this.data = b;
            this.points = m
        },
        getExtremes: function (a) {
            var b =
                this.yAxis, c = this.processedXData, d, e = [], f = 0;
            d = this.xAxis.getExtremes();
            var g = d.min, k = d.max, n, u, m, v;
            a = a || this.stackedYData || this.processedYData;
            d = a.length;
            for (v = 0; v < d; v++)if (u = c[v], m = a[v], n = null !== m && m !== F && (!b.isLog || m.length || 0 < m), u = this.getExtremesFromAll || this.cropped || (c[v + 1] || u) >= g && (c[v - 1] || u) <= k, n && u)if (n = m.length)for (; n--;)null !== m[n] && (e[f++] = m[n]); else e[f++] = m;
            this.dataMin = h(void 0, Q(e));
            this.dataMax = h(void 0, va(e))
        },
        translate: function () {
            this.processedXData || this.processData();
            this.generatePoints();
            for (var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis, f = this.points, g = f.length, k = !!this.modifyValue, n = a.pointPlacement, u = "between" === n || T(n), m = a.threshold, a = 0; a < g; a++) {
                var v = f[a], x = v.x, w = v.y, p = v.low, l = b && e.stacks[(this.negStacks && w < m ? "-" : "") + this.stackKey];
                e.isLog && 0 >= w && (v.y = w = null, ma(10));
                v.plotX = c.translate(x, 0, 0, 0, 1, n, "flags" === this.type);
                b && this.visible && l && l[x] && (l = l[x], w = l.points[this.index + "," + a], p = w[0], w = w[1], 0 === p && (p = h(m, e.min)), e.isLog && 0 >= p && (p = null), v.total = v.stackTotal =
                    l.total, v.percentage = l.total && v.y / l.total * 100, v.stackY = w, l.setOffset(this.pointXOffset || 0, this.barW || 0));
                v.yBottom = r(p) ? e.translate(p, 0, 1, 0, 1) : null;
                k && (w = this.modifyValue(w, v));
                v.plotY = "number" === typeof w && Infinity !== w ? e.translate(w, 0, 1, 0, 1) : F;
                v.clientX = u ? c.translate(x, 0, 0, 0, 1) : v.plotX;
                v.negative = v.y < (m || 0);
                v.category = d && d[v.x] !== F ? d[v.x] : v.x
            }
            this.getSegments()
        },
        animate: function (a) {
            var b = this.chart, c = b.renderer, d;
            d = this.options.animation;
            var e = this.clipBox || b.clipBox, f = b.inverted, g;
            d && !N(d) && (d = Aa[this.type].animation);
            g = ["_sharedClip", d.duration, d.easing, e.height].join();
            a ? (a = b[g], d = b[g + "m"], a || (b[g] = a = c.clipRect(q(e, {width: 0})), b[g + "m"] = d = c.clipRect(-99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), this.group.clip(a), this.markerGroup.clip(d), this.sharedClipKey = g) : ((a = b[g]) && a.animate({width: b.plotSizeX}, d), b[g + "m"] && b[g + "m"].animate({width: b.plotSizeX + 99}, d), this.animate = null)
        },
        afterAnimate: function () {
            var a = this.chart, b = this.sharedClipKey, c = this.group, d = this.clipBox;
            c && !1 !== this.options.clip && (b &&
            d || c.clip(d ? a.renderer.clipRect(d) : a.clipRect), this.markerGroup.clip());
            W(this, "afterAnimate");
            setTimeout(function () {
                b && a[b] && (d || (a[b] = a[b].destroy()), a[b + "m"] && (a[b + "m"] = a[b + "m"].destroy()))
            }, 100)
        },
        drawPoints: function () {
            var a, b = this.points, c = this.chart, d, e, f, g, k, n, u, m, v = this.options.marker, x = this.pointAttr[""], w, p, l, r = this.markerGroup, H = h(v.enabled, !this.requireSorting || this.activePointCount < .5 * this.xAxis.len / v.radius);
            if (!1 !== v.enabled || this._hasPointMarkers)for (f = b.length; f--;)g = b[f], d = la(g.plotX),
                e = g.plotY, m = g.graphic, w = g.marker || {}, p = !!g.marker, a = H && w.enabled === F || w.enabled, l = c.isInsidePlot(M(d), e, c.inverted), a && e !== F && !isNaN(e) && null !== g.y ? (a = g.pointAttr[g.selected ? "select" : ""] || x, k = a.r, n = h(w.symbol, this.symbol), u = 0 === n.indexOf("url"), m ? m[l ? "show" : "hide"](!0).animate(q({
                x: d - k,
                y: e - k
            }, m.symbolName ? {
                width: 2 * k,
                height: 2 * k
            } : {})) : l && (0 < k || u) && (g.graphic = c.renderer.symbol(n, d - k, e - k, 2 * k, 2 * k, p ? w : v).attr(a).add(r))) : m && (g.graphic = m.destroy())
        },
        convertAttribs: function (a, b, c, d) {
            var e = this.pointAttrToOptions,
                f, g, k = {};
            a = a || {};
            b = b || {};
            c = c || {};
            d = d || {};
            for (f in e)g = e[f], k[f] = h(a[g], b[f], c[f], d[f]);
            return k
        },
        getAttribs: function () {
            var a = this, b = a.options, c = Aa[a.type].marker ? b.marker : b, d = c.states, e = d.hover, f, g = a.color;
            f = {stroke: g, fill: g};
            var k = a.points || [], n, u = [], m, h = a.pointAttrToOptions;
            m = a.hasPointSpecificOptions;
            var v = b.negativeColor, w = c.lineColor, p = c.fillColor;
            n = b.turboThreshold;
            var l;
            b.marker ? (e.radius = e.radius || c.radius + e.radiusPlus, e.lineWidth = e.lineWidth || c.lineWidth + e.lineWidthPlus) : e.color = e.color ||
            Ba(e.color || g).brighten(e.brightness).get();
            u[""] = a.convertAttribs(c, f);
            A(["hover", "select"], function (b) {
                u[b] = a.convertAttribs(d[b], u[""])
            });
            a.pointAttr = u;
            g = k.length;
            if (!n || g < n || m)for (; g--;) {
                n = k[g];
                (c = n.options && n.options.marker || n.options) && !1 === c.enabled && (c.radius = 0);
                n.negative && v && (n.color = n.fillColor = v);
                m = b.colorByPoint || n.color;
                if (n.options)for (l in h)r(c[h[l]]) && (m = !0);
                m ? (c = c || {}, m = [], d = c.states || {}, f = d.hover = d.hover || {}, b.marker || (f.color = f.color || !n.options.color && e.color || Ba(n.color).brighten(f.brightness ||
                e.brightness).get()), f = {color: n.color}, p || (f.fillColor = n.color), w || (f.lineColor = n.color), m[""] = a.convertAttribs(q(f, c), u[""]), m.hover = a.convertAttribs(d.hover, u.hover, m[""]), m.select = a.convertAttribs(d.select, u.select, m[""])) : m = u;
                n.pointAttr = m
            }
        },
        destroy: function () {
            var a = this, b = a.chart, c = /AppleWebKit\/533/.test(ta), d, e, f = a.data || [], g, k, n;
            W(a, "destroy");
            ga(a);
            A(a.axisTypes || [], function (b) {
                if (n = a[b])D(n.series, a), n.isDirty = n.forceRedraw = !0
            });
            a.legendItem && a.chart.legend.destroyItem(a);
            for (e = f.length; e--;)(g =
                f[e]) && g.destroy && g.destroy();
            a.points = null;
            clearTimeout(a.animationTimeout);
            A("area graph dataLabelsGroup group markerGroup tracker graphNeg areaNeg posClip negClip".split(" "), function (b) {
                a[b] && (d = c && "group" === b ? "hide" : "destroy", a[b][d]())
            });
            b.hoverSeries === a && (b.hoverSeries = null);
            D(b.series, a);
            for (k in a)delete a[k]
        },
        getSegmentPath: function (a) {
            var b = this, c = [], d = b.options.step;
            A(a, function (e, f) {
                var g = e.plotX, k = e.plotY, n;
                b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) : (c.push(f ? "L" : "M"),
                d && f && (n = a[f - 1], "right" === d ? c.push(n.plotX, k) : "center" === d ? c.push((n.plotX + g) / 2, n.plotY, (n.plotX + g) / 2, k) : c.push(g, n.plotY)), c.push(e.plotX, e.plotY))
            });
            return c
        },
        getGraphPath: function () {
            var a = this, b = [], c, d = [];
            A(a.segments, function (e) {
                c = a.getSegmentPath(e);
                1 < e.length ? b = b.concat(c) : d.push(e[0])
            });
            a.singlePoints = d;
            return a.graphPath = b
        },
        drawGraph: function () {
            var a = this, b = this.options, c = [["graph", b.lineColor || this.color]], d = b.lineWidth, e = b.dashStyle, f = "square" !== b.linecap, g = this.getGraphPath(), k = b.negativeColor;
            k && c.push(["graphNeg", k]);
            A(c, function (c, k) {
                var m = c[0], h = a[m];
                h ? (Ha(h), h.animate({d: g})) : d && g.length && (h = {
                    stroke: c[1],
                    "stroke-width": d,
                    fill: "none",
                    zIndex: 1
                }, e ? h.dashstyle = e : f && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), a[m] = a.chart.renderer.path(g).attr(h).add(a.group).shadow(!k && b.shadow))
            })
        },
        clipNeg: function () {
            var a = this.options, b = this.chart, c = b.renderer, d = a.negativeColor || a.negativeFillColor, e, f = this.graph, g = this.area, k = this.posClip, n = this.negClip;
            e = b.chartWidth;
            var m = b.chartHeight, h = K(e,
                m), v = this.yAxis;
            d && (f || g) && (d = M(v.toPixels(a.threshold || 0, !0)), 0 > d && (h -= d), a = {
                x: 0,
                y: 0,
                width: h,
                height: d
            }, h = {
                x: 0,
                y: d,
                width: h,
                height: h
            }, b.inverted && (a.height = h.y = b.plotWidth - d, c.isVML && (a = {
                x: b.plotWidth - d - b.plotLeft,
                y: 0,
                width: e,
                height: m
            }, h = {
                x: d + b.plotLeft - e,
                y: 0,
                width: b.plotLeft + d,
                height: e
            })), v.reversed ? (b = h, e = a) : (b = a, e = h), k ? (k.animate(b), n.animate(e)) : (this.posClip = k = c.clipRect(b), this.negClip = n = c.clipRect(e), f && this.graphNeg && (f.clip(k), this.graphNeg.clip(n)), g && (g.clip(k), this.areaNeg.clip(n))))
        },
        invertGroups: function () {
            function a() {
                var a = {width: b.yAxis.len, height: b.xAxis.len};
                A(["group", "markerGroup"], function (c) {
                    b[c] && b[c].attr(a).invert()
                })
            }

            var b = this, c = b.chart;
            b.xAxis && (ca(c, "resize", a), ca(b, "destroy", function () {
                ga(c, "resize", a)
            }), a(), b.invertGroups = a)
        },
        plotGroup: function (a, b, c, d, e) {
            var f = this[a], g = !f;
            g && (this[a] = f = this.chart.renderer.g(b).attr({visibility: c, zIndex: d || .1}).add(e));
            f[g ? "attr" : "animate"](this.getPlotBox());
            return f
        },
        getPlotBox: function () {
            var a = this.chart, b = this.xAxis, c =
                this.yAxis;
            a.inverted && (b = c, c = this.xAxis);
            return {translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1}
        },
        render: function () {
            var a = this, b = a.chart, c, d = a.options, e = (c = d.animation) && !!a.animate && b.renderer.isSVG && h(c.duration, 500) || 0, f = a.visible ? "visible" : "hidden", g = d.zIndex, k = a.hasRendered, n = b.seriesGroup;
            c = a.plotGroup("group", "series", f, g, n);
            a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, n);
            e && a.animate(!0);
            a.getAttribs();
            c.inverted = a.isCartesian ? b.inverted : !1;
            a.drawGraph &&
            (a.drawGraph(), a.clipNeg());
            A(a.points, function (a) {
                a.redraw && a.redraw()
            });
            a.drawDataLabels && a.drawDataLabels();
            a.visible && a.drawPoints();
            a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
            b.inverted && a.invertGroups();
            !1 === d.clip || a.sharedClipKey || k || c.clip(b.clipRect);
            e && a.animate();
            k || (e ? a.animationTimeout = setTimeout(function () {
                a.afterAnimate()
            }, e) : a.afterAnimate());
            a.isDirty = a.isDirtyData = !1;
            a.hasRendered = !0
        },
        redraw: function () {
            var a = this.chart, b = this.isDirtyData, c = this.group, d = this.xAxis,
                e = this.yAxis;
            c && (a.inverted && c.attr({
                width: a.plotWidth,
                height: a.plotHeight
            }), c.animate({translateX: h(d && d.left, a.plotLeft), translateY: h(e && e.top, a.plotTop)}));
            this.translate();
            this.setTooltipPoints && this.setTooltipPoints(!0);
            this.render();
            b && W(this, "updatedData")
        }
    };
    hb.prototype = {
        destroy: function () {
            ra(this, this.axis)
        }, render: function (a) {
            var b = this.options, c = b.format, c = c ? m(c, this) : b.formatter.call(this);
            this.label ? this.label.attr({
                text: c,
                visibility: "hidden"
            }) : this.label = this.axis.chart.renderer.text(c,
                null, null, b.useHTML).css(b.style).attr({
                    align: this.textAlign,
                    rotation: b.rotation,
                    visibility: "hidden"
                }).add(a)
        }, setOffset: function (a, b) {
            var c = this.axis, d = c.chart, e = d.inverted, f = this.isNegative, g = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1), c = c.translate(0), c = X(g - c), k = d.xAxis[0].translate(this.x) + a, n = d.plotHeight, f = {
                x: e ? f ? g : g - c : k,
                y: e ? n - k - b : f ? n - g - c : n - g,
                width: e ? c : b,
                height: e ? b : c
            };
            if (e = this.label)e.align(this.alignOptions, null, f), f = e.alignAttr, e[!1 === this.options.crop || d.isInsidePlot(f.x, f.y) ? "show" :
                "hide"](!0)
        }
    };
    xa.prototype.buildStacks = function () {
        var a = this.series, b = h(this.options.reversedStacks, !0), c = a.length;
        if (!this.isXAxis) {
            for (this.usePercentage = !1; c--;)a[b ? c : a.length - c - 1].setStackedPoints();
            if (this.usePercentage)for (c = 0; c < a.length; c++)a[c].setPercentStacks()
        }
    };
    xa.prototype.renderStackTotals = function () {
        var a = this.chart, b = a.renderer, c = this.stacks, d, e, f = this.stackTotalGroup;
        f || (this.stackTotalGroup = f = b.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add());
        f.translate(a.plotLeft,
            a.plotTop);
        for (d in c)for (e in a = c[d], a)a[e].render(f)
    };
    ha.prototype.setStackedPoints = function () {
        if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
            var a = this.processedXData, b = this.processedYData, c = [], d = b.length, e = this.options, f = e.threshold, g = e.stack, e = e.stacking, k = this.stackKey, n = "-" + k, h = this.negStacks, m = this.yAxis, v = m.stacks, x = m.oldStacks, p, l, r, H, z, t;
            for (H = 0; H < d; H++)z = a[H], t = b[H], r = this.index + "," + H, l = (p = h && t < f) ? n : k, v[l] || (v[l] = {}), v[l][z] || (x[l] && x[l][z] ?
                (v[l][z] = x[l][z], v[l][z].total = null) : v[l][z] = new hb(m, m.options.stackLabels, p, z, g)), l = v[l][z], l.points[r] = [l.cum || 0], "percent" === e ? (p = p ? k : n, h && v[p] && v[p][z] ? (p = v[p][z], l.total = p.total = K(p.total, l.total) + X(t) || 0) : l.total = V(l.total + (X(t) || 0))) : l.total = V(l.total + (t || 0)), l.cum = (l.cum || 0) + (t || 0), l.points[r].push(l.cum), c[H] = l.cum;
            "percent" === e && (m.usePercentage = !0);
            this.stackedYData = c;
            m.oldStacks = {}
        }
    };
    ha.prototype.setPercentStacks = function () {
        var a = this, b = a.stackKey, c = a.yAxis.stacks, d = a.processedXData;
        A([b, "-" + b], function (b) {
            for (var f = d.length, g, k; f--;)if (g = d[f], g = (k = c[b] && c[b][g]) && k.points[a.index + "," + f])k = k.total ? 100 / k.total : 0, g[0] = V(g[0] * k), g[1] = V(g[1] * k), a.stackedYData[f] = g[1]
        })
    };
    var Bb = ba(ha);
    fa.line = Bb;
    Aa.column = L(xb, {
        borderColor: "#FFFFFF",
        borderRadius: 0,
        groupPadding: .2,
        marker: null,
        pointPadding: .1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: {
            hover: {brightness: .1, shadow: !1, halo: !1},
            select: {color: "#C0C0C0", borderColor: "#000000", shadow: !1}
        },
        dataLabels: {
            align: null, verticalAlign: null,
            y: null
        },
        stickyTracking: !1,
        tooltip: {distance: 6},
        threshold: 0
    });
    var sb = ba(ha, {
        type: "column",
        pointAttrToOptions: {stroke: "borderColor", fill: "color", r: "borderRadius"},
        cropShoulder: 0,
        trackerGroups: ["group", "dataLabelsGroup"],
        negStacks: !0,
        init: function () {
            ha.prototype.init.apply(this, arguments);
            var a = this, b = a.chart;
            b.hasRendered && A(b.series, function (b) {
                b.type === a.type && (b.isDirty = !0)
            })
        },
        getColumnMetrics: function () {
            var a = this, b = a.options, c = a.xAxis, d = a.yAxis, e = c.reversed, f, g = {}, k, n = 0;
            !1 === b.grouping ? n = 1 : A(a.chart.series,
                function (b) {
                    var c = b.options, e = b.yAxis;
                    b.type === a.type && b.visible && d.len === e.len && d.pos === e.pos && (c.stacking ? (f = b.stackKey, g[f] === F && (g[f] = n++), k = g[f]) : !1 !== c.grouping && (k = n++), b.columnIndex = k)
                });
            var c = Z(X(c.transA) * (c.ordinalSlope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len), m = c * b.groupPadding, v = (c - 2 * m) / n, l = b.pointWidth, b = r(l) ? (v - l) / 2 : v * b.pointPadding, l = h(l, v - 2 * b);
            return a.columnMetrics = {
                width: l,
                offset: b + (m + ((e ? n - (a.columnIndex || 0) : a.columnIndex) || 0) * v - c / 2) * (e ? -1 : 1)
            }
        },
        translate: function () {
            var a =
                this, b = a.chart, c = a.options, d = a.borderWidth = h(c.borderWidth, a.activePointCount > .5 * a.xAxis.len ? 0 : 1), e = a.yAxis, f = a.translatedThreshold = e.getThreshold(c.threshold), g = h(c.minPointLength, 5), k = a.getColumnMetrics(), n = k.width, m = a.barW = K(n, 1 + 2 * d), v = a.pointXOffset = k.offset, l = -(d % 2 ? .5 : 0), p = d % 2 ? .5 : 1;
            b.renderer.isVML && b.inverted && (p += 1);
            c.pointPadding && (m = ua(m));
            ha.prototype.translate.apply(a);
            A(a.points, function (c) {
                var d = h(c.yBottom, f), k = Z(K(-999 - d, c.plotY), e.len + 999 + d), r = c.plotX + v, H = m, z = Z(k, d), t;
                t = K(k, d) - z;
                X(t) <
                g && g && (t = g, z = M(X(z - f) > g ? d - g : f - (e.translate(c.y, 0, 1, 0, 1) <= f ? g : 0)));
                c.barX = r;
                c.pointWidth = n;
                c.tooltipPos = b.inverted ? [e.len - k, a.xAxis.len - r - H / 2] : [r + H / 2, k + e.pos - b.plotTop];
                H = M(r + H) + l;
                r = M(r) + l;
                H -= r;
                d = .5 > X(z);
                t = M(z + t) + p;
                z = M(z) + p;
                t -= z;
                d && (--z, t += 1);
                c.shapeType = "rect";
                c.shapeArgs = {x: r, y: z, width: H, height: t}
            })
        },
        getSymbol: Xa,
        drawLegendSymbol: rb.drawRectangle,
        drawGraph: Xa,
        drawPoints: function () {
            var a = this, b = this.chart, c = a.options, d = b.renderer, e = c.animationLimit || 250, f, g;
            A(a.points, function (k) {
                var n = k.plotY, m =
                    k.graphic;
                n === F || isNaN(n) || null === k.y ? m && (k.graphic = m.destroy()) : (f = k.shapeArgs, n = r(a.borderWidth) ? {"stroke-width": a.borderWidth} : {}, g = k.pointAttr[k.selected ? "select" : ""] || a.pointAttr[""], m ? (Ha(m), m.attr(n)[b.pointCount < e ? "animate" : "attr"](L(f))) : k.graphic = d[k.shapeType](f).attr(g).attr(n).add(a.group).shadow(c.shadow, null, c.stacking && !c.borderRadius))
            })
        },
        animate: function (a) {
            var b = this.yAxis, c = this.options, d = this.chart.inverted, e = {};
            ia && (a ? (e.scaleY = .001, a = Z(b.pos + b.len, K(b.pos, b.toPixels(c.threshold))),
                d ? e.translateX = a - b.len : e.translateY = a, this.group.attr(e)) : (e.scaleY = 1, e[d ? "translateX" : "translateY"] = b.pos, this.group.animate(e, this.options.animation), this.animate = null))
        },
        remove: function () {
            var a = this, b = a.chart;
            b.hasRendered && A(b.series, function (b) {
                b.type === a.type && (b.isDirty = !0)
            });
            ha.prototype.remove.apply(a, arguments)
        }
    });
    fa.column = sb;
    ha.prototype.drawDataLabels = function () {
        var a = this, b = a.options, c = b.cursor, d = b.dataLabels, e = a.points, f, g, k = a.hasRendered || 0, n, v;
        if (d.enabled || a._hasPointLabels)a.dlProcessOptions &&
        a.dlProcessOptions(d), v = a.plotGroup("dataLabelsGroup", "data-labels", d.defer ? "hidden" : "visible", d.zIndex || 6), h(d.defer, !0) && (v.attr({opacity: +k}), k || ca(a, "afterAnimate", function () {
            a.visible && v.show();
            v[b.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
        })), g = d, A(e, function (b) {
            var e, k = b.dataLabel, l, p, z = b.connector, H = !0;
            f = b.options && b.options.dataLabels;
            e = h(f && f.enabled, g.enabled);
            if (k && !e)b.dataLabel = k.destroy(); else if (e) {
                d = L(g, f);
                e = d.rotation;
                l = b.getLabelConfig();
                n = d.format ? m(d.format, l) : d.formatter.call(l,
                    d);
                d.style.color = h(d.color, d.style.color, a.color, "black");
                if (k)r(n) ? (k.attr({text: n}), H = !1) : (b.dataLabel = k = k.destroy(), z && (b.connector = z.destroy())); else if (r(n)) {
                    k = {
                        fill: d.backgroundColor,
                        stroke: d.borderColor,
                        "stroke-width": d.borderWidth,
                        r: d.borderRadius || 0,
                        rotation: e,
                        padding: d.padding,
                        zIndex: 1
                    };
                    for (p in k)k[p] === F && delete k[p];
                    k = b.dataLabel = a.chart.renderer[e ? "text" : "label"](n, 0, -999, null, null, null, d.useHTML).attr(k).css(q(d.style, c && {cursor: c})).add(v).shadow(d.shadow)
                }
                k && a.alignDataLabel(b, k,
                    d, null, H)
            }
        })
    };
    ha.prototype.alignDataLabel = function (a, b, c, d, e) {
        var f = this.chart, g = f.inverted, k = h(a.plotX, -999), n = h(a.plotY, -999), m = b.getBBox();
        if (a = this.visible && (a.series.forceDL || f.isInsidePlot(k, M(n), g) || d && f.isInsidePlot(k, g ? d.x + 1 : d.y + d.height - 1, g)))d = q({
            x: g ? f.plotWidth - n : k,
            y: M(g ? f.plotHeight - k : n),
            width: 0,
            height: 0
        }, d), q(c, {
            width: m.width,
            height: m.height
        }), c.rotation ? b[e ? "attr" : "animate"]({
            x: d.x + c.x + d.width / 2,
            y: d.y + c.y + d.height / 2
        }).attr({align: c.align}) : (b.align(c, null, d), g = b.alignAttr, "justify" ===
        h(c.overflow, "justify") ? this.justifyDataLabel(b, c, g, m, d, e) : h(c.crop, !0) && (a = f.isInsidePlot(g.x, g.y) && f.isInsidePlot(g.x + m.width, g.y + m.height)));
        a || (b.attr({y: -999}), b.placed = !1)
    };
    ha.prototype.justifyDataLabel = function (a, b, c, d, e, f) {
        var g = this.chart, k = b.align, n = b.verticalAlign, m, h;
        m = c.x;
        0 > m && ("right" === k ? b.align = "left" : b.x = -m, h = !0);
        m = c.x + d.width;
        m > g.plotWidth && ("left" === k ? b.align = "right" : b.x = g.plotWidth - m, h = !0);
        m = c.y;
        0 > m && ("bottom" === n ? b.verticalAlign = "top" : b.y = -m, h = !0);
        m = c.y + d.height;
        m > g.plotHeight &&
        ("top" === n ? b.verticalAlign = "bottom" : b.y = g.plotHeight - m, h = !0);
        h && (a.placed = !f, a.align(b, null, e))
    };
    fa.pie && (fa.pie.prototype.drawDataLabels = function () {
        var a = this, b = a.data, c, d = a.chart, e = a.options.dataLabels, f = h(e.connectorPadding, 10), g = h(e.connectorWidth, 1), k = d.plotWidth, n = d.plotHeight, m, v, l = h(e.softConnector, !0), p = e.distance, w = a.center, z = w[2] / 2, H = w[1], r = 0 < p, t, q, J, D = [[], []], y, Q, U, F, C, E = [0, 0, 0, 0], L = function (a, b) {
            return b.y - a.y
        };
        if (a.visible && (e.enabled || a._hasPointLabels)) {
            ha.prototype.drawDataLabels.apply(a);
            A(b, function (a) {
                a.dataLabel && a.visible && D[a.half].push(a)
            });
            for (F = 2; F--;) {
                var P = [], ra = [], S = D[F], I = S.length, V;
                if (I) {
                    a.sortByAngle(S, F - .5);
                    for (C = b = 0; !b && S[C];)b = S[C] && S[C].dataLabel && (S[C].dataLabel.getBBox().height || 21), C++;
                    if (0 < p) {
                        q = Z(H + z + p, d.plotHeight);
                        for (C = K(0, H - z - p); C <= q; C += b)P.push(C);
                        q = P.length;
                        if (I > q) {
                            c = [].concat(S);
                            c.sort(L);
                            for (C = I; C--;)c[C].rank = C;
                            for (C = I; C--;)S[C].rank >= q && S.splice(C, 1);
                            I = S.length
                        }
                        for (C = 0; C < I; C++) {
                            c = S[C];
                            J = c.labelPos;
                            c = 9999;
                            var N, O;
                            for (O = 0; O < q; O++)N = X(P[O] - J[1]), N < c &&
                            (c = N, V = O);
                            if (V < C && null !== P[C])V = C; else for (q < I - C + V && null !== P[C] && (V = q - I + C); null === P[V];)V++;
                            ra.push({i: V, y: P[V]});
                            P[V] = null
                        }
                        ra.sort(L)
                    }
                    for (C = 0; C < I; C++) {
                        c = S[C];
                        J = c.labelPos;
                        t = c.dataLabel;
                        U = !1 === c.visible ? "hidden" : "visible";
                        c = J[1];
                        if (0 < p) {
                            if (q = ra.pop(), V = q.i, Q = q.y, c > Q && null !== P[V + 1] || c < Q && null !== P[V - 1])Q = Z(K(0, c), d.plotHeight)
                        } else Q = c;
                        y = e.justify ? w[0] + (F ? -1 : 1) * (z + p) : a.getX(Q === H - z - p || Q === H + z + p ? c : Q, F);
                        t._attr = {visibility: U, align: J[6]};
                        t._pos = {x: y + e.x + ({left: f, right: -f}[J[6]] || 0), y: Q + e.y - 10};
                        t.connX =
                            y;
                        t.connY = Q;
                        null === this.options.size && (q = t.width, y - q < f ? E[3] = K(M(q - y + f), E[3]) : y + q > k - f && (E[1] = K(M(y + q - k + f), E[1])), 0 > Q - b / 2 ? E[0] = K(M(-Q + b / 2), E[0]) : Q + b / 2 > n && (E[2] = K(M(Q + b / 2 - n), E[2])))
                    }
                }
            }
            if (0 === va(E) || this.verifyDataLabelOverflow(E))this.placeDataLabels(), r && g && A(this.points, function (b) {
                m = b.connector;
                J = b.labelPos;
                (t = b.dataLabel) && t._pos ? (U = t._attr.visibility, y = t.connX, Q = t.connY, v = l ? ["M", y + ("left" === J[6] ? 5 : -5), Q, "C", y, Q, 2 * J[2] - J[4], 2 * J[3] - J[5], J[2], J[3], "L", J[4], J[5]] : ["M", y + ("left" === J[6] ? 5 : -5), Q, "L", J[2],
                    J[3], "L", J[4], J[5]], m ? (m.animate({d: v}), m.attr("visibility", U)) : b.connector = m = a.chart.renderer.path(v).attr({
                    "stroke-width": g,
                    stroke: e.connectorColor || b.color || "#606060",
                    visibility: U
                }).add(a.dataLabelsGroup)) : m && (b.connector = m.destroy())
            })
        }
    }, fa.pie.prototype.placeDataLabels = function () {
        A(this.points, function (a) {
            a = a.dataLabel;
            var b;
            a && ((b = a._pos) ? (a.attr(a._attr), a[a.moved ? "animate" : "attr"](b), a.moved = !0) : a && a.attr({y: -999}))
        })
    }, fa.pie.prototype.alignDataLabel = Xa, fa.pie.prototype.verifyDataLabelOverflow =
        function (a) {
            var b = this.center, c = this.options, d = c.center, e = c = c.minSize || 80, f;
            null !== d[0] ? e = K(b[2] - K(a[1], a[3]), c) : (e = K(b[2] - a[1] - a[3], c), b[0] += (a[3] - a[1]) / 2);
            null !== d[1] ? e = K(Z(e, b[2] - K(a[0], a[2])), c) : (e = K(Z(e, b[2] - a[0] - a[2]), c), b[1] += (a[0] - a[2]) / 2);
            e < b[2] ? (b[2] = e, this.translate(b), A(this.points, function (a) {
                a.dataLabel && (a.dataLabel._pos = null)
            }), this.drawDataLabels && this.drawDataLabels()) : f = !0;
            return f
        });
    fa.column && (fa.column.prototype.alignDataLabel = function (a, b, c, d, e) {
        var f = this.chart, g = f.inverted,
            k = a.dlBox || a.shapeArgs, n = a.below || a.plotY > h(this.translatedThreshold, f.plotSizeY), m = h(c.inside, !!this.options.stacking);
        k && (d = L(k), g && (d = {
            x: f.plotWidth - d.y - d.height,
            y: f.plotHeight - d.x - d.width,
            width: d.height,
            height: d.width
        }), m || (g ? (d.x += n ? 0 : d.width, d.width = 0) : (d.y += n ? d.height : 0, d.height = 0)));
        c.align = h(c.align, !g || m ? "center" : n ? "right" : "left");
        c.verticalAlign = h(c.verticalAlign, g || m ? "middle" : n ? "top" : "bottom");
        ha.prototype.alignDataLabel.call(this, a, b, c, d, e)
    });
    var Ta = ja.TrackerMixin = {
        drawTrackerPoint: function () {
            var a =
                this, b = a.chart, c = b.pointer, d = a.options.cursor, e = d && {cursor: d}, f = function (c) {
                var d = c.target, e;
                if (b.hoverSeries !== a)a.onMouseOver();
                for (; d && !e;)e = d.point, d = d.parentNode;
                if (e !== F && e !== b.hoverPoint)e.onMouseOver(c)
            };
            A(a.points, function (a) {
                a.graphic && (a.graphic.element.point = a);
                a.dataLabel && (a.dataLabel.element.point = a)
            });
            a._hasTracking || (A(a.trackerGroups, function (b) {
                if (a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) {
                        c.onTrackerMouseOut(a)
                    }).css(e), Fa))a[b].on("touchstart",
                    f)
            }), a._hasTracking = !0)
        }, drawTrackerGraph: function () {
            var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath), e = d.length, f = a.chart, g = f.pointer, k = f.renderer, n = f.options.tooltip.snap, m = a.tracker, h = b.cursor, v = h && {cursor: h}, h = a.singlePoints, l, p = function () {
                if (f.hoverSeries !== a)a.onMouseOver()
            }, z = "rgba(192,192,192," + (ia ? 1E-4 : .002) + ")";
            if (e && !c)for (l = e + 1; l--;)"M" === d[l] && d.splice(l + 1, 0, d[l + 1] - n, d[l + 2], "L"), (l && "M" === d[l] || l === e) && d.splice(l, 0, "L", d[l - 2] + n, d[l - 1]);
            for (l = 0; l < h.length; l++)e =
                h[l], d.push("M", e.plotX - n, e.plotY, "L", e.plotX + n, e.plotY);
            m ? m.attr({d: d}) : (a.tracker = k.path(d).attr({
                "stroke-linejoin": "round",
                visibility: a.visible ? "visible" : "hidden",
                stroke: z,
                fill: c ? z : "none",
                "stroke-width": b.lineWidth + (c ? 0 : 2 * n),
                zIndex: 2
            }).add(a.group), A([a.tracker, a.markerGroup], function (a) {
                a.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function (a) {
                    g.onTrackerMouseOut(a)
                }).css(v);
                if (Fa)a.on("touchstart", p)
            }))
        }
    };
    fa.column && (sb.prototype.drawTracker = Ta.drawTrackerPoint);
    fa.pie && (fa.pie.prototype.drawTracker =
        Ta.drawTrackerPoint);
    fa.scatter && (ScatterSeries.prototype.drawTracker = Ta.drawTrackerPoint);
    q(Sa.prototype, {
        setItemEvents: function (a, b, c, d, e) {
            var f = this;
            (c ? b : a.legendGroup).on("mouseover", function () {
                a.setState("hover");
                b.css(f.options.itemHoverStyle)
            }).on("mouseout", function () {
                b.css(a.visible ? d : e);
                a.setState()
            }).on("click", function (b) {
                var c = function () {
                    a.setVisible()
                };
                b = {browserEvent: b};
                a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : W(a, "legendItemClick", b, c)
            })
        }, createCheckboxForItem: function (a) {
            a.checkbox =
                C("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
            ca(a.checkbox, "click", function (b) {
                W(a, "checkboxClick", {checked: b.target.checked}, function () {
                    a.select()
                })
            })
        }
    });
    da.legend.itemStyle.cursor = "pointer";
    q(Na.prototype, {
        showResetZoom: function () {
            var a = this, b = da.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = "chart" === c.relativeTo ? null : "plotBox";
            this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                    a.zoomOut()
                },
                d, e && e.hover).attr({align: c.position.align, title: b.resetZoomTitle}).add().align(c.position, !1, f)
        }, zoomOut: function () {
            var a = this;
            W(a, "selection", {resetSelection: !0}, function () {
                a.zoom()
            })
        }, zoom: function (a) {
            var b, c = this.pointer, d = !1, e;
            !a || a.resetSelection ? A(this.axes, function (a) {
                b = a.zoom()
            }) : A(a.xAxis.concat(a.yAxis), function (a) {
                var e = a.axis, k = e.isXAxis;
                if (c[k ? "zoomX" : "zoomY"] || c[k ? "pinchX" : "pinchY"])b = e.zoom(a.min, a.max), e.displayBtn && (d = !0)
            });
            e = this.resetZoomButton;
            d && !e ? this.showResetZoom() : !d && N(e) &&
            (this.resetZoomButton = e.destroy());
            b && this.redraw(h(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
        }, pan: function (a, b) {
            var c = this, d = c.hoverPoints, e;
            d && A(d, function (a) {
                a.setState()
            });
            A("xy" === b ? [1, 0] : [1], function (b) {
                var d = a[b ? "chartX" : "chartY"], k = c[b ? "xAxis" : "yAxis"][0], n = c[b ? "mouseDownX" : "mouseDownY"], m = (k.pointRange || 0) / 2, h = k.getExtremes(), v = k.toValue(n - d, !0) + m, n = k.toValue(n + c[b ? "plotWidth" : "plotHeight"] - d, !0) - m;
                k.series.length && v > Z(h.dataMin, h.min) && n < K(h.dataMax, h.max) && (k.setExtremes(v,
                    n, !1, !1, {trigger: "pan"}), e = !0);
                c[b ? "mouseDownX" : "mouseDownY"] = d
            });
            e && c.redraw(!1);
            E(c.container, {cursor: "move"})
        }
    });
    q(Ja.prototype, {
        select: function (a, b) {
            var c = this, d = c.series, e = d.chart;
            a = h(a, !c.selected);
            c.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                c.selected = c.options.selected = a;
                d.options.data[Ra(c, d.data)] = c.options;
                c.setState(a && "select");
                b || A(e.getSelectedPoints(), function (a) {
                    a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[Ra(a, d.data)] = a.options, a.setState(""),
                        a.firePointEvent("unselect"))
                })
            })
        }, onMouseOver: function (a) {
            var b = this.series, c = b.chart, d = c.tooltip, e = c.hoverPoint;
            if (e && e !== this)e.onMouseOut();
            this.firePointEvent("mouseOver");
            !d || d.shared && !b.noSharedTooltip || d.refresh(this, a);
            this.setState("hover");
            c.hoverPoint = this
        }, onMouseOut: function () {
            var a = this.series.chart, b = a.hoverPoints;
            this.firePointEvent("mouseOut");
            b && -1 !== Ra(this, b) || (this.setState(), a.hoverPoint = null)
        }, importEvents: function () {
            if (!this.hasImportedEvents) {
                var a = L(this.series.options.point,
                    this.options).events, b;
                this.events = a;
                for (b in a)ca(this, b, a[b]);
                this.hasImportedEvents = !0
            }
        }, setState: function (a, b) {
            var c = this.plotX, d = this.plotY, e = this.series, f = e.options.states, g = Aa[e.type].marker && e.options.marker, k = g && !g.enabled, n = g && g.states[a], m = n && !1 === n.enabled, h = e.stateMarkerGraphic, v = this.marker || {}, l = e.chart, p = e.halo, z;
            a = a || "";
            z = this.pointAttr[a] || e.pointAttr[a];
            if (!(a === this.state && !b || this.selected && "select" !== a || f[a] && !1 === f[a].enabled || a && (m || k && !1 === n.enabled) || a && v.states && v.states[a] &&
                !1 === v.states[a].enabled)) {
                if (this.graphic)g = g && this.graphic.symbolName && z.r, this.graphic.attr(L(z, g ? {
                    x: c - g,
                    y: d - g,
                    width: 2 * g,
                    height: 2 * g
                } : {})), h && h.hide(); else {
                    if (a && n)if (g = n.radius, v = v.symbol || e.symbol, h && h.currentSymbol !== v && (h = h.destroy()), h)h[b ? "animate" : "attr"]({
                        x: c - g,
                        y: d - g
                    }); else v && (e.stateMarkerGraphic = h = l.renderer.symbol(v, c - g, d - g, 2 * g, 2 * g).attr(z).add(e.markerGroup), h.currentSymbol = v);
                    if (h)h[a && l.isInsidePlot(c, d, l.inverted) ? "show" : "hide"]()
                }
                (c = f[a] && f[a].halo) && c.size ? (p || (e.halo = p = l.renderer.path().add(e.seriesGroup)),
                    p.attr(q({fill: Ba(this.color || e.color).setOpacity(c.opacity).get()}, c.attributes))[b ? "animate" : "attr"]({d: this.haloPath(c.size)})) : p && p.attr({d: []});
                this.state = a
            }
        }, haloPath: function (a) {
            var b = this.series, c = b.chart, d = b.getPlotBox(), e = c.inverted;
            return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : this.plotX) - a, d.translateY + (e ? b.xAxis.len - this.plotX : this.plotY) - a, 2 * a, 2 * a)
        }
    });
    q(ha.prototype, {
        onMouseOver: function () {
            var a = this.chart, b = a.hoverSeries;
            if (b && b !== this)b.onMouseOut();
            this.options.events.mouseOver &&
            W(this, "mouseOver");
            this.setState("hover");
            a.hoverSeries = this
        }, onMouseOut: function () {
            var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
            if (d)d.onMouseOut();
            this && a.events.mouseOut && W(this, "mouseOut");
            !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
            this.setState();
            b.hoverSeries = null
        }, setState: function (a) {
            var b = this.options, c = this.graph, d = this.graphNeg, e = b.states, b = b.lineWidth;
            a = a || "";
            this.state !== a && (this.state = a, e[a] && !1 === e[a].enabled || (a && (b = e[a].lineWidth || b + (e[a].lineWidthPlus ||
            0)), c && !c.dashstyle && (a = {"stroke-width": b}, c.attr(a), d && d.attr(a))))
        }, setVisible: function (a, b) {
            var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, k = c.visible;
            f = (c.visible = a = c.userOptions.visible = a === F ? !k : a) ? "show" : "hide";
            A(["group", "dataLabelsGroup", "markerGroup", "tracker"], function (a) {
                if (c[a])c[a][f]()
            });
            if (d.hoverSeries === c)c.onMouseOut();
            e && d.legend.colorizeItem(c, a);
            c.isDirty = !0;
            c.options.stacking && A(d.series, function (a) {
                a.options.stacking && a.visible && (a.isDirty = !0)
            });
            A(c.linkedSeries, function (b) {
                b.setVisible(a, !1)
            });
            g && (d.isDirtyBox = !0);
            !1 !== b && d.redraw();
            W(c, f)
        }, setTooltipPoints: function (a) {
            var b = [], c, d, e = this.xAxis, f = e && e.getExtremes(), g = e ? e.tooltipLen || e.len : this.chart.plotSizeX, k, n, m = [];
            if (!1 !== this.options.enableMouseTracking && !this.singularTooltips) {
                a && (this.tooltipPoints = null);
                A(this.segments || this.points, function (a) {
                    b = b.concat(a)
                });
                e && e.reversed && (b = b.reverse());
                this.orderTooltipPoints && this.orderTooltipPoints(b);
                a = b.length;
                for (n = 0; n < a; n++)if (e = b[n], c =
                        e.x, c >= f.min && c <= f.max)for (k = b[n + 1], c = d === F ? 0 : d + 1, d = b[n + 1] ? Z(K(0, la((e.clientX + (k ? k.wrappedClientX || k.clientX : g)) / 2)), g) : g; 0 <= c && c <= d;)m[c++] = e;
                this.tooltipPoints = m
            }
        }, show: function () {
            this.setVisible(!0)
        }, hide: function () {
            this.setVisible(!1)
        }, select: function (a) {
            this.selected = a = a === F ? !this.selected : a;
            this.checkbox && (this.checkbox.checked = a);
            W(this, a ? "select" : "unselect")
        }, drawTracker: Ta.drawTrackerGraph
    });
    q(ja, {
        Axis: xa,
        Chart: Na,
        Color: Ba,
        Point: Ja,
        Tick: wa,
        Renderer: Ca,
        Series: ha,
        SVGElement: S,
        SVGRenderer: Ca,
        arrayMin: Q,
        arrayMax: va,
        charts: ka,
        dateFormat: Ka,
        format: m,
        pathAnim: Wa,
        getOptions: function () {
            return da
        },
        hasBidiBug: tb,
        isTouchDevice: lb,
        numberFormat: P,
        seriesTypes: fa,
        setOptions: function (a) {
            da = L(!0, da, a);
            $a();
            return da
        },
        addEvent: ca,
        removeEvent: ga,
        createElement: C,
        discardElement: U,
        css: E,
        each: A,
        extend: q,
        map: Ya,
        merge: L,
        pick: h,
        splat: t,
        extendClass: ba,
        pInt: I,
        wrap: v,
        svg: ia,
        canvas: oa,
        vml: !ia && !oa,
        product: "Highcharts 4.0.4",
        version: "/Highstock 2.0.4"
    })
})();
(function (q) {
    var L = q.Chart, I = q.addEvent, aa = q.removeEvent, N = HighchartsAdapter.fireEvent, R = q.createElement, T = q.discardElement, l = q.css, p = q.merge, D = q.each, r = q.extend, y = q.splat, t = Math.max, h = document, E = window, C = q.isTouchDevice, ba = q.Renderer.prototype.symbols, P = q.getOptions(), J;
    r(P.lang, {
        printChart: "Print chart",
        downloadPNG: "Download PNG image",
        downloadJPEG: "Download JPEG image",
        downloadPDF: "Download PDF document",
        downloadSVG: "Download SVG vector image",
        contextButtonTitle: "Chart context menu"
    });
    P.navigation =
    {
        menuStyle: {border: "1px solid #A0A0A0", background: "#FFFFFF", padding: "5px 0"},
        menuItemStyle: {padding: "0 10px", background: "none", color: "#303030", fontSize: C ? "14px" : "11px"},
        menuItemHoverStyle: {background: "#4572A5", color: "#FFFFFF"},
        buttonOptions: {
            symbolFill: "#E0E0E0",
            symbolSize: 14,
            symbolStroke: "#666",
            symbolStrokeWidth: 3,
            symbolX: 12.5,
            symbolY: 10.5,
            align: "right",
            buttonSpacing: 3,
            height: 22,
            theme: {fill: "white", stroke: "none"},
            verticalAlign: "top",
            width: 24
        }
    };
    P.exporting = {
        type: "image/png", url: "http://export.highcharts.com/",
        buttons: {
            contextButton: {
                menuClassName: "highcharts-contextmenu",
                symbol: "menu",
                _titleKey: "contextButtonTitle",
                menuItems: [{
                    textKey: "printChart", onclick: function () {
                        this.print()
                    }
                }, {separator: !0}, {
                    textKey: "downloadPNG", onclick: function () {
                        this.exportChart()
                    }
                }, {
                    textKey: "downloadJPEG", onclick: function () {
                        this.exportChart({type: "image/jpeg"})
                    }
                }, {
                    textKey: "downloadPDF", onclick: function () {
                        this.exportChart({type: "application/pdf"})
                    }
                }, {
                    textKey: "downloadSVG", onclick: function () {
                        this.exportChart({type: "image/svg+xml"})
                    }
                }]
            }
        }
    };
    q.post = function (v, m, l) {
        var z;
        v = R("form", p({method: "post", action: v, enctype: "multipart/form-data"}, l), {display: "none"}, h.body);
        for (z in m)R("input", {type: "hidden", name: z, value: m[z]}, null, v);
        v.submit();
        T(v)
    };
    r(L.prototype, {
        sanitizeSVG: function (h) {
            return h.replace(/zIndex="[^"]+"/g, "").replace(/isShadow="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g,
                " xlink:href=").replace(/\n/, " ").replace(/<\/svg>.*?$/, "</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/(text-shadow:)([^;"]+)([;"])/g, function (m, h, v, l) {
                    v = v.replace(/\([^\)]+\)/g, function (m) {
                        return m.replace(/,/g, "|")
                    });
                    v = v.split(",")[0];
                    v = v.replace(/\([^\)]+\)/g, function (m) {
                        return m.replace(/\|/g, ",")
                    });
                    return h + v + l
                }).replace(/&nbsp;/g, "\u00a0").replace(/&shy;/g, "\u00ad").replace(/<IMG /g, "<image ").replace(/height=([^" ]+)/g,
                'height="$1"').replace(/width=([^" ]+)/g, 'width="$1"').replace(/hc-svg-href="([^"]+)">/g, 'xlink:href="$1"/>').replace(/id=([^" >]+)/g, 'id="$1"').replace(/class=([^" >]+)/g, 'class="$1"').replace(/ transform /g, " ").replace(/:(path|rect)/g, "$1").replace(/style="([^"]+)"/g, function (m) {
                    return m.toLowerCase()
                })
        }, getSVG: function (v) {
            var m = this, l, z, t, J, C, U = p(m.options, v);
            h.createElementNS || (h.createElementNS = function (m, v) {
                return h.createElement(v)
            });
            z = R("div", null, {
                position: "absolute", top: "-9999em", width: m.chartWidth +
                "px", height: m.chartHeight + "px"
            }, h.body);
            t = m.renderTo.style.width;
            C = m.renderTo.style.height;
            t = U.exporting.sourceWidth || U.chart.width || /px$/.test(t) && parseInt(t, 10) || 600;
            C = U.exporting.sourceHeight || U.chart.height || /px$/.test(C) && parseInt(C, 10) || 400;
            r(U.chart, {animation: !1, renderTo: z, forExport: !0, width: t, height: C});
            U.exporting.enabled = !1;
            delete U.data;
            U.series = [];
            D(m.series, function (m) {
                J = p(m.options, {animation: !1, enableMouseTracking: !1, showCheckbox: !1, visible: m.visible});
                J.isInternal || U.series.push(J)
            });
            v && D(["xAxis", "yAxis"], function (m) {
                D(y(v[m]), function (h, v) {
                    U[m][v] = p(U[m][v], h)
                })
            });
            l = new q.Chart(U, m.callback);
            D(["xAxis", "yAxis"], function (h) {
                D(m[h], function (m, v) {
                    var p = l[h][v], z = m.getExtremes(), r = z.userMin, z = z.userMax;
                    !p || void 0 === r && void 0 === z || p.setExtremes(r, z, !0, !1)
                })
            });
            t = l.container.innerHTML;
            U = null;
            l.destroy();
            T(z);
            t = this.sanitizeSVG(t);
            return t = t.replace(/(url\(#highcharts-[0-9]+)&quot;/g, "$1").replace(/&quot;/g, "'")
        }, getSVGForExport: function (h, m) {
            var l = this.options.exporting;
            return this.getSVG(p({chart: {borderRadius: 0}},
                l.chartOptions, m, {
                    exporting: {
                        sourceWidth: h && h.sourceWidth || l.sourceWidth,
                        sourceHeight: h && h.sourceHeight || l.sourceHeight
                    }
                }))
        }, exportChart: function (h, m) {
            var l = this.getSVGForExport(h, m);
            h = p(this.options.exporting, h);
            q.post(h.url, {
                filename: h.filename || "chart",
                type: h.type,
                width: h.width || 0,
                scale: h.scale || 2,
                svg: l
            }, h.formAttributes)
        }, print: function () {
            var v = this, m = v.container, l = [], p = m.parentNode, r = h.body, t = r.childNodes;
            v.isPrinting || (v.isPrinting = !0, N(v, "beforePrint"), D(t, function (m, h) {
                1 === m.nodeType && (l[h] =
                    m.style.display, m.style.display = "none")
            }), r.appendChild(m), E.focus(), E.print(), setTimeout(function () {
                p.appendChild(m);
                D(t, function (m, h) {
                    1 === m.nodeType && (m.style.display = l[h])
                });
                v.isPrinting = !1;
                N(v, "afterPrint")
            }, 1E3))
        }, contextMenu: function (h, m, p, z, J, q, y) {
            var C = this, E = C.options.navigation, P = E.menuItemStyle, S = C.chartWidth, L = C.chartHeight, N = "cache-" + h, ba = C[N], T = t(J, q), F, O, Y, ea = function (m) {
                C.pointer.inClass(m.target, h) || O()
            };
            ba || (C[N] = ba = R("div", {className: h}, {
                position: "absolute", zIndex: 1E3, padding: T +
                "px"
            }, C.container), F = R("div", null, r({
                MozBoxShadow: "3px 3px 10px #888",
                WebkitBoxShadow: "3px 3px 10px #888",
                boxShadow: "3px 3px 10px #888"
            }, E.menuStyle), ba), O = function () {
                l(ba, {display: "none"});
                y && y.setState(0);
                C.openMenu = !1
            }, I(ba, "mouseleave", function () {
                Y = setTimeout(O, 500)
            }), I(ba, "mouseenter", function () {
                clearTimeout(Y)
            }), I(document, "mouseup", ea), I(C, "destroy", function () {
                aa(document, "mouseup", ea)
            }), D(m, function (m) {
                if (m) {
                    var h = m.separator ? R("hr", null, null, F) : R("div", {
                        onmouseover: function () {
                            l(this, E.menuItemHoverStyle)
                        },
                        onmouseout: function () {
                            l(this, P)
                        }, onclick: function () {
                            O();
                            m.onclick && m.onclick.apply(C, arguments)
                        }, innerHTML: m.text || C.options.lang[m.textKey]
                    }, r({cursor: "pointer"}, P), F);
                    C.exportDivElements.push(h)
                }
            }), C.exportDivElements.push(F, ba), C.exportMenuWidth = ba.offsetWidth, C.exportMenuHeight = ba.offsetHeight);
            m = {display: "block"};
            p + C.exportMenuWidth > S ? m.right = S - p - J - T + "px" : m.left = p - T + "px";
            z + q + C.exportMenuHeight > L && "top" !== y.alignOptions.verticalAlign ? m.bottom = L - z - T + "px" : m.top = z + q - T + "px";
            l(ba, m);
            C.openMenu = !0
        },
        addButton: function (h) {
            var m = this, l = m.renderer, z = p(m.options.navigation.buttonOptions, h), t = z.onclick, y = z.menuItems, C, D, E = {
                stroke: z.symbolStroke,
                fill: z.symbolFill
            }, P = z.symbolSize || 12;
            m.btnCount || (m.btnCount = 0);
            m.exportDivElements || (m.exportDivElements = [], m.exportSVGElements = []);
            if (!1 !== z.enabled) {
                var L = z.theme, I = L.states, ba = I && I.hover, I = I && I.select, N;
                delete L.states;
                t ? N = function () {
                    t.apply(m, arguments)
                } : y && (N = function () {
                    m.contextMenu(D.menuClassName, y, D.translateX, D.translateY, D.width, D.height, D);
                    D.setState(2)
                });
                z.text && z.symbol ? L.paddingLeft = q.pick(L.paddingLeft, 25) : z.text || r(L, {
                    width: z.width,
                    height: z.height,
                    padding: 0
                });
                D = l.button(z.text, 0, 0, N, L, ba, I).attr({
                    title: m.options.lang[z._titleKey],
                    "stroke-linecap": "round"
                });
                D.menuClassName = h.menuClassName || "highcharts-menu-" + m.btnCount++;
                z.symbol && (C = l.symbol(z.symbol, z.symbolX - P / 2, z.symbolY - P / 2, P, P).attr(r(E, {
                    "stroke-width": z.symbolStrokeWidth || 1,
                    zIndex: 1
                })).add(D));
                D.add().align(r(z, {width: D.width, x: q.pick(z.x, J)}), !0, "spacingBox");
                J += (D.width + z.buttonSpacing) *
                ("right" === z.align ? -1 : 1);
                m.exportSVGElements.push(D, C)
            }
        }, destroyExport: function (h) {
            h = h.target;
            var m, l;
            for (m = 0; m < h.exportSVGElements.length; m++)if (l = h.exportSVGElements[m])l.onclick = l.ontouchstart = null, h.exportSVGElements[m] = l.destroy();
            for (m = 0; m < h.exportDivElements.length; m++)l = h.exportDivElements[m], aa(l, "mouseleave"), h.exportDivElements[m] = l.onmouseout = l.onmouseover = l.ontouchstart = l.onclick = null, T(l)
        }
    });
    ba.menu = function (h, m, l, p) {
        return ["M", h, m + 2.5, "L", h + l, m + 2.5, "M", h, m + p / 2 + .5, "L", h + l, m + p / 2 + .5, "M",
            h, m + p - 1.5, "L", h + l, m + p - 1.5]
    };
    L.prototype.callbacks.push(function (h) {
        var m, l = h.options.exporting, p = l.buttons;
        J = 0;
        if (!1 !== l.enabled) {
            for (m in p)h.addButton(p[m]);
            I(h, "destroy", h.destroyExport)
        }
    })
})(Highcharts);
(function (q) {
    var L = q.each, I = q.pick, aa = HighchartsAdapter.inArray, N = q.splat, R, T = function (l, p) {
        this.init(l, p)
    };
    q.extend(T.prototype, {
        init: function (l, p) {
            this.options = l;
            this.chartOptions = p;
            this.columns = l.columns || this.rowsToColumns(l.rows) || [];
            this.firstRowAsNames = I(l.firstRowAsNames, !0);
            this.decimalRegex = l.decimalPoint && new RegExp("^([0-9]+)" + l.decimalPoint + "([0-9]+)$");
            this.rawColumns = [];
            this.columns.length ? this.dataFound() : (this.parseCSV(), this.parseTable(), this.parseGoogleSpreadsheet())
        }, getColumnDistribution: function () {
            var l =
                this.chartOptions, p = this.options, D = [], r = function (h) {
                return (q.seriesTypes[h || "line"].prototype.pointArrayMap || [0]).length
            }, y = l && l.chart && l.chart.type, t = [], h = [], E = 0, C;
            L(l && l.series || [], function (h) {
                t.push(r(h.type || y))
            });
            L(p && p.seriesMapping || [], function (h) {
                D.push(h.x || 0)
            });
            0 === D.length && D.push(0);
            L(p && p.seriesMapping || [], function (p) {
                var D = new R, J, v = t[E] || r(y), m = q.seriesTypes[((l && l.series || [])[E] || {}).type || y || "line"].prototype.pointArrayMap || ["y"];
                D.addColumnReader(p.x, "x");
                for (J in p)p.hasOwnProperty(J) &&
                "x" !== J && D.addColumnReader(p[J], J);
                for (C = 0; C < v; C++)D.hasReader(m[C]) || D.addColumnReader(void 0, m[C]);
                h.push(D);
                E++
            });
            p = q.seriesTypes[y || "line"].prototype.pointArrayMap;
            void 0 === p && (p = ["y"]);
            this.valueCount = {global: r(y), xColumns: D, individual: t, seriesBuilders: h, globalPointArrayMap: p}
        }, dataFound: function () {
            this.options.switchRowsAndColumns && (this.columns = this.rowsToColumns(this.columns));
            this.getColumnDistribution();
            this.parseTypes();
            !1 !== this.parsed() && this.complete()
        }, parseCSV: function () {
            var l = this,
                p = this.options, q = p.csv, r = this.columns, y = p.startRow || 0, t = p.endRow || Number.MAX_VALUE, h = p.startColumn || 0, E = p.endColumn || Number.MAX_VALUE, C, I, P = 0;
            q && (I = q.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split(p.lineDelimiter || "\n"), C = p.itemDelimiter || (-1 !== q.indexOf("\t") ? "\t" : ","), L(I, function (p, v) {
                var m = l.trim(p), q = 0 === m.indexOf("#");
                v >= y && v <= t && !q && "" !== m && (m = p.split(C), L(m, function (m, l) {
                    l >= h && l <= E && (r[l - h] || (r[l - h] = []), r[l - h][P] = m)
                }), P += 1)
            }), this.dataFound())
        }, parseTable: function () {
            var l = this.options, p =
                l.table, q = this.columns, r = l.startRow || 0, y = l.endRow || Number.MAX_VALUE, t = l.startColumn || 0, h = l.endColumn || Number.MAX_VALUE;
            p && ("string" === typeof p && (p = document.getElementById(p)), L(p.getElementsByTagName("tr"), function (l, p) {
                p >= r && p <= y && L(l.children, function (l, y) {
                    ("TD" === l.tagName || "TH" === l.tagName) && y >= t && y <= h && (q[y - t] || (q[y - t] = []), q[y - t][p - r] = l.innerHTML)
                })
            }), this.dataFound())
        }, parseGoogleSpreadsheet: function () {
            var l = this, p = this.options, q = p.googleSpreadsheetKey, r = this.columns, y = p.startRow || 0, t = p.endRow ||
                Number.MAX_VALUE, h = p.startColumn || 0, E = p.endColumn || Number.MAX_VALUE, C, I;
            q && jQuery.ajax({
                dataType: "json",
                url: "https://spreadsheets.google.com/feeds/cells/" + q + "/" + (p.googleSpreadsheetWorksheet || "od6") + "/public/values?alt=json-in-script&callback=?",
                error: p.error,
                success: function (p) {
                    p = p.feed.entry;
                    var q, v = p.length, m = 0, H = 0, z;
                    for (z = 0; z < v; z++)q = p[z], m = Math.max(m, q.gs$cell.col), H = Math.max(H, q.gs$cell.row);
                    for (z = 0; z < m; z++)z >= h && z <= E && (r[z - h] = [], r[z - h].length = Math.min(H, t - y));
                    for (z = 0; z < v; z++)q = p[z], C = q.gs$cell.row -
                    1, I = q.gs$cell.col - 1, I >= h && I <= E && C >= y && C <= t && (r[I - h][C - y] = q.content.$t);
                    l.dataFound()
                }
            })
        }, trim: function (l, p) {
            "string" === typeof l && (l = l.replace(/^\s+|\s+$/g, ""), p && /^[0-9\s]+$/.test(l) && (l = l.replace(/\s/g, "")), this.decimalRegex && (l = l.replace(this.decimalRegex, "$1.$2")));
            return l
        }, parseTypes: function () {
            for (var l = this.columns, p = l.length; p--;)this.parseColumn(l[p], p)
        }, parseColumn: function (l, p) {
            var q = this.rawColumns, r = this.columns, y = l.length, t, h, E, C, I = this.firstRowAsNames, L = -1 !== aa(p, this.valueCount.xColumns),
                J = [], v = this.chartOptions, m, H = (this.options.columnTypes || [])[p], v = L && (v && v.xAxis && "category" === N(v.xAxis)[0].type || "string" === H);
            for (q[p] || (q[p] = []); y--;)t = J[y] || l[y], E = this.trim(t), C = this.trim(t, !0), h = parseFloat(C), void 0 === q[p][y] && (q[p][y] = E), v || 0 === y && I ? l[y] = E : +C === h ? (l[y] = h, 31536E6 < h && "float" !== H ? l.isDatetime = !0 : l.isNumeric = !0, void 0 !== l[y + 1] && (m = h > l[y + 1])) : (h = this.parseDate(t), L && "number" === typeof h && !isNaN(h) && "float" !== H ? (J[y] = t, l[y] = h, l.isDatetime = !0, void 0 !== l[y + 1] && (t = h > l[y + 1], t !== m && void 0 !==
            m && (this.alternativeFormat ? (this.dateFormat = this.alternativeFormat, y = l.length, this.alternativeFormat = this.dateFormats[this.dateFormat].alternative) : l.unsorted = !0), m = t)) : (l[y] = "" === E ? null : E, 0 !== y && (l.isDatetime || l.isNumeric) && (l.mixed = !0)));
            L && l.mixed && (r[p] = q[p]);
            if (L && m && this.options.sort)for (p = 0; p < r.length; p++)r[p].reverse(), I && r[p].unshift(r[p].pop())
        }, dateFormats: {
            "YYYY-mm-dd": {
                regex: /^([0-9]{4})[\-\/\.]([0-9]{2})[\-\/\.]([0-9]{2})$/, parser: function (l) {
                    return Date.UTC(+l[1], l[2] - 1, +l[3])
                }
            }, "dd/mm/YYYY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
                parser: function (l) {
                    return Date.UTC(+l[3], l[2] - 1, +l[1])
                }, alternative: "mm/dd/YYYY"
            }, "mm/dd/YYYY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/, parser: function (l) {
                    return Date.UTC(+l[3], l[1] - 1, +l[2])
                }
            }, "dd/mm/YY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/, parser: function (l) {
                    return Date.UTC(+l[3] + 2E3, l[2] - 1, +l[1])
                }, alternative: "mm/dd/YY"
            }, "mm/dd/YY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/, parser: function (l) {
                    return Date.UTC(+l[3] + 2E3, l[1] - 1, +l[2])
                }
            }
        },
        parseDate: function (l) {
            var p = this.options.parseDate, q, r, y = this.options.dateFormat || this.dateFormat, t;
            p && (q = p(l));
            if ("string" === typeof l) {
                if (y)p = this.dateFormats[y], (t = l.match(p.regex)) && (q = p.parser(t)); else for (r in this.dateFormats)if (p = this.dateFormats[r], t = l.match(p.regex)) {
                    this.dateFormat = r;
                    this.alternativeFormat = p.alternative;
                    q = p.parser(t);
                    break
                }
                t || (t = Date.parse(l), "object" === typeof t && null !== t && t.getTime ? q = t.getTime() - 6E4 * t.getTimezoneOffset() : "number" !== typeof t || isNaN(t) || (q = t - 6E4 * (new Date(t)).getTimezoneOffset()))
            }
            return q
        },
        rowsToColumns: function (l) {
            var p, q, r, y, t;
            if (l)for (t = [], q = l.length, p = 0; p < q; p++)for (y = l[p].length, r = 0; r < y; r++)t[r] || (t[r] = []), t[r][p] = l[p][r];
            return t
        }, parsed: function () {
            if (this.options.parsed)return this.options.parsed.call(this, this.columns)
        }, getFreeIndexes: function (l, p) {
            var q, r, y = [], t = [], h;
            for (r = 0; r < l; r += 1)y.push(!0);
            for (q = 0; q < p.length; q += 1)for (h = p[q].getReferencedColumnIndexes(), r = 0; r < h.length; r += 1)y[h[r]] = !1;
            for (r = 0; r < y.length; r += 1)y[r] && t.push(r);
            return t
        }, complete: function () {
            var l = this.columns,
                p, q = this.options, r, y, t, h, E = [], C;
            if (q.complete || q.afterComplete) {
                for (t = 0; t < l.length; t++)this.firstRowAsNames && (l[t].name = l[t].shift());
                r = [];
                y = this.getFreeIndexes(l.length, this.valueCount.seriesBuilders);
                for (t = 0; t < this.valueCount.seriesBuilders.length; t++)C = this.valueCount.seriesBuilders[t], C.populateColumns(y) && E.push(C);
                for (; 0 < y.length;) {
                    C = new R;
                    C.addColumnReader(0, "x");
                    t = aa(0, y);
                    -1 !== t && y.splice(t, 1);
                    for (t = 0; t < this.valueCount.global; t++)C.addColumnReader(void 0, this.valueCount.globalPointArrayMap[t]);
                    C.populateColumns(y) && E.push(C)
                }
                0 < E.length && 0 < E[0].readers.length && (C = l[E[0].readers[0].columnIndex], void 0 !== C && (C.isDatetime ? p = "datetime" : C.isNumeric || (p = "category")));
                if ("category" === p)for (t = 0; t < E.length; t++)for (C = E[t], y = 0; y < C.readers.length; y++)"x" === C.readers[y].configName && (C.readers[y].configName = "name");
                for (t = 0; t < E.length; t++) {
                    C = E[t];
                    y = [];
                    for (h = 0; h < l[0].length; h++)y[h] = C.read(l, h);
                    r[t] = {data: y};
                    C.name && (r[t].name = C.name);
                    "category" === p && (r[t].turboThreshold = 0)
                }
                l = {series: r};
                p && (l.xAxis = {type: p});
                q.complete && q.complete(l);
                q.afterComplete && q.afterComplete(l)
            }
        }
    });
    q.Data = T;
    q.data = function (l, p) {
        return new T(l, p)
    };
    q.wrap(q.Chart.prototype, "init", function (l, p, D) {
        var r = this;
        p && p.data ? q.data(q.extend(p.data, {
            afterComplete: function (y) {
                var t, h;
                if (p.hasOwnProperty("series"))if ("object" === typeof p.series)for (t = Math.max(p.series.length, y.series.length); t--;)h = p.series[t] || {}, p.series[t] = q.merge(h, y.series[t]); else delete p.series;
                p = q.merge(y, p);
                l.call(r, p, D)
            }
        }), p) : l.call(r, p, D)
    });
    R = function () {
        this.readers =
            [];
        this.pointIsArray = !0
    };
    R.prototype.populateColumns = function (l) {
        var p = !0;
        L(this.readers, function (p) {
            void 0 === p.columnIndex && (p.columnIndex = l.shift())
        });
        L(this.readers, function (l) {
            void 0 === l.columnIndex && (p = !1)
        });
        return p
    };
    R.prototype.read = function (l, p) {
        var q = this.pointIsArray, r = q ? [] : {}, y;
        L(this.readers, function (t) {
            var h = l[t.columnIndex][p];
            q ? r.push(h) : r[t.configName] = h
        });
        void 0 === this.name && 2 <= this.readers.length && (y = this.getReferencedColumnIndexes(), 2 <= y.length && (y.shift(), y.sort(), this.name = l[y.shift()].name));
        return r
    };
    R.prototype.addColumnReader = function (l, p) {
        this.readers.push({columnIndex: l, configName: p});
        "x" !== p && "y" !== p && void 0 !== p && (this.pointIsArray = !1)
    };
    R.prototype.getReferencedColumnIndexes = function () {
        var l, p = [], q;
        for (l = 0; l < this.readers.length; l += 1)q = this.readers[l], void 0 !== q.columnIndex && p.push(q.columnIndex);
        return p
    };
    R.prototype.hasReader = function (l) {
        var p, q;
        for (p = 0; p < this.readers.length; p += 1)if (q = this.readers[p], q.configName === l)return !0
    }
})(Highcharts);
(function (q) {
    function L() {
        return !!this.points.length
    }

    function I() {
        this.hasData() ? this.hideNoData() : this.showNoData()
    }

    var aa = q.seriesTypes, N = q.Chart.prototype, R = q.getOptions(), T = q.extend, l = q.each;
    T(R.lang, {noData: "No data to display"});
    R.noData = {
        position: {x: 0, y: 0, align: "center", verticalAlign: "middle"},
        attr: {},
        style: {fontWeight: "bold", fontSize: "12px", color: "#60606a"}
    };
    l(["pie", "gauge", "waterfall", "bubble"], function (l) {
        aa[l] && (aa[l].prototype.hasData = L)
    });
    q.Series.prototype.hasData = function () {
        return this.visible &&
            void 0 !== this.dataMax && void 0 !== this.dataMin
    };
    N.showNoData = function (l) {
        var q = this.options;
        l = l || q.lang.noData;
        q = q.noData;
        this.noDataLabel || (this.noDataLabel = this.renderer.label(l, 0, 0, null, null, null, null, null, "no-data").attr(q.attr).css(q.style).add(), this.noDataLabel.align(T(this.noDataLabel.getBBox(), q.position), !1, "plotBox"))
    };
    N.hideNoData = function () {
        this.noDataLabel && (this.noDataLabel = this.noDataLabel.destroy())
    };
    N.hasData = function () {
        for (var l = this.series, q = l.length; q--;)if (l[q].hasData() && !l[q].options.isInternal)return !0;
        return !1
    };
    N.callbacks.push(function (l) {
        q.addEvent(l, "load", I);
        q.addEvent(l, "redraw", I)
    })
})(Highcharts);
(function (q) {
    function L(h, l, m) {
        var p;
        h = h.rgba;
        l = l.rgba;
        p = 1 !== l[3] || 1 !== h[3];
        l.length && h.length || Highcharts.error(23);
        return (p ? "rgba(" : "rgb(") + Math.round(l[0] + (h[0] - l[0]) * (1 - m)) + "," + Math.round(l[1] + (h[1] - l[1]) * (1 - m)) + "," + Math.round(l[2] + (h[2] - l[2]) * (1 - m)) + (p ? "," + (l[3] + (h[3] - l[3]) * (1 - m)) : "") + ")"
    }

    var I = function () {
    }, aa = q.getOptions(), N = q.each, R = q.extend, T = q.format, l = q.pick, p = q.wrap, D = q.Chart, r = q.seriesTypes, y = r.pie, t = r.column, h = HighchartsAdapter.fireEvent, E = HighchartsAdapter.inArray, C = [], ba = 1;
    N(["fill",
        "stroke"], function (h) {
        HighchartsAdapter.addAnimSetter(h, function (l) {
            l.elem.attr(h, L(q.Color(l.start), q.Color(l.end), l.pos))
        })
    });
    R(aa.lang, {drillUpText: "\u25c1 Back to {series.name}"});
    aa.drilldown = {
        activeAxisLabelStyle: {
            cursor: "pointer",
            color: "#0d233a",
            fontWeight: "bold",
            textDecoration: "underline"
        },
        activeDataLabelStyle: {cursor: "pointer", color: "#0d233a", fontWeight: "bold", textDecoration: "underline"},
        animation: {duration: 500},
        drillUpButton: {position: {align: "right", x: -10, y: 10}}
    };
    q.SVGRenderer.prototype.Element.prototype.fadeIn =
        function (h) {
            this.attr({
                opacity: .1,
                visibility: "inherit"
            }).animate({opacity: l(this.newOpacity, 1)}, h || {duration: 250})
        };
    D.prototype.addSeriesAsDrilldown = function (h, l) {
        this.addSingleSeriesAsDrilldown(h, l);
        this.applyDrilldown()
    };
    D.prototype.addSingleSeriesAsDrilldown = function (h, l) {
        var m = h.series, p = m.xAxis, q = m.yAxis, r;
        r = h.color || m.color;
        var t, y = [], C = [], D;
        D = m.options._levelNumber || 0;
        l = R({color: r, _ddSeriesId: ba++}, l);
        t = E(h, m.points);
        N(m.chart.series, function (h) {
            h.xAxis === p && (y.push(h), h.options._ddSeriesId =
                h.options._ddSeriesId || ba++, h.options._colorIndex = h.userOptions._colorIndex, C.push(h.options), h.options._levelNumber = h.options._levelNumber || D)
        });
        r = {
            levelNumber: D,
            seriesOptions: m.options,
            levelSeriesOptions: C,
            levelSeries: y,
            shapeArgs: h.shapeArgs,
            bBox: h.graphic ? h.graphic.getBBox() : {},
            color: r,
            lowerSeriesOptions: l,
            pointOptions: m.options.data[t],
            pointIndex: t,
            oldExtremes: {xMin: p && p.userMin, xMax: p && p.userMax, yMin: q && q.userMin, yMax: q && q.userMax}
        };
        this.drilldownLevels || (this.drilldownLevels = []);
        this.drilldownLevels.push(r);
        r = r.lowerSeries = this.addSeries(l, !1);
        r.options._levelNumber = D + 1;
        p && (p.oldPos = p.pos, p.userMin = p.userMax = null, q.userMin = q.userMax = null);
        m.type === r.type && (r.animate = r.animateDrilldown || I, r.options.animation = !0)
    };
    D.prototype.applyDrilldown = function () {
        var h = this.drilldownLevels, l;
        h && 0 < h.length && (l = h[h.length - 1].levelNumber, N(this.drilldownLevels, function (h) {
            h.levelNumber === l && N(h.levelSeries, function (h) {
                h.options && h.options._levelNumber === l && h.remove(!1)
            })
        }));
        this.redraw();
        this.showDrillUpButton()
    };
    D.prototype.getDrilldownBackText =
        function () {
            var h = this.drilldownLevels;
            if (h && 0 < h.length)return h = h[h.length - 1], h.series = h.seriesOptions, T(this.options.lang.drillUpText, h)
        };
    D.prototype.showDrillUpButton = function () {
        var h = this, l = this.getDrilldownBackText(), m = h.options.drilldown.drillUpButton, p, q;
        this.drillUpButton ? this.drillUpButton.attr({text: l}).align() : (q = (p = m.theme) && p.states, this.drillUpButton = this.renderer.button(l, null, null, function () {
            h.drillUp()
        }, p, q && q.hover, q && q.select).attr({align: m.position.align, zIndex: 9}).add().align(m.position,
            !1, m.relativeTo || "plotBox"))
    };
    D.prototype.drillUp = function () {
        for (var l = this, p = l.drilldownLevels, m = p[p.length - 1].levelNumber, q = p.length, r = l.series, t, y, D, E, I = function (h) {
            var m;
            N(r, function (l) {
                l.options._ddSeriesId === h._ddSeriesId && (m = l)
            });
            m = m || l.addSeries(h, !1);
            m.type === D.type && m.animateDrillupTo && (m.animate = m.animateDrillupTo);
            h === y.seriesOptions && (E = m)
        }; q--;)if (y = p[q], y.levelNumber === m) {
            p.pop();
            D = y.lowerSeries;
            if (!D.chart)for (t = r.length; t--;)if (r[t].options.id === y.lowerSeriesOptions.id) {
                D = r[t];
                break
            }
            D.xData =
                [];
            N(y.levelSeriesOptions, I);
            h(l, "drillup", {seriesOptions: y.seriesOptions});
            E.type === D.type && (E.drilldownLevel = y, E.options.animation = l.options.drilldown.animation, D.animateDrillupFrom && D.chart && D.animateDrillupFrom(y));
            E.options._levelNumber = m;
            D.remove(!1);
            E.xAxis && (t = y.oldExtremes, E.xAxis.setExtremes(t.xMin, t.xMax, !1), E.yAxis.setExtremes(t.yMin, t.yMax, !1))
        }
        this.redraw();
        0 === this.drilldownLevels.length ? this.drillUpButton = this.drillUpButton.destroy() : this.drillUpButton.attr({text: this.getDrilldownBackText()}).align();
        C.length = []
    };
    t.prototype.supportsDrilldown = !0;
    t.prototype.animateDrillupTo = function (h) {
        if (!h) {
            var l = this, m = l.drilldownLevel;
            N(this.points, function (h) {
                h.graphic && h.graphic.hide();
                h.dataLabel && h.dataLabel.hide();
                h.connector && h.connector.hide()
            });
            setTimeout(function () {
                l.points && N(l.points, function (h, l) {
                    var p = l === (m && m.pointIndex) ? "show" : "fadeIn", q = "show" === p ? !0 : void 0;
                    if (h.graphic)h.graphic[p](q);
                    if (h.dataLabel)h.dataLabel[p](q);
                    if (h.connector)h.connector[p](q)
                })
            }, Math.max(this.chart.options.drilldown.animation.duration -
            50, 0));
            this.animate = I
        }
    };
    t.prototype.animateDrilldown = function (h) {
        var p = this, m = this.chart.drilldownLevels, q, r = this.chart.options.drilldown.animation, t = this.xAxis;
        h || (N(m, function (h) {
            p.options._ddSeriesId === h.lowerSeriesOptions._ddSeriesId && (q = h.shapeArgs, q.fill = h.color)
        }), q.x += l(t.oldPos, t.pos) - t.pos, N(this.points, function (h) {
            h.graphic && h.graphic.attr(q).animate(R(h.shapeArgs, {fill: h.color}), r);
            h.dataLabel && h.dataLabel.fadeIn(r)
        }), this.animate = null)
    };
    t.prototype.animateDrillupFrom = function (h) {
        var l =
            this.chart.options.drilldown.animation, m = this.group, p = this;
        N(p.trackerGroups, function (h) {
            if (p[h])p[h].on("mouseover")
        });
        delete this.group;
        N(this.points, function (p) {
            var r = p.graphic, t = function () {
                r.destroy();
                m && (m = m.destroy())
            };
            r && (delete p.graphic, l ? r.animate(R(h.shapeArgs, {fill: h.color}), q.merge(l, {complete: t})) : (r.attr(h.shapeArgs), t()))
        })
    };
    y && R(y.prototype, {
        supportsDrilldown: !0,
        animateDrillupTo: t.prototype.animateDrillupTo,
        animateDrillupFrom: t.prototype.animateDrillupFrom,
        animateDrilldown: function (h) {
            var l =
                this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1], m = this.chart.options.drilldown.animation, p = l.shapeArgs, r = p.start, t = (p.end - r) / this.points.length;
            h || (N(this.points, function (h, y) {
                h.graphic.attr(q.merge(p, {
                    start: r + y * t,
                    end: r + (y + 1) * t,
                    fill: l.color
                }))[m ? "animate" : "attr"](R(h.shapeArgs, {fill: h.color}), m)
            }), this.animate = null)
        }
    });
    q.Point.prototype.doDrilldown = function (l, p) {
        for (var m = this.series.chart, q = m.options.drilldown, r = (q.series || []).length, t; r-- && !t;)q.series[r].id === this.drilldown && -1 ===
        E(this.drilldown, C) && (t = q.series[r], C.push(this.drilldown));
        h(m, "drilldown", {
            point: this,
            seriesOptions: t,
            category: p,
            points: void 0 !== p && this.series.xAxis.ticks[p].label.ddPoints.slice(0)
        });
        t && (l ? m.addSingleSeriesAsDrilldown(this, t) : m.addSeriesAsDrilldown(this, t))
    };
    q.Axis.prototype.drilldownCategory = function (h) {
        N(this.ticks[h].label.ddPoints, function (l) {
            l.series && l.series.visible && l.doDrilldown && l.doDrilldown(!0, h)
        });
        this.chart.applyDrilldown()
    };
    p(q.Point.prototype, "init", function (h, l, m, p) {
        var r = h.call(this,
            l, m, p);
        h = l.chart;
        if (m = (m = l.xAxis && l.xAxis.ticks[p]) && m.label)m.ddPoints || (m.ddPoints = []), m.levelNumber !== l.options._levelNumber && (m.ddPoints.length = 0);
        r.drilldown ? (q.addEvent(r, "click", function () {
            r.doDrilldown()
        }), m && (m.basicStyles || (m.basicStyles = q.merge(m.styles)), m.addClass("highcharts-drilldown-axis-label").css(h.options.drilldown.activeAxisLabelStyle).on("click", function () {
            l.xAxis.drilldownCategory(p)
        }), m.ddPoints.push(r), m.levelNumber = l.options._levelNumber)) : m && m.basicStyles && m.levelNumber !==
        l.options._levelNumber && (m.styles = {}, m.css(m.basicStyles), m.on("click", null));
        return r
    });
    p(q.Series.prototype, "drawDataLabels", function (h) {
        var l = this.chart.options.drilldown.activeDataLabelStyle;
        h.call(this);
        N(this.points, function (h) {
            if (h.drilldown && h.dataLabel)h.dataLabel.attr({"class": "highcharts-drilldown-data-label"}).css(l).on("click", function () {
                h.doDrilldown()
            })
        })
    });
    var P, aa = function (h) {
        h.call(this);
        N(this.points, function (h) {
            h.drilldown && h.graphic && h.graphic.attr({"class": "highcharts-drilldown-point"}).css({cursor: "pointer"})
        })
    };
    for (P in r)r[P].prototype.supportsDrilldown && p(r[P].prototype, "drawTracker", aa)
})(Highcharts);
