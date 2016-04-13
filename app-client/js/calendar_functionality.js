$(document).ready(function() {

	var monthNames = {
		m01: 'January',
		m02: 'February',
		m03: 'March',
		m04: 'April',
		m05: 'May',
		m06: 'June',
		m07: 'July',
		m08: 'August',
		m09: 'September',
		m10: 'October',
		m11: 'November',
		m12: 'December'
	};

	var offsetMonthNames = {
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

	function setTodaysMonth() {
		var todaysDate = new Date();
		var todaysMonth = offsetMonthNames['m'+todaysDate.getMonth()];
		jQuery('#today-date').text(todaysMonth);
	};

	function attachCalCellHandlers() {
		jQuery('.cal-cell').click(function(evt) {
			var selectedDate = jQuery('[data-cal-date]', this).data('cal-date').split('-');
			var selectedYear = selectedDate[0];
			var selectedMonth = monthNames['m'+selectedDate[1]];
			var selectedDay = selectedDate[2];
			window.location.href = "agenda/" + selectedMonth + "/" + selectedDay + "/" + selectedYear;
		});
	};

	attachCalCellHandlers();
	setTodaysMonth();
});