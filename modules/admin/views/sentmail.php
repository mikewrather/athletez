Click on table cells to add conditions
<table class="bordered" style="width:25%;">
	<thead>
	<tr>
		<th>Total / Reset</th>
		<th>Opened</th>
		<th>Errors</th>
	</tr>
	</thead>
	<tbody>
		<tr>
			<td onclick="loadContent('/admin/emailsent');"><?php echo $sent->count(); ?></td>
			<td onclick="loadContent('/admin/emailsent?opened=1&<?php echo $_SERVER['QUERY_STRING']; ?>');"><?php echo $opened; ?></td>
			<td onclick="loadContent'/admin/emailsent?error=1&<?php echo $_SERVER['QUERY_STRING']; ?>');"><?php echo $errors; ?></td>
		</tr>
	</tbody>
	</table><br />
<table class="bordered">
	<thead>
	<tr>
		<th>Search Title</th>
		<th>Recipient</th>
		<th>Sent On</th>
		<th>Opened On</th>
		<th>Backlink</th>
		<th style="width:30%;">Error</th>
	</tr>
	</thead>
	<tbody><?php
	foreach($sent as $message)
	{
		?><tr class="<?php echo $message->pingTime != "" ? "opened" : "unopened";  echo $message->sendError > 0 ? " error" : ""; ?>">
		<td onclick="loadContent('/admin/emailsent?schedule_id=<?php echo $message->emailschedule->id."&".$_SERVER['QUERY_STRING']; ?> ');"><?php
			 //echo $message->college_coaches_id>0 ? "Resume" : $message->emailschedule->query->name; ?></td><?php

		if($message->user_id > 0)
		{
			?><td onclick="loadContent('/admin/emailsent?user_id=<?php echo $message->user->id."&".$_SERVER['QUERY_STRING']; ?> ');"><?php echo $message->user->name(); ?></td><?php
		}
		elseif($message->college_coaches_id>0)
		{
			?><td onclick="loadContent('/admin/emailsent?college_coach_id=<?php echo $message->coach->id."&".$_SERVER['QUERY_STRING']; ?> ');"><?php echo $message->coach->name(); ?> (<?php echo $message->coach->college->name; ?>)</td><?php
		}
		else
		{
			?><td>&nbsp;</td><?php
		}
		?><td><?php echo date('M j, Y g:i a',strtotime($message->timeSent)); ?></td>
		<td><?php echo $message->pingTime != "" ? date('M j, Y g:i a',strtotime($message->pingTime)) : "&nbsp;"; ?></td>
		<td><?php echo $message->visitTime != "" ? date('M j, Y g:i a',strtotime($message->visitTime)) : "&nbsp;"; ?></td>
		<td style="text-overflow: ellipsis;"><?php echo $message->sendError > 0 ? $message->errorText : ""; ?></td>
	</tr><?php
	}
	?></tbody>
</table>