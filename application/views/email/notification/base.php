<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title></title>

	<style>

		table td {border-collapse: collapse;}

		@media only screen and (max-device-width: 480px) {

			a[href^="tel"], a[href^="sms"] {
				text-decoration: none;
				color: black; /* or whatever your want */
				pointer-events: none;
				cursor: default;
			}

			.mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
				text-decoration: default;
				color: orange !important; /* or whatever your want */
				pointer-events: auto;
				cursor: default;
			}
		}

			/* More Specific Targeting */

		@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {

			a[href^="tel"], a[href^="sms"] {
				text-decoration: none;
				color: blue; /* or whatever your want */
				pointer-events: none;
				cursor: default;
			}

			.mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
				text-decoration: default;
				color: orange !important;
				pointer-events: auto;
				cursor: default;
			}
		}

		@media only screen and (-webkit-min-device-pixel-ratio: 2) {
		}

		@media only screen and (-webkit-device-pixel-ratio:.75){
		}
		@media only screen and (-webkit-device-pixel-ratio:1){
		}
		@media only screen and (-webkit-device-pixel-ratio:1.5){
		}

	</style>
</head>
<body style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;margin: 0;padding: 0;font-family: 'Helvetica',sans-serif;color: #454545;width: 100%;">
<table cellpadding="0" cellspacing="0" border="0" id="backgroundTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;background-color: #f7f7f7;width: 100%;line-height: 100%;">
	<tr>
		<td cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse: collapse;">
			<br><br>

			<table width="600" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
				<tr>
					<td cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
						<table cellpadding="0" cellspacing="0" border="0" align="left" width="100%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
							<tr>
								<td cellpadding="0" cellspacing="0" border="0" valign="middle" id="headerTable" style="border-collapse: collapse;background-color: #000000;height: 35px;">
									<img class="image_fix" src="http://cdn.athletez.com/resources/img/athletez_logo_small.png" alt="Athletez Logo" title="Athletez.com" width="100" height="22" style="margin-top:12px; outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;display: block;padding-left: 5px;">
									<img src="<? echo $pingBack; ?>" width="0" height="0" alt="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;padding-left: 5px;">
								</td>
							</tr>
						</table>

						<? echo $subject_header; ?>
						<? echo $action_notification; ?>

						<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" id="footerTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;border-left: 1px solid #c9c9c9;border-right: 1px solid #c9c9c9;border-bottom: 1px solid #c9c9c9;background-color: #e8e8e8;">
							<tr>
								<td cellpadding="0" cellspacing="0" border="0" valign="middle" align="center" style="border-collapse: collapse;">
									<a href="http://www.athletez.com/" style="display: block;border: 1px solid #9d9d9d;height: 25px;width: 150px;margin: 10px;font-weight: bold;font-size: 12px; padding-top:10px; color:#333333; text-decoration: none;">Get in on the Action!</a>
								</td>
							</tr>
						</table>

					</td>
				</tr>
			</table>
			<br>
			<table width="600" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><tr><td align="left" style="border-collapse: collapse;">
						<span id="finalText" style="color: #b1b1b1;font-size: 10px;">You have received this email because <?php echo $email_reason; ?><br>Also, DHJ Partners LLC holds a copyright and trademark on the name Athletez</span>
					</td></tr></table>
			<br><br><br>

		</td>
	</tr>
</table>
</body>
</html>
