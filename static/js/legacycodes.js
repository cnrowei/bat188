//#region ClockJS
var ClockJS = { // this is a Utility of Clock
    userTZOffset: null,
    serverDate: new Date(),
    tmpDt: new Date(),
    serverClientGap: 2,
    _onSecondChanged: [],
    beforeChangeTime: new Date(),

    //#region initTimeClock
    initTimeClock: function (tzOffset, svrDate, utcDate) {
        var tzNum = Number(tzOffset);
        if (tzOffset && !isNaN(tzNum)) { //For after Login (Before Login, tzOffset is null)
            ClockJS.userTZOffset = tzNum;
        }
        if (ClockJS.userTZOffset != null) { //For after Login
            ClockJS.serverDate = new Date(svrDate);
        } else {
            ClockJS.serverDate = new Date(utcDate);
            var clientTZoffset = -(ClockJS.tmpDt.getTimezoneOffset());
            ClockJS.serverDate.setMinutes(ClockJS.serverDate.getMinutes() + clientTZoffset);
        }
        ClockJS.tmpDt = new Date(ClockJS.serverDate); // QAT-3611 STAR - Remove GetCurrentDateStrRefresh
        ClockJS.serverClientGap = (new Date()) - ClockJS.serverDate;
        ClockJS.updateClock();
    },
    //#endregion

    //#region secondElapsed
    secondElapsed: function (hanlder) {
        if (hanlder && $.isFunction(hanlder)) {
            ClockJS._onSecondChanged.push(hanlder);
        }
    },
    //#endregion

    //#region updateClock
    updateClock: function () {
        var currentTime = new Date();
        var userChangeGap = currentTime.getTimezoneOffset() - ClockJS.beforeChangeTime.getTimezoneOffset();
        if ((userChangeGap > 14) || (userChangeGap < -14)) {
            window.location.reload();
            return;
        }
        // window.status = "ChangeGap=" + userChangeGap + ",currentTime=" + currentTime + ",beforeChangeTime=" + ClockJS.beforeChangeTime;

        //When the gap become big or less
        var gap = currentTime - ClockJS.serverDate;
        if (gap > (60000 + ClockJS.serverClientGap) || gap < (ClockJS.serverClientGap - 60000)) {
            window.location.reload();
            return;
        }

        var clientDateTime = new Date(currentTime); //ClockJS.serverDate;
        var clientTZoffset = -currentTime.getTimezoneOffset(); // eg: --480 -> +480

        for (var i = 0; i < ClockJS._onSecondChanged.length; i++) {
            if (ClockJS._onSecondChanged) ClockJS._onSecondChanged[i](currentTime);
        }

        var timer = setTimeout("ClockJS.updateClock()", 1000);
        var ckTz = utility.cookie.read("timeZone");

        //--------------------
        // referece: http://www.onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/
        var jan1 = new Date(currentTime.getFullYear(), 0, 1, 0, 0, 0, 0); // jan 1st
        var june1 = new Date(currentTime.getFullYear(), 6, 1, 0, 0, 0, 0); // june 1st

        var temp = jan1.toGMTString();
        var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
        temp = june1.toGMTString();
        var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));

        var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60); // eg: 8, this will be the time zone you see in your machine
        var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60); // eg: 9, this will be the time zone after add 1 hour for daylight saving time

        var dst = "0"; // daylight savings time, if 1 means user has checked "Automatically adjust clock for daylight saving changes"

        if (std_time_offset != daylight_time_offset) { // positive is southern, negative is northern hemisphere
            var hemisphere = std_time_offset - daylight_time_offset;
            if (hemisphere >= 0) {
                std_time_offset = daylight_time_offset;
                dst = "1"; // daylight savings time is observed
            }
        }
        //--------------------

        //Before login
        if (clientTZoffset != ckTz) {
            utility.cookie.write("timeZone", clientTZoffset);
            utility.cookie.write("dst", dst);

            $("#tzgmt").html("(GMT " + ClockJS.getTimeZoneString(std_time_offset * 60) + ")");
        }

        //Date
        if (ClockJS.tmpDt.getDate() != clientDateTime.getDate()) {
            ClockJS.tmpDt = clientDateTime;
//            utility.service("HomePageService", "GetCurrentDateStrRefresh", null, "GET", function (data) {
//                $(".todayDateClock").html(data);
//            });
        }

        //Time
        $("#lbClock").html(ClockJS.padNumber(clientDateTime.getHours()) + ":" + ClockJS.padNumber(clientDateTime.getMinutes()) + ":" + ClockJS.padNumber(clientDateTime.getSeconds()));
        ClockJS.serverDate.setSeconds(ClockJS.serverDate.getSeconds() + 1);
    },
    //#endregion

    //#region padNumber
    padNumber: function (num) {
        return num < 10 ? "0" + num : num;
    },
    //#endregion

    //#region getTimeZoneString
    getTimeZoneString: function (time_offset) {
            var hours = parseInt(time_offset / 60);
            var minus = Math.abs(time_offset % 60);
            var sign = (hours > 0 ? "+" : (hours < 0 ? "-" : ""));

            var absHours = Math.abs(Math.floor(hours));
            if (absHours < 10) {
                absHours = "0" + absHours;
            }
            if (Math.abs(minus) < 10) {
                minus = "0" + minus;
            }
            return sign + absHours + ":" + minus;
        }
        //#endregion
};
//#endregion


