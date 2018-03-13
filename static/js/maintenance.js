// Maintenance Date/Time
var maintenanceStartDateTime = new Date("08/12/2016 12:30"); // MM/DD/YYYY HH:mm NO NEED to set in STAR 3
var maintenanceEndDateTime = new Date("08/12/2016 17:00"); // MM/DD/YYYY HH:mm
var maintenanceEndDateTimeRAW = maintenanceEndDateTime;
var isEmergency = false; // false: normal maintenance page , true: emergency maintenance page
//var tzOffset = 0; // Server TimeZone Offset, GMT
//var tzOffset = -240; // Server TimeZone Offset, GMT -4
var tzOffset = +480; // DEV Server TimeZone Offset, GMT +8

var asiaTelNo = "+852 5808 3608";
var asiaTelNo_Chinese = "+852 5808 3557";
var asiaFaxNo = "+852 3010 2113";
var euroTelNo = "+44 20 3608 4015";
var euroFaxNo = "+44 20 7022 8668";
var brazilTelNo = "0800 591 3001";
var brazilFaxNo = "0800 591 3001";
var emailAddr = "help@188Service.com";






/// <reference path="../../../Public/Lib/Jquery/jquery-1.3.2.js" />

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Configuration
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ConfigurationJson = {
    "LanguageSetting": [
        {
            "region": "UK",
            "blackLanguage": "vi-vn,id-id,th-th,ko-kr,pt-br,km-kh"
        }
    ],
    "RegionLicenses": [
        {
            "category": "function",
            "name": "returnTo188",
            "blackRegion": "*",
            "except": "UK"
        },
        {
            "category": "payment",
            "name": "entropay",
            "blackRegion": "UK,China",
            "except": ""
        },
        {
            "category": "payment",
            "name": "chinadebit",
            "blackRegion": "UK",
            "except": ""
        },
        {
            "category": "payment",
            "name": "lbt",
            "blackRegion": "UK",
            "except": ""
        },
        {
            "category": "payment",
            "name": "skrill",
            "blackRegion": "China",
            "except": ""
        },
        {
            "category": "payment",
            "name": "neteller",
            "blackRegion": "China",
            "except": ""
        },
        {
            "category": "payment",
            "name": "visa",
            "blackRegion": "China",
            "except": ""
        },
        {
            "category": "payment",
            "name": "mastercard",
            "blackRegion": "China",
            "except": ""
        },
        {
            "category": "major-partners",
            "name": "liverpool",
            "blackRegion": "*",
            "except": ""
        },
        {
            "category": "major-partners",
            "name": "mcfc",
            "blackRegion": "*",
            "except": ""
        },
        {
            "category": "Social Media",
            "name": "facebook-uk",
            "blackRegion": "*",
            "except": "UK"
        },
        {
            "category": "Social Media",
            "name": "twitter",
            "blackRegion": "*",
            "except": "UK,Indonesia"
        },
        {
            "category": "Social Media",
            "name": "facebook",
            "blackRegion": "UK",
            "except": ""
        },
        {
            "category": "Social Media",
            "name": "youtube",
            "blackRegion": "UK",
            "except": ""
        },
        {
            "category": "Social Media",
            "name": "youtube-uk",
            "blackRegion": "*",
            "except": "UK"
        },
        {
            "category": "Social Media",
            "name": "g-plus",
            "blackRegion": "*",
            "except": "UK"
        },
        {
            "category": "Social Media",
            "name": "pinterest",
            "blackRegion": "*",
            "except": "UK"
        },
        {
            "category": "Social Media",
            "name": "weibo",
            "blackRegion": "*",
            "except": "China"
        },
        {
            "category": "Social Media",
            "name": "wechat",
            "blackRegion": "*",
            "except": "China"
        },
        {
            "category": "Social Media",
            "name": "qq",
            "blackRegion": "*",
            "except": "China"
        },
        {
            "category": "Security and Trust",
            "name": "gambl-comm",
            "blackRegion": "*",
            "except": "UK"
        },
        {
            "category": "address",
            "name": "annatar",
            "blackRegion": "*",
            "except": "UK"
        },
        {
            "category": "address",
            "name": "cube",
            "blackRegion": "UK",
            "except": ""
        }
    ]
}




var clientRegion = 'China';
$(function () {
    getclientRegion();
    getBodyCss();
})

