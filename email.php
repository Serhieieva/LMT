<?php

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$website = "http://www.news-spectator.com/";

if($_POST){
    $email = $_POST['email'];
	
	$to = $email;

	$subject = "Bestätigen Sie bitte Ihren News Spectator Newsletter Eintrag";
	
	$link = "http://" . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'] . "?email=" . $email . "&token=" . base64_encode($email);

	$message = <<<MSG
	<html>
		<head></head>
		<body>
			<div style="padding: 10px; color: black; font-size: 18px;">
				<p>Vielen Dank für Ihre Anmeldung beim News Spectator Newsletter und Ihr Interesse an unserer Plattform.</p>

				<p>Wir verwenden ein Double-Opt-In-Verfahren, um Sie vor einer Anmeldung durch Dritte zu schützen. 
					Klicken Sie daher bitte auf den folgenden Link, um Ihre Anmeldung zu bestätigen: 
					<strong><a href="$link">$link</a></strong>
				</p>

				<p>Sollte ein Dritter Ihre Adresse eingetragen haben und Sie haben kein Interesse an unserem Newsletter, 
					können Sie diese Nachricht einfach ignorieren. Sie werden dann nicht in unseren Verteiler aufgenommen.
				</p>

				<p>Um sicherzustellen, dass Sie unsere Newsletter direkt erhalten, empfehlen wir die Aufnahme unserer 
					E-Mail Adresse in Ihr Kontaktbuch.
				</p>

				<p>Der News Spectator ist ein Nachrichtenaggregator für politische Inhalte von öffentlichen Institutionen.
					Diese Inhalte lassen sich vom Nutzer auf mehreren Profilen personalisieren. 
					Zudem werden sämtliche Nachrichten maschinell kontextualisiert, d. h. um relevante Hintergrundinformationen
					wie Fakten zu Protagonisten und Institutionen, um wichtige Statistiken und interessante Sachbücher ergänzt.
				</p>
			</div>	
		</body>
	</html>
	
MSG;

	mail($to, $subject, $message, $headers);
}

if($_GET){
    $email = $_GET['email'];
    $token = $_GET['token'];
	
	$to = "Lukas.Luft@news-spectator.com";

	$subject = "New Subscriber for News Spectator Newsletter";
	$message = "You have a new subscriber for the News Spectator newsletter: " .$email;
	
	if(base64_decode($token) == $email) {
		mail($to, $subject, $message, $headers);
		echo <<<RDR
		<html>
		<head>
			<meta http-equiv="refresh" content="5;url=$website" />
		</head>
		<body>
			<h1>Ihre E-Mail Adresse wurde erfolgreich in den Verteiler unseres Newsletters aufgenommen. Vielen Dank für Ihr Interesse. Sie werden nun zu unserer Webseite weitergeleitet.</h1>
			<a href="$website">Go to $website</a>
		</body>
		</html>
RDR;
	} else {
		echo <<<RDR
		<html>
		<head>
			<meta http-equiv="refresh" content="5;url=$website" />
		</head>
		<body>
			<h1>Leider konnte Ihre E-Mail Adresse nicht in den Verteiler unseres Newsletters aufgenommen werden. Bitte kontaktieren Sie uns, um dieses Problem zu beheben. Sie werden nun zu unserer Webseite weitergeleitet.</h1>
			<a href="$website">Go to $website</a>
		</body>
		</html>
RDR;
	}
}
?>