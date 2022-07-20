import axios from "axios";

const AuthService = {
  login: async (email, password) => {
    return await axios
      .post(`https://71cf-154-113-171-186.eu.ngrok.io/api/admin/v1/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log('res', res)
        if (res.data.token && res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
        }
        return res.data;
      })
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};

export default AuthService;
