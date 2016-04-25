$(document).ready(function() {
	var nextRowId = 5;

	var rowForAttemptedDeletion = undefined;

	function createAndAddAssignmentToTable() {
		// Add conditionals to prevent the modal from closing 
		// when the form is invalid. Or simply use an actual form
		// which will allow one to use custom validation functions.
		var name = jQuery("#assignmentName").val();
		var totalPoints = jQuery("#totalPoints").val();
		var sallyPointsEarned = jQuery("#sallyPointsEarned").val();
		var samPointsEarned = jQuery("#samPointsEarned").val();
		var alliePointsEarned = jQuery("#alliePointsEarned").val();
		var jonPointsEarned = jQuery("#jonPointsEarned").val();

		// if (!(name && totalPoints && sallyPointsEarned && samPointsEarned && alliePointsEarned && jonPointsEarned))
		// 	return;

		var visibleRow = jQuery("<tr />", { id : "row-" + nextRowId });
		var deleteCol =
		'<td>' +
		  '<a href="#" data-toggle="modal" data-target="#deleteRowModal" data-row-index="' + nextRowId +'">' +
		    '<button type="button" class="btn btn-danger btn-xs" style="border-radius: 50%; width:35px; height: 35px;">' +
		      '<span class="glyphicon glyphicon-minus" style="font-size: 20px;"></span>' +
		    '</button>' +
		  '</a>' +
		'</td>';
		var nameCol = '<td class="name" style="text-align: center;">' + name +'</td>';
		var dropdownCol =
		'<td>' +
		  '<button id="expand-' + nextRowId +'" data-expanded="0" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style="padding: 4px; margin: 8 0 0 16;">' +
		    '<span class="caret"></span>' +
		  '</button>' +
		'</td>';
		visibleRow.append(deleteCol).append(nameCol).append(dropdownCol);

		var expandedRow = jQuery("<tr />", { id : "expanded-" + nextRowId, style : "display:none;" });
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
              '<td class="grade"><input type="text" name="grade" value="' + sallyPointsEarned +'" style="width:100%;"></td>' +
              '<td class="totalPoints">' + totalPoints +'</td>' +
            '</tr>' +
            '<tr>' +
              '<td></td>' +
              '<td class="student">Sam Smith</td>' +
              '<td class="grade"><input type="text" name="grade" value="' + samPointsEarned +'" style="width:100%;"></td>' +
              '<td class="totalPoints">' + totalPoints +'</td>' +
            '</tr>' +
            '<tr>' +
              '<td></td>' +
              '<td class="student">Allie Baker</td>' +
              '<td class="grade"><input type="text" name="grade" value="' + alliePointsEarned +'" style="width:100%;"></td>' +
              '<td class="totalPoints">' + totalPoints +'</td>' +
            '</tr>' +
            '<tr>' +
              '<td></td>' +
              '<td class="student">Jon Farmer</td>' +
              '<td class="grade"><input type="text" name="grade" value="' + jonPointsEarned +'" style="width:100%;"></td>' +
              '<td class="totalPoints">' + totalPoints +'</td>' +
            '</tr>' +
          '</table>' +
        '</td>';
		var script = 
		'<script type="text/javascript">' +
          'jQuery( "#expand-' + nextRowId +'" ).click(function() {' +
            'var buttonElement = jQuery(this);' +
            'if (buttonElement.data("expanded") == ' + nextRowId +') {' +
              'jQuery( "#expanded-' + nextRowId +'" ).slideUp( "slow", function() {' +
                'buttonElement.data("expanded", "0");' +
              '});' +
            '} else {' +
              'jQuery( "#expanded-' + nextRowId +'" ).slideDown( "slow", function() {' +
                'buttonElement.data("expanded", "1");' +
              '});' +
            '}' +
          '});' +
        '</script>';
        expandedRow.append(expandableTable).append(script);
        jQuery("#assignmentTable").append(visibleRow).append(expandedRow);
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
    	createAndAddAssignmentToTable();
    });
});