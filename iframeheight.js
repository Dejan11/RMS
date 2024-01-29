/*
 * When a user opens JS and VT examples we set the height inside the iframe from below file
 * Example url: https://developer.here.com/documentation/examples/vector-tiles
 */

function documentHeight(documentObj) {
    return Math.max(
        documentObj.documentElement.clientHeight,
        documentObj.body.scrollHeight,
        documentObj.documentElement.scrollHeight,
        documentObj.body.offsetHeight,
        documentObj.documentElement.offsetHeight
    );
}

function informParentOnChanges(subDomain, curDomain, parentOrigin, iFrameHeight){
    var newIFrameHeight = documentHeight(document);
    if (newIFrameHeight !== iFrameHeight) {
        iFrameHeight = newIFrameHeight;
        if(curDomain.endsWith(subDomain)) {
            parent.postMessage({type: "iFrameHeightChanged", height: iFrameHeight}, parentOrigin);
        }
    }
}

function getIframeheightOnLoad(subDomain, curDomain, parentOrigin, iFrameHeight){
    var framePadding = 5;

    if (top === parent) {
        iFrameHeight = documentHeight(document) + framePadding;
        if(curDomain.endsWith(subDomain)) {
            parent.postMessage({type: "DOMContentLoaded", height: iFrameHeight}, parentOrigin);
        }

        setInterval(function () {
            informParentOnChanges(subDomain, curDomain, parentOrigin, iFrameHeight);
        }, 500);

        try {
            var observer = new MutationObserver(function () {
                informParentOnChanges(subDomain, curDomain, parentOrigin, iFrameHeight);
            });
            observer.observe(document.body, {attributes: true, childList: true, subtree: true});
        } catch (e) {
        }
    }
}

window.addEventListener("load", function () {
    var parentOrigin = document.referrer.match(/^.+:\/\/[^\/]+/)[0];
    if(window.ENV_VARIABLE !== undefined) {
        getIframeheightOnLoad(window.ENV_VARIABLE, document.domain, parentOrigin, iFrameHeight = 0);
    }
});