require.config({
    baseUrl: './',
    paths: {
        knockout: 'js/libs/knockout/dist/knockout',
        app: 'js/app'
    }
});

require(["knockout", "app"], function(ko, app){
    ko.applyBindings(new app());
});
