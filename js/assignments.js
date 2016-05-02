$(document).ready(function() {
	var nextRowId = 5;

	var rowForAttemptedDeletion = undefined;

  function maybeInitAssignments() {
    if (!localStorage.getItem("assignments")) {
      var assignments = [];

      var triangleHomework = {
        id: nextRowId,
        name: "Triangle Homework",
        totalPoints: 10,
        sallyPointsEarned: 9,
        samPointsEarned: 9,
        alliePointsEarned: 8,
        jonPointsEarned: 5
      };
      createAndAddAssignmentToTable(triangleHomework);
      assignments.push(triangleHomework);
      nextRowId++;

      var factorization = {
        id: nextRowId,
        name: "Factorization",
        totalPoints: 10,
        sallyPointsEarned: 9,
        samPointsEarned: 9,
        alliePointsEarned: 8,
        jonPointsEarned: 5
      };
      createAndAddAssignmentToTable(factorization);
      assignments.push(factorization);
      nextRowId++;

      var multiplication = {
        id: nextRowId,
        name: "Multiplication",
        totalPoints: 10,
        sallyPointsEarned: 9,
        samPointsEarned: 9,
        alliePointsEarned: 8,
        jonPointsEarned: 5
      };
      createAndAddAssignmentToTable(multiplication);
      assignments.push(multiplication);
      nextRowId++;

      var examOne = {
        id: nextRowId,
        name: "Exam One",
        totalPoints: 100,
        sallyPointsEarned: 90,
        samPointsEarned: 90,
        alliePointsEarned: 80,
        jonPointsEarned: 50
      };
      createAndAddAssignmentToTable(examOne);
      assignments.push(examOne);
      nextRowId++;

      localStorage.setItem("assignments", JSON.stringify(assignments));
    } else {
      var assignments = JSON.parse(localStorage.getItem("assignments"));
      assignments.forEach(function(assignment) {
        createAndAddAssignmentToTable(assignment);
      });
    }
  }

  function getAddAssignmentFormValues(id) {
    // Add conditionals to prevent the modal from closing 
    // when the form is invalid. Or simply use an actual form
    // which will allow one to use custom validation functions.
    return {
      id : id,
      name : jQuery("#assignmentName").val(),
      totalPoints : jQuery("#totalPoints").val(),
      sallyPointsEarned : jQuery("#sallyPointsEarned").val(),
      samPointsEarned : jQuery("#samPointsEarned").val(),
      alliePointsEarned : jQuery("#alliePointsEarned").val(),
      jonPointsEarned : jQuery("#jonPointsEarned").val()
    };
  }

	function createAndAddAssignmentToTable(params) {
		var visibleRow = jQuery("<tr />", { id : "row-" + params.id });
		var deleteCol =
		'<td>' +
		  '<a href="#" data-toggle="modal" data-target="#deleteRowModal" data-row-index="' + params.id +'">' +
		    '<button type="button" class="btn btn-danger btn-xs" style="border-radius: 50%; width:35px; height: 35px;">' +
		      '<span class="glyphicon glyphicon-minus" style="font-size: 20px;"></span>' +
		    '</button>' +
		  '</a>' +
		'</td>';
		var nameCol = '<td class="name" style="text-align: center;">' + params.name +'</td>';
		var dropdownCol =
		'<td>' +
		  '<button id="expand-' + params.id +'" data-expanded="0" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style="padding: 4px; margin: 8 0 0 16;">' +
		    '<span class="caret"></span>' +
		  '</button>' +
		'</td>';
		visibleRow.append(deleteCol).append(nameCol).append(dropdownCol);

		var expandedRow = jQuery("<tr />", { id : "expanded-" + params.id, style : "display:none;" });
		var expandableTable =
        '<td colspan="4">' +
          '<table class="table">' +
            '<tr>' +
              '<th></th>' +
              '<th>Student</th>' +
              '<th>Grade</th>' +
              '<th>Total Points</th>' +
            '</tr>' +
            '<tr>' +
              '<td></td>' +
              '<td class="student">Sally Brown</td>' +
              '<td class="grade"><input type="text" name="grade" value="' + params.sallyPointsEarned +'" style="width:100%;"></td>' +
              '<td class="totalPoints">' + params.totalPoints +'</td>' +
            '</tr>' +
            '<tr>' +
              '<td></td>' +
              '<td class="student">Sam Smith</td>' +
              '<td class="grade"><input type="text" name="grade" value="' + params.samPointsEarned +'" style="width:100%;"></td>' +
              '<td class="totalPoints">' + params.totalPoints +'</td>' +
            '</tr>' +
            '<tr>' +
              '<td></td>' +
              '<td class="student">Allie Baker</td>' +
              '<td class="grade"><input type="text" name="grade" value="' + params.alliePointsEarned +'" style="width:100%;"></td>' +
              '<td class="totalPoints">' + params.totalPoints +'</td>' +
            '</tr>' +
            '<tr>' +
              '<td></td>' +
              '<td class="student">Jon Farmer</td>' +
              '<td class="grade"><input type="text" name="grade" value="' + params.jonPointsEarned +'" style="width:100%;"></td>' +
              '<td class="totalPoints">' + params.totalPoints +'</td>' +
            '</tr>' +
          '</table>' +
        '</td>';
		var script = 
		'<script type="text/javascript">' +
          'jQuery( "#expand-' + params.id +'" ).click(function() {' +
            'var buttonElement = jQuery(this);' +
            'if (buttonElement.data("expanded") == 1) {' +
              'jQuery( "#expanded-' + params.id +'" ).slideUp( "slow", function() {' +
                'buttonElement.data("expanded", "0");' +
              '});' +
            '} else {' +
              'jQuery( "#expanded-' + params.id +'" ).slideDown( "slow", function() {' +
                'buttonElement.data("expanded", "1");' +
              '});' +
            '}' +
          '});' +
        '</script>';
        expandedRow.append(expandableTable).append(script);
        jQuery("#assignmentTable").append(visibleRow).append(expandedRow);
        setupGradeUpdateTrigger();
	}

	function clearAddAssignmentModal() {
		jQuery("#assignmentName").val("");
		jQuery("#totalPoints").val("");
		jQuery("#sallyPointsEarned").val("");
		jQuery("#samPointsEarned").val("");
		jQuery("#alliePointsEarned").val("");
		jQuery("#jonPointsEarned").val("");
	}

  jQuery('#addAssignmentModal').on('show.bs.modal', function(e) {
    clearAddAssignmentModal();
  });

	jQuery('#deleteRowModal').on('show.bs.modal', function(e) {
		rowForAttemptedDeletion = parseInt(jQuery(e.relatedTarget).data('rowIndex'));
	});

	jQuery('#deleteRowConfirmationBtn').on("click", function() {
        console.log(rowForAttemptedDeletion);
        jQuery('#row-' + rowForAttemptedDeletion).remove();
        jQuery('#expanded-' + rowForAttemptedDeletion).remove();
        jQuery("#deleteRowModal").modal('hide');
  });

	jQuery('#confirm-delete').on('show.bs.modal', function(e) {
      jQuery(this).find('.btn-ok').attr('href', jQuery(e.relatedTarget).data('href'));
	});

  jQuery("#deleteClick").click(function() {
      jQuery("#assignmentTable tr").remove();
      jQuery("#confirm-delete").modal('hide');
  });

  jQuery("#addAssignmentBtn").click(function() {
  	createAndAddAssignmentToTable(getAddAssignmentFormValues(nextRowId));
    nextRowId++;
  });

  function setupGradeUpdateTrigger() {
    jQuery( ".grade" ).change(function() {
      jQuery('#confirmGradeUpdate').modal('show'); 
    });
  }

  maybeInitAssignments();
  setupGradeUpdateTrigger();
});