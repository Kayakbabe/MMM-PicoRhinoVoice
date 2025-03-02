/**
node_helper.js for MMM-PicoRhinoVoice.js
*/

const NodeHelper = require("node_helper");
const Log = require("logger"); /* adding the logger
requiresVersion: "2.22.0", /* this module requires at least version 2.22 MagicMirror which also includes Node 8

/**
* this method is called when all node helpers are loaded
* and system is ready to boot up.
* put any extra module properties here
*/

start: function() {
    this.mySpecialProperty = "So much wow!";
    Log.log(this.name + " node helper is started!");
}

/**
* this is called when magicmirror is shutting down
* so close any open connections, stop sub processes, and gracefully exist here
*/
stop: function() {
    Log.log("Shutting down MyModule");
    this.connection.close();
}

/**
* With this method, your node helper can receive notifications from your modules. When this method is called, it has 2 arguments:
* 
* notification - String - The notification identifier.
* payload - AnyType - The payload of a notification.
* Note: The socket connection is established as soon as the module sends its first message using sendSocketNotification.
*/

socketNotificationReceived: function(notification, payload) {
    Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
},

/**
* now send the info you just got in this node_helper back to your module
* so you can do something with it sendSocketNotification(notification, payload)
* have this send the results of rhino back to the main module js file.
* then the main module js file can notify the mirror system notifcations
* THEN other modules will get the notices. yay!!! here is an example
*/

this.sendSocketNotification("SET_CONFIG", this.config);




 /* make sure only one instance of this module is running  or bugs will occur */

})