//#region utility
var utility = {
    securetimeout: 10000,
    templateCache: new Object(),
    stopRequest: false,
    $error: null,
    $lostConn: null

    //#region showError
    ,
    showError: function (message) {
            // utility.stopRequest = true;
            if (utility.$error == null) {
                utility.$error = $("<a href='javascript:void(0)' id='errMsg'>" + (new Date()) + ":Error Occur:Please refresh page</a>").click(function () {
                    window.location.href = window.location.href;
                });
                window.status = new Date();
                //            $('body').append(utility.$error);
            }
            //        utility.$error.attr("title", message);
            //        alert(message);
        }
        //#endregion

    //#region getValueFromUrl
    ,
    getValueFromUrl: function (name) {
        if (window.location.search) {
            var querys = [];
            var nameLowerCase = name.toLowerCase();
            $.each(window.location.search.substring(1).split('&'), function () {
                $.each(this.split('='), function () {
                    querys.push(this);
                })
            });
            for (var i = 0; i < querys.length; i += 2) {
                if (querys[i].toLowerCase() == nameLowerCase) {
                    return querys[i + 1];
                }
            }
        }
        return null;
    },
    //#endregion

    //#region service
    service: function (serviceName, methodName, parameter, httpMethod, callBack, errorCallback, includeLanguage) {
        if (utility.stopRequest) {
            return;
        }
        var postData = this.objToPostString(parameter);
        var serviceUrl = global.root + "Service/" + serviceName + "?" + methodName;
        $.ajax({
            url: serviceUrl,
            cache: false,
            data: postData,
            type: httpMethod,
            success: function (response) {
                utility.succeededAction(response, callBack, includeLanguage);
            },
            error: function (request) {
                utility.failedAction(request, errorCallback);
            }
        });
    },
    //#endregion

    //#region objToPostString
    objToPostString: function (obj, preFix) {
        if (!preFix) {
            preFix = "";
        }
        var builder = [];
        for (var name in obj) {
            if (obj[name] == undefined || obj[name] == null) {} else if (obj[name] instanceof Array) {
                var arr = obj[name];
                for (var i = 0; i < arr.length; i++) {
                    builder.push(preFix + name + "=" + arr[i]);
                }
            } else if (typeof (obj[name]) == "object") {
                builder.push(this.objToPostString(obj[name], name + "."));
            } else {
                builder.push(preFix + name + "=" + encodeURIComponent(obj[name]));
            }
        }
        return builder.join("&");
    },
    //#endregion

    //#region isCookieEnabled
    isCookieEnabled: function () {
        var cookieEnabled = ((navigator.cookieEnabled) ? true : false);
        return cookieEnabled;
    },
    //#endregion

    cookie: {
        //#region write
        write: function (c_name, value, expiredays) {
            if (!expiredays) {
                expiredays = 7;
            }
            $.cookie(c_name, value, {
                expires: expiredays,
                path: '/'
            });
        },
        //#endregion

        //#region read
        read: function (c_name) {
            return $.cookie(c_name);
        },
        //#endregion

        //#region erase
        erase: function (c_name) {
                $.cookie(c_name, null);
            }
            //#endregion
    },

    dialogIndex: 0

    //#region popupUrl
    ,
    popupUrl: function (url, id, w, h, scrolling, closeOnEsc, onClosed) {
            if (!url || url.indexOf('javascript:void') >= 0) {
                return false;
            }
            if (!w || w == -1) {
                w = 800;
            }
            if (!h || h == -1) {
                h = 550;
            }
            if (!scrolling) {
                scrolling = "no";
            }
            if (id) {
                var iframe = $("#" + id);
                if (iframe.length > 0) {
                    // this dialog already existed
                    var dlg = iframe.parent().dialog('destroy');
                    dlg.remove();
                }
            } else {
                id = "dialog" + (utility.dialogIndex++);
            }

            $("<div/>").dialog({
                autoOpen: false,
                modal: true,
                height: h,
                width: w,
                closeOnEscape: (closeOnEsc == null ? true : closeOnEsc),
                resizable: false,
                close: function (event, ui) {
                    if (onClosed && $.isFunction(onClosed)) onClosed(event, ui);
                }
            }).html('<iframe id="' + id + '" width="100%" height="100%" marginWidth="0" marginHeight="0" frameBorder="0" scrolling="' + scrolling + '" />').dialog("open");
            $("#" + id).attr("src", url);
        }
        //#endregion

    //#region haveClass
    ,
    haveClass: function (array, className) {
            for (var i = 0; i < array.length; i++) {
                if (!$(array[i]).hasClass(className)) {
                    return false;
                }
            }
            return true;
        }
        //#endregion

    //#region remove
    ,
    remove: function (array, removeObj) {
            var arr = [];
            if (array) {
                for (var i = 0; i < array.length; i++) {
                    var value = array[i];
                    if (value && removeObj != value) {
                        arr.push(value);
                    }
                }
            }
            return arr;
        }
        //#endregion

    //#region parseToSizeInfo
    ,
    parseToSizeInfo: function (css) {
        var classvalues = css.split(' ');
        var id, w = -1,
            h = -1,
            s;
        for (var i = 0; i < classvalues.length; i++) {
            switch (String(classvalues[i]).toLowerCase().charAt(0)) {
                case "w":
                    w = parseInt(String(classvalues[i]).substr(1));
                    break;
                case "h":
                    h = parseInt(String(classvalues[i]).substr(1));
                    break;
                case "i":
                    id = String(classvalues[i]).substr(1);
                    break;
                case "s":
                    s = String(classvalues[i]).substr(1);
                    break;
                case "r":
                    r = String(classvalues[i]).substr(1);
                    break; // values in "yes" or "no"
            }
        }
        if (typeof (s) == 'undefined' || s.toLowerCase() != "no") s = 'yes';
        if (typeof (r) == 'undefined' || r.toLowerCase() != "yes") r = 'no';
        if (isNaN(w) || isNaN(h)) {
            Control.Dialog.showAlert(global.tLogin, "Error:" + css, function () {});
        }
        return {
            'id': id,
            'width': w,
            'height': h,
            'scroll': s,
            resizable: r
        };
    },
    //#endregion

    //#region disableLinks
    disableLinks: function (selector) {
        $(selector).fadeTo(2000, .3).addClass("disabled_link").removeClass("popup-new").removeAttr("href").unbind("click");
    },
    //#endregion

    //#region popupUrlWin
    popupUrlWin: function (url, info, name) {
        var x = 0,
            y = 0,
            w = 800,
            h = 600; // default value: width=800, height=600
        if (info.width != -1) w = info.width;
        if (info.height != -1) h = info.height;
        x = (screen.width - w) / 2;
        y = (screen.height - h) / 2;
        var features = "resizable=" + info.resizable + ", scrollbars=" + info.scroll + ", left=" + x + ", top=" + y + ", width=" + w + ", height=" + h;

        var win = window.open(url, name, features);
        //Fix IE pop-up 2 window at the same time
        if (win) {
            win.focus();
        };
    },
    //#endregion

    //#region popupNewWin
    popupNewWin: function (event, obj, name, isStop) {
        var info = utility.parseToSizeInfo(obj.className);

        // just give examples: Main -> popup profile -> if the user click on What's this.. should popup
        // what if popup the same windows ? Hence, if (!name) { name = "188BET"; }
        if (name == "_blank") {
            name = "188BET";
        }

        // to prevent multiple same popup window. only 1 popup window is allowed
        if (!name) {
            name = "188BET";
        }

        if (info && info.id) {
            name = info.id;
        }

        utility.popupUrlWin(obj.href, info, name);

        if (isStop && isStop == true) return;

        event.stopPropagation();
        event.preventDefault();
    },
    //#endregion

    //#region ttip
    ttip: function (name) {
        $(name).tt({
            showEvent: 'mouseover',
            hideEvent: 'mouseout',
            vAlign: "above",
            align: "flushLeft",
            ttClass: 'tooltip',
            distanceX: 0,
            distanceY: 0,
            visibleOnScroll: true
        });
    },
    //#endregion




    //#region setdomain
    setdomain: function () {
        // document.domain = location.hostname.substr(location.hostname.indexOf('.') + 1);
    },
    //#endregion

    //#region setdomain
    setframeHeight: function () {
        if (doIframe)
            doIframe();
        return;
    },
    //#endregion

    //#region 
    setInplayPage: function (isInplay) {
        var contentheight = $(window).height() - $('#header').height() - $('#announcement-box').height() - 10;
        if (isInplay) {
            $('#sbkFrame').attr('height', contentheight);
            if (!$('body').hasClass('in-play'))
                $('body').addClass('in-play');
            $('#footer').hide();
        } else {
            utility.setframeHeight();
            $('body').removeClass('in-play');
            $('#footer').show();
        }
        return;
    },
    //#endregion

    //#region MobilePromptMsg
    MobilePromptMsg: function () {
            if (!/home|sports|casino/i.test(location.pathname) && (location.pathname != "/" + global.lan + "/" && location.pathname != "/" + global.lan)) return;
        }
        //#endregion
};
//#endregion



//#region jQuery.cookie
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
//#endregion
