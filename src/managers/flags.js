/**
	
*/
function Flags(_flags) {
	"use strict";

	var _getFlagValuesFromHash,
		_api = {};



	/************************* Validate *************************/
	// If: The flags was called as a function and not as a constructor.
	// Then: Throw an exception and prevent the API from being returned.
	if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "Flags") {
		throw new SyntaxError(`Flags is not a function, use it as a constructor. Usage: var myFlags = new Flags({})`);
	}


	// If: The flags list is not defined.
	// Then: Throw an exception and prevent the API from being returned.
	if (typeof _flags === "undefined") {
		throw new SyntaxError(`The flags list is not defined.  Pass an object to the constructor.`);
	}


	// If: The flags list is not an object.
	// Then: Throw an exception and prevent the API from being returned.
	if (typeof _flags !== "object" || Object.keys(_flags).length === 0) {
		throw new SyntaxError(`The flags list must be an object.`);
	}


	/************************* Helper Methods *************************/
	_getFlagValuesFromHash = function () {

	};


	/************************* Return API *************************/
	// Object.seal() allows for the values of the flags to be changed, but not the list itself.
	return Object.seal(_flags);
};
