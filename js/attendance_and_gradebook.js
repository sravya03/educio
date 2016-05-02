$(document).ready(function() {

	function storeNewField(row, field, value) {
		var i = row - 1;
		
		var gradebook = JSON.parse(localStorage.getItem("gradebook"));
		gradebook.table[i][field] = value;
		localStorage.setItem("gradebook", JSON.stringify(gradebook));
	}

	function setUpGradebook() {
		var gradebookInit = {
			table: 
			[
			{
				row: 1,
				attendance: "present",
				functionsHW: 10,
				examOne: 90
			},
			{
				row: 2,
				attendance: "present",
				functionsHW: 10,
				examOne: 90			
			},
			{
				row: 3,
				attendance: "present",
				functionsHW: 10,
				examOne: 90
			},
			{
				row: 4,
				attendance: "present",
				functionsHW: 10,
				examOne: 90
			},
			{
				row: 5,
				attendance: "present",
				functionsHW: 10,
				examOne: 90
			},
			{
				row: 6,
				attendance: "present",
				functionsHW: 10,
				examOne: 90
			},
			{
				row: 7,
				attendance: "present",
				functionsHW: 10,
				examOne: 90
			},
			{
				row: 8,
				attendance: "present",
				functionsHW: 10,
				examOne: 90
			}
			]
		};

		if (!localStorage.getItem("gradebook")) {
      		localStorage.setItem("gradebook", JSON.stringify(gradebookInit));
  		}

  		//initialize all values
  		var studentTable = JSON.parse(localStorage.getItem("gradebook")).table;
  		for(var student of studentTable) {
  			var row = student.row;

  			jQuery('#attendance' + row).val(student.attendance);
  			jQuery('#fn_hw_' + row).val(student.functionsHW);
  			jQuery('#exam_one_' + row).val(student.examOne);
  		}
	}

	jQuery('input').focusout(function(e) {
		var eltID = e.target.id;
		var row = eltID.slice(-1);
		var value = jQuery(this).val();

		if(eltID.slice(0, 5) === "fn_hw") {
			storeNewField(row, "functionsHW", value);
		} else {
			storeNewField(row, "examOne", value);
		}
	});

	jQuery('select').change(function(e) {
		var eltID = e.target.id;
		var row = eltID.slice(-1);
		var value = jQuery(this).val();

		storeNewField(row, "attendance", value);
	});

	setUpGradebook();
});