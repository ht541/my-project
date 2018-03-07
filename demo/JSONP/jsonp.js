function jsonp(url, successCb, timeoutCb, errorCb) {
    var cbName = 'CALLBACK$$$_' + Math.random.substr(2);
    window[cbName] = successCb;
    url = url + 'callback' + cbName;
    var script = document.createElement('script');
    script.src = url;
    script.onload = function () {
        clearTimeout(timerId)
        delete window[cbName]
        document.body.removeChild(script)
    }
    script.onerror = function () {
        try {
            errorCb()
        } finally {
            delete window[cbName]
            document.body.removeChild(script)
        }
    }
    var timerId = setTimeout(function () {
        timeoutCb()
        delete window[cbName]
        document.body.removeChild(script)
    },50000)
    document.body.appendChild(script);
}