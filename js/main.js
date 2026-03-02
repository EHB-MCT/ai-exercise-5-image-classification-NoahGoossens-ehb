//Globals
const video = document.getElementById("webcam");
console.log(video);

function addPredictionHandler() {

}

function checkForDevices() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            console.log(devices);
        })
}

function loadWebcamStream() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
                video: true
            })
            .then(stream => {
                console.log("Sream available");
                console.log(stream);
                video.srcObject = stream;
                video.play();
            })
            .catch(error => {
                console.error("Error accessing webcam:", error);
            });
    }
}

//checkForDevices();
loadWebcamStream();
addPredictionHandler();