function getclientRegion() {
    var urlPath = window.location.pathname;
    var lan = urlPath.substr(urlPath.indexOf('-') - 2, 5);
    switch (lan) {
        case 'zh-cn':
            clientRegion = 'china';
            break;
        case 'en-gb':
            clientRegion = 'row';
            break;
        case 'id-id':
            clientRegion = 'indonesia';
            break;
        case 'pt-br':
            clientRegion = 'brazil';
            break;
        case 'ko-kr':
            clientRegion = 'korea';
            break;
        case 'km-kh':
            clientRegion = 'cambodia';
            break;
        case 'th-th':
            clientRegion = 'thailand';
            break;
        case 'vi-vn':
            clientRegion = 'vietnam';
            break;
        case 'ja-jp':
            clientRegion = 'japan';
            break;
    }
    var ukUrlArray = ['http://www.188bet.co.uk/', '.uk'];
    for (var i = 0; i < ukUrlArray.length; i++) {
        if (window.location.href.indexOf(ukUrlArray[i].toString()) != -1) {
            clientRegion = 'UK';
            break;
        }
    }
}

function getBodyCss() {
    try {
        var data = ConfigurationJson;
        $.each(data.RegionLicenses, function (index, element) {
            if (element.blackRegion == '*' && element.except.indexOf(clientRegion) == -1 || element.blackRegion.indexOf(clientRegion) != -1) {
                $('#footer').addClass('no-' + element.name);
            }
        });
        $.each(data.LanguageSetting, function (index, element) {
            if (element.region == clientRegion) {
                $.each(element.blackLanguage.split(','), function (ind, ele) {
                    $('#drop_lanslist').addClass('no-' + ele);
                })
            }
        });
    } catch (e) {
        $('#footer').addClass('GetConfigFail no-returnTo188 no-liverpool no-facebook-uk no-twitter no-youtube-uk no-g-plus no-pinterest no-weibo no-wechat no-qq no-gambl-comm no-annatar');

    }

}

function setWeChat() {
    $('#wechat').click(function () {
        if ($('#hover').length <= 0) {
            $("<div id='hover'></div><div id ='popup'><div id='close''>X</div></div>").prependTo('body');
        }
        $('#hover').fadeIn();
        $('#popup').fadeIn().css('background-image', 'url(http://sbbanner.com/188Bet_WeChat/cn-en_300x445-WeChat-Popup.jpg)').width(300).outerHeight(445);
        $("#hover").click(function () {
            $(this).fadeOut();
            $("#popup").fadeOut();
        });

        $("#close").click(function () {
            $("#hover").fadeOut();
            $("#popup").fadeOut();
        });
    })
}

