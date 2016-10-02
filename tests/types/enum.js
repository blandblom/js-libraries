
describe("Enum", function() {
	var enum1, enum2, instanceZero1, instanceZero2;



	/*************** Init Before Each Test ***************/
	beforeEach(function() {
		enum1 = new Enum({
			zero: [0, "zero"],
			one: [1, "one"],
			two: [2, "two"]
		});

		enum2 = new Enum({
			zero: [0, "zero"],
			one: [1, "one"],
			two: [2, "two"]
		});

		instanceZero1 = enum1.zero;
		instanceZero2 = enum2.zero;
	});



	/*************** Exception Tests ***************/
	it("Throw Exception: new Enum() (no enum instances)", function() {
		expect(() => new Enum())
			.to.throwError();
	});


	it("Throw Exception: Enum() (used as a function)", function() {
		expect(() => Enum())
			.to.throwError();
	});


	it("Throw Exception: Enum.apply(), Enum.call(), Enum.bind()", function() {
		expect(() => Enum.apply())
			.to.throwError();

		expect(() => Enum.call())
			.to.throwError();

		expect(() => Enum.bind()()())
			.to.throwError();
	});


	it("Throw Exception: new Enum({ zero: [] }) (empty enum instances)", function() {
		expect(() => new Enum({ zero: undefined }))
			.to.throwError();

		expect(() => new Enum({ zero: [] }))
			.to.throwError();
	});


	it("Throw Exception: enum1.compare(enum1.zero, undefined)", function() {
		expect(() => enum1.compare(enum1.zero))
			.to.throwError();
	});



	/*************** Frozen Object Tests ***************/
	it("Frozen Object: enum1.zero = [99, 'not valid']", function() {
		enum1.zero = [99, "not valid"];

		expect(enum1.zero.equals(0))
			.to.be(true);

		expect(enum1.zero.equals("zero"))
			.to.be(true);

		expect(enum1.zero.equals(99))
			.to.be(false);

		expect(enum1.zero.equals("not valid"))
			.to.be(false);
	});



	/*************** Comparison Tests ***************/
	it("enum1.zero === 0", function() {
		expect(enum1.zero.equals(0))
			.to.be(true);
	});


	it("enum1.zero === 'zero'", function() {
		expect(enum1.zero.equals("zero"))
			.to.be(true);
	});


	it("enum1.zero === instanceZero1", function() {
		expect(enum1.zero.equals(instanceZero1))
			.to.be(true);

		expect(enum1.zero === instanceZero1)
			.to.be(true);
	});


	it("enum1.zero !== 1", function() {
		expect(enum1.zero.equals(1))
			.to.be(false);
	});


	it("enum1.zero !== 'ZERO'", function() {
		expect(enum1.zero.equals("ZERO"))
			.to.be(false);
	});


	it("enum1.zero !== instanceZero2", function() {
		expect(enum1.zero.equals(instanceZero2))
			.to.be(false);

		expect(enum1.zero !== instanceZero2)
			.to.be(true);
	});


	it("enum1.zero !== enum2.zero", function() {
		expect(enum1.zero.equals(enum2.zero))
			.to.be(false);

		expect(enum1.zero !== enum2.zero)
			.to.be(true);
	});


	it("enum1.zero !== enum1.two", function() {
		expect(enum1.zero.equals(enum1.two))
			.to.be(false);

		expect(enum1.zero !== enum1.two)
			.to.be(true);
	});


	it("enum1.compare(enum1.zero, 0)", function() {
		expect(enum1.compare(enum1.zero, 0))
			.to.be(true);
	});


	it("enum1.compare(enum1.zero, 'zero')", function() {
		expect(enum1.compare(enum1.zero, "zero"))
			.to.be(true);
	});


	it("enum1.compare(enum1.zero, instanceZero1)", function() {
		expect(enum1.compare(enum1.zero, instanceZero1))
			.to.be(true);
	});


	it("enum1.compare(enum1.zero, 1) === false", function() {
		expect(enum1.compare(enum1.zero, 1))
			.to.be(false);
	});


	it("enum1.compare(enum1.zero, 'one') === false", function() {
		expect(enum1.compare(enum1.zero, "one"))
			.to.be(false);
	});


	it("enum1.compare(enum1.zero, instanceZero2) === false", function() {
		expect(enum1.compare(enum1.zero, instanceZero2))
			.to.be(false);
	});


	it("enum1.compare(enum1.zero, enum2.zero) === false", function() {
		expect(enum1.compare(enum1.zero, enum2.zero))
			.to.be(false);
	});



	/*************** Get by Value ***************/
	it("enum1.getByValue(0)", function() {
		expect(enum1.getByValue(0))
			.to.be(enum1.zero);
	});


	it("enum1.getByValue('zero')", function() {
		expect(enum1.getByValue("zero"))
			.to.be(enum1.zero);
	});


	it("enum1.getByValue(99)", function() {
		expect(enum1.getByValue(99))
			.to.be(undefined);
	});


	it("enum1.getByValue('not valid')", function() {
		expect(enum1.getByValue("not valid"))
			.to.be(undefined);
	});
});
