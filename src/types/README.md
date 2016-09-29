# Types
Simple types to extend the base types in JavaScript.


## Enum
JavaScript does not offer a native enum type.  Most developers will create a basic object where each enum instance is equal to a string or number.  When the enum is used, the reference to the original enum object is lost (since its a string or number).  With the `Enum` library, each enum instance is an object that will be passed as reference.

The multiple values for each enum instance allows for greater flexibility throughout your application.  This comes in handy when you have a public API and users may input the values slightly differently.  Or it allows you to upgrade your API without breaking older instances!

The values for each enum instance can be any valid JavaScript type, but I would recommend using numbers and strings.

After an enum is created, it cannot be modified.

#### Usage:
```
var MyEnum = new Enum({
	ZERO: [0, "zero"],
	ONE: [1, "one"],
	TWO: [2, "two"],
	NUMBER: ["int", "integer", "num", "number", "float"]
});

var enumInstance = MyEnum.ZERO;

MyEnum.compare(enumInstance, 0);
MyEnum.compare(enumInstance, "zero");
MyEnum.compare(enumInstance, MyEnum.ZERO);

enumInstance.equals(0);
enumInstance.equals("zero");
enumInstance.equals(MyEnum.ZERO);

enumInstance === MyEnum.ZERO;
```

#### Future Ideas: 
* Add an 'ignoreCase' flag.