import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import axios from "axios";

function CreateArea(props) {
	const [meeting, setMeeting] = React.useState({
		firstName: "",
		lastName: "",
		number: Number,
		time: "",
	});

	function updateMeeting(e) {
		const { name, value } = e.target;
		setMeeting((prevMeeting) => {
			return { ...prevMeeting, [name]: value };
		});
	}

	function submitMeeting(e) {
		e.preventDefault();

		const meetingObject = {
			firstName: meeting.firstName,
			lastName: meeting.lastName,
			number: meeting.number,
			time: meeting.time,
		};

		axios
			.post(process.env.REACT_APP_FETCH_URL + "/meetings/create", meetingObject)
			.then((res) => {
				console.log(res.data);
				props.onAdd();
				setMeeting({
					firstName: "",
					lastName: "",
					number: Number,
					time: "",
				});
			})
			.catch((err) => {
				console.log(err);
			});
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
					value={meeting.time}
					name="time"
					placeholder="Ώρα"
				/>
				<Fab type="submit" onClick={submitMeeting}>
					<AddIcon />
				</Fab>
			</form>
		</div>
	);
}

export default CreateArea;
