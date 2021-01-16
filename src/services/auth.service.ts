import axios, { AxiosResponse } from "axios";


class AuthService {
  login(email: string, password: string) {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)
    return axios
      .post(process.env.API_BASE_URL + "/login", formData)
      .then(response => {
        if (response.data.access_token) {
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
    return axios.post(process.env.API_BASE_URL + "/register", formData);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();