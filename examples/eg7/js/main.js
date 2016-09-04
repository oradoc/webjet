require.config({
    baseUrl: './',
    paths: {
        knockout: 'js/libs/knockout/dist/knockout',
        text: 'js/libs/text/text',
        firstname: 'js/viewsmodel/firstname'
    }
});

require(["knockout", "firstname", "text"], function(ko, firstname, text){
    ko.applyBindings(new firstname());
});
