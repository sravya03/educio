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
		var todaysCell = jQuery('.cal-day-today');
		var todaysDate = new Date(jQuery('[data-cal-date]', todaysCell).data('cal-date'));
		var todaysYear = todaysDate.getFullYear();
		var todaysMonth = monthNames['m'+todaysDate.getMonth()];
		var todaysDay = todaysDate.getDay();
		jQuery('#today-date').text(todaysMonth + " " + todaysDay + ", " + todaysYear);
	};

	function attachCalCellHandlers() {
		jQuery('.cal-cell').click(function(evt) {
			var selectedDate = new Date(jQuery('[data-cal-date]', this).data('cal-date'));
			var selectedYear = selectedDate.getFullYear();
			var selectedMonth = monthNames['m'+selectedDate.getMonth()];
			var selectedDay = selectedDate.getDay();
			window.location.href = "agenda/" + selectedMonth + "/" + selectedDay + "/" + selectedYear;
		});
	};

	attachCalCellHandlers();
	setTodaysDate();
});