const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      minlength: 5,
    },
    confirmPassword: {
      type: String,
      minlength: 5,
    },
    securityQuestion: {
      type: String,
      required: true,
    },
    securityAnswer: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "customer", // setting default role to customer
    },

  }, { timestamps: true });

exports.User = mongoose.model("User", userSchema);
