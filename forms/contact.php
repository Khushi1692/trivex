<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader if you're using Composer
// require 'vendor/autoload.php';

// Or include PHPMailer manually
require 'mailer/PHPMailer.php';
require 'mailer/SMTP.php';
require 'mailer/Exception.php';

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'smileme1692@gmail.com'; // Your Gmail address
    $mail->Password   = 'Khushi@1692'; // Gmail App Password (not your regular password)
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom($_POST['email'], $_POST['name']);
    $mail->addAddress('smileme1692@gmail.com', 'Your Name');

    // Content
    $mail->isHTML(true);
    $mail->Subject = $_POST['subject'];
    $mail->Body    = "
        <h3>New Message from Contact Form</h3>
        <p><strong>Name:</strong> " . htmlspecialchars($_POST['name']) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($_POST['email']) . "</p>
        <p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($_POST['message'])) . "</p>
    ";

    $mail->send();
    echo 'Your message has been sent. Thank you!';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