// Live Chat URL
var liveChatURLEnGb = "https://188service.secure.force.com/apex/PreChat?endpoint=https%3A%2F%2Fba9j.la1t1.salesforceliveagent.com%2Fcontent%2Fs%2Fchat%3Flanguage%3Den_US%23deployment_id%3D57290000000H1vV%26org_id%3D00D90000000rbpH%26button_id%3D57390000000H2AG%26session_id%3D24a78955-9edc-40b3-9bd1-4aa631c58a35";
var liveChatURLKoKr = "https://188service.secure.force.com/apex/PreChat?endpoint=https%3A%2F%2Fba9j.la1t1.salesforceliveagent.com%2Fcontent%2Fs%2Fchat%3Flanguage%3Den_US%23deployment_id%3D57290000000H1vV%26org_id%3D00D90000000rbpH%26button_id%3D57390000000H2AG%26session_id%3D24a78955-9edc-40b3-9bd1-4aa631c58a35";
var liveChatURLThTh = "https://188service.secure.force.com/apex/PreChat?endpoint=https%3A%2F%2Fdgva.la1t1.salesforceliveagent.com%2Fcontent%2Fs%2Fchat%3Flanguage%3Dth%23deployment_id%3D57290000000H1vV%26org_id%3D00D90000000rbpH%26button_id%3D57390000000H2GR%26session_id%3D0ee439af-74e2-4bfe-a841-930ffb637452";
var liveChatURLViVn = "https://188service.secure.force.com/apex/PreChatVietnamese?endpoint=https%3A%2F%2Fdgt7.la1t1.salesforceliveagent.com%2Fcontent%2Fs%2Fchat%3Flanguage%3Den_US%23deployment_id%3D57290000000H1vV%26org_id%3D00D90000000rbpH%26button_id%3D57390000000H2GS%26session_id%3D55185f56-6997-49d5-a3e6-349febac4590";
var liveChatURLZhCn = "https://188service.secure.force.com/apex/PreChat?endpoint=https%3A%2F%2Fdgyb.la1t1.salesforceliveagent.com%2Fcontent%2Fs%2Fchat%3Flanguage%3Dzh_CN%23deployment_id%3D57290000000H1vV%26org_id%3D00D90000000rbpH%26button_id%3D57390000000H2Gh%26session_id%3D62059be3-605e-4c79-a03f-6321ad085e6c";
//var liveChatURLZhTw = "https://server.iad.liveperson.net/hc/43238900/?cmd=file&amp;file=visitorWantsToChat&amp;site=43238900&amp;byhref=1&amp;SESSIONVAR!skill=Chinese&amp;imageUrl=https://server.iad.liveperson.net/hcp/Gallery/ChatButton-Gallery/English/General/1a/";
var liveChatURLIdId = "https://188service.secure.force.com/apex/PreChatIndonesian?endpoint=https%3A%2F%2Fdh3v.la1t1.salesforceliveagent.com%2Fcontent%2Fs%2Fchat%3Flanguage%3Den_US%23deployment_id%3D57290000000H1vV%26org_id%3D00D90000000rbpH%26button_id%3D57390000000H2AQ%26session_id%3D5fe9c050-4360-4283-9f57-b35077e20afa";
var liveChatURLPtBr = "https://188service.secure.force.com/apex/PreChat?endpoint=https%3A%2F%2Fdeut.la1t1.salesforceliveagent.com%2Fcontent%2Fs%2Fchat%3Flanguage%3Dpt_BR%23deployment_id%3D57290000000H1vV%26org_id%3D00D90000000rbpH%26button_id%3D57390000000H2GQ%26session_id%3Dd6b1b2c6-b7e4-4889-a820-854706af5b0f";
var liveChatURLKmKh = "https://188service.secure.force.com/apex/PreChatKhmer?endpoint=https%3A%2F%2Fdgzk.la1t1.salesforceliveagent.com%2Fcontent%2Fs%2Fchat%3Flanguage%3Den_US%23deployment_id%3D57290000000H1vV%26org_id%3D00D90000000rbpH%26button_id%3D57390000000H2GO%26session_id%3De16a45a5-1b73-495e-860d-80a7a67b21ee";




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Countdown Timer Localization
$.countdown.regional['th-th'] = {
    labels: ['ปี', 'เดือน', 'สัปดาห์', 'วัน', 'ชั่วโมง', 'นาที', 'วินาที'],
    labels1: ['ปี', 'เดือน', 'สัปดาห์', 'วัน', 'ชั่วโมง', 'นาที', 'วินาที'],
    compactLabels: ['ปี', 'เดือน', 'สัปดาห์', 'วัน'],
    whichLabels: null,
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    timeSeparator: ':',
    isRTL: false,
    DateSymbol: ' '
};
$.countdown.regional['zh-cn'] = {
    labels: ['年', '月', '周', '天', '时', '分', '秒'],
    labels1: ['年', '月', '周', '天', '时', '分', '秒'],
    compactLabels: ['年', '月', '周', '天'],
    compactLabels1: ['年', '月', '周', '天'],
    whichLabels: null,
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    timeSeparator: ':',
    isRTL: false,
    DateSymbol: ' '
};
$.countdown.regional['ja-jp'] = {
    labels: ['年', '月', '周', '天', '時間', '分', '秒'],
    labels1: ['年', '月', '周', '天', '時間', '分', '秒'],
    compactLabels: ['年', '月', '周', '天'],
    compactLabels1: ['年', '月', '周', '天'],
    whichLabels: null,
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    timeSeparator: ':',
    isRTL: false,
    DateSymbol: ' '
};
$.countdown.regional['ko-kr'] = {
    labels: ['년', '월', '주', '일', '시', '분', '초'],
    labels1: ['년', '월', '주', '일', '시', '분', '초'],
    compactLabels: ['년', '월', '주', '일'],
    compactLabels1: ['년', '월', '주', '일'],
    whichLabels: null,
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    timeSeparator: ':',
    isRTL: false
};
$.countdown.regional['id-id'] = {
    labels: ['tahun', 'bulan', 'minggu', 'hari', 'jam', 'menit', 'detik'],
    labels1: ['tahun', 'bulan', 'minggu', 'hari', 'jam', 'menit', 'detik'],
    compactLabels: ['t', 'b', 'm', 'h'],
    whichLabels: null,
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    timeSeparator: ':',
    isRTL: false
};
$.countdown.regional['vi-vn'] = {
    labels: ['Năm', 'Tháng', 'Tuần', 'Ngày', 'Giờ', 'Phút', 'Giây'],
    labels1: ['Năm', 'Tháng', 'Tuần', 'Ngày', 'Giờ', 'Phút', 'Giây'],
    compactLabels: ['năm', 'th', 'tu', 'ng'],
    whichLabels: null,
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    timeSeparator: ':',
    isRTL: false
};
$.countdown.regional['pt-br'] = {
    labels: ['Ano', 'Mês', 'week', 'dias', 'horas', 'minutos', 'segundos'],
    labels1: ['Ano', 'Mês', 'week', 'dias', 'horas', 'minutos', 'segundos'],
    compactLabels: ['Ano', 'Mês', 'week', 'dias'],
    compactLabels1: ['Ano', 'Mês', 'week', 'dias'],
    whichLabels: null,
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    timeSeparator: ':',
    isRTL: false
};
$.countdown.regional["km-kh"] = {
    labels: ['ឆ្នាំ', 'ខែ', 'សប្តាហ៍', 'ទិវា', 'ម៉ោង', 'នាទី', 'វិនាទី'],
    labels1: ['ឆ្នាំ', 'ខែ', 'សប្តាហ៍', 'ទិវា', 'ម៉ោង', 'នាទី', 'វិនាទី'],
    compactLabels: ['ឆ្នាំ', 'ខែ', 'សប្តាហ៍', 'ទិវា'],
    compactLabels1: ['ឆ្នាំ', 'ខែ', 'សប្តាហ៍', 'ទិវា'],
    whichLabels: null,
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    timeSeparator: ':',
    isRTL: false,
    DateSymbol: ' '
};


