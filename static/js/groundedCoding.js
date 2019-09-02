function record_trail_action(action) {
		$.ajax({
			url: '/trail-action/record/' + encodeURI(action.innerHTML),
			type: 'GET',
			data: null,
			done: function(result){
				alert("Action recorded! \nServer says:" + result);
			},
      /*TODO: FIX THIS! It does not work even for HTTP 500*/
			fail: function(result){
				alert("Failed to record action! \nError:" + result);
				},
      always: function(result){
        alert("Server said: " + result);
        }
			})
};

/* Stops the trail by stopping the video recording and saving the notes */
function stop_trail() {
    //Stop the video recording in the browser
    toggleRecording();
    //Notify the backend of the end of trail
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
    //Offer the video recording for download
    downloadVideo()
};
