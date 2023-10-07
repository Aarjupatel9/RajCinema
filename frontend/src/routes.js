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
import Dashboard from "views/Dashboard.js";
import Products from "views/Products.js";
import Canteen from "views/Canteens.js";
import CanteenTransfer from "views/CanteenTransfer.js";
import Login from "views/Login";

export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
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
    path: "/canteenTransfer/:id",
    name: "canteenTransfer",
    icon: "nc-icon nc-single-02",
    component: <CanteenTransfer />,
    layout: "/admin",
  },


  
];


export const canteenRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-diamond",
    component: <Products />,
    layout: "/admin",
  },









  
];
