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
      const res = await apiServiceNoAuth.post("/api/v1/auth/token/refresh", formData);
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
  async allPrList(page = 1, limit = 5, search = "") {
    try {
      const res = await apiService.get(
        `/api/v1/pr/?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async allPrApproval(page = 1, limit = 5, search = "") {
    try {
      const res = await apiService.get(
        `/api/v1/approval-pr/?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async readPr(id) {
    try {
      const res = await apiService.get(`/api/v1/pr/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async approvePr(id, status_type) {
    try {
      const res = await apiService.post(
        `/api/v1/approval-pr/process/${id}/${status_type}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
// purhcase Order
export const poService = {
  async allPoList(page = 1, limit = 5, search = "") {
    try {
      const res = await apiService.get(
        `/api/v1/po/?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async allPoApproval(page = 1, limit = 5, search = "") {
    try {
      const res = await apiService.get(
        `/api/v1/approval-po/?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async readPo(id) {
    try {
      const res = await apiService.get(`/api/v1/po/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async approvePo(id, status_type) {
    try {
      const res = await apiService.post(
        `/api/v1/approval-po/process/${id}/${status_type}`
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
  async allUser(page = 1, limit = 5, search = "") {
    try {
      const res = await apiService.get(
        `/api/v1/users/?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
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
      return res.data;
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
// user release pr
export const releaseCodeService = {
  async allUserReleaseCode(type, page = 1, limit = 5, search = "") {
    try {
      const res = await apiService.get(
        `/api/v1/users-release/?type=${type}&page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async readReleaseCode(type) {
    try {
      const res = await apiService.get(`/api/v1/release-code/?type=${type}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async createUserReleaseCode(data) {
    try {
      const res = await apiService.post(
        `/api/v1/users-release/?type=${data.type}`,
        data
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async updateUserReleaseCode(data) {
    try {
      const res = await apiService.put(`/api/v1/users-release/`, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async deleteUserReleaseCode(data) {
    try {
      const res = await apiService.delete(
        `/api/v1/users-release/?uuid=${data.uuid}&type=${data.type}`
      );
      return res.data.data;
    } catch (error) {
      throw error;
    }
  },
};
// cost center
export const costCenterService = {
  async allDataCostCenter(page = 1, limit = 5, search = "") {
    try {
      const res = await apiService.get(
        `/api/v1/users-csks/?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async costCenterDetail(uuid) {
    try {
      const res = await apiService.get(`/api/v1/users-csks/${uuid}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async createCostCenter(data) {
    try {
      const res = await apiService.post("/api/v1/users-csks/", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async updateCostCenter(data) {
    try {
      const res = await apiService.put("/api/v1/users-csks/", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async deleteCostCenter(uuid) {
    try {
      const res = await apiService.delete(`/api/v1/users-csks/?uuid=${uuid}`);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  },
  async getClient() {
    try {
      const res = await apiService.get("/api/v1/client/");
      return res.data.data;
    } catch (error) {
      throw error;
    }
  },
  async getCompany(client_id) {
    try {
      const res = await apiService.get(`/api/v1/company/?client_id=${client_id}`);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  },
  async getCostCenters(company_code, client_id) {
    try {
      const res = await apiService.get(`/api/v1/csks/?bukrs=${company_code}&mandt=${client_id}`);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  },
};
