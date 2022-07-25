const express = require("express");
const { User } = require("../models/User");

const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = require("../config/app");

const { requireLogin } = require("../middleware/requireLogin");

//protected

router.get("/protected", requireLogin, (req, res) => {
  return res.send("You can access the resources only after logging in");
});

//get all users

router.get("/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get individual user api
router.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});
//SIGNUP API
router.post("/signup", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    securityQuestion,
    securityAnswer,
  } = req.body;

  if (
    !firstName |
    !lastName |
    !email |
    !password |
    !confirmPassword |
    !securityQuestion |
    !securityAnswer
  ) {
    return res.status(200).json({
      success: false,
      message: "Please fill out all fields",
    });
  } else if (password !== confirmPassword) {
    return res.status(200).json({
      success: false,
      message: "Passwords do not match",
    });
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser) {
          return res.status(200).json({
            success: false,
            message: "User already exists with the same email id",
          });
        } else {
          bcrypt.hash(password, 12).then((hashedPassword) => {
            const user = new User({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: hashedPassword,
              confirmPassword: hashedPassword,
              securityQuestion: securityQuestion,
              securityAnswer: securityAnswer,
            });
            user
              .save()
              .then((user) => {
                return res.status(200).json({
                  success: true,
                  message: "User created successfully",
                  user: user,
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  success: false,
                  message: "Error creating user",
                  error: err,
                });
              });
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Error creating user",
          error: err,
        });
      });
  }
});

// LOGIN API

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email | !password) {
    return res.status(200).json({
      success: false,
      message: "Please enter both fields: email and password",
    });
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(200).json({
            success: false,
            message: "User does not exist",
          });
        } else {
          bcrypt
            .compare(password, savedUser.password)
            .then((isMatch) => {
              if (!isMatch) {
                return res.status(200).json({
                  success: false,
                  message: "Incorrect password",
                });
              } else {
                const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                return res.status(200).json({
                  // need to send the token here
                  success: true,
                  message: "User logged in successfully",
                  user: savedUser,
                  session_token: token,
                });
              }
            })
            .catch((err) => {
              return res.status(200).json({
                success: false,
                message: "Error logging in",
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Error logging in",
          error: err,
        });
      });
  }
});

// FORGOT PASSWORD API

router.post("/forgot-password", (req, res) => {
  const { email, securityQuestion, securityAnswer } = req.body;
  if (!email | !securityQuestion | !securityAnswer) {
    res.status(422).send("Please fill out all fields");
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(422).json({
            success: false,
            message: "User does not exist",
          });
        } else {
          if (
            savedUser.securityQuestion !== securityQuestion ||
            savedUser.securityAnswer !== securityAnswer
          ) {
            return res.status(422).json({
              success: false,
              message: "Incorrect security question or answer",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Credentials verified successfully",
              user: savedUser,
            });
          }
        }
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Error logging in",
          error: err,
        });
      });
  }
});

//RESET PASSWORD API

router.post("/reset-password", (req, res) => {
  const { email, newpassword, confirmNewPassword } = req.body;
  if (!email | !newpassword | !confirmNewPassword) {
    return res.status(200).json({
      success: false,
      message: "Please fill out all fields",
    });
  } else if (newpassword !== confirmNewPassword) {
    return res.status(200).json({
      success: false,
      message: "Passwords do not match",
    });
  } else {

    bcrypt.hash(newpassword, 12).then((hashedPassword) => {
      User.findOneAndUpdate({email}, {$set: {password: hashedPassword}},{new:true},(error,results)=>{
        return res.status(200).json({
        success: true,
        message: "Password reset successfully"
      })})
    });
  }
});
      
 

// EDIT PROFILE API

router.post("/edit-profile", (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName | !lastName | !email) {
    return res.status(422).json({
      success: false,
      message: "Please fill out all fields",
    });
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res.status(422).json({
            success: false,
            message: "User does not exist",
          });
        } else {
          savedUser.firstName = firstName;
          savedUser.lastName = lastName;
          savedUser.email = email;
          savedUser
            .save()
            .then((user) => {
              return res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                user: user,
              });
            })
            .catch((err) => {
              return res.status(500).json({
                success: false,
                message: "Error updating profile",
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Error updating profile",
          error: err,
        });
      });
  }
});

module.exports = router;
