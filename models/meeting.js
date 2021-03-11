const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		number: Number,
		date: String,
		time: String,
		people: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Meeting", meetingSchema);
