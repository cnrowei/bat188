/**
 * @namespace
 */
scorecentre = {};
scorecentre.iframe = {}; 
scorecentre.iframe.api = {};

/**
 * @param {div} target
 *        The element inside which you wish to create the iframe
 * @param {number} width
 *        The width of the swf
 * @param {number} height
 *        The height of the swf
 * @param {string} domain
 *        The domain that the swf will use to request the feeds
 * @param {string} eventId
 *        The bookmaker event id
 * @param {string} homeTeamName
 *        The home team name translated (optional)
 * @param {string} awayTeamName
 *        The away team name translated (optional)
 * @param {string} sportId
 *        The bookmaker sport id (optional)
 * @param {string} locale
 *		  The locale, defaults to en-GB (optional)
 * @param {string} locale
 *		  The domain to use when loading a different event from the updates tab (optional)
 * @param {string} videoId
 *        The video id if the event has video (optional)
 * @param {string} videoProvider
 *        The video provider if the event has video, either "p" (perform) or "s" (unas) (optional)
 * @param {string} hideFunction
 *		  The name of the function which we will call if the app is hidden due to no coverage for an event (optional)
 * @param {array} flashVars
 *        An array of variables to pass into the swf, should not need to set (optional)
 */
scorecentre.iframe.api.create = function(target, width, height, domain, eventId, homeTeamName, awayTeamName, sportId, locale, videoId, videoProvider, updatesDomain, hideFunction, flashVars){
	
	//save these so that they can be used to load an event
	scorecentre.target = target;
	scorecentre.domain = domain;
	scorecentre.locale = locale;
	scorecentre.updatesDomain = updatesDomain;
	
	//also save hide function for mainHideFunction
	scorecentre.hideFunction = hideFunction;
	
	var targetId = target.id;
	var mainVars = {
		appId:targetId,
		containerId:targetId,
		locale: locale, 
		allowResize: "true",
		cacheControlSuffix: "13934",
		config: "data/config.xml?v=13934",
		betgeniusBase: domain,
		eventId: eventId,
		homeTeamName: homeTeamName,
		awayTeamName: awayTeamName,
		sportId: sportId,
		updatesDomain: updatesDomain, 
		videoId: videoId,
		videoProvider: videoProvider,
		hideFunction: mainHideFunction
	};
	
	if(flashVars){
		for(var i = 0; i < flashVars.length; i++){
			var nameValue = flashVars[i].split("=");
			mainVars[nameValue[0]] = nameValue[1];
		}
	}
	
	var params = {
		allowscriptaccess: "always",
		wmode: "transparent"
	};
	var attributes = {};
	
	swfobject.switchOffAutoHideShow();
	
	swfobject.embedSWF(domain+"/188BetFlash-phase3/footballScorecentre.swf?v=13934", targetId, width, height, "10.2.0", domain+"/188BetFlash-phase3/playerProductInstall.swf", mainVars, params, attributes);
	swfobject.registerObject(targetId, "10.2.0", domain+"/188BetFlash-phase3/playerProductInstall.swf");
	
	//swfobject.embedSWF("footballScorecentre.swf?v=13934", targetId, width, height, "10.2.0", "playerProductInstall.swf", mainVars, params, attributes);
	//swfobject.registerObject(targetId, "10.2.0", "playerProductInstall.swf");
};

/**
 * @param {string} eventId
 *        The bookmaker event id
 * @param {string} homeTeamName
 *        The home team name translated (optional)
 * @param {string} awayTeamName
 *        The away team name translated (optional)
 * @param {string} sportId
 *        The bookmaker sport id (optional)
 * @param {string} videoId
 *        The video id if the event has video (optional)
 * @param {string} videoProvider
 *        The video provider if the event has video, either "p" (perform) or "s" (unas) (optional)
 */
scorecentre.iframe.api.loadEvent = function(eventId, homeTeamName, awayTeamName, sportId, videoId, videoProvider){
	//var flashObject = swfobject.getObjectById(scorecentre.target.id);
	//flashObject.loadEvent(eventId, homeTeamName, awayTeamName, sportId, videoId, videoProvider);
	var container = document.getElementById(scorecentre.target.id);
	scorecentre.iframe.api.create(scorecentre.target, container.clientWidth, container.clientHeight, scorecentre.domain, eventId, homeTeamName, awayTeamName, sportId, scorecentre.locale, videoId, videoProvider, scorecentre.updatesDomain);
}

function resizeContainer(containerId, width, height){
	var container = document.getElementById(containerId);
	container.style.height = height + "px";
}

function mainHideFunction(){
	//first hide the scorecentre
	document.getElementById(scorecentre.target.id).style.display = "none";
	//then call the client hide function
	scorecentre.hideFunction();
}

