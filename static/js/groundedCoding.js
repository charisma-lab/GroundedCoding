function record_trail_comment(comment)
{
    save_snapshot_with_comment(encodeURI(comment))
    $.ajax({
			url: '/trail-comment/record/' + encodeURI(comment),
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

  save_snapshot_with_button(encodeURI(action.innerHTML))
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
    //Stop the video recording in the browser
    //toggleRecording();
    //Notify the backend of the end of trail
		$.ajax({
			url: '/trail/stop',
			type: 'POST',
			data: $('#trail-data').serialize(),
			success: function(result){
				alert("Session stopped! \nServer says:" + result);
			},
			fail: function(result){
				alert("Failed to stop trail! \nError:" + result);
				}
			})
    //Offer the video recording for download
    downloadVideo()
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

function save_snapshot_with_comment(comment) {
  var screenshotButton = document.querySelector('#snapshot-button');
  var img = document.querySelector('#snapshot');
  var video = document.querySelector('#gum');

  var canvas = document.createElement('canvas');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  img.src = canvas.toDataURL('image/png');

  var d = new Date();
  var timestamp = d.toJSON();

  var a = document.createElement('a');
  a.style.display = 'none';
  /* TODO: Make this dynamically named based on date and time and trail number */
  a.download = timestamp + '_screenshot_with_comment_' + comment + '.png';
  a.href = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
};

function save_snapshot_with_button(button) {
  var screenshotButton = document.querySelector('#snapshot-button');
  var img = document.querySelector('#snapshot');
  var video = document.querySelector('#gum');

  var canvas = document.createElement('canvas');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  img.src = canvas.toDataURL('image/png');

  var d = new Date();
  var timestamp = d.toJSON();

  var a = document.createElement('a');
  a.style.display = 'none';
  /* TODO: Make this dynamically named based on date and time and trail number */
  a.download = timestamp + '_screenshot_with_button_' + button + '.png';
  a.href = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
};
