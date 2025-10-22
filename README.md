## About the project
3rd school year project in the making based on [a guide](https://mariusniemet20.medium.com/building-your-first-rest-api-with-nestjs-and-typeorm-and-test-it-with-postman-fb34ae9fa328) with the help of [CamilleTouron's](https://github.com/CamilleTouron) [repo](https://github.com/CamilleTouron/todoapp)

## Built with 
[![Nest][Nest.js]][Nest-url]


## Getting started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/en)
* [SqLite](https://sqlite.org/)

### Installation

1. Clone the repo.
```
git clone https://github.com/H1ld/cat-rest-api
```

2. install npm Packages.
```
npm install
```

3. Create a copy of constants.ts.example and rename it to constants.ts.
```
cp constants.ts.example constants.ts
```
4. Edit the contents of constants.ts using [a jwt key generator](https://jwtsecrets.com/)

5. Run the server.
```
npm run start
```

## Usage

You can use the API with cURL requests using the templates in the curl-requests.txt


[Nest.js]: https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[Nest-url]: https://nestjs.com/