(function($) {
$(document).ready(function(){
	if ($('.leapfrog-video-container').length > 0) {
 var vidContainer = $('.leapfrog-video-container');
var secContainer = $('.leapfrog-video-sections');
 // build page
 for (var a=0; a < vidContainer.length; a++){
	  vidContainer[a].className += ' leap-'+a;
		secContainer[a].className += ' leap-sections-'+a;
	 	var video = $('.leap-'+a+' .leap-video');

		//buildVideoControls();
		var controls = '<div class="leap-video-controls"><img class="btn play leap-play-pause" src="//origin.kcts9.org/battle-ready/images/play-button.png" width="20px">';
		controls += '<div class="outerClass"><div class="leap-seekOverlay"><input type="range" class="leap-seek-bar" value="0"></div></div>';
		controls += '<img class="btn leap-mute" src="//origin.kcts9.org/battle-ready/images/mute-button.png" width="20px"><input type="range" class="leap-volume-bar" min="0" max="1" step="0.1" value="1">';
		controls += '<img class="btn leap-full-screen" src="//origin.kcts9.org/battle-ready/images/fullscreen-button.png" width="20px"></div></div>';

		$(vidContainer[a]).append(controls);

		var videoControls = $(vidContainer[a]).children('.leap-video-controls');
		var playButton =  $(vidContainer[a]).children('.leap-video-controls').children('.leap-play-pause');
		var muteButton = $(vidContainer[a]).children('.leap-video-controls').children('.leap-mute');
		var fullScreenButton = $(vidContainer[a]).children('.leap-video-controls').children('.leap-full-screen');
		var seekBar = $(vidContainer[a]).children('.leap-video-controls').children('.outerClass').children('.leap-seekOverlay').children('.leap-seek-bar');
		var seekOverlay = $(vidContainer[a]).children('.leap-video-controls').children('.outerClass').children('.leap-seekOverlay');
		var volumeBar = $(vidContainer[a]).children('.leap-video-controls').children('.leap-volume-bar');

		var timecodes=[];
		var sections = $(vidContainer[a]).siblings('.leapfrog-video-sections').children('.section');
	 for (var s=0;s<sections.length;s++){
		 var secId = $(sections[s]).attr('id');
		 var secLabel = $(sections[s]).attr('label');
		 var secMin = $(sections[s]).attr('min')*60;
		 var secSec = $(sections[s]).attr('sec');
		 var secTime = parseInt(secMin) + parseInt(secSec);
		 timecodes.push({"id":secId,"timecode":secTime,"label":secLabel});
	 };
		// parse timecodes to HTML
		var addMarkers = $(vidContainer[a]).children('.leap-video-controls').children('.outerClass').children('.leap-seekOverlay');
		for (var i = 0; i < timecodes.length; i++) {
			var totalMarkers = "";
			var timecodeMarker = '<span class="marker" id="marker-' + timecodes[i].id + '" data-timecode="' + timecodes[i].timecode + '"><span class="tooltipcontent">';
			//if (timecodes[i].image != "") {
				//timecodeMarker += '<img src="' + timecodes[i].image + '" width="100px" max-height="100px"/>';
			//}
			timecodeMarker += timecodes[i].label + '</span></span>';
			totalMarkers += timecodeMarker;
			$(seekOverlay).append(totalMarkers);
		}

		var markers = $('.marker');
		var seekBarWidth = $(seekBar).width();
		var vidDuration = $('.leap-video')[a];
		vidDuration.preload = 'metadata';
  	vidDuration.onloadedmetadata = function() {
			for (var o = 0; o < markers.length; o++) {
				var thisVideo = $(markers[o]).parents().parents('.outerClass').parents('.leap-video-controls').siblings('.leap-video');
				var location = ((markers[o].dataset.timecode / thisVideo.get(0).duration) * seekBarWidth);
				markers[o].style.left = location + "px";
			}
		}
 }
 $('.section').on('mouseenter', function(){
	 var markerId = $(this).attr('id');
	 var markerChange = '#marker-'+markerId;
	 $(markerChange).children('.tooltipcontent').css("visibility", "visible");
 });
$('.section').on('mouseleave', function(){
	 $('.tooltipcontent').css("visibility", "hidden");
 })
 $('.section').on('click',function(){
	 var markerId = $(this).attr('id');
	 var markerChange = '#marker-'+markerId;
	 var markerJs = document.getElementById('marker-'+markerId)
	 var thisVideo = $(markerChange).parents().parents('.outerClass').parents('.leap-video-controls').siblings('.leap-video');
 	var thisSeek = $(markerChange).siblings('.leap-seek-bar');
 	var location = ((markerJs.dataset.timecode/thisVideo.get(0).duration)*100);
 	console.log(markerId)
 	 thisVideo.get(0).currentTime = markerJs.dataset.timecode;
 	 thisSeek.get(0).value = location;
 })
$('.marker').on("click", function() {
	var thisVideo = $(this).parents().parents('.outerClass').parents('.leap-video-controls').siblings('.leap-video');
	var thisSeek = $(this).siblings('.leap-seek-bar');
	var location = ((this.dataset.timecode/thisVideo.get(0).duration)*100);
	console.log(location)
	 thisVideo.get(0).currentTime = this.dataset.timecode;
	 thisSeek.get(0).value = location;
 });

$('.leap-video').on("durationchange", function() {
	 //createTimecodes();
	 //updateVideoMarkers();
	 //updateTimecodeObjects();
 });

 $('.leap-play-pause').on("click", function(){
	 var thisVideo = $(this).parents().siblings('.leap-video');
 	if (thisVideo.get(0).paused == true) {
 	 // Play the video
 	 thisVideo.get(0).play();
 	 wasPaused = false;
 	 // Update the button to 'Pause'
 	 this.src='//origin.kcts9.org/battle-ready/images/pause-button.png';
  } else {
 	 // Pause the video
 	thisVideo.get(0).pause();
 	 wasPaused = true;
 	 // Update the button to 'Play'
 	 this.src='//origin.kcts9.org/battle-ready/images/play-button.png';
  }
 });
 $('.leap-mute').on("click", function() {
	 var thisVideo = $(this).parents().siblings('.leap-video');
	 if (thisVideo.get(0).muted == false) {
		 // Mute the video
		 thisVideo.get(0).muted = true;

		 // Update the button
		 this.style.backgroundColor = "rgba(192,192,192,.4)";
	 } else {
		 // Unmute the video
		 thisVideo.get(0).muted = false;

		 // Update the button text
		 this.style.backgroundColor = "transparent";
	 }
 });
 $('.leap-seek-bar').on("change", function() {
	 var thisVideo = $(this).parents().siblings('.leap-video');
	// Calculate the new time
	var time = thisVideo.get(0).duration * (this.value / 100);

	// Update the video time
	thisVideo.get(0).currentTime = time;
 });

 // Event listener for the full-screen button
$('.leap-full-screen').on("click", function() {
	var thisVideo = $(this).parents().siblings('.leap-video');
	if (thisVideo.get(0).requestFullscreen) {
		thisVideo.get(0).requestFullscreen();
	} else if (thisVideo.get(0).mozRequestFullScreen) {
		thisVideo.get(0).mozRequestFullScreen(); // Firefox
	} else if (thisVideo.get(0).webkitRequestFullscreen) {
		thisVideo.get(0).webkitRequestFullscreen(); // Chrome and Safari
	}
 });

 // Update the seek bar as the video plays
$('.leap-video').on("timeupdate", function() {
	var thisSeek = $(this).siblings('.leap-video-controls').children('.leap-seek-bar');
	// Calculate the slider value
	var value = (100 / this.duration) * this.currentTime;
	// Update the slider value
	thisSeek.value = value;
 });

 // Pause the video when the seek handle is being dragged
 $('.leap-seek-bar').on("mousedown", function() {
	 var thisVideo = $(this).parents().siblings('.leap-video');
	if (thisVideo.get(0).paused == true) {
		wasPaused = true;
	} else {
		wasPaused = false;
	}
	thisVideo.get(0).pause();
 });

 // Play the video when the seek handle is dropped
 $('.leap-seek-bar').on("mouseup", function() {
	 var thisVideo = $(this).parents().siblings('.leap-video');
	if (wasPaused == false) {
		thisVideo.get(0).play();
	}
 });

 // Handles click to explore video instead of drag while playing
 $('.leap-seek-bar').on("click", function(e) {
	 var thisVideo = $(this).parents().siblings('.leap-video');
	var xPos = e.pageX - this.getBoundingClientRect().left;
	// translate from px to timecode
	thisVideo.get(0).currentTime = xPos / this.clientWidth * thisVideo.get(0).duration;
 });

 // Event listener for the volume bar
$('.leap-volume-bar').on("change", function() {
	var thisVideo = $(this).parents().siblings('.leap-video');
	// Update the video volume
	thisVideo.get(0).volume = this.value;
 }, false);

 //captions controls for later
/*$('.leap-captions').on('click',function(){
	var thisVideo = $(this).parents().siblings('.leap-video');
	if (thisVideo.textTracks[0].mode = 'hidden'){
		thisVideo.textTracks[0].mode = 'showing'
	}else{
		thisVideo.textTracks[0].mode = 'hidden'
	}
})*/


// place and add listeners on markers
function updateVideoMarkers() {
	var markers = document.getElementsByClassName("marker");
	var seekBarWidth = seekBar.clientWidth;
	for (var i = 0; i < markers.length; i++) {
		var location = (seekBarWidth * markers[i].dataset.timecode / video.duration);
		markers[i].style.left = location + "px";
		markers[i].addEventListener("click", function() {
			video.currentTime = this.dataset.timecode;
		});
	}
}

// updates objects with id's placed in the timecodes.js file and attaches listeners
function updateTimecodeObjects() {
	for (i = 0; i < timecodes.length; i++) {
		(function () {
			var element = document.getElementsByClassName(timecodes[i].id);
			var time = timecodes[i].timecode;
			if (element != null) {
				element.className += "timecode"; // adds timecode class for styling
				element.addEventListener("click", function() {
					video.currentTime = time;
					video.play();
					playButton.src='//origin.kcts9.org/battle-ready/images/pause-button.png';
					wasPaused = false;
				});
				element.addEventListener("mouseover", function() {
					var markerId = document.getElementsByClassName("marker-" +this.id)
					markerId.getElementsByClassName('tooltipcontent')[0].style.visibility = "visible";
				});
				element.addEventListener("mouseout", function() {
					var markerId = document.getElementsByClassName("marker-" +this.id)
					markerId.getElementsByClassName('tooltipcontent')[0].style.visibility = "hidden";
				});
			}
		}()); // closure
	}
}

 var wasPaused = true;

};
});
})(jQuery);
