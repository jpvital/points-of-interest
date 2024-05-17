# Node.js REST API

## Overview

This API simulates a manager of points of interest.

It was written using expressJS and typescript, with support from ```awilix``` for dependency injection.

To run the application, execute the following from the root directory:

```
npm run start
```
In both cases, the application will be running on localhost and on port 3000 by default. You can access its swagger docs page at http://localhost:3000/api-docs/

## Libraries used
* ```joi``` - to validate incoming request payloads.
* ```awilix``` - to build a container with all of my components and facilitate injecting dependencies into them. With its dependency injection capabilities, we are able to achieve modularity and more efficient testing of our dependencies.

## Additional notes:
Improvements that could have been implemented with more time:

- Take more advantage of the dependency injection foundation to create abstract interfaces for service classes, so that it is easier to swap between different datastores
- Do proper validation across endpoints (for example similarly to how we validate the payload in the POST point route, do the same for the PUT request)
- Handle more specific error codes in error handling