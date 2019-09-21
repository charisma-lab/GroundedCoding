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


function start_trail() {
    //Stop the video recording in the browser
   // toggleRecording();
    //Notify the backend of the end of trail
    alert("start_trail")
    $.ajax({
      url: '/trail/start',
      type: 'POST',
      data: $('#start_session').serialize(),
      success: function(result){
        alert("Trail started! \nServer says:" + result);
      },
      fail: function(result){
        alert("Failed to strat trail! \nError:" + result);
        }
      })
    //Offer the video recording for download
    //downloadVideo()
};


function save_snapshot() {
  var screenshotButton = document.querySelector('#snapshot-button');
  var img = document.querySelector('#snapshot');
  var video = document.querySelector('#gum');

  var canvas = document.createElement('canvas');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  img.src = canvas.toDataURL('image/png');

  var a = document.createElement('a');
  a.style.display = 'none';
  /* TODO: Make this dynamically named based on date and time and trail number */
  a.download = 'screenshot.png';
  a.href = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);

};
