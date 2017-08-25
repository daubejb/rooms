var CLIENT_ID = '894633030567-cn8q0jelvn3vbrjo370q584m1d68d574.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/* Initializes the API client library and sets up sign-in state listeners.*/
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

/*Called when the signed in status changes, to update the UI
  appropriately. After a sign-in, the API is called.*/
function updateSigninStatus(isSignedIn) {
  var signInView = getSignInView();
  console.log('sign in view: ', signInView);
  var homeView = getHomeView();
  console.log('home view: ', homeView);
  if (isSignedIn) {
    signInView.style.display = 'none';
    homeView.style.display = 'block';
    console.log('signed in');

  } else {
    signInView.style.display = 'block';
    homeView.style.display = 'none';
    console.log('signed out');
  }
}

/*Sign in the user upon button click.*/
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn({prompt: 'consent'});
}

/*Sign out the user upon button click.*/
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().disconnect();
}

function getSignInView() {
  var signInView = document.getElementsByTagName('rooms-home')[0].shadowRoot.querySelector('#signin');
  return signInView;
}

function getHomeView() {
  var homeView = document.getElementsByTagName('rooms-home')[0].shadowRoot.querySelector('#home');
  return homeView;
}

function getSnackView() {
  var snackView = document.getElementsByTagName('rooms-home')[0].shadowRoot.querySelector('daube-snack');
  return snackView;
}
function reserveTheRoom() {
var roomId = sessionStorage.getItem('roomId');
var startTime = sessionStorage.getItem('startTime');
var endTime = sessionStorage.getItem('endTime');
var event = {
  'summary': 'Rapid Rooms - Reservation',
  'description': 'A quick meeting',
  "start": {
    "dateTime": startTime
  },
  "end": {
    "dateTime": endTime
  },
  "attendees": [
    {
      "email": roomId
    }
  ]
}
console.log(event);
var request = gapi.client.calendar.events.insert({
  'calendarId': 'primary',
  'resource': event
});

request.execute(function(event) {
  var snack = getSnackView();
  var meetingConfirmation = event.status;
  if (meetingConfirmation === 'confirmed') {
    snack.setAttribute('display', '');
    hideSnack(snack);
  }
  console.log(event);
});
}

function hideSnack(v) {
  v.setAttribute('display', '');
}