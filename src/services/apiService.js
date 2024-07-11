// services/apiService.js

import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://ebl-cms.hasnurgroup.com/index.php/api/mobile', // Atur baseURL sesuai kebutuhan Anda
  timeout: 20000, // Atur timeout request jika diperlukan
});

export const loginService = {
  async signInMobile(formData) {
    try {
      const response = await apiService.post('/signInMobile', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async checkIdMobile(user) {
    try {
      const response = await apiService.get(`/check_id_mobile?user=${user}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const prService = {
  async totalPR(user) {
    try {
      const response = await apiService.get(`/getDataTotalPR?user=${user}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};