function casinoClick(language) {
    var casinoURL = '../' + language + '/';
    window.location = casinoURL;
}


function liveChatClick(language) {

    var liveChatURL = "";

    if (language == "en-gb") {
        liveChatURL = liveChatURLEnGb;
    } else if (language == "ko-kr") {
        liveChatURL = liveChatURLKoKr;
    } else if (language == "th-th") {
        liveChatURL = liveChatURLThTh;
    } else if (language == "vi-vn") {
        liveChatURL = liveChatURLViVn;
    } else if (language == "zh-cn") {
        liveChatURL = liveChatURLZhCn;
    } else if (language == "zh-tw") {
        liveChatURL = liveChatURLZhTw;
    } else if (language == "id-id") {
        liveChatURL = liveChatURLIdId;
    } else if (language == "pt-br") {
        liveChatURL = liveChatURLPtBr;
    } else if (language == "km-kh") {
        liveChatURL = liveChatURLKmKh;
    }
    window.open(liveChatURL, 'LiveChat', 'width=500px,height=500px,left=' + ((window.screen.width - 500) / 2) + ',top=' + ((window.screen.height - 500) / 2));
}

function languageClick(language, isHomePage) {
    if (isHomePage)
        window.location = language;
    else
        window.location = "../" + language;
}

function SetMaintenanceDateTime(language) {
    var date = "";
    var endDate = "";
    var startTime = "";
    var endTime = "";
    var timeZone = "";

    var currentTime = new Date();
    var clientDateTime = new Date(currentTime - ClockJS.serverClientGap);


    var clientTZoffset = -currentTime.getTimezoneOffset() - tzOffset;

    $.countdown.setDefaults($.countdown.regional[language]);

    maintenanceStartDateTime = new Date(maintenanceStartDateTime.setMinutes(maintenanceStartDateTime.getMinutes() + clientTZoffset));
    maintenanceEndDateTime = new Date(maintenanceEndDateTime.setMinutes(maintenanceEndDateTime.getMinutes() + clientTZoffset));
    maintenanceEndDateTimeRAW = new Date(maintenanceEndDateTime.setMinutes(maintenanceEndDateTime.getMinutes()));
    if (language == "en-gb") {
        date = maintenanceStartDateTime.getDate() + " " + GetMonthString(maintenanceStartDateTime.getMonth() + 1, "en-gb") + " " + maintenanceStartDateTime.getFullYear();
        endDate = maintenanceEndDateTime.getDate() + " " + GetMonthString(maintenanceEndDateTime.getMonth() + 1, "en-gb");
    } else if (language == "ko-kr") {
        date = maintenanceStartDateTime.getFullYear() + "년" + (maintenanceStartDateTime.getMonth() + 1) + "월 " + maintenanceStartDateTime.getDate() + "일";
        endDate = (maintenanceEndDateTime.getMonth() + 1) + "월 " + maintenanceEndDateTime.getDate() + "일";
    } else if (language == "th-th") {
        date = maintenanceStartDateTime.getDate() + " " + GetMonthString(maintenanceStartDateTime.getMonth() + 1, "th-th") + " " + maintenanceStartDateTime.getFullYear();
        endDate = maintenanceEndDateTime.getDate() + " " + GetMonthString(maintenanceEndDateTime.getMonth() + 1, "th-th");
    } else if (language == "vi-vn") {
        date = maintenanceStartDateTime.getDate() + " Thg" + (maintenanceStartDateTime.getMonth() + 1) + " " + maintenanceStartDateTime.getFullYear() + " ";
        endDate = (maintenanceEndDateTime.getDate().toString().length == 1 ? "0" + maintenanceEndDateTime.getDate().toString() : maintenanceEndDateTime.getDate()) + " tháng " + ((maintenanceEndDateTime.getMonth() + 1).toString().length == 1 ? "0" + (maintenanceEndDateTime.getMonth() + 1).toString() : maintenanceEndDateTime.getMonth() + 1); // + " " + maintenanceEndDateTime.getFullYear() + " ";
    } else if (language == "zh-cn") {
        date = maintenanceStartDateTime.getFullYear() + "年" + (maintenanceStartDateTime.getMonth() + 1) + "月" + maintenanceStartDateTime.getDate() + "日";
        endDate = (maintenanceEndDateTime.getMonth() + 1) + "月" + maintenanceEndDateTime.getDate() + "号";
    } else if (language == "ja-jp") {
        date = maintenanceStartDateTime.getFullYear() + "年" + (maintenanceStartDateTime.getMonth() + 1) + "月" + maintenanceStartDateTime.getDate() + "日";
        endDate = (maintenanceEndDateTime.getMonth() + 1) + "月" + maintenanceEndDateTime.getDate() + "日";
    } else if (language == "id-id") {
        date = maintenanceStartDateTime.getDate() + " " + GetMonthString(maintenanceStartDateTime.getMonth() + 1, "id-id") + " " + maintenanceStartDateTime.getFullYear();
        endDate = maintenanceEndDateTime.getDate() + " " + GetMonthString(maintenanceEndDateTime.getMonth() + 1, "id-id");
    } else if (language == "pt-br") {
        date = maintenanceStartDateTime.getDate() + " " + GetMonthString(maintenanceStartDateTime.getMonth() + 1, "pt-br") + " " + maintenanceStartDateTime.getFullYear();
        endDate = maintenanceEndDateTime.getDate() + " de " + GetMonthString(maintenanceEndDateTime.getMonth() + 1, "pt-br");
    } else if (language == "km-kh") {
        date = maintenanceStartDateTime.getDate() + " " + GetMonthString(maintenanceStartDateTime.getMonth() + 1, "km-kh") + " " + maintenanceStartDateTime.getFullYear();
        endDate = maintenanceEndDateTime.getDate() + " " + GetMonthString(maintenanceEndDateTime.getMonth() + 1, "km-kh");
    }


    startTime = (maintenanceStartDateTime.getHours().toString().length == 1 ? "0" + maintenanceStartDateTime.getHours().toString() : maintenanceStartDateTime.getHours()) + ":" + (maintenanceStartDateTime.getMinutes().toString().length == 1 ? "0" + maintenanceStartDateTime.getMinutes().toString() : maintenanceStartDateTime.getMinutes());
    endTime = (maintenanceEndDateTime.getHours().toString().length == 1 ? "0" + maintenanceEndDateTime.getHours().toString() : maintenanceEndDateTime.getHours()) + ":" + (maintenanceEndDateTime.getMinutes().toString().length == 1 ? "0" + maintenanceEndDateTime.getMinutes().toString() : maintenanceEndDateTime.getMinutes());
    timeZone = ClockJS.getTimeZoneString(-currentTime.getTimezoneOffset());


    //formattedDate = date + " @ " + startTime + " - " + endDate + " @ " + endTime + " (GMT " + timeZone + ")";
    $('#tzgmt').text(' (GMT ' + timeZone + ')');
    if (language == "vi-vn")
        formattedEndDate = endDate + ", " + endTime + " (GMT" + timeZone + ")";
    else if (language == "th-th")
        formattedEndDate = endDate + " " + endTime + (isEmergency ? " " : " น. ") + "(GMT" + timeZone + ")";
    else if (language == "ko-kr")
        formattedEndDate = endDate + " " + endTime + (isEmergency ? "에 서비스가 다시 제공될 예정입니다." : "시 ") + "(GMT" + timeZone + ")에 종료될 예정입니다";
    else if (language == "pt-br")
        formattedEndDate = endDate + " " + endTime + " (GMT" + timeZone + ") ";
    else if (language == "zh-cn")
        formattedEndDate = endDate + " " + endTime + " (GMT" + timeZone + ")";
    else if (language == "en-gb")
        formattedEndDate = endDate + " " + endTime + " (GMT" + timeZone + ")";
    else if (language == "km-kh")
        formattedEndDate = endDate + " " + endTime + " (GMT" + timeZone + ")";
    else
        formattedEndDate = endDate + " " + endTime + " (GMT" + timeZone + ")";
}

