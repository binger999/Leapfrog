# Leapfrog
HTML 5 video chaptering tool

This code will help setup a HMTL 5 video player that can be jumped to specific chapters based off a timecodes array. Requires Jquery.

See an example: https://kcts9.org/programs/whats-good-206/muslim-in-america-changing-conversation
```
<script>
var timecodes=[
{id:'q1',timecode:5,label:'Why do Muslim women cover themselves?'},
{id:'q2',timecode:464,label:'Why are there separate spaces for men and women at Mosque?'},
{id:'q3',timecode:626,label:'Are Muslims treated equal in our society?'},
{id:'q4',timecode:1009,label:'The political divide.'},
{id:'q5',timecode:1144,label:'Islam and government.'},
{id:'q6',timecode:1253,label:'What’s one thing you want people to know about Muslims?'}
]
</script>

<div id="leapfrog-video-container">
  <video id="video" poster="/sites/default/files/muslim-leapfrog-poster_0.jpg" width="100%">
    <source src="//origin.kcts9.org/watchnow/muslim-group-discussion.mp4" type="video/mp4"> 
    Your browser does not support the video tag. 
   </video>
</div>
<div class="sections">
  <p style="margin-bottom:12px;"><strong>Sections</strong></p>
  <p id="q1">Why do Muslim women cover themselves?</p>
  <p id="q2">Why are there separate spaces for men and women at Mosque?</p>
  <p id="q3">Are Muslims treated equal in our society?</p>
  <p id="q4">The political divide.</p>
  <p id="q5">Islam and government.</p>
  <p id="q6">What’s one thing you want people to know about Muslims?</p>
</div>
```
