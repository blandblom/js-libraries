
// // line 8 has async issue
// myapp.define(function() {
// 	"use strict";

// 	var config = myapp.import("config");
// 	var app = myapp.import("app");
// 	var myComponent = myapp.import("/components/my-component.js");

// 	myapp.config;
// 	myapp.messenger;


// });


myapp.define(["/components/my-component.js"],
function(
	config, util, enums, dom,
	messenger, logger, component,
	MyComponent
) {
	"use strict";

	var _static = {};
	

	return function(options) {
		"use strict";

		var _api = {};

		var componentInstance = new MyComponent({});

		component.module();
		component.model();
	};
}).then(
function() {

});

// myapp
// 	.define()
// 	.dependencies()
// 	.name()


myapp.define("my-component",
["my-component", "/components/my-component.js", "/components/combined.js#my-component"],
function(
	config, util, enums, dom,
	messenger, logger, component,
	MyComponent
) {
	"use strict";

	var _static = {};
	

	return component.model(function(_api, _model, _module) {
	// return component.model(function(_public, _protected, _module) {
		"use strict";

	});
}).then(
function() {

});


var myapp = new function() {

	dependencyManager = new function() {
		var dependencyList = [];

		return {
			addObject: function() {
				dependencyList.push();
			},
			load: function(dependencies) {

				dependencyList
					.filter()
					.map(e => e.fn);

				if (true) {
					return Promise.resolve();
				}
				else {
					return Promise.reject();
				}
			}
		};
	};

	_api.define = function(dependencies, fn) {
		return dependencyManager
			.load(dependencies)
			.then(function() {
				var Obj = {
					fn: fn(
						config, util, enums, dom,
						messenger, logger, component,
						...arguments
					)
				};

				dependencyManager.add(Obj);

				return Promise.resolve(Obj);
			});
	};


	_api.require = function(dependencies) {
		return dependencyManager
			.load(dependencies);
	};
};
