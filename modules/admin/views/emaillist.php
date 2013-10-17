<script type="text/javascript">
	<!--//--><![CDATA[//><!--
	$(document).ready(function() {
		$('.del').click(function(){
			if (confirm("Are you sure?")) {
				document.location.href="/admin/plugin/email/del/"+$(this).attr('alt');
			}
		})
	});
	//--><!]]>
</script>

<h1>Email Templates</h1>
<?php // Pagination ?>
<p>
	<?php
	$pag_data = array (
		'total_items'    => $count,
		'items_per_page' => $per_page,
		'auto_hide'      => TRUE,
		'view'           =>'pagination/admin'
	);
	echo Pagination::factory($pag_data)->render();
	?>
</p>

<p><?php echo html::anchor("admin/plugin/email/add","Add new Email Template")?></p>


<table class="bordered" cellpadding="0" cellspacing="0">
	<thead>
		<tr>
			<th>&nbsp;</th>
			<th>&nbsp;</th>
			<th>id</th>
			<th>Title</th>
			<th></th>
		</tr>
	</thead>

	<?php foreach ($emails as $email): ?>
	<tr>
		<td><?php echo html::anchor("admin/plugin/email/edit/".$email->id, '<img src="/index.php/adminmedia/ko/b_edit.png" title="Edit" alt="" />')?></td>
		<td><a href="#" alt="<?php echo $email->id?>" class="del"><img src="/images/dummy/trash.png" class="delicon" title="Delete" alt="" /></a></td>
		<td><?php echo $email->id; ?></td>
		<td><?php echo html::anchor("admin/plugin/email/edit/".$email->id,$email->title); ?></td>
		<td><?php echo html::anchor("admin/plugin/email/preview/".$email->id,"Preview"); ?></td>
	</tr>
	<?php endforeach ?>
</table>
<?php // Pagination ?>
<p>
	<?php
	$pag_data = array (
		'total_items'    => $count,
		'items_per_page' => $per_page,
		'auto_hide'      => TRUE,
		'view'           =>'pagination/admin'
	);
	echo Pagination::factory($pag_data)->render();
	?>
</p>
