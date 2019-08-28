# movies-app

### Packages used:
- Server (Node v10.15.3)
    - Express (easier API creation)
    - Cors (cross-origin requests during local development)
    - Morgan (logging requests to server console)
    - Nodemon (server hot-reloading)
    - jsonschema (for validating JSON sent via HTTP POST)
- Client
    - Vue.js (v2.6.10), Vue Router (minimal Vue-cli generated project)
    - Vue-Bootstrap (responsiveness out of the box)
    - Vue-bytesize-icons (fancy SVG icons library)
    - axios (HTTP requests)
    
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
      

## Installation:
```
 cd server
 npm install
 npm start # Running dev server
 # Open a new tab
 cd client
 npm install
 npm start # Running dev client
```

