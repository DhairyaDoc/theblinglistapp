import { AuthService } from "../../services/AuthService";

export const login = (params) => {
  return AuthService.login(params).then((response) => {
    if (response.data.success === true) {
      localStorage.setItem("token", response.data.session_token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response;
  });
};

export const signUp = (signUpInfo) => {
  return AuthService.signUp(signUpInfo).then((response) => {
    return response;
  });
};
