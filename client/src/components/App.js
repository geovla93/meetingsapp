import React from "react";
import Header from "./Header";
import Meeting from "./Meeting";
import CreateArea from "./CreateArea";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
	const [meetings, setMeetings] = React.useState([]);

	const postMeeting = (formData) => {
		axios.post("/api/meetings", formData).then(() => {
			setMeetings((prevMeetings) => {
				return [...prevMeetings, formData];
			});
		});
	};

	const removeMeeting = (id) => {
		axios.delete("/api/meetings/" + id).then((res) => {
			setMeetings((prevMeetings) => {
				return prevMeetings.filter((meeting) => {
					return id !== meeting._id;
				});
			});
		});
	};

	const removeAllMeetings = () => {
		axios.delete("/api/meetings").then((res) => {
			setMeetings([]);
		});
	};

	const loadMeetings = () => {
		axios.get("/api/meetings").then((res) => {
			const allMeetings = res.data;
			setMeetings(allMeetings);
		});
	};

	React.useEffect(() => {
		loadMeetings();
	}, []);

	return (
		<div>
			<Header onDeleteAll={removeAllMeetings} />
			<CreateArea onAdd={postMeeting} />
			<Container fluid>
				<Row>
					{meetings.map((meeting) => {
						return (
							<Col xs={3}>
								<Meeting
									key={meeting._id}
									meeting={meeting}
									onDelete={removeMeeting}
								/>
							</Col>
						);
					})}
				</Row>
			</Container>
		</div>
	);
}

export default App;
