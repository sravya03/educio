$(document).ready(function() {
	localStorage.setItem("uploadedFilesContent", "");

	function getNextRowId() {
		return Math.random()*10000;
	}

	var rowForAttemptedDeletion = undefined;

	function maybeInitAgendaNotes() {
	    if (!localStorage.getItem("agendaNotes")) {
	      localStorage.setItem("agendaNotes", JSON.stringify({}));

	      var notes = {
	        id: getNextRowId(),
	        name: "Notes",
	        notes: "These are some notes.",
	        uploadedFilesContent: '<a href="#">FileName</a><br>'
	      };
	      createAndAddAgendaNoteToTable(notes, true);
	    } else {
	      var agendaNotes = JSON.parse(localStorage.getItem("agendaNotes"));
	      for (var agendaId in agendaNotes) {
			  if (agendaNotes.hasOwnProperty(agendaId)) {
			    createAndAddAgendaNoteToTable(agendaNotes[agendaId], false);
			  }
		  }
	    }
  	}

  	function getAddAgendaNoteFormValues(idFunction) {
	    // Add conditionals to prevent the modal from closing 
	    // when the form is invalid. Or simply use an actual form
	    // which will allow one to use custom validation functions.
	    return {
	      id : idFunction(),
	      name : jQuery("#agendaNoteName").val(),
	      notes : jQuery("#notesTextArea").val(),
	      uploadedFilesContent : localStorage.getItem("uploadedFilesContent")
	    };
	  }
	
	function createAndAddAgendaNoteToTable(params, addToStorage) {
		var row = jQuery("<tr />", { id : "row-" + params.id });

		/********** Delete Column *************/
		var deleteOpCol = jQuery("<td />", { class : "delete" });
		var anchorForDelete = jQuery("<a />", {
			href : "#",
			"data-toggle" : "modal",
			"data-target" : "#deleteRowModal",
			"data-row-index" : params.id
		});
		var deleteBtn = jQuery("<button />", {
			class : "btn btn-danger btn-xs",
			type : "button",
			style :  "border-radius: 50%; width:35px; height: 35px;"
		});
		var deleteSign = jQuery("<span />", { class : "glyphicon glyphicon-minus" });

		/************* Name Column *************/
		var nameCol = jQuery("<td />").html(params.name);
		
		/*********** Dropdown Column ***********/
		var dropdownCol = jQuery("<td />");
		var dropdownBtn = jQuery("<button />", {
			id : 'expand-' + params.id,
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
		 '<tr id="expanded-' + params.id + '" style="display:none;">' +
          			'<td colspan="4">' +
           				'<table class="table">' +
              				'<tr>' +
              					'<div id="agendaItem" class="col-md-offset-2 col-md-9">' +
	                				'<h3>Notes: </h3>' +
	                				'<p>' + params.notes + '</p>' +
	                				'<h3>Document: </h3> ' +
	                				params.uploadedFilesContent +
                				'</div>	' +
                			'</tr>' +
            			'</table>' +
          			'</td>' +
			          '<script type="text/javascript">' +
			            'jQuery( "#expand-' + params.id + '" ).click(function() {' +
			              'var buttonElement = jQuery(this);' +
			              'if (buttonElement.data("expanded") == 1) {' +
			                'jQuery( "#expanded-' + params.id + '" ).slideUp( "fast", function() {' +
			                  'buttonElement.data("expanded", "0");' +
			                '});' +
			              '} else {' +
			                'jQuery( "#expanded-' + params.id + '" ).slideDown( "fast", function() {' +
			                  'buttonElement.data("expanded", "1");' +
			                '});' +
			              '}' +
			          '});' +
			          '</script>' +
        		'</tr>';
		
		jQuery("#agendNotesTable").append(row);
		jQuery("#agendNotesTable").append(subRow);

		if (addToStorage) {
			addNotesToStorage(params);
		}
	}

	function addNotesToStorage(agendaNote) {
		var agendaNotes = JSON.parse(localStorage.getItem("agendaNotes"));
		agendaNotes[agendaNote.id] = agendaNote;
		console.log(agendaNotes);
	    localStorage.setItem("agendaNotes", JSON.stringify(agendaNotes));
	}

	function removeNotesFromStorage(id) {
		var agendaNotes = JSON.parse(localStorage.getItem("agendaNotes"));
		delete agendaNotes[id];
		localStorage.setItem("agendaNotes", JSON.stringify(agendaNotes));
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
        removeNotesFromStorage(rowForAttemptedDeletion);
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
    	createAndAddAgendaNoteToTable(getAddAgendaNoteFormValues(getNextRowId), true);
    	jQuery("#addNoteModal").modal("hide");
    });

    maybeInitAgendaNotes();

});