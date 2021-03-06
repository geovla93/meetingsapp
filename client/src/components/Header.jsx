import React from "react";
import Button from "@material-ui/core/Button";

function Header(props) {
	function handleDelete(e) {
		e.preventDefault();
		props.onDeleteAll();
	}

	return (
		<header>
			<h1>Click Inside</h1>
			<Button variant="contained" onClick={handleDelete}>
				Διαγραφή όλων
			</Button>
		</header>
	);
}

export default Header;
