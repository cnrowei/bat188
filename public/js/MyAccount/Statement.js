//depends User/Utils.js

//#region global variables
var returnResult;
var returnMes;
var returnError;
var isAvailable;
var timeout = 3000;
var lastBalance;
//#endregion

$(function () {
    //HomeJS.ChangeDomain();

    //loading user info
    //utility.template("UserInfo.html", StatementJS.initialPage, "LoginSuccessful");

    $("#btnLogout").live('click', StatementJS.logout);

    $('.data-container tr:even:not(.st-hdr,st-tl)').addClass('l1');

    if (returnResult) {
        userUtils.alert(returnMes, "Message");
    }

    //#region add active class to date range button
    switch ($(".inputButn").val()) {
        case "0":
            $('a#linkBtnToday').addClass('active');
            break;
        case "1":
            $('a#linkBtnYesterday').addClass('active');
            break;
        case "8":
            $('a#linkBtnLast8').addClass('active');
            break;
        case "30":
            $('a#linkBtnLast30').addClass('active');
            break;
        case "8":
            $('a#linkBtnLast8').addClass('active');
            break;
    }
    //#endregion

    //set value
    $(".contactCountryCode").val($(".selCountryCode").val());
    $(".oddsView").val($(".selOddsView").val());

    //#region initCbx
    function initCbx(name, objId, contentId) {
        userUtils.initCbx(name, objId, contentId);
    }
    //#endregion

    //    $(".selCountryCode").change(function () {
    //        $(".contactCountryCode").val($(".selCountryCode").val());
    //    });

    //#region click show hide content
    $("div.data-title2 a.showHideContent").click(function () {
        $(this).toggleClass("alt");
        $(this).parents("div.data-title2").next().toggleClass("hidden");
    });
    //#endregion

    //#region commented
    //    $(".confirmCancel").click(function (e) {
    //        var $this = $(this);
    //        $(".transID").val($this.parents(".confirmCancelParent").parents(".trClass").find(".transactionID:eq(0)").html());
    //        Control.Dialog.showConfirm(withdrawalLocalize, cancelLocalize, function () { __doPostBack('ctl00$Content$LinkButton1', ''); });  //confirm(cancelLocalize);
    //        e.preventDefault();
    //    });

    //    $("#user-info").find(".balance").live('click', function () {
    //        var refreshBalance = false;
    //        var timestamp = Date.parse(new Date());
    //        if (lastBalance) {
    //            var diffBalance = timestamp - lastBalance;
    //            if (diffBalance >= timeout) {
    //                lastBalance = timestamp;
    //                refreshBalance = true;
    //            }
    //        } else {
    //            lastBalance = timestamp;
    //            refreshBalance = true;
    //        }
    //        if (refreshBalance) {

    //            utility.service("HomePageService", "GetBalance", null, "GET"
    //            , function (data) {
    //                if (data != null) {
    //                    if (data.isAuth == null || data.isAuth == true) {
    //                        $(".user-info .balance").html(data);
    //                    } else {
    //                        StatementJS.logout();
    //                    }
    //                }
    //            });
    //        }
    //    });
    //#endregion

    //#region change security question
    $(".selSecurityQuestion").change(function () {
        $(".lblInfoRequireQues").addClass("hidden");
    });
    //#endregion

    //#region keyup contact no.
    $(".txtContactNo").keyup(function () {
        $(".lblInfoRequireContact").addClass("hidden");
    });
    //#endregion

    //#region change status
    $(".statusDLL").change(function () {
        $(".dLLStatus").val($(".statusDLL").val());
    });
    //#endregion

    //#region change type
    $(".typeDLL").change(function () {
        $(".dLLType").val($(".typeDLL").val());
    });
    //#endregion

    //#region change odds view
    $(".selOddsView").change(function () {
        $(".oddsView").val($(".selOddsView").val());
    });
    //#endregion

    //#region change timezone
    $(".selTimeZone").change(function () {
        $(".timeZone").val($(".selTimeZone").val());
    });
    //#endregion

    //#region change security question
    $(".selSecurityQuestion").change(function () {
        $(".securityQuestion").val($(".selSecurityQuestion").val());
    });
    //#endregion

    var KeyValue = $(".KeyValue").val();
    $("." + KeyValue + "").addClass("selected");

    //#region value only decimal
    $(".onlyDecimal").keyup(function () {
        var value = $(this).val();
        var orignalValue = value;
        value = value.replace(/[0-9]*/g, "");

        value = value.replace(/\./, "");
        if (value != "") {
            orignalValue = orignalValue.replace(/([^0-9]*)/g, "")
            $(this).val(orignalValue);
        }
    });

    $(".only2Decimal").keyup(function () {
        var value = $(this).val();
        var orignalValue = value;
        value = value.replace(/[0-9]*/g, "");
        value = value.replace(/[0-9]+\.?[0-9]?[0-9]/g, "");
        if (value != "") {
            value = orignalValue.match(/[0-9]+\.?[0-9]/g);
            value = orignalValue.match(/[0-9](\.[0-9]{2})?$/g);

            if (value != null) {

                var index = orignalValue.indexOf(".");
                var decimalCount = orignalValue.substring(index + 1, orignalValue.length);
                if (decimalCount.length > 2) {
                    orignalValue = orignalValue.substring(0, orignalValue.length - 1);
                    $(this).val(orignalValue);
                }
            }
        }
    });
    //#endregion

    //#region value only interger
    $(".onlyInteger").keyup(function () {
        var value = $(this).val();
        var orignalValue = value;
        value = value.replace(/[0-9]*/g, "");

        if (value != "") {
            orignalValue = orignalValue.replace(/([^0-9]*)/g, "")
            $(this).val(orignalValue);
        }
    });
    //#endregion

    //#region update tab display
    var topKeyValue = $(".TopKeyValue").val();
    switch (topKeyValue) {
        case "banking":
            $(".topStatement").addClass("statement");
            $(".topBanking").removeClass("banking").addClass("banking-focus");
            $(".topAccount").addClass("account");
            $(".topAnnouncement").addClass("annoucement");
            break;
        case "statement":
            $(".topStatement").removeClass("statement").addClass("statement-focus");
            $(".topBanking").addClass("banking");
            $(".topAccount").addClass("account");
            $(".topAnnouncement").addClass("annoucement");
            break;
        case "account":
            $(".topStatement").addClass("statement");
            $(".topBanking").addClass("banking");
            $(".topAccount").removeClass("account").addClass("account-focus");
            $(".topAnnouncement").addClass("annoucement");
            break;
        case "announcement":
            $(".topStatement").addClass("statement");
            $(".topBanking").addClass("banking");
            $(".topAccount").addClass("account");
            $(".topAnnouncement").removeClass("annoucement").addClass("annoucement-focus");
            break;
    }
    //#endregion

    //#region click sub menu
    var $selectedA;
    $("#submenu").find(".childnode").click(function () {
        if ($selectedA) {
            $selectedA.removeClass("selected");
        }
        $selectedA = $(this);
        $selectedA.addClass("selected");
    });

    $("#submenu").find("a.expandable").click(function () {
        var $menu = $(this);
        $menu.next().slideToggle("normal");
        $menu.toggleClass("expandable").toggleClass("collapsible");
    });
    //#endregion

    //#region click print button
    $(".btn-print").click(function () {
        window.print();
    });
    //#endregion

    //#region initialize date picker
    $(".calender").datepicker({
        //        showOn: 'button',
        //        buttonImage: '/Public/Images/usercontents/icon_calendar.gif',
        //        buttonImageOnly: true,
        maxDate: datePickerMaxDate,
        minDate: credit ? '-8d' : '-29d',
        dateFormat: "dd/mm/yy",
        onClose: function () {
            var isFromDate = $(this).hasClass('ToDateValidate');
            console.log('isFromDate' + ' ' + isFromDate);

            var fromArr = $(".FromDateValidate").val().split('/');
            var fromDate = new Date(fromArr[1] + "/" + fromArr[0] + "/" + fromArr[2]);

            var toArr = $(".ToDateValidate").val().split('/');
            var toDate = new Date(toArr[1] + "/" + toArr[0] + "/" + toArr[2]);

            if (isFromDate && fromDate > toDate || !isFromDate && toDate < fromDate)
                $(".btn_submit").addClass('disable');
            else
                $(".btn_submit").removeClass('disable');
        }
    });

    /*
    if ($("#Key").val() == "sport" || $("#Key").val() == "sport2") {
        $(".calender1").datepicker({
            showOn: 'button',
            buttonImage: '/Public/Images/usercontents/icon_calendar.gif',
            buttonImageOnly: true,
            maxDate: datePickerMaxDate,
            minDate: credit ? '-8d' : '-29d',
            dateFormat: "dd/mm/yy"
        });
    }
    */
    //#endregion

    var dob = /(0[1-9]|1[012])+\/(0[1-9]|[12][0-9]|3[01])+\/(19|20)\d\d/; // HT: being used?

    //#region click submit button
    $(".btn_submit").click(function (event) {
        if ($(".ToDateValidate").val() == "") {
            showMessage();
            return false;
        }

        if ($(".FromDateValidate").val() == "") {
            showMessage();
            return false;
        }

        if ($(this).hasClass('disable'))
            return false;

        var fromArr = $(".FromDateValidate").val().split('/');
        var fromDate = fromArr[1] + "/" + fromArr[0] + "/" + fromArr[2];

        var toArr = $(".ToDateValidate").val().split('/');
        var toDate = toArr[1] + "/" + toArr[0] + "/" + toArr[2];

        if ((new Date(toDate)) < (new Date(fromDate))) {
            showMessage();
            event.stopPropagation();
            event.preventDefault();
            return false;
        }
        else {
            return true;
        };
    });
    //#endregion

    //#region click check user code button
    $(".btnCheckUserCode").click(function () {
        var userIdObj = $(".txtUserId");

        userUtils.service("RegisterService", "CheckUserCode", { UserCode: $(".txtUserId").val() }, "POST",
            function (result) {
                if (result.Code == 0) {
                    userUtils.alert(isAvailable.replace("{0}", $(".txtUserId").val()), "Message");      //alert($(".txtUserId").val() + " is available");
                    return;
                }

                // TODO: Localize
                userUtils.alert(result.Msg, "Message");
            });
    });
    //#endregion

    //#region keyup user id
    $(".txtUserId").keyup(function () {
        var value = $(this).val();
        var orignalValue = value;
        value = value.replace(/[^a-zA-Z. 0-9]{6,15}/g, "");

        if (value != "") {
            orignalValue = orignalValue.replace(/[^a-zA-Z. 0-9]{6,15}/g, "")
            $(this).val(orignalValue);
        }
    });
    //#endregion

    //#region click data title
    var isCollapsing = false;
    $("div.data-title").click(function () {
        if (!isCollapsing) {
            isCollapsing = true;
            var $parent = $(this);
            if ($parent.hasClass("collapsed")) {
                $parent.children(".btn-toggle").addClass("expand");
                $parent.removeClass("collapsed");

                if (this.innerHTML.toLowerCase().indexOf('unsettled') > -1) {
                    if ($("#UBClone").length > 0) {
                        $("#UBClone").css("display", "none");
                    }
                }
                else {
                    if ($("#SBClone").length > 0) {
                        $("#SBClone").css("display", "none");
                    }
                }

                $parent.next().show("blind", function () {
                    isCollapsing = false;
                });
            }
            else {
                $parent.addClass("collapsed")
                $parent.children(".btn-toggle").removeClass("expand");

                if (this.innerHTML.toLowerCase().indexOf('unsettled') > -1) {
                    if ($("#UBClone").length > 0) {
                        $("#UBClone").css("display", "block");
                    }
                }
                else {
                    if ($("#SBClone").length > 0) {
                        $("#SBClone").css("display", "block");
                    }
                }

                $parent.next().hide("blind", function () {
                    isCollapsing = false;
                });
            }
        }
    });
    //#endregion

    //#region initialize tooltip
    //utility.ttip_st(".tt");
    //(".tt").attr("ttp", (".tt").text());
    //$(".tt").each(function () {
    //    $(this).attr("ttp", $(".tt").text());
    //});
    //#endregion

    //#region initalize dynamic drop down
    $("select").each(function () {
        Control.Select.init(this);
    });
    //#endregion

    //#region expand parent
    expandParent($("#left-panel").find(".selected").parent().parent());

    function expandParent(objNode) {
        if (objNode) {
            var parentExpandable;
            if (objNode.parent() && objNode.parent().parent())
                parentExpandable = objNode.parent().parent();

            if (parentExpandable && parentExpandable.prev() && parentExpandable.prev().hasClass("expandable")) {
                expandParent(parentExpandable);
            }

            if (objNode.prev().hasClass("expandable")) {
                objNode.slideToggle("normal");
                objNode.prev().toggleClass("expandable").toggleClass("collapsible");
            }
        }
    }
    //#endregion

    //#region commented
    //    $(".hover-tooltip2").each(function () {
    //        $(this).tt({
    //            showEvent: 'focus',
    //            hideEvent: 'blur',
    //            vAlign: "above", align: "flushLeft", ttClass: 'tooltip',
    //            distanceX: 0, distanceY: 0,
    //            timeOut: 500, delay: 500, fadeIn: 0, fadeOut: 200,
    //            visibleOnScroll: true
    //        });
    //    });

    //$('#TopLink').topLink();
    //#endregion


    pm.init();

    pm.resizeFrame($('#aspnetForm').height());

    $(window).resize(function () {
        pm.resizeFrame($('#aspnetForm').height());
    });
});

