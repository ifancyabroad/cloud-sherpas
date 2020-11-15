$(document).ready(function() {

	// Variable to hold request
    let request;;

	// Add submit event listener to the form
	$('#contact').submit(function(e) {
        e.preventDefault();

         // Abort any pending request
        if (request) {
            request.abort();
        }
        
        const responseContainer = $('#responseContainer');
        const form =$(this);
        const inputs = contactForm.find("input, button, textarea");

		// Serialise the form data
		const serializedData = form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        inputs.prop('disabled', true);

		// Send AJAX request
		request = $.ajax({
			url: '../mail.php',
			type: 'POST',
			data: serializedData
		});

		// Display thank you message if request sent successfully
	    request.done(function (response, textStatus, jqXHR){
	        responseContainer.html(response);
	    });

	    // Inform user if message fails to send
	    request.fail(function (jqXHR, textStatus, errorThrown){
	       	responseContainer.html('<p class="text-danger mt-3">Sorry there was an error sending your message, please e-mail me directly at <a href="mailto:edgar.nightingale@btinternet.com" class="email">edgar.nightingale@btinternet.com</a> instead.</p>');
	        // Log the error to the console
	        console.error("The following error occurred: " + textStatus, errorThrown);
        });
        
        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });
    });
});