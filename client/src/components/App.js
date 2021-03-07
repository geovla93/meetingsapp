import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Meeting from "./Meeting";
import CreateArea from "./CreateArea";

function App() {
	const [meetings, setMeetings] = React.useState([]);

	const postMeeting = async (formData) => {
		try {
			const res = await fetch(process.env.REACT_APP_FETCH_URL + "/meeting", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					firstName: formData.firstName,
					lastName: formData.lastName,
					number: formData.number,
					time: formData.time,
					people: formData.people,
				}),
			});
			if (res.status !== 200 && res.status !== 201) {
				throw new Error("Adding new meeting failed");
			}
			const resData = await res.json();
			const updateMeetings = [resData.meeting, ...meetings];
			setMeetings(updateMeetings);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteMeeting = async (id) => {
		try {
			const res = await fetch(
				process.env.REACT_APP_FETCH_URL + "/meeting/" + id,
				{
					method: "DELETE",
				}
			);
			if (res.status !== 200) {
				throw new Error("Deleting meeting failed");
			}
			await res.json();
			const updateMeetings = meetings.filter((meeting) => meeting._id !== id);
			setMeetings(updateMeetings);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteAllMeetings = async () => {
		try {
			const res = await fetch(process.env.REACT_APP_FETCH_URL + "/meeting", {
				method: "DELETE",
			});
			if (res.status !== 200) {
				throw new Error("Deleting all meetings failed");
			}
			await res.json();
			const updateMeetings = [];
			setMeetings(updateMeetings);
		} catch (err) {
			console.log(err);
		}
	};

	const getMeetings = async () => {
		try {
			const res = await fetch(process.env.REACT_APP_FETCH_URL + "/meeting", {
				method: "GET",
			});
			if (res.status !== 200) {
				throw new Error("Fetching meetings failed");
			}
			const resData = await res.json();
			setMeetings(resData.meetings);
		} catch (err) {
			console.log(err);
		}
	};

	React.useEffect(() => {
		getMeetings();
	}, []);

	return (
		<div>
			<Header onDeleteAll={deleteAllMeetings} />
			<CreateArea onAdd={postMeeting} />
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
