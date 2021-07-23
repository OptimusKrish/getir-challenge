# getir-challenge
Rest API to retrieve data from Mongo DB

NodeJS version required to run this project `v14.17.3` which is mentioned in the `.nvmrc`

### Steps to run the project
- git clone https://github.com/OptimusKrish/getir-challenge.git
- Install nvm from [here](https://github.com/nvm-sh/nvm#installing-and-updating)
- Install nodemon for local dev/testing purpose `npm install -g nodemon`
- Select the approporate node version by executing `nvm use`
- Execute `npm install` to get the project dependencies
- `.env` file needs to created in the root of the project with DB related variables
- Execute `npm run start` to start the API service
- Execute `npm run test` for running the unit tests
- Execute `npm run report` to check the code coverage on Mac machine
- Swagger Link to use the API
 1. [On Local](http://localhost:3000/docs)
 2. [On Server](http://18.216.191.220/docs)

<b>Valid Payload</b>
```json
{
   "startDate":"2016-12-14",
   "endDate":"2016-12-22",
   "minCount":1,
   "maxCount":200
}
````

### Code coverage - Unit/API testing
![Browser Report](https://drive.google.com/file/d/1-uQbgJcYTVFIQDdsHq8RrWjAUSkmsIfB/view?usp=sharing)

![Terminal Report](https://drive.google.com/file/d/1ea482iaudAJgK0swOjElyf0G-ZCLIWRs/view?usp=sharing)