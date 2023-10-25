/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import AdminDashboard from "views/adminPages/Dashboard.js";
import AdminCanteenProducts from "views/adminPages/CanteenProducts.js";
import Products from "views/adminPages/Products.js";
import EditProduct from "views/adminPages/EditProduct.js"
import Canteen from "views/adminPages/Canteens.js";
import CanteenTransfer from "views/adminPages/CanteenTransfer.js";

import CanteenDashBoard from "views/canteenPages/Dashboard.js"
import CanteenProducts from "views/canteenPages/CanteenProducts.js";
// import Canteen from "views/canteenPages/Canteens.js";


export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <AdminDashboard />,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-diamond",
    component: <Products />,
    layout: "/admin",
  },


  {
    path: "/canteens",
    name: "Canteens",
    icon: "nc-icon nc-single-02",
    component: <Canteen />,
    layout: "/admin",
  },



  //name should not me displayed in sidebar
  {
    onlyRoute:true,
    path: "/canteenTransfer/:id",
    name: "canteenTransfer",
    icon: "nc-icon nc-single-02",
    component: <CanteenTransfer />,
    layout: "/admin",
  },
  {
    onlyRoute:true,
    path: "/stoke",
    name: "stokes",
    icon: "nc-icon nc-single-02",
    component: <CanteenProducts />,
    layout: "/admin",
  },
  {
    onlyRoute:true,
    path: "/stoke/:id",
    name: "stokes",
    icon: "nc-icon nc-single-02",
    component: <AdminCanteenProducts />,
    layout: "/admin",
  },


  {
    onlyRoute:true,
    path: "/addProduct",
    name: "EditProduct",
    icon: "nc-icon nc-diamond",
    component: <EditProduct />,
    layout: "/admin",
  },
  
];


export const canteenRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <CanteenDashBoard />,
    layout: "",
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-diamond",
    component: <CanteenProducts />,
    layout: "",
  },




  {
    onlyRoute:true,
    path: "/stoke",
    name: "stokes",
    icon: "nc-icon nc-single-02",
    component: <CanteenProducts />,
    layout: "",
  },
  {
    onlyRoute:true,
    path: "/stoke/:id",
    name: "stokes",
    icon: "nc-icon nc-single-02",
    component: <CanteenProducts />,
    layout: "",
  },

  
];
