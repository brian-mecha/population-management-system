[![Build Status](https://travis-ci.org/brian-mecha/population-management-system.svg?branch=master)](https://travis-ci.org/brian-mecha/population-management-system)

# Population management system.
A simple Population management API that manages the population of locations.

## Getting started
### Setting up
- Make sure you have [NodeJS](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/).
- Clone the repo.
- `cd` into the project directory.
- Create a copy of the `.env.example` and rename it to `.env`.
- Fill in the required values in the newly crreated `.env` file above.
- Install dependencies: `npm i`
- Start the serverby running: `npm run start:dev`.

### Testing with Postman
Make sure you have [Postman](https://getpostman.com/) installed then click the button below to get a collection of all the endpoints used in this API.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5739db9eb17dcd638e44)

### Hosted Link
The API is hosted: [here](https://population-mngt-api.herokuapp.com/api/v1).

### API Documentation
The documentation of all the endpoints can be found [here](https://web.postman.co/collections/1489197-a9e7fb82-882b-4a17-a211-dc063f4b9680?version=latest&workspace=c9b5f2c1-1a81-4efd-81f7-204018125f41#7b949a2a-5143-4912-ae9b-10149e68f96a).

## Features
- User should be able to regiser and login using email and password.
- User should be able to get all locations and their respective population.
- User should be able to create a location and their respective population.
- User should be able to edit a location and their respective population.
- User should be able to delete a location and their respective population.

## License

&copy; Brian Mecha

Licensed under the [MIT License](https://github.com/brian-mecha/population-management-system/blob/master/LICENSE)
