$(document).ready(function() {

	var monthNames = {
		m0: 'January',
		m1: 'February',
		m2: 'March',
		m3: 'April',
		m4: 'May',
		m5: 'June',
		m6: 'July',
		m7: 'August',
		m8: 'September',
		m9: 'October',
		m10: 'November',
		m11: 'December'
	};

	function setTodaysDate() {
		var todaysDate = new Date();
		var todaysMonth = monthNames['m'+todaysDate.getMonth()];
		var todaysDay = todaysDate.getDate();
		var todaysYear = todaysDate.getFullYear();
		jQuery('#today-date').text(todaysMonth + " " + todaysDay + ", " + todaysYear);
	};

	setTodaysDate();
});