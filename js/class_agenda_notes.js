$(document).ready(function() {
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
		
		jQuery("#agendNotesTable").append(row);

		nextRowId++;
	}

	function refreshAddNoteModal() {
		jQuery("#agendaNoteName").val("");
		jQuery("#notesTextArea").val("");
		jQuery("#addAgendaDocList").empty();
	}

	jQuery('#deleteRowModal').on('show.bs.modal', function(e) {
		rowForAttemptedDeletion = parseInt(jQuery(e.relatedTarget).data('rowIndex'));
	});

	jQuery('#deleteRowConfirmationBtn').on("click", function(){
        console.log(rowForAttemptedDeletion);
        jQuery('#row-' + rowForAttemptedDeletion).remove();
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
    	refreshAddNoteModal();
    });
});