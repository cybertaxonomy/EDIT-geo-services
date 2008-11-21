<?php
/**
 * Error Handler
 * Returns error information to the user 
 * @author 		Tobin Bradley
 * @version 	v1.0  15 October 2007
 * @license 	http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package 	error.inc.php
 */

# Set level at which to trap errors, error handler, and script execution time limit.
error_reporting(E_ERROR);
set_error_handler('errorHandler');

# Set arguments here if you want the service to send you an error email if things go south. Note: can be extremely anoying when develoeprs are writing code.
# $err_user_name = "Your Name";
# $err_email = "your@email.address";

# Error handler function
function errorHandler($errno, $errstr ,$errfile, $errline, $errcontext)
{
    # capture some additional information
    $agent       = $_SERVER['HTTP_USER_AGENT'];
	$ip          = $_SERVER['REMOTE_ADDR'];
	$referrer 	 = $_SERVER['HTTP_REFERER'];
    $dt 		 = date("Y-m-d H:i:s (T)");
    
    # grab email info if available
    global $err_email, $err_user_name;

    # email error information to maintainer if maintainer info is set
    if (isset($err_user_name) && isset($err_email)) {
	    require_once("../inc/phpmailer/class.phpmailer.php");
		$mail = new PHPMailer();
		$mail->FromName = "REST Web Services"; 
		$mail->From = $err_user_name;
		# Tailor the next five lines to your SMTP setup.
		#$mail->Host     = "your.smtp.server";
		#$mail->Username = "username";
		#$mail->Password = "password";
		#$mail->Mailer   = "smtp";
		#$mail->SMTPAuth = true;
		$mail->Subject = "REST Service Error Message";
		$mail->ContentType = "text/html";
	    $body  = "<p><u>REST Service Error Message</u></p><br />";
	    $body .= "<p><b>Error Information</b><br />";
	    $body .= "Date: " . $dt . "<br />";
	    $body .= "Error Number: " . $errno . "<br />";
	    $body .= "Error Description: " . $errstr . "<br />";
	    $body .= "Query String: " . $_SERVER['QUERY_STRING'] . "<br />";
	    $body .= "Error File: " . $errfile . "<br />";
	    $body .= "Error Line: " . $errline . "<br /><br /></p>";

	    # Enable context dump for serious debugging. Otherwise, it's just too much crap.
	    # ob_start();
	    # var_dump($errcontext);
	    # $context = ob_get_contents();
	    # ob_end_clean();
	    # $body .= "Variable Dump: " . $context . "<br /><br /></p>";
		
	    $body .= "<p><b>User Information</b><br />";
	    $body .= "User Address: " . $ip . "<br />";
	    $body .= "User Agent: " . $agent . "<br />";
	    $body .= "Referring Page: " . $referrer . "</p>";
	    $mail->Body    = $body;
	    $mail->AddAddress($err_email, $err_user_name);
	    # disable next line to stop getting emails
	    $mail->Send();
	    $mail->ClearAddresses();
	    $mail->ClearAttachments();
    }
		    
    
	# Write error message to user with less details
	$xmldoc = new DomDocument('1.0');
	$xmldoc->formatOutput = true;
	# Set root
	$root = $xmldoc->createElement("error_handler");
	$root = $xmldoc->appendChild($root);
	# Set child 
	$occ = $xmldoc->createElement("error");
  	$occ = $root->appendChild($occ);
  	# Write error message		
  	$child = $xmldoc->createElement("error_message");
  	$child = $occ->appendChild($child);
  	$fvalue = $xmldoc->createTextNode("Your request has returned an error: ".$errstr);
    $fvalue = $child->appendChild($fvalue);
	$xml_string = $xmldoc->saveXML();
	echo $xml_string;
		

	# exit request
	exit;
}

?>