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
    path: "/testing",
    name: "Home",
    component: () => import("@/views/VTesting.vue"),
  },
  //note : pr
  {
    path: "/purchaseRequestList/:type",
    name: "PurchaseRequestList",
    component: () => import("@/views/purchaseRequest/VPurchaseRequestList.vue"),
    props: true,
  },
  {
    path: "/purchaseRequestDetail/:typeMenu",
    name: "PurchaseRequestDetail",
    component: () => import("@/views/purchaseRequest/VPurchaseRequestDetail.vue"),
    props: true,
  },
  //note : po
  {
    path: "/purchaseOrderList/:type",
    name: "PurchaseOrderList",
    component: () => import("@/views/purchaseOrder/VPurchaseOrderList.vue"),
    props: true,
  },
  {
    path: "/purchaseOrderDetail/:typeMenu",
    name: "PurchaseOrderDetail",
    component: () => import("@/views/purchaseOrder/VPurchaseOrderDetail.vue"),
    props: true,
  },
  //note : user account
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
  //note : user release code
  {
    path: "/userReleaseCode/:type",
    name: "UserReleaseCode",
    component: () => import("@/views/userReleaseCode/VUserReleaseCode.vue"),
    props: true,
  },
  // * maintan cost center
  {
    path: "/costCenter",
    name: "costCenter",
    component: () =>
      import("@/views/maintainCostCenter/VMaintanCostCenterList.vue"),
  },
  {
    path: "/costCenterDetail",
    name: "costCenterDetail",
    component: () =>
      import("@/views/maintainCostCenter/VMaintainCostCenterDetail.vue"),
  },
  //note : maintan cost center po
  {
    path: "/notification",
    name: "Notification",
    component: () => import("@/views/notification/VNotification.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// note : Global navigation guard to log route history
router.beforeEach((to, from, next) => {
  // console.log("Navigating to:", to.fullPath);
  // console.log("Navigating from:", from.fullPath);
  next();
});

//note : cek expired token
router.beforeEach(async (to, from, next) => {
  const publicPages = ["/login"]; // Halaman yang tidak memerlukan autentikasi
  const authRequired = !publicPages.includes(to.path);

  const isAuthenticated = await checkTokenExpiration();

  if (to.name == "testing") { // Menambahkan pengecekan untuk route testing
    next();
  }

  if (authRequired && !isAuthenticated) {
    next({ name: "Login" });
  } else if (to.name === "Login" && isAuthenticated) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
