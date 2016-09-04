## Basics

To first get started, you first need to understand how to use a couple of libraries.

### RequireJS

The first is RequireJS, which allows you to specify all the libaries required to run your program.

In your HTML file, you need to point to RequireJS.

```js
<script src="js/libs/requirejs/require.js"
```

And then also specify a `data-main` attribute which points to your entry JS file. e.g. `js/main`. The extension can be omitted.

```js
<script src="js/libs/requirejs/require.js"
    data-main="js/main"
    type="text/javascript"></script
```

In our main.js file, this is where we define what classes we require (pointing to other code files), using a `define` call, and then a callback function.

```js
require([], function(){
    console.log('Loaded');
});
```

This particular example doesn't actually load any other scripts, but just prints a Loaded message to the console.

See `eg1`.

So, to actually point to other scripts in your main script, in the first aregument of `require` (Array), you specify the list of libraries. In the callback function, you declare a parameter for each library you are loading - in order.

```js
require(["person"], function(person){
    console.log(person.getFullName());
});
```

In additional libraries, you don't use `require`, but instead, `define`. The same syntax then follows as with `require`. Only this time, the library should return an object containing any properties that are needed.

```js
define([], function(){//The first argument of dependencies can be omitted if there are no dependencies
    return {
        getFullName: function(first, last){
            return first + " " + last;
        }
    };
})
```

See `eg2`.

The previous example had the scripts in the same folder, so it was easy just to pass in the filename of the script (excluding the extension). If you have some better folder organisation, you can first set up a RequireJS configuration for all the libaries you intend to reference, and the path where they exist so you can continue passing in a simple string to the library. This is done with the `require.config` function call, as per:

```js
require.config({
    baseUrl: './',
    paths: {
        person: 'js/modules/person/person'
    }
});
```

See `eg3`.

### Knockout

The next library JET makes heavy use of is the Knockout library. The library uses a Model View ViewModel (MVVM) design pattern, as you will see shortly. In short, it allows you to easily set up data bindings between your model script, and your html view.

We need an object which will have all the fields we want to use in our application, so we can set up our model like so:

```js
define(["knockout"], function(ko){
    return function app(){
        this.firtName = "John";
    }
});
```

In our main script, we need to set up a reference to the model. So to activate knockout, we make a call to the `applyBindings` function referencing our model.

```js
require(['knockout', 'app'], function (ko, appViewModel) {
    ko.applyBindings(new appViewModel());
});
```

note: applyBindings accepts a second parameter which is a document element for which to search for `data-bind`s.

To access this data in our view, the attribute `data-bind` is used. To reference the value of a field in our model, we can using the binding string: `text: firstName`.

```html
<span data-bind="text: firstName"></span>
```

See `eg4`.

One of the features of Knockout is you can create `observable` properties that listen to the values for changes and update the application accordingly. When you create your model, set up the propertly as an `observable` or `pureComputed` which returns a computed value.

So, our model becomes.

```js
define(["knockout"], function(ko){
    return function app(){
        this.firstName = ko.observable("John");
        this.initial = ko.pureComputed(function(){
            return this.firstName().substr(0,1);
        }, this);
    }
});
```

The, we can make an input element and use the `data-bind` again, but instead of `text: firstName`, we would use `value: firstName`. This gives us an updated template as:

```html
<p>Your first name (<input type="text" data-bind="value: firstName"></input>) initial is <span data-bind="text: initial"></span>.</p>
```

And then, whenever we change the value of `firstName` the initial we be updated and reflected in real-time.

See `eg5`.

We can take this a step further, and set it up as a re-usable component using Knockouts API. To do that, we modify our view model and wrap it in a call to `ko.components.register`

```js
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
```

We then update our index.html file by replacing the template string with the following.

```html
<div data-bind="component: {name: 'firstName'}"></div>
```

Then we will have the exact same behaviour as before, except with something we can re-use.

See `eg6`

This is good, but it would be better to manage the template in separate files, rather than inline like that. This is where we can place all components with their respective views and viewmodels. We can make use of RequireJS text module to achieve this.

To accomplish this, we just need to start the template string with `text!` followed by the path to the view. The engine recognises the `text!` string as to fetch the template from the specified file. It won't be a bad idea now to separate the models and the viewmodels into separate folders.

So, in our `main.js` file, add a new path in the require config to load the text module.

```js
text: 'js/libs/text/text'
```

Followed by adding `text` into the require Array.

```js
require(["knockout", "app", "text"], function(ko, app, text){
```

Then, create 2 new folders within the `js` folder - `views` and `viewsmodel`. Move the `app.js` from our previous example into viewsmodel, renaming it to `firstname.js` - to give it a more meaningful module name. And create a firstname.html file in the views folder, with the text as from the template property of the component.

```html
<p>Your first name (<input type="text" data-bind="value: firstName"></input>) initial is <span data-bind="text: initial"></span>.</p>
```

Now, with our module renamed to `firstname`, in our main script, we also need to update the path to point to the new location.

```js
firstname: 'js/viewsmodel/firstname'
```
and the call to `require`.

```js
require(["knockout", "firstname", "text"], function(ko, firstname, text){
```

Finally, in our viewsmodel, update the template to point to our html file.

```js
template: {require: 'text!js/views/firstname.html'}
```

See `eg7`.

## JET Basics

Now that the basics of RequireJS and Knockout have been covered, how then do we get going with an Oracle JET application?

There are a few ways to get the necessary files. Method one is to follow the [getting started guide](http://www.oracle.com/webfolder/technetwork/jet/globalGetStarted.html). The first part involves installing some tools with `npm`. I found I had to first install `yeoman-doctor` for it to work.

```bash
npm install -g yeoman-doctor
npm -g install yo bower grunt-cli
npm -g install generator-oraclejet
```

Once that is done, you can generate the program files into a designated folder with the command:

```bash
yo oraclejet <project name> --template=basic
```

The program can then be served with

```bash
grunt build && grunt serve
```

You can omit the `--template=basic` bit to create an empty projec, with all the necessary JET requirements.
..
Netbeans.

If you use NetBeans, there is an Oracle JET plugin you can install that you can use point and click to create new JET projects - similarly, empty or with the quick start template.

When creating a new project, click the HTML5/JavaScript category, then locate Oracle JET Base Distribution.

![image](https://cloud.githubusercontent.com/assets/1747643/18231189/fceca7d8-72f4-11e6-9278-3877311d0c47.png)

Or if you want the quick start template, navigate to Samples, and select `Oracle JET QuickStart Basic`.

![image](https://cloud.githubusercontent.com/assets/1747643/18231197/426ae310-72f5-11e6-86b1-864ea0bc8af9.png)

..
The third approach is to download the [ZIP files](http://www.oracle.com/technetwork/developer-tools/jet/downloads/index.html). If using NetBeans, you can set up a project based on these archives by opting to create a `HTML5/JS Application`

![image](https://cloud.githubusercontent.com/assets/1747643/18231219/07fabc72-72f6-11e6-815d-28d00646fdfc.png)

When it comes time to specify the template, just point it at the downloaded zip file.

![image](https://cloud.githubusercontent.com/assets/1747643/18231222/33981974-72f6-11e6-95cf-e3bcd4a3dcfb.png)
