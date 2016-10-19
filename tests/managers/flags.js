
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



	/*************** Tests ***************/
	it("Initial Flag Values", function() {
		expect(flags["developer-mode"])
			.to.be(true);

		expect(flags["new-feature"])
			.to.be(false);
	});


	it("Set Flag Values", function() {
		flags["developer-mode"] = false;
		flags["new-feature"] = true;

		expect(flags["developer-mode"])
			.to.be(false);

		expect(flags["new-feature"])
			.to.be(true);
	});


	it("0 or 1 Flag Values (resolves to true or false)", function() {
		flags["developer-mode"] = 0;
		flags["new-feature"] = 1;

		expect(flags["developer-mode"])
			.to.be(false);

		expect(flags["new-feature"])
			.to.be(true);
	});
});