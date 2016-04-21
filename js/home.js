$(document).ready(function() {
	var extraClasses = JSON.parse(localStorage.getItem("extraClasses"));

	/**
	  * Add any extra classes.
	  */
	extraClasses.forEach(function(className) {
		var classNavElem = jQuery('<li><a href="class_view.html">' + className +'</a></li>');
		var lastRow = jQuery('#logoutRow');
		classNavElem.insertBefore(lastRow);
	});
	/**
	  * Sets up the triggers for picking the time, ensuring
	  * the image icon has the toggle functionality in addition
	  * to the input box.
	  */
	var timepickerObj = jQuery('#timepicker1').timepicker();
    jQuery('#timer-icon').click(function() {
    	jQuery('#timepicker1').trigger('click');
    });

    /**
      * Adds handler for adding a class in the left nav after
      * submitting a class addition form.
      */
	jQuery('#addClassForm').submit(function(evt) {
		extraClasses.push(jQuery('#className').val());
		localStorage.setItem("extraClasses", JSON.stringify(extraClasses));
	});
});