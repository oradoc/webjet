require.config({
    baseUrl: './',
    paths: {
        person: 'js/modules/person/person'
    }
});
require(["person"], function(person){
    console.log(person.getFullName("John", "Smith"));
});
