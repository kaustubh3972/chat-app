// const io = require("socket.io-client")(7000, {
// 	cors: {
// 		origin: ["http://localhost:7000"],
// 	},
// });
// const io = require("socket.io");
const { Server } = require("socket.io");
// const io = new Server(8000, {
// 	/* options */
// });
var io = require('socket.io-emitter')();
setInterval(function(){
  io.emit('time', new Date);
}, 5000);
const users = {};
io.on("connection", (socket) => {
	socket.on("new-user-joined", (username) => {
		console.log("New user", username);
		users[socket.id] = username;
		socket.broadcast.emit("user-joined", username);
	});
	socket.on("send", (message) => {
		socket.broadcast.emit("receive", {
			message: message,
			username: users[socket.id],
		});
		console.log("check");
	});
	socket.on("disconnect", (message) => {
		socket.broadcast.emit("left", users[socket.id]);
		delete users[socket.id];
	});
});
