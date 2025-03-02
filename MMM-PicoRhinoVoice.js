##MMM-PicoRhinoVoice
Injects voice commands to the MagicMirror
by using Picovoice's Rhino node.js application

Works with the MMM-Pages module
and the default MagicMirror modules

only works with MM that has node.js version 18.01 and newer
##

Module.register("MMM-PicoRhinoVoice", {

  defaults: {
    startContent: "loading PicoRhinoVoice Module",
    access_code: ""
  },
  requiresVersion: "2.22.0",

   /**
   * loaded is called when this module is loaded, other modules may not be finised loading het.
   */
  loaded: function(callback) {
    this.finishLoading();
    Log.log(this.name + ' is loaded!');
    callback();
  },
  
   /**
   * called when all modules are loaded and the system is ready to boot up. Keep in mind that the dom object for the module is not yet created.
   * initialize things here.
   */
  start() {
    this.templateContent = this.config.startContent,
    this.accessKey = this.config.accessKey

    // set timeout for next random text
    setInterval(() => this.addRandomText(), 3000);
    Log.log(this.name + ' is started!');
  },

   /**
   * now request any additional scripts that we need.
   * note that the loader will only load a file one time.
   * loader will check to see if the file is available.
   * if the file can not be loaded, the mirror bootup will stall out.
   * so use local files and do not rely on external urls.
   */
   getScripts: function() {
    return [
        'script.js', // will try to load it from the vendor folder, otherwise it will load is from the module folder.
        'moment.js', // this file is available in the vendor folder, so it doesn't need to be available in the module folder.
        this.file('another_file.js'), // this file will be loaded straight from the module folder.
        'https://code.jquery.com/jquery-2.2.3.min.js',  // this file will be loaded from the jquery servers.
    ]
  },
  
  /**
   * only use css for testing install
   * when debug config is off, then no display will occur.
   * but this is nice during setup and testing to see the results of the rhino api
   */
  getStyles() {
    return ["template.css"];
  },
 
  
   /**
   * now request any translation files that need to be loaded.
   * if there are no module specific translations, then
   * omit this function or return false
   * put the files local inside this module translations folder
   */  
   getTranslations: function() {
    return {
        en: "translations/en.json",
        de: "translations/de.json"
    };
   },
   
   /**
   * Render the page we're on.
   */
   getDom() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<b>Title</b><br />${this.templateContent}`;

    return wrapper
   },
   
   /** 
   * create a header if displaying this module to mirror can refresh display
   */
   getHeader: function() {
    return this.data.header + ' Rhino Voice';
   },

  addRandomText() {
    this.sendSocketNotification("GET_RANDOM_TEXT", { amountCharacters: 15 });
  },

   /** 
   * allow this module to receive notifications from other modules or the system.
   * we do not want to start this module until after everything else has finished loading
   * so instead of programming a delay, we can wait to get the notification
   * that every single module has finished loading. we need to be able to sense
   * that notification so here we enable that. specifically we want to see both
   * ALL_MODULES_STARTED - All modules are started. You can now send notifications to other modules.
   * and 
   * DOM_OBJECTS_CREATED - All dom objects are created. The system is now ready to perform visual changes.
   * @param {string} notification The notification ID, it is preferred that it prefixes your module name
   * @param {number} payload the payload type.
   */
   notificationReceived: function(notification, payload, sender) {
    if (sender) {
        Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
    } else {
        Log.log(this.name + " received a system notification: " + notification);
    },
    if (notification === "TEMPLATE_RANDOM_TEXT") {
      this.templateContent = `${this.config.exampleContent} ${payload}`;
      this.updateDom();
    }
   },
   

  /**
   * Handle notifications received by the node helper. since we
   * are using node.js rhino we need to use this.
   * note: create the rhino inference so it creates the proper payload for notificaitions.
   * So we can communicate between the node helper and the module.
   *
   * @param {string} notification - The notification identifier.
   * @param {any} payload - The payload data`returned by the node helper.
   */
  socketNotificationReceived: function (notification, payload) {
    if (notification === "EXAMPLE_NOTIFICATION") {
      Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
      this.templateContent = `${this.config.exampleContent} ${payload.text}`;
      this.updateDom();      
    },
    
    /**
    * sendSocketNotification is how
    * we send notices to our own node_helper to tell it
    * to start listening and to turn on/off the mic, may want to 
    * add turn on or off the monitor etc when we build the module more.
    * so we can have module talk to itself in a way as in hide everything
    * or show everything if we can't actually turn the monitor off.
    *
    * this is how we will sense if the mirror is completely ready
    * and then we will send a start listenint message via this method
    * to our node_helper
    */
    this.sendSocketNotification("SET_CONFIG", this.config);

    
    
    /**
    * we want to send notification to other modules via the system
    * notifications.
    */
    this.sendNotification("MY_MODULE_READY_FOR_ACTION", { foo: bar });

    
    
    
  }
})