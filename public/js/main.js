(function() {

	function log(msg) {
		try {
			if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
				console.log(msg);
			}
		} catch (e) {}
	}

	function generateAlert(msg) {
		return '<div class="alert alert-danger">'+
			'<button type="button" data-dismiss="alert" class="close">&times;</button>'+
			msg+
			'</div>';
	} 
	
	$(document).ready(function() {

		$('#name').off().on('keypress change paste input', function() {
			$urlStr = $(this).val().toLowerCase().trim().split(' ').join('-');
			$('#url-info').text($urlStr);
			$('input#url').val($urlStr);
		});

		$('.remove').off().on('click', function() {
			$('.sure').addClass('hidden');
			$('.remove').removeClass('hidden');

			$(this).addClass('hidden');
			$(this).siblings('.sure').removeClass('hidden');
		});

		$('.abort').off().on('click', function() {
			$('.sure').addClass('hidden');
			$('.remove').removeClass('hidden');
		})

		$(function() {
			$('#datetimepicker').datetimepicker({
				language: 'en',
				format: 'dd/MM/yyyy hh:mm:ss'
			});
		});

		// Form validation
		$('#create').off().on('submit', function(e) {

			e.preventDefault();

			var $form = $(this)
				,	$name = $form.find('input[name="name"]')
				,	$date = $form.find('input[name="start_time"]')
				,	nameRE = /^[\d\-a-zA-Z ]+$/;

		  if (!nameRE.test($name.val())) {
		    $('#validation').html(generateAlert('Name is required and you can only use letters, numbers and spaces in the name.'));
		    return;
		  }

		  if (!$date.val()) {
		  	$('#validation').html(generateAlert('You must pick a start time.'));
		    return;
		  }

		  $('#validation').html('');
		  $form.off('submit');
		  $form.submit();

		});
	});
})();
