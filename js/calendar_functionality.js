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

	var calendar = jQuery("#calendar").calendar(
	{
        tmpl_path: "../third_party/bootstrap-calendar/tmpls/",
        events_source: function () { return []; }
    }); 

    function attachNextMonthBtn() {
    	var nextMonthBtn = jQuery('#nextMonthBtn').click(function() {
    		calendar.navigate('next');
    		attachCalCellHandlers();
    	});
    }

    function attachPrevMonthBtn() {
    	var prevMonthBtn = jQuery('#prevMonthBtn').click(function() {
    		calendar.navigate('prev');
    		attachCalCellHandlers();
    	});
    }

	function attachCalCellHandlers() {
		jQuery('.cal-cell').click(function(evt) {
			var selectedDate = jQuery('[data-cal-date]', this).data('cal-date').split('-');
			var selectedYear = selectedDate[0];
			var selectedMonth = monthNames['m'+selectedDate[1]];
			var selectedDay = selectedDate[2];
			localStorage.setItem('selectedDay', selectedDay);
			localStorage.setItem('selectedMonth', selectedMonth);
			localStorage.setItem('selectedYear', selectedYear);
			window.location.href = "class_agenda_notes.html";
		});
	};

	attachCalCellHandlers();
	attachPrevMonthBtn();
	attachNextMonthBtn();
});