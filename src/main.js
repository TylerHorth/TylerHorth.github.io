if (!window.Promise) {
    window.Promise = Promise;
}

function setUrl(url) {
    for (let elem of document.getElementsByClassName("bg")) {
        elem.style.backgroundImage = `url('${url}')`
    }
}

function fetchImage(url) {
    return new Promise((resolve, reject) => {
        if (!url.match(/\.(jpg|png)$/)) {
            reject(url);
        } else {
            fetch(url, { mode: 'no-cors' }).then((resp) => {
                setUrl(url)
                resolve(url)
            }).catch(reject)
        }
    })
}

function findImage(timeout, nextUrl) {
    Promise.race([timeout(), fetchImage(nextUrl())]).then((url) => {
        console.log(url)
    }).catch((err) => {
        console.log(`err: ${err}`)
        console.log(`retrying...`)
        if (err == 'maximum retrys') {
            setUrl(nextUrl())
        } else {
            return findImage(timeout, nextUrl)
        }
    })
}

fetch("https://www.reddit.com/r/EarthPorn/.json")
    .then((resp) => resp.json())
    .then((data) => {
        let items = data.data.children
        let randomIndex = Math.floor((Math.random()*items.length))
        let url = items[randomIndex].data.url
        const startIndex = randomIndex
        let trys = 1;
        let nextUrl = () => {
            do {
                randomIndex = (randomIndex + 1) % items.length
                url = items[randomIndex].data.url
                if (url.match(/\.(jpg|png)$/)) {
                    trys += 1
                    return url
                }
            } while (randomIndex != startIndex)
            throw "No images found :("
        }
        let timeout = () => { 
            return new Promise((resolve, reject) => {
                if (trys > 5) {
                    reject('maximum retrys')
                } else {
                    setTimeout(reject, 300 * trys, 'request timed out');
                }
            })
        }
        findImage(timeout, nextUrl)
    })
