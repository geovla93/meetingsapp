const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/", router);
const port = process.env.PORT || 5000;

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

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
}

app.listen(port, () => {
	console.log(`Server running on localhost:${port}`);
});
