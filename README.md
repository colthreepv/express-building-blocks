# express-building-blocks
This project aims to provide reusable components for your actual and future express.js project(s).

The building blocks of **this** project (and I hope your projects as well) are:

  * [Bluebird](https://github.com/petkaantonov/bluebird) - if you don't know [Petka Antonov](https://github.com/petkaantonov) jewel, you have some reading to do
  * [XError](https://github.com/yzarubin/x-error) - Javascript errors for web services
  * [Electrolyte](https://github.com/jaredhanson/electrolyte) - Inversion of Control for node.js, provides a Dependency Injection mechanism similar to what you've seen on Angular.js or more advanced frameworks

Special Thanks to:

  * [Yuri Zarubin](https://github.com/yzarubin) - most of this work was inspired by his ideas

# Ground-up Idea:

Any controller in this project returns a Bluebird Promise, when it's resolved it's usually a payload to send to the user, or a context to be compiled in a page template.  
When the Promise gets rejected, it is usually an XError that describes which error code, HTTP response and HTTP code use to reply the user.

Tests are not on endpoints, no `supertest` here, tests are on controllers, and are Promise-Based.
