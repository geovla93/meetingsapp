import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

function Meeting(props) {
	const { meeting } = props;

	function deleteClicked(e) {
		props.onDelete(meeting._id);
		e.preventDefault();
	}
	return (
		<div className="meeting">
			<h1>
				Όνομα: {meeting.firstName} {meeting.lastName}
			</h1>
			<p>
				Κινητό: {meeting.number}
				<br />
				Ημερομηνία: {meeting.date}
				<br />
				Ώρα: {meeting.time}
				<br />
				Άτομα: {meeting.people}
			</p>

			<Fab onClick={deleteClicked}>
				<DeleteIcon />
			</Fab>
		</div>
	);
}

export default Meeting;
