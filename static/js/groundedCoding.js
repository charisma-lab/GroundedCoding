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

/* Stops the trail by stopping the video recording and saving the notes */
function stop_trail() {
		$.ajax({
			url: '/trail/stop',
			type: 'POST',
			data: $('#trail-data').serialize(),
			success: function(result){
				alert("Trail stopped! \nServer says:" + result);
			},
			fail: function(result){
				alert("Failed to stop trail! \nError:" + result);
				}
			})
};
