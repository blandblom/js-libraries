
describe("Messenger", function() {
	var messenger1, messenger2, callback1, callback2;


	callback1 = function() {};
	callback2 = function() {};


	/*************** Init Before Each Test ***************/
	beforeEach(function() {
		messenger1 = new Messenger();
		messenger2 = new Messenger();

		messenger1.listen("callbackOne", callback1);
		messenger1.listen("callbackTwo", callback2);
		messenger1.listen("bothCallbacks", callback1);
		messenger1.listen("bothCallbacks", callback2);

		messenger2.listen("callbackOne", callback1);
		messenger2.listen("callbackTwo", callback2);
		messenger2.listen("bothCallbacks", callback1);
		messenger2.listen("bothCallbacks", callback2);
	});



	/*************** Exception Tests ***************/
	it("Throw Exception: Messenger() (used as a function)", function() {
		expect(() => Messenger())
			.to.throwError();
	});


	it("Throw Exception: Messenger.apply(), Messenger.call(), Messenger.bind()", function() {
		expect(() => Enum.apply())
			.to.throwError();

		expect(() => Enum.call())
			.to.throwError();

		expect(() => Enum.bind()())
			.to.throwError();
	});


	it("Throw Exception: messenger.listen() - Bad namespace", function() {
		expect(() => messenger1.listen())
			.to.throwError();
			
		expect(() => messenger1.listen(undefined))
			.to.throwError();
			
		expect(() => messenger1.listen(undefined, callback1))
			.to.throwError();
			
		expect(() => messenger1.listen(99, callback1))
			.to.throwError();
			
		expect(() => messenger1.listen({}, callback1))
			.to.throwError();
			
		expect(() => messenger1.listen([], callback1))
			.to.throwError();
			
		expect(() => messenger1.listen("", callback1))
			.to.throwError();
			
		expect(() => messenger1.listen(" ", callback1))
			.to.throwError();
	});


	it("Throw Exception: messenger.listen() - Bad/Missing callback", function() {
		expect(() => messenger1.listen("callbackOne"))
			.to.throwError();

		expect(() => messenger1.listen("callbackOne", undefined))
			.to.throwError();

		expect(() => messenger1.listen("callbackOne", 99))
			.to.throwError();

		expect(() => messenger1.listen("callbackOne", {}))
			.to.throwError();

		expect(() => messenger1.listen("callbackOne", []))
			.to.throwError();
	});


	it("Throw Exception: messenger.post() - Bad/Missing namespace", function() {
		expect(() => messenger1.post())
			.to.throwError();
			
		expect(() => messenger1.post(undefined))
			.to.throwError();
			
		expect(() => messenger1.post(99))
			.to.throwError();
			
		expect(() => messenger1.post({}))
			.to.throwError();
			
		expect(() => messenger1.post([]))
			.to.throwError();
			
		expect(() => messenger1.post(""))
			.to.throwError();
			
		expect(() => messenger1.post(" "))
			.to.throwError();
	});


	it("Throw Exception: messenger.disconnect() - Bad/Missing namespace", function() {
		expect(() => messenger1.disconnect())
			.to.throwError();

		expect(() => messenger1.disconnect(callback1))
			.to.throwError();

		expect(() => messenger1.disconnect(undefined, callback1))
			.to.throwError();

		expect(() => messenger1.disconnect(99, callback1))
			.to.throwError();

		expect(() => messenger1.disconnect({}, callback1))
			.to.throwError();

		expect(() => messenger1.disconnect([], callback1))
			.to.throwError();

		expect(() => messenger1.disconnect("", callback1))
			.to.throwError();

		expect(() => messenger1.disconnect(" ", callback1))
			.to.throwError();
	});


	it("Throw Exception: messenger.listen() - Bad/Missing callback", function() {
		expect(() => messenger1.disconnect("callbackOne"))
			.to.throwError();

		expect(() => messenger1.disconnect("callbackOne", undefined))
			.to.throwError();

		expect(() => messenger1.disconnect("callbackOne", 99))
			.to.throwError();

		expect(() => messenger1.disconnect("callbackOne", {}))
			.to.throwError();

		expect(() => messenger1.disconnect("callbackOne", []))
			.to.throwError();
	});



	/*************** Callback Response Tests ***************/
	it("Callback Response: Testing typeof", function(done) {
		messenger1
			.listen("subTest", function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
				try {
					expect(typeof arg0)
						.to.be("object")

					expect(typeof arg1)
						.to.be("object")

					expect(typeof arg2)
						.to.be("number")

					expect(typeof arg3)
						.to.be("string")

					expect(typeof arg4)
						.to.be("boolean")

					expect(typeof arg5)
						.to.be("function")

					expect(typeof arg6)
						.to.be("undefined")

					done();
				}
				catch (ex) {
					done(ex);
				}
			});

		messenger1.post("subTest", {}, [], 99, "my string", false, function() {});
	});



	/*************** Promise Response Tests ***************/
	it("Promise Response: Testing args", function(done) {
		messenger1
			.post("callbackOne", {}, [], 99, "my string", false, function() {})
			.then(response => {
				try {
					expect(response.args.length)
						.to.be(6)

					expect(typeof response.args[0])
						.to.be("object")

					expect(typeof response.args[1])
						.to.be("object")

					expect(typeof response.args[2])
						.to.be("number")

					expect(typeof response.args[3])
						.to.be("string")

					expect(typeof response.args[4])
						.to.be("boolean")

					expect(typeof response.args[5])
						.to.be("function")

					expect(typeof response.args[6])
						.to.be("undefined")

					done();
				}
				catch (ex) {
					done(ex);
				}
			})
	});


	it("Promise Response: Testing callbacks", function(done) {
		messenger1
			.post("bothCallbacks")
			.then(response => {
				try {
					expect(response.callbacks.length)
						.to.be(2)

					expect(typeof response.callbacks[0])
						.to.be("function")	

					expect(typeof response.callbacks[1])
						.to.be("function")	

					expect(typeof response.callbacks[2])
						.to.be("undefined")	

					done();
				}
				catch (ex) {
					done(ex);
				}
			})
	});



	/*************** Scope Tests ***************/
	it("Scope: Adding an callback to messenger2's 'bothCallbacks'.  Messenger1 should not see a change in the number of callbacks.", function(done) {
		messenger2
			.listen("bothCallbacks", function() {});

		messenger1
			.post("bothCallbacks")
			.then(response => {
				try {
					expect(response.callbacks.length)
						.to.be(2)

					done();
				}
				catch (ex) {
					done(ex);
				}
			})
	});



	/*************** Disconnect Tests ***************/
	it("Disconnect: Removed 'callback1' from messenger1's 'bothCallbacks'", function(done) {
		messenger1
			.disconnect("bothCallbacks", callback1);

		messenger1
			.post("bothCallbacks")
			.then(response => {
				try {
					expect(response.callbacks.length)
						.to.be(1)

					expect(response.callbacks[0])
						.to.be(callback2)

					done();
				}
				catch (ex) {
					done(ex);
				}
			})
	});


	it("Disconnect: Removed all from messenger1", function(done) {
		messenger1
			.disconnect("bothCallbacks", callback1);

		messenger1
			.disconnect("bothCallbacks", callback2);

		messenger1
			.post("bothCallbacks")
			.then(response => {
				try {
					expect(response.callbacks.length)
						.to.be(0)

					done();
				}
				catch (ex) {
					done(ex);
				}
			})
	});
});