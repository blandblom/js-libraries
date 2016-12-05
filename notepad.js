
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
[
	"my-component",
	"/components/my-component.js",
	"/components/combined.js#my-component"
],
function(
	config, util, flags, enums, dom,
	messenger, logger, router,
	svc, helpers, component,
	MyComponent
) {
	"use strict";

	var _static = {};
	

	component.defineModel("model-name", [
		"propertyOne",
		"propertyTwo",
		"propertyThree"
	], function(_api, _model, _module, _messenger, _promises) {
		"use strict";

		_model.propertyOne = 123345;

	});
})
.then(modelAPI => onComponentReady());



component.defineModel("model-name", [
	"propertyOne",
	"propertyTwo",
	"propertyThree"
], function(
	config, util, flags, enums, dom,
	messenger, logger, router,
	svc, helpers, component,
	_api, _model, _module, _messenger, _promises
) {
	"use strict";

	_model.propertyOne = 123345;

});




/*************************  *************************/
myapp.define({
	name: "my-component",
	require: [
		"my-component",
		"/components/my-component.js",
		"/components/combined.js#my-component"
	],
	main: function(
		config, util, flags, enums, dom,
		messenger, logger, router,
		svc, helpers, component,
		MyComponent
	) {
		"use strict";

		var _static = {};		

		return function (options) {

		};
	}
});



myapp.defineModel({
	name: "model-name",
	require: [
		"my-component",
		"/components/my-component.js",
		"/components/combined.js#my-component"
	],
	keys: [
		"propertyOne",
		"propertyTwo",
		"propertyThree"
	],
	main: function(
		config, util, flags, enums, dom,
		messenger, logger, router,
		svc, helpers, component,
		MyComponent
	) {
		"use strict";

		var _static = {};		

		return function (_api, _model, _module, _messenger, _promises) {
			"use strict";

			_model.propertyOne = 123345;
		};
	}
});







/*************************  *************************/

//var myComponent = new component.Component("model-name", {});
var myComponent = component.Create("model-name", {});


/**
	The bootloader for the single-page-application.  No other 
	objects are within the global 'window' namespace.
*/
var myapp = new function() {
	"use strict";

	var _api = this,
		_requireMappings,
		_dependencyManager,
		_createDependency;



	/************************* Require Mappings *************************/
	_requireMappings = {
		// Configuration
		config: "/js/_config.js",

		// SAMPLE - Assumed to be the first on the page (should only be 1 definition in this case but that is not enforced)
		nameOfDefinition: "/js/sample.js",

		// SAMPLE - Not assumed, must give the name of the definition
		nameOfDefinition: "/js/sample.js#name-of-definition",

		// Application
		enums: "/js/_app.js#enums",
		flags: "/js/_app.js#flags",
		helpers: "/js/_app.js#helpers",
		svc: "/js/_app.js#svc",
		user: "/js/_app.js#user",
		util: "/js/_app.js#util",

		// Framework
		component: "/js/_framework.js#component",
		dom: "/js/_framework.js#dom",
		logger: "/js/_framework.js#logger",
		messenger: "/js/_framework.js#messenger",
		router: "/js/_framework.js#router",

		// Component: My Component
		myComponent_ModelPartA: "/components/my-component.js#modelPartA"
	};



	/************************* Dependency Manager *************************/
	_dependencyManager = new function() {
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


	_createDependency = function(options) {
		var dependency;

		//
		dependency = {
			name: options.name,
			main: options.main(
				_config, _util, _flags, _enums, _dom,
				_messenger, _logger, _router,
				_svc, _helpers, _component,
				...arguments
			)
		};	

		return dependency;
	};


	// _api.define = function(dependencies, fn) {
	// 	return dependencyManager
	// 		.load(dependencies)
	// 		.then(function() {
	// 			var Obj = {
	// 				fn: fn(
	// 					config, util, enums, dom,
	// 					messenger, logger, component,
	// 					...arguments
	// 				)
	// 			};

	// 			dependencyManager.add(Obj);

	// 			return Promise.resolve(Obj);
	// 		});
	// };


	_api.define = function(options) {
		// Verify arguments
		if (typeof options !== "object" || options === null) {
			throw new SyntaxError(`The definition must be defined with the following object: { name: string, main: function, require: optional array<string> }.`);
		}

		if (typeof options.name !== "string" || options.name.trim() === "") {
			throw new SyntaxError(`The definition must have a valid name (usage: { name: string, main: function, require: optional array<string> }).`);
		}

		if (typeof options.main !== "function") {
			throw new SyntaxError(`The definition must have a valid function (usage: { name: string, main: function, require: optional array<string> }).`);
		}

		//
		return dependencyManager
			.load(options.require)
			.then(function() {
				//
				var dependency = createDependency(options);

				//
				dependencyManager.add(dependency);

				//
				return Promise.resolve(dependency);
			});
	};



	_api.defineModel = function(options) {
		// Verify arguments
		if (typeof options !== "object" || options === null) {
			throw new SyntaxError(`The model must be defined with the following object: { name: string, main: function, keys: optional array<string>, require: optional array<string> }.`);
		}

		if (typeof options.name !== "string" || options.name.trim() === "") {
			throw new SyntaxError(`The model must have a valid name (usage: { name: string, main: function, keys: optional array<string>, require: optional array<string> }).`);
		}

		if (typeof options.main !== "function") {
			throw new SyntaxError(`The model must have a valid function (usage: { name: string, main: function, keys: optional array<string>, require: optional array<string> }).`);
		}

		//
		return dependencyManager
			.load(options.require)
			.then(function() {
				//
				var dependency = createDependency(options);		

				//
				component.model({
					name: options.name,
					keys: options.keys,
					main: dependency.main
				});

				//
				return Promise.resolve(dependency);
			});
	};



	_api.defineAction = function(options) {};



	_api.require = function(dependencies) {
		return dependencyManager
			.load(dependencies);
	};



	/************************* Load Dependencies *************************/
	onReady(function() {
		//
		dependencyManager
			.load([
				"config",
				"util",
				"flags",
				"enums",
				"dom",
				"messenger",
				"logger",
				"router",
				"svc",
				"helpers",
				"component"
			])
			.then(function(
				config, util, flags, enums, dom
			) {
				_config = new Config();
				_util = new Util();
				_flags = new Flags();
				_enums = new Enums();
				_dom = new DOM();
				_messenger = new Messenger();
				_logger = new Logger();
				_router = new Router();
				_svc = new Svc();
				_helpers = new Helpers();
				_component = new Component();
			});
	});



	/************************* Return Public API (global to browser) *************************/
	return _api;
};
