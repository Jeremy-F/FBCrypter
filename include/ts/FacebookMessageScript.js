///<reference path="../typings/jquery.d.ts"/>
/**
 * Created by Jeremy-F on 10/06/2016.
 */
var $ = require("jQuery");
$(document).ready(function () {
    /* Confirmation du chargement du script */
    console.log("\"Front-End\" script loaded");
    var liens = document.querySelectorAll("a._k_");
    for (var i = 0; i < liens.length; i++) {
        var lien = liens[i];
        lien.addEventListener("click", function (clk) {
            var main = document.querySelector("._2nb[role=main]");
            console.log(main);
            var log = $("[role=log]");
            console.log("Log");
            console.log(log);
            log.bind("DOMSubtreeModified", function (event) {
                console.log(event);
                //console.log(log.find("li"));
                /*
                console.log(messages);
                for(var j = 0; j < messages.length; j++){
                    var message = messages[j];
                    var messageText = message.querySelector("p");

                }
                */
            });
        });
    }
});
//# sourceMappingURL=FacebookMessageScript.js.map