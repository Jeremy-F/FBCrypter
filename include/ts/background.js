(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="../typings/chrome.d.ts" />
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    console.log(sender);
    sendResponse("Tiens ta réponse batard : " + message);
    console.log("fuck les test ! ");
});
/* Dès qu'une page est chargé */
chrome.webNavigation.onCompleted.addListener(function (details) {
    // Execution
    // chrome.tabs.executeScript(details.tabId, {
    //     file : "FacebookMessageScript.js"
    // });
    // chrome.runtime.onMessage.addListener((message : string,
    //                                       sender : MessageSender,
    //                                       sendResponse : Function) => {
    //     console.log(message);
    //     console.log(sender);
    //     console.log("fuck les test ! ");
    // });
    chrome.runtime.sendMessage("Bonjour, voici un message de ma part :D" + details.tabId);
}, { url: [{ urlPrefix: "https://www.facebook.com/messages" }] });

},{}]},{},[1]);
