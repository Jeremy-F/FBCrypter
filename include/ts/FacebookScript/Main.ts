/// <reference path="../../typings/chrome.d.ts" />
var myID = document.querySelector("._s0._1k69._ry.img").id;
myID = myID.substr(19, myID.length);

var leftLi = document.querySelector("._kv");
var idCurrentFriend : number = parseInt(leftLi.getAttribute("id").substr(12, leftLi.getAttribute("id").length));

var smileyMenu = document.querySelector(".uiToggle.emoticonsPanel");

/************* */
var lien = document.createElement("a");
lien.setAttribute("href", "#");
lien.setAttribute("id", "");

var extensionID = "acpkbohefhcjnfckcppfnlkcnhomblld";

var realTextarea : Element= document.querySelector(".uiTextareaNoResize.uiTextareaAutogrow._1rv");
realTextarea.setAttribute("style", "display:none");
var divTextarea = document.querySelector("._1rt");
var cryptedTextarea = document.createElement("textarea");
cryptedTextarea.setAttribute("id", "cryptedTextarea");
divTextarea.appendChild(cryptedTextarea);
cryptedTextarea.addEventListener("keydown", (event) => {
    if(event.keyCode === 13 && event.shiftKey){
        realTextarea.value = cryptedTextarea.value;
    }
});



lien.addEventListener("click", (event) => {
    var id = document.querySelector("._k-._kv").id;
    var friendID = id.substr(12, id.length);
    console.log("clicked :P");
    chrome.runtime.sendMessage(extensionID, {
        requestType : "initUser",
        friendID :friendID,
        myID : myID
    },(response) => {
        console.log(response);
    });
});
/************* */

/************* */
var img = document.createElement("img");
img.setAttribute("src", "https://i.imgur.com/ghFzjMM.png");
img.setAttribute("width", "20px");
img.setAttribute("height", "20px");
/************* */
lien.appendChild(img);
smileyMenu.appendChild(lien);

