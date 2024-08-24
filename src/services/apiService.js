// services/apiService.js
import axios from "axios";
import setupAxiosInstance from "./configService";

export const apiService = setupAxiosInstance(); // Instance dengan validasi token

// Instance tanpa validasi token untuk login
export const apiServiceNoAuth = setupAxiosInstance({ checkToken: false });

// const apiEss = axios.create({
//   baseURL: "http://ess-dev.hasnurgroup.com:8081/api",
//   // baseURL: 'http://127.0.0.1:8000/api',
//   timeout: 60000,
// });

export const tokenService = {
  async refreshToken(formData) {
    try {
      const res = await apiService.post("/api/v1/auth/token/refresh", formData);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
export const loginService = {
  async login(formData) {
    try {
      // const res = await apiService.post('/signInMobile', formData);
      const res = await apiServiceNoAuth.post("/api/v1/auth/token", formData);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async checkIdMobile(user) {
    try {
      const res = await apiService.get(`/check_id_mobile?user=${user}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
// purhcase Request
export const prService = {
  async fetchTotalPr(user) {
    try {
      const res = await apiService.get(`/getDataTotalPR?user=${user}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchListPr(user) {
    try {
      const res = await apiService.get(`/getDataPR?user=${user}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchDetailPr(id) {
    try {
      const res = await apiService.get(`/getDetailPR?BANFN=${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async approvePr(username, id) {
    try {
      const res = await apiService.post(
        `/ApprovePR?BANFN=${id}&user=${username}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async rejectPr(username, id) {
    try {
      const res = await apiService.post(
        `/RejectPR?BANFN=${id}&user=${username}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchReleaseCode() {
    try {
      const res = await apiService.get(`/getReleaseCode`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchUserEss(page = 1, perPage = 5, search = "") {
    try {
      const res = await apiEss.get(
        `/testing_getuser?page=${page}&perPage=${perPage}&search=${search}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
// purhcase Order
export const poService = {
  async fetchTotalPr(user) {
    try {
      const res = await apiService.get(`/getDataTotalPR?user=${user}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchListPr(user) {
    try {
      const res = await apiService.get(`/getDataPR?user=${user}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchDetailPr(id) {
    try {
      const res = await apiService.get(`/getDetailPR?BANFN=${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async approvePr(username, id) {
    try {
      const res = await apiService.post(
        `/ApprovePR?BANFN=${id}&user=${username}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async rejectPr(username, id) {
    try {
      const res = await apiService.post(
        `/RejectPR?BANFN=${id}&user=${username}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchUserEss(page = 1, perPage = 5, search = "") {
    try {
      const res = await apiEss.get(
        `/testing_getuser?page=${page}&perPage=${perPage}&search=${search}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

// note : user management
// user account
export const userAccountService = {
  async fetchAllUser() {
    try {
      const res = await apiService.get(`/api/v1/users/`);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  },
  async createUser(data) {
    try {
      const res = await apiService.post("/api/v1/users/", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async readUser(uuid) {
    try {
      const res = await apiService.get(`/api/v1/users/${uuid}`);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  },
  async updateUser(data) {
    try {
      const res = await apiService.put(`/api/v1/users/${data.uuid}`, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async deleteUser(uuid) {
    try {
      const res = await apiService.delete(`/api/v1/users/${uuid}`);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchUserEss(page = 1, perPage = 5, search = "") {
    try {
      const res = await apiEss.get(
        `/testing_getuser?page=${page}&perPage=${perPage}&search=${search}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
