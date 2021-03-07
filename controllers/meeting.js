const Meeting = require("../models/meeting");

exports.getMeetings = async (req, res, next) => {
	try {
		const meetings = await Meeting.find().sort({ createdAt: -1 });
		res.status(200).json({
			message: "Fetched meetings",
			meetings: meetings,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.postMeeting = async (req, res, next) => {
	try {
		const meeting = new Meeting({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			number: req.body.number,
			time: req.body.time,
			people: req.body.people,
		});
		await meeting.save();
		res.status(201).json({
			message: "Meeting created",
			meeting: meeting,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.deleteMeeting = async (req, res, next) => {
	const meetingId = req.params.id;
	try {
		const meeting = await Meeting.findById(meetingId);
		if (!meeting) {
			const error = new Error("Could not find the meeting");
			error.statusCode = 404;
			throw error;
		}
		await Meeting.findByIdAndRemove(meetingId);
		res.status(200).json({ message: "Meeting removed" });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.deleteAllMeetings = async (req, res, next) => {
	try {
		const meetings = await Meeting.deleteMany({});
		if (!meetings) {
			const error = new Error("Could not delete all meetings");
			error.statusCode = 404;
			throw error;
		}
		res.status(200).json({ message: "Meetings removed" });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
