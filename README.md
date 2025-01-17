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

## CRUD Operation using Node.js and MongoDB

* Make 3 Directories - controllers, models, routes 

### Making a Model 

```javascript 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
```
* [Mongoose Schema types can be found in the documentation](https://mongoosejs.com/docs/schematypes.html)
* ```timestamps:true``` automatically manages created and updated fields. 
* ```module.exports = Employee;``` exports the model

### Controller

```javascript
const Employee = require("../models/Employee");
```
* Model is imported 

**List of All Employees**
```javascript 
//Show List of Employees

const index = (req, res, next) => {
  Employee.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

```
Note 

* ```req``` will take the request in incoming bodies, ```res``` will provide the response and ```next``` will go to next execution if everything okay
* ```Employee.find()``` is a mongoose query returns all employees from database 
*  If query is okay it will return the response if not it will return the message error occured 

**Single Employee by ID**

```javascript 
// Single Employee

const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "Error!",
      });
    });
};
```
**Store Employee Details**

```javascript 
//Add a Employee to the database

const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });
  employee
    .save()
    .then((response) => {
      res.json({
        message: "Employee Added Bruh",
      });
    })
    .catch((error) => {
      res.json({
        message: "errrrrrr",
      });
    });
};
}
```
**Update Employee**

```javascript
//Update and employee

const update = (req, res, next) => {
  let employeeID = req.body.employeeID;
  let updatedData = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };
  Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
    .then(() => {
      res.json({
        message: "Employee Updated",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};
```
**Delete Employee**

```javascript
// Delete employee

const destroy = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findByIdAndRemove(employeeID)
    .then(() => {
      res.json({
        message: "Employee deleted!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};

```

**Export**

```javascript 
module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};

```

### Routes

```javascript 
const express = require("express");
const router = express.Router();

const EmployeeController = require("../controllers/EmployeeController");
const Employee = require("../models/Employee");

router.get("/", EmployeeController.index);
router.post("/show", EmployeeController.show);
router.post("/store", EmployeeController.store);
router.post("/update", EmployeeController.update);
router.post("/delete", EmployeeController.destroy);

module.exports = router;
```
### User Login Registration 

**Packages for Login and Registration process**

* ```npm install bcryptjs jsonwebtoken```

**The code**

* Create - ```AuthController.js``` Controller, ```User.js``` Model, ```auth.js``` Route
* Create a new user schema in Models

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
```
