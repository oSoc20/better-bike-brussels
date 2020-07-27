"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    if("serviceWorker" in navigator){
        registerServiceWorker();
    }
}

function registerServiceWorker(){
    navigator.serviceWorker
    .register("/sw.js")
    .then((res) => console.log("service worker registered", res))
    .catch((err) => console.log("service worker registration failed", err))
}