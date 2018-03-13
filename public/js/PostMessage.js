var pm = {
    createNew: function () {
        var _parentDomain = document.referrer.match(/(?:[(http|https)\://])*[^\/]*/)[0];

        var _sendMessage = function (data) {
            window.top.postMessage(data, '*');
        };

        var _receiveMessage = function (payload) {
            switch (payload.topic)
            {
                case 'setBannerHeight':
                    _setBannerHeight(payload.data);
                break;
            }
        };

        var _init = function () {
            // Create IE + others compatible event handler
            var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

            // Listen to message from child window
            eventer(messageEvent, function (e) {
                _receiveMessage(e.data);
            }, false);
        };


        //integration methods
        var _resizeFrame = function(h){
            _sendMessage({ topic: 'resize', data: { height: h, windowName: window.name } });
        };

        var _showParentAlert = function (title, message) {
            _sendMessage({ topic: 'showDialog', data: { title: title, message: message } });
        };


        return {
            init: _init
            , parentHost: function() {
                if (self != top)
                    return _parentDomain;
                else                  
                    return null;
            }
            , parentOrLocalHost: function () {
                var pHost = this.parentHost();
                return pHost ? pHost : location.origin;
            }

            , showParentAlert: _showParentAlert

            , resizeFrame: _resizeFrame
        };
    }
}.createNew();