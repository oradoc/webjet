define(["knockout"], function(ko){
    return function app(){
        ko.components.register("firstName", {
            viewModel: function(params){
                this.firstName = ko.observable("John");
                this.initial = ko.pureComputed(function(){
                    return this.firstName().substr(0,1);
                }, this);
            },
            template: {require: 'text!js/views/firstname.html'}
        });
    };
});
