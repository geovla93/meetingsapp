const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
	firstName: String,
	lastName: String,
	number: Number,
	time: String,
	people: Number,
});

module.exports = mongoose.model("Meeting", meetingSchema);
