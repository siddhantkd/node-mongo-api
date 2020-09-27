# node-mongo-api
Repository for Node.js+MongoDB Practice 

## MongoDB installation 

* [Go to MongoDB Community server page](https://www.mongodb.com/try/download/community) 
* Select platform, download and install with MongoDB compass
* Go to MongoDB bin folder and copy the location
* Go to environment variables, go to path and create a new path for MongoDB by pasting the location.
* After installation type mongo in cmd. If installed correctly mongoDB will run on port ```27017``` (Default port)

## Creating a Node Server

* ```npn init -y``` to create a package.json file.
* Install packages ```npm i express mongoose morgan body-parser```
* Call the packages in index.js file

```javascript 
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
```

* express - Node.js framework. Detailed express documentation in my [express-js-css github repository](https://github.com/siddhantkd/express-js-cc)
* mongoose - Required to work with MongoDB- MongoDB connection, requiring mongo models queries etc.
* morgan - HTTP request logger middleware for node.js
* body-parser - ```body-parser``` extract the entire body portion of an incoming request stream and exposes it on ```req.body.```

* Install nodemon ```npm i nodemon``` change the script in package.json to 
```javascript 
"scripts": {
    "start": "node index",
    "dev": "nodemon index"
  },
  ```

**Mongodb Connection**

```javascript 
mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database Connection Established");
});

```

* We are connecting to mongdb database using package mongoose. 
* port 27017 is the default port of mongodb 
* After that we are printing the error if any or else print ```Database connection establised```

**Code for Nodejs application where it will run**

```javascript
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});
```
**Final Code**
```javascript 
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database Connection Established");
});

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});

```
