/**
 * Created by Jerem on 01/07/2016.
 */
///<reference path="../typings/chrome.d.ts"/>
chrome.devtools.network.onRequestFinished.addListener((request) => {
    console.log(request);
});