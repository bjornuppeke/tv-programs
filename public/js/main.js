(function() {

	function log(msg) {
		try {
			if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
				console.log(msg);
			}
		} catch (e) {}
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
	});
})();
