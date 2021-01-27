function setTime() {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.querySelector("#timeElement").textContent = time;
}

function setDate() {
    let today = new Date();
    let time = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    document.querySelector("#dateElement").textContent = time;
}

const MILLISECONDS_IN_SECONDS = 1000;
setDate();
setInterval(setDate, MILLISECONDS_IN_SECONDS);
setTime();
setInterval(setTime, MILLISECONDS_IN_SECONDS);