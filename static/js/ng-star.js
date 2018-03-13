(function () {
    'use strict';
    angular.module("starApp", ['pascalprecht.translate', 'ngCookies', 'ui.bootstrap', 'ngAside'])
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: '/public/resource/i18n/',
                suffix: '.json'
            });
            $translateProvider.preferredLanguage('en-gb');
  }])
        .config(['$httpProvider', function ($httpProvider) {
            //initialize get if not there
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }

            // Answer edited to include suggestions from comments
            // because previous version of code introduced browser-related errors

            //disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            // extra
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}])
        .run(globalInit)
        .filter('quicki18n', quicki18n)
        .filter('navCollapse', navCollapse)
        .filter('getResource', getResource)
    .directive('autoWidth', [
            function () {

            return {

                scope: {
                    itemArray: '=',
                    restWidth: '=',
                    itemWidth: '='
                },
                restrict: 'A',
                link: function (scope, element) {
                    scope.dataSet = {
                        originalItem: ['a', 'b'],
                        collapseItem: []
                    };
                    scope.itemWidth = scope.itemWidth || 30;
                    var totalWidth = $(element).parent().width() - (scope.restWidth || 0);
                    var count = Math.floor(totalWidth / scope.itemWidth);
                    scope.dataSet.originalItem = scope.itemArray.slice(0, count - 1);
                    scope.dataSet.collapseItem = scope.itemArray.slice(count, scope.itemArray.length - 1);
                }
            };
            }
        ])
    .directive('maintenanceMode', ['$window', function ($compile) {
        return {
            restrict: 'A',
            scope: true,
            controller: 'maintenanceCtrl'
        };
        }])
    .directive('resizingFrame', ['$window', function ($window) {
                return {
                    restrict: 'A',
                    link: function (scope, element, attr) {
                        var restHeight = attr.restHeight;
                        var resizingRatio = attr.resizingRatio;

                        function onResize() {
                            if (restHeight)
                                $(element).height($window.innerHeight - restHeight);
                            else if (resizingRatio) {
                                var h = $(element).height();
                                $(element).width(h * (resizingRatio * 1));
                            }
                        }

                        onResize();
                        angular.element($window).bind('resize', onResize);
                    },
                };
        }
    ])
        .directive('msHeader', ['$window', '$timeout', '$rootScope', function ($window, $timeout, $cookies, $rootScope) {
         return {
             restrict: 'A',
             controller: 'headerCtrl',
             templateUrl: environmentCheck(getCookie('appType')).headerTemplate,
             link: function (scope, element) {
                 scope.maxIndex = 9;

                 function onResize() {
                     // Initialize all variables
                     // Reset navbar so that it shows everything again in one line
                     // including the more button. This is so we can
                     // compute the total width of the product nav bar before it gets
                     // re-arranged by the script
                     scope.showMore = true;
                     $(element).find('#menu-products >li.more-products').removeClass("ng-hide");
                     var MoreMenuItems = $(element).find('#menu-products >li.more-products .dropdown-menu>li');
                     if (MoreMenuItems.length > 0) {
                         // Transfer contents from the More Dropdown Menu to the main
                         // Product Nav List, then move the more menu to the very end
                         // of the list
                         $(element).find('#menu-products').append(MoreMenuItems).append($(element).find('#menu-products >li.more-products'));
                     }
                     var HeaderWidth = $(element).find('#nav-wrapper').width();
                     var LogoWidth = $(element).find('#logo-188bet').width();
                     var RightGroupWidth = $(element).find('#hdr-panel').width();
                     var moreButtonSize = $(element).find('#menu-products >li:last-child').width();
                     var availWidth = HeaderWidth - LogoWidth - RightGroupWidth - moreButtonSize - 20;
                     var availItemsPlus = $(element).find('#menu-products >li');
                     var currNavWidth = 0;
                     angular.forEach(availItemsPlus, function (item, index) {
                         // Measure the current width of the navbar as it 
                         //loops through the elements
                         currNavWidth = currNavWidth + $(item).width();
                         if (currNavWidth > availWidth) {
                             // Shows the more nav button
                             $(element).find('#menu-products >li.more-products').removeClass("ng-hide");
                             if (index < availItemsPlus.length - 1) {
                                 // We're subtracting 1 from the lenght because
                                 // the last element in our list is the 'More' button
                                 // and we don't want to remove that from the list as
                                 // it transfers the contents to the dropdown.
                                 $(element).find('#menu-products >li.more-products .dropdown-menu').append(availItemsPlus[index]);
                             }
                         } else {
                             // Hides the more button 
                             $(element).find('#menu-products >li.more-products').addClass("ng-hide");
                         }
                         scope.subMenuProds = scope.availableProds.slice(index + 1);

                     });
                 }
                 $timeout(onResize, 1 * 1000);
                 angular.element($window).bind('resize', onResize);
             },
         };
        },
    ])
    .directive('starClock', [
            '$interval', 'dateFilter', '$rootScope',
            function ($interval, dateFilter, $rootScope) {
            return function (scope, element, attrs) {
                var format,
                    stopTime;

                function updateTime() {
                    element.text(dateFilter(new Date(), format, $rootScope.client.geod.timezone) + ' (GMT' + $rootScope.client.geod.timezone + ')');
                }

                scope.$watch(attrs.format, function (value) {
                    format = value;
                    updateTime();
                });

                stopTime = $interval(updateTime, 1000);
            }
            }
        ])
    .directive('assistTools', [
            function () {
                return {
                    restrict: 'A',
                    controller: 'assistToolsCtrl',
                    templateUrl: '/public/resource/templates/bars/assistTools.tpl.html'
                };
            }
        ])
        .directive('msFooter', [
            function () {
                return {
                    restrict: 'A',
                    controller: 'footerCtrl',
                    templateUrl: environmentCheck(getCookie('appType')).footerTemplate
                };
            }
        ])
    .directive('checkServiceDirective', ['checkService', function (checkService) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    checkService.init();
                }
            };
        }])
        .directive('userPanel', ['$window', '$cookies', '$rootScope', function ($window, $cookies, $rootScope) {
                return {
                    restrict: 'A',
                    controller: 'userPanelCtrl'
                };
        }
        ])
        .directive('countdownTimer', ['$interval', function ($interval) {
        return {
            restrict: 'A',
            scope: {
                countdownTimer: '='
            },
            transclude: true,
            link: function (scope, element, attrs, ctrls, transclude) {
                var maxUnit, stopTime;
                maxUnit = attrs.maxUnit || 'hours';

                function updateTime() {
                    var val = scope.countdownTimer;
                    if (angular.isUndefined(val)) return;
                    scope.clock = new Date(val * 1).timeDiff(maxUnit);
                }
                scope.$watch('countdownTimer', updateTime);
                updateTime();
                transclude(scope, function (clone) {
                    element.append(clone);
                });

                if (maxUnit == 'hours')
                    stopTime = $interval(updateTime, 1000);
            }
        };
        }
        ])
        .directive('popupNew', ['$window', function ($window) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.click(function (event) {
                        var url = attrs.href;
                        var windowName = attrs.windowName;
                        var style = attrs.popupNew;
                        $window.open(url, windowName, style).focus();
                        event.preventDefault();
                    });
                }
            };
        }])
        .controller('headerCtrl', headerCtrl)
        .controller('assistToolsCtrl', assistToolsCtrl)
        .controller('footerCtrl', footerCtrl)
        .controller('userPanelCtrl', userPanelCtrl)
        .controller('maintenanceCtrl', maintenanceCtrl)
    .controller('quickMenuCtrl',quickMenuCtrl)
        globalInit.$inject = ['$rootScope', '$interval', '$cookies', '$filter', '$translate', '$modal'];
        headerCtrl.$inject = ['$rootScope', '$scope', '$filter', '$document', '$translate', '$cookies', '$modal','$aside'];
        footerCtrl.$inject = ['$rootScope', '$scope', '$filter', '$cookies', '$modal'];
        assistToolsCtrl.$inject = ['$scope', '$modal'];
        userPanelCtrl.$inject = ['$rootScope', '$scope', '$translate', '$window', '$cookies', '$modal'];
        getResource.$inject = ['$filter', '$sce', '$modal'];
        modalInstanceCtrl.$inject = ['$scope', '$modalInstance', '$modal'];
    function userPanelCtrl($rootScope, $scope, $translate, $window, $cookies, $modal) {}
    function maintenanceCtrl($rootScope, $scope, $translate, $window, $cookies, $modal) {}
    function modalInstanceCtrl($scope, $modalInstance) {
        $scope.close = msgmodalClose;
        $scope.confirm = msgmodalConfirm;

        function msgmodalConfirm() {
            $modalInstance.close();
        };

        function msgmodalClose() {
            $modalInstance.dismiss('cancel');
        };
    }
    //jQuery part
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(window).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('nav.navbar').removeClass('nav-down').removeClass('nav-down-down').addClass('nav-up');
            $("nav#navmenu-products-mobile").removeClass("show");
            $("body").removeClass("show-navmenu-products-mobile");
            $('.static-searchbox').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('nav.navbar').removeClass('nav-up').removeClass('nav-down-down').addClass('nav-down');
                $('.static-searchbox').removeClass('nav-up').addClass('nav-down');
            }
        }

        lastScrollTop = st;
    } 
    // Hide Header on scroll down
    function assistToolsCtrl($scope, $modal) {
        $scope.toggleMenu = toggleMenu;
        $scope.showhelpMenu = false;

        function toggleMenu() {
            $scope.showhelpMenu = !$scope.showhelpMenu;
        }
    }



    function getResource($filter, $sce) {
        return function (input, indexkey, maxlength) {
            var result = '';
            input = input || [];
            indexkey = indexkey || '';
            maxlength = maxlength || 0;
            try {
                var resource = indexkey == '' ? input : $filter('filter')(input, {
                    key: indexkey
                }, true)[0];
                var lanDic = $filter('filter')(resource.lanVals, {
                    LangCode: global.lan
                }, true)[0] || resource.lanVals[0];
                result = lanDic['Value']; //$sce.trustAsResourceUrl(lanDic['Value']);
            } catch (exception) {

            }
            return result;
        }
    }



    function environmentCheck(appType) {
        var environment = '';
        if ((navigator.userAgent.indexOf('Windows') >= 0) || (navigator.userAgent.indexOf('Macintosh') >= 0)) {
            var isMobile = false;
        } else {
            var isMobile = true;
        }
        // Test for secondary condition
        if (appType != null) {
            if (appType == 'desktop') {
                var isMobile = false;
            } else if (appType == 'mobile') {
                var isMobile = true;
            }
        }
        if (!isMobile) {
            //desktop templates
            return environment = {
                'headerTemplate': '/public/resource/templates/common/header.tpl.html',
                'footerTemplate': '/public/resource/templates/common/footer.tpl.html',
                'commonCss': '/public/css/common.css',
                'bootstrapCss': '../public/css/bootstrap3.css',
                'devstylesCss': '../public/css/dev-styles.css',
                'maintenanceCss': '../Public/css/maintenance.css',
                'isMobile': false,
                'regionSelect':''
            };
        } else if (isMobile) {
            //mobile templates
            return environment = {
                'headerTemplate': '/public/resource/templates/common/m-Header.tpl.html',
                'footerTemplate': '/public/resource/templates/common/m-footer.tpl.html',
                'commonCss': '/public/css/m-common.css',
                'bootstrapCss': '/public/css/m-bootstrap3.css',
                'devstylesCss': '/public/css/m-dev-styles.css',
                'maintenanceCss': '/Public/css/m-maintenance.css',
                'isMobile': true,
                'regionSelect':''
            };
        }
    }



    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function quickMenuCtrl($rootScope, $scope, $window, $sce, $modalInstance, $translate, selectedMenu) {
        $scope.close = close;
        $scope.back = back;
        $scope.choose = choose;

        var visited = [];

        if (selectedMenu !== undefined) $scope.selectedMenu = selectedMenu;   // for language switch
        if ($scope.selectedMenu === undefined) $scope.selectedMenu = "001";
        if ($scope.selectedMenu === '901') switchLanguage();

        function close() {
            $modalInstance.close('close');
        }

        function back() {
            if (visited.length === 0) {
                close();
                return;
            }

            var obj = visited.pop();
            $scope.selectedMenu = obj.history;
            $scope.selectedTitle = obj.title;
        }

        function choose(pageId, translateKey) {
            visited.push({ 'history': $scope.selectedMenu, 'title': $scope.selectedTitle });
            $scope.selectedMenu = pageId;

            if (translateKey) $scope.selectedTitle = $translate.instant(translateKey);
            else $scope.selectedTitle = "";

            if (pageId === '901') switchLanguage();
        }

        // Switch Language, need extra codes to handle
        function switchLanguage() {
//            var menuLang = _.filter(uv.sessionD.lans, function (lang) { if (lang.index !== uv.geod.lan.index) return lang; })[0];
//
//            $scope.selectedTitle = $sce.trustAsHtml(uv.geod.lan.display);
//            $scope.languagePath = location.pathname.replace(global.lan, menuLang.value);
//            $scope.languageDisplay = menuLang.display;
//            $scope.languageValue = menuLang.value;
                        $cookies.putObject('languageSettings', {
                'value': value,
                'display': display
            }, {
                path: '/'
            });
            $rootScope.currLang = value;
            $rootScope.currLangDisplay = display;
            $translate.use(value);

            location.href = '/' + value + '/';

        
        }

    }

    function headerCtrl($rootScope, $scope, $filter, $document, $translate, $cookies, $modal,$aside) {

        $scope.switchLang = switchLang;
        $scope.indexMenu = indexMenu;
        $scope.checkAvailable = checkAvailable;
        $scope.openMenu = function (selectedMenu) {
                $aside.open({
                    placement: 'right',
                    templateUrl: '/public/resource/templates/common/quickmenu.tpl.html',
                    controller: 'quickMenuCtrl',
                    size: 'lg',
                    resolve: {
                        selectedMenu: function () {
                            return selectedMenu;
                        }
                    }
                });
//            $modal.open({
//                size: 'qrcode',
//                templateUrl: '/public/resource/templates/modal/qrCode.tpl.html',
//                controller: 'modalInstanceCtrl',
//                windowClass: 'center-modal',
//                resolve: {
//                    items: function () {
//                        $rootScope.partner.name = partnerName;
//                    }
//                }
//            });
        }

        if (location.pathname.split('/')[1] != 'ng-select-your-region.html') {
            $scope.global.lan = location.pathname.split('/')[1];
        } else {
            $scope.global.lan = $cookies.get('storedLan');
        }
        $scope.availableProds = availableProds;
        $scope.availLanguages = $rootScope.availLanguages;
        if (location.pathname.split('/')[1] != 'ng-select-your-region.html') {
            $translate.use(location.pathname.split('/')[1]);
        } else {

        }
        //        $scope.availLanguages.forEach(function (index) {
        //            if ($scope.global.lan == index.value) {}
        //
        //        });

        function switchLang(value, display) {
            $cookies.putObject('languageSettings', {
                'value': value,
                'display': display
            }, {
                path: '/'
            });
            $rootScope.currLang = value;
            $rootScope.currLangDisplay = display;
            $translate.use(value);

            location.href = '/' + value + '/';

        }


        function checkAvailable(prodIndex) {
            var prodDetail = $filter('filter')(global.prods, {
                index: prodIndex
            }, true)[0];
            var allow = prodDetail['allows'].indexOf('*') != -1 || prodDetail['allows'].indexOf(uv.pd.r) != -1;
            var forbiddenC = prodDetail['forbiddens'].indexOf(uv.geod.cc) != -1;
            return allow && !forbiddenC;
        }

        function indexMenu(prod) {
            return window.location.pathname.indexOf('/' + global.lan + '/' + prod) == 0 || global.prodName == prod;
        }




        //$document.bind('scroll', function(e) {
        //    console.log('scrolling');
        //});

        //Set Initial Values
        var GMTVal = new Date().toString().match(/([\+,\-])(\d{4})\s/g);
        $rootScope.GMTFormatted = GMTVal[0].substring(0, 3) + ":" + GMTVal[0].substring(3, GMTVal[0].length);
        if ($rootScope.GMTFormatted.charAt(1) == '0') {
            $rootScope.GMTFormatted = $rootScope.GMTFormatted.substring(1, 0) + $rootScope.GMTFormatted.substring(2, $rootScope.GMTFormatted.length);
        }
        $rootScope.client.geod.timezone = $rootScope.GMTFormatted;
    }


    function navCollapse() {
        return function (input, parentWidth, restWidth, itemWidth, reverse) {
            input = input || [];
            reverse = reverse || false;
            parentWidth = parentWidth || 0;
            restWidth = restWidth || 0;
            itemWidth = itemWidth || 1;

            var count = Math.floor((parentWidth - restWidth) / itemWidth);
            var items = input.slice(0, count - 1);
            var collapseItem = input.slice(count - 1, input.length);
            return reverse ? collapseItem : items;
        }
    }

    function quicki18n() {
        var i18nObj = {
            monthNames: [
              "txtComStJan", "txtComStFeb", "txtComStMar", "txtComStApr", "txtComStMay", "txtComStJun",
              "txtComStJul", "txtComStAug", "txtComStSep", "txtComStOct", "txtComStNov", "txtComStDec"
            ],
            prodNames: {
                "201": "navHomeRoot",
                "1200": "navSbkRoot",
                "2200": "navRacingRoot",
                "3200": "navESportsRoot",
                "4200": "navCsnRoot",
                "5200": "navLiveCsnRoot",
                "8200": "navKenoRoot",
                "9100": "navBingoRoot",
                "6200": "navPokerRoot",
                "7100": "navFinsRoot",
                "10200": "navPromoRoot"
            }
        }
        return function (input, prop) {
            var month = parseInt(input);
            var output;
            switch (month) {
                case NaN:
                    output = input;
                    break;
                default:
                    output = i18nObj[prop][input];
                    break;
            }
            return output;
        }
    }

    function globalInit($rootScope, $interval, $cookies, $filter, $translate, $modal) {
        $('body').addClass('nav-up');
        //check if cookie is empty
        if ($cookies.getObject('regionSettings') == null) {
            //set cookies for region
            $cookies.putObject('regionSettings', {
                'regcode': 'ROW',
                'regdelan': 'en-gb',
                'reglans': ['en-gb', 'zh-cn'],
                'regdisplay': 'International',
                'regengdisplay': 'International',
                'reglandisplay': 'English',
                'currLang': 'en-gb'
            }, {
                path: '/'
            });

        }
        if ($cookies.getObject('languageSettings') == null) {
            //set cookies for language
            $cookies.putObject('languageSettings', {
                'value': 'en-gb',
                'display': 'English'
            }, {
                path: '/'
            });

        }
        //Store cookies in a variable
        $rootScope.regionSettings = $cookies.getObject('regionSettings', {
            path: '/'
        });
        $rootScope.languageSettings = $cookies.getObject('languageSettings', {
            path: '/'
        });
        //Set the appropriate language
        $rootScope.currLang = $rootScope.languageSettings.value;
        $rootScope.currLangDisplay = $rootScope.languageSettings.display;
        $rootScope.availLanguages = availLanguages;
        //Desktop version or mobile?

        //Load mobile/desktop stylesheets
        $rootScope.appType = $cookies.get('appType');
        $rootScope.commonCss = environmentCheck($rootScope.appType).commonCss;
        $rootScope.bootsrapCss = environmentCheck($rootScope.appType).bootstrapCss;
        $rootScope.devstylesCss = environmentCheck($rootScope.appType).devstylesCss;
        $rootScope.maintenanceCss = environmentCheck($rootScope.appType).maintenanceCss;
        $rootScope.isMobile = environmentCheck($rootScope.appType).isMobile;

        $rootScope.route = location.hostname;
        $rootScope.global = global;
        $rootScope.currRegionCode = $rootScope.regionSettings.regcode;
        $rootScope.currRegion = $rootScope.regionSettings.regengdisplay;
        $rootScope.currRegionDisplay = $rootScope.regionSettings.regdisplay;
        $rootScope.client = uv;
        $rootScope.csnGames = csnGames;
        $rootScope.featGame = featGame;
        $rootScope.liveChatAddresses = liveChatAddresses;
        $rootScope.ajaxStackObj = {};
        $rootScope.availableProds = [];
        $rootScope.gameBackground = '';
        $rootScope.cooperativeSet = {
            sponsor: [],
            paymentMethod: [],
            responsibleGaming: [],
            socialMedia: [],
            issueLicenses: []
        };

        //translate the page
        //        $translate.use(newlan);
        console.log($rootScope.regionSettings);
        $rootScope.msgCounter = {
            notifi: 0,
            inbox: 0
        };
        $rootScope.firstLaunch = global.firstLaunch === 'True';

        $rootScope.msg = {};
        var options = {};

        $rootScope.restRegions = restRegions;

        $rootScope.switchRegion = switchRegion;
        $rootScope.isUKdomain = '';
        if (location.host == 'www.188bet.co.uk') {
            $rootScope.isUKdomain = true;
            $rootScope.client.pd.r = 'UK';
        } else {
            $rootScope.isUKdomain = false;
        }

        function switchRegion(regcode, regdelan, reglans, regdisplay, regengdisplay, reglandisplay) {

            $cookies.putObject('regionSettings', {
                'regcode': regcode,
                'regdelan': regdelan,
                'reglans': [reglans],
                'regdisplay': regdisplay,
                'regengdisplay': regengdisplay,
                'reglandisplay': reglandisplay,
                'currLang': $cookies.get('currLang')
            }, {
                path: '/'
            });


        }
    }

    function footerCtrl($rootScope, $scope, $filter, $cookies, $modal) {
        $scope.filterConitidion = filterConitidion;
        $scope.modalInstanceCtrl = modalInstanceCtrl;
        $scope.thisRegion = $cookies.get('currRegion.code');
        $scope.partner = [];
        if (location.host == 'www.188bet.co.uk') {
            $scope.client.pd.r = 'UK';
            $scope.client.pd.rflag = 'UK';
        }
        $scope.open = function (partnerName) {
            $modal.open({
                size: 'qrcode',
                templateUrl: '/public/resource/templates/modal/qrCode.tpl.html',
                controller: 'modalInstanceCtrl',
                windowClass: 'center-modal',
                resolve: {
                    items: function () {
                        $rootScope.partner.name = partnerName;
                    }
                }
            });

        }

        $scope.switchType = function (whichType) {
            $cookies.put('appType', whichType, {
                path: '/'
            });
            location.href = location.href;
        }

        function filterConitidion(conidifion) {
            var isAvailable = $filter('filter')(global.prods, {
                index: prodIndex
            }, true).length > 0;
            return isAvailable;
        }
    }

})();