//#region showMessage
function showMessage() {
    //parent.Control.Dialog.showMessage('', parent.l.tvdm);
    pm.showParentAlert('', parent.l.tvdm);
}
//#endregion

//#region goHistory
function goHistory() {
    history.go(-1);
}
//#endregion

var StatementJS = {
    //#region initialPage
    initialPage: function (template) {
        var shtml = template.process(uv);
        var $userInfo = $("#user-info");
        $userInfo.html(shtml);
    },
    //#endregion

    //#region logout
    logout: function () {
        try {
            if (window.opener != null && window.opener.HomeJS && window.opener.HomeJS.logout) {
                if (!window.opener.closed)
                    window.opener.HomeJS.logout();
                //prevent promot message when window opened by ctrl + clicking link
                window.open('', '_self', '');
                window.close();
            } else {
                utility.service("UserService", "Logout", {}, "POST", function (data) {
                });
                // redirect to home url
                window.location.href = g.hu;
            }
        } catch (e) {
            //Permission Denied Exception
            document.location.reload();
        }
    }
    //#endregion
};

//#region cCtrl (copied from CentralControl.js)
var cCtrl = {
    //#region Switch Theme ex. cCtrl.changeTheme()
    //if update cCtrl.changeTheme, also need to update:
    //- \Public\Js\CentralControl.js
    //- \Public\Js\InfoCentre\common.js
    changeTheme: function (color) {
        var $theme = $("#theme");

        if ($theme.length > 0) {
            var url = $theme.attr("href");
            var newcolor = color ? color.toLowerCase() : "";

            switch (newcolor) {
                case "black":
                case "theme_black":
                    newcolor = "black";
                    break;

                case "white":
                case "theme_white":
                    newcolor = "white";
                    break;

                default:    //toggle white/black
                    if (url.indexOf("/Theme_White/") != -1) {
                        newcolor = "black";
                    } else {
                        newcolor = "white";
                    }
                    break;
            }

            if (newcolor == "black") {
                url = url.replace("/Theme_White/", "/Theme_Black/");
            } else {
                url = url.replace("/Theme_Black/", "/Theme_White/");
            }

            $theme.attr("href", url);
            //selobj.themeColor = newcolor;
        }
    }
    //#endregion
}
//#endregion
