javascript: (function() {
    function getURLParameter(name, givenstring) {
        return decodeURI(
            (RegExp('(^|&)' + name + '=(.+?)(&|$)').exec(givenstring) || [, , null])[2]
        );
    }
    var jq = document.createElement('script');
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    var isDebug = false;
    var mainJQueryLoad = setInterval(function() {
        if (typeof jQuery !== "undefined") {
            clearInterval(mainJQueryLoad);
            jQuery.noConflict();
            hrefWindows = [];
            thisWind = null;
            indexWindow = 0;
            jQuery('a[href^="/setup/layout/flsdetail.jsp"]').each(function() {
                hrefWindows.push({
                    name: jQuery(this).parent().prev().text(),
                    href: jQuery(this).attr("href").replace("flsdetail", "flsedit")
                });
            });
            var objPageInterval = setInterval(function() {
                if (typeof window["stopThisMadness"] !== "undefined") {
                    clearInterval(objPageInterval);
                    if (isDebug) console.log("Ok I'm get out of this.");
                }
                else if (thisWind == null) {
                    if (indexWindow < hrefWindows.length) {
                        thisWind = {
                            name: hrefWindows[indexWindow].name,
                            url: hrefWindows[indexWindow].href,
                            hWnd: window.open(hrefWindows[indexWindow].href, "_blank"),
                            jQueryLoad: false,
                            scenarioExecuted: false
                        };
                        if (isDebug) console.log("Open popup " + thisWind.url);
                        indexWindow++;
                    }
                    else {
                        clearInterval(objPageInterval);
                        console.log("I'm done with FLS.");
                    }
                }
                else if (thisWind.jQueryLoad == false) {
                    var cjq = thisWind.hWnd.document.createElement('script');
                    cjq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
                    thisWind.hWnd.document.getElementsByTagName('head')[0].appendChild(cjq);
                    thisWind.jQueryLoad = true;
                    if (isDebug) console.log("Added jQuery to " + thisWind.url);
                }
                else if (typeof thisWind.hWnd.jQuery !== "undefined" && thisWind.hWnd.document.readyState == "complete" && thisWind.scenarioExecuted == false) {
                    thisWind.scenarioExecuted = true;
                    var c = thisWind.hWnd.document.getElementsByTagName('input');
                    for (i in c) {
                        if (null != c[i].id && 0 == c[i].id.indexOf('display')) {
                            c[i].checked = true;
                        }
                    }
                    thisWind.hWnd.jQuery('input.btn[name="save"][type="submit"]').click();
                    if (isDebug) console.log("Executed scenario to " + thisWind.url);
                }
                else {
                    indexOfFlsEdit = thisWind.hWnd.location.href.indexOf("flsedit");
                    hWndReadyState = thisWind.hWnd.document.readyState;
                    if (isDebug) console.log("I'm WAITING on " + getURLParameter("type", thisWind.url));
                    if (indexOfFlsEdit == -1 && hWndReadyState != "loading") {
                        console.info("Done with " + thisWind.name + "(" + indexWindow + ")");
                        thisWind.hWnd.close();
                        thisWind = null;
                    }
                    else if (
                        typeof thisWind.hWnd.jQuery !== "undefined" &&
                        indexOfFlsEdit > -1 &&
                        hWndReadyState == "complete" &&
                        thisWind.hWnd.jQuery('input.btn[name="save"][type="submit"]').length > 0
                    ) {
                        thisWind.hWnd.jQuery('input.btn[name="save"][type="submit"]').click();
                    }
                }
            }, 1000);
        }
    }, 500);
})();