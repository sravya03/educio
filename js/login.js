$(document).ready(function() {
	jQuery('#login-form').submit(function(evt) {
		evt.preventDefault();
		var users = JSON.parse(localStorage.getItem('users'));
		var email = jQuery('#inputEmail').val()
		var pwd = jQuery('#inputPassword').val();
		var user = users[email];
		if (user && user.password == pwd) {
			localStorage.setItem('currentUser', JSON.stringify(user));
			window.location.href = "home.html";
		}
	});
});