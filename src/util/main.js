/**
	
*/
function Util() {
	"use strict";

	var _init,
		_api = this;



	/************************* Validate *************************/
	// If: The util was called as a function and not as a constructor.
	// Then: Throw an exception and prevent the API from being returned.
	if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "Util") {
		throw new SyntaxError(`Util is not a function, use it as a constructor. Usage: var util = new Util({})`);
	}



	/************************* Initialize *************************/
	_api.str = new UtilString();
	_api.obj = new UtilObject();
	_api.array = new UtilArray();
	_api.uri = new UtilURI();

	// Create your own app specific utility here.
	// _api.app = new UtilApp();



	/************************* Return API *************************/
	return Object.freeze(_api);
};