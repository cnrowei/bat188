var TrimPath, Timer, opSetting, HP_Store, LPM, myEvents, OddsHeader, AllMarketUtility, AMStore, BS_Store, MB;
(function(n, t) {
    function i(t, i) {
        var u, f, e, o = t.nodeName.toLowerCase();
        return "area" === o ? (u = t.parentNode,
        f = u.name,
        !t.href || !f || u.nodeName.toLowerCase() !== "map") ? !1 : (e = n("img[usemap=#" + f + "]")[0],
        !!e && r(e)) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && r(t)
    }
    function r(t) {
        return n.expr.filters.visible(t) && !n(t).parents().andSelf().filter(function() {
            return n.css(this, "visibility") === "hidden"
        }).length
    }
    var u = 0
      , f = /^ui-id-\d+$/;
    (n.ui = n.ui || {},
    n.ui.version) || (n.extend(n.ui, {
        version: "1.9.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    n.fn.extend({
        _focus: n.fn.focus,
        focus: function(t, i) {
            return typeof t == "number" ? this.each(function() {
                var r = this;
                setTimeout(function() {
                    n(r).focus();
                    i && i.call(r)
                }, t)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var t;
            return t = n.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(n.css(this, "position")) && /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
            }).eq(0),
            /fixed/.test(this.css("position")) || !t.length ? n(document) : t
        },
        zIndex: function(i) {
            if (i !== t)
                return this.css("zIndex", i);
            if (this.length)
                for (var r = n(this[0]), u, f; r.length && r[0] !== document; ) {
                    if (u = r.css("position"),
                    (u === "absolute" || u === "relative" || u === "fixed") && (f = parseInt(r.css("zIndex"), 10),
                    !isNaN(f) && f !== 0))
                        return f;
                    r = r.parent()
                }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++u)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                f.test(this.id) && n(this).removeAttr("id")
            })
        }
    }),
    n.extend(n.expr[":"], {
        data: n.expr.createPseudo ? n.expr.createPseudo(function(t) {
            return function(i) {
                return !!n.data(i, t)
            }
        }) : function(t, i, r) {
            return !!n.data(t, r[3])
        }
        ,
        focusable: function(t) {
            return i(t, !isNaN(n.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var r = n.attr(t, "tabindex")
              , u = isNaN(r);
            return (u || r >= 0) && i(t, !u)
        }
    }),
    n(function() {
        var i = document.body
          , t = i.appendChild(t = document.createElement("div"));
        t.offsetHeight;
        n.extend(t.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        });
        n.support.minHeight = t.offsetHeight === 100;
        n.support.selectstart = "onselectstart"in t;
        i.removeChild(t).style.display = "none"
    }),
    n("<a>").outerWidth(1).jquery || n.each(["Width", "Height"], function(i, r) {
        function e(t, i, r, u) {
            return n.each(o, function() {
                i -= parseFloat(n.css(t, "padding" + this)) || 0;
                r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
                u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
            }),
            i
        }
        var o = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"]
          , u = r.toLowerCase()
          , f = {
            innerWidth: n.fn.innerWidth,
            innerHeight: n.fn.innerHeight,
            outerWidth: n.fn.outerWidth,
            outerHeight: n.fn.outerHeight
        };
        n.fn["inner" + r] = function(i) {
            return i === t ? f["inner" + r].call(this) : this.each(function() {
                n(this).css(u, e(this, i) + "px")
            })
        }
        ;
        n.fn["outer" + r] = function(t, i) {
            return typeof t != "number" ? f["outer" + r].call(this, t) : this.each(function() {
                n(this).css(u, e(this, t, !0, i) + "px")
            })
        }
    }),
    n("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (n.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, n.camelCase(i)) : t.call(this)
        }
    }(n.fn.removeData)),
    function() {
        var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
        n.ui.ie = t.length ? !0 : !1;
        n.ui.ie6 = parseFloat(t[1], 10) === 6
    }(),
    n.fn.extend({
        disableSelection: function() {
            return this.bind((n.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(n) {
                n.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }),
    n.extend(n.ui, {
        plugin: {
            add: function(t, i, r) {
                var u, f = n.ui[t].prototype;
                for (u in r)
                    f.plugins[u] = f.plugins[u] || [],
                    f.plugins[u].push([i, r[u]])
            },
            call: function(n, t, i) {
                var r, u = n.plugins[t];
                if (u && n.element[0].parentNode && n.element[0].parentNode.nodeType !== 11)
                    for (r = 0; r < u.length; r++)
                        n.options[u[r][0]] && u[r][1].apply(n.element, i)
            }
        },
        contains: n.contains,
        hasScroll: function(t, i) {
            if (n(t).css("overflow") === "hidden")
                return !1;
            var r = i && i === "left" ? "scrollLeft" : "scrollTop"
              , u = !1;
            return t[r] > 0 ? !0 : (t[r] = 1,
            u = t[r] > 0,
            t[r] = 0,
            u)
        },
        isOverAxis: function(n, t, i) {
            return n > t && n < t + i
        },
        isOver: function(t, i, r, u, f, e) {
            return n.ui.isOverAxis(t, r, f) && n.ui.isOverAxis(i, u, e)
        }
    }))
})(jQuery),
function(n, t) {
    var r = 0
      , i = Array.prototype.slice
      , u = n.cleanData;
    n.cleanData = function(t) {
        for (var i = 0, r; (r = t[i]) != null ; i++)
            try {
                n(r).triggerHandler("remove")
            } catch (f) {}
        u(t)
    }
    ;
    n.widget = function(t, i, r) {
        var o, f, u, s, e = t.split(".")[0];
        t = t.split(".")[1];
        o = e + "-" + t;
        r || (r = i,
        i = n.Widget);
        n.expr[":"][o.toLowerCase()] = function(t) {
            return !!n.data(t, o)
        }
        ;
        n[e] = n[e] || {};
        f = n[e][t];
        u = n[e][t] = function(n, t) {
            if (!this._createWidget)
                return new u(n,t);
            arguments.length && this._createWidget(n, t)
        }
        ;
        n.extend(u, f, {
            version: r.version,
            _proto: n.extend({}, r),
            _childConstructors: []
        });
        s = new i;
        s.options = n.widget.extend({}, s.options);
        n.each(r, function(t, u) {
            n.isFunction(u) && (r[t] = function() {
                var n = function() {
                    return i.prototype[t].apply(this, arguments)
                }
                  , r = function(n) {
                    return i.prototype[t].apply(this, n)
                }
                ;
                return function() {
                    var i = this._super, f = this._superApply, t;
                    return this._super = n,
                    this._superApply = r,
                    t = u.apply(this, arguments),
                    this._super = i,
                    this._superApply = f,
                    t
                }
            }())
        });
        u.prototype = n.widget.extend(s, {
            widgetEventPrefix: f ? s.widgetEventPrefix : t
        }, r, {
            constructor: u,
            namespace: e,
            widgetName: t,
            widgetBaseClass: o,
            widgetFullName: o
        });
        f ? (n.each(f._childConstructors, function(t, i) {
            var r = i.prototype;
            n.widget(r.namespace + "." + r.widgetName, u, i._proto)
        }),
        delete f._childConstructors) : i._childConstructors.push(u);
        n.widget.bridge(t, u)
    }
    ;
    n.widget.extend = function(r) {
        for (var o = i.call(arguments, 1), e = 0, s = o.length, u, f; e < s; e++)
            for (u in o[e])
                f = o[e][u],
                o[e].hasOwnProperty(u) && f !== t && (r[u] = n.isPlainObject(f) ? n.isPlainObject(r[u]) ? n.widget.extend({}, r[u], f) : n.widget.extend({}, f) : f);
        return r
    }
    ;
    n.widget.bridge = function(r, u) {
        var f = u.prototype.widgetFullName || r;
        n.fn[r] = function(e) {
            var h = typeof e == "string"
              , o = i.call(arguments, 1)
              , s = this;
            return e = !h && o.length ? n.widget.extend.apply(null , [e].concat(o)) : e,
            h ? this.each(function() {
                var i, u = n.data(this, f);
                return u ? !n.isFunction(u[e]) || e.charAt(0) === "_" ? n.error("no such method '" + e + "' for " + r + " widget instance") : (i = u[e].apply(u, o),
                i !== u && i !== t ? (s = i && i.jquery ? s.pushStack(i.get()) : i,
                !1) : void 0) : n.error("cannot call methods on " + r + " prior to initialization; attempted to call method '" + e + "'")
            }) : this.each(function() {
                var t = n.data(this, f);
                t ? t.option(e || {})._init() : n.data(this, f, new u(e,this))
            }),
            s
        }
    }
    ;
    n.Widget = function() {}
    ;
    n.Widget._childConstructors = [];
    n.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, i) {
            i = n(i || this.defaultElement || this)[0];
            this.element = n(i);
            this.uuid = r++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
            this.bindings = n();
            this.hoverable = n();
            this.focusable = n();
            i !== this && (n.data(i, this.widgetName, this),
            n.data(i, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(n) {
                    n.target === i && this.destroy()
                }
            }),
            this.document = n(i.style ? i.ownerDocument : i.document || i),
            this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
            this._create();
            this._trigger("create", null , this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: n.noop,
        _getCreateEventData: n.noop,
        _create: n.noop,
        _init: n.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(n.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: n.noop,
        widget: function() {
            return this.element
        },
        option: function(i, r) {
            var o = i, u, f, e;
            if (arguments.length === 0)
                return n.widget.extend({}, this.options);
            if (typeof i == "string")
                if (o = {},
                u = i.split("."),
                i = u.shift(),
                u.length) {
                    for (f = o[i] = n.widget.extend({}, this.options[i]),
                    e = 0; e < u.length - 1; e++)
                        f[u[e]] = f[u[e]] || {},
                        f = f[u[e]];
                    if (i = u.pop(),
                    r === t)
                        return f[i] === t ? null : f[i];
                    f[i] = r
                } else {
                    if (r === t)
                        return this.options[i] === t ? null : this.options[i];
                    o[i] = r
                }
            return this._setOptions(o),
            this
        },
        _setOptions: function(n) {
            var t;
            for (t in n)
                this._setOption(t, n[t]);
            return this
        },
        _setOption: function(n, t) {
            return this.options[n] = t,
            n === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")),
            this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(t, i, r) {
            var f, u = this;
            typeof t != "boolean" && (r = i,
            i = t,
            t = !1);
            r ? (i = f = n(i),
            this.bindings = this.bindings.add(i)) : (r = i,
            i = this.element,
            f = this.widget());
            n.each(r, function(r, e) {
                function o() {
                    if (t || u.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled"))
                        return (typeof e == "string" ? u[e] : e).apply(u, arguments)
                }
                typeof e != "string" && (o.guid = e.guid = e.guid || o.guid || n.guid++);
                var s = r.match(/^(\w+)\s*(.*)$/)
                  , h = s[1] + u.eventNamespace
                  , c = s[2];
                c ? f.delegate(c, h, o) : i.bind(h, o)
            })
        },
        _off: function(n, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            n.unbind(t).undelegate(t)
        },
        _delay: function(n, t) {
            function r() {
                return (typeof n == "string" ? i[n] : n).apply(i, arguments)
            }
            var i = this;
            return setTimeout(r, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t);
            this._on(t, {
                mouseenter: function(t) {
                    n(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    n(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t);
            this._on(t, {
                focusin: function(t) {
                    n(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    n(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, r) {
            var u, f, e = this.options[t];
            if (r = r || {},
            i = n.Event(i),
            i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(),
            i.target = this.element[0],
            f = i.originalEvent,
            f)
                for (u in f)
                    u in i || (i[u] = f[u]);
            return this.element.trigger(i, r),
            !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
        }
    };
    n.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        n.Widget.prototype["_" + t] = function(r, u, f) {
            typeof u == "string" && (u = {
                effect: u
            });
            var o, e = u ? u === !0 || typeof u == "number" ? i : u.effect || i : t;
            u = u || {};
            typeof u == "number" && (u = {
                duration: u
            });
            o = !n.isEmptyObject(u);
            u.complete = f;
            u.delay && r.delay(u.delay);
            o && n.effects && (n.effects.effect[e] || n.uiBackCompat !== !1 && n.effects[e]) ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function(i) {
                n(this)[t]();
                f && f.call(r[0]);
                i()
            })
        }
    });
    n.uiBackCompat !== !1 && (n.Widget.prototype._getCreateOptions = function() {
        return n.metadata && n.metadata.get(this.element[0])[this.widgetName]
    }
    )
}(jQuery),
function(n, t) {
    function a(n, t, i) {
        return [parseInt(n[0], 10) * (l.test(n[0]) ? t / 100 : 1), parseInt(n[1], 10) * (l.test(n[1]) ? i / 100 : 1)]
    }
    function u(t, i) {
        return parseInt(n.css(t, i), 10) || 0
    }
    n.ui = n.ui || {};
    var f, r = Math.max, i = Math.abs, e = Math.round, o = /left|center|right/, s = /top|center|bottom/, h = /[\+\-]\d+%?/, c = /^\w+/, l = /%$/, v = n.fn.position;
    n.position = {
        scrollbarWidth: function() {
            if (f !== t)
                return f;
            var u, r, i = n("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"), e = i.children()[0];
            return n("body").append(i),
            u = e.offsetWidth,
            i.css("overflow", "scroll"),
            r = e.offsetWidth,
            u === r && (r = i[0].clientWidth),
            i.remove(),
            f = u - r
        },
        getScrollInfo: function(t) {
            var i = t.isWindow ? "" : t.element.css("overflow-x")
              , r = t.isWindow ? "" : t.element.css("overflow-y")
              , u = i === "scroll" || i === "auto" && t.width < t.element[0].scrollWidth
              , f = r === "scroll" || r === "auto" && t.height < t.element[0].scrollHeight;
            return {
                width: u ? n.position.scrollbarWidth() : 0,
                height: f ? n.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(t) {
            var i = n(t || window)
              , r = n.isWindow(i[0]);
            return {
                element: i,
                isWindow: r,
                offset: i.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: i.scrollLeft(),
                scrollTop: i.scrollTop(),
                width: r ? i.width() : i.outerWidth(),
                height: r ? i.height() : i.outerHeight()
            }
        }
    };
    n.fn.position = function(t) {
        if (!t || !t.of)
            return v.apply(this, arguments);
        t = n.extend({}, t);
        var b, f, l, p, w, y = n(t.of), nt = n.position.getWithinInfo(t.within), tt = n.position.getScrollInfo(nt), k = y[0], d = (t.collision || "flip").split(" "), g = {};
        return k.nodeType === 9 ? (f = y.width(),
        l = y.height(),
        p = {
            top: 0,
            left: 0
        }) : n.isWindow(k) ? (f = y.width(),
        l = y.height(),
        p = {
            top: y.scrollTop(),
            left: y.scrollLeft()
        }) : k.preventDefault ? (t.at = "left top",
        f = l = 0,
        p = {
            top: k.pageY,
            left: k.pageX
        }) : (f = y.outerWidth(),
        l = y.outerHeight(),
        p = y.offset()),
        w = n.extend({}, p),
        n.each(["my", "at"], function() {
            var n = (t[this] || "").split(" "), i, r;
            n.length === 1 && (n = o.test(n[0]) ? n.concat(["center"]) : s.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
            n[0] = o.test(n[0]) ? n[0] : "center";
            n[1] = s.test(n[1]) ? n[1] : "center";
            i = h.exec(n[0]);
            r = h.exec(n[1]);
            g[this] = [i ? i[0] : 0, r ? r[0] : 0];
            t[this] = [c.exec(n[0])[0], c.exec(n[1])[0]]
        }),
        d.length === 1 && (d[1] = d[0]),
        t.at[0] === "right" ? w.left += f : t.at[0] === "center" && (w.left += f / 2),
        t.at[1] === "bottom" ? w.top += l : t.at[1] === "center" && (w.top += l / 2),
        b = a(g.at, f, l),
        w.left += b[0],
        w.top += b[1],
        this.each(function() {
            var k, it, s = n(this), h = s.outerWidth(), c = s.outerHeight(), rt = u(this, "marginLeft"), ut = u(this, "marginTop"), ft = h + rt + u(this, "marginRight") + tt.width, et = c + ut + u(this, "marginBottom") + tt.height, o = n.extend({}, w), v = a(g.my, s.outerWidth(), s.outerHeight());
            t.my[0] === "right" ? o.left -= h : t.my[0] === "center" && (o.left -= h / 2);
            t.my[1] === "bottom" ? o.top -= c : t.my[1] === "center" && (o.top -= c / 2);
            o.left += v[0];
            o.top += v[1];
            n.support.offsetFractions || (o.left = e(o.left),
            o.top = e(o.top));
            k = {
                marginLeft: rt,
                marginTop: ut
            };
            n.each(["left", "top"], function(i, r) {
                n.ui.position[d[i]] && n.ui.position[d[i]][r](o, {
                    targetWidth: f,
                    targetHeight: l,
                    elemWidth: h,
                    elemHeight: c,
                    collisionPosition: k,
                    collisionWidth: ft,
                    collisionHeight: et,
                    offset: [b[0] + v[0], b[1] + v[1]],
                    my: t.my,
                    at: t.at,
                    within: nt,
                    elem: s
                })
            });
            n.fn.bgiframe && s.bgiframe();
            t.using && (it = function(n) {
                var u = p.left - o.left
                  , v = u + f - h
                  , e = p.top - o.top
                  , w = e + l - c
                  , a = {
                    target: {
                        element: y,
                        left: p.left,
                        top: p.top,
                        width: f,
                        height: l
                    },
                    element: {
                        element: s,
                        left: o.left,
                        top: o.top,
                        width: h,
                        height: c
                    },
                    horizontal: v < 0 ? "left" : u > 0 ? "right" : "center",
                    vertical: w < 0 ? "top" : e > 0 ? "bottom" : "middle"
                };
                f < h && i(u + v) < f && (a.horizontal = "center");
                l < c && i(e + w) < l && (a.vertical = "middle");
                a.important = r(i(u), i(v)) > r(i(e), i(w)) ? "horizontal" : "vertical";
                t.using.call(this, n, a)
            }
            );
            s.offset(n.extend(o, {
                using: it
            }))
        })
    }
    ;
    n.ui.position = {
        fit: {
            left: function(n, t) {
                var e = t.within, u = e.isWindow ? e.scrollLeft : e.offset.left, o = e.width, s = n.left - t.collisionPosition.marginLeft, i = u - s, f = s + t.collisionWidth - o - u, h;
                t.collisionWidth > o ? i > 0 && f <= 0 ? (h = n.left + i + t.collisionWidth - o - u,
                n.left += i - h) : n.left = f > 0 && i <= 0 ? u : i > f ? u + o - t.collisionWidth : u : i > 0 ? n.left += i : f > 0 ? n.left -= f : n.left = r(n.left - s, n.left)
            },
            top: function(n, t) {
                var o = t.within, u = o.isWindow ? o.scrollTop : o.offset.top, e = t.within.height, s = n.top - t.collisionPosition.marginTop, i = u - s, f = s + t.collisionHeight - e - u, h;
                t.collisionHeight > e ? i > 0 && f <= 0 ? (h = n.top + i + t.collisionHeight - e - u,
                n.top += i - h) : n.top = f > 0 && i <= 0 ? u : i > f ? u + e - t.collisionHeight : u : i > 0 ? n.top += i : f > 0 ? n.top -= f : n.top = r(n.top - s, n.top)
            }
        },
        flip: {
            left: function(n, t) {
                var r = t.within, y = r.offset.left + r.scrollLeft, c = r.width, o = r.isWindow ? r.scrollLeft : r.offset.left, l = n.left - t.collisionPosition.marginLeft, a = l - o, v = l + t.collisionWidth - c - o, u = t.my[0] === "left" ? -t.elemWidth : t.my[0] === "right" ? t.elemWidth : 0, f = t.at[0] === "left" ? t.targetWidth : t.at[0] === "right" ? -t.targetWidth : 0, e = -2 * t.offset[0], s, h;
                a < 0 ? (s = n.left + u + f + e + t.collisionWidth - c - y,
                (s < 0 || s < i(a)) && (n.left += u + f + e)) : v > 0 && (h = n.left - t.collisionPosition.marginLeft + u + f + e - o,
                (h > 0 || i(h) < v) && (n.left += u + f + e))
            },
            top: function(n, t) {
                var r = t.within, y = r.offset.top + r.scrollTop, a = r.height, o = r.isWindow ? r.scrollTop : r.offset.top, v = n.top - t.collisionPosition.marginTop, s = v - o, h = v + t.collisionHeight - a - o, p = t.my[1] === "top", u = p ? -t.elemHeight : t.my[1] === "bottom" ? t.elemHeight : 0, f = t.at[1] === "top" ? t.targetHeight : t.at[1] === "bottom" ? -t.targetHeight : 0, e = -2 * t.offset[1], c, l;
                s < 0 ? (l = n.top + u + f + e + t.collisionHeight - a - y,
                n.top + u + f + e > s && (l < 0 || l < i(s)) && (n.top += u + f + e)) : h > 0 && (c = n.top - t.collisionPosition.marginTop + u + f + e - o,
                n.top + u + f + e > h && (c > 0 || i(c) < h) && (n.top += u + f + e))
            }
        },
        flipfit: {
            left: function() {
                n.ui.position.flip.left.apply(this, arguments);
                n.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                n.ui.position.flip.top.apply(this, arguments);
                n.ui.position.fit.top.apply(this, arguments)
            }
        }
    },
    function() {
        var t, i, r, u, f, e = document.getElementsByTagName("body")[0], o = document.createElement("div");
        t = document.createElement(e ? "div" : "body");
        r = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        };
        e && n.extend(r, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (f in r)
            t.style[f] = r[f];
        t.appendChild(o);
        i = e || document.documentElement;
        i.insertBefore(t, i.firstChild);
        o.style.cssText = "position: absolute; left: 10.7432222px;";
        u = n(o).offset().left;
        n.support.offsetFractions = u > 10 && u < 11;
        t.innerHTML = "";
        i.removeChild(t)
    }();
    n.uiBackCompat !== !1 && function(n) {
        var i = n.fn.position;
        n.fn.position = function(r) {
            if (!r || !r.offset)
                return i.call(this, r);
            var u = r.offset.split(" ")
              , f = r.at.split(" ");
            return u.length === 1 && (u[1] = u[0]),
            /^\d/.test(u[0]) && (u[0] = "+" + u[0]),
            /^\d/.test(u[1]) && (u[1] = "+" + u[1]),
            f.length === 1 && (/left|center|right/.test(f[0]) ? f[1] = "center" : (f[1] = f[0],
            f[0] = "center")),
            i.call(this, n.extend(r, {
                at: f[0] + u[0] + " " + f[1] + u[1],
                offset: t
            }))
        }
    }(jQuery)
}(jQuery),
function(n, t) {
    function e() {
        this.debug = !1;
        this._curInst = null ;
        this._keyEvent = !1;
        this._disabledInputs = [];
        this._datepickerShowing = !1;
        this._inDialog = !1;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null ,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null ,
            maxDate: null ,
            duration: "fast",
            beforeShowDay: null ,
            beforeShow: null ,
            onSelect: null ,
            onChangeMonthYear: null ,
            onClose: null ,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        };
        n.extend(this._defaults, this.regional[""]);
        this.dpDiv = o(n('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"><\/div>'))
    }
    function o(t) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return t.delegate(i, "mouseout", function() {
            n(this).removeClass("ui-state-hover");
            this.className.indexOf("ui-datepicker-prev") != -1 && n(this).removeClass("ui-datepicker-prev-hover");
            this.className.indexOf("ui-datepicker-next") != -1 && n(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", function() {
            n.datepicker._isDisabledDatepicker(f.inline ? t.parent()[0] : f.input[0]) || (n(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
            n(this).addClass("ui-state-hover"),
            this.className.indexOf("ui-datepicker-prev") != -1 && n(this).addClass("ui-datepicker-prev-hover"),
            this.className.indexOf("ui-datepicker-next") != -1 && n(this).addClass("ui-datepicker-next-hover"))
        })
    }
    function u(i, r) {
        n.extend(i, r);
        for (var u in r)
            (r[u] == null || r[u] == t) && (i[u] = r[u]);
        return i
    }
    n.extend(n.ui, {
        datepicker: {
            version: "1.9.2"
        }
    });
    var i = "datepicker", r = (new Date).getTime(), f;
    n.extend(e.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function() {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(n) {
            return u(this._defaults, n || {}),
            this
        },
        _attachDatepicker: function(target, settings) {
            var inlineSettings = null , attrName, attrValue, nodeName, inline, inst;
            for (attrName in this._defaults)
                if (attrValue = target.getAttribute("date:" + attrName),
                attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            nodeName = target.nodeName.toLowerCase();
            inline = nodeName == "div" || nodeName == "span";
            target.id || (this.uuid += 1,
            target.id = "dp" + this.uuid);
            inst = this._newInst(n(target), inline);
            inst.settings = n.extend({}, settings || {}, inlineSettings || {});
            nodeName == "input" ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
        },
        _newInst: function(t, i) {
            var r = t[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {
                id: r,
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? o(n('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"><\/div>')) : this.dpDiv
            }
        },
        _connectDatepicker: function(t, r) {
            var u = n(t);
            (r.append = n([]),
            r.trigger = n([]),
            u.hasClass(this.markerClassName)) || (this._attachments(u, r),
            u.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(n, t, i) {
                r.settings[t] = i
            }).bind("getData.datepicker", function(n, t) {
                return this._get(r, t)
            }),
            this._autoSize(r),
            n.data(t, i, r),
            r.settings.disabled && this._disableDatepicker(t))
        },
        _attachments: function(t, i) {
            var e = this._get(i, "appendText"), o = this._get(i, "isRTL"), u, r, f;
            i.append && i.append.remove();
            e && (i.append = n('<span class="' + this._appendClass + '">' + e + "<\/span>"),
            t[o ? "before" : "after"](i.append));
            t.unbind("focus", this._showDatepicker);
            i.trigger && i.trigger.remove();
            u = this._get(i, "showOn");
            (u == "focus" || u == "both") && t.focus(this._showDatepicker);
            (u == "button" || u == "both") && (r = this._get(i, "buttonText"),
            f = this._get(i, "buttonImage"),
            i.trigger = n(this._get(i, "buttonImageOnly") ? n("<img/>").addClass(this._triggerClass).attr({
                src: f,
                alt: r,
                title: r
            }) : n('<button type="button"><\/button>').addClass(this._triggerClass).html(f == "" ? r : n("<img/>").attr({
                src: f,
                alt: r,
                title: r
            }))),
            t[o ? "before" : "after"](i.trigger),
            i.trigger.click(function() {
                return n.datepicker._datepickerShowing && n.datepicker._lastInput == t[0] ? n.datepicker._hideDatepicker() : n.datepicker._datepickerShowing && n.datepicker._lastInput != t[0] ? (n.datepicker._hideDatepicker(),
                n.datepicker._showDatepicker(t[0])) : n.datepicker._showDatepicker(t[0]),
                !1
            }))
        },
        _autoSize: function(n) {
            var t, i, r;
            this._get(n, "autoSize") && !n.inline && (t = new Date(2009,11,20),
            i = this._get(n, "dateFormat"),
            i.match(/[DM]/) && (r = function(n) {
                for (var i = 0, r = 0, t = 0; t < n.length; t++)
                    n[t].length > i && (i = n[t].length,
                    r = t);
                return r
            }
            ,
            t.setMonth(r(this._get(n, i.match(/MM/) ? "monthNames" : "monthNamesShort"))),
            t.setDate(r(this._get(n, i.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - t.getDay())),
            n.input.attr("size", this._formatDate(n, t).length))
        },
        _inlineDatepicker: function(t, r) {
            var u = n(t);
            u.hasClass(this.markerClassName) || (u.addClass(this.markerClassName).append(r.dpDiv).bind("setData.datepicker", function(n, t, i) {
                r.settings[t] = i
            }).bind("getData.datepicker", function(n, t) {
                return this._get(r, t)
            }),
            n.data(t, i, r),
            this._setDate(r, this._getDefaultDate(r), !0),
            this._updateDatepicker(r),
            this._updateAlternate(r),
            r.settings.disabled && this._disableDatepicker(t),
            r.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(t, r, f, e, o) {
            var s = this._dialogInst, h;
            if (s || (this.uuid += 1,
            h = "dp" + this.uuid,
            this._dialogInput = n('<input type="text" id="' + h + '" style="position: absolute; top: -100px; width: 0px;"/>'),
            this._dialogInput.keydown(this._doKeyDown),
            n("body").append(this._dialogInput),
            s = this._dialogInst = this._newInst(this._dialogInput, !1),
            s.settings = {},
            n.data(this._dialogInput[0], i, s)),
            u(s.settings, e || {}),
            r = r && r.constructor == Date ? this._formatDate(s, r) : r,
            this._dialogInput.val(r),
            this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null ,
            !this._pos) {
                var c = document.documentElement.clientWidth
                  , l = document.documentElement.clientHeight
                  , a = document.documentElement.scrollLeft || document.body.scrollLeft
                  , v = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [c / 2 - 100 + a, l / 2 - 150 + v]
            }
            return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
            s.settings.onSelect = f,
            this._inDialog = !0,
            this.dpDiv.addClass(this._dialogClass),
            this._showDatepicker(this._dialogInput[0]),
            n.blockUI && n.blockUI(this.dpDiv),
            n.data(this._dialogInput[0], i, s),
            this
        },
        _destroyDatepicker: function(t) {
            var u = n(t), f = n.data(t, i), r;
            u.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(),
            n.removeData(t, i),
            r == "input" ? (f.append.remove(),
            f.trigger.remove(),
            u.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (r == "div" || r == "span") && u.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function(t) {
            var f = n(t), e = n.data(t, i), r, u;
            f.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(),
            r == "input" ? (t.disabled = !1,
            e.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : (r == "div" || r == "span") && (u = f.children("." + this._inlineClass),
            u.children().removeClass("ui-state-disabled"),
            u.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
            this._disabledInputs = n.map(this._disabledInputs, function(n) {
                return n == t ? null : n
            }))
        },
        _disableDatepicker: function(t) {
            var f = n(t), e = n.data(t, i), r, u;
            f.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(),
            r == "input" ? (t.disabled = !0,
            e.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : (r == "div" || r == "span") && (u = f.children("." + this._inlineClass),
            u.children().addClass("ui-state-disabled"),
            u.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
            this._disabledInputs = n.map(this._disabledInputs, function(n) {
                return n == t ? null : n
            }),
            this._disabledInputs[this._disabledInputs.length] = t)
        },
        _isDisabledDatepicker: function(n) {
            if (!n)
                return !1;
            for (var t = 0; t < this._disabledInputs.length; t++)
                if (this._disabledInputs[t] == n)
                    return !0;
            return !1
        },
        _getInst: function(t) {
            try {
                return n.data(t, i)
            } catch (r) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(i, r, f) {
            var e = this._getInst(i), o;
            if (arguments.length == 2 && typeof r == "string")
                return r == "defaults" ? n.extend({}, n.datepicker._defaults) : e ? r == "all" ? n.extend({}, e.settings) : this._get(e, r) : null ;
            if (o = r || {},
            typeof r == "string" && (o = {},
            o[r] = f),
            e) {
                this._curInst == e && this._hideDatepicker();
                var c = this._getDateDatepicker(i, !0)
                  , s = this._getMinMaxDate(e, "min")
                  , h = this._getMinMaxDate(e, "max");
                u(e.settings, o);
                s !== null && o.dateFormat !== t && o.minDate === t && (e.settings.minDate = this._formatDate(e, s));
                h !== null && o.dateFormat !== t && o.maxDate === t && (e.settings.maxDate = this._formatDate(e, h));
                this._attachments(n(i), e);
                this._autoSize(e);
                this._setDate(e, c);
                this._updateAlternate(e);
                this._updateDatepicker(e)
            }
        },
        _changeDatepicker: function(n, t, i) {
            this._optionDatepicker(n, t, i)
        },
        _refreshDatepicker: function(n) {
            var t = this._getInst(n);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function(n, t) {
            var i = this._getInst(n);
            i && (this._setDate(i, t),
            this._updateDatepicker(i),
            this._updateAlternate(i))
        },
        _getDateDatepicker: function(n, t) {
            var i = this._getInst(n);
            return i && !i.inline && this._setDateFromField(i, t),
            i ? this._getDate(i) : null
        },
        _doKeyDown: function(t) {
            var i = n.datepicker._getInst(t.target), r = !0, e = i.dpDiv.is(".ui-datepicker-rtl"), u, f, o;
            if (i._keyEvent = !0,
            n.datepicker._datepickerShowing)
                switch (t.keyCode) {
                case 9:
                    n.datepicker._hideDatepicker();
                    r = !1;
                    break;
                case 13:
                    return u = n("td." + n.datepicker._dayOverClass + ":not(." + n.datepicker._currentClass + ")", i.dpDiv),
                    u[0] && n.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, u[0]),
                    f = n.datepicker._get(i, "onSelect"),
                    f ? (o = n.datepicker._formatDate(i),
                    f.apply(i.input ? i.input[0] : null , [o, i])) : n.datepicker._hideDatepicker(),
                    !1;
                case 27:
                    n.datepicker._hideDatepicker();
                    break;
                case 33:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 34:
                    n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target);
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target);
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, e ? 1 : -1, "D");
                    r = t.ctrlKey || t.metaKey;
                    t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, -7, "D");
                    r = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, e ? -1 : 1, "D");
                    r = t.ctrlKey || t.metaKey;
                    t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, 7, "D");
                    r = t.ctrlKey || t.metaKey;
                    break;
                default:
                    r = !1
                }
            else
                t.keyCode == 36 && t.ctrlKey ? n.datepicker._showDatepicker(this) : r = !1;
            r && (t.preventDefault(),
            t.stopPropagation())
        },
        _doKeyPress: function(i) {
            var f = n.datepicker._getInst(i.target), r, u;
            if (n.datepicker._get(f, "constrainInput"))
                return r = n.datepicker._possibleChars(n.datepicker._get(f, "dateFormat")),
                u = String.fromCharCode(i.charCode == t ? i.keyCode : i.charCode),
                i.ctrlKey || i.metaKey || u < " " || !r || r.indexOf(u) > -1
        },
        _doKeyUp: function(t) {
            var i = n.datepicker._getInst(t.target), r;
            if (i.input.val() != i.lastVal)
                try {
                    r = n.datepicker.parseDate(n.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null , n.datepicker._getFormatConfig(i));
                    r && (n.datepicker._setDateFromField(i),
                    n.datepicker._updateAlternate(i),
                    n.datepicker._updateDatepicker(i))
                } catch (u) {
                    n.datepicker.log(u)
                }
            return !0
        },
        _showDatepicker: function(t) {
            var i, o, s, f, e;
            if ((t = t.target || t,
            t.nodeName.toLowerCase() != "input" && (t = n("input", t.parentNode)[0]),
            !n.datepicker._isDisabledDatepicker(t) && n.datepicker._lastInput != t) && (i = n.datepicker._getInst(t),
            n.datepicker._curInst && n.datepicker._curInst != i && (n.datepicker._curInst.dpDiv.stop(!0, !0),
            i && n.datepicker._datepickerShowing && n.datepicker._hideDatepicker(n.datepicker._curInst.input[0])),
            o = n.datepicker._get(i, "beforeShow"),
            s = o ? o.apply(t, [t, i]) : {},
            s !== !1) && (u(i.settings, s),
            i.lastVal = null ,
            n.datepicker._lastInput = t,
            n.datepicker._setDateFromField(i),
            n.datepicker._inDialog && (t.value = ""),
            n.datepicker._pos || (n.datepicker._pos = n.datepicker._findPos(t),
            n.datepicker._pos[1] += t.offsetHeight),
            f = !1,
            n(t).parents().each(function() {
                return f |= n(this).css("position") == "fixed",
                !f
            }),
            e = {
                left: n.datepicker._pos[0],
                top: n.datepicker._pos[1]
            },
            n.datepicker._pos = null ,
            i.dpDiv.empty(),
            i.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            }),
            n.datepicker._updateDatepicker(i),
            e = n.datepicker._checkOffset(i, e, f),
            i.dpDiv.css({
                position: n.datepicker._inDialog && n.blockUI ? "static" : f ? "fixed" : "absolute",
                display: "none",
                left: e.left + "px",
                top: e.top + "px"
            }),
            !i.inline)) {
                var r = n.datepicker._get(i, "showAnim")
                  , h = n.datepicker._get(i, "duration")
                  , c = function() {
                    var r = i.dpDiv.find("iframe.ui-datepicker-cover"), t;
                    !r.length || (t = n.datepicker._getBorders(i.dpDiv),
                    r.css({
                        left: -t[0],
                        top: -t[1],
                        width: i.dpDiv.outerWidth(),
                        height: i.dpDiv.outerHeight()
                    }))
                }
                ;
                i.dpDiv.zIndex(n(t).zIndex() + 1);
                n.datepicker._datepickerShowing = !0;
                n.effects && (n.effects.effect[r] || n.effects[r]) ? i.dpDiv.show(r, n.datepicker._get(i, "showOptions"), h, c) : i.dpDiv[r || "show"](r ? h : null , c);
                r && h || c();
                i.input.is(":visible") && !i.input.is(":disabled") && i.input.focus();
                n.datepicker._curInst = i
            }
        },
        _updateDatepicker: function(t) {
            var i, r, o;
            this.maxRows = 4;
            i = n.datepicker._getBorders(t.dpDiv);
            f = t;
            t.dpDiv.empty().append(this._generateHTML(t));
            this._attachHandlers(t);
            r = t.dpDiv.find("iframe.ui-datepicker-cover");
            !r.length || r.css({
                left: -i[0],
                top: -i[1],
                width: t.dpDiv.outerWidth(),
                height: t.dpDiv.outerHeight()
            });
            t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var u = this._getNumberOfMonths(t)
              , e = u[1];
            t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            e > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + e).css("width", 17 * e + "em");
            t.dpDiv[(u[0] != 1 || u[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            t == n.datepicker._curInst && n.datepicker._datepickerShowing && t.input && t.input.is(":visible") && !t.input.is(":disabled") && t.input[0] != document.activeElement && t.input.focus();
            t.yearshtml && (o = t.yearshtml,
            setTimeout(function() {
                o === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml);
                o = t.yearshtml = null
            }, 0))
        },
        _getBorders: function(n) {
            var t = function(n) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[n] || n
            }
            ;
            return [parseFloat(t(n.css("border-left-width"))), parseFloat(t(n.css("border-top-width")))]
        },
        _checkOffset: function(t, i, r) {
            var u = t.dpDiv.outerWidth()
              , f = t.dpDiv.outerHeight()
              , h = t.input ? t.input.outerWidth() : 0
              , o = t.input ? t.input.outerHeight() : 0
              , e = document.documentElement.clientWidth + (r ? 0 : n(document).scrollLeft())
              , s = document.documentElement.clientHeight + (r ? 0 : n(document).scrollTop());
            return i.left -= this._get(t, "isRTL") ? u - h : 0,
            i.left -= r && i.left == t.input.offset().left ? n(document).scrollLeft() : 0,
            i.top -= r && i.top == t.input.offset().top + o ? n(document).scrollTop() : 0,
            i.left -= Math.min(i.left, i.left + u > e && e > u ? Math.abs(i.left + u - e) : 0),
            i.top -= Math.min(i.top, i.top + f > s && s > f ? Math.abs(f + o) : 0),
            i
        },
        _findPos: function(t) {
            for (var r = this._getInst(t), u = this._get(r, "isRTL"), i; t && (t.type == "hidden" || t.nodeType != 1 || n.expr.filters.hidden(t)); )
                t = t[u ? "previousSibling" : "nextSibling"];
            return i = n(t).offset(),
            [i.left, i.top]
        },
        _hideDatepicker: function(t) {
            var r = this._curInst, e;
            if (r && (!t || r == n.data(t, i)) && this._datepickerShowing) {
                var u = this._get(r, "showAnim")
                  , o = this._get(r, "duration")
                  , f = function() {
                    n.datepicker._tidyDialog(r)
                }
                ;
                n.effects && (n.effects.effect[u] || n.effects[u]) ? r.dpDiv.hide(u, n.datepicker._get(r, "showOptions"), o, f) : r.dpDiv[u == "slideDown" ? "slideUp" : u == "fadeIn" ? "fadeOut" : "hide"](u ? o : null , f);
                u || f();
                this._datepickerShowing = !1;
                e = this._get(r, "onClose");
                e && e.apply(r.input ? r.input[0] : null , [r.input ? r.input.val() : "", r]);
                this._lastInput = null ;
                this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }),
                n.blockUI && (n.unblockUI(),
                n("body").append(this.dpDiv)));
                this._inDialog = !1
            }
        },
        _tidyDialog: function(n) {
            n.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(t) {
            if (n.datepicker._curInst) {
                var i = n(t.target)
                  , r = n.datepicker._getInst(i[0]);
                (i[0].id == n.datepicker._mainDivId || i.parents("#" + n.datepicker._mainDivId).length != 0 || i.hasClass(n.datepicker.markerClassName) || i.closest("." + n.datepicker._triggerClass).length || !n.datepicker._datepickerShowing || n.datepicker._inDialog && n.blockUI) && (!i.hasClass(n.datepicker.markerClassName) || n.datepicker._curInst == r) || n.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(t, i, r) {
            var f = n(t)
              , u = this._getInst(f[0]);
            this._isDisabledDatepicker(f[0]) || (this._adjustInstDate(u, i + (r == "M" ? this._get(u, "showCurrentAtPos") : 0), r),
            this._updateDatepicker(u))
        },
        _gotoToday: function(t) {
            var u = n(t), i = this._getInst(u[0]), r;
            this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay,
            i.drawMonth = i.selectedMonth = i.currentMonth,
            i.drawYear = i.selectedYear = i.currentYear) : (r = new Date,
            i.selectedDay = r.getDate(),
            i.drawMonth = i.selectedMonth = r.getMonth(),
            i.drawYear = i.selectedYear = r.getFullYear());
            this._notifyChange(i);
            this._adjustDate(u)
        },
        _selectMonthYear: function(t, i, r) {
            var f = n(t)
              , u = this._getInst(f[0]);
            u["selected" + (r == "M" ? "Month" : "Year")] = u["draw" + (r == "M" ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10);
            this._notifyChange(u);
            this._adjustDate(f)
        },
        _selectDay: function(t, i, r, u) {
            var e = n(t), f;
            n(u).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0]) || (f = this._getInst(e[0]),
            f.selectedDay = f.currentDay = n("a", u).html(),
            f.selectedMonth = f.currentMonth = i,
            f.selectedYear = f.currentYear = r,
            this._selectDate(t, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
        },
        _clearDate: function(t) {
            var i = n(t)
              , r = this._getInst(i[0]);
            this._selectDate(i, "")
        },
        _selectDate: function(t, i) {
            var f = n(t), r = this._getInst(f[0]), u;
            i = i != null ? i : this._formatDate(r);
            r.input && r.input.val(i);
            this._updateAlternate(r);
            u = this._get(r, "onSelect");
            u ? u.apply(r.input ? r.input[0] : null , [i, r]) : r.input && r.input.trigger("change");
            r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(),
            this._lastInput = r.input[0],
            typeof r.input[0] != "object" && r.input.focus(),
            this._lastInput = null )
        },
        _updateAlternate: function(t) {
            var i = this._get(t, "altField");
            if (i) {
                var r = this._get(t, "altFormat") || this._get(t, "dateFormat")
                  , u = this._getDate(t)
                  , f = this.formatDate(r, u, this._getFormatConfig(t));
                n(i).each(function() {
                    n(this).val(f)
                })
            }
        },
        noWeekends: function(n) {
            var t = n.getDay();
            return [t > 0 && t < 6, ""]
        },
        iso8601Week: function(n) {
            var t = new Date(n.getTime()), i;
            return t.setDate(t.getDate() + 4 - (t.getDay() || 7)),
            i = t.getTime(),
            t.setMonth(0),
            t.setDate(1),
            Math.floor(Math.round((i - t) / 864e5) / 7) + 1
        },
        parseDate: function(t, i, r) {
            var c, s, w, b, u;
            if (t == null || i == null )
                throw "Invalid arguments";
            if (i = typeof i == "object" ? i.toString() : i + "",
            i == "")
                return null ;
            c = (r ? r.shortYearCutoff : null ) || this._defaults.shortYearCutoff;
            c = typeof c != "string" ? c : (new Date).getFullYear() % 100 + parseInt(c, 10);
            var d = (r ? r.dayNamesShort : null ) || this._defaults.dayNamesShort
              , g = (r ? r.dayNames : null ) || this._defaults.dayNames
              , nt = (r ? r.monthNamesShort : null ) || this._defaults.monthNamesShort
              , tt = (r ? r.monthNames : null ) || this._defaults.monthNames
              , f = -1
              , o = -1
              , h = -1
              , v = -1
              , y = !1
              , a = function(n) {
                var i = s + 1 < t.length && t.charAt(s + 1) == n;
                return i && s++,
                i
            }
              , l = function(n) {
                var r = a(n)
                  , u = n == "@" ? 14 : n == "!" ? 20 : n == "y" && r ? 4 : n == "o" ? 3 : 2
                  , f = new RegExp("^\\d{1," + u + "}")
                  , t = i.substring(e).match(f);
                if (!t)
                    throw "Missing number at position " + e;
                return e += t[0].length,
                parseInt(t[0], 10)
            }
              , k = function(t, r, u) {
                var o = n.map(a(t) ? u : r, function(n, t) {
                    return [[t, n]]
                }).sort(function(n, t) {
                    return -(n[1].length - t[1].length)
                })
                  , f = -1;
                if (n.each(o, function(n, t) {
                    var r = t[1];
                    if (i.substr(e, r.length).toLowerCase() == r.toLowerCase())
                        return f = t[0],
                        e += r.length,
                        !1
                }),
                f != -1)
                    return f + 1;
                throw "Unknown name at position " + e;
            }
              , p = function() {
                if (i.charAt(e) != t.charAt(s))
                    throw "Unexpected literal at position " + e;
                e++
            }
              , e = 0;
            for (s = 0; s < t.length; s++)
                if (y)
                    t.charAt(s) != "'" || a("'") ? p() : y = !1;
                else
                    switch (t.charAt(s)) {
                    case "d":
                        h = l("d");
                        break;
                    case "D":
                        k("D", d, g);
                        break;
                    case "o":
                        v = l("o");
                        break;
                    case "m":
                        o = l("m");
                        break;
                    case "M":
                        o = k("M", nt, tt);
                        break;
                    case "y":
                        f = l("y");
                        break;
                    case "@":
                        u = new Date(l("@"));
                        f = u.getFullYear();
                        o = u.getMonth() + 1;
                        h = u.getDate();
                        break;
                    case "!":
                        u = new Date((l("!") - this._ticksTo1970) / 1e4);
                        f = u.getFullYear();
                        o = u.getMonth() + 1;
                        h = u.getDate();
                        break;
                    case "'":
                        a("'") ? p() : y = !0;
                        break;
                    default:
                        p()
                    }
            if (e < i.length && (w = i.substr(e),
            !/^\s+/.test(w)))
                throw "Extra/unparsed characters found in date: " + w;
            if (f == -1 ? f = (new Date).getFullYear() : f < 100 && (f += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (f <= c ? 0 : -100)),
            v > -1) {
                o = 1;
                h = v;
                do {
                    if (b = this._getDaysInMonth(f, o - 1),
                    h <= b)
                        break;
                    o++;
                    h -= b
                } while (1)
            }
            if (u = this._daylightSavingAdjust(new Date(f,o - 1,h)),
            u.getFullYear() != f || u.getMonth() + 1 != o || u.getDate() != h)
                throw "Invalid date";
            return u
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 864e9,
        formatDate: function(n, t, i) {
            var u;
            if (!t)
                return "";
            var h = (i ? i.dayNamesShort : null ) || this._defaults.dayNamesShort
              , c = (i ? i.dayNames : null ) || this._defaults.dayNames
              , l = (i ? i.monthNamesShort : null ) || this._defaults.monthNamesShort
              , a = (i ? i.monthNames : null ) || this._defaults.monthNames
              , f = function(t) {
                var i = u + 1 < n.length && n.charAt(u + 1) == t;
                return i && u++,
                i
            }
              , e = function(n, t, i) {
                var r = "" + t;
                if (f(n))
                    while (r.length < i)
                        r = "0" + r;
                return r
            }
              , s = function(n, t, i, r) {
                return f(n) ? r[t] : i[t]
            }
              , r = ""
              , o = !1;
            if (t)
                for (u = 0; u < n.length; u++)
                    if (o)
                        n.charAt(u) != "'" || f("'") ? r += n.charAt(u) : o = !1;
                    else
                        switch (n.charAt(u)) {
                        case "d":
                            r += e("d", t.getDate(), 2);
                            break;
                        case "D":
                            r += s("D", t.getDay(), h, c);
                            break;
                        case "o":
                            r += e("o", Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime() - new Date(t.getFullYear(),0,0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            r += e("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            r += s("M", t.getMonth(), l, a);
                            break;
                        case "y":
                            r += f("y") ? t.getFullYear() : (t.getYear() % 100 < 10 ? "0" : "") + t.getYear() % 100;
                            break;
                        case "@":
                            r += t.getTime();
                            break;
                        case "!":
                            r += t.getTime() * 1e4 + this._ticksTo1970;
                            break;
                        case "'":
                            f("'") ? r += "'" : o = !0;
                            break;
                        default:
                            r += n.charAt(u)
                        }
            return r
        },
        _possibleChars: function(n) {
            for (var i = "", r = !1, u = function(i) {
                var r = t + 1 < n.length && n.charAt(t + 1) == i;
                return r && t++,
                r
            }
            , t = 0; t < n.length; t++)
                if (r)
                    n.charAt(t) != "'" || u("'") ? i += n.charAt(t) : r = !1;
                else
                    switch (n.charAt(t)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null ;
                    case "'":
                        u("'") ? i += "'" : r = !0;
                        break;
                    default:
                        i += n.charAt(t)
                    }
            return i
        },
        _get: function(n, i) {
            return n.settings[i] !== t ? n.settings[i] : this._defaults[i]
        },
        _setDateFromField: function(n, t) {
            var u, r, i, f, e;
            if (n.input.val() != n.lastVal) {
                u = this._get(n, "dateFormat");
                r = n.lastVal = n.input ? n.input.val() : null ;
                i = f = this._getDefaultDate(n);
                e = this._getFormatConfig(n);
                try {
                    i = this.parseDate(u, r, e) || f
                } catch (o) {
                    this.log(o);
                    r = t ? "" : r
                }
                n.selectedDay = i.getDate();
                n.drawMonth = n.selectedMonth = i.getMonth();
                n.drawYear = n.selectedYear = i.getFullYear();
                n.currentDay = r ? i.getDate() : 0;
                n.currentMonth = r ? i.getMonth() : 0;
                n.currentYear = r ? i.getFullYear() : 0;
                this._adjustInstDate(n)
            }
        },
        _getDefaultDate: function(n) {
            return this._restrictMinMax(n, this._determineDate(n, this._get(n, "defaultDate"), new Date))
        },
        _determineDate: function(t, i, r) {
            var f = function(n) {
                var t = new Date;
                return t.setDate(t.getDate() + n),
                t
            }
              , e = function(i) {
                try {
                    return n.datepicker.parseDate(n.datepicker._get(t, "dateFormat"), i, n.datepicker._getFormatConfig(t))
                } catch (h) {}
                for (var o = (i.toLowerCase().match(/^c/) ? n.datepicker._getDate(t) : null ) || new Date, f = o.getFullYear(), e = o.getMonth(), r = o.getDate(), s = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, u = s.exec(i); u; ) {
                    switch (u[2] || "d") {
                    case "d":
                    case "D":
                        r += parseInt(u[1], 10);
                        break;
                    case "w":
                    case "W":
                        r += parseInt(u[1], 10) * 7;
                        break;
                    case "m":
                    case "M":
                        e += parseInt(u[1], 10);
                        r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
                        break;
                    case "y":
                    case "Y":
                        f += parseInt(u[1], 10);
                        r = Math.min(r, n.datepicker._getDaysInMonth(f, e))
                    }
                    u = s.exec(i)
                }
                return new Date(f,e,r)
            }
              , u = i == null || i === "" ? r : typeof i == "string" ? e(i) : typeof i == "number" ? isNaN(i) ? r : f(i) : new Date(i.getTime());
            return u = u && u.toString() == "Invalid Date" ? r : u,
            u && (u.setHours(0),
            u.setMinutes(0),
            u.setSeconds(0),
            u.setMilliseconds(0)),
            this._daylightSavingAdjust(u)
        },
        _daylightSavingAdjust: function(n) {
            return n ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0),
            n) : null
        },
        _setDate: function(n, t, i) {
            var u = !t
              , f = n.selectedMonth
              , e = n.selectedYear
              , r = this._restrictMinMax(n, this._determineDate(n, t, new Date));
            n.selectedDay = n.currentDay = r.getDate();
            n.drawMonth = n.selectedMonth = n.currentMonth = r.getMonth();
            n.drawYear = n.selectedYear = n.currentYear = r.getFullYear();
            f == n.selectedMonth && e == n.selectedYear || i || this._notifyChange(n);
            this._adjustInstDate(n);
            n.input && n.input.val(u ? "" : this._formatDate(n))
        },
        _getDate: function(n) {
            return !n.currentYear || n.input && n.input.val() == "" ? null : this._daylightSavingAdjust(new Date(n.currentYear,n.currentMonth,n.currentDay))
        },
        _attachHandlers: function(t) {
            var u = this._get(t, "stepMonths")
              , i = "#" + t.id.replace(/\\\\/g, "\\");
            t.dpDiv.find("[data-handler]").map(function() {
                var t = {
                    prev: function() {
                        window["DP_jQuery_" + r].datepicker._adjustDate(i, -u, "M")
                    },
                    next: function() {
                        window["DP_jQuery_" + r].datepicker._adjustDate(i, +u, "M")
                    },
                    hide: function() {
                        window["DP_jQuery_" + r].datepicker._hideDatepicker()
                    },
                    today: function() {
                        window["DP_jQuery_" + r].datepicker._gotoToday(i)
                    },
                    selectDay: function() {
                        return window["DP_jQuery_" + r].datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                        !1
                    },
                    selectMonth: function() {
                        return window["DP_jQuery_" + r].datepicker._selectMonthYear(i, this, "M"),
                        !1
                    },
                    selectYear: function() {
                        return window["DP_jQuery_" + r].datepicker._selectMonthYear(i, this, "Y"),
                        !1
                    }
                };
                n(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(t) {
            var l = new Date, d, h, ut, c, p, ot, w, st, ht, ct, r, at, vt, s;
            l = this._daylightSavingAdjust(new Date(l.getFullYear(),l.getMonth(),l.getDate()));
            var e = this._get(t, "isRTL")
              , fi = this._get(t, "showButtonPanel")
              , pt = this._get(t, "hideIfNoPrevNext")
              , tt = this._get(t, "navigationAsDateFormat")
              , o = this._getNumberOfMonths(t)
              , ei = this._get(t, "showCurrentAtPos")
              , wt = this._get(t, "stepMonths")
              , it = o[0] != 1 || o[1] != 1
              , rt = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear,t.currentMonth,t.currentDay) : new Date(9999,9,9))
              , y = this._getMinMaxDate(t, "min")
              , a = this._getMinMaxDate(t, "max")
              , i = t.drawMonth - ei
              , u = t.drawYear;
            if (i < 0 && (i += 12,
            u--),
            a)
                for (d = this._daylightSavingAdjust(new Date(a.getFullYear(),a.getMonth() - o[0] * o[1] + 1,a.getDate())),
                d = y && d < y ? y : d; this._daylightSavingAdjust(new Date(u,i,1)) > d; )
                    i--,
                    i < 0 && (i = 11,
                    u--);
            t.drawMonth = i;
            t.drawYear = u;
            h = this._get(t, "prevText");
            h = tt ? this.formatDate(h, this._daylightSavingAdjust(new Date(u,i - wt,1)), this._getFormatConfig(t)) : h;
            ut = this._canAdjustMonth(t, -1, u, i) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + h + '"><span class="ui-icon ui-icon-circle-triangle-' + (e ? "e" : "w") + '">' + h + "<\/span><\/a>" : pt ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + h + '"><span class="ui-icon ui-icon-circle-triangle-' + (e ? "e" : "w") + '">' + h + "<\/span><\/a>";
            c = this._get(t, "nextText");
            c = tt ? this.formatDate(c, this._daylightSavingAdjust(new Date(u,i + wt,1)), this._getFormatConfig(t)) : c;
            var bt = this._canAdjustMonth(t, 1, u, i) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + c + '"><span class="ui-icon ui-icon-circle-triangle-' + (e ? "w" : "e") + '">' + c + "<\/span><\/a>" : pt ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + c + '"><span class="ui-icon ui-icon-circle-triangle-' + (e ? "w" : "e") + '">' + c + "<\/span><\/a>"
              , g = this._get(t, "currentText")
              , kt = this._get(t, "gotoCurrent") && t.currentDay ? rt : l;
            g = tt ? this.formatDate(g, kt, this._getFormatConfig(t)) : g;
            var dt = t.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(t, "closeText") + "<\/button>"
              , oi = fi ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (e ? dt : "") + (this._isInRange(t, kt) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + g + "<\/button>" : "") + (e ? "" : dt) + "<\/div>" : ""
              , v = parseInt(this._get(t, "firstDay"), 10);
            v = isNaN(v) ? 0 : v;
            var gt = this._get(t, "showWeek")
              , si = this._get(t, "dayNames")
              , vi = this._get(t, "dayNamesShort")
              , hi = this._get(t, "dayNamesMin")
              , ci = this._get(t, "monthNames")
              , li = this._get(t, "monthNamesShort")
              , ni = this._get(t, "beforeShowDay")
              , ft = this._get(t, "showOtherMonths")
              , ai = this._get(t, "selectOtherMonths")
              , yi = this._get(t, "calculateWeek") || this.iso8601Week
              , ti = this._getDefaultDate(t)
              , et = "";
            for (p = 0; p < o[0]; p++) {
                for (ot = "",
                this.maxRows = 4,
                w = 0; w < o[1]; w++) {
                    var ii = this._daylightSavingAdjust(new Date(u,i,t.selectedDay))
                      , b = " ui-corner-all"
                      , f = "";
                    if (it) {
                        if (f += '<div class="ui-datepicker-group',
                        o[1] > 1)
                            switch (w) {
                            case 0:
                                f += " ui-datepicker-group-first";
                                b = " ui-corner-" + (e ? "right" : "left");
                                break;
                            case o[1] - 1:
                                f += " ui-datepicker-group-last";
                                b = " ui-corner-" + (e ? "left" : "right");
                                break;
                            default:
                                f += " ui-datepicker-group-middle";
                                b = ""
                            }
                        f += '">'
                    }
                    for (f += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + b + '">' + (/all|left/.test(b) && p == 0 ? e ? bt : ut : "") + (/all|right/.test(b) && p == 0 ? e ? ut : bt : "") + this._generateMonthYearHeader(t, i, u, y, a, p > 0 || w > 0, ci, li) + '<\/div><table class="ui-datepicker-calendar"><thead><tr>',
                    st = gt ? '<th class="ui-datepicker-week-col">' + this._get(t, "weekHeader") + "<\/th>" : "",
                    s = 0; s < 7; s++)
                        ht = (s + v) % 7,
                        st += "<th" + ((s + v + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + si[ht] + '">' + hi[ht] + "<\/span><\/th>";
                    f += st + "<\/tr><\/thead><tbody>";
                    ct = this._getDaysInMonth(u, i);
                    u == t.selectedYear && i == t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, ct));
                    var ri = (this._getFirstDayOfMonth(u, i) - v + 7) % 7
                      , lt = Math.ceil((ri + ct) / 7)
                      , ui = it ? this.maxRows > lt ? this.maxRows : lt : lt;
                    for (this.maxRows = ui,
                    r = this._daylightSavingAdjust(new Date(u,i,1 - ri)),
                    at = 0; at < ui; at++) {
                        for (f += "<tr>",
                        vt = gt ? '<td class="ui-datepicker-week-col">' + this._get(t, "calculateWeek")(r) + "<\/td>" : "",
                        s = 0; s < 7; s++) {
                            var nt = ni ? ni.apply(t.input ? t.input[0] : null , [r]) : [!0, ""]
                              , k = r.getMonth() != i
                              , yt = k && !ai || !nt[0] || y && r < y || a && r > a;
                            vt += '<td class="' + ((s + v + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (k ? " ui-datepicker-other-month" : "") + (r.getTime() == ii.getTime() && i == t.selectedMonth && t._keyEvent || ti.getTime() == r.getTime() && ti.getTime() == ii.getTime() ? " " + this._dayOverClass : "") + (yt ? " " + this._unselectableClass + " ui-state-disabled" : "") + (k && !ft ? "" : " " + nt[1] + (r.getTime() == rt.getTime() ? " " + this._currentClass : "") + (r.getTime() == l.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!k || ft) && nt[2] ? ' title="' + nt[2] + '"' : "") + (yt ? "" : ' data-handler="selectDay" data-event="click" data-month="' + r.getMonth() + '" data-year="' + r.getFullYear() + '"') + ">" + (k && !ft ? "&#xa0;" : yt ? '<span class="ui-state-default">' + r.getDate() + "<\/span>" : '<a class="ui-state-default' + (r.getTime() == l.getTime() ? " ui-state-highlight" : "") + (r.getTime() == rt.getTime() ? " ui-state-active" : "") + (k ? " ui-priority-secondary" : "") + '" href="#">' + r.getDate() + "<\/a>") + "<\/td>";
                            r.setDate(r.getDate() + 1);
                            r = this._daylightSavingAdjust(r)
                        }
                        f += vt + "<\/tr>"
                    }
                    i++;
                    i > 11 && (i = 0,
                    u++);
                    f += "<\/tbody><\/table>" + (it ? "<\/div>" + (o[0] > 0 && w == o[1] - 1 ? '<div class="ui-datepicker-row-break"><\/div>' : "") : "");
                    ot += f
                }
                et += ot
            }
            return et += oi + (n.ui.ie6 && !t.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"><\/iframe>' : ""),
            t._keyEvent = !1,
            et
        },
        _generateMonthYearHeader: function(n, t, i, r, u, f, e, o) {
            var v = this._get(n, "changeMonth"), y = this._get(n, "changeYear"), p = this._get(n, "showMonthAfterYear"), c = '<div class="ui-datepicker-title">', l = "", w, b, h;
            if (f || !v)
                l += '<span class="ui-datepicker-month">' + e[t] + "<\/span>";
            else {
                for (w = r && r.getFullYear() == i,
                b = u && u.getFullYear() == i,
                l += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">',
                h = 0; h < 12; h++)
                    (!w || h >= r.getMonth()) && (!b || h <= u.getMonth()) && (l += '<option value="' + h + '"' + (h == t ? ' selected="selected"' : "") + ">" + o[h] + "<\/option>");
                l += "<\/select>"
            }
            if (p || (c += l + (f || !(v && y) ? "&#xa0;" : "")),
            !n.yearshtml)
                if (n.yearshtml = "",
                f || !y)
                    c += '<span class="ui-datepicker-year">' + i + "<\/span>";
                else {
                    var k = this._get(n, "yearRange").split(":")
                      , d = (new Date).getFullYear()
                      , g = function(n) {
                        var t = n.match(/c[+-].*/) ? i + parseInt(n.substring(1), 10) : n.match(/[+-].*/) ? d + parseInt(n, 10) : parseInt(n, 10);
                        return isNaN(t) ? d : t
                    }
                      , s = g(k[0])
                      , a = Math.max(s, g(k[1] || ""));
                    for (s = r ? Math.max(s, r.getFullYear()) : s,
                    a = u ? Math.min(a, u.getFullYear()) : a,
                    n.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; s <= a; s++)
                        n.yearshtml += '<option value="' + s + '"' + (s == i ? ' selected="selected"' : "") + ">" + s + "<\/option>";
                    n.yearshtml += "<\/select>";
                    c += n.yearshtml;
                    n.yearshtml = null
                }
            return c += this._get(n, "yearSuffix"),
            p && (c += (f || !(v && y) ? "&#xa0;" : "") + l),
            c + "<\/div>"
        },
        _adjustInstDate: function(n, t, i) {
            var u = n.drawYear + (i == "Y" ? t : 0)
              , f = n.drawMonth + (i == "M" ? t : 0)
              , e = Math.min(n.selectedDay, this._getDaysInMonth(u, f)) + (i == "D" ? t : 0)
              , r = this._restrictMinMax(n, this._daylightSavingAdjust(new Date(u,f,e)));
            n.selectedDay = r.getDate();
            n.drawMonth = n.selectedMonth = r.getMonth();
            n.drawYear = n.selectedYear = r.getFullYear();
            (i == "M" || i == "Y") && this._notifyChange(n)
        },
        _restrictMinMax: function(n, t) {
            var i = this._getMinMaxDate(n, "min")
              , r = this._getMinMaxDate(n, "max")
              , u = i && t < i ? i : t;
            return r && u > r ? r : u
        },
        _notifyChange: function(n) {
            var t = this._get(n, "onChangeMonthYear");
            t && t.apply(n.input ? n.input[0] : null , [n.selectedYear, n.selectedMonth + 1, n])
        },
        _getNumberOfMonths: function(n) {
            var t = this._get(n, "numberOfMonths");
            return t == null ? [1, 1] : typeof t == "number" ? [1, t] : t
        },
        _getMinMaxDate: function(n, t) {
            return this._determineDate(n, this._get(n, t + "Date"), null )
        },
        _getDaysInMonth: function(n, t) {
            return 32 - this._daylightSavingAdjust(new Date(n,t,32)).getDate()
        },
        _getFirstDayOfMonth: function(n, t) {
            return new Date(n,t,1).getDay()
        },
        _canAdjustMonth: function(n, t, i, r) {
            var f = this._getNumberOfMonths(n)
              , u = this._daylightSavingAdjust(new Date(i,r + (t < 0 ? t : f[0] * f[1]),1));
            return t < 0 && u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())),
            this._isInRange(n, u)
        },
        _isInRange: function(n, t) {
            var i = this._getMinMaxDate(n, "min")
              , r = this._getMinMaxDate(n, "max");
            return (!i || t.getTime() >= i.getTime()) && (!r || t.getTime() <= r.getTime())
        },
        _getFormatConfig: function(n) {
            var t = this._get(n, "shortYearCutoff");
            return t = typeof t != "string" ? t : (new Date).getFullYear() % 100 + parseInt(t, 10),
            {
                shortYearCutoff: t,
                dayNamesShort: this._get(n, "dayNamesShort"),
                dayNames: this._get(n, "dayNames"),
                monthNamesShort: this._get(n, "monthNamesShort"),
                monthNames: this._get(n, "monthNames")
            }
        },
        _formatDate: function(n, t, i, r) {
            t || (n.currentDay = n.selectedDay,
            n.currentMonth = n.selectedMonth,
            n.currentYear = n.selectedYear);
            var u = t ? typeof t == "object" ? t : this._daylightSavingAdjust(new Date(r,i,t)) : this._daylightSavingAdjust(new Date(n.currentYear,n.currentMonth,n.currentDay));
            return this.formatDate(this._get(n, "dateFormat"), u, this._getFormatConfig(n))
        }
    });
    n.fn.datepicker = function(t) {
        if (!this.length)
            return this;
        n.datepicker.initialized || (n(document).mousedown(n.datepicker._checkExternalClick).find(document.body).append(n.datepicker.dpDiv),
        n.datepicker.initialized = !0);
        var i = Array.prototype.slice.call(arguments, 1);
        return typeof t == "string" && (t == "isDisabled" || t == "getDate" || t == "widget") ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : t == "option" && arguments.length == 2 && typeof arguments[1] == "string" ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : this.each(function() {
            typeof t == "string" ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this].concat(i)) : n.datepicker._attachDatepicker(this, t)
        })
    }
    ;
    n.datepicker = new e;
    n.datepicker.initialized = !1;
    n.datepicker.uuid = (new Date).getTime();
    n.datepicker.version = "1.9.2";
    window["DP_jQuery_" + r] = n
}(jQuery),
function(n, t) {
    function r() {
        return ++f
    }
    function u(n) {
        return n.hash.length > 1 && n.href.replace(i, "") === location.href.replace(i, "").replace(/\s/g, "%20")
    }
    var f = 0
      , i = /#.*$/;
    n.widget("ui.tabs", {
        version: "1.9.2",
        delay: 300,
        options: {
            active: null ,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null ,
            show: null ,
            activate: null ,
            beforeActivate: null ,
            beforeLoad: null ,
            load: null
        },
        _create: function() {
            var u = this
              , i = this.options
              , t = i.active
              , r = location.hash.substring(1);
            this.running = !1;
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(t) {
                n(this).is(".ui-state-disabled") && t.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                n(this).closest("li").is(".ui-state-disabled") && this.blur()
            });
            this._processTabs();
            t === null && (r && this.tabs.each(function(i, u) {
                if (n(u).attr("aria-controls") === r)
                    return t = i,
                    !1
            }),
            t === null && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
            (t === null || t === -1) && (t = this.tabs.length ? 0 : !1));
            t !== !1 && (t = this.tabs.index(this.tabs.eq(t)),
            t === -1 && (t = i.collapsible ? !1 : 0));
            i.active = t;
            !i.collapsible && i.active === !1 && this.anchors.length && (i.active = 0);
            n.isArray(i.disabled) && (i.disabled = n.unique(i.disabled.concat(n.map(this.tabs.filter(".ui-state-disabled"), function(n) {
                return u.tabs.index(n)
            }))).sort());
            this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(this.options.active) : n();
            this._refresh();
            this.active.length && this.load(i.active)
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : n()
            }
        },
        _tabKeydown: function(t) {
            var r = n(this.document[0].activeElement).closest("li")
              , i = this.tabs.index(r)
              , u = !0;
            if (!this._handlePageNav(t)) {
                switch (t.keyCode) {
                case n.ui.keyCode.RIGHT:
                case n.ui.keyCode.DOWN:
                    i++;
                    break;
                case n.ui.keyCode.UP:
                case n.ui.keyCode.LEFT:
                    u = !1;
                    i--;
                    break;
                case n.ui.keyCode.END:
                    i = this.anchors.length - 1;
                    break;
                case n.ui.keyCode.HOME:
                    i = 0;
                    break;
                case n.ui.keyCode.SPACE:
                    t.preventDefault();
                    clearTimeout(this.activating);
                    this._activate(i);
                    return;
                case n.ui.keyCode.ENTER:
                    t.preventDefault();
                    clearTimeout(this.activating);
                    this._activate(i === this.options.active ? !1 : i);
                    return;
                default:
                    return
                }
                t.preventDefault();
                clearTimeout(this.activating);
                i = this._focusNextTab(i, u);
                t.ctrlKey || (r.attr("aria-selected", "false"),
                this.tabs.eq(i).attr("aria-selected", "true"),
                this.activating = this._delay(function() {
                    this.option("active", i)
                }, this.delay))
            }
        },
        _panelKeydown: function(t) {
            this._handlePageNav(t) || t.ctrlKey && t.keyCode === n.ui.keyCode.UP && (t.preventDefault(),
            this.active.focus())
        },
        _handlePageNav: function(t) {
            return t.altKey && t.keyCode === n.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
            !0) : t.altKey && t.keyCode === n.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
            !0) : void 0
        },
        _findNextTab: function(t, i) {
            function u() {
                return t > r && (t = 0),
                t < 0 && (t = r),
                t
            }
            for (var r = this.tabs.length - 1; n.inArray(u(), this.options.disabled) !== -1; )
                t = i ? t + 1 : t - 1;
            return t
        },
        _focusNextTab: function(n, t) {
            return n = this._findNextTab(n, t),
            this.tabs.eq(n).focus(),
            n
        },
        _setOption: function(n, t) {
            if (n === "active") {
                this._activate(t);
                return
            }
            if (n === "disabled") {
                this._setupDisabled(t);
                return
            }
            this._super(n, t);
            n === "collapsible" && (this.element.toggleClass("ui-tabs-collapsible", t),
            t || this.options.active !== !1 || this._activate(0));
            n === "event" && this._setupEvents(t);
            n === "heightStyle" && this._setupHeightStyle(t)
        },
        _tabId: function(n) {
            return n.attr("aria-controls") || "ui-tabs-" + r()
        },
        _sanitizeSelector: function(n) {
            return n ? n.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function() {
            var t = this.options
              , i = this.tablist.children(":has(a[href])");
            t.disabled = n.map(i.filter(".ui-state-disabled"), function(n) {
                return i.index(n)
            });
            this._processTabs();
            t.active !== !1 && this.anchors.length ? this.active.length && !n.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1,
            this.active = n()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1,
            this.active = n());
            this._refresh()
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled);
            this._setupEvents(this.options.event);
            this._setupHeightStyle(this.options.heightStyle);
            this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            });
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }),
            this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var t = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist");
            this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            });
            this.anchors = this.tabs.map(function() {
                return n("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            });
            this.panels = n();
            this.anchors.each(function(i, r) {
                var e, f, s, h = n(r).uniqueId().attr("id"), o = n(r).closest("li"), c = o.attr("aria-controls");
                u(r) ? (e = r.hash,
                f = t.element.find(t._sanitizeSelector(e))) : (s = t._tabId(o),
                e = "#" + s,
                f = t.element.find(e),
                f.length || (f = t._createPanel(s),
                f.insertAfter(t.panels[i - 1] || t.tablist)),
                f.attr("aria-live", "polite"));
                f.length && (t.panels = t.panels.add(f));
                c && o.data("ui-tabs-aria-controls", c);
                o.attr({
                    "aria-controls": e.substring(1),
                    "aria-labelledby": h
                });
                f.attr("aria-labelledby", h)
            });
            this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function() {
            return this.element.find("ol,ul").eq(0)
        },
        _createPanel: function(t) {
            return n("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function(t) {
            n.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
            for (var i = 0, r; r = this.tabs[i]; i++)
                t === !0 || n.inArray(i, t) !== -1 ? n(r).addClass("ui-state-disabled").attr("aria-disabled", "true") : n(r).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = t
        },
        _setupEvents: function(t) {
            var i = {
                click: function(n) {
                    n.preventDefault()
                }
            };
            t && n.each(t.split(" "), function(n, t) {
                i[t] = "_eventHandler"
            });
            this._off(this.anchors.add(this.tabs).add(this.panels));
            this._on(this.anchors, i);
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            });
            this._on(this.panels, {
                keydown: "_panelKeydown"
            });
            this._focusable(this.tabs);
            this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(t) {
            var i, u, r = this.element.parent();
            t === "fill" ? (n.support.minHeight || (u = r.css("overflow"),
            r.css("overflow", "hidden")),
            i = r.height(),
            this.element.siblings(":visible").each(function() {
                var t = n(this)
                  , r = t.css("position");
                r !== "absolute" && r !== "fixed" && (i -= t.outerHeight(!0))
            }),
            u && r.css("overflow", u),
            this.element.children().not(this.panels).each(function() {
                i -= n(this).outerHeight(!0)
            }),
            this.panels.each(function() {
                n(this).height(Math.max(0, i - n(this).innerHeight() + n(this).height()))
            }).css("overflow", "auto")) : t === "auto" && (i = 0,
            this.panels.each(function() {
                i = Math.max(i, n(this).height("").height())
            }).height(i))
        },
        _eventHandler: function(t) {
            var u = this.options
              , r = this.active
              , c = n(t.currentTarget)
              , i = c.closest("li")
              , f = i[0] === r[0]
              , e = f && u.collapsible
              , o = e ? n() : this._getPanelForTab(i)
              , s = r.length ? this._getPanelForTab(r) : n()
              , h = {
                oldTab: r,
                oldPanel: s,
                newTab: e ? n() : i,
                newPanel: o
            };
            (t.preventDefault(),
            i.hasClass("ui-state-disabled") || i.hasClass("ui-tabs-loading") || this.running || f && !u.collapsible || this._trigger("beforeActivate", t, h) === !1) || (u.active = e ? !1 : this.tabs.index(i),
            this.active = f ? n() : i,
            this.xhr && this.xhr.abort(),
            s.length || o.length || n.error("jQuery UI Tabs: Mismatching fragment identifier."),
            o.length && this.load(this.tabs.index(i), t),
            this._toggle(t, h))
        },
        _toggle: function(t, i) {
            function e() {
                u.running = !1;
                u._trigger("activate", t, i)
            }
            function o() {
                i.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
                r.length && u.options.show ? u._show(r, u.options.show, e) : (r.show(),
                e())
            }
            var u = this
              , r = i.newPanel
              , f = i.oldPanel;
            this.running = !0;
            f.length && this.options.hide ? this._hide(f, this.options.hide, function() {
                i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                o()
            }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),
            f.hide(),
            o());
            f.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            i.oldTab.attr("aria-selected", "false");
            r.length && f.length ? i.oldTab.attr("tabIndex", -1) : r.length && this.tabs.filter(function() {
                return n(this).attr("tabIndex") === 0
            }).attr("tabIndex", -1);
            r.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            });
            i.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function(t) {
            var r, i = this._findActive(t);
            i[0] !== this.active[0] && (i.length || (i = this.active),
            r = i.find(".ui-tabs-anchor")[0],
            this._eventHandler({
                target: r,
                currentTarget: r,
                preventDefault: n.noop
            }))
        },
        _findActive: function(t) {
            return t === !1 ? n() : this.tabs.eq(t)
        },
        _getIndex: function(n) {
            return typeof n == "string" && (n = this.anchors.index(this.anchors.filter("[href$='" + n + "']"))),
            n
        },
        _destroy: function() {
            this.xhr && this.xhr.abort();
            this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeData("href.tabs").removeData("load.tabs").removeUniqueId();
            this.tabs.add(this.panels).each(function() {
                n.data(this, "ui-tabs-destroy") ? n(this).remove() : n(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            });
            this.tabs.each(function() {
                var t = n(this)
                  , i = t.data("ui-tabs-aria-controls");
                i ? t.attr("aria-controls", i) : t.removeAttr("aria-controls")
            });
            this.panels.show();
            this.options.heightStyle !== "content" && this.panels.css("height", "")
        },
        enable: function(i) {
            var r = this.options.disabled;
            r !== !1 && (i === t ? r = !1 : (i = this._getIndex(i),
            r = n.isArray(r) ? n.map(r, function(n) {
                return n !== i ? n : null
            }) : n.map(this.tabs, function(n, t) {
                return t !== i ? t : null
            })),
            this._setupDisabled(r))
        },
        disable: function(i) {
            var r = this.options.disabled;
            if (r !== !0) {
                if (i === t)
                    r = !0;
                else {
                    if (i = this._getIndex(i),
                    n.inArray(i, r) !== -1)
                        return;
                    r = n.isArray(r) ? n.merge([i], r).sort() : [i]
                }
                this._setupDisabled(r)
            }
        },
        load: function(t, i) {
            t = this._getIndex(t);
            var f = this
              , r = this.tabs.eq(t)
              , o = r.find(".ui-tabs-anchor")
              , e = this._getPanelForTab(r)
              , s = {
                tab: r,
                panel: e
            };
            u(o[0]) || (this.xhr = n.ajax(this._ajaxSettings(o, i, s)),
            this.xhr && this.xhr.statusText !== "canceled" && (r.addClass("ui-tabs-loading"),
            e.attr("aria-busy", "true"),
            this.xhr.success(function(n) {
                setTimeout(function() {
                    e.html(n);
                    f._trigger("load", i, s)
                }, 1)
            }).complete(function(n, t) {
                setTimeout(function() {
                    t === "abort" && f.panels.stop(!1, !0);
                    r.removeClass("ui-tabs-loading");
                    e.removeAttr("aria-busy");
                    n === f.xhr && delete f.xhr
                }, 1)
            })))
        },
        _ajaxSettings: function(t, i, r) {
            var u = this;
            return {
                url: t.attr("href"),
                beforeSend: function(t, f) {
                    return u._trigger("beforeLoad", i, n.extend({
                        jqXHR: t,
                        ajaxSettings: f
                    }, r))
                }
            }
        },
        _getPanelForTab: function(t) {
            var i = n(t).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + i))
        }
    });
    n.uiBackCompat !== !1 && (n.ui.tabs.prototype._ui = function(n, t) {
        return {
            tab: n,
            panel: t,
            index: this.anchors.index(n)
        }
    }
    ,
    n.widget("ui.tabs", n.ui.tabs, {
        url: function(n, t) {
            this.anchors.eq(n).attr("href", t)
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        options: {
            ajaxOptions: null ,
            cache: !1
        },
        _create: function() {
            this._super();
            var t = this;
            this._on({
                tabsbeforeload: function(i, r) {
                    if (n.data(r.tab[0], "cache.tabs")) {
                        i.preventDefault();
                        return
                    }
                    r.jqXHR.success(function() {
                        t.options.cache && n.data(r.tab[0], "cache.tabs", !0)
                    })
                }
            })
        },
        _ajaxSettings: function(t, i, r) {
            var u = this.options.ajaxOptions;
            return n.extend({}, u, {
                error: function(n, t) {
                    try {
                        u.error(n, t, r.tab.closest("li").index(), r.tab[0])
                    } catch (i) {}
                }
            }, this._superApply(arguments))
        },
        _setOption: function(n, t) {
            n === "cache" && t === !1 && this.anchors.removeData("cache.tabs");
            this._super(n, t)
        },
        _destroy: function() {
            this.anchors.removeData("cache.tabs");
            this._super()
        },
        url: function(n) {
            this.anchors.eq(n).removeData("cache.tabs");
            this._superApply(arguments)
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        abort: function() {
            this.xhr && this.xhr.abort()
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        options: {
            spinner: "<em>Loading&#8230;<\/em>"
        },
        _create: function() {
            this._super();
            this._on({
                tabsbeforeload: function(n, t) {
                    if (n.target === this.element[0] && this.options.spinner) {
                        var i = t.tab.find("span")
                          , r = i.html();
                        i.html(this.options.spinner);
                        t.jqXHR.complete(function() {
                            i.html(r)
                        })
                    }
                }
            })
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        options: {
            enable: null ,
            disable: null
        },
        enable: function(t) {
            var i = this.options, r;
            (t && i.disabled === !0 || n.isArray(i.disabled) && n.inArray(t, i.disabled) !== -1) && (r = !0);
            this._superApply(arguments);
            r && this._trigger("enable", null , this._ui(this.anchors[t], this.panels[t]))
        },
        disable: function(t) {
            var i = this.options, r;
            (t && i.disabled === !1 || n.isArray(i.disabled) && n.inArray(t, i.disabled) === -1) && (r = !0);
            this._superApply(arguments);
            r && this._trigger("disable", null , this._ui(this.anchors[t], this.panels[t]))
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        options: {
            add: null ,
            remove: null ,
            tabTemplate: "<li><a href='#{href}'><span>#{label}<\/span><\/a><\/li>"
        },
        add: function(i, r, u) {
            u === t && (u = this.anchors.length);
            var s, f, o = this.options, e = n(o.tabTemplate.replace(/#\{href\}/g, i).replace(/#\{label\}/g, r)), h = i.indexOf("#") ? this._tabId(e) : i.replace("#", "");
            return e.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy", !0),
            e.attr("aria-controls", h),
            s = u >= this.tabs.length,
            f = this.element.find("#" + h),
            f.length || (f = this._createPanel(h),
            s ? u > 0 ? f.insertAfter(this.panels.eq(-1)) : f.appendTo(this.element) : f.insertBefore(this.panels[u])),
            f.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide(),
            s ? e.appendTo(this.tablist) : e.insertBefore(this.tabs[u]),
            o.disabled = n.map(o.disabled, function(n) {
                return n >= u ? ++n : n
            }),
            this.refresh(),
            this.tabs.length === 1 && o.active === !1 && this.option("active", 0),
            this._trigger("add", null , this._ui(this.anchors[u], this.panels[u])),
            this
        },
        remove: function(t) {
            t = this._getIndex(t);
            var r = this.options
              , i = this.tabs.eq(t).remove()
              , u = this._getPanelForTab(i).remove();
            return i.hasClass("ui-tabs-active") && this.anchors.length > 2 && this._activate(t + (t + 1 < this.anchors.length ? 1 : -1)),
            r.disabled = n.map(n.grep(r.disabled, function(n) {
                return n !== t
            }), function(n) {
                return n >= t ? --n : n
            }),
            this.refresh(),
            this._trigger("remove", null , this._ui(i.find("a")[0], u[0])),
            this
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        length: function() {
            return this.anchors.length
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        options: {
            idPrefix: "ui-tabs-"
        },
        _tabId: function(t) {
            var i = t.is("li") ? t.find("a[href]") : t;
            return i = i[0],
            n(i).closest("li").attr("aria-controls") || i.title && i.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF\-]/g, "") || this.options.idPrefix + r()
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        options: {
            panelTemplate: "<div><\/div>"
        },
        _createPanel: function(t) {
            return n(this.options.panelTemplate).attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        _create: function() {
            var n = this.options;
            n.active === null && n.selected !== t && (n.active = n.selected === -1 ? !1 : n.selected);
            this._super();
            n.selected = n.active;
            n.selected === !1 && (n.selected = -1)
        },
        _setOption: function(n, t) {
            if (n !== "selected")
                return this._super(n, t);
            var i = this.options;
            this._super("active", t === -1 ? !1 : t);
            i.selected = i.active;
            i.selected === !1 && (i.selected = -1)
        },
        _eventHandler: function() {
            this._superApply(arguments);
            this.options.selected = this.options.active;
            this.options.selected === !1 && (this.options.selected = -1)
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        options: {
            show: null ,
            select: null
        },
        _create: function() {
            this._super();
            this.options.active !== !1 && this._trigger("show", null , this._ui(this.active.find(".ui-tabs-anchor")[0], this._getPanelForTab(this.active)[0]))
        },
        _trigger: function(n, t, i) {
            var u, f, r = this._superApply(arguments);
            return r ? (n === "beforeActivate" ? (u = i.newTab.length ? i.newTab : i.oldTab,
            f = i.newPanel.length ? i.newPanel : i.oldPanel,
            r = this._super("select", t, {
                tab: u.find(".ui-tabs-anchor")[0],
                panel: f[0],
                index: u.closest("li").index()
            })) : n === "activate" && i.newTab.length && (r = this._super("show", t, {
                tab: i.newTab.find(".ui-tabs-anchor")[0],
                panel: i.newPanel[0],
                index: i.newTab.closest("li").index()
            })),
            r) : !1
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        select: function(n) {
            if (n = this._getIndex(n),
            n === -1)
                if (this.options.collapsible && this.options.selected !== -1)
                    n = this.options.selected;
                else
                    return;
            this.anchors.eq(n).trigger(this.options.event + this.eventNamespace)
        }
    }),
    function() {
        var t = 0;
        n.widget("ui.tabs", n.ui.tabs, {
            options: {
                cookie: null
            },
            _create: function() {
                var t = this.options, n;
                t.active == null && t.cookie && (n = parseInt(this._cookie(), 10),
                n === -1 && (n = !1),
                t.active = n);
                this._super()
            },
            _cookie: function(i) {
                var r = [this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + ++t)];
                return arguments.length && (r.push(i === !1 ? -1 : i),
                r.push(this.options.cookie)),
                n.cookie.apply(null , r)
            },
            _refresh: function() {
                this._super();
                this.options.cookie && this._cookie(this.options.active, this.options.cookie)
            },
            _eventHandler: function() {
                this._superApply(arguments);
                this.options.cookie && this._cookie(this.options.active, this.options.cookie)
            },
            _destroy: function() {
                this._super();
                this.options.cookie && this._cookie(null , this.options.cookie)
            }
        })
    }(),
    n.widget("ui.tabs", n.ui.tabs, {
        _trigger: function(t, i, r) {
            var u = n.extend({}, r);
            return t === "load" && (u.panel = u.panel[0],
            u.tab = u.tab.find(".ui-tabs-anchor")[0]),
            this._super(t, i, u)
        }
    }),
    n.widget("ui.tabs", n.ui.tabs, {
        options: {
            fx: null
        },
        _getFx: function() {
            var i, r, t = this.options.fx;
            return t && (n.isArray(t) ? (i = t[0],
            r = t[1]) : i = r = t),
            t ? {
                show: r,
                hide: i
            } : null
        },
        _toggle: function(n, t) {
            function e() {
                r.running = !1;
                r._trigger("activate", n, t)
            }
            function o() {
                t.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
                u.length && i.show ? u.animate(i.show, i.show.duration, function() {
                    e()
                }) : (u.show(),
                e())
            }
            var r = this
              , u = t.newPanel
              , f = t.oldPanel
              , i = this._getFx();
            if (!i)
                return this._super(n, t);
            r.running = !0;
            f.length && i.hide ? f.animate(i.hide, i.hide.duration, function() {
                t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                o()
            }) : (t.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),
            f.hide(),
            o())
        }
    }))
}(jQuery);
jQuery.effects || function(n, t) {
    var i = n.uiBackCompat !== !1
      , r = "ui-effects-";
    n.effects = {
        effect: {}
    },
    function(t, i) {
        function o(n, t, i) {
            var r = h[t.type] || {};
            return n == null ? i || !t.def ? null : t.def : (n = r.floor ? ~~n : parseFloat(n),
            isNaN(n)) ? t.def : r.mod ? (n + r.mod) % r.mod : 0 > n ? 0 : r.max < n ? r.max : n
        }
        function a(n) {
            var i = r()
              , o = i._rgba = [];
            return (n = n.toLowerCase(),
            u(p, function(t, r) {
                var u, s = r.re.exec(n), h = s && r.parse(s), e = r.space || "rgba";
                if (h)
                    return u = i[e](h),
                    i[f[e].cache] = u[f[e].cache],
                    o = i._rgba = u._rgba,
                    !1
            }),
            o.length) ? (o.join() === "0,0,0,0" && t.extend(o, e.transparent),
            i) : e[n]
        }
        function s(n, t, i) {
            return (i = (i + 1) % 1,
            i * 6 < 1) ? n + (t - n) * i * 6 : i * 2 < 1 ? t : i * 3 < 2 ? n + (t - n) * (2 / 3 - i) * 6 : n
        }
        var v = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "), y = /^([\-+])=\s*(\d+\.?\d*)/, p = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            parse: function(n) {
                return [n[1], n[2], n[3], n[4]]
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            parse: function(n) {
                return [n[1] * 2.55, n[2] * 2.55, n[3] * 2.55, n[4]]
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(n) {
                return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(n) {
                return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)]
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(n) {
                return [n[1], n[2] / 100, n[3] / 100, n[4]]
            }
        }], r = t.Color = function(n, i, r, u) {
            return new t.Color.fn.parse(n,i,r,u)
        }
        , f = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        }, h = {
            byte: {
                floor: !0,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: !0
            }
        }, c = r.support = {}, l = t("<p>")[0], e, u = t.each;
        l.style.cssText = "background-color:rgba(1,1,1,.5)";
        c.rgba = l.style.backgroundColor.indexOf("rgba") > -1;
        u(f, function(n, t) {
            t.cache = "_" + n;
            t.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        });
        r.fn = t.extend(r.prototype, {
            parse: function(s, h, c, l) {
                if (s === i)
                    return this._rgba = [null , null , null , null ],
                    this;
                (s.jquery || s.nodeType) && (s = t(s).css(h),
                h = i);
                var v = this
                  , y = t.type(s)
                  , p = this._rgba = [];
                return (h !== i && (s = [s, h, c, l],
                y = "array"),
                y === "string") ? this.parse(a(s) || e._default) : y === "array" ? (u(f.rgba.props, function(n, t) {
                    p[t.idx] = o(s[t.idx], t)
                }),
                this) : y === "object" ? (s instanceof r ? u(f, function(n, t) {
                    s[t.cache] && (v[t.cache] = s[t.cache].slice())
                }) : u(f, function(t, i) {
                    var r = i.cache;
                    u(i.props, function(n, t) {
                        if (!v[r] && i.to) {
                            if (n === "alpha" || s[n] == null )
                                return;
                            v[r] = i.to(v._rgba)
                        }
                        v[r][t.idx] = o(s[n], t, !0)
                    });
                    v[r] && n.inArray(null , v[r].slice(0, 3)) < 0 && (v[r][3] = 1,
                    i.from && (v._rgba = i.from(v[r])))
                }),
                this) : void 0
            },
            is: function(n) {
                var e = r(n)
                  , t = !0
                  , i = this;
                return u(f, function(n, r) {
                    var o, f = e[r.cache];
                    return f && (o = i[r.cache] || r.to && r.to(i._rgba) || [],
                    u(r.props, function(n, i) {
                        if (f[i.idx] != null )
                            return t = f[i.idx] === o[i.idx]
                    })),
                    t
                }),
                t
            },
            _space: function() {
                var n = []
                  , t = this;
                return u(f, function(i, r) {
                    t[r.cache] && n.push(i)
                }),
                n.pop()
            },
            transition: function(n, t) {
                var i = r(n)
                  , c = i._space()
                  , e = f[c]
                  , l = this.alpha() === 0 ? r("transparent") : this
                  , a = l[e.cache] || e.to(l._rgba)
                  , s = a.slice();
                return i = i[e.cache],
                u(e.props, function(n, r) {
                    var c = r.idx
                      , u = a[c]
                      , f = i[c]
                      , e = h[r.type] || {};
                    f !== null && (u === null ? s[c] = f : (e.mod && (f - u > e.mod / 2 ? u += e.mod : u - f > e.mod / 2 && (u -= e.mod)),
                    s[c] = o((f - u) * t + u, r)))
                }),
                this[c](s)
            },
            blend: function(n) {
                if (this._rgba[3] === 1)
                    return this;
                var i = this._rgba.slice()
                  , u = i.pop()
                  , f = r(n)._rgba;
                return r(t.map(i, function(n, t) {
                    return (1 - u) * f[t] + u * n
                }))
            },
            toRgbaString: function() {
                var i = "rgba("
                  , n = t.map(this._rgba, function(n, t) {
                    return n == null ? t > 2 ? 1 : 0 : n
                });
                return n[3] === 1 && (n.pop(),
                i = "rgb("),
                i + n.join() + ")"
            },
            toHslaString: function() {
                var i = "hsla("
                  , n = t.map(this.hsla(), function(n, t) {
                    return n == null && (n = t > 2 ? 1 : 0),
                    t && t < 3 && (n = Math.round(n * 100) + "%"),
                    n
                });
                return n[3] === 1 && (n.pop(),
                i = "hsl("),
                i + n.join() + ")"
            },
            toHexString: function(n) {
                var i = this._rgba.slice()
                  , r = i.pop();
                return n && i.push(~~(r * 255)),
                "#" + t.map(i, function(n) {
                    return n = (n || 0).toString(16),
                    n.length === 1 ? "0" + n : n
                }).join("")
            },
            toString: function() {
                return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
            }
        });
        r.fn.parse.prototype = r.fn;
        f.hsla.to = function(n) {
            if (n[0] == null || n[1] == null || n[2] == null )
                return [null , null , null , n[3]];
            var t = n[0] / 255, i = n[1] / 255, e = n[2] / 255, h = n[3], r = Math.max(t, i, e), o = Math.min(t, i, e), u = r - o, s = r + o, f = s * .5, c, l;
            return c = o === r ? 0 : t === r ? 60 * (i - e) / u + 360 : i === r ? 60 * (e - t) / u + 120 : 60 * (t - i) / u + 240,
            l = f === 0 || f === 1 ? f : f <= .5 ? u / s : u / (2 - s),
            [Math.round(c) % 360, l, f, h == null ? 1 : h]
        }
        ;
        f.hsla.from = function(n) {
            if (n[0] == null || n[1] == null || n[2] == null )
                return [null , null , null , n[3]];
            var r = n[0] / 360
              , u = n[1]
              , t = n[2]
              , e = n[3]
              , i = t <= .5 ? t * (1 + u) : t + u - t * u
              , f = 2 * t - i;
            return [Math.round(s(f, i, r + 1 / 3) * 255), Math.round(s(f, i, r) * 255), Math.round(s(f, i, r - 1 / 3) * 255), e]
        }
        ;
        u(f, function(n, f) {
            var s = f.props
              , e = f.cache
              , h = f.to
              , c = f.from;
            r.fn[n] = function(n) {
                if (h && !this[e] && (this[e] = h(this._rgba)),
                n === i)
                    return this[e].slice();
                var l, a = t.type(n), v = a === "array" || a === "object" ? n : arguments, f = this[e].slice();
                return u(s, function(n, t) {
                    var i = v[a === "object" ? n : t.idx];
                    i == null && (i = f[t.idx]);
                    f[t.idx] = o(i, t)
                }),
                c ? (l = r(c(f)),
                l[e] = f,
                l) : r(f)
            }
            ;
            u(s, function(i, u) {
                r.fn[i] || (r.fn[i] = function(r) {
                    var f = t.type(r), h = i === "alpha" ? this._hsla ? "hsla" : "rgba" : n, o = this[h](), s = o[u.idx], e;
                    return f === "undefined" ? s : (f === "function" && (r = r.call(this, s),
                    f = t.type(r)),
                    r == null && u.empty) ? this : (f === "string" && (e = y.exec(r),
                    e && (r = s + parseFloat(e[2]) * (e[1] === "+" ? 1 : -1))),
                    o[u.idx] = r,
                    this[h](o))
                }
                )
            })
        });
        u(v, function(n, i) {
            t.cssHooks[i] = {
                set: function(n, u) {
                    var o, f, e = "";
                    if (t.type(u) !== "string" || (o = a(u))) {
                        if (u = r(o || u),
                        !c.rgba && u._rgba[3] !== 1) {
                            for (f = i === "backgroundColor" ? n.parentNode : n; (e === "" || e === "transparent") && f && f.style; )
                                try {
                                    e = t.css(f, "backgroundColor");
                                    f = f.parentNode
                                } catch (s) {}
                            u = u.blend(e && e !== "transparent" ? e : "_default")
                        }
                        u = u.toRgbaString()
                    }
                    try {
                        n.style[i] = u
                    } catch (h) {}
                }
            };
            t.fx.step[i] = function(n) {
                n.colorInit || (n.start = r(n.elem, i),
                n.end = r(n.end),
                n.colorInit = !0);
                t.cssHooks[i].set(n.elem, n.start.transition(n.end, n.pos))
            }
        });
        t.cssHooks.borderColor = {
            expand: function(n) {
                var t = {};
                return u(["Top", "Right", "Bottom", "Left"], function(i, r) {
                    t["border" + r + "Color"] = n
                }),
                t
            }
        };
        e = t.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null , null , null , 0],
            _default: "#ffffff"
        }
    }(jQuery),
    function() {
        function i() {
            var t = this.ownerDocument.defaultView ? this.ownerDocument.defaultView.getComputedStyle(this, null ) : this.currentStyle, r = {}, i, u;
            if (t && t.length && t[0] && t[t[0]])
                for (u = t.length; u--; )
                    i = t[u],
                    typeof t[i] == "string" && (r[n.camelCase(i)] = t[i]);
            else
                for (i in t)
                    typeof t[i] == "string" && (r[i] = t[i]);
            return r
        }
        function f(t, i) {
            var e = {}, r, f;
            for (r in i)
                f = i[r],
                t[r] !== f && (u[r] || (n.fx.step[r] || !isNaN(parseFloat(f))) && (e[r] = f));
            return e
        }
        var r = ["add", "remove", "toggle"]
          , u = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        n.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
            n.fx.step[i] = function(n) {
                (n.end === "none" || n.setAttr) && (n.pos !== 1 || n.setAttr) || (jQuery.style(n.elem, i, n.end),
                n.setAttr = !0)
            }
        });
        n.effects.animateClass = function(t, u, e, o) {
            var s = n.speed(u, e, o);
            return this.queue(function() {
                var e = n(this), h = e.attr("class") || "", o, u = s.children ? e.find("*").andSelf() : e;
                u = u.map(function() {
                    var t = n(this);
                    return {
                        el: t,
                        start: i.call(this)
                    }
                });
                o = function() {
                    n.each(r, function(n, i) {
                        t[i] && e[i + "Class"](t[i])
                    })
                }
                ;
                o();
                u = u.map(function() {
                    return this.end = i.call(this.el[0]),
                    this.diff = f(this.start, this.end),
                    this
                });
                e.attr("class", h);
                u = u.map(function() {
                    var i = this
                      , t = n.Deferred()
                      , r = jQuery.extend({}, s, {
                        queue: !1,
                        complete: function() {
                            t.resolve(i)
                        }
                    });
                    return this.el.animate(this.diff, r),
                    t.promise()
                });
                n.when.apply(n, u.get()).done(function() {
                    o();
                    n.each(arguments, function() {
                        var t = this.el;
                        n.each(this.diff, function(n) {
                            t.css(n, "")
                        })
                    });
                    s.complete.call(e[0])
                })
            })
        }
        ;
        n.fn.extend({
            _addClass: n.fn.addClass,
            addClass: function(t, i, r, u) {
                return i ? n.effects.animateClass.call(this, {
                    add: t
                }, i, r, u) : this._addClass(t)
            },
            _removeClass: n.fn.removeClass,
            removeClass: function(t, i, r, u) {
                return i ? n.effects.animateClass.call(this, {
                    remove: t
                }, i, r, u) : this._removeClass(t)
            },
            _toggleClass: n.fn.toggleClass,
            toggleClass: function(i, r, u, f, e) {
                return typeof r == "boolean" || r === t ? u ? n.effects.animateClass.call(this, r ? {
                    add: i
                } : {
                    remove: i
                }, u, f, e) : this._toggleClass(i, r) : n.effects.animateClass.call(this, {
                    toggle: i
                }, r, u, f)
            },
            switchClass: function(t, i, r, u, f) {
                return n.effects.animateClass.call(this, {
                    add: i,
                    remove: t
                }, r, u, f)
            }
        })
    }(),
    function() {
        function u(t, i, r, u) {
            return n.isPlainObject(t) && (i = t,
            t = t.effect),
            t = {
                effect: t
            },
            i == null && (i = {}),
            n.isFunction(i) && (u = i,
            r = null ,
            i = {}),
            (typeof i == "number" || n.fx.speeds[i]) && (u = r,
            r = i,
            i = {}),
            n.isFunction(r) && (u = r,
            r = null ),
            i && n.extend(t, i),
            r = r || i.duration,
            t.duration = n.fx.off ? 0 : typeof r == "number" ? r : r in n.fx.speeds ? n.fx.speeds[r] : n.fx.speeds._default,
            t.complete = u || i.complete,
            t
        }
        function f(t) {
            return !t || typeof t == "number" || n.fx.speeds[t] ? !0 : typeof t == "string" && !n.effects.effect[t] ? i && n.effects[t] ? !1 : !0 : !1
        }
        n.extend(n.effects, {
            version: "1.9.2",
            save: function(n, t) {
                for (var i = 0; i < t.length; i++)
                    t[i] !== null && n.data(r + t[i], n[0].style[t[i]])
            },
            restore: function(n, i) {
                for (var f, u = 0; u < i.length; u++)
                    i[u] !== null && (f = n.data(r + i[u]),
                    f === t && (f = ""),
                    n.css(i[u], f))
            },
            setMode: function(n, t) {
                return t === "toggle" && (t = n.is(":hidden") ? "show" : "hide"),
                t
            },
            getBaseline: function(n, t) {
                var i, r;
                switch (n[0]) {
                case "top":
                    i = 0;
                    break;
                case "middle":
                    i = .5;
                    break;
                case "bottom":
                    i = 1;
                    break;
                default:
                    i = n[0] / t.height
                }
                switch (n[1]) {
                case "left":
                    r = 0;
                    break;
                case "center":
                    r = .5;
                    break;
                case "right":
                    r = 1;
                    break;
                default:
                    r = n[1] / t.width
                }
                return {
                    x: r,
                    y: i
                }
            },
            createWrapper: function(t) {
                if (t.parent().is(".ui-effects-wrapper"))
                    return t.parent();
                var i = {
                    width: t.outerWidth(!0),
                    height: t.outerHeight(!0),
                    float: t.css("float")
                }
                  , u = n("<div><\/div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                })
                  , f = {
                    width: t.width(),
                    height: t.height()
                }
                  , r = document.activeElement;
                try {
                    r.id
                } catch (e) {
                    r = document.body
                }
                return t.wrap(u),
                (t[0] === r || n.contains(t[0], r)) && n(r).focus(),
                u = t.parent(),
                t.css("position") === "static" ? (u.css({
                    position: "relative"
                }),
                t.css({
                    position: "relative"
                })) : (n.extend(i, {
                    position: t.css("position"),
                    zIndex: t.css("z-index")
                }),
                n.each(["top", "left", "bottom", "right"], function(n, r) {
                    i[r] = t.css(r);
                    isNaN(parseInt(i[r], 10)) && (i[r] = "auto")
                }),
                t.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })),
                t.css(f),
                u.css(i).show()
            },
            removeWrapper: function(t) {
                var i = document.activeElement;
                return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t),
                (t[0] === i || n.contains(t[0], i)) && n(i).focus()),
                t
            },
            setTransition: function(t, i, r, u) {
                return u = u || {},
                n.each(i, function(n, i) {
                    var f = t.cssUnit(i);
                    f[0] > 0 && (u[i] = f[0] * r + f[1])
                }),
                u
            }
        });
        n.fn.extend({
            effect: function() {
                function s(i) {
                    function o() {
                        n.isFunction(f) && f.call(u[0]);
                        n.isFunction(i) && i()
                    }
                    var u = n(this)
                      , f = t.complete
                      , e = t.mode;
                    (u.is(":hidden") ? e === "hide" : e === "show") ? o() : r.call(u[0], t, o)
                }
                var t = u.apply(this, arguments)
                  , f = t.mode
                  , e = t.queue
                  , r = n.effects.effect[t.effect]
                  , o = !r && i && n.effects[t.effect];
                return n.fx.off || !(r || o) ? f ? this[f](t.duration, t.complete) : this.each(function() {
                    t.complete && t.complete.call(this)
                }) : r ? e === !1 ? this.each(s) : this.queue(e || "fx", s) : o.call(this, {
                    options: t,
                    duration: t.duration,
                    callback: t.complete,
                    mode: t.mode
                })
            },
            _show: n.fn.show,
            show: function(n) {
                if (f(n))
                    return this._show.apply(this, arguments);
                var t = u.apply(this, arguments);
                return t.mode = "show",
                this.effect.call(this, t)
            },
            _hide: n.fn.hide,
            hide: function(n) {
                if (f(n))
                    return this._hide.apply(this, arguments);
                var t = u.apply(this, arguments);
                return t.mode = "hide",
                this.effect.call(this, t)
            },
            __toggle: n.fn.toggle,
            toggle: function(t) {
                if (f(t) || typeof t == "boolean" || n.isFunction(t))
                    return this.__toggle.apply(this, arguments);
                var i = u.apply(this, arguments);
                return i.mode = "toggle",
                this.effect.call(this, i)
            },
            cssUnit: function(t) {
                var i = this.css(t)
                  , r = [];
                return n.each(["em", "px", "%", "pt"], function(n, t) {
                    i.indexOf(t) > 0 && (r = [parseFloat(i), t])
                }),
                r
            }
        })
    }(),
    function() {
        var t = {};
        n.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(n, i) {
            t[i] = function(t) {
                return Math.pow(t, n + 2)
            }
        });
        n.extend(t, {
            Sine: function(n) {
                return 1 - Math.cos(n * Math.PI / 2)
            },
            Circ: function(n) {
                return 1 - Math.sqrt(1 - n * n)
            },
            Elastic: function(n) {
                return n === 0 || n === 1 ? n : -Math.pow(2, 8 * (n - 1)) * Math.sin(((n - 1) * 80 - 7.5) * Math.PI / 15)
            },
            Back: function(n) {
                return n * n * (3 * n - 2)
            },
            Bounce: function(n) {
                for (var t, i = 4; n < ((t = Math.pow(2, --i)) - 1) / 11; )
                    ;
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((t * 3 - 2) / 22 - n, 2)
            }
        });
        n.each(t, function(t, i) {
            n.easing["easeIn" + t] = i;
            n.easing["easeOut" + t] = function(n) {
                return 1 - i(1 - n)
            }
            ;
            n.easing["easeInOut" + t] = function(n) {
                return n < .5 ? i(n * 2) / 2 : 1 - i(n * -2 + 2) / 2
            }
        })
    }()
}(jQuery),
function(n) {
    var t = /up|down|vertical/
      , i = /up|left|vertical|horizontal/;
    n.effects.effect.blind = function(r, u) {
        var f = n(this), c = ["position", "top", "bottom", "left", "right", "height", "width"], p = n.effects.setMode(f, r.mode || "hide"), w = r.direction || "up", o = t.test(w), l = o ? "height" : "width", a = o ? "top" : "left", b = i.test(w), v = {}, y = p === "show", e, s, h;
        f.parent().is(".ui-effects-wrapper") ? n.effects.save(f.parent(), c) : n.effects.save(f, c);
        f.show();
        e = n.effects.createWrapper(f).css({
            overflow: "hidden"
        });
        s = e[l]();
        h = parseFloat(e.css(a)) || 0;
        v[l] = y ? s : 0;
        b || (f.css(o ? "bottom" : "right", 0).css(o ? "top" : "left", "auto").css({
            position: "absolute"
        }),
        v[a] = y ? h : s + h);
        y && (e.css(l, 0),
        b || e.css(a, h + s));
        e.animate(v, {
            duration: r.duration,
            easing: r.easing,
            queue: !1,
            complete: function() {
                p === "hide" && f.hide();
                n.effects.restore(f, c);
                n.effects.removeWrapper(f);
                u()
            }
        })
    }
}(jQuery),
function(n) {
    n.effects.effect.fade = function(t, i) {
        var r = n(this)
          , u = n.effects.setMode(r, t.mode || "toggle");
        r.animate({
            opacity: u
        }, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: i
        })
    }
}(jQuery),
function(n) {
    n.effects.effect.slide = function(t, i) {
        var r = n(this), s = ["position", "top", "bottom", "left", "right", "width", "height"], h = n.effects.setMode(r, t.mode || "show"), c = h === "show", f = t.direction || "left", e = f === "up" || f === "down" ? "top" : "left", o = f === "up" || f === "left", u, l = {};
        n.effects.save(r, s);
        r.show();
        u = t.distance || r[e === "top" ? "outerHeight" : "outerWidth"](!0);
        n.effects.createWrapper(r).css({
            overflow: "hidden"
        });
        c && r.css(e, o ? isNaN(u) ? "-" + u : -u : u);
        l[e] = (c ? o ? "+=" : "-=" : o ? "-=" : "+=") + u;
        r.animate(l, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                h === "hide" && r.hide();
                n.effects.restore(r, s);
                n.effects.removeWrapper(r);
                i()
            }
        })
    }
}(jQuery),
function() {
    var r;
    TrimPath == null && (TrimPath = {});
    TrimPath.evalEx == null && (TrimPath.evalEx = function(src) {
        return eval(src)
    }
    );
    Array.prototype.pop == null && (Array.prototype.pop = function() {
        return this.length === 0 ? r : this[--this.length]
    }
    );
    Array.prototype.push == null && (Array.prototype.push = function() {
        for (var n = 0; n < arguments.length; ++n)
            this[this.length] = arguments[n];
        return this.length
    }
    );
    TrimPath.parseTemplate = function(n, t, i) {
        i == null && (i = TrimPath.parseTemplate_etc);
        var r = u(n, t, i)
          , f = TrimPath.evalEx(r, t, 1);
        return f != null ? new i.Template(t,n,r,f,i) : null
    }
    ;
    try {
        String.prototype.process = function(n, t) {
            var i = TrimPath.parseTemplate(this, null );
            return i != null ? i.process(n, t) : this
        }
    } catch (h) {}
    TrimPath.parseTemplate_etc = {};
    TrimPath.parseTemplate_etc.statementTag = "forelse|for|if|elseif|else|var|macro";
    TrimPath.parseTemplate_etc.statementDef = {
        "if": {
            delta: 1,
            prefix: "if (",
            suffix: ") {",
            paramMin: 1
        },
        "else": {
            delta: 0,
            prefix: "} else {"
        },
        elseif: {
            delta: 0,
            prefix: "} else if (",
            suffix: ") {",
            paramDefault: "true"
        },
        "/if": {
            delta: -1,
            prefix: "}"
        },
        "for": {
            delta: 1,
            paramMin: 3,
            prefixFunc: function(n, t, i, r) {
                if (n[2] != "in")
                    throw new r.ParseError(i,t.line,"bad for loop statement: " + n.join(" "));
                var u = n[1]
                  , f = "__LIST__" + u;
                return ["var ", f, " = ", n[3], ";", "var __LENGTH_STACK__;", "if (typeof(__LENGTH_STACK__) == 'undefined' || !__LENGTH_STACK__.length) __LENGTH_STACK__ = new Array();", "__LENGTH_STACK__[__LENGTH_STACK__.length] = 0;", "if ((", f, ") != null) { ", "var ", u, "_ct = 0;", "for (var ", u, "_index in ", f, ") { ", u, "_ct++;", "if (typeof(", f, "[", u, "_index]) == 'function') {continue;}", "__LENGTH_STACK__[__LENGTH_STACK__.length - 1]++;", "var ", u, " = ", f, "[", u, "_index];"].join("")
            }
        },
        forelse: {
            delta: 0,
            prefix: "} } if (__LENGTH_STACK__[__LENGTH_STACK__.length - 1] == 0) { if (",
            suffix: ") {",
            paramDefault: "true"
        },
        "/for": {
            delta: -1,
            prefix: "} }; delete __LENGTH_STACK__[__LENGTH_STACK__.length - 1];"
        },
        "var": {
            delta: 0,
            prefix: "var ",
            suffix: ";"
        },
        macro: {
            delta: 1,
            prefixFunc: function(n) {
                var t = n[1].split("(")[0];
                return ["var ", t, " = function", n.slice(1).join(" ").substring(t.length), "{ var _OUT_arr = []; var _OUT = { write: function(m) { if (m) _OUT_arr.push(m); } }; "].join("")
            }
        },
        "/macro": {
            delta: -1,
            prefix: " return _OUT_arr.join(''); };"
        }
    };
    TrimPath.parseTemplate_etc.modifierDef = {
        eat: function() {
            return ""
        },
        escape: function(n) {
            return String(n).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        },
        capitalize: function(n) {
            return String(n).toUpperCase()
        },
        "default": function(n, t) {
            return n != null ? n : t
        }
    };
    TrimPath.parseTemplate_etc.modifierDef.h = TrimPath.parseTemplate_etc.modifierDef.escape;
    TrimPath.parseTemplate_etc.Template = function(n, t, i, r, u) {
        this.process = function(n, t) {
            var f, e, s, o;
            n == null && (n = {});
            n._MODIFIERS == null && (n._MODIFIERS = {});
            n.defined == null && (n.defined = function(t) {
                return n[t] != undefined
            }
            );
            for (f in u.modifierDef)
                n._MODIFIERS[f] == null && (n._MODIFIERS[f] = u.modifierDef[f]);
            t == null && (t = {});
            e = [];
            s = {
                write: function(n) {
                    e.push(n)
                }
            };
            try {
                r(s, n, t)
            } catch (i) {
                if (t.throwExceptions == !0)
                    throw i;
                return o = new String(e.join("") + "[ERROR: " + i.toString() + (i.message ? "; " + i.message : "") + "]"),
                o.exception = i,
                o
            }
            return e.join("")
        }
        ;
        this.name = n;
        this.source = t;
        this.sourceFunc = i;
        this.toString = function() {
            return "TrimPath.Template [" + n + "]"
        }
    }
    ;
    TrimPath.parseTemplate_etc.ParseError = function(n, t, i) {
        this.name = n;
        this.line = t;
        this.message = i
    }
    ;
    TrimPath.parseTemplate_etc.ParseError.prototype.toString = function() {
        return "TrimPath template ParseError in " + this.name + ": line " + this.line + ", " + this.message
    }
    ;
    var u = function(i, r, u) {
        var e, k, w, a, d, l;
        i = o(i);
        for (var h = ["var TrimPath_Template_TEMP = function(_OUT, _CONTEXT, _FLAGS) { with (_CONTEXT) {"], p = {
            stack: [],
            line: 1
        }, c = -1; c + 1 < i.length; ) {
            for (e = c,
            e = i.indexOf("{", e + 1); e >= 0; ) {
                var l = i.indexOf("}", e + 1)
                  , nt = i.substring(e, l)
                  , g = nt.match(/^\{(cdata|minify|eval)/);
                if (g) {
                    var v = g[1]
                      , b = e + v.length + 1
                      , y = i.indexOf("}", b);
                    y >= 0 && (k = y - b <= 0 ? "{/" + v + "}" : i.substring(b + 1, y),
                    w = i.indexOf(k, y + 1),
                    w >= 0 && (n(i.substring(c + 1, e), h),
                    a = i.substring(y + 1, w),
                    v == "cdata" ? t(a, h) : v == "minify" ? t(s(a), h) : v == "eval" && a != null && a.length > 0 && h.push("_OUT.write( (function() { " + a + " })() );"),
                    e = c = w + k.length - 1))
                } else if (i.charAt(e - 1) != "$" && i.charAt(e - 1) != "\\" && (d = i.charAt(e + 1) == "/" ? 2 : 1,
                i.substring(e + d, e + 10 + d).search(TrimPath.parseTemplate_etc.statementTag) == 0))
                    break;
                e = i.indexOf("{", e + 1)
            }
            if (e < 0)
                break;
            if (l = i.indexOf("}", e + 1),
            l < 0)
                break;
            n(i.substring(c + 1, e), h);
            f(i.substring(e, l + 1), p, h, r, u);
            c = l
        }
        if (n(i.substring(c + 1), h),
        p.stack.length != 0)
            throw new u.ParseError(r,p.line,"unclosed, unmatched statement(s): " + p.stack.join(","));
        return h.push("}}; TrimPath_Template_TEMP"),
        h.join("")
    }
      , f = function(t, i, r, u, f) {
        var o = t.slice(1, -1).split(" "), e = f.statementDef[o[0]], s;
        if (e == null ) {
            n(t, r);
            return
        }
        if (e.delta < 0) {
            if (i.stack.length <= 0)
                throw new f.ParseError(u,i.line,"close tag does not match any previous statement: " + t);
            i.stack.pop()
        }
        if (e.delta > 0 && i.stack.push(t),
        e.paramMin != null && e.paramMin >= o.length)
            throw new f.ParseError(u,i.line,"statement needs more parameters: " + t);
        if (e.prefixFunc != null ? r.push(e.prefixFunc(o, i, u, f)) : r.push(e.prefix),
        e.suffix != null ) {
            if (o.length <= 1)
                e.paramDefault != null && r.push(e.paramDefault);
            else
                for (s = 1; s < o.length; s++)
                    s > 1 && r.push(" "),
                    r.push(o[s]);
            r.push(e.suffix)
        }
    }
      , n = function(n, t) {
        var u, r, o, f, i;
        if (!(n.length <= 0)) {
            for (u = 0,
            r = n.length - 1; u < n.length && n.charAt(u) == "\n"; )
                u++;
            while (r >= 0 && (n.charAt(r) == " " || n.charAt(r) == "\t"))
                r--;
            for (r < u && (r = u),
            u > 0 && (t.push('if (_FLAGS.keepWhitespace == true) _OUT.write("'),
            i = n.substring(0, u).replace("\n", "\\n"),
            i.charAt(i.length - 1) == "\n" && (i = i.substring(0, i.length - 1)),
            t.push(i),
            t.push('");')),
            o = n.substring(u, r + 1).split("\n"),
            f = 0; f < o.length; f++)
                e(o[f], t),
                f < o.length - 1 && t.push('_OUT.write("\\n");\n');
            r + 1 < n.length && (t.push('if (_FLAGS.keepWhitespace == true) _OUT.write("'),
            i = n.substring(r + 1).replace("\n", "\\n"),
            i.charAt(i.length - 1) == "\n" && (i = i.substring(0, i.length - 1)),
            t.push(i),
            t.push('");'))
        }
    }
      , e = function(n, r) {
        for (var f = "}", e = -1, h, u, c; e + f.length < n.length; ) {
            var s = "${"
              , l = "}"
              , o = n.indexOf(s, e + f.length);
            if (o < 0)
                break;
            if (n.charAt(o + 2) == "%" && (s = "${%",
            l = "%}"),
            h = n.indexOf(l, o + s.length),
            h < 0)
                break;
            t(n.substring(e + f.length, o), r);
            u = n.substring(o + s.length, h).replace(/\|\|/g, "#@@#").split("|");
            for (c in u)
                u[c].replace && (u[c] = u[c].replace(/#@@#/g, "||"));
            r.push("_OUT.write(");
            i(u, u.length - 1, r);
            r.push(");");
            e = h;
            f = l
        }
        t(n.substring(e + f.length), r)
    }
      , t = function(n, t) {
        n == null || n.length <= 0 || (n = n.replace(/\\/g, "\\\\"),
        n = n.replace(/\n/g, "\\n"),
        n = n.replace(/"/g, '\\"'),
        t.push('_OUT.write("'),
        t.push(n),
        t.push('");'))
    }
      , i = function(n, t, r) {
        var f = n[t], u;
        if (t <= 0) {
            r.push(f);
            return
        }
        u = f.split(":");
        r.push('_MODIFIERS["');
        r.push(u[0]);
        r.push('"](');
        i(n, t - 1, r);
        u.length > 1 && (r.push(","),
        r.push(u[1]));
        r.push(")")
    }
      , o = function(n) {
        return n = n.replace(/\t/g, "    "),
        n = n.replace(/\r\n/g, "\n"),
        n = n.replace(/\r/g, "\n"),
        n.replace(/^(\s*\S*(\s+\S+)*)\s*$/, "$1")
    }
      , s = function(n) {
        return n = n.replace(/^\s+/g, ""),
        n = n.replace(/\s+$/g, ""),
        n = n.replace(/\s+/g, " "),
        n.replace(/^(\s*\S*(\s+\S+)*)\s*$/, "$1")
    }
    ;
    TrimPath.parseDOMTemplate = function(n, t, i) {
        t == null && (t = document);
        var u = t.getElementById(n)
          , r = u.value;
        return r == null && (r = u.innerHTML),
        r = r.replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
        TrimPath.parseTemplate(r, n, i)
    }
    ;
    TrimPath.processDOMTemplate = function(n, t, i, r, u) {
        return TrimPath.parseDOMTemplate(n, r, u).process(t, i)
    }
}(),
function(n) {
    n.GetIEVersion = function() {
        var n = window.navigator.userAgent
          , t = n.indexOf("MSIE");
        return t > 0 ? parseInt(n.substring(t + 5, n.indexOf(".", t))) : navigator.userAgent.match(/Trident\/7\./) ? 11 : 0
    }
}(jQuery),
function(n) {
    var t = [];
    n.widget("ui.dropdown", {
        options: {
            contentId: null ,
            triggerEvent: "mouseover",
            hide: "blind",
            show: "blind",
            zIndex: 1e3,
            hideTimeout: 300,
            showSpd: "fast",
            hideSpd: "fast",
            hideEffectOptions: {},
            showEffectOptions: {},
            bgiframe: !1,
            position: "left-bottom",
            moveToRoot: !0,
            autoWidth: !0,
            dropShadow: !0,
            popupAdjust: {
                left: 0,
                top: 0,
                bottom: 0,
                right: 0
            },
            onShowed: null ,
            onHidden: null
        },
        _create: function() {
            var i = this, r = this.options, u, f;
            (t.push(i),
            (!jQuery().dropShadow || isIE8AndBelow) && (r.dropShadow = !1),
            r.contentId) && (this._popupRoot = n("#" + r.contentId),
            this._popupRoot.css({
                position: "absolute",
                display: "block",
                visibility: "hidden",
                zIndex: r.zIndex
            }),
            this._delayhide = !1,
            this._delayShow = !1,
            this._isHiding = !1,
            this._isShowing = !1,
            this._isShowed = !1,
            r.triggerEvent == "click" ? (i.element.mousedown(function() {
                if (t)
                    for (var n = 0; n < t.length; n++)
                        (t[n]._isShowed || t[n]._isShowing) && t[n] != i && t[n].hide(!0);
                return i._isShowed ? i.hide() : i.show(),
                !1
            }),
            this._popupRoot.click(function() {
                i.hide()
            })) : i.element.hover(function() {
                i._hideTimeOut && clearTimeout(i._hideTimeOut);
                i.show()
            }, function() {
                i._hidePopupTimeOut()
            }),
            r.moveToRoot && this._popupRoot.appendTo(document.body),
            this._popupRoot.attr("_h", this._popupRoot.outerHeight()),
            this._popupRoot.attr("_w", this._popupRoot.outerWidth()),
            this._popupRoot.css({
                display: "none",
                visibility: "visible"
            }),
            this.hide(!0),
            n(document).mousedown(function(t) {
                var u = n(t.target);
                (i._isShowed || i._isShowing) && t.target.id != r.contentId && u.parents("#" + r.contentId).length == 0 && (t.target.id != "" && t.target.id != i.element[0].id || t.target.id == "" && i.element[0].id != "" || t.target.id == "" && i.element[0].id == "" && t.target.uniqueID && t.target.uniqueID != i.element[0].uniqueID) && i.hide(!0)
            }),
            u = null ,
            n(window).bind("resize scroll", function() {
                (i._isShowing || i._isShowed) && (i._popupRoot.stop(!0, !0),
                u && clearTimeout(u),
                u = setTimeout(function() {
                    i._popupRoot.hide()
                }, 100),
                i.hide(!0))
            }),
            r.triggerEvent != "click" && this._popupRoot.hover(function() {
                i._hideTimeOut && clearTimeout(i._hideTimeOut)
            }, function() {
                i._hidePopupTimeOut()
            }),
            r.bgiframe && n.fn.bgiframe && isIE8AndBelow && (f = this._popupRoot.bgiframe()))
        },
        show: function() {
            var t = this, i = this.options, u, r;
            if (!t.element.attr("disabled") && (t._delayShow = t._isHiding,
            !t._isHiding && !t._isShowing && !t._isShowed))
                if (u = t._setPosition(),
                r = function() {
                    if (i.dropShadow && t._isShowing && t._popupRoot.dropShadow({
                        left: i.autoPos == "left-top" ? -2 : 2,
                        top: i.autoPos == "left-top" || i.autoPos == "right-top" ? -2 : 2
                    }),
                    t._isShowing && (t._popupRoot.attr("_h", t._popupRoot.outerHeight()),
                    t._popupRoot.attr("_w", t._popupRoot.outerWidth()),
                    i.onShowed && n.isFunction(i.onShowed)))
                        i.onShowed(t);
                    t._isShowing = !1;
                    t._isShowed = !0;
                    t._isHiding = !1;
                    t._delayHide && t.hide()
                }
                ,
                t._isShowing = !0,
                i.show && i.show != "auto" && i.show != "animate")
                    t._popupRoot.show(i.show, i.showEffectOptions, i.showSpd, r);
                else if (i.show == "animate")
                    t._popupRoot.animate(i.showEffectOptions, i.showSpd, r);
                else if (i.autoPos && (i.autoPos == "left-top" || i.autoPos == "right-top")) {
                    var f = this.element
                      , e = f.offset()
                      , o = this._popupRoot;
                    t._popupRoot.animate({
                        top: e.top - o.outerHeight(),
                        height: "toggle"
                    }, i.showSpd, r)
                } else
                    t._popupRoot.slideDown(i.showSpd, r)
        },
        hide: function(t) {
            var i = this, r = this.options, f, u, e, o;
            (i._delayHide = i._isShowing,
            i._isHiding || !i._isShowed || i._isShowing) || (r.dropShadow && i._isShowed && (f = i._popupRoot.shadowId(),
            f && n("#" + f).hide()),
            u = function() {
                if (r.onHidden && n.isFunction(r.onHidden))
                    r.onHidden(i);
                if (r.dropShadow && i._isShowed) {
                    var t = i._popupRoot.shadowId();
                    t && n("#" + t).hide()
                }
                i._isShowed = !1;
                i._isHiding = !1;
                i._delayShow && i.show()
            }
            ,
            i._isHiding = !0,
            r.hide && r.hide != "auto" && r.hide != "animate" ? i._popupRoot.hide(r.hide, r.hideEffectOptions, r.hideSpd, u) : r.hide == "animate" ? i._popupRoot.animate(r.hideEffectOptions, r.hideSpd, u) : r.autoPos && (r.autoPos == "left-top" || r.autoPos == "right-top") ? (e = this.element,
            o = e.offset(),
            i._popupRoot.animate({
                height: "toggle",
                top: o.top
            }, r.showSpd, u)) : i._popupRoot.slideUp(r.showSpd, u),
            t && i._popupRoot.stop(!0, !0))
        },
        _setPosition: function() {
            var t = this.options, f = this.element, o = f.offset(), u = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }, e = this._popupRoot, s, r, i;
            if (t.autoWidth && (s = f.outerWidth(),
            e.outerWidth() < s && e.css({
                width: s
            })),
            t.popupAdjust && (t.popupAdjust.left && (u.left = t.popupAdjust.left),
            t.popupAdjust.top && (u.top = t.popupAdjust.top),
            t.popupAdjust.right && (u.right = t.popupAdjust.right),
            t.popupAdjust.bottom && (u.bottom = t.popupAdjust.bottom)),
            r = null ,
            i = t.position ? t.position : "left-bottom",
            i == "auto") {
                var h = n(window).height()
                  , c = n(window).width()
                  , l = n(window).scrollTop()
                  , a = n(window).scrollLeft()
                  , v = parseInt(e.attr("_w"))
                  , y = parseInt(e.attr("_h"));
                i = "left";
                r = this._calPosition("left-bottom", o, f, u, t);
                r.left - a + v > c && (i = "right");
                i = r.top - l + y > h ? i + "-top" : i + "-bottom";
                i != "left-bottom" && (r = this._calPosition(i, o, f, u, t))
            }
            return r == null && (r = this._calPosition(i, o, f, u, t)),
            e.css(r),
            r
        },
        _calPosition: function(n, t, i, r, u) {
            var f = this._popupRoot;
            u.autoPos = "";
            switch (n) {
            case "left-bottom":
                return {
                    left: t.left + r.left,
                    top: t.top + i.outerHeight() + r.top
                };
            case "right-bottom":
                return {
                    left: t.left + (i.outerWidth() - f.outerWidth() - r.right),
                    top: t.top + i.outerHeight() + r.top
                };
            case "left-top":
                return u.autoPos = "left-top",
                {
                    left: t.left + r.left,
                    top: t.top + r.top - (u.show != "auto" ? f.outerHeight() : 0)
                };
            case "right-top":
                return u.autoPos = "right-top",
                {
                    left: t.left + i.outerWidth() - f.outerWidth() - r.right,
                    top: t.top + r.top - (u.show != "auto" ? f.outerHeight() : 0)
                };
            case "top-right":
                return {
                    left: t.left + i.outerWidth() + r.left,
                    top: t.top + r.top
                };
            case "top-left":
                return {
                    left: t.left - (r.left + f.outerWidth()),
                    top: t.top + r.top
                }
            }
            return {
                lef: 0,
                top: 0
            }
        },
        _hidePopupTimeOut: function() {
            var n = this
              , t = this.options;
            n._hideTimeOut && clearTimeout(n._hideTimeOut);
            n._hideTimeOut = setTimeout(function() {
                n.hide()
            }, t.hideTimeout)
        }
    });
    n.extend(n.ui.dropdown, {
        version: "1.0"
    })
}(jQuery),
function(n) {
    n.widget("ui.floating", {
        options: {
            top: 0,
            left: "auto",
            width: "auto",
            displayDummy: "hidden",
            dummy: null ,
            zIndex: 1e3,
            floatObject: "self",
            dummyPosition: "after",
            getOffset: null ,
            onFloating: null ,
            onFloat: null ,
            onDock: null ,
            onDocked: null ,
            onScrolled: null ,
            onSized: null
        },
        _init: function() {
            var r = this
              , t = this.options
              , i = this.element;
            this.udata = null ;
            t.floatObject != "self" && (t.floatObject = "dummy");
            t.displayDummy != "hidden" && t.displayDummy != "auto" && t.displayDummy != "none" && (t.displayDummy = "none");
            isNaN(t.width) && (t.width = "auto");
            this._isDestroyed = !1;
            t.getOffset || n.isFunction(t.getOffset) ? this.o = t.getOffset() : (t.getOffset = null ,
            this.o = i.offset());
            this._css = {
                left: i.css("left"),
                top: i.css("top"),
                position: i.css("position"),
                zIndex: i.css("z-index")
            };
            this.o.width = t.width == "auto" ? i.outerWidth() : t.width;
            this._isFloating = !1;
            this.windowSize = {
                l: n(window).scrollLeft(),
                w: n(window).width(),
                h: n(window).height(),
                t: n(window).scrollTop()
            };
            t.dummy == null && (t.dummy = n("<div><\/div>"));
            this.rfn = function(n) {
                r._windowResize(n)
            }
            ;
            n(window).bind("resize", this.rfn);
            this.sfn = function(n) {
                r._windowScroll(n)
            }
            ;
            n(window).bind("scroll", this.sfn)
        },
        floating: function() {
            this._floating(this.windowSize.l, this.windowSize.t, this.windowSize.w, this.windowSize.h)
        },
        windowScroll: function() {
            this.windowSize.l = 0;
            this.windowSize.t = 0;
            this._windowScroll()
        },
        _windowScroll: function() {
            var i = n(window).scrollTop()
              , t = n(window).scrollLeft();
            (this.windowSize.t != i || this.windowSize.l != t) && (this.windowSize.t = i,
            this.windowSize.l != t && (this.o.left = this._getOffset().left - t,
            this.windowSize.l = t),
            this._floating(t, i),
            this.onWindowScroll())
        },
        windowResize: function() {
            this.windowSize.h = 0;
            this.windowSize.w = 0;
            this._windowResize()
        },
        _windowResize: function() {
            var r = n(window).height()
              , i = n(window).width()
              , u = n(window).scrollTop()
              , f = this.options
              , t = this;
            (this.windowSize.h != r || this.windowSize.w != i || this.windowSize.t != u) && (typeof this._to != "undefined" && this._to && clearTimeout(this._to),
            this._to = setTimeout(function() {
                if (!t._isDestroyed) {
                    var f = n(window).scrollLeft();
                    (t.windowSize.h != r || t.windowSize.w != i) && t.windowSize.w != i && (f > 0 && f == t.windowSize.l && t.windowSize.w < i && (f = f - (i - t.windowSize.w),
                    f < 0 && (f = 0)),
                    t.o.left = t._getOffset().left - f);
                    t.windowSize.l = f;
                    t.windowSize.h = r;
                    t.windowSize.w = i;
                    t.windowSize.t = u;
                    t.onWindowResize();
                    t._floating(f, u, r, i)
                }
            }, 50))
        },
        onWindowResize: function() {
            var n = this;
            if (n.options.onSized)
                n.options.onSized({
                    window: this.windowSize,
                    isF: this._isFloating,
                    element: this.element,
                    oTop: this.o.top
                })
        },
        onWindowScroll: function() {
            if (this.options.onScrolled)
                this.options.onScrolled({
                    window: this.windowSize,
                    isF: this._isFloating,
                    element: this.element,
                    oTop: this.o.top
                })
        },
        _getOffset: function() {
            return this.options.floatObject == "self" && this._isFloating ? this.options.dummy.offset() : this.element.offset()
        },
        updateOffset: function(n) {
            this.o = n && n.left && n.top ? n : this.options.getOffset ? this.options.getOffset() : this._getOffset()
        },
        updateDummySize: function(n, t) {
            this.options.displayDummy != "none" && (n && this.options.dummy.width(n),
            t && this.options.dummy.height(t))
        },
        _floating: function(t, i) {
            var r, o;
            if (!this._isDestroyed) {
                var u = this.options
                  , e = this.o
                  , f = this.element
                  , s = f.height();
                if (i == null && (i = n(window).scrollTop()),
                i + u.top >= e.top && i != 0) {
                    if (!this._isFloating) {
                        if (r = {
                            data: this.udata,
                            element: f,
                            dummy: u.dummy,
                            window: this.windowSize,
                            scrollTop: i,
                            oTop: e.top,
                            oLeft: e.left,
                            elLeft: e.left,
                            elTop: u.top,
                            cancel: !1,
                            elHeight: s,
                            elWidth: f.width(),
                            isF: this._isFloating
                        },
                        u.onFloat && n.isFunction(u.onFloat) && (o = u.onFloat(r),
                        o === !1 && (r.cancel = !0),
                        this.udata = r.data,
                        e.top = r.oTop,
                        e.left = r.oLeft,
                        r.cancel))
                            return;
                        if (u.dummy) {
                            try {
                                u.dummyPosition == "after" ? u.dummy.insertAfter(f) : u.dummy.insertBefore(f)
                            } catch (h) {
                                this.destroy()
                            }
                            u.floatObject == "self" ? ((u.displayDummy == "hidden" || u.displayDummy == "none") && u.dummy.css("visibility", "hidden"),
                            u.dummy.css(n.extend({
                                display: u.displayDummy == "auto" || u.displayDummy == "hidden" ? f.css("display") : "block",
                                height: u.displayDummy == "none" ? 1 : s,
                                width: r.elWidth
                            }, this._css))) : u.dummy.css({
                                visibility: "visible"
                            })
                        }
                        u.floatObject == "self" ? f.css({
                            zoom: 1,
                            left: r.elLeft,
                            top: r.elTop,
                            zIndex: u.zIndex,
                            width: r.elWidth,
                            height: r.elHeight,
                            position: "fixed"
                        }) : u.dummy.css({
                            display: "block",
                            zoom: 1,
                            left: r.elLeft,
                            top: r.elTop,
                            zIndex: u.zIndex,
                            width: r.elWidth,
                            height: s,
                            position: "fixed"
                        });
                        this._isFloating = !0
                    }
                    if (this._isFloating) {
                        if (r = {
                            data: this.udata,
                            element: f,
                            dummy: u.dummy,
                            window: this.windowSize,
                            scrollTop: i,
                            oTop: e.top,
                            oLeft: e.left,
                            elLeft: e.left,
                            elTop: u.top,
                            cancel: !1,
                            elHeight: f.height(),
                            elWidth: f.width(),
                            isF: this._isFloating
                        },
                        u.onFloating && n.isFunction(u.onFloating) && (o = u.onFloating(r),
                        o === !1 && (r.cancel = !0),
                        this.udata = r.data,
                        e.top = r.oTop,
                        e.left = r.oLeft,
                        r.cancel))
                            return;
                        u.floatObject == "self" ? f.parent().prev().hasClass("collapsed") ? f.css({
                            left: r.elLeft,
                            top: r.elTop,
                            height: this.udata.z.h,
                            width: this.udata.z.w
                        }) : f.css({
                            left: r.elLeft,
                            top: r.elTop,
                            height: r.elHeight,
                            width: r.elWidth
                        }) : u.dummy.css({
                            left: r.elLeft,
                            top: r.elTop,
                            height: r.elHeight,
                            width: r.elWidth
                        })
                    }
                } else
                    this.dock()
            }
        },
        dock: function() {
            var f, e, t;
            if (this._isFloating) {
                var i = this.options
                  , r = this.o
                  , u = this.element;
                if (i.onDock && n.isFunction(i.onDock) && (t = {
                    data: this.udata,
                    element: u,
                    dummy: i.dummy,
                    window: this.windowSize,
                    oTop: r.top,
                    oLeft: r.left,
                    elLeft: r.left,
                    elTop: i.top,
                    cancel: !1,
                    elHeight: "auto",
                    elWidth: "auto"
                },
                f = i.onDock(t),
                f === !1 && (t.cancel = !0),
                r.top = t.oTop,
                r.left = t.oLeft,
                this.udata = t.data),
                i.floatObject == "self" && (e = n.extend({}, this._css, t ? {
                    height: t.elHeight,
                    width: t.elWidth
                } : {}),
                u.css(e)),
                i.dummy && (i.dummy.remove(),
                i.dummy.css("display", "none")),
                this._isFloating = !1,
                i.onDocked && n.isFunction(i.onDocked)) {
                    t = {
                        data: this.udata,
                        element: u,
                        dummy: i.dummy,
                        window: this.windowSize,
                        oTop: r.top,
                        oLeft: r.left
                    };
                    i.onDocked(t);
                    r.top = t.oTop;
                    r.left = t.oLeft;
                    this.udata = t.data
                }
            }
        },
        isFloating: function() {
            return this._isFloating
        },
        destroy: function() {
            this._isDestroyed = !0;
            typeof this._to != "undefined" && this._to && clearTimeout(this._to);
            this.dock();
            this.dummy && this.dummy.remove();
            n(window).unbind("scroll", this.sfn);
            n(window).unbind("resize", this.rfn);
            n.Widget === undefined ? n.widget.prototype.destroy.apply(this, arguments) : n.Widget.prototype.destroy.call(this, arguments)
        }
    });
    n.extend(n.ui.floating, {
        version: "1.0"
    })
}(jQuery),
function(n) {
    n.widget("ui.loadingMask", {
        options: {
            maskCss: "processing",
            width: "auto",
            height: "auto",
            zIndex: 999
        },
        _create: function() {
            this.mask = n("<div class='" + this.options.maskCss + "'/>").insertBefore(this.element);
            this.mask.show();
            this.refresh();
            this.show()
        },
        refresh: function(n, t) {
            n || (n = "auto");
            t || (t = "auto");
            var r = this.element
              , i = this.options;
            i.width = n == "auto" ? r.width() : n;
            i.height = t == "auto" ? r.height() : t;
            this.mask.width(i.width).height(i.height)
        },
        show: function() {
            this.mask && this.mask.show()
        },
        hide: function() {
            this.mask && this.mask.hide()
        },
        _setOption: function(n, t) {
            this.options[n] = t;
            this.refresh()
        }
    });
    n.extend(n.ui.loadingMask, {
        version: "1.0"
    })
}(jQuery),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : typeof exports == "object" ? module.exports = n : n(jQuery)
}(function(n) {
    function e(r) {
        var f = r || window.event, w = h.call(arguments, 1), l = 0, o = 0, e = 0, a = 0, b = 0, k = 0, v, y, p;
        if (r = n.event.fix(f),
        r.type = "mousewheel",
        "detail"in f && (e = f.detail * -1),
        "wheelDelta"in f && (e = f.wheelDelta),
        "wheelDeltaY"in f && (e = f.wheelDeltaY),
        "wheelDeltaX"in f && (o = f.wheelDeltaX * -1),
        "axis"in f && f.axis === f.HORIZONTAL_AXIS && (o = e * -1,
        e = 0),
        l = e === 0 ? o : e,
        "deltaY"in f && (e = f.deltaY * -1,
        l = e),
        "deltaX"in f && (o = f.deltaX,
        e === 0 && (l = o * -1)),
        e !== 0 || o !== 0)
            return f.deltaMode === 1 ? (v = n.data(this, "mousewheel-line-height"),
            l *= v,
            e *= v,
            o *= v) : f.deltaMode === 2 && (y = n.data(this, "mousewheel-page-height"),
            l *= y,
            e *= y,
            o *= y),
            a = Math.max(Math.abs(e), Math.abs(o)),
            (!t || a < t) && (t = a,
            s(f, a) && (t /= 40)),
            s(f, a) && (l /= 40,
            o /= 40,
            e /= 40),
            l = Math[l >= 1 ? "floor" : "ceil"](l / t),
            o = Math[o >= 1 ? "floor" : "ceil"](o / t),
            e = Math[e >= 1 ? "floor" : "ceil"](e / t),
            i.settings.normalizeOffset && this.getBoundingClientRect && (p = this.getBoundingClientRect(),
            b = r.clientX - p.left,
            k = r.clientY - p.top),
            r.deltaX = o,
            r.deltaY = e,
            r.deltaFactor = t,
            r.offsetX = b,
            r.offsetY = k,
            r.deltaMode = 0,
            w.unshift(r, l, o, e),
            u && clearTimeout(u),
            u = setTimeout(c, 200),
            (n.event.dispatch || n.event.handle).apply(this, w)
    }
    function c() {
        t = null
    }
    function s(n, t) {
        return i.settings.adjustOldDeltas && n.type === "mousewheel" && t % 120 == 0
    }
    var o = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], r = "onwheel"in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], h = Array.prototype.slice, u, t, f, i;
    if (n.event.fixHooks)
        for (f = o.length; f; )
            n.event.fixHooks[o[--f]] = n.event.mouseHooks;
    i = n.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var t = r.length; t; )
                    this.addEventListener(r[--t], e, !1);
            else
                this.onmousewheel = e;
            n.data(this, "mousewheel-line-height", i.getLineHeight(this));
            n.data(this, "mousewheel-page-height", i.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var t = r.length; t; )
                    this.removeEventListener(r[--t], e, !1);
            else
                this.onmousewheel = null ;
            n.removeData(this, "mousewheel-line-height");
            n.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(t) {
            var r = n(t)
              , i = r["offsetParent"in n.fn ? "offsetParent" : "parent"]();
            return i.length || (i = n("body")),
            parseInt(i.css("fontSize"), 10) || parseInt(r.css("fontSize"), 10) || 16
        },
        getPageHeight: function(t) {
            return n(t).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    n.fn.extend({
        mousewheel: function(n) {
            return n ? this.bind("mousewheel", n) : this.trigger("mousewheel")
        },
        unmousewheel: function(n) {
            return this.unbind("mousewheel", n)
        }
    })
});
!function(n) {
    var t = {}
      , r = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null ,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null ,
        buildPager: null ,
        pagerCustom: null ,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null ,
        prevSelector: null ,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null ,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        autoHover: !1,
        autoDelay: 0,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        onSliderLoad: function() {},
        onSlideBefore: function() {},
        onSlideAfter: function() {},
        onSlideNext: function() {},
        onSlidePrev: function() {},
        onSliderResize: function() {}
    };
    n.fn.bxSlider = function(u) {
        var f, e;
        if (0 == this.length)
            return this;
        if (this.length > 1)
            return this.each(function() {
                n(this).bxSlider(u)
            }),
            this;
        f = {};
        e = this;
        t.el = this;
        var w = n(window).width()
          , b = n(window).height()
          , k = function() {
            f.settings = n.extend({}, r, u);
            f.settings.slideWidth = parseInt(f.settings.slideWidth);
            f.children = e.children(f.settings.slideSelector);
            f.children.length < f.settings.minSlides && (f.settings.minSlides = f.children.length);
            f.children.length < f.settings.maxSlides && (f.settings.maxSlides = f.children.length);
            f.settings.randomStart && (f.settings.startSlide = Math.floor(Math.random() * f.children.length));
            f.active = {
                index: f.settings.startSlide
            };
            f.carousel = f.settings.minSlides > 1 || f.settings.maxSlides > 1;
            f.carousel && (f.settings.preloadImages = "all");
            f.minThreshold = f.settings.minSlides * f.settings.slideWidth + (f.settings.minSlides - 1) * f.settings.slideMargin;
            f.maxThreshold = f.settings.maxSlides * f.settings.slideWidth + (f.settings.maxSlides - 1) * f.settings.slideMargin;
            f.working = !1;
            f.controls = {};
            f.interval = null ;
            f.animProp = "vertical" == f.settings.mode ? "top" : "left";
            f.usingCSS = f.settings.useCSS && "fade" != f.settings.mode && function() {
                var i = document.createElement("div"), n = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], t;
                for (t in n)
                    if (void 0 !== i.style[n[t]])
                        return f.cssPrefix = n[t].replace("Perspective", "").toLowerCase(),
                        f.animProp = "-" + f.cssPrefix + "-transform",
                        !0;
                return !1
            }();
            "vertical" == f.settings.mode && (f.settings.maxSlides = f.settings.minSlides);
            e.data("origStyle", e.attr("style"));
            e.children(f.settings.slideSelector).each(function() {
                n(this).data("origStyle", n(this).attr("style"))
            });
            ft()
        }
          , ft = function() {
            e.wrap('<div class="bx-wrapper"><div class="bx-viewport"><\/div><\/div>');
            f.viewport = e.parent();
            f.loader = n('<div class="bx-loading" />');
            f.viewport.prepend(f.loader);
            e.css({
                width: "horizontal" == f.settings.mode ? 100 * f.children.length + 215 + "%" : "auto",
                position: "relative"
            });
            f.usingCSS && f.settings.easing ? e.css("-" + f.cssPrefix + "-transition-timing-function", f.settings.easing) : f.settings.easing || (f.settings.easing = "swing");
            h();
            f.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            });
            f.viewport.parent().css({
                maxWidth: st()
            });
            f.settings.pager || f.viewport.parent().css({
                margin: "0 auto 0px"
            });
            f.children.css({
                float: "horizontal" == f.settings.mode ? "left" : "none",
                listStyle: "none",
                position: "relative"
            });
            f.children.css("width", d());
            "horizontal" == f.settings.mode && f.settings.slideMargin > 0 && f.children.css("marginRight", f.settings.slideMargin);
            "vertical" == f.settings.mode && f.settings.slideMargin > 0 && f.children.css("marginBottom", f.settings.slideMargin);
            "fade" == f.settings.mode && (f.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none"
            }),
            f.children.eq(f.settings.startSlide).css({
                zIndex: f.settings.slideZIndex,
                display: "block"
            }));
            f.controls.el = n('<div class="bx-controls" />');
            f.settings.captions && at();
            f.active.last = f.settings.startSlide == s() - 1;
            f.settings.video && e.fitVids();
            var t = f.children.eq(f.settings.startSlide);
            "all" == f.settings.preloadImages && (t = f.children);
            f.settings.ticker ? f.settings.pager = !1 : (f.settings.pager && ht(),
            f.settings.controls && ct(),
            f.settings.auto && f.settings.autoControls && lt(),
            (f.settings.controls || f.settings.autoControls || f.settings.pager) && f.viewport.after(f.controls.el));
            et(t, ot)
        }
          , et = function(t, i) {
            var r = t.find("img, iframe").length, u;
            if (0 == r)
                return i(),
                void 0;
            u = 0;
            t.find("img, iframe").each(function() {
                n(this).one("load", function() {
                    ++u == r && i()
                }).each(function() {
                    this.complete && n(this).load()
                })
            })
        }
          , ot = function() {
            if (f.settings.infiniteLoop && "fade" != f.settings.mode && !f.settings.ticker) {
                var t = "vertical" == f.settings.mode ? f.settings.minSlides : f.settings.maxSlides
                  , i = f.children.slice(0, t).clone().addClass("bx-clone")
                  , r = f.children.slice(-t).clone().addClass("bx-clone");
                e.append(i).prepend(r)
            }
            f.loader.remove();
            g();
            "vertical" == f.settings.mode && (f.settings.adaptiveHeight = !0);
            f.viewport.height(l());
            e.redrawSlider();
            f.settings.onSliderLoad(f.active.index);
            f.initialized = !0;
            f.settings.responsive && n(window).bind("resize", ut);
            f.settings.auto && f.settings.autoStart && kt();
            f.settings.ticker && dt();
            f.settings.pager && v(f.settings.startSlide);
            f.settings.controls && tt();
            f.settings.touchEnabled && !f.settings.ticker && gt()
        }
          , l = function() {
            var r = 0, t = n(), u;
            if ("vertical" == f.settings.mode || f.settings.adaptiveHeight)
                if (f.carousel)
                    for (u = 1 == f.settings.moveSlides ? f.active.index : f.active.index * c(),
                    t = f.children.eq(u),
                    i = 1; i <= f.settings.maxSlides - 1; i++)
                        t = u + i >= f.children.length ? t.add(f.children.eq(i - 1)) : t.add(f.children.eq(u + i));
                else
                    t = f.children.eq(f.active.index);
            else
                t = f.children;
            return "vertical" == f.settings.mode ? (t.each(function() {
                r += n(this).outerHeight()
            }),
            f.settings.slideMargin > 0 && (r += f.settings.slideMargin * (f.settings.minSlides - 1))) : r = Math.max.apply(Math, t.map(function() {
                return n(this).outerHeight(!1)
            }).get()),
            r
        }
          , st = function() {
            var n = "100%";
            return f.settings.slideWidth > 0 && (n = "horizontal" == f.settings.mode ? f.settings.maxSlides * f.settings.slideWidth + (f.settings.maxSlides - 1) * f.settings.slideMargin : f.settings.slideWidth),
            n
        }
          , d = function() {
            var t = f.settings.slideWidth
              , n = f.viewport.width();
            return 0 == f.settings.slideWidth || f.settings.slideWidth > n && !f.carousel || "vertical" == f.settings.mode ? t = n : f.settings.maxSlides > 1 && "horizontal" == f.settings.mode && (n > f.maxThreshold || n < f.minThreshold && (t = (n - f.settings.slideMargin * (f.settings.minSlides - 1)) / f.settings.minSlides)),
            t
        }
          , h = function() {
            var n = 1, t;
            return "horizontal" == f.settings.mode && f.settings.slideWidth > 0 ? f.viewport.width() < f.minThreshold ? n = f.settings.minSlides : f.viewport.width() > f.maxThreshold ? n = f.settings.maxSlides : (t = f.children.first().width(),
            n = Math.floor(f.viewport.width() / t)) : "vertical" == f.settings.mode && (n = f.settings.minSlides),
            n
        }
          , s = function() {
            var n = 0, t, i;
            if (f.settings.moveSlides > 0)
                if (f.settings.infiniteLoop)
                    n = f.children.length / c();
                else
                    for (t = 0,
                    i = 0; t < f.children.length; )
                        ++n,
                        t = i + h(),
                        i += f.settings.moveSlides <= h() ? f.settings.moveSlides : h();
            else
                n = Math.ceil(f.children.length / h());
            return n
        }
          , c = function() {
            return f.settings.moveSlides > 0 && f.settings.moveSlides <= h() ? f.settings.moveSlides : h()
        }
          , g = function() {
            var t, i, n;
            f.children.length > f.settings.maxSlides && f.active.last && !f.settings.infiniteLoop ? "horizontal" == f.settings.mode ? (t = f.children.last(),
            n = t.position(),
            o(-(n.left - (f.viewport.width() - t.width())), "reset", 0)) : "vertical" == f.settings.mode && (i = f.children.length - f.settings.minSlides,
            n = f.children.eq(i).position(),
            o(-n.top, "reset", 0)) : (n = f.children.eq(f.active.index * c()).position(),
            f.active.index == s() - 1 && (f.active.last = !0),
            void 0 != n && ("horizontal" == f.settings.mode ? o(-n.left, "reset", 0) : "vertical" == f.settings.mode && o(-n.top, "reset", 0)))
        }
          , o = function(n, t, i, r) {
            var u, s;
            f.usingCSS ? (u = "vertical" == f.settings.mode ? "translate3d(0, " + n + "px, 0)" : "translate3d(" + n + "px, 0, 0)",
            e.css("-" + f.cssPrefix + "-transition-duration", i / 1e3 + "s"),
            "slide" == t ? (e.css(f.animProp, u),
            e.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                e.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
                y()
            })) : "reset" == t ? e.css(f.animProp, u) : "ticker" == t && (e.css("-" + f.cssPrefix + "-transition-timing-function", "linear"),
            e.css(f.animProp, u),
            e.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                e.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
                o(r.resetValue, "reset", 0);
                a()
            }))) : (s = {},
            s[f.animProp] = n,
            "slide" == t ? e.animate(s, i, f.settings.easing, function() {
                y()
            }) : "reset" == t ? e.css(f.animProp, n) : "ticker" == t && e.animate(s, speed, "linear", function() {
                o(r.resetValue, "reset", 0);
                a()
            }))
        }
          , nt = function() {
            for (var i, r = "", u = s(), t = 0; u > t; t++)
                i = "",
                f.settings.buildPager && n.isFunction(f.settings.buildPager) ? (i = f.settings.buildPager(t),
                f.pagerEl.addClass("bx-custom-pager")) : (i = t + 1,
                f.pagerEl.addClass("bx-default-pager")),
                r += '<div class="bx-pager-item"><a href="" data-slide-index="' + t + '" class="bx-pager-link">' + i + "<\/a><\/div>";
            f.pagerEl.html(r)
        }
          , ht = function() {
            f.settings.pagerCustom ? f.pagerEl = n(f.settings.pagerCustom) : (f.pagerEl = n('<div class="bx-pager" />'),
            f.settings.pagerSelector ? n(f.settings.pagerSelector).html(f.pagerEl) : f.controls.el.addClass("bx-has-pager").append(f.pagerEl),
            nt());
            f.pagerEl.on("click", "a", bt)
        }
          , ct = function() {
            f.controls.next = n('<a class="bx-next" href="">' + f.settings.nextText + "<\/a>");
            f.controls.prev = n('<a class="bx-prev" href="">' + f.settings.prevText + "<\/a>");
            f.controls.next.bind("click", vt);
            f.controls.prev.bind("click", yt);
            f.settings.nextSelector && n(f.settings.nextSelector).append(f.controls.next);
            f.settings.prevSelector && n(f.settings.prevSelector).append(f.controls.prev);
            f.settings.nextSelector || f.settings.prevSelector || (f.controls.directionEl = n('<div class="bx-controls-direction" />'),
            f.controls.directionEl.append(f.controls.prev).append(f.controls.next),
            f.controls.el.addClass("bx-has-controls-direction").append(f.controls.directionEl))
        }
          , lt = function() {
            f.controls.start = n('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + f.settings.startText + "<\/a><\/div>");
            f.controls.stop = n('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + f.settings.stopText + "<\/a><\/div>");
            f.controls.autoEl = n('<div class="bx-controls-auto" />');
            f.controls.autoEl.on("click", ".bx-start", pt);
            f.controls.autoEl.on("click", ".bx-stop", wt);
            f.settings.autoControlsCombine ? f.controls.autoEl.append(f.controls.start) : f.controls.autoEl.append(f.controls.start).append(f.controls.stop);
            f.settings.autoControlsSelector ? n(f.settings.autoControlsSelector).html(f.controls.autoEl) : f.controls.el.addClass("bx-has-controls-auto").append(f.controls.autoEl);
            p(f.settings.autoStart ? "stop" : "start")
        }
          , at = function() {
            f.children.each(function() {
                var t = n(this).find("img:first").attr("title");
                void 0 != t && ("" + t).length && n(this).append('<div class="bx-caption"><span>' + t + "<\/span><\/div>")
            })
        }
          , vt = function(n) {
            f.settings.auto && e.stopAuto();
            e.goToNextSlide();
            n.preventDefault()
        }
          , yt = function(n) {
            f.settings.auto && e.stopAuto();
            e.goToPrevSlide();
            n.preventDefault()
        }
          , pt = function(n) {
            e.startAuto();
            n.preventDefault()
        }
          , wt = function(n) {
            e.stopAuto();
            n.preventDefault()
        }
          , bt = function(t) {
            f.settings.auto && e.stopAuto();
            var r = n(t.currentTarget)
              , i = parseInt(r.attr("data-slide-index"));
            i != f.active.index && e.goToSlide(i);
            t.preventDefault()
        }
          , v = function(t) {
            var i = f.children.length;
            return "short" == f.settings.pagerType ? (f.settings.maxSlides > 1 && (i = Math.ceil(f.children.length / f.settings.maxSlides)),
            f.pagerEl.html(t + 1 + f.settings.pagerShortSeparator + i),
            void 0) : (f.pagerEl.find("a").removeClass("active"),
            f.pagerEl.each(function(i, r) {
                n(r).find("a").eq(t).addClass("active")
            }),
            void 0)
        }
          , y = function() {
            if (f.settings.infiniteLoop) {
                var n = "";
                0 == f.active.index ? n = f.children.eq(0).position() : f.active.index == s() - 1 && f.carousel ? n = f.children.eq((s() - 1) * c()).position() : f.active.index == f.children.length - 1 && (n = f.children.eq(f.children.length - 1).position());
                n && ("horizontal" == f.settings.mode ? o(-n.left, "reset", 0) : "vertical" == f.settings.mode && o(-n.top, "reset", 0))
            }
            f.working = !1;
            f.settings.onSlideAfter(f.children.eq(f.active.index), f.oldIndex, f.active.index)
        }
          , p = function(n) {
            f.settings.autoControlsCombine ? f.controls.autoEl.html(f.controls[n]) : (f.controls.autoEl.find("a").removeClass("active"),
            f.controls.autoEl.find("a:not(.bx-" + n + ")").addClass("active"))
        }
          , tt = function() {
            1 == s() ? (f.controls.prev.addClass("disabled"),
            f.controls.next.addClass("disabled")) : !f.settings.infiniteLoop && f.settings.hideControlOnEnd && (0 == f.active.index ? (f.controls.prev.addClass("disabled"),
            f.controls.next.removeClass("disabled")) : f.active.index == s() - 1 ? (f.controls.next.addClass("disabled"),
            f.controls.prev.removeClass("disabled")) : (f.controls.prev.removeClass("disabled"),
            f.controls.next.removeClass("disabled")))
        }
          , kt = function() {
            f.settings.autoDelay > 0 ? setTimeout(e.startAuto, f.settings.autoDelay) : e.startAuto();
            f.settings.autoHover && e.hover(function() {
                f.interval && (e.stopAuto(!0),
                f.autoPaused = !0)
            }, function() {
                f.autoPaused && (e.startAuto(!0),
                f.autoPaused = null )
            })
        }
          , dt = function() {
            var i = 0, t;
            "next" == f.settings.autoDirection ? e.append(f.children.clone().addClass("bx-clone")) : (e.prepend(f.children.clone().addClass("bx-clone")),
            t = f.children.first().position(),
            i = "horizontal" == f.settings.mode ? -t.left : -t.top);
            o(i, "reset", 0);
            f.settings.pager = !1;
            f.settings.controls = !1;
            f.settings.autoControls = !1;
            f.settings.tickerHover && !f.usingCSS && f.viewport.hover(function() {
                e.stop()
            }, function() {
                var t = 0;
                f.children.each(function() {
                    t += "horizontal" == f.settings.mode ? n(this).outerWidth(!0) : n(this).outerHeight(!0)
                });
                var i = f.settings.speed / t
                  , r = "horizontal" == f.settings.mode ? "left" : "top"
                  , u = i * (t - Math.abs(parseInt(e.css(r))));
                a(u)
            });
            a()
        }
          , a = function(n) {
            var t, i;
            speed = n ? n : f.settings.speed;
            t = {
                left: 0,
                top: 0
            };
            i = {
                left: 0,
                top: 0
            };
            "next" == f.settings.autoDirection ? t = e.find(".bx-clone").first().position() : i = f.children.first().position();
            var r = "horizontal" == f.settings.mode ? -t.left : -t.top
              , u = "horizontal" == f.settings.mode ? -i.left : -i.top
              , s = {
                resetValue: u
            };
            o(r, "ticker", speed, s)
        }
          , gt = function() {
            f.touch = {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            };
            f.viewport.bind("touchstart", ni)
        }
          , ni = function(n) {
            if (f.working)
                n.preventDefault();
            else {
                f.touch.originalPos = e.position();
                var t = n.originalEvent;
                f.touch.start.x = t.changedTouches[0].pageX;
                f.touch.start.y = t.changedTouches[0].pageY;
                f.viewport.bind("touchmove", it);
                f.viewport.bind("touchend", rt)
            }
        }
          , it = function(n) {
            var i = n.originalEvent, u = Math.abs(i.changedTouches[0].pageX - f.touch.start.x), e = Math.abs(i.changedTouches[0].pageY - f.touch.start.y), r, t;
            (3 * u > e && f.settings.preventDefaultSwipeX ? n.preventDefault() : 3 * e > u && f.settings.preventDefaultSwipeY && n.preventDefault(),
            "fade" != f.settings.mode && f.settings.oneToOneTouch) && (r = 0,
            "horizontal" == f.settings.mode ? (t = i.changedTouches[0].pageX - f.touch.start.x,
            r = f.touch.originalPos.left + t) : (t = i.changedTouches[0].pageY - f.touch.start.y,
            r = f.touch.originalPos.top + t),
            o(r, "reset", 0))
        }
          , rt = function(n) {
            var r, i, t;
            f.viewport.unbind("touchmove", it);
            r = n.originalEvent;
            i = 0;
            (f.touch.end.x = r.changedTouches[0].pageX,
            f.touch.end.y = r.changedTouches[0].pageY,
            "fade" == f.settings.mode) ? (t = Math.abs(f.touch.start.x - f.touch.end.x),
            t >= f.settings.swipeThreshold && (f.touch.start.x > f.touch.end.x ? e.goToNextSlide() : e.goToPrevSlide(),
            e.stopAuto())) : (t = 0,
            "horizontal" == f.settings.mode ? (t = f.touch.end.x - f.touch.start.x,
            i = f.touch.originalPos.left) : (t = f.touch.end.y - f.touch.start.y,
            i = f.touch.originalPos.top),
            !f.settings.infiniteLoop && (0 == f.active.index && t > 0 || f.active.last && 0 > t) ? o(i, "reset", 200) : Math.abs(t) >= f.settings.swipeThreshold ? (0 > t ? e.goToNextSlide() : e.goToPrevSlide(),
            e.stopAuto()) : o(i, "reset", 200));
            f.viewport.unbind("touchend", rt)
        }
          , ut = function() {
            var t = n(window).width()
              , i = n(window).height();
            (w != t || b != i) && (w = t,
            b = i,
            e.redrawSlider(),
            f.settings.onSliderResize.call(e, f.active.index))
        }
        ;
        return e.goToSlide = function(t, i) {
            var h, r, a, p, u, w, b;
            f.working || f.active.index == t || ((f.working = !0,
            f.oldIndex = f.active.index,
            f.active.index = 0 > t ? s() - 1 : t >= s() ? 0 : t,
            f.settings.onSlideBefore(f.children.eq(f.active.index), f.oldIndex, f.active.index),
            "next" == i ? f.settings.onSlideNext(f.children.eq(f.active.index), f.oldIndex, f.active.index) : "prev" == i && f.settings.onSlidePrev(f.children.eq(f.active.index), f.oldIndex, f.active.index),
            f.active.last = f.active.index >= s() - 1,
            f.settings.pager && v(f.active.index),
            f.settings.controls && tt(),
            "fade" == f.settings.mode) ? (f.settings.adaptiveHeight && f.viewport.height() != l() && f.viewport.animate({
                height: l()
            }, f.settings.adaptiveHeightSpeed),
            f.children.filter(":visible").fadeOut(f.settings.speed).css({
                zIndex: 0
            }),
            f.children.eq(f.active.index).css("zIndex", f.settings.slideZIndex + 1).fadeIn(f.settings.speed, function() {
                n(this).css("zIndex", f.settings.slideZIndex);
                y()
            })) : (f.settings.adaptiveHeight && f.viewport.height() != l() && f.viewport.animate({
                height: l()
            }, f.settings.adaptiveHeightSpeed),
            h = 0,
            r = {
                left: 0,
                top: 0
            },
            !f.settings.infiniteLoop && f.carousel && f.active.last ? "horizontal" == f.settings.mode ? (u = f.children.eq(f.children.length - 1),
            r = u.position(),
            h = f.viewport.width() - u.outerWidth()) : (a = f.children.length - f.settings.minSlides,
            r = f.children.eq(a).position()) : f.carousel && f.active.last && "prev" == i ? (p = 1 == f.settings.moveSlides ? f.settings.maxSlides - c() : (s() - 1) * c() - (f.children.length - f.settings.maxSlides),
            u = e.children(".bx-clone").eq(p),
            r = u.position()) : "next" == i && 0 == f.active.index ? (r = e.find("> .bx-clone").eq(f.settings.maxSlides).position(),
            f.active.last = !1) : t >= 0 && (w = t * c(),
            r = f.children.eq(w).position()),
            "undefined" != typeof r && (b = "horizontal" == f.settings.mode ? -(r.left - h) : -r.top,
            o(b, "slide", f.settings.speed))))
        }
        ,
        e.goToNextSlide = function() {
            if (f.settings.infiniteLoop || !f.active.last) {
                var n = parseInt(f.active.index) + 1;
                e.goToSlide(n, "next")
            }
        }
        ,
        e.goToPrevSlide = function() {
            if (f.settings.infiniteLoop || 0 != f.active.index) {
                var n = parseInt(f.active.index) - 1;
                e.goToSlide(n, "prev")
            }
        }
        ,
        e.startAuto = function(n) {
            f.interval || (f.interval = setInterval(function() {
                "next" == f.settings.autoDirection ? e.goToNextSlide() : e.goToPrevSlide()
            }, f.settings.pause),
            f.settings.autoControls && 1 != n && p("stop"))
        }
        ,
        e.stopAuto = function(n) {
            f.interval && (clearInterval(f.interval),
            f.interval = null ,
            f.settings.autoControls && 1 != n && p("start"))
        }
        ,
        e.getCurrentSlide = function() {
            return f.active.index
        }
        ,
        e.getCurrentSlideElement = function() {
            return f.children.eq(f.active.index)
        }
        ,
        e.getSlideCount = function() {
            return f.children.length
        }
        ,
        e.redrawSlider = function() {
            f.children.add(e.find(".bx-clone")).outerWidth(d());
            f.viewport.css("height", l());
            f.settings.ticker || g();
            f.active.last && (f.active.index = s() - 1);
            f.active.index >= s() && (f.active.last = !0);
            f.settings.pager && !f.settings.pagerCustom && (nt(),
            v(f.active.index))
        }
        ,
        e.destroySlider = function() {
            f.initialized && (f.initialized = !1,
            n(".bx-clone", this).remove(),
            f.children.each(function() {
                void 0 != n(this).data("origStyle") ? n(this).attr("style", n(this).data("origStyle")) : n(this).removeAttr("style")
            }),
            void 0 != n(this).data("origStyle") ? this.attr("style", n(this).data("origStyle")) : n(this).removeAttr("style"),
            n(this).unwrap().unwrap(),
            f.controls.el && f.controls.el.remove(),
            f.controls.next && f.controls.next.remove(),
            f.controls.prev && f.controls.prev.remove(),
            f.pagerEl && f.settings.controls && f.pagerEl.remove(),
            n(".bx-caption", this).remove(),
            f.controls.autoEl && f.controls.autoEl.remove(),
            clearInterval(f.interval),
            f.settings.responsive && n(window).unbind("resize", ut))
        }
        ,
        e.reloadSlider = function(n) {
            void 0 != n && (u = n);
            e.destroySlider();
            k()
        }
        ,
        k(),
        this
    }
}(jQuery),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : typeof exports == "object" ? module.exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    n.fn.jScrollPane = function(t) {
        function i(t, i) {
            function hi(i) {
                var s, k, d, y, p, b, nt = !1, tt = !1;
                if (r = i,
                u === undefined)
                    p = t.scrollTop(),
                    b = t.scrollLeft(),
                    t.css({
                        overflow: "hidden",
                        padding: 0
                    }),
                    o = t.innerWidth() + g,
                    e = t.innerHeight(),
                    t.width(o),
                    u = n('<div class="jspPane" />').css("padding", ei).append(t.children()),
                    f = n('<div class="jspContainer" />').css({
                        width: o + "px",
                        height: e + "px"
                    }).append(u).appendTo(t);
                else {
                    if (t.css("width", ""),
                    nt = r.stickToBottom && fr(),
                    tt = r.stickToRight && er(),
                    y = t.innerWidth() + g != o || t.outerHeight() != e,
                    y && (o = t.innerWidth() + g,
                    e = t.innerHeight(),
                    f.css({
                        width: o + "px",
                        height: e + "px"
                    })),
                    !y && vi == a && u.outerHeight() == l)
                        return;
                    vi = a;
                    f.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
                }
                u.css("overflow", "auto");
                a = i.contentWidth ? i.contentWidth : u[0].scrollWidth;
                l = u[0].scrollHeight;
                u.css("overflow", "");
                ai = a / o;
                kt = l / e;
                w = kt > 1;
                v = !1;
                r.keepTrack || v || w ? (v || w || u.css({
                    top: 0,
                    left: 0,
                    width: f.width() - g
                }),
                t.addClass("jspScrollable"),
                s = r.maintainPosition && (h || c),
                s && (k = ft(),
                d = et()),
                di(),
                gi(),
                nr(),
                s && (at(tt ? a - o : k, !1),
                ut(nt ? l - e : d, !1)),
                hr(),
                or(),
                pr(),
                r.enableKeyboardNavigation && lr(),
                r.clickOnTrack && ir(),
                vr(),
                r.hijackInternalLinks && yr()) : (t.removeClass("jspScrollable"),
                u.css({
                    top: 0,
                    left: 0,
                    width: f.width() - g
                }),
                sr(),
                cr(),
                ar(),
                bi());
                r.autoReinitialise && !ct ? ct = setInterval(function() {
                    hi(r)
                }, r.autoReinitialiseDelay) : !r.autoReinitialise && ct && clearInterval(ct);
                p && t.scrollTop(0) && ut(p, !1);
                b && t.scrollLeft(0) && at(b, !1);
                t.trigger("jsp-initialised", [v || w])
            }
            function di() {
                f.append(n('<div class="jspVerticalBar" />').append(n('<div class="jspCap jspCapTop" />'), n('<div class="jspTrack" />').append(n('<div class="jspDrag" />').append(n('<div class="jspDragTop" />'), n('<div class="jspDragBottom" />'))), n('<div class="jspCap jspCapBottom" />')));
                dt = f.find(">.jspVerticalBar");
                k = dt.find(">.jspTrack");
                y = k.find(">.jspDrag");
                r.showArrows && (yt = n('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", rt(0, -1)).bind("click.jsp", vt),
                pt = n('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", rt(0, 1)).bind("click.jsp", vt),
                r.arrowScrollOnHover && (yt.bind("mouseover.jsp", rt(0, -1, yt)),
                pt.bind("mouseover.jsp", rt(0, 1, pt))),
                wi(k, r.verticalArrowPositions, yt, pt));
                ht = e;
                f.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function() {
                    ht -= n(this).outerHeight()
                });
                y.hover(function() {
                    y.addClass("jspHover")
                }, function() {
                    y.removeClass("jspHover")
                }).bind("mousedown.jsp", function(t) {
                    n("html").bind("dragstart.jsp selectstart.jsp", vt);
                    y.addClass("jspActive");
                    var i = t.pageY - y.position().top;
                    return n("html").bind("mousemove.jsp", function(n) {
                        st(n.pageY - i, !1)
                    }).bind("mouseup.jsp mouseleave.jsp", ki),
                    !1
                });
                yi()
            }
            function yi() {
                k.height(ht + "px");
                h = 0;
                fi = r.verticalGutter + k.outerWidth();
                u.width(o - fi - g);
                try {
                    dt.position().left === 0 && u.css("margin-left", fi + "px")
                } catch (n) {}
            }
            function gi() {
                v && (f.append(n('<div class="jspHorizontalBar" />').append(n('<div class="jspCap jspCapLeft" />'), n('<div class="jspTrack" />').append(n('<div class="jspDrag" />').append(n('<div class="jspDragLeft" />'), n('<div class="jspDragRight" />'))), n('<div class="jspCap jspCapRight" />'))),
                gt = f.find(">.jspHorizontalBar"),
                d = gt.find(">.jspTrack"),
                p = d.find(">.jspDrag"),
                r.showArrows && (wt = n('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", rt(-1, 0)).bind("click.jsp", vt),
                bt = n('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", rt(1, 0)).bind("click.jsp", vt),
                r.arrowScrollOnHover && (wt.bind("mouseover.jsp", rt(-1, 0, wt)),
                bt.bind("mouseover.jsp", rt(1, 0, bt))),
                wi(d, r.horizontalArrowPositions, wt, bt)),
                p.hover(function() {
                    p.addClass("jspHover")
                }, function() {
                    p.removeClass("jspHover")
                }).bind("mousedown.jsp", function(t) {
                    n("html").bind("dragstart.jsp selectstart.jsp", vt);
                    p.addClass("jspActive");
                    var i = t.pageX - p.position().left;
                    return n("html").bind("mousemove.jsp", function(n) {
                        lt(n.pageX - i, !1)
                    }).bind("mouseup.jsp mouseleave.jsp", ki),
                    !1
                }),
                ot = f.innerWidth(),
                pi())
            }
            function pi() {
                f.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function() {
                    ot -= n(this).outerWidth()
                });
                d.width(ot + "px");
                c = 0
            }
            function nr() {
                if (v && w) {
                    var t = d.outerHeight()
                      , i = k.outerWidth();
                    ht -= t;
                    n(gt).find(">.jspCap:visible,>.jspArrow").each(function() {
                        ot += n(this).outerWidth()
                    });
                    ot -= i;
                    e -= i;
                    o -= t;
                    d.parent().append(n('<div class="jspCorner" />').css("width", t + "px"));
                    yi();
                    pi()
                }
                v && u.width(f.outerWidth() - g + "px");
                l = u.outerHeight();
                kt = l / e;
                v && (it = Math.ceil(1 / ai * ot),
                it > r.horizontalDragMaxWidth ? it = r.horizontalDragMaxWidth : it < r.horizontalDragMinWidth && (it = r.horizontalDragMinWidth),
                p.width(it + "px"),
                nt = ot - it,
                li(c));
                w && (tt = Math.ceil(1 / kt * ht),
                tt > r.verticalDragMaxHeight ? tt = r.verticalDragMaxHeight : tt < r.verticalDragMinHeight && (tt = r.verticalDragMinHeight),
                y.height(tt + "px"),
                b = ht - tt,
                ci(h))
            }
            function wi(n, t, i, r) {
                var u = "before", f = "after", e;
                t == "os" && (t = /Mac/.test(navigator.platform) ? "after" : "split");
                t == u ? f = t : t == f && (u = t,
                e = i,
                i = r,
                r = e);
                n[u](i)[f](r)
            }
            function rt(n, t, i) {
                return function() {
                    return tr(n, t, this, i),
                    this.blur(),
                    !1
                }
            }
            function tr(t, i, u, f) {
                u = n(u).addClass("jspActive");
                var o, e, h = !0, c = function() {
                    t !== 0 && s.scrollByX(t * r.arrowButtonSpeed);
                    i !== 0 && s.scrollByY(i * r.arrowButtonSpeed);
                    e = setTimeout(c, h ? r.initialDelay : r.arrowRepeatFreq);
                    h = !1
                }
                ;
                c();
                o = f ? "mouseout.jsp" : "mouseup.jsp";
                f = f || n("html");
                f.bind(o, function() {
                    u.removeClass("jspActive");
                    e && clearTimeout(e);
                    e = null ;
                    f.unbind(o)
                })
            }
            function ir() {
                bi();
                w && k.bind("mousedown.jsp", function(t) {
                    if (t.originalTarget === undefined || t.originalTarget == t.currentTarget) {
                        var f = n(this), v = f.offset(), o = t.pageY - v.top - h, i, c = !0, a = function() {
                            var p = f.offset()
                              , n = t.pageY - p.top - tt / 2
                              , v = e * r.scrollPagePercent
                              , y = b * v / (l - e);
                            if (o < 0)
                                h - y > n ? s.scrollByY(-v) : st(n);
                            else if (o > 0)
                                h + y < n ? s.scrollByY(v) : st(n);
                            else {
                                u();
                                return
                            }
                            i = setTimeout(a, c ? r.initialDelay : r.trackClickRepeatFreq);
                            c = !1
                        }
                        , u = function() {
                            i && clearTimeout(i);
                            i = null ;
                            n(document).unbind("mouseup.jsp", u)
                        }
                        ;
                        return a(),
                        n(document).bind("mouseup.jsp", u),
                        !1
                    }
                });
                v && d.bind("mousedown.jsp", function(t) {
                    if (t.originalTarget === undefined || t.originalTarget == t.currentTarget) {
                        var f = n(this), v = f.offset(), e = t.pageX - v.left - c, i, h = !0, l = function() {
                            var p = f.offset()
                              , n = t.pageX - p.left - it / 2
                              , v = o * r.scrollPagePercent
                              , y = nt * v / (a - o);
                            if (e < 0)
                                c - y > n ? s.scrollByX(-v) : lt(n);
                            else if (e > 0)
                                c + y < n ? s.scrollByX(v) : lt(n);
                            else {
                                u();
                                return
                            }
                            i = setTimeout(l, h ? r.initialDelay : r.trackClickRepeatFreq);
                            h = !1
                        }
                        , u = function() {
                            i && clearTimeout(i);
                            i = null ;
                            n(document).unbind("mouseup.jsp", u)
                        }
                        ;
                        return l(),
                        n(document).bind("mouseup.jsp", u),
                        !1
                    }
                })
            }
            function bi() {
                d && d.unbind("mousedown.jsp");
                k && k.unbind("mousedown.jsp")
            }
            function ki() {
                n("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");
                y && y.removeClass("jspActive");
                p && p.removeClass("jspActive")
            }
            function st(n, t) {
                w && (n < 0 ? n = 0 : n > b && (n = b),
                t === undefined && (t = r.animateScroll),
                t ? s.animate(y, "top", n, ci) : (y.css("top", n),
                ci(n)))
            }
            function ci(n) {
                n === undefined && (n = y.position().top);
                f.scrollTop(0);
                h = n || 0;
                var i = h === 0
                  , r = h == b
                  , s = n / b
                  , o = -s * (l - e);
                (ni != i || ii != r) && (ni = i,
                ii = r,
                t.trigger("jsp-arrow-change", [ni, ii, ti, ri]));
                rr(i, r);
                u.css("top", o);
                t.trigger("jsp-scroll-y", [-o, i, r]).trigger("scroll")
            }
            function lt(n, t) {
                v && (n < 0 ? n = 0 : n > nt && (n = nt),
                t === undefined && (t = r.animateScroll),
                t ? s.animate(p, "left", n, li) : (p.css("left", n),
                li(n)))
            }
            function li(n) {
                n === undefined && (n = p.position().left);
                f.scrollTop(0);
                c = n || 0;
                var i = c === 0
                  , r = c == nt
                  , s = n / nt
                  , e = -s * (a - o);
                (ti != i || ri != r) && (ti = i,
                ri = r,
                t.trigger("jsp-arrow-change", [ni, ii, ti, ri]));
                ur(i, r);
                u.css("left", e);
                t.trigger("jsp-scroll-x", [-e, i, r]).trigger("scroll")
            }
            function rr(n, t) {
                r.showArrows && (yt[n ? "addClass" : "removeClass"]("jspDisabled"),
                pt[t ? "addClass" : "removeClass"]("jspDisabled"))
            }
            function ur(n, t) {
                r.showArrows && (wt[n ? "addClass" : "removeClass"]("jspDisabled"),
                bt[t ? "addClass" : "removeClass"]("jspDisabled"))
            }
            function ut(n, t) {
                var i = n / (l - e);
                st(i * b, t)
            }
            function at(n, t) {
                var i = n / (a - o);
                lt(i * nt, t)
            }
            function ui(t, i, u) {
                var s, v, y, h = 0, c = 0, p, w, b, k, l, a;
                try {
                    s = n(t)
                } catch (d) {
                    return
                }
                for (v = s.outerHeight(),
                y = s.outerWidth(),
                f.scrollTop(0),
                f.scrollLeft(0); !s.is(".jspPane"); )
                    if (h += s.position().top,
                    c += s.position().left,
                    s = s.offsetParent(),
                    /^body|html$/i.test(s[0].nodeName))
                        return;
                p = et();
                b = p + e;
                h < p || i ? l = h - r.horizontalGutter : h + v > b && (l = h - e + v + r.horizontalGutter);
                isNaN(l) || ut(l, u);
                w = ft();
                k = w + o;
                c < w || i ? a = c - r.horizontalGutter : c + y > k && (a = c - o + y + r.horizontalGutter);
                isNaN(a) || at(a, u)
            }
            function ft() {
                return -u.position().left
            }
            function et() {
                return -u.position().top
            }
            function fr() {
                var n = l - e;
                return n > 20 && n - et() < 10
            }
            function er() {
                var n = a - o;
                return n > 20 && n - ft() < 10
            }
            function or() {
                f.unbind(si).bind(si, function(n, t, i, u) {
                    c || (c = 0);
                    h || (h = 0);
                    var e = c
                      , o = h
                      , f = n.deltaFactor || r.mouseWheelSpeed;
                    return s.scrollBy(i * f, -u * f, !1),
                    e == c && o == h
                })
            }
            function sr() {
                f.unbind(si)
            }
            function vt() {
                return !1
            }
            function hr() {
                u.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function(n) {
                    ui(n.target, !1)
                })
            }
            function cr() {
                u.find(":input,a").unbind("focus.jsp")
            }
            function lr() {
                function y() {
                    var n = c
                      , t = h;
                    switch (i) {
                    case 40:
                        s.scrollByY(r.keyboardSpeed, !1);
                        break;
                    case 38:
                        s.scrollByY(-r.keyboardSpeed, !1);
                        break;
                    case 34:
                    case 32:
                        s.scrollByY(e * r.scrollPagePercent, !1);
                        break;
                    case 33:
                        s.scrollByY(-e * r.scrollPagePercent, !1);
                        break;
                    case 39:
                        s.scrollByX(r.keyboardSpeed, !1);
                        break;
                    case 37:
                        s.scrollByX(-r.keyboardSpeed, !1)
                    }
                    return a = n != c || t != h
                }
                var i, a, o = [];
                v && o.push(gt[0]);
                w && o.push(dt[0]);
                u.bind("focus.jsp", function() {
                    t.focus()
                });
                t.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function(t) {
                    if (t.target === this || o.length && n(t.target).closest(o).length) {
                        var r = c
                          , u = h;
                        switch (t.keyCode) {
                        case 40:
                        case 38:
                        case 34:
                        case 32:
                        case 33:
                        case 39:
                        case 37:
                            i = t.keyCode;
                            y();
                            break;
                        case 35:
                            ut(l - e);
                            i = null ;
                            break;
                        case 36:
                            ut(0);
                            i = null
                        }
                        return a = t.keyCode == i && r != c || u != h,
                        !a
                    }
                }).bind("keypress.jsp", function(t) {
                    if (t.keyCode == i && y(),
                    t.target === this || o.length && n(t.target).closest(o).length)
                        return !a
                });
                r.hideFocus ? (t.css("outline", "none"),
                "hideFocus"in f[0] && t.attr("hideFocus", !0)) : (t.css("outline", ""),
                "hideFocus"in f[0] && t.attr("hideFocus", !1))
            }
            function ar() {
                t.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp");
                u.unbind(".jsp")
            }
            function vr() {
                if (location.hash && location.hash.length > 1) {
                    var t, r, i = escape(location.hash.substr(1));
                    try {
                        t = n("#" + i + ', a[name="' + i + '"]')
                    } catch (e) {
                        return
                    }
                    t.length && u.find(i) && (f.scrollTop() === 0 ? r = setInterval(function() {
                        f.scrollTop() > 0 && (ui(t, !0),
                        n(document).scrollTop(f.position().top),
                        clearInterval(r))
                    }, 50) : (ui(t, !0),
                    n(document).scrollTop(f.position().top)))
                }
            }
            function yr() {
                n(document.body).data("jspHijack") || (n(document.body).data("jspHijack", !0),
                n(document.body).delegate("a[href*=#]", "click", function(t) {
                    var h = this.href.substr(0, this.href.indexOf("#")), o = location.href, u, i, r, s, f, e;
                    if (location.href.indexOf("#") !== -1 && (o = location.href.substr(0, location.href.indexOf("#"))),
                    h === o) {
                        u = escape(this.href.substr(this.href.indexOf("#") + 1));
                        i;
                        try {
                            i = n("#" + u + ', a[name="' + u + '"]')
                        } catch (c) {
                            return
                        }
                        i.length && (r = i.closest(".jspScrollable"),
                        s = r.data("jsp"),
                        s.scrollToElement(i, !0),
                        r[0].scrollIntoView && (f = n(window).scrollTop(),
                        e = i.offset().top,
                        (e < f || e > f + n(window).height()) && r[0].scrollIntoView()),
                        t.preventDefault())
                    }
                }))
            }
            function pr() {
                var u, e, t, i, n, r = !1;
                f.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function(f) {
                    var o = f.originalEvent.touches[0];
                    u = ft();
                    e = et();
                    t = o.pageX;
                    i = o.pageY;
                    n = !1;
                    r = !0
                }).bind("touchmove.jsp", function(f) {
                    if (r) {
                        var o = f.originalEvent.touches[0]
                          , l = c
                          , a = h;
                        return s.scrollTo(u + t - o.pageX, e + i - o.pageY),
                        n = n || Math.abs(t - o.pageX) > 5 || Math.abs(i - o.pageY) > 5,
                        l == c && a == h
                    }
                }).bind("touchend.jsp", function() {
                    r = !1
                }).bind("click.jsp-touchclick", function() {
                    if (n)
                        return n = !1,
                        !1
                })
            }
            function wr() {
                var n = et()
                  , i = ft();
                t.removeClass("jspScrollable").unbind(".jsp");
                u.unbind(".jsp");
                t.replaceWith(oi.append(u.children()));
                oi.scrollTop(n);
                oi.scrollLeft(i);
                ct && clearInterval(ct)
            }
            var r, s = this, u, o, e, f, a, l, ai, kt, w, v, y, b, h, p, nt, c, dt, k, fi, ht, tt, yt, pt, gt, d, ot, it, wt, bt, ct, ei, g, vi, ni = !0, ti = !0, ii = !1, ri = !1, oi = t.clone(!1, !1).empty(), si = n.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
            t.css("box-sizing") === "border-box" ? (ei = 0,
            g = 0) : (ei = t.css("paddingTop") + " " + t.css("paddingRight") + " " + t.css("paddingBottom") + " " + t.css("paddingLeft"),
            g = (parseInt(t.css("paddingLeft"), 10) || 0) + (parseInt(t.css("paddingRight"), 10) || 0));
            n.extend(s, {
                reinitialise: function(t) {
                    t = n.extend({}, r, t);
                    hi(t)
                },
                scrollToElement: function(n, t, i) {
                    ui(n, t, i)
                },
                scrollTo: function(n, t, i) {
                    at(n, i);
                    ut(t, i)
                },
                scrollToX: function(n, t) {
                    at(n, t)
                },
                scrollToY: function(n, t) {
                    ut(n, t)
                },
                scrollToPercentX: function(n, t) {
                    at(n * (a - o), t)
                },
                scrollToPercentY: function(n, t) {
                    ut(n * (l - e), t)
                },
                scrollBy: function(n, t, i) {
                    s.scrollByX(n, i);
                    s.scrollByY(t, i)
                },
                scrollByX: function(n, t) {
                    var i = ft() + Math[n < 0 ? "floor" : "ceil"](n)
                      , r = i / (a - o);
                    lt(r * nt, t)
                },
                scrollByY: function(n, t) {
                    var i = et() + Math[n < 0 ? "floor" : "ceil"](n)
                      , r = i / (l - e);
                    st(r * b, t)
                },
                positionDragX: function(n, t) {
                    lt(n, t)
                },
                positionDragY: function(n, t) {
                    st(n, t)
                },
                animate: function(n, t, i, u) {
                    var f = {};
                    f[t] = i;
                    n.animate(f, {
                        duration: r.animateDuration,
                        easing: r.animateEase,
                        queue: !1,
                        step: u
                    })
                },
                getContentPositionX: function() {
                    return ft()
                },
                getContentPositionY: function() {
                    return et()
                },
                getContentWidth: function() {
                    return a
                },
                getContentHeight: function() {
                    return l
                },
                getPercentScrolledX: function() {
                    return ft() / (a - o)
                },
                getPercentScrolledY: function() {
                    return et() / (l - e)
                },
                getIsScrollableH: function() {
                    return v
                },
                getIsScrollableV: function() {
                    return w
                },
                getContentPane: function() {
                    return u
                },
                scrollToBottom: function(n) {
                    st(b, n)
                },
                hijackInternalLinks: n.noop,
                destroy: function() {
                    wr()
                }
            });
            hi(i)
        }
        return t = n.extend({}, n.fn.jScrollPane.defaults, t),
        n.each(["arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function() {
            t[this] = t[this] || t.speed
        }),
        this.each(function() {
            var r = n(this)
              , u = r.data("jsp");
            u ? u.reinitialise(t) : (n("script", r).filter('[type="text/javascript"],:not([type])').remove(),
            u = new i(r,t),
            r.data("jsp", u))
        })
    }
    ;
    n.fn.jScrollPane.defaults = {
        showArrows: !1,
        maintainPosition: !0,
        stickToBottom: !1,
        stickToRight: !1,
        clickOnTrack: !0,
        autoReinitialise: !1,
        autoReinitialiseDelay: 500,
        verticalDragMinHeight: 0,
        verticalDragMaxHeight: 99999,
        horizontalDragMinWidth: 0,
        horizontalDragMaxWidth: 99999,
        contentWidth: undefined,
        animateScroll: !1,
        animateDuration: 300,
        animateEase: "linear",
        hijackInternalLinks: !1,
        verticalGutter: 4,
        horizontalGutter: 4,
        mouseWheelSpeed: 3,
        arrowButtonSpeed: 0,
        arrowRepeatFreq: 50,
        arrowScrollOnHover: !1,
        trackClickSpeed: 0,
        trackClickRepeatFreq: 70,
        verticalArrowPositions: "split",
        horizontalArrowPositions: "split",
        enableKeyboardNavigation: !0,
        hideFocus: !1,
        keyboardSpeed: 0,
        initialDelay: 300,
        speed: 30,
        scrollPagePercent: .8
    }
});
var mpc = {
    pv: -1
}
  , selobj = {
    pid: 0,
    isp: !1,
    spt: -1,
    evt: 0,
    cids: "0",
    dp: -1,
    favT: 0,
    btp: "full-time-asian-handicap-and-over-under",
    btp2: "full-time-asian-handicap-and-over-under",
    dts: null ,
    themeColor: "black"
}
  , param = {
    IsFirstLoad: !0,
    VersionL: -1,
    VersionU: -1,
    VersionS: -1,
    VersionF: -1,
    VersionH: -1,
    VersionT: -1,
    IsEventMenu: !1,
    SportID: -1,
    CompetitionID: -1,
    reqUrl: "",
    oIsInplayAll: !1,
    oSportId: null ,
    oVersion: null ,
    oCompetitionId: null ,
    oEventDate: null ,
    oEventIds: null ,
    oIsFirstLoad: !0,
    oIsFutureDate: null ,
    oSortBy: null ,
    oTab: null ,
    oUiBetType: null ,
    oOddsType: 0,
    oPageNo: 0
}
  , cCtrl = {
    isConsoleLogLoadContent: !1,
    prevLoadStartTime: null ,
    spanSec: 2e3,
    isProcessing: !1,
    updateSelObj: function(n) {
        selobj.pid = n.pid;
        selobj.pid == 0 && (selobj.pid = function() {
            var n = cCtrl.getLocation()
              , t = isIE9AndBelow ? n.url.query : n.search;
            return t.indexOf("pid=") > -1 ? t.split("pid=")[1].split("&")[0] : 0
        }());
        selobj.isp = n.isp;
        selobj.spt = n.spt;
        selobj.sptn = n.sptn;
        selobj.evt = n.evt;
        selobj.cids = n.cids;
        selobj.dp = n.dp;
        selobj.favT = n.favT;
        selobj.btp2 = n.btp;
        selobj.dts = n.dts;
        o.param && (o.param.Tab = n.tab,
        o.param.SportId = n.spt.toString(),
        o.param.UIBetType = n.uibt,
        o.param.EventDate = n.edt,
        o.param.IsFutureDate = n.isfd,
        o.param.IsInplay = n.ip,
        o.param.IsInplayAll = n.ipo,
        o.param.IsFirstLoad = n.ifl)
    },
    updateUV: function(n) {
        uv && o.param && (o.param.SortBy = n.sb,
        o.param.OddsType = n.ov)
    },
    updateMpc: function(n) {
        mpc.pv = n.pv
    },
    successAction: function(n, t) {
        n && (n.selobj && cCtrl.updateSelObj(n.selobj),
        n.uvd && (cCtrl.updateUV(n.uvd),
        n.uvd = _.assign({}, n.uvd, t)),
        n.mpc && cCtrl.updateMpc(n.mpc),
        BS.MODE != "DEFAULT" && BS.MODE != "PLACEBET" || BS_Store.showMyBet() || BS.RemainBetSlip(!0),
        Action.SiteRefresh(n))
    },
    getData: function(jsonData) {
        return typeof jsonData == "object" ? jsonData : eval("(" + jsonData + ")")
    },
    hasOddsForToday: function(n) {
        var r, i, u, t;
        if (o.param.Tab != "Today" || selobj.cids == "")
            return !0;
        for (r = o.param.UIBetType,
        i = !1,
        u = 0; u < n[0].e.length; ++u)
            if (t = n[0].e[u],
            r == "oe") {
                if (typeof t.o.oe != "undefined" || typeof t.o.oe1st != "undefined") {
                    i = !0;
                    break
                }
            } else if (r == "tg") {
                if (typeof t.o.tg != "undefined" || typeof t.o.tg1st != "undefined") {
                    i = !0;
                    break
                }
            } else if (r == "cs") {
                if (typeof t.o.cs != "undefined" || typeof t.o.cs1st != "undefined") {
                    i = !0;
                    break
                }
            } else if (r == "ft1x2") {
                if (typeof t.o["1x2"] != "undefined" || typeof t.o["1x21st"] != "undefined") {
                    i = !0;
                    break
                }
            } else {
                i = !0;
                break
            }
        return i
    },
    failedAction: function() {
        utility.currentRequest && utility.currentRequest.statusText != "abort" && oddsPage.showLoading(!1);
        cCtrl.isProcessing = !1
    },
    loadRefresh: function() {
        var n = cCtrl.getLocation()
          , t = n.pathname + n.search;
        isIE9AndBelow && (t = n.url.path + n.url.query);
        cCtrl.loadContent(t, !1, !1, null , !1)
    },
    loadContent: function(n, t, i, r, u, f) {
        var s, c, e, l, h;
        if (Action.resetTimer(),
        n) {
            if (s = (new Date).getTime(),
            cCtrl.isProcessing && cCtrl.prevLoadStartTime != null && s - cCtrl.prevLoadStartTime < cCtrl.spanSec)
                return console.log("Subsequent requests fail to be sent while processing requests and within 2 second."),
                !1;
            cCtrl.isProcessing = !0;
            cCtrl.prevLoadStartTime = s;
            c = !1;
            t && (e = cCtrl.getLocation(),
            l = e.pathname + e.search,
            isIE9AndBelow && (l = e.url.path + e.url.query),
            h = n.indexOf(e.host),
            h > 0 && (h += e.host.length,
            n = n.substr(h)),
            l != n && (c = !0,
            history.pushState && (isIE9AndBelow ? document.location.hash = n : history.pushState(null , null , n))),
            cCtrl.setPageNo(n));
            param.IsFirstLoad = u;
            param.VersionT = -1;
            param.VersionS = -1;
            param.VersionL = -1;
            param.VersionF = -1;
            param.VersionU = 0;
            param.VersionH = HP_Store.getVersion();
            param.IsEventMenu = !1;
            param.SportID = 1;
            param.CompetitionID = -1;
            param.reqUrl = n;
            o.param && (param.oVersion = u ? null : om.versionUtil.getVersion(),
            param.oCompetitionId = o.param.CompetitionId,
            param.oEventIds = o.param.EventIds,
            param.oIsFirstLoad = u == !0 || c == !0 ? !0 : !1,
            param.oPageNo = o.param.PageNo,
            param.oSortBy = o.param.SortBy);
            i && oddsPage.showLoading(!0);
            s = (new Date).getTime();
            utility.service("CentralService", "GetData", param, "POST", function(n) {
                var i = (new Date).getTime(), u = i - s, e;
                cCtrl.isConsoleLogLoadContent && console.log("CentralControl.js - cCtrl.loadContent - GetData - " + u + "ms");
                cCtrl.successAction(n, f);
                i = (new Date).getTime();
                e = i - s;
                document.title = u + "|" + (e - u) + "|" + e;
                console.log("document.title = " + document.title);
                r && r(n);
                t && pm.tellCashWhereSBKIs()
            }, function() {
                cCtrl.failedAction()
            })
        }
    },
    changeTheme: function(n) {
        var r = $("#theme"), t, i;
        if (r.length > 0) {
            t = r.attr("href");
            i = n ? n.toLowerCase() : "";
            switch (i) {
            case "black":
            case "theme_black":
                i = "black";
                break;
            case "white":
            case "theme_white":
                i = "white";
                break;
            case "blue":
            case "theme_blue":
                i = "blue";
                break;
            case "darkblue":
            case "theme_darkblue":
                i = "darkblue";
                break;
            default:
                i = t.indexOf("/Theme_White/") != -1 ? "black" : "white"
            }
            i == "black" ? (t = t.replace("/Theme_White/", "/Theme_Black/"),
            t = t.replace("/Theme_Blue/", "/Theme_Black/"),
            t = t.replace("/Theme_DarkBlue/", "/Theme_Black/")) : i == "white" ? (t = t.replace("/Theme_Black/", "/Theme_White/"),
            t = t.replace("/Theme_Blue/", "/Theme_White/"),
            t = t.replace("/Theme_DarkBlue/", "/Theme_White/")) : i == "blue" ? (t = t.replace("/Theme_Black/", "/Theme_Blue/"),
            t = t.replace("/Theme_White/", "/Theme_Blue/"),
            t = t.replace("/Theme_DarkBlue/", "/Theme_Blue/")) : i == "darkblue" && (t = t.replace("/Theme_Black/", "/Theme_DarkBlue/"),
            t = t.replace("/Theme_White/", "/Theme_DarkBlue/"),
            t = t.replace("/Theme_Blue/", "/Theme_DarkBlue/"));
            r.attr("href", t);
            selobj.themeColor = i
        }
    },
    reloadPage: function() {
        var n = cCtrl.getLocation()
          , t = n.pathname + n.search;
        isIE9AndBelow && (t = n.url.path + n.url.query);
        t == "/" && isIE9AndBelow;
        cCtrl.loadContent(t, !0, !0, null , !0)
    },
    getQueryFromUrl: function(n) {
        var r = [], t, u, i;
        for ((typeof n != "string" || n.trim() == "") && (n = window.location.href),
        u = n.slice(n.indexOf("?") + 1).split("&"),
        i = 0; i < u.length; i++)
            t = u[i].split("="),
            r.push(t[0]),
            r[t[0].toLowerCase()] = t[1];
        return r
    },
    setPageNo: function(n) {
        var t = parseInt(cCtrl.getQueryFromUrl(n).pageno, 10);
        !isNaN(t) && t > 0 && (o.param.PageNo = t - 1)
    },
    setBackCloseUrl: function(n) {
        var i = cCtrl.getLocation()
          , t = sessionStorage.historyUrls ? JSON.parse(sessionStorage.historyUrls) : []
          , r = (i.pathname + i.search).replace(location.origin, "");
        isIE9AndBelow && (r = i.url.path + i.url.query);
        (mpc.pv == 1 || mpc.pv == 0) && (sessionStorage.removeItem("historyUrls"),
        t = []);
        n != r && (t.length >= 100 && t.pop(),
        t.unshift(r),
        sessionStorage.historyUrls = JSON.stringify(t))
    },
    goBackClosePage: function() {
        var t = sessionStorage.historyUrls ? JSON.parse(sessionStorage.historyUrls) : ["/" + global.lan + "/sports"]
          , n = t.shift();
        n = n.replace(n.slice(1).split("/")[0], global.lan);
        cCtrl.loadContent(n, !0, !0, function() {
            OddsHeader.reHighlightSelOdds();
            OddsHeader.hideAllDDL()
        }, !0);
        t.length == 0 ? sessionStorage.removeItem("historyUrls") : sessionStorage.historyUrls = JSON.stringify(t)
    },
    goPageNotFound: function() {
        if (cCtrl.isProcessing = !1,
        parent.location.href)
            parent.location.replace(parent.location.origin + "/" + global.lan + "/page-not-found");
        else {
            var n = window.location.href.split("sports/");
            window.location.href = n[0] + "page-not-found"
        }
    },
    getLocation: function() {
        var n = isIE9AndBelow ? document.location : history.location || document.location;
        return isIE9AndBelow && (n.url = {
            path: n.hash.length > 0 ? n.hash.slice(1).split("?")[0] : n.pathname,
            query: n.hash.length > 0 && n.hash.slice(1).split("?").length > 1 ? "?" + n.hash.slice(1).split("?")[1] : ""
        }),
        n
    }
}
  , currentPage = location.hash || 1;
$(function() {
    $.browser.msie && document.documentElement.focus();
    UI.isIE && $("#center-panel").css("overflow-y", "scroll");
    cCtrl.reloadPage();
    pm.init();
    BS.Init();
    Action.RightPanel.initBSEvent();
    MB.Init();
    Action.RightPanel.initMBEvent();
    var n = $("#ftbanner");
    n.length > 0 && n.attr("src", utility.getFooterUrl());
    liveCentreControl.Init()
});
var CONSTANTS = {
    SITEREFRESH: "SITEREFRESH",
    UICHANGE: "UICHANGE",
    TIMERRESET: "TIMERRESET",
    CENTERPANEL: {
        REMOVEHIGHLIGHTODDS: "REMOVEHIGHLIGHTODDS",
        HIGHLIGHTODDS: "CENTERPANELHIGHLIGHTODDS",
        MYEVENTTOGGLE: "CENTERPANELMYEVENTTOGGLE"
    },
    RIGHTPANEL: {},
    LEFTPANEL: {
        TOGGLE: "LEFTPANEL_TOGGLE",
        VIEW: "LEFTPANEL_VIEW",
        EXPAND: "LEFTPANEL_EXPAND",
        VIEWALL: "LEFTPANEL_VIEWALL",
        RESET: "LEFTPANEL_RESET",
        MENUEXPAND: "LEFTPANEL_MENUEXPAND",
        MY_COMPETITION: {
            TOGGLE: "LEFTPANEL_MY_COMPETITION_TOGGLE",
            VIEWALL: "LEFTPANEL_MY_COMPETITION_VIEWALL",
            ORDER: "LEFTPANEL_MY_COMPETITION_ORDER",
            SELECT: "LEFTPANEL_MY_COMPETITION_SELECT",
            EXPAND: "LEFTPANEL_MY_COMPETITION_EXPAND"
        },
        MY_EVENT: {
            TOGGLE: "LEFTPANEL_MY_EVENT_TOGGLE",
            EXPAND: "LEFTPANEL_MY_EVENT_EXPAND"
        },
        SUBVIEW: "LEFTPANEL_SUBVIEW",
        PSEVENT_VIEWALL: "LEFTPANEL_PSEVENT_VIEWALL",
        SERVERCODE: "LEFTPANEL_SERVERCODE"
    },
    PROGRAMME: "PROGRAMME",
    PERFORMANCE: {
        TOGGLE: "PERFORMANCE_TOGGLE"
    },
    FULLSCREENBLOCK: {
        SHOW: "SHOWFULLSCREENBLOCK",
        HIDE: "HIDEFULLSCREENBLOCK"
    },
    POPUP: {
        SHOW: "SHOWPOPUP",
        HIDE: "HIDEPOPUP"
    }
}
  , VIEW = {
    PRESTART: 0,
    INPLAY: 1,
    STARTINGSOON: 2
}
  , Router = ReactModule.createModule("Router", {
    home: function() {
        return Router.props.header
    },
    inplay: function() {
        return Router.props.header + "all/in-play"
    },
    startingsoon: function() {
        var n = Router.state.ssmid;
        return Router.props.header + n + "/popular/full-time-asian-handicap-and-over-under"
    },
    sport: function(n, t, i) {
        t || (t = Router.state.view);
        var r = Router.props.header;
        switch (t) {
        default:
        case VIEW.PRESTART:
            r += Router.state.competitionDefault && i ? n + "/select-competition/default" : n + "/competition/full-time-asian-handicap-and-over-under";
            break;
        case VIEW.STARTINGSOON:
            r += n + "/popular/full-time-asian-handicap-and-over-under";
            break;
        case VIEW.INPLAY:
            r += (n == -1 ? "all" : n) + "/in-play/full-time-asian-handicap-and-over-under"
        }
        return r
    },
    lpSport: function(n, t) {
        var i = Router.props.header
          , r = n.sid;
        switch (t) {
        default:
        case VIEW.PRESTART:
            i += n.sen;
            i += Router.state.competitionDefault ? "/select-competition/default" : n.sid != 1 ? "/competition/full-time-asian-handicap-and-over-under" : n.tc == 0 ? n.sid != 1 || n.tmrc == 0 ? "/competition/full-time-asian-handicap-and-over-under" : "/matches-by-date/tomorrow/full-time-asian-handicap-and-over-under" : "/matches-by-date/today/full-time-asian-handicap-and-over-under";
            break;
        case VIEW.STARTINGSOON:
            i += n.sen + "/popular/full-time-asian-handicap-and-over-under";
            break;
        case VIEW.INPLAY:
            i += (r == -1 ? "all" : n.sen) + "/in-play/full-time-asian-handicap-and-over-under"
        }
        return i
    },
    competition: function(n, t, i) {
        var r = Router.props.header + n;
        return r += i ? "/mycompetition" : "/competition",
        r + ("/full-time-asian-handicap-and-over-under?competitionids=" + t)
    },
    competitionMenu: function(n) {
        return Router.props.header + (o.param.IsInplayAll ? "all" : n) + "/select-competition/default"
    },
    selectedCompetitionMenu: function(n) {
        var r, t, i;
        if (o.param.IsInplay)
            r = "inplay";
        else if (selobj.dts)
            for (t = 0; t < selobj.dts.length; ++t)
                selobj.dts[t].IsSelect && (r = selobj.dts[t].Date);
        return i = this.competitionMenu(n, !1),
        selobj.cids != "" && (i = i + "?competitionids=" + selobj.cids),
        i
    },
    event: function() {
        var i = Router.props.header + arguments[0], n, t = "";
        arguments.length == 3 ? (n = arguments[1],
        t = arguments[2]) : arguments.length == 2 && (_.isString(arguments[1]) ? t = arguments[1] : n = arguments[1]);
        typeof n == "undefined" && (n = Router.state.view);
        switch (n) {
        case VIEW.STARTINGSOON:
            i += "/popular";
            break;
        case VIEW.INPLAY:
            i += "/in-play"
        }
        return t && t.length > 0 && (i += "/" + t),
        i
    },
    today: function(n) {
        return Router.props.header + n + "/matches-by-date/today/full-time-asian-handicap-and-over-under"
    },
    tomorrow: function(n) {
        return Router.props.header + n + "/matches-by-date/tomorrow/full-time-asian-handicap-and-over-under"
    },
    allMatches: function(n) {
        return Router.props.header + n + "/competition/full-time-asian-handicap-and-over-under"
    },
    outright: function(n, t) {
        var i = n == 1 ? "/matches-by-date/today/outright" : "/competition/outright";
        return t != null && (i += "?competitionids=" + t),
        Router.props.header + n + i
    },
    betType: function(n) {
        var f = cCtrl.getLocation(), e = f.pathname, s = f.search, i;
        isIE9AndBelow && (e = f.url.path,
        s = f.url.query);
        var t = e.split("/")
          , r = s.replace(/pageno=\d*/i, "pageno=1")
          , u = "";
        if (t.length == 4)
            u = o.param.SportId == 1 ? t.join("/") + "/matches-by-date/" + o.param.Tab + "/" + n + r : t.join("/") + "/competition/" + n + r;
        else if (t.length == 5)
            u = t.join("/") + "/" + (selobj.pid > 0 ? "competition/" : "") + n + r;
        else if (t.length == 6) {
            for (i = 0; i < o.stateObjs.bts.length; i++)
                if (t[5] == o.stateObjs.bts[i].k) {
                    t.splice(5, 1);
                    break
                }
            t.length == 6 && t[5].toLowerCase() == "default" && t.splice(5, 1);
            u = t.join("/") + "/" + n + r
        } else if (t.length == 7) {
            for (i = 0; i < o.stateObjs.bts.length; i++)
                if (t[6] == o.stateObjs.bts[i].k) {
                    t.splice(6, 1);
                    break
                }
            t.length == 7 && t[6].toLowerCase() == "default" && t.splice(6, 1);
            u = t.join("/") + "/" + n + r
        }
        return u
    },
    statement: {
        unsettled: function() {
            var n = pm.parentHost();
            return document.domain != "localhost" && n != null && n != "" ? n + "/" + global.lan + "/my-account/statement/betting-history/sports/unsettled-bets" : ""
        },
        settled: function() {
            var n = pm.parentHost();
            return document.domain != "localhost" && n != null && n != "" ? n + "/" + global.lan + "/my-account/statement/betting-history/sports/settled-bets" : ""
        }
    },
    racing: function() {
        return pm.parentHost() + this.props.racing
    }
});
Object.defineProperty(Router, "state", {
    get: function() {
        return Router.getStore("Router").state
    }
});
Object.defineProperty(Router, "props", {
    get: function() {
        return Router.getStore("Router").props
    }
});
Router.createStore("Router", {
    props: {
        header: "/" + global.lan + "/sports/",
        cookie: "competitionDefault",
        racing: "/" + global.lan + "/racing/"
    },
    state: {
        view: 0,
        ssmid: -1,
        reg: !1,
        competitionDefault: !1,
        querystring: !1,
        currentPage: "",
        isChanged: !1
    },
    init: function() {
        var t = this.props.cookie
          , n = this.state;
        Object.defineProperty(this.state, "querystring", {
            get: function() {
                var n = {}, t;
                return location.search.length > 0 && (t = location.search.substring(1).split("&"),
                t = _.map(t, function(t) {
                    var i = t.toString().split("=");
                    i.length == 2 ? n[i[0].toLowerCase()] = i[1] : n[i[0]] = ""
                })),
                n
            }
        });
        n.querystring.reg && n.querystring.reg != n.reg && (n.reg = n.querystring.reg);
        reg = n.reg;
        Object.defineProperty(this.state, "competitionDefault", {
            get: function() {
                var n = utility.cookie.read(t) == "true";
                return n || uv.urView == "ASIAN" || reg == "UK" || utility.cookie.write(t, !0, 730),
                utility.cookie.read(t) == "true"
            },
            set: function(n) {
                utility.cookie.write(t, n, 730)
            }
        });
        this.state.currentPage = location.hash || 1;
        $(window).bind("popstate", function() {
            var t = location.hash;
            (n.currentPage != t || !$.browser.msie || $.browser.msie && $.browser.version > 9) && (cCtrl.reloadPage(),
            n.currentPage = t);
            n.isChanged = n.currentPage != t
        })
    },
    methods: {
        siterefresh: function(n) {
            this.state.view = n.lpc.sm;
            this.state.ssmid = n.lpd.ssm && n.lpd.ssm.ssmd.length > 0 ? n.lpd.ssm.ssmd[0].sen : -1
        },
        ChangeDefaultButton: function(n) {
            this.state.competitionDefault = n
        }
    }
});
var Action = function() {
    function n(n, t) {
        return {
            type: n,
            data: t
        }
    }
    return {
        uiChange: function(t) {
            var i = n(CONSTANTS.UICHANGE, t);
            dispatcher.dispatch(i)
        },
        SiteRefresh: function(n) {
            var t = {
                type: CONSTANTS.SITEREFRESH,
                data: n
            };
            dispatcher.dispatch(t)
        },
        resetTimer: function() {
            dispatcher.dispatch(n(CONSTANTS.TIMERRESET))
        },
        LoadSite: function(n, t) {
            cCtrl.setBackCloseUrl(n);
            cCtrl.loadContent(n, !0, !0, null , !0, t)
        },
        RefreshSite: function() {
            cCtrl.loadRefresh()
        },
        ProcessingFinish: function() {
            cCtrl.isProcessing = !1
        },
        PopupNewWin: function(n, t, i) {
            i || (i = n.id);
            utility.popupUrlWin(t, n, i)
        },
        programme: function(n) {
            cCtrl.loadContent(n, !0, !0, null , !0)
        },
        sport: function() {
            var n = Router.sport.apply(window, arguments);
            cCtrl.loadContent(n, !0, !0, null , !0)
        },
        competition: function(n, t) {
            var i = Router.competition(n, t);
            cCtrl.loadContent(i, !0, !0, null , !0)
        },
        event: function() {
            var n = Router.event.apply(window, arguments);
            cCtrl.setBackCloseUrl(n);
            cCtrl.loadContent(n, !0, !0, null , !0)
        },
        CenterPanel: {
            removeHighlightOdds: function(n) {
                dispatcher.dispatch({
                    type: CONSTANTS.CENTERPANEL.REMOVEHIGHLIGHTODDS,
                    sids: n
                })
            },
            HighlightOdds: function(n) {
                dispatcher.dispatch({
                    type: CONSTANTS.CENTERPANEL.HIGHLIGHTODDS,
                    sids: n
                })
            }
        },
        RightPanel: {},
        LeftPanel: {
            home: function() {
                var n = Router.home();
                cCtrl.loadContent(n, !0, !0, function() {
                    Action.LeftPanel.reset()
                }, !0)
            },
            inplay: function() {
                var n = Router.inplay();
                cCtrl.loadContent(n, !0, !0, function() {
                    Action.LeftPanel.reset()
                })
            },
            startingsoon: function() {
                var n = Router.startingsoon();
                cCtrl.loadContent(n, !0, !0, function() {
                    Action.LeftPanel.reset()
                })
            },
            view: function(t) {
                var i = n(CONSTANTS.LEFTPANEL.VIEW, {
                    view: t
                });
                dispatcher.dispatch(i)
            },
            expand: function(t) {
                var i = n(CONSTANTS.LEFTPANEL.EXPAND, t);
                dispatcher.dispatch(i)
            },
            viewAll: function(t, i) {
                var r = n(CONSTANTS.LEFTPANEL.VIEWALL, {
                    id: t,
                    view: i
                });
                dispatcher.dispatch(r)
            },
            collapse: function(n) {
                UI.LEFTPANEL_COLLAPSE(n)
            },
            reset: function() {
                var t = n(CONSTANTS.LEFTPANEL.RESET);
                dispatcher.dispatch(t)
            },
            subview: function(t) {
                var i = n(CONSTANTS.LEFTPANEL.SUBVIEW, t);
                dispatcher.dispatch(i)
            },
            psEventViewAll: function(t) {
                var i = n(CONSTANTS.LEFTPANEL.PSEVENT_VIEWALL, t);
                dispatcher.dispatch(i)
            },
            sport: function() {
                var n = Router.lpSport.apply(window, arguments);
                cCtrl.loadContent(n, !0, !0, null , !0)
            },
            menuExpand: function(t) {
                var i = n(CONSTANTS.LEFTPANEL.MENUEXPAND, t);
                dispatcher.dispatch(i)
            },
            code: function() {
                var t = n(CONSTANTS.LEFTPANEL.SERVERCODE);
                dispatcher.dispatch(t)
            },
            MyCompetition: {
                toggle: function(t) {
                    var i = n(CONSTANTS.LEFTPANEL.MY_COMPETITION.TOGGLE, t);
                    dispatcher.dispatch(i)
                },
                viewAll: function() {
                    var t = n(CONSTANTS.LEFTPANEL.MY_COMPETITION.VIEWALL);
                    dispatcher.dispatch(t)
                },
                order: function(t, i) {
                    var r = n(CONSTANTS.LEFTPANEL.MY_COMPETITION.ORDER, {
                        i: t,
                        d: i
                    });
                    dispatcher.dispatch(r)
                },
                select: function(n, t) {
                    var i = Router.competition(t, n, !0);
                    cCtrl.loadContent(i, !0, !0)
                },
                expand: function(t) {
                    var i = n(CONSTANTS.LEFTPANEL.MY_COMPETITION.EXPAND, t);
                    dispatcher.dispatch(i)
                }
            },
            MyEvent: {
                toggle: function(t) {
                    var i = n(CONSTANTS.LEFTPANEL.MY_EVENT.TOGGLE, t);
                    dispatcher.dispatch(i)
                },
                expand: function(t) {
                    var i = n(CONSTANTS.LEFTPANEL.MY_EVENT.EXPAND, t);
                    dispatcher.dispatch(i)
                }
            }
        },
        FullScreenBlock: {
            show: function(n) {
                dispatcher.dispatch({
                    type: CONSTANTS.FULLSCREENBLOCK.SHOW,
                    content: n
                })
            },
            hide: function() {
                dispatcher.dispatch({
                    type: CONSTANTS.FULLSCREENBLOCK.HIDE
                })
            }
        },
        PopUp: {
            show: function(n, t) {
                dispatcher.dispatch({
                    type: CONSTANTS.POPUP.SHOW,
                    isAddedMsg: n,
                    popupType: t
                })
            },
            hide: function() {
                dispatcher.dispatch({
                    type: CONSTANTS.POPUP.HIDE
                })
            }
        }
    }
}()
  , ccparam = {
    playingEventId: "",
    playingLsId: "",
    hTeamName: "",
    aTeamName: "",
    sportId: "",
    isInplay: !1,
    videoProvider: "",
    selSp: 0,
    targetId: "iframeTarget",
    domain: global.bgurl,
    width: "240",
    height: "245",
    width_enlarge: "418",
    height_enlarge: "346",
    checkEventInterval: 3e5,
    currentDelayTimesToPlayNextEvent: 0,
    delayTimesToPlayNextEvent: 2,
    checkEventTimer: null ,
    expireDays: {
        expires: 0,
        path: "/"
    },
    isHideErrorMsg: !1,
    fakeFBId: 10,
    tvTxt: "",
    infoTxt: "",
    liveCentreTxt: "",
    tvGuildTxt: "",
    tvMenuTxt: "",
    CONTENT_CONSOLE_COOKIE_NAME: "ContentConsoleSetting",
    CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME: "CCDefaultTvPlay",
    CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME2: "CCDefaultBgPlay",
    CONTENT_CONSOLE_DEFAULT_PLAY_MOREBET_COOKIE_NAME: "CCDefaultMbPlay",
    CONTENT_CONSOLE_CURRENT_PLAY_MOREBET_COOKIE_NAME: "CCCurrentMbPlay",
    CONTENT_CONSOLE_ENLARGE_STATUS: "CCEnlargeStatus"
}
  , lockInfo = {
    isLock: !1,
    eventId: "",
    lsId: "",
    hTeamName: "",
    aTeamName: "",
    sportId: "",
    lang: "",
    videoProvider: ""
}
  , cookies = {
    createNew: function() {
        function n(n, t, i, r, u, f, e) {
            lockInfo.isLock = !0;
            lockInfo.eventId = n;
            lockInfo.lsId = f;
            lockInfo.aTeamName = i;
            lockInfo.hTeamName = t;
            lockInfo.sportId = r;
            lockInfo.lang = u;
            lockInfo.videoProvider = e;
            var o = "isLock=" + lockInfo.isLock + "&eventId=" + lockInfo.eventId + "&lsId=" + lockInfo.lsId + "&aTeamName=" + lockInfo.aTeamName + "&hTeamName=" + lockInfo.hTeamName + "&sportId=" + lockInfo.sportId + "&lang=" + u + "&vidoProvider=" + e;
            utility.cookie.write(ccparam.CONTENT_CONSOLE_COOKIE_NAME, o, ccparam.expireDays)
        }
        function t() {
            var i = utility.cookie.read(ccparam.CONTENT_CONSOLE_COOKIE_NAME), r, t, n;
            if (i != null && i != "")
                for (r = i.split("&"),
                t = 0; t < r.length; t++) {
                    n = r[t].split("=");
                    switch (n[0]) {
                    case "isLock":
                        lockInfo.isLock = Boolean(n[1]);
                        break;
                    case "eventId":
                        lockInfo.eventId = n[1];
                        break;
                    case "lsId":
                        lockInfo.lsId = n[1];
                        break;
                    case "aTeamName":
                        lockInfo.aTeamName = n[1];
                        break;
                    case "hTeamName":
                        lockInfo.hTeamName = n[1];
                        break;
                    case "sportId":
                        lockInfo.sportId = n[1];
                        break;
                    case "lang":
                        ccparam.lang = n[1];
                        break;
                    case "vidoProvider":
                        lockInfo.videoProvider = n[1]
                    }
                }
        }
        function i() {
            lockInfo.isLock = !1;
            lockInfo.eventId = "";
            lockInfo.lsId = "";
            lockInfo.aTeamName = "";
            lockInfo.hTeamName = "";
            lockInfo.sportId = "";
            lockInfo.lang = "";
            lockInfo.videoProvider = "";
            utility.cookie.write(ccparam.CONTENT_CONSOLE_COOKIE_NAME, "", ccparam.expireDays)
        }
        function r() {
            utility.cookie.write(ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME2, "", ccparam.expireDays)
        }
        function u(n, t, i, r, u, f, e) {
            var o = "eventId=" + n + "&lsId=" + f + "&aTeamName=" + i + "&hTeamName=" + t + "&sportId=" + r + "&lang=" + u + "&vidoProvider=" + e;
            utility.cookie.write(ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME, o, ccparam.expireDays)
        }
        function f() {
            var r = utility.cookie.read(ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME), n, u, i, t;
            if (r && r != "") {
                for (n = {},
                u = r.split("&"),
                i = 0; i < u.length; i++) {
                    t = u[i].split("=");
                    switch (t[0]) {
                    case "eventId":
                        n.playingEventId = t[1];
                        break;
                    case "lsId":
                        n.playingLsId = t[1];
                        break;
                    case "aTeamName":
                        n.aTeamName = t[1];
                        break;
                    case "hTeamName":
                        n.hTeamName = t[1];
                        break;
                    case "sportId":
                        n.sportId = t[1];
                        break;
                    case "lang":
                        n.lang = t[1];
                        break;
                    case "vidoProvider":
                        n.videoProvider = t[1]
                    }
                }
                return n
            }
            return null
        }
        function e(n, t, i, r, u, f, e) {
            var o = "eventId=" + n + "&lsId=" + f + "&aTeamName=" + i + "&hTeamName=" + t + "&sportId=" + r + "&lang=" + u + "&vidoProvider=" + e;
            utility.cookie.write(ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME2, o, ccparam.expireDays)
        }
        function o() {
            var r = utility.cookie.read(ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME2), u, n, i, t;
            if (r && r != "") {
                for (u = r.split("&"),
                n = {},
                i = 0; i < u.length; i++) {
                    t = u[i].split("=");
                    switch (t[0]) {
                    case "eventId":
                        n.playingEventId = t[1];
                        break;
                    case "lsId":
                        n.playingLsId = t[1];
                        break;
                    case "aTeamName":
                        n.aTeamName = t[1];
                        break;
                    case "hTeamName":
                        n.hTeamName = t[1];
                        break;
                    case "sportId":
                        n.sportId = t[1];
                        break;
                    case "lang":
                        n.lang = t[1];
                        break;
                    case "vidoProvider":
                        n.videoProvider = t[1]
                    }
                }
                return n
            }
            return null
        }
        function s(n, t, i, r, u, f, e, o) {
            var s = "eventId=" + n + "&lsId=" + f + "&aTeamName=" + i + "&hTeamName=" + t + "&sportId=" + r + "&lang=" + u + "&vidoProvider=" + e
              , h = o ? ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_MOREBET_COOKIE_NAME : ccparam.CONTENT_CONSOLE_CURRENT_PLAY_MOREBET_COOKIE_NAME;
            utility.cookie.write(h, s, o ? ccparam.expireDays : 1)
        }
        function h(n) {
            var e = n ? ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_MOREBET_COOKIE_NAME : ccparam.CONTENT_CONSOLE_CURRENT_PLAY_MOREBET_COOKIE_NAME, u = utility.cookie.read(e), f, t, r, i;
            if (u && u != "") {
                for (f = u.split("&"),
                t = {},
                r = 0; r < f.length; r++) {
                    i = f[r].split("=");
                    switch (i[0]) {
                    case "eventId":
                        t.playingEventId = i[1];
                        break;
                    case "lsId":
                        t.playingLsId = i[1];
                        break;
                    case "aTeamName":
                        t.aTeamName = i[1];
                        break;
                    case "hTeamName":
                        t.hTeamName = i[1];
                        break;
                    case "sportId":
                        t.sportId = i[1];
                        break;
                    case "lang":
                        t.lang = i[1];
                        break;
                    case "vidoProvider":
                        t.videoProvider = i[1]
                    }
                }
                return t
            }
            return null
        }
        function r() {
            utility.cookie.write(ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_COOKIE_NAME2, "", ccparam.expireDays)
        }
        function c(n) {
            utility.cookie.write(n ? ccparam.CONTENT_CONSOLE_DEFAULT_PLAY_MOREBET_COOKIE_NAME : ccparam.CONTENT_CONSOLE_CURRENT_PLAY_MOREBET_COOKIE_NAME, "", ccparam.expireDays)
        }
        return {
            clearDefaultBgInfo: r,
            saveLockInfo: n,
            getLockInfoFromCookie: t,
            clearLockInfo: i,
            getDefaultTvInfo: f,
            saveDefaultTvInfo: u,
            getDefaultBgInfo: o,
            saveDefaultBgInfo: e,
            saveMbInfo: s,
            getMbInfo: h,
            clearMbInfo: c
        }
    }
}.createNew()
  , liveCentreControl = {
    createNew: function() {
        function s(n) {
            n == "km-kh" && (n = "en-gb");
            var t = n.split("-")
              , i = "";
            return t.length > 1 ? (t[1] === "zh-cn" && (t[1] = "zh-ch"),
            i = t[0] + "-" + t[1].toUpperCase()) : i = n,
            i
        }
        function h() {
            ccparam.isEnlarge = !0;
            var n = document.getElementById(ccparam.targetId);
            n && (n.width = ccparam ? ccparam.width_enlarge : 418,
            n.height = ccparam ? ccparam.height_enlarge : 346,
            utility.cookie.write(ccparam.CONTENT_CONSOLE_ENLARGE_STATUS, "true", ccparam.expireDays))
        }
        function c() {
            ccparam.isEnlarge = !1;
            var n = document.getElementById(ccparam.targetId);
            n && (n.width = ccparam ? ccparam.width : 240,
            n.height = ccparam ? ccparam.height : 245,
            utility.cookie.write(ccparam.CONTENT_CONSOLE_ENLARGE_STATUS, "false", ccparam.expireDays))
        }
        function l() {
            var n = utility.cookie.read(ccparam.CONTENT_CONSOLE_ENLARGE_STATUS);
            return n ? n == "true" ? !0 : !1 : !1
        }
        function a(r) {
            var u = !1;
            uv.login ? utility.service("LiveTv", "GetEventDetailsWithoutChkRegion", {
                Date: "",
                SportId: ccparam.selSp
            }, "GET", function(f) {
                var p = o.$mainOddsPanel.find(".tvip.bgs"), y;
                if (p.length > 0 && (y = p[0].getAttribute("cc-info"),
                y && y != "")) {
                    var s = y.split("|")
                      , e = s[0]
                      , h = s[1]
                      , c = s[2]
                      , l = s[3]
                      , a = f && f.stv ? s[4] : ""
                      , v = s[5]
                      , w = cookies.getDefaultTvInfo();
                    w ? e != w.playingEventId ? (cookies.saveDefaultTvInfo(e, h, c, l, global.lan, a, v),
                    i(e, h, c, l, a, v)) : e == ccparam.playingEventId || lockInfo.isLock ? om.isPlayingCC || n(e, h, c, l, global.lan, a, v) : i(e, h, c, l, a, v) : (cookies.saveDefaultTvInfo(e, h, c, l, global.lan, a, v),
                    n(e, h, c, l, global.lan, a, v));
                    t();
                    u = !0
                }
                r && r(u)
            }) : (u = !1,
            r && r(u))
        }
        function v(i, r, u, f, e, o, s) {
            try {
                if (t(),
                lockInfo.isLock && ccparam.playingEventId != "")
                    return;
                if (!scorecentre)
                    return;
                if (ccparam.playingEventId == i && ccparam.playingLsId == e)
                    return;
                om.isPlayingCC ? (ccparam.playingEventId = i,
                ccparam.playingLsId = e,
                ccparam.hTeamName = r,
                ccparam.aTeamName = u,
                ccparam.sportId = f,
                ccparam.currentDelayTimesToPlayNextEvent = 0,
                scorecentre.target && scorecentre.target.id && !s ? utility.service("LiveTv", "GetLiveStramProvider", {
                    Date: "",
                    SportId: f,
                    IsCheckUserCanSeeTv: !0,
                    EventId: i
                }, "GET", function(t) {
                    var s = t.pvdr == "s" && e != "" ? t.strmId : e;
                    try {
                        cookies.saveMbInfo(ccparam.playingEventId, ccparam.hTeamName, ccparam.aTeamName, ccparam.sportId, global.lan, s, t.pvdr, !1);
                        scorecentre.iframe.api.loadEvent(i, r, u, f == 1 && s != "" && !t.isBgs ? ccparam.fakeFBId : f, s, t.pvdr)
                    } catch (h) {
                        console.log("api.loadEvent : " + h);
                        n(i, r, u, f, global.lan, e, o)
                    }
                }) : n(i, r, u, f, global.lan, e, o)) : n(i, r, u, f, global.lan, e, o)
            } catch (h) {
                console.log("ContentConsole.js play - Error Message = " + h.message)
            }
        }
        function y() {
            om.isFoundBg = !1;
            om.isPlayingCC = !1;
            ccparam.currentDelayTimesToPlayNextEvent = 0;
            cookies.clearMbInfo(!1)
        }
        function p() {
            ccparam.checkEventTimer && (clearInterval(ccparam.checkEventTimer),
            ccparam.checkEventTimer = null );
            ccparam.checkEventTimer = setInterval(function() {
                utility.service("LiveTv", "CheckPlayingBGEvent", {
                    eventId: ccparam.playingEventId == "" ? "0" : ccparam.playingEventId,
                    sportId: ccparam.sportId == "" ? "0" : ccparam.sportId,
                    IsLiveTvEvent: ccparam.playingLsId != "" ? !0 : !1
                }, "GET", function(n) {
                    typeof n.cdbg != "undefined" && n.cdbg != uv.cdbg && (uv.cdbg = n.cdbg,
                    ccparam.playingEventId = "",
                    ccparam.playingLsId = "",
                    om.isPlayingCC = !1,
                    om.isFoundBg = !1,
                    uv.cdbg ? mpc.pv == 2 ? omb.playCC(!0) : mpc.pv == 1 && n.ipe && om.playCC() : liveCentreControl.clearDefaultBgInfo());
                    n.ipe || (ccparam.currentDelayTimesToPlayNextEvent != ccparam.delayTimesToPlayNextEvent && om.isPlayingCC ? ccparam.currentDelayTimesToPlayNextEvent += 1 : (ccparam.currentDelayTimesToPlayNextEvent = 0,
                    ccparam.playingEventId != "" && (ccparam.previousPlayingEventId = ccparam.playingEventId),
                    ccparam.playingEventId = "",
                    om.isFoundBg = !1,
                    om.isPlayingCC = !1,
                    uv.cdbg && mpc.pv == 1 && (ccparam.previousPlayingEventId == lockInfo.eventId && lockInfo.isLock && Action.RightPanel.TV.toggleLockBtn(!1, !0),
                    w())))
                })
            }, ccparam.checkEventInterval)
        }
        function w() {
            var t, r, u, h, c, e, l, a, s, i, f, n;
            if (liveCentreControl.clearDefaultBgInfo(),
            uv.login && ccparam.playingLsId != "" ? (ccparam.previousPlayingEventId != "" && o.$mainOddsPanel.find("#e" + ccparam.previousPlayingEventId + " .btn-tv-ip").removeClass("bgs"),
            ccparam.playingLsId = "") : ccparam.previousPlayingEventId != "" && o.$mainOddsPanel.find("#e" + ccparam.previousPlayingEventId + " .btn-livematch-ip").addClass("hidden"),
            t = o.$mainOddsPanel.find(".btn-livematch-ip:not(.hidden)"),
            s = !1,
            t.length > 0) {
                for (i = 0; i < t.length; i++)
                    if (r = t[i],
                    r && (f = r.getAttribute("cc-info"),
                    f && f != ""))
                        if (n = f.split("|"),
                        u = n[0],
                        h = n[1],
                        c = n[2],
                        e = n[3],
                        l = n[4],
                        a = n[5],
                        ccparam.previousPlayingEventId != u) {
                            s = !0;
                            break
                        } else
                            r.className += " hidden",
                            i === t.length - 1 && (ccparam.previousPlayingEventId = "")
            } else
                ccparam.previousPlayingEventId = "";
            s && (liveCentreControl.saveDefaultBgInfo(u, h, c, e, global.lan, l, a),
            om.isFoundBg = !0,
            console.log("Find next e : " + u + ", s : " + e));
            om.playCC()
        }
        var u = function() {
            uv.login ? utility.service("LiveTv", "GetLiveEventDetails", {
                Date: ccparam.selDt,
                SportId: ccparam.selSp,
                IsCheckUserCanSeeTv: !0
            }, "GET", function(n) {
                n.stv ? Action.RightPanel.TV.showMenuBtn() : Action.RightPanel.TV.hideMenuBtn()
            }) : Action.RightPanel.TV.hideMenuBtn();
            cookies.getLockInfoFromCookie();
            lockInfo.isLock && (Action.RightPanel.TV.toggleLockBtn(!0, !1),
            r(lockInfo.eventId, lockInfo.hTeamName, lockInfo.aTeamName, lockInfo.sportId, lockInfo.lsId, lockInfo.videoProvider, uv.login))
        }
          , r = function(n, t, r, u, f, e, o) {
            o ? utility.service("LiveTv", "GetLiveEventDetails", {
                Date: "",
                SportId: u,
                IsCheckUserCanSeeTv: !0
            }, "GET", function(o) {
                o.stv || (f = "");
                i(n, t, r, u, f, e)
            }) : i(n, t, r, u, "", e);
            Action.RightPanel.TV.setPlayEventId(n)
        }
          , f = function() {
            var n = $("#noBgMsg").removeClass("hidden");
            n.parent().addClass("noEvents");
            $("#iframeTarget").addClass("hidden");
            ccparam.isHideErrorMsg = !1
        }
          , t = function() {
            var n = $("#noBgMsg").addClass("hidden");
            n.parent().removeClass("noEvents");
            $("#iframeTarget").removeClass("hidden");
            ccparam.isHideErrorMsg = !0
        }
          , n = function(n, i, r, u, f, e, o) {
            var h = ccparam.width
              , c = ccparam.height;
            try {
                if (t(),
                lockInfo.isLock && (n = lockInfo.eventId,
                e = lockInfo.lsId,
                i = lockInfo.hTeamName,
                r = lockInfo.aTeamName,
                u = lockInfo.sportId,
                o = lockInfo.videoProvider),
                ccparam.playingEventId = n,
                ccparam.playingLsId = e,
                ccparam.hTeamName = i,
                ccparam.aTeamName = r,
                ccparam.sportId = u,
                ccparam.videoProvider = o,
                ccparam.currentDelayTimesToPlayNextEvent = 0,
                !scorecentre)
                    return;
                utility.service("LiveTv", "GetLiveStramProvider", {
                    Date: "",
                    SportId: u,
                    IsCheckUserCanSeeTv: !0,
                    EventId: n
                }, "GET", function(t) {
                    var i = t.pvdr == "s" && e != "" ? t.strmId : e
                      , r = pm.parentHost()
                      , o = r == null ? document.location.origin : r;
                    liveCentreControl.getEnlargeStatus() && (h = ccparam.width_enlarge,
                    c = ccparam.height_enlarge);
                    cookies.saveMbInfo(ccparam.playingEventId, ccparam.hTeamName, ccparam.aTeamName, ccparam.sportId, global.lan, i, t.pvdr, !1);
                    scorecentre.iframe.api.create(document.getElementById(ccparam.targetId), h, c, ccparam.domain, n, ccparam.hTeamName, ccparam.aTeamName, u == 1 && i != "" && !t.isBgs ? ccparam.fakeFBId : u, s(f), i, t.pvdr, o);
                    Action.RightPanel.TV.setPlayEventId(n)
                })
            } catch (l) {
                console.log("ContentConsole.js create - Error Message = " + l.message)
            }
        }
          , e = function() {
            utility.service("LiveTv", "GetLiveEventDetails", {
                Date: ccparam.selDt,
                SportId: ccparam.selSp,
                IsCheckUserCanSeeTv: !0
            }, "GET", function(n) {
                Action.RightPanel.TV.tvDataLoaded(n)
            })
        }
          , i = function(i, r, u, f, e, o) {
            try {
                if (t(),
                typeof scorecentre == "undefined" || !scorecentre)
                    return;
                om.isPlayingCC ? (ccparam.playingEventId = i,
                ccparam.playingLsId = e,
                ccparam.hTeamName = r,
                ccparam.aTeamName = u,
                ccparam.sportId = f,
                ccparam.videoProvider = o,
                ccparam.currentDelayTimesToPlayNextEvent = 0,
                scorecentre.target && scorecentre.target.id ? utility.service("LiveTv", "GetLiveStramProvider", {
                    Date: "",
                    SportId: f,
                    IsCheckUserCanSeeTv: !0,
                    EventId: i
                }, "GET", function(t) {
                    var s = t.pvdr == "s" && e != "" ? t.strmId : e;
                    try {
                        cookies.saveMbInfo(ccparam.playingEventId, ccparam.hTeamName, ccparam.aTeamName, ccparam.sportId, global.lan, s, t.pvdr, !1);
                        scorecentre.iframe.api.loadEvent(i, r, u, f == 1 && s != "" && !t.isBgs ? ccparam.fakeFBId : f, s, t.pvdr)
                    } catch (h) {
                        console.log("api.loadEvent : " + h);
                        n(i, r, u, f, global.lan, e, o)
                    }
                }) : n(i, r, u, f, global.lan, e, o)) : n(i, r, u, f, global.lan, e, o)
            } catch (s) {
                console.log("ContentConsole.js playIgnoreLockPlay - Error Message = " + s.message)
            }
        }
          , b = function() {}
          , k = function() {}
          , d = function() {}
          , g = function() {}
        ;
        return {
            Init: u,
            showErrorMsg: f,
            hideErrorMsg: t,
            clearDefaultBgInfo: cookies.clearDefaultBgInfo,
            playIgnoreLock: r,
            saveLockInfo: cookies.saveLockInfo,
            loadEvent: e,
            playDefault: a,
            play: v,
            resetToDefault: y,
            getDefaultBgInfo: cookies.getDefaultBgInfo,
            saveMbInfo: cookies.saveMbInfo,
            saveDefaultBgInfo: cookies.saveDefaultBgInfo,
            getMbInfo: cookies.getMbInfo,
            clearMbInfo: cookies.clearMbInfo,
            enlarge: h,
            shrink: c,
            getEnlargeStatus: l,
            checkPlayingEvent: p,
            create: n
        }
    }
}.createNew()
  , UI = ReactModule.createModule("ui", {}, function() {
    Object.defineProperty(this, "state", {
        get: function() {
            return UI.store.ui.state
        }
    });
    Object.defineProperty(this, "view", {
        get: function() {
            return UI.store.ui.state.view
        }
    });
    Object.defineProperty(this, "left", {
        get: function() {
            return UI.store.ui.state.left
        }
    });
    Object.defineProperty(this, "center", {
        get: function() {
            return UI.store.ui.state.center
        }
    });
    Object.defineProperty(this, "right", {
        get: function() {
            return UI.store.ui.state.right
        }
    });
    Object.defineProperty(this, "indicator", {
        get: function() {
            return UI.store.ui.props.INDICATOR
        }
    });
    Object.defineProperty(this, "rightPanelEnlarge", {
        get: function() {
            return liveCentreControl.getEnlargeStatus()
        },
        set: function(n) {
            n ? liveCentreControl.enlarge() : liveCentreControl.shrink()
        }
    });
    Object.defineProperty(this, "browser", {
        get: function() {
            return this.store.ui.state.browser
        }
    });
    Object.defineProperty(this, "isIE", {
        get: function() {
            var n = this.store.ui.state.browser;
            return _.startsWith(n, "IE") || _.startsWith(n, "MSIE") || _.startsWith(n, "Edge")
        }
    });
    Object.defineProperty(this, "isMACFirefox", {
        get: function() {
            var n = this.store.ui.state.browser;
            return navigator.platform == "MacIntel" && _.startsWith(n, "Firefox")
        }
    });
    Object.defineProperty(this, "isMACSafari", {
        get: function() {
            var n = this.store.ui.state.browser;
            return navigator.platform == "MacIntel" && _.startsWith(n, "Safari")
        }
    })
})
  , UIVIEW = {
    NORMAL: 1440,
    R1024: 1024,
    R1280: 1280
};
UI.createStore("ui", {
    init: function() {
        $("#sbody").addClass(this.props.VIEWCSS.NORMAL);
        this.state.viewCss = this.props.VIEWCSS.NORMAL;
        this.state.view = UIVIEW.NORMAL;
        this.state.indicator = this.props.INDICATOR.WINDOW;
        this.updateSize();
        $(window).resize(function() {
            this.updateSize()
        }
        .bind(this));
        this.state.browser = navigator.sayswho = function() {
            var i = navigator.userAgent, t, n = i.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            return /trident/i.test(n[1]) ? (t = /\brv[ :]+(\d+)/g.exec(i) || [],
            "IE " + (t[1] || "")) : n[1] === "Chrome" && (t = i.match(/\b(OPR|Edge)\/(\d+)/),
            t != null ) ? t.slice(1).join(" ").replace("OPR", "Opera") : (n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"],
            (t = i.match(/version\/(\d+)/i)) != null && n.splice(1, 1, t[1]),
            n.join(" "))
        }()
    },
    props: {
        INDICATOR: {
            WINDOW: 0,
            LEFT: 1,
            CENTER: 2,
            RIGHT: 3
        },
        VIEWCSS: {
            NORMAL: "res1440",
            R1024: "res1024",
            R1280: "res1280"
        }
    },
    state: {
        w: 0,
        h: 0,
        view: null ,
        viewCss: null ,
        indicator: !1,
        left: {
            minimized: !1
        },
        center: {
            is1stHalfOn: null ,
            isBasketball: !1
        },
        right: {
            isLarge: !1
        },
        pv: 0,
        isInplay: !1,
        uiBetType: null ,
        browser: !1
    },
    methods: {
        update: function() {
            var n = UI.rightPanelEnlarge;
            switch (this.state.indicator) {
            case this.props.INDICATOR.LEFT:
                switch (this.state.view) {
                case UIVIEW.R1024:
                    this.state.center.is1stHalfOn = this.state.left.minimized ? !0 : !1;
                    this.state.right.isLarge = !1;
                    break;
                case UIVIEW.R1280:
                    this.state.pv == 2 ? this.state.left.minimized = !1 : this.state.left.minimized ? (this.state.center.is1stHalfOn = !0,
                    this.state.right.isLarge = !0) : this.state.right.isLarge = this.state.center.is1stHalfOn || this.state.center.isBasketball ? !1 : !0;
                    break;
                case UIVIEW.NORMAL:
                default:
                    this.state.left.minimized = !1
                }
                break;
            case this.props.INDICATOR.CENTER:
                switch (this.state.view) {
                case UIVIEW.R1024:
                    this.state.pv == 2 ? (this.state.left.minimized = this.state.isInplay ? !0 : !1,
                    this.state.right.isLarge = this.state.isInplay ? !0 : !1) : this.state.center.is1stHalfOn != null && (this.state.center.is1stHalfOn ? n ? this.state.right.isLarge = !1 : this.state.left.minimized = !0 : n || (this.state.left.minimized = !1));
                    break;
                case UIVIEW.R1280:
                    this.state.pv == 2 ? (this.state.left.minimized = !1,
                    this.state.right.isLarge = !0) : this.state.pv == 1 && (this.state.left.minimized = this.state.center.is1stHalfOn || this.state.center.isBasketball ? this.state.isInplay && n ? !0 : !1 : !1);
                    break;
                case UIVIEW.NORMAL:
                default:
                    this.state.left.minimized = !1;
                    this.state.right.isLarge = this.state.pv == 2 || this.state.isInplay ? !0 : !1
                }
                break;
            case this.props.INDICATOR.RIGHT:
                switch (this.state.view) {
                case UIVIEW.R1024:
                    this.state.left.minimized = this.state.right.isLarge ? !0 : !1;
                    this.state.center.is1stHalfOn = !1;
                    break;
                case UIVIEW.R1280:
                    this.state.left.minimized = this.state.pv == 2 ? !1 : this.state.right.isLarge && (this.state.center.is1stHalfOn || this.state.center.isBasketball) ? !0 : !1;
                    break;
                case UIVIEW.NORMAL:
                default:
                    this.state.left.minimized = !1
                }
                break;
            case this.props.INDICATOR.WINDOW:
            default:
                switch (this.state.view) {
                case UIVIEW.R1024:
                    this.state.pv == 2 ? this.state.isInplay ? (this.state.left.minimized = n ? !0 : !1,
                    this.state.right.isLarge = n) : (this.state.left.minimized = !1,
                    this.state.right.isLarge = !1) : this.state.center.is1stHalfOn ? (this.state.left.minimized = !0,
                    this.state.right.isLarge = !1) : (this.state.left.minimized = n ? !0 : !1,
                    this.state.right.isLarge = n);
                    break;
                case UIVIEW.R1280:
                    this.state.pv == 2 ? (this.state.left.minimized = !1,
                    this.state.right.isLarge = !0) : this.state.center.is1stHalfOn || this.state.center.isBasketball || n ? (this.state.left.minimized = (this.state.center.is1stHalfOn || this.state.center.isBasketball) && n ? !0 : !1,
                    this.state.right.isLarge = n) : (this.state.left.minimized = !1,
                    this.state.right.isLarge = !1);
                    break;
                case UIVIEW.NORMAL:
                default:
                    this.state.left.minimized = !1;
                    this.state.right.isLarge = this.state.pv == 2 || this.state.isInplay ? !0 : !1
                }
            }
            this.state.pv == 0 ? (this.state.left.minimized = !1,
            this.state.right.isLarge = !1) : this.state.pv == 1 ? (o.param.UIBetType != "ftahou" && o.param.UIBetType != "ft1x2" && (this.state.left.minimized = !1),
            this.state.isInplay || (this.state.right.isLarge = !1)) : this.state.pv == 3 && o.param.Tab != "Inplay" && (this.state.left.minimized = !1,
            this.state.right.isLarge = !1);
            this.updateCenterPanel()
        },
        updateSize: function() {
            this.state.w = $(window).width();
            this.state.h = $(window).height();
            var n = this.getView()
              , t = n != this.state.view;
            t && (this.state.view = n,
            this.state.indicator = this.props.INDICATOR.WINDOW,
            this.update(),
            this.updateBodyCss(),
            this.dispatch())
        },
        getView: function() {
            var n;
            return n = typeof window.outerWidth != "undefined" && window.outerWidth != 0 ? window.outerWidth : $(window).outerWidth(!0) + 23,
            n < UIVIEW.R1280 ? UIVIEW.R1024 : n >= UIVIEW.NORMAL ? UIVIEW.NORMAL : UIVIEW.R1280
        },
        updateBodyCss: function() {
            var n;
            switch (this.state.view) {
            case UIVIEW.R1024:
                n = this.props.VIEWCSS.R1024;
                break;
            case UIVIEW.R1280:
                n = this.props.VIEWCSS.R1280;
                break;
            default:
                n = this.props.VIEWCSS.NORMAL
            }
            $("#sbody").removeClass(this.state.viewCss).addClass(n);
            this.state.viewCss = n
        },
        updateCenterPanel: function() {
            var n = $("#center-panel");
            this.state.left.minimized ? n.addClass("left-min").removeClass("left-normal") : n.addClass("left-normal").removeClass("left-min");
            this.state.right.isLarge ? n.addClass("right-enlarge").removeClass("right-normal") : n.addClass("right-normal").removeClass("right-enlarge")
        },
        hasBasketball: function(n) {
            if (_.isArray(n))
                for (var t = 0; t < n.length; t++)
                    if (n[t].k == 2)
                        return !0;
            return !1
        },
        dispatch: function() {
            Action.uiChange(_.clone(this.state, !0))
        },
        SITEREFRESH: function(n) {
            o.param.IsFirstLoad && (this.state.center.is1stHalfOn = null ,
            this.state.center.isBasketball = this.hasBasketball(_.isUndefined(n.mod) ? null : n.mod.d),
            this.state.pv = n.mpc.pv,
            this.state.isInplay = n.selobj.ip,
            this.state.uiBetType = o.param.UIBetType,
            this.update(),
            this.dispatch())
        }
    },
    public: {
        LEFTPANEL_COLLAPSE: function(n) {
            var t = this.state.left.minimized != n;
            t && (this.state.left.minimized = n,
            this.state.indicator = this.props.INDICATOR.LEFT,
            this.update(),
            this.dispatch())
        },
        RPRESIZE: function(n) {
            var t = this.state.right.isLarge != n;
            t && (this.state.right.isLarge = n,
            this.state.indicator = this.props.INDICATOR.RIGHT,
            this.update(),
            this.dispatch())
        },
        MPRESIZE: function(n) {
            var t = this.state.center.is1stHalfOn != n;
            t && (this.state.center.is1stHalfOn = n,
            this.state.indicator = this.props.INDICATOR.CENTER,
            this.update(),
            this.dispatch())
        }
    }
});
ReactModule.publicToModule(UI, "ui");
Timer = ReactModule.createModule("Timer");
Timer.createSingularStore({
    init: function() {
        var n = this;
        this.props.timer.add(1e3, function() {
            n.tick();
            n.trigger()
        })
    },
    props: {
        timer: function() {
            function o(n, t, i) {
                var u = t
                  , f = !1;
                this.id = n;
                this.interval = t;
                this.Work = i;
                this.step = function() {
                    f && (u -= r,
                    u <= 0 && (u = this.interval,
                    this.Work()))
                }
                ;
                this.start = function() {
                    f || (u = this.interval,
                    f = !0)
                }
                ;
                this.stop = function() {
                    f = !1
                }
                ;
                this.toggle = function(n) {
                    n ? this.start() : this.stop()
                }
                ;
                this.getDesc = function() {
                    return {
                        id: this.id,
                        interval: this.interval
                    }
                }
            }
            function i(t) {
                for (var i = 0; i < n.length; i++)
                    if (n[i].id == t)
                        return {
                            i: i,
                            item: n[i]
                        }
            }
            function f(f, e) {
                var s, o;
                if (f)
                    s = i(f),
                    s && s.item.toggle(e);
                else
                    for (o = 0; o < n.length; o++)
                        n[o].toggle(e);
                e && !t && (t = !0,
                u = window.setInterval(function() {
                    for (o = 0; o < n.length; o++)
                        n[o].step()
                }, r))
            }
            var r = 1e3, t = !1, n = [], u, e = 1;
            return {
                add: function() {
                    var t, r, u, f, s;
                    if (arguments.length == 3)
                        t = arguments[0],
                        r = arguments[1],
                        u = arguments[2];
                    else if (arguments.length == 2)
                        t = e++,
                        r = arguments[0],
                        u = arguments[1];
                    else
                        return;
                    return f = new o(t,r,u),
                    s = i(t),
                    s ? n[s.i] = f : n.push(f),
                    t
                },
                remove: function(t) {
                    var r = i(t);
                    r && n.splice(r.i, 1)
                },
                getJobs: function() {
                    for (var i = [], t = 0; t < n.length; t++)
                        i.push(n[t].getDesc());
                    return i
                },
                start: function(n) {
                    f(n, !0)
                },
                stop: function(n) {
                    f(n, !1)
                },
                destory: function() {
                    n = [];
                    t && (t = !1,
                    clearInterval(u))
                },
                restart: function() {
                    this.destory();
                    this.start()
                }
            }
        }()
    },
    state: {
        period: 0,
        tick: 0,
        schedule: {}
    },
    methods: {
        SITEREFRESH: function(n) {
            this.updateData(n)
        },
        TIMERRESET: function() {
            this.state.period = 0;
            this.state.schedule = {}
        },
        updateData: function() {
            this.props.timer.stop();
            this.props.timer.destory();
            this.state.tick = this.state.period = 0;
            this.state.schedule = {};
            var n = this;
            this.props.timer.add(1e3, function() {
                n.tick();
                n.trigger()
            });
            this.props.timer.start()
        },
        tick: function() {
            this.state.tick++;
            this.state.period++;
            this.state.schedule[this.state.tick] && _.map(this.state.schedule[this.state.tick], function(n) {
                try {
                    n.c(this.state.tick)
                } catch (t) {
                    console.error(t)
                }
            }, this)
        }
    },
    public: {
        after: function(n, t) {
            var u = this.state.tick, i = u + n, r;
            return this.state.schedule[i] || (this.state.schedule[i] = []),
            r = {
                c: t
            },
            this.state.schedule[i].push(r),
            function() {
                r.c = function(n) {
                    console.log("task cancel at " + n)
                }
            }
        },
        interval: function(n, t) {
            var r = this
              , i = this.props.timer.add(n * 1e3, function() {
                t(r.state.tick)
            });
            return this.props.timer.start(i),
            i
        },
        remove: function(n) {
            this.props.timer.remove(n)
        }
    }
});
ReactModule.publicToModule(Timer);
var ScrollerBar = function() {
    function h() {
        UI.isIE || (t.hasClass("jspScrollable") ? i.reinitialise() : (t.jScrollPane({
            showArrows: !1,
            hideFocus: !0,
            verticalGutter: 0,
            horizontalGutter: 0,
            keepTrack: !0
        }),
        i = t.data("jsp"),
        $(window).bind("resize", i.reinitialise)),
        e = !0)
    }
    function c() {
        u = $("#quickMenu");
        n = $("#quickMenuContainer");
        f = $("#quickMenuOptions");
        s();
        n.hasClass("jspScrollable") ? (r.reinitialise(),
        r.scrollTo(0, 0)) : (n.jScrollPane({
            showArrows: !1,
            hideFocus: !0,
            verticalGutter: 0,
            horizontalGutter: 0,
            keepTrack: !1
        }),
        r = n.data("jsp"),
        $(window).bind("resize", function() {
            u.hasClass("collapsed") || (s(),
            r.reinitialise())
        }))
    }
    function l() {
        if (UI.isIE)
            t[0].scrollTop = 0;
        else if (e)
            i.scrollTo(0, 0);
        else
            throw new Error("Scroll Bar Has Not Been Initialized. Pls Call initScrollbarStatus() Before Using This Function.");
    }
    function s() {
        var i = $("#ftbanner"), r = f.outerHeight(), u = o.$mainOddsPanel.height() + (i.hasClass("hidden") ? 0 : i.height()), t;
        winHeight = $(window).height();
        t = (u > winHeight ? u : winHeight) - n.offset().top - 10;
        n.height(t > r ? r : t)
    }
    var i, r, u, n, f, e = !1, t = $("#center-panel");
    return {
        initScrollbarStatus: h,
        initQuickMenuScrollbar: c,
        scrollToTop: l
    }
}()
  , FSB_Store = {
    createNew: function() {
        var n = {
            isDisplay: !1,
            content: null
        }
          , t = {
            updateEvent: "FSB_Update"
        }
          , u = dispatcher.register(function(t) {
            switch (t.type) {
            case CONSTANTS.FULLSCREENBLOCK.SHOW:
                n.isDisplay = !0;
                n.content = t.content;
                r();
                break;
            case CONSTANTS.FULLSCREENBLOCK.HIDE:
                n.isDisplay = !1;
                n.content = null ;
                r()
            }
        })
          , r = function() {
            i.trigger("FSB_Update")
        }
          , i = $({});
        return {
            DispatchToken: u,
            addUpdateListener: function(n, r) {
                var u = r ? t.updateEvent + "." + r : t.updateEvent;
                i.on(u, n)
            },
            removeUpdateListener: function(n) {
                var r = n ? t.updateEvent + "." + n : t.updateEvent;
                i.off(r)
            },
            getData: function() {
                return n
            }
        }
    }
}.createNew()
  , PopUp_Store = {
    createNew: function() {
        var n = {
            isDisplay: !1,
            isAddedMsg: !1,
            popupType: null
        }
          , u = {
            MYEVENTS: "MYEVENTS",
            MYMARKETS: "MYMARKETS"
        }
          , t = {
            updateEvent: "POPUP_Update"
        }
          , f = dispatcher.register(function(t) {
            switch (t.type) {
            case CONSTANTS.POPUP.SHOW:
                n.isDisplay = !0;
                n.isAddedMsg = t.isAddedMsg;
                n.popupType = t.popupType;
                r();
                break;
            case CONSTANTS.POPUP.HIDE:
                n.isDisplay = !1;
                r()
            }
        })
          , r = function() {
            i.trigger("POPUP_Update")
        }
          , i = $({});
        return {
            DispatchToken: f,
            addUpdateListener: function(n, r) {
                var u = r ? t.updateEvent + "." + r : t.updateEvent;
                i.on(u, n)
            },
            removeUpdateListener: function(n) {
                var r = n ? t.updateEvent + "." + n : t.updateEvent;
                i.off(r)
            },
            getData: function() {
                return n
            },
            popUpType: function() {
                return u
            }
        }
    }
}.createNew()
  , BS = {
    service: {
        betSlipService: "BetSlipService",
        placeBetService: "PlaceBetNew",
        getSelectionService: "GetBySelectionId",
        getRetainService: "GetRetainSelectionId",
        getRemainService: "GetRemainSelectionId",
        getSummaryService: "GetSummary",
        updateAcceptBetterOddsService: "UpdateAcceptBetterOdds",
        updateShowBetConfirmationService: "UpdateShowBetConfirmation"
    },
    MODE: "DEFAULT",
    GROUP: "#,###.00",
    expireDays: {
        expires: 0,
        path: "/"
    },
    strSelList: "",
    strEventList: "",
    strOddsList: "",
    strHdpList: "",
    strScoreList: "",
    strAmtList: "",
    strInplayList: "",
    strParlayList: "",
    strClosedList: "",
    strParentEventList: "",
    SEPARATOR: "_",
    selListCookies: "BetSlip@strSelList",
    eventListCookies: "BetSlip@strEventList",
    amtListCookies: "BetSlip@strAmtList",
    inplayListCookies: "BetSlip@strInplayList",
    cbStakeCookies: "BetSlip@strCBStakeList",
    oddsListCookies: "BetSlip@strOddsList",
    hdpListCookies: "BetSlip@strHdpList",
    scoreListCookies: "BetSlip@strScoreList",
    parlayListCookies: "BetSlip@strParlayList",
    expandCBCookies: "BetSlip@expandCombo",
    EnableRetainCookie: "BetSlip@eRetain",
    parentEventListCookie: "BetSlip@strParentEventList",
    bsCookiesValues: [],
    refreshId: null ,
    isPopUp: !1,
    source: 1,
    processing: !1,
    _eventInstance: $({}),
    Events: {
        ExceedMaxiumSelections: "BSExceedMaxiumSelections",
        RemoveHighlightOdds: "BSRemoveHighlightOdds",
        HighlightOdds: "BSHighlightOdds",
        UpdateBetslip: "BSUpdateBetslip",
        UpdateSummary: "BSUpdateSummary",
        Processing: "BSProcessing",
        Completed: "BSCompleted",
        ToggleAcceptBetterOdds: "BSToggleAcceptBetterOdds",
        ToggleShowBetConfirmation: "BSToggleShowBetConfirmation",
        ShowBetConfirm: "BSShowBetConfirm",
        RefreshBalance: "BSRefreshBalance",
        DisplayMessage: "BSDisplayMessage"
    },
    fire: function(n, t) {
        BS._eventInstance.trigger(n, t)
    },
    on: function(n, t, i) {
        if (n && n != "") {
            var r = t ? n + "." + t : n;
            BS._eventInstance.on(r, i)
        }
    }
};
BS.bsCookie = {
    saveCookieValues: function(n, t, i) {
        if (BS.bsCookiesValues == null || BS.bsCookiesValues.length == 0) {
            var r = utility.cookie.read("BS@Cookies");
            r != null && (BS.bsCookiesValues = r.split("#"));
            (BS.bsCookiesValues == null || BS.bsCookiesValues.length < 12) && (BS.bsCookiesValues = ["", "", "", "", "", "", "", "", "", "true", "", ""])
        }
        if (BS.bsCookiesValues.length == 12) {
            switch (n) {
            case "BetSlip@strSelList":
                BS.bsCookiesValues[0] = t;
                break;
            case "BetSlip@strEventList":
                BS.bsCookiesValues[1] = t;
                break;
            case "BetSlip@strAmtList":
                BS.bsCookiesValues[2] = t;
                break;
            case "BetSlip@strInplayList":
                BS.bsCookiesValues[3] = t;
                break;
            case "BetSlip@strCBStakeList":
                BS.bsCookiesValues[4] = t;
                break;
            case "BetSlip@strOddsList":
                BS.bsCookiesValues[5] = t;
                break;
            case "BetSlip@strHdpList":
                BS.bsCookiesValues[6] = t;
                break;
            case "BetSlip@strScoreList":
                BS.bsCookiesValues[7] = t;
                break;
            case "BetSlip@strParlayList":
                BS.bsCookiesValues[8] = t;
                break;
            case "BetSlip@expandCombo":
                BS.bsCookiesValues[9] = t;
                break;
            case "BetSlip@eRetain":
                BS.bsCookiesValues[10] = t;
                break;
            case "BetSlip@strParentEventList":
                BS.bsCookiesValues[11] = t
            }
            return i && BS.bsCookie.saveSelectionsToCookie(),
            !0
        }
        return !1
    },
    saveSelectionsToCookie: function() {
        BS.bsCookiesValues && $.isArray(BS.bsCookiesValues) && BS.bsCookiesValues.length == 12 ? utility.cookie.write("BS@Cookies", BS.bsCookiesValues.join("#"), BS.expireDays) : utility.cookie.write("BS@Cookies", "", BS.expireDays)
    },
    clearBSCookies: function() {
        utility.cookie.write("BS@Cookies", "", BS.expireDays);
        BS.bsCookiesValues = ["", "", "", "", "", "", "", "", "", "true", "", ""]
    },
    getCookieValue: function(n) {
        if (BS.bsCookiesValues == null || BS.bsCookiesValues.length == 0) {
            var t = utility.cookie.read("BS@Cookies");
            t != null && (BS.bsCookiesValues = t.split("#"));
            (BS.bsCookiesValues == null || BS.bsCookiesValues.length < 12) && (BS.bsCookiesValues = ["", "", "", "", "", "", "", "", "", "true", "", ""])
        }
        if (BS.bsCookiesValues.length == 12)
            switch (n) {
            case "BetSlip@strSelList":
                return BS.bsCookiesValues[0];
            case "BetSlip@strEventList":
                return BS.bsCookiesValues[1];
            case "BetSlip@strAmtList":
                return BS.bsCookiesValues[2];
            case "BetSlip@strInplayList":
                return BS.bsCookiesValues[3];
            case "BetSlip@strCBStakeList":
                return BS.bsCookiesValues[4];
            case "BetSlip@strOddsList":
                return BS.bsCookiesValues[5];
            case "BetSlip@strHdpList":
                return BS.bsCookiesValues[6];
            case "BetSlip@strScoreList":
                return BS.bsCookiesValues[7];
            case "BetSlip@strParlayList":
                return BS.bsCookiesValues[8];
            case "BetSlip@expandCombo":
                return BS.bsCookiesValues[9];
            case "BetSlip@eRetain":
                return BS.bsCookiesValues[10];
            case "BetSlip@strParentEventList":
                return BS.bsCookiesValues[11]
            }
        return ""
    },
    loadCookieValues: function() {
        BS.bsCookie.getCookieValue("")
    }
};
BS.Utility = {
    Replace: function(n) {
        return n == "" ? 0 : (typeof n != "string" && (n = "" + n),
        n = n.replace(/[^a-zA-Z 0-9.]+/g, ""),
        parseFloat(n))
    },
    AddCommas: function(n) {
        n += "";
        x = n.split(".");
        x1 = x[0] != "" ? BS.Utility.Replace(x[0]).toString() : "";
        x2 = x.length > 1 ? "." + x[1] : "";
        for (var t = /(\d+)(\d{3})/; t.test(x1); )
            x1 = x1.replace(t, "$1,$2");
        return x1 + x2
    },
    Combination: function(n, t) {
        return BS.Utility.Factorial(n) / (BS.Utility.Factorial(t) * BS.Utility.Factorial(n - t))
    },
    Factorial: function(n) {
        for (var i = 1, t = 2; t < n + 1; t++)
            i *= t;
        return i
    },
    FullCoverWager: function(n) {
        switch (n) {
        case 3:
            return 11;
        case 4:
            return 12;
        case 5:
            return 13;
        case 6:
            return 14;
        case 7:
            return 15;
        case 8:
            return 16;
        case 9:
            return 17;
        case 10:
            return 18
        }
        return null
    },
    IgnoreInput: function(n) {
        var t = BS.Utility.GetKeyCode(n);
        return t >= KEY_A && t <= KEY_Z || t == ($.ui ? $.ui.keyCode.TAB : 9) || t == ($.ui ? $.ui.keyCode.SHIFT : 16) || t == 13 ? !0 : !1
    },
    GetKeyCode: function(n) {
        return n.keyCode ? n.keyCode : n.which
    },
    FormatPrice: function(n) {
        var t = $("<div>" + n + "<\/div>");
        return t.format({
            format: BS.GROUP,
            locale: "us"
        }),
        t.text()
    },
    Truncate: function(n, t) {
        return n.length > t && $.browser.mozilla ? n.substring(0, t - 3) + "..." : n
    }
};
BS.getBetSlipdata = function() {
    return BS_Store.getData()
}
;
BS.PopulateParams = function(n, t, i) {
    var u, r;
    BS.strSelList = "";
    BS.strEventList = "";
    BS.strOddsList = "";
    BS.strHdpList = "";
    BS.strScoreList = "";
    BS.strAmtList = "";
    BS.strInplayList = "";
    BS.strParlayList = "";
    BS.strClosedList = "";
    BS.strParentEventList = "";
    try {
        if (n.s[0] != null )
            if (t || n.k == !0 && (n.s = $.grep(n.s, function(n) {
                return n.rsl != 9999 && n.rsl != 8888
            })),
            i)
                for (u = 0; u < n.s.length; u++) {
                    var r = n.s[u]
                      , f = r.st
                      , e = !isNaN(f) && f > 0 ? f : 0;
                    BS.strSelList += r.sid + BS.SEPARATOR;
                    BS.strEventList += r.eid + BS.SEPARATOR;
                    BS.strOddsList += r.o + BS.SEPARATOR;
                    BS.strHdpList += r.hd + BS.SEPARATOR;
                    BS.strScoreList += r.hs + ":" + r.as + BS.SEPARATOR;
                    BS.strAmtList += e + BS.SEPARATOR;
                    BS.strInplayList += r.ip + BS.SEPARATOR;
                    BS.strParlayList += r.ap + BS.SEPARATOR;
                    BS.strClosedList += r.rsl + BS.SEPARATOR;
                    BS.strParentEventList += r.peid + BS.SEPARATOR
                }
            else
                for (u = 0; u < n.s.length; u++)
                    r = n.s[u],
                    BS.strSelList += r.sid + BS.SEPARATOR,
                    BS.strEventList += r.eid + BS.SEPARATOR,
                    BS.strOddsList += r.o + BS.SEPARATOR,
                    BS.strHdpList += r.hd + BS.SEPARATOR,
                    BS.strScoreList += r.hs + ":" + r.as + BS.SEPARATOR,
                    BS.strAmtList += r.st + BS.SEPARATOR,
                    BS.strInplayList += r.ip + BS.SEPARATOR,
                    BS.strParlayList += r.ap + BS.SEPARATOR,
                    BS.strClosedList += r.rsl + BS.SEPARATOR,
                    BS.strParentEventList += r.peid + BS.SEPARATOR
    } catch (o) {
        console.log(o)
    }
    BS.strSelList = BS.strSelList.slice(0, -1);
    BS.strEventList = BS.strEventList.slice(0, -1);
    BS.strOddsList = BS.strOddsList.slice(0, -1);
    BS.strHdpList = BS.strHdpList.slice(0, -1);
    BS.strScoreList = BS.strScoreList.slice(0, -1);
    BS.strAmtList = BS.strAmtList.slice(0, -1);
    BS.strInplayList = BS.strInplayList.slice(0, -1);
    BS.strParlayList = BS.strParlayList.slice(0, -1);
    BS.strClosedList = BS.strClosedList.slice(0, -1);
    BS.strParentEventList = BS.strParentEventList.slice(0, -1);
    BS.bsCookie.saveCookieValues(BS.selListCookies, BS.strSelList);
    BS.bsCookie.saveCookieValues(BS.eventListCookies, BS.strEventList);
    BS.bsCookie.saveCookieValues(BS.amtListCookies, BS.strAmtList);
    BS.bsCookie.saveCookieValues(BS.inplayListCookies, BS.strInplayList);
    BS.bsCookie.saveCookieValues(BS.parlayListCookies, BS.strParlayList);
    BS.bsCookie.saveCookieValues(BS.parentEventListCookie, BS.strParentEventList);
    BS.bsCookie.saveSelectionsToCookie()
}
;
BS.PopulateComboData = function(n, t) {
    var s = BS.GenerateComboBet(BS.CountCombination(n, BS.strEventList, BS.strInplayList, BS.strParlayList, BS.strClosedList, BS.strParentEventList)), u, i, f, e, o, r;
    if (n.cinfo[0] != null && (n.c = [],
    s != null && s != ""))
        for (u = s.split(BS.SEPARATOR),
        n.cno = u.length,
        i = BS.bsCookie.getCookieValue(BS.cbStakeCookies),
        i != null && (i = i.split(BS.SEPARATOR),
        i.length != u.length && (i = null )),
        f = 0; f < u.length; f++)
            if (e = u[f].split("@"),
            u.length > 0)
                for (o = 0; o < n.cinfo.length; o++)
                    if (r = n.cinfo[o],
                    r.wid == e[0]) {
                        n.c[f] = {
                            wid: parseFloat(e[0]),
                            bc: parseFloat(e[1]),
                            cba: i != null && !t ? BS.Utility.Replace(i[f]) : 0,
                            cbn: r.cbn,
                            cbs: {
                                bmax: r.cbs.bmax,
                                dm: r.cbs.dm,
                                bpay: r.cbs.bpay,
                                bmin: r.cbs.bmin
                            }
                        };
                        break
                    }
}
;
BS.GenerateComboBet = function(n) {
    var f = 0, i = 0, r = "", u, t;
    if (BS.strEventList = BS.bsCookie.getCookieValue(BS.eventListCookies),
    BS.strEventList == null )
        return null ;
    if (u = BS.strEventList.split(BS.SEPARATOR),
    i = u.length,
    u.length > 1 && i > 1 && (r += "1@" + i),
    n > 0) {
        for (t = 1; t <= n; t++)
            f += BS.Utility.Combination(n, t),
            t > 1 && (r += BS.SEPARATOR + t + "@" + BS.Utility.Combination(n, t));
        n > 2 && (r += BS.SEPARATOR + BS.Utility.FullCoverWager(n) + "@" + (f - n))
    }
    return r
}
;
BS.CountCombination = function(n, t, i, r, u, f) {
    var h = t.split(BS.SEPARATOR), p = i.split(BS.SEPARATOR), w = r.split(BS.SEPARATOR), b = u.split(BS.SEPARATOR), c = f.split(BS.SEPARATOR), o = [], l = [], k = 0, a, v, e, y, s;
    if (n.iscom = !0,
    h.length == 1)
        return 0;
    for (e = 0,
    y = h.length; e < y; e++) {
        if (p[e] == "true" || w[e] == "false" || b[e] == "8888") {
            n.iscom = !1;
            continue
        }
        for (s = 0; s < o.length; s++)
            (o[s] == h[e] || o[s] == c[e]) && (l[k++] = c[e],
            n.iscom = !1);
        o[o.length] = c[e];
        a = l.unique().length;
        v = o.unique().length
    }
    return n.canNotParlay = l.unique(),
    v - a
}
;
BS.verifyEventId = function(n, t) {
    var i = BS.getBetSlipdata(), r, u;
    if (i.s[0] != null ) {
        for (r = 0; r < i.s.length; r++)
            if (u = i.s[r],
            u.sid == n && u.eid == t)
                return "UPDATE";
        if (i.s.length > 9)
            return "STOP"
    }
    return "ADD"
}
;
BS.AddSelection = function(n, t, i, r, u, f, e) {
    var o, c, s, h;
    BS.MODE == "PROCESSED" || BS.MODE == "PROCESSING" || n == null || isNaN(n) || t == null || isNaN(t) || i == null || isNaN(BS.Utility.Replace(i)) ? BS.MODE == "PROCESSED" || BS.MODE == "PROCESSING" ? (BS.MODE == "PROCESSING",
    _.includes(h, n) || BS.fire(BS.Events.RemoveHighlightOdds, [["" + n]])) : BS.fire(BS.Events.DisplayMessage, [l.BS_ParameterInvalid, l.BS_SelectionInvalid]) : (BS.MODE == "SUMMARY" && (BS.EmptyBetSlip(),
    BS.MODE = "PLACEBET"),
    o = BS.verifyEventId(n, t),
    /UPDATE/i.test(o) ? BS.RemoveSelection(n) : /ADD/i.test(o) ? (c = !1,
    BS.MODE = "PROCESSING",
    s = BS.getBetSlipdata(),
    BS.PopulateParams(s, !1, !0),
    s.s[0] != null ? (BS.strSelList = n + BS.SEPARATOR + BS.strSelList,
    BS.strEventList = t + BS.SEPARATOR + BS.strEventList,
    BS.strOddsList = i + BS.SEPARATOR + BS.strOddsList,
    BS.strHdpList = r + BS.SEPARATOR + BS.strHdpList,
    BS.strScoreList = u + BS.SEPARATOR + BS.strScoreList,
    BS.strAmtList = "0" + BS.SEPARATOR + BS.strAmtList,
    BS.strInplayList = f + BS.SEPARATOR + BS.strInplayList,
    BS.strParentEventList = e + BS.SEPARATOR + BS.strParentEventList) : (c = !0,
    BS.strSelList += n,
    BS.strEventList += t,
    BS.strOddsList += i,
    BS.strHdpList += r,
    BS.strScoreList += u,
    BS.strAmtList += "0",
    BS.strInplayList += f,
    BS.strParentEventList += e),
    utility.service(BS.service.betSlipService, BS.service.getSelectionService, {
        SelList: BS.strSelList,
        EventList: BS.strEventList,
        OddsList: BS.strOddsList,
        HdpList: BS.strHdpList,
        ScoreList: BS.strScoreList,
        SStakeList: BS.strAmtList,
        InplayList: BS.strInplayList,
        ParentEventList: BS.strParentEventList
    }, "GET", function(n) {
        BS.WriteExpandCBCookies(!0);
        BS.PopulateParams(n, !1, !1);
        BS.PopulateComboData(n);
        BS.UpdateBetSlip(n)
    }, function() {
        BS.MODE = betSlipJson.s[0] != null ? "PLACEBET" : "DEFAULT"
    })) : (h = BS.strSelList.split(BS.SEPARATOR),
    _.includes(h, n) || BS.fire(BS.Events.RemoveHighlightOdds, [["" + n]]),
    BS.fire(BS.Events.ExceedMaxiumSelections)))
}
;
BS.RemoveSelection = function(n) {
    if (BS.MODE != "PROCESSING" && BS.MODE != "PROCESSED") {
        var t = BS.getBetSlipdata()
          , i = t.s;
        t.s = jQuery.grep(t.s, function(t) {
            return t.sid != n
        });
        t.s[0] != null ? (BS.fire(BS.Events.Processing),
        BS.PopulateParams(t, !1, !0),
        utility.service(BS.service.betSlipService, BS.service.getSelectionService, {
            SelList: BS.strSelList,
            EventList: BS.strEventList,
            OddsList: BS.strOddsList,
            HdpList: BS.strHdpList,
            ScoreList: BS.strScoreList,
            SStakeList: BS.strAmtList,
            InplayList: BS.strInplayList,
            ParentEventList: BS.strParentEventList
        }, "GET", function(t) {
            BS.PopulateParams(t, !1, !1);
            BS.PopulateComboData(t);
            BS.UpdateBetSlip(t);
            BS.fire(BS.Events.RemoveHighlightOdds, [["" + n]]);
            BS.fire(BS.Events.Completed)
        }, function() {
            t.s = i;
            BS.PopulateParams(t, !1, !1);
            BS.fire(BS.Events.Completed)
        })) : BS.EmptyBetSlip()
    }
}
;
BS.EmptyBetSlip = function() {
    if (BS.MODE != "PROCESSING" && BS.MODE != "PROCESSED") {
        BS.MODE = "DEFAULT";
        BS.strSelList != "" && BS.fire(BS.Events.RemoveHighlightOdds, [BS.strSelList.split(BS.SEPARATOR)]);
        BS.bsCookie.clearBSCookies();
        BS.strSelList = "";
        BS.refreshId != null && BS.StopAutoRefresh();
        var n = {
            s: [],
            c: [],
            cinfo: [],
            islog: uv.login
        };
        BS.fire(BS.Events.UpdateBetslip, [n, !1])
    }
}
;
BS.VerifyBetSlip = function(n) {
    var t;
    if (n.islog == !1)
        return !1;
    var u = !0
      , s = !0
      , f = 0;
    for (t = 0; t < n.s.length; t++) {
        var i = n.s[t]
          , r = i.st
          , c = i.o
          , e = i.bs.bmin;
        i.serr = null ;
        c == 0 && (i.serr = "BS_OddsUpdating",
        f++);
        BS.Utility.Replace(r) != "" && BS.Utility.Replace(r) < e && (i.serr = "BS_NotExceedMinBet",
        i.errMsg = l.BS_Minimum_Bet + " " + BS.Utility.AddCommas(e) + " " + n.cc,
        i.st = e,
        u = !1)
    }
    if (n.totalStake <= 0 && f < n.s.length)
        return n.info = l.BS_Stake_Amount,
        !1;
    if (f == n.s.length.length)
        return !1;
    for (t = 0; t < n.c.length; t++) {
        var o = n.c[t]
          , r = o.cba
          , h = o.cbs.bmin;
        BS.Utility.Replace(r) != "" && BS.Utility.Replace(r) < h && (o.cba = h,
        s = !1)
    }
    return !u || !s ? (u || n.c[0] == null || (n.c[0].cba = ""),
    !1) : (n.info = null ,
    !0)
}
;
BS.ProcessBet = function(n) {
    var u, e, r, s, h, f, o, i, t;
    if (BS.processing) {
        console.warn("processing bet blocked");
        return
    }
    if (BS.processing = !0,
    BS.fire(BS.Events.Processing),
    BS.bsCookie.clearBSCookies(),
    u = "",
    n.c[0] != null ) {
        for (e = 0; e < n.c.length; e++)
            r = n.c[e],
            t = BS.Utility.Replace(r.cba),
            (isNaN(t) || t <= 0) && (t = 0),
            s = r.co == null ? "" : r.co,
            h = parseFloat(t * s - t * r.bc),
            u += r.cbn + "@" + r.bc + "@" + t + "@" + h + "@" + r.wid + BS.SEPARATOR;
        u = u.slice(0, -1)
    }
    for (f = "",
    o = 0; o < n.s.length; o++)
        (i = n.s[o],
        t = BS.Utility.Replace(i.st),
        (isNaN(t) || t <= 0) && u == "") || (f += i.sid + "@" + i.o + "@" + i.hd + "@" + i.hs + ":" + i.as + "@" + (!isNaN(t) && t > 0 ? i.st : 0) + "@" + i.ip + "@" + i.eo + "@" + i.eid + "@" + i.ap + "@" + i.peid + BS.SEPARATOR);
    f = f.slice(0, -1);
    BS.MODE = "PROCESSED";
    utility.service(BS.service.betSlipService, BS.service.placeBetService, {
        SingleList: f,
        ComboList: u,
        LatestSubmitted: n.dt,
        NoOfCombine: n.s.length,
        source: BS.source
    }, "POST", function(n) {
        var i, t;
        if (BS.processing = !1,
        n.berr === -1) {
            BS.fire(BS.Events.Completed);
            BS.MODE = "SUMMARY";
            console.log("ptc");
            return
        }
        if (n.ko == !0) {
            BS.fire(BS.Events.DisplayMessage, [l.BS_SessionInvalid, l.BS_SessionInvalid, !0]);
            BS.MODE = "DEFAULT";
            return
        }
        i = !1;
        n.berr == 6666 || n.berr == 7777 || n.berr == 8888 ? (BS.PopulateParams(n, !0, !1),
        BS.PopulateComboData(n),
        BS.UpdateBetSlip(n, !1, !0)) : (t = n.s.map(function(n) {
            return n.sid + ""
        }),
        BS.fire(BS.Events.RemoveHighlightOdds, [t]),
        BS.UpdateSummary(n),
        BS.fire(BS.Events.RefreshBalance))
    }, function() {
        BS.MODE = "DEFAULT";
        BS.processing = !1;
        console.log("Failed to access placeBetService");
        BS.fire(BS.Events.Completed)
    })
}
;
BS.UpdateBetSlip = function(n, t, i) {
    BS.ModifyDisplayInformation(n);
    n.info != null && (n.info = l[n.info]);
    BS.WriteOddsHDPScoreCookies(n);
    n.s[0] != null ? (BS.MODE = "PLACEBET",
    BS.StarAutoRefresh()) : (BS.MODE = "DEFAULT",
    BS.StopAutoRefresh());
    BS.strSelList != "" && BS.fire(BS.Events.HighlightOdds, [BS.strSelList.split(BS.SEPARATOR)]);
    BS.fire(BS.Events.UpdateBetslip, [n, t, i])
}
;
BS.UpdateSummary = function(n) {
    BS.MODE = "SUMMARY";
    BS.ModifyDisplayInformation(n);
    BS.fire(BS.Events.UpdateSummary, [n]);
    BS.bsCookie.saveCookieValues(BS.EnableRetainCookie, "1", !0)
}
;
BS.RemainBetSlip = function(n) {
    if (BS.strSelList = BS.bsCookie.getCookieValue(BS.selListCookies),
    BS.strSelList != null && BS.strSelList != "")
        try {
            BS.strEventList = BS.bsCookie.getCookieValue(BS.eventListCookies);
            BS.strOddsList = BS.bsCookie.getCookieValue(BS.oddsListCookies);
            BS.strHdpList = BS.bsCookie.getCookieValue(BS.hdpListCookies);
            BS.strScoreList = BS.bsCookie.getCookieValue(BS.scoreListCookies);
            BS.strAmtList = BS.bsCookie.getCookieValue(BS.amtListCookies);
            BS.strCBStake = BS.bsCookie.getCookieValue(BS.cbStakeCookies);
            BS.strCheckedList = BS.bsCookie.getCookieValue(BS.checkedListCookies);
            BS.strInplayList = BS.bsCookie.getCookieValue(BS.inplayListCookies);
            BS.strParlayList = BS.bsCookie.getCookieValue(BS.parlayListCookies);
            BS.strParentEventList = BS.bsCookie.getCookieValue(BS.parentEventListCookie);
            utility.service(BS.service.betSlipService, BS.service.getRemainService, {
                SelList: BS.strSelList,
                EventList: BS.strEventList,
                OddsList: BS.strOddsList,
                HdpList: BS.strHdpList,
                ScoreList: BS.strScoreList,
                SStakeList: BS.strAmtList,
                CBStakeList: BS.strCBStake,
                InplayList: BS.strInplayList,
                IsUpdate: n,
                ParentEventList: BS.strParentEventList
            }, "GET", function(t) {
                BS.PopulateParams(t, !1, !1);
                BS.PopulateComboData(t);
                BS.UpdateBetSlip(t, n)
            }, function() {})
        } catch (t) {
            BS.EmptyBetSlip()
        }
}
;
BS.RetainSelection = function(n, t) {
    BS.fire(BS.Events.Processing);
    BS.PopulateParams(t, n, !1);
    utility.service(BS.service.betSlipService, BS.service.getRetainService, {
        SelList: BS.strSelList,
        InplayList: BS.strInplayList,
        OddsList: BS.strOddsList,
        HdpList: BS.strHdpList,
        ScoreList: BS.strScoreList,
        EventList: BS.strEventList,
        ParentEventList: BS.strParentEventList
    }, "GET", function(n) {
        BS.PopulateParams(n, !1, !1);
        BS.PopulateComboData(n, !0);
        BS.strSelList != "" && BS.fire(BS.Events.HighlightOdds, [BS.strSelList.split(BS.SEPARATOR)]);
        MODE = "DEFAULT";
        BS.UpdateBetSlip(n)
    }, function() {
        BS.fire(BS.Events.Completed)
    })
}
;
BS.ModifyDisplayInformation = function(n) {
    var r, t, u, i;
    if (n.s[0] != null )
        for (r = 0; r < n.s.length; r++)
            t = n.s[r],
            t.serr == "BS_DailyBetLimitValue" && (l.BS_DailyBetLimitValue = l.BS_DailyBetLimit.replace("XXX", BS.Utility.AddCommas(t.cv) + " " + n.cc)),
            t.serr == "BS_SingleMinBetValue" + r && (t.errMsg = l.BS_ExceededMinBet.replace("XXX", BS.Utility.AddCommas(t.bs.bmin) + " " + n.cc)),
            t.serr == "BS_ExceededSingleEventMax" + r && (t.errMsg = l.BS_ExceededSingleEventMax2.replace("XXX", BS.Utility.AddCommas(t.ara) + " " + n.cc)),
            t.bn == "BS_FLScorer" && (t.bn = l.BS_FLScorer),
            t.bn == "BS_FLTeamTS" && (t.bn = l.BS_FLTeamTS);
    if (n.c[0] != null )
        for (u = 0; u < n.c.length; u++)
            i = n.c[u],
            i.cerr == "BS_DailyBetLimitValue" && (l.BS_DailyBetLimitValue = l.BS_DailyBetLimit.replace("XXX", BS.Utility.AddCommas(i.cv) + " " + n.cc)),
            i.cerr == "BS_ComboMinBetValue" && (l.BS_ComboMinBetValue = l.BS_LessThanComboMinBet.replace("XXX", BS.Utility.AddCommas(i.cbs.bmin) + " " + n.cc)),
            i.cerr == "BS_ExceededComboWinningAmount" && (l.BS_ExceededComboWinningAmount = l.BS_ExceededComboWinningAmount.replace("XXX", BS.Utility.AddCommas(i.dwa) + " " + n.cc))
}
;
BS.WriteSStakeCookies = function(n) {
    BS.bsCookie.saveCookieValues(BS.amtListCookies, n, !0)
}
;
BS.WriteCBStakeCookies = function(n) {
    BS.bsCookie.saveCookieValues(BS.cbStakeCookies, n, !0)
}
;
BS.WriteExpandCBCookies = function(n) {
    BS.bsCookie.saveCookieValues(BS.expandCBCookies, n ? "true" : "false", !0)
}
;
BS.WriteOddsHDPScoreCookies = function(n) {
    var i = "", r = "", u = "", f, t;
    if (n.s[0] != null ) {
        for (f = 0; f < n.s.length; f++)
            t = n.s[f],
            i += t.o + BS.SEPARATOR,
            r += t.hd + BS.SEPARATOR,
            u += (t.hs != null ? t.hs : 0) + ":" + (t.as != null ? t.as : 0) + BS.SEPARATOR;
        i = i.slice(0, -1);
        r = r.slice(0, -1);
        u = u.slice(0, -1)
    }
    BS.bsCookie.saveCookieValues(BS.oddsListCookies, i);
    BS.bsCookie.saveCookieValues(BS.hdpListCookies, r);
    BS.bsCookie.saveCookieValues(BS.scoreListCookies, u, !0)
}
;
BS.BetConfirmToPlaceBet = function() {
    BS.StarAutoRefresh()
}
;
BS.PlacebetToBetConfirm = function() {
    BS.StopAutoRefresh();
    var n = BS.getBetSlipdata();
    n.s.length != 0 && (BS.VerifyBetSlip(n) ? BS.fire(BS.Events.ShowBetConfirm) : BS.fire(BS.Events.UpdateBetslip, [n, !1]))
}
;
BS.BetConfirmToBetReceipt = function() {
    var n = BS.getBetSlipdata();
    BS.VerifyBetSlip(n) ? BS.ProcessBet(n) : BS.fire(BS.Events.UpdateBetslip, [n, !1])
}
;
BS.PlacebetToBetReceipt = function() {
    BS.StopAutoRefresh();
    var n = BS.getBetSlipdata();
    n.s.length != 0 && (BS.VerifyBetSlip(n) ? BS.ProcessBet(n) : BS.fire(BS.Events.UpdateBetslip, [n, !1]))
}
;
BS.BetReceiptToPlacebet = function() {
    BS.bsCookie.saveCookieValues(BS.EnableRetainCookie, "", !0);
    var n = BS.getBetSlipdata();
    BS_Store.isRetainSelection() ? BS.RetainSelection(!0, n) : n.k != !0 ? BS.EmptyBetSlip() : BS.RetainSelection(!1, n)
}
;
BS.GetSelectionIds = function() {
    var n = []
      , t = BS.bsCookie.getCookieValue(BS.selListCookies);
    return t != null && (n = t.split(BS.SEPARATOR)),
    n
}
;
BS.toggleRefreshTimer = function(n) {
    n && BS.MODE == "PLACEBET" ? BS.StarAutoRefresh() : BS.StopAutoRefresh()
}
;
BS.UpdateAcceptBetterOdds = function(n) {
    BS.fire(BS.Events.Processing);
    utility.service(BS.service.betSlipService, BS.service.updateAcceptBetterOddsService, {
        isAccept: n
    }, "POST", function() {
        BS.fire(BS.Events.ToggleAcceptBetterOdds, [n]);
        BS.fire(BS.Events.Completed)
    }, function() {
        BS.fire(BS.Events.Completed)
    })
}
;
BS.UpdateShowBetConfirmation = function(n) {
    BS.fire(BS.Events.Processing);
    utility.service(BS.service.betSlipService, BS.service.updateShowBetConfirmationService, {
        isShow: n
    }, "POST", function() {
        BS.fire(BS.Events.ToggleShowBetConfirmation, [n]);
        BS.fire(BS.Events.Completed)
    }, function() {
        BS.fire(BS.Events.Completed)
    })
}
;
BS.StarAutoRefresh = function() {
    BS.refreshId != null && Timer.remove(BS.refreshId);
    BS.refreshId = Timer.interval(30, function() {
        BS.RemainBetSlip(!0)
    })
}
;
BS.StopAutoRefresh = function() {
    BS.refreshId != null && Timer.remove(BS.refreshId);
    BS.refreshId = null
}
;
BS.Init = function() {
    BS.bsCookie.getCookieValue(BS.EnableRetainCookie) == "1" && utility.service(BS.service.betSlipService, BS.service.getSummaryService, null , "GET", function(n) {
        n.s && n.s.length > 0 ? BS.UpdateSummary(n) : BS.EmptyBetSlip()
    });
    $(document).keydown(function(n) {
        var r = BS.Utility.GetKeyCode(n), i, t;
        if (r == 13 && (BS_Store.showMyBet == null || !BS_Store.showMyBet())) {
            i = BS_Store.currentMode();
            t = BS_Store.modes;
            switch (i) {
            case t.PLACEBET:
                BS_Store.showBetConfirmation() ? BS.PlacebetToBetConfirm() : BS.PlacebetToBetReceipt();
                break;
            case t.BETCONFIRM:
                BS.BetConfirmToBetReceipt();
                break;
            case t.BETRECEIPT:
                BS.isPopUp ? pm.resetBetSlip() : BS.BetReceiptToPlacebet()
            }
            n.preventDefault()
        }
    })
}
;
opSetting = {
    CanDisplayScore: function(n) {
        var t = opScoreSetting.split(",");
        for (i = 0; i < t.length; i++)
            if (t[i] == n)
                return !0;
        return !1
    },
    IsOutRightSport: function(n) {
        var t = opORSports.split(",");
        for (i = 0; i < t.length; i++)
            if (opORSports[i] == n)
                return !0;
        return !1
    },
    GetHighlightIds: function() {
        return BS.MODE == "SUMMARY" ? [] : BS.GetSelectionIds()
    }
};
CONSTANTS.HOMEPAGE = {
    TOGGLESPORTSCONTENT: "TOGGLESPORTSCONTENT",
    HIGHLIGHTODDS: "HIGHLIGHTODDS",
    SETTOPBANNERHEIGHT: "SETTOPBANNERHEIGHT",
    REMOVEODDSJUMP: "REMOVEODDSJUMP"
};
HP_Store = {
    createNew: function() {
        var s = function() {
            var n = pm.parentHost();
            return document.domain != "localhost" && n != null && n != "" ? n + "/" + global.lan + "/sports/getbanner?id=sbk-center" : ""
        }
          , t = {
            l: {
                m: null ,
                s: [],
                hip: [],
                hnph: [],
                hnps: [],
                r: null
            },
            r: {}
        }
          , u = {
            updateEvent: "HP_Update"
        }
          , e = [3, 9, 20, 13]
          , r = null
          , n = {
            isDisplay: !0,
            bannerURL: s(),
            isDisplayHL: !0,
            elapsed: 0,
            odds: {
                hlo: [],
                isEuroOdds: !0,
                oddsUp: [],
                oddsDown: []
            },
            isFirstLoad: !0,
            oddsType: uv.ov,
            topBannerH: 0,
            needScrollTop: !1,
            needUpdateOddsJump: !1
        }
          , f = !1
          , h = dispatcher.register(function(r) {
            switch (r.type) {
            case CONSTANTS.SITEREFRESH:
                r.data.mod != null && r.data.mod.t && (r.data.mod.t == 3 || r.data.mod.t == 4) ? (n.needScrollTop = !f,
                f = !0,
                n.elapsed = 0,
                t.l = r.data.mod,
                _.forEach(t.l.hip, function(n) {
                    n.cds = opSetting.CanDisplayScore(n.k);
                    n.isNetSports = _.includes(e, n.k);
                    n.k == 21 && (n.rd = "HDP")
                }),
                t.l.m != null && (t.l.m.ip && (t.l.m.cds = opSetting.CanDisplayScore(t.l.m.sid)),
                t.l.m.isNetSports = _.includes(e, t.l.m.sid)),
                _.forEach(t.l.s, function(n) {
                    n.cds = n.ip ? opSetting.CanDisplayScore(n.sid) : !1;
                    n.isNetSports = _.includes(e, n.sid)
                }),
                t.r = _.cloneDeep(t.l.s),
                l(),
                Timer.interval(1, function() {
                    n.needScrollTop = !f;
                    n.isFirstLoad = !1
                }),
                t.l.hnps.length == 0 && (n.isDisplayHL = !0),
                n.isFirstLoad = param.IsFirstLoad) : (f = !1,
                n.isDisplayHL = !0,
                t.l.r = null ,
                n.elapsed = null );
                i();
                break;
            case CONSTANTS.HOMEPAGE.TOGGLESPORTSCONTENT:
                n.isDisplayHL = r.isShowHL;
                i();
                break;
            case CONSTANTS.HOMEPAGE.HIGHLIGHTODDS:
                i();
                break;
            case CONSTANTS.CENTERPANEL.REMOVEHIGHLIGHTODDS:
                _.remove(n.odds.hlo, function(n) {
                    return _.includes(r.sids, n)
                });
                i();
                break;
            case CONSTANTS.CENTERPANEL.HIGHLIGHTODDS:
                n.odds.hlo = opSetting.GetHighlightIds();
                i();
                break;
            case CONSTANTS.HOMEPAGE.SETTOPBANNERHEIGHT:
                n.topBannerH = r.h;
                i();
                break;
            case CONSTANTS.HOMEPAGE.REMOVEODDSJUMP:
                n.odds.oddsUp = [];
                n.odds.oddsDown = [];
                n.needUpdateOddsJump = !1;
                i()
            }
        })
          , i = function() {
            c();
            o.trigger("HP_Update")
        }
          , o = $({})
          , c = function() {
            n.isDisplay = mpc.pv == 0;
            n.isDisplay && (n.odds.isEuroOdds = uv.ov === 1,
            n.oddsType = uv.ov,
            n.bannerURL = s())
        }
          , l = function() {
            var f, u, e, o, n, i;
            r = null ;
            f = ["hip", "hnph", "hnps"];
            for (n in t.l)
                if (f.indexOf(n) !== -1 && t.l[n]instanceof Array)
                    for (i = 0; i < t.l[n].length; i++)
                        u = t.l[n][i],
                        e = u.k,
                        o = u.v,
                        r || (r = {}),
                        r[e] = o
        }
        ;
        return {
            getData: function() {
                return t
            },
            DispatchToken: h,
            addUpdateListener: function(n, t) {
                var i = t ? u.updateEvent + "." + t : u.updateEvent;
                o.on(i, n)
            },
            removeUpdateListener: function(n) {
                var t = n ? u.updateEvent + "." + n : u.updateEvent;
                o.off(t)
            },
            initTimerString: function(n) {
                return n.indexOf(":") < 0 ? "" : n
            },
            getBannerUrl: function() {
                return document.domain != "localhost" && global.parentHost && global.parentHost != "" ? location.protocol + "//" + global.parentHost + "/" + global.lan + "/sports/getbanners?id=Adinfo" : ""
            },
            getVersion: function() {
                if (r == null )
                    return 0;
                var n = [];
                return _.forEach(r, function(t, i) {
                    n.push(i + ":" + t)
                }),
                n.join()
            },
            getExtraData: function() {
                return n
            }
        }
    }
}.createNew();
Action.Homepage = {
    toggleSportsContent: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.HOMEPAGE.TOGGLESPORTSCONTENT,
            isShowHL: n
        })
    },
    highlightOdds: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.HOMEPAGE.HIGHLIGHTODDS,
            sid: n
        })
    },
    setTopBannerHeight: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.HOMEPAGE.SETTOPBANNERHEIGHT,
            h: n
        })
    },
    removeOddsJump: function() {
        dispatcher.dispatch({
            type: CONSTANTS.HOMEPAGE.REMOVEODDSJUMP
        })
    }
};
LPM = ReactModule.createModule("LeftPanel", {
    filter: function() {
        for (var t = arguments[0], i, n = 1; n < arguments.length; n++)
            i = arguments[n],
            t = _.isFunction(i) ? _.filter(t, i) : _.flatten(_.pluck(t, arguments[n]));
        return t
    },
    getIdListFromCookie: function(n, t) {
        var i = utility.cookie.read(n);
        return i ? (i = i.split(t),
        i.length > 0 && (i = _.compact(_.map(i, _.parseInt)))) : i = [],
        i
    },
    getSSMin: function(n, t, i) {
        var e = LPM.getStore("StartingSoon").state.ssmd, f = _.find(e, function(t) {
            return t.sid == n
        }), r, u;
        if (f && (r = _.find(f.puc, function(n) {
            return n.cid == t
        }),
        r && (u = _.find(r.ces, function(n) {
            return n.eid == i
        }),
        u)))
            return u.mts
    },
    redirect: function(n) {
        n == "home" ? Action.LeftPanel.home() : Action.LeftPanel.sport(n, VIEW.PRESTART)
    },
    trimSportName: function(n) {
        var t = 0
          , i = {
            n: "",
            t: !1
        };
        switch (global.lan) {
        case "zh-tw":
        case "zh-cn":
        case "ja-jp":
            t = 10;
            break;
        case "en-gb":
        case "id-id":
        case "ko-kr":
        case "vi-vn":
        case "th-th":
        case "pt-br":
        case "km-kh":
            t = 20
        }
        return i.n = n.length > t ? n.substr(0, t) + "..." : n,
        i.t = n.length > t,
        i
    },
    trimTeamName: function(n, t) {
        var i = 0
          , r = {
            h: "",
            a: "",
            ht: !1,
            at: !1
        };
        switch (global.lan) {
        case "zh-tw":
        case "zh-cn":
        case "ja-jp":
            i = t ? 26 : 31;
            break;
        case "en-gb":
        case "id-id":
        case "ko-kr":
        case "vi-vn":
        case "th-th":
        case "pt-br":
        case "km-kh":
            i = t ? 44 : 59
        }
        return r.n = n.length > i ? n.substr(0, i) + "..." : n,
        r.t = n.length > i,
        r
    },
    trimCompetitionName: function(n, t) {
        var i = 0
          , r = {
            n: "",
            t: !1
        };
        switch (global.lan) {
        case "zh-tw":
        case "zh-cn":
        case "ja-jp":
            i = t ? 22 : 27;
            break;
        case "en-gb":
        case "id-id":
        case "ko-kr":
        case "vi-vn":
        case "th-th":
        case "pt-br":
        case "km-kh":
            i = t ? 44 : 48
        }
        return r.n = n.length > i ? n.substr(0, i) + "..." : n,
        r.t = n.length > i,
        r
    },
    trimSingleProgrammeName: function(n) {
        var t = 0
          , i = {
            n: "",
            t: !1
        };
        switch (global.lan) {
        case "zh-tw":
        case "zh-cn":
        case "ja-jp":
            t = 29;
            break;
        case "en-gb":
        case "id-id":
        case "ko-kr":
        case "vi-vn":
        case "th-th":
        case "pt-br":
        case "km-kh":
            t = 45
        }
        return i.n = n.length > t ? n.substr(0, t) + "..." : n,
        i.t = n.length > t ? !0 : !1,
        i
    },
    trimMultiProgrammeName: function(n) {
        var t = 0
          , i = {
            n: "",
            t: !1
        };
        switch (global.lan) {
        case "zh-tw":
        case "zh-cn":
        case "ja-jp":
            t = 26;
            break;
        case "en-gb":
        case "id-id":
        case "ko-kr":
        case "vi-vn":
        case "th-th":
        case "pt-br":
        case "km-kh":
            t = 44
        }
        return i.n = n.length > t ? n.substr(0, t) + "..." : n,
        i.t = n.length > t ? !0 : !1,
        i
    },
    inplayTimeCheck: function(n) {
        var t = {
            puc: [],
            count: 0
        };
        return t.puc = _.filter(n, function(n) {
            return n.ces = _.filter(n.ces, function(n) {
                var t = +n.ipt.split(":")[0];
                return t <= global.thi
            }),
            t.count += n.ces.length,
            n.ces.length > 0
        }),
        t
    }
}, function() {
    Object.defineProperty(this, "view", {
        get: function() {
            return this.getStore("LeftPanel").state.view
        }
    });
    Object.defineProperty(this, "collapsed", {
        get: function() {
            return UI.left.minimized
        }
    });
    Object.defineProperty(this, "mycomps", {
        get: function() {
            return this.getStore("PreStart").state.mycomps.data
        }
    });
    Object.defineProperty(this, "myevents", {
        get: function() {
            return this.getStore("InPlay").state.myevents
        }
    });
    Object.defineProperty(this, "firstLoad", {
        get: function() {
            return this.store.LeftPanel.state.firstLoad
        }
    });
    Object.defineProperty(this, "tab", {
        get: function() {
            return this.store.LeftPanel.state.tab
        }
    });
    Object.defineProperty(this, "needScrollToAnchor", {
        get: function() {
            return tempStore.get("needScrollToAnchor")
        }
    });
    Object.defineProperty(this, "disableScrollbar", {
        get: function() {
            return this.store.LeftPanel.state.disableScrollbar
        }
    })
});
LPM.createMixin("scrollbarMixin", {
    isUpdateFromParent: !1,
    componentWillReceiveProps: function() {
        this.isUpdateFromParent = !0
    },
    componentDidUpdate: function() {
        this.props.updateScrollbar && !this.props.isUpdateFromParent && (this.props.updateScrollbar(),
        this.isUpdateFromParent = !1);
        this.updateScrollbar && this.updateScrollbar()
    }
});
LPM.createMixin("expandMixin", {
    expand: function(n) {
        n.stopPropagation();
        var t = 400
          , i = $(this.refs.expandObj.getDOMNode()).stop(!0, !0)
          , r = function() {
            Action.LeftPanel.expand(this.getActiveKey())
        }
        .bind(this);
        this.isActive() ? i.slideUp(t, r) : i.slideDown(t, r)
    },
    getExpandIconCss: function() {
        var n = this.isActive();
        return classNames("float-left", {
            icon: !0,
            "icon-ArrowUp": n,
            "icon-ArrowDown": !n
        })
    },
    getExpandStyle: function() {
        return {
            display: this.isActive() ? "block" : "none"
        }
    },
    isActive: function() {
        return _.contains(this.props.actives, this.getActiveKey())
    }
});
LPM.createMixin("longNameTooltipMixin", {
    getInitialState: function() {
        return {
            enalbeLongNameTooltip: !1
        }
    },
    parse: function(n) {
        var t = $(n.currentTarget);
        return {
            x: n.clientX + 10,
            y: n.clientY,
            text: t.data("tip"),
            id: t.data("reactid")
        }
    },
    getDisplayName: function(n, t, i) {
        var r = {
            n: n,
            t: !1
        };
        switch (t) {
        case "c":
            r = LPM.trimCompetitionName(n, i);
            break;
        case "t":
            r = LPM.trimTeamName(n, i);
            break;
        case "s":
            r = LPM.trimSportName(n)
        }
        return r.t && this.setState({
            enalbeLongNameTooltip: !0
        }),
        r.n
    }
});
LPM.createMixin("liveStreamMixin", {
    hasLivestream: function() {
        var n = this.props.e || this.props.d;
        return uv.login && n.tid.length > 0
    }
});
LPM.createMixin("sExpandHandler", {
    setActives: function(n) {
        var t, i;
        LPM.firstLoad && (t = this.getSelectedSequence(),
        t.length > 0 && (this.state.actives = n ? t : _.union(this.state.actives, t)),
        i = this.getExpandList(this.props.dataKey),
        this.state.cActives = t,
        this.state.actives = _.union(this.state.actives, i),
        this.state.isRefresh = !1)
    },
    getSelectedSequence: function() {
        var i = [], n = _.where(this.state[this.props.dataKey], {
            puc: [{
                ces: [{
                    eid: this.state.e
                }]
            }]
        }), t;
        return n.length > 0 && (t = _.where(n[0].puc, {
            ces: [{
                eid: this.state.e
            }]
        }),
        t.length > 0 && (i = ["s" + n[0].sid, "c" + t[0].cid])),
        i
    },
    getExpandList: function(n) {
        var e = [], r, f, u;
        this.state.viewAll = {};
        var s = 0
          , c = this.props.limit
          , h = this.state[n];
        for (r = 0; r < h.length; r++) {
            if (s >= c)
                break;
            var t = this.props.expandConfig[r] || _.last(this.props.expandConfig)
              , i = h[r]
              , o = 0;
            for (f = 0; f < i.puc.length; f++) {
                if (u = i.puc[f],
                o >= t[0])
                    break;
                e = _.union(e, ["s" + i.sid, "c" + u.cid]);
                u.ces.length > t[1] && t[1] > 0 && (this.state.viewAll[i.sid] || (this.state.viewAll[i.sid] = {}),
                this.state.viewAll[i.sid][u.cid] = {
                    all: !1,
                    limit: t[1]
                });
                o += Math.min(u.ces.length, t[1] == 0 ? 9999 : t[1])
            }
            s += o
        }
        return e
    },
    LEFTPANEL_EXPAND: function(n) {
        if (LPM.view == this.props.view && (LPM.view == VIEW.PRESTART || !LPM.collapsed || !this.state.eventViewFirsload || (this.state.eventViewFirsload = !1,
        n != "s" + this.state.s)))
            if (this.props.view != VIEW.PRESTART && LPM.collapsed && _.startsWith(n, "s")) {
                var t = _.contains(this.state.cActives, n);
                this.state.cActives = t ? [] : [n]
            } else
                this.state.actives = _.xor(this.state.actives, [n]),
                this.state.cActives && (this.state.cActives = _.xor(this.state.cActives, [n]))
    },
    LEFTPANEL_RESET: function() {
        this.state = _.extend(this.state, this.props.reset)
    },
    LEFTPANEL_VIEWALL: function(n) {
        if (n.view == this.props.view) {
            var t = _.findKey(this.state.viewAll, function(t) {
                return _.has(t, n.id)
            });
            t && (this.state.viewAll[t][n.id].all = !0)
        }
    },
    UICHANGE: function(n) {
        LPM.collapsed && this.props.view != VIEW.PRESTART && (this.state.cActives = this.getSelectedSequence(n))
    }
});
LPM.createMixin("sDataHandler", {
    SITEREFRESH: function(n) {
        this.updateData(n)
    }
});
LPM.createStore("LeftPanel", {
    mixins: ["sDataHandler"],
    init: function() {
        this.state.disableScrollbar = UI.isIE
    },
    props: {
        info: [{
            text: l.InfoCentre_SportsRules,
            url: "/rules/sports",
            icon: "icon-Rules",
            width: 1020,
            height: 600,
            resizable: "yes",
            k: "1"
        }, {
            text: l.InfoCentre_Results,
            url: "/sports/results",
            icon: "icon-Results",
            width: 860,
            height: 695,
            resizable: "yes",
            k: "2",
            scroll: "no"
        }, {
            text: l.InfoCentre_Statistics,
            url: "/info-centre/sportsbook-info/statistics/",
            icon: "icon-Stats",
            width: 1095,
            height: 790,
            resizable: "yes",
            local: !0,
            k: "3"
        }, {
            text: l.LT_FAQs,
            url: "/faqs/sports",
            icon: "icon-FAQs",
            width: 1020,
            height: 600,
            r: "yes",
            k: "4"
        }]
    },
    state: {
        view: 0,
        tipc: 0,
        tssc: 0,
        s: -1,
        e: -1,
        tab: "",
        firstLoad: !1,
        lpc: {},
        tooltip: !1,
        menuState: -1,
        enableScrollbar: !0,
        showCode: !1,
        qmd: [],
        ipFB: {}
    },
    methods: {
        updateData: function(n) {
            var t = this.state.lpc;
            this.state = _.extend(this.state, {
                view: n.lpc.sm,
                tipc: n.lpd.tipc,
                tssc: _.chain(n.lpd.ssm.ssmd).pluck("puc").flatten().sum(function(n) {
                    return n.ces.length
                }).value(),
                s: n.selobj.spt,
                e: n.selobj.evt,
                tab: n.selobj.tab,
                lpc: n.lpc
            });
            this.state.firstLoad = !_.isEqual(t, this.state.lpc);
            this.state.firstLoad && (tempStore.set("needScrollToAnchor", !0),
            this.state.menuState = -1);
            this.state.view == VIEW.STARTINGSOON && this.state.tssc == 0 && (n.lpd.sm.smd.length == 0 ? tempStore.set("redirect", "home") : tempStore.set("redirect", n.lpd.sm.smd[0]));
            this.state.qmd = n.selobj.evt == 0 && this.state.view != VIEW.PRESTART ? _.take(n.lpd.sm.smd, 3) : !1;
            n.lpd.tipc > 0 && this._handleInplayFootball(n.lpd.ips.ismd)
        },
        LEFTPANEL_MENUEXPAND: function(n) {
            this.state.menuState = n
        },
        LEFTPANEL_VIEW: function(n) {
            this.state.view = n.view
        },
        LEFTPANEL_EXPAND: function() {},
        UICHANGE: function(n) {
            n.left.minimized || (this.state.tooltip = !1)
        },
        LEFTPANEL_TOOLTIP: function(n) {
            this.state.tooltip = n
        },
        LEFTPANEL_MY_EVENT_TOGGLE: function() {
            this.state.tooltip = !1
        },
        LEFTPANEL_SERVERCODE: function() {
            this.state.showCode = !this.state.showCode
        },
        _handleInplayFootball: function(n) {
            var t = _.single(n, "sid", 1), i;
            t && t.puc.length > 0 && (i = LPM.inplayTimeCheck(t.puc),
            this.state.ipFB = _.assign({}, t),
            this.state.ipFB.puc = i.puc,
            this.state.ipFB.ipc = i.count,
            this.state.tipc += i.count - t.ipc)
        }
    }
});
LPM.createStore("PreStart", {
    mixins: ["sDataHandler"],
    init: function(n) {
        var t = n.cookie, i;
        Object.defineProperty(this.state.mycomps, "data", {
            get: function() {
                return LPM.getIdListFromCookie(t, ",")
            },
            set: function(n) {
                var i = n.join(",");
                utility.cookie.write(t, i, 730)
            }
        });
        n.showRacing = Router.state.querystring.allowracing && Router.state.querystring.allowracing.toLowerCase() == "true";
        n.showRacing && (i = Router.racing(),
        _.map(n.otherSports, function(n) {
            n.url = i
        }))
    },
    props: {
        view: VIEW.PRESTART,
        cookie: "mycomps",
        mycompsall: "mycompsall",
        reset: {
            collapsed: !1,
            viewAll: !1,
            e: !1,
            s: !1,
            p: !1,
            actives: [],
            submenuView: 0
        },
        resetMC: {
            favt: 0,
            active: -1
        },
        otherSports: [{
            sn: l.LP_Horse,
            i: "40",
            ios: !0,
            key: "r40"
        }, {
            sn: l.LP_Greyhound,
            i: "39",
            ios: !0,
            key: "r31"
        }, ]
    },
    state: {
        topSports: [],
        fe: [],
        fv: 0,
        smd: [],
        v: 0,
        events: [],
        viewAll: !1,
        mycomps: {
            collapsed: !1,
            viewAll: !1,
            data: [],
            info: [],
            favt: 0,
            active: -1,
            size: [5, 3, 3]
        },
        e: !1,
        s: !1,
        p: !1,
        actives: [],
        submenuView: 0,
        eventMenuSize: 10,
        gap: 5
    },
    methods: {
        LEFTPANEL_MY_COMPETITION_TOGGLE: function(n) {
            var t = [n.cid];
            _.contains(this.state.mycomps.data, n.cid) ? (this.state.mycomps.data = _.xor(this.state.mycomps.data, t),
            this.state.mycomps.favt == 2 && this.state.c === n.cid && tempStore.set("redirect", _.where(this.state.smd, {
                sid: this.state.s
            })[0])) : (this.state.mycomps.data = _.union(t, this.state.mycomps.data),
            this.state.mycomps.info.push(n),
            this.state.mycomps.collapsed = !1);
            this.state.mycomps.info = this.getMyComps();
            this.state.mycomps.collapsed = !1
        },
        LEFTPANEL_MY_COMPETITION_ORDER: function(n) {
            var t = this.state.mycomps.data, i = n.i, r = n.d, u;
            i == 0 && r == -1 || i + r == t.length || (u = t[i],
            t[i] = t[i + r],
            t[i + r] = u);
            this.state.mycomps.data = t;
            this.state.mycomps.info = this.getMyComps()
        },
        LEFTPANEL_MY_COMPETITION_VIEWALL: function() {
            this.state.mycomps.viewAll = !0
        },
        LEFTPANEL_MY_COMPETITION_EXPAND: function(n) {
            if (this.state.mycomps.data.length == 0)
                return !1;
            this.state.mycomps.collapsed = n
        },
        updateData: function(n) {
            var t, i;
            if (n.lpd) {
                t = n.lpd.sm;
                this.state = _.extend(this.state, {
                    fe: _.sortByAll(t.fe.progms, ["ims", "pen"]),
                    fv: t.fe.fv,
                    smd: _.sortByAll(t.smd, ["son", "sen"]),
                    v: t.v,
                    events: _.chain(t.smd).pluck("puc").flatten().filter(function(n) {
                        return n.ces && n.ces.length > 0
                    }).value(),
                    redirect: !1
                });
                this.props.showRacing && (r = this.props.otherSports,
                this.state.topSports = r);
                var f = _.take(this.state.smd, 5)
                  , r = []
                  , u = [];
                this.state.smd.length > 5 && (u = _.sortBy(_.takeRight(this.state.smd, this.state.smd.length - 5), "sen"));
                this.state.smd = _.union(f, u);
                LPM.view == this.props.view && (this.leftpanel_reset(),
                this.state.s = n.selobj.spt,
                this.state.c = parseInt(n.selobj.cids),
                n.lpc.smv == 2 ? (this.state = _.extend(this.state, {
                    e: n.selobj.evt
                }),
                this.state.events.length > 0 && (i = this.state.events[0].ces,
                i.length > this.state.eventMenuSize && (_.contains(_.pluck(_.take(i, this.state.eventMenuSize), "eid"), this.state.e) || (this.state.viewAll = !0))),
                this.state.mycomps.favt = 1) : n.selobj.favT == 2 ? (this.state.mycomps = _.extend(this.state.mycomps, {
                    favt: n.selobj.favT,
                    active: +n.selobj.cids
                }),
                this.state.submenuView = 1,
                this.checkMyCompsNeedViewAll(n.selobj)) : (this.state = _.extend(this.state, {
                    p: n.selobj.pid
                }),
                this.state.mycomps.favt = this.state.s > 0 ? 1 : 0,
                this.state.p > 0 && (this.state.actives = [this.state.p])));
                this.state.mycomps.info = this.getMyComps(t.mc);
                this.state.mycomps.info.length > 0 && Router.state.isChanged && (this.state.mycomps.collapsed = !1)
            }
        },
        LEFTPANEL_SPORT: function(n) {
            n.view == this.props.view && (this.state.s = n.id)
        },
        leftpanel_reset: function() {
            this.state = _.extend(this.state, this.props.reset);
            this.state.mycomps = _.extend(this.state.mycomps, this.props.resetMC);
            LPM.firstLoad && (this.state.mycomps.collapsed = !1);
            this.state.mycomps.viewAll = !1
        },
        LEFTPANEL_EXPAND: function(n) {
            LPM.view == this.props.view && (this.state.actives = _.xor(this.state.actives, [n]),
            this.state.submenuView = this.state.actives.length > 0 ? 3 : 0)
        },
        checkMyCompsNeedViewAll: function(n) {
            if (!this.state.mycomps.viewAll) {
                var t = parseInt(n.cids);
                this.state.mycomps.data.indexOf(t) >= this.state.mycomps.size[this.state.mycomps.favt] && (this.state.mycomps.viewAll = !0)
            }
        },
        getMyComps: function(n) {
            n || (n = this.state.mycomps.info);
            var t = [];
            return _.map(this.state.mycomps.data, function(i) {
                var r = _.remove(n, function(n) {
                    return n.cid == i
                });
                r.length > 0 ? t.push(r[0]) : _.remove(this.state.mycomps.data, function(n) {
                    return n == i
                })
            }, this),
            t
        },
        LEFTPANEL_SUBVIEW: function(n) {
            this.state.actives = [];
            this.state.submenuView == n.v ? this.state.submenuView = 0 : (this.state.submenuView = n.v,
            this.state.submenuView == 1 || this.state.submenuView == 2 ? this.state.mycomps.collapsed = !1 : n.id && this.LEFTPANEL_EXPAND(n.id))
        },
        LEFTPANEL_PSEVENT_VIEWALL: function(n) {
            this.state.viewAll = n
        },
        UICHANGE: function(n) {
            n.left.minimized == LPM.collapsed || LPM.view == VIEW.PRESTART && !this.state.s || (this.state.submenuView = 0,
            this.state.actives = [])
        }
    }
});
LPM.createStore("InPlay", {
    mixins: ["sDataHandler", "sExpandHandler"],
    init: function() {
        var n = this.props.cookie;
        Object.defineProperty(this.state, "myevents", {
            get: function() {
                return LPM.getIdListFromCookie(n, "|")
            },
            set: function(t) {
                var i = t.join("|");
                utility.cookie.write(n, i, 730)
            }
        })
    },
    props: {
        view: VIEW.INPLAY,
        dataKey: "ismd",
        expandConfig: [[10, 0], [6, 0], [6, 0]],
        limit: 22,
        cookie: "fav3",
        reset: {
            e: !1,
            actives: [],
            viewAll: {},
            s: -1
        },
        scoreboard: [null , null , [0, 6, 7], [1, 2, 3], [2, 3, 4, 5, 7], [1, 2, 3, 4, 6], null , [1, 2, 3, 4, 6, 7, 8]]
    },
    state: {
        ismd: [],
        myevents: [],
        myeventInfo: [],
        tipc: 0,
        v: 0,
        e: !1,
        actives: [],
        cActives: [],
        viewAll: {},
        s: -1,
        meCollapsed: !1,
        eventViewFirsload: !1
    },
    methods: {
        updateData: function(n) {
            if (n.lpd) {
                var t = n.lpd.ips;
                this.state = _.extend(this.state, {
                    ismd: t.ismd,
                    v: t.v
                });
                LPM.view == this.props.view ? n.lpc.imv == 2 ? (LPM.firstLoad && (this.LEFTPANEL_RESET(),
                this.state.eventViewFirsload = !0),
                this.state = _.extend(this.state, {
                    e: n.selobj.evt,
                    s: n.selobj.spt
                }),
                this.setActives(),
                this.state.myeventInfo = this.getMyEvents()) : (this.LEFTPANEL_RESET(),
                this.state = _.extend(this.state, {
                    e: !1,
                    s: n.selobj.spt
                })) : this.LEFTPANEL_RESET()
            }
        },
        LEFTPANEL_MY_EVENT_TOGGLE: function(n) {
            var t = _.map(_.flatten([n]), _.parseInt);
            this.state.myevents = _.xor(this.state.myevents, t).reverse();
            _.intersection(this.state.myevents, t).length > 0 && (this.state.meCollapsed = !1);
            this.state.myevents.length == 0 && LPM.collapsed && _.remove(this.state.cActives, function(n) {
                return n == "smyevents"
            });
            this.state.myeventInfo = this.getMyEvents()
        },
        CENTERPANELMYEVENTTOGGLE: function(n) {
            this.LEFTPANEL_MY_EVENT_TOGGLE(n)
        },
        LEFTPANEL_MY_EVENT_EXPAND: function(n) {
            this.state.meCollapsed = n
        },
        getMyEvents: function() {
            var i = this.state.ismd
              , t = this.state.myevents
              , n = [];
            return _.map(i, function(i) {
                _.map(i.puc, function(r) {
                    var u = _.filter(r.ces, function(n) {
                        return t.length > 0 && t.indexOf(n.eid) > -1
                    });
                    u.length > 0 && (n = _.union(n, _.map(u, function(n) {
                        return n.s = i.sid,
                        n
                    })))
                })
            }),
            n = _.sortBy(n, function(n) {
                return _.indexOf(t, n.eid)
            })
        }
    },
    public: {
        filter: function() {
            if (this.state.myevents.length == 0)
                return this.state.ismd;
            var t = this.state.myevents
              , n = _.clone(this.state.ismd, !0);
            return _.remove(n, function(n) {
                return _.remove(n.puc, function(n) {
                    return _.remove(n.ces, function(n) {
                        return _.contains(t, n.eid)
                    }),
                    n.ces.length == 0
                }),
                n.puc.length == 0
            }),
            n
        }
    }
});
LPM.createStore("StartingSoon", {
    mixins: ["sDataHandler", "sExpandHandler"],
    props: {
        view: VIEW.STARTINGSOON,
        dataKey: "ssmd",
        expandConfig: [[10, 5], [6, 3], [6, 3]],
        limit: 22,
        reset: {
            e: !1,
            actives: [],
            viewAll: {}
        }
    },
    state: {
        ssmd: [],
        tssc: 0,
        v: 0,
        e: !1,
        actives: [],
        cActives: [],
        viewAll: {},
        s: !1,
        eventViewFirsload: !1
    },
    methods: {
        updateData: function(n) {
            if (n.lpd) {
                var t = n.lpd.ssm;
                this.state = _.extend(this.state, {
                    ssmd: t.ssmd,
                    v: t.v
                });
                LPM.view == this.props.view ? n.lpc.ssv == 2 ? (LPM.firstLoad && (this.LEFTPANEL_RESET(),
                this.state.eventViewFirsload = !0),
                this.state.isRefresh = !0,
                this.state = _.extend(this.state, {
                    e: n.selobj.evt,
                    s: n.selobj.spt
                }),
                this.setActives()) : (this.LEFTPANEL_RESET(),
                this.state = _.extend(this.state, {
                    e: !1,
                    s: n.selobj.spt
                })) : this.LEFTPANEL_RESET()
            }
        }
    }
});
var tempStore = function() {
    var n = {};
    return {
        get: function(t) {
            var i = n[t];
            return n[t] = null ,
            i
        },
        set: function(t, i) {
            n[t] = i
        }
    }
}()
  , settingParam = {
    oddsType: uv.ov,
    sortBy: uv.sb,
    noOfLine: uv.nol,
    autoRefreshBetslip: uv.iarf,
    SPORT_SETTING_COOKIE_NAME: "settingProfile",
    expiredDay: 730,
    orgOddsType: uv.ov,
    orgSortBy: uv.sb
}
  , MPStore = function() {
    function t(n) {
        var r, u, i, t;
        try {
            if (n && n.p && !o.param.IsInplay && (o.param.PageNo = n.p.c == -1 ? 0 : n.p.c,
            o.totalPages = n.p.t),
            o.param.IsFirstLoad)
                if (n && !n.error)
                    if (n.d) {
                        if (n.d instanceof Array) {
                            for (t = 0; t < n.d.length; t++)
                                if (n.d[t].c) {
                                    r = n.d[t].c;
                                    break
                                }
                        } else
                            r = n.d.c;
                        if (r && r.length > 0 && cCtrl.hasOddsForToday(r))
                            om.processData.loadAsync(n);
                        else if (n.bt && n.bt.length > 0) {
                            for (u = !1,
                            i = param.reqUrl,
                            t = 0; t < n.bt.length; t++)
                                if (n.bt[t].sk == o.param.UIBetType || o.param.Tab == "Today" && n.bt[t].sk == "or") {
                                    if (o.param.Tab == "Today" && n.bt[t].sk == "or") {
                                        i = i.replace(selobj.btp2, n.bt[t].k);
                                        setTimeout(function() {
                                            cCtrl.isProcessing = !1;
                                            cCtrl.loadContent(i, !0, !0, null , !0)
                                        }, cCtrl.spanSec);
                                        u = !0;
                                        break
                                    }
                                } else {
                                    i = i.indexOf("programme/") != -1 && i.indexOf("/competition/") == -1 ? i + "/competition/" + n.bt[t].k : i.replace("/" + selobj.btp2, "/" + n.bt[t].k);
                                    i = i.replace("/default", "/" + n.bt[t].k);
                                    setTimeout(function() {
                                        cCtrl.isProcessing = !1;
                                        cCtrl.loadContent(i, !0, !0, null , !0)
                                    }, cCtrl.spanSec);
                                    u = !0;
                                    break
                                }
                            u || setTimeout(function() {
                                cCtrl.isProcessing = !1;
                                om.processData.loadAsync(n)
                            }, cCtrl.spanSec)
                        } else
                            setTimeout(function() {
                                cCtrl.isProcessing = !1;
                                om.processData.loadAsync(n)
                            }, cCtrl.spanSec)
                    } else
                        setTimeout(function() {
                            cCtrl.isProcessing = !1;
                            om.processData.loadAsync(n)
                        }, cCtrl.spanSec);
                else
                    n.error && cCtrl.goPageNotFound();
            else
                om.processData.refreshAsync(n)
        } catch (f) {
            console.log("Update MOP - Error = " + f.stack);
            oddsPage.showLoading(!1);
            cCtrl.isProcessing = !1
        }
    }
    var n = -1
      , i = dispatcher.register(function(i) {
        switch (i.type) {
        case CONSTANTS.SITEREFRESH:
            mpc.pv == 1 ? t(i.data.mod) : (om.timerUtil.clearTimer(),
            o.$loading.addClass("hidden"));
            n != mpc.pv && (o.$mainOddsPanel[mpc.pv == 1 ? "removeClass" : "addClass"]("hidden"),
            Action.PopUp.hide(),
            n = mpc.pv);
            break;
        case CONSTANTS.CENTERPANEL.REMOVEHIGHLIGHTODDS:
            mpc.pv == 1 && _.forEach(i.sids, function(n) {
                o.$mainOddsPanel.find("#o" + n).parents("td.selected").removeClass("selected");
                o.$mainOddsPanel.find(".secondRow #o" + n).parents("td.selected").removeClass("selected")
            });
            break;
        case CONSTANTS.CENTERPANEL.HIGHLIGHTODDS:
            mpc.pv == 1 && om.odds.reSelectedOdds(i.sids);
            break;
        case CONSTANTS.LEFTPANEL.MY_EVENT.TOGGLE:
            mpc.pv == 1 && myEvents.removeEvent(i.data, !0);
            break;
        case CONSTANTS.LEFTPANEL.MY_COMPETITION.TOGGLE:
            if (mpc.pv == 1) {
                var r = o.$mainOddsPanel.find("#cf" + i.data.cid).toggleClass("actived");
                r.hasClass("actived") ? r.attr("title", l.LP_RemoveMyComp) : r.attr("title", l.LP_Add2MyComp)
            }
            break;
        case CONSTANTS.UICHANGE:
            mpc.pv == 1 && o.is1stHalfOn != i.data.center.is1stHalfOn && i.data.indicator != UI.indicator.WINDOW && i.data.indicator != UI.indicator.CENTER && (i.data.center.is1stHalfOn ? OddsHeader.$filter_half && OddsHeader.$filter_half.eq(0).trigger("click", [!1, !0]) : OddsHeader.$filter_standard && OddsHeader.$filter_standard.eq(0).trigger("click", [!1, !0]));
            setTimeout(ScrollerBar.initScrollbarStatus, 50)
        }
    })
}();
Action.MainOdds = {
    QuickMenu: {
        changeOption: function(n, t, i) {
            var r = Router[n](t, n == "sport" ? VIEW.INPLAY : i);
            Action.LoadSite(r)
        }
    },
    BetType: {
        changeOption: function(n) {
            var t = Router.betType(n);
            Action.LoadSite(t)
        }
    },
    InplayAll: function() {
        var n = Router.inplay();
        Action.LoadSite(n)
    },
    CompetitionMenu: function() {
        var n = Router.selectedCompetitionMenu(selobj.sptn);
        Action.LoadSite(n)
    },
    MyEvents: {
        toggle: function(n) {
            dispatcher.dispatch({
                type: CONSTANTS.CENTERPANEL.MYEVENTTOGGLE,
                data: n
            })
        }
    },
    Toggle1stHalfView: function(n) {
        setTimeout(function() {
            UI.MPRESIZE(n)
        }, 100)
    }
};
var lcl = {
    NeutralText: l.neut,
    LiveText: l.LiveText
}, $mask = null , d2, strDate = "", o = {
    vars: {
        GetOdds: null ,
        GetMoreBetsOdds: null ,
        GetUiBetTypes: null ,
        TemplatesFolder: null ,
        ShowBS: !1,
        timer: 0,
        maxTimer: 80,
        isCollapsing: !1,
        betTypesTemplate: null ,
        betTypesData: null ,
        favURL: "",
        isFav: !1,
        isTimerEnabled: !0
    },
    param: {
        IsInplayAll: !1,
        SportId: null ,
        SportName: null ,
        CompetitionId: null ,
        EventDate: null ,
        EventIds: null ,
        IsFirstLoad: !0,
        IsFutureDate: !1,
        IsInplay: !1,
        SortBy: 1,
        Tab: null ,
        UIBetType: null ,
        OddsType: 0,
        PageNo: 0
    },
    params: [],
    stateObjs: {
        $upObjs: $([]),
        $downObjs: $([]),
        timers: [],
        times: [],
        bts: [],
        sports: null ,
        $collapsedObjs: [],
        $expandObjs: [],
        $collapsedObjsChild: [],
        $expandObjsChild: []
    },
    netSports: [3, 9, 13, 20, 27],
    $centerPanel: $("#center-panel"),
    $mainOddsPanel: $("#MOP"),
    $containerWrapper: $("#odds-tbl-containers"),
    $myEventsContainer: $("#myEventContainer"),
    $CompetitionMenu: $("#compMenu"),
    $loading: $("#page .loading"),
    $rtimer: null ,
    mainIntervalId: null ,
    hasMatch: !1,
    containersDic: [],
    noMatch: null ,
    noPopularMatch: null ,
    noMyEvent: null ,
    lang: "en-gb",
    totalPages: 0,
    ALL_FAV_COOKIE_NAME: "fav3",
    ALL_FAVCom_COOKIE_NAME: "fav-com",
    FILTER_TYPE: "filterType",
    MB_FAVBT_NAME: "favBT",
    showBackBtn: !0,
    Select_All_Comps: "selAllComps",
    defaultBT: "full-time-asian-handicap-and-over-under",
    is1stHalfOn: !1,
    has1stHalfFilter: !1,
    pacType: {
        par: 0,
        corners: 1,
        bookings: 2,
        et: 3,
        etCorners: 4,
        pelAH: 5,
        pelOU: 6,
        toQualify: 7,
        subs: 8,
        throwIn: 9,
        goalKick: 10,
        freeKick: 11,
        playerSpec: 14,
        winner: 53,
        offsides: 55,
        etBookings: 54,
        teamPointT1: 41,
        teamPointT2: 42
    }
};
$(function() {
    if (o.param.SportId == "-2") {
        cCtrl.goPageNotFound();
        return
    }
    o.$rtimer = $("#refCounter").on("click", function() {
        om.refresh.process(function() {
            o.vars.timer = o.vars.maxTimer
        })
    });
    o.vars.timer = o.vars.maxTimer;
    var n = $("#emptyMsg").text();
    o.noMatch = n.replace("{0}", l.NoMatch);
    o.noPopularMatch = '<div class="container"><div class="odds-table"><div class="time-header"><span class="time-txt">{0}<\/span><\/div><\/div>' + o.noMatch + "<\/div>";
    o.noMyEvent = n.replace("{0}", l.NoMatch)
});
var oddsPage = {
    getOddsType: function(n) {
        var t = "MALAY";
        switch (n) {
        case "1":
            t = "EURO";
            break;
        case "2":
            t = "HK";
            break;
        case "3":
            t = "MALAY";
            break;
        case "4":
            t = "INDO"
        }
        return t
    },
    initParams: function() {
        o.stateObjs.$downObjs = $([]);
        o.stateObjs.timers = [];
        o.stateObjs.times = [];
        o.stateObjs.bts = [];
        o.stateObjs.$collapsedObjs = [];
        o.stateObjs.$expandObjs = [];
        o.stateObjs.$collapsedObjsChild = [];
        o.stateObjs.$expandObjsChild = [];
        o.is1stHalfOn = !1;
        o.has1stHalfFilter = !1;
        o.hasMatch = !1;
        om.versionUtil.resetVersion()
    },
    setSelectedAllCompetitions: function(n, t) {
        if (t) {
            if (t.indexOf("select-competition") != -1 || t.indexOf("morebet") != -1)
                return;
            var i = t.split("/");
            if (i.length == 4 && !isNaN(i[3]))
                return
        }
        utility.cookie.write(o.Select_All_Comps, n)
    },
    showLoading: function(n) {
        o.$loading[n ? "removeClass" : "addClass"]("hidden")
    },
    showNoMatch: function(n) {
        o.param.Tab.toLowerCase() == "popular" ? (n || (n = o.$containerWrapper.find("#headerTxt").text()),
        o.$containerWrapper[0].innerHTML = o.noPopularMatch.replace("{0}", n)) : o.$containerWrapper[0].innerHTML = o.noMatch
    }
}
  , oddsUtil = {
    indicator: 0,
    lockIcon: null ,
    netLockIcon: null ,
    getStartSoonMins: function(n, t, i) {
        var u = LPM.getSSMin(n, t, i)
          , r = l.LP_StartingInMins.replace("{0}", u);
        return u <= 1 && global.lan == "en-gb" && (r = r.slice(0, r.length - 1)),
        r
    },
    getValueIndicator: function(n, t) {
        return (oddsUtil.indicator = 0,
        n == t) ? oddsUtil.indicator : (uv.ov == 3 ? n == 0 ? oddsUtil.indicator = 1 : n > 0 && t < 0 ? oddsUtil.indicator = 1 : n < 0 && t > 0 ? oddsUtil.indicator = 2 : n > 0 && t > 0 && n < t ? oddsUtil.indicator = 1 : n > 0 && t > 0 && n > t ? oddsUtil.indicator = 2 : n < 0 && t < 0 && n > t ? oddsUtil.indicator = 2 : n < 0 && t < 0 && n < t && (oddsUtil.indicator = 1) : oddsUtil.indicator = n < t ? 1 : 2,
        oddsUtil.indicator)
    },
    isFavouriteTeam: function(n, t, i) {
        var r = 0;
        if (t > 1 && (r = (t - 1) * 8),
        n != null ) {
            if (homeSelectionHdp = n[r + 1],
            awaySelectionHdp = n[r + 3],
            homeSelectionHdp == null && awaySelectionHdp == null || homeSelectionHdp == 0 && awaySelectionHdp == 0)
                return !1;
            if (homeSelectionHdp.substr(0, 1) == "-")
                return i ? !0 : !1;
            if (awaySelectionHdp.substr(0, 1) == "-")
                return i ? !1 : !0
        }
        return !1
    },
    isInMyCompetitions: function(n) {
        var t = parseInt(n)
          , i = LPM.mycomps;
        return _.includes(i, t)
    },
    isFtHtFavouriteTeam: function(n, t, i, r) {
        var e = 0, u, f;
        if (i > 1 && (e = (i - 1) * 8),
        n != null ) {
            if (u = n[e + 1],
            f = n[e + 3],
            u == null && f == null || u == 0 && f == 0)
                return !1;
            if (u.substr(0, 1) == "-")
                return r ? !0 : !1;
            if (f.substr(0, 1) == "-")
                return r ? !1 : !0
        }
        if (t != null ) {
            if (u = t[e + 1],
            f = t[e + 3],
            u == null && f == null || u == 0 && f == 0)
                return !1;
            if (u.substr(0, 1) == "-")
                return r ? !0 : !1;
            if (f.substr(0, 1) == "-")
                return r ? !1 : !0
        }
        return !1
    },
    getLockIcon: function(n) {
        return n ? (oddsUtil.netLockIcon == null && (oddsUtil.netLockIcon = TrimPath.processDOMTemplate("lockIcon", null ),
        oddsUtil.netLockIcon = oddsUtil.netLockIcon.replace("{0}", "singleVal")),
        oddsUtil.netLockIcon) : (oddsUtil.lockIcon == null && (oddsUtil.lockIcon = TrimPath.processDOMTemplate("lockIcon", null ),
        oddsUtil.lockIcon = oddsUtil.lockIcon.replace("{0}", "")),
        oddsUtil.lockIcon)
    },
    GetPeriodLocalization: function(n, t) {
        if ((global.lan == "zh-cn" || global.lan == "zh-tw" || global.lan == "en-gb") && n != "ot")
            return "";
        switch (n) {
        case "q1":
            return l.Period_1Q;
        case "q2":
            return l.Period_2Q;
        case "q3":
            return l.Period_3Q;
        case "q4":
            return l.Period_4Q;
        case "s1":
            return global.lan != "id-id" ? "" : l.Period_1S;
        case "s2":
            return global.lan != "id-id" ? "" : l.Period_2S;
        case "s3":
            return global.lan != "id-id" ? "" : l.Period_3S;
        case "s4":
            return global.lan != "id-id" ? "" : l.Period_4S;
        case "s5":
            return global.lan != "id-id" ? "" : l.Period_5S;
        case "s6":
            return global.lan != "id-id" ? "" : l.Period_6S;
        case "s7":
            return global.lan != "id-id" ? "" : l.Period_7S;
        case "p1":
            return global.lan != "id-id" ? "" : l.Period_1P;
        case "p2":
            return global.lan != "id-id" ? "" : l.Period_2P;
        case "p3":
            return global.lan != "id-id" ? "" : l.Period_3P;
        case "1st":
            return global.lan == "vi-vn" && (t == "2" || t == "7") ? l.Period_VietBBall_1H : l.Period_1H;
        case "h2":
            return global.lan == "vi-vn" && (t == "2" || t == "7") ? l.Period_VietBBall_2H : l.Period_2H;
        case "pt":
            return global.lan == "id-id" || global.lan == "vi-vn" ? l.Period_PointLines_ttp : "";
        case "ot":
            return l.Period_OT;
        case "fts":
            return global.lan == "vi-vn" ? l.Period_GameLines : "";
        default:
            return ""
        }
    },
    GetPeriodText: function(n, t) {
        switch (n) {
        case "q1":
            return global.lan == "th-th" || global.lan == "vi-vn" || global.lan == "id-id" ? "Q1" : l.Period_1Q;
        case "q2":
            return global.lan == "th-th" || global.lan == "vi-vn" || global.lan == "id-id" ? "Q2" : l.Period_2Q;
        case "q3":
            return global.lan == "th-th" || global.lan == "vi-vn" || global.lan == "id-id" ? "Q3" : l.Period_3Q;
        case "q4":
            return global.lan == "th-th" || global.lan == "vi-vn" || global.lan == "id-id" ? "Q4" : l.Period_4Q;
        case "s1":
            return global.lan == "vi-vn" || global.lan == "id-id" ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 1" : "Set 1" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_1G : l.Period_1S;
        case "s2":
            return global.lan == "vi-vn" || global.lan == "id-id" ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 2" : "Set 2" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_2G : l.Period_2S;
        case "s3":
            return global.lan == "vi-vn" || global.lan == "id-id" ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 3" : "Set 3" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_3G : l.Period_3S;
        case "s4":
            return global.lan == "vi-vn" || global.lan == "id-id" ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 4" : "Set 4" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_4G : l.Period_4S;
        case "s5":
            return global.lan == "vi-vn" || global.lan == "id-id" ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 5" : "Set 5" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_5G : l.Period_5S;
        case "s6":
            return global.lan == "vi-vn" || global.lan == "id-id" ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 6" : "Set 6" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_6G : l.Period_6S;
        case "s7":
            return global.lan == "vi-vn" || global.lan == "id-id" ? oddsUtil.IsTableTennisOrBadminton(t) ? "Game 7" : "Set 7" : oddsUtil.IsTableTennisOrBadminton(t) ? l.Period_7G : l.Period_7S;
        case "p1":
            return global.lan == "id-id" ? "P1" : l.Period_1P;
        case "p2":
            return global.lan == "id-id" ? "P2" : l.Period_2P;
        case "p3":
            return global.lan == "id-id" ? "P3" : l.Period_3P;
        case "1st":
            return global.lan == "th-th" || global.lan == "vi-vn" || global.lan == "id-id" ? "1H" : l.Period_1H;
        case "h2":
            return global.lan == "th-th" || global.lan == "vi-vn" || global.lan == "id-id" ? "2H" : l.Period_2H;
        case "pt":
            return l.Period_Pt;
        case "ot":
            return global.lan == "vi-vn" || global.lan == "th-th" || global.lan == "id-id" || global.lan == "ko-kr" ? "OT & Pens" : global.lan == "en-gb" ? "Incl. O/T & Pens" : l.Period_InclOTandPens;
        case "fts":
            return l.Period_GM
        }
    },
    IsTableTennisOrBadminton: function(n) {
        return n ? n == 20 || n == 9 : !1
    },
    GetEventTimer: function(n) {
        if (global.lan == "th-th" || global.lan == "vi-vn" || global.lan == "id-id" || global.lan == "ko-kr" || global.lan == "pt-br" || global.lan == "en-gb" && (n.toUpperCase() == "ET" || n.toUpperCase() == "PENS"))
            return n;
        switch (n.toUpperCase()) {
        case "1H":
            return l.ti1H;
        case "2H":
            return l.ti2H;
        case "HT":
            return l.tiHT;
        case "ET":
            return l.tiET;
        case "OT":
            return global.lan == "vi-vn" || global.lan == "th-th" || global.lan == "id-id" || global.lan == "ko-kr" ? "OT & Pens" : global.lan == "en-gb" ? "Incl. O/T & Pens" : l.Period_InclOTandPens;
        case "PENS":
            return l.tiPens;
        case "Q1":
            return l.tiQ1;
        case "Q2":
            return l.tiQ2;
        case "Q3":
            return l.tiQ3;
        case "Q4":
            return l.tiQ4
        }
    },
    GetEventTimerTooltip: function(n) {
        if ((global.lan == "en-gb" || global.lan == "zh-cn" || global.lan == "zh-tw") && n.toUpperCase() != "PENS" && n.toUpperCase() != "OT")
            return "";
        switch (n.toUpperCase()) {
        case "1H":
        case "H1":
            return l.ti1H;
        case "2H":
        case "H2":
            return l.ti2H;
        case "HT":
            return l.tiHT;
        case "ET":
            return global.lan == "ko-kr" ? n.toUpperCase() : l.tiET;
        case "OT":
            return l.tiOT;
        case "PENS":
            return l.tiPens;
        case "Q1":
            return l.tiQ1;
        case "Q2":
            return l.tiQ2;
        case "Q3":
            return l.tiQ3;
        case "Q4":
            return l.tiQ4
        }
    },
    GetPeriodClass: function(n) {
        switch (n) {
        case "1st":
        case "h2":
            return "halves";
        case "q1":
        case "q2":
        case "q3":
        case "q4":
            return "quarters";
        case "s1":
        case "s2":
        case "s3":
        case "s4":
        case "s5":
        case "s6":
        case "s7":
            return "sets";
        case "fts":
            return "game";
        case "pt":
            return "point";
        case "p1":
        case "p2":
        case "p3":
            return "periods";
        default:
            return ""
        }
    },
    GetSelectedBetType: function() {
        var n = _.find(o.stateObjs.bts, function(n) {
            return n.k == selobj.btp2
        });
        return n ? oddsUtil.CustomizedBettypeName(selobj.spt, n.sk, n.n) : ""
    },
    CustomizedBettypeName: function(n, t, i) {
        var r = i;
        return t == "ftahou" ? r = l.CM_MM : t == "ftml" && _.indexOf([3, 9, 13, 20, 27], n) > -1 && (r = l.Odds_Winner),
        r
    },
    GetHomepageEventTimerLocalization: function(n) {
        if (global.lan == "en-gb")
            return n;
        switch (n) {
        case "First Half":
            return l.HPET_1H;
        case "Second Half":
            return l.HPET_2H;
        case "Half Time":
            return l.HPET_HT;
        case "Extra Time":
            return l.HPET_ET;
        case "Penalty Shootout":
            return l.HPET_Pens;
        default:
            return n
        }
    },
    GetOULocalization: function(n) {
        if (global.lan == "zh-cn")
            switch (n.toLowerCase()) {
            case "o":
                n = l.o;
                break;
            case "u":
                n = l.u
            }
        return n
    },
    GetBestOfLocalization: function(n) {
        var t = +n;
        switch (t) {
        case 3:
            return l.SB_BestOf3;
        case 5:
            return l.SB_BestOf5;
        case 7:
            return l.SB_BestOf7;
        default:
            return ""
        }
    },
    GetCurrentScore: function(n, t, i, r) {
        var u;
        return u = i == 3 ? "p" : i == 2 ? "ft" : t,
        n = _.find(n, function(n) {
            return n.p == u
        }),
        n ? r ? i == 3 && n.adv == 1 ? "A" : n.h : i == 3 && n.adv == 0 ? "A" : n.a : ""
    },
    GetSetScore: function(n, t) {
        return n = _.find(n, function(n) {
            return n.p == t
        }),
        n ? n.h + "-" + n.a : "-"
    },
    GetTotal: function(n, t, i) {
        var u, r;
        return u = t == 3 ? "ftg" : "p",
        n = _.find(n, function(n) {
            return n.p == u
        }),
        i ? (r = "",
        n && (r = +n.h + +n.a),
        "(" + r + ")") : n ? n.h + "-" + n.a : "-"
    },
    HideSetScore: function(n, t, i) {
        var r = +n.substr(1);
        if (isNaN(r) && n.substr(0) != "s")
            return !0;
        if (i == 3) {
            if (r < t)
                return !0
        } else if (r <= t)
            return !0;
        return !1
    },
    GetEventIds: function(n) {
        var t = [];
        return n && n.length > 0 && _.forEach(n, function(n) {
            t.push(n.pk)
        }),
        _.uniq(t)
    },
    ShowSportContainer: function(n, t) {
        var i = !1;
        return n && n.length > 0 && _.forEach(n, function(n) {
            var r = t ? n.me : n.e;
            if (r && r.length > 0) {
                i = !0;
                return
            }
        }),
        i
    },
    SetOddsTypeCss: function() {
        var n = "";
        uv.ov == 3 && (n = "malayOdds");
        uv.ov == 4 && (n = "indoOdds");
        $("#sbody").removeClass("malayOdds indoOdds").addClass(n)
    }
}
  , om = {
    havePlayingBg: !1,
    havePlayingTv: !1,
    isPlayingCC: !1,
    isFoundBg: !1,
    isFoundTv: !1,
    prevLoadStartTime: null ,
    isShowCountDown: !1,
    pagination: {
        $container: null ,
        $btnNext: null ,
        $btnPrev: null ,
        $currPage: null ,
        $maxPage: null ,
        $pageBtn: null ,
        $opt: null ,
        $bkTop: null
    },
    tthi: 110,
    refresh: function() {
        var n = function(n) {
            try {
                om.odds.removeUpDownIndicators();
                o.hasMatch ? t() : i()
            } catch (r) {
                window.console && console.log("refresh:" + r.message)
            }
            n && n()
        }
          , t = function() {
            var n = (new Date).getTime();
            if (om.prevLoadStartTime != null && n - om.prevLoadStartTime < 1e3) {
                console.log("Subsequent odds refreshing calls cannot be made within 1 second.");
                return
            }
            om.prevLoadStartTime = n;
            cCtrl.loadRefresh()
        }
          , i = function() {
            om.versionUtil.resetVersion();
            var n = cCtrl.getLocation()
              , t = n.pathname + n.search;
            isIE9AndBelow && (t = n.url.path + n.url.query);
            cCtrl.loadContent(t, !1, !0, null , !0)
        }
        ;
        return {
            process: n
        }
    }(),
    tryRelaodInplay: function() {
        for (var r = $("#s1 .timer"), t, i, n = 0; n < r.length; n++)
            if (t = r.eq(n).text(),
            t != "" && (i = t.split(":")[0],
            !isNaN(i) && i > om.ttih)) {
                location.reload();
                break
            }
    },
    processData: function() {
        var u = function(t) {
            var r, f, u, i, e;
            if (om.tthi = t.tthi,
            t.ec == 0) {
                i = "/" + global.lan + "/sports";
                cCtrl.loadContent(i, !0);
                return
            }
            if (r = t.d,
            f = !1,
            t.d instanceof Array)
                for (r = t.d[0],
                u = 0; u < t.d.length; u++)
                    if (t.d[u].c != null && t.d[u].c.length > 0) {
                        f = !0;
                        break
                    }
            if (typeof r != "undefined" && typeof r.c == "undefined" && selobj.favT == 2) {
                i = "/" + global.lan + "/sports/" + selobj.sptn;
                cCtrl.loadContent(i, !0, !0);
                return
            }
            if ((r == null || !f) && selobj.cids != "") {
                i = "/" + global.lan + "/sports/" + selobj.sptn;
                setTimeout(function() {
                    cCtrl.isProcessing = !1;
                    cCtrl.loadContent(i, !0, !0, null , !0)
                }, cCtrl.spanSec);
                return
            }
            if (oddsPage.initParams(),
            o.vars.maxTimer = t.r,
            o.stateObjs.bts = t.bt,
            o.param.IsInplay ? o.$centerPanel.addClass("inplay").removeClass("non-inplay") : o.$centerPanel.addClass("non-inplay").removeClass("inplay"),
            t.d != null && f)
                o.$containerWrapper[0].innerHTML = "",
                o.$myEventsContainer[0].innerHTML = "";
            else {
                e = o.param.IsInplay ? l.ip.toUpperCase() : t.d ? _.isArray(t.d) ? t.d[0].n : t.d.n : "";
                OddsHeader.resetSportText(e);
                myEvents.init(o.param.IsInplay);
                oddsPage.showNoMatch(t.d && t.d.c ? t.d[0].n : "");
                oddsPage.showLoading(!1);
                cCtrl.isProcessing = !1;
                om.timerUtil.setTimer();
                return
            }
            om.logUtil.startTicker();
            o.param.IsInplay && n(t.d, o.$myEventsContainer, !1, !0);
            n(t.d, o.$containerWrapper, !1, !1, h);
            a();
            OddsHeader.reInitHeaderDDLs();
            o.param.Tab == "Popular" ? o.$containerWrapper.addClass("startingsoon") : o.$containerWrapper.removeClass("startingsoon")
        }
          , f = function(t) {
            var u, r, i, f, e;
            if (!t || !t.d) {
                oddsPage.showLoading(!1);
                cCtrl.isProcessing = !1;
                return
            }
            if (u = !0,
            t.d instanceof Array)
                for (r = 0; r < t.d.length; r++)
                    if (t.t == 1 && !t.d[r].c) {
                        u = !1;
                        break
                    }
            u || (i = cCtrl.getLocation(),
            f = i.pathname + i.search,
            isIE9AndBelow && (f = i.url.path + i.url.query),
            cCtrl.loadContent(f, !1, !0, null , !0));
            o.stateObjs.bts = t.bt;
            o.hasMatch = !1;
            om.logUtil.startTicker();
            _.isPlainObject(t.d) && _.merge(t.d, _.omit(t, "d"));
            e = t.t == 2 ? t : t.d;
            o.param.IsInplay && n(e, null , !0, !0);
            n(e, null , !0, !1, c)
        }
          , n = function(r, u, f, h, c) {
            var l = r && r.length >= 0 ? r[0] : r, a, v, y;
            if (l) {
                if (l.sportId && l.data)
                    a = l.sportId,
                    l = l.data;
                else if (l.sportId) {
                    u = t(l.sportId, h);
                    o.hasMatch = !0;
                    n(r.length ? r.slice(1) : null , u, f, h, c);
                    return
                }
                if (_.isEmpty(l)) {
                    u = t(a, h).remove();
                    om.versionUtil.removeSportVersion(a);
                    n(r.length ? r.slice(1) : null , u, f, h, c);
                    return
                }
                v = f ? l.t : 1;
                switch (v) {
                case 1:
                    o.param.SportName = l.n;
                    l.d && (l = _.merge(l.d, _.omit(l, "d")));
                    l.c && l.c.length > 0 ? utility.template("OddsPage/" + l.tn, function(e) {
                        var v, a, y;
                        l.isEuroOddsType = o.param.OddsType == 1;
                        l.isMyEvents = h;
                        v = e.process(l).replace(/>\s+</g, "><");
                        f ? u && u.length != 0 ? (a = u.next(),
                        y = a.prop("id"),
                        a && a.length > 0 && y == (h ? "mesc" : "sc").concat(l.k) ? a[0].innerHTML = v : (t(l.k, h).remove(),
                        a = $(i(l.k, h, v)),
                        a.insertAfter(u)),
                        u = a) : (t(l.k, h).remove(),
                        u = $(i(l.k, h, v)),
                        (h ? o.$myEventsContainer : o.$containerWrapper).prepend(u)) : u.append(i(l.k, h, v));
                        s(l, f, h);
                        om.logUtil.logTime("SportOddsOM.js - rendering template - " + l.tn + " ,isMyEvents : " + h);
                        l = null ;
                        v = null ;
                        o.hasMatch = !0;
                        n(r.length ? r.slice(1) : null , u, f, h, c)
                    }, l.tn) : n(r.length ? r.slice(1) : null , u, f, h, c);
                    return;
                case 2:
                    if (o.hasMatch = !0,
                    u = t(l.k, h),
                    h)
                        return;
                    e(l, u);
                    om.logUtil.logTime("SportOddsOM.js - process partial refresh with sport Id : " + l.k);
                    om.versionUtil.updateVersion(l.k, l.v);
                    n(r.length ? r.slice(1) : null , u, f, h, c);
                    o.param.IsInplay == !0 && l.k == 1 && om.tryRelaodInplay();
                    return;
                default:
                    n(r.length ? r.slice(1) : null , u, f, h, c);
                    return
                }
            } else
                o.hasMatch || oddsPage.showNoMatch(),
                y = o.param.IsFirstLoad,
                setTimeout(function() {
                    ScrollerBar.initScrollbarStatus();
                    y && ScrollerBar.scrollToTop()
                }, 50),
                c && typeof c == "function" && c(),
                om.logUtil.logTotalTime("SportOddsOM.js - rendering finished"),
                oddsPage.showLoading(!1),
                cCtrl.isProcessing = !1,
                r = null ,
                u = null ,
                c = null
        }
          , i = function(n, t, i) {
            return '<div class="container" id="' + (t ? "mesc" : "sc") + n + '" ' + (_.indexOf(o.netSports, n) != -1 ? "data-net" : "") + ">" + i + "<\/div>"
        }
          , t = function(n, t) {
            return (t ? o.$myEventsContainer : o.$containerWrapper).find((t ? "#mesc" : "#sc") + n)
        }
          , e = function(n, t) {
            for (var i, s, r, g, nt, h, tt, it, c, p, u, f, e, ft, w, v, b, k, y, a = 0; a < n.d.length; a++)
                if (i = n.d[a],
                s = i[0].indexOf("rh") != -1 ? o.$mainOddsPanel.find("#ht" + i[0].substr(2)) : i[0].indexOf("ra") != -1 ? o.$mainOddsPanel.find("#at" + i[0].substr(2)) : n.k == 1 && i[0].indexOf("tm") != -1 ? o.$mainOddsPanel.find(".tm" + i[0].substr(2)) : n.k == 2 && i[0].indexOf("sb") != -1 ? o.$mainOddsPanel.find("#sh" + i[0].substr(2)) : o.$mainOddsPanel.find("#" + i[0])[0],
                s) {
                    r = $(s);
                    switch (i[0].substr(0, 2)) {
                    case "lt":
                        i[1] == "" ? r.removeClass("btn-tv-ip") : r.addClass("btn-tv-ip");
                        break;
                    case "sh":
                    case "sa":
                        r.hasClass("fb") ? (g = i[0].substr(2, i[0].length - 1),
                        $((i[0].substr(0, 2) == "sh" ? "#sa" : "#sh") + g).removeClass("fontWeight-bold"),
                        r.html(i[1]).addClass("fontWeight-bold")) : r.html(i[1]);
                        break;
                    case "ed":
                    case "et":
                        $("div[id*='" + i[0] + "']").html(i[1]);
                        break;
                    case "tm":
                        nt = !1;
                        h = i[1].split("^");
                        $.each(o.stateObjs.timers, function() {
                            var u, e, s, c, v, f, t, a;
                            if (this.id.indexOf(i[0]) != -1) {
                                if (nt = !0,
                                u = h[1] && h[1] != "" ? h[1] : "",
                                u != "" && r.prev("span.period").text(n.k == 2 ? l["sti" + u.toUpperCase()] : u).attr("title", oddsUtil.GetEventTimerTooltip(u)),
                                n.k != 2)
                                    if (u == "HT" || u == "Pens")
                                        for (f in o.stateObjs.times)
                                            o.stateObjs.times.hasOwnProperty(f) && (t = o.stateObjs.times[f],
                                            t.tm == this.id && (t.id = i[0],
                                            t.tmrText = "&nbsp;",
                                            t.s = null ));
                                    else if (e = h[0].split(":"),
                                    e.length != 2)
                                        o.stateObjs.times[this.id] = {
                                            id: i[0],
                                            tmrText: h[0],
                                            tm: i[0]
                                        },
                                        r.next().text("");
                                    else if (e[0] = new Number(e[0]),
                                    s = new Number(e[1]),
                                    c = new Number(e[0]),
                                    s = s < 0 ? 0 : s,
                                    c = c < 0 ? 0 : c,
                                    n.k == 1) {
                                        v = this.id;
                                        for (f in o.stateObjs.times)
                                            o.stateObjs.times.hasOwnProperty(f) && (t = o.stateObjs.times[f],
                                            t.tm == v && (t.id = i[0],
                                            t.m = c,
                                            t.s = s))
                                    } else
                                        o.stateObjs.times[this.id] = {
                                            id: i[0],
                                            m: c,
                                            s: s,
                                            tm: i[0]
                                        };
                                a = $("#ex" + /\d+$/.exec(i[0])[0]);
                                a.length > 0 && a[/et/i.test(u) ? "removeClass" : "addClass"]("hidden")
                            }
                        });
                        break;
                    case "rh":
                        tt = ".rh" + i[0].substr(2);
                        c = o.$mainOddsPanel.find(tt);
                        c.removeClass(function() {
                            var n = /rc[0-9]/g.exec($(this).attr("class"));
                            return n ? n.join("") : ""
                        }).addClass("rc" + i[1]);
                        break;
                    case "ra":
                        it = ".ra" + i[0].substr(2);
                        c = o.$mainOddsPanel.find(it);
                        c.removeClass(function() {
                            var n = /rc[0-9]/g.exec($(this).attr("class"));
                            return n ? n.join("") : ""
                        }).addClass("rc" + i[1]);
                        break;
                    case "mb":
                        r.html(i[1]);
                        break;
                    case "fs":
                        i[1] === "" ? r.text("").parent().addClass("hidden") : (p = i[1].split("|"),
                        r.length > 0 && r.text("(" + p[0] + "-" + p[1] + ")").parent().hasClass("hidden") && r.parent().removeClass("hidden"));
                        break;
                    case "sb":
                        i[0].length > 0 && i[1] && (u = JSON.parse(i[1]),
                        f = n.k,
                        e = u.k,
                        f == 2 ? (r.text(oddsUtil.GetCurrentScore(u.ps, u.cp, f, !0)),
                        $("#sa" + e).text(oddsUtil.GetCurrentScore(u.ps, u.cp, f, !1)),
                        ft = u.ct ? u.ct : "",
                        w = u.cp ? u.cp : "",
                        $("#tm" + e).text(u.ct).prev("span.period").text(l["sti" + w.toUpperCase()]).attr("title", oddsUtil.GetEventTimerTooltip(w))) : ($("#ph" + e).text(oddsUtil.GetCurrentScore(u.ps, u.cp, f, !0)),
                        $("#pa" + e).text(oddsUtil.GetCurrentScore(u.ps, u.cp, f, !1)),
                        $("#svh" + e)[u.s == 1 ? "addClass" : "removeClass"]("serve"),
                        $("#sva" + e)[u.s == 0 ? "addClass" : "removeClass"]("serve"),
                        v = $("#" + u.cp + "-" + e),
                        b = f == 3 ? v.text(oddsUtil.GetSetScore(u.ps, u.cp)).addClass("totalOrange").removeClass("hidden").siblings(".score").removeClass("totalOrange") : v.addClass("hidden").siblings(".score"),
                        v.length == 0 && (b = $("#" + i[0]).find(".score").removeClass("totalOrange")),
                        _.forEach(b, function(n) {
                            var t = n.id.split("-")[0];
                            oddsUtil.HideSetScore(u.cp, t.substr(1), f) ? $(n).addClass("hidden") : $(n).text(oddsUtil.GetSetScore(u.ps, t)).removeClass("hidden")
                        }),
                        $("#total" + e).text(oddsUtil.GetTotal(u.ps, f, !1)),
                        $("#sum" + e).text(oddsUtil.GetTotal(u.ps, f, !0))));
                        break;
                    default:
                        k = oddsUtil.getValueIndicator(parseFloat(s.innerHTML), parseFloat(i[1]));
                        (r.hasClass("odds") || r.hasClass("netOdds")) && !r.hasClass("closed") && (k == 1 ? (om.odds.removeUpDownObjById(s.id),
                        o.stateObjs.$upObjs.push(s)) : k == 2 && (om.odds.removeUpDownObjById(s.id),
                        o.stateObjs.$downObjs.push(s)));
                        var rt = r.prev("span.ou").attr("ou")
                          , ut = rt ? rt.toLowerCase() : ""
                          , d = o.$myEventsContainer.find("#s" + n.k);
                        d.length > 0 && (t = t.add(d));
                        ut == "o" || ut == "u" ? t.data("net") ? t.find("span[id='" + i[0] + "']").html(i[1].replace("+", "")) : r.html(i[1].replace("+", "")) : r.attr("id").substr(0, 1) == "h" ? (y = t.data("net") ? t.find("div[id='" + i[0] + "']") : r,
                        y.attr("hdp", i[1]),
                        r.hasClass("hidden") || (o.param.OddsType == 1 ? y.html(i[1]) : y.html(i[1].replace("+", "").replace("-", "")))) : r.hasClass("locked") || r.html(i[1]);
                        r && r.html() && r.length > 0 && (parseFloat(s.innerHTML) > 0 ? r.removeClass("negOdds") : r.addClass("negOdds"))
                    }
                }
            n = null ;
            t = null ;
            d = null
        }
          , s = function(n, t, i) {
            var r = n.k, u;
            t && !i && om.odds.getUpDownIndicators(n);
            o.param.IsInplay && !om.isFoundBg && om.findTheFirstAvaiableBg(n);
            u = o.param.IsInplay ? l.ip.toUpperCase() : n.n;
            OddsHeader.resetSportText(u);
            OddsHeader.initFilterButton(r);
            om.timerUtil.init();
            r != 1 || o.param.IsInplay || o.param.Tab == "Competition" || o.$mainOddsPanel.find(".competitionName:gt(19)").removeClass("expand").next(".event-container").hide();
            om.state.maintainCollExpandCompState(r);
            om.state.maintainCollExpandChildState(r);
            om.versionUtil.updateVersion(r, n.v);
            n = null
        }
          , h = function() {
            myEvents.init(o.param.IsInplay);
            om.odds.reSelectedOdds();
            ltEn == "False" && o.$mainOddsPanel.find("a.btn-tv-ip").addClass("hidden");
            staEn == "False" && o.$mainOddsPanel.find("a.btn-stats").addClass("hidden");
            o.param.IsInplay ? liveCentreControl.checkPlayingEvent() : Action.RightPanel.TV.resetToDefault();
            var n = setInterval(function() {
                typeof scorecentre != "undefined" && mpc.pv != 0 && mpc.pv == 1 && (om.playCC(),
                clearInterval(n))
            }, 1e3);
            om.timerUtil.setTimer();
            OddsHeader.competitionMenu().count();
            o.param.IsFirstLoad = !1
        }
          , c = function() {
            om.odds.reSelectedOdds();
            om.odds.highlightOdds();
            o.param.IsInplay && myEvents.refresh()
        }
          , a = function() {
            var n, u, i, t;
            if (o.param.IsInplay) {
                om.pagination.$container && om.pagination.$container.addClass("hidden");
                return
            }
            n = om.pagination;
            n.$container || (n.$container = $("#pagination"),
            n.$btnPrev = $("#p-prev"),
            n.$btnNext = $("#p-next"),
            n.$currPage = $("#p-current-page"),
            n.$maxPage = $("#p-max-page"),
            n.$opt = $("#p-options"),
            n.$pageBtn = $("#p-pg-btn"),
            n.$bkTop = $("#p-top"));
            !o.totalPages || o.totalPages <= 1 ? n.$container.addClass("hidden") : (n.$container.removeClass("hidden"),
            n.$currPage.text(o.param.PageNo + 1),
            n.$maxPage.text(o.totalPages));
            n.$bkTop.on("click", function() {
                ScrollerBar.scrollToTop()
            });
            for (u = n.$opt.find("ul"),
            u.empty(),
            i = new StringBuilderEx,
            t = 0; t < o.totalPages; t++) {
                var f = t == o.param.PageNo
                  , e = t + 1 + " / " + o.totalPages
                  , s = "<li" + (f ? " class=actived" : "") + " data-val=" + t + ">";
                i.append(s);
                i.append(e);
                i.append("<\/li>");
                u.html(i.toString())
            }
            u.unbind("click").on("click", "li", function(t) {
                var i = $(this).data("val")
                  , u = parseInt(i, 10) + 1;
                n.$pageBtn.toggleClass("collapsed");
                r(u);
                t.stopPropagation()
            });
            n.$pageBtn.unbind("click").on("click", function(n) {
                var t = $(this);
                t.toggleClass("collapsed");
                OddsHeader.hideAllDDL(this);
                n.stopPropagation()
            });
            parseInt(o.param.PageNo, 10) + 2 > o.totalPages ? n.$btnNext.addClass("disabled").unbind("click") : n.$btnNext.removeClass("disabled").unbind("click").click(function(t) {
                var i = isNaN(parseInt(o.param.PageNo, 10)) ? 1 : parseInt(o.param.PageNo, 10) + 1
                  , u = parseInt(i, 10) + 1;
                n.$pageBtn.addClass("collapsed");
                r(u);
                t.stopPropagation()
            });
            parseInt(o.param.PageNo, 10) <= 0 ? n.$btnPrev.addClass("disabled").unbind("click") : n.$btnPrev.removeClass("disabled").unbind("click").click(function(t) {
                var i = isNaN(parseInt(o.param.PageNo, 10)) ? 1 : parseInt(o.param.PageNo, 10) + 1
                  , u = parseInt(i, 10) - 1;
                n.$pageBtn.addClass("collapsed");
                r(u);
                t.stopPropagation()
            })
        }
          , r = function(n) {
            var r = cCtrl.getLocation(), o = r.pathname, t = r.search, u, f, i, e;
            if (isIE9AndBelow && (o = r.url.path,
            t = r.url.query),
            t.length) {
                for (u = t.slice(1).split("&"),
                f = "?",
                i = 0; i < u.length; i++)
                    u[i].indexOf("pageno") == -1 && (f = f + u[i] + "&");
                t = f + "pageno=" + n
            } else
                t = "?pageno=" + n;
            e = o;
            e += t;
            cCtrl.loadContent(e, !0, !0)
        }
        ;
        return {
            loadAsync: u,
            refreshAsync: f
        }
    }(),
    odds: function() {
        var n = function(n) {
            var t, i, r;
            if (n.hd != null && typeof n.hd != "undefined")
                for (t = 0; t < n.hd.length; t++)
                    i = document.getElementById(n.hd[t]),
                    r = $(i),
                    i && r.html() && !r.hasClass("closed") && o.stateObjs.$downObjs.push(i);
            if (n.hu != null && typeof n.hu != "undefined")
                for (t = 0; t < n.hu.length; t++)
                    i = document.getElementById(n.hu[t]),
                    r = $(i),
                    i && r.html() && !r.hasClass("closed") && o.stateObjs.$upObjs.push(i)
        }
          , t = function() {
            o.stateObjs.$upObjs.each(function(n, t) {
                if (t != null ) {
                    var i = $(t);
                    i.hasClass("netOdds") ? o.$mainOddsPanel.find("#" + t.id).parent().parent().removeClass("oddsUp") : o.$mainOddsPanel.find("#" + t.id).parent().removeClass("oddsUp")
                }
            });
            o.stateObjs.$downObjs.each(function(n, t) {
                if (t != null ) {
                    var i = $(t);
                    i.hasClass("netOdds") ? o.$mainOddsPanel.find("#" + t.id).parent().parent().removeClass("oddsDown") : o.$mainOddsPanel.find("#" + t.id).parent().removeClass("oddsDown")
                }
            });
            o.stateObjs.$upObjs = $([]);
            o.stateObjs.$downObjs = $([])
        }
          , i = function(n) {
            var t = -1;
            o.stateObjs.$upObjs.each(function(i, r) {
                r != null && r.id == n && (t = i)
            });
            t >= 0 && o.stateObjs.$upObjs.splice(t, 1);
            t = -1;
            o.stateObjs.$downObjs.each(function(i, r) {
                r != null && r.id == n && (t = i)
            });
            t >= 0 && o.stateObjs.$downObjs.splice(t, 1)
        }
          , r = function() {
            o.stateObjs.$upObjs.length > 0 && o.stateObjs.$upObjs.each(function(n, t) {
                if (t != null ) {
                    var i = $(t);
                    i.hasClass("netOdds") ? o.$mainOddsPanel.find("#" + t.id).parent().parent().addClass("oddsUp") : o.$mainOddsPanel.find("#" + t.id).parent().addClass("oddsUp")
                }
            });
            o.stateObjs.$downObjs.length > 0 && o.stateObjs.$downObjs.each(function(n, t) {
                if (t != null ) {
                    var i = $(t);
                    i.hasClass("netOdds") ? o.$mainOddsPanel.find("#" + t.id).parent().parent().addClass("oddsDown") : o.$mainOddsPanel.find("#" + t.id).parent().addClass("oddsDown")
                }
            })
        }
          , u = function(n) {
            var r, t, i;
            for (n || (n = opSetting.GetHighlightIds()),
            r = n.length,
            t = 0; t < r; ++t)
                i = n[t],
                $o = o.$mainOddsPanel.find("#o" + i),
                $o.length > 0 && $o.parents("td").addClass("selected"),
                $o = o.$mainOddsPanel.find(".secondRow #o" + i),
                $o.length > 0 && $o.parents("td").addClass("selected")
        }
        ;
        return {
            getUpDownIndicators: n,
            removeUpDownIndicators: t,
            removeUpDownObjById: i,
            highlightOdds: r,
            reSelectedOdds: u
        }
    }(),
    state: function() {
        var t = function(n) {
            var t = o.$containerWrapper.find("#sc" + n);
            _.forEach(o.stateObjs.$collapsedObjs, function(n) {
                t.find("#" + n).removeClass("expand");
                var i = n.indexOf("st") != -1 ? n.replace("st", "s") : n.replace("ct", "c");
                o.$containerWrapper.find("#" + i).hide()
            });
            _.forEach(o.stateObjs.$expandObjs, function(n) {
                t.find("#" + n).addClass("expand");
                var i = n.indexOf("st") != -1 ? n.replace("st", "s") : n.replace("ct", "c");
                o.$containerWrapper.find("#" + i).show()
            })
        }
          , i = function(t) {
            t == 1 && ($.each(o.stateObjs.$collapsedObjsChild, function(t, i) {
                var r = $("#" + i)
                  , u = r.parent().next();
                n(u, !1)
            }),
            $.each(o.stateObjs.$expandObjsChild, function(t, i) {
                var r = $("#" + i)
                  , u = r.parent().next();
                n(u, !0)
            }))
        }
          , n = function(n, t) {
            while (n.hasClass("event"))
                t ? n.removeClass("hidden") : n.addClass("hidden"),
                n = n.next()
        }
        ;
        return {
            maintainCollExpandCompState: t,
            maintainCollExpandChildState: i,
            showHideChildEvt: n
        }
    }(),
    timerUtil: function() {
        var t = function() {
            if (o.param.IsFirstLoad) {
                n();
                var t = o.vars.maxTimer;
                o.vars.timer = t;
                om.isShowCountDown && o.$rtimer.text(o.vars.timer < 10 ? "0" + o.vars.timer : o.vars.timer);
                o.mainIntervalId = setInterval(function() {
                    var n = o.vars.timer--;
                    om.isShowCountDown && o.$rtimer.text(n);
                    document.title = document.title.split("-")[0] + " - " + n;
                    t - n == 5 && om.odds.removeUpDownIndicators();
                    n <= 0 && om.refresh.process(function() {
                        o.vars.timer = t;
                        om.isShowCountDown && o.$rtimer.text(n)
                    });
                    o.param.IsInplay && $.each(o.stateObjs.timers, function() {
                        var n = r(o.stateObjs.times[this.id]);
                        this.innerHTML = n
                    })
                }, 1e3)
            } else
                o.vars.timer = o.vars.maxTimer
        }
          , n = function() {
            o.mainIntervalId && (window.clearInterval(o.mainIntervalId),
            o.mainIntervalId = null )
        }
          , i = function() {
            o.stateObjs.times = [];
            o.stateObjs.timers = [];
            o.param.IsInplay && (o.stateObjs.timers = o.$mainOddsPanel.find("span.timer"),
            $.each(o.stateObjs.timers, function() {
                var t = $(this), i = t.attr("class").split(" ")[1], n, r;
                this.innerHTML == "45:00" && t.next().text() == "HT" ? o.stateObjs.times[this.id] = {
                    id: this.id,
                    tmrText: "45:00",
                    tm: i
                } : (n = this.innerHTML.split(":"),
                n.length != 2 || t.hasClass("static") ? o.stateObjs.times[this.id] = {
                    id: this.id,
                    tmrText: this.innerHTML,
                    tm: i
                } : (n[0] = Math.abs(n[0]),
                n[1] = Math.abs(n[1]),
                r = {
                    id: this.id,
                    m: new Number(n[0]),
                    s: new Number(n[1]),
                    tm: i
                },
                o.stateObjs.times[this.id] = r))
            }))
        }
          , r = function(n) {
            if (n)
                return n.s != null ? (n.s += 1,
                n.s == 60 && (n.m += 1,
                n.s = 0),
                (n.m < 10 ? "0" + n.m : n.m) + ":" + (n.s < 10 ? "0" + n.s : n.s)) : typeof n.tmrText != "undefined" && n.tmrText != null ? n.tmrText : n
        }
        ;
        return {
            setTimer: t,
            clearTimer: n,
            init: i
        }
    }(),
    logUtil: function() {
        var n = !0, t, i, r = function() {
            var n = (new Date).getTime()
              , i = n - t;
            return t = n,
            i
        }
        , u = function() {
            var n = (new Date).getTime();
            return n - i
        }
        ;
        return {
            startTicker: function() {
                n && (t = i = (new Date).getTime())
            },
            logTime: function(t) {
                n && t && console.log(t.concat(" - ", r(), " ms"))
            },
            logTotalTime: function(t) {
                n && t && console.log(t.concat(" - ", u(), " ms"))
            }
        }
    }(),
    versionUtil: function() {
        var n = {};
        return {
            updateVersion: function(t, i) {
                var r = "s" + t
                  , u = t + "," + i;
                n[r] = u
            },
            removeSportVersion: function(t) {
                delete n["s" + t]
            },
            resetVersion: function() {
                n = {}
            },
            getVersion: function() {
                if (_.isEmpty(n))
                    return null ;
                var t = "";
                return _.size(n) != 1 || o.param.IsInplayAll ? (_.forIn(n, function(n) {
                    t += n.concat("|")
                }),
                t = t.slice(0, -1)) : (t = n[Object.keys(n)[0]],
                t = t.split(",")[1]),
                t
            }
        }
    }(),
    handler: function() {
        var t = function(t) {
            var i = $(t.target) || $(t.srcElement), e, l, a, it, ft, c, rt, d, et, ut, f, r;
            if (i.hasClass("icon-Stats")) {
                var s = i.hasClass("icon-Stats") ? utility.parsePopupInfo("popup-new w1065 h790") : utility.parsePopupInfo("popup-new w810 h560")
                  , g = screen.width / 2 - s.width / 2
                  , nt = screen.height / 2 - s.height / 2 * 1.1
                  , tt = "center=yes,resizable=" + (i.hasClass("tvip") ? "no" : "yes") + ",scrollbars=yes,  width=" + s.width + ", height=" + s.height + ",left=" + g + ",top=" + nt
                  , h = "";
                h = pm.parentOrLocalHost() + "/" + global.lan + "/live-streaming";
                l = i.attr("url").split("/live-streaming");
                h = h + l[1];
                a = i.hasClass("tvip") ? "stream" : "_blank";
                window.open(i.attr("url"), a, tt);
                t.stopPropagation();
                t.preventDefault()
            } else {
                if (i.hasClass("btn-mb")) {
                    $("#view-setting").hide();
                    return
                }
                if (i.hasClass("bg")) {
                    if (uv.cdbg && (e = i.attr("cc-info"),
                    e != undefined && e != "" && e != null )) {
                        var u = e.split("|")
                          , v = u[0]
                          , y = u[1]
                          , p = u[2]
                          , w = u[3]
                          , b = u[4]
                          , k = u[5];
                        liveCentreControl.playIgnoreLock(v, y, p, w, b, k, uv.login);
                        lockInfo.isLock && liveCentreControl.saveLockInfo(v, y, p, w, ccparam.lang, b, k)
                    }
                    return
                }
                if (i.hasClass("tvip")) {
                    if (uv.cdbg && i.hasClass("bgs")) {
                        if (e = i.attr("cc-info"),
                        e != undefined && e != "" && e != null ) {
                            var u = e.split("|")
                              , v = u[0]
                              , y = u[1]
                              , p = u[2]
                              , w = u[3]
                              , b = u[4]
                              , k = u[5];
                            Action.RightPanel.TV.playTvIgnoreLock(v, y, p, w, b, k, uv.login);
                            lockInfo.isLock && liveCentreControl.saveLockInfo(v, y, p, w, ccparam.lang, b, k)
                        }
                    } else {
                        var s = utility.parsePopupInfo("popup-new w810 h598")
                          , g = screen.width / 2 - s.width / 2
                          , nt = screen.height / 2 - s.height / 2
                          , tt = "center=yes,resizable=" + (i.hasClass("tvip") ? "no" : "yes") + ",scrollbars=yes,  width=" + s.width + ", height=" + s.height + ",left=" + g + ",top=" + nt
                          , h = "";
                        h = pm.parentOrLocalHost() + "/" + global.lan + "/live-streaming";
                        l = i.attr("url").split("/live-streaming");
                        h = h + l[1];
                        a = i.hasClass("tvip") ? "stream" : "_blank";
                        window.open(h, a, tt);
                        t.stopPropagation();
                        t.preventDefault()
                    }
                    return
                }
                if (i.hasClass("fve"))
                    myEvents.toggleMyEventsByEvent(i);
                else if (i.hasClass("fvc"))
                    myEvents.toggleMyEventsByCompetition(i);
                else {
                    if (i.hasClass("comp-fav"))
                        return it = i.hasClass("cpIcon") ? i : i.parent(),
                        ft = it.attr("id").substr(2),
                        Action.LeftPanel.MyCompetition.toggle({
                            sid: o.param.SportId,
                            sn: o.param.SportName,
                            cid: +ft,
                            cn: it.parent().prev().text().trim()
                        }),
                        !1;
                    if (i.hasClass("childExp") || i.hasClass("icon-ArrowUp") || i.hasClass("icon-ArrowDown"))
                        o.vars.isCollapsing || (o.vars.isCollapsing = !0,
                        c = i.parents(".childTitle"),
                        rt = c.parent(),
                        r = c.attr("id"),
                        c.hasClass("collapsed") ? (c.removeClass("collapsed"),
                        d = rt.next(),
                        om.state.showHideChildEvt(d, !0),
                        setTimeout(function() {
                            ScrollerBar.initScrollbarStatus()
                        }, 100),
                        n(o.stateObjs.$collapsedObjsChild, r),
                        o.stateObjs.$expandObjsChild.push(r)) : (c.addClass("collapsed"),
                        d = rt.next(),
                        om.state.showHideChildEvt(d, !1),
                        setTimeout(function() {
                            ScrollerBar.initScrollbarStatus()
                        }, 100),
                        o.stateObjs.$collapsedObjsChild.push(r),
                        n(o.stateObjs.$expandObjsChild, r)),
                        o.vars.isCollapsing = !1);
                    else if (i.hasClass("btn-toggle") || i.hasClass("toggle-arrow")) {
                        if (!o.vars.isCollapsing && (o.vars.isCollapsing = !0,
                        et = i.hasClass("child"),
                        et)) {
                            var ot = i.parents(".child-title")
                              , f = i.closest("span.btn-toggle")
                              , r = f.attr("id")
                              , st = i.closest("tbody");
                            f.hasClass("expand") ? (ot.nextAll().hide(),
                            ut = st.nextUntil(".firstEvt"),
                            o.stateObjs.$collapsedObjsChild.push(r),
                            om.removeFromArray(o.stateObjs.$expandObjsChild, r),
                            f.removeClass("expand"),
                            o.vars.isCollapsing = !1) : (ot.nextAll().show(),
                            ut = st.nextUntil(".firstEvt"),
                            om.removeFromArray(o.stateObjs.$collapsedObjsChild, r),
                            o.stateObjs.$expandObjsChild.push(r),
                            f.addClass("expand"),
                            o.vars.isCollapsing = !1)
                        }
                    } else
                        (i.hasClass("competitionName") || i.hasClass("tableContainer") || i.hasClass("cpn")) && (o.vars.isCollapsing || (o.vars.isCollapsing = !0,
                        f = i.closest(".competitionName"),
                        r = f.attr("id"),
                        f.hasClass("expand") ? (f.removeClass("expand"),
                        o.stateObjs.$collapsedObjs.push(r),
                        n(o.stateObjs.$expandObjs, r),
                        f.next().hide("blind", function() {
                            o.vars.isCollapsing = !1;
                            ScrollerBar.initScrollbarStatus()
                        })) : (f.addClass("expand"),
                        n(o.stateObjs.$collapsedObjs, r),
                        o.stateObjs.$expandObjs.push(r),
                        f.next().show("blind", function() {
                            o.vars.isCollapsing = !1;
                            ScrollerBar.initScrollbarStatus()
                        }))))
                }
            }
        }
          , i = function(n) {
            var i = $(this), h, f, c, u, e, l, s;
            if ((i.hasClass("net") && (i = i.children().last()),
            h = i.html(),
            h != "") && (f = i.attr("id"),
            f != undefined && f != "")) {
                var r = i.parents("div.event")
                  , t = r.attr("id")
                  , y = r.attr("pid")
                  , p = r.attr("ctid");
                p == window.o.pacType.pelAH && (c = i.parent().parent(),
                (c.hasClass("td-odds-ou-odds") || c.hasClass("td-odds-ouSecond-odds")) && ($evts = r.nextUntil(".hidden"),
                $evts.length === 0 ? t = r.next().attr("id") : (t = $evts.last().next().attr("id"),
                t === undefined && (t = r.attr("id")))));
                t = t.substring(1);
                u = "";
                i.parent().parent().hasClass("td-odds-teamOu-odds") && (u = t,
                t = i.parents("tr").attr("tid").substring(1));
                e = o.$mainOddsPanel.find("#" + f.replace("o", "h")).attr("hdp");
                (e == "" || e == undefined) && (e = null );
                t && t.indexOf("_") != -1 && o.param.IsInplay && (t = t.split("_")[0]);
                var a = u == "" ? o.$mainOddsPanel.find("#sh" + t) : o.$mainOddsPanel.find("#sh" + u)
                  , v = u == "" ? o.$mainOddsPanel.find("#sa" + t) : o.$mainOddsPanel.find("#sa" + u)
                  , w = a.html() === undefined ? null : a.html()
                  , b = v.html() === undefined ? null : v.html()
                  , k = w + ":" + b;
                t.indexOf("_") != -1 && (t = t.substring(0, t.indexOf("_")));
                i.parents("td").addClass("selected");
                l = i.closest("tr").next(".secondRow");
                l.length > 0 ? l.find("#" + i.attr("id")).parents("td").addClass("selected") : (s = i.closest("tr"),
                s.length > 0 && s.hasClass("secondRow") && s.prev("tr").find("#" + i.attr("id")).parents("td").addClass("selected"));
                Action.RightPanel.addSelection(f.substring(1), t, h, e, k, o.param.IsInplay, y);
                n.stopPropagation()
            }
        }
          , r = function(n) {
            var r = $(this).parents(".event"), t = r.attr("pid"), u, i;
            t && t != 0 || (t = r.prop("id").substring(1));
            u = $("#en" + t).val();
            i = VIEW.PRESTART;
            o.param.Tab == "Inplay" ? i = VIEW.INPLAY : o.param.Tab == "Popular" && (i = VIEW.STARTINGSOON);
            Action.event(t, i, u);
            n.stopPropagation()
        }
          , u = function(n) {
            var i = $(this).parents(".event"), t = i.attr("pid"), r, u;
            t && t != 0 || (t = i.prop("id").substring(1));
            r = $("#en" + t).val();
            u = VIEW.PRESTART;
            Action.event(t, u, r);
            n.stopPropagation()
        }
          , f = function(n) {
            var t = $(this)
              , i = t.parents("tbody").find(".td-teameName").addClass("darkerHover").end().data("amkt");
            o.$mainOddsPanel.find("#" + i).addClass("hover");
            n.stopPropagation()
        }
          , e = function(n) {
            var t = $(this)
              , i = t.parents("tbody").find(".td-teameName").removeClass("darkerHover").end().data("amkt");
            o.$mainOddsPanel.find("#" + i).removeClass("hover");
            n.stopPropagation()
        }
          , n = function(n, t) {
            $.each(n, function(i, r) {
                r == t && n.splice(i, 1)
            })
        }
        ;
        return {
            oddsContainerClicked: t,
            oddsClicked: i,
            allMarketsClicked: r,
            epsClicked: u,
            selectionHover: f,
            selectionLeave: e
        }
    }(),
    filter: function() {
        return {
            isSelectedFilterType: function(n) {
                var t = utility.cookie.read(o.FILTER_TYPE), i;
                return t && t.length > 0 && (i = t.split(","),
                $.inArray(n, i) != -1) ? !0 : !1
            },
            isUnselectedFilterType: function(n) {
                return om.filter.isSelectedFilterType("-" + n)
            },
            addFilterTypeToCookie: function(n) {
                var t = utility.cookie.read(o.FILTER_TYPE), i, r;
                t && t.length > 0 ? (i = t.split(","),
                r = _.union(i, [n]),
                t = r.join(",")) : t = n;
                utility.cookie.write(o.FILTER_TYPE, t, 730)
            },
            removeFilterTypeFromCookie: function(n) {
                var t = utility.cookie.read(o.FILTER_TYPE), i;
                t && t.length > 0 && (i = t.split(","),
                _.remove(i, function(t) {
                    return t == n
                }),
                utility.cookie.write(o.FILTER_TYPE, i.join(","), 730))
            },
            activateFilter: function(n) {
                om.filter.removeFilterTypeFromCookie("-" + n);
                om.filter.addFilterTypeToCookie(n)
            },
            inactivateFilter: function(n) {
                om.filter.removeFilterTypeFromCookie(n);
                om.filter.addFilterTypeToCookie("-" + n)
            }
        }
    }(),
    findTheFirstAvaiableBg: function(n) {
        var t = null , u = !1, i, f, r, e;
        if (n.c && n.c.length > 0)
            for (i = 0; i < n.c.length; i++) {
                if (u)
                    break;
                for (f = n.c[i].e,
                r = 0; r < f.length; r++)
                    if (t = f[r],
                    t.ibs && t.ibsc) {
                        u = !0;
                        break
                    }
            }
        u ? (e = t.cei.ctid == 0 ? t.k : t.pk,
        om.isFoundBg = !0,
        liveCentreControl.saveDefaultBgInfo(e, t.i[0], t.i[1], n.k, global.lan, t.i[7], t.pvdr)) : (liveCentreControl.clearDefaultBgInfo(),
        ccparam.playingLsId == "" && (ccparam.playingEventId = ""))
    },
    playCC: function() {
        o.param.IsInplay && Action.RightPanel.TV.playTvDefault(function(n) {
            var t;
            if (n)
                om.isPlayingCC = !0,
                om.havePlayingTv = !0,
                om.isFoundBg || (t = liveCentreControl.getDefaultBgInfo(),
                t && liveCentreControl.clearDefaultBgInfo());
            else if (om.isFoundTv = !1,
            t = liveCentreControl.getDefaultBgInfo(),
            om.isFoundBg) {
                if (om.isFoundBg) {
                    if (om.isPlayingCC) {
                        liveCentreControl.getEnlargeStatus() && setTimeout(function() {
                            Action.RightPanel.resize(!0)
                        }, 500);
                        return
                    }
                    t && typeof t != "undefined" && (uv.login ? utility.service("LiveTv", "GetLiveEventDetails", {
                        Date: "",
                        SportId: t.sportId,
                        IsCheckUserCanSeeTv: !0
                    }, "GET", function(n) {
                        var i = t.playingLsId;
                        n.stv || (i = "");
                        liveCentreControl.create(t.playingEventId, t.hTeamName, t.aTeamName, t.sportId, global.lan, i, t.videoProvider);
                        om.isPlayingCC = !0
                    }) : om.isPlayingCC || (liveCentreControl.create(t.playingEventId, t.hTeamName, t.aTeamName, t.sportId, global.lan, "", t.videoProvider),
                    om.isPlayingCC = !0),
                    om.havePlayingBg = !0)
                }
            } else {
                t && typeof t != "undefined" && liveCentreControl.clearDefaultBgInfo();
                om.isPlayingCC = !1;
                liveCentreControl.clearMbInfo(!1);
                liveCentreControl.showErrorMsg();
                return
            }
            if (om.havePlayingBg || om.havePlayingTv || ccparam.isHideErrorMsg && (liveCentreControl.hideErrorMsg(),
            om.isPlayingCC = !1),
            om.isPlayingCC) {
                liveCentreControl.getEnlargeStatus() && setTimeout(function() {
                    Action.RightPanel.resize(!0)
                }, 500);
                return
            }
        })
    }
};
$(function() {
    o.$mainOddsPanel.on("click", "div.container", om.handler.oddsContainerClicked).on("click", ".odds", om.handler.oddsClicked).on("click", ".amkt", om.handler.allMarketsClicked).on("click", ".epsbanner", om.handler.epsClicked).on("mouseenter", ".h-amkt", om.handler.selectionHover).on("mouseleave", ".h-amkt", om.handler.selectionLeave)
});
myEvents = function() {
    var n = $("#myEventTitle")
      , y = $("#myEventCount")
      , i = $($("#myEventsEmptyMsg").text())
      , p = function(t) {
        if (n[t ? "removeClass" : "addClass"]("hidden"),
        o.$myEventsContainer[t ? "removeClass" : "addClass"]("hidden"),
        t) {
            var i = o.$myEventsContainer.find(".event").length > 0;
            n[i ? "removeClass" : "addClass"]("collapsed").find(".removeAll")[i ? "removeClass" : "addClass"]("hidden");
            i ? o.$myEventsContainer.find("#addMyEventsMsg").remove().end().addClass("myFavHasEvent") : o.$myEventsContainer.addClass("myFavHasEvent");
            u()
        }
    }
      , w = function() {
        var t = o.$myEventsContainer.find(".event").length > 0;
        t ? n.hasClass("collapsed") ? o.$myEventsContainer.addClass("hidden") : o.$myEventsContainer.find("#addMyEventsMsg").remove().end().addClass("myFavHasEvent") : n.hasClass("collapsed") ? o.$myEventsContainer.addClass("hidden") : o.$myEventsContainer.append(i).removeClass("myFavHasEvent");
        n.find(".removeAll")[t ? "removeClass" : "addClass"]("hidden");
        u()
    }
      , b = function() {
        n.hasClass("collapsed") ? (n.removeClass("collapsed"),
        o.$myEventsContainer.find(".event").length == 0 ? o.$myEventsContainer.append(i).removeClass("hidden myFavHasEvent") : o.$myEventsContainer.removeClass("hidden")) : (n.addClass("collapsed"),
        o.$myEventsContainer.find(".event").length == 0 ? o.$myEventsContainer.find("#addMyEventsMsg").remove().end().addClass("hidden myFavHasEvent") : o.$myEventsContainer.addClass("hidden"));
        ScrollerBar.initScrollbarStatus()
    }
      , e = function(n) {
        var s = n.parent(), e = n.data("meinfo").split("_"), f = e[0], t = e[1], i, u;
        s.hasClass("actived") ? (u = o.$containerWrapper.find("#" + t + " .event").length == 0,
        i = a(t, !0),
        u ? nt(f, t) : _.forEach(i, function(n) {
            r(f, t, n, o.$containerWrapper, o.$myEventsContainer, !1)
        }),
        c(i)) : (u = o.$myEventsContainer.find("#" + t + " .event").length == 0,
        i = a(t, !1),
        u ? g(f, t) : _.forEach(i, function(n) {
            r(f, t, n, o.$myEventsContainer, o.$containerWrapper, !0)
        }),
        h(i));
        n = null
    }
      , s = function(n, t) {
        var s = n.parent()
          , u = n.data("meinfo").split("_")
          , f = u[0]
          , e = u[1]
          , i = +u[2];
        s.hasClass("actived") ? (r(f, e, i, o.$containerWrapper, o.$myEventsContainer, !1),
        c(i, t),
        n.attr("title", l.OP_AddMyEvents)) : (r(f, e, i, o.$myEventsContainer, o.$containerWrapper, !0),
        h(i));
        n = null
    }
      , k = function(n) {
        var t = o.$myEventsContainer.find(".cp-container").not(".hidden").find(".fvc");
        _.forEach(t, function(n) {
            var t = $(n);
            e(t)
        });
        n.stopPropagation()
    }
      , d = function(n, t) {
        var i = o.$myEventsContainer.find('.event[pid="' + n + '"]').eq(0).find(".fve");
        i.length > 0 && s(i, t)
    }
      , r = function(n, i, r, u, e, o) {
        var c = u.find("#" + i + " .ec"), a = c.children(), s = e.find("#" + i + " .ec"), y = v(i), p, h, w;
        a.length > 0 ? (p = s.find('.event[pid="' + r + '"]').detach().find(".myFavorite")[o ? "addClass" : "removeClass"]("actived").children().attr("title", o ? l.OP_RemoveMyEvents : l.OP_AddMyEvents).end().end(),
        y && (_.forEach(p, function(n) {
            tt($(n), a)
        }),
        c.html(a))) : (y && (h = s.find('.event[pid="' + r + '"]').prevAll(".child").addBack().clone().find(".myFavorite")[o ? "addClass" : "removeClass"]("actived").children().attr("title", o ? l.OP_RemoveMyEvents : l.OP_AddMyEvents).end().end(),
        w = h.map(function() {
            var n = $(this)
              , t = n.data("gtid");
            if (n.hasClass("event") && !_.isUndefined(t))
                return "gt" + t
        }),
        _.remove(h, function(n) {
            var t = $(n);
            return !t.hasClass("event") && _.indexOf(w, n.id) == -1
        }),
        c.html(h)),
        s.find('.event[pid="' + r + '"]').remove());
        it(s);
        t(n, i, !0);
        f();
        t(n, i, !1);
        u = null ;
        e = null
    }
      , h = function(n) {
        o.stateObjs.timers = o.$mainOddsPanel.find(".timer");
        Action.MainOdds.MyEvents.toggle(n);
        Action.PopUp.show(!0, PopUp_Store.popUpType().MYEVENTS);
        u()
    }
      , c = function(n, t) {
        o.stateObjs.timers = o.$mainOddsPanel.find(".timer");
        t || Action.MainOdds.MyEvents.toggle(n);
        Action.PopUp.show(!1, PopUp_Store.popUpType().MYEVENTS);
        u()
    }
      , a = function(n, t) {
        var r = (t ? o.$myEventsContainer : o.$containerWrapper).find("#" + n + " .event")
          , i = [];
        return _.forEach(r, function(n) {
            i.push(+$(n).attr("pid"))
        }),
        _.uniq(i)
    }
      , g = function(n, i) {
        var r = o.$containerWrapper.find("#" + i + " .ec").children().detach().find(".myFavorite").addClass("actived").children().attr("title", l.OP_RemoveMyEvents).end().end();
        o.$myEventsContainer.find("#" + i + " .ec").html(r);
        t(n, i, !0);
        f();
        t(n, i, !1);
        r = null
    }
      , nt = function(n, i) {
        var r = o.$myEventsContainer.find("#" + i + " .ec").children().detach().find(".myFavorite").removeClass("actived").children().attr("title", l.OP_AddMyEvents).end().end();
        isValidCompetitions = v(i);
        isValidCompetitions && o.$containerWrapper.find("#" + i + " .ec").html(r);
        t(n, i, !0);
        f();
        t(n, i, !1);
        r = null
    }
      , tt = function(n, t) {
        var h = +n.data("odr"), e = 0, u = n.data("gtid"), o = !1, s = !1, i = null , r = 0, f;
        t.each(function(n) {
            var t = $(this), f;
            if (t.hasClass("event")) {
                if (e = +t.data("odr"),
                h < e)
                    return o || u == 0 || (i = document.getElementById("gt" + u),
                    i && (i = i.cloneNode(!0))),
                    r = n,
                    !1
            } else
                t.hasClass("child") && (f = t.prop("id"),
                f.slice(2) == u && (o = !0,
                t.children(".childTitle").hasClass("collapsed") && (s = !0)))
        });
        r == 0 && h > e ? (o || (i = document.getElementById("gt" + u)),
        i ? (t.push(i.cloneNode(!0)),
        $(i).children(".childTitle").hasClass("collapsed") && n.addClass("hidden")) : s && n.addClass("hidden"),
        t.push(n[0])) : (f = $(t[r - 1]),
        f.length > 0 && f.hasClass("child") && f.prop("id").slice(2) != u && (r = r - 1),
        i ? ($(i).children(".childTitle").hasClass("collapsed") && n.addClass("hidden"),
        t.splice(r, 0, i, n[0])) : (s && n.addClass("hidden"),
        t.splice(r, 0, n[0])))
    }
      , it = function(n) {
        var t = n.find(".child")
          , i = _.remove(t, function(t) {
            return n.find('.event[data-gtid="' + t.id.slice(2) + '"]').length == 0
        });
        n.find(i).remove()
    }
      , v = function(n) {
        return selobj.cids.length == 0 || selobj.cids.length > 0 && _.indexOf(selobj.cids.split(","), n.split("-")[0].substr(2)) != -1
    }
      , t = function(n, t, i) {
        var r = (i ? o.$myEventsContainer : o.$containerWrapper).find("#" + n)
          , u = (i ? o.$myEventsContainer : o.$containerWrapper).find("#" + t)
          , f = r.find(".event").length == 0
          , e = u.find(".event").length == 0;
        r[f ? "addClass" : "removeClass"]("hidden");
        u[e ? "addClass" : "removeClass"]("hidden")
    }
      , f = function() {
        var t = o.$myEventsContainer.find(".event").length;
        t == 0 ? (n.find(".removeAll").addClass("hidden"),
        o.$myEventsContainer.append(i).removeClass("myFavHasEvent hidden")) : (n.removeClass("collapsed").find(".removeAll").removeClass("hidden"),
        o.$myEventsContainer.addClass("myFavHasEvent").removeClass("hidden"),
        i.remove())
    }
      , u = function() {
        var n = o.$myEventsContainer.find(".fve")
          , t = _.map(n, function(n) {
            return $(n).data("meinfo")
        });
        y.text(_.uniq(t).length)
    }
    ;
    return {
        init: p,
        refresh: w,
        toggleTitle: b,
        toggleMyEventsByCompetition: e,
        toggleMyEventsByEvent: s,
        removeAll: k,
        removeEvent: d
    }
}();
$(function() {
    OddsHeader.container || (OddsHeader.container = $("#oddsHeaderContainer"),
    OddsHeader.ddl_odds = $("#ddl_odds"),
    OddsHeader.ddl_oddsOpt = $("#ddl_oddsFmtOptions1"),
    OddsHeader.ddl_oddsDisplay = $("#ddl_oddsFmtDisplay1"),
    OddsHeader.ddl_sortBy = $("#ddlSortBy"),
    OddsHeader.ddl_sortIcon = $("#sortIcon"),
    OddsHeader.ddl_sortOpt = $("#sortByOpt"),
    OddsHeader.ddl_market = $("#ddlMarket"),
    OddsHeader.ddl_marketOpt = $("#ddlMarketOpt"),
    OddsHeader.pager = $("#p-pg-btn"));
    OddsHeader.initOddsDDL();
    OddsHeader.initSortByDDL();
    OddsHeader.initMarketDDL();
    OddsHeader.competitionMenu().init();
    OddsHeader.QuickMenuDDL().init();
    OddsHeader.BetTypeDDL().init();
    $("html").click(function(n) {
        var t = $(n.target) || $(n.srcElement);
        t.hasClass("icon-Xbutton") || OddsHeader.hideAllDDL()
    })
});
OddsHeader = {
    container: null ,
    ddl_odds: null ,
    ddl_oddsOpt: null ,
    ddl_oddsDisplay: null ,
    ddl_sortBy: null ,
    ddl_sortIcon: null ,
    ddl_sortOpt: null ,
    ddl_market: null ,
    ddl_marketOpt: null ,
    $filter_half: null ,
    $filter_standard: null ,
    setting: {
        ipcRefInt: null ,
        SPORT_SETTING_COOKIE_NAME: "settingProfile",
        param: {
            OddsType: null ,
            IsFirstLoad: !0,
            SortBy: null
        },
        oddsType: uv.ov,
        sortBy: uv.sb,
        noOfLine: uv.nol,
        autoRefreshBetslip: uv.iarf,
        expiredDay: 7
    },
    hideAllDDL: function(n) {
        var t, i;
        mpc.pv == 1 && (OddsHeader.ddl_sortBy.hasClass("collapsed") || n == OddsHeader.ddl_sortBy[0] || OddsHeader.ddl_sortBy.toggleClass("collapsed"),
        OddsHeader.ddl_odds.hasClass("collapsed") || n == OddsHeader.ddl_odds[0] || OddsHeader.ddl_odds.toggleClass("collapsed"),
        OddsHeader.ddl_market.hasClass("collapsed") || n == OddsHeader.ddl_market[0] || OddsHeader.ddl_market.toggleClass("collapsed"),
        OddsHeader.pager.hasClass("collapsed") || n == OddsHeader.pager[0] || OddsHeader.pager.toggleClass("collapsed"),
        t = $("#quickMenu"),
        t.hasClass("collapsed") || n != undefined && n.id == t.attr("id") || t.toggleClass("collapsed"),
        i = $("#betType"),
        i.hasClass("collapsed") || n != undefined && n.id == i.attr("id") || i.toggleClass("collapsed"))
    },
    initOddsDDL: function() {
        OddsHeader.ddl_odds.on("click", function(n) {
            var t = $(this);
            t.toggleClass("collapsed");
            OddsHeader.hideAllDDL(this);
            n.stopPropagation()
        });
        OddsHeader.ddl_oddsOpt.on("click", "li", function() {
            var n = $(this)
              , t = n.data("value");
            OddsHeader.setting.param.OddsType = t;
            OddsHeader.setting.param.IsFirstLoad = !0;
            utility.service("OddsService", "UpdateOddsType", OddsHeader.setting.param, "GET", function(i) {
                i.suc && (settingParam.oddsType = uv.ov = t,
                OddsHeader.saveToCookie(),
                oddsUtil.SetOddsTypeCss(),
                cCtrl.reloadPage(),
                OddsHeader.ddl_oddsDisplay.html(n.data("sel")),
                n.siblings().removeClass("actived"),
                n.addClass("actived"))
            })
        });
        var n = OddsHeader.ddl_oddsOpt.find("li[data-value='" + uv.ov + "']").addClass("actived").data("sel");
        OddsHeader.ddl_oddsDisplay.html(n)
    },
    reHighlightSelOdds: function() {
        OddsHeader.ddl_oddsOpt.find("li").removeClass("actived");
        var n = OddsHeader.ddl_oddsOpt.find("li[data-value='" + uv.ov + "']").addClass("actived").data("sel");
        OddsHeader.ddl_oddsDisplay.html(n)
    },
    initSortByDDL: function() {
        OddsHeader.ddl_sortBy.on("click", function(n) {
            $(this).toggleClass("collapsed");
            OddsHeader.hideAllDDL(this);
            n.stopPropagation()
        });
        OddsHeader.ddl_sortOpt.on("click", "li", function() {
            var n = $(this)
              , t = n.data("value");
            settingParam.sortBy = uv.sb = t;
            OddsHeader.saveToCookie();
            cCtrl.reloadPage();
            OddsHeader.ddl_sortIcon.attr("class", t == "1" ? "icon-SortCompetition" : "icon-SortTime");
            n.siblings().removeClass("actived");
            n.addClass("actived")
        });
        var n = OddsHeader.ddl_sortOpt.find("li[data-value='" + settingParam.sortBy + "']");
        n.addClass("actived");
        OddsHeader.ddl_sortIcon.attr("class", settingParam.sortBy == "1" ? "icon-SortCompetition" : "icon-SortTime")
    },
    initMarketDDL: function() {
        OddsHeader.ddl_market.on("click", function(n) {
            var t = $(this);
            t.toggleClass("collapsed");
            OddsHeader.hideAllDDL(this);
            n.stopPropagation()
        });
        OddsHeader.ddl_marketOpt.on("click", "li", function() {
            var n = $(this)
              , t = n.data("value");
            settingParam.noOfLine = uv.nol = t;
            OddsHeader.saveToCookie();
            cCtrl.reloadPage();
            n.siblings().removeClass("actived");
            n.addClass("actived");
            settingParam.noOfLine == 1 ? OddsHeader.ddl_market.removeClass("plus").addClass("minur") : OddsHeader.ddl_market.removeClass("minur").addClass("plus")
        });
        settingParam.noOfLine == 1 ? OddsHeader.ddl_market.removeClass("plus").addClass("minur") : OddsHeader.ddl_market.removeClass("minur").addClass("plus");
        (UI.isMACFirefox || UI.isMACSafari) && OddsHeader.ddl_market.children(".leftPart").addClass("macfix");
        var n = OddsHeader.ddl_marketOpt.find("li[data-value='" + settingParam.noOfLine + "']");
        n.addClass("actived")
    },
    saveToCookie: function() {
        var n = "OddsType=" + settingParam.oddsType + "&NoOfLinePerEvent=" + settingParam.noOfLine + "&SortBy=" + settingParam.sortBy + "&AutoRefreshBetslip=" + settingParam.autoRefreshBetslip;
        utility.cookie.write(settingParam.SPORT_SETTING_COOKIE_NAME, n, settingParam.expiredDay)
    },
    reInitHeaderDDLs: function() {
        var r = uv.ov, e = uv.nol, o = uv.sb, s = uv.iarf, u = utility.cookie.read(settingParam.SPORT_SETTING_COOKIE_NAME), i, t, n, f;
        if (u != null )
            for (i = u.split("&"),
            t = 0; t < i.length; t++) {
                n = i[t].split("=");
                switch (n[0]) {
                case "OddsType":
                    r = n[1];
                    break;
                case "NoOfLinePerEvent":
                    e = n[1];
                    break;
                case "SortBy":
                    o = n[1];
                    break;
                case "AutoRefreshBetslip":
                    s = n[1]
                }
            }
        OddsHeader.ddl_oddsOpt.find("li").removeClass("actived");
        f = OddsHeader.ddl_oddsOpt.find("li[data-value='" + r + "']").addClass("actived").data("sel");
        OddsHeader.ddl_oddsDisplay.html(f)
    },
    resetSportText: function(n) {
        o.param.Tab == "Popular" ? $("#headerTxt").text(l.LP_StartingSoonMenu) : o.param.Tab == "Favourite" ? $("#headerTxt").html(l.ip.toUpperCase() + ' : <span class="fav-txt">' + l.LP_My_Fav + "<\/span>") : selobj.favT == 2 ? $("#headerTxt").text(l.LP_MyComp) : $("#headerTxt").text(n)
    },
    initFilterButton: function(n) {
        var c = "1h_", l = "st_", i, r, f, e, s, h, t = o.$mainOddsPanel.find('[id="s' + n + '"]'), u = function(i, r) {
            var u = $(this);
            r ? (i.data.addClass("activated"),
            t.addClass(u.attr("id"))) : (u.hasClass("activated") ? (i.data.removeClass("activated"),
            t.removeClass(u.attr("id")),
            om.filter.inactivateFilter(u.attr("id") + n)) : (i.data.addClass("activated"),
            t.addClass(u.attr("id")),
            om.filter.activateFilter(u.attr("id") + n)),
            ScrollerBar.initScrollbarStatus());
            i.stopPropagation();
            i = null
        }
        , a, v, y, p;
        switch (n) {
        case 1:
            OddsHeader.$filter_half = t.find('[id="filter_half"]');
            OddsHeader.$filter_standard = t.find('[id="filter_standard"]');
            OddsHeader.$filter_half.off("click").on("click", OddsHeader.$filter_half, function(i, r, u) {
                i.data.addClass("activated");
                t.removeClass("standard-View").addClass("half1st-View");
                OddsHeader.$filter_standard.removeClass("activated");
                r || (om.filter.activateFilter(c + n),
                om.filter.inactivateFilter(l + n));
                u || Action.MainOdds.Toggle1stHalfView(!0);
                i.stopPropagation();
                o.is1stHalfOn = !0;
                i = null
            });
            OddsHeader.$filter_standard.off("click").on("click", OddsHeader.$filter_standard, function(i, r, u) {
                i.data.addClass("activated");
                t.removeClass("half1st-View").addClass("standard-View");
                OddsHeader.$filter_half.removeClass("activated");
                r || (om.filter.activateFilter(l + n),
                om.filter.inactivateFilter(c + n));
                u || Action.MainOdds.Toggle1stHalfView(!1);
                i.stopPropagation();
                o.is1stHalfOn = !1;
                i = null
            });
            a = o.param.UIBetType;
            (a != "cs" || a != "htft") && (om.filter.isSelectedFilterType(c + n) ? OddsHeader.$filter_half.eq(0).trigger("click", [!0, !1]) : om.filter.isSelectedFilterType(l + n) ? OddsHeader.$filter_standard.eq(0).trigger("click", [!0, !1]) : uv.urView.toLowerCase() == "asian" && UI.state.view != UIVIEW.R1024 && OddsHeader.$filter_half.eq(0).trigger("click", [!0, !1]));
            break;
        case 2:
        case 7:
            i = t.find('[id="quarters"]');
            r = t.find('[id="halves"]');
            i.off("click").on("click", i, u);
            r.off("click").on("click", r, u);
            v = r.attr("id") + n;
            y = i.attr("id") + n;
            om.filter.isSelectedFilterType(v) ? r.eq(0).trigger("click", !0) : n != 7 || uv.urView.toLowerCase() != "asian" || om.filter.isUnselectedFilterType(v) || r.eq(0).trigger("click", !0);
            om.filter.isSelectedFilterType(y) ? i.eq(0).trigger("click", !0) : n != 7 || uv.urView.toLowerCase() != "asian" || om.filter.isUnselectedFilterType(y) || i.eq(0).trigger("click", !0);
            break;
        case 3:
        case 9:
        case 13:
        case 20:
        case 27:
            f = t.find('[id="sets"]');
            e = t.find('[id="game"]');
            s = t.find('[id="point"]');
            f.off("click").on("click", f, u);
            e.off("click").on("click", e, u);
            s.off("click").on("click", s, u);
            var w = f.attr("id") + n
              , b = e.attr("id") + n
              , k = s.attr("id") + n;
            (om.filter.isSelectedFilterType(w) || uv.urView.toLowerCase() == "asian" && !om.filter.isUnselectedFilterType(w)) && f.eq(0).trigger("click", !0);
            (om.filter.isSelectedFilterType(b) || uv.urView.toLowerCase() == "asian" && !om.filter.isUnselectedFilterType(b)) && e.eq(0).trigger("click", !0);
            (om.filter.isSelectedFilterType(k) || uv.urView.toLowerCase() == "asian" && !om.filter.isUnselectedFilterType(k)) && s.eq(0).trigger("click", !0);
            break;
        case 19:
        case 26:
            h = t.find('[id="periods"]');
            h.off("click").on("click", h, u);
            p = h.attr("id") + n;
            (om.filter.isSelectedFilterType(p) || uv.urView.toLowerCase() == "asian" && !om.filter.isUnselectedFilterType(p)) && h.eq(0).trigger("click", !0)
        }
    },
    QuickMenuDDL: function() {
        var t = null
          , n = null
          , i = function() {
            o.$containerWrapper.on("click", "#quickMenu", r).on("click", ".qmopt,.mycomp", u)
        }
          , r = function(i) {
            var u = global.lan + ".QuickMenu.html", f = $("#quickMenuOptions"), e = i.srcElement || i.target, r;
            n = $("#quickMenu");
            e.className.indexOf("jsp") == -1 && (n.hasClass("collapsed") ? (r = LPM.getStore("PreStart").state.smd,
            r = _.find(r, function(n) {
                return n.sid == selobj.spt
            }),
            r.mc = LPM.mycomps,
            t = r.sn,
            utility.template("OddsPage/" + u, function(t) {
                f.html(t.process(r));
                setTimeout(ScrollerBar.initQuickMenuScrollbar, 100);
                n.removeClass("collapsed")
            }, u)) : n.addClass("collapsed"),
            OddsHeader.hideAllDDL(this));
            i.stopPropagation()
        }
          , u = function(i) {
            var r = $(this), f, e;
            if (r.hasClass("mycomp")) {
                var u = r.toggleClass("actived").parents(".qmopt")
                  , o = u.data("cid")
                  , s = u.data("cn");
                Action.LeftPanel.MyCompetition.toggle({
                    sid: selobj.spt,
                    sn: t,
                    cid: o,
                    cn: s
                })
            } else
                f = r.data("key"),
                e = r.data("ct"),
                +e == 0 ? (r.find(".hidden").removeClass("hidden"),
                ScrollerBar.initQuickMenuScrollbar()) : (n && n.addClass("collapsed"),
                Action.MainOdds.QuickMenu.changeOption(f, selobj.sptn, r.data("cid")));
            i.stopPropagation()
        }
        ;
        return {
            init: i
        }
    },
    BetTypeDDL: function() {
        var n = function() {
            o.$containerWrapper.on("click", "#betType", t).on("click", ".btopt", i)
        }
          , t = function(n) {
            var r = $("#betType"), f = $("#betTypeOptions"), u = new StringBuilderEx, i = o.stateObjs.bts, t;
            if (r.hasClass("collapsed")) {
                if (i.length > 0)
                    for (t = 0; t < i.length; t++)
                        u.appendFormat('<li class="btopt {0}" data-val="{1}"><table><colgroup><col><col class="col-fixed1"><\/colgroup><tbody><tr><td class="pd-0"><span class="lht-1p1 dsp-iblk mg-t-3">{2}<span><\/span><\/span><\/td><td class="height-37"><\/td><\/tr><\/tbody><\/table><\/li>', i[t].k == selobj.btp2 ? "actived" : "", i[t].k, oddsUtil.CustomizedBettypeName(selobj.spt, i[t].sk, i[t].n));
                f.html(u.toString());
                r.removeClass("collapsed");
                u = null
            } else
                r.addClass("collapsed");
            OddsHeader.hideAllDDL(this);
            n.stopPropagation()
        }
          , i = function(n) {
            var i = $(this)
              , t = i.attr("data-val");
            t && Action.MainOdds.BetType.changeOption(t);
            n.stopPropagation()
        }
        ;
        return {
            init: n
        }
    },
    competitionMenu: function() {
        var n = function() {
            o.$CompetitionMenu.click(function() {
                Action.MainOdds.CompetitionMenu()
            })
        }
          , t = function() {
            var n = utility.cookie.read(o.Select_All_Comps);
            selobj.pid != 0 || selobj.cids == "" || n == null || n == -1 ? o.$CompetitionMenu.find(".count").text(l.all) : o.$CompetitionMenu.find(".count").text(n)
        }
        ;
        return {
            init: n,
            count: t
        }
    }
};
AllMarketUtility = {
    getBetTypeName: function(n, t, i, r) {
        var u;
        switch (n.slice(0, 2)) {
        case "ah":
            u = l.MB_HDC;
            _.contains([3, 13, 27], r) && (u = n == "ah" ? l.MB_SetHDC : l.MB_GameHDC);
            _.contains([9, 20], r) && (u = n == "ah" ? l.MB_GameHDC : l.MB_PointHDC);
            break;
        case "ou":
            u = l.MB_OU;
            break;
        case "oe":
            u = l.MB_OE;
            break;
        case "cs":
            u = l.MB_CS;
            break;
        case "hf":
            u = l.MB_HF;
            break;
        case "tg":
            u = l.MB_TG;
            break;
        case "ml":
            u = this.isNetSport(r) ? l.Odds_Winner : l.MB_MoneyLine;
            break;
        case "sb":
            u = l.MB_SB
        }
        switch (n.slice(0, 3)) {
        case "1x2":
            u = l.MB_1X2;
            break;
        case "tts":
            u = l.MB_1stLstGoal;
            break;
        case "sco":
            u = l.MB_GS;
            break;
        case "bts":
            u = l.Odds_bts;
            break;
        case "win":
            u = l.MB_Winner
        }
        return n == "spwos" ? u = i : n == "m180" && (u = l.Most180),
        u
    },
    getPeriod: function(n, t) {
        n = n.toLowerCase();
        switch (n.substr(n.length - 2, 2)) {
        case "1h":
        case "h1":
            return l.Period_1H;
        case "2h":
        case "h2":
            return l.Period_2H;
        case "s1":
            return this.isTableTennisOrBadmintion(t) ? l.Period_1G : l.Period_1S;
        case "s2":
            return this.isTableTennisOrBadmintion(t) ? l.Period_2G : l.Period_2S;
        case "s3":
            return this.isTableTennisOrBadmintion(t) ? l.Period_3G : l.Period_3S;
        case "s4":
            return this.isTableTennisOrBadmintion(t) ? l.Period_4G : l.Period_4S;
        case "s5":
            return this.isTableTennisOrBadmintion(t) ? l.Period_5G : l.Period_5S;
        case "s6":
            return this.isTableTennisOrBadmintion(t) ? l.Period_6G : l.Period_6S;
        case "s7":
            return this.isTableTennisOrBadmintion(t) ? l.Period_7G : l.Period_7S;
        case "q1":
            return l.Period_1Q;
        case "q2":
            return l.Period_2Q;
        case "q3":
            return l.Period_3Q;
        case "q4":
            return l.Period_4Q;
        case "p1":
            return l.Period_1P;
        case "p2":
            return l.Period_2P;
        case "p3":
            return l.Period_3P;
        case "et":
            return l.tiET;
        case "ht":
            return l.tiHT;
        case "ot":
            return t == 2 ? l.tiOT : l.Period_OT
        }
        switch (n.substr(n.length - 3)) {
        case "1st":
            return l.Period_1H
        }
        switch (n.substr(n.length - 4)) {
        case "f5in":
            return l.Period_1st5Innings;
        case "pens":
            return l.tiPens;
        default:
            return ""
        }
    },
    isTableTennisOrBadmintion: function(n) {
        return n == 20 || n == 9
    },
    getPretermName: function(n, t, i) {
        if (i == 1 && _.contains([0, 3, 5, 6], t))
            switch (n.slice(0, 2)) {
            case "ou":
            case "oe":
                return this.preternFixed(l.PreTern_Goals, !1)
            }
        if (i == 2)
            switch (n.slice(0, 2)) {
            case "ou":
            case "oe":
                return this.preternFixed(l.PreTern_TotalPoints, !1)
            }
        if (i == 3) {
            switch (n) {
            case "ou":
            case "oe":
                return this.preternFixed(l.PreTern_TotalSets, !1)
            }
            switch (n.slice(0, 2)) {
            case "ou":
            case "oe":
                return this.preternFixed(l.PreTern_TotalGames, !1)
            }
        }
        if (_.contains([9, 20], i)) {
            switch (n) {
            case "ou":
            case "oe":
                return this.preternFixed(l.PreTern_TotalGames, !1)
            }
            switch (n.slice(0, 2)) {
            case "ou":
            case "oe":
                return this.preternFixed(l.PreTern_TotalPoints, !1)
            }
        }
        if (_.contains([13, 27], i)) {
            switch (n) {
            case "ou":
            case "oe":
                return this.preternFixed(l.PreTern_TotalSets, !1)
            }
            switch (n.slice(0, 2)) {
            case "ou":
            case "oe":
                return this.preternFixed(l.PreTern_TotalPoints, !1)
            }
        }
        if (_.contains([19, 26], i))
            switch (n.slice(0, 2)) {
            case "ou":
            case "oe":
                return this.preternFixed(l.PreTern_Goals, !0)
            }
        if (i == 21)
            switch (n.slice(0, 2)) {
            case "ah":
                return this.preternFixed(l.PreTern_Frame, !0);
            case "ou":
            case "oe":
                return this.preternFixed(l.PreTern_TotalFrames, !1)
            }
        return ""
    },
    preternFixed: function(n, t) {
        return n != "" ? n + (t ? " " : ": ") : ""
    },
    CustomizedAHLocalization: function(n, t) {
        var i = "Asian Handicap";
        switch (n) {
        case 0:
            i = l.MB_AH2;
            selobj.spt != 1 && (i = CustomizedAHLocalization(selobj.spt, t));
            break;
        case 1:
            i = l.MB_AH2;
            break;
        case 2:
        case 7:
        case 19:
        case 26:
            i = l.MB_HDC;
            break;
        case 3:
            i = t == "ah" ? l.MB_SetHDC : l.MB_GameHDC;
            break;
        case 9:
        case 13:
        case 20:
        case 27:
            i = t == "ah" ? l.MB_SetHDC : l.MB_PointHDC;
            break;
        default:
            i = l.MB_HDC
        }
        return i
    },
    CustomizedOULocalization: function(n, t, i) {
        var r = "Over / Under";
        switch (n) {
        case 0:
            r = i == 3 || i == 5 || i == 6 ? l.MB_GoalsOU : l.MB_OU;
            selobj.spt != 1 && (r = AllMarketPage.CustomizedOULocalization(selobj.spt, t, i));
            break;
        case 1:
        case 19:
        case 26:
            r = l.MB_GoalsOU;
            break;
        case 3:
            r = t == "ou" ? l.MB_SetsOU : l.MB_GamesOU;
            break;
        case 2:
        case 7:
            r = l.MB_PointsOU;
            break;
        case 9:
        case 13:
        case 20:
        case 27:
            r = t == "ou" ? l.MB_SetsOU : l.MB_PointsOU;
            break;
        default:
            r = l.MB_OU
        }
        return r
    },
    CustomizedOELocalization: function(n, t, i) {
        var r = "Odd / Even";
        switch (n) {
        case 0:
            r = i == 3 || i == 5 || i == 6 ? l.MB_GoalsOE : l.MB_OE;
            selobj.spt != 1 && (r = AllMarketPage.CustomizedOELocalization(selobj.spt, t, i));
            break;
        case 1:
        case 19:
        case 26:
            r = l.MB_GoalsOE;
            break;
        case 3:
            r = t == "oe" ? l.MB_SetsOE : l.MB_GamesOE;
            break;
        case 2:
        case 7:
            r = l.MB_PointsOE;
            break;
        case 9:
        case 13:
        case 20:
        case 27:
            r = t == "oe" ? l.MB_SetsOE : l.MB_PointsOE;
            break;
        default:
            r = l.MB_OE
        }
        return r
    },
    isNetSport: function(n) {
        return _.contains([3, 9, 13, 20, 27], +n)
    },
    padZeroLeft: function(n, t) {
        return _.padLeft(n, t, "0")
    }
};
CONSTANTS.ALLMARKETPAGE = {
    HIGHLIGHTODDS: "AM_HIGHLIGHTODDS",
    SWITCHLESSMORE: "AM_SWITCHLESSMORE",
    SWITCHLESSMORE_EPS: "AM_SWITCHLESSMORE_EPS",
    ADDTOMYMARKETS: "AM_ADDTOMYMARKETS",
    REMOVEMYMARKETS: "AM_REMOVEMYMARKETS",
    FILTEREDMARKET: "AM_FILTEREDMARKET",
    SHOWODDSTYPEDDL: "AM_SHOWODDSTYPEDDL",
    SHOWMYMARKETS: "AM_SHOWMYMARKETS",
    CLEARODDSCHANGE: "AM_CLEARODDSCHANGE",
    SHOWHIDEFILTERBTN: "AM_SHOWHIDEFILTERBTN"
};
AMStore = {
    createNew: function() {
        function nt(n, t, i) {
            for (var u = [], e, f, r = 0; r < t * i; r++)
                e = $.grep(n, function(n) {
                    return n[3] == r
                })[0],
                typeof e != "undefined" ? u.push(e) : u.push(["", "", "", r]);
            for (u = u.concat(n.filter(function(n) {
                return n[3] == 999
            })),
            f = u.length,
            r = 1; r < Math.ceil(f / i); r++)
                while (f % i != 0)
                    u.push(["", "", "", "999"]),
                    f++;
            return u
        }
        function tt(n, t) {
            for (var u = [], c = n.filter(function(n) {
                return n[3] != 999
            }), r = [], e = 0, s, f, h, o, i = 0; i < c.length; i++)
                s = c[i],
                f = +s[3] % t,
                _.isArray(r[f]) || (r[f] = []),
                r[f].push(s),
                r[f].length > e && (e = r[f].length);
            if (_.forEach(r, function(n, t) {
                if (typeof n == "undefined" && (r[t] = n = []),
                e > n.length)
                    while (e > n.length)
                        n.push(["", "", "", "999"])
            }),
            t > r.length)
                while (t > r.length) {
                    for (h = [],
                    i = 0; i < e; i++)
                        h.push(["", "", "", "999"]);
                    r.push(h)
                }
            for (_.forEach(_.zip.apply(this, r), function(n) {
                Array.prototype.push.apply(u, n)
            }),
            u = u.concat(n.filter(function(n) {
                return n[3] == 999
            })),
            o = u.length,
            i = 1; i < Math.ceil(o / t); i++)
                while (o % t != 0)
                    u.push(["", "", "", "999"]),
                    o++;
            return u
        }
        function c(n, t) {
            return n[3] - t[3]
        }
        var n = {
            d: {
                c: [{
                    e: [{
                        i: new Array(50)
                    }],
                    n: ""
                }],
                tn: ":"
            },
            ec: 0,
            r: 0,
            t: 0,
            v: 0
        }
          , e = {
            updateEvent: "AM_Update"
        }
          , u = !0
          , k = 0
          , i = []
          , o = []
          , s = !1
          , d = localStorage.getItem("mmt")
          , ot = typeof d == "undefined" ? [] : JSON.parse(d)
          , r = {
            filteredType: "|p|"
        }
          , f = !1
          , v = !1
          , y = {
            Up: [],
            Down: []
        }
          , g = uv.ov
          , p = null ;
        _cTimer = null ;
        window._elapsed = 0;
        var w = 300
          , h = function(n) {
            var p, d, g, w, st, e, rt, ut, b, ft, et, o, y, f, ht, k, v, h, t, r, u, s;
            if (!n.odds || n.odds.length == 0)
                return n.odds;
            p = function(n) {
                return +n[1] != 0
            }
            ;
            d = function(n) {
                return typeof n == "undefined" ? [["", "", ""], ["", "", ""]] : n.length == 1 ? n.concat([["", "", ""]]) : n
            }
            ;
            switch (n.betType.slice(0, 2)) {
            case "ah":
            case "ou":
                return g = _.chain(n.odds).chunk(8).map(function(n) {
                    var t = _.chunk(n, 2);
                    return [t[0].concat(t[2]), t[1].concat(t[3])]
                }).flatten().value(),
                (n.sid == 1 || n.sid == 2) && n.ctid == 0 ? _.chunk(g, 12) : _.chunk(g, 2);
            case "oe":
            case "ml":
                return _.chunk(n.odds, 2);
            case "hf":
                var ct = [n.home + " / " + n.home, n.home + " / " + l.Odds_Draw, n.home + " / " + n.away, l.Odds_Draw + " / " + n.home, l.Odds_Draw + " / " + l.Odds_Draw, l.Odds_Draw + " / " + n.away, n.away + " / " + n.home, n.away + " / " + l.Odds_Draw, n.away + " / " + n.away]
                  , lt = _.chain(n.odds).chunk(2).map(function(n, t) {
                    return n.push(ct[t]),
                    n
                }).chunk(3).value()
                  , it = new Array(3);
                for (t = 0; t < it.length; t++)
                    it[t] = _.map(lt, function(n) {
                        return n[t]
                    });
                return it;
            case "cs":
                var at = ["1 - 0", "0 - 1", "2 - 0", "0 - 2", "2 - 1", "1 - 2", "3 - 0", "0 - 3", "3 - 1", "1 - 3", "3 - 2", "2 - 3", "4 - 0", "0 - 4", "4 - 1", "1 - 4", "4 - 2", "2 - 4", "4 - 3", "3 - 4", "0 - 0", "1 - 1", "2 - 2", "3 - 3", "4 - 4", l.Odds_AOS]
                  , vt = ["1 - 0", "0 - 1", "2 - 0", "0 - 2", "2 - 1", "1 - 2", "3 - 0", "0 - 3", "3 - 1", "1 - 3", "3 - 2", "2 - 3", "0 - 0", "1 - 1", "2 - 2", "3 - 3", l.Odds_AOS]
                  , i = _.chain(n.odds).chunk(2).map(function(t, i) {
                    return t[2] = n.betType == "cs" ? at[i] : vt[i],
                    t
                }).chunk(n.betType == "cs" ? 20 : 12).value();
                for (i[0] = _.partition(i[0], function(n, t) {
                    return t % 2 == 0
                }).map(function(t) {
                    return _.chunk(n.isInplay ? _.filter(t, p) : t, 2)
                }),
                i[1] = _.partition(i[1], function(n, t) {
                    return i[1].length - 1 != t
                }).map(function(t) {
                    return n.isInplay ? _.filter(t, p) : t
                }),
                i = _.flatten(i),
                w = [],
                v = Math.max(i[0].length, i[1].length, i[2].length),
                t = 0; t < v; t++)
                    i[0][t] = d(i[0][t]),
                    i[1][t] = d(i[1][t]),
                    i[2][t] = typeof i[2][t] == "undefined" ? ["", "", ""] : i[2][t],
                    w.push(i[0][t].concat([i[2][t]]).concat(i[1][t]));
                return w.push(i[3][0] === undefined || parseFloat(i[3][0][1]) == 0 ? ["", "", ""] : i[3][0]),
                w;
            case "sb":
                if (st = ["2 - 0", "0 - 2", "2 - 1", "1 - 2", "3 - 0", "0 - 3", "3 - 1", "1 - 3", "3 - 2", "2 - 3", "4 - 0", "0 - 4", "4 - 1", "1 - 4", "4 - 2", "2 - 4", "4 - 3", "3 - 4"],
                e = _.chain(n.odds).chunk(2).map(function(n, t) {
                    return n[2] = st[t],
                    n
                }).value(),
                _.indexOf(["", "0", 0], n.bestOf) == -1) {
                    f = [];
                    rt = [];
                    switch (+n.bestOf) {
                    case 3:
                        f = _.slice(e, 0, 4);
                        break;
                    case 5:
                        f = _.slice(e, 4, 10);
                        break;
                    case 7:
                        f = _.slice(e, 10, e.length)
                    }
                    rt = _.remove(f, function(n, t) {
                        return t % 2 == 1
                    });
                    e = f.concat(rt)
                } else
                    e = _.chunk(e, 2);
                return e;
            case "tg":
                var yt = [l.odds_TG01, l.odds_TG23, l.odds_TG46, l.odds_Up7]
                  , pt = [l.odds_TG0, l.odds_TG1, l.odds_TG2, l.odds_TG3UP]
                  , i = _.chunk(n.odds, 2).map(function(t, i) {
                    return t[2] = n.betType == "tg" ? yt[i] : pt[i],
                    t
                });
                for (i = n.isInplay ? _.filter(i, p) : i,
                t = 0; t < 4 - i.length; t++)
                    i.push(["", "", ""]);
                return i
            }
            switch (n.betType.slice(0, 3)) {
            case "1x2":
                return ut = _.chunk(n.odds, 2),
                ut.concat(_.remove(ut, function(n, t) {
                    return t == 1
                }));
            case "tts":
                return b = [[], []],
                b[0] = n.odds[0] && n.odds[0].length > 0 ? _.chunk(n.odds[0], 2) : [[, ], [, ], [, ]],
                b[1] = n.odds[1] && n.odds[1].length > 0 ? _.chunk(n.odds[1], 2) : [[, ], [, ]],
                b;
            case "sco":
                for (ft = _.chunk(n.odds[0], 2).map(function(n) {
                    return n[1] = n[1].split("|"),
                    _.flatten(n)
                }),
                et = _.chunk(n.odds[1], 2).map(function(n) {
                    return n[1] = n[1].split("|"),
                    _.flatten(n)
                }),
                o = _.chain(ft.concat(et)).map(function(n) {
                    return n[1]
                }).uniq().map(function(t) {
                    var r = _.flatten(_.filter(ft, 1, t))
                      , i = _.flatten(_.filter(et, 1, t))
                      , f = _.flatten(_.filter(n.odds[2], 0, t.slice(1)))
                      , e = r.length > 0 ? r[2] : i[2]
                      , u = [[r[0], r[3]], [i[0], i[3]], [f[1], f[2]]];
                    return t == "h1" ? u = [[i[0], i[3]], [i[0], i[3]], [i[0], i[3]]] : t == "a2" && (u = [[r[0], r[3]], [i[0], i[3]], [undefined, undefined]]),
                    {
                        k: t,
                        n: e,
                        o: u,
                        fo: isNaN(r[3]) ? 0 : +r[3]
                    }
                }).value(),
                f = _.result(_.remove(o, "k", "a2"), 0),
                ht = _.result(_.remove(o, "k", "h1"), 0),
                y = _.remove(o, function(n) {
                    if (n.k.slice(0, 1) == "a")
                        return n
                }),
                o = _.sortBy(o, "fo"),
                y = _.sortBy(y, "fo"),
                k = [],
                v = Math.max(o.length, y.length),
                t = 0; t < v; t++)
                    k[t] = [o[t], y[t]];
                return k.push([f, ht]),
                k
            }
            if (h = {
                group1: ["TimeOfFirstGoal_ThreeWay", "ThreeWayHandicap", "DoubleChance"],
                group2: ["WinningMargin", "FT_1X2_And_FT_OU_1p5", "FT_1X2_And_FT_OU_2p5", "FT_1X2_And_FT_OU_3p5", "FT_1X2_And_FT_OU_4p5", "FT_1X2_And_1stTeamToScore", "FT_1X2_And_BothTeamsToScore", "DoubleChance_And_FT_OU_1p5", "DoubleChance_And_FT_OU_2p5", "DoubleChance_And_FT_OU_3p5", "DoubleChance_And_FT_OU_4p5", "DoubleChance_And_BothTeamsToScore", "DoubleChance_And_1stTeamToScore"],
                group3: ["HalfWithMostGoals_1X2", "FirstGoalMethod"],
                group4: ["FT_OU_1p5_And_1stTeamToScore", "FT_OU_2p5_And_1stTeamToScore", "FT_OU_3p5_And_1stTeamToScore", "FT_OU_4p5_And_1stTeamToScore"],
                group5: ["FT_OU_1p5_And_BothTeamsToScore", "FT_OU_2p5_And_BothTeamsToScore", "FT_OU_3p5_And_BothTeamsToScore", "FT_OU_4p5_And_BothTeamsToScore", "FT_OU_1p5_And_FT_OE", "FT_OU_2p5_And_FT_OE", "FT_OU_3p5_And_FT_OE", "FT_OU_4p5_And_FT_OE", "WinningMethod", "QualifyingMethod"],
                group6: ["_1stGoal", "_2ndGoal", "_3rdGoal", "_4thGoal", "_5thGoal", "_6thGoal", "_7thGoal", "_8thGoal", "_9thGoal", "_10thGoal", "_11thGoal", "_12thGoal", "_13thGoal", "_14thGoal", "_15thGoal"]
            },
            n.betType == "spwos") {
                if (_.indexOf(h.group1, n.mn) != -1) {
                    if (r = 1,
                    u = n.odds.length,
                    n.odds.length % r != 0)
                        for (t = 0; t < r - u % r; t++)
                            n.odds.push(["", "", ""]);
                    return _.chain(n.odds).map(function(n) {
                        var t = _.pullAt(n, 0);
                        return n.push(t[0]),
                        n
                    }).chunk(r).value()
                }
                if (_.indexOf(h.group2, n.mn) != -1)
                    return r = 3,
                    u = n.odds.length,
                    n.odds.sort(c),
                    _.chain(tt(n.odds, r)).map(function(n) {
                        var t = _.pullAt(n, 0)
                          , i = _.pullAt(n, 2);
                        return n.push(t[0]),
                        n.push(i[0]),
                        n
                    }).chunk(r).value();
                if (_.indexOf(h.group3, n.mn) != -1) {
                    if (r = 3,
                    u = n.odds.length,
                    n.odds.length % r != 0)
                        for (t = 0; t < r - u % r; t++)
                            n.odds.push(["", "", ""]);
                    return _.chain(n.odds).map(function(n) {
                        var t = _.pullAt(n, 0);
                        return n.push(t[0]),
                        n
                    }).chunk(r).value()
                }
                if (_.indexOf(h.group4, n.mn) != -1)
                    return r = 2,
                    u = n.odds.length,
                    n.odds.sort(c),
                    _.chain(tt(n.odds, r)).map(function(n) {
                        var t = _.pullAt(n, 0)
                          , i = _.pullAt(n, 2);
                        return n.push(t[0]),
                        n.push(i[0]),
                        n
                    }).chunk(r).value();
                if (_.indexOf(h.group5, n.mn) != -1) {
                    r = 4;
                    u = n.odds.length;
                    n.odds.sort(c);
                    var a = n.odds.filter(function(n) {
                        return n[3] != 999
                    })
                      , ot = a.length ? Math.ceil(a[a.length - 1][3] / r) : 1
                      , s = _.chain(nt(n.odds, ot, r)).map(function(n) {
                        var t = _.pullAt(n, 0)
                          , i = _.pullAt(n, 2);
                        return n.push(t[0]),
                        n.push(i[0]),
                        n
                    }).chunk(r).value();
                    return s
                }
                if (_.indexOf(h.group6, n.mn) != -1) {
                    r = 3;
                    u = n.odds.length;
                    n.odds.sort(c);
                    var a = n.odds.filter(function(n) {
                        return n[3] != 999
                    })
                      , ot = a.length ? Math.ceil(a[a.length - 1][3] / r) : 1
                      , s = _.chain(nt(n.odds, ot, r)).map(function(n) {
                        var t = _.pullAt(n, 0)
                          , i = _.pullAt(n, 2);
                        return n.push(t[0]),
                        n.push(i[0]),
                        n
                    }).chunk(r).value();
                    return s
                }
                return n.odds.length % 2 == 1 && n.odds.push(["", "", ""]),
                _.chain(n.odds).map(function(n) {
                    var i = _.pullAt(n, 0), t;
                    return n.push(i[0]),
                    n.length == 5 && (t = [n[2], n[3], n[0], n[1], n[4]],
                    n = t),
                    n
                }).chunk(2).value()
            }
            return n.odds
        }
        ;
        var it = function(n) {
            var u = .1, t;
            if (n.d.c[0].e[0].hide)
                n.d.c[0].e[0].o = [];
            else {
                t = {
                    a: ["tts", "sco"],
                    b: ["1st", "last"],
                    bt: {
                        tts: {
                            f: "",
                            mo: 999,
                            v: [[], []]
                        },
                        sco: {
                            f: "",
                            mo: 999,
                            v: [[], [], []]
                        }
                    }
                };
                _.forEach(t.a, function(i) {
                    _.forEach(t.b, function(r) {
                        typeof n.d.c[0].e[0].o[i + r] != "undefined" && (t.bt[i].f = n.d.c[0].e[0].o[i + r].f,
                        t.bt[i].mo = n.d.c[0].e[0].o[i + r].mo,
                        r == "1st" ? t.bt[i].v[0] = n.d.c[0].e[0].o[i + r].v : t.bt[i].v[1] = n.d.c[0].e[0].o[i + r].v,
                        delete n.d.c[0].e[0].o[i + r])
                    })
                });
                t.bt.tts.f != "" && (n.d.c[0].e[0].o.tts = t.bt.tts);
                t.ags = _.remove(n.d.c[0].e[0]["n-o"], "mn", "AnytimeGoalScorer");
                t.bt.sco.f != "" && (n.d.c[0].e[0].o.sco = t.bt.sco,
                n.d.c[0].e[0].o.sco.v[2] = typeof t.ags[0] != "undefined" ? t.ags[0].o : []);
                t = {};
                var r = n.d.k
                  , s = n.d.c[0].e[0].cei.ctid
                  , f = n.d.c[0].e[0].k
                  , i = n.d.tn.split(":")[1] == "inplay"
                  , o = n.d.c[0].e[0].i[37]
                  , e = n.d.c[0].e[0].o.eps;
                e && (e = $.extend(e, {
                    mt: "eps",
                    k: f
                }),
                _.forEach(e.o, function(n) {
                    n = $.extend(n, [n[1], n[2], n[0]])
                }),
                n.d.c[0].e[0].eps = e,
                delete n.d.c[0].e[0].o.eps);
                n.d.c[0].e[0].o = _.chain(n.d.c[0].e[0].o).mapValues(function(t, u) {
                    return $.extend(t, {
                        mt: u,
                        ctid: 0,
                        k: f,
                        v: h({
                            betType: u,
                            odds: t.v,
                            isInplay: i,
                            home: n.d.c[0].e[0].i[0],
                            away: n.d.c[0].e[0].i[1],
                            bestOf: o,
                            sid: r,
                            ctid: s
                        }),
                        mo: a(t, n.d.k, i)
                    }, r == 1 && !i && t.f === undefined ? {
                        f: "|o|"
                    } : {})
                }).values().value();
                _.forEach(n.d.c[0].e[0]["n-o"], function(t) {
                    t = $.extend(t, {
                        mt: "spwos",
                        ctid: s,
                        k: f,
                        v: h({
                            betType: "spwos",
                            odds: t.o,
                            isInplay: i,
                            home: n.d.c[0].e[0].i[0],
                            away: n.d.c[0].e[0].i[1],
                            bestOf: o,
                            sid: r,
                            ctid: s,
                            mn: t.mn
                        })
                    }, r == 1 && !i && t.f === undefined ? {
                        f: "|o|"
                    } : {});
                    t.mo = a(t, n.d.k, i);
                    delete t.o;
                    t.mo == w && (t.mo = (t.mo + u).toFixed(1),
                    u += .1)
                });
                n.d.c[0].e[0].o = n.d.c[0].e[0].o.concat(n.d.c[0].e[0]["n-o"])
            }
            return n.d.c[0].e[0].cel != null && _.forEach(n.d.c[0].e[0].cel, function(t) {
                var c;
                if (!t.hide) {
                    var l = t.cei.n
                      , b = t.i[0]
                      , k = t.i[1]
                      , v = t.k
                      , s = t.cei.ctid
                      , d = ut(s, i)
                      , y = t.i[10]
                      , p = t.i[11]
                      , e = {
                        a: ["tts", "sco"],
                        b: ["1st", "last"],
                        bt: {
                            tts: {
                                f: "",
                                mo: 999,
                                v: [[], []]
                            },
                            sco: {
                                f: "",
                                mo: 999,
                                v: [[], [], []]
                            }
                        }
                    };
                    _.forEach(e.a, function(n) {
                        _.forEach(e.b, function(i) {
                            typeof t.o[n + i] != "undefined" && (e.bt[n].f = t.o[n + i].f,
                            e.bt[n].mo = t.o[n + i].mo,
                            i == "1st" ? e.bt[n].v[0] = t.o[n + i].v : e.bt[n].v[1] = t.o[n + i].v,
                            delete t.o[n + i])
                        })
                    });
                    e.bt.tts.f != "" && (t.o.tts = e.bt.tts);
                    c = _.remove(t["n-o"], "mn", "AnytimeGoalScorer");
                    e.bt.sco.f != "" && (t.o.sco = e.bt.sco,
                    t.o.sco.v[2] = typeof c[0] != "undefined" ? c[0].o : []);
                    delete t.o.eps;
                    t.o = _.chain(t.o).mapValues(function(t, u) {
                        return $.extend(t, {
                            mt: u,
                            cn: l,
                            ch: b,
                            ca: k,
                            ctid: s,
                            k: v,
                            pk: f,
                            v: h({
                                betType: u,
                                odds: t.v,
                                isInplay: i,
                                home: n.d.c[0].e[0].i[0],
                                away: n.d.c[0].e[0].i[1],
                                bestOf: o,
                                sid: r,
                                ctid: s
                            }),
                            mo: a(t, n.d.k, i)
                        }, r == 1 && !i && t.f === undefined ? {
                            f: "|o|"
                        } : {}, {
                            scoh: y,
                            scoa: p
                        })
                    }).values().value();
                    _.forEach(t["n-o"], function(t) {
                        t = $.extend(t, {
                            mt: "spwos",
                            cn: l,
                            ctid: s,
                            k: v,
                            pk: f,
                            v: h({
                                betType: "spwos",
                                odds: t.o,
                                isInplay: i,
                                home: n.d.c[0].e[0].i[0],
                                away: n.d.c[0].e[0].i[1],
                                bestOf: o,
                                sid: r,
                                ctid: s,
                                mn: t.mn
                            })
                        }, r == 1 && !i && t.f === undefined ? {
                            f: "|o|"
                        } : {}, {
                            scoh: y,
                            scoa: p
                        });
                        t.mo = a(t, n.d.k, i);
                        delete t.o;
                        t.mo == w && (t.mo = (t.mo + u).toFixed(1),
                        u += .1)
                    });
                    n.d.c[0].e[0].o = n.d.c[0].e[0].o.concat(t.o, t["n-o"])
                }
            }),
            delete u,
            _.remove(n.d.c[0].e[0].o, function(n) {
                return n == undefined
            }),
            n.d.c[0].e[0].o = _.sortByAll(n.d.c[0].e[0].o, "mo"),
            n.d.c[0].e[0].myo = _.remove(n.d.c[0].e[0].o, function(n) {
                var t = n.mt + "|" + n.ctid + "|" + (typeof n.mn != "undefined" ? n.mn : "");
                return _.indexOf(AMStore.getMyMarketTypes(), t) > -1
            }),
            n
        }
          , rt = [{
            sid: 1,
            ipBT: "1x2",
            nipBT: "1x2"
        }, {
            sid: 6,
            nipBT: "ml"
        }, {
            sid: 11,
            nipBT: "ml"
        }, {
            sid: 14,
            nipBT: "1x2"
        }, {
            sid: 16,
            nipBT: "1x2"
        }, {
            sid: 18,
            ipBT: "ml",
            nipBT: "ml"
        }, {
            sid: 19,
            nipBT: "1x2"
        }, {
            sid: 22,
            nipBT: "ml"
        }, {
            sid: 23,
            ipBT: "ml",
            nipBT: "ml"
        }, {
            sid: 24,
            nipBT: "1x2"
        }, {
            sid: 25,
            ipBT: "ml",
            nipBT: "ml"
        }, {
            sid: 29,
            nipBT: "1x2"
        }, {
            sid: 30,
            nipBT: "ml"
        }, {
            sid: 31,
            nipBT: "ml"
        }, {
            sid: 32,
            nipBT: "ml"
        }, {
            sid: 34,
            nipBT: "ml"
        }]
          , a = function(n, t, i) {
            if (n.mt == "spwos" && n.mo == 999)
                return w;
            if (uv.urView == "EURO") {
                var r = -1;
                if (r = _.findIndex(rt, function(r) {
                    return r.sid == t ? i ? typeof r.ipBT != "undefined" && r.ipBT == n.mt : typeof r.nipBT != "undefined" && r.nipBT == n.mt : !1
                }),
                r != -1)
                    return 0
            }
            return n.mo
        }
          , ut = function(ctid, ip) {
            return _.indexOf(eval("[" + displayCurrentTotalSetting + "]"), ctid) != -1 && ip
        }
          , ft = dispatcher.register(function(e) {
            var c, l, w, h, a;
            switch (e.type) {
            case CONSTANTS.SITEREFRESH:
                et();
                u = e.data.mbd == undefined ? !0 : k != e.data.selobj.evt;
                i = opSetting.GetHighlightIds();
                y = {
                    Up: [],
                    Down: []
                };
                f = !1;
                s = e.data.uvd.showMoreEPS ? e.data.uvd.showMoreEPS : u ? !1 : s;
                k = e.data.selobj.evt;
                e.data.mbd != null && e.data.selobj.evt > 0 && (n = e.data.mbd,
                c = n.d.tn.split(":")[1] == "inplay",
                $("#center-panel")[c ? "removeClass" : "addClass"]("non-inplay"),
                typeof n.d.c[0].e[0].o == "undefined" && (n.d.c[0].e[0].o = {}),
                n = it(e.data.mbd),
                g = uv.ov,
                u && (r.filteredType = c || !c && n.d.k != 1 || n.d.fb.length <= 1 ? "" : "|p|"),
                c && typeof n.d.c[0].e[0].i[5] != "undefined" && n.d.c[0].e[0].i[5] != "" && n.d.k == 1 && (_cTimer = Timer.interval(1, function() {
                    window._elapsed++;
                    t()
                })),
                p = Timer.interval(c ? 30 : 90, function() {
                    cCtrl.loadContent(location.pathname, !1, !1, null , !0)
                }));
                t();
                Timer.after(5, function() {
                    Action.AllMarket.clearOddsChange()
                });
                break;
            case CONSTANTS.CENTERPANEL.HIGHLIGHTODDS:
                i = opSetting.GetHighlightIds();
                t();
                break;
            case CONSTANTS.ALLMARKETPAGE.HIGHLIGHTODDS:
                _.includes(i, e.sid) ? _.pull(i, e.sid) : i.push(e.sid);
                t();
                break;
            case CONSTANTS.CENTERPANEL.REMOVEHIGHLIGHTODDS:
                _.remove(i, function(n) {
                    return _.includes(e.sids, n)
                });
                t();
                break;
            case CONSTANTS.ALLMARKETPAGE.SWITCHLESSMORE:
                _.indexOf(o, e.eid) == -1 ? o.push(e.eid) : _.remove(o, function(n) {
                    return n == e.eid
                });
                t();
                break;
            case CONSTANTS.ALLMARKETPAGE.SWITCHLESSMORE_EPS:
                s = e.isShow;
                t();
                break;
            case CONSTANTS.ALLMARKETPAGE.FILTEREDMARKET:
                r.filteredType != e.fb && (r = $.extend(r, {
                    filteredType: e.fb
                }),
                t());
                break;
            case CONSTANTS.ALLMARKETPAGE.SHOWODDSTYPEDDL:
                f = f ? !1 : !0;
                e.forceShow !== undefined && (f = e.forceShow);
                t();
                break;
            case CONSTANTS.ALLMARKETPAGE.SHOWMYMARKETS:
                v = e.isShow;
                t();
                break;
            case CONSTANTS.ALLMARKETPAGE.ADDTOMYMARKETS:
                AMStore.setMyMarketTypes(e.bt, e.ctid, e.smt, !0);
                l = _.remove(n.d.c[0].e[0].o, function(n) {
                    var t = n.mt + "|" + n.ctid + "|" + (typeof n.mn != "undefined" ? n.mn : "");
                    return _.indexOf(AMStore.getMyMarketTypes(), t) > -1
                });
                n.d.c[0].e[0].myo = n.d.c[0].e[0].myo.concat(l);
                t();
                break;
            case CONSTANTS.ALLMARKETPAGE.REMOVEMYMARKETS:
                AMStore.setMyMarketTypes(e.bt, e.ctid, e.smt, !1);
                l = _.remove(n.d.c[0].e[0].myo, function(n) {
                    var t = n.mt + "|" + n.ctid + "|" + (typeof n.mn != "undefined" ? n.mn : "");
                    return _.indexOf(AMStore.getMyMarketTypes(), t) == -1
                });
                n.d.c[0].e[0].myo.length == 0 && (v = !1);
                n.d.c[0].e[0].o = _.sortBy(n.d.c[0].e[0].o.concat(l), "mo");
                t();
                break;
            case CONSTANTS.ALLMARKETPAGE.CLEARODDSCHANGE:
                y = {
                    Up: [],
                    Down: []
                };
                t();
                break;
            case CONSTANTS.ALLMARKETPAGE.SHOWHIDEFILTERBTN:
                w = $("#fbContainer");
                h = $("#filterbar");
                h[0] !== undefined && ($(".jspPane", "#center-panel").length > 0 && w.css("width", $(".jspPane", "#center-panel").width() - 20 + "px"),
                a = h[0].scrollWidth > h[0].clientWidth,
                h.parent()[a ? "addClass" : "removeClass"]("mg-r-22 mg-l-22").siblings()[a ? "removeClass" : "addClass"]("hidden").end().end().children().first()[a ? "addClass" : "removeClass"]("mg-l-16"),
                h.children('[data-ex="' + r.filteredType + '"]').length == 0 && (r.filteredType = h.children(":first").data("ex"),
                h.children(":first").addClass("actived"),
                t()),
                $("#fg")[h[0].scrollLeft + h[0].clientWidth >= h[0].scrollWidth - 35 ? "addClass" : "removeClass"]("hidden"))
            }
        })
          , t = function() {
            b.trigger("AM_Update")
        }
          , et = function() {
            _cTimer != null && (Timer.remove(_cTimer),
            window._elapsed = 0);
            p != null && Timer.remove(p)
        }
          , b = $({});
        return {
            getAMData: function() {
                return n
            },
            DispatchToken: ft,
            addUpdateListener: function(n, t) {
                var i = t ? e.updateEvent + "." + t : e.updateEvent;
                b.on(i, n)
            },
            removeUpdateListener: function(n) {
                var t = n ? e.updateEvent + "." + n : e.updateEvent;
                b.off(t)
            },
            getHighlightIds: function() {
                return i
            },
            getShowMoreEventIds: function() {
                return o
            },
            getFilterParam: function() {
                return r
            },
            getMyMarketTypes: function() {
                var n = localStorage.getItem("mmt");
                return typeof n != "undefined" && n != null ? JSON.parse(n) : []
            },
            setMyMarketTypes: function(n, t, i, r) {
                var f = n + "|" + t + "|" + i
                  , u = AMStore.getMyMarketTypes();
                r ? u.push(f) : _.remove(u, function(n) {
                    return n == f
                });
                localStorage.setItem("mmt", JSON.stringify(_.uniq(u)))
            },
            chkShowOddsTypeDDL: function() {
                return f
            },
            chkShowMyMarkets: function() {
                return v
            },
            getOddsChange: function() {
                return y
            },
            getClrUDTimer: function() {
                return clrUDTimer
            },
            getOddsType: function() {
                return g
            },
            getElapsed: function() {
                return _elapsed
            },
            getFirstLoad: function() {
                return u
            },
            setFirstLoad: function(n) {
                u = n
            },
            getShowMoreLess_EPS: function() {
                return s
            }
        }
    }
}.createNew();
Action.AllMarket = {
    refresh: function(n) {
        dispatcher.dispatch({
            type: AM_Events.Refresh,
            data: n
        })
    },
    highlightOdds: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.HIGHLIGHTODDS,
            sid: n
        })
    },
    switchLessMore: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.SWITCHLESSMORE,
            eid: n
        })
    },
    switchLessMore_EPS: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.SWITCHLESSMORE_EPS,
            isShow: n
        })
    },
    addToMyMarkets: function(n, t, i) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.ADDTOMYMARKETS,
            bt: n,
            ctid: t,
            smt: i
        })
    },
    removeMyMarkets: function(n, t, i) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.REMOVEMYMARKETS,
            bt: n,
            ctid: t,
            smt: i
        })
    },
    filteredMarket: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.FILTEREDMARKET,
            fb: n
        })
    },
    showHideOddsTypeDDL: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.SHOWODDSTYPEDDL,
            forceShow: n
        })
    },
    showHideMyMarkets: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.SHOWMYMARKETS,
            isShow: n
        })
    },
    clearOddsChange: function() {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.CLEARODDSCHANGE
        })
    },
    showHideFilterMoveBtn: function() {
        dispatcher.dispatch({
            type: CONSTANTS.ALLMARKETPAGE.SHOWHIDEFILTERBTN
        })
    }
};
CONSTANTS.RIGHTPANEL = {
    RESIZE: "RPRESIZE",
    SHOWTV: "SHOWTV",
    HIDETV: "HIDETV",
    ADDSELECTION: "ADDSELECTION",
    UPDATEBETSLIP: "UPDATEBETSLIP",
    REMOVESELECTION: "REMOVESELECTION",
    EDITBETSLIP: "EDITBETSLIP",
    UPDATESTAKE: "UPDATESTAKE",
    UPDATETOWIN: "UPDATETOWIN",
    ADDSTAKE: "ADDSTAKE",
    UPDATECBSTAKE: "UPDATECBSTAKE",
    ADDCBSTAKE: "ADDCBSTAKE",
    SHOWBETCONFIRM: "SHOWBETCONFIRM",
    SHOWPLACEBET: "SHOWPLACEBET",
    UPDATESUMMARY: "UPDATESUMMARY",
    CHANGECOMBOCOLLAPSESTATUS: "CHANGECOMBOCOLLAPSESTATUS",
    ISRETAINSELECTION: "ISRETAINSELECTION",
    TOGGLEMYBET: "TOGGLEMYBET",
    TOGGLELOADING: "TOGGLELOADING",
    SHOWERRORMSG: "RPSHOWERRORMSG",
    COLLAPSEDROW: "COLLAPSEDPARLAYPOPUPROW",
    EXPANDROW: "EXPANDPARLAYPOPUPROW",
    UPDATEMYBET: "UPDATEMYBET",
    TOGGLEUNSETTLED: "TOGGLEUNSETTLED",
    TOGGLESETTLED: "TOGGLESETTLED",
    TOGGLEPARLAYINFO: "MBTOGGLEPARLAYINFO",
    TOGGLEACCEPTBETTERODDS: "TOGGLEACCEPTBETTERODDS",
    SHOWBETCONFIRMATION: "SHOWBETCONFIRMATION",
    TV: {
        MENUBTNSHOWHIDE: "MENUBTNSHOWHIDE",
        TOGGLELOCKBTN: "TOGGLELOCKBTN",
        MENUSHOWHIDE: "MENUSHOWHIDE",
        TOGGLETVMENU: "TOGGLETVMENU",
        LOAD_TV_CONTENT: "LOAD_TV_CONTENT",
        TOGGLE_SPORT_MENU: "TOGGLE_SPORT_MENU",
        HIDE_SPORT_MENU: "HIDE_SPORT_MENU",
        TOGGLE_DATE_MENU: "TOGGLE_DATE_MENU",
        HIDE_DATE_MENU: "HIDE_DATE_MENU",
        SEL_SPORT_FILTER: "SEL_SPORT_FILTER",
        SEL_DATE_FILTER: "SEL_DATE_FILTER",
        PLAY_IGNORE_LOCK: "PLAY_IGNORE_LOCK",
        SEL_EVENT_PLAYED: "SEL_EVENT_PLAYED"
    },
    BANNER: {
        TOGGLE: "TOGGLERPBANNER",
        SETBANNERHEIGHT: "SETRPBANNERHEIGHT"
    }
};
BS_Store = {
    createNew: function() {
        var n = {
            s: [],
            c: [],
            ts: [],
            tc: [],
            cinfo: [],
            islog: uv.login,
            totalBet: 0,
            totalStake: 0,
            totalPay: 0,
            abo: uv.abo,
            sbc: uv.sbc
        }
          , r = {
            PLACEBET: "PLACEBET",
            BETCONFIRM: "BETCONFIRM",
            BETRECEIPT: "BETRECEIPT"
        }
          , it = r.PLACEBET
          , u = {
            updateEvent: "BS_Update"
        }
          , f = {
            single: {
                EUR: [5, 10, 25, 50, 100, 200],
                GBP: [5, 10, 25, 50, 100, 200],
                USD: [5, 10, 25, 50, 100, 200],
                SGD: [5, 10, 25, 50, 100, 200],
                RMB: [25, 50, 100, 250, 500, 1e3],
                HKD: [50, 100, 250, 500, 1e3, 2e3],
                VND: [5e4, 15e4, 3e5, 5e5, 1e6, 25e5],
                IDR: [5e4, 15e4, 3e5, 5e5, 1e6, 25e5],
                MYR: [20, 50, 100, 200, 500, 1e3],
                THB: [150, 300, 500, 1e3, 2e3, 5e3],
                KHR: [2e4, 5e4, 1e5, 2e5, 5e5, 1e6],
                BRL: [10, 25, 50, 100, 250, 500],
                JPY: [500, 1e3, 2500, 5e3, 1e4, 25e3],
                KRW: [5e3, 1e4, 25e3, 5e4, 1e5, 25e4]
            },
            parlay: {
                EUR: [1, 2, 5, 10, 25, 50],
                GBP: [1, 2, 5, 10, 25, 50],
                USD: [1, 2, 5, 10, 25, 50],
                SGD: [1, 2, 5, 10, 25, 50],
                RMB: [5, 10, 25, 50, 100, 200],
                HKD: [10, 20, 50, 100, 200, 400],
                VND: [1e4, 25e3, 5e4, 1e5, 2e5, 5e5],
                IDR: [1e4, 25e3, 5e4, 1e5, 2e5, 5e5],
                MYR: [5, 10, 20, 40, 100, 200],
                THB: [25, 50, 100, 250, 500, 1e3],
                KHR: [4e3, 1e4, 2e4, 4e4, 1e5, 2e5],
                BRL: [2, 4, 10, 20, 50, 100],
                JPY: [100, 200, 500, 1e3, 2e3, 5e3],
                KRW: [1e3, 2e3, 5e3, 1e4, 2e4, 5e4]
            }
        }
          , t = {
            editingId: "",
            isOpenCombo: !1,
            currentMode: r.PLACEBET,
            modes: r,
            showMyBet: !1,
            showLoading: !1,
            retainSelection: !1,
            showLoading: !1,
            needFocus: !1,
            needAcceptChange: !1
        }
          , b = dispatcher.register(function(u) {
            var s, c, o, f;
            switch (u.type) {
            case CONSTANTS.RIGHTPANEL.UPDATEBETSLIP:
                if (n = _.assign({
                    abo: n.abo,
                    sbc: n.sbc
                }, u.BS_Data),
                t.showLoading = !1,
                n != null && n.s != null && n.s.length > 0) {
                    for (u.isRefresh && t.editingId != "" || (t.editingId = n.s[0].sid),
                    s = {},
                    c = [],
                    o = 0; o < n.s.length; o++)
                        f = n.s[o],
                        f.st > 0 ? e(f) : f.st == 0 && (f.st = null ),
                        s.hasOwnProperty(f.eid) ? c.push(f.eid) : s[f.eid] = !1;
                    n.s.length > 1 && (nt(),
                    v());
                    l();
                    a()
                } else
                    t.editingId = "";
                t.isOpenCombo = u.isOpenCombo;
                t.currentMode = u.isRefresh && t.currentMode == r.BETCONFIRM ? r.BETCONFIRM : r.PLACEBET;
                t.needFocus = !u.isRefresh;
                t.needAcceptChange = u.needAcceptChange;
                t.showMyBet = !1;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.EDITBETSLIP:
                t.editingId = u.key;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.UPDATESTAKE:
                h(u.sid, u.value, !0, !1);
                i();
                break;
            case CONSTANTS.RIGHTPANEL.UPDATETOWIN:
                h(u.sid, u.value, !1, !1);
                i();
                break;
            case CONSTANTS.RIGHTPANEL.ADDSTAKE:
                h(u.sid, u.value, !0, !0);
                i();
                break;
            case CONSTANTS.RIGHTPANEL.UPDATECBSTAKE:
                y(u.cid, u.value, !1);
                i();
                break;
            case CONSTANTS.RIGHTPANEL.ADDCBSTAKE:
                y(u.cid, u.value, !0);
                i();
                break;
            case CONSTANTS.RIGHTPANEL.SHOWBETCONFIRM:
                t.currentMode = r.BETCONFIRM;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.SHOWPLACEBET:
                t.currentMode = r.PLACEBET;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.UPDATESUMMARY:
                n = _.assign({
                    abo: n.abo,
                    sbc: n.sbc
                }, u.BS_Data);
                tt();
                t.retainSelection = !1;
                t.currentMode = r.BETRECEIPT;
                t.isOpenCombo = !0;
                t.showLoading = !1;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.CHANGECOMBOCOLLAPSESTATUS:
                t.isOpenCombo = u.isOpenCombo;
                BS.WriteExpandCBCookies(u.isOpenCombo);
                i();
                break;
            case CONSTANTS.RIGHTPANEL.ISRETAINSELECTION:
                t.retainSelection = u.isRetain;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.TOGGLEMYBET:
                t.showMyBet = u.isShowMyBet;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.TOGGLELOADING:
                t.showLoading = u.isLoading;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.TOGGLEACCEPTBETTERODDS:
                n.abo = u.isChecked;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.SHOWBETCONFIRMATION:
                n.sbc = u.isChecked;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.SHOWERRORMSG:
                n.errmsg = u.msg;
                i()
            }
        })
          , i = function() {
            k();
            s.trigger("BS_Update");
            t.needFocus && (t.needFocus = !1)
        }
          , s = $({})
          , k = function() {
            if (t.currentMode != r.PLACEBET) {
                var i = !1;
                n.tc = $.grep(n.c, function(n) {
                    return n.cba != null && n.cba > 0 && n.wid != 1
                }).map(function(n) {
                    return (n.cerr == null || n.cerr == "") && (i = !0),
                    _.assign({}, n)
                });
                n.ts = n.tc.length > 0 ? n.s.map(function(n) {
                    return _.assign({
                        hasSuccessComboBet: i
                    }, n)
                }) : $.grep(n.s, function(n) {
                    return n.st != null && n.st > 0
                }).map(function(n) {
                    return _.assign({}, n)
                })
            } else
                n.ts = n.s.map(function(n) {
                    return _.assign({}, n)
                }),
                n.tc = n.c.map(function(n) {
                    return _.assign({}, n)
                });
            n.canNotParlay && n.canNotParlay.length > 0 && _.forEach(n.ts, function(t) {
                _.includes(n.canNotParlay, "" + t.peid) && (t.ap = !1)
            })
        }
          , h = function(t, i, r, u) {
            for (var h = c(i), y = p(i), o = isNaN(parseFloat(y)) ? null : parseFloat(y), w = ("" + y).length != ("" + o).length, f, s = 0; s < n.s.length; s++)
                if (f = n.s[s],
                f.sid == t) {
                    r ? (f.st = u ? f.st == null ? o : parseFloat(f.st) + o : o,
                    e(f),
                    w && (f.st = f.st == null ? h : ("" + f.st).split(".")[0] + h)) : (f.towin = o,
                    d(f),
                    f.towin != null && w && (f.towin += h));
                    break
                }
            n.c[0] && (n.c[0].cba = null ,
            v());
            l();
            a()
        }
          , y = function(t, i, r) {
            for (var s = c(i), o = p(i), f = isNaN(parseFloat(o)) ? null : parseFloat(o), h = ("" + o).length != ("" + f).length, u, e = 0; e < n.c.length; e++)
                if (u = n.c[e],
                u.wid == t) {
                    u.cba = r ? u.cba == null ? f : parseFloat(u.cba) + f : f;
                    w(u);
                    h && (u.cba = u.cba == null ? s : ("" + u.cba).split(".")[0] + s);
                    break
                }
            l();
            t == 1 && a();
            v()
        }
          , rt = function(n) {
            return /\.$/.test(n)
        }
          , c = function(n) {
            var t = /(\.\d{0,2})\d?$/.exec(n);
            return t == null ? null : t[1]
        }
          , p = function(n) {
            var i = c(n), t = n, r;
            return i != null && (r = t.split(".")[0] == "" ? "0" : t.split(".")[0],
            t = r + i),
            t
        }
          , e = function(n) {
            var i = n.st == null ? 0 : n.st
              , r = n.bs.bmax
              , t = n.o
              , u = n.bo;
            i > 0 && t !== 0 ? i > r ? (n.st = r,
            n.towin = o(r, t, u)) : n.towin = o(i, t, u) : (t === 0 && (n.st = null ),
            n.st == 0 ? n.towin = 0 : n.st == null && (n.towin = null ))
        }
          , d = function(n) {
            var r = n.towin == null ? 0 : n.towin
              , i = n.bs.bmax
              , t = n.o
              , u = n.bo;
            r > 0 && t !== 0 ? (n.st = g(r, t, u),
            n.st > i && (n.st = i,
            n.towin = o(i, t, u))) : (t === 0 && (n.st = null ,
            n.towin = null ),
            n.towin == 0 ? n.st = 0 : n.towin == null && (n.st = null ))
        }
          , w = function(t) {
            var u = t.cba == null ? 0 : t.cba, s = t.cbs.bmax, f = t.co, h = t.bc, o, i, r;
            if (t.wid == 1)
                if (u > 0 && f !== "0") {
                    for (o = 0,
                    i = 0; i < n.s.length; i++)
                        r = n.s[i],
                        r.st = u,
                        e(r),
                        o += r.towin;
                    t.payout = o
                } else {
                    for (i = 0; i < n.s.length; i++)
                        r = n.s[i],
                        r.st = null ,
                        e(r);
                    t.payout = null
                }
            else
                u > 0 && f !== "0" ? (u > s && (t.cba = s),
                t.payout = t.cba * f - t.cba * h) : (f === "0" && (t.cba = null ),
                t.payout = null )
        }
          , o = function(t, i, r) {
            var f = 0
              , u = n.ot;
            return r == 1 && (u = 1),
            f = u == 1 ? t * (i - 1) : u == 2 ? t * i : i < 0 ? t : t * i,
            Math.abs(Math.round(f * 100) / 100)
        }
          , g = function(t, i, r) {
            var f = 0
              , u = n.ot;
            return r == 1 && (u = 1),
            f = u == 1 ? t / (i - 1) : u == 2 ? t / i : i < 0 ? t : t / i,
            Math.abs(Math.round(f * 100) / 100)
        }
          , nt = function() {
            var s, c, i, l, t, v, f, b, y, u, r;
            if (n.s[0] != null ) {
                var o = []
                  , k = 0
                  , d = []
                  , h = []
                  , nt = 0;
                for (t = 0,
                s = n.s.length; t < s; t++)
                    if (i = n.s[t],
                    i.ip != "true" && i.ap != !1 && i.rsl != 8888) {
                        for (u = 0; u < h.length; u++)
                            h[u] == i.eid && (d[nt++] = i.eid);
                        h[h.length] = i.eid
                    }
                for (c = d.unique(),
                t = 0; t < n.s.length; t++)
                    if (i = n.s[t],
                    i.ip != "true" && i.ap != !1 && i.rsl != 8888)
                        if (c.length > 0)
                            for (l = 0; l < c.length; l++)
                                c[l] != i.eid && (o[k++] = parseFloat(i.eo));
                        else
                            o[k++] = parseFloat(i.eo);
                var e = o.length
                  , tt = new Array(e)
                  , a = new Array(e);
                for (t = 0; t < e; t++)
                    a[t] = o[t];
                var s = 2
                  , g = 0
                  , p = {};
                for (t = 1; t < e; t++) {
                    for (v = 0,
                    f = e - 1; f >= t; f--) {
                        for (b = 0,
                        y = f - 1; y >= t - 1; y--)
                            b += a[y];
                        a[f] = o[f] * b;
                        v += a[f]
                    }
                    g += v;
                    p[s] = v;
                    s++
                }
                for (t > 2 && (p[BS.Utility.FullCoverWager(e)] = g),
                u = 0; u < n.c.length; u++)
                    r = n.c[u],
                    r != null && (r.co = p[r.wid],
                    r.cba = r.cba > 0 ? r.cba : null ,
                    r.cba == null ? r.payout = null : w(r))
            }
        }
          , l = function() {
            for (var h = 0, c = 0, l = 0, a = 0, u = 0, v = 0, o, f, r, i, e, y, s, t = 0; t < n.s.length; t++)
                o = n.s[t],
                f = o.st,
                f != null && f > 0 && (h++,
                l += f,
                u += o.towin);
            for (t = 1; t < n.c.length; t++)
                r = n.c[t],
                i = r.cba,
                i != null && i > 0 && (e = r.bc,
                y = r.co == null ? "" : r.co,
                c += e,
                a += i * e,
                v += i * y - i * e);
            n.s.length > 1 && (s = n.c[0],
            s.payout = null ,
            u > 0 && (s.payout = u));
            n.totalBet = h + c;
            n.totalStake = l + a;
            n.totalPay = u + v
        }
          , tt = function() {
            var u = 0, f = 0, e = 0, t, s, i, r;
            if (n.s[0] != null )
                for (i = 0; i < n.s.length; i++)
                    t = n.s[i],
                    t.st > 0 && (s = o(t.st, t.o, t.bo),
                    t.rsl == 9999 && (u++,
                    f += t.st,
                    e += s),
                    t.towin = s,
                    t.st = t.st);
            if (n.c[0] != null )
                for (i = 1; i < n.c.length; i++)
                    r = n.c[i],
                    r.cba > 0 && r.rsl == 9999 && (u += r.bc,
                    f += r.cba * r.bc,
                    e += r.payout);
            n.totalBet = u;
            n.totalStake = f;
            n.totalPay = e
        }
          , a = function() {
            for (var t = "", r, i = 0; i < n.s.length; i++)
                r = n.s[i],
                t += (r.st != null ? r.st : 0) + BS.SEPARATOR;
            t = t.slice(0, -1);
            BS.WriteSStakeCookies(t)
        }
          , v = function() {
            for (var t = "", r, i = 0; i < n.c.length; i++)
                r = n.c[i],
                t += (r.cba != null ? r.cba : 0) + BS.SEPARATOR;
            t = t.slice(0, -1);
            BS.WriteCBStakeCookies(t)
        }
        ;
        return {
            getData: function() {
                return _.assign({}, n)
            },
            getQuickStake: function(n, t) {
                var i = n ? f.single[t] : f.parlay[t];
                return i == null ? n ? f.single.EUR : f.parlay.EUR : i
            },
            DispatchToken: b,
            addUpdateListener: function(n, t) {
                var i = t ? u.updateEvent + "." + t : u.updateEvent;
                s.on(i, n)
            },
            removeUpdateListener: function(n) {
                var t = n ? u.updateEvent + "." + n : u.updateEvent;
                s.off(t)
            },
            getExtraData: function() {
                return _.assign({}, t)
            },
            isRetainSelection: function() {
                return t.retainSelection
            },
            showMyBet: function() {
                return t.showMyBet
            },
            currentMode: function() {
                return t.currentMode
            },
            showBetConfirmation: function() {
                return n.sbc
            },
            modes: r
        }
    }
}.createNew();
Action.RightPanel = {
    resize: function(n) {
        UI.RPRESIZE(n)
    },
    addSelection: function(n, t, i, r, u, f, e) {
        BS.AddSelection(n, t, i, r, u, f, e == null || e == 0 ? t : e)
    },
    updateBetSlip: function(n, t, i) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATEBETSLIP,
            BS_Data: n,
            isOpenCombo: BS.bsCookie.getCookieValue(BS.expandCBCookies) == "true" ? !0 : !1,
            isRefresh: t,
            needAcceptChange: i
        })
    },
    removeSelection: function(n) {
        BS.RemoveSelection(n)
    },
    editBetSlip: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.EDITBETSLIP,
            key: n
        })
    },
    updateStake: function(n, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATESTAKE,
            sid: n,
            value: t
        })
    },
    updateToWin: function(n, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATETOWIN,
            sid: n,
            value: t
        })
    },
    addStake: function(n, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.ADDSTAKE,
            sid: n,
            value: t
        })
    },
    updateComboStake: function(n, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATECBSTAKE,
            cid: n,
            value: t
        })
    },
    addComboStake: function(n, t) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.ADDCBSTAKE,
            cid: n,
            value: t
        })
    },
    emptyBetslip: function() {
        BS.EmptyBetSlip()
    },
    verifyBetSlip: function() {
        showBetConfirm()
    },
    showBetConfirm: function() {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.SHOWBETCONFIRM
        })
    },
    showPlacebet: function() {
        BS.BetConfirmToPlaceBet();
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.SHOWPLACEBET
        })
    },
    placebetToBetConfirm: function() {
        BS.PlacebetToBetConfirm()
    },
    betConfirmToBetReceipt: function() {
        BS.BetConfirmToBetReceipt()
    },
    betReceiptToPlacebet: function() {
        BS.BetReceiptToPlacebet()
    },
    placebetToBetReceipt: function() {
        BS.PlacebetToBetReceipt()
    },
    updateSummary: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATESUMMARY,
            BS_Data: n
        })
    },
    changeComboCollapseStatus: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.CHANGECOMBOCOLLAPSESTATUS,
            isOpenCombo: n
        })
    },
    isRetainSelection: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.ISRETAINSELECTION,
            isRetain: n
        })
    },
    toggleMyBet: function(n) {
        BS.toggleRefreshTimer(!n);
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLEMYBET,
            isShowMyBet: n
        })
    },
    toggleLoading: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLELOADING,
            isLoading: n
        })
    },
    updateAcceptBetterOdds: function(n) {
        BS.UpdateAcceptBetterOdds(n)
    },
    updateShowBetConfirmation: function(n) {
        BS.UpdateShowBetConfirmation(n)
    },
    toggleAcceptBetterOdds: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLEACCEPTBETTERODDS,
            isChecked: n
        })
    },
    toggleShowBetConfirmation: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.SHOWBETCONFIRMATION,
            isChecked: n
        })
    },
    closePopUpWindow: function() {
        BS.ClosePopUpWindow()
    },
    showErrorMsg: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.SHOWERRORMSG,
            msg: n
        })
    },
    updateMyBet: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.UPDATEMYBET,
            data: n
        })
    },
    toggleUnsettled: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLEUNSETTLED,
            isOpen: n
        })
    },
    toggleSettled: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLESETTLED,
            isOpen: n
        })
    },
    refreshMyBet: function(n) {
        MB.refreshMyBet(n)
    },
    toggleParlayInfo: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.TOGGLEPARLAYINFO,
            betId: n
        })
    },
    collapsedRow: function() {
        console.log("collapsedRow");
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.COLLAPSEDROW
        })
    },
    expandRow: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.RIGHTPANEL.EXPANDROW,
            index: n
        })
    },
    resizeFrame: function() {
        var n = Math.max($("#lt-right").height(), $("#lt-right .betbox").height());
        pm.resizeFrame(n)
    },
    resetBetSlip: function() {
        pm.resetBetSlip()
    },
    TV: {
        showMenuBtn: function() {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.MENUBTNSHOWHIDE,
                isDisplay: !0
            })
        },
        hideMenuBtn: function() {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.MENUBTNSHOWHIDE,
                isDisplay: !1
            })
        },
        toggleLockBtn: function(n, t) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.TOGGLELOCKBTN,
                islock: n,
                isSaveCookie: t
            })
        },
        toggleTvMenu: function(n) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.TOGGLETVMENU,
                isDisplay: n
            });
            n && liveCentreControl.loadEvent()
        },
        toggleSportMenu: function() {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.TOGGLE_SPORT_MENU
            })
        },
        toggleDateMenu: function() {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.TOGGLE_DATE_MENU
            })
        },
        hideSportMenu: function() {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.HIDE_SPORT_MENU
            })
        },
        hideDateMenu: function() {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.HIDE_DATE_MENU
            })
        },
        tvDataLoaded: function(n) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.LOAD_TV_CONTENT,
                lsData: n
            })
        },
        selSportFilter: function(n) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.SEL_SPORT_FILTER,
                sport: n
            })
        },
        selDateFilter: function(n) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.SEL_DATE_FILTER,
                date: n
            })
        },
        playTvDefault: function(n) {
            liveCentreControl.playDefault(n)
        },
        resetToDefault: function() {
            liveCentreControl.resetToDefault()
        },
        playTvIgnoreLock: function(n, t, i, r, u, f, e) {
            liveCentreControl.playIgnoreLock(n, t, i, r, u, f, e)
        },
        setPlayEventId: function(n) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.TV.SEL_EVENT_PLAYED,
                eid: n
            })
        }
    },
    Banner: {
        show: function() {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.BANNER.TOGGLE,
                isDisplay: !0
            })
        },
        hide: function() {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.BANNER.TOGGLE,
                isDisplay: !1
            })
        },
        setBannerHeight: function(n) {
            dispatcher.dispatch({
                type: CONSTANTS.RIGHTPANEL.BANNER.SETBANNERHEIGHT,
                h: n
            })
        }
    },
    initBSEvent: function() {
        BS.on(BS.Events.ExceedMaxiumSelections, "betslip", function() {
            Action.RightPanel.showErrorMsg(l.BS_Maximum_Selection)
        });
        BS.on(BS.Events.RemoveHighlightOdds, "centerPanel", function(n, t) {
            Action.CenterPanel.removeHighlightOdds(t)
        });
        BS.on(BS.Events.HighlightOdds, "centerPanel", function(n, t) {
            Action.CenterPanel.HighlightOdds(t)
        });
        BS.on(BS.Events.UpdateBetslip, "betslip", function(n, t, i, r) {
            Action.RightPanel.updateBetSlip(t, i, r)
        });
        BS.on(BS.Events.UpdateSummary, "betslip", function(n, t) {
            Action.RightPanel.updateSummary(t)
        });
        BS.on(BS.Events.Processing, "betslip", function() {
            Action.RightPanel.toggleLoading(!0)
        });
        BS.on(BS.Events.Completed, "betslip", function() {
            Action.RightPanel.toggleLoading(!1)
        });
        BS.on(BS.Events.ToggleAcceptBetterOdds, "betslip", function(n, t) {
            Action.RightPanel.toggleAcceptBetterOdds(t)
        });
        BS.on(BS.Events.ToggleShowBetConfirmation, "betslip", function(n, t) {
            Action.RightPanel.toggleShowBetConfirmation(t)
        });
        BS.on(BS.Events.ShowBetConfirm, "betslip", function() {
            Action.RightPanel.showBetConfirm()
        });
        BS.on(BS.Events.RefreshBalance, "betslip", function() {
            try {
                pm.refreshBalance()
            } catch (n) {
                console.log("ERROR: pm.refreshBalance() - " + n.message)
            }
        });
        BS.on(BS.Events.DisplayMessage, "betslip", function(n, t, i) {
            try {
                pm.showParentAlert(t, i)
            } catch (n) {
                console.log("ERROR: pm.showParentAlert() - " + n.message)
            }
        })
    },
    initMBEvent: function() {
        MB.on(MB.Events.Refresh, "mybet", function(n, t, i) {
            Action.RightPanel.updateMyBet(t);
            i && Action.RightPanel.toggleMyBet(!0)
        })
    }
};
MB = {
    _eventInstance: $({}),
    Events: {
        Refresh: "MBRefresh"
    },
    fire: function(n, t) {
        MB._eventInstance.trigger(n, t)
    },
    on: function(n, t, i) {
        if (n && n != "") {
            var r = t ? n + "." + t : n;
            MB._eventInstance.on(r, i)
        }
    }
};
MB.refreshMyBet = function(n) {
    utility.service("MyBetService", "GetMyBet", null , "GET", function(t) {
        t != null && t.isAuth != null && t.isAuth == !1 ? document.location.reload() : MB.fire(MB.Events.Refresh, [t, n])
    })
}
;
MB.Init = function() {
    uv.login && MB.refreshMyBet()
}
;
var MB_Store = {
    createNew: function() {
        var u = {
            aul: [],
            ipul: [],
            sl: [],
            uc: 0,
            sc: 0
        }
          , n = {
            updateEvent: "MB_Update"
        }
          , t = {
            isOpenUnsettled: !0,
            isOpenSettled: !1,
            showParlayInfo: null
        }
          , f = dispatcher.register(function(n) {
            switch (n.type) {
            case CONSTANTS.RIGHTPANEL.UPDATEMYBET:
                u = n.data;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.TOGGLEUNSETTLED:
                t.isOpenUnsettled = n.isOpen;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.TOGGLESETTLED:
                t.isOpenSettled = n.isOpen;
                i();
                break;
            case CONSTANTS.RIGHTPANEL.TOGGLEPARLAYINFO:
                t.showParlayInfo = n.betId;
                i()
            }
        })
          , i = function() {
            r.trigger("MB_Update")
        }
          , r = $({});
        return {
            DispatchToken: f,
            addUpdateListener: function(t, i) {
                var u = i ? n.updateEvent + "." + i : n.updateEvent;
                r.on(u, t)
            },
            removeUpdateListener: function(t) {
                var i = t ? n.updateEvent + "." + t : n.updateEvent;
                r.off(i)
            },
            getData: function() {
                return _.assign({}, u)
            },
            getExtraData: function() {
                return _.assign({}, t)
            }
        }
    }
}.createNew()
  , TVMenu_Store = {
    createNew: function() {
        var i = {
            updateEvent: "TV_Update"
        }, n = {
            showLC: !1,
            i18n: {
                tvMenuTxt: ""
            },
            showMenu: !1,
            lsData: null ,
            showSportSubMenu: !1,
            showDateSubMenu: !1,
            sportFilter: "",
            dateFilter: ""
        }, r, f = dispatcher.register(function(i) {
            switch (i.type) {
            case CONSTANTS.SITEREFRESH:
                (i.data.selobj.tab == undefined || i.data.selobj.tab.toLowerCase() != "inplay") && (r || (r = $("#tvMenu")),
                r.hide());
                n.i18n.tvMenuTxt = ccparam.tvMenuTxt;
                n.i18n.tvGuideTxt = ccparam.tvGuildTxt;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.LOAD_TV_CONTENT:
                n.lsData = i.lsData;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.MENUBTNSHOWHIDE:
                n.showMenuBtn = i.isDisplay;
                n.showLC && t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.MENUSHOWHIDE:
                n.showMenu = i.isDisplay;
                n.showLC && t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.TOGGLETVMENU:
                n.showMenu = i.isDisplay;
                n.showMenu || t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.TOGGLE_SPORT_MENU:
                n.showSportSubMenu = !n.showSportSubMenu;
                n.showDateSubMenu = !1;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.HIDE_SPORT_MENU:
                n.showSportSubMenu = !1;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.TOGGLE_DATE_MENU:
                n.showDateSubMenu = !n.showDateSubMenu;
                n.showSportSubMenu = !1;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.HIDE_DATE_MENU:
                n.showDateSubMenu = !1;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.LOAD_TV_CONTENT:
                n.lsData = i.lsData;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.SEL_SPORT_FILTER:
                n.sportFilter = i.sport;
                n.dateFilter = "";
                n.showSportSubMenu = !n.showSportSubMenu;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.SEL_DATE_FILTER:
                n.dateFilter = i.date;
                n.showDateSubMenu = !n.showDateSubMenu;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.SEL_EVENT_PLAYED:
                n.playEventId = i.eid;
                t()
            }
        }), t = function() {
            u.trigger(i.updateEvent)
        }
        , u = $({});
        return {
            DispatchToken: f,
            addUpdateListener: function(n, t) {
                var r = t ? i.updateEvent + "." + t : i.updateEvent;
                u.on(r, n)
            },
            removeUpdateListener: function(n) {
                var t = n ? i.updateEvent + "." + n : i.updateEvent;
                u.off(t)
            },
            getData: function() {
                return n
            }
        }
    }
}.createNew()
  , LC_Store = {
    createNew: function() {
        var i = {
            updateEvent: "LC_Update"
        }
          , n = {
            showLC: !1,
            showMenuBtn: !0,
            islockBtn: !1,
            i18n: {
                info: "",
                liveCentreTxt: "",
                tvMenuTxt: "",
                tvGuideTxt: ""
            },
            showMenu: !1,
            showSportSubMenu: !1,
            showDateSubMenu: !1,
            sportFilter: "",
            dateFilter: "",
            playEventId: -1
        }
          , u = dispatcher.register(function(i) {
            switch (i.type) {
            case CONSTANTS.SITEREFRESH:
                f(i.data);
                n.i18n.info = ccparam.infoTxt.replace("188", "188BET");
                n.i18n.liveCentreTxt = ccparam.liveCentreTxt;
                n.i18n.tvMenuTxt = ccparam.tvMenuTxt;
                n.i18n.tvGuideTxt = ccparam.tvGuildTxt;
                t();
                i.data.mpc.pv == 2 && e(i.data);
                break;
            case CONSTANTS.RIGHTPANEL.RESIZE:
                i.isLarge ? liveCentreControl.enlarge() : liveCentreControl.shrink();
                break;
            case CONSTANTS.RIGHTPANEL.TV.MENUBTNSHOWHIDE:
                n.showMenuBtn = i.isDisplay;
                n.showLC && t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.MENUSHOWHIDE:
                n.showMenu = i.isDisplay;
                n.showLC && t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.TOGGLELOCKBTN:
                n.islockBtn = i.islock;
                i.isSaveCookie && (n.islockBtn ? cookies.saveLockInfo(ccparam.playingEventId, ccparam.hTeamName, ccparam.aTeamName, ccparam.sportId, ccparam.lang, ccparam.playingLsId, ccparam.videoProvider) : cookies.clearLockInfo());
                n.showLC && t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.TOGGLETVMENU:
                n.showMenu = i.isDisplay;
                n.showMenu || t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.TOGGLE_SPORT_MENU:
                n.showSportSubMenu = !n.showSportSubMenu;
                n.showDateSubMenu = !1;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.HIDE_SPORT_MENU:
                n.showSportSubMenu = !1;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.TOGGLE_DATE_MENU:
                n.showDateSubMenu = !n.showDateSubMenu;
                n.showSportSubMenu = !1;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.HIDE_DATE_MENU:
                n.showDateSubMenu = !1;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.SEL_SPORT_FILTER:
                n.sportFilter = i.sport;
                n.dateFilter = "";
                n.showSportSubMenu = !n.showSportSubMenu;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.SEL_DATE_FILTER:
                n.dateFilter = i.date;
                n.showDateSubMenu = !n.showDateSubMenu;
                t();
                break;
            case CONSTANTS.RIGHTPANEL.TV.SEL_EVENT_PLAYED:
                n.playEventId = i.eid;
                t()
            }
        })
          , f = function(t) {
            if (t.selobj.ifl) {
                var i = t.selobj.dp == 0 ? !0 : !1;
                n.showLC = uv.cdbg && i
            }
        }
          , e = function(n) {
            var t = n.mbd, r, s;
            if (t) {
                if (n.selobj.ip && t) {
                    r = !t.d.c[0].e[0].cei.ctid == 0 ? t.d.c[0].e[0].pk : t.d.c[0].e[0].k;
                    var i = t.d.c[0].e[0].i[7]
                      , f = t.d.c[0].e[0].i[0]
                      , e = t.d.c[0].e[0].i[1]
                      , u = t.d.c[0].e[0].ibs
                      , o = t.d.c[0].e[0].ibsc
                }
                uv.login ? utility.service("LiveTv", "GetLiveEventDetails", {
                    Date: "",
                    SportId: t.d.k,
                    IsCheckUserCanSeeTv: !0
                }, "GET", function(n) {
                    n.stv || (i = "");
                    uv.cdbg && liveCentreControl.clearMbInfo(!0);
                    u && o ? liveCentreControl.saveMbInfo(r, f, e, t.d.k, global.lan, i, t.d.c[0].e[0].pvdr, !0) : u && i != "" ? liveCentreControl.saveMbInfo(r, f, e, t.d.k, global.lan, i, t.d.c[0].e[0].pvdr, !0) : lockInfo.eventId == "" && i != "" && !u
                }) : (uv.cdbg && liveCentreControl.clearMbInfo(!0),
                u && o && liveCentreControl.saveMbInfo(r, f, e, t.d.k, global.lan, i, t.d.c[0].e[0].pvdr, !0));
                uv.cdbg && (s = setInterval(function() {
                    var r, n, t, i;
                    mpc.pv == 2 && (r = !1,
                    n = liveCentreControl.getMbInfo(!0),
                    n ? n.playingEventId && (i = uv.login ? n.playingLsId : "",
                    liveCentreControl.play(n.playingEventId, n.hTeamName, n.aTeamName, n.sportId, i, n.videoProvider, r)) : om.isPlayingCC || (t = liveCentreControl.getMbInfo(!1),
                    t ? (i = uv.login ? t.playingLsId : "",
                    liveCentreControl.play(t.playingEventId, t.hTeamName, t.aTeamName, t.sportId, i, t.videoProvider, r)) : liveCentreControl.showErrorMsg()),
                    clearInterval(s))
                }, 1e3));
                ccparam.checkEventTimer || liveCentreControl.checkPlayingEvent()
            }
        }
          , t = function() {
            r.trigger(i.updateEvent)
        }
          , r = $({});
        return {
            DispatchToken: u,
            addUpdateListener: function(n, t) {
                var u = t ? i.updateEvent + "." + t : i.updateEvent;
                r.on(u, n)
            },
            removeUpdateListener: function(n) {
                var t = n ? i.updateEvent + "." + n : i.updateEvent;
                r.off(t)
            },
            getData: function() {
                return n
            }
        }
    }
}.createNew()
  , RP_Store = {
    createNew: function() {
        var u = function() {
            return document.documentElement.clientHeight - 2
        }
          , n = {
            enlarge: !1,
            showTVOnTop: !1,
            topTVtxt: "",
            h: u,
            w: 257,
            disableScrollbar: /^(IE|MSIE|EDGE)/i.test(UI.browser)
        }
          , t = {
            updateEvent: "RP_Update"
        }
          , e = MB_Store.DispatchToken
          , f = dispatcher.register(function(t) {
            switch (t.type) {
            case CONSTANTS.SITEREFRESH:
                n.showTVOnTop = uv.showls;
                n.topTVtxt = ccparam.tvTxt;
                n.w = n.enlarge ? 437 : 257;
                r();
                break;
            case CONSTANTS.UICHANGE:
                n.enlarge = UI.rightPanelEnlarge = t.data.right.isLarge;
                n.w = n.enlarge ? 437 : 257;
                r()
            }
        })
          , r = function() {
            i.trigger("RP_Update")
        }
          , i = $({});
        return {
            DispatchToken: f,
            addUpdateListener: function(n, r) {
                var u = r ? t.updateEvent + "." + r : t.updateEvent;
                i.on(u, n)
            },
            removeUpdateListener: function(n) {
                var r = n ? t.updateEvent + "." + n : t.updateEvent;
                i.off(r)
            },
            getData: function() {
                return n
            }
        }
    }
}.createNew()
  , PP_Store = {
    createNew: function() {
        var f = function() {
            return document.body.scrollHeight - 2
        }
          , n = {
            info: l.BS_ParlayPopUp,
            parlayPopUpExpandRowIndex: 0,
            h: document.documentElement.clientHeight * .8 + 5 > 600 ? 600 : document.documentElement.clientHeight * .8 + 5,
            w: /^(IE|MSIE|EDGE)/i.test(UI.browser) ? 443 : 448,
            disableScrollbar: /^(IE|MSIE|EDGE)/i.test(UI.browser)
        }
          , t = {
            updateEvent: "PP_Update"
        }
          , u = dispatcher.register(function(t) {
            switch (t.type) {
            case CONSTANTS.RIGHTPANEL.EXPANDROW:
                n.parlayPopUpExpandRowIndex = t.index;
                r();
                break;
            case CONSTANTS.RIGHTPANEL.COLLAPSEDROW:
                n.parlayPopUpExpandRowIndex = null ;
                r();
                break;
            case CONSTANTS.FULLSCREENBLOCK.HIDE:
                n.parlayPopUpExpandRowIndex = 0
            }
        })
          , r = function() {
            i.trigger("PP_Update")
        }
          , i = $({});
        return {
            DispatchToken: u,
            addUpdateListener: function(n, r) {
                var u = r ? t.updateEvent + "." + r : t.updateEvent;
                i.on(u, n)
            },
            removeUpdateListener: function(n) {
                var r = n ? t.updateEvent + "." + n : t.updateEvent;
                i.off(r)
            },
            getData: function() {
                return n.h = document.documentElement.clientHeight * .8 + 5 > 600 ? 600 : document.documentElement.clientHeight * .8 + 5,
                n
            }
        }
    }
}.createNew()
  , RB_Store = {
    createNew: function() {
        var r = function() {
            var n = pm.parentHost();
            return document.domain != "localhost" && n != null && n != "" ? n + "/" + global.lan + "/sports/getbanner?id=sbk-right" : ""
        }
          , n = {
            isDisplay: !0,
            url: r(),
            height: 0
        }
          , t = {
            updateEvent: "RB_Update"
        }
          , f = dispatcher.register(function(t) {
            switch (t.type) {
            case CONSTANTS.RIGHTPANEL.BANNER.TOGGLE:
                n.isDisplay = t.isDisplay;
                n.url = r();
                u();
                break;
            case CONSTANTS.RIGHTPANEL.BANNER.SETBANNERHEIGHT:
                n.height = t.h;
                u()
            }
        })
          , u = function() {
            i.trigger("RB_Update")
        }
          , i = $({});
        return {
            DispatchToken: f,
            addUpdateListener: function(n, r) {
                var u = r ? t.updateEvent + "." + r : t.updateEvent;
                i.on(u, n)
            },
            removeUpdateListener: function(n) {
                var r = n ? t.updateEvent + "." + n : t.updateEvent;
                i.off(r)
            },
            getData: function() {
                return n
            }
        }
    }
}.createNew()
  , ocomp = {
    isAllComp: !1,
    isFirstLoad: !0,
    dateFilter: "",
    defaultDate: "",
    sportName: "",
    setCompFooterTimeout: null ,
    topSectionGroup: {
        1: l.CM_PEM,
        2: l.CM_AAM,
        3: l.CM_NSAM,
        4: l.CM_IM,
        5: l.CM_WC,
        6: l.CM_EC,
        7: l.CM_EM2016M,
        8: l.CM_EM2016OR,
        9: l.CM_CA2016
    },
    Sliderduration: 500,
    currentSliderLeftBetType: 0,
    currentSliderLeftDateType: 0,
    is_rnr: !1,
    tmid: "",
    JsScrollPaneTmID: "",
    renderSelectCompetiton: function(n) {
        utility.template("OddsPage/" + global.lan + ".SelectCompetition.html", function(t) {
            var r = t.process({
                d: n
            }), i;
            isIE8AndBelow ? document.getElementById("comp-div").innerHTML = r : $("#comp-div").html(r);
            i = selobj.cids;
            i != null && ocomp.checkCompetition(i);
            ocomp.isFirstLoad && utility.scrollToTop();
            ocomp.setDateRang();
            ocomp.initComp();
            cCtrl.isProcessing = !1;
            ocomp.expandIfChecked();
            ocomp.showSumitButton()
        }, "SelectCompetition")
    },
    filterCompetition: function() {
        for (var i = window.location.href.split("/"), r = window.location.pathname.toString(), h = !1, e, u, f, t, s, n = 0; n < i.length; n++)
            i[n].indexOf("#") > 0 && (h = !0);
        if (h)
            for (r = "",
            e = !1,
            n = 0; n < i.length; n++)
                e && (i[n].indexOf("?") > 0 && (i[n] = i[n].split("?")[0]),
                r = r + "/" + i[n]),
                i[n].indexOf("#") > 0 && (e = !0);
        u = "";
        selobj.cids != null && selobj.cids != "" && (u = "?competitionids=" + selobj.cids);
        f = u == "" ? "?" : "&";
        ocomp.isAllComp || selobj.btp2 == "outright" || (u = o.param.Tab == "Today" ? u + f + "date=today" : o.param.IsFutureDate ? u + f + "date=future" : u + f + "date=" + ocomp.convertDateFormat(o.param.EventDate, 2));
        selobj.btp != selobj.btp2 ? (t = r.split("/"),
        t[t.length - 1] = selobj.btp2,
        r = t.join("/")) : (t = r.split("/"),
        t[t.length - 1] = "default",
        r = t.join("/"));
        s = r;
        s += u;
        ocomp.isFirstLoad = !1;
        Action.Competition.filterCompetition(s)
    },
    filterAllCompetition: function() {
        utility.service("CentralService", "GetAllCompetitions", {
            SportId: o.param.SportId,
            BetType: selobj.btp2
        }, "GET", function(n) {
            ocomp.isAllComp = !0;
            ocomp.isFirstLoad = !1;
            ocomp.renderSelectCompetiton(n)
        })
    },
    initComp: function() {
        Router.state.competitionDefault ? $("#ShowMenuBtn").addClass("selected") : $("#ShowMenuBtn").removeClass("selected");
        o.mainIntervalId && window.clearInterval(o.mainIntervalId);
        $("#lt-center").find(".cpact").on("click", ocomp.cpact_click);
        if (o.param.Tab == "Inplay" || o.param.IsInplay)
            $("#cpHeaderTxt").text(l.ip.toUpperCase()),
            $("span.cpact.favcp").hide();
        else {
            var n = $("#comp-div").find("span.comp-sportName").eq(0).text();
            n != "" && (ocomp.sportName = n);
            $("#cpHeaderTxt").text(ocomp.sportName.toUpperCase());
            ocomp.initFavComp()
        }
        ocomp.setCompTab();
        ocomp.expandOther(5);
        $(window).resize(function() {
            ocomp.setCompetitionsumitbutton();
            ocomp.setDefaultSlider();
            ocomp.setUIeffectforbettype();
            ocomp.setUIeffectforDate()
        });
        ocomp.setCompetitionsumitbutton();
        ocomp.setDefaultSlider();
        ocomp.setUIeffectforbettype();
        ocomp.setUIeffectforDate();
        ocomp.JsScrollPaneTmID && window.clearInterval(ocomp.JsScrollPaneTmID);
        ocomp.JsScrollPaneTmID = setInterval(function() {
            ScrollerBar.initScrollbarStatus()
        }, 50);
        ScrollerBar.scrollToTop();
        ocomp.isFirstLoad = !0;
        o.param.IsFirstLoad = !1
    },
    setCompetitionsumitbutton: function() {
        var n = $("div.sbmt");
        n.css("left", ocomp.getleftpx(n) + "px");
        ocomp.tmid && window.clearInterval(ocomp.tmid);
        ocomp.tmid = setInterval(function() {
            n.css("left", ocomp.getleftpx(n) + "px")
        }, 600)
    },
    getleftpx: function(n) {
        return UI.isIE ? n.parent().width() / 2 + $("#comp-hidden").offset().left - n.outerWidth() / 2 : n.parent().width() / 2 - n.outerWidth() / 2
    },
    cpact_click: function(n) {
        var t = $(this), y, p, u, r, f, c, d, v, a, s, h, e;
        if (t.hasClass("span-toggle"))
            n.preventDefault(),
            n.stopPropagation(),
            s = t.parent().next(),
            i = s.attr("cg"),
            t = t.add($('.tb[cg="' + i + '"]:hidden').prev().children("span:eq(0)")),
            t.hasClass("expand") ? t.hasClass("lock") || (t.removeClass("expand").addClass("collapsed").addClass("lock"),
            s.hide("blind", function() {
                t.removeClass("lock");
                $("table[cg=" + i + "]").hide()
            })) : t.hasClass("lock") || (t.removeClass("collapsed").addClass("expand").addClass("lock"),
            s.show("blind", function() {
                t.removeClass("lock");
                $("table[cg=" + i + "]").show()
            })),
            ScrollerBar.initScrollbarStatus();
        else if (t.children(".span-toggle").length)
            n.preventDefault(),
            n.stopPropagation(),
            t.children(".span-toggle").click();
        else if (t.hasClass("favcp"))
            y = parseInt(t.attr("c"), 10),
            t.hasClass("actived") ? (t.removeClass("actived"),
            t.attr("title", l.LP_RemoveMyComp)) : (t.addClass("actived"),
            t.attr("title", l.LP_Add2MyComp)),
            Action.LeftPanel.MyCompetition.toggle({
                sid: o.param.SportId,
                sn: ocomp.sportName,
                cid: y,
                cn: t.closest("td").next().find("span").text().trim()
            });
        else if (t.hasClass("group-txt") || t.hasClass("comp-txt"))
            p = t.attr("id").replace("_spn", ""),
            $("#" + p).trigger("click");
        else if (t.hasClass("allSPN"))
            t.prev().trigger("click");
        else if (t.hasClass("cp")) {
            var i = t.attr("cg")
              , w = t.attr("value")
              , b = !0;
            t.hasClass("selected") ? $("span.cpact.cp[value=" + w + "]").removeClass("selected") : $("span.cpact.cp[value=" + w + "]").addClass("selected");
            $("span.cpact.cp[cg=" + i + "]").each(function() {
                $(this).hasClass("selected") || (b = !1)
            });
            b ? $("span.cgCB[cg=" + i + "]").addClass("selected") : $("span.cgCB[cg=" + i + "]").removeClass("selected");
            u = !0;
            $("span.cp.select").each(function() {
                $(this).hasClass("selected") || (u = !1)
            });
            u ? $("span.selall").next().addClass("selected") : $("span.selall").next().removeClass("selected");
            ocomp.showSumitButton();
            ocomp.sethighlighted()
        } else if (t.hasClass("cgCB")) {
            var i = t.attr("cg")
              , r = "selected"
              , f = "selected";
            t.hasClass(r) ? ($("span.cpact.cgCB[cg=" + i + "]").removeClass(r),
            $("span.cpact.cp[cg=" + i + "]").removeClass(f)) : ($("span.cpact.cgCB[cg=" + i + "]").addClass(r),
            $("span.cpact.cp[cg=" + i + "]").addClass(f));
            u = !0;
            $("span.cp.select").each(function() {
                $(this).hasClass(f) || (u = !1)
            });
            u ? $("span.selall").next().addClass(r) : $("span.selall").next().removeClass(r);
            ocomp.showSumitButton();
            ocomp.sethighlighted();
            n.stopPropagation()
        } else if (t.hasClass("allCB"))
            r = "selected",
            f = "selected",
            t.hasClass(r) ? (t.removeClass(r),
            $("span.cgCB").removeClass(r),
            $("span.cp.select").removeClass(f)) : (t.addClass(r),
            $("span.cgCB").addClass(r),
            $("span.cp.select").addClass(f)),
            ocomp.showSumitButton(),
            ocomp.sethighlighted();
        else if (t.hasClass("sbmt")) {
            var g = $("span.cp.select").map(function() {
                if ($(this).hasClass("selected"))
                    return this
            })
              , nt = $("span.allCB").hasClass("selected")
              , k = [];
            g.each(function() {
                k.push($(this).attr("value"))
            });
            c = k.unique().join(",");
            c == "" ? (d = l.SelectCompetition,
            v = l.AtLeast1Competition,
            Control.Dialog ? pm.showParentAlert(d, v) : alert(v)) : (e = ocomp.prepareUrl() + "?competitionids=" + c,
            ocomp.currentSliderLeftBetType = 0,
            ocomp.currentSliderLeftDateType = 0,
            utility.cookie.write(o.Select_All_Comps, nt ? -1 : c.split(",").length),
            Action.Competition.filterCompetition(e))
        } else
            t.hasClass("by-time") ? t.hasClass("selected") || (o.param.UIBetType = "ftahou",
            selobj.btp = "full-time-asian-handicap-and-over-under",
            t.attr("id") == "cpTab_all" ? (ocomp.isAllComp = !0,
            ocomp.isFirstLoad = !1,
            ocomp.filterCompetition()) : t.attr("id") == "cpTab_today" ? (ocomp.isAllComp = !1,
            o.param.IsFutureDate = !1,
            o.param.Tab = "Today",
            ocomp.filterCompetition()) : t.attr("id") == "cpTab_date" && (ocomp.isAllComp = !1,
            t.hasClass("future") && (o.param.IsFutureDate = !0),
            o.param.Tab = "Date",
            o.param.EventDate = ocomp.defaultDate,
            ocomp.filterCompetition())) : t.hasClass("defbtn") ? (a = t.find("span:eq(1)"),
            a.hasClass("selected") ? (Action.Competition.ChangeDefaultButton(!1),
            a.removeClass("selected")) : (Action.Competition.ChangeDefaultButton(!0),
            a.addClass("selected"))) : t.hasClass("tps") ? (s = t.find("span.fts-13"),
            h = s.attr("tg"),
            s.hasClass("bt-cpCount") && (o.param.UIBetType = "ftahou",
            selobj.btp = selobj.btp2 = "full-time-asian-handicap-and-over-under",
            h == "today" ? (ocomp.isAllComp = !1,
            o.param.Tab = "Today",
            e = ocomp.prepareUrl()) : h == "tomorrow" ? (ocomp.isAllComp = !1,
            o.param.Tab = "Date",
            o.param.Tab = "Today",
            e = ocomp.prepareUrl().replace("today", "tomorrow")) : h == "am" ? (ocomp.isAllComp = !0,
            e = ocomp.prepareUrl()) : (ocomp.isAllComp = !0,
            e = ocomp.prepareUrl() + "?competitionids=" + h),
            Action.Competition.filterCompetition(e))) : t.hasClass("filters") ? t.hasClass("filterdate") ? (ocomp.currentSliderLeftBetType = 0,
            ocomp.isAllComp = !1,
            o.param.Tab = "Date",
            o.param.IsFutureDate = !1,
            o.param.EventDate = t.attr("d"),
            t.attr("tag") == "future" && (o.param.IsFutureDate = !0),
            ocomp.filterCompetition()) : t.hasClass("actived") || (t.parent().find("div").removeClass("actived"),
            $("#divdate").hide(),
            t.addClass("actived"),
            selobj.btp2 == "outright" && (selobj.btp2 = "full-time-asian-handicap-and-over-under"),
            selobj.btp2 = selobj.btp,
            ocomp.currentSliderLeftBetType = 0,
            t.attr("id") == "midf" ? (ocomp.isAllComp = !0,
            ocomp.isFirstLoad = !1,
            ocomp.filterCompetition()) : t.attr("id") == "midd" ? ($("#divdate").show(),
            ocomp.currentSliderLeftDateType = 0,
            ocomp.setDefaultSlider(),
            ocomp.CheckArrow($("#DateFilter"))) : t.attr("id") == "midt" ? (ocomp.isAllComp = !1,
            o.param.IsFutureDate = !1,
            o.param.Tab = "Today",
            ocomp.filterCompetition()) : t.attr("id") == "mido" && (selobj.btp2 = "outright",
            ocomp.isAllComp = !1,
            $("#divbt").hide(),
            ocomp.filterCompetition())) : t.hasClass("bf") ? (ocomp.isAllComp = $("#midf").hasClass("actived"),
            selobj.btp2 = t.attr("expr"),
            ocomp.filterCompetition()) : t.hasClass("cmp") && t.closest("tr").find("span.cp.select").click()
    },
    initFavComp: function() {
        var n, t, i;
        if ($("span.cpact.favcp").removeClass("actived").attr("title", l.LP_Add2MyComp),
        n = LPM.mycomps,
        n != null && n != "")
            for (t = 0; t < n.length; t++)
                i = n[t],
                $("span.cpact.favcp[c=" + i + "]").addClass("actived").attr("title", l.LP_RemoveMyComp)
    },
    checkCompetition: function(n) {
        for (var f = n == null ? null : n.split(","), t = "selected", r = "selected", u, i = 0; i < f.length; i++)
            $("span.cp.select").each(function() {
                $(this).attr("value") == f[i] && $(this).addClass(r)
            });
        $("span.cgCB").each(function() {
            var i = $(this).attr("cg")
              , n = !0;
            $("span.cp[cg=" + i + "]").each(function() {
                $(this).hasClass(r) || (n = !1)
            });
            n ? $(this).addClass(t) : $(this).removeClass(t)
        });
        u = !0;
        $("span.cp.select").each(function() {
            $(this).hasClass(r) || (u = !1)
        });
        u ? $("span.selall").next().addClass(t) : $("span.selall").next().removeClass(t);
        ocomp.showSumitButton();
        ocomp.sethighlighted()
    },
    setCompTab: function() {
        var n, i, t;
        ocomp.isAllComp ? selobj.btp2 != "outright" ? $("#midf").addClass("actived") : $("#mido").addClass("actived") : selobj.btp2 != "outright" ? o.param.Tab == "Today" ? $("#midt").addClass("actived") : o.param.Tab == "Date" && o.param.SportId == 1 && ($("#midd").addClass("actived"),
        $("#divdate").show(),
        n = $("#DateFilter div.filterdate"),
        i = ocomp.convertDateFormat(o.param.EventDate, 2),
        n.removeClass("actived"),
        n.each(function() {
            if ($(this).attr("d") == i) {
                $(this).addClass("actived");
                return
            }
        })) : $("#mido").addClass("actived");
        t = $("#BetFilter .bf");
        t.removeClass("actived");
        t.each(function() {
            if ($(this).attr("expr") == selobj.btp2)
                return $(this).addClass("actived"),
                !1
        });
        ocomp.checkBetType();
        ocomp.isFirstLoad = !1;
        ocomp.dateFilter == "Future" && $("#cpTab_date").addClass("future").text(l.D_future)
    },
    convertDateFormat: function(n, t) {
        var r, f = !1, u, e, i, o;
        if (Object.prototype.toString.call(n) === "[object Date]" && (isNaN(n.getTime()) || (r = new Date(n),
        f = !0)),
        !f) {
            if (typeof n != "string")
                return;
            if (u = n.split("/"),
            u.length == 3) {
                e = parseInt(u[2], 10);
                i = -1;
                o = parseInt(u[0], 10);
                switch (u[1].toLowerCase()) {
                case "jan":
                    i = 0;
                    break;
                case "feb":
                    i = 1;
                    break;
                case "mar":
                    i = 2;
                    break;
                case "apr":
                    i = 3;
                    break;
                case "may":
                    i = 4;
                    break;
                case "jun":
                    i = 5;
                    break;
                case "jul":
                    i = 6;
                    break;
                case "aug":
                    i = 7;
                    break;
                case "sep":
                    i = 8;
                    break;
                case "oct":
                    i = 9;
                    break;
                case "nov":
                    i = 10;
                    break;
                case "dec":
                    i = 11;
                    break;
                default:
                    i = -1
                }
            } else
                u = n.split("-"),
                u.length === 3 && (e = parseInt(u[0], 10),
                i = parseInt(u[1], 10) - 1,
                o = parseInt(u[2], 10));
            r = new Date(e,i,o);
            Object.prototype.toString.call(r) === "[object Date]" && (isNaN(r.getTime()) || (f = !0))
        }
        if (f) {
            var h = r.getFullYear()
              , l = r.getMonth() + 1
              , c = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][r.getMonth()]
              , a = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][r.getDay()]
              , s = r.getDate();
            return t == 0 ? ("0" + s).slice(-2) + "/" + c + "/" + h : t == 1 ? a + " - " + ("0" + s).slice(-2) + " " + c : t == 2 ? h + "-" + ("0" + l).slice(-2) + "-" + ("0" + s).slice(-2) : r
        }
        return r
    },
    prepareUrl: function() {
        var r = window.location.toString(), u = r.split("/"), f = u[3], i = o.param.SportId == -1 ? "all" : selobj.sptn, t = "competition", e = selobj.btp2 == null || selobj == "" ? "default" : selobj.btp2, n;
        return o.param.IsInplay || o.param.Tab == "Inplay" ? (t = "in-play",
        n = 0,
        $("input.cpact.cp:checked").each(function() {
            var t = parseInt($(this).attr("cg"), 10);
            return n == 0 && n != t && (n = t),
            n != t ? (n = -1,
            !1) : void 0
        }),
        i = n > 0 ? n.toString() : "all") : ocomp.isAllComp ? t = "competition" : (t = "matches-by-date",
        d = "",
        o.param.IsFutureDate ? d = "future" : (d = o.param.Tab == "Today" ? "today" : o.param.Tab == "Date" ? ocomp.convertDateFormat(o.param.EventDate, 2) : ocomp.convertDateFormat(new Date, 2),
        $("#cpTab_today").hasClass("selected") && (d = "today")),
        t = t + "/" + d,
        o.param.Tab == "Popular" && (t = "popular")),
        "/" + f + "/sports/" + i + "/" + t + "/" + e
    },
    expandOther: function(n) {
        var t = 0, i, r;
        for ($("#comp-div").find(".lowRes span.span-toggle").each(function() {
            $(this).hasClass("expand") && t++
        }); t < n; )
            t++,
            i = $("#comp-div").find(".lowRes span.span-toggle.collapsed").eq(0),
            r = $("#comp-div").find(".highRes span.span-toggle.collapsed").eq(0),
            i.removeClass("collapsed").addClass("expand"),
            r.removeClass("collapsed").addClass("expand"),
            i.parent().next().show(),
            r.parent().next().show();
        ocomp.expandIfChecked()
    },
    expandIfChecked: function() {
        var n = "selected";
        $("span.cgCB").each(function() {
            var t = $(this).parent().next()
              , r = $(t).parent().next()
              , u = $(this).attr("cg")
              , i = !1;
            $("span.cp[cg=" + u + "]").each(function() {
                $(this).hasClass(n) && (i = !0)
            });
            i && ($(t).removeClass("collapse").addClass("expand"),
            $(r).show())
        })
    },
    HeightChanged: function() {
        var n = o.param.IsInplay || o.param.Tab == "Inplay";
        n && oddsPage.initScrollbarStatus()
    },
    setDisplayDate: function(n, t) {
        var i = ocomp.convertDateFormat(n, 1);
        utility.service("CentralService", "GetDisplayDate", {
            d: ocomp.convertDateFormat(n, 2)
        }, "POST", function(n) {
            i = n.d;
            ocomp.dateFilter = i;
            $("#" + t).text(i)
        }, function() {
            ocomp.dateFilter = i;
            $("#" + t).text(i)
        })
    },
    setUIeffectforDate: function() {
        $("#DateFilter").find("div.filterdate").css("position", "relative");
        $("#divdate").find("span.darrow").off("click");
        $("#divdate").find("span.darrow").on("click", ocomp.SliderEvent);
        ocomp.CheckArrow($("#DateFilter"))
    },
    setUIeffectforbettype: function() {
        $("#BetFilter").find("span").css("position", "relative");
        $("#divbt").find("span.barrow").off("click");
        $("#divbt").find("span.barrow").on("click", ocomp.SliderEvent);
        ocomp.CheckArrow($("#BetFilter"))
    },
    setDateRang: function() {
        var i = selobj.dts, r = new StringBuilderEx, u = $("#DateFilter"), n, t;
        if (i) {
            for (n = 1; n < i.length; ++n)
                t = i[n],
                n == 1 && r.appendFormat('<div class="width-35 right-0 height-40 pos-absolute gradientFadeOut-r"><\/div>'),
                r.appendFormat('<div class="dsp-iblk t-va-m lht-1p3 pd-l-10 pd-r-10 filters y-hover cpact filterdate" tag="{0}" d="{1}" >{2}<\/div>', t.Url, t.Date, t.DisplayDate);
            u.html(r.toString())
        }
    },
    setTopSectionData: function(n, t) {
        var r = jQuery.extend({}, n), i = _.filter(r.om, function(n) {
            return n.ec > 0
        }), u = [], f;
        return i && (i = _.sortBy(i, "s"),
        f = {
            cids: "",
            ec: 0,
            gi: 0,
            s: -1
        },
        u = ocomp.rearrangementDataforRow(i, t, f, 1)),
        r.om = u,
        r
    },
    setMidSectionData: function(n, t) {
        var i = jQuery.extend([], n);
        return ocomp.rearrangementDataforRow(i, t, {
            c: "",
            id: -1,
            n: ""
        }, 2)
    },
    rearrangementDataforRow: function(n, t, i, r) {
        var u = []
          , e = []
          , f = 0;
        return t === 2 ? $.each(n, function(t) {
            u[f] = this;
            f++;
            t % 2 == 1 ? (e.push(u),
            u = [],
            f = 0) : t == n.length - 1 && (u[f] = i,
            e.push(u))
        }) : r == 1 ? $.each(n, function(t) {
            t == 0 ? (u[0] = u[1] = i,
            u[2] = this,
            e.push(u),
            u = []) : (u[f] = this,
            f++,
            t % 3 == 0 ? (e.push(u),
            u = [],
            f = 0) : t == n.length - 1 && (u.length == 1 ? u[1] = u[2] = i : u[2] = i,
            e.push(u),
            u = []))
        }) : $.each(n, function(t) {
            u[f] = this;
            f++;
            (t + 1) % 3 == 0 ? (e.push(u),
            u = [],
            f = 0) : t == n.length - 1 && (u.length == 1 ? u[1] = u[2] = i : u[2] = i,
            e.push(u),
            u = [])
        }),
        e
    },
    checkBetType: function() {
        $("#BetFilter").children().length > 1 ? $("#divbt").show() : $("#divbt").hide()
    },
    showSumitButton: function() {
        var t = $("span.cp.select")
          , n = !1;
        t.each(function() {
            $(this).hasClass("selected") && (n = !0)
        });
        n ? $("div.sbmt").removeClass("hidden") : $("div.sbmt").addClass("hidden")
    },
    sethighlighted: function() {
        var n = $("span.cp.select");
        n.each(function() {
            var n = $(this).closest("td").next().children();
            $(this).hasClass("selected") ? (n.removeClass("ft-c-47"),
            n.addClass("ft-c-16")) : (n.addClass("ft-c-47"),
            n.removeClass("ft-c-16"))
        })
    },
    CheckArrow: function(n) {
        var t = n
          , f = t.outerWidth()
          , r = parseInt(t.find("span:eq(0),div.filterdate:eq(0)").css("left"), 10) || 0
          , i = 0
          , u = !1;
        r === 0 || r < 0 && t.parent().children(".float-left").find("span").removeClass("hidden");
        t.children().siblings("span,div.filterdate").each(function(n, t) {
            i += $(t).outerWidth()
        });
        i = i + 12;
        i < f ? (t.parent().children(".float-left").find("span").addClass("hidden"),
        t.parent().children(".float-right").find("span").addClass("hidden"),
        ocomp.currentSliderLeftBetType = 0,
        ocomp.currentSliderLeftDateType = 0,
        ocomp.setDefaultSlider(),
        u = !0) : (t.parent().children(".float-left").find("span").removeClass("hidden"),
        t.parent().children(".float-right").find("span").removeClass("hidden"));
        u ? t.removeClass("withController") : t.addClass("withController")
    },
    setDefaultSlider: function() {
        $("#BetFilter").find("span").css("left", ocomp.currentSliderLeftBetType);
        $("#DateFilter").find("div.filterdate").css("left", ocomp.currentSliderLeftDateType)
    },
    SliderEvent: function() {
        var i = $(this), n = i.parent().parent().children(":last-child"), t, r = n.outerWidth(), u = 0, o = i.hasClass("lb") || i.hasClass("rb"), f = 0, e = !0;
        n.children().siblings("span,div.filterdate").each(function(n, t) {
            u + $(t).outerWidth() + (o ? ocomp.currentSliderLeftBetType : ocomp.currentSliderLeftDateType) < r && e ? u += $(t).outerWidth() : (f += $(t).outerWidth(),
            e = !1)
        });
        r = i.hasClass("ld") || i.hasClass("rd") ? u : u + 30;
        ocomp.is_rnr || (i.hasClass("lb") ? (ocomp.is_rnr = !0,
        t = parseInt(n.children("span:First").css("left"), 10) || 0,
        t = t == "auto" ? 0 : t,
        t != 0 ? (sliderwidth = t + r,
        n.children("span:First").animate({
            left: sliderwidth >= 0 ? 0 : sliderwidth
        }, {
            duration: ocomp.Sliderduration,
            step: function(t) {
                n.children("span:gt(0)").css("left", t)
            },
            complete: function() {
                ocomp.CheckArrow(n);
                ocomp.currentSliderLeftBetType = parseInt(n.children("span:First").css("left"), 10);
                ocomp.is_rnr = !1
            }
        })) : ocomp.is_rnr = !1) : i.hasClass("rb") ? (ocomp.is_rnr = !0,
        t = parseInt(n.children("span:First").css("left"), 10) || 0,
        t = t == "auto" ? 0 : t,
        t == 0 ? n.children("span:First").animate({
            left: t - r
        }, {
            duration: ocomp.Sliderduration,
            step: function(t) {
                n.children("span:gt(0)").css("left", t)
            },
            complete: function() {
                ocomp.CheckArrow(n);
                ocomp.currentSliderLeftBetType = parseInt(n.children("span:First").css("left"), 10);
                ocomp.is_rnr = !1
            }
        }) : ocomp.is_rnr = !1) : i.hasClass("ld") ? (ocomp.is_rnr = !0,
        t = parseInt(n.children("div.filterdate:First").css("left"), 10) || 0,
        t = t == "auto" ? 0 : t,
        t != 0 ? n.children("div.filterdate:First").animate({
            left: r >= 0 ? 0 : r
        }, {
            duration: ocomp.Sliderduration,
            step: function(t) {
                n.children("div.filterdate:gt(0)").css("left", t)
            },
            complete: function() {
                ocomp.CheckArrow(n);
                ocomp.currentSliderLeftDateType = parseInt(n.children("div.filterdate:First").css("left"), 10);
                ocomp.is_rnr = !1
            }
        }) : ocomp.is_rnr = !1) : i.hasClass("rd") && (ocomp.is_rnr = !0,
        t = parseInt(n.children("div.filterdate:First").css("left"), 10) || 0,
        t = t == "auto" ? 0 : t,
        f ? n.children("div.filterdate:First").animate({
            left: -r
        }, {
            duration: ocomp.Sliderduration,
            step: function(t) {
                n.children("div.filterdate:gt(0)").css("left", t)
            },
            complete: function() {
                ocomp.CheckArrow(n);
                ocomp.currentSliderLeftDateType = parseInt(n.children("div.filterdate:First").css("left"), 10);
                ocomp.is_rnr = !1
            }
        }) : ocomp.is_rnr = !1))
    }
}
  , CMStore = {
    createNew: function() {
        var n = {
            updateEvent: "CM_Update"
        }
          , i = dispatcher.register(function(n) {
            switch (n.type) {
            case CONSTANTS.SITEREFRESH:
                if (n.data.mpc.pv == 3) {
                    $("#comp-div").removeClass("hidden");
                    $("#comp-hidden").show();
                    var t = n.data.mod;
                    ocomp.isAllComp = o.param.Tab == "SelectCompetition" ? !0 : !1;
                    ocomp.renderSelectCompetiton(t)
                } else
                    $("#comp-div").addClass("hidden"),
                    $("#comp-hidden").hide(),
                    ocomp.tmid && window.clearInterval(ocomp.tmid);
                break;
            case CONSTANTS.Competiton.filterCompetition:
                cCtrl.loadContent(n.data, !0, !0);
                break;
            case CONSTANTS.LEFTPANEL.MY_COMPETITION.TOGGLE:
                ocomp.initFavComp();
                break;
            case CONSTANTS.UICHANGE:
                ocomp.setUIeffectforbettype();
                ocomp.setUIeffectforDate()
            }
        })
          , r = function() {
            t.trigger("CM_Update")
        }
          , t = $({});
        return {
            DispatchToken: i,
            addUpdateListener: function(i, r) {
                var u = r ? n.updateEvent + "." + r : n.updateEvent;
                t.on(u, i)
            },
            removeUpdateListener: function(i) {
                var r = i ? n.updateEvent + "." + i : n.updateEvent;
                t.off(r)
            }
        }
    }
}.createNew();
CONSTANTS.Competiton = {
    filterCompetition: "filterCompetition",
    ChangeDefaultButton: "ChangeDefaultButton"
};
Action.Competition = {
    filterCompetition: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.Competiton.filterCompetition,
            data: n
        })
    },
    ChangeDefaultButton: function(n) {
        dispatcher.dispatch({
            type: CONSTANTS.Competiton.ChangeDefaultButton,
            data: n
        })
    }
}
