(function() {
	var loadPage = function () {
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
			data:JSON.stringify({
				userId :'57luWV0QL4'
			}),
			success: function( result ) {
				console.log(result)
			}, 
			error: function( error ) {
				console.error('error', arguments);
			}
		});
	}

	$(document).ready(loadPage);
})();