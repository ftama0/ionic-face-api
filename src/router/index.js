import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomePage from "../views/HomePage.vue";
import NewItem from "@/views/NewItem.vue";
import { checkTokenExpiration } from "@/middleware/checkTokenExpiration";

const routes = [
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: HomePage
  //   //  component: () => import('@/views/HomePage.vue'),
  // },
  {
    path: "/",
    redirect: "/Login",
  },

  {
    path: "/new",
    name: "NewItem",
    component: NewItem,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/VLogin.vue"),
  },
  {
    path: "/info-device",
    name: "InfoDevice",
    component: () => import("@/views/InfoDevice.vue"),
  },
  {
    path: "/testing",
    name: "testing",
    component: () => import("@/views/VTesting.vue"),
  },
  {
    path: "/testingEss",
    name: "testingEss",
    component: () => import("@/views/VtestingEss.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/VHome.vue"),
  },
  // * pr
  {
    path: "/purchaseRequestList",
    name: "PurchaseRequestList",
    component: () => import("@/views/purchaseRequest/VPurchaseRequestList.vue"),
  },
  {
    path: "/purchaseRequestApproval",
    name: "PurchaseRequestApproval",
    component: () =>
      import("@/views/purchaseRequest/VPurchaseRequestApproval.vue"),
  },
  {
    path: "/purchaseRequestListDetail",
    name: "PurchaseRequestListDetail",
    component: () =>
      import("@/views/purchaseRequest/VPurchaseRequestDetail.vue"),
  },
  // * po
  {
    path: "/purchaseOrderList",
    name: "PurchaseOrderList",
    component: () => import("@/views/purchaseOrder/VPurchaseOrderList.vue"),
  },
  {
    path: "/purchaseOrderApproval",
    name: "PurchaseOrderApproval",
    component: () => import("@/views/purchaseOrder/VPurchaseOrderApproval.vue"),
  },
  {
    path: "/purchaseOrderListDetail",
    name: "PurchaseOrderListDetail",
    component: () => import("@/views/purchaseOrder/VPurchaseOrderDetail.vue"),
  },
  // * user account
  {
    path: "/userManagement",
    name: "UserManagement",
    component: () => import("@/views/VUserManagement.vue"),
  },
  {
    path: "/userAccount",
    name: "UserAccount",
    component: () => import("@/views/userAccount/VUserAccount.vue"),
  },
  {
    path: "/userAccountDetail",
    name: "UserAccountDetail",
    component: () => import("@/views/userAccount/VUserAccountDetail.vue"),
  },
  // * user release code
  {
    path: "/userReleasePr",
    name: "UserReleasePr",
    component: () => import("@/views/userReleasePr/VUserReleasePr.vue"),
  },
  {
    path: "/userReleasePo",
    name: "UserReleasePo",
    component: () => import("@/views/userReleasePo/VUserReleasePo.vue"),
  },
  {
    path: "/userReleasePrDetail",
    name: "UserReleasePrDetail",
    component: () => import("@/views/userReleasePr/VUserReleasePrDetail.vue"),
  },
  {
    path: "/userManagement",
    name: "UserManagement",
    component: () => import("@/views/VUserManagement.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//note : cek expired token
router.beforeEach(async (to, from, next) => {
  const publicPages = ["/login"]; // Halaman yang tidak memerlukan autentikasi
  const authRequired = !publicPages.includes(to.path);

  const isAuthenticated = await checkTokenExpiration();
  console.log("isAuthenticated", isAuthenticated);

  if (authRequired && !isAuthenticated) {
    // Jika halaman memerlukan autentikasi dan tidak ada token yang valid
      next({ name: "Login" });
  } else if (to.path === "/login" && isAuthenticated) {
    console.log("Redirecting to Home");
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
