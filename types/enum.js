
var Enum = function Enum(_enumConstants) {
	"use strict";

	var EnumConstant, _init, _isKeyReserved, _isEnumConstant, _constantKey,
		_api = {},
		_reservedKeys = [
			"constructor",
			"hasOwnProperty",
			"isPrototypeOf",
			"propertyIsEnumerable",
			"toLocaleString",
			"toString",
			"valueOf",
			"compare",
			"getByValue"
		];



	/************************* Validate *************************/
	// If: The enum object was called as a function and not as a constructor.
	// Then: Throw an exception and prevent the API from being returned.
	if (typeof this === "undefined" || typeof this.constructor === "undefined" || this.constructor.name !== "Enum") {
		throw new SyntaxError(`Enum is not a function, use it as a constructor. Usage: var myEnum = new Enum({})`);
	}


	// If: The enum constant list is not defined.
	// Then: Throw an exception and prevent the API from being returned.
	if (typeof _enumConstants === "undefined") {
		throw new SyntaxError(`The enum constant list is not defined.  Pass an object to the constructor.`);
	}


	// If: The enum constant list is not an object.
	// Then: Throw an exception and prevent the API from being returned.
	if (typeof _enumConstants !== "object") {
		throw new SyntaxError(`The enum constant list must be an object.`);
	}



	/************************* Internal Objects *************************/
	EnumConstant = function EnumConstant(enumConstantKey, enumConstantValues) {
		"use strict";

		var isValueInList = function(value) {
			var key, isValueInList = false;

			for (key in enumConstantValues) {
				if (value === enumConstantValues[key]) {
					isValueInList = true;
					break;
				}
			}

			return isValueInList;
		};

		return Object.freeze({
			get isEnumConstant() { return true; },
			toString: function() {
				return enumConstantKey;
			},
			equals: function(compareValue) {
				return (
					(compareValue === this)
					|| isValueInList(compareValue)
				);
			}
		});
	};


	/************************* Helper Methods *************************/
	_init = function() {
		var key;

		for (key in _enumConstants) {
			// If: The key is a reserved keyword, throw exception.
			// Else If: The one of the enum constant is not an array or does not
			//			have at least 1 value, throw exception.
			if (_isKeyReserved(key)) {
				throw new SyntaxError(`The key '${key}' is a reserved keyword.`);
			}
			else if (!Array.isArray(_enumConstants[key]) || _enumConstants[key].length === 0) {
				throw new SyntaxError(`The enum constant must be an array of values with a minimum of 1 value. Constant: ${key}`);
			}
			
			// Create a new enum constant object.
			_api[key] = new EnumConstant(key, _enumConstants[key]);
		}
	};


	_isKeyReserved = function(key) {
		var i, isReserved = false;

		for (i = 0; i < _reservedKeys.length; i++) {
			if (_reservedKeys[i] === key) {
				isReserved = true;
				break;
			}
		}

		return isReserved;
	};


	_isEnumConstant = function(value) {
		return (
			typeof value === "object"
			&& value.isEnumConstant
		);
	};



	/************************* Public API *************************/
	_api.getByValue = function(value) {
		var enumConstant, key;

		for (key in _api) {
			if (!_isKeyReserved(key) && _api[key].equals(value)) {
				enumConstant = _api[key];
				break;
			}
		}

		return enumConstant;
	};


	_api.compare = function(value1, value2) {
		var enum1, enum2,
			isTheSame = false;

		// Throw an error if there are not two values.
		if (typeof value1 === "undefined" || typeof value2 === "undefined" || ) {
			throw SyntaxError(`The compare function takes in two values. (value1: ${value1}, value2: ${value2})`);
		}

		// Convert the values to their respective enum constant
		enum1 = (_isEnumConstant(value1))
			? value1
			: _api.getByValue(value1);

		enum2 = (_isEnumConstant(value2))
			? value2
			: _api.getByValue(value2);

		// Compare the two enum constants
		if (_isEnumConstant(enum1) && _isEnumConstant(enum2)) {
			isTheSame = enum1.equals(enum2);
		}

		return isTheSame;
	};



	/************************* Initialize *************************/
	_init();



	/************************* Return API *************************/
	return Object.freeze(_api);
};


var myEnum = new Enum({
	constantZero: [0, "zero"],
	constantOne: [1, "one"],
	constantTwo: [2, "two"]
});

var enumInstance = myEnum.constantZero;

console.log("=== Enum Object Will Not Change ===")
console.log("myEnum (before):", myEnum)
myEnum.constantZero = 99;
myEnum.newProperty = 10;
console.log("myEnum.constantZero = 99;")
console.log("myEnum.newProperty = 10;")
console.log("myEnum (after):", myEnum)

console.log("=== All True ===");
console.log("(myEnum.constantZero === enumInstance):", myEnum.constantZero === enumInstance);
console.log("(myEnum.constantZero.equals(0)):", myEnum.constantZero.equals(0));
console.log("(myEnum.constantZero.equals('zero'))):", myEnum.constantZero.equals("zero"));
console.log("(myEnum.constantZero.equals(enumInstance)):", myEnum.constantZero.equals(enumInstance));
console.log("(myEnum.compare(0, 'zero')):", myEnum.compare(0, "zero"));
console.log("(myEnum.compare(0, enumInstance)):", myEnum.compare(0, enumInstance));
console.log("(myEnum.compare(0, 'zero')):", myEnum.compare(0, "zero"));

console.log("=== All False ===");
console.log("(myEnum.constantOne === enumInstance):", myEnum.constantOne === enumInstance);
console.log("(myEnum.constantZero.equals()):", myEnum.constantZero.equals());
console.log("(myEnum.constantZero.equals('0')):", myEnum.constantZero.equals("0"));
console.log("(myEnum.constantZero.equals('one')):", myEnum.constantZero.equals("one"));
console.log("(myEnum.constantZero.equals(myEnum.constantOne)):", myEnum.constantZero.equals(myEnum.constantOne));
console.log("(myEnum.compare(0, 'one')):", myEnum.compare(0, "one"));
console.log("(myEnum.compare(0, myEnum.constantOne)):", myEnum.compare(0, myEnum.constantOne));

console.log("=== Throws Exception ===");
console.log("(myEnum.constantZero.equals()):", myEnum.compare("zero", "notvalid"));
console.log(Enum());

