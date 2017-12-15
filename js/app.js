(function() {
	
	var amountNumber = $('#amount-number');
	var dateCard = $('#date-card');
	var selectCard = $('#select-card').change(selectOptionCard); 
	var isNumberValidateVisa;
	var isNumberValidateAmx;
	dateCard.mask('01/00');
	amountNumber.mask("$99.999.99");
	amountNumber.keyup(disabledBtnAmount);
	amountNumber.keydown(validateNumber);
	var btnAmount = $('#btn-amount');
	var numberCardAmx = $('#number-card-amx');
	var numberCardVisa = $('#number-card-visa');
	numberCardAmx.keydown(validateNumber);
	numberCardAmx.keyup(validateCardAmx);
	numberCardVisa.keydown(validateNumber);
	numberCardVisa.keyup(validateCardVisa);
	var cardVisa = $('#input-card-visa');
	var cardAmx = $('#input-card-amx');
	function loadPage () {
		getUserData();
        Materialize.updateTextFields();
        $('select').material_select();
        $('#name-titular').keydown(function(e) {
        	var validateName = e.key;
			var regLetter = /^[A-Za-z ]+$/;

			// if(validateName.trim().length > 0){
			// 	isValidateNameCard = true;
			// };
			if(!regLetter.test(validateName)){
				e.preventDefault();
			};
        })
	};
	function disabledBtnAmount() {
		btnAmount.click(showContainerTypeCard)
		if (amountNumber.val().trim().length <= 0 || amountNumber.val() == '$' || amountNumber.val() == '$0') {
			btnAmount.attr('disabled',true);
		}else{
			btnAmount.removeAttr('disabled');
		}
	};
	function showContainerTypeCard(){
		var containerSelectCard = $('#container-select-card');
		amountNumber.attr('disabled',true);
		btnAmount.parent().addClass('hidden');
		containerSelectCard.removeClass('hidden');
	};
	function validateNumber(e) {
		if (e.keyCode !== 8 && (e.keyCode < 48 || e.keyCode > 57)){
			e.preventDefault();
		};
	};
	function selectOptionCard() {
		$('#form-card-user').removeClass('hidden');
		if (selectCard.val() === "card-amex"){
			$('#input-card-amx-csc').removeClass('hidden');
			cardAmx.removeClass('hidden');
		} else{
			$('#input-card-amx-csc').addClass('hidden');
			cardAmx.addClass('hidden');
		}
		if (selectCard.val() === "card-visa"){
			cardVisa.removeClass('hidden');
			$('#input-card-visa-csc').removeClass('hidden');
		} else{
			$('#input-card-visa-csc').addClass('hidden');
			cardVisa.addClass('hidden');
		}	
	};
	function validateCardVisa() {
		var regCardVisa = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
		if (regCardVisa.test(numberCardVisa.val())){
			$('#div-logo-visa').removeClass('hidden');
			isNumberValidateVisa = true;
		} else {
			$('#div-logo-visa').addClass('hidden');
			isNumberValidateVisa = false;
		}
		if(numberCardVisa.val().trim().length === 16 && !isNumberValidateVisa){
			swal(
			  'Oops...',
			  'Numero de tarjeta invalida',
			  'error'
			);
		}
		
	};
	function validateCardAmx() {
		var regAmericaCard = /^3[47][0-9]{13}$/;
		if (regAmericaCard.test(numberCardAmx.val())){
			$('#div-logo-amx').removeClass('hidden');
			isNumberValidateAmx = true;
		} else{
			$('#div-logo-amx').addClass('hidden');
			isNumberValidateAmx = false;
		}
		if(numberCardAmx.val().trim().length === 16 && !isNumberValidateAmx){
			swal(
			  'Oops...',
			  'Numero de tarjeta invalida',
			  'error'
			);

		}
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