soundManager.url = 'swf/';
soundManager.debugMode = false;

String.prototype.lpad = function(padString, length) {
  var str = this;
  while (str.length < length)
    str = padString + str;
  return str;
}

$(function(){
  $('a[rel*=facebox]').facebox();

  $("#twitter").getTwitter({
    userName: "tomatoist",
    numTweets: 3,
    loaderText: "Loading tweets...",
    slideIn: false,
    showHeading: true,
    headingText: "News",
    showProfileLink: false
  });
});

function audibleAlert(){
  if(window.fluid){
    window.fluid.playSoundNamed("Glass");
  } else {
    soundManager.onready(function(){
      soundManager.play('ding', '/sounds/ding.mp3');
    });
  }
}

function tickTock(name,time_in_seconds){
  $("#timer .countdown_amount").createTimer({
    time_in_seconds: time_in_seconds,
    tick: function(timer, time_in_seconds, formatted_time) {
      document.title = name + ' (' + formatted_time + ')';
      badge(formatted_time);
    },
    buzzer: function(){
      document.title = 'DING!';
      modalAlert(name + ' completed!');
      audibleAlert();
      Polling.start();
      $('p.status').text(name + ' completed!');
      $('body').addClass('expired');
    }
  });
}
