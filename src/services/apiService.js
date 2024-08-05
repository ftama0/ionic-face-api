// services/apiService.js

import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://api.hasnurgroup.com/index.php/api/mobile',
  // baseURL: 'https://ebl-cms.hasnurgroup.com/index.php/api/mobile',
  timeout: 20000, // Atur timeout request jika diperlukan
});
const apiEss = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  // baseURL: 'https://ebl-cms.hasnurgroup.com/index.php/api/mobile',
  timeout: 20000, // Atur timeout request jika diperlukan
});
export const loginService = {
  async signInMobile(formData) {
    try {
      const res = await apiService.post('/signInMobile', formData);
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
  async ApprovePr(username, id) {
    try {
      const res = await apiService.post(`/ApprovePR?BANFN=${id}&user=${username}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async RejectPr(username, id) {
    try {
      const res = await apiService.post(`/RejectPR?BANFN=${id}&user=${username}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchUserEss(page = 1, perPage = 5, search = '') {
    try {
        const res = await apiEss.get(`/testing_getuser?page=${page}&perPage=${perPage}&search=${search}`);
        return res.data;
    } catch (error) {
        throw error;
    }
  },
};
