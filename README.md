# Leapfrog
HTML 5 video chaptering tool

This code will help setup a HMTL 5 video player that can be jumped to specific chapters based off a timecodes array. Requires Jquery.

See an example: https://kcts9.org/programs/whats-good-206/muslim-in-america-changing-conversation
```
<script>
var timecodes=[
{id:'ch1',timecode:5,label:'Chapter 1 label'},
{id:'ch2',timecode:464,label:'Chapter 2 label'},
{id:'ch3',timecode:626,label:'Chapter 3 label'},
{id:'ch4',timecode:1009,label:'Chapter 4 label'},
{id:'ch5',timecode:1144,label:'Chapter 5 label'},
{id:'ch6',timecode:1253,label:'Chapter 6 label'}
]
</script>

<div id="leapfrog-video-container">
  <video id="video" poster="[video thumbnail url]" width="100%">
    <source src="[video src]" type="video/mp4"> 
    Your browser does not support the video tag. 
   </video>
</div>
<div class="leapfrog-video-sections">
  <p id="ch1">Chapter 1</p>
  <p id="ch2">Chapter 2</p>
  <p id="ch3">Chapter 3</p>
  <p id="ch4">Chapter 4</p>
  <p id="ch5">Chapter 5</p>
  <p id="ch6">Chapter 6</p>
</div>
```
