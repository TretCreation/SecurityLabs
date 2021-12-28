const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const app = express();
const PORT = config.get("serverPort");
const https = require('https');
const path = require('path');

const fs = require('fs');

app.use(express.json())
app.use("/api/auth", authRouter)

const sslServer = https.createServer({
	key: fs.readFileSync(path.join(__dirname, 'cert' , 'key.pem')),
	cert: fs.readFileSync(path.join(__dirname, 'cert' , 'cert.pem'))
}, app)

const start = () => {
	try {
		mongoose.connect(config.get("dbUrl"))

		sslServer.listen(PORT, () => console.log(`Server started on port`, PORT))
		// app.listen(PORT, () => {
		// 	console.log(`Server started on port`, PORT)
		// })
	} catch (e){

	}
}

start();
