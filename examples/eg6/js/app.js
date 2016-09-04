define(["knockout"], function(ko){
    return function app(){
        ko.components.register("firstName", {
            viewModel: function(params){
                this.firstName = ko.observable("John");
                this.initial = ko.pureComputed(function(){
                    return this.firstName().substr(0,1);
                }, this);
            },
            template: '<p>Your first name (<input type="text" data-bind="value: firstName"></input>) initial is <span data-bind="text: initial"></span>.</p>'
        });
    };
});
