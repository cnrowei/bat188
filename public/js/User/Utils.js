/// <reference path="../../Lib/Jquery/jquery-1.9.1-vsdoc.js" />

//jquery-jsonp
(function(e,b){function d(){}function t(C){c=[C]}function m(C){f.insertBefore(C,f.firstChild)}function l(E,C,D){return E&&E.apply(C.context||C,D)}function k(C){return/\?/.test(C)?"&":"?"}var n="async",s="charset",q="",A="error",r="_jqjsp",w="on",o=w+"click",p=w+A,a=w+"load",i=w+"readystatechange",z="removeChild",g="<script/>",v="success",y="timeout",x=e.browser,f=e("head")[0]||document.documentElement,u={},j=0,c,h={callback:r,url:location.href};function B(C){C=e.extend({},h,C);var Q=C.complete,E=C.dataFilter,M=C.callbackParameter,R=C.callback,G=C.cache,J=C.pageCache,I=C.charset,D=C.url,L=C.data,P=C.timeout,O,K=0,H=d;C.abort=function(){!K++&&H()};if(l(C.beforeSend,C,[C])===false||K){return C}D=D||q;L=L?((typeof L)=="string"?L:e.param(L,C.traditional)):q;D+=L?(k(D)+L):q;M&&(D+=k(D)+encodeURIComponent(M)+"=?");!G&&!J&&(D+=k(D)+"_"+(new Date()).getTime()+"=");D=D.replace(/=\?(&|$)/,"="+R+"$1");function N(S){!K++&&b(function(){H();J&&(u[D]={s:[S]});E&&(S=E.apply(C,[S]));l(C.success,C,[S,v]);l(Q,C,[C,v])},0)}function F(S){!K++&&b(function(){H();J&&S!=y&&(u[D]=S);l(C.error,C,[C,S]);l(Q,C,[C,S])},0)}J&&(O=u[D])?(O.s?N(O.s[0]):F(O)):b(function(T,S,U){if(!K){U=P>0&&b(function(){F(y)},P);H=function(){U&&clearTimeout(U);T[i]=T[o]=T[a]=T[p]=null;f[z](T);S&&f[z](S)};window[R]=t;T=e(g)[0];T.id=r+j++;if(I){T[s]=I}function V(W){(T[o]||d)();W=c;c=undefined;W?N(W[0]):F(A)}if(x.msie){T.event=o;T.htmlFor=T.id;T[i]=function(){/loaded|complete/.test(T.readyState)&&V()}}else{T[p]=T[a]=V;x.opera?((S=e(g)[0]).text="jQuery('#"+T.id+"')[0]."+p+"()"):T[n]=n}T.src=D;m(T);S&&m(S)}},0);return C}B.setup=function(C){e.extend(h,C)};e.jsonp=B})(jQuery,setTimeout);
//var MSG_ATTR = "title";
var userUtils = {
    //#region commented
    //GCR-949
    //    // assume: id of div of msg: err-msg
    //    errorBoxId: "#err-msg", formId: "#MainForm",

    //    isProcessing: false, isReceived: false, sslTimer: 0, validOthers: true, errorList: [], validator: null,
    //    extendForm: function(validator) { userUtils.validator = validator; },
    //    setValidOthers: function(valid) { if (userUtils.validOthers) { userUtils.validOthers = valid; } },
    //    showValidOthers: function(iconId, valid) {
    //        userUtils.showOrHide($("#" + iconId), valid);
    //        userUtils.setValidOthers(valid);
    //        userUtils.errorList[iconId] = valid;

    //        // userUtils.updateErrorBox();

    //    },
    //    isValidOthers: function() {
    //        for (var key in userUtils.errorList) {
    //            if (!userUtils.errorList[key]) {
    //                return false;
    //            }
    //        }
    //        return true;
    //    },
    //    showOrHide: function(obj, valid) {
    //        if (valid) { obj.hide(); } else { obj.show(); }
    //    },
    //    clearErrorBox: function() {
    //        $("#err-box").hide();
    //    },
    //    showErrorBox: function(msg) {
    //        $("#err-msg").html(msg);
    //        $("#err-box").show();
    //    },
    //    updateErrorBox: function(msg) {
    //        if (!msg) { msg = OtherMessages.CompleteFieldsMsg; }
    //        if ((!userUtils.validator || userUtils.validator.numberOfInvalids() == 0) &&
    //                userUtils.isValidOthers()) {
    //            return userUtils.clearErrorBox();
    //        }
    //        return userUtils.showErrorBox(msg);
    //    },

    //    addCloseHandler: function(closeBtnId, windowId) {
    //        userUtils.addLinkHandler(closeBtnId, windowId, '', '');
    //    },

    //    addLinkHandler: function(objId, windowId, status, url) {
    //        // register-success page
    //        $("#" + objId).click(function() {
    //            if (status == 'success') {
    //                var pWin = (window.parent ? window.parent : window.opener);
    //                if (pWin) {
    //                    if (url) {
    //                        // navigate to main site (with or without deposit popup)
    //                        pWin.location.href = url;
    //                    } else {
    //                        pWin.document.reload();
    //                        if (windowId == 'depLink') {
    //                            // popup deposit link
    //                            $("#depLink").trigger('click');
    //                        }
    //                    }
    //                }
    //            } else {
    //                var dlg = userUtils.getDialog(windowId);
    //                if (dlg) {
    //                    dlg.dialog("close");
    //                }
    //            }
    //            return false;
    //        });
    //    },
    //    linkTo: function(windowId, pageUrl, width, height) {
    //        var pWin = (window.parent ? window.parent : window.opener);
    //        if (pWin && pWin.utility) {
    //            pWin.utility.popupUrl("/" + pWin.global.lan + pageUrl, windowId, width, height);
    //        } else {
    //            window.location.href = "/en-gb" + pageUrl;
    //        }
    //    },
    //    service: function(serviceName, methodName, parameter, httpMethod, callBack, maskId) {
    //        var postData = this.objToPostString(parameter);
    //        var serviceUrl = "../Service/" + serviceName + "?" + methodName;
    //        userUtils.isProcessing = true;
    //        if (maskId) {  
    //            // loading bar, here           
    //            $(maskId).loadingMask(); 
    //            $(maskId).loadingMask("show"); 
    //        }
    //        $.ajax({
    //            url: serviceUrl
    //            , cache: false
    //            , data: postData
    //            , type: httpMethod
    //            , success: function(response) {
    //                userUtils.succeededAction(response,callBack, maskId);
    //            }
    //            , error: function(response) {
    //                userUtils.failedAction(response,callBack, maskId);
    //            }
    //        });
    //    },
    //    
    //    transferservice: function(serviceName, methodName, parameter, httpMethod, callBack, maskId) {
    //        var postData = this.objToPostString(parameter);
    //        var serviceUrl = global.root + "Service/" + serviceName + "?" + methodName;
    //        userUtils.isProcessing = true;
    //        if (maskId) {  
    //            // loading bar, here           
    //            $(maskId).loadingMask(); 
    //            $(maskId).loadingMask("show"); 
    //        }
    //        $.ajax({
    //            url: serviceUrl
    //            , cache: false
    //            , data: postData
    //            , type: httpMethod
    //            , success: function(response) {
    //                userUtils.succeededAction(response,callBack, maskId);
    //            }
    //            , error: function(response) {
    //                userUtils.failedAction(response,callBack, maskId);
    //            }
    //        });
    //    },
    //    secureservice: function(serviceName, methodName, parameter, httpMethod, callBack, maskId) {
    //        var postData = this.objToPostString(parameter);
    //        var serviceUrl = uv.sec + "Service/" + serviceName + "?" + methodName + "G" ;
    //        userUtils.isReceived = false;
    //        userUtils.service("UserService", "SetSecureLog", { MemberCode: $("#txtUserName").val(), MethodName: methodName , Message: "sent request to SSL server. "}, "POST");
    //        userUtils.sslTimer = new Date().getTime();
    //        if (maskId) {  
    //            // loading bar, here
    //            $(maskId).loadingMask(); 
    //            $(maskId).loadingMask("show"); 
    //        }

    //        $.jsonp({
    //            url: serviceUrl,
    //            data: postData,
    //            callback: callBack,
    //            timeout: 10000,
    //            success: function(json) {
    //                userUtils.succeededAction(response,callBack, maskId);
    //            },
    //            error: function(d, msg) {
    //                if (!userUtils.isReceived) {
    //                    userUtils.isReceived = true;
    //                    userUtils.service(serviceName, methodName, parameter, httpMethod, callBack, maskId);
    //                    userUtils.sslTimer = new Date().getTime() - userUtils.sslTimer;
    //                    userUtils.service("UserService", "SetSecureLog", { MemberCode: $("#txtUserName").val(), MethodName: ("SSLTimeOut_" + methodName  + "(cost " + userUtils.sslTimer + "ms)")}, "POST");
    //                }
    //            }
    //        });

    //    },

    //    suceedJoinUs: function(result)
    //    {
    //        if (userUtils.isReceived) {
    //            userUtils.service("UserService", "SetSecureLog", { MemberCode: $("#txtUserName").val(), MethodName: "JoinUs", Message: "Received Data Info after Timeout!", ServerCode: data.srvc }, "POST");
    //            userUtils.isReceived = false;
    //            return;
    //        }
    //        userUtils.isReceived = true;
    //        if (result.Code.split) {
    //            // check multi-fields
    //            var errorList = result.Code.split(',');
    //            if (errorList.length == 1 && errorList[0] == ErrorCodes.GeneralError) {
    //                // General Error
    //                userUtils.showErrorBox(OtherMessages.GeneralError);
    //            } else {
    //                // Multi-error Handling
    //                for (var idx in errorList) {
    //                    updateFields(parseInt(errorList[idx]));
    //                }
    //                $("#" + Submit_Form).valid();
    //                userUtils.showErrorBox(OtherMessages.CompleteFieldsMsg);
    //            }
    //        } else {
    //            updateFields(result.Code, result.Url);
    //            userUtils.showErrorBox(result.Msg);
    //        }

    //        $("#btnSubmit").attr("disabled", false);
    //        refreshCaptcha();
    //        userUtils.isProcessing = false;
    //        $(".registration").loadingMask("hide");
    //    },

    //    succeededAction : function(response, callBack, maskId )
    //    {
    //        var data;
    //        var parsed = false;
    //        try {
    //            if (response != "") {
    //                eval("data =" + response);
    //                parsed = true;
    //            }
    //        }
    //        catch (e) {
    //            alert("parse error: " + response);
    //        }
    //        if (parsed) {
    //            if (data && data.error) {
    //                userUtils.alert(data.error);
    //            }
    //            else {
    //                if (callBack) callBack(data);
    //            }
    //        }
    //        if (maskId) {
    //            // remove loading bar
    //            $(maskId).loadingMask("hide"); 
    //        }
    //        userUtils.isProcessing = false;
    //        $("#btnSubmit").attr("disabled", false);
    //        data = null;
    //        response = null;
    //    },
    //    
    //    failedAction : function(response, maskId)
    //    {
    //        if (response.statusText) {
    //           // alert("Server Error\r\n  URL:  " + serviceUrl + "\r\n  Par:  " + postData + "\r\n  Detail:  " + response.statusText);
    //        }
    //        else {
    //           // alert("Server Error\r\n  URL:  " + serviceUrl + "\r\n  Par:  " + postData + "\r\n  Detail:  " + response);
    //        }
    //        if (maskId) {
    //            // remove loading bar     
    //            $(maskId).loadingMask("hide"); 
    //        }
    //        userUtils.isProcessing = false;
    //        response = null;
    //    }, 

    //    objToPostString: function(obj, preFix) {
    //        if (!preFix) {
    //            preFix = "";
    //        }
    //        var builder = [];
    //        for (var name in obj) {
    //            if (obj[name] == undefined || obj[name] == null) { }
    //            else if (obj[name] instanceof Array) {
    //                var arr = obj[name];
    //                for (var i = 0; i < arr.length; i++) {
    //                    builder.push(preFix + name + "=" + arr[i]);
    //                }
    //            }
    //            else if (typeof (obj[name]) == "object") {
    //                builder.push(this.objToPostString(obj[name], name + "."));
    //            }
    //            else {
    //                builder.push(preFix + name + "=" + encodeURIComponent(obj[name]));
    //            }
    //        }
    //        return builder.join("&");
    //    },

    //    refreshCaptchaByImageId: function(imgId) {
    //        var captchImg = $("#" + imgId);
    //        var url = captchImg.attr("src");

    //        var idx = url.lastIndexOf('s=');
    //        if (idx > 0) {
    //            url = url.substring(0, idx);
    //        }
    //        url = url + 's=' + new Date().getTime();

    //        // update captcha
    //        captchImg.attr("src", url);
    //    },

    //    getCaptchaInstanceId: function(imgId) {
    //        var captchaUrl = $("#" + imgId).attr("src");
    //        var parms = userUtils.getUrlVars(captchaUrl);
    //        return parms["t"];
    //    },

    //    // Read a page's GET URL variables and return them as an associative array.
    //    getUrlVars: function(url) {
    //        var vars = [], hash, key, value;
    //        var hashes = url.slice(url.indexOf('?') + 1).split('&');
    //        for (var i = 0; i < hashes.length; i++) {
    //            //hash = hashes[i].split('=', 2);
    //            key = hashes[i].substring(0, hashes[i].indexOf('='));
    //            value = hashes[i].substring(hashes[i].indexOf('=') + 1, hashes[i].length);
    //            vars.push(key); vars[key] = value;
    //        }
    //        return vars;
    //    },

    //    getCaptchaId: function(imgId) {
    //        var captchaUrl = $("#" + imgId).attr("src");
    //        var parms = userUtils.getUrlVars(captchaUrl);
    //        return parms["c"];
    //    },

    //    initSelect: function(name, objId, defVal, func, options) {
    //        var obj = $("#" + objId);
    //        if (obj.length > 0) {
    //            var single = obj.get(0);
    //            obj.val(defVal);
    //            single.onchange = function() {
    //                userData[name] = $("#" + objId).val();
    //                if (func) {
    //                    func();
    //                }
    //            }
    //            Control.Select.init(single, options);
    //        }
    //    },

    //    initCbx: function(name, objId, fnValid, contentId) {
    //        var obj = $("#" + objId);

    //        if (contentId == null) {
    //            contentId = "ddl-" + objId;
    //        }
    //        var cnt = $("#" + contentId);
    //        var dd = obj.dropdown({ contentId: contentId,
    //            triggerEvent: "click",
    //            moveToRoot: true, dropShadow: false,
    //            autoWidth: true
    //        });

    //        obj.click(function() {
    //            var divOffset = cnt.offset().top;
    //            var linkId = name + "_" + userData[name];
    //            var atLink = cnt.find("a[id='" + linkId + "']");

    //            var pOffset = atLink.offset().top;
    //            var pScroll = pOffset - divOffset;
    //            cnt.animate({ scrollTop: '+=' + pScroll + 'px' }, 100, 'easeOutBounce');

    //            cnt.find("a").removeClass();
    //            atLink.removeClass().addClass("selected");
    //        });

    //        cnt.find("a").mouseover(function() {
    //            cnt.find("a").removeClass();
    //            $(this).removeClass().addClass("selected");
    //        });

    //        cnt.find("a").click(function() {

    //            // do something necessarily.. such as validation..
    //            var newId = $(this).attr("id").replace(name + "_", "");
    //            var newTxt = $(this).text();

    //            // remember the selected id
    //            userData[name] = newId;

    //            // update selected value
    //            $("#" + objId).text(newTxt);
    //            obj.dropdown("hide");

    //            if (fnValid) {
    //                if (!fnValid()) {
    //                    obj.trigger('focus');
    //                }
    //            }

    //        });
    //    },

    //    initSubmit: function(btnId, formId, fnBeforeSubmit, msg) {
    //        if (msg == null) { msg = "Your request is being processed. Please wait!" }
    //        $(btnId).click(function() {
    //            if (userUtils.isProcessing) { userUtils.alert(msg); return; }
    //            userUtils.clearErrorBox();
    //            if (!$(formId).valid()) {
    //                userUtils.showErrorBox(OtherMessages.CompleteFieldsMsg);
    //                // return false;
    //            }

    //            if (fnBeforeSubmit) { fnBeforeSubmit(); }
    //            $(formId).submit();
    //        });
    //    },

    //    initTooltip: function(allInputs, allMessages, opts) {

    //        if (!opts) {
    //            opts = {
    //                showEvent: 'focus',
    //                hideEvent: 'blur',
    //                vAlign: "below", align: "flushLeft", ttClass: 'tooltip',
    //                distanceX: 0, distanceY: 0
    //            }
    //        }
    //        // if empty array, just init the tooltip & clear the content 
    //        // -> tooltip's not ready
    //        if (!allMessages) { allMessages = new Array(); }
    //        allInputs.each(function() {
    //            var obj = $(this);
    //            var objId = obj.attr("id").replace(Control.Select.Text_Prefix, '');

    //            obj.attr(MSG_ATTR, allMessages[objId]);
    //            obj.tt(opts);

    //            var icon = findIcon(obj); // hide info icon

    //            icon.mouseout(function() {
    //                obj.hideOneTip();
    //            });
    //            icon.click(function() {
    //                obj.showOneTip();
    //            });
    //            if (!allMessages[objId]) { obj.hideOneTip(); }
    //        });
    //    },

    //    ddObjId: function(objId) {
    //        return "#" + Control.Select.Text_Prefix + objId;
    //    },

    //    initWindowPopup: function() {
    //        $("a.popup-new").click(function(event) {
    //            utility.popupNewWin(event, this);
    //        });
    //    },
    //    getTimeZone: function() {
    //        var timeZone = -(new Date()).getTimezoneOffset();
    //        var hours = timeZone / 60;
    //        var minus = timeZone % 60;
    //        var sign = (hours > 0 ? "+" : (hours < 0 ? "-" : ""));

    //        var absHours = Math.abs(Math.floor(hours));
    //        if (absHours < 10) {
    //            absHours = "0" + absHours;
    //        }
    //        if (Math.abs(minus) < 10) {
    //            minus = "0" + minus;
    //        }
    //        return sign + absHours + ":" + minus;
    //    },
    //    disableCaptcha: function(captchaDisabled) {
    //        if (captchaDisabled) { $("#txtCaptcha").val("DISABLED!").attr("disabled", true); }
    //    },

    //    passwordChars: function(txt) {
    //        return /^[\-=\+!#\$%\^&\*\(\)_\{\}\[\]\\|:;<>/\?`~@ \t\'\".,\d\w]+$/.test(txt);
    //    },
    //    alert: function(msg, title, fnc) {
    //        if (!title || title == '') { title = document.title; }
    //        Control.Dialog.showAlert(title, msg, fnc);
    //    },
    //    info: function(msg, title, fnc) {
    //        if (!title || title == '') { title = document.title; }
    //        Control.Dialog.showMessage(title, msg, fnc);
    //    }

    //    passwordPolicies: function(txt) {
    //        var LOWER = /[a-z]/,
    //        UPPER = /[A-Z]/,
    //        DIGIT = /[0-9]/,
    //        DIGITS = /[0-9].*[0-9]/,
    //        SPECIAL = /[^a-zA-Z0-9]/;
    //        
    //        var lower = LOWER.test(txt),
    //            upper = UPPER.test(txt),
    //            digit = DIGIT.test(txt),
    //            // digits = DIGITS.test(password),
    //            special = SPECIAL.test(txt);
    //            
    //        if (lower || upper) {
    //            if (digit) {
    //                return true;
    //            }
    //        }
    //        
    //        return false;
    //    }
    //#endregion

    //#region getDialog
    getDialog: function(dialogId) {
        var pWin = (window.parent ? window.parent : window.opener);
        if (pWin) { return pWin.$("#" + dialogId).parent(); }

        return null;
    },
    //#endregion

    //#region disableCopyPaste
    disableCopyPaste: function(objs) {
        document.oncontextmenu = function(e) {
            return false; // Disable Right-Click Case
            var anyObjs = objs.filter(function() { return this.id == window.event.srcElement.id; });
            return (anyObjs.length == 0);
        }

        objs.mousedown(function(e) {
            if (e.button == 2) { stopEvent(e); }
        }).keydown(key_pressed).select(
        function(e) {
            return false;
        }

        );

        function key_pressed(e) {
            var evt = typeof window.event != 'undefined' ? window.event : e;
            var V = evt.keyCode == 86;
            var INSERT = evt.keyCode == 45;

            if ((evt.ctrlKey && V) ||
                (evt.shiftKey && INSERT)) {
                stopEvent(evt);
            }
        }

        function stopEvent(e) {
            var evt = typeof window.event != 'undefined' ? window.event : e;
            if (evt.stopPropagation) {
                evt.preventDefault();
                evt.stopPropagation();
            } else {
                evt.cancleBubble = true;
                evt.returnValue = false;
            }
            return false;
        }

        objs.select(function(e) {
            stopEvent(e);
        });
    }
    //#endregion
}
