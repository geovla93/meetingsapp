import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

function CreateArea(props) {
	const userInfo = {
		firstName: "",
		lastName: "",
		number: Number,
		date: Date,
		time: "",
		people: Number,
	};
	const [meeting, setMeeting] = React.useState(userInfo);

	function updateMeeting(e) {
		const { name, value } = e.target;
		setMeeting((prevMeeting) => {
			return { ...prevMeeting, [name]: value };
		});
	}

	function submitMeeting(e) {
		e.preventDefault();
		props.onAdd(meeting);
		setMeeting(userInfo);
	}

	return (
		<div>
			<form className="create-meeting">
				<input
					onChange={updateMeeting}
					value={meeting.firstName}
					name="firstName"
					placeholder="Όνομα"
				/>
				<input
					onChange={updateMeeting}
					value={meeting.lastName}
					name="lastName"
					placeholder="Επίθετο"
				/>
				<input
					type="tel"
					pattern="[0-9]{10}"
					onChange={updateMeeting}
					value={meeting.number}
					name="number"
					placeholder="Κινητό"
				/>
				<input
					onChange={updateMeeting}
					value={meeting.date}
					name="date"
					placeholder="Ημερομηνία"
				/>
				<input
					onChange={updateMeeting}
					value={meeting.time}
					name="time"
					placeholder="Ώρα"
				/>
				<input
					type="number"
					onChange={updateMeeting}
					value={meeting.people}
					name="people"
					placeholder="Άτομα"
				/>
				<Fab type="submit" onClick={submitMeeting}>
					<AddIcon />
				</Fab>
			</form>
		</div>
	);
}

export default CreateArea;
