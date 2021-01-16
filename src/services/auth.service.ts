import axios, { AxiosResponse } from "axios";


class AuthService {
  login(username, password) {
    return axios
      .post(process.env.API_BASE_URL + "/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email: string, password: string): Promise<AxiosResponse<any>>{
    const formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)
    return axios.post(process.env.API_BASE_URL + "/register", {
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();