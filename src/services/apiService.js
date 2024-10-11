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
  async readHome() {
    try {
      const res = await apiService.get("/api/v1/home/");
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
  async oneSignal(data) {
    try {
      const res = await apiService.post(`/api/v1/users/onesignal`, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export const prService = {
  async allPrList(page = 1, limit = 5, search = "", filter = {}) {
    let queryParams = `page=${page}&limit=${limit}&search=${search}`;
    if (filter && typeof filter === 'object' && !Array.isArray(filter)) {
      for (const [key, value] of Object.entries(filter)) {
        if (value !== undefined && value !== null && value !== '') {
          queryParams += `&${key}=${encodeURIComponent(value)}`;
        }
      }
    } else {
      console.warn('Filter bukan objek yang valid. Mengabaikan filter.');
    }

    console.log('INI URL', `/api/v1/pr/?${queryParams}`);
    const res = await apiService.get(`/api/v1/pr/?${queryParams}`);
    return res.data;
  },
  async allPrApproval(page = 1, limit = 5, search = "", filter = {}) {
    let queryParams = `page=${page}&limit=${limit}&search=${search}&approve_status=To Approve`;
    if (filter && typeof filter === 'object' && !Array.isArray(filter)) {
      for (const [key, value] of Object.entries(filter)) {
        if (value !== undefined && value !== null && value !== '') {
          queryParams += `&${key}=${encodeURIComponent(value)}`;
        }
      }
    } else {
      console.warn('Filter bukan objek yang valid. Mengabaikan filter.');
    }

    console.log('INI URL', `/api/v1/approval-pr/?${queryParams}`);
    const res = await apiService.get(`/api/v1/approval-pr/?${queryParams}`);
    return res.data;
  },
  async readPr(id) {
    const res = await apiService.get(`/api/v1/pr/${id}`);
    return res.data;
  },
  async approvePr(id, status_type, data) {
    const res = await apiService.post(
      `/api/v1/approval-pr/process/${id}/${status_type}`, data
    );
    return res.data;
  },
};
// purhcase Order
export const poService = {
  async allPoList(page = 1, limit = 5, search = "", filter = {}) {
    let queryParams = `page=${page}&limit=${limit}&search=${search}`;
    // Periksa apakah filter adalah objek yang valid
    if (filter && typeof filter === 'object' && !Array.isArray(filter)) {
      // Periksa filter dan tambahkan ke queryParams jika ada nilai
      for (const [key, value] of Object.entries(filter)) {
        if (value !== undefined && value !== null && value !== '') {
          queryParams += `&${key}=${encodeURIComponent(value)}`;
        }
      }
    } else {
      console.warn('Filter bukan objek yang valid. Mengabaikan filter.');
    }

    console.log('INI URL', `/api/v1/po/?${queryParams}`);
    const res = await apiService.get(`/api/v1/po/?${queryParams}`);
    return res.data;
  },
  async allPoApproval(page = 1, limit = 5, search = "", filter = {}) {
    let queryParams = `page=${page}&limit=${limit}&search=${search}&approve_status=To Approve`;
    if (filter && typeof filter === 'object' && !Array.isArray(filter)) {
      for (const [key, value] of Object.entries(filter)) {
        if (value !== undefined && value !== null && value !== '') {
          queryParams += `&${key}=${encodeURIComponent(value)}`;
        }
      }
    } else {
      console.warn('Filter bukan objek yang valid. Mengabaikan filter.');
    }

    console.log('INI URL', `/api/v1/approval-po/?${queryParams}`);
    const res = await apiService.get(`/api/v1/approval-po/?${queryParams}`);
    return res.data;
  },
  async readPo(id) {
    const res = await apiService.get(`/api/v1/po/${id}`);
    return res.data;
  },
  async approvePo(id, status_type) {
    const res = await apiService.post(
      `/api/v1/approval-po/process/${id}/${status_type}`
    );
    return res.data;
  },
};

// note : Master Data (client, company, vendor, plant)
export const masterData = {
  async readClient(search = "") {
    const res = await apiService.get(`/api/v1/client/?search=${search}`);
    return res.data;
  },
  async readCompany(search, client) {
    let url = '/api/v1/company/';
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (client) params.append('client_id', client);
    if (params.toString()) url += `?${params.toString()}`;
    const res = await apiService.get(url);
    return res.data;
  },
  async readVendor(search = "", client = "") {
    const res = await apiService.get(`/api/v1/vendor/?search=${search}&client_id=${client}`);
    return res.data;
  },
  async readPlant(search, client) {
    let url = '/api/v1/plant/';
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (client) params.append('client_id', client);
    if (params.toString()) url += `?${params.toString()}`;
    const res = await apiService.get(url);
    return res.data;
  },
};
// note : user management
// user account
export const userAccountService = {
  async allUser(page = 1, limit = 5, search, status) {
    let url = `/api/v1/users/?page=${page}&limit=${limit}`;
    if (search) url += `&search=${search}`;
    if (status) url += `&status=${status}`;
    const res = await apiService.get(url);
    return res.data;
  },
  async createUser(data) {
    const res = await apiService.post("/api/v1/users/", data);
    return res.data;
  },
  async readUser(uuid) {
    const res = await apiService.get(`/api/v1/users/${uuid}`);
    return res.data;
  },
  async updateUser(data) {
    const res = await apiService.put(`/api/v1/users/${data.uuid}`, data);
    return res.data;
  },
  async deleteUser(uuid) {
    const res = await apiService.delete(`/api/v1/users/${uuid}`);
    return res.data.data;
  },
  async fetchUserEss(page = 1, perPage = 5, search = "") {
    const res = await apiEss.get(
      `/ testing_getuser ? page = ${page} & perPage=${perPage} & search=${search}`
    );
    return res.data;
  },
};
// user release pr
export const releaseCodeService = {
  async allUserReleaseCode(type, page = 1, limit = 5, search = "") {
    const res = await apiService.get(
      `/api/v1/users-release/?type=${type}&page=${page}&limit=${limit}&search=${search}`
    );
    return res.data;
  },
  async readReleaseCode(type) {
    const res = await apiService.get(`/api/v1/release-code/?type=${type}`);
    return res.data;
  },
  async createUserReleaseCode(data) {
    const res = await apiService.post(
      `/api/v1/users-release/?type=${data.type}`,
      data
    );
    return res.data;
  },
  async updateUserReleaseCode(data) {
    const res = await apiService.put(`/api/v1/users-release/`, data);
    return res.data;
  },
  async deleteUserReleaseCode(data) {
    const res = await apiService.delete(
      `/api/v1/users-release/?uuid=${data.uuid}&type=${data.type}`
    );
    return res.data.data;
  },
};
// cost center
export const costCenterService = {
  async allDataCostCenter(page = 1, limit = 5, search = "") {
    const res = await apiService.get(
      `/api/v1/users-csks/?page=${page}&limit=${limit}&search=${search}`
    );
    return res.data;
  },
  async costCenterDetail(uuid) {
    const res = await apiService.get(`/api/v1/users-csks/${uuid}`);
    return res.data;
  },
  async createCostCenter(data) {
    const res = await apiService.post("/api/v1/users-csks/", data);
    return res.data;
  },
  async updateCostCenter(data) {
    const res = await apiService.put("/api/v1/users-csks/", data);
    return res.data;
  },
  async deleteCostCenter(uuid) {
    const res = await apiService.delete(`/api/v1/users-csks/?uuid=${uuid}`);
    return res.data.data;
  },
  async getClient() {
    const res = await apiService.get("/api/v1/client/");
    return res.data.data;
  },
  async getCompany(client_id) {
    const res = await apiService.get(`/api/v1/company/?client_id=${client_id}`);
    return res.data.data;
  },
  async getCostCenters(company_code, client_id) {
    const res = await apiService.get(`/api/v1/csks/?bukrs=${company_code}&mandt=${client_id}`);
    return res.data.data;
  },
};
// note : notification
export const notificationService = {
  async allNotification(page = 1, limit = 5) {
    let url = `/api/v1/notification/notification?page=${page}&limit=${limit}`;
    const res = await apiService.get(url);
    return res.data;
  },
  async readNotification(data) {
    const res = await apiService.put(`/api/v1/notification/read_notification/${data}`);
    return res.data;
  },
};
