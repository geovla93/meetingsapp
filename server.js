const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/", router);
app.use(express.static(path.join(__dirname, "client", "build")));
const port = process.env.PORT || 3001;

mongoose
	.connect(
		"mongodb+srv://admin-george:y7TlT.eR@cluster0.jt9lv.mongodb.net/meetingsDB",
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
	)
	.then(
		() => {
			console.log("Database connected successfully!");
		},
		(err) => {
			console.log("Database could not be connected: " + err);
		}
	);

const meetingsSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	number: Number,
	time: String,
});

const Meeting = mongoose.model("Meeting", meetingsSchema);

router.route("/create").post((req, res) => {
	const newMeeting = new Meeting({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		number: req.body.number,
		time: req.body.time,
	});
	newMeeting.save((err) => {
		if (!err) {
			res.send("Successfully added a new meeting.");
		} else {
			res.send(err);
		}
	});
});

router.route("/").get((req, res) => {
	Meeting.find((error, meetings) => {
		if (error) {
			console.log(error);
		} else {
			res.json(meetings);
		}
	});
});

router.route("/deleteall").delete((req, res) => {
	Meeting.deleteMany({}, (err) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).send({ msg: "Successfully deleted!" });
		}
	});
});

router.route("/delete/:id").delete((req, res, next) => {
	Meeting.findByIdAndRemove(req.params.id, (err, data) => {
		if (err) {
			return next(err);
		} else {
			res.status(200).json({ msg: data });
		}
	});
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
	console.log(`Server running on localhost:${port}`);
});
