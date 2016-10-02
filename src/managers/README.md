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


## Flags
Flags allows for application flags to be set as the application loads (in the hash) and during execution (in the console).  Its intended use is to help developers debug the application but it could be used to expose alpha-features to select users.

If you want to update the flags from the console, then it must be within a globally accessible instance of flags (window.flags, window.app.namespace.flags, etc).

If a flag

The flags constructor takes in a normal JSON object.  Typically, I ignore the spec...

#### Usage:
```
var myFlags = new Flags({
	"developer-mode": true,
	"new-feature": false
});

myFlags["developer-mode"] = false;
```

#### Hash Usage:
If the flag is appears in the hash without a boolean, it is assumed to be true.  If the value is not a boolean (true|false or 0|1), then it will ignore the setting and use the defined value in the code.

```
https://yoursite.com/your-app#flags[developer-mode]
```
```
https://yoursite.com/your-app#flags[developer-mode=false]
```
```
https://yoursite.com/your-app#flags[developer-mode=0]
```
```
https://yoursite.com/your-app#flags[developer-mode&new-feature=true]
```
```
https://yoursite.com/your-app#your-hash&flags[developer-mode]
```