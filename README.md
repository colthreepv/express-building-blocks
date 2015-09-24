# express-building-blocks
This project aims to provide reusable components for your actual and future express.js project(s).

The building blocks of **this** project (and I hope your projects as well) are:

  * [io.js](https://iojs.org/) out since months and it has brought more fresh air than we seen in years.
  * [Bluebird](https://github.com/petkaantonov/bluebird) - if you don't know [Petka Antonov](https://github.com/petkaantonov) jewel, you have some reading to do
  * [XError](https://github.com/yzarubin/x-error) - Javascript errors for web services
  * [Electrolyte](https://github.com/jaredhanson/electrolyte) - Inversion of Control for node.js, provides a Dependency Injection mechanism similar to what you've seen on Angular.js or more advanced frameworks

Special Thanks to:

  * [Yuri Zarubin](https://github.com/yzarubin) - most of this work was inspired by his ideas

# Ground-up Idea:

Any controller in this project returns a Bluebird Promise, when it's resolved it's usually a payload to send to the user, or a context to be compiled in a page template.  
When the Promise gets rejected, it is usually an XError that describes which error code, HTTP response and HTTP code use to reply the user.

Tests are not on endpoints, no `supertest` here, tests are on controllers, and are Promise-Based.

# Generic components and specific components for your Application
In web services specific solutions are sometimes required, while you don't want to publish those, as they *might* reflect business logic, happens usually to **not publish anything at all**, keeping the entire project closed source.

This repository shows how a middle-ground is achievable through using DI, and specifically electrolyte.

Directory structure
```
<YOURPROJECT>
 | - package.json
 | - app.js # your express application
 | - components/ # directory containing app-specific components
 | - components/logic.js # specific business logic for your application
 | - node_modules # dependencies of your project, togheter with ebb
 | - node_modules/express-building-blocks # this component library
 | - node_modules/express-building-blocks/components/test.js
 | - ioc.js # Inversion of Control loader

```

a sample ioc.js can be like:
```javascript
var path = require('path');
var components = path.join(path.dirname(require.resolve('express-building-blocks')), 'components');

var ioc = require('electrolyte');
ioc.use(ioc.node(__dirname));
ioc.use('components', ioc.node(components));
module.exports = ioc;
```

With such `ioc.js` structure, you can mix and match _local_ `component(s)` with `express-building-blocks` component(s).

sample `components/logic.js`:
```javascript
exports = module.exports = function () {
    console.log('This components comprises corporate business logic!');
};
```

sample `node_modules/express-building-blocks/components/test.js`:
```javascript
exports = module.exports = function () {
    console.log('Generic components used for console logging this message');
};
```

in your `app.js`:
```javascript
var ioc = require('./ioc');
ioc.create('components/logic');
ioc.create('components/test');
```

The result will be:
```shell
$ node app.js
This components comprises corporate business logic!
Generic components used for console logging this message
$
```

A full, working example can be found in [`example`](example) dir.
