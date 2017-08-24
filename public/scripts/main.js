var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://apis.google.com/js/api.js';
script.onload = (e) => {
  initGapi();
}
// bind this to your single page app...
document.getElementsByTagName('head')[0].appendChild(script);

function initGapi() {
  gapi.client.init({
    clientId: "894633030567-dsnukjrj8jaeo7b4mqk94b4b88h3bian.apps.googleusercontent.com",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    scope: "https://www.googleapis.com/auth/calendar",
  }).then(() => {
    console.log('kick off the app');
  });
}