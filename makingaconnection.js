// https://redd.it/4ad23z

// Your challenge today will be to communicate with the freenode IRC server. This will consist of opening a TCP socket to freenode and sending two protocol messages to initiate the connection. The original IRC RFC defines a message as a line of text up to 512 bytes starting with a message code, followed by one or more space separated parameters, and ending with a CRLF (\r\n). The last paramater can be prefixed by a colon to mark it as a parameter that can contain spaces, which will take up the rest of the line. An example of a colon-prefixed parameter would be the contents of a chat message, as that is something that contains spaces.

// The first of the two initiation messages (NICK) defines what name people will see when you send a chat message. It will have to be unique, and you will not be able to connect if you specify a name which is currently in use or reserved. It has a single parameter <nickname> and will be sent in the following form:

// NICK <nickname>

// The second of the two initiation messages (USER) defines your username, user mode, server name, and real name. The username must also be unique and is usually set to be the same as the nickname. Originally, hostname was sent instead of user mode, but this was changed in a later version of the IRC protocol. For our purposes, standard mode 0 will work fine. As for server name, this will be ignored by the server and is conventionally set as an asterisk (*). The real name parameter can be whatever you want, though it is usually set to be the same value as the nickname. It does not have to be unique and may contain spaces. As such, it must be prefixed by a colon. The USER message will be sent in the following form:

// USER <username> 0 * :<realname>

// Input Description

// You will give your program a list of lines specifying server, port, nickname, username, and realname. The first line will contain the server and the port, separated by a colon. The second through fourth lines will contain nick information.

// chat.freenode.net:6667
// Nickname
// Username
// Real Name

// Output Description

// Your program will open a socket to the specified server and port, and send the two required messages. For example:

// NICK Nickname
// USER Username 0 * :Real Name

// Afterwards, it will begin to receive messages back from the server. Many messages sent from the server will be prefixed to indicate the origin of the message. This will be in the format :server or :nick[!user][@host], followed by a space. The exact contents of these initial messages are usually not important, but you must output them in some manner. The first few messages received on a successful connection will look something like this:

// :wolfe.freenode.net NOTICE * :*** Looking up your hostname...
// :wolfe.freenode.net NOTICE * :*** Checking Ident
// :wolfe.freenode.net NOTICE * :*** Found your hostname
// :wolfe.freenode.net NOTICE * :*** No Ident response
// :wolfe.freenode.net 001 Nickname :Welcome to the freenode Internet Relay Chat Network Nickname

// Challenge Input

// The server will occasionally send PING messages to you. These have a single parameter beginning with a colon. The exact contents of that parameter will vary between servers, but is usually a unique string used to verify that your client is still connected and responsive. On freenode, it appears to be the name of the specific server you are connected to. For example:

// PING :wolfe.freenode.net

// Challenge Output

// In response, you must send a PONG message with the parameter being the same unique string from the PING. You must continue to do this for the entire time your program is running, or it will get automatically disconnected from the server. For example:

// PONG :wolfe.freenode.net

"use strict";

const ChatBot = (function () {

	// private vars
	// ============

	let client = {};
	const CRLF = "\r\n";
	const net  = require("net");

	// private methods
	// ===============

	const splitServerStr = function (params) {
		const serverStr = params.server.split(":");

		return {
			host: serverStr[0],
			port: serverStr[1]
		};
	};

	const parseData = function (data) {
		const msgStr = data.toString();
		let outStr   = "";

		if (msgStr.substr(0, msgStr.indexOf(" ")) === "PING") {
			outStr = "PONG " + msgStr.substr(msgStr.indexOf(":"), msgStr.length);
			client.write(outStr);
		}
		console.log(data.toString());
		if (outStr !== "")
			console.log("=> " + outStr);
	};

	const init = function (params) {
			const server = splitServerStr(params);

			client = net.createConnection(server, () => {
				// connect listener
				console.log("connected to server");
				client.write("NICK " + params.nick + CRLF);
				client.write("USER " + params.userName + " 0 * :" + params.realName + CRLF);
			});

			client.on("data", parseData);

			client.on("end", () => {
				//end listener
				console.log("disconnected from server");
			});
		};

	// public object;

	return {
		init: init
		};

})();

let params = {
	server:   "chat.freenode.net:6667",
	nick:     "schm0bot",
	userName: "schm0bot",
	realName: "schm0bot robot"
};

ChatBot.init(params);