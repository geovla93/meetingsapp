const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const meetingRoutes = require("./routes/meeting");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
app.use(express.static(path.join("client", "build")));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.use(meetingRoutes);

app.use((req, res, next) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});

mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/meetingsDB", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(
		() => {
			console.log("Database connected successfully!");
		},
		(err) => {
			console.log("Database could not be connected: " + err);
		}
	);

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join("client", "build")));
// 	app.get("/*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// 	});
// }

app.listen(port, () => {
	console.log(`Server running on localhost:${port}`);
});
