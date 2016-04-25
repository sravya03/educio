$(document).ready(function() {
	localStorage.setItem("uploadedFilesContent", "");

	var nextRowId = 2;

	var rowForAttemptedDeletion = undefined;
	
	function createAndAddAgendaNoteToTable(name) {
		var row = jQuery("<tr />", { id : "row-" + nextRowId });

		/********** Delete Column *************/
		var deleteOpCol = jQuery("<td />", { class : "delete" });
		var anchorForDelete = jQuery("<a />", {
			href : "#",
			"data-toggle" : "modal",
			"data-target" : "#deleteRowModal",
			"data-row-index" : nextRowId
		});
		var deleteBtn = jQuery("<button />", {
			class : "btn btn-danger btn-xs",
			type : "button",
			style :  "border-radius: 50%; width:35px; height: 35px;"
		});
		var deleteSign = jQuery("<span />", { class : "glyphicon glyphicon-minus" });

		/************* Name Column *************/
		var nameCol = jQuery("<td />").html(name);
		
		/*********** Dropdown Column ***********/
		var dropdownCol = jQuery("<td />");
		var dropdownBtn = jQuery("<button />", {
			id : 'expand-' + nextRowId,
			class : "btn btn-primary dropdown-toggle",
			type : "button",
			"data-toggle" : "dropdown",
			style :  "padding: 4px; margin: 8 0 0 16;"
		});
		var dropdownCaret = jQuery("<span />", { class : "caret" });

		/************* Build Row ****************/
		row.append(deleteOpCol.append(anchorForDelete.append(deleteBtn.append(deleteSign))))
		   .append(nameCol)
		   .append(dropdownCol.append(dropdownBtn.append(dropdownCaret)));

		 var notes = jQuery("#notesTextArea").val();
		 var uploadedFilesContent = localStorage.getItem("uploadedFilesContent");
		 var subRow =
		 '<tr id="expanded-' + nextRowId + '" style="display:none;">' +
          			'<td colspan="4">' +
           				'<table class="table">' +
              				'<tr>' +
              					'<div id="agendaItem" class="col-md-offset-2 col-md-9">' +
	                				'<h3>Notes: </h3>' +
	                				'<p>' + notes + '</p>' +
	                				'<h3>Document: </h3> ' +
	                				uploadedFilesContent +
                				'</div>	' +
                			'</tr>' +
            			'</table>' +
          			'</td>' +
			          '<script type="text/javascript">' +
			            'jQuery( "#expand-' + nextRowId + '" ).click(function() {' +
			              'var buttonElement = jQuery(this);' +
			              'if (buttonElement.data("expanded") == 1) {' +
			                'jQuery( "#expanded-' + nextRowId + '" ).slideUp( "slow", function() {' +
			                  'buttonElement.data("expanded", "0");' +
			                '});' +
			              '} else {' +
			                'jQuery( "#expanded-' + nextRowId + '" ).slideDown( "slow", function() {' +
			                  'buttonElement.data("expanded", "1");' +
			                '});' +
			              '}' +
			          '});' +
			          '</script>' +
        		'</tr>';
		
		jQuery("#agendNotesTable").append(row);
		jQuery("#agendNotesTable").append(subRow);

		nextRowId++;
	}

	function clearAddNoteModal() {
		jQuery("#agendaNoteName").val("");
		jQuery("#notesTextArea").val("");
		jQuery("#addAgendaDocList").empty();
	}

	jQuery('#deleteRowModal').on('show.bs.modal', function(e) {
		rowForAttemptedDeletion = parseInt(jQuery(e.relatedTarget).data('rowIndex'));
	});

	jQuery('#addNoteModal').on('hidden.bs.modal', function () {
	  	clearAddNoteModal();
	});

	jQuery('#deleteRowConfirmationBtn').on("click", function(){
        console.log(rowForAttemptedDeletion);
        jQuery('#row-' + rowForAttemptedDeletion).remove();
        jQuery('#expanded-' + rowForAttemptedDeletion).remove();
        jQuery("#deleteRowModal").modal('hide');
    });

  	jQuery('#confirm-delete').on('show.bs.modal', function(e) {
        jQuery(this).find('.btn-ok').attr('href', jQuery(e.relatedTarget).data('href'));
  	});

    jQuery("#deleteClick").click(function() {
        jQuery("#agendNotesTable tr").remove();
        jQuery("#confirm-delete").modal('hide');
    });

    jQuery("#addAgendaNoteBtn").click(function() {
    	jQuery("#hiddenAddAgendaItemBtn").trigger("click");
    });

    jQuery("#addAgendaNoteForm").submit(function(e) {
    	e.preventDefault();
    	var name = jQuery("#agendaNoteName").val();
    	createAndAddAgendaNoteToTable(name);
    	jQuery("#addNoteModal").modal("hide");
    });
});