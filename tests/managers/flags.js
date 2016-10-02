
describe("Flags", function() {
	var flags;


	/*************** Init Before Each Test ***************/
	beforeEach(function() {
		flags = new Flags({
			"developer-mode": true,
			"new-feature": false
		});
	});



	/*************** Exception Tests ***************/
	it("Throw Exception: Flags() (no flags passed to constructor)", function() {
		expect(() => new Flags())
			.to.throwError();

		expect(() => new Flags({}))
			.to.throwError();

		expect(() => new Flags([]))
			.to.throwError();

		expect(() => new Flags(99))
			.to.throwError();

		expect(() => new Flags("string"))
			.to.throwError();

		expect(() => new Flags(function() {}))
			.to.throwError();
	});


	it("Throw Exception: Flags() (used as a function)", function() {
		expect(() => Flags())
			.to.throwError();
	});


	it("Throw Exception: Flags.apply(), Flags.call(), Flags.bind()", function() {
		expect(() => Flags.apply())
			.to.throwError();

		expect(() => Flags.call())
			.to.throwError();

		expect(() => Flags.bind()())
			.to.throwError();
	});
});