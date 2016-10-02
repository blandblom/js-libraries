
describe("Component", function() {
	var component, container;



	/*************** Init Before Each Test ***************/
	beforeEach(function() {
		container = document.createElement("div");

		component = new Component({
			container: container,
			model: "root-model-name",
			template: "root-temaplte-name"
		});
	});



	/*************** Exception Tests ***************/
	it("Throw Exception: Component() (no options passed to constructor)", function() {
		expect(() => new Component())
			.to.throwError();

		expect(() => new Component({}))
			.to.throwError();

		expect(() => new Component([]))
			.to.throwError();

		expect(() => new Component(99))
			.to.throwError();

		expect(() => new Component("string"))
			.to.throwError();

		expect(() => new Component(function() {}))
			.to.throwError();

		expect(() => new Component({
			container: "",
			model: "root-model-name",
			template: "root-temaplte-name"
		})).to.throwError();

		expect(() => new Component({
			container: container,
			model: "   ",
			template: "root-temaplte-name"
		})).to.throwError();

		expect(() => new Component({
			container: container,
			model: "root-model-name",
			template: "    "
		})).to.throwError();
	});
		

	it("Throw Exception: Component() (used as a function)", function() {
		expect(() => Component())
			.to.throwError();
	});


	it("Throw Exception: Component.apply(), Component.call(), Component.bind()", function() {
		expect(() => Component.apply())
			.to.throwError();

		expect(() => Component.call())
			.to.throwError();

		expect(() => Component.bind()())
			.to.throwError();
	});

});