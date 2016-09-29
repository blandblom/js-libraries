var Messenger = function Messenger(_options) {
	"use strict";

	var _api = {}, //this,
		_private = {},
		_callbackGroups = [];



	/************************* Initialize *************************/
	// If: Messenger was called as a function and not as a constructor.
	if (typeof this === "undefined" || this instanceof Window) {
		throw new SyntaxError(`Messenger is not a function, use it as a constructor. Usage: var messenger = new Messenger(options)`);
	}

	// Set default options
	_options = _options || {};



	/************************* Private Helpers *************************/
	_private.validateNamespace = function (namespace) {
		if (typeof namespace !== "string") {
			throw new SyntaxError(`The namespace is not a string (current type: '${typeof namespace}').`);
		}
		else if (!namespace.trim()) {
			throw new SyntaxError(`The namespace is an empty string.`);
		}
	};


	_private.validateCallback = function (callback) {
		if (typeof callback !== "function") {
			throw new SyntaxError(`The callback is not a function (current type: '${typeof namespace}').`);
		}
	};


	_private.formatNamespace = function (namespace) {
		return namespace.toLowerCase();
	};



	/************************* Public API *************************/
	_api.listen = function (namespace, callback) {
		// Throw an exception if the namespace or callback are not valid
		_private.validateNamespace(namespace);
		_private.validateCallback(callback);

		// Format the namespace
		namespace = _private.formatNamespace(namespace);

		// Push the callback onto it's namespaced group
		_callbackGroups[namespace] = _callbackGroups[namespace] || [];
		_callbackGroups[namespace].push(callback);
	};


	_api.disconnect = function (namespace) {
		var callbackList;

		// Throw an exception if the namespace or callback are not valid
		_private.validateNamespace(namespace);
		_private.validateCallback(callback);

		// Format the namespace
		namespace = _private.formatNamespace(namespace);

		// Get the list of callbacks for the given namespace
		callbackList = _callbackGroups[namespace];

		// Remove the callback
		if (Array.isArray(callbackList)) {
			let idx = callbackList.findIndex(cb => cb === callback);

			if (idx >= 0) {
				callbackList.splice(idx, 1);
			}				
		}
	};


	_api.post = function (namespace) {
		var args, callbackList, resolvePromise,
			promises = [];

		// Throw an exception if the namespace is not valid
		_private.validateNamespace(namespace);

		// Format the namespace
		namespace = _private.formatNamespace(namespace);

		// Remove the namespace from the arguments list
		args = Array.from(arguments)
		args.splice(0, 1);

		// Find all the callbacks for the namespace
		callbackList = _callbackGroups[namespace];

		// To help with developers debug, the promise resolves
		// with a list of callbacks that were called.
		resolvePromise = function (results) {
			return Promise.resolve({
				args: args,
				callbacks: callbackList,
				options: _options
			});
		};

		// Pass the arguments to each callback
		if (Array.isArray(callbackList)) {
			callbackList.forEach(callback => {
				if (typeof callback === "function") {
					promises.push(
						callback.apply(callback, args)
					);
				}
			});
		}

		// Returns a resolved promise once all of the callbacks
		// have been resolved/returned.
		return Promise
			.all(promises)
			.then(resolvePromise);
	};



	/************************* Return API *************************/
	return Object.freeze(_api);
};
