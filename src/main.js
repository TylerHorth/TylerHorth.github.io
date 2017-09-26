// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

function fetchImage(url) {
    return new Promise((resolve, reject) => {
        if (!url.match(/\.(jpg|png)$/)) {
            reject(url);
        } else {
            fetch(url, { mode: 'no-cors' }).then((resp) => {
                for (let elem of document.getElementsByClassName("bg")) {
                    elem.style.backgroundImage = `url('${url}')`
                }
                resolve(url)
            }).catch(reject)
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
        let timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 500, 'request timed out');
        })
        Promise.race([timeout, fetchImage(url)]).then((url) => {
            console.log(url)
        }).catch((err) => {
            console.log(`err: ${err}`)
            console.log(`retrying...`)
            randomIndex = (randomIndex + 1) % items.length
            url = items[randomIndex].data.url
            if (randomIndex != startIndex) {
                fetchImage(url).then((url) => {
                    console.log(url)
                })
            }
        })
    })
