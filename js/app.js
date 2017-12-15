(function() {
	
	var amountNumber = $('#amount-number');
	amountNumber.mask("$99.999.99");
	amountNumber.keyup(validateNumber,disabledBtnAmount);
	var btnAmount = $('#btn-amount');
	function loadPage () {
		getUserData();
        Materialize.updateTextFields();
        $('select').material_select();
	};
	function disabledBtnAmount() {
		btnAmount.click(showContainerTypeCard)
		if (amountNumber.val().trim().length <= 0 || amountNumber.val() == '$') {
			btnAmount.attr('disabled',true);
		}else{
			btnAmount.removeAttr('disabled');
		}
	};
	function showContainerTypeCard(){
		var selectCard = $('#select-card');
		amountNumber.attr('disabled',true);
		btnAmount.parent().addClass('hidden');
		selectCard.removeClass('hidden');
	};
	function validateNumber(e) {
		console.log(this.value);
		if (e.keyCode !== 8 && (e.keyCode < 48 || e.keyCode > 57)){
			e.preventDefault();
		};
	};
	function getUserData() {
		var urlPathName = $(location).attr('pathname');
		var idUser = urlPathName.replace('/','');
		var imgProfile = $('#img-profile');
		var userName = $('#user-name');
		$.ajax({
			type: "POST",
			url: 'https://parseapi.back4app.com/functions/usuario',
			dataType : "json",
			headers: {
				'cache-control': 'no-cache',
				'content-type': 'application/json',
				'x-parse-application-id': 'KthkFDEcuDZ1on1BufkemQmZ1Ze2OXDucria1E2s',
				'x-parse-rest-api-key': 'KoChaj2LH7bvkKfm50Rbr8QLRy9FtmKkTopSrnHd'				
			},
			data: JSON.stringify({
				"userId" : idUser

			}),
			success: function( result ) {
				//console.log(result);
				var name = result.result.firstName + " " + result.result.lastName;
				imgProfile.attr('src',result.result.image);
				userName.text(name);
			}, 
			error: function( error ) {
				swal(
				  'Oops...',
				  'Usuario incorrecto',
				  'error'
				)
				console.error('error', arguments);
			}
		});
	}; 

	$(document).ready(loadPage);
})();