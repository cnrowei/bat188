var ReactScrollBar = {
    css: {
        scrollbar: "scrollBar",
        scrollThumb: "scrollDrag"
    }
}, ScrollBar = React.createClass({
    displayName: "ScrollBar",
    getDefaultProps: function() {
        var n = navigator.platform == "MacIntel"
          , t = /Firefox/.test(navigator.userAgent);
        return {
            nativeScrollbarWidth: 17,
            macOffset: n && !t ? -17 : 0
        };
    },
    getInitialState: function() {
        return {
            enable: !0,
            x: 0,
            y: 0,
            cursorDown: !1,
            prevPageX: 0,
            prevPageY: 0,
            offsetTop: 0,
            offsetLeft: 0,
            hasScroll: !1,
            freeze: !1
        };
    },
    componentDidMount: function() {
        this.props.disable || this.addListener();
        var n = this;
        $(window).resize(function() {
            n.isMounted() && n.forceUpdate();
        });
    },
    componentDidUpdate: function() {
        if (!this.props.disable && isIE9AndBelow) {
            var n = this.refs.boxer.getDOMNode()
              , t = this.refs.wrapper.getDOMNode();
            n.style.overflowX = "";
            setTimeout(function() {
                n.style.overflowX = "hidden";
                t.style.paddingLeft = 10;
            }, 100);
        }
    },
    render: function() {
        var t = React.addons.renderChild(this), n;
        if (this.props.disable)
            return n = {
                overflowY: "scroll",
                width: this.props.w,
                overflowX: "hidden"
            },
            this.props.ieMaxHeight ? n.maxHeight = this.getHeight() : n.height = this.getHeight(),
            React.createElement("div", {
                ref: "content",
                style: n
            }, t);
        var i = {
            maxHeight: this.getHeight(),
            //width: this.props.w + this.props.macOffset + (this.state.hasScroll || !this.props.always ? 0 : this.props.offset || 0),
            width:this.props.w + this.props.macOffset,
            overflowY: "hidden",
            overflowX: "hidden"
        }
          , r = this.props.scrollbarCss || ReactScrollBar.css.scrollbar
          , u = this.props.scrollThumbCss || ReactScrollBar.css.scrollThumb
          , f = _.contains(navigator.userAgent, "Macintosh")
          , t = Array.isArray(this.props.children) ? this.props.children.map(function(n) {
            return React.cloneElement(n);
        }) : React.cloneElement(this.props.children);
        return React.createElement("div", {
            "data-layer": "0",
            ref: "boxer",
            style: {
                overflowX: "hidden"
            }
        }, React.createElement("div", {
            "data-layer": "1",
            className: classNames({
                noscrollappereance: f
            }),
            style: i,
            ref: "wrapper"
        }, React.createElement("div", {
            "data-layer": "2",
            ref: "content"
        }, t, React.createElement("br", {
            style: {
                clear: "both",
                display: "none"
            }
        })), React.createElement("div", {
            "data-layer": "2",
            className: r,
            ref: "scrollbar"
        }, React.createElement("div", {
            className: u,
            style: this.getThumbStyle(),
            ref: "thumb"
        }))));
    },
    update: function() {
        var u;
        if (this.isMounted() && !this.props.disable) {
            var t = this.refs.content.getDOMNode()
              , n = this.refs.scrollbar.getDOMNode()
              , r = this.refs.thumb.getDOMNode()
              , i = this.state.hasScroll;
            if (t.clientHeight == 0 || t.clientHeight <= this.getHeight()) {
                n.style.display = "none";
                this.refs.wrapper.getDOMNode().style.overflowY = "hidden";
                i = !1;
                this.updateScrollStatus(i);
                return;
            }
            i = !0;
            n.style.display = "block";
            u = this.cumulativeOffset(t);
            this.state.offsetTop = u.top;
            this.state.offsetLeft = t.offsetLeft;
            n.style.position = "absolute";
            n.style.height = this.getHeight() + "px";
            n.style.left = this.props.w + this.state.offsetLeft - this.props.nativeScrollbarWidth + "px";
            n.style.top = this.props.top == null ? 0 : this.props.top + "px";
            n.style.zIndex = 99;
            r.style.cursor = "pointer";
            r.style.position = "relative";
            r.style.height = Math.ceil(this.getHeight() / t.clientHeight * 100) + "%";
            this.refs.wrapper.getDOMNode().style.overflowY = "auto";
            this.updateScrollStatus(i);
        }
    },
    updateScrollStatus: function(n) {
        if (n != this.state.hasScroll && this.setState({
            hasScroll: n
        }),
        this.props.onChange)
            this.props.onChange(n);
    },
    getHeight: function() {
        return _.isFunction(this.props.h) ? this.props.h() : this.props.h;
    },
    addListener: function() {
        var n = this.refs.wrapper.getDOMNode()
          , t = this.refs.thumb.getDOMNode()
          , i = this.refs.scrollbar.getDOMNode();
        n.addEventListener("scroll", this.handleScroll);
        i.addEventListener("mousedown", this.handleVerticalTrackMouseDown);
        t.addEventListener("mousedown", this.handleVerticalThumbMouseDown);
        document.addEventListener("mouseup", this.handleDocumentMouseUp);
        window.addEventListener("resize", this.update);
    },
    handleScroll: function() {
        this.setState(this.getPosition());
    },
    getPosition: function() {
        var n = this.refs.wrapper.getDOMNode()
          , t = this.refs.content.getDOMNode();
        return {
            y: n.scrollTop / t.clientHeight,
            x: n.scrollLeft / t.clientWidth
        };
    },
    getThumbStyle: function() {
        return {
            top: Math.floor(this.state.y * 100) + "%"
        };
    },
    handleVerticalTrackMouseDown: function(n) {
        n.stopPropagation();
        var t = this.refs.wrapper.getDOMNode()
          , i = this.refs.content.getDOMNode()
          , r = this.refs.scrollbar.getDOMNode()
          , u = this.refs.thumb.getDOMNode()
          , f = Math.abs(n.target.getBoundingClientRect().top - n.clientY)
          , e = (f - u.offsetHeight / 2) * 100 / r.offsetHeight;
        t.scrollTop = e * i.scrollHeight / 100;
    },
    handleVerticalThumbMouseDown: function(n) {
        n.stopPropagation();
        this.dragStart(n);
        this.state.prevPageY = n.currentTarget.offsetHeight - (n.clientY - n.currentTarget.getBoundingClientRect().top);
    },
    handleDocumentMouseMove: function(n) {
        if ((n.stopPropagation(),
        this.state.cursorDown !== !1) && this.state.prevPageY) {
            var t = this.refs.wrapper.getDOMNode()
              , i = this.refs.scrollbar.getDOMNode()
              , r = this.refs.thumb.getDOMNode()
              , u = this.refs.content.getDOMNode()
              , f = n.clientY - this.state.offsetTop
              , e = r.offsetHeight - this.state.prevPageY
              , o = (f - e) * 100 / i.offsetHeight;
            t.scrollTop = o * u.scrollHeight / 100;
        }
    },
    handleDocumentMouseUp: function() {
        this.dragEnd();
    },
    dragStart: function(n) {
        n.stopPropagation();
        n.stopImmediatePropagation();
        this.state.cursorDown = !0;
        document.addEventListener("mousemove", this.handleDocumentMouseMove);
        document.onselectstart = function() {
            return !1;
        }
        ;
    },
    dragEnd: function() {
        this.state.cursorDown = !1;
        this.state.prevPageX = this.state.prevPageY = 0;
        document.removeEventListener("mousemove", this.handleDocumentMouseMove);
        document.onselectstart = null ;
    },
    scrollToAnchor: function() {
        if (this.isMounted()) {
            var t = this.refs.content.getDOMNode()
              , n = $(t).find("span[data-scrollbaranchor]");
            n.length > 0 && (n = n[0],
            n.scrollIntoView());
        }
    },
    scrollTo: function(n) {
        if (this.isMounted()) {
            var t = this.props.disable ? this.refs.content.getDOMNode() : this.refs.wrapper.getDOMNode();
            t.scrollTop = n;
        }
    },
    freeze: function() {
        this.state.hasScroll && !this.state.disable && (this.refs.wrapper.getDOMNode().style.overflowY = "hidden",
        this.refs.scrollbar.getDOMNode().style.visibility = "hidden",
        this.setState({
            freeze: !0
        }));
    },
    release: function() {
        this.state.hasScroll && !this.props.disable && (this.refs.wrapper.getDOMNode().style.overflowY = "auto",
        this.refs.scrollbar.getDOMNode().style.visibility = "visible",
        this.setState({
            freeze: !1
        }));
    },
    cumulativeOffset: function(n) {
        var t = 0
          , i = 0;
        do
            t += n.offsetTop || 0,
            i += n.offsetLeft || 0,
            n = n.offsetParent;
        while (n);return {
            top: t,
            left: i
        };
    }
}), ScrollBarAnchor = React.createClass({
    displayName: "ScrollBarAnchor",
    render: function() {
        return React.createElement("div", {
            "data-scrollbaranchor": "1",
            style: {
                width: 0,
                height: 0
            }
        });
    }
}), FullScreenBlock = React.createClass({
    displayName: "FullScreenBlock",
    getInitialState: function() {
        return this._getDataFromStore();
    },
    componentDidMount: function() {
        FSB_Store.addUpdateListener(this._onUpdate);
    },
    render: function() {
        return React.createElement("div", {
            className: "fullscreen" + (this.state.isDisplay ? "" : " hidden")
        }, React.createElement("div", {
            id: "container"
        }, this.state.content));
    },
    _getDataFromStore: function() {
        return FSB_Store.getData();
    },
    _onUpdate: function() {
        this.setState(this._getDataFromStore());
    }
}), Popup = React.createClass({
    displayName: "Popup",
    setTimeOutId: null ,
    getInitialState: function() {
        return this._getDataFromStore();
    },
    componentDidMount: function() {
        PopUp_Store.addUpdateListener(this._onUpdate);
    },
    componentDidUpdate: function() {
        this.state.isDisplay && (this.setTimeOutId && clearTimeout(this.setTimeOutId),
        this.setTimeOutId = setTimeout(function() {
            Action.PopUp.hide();
        }, 3e3));
    },
    render: function() {
        var n = this.state.popupType == PopUp_Store.popUpType().MYEVENTS ? l.PopUp_MyEvents : l.MB_MyMarkets;
        return this.state.isDisplay ? React.createElement("div", {
            className: "border_lv3 notification" + (this.state.isAddedMsg ? " added" : " removed")
        }, this.state.isAddedMsg ? React.createElement("div", {
            className: "t-a-c pd-t-12 pd-b-12 bg-c-10 tbr-c-22 ft-c-18 add"
        }, l.PopUp_AddedTo, " ", React.createElement("a", {
            className: "myfav mg-r-10",
            onClick: this._onClick
        }, n), React.createElement("span", {
            className: "icon-addedtomyfav"
        })) : React.createElement("div", {
            className: "t-a-c pd-t-12 pd-b-12 bg-c-10 tbr-c-22 ft-c-18 remove"
        }, l.PopUp_RemovedFrom, " ", React.createElement("a", {
            className: "myfav mg-r-10",
            onClick: this._onClick
        }, n), React.createElement("span", {
            className: "icon-removedtomyfav"
        }))) : null ;
    },
    _getDataFromStore: function() {
        return PopUp_Store.getData();
    },
    _onUpdate: function() {
        this.setState(this._getDataFromStore());
    },
    _onClick: function() {
        ScrollerBar.scrollToTop();
        Action.PopUp.hide();
    }
}), PopupRoot = React.render(React.createElement(Popup, null ), document.getElementById("popup")), Homepage = React.createClass({
    displayName: "Homepage",
    _getDataFromStore: function() {
        return {
            data: HP_Store.getData(),
            extraData: HP_Store.getExtraData()
        };
    },
    getInitialState: function() {
        return this._getDataFromStore();
    },
    componentDidMount: function() {
        HP_Store.addUpdateListener(this._onUpdate);
    },
    componentDidUpdate: function() {
        var n = this.state.data.l.r;
        Timer.after(n, function() {
            Action.RefreshSite();
        });
        this.state.extraData.needUpdateOddsJump && Timer.after(5, function() {
            Action.Homepage.removeOddsJump();
        });
        this.state.extraData.isDisplay && (ScrollerBar.initScrollbarStatus(),
        this.state.extraData.needScrollTop && ScrollerBar.scrollToTop(),
        Action.ProcessingFinish());
    },
    render: function() {
        var t, n, i, r;
        return this.state.data.l.m == null && this.state.data.l.s.length == 0 && this.state.data.l.hip.length == 0 && this.state.data.l.hnph.length == 0 && this.state.data.l.hnps.length == 0 ? React.createElement("div", {
            className: "hidden"
        }) : (t = '<defs><pattern id="p1" patternUnits="objectBoundingBox" width=".1" height=".1" patternTransform="rotate(45)"><rect width="3" height="100" fill="#000" x="0" y="0" opacity=".06"></rect></pattern></defs>',
        n = this.state.extraData,
        n.odds.addOddsJump = this._addOddsJump,
        i = {
            data: this.state.data.l,
            extraData: n
        },
        r = {
            data: this.state.data.r,
            extraData: n
        },
        React.createElement("div", {
            className: "homepage" + (this.state.extraData.isDisplay ? "" : " hidden")
        }, React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "37",
            height: "20",
            className: "lockedBg_svg",
            dangerouslySetInnerHTML: {
                __html: t
            }
        }), React.createElement(Homepage.rightPanel, {
            data: r
        }), React.createElement(Homepage.leftPanel, {
            data: i
        }), React.createElement("div", {
            className: "clearBoth"
        })));
    },
    _addOddsJump: function(n, t) {
        var i = this.state.extraData;
        t == 1 ? i.odds.oddsUp.push(n) : t == 2 && i.odds.oddsDown.push(n);
        i.needUpdateOddsJump = !0;
    },
    _onUpdate: function() {
        this.setState(this._getDataFromStore());
    }
}), AllMarketPage, RightPanel;

Homepage.Utility = {
    timer: {
        _getIPTime: function(n, t) {
            var i = n.split(":")
              , r = (Math.abs(i[1]) + t) % 60
              , u = Math.abs(i[0]) + Math.floor((Math.abs(i[1]) + t) / 60);
            return (u < 10 ? ("0" + u).slice(-2) : u) + ":" + (r < 10 ? ("0" + r).slice(-2) : r);
        },
        _getLOTime: function(n, t) {

            var des = n-t;
            if (des <0){
                return "开奖中..."
            }else{
            var _h = (des/3600)>>0;
            var _m = ((des%3600) /60) >>0;
            var _s = (des%60)>>0;

            var tt = _h.toFixed(0).replace(/^(\d)$/,'0$1')+':'+_m.toFixed(0).replace(/^(\d)$/,'0$1')+':'+_s.toFixed(0).replace(/^(\d)$/,'0$1')
            return tt;
        }
        },
        _getEventDate: function(n) {
            var t = moment(n);
            return t.isSame(new Date(), "d") ? "" : t.format("DD / MM");
        },
        _getEventDateForPreStart: function(n) {
            return moment(n).format("DD / MM");
        },
        _getEventStartTime: function(n) {
            return moment(n).format("HH:mm");
        },
        _getShortPeriod: function(n) {
            return n == null ? "" : l["sti" + n.toUpperCase()];
        },
        _getLongPeriod: function(n) {
            return n == null ? "" : l["ti" + n];
        }
    },
    odds: {
        _needBlackTeamName: function(n) {
            return /-/.test(n);
        },
        _getHDPbyOddsType: function(n) {
            var t = this.props.data.extraData.odds.isEuroOdds;
            return n == null || n == "" ? "" : n;
        },
        _getOddsByRegion: function(n, t) {
            switch (n) {
            case "HDP":
                return t.o.ah ? this._getOddsItems("ah", t) : null ;
            case "1X2":
                return t.o["1x2"] ? this._getOddsItems("1x2", t) : null ;
            case "ML":
                return t.o.ml ? this._getOddsItems("ml", t) : null ;
            default:
                return null ;
            }
        },
        _getOddsItems: function(n, t) {
            var i, u, g, nt, h, f, r, a, v;
            if (t.o == null || t.o[n] == null )
                return null ;
            i = t.o[n];
            switch (n) {
            case "ah":
            case "ahfts":
                g = i[1] == "0" && i[3] == "0";
                nt = this.props.data.extraData.odds.isEuroOdds;
                u = [{
                    sid: i[4],
                    hdp: i[1],
                    odds: i[5],
                    chdp: i[1] == "0" ? i[1] : this._getHDPbyOddsType(i[1]),
                    ttp: t.i[0]
                }, {
                    sid: i[6],
                    hdp: i[3],
                    odds: i[7],
                    chdp: i[3] == "0" ? i[3] : this._getHDPbyOddsType(i[3]),
                    ttp: t.i[1]
                }];
                break;
            case "ou":
            case "t1ou":
            case "t2ou":
            case "oufts":
                u = [{
                    sid: i[4],
                    hdp: i[1],
                    odds: i[5],
                    OU: "O",
                    ttp: l.Odds_Over
                }, {
                    sid: i[6],
                    hdp: i[3],
                    odds: i[7],
                    OU: "U",
                    ttp: l.Odds_Under
                }];
                break;
            case "1x2":
                u = [{
                    sid: i[0],
                    hdp: null ,
                    odds: i[1],
                    ttp: t.i[0]
                }, {
                    sid: i[4],
                    hdp: null ,
                    odds: i[5],
                    ttp: l.Odds_Draw
                }, {
                    sid: i[2],
                    hdp: null ,
                    odds: i[3],
                    ttp: t.i[1]
                }];
                break;
            case "ml":
                u = [{
                    sid: i[0],
                    hdp: null ,
                    odds: i[1],
                    ttp: t.i[0]
                }, {
                    sid: i[2],
                    hdp: null ,
                    odds: i[3],
                    ttp: t.i[1]
                }];
                break;
            case "bts":
                u = [{
                    sid: i[0][1],
                    hdp: null ,
                    odds: i[0][2],
                    n: i[0][0],
                    ttp: i[0][0]
                }, i[1] == null ? null : {
                    sid: i[1][1],
                    hdp: null ,
                    odds: i[1][2],
                    n: i[1][0],
                    ttp: i[1][0]
                }];
                break;
            case "eps":
                if (i.o != null && i.o.length > 0)
                    for (h = i.o,
                    u = [],
                    r = 0; r < h.length; r++)
                        f = h[r],
                        u.push({
                            sid: f[1],
                            hdp: null ,
                            odds: f[2],
                            ttp: f[0],
                            n: f[0],
                            was: f[3]
                        });
                break;
            case "cs":
                var e = _.chunk(_.takeRight(i, 12), 2)
                  , c = _.chunk(_.take(i, 40), 2)
                  , o = []
                  , s = [];
                e = _.take(e, e.length - 1);
                var y = ["1 - 0", "2 - 0", "2 - 1", "3 - 0", "3 - 1", "3 - 2", "4 - 0", "4 - 1", "4 - 2", "4 - 3"]
                  , p = ["0 - 0", "1 - 1", "2 - 2", "3 - 3", "4 - 4"]
                  , w = ["0 - 1", "0 - 2", "1 - 2", "0 - 3", "1 - 3", "2 - 3", "0 - 4", "1 - 4", "2 - 4", "3 - 4"];
                for (r = 0; r < c.length; r++)
                    r % 2 == 0 ? o.push(c[r]) : s.push(c[r]);
                var b = []
                  , k = []
                  , d = [];
                for (r = 0; r < o.length; r++)
                    b.push({
                        n: y[r],
                        sid: o[r][0],
                        odds: o[r][1],
                        hdp: null ,
                        ttp: y[r]
                    });
                for (r = 0; r < e.length; r++)
                    k.push({
                        n: p[r],
                        sid: e[r][0],
                        odds: e[r][1],
                        hdp: null ,
                        ttp: p[r]
                    });
                for (r = 0; r < s.length; r++)
                    d.push({
                        n: w[r],
                        sid: s[r][0],
                        odds: s[r][1],
                        hdp: null ,
                        ttp: w[r]
                    });
                u = [b, k, d];
                break;
            default:
                u = null ;
            }
            return u != null && (a = this._highlightCheck,
            v = this._formatSelectionId,
            _.forEach(u, function(n) {
                n != null && (n instanceof Array ? _.forEach(n, function(n) {
                    n.sid = v(n.sid);
                    n.isHL = a(n.sid);
                }) : (n.sid = v(n.sid),
                n.isHL = a(n.sid)));
            })),
            u;
        },
        _highlightCheck: function(n) {
            var t = this.props.data.extraData.odds.hlo;
            return _.indexOf(t, n) != -1;
        },
        _formatSelectionId: function(n) {
            return n.replace(/\D+/, "");
        },
        _getBaseOddsProp: function(n, t) {
            return {
                evtid: n.k,
                score: n.i[10] + ":" + n.i[11],
                isInplay: t,
                parentEventId: n.pk,
                addOddsJump: this.props.data.extraData.odds.addOddsJump,
                oddsUp: this.props.data.extraData.odds.oddsUp,
                oddsDown: this.props.data.extraData.odds.oddsDown,
                oddsType: this.props.data.extraData.oddsType,
                isFirstLoad: this.props.data.extraData.isFirstLoad
            };
        },
        _getOddsTooltips: function(n, t) {
            switch (t) {
            }
        }
    },
    oddsBtn: {
        componentWillReceiveProps: function(n) {
            var t = parseFloat(this.props.data.odds), i = parseFloat(n.data.odds), u = this.props.data.oddsType, f = n.data.oddsType, e = n.data.isFirstLoad, r;
            i == t || u != f || e || (r = this.props.data.sid,
            this.props.data.addOddsJump(r, oddsUtil.getValueIndicator(t, i)));
        },
        _addSelection: function(n) {
            var t = this.props.data
              , i = t.ignoreHDP == null ? !1 : t.ignoreHDP;
            Action.RightPanel.addSelection(t.sid, t.evtid, t.odds, i ? null : t.hdp, t.score, t.isInplay, t.parentEventId);
            Action.Homepage.highlightOdds(t.sid);
            n.preventDefault();
            n.stopPropagation();
        }
    },
    pnc: {
        _displayChildTag: function(n) {
            var t = [o.pacType.et, o.pacType.pelAH, o.pacType.pelOU, o.pacType.toQualify, o.pacType.winner];
            return _.includes(t, n);
        },
        _getChildTag: function(n) {
            switch (n) {
            case o.pacType.et:
                return l.OP_ExtraTime;
            case o.pacType.pelAH:
            case o.pacType.pelOU:
                return l.HPET_Pens;
            case o.pacType.toQualify:
                return l.MB_Qualify;
            case o.pacType.winner:
                return l.Odds_Winner;
            }
        },
        _displayExtraTimeHeader: function(n) {
            var t = window.o.pacType
              , i = n.cei.ctid;
            return i == t.et && n.ihe || i == t.par && n.i[31] == "ET";
        }
    },
    link: {
        _getMorebetLink: function(n, t, i) {
            return Router.event(n, t, i);
        },
        _getSportLink: function(n, t) {
            return Router.sport(t, n ? VIEW.INPLAY : VIEW.PRESTART);
        },
        _getFootballTodayLink: function() {
            return Router.today(1);
        },
        _getFootballTomorrowLink: function() {
            return Router.tomorrow(1);
        },
        _getSportStartingSoonLink: function(n) {
            return Router.sport(n, VIEW.STARTINGSOON);
        },
        _getCompetitionLink: function(n, t) {
            return Router.competition(n, t);
        },
        _getAllInplayLink: function() {
            return Router.inplay();
        },
        _getOutrightLink: function(n, t) {
            return Router.outright(n, t);
        }
    },
    tv: {
        _playTV: function() {
            console.log("play TV");
        }
    },
    naming: {
        _getMarketLineName: function(n, t, i) {
            if (n == "ml" && _.includes([3, 9, 20, 13], i))
                return l.Odds_Winner;
            var u = AllMarketPage.getPretermName(n, t, i)
              , f = AllMarketPage.getBetTypeName(n, t, "", i)
              , r = AllMarketPage.getPeriod(n);
            return u + f + (r == "" ? "" : "- " + r);
        },
        _getChildMarketLineName: function(n, t, i, r) {
            if (_.indexOf([7, 53], t) > -1)
                return r;
            var u = AllMarketPage.getPretermName(n, t, i)
              , f = AllMarketPage.getBetTypeName(n, t, "", i);
            return r + " - " + u + f;
        },
        _getBestOfLocalization: function(n) {
            return n == "0" ? l.LiveText : oddsUtil.GetBestOfLocalization(n);
        },
        _getNetSportPeriod: function(n, t) {
            var r = t || this.props.data.sid, i;
            return AllMarketPage.isTableTennisOrBadmintion(r) ? (i = n[1],
            l["Period_" + i + "G"]) : oddsUtil.GetPeriodText(n);
        }
    }
};
Homepage.rightPanel = React.createClass({
    displayName: "rightPanel",
    render: function() {
        var i = this.props.data
          , r = i.extraData
          , n = []
          , t = !0;
        return _.forEach(i.data, function(i) {
            var u = {
                data: i,
                extraData: r,
                isFirst: t
            };
            i.t == 1 ? n.push(React.createElement(Homepage.rightPanel.eventForm, {
                key: "rfe_" + i.spid,
                data: u
            })) : i.t == 2 ? n.push(React.createElement(Homepage.rightPanel.outrightForm, {
                key: "rfe_" + i.spid,
                data: u
            })) : i.t == 3 && n.push(React.createElement(Homepage.rightPanel.competitionForm, {
                key: "rfe_" + i.spid,
                data: u
            }));
            t && (t = !1);
        }),
        React.createElement("div", {
            className: "content-r float-right"
        }, n);
    }
});
Homepage.rightPanel.eventForm = React.createClass({
    displayName: "eventForm",
    mixins: [Homepage.Utility.tv, Homepage.Utility.odds, Homepage.Utility.timer, Homepage.Utility.pnc, Homepage.Utility.link],
    render: function() {
        var u = this.props.data, t = u.data, n = t.c.e[0], i = t.ip, w = t.cds, f, e, h, c, r, a, v, y, p;
        n.i[7] != "" && (f = React.createElement("div", {
            onClick: this._playTV,
            className: "icon-TV2 ft-c-18 dsp-iblk",
            title: utility.replaceTooltipBu(i ? l.LP_LiveStreamInplay : l.LP_LiveStream)
        }));
        i && (e = React.createElement("div", {
            className: "live dsp-iblk ft-c-14 fts-12" + (f == null ? "" : " mg-r-6")
        }, l.LiveText));
        var b = {
            info: n.i,
            edt: n.edt,
            isInplay: i,
            sid: t.sid,
            isns: t.isNetSports,
            cp: n.sb != null ? n.sb.cp : null
        }, s, k = n.i[10], d = n.i[11];
        return s = w ? k + " - " + d : "v",
        t.isNetSports && i && n.sb != null && (h = React.createElement("div", {
            className: "pd-t-10 pd-l-10 pd-t-10 pd-b-3 pd-r-6 fts-13"
        }, React.createElement(Homepage.rightPanel.eventForm.netSportScore, {
            data: {
                sb: n.sb,
                eid: n.k,
                r: !0,
                sid: t.sid
            }
        }))),
        i && this._displayExtraTimeHeader(n) && t.sid == 1 && (c = React.createElement(Homepage.mainFeatureEvent.header.extraTime, {
            data: {
                hs: n.i[33],
                as: n.i[34],
                multipleLine: !0
            }
        })),
        r = {
            txt: l.HP_AllMarkets + " ",
            ec: n.i[32],
            url: this._getMorebetLink(n.cei.ctid == o.pacType.par ? n.k : n.pk, t.ip ? VIEW.INPLAY : VIEW.PRESTART, n.i[36]),
            top: 0
        },
        n.g == "N" && (a = React.createElement(Homepage.neutralIcon, {
            isRight: !0
        })),
        !t.ip && n.o != null && n.o.eps != null && n.o.eps.o != null && n.o.eps.o.length > 0 && (y = {
            baseProps: this._getBaseOddsProp(n, i),
            oddsItems: this._getOddsItems("eps", n),
            url: r.url,
            n: n.o.eps.n
        },
        v = React.createElement(Homepage.rightPanel.eps, {
            data: y
        })),
        t.idm && t.msg != "" && (p = React.createElement(Homepage.mainFeatureEvent.content.message, {
            pdb: !1,
            msg: t.msg
        })),
        React.createElement("div", {
            className: "radius bg-c-1 container pd-6 " + (u.isFirst ? "" : "mg-t-10")
        }, React.createElement("div", {
            className: "rpl-header cr-pointer multiple bg-c-10 radius",
            onClick: this._gotoAMPage.bind(this, r.url)
        }, React.createElement("div", {
            className: "leagueName radius pd-l-10 pd-t-8 pd-b-6  ft-c-27 fts-13 border_lv4"
        }, React.createElement("div", {
            className: "div-lineHeight-lv1 dsp-iblk float-right mg-r-6 "
        }, e, f), React.createElement("div", {
            className: "lht-1e"
        }, t.c.n)), React.createElement("div", {
            className: "teamName radius pd-l-10 pd-r-6  ft-c-27 fts-13 border_lv4"
        }, React.createElement("table", {
            className: "width-100p height-29"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed23"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "ft-c-3 fts-15 t-va-t"
        }, React.createElement("div", {
            className: "pd-b-5"
        }, React.createElement("span", {
            className: "dsp-iblk"
        }, n.i[0]), React.createElement("span", {
            className: "ft-c-14 mg-l-10 mg-r-10 dsp-iblk"
        }, s), React.createElement("span", {
            className: "dsp-iblk"
        }, n.i[1]))), React.createElement("td", {
            className: "t-va-t t-a-r"
        }, a))))), c), h, React.createElement("div", {
            className: "rpl-greenScreen mg-t-6 bg-c-29 radius"
        }, React.createElement(Homepage.mainFeatureEvent.img, {
            src: t.img,
            url: r.url
        }), React.createElement(Homepage.rightPanel.eventForm.PeriodAndTime, {
            data: b
        })), p, v, React.createElement(Homepage.rightPanel.eventForm.marketLines, {
            data: {
                evt: n,
                sid: t.sid,
                rd: t.rd,
                isInplay: i,
                extraData: u.extraData
            }
        }), React.createElement(Homepage.rightPanel.morebet, {
            data: r
        }));
    },
    _gotoAMPage: function(n) {
        Action.LoadSite(n);
    }
});
Homepage.rightPanel.eventForm.netSportScore = React.createClass({
    displayName: "netSportScore",
    render: function() {
        var n = this.props.data, t = n.sb, f = n.eid, i = [], e = this._getScore, r, u;
        return t != null && (_.forEach(t.ps, function(n, r) {
            var o = "rfe_ns_" + f + "_" + r, u;
            u = r != t.ps.length - 1 ? "mg-r-6" : "ft-c-16";
            i.push(React.createElement("span", {
                key: o,
                className: u
            }, e(n)));
        }),
        u = n.sid == 3 ? l.Results_Games : l.Results_Points,
        r = n.r ? React.createElement("div", {
            className: "float-right ft-c-16"
        }, React.createElement("span", {
            className: "ft-c-21 mg-r-3"
        }, u), this._getScore(n.sid == 3 ? t.ftg : t.p)) : React.createElement("span", {
            className: "ft-c-16 mg-l-30"
        }, React.createElement("span", {
            className: "ft-c-21 mg-r-3"
        }, u), this._getScore(n.sid == 3 ? t.ftg : t.p))),
        n.r ? React.createElement("div", null , r, i, React.createElement("div", {
            className: "clearBoth"
        })) : React.createElement("div", null , i, r, React.createElement("div", {
            className: "clearBoth"
        }));
    },
    _getScore: function(n) {
        return n.h + "-" + n.a;
    }
});
Homepage.rightPanel.eventForm.PeriodAndTime = React.createClass({
    displayName: "PeriodAndTime",
    mixins: [Homepage.Utility.timer, Homepage.Utility.naming],
    render: function() {
        var n = this.props.data, t = n.info, i, r, u, f, e, o;
        if (sid = n.sid,
        n.isInplay) {
            if (t[31] != null && t[31] != "" && (u = React.createElement("span", {
                title: this._getLongPeriod(t[31]),
                className: "mg-r-4 ft-c-" + (sid == 3 ? "3" : "18")
            }, this._getShortPeriod(t[31]))),
            t[5] != "" && (f = sid == 2 ? React.createElement("span", {
                className: "ft-c-3"
            }, t[5]) : React.createElement(Homepage.sport.iptime, {
                data: {
                    "class": "ft-c-3",
                    t: t[5]
                }
            })),
            n.isns && n.cp != null && (e = React.createElement("span", {
                className: "ft-c-3"
            }, this._getNetSportPeriod(n.cp))),
            u == null && f == null && e == null )
                return React.createElement("div", {
                    className: "greenScreen-time pd-6 pos-absolute radius fts-13"
                });
        } else if (o = this._getEventDate(n.edt),
        o != "" && (i = React.createElement("span", {
            className: "ft-c-18"
        }, o)),
        r = React.createElement("span", {
            className: "ft-c-3"
        }, " " + this._getEventStartTime(n.edt)),
        i == null && r == null )
            return React.createElement("div", {
                className: "greenScreen-time pd-6 pos-absolute radius fts-13"
            });
        return React.createElement("div", {
            className: "greenScreen-time pd-6 pos-absolute bg-c-10 radius fts-13"
        }, u, f, e, i, r);
    }
});
Homepage.rightPanel.eventForm.marketLines = React.createClass({
    displayName: "marketLines",
    mixins: [Homepage.Utility.odds],
    render: function() {
        var n = this.props.data
          , t = n.evt
          , i = n.sid
          , r = n.rd
          , u = n.isInplay
          , f = n.extraData
          , e = this._getMarketLinesByRegion(t, i, r, u, f);
        return React.createElement("div", {
            className: "mg-t-6"
        }, e);
    },
    _getMarketLinesByRegion: function(n, t, i, r, u) {
        var f, e, s, h;
        return t == 1 ? (f = i == "HDP" ? ["ah", "ou", "1x2", "bts", "cs"] : ["1x2", "ah", "ou", "bts", "cs"],
        n.cei.ctid != o.pacType.toQualify && n.cei.ctid != o.pacType.winner && f.push("To Qualify/ Winner")) : t == 2 ? f = ["ah", "ou", "ml", "t1ou", "t2ou"] : t == 3 ? f = ["ml", "ah", "ahfts", "oufts"] : (e = n.o.ml != null ,
        f = i == "HDP" ? ["ah", "ou", e ? "ml" : "1x2"] : [e ? "ml" : "1x2", "ah", "ou"]),
        s = [],
        h = this._genMarketLine,
        _.forEach(f, function(i) {
            s.push(h(i, n, r, u, t));
        }),
        s;
    },
    _genMarketLine: function(n, t, i, r, u) {
        var f = {
            betType: n,
            baseOddsProps: this._getBaseOddsProp(t, i),
            ctid: t.cei.ctid,
            sid: u
        }, s, e;
        t.cei.ctid != o.pacType.par && (f.childName = t.cei.n);
        switch (n) {
        case "ah":
        case "ml":
        case "ahfts":
            f.oddsItems = this._getOddsItems(n, t);
            f.oddsItems != null && (f.hn = t.i[0],
            f.an = t.i[1]);
            s = "ah";
            break;
        case "ou":
            u == 1 && t.cei.ctid == o.pacType.pelAH && (f.baseOddsProps.evtid = t.ouId);
            f.oddsItems = this._getOddsItems(n, t);
            s = n;
            break;
        case "1x2":
        case "cs":
        case "bts":
            f.oddsItems = this._getOddsItems(n, t);
            s = n;
            break;
        case "To Qualify/ Winner":
            e = _.find(t.cel, function(n) {
                return n.cei.ctid == window.o.pacType.toQualify || n.cei.ctid == window.o.pacType.winner;
            });
            e != null && e.o != null && e.o.ah != null ? (f.oddsItems = this._getOddsItems("ah", e),
            f.oddsItems[0].chdp = "",
            f.oddsItems[1].chdp = "",
            f.hn = t.i[0],
            f.an = t.i[1],
            f.ctid = e.cei.ctid,
            f.betType = "ah",
            f.childName = e.cei.n,
            f.baseOddsProps.evtid = e.k,
            f.baseOddsProps.parentEventId = e.pk) : f.oddsItems = null ;
            s = "ah";
            break;
        case "t1ou":
            f.oddsItems = this._getOddsItems(n, t);
            e = _.find(t.cel, function(n) {
                return n.cei.ctid == window.o.pacType.teamPointT1;
            });
            e != null && e.cei != null && (f.ctid = e.cei.ctid,
            f.betType = "ou",
            f.childName = e.cei.n,
            f.baseOddsProps.evtid = e.k,
            f.baseOddsProps.parentEventId = e.pk);
            s = "ou";
            break;
        case "t2ou":
            f.oddsItems = this._getOddsItems(n, t);
            e = _.find(t.cel, function(n) {
                return n.cei.ctid == window.o.pacType.teamPointT2;
            });
            e != null && e.cei != null && (f.ctid = e.cei.ctid,
            f.betType = "ou",
            f.childName = e.cei.n,
            f.baseOddsProps.evtid = e.k,
            f.baseOddsProps.parentEventId = e.pk);
            s = "ou";
        case "oufts":
            f.oddsItems = this._getOddsItems(n, t);
            s = "ou";
        }
        return f.oddsItems == null ? null : React.createElement(Homepage.rightPanel.eventForm.marketLines[s], {
            key: t.k + "_" + n,
            data: f
        }, null );
    }
});
Homepage.rightPanel.odds = React.createClass({
    displayName: "odds",
    mixins: [Homepage.Utility.oddsBtn],
    render: function() {
        var n = this.props.data, i = null , t;
        return (_.includes(n.oddsUp, n.sid) ? i = "oddsUp" : _.includes(n.oddsDown, n.sid) && (i = "oddsDown"),
        t = ["OddsWrapper", "dsp-iblk"],
        n.isHL && t.push("selected"),
        i != null && t.push(i),
        n.isRight && t.push("float-right"),
        n.isInplay && (n.odds == 0 || n.odds == "c")) ? React.createElement(Homepage.sport.oddsLock, {
            isRight: n.isRight
        }) : React.createElement("div", {
            className: t.join(" "),
            title: n.ttp
        }, React.createElement("span", {
            onClick: this._addSelection,
            className: "odds" + (n.last ? " odds-last" : "") + (n.odds < 0 ? " negOdds" : "")
        }, n.odds));
    }
});
Homepage.rightPanel.hdp = React.createClass({
    displayName: "hdp",
    render: function() {
        return React.createElement("div", {
            className: "OddsWrapper dsp-iblk"
        }, React.createElement("span", {
            className: "dark ft-c-16 mg-r-6"
        }, this.props.hdp));
    }
});
Homepage.rightPanel.marketLineTitle = React.createClass({
    displayName: "marketLineTitle",
    render: function() {
        return React.createElement("div", {
            className: "tb-mainEvent-sub-title bg-c-27 radius ft-c-4 t-a-l"
        }, this.props.n);
    }
});
Homepage.rightPanel.eventForm.marketLines.ah = React.createClass({
    displayName: "ah",
    mixins: [Homepage.Utility.odds, Homepage.Utility.naming],
    render: function() {
        for (var n = this.props.data, r = n.betType, e = n.baseOddsProps, o = n.oddsItems, u = [], s = this._needBlackTeamName, i, f, t = 0; t < 2; t++)
            i = {
                tn: t == 0 ? n.hn : n.an,
                baseOddsProps: e,
                oddsItem: o[t],
                last: t == 1
            },
            u.push(React.createElement(Homepage.rightPanel.ahMarketLineRow, {
                key: "fe_ah_" + (t == 0 ? "h" : "a") + i.oddsItem.sid,
                data: i
            }));
        return f = n.ctid == 0 ? this._getMarketLineName(r, n.ctid, n.sid) : this._getChildMarketLineName(r, n.ctid, n.sid, n.childName),
        React.createElement("table", {
            className: "tb-rpl"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed110"
        })), React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            colSpan: "2",
            className: "pd-0"
        }, React.createElement(Homepage.rightPanel.marketLineTitle, {
            n: f
        })))), React.createElement("tbody", {
            className: "fts-13"
        }, u));
    }
});
Homepage.rightPanel.ahMarketLineRow = React.createClass({
    displayName: "ahMarketLineRow",
    mixins: [Homepage.Utility.odds],
    render: function() {
        var t = this.props.data, u = t.tn, i = t.baseOddsProps, n = t.oddsItem, f = this._needBlackTeamName, r, e = !i.isInplay || n.odds != null && n.odds != 0;
        return e && n.hdp && (r = React.createElement("span", {
            className: "dark ft-c-16 mg-r-6"
        }, n.chdp == null ? n.hdp : n.chdp)),
        React.createElement("tr", null , React.createElement("td", {
            className: "td-teameName t-a-l pd-t-10 pd-l-10" + (t.last ? " pd-b-10" : ""),
            onClick: this._gotoAMPage
        }, React.createElement(Homepage.sport.team, {
            data: {
                n: u,
                black: f(n.hdp)
            }
        })), React.createElement("td", {
            className: "t-a-r pd-t-10 " + (t.last ? " pd-b-10" : "")
        }, r, React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({
                last: !0
            }, i, n)
        })));
    },
    _gotoAMPage: function() {
        this.props.data.url && Action.LoadSite(this.props.data.url);
    }
});
Homepage.rightPanel.eventForm.marketLines.ou = React.createClass({
    displayName: "ou",
    mixins: [Homepage.Utility.odds, Homepage.Utility.naming],
    render: function() {
        var n = this.props.data, r = n.betType, i = n.baseOddsProps, t = n.oddsItems, u, f, e;
        return i.isInplay && (t[0].odds == null || t[0].odds == 0) || (u = React.createElement("span", {
            className: "upInt dsp-iblk ft-c-16 mg-r-15"
        }, React.createElement("span", {
            className: "ou ft-c-24 mg-r-5"
        }, l.so), t[0].hdp)),
        i.isInplay && (t[1].odds == null || t[1].odds == 0) || (f = React.createElement("span", {
            className: "upInt dsp-iblk ft-c-16 mg-r-15"
        }, React.createElement("span", {
            className: "ou ft-c-24 mg-r-5"
        }, l.su), t[1].hdp)),
        e = n.ctid == 0 ? this._getMarketLineName(r, n.ctid, n.sid) : this._getChildMarketLineName(r, n.ctid, n.sid, n.childName),
        React.createElement("table", {
            className: "tb-rpl"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            colSpan: "2",
            className: "pd-0"
        }, React.createElement(Homepage.rightPanel.marketLineTitle, {
            n: e
        })))), React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-tb-10 pd-l-10"
        }, u, React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({
                last: !0
            }, i, t[0])
        })), React.createElement("td", {
            className: "t-a-r pd-tb-10 pd-l-10"
        }, f, React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({
                last: !0
            }, i, t[1])
        })))));
    }
});
Homepage.rightPanel.eventForm.marketLines["1x2"] = React.createClass({
    mixins: [Homepage.Utility.odds, Homepage.Utility.naming],
    render: function() {
        var n = this.props.data, r, t, i, u, f;
        return n != null && (t = n.baseOddsProps,
        i = n.oddsItems,
        r = React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-tb-10 pd-l-10 nowrap"
        }, React.createElement("span", {
            className: "ft-1x2 ft-c-16"
        }, "1"), React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({}, t, i[0])
        })), React.createElement("td", {
            className: "t-a-c pd-tb-10 nowrap"
        }, React.createElement("span", {
            className: "ft-1x2 ft-c-16"
        }, "X"), React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({}, t, i[1])
        })), React.createElement("td", {
            className: "t-a-r pd-tb-10 nowrap"
        }, React.createElement("span", {
            className: "ft-1x2 ft-c-16"
        }, "2"), React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({}, t, i[2])
        }))))),
        u = n.ctid == 0 ? this._getMarketLineName("1x2", n.ctid, n.sid) : this._getChildMarketLineName("1x2", n.ctid, n.sid, n.childName),
        f = this.props.main,
        React.createElement("table", {
            className: f ? "tb-mainEvent-sub" : "tb-rpl"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", null ), React.createElement("col", null )), React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            colSpan: "3",
            className: "pd-0"
        }, React.createElement(Homepage.rightPanel.marketLineTitle, {
            n: u
        }))), r));
    }
});
Homepage.rightPanel.eventForm.marketLines.bts = React.createClass({
    displayName: "bts",
    mixins: [Homepage.Utility.odds, Homepage.Utility.naming],
    render: function() {
        var n = this.props.data, r, i, t, u;
        return n != null && (i = n.baseOddsProps,
        t = n.oddsItems,
        t[1] != null && (u = React.createElement("td", {
            className: "t-a-r pd-tb-10"
        }, React.createElement("span", {
            className: "mg-l-10 ft-c-4  mg-r-36 fts-12"
        }, t[1].n), React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({}, i, t[1])
        }))),
        r = React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-tb-10 pd-l-10"
        }, React.createElement("span", {
            className: "ft-c-4  mg-r-36 fts-12"
        }, t[0].n), React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({}, i, t[0])
        })), u))),
        React.createElement("table", {
            className: this.props.main ? "tb-mainEvent-sub" : "tb-rpl"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            colSpan: "2",
            className: "pd-0"
        }, React.createElement(Homepage.rightPanel.marketLineTitle, {
            n: this._getMarketLineName(n.betType, n.ctid, n.sid)
        })))), r);
    }
});
Homepage.rightPanel.eventForm.marketLines.cs = React.createClass({
    displayName: "cs",
    mixins: [Homepage.Utility.odds, Homepage.Utility.naming],
    render: function() {
        var n = this.props.data, r = n.baseOddsProps, u = n.oddsItems, t = [], f = this._filterOutZeroOdds, i;
        return _.forEach(u, function(n) {
            t.push(_.filter(n, f));
        }),
        i = n.ctid == 0 ? this._getMarketLineName("cs", n.ctid, n.sid) : this._getChildMarketLineName("cs", n.ctid, n.sid, n.childName),
        React.createElement("table", {
            className: "tb-rpl nowrap"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-22Percent"
        }), React.createElement("col", {
            className: "col-22Percent"
        }), React.createElement("col", {
            className: "col-22Percent"
        })), React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            colSpan: "3",
            className: "pd-0"
        }, React.createElement(Homepage.rightPanel.marketLineTitle, {
            n: i
        })))), React.createElement("tbody", {
            className: "fts-13"
        }, this._genRow(t[0], t[1], t[2], r)));
    },
    _filterOutZeroOdds: function(n) {
        return n != null && n.odds != null && n.odds != "0.00";
    },
    _genRow: function(n, t, i, r) {
        for (var o = [], e = this._genOdds, s = r.isInplay ? 3 : Math.max(n.length, t.length, i.length), u = 0; u < s; u++) {
            var h = n[u]
              , c = t[u]
              , l = i[u]
              , f = "";
            f += u == 0 ? " pd-t-10" : " pd-t-5";
            u == s - 1 && (f += " pd-b-10");
            o.push(React.createElement("tr", {
                key: "cs_r" + u
            }, e(h, f + " pd-l-10 t-a-l", r), e(c, f + " t-a-c", r), e(l, f + " t-a-r", r)));
        }
        return o;
    },
    _genOdds: function(n, t, i) {
        return n == null || n.odds == "0.00" ? React.createElement("td", {
            className: t
        }) : React.createElement("td", {
            className: t
        }, React.createElement("span", {
            className: "mg-r-6 ft-c-16"
        }, n.n), React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({}, i, n)
        }));
    }
});
Homepage.rightPanel.eps = React.createClass({
    displayName: "eps",
    render: function() {
        for (var n = this.props.data, r = [], t = 0; t < n.oddsItems.length && t < 2; t++) {
            var i = n.oddsItems[t]
              , u = {
                n: i.n,
                was: i.was,
                oddsItem: _.assign({
                    last: !0
                }, n.baseProps, i)
            }
              , f = "fe_eps_" + i.sid;
            r.push(React.createElement(Homepage.rightPanel.eps.selections, {
                key: f,
                data: u
            }));
        }
        return React.createElement("div", null , React.createElement("table", {
            className: "tb-eps mg-t-6 width-100p fts-13"
        }, React.createElement("thead", {
            className: " ft-c-3  radius"
        }, React.createElement("tr", null , React.createElement("th", {
            className: "height-28 bg-c-4 radius t-a-l fontWeight-normal pd-l-10",
            colSpan: "3"
        }, n.n)))), React.createElement("table", {
            className: "tb-eps mg-t-6 width-100p fts-13"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed41"
        })), React.createElement("tbody", null , r)), React.createElement("div", {
            className: "viewall lht-30 t-a-c fts-13 topBorder mg-t-5" + (n.oddsItems.length <= 2 ? " hidden" : ""),
            onClick: this._linkToAMP
        }, l.LP_View_All));
    },
    _linkToAMP: function(n) {
        Action.LoadSite(this.props.data.url, {
            showMoreEPS: !0
        });
        n.preventDefault();
        n.stopPropagation();
    }
});
Homepage.rightPanel.eps.selections = React.createClass({
    displayName: "selections",
    render: function() {
        var n = this.props.data;
        return React.createElement("tr", null , React.createElement("td", {
            className: "pd-0 height-30 pd-l-10"
        }, n.n), React.createElement("td", {
            className: "pd-0 t-a-cheight-30"
        }, React.createElement(Homepage.rightPanel.odds, {
            data: n.oddsItem
        })));
    }
});
Homepage.rightPanel.morebet = React.createClass({
    displayName: "morebet",
    render: function() {
        var n = this.props.data
          , t = {};
        return n.nottp || (t.title = l.OP_ViewAllMarkets),
        React.createElement("div", React.__spread({}, t, {
            onClick: this._clickMoreBet.bind(this, n.url),
            className: "t-a-c bt-moreBet-enlarge bg-c-41 height-40 radius ft-c-3 fts-12 mg-t-" + n.top
        }), n.txt, React.createElement("span", {
            className: "fontWeight-bold"
        }, n.ec), React.createElement("span", {
            className: "icon-ArrowMoreBets"
        }));
    },
    _clickMoreBet: function(n, t) {
        Action.LoadSite(n);
        t.preventDefault();
        t.stopPropagation();
    }
});
Homepage.rightPanel.outrightForm = React.createClass({
    displayName: "outrightForm",
    mixins: [Homepage.Utility.odds, Homepage.Utility.link],
    render: function() {
        var r = this.props.data, n = r.data, t = n.c.e[0], u = t["n-o"][0], e = this._getBaseOddsProp, o = this._formatSelectionId, s = this._highlightCheck, h = _.take(u.o, 10).map(function(i) {
            var r = o(i[1])
              , u = {
                sid: r,
                hdp: null ,
                odds: i[2],
                isHL: s(r)
            }
              , f = e(t, n.ip)
              , h = {
                tn: i[0],
                baseOddsProps: f,
                oddsItem: u
            };
            return React.createElement(Homepage.rightPanel.ahMarketLineRow, {
                key: "ror_" + t.k + "_" + i[1],
                data: h
            });
        }), f, i;
        return n.idm && n.msg != "" && (f = React.createElement(Homepage.mainFeatureEvent.content.message, {
            msg: n.msg
        })),
        i = this._getOutrightLink(n.sid, n.c.k),
        React.createElement("div", {
            className: "radius bg-c-1 container pd-6 " + (r.isFirst ? "" : "mg-t-10")
        }, React.createElement("div", {
            className: "rpl-header cr-pointer multiple bg-c-10 radius",
            onClick: this._clickHeader.bind(this, i)
        }, React.createElement("div", {
            className: "leagueName radius pd-l-10 pd-t-8 pd-b-6  ft-c-27 fts-13 border_lv4 "
        }, React.createElement("div", {
            className: "uppercase lht-1e"
        }, n.sn)), React.createElement("div", {
            className: "teamName radius pd-l-10 pd-r-6  ft-c-27 fts-13 border_lv4"
        }, React.createElement("table", {
            className: "width-100p height-29"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed23"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "ft-c-3 fts-15 t-va-t"
        }, React.createElement("div", {
            className: " pd-b-5"
        }, t.egn)), React.createElement("td", {
            className: "t-va-t t-a-r"
        })))))), React.createElement("div", {
            className: "rpl-greenScreen mg-t-6 bg-c-29 radius"
        }, React.createElement(Homepage.mainFeatureEvent.img, {
            src: n.img,
            url: i
        })), f, React.createElement("div", {
            className: "mg-t-6"
        }, React.createElement("table", {
            className: "tb-rpl"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixedodds"
        })), React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            colSpan: "2"
        }, React.createElement(Homepage.rightPanel.marketLineTitle, {
            n: u.mn
        })))), React.createElement("tbody", {
            className: "fts-13"
        }, h)), React.createElement(Homepage.rightPanel.morebet, {
            data: {
                txt: l.LP_View_All,
                url: i,
                top: 10
            }
        })));
    },
    _clickHeader: function(n) {
        Action.LoadSite(n);
    }
});
Homepage.rightPanel.competitionForm = React.createClass({
    displayName: "competitionForm",
    mixins: [Homepage.Utility.odds, Homepage.Utility.link],
    render: function() {
        var f = this.props.data, n = f.data, t = n.c, i, e, h, c, r;
        switch (n.rd) {
        case "HDP":
            i = "ah";
            break;
        case "ML":
            i = "ml";
            break;
        case "1X2":
            i = "1x2";
        }
        t.e.length > 0 && (e = React.createElement("div", {
            className: "fts-13"
        }, React.createElement(Homepage.rightPanel.marketLineTitle, {
            n: l.LP_Matches
        })));
        var a = this._getOddsItems, v = this._getBaseOddsProp, u = !1, y = this._getMorebetLink, p = t.e.map(function(t) {
            var r = a(i, t), f, h, c, p, w, b, k, e, s;
            if (r != null )
                return f = v(t, t.ip),
                e = y(t.cei.ctid == o.pacType.par ? t.k : t.pk, VIEW.PRESTART, t.i[36]),
                h = {
                    tn: t.i[0],
                    baseOddsProps: f,
                    oddsItem: r[0],
                    url: e
                },
                c = {
                    tn: t.i[1],
                    baseOddsProps: f,
                    oddsItem: r[1],
                    url: e,
                    last: n.rd != "1X2"
                },
                w = React.createElement(Homepage.rightPanel.ahMarketLineRow, {
                    data: h
                }),
                b = React.createElement(Homepage.rightPanel.ahMarketLineRow, {
                    data: c
                }),
                n.rd == "1X2" && (p = {
                    tn: l.dw,
                    baseOddsProps: f,
                    oddsItem: r[2],
                    url: e,
                    last: !0
                },
                k = React.createElement(Homepage.rightPanel.ahMarketLineRow, {
                    data: p
                })),
                s = "tb-rpl tb-rfeatureEvent",
                u && (s += " topBorder"),
                u || (u = !0),
                React.createElement("table", {
                    key: "feComp_" + t.k,
                    className: s
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed110"
                })), React.createElement("tbody", {
                    className: "fts-13 hovertby"
                }, w, b, k));
        }), s;
        return t.hasor && (s = React.createElement(Homepage.rightPanel.morebet, {
            data: {
                txt: l.LP_OutrightMarkets,
                url: this._getOutrightLink(n.sid, t.k),
                nottp: !0
            }
        })),
        n.idm && n.msg != "" && (h = React.createElement(Homepage.mainFeatureEvent.content.message, {
            msg: n.msg
        })),
        r = this._getCompetitionLink(n.sid, t.k),
        t.ec > 0 && (c = React.createElement(Homepage.rightPanel.morebet, {
            data: {
                txt: l.HP_AllMatches + " " + t.ec,
                url: r,
                nottp: !0
            }
        })),
        React.createElement("div", {
            className: "radius bg-c-1 container pd-6 " + (f.isFirst ? "" : "mg-t-10")
        }, React.createElement("div", {
            className: "rpl-header cr-pointer multiple bg-c-10 radius",
            onClick: this._clickHeader.bind(this, r)
        }, React.createElement("div", {
            className: "leagueName radius pd-l-10 pd-t-8 pd-b-6  ft-c-27 fts-13 border_lv4 "
        }, React.createElement("div", {
            className: "lht-1e uppercase"
        }, n.sn.toUpperCase())), React.createElement("div", {
            className: "teamName radius pd-l-10 pd-r-6  ft-c-27 fts-13 border_lv4"
        }, React.createElement("table", {
            className: "width-100p height-29"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed23"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "ft-c-3 fts-15 t-va-t"
        }, React.createElement("div", {
            className: " pd-b-5"
        }, t.n)), React.createElement("td", {
            className: "t-va-t t-a-r"
        })))))), React.createElement("div", {
            className: "rpl-greenScreen mg-t-6 bg-c-29 radius"
        }, React.createElement(Homepage.mainFeatureEvent.img, {
            src: n.img,
            url: r
        })), h, React.createElement("div", {
            className: "mg-t-6"
        }, e, p, c, s));
    },
    _clickHeader: function(n) {
        Action.LoadSite(n);
    }
});
Homepage.leftPanel = React.createClass({
    displayName: "leftPanel",
    render: function() {
        var i = this.props.data, n = i.data, t = i.extraData, r, u, f, e, o, s, h, c;
        return n.m != null && (f = {
            data: n.m,
            extraData: t
        },
        e = React.createElement(Homepage.mainFeatureEvent, {
            data: f
        })),
        n.s.length > 0 && (o = React.createElement(Homepage.secondaryFeatureEvent, {
            data: {
                data: n.s,
                extraData: t
            }
        })),
        n.hip.length > 0 && (r = {
            data: n.hip,
            extraData: t,
            ipec: n.ipec
        },
        s = React.createElement(Homepage.inplayPanel, {
            data: r
        })),
        (n.hnph.length > 0 || n.hnps.length > 0) && (u = {
            hl: n.hnph,
            ss: n.hnps,
            extraData: t
        },
        h = React.createElement(Homepage.prestartPanel, {
            data: u
        })),
        c = React.createElement(Homepage.leftPanel.topBanner, {
            url: t.bannerURL,
            h: t.topBannerH
        }),
        React.createElement("div", {
            className: "content-l clearHack-left"
        }, c, e, s, o, h);
    }
});
Homepage.leftPanel.topBanner = React.createClass({
    displayName: "topBanner",
    render: function() {
        return React.createElement("div", {
            className: "radius bg-c-1 pos-relative ofw-hidden topbanner",
            style: {
                height: this.props.h + "px"
            }
        }, React.createElement("iframe", {
            src: this.props.url,
            height: this.props.h,
            width: "100%",
            scrolling: "no",
            frameBorder: "0",
            allowTransparency: "true"
        }));
    }
});
Homepage.neutralIcon = React.createClass({
    displayName: "neutralIcon",
    render: function() {
        return React.createElement("span", {
            title: l.neut,
            className: "neutral fts-12" + (this.props.isRight ? "" : " pos-absolute right-n23 top-2")
        }, React.createElement("span", {
            className: "icon-Neutralbg"
        }), React.createElement("span", {
            className: "icon-NeutralN"
        }));
    }
});
Homepage.mainFeatureEvent = React.createClass({
    displayName: "mainFeatureEvent",
    mixins: [Homepage.Utility.pnc, Homepage.Utility.timer, Homepage.Utility.link],
    render: function() {
        var i = this.props.data
          , t = i.data
          , n = t.c.e[0]
          , r = {
            isInplay: t.ip,
            cds: t.cds,
            hs: n.i[10],
            as: n.i[11],
            ht: n.i[0],
            at: n.i[1],
            showExtraTime: t.ip && this._displayExtraTimeHeader(n) && t.sid == 1,
            isNeutral: n.g == "N",
            period: n.i[31],
            time: n.i[5],
            date: this._getEventDate(n.edt),
            startTime: this._getEventStartTime(n.edt),
            cn: t.c.n,
            showTV: n.i[7] != "",
            isns: t.isNetSports,
            nspt: n.i[37],
            fhs: n.i[33],
            fas: n.i[34],
            sid: t.sid,
            url: this._getMorebetLink(n.cei.ctid == o.pacType.par ? n.k : n.pk, t.ip ? VIEW.INPLAY : VIEW.PRESTART, n.i[36])
        }
          , u = {
            data: t,
            extraData: i.extraData
        };
        return React.createElement("div", {
            className: "radius bg-c-1 pd-6 mainEvent" + (i.extraData.topBannerH == 0 ? "" : " mg-t-10")
        }, React.createElement(Homepage.mainFeatureEvent.header, {
            data: r
        }), React.createElement(Homepage.mainFeatureEvent.content, {
            data: u
        }));
    }
});
Homepage.mainFeatureEvent.header = React.createClass({
    displayName: "header",
    mixins: [Homepage.Utility.timer, Homepage.Utility.tv, Homepage.Utility.naming],
    render: function() {
        var n = this.props.data, c = n.isInplay, nt = n.cds, tt = n.hs, it = n.as, a, v = n.showExtraTime, y, f, e, p, o, w, b, k, r, d, s, h, u, t, i, g;
        return v && (a = React.createElement(Homepage.mainFeatureEvent.header.extraTime, {
            data: {
                hs: n.fhs,
                as: n.fas
            }
        })),
        n.isNeutral && (y = React.createElement(Homepage.neutralIcon, null )),
        n.showTV && (r = React.createElement("div", {
            className: "icon-TV2 ft-c-18 dsp-iblk",
            onClick: this._playTV,
            title: c ? l.LP_LiveStreamInplay : l.LP_LiveStream
        })),
        c ? (f = React.createElement("div", {
            className: "ft-c-14 live dsp-iblk" + (r == null ? "" : " mg-r-6")
        }, l.LiveText),
        n.isns ? (h = this._getBestOfLocalization(n.nspt),
        o = React.createElement("span", {
            className: "ft-c-18 fts-12 time"
        }, /live/i.test(h) ? "" : h)) : (u = n.period,
        t = n.time == "" ? "" : n.time,
        u != null && u != "" && (e = React.createElement("span", {
            className: "ft-c-18 time fts-" + (t != null && t != "" ? 12 : 15)
        }, u + " ")),
        t != null && t != "" && (p = t == "" || n.sid == 2 ? React.createElement("span", {
            className: "ft-c-3 time fts-12"
        }, t) : React.createElement(Homepage.sport.iptime, {
            data: {
                "class": "ft-c-3 time fts-12",
                t: t
            }
        }))),
        (e != null || o != null ) && (s = React.createElement("div", {
            className: "div-lineHeight-lv1 mg-t-3"
        }, e, p, o))) : (i = n.date,
        g = n.startTime,
        i != null && i != "" && (w = React.createElement("span", {
            className: "ft-c-18 fts-12 time"
        }, i)),
        b = React.createElement("span", {
            className: "ft-c-3 time fts-" + (i != null && i != "" ? 12 : 15)
        }, " " + g),
        s = React.createElement("div", {
            className: "div-lineHeight-lv1" + (r == null ? "" : " mg-t-3")
        }, w, b)),
        k = nt ? tt + " - " + it : "v",
        (f != null || r != null ) && (d = React.createElement("div", {
            className: "div-lineHeight-lv1"
        }, f, r)),
        React.createElement("div", {
            className: "mainevent-header cr-pointer " + (v ? "extra-time" : ""),
            onClick: this._gotoAMPage
        }, React.createElement("table", {
            className: "tb-mainEventHeader bg-c-10 radius border_lv4"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixedHeaderRight"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", null , React.createElement("div", {
            className: "ft-c-3 pd-t-2 pd-b-2 pd-l-10 pd-r-10 dsp-iblk fts-12 "
        }, React.createElement("div", {
            className: "fts-13 ft-c-18"
        }, n.cn), React.createElement("div", {
            className: "fts-15 pos-relative lht-1p1"
        }, React.createElement("span", {
            className: "dsp-iblk t-va-m"
        }, n.ht), React.createElement("span", {
            className: "ft-c-14 mg-l-10 mg-r-10 t-va-m dsp-iblk"
        }, k), React.createElement("span", {
            className: "dsp-iblk t-va-m"
        }, n.at), y))), React.createElement("td", {
            className: "ft-c-3  fts-12 pd-r-10 t-a-r pd-t-2"
        }, d, s)))), a);
    },
    _gotoAMPage: function() {
        Action.LoadSite(this.props.data.url);
    }
});
Homepage.mainFeatureEvent.header.extraTime = React.createClass({
    displayName: "extraTime",
    render: function() {
        var n = this.props.data, t = n.multipleLine, i, r, u;
        return n.hs != "" && n.as != "" && (i = React.createElement("div", {
            key: "mfe_h_ex_r",
            className: "ft-c-3" + (t ? "" : " float-right")
        }, l.OddsPage_Page_FT_RESULT + " (" + n.hs + "-" + n.as + ")")),
        r = React.createElement("div", {
            key: "mfe_h_ex_t",
            className: t ? "" : "left"
        }, l.OddsPage_Page_ET_MSG),
        u = t ? [r, i] : [i, r],
        React.createElement("div", {
            className: "et-header radius bg-c-42 ft-c-35 fts-12 pd-t-5 pd-b-5 pd-r-10 pd-l-10 pd-r-10 border_lv5"
        }, u);
    }
});
Homepage.mainFeatureEvent.content = React.createClass({
    displayName: "content",
    mixins: [Homepage.Utility.odds, Homepage.Utility.link, Homepage.Utility.pnc, Homepage.Utility.naming],
    render: function() {
        var g = this.props.data, t = g.data, n = t.c.e[0], ii = g.hlo, ri = g.isEuroOdds, nt = t.ip, ui = this._getBaseOddsProp(n, nt), st = {
            n: n.i[0]
        }, ht = {
            n: n.i[1]
        }, tt = [], it = [], e, p, w, ni = this._getMarketLinesByRegion(t.rd), ct = this._needBlackTeamName, rt = this._genOddsItem, ti = this._getOddsItems, ut, s, a, ft, et, k, b, lt, r, at, d, vt, yt, pt, v, wt, f, u, bt, kt, y, i, h, c, ot, dt, gt;
        return n.o != null && _.forEach(ni, function(t) {
            w = n.o[t];
            t == "1x2" && (e = []);
            w ? (t == "ah" && (st.black = ct(w[1]),
            ht.black = ct(w[3])),
            p = ti(t, n),
            tt.push(rt(p[0], t, !0)),
            it.push(rt(p[t == "1x2" ? 2 : 1], t, !1)),
            t == "1x2" && e.push(rt(p[1], t, !1))) : (tt.push(React.createElement("td", {
                key: "mfe_t_" + t,
                className: "odds-large t-a-r"
            })),
            it.push(React.createElement("td", {
                key: "mfe_m_" + t,
                className: "odds-large pd-t-5 t-a-r"
            })));
        }),
        t.rd == "1X2" && (ut = React.createElement("div", {
            className: "ft-c-21 t-a-l"
        }, l.Odds_Draw)),
        s = {
            morebetcount: n.i[32],
            url: this._getMorebetLink(n.cei.ctid == o.pacType.par ? n.k : n.pk, t.ip ? VIEW.INPLAY : VIEW.PRESTART, n.i[36])
        },
        t.sid == 1 && this._displayChildTag(n.cei.ctid) && (ft = React.createElement("div", {
            className: "ft-c-5 float-right mg-r-6"
        }, this._getChildTag(n.cei.ctid))),
        e ? t.dv != 2 ? (s.isMin = !0,
        a = React.createElement(Homepage.sport.morebet, {
            data: s
        }),
        e.push(React.createElement("td", {
            className: "odds-large t-a-r pd-t-5"
        }, a))) : e.push(React.createElement("td", null )) : t.dv != 2 && (s.isMin = !1,
        a = React.createElement(Homepage.sport.morebet, {
            data: s
        }),
        e = React.createElement("td", {
            colSpan: "2",
            className: "t-a-r pd-t-5"
        }, a)),
        t.isNetSports && n.sb != null && (k = [],
        _.forEach(n.sb.ps, function(t, i) {
            var r = "mfe_ns_" + n.k + "_" + i;
            k.push(React.createElement(Homepage.sport.score.netSport.scoreItem, {
                key: r,
                data: t
            }));
        })),
        k != null ? b = React.createElement("td", {
            className: "td-score ft-c-23 fts-13 t-a-l",
            colSpan: "2"
        }, k) : (ft != null || ut != null || e != null ) && (b = React.createElement("td", {
            colSpan: "2"
        }, ft, ut)),
        (b != null || e != null ) && (et = React.createElement("tr", null , b, e)),
        !t.ip && n.o != null && n.o.eps != null && n.o.eps.o != null && n.o.eps.o.length > 0 && (at = {
            baseProps: this._getBaseOddsProp(n, nt),
            oddsItems: this._getOddsItems("eps", n),
            url: s.url,
            n: n.o.eps.n
        },
        lt = React.createElement(Homepage.mainFeatureEvent.eps, {
            data: at
        })),
        t.dv == 2 && n.o != null && (r = r == null ? this._getBaseOddsProp(n, nt) : r,
        t.sid == 1 ? (v = t.rd == "HDP" ? "1x2" : "ou",
        (n.o[v] != null || n.o.bts != null ) && (v == "ou" && n.cei.ctid == o.pacType.pelAH && (r.evtid = n.ouId),
        wt = {
            l: {
                key: v,
                data: this._getOddsProps(r, n, v)
            },
            r: {
                key: "bts",
                data: n.cei.ctid == o.pacType.par ? this._getOddsProps(r, n, "bts") : null
            }
        },
        vt = React.createElement(Homepage.mainFeatureEvent.content.oddsRow_twoMarketLine, {
            key: "mfe_mo_bt",
            data: wt
        })),
        n.o.cs != null && (n.cei.ctid == o.pacType.par || n.cei.ctid == o.pacType.et) && (yt = React.createElement(Homepage.mainFeatureEvent.content.oddsRow_cs, {
            key: "mfe_mo_cs",
            data: this._getOddsProps(r, n, "cs")
        })),
        n.cei.ctid != o.pacType.toQualify && n.cei.ctid != o.pacType.winner && (f = _.find(n.cel, function(n) {
            return n.cei.ctid == window.o.pacType.toQualify || n.cei.ctid == window.o.pacType.winner;
        }),
        f != null && f.o != null && f.o.ah != null && (u = this._getOddsProps(r, f, "ah"),
        u.oddsItems[0].chdp = "",
        u.oddsItems[1].chdp = "",
        u.ctid = f.cei.ctid,
        u.hn = n.i[0],
        u.an = n.i[1],
        u.mn = this._getChildMarketLineName("ah", f.cei.ctid, 1, f.cei.n),
        u.baseOddsProps.evtid = f.k,
        u.baseOddsProps.parentEventId = f.pk,
        u.baseOddsProps.score = n.i[10] + ":" + n.i[11],
        pt = React.createElement(Homepage.mainFeatureEvent.content.oddsRow_singleMarketLine, {
            key: "mfe_mo_ch",
            data: u
        }))),
        d = [vt, yt, pt]) : t.sid == 2 && (n.o.ml != null && (y = this._getOddsProps(r, n, "ml"),
        y.hn = n.i[0],
        y.an = n.i[1],
        y.mn = this._getMarketLineName("ml", n.cei.ctid, 2),
        bt = React.createElement(Homepage.mainFeatureEvent.content.oddsRow_singleMarketLine, {
            key: "mfe_mo_ml",
            data: y
        })),
        (n.o.t1ou != null || n.o.t2ou != null ) && (i = {
            l: {
                key: "ou",
                data: this._getOddsProps(r, n, "t1ou")
            },
            r: {
                key: "ou",
                data: this._getOddsProps(r, n, "t2ou")
            }
        },
        i.l.data.betType = "ou",
        i.r.data.betType = "ou",
        h = _.find(n.cel, function(n) {
            return n.cei.ctid == window.o.pacType.teamPointT1;
        }),
        h != null && (i.l.data.ctid = h.cei.ctid,
        i.l.data.childName = h.cei.n,
        i.l.data.baseOddsProps.evtid = h.k,
        i.l.data.baseOddsProps.parentEventId = h.pk),
        c = _.find(n.cel, function(n) {
            return n.cei.ctid == window.o.pacType.teamPointT2;
        }),
        c != null && (i.r.data.ctid = c.cei.ctid,
        i.r.data.childName = c.cei.n,
        i.r.data.baseOddsProps.evtid = c.k,
        i.r.data.baseOddsProps.parentEventId = c.pk),
        h != null && c != null && (kt = React.createElement(Homepage.mainFeatureEvent.content.oddsRow_twoMarketLine, {
            key: "mfe_mo_ch",
            data: i
        }))),
        d = [bt, kt]),
        s = {
            txt: l.HP_AllMarkets + " " + n.i[32],
            url: this._getMorebetLink(n.cei.ctid == o.pacType.par ? n.k : n.pk, t.ip ? VIEW.INPLAY : VIEW.PRESTART, n.i[36]),
            top: 10
        },
        a = React.createElement(Homepage.rightPanel.morebet, {
            key: "mfe_mo_mb",
            data: s
        }),
        d.push(a)),
        ot = t.isNetSports ? this._getOddsTitleForNetSport() : this._getOddsTitleByRegion(t.rd),
        t.idm && t.msg != "" && (dt = React.createElement(Homepage.mainFeatureEvent.content.message, {
            msg: t.msg
        })),
        et || (gt = React.createElement("div", {
            className: "pd-tb-10"
        })),
        React.createElement("div", {
            className: "mg-t-6 oddsContainer"
        }, React.createElement("table", {
            className: "tb-mainEvent odds-large"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-fixedPicture"
        }), React.createElement("col", null )), React.createElement("tbody", {
            className: "hovertby fts-13",
            onClick: this._linkToAMPage.bind(this, s.url)
        }, React.createElement("tr", null , React.createElement("td", {
            className: "fixedPicture t-a-l lht-0p7"
        }, React.createElement(Homepage.mainFeatureEvent.img, {
            disable: !0,
            src: t.img
        })), React.createElement("td", {
            className: "t-va-bot"
        }, React.createElement("table", {
            className: "odds-large width-100p cr-pointer"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixedRedcard"
        }), React.createElement("col", {
            className: "col-fixedodds"
        }), React.createElement("col", {
            className: "col-fixedodds"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", null ), React.createElement("td", null ), React.createElement("td", {
            className: "fts-11 t-a-c ft-c-23 pd-l-8 pd-b-8"
        }, ot[0]), React.createElement("td", {
            className: "fts-11 t-a-c ft-c-23 pd-l-8 pd-b-8"
        }, ot[1])), React.createElement("tr", null , React.createElement("td", {
            className: "td-teameName t-a-l"
        }, React.createElement(Homepage.sport.team, {
            data: st
        })), React.createElement(Homepage.mainFeatureEvent.content.redCard, {
            num: n.i[8]
        }), tt), React.createElement("tr", null , React.createElement("td", {
            className: "td-teameName t-a-l"
        }, React.createElement(Homepage.sport.team, {
            data: ht
        })), React.createElement(Homepage.mainFeatureEvent.content.redCard, {
            num: n.i[9]
        }), it), et)), gt)))), lt, d, dt);
    },
    _getOddsTitleByRegion: function(n) {
        switch (n) {
        case "HDP":
            return [l.Odds_Hdp, l.Odds_OU_Short];
        case "1X2":
            return [l.Odds_1X2, l.Odds_Hdp];
        case "ML":
            return [l.Odds_MoneyLine, l.Odds_Hdp];
        default:
            return [];
        }
    },
    _getOddsTitleForNetSport: function() {
        return [l.Odds_Winner, AllMarketPage.isTableTennisOrBadmintion(this.props.data.data.sid) ? l.MB_GameHDC : l.MB_SetHDC];
    },
    _getMarketLinesByRegion: function(n) {
        switch (n) {
        case "HDP":
            return ["ah", "ou"];
        case "1X2":
            return ["1x2", "ah"];
        case "ML":
            return ["ml", "ah"];
        default:
            return [];
        }
    },
    _genOddsItem: function(n, t, i) {
        var r = this.props.data
          , u = r.data.c.e[0]
          , s = n.odds
          , f = n.sid;
        if (s == 0)
            return React.createElement("td", {
                key: f,
                className: "odds-large"
            }, React.createElement(Homepage.sport.oddsLock, null ));
        var r = this.props.data
          , h = r.isEuroOdds
          , u = r.data.c.e[0]
          , e = _.assign(this._getBaseOddsProp(u, r.data.ip), n);
        return t == "ou" && u.cei.ctid == o.pacType.pelAH && (e.evtid = u.ouId),
        React.createElement("td", {
            key: f,
            className: "odds-large t-a-r" + (i ? "" : " pd-t-5")
        }, React.createElement(Homepage.sport.odds, {
            data: e
        }));
    },
    _getOddsProps: function(n, t, i) {
        var r, u;
        if (t.o[i] == null )
            return null ;
        var e = this.props.data
          , s = e.data
          , f = t.cei.ctid;
        return i == "ou" && t.cei.ctid == o.pacType.pelAH && (f = o.pacType.pelOU),
        r = {
            ctid: t.cei.ctid,
            sid: s.sid,
            betType: i
        },
        f != o.pacType.par && (r.childName = t.cei.n),
        u = _.assign(r, {
            baseOddsProps: _.assign({}, n)
        }),
        u.oddsItems = this._getOddsItems(i, t),
        u;
    },
    _linkToAMPage: function(n, t) {
        Action.LoadSite(n);
        t.preventDefault();
        t.stopPropagation();
    }
});
Homepage.mainFeatureEvent.eps = React.createClass({
    displayName: "eps",
    render: function() {
        for (var n = this.props.data, r = [], t = 0; t < n.oddsItems.length && t < 2; t++) {
            var i = n.oddsItems[t]
              , u = {
                n: i.n,
                was: i.was,
                oddsItem: _.assign({}, n.baseProps, i)
            }
              , f = "fe_eps_" + i.sid;
            r.push(React.createElement(Homepage.mainFeatureEvent.eps.selection, {
                key: f,
                data: u
            }));
        }
        return React.createElement("div", null , React.createElement("table", {
            className: "tb-eps mg-t-6 width-100p fts-13"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed65"
        }), React.createElement("col", {
            className: "col-fixed65"
        })), React.createElement("thead", {
            className: " ft-c-3  radius"
        }, React.createElement("tr", null , React.createElement("th", {
            className: "height-28 bg-c-4 radius-lt-lb t-a-l fontWeight-normal pd-l-10"
        }, n.n), React.createElement("th", {
            className: "height-28 ft-c-56 t-a-c bg-c-4 fontWeight-normal "
        }, l.OP_Was), React.createElement("th", {
            className: "height-28 t-a-c  bg-c-4 radius-rt-rb fontWeight-normal "
        }, l.OP_Now)))), React.createElement("table", {
            className: "tb-eps mg-t-6 width-100p fts-13"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed65"
        }), React.createElement("col", {
            className: "col-fixed65"
        })), React.createElement("tbody", null , r)), React.createElement("div", {
            className: "viewall lht-30 t-a-c fts-13 topBorder mg-t-5" + (n.oddsItems.length <= 2 ? " hidden" : ""),
            onClick: this._linkToAMP
        }, l.LP_View_All));
    },
    _linkToAMP: function(n) {
        Action.LoadSite(this.props.data.url, {
            showMoreEPS: !0
        });
        n.preventDefault();
        n.stopPropagation();
    }
});
Homepage.mainFeatureEvent.eps.selection = React.createClass({
    displayName: "selection",
    render: function() {
        var n = this.props.data;
        return React.createElement("tr", null , React.createElement("td", {
            className: "pd-0 height-30 pd-l-10"
        }, n.n), React.createElement("td", {
            className: "pd-0 t-a-c height-30"
        }, React.createElement("span", {
            className: "odds odds-last linethrough"
        }, n.was)), React.createElement("td", {
            className: "pd-0 t-a-c height-30"
        }, React.createElement(Homepage.rightPanel.odds, {
            data: n.oddsItem
        })));
    }
});
Homepage.mainFeatureEvent.img = React.createClass({
    displayName: "img",
    render: function() {
        var n, t;
        return this.props.src == null || this.props.src == "" ? n = "/Public/Theme/Theme_Black/Images/SBK-default-banner.jpg" : (t = window.location.protocol,
        n = this.props.src.replace(/^(http:|https:)/, t)),
        React.createElement("img", {
            className: classNames({
                "cr-pointer": !this.props.disable
            }),
            src: n,
            onClick: this._gotoAMPage
        });
    },
    _gotoAMPage: function() {
        this.props.url && Action.LoadSite(this.props.url);
    }
});
Homepage.mainFeatureEvent.content.oddsRow_twoMarketLine = React.createClass({
    displayName: "oddsRow_twoMarketLine",
    render: function() {
        var i = this.props.data
          , n = i.l
          , t = i.r
          , r = n.data == null ? React.createElement(Homepage.mainFeatureEvent.content.oddsRow_emptyMarketLine, null ) : React.createElement(Homepage.rightPanel.eventForm.marketLines[n.key], {
            data: n.data,
            main: !0
        }, null )
          , u = t.data == null ? React.createElement(Homepage.mainFeatureEvent.content.oddsRow_emptyMarketLine, null ) : React.createElement(Homepage.rightPanel.eventForm.marketLines[t.key], {
            data: t.data,
            main: !0
        }, null );
        return React.createElement("table", {
            className: "tb-mainEvent mg-t-10"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "rightBorder pd-r-10"
        }, r), React.createElement("td", {
            className: "pd-l-10"
        }, u))));
    }
});
Homepage.mainFeatureEvent.content.oddsRow_emptyMarketLine = React.createClass({
    displayName: "oddsRow_emptyMarketLine",
    render: function() {
        return React.createElement("table", {
            className: "tb-mainEvent-sub"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            colSpan: "2",
            className: "t-a-l"
        }, React.createElement("div", {
            className: "tb-mainEvent-sub-title fts-13 bg-c-27 radius ft-c-4 height-15"
        }))), React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-tb-10 pd-l-10 height-26"
        }), React.createElement("td", {
            className: "t-a-r pd-tb-10 height-26"
        }))));
    }
});
Homepage.mainFeatureEvent.content.oddsRow_cs = React.createClass({
    displayName: "oddsRow_cs",
    mixins: [Homepage.Utility.naming],
    render: function() {
        var n = this.props.data, i = n.oddsItems, r = n.baseOddsProps, t = [], f = this._filterOutZeroOdds, u;
        return r.isInplay ? _.forEach(i, function(n) {
            t.push(_.filter(n, f));
        }) : t = i,
        u = n.ctid == 0 ? this._getMarketLineName("cs", n.ctid, n.sid) : this._getChildMarketLineName("cs", n.ctid, n.sid, n.childName),
        React.createElement("table", {
            className: "tb-mainEvent mg-t-10"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-19Percent"
        }), React.createElement("col", {
            className: "col-19Percent"
        }), React.createElement("col", {
            className: "col-22Percent"
        }), React.createElement("col", {
            className: "col-19Percent"
        }), React.createElement("col", {
            className: "col-19Percent"
        })), React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            colSpan: "5",
            className: "pd-0 "
        }, React.createElement("div", {
            className: "mg-b-10"
        }, React.createElement(Homepage.rightPanel.marketLineTitle, {
            n: u
        })))), this._genRow(t[0], t[1], t[2], r)));
    },
    _filterOutZeroOdds: function(n) {
        return n != null && n.odds != null && n.odds != "0.00";
    },
    _genRow: function(n, t, i, r) {
        for (var s = [], o = this._genOdds, h = [], c = [], l = [], a = [], v = r.isInplay ? 3 : Math.max(Math.floor(n.length / 2), t.length, Math.floor(i.length / 2)), e, u, f = 0; f < n.length; f++)
            f % 2 == 0 ? h.push(n[f]) : c.push(n[f]);
        for (e = 0; e < i.length; e++)
            e % 2 == 0 ? l.push(i[e]) : a.push(i[e]);
        for (u = 0; u < v; u++) {
            var y = h[u]
              , p = c[u]
              , w = t[u]
              , b = l[u]
              , k = a[u];
            s.push(React.createElement("tr", {
                key: "m_cs_r" + u
            }, o(y, "t-a-l pd-tb-10 pd-l-10", r), o(p, "t-a-c pd-tb-10", r), o(w, "t-a-c pd-tb-10 rightBorder leftBorder", r), o(b, "t-a-c pd-tb-10", r), o(k, "t-a-r pd-tb-10", r)));
        }
        return s;
    },
    _genOdds: function(n, t, i) {
        if (i.isInplay && (n == null || n.odds == "0.00"))
            return React.createElement("td", {
                className: t
            });
        var r;
        return r = n != null && n.odds != "0.00" ? React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({}, i, n)
        }) : React.createElement("span", {
            className: "odds v-hidden"
        }),
        React.createElement("td", {
            className: t
        }, React.createElement("span", {
            className: "mg-r-6 ft-c-16"
        }, n != null ? n.n : ""), r);
    }
});
Homepage.mainFeatureEvent.content.oddsRow_singleMarketLine = React.createClass({
    displayName: "oddsRow_singleMarketLine",
    render: function() {
        var n = this.props.data
          , t = n.oddsItems
          , i = n.baseOddsProps;
        return React.createElement("table", {
            className: "tb-mainEvent mg-t-10 layout-BTTS"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            colSpan: "2",
            className: "pd-0"
        }, React.createElement(Homepage.rightPanel.marketLineTitle, {
            n: n.mn
        }))), React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-tb-10 pd-l-10"
        }, React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({
                isRight: !0
            }, i, t[0])
        }), React.createElement("span", {
            className: "ft-c-4 sp-teamName mg-t-2 dsp-iblk"
        }, n.hn)), React.createElement("td", {
            className: "t-a-l pd-tb-10 pd-l-10"
        }, React.createElement(Homepage.rightPanel.odds, {
            data: _.assign({
                isRight: !0
            }, i, t[1])
        }), React.createElement("span", {
            className: "ft-c-4 sp-teamName mg-t-2 dsp-iblk"
        }, n.an)))));
    }
});
Homepage.mainFeatureEvent.content.redCard = React.createClass({
    displayName: "redCard",
    render: function() {
        var n;
        return _.includes(["1", "2", "3"], this.props.num) && (n = React.createElement("div", {
            className: "redCard"
        }, React.createElement("div", {
            className: "icon-RedCard"
        }), React.createElement("div", {
            className: "icon-RedCard2"
        }), React.createElement("div", {
            className: "icon-RedCard3"
        }))),
        React.createElement("td", {
            className: "t-a-c rc" + this.props.num
        }, n);
    }
});
Homepage.mainFeatureEvent.content.message = React.createClass({
    displayName: "message",
    render: function() {
        return React.createElement("div", {
            className: "bg-c-53 pd-t-6" + (this.props.pdb ? " pd-b-6" : "")
        }, React.createElement("div", {
            className: "radius bg-c-54 pd-l-10 pd-r-10 pd-t-8 pd-b-7 fts-13 t-a-l ft-c-57 lht-15"
        }, this.props.msg));
    }
});
Homepage.secondaryFeatureEvent = React.createClass({
    displayName: "secondaryFeatureEvent",
    render: function() {
        var t = this.props.data
          , n = [];
        return _.forEach(t.data, function(i, r) {
            var u = {
                data: i,
                extraData: t.extraData,
                index: r
            };
            i.t == 1 ? n.push(React.createElement(Homepage.secondaryFeatureEvent.eventForm, {
                key: "fe_" + r,
                data: u
            })) : i.t == 2 ? n.push(React.createElement(Homepage.secondaryFeatureEvent.outrightForm, {
                key: "fe_" + r,
                data: u
            })) : i.t == 3 && n.push(React.createElement(Homepage.secondaryFeatureEvent.competitionForm, {
                key: "fe_" + r,
                data: u
            }));
        }),
        React.createElement("div", {
            className: "radius bg-c-1 pd-6 mg-t-10 featureEvent"
        }, React.createElement("div", {
            className: "featureEvent-header"
        }, React.createElement("div", {
            className: "bg-c-48 radius ft-c-3 fts-16 pd-l-10 pd-r-10 fontWeight-bold pd-t-11 pd-b-11"
        }, l.HP_FeatureEvent)), React.createElement("div", null , n));
    }
});
Homepage.secondaryFeatureEvent.eventForm = React.createClass({
    displayName: "eventForm",
    mixins: [Homepage.Utility.odds, Homepage.Utility.pnc, Homepage.Utility.link, Homepage.Utility.tv, Homepage.Utility.naming],
    render: function() {

        var a = this.props.data, t = a.data, n = t.c.e[0], st = a.hlo, ft = a.index, h, v, i, p, k, g, y, nt, tt, f, it, rt, ut, ot;
        n.i[7] != "" && (h = React.createElement("div", {
            onClick: this._playTV,
            className: "icon-TV2 dsp-iblk"
        }));
        i = t.ip;
        i && (v = React.createElement("div", {
            className: "live dsp-iblk" + (h == null ? "" : " mg-r-10")
        }, l.LiveText));
        t.sid == 1 && this._displayChildTag(n.cei.ctid) && (p = React.createElement("div", {
            className: "dsp-iblk ft-c-5" + (h == null && v == null ? "" : " mg-r-10")
        }, this._getChildTag(n.cei.ctid)));
        var w = i ? t.cds : !1
          , b = t.isNetSports
          , e = {
            hn: n.i[0],
            an: n.i[1]
        };
        w && (e.hs = n.i[10],
        e.as = n.i[11]);
        t.rd == "HDP" && n.o.ah && (e.hb = this._needBlackTeamName(n.o.ah[1]),
        e.ab = this._needBlackTeamName(n.o.ah[3]));
        b && i && n.sb != null && (k = React.createElement("tr", null , React.createElement("td", {
            colSpan: "6",
            className: "pd-b-10 pd-r-6 ft-c-21 t-a-l"
        }, React.createElement(Homepage.rightPanel.eventForm.netSportScore, {
            data: {
                sb: n.sb,
                eid: n.k,
                sid: t.sid
            }
        }))));
        var d = t.rd == "1X2"
          , r = this._getOddsByRegion(t.rd, n)
          , u = [];
        r == null ? (u.push(React.createElement("td", {
            key: n.k + "_empty1",
            className: "pd-t-6 pd-b-6"
        }, React.createElement(Homepage.sport.oddsEmpty, null ))),
        u.push(React.createElement("td", {
            key: n.k + "_empty2",
            className: "pd-t-6 pd-b-6"
        }, React.createElement(Homepage.sport.oddsEmpty, null ))),
        d && u.push(React.createElement("td", {
            key: n.k + "_empty3",
            className: "pd-t-6 pd-b-6"
        }, React.createElement(Homepage.sport.oddsEmpty, null )))) : (d ? (r[0].hdp = "1",
        r[1].hdp = "X",
        r[2].hdp = "2") : t.rd == "ML" && (r[0].hdp = "1",
        r[1].hdp = "2"),
        g = this._getBaseOddsProp,
        _.forEach(r, function(r) {
            if (r.odds == 0)
                u.push(React.createElement("td", {
                    key: r.sid,
                    className: "pd-t-6 pd-b-6"
                }, React.createElement(Homepage.sport.oddsLock, null )));
            else {
                var f = _.assign({
                    ignoreHDP: t.rd != "HDP"
                }, g(n, i), r);
                u.push(React.createElement("td", {
                    key: r.sid,
                    className: "pd-t-6 pd-b-6"
                }, React.createElement(Homepage.sport.odds, {
                    data: f
                })));
            }
        }));
        var c = {
            morebetcount: n.i[32],
            url: this._getMorebetLink(n.cei.ctid == o.pacType.par ? n.k : n.pk, t.ip ? VIEW.INPLAY : VIEW.PRESTART, n.i[36]),
            isMin: !0
        }
          , et = React.createElement(Homepage.sport.morebet, {
            data: c
        })
          , s = {
            isInplay: i,
            sid: t.sid
        };
        return i ? (s.showScore = w, s.period = n.i[31], s.time = HP_Store.initTimerString(n.i[5])) : s.edt = n.edt,
        b && i ? (n.sb != null && (nt = React.createElement("div", null , this._getNetSportPeriod(n.sb.cp, this.props.data.data.sid))),
        y = React.createElement("td", {
            className: "ft-c-23"
        }, nt)) : y = React.createElement(Homepage.sport.periodAndTime, {
            data: s
        }),
        f = 6,
        t.rd == "1X2" && (tt = React.createElement("col", {
            className: "col-fixedodds"
        }),
        f = 7),
        this._displayExtraTimeHeader(n) && t.sid == 1 && (it = React.createElement("tr", null , React.createElement("td", {
            colSpan: f,
            className: "t-a-l"
        }, React.createElement(Homepage.mainFeatureEvent.header.extraTime, {
            data: {
                hs: n.i[33],
                as: n.i[34]
            }
        })))),
        !t.ip && n.o != null && n.o.eps != null && n.o.eps.o != null && n.o.eps.o.length > 0 && (rt = React.createElement("tr", null , React.createElement("td", {
            colSpan: f,
            className: "t-a-l"
        }, React.createElement(Homepage.secondaryFeatureEvent.eps, {
            pdt: !0,
            url: c.url
        })))),
        t.idm && t.msg != "" && (ut = React.createElement("tr", null , React.createElement("td", {
            colSpan: f,
            className: "t-a-l"
        }, React.createElement(Homepage.mainFeatureEvent.content.message, {
            pdb: !0,
            msg: t.msg
        })))),
        n.g == "N" && (ot = React.createElement(Homepage.neutralIcon, null )),
        React.createElement("table", {
            className: "tb-featureEvent odds-large t-a-c odds-large secondary" + (ft > 0 ? " topBorder" : "")
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-eventImage"
        }), React.createElement("col", null ), React.createElement("col", {
            className: "col-fixedodds"
        }), React.createElement("col", {
            className: "col-fixedodds"
        }), tt, React.createElement("col", {
            className: "col-fixedodds"
        }), React.createElement("col", {
            className: "col-fixed57"
        })), React.createElement("tbody", {
            className: "fts-13 selection hovertby "
        }, React.createElement("tr", null , React.createElement("td", {
            colSpan: f,
            className: "pd-b-3"
        })), it, React.createElement("tr", {
            className: "ft-c-16 height-24"
        }, React.createElement("td", {
            className: "td-eventImage",
            rowSpan: "2"
        }, React.createElement(Homepage.mainFeatureEvent.img, {
            src: t.img,
            url: c.url
        })), React.createElement("td", {
            className: "t-a-l pd-l-10 pd-t-5 pd-b-2 lht-0p9",
            colSpan: "3"
        }, t.c.n), React.createElement("td", {
            colSpan: "2",
            className: "t-a-r pd-t-5 pd-r-10"
        }, React.createElement("div", {
            className: "div-lineHeight-lv1 ft-c-21 fts-12"
        }, p, v, h))), React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-l-10",
            onClick: this._gotoAMPage.bind(this, c.url)
        }, React.createElement(Homepage.sport.scoreAndTeamName, {
            data: e
        })), y, u, React.createElement("td", {
            className: "t-a-r"
        }, et)), k, rt, ut));
    },
    _gotoAMPage: function(n) {
        Action.LoadSite(n);
    }
});
Homepage.secondaryFeatureEvent.eps = React.createClass({
    displayName: "eps",
    render: function() {
        return React.createElement("div", {
            className: "bg-c-53" + (this.props.pdt ? " pd-t-6" : "") + (this.props.pdb ? " pd-b-6" : "")
        }, React.createElement("div", {
            className: "radius bg-c-4 pd-l-10 pd-r-10 pd-t-8 pd-b-7 fts-13 t-a-c ft-c-3 epsbanner",
            onClick: this._gotoAMPage
        }, l.OP_EPSAvailable));
    },
    _gotoAMPage: function() {
        Action.LoadSite(this.props.url);
    }
});
Homepage.secondaryFeatureEvent.outrightForm = React.createClass({
    displayName: "outrightForm",
    mixins: [Homepage.Utility.odds, Homepage.Utility.link],
    render: function() {
        var h = this.props.data, t = h.data, f = t.c.e[0], r = f["n-o"][0], y = h.index, c, e, l, n, i, u, a, o, s, v;
        if (r == null )
            return null ;
        for (c = r.o.length > 2 ? 3 : 2,
        n = [],
        i = 0; i < r.o.length && i < 4; i++)
            u = r.o[i],
            n.push(React.createElement("td", {
                className: "t-a-l" + (i % 2 == 0 ? " pd-l-10" : " pd-l-5")
            }, React.createElement("div", {
                className: "ft-c-25"
            }, u[0]))),
            a = {
                sid: u[1].replace(/\D+/, ""),
                odds: u[2],
                hdp: null ,
                last: !1
            },
            n.push(React.createElement("td", {
                className: i % 2 == 0 ? "" : "t-a-r pd-r-5"
            }, React.createElement("div", {
                className: "odds-container"
            }, React.createElement(Homepage.rightPanel.odds, {
                data: _.assign({}, this._getBaseOddsProp(f, !1), a)
            }))));
        return o = {
            url: this._getOutrightLink(t.sid, t.c.k),
            isMin: !0,
            height: 48
        },
        s = React.createElement(Homepage.sport.morebet, {
            data: o
        }),
        n = _.chunk(_.chunk(n, 2), 2),
        n.length > 1 ? (e = React.createElement("tr", {
            className: "height-24"
        }, n[0], React.createElement("td", {
            className: "t-a-r",
            rowSpan: "2"
        }, s)),
        n[1].length == 1 && n[1].push([React.createElement("td", null ), React.createElement("td", null )]),
        l = React.createElement("tr", {
            className: "height-24"
        }, n[1])) : (n[0].length == 1 && n[0].push([React.createElement("td", null ), React.createElement("td", null )]),
        e = React.createElement("tr", {
            className: "height-24"
        }, n[0], React.createElement("td", {
            className: "t-a-r"
        }, s))),
        t.idm && t.msg != "" && (v = React.createElement("tr", null , React.createElement("td", {
            colSpan: "6",
            className: "t-a-l"
        }, React.createElement(Homepage.mainFeatureEvent.content.message, {
            pdb: !0,
            msg: t.msg
        })))),
        React.createElement("table", {
            className: "tb-featureEvent t-a-c secondary" + (y > 0 ? " topBorder" : "")
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-eventImage"
        }), React.createElement("col", null ), React.createElement("col", {
            className: "col-fixedodds"
        }), React.createElement("col", null ), React.createElement("col", {
            className: "col-fixedodds"
        }), React.createElement("col", {
            className: "col-fixed57"
        })), React.createElement("tbody", {
            className: "fts-13 selection"
        }, React.createElement("tr", null , React.createElement("td", {
            colSpan: "6",
            className: "pd-b-3"
        })), React.createElement("tr", {
            className: "ft-c-16 fts-13 height-24"
        }, React.createElement("td", {
            className: "td-eventImage",
            rowSpan: c
        }, React.createElement(Homepage.mainFeatureEvent.img, {
            src: t.img,
            url: o.url
        })), React.createElement("td", {
            className: "t-a-l pd-l-10  lht-1e",
            colSpan: "5"
        }, React.createElement("div", {
            className: "pd-t-5 pd-b-2"
        }, f.egn, React.createElement("span", {
            className: "ft-c-23"
        }, " " + r.mn)))), e, l, v, React.createElement("tr", null , React.createElement("td", {
            colSpan: "6",
            className: "pd-b-3"
        }))));
    }
});
Homepage.secondaryFeatureEvent.competitionForm = React.createClass({
    displayName: "competitionForm",
    mixins: [Homepage.Utility.odds, Homepage.Utility.link],
    render: function() {
        var i = this.props.data, n = i.data, t = n.c, e = i.index, r, u, f;
        return t.hasor && (r = React.createElement("div", {
            className: "mg-l-10 dsp-blk t-a-c bt-moreBet bg-c-41 height-40 radius ft-c-3 fts-12 colButton",
            onClick: this._linkToOutRight
        }, React.createElement("span", {
            className: "width-53 pos-relative dsp-iblk lht-1e mg-b-3 t-va-m"
        }, l.LP_OutrightMarkets), React.createElement("span", {
            className: "icon-ArrowMoreBets"
        }))),
        n.idm && n.msg != "" && (u = React.createElement("tr", null , React.createElement("td", {
            colSpan: "6",
            className: "t-a-l"
        }, React.createElement(Homepage.mainFeatureEvent.content.message, {
            pdb: !0,
            msg: n.msg
        })))),
        t.ec > 0 && (f = React.createElement("div", {
            className: "dsp-blk t-a-c bt-moreBet bg-c-41 height-40 radius ft-c-3 fts-12 colButton",
            onClick: this._linkToCompetition
        }, t.ec + " " + l.HP_Matches, React.createElement("span", {
            className: "icon-ArrowMoreBets"
        }))),
        React.createElement("table", {
            className: "tb-featureEvent t-a-c secondary" + (e > 0 ? " topBorder" : "")
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-eventImage"
        }), React.createElement("col", null ), React.createElement("col", {
            className: "col-fixedodds"
        }), React.createElement("col", null ), React.createElement("col", {
            className: "col-fixedodds"
        }), React.createElement("col", {
            className: "col-fixedodds"
        })), React.createElement("tbody", {
            className: "fts-13 selection"
        }, React.createElement("tr", {
            className: "ft-c-16 fts-13 height-24"
        }, React.createElement("td", {
            className: "td-eventImage"
        }, React.createElement(Homepage.mainFeatureEvent.img, {
            src: n.img,
            url: this._getCompetitionLink(n.sid, t.k)
        })), React.createElement("td", {
            className: " pd-l-10 t-a-l"
        }, React.createElement("div", {
            className: "ft-c-21 uppercase"
        }, n.sn), React.createElement("div", {
            className: "ft-c-16 mg-t-5"
        }, t.n)), React.createElement("td", {
            colSpan: "4",
            className: "t-a-r"
        }, f, r)), u));
    },
    _linkToCompetition: function() {
        var t = this.props.data
          , n = t.data
          , i = n.c;
        Action.LoadSite(this._getCompetitionLink(n.sid, i.k));
    },
    _linkToOutRight: function() {
        var t = this.props.data
          , n = t.data
          , i = n.c;
        Action.LoadSite(this._getOutrightLink(n.sid, i.k));
    }
});
Homepage.inplayPanel = React.createClass({
    displayName: "inplayPanel",
    mixins: [Homepage.Utility.link],
    render: function() {
        var t = this.props.data
          , n = t.data
          , u = t.extraData;
        if (n == null || n.length == 0)
            return null ;
        var i = !0, f = n.slice(0, 3).map(function(n) {
            var t = {
                data: n,
                isFirstSport: i,
                isInplay: !0,
                sportType: "IP",
                extraData: u
            }
              , r = React.createElement(Homepage.sport, {
                key: "hp_ip_" + n.k,
                data: t
            });
            return i && (i = !1),
            r;
        }), r, e = n.slice(3);
        return e.length > 0 && (r = React.createElement(Homepage.inplayPanel.otherSports, {
            data: n.slice(3)
        })),
        React.createElement("div", {
            className: "radius bg-c-1 pd-6 mg-t-10 in-play"
        }, React.createElement(Homepage.header, {
            isInplay: !0,
            ec: t.ipec
        }), React.createElement("div", null , f, r, React.createElement(Homepage.sport.bottomLink, {
            txt: l.LP_All + " " + l.LP_Inplay,
            count: t.ipec,
            url: this._getAllInplayLink()
        })));
    }
});
Homepage.inplayPanel.otherSports = React.createClass({
    displayName: "otherSports",
    render: function() {
        for (var t = this.props.data, r = [], i, n = 0; n < t.length; n += 2)
            i = n + 2 < t.length ? t.slice(n, n + 2) : t.slice(n),
            r.push(React.createElement(Homepage.inplayPanel.otherSports.row, {
                key: "other_" + i[0].k,
                data: i
            }));
        return React.createElement("table", {
            className: "tb-featureEvent odds-large t-a-c odds-large mg-t-10 topBorder_2px bottomBorder_2px"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", {
            className: "fts-13"
        }, r));
    }
});
Homepage.inplayPanel.otherSports.row = React.createClass({
    displayName: "row",
    render: function() {
        var n = this.props.data
          , t = React.createElement(Homepage.inplayPanel.otherSports.cell, {
            data: n[0]
        })
          , i = n[1] ? React.createElement(Homepage.inplayPanel.otherSports.cell, {
            data: n[1]
        }) : React.createElement("td", null );
        return React.createElement("tr", null , t, i);
    }
});
Homepage.inplayPanel.otherSports.cell = React.createClass({
    displayName: "cell",
    mixins: [Homepage.Utility.link],
    render: function() {
        var n = this.props.data;
        return React.createElement("td", {
            onClick: this._viewAll.bind(this, this._getSportLink(!0, n.k)),
            className: "viewEvents pd-l-10 pd-t-10 pd-b-6 t-a-l pd-r-10"
        }, React.createElement("div", {
            className: "round-moreBet round bg-c-2 ft-c-3 dsp-iblk fts-15 t-a-c fontWeight-bold float-right"
        }, n.ec), React.createElement("div", {
            className: "fontWeight-bold dsp-iblk ft-c-16 fts-15 mg-t-5 uppercase"
        }, React.createElement("span", {
            className: "sportName"
        }, n.n), React.createElement("div", {
            className: "fontWeight-normal ft-c-25 fts-13 txt-idt-1"
        }, l.HP_ViewEvent)));
    },
    _viewAll: function(n) {
        Action.LoadSite(n);
    }
});
Homepage.prestartPanel = React.createClass({
    displayName: "prestartPanel",
    render: function() {
        var t = this.props.data
          , n = t.extraData
          , i = {
            data: t.hl,
            isHidden: !n.isDisplayHL,
            sportType: "HL",
            extraData: n
        }
          , r = {
            data: t.ss,
            isHidden: n.isDisplayHL,
            sportType: "SS",
            extraData: n
        };
        return React.createElement("div", {
            className: "radius bg-c-1 pd-6 mg-t-10 in-play"
        }, React.createElement(Homepage.header, {
            isInplay: !1
        }), React.createElement("div", null , React.createElement("table", {
            className: "tb-featureEvent odds-large t-a-c odds-large"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", {
            className: "fts-13"
        }, React.createElement("tr", null , React.createElement("td", {
            className: " pd-t-11 pd-b-10 t-a-r pd-r-15"
        }, React.createElement("div", {
            onClick: this._toggleContent.bind(this, !0),
            className: "dsp-blk t-a-c bt-tab bg-c-41 height-35 ft-c-3 fts-14 singleButton radius" + (n.isDisplayHL ? " actived" : "")
        }, l.HP_Highlights)), React.createElement("td", {
            className: "pd-l-15 pd-t-11 pd-b-10 t-a-l"
        }, React.createElement("div", {
            onClick: this._toggleContent.bind(this, !1),
            className: "dsp-blk t-a-c bt-tab bg-c-41 height-35 ft-c-3 fts-14 singleButton radius" + (n.isDisplayHL ? "" : " actived")
        }, l.LP_StartingSoonMenu))))), React.createElement(Homepage.prestartPanel.sportContent, {
            data: i
        }), React.createElement(Homepage.prestartPanel.sportContent, {
            data: r
        })));
    },
    _toggleContent: function(n) {
        var t = this.props.data;
        (n && t.hl.length > 0 || !n && t.ss.length > 0) && Action.Homepage.toggleSportsContent(n);
    }
});
Homepage.prestartPanel.sportContent = React.createClass({
    displayName: "sportContent",
    render: function() {
        var n = this.props.data, t, i, r, u;
        return data = n.data,
        extraData = n.extraData,
        t = !0,
        i = data.slice(0, 3).map(function(i) {
            var r = {
                data: i,
                isFirstSport: t,
                isInplay: !1,
                sportType: n.sportType,
                extraData: extraData
            }
              , u = React.createElement(Homepage.sport, {
                key: "hp_" + n.sportType + "_" + i.k,
                data: r
            });
            return t && (t = !1),
            u;
        }),
        data.length > 3 && (u = n.sportType == "HL" ? data.slice(3, 7) : _.drop(data, 3),
        r = _.chunk(u, 2).map(function(t) {
            var i = "oths_" + t[0].k + (t[1] != null ? "_" + t[1].k : "");
            return React.createElement(Homepage.prestartPanel.otherSports, {
                key: i,
                data: t,
                sportType: n.sportType
            });
        })),
        React.createElement("div", {
            className: n.isHidden ? "hidden" : ""
        }, i, r);
    }
});
Homepage.prestartPanel.otherSports = React.createClass({
    displayName: "otherSports",
    mixins: [Homepage.Utility.link],
    render: function() {
        var n = this._createSportLinks(this.props.data, this.props.sportType == "HL");
        return React.createElement("table", {
            className: "tb-featureEvent odds-large t-a-c odds-large mg-t-10 topBorder_2px"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", {
            className: "fts-13"
        }, n));
    },
    _createSportLinks: function(n, t) {
        var r = n[0]
          , i = n[1]
          , u = t ? this._createHLSportLinkCells : this._createSSSportLinkCells
          , f = u(r, r.ec, !0)
          , e = i == null ? [] : u(i, i.ec, !1)
          , s = t ? Math.max(f.length, e.length) : 2
          , o = "oths_" + r.k;
        return i != null && (o += "_" + i.k),
        this._createLinkRows(f, e, s, o);
    },
    _createLinkRows: function(n, t, i, r) {
        for (var f = [], e, u = 0; u < i; u++)
            e = r + "_" + u,
            f.push(this._createLinkRow(n[u], t[u], e));
        return f;
    },
    _createLinkRow: function(n, t, i) {
        var r = n == null ? React.createElement("td", null ) : n
          , u = t == null ? React.createElement("td", null ) : t;
        return React.createElement("tr", {
            key: i
        }, r, u);
    },
    _createHLSportLinkCells: function(n, t, i) {
        var u = [], a = {
            sid: n.k,
            n: n.n,
            en: n.en,
            tc: n.tec,
            tmrc: n.tmec
        }, f, r, e, o, s, h, c;
        return u.push(React.createElement(Homepage.prestartPanel.otherSports.titleCell, {
            data: a
        })),
        n.or ? f = _.take(n.c, 3) : (n.k == 1 ? (s = n.tec != null ? n.tec : n.tmec != null ? n.tmec : 0,
        e = n.tec != null ? l.HP_TodayMatches : n.tmec != null ? l.HP_TomorrowMatches : null ,
        o = n.tec != null ? this._getFootballTodayLink() : n.tmec != null ? this._getFootballTomorrowLink() : null ,
        e != null && (r = {
            n: e,
            ec: s,
            link: o
        })) : r = {
            n: l.HP_AllMatches,
            ec: t,
            link: this._getSportLink(!1, n.k)
        },
        r != null && u.push(React.createElement(Homepage.sport.linkCell, {
            data: r,
            odd: i
        })),
        f = _.take(n.c, r == null ? 3 : 2)),
        h = this._getLinkCellProps,
        c = f.map(function(t) {
            return React.createElement(Homepage.sport.linkCell, {
                data: h(n, t, !0),
                odd: i
            });
        }),
        u.concat(c);
    },
    _createSSSportLinkCells: function(n, t, i) {
        var r = []
          , u = {
            sid: n.k,
            n: n.n,
            en: n.en,
            tc: n.tec,
            tmrc: n.tmec
        };
        return r.push(React.createElement(Homepage.prestartPanel.otherSports.titleCell, {
            data: u
        })),
        r.push(React.createElement(Homepage.sport.linkCell, {
            data: this._getLinkCellProps(n, null , !1),
            odd: i
        })),
        r;
    },
    _getLinkCellProps: function(n, t, i) {
        return {
            ec: i ? t.ec : n.ec,
            n: i ? t.n : l.LP_StartingSoonMenu,
            link: i ? this._getCompetitionLink(n.k, t.k) : this._getSportStartingSoonLink(n.k)
        };
    }
});
Homepage.prestartPanel.otherSports.titleCell = React.createClass({
    displayName: "titleCell",
    mixins: [Homepage.Utility.link],
    render: function() {
        var n = this.props.data;
        return React.createElement("td", {
            className: " pd-l-10 pd-t-10 pd-b-10 t-a-l pd-r-15 clickableTitle",
            onClick: this._clickHeader
        }, React.createElement("div", {
            className: "float-right fts-27 ft-c-26 icon-" + n.sid
        }), React.createElement("div", {
            className: "fontWeight-bold dsp-iblk dark ft-c-16 fts-15 mg-t-5 uppercase"
        }, n.n));
    },
    _clickHeader: function() {
        var n = this.props.data
          , i = VIEW.PRESTART
          , t = {
            sid: n.sid,
            sen: n.en.replace(/\s/g, "-")
        };
        n.sid == 1 && (t.tc = n.tc,
        t.tmrc = n.tmrc);
        Action.LeftPanel.sport(t, i);
    }
});
Homepage.header = React.createClass({
    displayName: "header",
    mixins: [Homepage.Utility.link],
    render: function() {
        var t, n, i = this.props.isInplay;
        return i ? (t = React.createElement("div", {
            className: "round-moreBet round bg-c-2 ft-c-3 dsp-iblk float-right fts-15 t-a-c fontWeight-bold"
        }, this.props.ec),
        n = l.LP_Inplay) : n = l.MyAcc_Sports,
        React.createElement("div", {
            className: "featureEvent-header"
        }, React.createElement("div", {
            className: "bg-c-10 radius ft-c-14 fts-16 pd-t-15 pd-b-13 lht-0p8 fontWeight-bold pd-r-13 pd-l-10" + (i ? " inplayHeader" : ""),
            onClick: this._clickHeader
        }, t, n.toUpperCase()));
    },
    _clickHeader: function() {
        this.props.isInplay && Action.LoadSite(this._getAllInplayLink());
    }
});
Homepage.sport = React.createClass({
    displayName: "sport",
    mixins: [Homepage.Utility.link],
    render: function() {
        var i = this.props.data, n = i.data, c = i.extraData, h = "tb-featureEvent odds-large t-a-c odds-large", r, u, e;
        for (i.isFirstSport || (h += " topBorder_2px mg-t-10"),
        r = [],
        u = 0; u < n.c.length; u++)
            r = r.concat(n.c[u].e);
        var o = !0, t = i.isInplay, a = n.rd == "1X2", s = i.sportType, v = r.map(function(i) {
            var r = {
                data: i,
                showScore: t ? n.cds : !1,
                isFirstEvt: o,
                isInplay: t,
                rd: n.rd,
                sportId: n.k,
                isNetSports: n.isNetSports,
                sportType: s,
                extraData: c,
                cols: n.rd == "1X2" ? 6 : 5
            }
              , u = React.createElement(Homepage.sport.eventItem, {
                key: i.k,
                data: r
            });
            return o && (o = !1),
            u;
        }), f;
        switch (s) {
        case "IP":
            f = React.createElement(Homepage.sport.bottomLink, {
                txt: l.LP_All + " " + n.n + " " + l.LP_Inplay,
                count: n.ec,
                url: this._getSportLink(!0, n.k)
            });
            break;
        case "HL":
            f = React.createElement(Homepage.sport.bottomLinkMultiple, {
                ec: n.ec,
                data: n
            });
            break;
        case "SS":
            f = React.createElement(Homepage.sport.bottomLink, {
                txt: l.LP_All + " " + n.n + " " + l.LP_StartingSoonMenu,
                count: n.ec,
                url: this._getSportStartingSoonLink(n.k)
            });
        }
        return e = {
            isInplay: t,
            isSS: s == "SS",
            sid: n.k,
            sportName: n.n,
            en: n.en,
            evtCount: n.ec,
            is1X2: a,
            url: t ? this._getSportLink(t, n.k) : null
        },
        n.k == 1 && (e.tc = n.tec,
        e.tmrc = n.tmec),
        React.createElement("div", null , React.createElement("table", {
            className: h
        }, React.createElement(Homepage.sport.colgroup, {
            rd: n.rd,
            isInplay: t,
            isns: n.isNetSports
        }), React.createElement(Homepage.sport.sportsHeader, {
            data: e
        }), v), f);
    }
});
Homepage.sport.colgroup = React.createClass({
    displayName: "colgroup",
    render: function() {
        var t = this.props.rd, n, i = this.props.isInplay;
        return t == "1X2" && (n = React.createElement("col", {
            className: "col-fixedodds"
        })),
        React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: this.props.isns ? "" : "col-fixedodds"
        }), React.createElement("col", {
            className: "col-fixedodds"
        }), n, React.createElement("col", {
            className: "col-fixedodds"
        }), React.createElement("col", {
            className: "col-fixed51"
        }));
    }
});
Homepage.sport.sportsHeader = React.createClass({
    displayName: "sportsHeader",
    mixins: [Homepage.Utility.link],
    render: function() {
        var n = this.props.data, t, i;
        return n.is1X2 && (t = React.createElement("th", {
            className: "pd-t-10"
        }, "X")),
        n.isInplay || (i = React.createElement("th", {
            className: "t-a-r pd-r-13 pd-t-10"
        }, React.createElement("div", {
            className: "icon-" + n.sid + " fts-27 ft-c-26"
        }))),
        React.createElement("thead", null , React.createElement("tr", {
            className: "ft-c-16 fts-15 moreBet1x2",
            onClick: this._clickHeader
        }, React.createElement("th", {
            className: "t-a-l pd-l-10 pd-t-10 sportName uppercase",
            colSpan: "2"
        }, n.sportName), React.createElement("th", {
            className: "pd-t-10"
        }, "1"), t, React.createElement("th", {
            className: "pd-t-10"
        }, "2"), i));
    },
    _clickHeader: function() {
        var n = this.props.data
          , i = n.isInplay ? VIEW.INPLAY : n.isSS ? VIEW.STARTINGSOON : VIEW.PRESTART
          , t = {
            sid: n.sid,
            sen: n.en.replace(/\s/g, "-")
        };
        t.sid == 1 && (t.tc = n.tc,
        t.tmrc = n.tmrc);
        Action.LeftPanel.sport(t, i);
    },
    _showSportAllInplay: function() {
        var n = this.props.data;
        n.isInplay && Action.LoadSite(n.url);
    }
});
Homepage.sport.eventItem = React.createClass({
    displayName: "eventItem",
    mixins: [Homepage.Utility.odds, Homepage.Utility.link, Homepage.Utility.pnc],
    render: function() {
        var t = this.props.data, a = t.sportId, n = t.data, f = t.isInplay, ut = t.extraData, g = "fts-13 selection", r, p, it, b, d;
        t.isFirstEvt || (g += " topBorder");
        this._displayChildTag(n.cei.ctid) && (r = React.createElement("tr", {
            className: "fontWeight-bold ft-c-16 fts-15"
        }, React.createElement("td", {
            className: "t-a-l pd-l-10" + (t.isFirstEvt ? "" : " topBorder"),
            colSpan: "2"
        }), React.createElement("td", {
            colSpan: "3",
            className: "ft-c-5 fontWeight-normal fts-12 pd-t-10" + (t.isFirstEvt ? "" : " topBorder")
        }, this._getChildTag(n.cei.ctid))));
        var h = t.rd
          , nt = h == "1X2"
          , tt = t.sportType
          , v = t.showScore
          , y = t.isNetSports
          , e = {
            hn: n.i[0],
            an: n.i[1]
        };
        v && (e.hs = n.i[10],
        e.as = n.i[11]);
        h == "HDP" && n.o.ah && (e.hb = this._needBlackTeamName(n.o.ah[1]),
        e.ab = this._needBlackTeamName(n.o.ah[3]));
        y && f && (p = n.i[37] != "0" ? React.createElement(Homepage.sport.score.netSport, {
            data: {
                sb: n.sb,
                sid: a,
                eid: n.k,
                topBorder: !t.isFirstEvt && r == null
            }
        }) : React.createElement("td", {
            className: "ft-c-16 t-a-r" + (t.isFirstEvt ? "" : " topBorder")
        }, React.createElement("div", {
            className: "pd-r-10"
        }, l.LiveText)));
        var w = this._getOddsByRegion(h, n)
          , u = []
          , s = "pd-t-10 pd-b-10" + (t.isFirstEvt || r != null ? "" : " topBorder");
        w == null ? (u.push(React.createElement("td", {
            key: n.k + "_empty1",
            className: s
        }, React.createElement(Homepage.sport.oddsEmpty, null ))),
        u.push(React.createElement("td", {
            key: n.k + "_empty2",
            className: s
        }, React.createElement(Homepage.sport.oddsEmpty, null ))),
        nt && u.push(React.createElement("td", {
            key: n.k + "_empty3",
            rowSpan: "2",
            className: s
        }, React.createElement(Homepage.sport.oddsEmpty, null )))) : (it = n.i[10] + ":" + n.i[11],
        b = this._getBaseOddsProp,
        _.forEach(w, function(t) {
            if (t.odds == 0)
                u.push(React.createElement("td", {
                    key: t.sid,
                    className: s
                }, React.createElement(Homepage.sport.oddsLock, null )));
            else {
                var i = _.assign(b(n, f), t);
                u.push(React.createElement("td", {
                    key: t.sid,
                    className: s
                }, React.createElement(Homepage.sport.odds, {
                    data: i
                })));
            }
        }));
        var c = {
            morebetcount: n.i[32],
            url: this._getMorebetLink(n.cei.ctid == o.pacType.par ? n.k : n.pk, f ? VIEW.INPLAY : VIEW.PRESTART, n.i[36]),
            isMin: !0
        }, rt = React.createElement(Homepage.sport.morebet, {
            data: c
        }), i = {
            isInplay: f,
            topBorder: !t.isFirstEvt && r == null ,
            sid: a
        }, k;
        return f ? (i.showScore = v,
        i.period = n.i[31],
        i.time = HP_Store.initTimerString(n.i[5])) : (i.edt = n.edt,
        tt == "SS" ? (i.isSS = !0,
        i.mts = n.mts) : i.isSS = !1,
        n.o != null && n.o.eps != null && n.o.eps.o != null && n.o.eps.o.length > 0 && (k = React.createElement("tr", null , React.createElement("td", {
            colSpan: t.cols
        }, React.createElement(Homepage.secondaryFeatureEvent.eps, {
            pdb: !0,
            url: c.url
        }))))),
        y || (d = React.createElement(Homepage.sport.periodAndTime, {
            data: i
        })),
        React.createElement("tbody", {
            className: "hovertby fts-13 selection cr-pointer"
        }, r, React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-l-10" + (t.isFirstEvt || r != null ? "" : " topBorder"),
            onClick: this._gotoAMPage.bind(this, c.url)
        }, React.createElement(Homepage.sport.scoreAndTeamName, {
            data: e
        })), d, p, u, React.createElement("td", {
            className: "t-a-r" + (t.isFirstEvt || r != null ? "" : " topBorder")
        }, rt)), k);
    },
    _gotoAMPage: function(n) {
        Action.LoadSite(n);
    }
});
Homepage.sport.scoreAndTeamName = React.createClass({
    displayName: "scoreAndTeamName",
    render: function() {
        var n = this.props.data, t, i;
        return n.hs != null && (t = React.createElement("td", {
            className: "ft-c-16 "
        }, n.hs)),
        n.as != null && (i = React.createElement("td", {
            className: "ft-c-16 "
        }, n.as)),
        React.createElement("table", {
            className: "lht-1p4"
        }, React.createElement("tbody", null , React.createElement("tr", null , t, React.createElement("td", {
            className: t != null ? " pd-l-20" : ""
        }, React.createElement(Homepage.sport.team, {
            data: {
                black: n.hb,
                n: n.hn,
                url: n.url
            }
        }))), React.createElement("tr", null , i, React.createElement("td", {
            className: i != null ? " pd-l-20" : ""
        }, React.createElement(Homepage.sport.team, {
            data: {
                black: n.ab,
                n: n.an,
                url: n.url
            }
        })))));
    }
});
Homepage.sport.score = React.createClass({
    displayName: "score",
    render: function() {
        return React.createElement("td", {
            className: "t-a-l pd-l-10 ft-c-16"
        }, React.createElement("div", {
            className: "pd-t-1 pd-b-3"
        }, this.props.score));
    }
});
Homepage.sport.score.netSport = React.createClass({
    displayName: "netSport",
    render: function() {
        var r = this.props.data, t = r.sb, e = r.sid, f = r.eid, u = [], i, n;
        if (t != null )
            if (e == 3)
                for (i = 0; i < t.ps.length; i++)
                    n = f + "_ns_" + i,
                    u.push(React.createElement(Homepage.sport.score.netSport.scoreItem, {
                        key: n,
                        data: t.ps[i]
                    }));
            else
                n = f + "_ns_ft",
                u.push(React.createElement(Homepage.sport.score.netSport.scoreItem, {
                    key: n,
                    data: t.ft
                })),
                n = f + "_ns_c",
                u.push(React.createElement(Homepage.sport.score.netSport.scoreItem, {
                    key: n,
                    data: t.ps.length > 0 ? t.ps[0] : null
                }));
        return React.createElement("td", {
            className: "ft-c-23 t-a-r" + (r.topBorder ? " topBorder" : ""),
            rowSpan: "2"
        }, u);
    }
});
Homepage.sport.score.netSport.scoreItem = React.createClass({
    displayName: "scoreItem",
    render: function() {
        var n = this.props.data;
        return n == null ? React.createElement("div", null ) : React.createElement("div", {
            className: "dsp-iblk scoreRow" + (n.ic ? " ft-c-16" : "")
        }, React.createElement("div", null , n.h), React.createElement("div", null , n.a));
    }
});
Homepage.sport.team = React.createClass({
    displayName: "team",
    render: function() {
        var n = this.props.data;
        return React.createElement("div", {
            className: "ft-c-" + (n.black ? 4 : 25)
        }, n.n);
    }
});
Homepage.sport.periodAndTime = React.createClass({
    displayName: "periodAndTime",
    mixins: [Homepage.Utility.timer],
    render: function() {
        var n = this.props.data, r, u, f, e, t, i;
        return n.isInplay ? (n.showScore && (r = React.createElement("div", {
            title: this._getLongPeriod(n.period)
        }, this._getShortPeriod(n.period)),
        n.time && n.time != "" && (u = n.sid == 2 ? React.createElement("div", null , n.time) : React.createElement(Homepage.sport.iptime, {
            data: {
                "class": "",
                t: n.time
            }
        }))),
        n.sid != 1 && n.sid != 2 && n.sid != 19 && (f = React.createElement("div", {
            className: "ft-c-16"
        }, l.LiveText))) : n.isSS ? (i = parseFloat(n.mts),
        t = React.createElement("div", {
            className: "dark ft-c-16"
        }, i + (i == 1 ? " " + l.HP_Min : " " + l.HP_Mins))) : (e = React.createElement("div", null , this._getEventDateForPreStart(n.edt)),
        t = React.createElement("div", null , this._getEventStartTime(n.edt))),
        React.createElement("td", {
            className: "ft-c-23 pd-r-10" + (n.topBorder ? " topBorder" : "")
        }, f, r, u, e, t);
    }
});
Homepage.sport.odds = React.createClass({
    displayName: "odds",
    mixins: [Homepage.Utility.oddsBtn],
    render: function() {
        var n = this.props.data, u, f, i, t, r;
        return n.OU && n.OU != "" && (u = React.createElement("span", {
            className: "ou ft-c-24 fontWeight-normal"
        }, n.OU)),
        i = "odds",
        n.hdp && (n.chdp == null || n.chdp != "") ? f = React.createElement("span", {
            className: "upInt dsp-blk ft-c-16 fontWeight-normal"
        }, u, React.createElement("span", {
            className: "handicap"
        }, n.chdp == null ? n.hdp : n.chdp)) : i += " singleOdds",
        n.odds < 0 && (i += " negOdds"),
        t = null ,
        _.includes(n.oddsUp, n.sid) ? t = "oddsUp" : _.includes(n.oddsDown, n.sid) && (t = "oddsDown"),
        r = ["OddsWrapper"],
        n.isHL && r.push("selected"),
        t != null && r.push(t),
        React.createElement("div", {
            className: "odds-container",
            title: n.ttp
        }, React.createElement("div", {
            className: r.join(" ")
        }, React.createElement("span", {
            onClick: this._addSelection,
            className: i
        }, f, n.odds)));
    }
});
Homepage.sport.oddsLock = React.createClass({
    displayName: "oddsLock",
    render: function() {
        var n = this.props.isRight;
        return React.createElement("div", {
            className: "OddsWrapper" + (n ? " float-right" : "")
        }, React.createElement("span", {
            className: "odds locked singleOdds"
        }, React.createElement("span", {
            className: "icon-Lock"
        }), React.createElement("svg", {
            width: "37",
            height: "20",
            className: "lockedBg"
        }, React.createElement("rect", {
            width: "100%",
            height: "100%",
            fill: "url(#p1)"
        }))));
    }
});
Homepage.sport.oddsEmpty = React.createClass({
    displayName: "oddsEmpty",
    render: function() {
        return React.createElement("div", {
            className: "OddsWrapper dsp-iblk",
            onClick: this._handleClick
        }, React.createElement("span", {
            className: "odds odds-empty"
        }));
    },
    _handleClick: function(n) {
        n.preventDefault();
        n.stopPropagation();
    }
});
Homepage.sport.morebet = React.createClass({
    displayName: "morebet",
    render: function() {
        var n = this.props.data
          , t = ["t-a-c", "bt-moreBet", "bg-c-41", "radius", "ft-c-3 ", "fts-12"];
        return n.height != null ? t.push("height-" + n.height) : t.push("height-40"),
        n.isMin && t.push("bt-moreBet-min"),
        n.morebetcount == null && t.push("empty"),
        n.height == 50 && t.push("lht-50"),
        React.createElement("div", {
            title: l.OP_ViewAllMarkets,
            onClick: this._clickMoreBet.bind(this, n.url),
            className: t.join(" ")
        }, n.morebetcount, React.createElement("span", {
            className: "icon-ArrowMoreBets"
        }));
    },
    _clickMoreBet: function(n) {
        Action.LoadSite(n);
    }
});
Homepage.sport.iptime = React.createClass({
    displayName: "iptime",
    mixins: [Homepage.Utility.timer],
    getInitialState: function() {
        return this._defaultState();
    },
    componentDidMount: function() {
        Timer.store.Timer.listen(this._tick);
    },
    render: function() {
        var n = this.props.data;
        return React.createElement("span", {
            className: n["class"]
        }, this._getIPTime(n.t, this.state.elapsed));
    },
    _defaultState: function() {
        return {
            elapsed: 0
        };
    },
    _tick: function(n) {
        this.state.elapsed = n.tick;
        this.setState(this.state);
    }
});
Homepage.sport.bottomLink = React.createClass({
    displayName: "bottomLink",
    render: function() {
        return React.createElement("div", {
            onClick: this._handleClick.bind(this, this.props.url),
            className: "mg-t-6 t-a-c bt-moreBet-enlarge bg-c-27 height-40 radius ft-c-21 fts-13 pd-l-55"
        }, React.createElement("span", {
            className: "bg-c-11 height-40 float-right ft-c-25 radius bt-moreBet-arrowContainer"
        }, this.props.count, React.createElement("span", {
            className: "icon-ArrowMoreBets"
        })), this.props.txt);
    },
    _handleClick: function(n) {
        Action.LoadSite(n);
    }
});
Homepage.sport.bottomLinkMultiple = React.createClass({
    displayName: "bottomLinkMultiple",
    mixins: [Homepage.Utility.link],
    render: function() {
        var n = this.props.data, h = this.props.ec, u, o, s, f, i, e;
        if (n.c.length == 0)
            return null ;
        var c = n.or ? 4 : 3
          , a = n.c.slice(0, c)
          , v = this._createLinkCellProps
          , t = a.map(function(t) {
            return v(n.k, t);
        })
          , r = null ;
        for (n.or || (n.k == 1 ? (s = n.tec != null ? n.tec : n.tmec != null ? n.tmec : 0,
        u = n.tec != null ? l.HP_TodayMatches : n.tmec != null ? l.HP_TomorrowMatches : null ,
        o = n.tec != null ? this._getFootballTodayLink() : n.tmec != null ? this._getFootballTomorrowLink() : null ,
        u != null && (r = {
            n: u,
            ec: s,
            link: o
        })) : r = {
            n: l.HP_AllMatches,
            ec: h,
            link: this._getSportLink(!1, n.k)
        }),
        r != null && (t = [r].concat(t)),
        t = _.chunk(t, 2),
        f = [],
        i = 0; i < t.length; i++)
            t[i].length > 1 && (e = React.createElement(Homepage.sport.linkCell, {
                data: t[i][1]
            })),
            f.push(React.createElement("tr", {
                key: "blm_" + n.k + "_" + i
            }, React.createElement(Homepage.sport.linkCell, {
                data: t[i][0],
                odd: !0
            }), e)),
            e = null ;
        return React.createElement("table", {
            className: "tb-featureEvent odds-large t-a-c odds-large"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", {
            className: "fts-13"
        }, f));
    },
    _createLinkCellProps: function(n, t) {
        return {
            n: t.n,
            ec: t.ec,
            link: this._getCompetitionLink(n, t.k)
        };
    }
});
Homepage.sport.linkCell = React.createClass({
    displayName: "linkCell",
    render: function() {
        var n = this.props.data;
        return React.createElement("td", {
            className: "pd-t-6" + (this.props.odd ? " pd-r-3" : " pd-l-3")
        }, React.createElement("div", {
            className: "dsp-tb ",
            onClick: this._handleClick
        }, React.createElement("div", {
            className: "t-va-m pd-l-10 t-a-l bt-moreBet-enlarge bg-c-27 height-40 radius ft-c-25 fts-12 dsp-tbcl  pd-r-60 pos-relative"
        }, React.createElement("span", {
            className: " bg-c-11 height-40 float-right ft-c-25 radius bt-moreBet-arrowContainer t-a-c pos-absolute fontWeight-bold"
        }, n.ec, React.createElement("span", {
            className: "icon-ArrowMoreBets"
        })), React.createElement("table", {
            className: "width-100p height-40 lht-1e"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", null , n.n)))))));
    },
    _handleClick: function() {
        Action.LoadSite(this.props.data.link);
    }
});

AllMarketPage = React.createClass({
    displayName: "AllMarketPage",
    getInitialState: function() {
        return {
            data: AMStore.getAMData(),
            showMoreEventIds: AMStore.getShowMoreEventIds(),
            filterParam: AMStore.getFilterParam(),
            showOddsTypeDDL: AMStore.chkShowOddsTypeDDL(),
            showMyMarkets: AMStore.chkShowMyMarkets(),
            oddsChange: AMStore.getOddsChange(),
            oddsType: AMStore.getOddsType(),
            elapsed: AMStore.getElapsed()
        };
    },
    componentDidMount: function() {
        AMStore.addUpdateListener(this._onUpdate);
        setTimeout(function() {
            ScrollerBar.initScrollbarStatus();
        }, 50);
    },
    componentDidUpdate: function() {
        this.state.data.v != 0 && mpc.pv == 2 && (Action.ProcessingFinish(),
        setTimeout(function() {
            ScrollerBar.initScrollbarStatus();
            AMStore.getFirstLoad() && (AMStore.setFirstLoad(!1),
            ScrollerBar.scrollToTop());
        }, 50));
    },
    statics: {
        getBetTypeName: function(n, t, i, r) {
            var u;
            switch (n.slice(0, 2)) {
            case "ah":
                u = l.MB_HDC;
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
                u = l.MB_SB;
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
            }
            return n == "spwos" && (u = i),
            u;
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
                return l.Period_1S;
            case "s2":
                return l.Period_2S;
            case "s3":
                return l.Period_3S;
            case "s4":
                return l.Period_4S;
            case "s5":
                return l.Period_5S;
            case "s6":
                return l.Period_6S;
            case "s7":
                return l.Period_7S;
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
                return t == 2 ? l.tiOT : l.Period_OT;
            }
            switch (n.substr(n.length - 3)) {
            case "1st":
                return l.Period_1H;
            }
            switch (n.substr(n.length - 4)) {
            case "f5in":
                return l.Period_1st5Innings;
            case "pens":
                return l.tiPens;
            default:
                return "";
            }
        },
        isTableTennisOrBadmintion: function(n) {
            return n == 20 || n == 9;
        },
        getPretermName: function(n, t, i) {
            if (i == 1 && _.contains([0, 3, 5, 6], t))
                switch (n.slice(0, 2)) {
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_Goals, !1);
                }
            if (i == 2)
                switch (n.slice(0, 2)) {
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_TotalPoints, !1);
                }
            if (i == 3) {
                switch (n) {
                case "ah":
                    return this.preternFixed(l.PreTern_Set, !0);
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_TotalSets, !1);
                }
                switch (n.slice(0, 2)) {
                case "ah":
                    return this.preternFixed(l.PreTern_Game, !0);
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_TotalGames, !1);
                }
            }
            if (_.contains([9, 20], i)) {
                switch (n) {
                case "ah":
                    return this.preternFixed(l.PreTern_Game, !0);
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_TotalGames, !1);
                }
                switch (n.slice(0, 2)) {
                case "ah":
                    return this.preternFixed(l.PreTern_Point, !0);
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_TotalPoints, !1);
                }
            }
            if (i == 13) {
                switch (n) {
                case "ah":
                    return this.preternFixed(l.PreTern_Set, !0);
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_TotalSets, !1);
                }
                switch (n.slice(0, 2)) {
                case "ah":
                    return this.preternFixed(l.PreTern_Point, !0);
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_TotalPoints, !1);
                }
            }
            if (_.contains([19, 26], i))
                switch (n.slice(0, 2)) {
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_Goals, !0);
                }
            if (i == 21)
                switch (n.slice(0, 2)) {
                case "ah":
                    return this.preternFixed(l.PreTern_Frame, !0);
                case "ou":
                case "oe":
                    return this.preternFixed(l.PreTern_TotalFrames, !1);
                }
            return "";
        },
        preternFixed: function(n, t) {
            return n != "" ? n + (t ? " " : " : ") : "";
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
                i = l.MB_HDC;
            }
            return i;
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
                r = l.MB_OU;
            }
            return r;
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
                r = l.MB_OE;
            }
            return r;
        },
        isNetSport: function(n) {
            return _.contains([3, 9, 13, 20, 27], +n);
        },
        padZeroLeft: function(n, t) {
            return _.padLeft(n, t, "0");
        }
    },
    render: function() {
        var i, b, k;

        if (this.state.data.v == 0 || mpc.pv != 2)
            return null ;
        var n = this.state.data.d.k, d = this.state.data.d.c[0].e[0].k, r = this.state.data.d.c[0].e[0].i[0], u = this.state.data.d.c[0].e[0].i[1], e = this.state.data.d.c[0].e[0].i[10], o = this.state.data.d.c[0].e[0].i[11], s = AMStore.getHighlightIds(), h = this.state.oddsChange, f = this.state.oddsType, c = this.state.showMoreEventIds, a = this.state.filterParam, t = this.state.data.d.tn.split(":")[1] == "inplay", y = this.state.data.d.c[0].e[0].i[37], g = this.state.data.d.c[0].e[0].i[7] != "" && uv.login, nt = this.state.data.d.c[0].e[0].ibs && this.state.data.d.c[0].e[0].ibsc && this.state.data.d.c[0].e[0].i[7] == "", tt = {
            sn: this.state.data.d.n,
            sid: n,
            eid: d,
            cn: this.state.data.d.c[0].n,
            hn: r,
            an: u,
            ip: t,
            ibs: this.state.data.d.c[0].e[0].ibs,
            isShowTv: g,
            isShowBG: nt,
            lsid: this.state.data.d.c[0].e[0].i[7],
            pvdr: this.state.data.d.c[0].e[0].pvdr,
            showOddsTypeDDL: this.state.showOddsTypeDDL,
            oddsType: f
        }, v = _.filter(_.map(this.state.data.d.c[0].e[0].o, function(i, l) {
            if (typeof i.f == "undefined" && a.filteredType != "" || a.filteredType != "" && i.f.indexOf(a.filteredType) == -1)
                return null ;
            var v = {
                sID: n,
                homeName: r,
                awayName: u,
                homeScore: e,
                awayScore: o,
                childHomeScore: i.scoh,
                childAwayScore: i.scoa,
                childEventName: typeof i.cn == "undefined" || i.cn == "" ? "" : i.cn,
                pretermName: AllMarketPage.getPretermName(i.mt, i.ctid, n),
                betTypeName: AllMarketPage.getBetTypeName(i.mt, i.ctid, i.n, n),
                period: AllMarketPage.getPeriod(i.mt, n),
                inPlay: t,
                market: i,
                highLightOdds: s,
                oddsChange: h,
                oddsType: f,
                showMoreEventIds: c,
                bestOf: y,
                isMyMk: !1
            };
            return React.createElement(AllMarketPage.Market, {
                key: "m" + l,
                data: v
            });
        }), null ), p = _.map(this.state.data.d.c[0].e[0].myo, function(i, l) {
            var a = {
                sID: n,
                homeName: r,
                awayName: u,
                homeScore: e,
                awayScore: o,
                childHomeScore: i.scoh,
                childAwayScore: i.scoa,
                childEventName: typeof i.cn == "undefined" || i.cn == "" ? "" : i.cn,
                pretermName: AllMarketPage.getPretermName(i.mt, i.ctid, n),
                betTypeName: AllMarketPage.getBetTypeName(i.mt, i.ctid, i.n, n),
                period: AllMarketPage.getPeriod(i.mt, n),
                inPlay: t,
                market: i,
                highLightOdds: s,
                oddsChange: h,
                oddsType: f,
                showMoreEventIds: c,
                bestOf: y,
                isMyMk: !0
            };
            return React.createElement(AllMarketPage.Market, {
                key: "mm" + l,
                data: a
            });
        }), w;
        return this.state.data.d.c[0].e[0].eps && (i = this.state.data.d.c[0].e[0].eps,
        w = {
            sID: n,
            eventId: i.k,
            parentEventId: i.k,
            childEventTypeId: null ,
            score: e + ":" + o,
            child_score: ":",
            isAH: !1,
            homeName: r,
            awayName: u,
            inPlay: t,
            market: i,
            odds: i.o,
            highLightOdds: s,
            oddsChange: h,
            oddsType: f,
            showMoreEventIds: c
        }),
        b = {
            event: this.state.data.d.c[0].e[0],
            sportID: this.state.data.d.k,
            inPlay: t,
            competitionName: this.state.data.d.c[0].n,
            elapsed: this.state.elapsed,
            marketsCount: this.state.data.d.c[0].e[0].o.length + this.state.data.d.c[0].e[0].myo.length + (this.state.data.d.c[0].e[0].o.eps ? this.state.data.d.c[0].e[0].eps.length : 0)
        },
        k = function(n, t) {
            if (typeof n == "undefined" || t == "")
                return l.MB_AllMarkets;
            var i = _.pluck(_.filter(n, "ex", t), "tx");
            return i.length == 1 ? i[0] : l.MB_AllMarkets;
        }
        ,
        React.createElement("div", {
            className: "moreBet bg-c-16 mg-b-1" + (this.state.data.v == 0 || mpc.pv != 2 ? " hidden" : "")
        }, React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "37",
            height: "20",
            className: "lockedBg_svg",
            dangerouslySetInnerHTML: {
                __html: '<defs><pattern id="p1" patternUnits="objectBoundingBox" width=".1" height=".1" patternTransform="rotate(45)"><rect width="3" height="100" fill="#000" x="0" y="0" opacity=".06"></rect></pattern></defs>'
            }
        })
        , React.createElement(AllMarketPage.Header, {
            hp: tt
        })
        , React.createElement(AllMarketPage.ScoreBoard, {
            sbParam: b
        }),
        // React.createElement(AllMarketPage.MyMarketList, {
        //     MyMarkets:p,
        //     isShow:this.state.showMyMarkets
        // }), 
        React.createElement(AllMarketPage.FilterButtons, {
            filters: this.state.data.d.fb,
            sportID: this.state.data.d.k,
            inPlay: t,
            filterParam: this.state.filterParam
        }), 

        React.createElement("div", {
            className: "pd-t-10 pd-b-11 pd-r-10 pd-l-10 bg-c-13 topBorder_lv1 overflow-hidden mg-t-2 fontWeight-bold"
        }, React.createElement("span", {
            className: "dsp-iblk fts-16 ft-c-3 lht-14 uppercase"
        }, k(this.state.data.d.fb, this.state.filterParam.filteredType))), React.createElement("div", {
            className: "bg-c-14 fts-13 ft-c-27 pd-t-10 pd-b-10 pd-l-10 pd-r-10 t-a-c" + (v.length > 0 ? " hidden" : "")
        }, React.createElement("span", {
            className: "t-va-m"
        }, v.length == 0 && p.length == 0 ? l.Odds_EventClosed : l.MB_AllAddedToMyMarkets)), React.createElement("div", {
            className: "sportsTable"
        }, React.createElement(AllMarketPage.Market.MarketType.EPS, {
            data: w
        }), v));
    },
    _onUpdate: function() {
        this.setState({
            data: AMStore.getAMData(),
            showMoreEventIds: AMStore.getShowMoreEventIds(),
            filterParam: AMStore.getFilterParam(),
            showOddsTypeDDL: AMStore.chkShowOddsTypeDDL(),
            showMyMarkets: AMStore.chkShowMyMarkets(),
            oddsChange: AMStore.getOddsChange(),
            oddsType: AMStore.getOddsType(),
            elapsed: AMStore.getElapsed()
        });
    }
});
AllMarketPage.Neutral = React.createClass({
    displayName: "Neutral",
    render: function() {
        return React.createElement("span", {
            title: l.neut
        }, React.createElement("span", {
            className: "neutral fts-12 t-va-m dsp-iblk"
        }, React.createElement("span", {
            className: "icon-Neutralbg"
        }), React.createElement("span", {
            className: "icon-NeutralN"
        })));
    }
});

AllMarketPage.Utility = {
    odds: {
        oddsComponentUP_DWN: function(n, t) {
            var f = AMStore.getOddsChange(), u, i, e, o;
            if (!(t.data && (i = t.data.value) && i[0] && i[0] != ""))
                return f;
            var s = (e = i[0].substr(0, 1) == "h") ? 2 : 0
              , r = e ? 3 : 1
              , u = n.data.value;
            return n.data.ot == t.data.ot && u[0] == i[0] && i[r] != "0.00" && u[r] != "0.00" && i[r] != "c" && u[r] != "c" && ((o = oddsUtil.getValueIndicator(+i[r], +u[r])) == 1 ? f.Up.push(i[s]) : o == 2 && f.Down.push(i[s])),
            f;
        },
        addSelection: function(n, t, i, r, u, f, e, o) {
            (o.preventDefault(),
            o.stopPropagation(),
            _.contains(["0.00", "c"], i)) || (Action.AllMarket.highlightOdds(n),
            Action.RightPanel.addSelection(n, t, i, r, u, f, e));
        },
        componentWillReceiveProps: function(n) {
            this.setState({
                oddsChange: this.oddsComponentUP_DWN(n, this.props)
            });
        },
        getUpDownflag: function(n, t) {
            var i = 0;
            return t != "" && (_.contains(n.Up, t) && (i = 1),
            _.contains(n.Down, t) && (i = -1)),
            i;
        }
    },
    market: {
        addSelection: function(n, t) {
            t.preventDefault();
            t.stopPropagation();
            var i = n.value[0] && n.value[0].substr(0, 1) == "h", r, u;
            n.value[0] && (r = i ? n.value[3] : n.value[1]) != "0.00" && (Action.AllMarket.highlightOdds(u = n.value[0].substr(1)),
            Action.RightPanel.addSelection(u, n.eventId, r, i ? n.value[1] : null , n.score, n.inPlay, n.parentEventId));
        },
        isOddsUnaval: function(n) {
            var t = n[1] ? n.length > 3 ? n[3] : n[1] : "";
            return t == "" || t == "0.00" || t == "c" || +t == 0;
        },
        getSnameOrMname: function(n, t, i) {
            var r = n.split(i);
            if (r.length > 1)
                switch (t) {
                case 0:
                    return r[0];
                case 1:
                    return r[1];
                case 2:
                    return r[r.length - 1];
                }
            else
                return n;
        }
    }
};


AllMarketPage.Header = React.createClass({
    displayName: "Header",
    render: function() {
        var n = this.props.hp, t = {}, i, r, u;
        n.isShowTv ? (i = n.ip ? this._playTV.bind(this, n) : null ,
        t = React.createElement("span", {
            className: "tv dsp-iblk bg-c-12 radius iconbg-s t-va-m mg-r-10",
            title: utility.replaceTooltipBu(n.ip ? l.LP_LiveStreamInplay : l.LP_LiveStream),
            onClick: i
        }, React.createElement("span", {
            className: "dsp-iblk icon-TV2 fts-12 wh-ht-22 lht-22"
        }))) : n.isShowBG && (r = n.ip ? this._playBG.bind(this, n) : null ,
        t = React.createElement("span", {
            className: "pitch dsp-iblk bg-c-12 radius iconbg-s t-va-m mg-r-10",
            title: n.ip ? l.OP_188LiveMatchViewAvailable : l.OP_188MatchLiveMatchViewAvailableInplay,
            onClick: r
        }, React.createElement("span", {
            className: "dsp-iblk icon icon-Pitch fts-15 wh-ht-22 lht-22" + (n.ip ? " green" : "")
        })));
        u = l.HH_EuroOdds_Short;
        switch (n.oddsType) {
        case 1:
            oddsTypeName = l.HH_EuroOdds_Short;
            break;
        case 2:
            oddsTypeName = l.HH_HKOdds_Short;
            break;
        case 3:
            oddsTypeName = l.HH_MalayOdds_Short;
            break;
        case 4:
            oddsTypeName = l.HH_IndoOdds_Short;
        }
        return React.createElement("div", {
            className: "header pd-r-10 pd-l-10 bg-c-13 topBorder_lv1"
        }, React.createElement("table", {
            className: "width-100p height-39"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-fixed25"
        }), React.createElement("col", null ), React.createElement("col", null )), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-va-m"
        }, React.createElement("div", null , React.createElement("span", {
            className: "dsp-iblk icon-BackArrowWithTail fts-16 ft-c-46 lht-22 cr-pointer",
            onClick: this._goToPrevious
        }))), React.createElement("td", null , React.createElement("div", null , React.createElement("span", {
            className: "dsp-iblk fts-18 t-va-m fontWeight-bold ft-c-15 lht-14 mg-r-10 uppercase clickablespname",
            onClick: this._goToMainOdds
        }, n.lip ? l.ip : n.sn), React.createElement("span", {
            className: "dsp-iblk fts-13 t-va-b fontWeight-normal ft-c-27 lht-14 top-2 pos-relative"
        }, n.lip ? "" : n.cn))), React.createElement("td", {
            className: "t-a-r t-va-t pd-t-8"
        }, 

        React.createElement("div", null , 
/*
            React.createElement("div", {
            className: "dsp-iblk"
        }, React.createElement("div", {
            className: "sortOdds fts-12 mg-r-16" + (n.showOddsTypeDDL ? "" : " collapsed"),
            onClick: this._showHideOddsTypeDDL
        }, React.createElement("span", null , l.Odds + ":"), React.createElement("span", {
            className: "sortName"
        }, oddsTypeName), React.createElement("span", {
            className: "pos-relative arrowWithTick"
        }, React.createElement("span", {
            className: "icon-ArrowDown t-va-m"
        }), React.createElement("span", {
            className: "tick dsp-iblk"
        })), React.createElement("div", {
            className: "dropDownContainer"
        }, React.createElement("ul", null , React.createElement("li", {
            className: n.oddsType == 1 ? "actived" : null ,
            onClick: this._setOddsType.bind(this, 1)
        }, React.createElement("table", null , React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed1"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "pd-0"
        }, React.createElement("span", {
            className: "lht-1p1 dsp-iblk mg-t-3"
        }, l.HH_EuroOdds, React.createElement("span", null ))), React.createElement("td", {
            className: "height-37"
        }))))), React.createElement("li", {
            className: n.oddsType == 2 ? "actived" : null ,
            onClick: this._setOddsType.bind(this, 2)
        }, React.createElement("table", null , React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed1"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "pd-0"
        }, React.createElement("span", {
            className: "lht-1p1 dsp-iblk mg-t-3"
        }, l.HH_HKOdds, React.createElement("span", null ))), React.createElement("td", {
            className: "height-37"
        }))))), React.createElement("li", {
            className: n.oddsType == 3 ? "actived" : null ,
            onClick: this._setOddsType.bind(this, 3)
        }, React.createElement("table", null , React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed1"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "pd-0"
        }, React.createElement("span", {
            className: "lht-1p1 dsp-iblk mg-t-3"
        }, l.HH_MalayOdds, React.createElement("span", null ))), React.createElement("td", {
            className: "height-37"
        }))))), React.createElement("li", {
            className: n.oddsType == 4 ? "actived" : null ,
            onClick: this._setOddsType.bind(this, 4)
        }, React.createElement("table", null , React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed1"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "pd-0"
        }, React.createElement("span", {
            className: "lht-1p1 dsp-iblk mg-t-3"
        }, l.HH_IndoOdds, React.createElement("span", null ))), React.createElement("td", {
            className: "height-37"
        }))))))))), 
*/
        React.createElement("span", {
            className: "state dsp-iblk bg-c-12 radius iconbg-s t-va-m mg-r-10",
            title: l.InfoCentre_Statistics
        }, React.createElement(AllMarketPage.Button.Stat, {
            eventId: n.eid
        })), t, React.createElement("span", {
            className: "refresh dsp-iblk bg-c-12 radius iconbg-s t-va-m",
            title: l.OP_Refresh
        }, React.createElement(AllMarketPage.Button.Refresh, null ))))))));
    },
    componentDidMount: function() {
        this.addListener();
    },
    addListener: function() {
        $(document).mouseup(function(n) {
            $(n.target).closest(".sortOdds")[0] === undefined && AMStore.chkShowOddsTypeDDL() && Action.AllMarket.showHideOddsTypeDDL(!1);
        });
    },
    _showHideOddsTypeDDL: function() {
        Action.AllMarket.showHideOddsTypeDDL();
    },
    _setOddsType: function(n, t) {
        t.preventDefault();
        t.stopPropagation();
        OddsHeader.setting.param.OddsType = n;
        OddsHeader.setting.param.IsFirstLoad = !0;
        utility.service("OddsService", "UpdateOddsType", OddsHeader.setting.param, "GET", function(t) {
            t.suc && (settingParam.oddsType = uv.ov = n,
            OddsHeader.saveToCookie(),
            oddsUtil.SetOddsTypeCss(),
            cCtrl.reloadPage());
        });
    },
    _goToPrevious: function() {
        cCtrl.goBackClosePage();
    },
    _goToMainOdds: function() {
        switch (LPM.view) {
        case 0:
            Action.LoadSite("/" + global.lan + "/sports/" + selobj.sptn);
            break;
        case 1:
            Action.LeftPanel.inplay();
            break;
        case 2:
            Action.LoadSite("/" + global.lan + "/sports/" + selobj.sptn + "/popular/full-time-asian-handicap-and-over-under");
        }
    },
    _playBG: function(n) {
        liveCentreControl.playIgnoreLock(n.eid, n.hn, n.an, n.sid, n.lsid, n.pvdr, uv.login);
        lockInfo.isLock && liveCentreControl.saveLockInfo(n.eid, n.hn, n.an, n.sid, global.lan, n.lsid, n.pvdr);
    },
    _playTV: function(n) {
        if (uv.cdbg && n.ibs || n.sid == 1)
            liveCentreControl.playIgnoreLock(n.eid, n.hn, n.an, n.sid, n.lsid, n.pvdr, uv.login),
            lockInfo.isLock && liveCentreControl.saveLockInfo(n.eid, n.hn, n.an, n.sid, global.lan, n.lsid, n.pvdr);
        else {
            var t = screen.width / 2 - 405
              , i = screen.height / 2 - 260
              , r = "center=yes,resizable=yes,scrollbars=yes, width=810, height=520,left=" + t + ",top=" + i;
            window.open("/" + global.lan + "/live-streaming/" + n.eid, "stream", r);
        }
    }
});


AllMarketPage.ScoreBoard = React.createClass({
    _getBGClass: function(n) {
        var t;
        switch (n) {
        case 1:
            t = "sb-football";
            break;
        case 2:
            t = "sb-basketball";
            break;
        case 3:
            t = "sb-tennis";
            break;
        case 4:
            t = "sb-baseball";
            break;
        case 6:
            t = "sb-volleyball";
            break;
        case 7:
            t = "sb-americaFootball";
            break;
        case 9:
            t = "sb-badminton";
            break;
        case 13:
            t = "sb-volleyball";
            break;
        case 14:
            t = "sb-rugby";
            break;
        case 19:
            t = "sb-beachSccore";
            break;
        case 20:
            t = "sb-tableTennis";
            break;
        case 21:
            t = "sb-snooker";
            break;
        case 23:
            t = "sb-eSports";
            break;
        case 26:
            t = "sb-iceHockey";
            break;
        case 27:
            t = "sb-beachVolleyball";
            break;
        default:
            t = "sb-otherSports";
        }
        return t;
    },
    render: function() {


        var sbParam = this.props.sbParam
          , sb = React.createElement(AllMarketPage.ScoreBoardNonInplay, {
            sbParam: sbParam
        })
          , isExpanded = !1;

          //console.log(sbParam.inPlay+"/"+sbParam.sportID)

        if (sbParam.inPlay)
            switch (sbParam.sportID) {
            case 2:
                sb = sbParam.event.i[38] == "True" ? React.createElement(AllMarketPage.ScoreBoardInplay.Basketball, {
                    sbParam: sbParam
                }) : React.createElement(AllMarketPage.ScoreBoardInplay.NoScoreboard, {
                    sbParam: sbParam
                });
                isExpanded = sbParam.event.i[38] == "True";
                break;
            case 6:
                sb = sbParam.event.i[38] == "True" ? React.createElement(AllMarketPage.ScoreBoardInplay.Lottery, {
                    sbParam: sbParam
                }) : React.createElement(AllMarketPage.ScoreBoardInplay.NoScoreboard, {
                    sbParam: sbParam
                });
                break;
            case 3:
            case 9:
            case 13:
            case 20:
            case 27:
                sb = sbParam.event.i[38] == "True" ? React.createElement(AllMarketPage.ScoreBoardInplay.NetSport, {
                    sbParam: sbParam
                }) : React.createElement(AllMarketPage.ScoreBoardInplay.NoScoreboard, {
                    sbParam: sbParam
                });
                isExpanded = sbParam.event.i[38] == "True";
                break;
            default:
                sb = _.contains(eval("[" + opScoreSetting + "]"), sbParam.sportID) && sbParam.sportID != 2 ? React.createElement(AllMarketPage.ScoreBoardInplay, {
                    sbParam: sbParam
                }) : React.createElement(AllMarketPage.ScoreBoardInplay.NoScoreboard, {
                    sbParam: sbParam
                });
            }
        return React.createElement("div", {
            className: "mg-t-1" + (sbParam.sportID == 2 && sbParam.event.i[38] == "True" ? " pd-6" : sb.type.displayName == "ScoreBoardInplay" ? " pd-b-6 pd-l-6 pd-r-6" : " pd-4") + " pos-relative " + this._getBGClass(sbParam.sportID) + (isExpanded ? " expanded" : "")
        }, sb);
    }
}, this);



//滚球头部显示
AllMarketPage.ScoreBoardInplay = React.createClass({
    displayName: "ScoreBoardInplay",
    mixins: [Homepage.Utility.timer],
    render: function() {
        var t = this.props.sbParam
          , n = t.event
          , i = n.i[0]
          , r = n.i[1]
          , c = n.i[10]
          , a = n.i[11]
          , u = n.i[8]
          , f = n.i[9]
          , e = n.i[35]
          , o = n.i[31]
          , s = typeof n.i[5] != "undefined" && n.i[5] != "" && n.i[5].indexOf(":") > 0 ? n.i[5] : ""
          , h = n.i[33]
          , v = n.i[34];

        return React.createElement("span", null , React.createElement("div", {
            className: "fts-12 ft-c-3 pd-b-6 pd-t-10"
        }, React.createElement("div", {
            className: "float-right"
        }, n.g == "N" ? React.createElement(AllMarketPage.Neutral, null ) : null , o == "" ? React.createElement("span", {
            className: "ft-c-14 fts-13 t-va-m mg-l-10"
        }, l.LiveText) : React.createElement("span", {
            className: "ft-c-14 fts-13 t-va-m mg-l-10"
        }, AllMarketPage.getPeriod(o, t.sportID)), s != "" && t.marketsCount > 0 ? React.createElement("span", {
            className: "ft-c-3 fts-12 time mg-l-6"
        }, 
        this._getIPTime(s, t.elapsed)) : null , 
        !isNaN(parseInt(h)) && t.marketsCount > 0 ? React.createElement("span", {
            className: "ft-c-12 fts-13 mg-l-8"
        }, "[FT " + h + " - " + v + "]") : null ), t.competitionName), React.createElement("div", {
            className: " pd-l-10 overflow-hidden pos-relative"
        }, React.createElement("div", {
            className: "bg_black_opty6  top-0 left-0 "
        }), React.createElement("div", {
            className: "bg_red top-0 left-0 ft-c-3 fts-14 t-a-c dsp-tbcl" + (u == 0 ? " hidden" : "")
        }, React.createElement("div", {
            className: "pos-relative dsp-tb height-100p"
        }, React.createElement("div", {
            className: "dsp-tbcl t-va-m"
        }, u))), React.createElement("div", {
            className: "bg_red top-0 right-0 ft-c-3 fts-14 t-a-c dsp-tbcl t-va-m" + (f == 0 ? " hidden" : "")
        }, React.createElement("div", {
            className: "pos-relative dsp-tb height-100p"
        }, React.createElement("div", {
            className: "dsp-tbcl t-va-m"
        }, f))), React.createElement("table", {
            className: "width-100p"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-46Percent"
        }), React.createElement("col", {
            className: "col-fixed91"
        }), React.createElement("col", {
            className: "col-46Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "pd-l-10 pd-r-6 t-a-r"
        }, React.createElement("div", {
            className: "fts-15 ft-c-3 z-idx-1 pos-relative line-clamp height-2p5em pd-t-15 pd-b-16",
            title: i
        }, i)), React.createElement("td", null , React.createElement("div", {
            className: "fts-18 ft-c-3 z-idx-1 pos-relative t-a-c"
        }, React.createElement("span", {
            className: "fontWeight-bold mg-r-6 dsp-iblk width-30 t-a-r" + (e == "h" ? " ft-c-12" : " ft-c-41")
        }, c), React.createElement("span", {
            className: "ft-c-31 fts-12 t-va-m"
        }, "-"), React.createElement("span", {
            className: "fontWeight-bold mg-l-6 dsp-iblk width-30 t-a-l" + (e == "a" ? " ft-c-12" : " ft-c-41")
        }, a))), React.createElement("td", {
            className: "pd-r-10 pd-l-6 pd-r-15 t-a-l"
        }, React.createElement("div", {
            className: "fts-15 ft-c-3 z-idx-1 pos-relative t-a-l line-clamp",
            title: r
        }, r)))))));
    }
});
//彩票
AllMarketPage.ScoreBoardInplay.Lottery = React.createClass({
    displayName: "Lottery",
    mixins: [Homepage.Utility.timer],
    render: function() {

        var i = this.props.sbParam, 
        
        u = i.event, 
        p = u.i[0], 
        w = u.i[1], 
        tt = typeof u.i[7] != "undefined" && u.i[7] != "" && u.i[7].indexOf(":") > 0 ? u.i[7] : "",  
        b = typeof u.i[5] != "undefined" && u.i[5] != "" ? u.i[5] : "", 
        k = u.i[37] == "" ? 3 : u.i[37], 
        t = typeof u.sb == "undefined" ? {} : u.sb, 
        r = [], 
        o = [], 
        s = [], 
        h = [], 
        y, e, f, a, c, v, n,z;

        for (t.cp = typeof t.cp == "undefined" ? "s0" : t.cp, t.cpi = parseInt(t.cp.substr(1)), y = 1; y <= 7 - k; y++)
            n = r.length,
            r.push(React.createElement("col", {
                key: "c" + n,
                className: "col-fixed26"
            })),
            o.push(React.createElement("th", {
                key: "th" + n
            }, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            }))),
            s.push(React.createElement("td", {
                key: "hs" + n,
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", null ))),
            h.push(React.createElement("td", {
                key: "as" + n,
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", null )));

        for (e = 1; e <= k; e++)
            n = r.length,
            r.push(React.createElement("col", {
                key: "c" + n,
                className: "col-fixed26"
            })),
            o.push(React.createElement("th", {
                key: "th" + n
            }, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            }, e))),
            f = typeof t.ps == "undefined" ? {
                h: "",
                a: "",
                p: "s" + e
            } : _.chain(t.ps).filter("p", "s" + e).first().value(),
            typeof f == "undefined" && (f = {
                h: "",
                a: "",
                p: "s" + e
            }),
            e > t.cpi && (f.h = "", f.a = ""),
            s.push(React.createElement("td", {
                key: "hs" + n,
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", {
                className: "fts-13 ft-c-3"
            }, f.h))),
            h.push(React.createElement("td", {
                key: "as" + n,
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", {
                className: "fts-13 ft-c-3"
            }, f.a)));

        //总和
        return a = typeof t.ps == "undefined" ? {
            h: "",
            a: "",
            p: "ft"
        } : _.chain(t.ps).filter("p", "ft").first().value(),
        typeof a != "undefined" && (n = r.length,
        r.push(React.createElement("col", {
            key: "c" + n,
            className: "col-fixed48"
        })),
        o.push(React.createElement("th", {
            key: "th" + n
        }, React.createElement("div", {
            className: "bg_black_opty75 top-0 left-0"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1"
        }, l.LO_Total))),
        s.push(React.createElement("td", {
            key: "hs" + n,
            className: "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, a.h))),
        h.push(React.createElement("td", {
            key: "as" + n,
            className: "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, a.a)))),

        //单双
        c = typeof t.ps == "undefined" ? {
            h: "",
            a: "",
            p: "p",
            adv: -1
        } : _.chain(t.ps).filter("p", "p").first().value(),
        typeof c != "undefined" && (n = r.length,
        r.push(React.createElement("col", {
            key: "c" + n,
            className: "col-fixed48"
        })),
        o.push(React.createElement("th", {
            key: "th" + n
        }, React.createElement("div", {
            className: "bg_black_opty75 top-0 left-0"
        }) , React.createElement("span", {
            className: "pos-relative z-idx-1"
        }, l.LO_Single_Double))),
        s.push(React.createElement("td", {
            key: "hs" + n,
            className: "pos-relative pd-t-4 pd-b-2 rightBorder_lv2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, c.h))),
        h.push(React.createElement("td", {
            key: "as" + n,
            className: "pos-relative pd-t-4 pd-b-2 rightBorder_lv2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, c.a)))),

        //单双
        z = typeof t.ps == "undefined" ? {
            h: "",
            a: "",
            p: "p",
            adv: -1
        } : _.chain(t.ps).filter("p", "dx").first().value(),
        typeof z != "undefined" && (n = r.length,
        r.push(React.createElement("col", {
            key: "c" + n,
            className: "col-fixed48"
        })),
        o.push(React.createElement("th", {
            key: "th" + n
        }, React.createElement("div", {
            className: "bg_black_opty75 top-0 left-0"
        }) , React.createElement("span", {
            className: "pos-relative z-idx-1"
        }, l.LO_Big_Small))),
        s.push(React.createElement("td", {
            key: "hs" + n,
            className: "pos-relative pd-t-4 pd-b-2 rightBorder_lv2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, z.h))),
        h.push(React.createElement("td", {
            key: "as" + n,
            className: "pos-relative pd-t-4 pd-b-2 rightBorder_lv2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, z.a)))),

        //龙虎
        v = typeof t.ps == "undefined" ? {
            h: "",
            a: "",
            p: "ftg"
        } : _.chain(t.ps).filter("p", "ftg").first().value(),
        typeof v != "undefined" && (n = r.length,
        r.push(React.createElement("col", {
            key: "c" + n,
            className: "col-fixed48"
        })),
        o.push(React.createElement("th", {
            key: "th" + n,
            className: "pd-t-4 pd-b-4"
        }, React.createElement("div", {
            className: "bg_black_opty75 height-100p width-100p pos-absolute top-0 left-0 z-idx-0 radius-r-t"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1"
        }, l.LO_Dragon_Tier))),
        s.push(React.createElement("td", {
            key: "hs" + n,
            className: "pos-relative pd-t-4 pd-b-2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "ft-c-12 pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, v.h))),
        h.push(React.createElement("td", {
            key: "as" + n,
            className: "pos-relative pd-t-4 pd-b-2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "ft-c-12 pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, v.a)))),
        React.createElement("span", null , React.createElement("div", {
            className: "fts-13 ft-c-42 pd-t-6"
        }, i.competitionName), React.createElement("div", {
            className: "overflow-hidden pos-relative"
        }, React.createElement("table", {
            className: "width-100p pos-relative z-idx-1"
        }, React.createElement("colgroup", null , React.createElement("col", null ), r), React.createElement("thead", {
            className: "fts-11 ft-c-31 t-a-c"
        }, React.createElement("tr", null , React.createElement("th", {
            className: "fts-13 t-a-l pd-t-4 pd-b-4 pos-relative t-va-bot pd-l-10"
        }, React.createElement("div", {
            className: "bg_black_opty75 height-23 width-75p bottom-0 left-0"
        }), React.createElement("div", {
            className: "bg_black_roundConner height-37 width-25p pos-absolute bottom-0 right-0 z-idx-0"
        }), React.createElement("span", {
            className: "ft-c-14 fontWeight-normal mg-r-6 pos-relative z-idx-1"
        }, AllMarketPage.getPeriod(t.cp, +i.sportID)), React.createElement("span", {
            className: "ft-c-3 fontWeight-normal pos-relative z-idx-1 mg-r-4 time" + (b != "" ? "" : " hidden")
        }, this._getLOTime(b, i.elapsed)), React.createElement("span", {
            className: "ft-c-2 fontWeight-normal pos-relative z-idx-1 mg-r-4" + (typeof t.iwd != "undefined" && t.iwd ? "" : " hidden")
        }, l.SB_WeatherDelay), u.g == "N" ? React.createElement(AllMarketPage.Neutral, null ) : null ), o)))), React.createElement("div", {
            className: " pd-l-10 overflow-hidden pos-relative"
        }, React.createElement("div", {
            className: "bg_black_opty6 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("table", {
            className: "width-100p pos-relative z-idx-1"
        }, React.createElement("colgroup", null , React.createElement("col", null ), r), React.createElement("tbody", {
            className: "t-a-c ft-c-14"
        }, React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-t-2 pd-b-2"
        }, React.createElement("div", {
            className: "fts-15 ft-c-3  t-a-l t-va-m line-clamp"
        }, React.createElement("span", {
            className: "widthHeight-7 dsp-iblk round mg-r-10 t-va-m " + (typeof t.s != "undefined" && t.s == 1 ? "bg-c-36" : "bg-c-24")
        }), React.createElement("span", {
            className: "t-va-m",
            title: p
        }, p))), s), React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-t-2 pd-b-2"
        }, React.createElement("div", {
            className: "fts-15 ft-c-3  t-a-l t-va-m line-clamp"
        }, React.createElement("span", {
            className: "widthHeight-7 dsp-iblk round mg-r-10 t-va-m " + (typeof t.s != "undefined" && t.s == 0 ? "bg-c-36" : "bg-c-24")
        }), React.createElement("span", {
            className: "t-va-m",
            title: w
        }, w))), h)))),
        React.createElement("div", {
            className:"overflow-hidden pos-relative"
        },React.createElement("div", {
            className:"pd-l-10 height-100p bg_black_opty6"
        },"00000000000000"))
            );
    }
});

AllMarketPage.ScoreBoardInplay.NetSport = React.createClass({
    displayName: "NetSport",
    render: function() {
        var i = this.props.sbParam, u = i.event, p = u.i[0], w = u.i[1], b = typeof u.i[5] != "undefined" && u.i[5] != "" && u.i[5].indexOf(":") > 0 ? u.i[5] : "", k = u.i[37] == "" ? 3 : u.i[37], t = typeof u.sb == "undefined" ? {} : u.sb, r = [], o = [], s = [], h = [], y, e, f, a, c, v, n;
        for (t.cp = typeof t.cp == "undefined" ? "s0" : t.cp,
        t.cpi = parseInt(t.cp.substr(1)),
        y = 1; y <= 7 - k; y++)
            n = r.length,
            r.push(React.createElement("col", {
                key: "c" + n,
                className: "col-fixed26"
            })),
            o.push(React.createElement("th", {
                key: "th" + n
            }, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            }))),
            s.push(React.createElement("td", {
                key: "hs" + n,
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", null ))),
            h.push(React.createElement("td", {
                key: "as" + n,
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", null )));
        for (e = 1; e <= k; e++)
            n = r.length,
            r.push(React.createElement("col", {
                key: "c" + n,
                className: "col-fixed26"
            })),
            o.push(React.createElement("th", {
                key: "th" + n
            }, React.createElement("div", {
                className: "bg_black_opty75 top-0 left-0"
            }), React.createElement("span", {
                className: "pos-relative z-idx-1"
            }, e))),
            f = typeof t.ps == "undefined" ? {
                h: "",
                a: "",
                p: "s" + e
            } : _.chain(t.ps).filter("p", "s" + e).first().value(),
            typeof f == "undefined" && (f = {
                h: "",
                a: "",
                p: "s" + e
            }),
            e > t.cpi && (f.h = "",
            f.a = ""),
            s.push(React.createElement("td", {
                key: "hs" + n,
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", {
                className: "fts-13" + (f.p == t.cp ? " fontWeight-bold" : " ft-c-3")
            }, f.h))),
            h.push(React.createElement("td", {
                key: "as" + n,
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", {
                className: "fts-13" + (f.p == t.cp ? " fontWeight-bold" : " ft-c-3")
            }, f.a)));
        return a = typeof t.ps == "undefined" ? {
            h: "",
            a: "",
            p: "ft"
        } : _.chain(t.ps).filter("p", "ft").first().value(),
        typeof a != "undefined" && (n = r.length,
        r.push(React.createElement("col", {
            key: "c" + n,
            className: "col-fixed48"
        })),
        o.push(React.createElement("th", {
            key: "th" + n
        }, React.createElement("div", {
            className: "bg_black_opty75 top-0 left-0"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1"
        }, i.sportID == 9 || i.sportID == 20 ? l.Results_Games : l.Results_Sets))),
        s.push(React.createElement("td", {
            key: "hs" + n,
            className: "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, a.h))),
        h.push(React.createElement("td", {
            key: "as" + n,
            className: "pos-relative rightBorder_lv2 pd-t-4 pd-b-2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, a.a)))),
        c = typeof t.ps == "undefined" ? {
            h: "",
            a: "",
            p: "p",
            adv: -1
        } : _.chain(t.ps).filter("p", "p").first().value(),
        typeof c != "undefined" && (n = r.length,
        r.push(React.createElement("col", {
            key: "c" + n,
            className: "col-fixed48"
        })),
        o.push(React.createElement("th", {
            key: "th" + n,
            className: i.sportID != 3 ? "pd-t-4 pd-b-4" : ""
        }, i.sportID != 3 ? React.createElement("div", {
            className: "bg_black_opty75 height-100p width-100p pos-absolute top-0 left-0 z-idx-0 radius-r-t"
        }) : React.createElement("div", {
            className: "bg_black_opty75 top-0 left-0"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1"
        }, i.sportID == 3 ? l.Results_Points : l.SB_TotalPoints))),
        s.push(React.createElement("td", {
            key: "hs" + n,
            className: "pos-relative pd-t-4 pd-b-2" + (i.sportID != 3 ? "" : " rightBorder_lv2")
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: (i.sportID == 3 ? "ft-c-3" : "ft-c-12 fontWeight-bold") + " pos-relative z-idx-1 fts-13"
        }, c.adv == 1 ? "A" : c.h))),
        h.push(React.createElement("td", {
            key: "as" + n,
            className: "pos-relative pd-t-4 pd-b-2" + (i.sportID != 3 ? "" : " rightBorder_lv2")
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: (i.sportID == 3 ? "ft-c-3" : "ft-c-12 fontWeight-bold") + " pos-relative z-idx-1 fts-13"
        }, c.adv == 0 ? "A" : c.a)))),
        v = typeof t.ps == "undefined" ? {
            h: "",
            a: "",
            p: "ftg"
        } : _.chain(t.ps).filter("p", "ftg").first().value(),
        typeof v != "undefined" && +i.sportID == 3 && (n = r.length,
        r.push(React.createElement("col", {
            key: "c" + n,
            className: "col-fixed48"
        })),
        o.push(React.createElement("th", {
            key: "th" + n,
            className: "pd-t-4 pd-b-4"
        }, React.createElement("div", {
            className: "bg_black_opty75 height-100p width-100p pos-absolute top-0 left-0 z-idx-0 radius-r-t"
        }), React.createElement("span", {
            className: "pos-relative z-idx-1"
        }, i.sportID == 3 ? l.SB_TotalGames : l.SB_TotalPoints))),
        s.push(React.createElement("td", {
            key: "hs" + n,
            className: "pos-relative pd-t-4 pd-b-2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "ft-c-12 pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, v.h))),
        h.push(React.createElement("td", {
            key: "as" + n,
            className: "pos-relative pd-t-4 pd-b-2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "ft-c-12 pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, v.a)))),
        React.createElement("span", null , React.createElement("div", {
            className: "fts-13 ft-c-42 pd-t-6"
        }, i.competitionName), React.createElement("div", {
            className: "overflow-hidden pos-relative"
        }, React.createElement("table", {
            className: "width-100p pos-relative z-idx-1"
        }, React.createElement("colgroup", null , React.createElement("col", null ), r), React.createElement("thead", {
            className: "fts-11 ft-c-31 t-a-c"
        }, React.createElement("tr", null , React.createElement("th", {
            className: "fts-13 t-a-l pd-t-4 pd-b-4 pos-relative t-va-bot pd-l-10"
        }, React.createElement("div", {
            className: "bg_black_opty75 height-23 width-75p bottom-0 left-0"
        }), React.createElement("div", {
            className: "bg_black_roundConner height-37 width-25p pos-absolute bottom-0 right-0 z-idx-0"
        }), React.createElement("span", {
            className: "ft-c-14 fontWeight-normal mg-r-6 pos-relative z-idx-1"
        }, AllMarketPage.getPeriod(t.cp, +i.sportID)), React.createElement("span", {
            className: "ft-c-3 fontWeight-normal pos-relative z-idx-1 mg-r-4" + (b != "" ? "" : " hidden")
        }, b), React.createElement("span", {
            className: "ft-c-2 fontWeight-normal pos-relative z-idx-1 mg-r-4" + (typeof t.iwd != "undefined" && t.iwd ? "" : " hidden")
        }, l.SB_WeatherDelay), u.g == "N" ? React.createElement(AllMarketPage.Neutral, null ) : null ), o)))), React.createElement("div", {
            className: " pd-l-10 overflow-hidden pos-relative"
        }, React.createElement("div", {
            className: "bg_black_opty6 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("table", {
            className: "width-100p pos-relative z-idx-1"
        }, React.createElement("colgroup", null , React.createElement("col", null ), r), React.createElement("tbody", {
            className: "t-a-c ft-c-14"
        }, React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-t-2 pd-b-2"
        }, React.createElement("div", {
            className: "fts-15 ft-c-3  t-a-l t-va-m line-clamp"
        }, React.createElement("span", {
            className: "widthHeight-7 dsp-iblk round mg-r-10 t-va-m " + (typeof t.s != "undefined" && t.s == 1 ? "bg-c-36" : "bg-c-24")
        }), React.createElement("span", {
            className: "t-va-m",
            title: p
        }, p))), s), React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-t-2 pd-b-2"
        }, React.createElement("div", {
            className: "fts-15 ft-c-3  t-a-l t-va-m line-clamp"
        }, React.createElement("span", {
            className: "widthHeight-7 dsp-iblk round mg-r-10 t-va-m " + (typeof t.s != "undefined" && t.s == 0 ? "bg-c-36" : "bg-c-24")
        }), React.createElement("span", {
            className: "t-va-m",
            title: w
        }, w))), h)))));
    }
});

AllMarketPage.ScoreBoardInplay.Basketball = React.createClass({
    displayName: "Basketball",
    render: function() {
        var v = this.props.sbParam, r = v.event, b = r.i[0], k = r.i[1], d = typeof r.i[5] == "undefined" || r.i[5] == "" ? "" : r.i[5].indexOf(":") > 0 ? r.i[5] : AllMarketPage.padZeroLeft(moment.duration(parseInt(r.i[5]), "s").minutes(), 2) + ":" + AllMarketPage.padZeroLeft(moment.duration(parseInt(r.i[5]), "s").seconds(), 2), y = r.i[37] == "" ? 4 : r.i[37], n = typeof r.sb == "undefined" ? {} : r.sb, u = [], h = [], c = [], a = [], p, f, e, i, o, s, w, t;
        if (n.cp = typeof n.cp == "undefined" ? y == 4 ? "q0" : "0h" : n.cp,
        n.cpi = parseInt(n.cp.substr(1)),
        p = {
            q1: "1h",
            q2: "1h",
            q3: "2h",
            q4: "2h",
            ot: "2h",
            q0: "0h"
        },
        n.hcp = p[n.cp] == undefined ? n.cp : p[n.cp],
        n.hcpi = parseInt(n.hcp.substr(0, 1)),
        y == 4) {
            for (i = 1; i <= 4; i++)
                f = typeof n.ps == "undefined" ? {
                    h: "",
                    a: "",
                    p: "s" + i
                } : _.chain(n.ps).filter("p", "q" + i).first().value(),
                typeof f == "undefined" && (f = {
                    h: "",
                    a: "",
                    p: "q" + i
                }),
                i > n.cpi && (f.h = "",
                f.a = ""),
                t = u.length,
                u.push(React.createElement("col", {
                    key: "c" + t,
                    className: "col-fixed30"
                })),
                h.push(React.createElement("th", {
                    key: "ths" + t
                }, l["stiQ" + i])),
                c.push(React.createElement("td", {
                    key: "hs" + t,
                    className: "pd-t-4 pd-b-2"
                }, React.createElement("span", {
                    className: "fts-13" + (f.p == n.cp ? " fontWeight-bold" : " ft-c-3")
                }, f.h))),
                a.push(React.createElement("td", {
                    key: "as" + t,
                    className: "pd-t-4 pd-b-2"
                }, React.createElement("span", {
                    className: "fts-13" + (f.p == n.cp ? " fontWeight-bold" : " ft-c-3")
                }, f.a)));
            e = typeof n.ps == "undefined" ? {
                h: "",
                a: "",
                p: "ot"
            } : _.chain(n.ps).filter("p", "ot").first().value();
            n.cp != e.p && (e.h = "",
            e.a = "");
            t = u.length;
            u.push(React.createElement("col", {
                key: "c" + t,
                className: "col-fixed30"
            }));
            h.push(React.createElement("th", {
                key: "ths" + t
            }, l.stiOT));
            c.push(React.createElement("td", {
                key: "hs" + t,
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", {
                className: "fts-13" + (e.p == n.cp ? " fontWeight-bold" : " ft-c-3")
            }, e.h)));
            a.push(React.createElement("td", {
                key: "as" + t,
                className: "pd-t-4 pd-b-2"
            }, React.createElement("span", {
                className: "fts-13" + (e.p == n.cp ? " fontWeight-bold" : " ft-c-3")
            }, e.a)));
        }
        for (i = 1; i <= 2; i++)
            o = typeof n.ps == "undefined" ? {
                h: "",
                a: "",
                p: i + "h"
            } : _.chain(n.ps).filter("p", i + "h").first().value(),
            i > n.hcpi && (o.h = "",
            o.a = ""),
            t = u.length,
            u.push(React.createElement("col", {
                key: "c" + t,
                className: "col-fixed38"
            })),
            h.push(React.createElement("th", {
                key: "ths" + t
            }, l["sti" + i + "H"])),
            c.push(React.createElement("td", {
                key: "hs" + t,
                className: "pd-t-4 pd-b-2 rightBorder_lv2"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "fts-13" + (o.p == n.hcp ? " fontWeight-bold" : " ft-c-3")
            }, o.h))),
            a.push(React.createElement("td", {
                key: "as" + t,
                className: "pd-t-4 pd-b-2 rightBorder_lv2"
            }, React.createElement("div", {
                className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
            }), React.createElement("span", {
                className: "fts-13" + (o.p == n.hcp ? " fontWeight-bold" : " ft-c-3")
            }, o.a)));
        return y == 2 && (s = typeof n.ps == "undefined" ? {
            h: "",
            a: "",
            p: "ot"
        } : _.chain(n.ps).filter("p", "ot").first().value(),
        n.cp != s.p && (s = {
            h: "",
            a: "",
            p: "ot"
        }),
        t = u.length,
        u.push(React.createElement("col", {
            key: "c" + t,
            className: "col-fixed38"
        })),
        h.push(React.createElement("th", {
            key: "ths" + t
        }, l.stiOT)),
        c.push(React.createElement("td", {
            key: "hs" + t,
            className: "pd-t-4 pd-b-2 rightBorder_lv2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "fts-13" + (s.p == n.cp ? " fontWeight-bold" : " ft-c-3")
        }, s.h))),
        a.push(React.createElement("td", {
            key: "as" + t,
            className: "pd-t-4 pd-b-2 rightBorder_lv2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "fts-13" + (s.p == n.cp ? " fontWeight-bold" : " ft-c-3")
        }, s.a)))),
        w = typeof n.ps == "undefined" ? {
            h: "",
            a: "",
            p: "ft"
        } : _.chain(n.ps).filter("p", "ft").first().value(),
        t = u.length,
        u.push(React.createElement("col", {
            key: "c" + t,
            className: "col-fixed38"
        })),
        h.push(React.createElement("th", {
            key: "ths" + t
        }, l.SB_Total)),
        c.push(React.createElement("td", {
            key: "hs" + t,
            className: "pos-relative pd-t-4 pd-b-2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "ft-c-12  pd-t-4 pd-b-2 pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, w.h))),
        a.push(React.createElement("td", {
            key: "as" + t,
            className: "pos-relative pd-t-4 pd-b-2"
        }, React.createElement("div", {
            className: "bg_white_opty16 height-100p width-100p pos-absolute top-0 left-0 z-idx-0"
        }), React.createElement("span", {
            className: "ft-c-12  pd-t-4 pd-b-2 pos-relative z-idx-1 fts-13 fontWeight-bold"
        }, w.a))),
        React.createElement("span", null , React.createElement("div", {
            className: "fts-12 ft-c-3 pd-b-10 pd-t-6"
        }, v.competitionName), React.createElement("div", {
            className: "pd-l-10 overflow-hidden pos-relative"
        }, React.createElement("div", {
            className: "bg_black_opty85 top-0 left-0"
        }), React.createElement("table", {
            className: "width-100p pos-relative z-idx-1"
        }, React.createElement("colgroup", null , React.createElement("col", null ), u), React.createElement("thead", {
            className: "fts-11 ft-c-31 t-a-c"
        }, React.createElement("tr", null , React.createElement("th", {
            className: "fts-13 t-a-l"
        }, React.createElement("span", {
            className: "ft-c-14 fontWeight-normal mg-r-5 t-va-m"
        }, AllMarketPage.getPeriod(n.cp, v.sportID)), React.createElement("span", {
            className: "ft-c-3 fontWeight-normal mg-r-10 t-va-m" + (d != "" ? "" : " hidden")
        }, d), r.g == "N" ? React.createElement(AllMarketPage.Neutral, null ) : null ), h)))), React.createElement("div", {
            className: " pd-l-10 overflow-hidden pos-relative"
        }, React.createElement("div", {
            className: "bg_black_opty6 top-0 left-0 "
        }), React.createElement("table", {
            className: "width-100p pos-relative z-idx-1"
        }, React.createElement("colgroup", null , React.createElement("col", null ), u), React.createElement("tbody", {
            className: "t-a-c ft-c-14"
        }, React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-t-2 pd-b-2"
        }, React.createElement("div", {
            className: "fts-15 ft-c-3 t-a-l line-clamp overflow-hidden",
            title: b
        }, b)), c), React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l pd-b-4"
        }, React.createElement("div", {
            className: "fts-15 ft-c-3  t-a-l line-clamp overflow-hidden",
            title: k
        }, k)), a)))));
    }
});

AllMarketPage.ScoreBoardInplay.NoScoreboard = React.createClass({
    displayName: "NoScoreboard",
    render: function() {
        var t = this.props.sbParam
          , n = t.event
          , i = n.i[0]
          , r = n.i[1];
        return React.createElement("span", null , React.createElement("div", {
            className: "fts-13 ft-c-42 pd-b-10 pd-t-6"
        }, React.createElement("div", {
            className: "float-right"
        }, n.g == "N" ? React.createElement(AllMarketPage.Neutral, null ) : null , React.createElement("span", {
            className: "ft-c-14 fts-13 t-va-m mg-l-6"
        }, l.LiveText)), t.competitionName), React.createElement("div", {
            className: " pd-l-10 pd-r-10 overflow-hidden pos-relative"
        }, React.createElement("div", {
            className: "bg_black_opty6  top-0 left-0 "
        }), React.createElement("table", {
            className: "width-100p"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-46Percent"
        }), React.createElement("col", null ), React.createElement("col", {
            className: "col-46Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-r"
        }, React.createElement("div", {
            className: "fts-15 ft-c-3 z-idx-1 pos-relative  line-clamp height-2p5em pd-t-16 pd-b-17",
            title: i
        }, i)), React.createElement("td", null , React.createElement("div", {
            className: "fts-15 ft-c-3 z-idx-1 pos-relative t-a-c"
        }, React.createElement("div", {
            className: "ft-c-14 fontWeight-bold"
        }, "V"))), React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("div", {
            className: "fts-15 ft-c-3 z-idx-1 pos-relative   line-clamp",
            title: r
        }, r)))))));
    }
});

AllMarketPage.ScoreBoardNonInplay = React.createClass({
    displayName: "ScoreBoardNonInplay",
    render: function() {
        var r = this.props.sbParam
          , n = r.event
          , t = n.i[0]
          , i = n.i[1]
          , u = n.i[4] == "t" ? l.td : n.i[4]
          , f = typeof n.i[5] != "undefined" && n.i[5] != "" && n.i[5].indexOf(":") > 0 ? n.i[5] : "";
        return React.createElement("div", {
            className: "pd-t-16 pd-b-16 pd-l-10 pd-r-10 ofw-hidden pos-relative"
        }, React.createElement("div", {
            className: "bg_black_opty6 top-0 left-0"
        }), React.createElement("div", {
            className: "float-right z-idx-1 pos-relative"
        }, React.createElement("span", {
            className: "icon-InPlay mg-r-10 ft-c-30 dsp-iblk fts-15 t-va-m" + (n.i[3] == "True" ? "" : " hidden")
        }), n.g == "N" ? React.createElement(AllMarketPage.Neutral, null ) : null , React.createElement("span", {
            className: "ft-c-18 fts-12 time mg-l-10"
        }, u), React.createElement("span", {
            className: "ft-c-3 fts-12 time mg-l-8"
        }, f)), React.createElement("div", {
            className: "fts-15 ft-c-3 z-idx-1 pos-relative line-clamp",
            title: t + " v " + i
        }, t, React.createElement("span", {
            className: "ft-c-14 mg-l-10 mg-r-10"
        }, "v"), i));
    }
});

AllMarketPage.FilterButtons = React.createClass({
    displayName: "FilterButtons",
    render: function() {
        if (typeof this.props.filters == "undefined")
            return null ;
        //if (this.props.inPlay || this.props.sportID != 1 || typeof this.props.filters == "undefined") return null;
        var n = this.props.filterParam;
        return React.createElement("div", {
            className: "mg-t-1 bg-c-14 pos-relative height-40 lht-40 pd-l-10 pd-r-10",
            id: "fbContainer"
        }, React.createElement("div", {
            className: "float-left",
            onClick: this._scroll.bind(this, "l")
        }, React.createElement("span", {
            className: "back dsp-iblk bg-c-12 radius iconbg-s t-va-m"
        }, React.createElement("span", {
            className: "dsp-iblk icon-DoubleArrowHorizontalLeft fts-16 wh-ht-22 lht-22"
        }))), React.createElement("div", {
            className: "float-right",
            onClick: this._scroll.bind(this, "r")
        }, React.createElement("span", {
            className: "back dsp-iblk bg-c-12 radius iconbg-s t-va-m"
        }, React.createElement("span", {
            className: "dsp-iblk icon-DoubleArrowHorizontalRight fts-16 wh-ht-22 lht-22"
        }))), React.createElement("div", {
            className: "fts-13 ft-c-27 pos-relative ws-nowrap mg-r-22 mg-l-22"
        }, React.createElement("div", {
            className: "width-35 right-0 height-40 pos-absolute gradientFadeOut-r",
            id: "fg"
        }), React.createElement("div", {
            className: "pos-relative ws-nowrap ofw-hidden",
            id: "filterbar"
        }, _.map(this.props.filters, function(t, i) {
            return React.createElement("div", {
                key: "f" + i,
                onClick: this._setFilter.bind(this, t.ex),
                className: "dsp-iblk t-va-m lht-0p3 filters" + (i == 0 ? " mg-l-16" : "") + (i == this.props.filters.length - 1 ? " mg-r-16" : " mg-r-35") + (n.filteredType == t.ex ? " actived" : ""),
                "data-ex": t.ex
            }, t.tx);
        }, this))));
    },
    _setFilter: function(n, t) {
        t.preventDefault();
        t.stopPropagation();
        var i = $("#filterbar");
        typeof i[0] != "undefined" && (i.children().removeClass("actived").filter("[data-ex='" + n + "']").addClass("actived"),
        Action.AllMarket.filteredMarket(n));
    },
    shouldComponentUpdate: function(n) {
        return $("#filterbar").scroll(function(n) {
            return n.preventDefault(),
            n.stopPropagation(),
            !1;
        }),
        AMStore.getFirstLoad() || this.props.filters != n.filters;
    },
    componentDidMount: function() {
        setTimeout(Action.AllMarket.showHideFilterMoveBtn, 100);
        this.addListener();
    },
    componentDidUpdate: function() {
        setTimeout(Action.AllMarket.showHideFilterMoveBtn, 100);
    },
    addListener: function() {
        window.addEventListener("resize", Action.AllMarket.showHideFilterMoveBtn);
    },
    _scroll: function(n, t) {
        t.preventDefault();
        t.stopPropagation();
        var i = $("#filterbar");
        typeof i[0] != "undefined" && i.animate({
            scrollLeft: i[0].scrollLeft + (n == "r" ? 100 : -100)
        }, 300, function() {
            $("#fg")[i[0].scrollLeft + i[0].clientWidth >= i[0].scrollWidth - 40 ? "addClass" : "removeClass"]("hidden");
        });
    }
});

AllMarketPage.MyMarketList = React.createClass({
    displayName: "MyMarketList",
    render: function() {
        var n = l.MB_ClickAddToMyMarkets.split("{0}");
        return React.createElement("div", {
            id: "fav",
            className: "sportsTable"
        }, React.createElement("div", {
            className: "mg-t-1 fav-header pd-r-10 pd-l-10 bg-c-13 topBorder_lv1 overflow-hidden pd-t-10 pd-b-11 lht-18",
            onClick: this._showHideMyMarkets.bind(this, this.props.isShow)
        }, React.createElement("div", {
            className: "float-right"
        }, React.createElement("span", {
            className: "arrow fts-22 ft-c-27 dsp-iblk" + (this.props.isShow ? "" : " collapsed")
        }, React.createElement("div", {
            className: "icon-ArrowDown"
        }), React.createElement("div", {
            className: "icon-ArrowUp"
        }))), React.createElement("span", {
            className: "thinstar t-va-m top-n1 lht-0p8"
        }, React.createElement("span", {
            className: "dsp-iblk icon-fav-thin ft-c-15 t-va-m"
        })), React.createElement("span", {
            className: "dsp-iblk fts-16 fontWeight-bold ft-c-3 mg-l-6 t-va-m lht-0p9 uppercase"
        }, l.MB_MyMarkets)), React.createElement("div", {
            className: "bg-c-1 fts-13 ft-c-25 pd-t-10 pd-b-10 pd-l-10 pd-r-10" + (this.props.isShow && this.props.MyMarkets.length == 0 ? "" : " hidden")
        }, React.createElement("span", {
            className: "t-va-m"
        }, n[0]), React.createElement("span", {
            className: "thinstar t-va-m mg-l-4 mg-r-4 ft-c-29 t-va-m top-n1"
        }, React.createElement("span", {
            className: "icon-fav-thin"
        })), React.createElement("span", {
            className: "t-va-m"
        }, n[1])), React.createElement("div", {
            className: this.props.isShow ? "" : "hidden"
        }, this.props.MyMarkets));
    },
    _showHideMyMarkets: function(n, t) {
        t.preventDefault();
        t.stopPropagation();
        Action.AllMarket.showHideMyMarkets(!n);
    }
});

AllMarketPage.Market = React.createClass({
    displayName: "Market",
    render: function() {
        return React.createElement("div", null , React.createElement(AllMarketPage.Market.HeadLine, {
            filter: this.props.data.filter,
            isFirst: this.props.data.isFirst,
            data: this.props.data
        }), React.createElement(AllMarketPage.Market.MarketType, {
            data: this.props.data
        }));
    }
});
AllMarketPage.Market.HeadLine = React.createClass({
    displayName: "HeadLine",
    render: function() {
        var n = this.props.data, i = "", t, e, u, f, r;
        if (n.market.mt == "sb" && n.bestOf != "" && n.bestOf != "0") {
            t = "Tennis";
            switch (n.sID) {
            case 3:
                t = "Tennis";
                break;
            case 9:
                t = "Badminton";
                break;
            case 13:
                t = "Volleyball";
                break;
            case 20:
                t = "TableTennis";
            }
            i = " (" + n.bestOf + l["SB_BestOf_" + t] + ")";
        }
        return n.market.mt == "sb" && console.log("headline", n, i),
        e = [3, 5, 6],
        u = [React.createElement("span", {
            key: "0",
            className: "fts-15 ft-c-27 lht-14 "
        }, n.childEventName + (n.childEventName != "" ? _.contains(e, n.market.ctid) ? " - " : ": " : "") + n.pretermName + n.betTypeName + (n.period != "" ? " - " : "")), React.createElement("span", {
            key: "1",
            className: "ft-c-3 fts-15"
        }, " ", n.period), i],
        n.market.n && n.market.n != "" && (f = null ,
        r = n.market.n,
        n.period != "" && (n.market.n.lastIndexOf("- ") > -1 && (r = n.market.n.replace(n.market.n.slice(n.market.n.lastIndexOf("- ") + 1), "")),
        f = React.createElement("span", {
            key: "1",
            className: "ft-c-3 fts-15"
        }, n.market.n.replace(r, ""))),
        u = [r, i, f]),
        React.createElement("div", {
            className: "mg-t-1 lht-35 pd-r-10 pd-l-10 bg-c-15 overflow-hidden" + (this.props.isFirst ? "" : " topBorder_lv2"),
            "data-filter": this.props.filter
        }, React.createElement("table", {
            className: "headerTb width-100p"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed200"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "fts-15 ft-c-27 lht-14"
        }, u), React.createElement("td", {
            className: "t-a-r"
        }, n.inPlay && (this._childEventDisplayCurrentTotal(n.market.ctid) || this._is15MinGoals(n.market.ctid)) ? React.createElement("span", {
            className: "ft-c-14 fts-13 mg-r-10"
        }, this._is15MinGoals(n.market.ctid) ? l.MB_15MinScore : l.MB_CurrentTotal, ": ", n.market.scoh, "-", n.market.scoa) : null , React.createElement("span", {
            className: "myFavorites" + (n.isMyMk ? " actived" : ""),
            title: n.isMyMk ? l.MB_RemoveFromMyMarkets : l.MB_AddToMyMarkets /*,
            onClick:this._addMyMarketTypes.bind(this, n.market.mt, n.market.ctid, typeof n.market.mn != "undefined" ? n.market.mn :"", n.isMyMk)*/
        }, React.createElement("span", {
            className: "thinstar ft-c-28"
        }, React.createElement("span", {
            className: "icon-fav-thin"
        }))))))));
    },
    _addMyMarketTypes: function(n, t, i, r, u) {
        u.preventDefault();
        u.stopPropagation();
        Action.AllMarket.showHideMyMarkets(!0);
        r ? (Action.PopUp.show(!1, PopUp_Store.popUpType().MYMARKETS),
        Action.AllMarket.removeMyMarkets(n, t, i)) : (Action.PopUp.show(!0, PopUp_Store.popUpType().MYMARKETS),
        Action.AllMarket.addToMyMarkets(n, t, i));
    },
    _is15MinGoals: function(n) {
        return _.contains([16, 17, 18, 19, 20, 21], n);
    },
    _childEventDisplayCurrentTotal: function(ctid) {
        return _.contains(eval("[" + displayCurrentTotalSetting + "]"), ctid);
    }
});
AllMarketPage.Market.MarketType = React.createClass({
    displayName: "MarketType",
    render: function() {
        var n = this.props.data
          , i = null
          , t = {
            sID: n.sID,
            eventId: n.market.k,
            parentEventId: typeof n.market.pk != "undefined" ? n.market.pk : n.market.k,
            childEventTypeId: typeof n.market.ctid != "undefined" ? n.market.ctid : null ,
            score: n.homeScore + ":" + n.awayScore,
            child_score: (n.childHomeScore == undefined ? "" : n.childHomeScore) + ":" + (n.childAwayScore == undefined ? "" : n.childAwayScore),
            isAH: n.market.mt.slice(0, 2) == "ah",
            homeName: n.market.ctid == 14 ? n.market.ch : n.homeName,
            awayName: n.market.ctid == 14 ? n.market.ca : n.awayName,
            inPlay: n.inPlay,
            odds: n.market.v,
            highLightOdds: n.highLightOdds,
            oddsChange: n.oddsChange,
            oddsType: n.oddsType,
            showMoreEventIds: n.showMoreEventIds,
            bestOf: n.bestOf
        }
          , r = {
            group1: ["WinningMargin"],
            group2: ["_1stGoal", "_2ndGoal", "_3rdGoal", "_4thGoal", "_5thGoal", "_6thGoal", "_7thGoal", "_8thGoal", "_9thGoal", "_10thGoal", "_11thGoal", "_12thGoal", "_13thGoal", "_14thGoal", "_15thGoal"],
            group3: ["WinningMethod", "QualifyingMethod"],
            group4: ["FT_1X2_And_FT_OU_1p5", "FT_1X2_And_FT_OU_2p5", "FT_1X2_And_FT_OU_3p5", "FT_1X2_And_FT_OU_4p5", "FT_1X2_And_BothTeamsToScore", "FT_1X2_And_1stTeamToScore"],
            group5: ["DoubleChance_And_FT_OU_1p5", "DoubleChance_And_FT_OU_2p5", "DoubleChance_And_FT_OU_3p5", "DoubleChance_And_FT_OU_4p5", "DoubleChance_And_BothTeamsToScore", "DoubleChance_And_1stTeamToScore"],
            group6: ["FT_OU_1p5_And_BothTeamsToScore", "FT_OU_2p5_And_BothTeamsToScore", "FT_OU_3p5_And_BothTeamsToScore", "FT_OU_4p5_And_BothTeamsToScore", "FT_OU_1p5_And_FT_OE", "FT_OU_2p5_And_FT_OE", "FT_OU_3p5_And_FT_OE", "FT_OU_4p5_And_FT_OE"],
            group7: ["FT_OU_1p5_And_1stTeamToScore", "FT_OU_2p5_And_1stTeamToScore", "FT_OU_3p5_And_1stTeamToScore", "FT_OU_4p5_And_1stTeamToScore"]
        };
        switch (n.market.mt.slice(0, 2)) {
        case "ah":
        case "ou":
            i = (t.childEventTypeId == null || t.childEventTypeId == 0) && (t.sID == 3 || t.sID == 2) ? React.createElement(AllMarketPage.Market.MarketType.AHOU_FbBb, {
                data: t
            }) : React.createElement(AllMarketPage.Market.MarketType.AHOU, {
                data: t
            });
            break;
        case "oe":
            i = React.createElement(AllMarketPage.Market.MarketType.OE, {
                data: t
            });
            break;
        case "ml":
            i = React.createElement(AllMarketPage.Market.MarketType.ML, {
                data: t
            });
            break;
        case "hf":
            i = React.createElement(AllMarketPage.Market.MarketType.HF, {
                data: t
            });
            break;
        case "cs":
            i = React.createElement(AllMarketPage.Market.MarketType.CS, {
                data: t
            });
            break;
        case "sb":
            i = _.contains(["", "0", 0], t.bestOf) ? React.createElement(AllMarketPage.Market.MarketType.SB, {
                data: t
            }) : React.createElement(AllMarketPage.Market.MarketType.SB_BestOf, {
                data: t
            });
            break;
        case "tg":
            i = React.createElement(AllMarketPage.Market.MarketType.TG, {
                data: t
            });
        }
        switch (n.market.mt.slice(0, 3)) {
        case "1x2":
            i = React.createElement(AllMarketPage.Market.MarketType.OneXTwo, {
                data: t
            });
            break;
        case "tts":
            i = React.createElement(AllMarketPage.Market.MarketType.TTS, {
                data: t
            });
            break;
        case "sco":
            i = React.createElement(AllMarketPage.Market.MarketType.SCO, {
                data: t
            });
        }
        return n.market.mt == "spwos" && (i = _.contains(r.group1, n.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.WM, {
            data: t
        }) : _.contains(r.group2, n.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.NG, {
            data: t
        }) : _.contains(r.group3, n.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.WQ, {
            data: t
        }) : _.contains(r.group4, n.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.GBB, {
            data: t
        }) : _.contains(r.group5, n.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.DC, {
            data: t
        }) : _.contains(r.group6, n.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.GB, {
            data: t
        }) : _.contains(r.group7, n.market.mn) ? React.createElement(AllMarketPage.Market.MarketType.GTS, {
            data: t
        }) : React.createElement(AllMarketPage.Market.MarketType.SPWOS, {
            data: t
        })),
        React.createElement("div", {
            className: "bg-c-1 fts-13"
        }, i);
    }
});
AllMarketPage.Market.MarketType.AHOU_FbBb = React.createClass({
    displayName: "AHOU_FbBb",
    render: function() {
        var n = this.props.data, u = [], r = n.odds[0].length / 2 <= 3 ? 3 : n.odds[0].length / 2, t;
        for (i = 0; i < r; i++)
            u.push(React.createElement("col", {
                key: i,
                className: "col-dynamicWidth"
            }));
        return t = [],
        _.forEach(n.odds, function(i, u) {
            var o, f, e;
            if (t[u] = {
                oddName: n.isAH ? n.homeName : l.Odds_Over,
                evenName: n.isAH ? n.awayName : l.Odds_Under,
                oddRow: [],
                evenRow: []
            },
            _.forEach(i, function(i, r) {
                var f = {
                    isAH: n.isAH,
                    value: i,
                    score: n.score,
                    child_score: n.child_score,
                    OU: r % 2 == 0 ? "O" : "U",
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: _.indexOf(n.highLightOdds, i[2].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: r % 2 == 0 ? t[u].oddName : t[u].evenName
                };
                r % 2 == 0 ? t[u].oddRow.push(React.createElement("td", {
                    key: r,
                    className: "pd-t-6 pd-b-6 pd-r-10 t-a-r topBorder_lv3"
                }, React.createElement(AllMarketPage.Market.Odds.AHOU, {
                    data: f
                }))) : r % 2 == 1 && t[u].evenRow.push(React.createElement("td", {
                    key: r,
                    className: "pd-t-6 pd-b-6 pd-r-10 t-a-r"
                }, React.createElement(AllMarketPage.Market.Odds.AHOU, {
                    data: f
                })));
            }),
            r > t[u].oddRow.length)
                for (o = (r - t[u].oddRow.length) * 2,
                f = 0; f < o; f = f + 2)
                    e = f + t[0].oddRow.length,
                    t[u].oddRow.push(React.createElement("td", {
                        key: t[u].oddRow.length * 2 + e,
                        className: "pd-t-6 pd-b-6 pd-l-10 pd-r-10 t-a-r topBorder_lv3"
                    })),
                    t[u].evenRow.push(React.createElement("td", {
                        key: t[u].evenRow.length * 2 + e,
                        className: "pd-t-6 pd-b-6 pd-l-10 pd-r-10 t-a-r"
                    }));
        }),
        React.createElement("table", {
            className: "width-100p t-va-m" + (r <= 3 ? " noMergeOdds" : "") + (" col-" + r)
        }, React.createElement("colgroup", null , React.createElement("col", null ), u), _.map(t, function(n, t) {
            return React.createElement("tbody", {
                key: t,
                className: "hoverby-nopointer"
            }, React.createElement("tr", null , React.createElement("td", {
                className: " pd-t-6 pd-b-6 pd-l-10 pd-r-10 topBorder_lv3"
            }, React.createElement("div", {
                className: "t-va-b pd-t-4 ft-c-25"
            }, n.oddName)), n.oddRow), React.createElement("tr", null , React.createElement("td", {
                className: " pd-t-6 pd-b-6 pd-l-10 pd-r-10"
            }, React.createElement("div", {
                className: "t-va-b pd-t-4 ft-c-25"
            }, n.evenName)), n.evenRow));
        }));
    }
});
AllMarketPage.Market.MarketType.AHOU = React.createClass({
    displayName: "AHOU",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data;
        return React.createElement("table", {
            className: "width-100p t-va-t hoverabletb AHOU"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", null , _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: i
            }, _.map(t, function(r, u) {
                var f = {
                    isAH: n.isAH,
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: _.indexOf(n.highLightOdds, r[2].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: u == 0 ? n.isAH ? n.homeName : l.Odds_Over : n.isAH ? n.awayName : l.Odds_Under
                }
                  , e = this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: u,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (u == t.length - 1 ? "" : " rightBorder_lv1") + (i == 0 ? "" : " topBorder_lv3") + (this.isOddsUnaval(f.value) ? " nopointer nohighlight" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed85"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(f.value) ? " nopointer nohighlight" : "")
                }, f.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(f.value) ? " nopointer nohighlight" : "")
                }, React.createElement("div", {
                    className: "noMergeOdds"
                }, React.createElement(AllMarketPage.Market.Odds.AHOU, {
                    data: f
                })))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.OneXTwo = React.createClass({
    displayName: "OneXTwo",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data
          , t = [n.homeName, l.Odds_Draw, n.awayName];
        return React.createElement("table", {
            className: "width-100p t-va-t hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-40Percent"
        }), React.createElement("col", {
            className: "col-20Percent"
        }), React.createElement("col", {
            className: "col-40Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , _.map(n.odds, function(i, r) {
            var u = {
                value: i,
                score: n.score,
                child_score: n.child_score,
                inPlay: n.inPlay,
                eventId: n.eventId,
                parentEventId: n.parentEventId,
                isHL: i[0] == "" ? !1 : _.indexOf(n.highLightOdds, i[0].slice(1)) != -1,
                ocg: n.oddsChange,
                ot: n.oddsType,
                name: t[r]
            }
              , f = this.addSelection.bind(this, u);
            return React.createElement("td", {
                key: r,
                className: "t-va-m pd-0 pd-l-10 pd-r-10" + (r != n.odds.length - 1 ? " rightBorder_lv1" : "") + (this.isOddsUnaval(u.value) ? " nopointer nohighlight" : ""),
                onClick: f
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26"
            }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                className: "col-fixed45"
            })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(u.value) ? " nopointer nohighlight" : "")
            }, u.name), React.createElement("td", {
                className: "t-a-r pd-b-4" + (r == 0 ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(u.value) ? " nopointer nohighlight" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: u
            }))))));
        }, this))));
    }
});
AllMarketPage.Market.MarketType.CS = React.createClass({
    displayName: "CS",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data
          , i = n.odds[n.odds.length - 1]
          , r = _.slice(n.odds, 0, n.odds.length - 1)
          , t = {
            value: i,
            score: n.score,
            child_score: n.child_score,
            inPlay: n.inPlay,
            eventId: n.eventId,
            parentEventId: n.parentEventId,
            isHL: i[0] == "" ? !1 : _.indexOf(n.highLightOdds, i[0].slice(1)) != -1,
            ocg: n.oddsChange,
            ot: n.oddsType,
            name: i[0] == "" ? "" : i[2]
        }
          , u = t.value[1] == "" || t.value[1] == "0.00" ? null : this.addSelection.bind(this, t);
        return React.createElement("table", {
            className: "width-100p t-va-t setBet ignore1280 hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-20Percent"
        }), React.createElement("col", {
            className: "col-20Percent"
        }), React.createElement("col", {
            className: "col-20Percent"
        }), React.createElement("col", {
            className: "col-20Percent"
        }), React.createElement("col", {
            className: "col-20Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("th", {
            colSpan: "2",
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-c"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.homeName)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-c"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, l.Odds_Draw)))))), React.createElement("th", {
            colSpan: "2",
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-c"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.awayName))))))), _.map(r, function(t, i) {
            return React.createElement("tr", {
                key: i
            }, _.map(t, function(r, u) {
                var f = {
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: r[0] == "" ? !1 : _.indexOf(n.highLightOdds, r[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: r[2]
                }
                  , e = this.isOddsUnaval(f.value) ? null : this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: u,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (i > 0 ? " topBorder_lv3" : "") + (u < t.length - 1 ? u == 1 || u == 2 ? " rightBorder_lv3" : " rightBorder_lv1" : "") + (this.isOddsUnaval(f.value) ? " nopointer" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed55"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l pd-t-4 pd-b-4" + (this.isOddsUnaval(f.value) ? " nopointer" : "")
                }, React.createElement("span", {
                    className: "dark ft-c-16"
                }, f.name)), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(f.value) ? " nopointer" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: f
                }))))));
            }, this));
        }, this), React.createElement("tr", null , React.createElement("td", {
            colSpan: "5",
            className: "pd-t-5 pd-b-6 t-va-t pd-l-10 pd-r-10 topBorder_lv4 t-a-r bg-c-19" + (this.isOddsUnaval(t.value) ? " nopointer" : ""),
            onClick: u
        }, React.createElement("div", {
            className: "float-right"
        }, React.createElement(AllMarketPage.Market.Odds.Normal, {
            data: t
        })), React.createElement("div", {
            className: "t-va-b mg-r-60 pd-t-4 ft-c-21 fts-13"
        }, " ", t.name)))));
    }
});
AllMarketPage.Market.MarketType.SB = React.createClass({
    displayName: "SB",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data;
        return React.createElement("table", {
            className: "width-100p t-va-t hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-25Percent"
        }), React.createElement("col", {
            className: "col-25Percent"
        }), React.createElement("col", {
            className: "col-25Percent"
        }), React.createElement("col", {
            className: "col-25Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("th", {
            colSpan: "2",
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.homeName)), React.createElement("th", {
            colSpan: "2",
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.awayName))), _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: i
            }, _.map(t, function(r, u) {
                var f = {
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: r[0] == "" ? !1 : _.indexOf(n.highLightOdds, r[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: r[2]
                }
                  , e = this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: u,
                    colSpan: "2",
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (i > 0 ? " topBorder_lv3" : "") + (u < t.length - 1 ? " rightBorder_lv1" : "") + (this.isOddsUnaval(f.value) ? " nopointer" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l pd-t-4 pd-b-4" + (this.isOddsUnaval(f.value) ? " nopointer" : "")
                }, React.createElement("span", {
                    className: "dark ft-c-16"
                }, f.name)), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(f.value) ? " nopointer" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: f
                }))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.SB_BestOf = React.createClass({
    displayName: "SB_BestOf",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data, i = {}, t, r, u;
        return i.cols3 = [React.createElement("col", {
            key: "0",
            className: "col-25Percent"
        }), React.createElement("col", {
            key: "1",
            className: "col-25Percent"
        }), React.createElement("col", {
            key: "2",
            className: "col-25Percent"
        }), React.createElement("col", {
            key: "3",
            className: "col-25Percent"
        })],
        i.cols5 = [React.createElement("col", {
            key: "0",
            className: "col-16Percent"
        }), React.createElement("col", {
            key: "1",
            className: "col-16Percent"
        }), React.createElement("col", {
            key: "2",
            className: "col-16Percent"
        }), React.createElement("col", {
            key: "3",
            className: "col-16Percent"
        }), React.createElement("col", {
            key: "4",
            className: "col-16Percent"
        }), React.createElement("col", {
            key: "5",
            className: "col-16Percent"
        })],
        i.cols7 = [React.createElement("col", {
            key: "0",
            className: "col-12p5Percent"
        }), React.createElement("col", {
            key: "1",
            className: "col-12p5Percent"
        }), React.createElement("col", {
            key: "2",
            className: "col-12p5Percent"
        }), React.createElement("col", {
            key: "3",
            className: "col-12p5Percent"
        }), React.createElement("col", {
            key: "4",
            className: "col-12p5Percent col-secondRow"
        }), React.createElement("col", {
            key: "5",
            className: "col-12p5Percent col-secondRow"
        }), React.createElement("col", {
            key: "6",
            className: "col-12p5Percent col-secondRow"
        }), React.createElement("col", {
            key: "7",
            className: "col-12p5Percent col-secondRow"
        })],
        t = {},
        t.ths3 = [React.createElement("th", {
            key: "0",
            colSpan: "2",
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, n.homeName)), React.createElement("th", {
            key: "1",
            colSpan: "2",
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, n.awayName))],
        t.ths5 = [React.createElement("th", {
            key: "0",
            colSpan: "3",
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, n.homeName)), React.createElement("th", {
            key: "1",
            colSpan: "3",
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, n.awayName))],
        t.ths7 = [React.createElement("th", {
            key: "0",
            colSpan: "4",
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c td-4colspan fontWeight-normal"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, n.homeName)), React.createElement("th", {
            key: "1",
            colSpan: "4",
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c td-4colspan fontWeight-normal"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, n.awayName)), React.createElement("th", {
            key: "2",
            colSpan: "2",
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c td-2colspan fontWeight-normal"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, n.homeName)), React.createElement("th", {
            key: "3",
            colSpan: "2",
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c td-2colspan fontWeight-normal"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, n.awayName))],
        r = [],
        u = ["4 - 2", "2 - 4", "4 - 3", "3 - 4"],
        +n.bestOf == 7 && (r = _.filter(n.odds, function(n) {
            return _.indexOf(["4 - 2", "2 - 4", "4 - 3", "3 - 4"], n[2]) > -1;
        })),
        React.createElement("table", {
            className: "width-100p t-va-t hoverabletb" + (+n.bestOf != 3 ? " setBet ignore1280" : "")
        }, React.createElement("colgroup", null , i["cols" + n.bestOf]), React.createElement("tbody", null , React.createElement("tr", null , t["ths" + n.bestOf]), React.createElement("tr", null , _.map(n.odds, function(t, i) {
            var r = {
                value: t,
                score: n.score,
                child_score: n.child_score,
                inPlay: n.inPlay,
                eventId: n.eventId,
                parentEventId: n.parentEventId,
                isHL: t[0] == "" ? !1 : _.indexOf(n.highLightOdds, t[0].slice(1)) != -1,
                ocg: n.oddsChange,
                ot: n.oddsType,
                name: t[2]
            }
              , f = this.addSelection.bind(this, r);
            return React.createElement("td", {
                key: i,
                className: "t-va-m pd-0 pd-l-10 pd-r-10" + (i < n.odds.length - 1 ? " rightBorder_lv1" : "") + (_.indexOf(u, t[2]) > -1 ? " td-secondRow" : "") + (this.isOddsUnaval(r.value) ? " nopointer" : ""),
                onClick: f
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26"
            }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                className: "t-a-l pd-t-4 pd-b-4" + (this.isOddsUnaval(r.value) ? " nopointer" : "")
            }, React.createElement("span", {
                className: "dark ft-c-16"
            }, r.name)), React.createElement("td", {
                className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(r.value) ? " nopointer" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: r
            }))))));
        }, this)), React.createElement("tr", {
            className: "tr-secondRow" + (+n.bestOf != 7 ? " hidden" : "")
        }, _.map(r, function(t, i) {
            var u = {
                value: t,
                score: n.score,
                child_score: n.child_score,
                inPlay: n.inPlay,
                eventId: n.eventId,
                parentEventId: n.parentEventId,
                isHL: t[0] == "" ? !1 : _.indexOf(n.highLightOdds, t[0].slice(1)) != -1,
                ocg: n.oddsChange,
                ot: n.oddsType,
                name: t[2]
            }
              , f = this.addSelection.bind(this, u);
            return React.createElement("td", {
                key: i,
                className: "pd-t-6 pd-b-6 t-va-t pd-l-10 pd-r-10 td-secondRow topBorder_lv3 height-23" + (i == r.length - 1 ? "" : " rightBorder_lv1 "),
                onClick: f
            }, React.createElement("span", {
                className: "ft-1x2 ft-c-16 fts-13 mg-r-6 pos-relative top-4"
            }, u.name), React.createElement("div", {
                className: "float-right"
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: u
            })));
        }, this))));
    }
});
AllMarketPage.Market.MarketType.OE = React.createClass({
    displayName: "OE",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data
          , t = {
            value: n.odds[0],
            score: n.score,
            child_score: n.child_score,
            inPlay: n.inPlay,
            eventId: n.eventId,
            parentEventId: n.parentEventId,
            isHL: _.indexOf(n.highLightOdds, n.odds[0][0].slice(1)) != -1,
            ocg: n.oddsChange,
            ot: n.oddsType,
            name: l.Odds_Odd
        }
          , i = {
            value: n.odds[1],
            score: n.score,
            child_score: n.child_score,
            inPlay: n.inPlay,
            eventId: n.eventId,
            parentEventId: n.parentEventId,
            isHL: _.indexOf(n.highLightOdds, n.odds[1][0].slice(1)) != -1,
            ocg: n.oddsChange,
            ot: n.oddsType,
            name: l.Odds_Even
        };
        return React.createElement("table", {
            className: "width-100p t-va-t hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "rightBorder_lv1 t-va-m pd-0 pd-l-10 pd-r-10" + (this.isOddsUnaval(t.value) ? " nopointer nohighlight" : ""),
            onClick: this.addSelection.bind(this, t)
        }, React.createElement("table", {
            className: "width-100p v-aligntable lht-26"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(t.value) ? " nopointer" : "")
        }, l.Odds_Odd), React.createElement("td", {
            className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(t.value) ? " nopointer" : "")
        }, React.createElement(AllMarketPage.Market.Odds.Normal, {
            data: t
        })))))), React.createElement("td", {
            className: "t-va-m pd-0 pd-l-10 pd-r-10" + (this.isOddsUnaval(i.value) ? " nopointer nohighlight" : ""),
            onClick: this.addSelection.bind(this, i)
        }, React.createElement("table", {
            className: "width-100p v-aligntable lht-26"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(i.value) ? " nopointer" : "")
        }, l.Odds_Even), React.createElement("td", {
            className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(i.value) ? " nopointer" : "")
        }, React.createElement(AllMarketPage.Market.Odds.Normal, {
            data: i
        })))))))));
    }
});
AllMarketPage.Market.MarketType.ML = React.createClass({
    displayName: "ML",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data
          , t = {
            value: n.odds[0],
            score: n.score,
            child_score: n.child_score,
            inPlay: n.inPlay,
            eventId: n.eventId,
            parentEventId: n.parentEventId,
            isHL: _.indexOf(n.highLightOdds, n.odds[0][0].slice(1)) != -1,
            ocg: n.oddsChange,
            ot: n.oddsType,
            name: n.homeName
        }
          , i = {
            value: n.odds[1],
            score: n.score,
            child_score: n.child_score,
            inPlay: n.inPlay,
            eventId: n.eventId,
            parentEventId: n.parentEventId,
            isHL: _.indexOf(n.highLightOdds, n.odds[1][0].slice(1)) != -1,
            ocg: n.oddsChange,
            ot: n.oddsType,
            name: n.awayName
        };
        return React.createElement("table", {
            className: "width-100p t-va-t hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-50Percent"
        }), React.createElement("col", {
            className: "col-50Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "rightBorder_lv1 t-va-m pd-0 pd-l-10 pd-r-10" + (this.isOddsUnaval(t.value) ? " nopointer nohighlight" : "")
        }, React.createElement("table", {
            className: "width-100p v-aligntable lht-26",
            onClick: this.addSelection.bind(this, t)
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed45"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(t.value) ? " nopointer" : "")
        }, n.homeName), React.createElement("td", {
            className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(t.value) ? " nopointer" : "")
        }, React.createElement(AllMarketPage.Market.Odds.Normal, {
            data: t
        })))))), React.createElement("td", {
            className: "t-va-m pd-0 pd-l-10 pd-r-10 "
        }, React.createElement("table", {
            className: "width-100p v-aligntable lht-26" + (this.isOddsUnaval(i.value) ? " nopointer nohighlight" : ""),
            onClick: this.addSelection.bind(this, i)
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed45"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(i.value) ? " nopointer" : "")
        }, n.awayName), React.createElement("td", {
            className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(i.value) ? " nopointer" : "")
        }, React.createElement(AllMarketPage.Market.Odds.Normal, {
            data: i
        })))))))));
    }
});
AllMarketPage.Market.MarketType.TG = React.createClass({
    displayName: "TG",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data;
        return React.createElement("table", {
            className: "width-100p t-va-t hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-25Percent"
        }), React.createElement("col", {
            className: "col-25Percent"
        }), React.createElement("col", {
            className: "col-25Percent"
        }), React.createElement("col", {
            className: "col-25Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , _.map(n.odds, function(t, i) {
            var r = {
                value: t,
                score: n.score,
                child_score: n.child_score,
                inPlay: n.inPlay,
                eventId: n.eventId,
                parentEventId: n.parentEventId,
                isHL: _.indexOf(n.highLightOdds, t[0].slice(1)) != -1,
                ocg: n.oddsChange,
                ot: n.oddsType,
                name: t[2]
            }
              , u = this.addSelection.bind(this, r);
            return React.createElement("td", {
                key: i,
                className: "t-va-m pd-0 pd-l-10 pd-r-10" + (n.odds.length - 1 != i ? " rightBorder_lv1" : "") + (this.isOddsUnaval(r.value) ? " nopointer nohighlight" : ""),
                onClick: u
            }, React.createElement("table", {
                className: "width-100p v-aligntable lht-26"
            }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                className: "col-fixed45"
            })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(r.value) ? " nopointer" : "")
            }, r.name), React.createElement("td", {
                className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(r.value) ? " nopointer" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: r
            }))))));
        }, this))));
    }
});
AllMarketPage.Market.MarketType.HF = React.createClass({
    displayName: "HF",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data;
        return React.createElement("table", {
            className: "width-100p t-va-t hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        })), React.createElement("tbody", null , _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: i
            }, _.map(t, function(r, u) {
                var f = {
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: _.indexOf(n.highLightOdds, r[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: r[2]
                }
                  , e = this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: u,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (i == 0 ? "" : " topBorder_lv3") + (t.length - 1 != u ? " rightBorder_lv1" : "") + (this.isOddsUnaval(f.value) ? " nopointer nohighlight" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed45"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(f.value) ? " nopointer" : "")
                }, f.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(f.value) ? " nopointer" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: f
                }))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.TTS = React.createClass({
    displayName: "TTS",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var t = this.props.data
          , n = _.map(t.odds, function(n, i) {
            return _.map(n, function(n) {
                return {
                    value: n,
                    score: t.score,
                    child_score: t.child_score,
                    inPlay: t.inPlay,
                    eventId: t.eventId,
                    parentEventId: t.parentEventId,
                    isHL: typeof n[0] != "undefined" && _.indexOf(t.highLightOdds, n[0].slice(1)) != -1,
                    ocg: t.oddsChange,
                    ot: t.oddsType,
                    name: i == 0 ? t.homeName : i == 1 ? t.awayName : l.odds_NoGoal
                };
            });
        });
        return React.createElement("table", {
            className: "width-100p t-va-t hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-40Percent"
        }), React.createElement("col", {
            className: "col-40Percent"
        }), React.createElement("col", {
            className: "col-20Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("th", {
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-l fontWeight-normal"
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, l.Odds_FirstGoal)), React.createElement("th", {
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-l fontWeight-normal"
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, l.Odds_LastGoal)), React.createElement("th", {
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-l fontWeight-normal"
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, l.odds_NoGoal))), React.createElement("tr", null , React.createElement("td", {
            className: "t-va-m pd-0 pd-l-10 pd-r-10 rightBorder_lv1" + (this.isOddsUnaval(n[0][0].value) ? " nopointer nohighlight" : ""),
            onClick: this.addSelection.bind(this, n[0][0])
        }, React.createElement("table", {
            className: "width-100p v-aligntable lht-26"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed45"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(n[0][0].value) ? " nopointer" : "")
        }, t.homeName), React.createElement("td", {
            className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(n[0][0].value) ? " nopointer" : "")
        }, React.createElement(AllMarketPage.Market.Odds.Normal, {
            data: n[0][0]
        })))))), React.createElement("td", {
            className: "t-va-m pd-0 pd-l-10 pd-r-10 rightBorder_lv1" + (this.isOddsUnaval(n[1][0].value) ? " nopointer nohighlight" : ""),
            onClick: this.addSelection.bind(this, n[1][0])
        }, React.createElement("table", {
            className: "width-100p v-aligntable lht-26"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed45"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(n[1][0].value) ? " nopointer" : "")
        }, t.homeName), React.createElement("td", {
            className: "t-a-r pd-b-4 pd-t-5" + (this.isOddsUnaval(n[1][0].value) ? " nopointer" : "")
        }, React.createElement(AllMarketPage.Market.Odds.Normal, {
            data: n[1][0]
        })))))), React.createElement("td", {
            rowSpan: "2",
            className: "t-va-m pd-0 pd-l-10 pd-r-10 t-a-c" + (this.isOddsUnaval(n[0][2].value) ? " nopointer nohighlight" : ""),
            onClick: this.addSelection.bind(this, n[0][2])
        }, React.createElement("table", {
            className: "width-100p v-aligntable lht-26"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-t pd-b-4 pd-t-5" + (this.isOddsUnaval(n[0][2].value) ? " nopointer" : "")
        }, React.createElement(AllMarketPage.Market.Odds.Normal, {
            data: n[0][2]
        }))))))), React.createElement("tr", null , React.createElement("td", {
            className: "t-va-m pd-0 pd-l-10 pd-r-10 topBorder_lv3 rightBorder_lv1" + (this.isOddsUnaval(n[0][1].value) ? " nopointer nohighlight" : ""),
            onClick: this.addSelection.bind(this, n[0][1])
        }, React.createElement("table", {
            className: "width-100p v-aligntable lht-26"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed45"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(n[0][1].value) ? " nopointer" : "")
        }, t.awayName), React.createElement("td", {
            className: "t-a-r pd-b-4 pd-t-4" + (this.isOddsUnaval(n[0][1].value) ? " nopointer" : "")
        }, React.createElement(AllMarketPage.Market.Odds.Normal, {
            data: n[0][1]
        })))))), React.createElement("td", {
            className: "t-va-m pd-0 pd-l-10 pd-r-10 topBorder_lv3 rightBorder_lv1" + (this.isOddsUnaval(n[1][1].value) ? " nopointer nohighlight" : ""),
            onClick: this.addSelection.bind(this, n[1][1])
        }, React.createElement("table", {
            className: "width-100p v-aligntable lht-26"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed45"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(n[1][1].value) ? " nopointer" : "")
        }, t.awayName), React.createElement("td", {
            className: "t-a-r pd-b-4 pd-t-4" + (this.isOddsUnaval(n[1][1].value) ? " nopointer" : "")
        }, React.createElement(AllMarketPage.Market.Odds.Normal, {
            data: n[1][1]
        })))))))));
    }
});
AllMarketPage.Market.MarketType.SCO = React.createClass({
    displayName: "SCO",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data;
        return React.createElement("table", {
            className: "width-100p t-va-m setBet hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-20Percent"
        }), React.createElement("col", {
            className: "col-10Percent"
        }), React.createElement("col", {
            className: "col-10Percent"
        }), React.createElement("col", {
            className: "col-10Percent"
        }), React.createElement("col", {
            className: "col-20Percent"
        }), React.createElement("col", {
            className: "col-10Percent"
        }), React.createElement("col", {
            className: "col-10Percent"
        }), React.createElement("col", {
            className: "col-10Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("th", {
            colSpan: "4",
            className: "t-va-m pd-l-10 pd-r-10 bg-c-20 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-c"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-3 lht-14"
        }, n.homeName)))))), React.createElement("th", {
            colSpan: "4",
            className: "t-va-m pd-l-10 pd-r-10 bg-c-20 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-c"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-3 lht-14"
        }, n.awayName))))))), React.createElement("tr", null , React.createElement("th", {
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-l fontWeight-normal"
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, l.OP_Player)), React.createElement("th", {
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, l.Odds_First)), React.createElement("th", {
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14  "
        }, l.Odds_Last)), React.createElement("th", {
            className: "pd-t-8 pd-b-7 t-va-t bg-c-18 t-a-c rightBorder_lv1 fontWeight-normal"
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, l.OddsMB_Anytime)), React.createElement("th", {
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-l fontWeight-normal"
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, l.OP_Player)), React.createElement("th", {
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, l.Odds_First)), React.createElement("th", {
            className: "pd-t-8 pd-b-7 t-va-t pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal"
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, l.Odds_Last)), React.createElement("th", {
            className: "pd-t-8 pd-b-7 t-va-t bg-c-18 t-a-c fontWeight-normal"
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14 "
        }, l.OddsMB_Anytime))), _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: i,
                className: (i > 4 || _.findIndex(t, "k", "a2") > -1 || _.findIndex(t, "k", "h1") > -1) && _.indexOf(n.showMoreEventIds, n.eventId) == -1 ? " hidden" : ""
            }, _.map(t, function(t, r) {
                return t !== undefined ? React.createElement("td", {
                    key: r,
                    colSpan: "4",
                    className: "pd-0" + (i == 0 ? "" : " topBorder_lv3") + (r == 0 ? " rightBorder_lv1" : "")
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-33 indivtb" + (t.k == "h1" ? " mergehover" : "")
                }, React.createElement("colgroup", null , React.createElement("col", {
                    className: "col-40Percent"
                }), React.createElement("col", {
                    className: "col-20Percent"
                }), React.createElement("col", {
                    className: "col-20Percent"
                }), React.createElement("col", {
                    className: "col-20Percent"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "pd-l-10 t-a-l ft-c-25 lht-14 pd-r-10 lht-14 idv-name"
                }, t.n), _.map(t.o, function(i, r) {
                    var u = {
                        value: i,
                        score: n.score,
                        child_score: n.child_score,
                        inPlay: n.inPlay,
                        eventId: n.eventId,
                        parentEventId: n.parentEventId,
                        isHL: typeof i[0] != "undefined" && _.indexOf(n.highLightOdds, i[0].slice(1)) != -1,
                        ocg: n.oddsChange,
                        ot: n.oddsType,
                        name: t.n
                    }
                      , f = this.addSelection.bind(this, u);
                    return React.createElement("td", {
                        key: r,
                        className: "t-a-c" + (r != t.o.length - 1 ? " pd-l-10 pd-r-10" : "") + (i[0] === undefined ? " nopointer idv-name" : ""),
                        onClick: f
                    }, t.k == "h1" && r != t.o.length - 1 ? null : React.createElement(AllMarketPage.Market.Odds.Normal, {
                        data: u
                    }));
                }, this))))) : React.createElement("td", {
                    colSpan: "4",
                    className: "rightBorder_lv1 topBorder_lv3 pd-0 nopointer nohighlight"
                });
            }, this));
        }, this), React.createElement("tr", null , React.createElement("td", {
            colSpan: "8",
            className: "pd-t-11 pd-b-10 t-va-t pd-l-10 pd-r-10 bg-c-49 t-a-c" + (_.indexOf(n.showMoreEventIds, n.eventId) == -1 ? " td-showMore" : " td-showLess"),
            onClick: this._switchLessMore.bind(this, n.eventId)
        }, React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-3 lht-14 showless"
        }, l.MB_ShowLess), React.createElement("div", {
            className: "dsp-iblk fts-13 ft-c-3 lht-14 showmore"
        }, l.MB_ShowMore)))));
    },
    _switchLessMore: function(n, t) {
        t.preventDefault();
        t.stopPropagation();
        Action.AllMarket.switchLessMore(n);
    }
});
AllMarketPage.Market.MarketType.WM = React.createClass({
    displayName: "WM",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data;
        return React.createElement("table", {
            className: "width-100p t-va-m hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.homeName)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, l.Odds_Draw)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.awayName))))))), _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: "wm0" + i
            }, _.map(t, function(r, u) {
                var f = {
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: _.indexOf(n.highLightOdds, r[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: r[2]
                }
                  , e = r[1] == "" || r[1] == "0.00" ? null : this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: "wm1" + u,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "") + (i == 0 ? "" : " topBorder_lv3") + (t.length - 1 != u ? " rightBorder_lv1" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed45"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, f.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: f
                }))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.NG = React.createClass({
    displayName: "NG",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data;
        return React.createElement("table", {
            className: "width-100p t-va-m hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        })), React.createElement("tbody", null , _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: "ng0" + i
            }, _.map(t, function(r, u) {
                var f = {
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: _.indexOf(n.highLightOdds, r[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: r[2]
                }
                  , e = r[1] == "" || r[1] == "0.00" ? null : this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: "ng1" + u,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "") + (i == 0 ? "" : " topBorder_lv3") + (t.length - 1 != u ? " rightBorder_lv1" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed45"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, f.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: f
                }))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.WQ = React.createClass({
    displayName: "WQ",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data;
        return React.createElement("table", {
            className: "width-100p t-va-m hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.homeName)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-c"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        })))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.awayName)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-c"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }))))))), _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: "wq0" + i
            }, _.map(t, function(r, u) {
                var f = {
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: _.indexOf(n.highLightOdds, r[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: this.getSnameOrMname(r[2], 2, "-")
                }
                  , e = r[1] == "" || r[1] == "0.00" ? null : this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: "wq1" + u,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "") + (i == 0 ? "" : " topBorder_lv3") + (t.length - 1 != u ? " rightBorder_lv1" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed45"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, f.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: f
                }))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.GBB = React.createClass({
    displayName: "GBB",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data;
        return React.createElement("table", {
            className: "width-100p t-va-m hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.homeName)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, l.Odds_Draw)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.awayName))))))), _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: "gbb0" + i
            }, _.map(t, function(r, u) {
                var f = {
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: _.indexOf(n.highLightOdds, r[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: this.getSnameOrMname(r[2], 2, "&")
                }
                  , e = r[1] == "" || r[1] == "0.00" ? null : this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: "gbb1" + u,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "") + (i == 0 ? "" : " topBorder_lv3") + (t.length - 1 != u ? " rightBorder_lv1" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed45"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, f.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: f
                }))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.DC = React.createClass({
    displayName: "DC",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data;
        return React.createElement("table", {
            className: "width-100p t-va-m hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.homeName, "/", l.Odds_Draw)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.awayName, "/", l.Odds_Draw)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.homeName, "/", n.awayName))))))), _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: "dc0" + i
            }, _.map(t, function(r, u) {
                var f = {
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: _.indexOf(n.highLightOdds, r[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: this.getSnameOrMname(r[2], 2, "&")
                }
                  , e = r[1] == "" || r[1] == "0.00" ? null : this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: "dc1" + u,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "") + (i == 0 ? "" : " topBorder_lv3") + (t.length - 1 != u ? " rightBorder_lv1" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed45"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, f.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: f
                }))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.GB = React.createClass({
    displayName: "GB",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data
          , t = this.getSnameOrMname(n.odds[0][0][2], 0, "&") != "" ? this.getSnameOrMname(n.odds[0][0][2], 0, "&") : this.getSnameOrMname(n.odds[0][1][2], 0, "&")
          , i = this.getSnameOrMname(n.odds[0][2][2], 0, "&") != "" ? this.getSnameOrMname(n.odds[0][2][2], 0, "&") : this.getSnameOrMname(n.odds[0][3][2], 0, "&");
        return React.createElement("table", {
            className: "width-100p t-va-m hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, t)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-c"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        })))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, i)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-c"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }))))))), _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: "dc0" + i
            }, _.map(t, function(r, u) {
                var f = {
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: _.indexOf(n.highLightOdds, r[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: this.getSnameOrMname(r[2], 2, "&")
                }
                  , e = r[1] == "" || r[1] == "0.00" ? null : this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: "dc1" + u,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "") + (i == 0 ? "" : " topBorder_lv3") + (t.length - 1 != u ? " rightBorder_lv1" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed45"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, f.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: f
                }))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.GTS = React.createClass({
    displayName: "GTS",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data
          , t = this.getSnameOrMname(n.odds[0][0][2], 0, "&") != "" ? this.getSnameOrMname(n.odds[0][0][2], 0, "&") : this.getSnameOrMname(n.odds[1][0][2], 0, "&")
          , i = this.getSnameOrMname(n.odds[0][1][2], 0, "&") != "" ? this.getSnameOrMname(n.odds[0][1][2], 0, "&") : this.getSnameOrMname(n.odds[1][1][2], 0, "&");
        return React.createElement("table", {
            className: "width-100p t-va-m hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, t)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, i))))))), _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: "gts0" + i
            }, _.map(t, function(r, u) {
                var f = {
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: _.indexOf(n.highLightOdds, r[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: this.getSnameOrMname(r[2], 2, "&")
                }
                  , e = r[1] == "" || r[1] == "0.00" ? null : this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: "gts1" + u,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "") + (i == 0 ? "" : " topBorder_lv3") + (t.length - 1 != u ? " rightBorder_lv1" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed45"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, f.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: f
                }))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.NP = React.createClass({
    displayName: "NP",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data;
        return React.createElement("table", {
            className: "width-100p t-va-m hoverabletb"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        }), React.createElement("col", {
            className: "col-33Percent"
        })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.homeName)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        })))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }, n.awayName)))))), React.createElement("th", {
            className: "t-va-m pd-l-10 pd-r-10 bg-c-18 t-a-c fontWeight-normal pd-0"
        }, React.createElement("table", {
            className: "width-100p v-aligntable mHeight-30"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
            className: "t-a-l"
        }, React.createElement("span", {
            className: "dsp-iblk fts-13 ft-c-22 lht-14"
        }))))))), _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: "np0" + i
            }, _.map(t, function(r, u) {
                var f = {
                    value: r,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: _.indexOf(n.highLightOdds, r[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: r[2]
                }
                  , e = r[1] == "" || r[1] == "0.00" ? null : this.addSelection.bind(this, f);
                return React.createElement("td", {
                    key: "np1" + u,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "") + (i == 0 ? "" : " topBorder_lv3") + (t.length - 1 != u ? " rightBorder_lv1" : ""),
                    onClick: e
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: "col-fixed45"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, f.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (r[1] == "" || r[1] == "0.00" ? " nopointer nohighlight" : "")
                }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: f
                }))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.SPWOS = React.createClass({
    displayName: "SPWOS",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var n = this.props.data
          , i = React.createElement("col", {
            key: "c0",
            className: "col-100Percent"
        })
          , r = [React.createElement("col", {
            key: "c0",
            className: "col-50Percent"
        }), React.createElement("col", {
            key: "c1",
            className: "col-50Percent"
        })]
          , u = [React.createElement("col", {
            key: "c0",
            className: "col-33Percent"
        }), React.createElement("col", {
            key: "c1",
            className: "col-33Percent"
        }), React.createElement("col", {
            key: "c2",
            className: "col-33Percent"
        })]
          , t = {};
        switch (n.odds[0].length) {
        case 1:
            t = i;
            break;
        case 2:
            t = r;
            break;
        case 3:
            t = u;
        }
        return React.createElement("table", {
            className: "width-100p t-va-t hoverabletb SPWOS"
        }, React.createElement("colgroup", null , t), React.createElement("tbody", null , _.map(n.odds, function(t, i) {
            return React.createElement("tr", {
                key: i
            }, _.map(t, function(t, r) {
                var u = {
                    value: t,
                    score: n.score,
                    child_score: n.child_score,
                    inPlay: n.inPlay,
                    eventId: n.eventId,
                    parentEventId: n.parentEventId,
                    isHL: typeof t[0] != "undefined" && _.indexOf(n.highLightOdds, t[0].slice(1)) != -1,
                    ocg: n.oddsChange,
                    ot: n.oddsType,
                    name: t.length == 5 ? t[4] : t[2]
                }
                  , f = this.isOddsUnaval(t) ? null : this.addSelection.bind(this, u);
                return React.createElement("td", {
                    key: r,
                    className: "t-va-m pd-0 pd-l-10 pd-r-10" + (this.isOddsUnaval(u.value) ? " nopointer nohighlight" : "") + (i == 0 ? "" : " topBorder_lv3") + (r != t.length - 1 ? " rightBorder_lv1" : ""),
                    onClick: f
                }, React.createElement("table", {
                    className: "width-100p v-aligntable lht-26"
                }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
                    className: t.length == 5 ? "col-fixed85" : "col-fixed45"
                })), React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", {
                    className: "t-a-l ft-c-25 lht-14 pd-r-10" + (this.isOddsUnaval(u.value) ? " nopointer nohighlight" : "")
                }, u.name), React.createElement("td", {
                    className: "t-a-r pd-b-4" + (i == 0 ? " pd-t-5" : " pd-t-4") + (this.isOddsUnaval(u.value) ? " nopointer nohighlight" : "")
                }, t.length == 5 ? React.createElement("div", {
                    className: "noMergeOdds"
                }, React.createElement(AllMarketPage.Market.Odds.AHOU, {
                    data: u
                })) : React.createElement(AllMarketPage.Market.Odds.Normal, {
                    data: u
                }))))));
            }, this));
        }, this)));
    }
});
AllMarketPage.Market.MarketType.EPS = React.createClass({
    displayName: "EPS",
    mixins: [AllMarketPage.Utility.market],
    render: function() {
        var t = 2
          , n = this.props.data;
        return n == null ? null : React.createElement("div", {
            className: "bg-c-1"
        }, React.createElement("table", {
            className: "tb-eps width-100p fts-13"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed65"
        }), React.createElement("col", {
            className: "col-fixed65"
        })), React.createElement("thead", {
            className: " ft-c-3  radius"
        }, React.createElement("tr", null , React.createElement("th", {
            className: "height-38 bg-c-4  t-a-l fontWeight-normal pd-l-10"
        }, n.market.n), React.createElement("th", {
            className: "height-38 ft-c-56 t-a-c bg-c-4 fontWeight-normal "
        }, l.OP_Was), React.createElement("th", {
            className: "height-38 t-a-c  bg-c-4  fontWeight-normal "
        }, l.OP_Now)))), React.createElement("table", {
            className: "tb-eps width-100p fts-13"
        }, React.createElement("colgroup", null , React.createElement("col", null ), React.createElement("col", {
            className: "col-fixed65"
        }), React.createElement("col", {
            className: "col-fixed65"
        })), React.createElement("tbody", null , _.map(n.odds, function(i, r) {
            var u = {
                value: i,
                score: ":",
                child_score: ":",
                inPlay: n.inPlay,
                eventId: n.eventId,
                parentEventId: n.parentEventId,
                isHL: typeof i[0] != "undefined" && _.indexOf(n.highLightOdds, i[0].slice(1)) != -1,
                ocg: n.oddsChange,
                ot: n.oddsType,
                name: i[2]
            }
              , f = this.isOddsUnaval(i) ? null : this.addSelection.bind(this, u, !1);
            return React.createElement("tr", {
                key: r,
                className: !AMStore.getShowMoreLess_EPS() && r >= t ? "hidden" : ""
            }, React.createElement("td", {
                className: "pd-0 pd-l-10 height-40 ft-c-25"
            }, i[2]), React.createElement("td", {
                className: "pd-0 t-a-c height-40"
            }, React.createElement("span", {
                className: "odds odds-last linethrough"
            }, i[3])), React.createElement("td", {
                className: "pd-0 t-a-c height-40" + (this.isOddsUnaval(u.value) ? " nopointer nohighlight" : "")
            }, React.createElement(AllMarketPage.Market.Odds.Normal, {
                data: u
            })));
        }, this))), React.createElement("div", {
            className: "viewall lht-35 t-a-c fts-13 topBorder" + (AMStore.getShowMoreLess_EPS() ? " td-showLess" : " td-showMore") + (n.odds.length <= t ? " hidden" : ""),
            onClick: this._switchLessMore
        }, React.createElement("div", {
            className: "showless"
        }, l.MB_ShowLess), React.createElement("div", {
            className: "showmore"
        }, l.MB_ShowMore)));
    },
    _switchLessMore: function(n) {
        n.preventDefault();
        n.stopPropagation();
        Action.AllMarket.switchLessMore_EPS(!AMStore.getShowMoreLess_EPS());
    }
});
AllMarketPage.Market.Odds = {};
AllMarketPage.Market.Odds.AHOU = React.createClass({
    displayName: "AHOU",
    mixins: [AllMarketPage.Utility.odds],
    render: function() {
        var n = this.props.data, t = n.value, i = n.OU, u = n.isAH, f, r;
        return n.inPlay && t[3] == "0.00" ? React.createElement(AllMarketPage.Market.Odds.Locked, {
            eid: t[2]
        }) : (f = n.child_score == "" || n.child_score == ":" ? n.score : n.child_score,
        r = this.getUpDownflag(n.ocg, t[2]),
        React.createElement("div", {
            className: "OddsWrapper dsp-iblk lht-1p2" + (n.isHL ? " selected" : "") + (r == 0 ? "" : r == 1 ? " oddsUp" : " oddsDown"),
            title: n.name
        }, React.createElement("span", {
            className: "ouHdp"
        }, !u && typeof i != "undefined" && i != "" ? React.createElement("span", {
            className: "ou mg-r-6  ft-c-18"
        }, i) : null , React.createElement("span", {
            className: "handicap dark ft-c-16 mg-r-6"
        }, t[1])), React.createElement("span", {
            className: "odds" + (parseFloat(t[3]) < 0 ? " negOdds" : ""),
            id: t[2],
            onClick: this.addSelection.bind(this, t[2].substring(1), n.eventId, t[3], t[1], f, n.inPlay, n.parentEventId)
        }, React.createElement("span", {
            className: "ouHdp pd-b-3 pd-t-3"
        }, !u && typeof i != "undefined" && i != "" ? React.createElement("span", {
            className: "ou"
        }, i) : null , t[3] != "0.00" ? React.createElement("span", {
            className: "handicap"
        }, t[1]) : React.createElement("span", {
            className: "odds-blank"
        })), t[3])));
    }
});
AllMarketPage.Market.Odds.Normal = React.createClass({
    displayName: "Normal",
    mixins: [AllMarketPage.Utility.odds],
    render: function() {
        var i;
        if (typeof this.props.data == "undefined")
            return null ;
        var n = this.props.data
          , t = n.value
          , r = n.child_score == "" || n.child_score == ":" ? n.score : n.child_score;
        return typeof t[0] == "undefined" || t[0] == "" ? React.createElement("div", null ) : n.inPlay && (t[1] == "c" || t[1] == "0.00") ? React.createElement(AllMarketPage.Market.Odds.Locked, {
            eid: t[0]
        }) : (i = this.getUpDownflag(n.ocg, t[0]),
        React.createElement("div", {
            className: "OddsWrapper dsp-iblk lht-1p2" + (n.isHL ? " selected" : "") + (i == 0 ? "" : i == 1 ? " oddsUp" : " oddsDown"),
            title: n.name,
            onClick: this.addSelection.bind(this, t[0].substring(1), n.eventId, t[1], null , r, n.inPlay, n.parentEventId)
        }, typeof t[1] != "undefined" && parseFloat(t[1]) != "0.00" ? React.createElement("span", {
            className: "odds odds-last",
            id: t[0]
        }, t[1]) : React.createElement("span", {
            className: "odds-blank"
        })));
    }
});
AllMarketPage.Market.Odds.Locked = React.createClass({
    displayName: "Locked",
    render: function() {
        return React.createElement("div", {
            className: "OddsWrapper dsp-iblk"
        }, React.createElement("span", {
            className: "odds locked",
            id: this.props.eid
        }, React.createElement("span", {
            className: "icon-Lock"
        }), React.createElement("svg", {
            width: "37",
            height: "20",
            className: "lockedBg"
        }, React.createElement("rect", {
            width: "100%",
            height: "100%",
            fill: "url(#p1)"
        }))));
    }
});
AllMarketPage.Button = {};
AllMarketPage.Button.Stat = React.createClass({
    displayName: "Stat",
    render: function() {
        return React.createElement("span", {
            className: "dsp-iblk icon-Stats fts-13 wh-ht-22 lht-22",
            onClick: this._openStatWindow.bind(this, this.props.eventId)
        });
    },
    _openStatWindow: function(n, t) {
        t.preventDefault();
        t.stopPropagation();
        var i = screen.width / 2 - 1005 / 2
          , r = screen.height / 2 - 360
          , u = "center=yes,resizable=yes,scrollbars=yes, width=1005, height=720,left=" + i + ",top=" + r;
        window.open("/" + global.lan + "/info-centre/sportsbook-info/statistics/" + n, "statistics", u);
    }
});
AllMarketPage.Button.Refresh = React.createClass({
    displayName: "Refresh",
    render: function() {
        return React.createElement("span", {
            className: "dsp-iblk icon-Refresh fts-16 wh-ht-22 lht-22",
            onClick: this._refreshData
        });
    },
    _refreshData: function(n) {
        n.preventDefault();
        n.stopPropagation();
        cCtrl.loadContent(location.pathname, !1, !1, null , !0);
    }
});
LPM.createClass("Sport", {
    mixins: ["longNameTooltipMixin"],
    componentDidMount: function() {
        this.setState({
            sn: this.getDisplayName(this.props.s.sn, "s")
        });
    },
    componentWillReceiveProps: function(n) {
        this.setState({
            sn: this.getDisplayName(n.s.sn, "s")
        });
    },
    render: function() {
        var t, n = this.props.count;
        return LPM.view == VIEW.INPLAY && (this.props.s.sid == -1 ? n = LPM.store.LeftPanel.state.tipc : this.props.s.sid == 1 && (n = LPM.store.LeftPanel.state.ipFB.ipc)),
        this.props.showCount && (t = React.createElement("span", {
            className: classNames("badge", {
                on: this.props.active,
                off: !this.props.active
            }),
            title: l.LP_NumberOfInplayEvents
        }, n)),
        React.createElement("li", {
            className: classNames("has-menu-c", {
                active: this.props.active
            }),
            onClick: this.select
        }, React.createElement("a", {
            className: "menu-T"
        }, React.createElement("span", null , this.state.sn)), React.createElement(LeftPanel.Icon, {
            sid: this.props.s.sid,
            sn: this.props.s.sn,
            showCount: this.props.showCount
        }), t);
    },
    select: function() {
        Action.LeftPanel.sport(this.props.s, LPM.view);
    }
});


LPM.createClass("ViewAllBtn", {
    getDefaultProps: function() {
        return {
            onClick: function() {
                console.log("click")
            }
        };
    },
    render: function() {
        return React.createElement("li", {
            id: "viewmore",
            onClick: this.props.onClick
        }, React.createElement("a", "null" , l.LP_View_All));
    }
});


LPM.createClass("ExpandableSport", {
    mixins: ["expandMixin", "longNameTooltipMixin"],
    componentDidMount: function() {
        this.setState({
            sn: this.getDisplayName(this.props.d.sn, "s")
        });
    },
    componentWillReceiveProps: function(n) {
        this.setState({
            sn: this.getDisplayName(n.d.sn, "s")
        });
    },
    render: function() {
        var n = this.props.d, e = this.props.actives, r = {}, t = this.isSelected(), i;
        this.props.viewAll && this.props.viewAll[n.sid] && (r = this.props.viewAll[n.sid]);
        var i = null
          , u = n.puc
          , f = this.props.count;
        return n.sid == 1 && LPM.view == VIEW.INPLAY && (u = LPM.store.LeftPanel.state.ipFB.puc,
        f = LPM.store.LeftPanel.state.ipFB.ipc),
        LPM.collapsed || (i = React.createElement("ul", {
            ref: "expandObj",
            style: this.getExpandStyle()
        }, LPM.collapsed ? React.createElement("li", {
            className: "has-menu-t"
        }, React.createElement("a", {
            className: "menu-T"
        }, React.createElement("span", null , this.state.sn)), React.createElement("a", {
            className: "icon icon-removeIcon closeicon",
            onClick: this.expand
        })) : null , _.map(_.filter(u), function(t) {
            if (!t.ces || t.ces.length == 0)
                return null ;
            var i = {
                actives: e,
                d: t,
                key: t.cid,
                me: this.props.me,
                selected: this.props.selected,
                v: this.props.v,
                viewAll: r[t.cid],
                et: this.props.et,
                s: n.sid
            };
            return React.createElement(LeftPanel.ExpandableCompetition, React.__spread({}, i));
        }, this))),
        React.createElement("div", {
            className: "sportlist"
        }, React.createElement("li", {
            className: classNames("has-menu-c", {
                active: t
            }),
            onClick: this.submenu
        }, React.createElement("span", {
            className: this.getExpandIconCss()
        }), React.createElement("a", {
            className: "float-left menu-T"
        }, React.createElement("span", null , this.state.sn)), React.createElement(LeftPanel.Icon, {
            sid: n.sid,
            sn: n.sn,
            showCount: LPM.view == VIEW.INPLAY
        }), LPM.view == VIEW.INPLAY ? React.createElement("span", {
            className: classNames("badge", {
                on: t,
                off: !t
            }),
            title: l.LP_NumberOfInplayEvents
        }, f) : null ), i);
    },
    getActiveKey: function() {
        return "s" + this.props.d.sid;
    },
    isSelected: function() {
        return LPM.view == VIEW.INPLAY || LPM.view == VIEW.STARTINGSOON ? LPM.collapsed ? _.contains(this.props.actives, this.getActiveKey()) : _.where(this.props.d.puc, {
            ces: [{
                eid: this.props.selected
            }]
        }).length > 0 : !1;
    },
    submenu: function(n) {
        LPM.collapsed ? Action.LeftPanel.expand(this.getActiveKey()) : this.expand(n);
    }
});
LPM.createClass("ExpandableCompetition", {
    mixins: ["expandMixin", "longNameTooltipMixin"],
    componentDidMount: function() {
        this.setState({
            cn: this.getDisplayName(this.props.d.cn, "c", !0)
        });
    },
    componentWillReceiveProps: function(n) {
        this.setState({
            cn: this.getDisplayName(n.d.cn, "c", !0)
        });
    },
    getDefaultProps: function() {
        return {
            prefix: "c"
        };
    },
    render: function() {
        var n = this.props.d, t = {}, i = n.ces, r;
        return !this.props.viewAll || this.props.viewAll.all || (i = _.take(n.ces, this.props.viewAll.limit)),
        t = _.map(i, function(n) {
            return React.createElement(this.props.et, {
                d: n,
                key: n.eid,
                selected: this.props.selected,
                s: this.props.s
            });
        }, this),
        this.props.viewAll && !this.props.viewAll.all && t.push(React.createElement(LeftPanel.ViewAllBtn, {
            key: "-1",
            onClick: this.viewAll.bind(this, n.cid)
        })),
        React.createElement("div", {
            className: classNames("group", {
                hasScroll: LPM.collapsed
            })
        }, React.createElement("li", {
            className: "sp-has-menu",
            title: n.cn
        }, r, React.createElement("div", {
            onClick: this.expand
        }, React.createElement("span", {
            className: this.getExpandIconCss()
        }), React.createElement("a", {
            className: "has-menu-title"
        }, this.state.cn))), React.createElement("ul", {
            className: "has-menu-box",
            ref: "expandObj",
            style: this.getExpandStyle()
        }, t));
    },
    viewAll: function(n) {
        Action.LeftPanel.viewAll(n, LPM.view);
    },
    getActiveKey: function() {
        return "c" + this.props.d.cid;
    }
});
LPM.createClass("Icon", {
    render: function() {
        var t = this.props.sid == -1, n;
        if (t)
            switch (global.lan) {
            case "en-gb":
            case "zh-cn":
                n = l.LP_All;
                break;
            default:
                n = "A-Z";
            }
        return React.createElement("span", {
            className: this.getIconCss(this.props.sid),
            "data-tooltip": n,
            title: t ? l.LP_All : this.props.sn
        });
    },
    getIconCss: function(n) {
        n == -1 && (n = "All");
        var t = "icon";
        return this.props.showCount && (t += " icon-small"),
        t + (" icon-" + n);
    }
});
LPM.createClass("N", {
    render: function() {
        return React.createElement("span", {
            title: l.neut
        }, React.createElement("span", {
            className: "neutral"
        }, React.createElement("span", {
            className: "icon-Neutralbg"
        }), React.createElement("span", {
            className: "icon-NeutralN"
        })));
    }
});
LPM.createClass("QuickMenu", {
    render: function() {
        var n = l.LP_QuickLinks;
        return React.createElement("div", {
            className: "sidebar-row hasSubmenu",
            onClick: this.submenu
        }, React.createElement("ul", {
            className: "sub-menu sports"
        }, React.createElement("p", {
            className: classNames("menu-title competitions"),
            style: {
                cursor: LPM.collapsed ? "pointer" : "default",
                paddingRight: LPM.collapsed ? 3 : 0
            },
            ref: "title"
        }, React.createElement("a", {
            style: {
                cursor: "default"
            }
        }, n), React.createElement("span", {
            className: "icon icon-Quicklinks",
            title: n,
            style: {
                maginRight: 3
            }
        })), React.createElement("ul", {
            className: "sub-menu mycomps",
            ref: "quickmenu"
        }, _.map(this.props.data, function(n, t) {
            return React.createElement(LeftPanel.QuickLink, React.__spread({
                key: t
            }, n));
        })), React.createElement("p", null )));
    },
    submenu: function(n) {
        n.stopPropagation();
        LPM.collapsed && Action.LeftPanel.expand("sqm");
    }
});
LPM.createClass("QuickLink", {
    render: function() {
        var n = l.LP_Prestart;
        return React.createElement("li", {
            className: "has-menu-row",
            onClick: this.link,
            style: {
                minHeight: 30
            }
        }, React.createElement("a", null , React.createElement("span", null , n), React.createElement("p", null , this.props.sn)));
    },
    link: function() {
        Action.LeftPanel.sport(this.props, VIEW.PRESTART);
    }
});
LPM.createClass("QuickSubMenu", {
    render: function() {
        var n = l.LP_QuickLinks;
        return React.createElement("div", {
            className: "sidebar-row hasSubmenu"
        }, React.createElement("ul", {
            className: "sub-menu sports brr-c-1"
        }, React.createElement("p", {
            className: classNames("menu-title competitions"),
            style: {
                padding: 0,
                cursor: "default"
            },
            ref: "title"
        }, React.createElement("a", {
            style: {
                cursor: "default"
            }
        }, n), React.createElement("a", {
            className: "icon icon-removeIcon closeicon",
            style: {
                right: 0,
                cursor: "pointer"
            },
            onClick: this.close
        })), React.createElement("ul", {
            className: "sub-menu mycomps",
            ref: "quickmenu"
        }, _.map(this.props.data, function(n, t) {
            return React.createElement(LeftPanel.QuickLink, React.__spread({
                key: t
            }, n));
        })), React.createElement("p", null )));
    },
    close: function(n) {
        n.stopPropagation();
        LPM.collapsed && Action.LeftPanel.expand("sqm");
    }
});
LPM.createClass("TeamName", {
    mixins: ["longNameTooltipMixin"],
    componentDidMount: function() {
        this.setState({
            n: this.getDisplayName(this.props.n, "t", !0)
        });
    },
    componentWillReceiveProps: function(n) {
        this.setState({
            n: this.getDisplayName(n.n, "t", !0)
        });
    },
    render: function() {
        var n, t;
        return this.state.enalbeLongNameTooltip ? (t = this.props.n,
        n = this.state.n) : n = this.props.n,
        LPM.view == VIEW.STARTINGSOON ? React.createElement("p", {
            title: t
        }, n) : React.createElement("span", {
            className: "row-2",
            title: t
        }, n);
    }
});
LPM.createStatefulClass("InPlay", {
    mixins: ["scrollbarMixin"],
    render: function() {
        var u = LeftPanel.InPlayEvent, n = [], t = {
            sid: -1,
            sn: l.AllSports,
            ipc: _.reduce(_.pluck(this.state.ismd, "ipc"), function(n, t) {
                return n + t;
            })
        }, f = {
            active: this.state.s == -1,
            count: t.ipc,
            key: t.sid,
            s: t,
            showCount: !0,
            v: VIEW.INPLAY
        }, i, r;
        return n.push(React.createElement(LeftPanel.Sport, React.__spread({}, f))),
        this.state.e ? (i = this.getStore().public.filter(this.state.ismd),
        n = [],
        _.map(i, function(t) {
            if (t.puc.length == 0)
                n.push(React.createElement("li", null ));
            else {
                this.state.s > 0 && this.state.s == t.sid && n.push(React.createElement(ScrollBarAnchor, {
                    key: "anchor",
                    id: t.sid
                }));
                var i = {
                    actives: LPM.collapsed ? this.state.cActives : this.state.actives,
                    count: t.ipc,
                    d: t,
                    key: t.sid,
                    me: this.state.myevents,
                    selected: this.state.e,
                    v: VIEW.INPLAY,
                    viewAll: this.state.viewAll,
                    et: u
                };
                n.push(React.createElement(LeftPanel.ExpandableSport, React.__spread({}, i)));
            }
        }, this)) : _.map(this.state.ismd, function(t) {
            var i = {
                active: this.state.s == t.sid,
                count: t.ipc,
                key: t.sid,
                s: t,
                showCount: !0,
                v: VIEW.INPLAY
            };
            n.push(React.createElement(LeftPanel.Sport, React.__spread({}, i)));
        }, this),
        r = {
            actives: this.state.actives,
            collapsed: this.state.meCollapsed,
            d: this.state.myeventInfo,
            selected: this.state.e
        },
        React.createElement("div", null , React.createElement("div", {
            className: "sidebar-row cr-pointer",
            onClick: this.reload
        }, React.createElement("p", {
            className: "menu-title STARTINGSOON"
        }, React.createElement("a", {
            style: {
                cursor: "pointer"
            }
        }, l.LP_Inplay), React.createElement("span", {
            className: "icon icon-InPlay",
            title: l.LP_Inplay
        }))), React.createElement("div", {
            className: "sidebar-row"
        }, this.state.e > 0 ? React.createElement(LeftPanel.MyEvent, React.__spread({}, r)) : null ), React.createElement("div", {
            className: "sidebar-row"
        }, React.createElement("ul", {
            className: classNames("sub-menu", {
                sports: !this.state.e
            }, "sportsEvents")
        }, n)));
    },
    componentDidUpdate: function() {
        this.props.scrollbar && this.state.e > 0 && !LPM.collapsed && LPM.needScrollToAnchor && this.props.scrollbar.scrollToAnchor();
    },
    reload: function() {
        Action.LeftPanel.inplay();
    }
});
LPM.createClass("MyEvent", {
    componentDidUpdate: function() {
        if (!LPM.collapsed && !this.props.collapsed) {
            var n = $(this.refs.expandObj.getDOMNode());
            n.is(":visible") || n.slideDown();
        }
    },
    render: function() {
        var n = this.props.d, u = this.props.actives, f = this.props.selected ? this.props.selected : 0, t = null , i = n.length == 0 ? [] : _.map(n, function(n) {
            var t = {
                d: n,
                isme: !0,
                key: n.eid,
                v: VIEW.INPLAY,
                selected: f,
                s: n.s
            };
            return React.createElement(LeftPanel.InPlayEvent, React.__spread({}, t));
        }), r;
        return i.length != 0 || LPM.collapsed || (r = function() {
            return {
                __html: l.LP_AddMyEvents.replace("{0}", '<span class="iconbox"><span class="icon icon-StarUnselected"></span></span>')
            };
        }
        ,
        t = React.createElement("div", {
            className: "no-events"
        }, React.createElement("p", {
            className: "other",
            key: 1,
            dangerouslySetInnerHTML: r()
        }))),
        React.createElement("ul", {
            className: "sub-menu myevents li-s"
        }, React.createElement("li", {
            className: classNames({
                active: _.contains(u, "smyevents")
            }),
            onClick: this.active
        }, React.createElement("a", null , l.LP_MyEvent), LPM.collapsed && this.props.submenu ? null : React.createElement("span", {
            className: "icon icon-StarUnselected"
        }), React.createElement("span", {
            className: "badge off"
        }, n.length), LPM.collapsed && this.props.submenu ? React.createElement("a", {
            className: "icon icon-removeIcon closeicon",
            onClick: this.expand
        }) : null ), t, React.createElement("ul", {
            className: "has-menu-box",
            ref: "expandObj"
        }, i));
    },
    toggle: function() {
        if (this.props.d.length != 0) {
            var n = $(this.refs.expandObj.getDOMNode())
              , t = function() {
                Action.LeftPanel.MyEvent.expand(!this.props.collapsed);
            }
            .bind(this);
            this.props.collapsed ? n.slideDown(t) : n.slideUp(t);
        }
    },
    active: function(n) {
        (n.stopPropagation(),
        this.props.d.length != 0) && (LPM.collapsed ? Action.LeftPanel.expand("smyevents") : this.toggle());
    }
});
LPM.createClass("InPlayEvent", {
    mixins: ["liveStreamMixin"],
    render: function() {
        var n = this.props.d, r = this.props.isme, e = r ? l.RemoveFromFav : l.AddToFav, u = [React.createElement("span", {
            onClick: this.favor,
            key: "mc" + n.eid,
            title: e,
            className: classNames("icon", "icon-StarUnselected", {
                lightorange: r
            })
        })], t, f, i;
        return this.hasLivestream() && u.push(React.createElement("span", {
            title: l.LP_LiveStreamInplay,
            key: "tv" + n.eid,
            className: "icon icon-TV2 lightorange"
        })),
        t = n.eid == this.props.selected,
        t && (f = React.createElement(ScrollBarAnchor, null )),
        i = _.contains([1, 19, 2, 24, 26, 29, 4, 22], this.props.s),
        React.createElement("li", {
            className: classNames("has-menu-row", {
                active: t
            }),
            onClick: this.select
        }, f, React.createElement("p", {
            className: "myeventRow"
        }, i ? React.createElement("span", {
            className: classNames("row-1", {
                lightorange: n.lts != "h",
                lightorange3: n.lts == "h"
            })
        }, n.hs.v) : null , React.createElement(LeftPanel.TeamName, {
            n: n.ht
        })), React.createElement("p", {
            className: "myeventRow"
        }, i ? React.createElement("span", {
            className: classNames("row-1", {
                lightorange: n.lts != "a",
                lightorange3: n.lts == "a"
            })
        }, n.as.v) : null , React.createElement(LeftPanel.TeamName, {
            n: n.at
        })), React.createElement("div", {
            className: "otherInfo"
        }, React.createElement(LeftPanel.ScoreBoard, {
            d: n,
            s: this.props.s
        }), React.createElement("div", {
            className: "float-right"
        }, u), React.createElement("div", {
            className: "clearfix"
        })));
    },
    select: function(n) {
        n.stopPropagation();
        Action.event(this.props.d.eid, this.props.d.en);
    },
    favor: function(n) {
        n.stopPropagation();
        Action.LeftPanel.MyEvent.toggle(this.props.d.eid);
    }
});
LPM.createClass("SubMenu", {
    storeName: "InPlay",
    mixins: ["ctrlMixin", "scrollbarMixin"],
    render: function() {
        var t, i, u, r, n, f, e;
        if (this.state.eventViewFirsload)
            return null ;
        if (i = {
            zIndex: 999,
            position: "absolute",
            left: 40
        },
        i.left += $("nav:first")[0].offsetLeft,
        _.contains(this.state.cActives, "smyevents"))
            this.state.myeventInfo.length > 0 && (u = {
                actives: this.state.cActives,
                collapsed: this.state.meCollapsed,
                d: this.state.myeventInfo,
                selected: this.state.e,
                submenu: !0
            },
            t = React.createElement(LeftPanel.MyEvent, React.__spread({}, u)));
        else if (_.contains(this.state.cActives, "sqm"))
            t = React.createElement(LeftPanel.QuickSubMenu, {
                data: this.props.qmd
            }),
            i.top = 121;
        else {
            if ((r = this.getStore().public.filter(),
            r.length == 0) || (n = _.find(r, function(n) {
                return _.contains(this.state.cActives, "s" + n.sid);
            }, this),
            !n))
                return null ;
            f = {
                actives: this.state.cActives,
                count: n.ipc,
                d: n,
                key: n.sid,
                me: this.state.myevents,
                selected: this.state.e,
                v: VIEW.INPLAY,
                viewAll: this.state.viewAll,
                et: LeftPanel.InPlayEvent
            };
            t = React.createElement(LeftPanel.SubSport, React.__spread({}, f));
        }
        return e = {
            ref: "scrollbar",
            w: 227,
            h: function() {
                return $(window).height();
            },
            ieMaxHeight: !0,
            onChange: this.scrollbarCallback,
            disable: LPM.disableScrollbar
        },
        React.createElement("nav", {
            className: "otherSidebar",
            style: i,
            ref: "nav"
        }, React.createElement("div", {
            id: "lt-left",
            ref: "content"
        }, React.createElement(ScrollBar, React.__spread({}, e), React.createElement("div", {
            key: 1,
            className: "sidebar-menu inPlay aother-sidebar"
        }, React.createElement("div", {
            className: "sidebar-row"
        }, React.createElement("ul", {
            className: "sub-menu sportsEvents brr-c-1"
        }, React.createElement("div", {
            className: "sportlist"
        }, t)))), React.createElement("br", {
            key: 2,
            style: {
                clear: "both"
            }
        }))));
    },
    updateScrollbar: function() {
        if (this.isMounted() && this.refs.scrollbar && !this.state.collapsed) {
            var n = $(this.refs.content.getDOMNode()).height() > $(window).height();
            return this.scrollbarCallback(n),
            this.refs.scrollbar.update(),
            n;
        }
    },
    scrollbarCallback: function(n) {
        var t = $(this.refs.nav.getDOMNode());
        n ? t.addClass("hasScroll") : t.removeClass("hasScroll");
    }
});
LPM.createClass("SubSport", {
    mixins: ["expandMixin"],
    render: function() {
        var n = this.props.d, r = this.props.actives, t = {}, u = this.isSelected(), f, i;
        return this.props.viewAll && this.props.viewAll[n.sid] && (t = this.props.viewAll[n.sid]),
        f = !1,
        i = React.createElement("ul", {
            ref: "expandObj",
            style: this.getExpandStyle()
        }, _.map(_.filter(n.puc), function(n) {
            var i = {
                actives: r,
                d: n,
                key: n.cid,
                me: this.props.me,
                selected: this.props.selected,
                v: this.props.v,
                viewAll: t[n.cid],
                et: this.props.et,
                s: this.props.d.sid
            };
            return React.createElement(LeftPanel.ExpandableCompetition, React.__spread({}, i));
        }, this)),
        React.createElement("li", {
            className: classNames({
                "has-menu-c": !0,
                active: u
            })
        }, React.createElement("a", {
            className: "float-left"
        }, n.sn), React.createElement("span", {
            className: "badge on"
        }, this.props.count), React.createElement("a", {
            className: "icon icon-removeIcon closeicon",
            onClick: this.expand
        }), React.createElement("div", {
            className: classNames({
                group: !0,
                hasScroll: LPM.collapsed
            })
        }, i));
    },
    getActiveKey: function() {
        return "s" + this.props.d.sid;
    },
    isSelected: function() {
        return LPM.view == VIEW.INPLAY || LPM.view == VIEW.STARTINGSOON ? LPM.collapsed ? _.contains(this.props.actives, this.getActiveKey()) : _.where(this.props.d.puc, {
            ces: [{
                eid: this.props.selected
            }]
        }).length > 0 : !1;
    }
});
LPM.createClass("ScoreBoard", {
    render: function() {
        var t = [], n = this.props.d, i, f, r, u, e;
        if (_.contains([1, 2, 19], this.props.s) || (!_.contains([3, 9, 13, 20], this.props.s) || n.pt < 2) && t.push(React.createElement("span", {
            key: "live"
        }, "LIVE")),
        n.sb) {
            if (i = LPM.store.InPlay.props.scoreboard[n.pt],
            i || (i = []),
            f = this.reorder(n.sb.ps),
            n.pt == 2 || n.pt == 4)
                t.push(React.createElement("span", {
                    key: "0",
                    className: "lightorange"
                }, n.etts)),
                t.push(React.createElement("span", {
                    key: "ipt"
                }, n.ipt));
            else
                for (r = 0; r < i.length; r++)
                    if (u = f[i[r]],
                    e = u.h + "-" + u.a,
                    t.push(React.createElement("span", {
                        key: r,
                        className: classNames({
                            lightorange: u.p == n.sb.cp
                        })
                    }, e)),
                    u.p == n.sb.cp)
                        break;
        } else
            _.contains([2, 3, 9, 20], this.props.s) || t.push(React.createElement(LeftPanel.Timer, {
                key: "dt",
                etts: n.etts,
                ipt: n.ipt
            }));
        return n.gt == "N" && t.push(React.createElement(LeftPanel.N, {
            key: "n"
        })),
        React.createElement("div", {
            className: "float-left dayDD"
        }, t);
    },
    reorder: function(n) {
        var t = _.remove(n, function(n) {
            return n.p == "ftg";
        });
        return t.length > 0 && n.push(t[0]),
        n;
    }
});
LPM.createClass("Timer", {
    module: "Timer",
    mixins: ["ctrlMixin"],
    componentDidMount: function() {
        (this.props.etts.length > 0 || this.props.ipt.length > 0) && (this.TimerEventId = this.getStore().listen(this.update));
    },
    componentWillReceiveProps: function() {
        this.props.etts.length > 0 || this.props.ipt.length > 0 ? this.TimerEventId || (this.TimerEventId = this.getStore().listen(this.update)) : this.LeftPanelEventId && this.getStore().removeListener(this.LeftPanelEventId);
    },
    render: function() {
        var n = this.props.etts + " " + this.getElpasedTime(this.props.ipt);
        return n.length == 1 ? null : React.createElement("span", null , n);
    },
    getElpasedTime: function(n) {
        var i = n.split(":"), r, t;
        return i.length > 1 ? (r = +i[0],
        t = +i[1] + this.state.tick,
        t >= 60 && (r += Math.floor(t / 60),
        t = t % 60),
        t < 10 && (t = "0" + t),
        r + ":" + t) : n;
    }
});
LPM.createStatefulClass("StartingSoon", {
    mixins: ["scrollbarMixin"],
    render: function() {
        var n = LeftPanel.StartingSoonEvent
          , t = this.state.e > 0 ? _.map(this.state.ssmd, function(t) {
            var i = {
                actives: this.state.actives,
                count: t.tc,
                d: t,
                key: t.sid,
                selected: this.state.e,
                v: VIEW.STARTINGSOON,
                viewAll: this.state.viewAll,
                et: n
            };
            return React.createElement(LeftPanel.ExpandableSport, React.__spread({}, i));
        }, this) : _.map(this.state.ssmd, function(n) {
            var t = {
                active: this.state.s == n.sid,
                count: n.tc,
                key: n.sid,
                s: n,
                showCount: !0,
                v: VIEW.STARTINGSOON
            };
            return React.createElement(LeftPanel.Sport, React.__spread({}, t));
        }, this);
        return React.createElement("div", null , React.createElement("div", {
            className: "sidebar-row cr-pointer",
            onClick: this.reload
        }, React.createElement("p", {
            className: "menu-title STARTINGSOON"
        }, React.createElement("a", {
            style: {
                cursor: "pointer"
            }
        }, l.LP_StartingSoonMenu), React.createElement("span", {
            className: "icon icon-StartingSoon",
            title: l.LP_StartingSoonMenu
        }))), React.createElement("div", {
            className: "sidebar-row"
        }, React.createElement("ul", {
            className: classNames("sub-menu", {
                sports: !this.state.e
            }, "sportsEvents")
        }, t)));
    },
    componentDidUpdate: function() {
        this.props.scrollbar && this.state.e > 0 && !LPM.collapsed && LPM.needScrollToAnchor && this.props.scrollbar.scrollToAnchor();
    },
    reload: function() {
        Action.LeftPanel.startingsoon();
    }
});
LPM.createClass("StartingSoonEvent", {
    mixins: ["liveStreamMixin"],
    render: function() {
        var n = this.props.d
          , t = []
          , i = [];
        return t.push(React.createElement("span", null , n.mts + " " + (n.mts > 1 ? l.HP_Mins : l.HP_Min))),
        n.gt == "N" && t.push(React.createElement(LeftPanel.N, {
            key: "n"
        })),
        n.il && i.push(React.createElement("span", {
            title: l.LiveText,
            className: "icon icon-InPlay",
            key: 1
        })),
        this.livestream && i.push(React.createElement("span", {
            title: l.LP_LiveStream,
            className: "icon icon-TV2",
            key: "tv" + n.eid
        })),
        React.createElement("li", {
            className: classNames({
                "has-menu-row": !0,
                active: n.eid == this.props.selected
            }),
            onClick: this.select
        }, React.createElement(LeftPanel.TeamName, {
            n: n.ht
        }), React.createElement(LeftPanel.TeamName, {
            n: n.at
        }), React.createElement("div", {
            className: "otherInfo"
        }, React.createElement("div", {
            className: "float-left lightorange"
        }, t), React.createElement("div", {
            className: "float-right"
        }, i), React.createElement("div", {
            className: "clearfix"
        })));
    },
    select: function(n) {
        n.stopPropagation();
        Action.event(this.props.d.eid, this.props.d.en);
    }
});
LPM.createClass("SSSubMenu", {
    storeName: "StartingSoon",
    mixins: ["ctrlMixin", "scrollbarMixin"],
    render: function() {
        var n, t, i, r;
        if (this.state.eventViewFirsload)
            return null ;
        if (n = {
            zIndex: 999,
            position: "absolute",
            left: 40
        },
        n.left += $("nav:first")[0].offsetLeft,
        _.contains(this.state.cActives, "sqm"))
            menu = React.createElement(LeftPanel.QuickSubMenu, {
                data: this.props.qmd
            }),
            n.top = 121;
        else if (t = _.find(this.state.ssmd, function(n) {
            return _.contains(this.state.cActives, "s" + n.sid);
        }, this),
        t)
            i = {
                actives: this.state.cActives,
                d: t,
                key: t.sid,
                selected: this.state.e,
                v: VIEW.STARTINGSOON,
                viewAll: this.state.viewAll,
                et: LeftPanel.StartingSoonEvent
            },
            menu = React.createElement(LeftPanel.SubSport, React.__spread({}, i));
        else
            return null ;
        return r = {
            ref: "scrollbar",
            w: 213,
            h: function() {
                return $(window).height();
            },
            ieMaxHeight: !0,
            onChange: this.scrollbarCallback,
            disable: LPM.disableScrollbar
        },
        React.createElement("nav", {
            className: "otherSidebar",
            style: n,
            ref: "nav"
        }, React.createElement("div", {
            id: "lt-left",
            ref: "content"
        }, React.createElement(ScrollBar, React.__spread({}, r), React.createElement("div", {
            key: 1,
            className: "sidebar-menu inPlay aother-sidebar"
        }, React.createElement("div", {
            className: "sidebar-row"
        }, React.createElement("ul", {
            className: "sub-menu sportsEvents brr-c-1"
        }, menu))), React.createElement("br", {
            key: 2,
            style: {
                clear: "both"
            }
        }))));
    },
    updateScrollbar: function() {
        if (this.isMounted() && this.refs.scrollbar && !this.state.collapsed) {
            var n = $(this.refs.content.getDOMNode()).height() > $(window).height();
            return this.scrollbarCallback(n),
            this.refs.scrollbar.update(),
            n;
        }
    },
    scrollbarCallback: function(n) {
        var t = $(this.refs.nav.getDOMNode());
        n ? t.addClass("hasScroll") : t.removeClass("hasScroll");
    }
});
LPM.createStatefulClass("PreStart", {
    mixins: ["scrollbarMixin"],
    render: function() {
        var t = this.getSports(this.state.smd), u = this.getSports(this.state.topSports), i = this.state.events, r, n;
        return i.length > 0 && !LPM.collapsed && (r = React.createElement(LeftPanel.PSEventMenu, React.__spread({}, {
            active: this.state.e,
            c: this.state.c,
            d: i[0],
            s: this.state.s,
            viewAll: this.state.viewAll
        }))),
        this.state.smd.length > this.state.gap && t.splice(this.state.gap, 0, React.createElement("span", {
            key: 0,
            className: "gap"
        }, " ")),
        n = !1,
        this.state.p > 0 && (n = {
            p: this.state.p,
            s: this.state.s
        }),
        React.createElement("div", null , React.createElement(LeftPanel.MyCompetition, {
            d: this.state.mycomps,
            list: this.state.mycomps.info,
            subview: this.state.submenuView,
            favt: this.state.favt
        }), r, React.createElement("div", {
            className: "sidebar-row"
        }, React.createElement("p", {
            className: "menu-title"
        }, React.createElement("a", null , l.LP_SPorts), React.createElement("span", {
            className: "icon icon-Sports"
        })), React.createElement("div", {
            className: "sidebar-row"
        }, React.createElement("ul", {
            className: "sub-menu sportsType"
        })), u, _.map(this.state.fe, function(t) {
            return React.createElement(LeftPanel.Programme, {
                active: n,
                actives: this.state.actives,
                key: t.pid,
                p: t
            });
        }, this), React.createElement("div", {
            className: "sidebar-row"
        }, React.createElement("ul", {
            className: "sub-menu sports"
        }, t))));
    },
    componentDidUpdate: function() {
        var i = tempStore.get("redirect"), n, t;
        if (i) {
            LPM.redirect(i);
            return;
        }
        n = this.props.scrollbar;
        n && (n.state.hasScroll && LPM.collapsed && (t = this.state.submenuView,
        n.state.freeze && t < 2 ? n.release() : !n.state.freeze && t > 1 && n.freeze()),
        this.state.e > 0 && !LPM.collapsed && LPM.firstLoad && this.props.scrollbar.scrollTo(0));
    },
    getSports: function(n) {
        return _.map(n, function(n) {
            if (n.ios)
                return React.createElement(LeftPanel.OtherSport, React.__spread({}, n));
            var t = !1;
            return n.sid == this.state.s && (t = !0,
            (this.state.p > 0 || this.state.mycomps.favt == 2) && (t = !1)),
            React.createElement(LeftPanel.Sport, React.__spread({}, {
                active: t,
                key: n.sid,
                s: n,
                v: VIEW.PRESTART
            }));
        }, this);
    }
});
LPM.createClass("Programme", {
    mixins: ["expandMixin"],
    render: function() {
        var t = "icon lightorange " + this.props.p.sports[0].ic
          , i = classNames({
            "menu-title-2": !0,
            sp: !0,
            active: this.isActive() || this.props.p.pid == this.props.active.p
        })
          , n = [];
        return this.props.p.ims && (n = _.map(_.sortBy(this.props.p.sports, "on"), function(n) {
            var t = {
                active: this.props.active && this.props.active.p == this.props.p.pid && this.props.active.s == n.si,
                key: n.si,
                p: this.props.p,
                s: n
            };
            return React.createElement(LeftPanel.ProgSport, React.__spread({}, t));
        }, this)),
        React.createElement("div", {
            className: classNames("sidebar-row", {
                hasSubmenu: this.props.p.ims
            }),
            "data-pid": this.props.p.pid,
            "data-sv": 2
        }, React.createElement("ul", {
            className: "sub-menu sports"
        }, React.createElement("p", {
            className: i,
            onClick: this.select
        }, React.createElement("a", {
            className: "menut-T"
        }, React.createElement("span", null , this.props.p.pn)), React.createElement("span", {
            title: this.props.p.pn,
            className: t
        })), LPM.collapsed ? null : React.createElement("ul", {
            className: "featuredEvents",
            ref: "expandObj",
            style: this.getExpandStyle()
        }, n)));
    },
    select: function(n) {
        n.stopPropagation();
        this.props.p.ims ? LPM.collapsed ? Action.LeftPanel.subview({
            v: 3,
            id: this.props.p.pid
        }) : this.expand(n) : Action.programme(this.props.p.sports[0].Url);
    },
    getActiveKey: function() {
        return this.props.p.pid;
    }
});
LPM.createClass("ProgSport", {
    render: function() {
        var n = classNames({
            "has-menu-row": !0,
            active: this.props.active
        });
        return React.createElement("li", {
            className: n,
            onClick: this.select
        }, React.createElement("span", null , this.props.p.pn), React.createElement("p", {
            className: "sport-name"
        }, this.props.s.sn));
    },
    select: function(n) {
        n.stopPropagation();
        Action.programme(this.props.s.Url);
    }
});
LPM.createClass("PSEventMenu", {
    getDefaultProps: function() {
        return {
            size: 10
        };
    },
    render: function() {
        var n;
        return this.props.d.ces.length > this.props.size && !this.props.viewAll && (n = React.createElement(LeftPanel.ViewAllBtn, {
            onClick: this.viewAll
        })),
        React.createElement("div", {
            className: "sidebar-row"
        }, React.createElement(LeftPanel.PSEventMenuTitle, {
            cn: this.props.d.cn,
            onClick: this.competition
        }), React.createElement("ul", {
            className: "sub-menu EventSelected st3"
        }, _.map(this.props.d.ces, function(n, t) {
            var i = {
                active: n.eid == this.props.active,
                e: n,
                hide: t >= this.props.size && !this.props.viewAll,
                key: n.eid
            };
            return React.createElement(LeftPanel.PSEvent, React.__spread({}, i));
        }, this), n));
    },
    viewAll: function() {
        Action.LeftPanel.psEventViewAll(!0);
    },
    competition: function() {
        Action.competition(this.props.s, this.props.c);
    }
});
LPM.createClass("PSEvent", {
    mixins: ["liveStreamMixin"],
    render: function() {
        var n = this.props.e, t = [], u = [React.createElement("span", {
            key: "dt"
        }, " ", n.esd + " " + n.est, " ")], i, r;
        return n.gt == "N" && u.push(React.createElement(LeftPanel.N, {
            key: "n"
        })),
        n.il && t.push(React.createElement("span", {
            className: "icon icon-InPlay",
            key: 1
        })),
        this.livestream && t.push(React.createElement("span", {
            title: l.LP_LiveStream,
            className: "icon icon-TV2",
            key: 2
        })),
        i = {},
        this.props.hide && (i = {
            display: "none"
        }),
        r = null ,
        this.props.active && (r = React.createElement(ScrollBarAnchor, null )),
        React.createElement("li", {
            style: i,
            className: classNames({
                "has-menu-row": !0,
                active: this.props.active
            }),
            onClick: this.select
        }, r, React.createElement("p", {
            className: "myeventRow"
        }, React.createElement(LeftPanel.TeamName, {
            n: n.ht
        })), React.createElement("p", {
            className: "myeventRow"
        }, React.createElement(LeftPanel.TeamName, {
            n: n.at
        })), React.createElement("div", {
            className: "otherInfo"
        }, React.createElement("div", {
            className: "float-left"
        }, u), React.createElement("div", {
            className: "float-right"
        }, t), React.createElement("div", {
            className: "clearfix"
        })));
    },
    select: function(n) {
        n.stopPropagation();
        Action.event(this.props.e.eid, this.props.e.en);
    }
});
LPM.createClass("MyCompetition", {
    componentDidUpdate: function() {
        var n, t;
        // this.props.d.collapsed || (n = $(this.refs.mycomps.getDOMNode()),
        // n.is(":visible") || (t = function() {
        //     Action.LeftPanel.MyCompetition.expand(!1);
        // }
        // .bind(this),
        // n.slideDown(400, t)));
    },
    render: function() {
        
        var i, n = this.props.d, t = this.props.list, r = n.size[n.favt], u;
        return t.length == 0 && (!LPM.collapsed || this.props.submenu) && (u = function() {
            return {
                __html: l.LP_AddMyComp.replace("{0}", '<span class="iconbox"><span class="icon merge-icon-a icon-SortCompetition"></span><span class="icon merge-icon-b icon-MainMarketsshowleft"></span></span>')
            };
        }
        ,
        i = React.createElement("li", {
            className: "other",
            style: {
                height: "auto",
                paddingBottom: 5
            },
            dangerouslySetInnerHTML: u()
        })),
       
        (!LPM.collapsed || this.props.submenu) && t.length > r && !n.viewAll && (i = React.createElement(LeftPanel.ViewAllBtn, {
            onClick: this.viewAll
        })); /*,
        React.createElement("div", {
            className: "sidebar-row hasSubmenu"
        }, React.createElement("ul", {
            className: "sub-menu sports brr-c-1"
        }, React.createElement("p", {
            className: classNames("menu-title", "competitions", {
                active: this.props.subview == 1 || this.props.subview == 2 || this.props.favt == 2
            }),
            onClick: this.toggle,
            ref: "title"
        }, React.createElement("a", null , l.LP_MyComp), this.props.submenu ? React.createElement("a", {
            className: "icon icon-removeIcon closeicon",
            onClick: this.close
        }) : React.createElement("span", {
            title: this.props.submenu ? "" : l.LP_MyComp,
            className: "icon icon-MyCompetitions"
        })), React.createElement("ul", {
            className: "sub-menu mycomps",
            ref: "mycomps"
        }, !LPM.collapsed || this.props.submenu ? _.map(t, function(i, u) {
            var f = {
                active: this.props.d.active == i.cid,
                c: i,
                hide: u >= r && !n.viewAll,
                i: u,
                key: i.cid,
                canMove: t.length > 1
            };
            return React.createElement(LeftPanel.MyCompetitionItem, React.__spread({}, f));
        }, this) : null , i), React.createElement("p", null )));*/
    },
    viewAll: function(n) {
        n.stopPropagation();
        Action.LeftPanel.MyCompetition.viewAll();
    },
    toggle: function(n) {
        if (n.stopPropagation(),
        LPM.collapsed)
            Action.LeftPanel.subview({
                v: 2
            });
        else if (this.props.d.data.length > 0) {
            var t = $(this.refs.mycomps.getDOMNode())
              , i = function() {
                Action.LeftPanel.MyCompetition.expand(!this.props.d.collapsed);
            }
            .bind(this);
            this.props.d.collapsed ? t.slideDown(i) : t.slideUp(i);
        }
    },
    close: function(n) {
        n.stopPropagation();
        Action.LeftPanel.subview({
            v: 0
        });
    }
});
LPM.createClass("MyCompetitionItem", {
    render: function() {
        var n = {}, t;
        return this.props.hide && (n = {
            display: "none"
        }),
        t = this.props.active ? React.createElement(ScrollBarAnchor, null ) : null ,
        React.createElement("li", {
            className: classNames("has-menu-row", {
                active: this.props.active
            }),
            key: this.props.c.cid,
            onClick: this.select,
            style: n
        }, t, React.createElement("a", null , React.createElement(LeftPanel.MyCompetitionSportName, {
            n: this.props.c.sn
        }), React.createElement(LeftPanel.MyCompetitionName, {
            n: this.props.c.cn
        })), this.props.canMove ? React.createElement("table", {
            border: "0",
            className: "up-down-btn"
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", null , React.createElement("span", {
            className: "tick-up",
            onClick: this.up
        }))), React.createElement("tr", null , React.createElement("td", null , React.createElement("span", {
            className: "tick-down",
            onClick: this.down
        }))))) : null , React.createElement("span", {
            className: "icon icon-Xbutton",
            onClick: this.remove
        }));
    },
    select: function(n) {
        n.stopPropagation();
        Action.LeftPanel.MyCompetition.select(this.props.c.cid, this.props.c.sid);
    },
    remove: function(n) {
        n.stopPropagation();
        Action.LeftPanel.MyCompetition.toggle({
            cid: this.props.c.cid
        });
    },
    up: function(n) {
        n.stopPropagation();
        Action.LeftPanel.MyCompetition.order(this.props.i, -1);
    },
    down: function(n) {
        n.stopPropagation();
        Action.LeftPanel.MyCompetition.order(this.props.i, 1);
    }
});
LPM.createClass("MyCompetitionName", {
    mixins: ["longNameTooltipMixin"],
    componentDidMount: function() {
        this.setState({
            n: this.getDisplayName(this.props.n, "c")
        });
    },
    componentWillReceiveProps: function(n) {
        this.setState({
            n: this.getDisplayName(n.n, "c")
        });
    },
    render: function() {
        return React.createElement("p", {
            title: this.props.n
        }, this.state.n);
    }
});
LPM.createClass("MyCompetitionSportName", {
    mixins: ["longNameTooltipMixin"],
    componentDidMount: function() {
        this.setState({
            n: this.getDisplayName(this.props.n, "s")
        });
    },
    componentWillReceiveProps: function(n) {
        this.setState({
            n: this.getDisplayName(n.n, "s")
        });
    },
    render: function() {
        return React.createElement("span", {
            title: this.props.n
        }, this.state.n);
    }
});
LPM.createClass("OtherSport", {
    render: function() {
        return React.createElement("a", {
            href: this.props.url,
            className: "a-row",
            target: "_top"
        }, React.createElement("span", {
            className: "sps-txt"
        }, this.props.sn), React.createElement(LeftPanel.Icon, {
            sid: this.props.i,
            sn: this.props.sn
        }));
    }
});
LPM.createClass("PreSubMenu", {
    storeName: "PreStart",
    mixins: ["ctrlMixin"],
    render: function() {
        var t, n, i;
        switch (this.state.submenuView) {
        default:
        case 0:
        case 1:
            return null ;
        case 2:
            t = React.createElement(LeftPanel.MyCompetition, {
                submenu: !0,
                d: this.state.mycomps,
                list: this.state.mycomps.info
            });
            break;
        case 3:
            if (this.state.actives.length > 0)
                if (n = _.filter(this.state.fe, function(n) {
                    return this.state.actives[0] == n.pid;
                }, this),
                n.length > 0)
                    n = n[0],
                    i = !1,
                    this.state.p > 0 && (i = {
                        p: this.state.p,
                        s: this.state.s
                    }),
                    t = React.createElement("div", {
                        className: "sidebar-row"
                    }, React.createElement(LeftPanel.SubProgramme, {
                        active: i,
                        actives: this.state.actives,
                        key: n.pid,
                        p: n
                    }));
                else
                    return null ;
            else
                return null ;
        }
        return React.createElement("nav", {
            className: "otherSidebar",
            style: {
                position: "absolute",
                zIndex: 999
            }
        }, React.createElement("div", {
            id: "lt-left"
        }, React.createElement("div", {
            id: "itc"
        }, React.createElement("div", {
            className: "sidebar-menu perStart aother-sidebar"
        }, t))));
    },
    componentDidUpdate: function() {
        var n, t;
        LPM.collapsed && this.state.submenuView > 0 && (n = $("#ltc .sidebar-menu.perStart .hasSubmenu p.active").closest(".sidebar-row"),
        n.length == 0 && console.warn(n),
        t = $(this.getDOMNode()),
        t.offset({
            top: n.offset().top,
            left: 40 + $("nav:first")[0].offsetLeft
        }));
    }
});
LPM.createClass("SubProgramme", {
    mixins: ["expandMixin"],
    render: function() {
        var n = [];
        return this.props.p.ims && (n = _.map(_.sortBy(this.props.p.sports, "on"), function(n) {
            var t = {
                active: this.props.active && this.props.active.p == this.props.p.pid && this.props.active.s == n.si,
                key: n.si,
                p: this.props.p,
                s: n
            };
            return React.createElement(LeftPanel.ProgSport, React.__spread({}, t));
        }, this)),
        React.createElement("div", {
            className: "sidebar-row",
            "data-pid": this.props.p.pid
        }, React.createElement("ul", {
            className: "sub-menu sports brr-c-1"
        }, React.createElement("p", {
            className: "menu-title-2 sp"
        }, React.createElement("a", {
            className: "menut-T"
        }, React.createElement("span", null , this.props.p.pn)), React.createElement("a", {
            className: "icon icon-removeIcon closeicon",
            onClick: this.close
        })), React.createElement("ul", {
            className: "featuredEvents",
            ref: "expandObj",
            style: this.getExpandStyle()
        }, n)));
    },
    getActiveKey: function() {
        return this.props.p.pid;
    },
    close: function() {
        Action.LeftPanel.subview(2);
    }
});
LPM.createClass("PSEventMenuTitle", {
    mixins: ["longNameTooltipMixin"],
    componentDidMount: function() {
        this.setState({
            n: this.getDisplayName(this.props.cn, "c")
        });
    },
    componentWillReceiveProps: function(n) {
        this.setState({
            n: this.getDisplayName(n.cn, "c")
        });
    },
    render: function() {
        return React.createElement("p", {
            title: this.props.cn,
            className: "menu-title competitions st2",
            onClick: this.props.onClick
        }, this.state.n);
    }
});
LPM.createStatefulClass("LeftPanel", {
    mixins: ["scrollbarMixin"],
    getDefaultProps: function() {
        return {
            prevCollapsed: !1,
            prevHasScroll: !1,
            code: $("#srvc").text()
        };
    },
    componentDidMount: function() {
        this.state.info = this.getStore().props.info;
        this.update();
        this.refs.scrollbar && this.refs.scrollbar.scrollToAnchor();
    },
    render: function() {
        var t = [], n = [], i = "sidebar-menu ", f = this.getMenuConfig(), c = {
            count: this.state.tipc,
            s: this.state.menuState,
            d: f[VIEW.INPLAY],
            key: VIEW.INPLAY,
            updateScrollbar: this.updateScrollbar
        }, a = {
            count: this.state.tssc,
            s: this.state.menuState,
            d: f[VIEW.STARTINGSOON],
            key: VIEW.STARTINGSOON,
            updateScrollbar: this.updateScrollbar
        }, e = React.createElement(LeftPanel.MenuItem, React.__spread({}, c)), o = React.createElement(LeftPanel.MenuItem, React.__spread({}, a)), r, u, s, h;
        this.state.qmd && n.push(React.createElement(LeftPanel.QuickMenu, {
            data: this.state.qmd
        }));
        switch (this.state.view) {
        case VIEW.PRESTART:
        default:
            t = [e, o];
            n = React.createElement(LeftPanel.PreStart, {
                updateScrollbar: this.updateScrollbar,
                scrollbar: this.refs.scrollbar
            });
            i += "perStart";
            break;
        case VIEW.STARTINGSOON:
            t = [e];
            n.push(React.createElement(LeftPanel.StartingSoon, {
                updateScrollbar: this.updateScrollbar
            }));
            i += "inPlay";
            break;
        case VIEW.INPLAY:
            t = [o];
            n.push(React.createElement(LeftPanel.InPlay, {
                updateScrollbar: this.updateScrollbar,
                scrollbar: this.refs.scrollbar
            }));
            i += "startingSoon";
        }
        return s = this._getAsiaLink(),
        r = React.createElement("div", {
            id: "ltc",
            ref: "content",
            style: {
                width: 210
            }
        }, React.createElement("div", {
            className: i,
            style: LPM.collapsed ? {
                width: 40
            } : null
        }, 

        // React.createElement("div", {
        //     className: "sidebar-row"
        // }, React.createElement("ul", {
        //     className: "sub-menu home"
        // }, React.createElement(LeftPanel.FixedMenuItem, {
        //     callback: this.collapse,
        //     text: l.SportsHome,
        //     tip: l.LP_RtnToMenu,
        //     css: "nav-btn",
        //     icon: "MenuMobile"
        // }), React.createElement(LeftPanel.FixedMenuItem, {
        //     callback: this.home,
        //     text: l.SportsHome,
        //     tip: l.SportsHome,
        //     icon: "SportsHome"
        // }), t)), 

        // React.createElement("div", {
        //     className: "menulist-a"
        // }, React.createElement("a", {
        //     className: "AsianBtn",
        //     target: "_top",
        //     href: s
        // }, LPM.collapsed ? null : l.SportMenu_SwitchToAsianView, React.createElement("span", {
        //     className: "icon icon-AsianView",
        //     title: l.SportMenu_SwitchToAsianView
        // }))), 

        n, React.createElement("div", {
            className: "sidebar-row"
        }, React.createElement("p", {
            className: "menu-title infocenter-t"
        }, React.createElement("a", null , l.InfoCentre), React.createElement("span", {
            className: "icon icon-InfoCenter",
            title: l.InfoCentre
        })), React.createElement("ul", {
            className: "sub-menu infoCenter"
        }, uv.showls ? React.createElement("li", {
            key: "tv",
            onClick: this._openTV
        }, React.createElement("a", null , ccparam.tvTxt), React.createElement("span", {
            className: classNames("icon icon-TV3"),
            title: ccparam.tvTxt
        })) : null , _.map(this.state.info, function(n) {
            return React.createElement(LeftPanel.InfoItem, {
                key: n.k,
                i: n
            });
        }, this), React.createElement("div", {
            className: "gap",
            onClick: this.showCode
        })))), React.createElement("br", {
            style: {
                clear: "both"
            }
        })),
        LPM.collapsed && (LPM.view == VIEW.PRESTART ? u = React.createElement(LeftPanel.PreSubMenu, null ) : LPM.view == VIEW.INPLAY ? u = React.createElement(LeftPanel.SubMenu, {
            qmd: this.state.qmd
        }) : LPM.view == VIEW.STARTINGSOON && (u = React.createElement(LeftPanel.SSSubMenu, {
            qmd: this.state.qmd
        }))),
        h = {
            h: function() {
                return Math.max($(window).height(), window.innerHeight) - 2;
            },
            top: 3,
            w: LPM.collapsed ? 57 : 227,
            ref: "scrollbar",
            offset: LPM.collapsed ? 17 : 17,
            always: !0,
            disable: this.state.disableScrollbar
        },
        r = React.createElement(ScrollBar, React.__spread({}, h), r),
        React.createElement("div", null , React.createElement("nav", {
            className: classNames({
                collapsed: LPM.collapsed,
                hasScroll: !0
            }),
            ref: "nav"
        }, React.createElement("div", {
            id: "lt-left"
        }, r)), u, this.state.showCode ? React.createElement("div", {
            style: {
                position: "absolute",
                bottom: 15,
                marginLeft: 5,
                padding: 5,
                zIndex: 99
            },
            onClick: this.showCode,
            className: "tt-cont"
        }, this.props.code) : null );
    },
    home: function(n) {
        n.stopPropagation();
        LPM.mock ? Action.LeftPanel.view(VIEW.PRESTART) : Action.LeftPanel.home();
    },
    collapse: function(n) {
        n.stopPropagation();
        Action.LeftPanel.collapse(!1);
    },
    getMenuConfig: function() {
        var n = [];
        return n[VIEW.INPLAY] = {
            v: VIEW.INPLAY,
            n: l.LP_Inplay,
            i: "icon-InPlay",
            m: l.LP_NoInplay
        },
        n[VIEW.STARTINGSOON] = {
            v: VIEW.STARTINGSOON,
            n: l.LP_StartingSoonMenu,
            i: "icon-StartingSoon_m",
            m: l.OP_NoUpcomingEvents
        },
        n;
    },
    updateScrollbar: function() {
        if (this.isMounted() && this.refs.scrollbar) {
            var n = $(this.refs.content.getDOMNode()).height() > $(window).height();
            return this.refs.scrollbar.update(),
            n;
        }
    },
    showCode: function(n) {
        n.stopPropagation();
        Action.LeftPanel.code();
    },
    _getAsiaLink: function() {
        var n = pm.parentHost();
        return document.domain != "localhost" && n != null && n != "" ? n + "/" + global.lan + "/asia" : "javascript:void(0)";
    },
    _openTV: function() {
        var n = utility.parsePopupInfo("popup-new w791 h585"), u = screen.width / 2 - n.width / 2, f = screen.height / 2 - n.height / 2, i = pm.parentHost(), t, r;
        t = document.domain != "localhost" && i != null && i != "" ? i + "/" + global.lan + "/live-streaming" : "";
        t = t.replace("https://", "http://");
        r = "center=yes,resizable=yes,scrollbars=yes, width=" + n.width + ", height=" + n.height + ",left=" + u + ",top=" + f;
        window.open(t, "stream", r);
    }
});
LPM.createClass("FixedMenuItem", {
    render: function() {
        return React.createElement("li", {
            className: this.props.css,
            onClick: this.props.callback
        }, React.createElement("a", null , this.props.text), React.createElement("span", {
            className: "icon icon-" + this.props.icon,
            title: this.props.tip
        }));
    }
});
LPM.createClass("MenuItem", {
    mixins: ["scrollbarMixin"],
    render: function() {
        var t = "icon " + this.props.d.i
          , n = this.props.d.v;
        return React.createElement("div", null , React.createElement("li", {
            onClick: this.changeView
        }, React.createElement("span", null , React.createElement("a", null , this.props.d.n), React.createElement("span", {
            className: t,
            title: this.props.d.n
        }), React.createElement("span", {
            title: l.LP_NumberOfInplayEvents,
            className: classNames("badge", {
                on: n == VIEW.INPLAY,
                off: n == VIEW.STARTINGSOON
            })
        }, this.props.count))), React.createElement("div", {
            className: classNames("sub-menu", "no-events", {
                hidden: this.props.s != n
            })
        }, LPM.collapsed ? null : React.createElement("p", {
            className: "other"
        }, this.props.d.m)));
    },
    changeView: function() {
        if (this.props.count == 0)
            LPM.collapsed || Action.LeftPanel.menuExpand(this.props.d.v);
        else
            switch (this.props.d.v) {
            case VIEW.INPLAY:
                Action.LeftPanel.inplay();
                break;
            case VIEW.STARTINGSOON:
                Action.LeftPanel.startingsoon();
            }
    }
});

LPM.createClass("InfoItem", {
    render: function() {
        var n = this.props.i;
        return React.createElement("li", {
            key: n.text,
            onClick: this.info.bind(this, n)
        }, React.createElement("a", null , n.text), React.createElement("span", {
            className: classNames("icon", n.icon),
            title: n.text
        }));
    },
    info: function(n, t) {
        t.stopPropagation();
        name != "_blank" && name || (name = "188BET");
        n && n.id && (name = n.id);

        console.log(name);
        //弹出窗口位置
        var i = pm.parentHost();
        console.log(i,location.protocol,location.hostname);
        (n.local || !i) && (i = location.protocol + "//" + location.hostname + "/");
        //utility.popupUrlWin(i + "/" + global.lan + n.url, n, n.text);
        utility.popupUrlWin("/" + global.lan + n.url, n, n.text);
    }
});
RightPanel = React.createClass({
    displayName: "RightPanel",
    getInitialState: function() {
        return this._getDataFromStore();
    },
    componentDidMount: function() {
        RP_Store.addUpdateListener(this._onUpdate);
    },
    componentDidUpdate: function() {
        this._updateScrollBar();
    },
    render: function() {
        var n = this.state
          , t = this._updateScrollBar
          , i = this._scrollToAnchor;
        return React.createElement("div", null , React.createElement("aside", {
            className: "hasScroll" + (n.enlarge ? " enlarge" : "")
        }, React.createElement("div", {
            id: "lt-right"
        }, React.createElement(ScrollBar, {
            ref: "scrollbar",
            h: n.h,
            w: n.w,
            always: !0,
            offset: 17,
            disable: n.disableScrollbar
        }, React.createElement(RightPanel.liveCentre, {
            key: "RP_lc",
            isLarge: n.enlarge,
            slideTvMenuCallback: this.slideTvMenu
        }), React.createElement(RightPanel.betSlips, {
            key: "RP_bs",
            updateScrollBarFN: t,
            scrollToAnchorFn: i
        }), React.createElement(RightPanel.banner, {
            key: "RP_bn"
        })))));
    },
    _getDataFromStore: function() {
        return RP_Store.getData();
    },
    _onUpdate: function() {
        this.setState(this._getDataFromStore());
    },
    _updateScrollBar: function() {
        this.refs.scrollbar.update();
    },
    _scrollToAnchor: function() {
        this.refs.scrollbar.scrollToAnchor();
    }
});
RightPanel.TopMenu = React.createClass({
    displayName: "TopMenu",
    render: function() {
        var n = this.props.data
          , t = n.isShowTV
          , i = this._getAsiaLink()
          , r = React.createElement("a", {
            className: "AsianBtn" + (t ? " float-right" : ""),
            href: i,
            target: "_top"
        }, l.SportMenu_SwitchToAsianView, React.createElement("span", {
            className: "icon-ArrowMoreBets"
        }))
          , u = t ? React.createElement("div", {
            className: "aside-title",
            onClick: this._openTV
        }, React.createElement("span", {
            className: "icon icon-TV2"
        }), n.TVtxt) : null ;
        return React.createElement("div", {
            className: "tvbox"
        }, r, u);
    },
    _getAsiaLink: function() {
        var n = pm.parentHost();
        return document.domain != "localhost" && n != null && n != "" ? n + "/" + global.lan + "/asia" : "javascript:void(0)";
    },
    _openTV: function() {
        var n = utility.parsePopupInfo("popup-new w810 h584"), u = screen.width / 2 - n.width / 2, f = screen.height / 2 - n.height / 2, i = pm.parentHost(), t, r;
        t = document.domain != "localhost" && i != null && i != "" ? i + "/" + global.lan + "/live-streaming" : "";
        t = t.replace("https://", "http://");
        r = "center=yes,resizable=yes,scrollbars=yes, width=" + n.width + ", height=" + n.height + ",left=" + u + ",top=" + f;
        window.open(t, "stream", r);
    }
});
RightPanel.liveCentre = React.createClass({
    displayName: "liveCentre",
    getInitialState: function() {
        return this._getDataFromStore();
    },
    componentDidMount: function() {
        LC_Store.addUpdateListener(this._onUpdate);
    },
    render: function() {
        var n = this.state;
        return React.createElement("div", {
            className: "pos-relative" + (n.showLC ? "" : " hidden")
        }, React.createElement(RightPanel.liveCentre.tvMenu, {
            data: n,
            slideTvMenuCallback: this.slideTvMenu,
            isLarge: this.props.isLarge,
            ref: "tvMenu"
        }), React.createElement("div", {
            className: "live-center"
        }, React.createElement("p", {
            className: "uppercase"
        }, n.i18n.liveCentreTxt), React.createElement("span", {
            className: "iconbox",
            ref: "infoIcon",
            onClick: this._toggleInfo
        }, React.createElement("a", {
            className: "icon icon-i-s"
        })), React.createElement("div", {
            className: "dropdown hidden",
            ref: "info"
        }, React.createElement("div", {
            className: "title-bar"
        }, l.LC_Info, React.createElement("span", {
            className: "iconbox removebtn"
        }, React.createElement("a", {
            onClick: this._toggleInfo.bind(this, !1),
            className: "icon icon-removeIcon"
        }))), React.createElement("p", {
            className: "dropdown-content"
        }, n.i18n.info)), React.createElement("div", {
            style: {
                clear: "both"
            }
        }), React.createElement("div", {
            className: "toolicon float-right"
        }, React.createElement("span", {
            className: "TVMenuBtn" + (n.showMenuBtn ? "" : " hidden"),
            onClick: this._toggleTVMenu,
            title: n.i18n.tvGuideTxt
        }, React.createElement("a", {
            className: "icon icon-TVMenu",
            href: "javascript:void(0)"
        })), React.createElement("span", {
            className: "LockBtn" + (n.islockBtn ? " active" : ""),
            onClick: this._toggleLockTv.bind(this, !n.islockBtn),
            title: l.RP_LockThisEvent
        }, React.createElement("a", {
            href: "javascript:void(0)",
            className: "icon icon-Lock"
        })), React.createElement("span", {
            className: this.props.isLarge ? "MinimizedBtn" : "MaximizedBtn",
            onClick: this._toggleEnlargeBtn.bind(this, this.props.isLarge ? !1 : !0),
            title: this.props.isLarge ? l.RP_CondensedView : l.RP_EnlargedView
        }, React.createElement("a", {
            href: "javascript:void(0)",
            className: "icon " + (this.props.isLarge ? "icon-Minimized" : "icon-Maximize")
        })))), React.createElement("div", {
            className: "live-content noEvents",
            id: "lcContainer"
        }, React.createElement("div", {
            id: "noBgMsg",
            className: "no-events hidden"
        }, l.RP_NoLiveEvents), React.createElement("div", {
            id: "iframeTarget",
            className: "hidden"
        })));
    },
    _getDataFromStore: function() {
        return LC_Store.getData();
    },
    _toggleTVMenu: function() {
        Action.RightPanel.TV.hideSportMenu();
        Action.RightPanel.TV.hideDateMenu();
        Action.RightPanel.TV.toggleTvMenu(!this.state.showMenu);
        this.slideTvMenu();
        this._toggleInfo(!1);
    },
    _toggleLockTv: function(n) {
        Action.RightPanel.TV.toggleLockBtn(n, !0);
    },
    _toggleEnlargeBtn: function(n) {
        Action.RightPanel.resize(n);
    },
    _onUpdate: function() {
        this.setState(this._getDataFromStore());
    },
    _toggleInfo: function(n) {
        var t = this.refs.info.getDOMNode()
          , i = this.refs.infoIcon.getDOMNode();
        n != undefined && n == !1 ? ($(t).addClass("hidden"),
        $(i).removeClass("info")) : ($(t).toggleClass("hidden"),
        $(i).toggleClass("info"));
    },
    slideTvMenu: function() {
        var n = $(this.refs.tvMenu.getDOMNode())
          , t = n.is(":visible");
        t ? n.slideUp(400) : n.slideDown(400);
    }
});
RightPanel.liveCentre.tvMenu = React.createClass({
    displayName: "tvMenu",
    getInitialState: function() {
        return this._getDataFromStore();
    },
    _getDataFromStore: function() {
        return TVMenu_Store.getData();
    },
    componentDidMount: function() {
        TVMenu_Store.addUpdateListener(this._onUpdate);
    },
    _onUpdate: function() {
        this.setState(this._getDataFromStore());
    },
    render: function() {
        var i = [], r = this.state.sportFilter, n = this.state.dateFilter, e, t, o;
        this.state.lsData && (t = 1,
        e = this.state.playEventId,
        this.state.lsData && (t = 1,
        o = this.props.slideTvMenuCallback,
        i = this.state.lsData.lds.map(function(i) {
            if (!n || n == i.Ed)
                return React.createElement(RightPanel.liveCentre.tvMenu.menuItemGroup, {
                    key: t++,
                    data: i,
                    sportFilter: r,
                    dateFilter: n,
                    playEventId: e,
                    slideTvMenuCallback: o
                });
        })),
        _.remove(i, _.isUndefined));
        var s = $("#iframeTarget")
          , u = s.css("height") ? parseInt(s.css("height")) : 0
          , f = $("#lcContainer");
        return u != 0 && f.hasClass("hidden") || (u = f.css("height") ? parseInt(f.css("height")) : 0),
        React.createElement("div", {
            className: "TVmenu hidden",
            id: "tvMenu"
        }, React.createElement("div", {
            className: "title-bar"
        }, this.state.i18n.tvMenuTxt, React.createElement("span", {
            className: "iconbox removebtn",
            onClick: this._closeMenu
        }, React.createElement("a", {
            href: "javascript:void(0)",
            className: "icon icon-removeIcon"
        }))), React.createElement("ul", {
            className: "TVmenu-title"
        }, React.createElement("li", {
            onClick: this._toggleSportMenu
        }, React.createElement("span", {
            className: "TVmenu-titleName"
        }, r ? r : l.AllSports), React.createElement("span", {
            className: "icon icon-SortIcon float-right"
        }), React.createElement(RightPanel.liveCentre.tvMenu.subSportMenu, {
            data: this.state,
            ref: "sportMenu"
        })), React.createElement("li", {
            onClick: this._toggleDateMenu
        }, React.createElement("span", {
            className: "TVmenu-titleName"
        }, n ? n : l.AllDate), React.createElement("span", {
            className: "icon icon-SortIcon float-right"
        }), React.createElement(RightPanel.liveCentre.tvMenu.subDateMenu, {
            data: this.state,
            ref: "dateMenu"
        }))), React.createElement("div", {
            className: "tvmenu-row-group hasScroll-2"
        }, React.createElement(ScrollBar, {
            h: u - 80,
            w: this.props.isLarge ? 423 : 243,
            ref: "scrollbar",
            always: !0,
            disable: $.GetIEVersion() > 0 ? !0 : !1
        }, i)));
    },
    _closeMenu: function() {
        Action.RightPanel.TV.hideSportMenu();
        Action.RightPanel.TV.hideDateMenu();
        Action.RightPanel.TV.toggleTvMenu(!1);
        this.props.slideTvMenuCallback();
    },
    _toggleSportMenu: function() {
        Action.RightPanel.TV.toggleSportMenu();
    },
    _toggleDateMenu: function() {
        Action.RightPanel.TV.toggleDateMenu();
    },
    componentDidUpdate: function(n, t) {
        var i, r;
        t.showSportSubMenu != undefined && t.showSportSubMenu != this.state.showSportSubMenu && (i = $(this.refs.sportMenu.getDOMNode()),
        this.state.showSportSubMenu ? i.slideDown(400) : i.slideUp(400));
        t.showDateSubMenu != undefined && t.showDateSubMenu != this.state.showDateSubMenu && (r = $(this.refs.dateMenu.getDOMNode()),
        this.state.showDateSubMenu ? r.slideDown(400) : r.slideUp(400));
        this.refs.scrollbar.update();
    }
});
RightPanel.liveCentre.tvMenu.subSportMenu = React.createClass({
    displayName: "subSportMenu",
    render: function() {
        var n = this, t;
        return this.props.data.lsData && (t = this.props.data.lsData.sps.map(function(t) {
            return React.createElement("li", {
                onClick: n._onClick.bind(n, t.Sn),
                key: t.Sn
            }, React.createElement("a", null , t.Sn));
        })),
        React.createElement("ul", {
            className: "SubTVmenu hidden"
        }, React.createElement("li", {
            onClick: this._onClick.bind(n, ""),
            className: "title"
        }, React.createElement("a", null , l.AllSports)), t);
    },
    _onClick: function(n, t) {
        Action.RightPanel.TV.selSportFilter(n);
        t.stopPropagation();
    }
});
RightPanel.liveCentre.tvMenu.subDateMenu = React.createClass({
    displayName: "subDateMenu",
    render: function() {
        var n = this, t;
        return this.props.data.lsData && (t = this.props.data.lsData.lds.map(function(t) {
            return React.createElement("li", {
                onClick: n._onClick.bind(n, t.Ed),
                key: t.Ed
            }, React.createElement("a", null , t.Ed));
        })),
        React.createElement("ul", {
            className: "SubTVmenu hidden"
        }, React.createElement("li", {
            className: "title",
            onClick: n._onClick.bind(n, "")
        }, React.createElement("a", null , l.AllDate)), t);
    },
    _onClick: function(n, t) {
        Action.RightPanel.TV.selDateFilter(n);
        t.stopPropagation();
    }
});
RightPanel.liveCentre.tvMenu.menuItemGroup = React.createClass({
    displayName: "menuItemGroup",
    render: function() {
        var n = []
          , t = this.props.sportFilter
          , i = this.props.playEventId
          , r = this.props.slideTvMenuCallback;
        return this.props.data.sps.forEach(function(u) {
            u.evts.forEach(function(u) {
                t && t != u.SpN || n.push(React.createElement(RightPanel.liveCentre.tvMenu.menuItem, {
                    key: u.EId,
                    evtData: u,
                    isBeingPlayed: i == u.EId ? !0 : !1,
                    slideTvMenuCallback: r
                }));
            });
        }),
        React.createElement("div", {
            className: "tvmenu-row"
        }, React.createElement("div", {
            className: "titlebar"
        }, this.props.data.Ed), React.createElement("table", {
            className: "data-row"
        }, React.createElement("colgroup", null , React.createElement("col", {
            className: "gameTime"
        }), React.createElement("col", {
            className: "gameItem"
        })), React.createElement("tbody", null , n)), React.createElement("div", {
            className: "clearfix"
        }));
    }
});
RightPanel.liveCentre.tvMenu.menuItem = React.createClass({
    displayName: "menuItem",
    render: function() {
        var n = this.props.evtData, t;
        return t = n.il ? React.createElement("td", {
            className: "TimeTd"
        }, React.createElement("span", {
            className: "icon icon-TV2 hh-o"
        })) : React.createElement("td", {
            className: "TimeTd"
        }, n.EST),
        React.createElement("tr", {
            className: this.props.isBeingPlayed ? "selected" : "",
            onClick: this.playTV.bind(this, n.EId, n.HT, n.AT, n.SID, n.LSID, n.il),
            "data-eid": n.EId,
            "data-lsid": n.LSID
        }, t, React.createElement("td", {
            className: "ItemTd"
        }, React.createElement("table", null , React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", null , React.createElement("span", {
            className: "icon icon-" + n.SID
        })), React.createElement("td", null , React.createElement("span", {
            className: "txt"
        }, n.HT, " ", React.createElement("span", {
            className: "hh-o bold"
        }, "v "), n.AT)))))));
    },
    playTV: function(n, t, i, r, u, f, e) {
        console.log("playTV:" + [n, r, u, f]);
        f && (Action.RightPanel.TV.playTvIgnoreLock(n.toString(), t, i, r.toString(), u.toString(), "", !0),
        Action.RightPanel.TV.toggleTvMenu(!1),
        this.props.slideTvMenuCallback());
        e.stopPropagation();
    }
});
RightPanel.Utility = {
    format: {
        numberWithCommas: function(n) {
            var t, i;
            if (n == null )
                return n;
            if (t = n.toString().split("."),
            t[0].length > 1 && (t[0] = t[0].replace(/^0*/, "")),
            t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            t[0] != "")
                if (t[1] == null )
                    t.push("00");
                else if (t[1] = /\d{0,2}/.exec(t[1]).toString(),
                t[1].length < 2)
                    for (i = 0; i < 3 - t[1].length; i++)
                        t[1] += "0";
            return t.join(".");
        },
        numberWithCommasForStakeInput: function(n) {
            if (n == null )
                return n;
            var t = n.toString().split(".");
            return t[0].length > 1 && (t[0] = t[0].replace(/^0*/, "")),
            t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            t[0] != "" && t[1] != null && (t[1] = /\d{0,2}/.exec(t[1]).toString()),
            t.join(".");
        },
        formatTwoDecimal: function(n) {
            var t, i;
            if (n == null )
                return n;
            if (t = n.toString().split("."),
            t[0].length > 1 && (t[0] = t[0].replace(/^0*/, "")),
            t[0] != "")
                if (t[1] == null )
                    t.push("00");
                else if (t[1].length != 3 && (t[1] = /\d{0,2}/.exec(t[1]).toString(),
                t[1].length < 2))
                    for (i = 0; i < 3 - t[1].length; i++)
                        t[1] += "0";
            return t.join(".");
        },
        removeCommas: function(n) {
            if (n == null )
                return n;
            var t = n.toString().split(".");
            return t[0].length > 1 && (t[0] = t[0].replace(/^0*/, "")),
            t[0] = t[0].replace(/,/g, ""),
            t.join(".");
        },
        removeNonNumeric: function(n) {
            return n == null ? n : n.replace(/[^0-9\.]+/g, "");
        },
        truncateNumber: function(n) {
            if (n == null )
                return n;
            var t = n + ""
              , i = 12;
            return t.length > i ? t.substring(0, i) : n;
        },
        onlyHasNumeric: function(n) {
            return n == null ? !1 : !/[^0-9\.]+/g.test(n);
        },
        formatPlaceDate: function(n) {
            return moment(n).format(" DD / MM YYYY  HH:mm:ss");
        },
        formatEventDate: function(n) {
            return moment(n).format("DD / MM  HH:mm");
        }
    },
    link: {
        _getMorebetLink: function(n, t, i) {
            return viewType = t == 2 ? VIEW.INPLAY : t == 0 ? VIEW.PRESTART : VIEW.STARTINGSOON,
            Router.event(n, viewType, i);
        },
        _getUnSettledLink: function() {
            //return Router.statement.unsettled();
            return "unsettled-bets"
        },
        _getSettledLink: function() {
            //return Router.statement.settled();
            return "settled-bets?daysInput=0"
        }
    },
    scrollbarUpdate: {
        _updateFromTop: !1,
        componentWillReceiveProps: function() {
            this._updateFromTop = !0;
        },
        componentDidUpdate: function() {
            this._updateFromTop || this.props.updateScrollBarFN == null ? this._updateFromTop = !1 : this.props.updateScrollBarFN();
        }
    }
};
RightPanel.betSlips = React.createClass({
    displayName: "betSlips",
    mixins: [RightPanel.Utility.scrollbarUpdate],
    getInitialState: function() {
        return this._getDataFromStore();
    },
    componentDidMount: function() {
        BS_Store.addUpdateListener(this._onUpdate);
        this.props.isPopUp && Action.RightPanel.resizeFrame();
    },
    componentDidUpdate: function() {
        var n = this.state.extraData.currentMode, t = this.state.extraData.modes, i = this.state.BS_Data == null ? null : this.state.BS_Data.ts, r;
        this._changeFromStore && (this._changeFromStore = !1,
        n != t.PLACEBET || i == null || i.length != 1 || this.props.isPopUp ? n == t.BETRECEIPT && (r = this.state.BS_Data.s.map(function(n) {
            return n.sid + "";
        }),
        Action.CenterPanel.removeHighlightOdds(r)) : this.props.scrollToAnchorFn());
        this.props.isPopUp && Action.RightPanel.resizeFrame();
    },
    render: function() {
        var n = this.state.BS_Data, t = this.state.extraData, i = n == null ? [] : n.ts, o = n == null ? [] : n.tc, c = t.retainSelection, g = this.props.isPopUp, a, v, y, p, nt, k, d;
        i.length == 0 && o.length == 0 && (a = React.createElement(RightPanel.betSlips.emptyBetEntry, null ));
        var w = t.editingId, b = i.length == 1 ? !1 : t.isOpenCombo, r = t.modes, s = t.currentMode, h = "tab_content", u, f, e;
        if (n.islog)
            switch (s) {
            case r.PLACEBET:
                u = React.createElement(RightPanel.betSlips.topMenu.loggedIn, {
                    showMyBet: t.showMyBet
                });
                i.length > 0 && (f = React.createElement(RightPanel.betSlips.actions.loggedIn, {
                    data: {
                        abo: n.abo,
                        sbc: n.sbc,
                        needAcceptChange: t.needAcceptChange
                    }
                }));
                n.info != null && (e = React.createElement(RightPanel.betSlips.notice, {
                    msg: n.info
                }));
                break;
            case r.BETCONFIRM:
                u = React.createElement(RightPanel.betSlips.topMenu.betConfirm, null );
                f = React.createElement(RightPanel.betSlips.actions.betConfirm, null );
                h = "ConfirmBetContent";
                break;
            case r.BETRECEIPT:
                u = React.createElement(RightPanel.betSlips.topMenu.betReceipt, null );
                f = React.createElement(RightPanel.betSlips.actions.betReceipt, {
                    data: {
                        retainSelection: c,
                        isPopUp: g
                    }
                });
                e = n.berr == 9999 ? n.info != "BS_DangerBet" && n.info != "BS_DangerSuccess" ? React.createElement(RightPanel.betSlips.errorMsg, {
                    isComfirm: !0,
                    msg: l[n.info],
                    isGeneralMsg: !0
                }) : React.createElement(RightPanel.betSlips.errorMsg, {
                    msg: l[n.info],
                    isGeneralMsg: !0
                }) : React.createElement(RightPanel.betSlips.notice, {
                    msg: l[n.info]
                });
                h = "BetreceiptContent";
            }
        else
            u = React.createElement(RightPanel.betSlips.topMenu.preLogIn, null ),
            i.length > 0 && (f = React.createElement(RightPanel.betSlips.actions.preLogIn, null ));
        return i.length > 0 && (nt = 0,
        v = i.map(function(u, f) {
            f++;
            var e = u.sid
              , o = {
                currentMode: s,
                modes: r,
                data: u,
                cc: n.cc,
                isEditing: w == u.sid,
                isOpenCombo: b,
                retainSelection: c,
                islog: n.islog,
                needFocus: t.needFocus
            };
            return React.createElement(RightPanel.betSlips.betEntry, {
                key: e,
                data: o,
                last: i.length == f
            });
        })),
        o.length > 0 && (y = React.createElement(RightPanel.betSlips.combobet, {
            currentMode: s,
            modes: r,
            data: o,
            cc: n.cc,
            editingId: w,
            isOpenCombo: b,
            canCombo: n.iscom,
            islog: n.islog
        })),
        (i.length > 0 || o.length > 0) && (p = React.createElement(RightPanel.betSlips.total, {
            totalBet: n.totalBet,
            totalStake: n.totalStake,
            totalPay: n.totalPay,
            cc: n.cc
        })),
        t.showLoading && (k = React.createElement(RightPanel.betSlips.loading, null )),
        d = React.createElement("div", {
            className: "tab_content" + (t.showMyBet ? "" : " hidden")
        }, React.createElement(RightPanel.myBet, {
            updateScrollBarFN: this.props.updateScrollBarFN,
            isPopUp: this.props.isPopUp
        })),
        n.errmsg != null && e == null && (e = React.createElement(RightPanel.betSlips.errorMsg, {
            msg: n.errmsg,
            isGeneralMsg: !0
        })),
        React.createElement("div", {
            className: n.islog ? "betbox loggedIn" : "betbox prelogin"
        }, u, React.createElement("div", null , React.createElement("div", {
            className: h + (t.showMyBet ? " hidden" : "")
        }, k, a, v, y, p, e, f), d));
    },
    _getDataFromStore: function() {
        return {
            BS_Data: BS_Store.getData(),
            extraData: BS_Store.getExtraData()
        };
    },
    _onUpdate: function() {
        var n = this._getDataFromStore();
        this._changeFromStore = n.extraData.needFocus;
        this.setState(n);
    }
});
RightPanel.betSlips.topMenu = {};
RightPanel.betSlips.topMenu.preLogIn = React.createClass({
    displayName: "preLogIn",
    render: function() {
        return React.createElement("p", {
            className: "betreceiptTitle"
        }, React.createElement("b", null , l.BS_Bet_Slip));
    }
});
RightPanel.betSlips.topMenu.loggedIn = React.createClass({
    displayName: "loggedIn",
    render: function() {
        var n = this.props.showMyBet;
        return React.createElement("ul", {
            className: "tabs"
        }, React.createElement("li", {
            id: "tabBetSlip",
            className: n ? "" : "active"
        }, React.createElement("a", {
            href: "javascript:void(0)",
            onClick: this._toggleMyBet.bind(this, !1)
        }, l.BS_Bet_Slip)), React.createElement("li", {
            id: "tabMyBet",
            className: n ? "active" : ""
        }, React.createElement("a", {
            href: "javascript:void(0)",
            onClick: this._toggleMyBet.bind(this, !0)
        }, l.BS_My_Bets)));
    },
    _toggleMyBet: function(n) {
        n ? Action.RightPanel.refreshMyBet(!0) : Action.RightPanel.toggleMyBet(n);
    }
});
RightPanel.betSlips.topMenu.betConfirm = React.createClass({
    displayName: "betConfirm",
    render: function() {
        return React.createElement("p", {
            className: "confirmTitle"
        }, React.createElement("b", null , l.BS_Confirm_Bet));
    }
});
RightPanel.betSlips.topMenu.betReceipt = React.createClass({
    displayName: "betReceipt",
    render: function() {
        return React.createElement("p", {
            className: "betreceiptTitle"
        }, React.createElement("b", null , l.BS_Bet_Receipt));
    }
});
RightPanel.betSlips.emptyBetEntry = React.createClass({
    displayName: "emptyBetEntry",
    render: function() {
        return React.createElement("div", {
            className: "betslip-row selectBetSlip"
        }, React.createElement("div", {
            className: "icongroup"
        }, React.createElement("span", {
            className: "icon icon-addSelectToBetSlip"
        })), React.createElement("p", {
            className: "text"
        }, l.BS_Add_Selection_To_BetSlip));
    }
});
RightPanel.betSlips.betEntry = React.createClass({
    displayName: "betEntry",
    mixins: [RightPanel.Utility.format],
    componentDidMount: function() {
        $(this.refs.betEntry.getDOMNode()).on("contextmenu", function() {
            return !1;
        }).on("keydown", function(n) {
            var i = n.keyCode ? n.keyCode : n.which, t;
            return t = n.ctrlKey,
            t && "v" == String.fromCharCode(i).toLowerCase() ? !1 : void 0;
        });
    },
    render: function() {
        var r = this.props.data, n = r.data, g = n.ip == !0 && n.ishp && n.isds, i = r.currentMode, t = r.modes, u = !1, c = "betslip-row", e = "bold", o = "", a, s, v, h = "over-hidden", p, f, w, b, k, d;
        switch (i) {
        case t.PLACEBET:
            u = r.isOpenCombo && (n.ip || !n.ap || n.rsl == 8888);
            c += u ? " error" : "";
            e += " hh-o";
            o += " hh-o";
            h += " pd-10";
            a = React.createElement("span", {
                className: "iconbox c-removebtn",
                onClick: this._handleRemoveBetslip
            }, React.createElement("a", {
                href: "javascript:void(0)",
                className: "icon icon-MainMarketsHideleftminur"
            }));
            s = React.createElement(RightPanel.betSlips.stake.single, {
                ref: "stake",
                st: n.st,
                towin: n.towin,
                hasError: u,
                isEditing: r.isEditing,
                sid: n.sid,
                domId: "stake_" + n.sid,
                needFocus: r.needFocus
            });
            r.isEditing && (v = React.createElement(RightPanel.betSlips.quickBet, {
                hideMax: !r.islog,
                cc: r.cc,
                max: n.bs.bmax,
                clickFN: this._clickQuickBet,
                clearFN: this._clearStake,
                isSingle: !0
            }));
            break;
        case t.BETCONFIRM:
            n.st > 0 && (s = React.createElement(RightPanel.betSlips.stake.confirmBet, {
                st: n.st,
                towin: n.towin,
                nobold: !0
            }));
            e += " hh-o";
            o += " hh-o";
            h += " pd-t-6 pd-b-6 pd-l-10 pd-r-10";
            break;
        case t.BETRECEIPT:
            u = n.st > 0 && n.rsl != 9999 || n.st == 0 && !n.hasSuccessComboBet || n.idan;
            c += u ? " error" : " success";
            e += " hh-b";
            o += " hh-o";
            h += " pd-b-6 pd-l-10 pd-r-10";
            n.st > 0 && (s = React.createElement(RightPanel.betSlips.stake.confirmBet, {
                isReceipt: !0,
                st: n.st,
                towin: this.numberWithCommas(n.towin)
            }));
        }
        var nt = n.rsl == 2 || n.serr == "Hdp_Odds_Changed", tt = n.rsl == 3, it = n.rsl == 1 || n.serr == "Hdp_Odds_Changed", y;
        return g && (y = React.createElement("span", {
            className: "dsp-iblk highlight" + (tt ? " ft-c-3" + (i != t.BETRECEIPT ? " bg-c-42" : " bg-c-52") : i != t.BETRECEIPT && u ? " ft-c-3 bg-c-50" : "")
        }, " ", "(" + n.hs + "-" + n.as + ")")),
        /or/i.test(n.tl) || (p = React.createElement("p", null , n.hn + " ", React.createElement("span", {
            className: u || i == t.BETRECEIPT ? "" : "hh-o bold"
        }, " v "), n.an + " ")),
        f = {
            cn: n.cpn,
            h: n.hn,
            a: n.an,
            ip: n.ip,
            isReceipt: i == t.BETRECEIPT
        },
        n.ip && i != t.BETRECEIPT ? (f.hs = n.hs,
        f.as = n.as) : (f.edt = n.edt,
        /or/i.test(n.tl) && (f.en = n.en)),
        i == t.BETRECEIPT && n.st != 0 && (w = React.createElement("p", {
            className: "p-betID"
        }, l.BetNo, React.createElement("span", {
            className: "bold mg-l-3"
        }, n.wo)),
        n.pdt != null && (b = React.createElement("p", {
            className: "p-placed"
        }, l.Wager_BetDate, React.createElement("span", {
            className: "bold"
        }, this.formatPlaceDate(n.pdt))))),
        n.hd != null && n.hd != "null" && (k = React.createElement("span", {
            className: o + (it ? " highlight ft-c-3" + (i != t.BETRECEIPT ? " bg-c-42" : " bg-c-52") : "")
        }, n.hd)),
        (n.serr != "" && n.serr != null ) && (d = React.createElement(RightPanel.betSlips.errorMsg, {
            msg: l[n.serr] != null ? (i == t.BETRECEIPT ? l.BS_BetFailed : "") + " " + l[n.serr] : n.errMsg
        })),
        React.createElement("div", {
            className: classNames("Betreceiptlist", {
                reomveborder: this.props.last
            })
        }, React.createElement("div", {
            id: "be_" + n.eid + "_" + n.sid,
            className: c,
            ref: "betEntry"
        }, React.createElement(RightPanel.infoddl, {
            data: f,
            ref: "ddl"
        }, w, b), React.createElement("span", {
            className: "iconbox",
            onMouseOver: this._showInfo.bind(this, !0),
            onMouseOut: this._showInfo.bind(this, !1)
        }, React.createElement("a", {
            href: "javascript:void(0)",
            className: "icon icon-i-s"
        })), React.createElement("span", {
            className: "bettitle"
        }, React.createElement("span", {
            className: i == t.PLACEBET && u ? " highlight ft-c-3 bg-c-50" : ""
        }, n.bn), y), React.createElement("div", {
            className: "db-group"
        }, React.createElement("p", {
            className: "big-txt"
        }, React.createElement("span", {
            className: "name1"
        }, n.sn + " "), k, React.createElement("span", {
            className: "at mg-l-3 mg-r-3"
        }, "@"), React.createElement("span", {
            className: e + (nt ? " highlight ft-c-3" + (i != t.BETRECEIPT ? " bg-c-42" : " bg-c-52") : ""),
            ref: "odds"
        }, this.formatTwoDecimal(n.o))), p), a, React.createElement("div", {
            className: h
        }, s), v), d);
    },
    _handleRemoveBetslip: function() {
        Action.RightPanel.removeSelection(this.props.data.data.sid);
    },
    _showInfo: function(n) {
        n ? this.refs.ddl.show() : this.refs.ddl.hide();
    },
    _clickQuickBet: function(n) {
        Action.RightPanel.addStake(this.props.data.data.sid, n);
        this.refs.stake.focus();
    },
    _clearStake: function() {
        Action.RightPanel.updateStake(this.props.data.data.sid, null );
        this.refs.stake.focus();
    }
});
RightPanel.betSlips.stakeInput = React.createClass({
    displayName: "stakeInput",
    mixins: [RightPanel.Utility.format],
    render: function() {
        var n = {
            className: "form-control " + (this.props.isTowin ? "ToWin" : "Stake"),
            onFocus: this._handleFocusAndBlur.bind(this, !0),
            onBlur: this._handleFocusAndBlur.bind(this, !1),
            onChange: this._handleChange,
            onKeyUp: this._handleKeyUp,
            placeholder: this.props.placeholder
        }
          , t = this.props.ttp == "" || this.props.ttp == null ? null : isNaN(this.props.ttp) ? this.props.ttp : this.numberWithCommasForStakeInput(this.props.ttp);
        return React.createElement("span", {
            title: t
        }, React.createElement("input", React.__spread({
            id: this.props.domId,
            ref: "dom",
            type: "text",
            value: this.numberWithCommasForStakeInput(this.props.value)
        }, n, this.props.extraProps)));
    },
    _handleFocusAndBlur: function(n, t) {
        var i = t.target;
        i.placeholder = n ? "" : this.props.placeholder;
        n && this.props.focusInFn();
    },
    _handleChange: function(n) {
        var t = n.target.value, i;
        this.onlyHasNumeric(t) || (t = this.removeNonNumeric(t));
        t = this.truncateNumber(t);
        $(this.refs.dom.getDOMNode()).val(t);
        i = this.removeCommas(t);
        $(this.refs.dom.getDOMNode()).data("changeVal", this.removeCommas(t));
    },
    _handleKeyUp: function(n) {
        if (!BS.Utility.IgnoreInput(n)) {
            var t = $(this.refs.dom.getDOMNode()).data("changeVal");
            t != null && this.props.changeFN(t);
        }
    },
    focus: function() {
        $(this.refs.dom.getDOMNode()).focus();
    }
});
RightPanel.betSlips.stake = {};
RightPanel.betSlips.stake.confirmBet = React.createClass({
    displayName: "confirmBet",
    mixins: [RightPanel.Utility.format],
    render: function() {
        var i = this.props.st, n = this.props.towin, r = this.props.isCombo, u = this.props.bc, t;
        return r && (t = React.createElement("span", null , " X " + u)),
        React.createElement("div", null , React.createElement("span", {
            className: "staketxt float-left text-left" + (this.props.isReceipt ? this.props.err ? " ft-c-53" : " ft-c-49" : "")
        }, l.BS_Title_Stake, React.createElement("br", null ), React.createElement("span", {
            className: "number" + (this.props.nobold ? "" : " bold"),
            ref: "stake"
        }, this.numberWithCommas(i), t)), React.createElement("span", {
            className: "towintxt float-right text-right" + (this.props.isReceipt ? this.props.err ? " ft-c-53" : " ft-c-49" : "")
        }, this.props.isSettled ? l.Wager_Returns : l.BS_Title_To_Win, React.createElement("br", null ), React.createElement("span", {
            className: "number" + (this.props.nobold ? "" : " bold"),
            ref: "towin"
        }, /--/.test(n) ? n : this.numberWithCommas(n))), React.createElement("div", {
            className: "clearfix"
        }));
    }
});
RightPanel.betSlips.stake.single = React.createClass({
    displayName: "single",
    componentDidMount: function() {
        this.props.isEditing && this.focus();
    },
    componentDidUpdate: function() {
        this.props.isEditing && this.props.needFocus && this.focus();
    },
    render: function() {
        var t = this.props.st
          , n = this.props.towin;
        return React.createElement("div", {
            className: "inputbox"
        }, React.createElement(RightPanel.betSlips.stakeInput, {
            placeholder: l.BS_Title_Stake,
            ref: "stake",
            focusInFn: this._handleEditStake,
            changeFN: this._handleChangeStake,
            value: t,
            extraProps: {},
            ttp: l.BS_Title_Stake,
            domId: this.props.domId
        }), React.createElement(RightPanel.betSlips.stakeInput, {
            placeholder: l.BS_Title_To_Win,
            focusInFn: this._handleEditStake,
            changeFN: this._handleChangeToWin,
            value: n == null ? "" : n,
            extraProps: {},
            isTowin: !0,
            ttp: l.BS_Title_To_Win
        }));
    },
    _handleChangeStake: function(n) {
        Action.RightPanel.updateStake(this.props.sid, n);
    },
    _handleChangeToWin: function(n) {
        Action.RightPanel.updateToWin(this.props.sid, n);
    },
    _handleEditStake: function() {
        this.props.isEditing || Action.RightPanel.editBetSlip(this.props.sid);
    },
    focus: function() {
        this.refs.stake.focus();
    }
});
RightPanel.betSlips.stake.combo = React.createClass({
    displayName: "combo",
    mixins: [RightPanel.Utility.format],
    render: function() {
        var t = this.props.bc
          , i = this.props.st
          , n = this.props.towin;
        return React.createElement("div", null , React.createElement("span", {
            className: "staketxt float-left text-left"
        }, React.createElement(RightPanel.betSlips.stakeInput, {
            ref: "stake",
            placeholder: l.BS_Title_Stake,
            value: i,
            focusInFn: this._handleEditCombo,
            changeFN: this._handleChangeStake,
            extraProps: {},
            ttp: l.BS_Title_Stake,
            domId: this.props.domId
        }), React.createElement("span", {
            className: "number"
        }, React.createElement("span", {
            className: "ft-c-3"
        }, "X"), React.createElement("span", {
            className: "mg-l-5 ft-c-3"
        }, t))), React.createElement("span", React.__spread({
            ref: "towin",
            className: "towintxt float-right text-right number-txt" + (n == "" || n == null ? "" : " number")
        }, {}), n == null ? l.BS_Title_To_Win : this.numberWithCommas(n)), React.createElement("div", {
            className: "clearfix"
        }));
    },
    _handleChangeStake: function(n) {
        Action.RightPanel.updateComboStake(this.props.wid, n);
    },
    _handleEditCombo: function() {
        this.props.isEditing || Action.RightPanel.editBetSlip("cb_" + this.props.wid);
    },
    focus: function() {
        this.refs.stake.focus();
    }
});
RightPanel.betSlips.combobet = React.createClass({
    displayName: "combobet",
    render: function() {
        var n = this.props.data, f = this.props.islog, e = this.props.editingId, o = this.props.cc, t = this.props.currentMode, i = this.props.modes, r = t == i.PLACEBET, p = n.map(function(n) {
            if (n.wid == 1)
                return "";
            var r = "cb_" + n.wid;
            return React.createElement(RightPanel.betSlips.combobet.comboItem, {
                key: r,
                data: n,
                cc: o,
                isEditing: e == r,
                currentMode: t,
                modes: i,
                islog: f
            });
        }), u, s, h, c, a, v, y;
        return t == i.BETRECEIPT || this.props.canCombo || (u = React.createElement(RightPanel.betSlips.errorMsg, {
            msg: l.BS_CannotCombined
        })),
        _.some(n, "wid", 1) && (s = React.createElement(RightPanel.betSlips.combobet.comboItem, {
            data: n[0],
            cc: o,
            isEditing: e == "cb_" + n[0].wid,
            currentMode: t,
            modes: i,
            islog: f
        })),
        a = r ? !0 : n.length > 1 || n[0].wid != 1,
        a && (r && (v = React.createElement("a", {
            href: "javascript:void(0)",
            className: "icon " + (this.props.isOpenCombo ? "icon-ArrowUp" : "icon-ArrowDown")
        }),
        y = React.createElement("a", {
            href: "javascript:void(0)",
            className: "icon icon-Help",
            onClick: this._showParlayHelpingPopUp
        })),
        h = React.createElement("p", {
            ref: "multiple",
            className: "MultipleTitle",
            onClick: this._toggleComboCollapse
        }, l.BS_ComboBet_Title, v, y),
        c = React.createElement("div", {
            ref: "items",
            className: this.props.isOpenCombo ? "" : "hidden"
        }, u, u == null ? p : null )),
        React.createElement("div", {
            className: "MultipleBets " + (r ? "edit" : "")
        }, s, h, c);
    },
    _toggleComboCollapse: function() {
        var t = this.props.isOpenCombo
          , n = this.refs.items.getDOMNode()
          , i = this.props.canCombo
          , r = this.props.currentMode
          , u = this.props.modes
          , f = r == u.PLACEBET;
        f && i && (t ? $(n).slideUp("slow", function() {
            Action.RightPanel.changeComboCollapseStatus(!1);
        }) : $(n).slideDown("slow", function() {
            Action.RightPanel.changeComboCollapseStatus(!0);
        }));
    },
    _showParlayHelpingPopUp: function(n) {
        var t = React.createElement(RightPanel.betSlips.parlayPopUp, null );
        Action.FullScreenBlock.show(t);
        n.stopPropagation();
        n.preventDefault();
    }
});
RightPanel.betSlips.combobet.comboItem = React.createClass({
    displayName: "comboItem",
    mixins: [RightPanel.Utility.format],
    render: function() {
        var n = this.props.data, c = n.wid == 1 ? l.BetType_Singles : n.cbn, u, e, t = this.props.currentMode, i = this.props.modes, o = t == i.PLACEBET, s, h, f, r;
        return o ? (u = React.createElement(RightPanel.betSlips.stake.combo, {
            ref: "stake",
            wid: n.wid,
            bc: n.bc,
            st: n.cba,
            towin: n.payout,
            isEditing: this.props.isEditing,
            domId: "cb_" + n.wid
        }),
        this.props.isEditing && (e = React.createElement(RightPanel.betSlips.quickBet, {
            hideMax: n.wid == 1 || !this.props.islog,
            cc: this.props.cc,
            max: n.cbs.bmax,
            clickFN: this._clickQuickBet,
            clearFN: this._clearStake,
            isSingle: n.wid == 1
        }))) : (u = React.createElement(RightPanel.betSlips.stake.confirmBet, {
            isReceipt: t == i.BETRECEIPT,
            st: n.cba,
            towin: n.payout,
            isCombo: !0,
            err: n.cerr != null ,
            bc: n.bc,
            nobold: t == i.BETCONFIRM
        }),
        t != i.BETRECEIPT || n.cerr || (s = React.createElement("div", {
            className: "pd-10 pd-t-5 pd-b-0"
        }, React.createElement("div", {
            className: "tbr-c-17 pd-t-5"
        }, React.createElement("p", {
            className: "p-betID "
        }, React.createElement("span", {
            className: "ft-c-22"
        }, l.BetNo), React.createElement("span", {
            className: "bold ft-c-25 mg-l-3"
        }, n.wo)))))),
        n.cerr && (h = React.createElement(RightPanel.betSlips.errorMsg, {
            msg: (t == i.BETRECEIPT ? l.BS_BetFailed : "") + " " + l[n.cerr],
            domId: "bs_cerr_" + n.wid
        })),
        f = "MultipleBets-row",
        t == i.BETRECEIPT && (f += " " + (!n.cerr || n.cerr == "" ? "success" : "error")),
        r = [],
        r.push(c),
        n.wid != 1 && n.bc == 1 && (r.push(React.createElement("span", {
            className: "mg-l-6"
        }, "@")),
        r.push(React.createElement("span", {
            ref: "odds",
            className: "mg-l-6 bold" + (t != i.BETRECEIPT ? " ft-c-51" : "") + (n.cerr && /^Odds_Changed/i.test(n.cerr) ? " highlight" : "")
        }, this.numberWithCommas(n.co)))),
        React.createElement("div", null , React.createElement("div", {
            className: f
        }, React.createElement("p", {
            className: "pd-l-10 pd-r-10" + (t != i.BETRECEIPT ? " ft-c-27" : !n.cerr || n.cerr == "" ? " ft-c-48" : " ft-c-54")
        }, r), React.createElement("div", {
            className: " pd-l-10 pd-r-10" + (o ? "" : " pd-t-6")
        }, u), React.createElement("div", {
            className: "clearfix"
        }), s), e, h);
    },
    _clickQuickBet: function(n) {
        Action.RightPanel.addComboStake(this.props.data.wid, n);
        this.refs.stake.focus();
    },
    _clearStake: function() {
        Action.RightPanel.updateComboStake(this.props.data.wid, null );
        this.refs.stake.focus();
    }
});
RightPanel.betSlips.total = React.createClass({
    displayName: "total",
    mixins: [RightPanel.Utility.format],
    render: function() {
        var n = this.props.totalBet
          , i = parseFloat(this.props.totalStake)
          , r = this.props.totalPay
          , t = this.props.cc;
        return React.createElement("div", {
            className: "MultipleBetsTotal-row"
        }, React.createElement("p", {
            className: "staketxt"
        }, React.createElement("span", {
            className: "float-left"
        }, React.createElement("span", {
            className: "ft-c-3"
        }, n), " " + (n == 1 ? l.BS_Total_Bet : l.BS_Total_Bets) + ":"), React.createElement("span", {
            className: "float-right number"
        }, React.createElement("span", {
            ref: "stake"
        }, this.numberWithCommas(i)), " " + t)), React.createElement("p", {
            className: "towintxt"
        }, React.createElement("span", {
            className: "float-left"
        }, l.BS_Total_Payout), React.createElement("span", {
            className: "float-right number"
        }, React.createElement("span", {
            ref: "pay"
        }, this.numberWithCommas(r)), " " + t)), React.createElement("div", {
            className: "clearfix"
        }));
    }
});
RightPanel.betSlips.actions = {};
RightPanel.betSlips.actions.loggedIn = React.createClass({
    displayName: "loggedIn",
    render: function() {
        var n = this.props.data, i = n.abo, t = n.sbc, r, u, f;
        return i && (r = React.createElement("span", {
            className: "icon-check fts-12"
        })),
        t && (u = React.createElement("span", {
            className: "icon-check fts-12"
        })),
        f = t ? this._showBetConfirm : this._placeBet,
        React.createElement("div", {
            className: "quickBetCheck"
        }, React.createElement("a", {
            id: "btnPlaceBet_BS",
            className: "BTN placebet-btn bold" + (n.needAcceptChange ? " orangeC" : " greenB"),
            href: "javascript:void(0)",
            onClick: f
        }, n.needAcceptChange ? l.BS_AcceptChange : l.BS_Place_Bet), React.createElement(ScrollBarAnchor, null ), React.createElement("a", {
            id: "BSRemoveAll",
            href: "javascript:void(0)",
            className: "removeall",
            onClick: this._removeAll
        }, l.BS_Remove_All), React.createElement("div", {
            className: "selectItems has2Item hidden"
        }, React.createElement("span", {
            className: "ch1",
            onClick: this._toggleAcceptBetterOdds.bind(this, !i)
        }, React.createElement("span", {
            id: "bs_abo",
            className: "cbx-container mg-r-4 dsp-iblk" + (i ? " selected" : "")
        }, React.createElement("span", {
            className: "checkbox-s radius pos-relative t-va-m"
        }, r), l.BS_Accept_Better_Odds)), React.createElement("span", {
            className: "ch1",
            onClick: this._toggleShoeBetConfirmation.bind(this, !t)
        }, React.createElement("span", {
            id: "bs_sbc",
            className: "cbx-container mg-r-4 dsp-iblk" + (t ? " selected" : "")
        }, React.createElement("span", {
            className: "checkbox-s radius pos-relative t-va-m"
        }, u), l.BS_Show_Bet_Confirmation)), React.createElement("div", {
            className: "clearfix"
        })));
    },
    _toggleAcceptBetterOdds: function(n) {
        Action.RightPanel.updateAcceptBetterOdds(n);
    },
    _toggleShoeBetConfirmation: function(n) {
        Action.RightPanel.updateShowBetConfirmation(n);
    },
    _showBetConfirm: function() {
        Action.RightPanel.placebetToBetConfirm();
    },
    _placeBet: function() {
        Action.RightPanel.placebetToBetReceipt();
    },
    _removeAll: function() {
        Action.RightPanel.emptyBetslip();
    }
});
RightPanel.betSlips.actions.preLogIn = React.createClass({
    displayName: "preLogIn",
    render: function() {
        return React.createElement("div", {
            className: "quickBetCheck"
        }, React.createElement("span", {
            className: "logIn-sign"
        }, l.BS_Please_LogIn), React.createElement("a", {
            className: "BTN orangeC logIn-btn bold m-b-10",
            href: "javascript:void(0)",
            onClick: this._handleClickJoin
        }, l.BS_Join), React.createElement("a", {
            href: "javascript:void(0)",
            className: "removeall join-btn",
            onClick: this._removeAll
        }, l.BS_Remove_All), React.createElement("div", {
            className: "clearfix"
        }));
    },
    _handleClickJoin: function(n) {
        var t = pm.parentHost(), i;
        t != null && t != "" && (i = t + "/" + global.lan + (/TT_CASH/i.test(global.bu) ? "/user/register" : "/sign-up"),
        n.target.href = i,
        window.open(i, "_blank"));
        n.stopPropagation();
        n.preventDefault();
    },
    _removeAll: function() {
        Action.RightPanel.emptyBetslip();
    }
});
RightPanel.betSlips.actions.betConfirm = React.createClass({
    displayName: "betConfirm",
    render: function() {
        return React.createElement("div", {
            className: "quickBetCheck"
        }, React.createElement("a", {
            id: "btnConfirm_BS",
            className: "BTN orangeB confirm-btn m-b-10",
            href: "javascript:void(0)",
            onClick: this._placeBet
        }, l.BS_Confirm), React.createElement("a", {
            id: "btnCancel_BS",
            className: "BTN grayB m-b-10",
            href: "javascript:void(0)",
            onClick: this._clickCancel
        }, l.BS_Cancel), React.createElement("div", {
            className: "clearfix"
        }));
    },
    _placeBet: function(n) {
        Action.RightPanel.betConfirmToBetReceipt();
        n.stopPropagation();
        n.preventDefault();
    },
    _clickCancel: function(n) {
        Action.RightPanel.showPlacebet();
        n.stopPropagation();
        n.preventDefault();
    }
});
RightPanel.betSlips.actions.betReceipt = React.createClass({
    displayName: "betReceipt",
    render: function() {
        var t = this.props.data.retainSelection, n;
        return t && (n = React.createElement("span", {
            className: "icon-check fts-12"
        })),
        React.createElement("div", {
            className: "quickBetCheck"
        }, /*
        React.createElement("div", {
            className:"selectItems no-b-t"
        }, React.createElement("span", {
            className:"ch1",
            onClick:this._isRetainSelection
        }, React.createElement("span", {
            className:"cbx-container mg-r-4 dsp-iblk"
        }, React.createElement("span", {
            className:"checkbox-s radius pos-relative t-va-m"
        }, n), l.BS_Retain_Selection)), React.createElement("div", {
            className:"clearfix"
        })), 
        */
        React.createElement("a", {
            id: "btnPrint_BS",
            className: "BTN orangeB confirm-btn m-b-10",
            href: "javascript:void(0)",
            onClick: this._clickPrint
        }, l.LP_Print), React.createElement("a", {
            id: "btnOk_BS",
            className: "BTN grayB m-b-10",
            href: "javascript:void(0)",
            onClick: this._clickOK
        }, l.LP_Ok), React.createElement("div", {
            className: "clearfix"
        }));
    },
    _clickOK: function() {
        this.props.data.isPopUp ? Action.RightPanel.resetBetSlip() : Action.RightPanel.betReceiptToPlacebet();
    },
    _clickPrint: function() {
        var ids="",n,k;
        n = Action.RightPanel.betReceiptToPrint();
        console.log(n);

        k = n.s.length;
        for(i=0;i<k;i++){
            if(i==(k-1)) ids += n.s[i].wo;else ids += n.s[i].wo+"_";
        }
        Action.PopupNewWin({
            id: "account",
            height: 610,
            width: 1024,
            resizable: "yes",
            scroll: "yes"
        }, "print?ids="+ids);
        
        //Action.RightPanel.resetBetSlip();
        //this.props.data.isPopUp ? Action.RightPanel.resetBetSlip() :Action.RightPanel.betReceiptToPlacebet();
    },
    _isRetainSelection: function() {
        var n = this.props.data.retainSelection;
        Action.RightPanel.isRetainSelection(!n);
    }
});
RightPanel.betSlips.errorMsg = React.createClass({
    displayName: "errorMsg",
    render: function() {
        var n = this.props.isGeneralMsg ? "bsGeneralMsg" : this.props.domId ? this.props.domId : "";
        return React.createElement("table", {
            id: n,
            className: "alertbar" + (this.props.isComfirm ? " bg-c-51" : " bg-c-50")
        }, React.createElement("tbody", null , React.createElement("tr", null , React.createElement("td", null , React.createElement("span", {
            className: this.props.isComfirm ? "icon-CheckIcon ft-c-55" : "icon-WarningIcon"
        })), React.createElement("td", null , React.createElement("span", {
            className: this.props.isComfirm ? "ft-c-55" : ""
        }, this.props.msg)))));
    }
});
RightPanel.betSlips.notice = React.createClass({
    displayName: "notice",
    render: function() {
        return React.createElement("div", {
            id: "bsGeneralMsg",
            className: "fail-alertbar"
        }, React.createElement("span", null , this.props.msg));
    }
});
RightPanel.betSlips.quickBet = React.createClass({
    displayName: "quickBet",
    mixins: [RightPanel.Utility.format],
    render: function() {
        var r = this, t = this.props.clickFN, i = BS_Store.getQuickStake(this.props.isSingle, this.props.cc).map(function(n) {
            return React.createElement(RightPanel.betSlips.quickBet.qbBtn, {
                key: n,
                clickFN: t,
                val: n
            });
        }), n;
        return this.props.hideMax || (n = React.createElement("a", {
            href: "javascript:void(0)",
            className: "float-right maxBet",
            onMouseOver: this._showMaxBetInfo.bind(this, !0),
            onMouseOut: this._showMaxBetInfo.bind(this, !1)
        }, l.BS_Maxbet)),
        React.createElement("div", {
            className: "quickBet"
        }, i, React.createElement("a", {
            href: "javascript:void(0)",
            className: "float-left edit",
            onClick: this._clearStake
        }, l.BS_Clear), n, React.createElement(RightPanel.ddl, {
            ref: "ddl"
        }, React.createElement("p", {
            className: "text1 ft-c-22"
        }, l.BS_Maxbet + ": ", React.createElement("span", {
            className: "bold ft-c-25"
        }, this.numberWithCommas(this.props.max) + " " + this.props.cc))), React.createElement("div", {
            className: "clearfix"
        }));
    },
    _clearStake: function() {
        this.props.clearFN();
    },
    _showMaxBetInfo: function(n) {
        n ? this.refs.ddl.show() : this.refs.ddl.hide();
    }
});
RightPanel.betSlips.quickBet.qbBtn = React.createClass({
    displayName: "qbBtn",
    mixins: [RightPanel.Utility.format],
    render: function() {
        var n = this.props.val;
        return React.createElement("button", {
            onClick: this._handleClick.bind(this, n)
        }, "+" + this.numberWithCommas(n).split(".")[0]);
    },
    _handleClick: function(n) {
        this.props.clickFN(parseFloat(n));
    }
});
RightPanel.betSlips.parlayPopUp = React.createClass({
    displayName: "parlayPopUp",
    getInitialState: function() {
        return this._getDataFromStore();
    },
    componentDidMount: function() {
        this.refs.scrollbar.update();
        PP_Store.addUpdateListener(this._onUpdate);
    },
    componentWillUnmount: function() {
        PP_Store.removeUpdateListener();
    },
    componentDidUpdate: function() {
        this.refs.scrollbar.update();
    },
    render: function() {
        var t = this.state.info
          , i = this.state.parlayPopUpExpandRowIndex
          , r = t[0]
          , n = 0
          , u = _.drop(t, 1).map(function(t) {
            var r = _.assign({
                isActived: i != null && n == i,
                idx: n
            }, t);
            return React.createElement(RightPanel.betSlips.parlayPopUp.collapseItem, {
                key: "ppp_" + n++,
                data: r
            });
        });
        return React.createElement("div", {
            className: "hasScroll"
        }, React.createElement(ScrollBar, {
            ref: "scrollbar",
            h: this.state.h,
            w: this.state.w,
            always: !1,
            offset: 0,
            top: 4,
            disable: this.state.disableScrollbar,
            ieMaxHeight: !0
        }, React.createElement("div", {
            className: "dropDownContainer"
        }, React.createElement("dl", null , React.createElement("dt", {
            className: "height-40 lht-40 uppercase"
        }, r.t, React.createElement("span", {
            className: "icon icon-removeIcon closeicon",
            onClick: this._closeFSB
        })), React.createElement("dd", {
            className: "fts-13"
        }, r.c)), React.createElement("ul", null , u))));
    },
    _getDataFromStore: function() {
        return PP_Store.getData();
    },
    _onUpdate: function() {
        this.setState(this._getDataFromStore());
    },
    _closeFSB: function() {
        Action.FullScreenBlock.hide();
    }
});
RightPanel.betSlips.parlayPopUp.collapseItem = React.createClass({
    displayName: "collapseItem",
    render: function() {
        var n = this.props.data, t = n.idx, i = [], r, u;
        if (t == 0)
            i.push(React.createElement("p", {
                className: "listtitle",
                key: "ppp_ci_" + t + "_0"
            }, n.c[0])),
            i.push(React.createElement("p", {
                className: "listtitle",
                key: "ppp_ci_" + t + "_1"
            }, n.c[1])),
            i.push(React.createElement("p", {
                className: "listtitle",
                key: "ppp_ci_" + t + "_2"
            }, n.c[2])),
            i.push(React.createElement("div", {
                key: "ppp_" + t + "_3#4",
                className: "egbox"
            }, React.createElement("p", null , n.c[3]), React.createElement("p", null , n.c[4]))),
            i.push(React.createElement("p", {
                className: "listtitle",
                key: "ppp_" + t + "_5"
            }, n.c[5]));
        else
            for (r = 0; r < n.c.length; r++)
                i.push(React.createElement("p", {
                    className: "listtitle",
                    key: "ppp_" + t + "_" + r
                }, n.c[r]));
        return n.isActived && (u = React.createElement("div", {
            className: "licontent fts-13"
        }, i)),
        React.createElement("li", null , React.createElement("div", {
            onClick: this._toggleCollapsed
        }, React.createElement("span", {
            className: "icon-aw " + (n.isActived ? "icon-ArrowUp" : "icon-ArrowDown")
        }), React.createElement("span", {
            className: "uppercase"
        }, n.t)), u);
    },
    _toggleCollapsed: function() {
        this.props.data.isActived ? Action.RightPanel.collapsedRow() : Action.RightPanel.expandRow(this.props.data.idx);
    }
});
RightPanel.ddl = React.createClass({
    displayName: "ddl",
    render: function() {
        return React.createElement("div", {
            className: "dropdown hidden",
            ref: "ddl"
        }, React.createElement("span", {
            className: "cick"
        }), this.props.children);
    },
    show: function() {
        $(this.refs.ddl.getDOMNode()).removeClass("hidden");
    },
    hide: function() {
        $(this.refs.ddl.getDOMNode()).addClass("hidden");
    }
});
RightPanel.infoddl = React.createClass({
    displayName: "infoddl",
    mixins: [RightPanel.Utility.format],
    render: function() {
        var n = this.props.data, c = n.cn, r = n.h, u = n.a, f, e = n.edt, t, i, o, s, h;
        return (!n.ip || n.isReceipt) && e != null && (f = React.createElement("p", {
            className: "datetime"
        }, this.formatEventDate(e))),
        t = n.hs,
        i = n.as,
        n.ip && !n.isReceipt && t != null && i != null && (o = React.createElement("p", {
            className: "datetime"
        }, l.LP_Inplay, React.createElement("span", {
            className: "text-orange"
        }, " (" + t + "-" + i + ")"))),
        r != null && u != null && (s = React.createElement("p", {
            className: "text1 ft-c-22"
        }, r, React.createElement("span", {
            className: "text-orange"
        }, " v "), u)),
        n.en != null && (h = React.createElement("p", {
            className: "text1 ft-c-22"
        }, n.en)),
        React.createElement(RightPanel.ddl, {
            ref: "ddl"
        }, React.createElement("p", {
            className: "dp-title bold"
        }, c), s, h, f, o, this.props.children);
    },
    show: function() {
        this.refs.ddl.show();
    },
    hide: function() {
        this.refs.ddl.hide();
    }
});
RightPanel.betSlips.loading = React.createClass({
    displayName: "loading",
    render: function() {
        return React.createElement("div", {
            className: "cover"
        }, React.createElement("div", {
            className: "fail-alertbar hascover"
        }, l.BS_Proccessing));
    }
});
RightPanel.myBet = React.createClass({
    displayName: "myBet",
    mixins: [RightPanel.Utility.scrollbarUpdate],
    getInitialState: function() {
        return this._getDataFromStore();
    },
    componentDidMount: function() {
        MB_Store.addUpdateListener(this._onUpdate);
        this.props.isPopUp && Action.RightPanel.resizeFrame();
    },
    componentDidUpdate: function() {
        this.props.isPopUp && Action.RightPanel.resizeFrame();
    },
    render: function() {
        var n = this.state.myBetData
          , t = this.props.updateScrollBarFN
          , i = {
            aul: n.aul,
            ipul: n.ipul,
            c: n.uc,
            extraData: this.state.extraData,
            updateScrollBarFN: t
        }
          , r = {
            data: n.sl,
            c: n.sc,
            extraData: this.state.extraData,
            updateScrollBarFN: t
        };
        return React.createElement("div", null , React.createElement(RightPanel.myBet.unsettleBet, {
            data: i
        }), React.createElement(RightPanel.myBet.settledBet, {
            data: r
        }));
    },
    _getDataFromStore: function() {
        return {
            myBetData: MB_Store.getData(),
            extraData: MB_Store.getExtraData()
        };
    },
    _onUpdate: function() {
        this.setState(this._getDataFromStore());
    }
});
RightPanel.myBet.unsettleBet = React.createClass({
    displayName: "unsettleBet",
    mixins: [RightPanel.Utility.scrollbarUpdate],
    getInitialState: function() {
        return {
            activeAllTab: !0
        };
    },
    componentDidUpdate: function() {
        this.props.data.updateScrollBarFN();
    },
    render: function() {
        var i = this.props.data, u = i.aul, f = i.ipul, e = this.state.activeAllTab, c, a, o, s, n, t, r, v, y, h;
        for (u.length == 0 && (c = React.createElement(RightPanel.myBet.emptyBetItem, {
            isSettled: !1,
            isInplay: !1
        })),
        f.length == 0 && (a = React.createElement(RightPanel.myBet.emptyBetItem, {
            isSettled: !1,
            isInplay: !0
        })),
        o = [],
        n = 0; n < u.length; n++)
            t = u[n],
            r = t.id,
            o.push(React.createElement(RightPanel.myBet.betItem, {
                last: n + 1 == u.length,
                key: r,
                data: t,
                showLargeInfo: t.id == i.extraData.showParlayInfo
            }));
        for (s = [],
        n = 0; n < f.length; n++) {
            if (t = f[n],
            t.c)
                return null ;
            r = t.id;
            s.push(React.createElement(RightPanel.myBet.betItem, {
                last: n + 1 == f.length,
                key: r,
                data: t,
                showLargeInfo: t.id == i.extraData.showParlayInfo
            }));
        }
        return o.length >= 20 && (v = React.createElement(RightPanel.myBet.viewMore, null )),
        s.length >= 20 && (y = React.createElement(RightPanel.myBet.viewMore, null )),
        h = i.extraData.isOpenUnsettled,
        React.createElement("div", {
            className: "titlebar unsettled"
        }, React.createElement("div", {
            className: "cr-pointer",
            onClick: this._toggleContent
        }, React.createElement("div", {
            className: "title uppercase"
        }, l.MyAcc_BetHistory_UnsettledBets), React.createElement("span", {
            className: "ballbox"
        }, React.createElement("span", {
            className: "circles-number bold"
        }, i.c)), React.createElement("span", {
            className: "icon " + (h ? "icon-ArrowUp" : "icon-ArrowDown")
        })), React.createElement("div", {
            ref: "content",
            className: h ? "" : "hidden"
        }, 
        // React.createElement("ul", {
        //     className: "submenutab tabs"
        // }
        // // , React.createElement("li", {
        // //     onClick: this._switchTab.bind(this, !0),
        // //     className: e ? "active" : ""
        // // }, l.MyBet_All)
        // // , 
        // // React.createElement("li", {
        // //     onClick: this._switchTab.bind(this, !1),
        // //     className: e ? "" : "active"
        // // }, l.MyBet_Inplay_Now)
        // ), 
        React.createElement("div", {
            className: "BetreceiptContent"
        }, React.createElement("div", {
            className: e ? "" : "hidden"
        }, c, o, v), React.createElement("div", {
            className: e ? "hidden" : ""
        }, a, s, y))));
    },
    _switchTab: function(n) {
        this.state.activeAllTab = n;
        this.setState(this.state);
    },
    _toggleContent: function() {
        var t = this.props.data.extraData.isOpenUnsettled
          , n = $(this.refs.content.getDOMNode());
        t ? n.slideUp(function() {
            Action.RightPanel.toggleUnsettled(!1);
        }) : n.slideDown(function() {
            Action.RightPanel.toggleUnsettled(!0);
        });
    }
});
RightPanel.myBet.infoddl = {};
RightPanel.myBet.infoddl.single = React.createClass({
    displayName: "single",
    mixins: [RightPanel.Utility.format],
    render: function() {
        var n = this.props.data
          , r = n.betId
          , u = n.pdt
          , t = n.en
          , i = {
            cn: n.cn,
            h: n.h,
            a: n.a,
            edt: n.edt
        };
        return t != null && (i.en = t),
        React.createElement(RightPanel.infoddl, {
            data: i,
            ref: "ddl"
        }, React.createElement("p", {
            className: "p-betID"
        }, l.BetNo, React.createElement("span", {
            className: "bold"
        }, " " + r)), React.createElement("p", {
            className: "p-placed"
        }, l.Wager_BetDate, React.createElement("span", {
            className: "bold"
        }, this.formatPlaceDate(u))));
    },
    show: function() {
        this.refs.ddl.show();
    },
    hide: function() {
        this.refs.ddl.hide();
    }
});
RightPanel.myBet.infoddl.parlay = React.createClass({
    displayName: "parlay",
    mixins: [RightPanel.Utility.format],
    render: function() {
        var n = this.props.data, e = n.cn, o = n.sls, t = n.betId, i = n.pdt, r = [], u, f;
        return _.forEach(o, function(n, t) {
            r.push(React.createElement(RightPanel.myBet.infoddl.parlay.content, {
                key: "info_" + t,
                data: n
            }));
        }),
        n.showLarge ? f = React.createElement("div", {
            className: "betSummary"
        }, React.createElement("span", {
            className: "iconbox removebtn",
            onClick: this.closeInfo
        }, React.createElement("a", {
            href: "javascript:void(0)",
            className: "icon icon-removeIcon"
        })), React.createElement("div", {
            className: "Summary-title uppercase"
        }, l.BS_Bet + " " + l.MyBet_Summary), React.createElement("div", {
            className: "Summary-subtitle uppercase"
        }, l.MyBet_Parlay), r, React.createElement("div", {
            className: "content"
        }, React.createElement("p", {
            className: "p-betID"
        }, l.BetNo, React.createElement("span", {
            className: "bold"
        }, " " + t)), React.createElement("p", {
            className: "p-placed"
        }, l.Wager_BetDate, React.createElement("span", {
            className: "bold"
        }, this.formatPlaceDate(i))))) : u = React.createElement("div", null , React.createElement("span", {
            className: "cick"
        }), React.createElement("p", {
            className: "dp-title bold"
        }, e), React.createElement("p", {
            className: "p-betID"
        }, l.BetNo, React.createElement("span", {
            className: "bold"
        }, " " + t)), React.createElement("p", {
            className: "p-placed"
        }, l.Wager_BetDate, React.createElement("span", {
            className: "bold"
        }, this.formatPlaceDate(i))), React.createElement("p", {
            className: "ft-txt text-orange"
        }, l.BS_ViewDetailInfo)),
        React.createElement("div", {
            className: "dropdown " + (n.showLarge ? "" : "hidden"),
            ref: "main"
        }, u, f);
    },
    show: function() {
        $(this.refs.main.getDOMNode()).removeClass("hidden");
    },
    hide: function() {
        $(this.refs.main.getDOMNode()).addClass("hidden");
    },
    closeInfo: function() {
        Action.RightPanel.toggleParlayInfo(null );
    }
});
RightPanel.myBet.infoddl.parlay.content = React.createClass({
    displayName: "content",
    mixins: [RightPanel.Utility.format, RightPanel.Utility.outright],
    render: function() {
        var n = this.props.data, i = n.bi, r = n.h, u = n.a, f = n.edt, t;
        return t = n.e && n.nm ? React.createElement("p", {
            className: "text1 ft-c-22"
        }, n.en) : React.createElement("p", {
            className: "text1 ft-c-22"
        }, r, React.createElement("span", {
            className: "text-orange"
        }, " v "), u),
        React.createElement("div", {
            className: "content"
        }, React.createElement("p", {
            className: "dp-title bold"
        }, i), t, React.createElement("p", {
            className: "text1 ft-c-22"
        }, n.t + (n.ip ? " " + (n.s ? n.s : "") : "")), React.createElement("p", {
            className: "text1 ft-c-25"
        }, React.createElement("span", {
            className: "name1"
        }, n.sn + " "), React.createElement("span", {
            className: "bold hh-b"
        }, n.hd), React.createElement("span", {
            className: "at"
        }, " @ "), React.createElement("span", {
            className: "bold hh-b",
            ref: "odds"
        }, this.formatTwoDecimal(n.od))), React.createElement("p", {
            className: "datetime"
        }, this.formatEventDate(f)));
    }
});
RightPanel.myBet.betItem = React.createClass({
    displayName: "betItem",
    mixins: [RightPanel.Utility.outright],
    render: function() {
        var n = this.props.data, r = "betslip-row", u, i, f, e, t, o, s, h;
        return r += n.nr ? " error" : n.nc ? " cancelPanel" : " success",
        this.props.last && (r += " reomveborder"),
        u = n.t,
        n.c || (i = n.l[0],
        u += i.ip && i.s ? " " + i.s : ""),
        t = this.props.isSettled,
        e = {
            nr: n.nr,
            nc: n.nc,
            isSettled: t,
            wr: n.wr,
            st: n.st,
            d: n.d
        },
        (t || (n.wr != null && n.wr != "")) && (f = React.createElement(RightPanel.myBet.betItem.status, {
            data: e
        })),
        o = n.c ? React.createElement(RightPanel.myBet.infoddl.parlay, {
            data: this._getInfoProps(n),
            ref: "info"
        }) : React.createElement(RightPanel.myBet.infoddl.single, {
            data: this._getInfoProps(n),
            ref: "info"
        }),
        !t && n.nr && (s = React.createElement("a", {
            href: "javascript:void(0)",
            onClick: this._refreshMyBet,
            className: "float-right icon icon-RefreshIcon"
        })),
        h = n.l.map(function(i) {
            return React.createElement(RightPanel.myBet.betItem.betData, {
                key: "mb_" + n.id + "_" + i.eid,
                data: {
                    sl: i,
                    c: n.c,
                    t: n.c ? i.t : n.t,
                    set: t
                }
            });
        }),
        React.createElement("div", {
            id: "tt_" + n.id,
            className: r,
            ref: "betEntry"
        }, o, s, React.createElement("span", {
            className: "iconbox",
            onClick: this._extendParlayInfo,
            onMouseOver: this._showInfo.bind(this, !0),
            onMouseOut: this._showInfo.bind(this, !1)
        }, React.createElement("a", {
            href: "javascript:void(0)",
            className: "icon icon-i-s"
        })), React.createElement("span", {
            className: "bettitle"
        }, u), h, React.createElement("div", {
            className: "pd-b-6 pd-l-10 pd-r-10 over-hidden" + (n.l.length > 1 ? " pd-t-10" : "")
        }, React.createElement(RightPanel.betSlips.stake.confirmBet, {
            isReceipt: !0,
            st: n.s,
            towin: n.nc ? "--" : t ? n.tf : n.ep,
            isSettled: t ? !0 : !1
        })), React.createElement("div", {
            className: "clearfix"
        }), f);
    },
    _refreshMyBet: function() {
        Action.RightPanel.refreshMyBet();
    },
    _getInfoProps: function(n) {
        if (n.c)
            return {
                cn: n.t,
                sls: n.l,
                betId: n.id,
                pdt: n.pdt,
                showLarge: this.props.showLargeInfo
            };
        var t = n.l[0]
          , i = {
            cn: n.cn,
            edt: t.edt,
            betId: n.id,
            pdt: n.pdt
        };
        return t.e && t.nm ? i.en = t.en : (i.h = t.h,
        i.a = t.a),
        i;
    },
    _showInfo: function(n) {
        var t = this.props.data;
        t.c && this.props.showLargeInfo || (n ? this.refs.info.show() : this.refs.info.hide());
    },
    _extendParlayInfo: function() {
        var n = this.props.data;
        n.c && Action.RightPanel.toggleParlayInfo(n.id);
    }
});
RightPanel.myBet.betItem.betData = React.createClass({
    displayName: "betData",
    mixins: [RightPanel.Utility.format, RightPanel.Utility.outright, RightPanel.Utility.link],
    render: function() {
        var t = this.props.data, n = t.sl, e = t.c, o = t.t, i, r, u, f;
        return n.e && n.nm ? r = React.createElement("p", null , n.m) : i = React.createElement("p", {
            className: "cr-pointer",
            onClick: this._linkToMoreBet
        }, n.h + " ", React.createElement("span", null , " v "), n.a),
        e && (u = React.createElement("p", null , n.t),
        f = React.createElement("span", {
            className: "ft-line"
        })),
        React.createElement("div", {
            className: "db-group"
        }, u, React.createElement("p", {
            className: "big-txt"
        }, React.createElement("span", {
            className: "name1"
        }, n.sn + " "), React.createElement("span", {
            className: "bold hh-b"
        }, n.hd), React.createElement("span", {
            className: "at"
        }, " @ "), React.createElement("span", {
            className: "bold hh-b",
            ref: "odds"
        }, this.formatTwoDecimal(n.od))), i, r, f);
    },
    _linkToMoreBet: function() {
        if (!this.props.data.set) {
            var n = this.props.data.sl
              , t = this._getMorebetLink(n.eid, n.vt, n.en);
            Action.LoadSite(t);
        }
    }
});
RightPanel.myBet.betItem.status = React.createClass({
    displayName: "status",
    render: function() {
        var n = this.props.data, f = n.isSettled, i = n.wr, r = "danger-text" + (n.nr ? " text-red" : n.nc ? " text-black" : " text-green"), u, t;
        return txtClass = n.d ? "text-red" : "text-black",
        u = f ? l[n.st] : n.nr ? l.BetStatus_PENDING : l.BetStatus_CONFIRM,
        t = [],
        (i != null && i != "") && (t.push(React.createElement("span", {
            key: "mb_st_i",
            className: "hidden icon icon-l-more dp-alert " + r,
            ref: "wr",
            onMouseOver: this._toggleWagerReason.bind(this, !0),
            onMouseOut: this._toggleWagerReason.bind(this, !1)
        })),
        t.push(React.createElement("span", {
            key: "mb_st_t",
            className: "tooltip " + txtClass
        }, i))),
        React.createElement("p", {
            className: r
        }, u, t);
    },
    _toggleWagerReason: function(n) {
        n ? $(this.refs.wr.getDOMNode()).removeClass("hidden") : $(this.refs.wr.getDOMNode()).addClass("hidden");
    }
});
RightPanel.myBet.settledBet = React.createClass({
    displayName: "settledBet",
    mixins: [RightPanel.Utility.scrollbarUpdate],
    render: function() {
        var n = this.props.data, t = n.data, r, i, u, f;
        return t.length == 0 && (r = React.createElement(RightPanel.myBet.emptyBetItem, {
            isSettled: !0
        })),
        i = n.extraData.isOpenSettled,
        u = t.map(function(t) {
            var i = t.id;
            return React.createElement(RightPanel.myBet.betItem, {
                key: i,
                data: t,
                isSettled: !0,
                showLargeInfo: t.id == n.extraData.showParlayInfo
            });
        }),
        t.length > 19 && (f = React.createElement(RightPanel.myBet.viewMore, {
            set: !0
        })),
        React.createElement("div", {
            className: "titlebar unsettled"
        }, React.createElement("div", {
            className: "cr-pointer",
            onClick: this._toggleContent
        }, React.createElement("div", {
            className: "title uppercase"
        }, l.MyAcc_BetHistory_SettledBets, React.createElement("br", null ), React.createElement("span", {
            className: "smallfont"
        }, l.MyBet_Last24HR)), React.createElement("span", {
            className: "ballbox"
        }, React.createElement("span", {
            className: "circles-number bold"
        }, n.c)), React.createElement("span", {
            className: "icon " + (i ? "icon-ArrowUp" : "icon-ArrowDown")
        })), React.createElement("div", {
            ref: "content",
            className: "BetreceiptContent" + (i ? "" : " hidden")
        }, r, u, f));
    },
    _toggleContent: function() {
        var t = this.props.data.extraData.isOpenSettled
          , n = $(this.refs.content.getDOMNode());
        t ? n.slideUp(function() {
            Action.RightPanel.toggleSettled(!1);
        }) : n.slideDown(function() {
            Action.RightPanel.toggleSettled(!0);
        });
    }
});
RightPanel.myBet.emptyBetItem = React.createClass({
    displayName: "emptyBetItem",
    render: function() {
        return React.createElement("div", {
            className: "betslipNoContent"
        }, this.props.isSettled ? l.MyBet_No_Settled_Bets : this.props.isInplay ? l.MyBet_No_Inplay_Unsettled_Bets : l.MyBet_No_Unsettled_Bets);
    }
});

//更多投注
RightPanel.myBet.viewMore = React.createClass({
    displayName: "viewMore",
    mixins: [RightPanel.Utility.link],
    render: function() {
        var n = this.props.set ? l.MyBet_ViewAllSettledBets : l.MyBet_ViewAllUnsettledBets;
        //console.log(n)
        return React.createElement("div", {
            className: "viewmore",
            onClick: this._redirectStatementPage
        }, n);
    },
    _redirectStatementPage: function() {
        var n = this.props.set
          , t = n ? this._getSettledLink() : this._getUnSettledLink();
          console.log(t)
        Action.PopupNewWin({
            id: "account",
            height: 610,
            width: 1020,
            resizable: "yes",
            scroll: "yes"
        }, t);
    }
});
RightPanel.banner = React.createClass({
    displayName: "banner",
    mixins: [RightPanel.Utility.scrollbarUpdate],
    getInitialState: function() {
        return this._getDataFromStore();
    },
    componentDidMount: function() {
        RB_Store.addUpdateListener(this._onUpdate);
    },
    render: function() {
        var n = this.state;
        return React.createElement("div", {
            className: n.height <= 0 ? "" : "bannerbox"
        }, React.createElement("div", {
            className: "ad"
        }, React.createElement("iframe", {
            src: n.url,
            height: n.height,
            width: "100%",
            scrolling: "no",
            frameBorder: "0",
            allowTransparency: "true"
        })));
    },
    _getDataFromStore: function() {
        return RB_Store.getData();
    },
    _onUpdate: function() {
        this.setState(this._getDataFromStore());
    }
});
var FSBRoot = React.render(React.createElement(FullScreenBlock, null ), document.getElementById("fullScreenBlock"))
  , HomeRoot = React.render(React.createElement(Homepage, null ), document.getElementById("HP"))
  , AMRoot = React.render(React.createElement(AllMarketPage, null ), document.getElementById("AMP"))
  , RPRoot = React.render(React.createElement(RightPanel, null ), document.getElementById("right-panel"));
LPM.render("LeftPanel", document.getElementById("left-panel"));
