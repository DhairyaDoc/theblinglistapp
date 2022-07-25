import { BACKEND_URL } from "../config/config";
import axios from "axios";

const AuthService = {
  login: (params) => {
    return axios
      .post(BACKEND_URL + "login", {
        email: params.email,
        password: params.password,
      })
      .then((res) => {
        return res;
      });
  },

  signUp: (signUpInfo) => {
    return axios
      .post(BACKEND_URL + "signup", {
        firstName: signUpInfo.firstName,
        lastName: signUpInfo.lastName,
        email: signUpInfo.email,
        password: signUpInfo.password,
        confirmPassword: signUpInfo.confirmPassword,
        securityAnswer: signUpInfo.securityAnswer,
        securityQuestion: signUpInfo.securityQuestion,
      })
      .then((response) => {
        return response;
      });
  },
};

export { AuthService };
