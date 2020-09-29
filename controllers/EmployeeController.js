const { response } = require("express");
const Employee = require("../models/Employee");

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
        message: "An error occured",
      });
    });
};

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

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
