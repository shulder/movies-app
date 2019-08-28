# movies-app

## Getting Started

This app uses Node.js as a server and works with MySQL for storing data. You need to have [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/) and [Node.js](https://nodejs.org/uk/) installed on your system to run the application locally. 

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

## Launching:
```
 cd movies-app
 cd server
 npm start
 # Open a new tab
 cd client
 npm start
```

### Packages used:
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
    
### Structure:

    ├─client                    
    │  ├─src                  
    │  │  ├─components           
    │  │  │  ├─MainPage.vue     
    │  │  │  ├─QuestPage.vue   
    │  │  │  └─ErrorPage.vue   
    │  │  ├─main.js            
    │  │  └─router.js          
    │  └─public                 
    |
    └─server                    
       └─src                    
          ├─api            
          │  ├─router.js        
          │  └─controllers.js   
          ├─storage                                 # storage, which is simulating database with JSON files 
          │  ├─data                                 
          │  │  ├─MainPageInfo.json
          │  │  ├─GeneralQuestsInfo.json
          │  │  ├─FinishedQuestsLeafs.json          # where the actual data in JSON is stored
          │  ├─schemas                              # schemas for validating incoming JSON
          │  │   ├─FinishedQuestsLeafsSchema.json  
          │  ├─client.js                            # storage client to be used by controllers 
          │  └─config.json                          # storage config
          ├─main.js            
      
