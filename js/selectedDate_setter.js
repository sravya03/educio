$(document).ready(function() {
	var day = localStorage.getItem('selectedDay');
	var month = localStorage.getItem('selectedMonth');
	var year = localStorage.getItem('selectedYear');
	jQuery('#selectedDate').text(month + ' ' + day + ', ' + year);
});