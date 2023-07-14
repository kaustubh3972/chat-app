// const socket = io("http://localhost:7000", { tranports: ["websocket"] });
const socket = io("http://localhost:8000");
// const io = require("socket.io-client");
// socket = io();
console.log("hi client");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("msgInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("notification.mp3");
const append = (message, position, type) => {
	const messageElement = document.createElement("div");
	messageElement.innerText = message;
	if (type == 0) {
		messageElement.classList.add("notify");
	} else if (type == 1) {
		messageElement.classList.add("message");
	}
	messageElement.classList.add(position);
	messageContainer.append(messageElement);
	if (position == "left" || position == "mid") {
		audio.play();
	}
};
const username = prompt("Enter your username");
socket.emit("new-user-joined", username);
socket.on("user-joined", (username) => {
	append(`${username} joined the chat`, "mid", 0);
});

socket.on("receive", (data) => {
	append(`${data.username}:${data.message}`, "left", 1);
});

socket.on("left", (username) => {
	append(`${username} left the chat`, "mid", 0);
});
form.addEventListener("submit", (e) => {
	e.preventDefault;
	const message = messageInput.value;
	append(`You: ${message}`, "right", 1);
	socket.emit("send", message);
	messageInput.value = "";
});
