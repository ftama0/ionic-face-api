// src/middleware/checkTokenExpiration.js
import { storage, initStorage } from "@/store/configStorage";
import { useLoginStore } from "@/store/loginStore";
import { tokenService } from "@/services/apiService";
import { jwtDecode } from "jwt-decode";

export async function checkTokenExpiration() {
  const loginStore = await useLoginStore();
  const tokenStore = loginStore.token;
  const access_token = await tokenStore.access_token;
  const refresh_token = tokenStore.refresh_token;
  // console.log("tokenStore", tokenStore);
  // console.log("access_token", access_token);
  if (!access_token) {
    return false;
  }
  const decode_at = jwtDecode(access_token);
  const decode_rt = refresh_token ? jwtDecode(refresh_token) : null;

  const expired_at = decode_at.exp * 1000;
  const expired_rt = decode_rt ? decode_rt.exp * 1000 : 0;

  if (Date.now() >= expired_at) {
    if (Date.now() >= expired_rt) {
      // Kedua token sudah kedaluwarsa
      await storage.clear(); // Hapus semua data storage
      return false;
    } else {
      // Token akses sudah kedaluwarsa tetapi refresh token masih berlaku
      try {
        const formData = new FormData();
        formData.append("refresh_token", refresh_token);
        const res = await tokenService.refreshToken(formData);
        await initStorage();
        await storage.set(
          "token",
          JSON.stringify({ ...tokenStore, access_token: res.access_token })
        );
        return res.access_token;
      } catch (error) {
        await storage.clear(); // Hapus semua data storage pada kesalahan
        return false;
      }
    }
  } else {
    // Token akses masih berlaku
    return access_token;
  }
}
