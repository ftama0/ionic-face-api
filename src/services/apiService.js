// services/apiService.js

import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://api.hasnurgroup.com/index.php/api/mobile',
  // baseURL: 'https://ebl-cms.hasnurgroup.com/index.php/api/mobile',
  timeout: 20000, // Atur timeout request jika diperlukan
});
const apiEss = axios.create({
  baseURL: 'http://ess-dev.hasnurgroup.com:8081/api',
  // baseURL: 'http://127.0.0.1:8000/api',
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
  async approvePr(username, id) {
    try {
      const res = await apiService.post(`/ApprovePR?BANFN=${id}&user=${username}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async rejectPr(username, id) {
    try {
      const res = await apiService.post(`/RejectPR?BANFN=${id}&user=${username}`);
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
  async fetchUserEss(page = 1, perPage = 5, search = '') {
    try {
      const res = await apiEss.get(`/testing_getuser?page=${page}&perPage=${perPage}&search=${search}`);
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
      const res = await apiService.post(`/ApprovePR?BANFN=${id}&user=${username}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async rejectPr(username, id) {
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
// cost center pr
export const costCenterPrService = {
  async fetchTotalCostCenterPr(prop) {
    try {
      const res = await apiService.get(`/...?...=${prop}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchListCostCenterPr(prop) {
    try {
      const res = await apiService.get(`/...?...=${prop}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchDetailCostCenterPr(prop) {
    try {
      const res = await apiService.get(`/...?prop=${prop}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchAddCostCenterPr(formData) {
    try {
      const res = await apiService.post('/...', formData);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchUpdateCostCenterPr(formData) {
    try {
      const res = await apiService.put('/...', formData);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
}
// cost center po
export const costCenterPoService = {
  async fetchTotalCostCenterPr(prop) {
    try {
      const res = await apiService.get(`/...?...=${prop}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchListCostCenterPo(prop) {
    try {
      const res = await apiService.get(`/...?...=${prop}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchDetailCostCenterPo(prop) {
    try {
      const res = await apiService.get(`/...?prop=${prop}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchAddCostCenterPo(formData) {
    try {
      const res = await apiService.post('/...', formData);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  async fetchEditCostCenterPo(formData) {
    try {
      const res = await apiService.put('/...', formData);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
}