if (chrome.runtime && chrome.runtime.onStartup) {
  chrome.runtime.onStartup.addListener(function() {
     console.log('Starting browser... updating icon.');
  });
} else {
  chrome.windows.onCreated.addListener(function() {
    console.log('Window created... updating icon.');
  });

}

var myAlarm = chrome.alarms.create("MyAlarm", {'periodInMinutes':1});
chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log('name = ' + alarm.name);
    chrome.notifications.create('MyAlarmNotification',
        {type: "basic",
        title: "Alarm Notification",
        message: "This is the message",
        iconUrl: "icon.png"},
        function() { console.log("Created notification")}
                               );
    var req = $.get("http://alerts.weather.gov/cap/mo.php?x=0",
                null,
                function(data, textStatus, jqXHR){
                    console.log(textStatus);
                    console.log($(data));
                    $("entry",data).each(function( index, elem){
                        console.log($("title", elem).html());
                    });
                });
});
console.log("What's up");

