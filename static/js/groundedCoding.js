function record_trail_comment(comment)
{
 		$.ajax({
			url: '/trail-action/record/' + encodeURI(comment),
			type: 'GET',
			data: null,
			done: function(result){
				alert("Comment recorded! \nServer says:" + result);
			},
      /*TODO: FIX THIS! It does not work even for HTTP 500*/
			fail: function(result){
				alert("Failed to record comment! \nError:" + result);
				},
      always: function(result){
        alert("Server said: " + result);
        }
			})
}

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

/* Starts the trail by passing the recorder name and trial number */
function start_trail() {
    recorder_name = encodeURI($('#recorder_name').val())
    trail_number = encodeURI($('#trail_number').val())

		$.ajax({
			url: '/trail/start/' + recorder_name + '/' + trail_number,
			type: 'GET',
			data: $('#trail-session-data').serialize(),
			success: function(result){
				alert("Trail started! \nServer says:" + result);
			},
			fail: function(result){
				alert("Failed to start trail! \nError:" + result);
				}
			})
}
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
