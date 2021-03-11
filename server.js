const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));

mongoose.Promise = global.Promise;
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

const Meeting = require("./models/meeting");

app
	.route("/api/meetings")
	.get((req, res) => {
		Meeting.find((err, foundMeetings) => {
			if (err) {
				console.log(err);
			} else {
				res.json(foundMeetings);
			}
		})
			.sort({ createdAt: "desc" })
			.exec();
	})
	.post((req, res) => {
		const newMeeting = new Meeting({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			number: req.body.number,
			date: req.body.date,
			time: req.body.time,
			people: req.body.people,
		});
		newMeeting.save((err) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Successfully added new meeting.");
			}
		});
	});

app.route("/api/meetings/:id").delete((req, res) => {
	Meeting.deleteOne({ _id: req.params.id }, (err) => {
		if (err) {
			console.log(err);
		} else {
			res.send("Successfully deleted the meeting.");
		}
	});
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
	console.log(`Server running on localhost:${port}`);
});
