# js-libraries
A repository of micro-libraries to support JavaScript applications.

These libraries are used in a browser-based framework where they have no dependencies on anything within the framework.

All libraries are dependency free.

## Why Micro-Libraries
A JavaScript library should do one thing, and do it well.

A project typically includes various libraries and only uses a subset of functionality from each library.  Many times a hack is used to get some of the library's features working within the project's design.

With mico-libraries, you consume what you need.  If a library does not work for your project, then you can easily modify the micro-library or roll your own.

## Available Libraries

* Component
* Enum
  * A basic enum type with the ability to associate multiple values to a single enum instance.
* Flags
* Messenger
  * A simple messenger that returns a promise upon completion of all listening functions.