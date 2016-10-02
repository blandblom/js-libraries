# Component

The only magic is the one-way DOM bindings.

Native DOM event bindings.  No magic, which makes it a whole lot easier to debug.


#### TODO:
* Figure out scoping.  Should I use '_createChildComponent'.  That would make it easy but would lead to easy mistakes by developers.  I want something more explicit so that we can scape the messenger to a group of components...
* Figure out initialization...


#### Usage:
```
var component = new Component({
	container: HTMLElement,
	model: "root-model-name",
	template: "root-template-name"
});


component
	.create({
		name: "model-name",
		inputs: {} // optional
	})
	.then(myComponent => {});


component.model("model-name", function (
	_model, _api, _protected, _messenger,
	_createChildComponent, _inputs
) {
	"use strict";

	_model...
});


component.action("action-name", function (
	_element, _model, _api, _protected, _messenger
) {
	"use strict";

	_element.addEventListener();	
});


component.template(
	"template-name",
	"template string OR template path",
	["action-name", ...] // optional
);

```