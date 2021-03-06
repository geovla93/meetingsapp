import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Meeting from "./Meeting";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
	const [meetings, setMeetings] = React.useState([]);

	function deleteAllMeetings() {
		axios
			.delete("https://athletes-foot.herokuapp.com/deleteall")
			.then((res) => {
				console.log(res);
				setMeetings([]);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function deleteMeeting(id) {
		axios
			.delete(`https://athletes-foot.herokuapp.com/delete/${id}`)
			.then((res) => {
				console.log(res);
				setMeetings((prevMeetings) => {
					return prevMeetings.filter((meeting) => {
						return id !== meeting._id;
					});
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function getMeetings() {
		axios
			.get("https://athletes-foot.herokuapp.com/")
			.then((res) => {
				setMeetings(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	React.useEffect(() => {
		getMeetings();
	}, []);

	return (
		<div>
			<Header onDeleteAll={deleteAllMeetings} />
			<CreateArea onAdd={getMeetings} />
			{meetings.map((meeting) => {
				return (
					<Meeting
						key={meeting._id}
						meeting={meeting}
						onDelete={deleteMeeting}
					/>
				);
			})}
			<Footer />
		</div>
	);
}

export default App;
