# points-of-interest
 
# Node.js REST API

## Overview

This API simulates a manager of points of interest.

It was written using expressJS and typescript, with support from ```awilix``` for dependency injection.

To run the application, execute the following from the root directory:

```
npm run start
```

To run the unit test suite, execute the following from the root directory:

```
npm run test
```

The application will be running on localhost and on port 3000 by default. You can access its swagger docs page at http://localhost:3000/api-docs/

## Libraries used
* ```joi``` - to validate incoming request payloads.
* ```awilix``` - to build a container with all of my components and facilitate injecting dependencies into them. With its dependency injection capabilities, we are able to achieve modularity and more efficient testing of our dependencies.

## Additional notes:
Improvements that could have been implemented with more time:

- Take more advantage of the dependency injection foundation to create abstract interfaces for service classes, so that it is easier to swap between different datastores
- Validate all of the incoming data (the payloads for interest points+products were significantly large so I didn't have enough time to create a validation schema for the entire set. a smaller schema was made for illustration purposes)
- Validation across endpoints (for example similarly to how we validate the payload in the POST point route, do the same for the PUT request)
- Handle more error codes in error handling, e.g 404, 409.
- setup ESLint to help ensure quality and consistency in the codebase
- unit tests for service methods (due to time, I made a unit test for the controller for illustration purposes)
- Monitoring: Create a custom logging class, with different levels of logging, to improve monitoring and reduce cluttering.
- Setup environment variables such as API ports, database connection details
- Setup an API documentation framework like Swagger to automatically generate API docs page
- Use caching to retrieve frequently accessed data and reduce the load on our database