function GetMonthString(month, lang) {
    switch (month) {
        case 1:
            return lang == "th-th" ? "ม.ค." : lang == "id-id" ? "Januari" : lang == "pt-br" ? "Janeiro" : lang == "km-kh" ? "Makara" : "Jan";
            break;
        case 2:
            return lang == "th-th" ? "ก.พ." : lang == "id-id" ? "Februari" : lang == "pt-br" ? "Fevereiro" : lang == "km-kh" ? "Kompheak" : "Feb";
            break;
        case 3:
            return lang == "th-th" ? "มี.ค." : lang == "id-id" ? "Maret" : lang == "pt-br" ? "Março" : lang == "km-kh" ? "Meneah" : "Mar";
            break;
        case 4:
            return lang == "th-th" ? "เม.ย." : lang == "id-id" ? "April" : lang == "pt-br" ? "Abril" : lang == "km-kh" ? "Meysah" : "Apr";
            break;
        case 5:
            return lang == "th-th" ? "พ.ค." : lang == "id-id" ? "Mei" : lang == "pt-br" ? "Maio" : lang == "km-kh" ? "Osaphea" : "May";
            break;
        case 6:
            return lang == "th-th" ? "มิ.ย." : lang == "id-id" ? "Juni" : lang == "pt-br" ? "Junho" : lang == "km-kh" ? "Maytona" : "Jun";
            break;
        case 7:
            return lang == "th-th" ? "ก.ค." : lang == "id-id" ? "Juli" : lang == "pt-br" ? "Julho" : lang == "km-kh" ? "Kakada" : "Jul";
            break;
        case 8:
            return lang == "th-th" ? "สิงหาคม" : lang == "id-id" ? "Agustus" : lang == "pt-br" ? "Agosto" : lang == "km-kh" ? "Seyha" : "Aug";
            break;
        case 9:
            return lang == "th-th" ? "ก.ย." : lang == "id-id" ? "September" : lang == "pt-br" ? "Setembro" : lang == "km-kh" ? "Kanya" : "Sep";
            break;
        case 10:
            return lang == "th-th" ? "ต.ค." : lang == "id-id" ? "Oktober" : lang == "pt-br" ? "Outubro" : lang == "km-kh" ? "Tola" : "Oct";
            break;
        case 11:
            return lang == "th-th" ? "พ.ย." : lang == "id-id" ? "November" : lang == "pt-br" ? "Novembro" : lang == "km-kh" ? "Vicheka" : "Nov";
            break;
        case 12:
            return lang == "th-th" ? "ธ.ค." : lang == "id-id" ? "Desember" : lang == "pt-br" ? "Dezembro" : lang == "km-kh" ? "Thnou" : "Dec";
            break;

    }
}


