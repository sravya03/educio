$(document).ready(function() {

	function setUsersName() {
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
		jQuery('#usersname').text(currentUser.firstName + " " + currentUser.lastName);
	};

	setUsersName();
});