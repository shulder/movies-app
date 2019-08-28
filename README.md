# movies-app

## Getting Started

This app uses Node.js as a server and works with MySQL as a data storage. You need to have [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/) and [Node.js](https://nodejs.org/uk/) installed on your system to run the application locally. 


1. Pagination principle applied for data displaying
2. User can search for movies among titles and featuring stars using a single query!
3. Resulting search set can be sorted by date or title
4. All operations are performed on immutable variables and data structures
5. Concurrency is used when possible
 
## Installation
```
 git clone https://github.com/shulder/movies-app.git
 cd movies-app
 cd server
 npm install
 # Open a new tab
 cd client
 npm install
```

## Configuring 

```json
// server/src/config/config.json

// you need to create a database manually before using an app!
// tables will be created automatically
"server": {
    "port": 8080
  }, 
  "database": {
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "database": "YOUR_DB_NAME",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  }
  
// client/src/http.js

// you can also change axios base URL if needed
const http = axios.create({ 
  "baseURL": "http://localhost:8080", 
});
```

## Launching
```
 cd movies-app
 cd server
 npm start
 # Open a new tab
 cd client
 npm start
```

### ServerAPI

## Request

`GET /movies` or `GET /movies?page=1&limit=6`

## Response
    "movies": [ 
     {
      "id": 2 ,
      "title": "Robocop", 
      "releaseYear": 1998, 
     },
     {},
     {}
    ],
    "totalPages" : 4,
    
## Request

`GET /movies/:id`

## Response
     {
      "id": 2 ,
      "title": "Robocop", 
      "releaseYear": 1998, 
      "format" : {
        "type": 'VHS'
      },
      "stars": [
        {
         "name": "Brad",
         "surname": "Pitt",
        },
        {},
        {}
      ]
     }
       
    
## Request

`GET /movies/search?page=1&limit=2&input=James`


## Response
    "movies": [
     {
       "id": 2 ,
       "title": "Robocop", 
       "releaseYear": 1998, 
       "format" : {
         "type": 'VHS'
       },
       "stars": [
         {
          "name": "Brad",
          "surname": "Pitt",
         },
         {},
       ]
      }
    ],
    "totalPages": 4
    
    
    
## Request

`POST /movies/`

## Response

    {
     "ok": true
    }
    
    
## Request

`POST /movies/import`

## Response

    {
     "ok": true
    }
    
## Request

`DELETE /movies/:id `


## Response
    
    {
     "ok": true
    }
    
    

### Packages used
- Server 
    - Express: easier API creation
    - Cors: cross-origin requests during local development
    - Morgan: logging requests to server console
    - Nodemon: server hot-reloading
    - multer: allows to parse multipart/form-data sent via POST, useful for file uploading/importing
    - sequelize: powerful Node.js ORM
- Client
    - react-router: browser routing
    - grommet + grommet-icons: lightweight React component library and corresponding SVG icons library
    - axios: HTTP requests, more reliable and easier in use than fetch API

