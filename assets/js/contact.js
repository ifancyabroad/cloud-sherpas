$(document).ready(function() {

	// Variable to hold request
    let request;

	// Add submit event listener to the form
	$("#contact").submit(function(e) {
        e.preventDefault();

         // Abort any pending request
        if (request) {
            request.abort();
        }

        const form =$(this);
        const inputs = form.find("input, button, textarea");
        const submitBtn = form.find("button[type=\"submit\"]");
        const successMessage = $("successMessage");
        const errorMessage = $("errorMessage");

        // Show some response on the button
        submitBtn.prop('type','button' );
        submitBtn.prop('orig_label', submitBtn.text());
        submitBtn.text('Sending ...');

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        inputs.prop('disabled', true);

        // Serialise the form data
		const serializedData = form.serialize();

		// Send AJAX request
		request = $.ajax({
			type: 'POST',
			url: '../mail.php',
            data: serializedData,
            dataType: 'json'
        });
        
        // Display thank you message if request sent successfully
	    request.done(function (response, textStatus, jqXHR){
            form.hide();
            successMessage.show();
            errorMessage.hide();
	    });

	    // Inform user if message fails to send
	    request.fail(function (jqXHR, textStatus, errorThrown){
            inputs.prop("disabled", false);
            successMessage.hide();
            errorMessage.show();

            // Reverse the response on the button
            label = submitBtn.prop('orig_label');
            if (label) {
                submitBtn.prop('type','submit' );
                submitBtn.text(label);
                submitBtn.prop('orig_label','');
            }
        });
    });
});