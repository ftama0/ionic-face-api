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

  // if (currentTime < expired_at) {
  //   return access_token;
  // }

  // if (currentTime >= expired_rt) {
  //   localStorage.clear();
  //   return false;
  // }

  if (1725267732000 <= expired_at) {
    console.log('EXPIRED');
    console.log(expired_at);
    console.log(1725267732000);
    return access_token;
  }

  if (currentTime >= expired_rt) {
    localStorage.clear();
    return false;
  }

  try {
    const formData = { refresh_token };
    console.log("Refreshing token..."); // Debugging log
    const res = await tokenService.refreshToken(formData);
    console.log("Token refreshed successfully:", res); // Debugging log
    const decodedToken = jwtDecode(res.access_token);
    const newExpiredAt = decodedToken.exp * 1000;

    loginStore.token.access_token = res.access_token;
    loginStore.token.expired_at = newExpiredAt;

    return res.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error); // Debugging log
    localStorage.clear();
    return false;
  }
}
