function record_trail_action(action) {
		$.ajax({
			url: '/trail-action/record/' + encodeURI(action.innerHTML),
			type: 'GET',
			data: null,
			success: function(result){
				alert("Action recorded! \nServer says:" + result);
			},
			fail: function(result){
				alert("Failed to record action! \nError:" + result);
				}
			})
};
