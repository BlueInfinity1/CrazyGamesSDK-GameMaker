/*
 * CrazyGames SDK Integration for GameMaker
 *
 * This script is designed to work with a GameMaker extension, allowing external 
 * calls from GML to interact with the CrazyGames SDK. The integration provides 
 * functions for initializing the SDK, requesting ads, and handling ad events.
 */

var cgAsyncID = "CrazyGamesSDKEvent"; // Unique event ID for async responses
var adRequested = false; // Tracks whether an ad has been requested

const crazysdk = window.CrazyGames.CrazySDK.getInstance();

/**
 * Initializes the CrazyGames SDK and sets up event listeners.
 * This should be called before using any other functions.
 */
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

/*
 * Requests an advertisement from CrazyGames.
 * This function should be called with either "midgame" or "rewarded" as the ad type.
 */
function requestAd(adType) {
    adRequested = true;
    crazysdk.requestAd(adType);
    GMS_API.debug_msg("Ad requested");
}

/*
 * Callback when an ad starts playing.
 * Sends an async event back to GameMaker.
 */
adStarted = () => {
    var map = {};
    map["id"] = cgAsyncID;
    map["event_type"] = "cg_ad_started";

    GMS_API.send_async_event_social(map);
    GMS_API.debug_msg("CALLBACK: ad started");
};

/*
 * Callback when an ad encounters an error.
 * Sends an async event back to GameMaker and resets the ad request flag.
 */
adError = () => {
    var map = {};
    map["id"] = cgAsyncID;
    map["event_type"] = "cg_ad_error";

    GMS_API.send_async_event_social(map);
    GMS_API.debug_msg("CALLBACK: ad error");
    adRequested = false;
};

/*
 * Callback when an ad finishes successfully.
 * Sends an async event back to GameMaker and resets the ad request flag.
 */
adFinished = () => {
    var map = {};
    map["id"] = cgAsyncID;
    map["event_type"] = "cg_ad_finished";

    GMS_API.send_async_event_social(map);
    GMS_API.debug_msg("CALLBACK: ad finished");
    adRequested = false;
};
