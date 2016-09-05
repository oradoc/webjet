/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Main content module
 */
define(['ojs/ojcore', 'knockout'],
  function(oj, ko) {
   /**
    * The view model for the main content view template.  Please note that since
    * this example uses ojModule binding, you do not need to call ko.applyBindings
    * like the JET Cookbook examples.  ojModule handles applying bindings for its
    * associated view.
    */
    function mainContentViewModel() {
        var self = this;
        self.something = ko.observable("This section uses content from it's own 'home' ViewModel. The module is found in the /js/viewModules folder");
    }

    /**
     * This example returns a view model instance, but can instead return a constructor function
     * which will be invoked to create a view model instance for each module reference.
     * This instance example will be used as a singleton whenever this module is referenced.
     * Please see the 'ViewModel's Lifecycle' section of the ojModule doc for more info.
     */
    return new mainContentViewModel();
});
