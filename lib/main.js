"use strict";

function fetchImage(url) {
    return new Promise(function (resolve, reject) {
        if (!url.match(/\.(jpg|png)$/)) {
            reject(url);
        } else {
            fetch(url, { mode: 'no-cors' }).then(function (resp) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = document.getElementsByClassName("bg")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var elem = _step.value;

                        elem.style.backgroundImage = "url('" + url + "')";
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                resolve(url);
            }).catch(reject);
        }
    });
}

fetch("https://www.reddit.com/r/EarthPorn/.json").then(function (resp) {
    return resp.json();
}).then(function (data) {
    var items = data.data.children;
    var randomIndex = Math.floor(Math.random() * items.length);
    var url = items[randomIndex].data.url;
    var startIndex = randomIndex;
    var timeout = new Promise(function (resolve, reject) {
        setTimeout(reject, 500, 'request timed out');
    });
    Promise.race([timeout, fetchImage(url)]).then(function (url) {
        console.log(url);
    }).catch(function (err) {
        console.log("err: " + err);
        console.log("retrying...");
        randomIndex = (randomIndex + 1) % items.length;
        url = items[randomIndex].data.url;
        if (randomIndex != startIndex) {
            fetchImage(url).then(function (url) {
                console.log(url);
            });
        }
    });
});