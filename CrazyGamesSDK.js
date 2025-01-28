var cgAsyncID = "CrazyGamesSDKEvent";
var adRequested = false;
const crazysdk = window.CrazyGames.CrazySDK.getInstance();

//call first
function init() {
    crazysdk.init();
    adRequested = false;
    installListeners();
    GMS_API.debug_msg("CrazyGames SDK initialized");
  }

  function installListeners() {
    crazysdk.addEventListener('adStarted', adStarted);
    crazysdk.addEventListener('adError', adError);
    crazysdk.addEventListener('adFinished', adFinished);
    GMS_API.debug_msg("Listeners installed");
  }

  function removeListeners() {
    crazysdk.removeEventListener('adStarted', adStarted);
    crazysdk.removeEventListener('adError', adError);
    crazysdk.removeEventListener('adFinished', adFinished);
    GMS_API.debug_msg("Listeners removed");
  }

//call this with either "midgame" or "rewarded" as the parameter
  function requestAd(adType) {
    adRequested = true;
    crazysdk.requestAd(adType);
    GMS_API.debug_msg("Ad requested");
  }

  adStarted = () => {
    var map = {};
		map["id"] = cgAsyncID;
		map["event_type"] = "cg_ad_started";
    GMS_API.send_async_event_social(map);
    GMS_API.debug_msg("CALLBACK: ad started");
  }

  adError = () => {
    var map = {};
		map["id"] = cgAsyncID;
    map["event_type"] = "cg_ad_error";
    GMS_API.send_async_event_social(map);
    GMS_API.debug_msg("CALLBACK: ad error");
    adRequested = false;
  }

  adFinished = () => {
    var map = {};
		map["id"] = cgAsyncID;
    map["event_type"] = "cg_ad_finished";
    GMS_API.send_async_event_social(map);
    GMS_API.debug_msg("CALLBACK: ad finished");
    adRequested = false;
  }
