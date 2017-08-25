var CLIENT_ID = '894633030567-dsnukjrj8jaeo7b4mqk94b4b88h3bian.apps.googleusercontent.com';
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
    signInView.style.display = 'none';
    homeView.style.display = 'block';
    console.log('signed out');
  }
}

/*Sign in the user upon button click.*/
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/*Sign out the user upon button click.*/
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function getSignInView () {
  var signInView = document.getElementsByTagName('rooms-home')[0].shadowRoot.querySelector('#signin');
  return signInView;
}

function getHomeView () {
  var homeView = document.getElementsByTagName('rooms-home')[0].shadowRoot.querySelector('#home');
  return homeView;
}