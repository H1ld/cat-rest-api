```
            _                        _                     _ 
           | |                      | |                   (_)
   ___ __ _| |_ ______ _ __ ___  ___| |_ ______ __ _ _ __  _ 
  / __/ _` | __|______| '__/ _ \/ __| __|______/ _` | '_ \| |
 | (_| (_| | |_       | | |  __/\__ \ |_      | (_| | |_) | |
  \___\__,_|\__|      |_|  \___||___/\__|      \__,_| .__/|_|
                                                    | |      
                                                    |_|      
```
_Ascii Art generated with [Ascii Art Generator](http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20)_

## About the project
3rd school year project in the making.
 * Basic CRUD API came from [a medium guide](https://mariusniemet20.medium.com/building-your-first-rest-api-with-nestjs-and-typeorm-and-test-it-with-postman-fb34ae9fa328)
 * Database setup was made with the help of [CamilleTouron's](https://github.com/CamilleTouron) [repo](https://github.com/CamilleTouron/todoapp)
 * Authentication was added using [nestJs' official doc](https://docs.nestjs.com/security/authentication?source=post_page-----4a347ce154b6---------------------------------------)
 * Password encryption made using [ssoJet's doc](https://ssojet.com/hashing/bcrypt-in-typescript/)
 * .env creation using [nestJs' official doc](https://docs.nestjs.com/techniques/configuration)


<span style="color:red"> <b>
THIS VERSION IS NOT FULLY WORKING, THERE ARE ERRORS WHEN TRYING TO LOG IN, THIS COMMIT IS USED AS A CHECKPOINT TO GIT RESET, UPGRADE TO THE NEXT VERSION.
</b> </span>

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

3. Create a copy of .env.example and rename it to env.ts
```
cp .env.example .env
```

4. Edit the content of .env using

5. Run the server.
```
npm run start
```

## Usage

You can use the API with cURL requests using the templates in the curl-requests.txt


[Nest.js]: https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[Nest-url]: https://nestjs.com/