<?php
$errors = [];
$errorMessage = '';

if (!empty($_POST)) {
    // Get variables from AJAX request
    $first_name = $_POST['firstName'];
    $second_name = $_POST['secondName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Check for empty fields
    if (empty($first_name)) {
        $errors[] = 'First name is empty';
    }

    if (empty($second_name)) {
        $errors[] = 'First name is empty';
    }

    if (empty($email)) {
        $errors[] = 'Email is empty';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email is invalid';
    }

    if (empty($phone)) {
        $errors[] = 'Phone number is empty';
    }

    if (empty($message)) {
        $errors[] = 'Message is empty';
    }

    // Send the e-mail
    if (empty($errors)) {
        $toEmail = 'edgar.nightingale@btinternet.com';
        $emailSubject = 'New email from your contact form';
        $headers = ['From' => $email, 'Reply-To' => $email, 'Content-type' => 'text/html; charset=iso-8859-1'];

        $bodyParagraphs = [
            "First Name: {$first_name}",
            "Second Name: {$second_name}",
            "Phone Number: {$number}",
            "Email: {$email}",
            "Message:", $message
        ];
        $body = join(PHP_EOL, $bodyParagraphs);

        if (mail($toEmail, $emailSubject, $body, $headers)) {
            header('Location: thank-you.html');
        } else {
            $errorMessage = 'Oops, something went wrong. Please try again later';
        }
    } else {
        $allErrors = join('<br/>', $errors);
        $errorMessage = "<p style='color: red;'>{$allErrors}</p>";
    }
}