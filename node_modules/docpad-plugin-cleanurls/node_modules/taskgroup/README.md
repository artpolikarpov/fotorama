<!-- TITLE/ -->

# TaskGroup

<!-- /TITLE -->


<!-- BADGES/ -->

[![Build Status](http://img.shields.io/travis-ci/bevry/taskgroup.png?branch=master)](http://travis-ci.org/bevry/taskgroup "Check this project's build status on TravisCI")
[![NPM version](http://badge.fury.io/js/taskgroup.png)](https://npmjs.org/package/taskgroup "View this project on NPM")
[![Gittip donate button](http://img.shields.io/gittip/bevry.png)](https://www.gittip.com/bevry/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Group together synchronous and asynchronous tasks and execute them with support for concurrency, naming, and nesting.

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

## Install

### [Node](http://nodejs.org/), [Browserify](http://browserify.org/)
- Use: `require('taskgroup')`
- Install: `npm install --save taskgroup`

### [Ender](http://ender.jit.su/)
- Use: `require('taskgroup')`
- Install: `ender add taskgroup`

<!-- /INSTALL -->


## Contents

1. [Usage](#usage)
2. [API](#api)
3. [Comparisons to other flow libraries](#comparisons)
4. [Libraries built on top of TaskGroup](#libraries)


## Usage

TaskGroup provides two classes, `Task` and `TaskGroup`


### Tasks

Tasks are used to wrap a function (synchronous or asynchronous, it doesn't matter) inside a task execution flow.

This is useful for using a consistent interface for executing tasks and doing something on their completion or failure, as well as catching uncaught errors and handling them safely.

We can define a synchronous task like so:

``` javascript
var Task = require('taskgroup').Task

// Create a task for our synchronous function
var task = new Task(function(){
	// Do something ...
	return "a synchronous result";

	// You can also return an error
	// return new Error("something went wrong")
});

// Add our completion callback for once the task has completed
task.once('complete', function(err, result){
	// Do something now that the task has completed ...
	console.log([err, result]);
	/* [null, "a sychronous result"] */
});

// Execute the task
task.run();
```

And an asynchronous task like so:

``` javascript
var Task = require('taskgroup').Task

// Create a task for our synchronous function
var task = new Task(function(complete){
	// Do something asynchronous
	setTimeout(function(){
		// the error is the first callback argument, and the results the following arguments
		return complete(null, "an asychronous result");
		
		// So to provide an error instead, you would just pass over the first callback argument
		// return complete("something went wrong")
	}, 5000);  // execute the timeout after 5 seconds
});

// Add our completion callback for once the task has completed
task.once('complete', function(err, result){
	// Do something now that the task has completed ...
	console.log([err, result]);
	/* [null, "an asychronous result"] */
});

// Execute the task
task.run();
```


### TaskGroup

Often at times, we want to execute multipe things and wait for the completion. TaskGroup makes this easy with the other class, `TaskGroup`.

We simply create a `TaskGroup` and add out Tasks to it!

``` javascript
var TaskGroup = require('taskgroup').TaskGroup

// Create our serial task group
var tasks = new TaskGroup();

// Add an asynchronous task to it
tasks.addTask(function(complete){
	setTimeout(function(){
		return complete(null, "a result");
	}, 5000);  // execute the timeout after 5 seconds
});

// Add a synchronous task to it
tasks.addTask(function(){
	return "a synchronous result";
});

// Add our completion callback for once the tasks have completed
tasks.once('complete', function(err, results){
	console.log([err, result]);
	/* [null, [
		[null, "an asychronous result"],
		[null, "a sychronous result"]
	]] */
});

// Execute the task group
tasks.run();
```

Now by default, the TaskGroup will execute serially. This means that each task will execute one by one, waiting for the previous task to complete before moving on to the next task. This can also be considered having a concurrency of `1`. This is called _serial_ execution.

If we wanted to execute say two tasks at a time we could want a concurrency of `2`, or three tasks at a time, a concurrency of `3` would be set, or unlimited tasks at a time, a concurrency of `0` would be set.

We can customise the concurrency of the task group by passing it over as a configuration option, either via the TaskGroup constructor or via the `setConfig` method. Let's see what this would look like if we were do a concurrency of `0`. This is called _parallel_ execution.

``` javascript
var TaskGroup = require('taskgroup').TaskGroup

// Create our parellel task group
var tasks = new TaskGroup({concurrency:0});

// Add an asynchronous task to it
tasks.addTask(function(complete){
	setTimeout(function(){
		return complete(null, "a result");
	}, 5000);  // execute the timeout after 5 seconds
});

// Add a synchronous task to it
tasks.addTask(function(){
	return "a synchronous result";
});

// Add our completion callback for once the tasks have completed
tasks.once('complete', function(err, results){
	console.log([err, result]);
	/* [null, [
		[null, "a sychronous result"],
		[null, "an asychronous result"]
	]] */
});

// Execute the task group
tasks.run();
```

Notice how the groups results are now in a different order. This occured because with parallel execution, we didn't have to wait for the asynchronous fucntion to complete it's 5 second delay before executing and completing the second function (the synchronous one).

You can mix and match as many functions as you want with TaskGroups.


### Nested TaskGroups

You can also nest TaskGroups inside TaskGroups.

A common use case for this is when you would like a portion of your tasks to execute in parallel, and portion of your tasks to execute in serial.

Such a use case would look like so:

``` javascript
var TaskGroup = require('taskgroup').TaskGroup

// Create our serial task group
var tasks = new TaskGroup();

// Add the first serial task
tasks.addTask(function(){
	return "first serial task";
});

// Add a nested group of tasks that you would like executed in parallel
tasks.addGroup(function(addGroup, addTask){
	// Set this nested group to execute in parallel
	this.setConfig({concurrency: 0});

	// Add an asynchronous task to the nested group
	addTask(function(complete){
		setTimeout(function(){
			return complete(null, "a result");
		}, 5000);  // execute the timeout after 5 seconds
	});

	// Add a synchronous task to the nested group
	addTask(function(){
		return "a synchronous result";
	});
});

// Add the second serial task
tasks.addTask(function(){
	return "second serial task";
});

// Add our completion callback for once the tasks have completed
tasks.once('complete', function(err, results){
	console.log([err, result]);
	/* [null, [
		[null, "first serial task"],
		[null, [
			[null, "a sychronous result"],
			[null, "an asychronous result"]
		]],
		[null, "second serial task"]
	]] */
});

// Execute the task group
tasks.run();
```


### Handling Errors

Safely handling errors is an important thing to do. TaskGroup makes this easy by safely catching any errors that your task my throw, isolating the destruction to the task alone, and providing to the task or taskgroup's completion callback.

When an error is detected, the remaining tasks in a TaskGroup will be cleared, and the TaskGroup's completion callback with the error will be fired.

``` javascript
var TaskGroup = require('taskgroup').TaskGroup

// Create our serial task group
var tasks = new TaskGroup();

// Add a synchronous task to the TaskGroup
tasks.addTask(function(complete){
	setTimeout(function(){
		return complete(new Error("the first task failed"))
	}, 5000);  // execute the timeout after 5 second
});

// Add a synchronous task to the TaskGroup
tasks.addTask(function(){
	return "the second task";
});

// Add our completion callback for once the tasks have completed
tasks.once('complete', function(err, results){
	console.log([err, result]);
	/* [Error("the first task failed"), [
		[Error("the first task failed")]
	]] */
});

// Execute the task group
tasks.run();
```

Which comes in very handling with dealing with asynchronous parallel code:

``` javascript
var TaskGroup = require('taskgroup').TaskGroup

// Create our parallel task group
var tasks = new TaskGroup({concurrency: 0});

// Add an asynchronous task to the TaskGroup
tasks.addTask(function(){
	setTimeout(function(){
		return complete("the first task failed");
	}, 5000);  // execute the timeout after 5 seconds
});

// Add an asynchronous task to the TaskGroup
tasks.addTask(function(){
	setTimeout(function(){
		return complete("the second task failed");
	}, 1000);  // execute the timeout after 1 seconds
});

// Add our completion callback for once the tasks have completed
tasks.once('complete', function(err, results){
	console.log([err, result]);
	/* [Error("the second task failed"), [
		[Error("the second task failed")]
	]] */
});

// Execute the task group
tasks.run();
```

Now even though the first task's completion callback still fires, it is sucessfully ignored, as the TaskGroup has exited.


### Graduation

Now you know all the essentials to getting started with coding the most amazing (a)synchronous parallel/serial code in your life. Enjoy!



## API

### Task API

``` javascript
new (require('taskgroup')).Task()
```

- Available methods:
	- `constructor(args...)` - create our new task, arguments can be a String for `name`, an Object for `config`, and a Function for `next`
	- `setConfig(config)` - set the configuration for the group, returns chain
	- `getconfig()` - return the set configuration
	- `complete()` - will fire the completion event if we are already complete, useful if you're binding your listeners after run
	- `run()` - execute the task
- Available configuration:
	- `name`, no default - allows us to assign a name to the group, useful for debugging
	- `method(complete?)`, no default - must be set at some point, it is the function to execute for the task, if it is asynchronous it should use the completion callback provided
	- `args`, no default - an array of arguments that you would like to precede the completion callback when executing `fn`
	- `next` - alias for  `.once('complete', next)`
- Available events:
	- `run()` - fired just before we execute the task
	- `complete(err, args...)` - fired when the task has completed

### TaskGroup API

``` javascript
new (require('taskgroup')).TaskGroup()
```

- Available methods:
	- `constructor(name?,fn?)` - create our new group, arguments can be a String for `name`, an Object for `config`, and a Function for `next`
	- `setConfig(config)` - set the configuration for the group, returns chain
	- `getconfig()` - return the set configuration
	- `addTask(args...)`, `addTasks(tasks, args..)`  - create a new task item with the arguments and adds it to the group, returns the new task item(s)
	- `addGroup(args...)`, `addGroups(groups, args..)` - create a new group item with the arguments and adds it to the group, returns the new group item(s)
	- `addItem(item)`, `addItem(items)`  - adds the items to the group, returns the item(s)
	- `getTotals()` - returns counts for the following `{running,remaining,completed,total}`
	- `clear()` - remove the remaining items to be executed
	- `pause()` - pause the execution of the items
	- `stop()` - clear and pause
	- `exit(err)` - stop and complete, `err` if specified is sent to the completion event when fired
	- `complete()` - will fire the completion event if we are already complete, useful if you're binding your listeners after run
	- `run()` - start/resume executing the items, returns chain
	- All those of [EventEmitter2](https://github.com/hij1nx/EventEmitter2)
- Available configuration:
	- `name`, no default - allows us to assign a name to the group, useful for debugging
	- `method(addGroup, addTask, complete?)`, no default - allows us to use an inline and self-executing style for defining groups, useful for nesting
	- `concurrency`, defaults to `1` - how many items shall we allow to be run at the same time, set to `0` to allow unlimited
	- `pauseOnError`, defaults to `true` - if an error occurs in one of our items, should we stop executing any remaining items?
		- setting to `false` will continue with execution with the other items even if an item experiences an error
	- `items` - alias for  `.addTasks(items)`
	- `groups` - alias for  `.addGroups(groups)`
	- `tasks` - alias for  `.addTasks(tasks)`
	- `next` - alias for  `.once('complete', next)`
- Available events:
	- `run()` - fired just before we execute the items
	- `complete(err, results)` - fired when all our items have completed
	- `task.run(task)` - fired just before a task item executes
	- `task.complete(task, err, args...)` - fired when a task item has completed
	- `group.run(group)` - fired just before a group item executes
	- `group.complete(group, err, results)` - fired when a group item has completed
	- `item.run(item)` - fired just before an item executes (fired for both sub-tasks and sub-groups)
	- `item.complete(item, err, args...)` - fired when an item has completed (fired for both sub-task and sub-groups)



## Comparisons

### [Async.js](https://github.com/caolan/async)

The biggest advantage and difference of TaskGroup over async.js is that TaskGroup has one uniform API to rule them all, whereas with async.js I found that I was always having to keep referring to the async manual to try and figure out which is the right call for my use case then somehow wrap my head around the async.js way of doing things (which more often than not I couldn't), whereas with TaskGroup I never have that problem as it is one consistent API for all the different use cases.

Let's take a look at what the most common async.js methods would look like in TaskGroup:

``` javascript
// ====================================
// Series

// Async
async.series([
	function(){},
	function(callback){callback();}
], next);

// TaskGroup
new TaskGroup({
	tasks: [
		function(){},
		function(callback){callback();}
	],
	next: next
}).run();


// ====================================
// Parallel

// Async
async.parallel([
	function(){},
	function(callback){callback();}
], next);

// TaskGroup
new TaskGroup({
	concurrency: 0,
	tasks: [
		function(){},
		function(callback){callback();}
	],
	next: next
}).run();

// ====================================
// Map

// Async
async.map(['file1','file2','file3'], fs.stat, next);

// TaskGroup
new TaskGroup({
	concurrency: 0,
	tasks: ['file1', 'file2', 'file3'].map(function(file){
		return function(complete){
			fs.stat(file, complete);
		}
	}),
	next: next
}).run();
```

Another big advantage of TaskGroup over async.js is TaskGroup's ability to add tasks to the group once execution has already started - this is a common use case when creating an application that must perform it's actions serially, so using TaskGroup you can create a serial TaskGroup for the application, run it right away, then add the actions to the group as tasks.

A final big advantage of TaskGroup over async.js is TaskGroup's ability to do nested groups, this allowed us to created the [Joe Testing Framework & Runner](https://github.com/bevry/joe) incredibly easily, and because of this functionality Joe will always know which test (task) is associated to which suite (task group), whereas test runners like mocha have to guess (they add the task to the last group, which may not always be the case! especially with dynamically created tests!).


## Libraries

These are libaries and extensions that are built ontop of TaskGroup's robust API.

- [Joe Test Runner](https://github.com/bevry/joe) — Mocha falls down when you have to create your tests dynamically, because Tests in Joe are Tasks, and Suites are TaskGroups, Joe will always know which tests are for which suite. Works tremendously well, with a modular architecture. Also works in the browser!
- [Event Emitter Grouped](https://github.com/bevry/event-emitter-grouped) — Execute event listeners as TaskGroups, adding support for asynchronous listeners, parallel execution, and completion callbacks. Great for plugin infrastructures.



<!-- HISTORY/ -->

## History
[Discover the change history by heading on over to the `History.md` file.](https://github.com/bevry/taskgroup/blob/master/History.md#files)

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

## Contribute

[Discover how you can contribute by heading on over to the `Contributing.md` file.](https://github.com/bevry/taskgroup/blob/master/Contributing.md#files)

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

## Backers

### Maintainers

These amazing people are maintaining this project:

- Benjamin Lupton <b@lupton.cc> (https://github.com/balupton)

### Sponsors

No sponsors yet! Will you be the first?

[![Gittip donate button](http://img.shields.io/gittip/bevry.png)](https://www.gittip.com/bevry/ "Donate weekly to this project using Gittip")
[![Flattr donate button](http://img.shields.io/flattr/donate.png?color=yellow)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")

### Contributors

These amazing people have contributed code to this project:

- Benjamin Lupton <b@lupton.cc> (https://github.com/balupton) - [view contributions](https://github.com/bevry/taskgroup/commits?author=balupton)
- sfrdmn (https://github.com/sfrdmn) - [view contributions](https://github.com/bevry/taskgroup/commits?author=sfrdmn)

[Become a contributor!](https://github.com/bevry/taskgroup/blob/master/Contributing.md#files)

<!-- /BACKERS -->


<!-- LICENSE/ -->

## License

Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT license](http://creativecommons.org/licenses/MIT/)

Copyright &copy; 2013+ Bevry Pty Ltd <us@bevry.me> (http://bevry.me)
<br/>Copyright &copy; 2011-2012 Benjamin Lupton <b@lupton.cc> (http://balupton.com)

<!-- /LICENSE -->


