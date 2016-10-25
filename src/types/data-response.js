/**
	Immutable data response object.

	The 'data' object is not suppose to have any methods attached to it.  It should only be data.  The clone methods will strip all methods.
*/
//function Data(_options) {
//function BaseResponse(_options) {
function DataResponse(_options) {
	"use strict";

	var _init, _makeImmutable, _deepFreeze, _dataStringified,
		_api = this,
		_defaults = {
			status: DataResponse.Status.UNDEFINED,
			messages: [],
			errors: [],
			data: undefined
		};



	/************************* FFFF *************************/
	if (typeof _options === "undefined") {
		_options = {};
	}



	/************************* Validate *************************/
	// The DataResponse object was called as a function and not as a constructor.
	if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "DataResponse") {
		throw new SyntaxError(`DataResponse is not a function, use it as a constructor. Usage: var response = new DataResponse({})`);
	}

	// The status must be a string or undefined.
	if (typeof _options !== "object" && !Array.isArray(_options)) {
		throw new SyntaxError(`The input to the constructor must be an object (typeof: ${typeof _options}).  The available properties are 'status', 'data' , 'messages', and 'errors'.`);
	}

	// The status must be a string or undefined.
	if (typeof _options.status !== "undefined" && typeof _options.status !== "string") {
		throw new SyntaxError(`The status must be an instance of DataResponse.Status (value: ${_options.status}, expected: ${Object.keys(DataResponse.Status).join(", ")}).`);
	}

	// The status is not equal to an enum instance of DataResponse.Status.
	if (typeof _options.status === "string" && Object.keys(DataResponse.Status).every(status => status !== _options.status)) {
		throw new SyntaxError(`The status must be an instance of DataResponse.Status (value: ${_options.status}, expected: ${Object.keys(DataResponse.Status).join(", ")}).`);
	}

	// All of the messages must be a string.
	if (Array.isArray(_options.messages) && _options.messages.some(message => typeof message !== "string")) {
		throw new SyntaxError(`All messages must be a string.`);
	}

	// All of the errors must be an instance of a native JavaScript 'Error'.
	if (Array.isArray(_options.errors) && _options.errors.some(error => !(error instanceof Error))) {
		throw new SyntaxError(`All errors must be an instance of 'Error'.`);
	}



	/************************* Helper Methods *************************/
	_init = function () {
		var status, data, messages, errors;

		//
		status = (typeof _options.status === "string")
			? _options.status
			: _defaults.status;

		data = (typeof _options.data !== "undefined")
			? _makeImmutable(_options.data)
			: _defaults.data;

		messages = (Array.isArray(_options.messages))
			? _options.messages
			: _defaults.messages;

		errors = (Array.isArray(_options.errors))
			? _options.errors
			: _defaults.errors;

		//
		_dataStringified = JSON.stringify(data);

		//
		_api.status = status;
		_api.data = data;
		_api.messages = messages;
		_api.errors = errors;
	};


	_makeImmutable = function (obj) {
		var clone = JSON.parse(
			JSON.stringify(obj)
		);

		_deepFreeze(clone);

		return clone;
	};


	_deepFreeze = function (obj) {
		// Freeze each child property
		if (typeof obj === "object" && obj !== null) {
			Object
				.getOwnPropertyNames(obj)
				.forEach(key => {
					_deepFreeze(obj[key]);
				});

			// Freeze object
			Object.freeze(obj);
		}
	};



	/************************* Public API *************************/
	_api.cloneData = function () {
		return JSON.parse(_dataStringified);
	};



	/************************* Initialize *************************/
	_init();



	/************************* Return API *************************/
	return Object.freeze(_api);
};



/**
	
*/
DataResponse.Status = Object.freeze({
	UNDEFINED: "UNDEFINED",
	NONE: "NONE",
	SUCCESS: "SUCCESS",
	ERROR: "ERROR",
	WARNING: "WARNING"
});
