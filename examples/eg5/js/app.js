define(["knockout"], function(ko){
    return function app(){
        this.firstName = ko.observable("John");
        this.initial = ko.pureComputed(function(){
            return this.firstName().substr(0,1);
        }, this);
    }
});
