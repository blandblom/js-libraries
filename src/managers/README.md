# Managers
Managers are objects that help control the various aspects of an application.


## Messenger
A simple messenger that returns a promise upon the completion of all listening functions.

The messenger can easily be scoped (by creating a new instance).  This comes in handy when you want to send messages globally, within a component, or within a group of components.

#### Usage:
```
var messenger = new Messenger();

var callback = function() {};

messenger.listen("namespace", callback);
messenger.disconnect("namespace", callback);

messenger
	.post("namespace", optional, arguments, go, here)
	.then(response => {
		response.args;
		response.callbacks; // Helpers with debugging, seriously
	});
```

#### Future Ideas:
* Use the spread oparator so that 'this' is not affected in the callbacks (in strict-mode).