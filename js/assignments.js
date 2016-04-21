$(document).ready(function() {
	var rowId = 5;

	var rowForAttemptedDeletion = undefined;

	$('#deleteRowModal').on('show.bs.modal', function(e) {
		rowForAttemptedDeletion = parseInt($(e.relatedTarget).data('rowIndex'));
	});

	$('#deleteRowConfirmationBtn').on("click", function(){
        console.log(rowForAttemptedDeletion);
        $('#row-' + rowForAttemptedDeletion).remove();
        $("#deleteRowModal").modal('hide');
    });
});