function SetMaintenanceContactInfo(language) {
    if (language == "zh-cn" || language == "zh-tw") {
        $("#divAsiaPhoneNo").text(asiaTelNo_Chinese);
    } else {
        $("#divAsiaPhoneNo").text(asiaTelNo);
    }

    $("#divAsiaFaxNo").text(asiaFaxNo);
    $("#divEuroPhoneNo").text(euroTelNo);
    $("#divEuroFaxNo").text(euroFaxNo);
    $("#divBrazilPhoneNo").text(brazilTelNo);
    $("#divBrazilFaxNo").text(brazilFaxNo);
    $("#divEmail").html("<a href='mailto:" + emailAddr + "'>" + emailAddr + "</a>");

    if ($("#divAsiaPhoneNo").text() == "" && $("#divAsiaFaxNo").text() == "")
        $("#divAsiaPhoneNo").parent().hide();

    if ($("#divEuroPhoneNo").text() == "" && $("#divEuroFaxNo").text() == "")
        $("#divEuroPhoneNo").parent().hide();

    if ($("#divAsiaPhoneNo").text() == "")
        $("#divAsiaPhoneNoLabel").hide();

    if ($("#divAsiaFaxNo").text() == "")
        $("#divAsiaFaxNoLabel").hide();

    if ($("#divEuroPhoneNo").text() == "")
        $("#divEuroPhoneNoLabel").hide();

    if ($("#divEuroFaxNo").text() == "")
        $("#divEuroFaxNoLabel").hide();

    if ($("#divEmail").text() == "")
        $("#divEmail").parent().hide();
}

