(function() {
	
	var urlPathName = $(location).attr('pathname');
	var idUser = urlPathName.replace('/','');
	var imgProfile = $('#img-profile');
	var userName = $('#user-name');
	var loadPage = function () {
        Materialize.updateTextFields();
		getUserData();
	};

	var getUserData = function() {
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
				console.log(result);
				var name = result.result.firstName + " " + result.result.lastName;
				imgProfile.attr('src',result.result.image);
				userName.text(name);
			}, 
			error: function( error ) {
				console.error('error', arguments);
			}
		});
	}; 

	$(document).ready(loadPage);
})();