/**
	
*/
function Component(_root) {
	"use strict";

	var _CreateModule,
		//_CreateFactory,
		_DefineModel,
		_DefineAction,
		_DefineTemplate,
		_DefineUtil,
		_Module,
		_Component,
		_api = {},
		_models = {},
		_actions = {},
		_templates = {};



	/************************* Validate *************************/
	// If: The component was called as a function and not as a constructor.
	// Then: Throw an exception and prevent the API from being returned.
	if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "Component") {
		throw new SyntaxError(`Component is not a function, use it as a constructor (usage: new Component({ container: HTMLElement, model: "root-component-name", template: "root-template-name" })).`);
	}


	// // If: The component root is not defined.
	// // Then: Throw an exception and prevent the API from being returned.
	// if (typeof _root === "undefined") {
	// 	throw new SyntaxError(`The component root are not defined (usage: new Component({ container: HTMLElement, model: "root-component-name", template: "root-template-name" })).`);
	// }


	// // If: The component root is not an object.
	// // Then: Throw an exception and prevent the API from being returned.
	// if (typeof _root !== "object" || Object.keys(_root).length === 0) {
	// 	throw new SyntaxError(`The component root must be an object (usage: new Component({ container: HTMLElement, model: "root-component-name", template: "root-template-name" })).`);
	// }


	// // If: The required component root properties do not exist.
	// // Then: Throw an exception and prevent the API from being returned.
	// if (!(_root.container instanceof HTMLElement)
	// 	|| typeof _root.model !== "string"
	// 	|| typeof _root.template !== "string"
	// 	|| _root.model.trim() === ""
	// 	|| _root.template.trim() === "") {
	// 	throw new SyntaxError(`The component root must be an object (usage: new Component({ container: HTMLElement, model: "root-component-name", template: "root-template-name" })).`);
	// }



	/************************* Internal Objects *************************/
	/*

	*/
	_CreateModule = function CreateModule(createOptions) {
		"use strict";

		var container, util, modelName, modelTemplate, modelInputs;


		// Validate
		if (typeof createOptions === "undefined") {
			throw new SyntaxError(`The module options are not defined (usage: component.module({ container: HTMLElement, model: "root-component-name", template: "root-template-name" })).`);
		}
		else if (typeof createOptions !== "object" || Object.keys(createOptions).length === 0) {
			throw new SyntaxError(`The module options must be an object (usage: component.module({ container: HTMLElement, model: "root-component-name", template: "root-template-name" })).`);
		}
		else if (!(createOptions.container instanceof HTMLElement)
			|| typeof createOptions.model !== "string"
			|| typeof createOptions.template !== "string"
			|| createOptions.model.trim() === ""
			|| createOptions.template.trim() === "") {
			throw new SyntaxError(`The module options must have a HTMLElement container, model name, and template name (usage: component.module({ container: HTMLElement, model: "root-component-name", template: "root-template-name" })).`);
		}

		container = createOptions.container;
		util = createOptions.util;

		modelName = createOptions.model;
		modelTemplate = createOptions.template;
		modelInputs = createOptions.inputs.

		model = new _models[modelName](
			root.model,
			root.api,
			root.protected,
			root.messenger,
			root.module: {
				createChildComponent,
				util
			},
			root.inputs
		);


		return Promise.resolve(() => new Component({}));
	};


	// /*

	// */
	// _CreateFactory = function CreateFactory(createOptions) {
	// 	"use strict";

	// 	var componentAPI = {};


	// 	model = new _models[modelName](
	// 		root.model,
	// 		root.api,
	// 		root.protected,
	// 		root.messenger,
	// 		root.createChildComponent,
	// 		root.inputs
	// 	);


	// 	return Promise.resolve(() => new Component({}));
	// };



	/*

	*/
	_DefineModel = function DefineModel(modelName, ModelObject) {
		"use strict";

		if (typeof modelName !== "string" || modelName.trim() === "") {
			throw new SyntaxError(`The model name must be a valid string (usage: component.model(string, function).`);
		}

		if (typeof ModelObject !== "function") {
			throw new SyntaxError(`The model object must be a valid function (usage: component.model(string, function).`);
		}

		// No check to see if model name currently exists.  If two
		// models have the same name, then the last one in will be
		// the current.  This is how variables work, so leaving that
		// same power to the developer to get right.
		_models[modelName] = ModelObject;
	};



	/*

	*/
	_DefineAction = function DefineAction(actionName, ActionObject) {
		"use strict";

		if (typeof actionName !== "string" || actionName.trim() === "") {
			throw new SyntaxError(`The action name must be a valid string (usage: component.action(string, function).`);
		}

		if (typeof ActionObject !== "function") {
			throw new SyntaxError(`The action object must be a valid function (usage: component.action(string, function).`);
		}

		// No check to see if action name currently exists.  If two
		// actions have the same name, then the last one in will be
		// the current.  This is how variables work, so leaving that
		// same power to the developer to get right.
		_actions[actionName] = ActionObject;
	};



	/*

	*/
	_DefineTemplate = function DefineTemplate(templateName, templateInput, actionList) {
		"use strict";

		var template;

		if (typeof templateName !== "string" || templateName.trim() === "") {
			throw new SyntaxError(`The template name must be a valid string (usage: component.template(string, string, optional array).`);
		}

		if (typeof templateInput !== "string" || templateInput.trim() === "") {
			throw new SyntaxError(`The template input must be a valid string (usage: component.action(string, string, optional array).`);
		}

		//
		template = (isTemplatePath(templateInput))
			? fetchTemplate(templateInput)
			: templateInput;

		// No check to see if template name currently exists.  If two
		// templates have the same name, then the last one in will be
		// the current.  This is how variables work, so leaving that
		// same power to the developer to get right.
		_templates[templateName] = template;
	};


	/*

	*/
	_DefineUtil = function DefineUtil(utilName, utilObject) {
		"use strict";

		if (typeof utilName !== "string" || utilName.trim() === "") {
			throw new SyntaxError(`The util name must be a valid string (usage: component.util(string, function).`);
		}

		if (typeof UtilObject !== "function") {
			throw new SyntaxError(`The util object must be a valid function (usage: component.util(string, function).`);
		}

		// No check to see if util name currently exists.  If two
		// utils have the same name, then the last one in will be
		// the current.  This is how variables work, so leaving that
		// same power to the developer to get right.
		_actions[utilName] = UtilObject;
	};


	/*

	*/
	_Module = function Module() {
		"use strict";

		var moduleAPI;

		moduleAPI.destroy = function () {
			// Forces all components to destroy themselves
		};

		//moduleAPI.util = {};
		moduleAPI.component = rootComponent.api;  // Should not expose destroy, remove view, etc

		innerModule = {
			util,
			createChildComponent,
			createChildComponentList
		}
	};


	/*

	*/
	_Component = function Component(modelName, inputs) {
		"use strict";

		var componentAPI,
			model;


		// _modelInstance = {};

		// _modelInstance.api = {};


		// Object.defineProperty(_modelInstance, "model", {
		// 	get: function() {
  //               return _modelInstance["model"];
  //           },
  //           set: function(modelProperty) {
  //               var oldValue = _models[modelName];
  //               _models[modelName] = modelProperty;
  //           }
		// });

		// model = new _models[modelName](_modelInstance.api, _modelInstance.model, _modelInstance.module, _modelInstance.messenger, _modelInstance.promises);


		_model = {};

		_modelInstance = new _models[modelName](_api, _model, _module, _messenger, _promises);

		// Flip model...
		_internalModel = _model;

		// Replace model properties...
		Object
			.keys(_model)
			.forEach(key => {
				Object.defineProperty(_model, key, {
					get: function() {
		                return _internalModel[key];
		            },
		            set: function(value) {
		                var previousValue = _models[key];
		                _internalModel[key] = valuevalue;
		            }
				});
			});

		Object.seal(_model);



		_messenger.model.post("onModelReady", inputs);

		_messenger.model.post("onBeforeDestroy");
		_messenger.model.post("onViewDestroyed");
		_messenger.model.post("onViewCreated");

		_messenger.model.post("onModelChanged", {
            key: key,
            value: value,
            previousValue: previousValue
        });





		componentAPI.destroy = function (forceDestroy) {
			return true || false;
		};

		componentAPI.removeView = function () {
			return true || false;
		};

		componentAPI.api = {};
	};



	/************************* Helper Methods *************************/
	// _helper = function () {

	// };


	/************************* Public API *************************/
	_api.module = _CreateModule;
	//_api.create = _CreateFactory;
	_api.model = _DefineModel;
	_api.action = _DefineAction;
	_api.template = _DefineTemplate;
	_api.util =_DefineUtil;

	_api.create = _CreateComponent;



	/************************* Return API *************************/
	return Object.freeze(_api);
};
