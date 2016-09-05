/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Example of Require.js boostrap javascript
 */
requirejs.config({
  // Path mappings for the logical module names
  paths: 
  //injector:mainReleasePaths
  {
    'knockout': 'libs/knockout/knockout-3.4.0',
    'jquery': 'libs/jquery/jquery-3.1.0.min',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0.min',
    'promise': 'libs/es6-promise/es6-promise.min',
    'hammerjs': 'libs/hammer/hammer-2.0.8.min',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
    'ojs': 'libs/oj/v2.1.0/debug',
    'ojL10n': 'libs/oj/v2.1.0/ojL10n',
    'ojtranslations': 'libs/oj/v2.1.0/resources',
    'signals': 'libs/js-signals/signals.min',
    'text': 'libs/require/text'
  }
  //endinjector
  ,
  // Shim configurations for modules that do not expose AMD
  shim: {
    'jquery': {
      exports: ['jQuery', '$']
    }
  },
  // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
  // resources with a custom translation file.
  // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
  // a path that is relative to the location of this main.js file.
  config: {
    ojL10n: {
      merge: {
        //'ojtranslations/nls/ojtranslations': 'resources/nls/menu'
      }
    }
  }
});

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
 require(['ojs/ojcore', 'knockout', 'appController', 'ojs/ojknockout', 'ojs/ojrouter',
   'ojs/ojmodule', 'ojs/ojdialog', 'ojs/ojnavigationlist', 'ojs/ojtoolbar',
   'ojs/ojbutton', 'ojs/ojmenu'],
   function (oj, ko, app) { // this callback gets executed when all required modules are loaded

     oj.Router.sync().then(
       function () {
         // bind your ViewModel for the content of the whole page body.
         ko.applyBindings(app, document.getElementById('globalBody'));
       },
       function (error) {
         oj.Logger.error('Error in root start: ' + error.message);
       }
     );
   }
 );
