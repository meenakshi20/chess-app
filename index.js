/**
 * index.js - the main logic for our Cisco Webex Embedded App
 *
 * This file is imported into index.html in this project.
 * Inside index.html, we load:
 *
 * https://binaries.webex.com/static-content-pipeline/webex-embedded-app/v1/webex-embedded-app-sdk.js
 *
 * Use this link as your start URL: https://webexembeddedapp.glitch.me
 *
 * Documentation is here:
 * https://developer.webex.com/docs/embedded-apps
 *
 */


  
  
console.log("Let's get started!"); // The console in your web browser will display this
// Note: there is currently no way to view the console.log output within the live environment,
//       so check out the log() function below to echo things out to the HTML view instead.

// window.Webex.Application() exists because we included the Embedded Apps SDK, or its emulator, in index.html:
var app = new window.Webex.Application(); // Let's name our instance of the application "app"

app.onReady()
    .then(function() {
  
     handleGetMeeting();
        
}); 

/**
 * When the app's onReady() promise resolves, we're ready to begin:
 */
/*app.onReady().then(() => {
  
  log('onReady()', {message:'The app is ready.'})
  handleGetUser();
});*/ // This fires once the app is ready

/**
 * We'll build ourselves a handy little logging function to present the information
 * we want to view in our web page, by adding <li> elements at the top of a <ul> with
 * each new logged message.
 */
function log(type, data){
  
  var ul = document.getElementById("console"); // a place to display our messages
  var li = document.createElement("li"); // We'll make list items to organize
  var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`); // unpacking the JSON data into text format
  
  li.appendChild(payload); // Put our JSON-as-a-string into the list item element
  ul.prepend(li); // newest log items are placed on top
  
} // function log(type, data)

/**
 * This function will help us display information about the current User,
 * when we click the getUser() button in our web page's UI.
 */
function handleGetUser(){
  
  console.log('function handleGetUser() called.');
  
  app.context.getUser().then((user) => {
    
    console.log('app.context.getUser() promise has resolved.');
    
    log('Complete JSON string: ', user);
    log('user.id: ',          user.id);
    log('user.orgId: ',       user.orgId);
    log('user.email: ',       user.email);
    log('user.displayName: ', user.displayName);
    log('user.token: ',       user.token);
    
  }); // app.context.getUser().then((user) =>
  
} // function handleGetUser()

/**
 * Get information about the current meeting
 */
function handleGetMeeting(){
  
  console.log('function handleGetMeeting() called.');
  
  app.context.getMeeting().then((m) => {
    console.log('getMeeting()', m)
    console.log(m.userRoles);
    if(m.userRoles.includes("HOST") !== -1) {
      $("#participantMode").hide();
      $("#hostMode").show();
    } else {
      $("#participantMode").show();
      $("#hostMode").hide();
    }
    console.log(app.language);
                               
  });
  
} // function handleGetMeeting()

/**
 * Get information about the current space (or "room")
 */
function handleGetSpace(){
  
  console.log('function handleGetSpace() called.');
  
  app.context.getSpace().then((s) => log('getSpace()', s));
  
} // function handleGetSpace()

/**
 * When we want to share a URL with participants, we can set it using setShareURL(url).
 * For our UI, this handles the button click, and sets the Participant's view.
 */
function handleSetShare(url){
  
  console.log('function handleSetShare() called.');
  
  //var url = document.getElementById("shareUrl").value;
  
  app.setShareUrl(url);
  log('setShareUrl()', {message: 'Shared the following URL with the participant: ', url: url});
  
} // function handleSetShare()

/**
 * Clear the shared URL for the participant(s)
 */
function handleClearShare(){
  
  console.log('function handleClearShare() called.');
  
  app.clearShareUrl();
  let textFieldShareUrl = document.getElementById("shareUrl");
  textFieldShareUrl.value = "";
  
  log('clearShareUrl()', {message:'share url has been cleared'});
  
} // function handleClearShare()

/**
 * There are several environmental attributes we can pick up:
 */
function handleAttributes(){
  
  console.log("Handling attributes...");
  
  let deviceType     = document.getElementById("deviceType");
  let displayContext = document.getElementById("displayContext");
  let theme          = document.getElementById("theme");
  let language       = document.getElementById("language");
  let sdkVersion     = document.getElementById("sdkVersion");
  let about          = document.getElementById("about");
  
  deviceType.innerHTML     = app.deviceType;     // e.g. DESKTOP
  displayContext.innerHTML = app.displayContext; // One of: ["MEETING_SIDEBAR", "MEETING_STANDALONE_WINDOW", "MEETING_MAINVIEW", "SPACETAB"]
  theme.innerHTML          = app.theme;          // light or dark
  language.innerHTML       = app.language;       // e.g. en-US
  sdkVersion.innerHTML     = app.sdkVersion;     // e.g. 1
  about.innerHTML          = app.about;          // e.g. Webex App, Version: 41.8.0.19299
  
  log('app', app);
  console.log("...attributes handled.");
  
} // function handleAttributes()


/**
 * Listen to various events the system can trigger
 */

// When the theme is changed from dark/light, the application:themeChanged event triggers:
app.listen('application:themeChanged',          (payload) => log('application:themeChanged', payload)); // LIGHT or DARK

// Additional events we can listen to:
app.listen('application:displayContextChanged', (payload) => log('application:displayContextChanged', payload)); // e.g. if the embedded window pops out
app.listen('application:shareStateChanged',     (payload) => log('application:shareStateChanged', payload)); // boolean, if sharing is taking place
app.listen('meeting:infoChanged',               (payload) => log('meeting:infoChanged', payload)); // event.id or event.conferenceId changes
app.listen('meeting:roleChanged',               (payload) => log('meeting:roleChanged', payload)); // e.g. user is assigned to become host
app.listen('space:infoChanged',                 (payload) => log('space:infoChanged', payload)); // e.g. title of the space changes

// See more at: https://developer.webex.com/docs/embedded-apps#cisco-webex-embedded-apps-framework-api-reference

console.log('end of index.js file reached.');

$(document).ready(function(){

  $("#button1").click(function(){
    var url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;
    $("#div1").html(url);
  });
  
  $("#puzzleForDayBtn").click(function() {
    window.open('https://lichess.org/training/daily', 'window name', 'width=400, height=444');
    return false;
  })
  
  $("#watchTVBtn").click(function() {
    window.open('https://lichess.org/tv', 'window name', 'width=450, height=500');
    return false;
  })
  
  $("#createTournmentBtn").click(function() {
      
     //window.location.href = "https://lichess.org/tournament/new";
    handleSetShare('https://lichess.org/tournament/new');
    
     //window.open('https://lichess.org/tournament/new', 'window name', 'width=400, height=444');
    
   /*var postData = {
          "clock": {
                "increment": 0,
                "limit": 300
            },
            "nbRounds": 3
        };
    $.ajax({
        url: 'https://lichess.org/api/swiss/new/cisco-demo',
        type: 'POST',
         crossDomain: true,
      headers: {  'Access-Control-Allow-Origin': '*' },
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer lip_m99SkeXjissYtcJYO7Ia');
          xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
          xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        },
        data: JSON.stringify(postData),
        success: function (data) { 
          console.log(data);
          window.location.href = "https://lichess.org/tournament/" + data.id;
        },
        error: function () { },
    });*/
    
    
    
    
  })
});

// The End