function showContent(language) {
    $subject = $(".hd-ttl");
    $subHead = $(".sub-ttl");
    $content = $("#maintain-msg");

    if (!isEmergency) {
        $subject.text(co.ms);
        $subHead.text(co.ms2);
        if (language == "ko-kr")
            $content.prepend("<p class='msg-txt'>" + co.mc1 + " <span id='maintenanceDateTime' class='time'> " + formattedEndDate + "</span> " + co.mc1_1 + "</p><p class='msg-txt'>" + co.mc2 + "</p><p class='msg-txt'>대략<span class='time-est-cd'></span>" + co.mc3 + "</p><p class='msg-txt'>" + co.mc4 + "</p>");
        else if (language == "zh-cn")
            $content.prepend("<p class='msg-txt'>" + co.mc1 + " <span id='maintenanceDateTime' class='time'> " + formattedEndDate + "</span> " + co.mc1_1 + "</p><p class='msg-txt'>" + co.mc2 + "</p><p class='msg-txt'> " + co.mc3 + " <span class='time-est-cd'></span>后恢復正常。" + "</p><p class='msg-txt'>" + co.mc4 + "</p>");
        else
            $content.prepend("<p class='msg-txt'>" + co.mc1 + " <span id='maintenanceDateTime' class='time'> " + formattedEndDate + "</span> " + co.mc1_1 + "</p><p class='msg-txt'>" + co.mc2 + "</p><p class='msg-txt'> " + co.mc3 + " <span class='time-est-cd'></span>." + "</p><p class='msg-txt'>" + co.mc4 + "</p>");

        $("#maintenanceDateTime").show();
    } else {
        $subject.text(co.es);
        $subHead.text(co.es2);
        //$content.prepend("<p class='msg-txt'>"+co.ec1+" <span id='maintenanceDateTime' class='time'> "+formattedEndDate+"</span> "+co.ec2+"</p><p class='msg-txt'> "+co.ec3+" <span class='time-est-cd'></span>"+"</p><p class='msg-txt'>"+co.ec4+"</p>");
        $content.prepend("<p class='msg-txt'>" + co.ec1 + co.ec2 + "</p><p class='msg-txt'> " + co.ec3 + " <span class='time-est-cd'></span>" + "</p><p class='msg-txt'>" + co.ec4 + "</p>");

        //$("#maintenanceDateTime").show();
        $('span.time-est-cd').hide();
    }

}

function SetMaintenanceConfigurableInfo(language) {
    SetMaintenanceDateTime(language);
    SetMaintenanceContactInfo(language);
    showContent(language);
    $('.time-est-cd').countdown({
        until: maintenanceEndDateTimeRAW
    });

    ClockJS.initTimeClock(uv.tzoff, uv.svrDt, $.now());


}
