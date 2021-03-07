const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meeting");

router.get("/meeting", meetingController.getMeetings);
router.post("/meeting", meetingController.postMeeting);
router.delete("/meeting/:id", meetingController.deleteMeeting);
router.delete("/meeting", meetingController.deleteAllMeetings);

module.exports = router;
