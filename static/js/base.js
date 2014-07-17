/**
 * @fileoverview
 * Provides methods for the Hello Endpoints sample UI and interaction with the
 * Hello Endpoints API.
 */

/** google global namespace for Google projects. */
var google = google || {};

/** appengine namespace for Google Developer Relations projects. */
google.appengine = google.appengine || {};

google.appengine.pcsos = google.appengine.pcsos || {};

/**
 * Prints a greeting to the greeting log.
 * param {Object} greeting Greeting to print.
 */
google.appengine.pcsos.print = function(emergencycall) {
    var element = document.createElement('div');
    element.classList.add('row');
    element.innerHTML = emergencycall.victim;
    element.innerHTML = emergencycall.message;
    document.querySelector('#outputLog').appendChild(element);
};

/**
 * Gets a numbered greeting via the API.
 * @param {string} id ID of the greeting.
 
google.appengine.pcsos.getGreeting = function(id) {
  gapi.client.helloworld.greetings.getGreeting({'id': id}).execute(
      function(resp) {
        if (!resp.code) {
          google.appengine.samples.hello.print(resp);
        }
      });
};
 */

/**
 * Lists emergency calls via the API.
 */
google.appengine.pcsos.listEmCalls = function() {
    gapi.client.emergencycalls.emergencycall.list().execute(
      function(resp) {
        console.log(resp);
        if (!resp.code) {
          resp.items = resp.items || [];
          for (var i = 0; i < resp.items.length; i++) {
            google.appengine.pcsos.print(resp.items[i]);
          }
        }
      });
};

/**
 * Gets a greeting a specified number of times.
 * @param {string} greeting Greeting to repeat.
 * @param {string} count Number of times to repeat it.
 */
google.appengine.pcsos.insertEmCall = function(
    msg, victim) {
    gapi.client.emergencycalls.emergencycall.insert({
        'message': msg,
        'victim': victim
    }).execute(function(resp) {
        console.log(resp);
        if (!resp.code) {
            google.appengine.pcsos.print(resp);
        }
    });
};

/**
 * Enables the button callbacks in the UI.
 */
google.appengine.pcsos.enableButtons = function() {

    console.log("enableButtons");
    var calls = document.querySelector('#listEmCalls');
    console.log(calls);
    calls.addEventListener('click',
        google.appengine.pcsos.listEmCalls);

    var insertEmCall = document.querySelector('#insertEmCall');
    insertEmCall.addEventListener('click', function(e) {
    google.appengine.pcsos.insertEmCall(
        document.querySelector('#msg').value,
        document.querySelector('#victim').value);
    });
};
/**
 * Initializes the application.
 * @param {string} apiRoot Root of the API's path.
 */
google.appengine.pcsos.init = function(apiRoot) {
    // Loads the OAuth and helloworld APIs asynchronously, and triggers login
    // when they have completed.
    // var apisToLoad;

    console.log("init");
    console.log(apiRoot);
    var callback = function() {
        // google.appengine.pcsos.enableButtons();                
        console.log("callback");
        
        if (--apisToLoad == 0) {
            google.appengine.pcsos.enableButtons();
            //google.appengine.pcsos.listEmCalls();
            //google.appengine.pcsos.insertEmCall();
        }
        
    }

    console.log("load")
    gapi.client.load('emergencycalls', 'v3', callback, apiRoot);
    apisToLoad = 1; // must match number of calls to gapi.client.load()
};
