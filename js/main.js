const video = document.getElementById("webcam");
let mnet;
console.log(video);

function addPredictionHandler() {
	mnet = ml5.imageClassifier("MobileNet", modelLoaded);
	mnet.predict(video, gotResults);
}

function gotResults(error, results) {
	if (error) {
		console.error(error);
		return;
	}
	//const aanmaken voor de classen die goed zijn of niet.
	const label = results[0].label;
	const confidence = results[0].confidence;
	const confidencePercent = (confidence * 100).toFixed(2);

	//classen aanmaken voor confidence
	const confidenceClass = confidence > 0.7 ? "good" : "bad";

	document.getElementById("prediction").innerHTML =
		`<p>This is a <span class="${confidenceClass}">${label}</span> 
		with <span class="${confidenceClass}">${confidencePercent}% certainty</span></p>`;
}

function checkForDevices() {
	navigator.mediaDevices.enumerateDevices().then((devices) => {
		console.log(devices);
	});
}

function loadWebcamStream() {
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices
			.getUserMedia({
				video: true,
			})
			.then((stream) => {
				console.log("Sream available");
				console.log(stream);
				video.srcObject = stream;
				video.play();
			})
			.catch((error) => {
				console.error("Error accessing webcam:", error);
			});
	}
}
//load model met ml5 documentation
function modelLoaded() {
	console.log("loaded model.");
}

checkForDevices();
loadWebcamStream();

//button toegevoegd met id
const button = document.getElementById("predict");
button.addEventListener("click", addPredictionHandler);

//referenties

//https://comp.anu.edu.au/courses/extn1019/labs-year-12/12-image-classifier/#summary
