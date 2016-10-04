/**
	
*/
function Flags(_flags) {
	"use strict";

	var _init, _isValidFlag,
		_convertToBoolean,
		_getFlagValuesFromHash,
		_internalFlags = {},
		_api = this;

	const REGEXP_HASHFLAG = /flags\[([A-Za-z0-9\-\_\&=]+)]/i;



	/************************* Validate *************************/
	// If: The flags was called as a function and not as a constructor.
	// Then: Throw an exception and prevent the API from being returned.
	if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "Flags") {
		throw new SyntaxError(`Flags is not a function, use it as a constructor. Usage: var flags = new Flags({})`);
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
	_init = function () {
		var key, value, hashFlags;

		hashFlags = _getFlagValuesFromHash();

		for (key in _flags) {
			value = (typeof hashFlags[key] === "boolean")
				? hashFlags[key]
				: _flags[key];

			if (_isValidFlag(key, value)) {
				Object.defineProperty(_api, key, {
					get: () => {
						return _internalFlags[key];
					},
					set: val => _internalFlags[key] = _convertToBoolean(val)
				});

				_internalFlags[key] = _convertToBoolean(value);
			}
		}
	};


	_isValidFlag = function (key, value) {
		return (
			typeof key === "string"
			&& typeof value === "boolean"
			&& key.trim() !== ""
		);
	};


	_convertToBoolean = function (value) {
		var bool;

		if (typeof value === "boolean") {
			bool = value;
		}
		else if (typeof value === "number") {
			bool = (value === 1)
				? true
				: false;
		}
		else {
			throw new SyntaxError();
		}

		return bool;
	};


	_getFlagValuesFromHash = function () {
		var hashFlags = {},
			regexpResult;

		regexpResult = REGEXP_HASHFLAG.exec(location.hash);

		if (Array.isArray(regexpResult) && regexpResult.length === 2) {
			regexpResult[1]
				.split("&")
				.forEach(flagStr => {
					var key, value, parts;

					parts = flagStr.split("=");
					key = parts[0];
					value = (typeof parts[1] === "string")
						? parts[1]
						: true;

					if (_isValidFlag(key, value)) {
						hashFlags[key] = value;
					}
				});
		}

		return hashFlags;
	};



	/************************* Initialize *************************/
	_init();



	/************************* Return API *************************/
	// Object.seal() allows for the values of the flags to be changed, but not the list itself.
	return Object.seal(_api);
};
