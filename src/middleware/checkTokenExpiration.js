// src/middleware/checkTokenExpiration.js
import { useLoginStore } from "@/store/loginStore";
import { tokenService } from "@/services/apiService";
import { jwtDecode } from "jwt-decode";

export async function checkTokenExpiration() {
  const loginStore = useLoginStore();
  const { access_token, refresh_token, expired_at, expired_rt } =
    loginStore.token;

  if (!access_token) {
    return false;
  }

  const currentTime = Date.now();

  if (currentTime < expired_at) {
    return access_token;
  }

  if (currentTime >= expired_rt) {
    localStorage.clear();
    return false;
  }

  try {
    const formData = { refresh_token };
    const res = await tokenService.refreshToken(formData);
    const decodedToken = jwtDecode(res.access_token);
    const newExpiredAt = decodedToken.exp * 1000;

    loginStore.token.access_token = res.access_token;
    loginStore.token.expired_at = newExpiredAt;

    return res.access_token;
  } catch (error) {
    localStorage.clear();
    return false;
  }
}
