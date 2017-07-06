# sp-manager

# Description
Sp Manager is the beginning of a set of helper functions for AngularJS. Current implementations is creating an available scope
to create animations per buttons clicks that get stripped once page reload or location change occurs. Working on adding functionality at the moment and adding it to npm.

# USE

Using Bower
$ bower install sp-manager --save

Using NPM
$ npm install sp-manager --save

Download and include in your project, add <script type="text/javascript" src="dist/sp-manager.js"></script>
or <script type="text/javascript" src="dist/sp-manager.min.js"></script> to your index.html file, add 'sp-manager'
to your app.js as a dependency and you are done.

# Idea
The idea for the isFlasy flag came about from the desire to make a certain element on a website flash to catch the
user's attention when they navigated to that page by way of a button click action meaning they were going to the second
page looking for something. The purpose is to get it to flash to show the user exactly where the subject matter they were
looking for is but only on the previously mention button's click event and not when the page was navigated to by way of the
url bar or navbar. As soon as the user heads to a new page the flag is destroyed. In actuality it will be destroyed before
the user even leaves the page.

# Message From Developer
Keep checking back on the package as development is continuous, though our integration isn't always, and will be adding
more and more helpful functions as development progresses.